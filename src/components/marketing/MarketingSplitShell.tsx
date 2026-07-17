"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import type { MarketingImage } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

type MarketingSplitShellProps = {
  image: MarketingImage;
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  showWayfinding?: boolean;
  showHomeLink?: boolean;
};

/** Auth-style split: sticky image + copy left, scrollable content right. */
export default function MarketingSplitShell({
  image,
  eyebrow,
  title,
  description,
  aside,
  children,
  className,
  showWayfinding = true,
  showHomeLink = true,
}: MarketingSplitShellProps) {
  return (
    <section className={cn("relative min-h-screen bg-black", className)}>
      {showHomeLink ? (
        <div className="absolute left-4 top-[calc(var(--site-nav-height)+1rem)] z-20 sm:left-8">
          <Link
            href="/"
            aria-label="Back to website"
            title="Back to website"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-cedar-ivory backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cedar-accent/40 sm:h-14 sm:w-14"
          >
            <Home className="h-5 w-5 sm:h-6 sm:w-6" />
          </Link>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <div className="site-sticky-panel flex flex-col">
            <div className="relative flex-1 overflow-hidden border-r border-white/10">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="relative flex h-full flex-col justify-end px-10 pb-12 pt-12">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">
                  {eyebrow}
                </p>
                <h1 className="mt-4 max-w-md font-display text-5xl leading-[1.05] text-cedar-ivory">
                  {title}
                </h1>
                <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/75">{description}</p>
                {aside ? <div className="mt-8">{aside}</div> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="site-scroll-column flex flex-col px-4 pb-16 sm:px-8 lg:px-12 lg:pb-20">
          <div className="mb-8 lg:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-cedar-ivory">{title}</h1>
            <p className="mt-4 text-base leading-relaxed text-cedar-mist">{description}</p>
            {aside ? <div className="mt-6">{aside}</div> : null}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
          >
            {showWayfinding ? (
              <div className="mb-8 border border-white/10 bg-white/[0.03] px-3 py-3 sm:px-4">
                <WayfindingStrip zone="site" tone="onDark" />
              </div>
            ) : null}
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
