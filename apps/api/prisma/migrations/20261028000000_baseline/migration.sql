-- Baseline: full schema as of 2026-10-28. Replaces all earlier migrations, which had
-- drifted from schema.prisma (tables were created with db push). Earlier history is in git.

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'ON_HOLD', 'SUSPENDED', 'PENDING_ONBOARDING');

-- CreateEnum
CREATE TYPE "StakeholderType" AS ENUM ('EMPLOYEE', 'CLIENT', 'VENDOR', 'PARTNER');

-- CreateEnum
CREATE TYPE "ResetRequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AuthActivityType" AS ENUM ('LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'RESET_REQUESTED', 'RESET_APPROVED', 'PASSWORD_CHANGED', 'USER_CREATED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'HR_ADMIN', 'VERTICAL_HEAD', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('ACTIVE', 'TERMINATED');

-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('MANAGING_DIRECTOR', 'COO', 'MANAGEMENT_ADMIN', 'VERTICAL_HEAD', 'EXECUTIVE');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('PERMANENT', 'TEMPORARY', 'CONTRACT');

-- CreateEnum
CREATE TYPE "QualificationLevel" AS ENUM ('NONE', 'TENTH', 'TWELFTH', 'UG_DEGREE', 'PG_DEGREE');

-- CreateEnum
CREATE TYPE "PreviousOrgDocStatus" AS ENUM ('BOTH', 'ONE', 'NONE');

-- CreateEnum
CREATE TYPE "EmployeeBackground" AS ENUM ('EXPERIENCED', 'FRESHER', 'FREELANCER', 'ENTREPRENEUR');

-- CreateEnum
CREATE TYPE "ChangeRequestStatus" AS ENUM ('PENDING_HR_REVIEW', 'QUERY_SENT', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AuditActorType" AS ENUM ('USER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('INDIVIDUAL', 'CORPORATE');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('PROSPECT', 'ACTIVE', 'INACTIVE', 'BLACKLISTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "stakeholderType" "StakeholderType" NOT NULL DEFAULT 'EMPLOYEE',
    "role" "UserRole" NOT NULL DEFAULT 'EMPLOYEE',
    "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "passwordHash" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING_ONBOARDING',
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT false,
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "lastPasswordChangeAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_histories" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_requests" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "userId" TEXT,
    "reason" TEXT NOT NULL,
    "status" "ResetRequestStatus" NOT NULL DEFAULT 'PENDING',
    "actionedById" TEXT,
    "actionNote" TEXT,
    "tempPassword" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actionedAt" TIMESTAMP(3),

    CONSTRAINT "password_reset_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_activity_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "identifier" TEXT NOT NULL,
    "action" "AuthActivityType" NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outbox_events" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "aggregateType" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "outbox_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "employmentStatus" "EmploymentStatus" NOT NULL DEFAULT 'ACTIVE',
    "onboardingCompletedAt" TIMESTAMP(3),
    "statusChangedOn" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_personal_details" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_personal_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_communication_details" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "personalPhone" TEXT NOT NULL,
    "secondaryPhone" TEXT,
    "officialPhone" TEXT NOT NULL,
    "personalEmail" TEXT NOT NULL,
    "officialEmail" TEXT NOT NULL,
    "currentAddress" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_communication_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_contacts" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergency_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_documents" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "aadhaarNumber" TEXT NOT NULL,
    "aadhaarFrontUrl" TEXT,
    "aadhaarBackUrl" TEXT,
    "panNumber" TEXT,
    "panFrontUrl" TEXT,
    "drivingLicenceNumber" TEXT NOT NULL,
    "drivingLicenceFrontUrl" TEXT,
    "drivingLicenceBackUrl" TEXT,
    "highestQualification" "QualificationLevel" NOT NULL,
    "previousOrgDocStatus" "PreviousOrgDocStatus",
    "relievingExperienceUrl" TEXT,
    "salarySlipUrl" TEXT,
    "secondDocDueDate" TIMESTAMP(3),
    "isIncompleteFlag" BOOLEAN NOT NULL DEFAULT false,
    "employeeBackground" "EmployeeBackground",
    "recordOfIncomeUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educational_documents" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "qualificationLevel" "QualificationLevel" NOT NULL,
    "frontImageUrl" TEXT NOT NULL,
    "backImageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educational_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_employment_details" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "vertical" TEXT NOT NULL,
    "role" "EmployeeRole" NOT NULL,
    "jobType" "JobType" NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "reportingAuthorityId" TEXT,
    "exitDate" TIMESTAMP(3),
    "exitReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_employment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_probation_details" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "probationPeriod" TEXT NOT NULL,
    "financialAgreement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_probation_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_financial_details" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "takeHomePayTotal" DECIMAL(65,30) NOT NULL,
    "cashComponent" DECIMAL(65,30),
    "bankComponent" DECIMAL(65,30),
    "nextAppraisalWindow" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_financial_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vertical_transfer_histories" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fromVertical" TEXT NOT NULL,
    "toVertical" TEXT NOT NULL,
    "transferredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vertical_transfer_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_histories" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "fromRole" "EmployeeRole" NOT NULL,
    "toRole" "EmployeeRole" NOT NULL,
    "promotedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotion_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pay_revision_histories" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "previousPay" DECIMAL(65,30) NOT NULL,
    "newPay" DECIMAL(65,30) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pay_revision_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appraisal_histories" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "appraisalWindow" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appraisal_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_change_requests" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "status" "ChangeRequestStatus" NOT NULL DEFAULT 'PENDING_HR_REVIEW',
    "hrReviewerId" TEXT,
    "queryReason" TEXT,
    "rejectionReason" TEXT,
    "reviewDueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_change_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "change_request_fields" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "currentValue" TEXT NOT NULL,
    "proposedValue" TEXT NOT NULL,
    "proofDocumentUrl" TEXT,

    CONSTRAINT "change_request_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "clientCode" TEXT NOT NULL,
    "clientType" "ClientType" NOT NULL DEFAULT 'INDIVIDUAL',
    "status" "ClientStatus" NOT NULL DEFAULT 'ACTIVE',
    "acquiredById" TEXT NOT NULL,
    "primaryRMId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_profiles" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "companyName" TEXT,
    "panNumber" TEXT,
    "aadhaarNumber" TEXT,
    "gstNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_contacts" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "primaryPhone" TEXT NOT NULL,
    "secondaryPhone" TEXT,
    "email" TEXT,
    "currentAddress" TEXT,
    "permanentAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorType" "AuditActorType" NOT NULL,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "reason" TEXT,
    "changes" JSONB,
    "metadata" JSONB,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_identifier_key" ON "users"("identifier");

-- CreateIndex
CREATE INDEX "password_histories_userId_idx" ON "password_histories"("userId");

-- CreateIndex
CREATE INDEX "password_reset_requests_identifier_status_idx" ON "password_reset_requests"("identifier", "status");

-- CreateIndex
CREATE INDEX "auth_activity_logs_identifier_idx" ON "auth_activity_logs"("identifier");

-- CreateIndex
CREATE INDEX "auth_activity_logs_createdAt_idx" ON "auth_activity_logs"("createdAt");

-- CreateIndex
CREATE INDEX "outbox_events_processed_createdAt_idx" ON "outbox_events"("processed", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "employees_userId_key" ON "employees"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_employeeId_key" ON "employees"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_personal_details_employeeId_key" ON "employee_personal_details"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_communication_details_employeeId_key" ON "employee_communication_details"("employeeId");

-- CreateIndex
CREATE INDEX "emergency_contacts_employeeId_idx" ON "emergency_contacts"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_documents_employeeId_key" ON "employee_documents"("employeeId");

-- CreateIndex
CREATE INDEX "educational_documents_employeeId_idx" ON "educational_documents"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_employment_details_employeeId_key" ON "employee_employment_details"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_probation_details_employeeId_key" ON "employee_probation_details"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_financial_details_employeeId_key" ON "employee_financial_details"("employeeId");

-- CreateIndex
CREATE INDEX "vertical_transfer_histories_employeeId_idx" ON "vertical_transfer_histories"("employeeId");

-- CreateIndex
CREATE INDEX "promotion_histories_employeeId_idx" ON "promotion_histories"("employeeId");

-- CreateIndex
CREATE INDEX "pay_revision_histories_employeeId_idx" ON "pay_revision_histories"("employeeId");

-- CreateIndex
CREATE INDEX "appraisal_histories_employeeId_idx" ON "appraisal_histories"("employeeId");

-- CreateIndex
CREATE INDEX "employee_change_requests_employeeId_status_idx" ON "employee_change_requests"("employeeId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "clients_clientCode_key" ON "clients"("clientCode");

-- CreateIndex
CREATE INDEX "clients_clientCode_idx" ON "clients"("clientCode");

-- CreateIndex
CREATE INDEX "clients_acquiredById_idx" ON "clients"("acquiredById");

-- CreateIndex
CREATE INDEX "clients_primaryRMId_idx" ON "clients"("primaryRMId");

-- CreateIndex
CREATE INDEX "clients_status_idx" ON "clients"("status");

-- CreateIndex
CREATE UNIQUE INDEX "client_profiles_clientId_key" ON "client_profiles"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "client_contacts_clientId_key" ON "client_contacts"("clientId");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_entityId_occurredAt_idx" ON "audit_logs"("entityType", "entityId", "occurredAt");

-- CreateIndex
CREATE INDEX "audit_logs_actorUserId_occurredAt_idx" ON "audit_logs"("actorUserId", "occurredAt");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- AddForeignKey
ALTER TABLE "password_histories" ADD CONSTRAINT "password_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_requests" ADD CONSTRAINT "password_reset_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_requests" ADD CONSTRAINT "password_reset_requests_actionedById_fkey" FOREIGN KEY ("actionedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_activity_logs" ADD CONSTRAINT "auth_activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_personal_details" ADD CONSTRAINT "employee_personal_details_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_communication_details" ADD CONSTRAINT "employee_communication_details_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_documents" ADD CONSTRAINT "employee_documents_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_documents" ADD CONSTRAINT "educational_documents_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_employment_details" ADD CONSTRAINT "employee_employment_details_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_employment_details" ADD CONSTRAINT "employee_employment_details_reportingAuthorityId_fkey" FOREIGN KEY ("reportingAuthorityId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_probation_details" ADD CONSTRAINT "employee_probation_details_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_financial_details" ADD CONSTRAINT "employee_financial_details_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vertical_transfer_histories" ADD CONSTRAINT "vertical_transfer_histories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_histories" ADD CONSTRAINT "promotion_histories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pay_revision_histories" ADD CONSTRAINT "pay_revision_histories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appraisal_histories" ADD CONSTRAINT "appraisal_histories_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_change_requests" ADD CONSTRAINT "employee_change_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "change_request_fields" ADD CONSTRAINT "change_request_fields_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "employee_change_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_acquiredById_fkey" FOREIGN KEY ("acquiredById") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_primaryRMId_fkey" FOREIGN KEY ("primaryRMId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_profiles" ADD CONSTRAINT "client_profiles_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_contacts" ADD CONSTRAINT "client_contacts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

