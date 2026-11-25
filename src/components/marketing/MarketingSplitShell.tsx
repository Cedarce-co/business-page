"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import SectionLabel from "@/components/ui/SectionLabel";
import type { MarketingImage } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type MarketingSplitShellProps = {
  image: MarketingImage;
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  /** Rendered on the blue panel — use on-blue variants (white text). */
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  showWayfinding?: boolean;
  /** @deprecated kept for API compatibility; the navbar already links home. */
  showHomeLink?: boolean;
};

function BluePanel({
  image,
  eyebrow,
  title,
  description,
  aside,
  compact = false,
}: Pick<MarketingSplitShellProps, "image" | "eyebrow" | "title" | "description" | "aside"> & { compact?: boolean }) {
  const reduced = useReducedMotion();
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { delay, duration: 0.8, ease: EASE },
        };

  return (
    <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-hero-blue lg:rounded-[2.5rem]">
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes={compact ? "100vw" : "50vw"}
        className="-z-20 object-cover opacity-30 mix-blend-luminosity"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-brand-900/70 via-brand-800/10 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />

      <div className={cn("relative flex h-full flex-col justify-end", compact ? "p-6 pt-10" : "px-10 pb-10 pt-16 xl:px-12")}>
        <motion.div {...enter(0)}>
          <SectionLabel tone="onBlue">{eyebrow}</SectionLabel>
        </motion.div>
        <motion.h1
          {...enter(0.1)}
          className={cn(
            "mt-5 max-w-md font-display font-semibold leading-[1.02] tracking-[-0.045em] text-white",
            compact ? "text-[2.1rem]" : "text-5xl xl:text-[3.6rem]",
          )}
        >
          {title}
        </motion.h1>
        <motion.p
          {...enter(0.2)}
          className={cn("mt-4 max-w-sm leading-relaxed text-brand-50/90", compact ? "text-[15px]" : "text-lg")}
        >
          {description}
        </motion.p>
        {aside ? (
          <motion.div {...enter(0.3)} className={compact ? "mt-6" : "mt-8"}>
            {aside}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

/** Split page: sticky Cedarce-blue intro panel left, scrollable content right. */
export default function MarketingSplitShell({
  image,
  eyebrow,
  title,
  description,
  aside,
  children,
  className,
  showWayfinding = true,
}: MarketingSplitShellProps) {
  return (
    <section className={cn("relative bg-white", className)}>
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-6 px-2 sm:px-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
        <div className="relative hidden lg:block">
          <div className="site-sticky-panel">
            <BluePanel image={image} eyebrow={eyebrow} title={title} description={description} aside={aside} />
          </div>
        </div>

        <div className="site-scroll-column flex flex-col px-2 pb-16 sm:px-5 lg:px-0 lg:pb-24 lg:pr-8">
          {showWayfinding ? (
            <div className="mb-6 sm:mb-8">
              <WayfindingStrip zone="site" />
            </div>
          ) : null}

          <div className="mb-8 lg:hidden">
            <BluePanel compact image={image} eyebrow={eyebrow} title={title} description={description} aside={aside} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
