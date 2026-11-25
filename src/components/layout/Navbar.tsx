"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import BrandLogo from "@/components/ui/BrandLogo";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CurrencySwitcher from "@/components/layout/CurrencySwitcher";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/solutions", label: "Who we help" },
  { href: "/product", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
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
  "Who we help": {
    leftTitle: "Businesses we work with",
    leftItems: [
      { name: "Small businesses", desc: "Owner-run shops and services", href: "/solutions/self-employed" },
      { name: "Shops & stores", desc: "Keep track of sales and stock", href: "/solutions/micro-businesses" },
      { name: "Growing businesses", desc: "Bigger teams ready for a full setup", href: "/solutions/smes" },
      { name: "Associations & groups", desc: "Churches, clubs and member groups", href: "/solutions/associations" },
    ],
    rightTitle: "Getting started",
    rightItems: [
      { name: "Starting a new business", desc: "Website, web address, email and payments", href: "/solutions/business-launch-setup" },
      { name: "Automatic invoices & reminders", desc: "Bills and messages that send on their own", href: "/solutions/brand-and-automation" },
    ],
    cardTag: "Find your fit",
    cardTitle: "Which one sounds like you?",
    cardText: "See what we set up for small businesses, shops, growing businesses and associations. Only what you actually need.",
    cardCtaHref: "/solutions",
    cardCtaLabel: "See who we help",
    footerLink: "Talk to us",
    footerLinkHref: "/contact",
  },
  Services: {
    leftTitle: "Get online",
    leftItems: [
      { name: "Websites", desc: "Pages that look great on phones and computers", href: "/product/website-landing-pages" },
      { name: "Web address & hosting", desc: "Your own .com, kept safe and online", href: "/product/domain-hosting" },
      { name: "Business email", desc: "Email with your business name", href: "/product/business-email" },
      { name: "Online payments", desc: "Let customers pay you by card or transfer", href: "/product/payments-integration" },
      { name: "Invoices & receipts", desc: "Neat bills with your logo", href: "/product/invoicing-receipts" },
    ],
    rightTitle: "Grow your sales",
    rightItems: [
      { name: "Bulk messages", desc: "Email, WhatsApp and SMS to many people at once", href: "/product/bulk-messaging" },
      { name: "Social media & Google", desc: "Help people find you online", href: "/product/marketing-setup" },
      { name: "Staff training", desc: "Hands-on lessons for your team", href: "/product/staff-training" },
      { name: "Connect your tools", desc: "Make your tools share information", href: "/product/integrations" },
    ],
    cardTag: "Services",
    cardTitle: "Pick what you need",
    cardText: "Websites, email, invoices, customer messages and more. Start with one, add more later.",
    cardCtaHref: "/product",
    cardCtaLabel: "See all services",
    footerLink: "Compare packages",
    footerLinkHref: "/pricing",
  },
  Pricing: {
    leftTitle: "Prices for",
    leftItems: [
      { name: "New businesses", desc: "Just registered? Start here", href: "/pricing/company-creators" },
      { name: "Small businesses", desc: "For owner-run businesses", href: "/pricing/self-employed" },
      { name: "Shops & stores", desc: "Sales and stock tracking for shops", href: "/pricing/micro-businesses" },
      { name: "Growing businesses", desc: "A full setup for bigger teams", href: "/pricing/smes" },
    ],
    rightTitle: "Compare",
    rightItems: [
      { name: "Compare packages", desc: "See the packages side by side", href: "/pricing/compare-plans" },
      { name: "Need help choosing?", desc: "Talk to our team", href: "/contact" },
    ],
    cardTag: "Need help?",
    cardTitle: "Not sure which package fits?",
    cardText: "Have a short chat with us. We'll match a package to your business and budget. Prices start from our Small Business package.",
    cardCtaHref: "/contact",
    cardCtaLabel: "Talk to us",
    footerLink: "Email us",
    footerLinkHref: "/contact",
  },
};

export default function Navbar() {
  const pathname = usePathname() ?? "";
  // Prices only appear on /pricing and its package pages, so the switcher lives there only.
  const showCurrency = pathname === "/pricing" || pathname.startsWith("/pricing/");
  const { data: session } = useSession();
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const startCloseDelay = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setActiveMega(null);
      setHovered(null);
    }, 180);
  };

  const cancelCloseDelay = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncNavHeight = () => {
      document.documentElement.style.setProperty(
        "--site-nav-height",
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      );
    };

    syncNavHeight();
    const observer = new ResizeObserver(syncNavHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const mega = activeMega ? megaMenus[activeMega] : null;

  return (
    <>
      {/* Mobile: no nav bar; currency switcher floats top-right on pricing pages only */}
      {showCurrency ? (
        <div className="fixed right-3 top-3 z-50 lg:hidden">
          <CurrencySwitcher size="sm" />
        </div>
      ) : null}

      {/* Desktop: floating glass pill */}
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-40 hidden px-6 pt-4 lg:block">
        <div
          className={cn(
            "mx-auto flex h-16 w-full max-w-[1200px] items-center rounded-full pl-6 pr-2 transition-all duration-500",
            scrolled || activeMega ? "glass" : "border border-white/60 bg-white/70 backdrop-blur-xl",
          )}
        >
          <div className="flex min-w-0 flex-1 items-center">
            <Link href="/" className="flex shrink-0 items-center" aria-label="Home">
              <BrandLogo height={30} />
            </Link>
          </div>

          <nav
            className="flex shrink-0 items-center gap-1"
            onMouseLeave={startCloseDelay}
            aria-label="Main"
          >
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const hasMega = Boolean(megaMenus[link.label]);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => {
                    cancelCloseDelay();
                    setHovered(link.label);
                    setActiveMega(hasMega ? link.label : null);
                  }}
                  onFocus={() => setHovered(link.label)}
                  onClick={() => setActiveMega(null)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                    active || hovered === link.label ? "text-brand-800" : "text-slate-600",
                  )}
                >
                  {hovered === link.label ? (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full bg-brand-50"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative inline-flex items-center gap-1">
                    {link.label}
                    {hasMega ? (
                      <ChevronDown
                        className={cn("h-3.5 w-3.5 transition", activeMega === link.label && "rotate-180")}
                        aria-hidden
                      />
                    ) : null}
                    {active ? (
                      <span aria-hidden className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-500" />
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            {showCurrency ? <CurrencySwitcher size="sm" /> : null}
            {session?.user?.id ? (
              <>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-brand-800"
                >
                  Sign out
                </button>
                <Button href="/dashboard" className="!py-2.5 !text-sm">
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-brand-800"
                >
                  Sign in
                </Link>
                <WhatsAppButton className="whitespace-nowrap !py-2.5 !text-sm">
                  WhatsApp us
                </WhatsAppButton>
              </>
            )}
          </div>
        </div>

        <AnimatePresence>
          {mega ? (
            <motion.div
              key="mega"
              onMouseEnter={cancelCloseDelay}
              onMouseLeave={startCloseDelay}
              initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 w-full max-w-[1200px] overflow-hidden rounded-[2rem] border border-line bg-white/95 p-3 shadow-lift backdrop-blur-xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMega}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-[1fr_1fr_0.9fr] gap-3"
                >
                  {[
                    { title: mega.leftTitle, items: mega.leftItems },
                    { title: mega.rightTitle, items: mega.rightItems },
                  ].map((col) => (
                    <div key={col.title} className="rounded-3xl p-4">
                      <p className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {col.title}
                      </p>
                      <div className="mt-2 space-y-0.5">
                        {col.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveMega(null)}
                            className="group/item flex items-start justify-between gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-brand-50"
                          >
                            <span>
                              <span className="block text-[15px] font-semibold text-brand-950">{item.name}</span>
                              <span className="block text-[13px] text-slate-500">{item.desc}</span>
                            </span>
                            <ArrowRight
                              className="mt-1 h-4 w-4 shrink-0 -translate-x-1 text-brand-500 opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100"
                              aria-hidden
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="relative overflow-hidden rounded-3xl bg-deep-blue p-6 text-white">
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-line-grid-light opacity-60" />
                    <div className="relative flex h-full flex-col">
                      <span className="inline-flex w-fit rounded-full glass-blue px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                        {mega.cardTag}
                      </span>
                      <p className="mt-4 text-xl font-semibold tracking-tight">{mega.cardTitle}</p>
                      <p className="mt-2 text-[13px] leading-relaxed text-brand-100/85">{mega.cardText}</p>
                      <div className="mt-auto flex flex-col gap-3 pt-6">
                        <Button href={mega.cardCtaHref} variant="onBanner" className="w-full !text-sm">
                          {mega.cardCtaLabel}
                        </Button>
                        <Link
                          href={mega.footerLinkHref}
                          onClick={() => setActiveMega(null)}
                          className="inline-flex items-center justify-center gap-1 text-sm font-medium text-brand-100 transition hover:text-white"
                        >
                          {mega.footerLink}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
