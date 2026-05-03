import { ServiceRequestStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiAdminUser } from "@/lib/server-auth";
import { reviewServiceRequest } from "@/server/services/admin";

const schema = z.object({
  status: z.nativeEnum(ServiceRequestStatus),
  note: z.string().trim().max(2000).optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

  const { id } = await params;
  await reviewServiceRequest({ requestId: id, status: parsed.data.status, note: parsed.data.note ?? null });
  return NextResponse.json({ ok: true });
}
