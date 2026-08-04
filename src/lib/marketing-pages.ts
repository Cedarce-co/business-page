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

export const PRODUCT_CATALOG = [
  {
    id: "website-landing-pages",
    title: "Website & landing pages",
    description:
      "Simple pages that look good on phones and help visitors take the next step. clear CTAs and easy structure.",
    href: "/product/website-landing-pages",
    icon: "Globe" as const,
  },
  {
    id: "payments-integration",
    title: "Payments integration",
    description:
      "Simple ways for customers to pay you online without long message threads.",
    href: "/product/payments-integration",
    icon: "CreditCard" as const,
  },
  {
    id: "business-email",
    title: "Business email",
    description:
      "Professional inboxes on your domain. credible outbound email that lands reliably in every inbox.",
    href: "/product/business-email",
    icon: "Mail" as const,
  },
  {
    id: "bulk-messaging",
    title: "Campaigns & reach",
    description:
      "Bulk messaging and structured campaigns that drive people back to book, pay, or request a quote.",
    href: "/product/bulk-messaging",
    icon: "Megaphone" as const,
  },
  {
    id: "integrations",
    title: "Integrations & ops",
    description:
      "Connect your tools, automate follow-ups, and keep operations running without manual chasing.",
    href: "/product/integrations",
    icon: "Settings" as const,
  },
  {
    id: "invoicing-receipts",
    title: "Invoicing & receipts",
    description:
      "Branded invoices and receipts sent automatically. less typing, faster collections, cleaner records.",
    href: "/product/invoicing-receipts",
    icon: "FileText" as const,
  },
];

export const SOLUTION_SEGMENTS = [
  {
    id: "solo",
    title: "Small businesses",
    pain: "You are the brand, but chats and personal email do not look ready when clients want invoices and proof you exist.",
    outcome: "A clear website, business email, and tools that make you look established from day one.",
    href: "/solutions/self-employed",
    cta: "Launch setup",
  },
  {
    id: "micro",
    title: "Shops, malls & stores",
    pain: "You sell every day but tracking sales and store inventory still means guesswork, notebooks, or scattered chats.",
    outcome: "A clear way to track sales and stock, with an online presence that matches your physical store.",
    href: "/solutions/micro-businesses",
    cta: "Shop setup",
  },
  {
    id: "sme",
    title: "Medium businesses",
    pain: "Teams use different tools; customers see mixed branding and slow replies.",
    outcome: "Connected tools, training, and a united digital front for your whole operation.",
    href: "/solutions/smes",
    cta: "Scale with us",
  },
  {
    id: "nonprofit",
    title: "Associations & groups",
    pain: "Dues, donations, and member updates need trust. Not ad-hoc bank transfer messages.",
    outcome: "Payments, invoices, and group messaging with a professional public face members can rely on.",
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
    title: "Run day to day smoother",
    desc: "Online tools, invoices, and clear processes that reduce chasing and mixed-up messages.",
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
