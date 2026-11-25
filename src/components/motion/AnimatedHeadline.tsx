"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Token = { word: string; highlight: boolean };

/**
 * Parses a tiny markup:
 *  - `\n` starts a new line
 *  - `*text*` renders those words with the brand gradient
 */
function parse(text: string): Token[][] {
  return text.split("\n").map((line) => {
    const tokens: Token[] = [];
    line.split("*").forEach((chunk, i) => {
      const highlight = i % 2 === 1;
      chunk
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => tokens.push({ word, highlight }));
    });
    return tokens;
  });
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const wordVariants: Variants = {
  hidden: { y: "110%", rotate: 4, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div } as const;

type Props = {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  /** Classes for `*highlighted*` words. Defaults to the brand gradient. */
  highlightClassName?: string;
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
};

/** Big headline that reveals word-by-word from behind a mask, with a soft blur. */
export default function AnimatedHeadline({
  text,
  as = "h2",
  className,
  highlightClassName = "text-gradient",
  immediate = false,
  delay = 0,
  stagger = 0.06,
}: Props) {
  const reduced = useReducedMotion();
  const lines = parse(text);
  const MotionTag = TAGS[as];

  const inViewProps = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "-60px" } };

  return (
    <MotionTag
      aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}
      className={className}
      initial={reduced ? false : "hidden"}
      variants={container(stagger, delay)}
      {...inViewProps}
    >
      {lines.map((tokens, li) => (
        <span key={li} aria-hidden className="block">
          {tokens.map((t, wi) => (
            <Fragment key={wi}>
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
                <motion.span
                  variants={wordVariants}
                  className={cn("inline-block origin-bottom-left will-change-transform", t.highlight && highlightClassName)}
                >
                  {t.word}
                </motion.span>
              </span>
              {wi < tokens.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
