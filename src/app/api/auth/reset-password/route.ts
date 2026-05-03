import { NextResponse } from "next/server";
import { resetPasswordSchema } from "@/features/password-reset/types";
import { performPasswordReset } from "@/server/services/password-reset";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const result = await performPasswordReset(parsed.data.token, parsed.data.password);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not reset password." }, { status: 500 });
  }
}

