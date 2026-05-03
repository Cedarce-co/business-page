-- Add review note fields
ALTER TABLE "Kyc"
ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3);

ALTER TABLE "ServiceRequest"
ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3);

-- Add new enum values
ALTER TYPE "KycStatus" ADD VALUE IF NOT EXISTS 'INVALID_INFO';
ALTER TYPE "ServiceRequestStatus" ADD VALUE IF NOT EXISTS 'NEEDS_INFO';

