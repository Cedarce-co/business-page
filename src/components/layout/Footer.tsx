"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Banknote } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import ContactInfoList from "@/components/ui/ContactInfoList";
import BrandLogo from "@/components/ui/BrandLogo";

const businessLinks = [
  { label: "Small businesses", href: "/solutions/self-employed" },
  { label: "Shops & stores", href: "/solutions/micro-businesses" },
  { label: "Growing businesses", href: "/solutions/smes" },
  { label: "Associations & groups", href: "/solutions/associations" },
  { label: "View all", href: "/solutions" },
] as const;

const quickLinks = [
  { label: "Our work", href: "/#our-work" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

type FooterLinkItem = { label: string; href: string };

function FooterColumn({ title, links }: { title: string; links: readonly FooterLinkItem[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group inline-flex items-center gap-1 text-[15px] text-slate-600 transition hover:text-brand-700"
            >
              {item.label}
              <ArrowUpRight
                className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden border-t border-line bg-white pb-[calc(var(--site-mobile-tab-height)+0.5rem)] lg:pb-0"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-brand-50 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pt-14 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div>
            <Link href="/" aria-label="Home" className="inline-flex">
              <BrandLogo height={34} />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-slate-500">
              We help businesses look professional online and run their daily work more easily.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-brand-700 shadow-soft">
              <Banknote className="h-3.5 w-3.5" aria-hidden />
              Clear prices in Naira
            </span>
            <div className="mt-6 text-sm text-slate-600 [&_a]:text-brand-800 [&_a:hover]:text-brand-600">
              <ContactInfoList showHours hours="short" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <FooterColumn
              title="Services"
              links={SERVICES.map((service) => ({ label: service.name, href: `/services/${service.id}` }))}
            />
            <FooterColumn title="Who we help" links={businessLinks} />
            <FooterColumn title="Quick links" links={quickLinks} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Cedarce Co. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-brand-700">Privacy</Link>
            <Link href="/terms" className="transition hover:text-brand-700">Terms</Link>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="relative -mb-[0.22em] select-none overflow-hidden text-center">
        <motion.p
          initial={reduced ? false : { y: "40%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[26vw] font-semibold leading-none tracking-[-0.06em] text-transparent [background:linear-gradient(180deg,var(--brand-200)_0%,var(--brand-50)_85%)] [-webkit-background-clip:text] [background-clip:text] lg:text-[20vw]"
        >
          Cedarce
        </motion.p>
      </div>
    </footer>
  );
}
