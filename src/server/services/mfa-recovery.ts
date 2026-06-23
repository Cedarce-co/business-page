import "server-only";

import crypto from "node:crypto";

const CODE_COUNT = 10;
const CHARSET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function normalizeRecoveryCode(input: string) {
  return input.replace(/[\s-]/g, "").toUpperCase();
}

export function hashRecoveryCode(code: string) {
  return crypto.createHash("sha256").update(normalizeRecoveryCode(code)).digest("hex");
}

function randomSegment(length: number) {
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CHARSET[bytes[i]! % CHARSET.length];
  }
  return out;
}

export function generateRecoveryCodeSet(count = CODE_COUNT) {
  const plainCodes: string[] = [];
  const hashes: string[] = [];
  const seen = new Set<string>();

  while (plainCodes.length < count) {
    const code = `${randomSegment(4)}-${randomSegment(4)}`;
    const hash = hashRecoveryCode(code);
    if (seen.has(hash)) continue;
    seen.add(hash);
    plainCodes.push(code);
    hashes.push(hash);
  }

  return { plainCodes, hashes };
}

export function buildRecoveryCodesDownload({
  codes,
  email,
  portal,
}: {
  codes: string[];
  email: string;
  portal: "user" | "admin";
}) {
  const lines = [
    "Cedarce account recovery codes",
    `Account: ${email}`,
    `Portal: ${portal === "admin" ? "Admin" : "Client"}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "Each code can be used once if you lose access to your authenticator app.",
    "Store these codes in a safe place. They will not be shown again.",
    "",
    ...codes.map((code, index) => `${index + 1}. ${code}`),
    "",
  ];
  return lines.join("\n");
}
