import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiUserId } from "@/lib/server-auth";
import {
  createMfaSetup,
  disableMfa,
  enableMfa,
  getUserMfaState,
} from "@/server/services/mfa";
import { getRequestMeta } from "@/server/lib/request-meta";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const enableSchema = z.object({ code: z.string().min(6).max(8) });
const disableSchema = z.object({
  password: z.string().min(8),
  code: z.string().min(6).max(8),
});

export async function GET() {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const state = await getUserMfaState(userId);
  return NextResponse.json({
    enabled: state?.mfaEnabled ?? false,
    enabledAt: state?.mfaEnabledAt ?? null,
  });
}

export async function POST(request: Request) {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`mfa:user:${userId}:${ip}`, 15);
  if (!limited.ok) return rateLimitResponse(limited);

  const json = await request.json().catch(() => null);
  const action = typeof json?.action === "string" ? json.action : "";

  try {
    if (action === "setup") {
      const email = typeof json?.email === "string" ? json.email : "";
      const setup = await createMfaSetup(userId, email);
      return NextResponse.json(setup);
    }

    if (action === "enable") {
      const parsed = enableSchema.safeParse(json);
      if (!parsed.success) return NextResponse.json({ error: "Invalid code." }, { status: 400 });
      const meta = await getRequestMeta();
      await enableMfa(userId, parsed.data.code, meta);
      return NextResponse.json({ ok: true });
    }

    if (action === "disable") {
      const parsed = disableSchema.safeParse(json);
      if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
      const meta = await getRequestMeta();
      await disableMfa(userId, parsed.data.password, parsed.data.code, meta);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "MFA request failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
