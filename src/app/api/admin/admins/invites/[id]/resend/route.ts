import { NextResponse } from "next/server";
import { getApiSuperAdminUser } from "@/lib/server-auth";
import { resendAdminInvite } from "@/server/services/admin-accounts";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const superAdmin = await getApiSuperAdminUser();
  if (!superAdmin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;

  try {
    const result = await resendAdminInvite(id);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not resend invite.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
