"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileCheck2, UserRoundCog, LogOut, ClipboardList, Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import { recordUserSessionEnd } from "@/lib/auth/session-tracking";
import NotificationBell from "@/components/dashboard/NotificationBell";
import BrandLogo from "@/components/ui/BrandLogo";

const items = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/service-requests", label: "My requests", icon: ClipboardList },
  { href: "/dashboard/request-service?resume=1", label: "Request a service", icon: FileCheck2 },
  { href: "/dashboard/profile", label: "Profile", icon: UserRoundCog },
  { href: "/dashboard/security", label: "Security", icon: Shield },
];

export default function Sidebar({
  name,
  email,
  image,
  mobile = false,
  onNavigate,
}: {
  name: string;
  email: string;
  image: string | null;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "h-full p-4"
          : "h-screen w-80 border-r border-line bg-white/80 p-4 backdrop-blur-xl"
      }
    >
      {!mobile ? (
        <div className="mb-5 flex items-center justify-between px-2 pt-2">
          <Link href="/" aria-label="Cedarce home">
            <BrandLogo height={26} />
          </Link>
        </div>
      ) : null}
      <div className="relative mb-5 overflow-hidden rounded-3xl bg-deep-blue p-4 text-white shadow-lift">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-line-grid-light opacity-50" />
        <div className="relative flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-200">Portal</p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight">Dashboard</p>
          </div>
          <div className="rounded-full bg-white/95">
            <NotificationBell />
          </div>
        </div>
        <div className="relative mt-4 flex items-center gap-3 rounded-2xl bg-white/10 p-2.5">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white/40 bg-white text-sm font-bold text-brand-700">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              name.slice(0, 1)
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="truncate text-xs text-brand-100/80">{email}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map(({ href, label, icon: Icon }) => {
          const itemPath = href.split("?")[0] ?? href;
          const active =
            itemPath === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === itemPath || pathname.startsWith(`${itemPath}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => onNavigate?.()}
              className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "btn-sheen bg-g-button !text-white shadow-glow-sm"
                  : "text-slate-600 hover:bg-brand-50 hover:text-brand-800"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-400 group-hover:text-brand-600"}`} />
              <span className="flex-1">{label}</span>
              {active ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => {
          void (async () => {
            await recordUserSessionEnd("SIGN_OUT");
            await signOut({ callbackUrl: "/" });
          })();
        }}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </aside>
  );
}
