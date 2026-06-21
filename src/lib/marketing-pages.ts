export const PRODUCT_MODULES = [
  {
    title: "Client portal",
    desc: "One dashboard for verification, service requests, profile, and delivery updates, with no scattered WhatsApp threads.",
    icon: "layout" as const,
  },
  {
    title: "Verification workflow",
    desc: "Structured KYC with document upload, admin review, and clear status so clients know when they can request services.",
    icon: "shield" as const,
  },
  {
    title: "Service intake",
    desc: "Guided questionnaires per package tier so you capture scope, budget, and timeline before work starts.",
    icon: "clipboard" as const,
  },
  {
    title: "Operations console",
    desc: "Admin queues for verifications and requests, notifications, and status updates that sync back to the client.",
    icon: "settings" as const,
  },
];

export const PRODUCT_FLOW = [
  {
    step: "01",
    title: "Create account",
    body: "Clients sign up, add contact details, and land in a guided portal, not a generic contact form.",
  },
  {
    step: "02",
    title: "Verify once",
    body: "Business details and documents are submitted once, reviewed in admin, and unlock service requests when approved.",
  },
  {
    step: "03",
    title: "Request & track",
    body: "Intake forms create structured requests. Clients see status changes; your team works from dedicated admin lists.",
  },
  {
    step: "04",
    title: "Deliver & notify",
    body: "Status moves through your pipeline. Email and in-app notifications keep both sides aligned without manual chasing.",
  },
];

export const PRODUCT_PILLARS = [
  { slug: "website-landing-pages", label: "Websites & landing pages", href: "/product/website-landing-pages" },
  { slug: "payments-integration", label: "Payments", href: "/product/payments-integration" },
  { slug: "business-email", label: "Business email", href: "/product/business-email" },
  { slug: "bulk-messaging", label: "Campaigns & reach", href: "/product/bulk-messaging" },
  { slug: "integrations", label: "Integrations & ops", href: "/product/integrations" },
];

export const SOLUTION_SEGMENTS = [
  {
    id: "solo",
    title: "Self-employed & freelancers",
    pain: "You are the brand, but DMs and personal email do not scale when clients want invoices and proof you exist.",
    outcome: "A credible site, business email, and payment links so you look established from day one.",
    href: "/solutions/self-employed",
    cta: "Launch setup",
  },
  {
    id: "micro",
    title: "Micro-businesses (1–9 people)",
    pain: "Leads slip through because follow-up, invoicing, and campaigns live in different chats and spreadsheets.",
    outcome: "Connected web presence, payments, and outreach so the small team operates like a larger shop.",
    href: "/solutions/micro-businesses",
    cta: "Growth stack",
  },
  {
    id: "sme",
    title: "SMEs (10–250+ people)",
    pain: "Departments use different tools; customers see inconsistent branding and slow responses.",
    outcome: "Integrations, training, and a unified digital front that matches the quality of your offline operation.",
    href: "/solutions/smes",
    cta: "Scale operations",
  },
  {
    id: "nonprofit",
    title: "Associations & member orgs",
    pain: "Donations, dues, and event comms need trust and traceability, not ad-hoc bank transfers.",
    outcome: "Payments, invoicing, and bulk messaging with a professional public face members can rely on.",
    href: "/solutions/associations",
    cta: "Member-ready setup",
  },
];

export const SOLUTION_OUTCOMES = [
  {
    title: "Look verifiable",
    desc: "Website, domain SSL, and branded email so buyers stop treating you like a side hustle.",
    href: "/product/business-email",
    tone: "emerald" as const,
  },
  {
    title: "Get paid faster",
    desc: "Checkout, payment links, and invoices that reduce back-and-forth and missed collections.",
    href: "/product/payments-integration",
    tone: "cyan" as const,
  },
  {
    title: "Reach & convert",
    desc: "Campaigns and landing paths that drive people back to book, pay, or request a quote.",
    href: "/product/marketing-setup",
    tone: "purple" as const,
  },
];
