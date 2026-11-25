"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import type { MarketingImage } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

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
  align?: "left" | "center";
};

/** Inner-page hero: breadcrumbs on white, then a rounded Cedarce-blue panel with big text. */
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
  align = "center",
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const centered = align === "center";

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(10px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { delay, duration: 0.9, ease: EASE },
        };

  return (
    <section className={cn("relative bg-white pb-6 sm:pb-10", className)}>
      {showWayfinding ? <MarketingPageHeader className="pb-4" /> : <div className="site-page-top" />}

      <div className="px-2 sm:px-3">
        <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-hero-blue lg:rounded-[2.75rem]">
          {image ? (
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover opacity-25 mix-blend-luminosity"
            />
          ) : null}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_25%,transparent_80%)]" />

          <div
            className={cn(
              "relative mx-auto flex w-full max-w-[1100px] flex-col px-5 py-16 sm:px-10 sm:py-24 lg:py-28",
              centered ? "items-center text-center" : "items-start text-left",
            )}
          >
            {badge ? (
              <motion.div {...enter(0)}>
                <SectionLabel tone="onBlue" className={badgeClassName}>
                  {badge}
                </SectionLabel>
              </motion.div>
            ) : null}
            <motion.h1
              {...enter(0.1)}
              className={cn(
                "mt-6 max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl",
                titleClassName,
              )}
            >
              {title}
            </motion.h1>
            {description ? (
              <motion.p
                {...enter(0.25)}
                className={cn(
                  "mt-5 max-w-2xl text-balance text-base leading-relaxed text-brand-50/90 sm:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </motion.p>
            ) : null}
            {children ? (
              <motion.div
                {...enter(0.35)}
                className={cn("mt-8 flex flex-wrap gap-3", centered ? "justify-center" : "justify-start")}
              >
                {children}
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
