"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Calendar, Star, Zap } from "lucide-react";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Reveal from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import { HOW_IT_WORKS } from "@/lib/constants";
import { HOW_IT_WORKS_IMAGES } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

const iconMap = { Calendar, Zap, Star };
const EASE = [0.22, 1, 0.36, 1] as const;

function Step({
  index,
  active,
  onActive,
}: {
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const item = HOW_IT_WORKS[index]!;
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Calendar;

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="relative pl-16 sm:pl-20 lg:min-h-[min(40vh,22rem)] lg:py-8">
      <span
        className={cn(
          "absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl text-base font-semibold transition duration-500 sm:h-14 sm:w-14 lg:top-8",
          active ? "btn-sheen bg-g-button text-white shadow-glow" : "border border-line bg-white text-slate-400",
        )}
      >
        {String(item.step).padStart(2, "0")}
      </span>
      <motion.div
        animate={{ opacity: active ? 1 : 0.45 }}
        transition={{ duration: 0.4 }}
        className="pb-12 lg:pb-0"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
          <Icon className="h-4 w-4" aria-hidden />
          Step {item.step}
        </span>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-brand-950 sm:text-3xl lg:text-4xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">{item.desc}</p>
      </motion.div>
    </div>
  );
}

/** Scroll-driven timeline: line fills as you scroll, sticky visual follows the active step. */
export default function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const image = HOW_IT_WORKS_IMAGES[active % HOW_IT_WORKS_IMAGES.length]!;
  const current = HOW_IT_WORKS[active]!;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-mesh-light" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel>How it works</SectionLabel>
          </Reveal>
          <AnimatedHeadline
            text={"Three simple steps\nto get *set up.*"}
            className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-brand-950 sm:text-5xl lg:text-[4rem]"
          />
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <div ref={listRef} className="relative">
            <div aria-hidden className="absolute bottom-12 left-6 top-0 w-px bg-line sm:left-7 lg:bottom-8 lg:top-8" />
            <motion.div
              aria-hidden
              style={{ scaleY: reduced ? 1 : scaleY }}
              className="absolute bottom-12 left-6 top-0 w-px origin-top bg-gradient-to-b from-brand-400 to-brand-700 sm:left-7 lg:bottom-8 lg:top-8"
            />
            {HOW_IT_WORKS.map((item, index) => (
              <Step key={item.step} index={index} active={active === index} onActive={setActive} />
            ))}
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-[calc(var(--site-nav-height)+2rem)] h-[32rem] overflow-hidden rounded-[2.25rem] shadow-lift">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.step}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image src={image.src} alt={image.alt} fill sizes="560px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-brand-700/45 mix-blend-color" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-900/20 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.step}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="glass-blue rounded-3xl p-6 text-white"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
                        Step {current.step} of {HOW_IT_WORKS.length}
                      </p>
                      <div className="flex gap-1.5">
                        {HOW_IT_WORKS.map((s, i) => (
                          <span
                            key={s.step}
                            className={cn("h-1.5 rounded-full transition-all duration-500", i === active ? "w-6 bg-white" : "w-1.5 bg-white/40")}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-semibold tracking-tight">{current.title}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
