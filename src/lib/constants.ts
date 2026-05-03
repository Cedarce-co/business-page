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
    name: "Web presence & hosting",
    desc: "Websites, domains, SSL, and managed hosting so customers find you and trust you fast.",
    price: "Request a quote",
    badge: "Most Popular",
  },
  {
    id: "payments-invoicing",
    icon: "CreditCard",
    name: "Payments & invoicing",
    desc: "Card and bank checkout plus branded invoices and receipts that match your brand.",
    price: "Request a quote",
    badge: null,
  },
  {
    id: "business-identity",
    icon: "Mail",
    name: "Business email & identity",
    desc: "Professional inboxes on your domain: credible outbound email that lands reliably.",
    price: "Request a quote",
    badge: null,
  },
  {
    id: "customer-reach",
    icon: "Megaphone",
    name: "Customer reach & campaigns",
    desc: "Bulk messaging and structured marketing that drives people back to book or pay.",
    price: "Request a quote",
    badge: null,
  },
  {
    id: "apps-and-operations",
    icon: "Smartphone",
    name: "Apps, integrations & training",
    desc: "Mobile apps, tool integrations, and hands-on training so your team actually adopts the stack.",
    price: "Request a quote",
    badge: null,
  },
];

export const PACKAGES = [
  {
    name: "Starter",
    price: "",
    subtitle: "Go professional - entry digital stack",
    badge: null,
    featured: false,
    features: [
      "Landing page (Mobile responsive and optimized for SEO)",
      "Domain registration (major TLDs)",
      "1 business email inbox",
      "Payment gateway integration",
      "SSL certificate setup (Secure your website)",
      "30 days post-launch support",
    ],
    cta: "Request Starter",
    ctaStyle: "secondary" as const,
  },
  {
    name: "Business",
    price: "",
    subtitle: "From informal to professional - complete digital setup",
    badge: "Most Popular",
    featured: true,
    features: [
      "Full website (Mobile responsive and optimized for SEO)",
      "Domain registration + Hosting + SSL certificate setup",
      "5 business email inboxes",
      "Payment gateway + automated invoicing",
      "Bulk messaging setup (email + WhatsApp) - Automated customer engagement",
      "Staff training session (2 hours)",
      "90 days post-launch support",
    ],
    cta: "Request Business",
    ctaStyle: "primary" as const,
  },
  {
    name: "Enterprise",
    price: "",
    subtitle: "Custom scope, SLAs, and dedicated delivery - Tailored to your needs",
    badge: "Custom",
    featured: false,
    features: [
      "Everything in Business, tailored to your operations",
      "Mobile apps, integrations, and automation at scale - Scale your business with ease",
      "Marketing, ads, and lifecycle messaging",
      "Dedicated account lead & priority turnaround - Dedicated support for your business",
      "Security reviews, training, and handover - Ensure your business is secure and compliant",
      "Volume pricing - we scope together - Tailored to your needs",
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
  { value: 48, suffix: "hrs", label: "Typical time from kickoff to professional" },
  { value: 100, suffix: "%", label: "Clients who trust us with their setup" },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    icon: "Calendar",
    title: "Tell us where you are today",
    desc: "Book a free consultation. We map what your business needs to look and pay like the real deal.",
  },
  {
    step: 2,
    icon: "Zap",
    title: "We build your stack end to end",
    desc: "Website, payments, invoicing, business email, messaging: we handle the setup so you can focus on sales.",
  },
  {
    step: 3,
    icon: "Star",
    title: "Go live and get paid faster",
    desc: "Most clients are professional within 48 hours of kickoff. We stay with you for support as you grow.",
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
    a: "Yes. We're remote-first: we deliver the same professional setup wherever you operate.",
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
