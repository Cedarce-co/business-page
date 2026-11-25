export type Service = {
  id: string;
  icon: string;
  name: string;
  desc: string;
  price: string;
  badge: string | null;
};

/** Five pillars; each maps to a dedicated /services/[slug] page (conversion-focused copy there). */
export const SERVICES: Service[] = [
  {
    id: "web-presence",
    icon: "Globe",
    name: "Website & online home",
    desc: "A simple website, kept online and safe, so customers can find you and trust you.",
    price: "Request a quote",
    badge: "Recommended",
  },
  {
    id: "payments-invoicing",
    icon: "CreditCard",
    name: "Payments & invoices",
    desc: "Ways for customers to pay you online, plus clean bills and receipts with your brand.",
    price: "Request a quote",
    badge: null,
  },
  {
    id: "business-identity",
    icon: "Mail",
    name: "Business email",
    desc: "Email that uses your business name, so every message looks professional.",
    price: "Request a quote",
    badge: null,
  },
  {
    id: "customer-reach",
    icon: "Megaphone",
    name: "Customer messages & marketing",
    desc: "Reach many customers at once with email, WhatsApp, and clear follow-ups.",
    price: "Request a quote",
    badge: null,
  },
  {
    id: "apps-and-operations",
    icon: "Smartphone",
    name: "Apps, tools & training",
    desc: "Connect the tools you use and train your team so day-to-day work runs smoothly.",
    price: "Request a quote",
    badge: null,
  },
];

export const PACKAGES = [
  {
    name: "Small Business",
    slug: "starter",
    price: "",
    subtitle: "Get seen online with the basics small businesses need",
    badge: null,
    featured: false,
    features: [
      "Simple one-page website that works well on phones",
      "Your own web address (like yourbusiness.com)",
      "1 business email (like hello@yourbusiness.com)",
      "The padlock that shows your website is safe",
      "Help after your site goes live",
    ],
    cta: "Request Small Business",
    ctaStyle: "secondary" as const,
  },
  {
    name: "Medium Business",
    slug: "business",
    price: "",
    subtitle: "A fuller setup for growing small and medium businesses",
    badge: "Recommended",
    featured: true,
    features: [
      "A website with several pages that looks good on phone and computer",
      "Your own web address and the safety padlock",
      "Business email accounts (up to 5)",
      "Online payments and automatic invoices",
      "Your own dashboard to manage your business",
      "See how many people visit your website",
      "Help after your site goes live",
    ],
    cta: "Request Medium Business",
    ctaStyle: "primary" as const,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: "",
    subtitle: "Built around bigger businesses. Tell us what you need",
    badge: "Custom",
    featured: false,
    features: [
      "Everything in Medium Business, shaped around how you work",
      "Apps, connected tools, and tasks that run on their own",
      "Marketing and messages to your customers",
      "One person from our team who looks after you, with faster replies",
      "Staff training and safety checks",
      "Price agreed with you after we understand your needs",
    ],
    cta: "Request Enterprise",
    ctaStyle: "secondary" as const,
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    icon: "Calendar",
    title: "Tell us where you are today",
    desc: "Have a short chat with us. We listen to your business goals and note what you need online. No jargon.",
  },
  {
    step: 2,
    icon: "Zap",
    title: "We set everything up for you",
    desc: "Website, email, messaging, and any tools you need. We do the setup so you can focus on your work.",
  },
  {
    step: 3,
    icon: "Star",
    title: "Go live with confidence",
    desc: "We agree a ready date with you before we start, and we stay available to help as you grow.",
  },
];

export const FAQS = [
  {
    q: "Can I start with just one service?",
    a: "Yes. You can start with one service and add more as your business grows.",
  },
  {
    q: "How fast can my setup be completed?",
    a: "It depends on the services you pick. We agree a ready date with you on a short call, before any work starts.",
  },
  {
    q: "Do you work with businesses outside my city?",
    a: "Yes. We work online, so we can help you wherever you are, with the same quality.",
  },
  {
    q: "Do you provide training for my team?",
    a: "Yes. We train your team so everyone can use the new tools with confidence.",
  },
  {
    q: "Can you improve or move my current website?",
    a: "Yes. We can redesign your current website or move it over to us, with as little time offline as possible.",
  },
  {
    q: "Will you renew my web address and hosting for me?",
    a: "Yes. We can take care of renewals and safety updates, so your website never goes off.",
  },
  {
    q: "Do packages include support?",
    a: "Yes. Every package includes help after your site goes live. How long depends on the package.",
  },
  {
    q: "How do I pay?",
    a: "You can pay by bank transfer or with an online payment link once we agree your package.",
  },
];
