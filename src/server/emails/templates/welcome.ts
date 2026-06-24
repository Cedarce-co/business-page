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

export function welcomeEmail(input: { name: string }): EmailContent {
  const verifyUrl = `${getAppUrl()}/dashboard/kyc`;
  const serviceNames = SERVICES.slice(0, 6).map((s) => escapeHtml(s.name));
  const name = escapeHtml(input.name);

  const bodyHtml = [
    emailParagraph(`Hi ${name},`),
    emailParagraph(
      "Thank you for choosing Cedarce. We are glad to have you with us and look forward to supporting your business goals.",
    ),
    emailParagraph(
      "Your account is ready. The next step is a short business verification so we can tailor our services to you and keep your account secure.",
    ),
    emailButton(verifyUrl, "Complete verification"),
    emailParagraph("<strong style=\"color:#0f172a;\">How we can help your business</strong>"),
    emailList(serviceNames),
    emailAvailabilityNote(),
  ].join("");

  return {
    templateKey: EMAIL_TEMPLATE_KEYS.WELCOME,
    subject: "Welcome to Cedarce - let's get your business set up",
    html: renderEmailLayout({
      title: "Welcome to Cedarce",
      preheader: "Your account is ready. Complete verification to unlock our services.",
      bodyHtml,
    }),
    variables: {
      NAME: input.name,
      VERIFY_URL: verifyUrl,
      SERVICES_LIST: SERVICES.slice(0, 6).map((s) => s.name).join(", "),
    },
  };
}
