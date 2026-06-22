import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiUserId } from "@/server/auth/guards";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import { getRequestMetaFromRequest } from "@/server/lib/request-meta";
import { prisma } from "@/server/database/prisma";

const bodySchema = z.object({
  event: z.enum(["SIGN_OUT", "IDLE_SIGN_OUT"]),
  sessionStartedAt: z.string().nullable().optional(),
});

export async function POST(request: Request) {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const parsed = bodySchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  });
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const meta = getRequestMetaFromRequest(request);
  await logAuthAuditEvent({
    actorType: "USER",
    eventType: parsed.data.event,
    userId: user.id,
    email: user.email,
    name: user.name,
    meta,
    sessionStartedAt: parsed.data.sessionStartedAt ?? null,
  });

  return NextResponse.json({ ok: true });
}
