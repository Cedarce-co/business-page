import { NextResponse } from "next/server";
import { z } from "zod";
import { userLoginPrecheck } from "@/server/services/mfa";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`login-precheck:user:${ip}`, 20);
  if (!limited.ok) return rateLimitResponse(limited);

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  }

  const step = await userLoginPrecheck(parsed.data.email, parsed.data.password);
  if (step === "totp") {
    return NextResponse.json({ step: "totp" });
  }

  return NextResponse.json({ step: "complete" });
}
