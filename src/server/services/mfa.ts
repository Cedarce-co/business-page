import "server-only";

import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";
import { prisma } from "@/server/database/prisma";
import { decryptSecret, encryptSecret } from "@/server/lib/crypto";
import { verifyPassword } from "@/server/auth/password";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import type { RequestMeta } from "@/server/lib/request-meta";
import { ensureSuperAdminAccount, getAdminUserByEmail } from "@/server/services/admin-accounts";

const ISSUER = "Cedarce";

export type LoginPrecheckStep = "complete" | "totp" | "mfa_setup";

export async function createMfaSetup(userId: string, email: string) {
  const secret = generateSecret();
  const otpauthUrl = generateURI({ issuer: ISSUER, label: email, secret });
  const qrDataUrl = await QRCode.toDataURL(otpauthUrl);

  await prisma.user.update({
    where: { id: userId },
    data: { mfaSecret: encryptSecret(secret), mfaEnabled: false, mfaEnabledAt: null },
  });

  return { qrDataUrl, manualKey: secret };
}

export async function enableMfa(userId: string, code: string, meta?: RequestMeta) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.mfaSecret) throw new Error("MFA setup has not been started.");

  const valid = await verifyTotp(user.mfaSecret, code);
  if (!valid) throw new Error("Invalid authentication code.");

  await prisma.user.update({
    where: { id: userId },
    data: { mfaEnabled: true, mfaEnabledAt: new Date() },
  });

  if (meta) {
    await logAuthAuditEvent({
      actorType: "USER",
      eventType: "MFA_ENABLED",
      userId: user.id,
      email: user.email,
      name: user.name,
      meta,
    });
  }

  return { ok: true as const };
}

export async function enableAdminMfa(userId: string, code: string, meta?: RequestMeta) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.mfaSecret) throw new Error("MFA setup has not been started.");

  const valid = await verifyTotp(user.mfaSecret, code);
  if (!valid) throw new Error("Invalid authentication code.");

  await prisma.user.update({
    where: { id: userId },
    data: { mfaEnabled: true, mfaEnabledAt: new Date() },
  });

  if (meta) {
    await logAuthAuditEvent({
      actorType: "ADMIN",
      eventType: "MFA_ENABLED",
      userId: user.id,
      email: user.email,
      name: user.name,
      meta,
    });
  }

  return { ok: true as const };
}

export async function disableMfa(userId: string, password: string, code: string, meta?: RequestMeta) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.mfaEnabled || !user.mfaSecret) throw new Error("MFA is not enabled.");

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) throw new Error("Incorrect password.");

  const valid = await verifyTotp(user.mfaSecret, code);
  if (!valid) throw new Error("Invalid authentication code.");

  await prisma.user.update({
    where: { id: userId },
    data: { mfaEnabled: false, mfaSecret: null, mfaEnabledAt: null },
  });

  if (meta) {
    await logAuthAuditEvent({
      actorType: "USER",
      eventType: "MFA_DISABLED",
      userId: user.id,
      email: user.email,
      name: user.name,
      meta,
    });
  }

  return { ok: true as const };
}

export async function verifyTotp(encryptedSecret: string, code: string) {
  const secret = decryptSecret(encryptedSecret);
  const normalized = code.replace(/\s/g, "");
  const result = await verify({ secret, token: normalized });
  return result.valid;
}

export async function getUserMfaState(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mfaEnabled: true, mfaEnabledAt: true },
  });
  return user;
}

export function adminEmailList() {
  return [] as string[];
}

export async function loadAdminEmailsFromDb() {
  const rows = await prisma.user.findMany({
    where: { adminRole: { not: null } },
    select: { email: true },
  });
  return rows.map((r) => r.email.toLowerCase());
}

export async function userLoginPrecheck(email: string, password: string): Promise<LoginPrecheckStep> {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return "complete";
  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) return "complete";
  if (user.mfaEnabled && user.mfaSecret) return "totp";
  return "complete";
}

export async function adminLoginPrecheck(email: string, password: string): Promise<LoginPrecheckStep> {
  await ensureSuperAdminAccount();
  const normalized = email.toLowerCase().trim();
  const user = await getAdminUserByEmail(normalized);
  if (!user?.adminRole) return "complete";
  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) return "complete";
  if (!user.mfaEnabled) return "mfa_setup";
  return "totp";
}
