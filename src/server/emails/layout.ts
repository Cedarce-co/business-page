import "server-only";

import { OFFICE_HOURS_SHORT, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY } from "@/lib/contact";
import { getAppUrl, getEmailLogoUrl } from "@/server/emails/config";
import { escapeHtml } from "@/server/emails/helpers";

export type EmailLayoutInput = {
  /** Shown as the main heading inside the body. */
  title: string;
  /** Inner HTML for the body section (already escaped where needed). */
  bodyHtml: string;
  /** Short preview line for inbox clients (hidden in body). */
  preheader?: string;
};

export function emailParagraph(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#334155;">${text}</p>`;
}

export function emailMuted(text: string) {
  return `<p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">${text}</p>`;
}

export function emailList(items: string[]) {
  return `<ul style="margin:0 0 20px;padding:0 0 0 20px;color:#334155;font-size:15px;line-height:1.65;">
    ${items.map((item) => `<li style="margin:0 0 8px;">${item}</li>`).join("")}
  </ul>`;
}

export function emailKeyValue(rows: Array<{ label: string; value: string }>) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 20px;border-collapse:collapse;">
    ${rows
      .map(
        (row) => `<tr>
      <td style="padding:8px 12px 8px 0;font-size:13px;font-weight:600;color:#64748b;vertical-align:top;width:120px;">${escapeHtml(row.label)}</td>
      <td style="padding:8px 0;font-size:14px;color:#0f172a;vertical-align:top;">${row.value}</td>
    </tr>`,
      )
      .join("")}
  </table>`;
}

export function emailButton(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
    <tr>
      <td style="border-radius:12px;background:#0f172a;">
        <a href="${href}" style="display:inline-block;padding:14px 22px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:12px;">
          ${escapeHtml(label)}
        </a>
      </td>
    </tr>
  </table>`;
}

export function emailLink(href: string, label: string) {
  return `<a href="${href}" style="color:#0f172a;font-weight:600;text-decoration:underline;">${escapeHtml(label)}</a>`;
}

export function renderEmailLayout(input: EmailLayoutInput) {
  const appUrl = getAppUrl();
  const logoUrl = getEmailLogoUrl();
  const year = new Date().getFullYear();
  const preheader = input.preheader ? escapeHtml(input.preheader) : escapeHtml(input.title);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(input.title)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
          <tr>
            <td style="padding:28px 32px 20px;text-align:center;border-bottom:1px solid #f1f5f9;background:#ffffff;">
              <a href="${appUrl}" style="text-decoration:none;display:inline-block;">
                <img src="${logoUrl}" alt="Cedarce" width="160" height="auto" style="display:block;margin:0 auto;max-width:160px;height:auto;border:0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px;">
              <h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;font-weight:800;color:#0f172a;letter-spacing:-0.02em;">
                ${escapeHtml(input.title)}
              </h1>
              ${input.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px;">
              ${emailMuted(
                `Questions? Reply to this email or contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color:#0f172a;font-weight:600;text-decoration:underline;">${SUPPORT_EMAIL}</a>.`,
              )}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#94a3b8;text-align:center;">
                Cedarce · Digital business services
              </p>
              <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#94a3b8;text-align:center;">
                ${escapeHtml(SUPPORT_PHONE_DISPLAY)} · ${escapeHtml(OFFICE_HOURS_SHORT)}
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:#94a3b8;text-align:center;">
                <a href="${appUrl}" style="color:#64748b;text-decoration:underline;">cedarce.com</a>
                · © ${year} Cedarce
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
