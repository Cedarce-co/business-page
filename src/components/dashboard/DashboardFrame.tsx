"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import WayfindingStrip from "@/components/navigation/WayfindingStrip";
import { Menu, X } from "lucide-react";

export type DashboardFrameProps = {
  name: string;
  email: string;
  isAdmin: boolean;
  children: React.ReactNode;
};

export default function DashboardFrame({
  name,
  email,
  isAdmin,
  children,
}: DashboardFrameProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const initials = useMemo(() => (name?.trim()?.[0] ? name.trim()[0].toUpperCase() : "U"), [name]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        const url = (data as { user?: { image?: string } }).user?.image ?? "";
        if (!cancelled) setImage(url ? url : null);
      } catch {
        // ignore
      }
    }
    load();

    const onUpdated = () => load();
    window.addEventListener("app:profile-updated", onUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener("app:profile-updated", onUpdated);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.10),transparent_36%),radial-gradient(circle_at_90%_0%,rgba(16,185,129,0.08),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#ffffff_70%)] lg:flex">
      <div className="hidden lg:block">
        <Sidebar name={name} email={email} image={image} isAdmin={isAdmin} />
      </div>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-900 text-xs font-bold text-white">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
        </div>
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
              className="absolute left-0 top-0 h-full w-[86vw] max-w-sm bg-white"
            >
              <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <p className="text-sm font-bold text-slate-900">Dashboard</p>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white p-2"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <Sidebar name={name} email={email} image={image} isAdmin={isAdmin} onNavigate={() => setOpen(false)} mobile />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)] sm:px-5">
            <WayfindingStrip zone="dashboard" />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}

