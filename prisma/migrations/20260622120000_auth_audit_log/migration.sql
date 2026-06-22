-- CreateEnum
CREATE TYPE "AuditActorType" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AuditEventType" AS ENUM (
  'SIGNUP',
  'SIGN_IN',
  'SIGN_OUT',
  'IDLE_SIGN_OUT',
  'ADMIN_SIGN_IN',
  'ADMIN_SIGN_OUT',
  'ADMIN_IDLE_SIGN_OUT'
);

-- CreateTable
CREATE TABLE "AuthAuditLog" (
    "id" TEXT NOT NULL,
    "actorType" "AuditActorType" NOT NULL,
    "eventType" "AuditEventType" NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "name" TEXT,
    "country" TEXT,
    "countryCode" TEXT,
    "city" TEXT,
    "region" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "sessionStartedAt" TIMESTAMP(3),
    "sessionEndedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuthAuditLog_createdAt_idx" ON "AuthAuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuthAuditLog_eventType_idx" ON "AuthAuditLog"("eventType");

-- CreateIndex
CREATE INDEX "AuthAuditLog_actorType_idx" ON "AuthAuditLog"("actorType");

-- CreateIndex
CREATE INDEX "AuthAuditLog_countryCode_idx" ON "AuthAuditLog"("countryCode");

-- CreateIndex
CREATE INDEX "AuthAuditLog_userId_idx" ON "AuthAuditLog"("userId");
