"use client";

import { Calendar, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionIntro from "@/components/ui/SectionIntro";
import { HOW_IT_WORKS } from "@/lib/constants";
import { fadeUp, viewport } from "@/lib/animations";

const iconMap = { Calendar, Zap, Star };

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-cliq-white py-20 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(15,23,42,0.07) 0%, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#111122_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionIntro>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
            Three steps to going professional.
          </h2>
          <p className="mt-4 text-lg text-cliq-text-body">
            No complicated processes. No long waiting. Just results. We speak business, not tech, and you&apos;ll
            understand every step.
          </p>
        </SectionIntro>
        <div className="mt-12 flex max-w-2xl flex-col gap-10 mx-auto">
          {HOW_IT_WORKS.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Calendar;
            return (
              <div key={item.step} className="relative flex gap-6 border-l-2 border-cliq-gray-200 pl-8">
                <motion.article
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="pb-2"
                >
                  <span className="absolute -left-[1.125rem] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-cliq-purple text-sm font-black text-white ring-4 ring-cliq-white">
                    {item.step}
                  </span>
                  <Icon className="h-6 w-6 text-cliq-purple" />
                  <h3 className="mt-4 text-xl font-bold text-cliq-text-heading">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-cliq-text-body">{item.desc}</p>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
