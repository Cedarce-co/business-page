import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function mfaEnabledEmail(input: { name: string; portal: "user" | "admin" }): EmailContent {
  const securityUrl =
    input.portal === "admin" ? `${getAppUrl()}/admin/security` : `${getAppUrl()}/dashboard/security`;
  const portalLabel = input.portal === "admin" ? "Admin portal" : "Client dashboard";
  const name = escapeHtml(input.name);

  const bodyHtml = [
    emailParagraph(`Hi ${name}, two-factor authentication is now enabled on your Cedarce ${portalLabel.toLowerCase()} account.`),
    emailParagraph(
      "You will need your authenticator app (or a recovery code) when signing in. Keep your recovery codes somewhere safe.",
    ),
    emailButton(securityUrl, "Review security settings"),
    emailParagraph("If you did not enable this, contact us immediately."),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.MFA_ENABLED,
    subject: "Two-factor authentication enabled",
    html: renderEmailLayout({
      title: "Security update",
      preheader: "Two-factor authentication was enabled on your account.",
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      PORTAL_LABEL: portalLabel,
      SECURITY_URL: securityUrl,
    },
  };
}
