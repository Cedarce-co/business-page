/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
import Image from "next/image";
import Link from "next/link";
import { Globe, MessageCircle, Music2, TrendingUp, Users } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from "@/lib/contact";
import Button from "@/components/ui/Button";

export default function Footer() {
  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="border-t border-cliq-gray-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex min-w-0 items-center" aria-label="Cedarce home">
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
            <p className="mt-2 text-sm text-cliq-text-body">Digital business services.</p>
            <p className="mt-1 text-xs text-cliq-text-muted">Visibility · Automation · Scalability</p>
            <div className="mt-4 flex gap-3 text-cliq-text-muted">
              {[MessageCircle, Music2, Globe, Users, TrendingUp].map((Icon, i) => (
                <Icon key={i} className="h-5 w-5 cursor-pointer transition hover:text-cliq-navy-800" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-cliq-text-heading">Services</h4>
            <ul className="space-y-2">
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

          <div>
            <h4 className="mb-4 text-sm font-semibold text-cliq-text-heading">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-cliq-text-muted transition hover:text-cliq-text-heading"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-cliq-text-heading">Get In Touch</h4>
            <p className="text-sm text-cliq-text-body">
              <a href={`mailto:${SUPPORT_EMAIL}`} className="transition hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </p>
            <p className="mt-1 text-sm text-cliq-text-body">
              <a href={`tel:${SUPPORT_PHONE_TEL}`} className="transition hover:underline">
                {SUPPORT_PHONE_DISPLAY}
              </a>
            </p>
            <p className="mt-2 text-sm text-cliq-text-muted">Use Cedarce AI chat for instant answers</p>
            <Button href="/contact" variant="primary" className="mt-4 text-sm">
              Book a Service →
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-cliq-gray-200 pt-6">
          <p className="text-sm text-cliq-text-muted">
            © 2025 Cedarce Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
