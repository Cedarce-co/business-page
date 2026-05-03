import { apiJson } from "@/lib/http-client";
import type { ForgotPasswordInput, ResetPasswordInput } from "@/features/password-reset/types";

export async function requestPasswordReset(payload: ForgotPasswordInput) {
  return apiJson<{ ok: true }>(`/api/auth/forgot-password`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function resetPassword(payload: ResetPasswordInput) {
  return apiJson<{ ok: true }>(`/api/auth/reset-password`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

