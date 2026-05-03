"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, X } from "lucide-react";
import Modal from "@/components/ui/Modal";

type NotificationItem = {
  id: string;
  title: string;
  message: string | null;
  href: string | null;
  createdAt: string;
  readAt: string | null;
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const hasUnread = unreadCount > 0;

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) return;
      setItems((data.items ?? []) as NotificationItem[]);
      setUnreadCount((data.unreadCount ?? 0) as number);
    } finally {
      setLoading(false);
    }
  }

  async function update(id: string, action: "read" | "dismiss") {
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    await refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (open) refresh();
  }, [open]);

  const sorted = useMemo(() => items.slice(0, 20), [items]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-800 hover:bg-slate-50"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {hasUnread ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1.5 text-[11px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </button>

      <Modal open={open} title="Notifications" onClose={() => setOpen(false)}>
        <div
          className="max-h-[min(22rem,65vh)] overflow-y-auto overscroll-y-contain pr-1 [scrollbar-gutter:stable]"
          role="list"
          aria-label="Notification list"
        >
          <div className="space-y-3">
            {loading ? <p className="text-sm text-slate-600">Loading…</p> : null}
            {!loading && sorted.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                No notifications yet.
              </div>
            ) : null}

            {sorted.map((n) => (
              <div key={n.id} className="rounded-xl border border-slate-200 bg-white p-4" role="listitem">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">
                      {n.title}{" "}
                      {n.readAt ? null : (
                        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                          New
                        </span>
                      )}
                    </p>
                    {n.message ? <p className="mt-1 text-sm text-slate-700">{n.message}</p> : null}
                    <p className="mt-2 text-xs text-slate-500">{new Date(n.createdAt).toLocaleString()}</p>
                    {n.href ? (
                      <a
                        href={n.href}
                        className="mt-2 inline-block text-sm font-semibold text-slate-900 underline underline-offset-4"
                        onClick={() => update(n.id, "read")}
                      >
                        View details
                      </a>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
                    aria-label="Dismiss"
                    onClick={() => update(n.id, "dismiss")}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}

