import { Resend } from "resend";
import { SUPPORT_EMAIL } from "@/lib/contact";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
};

function getAdmins() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function getAppUrl() {
  return (process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/+$/, "");
}

export async function sendEmail({ to, subject, html }: SendEmailInput) {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || `Support <${SUPPORT_EMAIL}>`;

  if (!resendKey) {
    // eslint-disable-next-line no-console
    console.log(`[email] No RESEND_API_KEY. Would send to=${Array.isArray(to) ? to.join(",") : to} subject="${subject}"`);
    return { ok: true as const };
  }

  const resend = new Resend(resendKey);
  await resend.emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });

  return { ok: true as const };
}

export async function emailAdmins(subject: string, html: string) {
  const admins = getAdmins();
  if (admins.length === 0) return { ok: true as const };
  return sendEmail({ to: admins, subject, html });
}

