import { apiJson } from "@/lib/http-client";

export type KycUploadField = "govId" | "addressProof" | "cac";

export async function uploadKycDocument(field: KycUploadField, file: File) {
  const body = new FormData();
  body.append("field", field);
  body.append("file", file);
  return apiJson<{ url: string; filename: string }>("/api/kyc/upload", { method: "POST", body });
}

export async function deleteKycDocument(field: KycUploadField) {
  return apiJson<{ ok: boolean }>(`/api/kyc/upload?field=${field}`, { method: "DELETE" });
}
