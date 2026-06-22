import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { adminAuthOptions } from "@/server/auth/admin-options";
import { createMfaSetup, enableAdminMfa, getUserMfaState } from "@/server/services/mfa";
import { getRequestMeta } from "@/server/lib/request-meta";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const enableSchema = z.object({ code: z.string().min(6).max(8) });

export async function GET() {
  const session = await getServerSession(adminAuthOptions);
  const userId = session?.user?.id;
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const state = await getUserMfaState(userId);
  return NextResponse.json({
    enabled: state?.mfaEnabled ?? false,
    enabledAt: state?.mfaEnabledAt ?? null,
    setupRequired: Boolean(session.user.mfaSetupRequired),
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(adminAuthOptions);
  const userId = session?.user?.id;
  const email = session?.user?.email ?? "";
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`mfa:admin:${userId}:${ip}`, 15);
  if (!limited.ok) return rateLimitResponse(limited);

  const json = await request.json().catch(() => null);
  const action = typeof json?.action === "string" ? json.action : "";

  try {
    if (action === "setup") {
      const setup = await createMfaSetup(userId, email);
      return NextResponse.json(setup);
    }

    if (action === "enable") {
      const parsed = enableSchema.safeParse(json);
      if (!parsed.success) return NextResponse.json({ error: "Invalid code." }, { status: 400 });
      const meta = await getRequestMeta();
      await enableAdminMfa(userId, parsed.data.code, meta);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "MFA request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
