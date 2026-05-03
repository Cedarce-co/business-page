import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

export default function StatsBanner() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-10 px-4 text-center sm:px-6 lg:flex-nowrap lg:gap-0 lg:divide-x lg:divide-cliq-gray-200 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="min-w-[220px] lg:px-12">
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
