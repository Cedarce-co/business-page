import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const PRIVATE_PREFIX = "private-storage:";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function privateRoot() {
  return path.join(process.cwd(), ".data", "private-uploads");
}

export function isPrivateStorageRef(ref: string) {
  return ref.startsWith(PRIVATE_PREFIX);
}

export function privateStorageKey(folder: string, userId: string, filename: string) {
  return `${PRIVATE_PREFIX}${folder}/${userId}/${filename}`;
}

export async function savePrivateUpload(input: {
  folder: string;
  userId: string;
  file: File;
}) {
  const ext = path.extname(input.file.name);
  const base = safeName(path.basename(input.file.name, ext));
  const id = crypto.randomUUID();
  const filename = `${Date.now()}-${base}-${id}${ext || ""}`;

  const relDir = path.join(input.folder, input.userId);
  const absDir = path.join(privateRoot(), relDir);
  await mkdir(absDir, { recursive: true });

  const absPath = path.join(absDir, filename);
  const buf = Buffer.from(await input.file.arrayBuffer());
  await writeFile(absPath, buf);

  return privateStorageKey(input.folder, input.userId, filename);
}

export async function readPrivateUpload(ref: string) {
  if (!isPrivateStorageRef(ref)) throw new Error("Not a private storage reference.");
  const rel = ref.slice(PRIVATE_PREFIX.length);
  const absPath = path.join(privateRoot(), rel);
  const buf = await readFile(absPath);
  const ext = path.extname(rel).toLowerCase();
  const contentType =
    ext === ".pdf"
      ? "application/pdf"
      : ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : "application/octet-stream";
  return { buf, contentType, filename: path.basename(rel) };
}
