"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { serviceRequestStatusDropdownOptions, type ServiceRequestStatusKey } from "@/lib/service-request-status";
import { requestLabel } from "@/components/admin/status";

export default function WorkStatusSelect({
  requestId,
  status,
}: {
  requestId: string;
  status: ServiceRequestStatusKey;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);

  async function save(next: ServiceRequestStatusKey) {
    setValue(next);
    await fetch(`/api/admin/service-requests/${requestId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    router.refresh();
  }

  return (
    <select
      className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
      value={value}
      onChange={(e) => save(e.target.value as ServiceRequestStatusKey)}
    >
      {serviceRequestStatusDropdownOptions().map((s) => (
        <option key={s} value={s}>
          {requestLabel(s)}
        </option>
      ))}
    </select>
  );
}
