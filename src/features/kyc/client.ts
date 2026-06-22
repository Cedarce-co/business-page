import { apiJson } from "@/lib/http-client";
import type { KycInput } from "@/features/kyc/types";

export async function submitKyc(payload: KycInput) {
  if (!payload.govIdFile && !payload.hasExistingGovId) {
    throw new Error("Government ID file is required.");
  }

  const body = new FormData();
  if (payload.phone) body.append("phone", payload.phone);
  if (payload.personalAddress) body.append("personalAddress", payload.personalAddress);
  if (payload.personalCity) body.append("personalCity", payload.personalCity);
  if (payload.personalCountry) body.append("personalCountry", payload.personalCountry);
  if (payload.businessName) body.append("businessName", payload.businessName);
  if (payload.businessAddress) body.append("businessAddress", payload.businessAddress);
  if (payload.businessCity) body.append("businessCity", payload.businessCity);
  if (payload.businessState) body.append("businessState", payload.businessState);
  if (payload.businessWebsite) body.append("businessWebsite", payload.businessWebsite);
  if (payload.businessEmail) body.append("businessEmail", payload.businessEmail);
  if (payload.socialHandle) body.append("socialHandle", payload.socialHandle);
  if (payload.cacNumber) body.append("cacNumber", payload.cacNumber);
  if (payload.govIdType) body.append("govIdType", payload.govIdType);
  if (payload.govIdFile) body.append("govIdFile", payload.govIdFile);
  if (payload.addressProofFile) body.append("addressProofFile", payload.addressProofFile);
  if (payload.cacFile) body.append("cacFile", payload.cacFile);
  if (payload.hasExistingGovId) body.append("hasExistingGovId", "1");
  if (payload.hasExistingAddressProof) body.append("hasExistingAddressProof", "1");

  return apiJson<{ ok: boolean }>("/api/kyc", { method: "POST", body });
}
