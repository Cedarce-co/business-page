/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
import Link from "next/link";
import { Globe, MessageCircle, Music2, TrendingUp, Users } from "lucide-react";
import { SERVICES } from "@/lib/constants";
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
            <div className="flex items-end gap-1">
              <span className="text-2xl font-black text-cliq-text-heading">CEDARCE</span>
            </div>
            <p className="mt-2 text-sm text-cliq-text-body">Your Digital Business Buddy.</p>
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
            <p className="text-sm text-cliq-text-body">hello@cedarce.ng</p>
            <p className="mt-2 text-sm text-cliq-text-muted">Use Cedarce AI chat for instant answers</p>
            <p className="mt-2 text-xs text-cliq-text-muted">Lagos, Nigeria</p>
            <Button href="/contact" variant="primary" className="mt-4 text-sm">
              Book a Service →
            </Button>
          </div>
        </div>

        <div className="mt-12 border-t border-cliq-gray-200 pt-6">
          <p className="text-sm text-cliq-text-muted">
            © 2025 Cedarce Ltd. All rights reserved. Built with ❤️ in Lagos, Nigeria.
          </p>
        </div>
      </div>
    </footer>
  );
}
