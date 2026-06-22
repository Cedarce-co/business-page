import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiAdminUser } from "@/server/auth/guards";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import { getRequestMetaFromRequest } from "@/server/lib/request-meta";
import { prisma } from "@/server/database/prisma";

const bodySchema = z.object({
  event: z.enum(["ADMIN_SIGN_OUT", "ADMIN_IDLE_SIGN_OUT"]),
  sessionStartedAt: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  const admin = await getApiAdminUser();
  if (!admin?.id) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: admin.id },
    select: { id: true, email: true, name: true },
  });

  const meta = getRequestMetaFromRequest(request);
  await logAuthAuditEvent({
    actorType: "ADMIN",
    eventType: parsed.data.event,
    userId: user?.id ?? admin.id,
    email: user?.email ?? admin.email ?? null,
    name: user?.name ?? admin.name ?? null,
    meta,
    sessionStartedAt: parsed.data.sessionStartedAt ?? null,
  });

  return NextResponse.json({ ok: true });
}
