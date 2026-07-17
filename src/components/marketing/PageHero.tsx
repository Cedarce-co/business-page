import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import type { MarketingImage } from "@/lib/marketing-images";

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
  image?: MarketingImage;
  /** Default left-aligned (Enyata). Use "center" only when explicitly needed. */
  align?: "left" | "center";
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
  image,
  align = "left",
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section className={cn("relative overflow-hidden bg-black pb-16", className)}>
      {image ? (
        <>
          <div className="absolute inset-0">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/72" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black" />
          </div>
        </>
      ) : (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-90" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.25]" />
        </>
      )}
      {showWayfinding ? <MarketingPageHeader tone="dark" /> : null}
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-[1200px] flex-col px-4 sm:px-6 lg:px-8",
          centered ? "items-center text-center" : "items-start text-left"
        )}
      >
        {badge ? (
          <SectionLabel className={cn(centered && "mx-auto", badgeClassName)}>{badge}</SectionLabel>
        ) : null}
        <h1
          className={cn(
            "mt-6 max-w-3xl font-display text-4xl leading-tight text-cedar-ivory sm:text-5xl lg:text-6xl",
            titleClassName
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-2xl text-balance text-lg text-white/75",
              centered && "text-center",
              descriptionClassName
            )}
          >
            {description}
          </p>
        ) : null}
        {children ? (
          <div
            className={cn(
              "mt-8 flex flex-wrap gap-3",
              centered ? "justify-center" : "justify-start"
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
