-- AlterTable
ALTER TABLE "User" ADD COLUMN "mfaRecoveryHashes" TEXT[] DEFAULT ARRAY[]::TEXT[];
