import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import { kycTextSchema } from "@/features/kyc/types";
import { getKyc, submitKyc } from "@/server/services/kyc";

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

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) return NextResponse.json({ error: "ID file must be 5MB or less." }, { status: 400 });
    if (cacFile instanceof File && cacFile.size > maxSize) {
      return NextResponse.json({ error: "CAC file must be 5MB or less." }, { status: 400 });
    }

    await submitKyc(userId, {
      ...parsed.data,
      govIdFile: file,
      cacFile: cacFile instanceof File ? cacFile : null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not submit verification." }, { status: 500 });
  }
}
