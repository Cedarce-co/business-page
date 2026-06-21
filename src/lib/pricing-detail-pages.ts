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
    title: "Starter package",
    eyebrow: "Entry tier",
    tagline: "Go professional without overbuilding on day one",
    lead:
      "Starter is for businesses ready to look credible online with a landing page, domain, one business inbox, and payments. We scope the rest together after kickoff.",
    heroVariant: "split",
    accent: "cyan",
    icon: Rocket,
    primaryCta: requestPackage("Starter"),
    secondaryCta: compare,
    sections: [
      {
        type: "checklist",
        title: "What's included",
        columns: 2,
        items: [
          "Mobile-responsive landing page (SEO-ready)",
          "Domain registration (major TLDs)",
          "1 business email inbox",
          "Payment gateway integration",
          "SSL certificate setup",
          "30 days post-launch support",
        ],
      },
      {
        type: "pain-outcome",
        pain: "You're losing trust because customers can't verify you online or pay you cleanly.",
        outcome: "You look like a real business from the first Google search and first invoice.",
        bullets: ["Live in days, not months", "One inbox on your domain", "Pay links customers understand"],
      },
      {
        type: "quote",
        text: "Starter got us off WhatsApp-only quotes. Customers pay from the link and we look legit.",
        attribution: "Retail operator, Lagos",
      },
    ],
    related: [
      { slug: "business", label: "Business package", category: "pricing" },
      { slug: "self-employed", label: "Self-employed pricing", category: "pricing" },
      { slug: "website-landing-pages", label: "Websites", category: "product" },
    ],
  },
  business: {
    slug: "business",
    category: "pricing",
    title: "Business package",
    eyebrow: "Most popular",
    tagline: "Full digital setup for teams ready to scale daily operations",
    lead:
      "Business is our most chosen tier: full website, hosting, five inboxes, payments with invoicing, bulk messaging setup, and staff training. Built for operators who've outgrown informal tools.",
    heroVariant: "centered",
    accent: "purple",
    icon: Layers,
    primaryCta: requestPackage("Business"),
    secondaryCta: consult,
    sections: [
      {
        type: "stats",
        title: "Why teams pick Business",
        items: [
          { value: "5", label: "Business email inboxes" },
          { value: "90", label: "Days post-launch support" },
          { value: "2hr", label: "Staff training included" },
        ],
      },
      {
        type: "bento",
        title: "Everything in Business",
        items: [
          { icon: "globe", title: "Full website", body: "Multi-page site with SEO and mobile-first layout." },
          { icon: "mail", title: "Email suite", body: "Five inboxes on your domain with deliverability setup." },
          { icon: "credit", title: "Payments + invoicing", body: "Checkout plus automated branded invoices." },
          { icon: "message", title: "Bulk messaging", body: "Email and WhatsApp campaign foundations." },
        ],
      },
      {
        type: "comparison",
        title: "Starter vs Business",
        before: ["Single landing page", "One inbox", "Payments only", "Self-serve learning curve"],
        after: ["Full website + hosting", "Team inboxes", "Invoicing automation", "Live training session"],
      },
    ],
    related: [
      { slug: "starter", label: "Starter package", category: "pricing" },
      { slug: "enterprise", label: "Enterprise package", category: "pricing" },
      { slug: "micro-businesses", label: "Micro-business pricing", category: "pricing" },
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
      { slug: "business", label: "Business package", category: "pricing" },
      { slug: "smes", label: "SME pricing", category: "pricing" },
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
    primaryCta: requestPackage("Business"),
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
        bullets: ["Typical kickoff to live in 48 hours", "Business package most common fit", "Enterprise for multi-branch rollouts"],
      },
    ],
    related: [
      { slug: "business-launch-setup", label: "Launch solution", category: "solution" },
      { slug: "business", label: "Business package", category: "pricing" },
      { slug: "starter", label: "Starter package", category: "pricing" },
    ],
  },
  "self-employed": {
    slug: "self-employed",
    category: "pricing",
    title: "Pricing for self-employed professionals",
    eyebrow: "Freelancers & sole traders",
    tagline: "Look established while you stay lean",
    lead:
      "Self-employed pricing focuses on credibility per naira: one strong landing page, domain, inbox, and pay links so clients stop treating you like a side hustle.",
    heroVariant: "minimal",
    accent: "teal",
    icon: Users,
    primaryCta: requestPackage("Starter"),
    secondaryCta: consult,
    sections: [
      {
        type: "bento",
        title: "What freelancers usually need first",
        items: [
          { icon: "globe", title: "Portfolio or offer page", body: "One page that explains what you do and how to hire you." },
          { icon: "mail", title: "Branded email", body: "Stop sending proposals from personal Gmail." },
          { icon: "credit", title: "Pay links", body: "Deposits and final payments without awkward DMs." },
        ],
      },
      {
        type: "quote",
        text: "Starter was enough to win my first corporate retainer. They checked the site before signing.",
        attribution: "Independent consultant",
      },
    ],
    related: [
      { slug: "self-employed", label: "Self-employed solution", category: "solution" },
      { slug: "starter", label: "Starter package", category: "pricing" },
      { slug: "web-presence", label: "Web presence pricing", category: "pricing" },
    ],
  },
  "micro-businesses": {
    slug: "micro-businesses",
    category: "pricing",
    title: "Pricing for micro-businesses",
    eyebrow: "Teams of 1–9",
    tagline: "One system instead of five disconnected apps",
    lead:
      "Micro-business pricing maps to the Business package: website, multiple inboxes, invoicing, and messaging setup so a small team shares one professional stack.",
    heroVariant: "centered",
    accent: "rose",
    icon: Users,
    primaryCta: requestPackage("Business"),
    secondaryCta: compare,
    sections: [
      {
        type: "comparison",
        title: "Before Cedarce vs after",
        before: ["Orders in DMs", "Invoices rebuilt in Excel", "Marketing only when someone has time"],
        after: ["Site as source of truth", "Automated invoices + receipts", "Campaign templates ready to send"],
      },
      {
        type: "stats",
        title: "Typical micro-business scope",
        items: [
          { value: "3–5", label: "Tools unified" },
          { value: "5", label: "Email inboxes" },
          { value: "90", label: "Days support" },
        ],
      },
    ],
    related: [
      { slug: "micro-businesses", label: "Micro-business solution", category: "solution" },
      { slug: "business", label: "Business package", category: "pricing" },
      { slug: "payments-invoicing", label: "Payments pricing", category: "pricing" },
    ],
  },
  smes: {
    slug: "smes",
    category: "pricing",
    title: "Pricing for SMEs",
    eyebrow: "10–250+ people",
    tagline: "Governance, integrations, and rollout at scale",
    lead:
      "SME engagements usually start on Business or Enterprise depending on branches, integrations, and compliance. We quote after mapping departments and existing systems.",
    heroVariant: "immersive",
    accent: "purple",
    icon: Building2,
    primaryCta: requestPackage("Enterprise"),
    secondaryCta: consult,
    sections: [
      {
        type: "split",
        title: "How SME pricing works",
        body: "No flat rate on the website because scope varies by locations, apps, and training needs. Discovery is free and produces a phased proposal.",
        panelTitle: "Common SME modules",
        panelItems: ["Multi-site web presence", "Department inboxes", "ERP/accounting hooks", "Staff training program"],
        reverse: true,
      },
      {
        type: "timeline",
        title: "Phased rollout",
        orientation: "horizontal",
        steps: [
          { title: "Foundation", body: "Site, email, payments." },
          { title: "Operations", body: "Invoicing, messaging, integrations." },
          { title: "Scale", body: "Apps, automation, SLAs." },
        ],
      },
    ],
    related: [
      { slug: "smes", label: "SME solution", category: "solution" },
      { slug: "enterprise", label: "Enterprise package", category: "pricing" },
      { slug: "apps-and-operations", label: "Apps & ops pricing", category: "pricing" },
    ],
  },
  "compare-plans": {
    slug: "compare-plans",
    category: "pricing",
    title: "Compare plans",
    eyebrow: "Choose your tier",
    tagline: "Starter, Business, and Enterprise at a glance",
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
          "Starter: landing page, 1 inbox, payments, 30-day support",
          "Best for: solo operators going professional",
        ],
        after: [
          "Business: full site, 5 inboxes, invoicing, messaging, training, 90-day support",
          "Enterprise: custom scope, integrations, dedicated lead, volume pricing",
        ],
      },
      {
        type: "checklist",
        title: "Not sure? Start here",
        columns: 1,
        items: [
          "Need credibility fast with minimal scope → Starter",
          "Small team outgrowing manual tools → Business",
          "Multiple locations or heavy integrations → Enterprise",
          "Still deciding → book a 20-minute consult",
        ],
      },
    ],
    related: [
      { slug: "starter", label: "Starter", category: "pricing" },
      { slug: "business", label: "Business", category: "pricing" },
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
      "Price depends on page count, integrations, and content readiness. Most web-presence scopes land inside Starter or Business packages; standalone quotes cover migrations and custom builds.",
    heroVariant: "split",
    accent: "purple",
    icon: Globe,
    primaryCta: consult,
    secondaryCta: requestPackage("Starter"),
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
      { slug: "starter", label: "Starter package", category: "pricing" },
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
      "We integrate gateways your customers already use and wire branded invoice templates. Business package includes automated invoicing; standalone work covers custom flows and ERP exports.",
    heroVariant: "centered",
    accent: "emerald",
    icon: CreditCard,
    primaryCta: consult,
    secondaryCta: requestPackage("Business"),
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
      { slug: "business", label: "Business package", category: "pricing" },
    ],
  },
  "business-identity": {
    slug: "business-identity",
    category: "pricing",
    title: "Business email & identity",
    eyebrow: "À la carte",
    tagline: "Professional inboxes on your domain",
    lead:
      "Identity pricing covers DNS, mailbox provisioning, and deliverability basics. Starter includes one inbox; Business includes five with team routing guidance.",
    heroVariant: "minimal",
    accent: "cyan",
    icon: Mail,
    primaryCta: consult,
    secondaryCta: requestPackage("Starter"),
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
      { slug: "starter", label: "Starter package", category: "pricing" },
      { slug: "self-employed", label: "Self-employed pricing", category: "pricing" },
    ],
  },
  "customer-reach": {
    slug: "customer-reach",
    category: "pricing",
    title: "Customer reach & campaigns",
    eyebrow: "À la carte",
    tagline: "Bulk email, WhatsApp, and structured outreach",
    lead:
      "Campaign pricing depends on list size, channels, and template complexity. Business package includes messaging setup; ongoing sends can be scoped monthly or per campaign.",
    heroVariant: "split",
    accent: "rose",
    icon: Megaphone,
    primaryCta: consult,
    secondaryCta: requestPackage("Business"),
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
      { slug: "business", label: "Business package", category: "pricing" },
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
