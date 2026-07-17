"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { stagger, wordReveal } from "@/lib/animations";
import { HERO_BG_IMAGE } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

/** Floating tags sit on the visual side only — never over the copy */
const floating = [
  { label: "</> Setup", x: "62%", y: "12%" },
  { label: "Payments", x: "84%", y: "48%" },
  { label: "Support", x: "58%", y: "78%" },
];

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

export default function HeroSection() {
  const reduced = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [slide, setSlide] = useState(0);

  function onSnapScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (!width) return;
    setSlide(Math.round(el.scrollLeft / width));
  }

  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0" aria-hidden>
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
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 75% 35%, rgba(31,58,95,0.22), transparent 55%), radial-gradient(ellipse 45% 40% at 10% 85%, rgba(255,255,255,0.035), transparent 50%)",
        }}
      />

      {!reduced
        ? floating.map((item) => (
            <motion.span
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, -7, 0] }}
              transition={{
                opacity: { duration: 0.6 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="pointer-events-none absolute z-[1] hidden rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-cedar-ivory/90 backdrop-blur-md lg:inline-flex"
              style={{ left: item.x, top: item.y }}
            >
              {item.label}
            </motion.span>
          ))
        : null}

      {/* —— Mobile app hero —— */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-8 pt-28 lg:hidden">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cedar-accent">Cedarce</p>
          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-4 font-display text-[2.65rem] leading-[1.05] tracking-tight text-cedar-ivory"
          >
            {["Findable.", "Credible.", "Paid faster."].map((word) => (
              <motion.span key={word} variants={wordReveal} className="block">
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">
            Websites, payments, invoicing, and business email — one professional setup.
          </p>
        </motion.div>

        <div
          ref={scrollerRef}
          onScroll={onSnapScroll}
          className="snap-x-mandatory -mx-4 flex gap-3 overflow-x-auto px-4 pb-2"
          aria-label="Outcomes"
        >
          {outcomes.map((card) => (
            <article
              key={card.title}
              className="snap-start-center w-[82%] shrink-0 overflow-hidden rounded-[1.5rem] border border-white/15 bg-black/45 backdrop-blur-md"
            >
              <div className="flex min-h-[7.5rem]">
                <div className="flex w-[38%] flex-col justify-between bg-cedar-accent px-4 py-4 text-black">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Outcome</p>
                  <p className="text-3xl font-bold leading-none">{card.accent}</p>
                </div>
                <div className="flex flex-1 flex-col justify-center px-4 py-4">
                  <p className="text-base font-bold text-cedar-ivory">{card.title}</p>
                  <p className="mt-1 text-sm text-cedar-mist">{card.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
          {outcomes.map((card, i) => (
            <span
              key={card.accent}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === slide ? "w-5 bg-cedar-accent" : "w-1.5 bg-white/25",
              )}
            />
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-white/40">
          Trusted by food stores, pharmacies, churches & more
        </p>
      </div>

      {/* —— Desktop hero —— */}
      <div className="relative z-10 mx-auto hidden min-h-[100svh] w-full max-w-[1200px] grid-cols-[1.05fr_0.95fr] items-center gap-20 px-8 pb-16 pt-40 lg:grid">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="motion-safe:animate-breathe-soft flex max-w-2xl flex-col items-start"
        >
          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-8 font-display text-[4.85rem] leading-[1.05] tracking-tight text-cedar-ivory/95"
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
            className="mt-10 max-w-xl text-xl leading-relaxed text-cedar-mist/90"
          >
            We combine websites, payments, invoicing, and business email into one professional setup
            so customers find you, trust you, and pay you faster.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <Button href="/signup" variant="accent" className="min-h-12 px-7">
              Get started
            </Button>
            <Button href="/contact" variant="ghost" className="min-h-12 px-0">
              Book free consultation
            </Button>
          </motion.div>
          <p className="pt-12 text-sm text-white/40">
            Trusted by food stores, pharmacies, churches, startups & more.
          </p>
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
