import { NextResponse } from "next/server";
import { z } from "zod";
import { createSiteFeedback } from "@/server/services/site-feedback";
import { getApiUserId } from "@/server/auth/guards";

const bodySchema = z.object({
  name: z.string().max(120).optional(),
  email: z.union([z.string().email().max(200), z.literal("")]).optional(),
  topic: z.string().max(120).optional(),
  message: z.string().min(10).max(4000),
  page: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your answers and try again." }, { status: 400 });
    }

    const userId = await getApiUserId();
    const row = await createSiteFeedback({
      name: parsed.data.name,
      email: parsed.data.email || null,
      topic: parsed.data.topic,
      message: parsed.data.message,
      page: parsed.data.page,
      userId,
    });

    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch (err) {
    console.error("[api/feedback]", err);
    return NextResponse.json({ error: "Could not send feedback." }, { status: 500 });
  }
}
