/**
 * Real projects shown in the home page "Our work" section.
 *
 * The section stays hidden until this list has at least one entry, so the
 * live site never shows empty placeholders. Only add work you can show a
 * prospect on request.
 *
 * `image`: put screenshots in /public/work/ (e.g. "/work/justartng.jpg", ~1600×1000)
 *          or use a full https URL from an allowed image host.
 */
export type PortfolioItem = {
  name: string;
  /** One line: what the business is. */
  kind: string;
  /** One or two sentences: what we built and why it matters. */
  summary: string;
  /** What we set up, shown as tags (e.g. "Website", "3D gallery", "Business email"). */
  services: string[];
  url?: string;
  image?: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    name: "Royale Artelier",
    kind: "Fashion store",
    summary: "An online boutique with collections, search, wishlist, cart and prices in the shopper's currency.",
    services: ["Online store", "Product catalogue", "Multi-currency"],
    url: "https://royaleartelier.netlify.app/",
    image: "/work/royale-artelier.jpg",
  },
  {
    name: "LiGHT Incorporation",
    kind: "Engineering & technology group",
    summary: "A corporate site for a multi-division company, with packages, partner and careers pages, quote requests and client sign-in.",
    services: ["Corporate website", "Quote requests", "Client sign-in"],
    url: "https://lightincorporation.com/",
    image: "/work/light-incorporation.jpg",
  },
  {
    name: "Dripping Honey Treats",
    kind: "Bakery, Lagos",
    summary: "A menu and ordering site where customers browse collections, search treats and build an order in Naira.",
    services: ["Online ordering", "Menu & cart", "Events"],
    url: "https://drippinghoneytreats.com/",
    image: "/work/dripping-honey-treats.jpg",
  },
  {
    name: "Hues That Heal",
    kind: "Art exhibition",
    summary: "An event site for the Faith Art Exhibition 2.0 with free registration, a live countdown and venue details.",
    services: ["Event website", "Registration", "Countdown"],
    url: "https://huesthatheal.netlify.app/",
    image: "/work/hues-that-heal.jpg",
  },
];
