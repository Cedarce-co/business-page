import { TargetAndTransition, Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const chatBubble: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

export const floatLoop = (delay = 0): TargetAndTransition => ({
  opacity: 1,
  y: [0, -12, 0],
  transition: {
    duration: 5 + delay,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

export const glowPulse: TargetAndTransition = {
  boxShadow: [
    "0 0 20px rgba(107,90,237,0.15)",
    "0 0 48px rgba(107,90,237,0.40)",
    "0 0 20px rgba(107,90,237,0.15)",
  ],
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

export const viewport = { once: true, margin: "-80px" };

export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export const sectionEnter: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

/** Bottom-fixed banners (cookie consent). */
export const cookieBannerMotion = {
  initial: { opacity: 0, y: 36, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 22, scale: 0.96 },
  transition: { duration: 0.5, ease: EASE_SMOOTH, delay: 0.5 },
};

/** Navbar announcement strip. */
export const navbarBannerMotion = {
  initial: { opacity: 0, y: -28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.42, ease: EASE_SMOOTH },
};

/** Floating marketing / awareness promo card. */
export const promoShellMotion = {
  initial: { opacity: 0, y: 48, x: 32, scale: 0.9, rotate: 1.5 },
  animate: { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 },
  exit: { opacity: 0, y: 28, x: 20, scale: 0.94, rotate: 0.5 },
  transition: { type: "spring" as const, stiffness: 360, damping: 28 },
};
