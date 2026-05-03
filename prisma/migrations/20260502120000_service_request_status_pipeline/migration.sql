-- Add pipeline stages to ServiceRequestStatus
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'CONSULTATION';
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'PRICING';
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'PROJECT_STARTED';
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'PROJECT_UNDER_REVIEW';
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'PROJECT_COMPLETED';
ALTER TYPE "ServiceRequestStatus" ADD VALUE 'CLOSED';

-- Map legacy statuses to the new pipeline labels
UPDATE "ServiceRequest" SET "status" = 'PROJECT_STARTED' WHERE "status" = 'IN_PROGRESS';
UPDATE "ServiceRequest" SET "status" = 'PROJECT_COMPLETED' WHERE "status" = 'COMPLETED';
