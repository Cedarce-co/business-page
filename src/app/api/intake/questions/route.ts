import { NextResponse } from "next/server";
import { getPublishedQuestionSet } from "@/server/services/intake-question-sets";

export async function GET() {
  const data = await getPublishedQuestionSet();
  return NextResponse.json(data);
}

