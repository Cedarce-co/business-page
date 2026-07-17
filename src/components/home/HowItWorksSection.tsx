"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, Star, Zap } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { HOW_IT_WORKS } from "@/lib/constants";
import { HOW_IT_WORKS_IMAGES } from "@/lib/marketing-images";

const iconMap = { Calendar, Zap, Star };

/** Enyata “Our Process” pattern: stack on left, detail panel on right — no step photos */
export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = HOW_IT_WORKS[active]!;
  const Icon = iconMap[current.icon as keyof typeof iconMap] ?? Calendar;
  const image = HOW_IT_WORKS_IMAGES[active % HOW_IT_WORKS_IMAGES.length]!;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-black py-14 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="mt-4 font-display text-[1.85rem] leading-tight text-cedar-ivory sm:mt-5 sm:text-4xl lg:text-5xl">
              Three steps to going professional.
            </h2>
            <p className="mt-3 text-sm text-cedar-mist sm:mt-4 sm:text-lg">
              No complicated processes. No long waiting. Just results.
            </p>
          </div>
          <div className="hidden lg:block">
            <Button href="/signup" variant="accent" className="shrink-0">
              Start building
            </Button>
          </div>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-2.5 sm:space-y-3">
            {HOW_IT_WORKS.map((item, index) => {
              const ItemIcon = iconMap[item.icon as keyof typeof iconMap] ?? Calendar;
              const open = active === index;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition sm:rounded-3xl sm:px-5 sm:py-5 ${
                    open
                      ? "border-cedar-accent/35 bg-cedar-accentSoft"
                      : "border-white/10 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ItemIcon className={`h-5 w-5 ${open ? "text-cedar-accent" : "text-cedar-mist"}`} />
                    <h3 className={`text-base font-semibold sm:text-lg ${open ? "text-cedar-ivory" : "text-cedar-mist"}`}>
                      {item.title}
                    </h3>
                  </div>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        className="overflow-hidden lg:hidden"
                      >
                        <p className="mt-3 text-sm leading-relaxed text-cedar-mist">{item.desc}</p>
                        <div className="relative mt-4 h-36 overflow-hidden rounded-xl border border-white/10">
                          <Image
                            src={(HOW_IT_WORKS_IMAGES[index % HOW_IT_WORKS_IMAGES.length]!).src}
                            alt={(HOW_IT_WORKS_IMAGES[index % HOW_IT_WORKS_IMAGES.length]!).alt}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
          <div className="lg:hidden">
            <Button href="/signup" variant="accent" full>
              Start building
            </Button>
          </div>

          <div className="relative hidden min-h-[22rem] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 lg:sticky lg:top-[calc(var(--site-nav-height)+2rem)] lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.step}
                initial={reduced ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -12 }}
                transition={{ duration: 0.28 }}
                className="absolute inset-0 flex flex-col justify-end p-10"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />
                <div className="absolute inset-0 bg-cedar-accent/10 mix-blend-color" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cedar-accent text-black">
                  <Icon className="h-7 w-7" />
                </span>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">
                  Step {current.step}
                </p>
                <h3 className="mt-3 text-3xl font-bold text-cedar-ivory">{current.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-cedar-mist">{current.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
