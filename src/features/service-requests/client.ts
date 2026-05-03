import { apiJson } from "@/lib/http-client";
import type { ServiceRequestInput } from "@/features/service-requests/types";

export async function createServiceRequest(payload: ServiceRequestInput) {
  return apiJson<{ ok: boolean }>("/api/service-requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
