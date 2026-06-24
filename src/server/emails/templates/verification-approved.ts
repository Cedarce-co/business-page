import { SERVICES } from "@/lib/constants";
import { getAppUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";
import {
  emailAvailabilityNote,
  emailButton,
  emailList,
  emailParagraph,
  renderEmailLayout,
} from "@/server/emails/layout";
import { EMAIL_TEMPLATE_KEYS, type EmailContent } from "@/server/emails/types";

export function verificationApprovedEmail(): EmailContent {
  const requestUrl = `${getAppUrl()}/dashboard/request-service?fresh=1`;
  const serviceNames = SERVICES.slice(0, 5).map((s) => escapeHtml(s.name));

  const bodyHtml = [
    emailParagraph("Great news - your business verification has been approved."),
    emailParagraph(
      "Your Cedarce account is fully active. You can now request the services your business needs, and our team is ready to work alongside you.",
    ),
    emailButton(requestUrl, "Request a service"),
    emailParagraph("<strong style=\"color:#0f172a;\">Services we deliver for businesses like yours</strong>"),
    emailList(serviceNames),
    emailParagraph(
      "Not sure where to start? Tell us what you are trying to achieve — we will point you in the right direction.",
    ),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.VERIFICATION_APPROVED,
    subject: "You're verified - let's move your business forward",
    html: renderEmailLayout({
      title: "Your account is verified",
      preheader: "Verification approved. Request services and work with our team.",
      bodyHtml,
    }),
    variables: {
      REQUEST_URL: requestUrl,
      SERVICES_LIST: SERVICES.slice(0, 5).map((s) => s.name).join(", "),
    },
  };
}
