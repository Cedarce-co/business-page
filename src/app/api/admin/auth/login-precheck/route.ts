import { NextResponse } from "next/server";
import { z } from "zod";
import { adminLoginPrecheck } from "@/server/services/mfa";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`login-precheck:admin:${ip}`, 20);
  if (!limited.ok) return rateLimitResponse(limited);

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  }

  try {
    const step = await adminLoginPrecheck(parsed.data.email, parsed.data.password);
    return NextResponse.json({ step });
  } catch (error) {
    console.error("[admin/login-precheck]", error);
    return NextResponse.json(
      { error: "Admin sign-in is temporarily unavailable." },
      { status: 503 },
    );
  }
}
