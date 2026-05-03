import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiAdminUser } from "@/lib/server-auth";
import { listQuestionSets, createDraftFromPublished } from "@/server/services/intake-question-sets";

const createSchema = z.object({
  version: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
});

export async function GET() {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const sets = await listQuestionSets();
  return NextResponse.json({ sets });
}

export async function POST(request: Request) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await request.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const draft = await createDraftFromPublished(parsed.data);
  return NextResponse.json({ id: draft.id });
}

