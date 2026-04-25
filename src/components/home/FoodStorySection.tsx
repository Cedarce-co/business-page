/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { FOOD_STORY_STEPS } from "@/lib/constants";
import { fadeUp, viewport } from "@/lib/animations";
import { useRef } from "react";

export default function FoodStorySection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 20%", "end 80%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section className="bg-cliq-gray-100 py-20 lg:py-28">
      <div ref={ref} className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionLabel className="bg-white font-semibold text-cliq-text-heading border border-cliq-gray-300">
          Cedarce in Action
        </SectionLabel>
        <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
          See how we transform a business.
        </h2>
        <p className="mt-4 text-lg text-cliq-text-body">
          A retail food business. Before and after Cedarce.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[90px_1fr]">
          <div className="hidden lg:flex justify-center">
            <div className="relative h-full min-h-[700px] w-2 rounded-full bg-cliq-gray-300">
              <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute inset-0 rounded-full bg-g-brand"
              />
            </div>
          </div>

          <div className="space-y-6">
            {FOOD_STORY_STEPS.map((step) => (
              <motion.article
                key={step.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="rounded-2xl border border-cliq-gray-200 bg-white p-6 shadow-card"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cliq-navy-800 font-bold text-white">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-cliq-text-heading">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-cliq-text-body">{step.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
