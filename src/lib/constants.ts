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
    desc: "A simple website and secure hosting so customers can find you and trust you.",
    price: "Request a quote",
    badge: "Most Popular",
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
      "Your own website address (domain name)",
      "1 business email (like hello@yourbusiness.com)",
      "Secured website safe for business",
      "Support after go-live",
    ],
    cta: "Request Small Business",
    ctaStyle: "secondary" as const,
  },
  {
    name: "Medium Business",
    slug: "business",
    price: "",
    subtitle: "A fuller setup for growing small and medium businesses",
    badge: "Most Popular",
    featured: true,
    features: [
      "Full multi-page website that looks good on phone and desktop",
      "Domain, and secured website safe for business",
      "Business email accounts (up to 3)",
      "Online payments and automatic invoices",
      "Admin dashboard for managing your business",
      "Basic website analytics and reporting",
      "Support after go-live",
    ],
    cta: "Request Medium Business",
    ctaStyle: "primary" as const,
  },
  {
    name: "Enterprise",
    slug: "enterprise",
    price: "",
    subtitle: "Custom build for larger teams. Tell us what you need",
    badge: "Custom",
    featured: false,
    features: [
      "Everything in Medium Business, shaped around how you work",
      "Apps, tool connections, and automation where it helps",
      "Marketing and customer messaging campaigns",
      "A dedicated contact person and faster response times",
      "Training, handover, and security checks",
      "Pricing agreed after we review your needs",
    ],
    cta: "Request Enterprise",
    ctaStyle: "secondary" as const,
  },
];

export const TESTIMONIALS = [
  {
    name: "Anuoluwapo",
    role: "Food Store Owner",
    stars: 5,
    quote:
      "They set up my entire shop in one week. Now my customers can pay online and receive automatic receipts. My business finally looks like a real company.",
  },
  {
    name: "Ayo.",
    role: "IT Consultant",
    stars: 5,
    quote:
      "I stopped managing everything on WhatsApp. I now have a proper website, business email, and payment system. Best investment for my business.",
  },
  {
    name: "Eddy",
    role: "Health and wellness shop owner",
    stars: 5,
    quote:
      "My business has grown significantly since we started working together. I now have a proper website, business email, and automated invoicing.",
  }
];

export const STATS = [
  { value: 48, suffix: "hrs", label: "Typical time from kickoff to a finished setup" },
  { value: 100, suffix: "%", label: "Clients who trust us with their setup" },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    icon: "Calendar",
    title: "Tell us where you are today",
    desc: "Book a free chat. We listen to your business goals and note what you need online. No jargon.",
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
    desc: "Most setups are ready within a few days of start. We stay available to support you as you grow.",
  },
];

export const FOOD_STORY_STEPS = [
  {
    step: 1,
    title: "Customer discovers the store",
    desc: "They search Google and land on your professional website. No more 'send your catalogue on WhatsApp.'",
  },
  {
    step: 2,
    title: "Customer browses and orders",
    desc: "Products are listed cleanly. Order is placed directly online. No back-and-forth messages.",
  },
  {
    step: 3,
    title: "Branded invoice sent automatically",
    desc: "A professional invoice with your logo arrives instantly in their inbox.",
  },
  {
    step: 4,
    title: "Customer pays online",
    desc: "Card, bank transfer, or mobile checkout. Payment confirmed in real time.",
  },
  {
    step: 5,
    title: "Branded receipt sent automatically",
    desc: "A beautiful receipt arrives immediately. Your brand feels world class.",
  },
  {
    step: 6,
    title: "Automated follow-up sent",
    desc: "Thank-you and feedback request is sent on WhatsApp automatically.",
  },
  {
    step: 7,
    title: "Restock alert sent to all customers",
    desc: "Email and WhatsApp blast notifies every customer when your item is back.",
  },
];

export const BLOG_POSTS = [
  {
    id: "go-professional-2025",
    tag: "Getting Started",
    title: "5 things every growing business needs to go professional in 2025",
    readTime: "6 min read",
    cover: "bg-g-brand",
    image: "blog-placeholder-1.svg",
  },
  {
    id: "online-payments-small-business",
    tag: "Payments",
    title: "How to accept online payments as a small business",
    readTime: "5 min read",
    cover: "bg-cliq-navy-800",
    image: "blog-placeholder-2.svg",
  },
  {
    id: "professional-email",
    tag: "Email & Identity",
    title: "Why your business needs a professional email (not Gmail or Yahoo)",
    readTime: "4 min read",
    cover: "bg-g-dark",
    image: "blog-placeholder-3.svg",
  },
];

export const FAQS = [
  {
    q: "Can I start with just one service?",
    a: "Yes. You can start with one service and add more as your business grows.",
  },
  {
    q: "How fast can my setup be completed?",
    a: "Most setups are live within 48 hours depending on your selected services.",
  },
  {
    q: "Do you work with businesses outside my city?",
    a: "Yes. We work with businesses online, so location is not a block. The same quality setup wherever you operate.",
  },
  {
    q: "Do you provide training for my team?",
    a: "Yes. We train your team so everyone can use the new system confidently.",
  },
  {
    q: "Can you migrate my existing website?",
    a: "Yes. We can redesign or migrate your current setup with minimal downtime.",
  },
  {
    q: "Do you handle domain and hosting renewals?",
    a: "Yes. We can fully manage renewals and security updates for you.",
  },
  {
    q: "Do packages include support?",
    a: "Yes. Every package includes support. Duration depends on the package level.",
  },
  {
    q: "How do I pay?",
    a: "You can pay via transfer or online payment link once your package is confirmed.",
  },
];
