import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8).max(128),
});

export const createEmployeeSchema = z.object({
  companyId: z.string().uuid(),
  branchId: z.string().uuid().optional(),
  departmentId: z.string().uuid().optional(),
  managerId: z.string().uuid().optional(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  middleName: z.string().max(100).optional(),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  whatsapp: z.string().optional(),
  jobTitle: z.string().min(1).max(150),
  jobLevel: z.string().optional(),
  employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN', 'CONSULTANT']).default('FULL_TIME'),
  hireDate: z.coerce.date(),
  roleIds: z.array(z.string().uuid()).min(1),
  password: z.string().min(8).max(128),
});

export const createCompanySchema = z.object({
  name: z.string().min(1).max(255),
  legalName: z.string().min(1).max(255),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default('Nigeria'),
  description: z.string().optional(),
});

export const createEstateSchema = z.object({
  companyId: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(50),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  state: z.string().min(1),
  lga: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  community: z.string().optional(),
  address: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  totalLandSize: z.coerce.number().positive().optional(),
  totalPlots: z.coerce.number().int().positive().optional(),
});

const propertyBaseSchema = z.object({
  title: z.string().min(1).max(255),
  category: z.enum([
    'LAND', 'HOUSE', 'DUPLEX', 'BUNGALOW', 'APARTMENT', 'COMMERCIAL',
    'WAREHOUSE', 'OFFICE', 'SHOP', 'HOTEL', 'ESTATE_PLOT', 'FARM_LAND',
    'MIXED_USE', 'INDUSTRIAL', 'LUXURY_HOME', 'PROJECT_DEVELOPMENT',
  ]),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL', 'INVESTMENT', 'MIXED_USE']),
  estateId: z.string().uuid().optional(),
  developmentId: z.string().uuid().optional(),
  buildingId: z.string().uuid().optional(),
  state: z.string().min(1),
  lga: z.string().optional(),
  city: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  listingPrice: z.coerce.number().positive().optional(),
  landSize: z.coerce.number().positive().optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  bathrooms: z.coerce.number().int().min(0).optional(),
  installmentAllowed: z.boolean().default(false),
  reservationAmount: z.coerce.number().positive().optional(),
});

export const createPropertySchema = propertyBaseSchema.refine(
  (data) => data.estateId || data.developmentId,
  { message: 'Property must belong to an Estate or Development', path: ['estateId'] },
);

export const updatePropertySchema = propertyBaseSchema.partial().omit({ estateId: true, developmentId: true });

export const propertyStatusTransitionSchema = z.object({
  status: z.enum([
    'DRAFT', 'PENDING_INSPECTION', 'PENDING_VERIFICATION', 'APPROVED',
    'PUBLISHED', 'RESERVED', 'UNDER_NEGOTIATION', 'UNDER_CONTRACT',
    'SOLD', 'ARCHIVED', 'REJECTED',
  ]),
  reason: z.string().optional(),
});

export const createCustomerSchema = z.object({
  type: z.enum(['INDIVIDUAL', 'CORPORATE', 'INVESTOR', 'AGENT']).default('INDIVIDUAL'),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  companyName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(7),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  leadSource: z.string().optional(),
  password: z.string().min(8).optional(),
});

export const createReservationSchema = z.object({
  propertyId: z.string().uuid(),
  customerId: z.string().uuid(),
  reservationAmount: z.coerce.number().positive(),
  expiresAt: z.coerce.date(),
  notes: z.string().optional(),
  terms: z.string().optional(),
});

export const createSaleSchema = z.object({
  propertyId: z.string().uuid(),
  customerId: z.string().uuid(),
  reservationId: z.string().uuid().optional(),
  salesAgentId: z.string().uuid().optional(),
  type: z.enum(['OUTRIGHT', 'INSTALLMENT', 'LEASE', 'RENT_TO_OWN']).default('OUTRIGHT'),
  salePrice: z.coerce.number().positive(),
  discountAmount: z.coerce.number().min(0).optional(),
  installmentMonths: z.coerce.number().int().positive().optional(),
  downPayment: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
});

export const recordPaymentSchema = z.object({
  saleId: z.string().uuid().optional(),
  customerId: z.string().uuid(),
  type: z.enum(['RESERVATION', 'DEPOSIT', 'INSTALLMENT', 'OUTRIGHT', 'SERVICE_CHARGE', 'MAINTENANCE', 'REFUND', 'OTHER']),
  method: z.enum(['CASH', 'BANK_TRANSFER', 'CHEQUE', 'POS', 'OTHER']),
  amount: z.coerce.number().positive(),
  reference: z.string().optional(),
  bankName: z.string().optional(),
  transactionDate: z.coerce.date(),
  notes: z.string().optional(),
});

export const verifyPaymentSchema = z.object({
  status: z.enum(['VERIFIED', 'REJECTED']),
  rejectionReason: z.string().optional(),
});

export const createInspectionSchema = z.object({
  propertyId: z.string().uuid(),
  customerId: z.string().uuid().optional(),
  inspectorId: z.string().uuid(),
  type: z.enum(['INITIAL', 'FOLLOW_UP', 'PRE_SALE', 'POST_SALE', 'MAINTENANCE', 'COMPLIANCE']).default('INITIAL'),
  scheduledAt: z.coerce.date(),
  notes: z.string().optional(),
});

export const completeInspectionSchema = z.object({
  recommendation: z.enum(['APPROVE', 'APPROVE_WITH_CONDITIONS', 'REJECT', 'NEEDS_FOLLOW_UP']),
  overallScore: z.coerce.number().min(0).max(100).optional(),
  summary: z.string().min(1),
  observations: z.record(z.unknown()).optional(),
  defects: z.record(z.unknown()).optional(),
});

export const createAppointmentSchema = z.object({
  type: z.enum(['PROPERTY_INSPECTION', 'OFFICE_VISIT', 'DOCUMENT_SIGNING', 'PAYMENT_MEETING', 'GENERAL_CONSULTATION', 'FOLLOW_UP']),
  customerId: z.string().uuid(),
  propertyId: z.string().uuid().optional(),
  assignedEmployeeId: z.string().uuid().optional(),
  scheduledAt: z.coerce.date(),
  durationMinutes: z.coerce.number().int().min(15).max(480).default(60),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export const createVendorSchema = z.object({
  companyId: z.string().uuid(),
  companyName: z.string().min(1),
  contactPerson: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  category: z.enum(['CONSTRUCTION', 'LEGAL', 'SURVEY', 'MARKETING', 'IT', 'SECURITY', 'ENGINEERING', 'ENVIRONMENTAL', 'FINANCE', 'OTHER']),
  address: z.string().optional(),
  contractStart: z.coerce.date().optional(),
  contractEnd: z.coerce.date().optional(),
});

export const uploadDocumentSchema = z.object({
  title: z.string().min(1),
  category: z.enum(['PROPERTY', 'ESTATE', 'CUSTOMER', 'SALES', 'FINANCE', 'EMPLOYEE', 'COMPANY', 'VENDOR', 'INSPECTION', 'LEGAL', 'MARKETING', 'OTHER']),
  documentType: z.string().min(1),
  entityType: z.enum(['COMPANY', 'ESTATE', 'DEVELOPMENT', 'PROPERTY', 'BUILDING', 'CUSTOMER', 'EMPLOYEE', 'INSPECTION', 'RESERVATION', 'SALE', 'PAYMENT', 'DOCUMENT', 'VENDOR', 'APPOINTMENT', 'USER']),
  entityId: z.string().uuid(),
  securityClassification: z.enum(['PUBLIC', 'INTERNAL', 'CONFIDENTIAL', 'RESTRICTED', 'HIGHLY_CONFIDENTIAL', 'EXECUTIVE_ONLY', 'LEGAL_PRIVILEGED', 'FINANCE_ONLY', 'SYSTEM_CONFIDENTIAL']).default('INTERNAL'),
  expirationDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
});

export const aiChatSchema = z.object({
  mode: z.enum(['CUSTOMER_ASSISTANT', 'SALES_ASSISTANT', 'PROPERTY_ASSISTANT', 'DOCUMENT_ASSISTANT', 'EXECUTIVE_ASSISTANT', 'INTERNAL_ASSISTANT']),
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
  entityType: z.string().optional(),
  entityId: z.string().uuid().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type RecordPaymentInput = z.infer<typeof recordPaymentSchema>;
