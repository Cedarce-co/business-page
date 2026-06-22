import { NextResponse } from "next/server";
import { validateAdminInviteToken } from "@/server/services/admin-accounts";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token")?.trim() ?? "";
  if (!token) {
    return NextResponse.json({ error: "Missing invite token." }, { status: 400 });
  }

  const invite = await validateAdminInviteToken(token);
  if (!invite) {
    return NextResponse.json({ error: "This invite link is invalid or has expired." }, { status: 400 });
  }

  return NextResponse.json(invite);
}
