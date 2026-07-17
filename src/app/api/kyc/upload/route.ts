import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiUserId } from "@/lib/server-auth";
import { MAX_UPLOAD_BYTES } from "@/lib/upload-limits";
import {
  removeKycDocument,
  stageKycDocument,
  type KycUploadField,
} from "@/server/services/kyc-upload";
import { UploadConfigError } from "@/server/uploads/store";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

export const maxDuration = 60;

const fieldSchema = z.enum(["govId", "addressProof", "cac"]);

export async function POST(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const limited = rateLimit(`kyc-upload:${userId}:${ip}`, 20, 300_000);
    if (!limited.ok) return rateLimitResponse(limited);

    const formData = await request.formData();
    const fieldRaw = formData.get("field");
    const file = formData.get("file");

    const fieldParsed = fieldSchema.safeParse(fieldRaw);
    if (!fieldParsed.success) {
      return NextResponse.json({ error: "Invalid document field." }, { status: 400 });
    }
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Missing file." }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `File must be ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB or less.` },
        { status: 400 },
      );
    }

    const result = await stageKycDocument(userId, fieldParsed.data as KycUploadField, file);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof UploadConfigError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    const message = error instanceof Error ? error.message : "Could not upload document.";
    const status = message.includes("approved") ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const url = new URL(request.url);
    const fieldParsed = fieldSchema.safeParse(url.searchParams.get("field"));
    if (!fieldParsed.success) {
      return NextResponse.json({ error: "Invalid document field." }, { status: 400 });
    }

    await removeKycDocument(userId, fieldParsed.data as KycUploadField);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not remove document.";
    const status = message.includes("approved") ? 403 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
