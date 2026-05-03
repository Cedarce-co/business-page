import { getAppUrl } from "@/server/emails/sender";
import { SERVICES } from "@/lib/constants";
import { SUPPORT_EMAIL } from "@/lib/contact";

export function verificationApprovedEmail() {
  const requestUrl = `${getAppUrl()}/dashboard/request-service?fresh=1`;
  const top = SERVICES.slice(0, 5).map((s) => s.name);
  return {
    subject: "Verification approved - you can now request services",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">You are verified</h2>
        <p style="margin:0 0 14px;color:#334155">
          Great news - your account verification is approved. You can now submit service requests from your dashboard.
        </p>
        <p style="margin:0 0 18px">
          <a href="${requestUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Request a service
          </a>
        </p>
        <p style="margin:0 0 10px;color:#334155;font-weight:600">What we can help with</p>
        <ul style="margin:0 0 18px;padding-left:18px;color:#334155">
          ${top.map((n) => `<li style="margin:4px 0">${escapeHtml(n)}</li>`).join("")}
        </ul>
        <p style="margin:0;color:#64748b;font-size:13px">
          Need help choosing the best service? Email
          <a href="mailto:${SUPPORT_EMAIL}" style="color:#0f172a;font-weight:600;text-decoration:underline">${SUPPORT_EMAIL}</a>.
        </p>
      </div>
    `,
  };
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

