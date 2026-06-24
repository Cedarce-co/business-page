import { NextResponse } from "next/server";
import { z } from "zod";
import { isEmailRegistered } from "@/server/services/users";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const bodySchema = z.object({
  email: z.string().email().transform((v) => v.toLowerCase().trim()),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`check-email:${ip}`, 30, 300_000);
  if (!limited.ok) return rateLimitResponse(limited);

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const taken = await isEmailRegistered(parsed.data.email);
  return NextResponse.json({ available: !taken });
}
