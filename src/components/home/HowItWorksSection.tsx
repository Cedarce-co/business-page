/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { Calendar, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { HOW_IT_WORKS } from "@/lib/constants";
import { drawLine, fadeUp, viewport } from "@/lib/animations";

const iconMap = { Calendar, Zap, Star };

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-cliq-navy-800 py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionLabel className="border border-cliq-navy-600 bg-cliq-navy-700 text-cliq-teal">
          The Process
        </SectionLabel>
        <h2 className="mt-5 text-4xl font-black text-white lg:text-5xl">
          Three steps to professional.
        </h2>
        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {HOW_IT_WORKS.map((item, idx) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Calendar;
            return (
              <div key={item.step} className="flex items-center lg:items-start">
                <motion.article
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="max-w-xs"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cliq-purple text-xl font-black text-white">
                    {item.step}
                  </div>
                  <Icon className="mt-4 h-6 w-6 text-cliq-teal" />
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-white/60">{item.desc}</p>
                </motion.article>
                {idx < HOW_IT_WORKS.length - 1 ? (
                  <svg width="100" height="4" className="mx-5 hidden lg:block">
                    <defs>
                      <linearGradient id="line-grad">
                        <stop offset="0%" stopColor="#6B5AED" />
                        <stop offset="100%" stopColor="#63EBE4" />
                      </linearGradient>
                    </defs>
                    <motion.line
                      x1="0"
                      y1="2"
                      x2="100"
                      y2="2"
                      stroke="url(#line-grad)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      variants={drawLine}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewport}
                    />
                  </svg>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
