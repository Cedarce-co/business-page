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

type PendingInvite = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  expiresAt: string;
};

export default function AdminsClient({ currentUserId }: { currentUserId: string }) {
  const [admins, setAdmins] = useState<AdminRow[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busyInviteId, setBusyInviteId] = useState<string | null>(null);
  const [removingAdminId, setRemovingAdminId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/admins");
    const data = await res.json().catch(() => null);
    if (res.ok) {
      setAdmins(data.admins as AdminRow[]);
      setPendingInvites(data.pendingInvites as PendingInvite[]);
    } else {
      toast.error(data?.error ?? "Could not load admins.");
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
      toast.success("Invite sent by email.");
      if (data?.joinUrl) {
        try {
          await navigator.clipboard.writeText(data.joinUrl as string);
          toast("Invite link copied to clipboard.", { icon: "📋" });
        } catch {
          // clipboard may be unavailable
        }
      }
      setName("");
      setEmail("");
      await load();
    } finally {
      setInviting(false);
    }
  }

  async function resendInvite(id: string) {
    setBusyInviteId(id);
    try {
      const res = await fetch(`/api/admin/admins/invites/${id}/resend`, { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not resend invite.");
        return;
      }
      toast.success("Invite resent.");
      if (data?.joinUrl) {
        try {
          await navigator.clipboard.writeText(data.joinUrl as string);
          toast("Fresh invite link copied to clipboard.", { icon: "📋" });
        } catch {
          // clipboard may be unavailable
        }
      }
      await load();
    } finally {
      setBusyInviteId(null);
    }
  }

  async function cancelInvite(id: string) {
    if (!confirm("Cancel this invite? The join link will stop working.")) return;
    setBusyInviteId(id);
    try {
      const res = await fetch(`/api/admin/admins/invites/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not cancel invite.");
        return;
      }
      toast.success("Invite cancelled.");
      await load();
    } finally {
      setBusyInviteId(null);
    }
  }

  async function removeAdmin(id: string, adminName: string) {
    if (!confirm(`Remove ${adminName}? They will lose admin portal access.`)) return;
    setRemovingAdminId(id);
    try {
      const res = await fetch(`/api/admin/admins/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(data?.error ?? "Could not remove admin.");
        return;
      }
      toast.success("Admin removed.");
      await load();
    } finally {
      setRemovingAdminId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Admins</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Invite team members, manage pending invites, and remove admin access. Every admin must use Google
          Authenticator on every sign-in.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold text-slate-900">Invite admin</p>
        <p className="mt-1 text-sm text-slate-600">
          We email a join link that expires in 7 days. The invite link is also copied to your clipboard after sending.
        </p>
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

      {loading ? (
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          <CircleLoader size={18} />
          Loading team…
        </div>
      ) : (
        <>
          {pendingInvites.length > 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
              <p className="mb-1 text-sm font-semibold text-slate-900">Pending invites</p>
              <p className="mb-3 text-xs text-slate-500">These people have not joined yet.</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Sent</th>
                      <th className="px-3 py-2">Expires</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingInvites.map((invite) => (
                      <tr key={invite.id} className="border-b border-slate-100">
                        <td className="px-3 py-3 font-medium text-slate-900">{invite.name}</td>
                        <td className="px-3 py-3 text-slate-600">{invite.email}</td>
                        <td className="px-3 py-3 text-slate-600">
                          {new Date(invite.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-3 text-slate-600">
                          {new Date(invite.expiresAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              disabled={busyInviteId === invite.id}
                              onClick={() => resendInvite(invite.id)}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-50"
                            >
                              {busyInviteId === invite.id ? "Working…" : "Resend"}
                            </button>
                            <button
                              type="button"
                              disabled={busyInviteId === invite.id}
                              onClick={() => cancelInvite(invite.id)}
                              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-1 text-sm font-semibold text-slate-900">Active admins</p>
            <p className="mb-3 text-xs text-slate-500">Super admin accounts cannot be removed from here.</p>
            {admins.length === 0 ? (
              <p className="py-6 text-sm text-slate-500">No admins yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Role</th>
                      <th className="px-3 py-2">MFA</th>
                      <th className="px-3 py-2">Joined</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((a) => {
                      const canRemove = a.adminRole !== "SUPER_ADMIN" && a.id !== currentUserId;
                      return (
                        <tr key={a.id} className="border-b border-slate-100">
                          <td className="px-3 py-3 font-medium text-slate-900">{a.name}</td>
                          <td className="px-3 py-3 text-slate-600">{a.email}</td>
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                a.adminRole === "SUPER_ADMIN"
                                  ? "bg-slate-900 text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {adminRoleLabel(a.adminRole)}
                            </span>
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                a.mfaEnabled ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-900"
                              }`}
                            >
                              {a.mfaEnabled ? "Enabled" : "Not set up"}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-slate-600">
                            {new Date(a.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex justify-end">
                              {canRemove ? (
                                <button
                                  type="button"
                                  disabled={removingAdminId === a.id}
                                  onClick={() => removeAdmin(a.id, a.name)}
                                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 disabled:opacity-50"
                                >
                                  {removingAdminId === a.id ? "Removing…" : "Remove admin"}
                                </button>
                              ) : (
                                <span className="text-xs text-slate-400">
                                  {a.id === currentUserId ? "You" : "Protected"}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
