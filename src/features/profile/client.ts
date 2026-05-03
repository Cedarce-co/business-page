import { apiJson } from "@/lib/http-client";
import type { ProfileInput } from "@/features/profile/types";

export async function updateProfile(payload: ProfileInput) {
  return apiJson<{ ok: boolean }>("/api/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function uploadProfilePhoto(file: File) {
  const body = new FormData();
  body.append("file", file);
  return apiJson<{ url: string }>("/api/profile/photo", { method: "POST", body });
}
