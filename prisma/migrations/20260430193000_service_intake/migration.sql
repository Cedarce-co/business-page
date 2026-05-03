-- CreateEnum
CREATE TYPE "IntakeStatus" AS ENUM ('DRAFT', 'SUBMITTED');

-- CreateTable
CREATE TABLE "ServiceIntake" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "packageTier" TEXT NOT NULL,
    "status" "IntakeStatus" NOT NULL DEFAULT 'DRAFT',
    "questionsVer" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 0,
    "answers" JSONB NOT NULL DEFAULT '{}',
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceRequestId" TEXT,

    CONSTRAINT "ServiceIntake_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceIntake_serviceRequestId_key" ON "ServiceIntake"("serviceRequestId");

-- CreateIndex
CREATE INDEX "ServiceIntake_userId_idx" ON "ServiceIntake"("userId");

-- CreateIndex
CREATE INDEX "ServiceIntake_status_idx" ON "ServiceIntake"("status");

-- CreateIndex
CREATE INDEX "ServiceIntake_packageTier_idx" ON "ServiceIntake"("packageTier");

-- AddForeignKey
ALTER TABLE "ServiceIntake" ADD CONSTRAINT "ServiceIntake_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceIntake" ADD CONSTRAINT "ServiceIntake_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

