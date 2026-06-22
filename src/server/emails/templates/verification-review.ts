import { getAppUrl } from "@/server/emails/sender";
import { escapeHtml } from "@/server/emails/helpers";

export function verificationRejectedEmail(note?: string | null) {
  const kycUrl = `${getAppUrl()}/dashboard/kyc`;
  return {
    subject: "Verification update needed",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">We could not approve your verification</h2>
        <p style="margin:0 0 14px;color:#334155">
          ${note?.trim() ? escapeHtml(note.trim()) : "Please review your details and documents, then resubmit when ready."}
        </p>
        <p style="margin:0">
          <a href="${kycUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Update verification
          </a>
        </p>
      </div>
    `,
  };
}

export function verificationInvalidInfoEmail(note?: string | null) {
  const kycUrl = `${getAppUrl()}/dashboard/kyc`;
  return {
    subject: "Verification: information needs correction",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">Some details need correction</h2>
        <p style="margin:0 0 14px;color:#334155">
          ${note?.trim() ? escapeHtml(note.trim()) : "An admin left notes on your submission. Update the flagged items and resubmit."}
        </p>
        <p style="margin:0">
          <a href="${kycUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Fix and resubmit
          </a>
        </p>
      </div>
    `,
  };
}
