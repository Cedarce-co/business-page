-- CreateEnum
CREATE TYPE "FeedbackStatus" AS ENUM ('NEW', 'READ', 'ARCHIVED');

-- CreateTable
CREATE TABLE "SiteFeedback" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "topic" TEXT,
    "message" TEXT NOT NULL,
    "page" TEXT,
    "userId" TEXT,
    "status" "FeedbackStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "SiteFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SiteFeedback_createdAt_idx" ON "SiteFeedback"("createdAt");

-- CreateIndex
CREATE INDEX "SiteFeedback_status_idx" ON "SiteFeedback"("status");
