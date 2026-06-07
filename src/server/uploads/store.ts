import "server-only";

import { put } from "@vercel/blob";
import { MAX_UPLOAD_BYTES } from "@/lib/upload-limits";
import { savePublicUpload } from "@/server/uploads/local";

export class UploadConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadConfigError";
  }
}

type StoreUploadInput = {
  folder: string;
  userId: string;
  file: File;
  access: "public" | "private";
};

/** Vercel Blob via OIDC (BLOB_STORE_ID + VERCEL_OIDC_TOKEN) or legacy BLOB_READ_WRITE_TOKEN. */
export function isBlobConfigured(): boolean {
  if (process.env.BLOB_READ_WRITE_TOKEN) return true;
  if (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN) return true;
  return false;
}

export function assertUploadSize(file: File, label = "File") {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`${label} must be ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB or less.`);
  }
}

export async function storeUpload(input: StoreUploadInput): Promise<string> {
  assertUploadSize(input.file);

  if (isBlobConfigured()) {
    const blob = await put(
      `${input.folder}/${input.userId}/${Date.now()}-${input.file.name}`,
      input.file,
      { access: input.access },
    );
    return blob.url;
  }

  if (process.env.VERCEL) {
    throw new UploadConfigError(
      "File uploads are not configured for production. Connect Vercel Blob to this project (Storage → Blob).",
    );
  }

  const saved = await savePublicUpload({
    folder: input.folder,
    userId: input.userId,
    file: input.file,
  });
  return saved.url;
}
