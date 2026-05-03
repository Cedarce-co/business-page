import type { LucideIcon } from "lucide-react";
import { CreditCard, Globe, Mail, Megaphone, Smartphone } from "lucide-react";

export type ServicePageDetail = {
  slug: string;
  heroIcon: LucideIcon;
  tagline: string;
  lead: string;
  outcomes: string[];
  included: string[];
  forYou: string[];
  steps: { title: string; body: string }[];
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  relatedSlugs: string[];
};

const CTA_QUOTE = { href: "/contact", label: "Book a free consult" } as const;
const CTA_ACCOUNT = { href: "/signup", label: "Create a free account" } as const;

export const SERVICE_PAGE_DETAILS: Record<string, ServicePageDetail> = {
  "web-presence": {
    slug: "web-presence",
    heroIcon: Globe,
    tagline: "Be found, trusted, and ready to sell online",
    lead:
      "Your website, domain, and hosting are the front door to your business. We design and launch a fast, mobile-first site with your brand, SSL, and managed hosting so visitors see a real company, not a social handle or empty page.",
    outcomes: [
      "Show up in search and ads with a clear offer and contact path",
      "Build trust with a professional look that matches your quality",
      "Stop losing leads to “DM for price”. Give people a place to act",
    ],
    included: [
      "Discovery: goals, audience, and must-have pages",
      "Design and build: responsive pages, contact and lead actions",
      "Domain, DNS, and hosting setup with SSL",
      "Launch checklist, handover, and post-launch tips",
    ],
    forYou: [
      "New businesses going pro for the first time",
      "Shops and services that outgrew social-only presence",
      "Teams that need a credible site before pitching or funding",
    ],
    steps: [
      {
        title: "1. Discovery call",
        body: "We align on your offer, audience, and what a “win” looks like in the first 30 days.",
      },
      {
        title: "2. Build & content",
        body: "We structure pages, add your brand, and wire clear calls to action (book, call, buy).",
      },
      {
        title: "3. Go live",
        body: "We connect your domain, secure the site, and hand over so you can grow with confidence.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["business-identity", "customer-reach", "payments-invoicing"],
  },
  "payments-invoicing": {
    slug: "payments-invoicing",
    heroIcon: CreditCard,
    tagline: "Get paid quickly with less back-and-forth",
    lead:
      "We connect you to card and bank checkout that fits how your customers pay in Nigeria, then layer branded invoices and receipts so every sale looks professional and is easy to reconcile.",
    outcomes: [
      "Close sales on your site or payment link without manual follow-up",
      "Send invoices and receipts that match your brand",
      "Reduce “have you paid?” messages with clear payment status",
    ],
    included: [
      "Payment gateway configuration (e.g. Paystack, Flutterwave) for your context",
      "Checkout or payment links aligned to your website or offers",
      "Invoice and receipt templates with your business details",
      "Walkthrough for your team on taking and reconciling payments",
    ],
    forYou: [
      "Retailers, consultants, and agencies invoicing clients regularly",
      "Businesses moving from cash-only or informal transfers",
      "Teams that need one consistent flow from quote to paid",
    ],
    steps: [
      {
        title: "1. Map your flows",
        body: "We capture how you quote, bill, and follow up today, and what must change.",
      },
      {
        title: "2. Configure & brand",
        body: "We set up gateways, invoice templates, and links so customers know exactly how to pay.",
      },
      {
        title: "3. Train & handover",
        body: "Your team learns how to issue invoices, track payments, and handle exceptions.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["web-presence", "business-identity", "apps-and-operations"],
  },
  "business-identity": {
    slug: "business-identity",
    heroIcon: Mail,
    tagline: "Look legitimate in every inbox",
    lead:
      "Branded email at your domain builds trust before you say a word. We configure inboxes, signatures, and basics like SPF/DKIM guidance so your mail lands reliably, plus guidance on a consistent voice across customer touchpoints.",
    outcomes: [
      "Replace personal Gmail/Yahoo with addresses customers recognize",
      "Reduce spam-folder issues with proper domain email setup",
      "Present one coherent brand from email to website to receipts",
    ],
    included: [
      "Mailbox setup on your domain (volume depends on package)",
      "Signature templates and sending best practices",
      "DNS guidance for email authentication where applicable",
      "Coordination with your web presence so branding matches end-to-end",
    ],
    forYou: [
      "Founders tired of clients doubting “is this really your company?”",
      "Growing teams adding sales and support addresses",
      "Anyone pairing a new site with credible outbound email",
    ],
    steps: [
      {
        title: "1. Identity audit",
        body: "We list the addresses you need now and what you’ll need in six months.",
      },
      {
        title: "2. Configure & test",
        body: "We set up inboxes, forwards if needed, and verify delivery paths.",
      },
      {
        title: "3. Brand alignment",
        body: "We align signatures and templates with your site and collateral.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["web-presence", "payments-invoicing", "customer-reach"],
  },
  "customer-reach": {
    slug: "customer-reach",
    heroIcon: Megaphone,
    tagline: "Reach the right people with repeatable campaigns",
    lead:
      "Bulk messaging and structured marketing help you turn one-off posts into a system: launches, reminders, re-engagement, and seasonal pushes across email and WhatsApp, with clear calls to action back to your site or payment flow.",
    outcomes: [
      "Stay top-of-mind without manually copying the same message daily",
      "Launch announcements that drive traffic to book or pay",
      "Measure what you send so you can improve the next campaign",
    ],
    included: [
      "Channel setup aligned to your audience (e.g. email, WhatsApp flows)",
      "Message frameworks for offers, reminders, and follow-ups",
      "Integration points with your site and CRM-style handoffs where applicable",
      "Training so your team can run campaigns safely and consistently",
    ],
    forYou: [
      "Shops with repeat buyers and seasonal inventory",
      "Service businesses nurturing leads over weeks",
      "Brands moving from ad-hoc DMs to structured outreach",
    ],
    steps: [
      {
        title: "1. Audience & goals",
        body: "We define segments, offers, and the journey from stranger to customer.",
      },
      {
        title: "2. Playbooks & assets",
        body: "We draft starter sequences and tie them to your pages and payment links.",
      },
      {
        title: "3. Launch & iterate",
        body: "We go live, review early results, and adjust messaging with you.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["web-presence", "payments-invoicing", "apps-and-operations"],
  },
  "apps-and-operations": {
    slug: "apps-and-operations",
    heroIcon: Smartphone,
    tagline: "Apps, integrations, and team readiness",
    lead:
      "When off-the-shelf pages aren’t enough, we scope mobile apps, internal tools, and integrations, and we train your staff so adoption sticks. Ideal for teams that need a dependable digital operating layer, not a one-off launch.",
    outcomes: [
      "Put ordering, booking, or loyalty in customers’ pockets",
      "Connect tools you already use so data stops living in chat screenshots",
      "Get your team productive with hands-on training on what we ship",
    ],
    included: [
      "Discovery and phased roadmap for app or integration work",
      "Build or configure mobile experiences aligned to your process",
      "Integration planning with payment, email, and messaging stacks",
      "Staff training sessions and documentation handover",
    ],
    forYou: [
      "SMEs scaling beyond spreadsheets and WhatsApp ops",
      "Founders piloting an app alongside their website",
      "Teams onboarding new hires onto the same systems",
    ],
    steps: [
      {
        title: "1. Scope & success metrics",
        body: "We agree what “done” means for users and admins in the first release.",
      },
      {
        title: "2. Build & integrate",
        body: "We implement in milestones with visible checkpoints.",
      },
      {
        title: "3. Train & support",
        body: "We train staff, hand over runbooks, and align support windows to your package.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["payments-invoicing", "customer-reach", "web-presence"],
  },
};

export function getServicePageDetail(slug: string): ServicePageDetail | undefined {
  return SERVICE_PAGE_DETAILS[slug];
}
