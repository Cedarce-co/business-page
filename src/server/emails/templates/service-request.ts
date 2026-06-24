import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import {
  emailAvailabilityNote,
  emailButton,
  emailKeyValue,
  emailParagraph,
  renderEmailLayout,
} from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function serviceRequestSubmittedUserEmail(input: { serviceType: string }): EmailContent {
  const trackUrl = `${getAppUrl()}/dashboard/service-requests`;
  const serviceType = escapeHtml(input.serviceType);

  const bodyHtml = [
    emailParagraph(`Thank you for trusting Cedarce with your <strong>${serviceType}</strong> request.`),
    emailParagraph(
      "We have received it and assigned it to our team. We take every request seriously and will keep you informed at each step.",
    ),
    emailParagraph("You will receive updates from us as your request progresses."),
    emailButton(trackUrl, "Track your request"),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_SUBMITTED_USER,
    subject: `We received your ${input.serviceType} request`,
    html: renderEmailLayout({
      title: "Your request is in good hands",
      preheader: `Your ${input.serviceType} request has been received by our team.`,
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
    emailParagraph("A client has submitted a new service request and is counting on a timely response."),
    emailKeyValue([
      { label: "Client", value: escapeHtml(input.name) },
      { label: "Email", value: escapeHtml(input.email) },
      { label: "Service", value: escapeHtml(input.serviceType) },
      { label: "Summary", value: escapeHtml(input.summary) },
    ]),
    emailParagraph("Please review and respond when you can — prompt follow-up builds client trust."),
    emailButton(reviewUrl, "Review request"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_SUBMITTED_ADMIN,
    subject: `New service request from ${input.name}`,
    html: renderEmailLayout({
      title: "New client service request",
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
    ? emailParagraph(`<strong>A note from our team:</strong><br />${escapeHtml(input.note.trim())}`)
    : "";

  const bodyHtml = [
    emailParagraph(`We have an update on your <strong>${serviceType}</strong> request.`),
    emailParagraph(`Current status: <strong>${statusLabel}</strong>`),
    noteBlock,
    emailParagraph("We are committed to keeping you informed and moving your project forward."),
    emailButton(trackUrl, "View full details"),
    emailAvailabilityNote(),
  ]
    .filter(Boolean)
    .join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_UPDATED_USER,
    subject: `Update on your ${input.serviceType} request`,
    html: renderEmailLayout({
      title: "Your request has been updated",
      preheader: `${input.serviceType} — status: ${input.statusLabel}.`,
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
    emailParagraph(`<strong>${name}</strong> has updated their service request with the information you requested.`),
    emailParagraph("The new details are ready for your review in the admin portal."),
    emailButton(reviewUrl, "Review updated request"),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.SERVICE_REQUEST_UPDATED_ADMIN,
    subject: `${input.name} updated their service request`,
    html: renderEmailLayout({
      title: "Client submitted an update",
      preheader: `${input.name} provided additional information for review.`,
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      REVIEW_URL: reviewUrl,
    },
  };
}
