/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function StatsBanner() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((stat, idx) => (
          <div key={stat.label} className={idx < STATS.length - 1 ? "lg:border-r lg:border-cliq-gray-200" : ""}>
            <p className="text-5xl font-black lg:text-6xl text-gradient">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-cliq-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
