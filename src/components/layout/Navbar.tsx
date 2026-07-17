"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { navbarBannerMotion } from "@/lib/animations";
import { LOGO_DARK_BG, LOGO_NAV_SIZES } from "@/lib/brand-logos";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/product", label: "Product" },
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
  Solutions: {
    leftTitle: "Existing companies",
    leftItems: [
      { name: "Self-employed", desc: "Freelancers and sole traders", href: "/solutions/self-employed" },
      { name: "Micro-businesses", desc: "1-9 employees", href: "/solutions/micro-businesses" },
      { name: "SMEs", desc: "10-250+ employees", href: "/solutions/smes" },
      { name: "Associations", desc: "Donations, membership fees, expenses", href: "/solutions/associations" },
    ],
    rightTitle: "Business founders",
    rightItems: [
      { name: "Business launch setup", desc: "Website, domain, email, payments", href: "/solutions/business-launch-setup" },
      { name: "Brand and automation", desc: "Invoicing, follow-ups, bulk messaging", href: "/solutions/brand-and-automation" },
    ],
    cardTag: "By stage",
    cardTitle: "Which situation sounds like yours?",
    cardText: "Browse solutions for freelancers, micro-businesses, SMEs, and associations, mapped to the right service mix.",
    cardCtaHref: "/solutions",
    cardCtaLabel: "Browse solutions",
    footerLink: "Talk to our team",
    footerLinkHref: "/contact",
  },
  Product: {
    leftTitle: "Digital setup",
    leftItems: [
      { name: "Website and landing pages", desc: "Mobile-first and conversion-focused", href: "/product/website-landing-pages" },
      { name: "Domain and hosting", desc: "SSL-secured and managed setup", href: "/product/domain-hosting" },
      { name: "Business email", desc: "Branded inboxes for your team", href: "/product/business-email" },
      { name: "Payments integration", desc: "Cards, bank transfer, and mobile checkout", href: "/product/payments-integration" },
      { name: "Invoicing and receipts", desc: "Automated branded documents", href: "/product/invoicing-receipts" },
    ],
    rightTitle: "Growth tools",
    rightItems: [
      { name: "Bulk messaging", desc: "Email, WhatsApp, and SMS campaigns", href: "/product/bulk-messaging" },
      { name: "Marketing setup", desc: "Instagram, TikTok, and Google visibility", href: "/product/marketing-setup" },
      { name: "Staff training", desc: "Hands-on onboarding for your team", href: "/product/staff-training" },
      { name: "Integrations", desc: "Connect tools you already use", href: "/product/integrations" },
    ],
    cardTag: "Platform",
    cardTitle: "Portal, verification & delivery ops",
    cardText: "See how Cedarce runs client onboarding, KYC, service requests, and admin workflows as one product.",
    cardCtaHref: "/product",
    cardCtaLabel: "Explore product",
    footerLink: "Compare packages",
    footerLinkHref: "/pricing",
  },
  Pricing: {
    leftTitle: "Pricing",
    leftItems: [
      { name: "Company creators", desc: "Setup and launch support", href: "/pricing/company-creators" },
      { name: "Self-employed", desc: "Plans built for freelancers", href: "/pricing/self-employed" },
      { name: "Micro-businesses", desc: "1-9 team members", href: "/pricing/micro-businesses" },
      { name: "SMEs", desc: "Scale with confidence", href: "/pricing/smes" },
    ],
    rightTitle: "Compare",
    rightItems: [
      { name: "Find the right plan", desc: "Compare features and limits", href: "/pricing/compare-plans" },
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
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [bannerEnter, setBannerEnter] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const transparentChrome = pathname === "/" && !scrolled && !open && !activeMega;

  useEffect(() => {
    const id = requestAnimationFrame(() => setBannerEnter(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const startCloseDelay = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
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
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      if (y < 40) setShowTopBanner(true);
      else if (y > lastScrollY.current + 4) setShowTopBanner(false);
      else if (y < lastScrollY.current - 4) setShowTopBanner(true);
      lastScrollY.current = y;
    };
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-40 border-b transition-colors duration-300 ${
        transparentChrome
          ? "border-white/10 bg-black/15 backdrop-blur-sm"
          : "border-white/10 bg-black/80 backdrop-blur-xl"
      }`}
    >
      <AnimatePresence>
        {showTopBanner ? (
          <motion.div
            key="top-banner"
            initial={navbarBannerMotion.initial}
            animate={bannerEnter ? navbarBannerMotion.animate : navbarBannerMotion.initial}
            exit={navbarBannerMotion.exit}
            transition={navbarBannerMotion.transition}
            className={`overflow-hidden border-b border-white/10 transition-colors duration-300 ${
              transparentChrome ? "bg-black/15" : "bg-cedar-raised"
            }`}
          >
            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center gap-3 px-6 py-3 text-center text-sm text-cedar-ivory/90 sm:flex-row sm:text-left sm:px-10 lg:gap-6 lg:px-12">
              <span className="max-w-[56rem] text-center font-medium">
                The gap between where your business is and where it should be is one digital setup away.
              </span>
              <Link
                href="/signup"
                className="shrink-0 text-sm font-semibold text-cedar-accent transition hover:text-cedar-ivory"
              >
                Get started →
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[84px] lg:px-10">
        <Link href="/" className="flex min-w-0 shrink-0 items-center" aria-label="Home">
          <span className="flex items-center sm:hidden">
            <Image
              src={LOGO_DARK_BG.mobile}
              alt="Cedarce"
              width={LOGO_NAV_SIZES.mobile.width}
              height={LOGO_NAV_SIZES.mobile.height}
              style={{ width: LOGO_NAV_SIZES.mobile.width, height: LOGO_NAV_SIZES.mobile.height }}
              className="object-contain object-left"
              priority
            />
          </span>
          <span className="hidden items-center sm:flex">
            <Image
              src={LOGO_DARK_BG.desktop}
              alt="Cedarce"
              width={LOGO_NAV_SIZES.desktopLg.width}
              height={LOGO_NAV_SIZES.desktopLg.height}
              style={{ width: LOGO_NAV_SIZES.desktopLg.width, height: LOGO_NAV_SIZES.desktopLg.height }}
              className="object-contain object-left"
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" onMouseLeave={startCloseDelay}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => {
                cancelCloseDelay();
                setActiveMega(megaMenus[link.label] ? link.label : null);
              }}
              onClick={() => setActiveMega(null)}
              className="text-[15px] font-medium text-white/70 transition hover:text-cedar-ivory"
            >
              <span className="inline-flex items-center gap-1">
                {link.label}
                {megaMenus[link.label] ? (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition ${activeMega === link.label ? "rotate-180" : ""}`}
                  />
                ) : null}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 whitespace-nowrap lg:flex">
          {session?.user?.id ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg bg-cedar-ivory px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-cedar-ivory transition hover:border-white/40"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:text-cedar-ivory"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="motion-safe:animate-breathe rounded-lg bg-cedar-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 motion-safe:hover:[animation-play-state:paused]"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 text-cedar-ivory lg:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[var(--site-nav-height)] z-50 flex flex-col overflow-y-auto border-t border-white/10 bg-black lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-1 px-4 py-6 sm:px-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-4 text-2xl font-display text-cedar-ivory transition hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
                {session?.user?.id ? (
                  <>
                    <Button href="/dashboard" full onClick={() => setOpen(false)}>
                      Dashboard
                    </Button>
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-cedar-ivory"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Button href="/signin" variant="secondary" full onClick={() => setOpen(false)}>
                      Sign in
                    </Button>
                    <Button href="/signup" variant="accent" full onClick={() => setOpen(false)}>
                      Create account
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {activeMega ? (
        <div
          onMouseEnter={cancelCloseDelay}
          onMouseLeave={startCloseDelay}
          className="absolute left-0 right-0 top-full hidden border-b border-white/10 bg-cedar-ink text-cedar-ivory shadow-elegant lg:block"
        >
          <div className="mx-auto w-full max-w-[1440px] px-6 py-6 sm:px-10 lg:px-12">
            <div className="grid grid-cols-[2.1fr_2.1fr_1.2fr] gap-5">
              <div className="border border-white/10 bg-black/40 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cedar-mist">
                  {megaMenus[activeMega].leftTitle}
                </p>
                <div className="mt-3 space-y-1">
                  {megaMenus[activeMega].leftItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveMega(null)}
                      className="block rounded-lg px-2.5 py-2 transition hover:bg-white/5"
                    >
                      <p className="text-[15px] font-medium text-cedar-ivory">{item.name}</p>
                      <p className="text-[13px] text-cedar-mist">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 bg-black/40 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cedar-mist">
                  {megaMenus[activeMega].rightTitle}
                </p>
                <div className="mt-3 space-y-1">
                  {megaMenus[activeMega].rightItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveMega(null)}
                      className="block rounded-lg px-2.5 py-2 transition hover:bg-white/5"
                    >
                      <p className="text-[15px] font-medium text-cedar-ivory">{item.name}</p>
                      <p className="text-[13px] text-cedar-mist">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border border-cedar-accent/25 bg-cedar-accentSoft p-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cedar-accent">
                  {megaMenus[activeMega].cardTag}
                </span>
                <p className="mt-3 text-base font-semibold text-cedar-ivory">
                  {megaMenus[activeMega].cardTitle}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-cedar-mist">
                  {megaMenus[activeMega].cardText}
                </p>
                <Button href={megaMenus[activeMega].cardCtaHref} variant="accent" className="mt-4 w-full text-sm">
                  {megaMenus[activeMega].cardCtaLabel}
                </Button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
              <span className="text-cedar-mist">Need more details?</span>
              <Link
                href={megaMenus[activeMega].footerLinkHref}
                className="inline-flex items-center gap-1 font-medium text-cedar-ivory hover:text-cedar-accent"
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
