-- AlterTable
ALTER TABLE "User" ADD COLUMN "mfaSecret" TEXT,
ADD COLUMN "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "mfaEnabledAt" TIMESTAMP(3);

-- AlterEnum
ALTER TYPE "AuditEventType" ADD VALUE 'MFA_ENABLED';
ALTER TYPE "AuditEventType" ADD VALUE 'MFA_DISABLED';
ALTER TYPE "AuditEventType" ADD VALUE 'KYC_DOCUMENT_VIEWED';

-- CreateTable
CREATE TABLE "KycDocumentAccessLog" (
    "id" TEXT NOT NULL,
    "kycId" TEXT NOT NULL,
    "documentField" TEXT NOT NULL,
    "actorType" "AuditActorType" NOT NULL,
    "actorUserId" TEXT,
    "actorEmail" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KycDocumentAccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KycDocumentAccessLog_kycId_idx" ON "KycDocumentAccessLog"("kycId");
CREATE INDEX "KycDocumentAccessLog_actorUserId_idx" ON "KycDocumentAccessLog"("actorUserId");
CREATE INDEX "KycDocumentAccessLog_createdAt_idx" ON "KycDocumentAccessLog"("createdAt");
