export const EMAIL_TEMPLATE_KEYS = {
  WELCOME: "welcome",
  PASSWORD_RESET: "password-reset",
  MFA_ENABLED: "mfa-enabled",
  SIGNUP_ADMIN: "signup-admin",
  ADMIN_INVITE: "admin-invite",
  VERIFICATION_SUBMITTED_USER: "verification-submitted-user",
  VERIFICATION_SUBMITTED_ADMIN: "verification-submitted-admin",
  VERIFICATION_APPROVED: "verification-approved",
  VERIFICATION_REJECTED: "verification-rejected",
  VERIFICATION_INVALID_INFO: "verification-invalid-info",
  SERVICE_REQUEST_SUBMITTED_USER: "service-request-submitted-user",
  SERVICE_REQUEST_SUBMITTED_ADMIN: "service-request-submitted-admin",
  SERVICE_REQUEST_UPDATED_USER: "service-request-updated-user",
  SERVICE_REQUEST_UPDATED_ADMIN: "service-request-updated-admin",
} as const;

export type EmailTemplateKey = (typeof EMAIL_TEMPLATE_KEYS)[keyof typeof EMAIL_TEMPLATE_KEYS];

export type EmailContent = {
  subject: string;
  html: string;
  templateKey: EmailTemplateKey;
  /** Variables for Resend hosted templates (when RESEND_TEMPLATE_* env is set). */
  variables?: Record<string, string>;
};
