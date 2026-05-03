import { NextResponse } from "next/server";
import { signupSchema } from "@/features/auth/types";
import { createUser } from "@/server/services/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid signup data." }, { status: 400 });
    }

    const result = await createUser(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({ ok: true, user: result.user }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }
}
