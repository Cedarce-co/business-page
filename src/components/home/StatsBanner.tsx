"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function StatsBanner() {
  return (
    <SectionReveal className="border-y border-white/10 bg-black py-10 lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center divide-x divide-white/10 text-center lg:gap-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="min-w-0 max-w-[10rem] px-4 sm:max-w-[14rem] sm:px-8 lg:min-w-[220px] lg:max-w-none lg:px-12">
              <p className="font-display text-3xl text-gradient sm:text-4xl lg:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1.5 text-xs leading-snug text-cedar-mist sm:text-sm lg:mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
