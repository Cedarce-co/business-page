import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import {
  dismissNotification,
  listNotifications,
  markNotificationRead,
} from "@/server/services/notifications";
import { z } from "zod";

export async function GET() {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const data = await listNotifications(userId);
  return NextResponse.json(data);
}

const updateSchema = z.object({
  id: z.string().min(1),
  action: z.enum(["read", "dismiss"]),
});

export async function PATCH(req: Request) {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const json = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  if (parsed.data.action === "read") {
    await markNotificationRead(userId, parsed.data.id);
  } else {
    await dismissNotification(userId, parsed.data.id);
  }

  return NextResponse.json({ ok: true });
}

