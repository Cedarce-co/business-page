import type { KycDocumentField } from "@/server/services/kyc-documents";

export function kycDocumentProxyUrl(field: KycDocumentField, userId?: string) {
  const params = new URLSearchParams({ field });
  if (userId) params.set("userId", userId);
  return `/api/kyc/documents?${params.toString()}`;
}

export function maskKycDocumentUrls<T extends {
  govIdUrl?: string | null;
  cacUrl?: string | null;
  addressProofUrl?: string | null;
} | null>(kyc: T, userId?: string): T {
  if (!kyc) return kyc;
  return {
    ...kyc,
    govIdUrl: kyc.govIdUrl ? kycDocumentProxyUrl("govId", userId) : kyc.govIdUrl,
    cacUrl: kyc.cacUrl ? kycDocumentProxyUrl("cac", userId) : kyc.cacUrl,
    addressProofUrl: kyc.addressProofUrl ? kycDocumentProxyUrl("addressProof", userId) : kyc.addressProofUrl,
  };
}
