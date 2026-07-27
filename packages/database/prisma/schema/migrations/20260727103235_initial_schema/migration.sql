-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('EMPLOYEE', 'CUSTOMER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN', 'CONSULTANT');

-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'ON_LEAVE', 'SUSPENDED', 'TERMINATED', 'RESIGNED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DISSOLVED');

-- CreateEnum
CREATE TYPE "EstateStatus" AS ENUM ('PLANNING', 'UNDER_DEVELOPMENT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DevelopmentStatus" AS ENUM ('PROPOSED', 'APPROVED', 'UNDER_CONSTRUCTION', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InfrastructureStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('LAND', 'HOUSE', 'DUPLEX', 'BUNGALOW', 'APARTMENT', 'COMMERCIAL', 'WAREHOUSE', 'OFFICE', 'SHOP', 'HOTEL', 'ESTATE_PLOT', 'FARM_LAND', 'MIXED_USE', 'INDUSTRIAL', 'LUXURY_HOME', 'PROJECT_DEVELOPMENT');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL', 'INVESTMENT', 'MIXED_USE');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('DRAFT', 'PENDING_INSPECTION', 'PENDING_VERIFICATION', 'APPROVED', 'PUBLISHED', 'RESERVED', 'UNDER_NEGOTIATION', 'UNDER_CONTRACT', 'SOLD', 'ARCHIVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PropertyPriority" AS ENUM ('LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('FREEHOLD', 'LEASEHOLD', 'CUSTOMARY', 'GOVERNMENT_ALLOCATION', 'JOINT_OWNERSHIP');

-- CreateEnum
CREATE TYPE "TitleStatus" AS ENUM ('VERIFIED', 'PENDING_VERIFICATION', 'DISPUTED', 'NOT_AVAILABLE', 'IN_PROGRESS');

-- CreateEnum
CREATE TYPE "ConstructionStatus" AS ENUM ('NOT_STARTED', 'FOUNDATION', 'STRUCTURE', 'ROOFING', 'FINISHING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BuildingCondition" AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'NEEDS_RENOVATION', 'UNDER_CONSTRUCTION');

-- CreateEnum
CREATE TYPE "BuildingType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'MIXED', 'INDUSTRIAL', 'INSTITUTIONAL');

-- CreateEnum
CREATE TYPE "BuildingStatus" AS ENUM ('PLANNED', 'UNDER_CONSTRUCTION', 'COMPLETED', 'OCCUPIED', 'VACANT', 'DEMOLISHED');

-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('INDIVIDUAL', 'CORPORATE', 'INVESTOR', 'AGENT');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('PROSPECT', 'ACTIVE', 'INACTIVE', 'BLACKLISTED');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('NOT_STARTED', 'PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "InspectionType" AS ENUM ('INITIAL', 'FOLLOW_UP', 'PRE_SALE', 'POST_SALE', 'MAINTENANCE', 'COMPLIANCE');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "InspectionRecommendation" AS ENUM ('APPROVE', 'APPROVE_WITH_CONDITIONS', 'REJECT', 'NEEDS_FOLLOW_UP');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'EXPIRED', 'CANCELLED', 'CONVERTED_TO_SALE');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('OUTRIGHT', 'INSTALLMENT', 'LEASE', 'RENT_TO_OWN');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('RESERVATION', 'DEPOSIT', 'INSTALLMENT', 'OUTRIGHT', 'SERVICE_CHARGE', 'MAINTENANCE', 'REFUND', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BANK_TRANSFER', 'CHEQUE', 'POS', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING_VERIFICATION', 'VERIFIED', 'REJECTED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('PROPERTY', 'ESTATE', 'CUSTOMER', 'SALES', 'FINANCE', 'EMPLOYEE', 'COMPANY', 'VENDOR', 'INSPECTION', 'LEGAL', 'MARKETING', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CERTIFICATE_OF_OCCUPANCY', 'RIGHT_OF_OCCUPANCY', 'GOVERNORS_CONSENT', 'SURVEY_PLAN', 'BEACON_COORDINATES', 'SITE_PLAN', 'LAYOUT_PLAN', 'APPROVED_BUILDING_PLAN', 'DEED_OF_ASSIGNMENT', 'DEED_OF_CONVEYANCE', 'LAND_INFORMATION_CERTIFICATE', 'TITLE_VERIFICATION_REPORT', 'VALUATION_REPORT', 'ENVIRONMENTAL_REPORT', 'TAX_CLEARANCE', 'LAND_REGISTRY_DOCUMENT', 'PHOTOGRAPH', 'DRONE_IMAGE', 'INSPECTION_REPORT', 'MASTER_LAYOUT', 'INFRASTRUCTURE_PLAN', 'NATIONAL_ID', 'INTERNATIONAL_PASSPORT', 'DRIVERS_LICENSE', 'PROOF_OF_ADDRESS', 'TAX_IDENTIFICATION', 'BVN', 'RESERVATION_FORM', 'OFFER_LETTER', 'PURCHASE_AGREEMENT', 'SALES_AGREEMENT', 'PAYMENT_SCHEDULE', 'ALLOCATION_LETTER', 'HANDOVER_CERTIFICATE', 'COMPLETION_CERTIFICATE', 'OWNERSHIP_TRANSFER', 'PAYMENT_RECEIPT', 'BANK_DEPOSIT_SLIP', 'TRANSFER_CONFIRMATION', 'INVOICE', 'EMPLOYMENT_LETTER', 'CAC_REGISTRATION', 'INSURANCE_POLICY', 'BUSINESS_LICENSE', 'CONTRACT', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('UPLOADED', 'SCANNING', 'ASSIGNED', 'VERIFIED', 'APPROVED', 'REJECTED', 'PUBLISHED', 'ARCHIVED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SecurityClassification" AS ENUM ('PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'HIGHLY_CONFIDENTIAL', 'EXECUTIVE_ONLY', 'LEGAL_PRIVILEGED', 'FINANCE_ONLY', 'SYSTEM_CONFIDENTIAL');

-- CreateEnum
CREATE TYPE "DocumentAccessAction" AS ENUM ('VIEW', 'PREVIEW', 'DOWNLOAD', 'SHARE', 'DENIED');

-- CreateEnum
CREATE TYPE "VendorCategory" AS ENUM ('CONSTRUCTION', 'LEGAL', 'SURVEY', 'MARKETING', 'IT', 'SECURITY', 'ENGINEERING', 'ENVIRONMENTAL', 'FINANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'BLACKLISTED');

-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('PROPERTY_INSPECTION', 'OFFICE_VISIT', 'DOCUMENT_SIGNING', 'PAYMENT_MEETING', 'GENERAL_CONSULTATION', 'FOLLOW_UP');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('IN_APP', 'EMAIL', 'SMS', 'PUSH');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'READ', 'FAILED');

-- CreateEnum
CREATE TYPE "AiMode" AS ENUM ('CUSTOMER_ASSISTANT', 'SALES_ASSISTANT', 'PROPERTY_ASSISTANT', 'DOCUMENT_ASSISTANT', 'EXECUTIVE_ASSISTANT', 'INTERNAL_ASSISTANT');

-- CreateEnum
CREATE TYPE "AiMessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'LOGIN_FAILED', 'PUBLISH', 'APPROVE', 'REJECT', 'ARCHIVE', 'DOWNLOAD', 'PREVIEW', 'SHARE', 'EXPORT', 'IMPORT', 'STATUS_CHANGE', 'PERMISSION_CHANGE');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('COMPANY', 'ESTATE', 'DEVELOPMENT', 'PROPERTY', 'BUILDING', 'CUSTOMER', 'EMPLOYEE', 'INSPECTION', 'RESERVATION', 'SALE', 'PAYMENT', 'DOCUMENT', 'VENDOR', 'APPOINTMENT', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verified_at" TIMESTAMP(3),
    "mfa_enabled" BOOLEAN NOT NULL DEFAULT false,
    "mfa_secret" TEXT,
    "last_login_at" TIMESTAMP(3),
    "last_login_ip" TEXT,
    "failed_login_count" INTEGER NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMP(3),
    "employee_id" UUID,
    "customer_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "replaced_by" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_system" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "employee_roles" (
    "employee_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" UUID,

    CONSTRAINT "employee_roles_pkey" PRIMARY KEY ("employee_id","role_id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "registration_number" TEXT,
    "tax_id" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "logo_url" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Nigeria',
    "postal_code" TEXT,
    "status" "CompanyStatus" NOT NULL DEFAULT 'ACTIVE',
    "founded_date" TIMESTAMP(3),
    "description" TEXT,
    "mission_statement" TEXT,
    "vision_statement" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_branches" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "is_head_office" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "company_branches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "head_id" UUID,
    "parent_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "branch_id" UUID,
    "department_id" UUID,
    "manager_id" UUID,
    "employee_number" TEXT NOT NULL,
    "staff_code" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "whatsapp" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" "Gender",
    "nationality" TEXT NOT NULL DEFAULT 'Nigerian',
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "emergency_contact" TEXT,
    "emergency_phone" TEXT,
    "job_title" TEXT NOT NULL,
    "job_level" TEXT,
    "employment_type" "EmploymentType" NOT NULL DEFAULT 'FULL_TIME',
    "status" "EmployeeStatus" NOT NULL DEFAULT 'ACTIVE',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "confirmation_date" TIMESTAMP(3),
    "termination_date" TIMESTAMP(3),
    "national_id" TEXT,
    "passport_number" TEXT,
    "bank_name" TEXT,
    "bank_account_enc" TEXT,
    "profile_photo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" UUID,
    "updated_by_id" UUID,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "customer_number" TEXT NOT NULL,
    "type" "CustomerType" NOT NULL DEFAULT 'INDIVIDUAL',
    "status" "CustomerStatus" NOT NULL DEFAULT 'PROSPECT',
    "kyc_status" "KycStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "first_name" TEXT,
    "last_name" TEXT,
    "middle_name" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" "Gender",
    "marital_status" "MaritalStatus",
    "nationality" TEXT NOT NULL DEFAULT 'Nigerian',
    "occupation" TEXT,
    "company_name" TEXT,
    "company_reg_number" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT,
    "alternate_phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Nigeria',
    "postal_code" TEXT,
    "national_id" TEXT,
    "passport_number" TEXT,
    "tax_id" TEXT,
    "bvn_enc" TEXT,
    "preferred_locations" TEXT[],
    "budget_min" DECIMAL(18,2),
    "budget_max" DECIMAL(18,2),
    "preferred_categories" "PropertyCategory"[],
    "notes" TEXT,
    "lead_source" TEXT,
    "assigned_agent_id" UUID,
    "profile_photo_url" TEXT,
    "kyc_verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" UUID,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" UUID NOT NULL,
    "inspection_number" TEXT NOT NULL,
    "property_id" UUID NOT NULL,
    "customer_id" UUID,
    "inspector_id" UUID NOT NULL,
    "type" "InspectionType" NOT NULL DEFAULT 'INITIAL',
    "status" "InspectionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "recommendation" "InspectionRecommendation",
    "overall_score" DECIMAL(5,2),
    "summary" TEXT,
    "observations" JSONB,
    "defects" JSONB,
    "photos" TEXT[],
    "report_url" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" UUID NOT NULL,
    "reservation_number" TEXT NOT NULL,
    "property_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "reservation_amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "reserved_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "confirmed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "cancellation_reason" TEXT,
    "notes" TEXT,
    "terms" TEXT,
    "created_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" UUID NOT NULL,
    "sale_number" TEXT NOT NULL,
    "property_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "reservation_id" UUID,
    "sales_agent_id" UUID,
    "type" "SaleType" NOT NULL DEFAULT 'OUTRIGHT',
    "status" "SaleStatus" NOT NULL DEFAULT 'DRAFT',
    "sale_price" DECIMAL(18,2) NOT NULL,
    "discount_amount" DECIMAL(18,2),
    "final_price" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "installment_months" INTEGER,
    "installment_amount" DECIMAL(18,2),
    "down_payment" DECIMAL(18,2),
    "total_paid" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "balance_due" DECIMAL(18,2) NOT NULL,
    "contract_date" TIMESTAMP(3),
    "completion_date" TIMESTAMP(3),
    "handover_date" TIMESTAMP(3),
    "approved_at" TIMESTAMP(3),
    "approved_by_id" UUID,
    "notes" TEXT,
    "terms" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_installments" (
    "id" UUID NOT NULL,
    "sale_id" UUID NOT NULL,
    "installment_number" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "paid_amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_installments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "payment_number" TEXT NOT NULL,
    "sale_id" UUID,
    "customer_id" UUID NOT NULL,
    "type" "PaymentType" NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "reference" TEXT,
    "bank_name" TEXT,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "verified_at" TIMESTAMP(3),
    "verified_by_id" UUID,
    "recorded_by_id" UUID NOT NULL,
    "rejection_reason" TEXT,
    "receipt_number" TEXT,
    "notes" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estates" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "short_description" TEXT,
    "status" "EstateStatus" NOT NULL DEFAULT 'PLANNING',
    "country" TEXT NOT NULL DEFAULT 'Nigeria',
    "state" TEXT NOT NULL,
    "lga" TEXT,
    "city" TEXT,
    "district" TEXT,
    "community" TEXT,
    "address" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "total_land_size" DECIMAL(15,2),
    "total_plots" INTEGER,
    "available_plots" INTEGER,
    "master_plan_url" TEXT,
    "brochure_url" TEXT,
    "cover_image_url" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" UUID,
    "updated_by_id" UUID,

    CONSTRAINT "estates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estate_phases" (
    "id" UUID NOT NULL,
    "estate_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "total_plots" INTEGER,
    "status" "EstateStatus" NOT NULL DEFAULT 'PLANNING',
    "start_date" TIMESTAMP(3),
    "completion_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estate_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estate_blocks" (
    "id" UUID NOT NULL,
    "estate_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "section" TEXT,
    "total_plots" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estate_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estate_infrastructure" (
    "id" UUID NOT NULL,
    "estate_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "status" "InfrastructureStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "completed_at" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estate_infrastructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "developments" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "estate_id" UUID,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "status" "DevelopmentStatus" NOT NULL DEFAULT 'PROPOSED',
    "development_type" TEXT,
    "total_units" INTEGER,
    "completed_units" INTEGER,
    "start_date" TIMESTAMP(3),
    "expected_completion" TIMESTAMP(3),
    "actual_completion" TIMESTAMP(3),
    "budget" DECIMAL(18,2),
    "spent_amount" DECIMAL(18,2),
    "project_manager_id" UUID,
    "cover_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "developments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "development_milestones" (
    "id" UUID NOT NULL,
    "development_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "target_date" TIMESTAMP(3),
    "completed_date" TIMESTAMP(3),
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "development_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" UUID NOT NULL,
    "estate_id" UUID,
    "development_id" UUID,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "building_type" "BuildingType" NOT NULL,
    "status" "BuildingStatus" NOT NULL DEFAULT 'PLANNED',
    "floors" INTEGER,
    "total_units" INTEGER,
    "building_area" DECIMAL(12,2),
    "year_built" INTEGER,
    "address" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" UUID NOT NULL,
    "document_number" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "reference_number" TEXT,
    "barcode" TEXT,
    "qr_code" TEXT,
    "category" "DocumentCategory" NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "subcategory" TEXT,
    "business_module" TEXT,
    "security_classification" "SecurityClassification" NOT NULL DEFAULT 'INTERNAL',
    "department" TEXT,
    "entity_type" "EntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "original_filename" TEXT NOT NULL,
    "file_extension" TEXT NOT NULL,
    "file_size" BIGINT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL,
    "storage_provider" TEXT NOT NULL DEFAULT 'local',
    "checksum" TEXT NOT NULL,
    "is_encrypted" BOOLEAN NOT NULL DEFAULT true,
    "thumbnail_url" TEXT,
    "preview_url" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'UPLOADED',
    "current_version" INTEGER NOT NULL DEFAULT 1,
    "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verification_date" TIMESTAMP(3),
    "approval_date" TIMESTAMP(3),
    "expiration_date" TIMESTAMP(3),
    "archive_date" TIMESTAMP(3),
    "retention_period_days" INTEGER,
    "uploaded_by_id" UUID NOT NULL,
    "verified_by_id" UUID,
    "approved_by_id" UUID,
    "watermark_enabled" BOOLEAN NOT NULL DEFAULT false,
    "download_restricted" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_versions" (
    "id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "version_number" INTEGER NOT NULL,
    "original_filename" TEXT NOT NULL,
    "file_size" BIGINT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL,
    "checksum" TEXT NOT NULL,
    "change_summary" TEXT,
    "reason" TEXT,
    "approval_status" "DocumentStatus" NOT NULL DEFAULT 'UPLOADED',
    "uploaded_by_id" UUID NOT NULL,
    "approved_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_access_logs" (
    "id" UUID NOT NULL,
    "document_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "action" "DocumentAccessAction" NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "denied" BOOLEAN NOT NULL DEFAULT false,
    "deny_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendors" (
    "id" UUID NOT NULL,
    "company_id" UUID NOT NULL,
    "vendor_number" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "category" "VendorCategory" NOT NULL,
    "status" "VendorStatus" NOT NULL DEFAULT 'ACTIVE',
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Nigeria',
    "tax_id" TEXT,
    "registration_no" TEXT,
    "contract_start" TIMESTAMP(3),
    "contract_end" TIMESTAMP(3),
    "rating" DECIMAL(3,2),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" UUID NOT NULL,
    "appointment_number" TEXT NOT NULL,
    "type" "AppointmentType" NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "customer_id" UUID NOT NULL,
    "property_id" UUID,
    "assigned_employee_id" UUID,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "duration_minutes" INTEGER NOT NULL DEFAULT 60,
    "location" TEXT,
    "notes" TEXT,
    "internal_notes" TEXT,
    "reminder_sent" BOOLEAN NOT NULL DEFAULT false,
    "confirmed_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),
    "cancellation_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "channel" "NotificationChannel" NOT NULL DEFAULT 'IN_APP',
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "entity_type" "EntityType",
    "entity_id" UUID,
    "action_url" TEXT,
    "read_at" TIMESTAMP(3),
    "sent_at" TIMESTAMP(3),
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_conversations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "mode" "AiMode" NOT NULL,
    "title" TEXT,
    "entity_type" "EntityType",
    "entity_id" UUID,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_messages" (
    "id" UUID NOT NULL,
    "conversation_id" UUID NOT NULL,
    "role" "AiMessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "token_count" INTEGER,
    "model" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_knowledge_entries" (
    "id" UUID NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "entity_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" BYTEA,
    "tags" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_knowledge_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "actor_id" UUID,
    "actor_email" TEXT,
    "action" "AuditAction" NOT NULL,
    "entity_type" "EntityType",
    "entity_id" UUID,
    "entity_label" TEXT,
    "old_values" JSONB,
    "new_values" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL,
    "internal_number" TEXT NOT NULL,
    "reference_code" TEXT,
    "barcode" TEXT,
    "qr_code" TEXT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "display_name" TEXT,
    "marketing_name" TEXT,
    "internal_name" TEXT,
    "description" TEXT,
    "short_description" TEXT,
    "long_description" TEXT,
    "marketing_description" TEXT,
    "key_highlights" TEXT[],
    "investment_summary" TEXT,
    "category" "PropertyCategory" NOT NULL,
    "type" "PropertyType" NOT NULL,
    "usage" TEXT,
    "status" "PropertyStatus" NOT NULL DEFAULT 'DRAFT',
    "priority" "PropertyPriority" NOT NULL DEFAULT 'NORMAL',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "is_luxury" BOOLEAN NOT NULL DEFAULT false,
    "is_investment" BOOLEAN NOT NULL DEFAULT false,
    "featured_order" INTEGER,
    "estate_id" UUID,
    "development_id" UUID,
    "building_id" UUID,
    "phase_id" UUID,
    "block_id" UUID,
    "manager_id" UUID,
    "country" TEXT NOT NULL DEFAULT 'Nigeria',
    "state" TEXT NOT NULL,
    "lga" TEXT,
    "city" TEXT,
    "district" TEXT,
    "community" TEXT,
    "street" TEXT,
    "house_number" TEXT,
    "postal_code" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "map_polygon" JSONB,
    "phase_label" TEXT,
    "section" TEXT,
    "block_label" TEXT,
    "plot_number" TEXT,
    "land_size" DECIMAL(12,2),
    "land_size_unit" TEXT NOT NULL DEFAULT 'sqm',
    "building_area" DECIMAL(12,2),
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "toilets" INTEGER,
    "floors" INTEGER,
    "parking_spaces" INTEGER,
    "has_swimming_pool" BOOLEAN NOT NULL DEFAULT false,
    "has_garden" BOOLEAN NOT NULL DEFAULT false,
    "has_balcony" BOOLEAN NOT NULL DEFAULT false,
    "has_garage" BOOLEAN NOT NULL DEFAULT false,
    "has_gym" BOOLEAN NOT NULL DEFAULT false,
    "has_security_house" BOOLEAN NOT NULL DEFAULT false,
    "has_electricity" BOOLEAN NOT NULL DEFAULT true,
    "has_water_supply" BOOLEAN NOT NULL DEFAULT false,
    "has_drainage" BOOLEAN NOT NULL DEFAULT false,
    "has_road_access" BOOLEAN NOT NULL DEFAULT true,
    "has_internet" BOOLEAN NOT NULL DEFAULT false,
    "has_fencing" BOOLEAN NOT NULL DEFAULT false,
    "has_gate" BOOLEAN NOT NULL DEFAULT false,
    "has_cctv" BOOLEAN NOT NULL DEFAULT false,
    "has_solar" BOOLEAN NOT NULL DEFAULT false,
    "is_smart_home_ready" BOOLEAN NOT NULL DEFAULT false,
    "year_built" INTEGER,
    "construction_status" "ConstructionStatus",
    "building_condition" "BuildingCondition",
    "listing_price" DECIMAL(18,2),
    "market_value" DECIMAL(18,2),
    "valuation_date" TIMESTAMP(3),
    "purchase_cost" DECIMAL(18,2),
    "development_cost" DECIMAL(18,2),
    "current_value" DECIMAL(18,2),
    "expected_roi" DECIMAL(8,4),
    "rental_yield" DECIMAL(8,4),
    "installment_allowed" BOOLEAN NOT NULL DEFAULT false,
    "reservation_amount" DECIMAL(18,2),
    "maintenance_fee" DECIMAL(18,2),
    "service_charge" DECIMAL(18,2),
    "agency_fee" DECIMAL(18,2),
    "commission_rate" DECIMAL(5,4),
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "ownership_type" "OwnershipType",
    "title_status" "TitleStatus",
    "has_cof_o" BOOLEAN NOT NULL DEFAULT false,
    "has_governor_consent" BOOLEAN NOT NULL DEFAULT false,
    "has_survey_plan" BOOLEAN NOT NULL DEFAULT false,
    "has_deed_of_assignment" BOOLEAN NOT NULL DEFAULT false,
    "has_building_approval" BOOLEAN NOT NULL DEFAULT false,
    "has_planning_approval" BOOLEAN NOT NULL DEFAULT false,
    "has_environmental_approval" BOOLEAN NOT NULL DEFAULT false,
    "legal_restrictions" TEXT,
    "encumbrances" TEXT,
    "cover_image_url" TEXT,
    "virtual_tour_url" TEXT,
    "brochure_url" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "keywords" TEXT[],
    "meta_tags" JSONB,
    "campaign_id" TEXT,
    "advertisement_status" TEXT,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "favorite_count" INTEGER NOT NULL DEFAULT 0,
    "booking_count" INTEGER NOT NULL DEFAULT 0,
    "inspection_request_count" INTEGER NOT NULL DEFAULT 0,
    "lead_score" DECIMAL(8,2),
    "popularity_score" DECIMAL(8,2),
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "approved_by_id" UUID,
    "published_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),
    "archived_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_media" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "alt_text" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_cover" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_status_history" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "from_status" "PropertyStatus",
    "to_status" "PropertyStatus" NOT NULL,
    "reason" TEXT,
    "changed_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_favorites" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_employee_id_key" ON "users"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_customer_id_key" ON "users"("customer_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_type_status_idx" ON "users"("type", "status");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_user_id_idx" ON "refresh_tokens"("user_id");

-- CreateIndex
CREATE INDEX "refresh_tokens_token_idx" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_resource_action_key" ON "permissions"("resource", "action");

-- CreateIndex
CREATE UNIQUE INDEX "companies_registration_number_key" ON "companies"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "company_branches_company_id_code_key" ON "company_branches"("company_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");

-- CreateIndex
CREATE UNIQUE INDEX "employees_employee_number_key" ON "employees"("employee_number");

-- CreateIndex
CREATE UNIQUE INDEX "employees_staff_code_key" ON "employees"("staff_code");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");

-- CreateIndex
CREATE INDEX "employees_company_id_status_idx" ON "employees"("company_id", "status");

-- CreateIndex
CREATE INDEX "employees_department_id_idx" ON "employees"("department_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_number_key" ON "customers"("customer_number");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE INDEX "customers_status_idx" ON "customers"("status");

-- CreateIndex
CREATE INDEX "customers_kyc_status_idx" ON "customers"("kyc_status");

-- CreateIndex
CREATE INDEX "customers_email_idx" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "inspections_inspection_number_key" ON "inspections"("inspection_number");

-- CreateIndex
CREATE INDEX "inspections_property_id_idx" ON "inspections"("property_id");

-- CreateIndex
CREATE INDEX "inspections_inspector_id_status_idx" ON "inspections"("inspector_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_reservation_number_key" ON "reservations"("reservation_number");

-- CreateIndex
CREATE INDEX "reservations_property_id_status_idx" ON "reservations"("property_id", "status");

-- CreateIndex
CREATE INDEX "reservations_customer_id_idx" ON "reservations"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "sales_sale_number_key" ON "sales"("sale_number");

-- CreateIndex
CREATE UNIQUE INDEX "sales_reservation_id_key" ON "sales"("reservation_id");

-- CreateIndex
CREATE INDEX "sales_property_id_status_idx" ON "sales"("property_id", "status");

-- CreateIndex
CREATE INDEX "sales_customer_id_idx" ON "sales"("customer_id");

-- CreateIndex
CREATE INDEX "sales_sales_agent_id_idx" ON "sales"("sales_agent_id");

-- CreateIndex
CREATE UNIQUE INDEX "sale_installments_sale_id_installment_number_key" ON "sale_installments"("sale_id", "installment_number");

-- CreateIndex
CREATE UNIQUE INDEX "payments_payment_number_key" ON "payments"("payment_number");

-- CreateIndex
CREATE UNIQUE INDEX "payments_receipt_number_key" ON "payments"("receipt_number");

-- CreateIndex
CREATE INDEX "payments_customer_id_idx" ON "payments"("customer_id");

-- CreateIndex
CREATE INDEX "payments_sale_id_idx" ON "payments"("sale_id");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "estates_slug_key" ON "estates"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "estates_code_key" ON "estates"("code");

-- CreateIndex
CREATE INDEX "estates_company_id_status_idx" ON "estates"("company_id", "status");

-- CreateIndex
CREATE INDEX "estates_state_city_idx" ON "estates"("state", "city");

-- CreateIndex
CREATE UNIQUE INDEX "estate_phases_estate_id_code_key" ON "estate_phases"("estate_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "estate_blocks_estate_id_code_key" ON "estate_blocks"("estate_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "developments_slug_key" ON "developments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "developments_code_key" ON "developments"("code");

-- CreateIndex
CREATE INDEX "developments_company_id_status_idx" ON "developments"("company_id", "status");

-- CreateIndex
CREATE INDEX "buildings_estate_id_idx" ON "buildings"("estate_id");

-- CreateIndex
CREATE INDEX "buildings_development_id_idx" ON "buildings"("development_id");

-- CreateIndex
CREATE UNIQUE INDEX "documents_document_number_key" ON "documents"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "documents_barcode_key" ON "documents"("barcode");

-- CreateIndex
CREATE INDEX "documents_entity_type_entity_id_idx" ON "documents"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "documents_category_document_type_idx" ON "documents"("category", "document_type");

-- CreateIndex
CREATE INDEX "documents_status_idx" ON "documents"("status");

-- CreateIndex
CREATE INDEX "documents_security_classification_idx" ON "documents"("security_classification");

-- CreateIndex
CREATE UNIQUE INDEX "document_versions_document_id_version_number_key" ON "document_versions"("document_id", "version_number");

-- CreateIndex
CREATE INDEX "document_access_logs_document_id_idx" ON "document_access_logs"("document_id");

-- CreateIndex
CREATE INDEX "document_access_logs_user_id_idx" ON "document_access_logs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "vendors_vendor_number_key" ON "vendors"("vendor_number");

-- CreateIndex
CREATE INDEX "vendors_company_id_status_idx" ON "vendors"("company_id", "status");

-- CreateIndex
CREATE INDEX "vendors_category_idx" ON "vendors"("category");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_appointment_number_key" ON "appointments"("appointment_number");

-- CreateIndex
CREATE INDEX "appointments_customer_id_idx" ON "appointments"("customer_id");

-- CreateIndex
CREATE INDEX "appointments_assigned_employee_id_scheduled_at_idx" ON "appointments"("assigned_employee_id", "scheduled_at");

-- CreateIndex
CREATE INDEX "appointments_status_scheduled_at_idx" ON "appointments"("status", "scheduled_at");

-- CreateIndex
CREATE INDEX "notifications_user_id_status_idx" ON "notifications"("user_id", "status");

-- CreateIndex
CREATE INDEX "notifications_user_id_read_at_idx" ON "notifications"("user_id", "read_at");

-- CreateIndex
CREATE INDEX "ai_conversations_user_id_is_active_idx" ON "ai_conversations"("user_id", "is_active");

-- CreateIndex
CREATE INDEX "ai_messages_conversation_id_idx" ON "ai_messages"("conversation_id");

-- CreateIndex
CREATE INDEX "ai_knowledge_entries_entity_type_entity_id_idx" ON "ai_knowledge_entries"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_actor_id_idx" ON "audit_logs"("actor_id");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "properties_internal_number_key" ON "properties"("internal_number");

-- CreateIndex
CREATE UNIQUE INDEX "properties_reference_code_key" ON "properties"("reference_code");

-- CreateIndex
CREATE UNIQUE INDEX "properties_barcode_key" ON "properties"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE INDEX "properties_status_idx" ON "properties"("status");

-- CreateIndex
CREATE INDEX "properties_category_type_idx" ON "properties"("category", "type");

-- CreateIndex
CREATE INDEX "properties_estate_id_idx" ON "properties"("estate_id");

-- CreateIndex
CREATE INDEX "properties_development_id_idx" ON "properties"("development_id");

-- CreateIndex
CREATE INDEX "properties_state_city_idx" ON "properties"("state", "city");

-- CreateIndex
CREATE INDEX "properties_featured_status_idx" ON "properties"("featured", "status");

-- CreateIndex
CREATE INDEX "properties_listing_price_idx" ON "properties"("listing_price");

-- CreateIndex
CREATE INDEX "property_media_property_id_idx" ON "property_media"("property_id");

-- CreateIndex
CREATE INDEX "property_status_history_property_id_idx" ON "property_status_history"("property_id");

-- CreateIndex
CREATE UNIQUE INDEX "property_favorites_property_id_customer_id_key" ON "property_favorites"("property_id", "customer_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_roles" ADD CONSTRAINT "employee_roles_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_roles" ADD CONSTRAINT "employee_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_branches" ADD CONSTRAINT "company_branches_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_head_id_fkey" FOREIGN KEY ("head_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "company_branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_sales_agent_id_fkey" FOREIGN KEY ("sales_agent_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_installments" ADD CONSTRAINT "sale_installments_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_verified_by_id_fkey" FOREIGN KEY ("verified_by_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_recorded_by_id_fkey" FOREIGN KEY ("recorded_by_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estates" ADD CONSTRAINT "estates_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estate_phases" ADD CONSTRAINT "estate_phases_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estate_blocks" ADD CONSTRAINT "estate_blocks_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estate_infrastructure" ADD CONSTRAINT "estate_infrastructure_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developments" ADD CONSTRAINT "developments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "developments" ADD CONSTRAINT "developments_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_milestones" ADD CONSTRAINT "development_milestones_development_id_fkey" FOREIGN KEY ("development_id") REFERENCES "developments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_development_id_fkey" FOREIGN KEY ("development_id") REFERENCES "developments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_versions" ADD CONSTRAINT "document_versions_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_access_logs" ADD CONSTRAINT "document_access_logs_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_access_logs" ADD CONSTRAINT "document_access_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendors" ADD CONSTRAINT "vendors_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_assigned_employee_id_fkey" FOREIGN KEY ("assigned_employee_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_messages" ADD CONSTRAINT "ai_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "ai_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_estate_id_fkey" FOREIGN KEY ("estate_id") REFERENCES "estates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_development_id_fkey" FOREIGN KEY ("development_id") REFERENCES "developments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_phase_id_fkey" FOREIGN KEY ("phase_id") REFERENCES "estate_phases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_block_id_fkey" FOREIGN KEY ("block_id") REFERENCES "estate_blocks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_media" ADD CONSTRAINT "property_media_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_status_history" ADD CONSTRAINT "property_status_history_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_favorites" ADD CONSTRAINT "property_favorites_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_favorites" ADD CONSTRAINT "property_favorites_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
