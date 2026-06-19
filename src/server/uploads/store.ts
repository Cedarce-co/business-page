import "server-only";

import { BlobError, put } from "@vercel/blob";
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

function blobAuthFlags() {
  return {
    hasStoreId: Boolean(process.env.BLOB_STORE_ID),
    hasOidcEnv: Boolean(process.env.VERCEL_OIDC_TOKEN),
    hasRwToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    onVercel: process.env.VERCEL === "1",
  };
}

/** True when Blob credentials appear present (OIDC store link or legacy token). */
export function isBlobConfigured(): boolean {
  const { hasStoreId, hasRwToken, onVercel } = blobAuthFlags();
  if (hasRwToken) return true;
  // @vercel/blob >= 2.4 resolves OIDC via @vercel/oidc when BLOB_STORE_ID is set on Vercel.
  if (hasStoreId && onVercel) return true;
  return false;
}

export function assertUploadSize(file: File, label = "File") {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`${label} must be ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB or less.`);
  }
}

function uploadFailureMessage(error: unknown, onVercel: boolean): string {
  const detail = error instanceof Error ? error.message : "Unknown upload error";

  if (detail.includes("No blob credentials")) {
    return onVercel
      ? "File uploads are not configured. Connect Vercel Blob to this project (Storage → Blob → connect store for Production), then redeploy. Or add BLOB_READ_WRITE_TOKEN from the Blob store to Production env vars."
      : "File uploads are not configured. Set BLOB_READ_WRITE_TOKEN or run `vercel env pull` for local Blob access.";
  }

  if (detail.includes("OIDC")) {
    return "Blob authentication failed. In Vercel → your Blob store → Projects, choose Upgrade to OIDC for this project, or add BLOB_READ_WRITE_TOKEN to Production environment variables and redeploy.";
  }

  if (error instanceof BlobError) {
    return onVercel
      ? `File upload failed: ${detail}. Confirm the Blob store is connected for Production and supports private uploads.`
      : `File upload failed: ${detail}`;
  }

  return onVercel
    ? "File upload failed. Connect Vercel Blob to this project for Production, then redeploy."
    : `File upload failed: ${detail}`;
}

async function uploadToBlob(input: StoreUploadInput): Promise<string> {
  const pathname = `${input.folder}/${input.userId}/${Date.now()}-${input.file.name}`;

  const blob = await put(pathname, input.file, {
    access: input.access,
  });

  return blob.url;
}

export async function storeUpload(input: StoreUploadInput): Promise<string> {
  assertUploadSize(input.file);

  const onVercel = process.env.VERCEL === "1";
  const shouldUseBlob = onVercel || isBlobConfigured();

  if (shouldUseBlob) {
    if (onVercel && !isBlobConfigured()) {
      throw new UploadConfigError(uploadFailureMessage(new BlobError("No blob credentials"), true));
    }

    try {
      return await uploadToBlob(input);
    } catch (error) {
      console.error("[storeUpload] blob put failed:", blobAuthFlags(), error);
      throw new UploadConfigError(uploadFailureMessage(error, onVercel));
    }
  }

  const saved = await savePublicUpload({
    folder: input.folder,
    userId: input.userId,
    file: input.file,
  });
  return saved.url;
}
