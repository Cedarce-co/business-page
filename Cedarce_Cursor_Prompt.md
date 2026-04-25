# CEDARCE TECHNOLOGIES — Website Build Prompt for Cursor AI
# Version 1.0 — Dark Navy Scale · Digital Business Buddy
# cedarce.ng · Lagos, Nigeria · 2025

---

## 1. PROJECT BRIEF

Build the complete marketing website for **Cedarce Technologies** — Nigeria's digital business infrastructure company. We take small and medium businesses operating manually and informally and set them up to operate professionally and digitally. Completely. End to end. Website, payments, invoicing, business email, bulk messaging, mobile apps, and automation — all done for you.

| Field | Value |
|---|---|
| Brand Name | Cedarce Technologies |
| Name Meaning | Cedar (Solomon's Temple wood) + Commerce |
| Initials | CC |
| Positioning | Your Digital Business Buddy |
| Tagline | Visibility · Automation · Scalability |
| Domain | cedarce.ng |
| Email | hello@cedarce.ng |
| Social | @cedarce on all platforms |
| Market | Nigeria — Lagos, Abuja, Port Harcourt and beyond |
| Audience | Gen Z and Millennial SME owners, 22–40 years old |
| Brand Feel | Premium dark SaaS meets warm Nigerian soul — Linear + Vercel + Lagos |

---

## 2. TECH STACK

```
Framework:    Next.js 14 (App Router)
Language:     TypeScript
Styling:      Tailwind CSS
Animations:   Framer Motion
Icons:        Lucide React
Font:         Inter — via next/font/google
Package mgr:  npm
```

**Setup commands — run these first:**
```bash
npx create-next-app@latest cedarce --typescript --tailwind --app --src-dir
cd cedarce
npm install framer-motion lucide-react
```

---

## 3. COLOUR SYSTEM — DARK NAVY SCALE ONLY

The entire website uses one colour system — a deep dark navy scale. This is the **only** colour reference. Do not introduce any colours not listed here.

The four foundation colours come directly from Qonto's brand:
- `#6B5AED` — Qonto Purple (primary brand colour — CTAs, buttons, icons on light)
- `#262A3E` — Qonto Navy (primary dark background)
- `#63EBE4` — Qonto Teal (accent — icons on dark, highlights)
- `#FAFAFC` — Qonto White (page background)

Everything else is derived from these four.

---

### 3a. Complete Colour Tokens

```css
/* =====================================================
   CEDARCE TECHNOLOGIES — COLOUR SYSTEM
   Dark Navy Scale + Qonto Foundation
   ===================================================== */

/* ── NAVY DARK SCALE (backgrounds, structure, depth) ── */
--navy-950: #0A0A14;   /* Deepest absolute dark — hero overlays, modals */
--navy-900: #111122;   /* Hero section background */
--navy-850: #1B1F30;   /* Deep dark — footer, darkest sections */
--navy-800: #262A3E;   /* Qonto Navy — primary dark background ★ */
--navy-700: #323654;   /* Cards on dark backgrounds */
--navy-600: #424669;   /* Borders on dark backgrounds */
--navy-500: #535780;   /* Dividers on dark */
--navy-400: #6B6F8A;   /* Muted text on dark */
--navy-300: #9B9FB8;   /* Captions on dark */
--navy-200: #C4C7D8;   /* Disabled text on dark */
--navy-100: #E2E4EF;   /* Subtle dark tint */


/* ── WHITE / LIGHT (page, cards, light sections) ── */
--white:        #FAFAFC;   /* Qonto White — page background ★ */
--white-pure:   #FFFFFF;   /* Cards, modals, popups */
--gray-100:     #F2F2F8;   /* Alternating light sections */
--gray-200:     #E4E4EF;   /* Card borders on white */
--gray-300:     #C8C8DE;   /* Input borders */

/* ── TEXT ── */
--text-heading: #111122;   /* H1/H2 on light backgrounds */
--text-body:    #444466;   /* Body paragraphs on light */
--text-muted:   #7777AA;   /* Captions, helper text */
--text-white:   #FFFFFF;   /* All text on dark */

/* ── SEMANTIC ── */
--success:      #22C55E;
--success-soft: #DCFCE7;
--error:        #EF4444;
--error-soft:   #FEE2E2;
--gold:         #F5A623;   /* Premium badges, pricing highlights */
--gold-soft:    #FEF3C7;


/* ── SHADOWS ── */
--shadow-sm:     0 1px 3px rgba(10,10,20,0.10);
--shadow-md:     0 4px 16px rgba(10,10,20,0.12);
--shadow-lg:     0 8px 32px rgba(10,10,20,0.16);
--shadow-purple: 0 8px 32px rgba(107,90,237,0.30);
--shadow-teal:   0 8px 32px rgba(99,235,228,0.25);
--shadow-glow:   0 0 80px rgba(107,90,237,0.20);
```

---

### 3b. Tailwind Config — `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cliq: {
          /* ── Navy dark scale ── */
          navy: {
            950: '#0A0A14',
            900: '#111122',
            850: '#1B1F30',
            800: '#262A3E',
            700: '#323654',
            600: '#424669',
            500: '#535780',
            400: '#6B6F8A',
            300: '#9B9FB8',
            200: '#C4C7D8',
            100: '#E2E4EF',
          },
          /* ── Purple ── */
          purple: {
            DEFAULT: '#6B5AED',
            dark:    '#5546D6',
            deep:    '#4A3DD4',
            light:   '#8B7DF2',
            soft:    '#EAE8FD',
          },
          /* ── Teal ── */
          teal: {
            DEFAULT: '#63EBE4',
            rich:    '#00C4BC',
            dark:    '#009B94',
            light:   '#97F2EE',
            soft:    '#E8FDFB',
          },
          /* ── White / light ── */
          white:  '#FAFAFC',
          gray: {
            100: '#F2F2F8',
            200: '#E4E4EF',
            300: '#C8C8DE',
          },
          /* ── Text ── */
          text: {
            heading: '#111122',
            body:    '#444466',
            muted:   '#7777AA',
          },
          /* ── Semantic ── */
          gold:    '#F5A623',
          success: '#22C55E',
          error:   '#EF4444',
        },
      },
      boxShadow: {
        'purple':     '0 8px 32px rgba(107,90,237,0.30)',
        'teal':       '0 8px 32px rgba(99,235,228,0.25)',
        'card':       '0 4px 16px rgba(10,10,20,0.10)',
        'card-hover': '0 8px 32px rgba(10,10,20,0.14)',
        'glow':       '0 0 80px rgba(107,90,237,0.20)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'marquee':    'marquee 30s linear infinite',
        'marquee-r':  'marqueeR 30s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%':   { boxShadow: '0 0 20px rgba(107,90,237,0.15)' },
          '100%': { boxShadow: '0 0 60px rgba(107,90,237,0.45)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeR: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

### 3c. Global CSS — `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', sans-serif;
  background-color: #FAFAFC;
  color: #111122;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Gradient text — purple to teal */
.text-gradient {
  background: linear-gradient(135deg, #6B5AED 0%, #63EBE4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Selection */
::selection {
  background: rgba(107, 90, 237, 0.18);
  color: #111122;
}

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #0A0A14; }
::-webkit-scrollbar-thumb { background: #424669; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #6B5AED; }
```

---

### 3d. Colour Usage Rules — Read Before Writing Any Code

```
╔══════════════════════════════════════════════════════════╗
║  SECTION BACKGROUNDS                                     ║
╠══════════════════════════════════════════════════════════╣
║  Page default        bg-cliq-white (#FAFAFC)            ║
║  White section       bg-white (#FFFFFF)                  ║
║  Alternate light     bg-cliq-gray-100 (#F2F2F8)         ║
║  Dark section        bg-cliq-navy-800 (#262A3E)         ║
║  Deep dark section   bg-cliq-navy-900 (#111122)         ║
║  Hero                bg-g-hero (950→900→850 gradient)   ║
║  CTA banner          bg-g-cta (purple→teal gradient)    ║
║  Footer              bg-g-footer (800→950 gradient)     ║
╠══════════════════════════════════════════════════════════╣
║  BUTTONS                                                 ║
╠══════════════════════════════════════════════════════════╣
║  Primary CTA         bg-g-button text-white shadow-purple║
║                      hover:opacity-90                    ║
║                      "Get Your Buddy" / "Get Started"   ║
║  Secondary           border-2 border-cliq-purple        ║
║                      text-cliq-purple                   ║
║                      hover:bg-cliq-purple-soft          ║
║                      "See How It Works"                 ║
║  Teal                bg-cliq-teal text-cliq-navy-900    ║
║                      font-bold                          ║
║                      "Book Free Consultation"           ║
║  Dark                bg-cliq-navy-800 text-white        ║
║                      "Sign In"                          ║
║  Ghost               text-cliq-purple underline         ║
║                      "Learn more →"                     ║
║  On dark bg          border-2 border-white/30 text-white║
║  On gradient banner  bg-white text-cliq-purple font-bold║
╠══════════════════════════════════════════════════════════╣
║  TEXT                                                    ║
╠══════════════════════════════════════════════════════════╣
║  H1/H2 on light      text-cliq-text-heading (#111122)  ║
║  H3/H4 on light      text-cliq-navy-800 (#262A3E)      ║
║  Body on light       text-cliq-text-body (#444466)     ║
║  Muted on light      text-cliq-text-muted (#7777AA)    ║
║  Gradient accent     className="text-gradient"          ║
║  All text on dark    text-white                         ║
║  Body on dark        text-white/70                      ║
║  Muted on dark       text-cliq-navy-300 (#9B9FB8)      ║
║  Teal on dark        text-cliq-teal (#63EBE4)           ║
╠══════════════════════════════════════════════════════════╣
║  ICONS                                                   ║
╠══════════════════════════════════════════════════════════╣
║  On white/light bg   text-cliq-purple                   ║
║  On dark bg          text-cliq-teal                     ║
║  On teal bg          text-cliq-navy-900                 ║
╠══════════════════════════════════════════════════════════╣
║  CARDS                                                   ║
╠══════════════════════════════════════════════════════════╣
║  Standard (light)    bg-white border border-cliq-gray-  ║
║                      200 shadow-card rounded-2xl        ║
║                      hover:shadow-card-hover            ║
║                      hover:border-cliq-purple/30        ║
║  Standard (dark)     bg-cliq-navy-700 border border-    ║
║                      cliq-navy-600 rounded-2xl          ║
║  Featured / popular  bg-g-card border-2 border-cliq-    ║
║                      purple shadow-purple rounded-2xl   ║
║                      animate-glow-pulse                 ║
╠══════════════════════════════════════════════════════════╣
║  BADGES                                                  ║
╠══════════════════════════════════════════════════════════╣
║  Default             bg-cliq-purple-soft text-cliq-     ║
║                      purple rounded-full px-3 py-1      ║
║  Popular             bg-g-brand text-white rounded-full ║
║  Gold / premium      bg-cliq-gold text-white rounded-   ║
║                      full                               ║
║  Teal / new          bg-cliq-teal text-cliq-navy-900    ║
║                      rounded-full                       ║
╠══════════════════════════════════════════════════════════╣
║  NAVBAR                                                  ║
╠══════════════════════════════════════════════════════════╣
║  At top of page      bg-transparent border-b border-    ║
║                      white/10                           ║
║  On scroll           bg-cliq-navy-900/90 backdrop-blur- ║
║                      xl border-b border-white/10        ║
║  Nav links           text-white/80 hover:text-white     ║
║  CTA button          bg-cliq-purple hover:bg-cliq-      ║
║                      purple-dark text-white rounded-xl  ║
╚══════════════════════════════════════════════════════════╝
```

---

### 3e. Component Colour Reference Card

Paste this comment block at the top of **every single component file**:

```tsx
/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  ├─────────────────────────────────────────────────────────┤
  │  PRIMARY BUTTON   bg-g-button text-white shadow-purple  │
  │  SECONDARY BTN    border-2 border-cliq-purple           │
  │                   text-cliq-purple                      │
  │  TEAL BUTTON      bg-cliq-teal text-cliq-navy-900       │
  │  DARK BUTTON      bg-cliq-navy-800 text-white           │
  │  ON DARK BTN      border-2 border-white/30 text-white   │
  │  ON BANNER BTN    bg-white text-cliq-purple font-bold   │
  │                                                         │
  │  HERO BG          bg-g-hero                             │
  │  DARK SECTION     bg-cliq-navy-800                      │
  │  DEEP SECTION     bg-cliq-navy-900                      │
  │  DEEPEST          bg-cliq-navy-950                      │
  │  LIGHT SECTION    bg-white or bg-cliq-white             │
  │  ALT SECTION      bg-cliq-gray-100                      │
  │  CTA BANNER       bg-g-cta                              │
  │  FOOTER           bg-g-footer                           │
  │                                                         │
  │  H1/H2 LIGHT      text-cliq-text-heading               │
  │  H1/H2 DARK       text-white                            │
  │  BODY LIGHT       text-cliq-text-body                   │
  │  BODY DARK        text-white/70                         │
  │  MUTED LIGHT      text-cliq-text-muted                  │
  │  MUTED DARK       text-cliq-navy-300                    │
  │  GRADIENT TEXT    className="text-gradient"             │
  │  TEAL TEXT        text-cliq-teal (dark bg only)         │
  │                                                         │
  │  ICON LIGHT       text-cliq-purple                      │
  │  ICON DARK        text-cliq-teal                        │
  │                                                         │
  │  CARD LIGHT       bg-white border border-cliq-gray-200  │
  │                   shadow-card rounded-2xl               │
  │  CARD DARK        bg-cliq-navy-700 border              │
  │                   border-cliq-navy-600 rounded-2xl      │
  │  CARD FEATURED    bg-g-card border-2 border-cliq-purple │
  │                   shadow-purple animate-glow-pulse      │
  │  CARD HOVER       hover:shadow-card-hover               │
  │                   hover:border-cliq-purple/30           │
  │                                                         │
  │  BADGE DEFAULT    bg-cliq-purple-soft text-cliq-purple  │
  │  BADGE POPULAR    bg-g-brand text-white                 │
  │  BADGE GOLD       bg-cliq-gold text-white               │
  │  BADGE TEAL       bg-cliq-teal text-cliq-navy-900       │
  │  STARS            text-cliq-gold                        │
  └─────────────────────────────────────────────────────────┘
*/
```

---

## 4. ANIMATIONS — `src/lib/animations.ts`

```typescript
import { Variants } from 'framer-motion'

/* ── Fade up — use on most content blocks ── */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

/* ── Fade in — use on images and full sections ── */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' } }
}

/* ── Scale in — use on cards and icons ── */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

/* ── Slide from left ── */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

/* ── Slide from right ── */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

/* ── Stagger wrapper — wrap any grid or list ── */
export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

/* ── Stagger slow — for longer lists ── */
export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

/* ── Word reveal — for animated hero headlines ── */
export const wordReveal: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

/* ── Chat bubble — for AI buddy section ── */
export const chatBubble: Variants = {
  hidden:  { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' } }
}

/* ── SVG line draw — for how it works connectors ── */
export const drawLine: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1,
    transition: { duration: 1.5, ease: 'easeInOut' } }
}

/* ── Continuous float — for hero dashboard cards ── */
export const floatLoop = (delay = 0) => ({
  y: [0, -12, 0],
  transition: {
    duration: 5 + delay,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  }
})

/* ── Pulsing glow — for featured pricing card ── */
export const glowPulse = {
  boxShadow: [
    '0 0 20px rgba(107,90,237,0.15)',
    '0 0 48px rgba(107,90,237,0.40)',
    '0 0 20px rgba(107,90,237,0.15)',
  ],
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
}

/* ── Reusable viewport config ── */
export const viewport = { once: true, margin: '-80px' }
```

---

## 5. DATA FILE — `src/lib/constants.ts`

```typescript
export const SERVICES = [
  {
    id: 'website',
    icon: 'Globe',
    name: 'Website & Landing Page',
    desc: 'Professional, responsive, branded websites that convert visitors into customers.',
    price: 'From ₦80,000',
    badge: 'Most Popular',
  },
  {
    id: 'app',
    icon: 'Smartphone',
    name: 'Mobile App Development',
    desc: 'Simple product and order management apps built for your business operations.',
    price: 'From ₦300,000',
    badge: null,
  },
  {
    id: 'domain',
    icon: 'Server',
    name: 'Domain & Hosting',
    desc: 'Your permanent digital address — registered, configured, SSL secured, managed.',
    price: 'From ₦25,000',
    badge: null,
  },
  {
    id: 'email',
    icon: 'Mail',
    name: 'Business Email',
    desc: 'hello@yourbusiness.ng — never send a business email from Gmail again.',
    price: 'From ₦25,000',
    badge: null,
  },
  {
    id: 'payments',
    icon: 'CreditCard',
    name: 'Payments & Gateways',
    desc: 'Accept card payments, bank transfers, and USSD. Money in your account automatically.',
    price: 'From ₦40,000',
    badge: null,
  },
  {
    id: 'invoicing',
    icon: 'FileText',
    name: 'Invoicing System',
    desc: 'Branded, automated invoices and receipts sent the moment a transaction happens.',
    price: 'From ₦30,000',
    badge: null,
  },
  {
    id: 'messaging',
    icon: 'MessageSquare',
    name: 'Bulk Messaging',
    desc: 'Reach every customer at once — WhatsApp, email, and SMS, automated.',
    price: 'From ₦35,000',
    badge: null,
  },
  {
    id: 'ads',
    icon: 'TrendingUp',
    name: 'Marketing & Ads',
    desc: 'Get visible to the right customers on Instagram, TikTok, and Google.',
    price: 'From ₦50,000',
    badge: null,
  },
  {
    id: 'training',
    icon: 'Users',
    name: 'Staff Training',
    desc: 'We train your team to use every system professionally. No one gets left behind.',
    price: 'From ₦20,000',
    badge: null,
  },
]

export const PACKAGES = [
  {
    name: 'Starter Buddy',
    price: '₦80,000',
    subtitle: 'Perfect for getting started',
    badge: null,
    featured: false,
    features: [
      'Landing page (1 page, mobile-first)',
      'Domain registration (.ng or .com)',
      '1 business email inbox',
      'Basic payment gateway integration',
      'SSL certificate setup',
      '30 days buddy support',
    ],
    cta: 'Get Started',
    ctaStyle: 'secondary',
  },
  {
    name: 'Business Buddy',
    price: '₦250,000',
    subtitle: 'For growing businesses',
    badge: 'Most Popular',
    featured: true,
    features: [
      'Full website (5–8 pages, mobile-first)',
      'Domain + hosting + SSL setup',
      '5 business email inboxes',
      'Payment gateway + automated invoicing',
      'Bulk messaging setup (email + WhatsApp)',
      'Staff training session (2 hours)',
      '90 days buddy support',
    ],
    cta: 'Book This Package',
    ctaStyle: 'primary',
  },
  {
    name: 'Pro Buddy',
    price: '₦500,000',
    subtitle: 'The complete setup',
    badge: 'Most Complete',
    featured: false,
    features: [
      'Everything in Business Buddy',
      'Mobile app development',
      'Marketing & ads setup',
      'SendGrid email automation',
      'WhatsApp automation system',
      '6 months dedicated buddy support',
      'Monthly check-in calls',
    ],
    cta: "Let's Talk",
    ctaStyle: 'dark',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Amaka O.',
    role: 'Food Store Owner, Lagos',
    stars: 5,
    quote: 'Cedarce set up my entire shop in one week. Now my customers pay online and receive automatic receipts. My business finally looks like a real company.',
  },
  {
    name: 'Tunde A.',
    role: 'Fashion Boutique, Abuja',
    stars: 5,
    quote: 'I was managing everything on WhatsApp. Now I have a proper website, business email, and payment system. Best investment I made for my business.',
  },
  {
    name: 'Pastor Emeka',
    role: 'Church, Port Harcourt',
    stars: 5,
    quote: 'Cedarce built our website, set up online giving, and configured bulk messaging. Our congregation is now fully connected digitally.',
  },
  {
    name: 'Ngozi C.',
    role: 'Pharmacy Owner, Enugu',
    stars: 5,
    quote: 'The automated restock alerts have noticeably increased my sales. Customers love being notified when products return. This buddy truly knows business.',
  },
  {
    name: 'Ola B.',
    role: 'Startup Founder, Lagos',
    stars: 5,
    quote: 'I needed someone who understood both tech and business. Cedarce built everything I needed and trained my whole team. Genuinely my digital buddy.',
  },
]

export const STATS = [
  { value: 500,  suffix: '+',   label: 'Businesses Set Up' },
  { value: 9,    suffix: '',    label: 'Services Under One Roof' },
  { value: 48,   suffix: 'hrs', label: 'Average Setup Time' },
  { value: 100,  suffix: '%',   label: 'Client Satisfaction' },
]

export const HOW_IT_WORKS = [
  {
    step: 1,
    icon: 'Calendar',
    title: 'Book a Free Consultation',
    desc: 'Tell us about your business. We listen, understand exactly what you need. 30 minutes. No pressure. No jargon.',
  },
  {
    step: 2,
    icon: 'Zap',
    title: 'Your Buddy Builds Everything',
    desc: 'Sit back while your buddy sets up your website, payments, email, invoicing, and messaging. Completely. Usually within 48 hours.',
  },
  {
    step: 3,
    icon: 'Star',
    title: 'Your Business Goes Pro',
    desc: 'Launch with a fully professional digital business. Your buddy stays on for ongoing support, updates, and growth.',
  },
]

export const FOOD_STORY_STEPS = [
  {
    step: 1,
    title: 'Customer discovers the store',
    desc: 'They search Google, find your business, and land on your professional website. No more "send your catalogue on WhatsApp."',
  },
  {
    step: 2,
    title: 'Customer browses and orders',
    desc: 'Products listed cleanly. Order placed directly online. No back-and-forth messages. No missed orders.',
  },
  {
    step: 3,
    title: 'Branded invoice sent automatically',
    desc: 'A professional invoice with your logo arrives in their email. Instantly. Automatically. Every single time.',
  },
  {
    step: 4,
    title: 'Customer pays online',
    desc: 'Card, bank transfer, or USSD. Payment confirmed in real time. Money lands in your business account.',
  },
  {
    step: 5,
    title: 'Branded receipt sent automatically',
    desc: 'A beautiful receipt arrives immediately. Your customer feels like they just shopped with a Fortune 500 company.',
  },
  {
    step: 6,
    title: 'Automated follow-up sent',
    desc: '"Thank you for your order! How was your experience?" — sent by WhatsApp automatically after delivery.',
  },
  {
    step: 7,
    title: 'Restock alert sent to all customers',
    desc: '"Your favourite Ofada rice is back in stock!" — email and WhatsApp blast sent to every customer automatically.',
  },
]
```

---

## 6. FILE STRUCTURE

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    services/
      page.tsx
      [slug]/page.tsx
    about/page.tsx
    pricing/page.tsx
    contact/page.tsx
    blog/page.tsx

  components/
    layout/
      Navbar.tsx
      Footer.tsx

    home/
      HeroSection.tsx
      TickerSection.tsx
      ProblemSection.tsx
      FoodStorySection.tsx
      ServicesGrid.tsx
      HowItWorksSection.tsx
      AIBuddySection.tsx
      PricingPreview.tsx
      TestimonialsSection.tsx
      StatsBanner.tsx
      BlogPreview.tsx
      FinalCTASection.tsx

    ui/
      Button.tsx
      Badge.tsx
      ServiceCard.tsx
      PricingCard.tsx
      TestimonialCard.tsx
      AnimatedCounter.tsx
      ChatBubble.tsx
      FloatingCard.tsx
      SectionLabel.tsx
      GradientText.tsx

  lib/
    animations.ts
    constants.ts
    utils.ts
```

---

## 7. BUILD ORDER

Build in this exact sequence — no skipping:

```
 1.  tailwind.config.ts
 2.  src/app/globals.css
 3.  src/lib/animations.ts
 4.  src/lib/constants.ts
 5.  src/components/ui/Button.tsx
 6.  src/components/ui/Badge.tsx
 7.  src/components/ui/SectionLabel.tsx
 8.  src/components/ui/GradientText.tsx
 9.  src/components/layout/Navbar.tsx
10.  src/components/layout/Footer.tsx
11.  src/app/layout.tsx
12.  src/components/home/HeroSection.tsx
13.  src/components/home/TickerSection.tsx
14.  src/components/home/ProblemSection.tsx
15.  src/components/home/FoodStorySection.tsx
16.  src/components/home/ServicesGrid.tsx
17.  src/components/home/HowItWorksSection.tsx
18.  src/components/home/AIBuddySection.tsx
19.  src/components/home/PricingPreview.tsx
20.  src/components/home/TestimonialsSection.tsx
21.  src/components/home/StatsBanner.tsx
22.  src/components/home/BlogPreview.tsx
23.  src/components/home/FinalCTASection.tsx
24.  src/app/page.tsx                          ← assemble all home sections
25.  WhatsApp floating button                  ← add to layout.tsx
26.  Scroll progress bar                       ← add to layout.tsx
27.  /services, /about, /pricing, /contact, /blog
28.  Price calculator on /pricing
29.  Final SEO metadata pass
```

---

## 8. HOME PAGE — 13 SECTIONS

---

### S1 — HERO

**Background:** `bg-g-hero` — navy-950 → navy-900 → navy-850
**Add radial glow:** `style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(107,90,237,0.12) 0%, transparent 60%)' }}`
**Dot grid overlay:** tiny white dots, 0.04 opacity, slow pulse animation

**Layout:** Full viewport height (`min-h-screen`). Two columns on `lg:`. Single column on mobile.

**Left — copy block:**

Top badge:
```tsx
<span className="inline-flex items-center gap-2 bg-cliq-navy-700
  text-cliq-teal border border-cliq-navy-600 rounded-full px-4 py-2
  text-sm font-semibold">
  🇳🇬  Nigeria's Digital Business Buddy
</span>
```

Headline — animated word by word using `wordReveal` + `stagger`:
```
Cedar.
Commerce.
Professional.
```
The word **"Professional"** uses `className="text-gradient"`
Font: `text-5xl lg:text-7xl font-black text-white leading-tight`

Sub-headline:
```
Cedarce Technologies is your digital business buddy —
we set up your website, payments, invoicing, emails, and
automation so your business operates like the big players.
One click at a time.
```
Style: `text-white/70 text-lg max-w-lg`

Buttons:
```tsx
<button className="bg-g-button text-white shadow-purple
  px-7 py-3.5 rounded-xl font-semibold hover:opacity-90 transition">
  Get Your Buddy
</button>

<button className="border-2 border-white/30 text-white
  backdrop-blur-sm px-7 py-3.5 rounded-xl font-semibold
  hover:border-white/50 transition">
  See How It Works
</button>
```

Social proof:
```tsx
<p className="text-white/40 text-sm">
  ✦ Trusted by growing businesses
</p>
```

**Right — 5 floating notification cards:**
```tsx
// Each card: bg-cliq-navy-700/90 border border-cliq-navy-600
// backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3
// animate: stagger fadeUp on load, then floatLoop(index * 0.8)
```

Cards content:
```
✅  Invoice #0042 sent to Amaka Foods    ·  Just now
💰  Payment received ₦45,000            ·  2 mins ago
📧  Business email configured           ·  hello@amakas.ng
📱  WhatsApp follow-up sent             ·  Automated
🌐  Website live at amakas.ng           ·  3 set up today
```

---

### S2 — TICKER

**Background:** `bg-cliq-navy-800`
**Two rows scrolling in opposite directions**

Row 1 (scrolls left — `animate-marquee`):
```
Food Stores · Fashion Boutiques · Pharmacies · Schools · Churches ·
Logistics Companies · Beauty Salons · Startups · NGOs · Real Estate ·
Event Planners · Restaurants · Clinics · Law Firms ·
```

Row 2 (scrolls right — `animate-marquee-r`):
```
Invoice Automation · Payment Gateways · Business Websites ·
Mobile Apps · Business Email · Staff Training · Bulk Messaging ·
Brand Identity · Domain Setup · Digital Ads ·
```

Text: `text-cliq-navy-300 text-sm font-medium`
Separator dots: `text-cliq-teal mx-3`

Double the content arrays for seamless infinite loop.

---

### S3 — PROBLEM (Before / After)

**Background:** `bg-cliq-white`
**SectionLabel:** "The Problem" — `bg-cliq-purple-soft text-cliq-purple`

**Headline:** `text-cliq-text-heading font-black text-4xl lg:text-5xl`
```
Still running your business manually?
```

**Sub:** `text-cliq-text-body text-lg max-w-2xl`
```
Every day your business looks informal you are losing customers
to competitors who look professional. Here is the exact gap.
```

**Two cards + arrow:**

BEFORE card — `bg-cliq-gray-100 border border-cliq-gray-200 rounded-3xl p-8`
Animate: `slideLeft`
```
Header: "Before Cedarce" — text-cliq-text-muted font-semibold uppercase tracking-wide

❌  WhatsApp messages for all orders
❌  Cash only — no payment records
❌  No website or online presence
❌  Handwritten or no receipts
❌  No professional email address
❌  Manual follow-ups that never happen
❌  No way to message all customers at once
```

Centre arrow: `text-cliq-purple text-3xl font-black text-center` — "One click →"

AFTER card — `bg-g-card border-2 border-cliq-purple rounded-3xl p-8 shadow-purple animate-glow-pulse`
Animate: `slideRight`
```
Badge: "With Cedarce Technologies" — bg-g-brand text-white rounded-full text-xs

✅  Professional landing page taking orders
✅  Online payments — card, transfer, USSD
✅  Automated branded invoices instantly
✅  Branded receipts emailed automatically
✅  hello@yourbusiness.ng professional email
✅  Automated WhatsApp and email follow-ups
✅  Bulk messaging reaching all customers
```

---

### S4 — FOOD STORY (Interactive Scroll Journey)

**Background:** `bg-cliq-navy-900`
**SectionLabel:** "Cedarce in Action" — `bg-cliq-teal text-cliq-navy-900 font-semibold`

**Headline:** `text-white font-black text-4xl lg:text-5xl`
```
See how we transform a business.
```

**Sub:** `text-white/60 text-lg`
```
A Lagos food store. Before and after Cedarce Technologies.
```

**Layout:** Left sticky progress bar, right scrolling steps

Progress bar: vertical `bg-cliq-navy-600`, fills with `bg-g-brand` via `useScroll` + `scaleY`

7 steps from `FOOD_STORY_STEPS` constant — each animates with `fadeUp` on `useInView`

Each step:
```tsx
// Step bubble: w-10 h-10 bg-cliq-purple rounded-full text-white font-bold text-center
// Title: text-white font-bold text-xl
// Description: text-white/60 text-base leading-relaxed
// Mockup card: bg-cliq-navy-700 border border-cliq-navy-600 rounded-2xl p-4
```

---

### S5 — SERVICES GRID

**Background:** `bg-cliq-white`
**SectionLabel:** "What We Build For You" — `bg-cliq-purple-soft text-cliq-purple`

**Headline:** `text-cliq-text-heading font-black text-4xl lg:text-5xl`
```
Nine services.
One buddy.
```

**Sub:** `text-cliq-text-body text-lg max-w-2xl`

**Grid:** `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
**Animation:** `stagger` container + `scaleIn` per card

Each card from `SERVICES` constant:
```tsx
<motion.div
  variants={scaleIn}
  className="bg-white border border-cliq-gray-200 rounded-2xl p-6
    shadow-card hover:shadow-card-hover hover:border-cliq-purple/30
    transition-all duration-300 group cursor-pointer"
>
  // Icon container: bg-cliq-purple-soft rounded-xl p-3 w-fit mb-4
  // Icon: text-cliq-purple w-6 h-6
  // Badge if exists: bg-g-brand text-white rounded-full px-2 py-0.5 text-xs
  // Name: text-cliq-text-heading font-bold text-lg mb-2
  // Description: text-cliq-text-body text-sm leading-relaxed mb-4
  // Price hint: text-cliq-text-muted text-xs mb-3
  // Footer link: "Explore this service →" text-cliq-purple font-semibold text-sm
</motion.div>
```

---

### S6 — HOW IT WORKS

**Background:** `bg-cliq-navy-800`
**SectionLabel:** "The Process" — `bg-cliq-navy-700 text-cliq-teal border border-cliq-navy-600`

**Headline:** `text-white font-black text-4xl lg:text-5xl`
```
Three steps to professional.
```

3 steps from `HOW_IT_WORKS` constant — horizontal on desktop, vertical on mobile

Between steps — animated SVG dashed line:
```tsx
<svg width="100" height="4" className="hidden lg:block">
  <defs>
    <linearGradient id="line-grad">
      <stop offset="0%" stopColor="#6B5AED" />
      <stop offset="100%" stopColor="#63EBE4" />
    </linearGradient>
  </defs>
  <motion.line
    x1="0" y1="2" x2="100" y2="2"
    stroke="url(#line-grad)" strokeWidth="2"
    strokeDasharray="4 4"
    variants={drawLine}
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
  />
</svg>
```

Each step:
```tsx
// Step bubble: bg-cliq-purple rounded-full w-12 h-12 text-white font-black
// Icon: text-cliq-teal w-6 h-6
// Title: text-white font-bold text-xl mt-4
// Description: text-white/60 text-base leading-relaxed mt-2 max-w-xs
```

---

### S7 — AI BUDDY CHAT

**Background:** `bg-cliq-navy-900`
**SectionLabel:** "Your 24/7 Buddy" — `bg-g-brand text-white`

**Headline:** `text-white font-black text-4xl lg:text-5xl text-center`
```
Meet your AI business buddy.
Ask anything. Get answers.
```

**Sub:** `text-white/60 text-lg text-center max-w-xl mx-auto`

**Chat frame:** `bg-cliq-navy-700 border border-cliq-navy-600 rounded-3xl shadow-purple max-w-md mx-auto`

Chat header: `bg-cliq-navy-800 rounded-t-3xl px-5 py-4`
```tsx
<span className="w-2.5 h-2.5 bg-cliq-teal rounded-full animate-pulse" />
<span className="text-white font-semibold text-sm">Cedarce AI Buddy</span>
<span className="text-cliq-navy-300 text-xs ml-1">· Online now</span>
```

Animated messages using `chatBubble` + `staggerSlow`:
```
User:   "How do I start accepting payments online for my food store?"
Buddy:  "Great question! I can set up a complete payment system for your
         food store in 48 hours. Card, transfers, USSD — all automated
         and connected to your invoicing. Want to walk through the
         options? 🚀"

User:   "What does a professional business email cost?"
Buddy:  "A professional email like hello@yourstore.ng starts at ₦25,000.
         Includes 5 inboxes and looks completely professional to every
         customer and supplier. Shall I book a free consultation? 📧"

[Typing indicator — 3 bouncing dots]
```

User bubbles: `bg-cliq-purple text-white rounded-2xl rounded-br-sm`
Buddy bubbles: `bg-cliq-navy-600 text-white rounded-2xl rounded-bl-sm`

CTAs:
```tsx
<button className="bg-g-button text-white shadow-purple px-6 py-3 rounded-xl font-semibold">
  Chat With Your Buddy →
</button>
<a className="text-cliq-teal underline text-sm mt-2 block text-center">
  Or message us on WhatsApp
</a>
```

---

### S8 — PRICING PREVIEW

**Background:** `bg-cliq-white`
**SectionLabel:** "Simple Pricing" — `bg-cliq-purple-soft text-cliq-purple`

**Headline:** `text-cliq-text-heading font-black text-4xl lg:text-5xl`
```
Transparent pricing.
No surprises.
```

3 cards from `PACKAGES` constant:
```tsx
// Non-featured: bg-white border-2 border-cliq-gray-200 rounded-3xl p-8
// Featured: bg-g-card border-2 border-cliq-purple rounded-3xl p-8 shadow-purple
//           animate={glowPulse}
```

Card internals:
```tsx
// Badge: bg-g-brand text-white rounded-full px-3 py-1 text-xs font-semibold
// Package name: font-black text-2xl text-cliq-text-heading
// Price: font-black text-5xl text-cliq-purple mt-2
// Subtitle: text-cliq-text-muted text-sm mt-1
// Divider: border-t border-cliq-gray-200 my-6
// Features: space-y-3 — ✓ text-cliq-teal · text-cliq-text-body text-sm
// CTA button: full width mt-8
```

Footer note:
```tsx
<p className="text-cliq-text-muted text-center text-sm mt-8">
  Not sure which package?{' '}
  <a className="text-cliq-purple underline font-medium">
    Book a free consultation →
  </a>
  {' '}No pressure, no jargon.
</p>
```

---

### S9 — TESTIMONIALS

**Background:** `bg-cliq-navy-800`
**SectionLabel:** "What Our Clients Say" — `bg-cliq-navy-700 text-cliq-teal border border-cliq-navy-600`

**Headline:** `text-white font-black text-4xl lg:text-5xl`
```
Real businesses.
Real results.
```

Draggable carousel — Framer Motion `drag="x"` `cursor-grab active:cursor-grabbing`

Each card from `TESTIMONIALS` constant:
```tsx
<motion.div className="bg-cliq-navy-700 border border-cliq-navy-600
  rounded-2xl p-6 min-w-[320px]">
  // Stars: text-cliq-gold text-sm (5 × ⭐)
  // Quote: text-white/80 text-sm leading-relaxed mt-4 mb-5
  // Name: text-white font-semibold text-sm
  // Role: text-cliq-navy-300 text-xs mt-0.5
</motion.div>
```

---

### S10 — STATS BANNER

**Background:** `bg-cliq-navy-950`

4 stats from `STATS` constant — separated by `border-r border-cliq-navy-700`

```tsx
// Number: font-black text-5xl lg:text-6xl text-gradient
// Suffix: same style inline
// Label: text-cliq-navy-300 text-sm mt-2
// Counter: useMotionValue + animate() triggered by useInView
```

AnimatedCounter implementation:
```tsx
import { useMotionValue, useInView, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionValue, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1]
    })
    motionValue.on('change', v => setDisplay(Math.round(v)))
    return controls.stop
  }, [isInView])

  return <span ref={ref}>{display}{suffix}</span>
}
```

---

### S11 — BLOG PREVIEW

**Background:** `bg-cliq-gray-100`
**SectionLabel:** "From Our Desk" — `bg-cliq-purple-soft text-cliq-purple`

**Headline:** `text-cliq-text-heading font-black text-4xl`
```
Business tips for the modern
Nigerian entrepreneur.
```

3 blog cards:
```tsx
// Card: bg-white border border-cliq-gray-200 rounded-2xl overflow-hidden
//       shadow-card hover:shadow-card-hover transition-all
// Cover: h-40 gradient background
// Tag: bg-cliq-purple-soft text-cliq-purple rounded-full text-xs px-3 py-1
// Title: text-cliq-text-heading font-bold text-sm leading-snug mt-3
// Read time: text-cliq-text-muted text-xs mt-2
// CTA: "Read article →" text-cliq-purple font-semibold text-sm
```

Blog posts:
```
1. Cover: bg-g-brand
   Tag: "Getting Started"
   Title: "5 things every Nigerian business needs to go professional in 2025"

2. Cover: bg-cliq-navy-800
   Tag: "Payments"
   Title: "How to accept online payments as a small business in Nigeria"

3. Cover: bg-g-dark
   Tag: "Email & Identity"
   Title: "Why your business needs a professional email (not Gmail or Yahoo)"
```

---

### S12 — FINAL CTA

**Background:** `bg-g-cta` — #6B5AED → #63EBE4

**Headline:** `text-white font-black text-5xl lg:text-6xl text-center`
```
Your business buddy
is ready.
```

**Sub:** `text-white/80 text-lg text-center max-w-lg mx-auto mt-4`
```
Book a free 30-minute consultation and let us show you exactly
what Cedarce Technologies can do for your business.
No pressure. No jargon. Just your buddy telling it straight.
```

Buttons:
```tsx
<button className="bg-white text-cliq-purple font-bold px-8 py-4
  rounded-xl text-base shadow-lg hover:shadow-xl transition">
  Book Free Consultation
</button>

<button className="border-2 border-white/60 text-white px-8 py-4
  rounded-xl text-base hover:border-white transition">
  Chat on WhatsApp
</button>
```

Footer note: `text-white/60 text-sm text-center mt-4`
```
We respond within 2 hours · Mon–Sat 8am–8pm
```

---

### S13 — FOOTER

**Background:** `bg-g-footer` — #262A3E → #0A0A14

4 columns on desktop, stacked on mobile:

```
Column 1 — Brand
  "CEDAR" text-white font-black text-2xl
  + "CE" text-cliq-teal font-black text-2xl
  "Technologies" text-cliq-navy-300 text-sm font-light
  "Your Digital Business Buddy." text-cliq-navy-300 text-sm mt-2
  "Visibility · Automation · Scalability" text-cliq-navy-400 text-xs mt-1
  Social icons (mt-4): Instagram, TikTok, Twitter/X, LinkedIn, Facebook
  Icons: text-cliq-navy-400 hover:text-cliq-teal transition w-5 h-5

Column 2 — Services (all 9 from SERVICES constant)
  text-cliq-navy-300 hover:text-white text-sm transition

Column 3 — Company
  About Us · How It Works · Pricing · Blog
  Contact · Privacy Policy · Terms of Service
  text-cliq-navy-300 hover:text-white text-sm transition

Column 4 — Get In Touch
  hello@cedarce.ng
  WhatsApp link — text-cliq-teal hover:underline
  Lagos, Nigeria — text-cliq-navy-400 text-xs
  [Book a Service →] bg-cliq-purple text-white rounded-xl px-4 py-2 text-sm mt-4

Bottom bar: border-t border-cliq-navy-700 mt-12 pt-6
  "© 2025 Cedarce Technologies Ltd. All rights reserved.
   Built with ❤️ in Lagos, Nigeria."
  text-cliq-navy-400 text-sm
```

---

## 9. NAVBAR

```tsx
// Transparent at top → bg-cliq-navy-900/90 backdrop-blur-xl on scroll
// Border: border-b border-white/10 always present
// Left: "CEDAR" text-white font-black + "CE" text-cliq-teal font-black
//       + " Technologies" text-cliq-navy-300 text-sm font-light
// Centre: Services · About · Pricing · Blog
//         text-white/80 hover:text-white text-sm font-medium transition
// Right: [Sign In] text-white/70 hover:text-white text-sm
//        [Get Your Buddy] bg-cliq-purple hover:bg-cliq-purple-dark
//                         text-white rounded-xl px-4 py-2 text-sm font-semibold
// Mobile: hamburger → slide-down menu bg-cliq-navy-900 border-b border-cliq-navy-700
//         All links stacked, CTA full width at bottom
```

---

## 10. SPECIAL FEATURES

### WhatsApp Floating Button — add to `layout.tsx`
```tsx
<a
  href="https://wa.me/[NUMBER]?text=Hi, I want to know more about Cedarce Technologies"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
    bg-[#25D366] text-white flex items-center justify-center
    shadow-lg hover:scale-110 transition-transform animate-pulse-slow"
  style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.40)' }}
  title="Chat with us on WhatsApp"
>
  <MessageCircle className="w-6 h-6" />
</a>
```

### Scroll Progress Bar — add to `layout.tsx`
```tsx
import { useScroll, useSpring, motion } from 'framer-motion'

const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

<motion.div
  style={{ scaleX, transformOrigin: 'left' }}
  className="fixed top-0 left-0 right-0 h-[3px] bg-g-brand z-50"
/>
```

### Price Calculator — `/pricing` page
```tsx
// Checkboxes for all 9 services with base prices from constants
// Running total updates in real time as services are selected
// Display: "Estimated investment: ₦{total.toLocaleString()}"
// Disclaimer: "Final price confirmed in consultation"
// CTA: "Get a quote for this selection →"
```

---

## 11. OTHER PAGES

### /services
- Dark hero: "Nine services. One buddy."
- Full SERVICES grid (3 col)
- CTA banner `bg-g-cta`

### /services/[slug]
- Dynamic from service id
- Dark hero with service icon + name
- What is included (checkmark list, light section)
- Who it is for (client type cards, dark section)
- How we deliver (3 steps, light section)
- Pricing tiers (`bg-cliq-gray-100`)
- Related services (3 cards)
- CTA banner

### /about
- Dark hero: "We are your digital business buddy."
- The name story — Cedar + Commerce
- Founder story — first person, warm, Nigerian
- Mission: "Every Nigerian SME deserves to operate professionally."
- 4 value cards on white
- Vision: "Building the digital infrastructure for African business." — dark section
- CTA banner

### /pricing
- Dark hero: "Simple, transparent pricing."
- 3 package cards (expanded from homepage)
- Individual service pricing table
- Interactive price calculator
- FAQ accordion (8 questions, `bg-cliq-gray-100`)
- CTA banner

### /contact
- Full dark bg (`bg-cliq-navy-900`)
- Left: booking form — dark styled inputs
- Right: contact info + response time
- On success: full-page animation + confetti (canvas-confetti)

Form inputs:
```tsx
className="w-full bg-cliq-navy-800 border border-cliq-navy-600
  text-white placeholder:text-cliq-navy-300 rounded-xl px-4 py-3 text-sm
  focus:border-cliq-purple focus:outline-none
  focus:ring-2 focus:ring-cliq-purple/20 transition"
```

### /blog
- Light bg
- Featured post hero (large card, dark bg)
- Category filter tabs
- Blog card grid

---

## 12. RESPONSIVE RULES

```
Mobile (default):  single column, hamburger nav, stacked sections
sm (640px):        2-col service grid, wider containers
md (768px):        navbar expands, 2-col layouts
lg (1024px):       3-col grids, split hero, full desktop nav
xl (1280px):       max-width cap, generous padding
2xl (1536px):      wider max-width

All containers:    max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8
Section padding:   py-20 lg:py-28
```

---

## 13. SEO METADATA

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Cedarce Technologies — Your Digital Business Buddy | Nigeria',
    template: '%s | Cedarce Technologies',
  },
  description:
    "Nigeria's digital business buddy. We set up your website, payments, invoicing, business email, and automation professionally. One click and your business goes pro.",
  keywords: [
    'digital business setup Nigeria',
    'website development Lagos',
    'payment gateway Nigeria SME',
    'business email Nigeria',
    'professional business setup Nigeria',
    'invoicing system Nigeria',
    'WhatsApp automation Nigeria',
    'digital agency Lagos',
    'Cedarce Technologies',
    'cedarce.ng',
  ],
  openGraph: {
    title: 'Cedarce Technologies — Your Digital Business Buddy',
    description:
      "Nigeria's digital business buddy. Website, payments, invoicing, email, automation — done for you professionally.",
    url: 'https://cedarce.ng',
    siteName: 'Cedarce Technologies',
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cedarce Technologies — Your Digital Business Buddy',
    description:
      "Nigeria's digital business buddy. One click and your business goes pro.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://cedarce.ng'),
}
```

---

## 14. COPY VOICE — THE BUDDY TONE

```
✅  WRITE LIKE THIS                  ❌  NOT LIKE THIS
──────────────────────────────────────────────────────────
"Your business, professional          "Leveraging cutting-edge digital
 in one click."                        transformation solutions"

"Your buddy handles the tech.         "Our team of professionals will
 You handle the hustle."               deliver comprehensive services"

"Stop losing customers to             "Optimise your business operations
 manual operations."                   for maximum efficiency"

"Get your buddy today."               "Commence your digital journey"

"₦80,000 to go professional."        "NGN 80,000 investment required"
```

Rules:
- Short sentences always
- "You" and "your" in every paragraph
- Never: leverage · synergy · end-to-end · cutting-edge · innovative
- Naira is always ₦ — never NGN or N
- Nigeria-specific: Lagos · Alaba market · Balogun · Oshodi · Kano · Aba
- Warm and buddy-coded: "your buddy" · "one click" · "we've got you"

---

## 15. ONE-PARAGRAPH BRIEF — PASTE THIS FIRST IN CURSOR

> Build the complete Cedarce Technologies website — Nigeria's digital business buddy. The company name is Cedarce (Cedar + Commerce) — SEE-dar-see — a Nigerian digital business infrastructure company. The entire colour system is a dark navy scale: backgrounds range from navy-950 (#0A0A14) at the deepest through navy-900 (#111122) for the hero, navy-800 (#262A3E) for dark sections, and #FAFAFC for light sections. The primary brand colour is Qonto Purple (#6B5AED) used on all CTAs, buttons, and icons on light backgrounds. The accent colour is Qonto Teal (#63EBE4) used on icons on dark backgrounds and highlights. All gradients go purple-to-teal. Every component must have the colour reference card pasted at the top. The website has 13 home sections: hero with floating dashboard notification cards on dark navy, ticker, before/after problem section, 7-step food store transformation story, 9-service grid, 3-step how it works, AI buddy chat mockup, 3-package pricing preview, testimonials carousel, animated stats counter, blog preview, gradient CTA banner, and footer. Positioning throughout is "Digital Business Buddy" — warm, direct, Nigerian, Gen Z coded. Never use the word "mate" anywhere in website copy. Build in Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Inter font. Follow the build order in Section 7 exactly. Paste the colour reference card at the top of every component file.

---

*Cedarce Technologies — Your Digital Business Buddy*
*Cedar + Commerce · Visibility · Automation · Scalability*
*Lagos, Nigeria · 2025*
*cedarce.ng · hello@cedarce.ng · @cedarce*
