/** Curated free Unsplash images for business, technology, and commerce. */

function unsplash(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

/** Hero backgrounds. preserve full frame, avoid server-side crop */
function unsplashHero(id: string, w = 1920) {
  return `https://images.unsplash.com/${id}?auto=format&fit=max&w=${w}&q=80`;
}

export type MarketingImage = {
  src: string;
  alt: string;
};

/** User-curated retail & business portraits (free Unsplash license) */
export const SHOP_COUNTER_IMAGE: MarketingImage = {
  src: unsplash("photo-1687422808311-a776f467a468", 1600),
  alt: "Businesswoman in her small shop",
};

export const STORE_SHELF_IMAGE: MarketingImage = {
  src: unsplash("photo-1701241284324-9afefe58e53b", 1600),
  alt: "Business owner standing in front of a store shelf",
};

export const PAYMENTS_PHONE_IMAGE: MarketingImage = {
  src: unsplash("photo-1758519291442-6a34815b0ae3", 1600),
  alt: "Business owner paying online with a credit card and smartphone",
};

export const MOBILE_BUSINESS_IMAGE: MarketingImage = {
  src: unsplash("photo-1680878903102-92692799ef36", 1600),
  alt: "Woman in a green dress using her smartphone for business",
};

export const TEAM_PORTRAIT_IMAGE: MarketingImage = {
  src: unsplash("photo-1589483232748-515c025575bc", 1600),
  alt: "Three women business owners smiling together",
};

export const RETAIL_PORTRAIT_IMAGE: MarketingImage = {
  src: unsplash("photo-1559839734-2b71ea197ec2", 1600),
  alt: "Smiling businesswoman wearing a scarf and sunglasses",
};

/** Former hero candidates. reused across story / outcomes (not on home hero) */
export const HERO_LAPTOP_PHONE_IMAGE: MarketingImage = {
  src: unsplash("photo-1634313946050-3fefb86a710b", 1600),
  alt: "Man working on a laptop while using his phone",
};

export const HERO_COUPLE_IMAGE: MarketingImage = {
  src: unsplash("photo-1739289696453-2b98ba584f59", 1600),
  alt: "Couple of business owners standing together",
};

export const HERO_STORE_WOMEN_IMAGE: MarketingImage = {
  src: unsplash("photo-1579998120708-682dd8a5624f", 1600),
  alt: "Small fruit business serving customers",
};

/** Static home hero background (woman with phone / blue sky) */
export const HERO_BG_IMAGE: MarketingImage = {
  src: unsplashHero("photo-1719492172750-4ca0809345b8"),
  alt: "Woman using her phone beside the water",
};

/** Outcome strip under the hero */
export const OUTCOME_IMAGES: MarketingImage[] = [
  PAYMENTS_PHONE_IMAGE,
  HERO_LAPTOP_PHONE_IMAGE,
  STORE_SHELF_IMAGE,
];

/** Client story avatar portraits (matches TESTIMONIALS order) */
export const TESTIMONIAL_IMAGES: MarketingImage[] = [
  HERO_COUPLE_IMAGE,
  MOBILE_BUSINESS_IMAGE,
  STORE_SHELF_IMAGE,
];

/** Case-study / in-action story steps (cycles if more steps than images) */
export const STORY_IMAGES: MarketingImage[] = [
  HERO_COUPLE_IMAGE,
  PAYMENTS_PHONE_IMAGE,
  MOBILE_BUSINESS_IMAGE,
  {
    src: unsplash("photo-1579998120708-682dd8a5624f", 900),
    alt: "Customers visiting a fruit seller",
  },
  {
    src: unsplash("photo-1501250987900-211872d97eaa", 900),
    alt: "Business owner working online",
  },
  {
    src: unsplash("photo-1641759261047-de431b849bd5", 900),
    alt: "Two young professionals working at a laptop",
  },
  {
    src: unsplash("photo-1635766828498-49dec8c0cc56", 900),
    alt: "Colleagues reviewing digital work",
  },
  {
    src: unsplash("photo-1765584830084-eb3d2268b263", 900),
    alt: "Food entrepreneur serving customers",
  },
  {
    src: unsplash("photo-1739303987830-ca19742b19bc", 900),
    alt: "Businesswomen managing work on their laptops",
  },
  {
    src: unsplash("photo-1658402834638-c6f65944b551", 900),
    alt: "Market porter moving goods through a busy market",
  },
];

/** How it works */
export const HOW_IT_WORKS_IMAGES: MarketingImage[] = [
  {
    src: unsplash("photo-1635766828498-49dec8c0cc56", 900),
    alt: "Business consultation between colleagues",
  },
  {
    src: unsplash("photo-1739301674182-452a0f2b14dd", 900),
    alt: "Team building a digital service together",
  },
  {
    src: unsplash("photo-1544813813-2c73bec209ca", 900),
    alt: "Professional smiling at completed digital work",
  },
];

export const FINAL_CTA_IMAGE: MarketingImage = {
  src: unsplash("photo-1739302750702-e26a61113758", 1600),
  alt: "Business team working together",
};

export const ABOUT_HERO_IMAGE: MarketingImage = {
  src: unsplash("photo-1739301674182-452a0f2b14dd", 1600),
  alt: "Team collaborating around a laptop",
};

export const SERVICES_HERO_IMAGE: MarketingImage = {
  src: unsplash("photo-1635766828498-49dec8c0cc56", 1600),
  alt: "Professionals discussing a business strategy",
};

export const PRICING_HERO_IMAGE: MarketingImage = PAYMENTS_PHONE_IMAGE;

export const CONTACT_HERO_IMAGE: MarketingImage = TEAM_PORTRAIT_IMAGE;

export const FAQ_HERO_IMAGE: MarketingImage = RETAIL_PORTRAIT_IMAGE;

export const AUTH_PANEL_IMAGE: MarketingImage = MOBILE_BUSINESS_IMAGE;

export const PRODUCT_HERO_IMAGE: MarketingImage = {
  src: unsplash("photo-1547860664-b8537ca5f833", 1600),
  alt: "Software professional developing a digital service",
};

/** Product / solution catalog card imagery */
export const CATALOG_CARD_IMAGES: Record<string, MarketingImage> = {
  "website-landing-pages": {
    src: unsplash("photo-1547860664-b8537ca5f833", 900),
    alt: "Developer building a website",
  },
  "domain-hosting": {
    src: unsplash("photo-1501250987900-211872d97eaa", 900),
    alt: "Technology professional working online",
  },
  "business-email": {
    src: unsplash("photo-1641759261047-de431b849bd5", 900),
    alt: "Colleagues working together on a laptop",
  },
  "payments-integration": PAYMENTS_PHONE_IMAGE,
  "invoicing-receipts": HERO_LAPTOP_PHONE_IMAGE,
  "bulk-messaging": MOBILE_BUSINESS_IMAGE,
  "marketing-setup": {
    src: unsplash("photo-1739302750702-e26a61113758", 900),
    alt: "Team planning digital marketing around a laptop",
  },
  "staff-training": {
    src: unsplash("photo-1739301674182-452a0f2b14dd", 900),
    alt: "Professionals learning together around a laptop",
  },
  integrations: {
    src: unsplash("photo-1547860664-b8537ca5f833", 900),
    alt: "Software engineer configuring digital systems",
  },
  "self-employed": {
    src: unsplash("photo-1544813813-2c73bec209ca", 900),
    alt: "Independent professional working from an office",
  },
  "micro-businesses": STORE_SHELF_IMAGE,
  smes: {
    src: unsplash("photo-1739302750702-e26a61113758", 900),
    alt: "Growing team collaborating on business strategy",
  },
  associations: TEAM_PORTRAIT_IMAGE,
  "business-launch-setup": {
    src: unsplash("photo-1635766828498-49dec8c0cc56", 900),
    alt: "Business partners reviewing a launch plan",
  },
  "brand-and-automation": {
    src: unsplash("photo-1739303987830-ca19742b19bc", 900),
    alt: "Businesswomen reviewing their brand systems",
  },
};

/** Category → image for marketing detail page heroes */
export const DETAIL_HERO_BY_CATEGORY: Record<string, MarketingImage> = {
  product: {
    src: unsplash("photo-1547860664-b8537ca5f833", 1600),
    alt: "Software professional building digital services",
  },
  solution: {
    src: unsplash("photo-1739302750702-e26a61113758", 1600),
    alt: "Business team discussing practical setups",
  },
  pricing: {
    src: unsplash("photo-1501250987900-211872d97eaa", 1600),
    alt: "Entrepreneur planning a digital business investment",
  },
  service: {
    src: unsplash("photo-1473445556807-e1b8c521d109", 1600),
    alt: "Professional ready to grow his business",
  },
};

export function storyImageAt(index: number): MarketingImage {
  return STORY_IMAGES[index % STORY_IMAGES.length]!;
}
