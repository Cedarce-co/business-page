import "server-only";

import { get } from "@vercel/blob";
import { isPrivateStorageRef, readPrivateUpload } from "@/server/uploads/private-local";

function isBlobUrl(url: string) {
  return url.includes("blob.vercel-storage.com") || url.startsWith("https://");
}

export async function streamStoredFile(storedUrl: string) {
  if (isPrivateStorageRef(storedUrl)) {
    const { buf, contentType, filename } = await readPrivateUpload(storedUrl);
    return {
      body: new Uint8Array(buf),
      contentType,
      filename,
    };
  }

  if (isBlobUrl(storedUrl)) {
    const result = await get(storedUrl, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error("Document not found.");
    }
    const chunks: Uint8Array[] = [];
    const reader = result.stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const total = chunks.reduce((n, c) => n + c.length, 0);
    const body = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.length;
    }
    return {
      body,
      contentType: result.blob.contentType ?? "application/octet-stream",
      filename: result.blob.pathname.split("/").pop() ?? "document",
    };
  }

  // Legacy public local path. Still serve through proxy only.
  if (storedUrl.startsWith("/uploads/")) {
    const { readFile } = await import("node:fs/promises");
    const path = await import("node:path");
    const absPath = path.join(process.cwd(), "public", storedUrl);
    const buf = await readFile(absPath);
    const ext = path.extname(storedUrl).toLowerCase();
    const contentType =
      ext === ".pdf"
        ? "application/pdf"
        : ext === ".png"
          ? "image/png"
          : ext === ".jpg" || ext === ".jpeg"
            ? "image/jpeg"
            : "application/octet-stream";
    return {
      body: new Uint8Array(buf),
      contentType,
      filename: path.basename(storedUrl),
    };
  }

  throw new Error("Unsupported document storage.");
}
