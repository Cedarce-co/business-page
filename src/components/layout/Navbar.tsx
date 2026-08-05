"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import CurrencySwitcher from "@/components/layout/CurrencySwitcher";
import { LOGO_DARK_BG, LOGO_NAV_SIZES } from "@/lib/brand-logos";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/solutions", label: "Business" },
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
  Business: {
    leftTitle: "Business you serve",
    leftItems: [
      { name: "Small businesses", desc: "Owner-run shops and professional services", href: "/solutions/self-employed" },
      { name: "Shops, malls & stores", desc: "Track sales and store inventory, online and in store", href: "/solutions/micro-businesses" },
      { name: "Medium businesses", desc: "Growing teams ready for a full setup", href: "/solutions/smes" },
      { name: "Associations", desc: "Groups, clubs, and member organizations", href: "/solutions/associations" },
    ],
    rightTitle: "Getting started",
    rightItems: [
      { name: "Business launch setup", desc: "Website, name address, email, and tools", href: "/solutions/business-launch-setup" },
      { name: "Brand and everyday systems", desc: "Invoices, follow-ups, and messaging", href: "/solutions/brand-and-automation" },
    ],
    cardTag: "By stage",
    cardTitle: "Which sounds most like you?",
    cardText: "Browse setups for small businesses, shops and stores, medium businesses, and associations. Matched to what you actually need.",
    cardCtaHref: "/solutions",
    cardCtaLabel: "Browse business types",
    footerLink: "Talk to our team",
    footerLinkHref: "/contact",
  },
  Services: {
    leftTitle: "Core setup",
    leftItems: [
      { name: "Website and landing pages", desc: "Pages that look great on phones and computers", href: "/product/website-landing-pages" },
      { name: "Domain and hosting", desc: "Your web address, kept safe and running", href: "/product/domain-hosting" },
      { name: "Business email", desc: "Email that uses your business name", href: "/product/business-email" },
      { name: "Payments", desc: "Let customers pay you online when you need it", href: "/product/payments-integration" },
      { name: "Invoicing and receipts", desc: "Clean bills with your brand name", href: "/product/invoicing-receipts" },
    ],
    rightTitle: "Growth tools",
    rightItems: [
      { name: "Bulk messaging", desc: "Email, WhatsApp, and SMS to many people at once", href: "/product/bulk-messaging" },
      { name: "Marketing setup", desc: "Help people find you on social and search", href: "/product/marketing-setup" },
      { name: "Staff training", desc: "Hands-on practice for your team", href: "/product/staff-training" },
      { name: "Integrations", desc: "Connect tools you already use", href: "/product/integrations" },
    ],
    cardTag: "Services",
    cardTitle: "Pick what you need",
    cardText: "Websites, email, invoices, messaging, and more. Each service can stand alone or work together.",
    cardCtaHref: "/product",
    cardCtaLabel: "Explore services",
    footerLink: "Compare packages",
    footerLinkHref: "/pricing",
  },
  Pricing: {
    leftTitle: "Pricing",
    leftItems: [
      { name: "Company creators", desc: "Setup and launch support", href: "/pricing/company-creators" },
      { name: "Small businesses", desc: "Plans built for owner-led work", href: "/pricing/self-employed" },
      { name: "Shops, malls & stores", desc: "Sales tracking and stock setups for retail", href: "/pricing/micro-businesses" },
      { name: "Medium businesses", desc: "Scale with a full digital setup", href: "/pricing/smes" },
    ],
    rightTitle: "Compare",
    rightItems: [
      { name: "Find the right plan", desc: "Compare packages side by side", href: "/pricing/compare-plans" },
      { name: "Need help choosing?", desc: "Speak with our team", href: "/contact" },
    ],
    cardTag: "Consultation",
    cardTitle: "Not sure which tier fits?",
    cardText: "Book a short call. We’ll match a package to your goals and budget. Starting from as low as our Small Business range.",
    cardCtaHref: "/contact",
    cardCtaLabel: "Book a call",
    footerLink: "Email us",
    footerLinkHref: "/contact",
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<number | null>(null);
  const transparentChrome = pathname === "/" && !scrolled && !activeMega;

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
      setScrolled(window.scrollY > 16);
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


  return (
    <>
      {/* Mobile: currency switcher only — no logo, no nav bar */}
      <div className="fixed right-3 top-3 z-50 lg:hidden">
        <CurrencySwitcher size="sm" />
      </div>

      {/* Desktop header only */}
      <header
        ref={headerRef}
        className={`fixed left-0 right-0 top-0 z-40 hidden border-b transition-colors duration-300 lg:block ${
          transparentChrome
            ? "border-white/10 bg-black/15 backdrop-blur-sm"
            : "border-white/10 bg-black/80 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-[84px] w-full max-w-[1440px] items-center px-10">
          <div className="flex min-w-0 flex-1 items-center justify-start">
            <Link href="/" className="flex shrink-0 items-center" aria-label="Home">
              <Image
                src={LOGO_DARK_BG.desktop}
                alt="Cedarce"
                width={LOGO_NAV_SIZES.desktopLg.width}
                height={LOGO_NAV_SIZES.desktopLg.height}
                style={{ width: LOGO_NAV_SIZES.desktopLg.width, height: LOGO_NAV_SIZES.desktopLg.height }}
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          <nav className="flex shrink-0 items-center gap-8" onMouseLeave={startCloseDelay}>
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

          <div className="flex min-w-0 flex-1 items-center">
            {/* Centers switcher in the open space between Contact and Sign in */}
            <div className="flex min-w-0 flex-1 items-center justify-center px-3">
              <CurrencySwitcher size="sm" />
            </div>
            <div className="flex shrink-0 items-center gap-3 whitespace-nowrap">
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
                    className="inline-flex items-center gap-2 rounded-lg bg-cedar-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
                  >
                    Create account
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {activeMega ? (
          <div
            onMouseEnter={cancelCloseDelay}
            onMouseLeave={startCloseDelay}
            className="absolute left-0 right-0 top-full border-b border-white/10 bg-cedar-ink text-cedar-ivory shadow-elegant"
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
    </>
  );
}
