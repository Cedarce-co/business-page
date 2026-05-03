import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Shield } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from "@/lib/contact";
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
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <footer className="border-t border-cliq-gray-200 bg-gradient-to-b from-white to-cliq-gray-100/80">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex min-w-0 items-center" aria-label="Home">
              <span className="flex h-20 w-full max-w-[24rem] items-center overflow-hidden sm:hidden">
                <Image
                  src="/logo%20mobile.png"
                  alt=""
                  width={480}
                  height={144}
                  className="h-20 w-auto max-w-none origin-left scale-[1.42] motion-reduce:scale-100"
                />
              </span>
              <span className="hidden h-24 w-full max-w-[30rem] items-center overflow-hidden sm:flex lg:max-w-[38rem]">
                <Image
                  src="/logo%20trans.png"
                  alt=""
                  width={600}
                  height={180}
                  className="h-24 w-auto max-w-none origin-left scale-[1.34] motion-reduce:scale-100"
                />
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cliq-text-body">
              Going professional isn&apos;t a cost; it&apos;s the investment that makes every other investment work. We set up websites, payments, email, and automation so businesses look credible and get paid faster.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-cliq-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-600" aria-hidden />
                Typical setup in days
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-cliq-navy-800" aria-hidden />
                Human-led delivery
              </span>
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

        <div className="mt-14 grid gap-8 rounded-3xl border border-cliq-gray-200 bg-white p-8 shadow-card md:grid-cols-2 lg:mt-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <h4 className="text-lg font-bold text-cliq-text-heading">Talk to us</h4>
            <p className="mt-2 text-sm text-cliq-text-muted">
              Prefer email or phone? We reply quickly, and live chat is on the site when we&apos;re online.
            </p>
            <div className="mt-4 space-y-1 text-sm text-cliq-text-body">
              <p>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium underline-offset-4 hover:underline">
                  {SUPPORT_EMAIL}
                </a>
              </p>
              <p>
                <a href={`tel:${SUPPORT_PHONE_TEL}`} className="font-medium underline-offset-4 hover:underline">
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button href="/signup" variant="secondary" className="rounded-xl px-6 py-3 text-sm font-bold">
              Get started for free now
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
