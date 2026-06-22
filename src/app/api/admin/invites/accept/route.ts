import { NextResponse } from "next/server";
import { z } from "zod";
import { acceptAdminInvite } from "@/server/services/admin-accounts";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const bodySchema = z.object({
  token: z.string().min(16),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`admin-invite-accept:${ip}`, 10, 300_000);
  if (!limited.ok) return rateLimitResponse(limited);

  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid password or invite token." }, { status: 400 });
  }

  try {
    await acceptAdminInvite(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not accept invite.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
