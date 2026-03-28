/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, Globe, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/services", label: "Solutions" },
  { href: "/about", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Resources" },
];

type MegaItem = { name: string; desc: string };
type MegaBlock = {
  leftTitle: string;
  leftItems: MegaItem[];
  rightTitle: string;
  rightItems: MegaItem[];
  cardTag: string;
  cardTitle: string;
  cardText: string;
  footerLink: string;
};

const megaMenus: Record<string, MegaBlock> = {
  Solutions: {
    leftTitle: "Existing companies",
    leftItems: [
      { name: "Self-employed", desc: "Freelancers and sole traders" },
      { name: "Micro-businesses", desc: "1-9 employees" },
      { name: "SMEs", desc: "10-250+ employees" },
      { name: "Associations", desc: "Donations, membership fees, expenses" },
    ],
    rightTitle: "Business founders",
    rightItems: [
      { name: "Business launch setup", desc: "Website, domain, email, payments" },
      { name: "Brand and automation", desc: "Invoicing, follow-ups, bulk messaging" },
    ],
    cardTag: "Contact sales",
    cardTitle: "Need more information?",
    cardText: "Got questions or looking for a product demo? Our team is on hand to help.",
    footerLink: "Contact our Sales team",
  },
  Product: {
    leftTitle: "Digital setup",
    leftItems: [
      { name: "Website and landing pages", desc: "Mobile-first and conversion-focused" },
      { name: "Domain and hosting", desc: "SSL-secured and managed setup" },
      { name: "Business email", desc: "Branded inboxes for your team" },
      { name: "Payments integration", desc: "Card, transfer, and USSD collection" },
      { name: "Invoicing and receipts", desc: "Automated branded documents" },
    ],
    rightTitle: "Growth tools",
    rightItems: [
      { name: "Bulk messaging", desc: "Email, WhatsApp, and SMS campaigns" },
      { name: "Marketing setup", desc: "Instagram, TikTok, and Google visibility" },
      { name: "Staff training", desc: "Hands-on onboarding for your team" },
      { name: "Integrations", desc: "Connect tools you already use" },
    ],
    cardTag: "New",
    cardTitle: "48-hour setup option",
    cardText: "Launch your digital business infrastructure fast with Cedarce.",
    footerLink: "Explore product",
  },
  Pricing: {
    leftTitle: "Pricing",
    leftItems: [
      { name: "Company creators", desc: "Setup and launch support" },
      { name: "Self-employed", desc: "Plans built for freelancers" },
      { name: "Micro-businesses", desc: "1-9 team members" },
      { name: "SMEs", desc: "Scale with confidence" },
    ],
    rightTitle: "Compare",
    rightItems: [
      { name: "Find the right plan", desc: "Compare features and limits" },
      { name: "Need help choosing?", desc: "Speak with our team" },
    ],
    cardTag: "Resource",
    cardTitle: "Calculate your savings",
    cardText: "Estimate how much time and admin cost your business can save.",
    footerLink: "Find the right plan",
  },
  Resources: {
    leftTitle: "Resources",
    leftItems: [
      { name: "Resource hub", desc: "Guides and practical templates" },
      { name: "Blog", desc: "Business finance insights" },
      { name: "Finance glossary", desc: "Clear definitions, no jargon" },
      { name: "Compare accounts", desc: "Pick what fits your business" },
    ],
    rightTitle: "About",
    rightItems: [
      { name: "Our story", desc: "How Cedarce started" },
      { name: "Why Cedarce?", desc: "What makes our setup different" },
      { name: "Our customers", desc: "Stories from growing businesses" },
      { name: "Impact", desc: "How we support SMEs at scale" },
    ],
    cardTag: "Support",
    cardTitle: "FAQ and customer support",
    cardText: "Fast answers and practical guidance from a real team.",
    footerLink: "Visit support",
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(false);
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
    setOpen(false);
    setActiveMega(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (bannerDismissed) return;

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
  }, [bannerDismissed]);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-cliq-gray-200 bg-white/95 backdrop-blur-xl transition">
      {!bannerDismissed && showTopBanner ? (
        <div className="border-b border-cliq-gray-200 bg-[#EAF4FF] py-4">
          <div className="relative mx-auto flex max-w-[1260px] items-center justify-center gap-4 px-10 text-[15px] text-cliq-text-heading sm:px-12 lg:px-14">
            <span className="font-medium">
              New: Get your website, payments, and invoicing setup in as little as 48 hours.
            </span>
            <Link
              href="/pricing"
              className="rounded-lg border border-cliq-gray-300 bg-white px-4 py-1 text-sm font-medium"
            >
              Discover
            </Link>
            <button
              type="button"
              onClick={() => {
                setBannerDismissed(true);
                setShowTopBanner(false);
              }}
              className="absolute right-4 inline-flex items-center justify-center rounded-md p-1 text-cliq-text-muted transition hover:bg-white/70 hover:text-cliq-text-heading sm:right-6 lg:right-8"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
      <div className="mx-auto flex h-[66px] max-w-[1260px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-end gap-1.5">
          <span className="text-lg font-black tracking-tight text-cliq-navy-900 sm:text-xl">CEDARCE</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" onMouseLeave={startCloseDelay}>
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onMouseEnter={() => {
                cancelCloseDelay();
                setActiveMega(link.label);
              }}
              onClick={() => {
                router.push(link.href);
                setActiveMega(null);
              }}
              className="text-[15px] font-medium text-cliq-text-body transition hover:text-cliq-text-heading"
            >
              <span className="inline-flex items-center gap-1">
                {link.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition ${
                    activeMega === link.label ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[15px] text-cliq-text-muted transition hover:text-cliq-text-heading"
          >
            <Globe className="h-3.5 w-3.5" />
            EN
          </Link>
          <Link href="/signin" className="text-[15px] text-cliq-text-muted transition hover:text-cliq-text-heading">
            Sign In
          </Link>
          <Button href="/contact" className="rounded-xl px-5 py-2.5 text-sm">
            Open an account
          </Button>
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
          <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
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
            <Button href="/contact" full>
              Open an account
            </Button>
          </div>
        </div>
      ) : null}
      {activeMega ? (
        <div
          onMouseEnter={cancelCloseDelay}
          onMouseLeave={startCloseDelay}
          className="absolute left-0 right-0 top-full hidden border-b border-cliq-gray-200 bg-[#f7f8fb] text-cliq-text-heading shadow-[0_18px_40px_rgba(15,23,42,0.10)] lg:block"
        >
          <div className="mx-auto max-w-[1260px] px-8 py-6">
            <div className="grid grid-cols-[2.1fr_2.1fr_1.2fr] gap-5">
              <div className="rounded-xl border border-cliq-gray-200 bg-white px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cliq-text-muted">
                  {megaMenus[activeMega].leftTitle}
                </p>
                <div className="mt-3 space-y-1.5">
                  {megaMenus[activeMega].leftItems.map((item) => (
                    <Link
                      key={item.name}
                      href={activeMega === "Pricing" ? "/pricing" : "/services"}
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
                      href={activeMega === "Resources" ? "/blog" : activeMega === "Product" ? "/services" : "/about"}
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
                <Button href="/contact" className="mt-4 w-full text-sm">
                  Learn more
                </Button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-cliq-gray-200 pt-3 text-sm">
              <span className="text-cliq-text-muted">Need more details?</span>
              <Link
                href="/contact"
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
