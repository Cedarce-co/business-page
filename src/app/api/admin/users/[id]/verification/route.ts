import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiAdminUser } from "@/lib/server-auth";
import { setVerificationReview } from "@/server/services/admin";

const schema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "INVALID_INFO"]),
  note: z.string().trim().max(2000).optional(),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const { id } = await params;
  const result = await setVerificationReview(id, parsed.data.status, parsed.data.note ?? null);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
