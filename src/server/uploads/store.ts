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

function blobAuthFlags() {
  return {
    hasStoreId: Boolean(process.env.BLOB_STORE_ID),
    hasOidc: Boolean(process.env.VERCEL_OIDC_TOKEN),
    hasRwToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    onVercel: process.env.VERCEL === "1",
  };
}

/** True when Blob credentials appear present (OIDC or legacy token). */
export function isBlobConfigured(): boolean {
  const { hasStoreId, hasOidc, hasRwToken } = blobAuthFlags();
  if (hasRwToken) return true;
  if (hasStoreId && hasOidc) return true;
  // Store connected; OIDC token is injected at runtime on Vercel and may not be visible in the dashboard.
  if (hasStoreId && process.env.VERCEL === "1") return true;
  return false;
}

export function assertUploadSize(file: File, label = "File") {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`${label} must be ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB or less.`);
  }
}

async function uploadToBlob(input: StoreUploadInput): Promise<string> {
  const pathname = `${input.folder}/${input.userId}/${Date.now()}-${input.file.name}`;
  const storeId = process.env.BLOB_STORE_ID;
  const oidcToken = process.env.VERCEL_OIDC_TOKEN;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  const blob = await put(pathname, input.file, {
    access: input.access,
    ...(storeId ? { storeId } : {}),
    ...(oidcToken ? { oidcToken } : {}),
    ...(token ? { token } : {}),
  });

  return blob.url;
}

export async function storeUpload(input: StoreUploadInput): Promise<string> {
  assertUploadSize(input.file);

  const onVercel = process.env.VERCEL === "1";
  const shouldUseBlob = onVercel || isBlobConfigured();

  if (shouldUseBlob) {
    try {
      return await uploadToBlob(input);
    } catch (error) {
      console.error("[storeUpload] blob put failed:", blobAuthFlags(), error);
      throw new UploadConfigError(
        onVercel
          ? "File upload failed. In Vercel → Storage → Blob, connect the store to this project for Production, then redeploy."
          : "File upload failed. Run `vercel env pull` for Blob credentials, or omit Blob env vars to use local uploads.",
      );
    }
  }

  const saved = await savePublicUpload({
    folder: input.folder,
    userId: input.userId,
    file: input.file,
  });
  return saved.url;
}
