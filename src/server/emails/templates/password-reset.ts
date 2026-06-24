import { getAppUrl } from "@/server/emails/config";
import {
  emailAvailabilityNote,
  emailButton,
  emailParagraph,
  renderEmailLayout,
} from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function passwordResetEmail(input: { resetToken: string }): EmailContent {
  const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(input.resetToken)}`;

  const bodyHtml = [
    emailParagraph("We received a request to reset the password for your Cedarce account."),
    emailParagraph(
      "Use the button below to choose a new password. This link expires in <strong>45 minutes</strong> for your security.",
    ),
    emailButton(resetUrl, "Reset my password"),
    emailParagraph(
      "If you did not request this change, you can safely ignore this email - your password will stay the same. If you are concerned about your account, please contact us right away.",
    ),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.PASSWORD_RESET,
    subject: "Reset your Cedarce password",
    html: renderEmailLayout({
      title: "Reset your password",
      preheader: "A secure link to update your Cedarce account password.",
      bodyHtml,
    }),
    variables: {
      RESET_URL: resetUrl,
    },
  };
}
