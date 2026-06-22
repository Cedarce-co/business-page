import { getAppUrl } from "@/server/emails/sender";

export function adminInviteEmail(input: { name: string; joinToken: string }) {
  const joinUrl = `${getAppUrl()}/admin/join?token=${encodeURIComponent(input.joinToken)}`;
  return {
    subject: "You're invited to the Cedarce admin dashboard",
    html: `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 10px;color:#0f172a">Join the Cedarce admin team</h2>
        <p style="margin:0 0 14px;color:#334155">
          Hi ${escapeHtml(input.name)}, you have been invited to help manage the Cedarce client portal.
        </p>
        <p style="margin:0 0 14px;color:#334155">
          Create your password, set up Google Authenticator (required for every sign-in), then access users, verifications, and service requests.
        </p>
        <p style="margin:0 0 18px">
          <a href="${joinUrl}" style="display:inline-block;padding:12px 16px;border-radius:12px;background:#0f172a;color:#fff;text-decoration:none;font-weight:600">
            Join now
          </a>
        </p>
        <p style="margin:0;color:#64748b;font-size:13px">
          This link expires in 7 days. If you did not expect this invite, you can ignore this email.
        </p>
      </div>
    `,
  };
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}
