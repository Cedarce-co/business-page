"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, Mail, MessageSquare, Receipt, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import AnimatedHeadline from "@/components/motion/AnimatedHeadline";
import Reveal, { RevealGroup, RevealGroupItem } from "@/components/motion/Reveal";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Card with a soft spotlight that follows the cursor. */
function BentoCard({
  icon: Icon,
  title,
  body,
  dark = false,
  className,
  children,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  dark?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] p-6 transition duration-500 hover:-translate-y-1 sm:p-8",
        dark
          ? "bg-deep-blue text-white shadow-lift"
          : "border border-line bg-white shadow-soft hover:border-brand-200 hover:shadow-lift",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: dark
            ? "radial-gradient(320px circle at var(--mx) var(--my), rgba(153,188,234,0.28), transparent 65%)"
            : "radial-gradient(320px circle at var(--mx) var(--my), rgba(52,122,213,0.10), transparent 65%)",
        }}
      />
      {dark ? <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light opacity-50" /> : null}
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl transition duration-500 group-hover:-rotate-6 group-hover:scale-105",
          dark ? "glass-blue text-white" : "btn-sheen bg-g-button text-white shadow-glow-sm",
        )}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className={cn("mt-6 text-xl font-semibold tracking-tight sm:text-2xl", dark ? "text-white" : "text-brand-950")}>
        {title}
      </h3>
      <p className={cn("mt-2 max-w-md text-[15px] leading-relaxed", dark ? "text-brand-100/85" : "text-slate-500")}>
        {body}
      </p>
      {children ? <div className="mt-auto pt-8">{children}</div> : null}
    </div>
  );
}

function ReceiptMock() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        { label: "Receipt #1029", tag: "Sent" },
        { label: "Invoice #0042", tag: "Paid" },
      ].map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
          className="rounded-2xl border border-line bg-brand-50/60 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-brand-950">{r.label}</span>
            <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-brand-600 shadow-soft">
              {r.tag}
            </span>
          </div>
          <div className="mt-3 space-y-1.5">
            <span className="block h-1.5 w-3/4 rounded-full bg-brand-200" />
            <span className="block h-1.5 w-1/2 rounded-full bg-brand-100" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PaymentMock() {
  return (
    <div className="space-y-3">
      <div className="glass-blue rounded-2xl p-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-brand-100/80">Payment link</p>
        <p className="mt-1 truncate text-sm font-semibold">pay.yourbrand.com/order</p>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-brand-800">
          <span className="text-sm font-semibold">Pay now</span>
          <CreditCard className="h-4 w-4" aria-hidden />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, type: "spring", stiffness: 220, damping: 16 }}
        className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-brand-800 shadow-lift"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
        </span>
        Payment confirmed
      </motion.div>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.6fr] lg:items-end">
          <div>
            <Reveal>
              <SectionLabel>What you get with us</SectionLabel>
            </Reveal>
            <AnimatedHeadline
              text={"Less paperwork.\nMore *time to sell.*"}
              className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.04em] text-brand-950 sm:text-5xl lg:text-[3.6rem]"
            />
          </div>
          <Reveal delay={0.15} className="lg:pb-2">
            <p className="max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
              Pick one piece or all of them. Each one saves you time on work you do by hand today.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:grid-rows-[auto_auto] lg:gap-5" stagger={0.1}>
          <RevealGroupItem className="lg:col-span-2">
            <BentoCard
              icon={Receipt}
              title="Receipts & invoices"
              body="We set up clean bills and receipts with your name and logo, so every sale looks official."
            >
              <ReceiptMock />
            </BentoCard>
          </RevealGroupItem>

          <RevealGroupItem className="lg:row-span-2">
            <BentoCard
              dark
              icon={CreditCard}
              title="Easy payments"
              body="Customers can pay you online when you need it. Simple links, clear confirmations, less chasing."
            >
              <PaymentMock />
            </BentoCard>
          </RevealGroupItem>

          <RevealGroupItem>
            <BentoCard
              icon={Mail}
              title="Business email"
              body="An email that matches your business name, so people take you seriously from the first message."
            >
              <p className="inline-flex rounded-full border border-line bg-brand-50/60 px-3 py-1.5 text-sm font-semibold text-brand-700">
                hello@yourbrand.com
              </p>
            </BentoCard>
          </RevealGroupItem>

          <RevealGroupItem>
            <BentoCard
              icon={MessageSquare}
              title="Stay in touch"
              body="Message many customers at once. Updates, offers, and reminders without typing each one."
            >
              <div className="flex flex-wrap gap-2">
                {["Email", "WhatsApp", "SMS"].map((c) => (
                  <span key={c} className="rounded-full border border-line bg-brand-50/60 px-3 py-1.5 text-sm font-semibold text-brand-700">
                    {c}
                  </span>
                ))}
              </div>
            </BentoCard>
          </RevealGroupItem>
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center">
          <Button href="/product" variant="secondary" className="min-h-12">
            See all services
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
