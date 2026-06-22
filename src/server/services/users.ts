import { prisma } from "@/server/database/prisma";
import { hashPassword, verifyPassword } from "@/server/auth/password";
import type { SignupInput } from "@/features/auth/types";
import { sendEmailSafe, emailAdminsSafe } from "@/server/emails/sender";
import { welcomeEmail } from "@/server/emails/templates/welcome";
import { signupAdminEmail } from "@/server/emails/templates/signup-admin";
import { notifyAdmins } from "@/server/services/notifications";

export async function createUser(payload: SignupInput) {
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
  await sendEmailSafe({ to: user.email, subject: tpl.subject, html: tpl.html });

  const adminTpl = signupAdminEmail({
    name: user.name,
    email: user.email,
    phone: payload.phone,
    city: payload.city,
  });
  await emailAdminsSafe(adminTpl.subject, adminTpl.html);

  await notifyAdmins({
    title: "New account signup",
    message: `${user.name} (${user.email}) created an account.`,
    href: "/admin/users",
  });

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
  const adminEmail = (process.env.ADMIN_LOGIN_EMAIL ?? "").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_LOGIN_PASSWORD ?? "";
  const email = emailRaw.toLowerCase().trim();
  const password = passwordRaw;

  if (!adminEmail || !adminPassword) return null;
  if (email !== adminEmail) return null;
  if (password !== adminPassword) return null;

  // Ensure a DB user exists so JWT refresh callbacks work.
  const passwordHash = await hashPassword(adminPassword);
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash,
      profile: { create: {} },
    },
    update: { passwordHash },
    select: { id: true, email: true, name: true, image: true },
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image ?? undefined,
    kycComplete: true,
  };
}
