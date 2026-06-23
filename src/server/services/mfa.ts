import "server-only";

import type { AuditActorType } from "@prisma/client";
import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";
import { prisma } from "@/server/database/prisma";
import { decryptSecret, encryptSecret } from "@/server/lib/crypto";
import { verifyPassword } from "@/server/auth/password";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import type { RequestMeta } from "@/server/lib/request-meta";
import { generateRecoveryCodeSet, hashRecoveryCode } from "@/server/services/mfa-recovery";
import { ensureSuperAdminAccount, getAdminUserByEmail } from "@/server/services/admin-accounts";
import { sendEmailContentSafe } from "@/server/emails/sender";
import { mfaEnabledEmail } from "@/server/emails/templates/mfa-enabled";

const ISSUER = "Cedarce";

export type LoginPrecheckStep = "complete" | "totp" | "mfa_setup";

async function persistMfaEnable(userId: string, recoveryHashes: string[]) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaEnabled: true,
      mfaEnabledAt: new Date(),
      mfaRecoveryHashes: recoveryHashes,
    },
  });
}

export async function createMfaSetup(userId: string, email: string) {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { mfaEnabled: true },
  });
  if (existing?.mfaEnabled) {
    throw new Error(
      "Two-factor authentication is already enabled. Sign in with your existing authenticator app.",
    );
  }

  const secret = generateSecret();
  const otpauthUrl = generateURI({ issuer: ISSUER, label: email, secret });
  const qrDataUrl = await QRCode.toDataURL(otpauthUrl);

  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaSecret: encryptSecret(secret),
      mfaEnabled: false,
      mfaEnabledAt: null,
      mfaRecoveryHashes: [],
    },
  });

  return { qrDataUrl, manualKey: secret };
}

export async function enableMfa(userId: string, code: string, meta?: RequestMeta) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.mfaSecret) throw new Error("MFA setup has not been started.");

  const valid = await verifyTotp(user.mfaSecret, code);
  if (!valid) throw new Error("Invalid authentication code.");

  const { plainCodes, hashes } = generateRecoveryCodeSet();
  await persistMfaEnable(userId, hashes);

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

  await sendEmailContentSafe(user.email, mfaEnabledEmail({ name: user.name, portal: "user" }));

  return { ok: true as const, recoveryCodes: plainCodes };
}

export async function enableAdminMfa(userId: string, code: string, meta?: RequestMeta) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.mfaSecret) throw new Error("MFA setup has not been started.");

  const valid = await verifyTotp(user.mfaSecret, code);
  if (!valid) throw new Error("Invalid authentication code.");

  const { plainCodes, hashes } = generateRecoveryCodeSet();
  await persistMfaEnable(userId, hashes);

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

  await sendEmailContentSafe(user.email, mfaEnabledEmail({ name: user.name, portal: "admin" }));

  return { ok: true as const, recoveryCodes: plainCodes };
}

async function disableMfaForUser(
  userId: string,
  password: string,
  code: string,
  actorType: AuditActorType,
  meta?: RequestMeta,
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.mfaEnabled || !user.mfaSecret) throw new Error("MFA is not enabled.");

  if (actorType === "ADMIN" && !user.adminRole) {
    throw new Error("Admin access is required.");
  }

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) throw new Error("Incorrect password.");

  const valid = await verifyTotp(user.mfaSecret, code);
  if (!valid) throw new Error("Invalid authentication code.");

  await prisma.user.update({
    where: { id: userId },
    data: {
      mfaEnabled: false,
      mfaSecret: null,
      mfaEnabledAt: null,
      mfaRecoveryHashes: [],
    },
  });

  if (meta) {
    await logAuthAuditEvent({
      actorType,
      eventType: "MFA_DISABLED",
      userId: user.id,
      email: user.email,
      name: user.name,
      meta,
    });
  }

  return { ok: true as const };
}

export async function disableMfa(userId: string, password: string, code: string, meta?: RequestMeta) {
  return disableMfaForUser(userId, password, code, "USER", meta);
}

export async function disableAdminMfa(userId: string, password: string, code: string, meta?: RequestMeta) {
  return disableMfaForUser(userId, password, code, "ADMIN", meta);
}

export async function regenerateRecoveryCodes(
  userId: string,
  password: string,
  code: string,
  actorType: AuditActorType,
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.mfaEnabled || !user.mfaSecret) throw new Error("MFA is not enabled.");

  if (actorType === "ADMIN" && !user.adminRole) {
    throw new Error("Admin access is required.");
  }

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) throw new Error("Incorrect password.");

  const valid = await verifyTotp(user.mfaSecret, code);
  if (!valid) throw new Error("Invalid authentication code.");

  const { plainCodes, hashes } = generateRecoveryCodeSet();
  await prisma.user.update({
    where: { id: userId },
    data: { mfaRecoveryHashes: hashes },
  });

  return { ok: true as const, recoveryCodes: plainCodes };
}

export async function verifyAndConsumeRecoveryCode(userId: string, code: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mfaEnabled: true, mfaRecoveryHashes: true },
  });
  if (!user?.mfaEnabled || user.mfaRecoveryHashes.length === 0) return false;

  const hash = hashRecoveryCode(code);
  const index = user.mfaRecoveryHashes.indexOf(hash);
  if (index === -1) return false;

  const remaining = [...user.mfaRecoveryHashes];
  remaining.splice(index, 1);
  await prisma.user.update({
    where: { id: userId },
    data: { mfaRecoveryHashes: remaining },
  });

  return true;
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
    select: { mfaEnabled: true, mfaEnabledAt: true, mfaRecoveryHashes: true },
  });
  if (!user) return null;
  return {
    mfaEnabled: user.mfaEnabled,
    mfaEnabledAt: user.mfaEnabledAt,
    recoveryCodesRemaining: user.mfaRecoveryHashes.length,
  };
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
  if (user.mfaEnabled && user.mfaSecret) return "totp";
  return "mfa_setup";
}
