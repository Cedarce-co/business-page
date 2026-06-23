import "server-only";

import { Resend } from "resend";
import { getAdminRecipients, getResendApiKey, getResendFromAddress, getResendTemplateId } from "@/server/emails/config";
import type { EmailContent } from "@/server/emails/types";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  templateKey?: EmailContent["templateKey"];
  variables?: Record<string, string>;
};

export type SendEmailResult =
  | { ok: true; id?: string; usedTemplate: boolean }
  | { ok: false; error: string };

export { getAppUrl, getAdminRecipients } from "@/server/emails/config";

export async function sendEmail({
  to,
  subject,
  html,
  templateKey,
  variables,
}: SendEmailInput): Promise<SendEmailResult> {
  const resendKey = getResendApiKey();
  const from = getResendFromAddress();
  const templateId = templateKey ? getResendTemplateId(templateKey) : null;

  if (!resendKey || resendKey.startsWith("re_1234567890")) {
    console.warn(
      `[email] RESEND_API_KEY is missing or still a placeholder. Skipped: subject="${subject}" to=${Array.isArray(to) ? to.join(",") : to}`,
    );
    return { ok: false, error: "missing_or_placeholder_api_key" };
  }

  const recipients = Array.isArray(to) ? to : [to];

  try {
    const resend = new Resend(resendKey);

    if (templateId && variables) {
      const { data, error } = await resend.emails.send({
        from,
        to: recipients,
        subject,
        template: {
          id: templateId,
          variables,
        },
      });

      if (error) {
        console.error("[email] Resend template error:", error);
        return { ok: false, error: error.message ?? "resend_template_error" };
      }

      return { ok: true, id: data?.id, usedTemplate: true };
    }

    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      subject,
      html,
    });

    if (error) {
      console.error("[email] Resend API error:", error);
      return { ok: false, error: error.message ?? "resend_error" };
    }

    return { ok: true, id: data?.id, usedTemplate: false };
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

export async function sendEmailContent(to: string | string[], content: EmailContent) {
  return sendEmail({
    to,
    subject: content.subject,
    html: content.html,
    templateKey: content.templateKey,
    variables: content.variables,
  });
}

export async function sendEmailContentSafe(to: string | string[], content: EmailContent) {
  return sendEmailContent(to, content);
}

export async function emailAdmins(subject: string, html: string, content?: EmailContent) {
  if (content) {
    return sendEmailContent(getAdminRecipients(), content);
  }
  return sendEmail({ to: getAdminRecipients(), subject, html });
}

export async function emailAdminsSafe(subject: string, html: string, content?: EmailContent) {
  return emailAdmins(subject, html, content);
}

export async function emailAdminsContent(content: EmailContent) {
  return sendEmailContent(getAdminRecipients(), content);
}

export async function emailAdminsContentSafe(content: EmailContent) {
  return emailAdminsContent(content);
}
