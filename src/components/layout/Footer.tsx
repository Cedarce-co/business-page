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
    <footer id="site-footer" className="border-t border-white/10 bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <Link href="/" className="inline-flex min-w-0 items-center justify-center sm:justify-start" aria-label="Home">
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
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cedar-mist">
              We give your business its digital pulse.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-cedar-mist">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-cedar-accent" aria-hidden />
                Typical setup in days
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cedar-ivory">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-sm text-cedar-mist transition hover:text-cedar-ivory"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cedar-ivory">Solutions</h4>
            <ul className="mt-4 space-y-2.5">
              {solutionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-cedar-mist transition hover:text-cedar-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cedar-ivory">Products</h4>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-cedar-mist transition hover:text-cedar-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-cedar-ivory">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-cedar-mist transition hover:text-cedar-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-2xl gap-8 border-t border-white/10 pt-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
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

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-cedar-mist">
            © {new Date().getFullYear()} Cedarce Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
