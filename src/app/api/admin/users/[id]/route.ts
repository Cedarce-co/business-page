import { NextResponse } from "next/server";
import { getApiSuperAdminUser } from "@/lib/server-auth";
import { removeUser } from "@/server/services/admin";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const superAdmin = await getApiSuperAdminUser();
  if (!superAdmin) {
    return NextResponse.json({ error: "Only the super admin can remove users." }, { status: 403 });
  }

  const { id } = await params;

  try {
    await removeUser(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not remove user.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
