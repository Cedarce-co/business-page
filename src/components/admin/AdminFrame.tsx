"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ClipboardList, LogOut, Menu, X } from "lucide-react";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import { signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/questions", label: "Intake questions", icon: ClipboardList },
];

function NavLinks({
  pathname,
  mobile,
  onNavigate,
}: {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-2">
      {nav.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/admin/dashboard"
            ? pathname === "/admin/dashboard" || pathname.startsWith("/admin/requests/")
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => onNavigate?.()}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-500 group-hover:text-slate-700"}`} />
            <span className="flex-1">{label}</span>
            {active && !mobile ? <span className="h-2 w-2 rounded-full bg-emerald-400" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "/admin";
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="lg:flex">
        <div className="hidden lg:block">
          <aside className="sticky top-0 h-screen w-80 shrink-0 border-r border-slate-200 bg-white/90 p-4 backdrop-blur">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Operations</p>
              <p className="mt-1 text-lg font-black text-slate-900">Admin</p>
            </div>

            <NavLinks pathname={pathname} />

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/admin" })}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </aside>
        </div>

        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
          <p className="text-sm font-bold text-slate-900">Admin</p>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div className="absolute inset-0 bg-slate-900/35" onClick={() => setOpen(false)} />
              <motion.div
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 h-full w-[86vw] max-w-sm border-r border-slate-200 bg-white"
              >
                <div className="flex items-center justify-between border-b border-slate-200 p-4">
                  <p className="text-sm font-bold text-slate-900">Admin</p>
                  <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-white p-2"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <NavLinks pathname={pathname} mobile onNavigate={() => setOpen(false)} />
                  <button
                    type="button"
                    onClick={() => signOut({ callbackUrl: "/admin" })}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto w-full max-w-[1400px] space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-5">
              <WayfindingStrip zone="admin" />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
