import { hashPassword, verifyPassword } from "@/server/auth/password";
import type { SignupInput } from "@/features/auth/types";
import { sendEmailContentSafe, emailAdminsContentSafe } from "@/server/emails/sender";
import { welcomeEmail } from "@/server/emails/templates/welcome";
import { signupAdminEmail } from "@/server/emails/templates/signup-admin";
import { notifyAdmins } from "@/server/services/notifications";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import type { RequestMeta } from "@/server/lib/request-meta";
import { ensureSuperAdminAccount, getAdminUserByEmail } from "@/server/services/admin-accounts";
import { prisma } from "@/server/database/prisma";

export async function createUser(payload: SignupInput, meta?: RequestMeta) {
  const email = payload.email.toLowerCase().trim();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return { ok: false as const, error: "An account with this email already exists." };

  const passwordHash = await hashPassword(payload.password);
  const name = payload.name.trim();
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      phone: payload.phone?.trim() || null,
      profile: {
        create: {
          address: payload.address?.trim() || null,
          city: payload.city?.trim() || null,
          country: payload.country?.trim() || null,
        },
      },
    },
    select: { id: true, email: true, name: true },
  });

  const tpl = welcomeEmail({ name: user.name });
  await sendEmailContentSafe(user.email, tpl);

  const adminTpl = signupAdminEmail({
    name: user.name,
    email: user.email,
    phone: payload.phone,
    city: payload.city,
  });
  await emailAdminsContentSafe(adminTpl);

  await notifyAdmins({
    title: "New account signup",
    message: `${user.name} (${user.email}) created an account.`,
    href: "/admin/users",
  });

  if (meta) {
    await logAuthAuditEvent({
      actorType: "USER",
      eventType: "SIGNUP",
      userId: user.id,
      email: user.email,
      name: user.name,
      meta,
    });
  }

  return { ok: true as const, user };
}

export async function validateCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { kyc: true },
  });
  if (!user) return null;

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image ?? undefined,
    kycComplete: user.kyc?.status === "APPROVED",
  };
}

export async function validateAdminLogin(emailRaw: string, passwordRaw: string) {
  await ensureSuperAdminAccount();

  const email = emailRaw.toLowerCase().trim();
  const user = await getAdminUserByEmail(email);
  if (!user?.adminRole) return null;

  const passwordOk = await verifyPassword(passwordRaw, user.passwordHash);
  if (!passwordOk) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image ?? undefined,
    kycComplete: true,
    adminRole: user.adminRole,
  };
}
