"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { promoShellMotion } from "@/lib/animations";
import { cn } from "@/lib/utils";
import {
  FINAL_CTA_IMAGE,
  HERO_BG_IMAGE,
  HERO_COUPLE_IMAGE,
  HERO_LAPTOP_PHONE_IMAGE,
  HERO_STORE_WOMEN_IMAGE,
  MOBILE_BUSINESS_IMAGE,
  PAYMENTS_PHONE_IMAGE,
  STORE_SHELF_IMAGE,
  TEAM_PORTRAIT_IMAGE,
  type MarketingImage,
} from "@/lib/marketing-images";

type PromoVariant = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  accent: "sky" | "rose" | "emerald" | "amber";
  image: MarketingImage;
};

const VARIANTS_GUEST: PromoVariant[] = [
  {
    id: "findability",
    eyebrow: "Findability",
    title: "Your business is open. Is it findable?",
    body: "We build the website, email, and payment stack that puts you on the map, professionally.",
    cta: "Go Pro Today",
    href: "/signup",
    accent: "sky",
    image: HERO_LAPTOP_PHONE_IMAGE,
  },
  {
    id: "gap",
    eyebrow: "The gap",
    title: "One digital setup away from where you should be",
    body: "We close that gap fast. Most clients go professional within 48 hours of kickoff.",
    cta: "Book free consultation",
    href: "/contact",
    accent: "rose",
    image: HERO_BG_IMAGE,
  },
  {
    id: "look-the-part",
    eyebrow: "Credibility",
    title: "Big businesses didn't get big by looking small",
    body: "Get the website, invoicing, payments, and email your business deserves.",
    cta: "See packages",
    href: "/pricing",
    accent: "emerald",
    image: HERO_COUPLE_IMAGE,
  },
  {
    id: "compete",
    eyebrow: "Compete",
    title: "Your customers are online. Your competitors are too.",
    body: "The only question is: are you ready to compete? Start with a free account.",
    cta: "Create free account",
    href: "/signup",
    accent: "amber",
    image: PAYMENTS_PHONE_IMAGE,
  },
  {
    id: "manual",
    eyebrow: "Systems",
    title: "Stop running a serious business on manual tools",
    body: "We set you up right and fast, with automation that saves time and wins trust.",
    cta: "Explore services",
    href: "/solutions",
    accent: "sky",
    image: STORE_SHELF_IMAGE,
  },
  {
    id: "automation",
    eyebrow: "Automation",
    title: "Manual loses time. Outdated tools lose clients.",
    body: "We replace both with systems that work automatically while you focus on growth.",
    cta: "Let's get you professional",
    href: "/signup",
    accent: "rose",
    image: MOBILE_BUSINESS_IMAGE,
  },
  {
    id: "trust",
    eyebrow: "Trust",
    title: "People hesitate when your story is hard to verify online",
    body: "Give them a site, business email, and receipts that say you mean business.",
    cta: "Talk to us",
    href: "/contact",
    accent: "emerald",
    image: TEAM_PORTRAIT_IMAGE,
  },
  {
    id: "roi",
    eyebrow: "ROI",
    title: "Your website works around the clock",
    body: "Manual follow-ups don't. Stop leaving money on the table. Fix your digital presence.",
    cta: "Get set up in 48 hours",
    href: "/contact",
    accent: "amber",
    image: HERO_STORE_WOMEN_IMAGE,
  },
];

const VARIANTS_AUTH: PromoVariant[] = [
  {
    id: "dash",
    eyebrow: "Your portal",
    title: "Keep building your professional stack",
    body: "Track requests, verification, and delivery. Add new scope whenever you're ready to scale.",
    cta: "Open dashboard",
    href: "/dashboard",
    accent: "sky",
    image: FINAL_CTA_IMAGE,
  },
  {
    id: "request",
    eyebrow: "Grow revenue",
    title: "Add campaigns, invoicing, or apps",
    body: "Each request gets its own timeline. Grow without losing clarity.",
    cta: "Request a service",
    href: "/dashboard/request-service",
    accent: "rose",
    image: PAYMENTS_PHONE_IMAGE,
  },
  {
    id: "pricing",
    eyebrow: "Upgrade",
    title: "Ready for the next tier?",
    body: "Invest once in setup and benefit every day after. Compare packages anytime.",
    cta: "View pricing",
    href: "/pricing",
    accent: "emerald",
    image: STORE_SHELF_IMAGE,
  },
  {
    id: "consult",
    eyebrow: "Strategy",
    title: "Not sure what to add next?",
    body: "Book a short call. We'll map the best next step for your business.",
    cta: "Book consultation",
    href: "/contact",
    accent: "amber",
    image: TEAM_PORTRAIT_IMAGE,
  },
];

const PROMO_POSITION =
  "bottom-[calc(var(--site-mobile-tab-height)+0.55rem)] left-2.5 right-auto w-[min(calc(100vw-6.75rem),13.75rem)] sm:left-5 sm:w-[min(calc(100vw-6rem),17rem)] lg:bottom-6 lg:left-6 lg:w-[19rem] xl:w-[21rem]";

const ROTATE_MS = 3000;

type MotionPreset = {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  exit: Record<string, number | string>;
  transition:
    | { type: "spring"; stiffness: number; damping: number }
    | { duration: number; ease: [number, number, number, number] };
};

const BANNER_ENTRANCES: MotionPreset[] = [
  {
    initial: { opacity: 0, y: 48, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 32, scale: 0.94 },
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
  {
    initial: { opacity: 0, y: -36, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.96 },
    transition: { type: "spring", stiffness: 360, damping: 26 },
  },
  {
    initial: { opacity: 0, x: 72, scale: 0.96 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 48, scale: 0.97 },
    transition: { type: "spring", stiffness: 340, damping: 30 },
  },
  {
    initial: { opacity: 0, x: -72, scale: 0.96 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -48, scale: 0.97 },
    transition: { type: "spring", stiffness: 340, damping: 30 },
  },
  {
    initial: { opacity: 0, scale: 0.72 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.88 },
    transition: { type: "spring", stiffness: 420, damping: 24 },
  },
  {
    initial: { opacity: 0, scale: 0.88, rotate: -3 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.92, rotate: 2 },
    transition: { type: "spring", stiffness: 380, damping: 28 },
  },
  {
    initial: { opacity: 0, y: 24, scale: 1.04 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 16, scale: 1.02 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, filter: "blur(10px)", scale: 1.02 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(6px)", scale: 0.98 },
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
];

const VARIANT_CURSOR_KEY = "cedarce-promo-variant-cursor";

/** Resets on full page reload. */
let promoBlockedAfterNav = false;
let promoShownOnHomeThisLoad = false;
let liveChatPromoUsedThisLoad = false;
let promoVariantCursor = 0;

function readVariantCursor() {
  if (typeof window === "undefined") return 0;
  const stored = window.sessionStorage.getItem(VARIANT_CURSOR_KEY);
  const n = stored ? Number.parseInt(stored, 10) : 0;
  promoVariantCursor = Number.isFinite(n) ? n : 0;
  return promoVariantCursor;
}

function persistVariantCursor() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(VARIANT_CURSOR_KEY, String(promoVariantCursor));
}

function nextVariantIndex(length: number) {
  const idx = promoVariantCursor % length;
  promoVariantCursor += 1;
  persistVariantCursor();
  return idx;
}

function markPromoShownOnHome() {
  promoShownOnHomeThisLoad = true;
}

const CEDARCE_GLASS_BG = "rgba(8, 8, 8, 0.96)";

const accentMap = {
  sky: {
    bar: "from-cedar-accent to-cedar-accent/40",
    btn: "bg-cedar-accent text-black hover:brightness-110",
  },
  rose: {
    bar: "from-cedar-accent to-cedar-accent/40",
    btn: "bg-cedar-accent text-black hover:brightness-110",
  },
  emerald: {
    bar: "from-cedar-accent to-cedar-accent/40",
    btn: "bg-cedar-accent text-black hover:brightness-110",
  },
  amber: {
    bar: "from-cedar-accent to-cedar-accent/40",
    btn: "bg-cedar-accent text-black hover:brightness-110",
  },
};

function glassPanelStyle(): CSSProperties {
  return {
    WebkitBackdropFilter: "blur(88px) saturate(240%)",
    backdropFilter: "blur(88px) saturate(240%)",
    backgroundColor: CEDARCE_GLASS_BG,
  };
}

export default function AwarenessPromo() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { data: session } = useSession();
  const [visible, setVisible] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [trigger, setTrigger] = useState<"live-chat" | null>(null);
  const [entranceStyleIndex, setEntranceStyleIndex] = useState(0);
  const [rotatePaused, setRotatePaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    readVariantCursor();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) setRotatePaused(false);
  }, [visible]);

  const variants = useMemo(() => (session?.user?.id ? VARIANTS_AUTH : VARIANTS_GUEST), [session?.user?.id]);
  const variantKey = session?.user?.id ? "auth" : "guest";

  const active = variants[variantIndex % variants.length];
  const accent = accentMap[active?.accent ?? "sky"];

  useEffect(() => {
    if (pathname !== "/" && promoShownOnHomeThisLoad) {
      promoBlockedAfterNav = true;
    }
  }, [pathname]);

  useEffect(() => {
    if (!isHome || promoBlockedAfterNav) {
      setTrigger(null);
      setVisible(false);
      return;
    }

    const tryOpen = () => {
      if (liveChatPromoUsedThisLoad) return;
      liveChatPromoUsedThisLoad = true;

      const startIdx = nextVariantIndex(variants.length);
      setVariantIndex(startIdx);
      setEntranceStyleIndex(startIdx % BANNER_ENTRANCES.length);
      setTrigger("live-chat");
      setVisible(true);
      markPromoShownOnHome();
    };

    const sectionEl = document.getElementById("home-section-live-chat");
    let sectionObserver: IntersectionObserver | undefined;

    if (sectionEl) {
      sectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          if (entry.intersectionRatio >= 0.2) {
            tryOpen();
          }
        },
        { threshold: [0, 0.15, 0.2, 0.35, 0.5] },
      );
      sectionObserver.observe(sectionEl);
    }

    return () => {
      sectionObserver?.disconnect();
    };
  }, [isHome, variants.length, variantKey]);

  const bannerEntrance = BANNER_ENTRANCES[entranceStyleIndex % BANNER_ENTRANCES.length];

  useEffect(() => {
    if (!visible || variants.length <= 1 || rotatePaused) return;
    const id = window.setInterval(() => {
      setVariantIndex((i) => {
        const next = (i + 1) % variants.length;
        promoVariantCursor += 1;
        persistVariantCursor();
        return next;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [visible, variants.length, rotatePaused]);

  const dismiss = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
  };

  if (!mounted || !isHome || !active) return null;
  if (promoBlockedAfterNav && !visible) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={trigger ?? "promo"}
          role="dialog"
          aria-label="Announcement"
          aria-live="polite"
          initial={promoShellMotion.initial}
          animate={promoShellMotion.animate}
          exit={promoShellMotion.exit}
          transition={promoShellMotion.transition}
          className={`fixed z-[52] ${PROMO_POSITION}`}
          onPointerEnter={() => setRotatePaused(true)}
          onPointerLeave={() => setRotatePaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl rounded-bl-none border border-b-0 border-white/15 bg-black shadow-elegant ring-1 ring-white/10 sm:rounded-3xl sm:rounded-bl-none">
            {/* Mobile: compact card with visible photo header */}
            <div className="lg:hidden">
              <div className="relative h-[5.25rem] overflow-hidden bg-zinc-900">
                <Image
                  src={active.image.src}
                  alt=""
                  fill
                  priority
                  sizes="220px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.bar}`} />
                <button
                  type="button"
                  onClick={dismiss}
                  className="absolute right-1.5 top-1.5 z-20 rounded-full border border-white/15 bg-black/60 p-1 text-cedar-ivory backdrop-blur-sm"
                  aria-label="Dismiss"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <Link
                href={active.href}
                onClick={() => setVisible(false)}
                className="block px-3 pb-3 pt-2.5"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cedar-accent">
                  {active.eyebrow}
                </p>
                <p className="mt-1 text-[13px] font-semibold leading-snug text-cedar-ivory">
                  {active.title}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/70">{active.body}</p>
                <span
                  className={`mt-2.5 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-[11px] font-semibold ${accent.btn}`}
                >
                  {active.cta}
                </span>
              </Link>
              <div className="flex items-center justify-between border-t border-white/10 px-3 py-1.5">
                <div className="flex gap-1">
                  {variants.map((v, i) => (
                    <span
                      key={v.id}
                      className={`h-1 rounded-full transition-all ${
                        i === variantIndex % variants.length ? "w-3.5 bg-cedar-accent" : "w-1 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
                <Zap className="h-3 w-3 text-cedar-accent opacity-70" aria-hidden />
              </div>
            </div>

            {/* Desktop: full-bleed background image */}
            <div className="relative hidden min-h-[28rem] xl:min-h-[30rem] lg:block">
            <div className="absolute inset-0 bg-black" aria-hidden />

            {variants.map((variant, i) => (
              <div
                key={variant.id}
                aria-hidden={i !== variantIndex % variants.length}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  i === variantIndex % variants.length ? "z-[1] opacity-100" : "z-0 opacity-0",
                )}
              >
                <Image
                  src={variant.image.src}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="416px"
                  className="object-cover object-center"
                />
              </div>
            ))}

            <div
              className="pointer-events-none absolute inset-0 z-[2] bg-black/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/55 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-br from-black/25 via-transparent to-black/20"
              aria-hidden
            />
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 z-[3] h-1 bg-gradient-to-r ${accent.bar}`}
              aria-hidden
            />

            <button
              type="button"
              onClick={dismiss}
              className="absolute right-2 top-2 z-20 rounded-full border border-white/15 bg-black/50 p-2 text-cedar-ivory backdrop-blur-sm transition hover:bg-black/70 md:right-3 md:top-3"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            </button>

            <motion.div
              className="relative z-10 flex min-h-[28rem] flex-col xl:min-h-[30rem]"
              initial={bannerEntrance.initial}
              animate={bannerEntrance.animate}
              exit={bannerEntrance.exit}
              transition={bannerEntrance.transition}
            >
              <Link
                href={active.href}
                onClick={() => setVisible(false)}
                className="relative z-10 flex flex-1 flex-col overflow-hidden pt-24"
              >
                {variants.map((variant, i) => {
                  const isActive = i === variantIndex % variants.length;
                  const slideAccent = accentMap[variant.accent];
                  return (
                    <div
                      key={variant.id}
                      aria-hidden={!isActive}
                      className={cn(
                        "absolute inset-x-0 bottom-0 px-6 pb-5 transition-opacity duration-500 ease-in-out",
                        isActive ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none",
                      )}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cedar-accent">
                        {variant.eyebrow}
                      </p>
                      <p className="mt-2 text-[1.35rem] font-semibold leading-tight text-cedar-ivory">
                        {variant.title}
                      </p>
                      <p className="mt-4 text-[0.95rem] leading-7 text-white/80">{variant.body}</p>
                      <span
                        className={`motion-safe:animate-breathe mt-6 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold shadow-lg transition motion-safe:hover:[animation-play-state:paused] ${slideAccent.btn}`}
                      >
                        {variant.cta}
                      </span>
                    </div>
                  );
                })}
              </Link>

              <div
                className="relative z-10 flex items-center justify-between border-t border-white/10 px-6 py-3 backdrop-blur-md"
                style={glassPanelStyle()}
              >
                <div className="flex gap-1">
                  {variants.map((v, i) => (
                    <span
                      key={v.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === variantIndex % variants.length ? "w-6 bg-cedar-accent" : "w-1.5 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
                <Zap className="h-4 w-4 text-cedar-accent opacity-70" aria-hidden />
              </div>
            </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
