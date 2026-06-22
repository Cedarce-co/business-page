import type { AuditActorType, AuditEventType } from "@prisma/client";
import { prisma } from "@/server/database/prisma";
import type { RequestMeta } from "@/server/lib/request-meta";

export type AuthAuditInput = {
  actorType: AuditActorType;
  eventType: AuditEventType;
  userId?: string | null;
  email?: string | null;
  name?: string | null;
  meta: RequestMeta;
  sessionStartedAt?: Date | string | null;
  sessionEndedAt?: Date | string | null;
  extra?: Record<string, unknown>;
};

function parseDate(value: Date | string | null | undefined) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function durationSeconds(start: Date | null, end: Date) {
  if (!start) return null;
  const seconds = Math.round((end.getTime() - start.getTime()) / 1000);
  return seconds >= 0 ? seconds : null;
}

export async function logAuthAuditEvent(input: AuthAuditInput) {
  const ended = parseDate(input.sessionEndedAt) ?? new Date();
  const started = parseDate(input.sessionStartedAt);

  try {
    return await prisma.authAuditLog.create({
      data: {
        actorType: input.actorType,
        eventType: input.eventType,
        userId: input.userId ?? null,
        email: input.email ?? null,
        name: input.name ?? null,
        country: input.meta.country,
        countryCode: input.meta.countryCode,
        city: input.meta.city,
        region: input.meta.region,
        ipAddress: input.meta.ipAddress,
        userAgent: input.meta.userAgent,
        sessionStartedAt: started,
        sessionEndedAt: ended,
        durationSeconds: durationSeconds(started, ended),
        metadata: input.extra ? (input.extra as object) : undefined,
      },
    });
  } catch (err) {
    console.error("[auth-audit]", err);
    return null;
  }
}

export async function listAuthAuditLogs(options?: {
  limit?: number;
  cursor?: string;
  countryCode?: string;
  eventType?: AuditEventType;
}) {
  const limit = Math.min(Math.max(options?.limit ?? 50, 1), 200);

  const rows = await prisma.authAuditLog.findMany({
    where: {
      ...(options?.countryCode ? { countryCode: options.countryCode } : {}),
      ...(options?.eventType ? { eventType: options.eventType } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(options?.cursor
      ? {
          cursor: { id: options.cursor },
          skip: 1,
        }
      : {}),
  });

  const hasMore = rows.length > limit;
  const items = hasMore ? rows.slice(0, limit) : rows;

  return {
    items,
    nextCursor: hasMore ? items[items.length - 1]?.id ?? null : null,
  };
}

export async function authAuditCountrySummary() {
  const grouped = await prisma.authAuditLog.groupBy({
    by: ["countryCode", "country"],
    _count: { _all: true },
    where: {
      countryCode: { not: null },
      eventType: { in: ["SIGN_IN", "SIGNUP", "ADMIN_SIGN_IN"] },
    },
  });

  return grouped
    .sort((a, b) => b._count._all - a._count._all)
    .slice(0, 30)
    .map((row) => ({
      countryCode: row.countryCode,
      country: row.country,
      signIns: row._count._all,
    }));
}
