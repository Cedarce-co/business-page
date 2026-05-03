import { NextResponse } from "next/server";
import { getApiAdminUser } from "@/lib/server-auth";
import { approveUser } from "@/server/services/admin";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;
  const result = await approveUser(id);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
