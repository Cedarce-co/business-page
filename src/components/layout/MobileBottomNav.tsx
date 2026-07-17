"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, UserRound, Layers, Package, Tag } from "lucide-react";
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

/** App-style sticky bottom navigation — full width; live chat floats above on the right. */
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
      label: "Solutions",
      icon: Layers,
      match: (p) => p.startsWith("/solutions") || p.startsWith("/services"),
    },
    {
      href: "/product",
      label: "Product",
      icon: Package,
      match: (p) => p.startsWith("/product") || p.startsWith("/about"),
    },
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 backdrop-blur-xl lg:hidden"
      style={{
        paddingBottom: "max(0.15rem, env(safe-area-inset-bottom))",
      }}
    >
      <ul className="grid h-14 grid-cols-5 px-1">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          return (
            <li key={tab.label} className="min-w-0">
              <Link
                href={tab.href}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1 px-0.5 text-[10px] font-semibold leading-none transition",
                  active ? "text-cedar-accent" : "text-cedar-mist active:text-cedar-ivory",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={active ? 2.5 : 2} aria-hidden />
                <span className="truncate">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
