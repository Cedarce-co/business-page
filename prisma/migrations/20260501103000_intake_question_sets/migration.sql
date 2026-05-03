-- CreateEnum
CREATE TYPE "IntakeQuestionSetStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "IntakeQuestionSet" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" "IntakeQuestionSetStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IntakeQuestionSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IntakeQuestionSet_version_key" ON "IntakeQuestionSet"("version");

-- CreateIndex
CREATE INDEX "IntakeQuestionSet_status_idx" ON "IntakeQuestionSet"("status");

-- CreateIndex
CREATE INDEX "IntakeQuestionSet_createdAt_idx" ON "IntakeQuestionSet"("createdAt");

