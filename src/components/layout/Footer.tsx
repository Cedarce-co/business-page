import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { LOGO_DARK_BG, LOGO_FOOTER_SIZES } from "@/lib/brand-logos";
import ContactInfoList from "@/components/ui/ContactInfoList";
import Button from "@/components/ui/Button";

const solutionLinks = [
  { label: "Self-employed", href: "/solutions/self-employed" },
  { label: "Micro-businesses", href: "/solutions/micro-businesses" },
  { label: "SMEs", href: "/solutions/smes" },
  { label: "Associations", href: "/solutions/associations" },
  { label: "View all solutions", href: "/solutions" },
] as const;

const productLinks = [
  { label: "Websites & landing pages", href: "/product/website-landing-pages" },
  { label: "Business email", href: "/product/business-email" },
  { label: "Payments integration", href: "/product/payments-integration" },
  { label: "Invoicing & receipts", href: "/product/invoicing-receipts" },
  { label: "View all products", href: "/product" },
] as const;

type FooterLinkItem = {
  label: string;
  href: string;
};

function FooterLinkPanel({
  title,
  links,
  wide = false,
}: {
  title: string;
  links: readonly FooterLinkItem[];
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-zinc-950/70 p-4 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 ${
        wide ? "col-span-2 lg:col-span-1" : ""
      }`}
    >
      <h4 className="text-sm font-semibold text-cedar-ivory">{title}</h4>
      <ul className={`mt-4 grid gap-2.5 ${wide ? "grid-cols-2 lg:grid-cols-1" : "grid-cols-1"}`}>
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-cedar-mist transition hover:text-cedar-ivory">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const companyLinks = [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <footer id="site-footer" className="border-t border-white/10 bg-black pb-[calc(var(--site-mobile-tab-height)+0.5rem)] lg:pb-0">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="col-span-2 rounded-[1.75rem] border border-white/10 bg-zinc-950/80 p-6 text-center lg:col-span-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-left">
            <Link href="/" className="inline-flex min-w-0 items-center justify-center lg:justify-start" aria-label="Home">
              <span className="flex items-center sm:hidden">
                <Image
                  src={LOGO_DARK_BG.mobile}
                  alt="Cedarce"
                  width={LOGO_FOOTER_SIZES.mobile.width}
                  height={LOGO_FOOTER_SIZES.mobile.height}
                  style={{
                    width: LOGO_FOOTER_SIZES.mobile.width,
                    height: LOGO_FOOTER_SIZES.mobile.height,
                  }}
                  className="object-contain object-left"
                />
              </span>
              <span className="hidden items-center sm:flex">
                <Image
                  src={LOGO_DARK_BG.desktop}
                  alt="Cedarce"
                  width={LOGO_FOOTER_SIZES.desktop.width}
                  height={LOGO_FOOTER_SIZES.desktop.height}
                  style={{
                    width: LOGO_FOOTER_SIZES.desktop.width,
                    height: LOGO_FOOTER_SIZES.desktop.height,
                  }}
                  className="object-contain object-left"
                />
              </span>
            </Link>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-cedar-mist lg:mx-0">
              We give your business its digital pulse.
            </p>
            <div className="mt-5 flex justify-center text-xs text-cedar-mist lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cedar-accent" aria-hidden />
                Typical setup in days
              </span>
            </div>
          </div>

          <FooterLinkPanel
            title="Services"
            wide
            links={SERVICES.map((service) => ({
              label: service.name,
              href: `/services/${service.id}`,
            }))}
          />
          <FooterLinkPanel title="Solutions" links={solutionLinks} />
          <FooterLinkPanel title="Products" links={productLinks} />
          <FooterLinkPanel title="Company" wide links={companyLinks} />
        </div>

        <div className="mx-auto mt-6 grid w-full gap-4 rounded-[1.75rem] border border-cedar-accent/20 bg-cedar-accentSoft p-5 md:grid-cols-2 lg:mt-16 lg:max-w-2xl lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:rounded-none lg:border-0 lg:border-t lg:border-white/10 lg:bg-transparent lg:p-0 lg:pt-10">
          <div>
            <h4 className="font-display text-2xl text-cedar-ivory">Talk to us</h4>
            <p className="mt-2 text-sm text-cedar-mist">
              Prefer email or phone? We reply quickly, and live chat is on the site when we&apos;re online.
            </p>
            <div className="mt-4 text-cedar-mist [&_a]:text-cedar-ivory [&_a]:hover:text-cedar-accent">
              <ContactInfoList showHours hours="short" />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button href="/signup" variant="accent" className="px-6 py-3 text-sm">
              Get started for free
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 lg:mt-12 lg:pt-8">
          <p className="text-center text-sm text-cedar-mist">
            © {new Date().getFullYear()} Cedarce Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
