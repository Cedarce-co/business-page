"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

export default function SectionReveal({
  children,
  className,
  delay = 0,
  preserveSticky = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Uses opacity-only motion so sticky descendants keep their viewport containing block. */
  preserveSticky?: boolean;
  id?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={
        preserveSticky
          ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.45, delay } },
            }
          : {
              hidden: fadeUp.hidden,
              visible: {
                ...fadeUp.visible,
                transition: {
                  ...(typeof fadeUp.visible === "object" && "transition" in fadeUp.visible
                    ? fadeUp.visible.transition
                    : {}),
                  delay,
                },
              },
            }
      }
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function StaggerReveal({
  children,
  className,
  slow,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={slow ? { ...stagger, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } } : stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={fadeUp} className={cn(className)}>
      {children}
    </motion.div>
  );
}
