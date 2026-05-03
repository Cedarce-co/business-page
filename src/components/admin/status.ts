export function kycLabel(status: string | null | undefined) {
  if (!status || status === "PENDING") return "Not submitted";
  if (status === "SUBMITTED") return "Under review";
  if (status === "INVALID_INFO") return "Invalid info";
  if (status === "APPROVED") return "Approved";
  if (status === "REJECTED") return "Declined";
  return status;
}

export function kycTone(status: string | null | undefined) {
  if (!status || status === "PENDING") return "slate";
  if (status === "SUBMITTED") return "amber";
  if (status === "INVALID_INFO") return "amber";
  if (status === "APPROVED") return "emerald";
  if (status === "REJECTED") return "rose";
  return "slate";
}

export function requestLabel(status: string | null | undefined) {
  if (!status) return "Pending review";
  if (status === "PENDING_REVIEW") return "Request under review";
  if (status === "NEEDS_INFO") return "Needs more information";
  if (status === "CONSULTATION") return "Consultation in progress";
  if (status === "PRICING") return "Consultation / pricing";
  if (status === "PROJECT_STARTED") return "Project started";
  if (status === "PROJECT_UNDER_REVIEW") return "Project under review";
  if (status === "PROJECT_COMPLETED") return "Project completed";
  if (status === "CLOSED") return "Closed";
  if (status === "REJECTED") return "Rejected";
  if (status === "IN_PROGRESS") return "In progress";
  if (status === "COMPLETED") return "Completed";
  return status;
}

export function requestTone(status: string | null | undefined) {
  if (!status || status === "PENDING_REVIEW") return "amber";
  if (status === "NEEDS_INFO") return "amber";
  if (status === "CONSULTATION") return "slate";
  if (status === "PRICING") return "slate";
  if (status === "PROJECT_STARTED" || status === "IN_PROGRESS") return "slate";
  if (status === "PROJECT_UNDER_REVIEW") return "amber";
  if (status === "PROJECT_COMPLETED" || status === "COMPLETED") return "emerald";
  if (status === "CLOSED") return "slate";
  if (status === "REJECTED") return "rose";
  return "slate";
}
