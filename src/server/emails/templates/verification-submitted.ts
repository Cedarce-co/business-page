import { getAppUrl } from "@/server/emails/sender";
import { SUPPORT_EMAIL } from "@/lib/contact";

export function verificationSubmittedUserEmail() {
  return {
    subject: "Verification submitted - under review",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">Verification received</h2>
        <p style="margin:0 0 14px;color:#334155">
          Thanks - your verification is being reviewed. We will email you as soon as it is approved.
        </p>
        <p style="margin:0;color:#64748b;font-size:13px">
          You can track everything in your dashboard:
          <a href="${getAppUrl()}/dashboard" style="color:#0f172a;font-weight:600;text-decoration:underline">Open dashboard</a>.
          Need help? Email
          <a href="mailto:${SUPPORT_EMAIL}" style="color:#0f172a;font-weight:600;text-decoration:underline">${SUPPORT_EMAIL}</a>.
        </p>
      </div>
    `,
  };
}

export function verificationSubmittedAdminEmail(input: {
  name: string;
  email: string;
  nationality?: string | null;
  address?: string | null;
  govIdType?: string | null;
  govIdUrl?: string | null;
}) {
  const adminUrl = `${getAppUrl()}/admin`;
  return {
    subject: `New verification submitted: ${input.name}`,
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">New verification submission</h2>
        <p style="margin:0 0 10px;color:#334155"><b>${escapeHtml(input.name)}</b> (${escapeHtml(input.email)}) submitted verification.</p>
        <ul style="margin:0 0 16px;padding-left:18px;color:#334155">
          <li>Nationality: ${escapeHtml(input.nationality ?? "N/A")}</li>
          <li>Address: ${escapeHtml(input.address ?? "N/A")}</li>
          <li>ID type: ${escapeHtml(input.govIdType ?? "N/A")}</li>
          <li>ID file: ${input.govIdUrl ? `<a href="${input.govIdUrl}">Open</a>` : "N/A"}</li>
        </ul>
        <p style="margin:0 0 18px">
          <a href="${adminUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Review in admin
          </a>
        </p>
      </div>
    `,
  };
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

