export type Service = {
  id: string;
  icon: string;
  name: string;
  desc: string;
  price: string;
  badge: string | null;
};

export const SERVICES: Service[] = [
  {
    id: "website",
    icon: "Globe",
    name: "Website & Landing Page",
    desc: "Professional, responsive, branded websites that convert visitors into customers.",
    price: "From ₦80,000",
    badge: "Most Popular",
  },
  {
    id: "app",
    icon: "Smartphone",
    name: "Mobile App Development",
    desc: "Simple product and order management apps built for your business operations.",
    price: "From ₦300,000",
    badge: null,
  },
  {
    id: "domain",
    icon: "Server",
    name: "Domain & Hosting",
    desc: "Your permanent digital address - registered, configured, SSL secured, managed.",
    price: "From ₦25,000",
    badge: null,
  },
  {
    id: "email",
    icon: "Mail",
    name: "Business Email",
    desc: "hello@yourbusiness.com — never send business email from a personal inbox again.",
    price: "From ₦25,000",
    badge: null,
  },
  {
    id: "payments",
    icon: "CreditCard",
    name: "Payments & Gateways",
    desc: "Accept cards, bank transfers, and mobile checkout. Money in your account automatically.",
    price: "From ₦40,000",
    badge: null,
  },
  {
    id: "invoicing",
    icon: "FileText",
    name: "Invoicing System",
    desc: "Branded, automated invoices and receipts sent the moment a transaction happens.",
    price: "From ₦30,000",
    badge: null,
  },
  {
    id: "messaging",
    icon: "MessageSquare",
    name: "Bulk Messaging",
    desc: "Reach every customer at once - WhatsApp, email, and SMS, automated.",
    price: "From ₦35,000",
    badge: null,
  },
  {
    id: "ads",
    icon: "TrendingUp",
    name: "Marketing & Ads",
    desc: "Get visible to the right customers on Instagram, TikTok, and Google.",
    price: "From ₦50,000",
    badge: null,
  },
  {
    id: "training",
    icon: "Users",
    name: "Staff Training",
    desc: "We train your team to use every system professionally. No one gets left behind.",
    price: "From ₦20,000",
    badge: null,
  },
];

export const PACKAGES = [
  {
    name: "Starter",
    price: "₦250,000",
    subtitle: "Go professional — entry digital stack",
    badge: null,
    featured: false,
    features: [
      "Landing page (1 page, mobile-first)",
      "Domain registration (major TLDs)",
      "1 business email inbox",
      "Payment gateway integration",
      "SSL certificate setup",
      "30 days post-launch support",
    ],
    cta: "Go Pro",
    ctaStyle: "secondary" as const,
  },
  {
    name: "Business",
    price: "₦750,000",
    subtitle: "From informal to professional — full service",
    badge: "Most Popular",
    featured: true,
    features: [
      "Full website (5-8 pages, mobile-first)",
      "Domain + hosting + SSL setup",
      "5 business email inboxes",
      "Payment gateway + automated invoicing",
      "Bulk messaging setup (email + WhatsApp)",
      "Staff training session (2 hours)",
      "90 days implementation support",
    ],
    cta: "Get started",
    ctaStyle: "primary" as const,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    subtitle: "Custom scope, SLAs, and dedicated delivery",
    badge: "Custom",
    featured: false,
    features: [
      "Everything in Business, tailored to your ops",
      "Mobile apps, integrations, and automation at scale",
      "Marketing, ads, and lifecycle messaging",
      "Dedicated account lead & priority turnaround",
      "Security reviews, training, and handover",
      "Volume pricing — we scope together",
    ],
    cta: "Talk to us",
    ctaStyle: "secondary" as const,
  },
];

export const TESTIMONIALS = [
  {
    name: "Amaka O.",
    role: "Food Store Owner",
    stars: 5,
    quote:
      "Cedarce set up my entire shop in one week. Now your customers can pay online and receive automatic receipts. Your business finally looks like a real company.",
  },
  {
    name: "Tunde A.",
    role: "Fashion Boutique",
    stars: 5,
    quote:
      "You stop managing everything on WhatsApp. You now have a proper website, business email, and payment system. Best investment for your business.",
  },
  {
    name: "Pastor Emeka",
    role: "Community organization",
    stars: 5,
    quote:
      "Cedarce built our website, set up online giving, and configured bulk messaging. Our congregation is now fully connected digitally.",
  },
  {
    name: "Ngozi C.",
    role: "Pharmacy Owner",
    stars: 5,
    quote:
      "Automated restock alerts increased your sales. Your customers love being notified when products return. Cedarce understands operations.",
  },
  {
    name: "Ola B.",
    role: "Startup Founder",
    stars: 5,
    quote:
      "You needed someone who understands both tech and business. Cedarce built everything and trained your whole team — end to end.",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Businesses Set Up" },
  { value: 9, suffix: "", label: "Services Under One Roof" },
  { value: 48, suffix: "hrs", label: "Average Setup Time" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    icon: "Calendar",
    title: "Book a Free Consultation",
    desc: "Tell us about your business. We listen and map what you need. 30 minutes. No pressure. No jargon.",
  },
  {
    step: 2,
    icon: "Zap",
    title: "We Build Your Stack",
    desc: "We set up your website, payments, email, invoicing, and messaging — usually within 48 hours.",
  },
  {
    step: 3,
    icon: "Star",
    title: "Your Business Goes Pro",
    desc: "You launch with a fully professional digital business. We stay with you for support and growth.",
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
    a: "Yes. Cedarce is remote-first — we deliver the same professional setup wherever you operate.",
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
