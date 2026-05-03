import { NextResponse } from "next/server";
import { forgotPasswordSchema } from "@/features/password-reset/types";
import { requestPasswordReset } from "@/server/services/password-reset";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    await requestPasswordReset(parsed.data.email);
    return NextResponse.json({ ok: true });
  } catch {
    // Always return ok to avoid leaking info, even on server failures.
    return NextResponse.json({ ok: true });
  }
}

