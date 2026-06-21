import { NextResponse } from "next/server";
import { getApiAdminUser } from "@/lib/server-auth";
import {
  dismissNotification,
  listAdminNotifications,
  markNotificationRead,
} from "@/server/services/notifications";
import { z } from "zod";

export async function GET() {
  const admin = await getApiAdminUser();
  if (!admin?.id) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const data = await listAdminNotifications(admin.id);
  return NextResponse.json(data);
}

const updateSchema = z.object({
  id: z.string().min(1),
  action: z.enum(["read", "dismiss"]),
});

export async function PATCH(req: Request) {
  const admin = await getApiAdminUser();
  if (!admin?.id) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  if (parsed.data.action === "read") {
    await markNotificationRead(admin.id, parsed.data.id);
  } else {
    await dismissNotification(admin.id, parsed.data.id);
  }

  return NextResponse.json({ ok: true });
}
