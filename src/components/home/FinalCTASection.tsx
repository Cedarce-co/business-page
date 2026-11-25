"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CreditCard, Globe, Mail, MessageSquare, Receipt, type LucideIcon } from "lucide-react";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

type Tile = { icon: LucideIcon; className: string; rotate: number; depth: number };

const tiles: Tile[] = [
  { icon: Globe, className: "left-[6%] top-[14%]", rotate: -12, depth: 60 },
  { icon: Mail, className: "right-[8%] top-[10%]", rotate: 10, depth: 90 },
  { icon: Receipt, className: "left-[12%] bottom-[12%]", rotate: 8, depth: 40 },
  { icon: CreditCard, className: "right-[12%] bottom-[16%]", rotate: -8, depth: 70 },
  { icon: MessageSquare, className: "left-[44%] -top-4 hidden xl:flex", rotate: 6, depth: 30 },
];

function FloatingTile({ tile, progress }: { tile: Tile; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [tile.depth, -tile.depth]);
  const Icon = tile.icon;
  return (
    <motion.div
      aria-hidden
      style={{ y, rotate: tile.rotate }}
      className={cn(
        "glass-blue absolute hidden h-16 w-16 items-center justify-center rounded-2xl text-white md:flex lg:h-20 lg:w-20 lg:rounded-3xl",
        tile.className,
      )}
    >
      <Icon className="h-7 w-7 lg:h-8 lg:w-8" />
    </motion.div>
  );
}

export default function FinalCTASection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section className="bg-white px-2 pb-20 sm:px-3 lg:pb-28">
      <div
        ref={ref}
        className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-deep-blue px-5 py-20 text-center sm:py-24 lg:rounded-[2.75rem] lg:py-32"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_75%)]" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl"
          animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {!reduced ? tiles.map((t, i) => <FloatingTile key={i} tile={t} progress={scrollYProgress} />) : null}

        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <span className="glass-blue inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-white sm:text-sm">
              Next step
            </span>
          </Reveal>
          <AnimatedHeadline
            text={"Look professional where\ncustomers *check first.*"}
            highlightClassName="text-gradient-light"
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.75rem]"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-100/85 sm:text-lg">
              Tell us where your business is today. We&apos;ll suggest a simple setup and give you a clear price.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <WhatsAppButton variant="onBanner" className="min-h-12 px-8">
                Chat with us on WhatsApp
              </WhatsAppButton>
            </Magnetic>
            <Button href="/pricing" variant="onDark" className="min-h-12 px-8" noArrow>
              View pricing
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
