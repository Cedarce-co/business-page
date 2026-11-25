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

const consult = { href: "/contact", label: "Talk to us" } as const;
const signup = { href: "/signup", label: "Create an account" } as const;

export const PRODUCT_PAGES: Record<string, MarketingPageConfig> = {
  "website-landing-pages": {
    slug: "website-landing-pages",
    category: "product",
    title: "Websites",
    eyebrow: "Get online",
    tagline: "A website that works well on phones and gets people to contact you",
    lead:
      "We build a clean website for your business. It shows what you sell, why people can trust you, and one clear next step: call you, chat on WhatsApp, pay, or ask for a price.",
    heroVariant: "split",
    accent: "purple",
    icon: Globe,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "stats",
        title: "Made for how your customers browse",
        items: [
          { value: "Phone", label: "Built for phones first" },
          { value: "Fast", label: "Opens quickly, even on slow data" },
          { value: "1", label: "Clear next step on every page" },
        ],
      },
      {
        type: "bento",
        title: "What makes our websites different",
        items: [
          { icon: "smartphone", title: "Easy on phones", body: "Buttons sit where your thumb reaches, so customers can act quickly." },
          { icon: "zap", title: "Easy to find", body: "Clear headings and simple pages help people find you on Google." },
          { icon: "layers", title: "Easy to grow", body: "Start with a few pages: home, services, questions and contact. Add more later." },
          { icon: "share", title: "Looks good when shared", body: "Your link shows a neat picture and title when you send it on WhatsApp or social media." },
        ],
      },
      {
        type: "timeline",
        title: "How we build it",
        orientation: "vertical",
        steps: [
          { title: "We listen", body: "We learn who your customers are, what you sell, and what you want them to do." },
          { title: "We design and write", body: "We put your logo, colours and simple words on each page." },
          { title: "We launch", body: "Your site goes live, and we show you how to make small changes yourself." },
        ],
      },
      {
        type: "checklist",
        title: "What you usually get",
        columns: 2,
        items: [
          "Home page and pages for your services",
          "Contact form so customers can reach you",
          "WhatsApp and call buttons",
          "Your logo and brand colours",
          "Basic setup so Google can find you",
          "A short lesson on how to make simple changes",
        ],
      },
    ],
    related: [
      { slug: "domain-hosting", label: "Web address & hosting", category: "product" },
      { slug: "marketing-setup", label: "Social media & Google", category: "product" },
      { slug: "business-launch-setup", label: "New business setup", category: "solution" },
    ],
  },
  "domain-hosting": {
    slug: "domain-hosting",
    category: "product",
    title: "Web address & hosting",
    eyebrow: "Get online",
    tagline: "Your own web address, kept safe and always online",
    lead:
      "We get your web address (like yourbusiness.com), put your website online, and add the padlock that tells visitors your site is safe. We also remind you before anything needs renewing.",
    heroVariant: "immersive",
    accent: "cyan",
    icon: Server,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "Never lose your web address",
        body: "Many businesses lose their web address because someone bought it on a personal account and left. We register it in your business name and keep the details safe.",
        panelTitle: "We take care of",
        panelItems: [
          "Buying your web address and reminding you before it expires",
          "Connecting your web address to your website and email",
          "The padlock (secure connection) on your website",
          "Keeping your website online",
        ],
      },
      {
        type: "comparison",
        title: "Doing it alone vs with us",
        before: [
          "Website stops working and nobody knows why",
          "Browser warns customers your site is \"not secure\"",
          "Email and website stop working after a change",
          "No copy saved if something breaks",
        ],
        after: [
          "Someone is watching and knows who to call",
          "Padlock shows on every page",
          "Everything written down in one place",
          "A backup plan before your site goes live",
        ],
      },
      {
        type: "timeline",
        title: "How it works",
        orientation: "vertical",
        steps: [
          { title: "Pick your name", body: "We help you choose a .com.ng or .com address and buy it in your business name." },
          { title: "Connect and secure", body: "We connect it to your website and add the padlock." },
          { title: "Hand over", body: "You get a simple note: what you own, when it renews, and who to call." },
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
    eyebrow: "Get online",
    tagline: "Email with your business name, not a personal Gmail",
    lead:
      "An email like hello@yourbusiness.com tells people you are a real business before they read a word. We create your email accounts, add a neat signature, and set things up so your emails don't land in spam.",
    heroVariant: "minimal",
    accent: "emerald",
    icon: Mail,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "bento",
        title: "What you get",
        items: [
          { icon: "mail", title: "Emails for each job", body: "hello@, sales@, support@. Works for a team of one or twenty." },
          { icon: "shield", title: "Stays out of spam", body: "We set up your email so other email services trust it." },
          { icon: "layers", title: "Neat signature", body: "Your name, logo and phone number at the bottom of every email." },
          { icon: "users", title: "Messages reach the right person", body: "Forward emails to the right staff without sharing personal numbers." },
        ],
      },
      {
        type: "checklist",
        title: "Included in setup",
        items: [
          "Email accounts with your business name",
          "Help setting it up on your phone and computer",
          "Email signature with your logo",
          "Connected to your web address",
          "Simple tips for writing to customers",
        ],
      },
    ],
    related: [
      { slug: "domain-hosting", label: "Web address & hosting", category: "product" },
      { slug: "self-employed", label: "Small businesses", category: "solution" },
    ],
  },
  "payments-integration": {
    slug: "payments-integration",
    category: "product",
    title: "Online payments",
    eyebrow: "Get paid",
    tagline: "Let customers pay by card or bank transfer",
    lead:
      "We connect your business to trusted payment services like Paystack or Flutterwave. Customers can pay on your website or from a payment link you send on WhatsApp, and you don't have to confirm every transfer by hand.",
    heroVariant: "centered",
    accent: "teal",
    icon: CreditCard,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "stats",
        title: "Make it easy to pay you",
        items: [
          { value: "Any time", label: "Customers can pay, day or night" },
          { value: "Naira", label: "Card, transfer and local options" },
          { value: "Auto", label: "Receipt sent when they pay" },
        ],
      },
      {
        type: "split",
        title: "One setup, many ways to get paid",
        body: "The same payment setup works for a pay button on your website, a link you send on WhatsApp, and part-payments or deposits.",
        panelTitle: "Ways customers can pay",
        panelItems: ["Pay button on your website", "Payment links", "Pay button on your invoices", "You get a message when someone pays"],
        reverse: true,
      },
      {
        type: "timeline",
        title: "How it works",
        orientation: "vertical",
        steps: [
          { title: "Open your account", body: "We help you register with the payment service and verify your business." },
          { title: "Test it", body: "We try practice payments first, so no real money is at risk." },
          { title: "Start taking payments", body: "We switch it on and show your team how it works." },
        ],
      },
    ],
    related: [
      { slug: "invoicing-receipts", label: "Invoices & receipts", category: "product" },
      { slug: "associations", label: "Associations & groups", category: "solution" },
    ],
  },
  "invoicing-receipts": {
    slug: "invoicing-receipts",
    category: "product",
    title: "Invoices & receipts",
    eyebrow: "Get paid",
    tagline: "Neat bills with your logo that help you get paid faster",
    lead:
      "Stop sending screenshots of Word documents. We set up invoices and receipts with your logo and a pay button, so every bill looks official and you can see who has paid.",
    heroVariant: "split",
    accent: "amber",
    icon: Receipt,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "comparison",
        title: "Before and after",
        before: ["Bills typed by hand with wrong totals", "No easy way to pay from the bill", "Customers \"forget\" until you chase them", "Receipts sent days later"],
        after: ["Numbered invoices that add up correctly", "A pay button on every invoice", "Receipt sent the moment they pay", "A clear record of every payment"],
      },
      {
        type: "bento",
        title: "How it helps",
        items: [
          { icon: "receipt", title: "Ready-made invoices", body: "Your logo, prices, tax and bank details, the same every time." },
          { icon: "credit", title: "Know who has paid", body: "See which bills are sent, opened or paid, without a notebook." },
          { icon: "mail", title: "Easy to send", body: "Send by email or share a link your customer can forward." },
          { icon: "zap", title: "Polite reminders", body: "A gentle reminder goes out before the due date, so you don't have to chase." },
        ],
      },
      {
        type: "checklist",
        title: "We set up",
        columns: 2,
        items: ["Invoice design with your logo", "Items, prices and tax", "Pay button on invoices", "Receipts sent automatically", "Records you can give your accountant", "Who on your team can send bills"],
      },
    ],
    related: [
      { slug: "payments-integration", label: "Online payments", category: "product" },
      { slug: "brand-and-automation", label: "Automatic invoices & reminders", category: "solution" },
    ],
  },
  "bulk-messaging": {
    slug: "bulk-messaging",
    category: "product",
    title: "Bulk messages",
    eyebrow: "Grow your sales",
    tagline: "Send one message to many customers by email, WhatsApp or SMS",
    lead:
      "Tell all your customers about new stock, offers, events or payment reminders at once. No more copying and pasting the same message one by one.",
    heroVariant: "immersive",
    accent: "rose",
    icon: MessageSquare,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "The right message to the right people",
        body: "We help you put customers into groups (for example new buyers, regular buyers, or people who owe) and write simple messages that get replies, orders and payments.",
        panelTitle: "Ways to reach them",
        panelItems: ["Email newsletters", "WhatsApp broadcasts", "SMS for urgent updates", "Follow-up messages that send on their own"],
      },
      {
        type: "timeline",
        title: "How it works",
        orientation: "vertical",
        steps: [
          { title: "Tidy your contacts", body: "We gather your customer list and make sure people agreed to hear from you." },
          { title: "Ready-made messages", body: "We write messages for offers, reminders and thank-yous that you can reuse." },
          { title: "See what works", body: "Check who opened, clicked or replied, and improve the next message." },
        ],
      },
    ],
    related: [
      { slug: "marketing-setup", label: "Social media & Google", category: "product" },
      { slug: "micro-businesses", label: "Shops & stores", category: "solution" },
    ],
  },
  "marketing-setup": {
    slug: "marketing-setup",
    category: "product",
    title: "Social media & Google",
    eyebrow: "Grow your sales",
    tagline: "Be found on Instagram, TikTok and Google Maps",
    lead:
      "We set up your social media pages and Google listing so people who find you there land on your website or WhatsApp, and you can see which posts bring customers.",
    heroVariant: "centered",
    accent: "purple",
    icon: Share2,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "bento",
        title: "Make every page lead back to you",
        items: [
          { icon: "share", title: "Social media pages", body: "A clear bio, link and highlights that send people to your site, not endless DMs." },
          { icon: "globe", title: "Google Maps listing", body: "Your shop on the map with opening hours, photos and customer reviews." },
          { icon: "zap", title: "See what works", body: "Simple tracking so you know which posts and ads bring customers." },
          { icon: "layers", title: "Same message everywhere", body: "What your ad promises matches what people see when they click." },
        ],
      },
      {
        type: "stats",
        title: "What we set up first",
        items: [
          { value: "Bio", label: "Complete social media profiles" },
          { value: "Maps", label: "Your business on Google Maps" },
          { value: "1", label: "Main thing you want people to do" },
        ],
      },
      {
        type: "checklist",
        title: "Setup checklist",
        columns: 2,
        items: ["Instagram and TikTok bio and link", "Google Business Profile (Maps listing)", "Tracking on your website", "What counts as a new customer", "A simple monthly review"],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Websites", category: "product" },
      { slug: "bulk-messaging", label: "Bulk messages", category: "product" },
    ],
  },
  "staff-training": {
    slug: "staff-training",
    category: "product",
    title: "Staff training",
    eyebrow: "Grow your sales",
    tagline: "Hands-on lessons so your team actually uses the new tools",
    lead:
      "New tools don't help if only one person knows how to use them. We teach your staff, using your own accounts, and leave simple guides they can keep.",
    heroVariant: "split",
    accent: "emerald",
    icon: GraduationCap,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "Training that sticks",
        body: "We practise real tasks with your team: taking a payment, sending an invoice, updating the website. No boring slides.",
        panelTitle: "What we teach",
        panelItems: ["Updating your website", "Taking payments and sending invoices", "Using business email", "Sending messages to customers"],
        reverse: true,
      },
      {
        type: "timeline",
        title: "How it works",
        orientation: "vertical",
        steps: [
          { title: "Understand your team", body: "Who does what today, and where things get stuck." },
          { title: "Teach", body: "Live lessons plus short videos for new staff." },
          { title: "Support", body: "We stay available to answer questions in the first month after launch." },
        ],
      },
      {
        type: "checklist",
        title: "What your team gets",
        items: ["Lessons planned for each person's job", "Short how-to videos", "Simple printed or digital guides", "Answers to common questions in one place"],
      },
    ],
    related: [
      { slug: "integrations", label: "Connect your tools", category: "product" },
      { slug: "smes", label: "Growing businesses", category: "solution" },
    ],
  },
  integrations: {
    slug: "integrations",
    category: "product",
    title: "Connect your tools",
    eyebrow: "Grow your sales",
    tagline: "Make the tools you already use share information",
    lead:
      "When a customer pays, fills a form or orders, the right people should know without anyone re-typing it. We connect your website, payments, messages, spreadsheets and accounting, so information stops living in chat screenshots.",
    heroVariant: "immersive",
    accent: "cyan",
    icon: Layers,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "bento",
        title: "Things we often connect",
        items: [
          { icon: "credit", title: "Payments to your records", body: "When an invoice is paid, your records update and you get a message." },
          { icon: "mail", title: "Website forms to your team", body: "New enquiries go straight to the right person." },
          { icon: "layers", title: "Spreadsheets and accounts", body: "Sales reports land in a spreadsheet for your accountant, no copying." },
          { icon: "smartphone", title: "App and website", body: "Customers use one login and see the same details everywhere." },
        ],
      },
      {
        type: "comparison",
        title: "Separate tools vs connected tools",
        before: ["Staff re-type payment confirmations", "The same customer saved twice", "Nobody knows when something fails"],
        after: ["Information moves on its own", "One record for each customer", "You get an alert if something goes wrong"],
      },
      {
        type: "timeline",
        title: "How it works",
        orientation: "vertical",
        steps: [
          { title: "Map it out", body: "We write down what should happen, and when." },
          { title: "Build and test", body: "We test everything first, so no real money is at risk." },
          { title: "Keep watch", body: "We check it keeps working, so you can rest easy." },
        ],
      },
    ],
    related: [
      { slug: "staff-training", label: "Staff training", category: "product" },
      { slug: "smes", label: "Growing businesses", category: "solution" },
    ],
  },
};

export const SOLUTION_PAGES: Record<string, MarketingPageConfig> = {
  "self-employed": {
    slug: "self-employed",
    category: "solution",
    title: "Small businesses",
    eyebrow: "Who we help",
    tagline: "Look professional online without hiring a tech person",
    lead:
      "You are the business. We give you a simple website, business email and the tools customers expect, so you stop looking smaller than the work you do.",
    heroVariant: "minimal",
    accent: "purple",
    icon: Smartphone,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "pain-outcome",
        pain: "People ask for your website and you only have an Instagram page. Your quotes come from a personal Gmail.",
        outcome: "A clear website, an email with your business name, and an easy way for people to reach you and pay you.",
        bullets: ["A simple page that shows your work", "Email with your business name", "WhatsApp and call buttons", "Help after your site goes live"],
      },
      {
        type: "timeline",
        title: "How we set you up",
        orientation: "vertical",
        steps: [
          { title: "First", body: "We plan your website and set up your web address and email." },
          { title: "Next", body: "We add any payment or invoice tools you need." },
          { title: "Then", body: "We hand everything over with a short guide so you can make updates." },
        ],
      },
      {
        type: "checklist",
        title: "What small businesses usually get",
        columns: 2,
        items: ["Website", "Web address & hosting", "Business email", "Online payments", "Invoices & receipts"],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Websites", category: "product" },
      { slug: "business-email", label: "Business email", category: "product" },
      { slug: "business-launch-setup", label: "New business setup", category: "solution" },
    ],
  },
  "micro-businesses": {
    slug: "micro-businesses",
    category: "solution",
    title: "Shops & stores",
    eyebrow: "Who we help",
    tagline: "Know what you sold and what is left on the shelf",
    lead:
      "We help shops, stores and market sellers keep track of sales and stock in one place. Your website, receipts and stock records work together, so you always know what sold today and what is running out.",
    heroVariant: "split",
    accent: "teal",
    icon: Users,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "pain-outcome",
        pain: "Sales are written in notebooks or chats, and you only find out an item is finished when a customer asks for it.",
        outcome: "Clear sales records and stock you can check any time, plus an online shop when you want one.",
        bullets: [
          "Record sales from the counter and online",
          "Stock list you can update and check",
          "Receipts that match what you sold",
          "A warning when stock is running low",
        ],
      },
      {
        type: "stats",
        title: "What shop owners notice first",
        items: [
          { value: "1", label: "Place to see all your sales" },
          { value: "Today", label: "See what is on the shelf right now" },
          { value: "Less", label: "Guessing what sold today" },
        ],
      },
      {
        type: "bento",
        title: "What we often set up for shops",
        items: [
          { icon: "globe", title: "Online shop", body: "A simple website or catalogue customers can browse and order from." },
          { icon: "credit", title: "Sales records", body: "Write down what sold, when, and for how much, without the notebook." },
          { icon: "layers", title: "Stock records", body: "Know how much of each item you have left." },
          { icon: "message", title: "Customer updates", body: "Tell buyers when items are back in stock or on sale." },
        ],
      },
    ],
    related: [
      { slug: "bulk-messaging", label: "Bulk messages", category: "product" },
      { slug: "invoicing-receipts", label: "Invoices & receipts", category: "product" },
      { slug: "brand-and-automation", label: "Automatic invoices & reminders", category: "solution" },
    ],
  },
  smes: {
    slug: "smes",
    category: "solution",
    title: "Growing businesses",
    eyebrow: "Who we help",
    tagline: "Tools that keep up as your team grows",
    lead:
      "As your team grows, things get scattered across phones, notebooks and different apps. We bring your website, email, payments and training together, so customers see one brand and staff stop typing the same details twice.",
    heroVariant: "immersive",
    accent: "cyan",
    icon: Building2,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "comparison",
        title: "Before vs with Cedarce",
        before: ["Staff use personal email for work", "Website not updated in years", "Customer requests scattered everywhere", "Reports done by hand"],
        after: ["Business email for everyone, with matching signatures", "A website that is easy to keep up to date", "One place to see customer requests", "Tools that share information on their own"],
      },
      {
        type: "timeline",
        title: "How we usually do it",
        orientation: "vertical",
        steps: [
          { title: "Look around", body: "We see how your business runs today and where customers get stuck." },
          { title: "Set the basics", body: "Website, email and payments, the things customers see." },
          { title: "Connect and train", body: "We link your tools together and train your staff." },
        ],
      },
      {
        type: "checklist",
        title: "Often includes",
        columns: 2,
        items: ["Connecting your tools", "Staff training", "Apps built for your business", "Setting up your office tools", "Asking for changes from your account"],
      },
    ],
    related: [
      { slug: "integrations", label: "Connect your tools", category: "product" },
      { slug: "staff-training", label: "Staff training", category: "product" },
    ],
  },
  associations: {
    slug: "associations",
    category: "solution",
    title: "Associations & groups",
    eyebrow: "Who we help",
    tagline: "Collect dues and donations, and keep members informed",
    lead:
      "Members need to pay dues, get receipts and hear about meetings on time. We set up payments, receipts, group messages and a trustworthy website for associations, churches, clubs and non-profits.",
    heroVariant: "centered",
    accent: "rose",
    icon: Heart,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "pain-outcome",
        pain: "Dues are paid into personal accounts, updates get lost in WhatsApp groups, and the treasurer has no record of who paid.",
        outcome: "A bill for each member, receipts sent automatically, clear messages to the right members, and a website sponsors can trust.",
        bullets: ["Reminders when dues are due", "Payment links for dues and donations", "Records the treasurer can download", "A website that builds trust with sponsors"],
      },
      {
        type: "bento",
        title: "Made for treasurers and secretaries",
        items: [
          { icon: "receipt", title: "Dues bills", body: "Yearly or termly bills with a clear reference for each member." },
          { icon: "credit", title: "Pay online", body: "Card or transfer, with a receipt straight away." },
          { icon: "message", title: "Member updates", body: "Meeting notices, event invites and thank-you messages." },
          { icon: "globe", title: "Public website", body: "A site partners and sponsors can check before they support you." },
        ],
      },
      {
        type: "quote",
        text: "Treasurers spend less time matching screenshots to names when every payment gives a numbered receipt automatically.",
        attribution: "How we set up associations",
      },
    ],
    related: [
      { slug: "payments-integration", label: "Online payments", category: "product" },
      { slug: "invoicing-receipts", label: "Invoices & receipts", category: "product" },
      { slug: "bulk-messaging", label: "Bulk messages", category: "product" },
    ],
  },
  "business-launch-setup": {
    slug: "business-launch-setup",
    category: "solution",
    title: "Starting a new business",
    eyebrow: "New businesses",
    tagline: "Website, web address, email and payments, ready for your first customers",
    lead:
      "A new business needs to look real from day one. We set up the basics together, so you can send customers a website link, an email from your business name and a way to pay you, all in the same week.",
    heroVariant: "split",
    accent: "emerald",
    icon: Rocket,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "stats",
        title: "What you get",
        items: [
          { value: "5", label: "Basics set up for you" },
          { value: "1", label: "Account to track your requests" },
          { value: "1", label: "Team that sets it all up" },
        ],
      },
      {
        type: "timeline",
        title: "How we set you up",
        orientation: "vertical",
        steps: [
          { title: "Your name online", body: "Web address, business email and a simple website." },
          { title: "Get paid", body: "Online payments and your first invoice design." },
          { title: "Your account", body: "Verify your business and send your first request in your Cedarce account." },
        ],
      },
      {
        type: "checklist",
        title: "This setup includes",
        columns: 2,
        items: ["Website", "Web address & hosting", "Business email", "Online payments", "Invoice design", "A start call and a hand-over call"],
      },
    ],
    related: [
      { slug: "website-landing-pages", label: "Websites", category: "product" },
      { slug: "self-employed", label: "Small businesses", category: "solution" },
    ],
  },
  "brand-and-automation": {
    slug: "brand-and-automation",
    category: "solution",
    title: "Automatic invoices & reminders",
    eyebrow: "New businesses",
    tagline: "Invoices, reminders and customer messages that send on their own",
    lead:
      "Once you're up and running, stop repeating the same work every day. We set up invoices, payment reminders and customer messages that go out on their own, while you focus on serving customers.",
    heroVariant: "immersive",
    accent: "amber",
    icon: Megaphone,
    primaryCta: consult,
    secondaryCta: signup,
    sections: [
      {
        type: "split",
        title: "Automatic, but still sounds like you",
        body: "Messages are written in your voice, not like a robot. They go out at the right moment: when a bill is due, when someone pays, or when a customer hasn't bought in a while.",
        panelTitle: "What sends on its own",
        panelItems: ["Invoice with a pay button", "Receipt when they pay", "Reminder 7 days before a bill is due", "A \"we miss you\" message every few months"],
      },
      {
        type: "comparison",
        title: "Doing it by hand vs automatic",
        before: ["You forget to chase payments until money is tight", "Receipts sent when you remember", "Offers only sent when sales are slow"],
        after: ["Reminders go out on time", "Receipts sent straight away with your logo", "A plan for when to message customers"],
      },
      {
        type: "bento",
        title: "What this includes",
        items: [
          { icon: "receipt", title: "Invoices", body: "Ready-made, numbered, and you can see who has paid." },
          { icon: "message", title: "Bulk messages", body: "WhatsApp and email messages that send on schedule." },
          { icon: "share", title: "Social media & Google", body: "Your pages and ads point customers to the right place." },
          { icon: "mail", title: "Business email", body: "Every message comes from your business name." },
        ],
      },
    ],
    related: [
      { slug: "invoicing-receipts", label: "Invoices & receipts", category: "product" },
      { slug: "bulk-messaging", label: "Bulk messages", category: "product" },
      { slug: "micro-businesses", label: "Shops & stores", category: "solution" },
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

export type MarketingCatalogEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

/** Navbar order. product catalog index at /product */
export const PRODUCT_CATALOG_ORDER = [
  "website-landing-pages",
  "domain-hosting",
  "business-email",
  "payments-integration",
  "invoicing-receipts",
  "bulk-messaging",
  "marketing-setup",
  "staff-training",
  "integrations",
] as const;

/** Navbar order. solutions catalog index at /solutions */
export const SOLUTION_CATALOG_ORDER = [
  "self-employed",
  "micro-businesses",
  "smes",
  "associations",
  "business-launch-setup",
  "brand-and-automation",
] as const;

export function getMarketingCatalogEntries(
  category: "product" | "solution"
): MarketingCatalogEntry[] {
  const order = category === "product" ? PRODUCT_CATALOG_ORDER : SOLUTION_CATALOG_ORDER;
  const map = category === "product" ? PRODUCT_PAGES : SOLUTION_PAGES;

  const ordered: MarketingCatalogEntry[] = [];
  for (const slug of order) {
    const page = map[slug];
    if (!page) continue;
    ordered.push({
      id: slug,
      title: page.title,
      description: page.lead,
      href: marketingPagePath(category, slug),
      icon: page.icon,
    });
  }

  const seen = new Set(ordered.map((entry) => entry.id));
  for (const [slug, page] of Object.entries(map)) {
    if (seen.has(slug)) continue;
    ordered.push({
      id: slug,
      title: page.title,
      description: page.lead,
      href: marketingPagePath(category, slug),
      icon: page.icon,
    });
  }

  return ordered;
}
