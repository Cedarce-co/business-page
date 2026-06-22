import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import { kycTextSchema } from "@/features/kyc/types";
import { getKycWithContact, submitKyc } from "@/server/services/kyc";
import { MAX_UPLOAD_BYTES } from "@/lib/upload-limits";
import { validateKycUpload } from "@/lib/kyc-upload";
import { UploadConfigError } from "@/server/uploads/store";

export const maxDuration = 60;

function validateUploadFile(file: File, label: string) {
  const maxMb = MAX_UPLOAD_BYTES / (1024 * 1024);
  if (file.size > MAX_UPLOAD_BYTES) {
    return `${label} must be ${maxMb}MB or less.`;
  }
  return validateKycUpload(file);
}

export async function GET() {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const row = await getKycWithContact(userId);
  const kyc = row?.kyc ?? null;

  return NextResponse.json({
    kyc,
    contact: {
      phone: row?.phone ?? "",
      personalAddress: row?.profile?.address ?? kyc?.address ?? "",
      personalCity: row?.profile?.city ?? "",
      personalCountry: row?.profile?.country ?? "",
    },
  });
}

export async function POST(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const formData = await request.formData();

    const parsed = kycTextSchema.safeParse({
      phone: formData.get("phone"),
      personalAddress: formData.get("personalAddress"),
      personalCity: formData.get("personalCity"),
      personalCountry: formData.get("personalCountry"),
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
    const addressProofFile = formData.get("addressProofFile");
    const cacFile = formData.get("cacFile");
    const hasExistingGovId = formData.get("hasExistingGovId") === "1";

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid verification payload." }, { status: 400 });
    }

    const govIdIsFile = file instanceof File && file.size > 0;
    if (!govIdIsFile && !hasExistingGovId) {
      return NextResponse.json({ error: "Government ID file is required." }, { status: 400 });
    }

    if (govIdIsFile) {
      const err = validateUploadFile(file, "ID file");
      if (err) return NextResponse.json({ error: err }, { status: 400 });
    }
    if (addressProofFile instanceof File && addressProofFile.size > 0) {
      const err = validateUploadFile(addressProofFile, "Proof of address");
      if (err) return NextResponse.json({ error: err }, { status: 400 });
    }
    if (cacFile instanceof File && cacFile.size > 0) {
      const err = validateUploadFile(cacFile, "CAC file");
      if (err) return NextResponse.json({ error: err }, { status: 400 });
    }

    await submitKyc(userId, {
      ...parsed.data,
      govIdFile: govIdIsFile ? file : null,
      addressProofFile: addressProofFile instanceof File && addressProofFile.size > 0 ? addressProofFile : null,
      cacFile: cacFile instanceof File && cacFile.size > 0 ? cacFile : null,
      hasExistingGovId,
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
