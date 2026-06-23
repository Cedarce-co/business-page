import { NextResponse } from "next/server";
import { getApiSuperAdminUser } from "@/lib/server-auth";
import { revokeAdminInvite } from "@/server/services/admin-accounts";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const superAdmin = await getApiSuperAdminUser();
  if (!superAdmin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;

  try {
    await revokeAdminInvite(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not cancel invite.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
