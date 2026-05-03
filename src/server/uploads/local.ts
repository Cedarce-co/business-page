import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function savePublicUpload(input: {
  folder: string; // e.g. "avatars" | "kyc"
  userId: string;
  file: File;
}) {
  const ext = path.extname(input.file.name);
  const base = safeName(path.basename(input.file.name, ext));
  const id = crypto.randomUUID();
  const filename = `${Date.now()}-${base}-${id}${ext || ""}`;

  const relDir = path.join("uploads", input.folder, input.userId);
  const absDir = path.join(process.cwd(), "public", relDir);
  await mkdir(absDir, { recursive: true });

  const absPath = path.join(absDir, filename);
  const buf = Buffer.from(await input.file.arrayBuffer());
  await writeFile(absPath, buf);

  return { url: `/${path.posix.join(relDir.replaceAll(path.sep, "/"), filename)}` };
}

