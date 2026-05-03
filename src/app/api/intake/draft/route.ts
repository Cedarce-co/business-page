import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiUserId } from "@/lib/server-auth";
import { getOrCreateDraft, saveDraft } from "@/server/services/intake";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  package: z.string().min(1),
});

const saveSchema = z.object({
  intakeId: z.string().min(1),
  packageTier: z.string().min(1),
  currentStep: z.number().int().min(0),
  answers: z.record(z.string(), z.unknown()),
});

export async function GET(request: Request) {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const url = new URL(request.url);
  const parsed = querySchema.safeParse({ package: url.searchParams.get("package") });
  if (!parsed.success) return NextResponse.json({ error: "Missing package." }, { status: 400 });

  const fresh = url.searchParams.get("fresh") === "1";
  const draft = await getOrCreateDraft(userId, parsed.data.package, { fresh });
  return NextResponse.json(
    {
      draft,
      locked: false,
      requestStatus: null,
      reviewNote: null,
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}

export async function PUT(request: Request) {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const parsed = saveSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload." }, { status: 400 });

  const draft = await saveDraft({ userId, ...parsed.data });
  if (!draft) {
    return NextResponse.json({ error: "Draft not found or already submitted." }, { status: 409 });
  }
  return NextResponse.json({ ok: true, draft });
}

