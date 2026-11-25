import { NextResponse } from "next/server";
import { z } from "zod";
import { createSiteFeedback } from "@/server/services/site-feedback";
import { emailAdmins, emailButton, emailKeyValue, escapeHtml, getAppUrl, renderEmailLayout } from "@/server/emails";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

/** Public contact-page enquiries. Stored with site feedback so admins see them under Admin → Feedbacks. */
const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  business: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().min(5).max(4000),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`contact:${ip}`, 5, 600_000);
  if (!limited.ok) return rateLimitResponse(limited);

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }
  const d = parsed.data;
  const name = `${d.firstName} ${d.lastName}`;

  try {
    const row = await createSiteFeedback({
      name,
      email: d.email,
      topic: `Consultation request · ${d.business}`,
      message: [d.message, "", `Business: ${d.business}`, d.phone ? `Phone: ${d.phone}` : ""].filter(Boolean).join("\n"),
      page: "/contact",
    });

    // Best effort: the enquiry is already saved even if email isn't configured or fails.
    try {
      const html = renderEmailLayout({
        title: "New consultation request",
        preheader: `${name} from ${d.business}`,
        bodyHtml:
          emailKeyValue([
            { label: "Name", value: escapeHtml(name) },
            { label: "Business", value: escapeHtml(d.business) },
            { label: "Email", value: escapeHtml(d.email) },
            { label: "Phone", value: escapeHtml(d.phone || "-") },
            { label: "Message", value: escapeHtml(d.message).replace(/\n/g, "<br />") },
          ]) + emailButton(`${getAppUrl()}/admin/feedbacks`, "Open in admin"),
      });
      await emailAdmins(`New consultation request: ${d.business}`, html);
    } catch (err) {
      console.error("[api/contact] email failed", err);
    }

    return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json({ error: "Could not send your message. Please try WhatsApp instead." }, { status: 500 });
  }
}
