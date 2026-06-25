import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { LOGO_FOOTER_SIZES, LOGO_LIGHT_BG } from "@/lib/brand-logos";
import ContactInfoList from "@/components/ui/ContactInfoList";
import Button from "@/components/ui/Button";

const getStarted = [
  { label: "Create free account", href: "/signup", desc: "Request services and track delivery" },
  { label: "Book a consultation", href: "/contact", desc: "Map the right package for you" },
  { label: "Request a service", href: "/request-service", desc: "Tell us what to set up first" },
  { label: "View pricing", href: "/pricing", desc: "Compare Starter, Business, Enterprise" },
] as const;

export default function Footer() {
  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <footer id="site-footer" className="border-t border-cliq-gray-200 bg-gradient-to-b from-white to-cliq-gray-100/80">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-4">
            <Link href="/" className="inline-flex min-w-0 items-center justify-center sm:justify-start" aria-label="Home">
              <span className="flex items-center sm:hidden">
                <Image
                  src={LOGO_LIGHT_BG.mobile}
                  alt="Cedarce"
                  width={LOGO_FOOTER_SIZES.mobile.width}
                  height={LOGO_FOOTER_SIZES.mobile.height}
                  className="h-[72px] w-[74px] object-contain object-left"
                />
              </span>
              <span className="hidden items-center sm:flex">
                <Image
                  src={LOGO_LIGHT_BG.desktop}
                  alt="Cedarce"
                  width={LOGO_FOOTER_SIZES.desktop.width}
                  height={LOGO_FOOTER_SIZES.desktop.height}
                  className="h-20 w-[327px] object-contain object-left"
                />
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cliq-text-body">
            We give your business its digital pulse.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-cliq-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-600" aria-hidden />
                Typical setup in days
              </span>
              {/* <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-cl
Repository
￼
Instant Rollback
Visit
￼
iq-navy-800" aria-hidden />
                Human-led delivery
              </span> */}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-cliq-text-heading">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-sm text-cliq-text-muted transition hover:text-cliq-text-heading"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-cliq-text-heading">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-cliq-text-muted transition hover:text-cliq-text-heading">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold text-cliq-text-heading">Get started</h4>
            <ul className="mt-4 space-y-3">
              {getStarted.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex flex-col rounded-xl border border-transparent px-0 py-1 transition hover:border-cliq-gray-200 hover:bg-white"
                  >
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-cliq-text-heading">
                      {item.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </span>
                    <span className="text-xs text-cliq-text-muted">{item.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-2xl gap-8 rounded-3xl border border-cliq-gray-200 bg-white p-8 shadow-card md:grid-cols-2 lg:mt-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <h4 className="text-lg font-bold text-cliq-text-heading">Talk to us</h4>
            <p className="mt-2 text-sm text-cliq-text-muted">
              Prefer email or phone? We reply quickly, and live chat is on the site when we&apos;re online.
            </p>
            <div className="mt-4">
              <ContactInfoList showHours hours="short" />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button href="/signup" variant="secondary" className="rounded-xl px-6 py-3 text-sm font-bold">
              Or get started for free now
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-cliq-gray-200 pt-8">
          <p className="text-center text-sm text-cliq-text-muted">
            © {new Date().getFullYear()} Cedarce Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
