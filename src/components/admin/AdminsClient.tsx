"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminRoleLabel } from "@/lib/admin-roles";
import CircleLoader from "@/components/ui/CircleLoader";
import type { UserAdminRole } from "@prisma/client";

type AdminRow = {
  id: string;
  name: string;
  email: string;
  adminRole: UserAdminRole;
  mfaEnabled: boolean;
  createdAt: string;
};

export default function AdminsClient({ currentUserId }: { currentUserId: string }) {
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function load() {
    const res = await fetch("/api/admin/admins");
    const data = await res.json().catch(() => null);
    if (res.ok) {
      setAdmins(
        (data.admins as AdminRow[]).map((a) => ({
          ...a,
          createdAt: a.createdAt,
        })),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function invite() {
    setInviting(true);
    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not send invite.");
        return;
      }
      toast.success("Invite sent.");
      setName("");
      setEmail("");
      await load();
    } finally {
      setInviting(false);
    }
  }

  async function removeAdmin(id: string) {
    if (!confirm("Remove this admin? They will lose dashboard access.")) return;
    const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      toast.error(data?.error ?? "Could not remove admin.");
      return;
    }
    toast.success("Admin removed.");
    await load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Admins</h1>
        <p className="text-sm text-slate-600">
          Invite team members by email. Every admin must use Google Authenticator on every sign-in, on any device.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-bold text-slate-900">Invite admin</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <button
          type="button"
          disabled={inviting || name.trim().length < 2 || !email.includes("@")}
          onClick={invite}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {inviting ? "Sending…" : "Send invite"}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="mb-3 text-sm font-semibold text-slate-900">Team members</p>
        {loading ? (
          <div className="flex items-center gap-2 py-6 text-sm text-slate-500">
            <CircleLoader size={18} />
            Loading…
          </div>
        ) : admins.length === 0 ? (
          <p className="py-6 text-sm text-slate-500">No admins yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">MFA</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100">
                    <td className="px-3 py-3 font-medium text-slate-900">{a.name}</td>
                    <td className="px-3 py-3 text-slate-600">{a.email}</td>
                    <td className="px-3 py-3">{adminRoleLabel(a.adminRole)}</td>
                    <td className="px-3 py-3">{a.mfaEnabled ? "Enabled" : "Not set up"}</td>
                    <td className="px-3 py-3 text-right">
                      {a.adminRole === "SUPER_ADMIN" || a.id === currentUserId ? (
                        <span className="text-xs text-slate-400">—</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeAdmin(a.id)}
                          className="text-xs font-semibold text-rose-700 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
