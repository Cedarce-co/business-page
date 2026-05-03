import { NextResponse } from "next/server";
import { getApiAdminUser } from "@/lib/server-auth";
import { removeUser } from "@/server/services/admin";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;
  await removeUser(id);
  return NextResponse.json({ ok: true });
}
