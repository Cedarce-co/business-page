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
    <section className="bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionLabel>Client stories</SectionLabel>
            <h2 className="mt-5 font-display text-3xl leading-tight text-cedar-ivory sm:text-4xl lg:text-5xl">
              Real businesses.
              <br />
              Real results.
            </h2>
            <p className="mt-4 max-w-sm text-cedar-mist">
              Hear how owners moved from informal ops to a setup that looks and pays like a real company.
            </p>

            <div className="mt-10 flex items-center gap-3">
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
                    className={`relative h-14 w-14 overflow-hidden rounded-full border-2 transition ${
                      selected
                        ? "border-cedar-accent scale-110"
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

          <div className="relative min-h-[16rem] rounded-[2rem] border border-white/10 bg-zinc-950 p-8 sm:p-10">
            <span
              aria-hidden
              className="font-display text-7xl leading-none text-cedar-accent/30"
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
                className="-mt-6"
              >
                <p className="text-lg leading-relaxed text-cedar-ivory sm:text-xl">{item.quote}</p>
                <p className="mt-8 text-base font-semibold text-cedar-ivory">{item.name}</p>
                <p className="mt-1 text-sm text-cedar-mist">{item.role}</p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cedar-accent transition hover:gap-3"
                >
                  Start your story
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
