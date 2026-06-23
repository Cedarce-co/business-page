import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailKeyValue, emailLink, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function verificationSubmittedUserEmail(): EmailContent {
  const dashboardUrl = `${getAppUrl()}/dashboard`;

  const bodyHtml = [
    emailParagraph("Thanks. We received your business verification documents."),
    emailParagraph("Our team is reviewing your submission. We will email you as soon as there is an update."),
    emailButton(dashboardUrl, "Open dashboard"),
    emailParagraph(`Track progress anytime in your ${emailLink(dashboardUrl, "client dashboard")}.`),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_SUBMITTED_USER,
    subject: "Verification submitted",
    html: renderEmailLayout({
      title: "Verification received",
      preheader: "Your documents are under review.",
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
    emailParagraph("<strong style=\"color:#0f172a;\">A client submitted business verification.</strong>"),
    emailKeyValue([
      { label: "Name", value: escapeHtml(input.name) },
      { label: "Email", value: escapeHtml(input.email) },
      { label: "Business", value: escapeHtml(input.businessName?.trim() || "N/A") },
      { label: "Country", value: escapeHtml(input.nationality ?? "N/A") },
      { label: "Address", value: escapeHtml(input.address ?? "N/A") },
      { label: "ID type", value: escapeHtml(input.govIdType ?? "N/A") },
    ]),
    emailParagraph("Documents are available securely in the admin portal after sign-in."),
    emailButton(reviewUrl, "Review verification"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_SUBMITTED_ADMIN,
    subject: `Verification submitted: ${input.name}`,
    html: renderEmailLayout({
      title: "New verification submission",
      preheader: `${input.name} submitted verification for review.`,
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
