import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import { kycTextSchema } from "@/features/kyc/types";
import { getKyc, submitKyc } from "@/server/services/kyc";
import { MAX_UPLOAD_BYTES } from "@/lib/upload-limits";
import { UploadConfigError } from "@/server/uploads/store";

export const maxDuration = 60;

export async function GET() {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const kyc = await getKyc(userId);
  return NextResponse.json({ kyc });
}

export async function POST(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const formData = await request.formData();

    const parsed = kycTextSchema.safeParse({
      businessName: formData.get("businessName"),
      businessAddress: formData.get("businessAddress"),
      businessCity: formData.get("businessCity"),
      businessState: formData.get("businessState"),
      businessWebsite: formData.get("businessWebsite"),
      businessEmail: formData.get("businessEmail"),
      socialHandle: formData.get("socialHandle"),
      cacNumber: formData.get("cacNumber"),
      govIdType: formData.get("govIdType"),
    });

    const file = formData.get("govIdFile");
    const cacFile = formData.get("cacFile");
    if (!parsed.success || !(file instanceof File)) {
      return NextResponse.json({ error: "Invalid verification payload." }, { status: 400 });
    }

    const maxMb = MAX_UPLOAD_BYTES / (1024 * 1024);
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: `ID file must be ${maxMb}MB or less.` }, { status: 400 });
    }
    if (cacFile instanceof File && cacFile.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: `CAC file must be ${maxMb}MB or less.` }, { status: 400 });
    }

    await submitKyc(userId, {
      ...parsed.data,
      govIdFile: file,
      cacFile: cacFile instanceof File ? cacFile : null,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof UploadConfigError) {
      console.error("[kyc] upload config:", error.message);
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    const message = error instanceof Error ? error.message : "Could not submit verification.";
    console.error("[kyc] submit failed:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
