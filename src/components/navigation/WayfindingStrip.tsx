"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Building2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileText,
  Globe,
  Home,
  KeyRound,
  LayoutDashboard,
  Layers,
  LogIn,
  Mail,
  MessageSquare,
  Server,
  Shield,
  Smartphone,
  Tag,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import GoBack from "@/components/navigation/GoBack";
import {
  buildAdminCrumbs,
  buildAuthCrumbs,
  buildDashboardCrumbs,
  buildSiteCrumbs,
  type WayfindingCrumb,
  type WayfindingIconKey,
} from "@/lib/wayfinding-trails";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<WayfindingIconKey, LucideIcon> = {
  home: Home,
  building: Building2,
  tag: Tag,
  layers: Layers,
  globe: Globe,
  book: BookOpen,
  mail: Mail,
  file: FileText,
  shield: Shield,
  layout: LayoutDashboard,
  users: Users,
  clipboard: ClipboardList,
  credit: CreditCard,
  smartphone: Smartphone,
  server: Server,
  message: MessageSquare,
  trending: TrendingUp,
  "log-in": LogIn,
  "user-plus": UserPlus,
  key: KeyRound,
};

function CrumbIcon({ k }: { k: WayfindingIconKey }) {
  const Icon = ICON_MAP[k] ?? Layers;
  return <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />;
}

function BreadcrumbList({
  crumbs,
  tone,
}: {
  crumbs: WayfindingCrumb[];
  tone: "default" | "onDark" | "auth";
}) {
  // "onDark" is kept for API compatibility; public pages are light now, so it shares the brand styling.
  const muted = "text-slate-300";
  const text = tone === "auth" ? "text-cliq-purple" : "text-slate-500";
  const current = tone === "auth" ? "font-semibold text-cliq-text-heading" : "font-semibold text-brand-950";
  const linkHover =
    tone === "auth"
      ? "text-cliq-purple transition hover:bg-cliq-purple-soft hover:text-cliq-purple-dark"
      : "text-slate-500 transition hover:bg-brand-50 hover:text-brand-800 px-1 -mx-1";

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className={cn("flex flex-wrap items-center gap-1 text-xs font-medium sm:text-sm", text)}>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-1">
              {i > 0 ? <ChevronRight className={cn("h-3.5 w-3.5 shrink-0", muted)} aria-hidden /> : null}
              {last || !crumb.href ? (
                <span
                  className={cn(
                    "inline-flex max-w-[12rem] items-center gap-1 truncate sm:max-w-xs",
                    last ? current : text
                  )}
                  {...(last ? { "aria-current": "page" as const } : {})}
                >
                  <CrumbIcon k={crumb.icon} />
                  <span className="truncate">{crumb.label}</span>
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    "inline-flex max-w-[12rem] items-center gap-1 truncate rounded-md sm:max-w-xs",
                    linkHover
                  )}
                >
                  <CrumbIcon k={crumb.icon} />
                  <span className="truncate">{crumb.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function WayfindingStrip({
  zone,
  backLabel,
  arrow = "left",
  className,
  tone: toneProp,
}: {
  zone: "site" | "dashboard" | "admin" | "auth";
  backLabel?: string;
  arrow?: "left" | "right";
  className?: string;
  tone?: "default" | "onDark" | "auth";
}) {
  const pathname = usePathname() ?? "/";

  const crumbs: WayfindingCrumb[] =
    zone === "site"
      ? buildSiteCrumbs(pathname)
      : zone === "dashboard"
        ? buildDashboardCrumbs(pathname)
        : zone === "admin"
          ? buildAdminCrumbs(pathname)
          : buildAuthCrumbs(pathname);

  const label =
    backLabel ??
    (zone === "site" ? "Back" : zone === "auth" ? "Previous page" : "Back to previous page");

  const tone = toneProp ?? (zone === "auth" ? "auth" : "default");
  const goBackVariant = tone === "onDark" ? "onDark" : tone === "auth" ? "auth" : "default";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        className
      )}
    >
      <GoBack label={label} arrow={arrow} variant={goBackVariant} className="self-start sm:self-auto" />
      <BreadcrumbList crumbs={crumbs} tone={tone} />
    </div>
  );
}
