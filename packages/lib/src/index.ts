export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateReference(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function generateInternalNumber(prefix: string, sequence: number): string {
  return `${prefix}-${String(sequence).padStart(6, '0')}`;
}

export function calculatePagination(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    skip: (page - 1) * limit,
  };
}

export function omitUndefined<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export function pickChangedFields<T extends Record<string, unknown>>(
  oldObj: T,
  newObj: Partial<T>,
): Partial<T> {
  const changed: Partial<T> = {};
  for (const key of Object.keys(newObj) as (keyof T)[]) {
    if (newObj[key] !== undefined && JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
      changed[key] = newObj[key];
    }
  }
  return changed;
}

export async function createChecksum(buffer: Buffer): Promise<string> {
  const crypto = await import('crypto');
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

export const PROPERTY_STATUS_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ['PENDING_INSPECTION', 'REJECTED'],
  PENDING_INSPECTION: ['PENDING_VERIFICATION', 'REJECTED'],
  PENDING_VERIFICATION: ['APPROVED', 'REJECTED'],
  APPROVED: ['PUBLISHED', 'REJECTED'],
  PUBLISHED: ['RESERVED', 'UNDER_NEGOTIATION', 'ARCHIVED'],
  RESERVED: ['UNDER_NEGOTIATION', 'UNDER_CONTRACT', 'PUBLISHED'],
  UNDER_NEGOTIATION: ['UNDER_CONTRACT', 'PUBLISHED'],
  UNDER_CONTRACT: ['SOLD'],
  SOLD: ['ARCHIVED'],
  REJECTED: ['DRAFT'],
  ARCHIVED: [],
};

export function isValidPropertyStatusTransition(from: string, to: string): boolean {
  const allowed = PROPERTY_STATUS_TRANSITIONS[from];
  return allowed ? allowed.includes(to) : false;
}

export const SOLD_STATUSES = ['SOLD', 'ARCHIVED'];
