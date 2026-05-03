-- Add business verification fields to Kyc
ALTER TABLE "Kyc"
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "businessAddress" TEXT,
ADD COLUMN     "businessCity" TEXT,
ADD COLUMN     "businessState" TEXT,
ADD COLUMN     "businessWebsite" TEXT,
ADD COLUMN     "businessEmail" TEXT,
ADD COLUMN     "socialHandle" TEXT,
ADD COLUMN     "cacNumber" TEXT,
ADD COLUMN     "cacUrl" TEXT;

