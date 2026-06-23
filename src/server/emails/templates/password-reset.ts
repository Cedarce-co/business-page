import { getAppUrl } from "@/server/emails/config";
import { emailButton, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function passwordResetEmail(input: { resetToken: string }): EmailContent {
  const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(input.resetToken)}`;

  const bodyHtml = [
    emailParagraph("We received a request to reset your Cedarce account password."),
    emailParagraph("This link expires in <strong>45 minutes</strong>. If you did not request a reset, you can ignore this email."),
    emailButton(resetUrl, "Reset password"),
    emailParagraph("For your security, never share this link with anyone."),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.PASSWORD_RESET,
    subject: "Reset your Cedarce password",
    html: renderEmailLayout({
      title: "Reset your password",
      preheader: "Use this link to choose a new password. Expires in 45 minutes.",
      bodyHtml,
    }),
    variables: {
      RESET_URL: resetUrl,
    },
  };
}
