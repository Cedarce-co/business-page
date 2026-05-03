import { SERVICES } from "@/lib/constants";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { getAppUrl } from "@/server/emails/sender";

export function welcomeEmail(input: { name: string }) {
  const serviceNames = SERVICES.slice(0, 6).map((s) => s.name);
  const verifyUrl = `${getAppUrl()}/dashboard/kyc`;

  return {
    subject: "Welcome aboard",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">Welcome, ${escapeHtml(input.name)}.</h2>
        <p style="margin:0 0 14px;color:#334155">
          You are in. Once you complete account verification, you can request our services immediately.
        </p>
        <p style="margin:0 0 18px">
          <a href="${verifyUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Verify your account
          </a>
        </p>
        <p style="margin:0 0 10px;color:#334155;font-weight:600">Popular services we offer</p>
        <ul style="margin:0 0 18px;padding-left:18px;color:#334155">
          ${serviceNames.map((n) => `<li style="margin:4px 0">${escapeHtml(n)}</li>`).join("")}
        </ul>
        <p style="margin:0;color:#64748b;font-size:13px">
          Questions? Email us at <a href="mailto:${SUPPORT_EMAIL}" style="color:#0f172a;font-weight:600;text-decoration:underline">${SUPPORT_EMAIL}</a>.
        </p>
      </div>
    `,
  };
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

