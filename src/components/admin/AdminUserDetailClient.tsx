"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { kycLabel, kycTone, requestLabel, requestTone } from "@/components/admin/status";
import Modal from "@/components/ui/Modal";

type KycInfo = {
  status: string;
  dateOfBirth?: string | null;
  nationality?: string | null;
  address?: string | null;
  businessName?: string | null;
  businessAddress?: string | null;
  businessCity?: string | null;
  businessState?: string | null;
  businessWebsite?: string | null;
  businessEmail?: string | null;
  socialHandle?: string | null;
  cacNumber?: string | null;
  cacUrl?: string | null;
  govIdType?: string | null;
  govIdUrl?: string | null;
};

type ServiceReq = {
  id: string;
  serviceType: string;
  summary: string;
  status: string;
  createdAt: string;
};

export default function AdminUserDetailClient({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    createdAt: string;
    profile?: { address?: string | null; city?: string | null; country?: string | null } | null;
    kyc?: KycInfo | null;
    serviceRequest: ServiceReq[];
  };
}) {
  const [saving, setSaving] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const kycStatus = user.kyc?.status ?? "PENDING";
  const hasVerification = Boolean(user.kyc) && kycStatus !== "PENDING";

  async function removeUser() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Could not remove user.");
      toast.success("User removed.");
      window.location.href = "/admin/users";
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not remove user.");
    } finally {
      setSaving(false);
      setOpenRemove(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-black text-slate-900">{user.name}</h1>
            <p className="truncate text-sm text-slate-600">{user.email}</p>
            <p className="mt-2 text-xs text-slate-600">
              Joined: {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge tone={kycTone(kycStatus)}>{kycLabel(kycStatus)}</StatusBadge>
            <button
              type="button"
              onClick={() => setOpenRemove(true)}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Remove user
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-bold text-slate-900">Personal details</h2>
          <div className="mt-3 grid gap-1 text-sm text-slate-700">
            <p>Phone / WhatsApp: {user.phone || "N/A"}</p>
            <p>Address: {user.profile?.address || "N/A"}</p>
            <p>City: {user.profile?.city || "N/A"}</p>
            <p>Country: {user.profile?.country || "N/A"}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Verification</h2>
              <p className="mt-1 text-sm text-slate-600">
                {hasVerification ? "Submitted details are available for review." : "No verification submitted yet."}
              </p>
            </div>
            {hasVerification ? (
              <Link
                href={`/admin/users/${user.id}/verification`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                View
              </Link>
            ) : null}
          </div>

          {!hasVerification ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">No verification</p>
              <p className="mt-1 text-sm text-slate-600">
                User can edit profile, but cannot request services until verification is submitted and approved.
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <StatusBadge tone={kycTone(kycStatus)}>{kycLabel(kycStatus)}</StatusBadge>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Service requests</h2>
            <p className="mt-1 text-sm text-slate-600">
              {user.serviceRequest.length ? "Open any request to review details and update work status." : "No service requests submitted yet."}
            </p>
          </div>
        </div>

        {user.serviceRequest.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">No service requests</p>
            <p className="mt-1 text-sm text-slate-600">Once verified, the user can submit a request from their dashboard.</p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[820px] border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="border-b border-slate-200 pb-3 pr-4">Service</th>
                  <th className="border-b border-slate-200 pb-3 pr-4">Created</th>
                  <th className="border-b border-slate-200 pb-3 pr-4">Summary</th>
                  <th className="border-b border-slate-200 pb-3 pr-4">Status</th>
                  <th className="border-b border-slate-200 pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {user.serviceRequest.map((r) => (
                  <tr key={r.id} className="group">
                    <td className="border-b border-slate-100 py-3 pr-4 align-top font-semibold text-slate-900">{r.serviceType}</td>
                    <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">{new Date(r.createdAt).toLocaleDateString()}</td>
                    <td className="border-b border-slate-100 py-3 pr-4 align-top text-sm text-slate-700">
                      <span className="line-clamp-2">{r.summary}</span>
                    </td>
                    <td className="border-b border-slate-100 py-3 pr-4 align-top">
                      <StatusBadge tone={requestTone(r.status)}>{requestLabel(r.status)}</StatusBadge>
                    </td>
                    <td className="border-b border-slate-100 py-3 text-right align-top">
                      <Link
                        href={`/admin/requests/${r.id}`}
                        className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={openRemove} title="Remove user" onClose={() => setOpenRemove(false)} widthClassName="max-w-lg">
        <div className="space-y-4">
          <p className="text-sm text-slate-700">
            This permanently deletes the user and associated data. This action cannot be undone.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setOpenRemove(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={removeUser}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
            >
              Remove user
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

