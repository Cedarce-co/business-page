"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, Globe, Mail, Receipt, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import RotatingWords from "@/components/motion/RotatingWords";
import FloatingTag from "@/components/motion/FloatingTag";
import Magnetic from "@/components/motion/Magnetic";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ───────────── Mock product cards (pure UI, no data) ───────────── */

function WebsiteCard() {
  const bars = [38, 52, 44, 66, 58, 80, 72];
  return (
    <div className="rounded-[1.6rem] border border-white/80 bg-white p-5 shadow-lift">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Globe className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-brand-950">yourbrand.com</p>
            <p className="text-[11px] text-slate-500">Website</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" /> Live
        </span>
      </div>
      <p className="mt-5 text-[11px] text-slate-500">Example site</p>
      <div className="mt-1 flex items-end gap-2">
        <p className="text-2xl font-semibold tracking-tight text-brand-950">Customers find you</p>
        <TrendingUp className="mb-1.5 h-4 w-4 text-brand-500" aria-hidden />
      </div>
      <div className="mt-4 flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className={`flex-1 rounded-md ${i === bars.length - 2 ? "bg-g-button" : "bg-brand-100"}`}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 1.1 + i * 0.06, duration: 0.7, ease: EASE }}
          />
        ))}
      </div>
    </div>
  );
}

function InvoiceCard() {
  return (
    <div className="rounded-[1.8rem] border border-white/80 bg-white p-6 shadow-lift">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-g-button text-white shadow-glow-sm">
            <Receipt className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-brand-950">Invoice #0042</p>
            <p className="text-[11px] text-slate-500">Sent with your logo</p>
          </div>
        </div>
        <span className="rounded-full bg-brand-500 px-2.5 py-1 text-[11px] font-semibold text-white">Paid</span>
      </div>

      <div className="mt-6 space-y-2.5">
        {["Website setup", "Business email", "Branded receipts"].map((row, i) => (
          <motion.div
            key={row}
            className="flex items-center justify-between rounded-xl bg-brand-50/70 px-3 py-2.5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.12, duration: 0.5, ease: EASE }}
          >
            <span className="flex items-center gap-2 text-[13px] font-medium text-brand-900">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />
              </span>
              {row}
            </span>
            <span className="h-1.5 w-12 rounded-full bg-brand-200" />
          </motion.div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <p className="text-[11px] text-slate-500">Receipt sent automatically</p>
        <div className="flex -space-x-1.5">
          {["bg-brand-300", "bg-brand-500", "bg-brand-700"].map((c) => (
            <span key={c} className={`h-6 w-6 rounded-full border-2 border-white ${c}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmailCard() {
  return (
    <div className="rounded-[1.6rem] border border-white/80 bg-white p-5 shadow-lift">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Mail className="h-4.5 w-4.5" aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold text-brand-950">hello@yourbrand.com</p>
          <p className="text-[11px] text-slate-500">Business email</p>
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {[
          { from: "New order", w: "w-24" },
          { from: "Quote request", w: "w-16" },
          { from: "Payment received", w: "w-20" },
        ].map((m, i) => (
          <div key={m.from} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2">
            <span className={`h-7 w-7 shrink-0 rounded-full ${i === 0 ? "bg-g-button" : "bg-brand-100"}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-brand-950">{m.from}</p>
              <span className={`mt-1 block h-1.5 rounded-full bg-brand-100 ${m.w}`} />
            </div>
            {i === 0 ? <span className="h-2 w-2 rounded-full bg-brand-500" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Hero ───────────── */

export default function HeroSection() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const ySide = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yBlocks = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 120, rotate: 0 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 1.1, ease: EASE },
        };

  // Desktop: the panel starts just under the floating nav pill, which overlaps its top edge slightly.
  return (
    <section ref={ref} className="relative bg-white px-2 pt-2 sm:px-3 sm:pt-3 lg:pt-[4.25rem]">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-hero-blue lg:rounded-[2.75rem]">
        {/* Texture + glass blocks */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_30%,transparent_80%)]"
        />
        <motion.div aria-hidden style={{ y: yBlocks }} className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
          <div className="glass-blue absolute -left-10 bottom-[12%] h-56 w-44 rounded-[2rem]" />
          <div className="glass-blue absolute left-24 bottom-[4%] h-36 w-36 rounded-[1.75rem] opacity-70" />
          <div className="glass-blue absolute -right-12 bottom-[16%] h-64 w-48 rounded-[2rem]" />
          <div className="glass-blue absolute right-28 bottom-[6%] h-40 w-36 rounded-[1.75rem] opacity-70" />
        </motion.div>

        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-5 pb-0 pt-16 text-center sm:pt-20 lg:pt-[calc(var(--site-nav-height)+4.5rem)]">
          <motion.div style={reduced ? undefined : { y: headlineY, opacity: headlineOpacity }} className="flex flex-col items-center">
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="glass-blue inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-white sm:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Websites, email & payments · Clear Naira prices
            </motion.span>

            <div className="relative mt-6 sm:mt-8">
              <AnimatedHeadline
                as="h1"
                immediate
                delay={0.15}
                stagger={0.08}
                text={"Findable. Credible.\n*Ready to grow.*"}
                highlightClassName="text-gradient-light"
                className="font-display text-[3.1rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-7xl lg:text-[6.75rem]"
              />
              <FloatingTag
                variant="white"
                rotate={-8}
                delay={1}
                className="absolute -left-3 -top-5 sm:-left-12 sm:-top-6 lg:-left-20"
              >
                Website
              </FloatingTag>
              <FloatingTag
                variant="glass"
                rotate={7}
                delay={1.2}
                className="absolute -right-2 bottom-[38%] sm:-right-10 lg:-right-24"
              >
                Trusted
              </FloatingTag>
            </div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
              className="mt-6 max-w-xl text-base leading-relaxed text-brand-50/90 sm:mt-8 sm:text-xl"
            >
              One simple setup for your
              <RotatingWords
                align="center"
                words={["website", "business email", "invoices", "payments", "customer messages"]}
                className="my-1 !grid font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl"
              />
              so customers trust you and work runs smoother.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8, ease: EASE }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
            >
              <Magnetic>
                <WhatsAppButton variant="onBanner" className="min-h-12 px-7">
                  Chat with us on WhatsApp
                </WhatsAppButton>
              </Magnetic>
              <Button href="/pricing" variant="onDark" className="min-h-12 px-7">
                See prices
              </Button>
            </motion.div>
          </motion.div>

          {/* Product cards rising from the panel's bottom edge */}
          <div className="relative mt-12 w-full sm:mt-16 lg:mt-20">
            <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-end gap-5 md:grid-cols-[1fr_1.15fr_1fr]">
              <motion.div style={reduced ? undefined : { y: ySide }} className="hidden translate-y-10 text-left md:block">
                <motion.div {...rise(0.55)}>
                  <WebsiteCard />
                </motion.div>
              </motion.div>
              <motion.div style={reduced ? undefined : { y: yCenter }} className="-mb-16 text-left sm:-mb-10">
                <motion.div {...rise(0.4)}>
                  <InvoiceCard />
                </motion.div>
              </motion.div>
              <motion.div style={reduced ? undefined : { y: ySide }} className="hidden translate-y-10 text-left md:block">
                <motion.div {...rise(0.7)}>
                  <EmailCard />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
