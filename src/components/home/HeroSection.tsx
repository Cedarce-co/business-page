"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import { stagger, wordReveal } from "@/lib/animations";
import { HERO_BG_IMAGE } from "@/lib/marketing-images";

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
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

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1200px] items-center gap-14 px-4 pb-20 pt-36 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8 lg:pb-16 lg:pt-40">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="motion-safe:animate-breathe-soft flex max-w-2xl flex-col items-start rounded-3xl border border-white/10 bg-black/35 p-6 text-left backdrop-blur-md sm:p-8 lg:border-transparent lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
        >
          <motion.h1
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mt-8 font-display text-5xl leading-[1.05] tracking-tight text-cedar-ivory/95 sm:mt-10 sm:text-6xl lg:text-[4.85rem]"
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
            className="mt-8 max-w-xl text-lg leading-relaxed text-cedar-mist/90 sm:mt-10 sm:text-xl"
          >
            We combine websites, payments, invoicing, and business email into one professional setup
            so customers find you, trust you, and pay you faster.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-12"
          >
            <Button href="/signup" variant="accent" className="min-h-12 px-7">
              Get started
            </Button>
            <Button href="/contact" variant="ghost" className="min-h-12 px-0">
              Book free consultation
            </Button>
          </motion.div>
          <p className="pt-10 text-sm text-white/40 sm:pt-12">
            Trusted by food stores, pharmacies, churches, startups & more.
          </p>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none lg:self-center">
          <div className="relative h-[22rem] sm:h-[26rem] lg:h-[30rem]">
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
                className={`absolute w-[90%] overflow-hidden rounded-[1.75rem] border border-white/20 bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-[6px] sm:w-[86%] ${card.className}`}
              >
                <div className="flex">
                  <div className="flex w-[42%] flex-col justify-between bg-cedar-accent/70 px-4 py-5 text-black sm:px-5 sm:py-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Outcome</p>
                    <p className="text-3xl font-bold leading-none">{card.accent}</p>
                  </div>
                  <div className="flex flex-1 flex-col justify-center px-5 py-5 sm:px-6">
                    <p className="text-lg font-bold text-cedar-ivory/95 sm:text-xl">{card.title}</p>
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
