/**
 * Status union for ServiceRequest. Mirrors the Prisma enum
 * `ServiceRequestStatus` in prisma/schema.prisma.
 *
 * Avoid importing the Prisma runtime enum directly so the build does not
 * depend on a generated client being present at type-check time.
 */
export const SERVICE_REQUEST_STATUS_VALUES = [
  "PENDING_REVIEW",
  "NEEDS_INFO",
  "CONSULTATION",
  "PRICING",
  "PROJECT_STARTED",
  "PROJECT_UNDER_REVIEW",
  "PROJECT_COMPLETED",
  "CLOSED",
  "REJECTED",
  "IN_PROGRESS",
  "COMPLETED",
] as const;

export type ServiceRequestStatus = (typeof SERVICE_REQUEST_STATUS_VALUES)[number];

export const SERVICE_REQUEST_STATUS_ORDER = [
  "PENDING_REVIEW",
  "NEEDS_INFO",
  "CONSULTATION",
  "PROJECT_STARTED",
  "PROJECT_UNDER_REVIEW",
  "PROJECT_COMPLETED",
  "CLOSED",
  "REJECTED",
  "IN_PROGRESS",
] as const satisfies readonly ServiceRequestStatus[];

export type ServiceRequestStatusKey = ServiceRequestStatus;

export function serviceRequestStatusDropdownOptions(): ServiceRequestStatus[] {
  const primary = [...SERVICE_REQUEST_STATUS_ORDER] as ServiceRequestStatus[];
  const extra: ServiceRequestStatus[] = ["PRICING", "COMPLETED"];
  const seen = new Set<ServiceRequestStatus>(primary);
  return [...primary, ...extra.filter((s) => !seen.has(s))];
}

export function serviceRequestStatusLabel(status: string | null | undefined): string {
  if (!status) return "Unknown";
  const labels: Record<string, string> = {
    PENDING_REVIEW: "Request under review",
    NEEDS_INFO: "Needs more information",
    CONSULTATION: "Consultation in progress",
    PRICING: "Consultation / pricing", // legacy DB rows
    PROJECT_STARTED: "Project started",
    PROJECT_UNDER_REVIEW: "Project under review",
    PROJECT_COMPLETED: "Project completed",
    CLOSED: "Closed",
    REJECTED: "Rejected",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed", // legacy DB rows - prefer PROJECT_COMPLETED for new updates
  };
  return labels[status] ?? status;
}
