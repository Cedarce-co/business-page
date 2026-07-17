"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function StatsBanner() {
  return (
    <SectionReveal className="border-y border-white/10 bg-black py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-4 text-center sm:px-6 lg:flex-row lg:justify-center lg:gap-0 lg:divide-x lg:divide-white/10 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="min-w-[220px] lg:px-12">
            <p className="font-display text-5xl text-gradient lg:text-6xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-cedar-mist">{stat.label}</p>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}
