import { prisma } from "@/lib/prisma";
import { validateKycUpload } from "@/lib/kyc-upload";
import { assertUploadSize, storeUpload } from "@/server/uploads/store";

export type KycUploadField = "govId" | "addressProof" | "cac";

const fieldToColumn: Record<KycUploadField, "govIdUrl" | "addressProofUrl" | "cacUrl"> = {
  govId: "govIdUrl",
  addressProof: "addressProofUrl",
  cac: "cacUrl",
};

function assertKycEditable(status: string | undefined) {
  if (status === "APPROVED") {
    throw new Error("Verification is approved and cannot be changed.");
  }
}

export async function stageKycDocument(userId: string, field: KycUploadField, file: File) {
  const typeError = validateKycUpload(file);
  if (typeError) throw new Error(typeError);
  assertUploadSize(file, "File");

  const existing = await prisma.kyc.findUnique({ where: { userId } });
  assertKycEditable(existing?.status);

  const url = await storeUpload({
    folder: "kyc",
    userId,
    file,
    access: "private",
  });

  const column = fieldToColumn[field];
  await prisma.kyc.upsert({
    where: { userId },
    create: {
      userId,
      status: "PENDING",
      [column]: url,
    },
    update: {
      [column]: url,
    },
  });

  return { url, filename: file.name };
}

export async function removeKycDocument(userId: string, field: KycUploadField) {
  const existing = await prisma.kyc.findUnique({ where: { userId } });
  assertKycEditable(existing?.status);

  const column = fieldToColumn[field];
  await prisma.kyc.upsert({
    where: { userId },
    create: { userId, status: "PENDING" },
    update: { [column]: null },
  });
}

export function filenameFromKycUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const name = url.split("/").pop() ?? "";
    const cleaned = name.replace(/^\d+-/, "");
    return cleaned || "Uploaded file";
  } catch {
    return "Uploaded file";
  }
}
