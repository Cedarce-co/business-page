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

const CTA_QUOTE = { href: "/contact", label: "Talk to us" } as const;
const CTA_ACCOUNT = { href: "/pricing", label: "See prices" } as const;

export const SERVICE_PAGE_DETAILS: Record<string, ServicePageDetail> = {
  "web-presence": {
    slug: "web-presence",
    heroIcon: Globe,
    tagline: "Be found, be trusted, and get more customers online",
    lead:
      "Your website is the front door of your business. We build a phone-friendly website with your logo and colours, get your own web address, and keep the site online and safe, so visitors see a real business, not just a social media page.",
    outcomes: [
      "People find you on Google and know exactly how to reach you",
      "Customers trust you because your business looks professional",
      "No more “DM for price”. Customers have a place to see your offer and act",
    ],
    included: [
      "A chat to understand your business and the pages you need",
      "Design and build: pages that work on phones, with contact buttons",
      "Your web address, hosting and the padlock that shows your site is safe",
      "Launch, hand-over and simple tips after your site goes live",
    ],
    forYou: [
      "New businesses going online for the first time",
      "Shops and services that have outgrown Instagram and WhatsApp alone",
      "Businesses that need a proper website before meeting partners or investors",
    ],
    steps: [
      {
        title: "1. A short chat",
        body: "We talk about what you sell, who your customers are, and what you want the website to do.",
      },
      {
        title: "2. We build it",
        body: "We create your pages with your logo, and add clear buttons: call, chat, book or buy.",
      },
      {
        title: "3. Your site goes live",
        body: "We connect your web address, make the site secure, and show you how to manage it.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["business-identity", "customer-reach", "payments-invoicing"],
  },
  "payments-invoicing": {
    slug: "payments-invoicing",
    heroIcon: CreditCard,
    tagline: "Get paid faster, with less back-and-forth",
    lead:
      "We set up card and bank transfer payments that suit your customers, plus invoices and receipts with your logo, so every sale looks professional and is easy to keep track of.",
    outcomes: [
      "Customers pay on your website or from a link, without you chasing them",
      "Invoices and receipts that carry your business name and logo",
      "Fewer “have you paid?” messages, because you can see who has paid",
    ],
    included: [
      "Setting up a payment service such as Paystack or Flutterwave",
      "Pay buttons and payment links for your website and offers",
      "Invoice and receipt designs with your business details",
      "A lesson for your team on taking payments and checking them",
    ],
    forYou: [
      "Shops, consultants and agencies that send bills often",
      "Businesses moving from cash only to online payments",
      "Teams that want one simple way to go from price to payment",
    ],
    steps: [
      {
        title: "1. Show us how you sell",
        body: "We look at how you give prices, send bills and follow up today, and what needs to change.",
      },
      {
        title: "2. We set it up",
        body: "We connect the payment service, design your invoices and create payment links.",
      },
      {
        title: "3. We train your team",
        body: "Your team learns how to send invoices, check payments and sort out problems.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["web-presence", "business-identity", "apps-and-operations"],
  },
  "business-identity": {
    slug: "business-identity",
    heroIcon: Mail,
    tagline: "Look like a real business in every email",
    lead:
      "An email with your business name builds trust before you say a word. We create your email accounts, add a neat signature, and set things up so your emails don't land in spam.",
    outcomes: [
      "Replace personal Gmail or Yahoo with an email customers trust",
      "Your emails reach the inbox, not the spam folder",
      "The same look on your emails, website and receipts",
    ],
    included: [
      "Email accounts with your business name (number depends on your package)",
      "An email signature with your logo, and tips for writing to customers",
      "Setup that helps other email services trust your emails",
      "Matching your emails to your website and brand",
    ],
    forYou: [
      "Owners tired of customers asking “is this really your company?”",
      "Growing teams that need sales@ or support@ emails",
      "Anyone with a new website who also needs a proper email",
    ],
    steps: [
      {
        title: "1. List what you need",
        body: "We list the email addresses you need now, and the ones you'll need soon.",
      },
      {
        title: "2. Set up and test",
        body: "We create your accounts and check that emails send and arrive properly.",
      },
      {
        title: "3. Match your brand",
        body: "We make your signature match your website and other materials.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["web-presence", "payments-invoicing", "customer-reach"],
  },
  "customer-reach": {
    slug: "customer-reach",
    heroIcon: Megaphone,
    tagline: "Stay in touch with your customers, without typing every message",
    lead:
      "Instead of one-off posts, send planned messages to your customers by email and WhatsApp: new products, reminders, offers and seasonal sales, each with a link to your website or payment page.",
    outcomes: [
      "Customers remember you, without you copying the same message every day",
      "Announcements that bring people to buy or book",
      "See who opened or replied, so the next message works better",
    ],
    included: [
      "Setting up email and WhatsApp messaging for your customers",
      "Ready-made messages for offers, reminders and follow-ups",
      "Linking messages to your website and payment pages",
      "Training so your team can send messages the right way",
    ],
    forYou: [
      "Shops with regular customers and seasonal stock",
      "Service businesses that follow up with customers over weeks",
      "Businesses moving from random DMs to planned messages",
    ],
    steps: [
      {
        title: "1. Who and what",
        body: "We decide who you're talking to, what you're offering, and how a visitor becomes a customer.",
      },
      {
        title: "2. Write the messages",
        body: "We write your first messages and link them to your pages and payment links.",
      },
      {
        title: "3. Send and improve",
        body: "We send them out, look at what worked, and adjust with you.",
      },
    ],
    primaryCta: CTA_QUOTE,
    secondaryCta: CTA_ACCOUNT,
    relatedSlugs: ["web-presence", "payments-invoicing", "apps-and-operations"],
  },
  "apps-and-operations": {
    slug: "apps-and-operations",
    heroIcon: Smartphone,
    tagline: "Apps, connected tools and a trained team",
    lead:
      "When a website isn't enough, we build mobile apps and office tools, connect the tools you already use, and train your staff so everyone actually uses them.",
    outcomes: [
      "Let customers order, book or collect rewards from their phones",
      "Your tools share information, so it stops living in chat screenshots",
      "Staff know how to use everything we set up",
    ],
    included: [
      "A plan, in stages, for your app or connected tools",
      "Building the app or tools around how you work",
      "Linking it to your payments, email and messages",
      "Staff training and simple written guides",
    ],
    forYou: [
      "Growing businesses that have outgrown spreadsheets and chats",
      "Owners who want an app alongside their website",
      "Teams bringing new staff onto the same tools",
    ],
    steps: [
      {
        title: "1. Agree what “done” means",
        body: "We agree what your customers and staff should be able to do in the first version.",
      },
      {
        title: "2. Build and connect",
        body: "We build it in stages and show you progress along the way.",
      },
      {
        title: "3. Train and support",
        body: "We train your staff, hand over simple guides and stay available for help.",
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
