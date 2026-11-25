import { Building2, CreditCard, Globe, Layers, Mail, Megaphone, Rocket, Smartphone, Sparkles, Users } from "lucide-react";
import type { MarketingPageConfig } from "@/lib/marketing-detail-pages";

const consult = { href: "/contact", label: "Talk to us" } as const;
const compare = { href: "/pricing/compare-plans", label: "Compare all packages" } as const;

function requestPackage(name: string) {
  return { href: `/request-service?package=${encodeURIComponent(name)}`, label: `Request ${name}` };
}

export const PRICING_PAGES: Record<string, MarketingPageConfig> = {
  starter: {
    slug: "starter",
    category: "pricing",
    title: "Small Business package",
    eyebrow: "Starter package · as low as ₦150,000",
    tagline: "Look professional online without paying for more than you need",
    lead:
      "Small Business is for owners who want a simple website, their own web address and a business email. If you need more later, we can add it.",
    heroVariant: "split",
    accent: "cyan",
    icon: Rocket,
    primaryCta: requestPackage("Small Business"),
    secondaryCta: compare,
    sections: [
      {
        type: "checklist",
        title: "What you get",
        columns: 2,
        items: [
          "A simple one-page website that looks good on phones",
          "Your own web address (like yourbusiness.com)",
          "1 business email account",
          "The padlock that shows your website is safe",
          "30 days of help after your site goes live",
        ],
      },
      {
        type: "pain-outcome",
        pain: "Customers struggle to find you online, or don't trust what they find.",
        outcome: "You look like a real business from the first Google search and the first email.",
        bullets: ["Ready in days, not months", "Email with your business name", "Clear next steps after your site goes live"],
      },
    ],
    related: [
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "self-employed", label: "Prices for small businesses", category: "pricing" },
      { slug: "website-landing-pages", label: "Websites", category: "product" },
    ],
  },
  business: {
    slug: "business",
    category: "pricing",
    title: "Medium Business package",
    eyebrow: "Recommended · as low as ₦500,000",
    tagline: "A fuller setup for businesses ready to do more online",
    lead:
      "Medium Business gives you a website with several pages, up to five business email accounts, online payments with invoices, messages to your customers, and training for your staff.",
    heroVariant: "centered",
    accent: "purple",
    icon: Layers,
    primaryCta: requestPackage("Medium Business"),
    secondaryCta: consult,
    sections: [
      {
        type: "stats",
        title: "What's inside",
        items: [
          { value: "5", label: "Business email accounts" },
          { value: "90", label: "Days of help after launch" },
          { value: "2hr", label: "Staff training session" },
        ],
      },
      {
        type: "bento",
        title: "Everything in Medium Business",
        items: [
          { icon: "globe", title: "Full website", body: "Several pages that work well on phone and computer." },
          { icon: "mail", title: "Business email", body: "Up to five email accounts with your business name." },
          { icon: "credit", title: "Payments and invoices", body: "Take payments online and send neat bills." },
          { icon: "message", title: "Customer messages", body: "Email and WhatsApp messages to many customers at once." },
        ],
      },
      {
        type: "comparison",
        title: "Small Business vs Medium Business",
        before: ["One-page website", "1 email account", "The basics only", "Learn on your own"],
        after: ["Full website with several pages", "Up to 5 email accounts", "Online payments and invoices", "Live training for your staff"],
      },
    ],
    related: [
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "enterprise", label: "Enterprise package", category: "pricing" },
      { slug: "micro-businesses", label: "Prices for shops & stores", category: "pricing" },
    ],
  },
  enterprise: {
    slug: "enterprise",
    category: "pricing",
    title: "Enterprise package",
    eyebrow: "Priced for you",
    tagline: "A setup built around your business, with one person looking after you",
    lead:
      "Enterprise is for bigger businesses with many staff, several branches or special needs. We talk first, understand how you work, then give you a clear price.",
    heroVariant: "immersive",
    accent: "amber",
    icon: Building2,
    primaryCta: requestPackage("Enterprise"),
    secondaryCta: consult,
    sections: [
      {
        type: "split",
        title: "Built around how you work",
        body: "We start with a meeting to understand your teams, the tools you use, and when you want things ready. Nothing is one-size-fits-all.",
        panelTitle: "Often added for Enterprise",
        panelItems: [
          "Mobile apps and connecting your tools",
          "Marketing and messages that send on their own",
          "One person from our team who looks after you",
          "Safety checks and staff training",
        ],
      },
      {
        type: "timeline",
        title: "How it works",
        orientation: "vertical",
        steps: [
          { title: "We listen", body: "We meet your team, see your tools and agree what success looks like." },
          { title: "We send a plan", body: "A clear plan in stages, with prices and timelines." },
          { title: "We deliver", body: "We build it step by step and check in with you along the way." },
        ],
      },
    ],
    related: [
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "smes", label: "Prices for growing businesses", category: "pricing" },
      { slug: "integrations", label: "Connect your tools", category: "product" },
    ],
  },
  "company-creators": {
    slug: "company-creators",
    category: "pricing",
    title: "Prices for new businesses",
    eyebrow: "Just registered your business?",
    tagline: "Everything you need online to open for business",
    lead:
      "If you've just registered your business, we set up your web address, website, email and payments together, so you look ready from the first week.",
    heroVariant: "split",
    accent: "emerald",
    icon: Sparkles,
    primaryCta: requestPackage("Medium Business"),
    secondaryCta: compare,
    sections: [
      {
        type: "checklist",
        title: "Your first-week checklist",
        columns: 1,
        items: [
          "Web address that matches your registered business name",
          "A website page with your business details",
          "hello@ email with your business name",
          "A payment link for your first invoices",
          "A Cedarce account to request more help later",
        ],
      },
      {
        type: "pain-outcome",
        pain: "Banks, partners and customers ask for your website and business email, and you don't have them yet.",
        outcome: "You have the same basics bigger companies have, from day one.",
        bullets: ["Ready date agreed before we start", "Medium Business suits most growing businesses", "Enterprise for businesses with several branches"],
      },
    ],
    related: [
      { slug: "business-launch-setup", label: "New business setup", category: "solution" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
    ],
  },
  "self-employed": {
    slug: "self-employed",
    category: "pricing",
    title: "Prices for small businesses",
    eyebrow: "Small businesses · starter package",
    tagline: "Look professional while keeping costs low",
    lead:
      "For small businesses we focus on what builds trust: one strong website page, your web address, a business email, and the tools customers expect, without paying for extras you don't need.",
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
          { icon: "globe", title: "A page about you", body: "One page that explains what you do and how to reach you." },
          { icon: "mail", title: "Business email", body: "Stop sending quotes from a personal email address." },
          { icon: "credit", title: "Ways to pay", body: "Collect deposits easily when you need payments." },
        ],
      },
    ],
    related: [
      { slug: "self-employed", label: "Small businesses", category: "solution" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "web-presence", label: "Website prices", category: "pricing" },
    ],
  },
  "micro-businesses": {
    slug: "micro-businesses",
    category: "pricing",
    title: "Prices for shops & stores",
    eyebrow: "Shops & stores",
    tagline: "Keep track of your sales and stock",
    lead:
      "For shops we focus on recording sales and stock, plus the basics: website, staff email and invoices. Most shops fit the Medium Business package. We confirm what you need on a short call.",
    heroVariant: "centered",
    accent: "rose",
    icon: Users,
    primaryCta: requestPackage("Medium Business"),
    secondaryCta: compare,
    sections: [
      {
        type: "comparison",
        title: "Before Cedarce vs after",
        before: ["Sales only in notebooks or chats", "Stock counted late or never", "Hard to see what sold this week"],
        after: ["Sales records you can check any time", "A stock list you can update", "Clear totals, even on busy days"],
      },
      {
        type: "stats",
        title: "What we set up for shops",
        items: [
          { value: "Sales", label: "What sold and when" },
          { value: "Stock", label: "What is still on the shelf" },
          { value: "Team", label: "Everyone sees the same records" },
        ],
      },
    ],
    related: [
      { slug: "micro-businesses", label: "Shops & stores", category: "solution" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
      { slug: "payments-invoicing", label: "Payment prices", category: "pricing" },
    ],
  },
  smes: {
    slug: "smes",
    category: "pricing",
    title: "Prices for growing businesses",
    eyebrow: "Growing teams",
    tagline: "A setup that grows with your team and branches",
    lead:
      "Growing businesses usually start on Medium Business or Enterprise, depending on how many staff, branches and tools you have. We give you a price after a short chat.",
    heroVariant: "immersive",
    accent: "purple",
    icon: Building2,
    primaryCta: requestPackage("Enterprise"),
    secondaryCta: consult,
    sections: [
      {
        type: "split",
        title: "How we price growing businesses",
        body: "There's no fixed price on the website because it depends on your branches, tools and training. After a short chat, you get a clear written price.",
        panelTitle: "Things you can add",
        panelItems: ["Website for each branch", "Email for each department", "Linking to your accounting", "Staff training"],
        reverse: true,
      },
      {
        type: "timeline",
        title: "Step by step",
        orientation: "vertical",
        steps: [
          { title: "The basics", body: "Website, email and payments." },
          { title: "Daily work", body: "Invoices, customer messages and connecting your tools." },
          { title: "Growth", body: "Apps and things that run on their own." },
        ],
      },
    ],
    related: [
      { slug: "smes", label: "Growing businesses", category: "solution" },
      { slug: "enterprise", label: "Enterprise package", category: "pricing" },
      { slug: "apps-and-operations", label: "Apps & tools prices", category: "pricing" },
    ],
  },
  "compare-plans": {
    slug: "compare-plans",
    category: "pricing",
    title: "Compare packages",
    eyebrow: "Choose your package",
    tagline: "Small Business, Medium Business and Enterprise side by side",
    lead:
      "We confirm every package with you before we start. Use this page to see which one fits your business today, then request it or talk to us if you're not sure.",
    heroVariant: "minimal",
    accent: "cyan",
    icon: Layers,
    primaryCta: consult,
    secondaryCta: { href: "/pricing", label: "Back to pricing" },
    sections: [
      {
        type: "comparison",
        title: "The packages at a glance",
        before: [
          "Small Business: one-page website, your web address, 1 email account, 30 days of help",
          "Best for: people running a business on their own",
        ],
        after: [
          "Medium Business: full website, up to 5 email accounts, payments and invoices, customer messages, staff training, 90 days of help",
          "Enterprise: built around your business, connected tools, one person looking after you, price agreed with you",
        ],
      },
      {
        type: "checklist",
        title: "Not sure? Start here",
        columns: 1,
        items: [
          "Need to look professional quickly, on a small budget → Small Business",
          "A small team doing too much by hand → Medium Business",
          "Several branches or many tools to connect → Enterprise",
          "Still deciding → chat with us on WhatsApp",
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
    title: "Website prices",
    eyebrow: "Single service",
    tagline: "Websites, web addresses and keeping your site online",
    lead:
      "The price depends on how many pages you need and whether your words and pictures are ready. Most websites fit inside the Small Business or Medium Business package. We also quote for moving an old website or a special build.",
    heroVariant: "split",
    accent: "purple",
    icon: Globe,
    primaryCta: consult,
    secondaryCta: requestPackage("Small Business"),
    sections: [
      {
        type: "bento",
        title: "What changes the price",
        items: [
          { icon: "globe", title: "Number of pages", body: "One page, or a full website with a catalogue or blog." },
          { icon: "smartphone", title: "Your customers", body: "Pages designed for how your customers use their phones." },
          { icon: "layers", title: "Hosting plan", body: "How many visitors you expect and how much you need to store." },
        ],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Websites", category: "product" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "domain-hosting", label: "Web address & hosting", category: "product" },
    ],
  },
  "payments-invoicing": {
    slug: "payments-invoicing",
    category: "pricing",
    title: "Payment & invoice prices",
    eyebrow: "Single service",
    tagline: "Online payments, invoices and receipts with your logo",
    lead:
      "We connect payment services your customers already use and design invoices with your brand. The Medium Business package includes automatic invoices. We also quote for special setups.",
    heroVariant: "centered",
    accent: "emerald",
    icon: CreditCard,
    primaryCta: consult,
    secondaryCta: requestPackage("Medium Business"),
    sections: [
      {
        type: "pain-outcome",
        pain: "Hand-written invoices and screenshot receipts make you look informal and slow down payment.",
        outcome: "Customers pay from a link and get a receipt with your logo straight away.",
        bullets: ["Payment setup included in packages", "Payment reminders in Medium Business and above", "Special setups in Enterprise"],
      },
    ],
    related: [
      { slug: "payments-integration", label: "Online payments", category: "product" },
      { slug: "invoicing-receipts", label: "Invoices & receipts", category: "product" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
    ],
  },
  "business-identity": {
    slug: "business-identity",
    category: "pricing",
    title: "Business email prices",
    eyebrow: "Single service",
    tagline: "Email accounts with your business name",
    lead:
      "We create your email accounts, connect them to your web address and set them up so your emails don't land in spam. Small Business includes one account; Medium Business includes up to five.",
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
        items: ["Setup so your emails stay out of spam", "Creating your email accounts", "Help setting it up on phone and computer", "A short guide for your team"],
      },
    ],
    related: [
      { slug: "business-email", label: "Business email", category: "product" },
      { slug: "starter", label: "Small Business package", category: "pricing" },
      { slug: "self-employed", label: "Prices for small businesses", category: "pricing" },
    ],
  },
  "customer-reach": {
    slug: "customer-reach",
    category: "pricing",
    title: "Customer message prices",
    eyebrow: "Single service",
    tagline: "Messages to many customers by email and WhatsApp",
    lead:
      "The price depends on how many customers you message, which apps you use, and how many message designs you need. The Medium Business package includes the setup. Regular sending can be priced monthly or per message.",
    heroVariant: "split",
    accent: "rose",
    icon: Megaphone,
    primaryCta: consult,
    secondaryCta: requestPackage("Medium Business"),
    sections: [
      {
        type: "bento",
        title: "What we set up",
        items: [
          { icon: "message", title: "Ready-made messages", body: "For new products, reminders and \"we miss you\" offers." },
          { icon: "users", title: "Clean contact list", body: "Only people who agreed to hear from you, and an easy way to stop." },
          { icon: "share", title: "Clear next step", body: "Every message links to your website or a payment page." },
        ],
      },
    ],
    related: [
      { slug: "bulk-messaging", label: "Bulk messages", category: "product" },
      { slug: "marketing-setup", label: "Social media & Google", category: "product" },
      { slug: "business", label: "Medium Business package", category: "pricing" },
    ],
  },
  "apps-and-operations": {
    slug: "apps-and-operations",
    category: "pricing",
    title: "Apps, tools & training prices",
    eyebrow: "Single service",
    tagline: "Mobile apps, connecting your tools and training your team",
    lead:
      "We price this after a chat, because every business is different: building an app, linking your accounting or customer records, and hours of training. Bigger setups usually fit the Enterprise package.",
    heroVariant: "immersive",
    accent: "amber",
    icon: Smartphone,
    primaryCta: requestPackage("Enterprise"),
    secondaryCta: consult,
    sections: [
      {
        type: "timeline",
        title: "How it works",
        orientation: "vertical",
        steps: [
          { title: "Map it out", body: "Which of your tools need to share information." },
          { title: "Build or connect", body: "We build the app or link your tools together." },
          { title: "Train and hand over", body: "Live lessons plus simple guides for your team." },
        ],
      },
    ],
    related: [
      { slug: "integrations", label: "Connect your tools", category: "product" },
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
