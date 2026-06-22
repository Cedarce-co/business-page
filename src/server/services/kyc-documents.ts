import "server-only";

import { prisma } from "@/server/database/prisma";
import { streamStoredFile } from "@/server/uploads/serve";
import { logAuthAuditEvent } from "@/server/services/auth-audit";
import type { RequestMeta } from "@/server/lib/request-meta";

export type KycDocumentField = "govId" | "cac" | "addressProof";

const FIELD_MAP: Record<KycDocumentField, "govIdUrl" | "cacUrl" | "addressProofUrl"> = {
  govId: "govIdUrl",
  cac: "cacUrl",
  addressProof: "addressProofUrl",
};

export function kycDocumentProxyUrl(field: KycDocumentField, userId?: string) {
  const params = new URLSearchParams({ field });
  if (userId) params.set("userId", userId);
  return `/api/kyc/documents?${params.toString()}`;
}

export async function getKycDocumentForActor(input: {
  actorUserId: string;
  actorEmail: string;
  actorType: "USER" | "ADMIN";
  targetUserId: string;
  field: KycDocumentField;
  meta: RequestMeta;
}) {
  const column = FIELD_MAP[input.field];
  const kyc = await prisma.kyc.findUnique({
    where: { userId: input.targetUserId },
    select: { id: true, userId: true, govIdUrl: true, cacUrl: true, addressProofUrl: true },
  });

  if (!kyc) throw new Error("Verification record not found.");

  if (input.actorType === "USER" && kyc.userId !== input.actorUserId) {
    throw new Error("Forbidden.");
  }

  const storedUrl = kyc[column];
  if (!storedUrl) throw new Error("Document not found.");

  await prisma.kycDocumentAccessLog.create({
    data: {
      kycId: kyc.id,
      documentField: column,
      actorType: input.actorType,
      actorUserId: input.actorUserId,
      actorEmail: input.actorEmail,
      ipAddress: input.meta.ipAddress ?? null,
      userAgent: input.meta.userAgent ?? null,
    },
  });

  await logAuthAuditEvent({
    actorType: input.actorType,
    eventType: "KYC_DOCUMENT_VIEWED",
    userId: input.actorUserId,
    email: input.actorEmail,
    meta: input.meta,
    extra: { kycId: kyc.id, documentField: column, targetUserId: input.targetUserId },
  });

  const file = await streamStoredFile(storedUrl);
  return file;
}
