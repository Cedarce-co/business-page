"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Globe, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/services", label: "Solutions" },
  { href: "/about", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

type MegaLinkItem = { name: string; desc: string; href: string };
type MegaBlock = {
  leftTitle: string;
  leftItems: MegaLinkItem[];
  rightTitle: string;
  rightItems: MegaLinkItem[];
  cardTag: string;
  cardTitle: string;
  cardText: string;
  cardCtaHref: string;
  cardCtaLabel: string;
  footerLink: string;
  footerLinkHref: string;
};

const megaMenus: Record<string, MegaBlock> = {
  Solutions: {
    leftTitle: "Existing companies",
    leftItems: [
      { name: "Self-employed", desc: "Freelancers and sole traders", href: "/services/web-presence" },
      { name: "Micro-businesses", desc: "1-9 employees", href: "/services/customer-reach" },
      { name: "SMEs", desc: "10-250+ employees", href: "/services/apps-and-operations" },
      { name: "Associations", desc: "Donations, membership fees, expenses", href: "/services/payments-invoicing" },
    ],
    rightTitle: "Business founders",
    rightItems: [
      { name: "Business launch setup", desc: "Website, domain, email, payments", href: "/services/web-presence" },
      { name: "Brand and automation", desc: "Invoicing, follow-ups, bulk messaging", href: "/services/payments-invoicing" },
    ],
    cardTag: "Get started",
    cardTitle: "Ready to look professional online?",
    cardText: "Create an account to request services, track delivery, and manage your profile in one place.",
    cardCtaHref: "/signup",
    cardCtaLabel: "Create free account",
    footerLink: "Talk to our team",
    footerLinkHref: "/contact",
  },
  Product: {
    leftTitle: "Digital setup",
    leftItems: [
      { name: "Website and landing pages", desc: "Mobile-first and conversion-focused", href: "/services/web-presence" },
      { name: "Domain and hosting", desc: "SSL-secured and managed setup", href: "/services/web-presence" },
      { name: "Business email", desc: "Branded inboxes for your team", href: "/services/business-identity" },
      { name: "Payments integration", desc: "Cards, bank transfer, and mobile checkout", href: "/services/payments-invoicing" },
      { name: "Invoicing and receipts", desc: "Automated branded documents", href: "/services/payments-invoicing" },
    ],
    rightTitle: "Growth tools",
    rightItems: [
      { name: "Bulk messaging", desc: "Email, WhatsApp, and SMS campaigns", href: "/services/customer-reach" },
      { name: "Marketing setup", desc: "Instagram, TikTok, and Google visibility", href: "/services/customer-reach" },
      { name: "Staff training", desc: "Hands-on onboarding for your team", href: "/services/apps-and-operations" },
      { name: "Integrations", desc: "Connect tools you already use", href: "/services/apps-and-operations" },
    ],
    cardTag: "Overview",
    cardTitle: "Five pillars. One delivery partner.",
    cardText: "See how our services fit together, from first website to payments and campaigns.",
    cardCtaHref: "/services",
    cardCtaLabel: "View all services",
    footerLink: "Compare packages",
    footerLinkHref: "/pricing",
  },
  Pricing: {
    leftTitle: "Pricing",
    leftItems: [
      { name: "Company creators", desc: "Setup and launch support", href: "/pricing" },
      { name: "Self-employed", desc: "Plans built for freelancers", href: "/pricing" },
      { name: "Micro-businesses", desc: "1-9 team members", href: "/pricing" },
      { name: "SMEs", desc: "Scale with confidence", href: "/pricing" },
    ],
    rightTitle: "Compare",
    rightItems: [
      { name: "Find the right plan", desc: "Compare features and limits", href: "/pricing" },
      { name: "Need help choosing?", desc: "Speak with our team", href: "/contact" },
    ],
    cardTag: "Consultation",
    cardTitle: "Not sure which tier fits?",
    cardText: "Book a short call. We’ll map packages to your goals and timeline.",
    cardCtaHref: "/contact",
    cardCtaLabel: "Book a call",
    footerLink: "Email us",
    footerLinkHref: "/contact",
  },
};

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const closeTimer = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const startCloseDelay = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => setActiveMega(null), 180);
  };

  const cancelCloseDelay = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y < 40) {
        setShowTopBanner(true);
      } else if (y > lastScrollY.current + 4) {
        setShowTopBanner(false);
      } else if (y < lastScrollY.current - 4) {
        setShowTopBanner(true);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-cliq-gray-200 bg-white/95 backdrop-blur-xl transition">
      {showTopBanner ? (
        <div className="border-b border-cliq-gray-200 bg-[#EAF4FF] py-4">
          <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-3 px-6 text-center text-[15px] text-cliq-text-heading sm:flex-row sm:text-left sm:px-10 lg:gap-6 lg:px-12">
            <span className="max-w-[56rem] text-center font-medium">
              The gap between where your business is and where it should be is one digital setup away. We close it fast.
            </span>
            <span className="flex shrink-0 flex-wrap items-center justify-center gap-2">
              <Link
                href="/signup"
                className="rounded-lg px-4 py-1.5 text-sm font-semibold text-cliq-text-heading transition underline-offset-2 hover:text-cliq-purple"
              >
                Get started for free now →
              </Link>
            </span>
          </div>
        </div>
      ) : null}
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[84px] lg:px-10">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center"
          aria-label="Home"
        >
          <span className="flex h-16 w-[16rem] max-w-[62vw] items-center overflow-hidden sm:hidden">
            <Image
              src="/logo%20mobile.png"
              alt=""
              width={480}
              height={144}
              className="h-16 w-auto max-w-none origin-left scale-[1.9] motion-reduce:scale-100"
              priority
            />
          </span>
          <span className="hidden h-16 w-[22rem] max-w-[56vw] items-center overflow-hidden sm:flex lg:h-[76px] lg:w-[31rem] lg:max-w-none">
            <Image
              src="/logo%20trans.png"
              alt=""
              width={600}
              height={180}
              className="h-16 w-auto max-w-none origin-left scale-[1.9] motion-reduce:scale-100 lg:h-[76px] lg:scale-[2.1]"
              priority
            />
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" onMouseLeave={startCloseDelay}>
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onMouseEnter={() => {
                cancelCloseDelay();
                setActiveMega(megaMenus[link.label] ? link.label : null);
              }}
              onClick={() => {
                router.push(link.href);
                setActiveMega(null);
              }}
              className="text-[15px] font-medium text-cliq-text-body transition hover:text-cliq-text-heading"
            >
              <span className="inline-flex items-center gap-1">
                {link.label}
                {megaMenus[link.label] ? (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition ${
                      activeMega === link.label ? "rotate-180" : ""
                    }`}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-4 whitespace-nowrap lg:flex">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[15px] text-cliq-text-muted transition hover:text-cliq-text-heading"
          >
            <Globe className="h-3.5 w-3.5" />
            EN
          </Link>
          {session?.user?.id ? (
            <div className="flex items-center gap-2 rounded-2xl border-2 border-cliq-navy-900/10 bg-gradient-to-b from-white to-[#f1f5f9] p-1 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
              <Link
                href="/dashboard"
                className="rounded-xl bg-cliq-navy-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-cliq-navy-800"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-xl border-2 border-cliq-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-cliq-navy-900 transition hover:border-cliq-gray-400 hover:bg-cliq-gray-100"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border-2 border-cliq-navy-900/12 bg-gradient-to-b from-white to-[#f0f7ff] p-1.5 pl-2 shadow-[0_8px_32px_rgba(37,99,235,0.12)]">
              <Link
                href="/signin"
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-cliq-navy-900 transition hover:bg-cliq-gray-100"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex min-h-[40px] items-center justify-center whitespace-nowrap rounded-xl bg-cliq-navy-800 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-cliq-navy-900"
              >
                Create account
              </Link>
            </div>
          )}
        </div>
        <button
          type="button"
          className="rounded-lg border border-cliq-gray-300 bg-white p-1.5 text-cliq-text-heading lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Open menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open ? (
        <div className="border-b border-cliq-gray-200 bg-white lg:hidden">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cliq-text-body"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session?.user?.id ? (
              <>
                <Button href="/dashboard" full>
                  Dashboard
                </Button>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full rounded-xl border-2 border-cliq-gray-300 bg-white px-5 py-3 text-sm font-bold text-cliq-navy-900 transition hover:border-cliq-gray-400 hover:bg-cliq-gray-100"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button href="/signin" full className="!font-bold hover:!bg-cliq-gray-100">
                  Sign in
                </Button>
                <Link
                  href="/signup"
                  className="inline-flex w-full min-h-12 items-center justify-center rounded-xl bg-cliq-navy-800 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cliq-navy-900"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {activeMega ? (
        <div
          onMouseEnter={cancelCloseDelay}
          onMouseLeave={startCloseDelay}
          className="absolute left-0 right-0 top-full hidden border-b border-cliq-gray-200 bg-[#f7f8fb] text-cliq-text-heading shadow-[0_18px_40px_rgba(15,23,42,0.10)] lg:block"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 py-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-[2.1fr_2.1fr_1.2fr] gap-5">
              <div className="rounded-xl border border-cliq-gray-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cliq-text-muted">
                  {megaMenus[activeMega].leftTitle}
                </p>
                <div className="mt-3 space-y-1.5">
                  {megaMenus[activeMega].leftItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveMega(null)}
                      className="block rounded-lg px-2.5 py-2 transition hover:bg-cliq-gray-100"
                    >
                      <p className="text-[15px] font-medium text-cliq-text-heading">{item.name}</p>
                      <p className="text-[13px] text-cliq-text-muted">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-cliq-gray-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cliq-text-muted">
                  {megaMenus[activeMega].rightTitle}
                </p>
                <div className="mt-3 space-y-1.5">
                  {megaMenus[activeMega].rightItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveMega(null)}
                      className="block rounded-lg px-2.5 py-2 transition hover:bg-cliq-gray-100"
                    >
                      <p className="text-[15px] font-medium text-cliq-text-heading">{item.name}</p>
                      <p className="text-[13px] text-cliq-text-muted">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-cliq-gray-200 bg-[#EFF3F8] p-4">
                <span className="rounded bg-[#DCE6F3] px-2 py-1 text-[10px] font-semibold uppercase text-cliq-navy-900">
                  {megaMenus[activeMega].cardTag}
                </span>
                <p className="mt-3 text-base font-semibold text-cliq-text-heading">
                  {megaMenus[activeMega].cardTitle}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-cliq-text-muted">
                  {megaMenus[activeMega].cardText}
                </p>
                <Button href={megaMenus[activeMega].cardCtaHref} className="mt-4 w-full text-sm">
                  {megaMenus[activeMega].cardCtaLabel}
                </Button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-cliq-gray-200 pt-3 text-sm">
              <span className="text-cliq-text-muted">Need more details?</span>
              <Link
                href={megaMenus[activeMega].footerLinkHref}
                className="inline-flex items-center gap-1 font-medium text-cliq-text-heading hover:underline"
              >
                {megaMenus[activeMega].footerLink}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
