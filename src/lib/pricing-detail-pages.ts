import { Building2, CreditCard, Globe, Layers, Mail, Megaphone, Rocket, Smartphone, Sparkles, Users } from "lucide-react";
import type { MarketingPageConfig } from "@/lib/marketing-detail-pages";

const consult = { href: "/contact", label: "Book a consult" } as const;
const compare = { href: "/pricing/compare-plans", label: "Compare all plans" } as const;

function requestPackage(name: string) {
  return { href: `/request-service?package=${encodeURIComponent(name)}`, label: `Request ${name}` };
}

export const PRICING_PAGES: Record<string, MarketingPageConfig> = {
  starter: {
    slug: "starter",
    category: "pricing",
    title: "Small Business package",
    eyebrow: "Entry tier · as low as ₦150,000",
    tagline: "Look ready online without buying more than you need",
    lead:
      "Small Business is for owners that want a simple website, their own web address, and business email. We fill in the rest after kickoff if you need more.",
    heroVariant: "split",
    accent: "cyan",
    icon: Rocket,
    primaryCta: requestPackage("Small Business"),
    secondaryCta: compare,
    sections: [
      {
        type: "checklist",
        title: "What's included",
        columns: 2,
        items: [
          "Simple one-page website that looks good on phones",
          "Your own website address",
          "1 business email inbox",
          "Secure padlock for your website",
          "30 days support after you go live",
        ],
      },
      {
        type: "pain-outcome",
        pain: "Customers struggle to find or trust you online.",
        outcome: "You show up as a real business from the first search and the first email.",
        bullets: ["Live in days, not months", "One inbox on your business name", "Clear next steps after launch"],
      },
      {
        type: "quote",
        text: "Small Business got us off WhatsApp-only quotes. Customers take us more seriously now.",
        attribution: "Retail owner",
      },
    ],
    related: [
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "self-employed", label: "Small business pricing", category: "pricing" },
      { slug: "website-landing-pages", label: "Websites", category: "product" },
    ],
  },
  business: {
    slug: "business",
    category: "pricing",
    title: "Medium Business package",
    eyebrow: "Most popular · as low as ₦500,000",
    tagline: "A fuller setup for teams ready to run more online",
    lead:
      "Medium Business is our most chosen package: multi-page website, hosting, five email accounts, payments with invoices, customer messaging, and staff training.",
    heroVariant: "centered",
    accent: "purple",
    icon: Layers,
    primaryCta: requestPackage("Medium Business"),
    secondaryCta: consult,
    sections: [
      {
        type: "stats",
        title: "Why teams pick Medium Business",
        items: [
          { value: "5", label: "Business email inboxes" },
          { value: "90", label: "Days of support after launch" },
          { value: "2hr", label: "Staff training included" },
        ],
      },
      {
        type: "bento",
        title: "Everything in Medium Business",
        items: [
          { icon: "globe", title: "Full website", body: "Several pages that work well on phone and computer." },
          { icon: "mail", title: "Email suite", body: "Five inboxes using your business name." },
          { icon: "credit", title: "Payments + invoices", body: "Take payments online and send clean bills." },
          { icon: "message", title: "Group messaging", body: "Email and WhatsApp messages to many people." },
        ],
      },
      {
        type: "comparison",
        title: "Small Business vs Medium Business",
        before: ["Single landing page", "One inbox", "Basics only", "Learn on your own"],
        after: ["Full website + hosting", "Team inboxes", "Invoices and payments", "Live training session"],
      },
    ],
    related: [
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "enterprise", label: "Enterprise package", category: "pricing" },
      { slug: "micro-businesses", label: "Shop & store pricing", category: "pricing" },
    ],
  },
  enterprise: {
    slug: "enterprise",
    category: "pricing",
    title: "Enterprise package",
    eyebrow: "Custom scope",
    tagline: "Tailored delivery, SLAs, and dedicated account leadership",
    lead:
      "Enterprise is for organisations that need volume pricing, integrations at scale, security reviews, and a named delivery lead. We scope together after discovery.",
    heroVariant: "immersive",
    accent: "amber",
    icon: Building2,
    primaryCta: requestPackage("Enterprise"),
    secondaryCta: consult,
    sections: [
      {
        type: "split",
        title: "Built around your operations",
        body: "We start with a discovery workshop: teams, tools, compliance needs, and rollout timeline. Nothing is cookie-cutter.",
        panelTitle: "Typical Enterprise add-ons",
        panelItems: [
          "Mobile apps and custom integrations",
          "Marketing and lifecycle automation",
          "Dedicated account lead",
          "Security review and training handover",
        ],
      },
      {
        type: "timeline",
        title: "How Enterprise engagements run",
        orientation: "vertical",
        steps: [
          { title: "Discovery", body: "Stakeholders, systems map, success metrics." },
          { title: "Proposal", body: "Phased scope, SLAs, and volume pricing." },
          { title: "Delivery", body: "Sprint-based rollout with executive checkpoints." },
        ],
      },
    ],
    related: [
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "smes", label: "Medium business pricing", category: "pricing" },
      { slug: "integrations", label: "Integrations", category: "product" },
    ],
  },
  "company-creators": {
    slug: "company-creators",
    category: "pricing",
    title: "Pricing for company creators",
    eyebrow: "New entities",
    tagline: "Launch-week digital stack for newly registered businesses",
    lead:
      "If you're incorporating or just received your registration documents, this path bundles identity, web presence, and payments so you can open for business credibly from week one.",
    heroVariant: "split",
    accent: "emerald",
    icon: Sparkles,
    primaryCta: requestPackage("Medium Business"),
    secondaryCta: compare,
    sections: [
      {
        type: "checklist",
        title: "Launch-week checklist",
        columns: 1,
        items: [
          "Domain aligned to registered business name",
          "Landing page with legal entity details",
          "hello@ on your domain",
          "Payment link for first invoices",
          "Portal account for future service requests",
        ],
      },
      {
        type: "pain-outcome",
        pain: "Banks, partners, and customers ask for a website and business email you don't have yet.",
        outcome: "You show up with the same baseline assets larger companies expect on day one.",
        bullets: ["Typical kickoff to live in 48 hours", "Medium Business package most common fit", "Enterprise for multi-branch rollouts"],
      },
    ],
    related: [
      { slug: "business-launch-setup", label: "Launch solution", category: "solution" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
    ],
  },
  "self-employed": {
    slug: "self-employed",
    category: "pricing",
    title: "Pricing for small businesses",
    eyebrow: "Small businesses · entry tier",
    tagline: "Look ready while you stay lean",
    lead:
      "Small business pricing focuses on credibility: one strong page, your web address, business email, and tools customers expect. Without buying more than you need.",
    heroVariant: "minimal",
    accent: "teal",
    icon: Users,
    primaryCta: requestPackage("Small Business"),
    secondaryCta: consult,
    sections: [
      {
        type: "bento",
        title: "What small businesses usually need first",
        items: [
          { icon: "globe", title: "Offer or about page", body: "One page that explains what you do and how to hire you." },
          { icon: "mail", title: "Business email", body: "Stop sending proposals from a personal email address." },
          { icon: "credit", title: "Pay options", body: "Accept deposits cleanly when you need payments." },
        ],
      },
      {
        type: "quote",
        text: "Small Business was enough to win a bigger client. They checked the site before signing.",
        attribution: "Independent consultant",
      },
    ],
    related: [
      { slug: "self-employed", label: "Small business setup", category: "solution" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "web-presence", label: "Web presence pricing", category: "pricing" },
    ],
  },
  "micro-businesses": {
    slug: "micro-businesses",
    category: "pricing",
    title: "Pricing for shops, malls & stores",
    eyebrow: "Shops & stores · growth tier",
    tagline: "Built around sales tracking and store inventory",
    lead:
      "Store packages focus on tracking sales and inventory, plus the digital basics (website, team email, invoices). Most shops map to the Medium Business package; we confirm what you need for your shelves and counter.",
    heroVariant: "centered",
    accent: "rose",
    icon: Users,
    primaryCta: requestPackage("Medium Business"),
    secondaryCta: compare,
    sections: [
      {
        type: "comparison",
        title: "Before Cedarce vs after",
        before: ["Sales only in notebooks or chats", "Stock counts done late or never", "Hard to see what sold this week"],
        after: ["Sales trail you can review", "Store inventory you can update", "Clear totals for busy trading days"],
      },
      {
        type: "stats",
        title: "Typical shop scope",
        items: [
          { value: "Sales", label: "What sold and when" },
          { value: "Stock", label: "What is still on the shelf" },
          { value: "Team", label: "Shared records, less confusion" },
        ],
      },
    ],
    related: [
      { slug: "micro-businesses", label: "Shop & store setup", category: "solution" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "payments-invoicing", label: "Payments pricing", category: "pricing" },
    ],
  },
  smes: {
    slug: "smes",
    category: "pricing",
    title: "Pricing for medium businesses",
    eyebrow: "Growing teams",
    tagline: "Governance, integrations, and rollout at scale",
    lead:
      "Medium business work usually starts on Medium Business or Enterprise depending on tools, locations, and training needs. We quote after a short discovery.",
    heroVariant: "immersive",
    accent: "purple",
    icon: Building2,
    primaryCta: requestPackage("Enterprise"),
    secondaryCta: consult,
    sections: [
      {
        type: "split",
        title: "How medium business pricing works",
        body: "No single price on the website because scope varies by locations, tools, and training. Discovery is free and produces a clear proposal.",
        panelTitle: "Common modules",
        panelItems: ["Multi-site web presence", "Department inboxes", "ERP/accounting hooks", "Staff training program"],
        reverse: true,
      },
      {
        type: "timeline",
        title: "Phased rollout",
        orientation: "vertical",
        steps: [
          { title: "Foundation", body: "Site, email, payments." },
          { title: "Operations", body: "Invoicing, messaging, integrations." },
          { title: "Scale", body: "Apps, automation, SLAs." },
        ],
      },
    ],
    related: [
      { slug: "smes", label: "Medium business setup", category: "solution" },
      { slug: "enterprise", label: "Enterprise package", category: "pricing" },
      { slug: "apps-and-operations", label: "Apps & ops pricing", category: "pricing" },
    ],
  },
  "compare-plans": {
    slug: "compare-plans",
    category: "pricing",
    title: "Compare plans",
    eyebrow: "Choose your tier",
    tagline: "Small Business, Medium Business, and Enterprise at a glance",
    lead:
      "All packages are scoped with you before kickoff. Use this comparison to see which tier matches your stage, then request the one that fits or book a call if you're unsure.",
    heroVariant: "minimal",
    accent: "cyan",
    icon: Layers,
    primaryCta: consult,
    secondaryCta: { href: "/pricing", label: "Back to pricing hub" },
    sections: [
      {
        type: "comparison",
        title: "Package snapshot",
        before: [
          "Small Business: landing page, 1 inbox, payments, 30-day support",
          "Best for: solo operators going professional",
        ],
        after: [
          "Medium Business: full site, 5 inboxes, invoicing, messaging, training, 90-day support",
          "Enterprise: custom scope, integrations, dedicated lead, volume pricing",
        ],
      },
      {
        type: "checklist",
        title: "Not sure? Start here",
        columns: 1,
        items: [
          "Need credibility fast with minimal scope → Small Business",
          "Small team outgrowing manual tools → Medium Business",
          "Multiple locations or heavy integrations → Enterprise",
          "Still deciding → book a 20-minute consult",
        ],
      },
    ],
    related: [
      { slug: "starter", label: "Small Business", category: "pricing" },
      { slug: "business", label: "Medium Business", category: "pricing" },
      { slug: "enterprise", label: "Enterprise", category: "pricing" },
    ],
  },
  "web-presence": {
    slug: "web-presence",
    category: "pricing",
    title: "Web presence & hosting",
    eyebrow: "À la carte",
    tagline: "Websites, domains, SSL, and managed hosting",
    lead:
      "Price depends on page count, integrations, and content readiness. Most web-presence scopes land inside Small Business or Medium Business packages; standalone quotes cover migrations and custom builds.",
    heroVariant: "split",
    accent: "purple",
    icon: Globe,
    primaryCta: consult,
    secondaryCta: requestPackage("Small Business"),
    sections: [
      {
        type: "bento",
        title: "What affects your quote",
        items: [
          { icon: "globe", title: "Page depth", body: "Landing only vs multi-page site with blog or catalogue." },
          { icon: "smartphone", title: "Mobile traffic", body: "Layouts optimised for how your audience browses." },
          { icon: "layers", title: "Hosting tier", body: "Traffic, storage, and backup expectations." },
        ],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Product detail", category: "product" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "domain-hosting", label: "Domain & hosting", category: "product" },
    ],
  },
  "payments-invoicing": {
    slug: "payments-invoicing",
    category: "pricing",
    title: "Payments & invoicing",
    eyebrow: "À la carte",
    tagline: "Checkout, invoices, and receipts that match your brand",
    lead:
      "We integrate gateways your customers already use and wire branded invoice templates. Medium Business package includes automated invoicing; standalone work covers custom flows and ERP exports.",
    heroVariant: "centered",
    accent: "emerald",
    icon: CreditCard,
    primaryCta: consult,
    secondaryCta: requestPackage("Medium Business"),
    sections: [
      {
        type: "pain-outcome",
        pain: "Manual invoices and screenshot receipts make you look informal and slow cash collection.",
        outcome: "Customers pay from a link and receive branded receipts automatically.",
        bullets: ["Gateway setup included in packages", "Reminder workflows on Business+", "Custom flows on Enterprise"],
      },
    ],
    related: [
      { slug: "payments-integration", label: "Payments product", category: "product" },
      { slug: "invoicing-receipts", label: "Invoicing product", category: "product" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
    ],
  },
  "business-identity": {
    slug: "business-identity",
    category: "pricing",
    title: "Business email & identity",
    eyebrow: "À la carte",
    tagline: "Professional inboxes on your domain",
    lead:
      "Identity pricing covers DNS, mailbox provisioning, and deliverability basics. Small Business includes one inbox; Medium Business includes five with team routing guidance.",
    heroVariant: "minimal",
    accent: "cyan",
    icon: Mail,
    primaryCta: consult,
    secondaryCta: requestPackage("Small Business"),
    sections: [
      {
        type: "checklist",
        title: "Included in setup",
        columns: 1,
        items: ["SPF/DKIM alignment", "Mailbox creation", "Mobile and desktop access", "Handover for your team"],
      },
    ],
    related: [
      { slug: "business-email", label: "Email product", category: "product" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "self-employed", label: "Small business pricing", category: "pricing" },
    ],
  },
  "customer-reach": {
    slug: "customer-reach",
    category: "pricing",
    title: "Customer reach & campaigns",
    eyebrow: "À la carte",
    tagline: "Bulk email, WhatsApp, and structured outreach",
    lead:
      "Campaign pricing depends on list size, channels, and template complexity. Medium Business package includes messaging setup; ongoing sends can be scoped monthly or per campaign.",
    heroVariant: "split",
    accent: "rose",
    icon: Megaphone,
    primaryCta: consult,
    secondaryCta: requestPackage("Medium Business"),
    sections: [
      {
        type: "bento",
        title: "Campaign building blocks",
        items: [
          { icon: "message", title: "Templates", body: "Launch, reminder, and win-back sequences." },
          { icon: "users", title: "List hygiene", body: "Opt-in paths and unsubscribe handling." },
          { icon: "share", title: "Landing alignment", body: "Every send links back to your site or checkout." },
        ],
      },
    ],
    related: [
      { slug: "bulk-messaging", label: "Bulk messaging", category: "product" },
      { slug: "marketing-setup", label: "Marketing setup", category: "product" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
    ],
  },
  "apps-and-operations": {
    slug: "apps-and-operations",
    category: "pricing",
    title: "Apps, integrations & training",
    eyebrow: "À la carte",
    tagline: "Mobile apps, tool connections, and team enablement",
    lead:
      "Ops pricing is quote-based: app builds, CRM/accounting integrations, and training hours. Enterprise is the usual home for multi-system rollouts.",
    heroVariant: "immersive",
    accent: "amber",
    icon: Smartphone,
    primaryCta: requestPackage("Enterprise"),
    secondaryCta: consult,
    sections: [
      {
        type: "timeline",
        title: "Typical engagement",
        orientation: "vertical",
        steps: [
          { title: "Integrations map", body: "Which tools must talk to each other." },
          { title: "Build or connect", body: "Apps, webhooks, or middleware." },
          { title: "Train & hand over", body: "Live sessions plus cheat sheets." },
        ],
      },
    ],
    related: [
      { slug: "integrations", label: "Integrations product", category: "product" },
      { slug: "staff-training", label: "Staff training", category: "product" },
      { slug: "enterprise", label: "Enterprise package", category: "pricing" },
    ],
  },
};

export function allPricingSlugs() {
  return Object.keys(PRICING_PAGES);
}

export function getPricingPage(slug: string) {
  return PRICING_PAGES[slug];
}
