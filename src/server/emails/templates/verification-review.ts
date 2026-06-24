import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import {
  emailAvailabilityNote,
  emailButton,
  emailParagraph,
  renderEmailLayout,
} from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function verificationRejectedEmail(note?: string | null): EmailContent {
  const kycUrl = `${getAppUrl()}/dashboard/kyc`;
  const message = note?.trim()
    ? escapeHtml(note.trim())
    : "Please review your details and documents, then resubmit when you are ready. We are happy to guide you through anything that is unclear.";

  const bodyHtml = [
    emailParagraph("Thank you for taking the time to complete your business verification."),
    emailParagraph(
      "After careful review, we were not able to approve your submission on this attempt. This is not uncommon, and we want to help you get it right.",
    ),
    emailParagraph(message),
    emailButton(kycUrl, "Update and resubmit"),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_REJECTED,
    subject: "Your verification needs another look",
    html: renderEmailLayout({
      title: "Verification update",
      preheader: "We could not approve your submission yet — we are here to help.",
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
    : "Our team has left notes on your submission. Please update the items mentioned and resubmit — we are here if you need clarification.";

  const bodyHtml = [
    emailParagraph("Thank you for submitting your business verification."),
    emailParagraph(
      "We reviewed your details and need a few corrections before we can approve your account. This is a normal part of the process and helps us serve you better.",
    ),
    emailParagraph(message),
    emailButton(kycUrl, "Update and resubmit"),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_INVALID_INFO,
    subject: "A few details need updating on your verification",
    html: renderEmailLayout({
      title: "Please update your verification",
      preheader: "Small corrections needed — we will guide you through it.",
      bodyHtml,
    }),
    variables: {
      NOTE: note?.trim() || "Please update flagged items and resubmit.",
      KYC_URL: kycUrl,
    },
  };
}
