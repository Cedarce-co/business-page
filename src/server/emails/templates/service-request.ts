import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailKeyValue, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function serviceRequestSubmittedUserEmail(input: { serviceType: string }): EmailContent {
  const trackUrl = `${getAppUrl()}/dashboard/service-requests`;
  const serviceType = escapeHtml(input.serviceType);

  const bodyHtml = [
    emailParagraph(`Thanks. We received your <strong>${serviceType}</strong> service request.`),
    emailParagraph("Our team will review it and update you by email."),
    emailButton(trackUrl, "Track request"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_SUBMITTED_USER,
    subject: "Service request received",
    html: renderEmailLayout({
      title: "Request received",
      preheader: `Your ${input.serviceType} request is in our queue.`,
      bodyHtml,
    }),
    variables: {
      SERVICE_TYPE: input.serviceType,
      TRACK_URL: trackUrl,
    },
  };
}

export function serviceRequestSubmittedAdminEmail(input: {
  name: string;
  email: string;
  serviceType: string;
  summary: string;
  requestId: string;
}): EmailContent {
  const reviewUrl = `${getAppUrl()}/admin/requests/${input.requestId}`;

  const bodyHtml = [
    emailParagraph("A client submitted a new service request."),
    emailKeyValue([
      { label: "Client", value: escapeHtml(input.name) },
      { label: "Email", value: escapeHtml(input.email) },
      { label: "Service", value: escapeHtml(input.serviceType) },
      { label: "Summary", value: escapeHtml(input.summary) },
    ]),
    emailButton(reviewUrl, "Review request"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_SUBMITTED_ADMIN,
    subject: `New service request: ${input.name}`,
    html: renderEmailLayout({
      title: "New service request",
      preheader: `${input.name} submitted a ${input.serviceType} request.`,
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      EMAIL: input.email,
      SERVICE_TYPE: input.serviceType,
      SUMMARY: input.summary,
      REVIEW_URL: reviewUrl,
    },
  };
}

export function serviceRequestUpdatedUserEmail(input: {
  serviceType: string;
  statusLabel: string;
  note?: string | null;
}): EmailContent {
  const trackUrl = `${getAppUrl()}/dashboard/service-requests`;
  const serviceType = escapeHtml(input.serviceType);
  const statusLabel = escapeHtml(input.statusLabel);
  const noteBlock = input.note?.trim()
    ? emailParagraph(`<strong>Note from our team:</strong><br />${escapeHtml(input.note.trim())}`)
    : "";

  const bodyHtml = [
    emailParagraph(`Your <strong>${serviceType}</strong> request was updated.`),
    emailParagraph(`Current status: <strong>${statusLabel}</strong>`),
    noteBlock,
    emailButton(trackUrl, "View details"),
  ]
    .filter(Boolean)
    .join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_UPDATED_USER,
    subject: `Service request update: ${input.statusLabel}`,
    html: renderEmailLayout({
      title: "Request updated",
      preheader: `${input.serviceType} is now ${input.statusLabel}.`,
      bodyHtml,
    }),
    variables: {
      SERVICE_TYPE: input.serviceType,
      STATUS_LABEL: input.statusLabel,
      NOTE: input.note?.trim() || "",
      TRACK_URL: trackUrl,
    },
  };
}

export function serviceRequestUpdatedAdminEmail(input: { name: string; requestId: string }): EmailContent {
  const reviewUrl = `${getAppUrl()}/admin/requests/${input.requestId}`;
  const name = escapeHtml(input.name);

  const bodyHtml = [
    emailParagraph(`<strong>${name}</strong> updated their service request after your review note.`),
    emailParagraph("New information is ready for review."),
    emailButton(reviewUrl, "Review request"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_UPDATED_ADMIN,
    subject: `Request updated: ${input.name}`,
    html: renderEmailLayout({
      title: "Client updated a request",
      preheader: `${input.name} submitted additional information.`,
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      REVIEW_URL: reviewUrl,
    },
  };
}
