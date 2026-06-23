import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiSuperAdminUser } from "@/lib/server-auth";
import { inviteAdmin, listAdminAccounts, listPendingAdminInvites } from "@/server/services/admin-accounts";

export async function GET() {
  const superAdmin = await getApiSuperAdminUser();
  if (!superAdmin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const admins = await listAdminAccounts();
  const pendingInvites = await listPendingAdminInvites();
  return NextResponse.json({ admins, pendingInvites });
}

const inviteSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const superAdmin = await getApiSuperAdminUser();
  if (!superAdmin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const json = await request.json().catch(() => null);
  const parsed = inviteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid invite details." }, { status: 400 });
  }

  try {
    const result = await inviteAdmin({
      invitedById: superAdmin.id,
      name: parsed.data.name,
      email: parsed.data.email,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not send invite.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
