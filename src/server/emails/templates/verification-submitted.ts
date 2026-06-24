import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import {
  emailAvailabilityNote,
  emailButton,
  emailKeyValue,
  emailLink,
  emailParagraph,
  renderEmailLayout,
} from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function verificationSubmittedUserEmail(): EmailContent {
  const dashboardUrl = `${getAppUrl()}/dashboard`;

  const bodyHtml = [
    emailParagraph("Thank you for submitting your business verification."),
    emailParagraph(
      "We have received your documents and our team is reviewing them carefully. We treat every application with the same care we would give our own business.",
    ),
    emailParagraph(
      "You will hear from us by email as soon as there is an update. You can also keep track of your verification status and service request updates anytime in your dashboard.",
    ),
    emailButton(dashboardUrl, "Open your dashboard"),
    emailParagraph(`You can check your account anytime in your ${emailLink(dashboardUrl, "client dashboard")}.`),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_SUBMITTED_USER,
    subject: "We received your business verification",
    html: renderEmailLayout({
      title: "Verification received",
      preheader: "Our team is reviewing your submission and will be in touch soon.",
      bodyHtml,
    }),
    variables: {
      DASHBOARD_URL: dashboardUrl,
    },
  };
}

export function verificationSubmittedAdminEmail(input: {
  name: string;
  email: string;
  businessName?: string | null;
  nationality?: string | null;
  address?: string | null;
  govIdType?: string | null;
  userId?: string;
}): EmailContent {
  const reviewUrl = input.userId
    ? `${getAppUrl()}/admin/users/${input.userId}/verification`
    : `${getAppUrl()}/admin/verifications`;

  const bodyHtml = [
    emailParagraph("A client has submitted business verification and is waiting for your review."),
    emailKeyValue([
      { label: "Name", value: escapeHtml(input.name) },
      { label: "Email", value: escapeHtml(input.email) },
      { label: "Business", value: escapeHtml(input.businessName?.trim() || "N/A") },
      { label: "Country", value: escapeHtml(input.nationality ?? "N/A") },
      { label: "Address", value: escapeHtml(input.address ?? "N/A") },
      { label: "ID type", value: escapeHtml(input.govIdType ?? "N/A") },
    ]),
    emailParagraph("Documents are available securely in the admin portal. Timely review helps clients move forward with confidence."),
    emailButton(reviewUrl, "Review verification"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_SUBMITTED_ADMIN,
    subject: `Verification ready for review: ${input.name}`,
    html: renderEmailLayout({
      title: "Verification awaiting review",
      preheader: `${input.name} submitted business verification.`,
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      EMAIL: input.email,
      BUSINESS_NAME: input.businessName?.trim() || "N/A",
      COUNTRY: input.nationality ?? "N/A",
      ADDRESS: input.address ?? "N/A",
      ID_TYPE: input.govIdType ?? "N/A",
      REVIEW_URL: reviewUrl,
    },
  };
}
