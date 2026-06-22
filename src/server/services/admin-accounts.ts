import "server-only";

import crypto from "node:crypto";
import type { UserAdminRole } from "@prisma/client";
import { prisma } from "@/server/database/prisma";
import { hashPassword, verifyPassword } from "@/server/auth/password";
import { SUPER_ADMIN_EMAIL } from "@/lib/admin-roles";
import { sendEmailSafe } from "@/server/emails/sender";
import { adminInviteEmail } from "@/server/emails/templates/admin-invite";
import { getAppUrl } from "@/server/emails/sender";

function sha256Hex(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function newToken() {
  return crypto.randomBytes(32).toString("base64url");
}

/** Ensures support@cedarce.com (or ADMIN_LOGIN_EMAIL) exists as SUPER_ADMIN when env password is set. */
export async function ensureSuperAdminAccount() {
  const email = (process.env.ADMIN_LOGIN_EMAIL ?? SUPER_ADMIN_EMAIL).toLowerCase().trim();
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    if (!existing.adminRole) {
      await prisma.user.update({
        where: { id: existing.id },
        data: { adminRole: "SUPER_ADMIN" },
      });
    }
    return existing;
  }

  const envPassword = process.env.ADMIN_LOGIN_PASSWORD ?? "";
  if (!envPassword) return null;

  const passwordHash = await hashPassword(envPassword);
  return prisma.user.create({
    data: {
      name: "Cedarce Admin",
      email,
      passwordHash,
      adminRole: "SUPER_ADMIN",
      profile: { create: {} },
    },
  });
}

export async function listAdminAccounts() {
  return prisma.user.findMany({
    where: { adminRole: { not: null } },
    select: {
      id: true,
      name: true,
      email: true,
      adminRole: true,
      mfaEnabled: true,
      createdAt: true,
    },
    orderBy: [{ adminRole: "asc" }, { createdAt: "asc" }],
  });
}

export async function inviteAdmin(input: {
  invitedById: string;
  name: string;
  email: string;
}) {
  const email = input.email.toLowerCase().trim();
  const name = input.name.trim();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing?.adminRole) {
    throw new Error("This email already has admin access.");
  }

  const pending = await prisma.adminInvite.findFirst({
    where: { email, acceptedAt: null, expiresAt: { gt: new Date() } },
  });
  if (pending) {
    throw new Error("An invite is already pending for this email.");
  }

  const token = newToken();
  const tokenHash = sha256Hex(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  await prisma.adminInvite.create({
    data: {
      email,
      name,
      tokenHash,
      invitedById: input.invitedById,
      expiresAt,
    },
  });

  const tpl = adminInviteEmail({ name, joinToken: token });
  await sendEmailSafe({ to: email, subject: tpl.subject, html: tpl.html });

  return { ok: true as const, joinUrl: `${getAppUrl()}/admin/join?token=${token}` };
}

export async function validateAdminInviteToken(token: string) {
  const tokenHash = sha256Hex(token);
  const invite = await prisma.adminInvite.findUnique({ where: { tokenHash } });
  if (!invite || invite.acceptedAt || invite.expiresAt.getTime() < Date.now()) {
    return null;
  }
  return { email: invite.email, name: invite.name };
}

export async function acceptAdminInvite(input: { token: string; password: string }) {
  const tokenHash = sha256Hex(input.token);
  const invite = await prisma.adminInvite.findUnique({ where: { tokenHash } });
  if (!invite || invite.acceptedAt || invite.expiresAt.getTime() < Date.now()) {
    throw new Error("This invite link is invalid or has expired.");
  }

  const passwordHash = await hashPassword(input.password);
  const email = invite.email.toLowerCase().trim();

  const userId = await prisma.$transaction(async (tx) => {
    const existing = await tx.user.findUnique({ where: { email } });
    let savedUserId: string;

    if (existing) {
      if (existing.adminRole) throw new Error("This account already has admin access.");
      await tx.user.update({
        where: { id: existing.id },
        data: { name: invite.name, passwordHash, adminRole: "ADMIN" as UserAdminRole },
      });
      savedUserId = existing.id;
    } else {
      const created = await tx.user.create({
        data: {
          name: invite.name,
          email,
          passwordHash,
          adminRole: "ADMIN",
          profile: { create: {} },
        },
      });
      savedUserId = created.id;
    }

    await tx.adminInvite.update({
      where: { id: invite.id },
      data: { acceptedAt: new Date() },
    });

    return savedUserId;
  });

  return { ok: true as const, userId };
}

export async function removeAdminAccount(actorId: string, targetUserId: string) {
  if (actorId === targetUserId) {
    throw new Error("You cannot remove your own admin access.");
  }

  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, adminRole: true },
  });

  if (!target?.adminRole) {
    throw new Error("This user is not an admin.");
  }

  if (target.adminRole === "SUPER_ADMIN") {
    throw new Error("Super admin accounts cannot be removed.");
  }

  await prisma.user.delete({ where: { id: targetUserId } });
  return { ok: true as const };
}

export async function getAdminUserByEmail(email: string) {
  const normalized = email.toLowerCase().trim();
  return prisma.user.findUnique({
    where: { email: normalized },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      adminRole: true,
      passwordHash: true,
      mfaEnabled: true,
      mfaSecret: true,
    },
  });
}

export async function verifyAdminPassword(email: string, password: string) {
  const user = await getAdminUserByEmail(email);
  if (!user?.adminRole) return null;
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return null;
  return user;
}
