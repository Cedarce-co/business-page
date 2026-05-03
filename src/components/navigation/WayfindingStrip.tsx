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

function BreadcrumbList({ crumbs, tone }: { crumbs: WayfindingCrumb[]; tone: "default" | "onDark" }) {
  const muted = tone === "onDark" ? "text-slate-400" : "text-slate-400";
  const text = tone === "onDark" ? "text-slate-300" : "text-slate-600";
  const current = tone === "onDark" ? "font-semibold text-white" : "font-semibold text-slate-900";
  const linkHover =
    tone === "onDark"
      ? "text-slate-300 transition hover:bg-white/10 hover:text-white"
      : "text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";

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
}: {
  zone: "site" | "dashboard" | "admin" | "auth";
  backLabel?: string;
  arrow?: "left" | "right";
  className?: string;
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

  const tone = zone === "auth" ? "onDark" : "default";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
        className
      )}
    >
      <GoBack label={label} arrow={arrow} variant={zone === "auth" ? "onDark" : "default"} />
      <BreadcrumbList crumbs={crumbs} tone={tone} />
    </div>
  );
}
