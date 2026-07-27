export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  type: 'EMPLOYEE' | 'CUSTOMER' | 'SYSTEM';
  employeeId?: string;
  customerId?: string;
  permissions: string[];
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  type: 'EMPLOYEE' | 'CUSTOMER' | 'SYSTEM';
  employeeId?: string;
  customerId?: string;
  permissions: string[];
}

export type SortOrder = 'asc' | 'desc';

export interface DateRangeFilter {
  from?: string;
  to?: string;
}
