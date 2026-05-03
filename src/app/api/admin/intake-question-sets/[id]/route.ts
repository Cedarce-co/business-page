import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiAdminUser } from "@/lib/server-auth";
import { getQuestionSetById, updateDraftQuestions } from "@/server/services/intake-question-sets";
import { intakeQuestionsResponseSchema } from "@/features/intake/types";

const updateSchema = z.object({
  questions: z.unknown(),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;
  const set = await getQuestionSetById(id);
  if (!set) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({
    set: {
      id: set.id,
      version: set.version,
      status: set.status,
      title: set.title,
      questions: set.questions,
      updatedAt: set.updatedAt.toISOString(),
    },
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;
  const existing = await getQuestionSetById(id);
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (existing.status !== "DRAFT") {
    return NextResponse.json({ error: "Only drafts can be edited." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const validated = intakeQuestionsResponseSchema.safeParse(parsed.data.questions);
  if (!validated.success) {
    return NextResponse.json({ error: "Questions JSON does not match required schema." }, { status: 400 });
  }

  const set = await updateDraftQuestions(id, validated.data);
  return NextResponse.json({
    set: {
      id: set.id,
      version: set.version,
      status: set.status,
      title: set.title,
      questions: set.questions,
      updatedAt: set.updatedAt.toISOString(),
    },
  });
}

