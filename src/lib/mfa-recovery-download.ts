export function normalizeRecoveryCode(input: string) {
  return input.replace(/[\s-]/g, "").toUpperCase();
}

export function formatRecoveryCodeInput(raw: string) {
  const normalized = normalizeRecoveryCode(raw).slice(0, 8);
  if (normalized.length <= 4) return normalized;
  return `${normalized.slice(0, 4)}-${normalized.slice(4)}`;
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

export function downloadRecoveryCodesFile({
  codes,
  email,
  portal,
}: {
  codes: string[];
  email: string;
  portal: "user" | "admin";
}) {
  const text = buildRecoveryCodesDownload({ codes, email, portal });
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  anchor.href = url;
  anchor.download = `cedarce-${portal}-recovery-codes-${stamp}.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}
