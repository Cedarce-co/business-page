import { NextResponse } from "next/server";
import { z } from "zod";
import type { FeedbackStatus } from "@prisma/client";
import { getApiAdminUser } from "@/server/auth/guards";
import { listSiteFeedback, updateSiteFeedbackStatus } from "@/server/services/site-feedback";

export async function GET(request: Request) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const status = new URL(request.url).searchParams.get("status") as FeedbackStatus | null;
  const items = await listSiteFeedback({
    status: status && ["NEW", "READ", "ARCHIVED"].includes(status) ? status : undefined,
  });

  return NextResponse.json({ items });
}

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["NEW", "READ", "ARCHIVED"]),
});

export async function PATCH(request: Request) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const parsed = patchSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const row = await updateSiteFeedbackStatus(parsed.data.id, parsed.data.status);
  return NextResponse.json({ ok: true, item: row });
}
