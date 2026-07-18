"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { stagger, wordReveal } from "@/lib/animations";
import { HERO_BG_IMAGE } from "@/lib/marketing-images";

const outcomes = [
  {
    title: "Website live",
    meta: "Customers find you first",
    accent: "01",
    className: "left-0 top-0 z-10 -rotate-2",
  },
  {
    title: "Invoice paid",
    meta: "Confirmed in real time",
    accent: "02",
    className: "left-[10%] top-[30%] z-20 rotate-[1.5deg]",
  },
  {
    title: "Business email",
    meta: "hello@yourbrand.com",
    accent: "03",
    className: "left-[2%] top-[58%] z-30 -rotate-1",
  },
];

const mobileHighlights = [
  { value: "48hrs", label: "Typical time from kickoff to professional" },
  { value: "90%+", label: "Mobile traffic ready" },
  { value: "24/7", label: "Self-serve checkout" },
  { value: "100%", label: "Profile completeness goal" },
];

export default function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 hidden lg:block" aria-hidden>
        <Image
          src={HERO_BG_IMAGE.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/38" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/48 via-black/22 to-black/10" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 75% 35%, rgba(31,58,95,0.22), transparent 55%), radial-gradient(ellipse 45% 40% at 10% 85%, rgba(255,255,255,0.035), transparent 50%)",
        }}
      />

      {/* Mobile welcome screen — follows a compact app-dashboard structure. */}
      <div className="relative z-10 min-h-[calc(100svh-var(--site-mobile-tab-height))] overflow-hidden bg-black px-3 pb-[calc(var(--site-mobile-tab-height)+1rem)] pt-5 lg:hidden">
        <Image
          src={HERO_BG_IMAGE.src}
          alt={HERO_BG_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/85" />

        <div className="relative flex min-h-[calc(100svh-var(--site-mobile-tab-height)-2.25rem)] flex-col pb-12">
          <p className="max-w-[13rem] font-display text-lg leading-tight tracking-tight text-cedar-ivory">
            Your business, ready online.
          </p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Business setup highlights"
            className="mt-auto grid grid-cols-2 gap-2"
          >
            {mobileHighlights.map((item) => (
              <div
                key={item.label}
                className="flex min-h-[6.25rem] min-w-0 flex-col items-center justify-center rounded-xl border border-white/15 bg-black/65 px-4 py-4 text-center backdrop-blur-md"
              >
                <p className="font-display text-2xl leading-none text-cedar-accent">
                  {item.value}
                </p>
                <p className="mt-2 max-w-[9rem] text-[11px] leading-snug text-white/75">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <div className="mt-7 flex justify-center">
            <Button
              href="/signup"
              variant="accent"
              className="min-h-12 w-1/2 gap-2 px-3 text-xs"
            >
              Get started for free
            </Button>
          </div>
        </div>
      </div>

      {/* —— Desktop hero —— */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] w-full max-w-[1200px] grid-cols-[1.05fr_0.95fr] items-center gap-20 px-8 pb-16 pt-40 lg:grid">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-[calc(100svh-14rem)] min-h-[30rem] max-h-[34rem] max-w-2xl flex-col items-start justify-between"
        >
          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="font-display text-[5.5rem] leading-[1.14] tracking-tight text-cedar-ivory/95"
          >
            {["Findable.", "Credible.", "Paid faster."].map((word) => (
              <motion.span key={word} variants={wordReveal} className="block">
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-xl text-xl leading-relaxed text-cedar-mist/90"
          >
            One connected setup for your website, payments, invoices, and business email.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Button href="/signup" variant="accent" className="min-h-12 px-7">
              Get started for free
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative w-full self-center">
          <div className="relative h-[30rem]">
            {outcomes.map((card, i) => (
              <motion.article
                key={card.title}
                initial={reduced ? false : { opacity: 0, y: 28, scale: 0.98 }}
                animate={
                  reduced
                    ? { opacity: 1, y: 0, scale: 1 }
                    : {
                        opacity: 1,
                        y: [0, -10, 0],
                        scale: 1,
                        transition: {
                          opacity: { delay: 0.2 + i * 0.12, duration: 0.55 },
                          scale: { delay: 0.2 + i * 0.12, duration: 0.55 },
                          y: {
                            delay: 0.9 + i * 0.25,
                            duration: 4.2 + i * 0.35,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        },
                      }
                }
                className={`absolute w-[86%] overflow-hidden rounded-[1.75rem] border border-white/20 bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-[6px] ${card.className}`}
              >
                <div className="flex">
                  <div className="flex w-[42%] flex-col justify-between bg-cedar-accent/70 px-5 py-6 text-black">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Outcome</p>
                    <p className="text-3xl font-bold leading-none">{card.accent}</p>
                  </div>
                  <div className="flex flex-1 flex-col justify-center px-6 py-5">
                    <p className="text-xl font-bold text-cedar-ivory/95">{card.title}</p>
                    <p className="mt-1 text-sm text-cedar-mist/85">{card.meta}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
