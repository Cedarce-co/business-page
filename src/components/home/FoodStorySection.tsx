"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { FOOD_STORY_STEPS } from "@/lib/constants";
import { storyImageAt } from "@/lib/marketing-images";

/** Enyata-style story: left copy + interactive stack, no per-step photos */
export default function FoodStorySection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const step = FOOD_STORY_STEPS[active]!;
  const image = storyImageAt(active);

  return (
    <section className="bg-zinc-950 py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="order-2 space-y-2 lg:order-1">
            {FOOD_STORY_STEPS.map((item, index) => {
              const open = active === index;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition sm:px-5 ${
                    open
                      ? "border-cedar-accent/40 bg-cedar-accentSoft"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      open ? "bg-cedar-accent text-black" : "bg-white/5 text-cedar-mist"
                    }`}
                  >
                    {item.step}
                  </span>
                  <span className={`font-semibold ${open ? "text-cedar-ivory" : "text-cedar-mist"}`}>
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="order-1 lg:sticky lg:top-[calc(var(--site-nav-height)+2rem)] lg:order-2">
            <SectionLabel>In action</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight text-cedar-ivory sm:text-4xl lg:text-5xl">
              From manual orders to a system that runs while you sleep.
            </h2>
            <p className="mt-4 text-lg text-cedar-mist">
              Real retail story: customers find you online, pay faster, and get receipts automatically.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={step.step}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black"
              >
                <div className="relative h-56">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 430px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cedar-accent">
                    Step {step.step} of {FOOD_STORY_STEPS.length}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-cedar-ivory">{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-cedar-mist">{step.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex gap-2">
              <Button
                type="button"
                variant="outlineLight"
                className="min-h-11 px-5"
                onClick={() => setActive((i) => Math.max(0, i - 1))}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="accent"
                className="min-h-11 px-5"
                onClick={() =>
                  setActive((i) => (i === FOOD_STORY_STEPS.length - 1 ? 0 : i + 1))
                }
              >
                {active === FOOD_STORY_STEPS.length - 1 ? "Replay" : "Next step"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
