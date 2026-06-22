import { NextResponse } from "next/server";
import { signupSchema } from "@/features/auth/types";
import { createUser } from "@/server/services/users";
import { getRequestMetaFromRequest } from "@/server/lib/request-meta";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const limited = rateLimit(`signup:${ip}`, 8, 300_000);
    if (!limited.ok) return rateLimitResponse(limited);

    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid signup data." }, { status: 400 });
    }

    const meta = getRequestMetaFromRequest(request);
    const result = await createUser(parsed.data, meta);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ ok: true, user: result.user }, { status: 201 });
  } catch (err) {
    console.error("[api/auth/signup]", err);
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }
}
