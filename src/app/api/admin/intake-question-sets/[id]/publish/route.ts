import { NextResponse } from "next/server";
import { getApiAdminUser } from "@/lib/server-auth";
import { getQuestionSetById, publishQuestionSet } from "@/server/services/intake-question-sets";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;
  const set = await getQuestionSetById(id);
  if (!set) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (set.status !== "DRAFT") return NextResponse.json({ error: "Only drafts can be published." }, { status: 400 });

  const published = await publishQuestionSet(id);
  return NextResponse.json({
    set: {
      id: published.id,
      version: published.version,
      status: published.status,
      title: published.title,
      questions: published.questions,
      updatedAt: published.updatedAt.toISOString(),
    },
  });
}

