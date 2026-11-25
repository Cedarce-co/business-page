"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, UserRound, Layers, Package, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const HIDDEN_PREFIXES = [
  "/forgot-password",
  "/reset-password",
  "/dashboard",
  "/admin",
  "/offline",
  "/request-service",
];

type Tab = {
  href: string;
  label: string;
  icon: typeof Home;
  match: (pathname: string) => boolean;
};

/** App-style floating glass dock; live chat floats above on the right. */
export default function MobileBottomNav() {
  const pathname = usePathname() ?? "";
  const { data: session } = useSession();
  const signedIn = Boolean(session?.user?.id);

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const tabs: Tab[] = [
    {
      href: "/pricing",
      label: "Pricing",
      icon: Tag,
      match: (p) => p.startsWith("/pricing"),
    },
    {
      href: signedIn ? "/dashboard" : "/signin",
      label: "Account",
      icon: UserRound,
      match: (p) =>
        p.startsWith("/signin") ||
        p.startsWith("/signup") ||
        p.startsWith("/dashboard") ||
        p.startsWith("/forgot-password") ||
        p.startsWith("/reset-password"),
    },
    {
      href: "/",
      label: "Home",
      icon: Home,
      match: (p) => p === "/",
    },
    {
      href: "/solutions",
      label: "Who we help",
      icon: Layers,
      match: (p) => p.startsWith("/solutions") || p.startsWith("/services"),
    },
    {
      href: "/product",
      label: "Services",
      icon: Package,
      match: (p) => p.startsWith("/product") || p.startsWith("/about"),
    },
  ];

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <ul className="glass pointer-events-auto mx-auto grid h-16 max-w-md grid-cols-5 rounded-[1.75rem] p-1.5">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.label} className="min-w-0">
              <Link
                href={tab.href}
                className={cn(
                  "relative flex h-full flex-col items-center justify-center gap-1 rounded-[1.25rem] px-0.5 text-[10px] font-semibold leading-none transition-colors",
                  active ? "text-white" : "text-slate-500 active:text-brand-700",
                )}
                aria-current={active ? "page" : undefined}
              >
                {active ? (
                  <motion.span
                    layoutId="mobile-tab-active"
                    className="absolute inset-0 rounded-[1.25rem] bg-g-button shadow-glow-sm"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <Icon className="relative h-[18px] w-[18px]" strokeWidth={active ? 2.4 : 2} aria-hidden />
                <span className="relative truncate">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
