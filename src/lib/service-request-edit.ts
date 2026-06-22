const EDIT_WINDOW_MS = 48 * 60 * 60 * 1000;

const EDITABLE_STATUSES = new Set(["PENDING_REVIEW", "NEEDS_INFO"]);

export function serviceRequestEditDeadline(createdAt: Date | string) {
  const start = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  return new Date(start.getTime() + EDIT_WINDOW_MS);
}

export function isWithinServiceRequestEditWindow(createdAt: Date | string, now = new Date()) {
  return now.getTime() < serviceRequestEditDeadline(createdAt).getTime();
}

export function canUserEditServiceRequest(input: {
  status: string;
  createdAt: Date | string;
  now?: Date;
}) {
  if (!EDITABLE_STATUSES.has(input.status)) return false;
  if (input.status === "NEEDS_INFO") return true;
  return isWithinServiceRequestEditWindow(input.createdAt, input.now);
}

export function serviceRequestEditReason(input: {
  status: string;
  createdAt: Date | string;
  now?: Date;
}): string | null {
  if (!canUserEditServiceRequest(input)) {
    if (input.status === "NEEDS_INFO") return null;
    if (!EDITABLE_STATUSES.has(input.status)) {
      return "This request can no longer be edited because work has already moved forward.";
    }
    return "The 48-hour edit window for this request has ended.";
  }
  if (input.status === "NEEDS_INFO") {
    return "We need a bit more information. Update any fields below and resubmit.";
  }
  const deadline = serviceRequestEditDeadline(input.createdAt);
  return `You can edit this request until ${deadline.toLocaleString()}.`;
}
