import { apiJson } from "@/lib/http-client";
import type { KycInput } from "@/features/kyc/types";

export async function submitKyc(payload: KycInput) {
  if (!payload.govIdFile) {
    throw new Error("Government ID file is required.");
  }

  const body = new FormData();
  body.append("businessName", payload.businessName);
  body.append("businessAddress", payload.businessAddress);
  body.append("businessCity", payload.businessCity);
  body.append("businessState", payload.businessState);
  if (payload.businessWebsite) body.append("businessWebsite", payload.businessWebsite);
  if (payload.businessEmail) body.append("businessEmail", payload.businessEmail);
  if (payload.socialHandle) body.append("socialHandle", payload.socialHandle);
  if (payload.cacNumber) body.append("cacNumber", payload.cacNumber);
  body.append("govIdType", payload.govIdType);
  body.append("govIdFile", payload.govIdFile);
  if (payload.cacFile) body.append("cacFile", payload.cacFile);

  return apiJson<{ ok: boolean }>("/api/kyc", { method: "POST", body });
}
