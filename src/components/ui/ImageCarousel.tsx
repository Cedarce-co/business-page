"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MarketingImage } from "@/lib/marketing-images";
import { cn } from "@/lib/utils";

type Props = {
  images: MarketingImage[];
  intervalMs?: number;
  className?: string;
  /** Darken overlay strength 0 to 100 */
  overlay?: number;
  priority?: boolean;
  /** Optional gradient overlay classes */
  gradientClassName?: string;
  /** Extra classes on the slide image (e.g. inset to reduce cover crop) */
  imageClassName?: string;
};

/** Full-bleed fading image carousel for heroes and banners. */
export default function ImageCarousel({
  images,
  intervalMs = 5500,
  className,
  overlay = 72,
  priority = false,
  gradientClassName = "bg-gradient-to-t from-black via-black/40 to-black/55",
  imageClassName,
}: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, reduced]);

  const current = images[index] ?? images[0];
  if (!current) return null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-black", className)} aria-hidden>
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current.src}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={current.src}
            alt=""
            fill
            priority={priority && index === 0}
            sizes="100vw"
            className={cn("object-cover object-center", imageClassName)}
          />
        </motion.div>
      </AnimatePresence>
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlay / 100 }}
      />
      <div
        className={cn("absolute inset-0", gradientClassName)}
      />
    </div>
  );
}
