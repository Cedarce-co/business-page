"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Zap } from "lucide-react";
import { useSession } from "next-auth/react";

type PromoVariant = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  accent: "sky" | "rose" | "emerald" | "amber";
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
  },
  {
    id: "gap",
    eyebrow: "The gap",
    title: "One digital setup away from where you should be",
    body: "We close that gap fast. Most clients go professional within 48 hours of kickoff.",
    cta: "Book free consultation",
    href: "/contact",
    accent: "rose",
  },
  {
    id: "look-the-part",
    eyebrow: "Credibility",
    title: "Big businesses didn't get big by looking small",
    body: "Get the website, invoicing, payments, and email your business deserves.",
    cta: "See packages",
    href: "/pricing",
    accent: "emerald",
  },
  {
    id: "compete",
    eyebrow: "Compete",
    title: "Your customers are online. Your competitors are too.",
    body: "The only question is: are you ready to compete? Start with a free account.",
    cta: "Create free account",
    href: "/signup",
    accent: "amber",
  },
  {
    id: "manual",
    eyebrow: "Systems",
    title: "Stop running a serious business on manual tools",
    body: "We set you up right and fast, with automation that saves time and wins trust.",
    cta: "Explore services",
    href: "/services",
    accent: "sky",
  },
  {
    id: "automation",
    eyebrow: "Automation",
    title: "Manual loses time. Outdated tools lose clients.",
    body: "We replace both with systems that work automatically while you focus on growth.",
    cta: "Let's get you professional",
    href: "/signup",
    accent: "rose",
  },
  {
    id: "trust",
    eyebrow: "Trust",
    title: "People hesitate when your story is hard to verify online",
    body: "Give them a site, business email, and receipts that say you mean business.",
    cta: "Talk to us",
    href: "/contact",
    accent: "emerald",
  },
  {
    id: "roi",
    eyebrow: "ROI",
    title: "Your website works around the clock",
    body: "Manual follow-ups don't. Stop leaving money on the table. Fix your digital presence.",
    cta: "Get set up in 48 hours",
    href: "/contact",
    accent: "amber",
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
  },
  {
    id: "request",
    eyebrow: "Grow revenue",
    title: "Add campaigns, invoicing, or apps",
    body: "Each request gets its own timeline. Grow without losing clarity.",
    cta: "Request a service",
    href: "/dashboard/request-service",
    accent: "rose",
  },
  {
    id: "pricing",
    eyebrow: "Upgrade",
    title: "Ready for the next tier?",
    body: "Invest once in setup and benefit every day after. Compare packages anytime.",
    cta: "View pricing",
    href: "/pricing",
    accent: "emerald",
  },
  {
    id: "consult",
    eyebrow: "Strategy",
    title: "Not sure what to add next?",
    body: "Book a short call. We'll map the best next step for your business.",
    cta: "Book consultation",
    href: "/contact",
    accent: "amber",
  },
];

const PROMO_POSITION =
  "bottom-4 left-4 w-[min(calc(100vw-2rem),36rem)] max-w-xl sm:bottom-5 sm:left-5 md:bottom-6 md:left-6";

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

const SLIDE_TRANSITIONS: MotionPreset[] = [
  {
    initial: { opacity: 0, x: 28 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -28 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, x: -28 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 28 },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, y: -18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 14 },
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, scale: 1.06 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 },
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, x: 16, rotate: 2 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    exit: { opacity: 0, x: -12, rotate: -2 },
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  {
    initial: { opacity: 0, filter: "blur(6px)", y: 8 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(4px)", y: -6 },
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  },
];

const VARIANT_CURSOR_KEY = "cedarce-promo-variant-cursor";

/** Resets on full page reload. */
let promoBlockedAfterNav = false;
let promoShownOnHomeThisLoad = false;
let servicesPromoUsedThisLoad = false;
let footerPromoUsedThisLoad = false;
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

const CEDARCE_GLASS_BG = "rgba(51, 65, 85, 0.12)"; /* #334155 */

const accentMap = {
  sky: {
    bar: "from-sky-400 to-blue-600",
    btn: "bg-sky-500 hover:bg-sky-400",
  },
  rose: {
    bar: "from-rose-400 to-rose-600",
    btn: "bg-rose-500 hover:bg-rose-400",
  },
  emerald: {
    bar: "from-emerald-400 to-emerald-700",
    btn: "bg-emerald-500 hover:bg-emerald-400",
  },
  amber: {
    bar: "from-amber-400 to-amber-600",
    btn: "bg-amber-500 hover:bg-amber-400",
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
  const [trigger, setTrigger] = useState<"services-exit" | "footer-up" | null>(null);
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

    let servicesWasVisible = false;
    let reachedFooterEnd = false;
    let lastScrollY = window.scrollY;

    const tryOpen = (kind: "services-exit" | "footer-up") => {
      if (kind === "services-exit" && servicesPromoUsedThisLoad) return;
      if (kind === "footer-up" && footerPromoUsedThisLoad) return;

      if (kind === "services-exit") servicesPromoUsedThisLoad = true;
      if (kind === "footer-up") footerPromoUsedThisLoad = true;

      const startIdx = nextVariantIndex(variants.length);
      setVariantIndex(startIdx);
      setEntranceStyleIndex((startIdx + (kind === "footer-up" ? 2 : 5)) % BANNER_ENTRANCES.length);
      setTrigger(kind);
      setVisible(true);
      markPromoShownOnHome();
    };

    const servicesEl = document.getElementById("home-services-section");
    let servicesObserver: IntersectionObserver | undefined;

    if (servicesEl) {
      servicesObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          if (entry.isIntersecting) {
            servicesWasVisible = true;
            return;
          }
          if (servicesWasVisible && entry.boundingClientRect.top < 0) {
            tryOpen("services-exit");
          }
        },
        { threshold: [0, 0.05, 0.15] },
      );
      servicesObserver.observe(servicesEl);
    }

    const footerEl = document.getElementById("site-footer");

    const syncFooterEnd = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const atDocumentBottom = scrollY >= maxScroll - 48;

      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        const footerEndVisible = rect.bottom <= window.innerHeight + 24 && rect.top < window.innerHeight;
        if (atDocumentBottom || footerEndVisible) {
          reachedFooterEnd = true;
        }
      } else if (atDocumentBottom) {
        reachedFooterEnd = true;
      }
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const scrollingUp = scrollY < lastScrollY - 2;

      syncFooterEnd();

      if (reachedFooterEnd && scrollingUp) {
        tryOpen("footer-up");
        reachedFooterEnd = false;
      }

      lastScrollY = scrollY;
    };

    syncFooterEnd();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      servicesObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome, variants.length, variantKey]);

  const bannerEntrance = BANNER_ENTRANCES[entranceStyleIndex % BANNER_ENTRANCES.length];
  const slideTransition = SLIDE_TRANSITIONS[variantIndex % SLIDE_TRANSITIONS.length];

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed z-[52] ${PROMO_POSITION}`}
          onPointerEnter={() => setRotatePaused(true)}
          onPointerLeave={() => setRotatePaused(false)}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-white/40 shadow-[0_20px_50px_rgba(15,23,42,0.14),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/25"
            style={glassPanelStyle()}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/18 via-white/4 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
              aria-hidden
            />

            <button
              type="button"
              onClick={dismiss}
              className="absolute right-2 top-2 z-20 rounded-xl border border-white/40 bg-white/12 p-2 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl transition hover:bg-white/22 md:right-3 md:top-3"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            </button>

            <motion.div
              initial={bannerEntrance.initial}
              animate={bannerEntrance.animate}
              exit={bannerEntrance.exit}
              transition={bannerEntrance.transition}
            >
              <Link
                href={active.href}
                onClick={() => setVisible(false)}
                className="relative z-10 block max-h-[min(48vh,26rem)] overflow-y-auto overscroll-y-contain p-4 pb-5 sm:p-5 md:max-h-none md:p-6"
              >
                <div
                  className={`mb-3 h-1 w-14 rounded-full bg-gradient-to-r ${accent.bar}`}
                  aria-hidden
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={slideTransition.initial}
                    animate={slideTransition.animate}
                    exit={slideTransition.exit}
                    transition={slideTransition.transition}
                  >
                    <p className="pr-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-800 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
                      {active.eyebrow}
                    </p>
                    <p className="mt-2 text-[17px] font-black leading-snug text-slate-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] sm:text-xl md:text-2xl md:leading-tight">
                      {active.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)] md:text-[15px]">
                      {active.body}
                    </p>

                    <span
                      className={`mt-5 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-md transition ${accent.btn}`}
                    >
                      {active.cta}
                    </span>
                    <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-700 md:text-xs">
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-500 md:h-4 md:w-4" />
                      Or tap anywhere on this card to continue
                    </p>
                  </motion.div>
                </AnimatePresence>
              </Link>

              <div className="relative z-10 flex items-center justify-between border-t border-white/25 px-4 py-2 md:px-5">
                <div className="flex gap-1">
                  {variants.map((v, i) => (
                    <span
                      key={v.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === variantIndex % variants.length ? "w-6 bg-slate-900" : "w-1.5 bg-slate-600/45"
                      }`}
                    />
                  ))}
                </div>
                <Zap className="h-4 w-4 text-amber-500 opacity-70" aria-hidden />
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
