"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";

export default function AdminUserActions({
  userId,
  canApproveVerification,
}: {
  userId: string;
  canApproveVerification: boolean;
}) {
  const router = useRouter();
  const [openRemove, setOpenRemove] = useState(false);

  async function approve() {
    const res = await fetch(`/api/admin/users/${userId}/approve`, { method: "POST" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast.error((data as { error?: string }).error ?? "Could not approve verification.");
      return;
    }
    toast.success("Verification approved.");
    router.refresh();
  }

  async function remove() {
    await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
    toast.success("User removed.");
    setOpenRemove(false);
    router.push("/admin/users");
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      {canApproveVerification ? (
        <button
          type="button"
          onClick={approve}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
        >
          Approve verification
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => setOpenRemove(true)}
        className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white"
      >
        Remove User
      </button>

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
              onClick={remove}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Remove user
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
