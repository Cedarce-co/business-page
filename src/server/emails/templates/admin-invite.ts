import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import { emailButton, emailParagraph, renderEmailLayout } from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function adminInviteEmail(input: { name: string; joinToken: string }): EmailContent {
  const joinUrl = `${getAppUrl()}/admin/join?token=${encodeURIComponent(input.joinToken)}`;
  const name = escapeHtml(input.name);

  const bodyHtml = [
    emailParagraph(`Hi ${name}, you have been invited to the Cedarce admin team.`),
    emailParagraph(
      "Create your password, then set up Google Authenticator. Admin sign-in requires an authenticator code every time.",
    ),
    emailButton(joinUrl, "Accept invite"),
    emailParagraph("This link expires in <strong>7 days</strong>. If you did not expect this invite, you can ignore this email."),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.ADMIN_INVITE,
    subject: "You're invited to Cedarce admin",
    html: renderEmailLayout({
      title: "Join the admin team",
      preheader: "Set up your admin account and authenticator.",
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      JOIN_URL: joinUrl,
    },
  };
}
