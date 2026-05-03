import crypto from "node:crypto";
import { prisma } from "@/server/database/prisma";
import { hashPassword } from "@/server/auth/password";
import { sendEmail } from "@/server/emails/sender";
import { passwordResetEmail } from "@/server/emails/templates/password-reset";

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function newToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export async function requestPasswordReset(emailRaw: string) {
  const email = emailRaw.toLowerCase().trim();
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true, name: true } });

  // Always act like it worked to avoid account enumeration.
  if (!user) return { ok: true as const };

  const token = newToken();
  const tokenHash = sha256Hex(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 45); // 45 minutes

  await prisma.passwordResetToken.create({
    data: { userId: user.id, tokenHash, expiresAt },
  });

  const tpl = passwordResetEmail({ resetToken: token });
  await sendEmail({ to: user.email, subject: tpl.subject, html: tpl.html });

  return { ok: true as const };
}

export async function performPasswordReset(token: string, newPassword: string) {
  const tokenHash = sha256Hex(token);
  const now = new Date();

  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    select: { id: true, userId: true, expiresAt: true, usedAt: true },
  });

  if (!record || record.usedAt || record.expiresAt.getTime() < now.getTime()) {
    return { ok: false as const, error: "This reset link is invalid or has expired." };
  }

  const passwordHash = await hashPassword(newPassword);

  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: now } }),
  ]);

  return { ok: true as const };
}

