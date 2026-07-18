"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { TESTIMONIALS } from "@/lib/constants";
import { TESTIMONIAL_IMAGES } from "@/lib/marketing-images";

/** Enyata client-stories pattern: avatar rail + featured quote */
export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const item = TESTIMONIALS[active]!;

  return (
    <section className="bg-black py-14 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionLabel>Client stories</SectionLabel>
            <h2 className="mt-4 font-display text-[1.85rem] leading-tight text-cedar-ivory sm:mt-5 sm:text-4xl lg:text-5xl">
              Real businesses.
              <br />
              Real results.
            </h2>

            <div className="mt-8 flex items-center gap-2.5 overflow-x-auto pb-1 sm:gap-3">
              {TESTIMONIALS.map((t, index) => {
                const selected = active === index;
                const portrait = TESTIMONIAL_IMAGES[index];
                return (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show testimonial from ${t.name}`}
                    aria-pressed={selected}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 transition sm:h-14 sm:w-14 ${
                      selected
                        ? "scale-110 border-cedar-accent"
                        : "border-white/20 opacity-80 hover:border-white/40 hover:opacity-100"
                    }`}
                  >
                    {portrait ? (
                      <Image
                        src={portrait.src}
                        alt={portrait.alt}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-zinc-950 text-sm font-bold text-cedar-mist">
                        {t.name.slice(0, 1)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[14rem] rounded-[1.5rem] border border-white/10 bg-zinc-950 p-6 sm:min-h-[16rem] sm:rounded-[2rem] sm:p-10">
            <span
              aria-hidden
              className="font-display text-6xl leading-none text-cedar-accent/30 sm:text-7xl"
            >
              “
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={item.name}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="-mt-5 sm:-mt-6"
              >
                <p className="text-base leading-relaxed text-cedar-ivory sm:text-xl">{item.quote}</p>
                <p className="mt-6 text-base font-semibold text-cedar-ivory sm:mt-8">{item.name}</p>
                <p className="mt-1 text-sm text-cedar-mist">{item.role}</p>
                <div className="hidden sm:block">
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cedar-accent transition hover:gap-3"
                  >
                    Start your story
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
