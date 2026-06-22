export const KYC_ACCEPT = "image/png,image/jpeg,application/pdf,.png,.jpg,.jpeg,.pdf";

const KYC_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/jpg", "application/pdf"]);

export function validateKycUpload(file: File): string | null {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  const mimeOk = !type || KYC_MIME_TYPES.has(type);
  const extOk = /\.(png|jpe?g|pdf)$/.test(name);
  if (!mimeOk && !extOk) return "Only PNG, JPEG, and PDF files are allowed.";
  return null;
}

export function kycFileKind(url: string) {
  const clean = url.split("?")[0]?.toLowerCase() ?? "";
  if (/\.(png|jpe?g)$/i.test(clean)) return "image" as const;
  if (/\.pdf$/i.test(clean)) return "pdf" as const;
  return "other" as const;
}
