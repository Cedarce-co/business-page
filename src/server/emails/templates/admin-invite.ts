import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import {
  emailAvailabilityNote,
  emailButton,
  emailParagraph,
  renderEmailLayout,
} from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function adminInviteEmail(input: { name: string; joinToken: string }): EmailContent {
  const joinUrl = `${getAppUrl()}/admin/join?token=${encodeURIComponent(input.joinToken)}`;
  const name = escapeHtml(input.name);

  const bodyHtml = [
    emailParagraph(`Hi ${name},`),
    emailParagraph(
      "You have been invited to join the Cedarce admin team. You will help us deliver reliable service and support to the businesses that trust us.",
    ),
    emailParagraph(
      "Accept the invite below to create your password and set up your authenticator app. For security, admin sign-in requires a verification code each time.",
    ),
    emailButton(joinUrl, "Accept invitation"),
    emailParagraph(
      "This link expires in <strong>7 days</strong>. If you were not expecting this invitation, you can ignore this email.",
    ),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.ADMIN_INVITE,
    subject: "You're invited to the Cedarce admin team",
    html: renderEmailLayout({
      title: "Join the Cedarce team",
      preheader: "Set up your admin access and help serve our clients.",
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      JOIN_URL: joinUrl,
    },
  };
}
