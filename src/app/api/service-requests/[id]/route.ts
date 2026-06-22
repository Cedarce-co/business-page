import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import { updateServiceRequestIntake } from "@/server/services/service-request-update";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const answers = body?.answers;

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const result = await updateServiceRequestIntake({
    userId,
    requestId: id,
    answers: answers as Record<string, unknown>,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, request: result.request });
}
