import { getAppUrl } from "@/server/emails/sender";
import { escapeHtml } from "@/server/emails/helpers";

export function serviceRequestSubmittedUserEmail(input: { serviceType: string }) {
  const url = `${getAppUrl()}/dashboard/service-requests`;
  return {
    subject: "We received your service request",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">Request received</h2>
        <p style="margin:0 0 14px;color:#334155">
          Thanks. Your <b>${escapeHtml(input.serviceType)}</b> request is in our queue. We will review it and update you by email.
        </p>
        <p style="margin:0">
          <a href="${url}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Track request
          </a>
        </p>
      </div>
    `,
  };
}

export function serviceRequestSubmittedAdminEmail(input: {
  name: string;
  email: string;
  serviceType: string;
  summary: string;
  requestId: string;
}) {
  const url = `${getAppUrl()}/admin/requests/${input.requestId}`;
  return {
    subject: `New service request: ${input.name}`,
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">New service request</h2>
        <p style="margin:0 0 10px;color:#334155"><b>${escapeHtml(input.name)}</b> (${escapeHtml(input.email)}) submitted a request.</p>
        <ul style="margin:0 0 16px;padding-left:18px;color:#334155">
          <li>Type: ${escapeHtml(input.serviceType)}</li>
          <li>Summary: ${escapeHtml(input.summary)}</li>
        </ul>
        <p style="margin:0">
          <a href="${url}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Review request
          </a>
        </p>
      </div>
    `,
  };
}

export function serviceRequestUpdatedUserEmail(input: { serviceType: string; statusLabel: string; note?: string | null }) {
  const url = `${getAppUrl()}/dashboard/service-requests`;
  return {
    subject: `Service request update: ${input.statusLabel}`,
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">Your request was updated</h2>
        <p style="margin:0 0 14px;color:#334155">
          <b>${escapeHtml(input.serviceType)}</b> is now: <b>${escapeHtml(input.statusLabel)}</b>.
          ${input.note?.trim() ? `<br /><br />${escapeHtml(input.note.trim())}` : ""}
        </p>
        <p style="margin:0">
          <a href="${url}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            View details
          </a>
        </p>
      </div>
    `,
  };
}
