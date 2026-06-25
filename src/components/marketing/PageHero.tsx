import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionLabel from "@/components/ui/SectionLabel";

type PageHeroProps = {
  badge?: string;
  badgeClassName?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  showWayfinding?: boolean;
};

export default function PageHero({
  badge,
  badgeClassName,
  title,
  description,
  children,
  className,
  titleClassName,
  descriptionClassName,
  showWayfinding = true,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-cliq-navy-900 pb-16", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-90" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.12]"
      />
      {showWayfinding ? <MarketingPageHeader tone="dark" /> : null}
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        {badge ? (
          <SectionLabel className={cn("border border-white/10 bg-white/10 text-white/90 backdrop-blur-sm", badgeClassName)}>
            {badge}
          </SectionLabel>
        ) : null}
        <h1
          className={cn(
            "mt-6 max-w-4xl text-5xl font-black leading-tight text-white lg:text-6xl",
            titleClassName
          )}
        >
          {title}
        </h1>
        {description ? (
          <p className={cn("mt-4 max-w-3xl text-balance text-center text-lg text-white/75", descriptionClassName)}>
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-6 flex flex-col items-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
