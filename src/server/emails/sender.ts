import { Resend } from "resend";
import { SUPPORT_EMAIL } from "@/lib/contact";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
};

export type SendEmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

function getAdminList() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function getAppUrl() {
  return (process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/+$/, "");
}

export function getAdminRecipients() {
  const admins = getAdminList();
  if (admins.length > 0) return admins;
  return [SUPPORT_EMAIL];
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<SendEmailResult> {
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || `Cedarce <${SUPPORT_EMAIL}>`;

  if (!resendKey || resendKey.startsWith("re_1234567890")) {
    console.warn(
      `[email] RESEND_API_KEY is missing or still a placeholder. Skipped: subject="${subject}" to=${Array.isArray(to) ? to.join(",") : to}`,
    );
    return { ok: false, error: "missing_or_placeholder_api_key" };
  }

  try {
    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error("[email] Resend API error:", error);
      return { ok: false, error: error.message ?? "resend_error" };
    }

    return { ok: true, id: data?.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "send_failed";
    console.error("[email] Send failed:", message);
    return { ok: false, error: message };
  }
}

/** Send without throwing. Use after DB writes so a mail failure does not roll back the action. */
export async function sendEmailSafe(input: SendEmailInput) {
  return sendEmail(input);
}

export async function emailAdmins(subject: string, html: string) {
  return sendEmail({ to: getAdminRecipients(), subject, html });
}

export async function emailAdminsSafe(subject: string, html: string) {
  return emailAdmins(subject, html);
}
