import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import {
  emailAvailabilityNote,
  emailButton,
  emailParagraph,
  renderEmailLayout,
} from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function mfaEnabledEmail(input: { name: string; portal: "user" | "admin" }): EmailContent {
  const securityUrl =
    input.portal === "admin" ? `${getAppUrl()}/admin/security` : `${getAppUrl()}/dashboard/security`;
  const portalLabel = input.portal === "admin" ? "admin portal" : "client dashboard";
  const name = escapeHtml(input.name);

  const bodyHtml = [
    emailParagraph(`Hi ${name},`),
    emailParagraph(
      `Two-factor authentication is now active on your Cedarce ${portalLabel}. This extra step helps protect your business and account.`,
    ),
    emailParagraph(
      "When you sign in, you will enter a code from your authenticator app or use a recovery code. Please store your recovery codes somewhere safe.",
    ),
    emailButton(securityUrl, "Review security settings"),
    emailParagraph(
      "If you did not enable this yourself, contact us immediately so we can help secure your account.",
    ),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.MFA_ENABLED,
    subject: "Your Cedarce account security has been updated",
    html: renderEmailLayout({
      title: "Two-factor authentication enabled",
      preheader: "An extra layer of protection is now on your account.",
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      PORTAL_LABEL: portalLabel,
      SECURITY_URL: securityUrl,
    },
  };
}
