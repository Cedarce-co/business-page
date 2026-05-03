import { apiJson } from "@/lib/http-client";
import type { SignupInput } from "@/features/auth/types";

export async function signupUser(payload: SignupInput) {
  return apiJson<{ ok: boolean; user: { id: string; email: string } }>("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
