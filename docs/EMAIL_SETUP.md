# Cedarce transactional email setup (Resend)

All outbound mail goes through [Resend](https://resend.com). Templates live in `src/server/emails/` with a shared header (logo), body, and footer layout.

## Required environment variables

Add these to `.env` locally and to your hosting provider (Render, Vercel, etc.):

```bash
# Required — get from Resend → API Keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Required — must use a domain verified in Resend (not @gmail.com)
RESEND_FROM=Cedarce <notifications@cedarce.com>

# Required in production so links and logo load correctly
APP_URL=https://www.cedarce.com

# Optional — comma-separated admin alert recipients (defaults to support@cedarce.com)
ADMIN_EMAILS=support@cedarce.com

# Optional — override logo URL if CDN/app URL differs (must be absolute https URL)
RESEND_EMAIL_LOGO_URL=https://www.cedarce.com/assets/logo/logoblacktext-transparent.png
```

### Minimum to go live

1. Verify `cedarce.com` (or your sending domain) in Resend.
2. Set `RESEND_API_KEY` and `RESEND_FROM` (e.g. `Cedarce <notifications@cedarce.com>`).
3. Set `APP_URL` to your public site URL.
4. Redeploy.

Until `RESEND_API_KEY` is set, emails are **skipped** (logged to server console) so signups and other flows still work.

## Optional: Resend hosted templates

The app sends **inline HTML** by default. When you create matching templates in the Resend dashboard, set the template ID env vars below. If set, Resend uses the hosted template and passes variables; if unset, inline HTML is used.

| Env variable | When it sends | Audience |
|---|---|---|
| `RESEND_TEMPLATE_WELCOME` | User signs up | User |
| `RESEND_TEMPLATE_PASSWORD_RESET` | Forgot password | User |
| `RESEND_TEMPLATE_MFA_ENABLED` | MFA turned on | User / Admin |
| `RESEND_TEMPLATE_SIGNUP_ADMIN` | New signup | Admin |
| `RESEND_TEMPLATE_ADMIN_INVITE` | Admin invite | Admin |
| `RESEND_TEMPLATE_VERIFICATION_SUBMITTED_USER` | KYC submitted | User |
| `RESEND_TEMPLATE_VERIFICATION_SUBMITTED_ADMIN` | KYC submitted | Admin |
| `RESEND_TEMPLATE_VERIFICATION_APPROVED` | KYC approved | User |
| `RESEND_TEMPLATE_VERIFICATION_REJECTED` | KYC rejected | User |
| `RESEND_TEMPLATE_VERIFICATION_INVALID_INFO` | KYC needs fixes | User |
| `RESEND_TEMPLATE_SERVICE_REQUEST_SUBMITTED_USER` | Request created | User |
| `RESEND_TEMPLATE_SERVICE_REQUEST_SUBMITTED_ADMIN` | Request created | Admin |
| `RESEND_TEMPLATE_SERVICE_REQUEST_UPDATED_USER` | Request status change | User |
| `RESEND_TEMPLATE_SERVICE_REQUEST_UPDATED_ADMIN` | Client resubmits info | Admin |

Variable names for each template are listed in `src/server/emails/templates/registry.ts` (`EMAIL_CATALOG`).

### Copying HTML into Resend

1. Trigger the email locally (e.g. sign up, forgot password) with `RESEND_API_KEY` unset or use a dev script.
2. Or open any template file under `src/server/emails/templates/` — each calls `renderEmailLayout()` for the full HTML.
3. In Resend → Templates → Create, paste the HTML and replace dynamic parts with Resend variables like `{{NAME}}`, `{{RESET_URL}}`, etc. (match names in `EMAIL_CATALOG`).
4. Copy the template ID (e.g. `tmpl_abc123`) into the matching `RESEND_TEMPLATE_*` env var.

## Module layout

```
src/server/emails/
  config.ts          # Env, APP_URL, logo URL, template ID lookup
  sender.ts          # Resend send + admin broadcast helpers
  layout.ts          # Header (logo), body shell, footer
  helpers.ts         # escapeHtml
  types.ts           # EmailContent, template keys
  index.ts           # Public exports
  templates/
    registry.ts      # Catalog of all emails + Resend variables
    welcome.ts
    password-reset.ts
    mfa-enabled.ts
    signup-admin.ts
    admin-invite.ts
    verification-*.ts
    service-request.ts
```

## Testing

1. Use Resend’s test mode or a verified recipient while developing.
2. Check server logs for `[email]` warnings if mail does not arrive.
3. Confirm `APP_URL` matches the environment so buttons and the logo resolve.
