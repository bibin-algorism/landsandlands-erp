-- CreateEnum
CREATE TYPE "ChangeRequestApprover" AS ENUM ('HR', 'MD');

-- CreateEnum
CREATE TYPE "StoredFileStatus" AS ENUM ('PENDING', 'ATTACHED');

-- AlterEnum
BEGIN;
CREATE TYPE "ChangeRequestStatus_new" AS ENUM ('PENDING_REVIEW', 'QUERY_SENT', 'APPROVED', 'REJECTED', 'CANCELLED');
ALTER TABLE "employee_change_requests" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "employee_change_requests" ALTER COLUMN "status" TYPE "ChangeRequestStatus_new" USING ("status"::text::"ChangeRequestStatus_new");
ALTER TYPE "ChangeRequestStatus" RENAME TO "ChangeRequestStatus_old";
ALTER TYPE "ChangeRequestStatus_new" RENAME TO "ChangeRequestStatus";
DROP TYPE "ChangeRequestStatus_old";
ALTER TABLE "employee_change_requests" ALTER COLUMN "status" SET DEFAULT 'PENDING_REVIEW';
COMMIT;

-- AlterTable
ALTER TABLE "change_request_fields" DROP COLUMN "fieldName",
DROP COLUMN "proofDocumentUrl",
ADD COLUMN     "fieldKey" TEXT NOT NULL,
ADD COLUMN     "isQueried" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proofFileKey" TEXT,
DROP COLUMN "currentValue",
ADD COLUMN     "currentValue" JSONB,
DROP COLUMN "proposedValue",
ADD COLUMN     "proposedValue" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "employee_change_requests" DROP COLUMN "hrReviewerId",
ADD COLUMN     "employeeReplyDueDate" TIMESTAMP(3),
ADD COLUMN     "requestedById" TEXT NOT NULL,
ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "resolvedById" TEXT,
ADD COLUMN     "routedTo" "ChangeRequestApprover" NOT NULL,
ADD COLUMN     "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'PENDING_REVIEW';

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "lastUpdatedById" TEXT;

-- CreateTable
CREATE TABLE "stored_files" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "sha256" TEXT NOT NULL,
    "status" "StoredFileStatus" NOT NULL DEFAULT 'PENDING',
    "uploadedById" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attachedAt" TIMESTAMP(3),

    CONSTRAINT "stored_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stored_files_key_key" ON "stored_files"("key");

-- CreateIndex
CREATE INDEX "stored_files_status_uploadedAt_idx" ON "stored_files"("status", "uploadedAt");

-- CreateIndex
CREATE UNIQUE INDEX "change_request_fields_requestId_fieldKey_key" ON "change_request_fields"("requestId", "fieldKey");

-- CreateIndex
CREATE INDEX "employee_change_requests_routedTo_status_idx" ON "employee_change_requests"("routedTo", "status");

-- AddForeignKey
ALTER TABLE "stored_files" ADD CONSTRAINT "stored_files_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

