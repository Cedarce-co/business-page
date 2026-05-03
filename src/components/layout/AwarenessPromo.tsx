"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

const POSITION_SLOTS = [
  {
    id: "bottomCentre",
    wrapper:
      "bottom-6 left-1/2 w-[min(100%-2rem,36rem)] max-w-xl -translate-x-1/2 md:bottom-8",
    size: "compact" as const,
  },
  {
    id: "middleCentre",
    wrapper:
      "top-1/2 left-1/2 w-[min(100%-2rem,56rem)] max-w-4xl xl:max-w-5xl -translate-x-1/2 -translate-y-1/2",
    size: "prominent" as const,
  },
] as const;

const ROTATE_MS = 7000;
const PAGE_SHOW_DELAY_MS = 4200;
const RESHOW_AFTER_DISMISS_MS = 5 * 60 * 1000;

const accentMap = {
  sky: {
    bar: "from-sky-400 to-blue-600",
    btn: "bg-sky-600 hover:bg-sky-700",
    ring: "ring-sky-200/80",
    bg: "from-[#e8f4ff] to-white",
  },
  rose: {
    bar: "from-rose-400 to-rose-600",
    btn: "bg-rose-600 hover:bg-rose-700",
    ring: "ring-rose-200/80",
    bg: "from-[#fff1f2] to-white",
  },
  emerald: {
    bar: "from-emerald-400 to-emerald-700",
    btn: "bg-emerald-600 hover:bg-emerald-700",
    ring: "ring-emerald-200/80",
    bg: "from-[#ecfdf5] to-white",
  },
  amber: {
    bar: "from-amber-400 to-amber-600",
    btn: "bg-amber-600 hover:bg-amber-700",
    ring: "ring-amber-200/80",
    bg: "from-[#fffbeb] to-white",
  },
};

export default function AwarenessPromo() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const pathnameRef = useRef(pathname);
  const reshowAfterDismissRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const [slotIndex, setSlotIndex] = useState(0);
  /** Pause flash-card rotation while pointer is over the card */
  const [rotatePaused, setRotatePaused] = useState(false);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!visible) setRotatePaused(false);
  }, [visible]);

  const variants = useMemo(() => (session?.user?.id ? VARIANTS_AUTH : VARIANTS_GUEST), [session?.user?.id]);

  useEffect(() => {
    setVariantIndex(0);
  }, [session?.user?.id]);

  const active = variants[variantIndex % variants.length];
  const accent = accentMap[active?.accent ?? "sky"];
  const slot = POSITION_SLOTS[slotIndex % POSITION_SLOTS.length];
  const isProminent = slot.size === "prominent";

  useEffect(() => {
    if (reshowAfterDismissRef.current) {
      window.clearTimeout(reshowAfterDismissRef.current);
      reshowAfterDismissRef.current = null;
    }

    setVisible(false);

    const t = window.setTimeout(() => {
      setSlotIndex((i) => (i + 1) % POSITION_SLOTS.length);
      setVisible(true);
    }, PAGE_SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(t);
      if (reshowAfterDismissRef.current) {
        window.clearTimeout(reshowAfterDismissRef.current);
        reshowAfterDismissRef.current = null;
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (!visible || variants.length <= 1 || rotatePaused) return;
    const id = window.setInterval(() => {
      setVariantIndex((i) => (i + 1) % variants.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [visible, variants.length, rotatePaused]);

  const dismiss = (e: { preventDefault: () => void; stopPropagation: () => void }) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);

    const pathWhenDismissed = pathnameRef.current;
    if (reshowAfterDismissRef.current) {
      window.clearTimeout(reshowAfterDismissRef.current);
    }
    reshowAfterDismissRef.current = window.setTimeout(() => {
      reshowAfterDismissRef.current = null;
      if (pathnameRef.current !== pathWhenDismissed) return;
      setSlotIndex((i) => (i + 1) % POSITION_SLOTS.length);
      setVisible(true);
    }, RESHOW_AFTER_DISMISS_MS);
  };

  if (!active) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={`${pathname}-${slot.id}-${slotIndex}`}
          role="dialog"
          aria-label="Announcement"
          aria-live="polite"
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.94 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className={`fixed z-[52] ${slot.wrapper}`}
          onPointerEnter={() => setRotatePaused(true)}
          onPointerLeave={() => setRotatePaused(false)}
        >
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br ${accent.bg} shadow-[0_24px_80px_rgba(15,23,42,0.18)] ring-1 ${accent.ring} ${isProminent ? "md:shadow-[0_32px_100px_rgba(15,23,42,0.22)]" : ""}`}
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-2 top-2 z-20 rounded-lg border border-slate-200/90 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900 md:right-3 md:top-3"
              aria-label="Dismiss"
            >
              <X className={`${isProminent ? "h-5 w-5" : "h-4 w-4"} md:h-[18px] md:w-[18px]`} />
            </button>

            <Link
              href={active.href}
              onClick={() => setVisible(false)}
              className={`block max-h-[min(48vh,26rem)] overflow-y-auto overscroll-y-contain pb-5 sm:pb-5 md:max-h-none ${
                isProminent
                  ? "p-5 sm:p-7 md:p-9 lg:p-10"
                  : "p-4 pb-5 sm:p-5 md:p-6"
              }`}
            >
              <div
                className={`mb-3 rounded-full bg-gradient-to-r ${accent.bar} ${isProminent ? "h-1.5 w-20 md:w-24" : "h-1 w-14"}`}
                aria-hidden
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    className={`pr-10 font-semibold uppercase tracking-[0.2em] text-slate-600 ${isProminent ? "text-xs md:text-sm" : "text-[11px]"}`}
                  >
                    {active.eyebrow}
                  </p>
                  <p
                    className={`mt-2 font-black leading-snug text-slate-900 ${isProminent ? "text-xl sm:text-2xl md:text-3xl lg:text-4xl md:leading-[1.15]" : "text-[17px] sm:text-xl md:text-2xl md:leading-tight"}`}
                  >
                    {active.title}
                  </p>
                  <p
                    className={`mt-3 leading-relaxed text-slate-700 ${isProminent ? "text-base md:text-lg lg:text-xl" : "text-sm md:text-[15px]"}`}
                  >
                    {active.body}
                  </p>

                  <span
                    className={`mt-5 inline-flex items-center justify-center rounded-xl font-bold text-white shadow-md transition ${accent.btn} ${isProminent ? "px-8 py-3.5 text-base md:px-10 md:py-4 md:text-lg" : "px-5 py-2.5 text-sm"}`}
                  >
                    {active.cta}
                  </span>
                  <p
                    className={`mt-3 flex items-center gap-1.5 text-slate-500 ${isProminent ? "text-xs md:text-sm" : "text-[11px] md:text-xs"}`}
                  >
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-500 md:h-4 md:w-4" />
                    Or tap anywhere on this card to continue
                  </p>
                </motion.div>
              </AnimatePresence>
            </Link>

            <div
              className={`flex items-center justify-between border-t border-slate-200/60 bg-white/40 px-4 py-2 md:px-5 ${isProminent ? "md:py-3 md:px-7" : ""}`}
            >
              <div className="flex gap-1">
                {variants.map((v, i) => (
                  <span
                    key={v.id}
                    className={`h-1.5 rounded-full transition-all ${
                      i === variantIndex % variants.length ? "w-6 bg-slate-800" : "w-1.5 bg-slate-300"
                    }`}
                  />
                ))}
              </div>
              <Zap className={`text-amber-500 opacity-70 ${isProminent ? "h-5 w-5" : "h-4 w-4"}`} aria-hidden />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
