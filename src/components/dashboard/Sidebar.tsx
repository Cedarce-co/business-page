"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileCheck2, UserRoundCog, Shield, LogOut, ClipboardList } from "lucide-react";
import { signOut } from "next-auth/react";
import NotificationBell from "@/components/dashboard/NotificationBell";

const items = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/service-requests", label: "My requests", icon: ClipboardList },
  { href: "/dashboard/request-service?resume=1", label: "Request a Service", icon: FileCheck2 },
  { href: "/dashboard/profile", label: "Profile", icon: UserRoundCog },
];

export default function Sidebar({
  name,
  email,
  image,
  isAdmin,
  mobile = false,
  onNavigate,
}: {
  name: string;
  email: string;
  image: string | null;
  isAdmin: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "h-full p-4"
          : "h-screen w-80 border-r border-slate-200 bg-white/85 p-4 backdrop-blur"
      }
    >
      <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Portal</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xl font-black text-slate-900">Dashboard</p>
          <NotificationBell />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-900 text-sm font-bold text-white">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              name.slice(0, 1)
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
            <p className="truncate text-xs text-slate-500">{email}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {[
          ...items,
          ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
        ].map(({ href, label, icon: Icon }) => {
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
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? "bg-cliq-navy-900 !text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-500 group-hover:text-slate-700"}`} />
              <span className="flex-1">{label}</span>
              {active ? <span className="h-2 w-2 rounded-full bg-emerald-400" /> : null}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </aside>
  );
}
