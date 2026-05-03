import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiUserId } from "@/lib/server-auth";
import { submitIntake } from "@/server/services/intake";

const submitSchema = z.object({
  intakeId: z.string().min(1),
  packageTier: z.string().min(1),
  currentStep: z.number().int().min(0),
  answers: z.record(z.string(), z.unknown()),
});

export async function POST(request: Request) {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const result = await submitIntake({ userId, ...parsed.data });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({
    ok: true,
    result: { intake: result.intake, serviceRequest: result.serviceRequest },
  });
}

