import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CreditCard,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  Mail,
  Megaphone,
  MessageSquare,
  Receipt,
  Rocket,
  Server,
  Share2,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { allPricingSlugs, getPricingPage } from "@/lib/pricing-detail-pages";

export type MarketingAccent = "teal" | "purple" | "emerald" | "amber" | "cyan" | "rose";

export type MarketingHeroVariant = "split" | "centered" | "immersive" | "minimal";

export type MarketingSection =
  | { type: "stats"; title: string; items: { value: string; label: string }[] }
  | { type: "bento"; title: string; subtitle?: string; items: { title: string; body: string; icon: string }[] }
  | { type: "split"; title: string; body: string; panelTitle: string; panelItems: string[]; reverse?: boolean }
  | { type: "timeline"; title: string; orientation: "horizontal" | "vertical"; steps: { title: string; body: string }[] }
  | { type: "checklist"; title: string; items: string[]; columns?: 1 | 2 }
  | { type: "comparison"; title: string; before: string[]; after: string[] }
  | { type: "pain-outcome"; pain: string; outcome: string; bullets: string[] }
  | { type: "quote"; text: string; attribution: string };

export type MarketingPageConfig = {
  slug: string;
  category: "product" | "solution" | "pricing";
  title: string;
  eyebrow: string;
  tagline: string;
  lead: string;
  heroVariant: MarketingHeroVariant;
  accent: MarketingAccent;
  icon: LucideIcon;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  sections: MarketingSection[];
  related: { slug: string; label: string; category: "product" | "solution" | "pricing" }[];
};

const consult = { href: "/contact", label: "Book a consult" } as const;
const signup = { href: "/signup", label: "Create free account" } as const;

export const PRODUCT_PAGES: Record<string, MarketingPageConfig> = {
  "website-landing-pages": {
    slug: "website-landing-pages",
    category: "product",
    title: "Website & landing pages",
    eyebrow: "Digital setup",
    tagline: "Mobile-first pages that convert browsers into buyers",
    lead:
      "We design and build fast, responsive sites and focused landing pages with clear offers, trust signals, and one obvious next step: book, call, pay, or request a quote.",
    heroVariant: "split",
    accent: "purple",
    icon: Globe,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "stats",
        title: "Built for how Nigerians actually browse",
        items: [
          { value: "90%+", label: "Mobile traffic ready" },
          { value: "<3s", label: "Target load on 4G" },
          { value: "1", label: "Primary CTA per page" },
        ],
      },
      {
        type: "bento",
        title: "What makes our pages different",
        items: [
          { icon: "smartphone", title: "Thumb-first layout", body: "Navigation, pricing, and CTAs sit where thumbs reach on small screens." },
          { icon: "zap", title: "Speed & SEO basics", body: "Structured headings, meta tags, and lean assets so Google and ads can find you." },
          { icon: "layers", title: "Modular sections", body: "Hero, proof, services, FAQ, and contact blocks you can extend later." },
          { icon: "share", title: "Share-ready", body: "Open Graph previews that look professional when links hit WhatsApp." },
        ],
      },
      {
        type: "timeline",
        title: "From brief to live",
        orientation: "horizontal",
        steps: [
          { title: "Offer mapping", body: "We nail your audience, promise, and the one action each page must drive." },
          { title: "Design & copy", body: "Wireframes become branded pages with headlines that speak business, not tech." },
          { title: "Launch", body: "Forms, analytics hooks, and handover so you can iterate without starting over." },
        ],
      },
      {
        type: "checklist",
        title: "Typical deliverables",
        columns: 2,
        items: [
          "Home + core service pages",
          "Contact / lead capture forms",
          "WhatsApp & click-to-call",
          "Brand-aligned typography & colour",
          "Basic SEO & sitemap",
          "Training on simple updates",
        ],
      },
    ],
    related: [
      { slug: "domain-hosting", label: "Domain & hosting", category: "product" },
      { slug: "marketing-setup", label: "Marketing setup", category: "product" },
      { slug: "business-launch-setup", label: "Launch package", category: "solution" },
    ],
  },
  "domain-hosting": {
    slug: "domain-hosting",
    category: "product",
    title: "Domain & hosting",
    eyebrow: "Digital setup",
    tagline: "Your name on the web, secured and managed",
    lead:
      "We register your domain, configure DNS, provision SSL, and place your site on reliable hosting so uptime and security are handled before your first customer arrives.",
    heroVariant: "immersive",
    accent: "cyan",
    icon: Server,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "Stop juggling registrar logins",
        body: "Many businesses lose access to domains bought on personal accounts. We centralise ownership, renewals, and DNS in one documented handover.",
        panelTitle: "We configure",
        panelItems: ["Domain registration & renewal reminders", "A/CNAME/MX records", "SSL certificates", "Staging vs production environments"],
      },
      {
        type: "comparison",
        title: "Informal vs managed hosting",
        before: ["Site down and nobody knows why", "SSL warnings scare customers away", "Email and website DNS conflict", "No backup before a plugin breaks"],
        after: ["Monitored hosting with clear support path", "HTTPS everywhere by default", "DNS documented in one place", "Restore plan before go-live"],
      },
      {
        type: "timeline",
        title: "Setup sequence",
        orientation: "vertical",
        steps: [
          { title: "Choose & register", body: "We secure your .com.ng or global TLD and confirm registrant details." },
          { title: "Point & secure", body: "DNS to hosting, SSL issued, redirects from www/non-www sorted." },
          { title: "Handover", body: "You get a simple runbook: what lives where and who to call." },
        ],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Websites", category: "product" },
      { slug: "business-email", label: "Business email", category: "product" },
    ],
  },
  "business-email": {
    slug: "business-email",
    category: "product",
    title: "Business email",
    eyebrow: "Digital setup",
    tagline: "Inboxes on your domain, not your personal Gmail",
    lead:
      "Branded addresses like hello@yourcompany.com signal legitimacy before the first sentence. We set up mailboxes, signatures, and authentication basics so messages land in inboxes, not spam.",
    heroVariant: "minimal",
    accent: "emerald",
    icon: Mail,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "quote",
        text: "Clients almost didn't reply because the quote came from a Yahoo address. Branded email shifted close rates without changing the offer.",
        attribution: "Typical Cedarce client outcome",
      },
      {
        type: "bento",
        title: "Professional identity kit",
        items: [
          { icon: "mail", title: "Role-based inboxes", body: "hello@, sales@, support@, structured for teams of one or twenty." },
          { icon: "shield", title: "Authentication", body: "SPF/DKIM guidance so providers trust your domain." },
          { icon: "layers", title: "Signatures", body: "Templates that match your site and invoice branding." },
          { icon: "users", title: "Aliases & forwards", body: "Route enquiries to the right person without exposing personal numbers." },
        ],
      },
      {
        type: "checklist",
        title: "Included in setup",
        items: ["Mailbox provisioning on your domain", "Mobile & desktop access walkthrough", "Signature HTML templates", "Coordination with web DNS records", "Best practices for cold vs warm outreach"],
      },
    ],
    related: [
      { slug: "domain-hosting", label: "Domain & DNS", category: "product" },
      { slug: "self-employed", label: "Freelancer solution", category: "solution" },
    ],
  },
  "payments-integration": {
    slug: "payments-integration",
    category: "product",
    title: "Payments integration",
    eyebrow: "Digital setup",
    tagline: "Cards, bank transfer & mobile money, where customers pay",
    lead:
      "We integrate Paystack, Flutterwave, or the gateway that fits your market so checkout on your site, payment links, and POS-style flows work without awkward manual confirmation.",
    heroVariant: "centered",
    accent: "teal",
    icon: CreditCard,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "stats",
        title: "Friction kills revenue",
        items: [
          { value: "24/7", label: "Self-serve checkout" },
          { value: "NG", label: "Local payment methods" },
          { value: "Auto", label: "Receipt on success" },
        ],
      },
      {
        type: "split",
        title: "One gateway, many surfaces",
        body: "Same backend powers pay buttons on your site, invoice links you WhatsApp to clients, and optional deposit flows.",
        panelTitle: "Channels we wire",
        panelItems: ["Website checkout", "Payment links", "Invoice pay-now buttons", "Webhook → portal notifications"],
        reverse: true,
      },
      {
        type: "timeline",
        title: "Integration path",
        orientation: "horizontal",
        steps: [
          { title: "Merchant setup", body: "Business verification with your chosen provider." },
          { title: "Test transactions", body: "Sandbox runs before real money moves." },
          { title: "Go live", body: "Production keys, webhooks, and team training." },
        ],
      },
    ],
    related: [
      { slug: "invoicing-receipts", label: "Invoicing", category: "product" },
      { slug: "associations", label: "Associations", category: "solution" },
    ],
  },
  "invoicing-receipts": {
    slug: "invoicing-receipts",
    category: "product",
    title: "Invoicing & receipts",
    eyebrow: "Digital setup",
    tagline: "Branded documents that get you paid faster",
    lead:
      "Stop screenshotting Word templates. We configure invoice and receipt flows tied to your brand and payment links so every document looks official and tracks status.",
    heroVariant: "split",
    accent: "amber",
    icon: Receipt,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "comparison",
        title: "Before & after",
        before: ["Manual PDFs with wrong totals", "No payment link on the invoice", "Clients 'forget' until you chase", "Receipts sent days late"],
        after: ["Numbered invoices from templates", "Pay-now embedded in PDF/email", "Automatic receipt on settlement", "Audit trail for admin review"],
      },
      {
        type: "bento",
        title: "Document system",
        items: [
          { icon: "receipt", title: "Invoice templates", body: "Logo, tax lines, terms, and bank/gateway details consistent every time." },
          { icon: "credit", title: "Payment status", body: "See sent, viewed, paid without spreadsheet tracking." },
          { icon: "mail", title: "Delivery", body: "Email PDFs or share links clients can forward to finance." },
          { icon: "zap", title: "Reminders", body: "Optional nudges before due dates: polite, branded, automated." },
        ],
      },
      {
        type: "checklist",
        title: "We set up",
        columns: 2,
        items: ["Template design", "Line item & tax structure", "Payment link embedding", "Receipt auto-generation", "Export for accounting", "Team permissions"],
      },
    ],
    related: [
      { slug: "payments-integration", label: "Payments", category: "product" },
      { slug: "brand-and-automation", label: "Automation solution", category: "solution" },
    ],
  },
  "bulk-messaging": {
    slug: "bulk-messaging",
    category: "product",
    title: "Bulk messaging",
    eyebrow: "Growth tools",
    tagline: "Email, WhatsApp & SMS, without copy-paste chaos",
    lead:
      "Reach lists with structured campaigns: launches, payment reminders, event invites, and re-engagement, with templates, opt-outs, and links back to your site or checkout.",
    heroVariant: "immersive",
    accent: "rose",
    icon: MessageSquare,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "Campaigns, not blasts",
        body: "We help you segment audiences, draft message frameworks, and connect sends to measurable actions: clicks, replies, or payments.",
        panelTitle: "Channels",
        panelItems: ["Email newsletters", "WhatsApp broadcast flows", "SMS for time-sensitive alerts", "Trigger-based follow-ups"],
      },
      {
        type: "timeline",
        title: "Campaign lifecycle",
        orientation: "vertical",
        steps: [
          { title: "List hygiene", body: "Import, segment, and consent basics so you stay compliant." },
          { title: "Template library", body: "Reusable layouts for offers, reminders, and thank-yous." },
          { title: "Measure & refine", body: "Review opens, clicks, and replies; iterate the next send." },
        ],
      },
      {
        type: "quote",
        text: "Structured WhatsApp reminders cut no-shows by more than half for a service business we onboarded: same list, better timing and copy.",
        attribution: "Cedarce delivery team",
      },
    ],
    related: [
      { slug: "marketing-setup", label: "Marketing setup", category: "product" },
      { slug: "micro-businesses", label: "Micro-business solution", category: "solution" },
    ],
  },
  "marketing-setup": {
    slug: "marketing-setup",
    category: "product",
    title: "Marketing setup",
    eyebrow: "Growth tools",
    tagline: "Instagram, TikTok & Google, found where buyers search",
    lead:
      "We configure profiles, tracking, and landing paths so social traffic and search visits have somewhere credible to land, and you can see what's working.",
    heroVariant: "centered",
    accent: "purple",
    icon: Share2,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "bento",
        title: "Presence that points home",
        items: [
          { icon: "share", title: "Social profiles", body: "Bio links, highlights, and CTAs that route to your site, not endless DMs." },
          { icon: "globe", title: "Google Business", body: "Maps listing, hours, and review path for local discovery." },
          { icon: "zap", title: "Pixels & tags", body: "Basic analytics so ad spend isn't flying blind." },
          { icon: "layers", title: "Landing alignment", body: "Ad and post URLs match the promise on the page." },
        ],
      },
      {
        type: "stats",
        title: "Visibility metrics we track early",
        items: [
          { value: "100%", label: "Profile completeness goal" },
          { value: "UTM", label: "Campaign tagging" },
          { value: "1", label: "Primary conversion goal" },
        ],
      },
      {
        type: "checklist",
        title: "Setup checklist",
        columns: 2,
        items: ["Instagram / TikTok bio & link-in-bio", "Google Business Profile", "Meta / Google tag installation", "Conversion events defined", "Monthly review template"],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Landing pages", category: "product" },
      { slug: "bulk-messaging", label: "Bulk messaging", category: "product" },
    ],
  },
  "staff-training": {
    slug: "staff-training",
    category: "product",
    title: "Staff training",
    eyebrow: "Growth tools",
    tagline: "Hands-on onboarding so your team actually uses the stack",
    lead:
      "Tools fail when only one person knows the clicks. We run practical sessions on your website admin, payments, email, and campaigns, with cheat sheets your team keeps.",
    heroVariant: "split",
    accent: "emerald",
    icon: GraduationCap,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "Training that sticks",
        body: "Sessions use your real accounts and scenarios (taking a payment, sending an invoice, posting an update), not generic slides.",
        panelTitle: "Session topics",
        panelItems: ["Website & content updates", "Payment & invoice flows", "Email & signature standards", "Campaign sends & opt-outs"],
        reverse: true,
      },
      {
        type: "timeline",
        title: "Rollout format",
        orientation: "horizontal",
        steps: [
          { title: "Assess", body: "Who does what today; where handoffs break." },
          { title: "Train", body: "Live walkthroughs + recorded snippets for new hires." },
          { title: "Support", body: "Office hours during the first month after launch." },
        ],
      },
      {
        type: "checklist",
        title: "Deliverables",
        items: ["Role-based training agenda", "Screen-recorded micro-lessons", "Printed/digital cheat sheets", "Q&A log for repeat questions"],
      },
    ],
    related: [
      { slug: "integrations", label: "Integrations", category: "product" },
      { slug: "smes", label: "SME solution", category: "solution" },
    ],
  },
  integrations: {
    slug: "integrations",
    category: "product",
    title: "Integrations",
    eyebrow: "Growth tools",
    tagline: "Connect the tools you already use",
    lead:
      "Spreadsheets, CRMs, accounting exports, webhooks: we map data between your site, payments, messaging, and back-office tools so information stops living in chat screenshots.",
    heroVariant: "immersive",
    accent: "cyan",
    icon: Layers,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "bento",
        title: "Common connection patterns",
        items: [
          { icon: "credit", title: "Payment webhooks", body: "Paid invoice → update portal status → notify admin." },
          { icon: "mail", title: "Form → CRM", body: "Lead capture routes to the right owner automatically." },
          { icon: "layers", title: "Sheets & exports", body: "Scheduled CSV for finance without manual copy." },
          { icon: "smartphone", title: "App ↔ website", body: "Single sign-on or shared customer records." },
        ],
      },
      {
        type: "comparison",
        title: "Disconnected vs integrated",
        before: ["Staff re-type payment confirmations", "Duplicate customer records", "No alert when something fails"],
        after: ["Events flow between systems", "One customer view", "Slack/email alert on errors"],
      },
      {
        type: "timeline",
        title: "Integration project",
        orientation: "vertical",
        steps: [
          { title: "Map flows", body: "Document triggers, data fields, and failure handling." },
          { title: "Build & test", body: "Staging first; no live money on untested webhooks." },
          { title: "Monitor", body: "Logs and fallbacks so ops sleep at night." },
        ],
      },
    ],
    related: [
      { slug: "staff-training", label: "Staff training", category: "product" },
      { slug: "smes", label: "SME solution", category: "solution" },
    ],
  },
};

export const SOLUTION_PAGES: Record<string, MarketingPageConfig> = {
  "self-employed": {
    slug: "self-employed",
    category: "solution",
    title: "Self-employed & freelancers",
    eyebrow: "Existing companies",
    tagline: "Look like a company of one, without an agency retainer",
    lead:
      "You are the brand, but clients judge your website, email, and payment flow before they hire you. We package the essentials so you stop losing deals to 'DM for price'.",
    heroVariant: "minimal",
    accent: "purple",
    icon: Smartphone,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "pain-outcome",
        pain: "Leads ask for your website and you send a Linktree. Quotes go from personal email. Payments are 'transfer and send screenshot'.",
        outcome: "A credible site, hello@yourname.com, and pay links, so clients treat you like a registered business.",
        bullets: ["Portfolio or service landing page", "Branded email + signature", "Payment link on every quote", "WhatsApp button that feels professional"],
      },
      {
        type: "timeline",
        title: "Typical 3-week launch",
        orientation: "horizontal",
        steps: [
          { title: "Week 1", body: "Site structure, domain, and email addresses live." },
          { title: "Week 2", body: "Payments connected; invoice template ready." },
          { title: "Week 3", body: "Handover call + cheat sheet for updates." },
        ],
      },
      {
        type: "checklist",
        title: "Recommended product mix",
        columns: 2,
        items: ["Website & landing pages", "Domain & hosting", "Business email", "Payments integration", "Invoicing & receipts"],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Websites", category: "product" },
      { slug: "business-email", label: "Business email", category: "product" },
      { slug: "business-launch-setup", label: "Full launch setup", category: "solution" },
    ],
  },
  "micro-businesses": {
    slug: "micro-businesses",
    category: "solution",
    title: "Micro-businesses (1–9 people)",
    eyebrow: "Existing companies",
    tagline: "One small team, one digital front door",
    lead:
      "When everyone wears multiple hats, follow-up slips. We connect web, payments, email, and campaigns so the team shares one system, not five WhatsApp groups.",
    heroVariant: "split",
    accent: "teal",
    icon: Users,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "pain-outcome",
        pain: "Orders in DMs, invoices in Excel, marketing when someone 'has time'. New staff learn ops by shadowing, badly.",
        outcome: "Structured intake, branded comms, and campaigns that run on a calendar.",
        bullets: ["Shared business email mailboxes", "Invoice + payment status visible to admin", "Bulk reminders for renewals", "Simple roles in the Cedarce portal"],
      },
      {
        type: "stats",
        title: "What changes at this stage",
        items: [
          { value: "3–5", label: "Tools unified" },
          { value: "1", label: "Portal for requests" },
          { value: "2×", label: "Faster follow-up target" },
        ],
      },
      {
        type: "bento",
        title: "Stack we often deploy",
        items: [
          { icon: "globe", title: "Site + hosting", body: "Multi-page site with service detail and contact routing." },
          { icon: "credit", title: "Payments", body: "Checkout + invoice links for B2B and B2C." },
          { icon: "message", title: "Campaigns", body: "WhatsApp/email for launches and win-backs." },
          { icon: "graduation", title: "Team training", body: "Two sessions so everyone uses the same playbook." },
        ],
      },
    ],
    related: [
      { slug: "bulk-messaging", label: "Bulk messaging", category: "product" },
      { slug: "invoicing-receipts", label: "Invoicing", category: "product" },
      { slug: "brand-and-automation", label: "Brand & automation", category: "solution" },
    ],
  },
  smes: {
    slug: "smes",
    category: "solution",
    title: "SMEs (10–250+ people)",
    eyebrow: "Existing companies",
    tagline: "Digital ops that match your offline quality",
    lead:
      "Departments outgrow ad-hoc tools at different speeds. We integrate web, apps, payments, and training so customers see one brand and staff stop re-keying data.",
    heroVariant: "immersive",
    accent: "cyan",
    icon: Building2,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "comparison",
        title: "Scaling pain vs Cedarce approach",
        before: ["Sales uses personal email; finance uses another", "Website last updated two years ago", "No single view of client requests", "Integrations = manual CSV exports"],
        after: ["Role-based email and signatures", "Managed site with change process", "Portal for verification + service requests", "Webhooks between payment and ops tools"],
      },
      {
        type: "timeline",
        title: "Phased rollout",
        orientation: "vertical",
        steps: [
          { title: "Audit", body: "Map systems, owners, and customer journey gaps." },
          { title: "Foundation", body: "Site, email, payments: the public face." },
          { title: "Integrate & train", body: "Connect back-office; train teams by department." },
        ],
      },
      {
        type: "checklist",
        title: "Often includes",
        columns: 2,
        items: ["Integrations", "Staff training", "Apps & custom flows", "Admin operations setup", "Ongoing change requests via portal"],
      },
    ],
    related: [
      { slug: "integrations", label: "Integrations", category: "product" },
      { slug: "staff-training", label: "Staff training", category: "product" },
    ],
  },
  associations: {
    slug: "associations",
    category: "solution",
    title: "Associations & member orgs",
    eyebrow: "Existing companies",
    tagline: "Dues, donations, and comms members can trust",
    lead:
      "Members need to pay fees, get receipts, and hear from you on time. We combine payments, invoicing, bulk messaging, and a credible public site for nonprofits and associations.",
    heroVariant: "centered",
    accent: "rose",
    icon: Heart,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "pain-outcome",
        pain: "Dues collected via personal transfers; event updates lost in broadcast lists; no receipt trail for treasurers.",
        outcome: "Named invoices, automated receipts, and segmented member comms with a professional public face.",
        bullets: ["Membership renewal reminders", "Donation / dues payment links", "Treasurer-friendly exports", "Public site for credibility with sponsors"],
      },
      {
        type: "bento",
        title: "Built for treasurers & secretaries",
        items: [
          { icon: "receipt", title: "Dues invoicing", body: "Annual or term-based invoices with clear references." },
          { icon: "credit", title: "Online settlement", body: "Card and transfer with instant receipt." },
          { icon: "message", title: "Member updates", body: "AGM notices, event invites, thank-yous." },
          { icon: "globe", title: "Public presence", body: "Site that satisfies grant and partner due diligence." },
        ],
      },
      {
        type: "quote",
        text: "Treasurers spend less time reconciling screenshots when every payment generates a numbered receipt automatically.",
        attribution: "Cedarce associations playbook",
      },
    ],
    related: [
      { slug: "payments-integration", label: "Payments", category: "product" },
      { slug: "invoicing-receipts", label: "Invoicing", category: "product" },
      { slug: "bulk-messaging", label: "Bulk messaging", category: "product" },
    ],
  },
  "business-launch-setup": {
    slug: "business-launch-setup",
    category: "solution",
    title: "Business launch setup",
    eyebrow: "Business founders",
    tagline: "Website, domain, email & payments, launch week ready",
    lead:
      "Founders need to look legitimate before the first pitch. We bundle the core digital setup so you can send a link, an email, and a payment request in the same afternoon.",
    heroVariant: "split",
    accent: "emerald",
    icon: Rocket,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "stats",
        title: "Launch bundle targets",
        items: [
          { value: "5", label: "Core products configured" },
          { value: "1", label: "Portal account" },
          { value: "14d", label: "Typical go-live window" },
        ],
      },
      {
        type: "timeline",
        title: "Launch sequence",
        orientation: "horizontal",
        steps: [
          { title: "Identity", body: "Domain, email, and brand-aligned landing page." },
          { title: "Commerce", body: "Payment gateway + first invoice template." },
          { title: "Portal", body: "Verify business, submit first service request in Cedarce." },
        ],
      },
      {
        type: "checklist",
        title: "Bundle includes",
        columns: 2,
        items: ["Website & landing pages", "Domain & hosting", "Business email", "Payments integration", "Invoicing starter template", "Kickoff + handover call"],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Websites", category: "product" },
      { slug: "self-employed", label: "Freelancers", category: "solution" },
    ],
  },
  "brand-and-automation": {
    slug: "brand-and-automation",
    category: "solution",
    title: "Brand & automation",
    eyebrow: "Business founders",
    tagline: "Invoicing, follow-ups & bulk messaging on autopilot",
    lead:
      "After launch, growth means repeating yourself less. We wire invoicing, payment reminders, and campaign templates so brand and ops stay consistent while you focus on delivery.",
    heroVariant: "immersive",
    accent: "amber",
    icon: Megaphone,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "Automation with a human voice",
        body: "Templates sound like you, not a robot. We map triggers: invoice due, payment received, lapsed customer, new launch.",
        panelTitle: "Automations",
        panelItems: ["Invoice send + pay link", "Receipt on settlement", "7-day payment reminder", "Re-engagement campaign quarterly"],
      },
      {
        type: "comparison",
        title: "Manual vs automated follow-up",
        before: ["You forget to chase until cash flow hurts", "Receipts sent when you remember", "Campaigns only when you're desperate for sales"],
        after: ["Reminders on schedule", "Receipts instant and branded", "Calendar of planned outreach"],
      },
      {
        type: "bento",
        title: "Products in this solution",
        items: [
          { icon: "receipt", title: "Invoicing", body: "Templates + numbering + status." },
          { icon: "message", title: "Bulk messaging", body: "WhatsApp/email sequences." },
          { icon: "share", title: "Marketing setup", body: "Tags and landing alignment." },
          { icon: "mail", title: "Email identity", body: "Consistent sender reputation." },
        ],
      },
    ],
    related: [
      { slug: "invoicing-receipts", label: "Invoicing", category: "product" },
      { slug: "bulk-messaging", label: "Bulk messaging", category: "product" },
      { slug: "micro-businesses", label: "Micro-businesses", category: "solution" },
    ],
  },
};

export function getMarketingPage(category: "product" | "solution" | "pricing", slug: string) {
  if (category === "pricing") return getPricingPage(slug);
  const map = category === "product" ? PRODUCT_PAGES : SOLUTION_PAGES;
  return map[slug];
}

export function allMarketingSlugs(category: "product" | "solution" | "pricing") {
  if (category === "pricing") return allPricingSlugs();
  return Object.keys(category === "product" ? PRODUCT_PAGES : SOLUTION_PAGES);
}

export function marketingPagePath(category: "product" | "solution" | "pricing", slug: string) {
  if (category === "pricing") return `/pricing/${slug}`;
  return category === "product" ? `/product/${slug}` : `/solutions/${slug}`;
}
