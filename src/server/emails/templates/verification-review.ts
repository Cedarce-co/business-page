import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function verificationRejectedEmail(note?: string | null): EmailContent {
  const kycUrl = `${getAppUrl()}/dashboard/kyc`;
  const message = note?.trim()
    ? escapeHtml(note.trim())
    : "Please review your details and documents, then resubmit when ready.";

  const bodyHtml = [
    emailParagraph("We could not approve your verification at this time."),
    emailParagraph(message),
    emailButton(kycUrl, "Update verification"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_REJECTED,
    subject: "Verification update needed",
    html: renderEmailLayout({
      title: "Verification not approved",
      preheader: "Review your submission and try again.",
      bodyHtml,
    }),
    variables: {
      NOTE: note?.trim() || "Please review your details and resubmit.",
      KYC_URL: kycUrl,
    },
  };
}

export function verificationInvalidInfoEmail(note?: string | null): EmailContent {
  const kycUrl = `${getAppUrl()}/dashboard/kyc`;
  const message = note?.trim()
    ? escapeHtml(note.trim())
    : "An admin left notes on your submission. Update the flagged items and resubmit.";

  const bodyHtml = [
    emailParagraph("Some business details need correction before we can approve your account."),
    emailParagraph(message),
    emailButton(kycUrl, "Fix and resubmit"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_INVALID_INFO,
    subject: "Verification: information needs correction",
    html: renderEmailLayout({
      title: "Details need correction",
      preheader: "Update your verification and resubmit.",
      bodyHtml,
    }),
    variables: {
      NOTE: note?.trim() || "Please update flagged items and resubmit.",
      KYC_URL: kycUrl,
    },
  };
}
