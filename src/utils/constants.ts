
export const VOUCHER_STATUSES = {
  ACTIVE: 'active',
  USED: 'used',
  EXPIRED: 'expired'
} as const;

export const MEMBER_STATUSES = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired'
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member'
} as const;

export const BANNER_TYPES = {
  TEXT: 'text',
  IMAGE: 'image'
} as const;

export const DEFAULT_COLORS = [
  'bg-red-500',
  'bg-orange-500', 
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500'
];

export const VALIDATION_RULES = {
  VOUCHER_CODE_LENGTH: 5,
  MIN_PASSWORD_LENGTH: 6,
  MAX_USERNAME_LENGTH: 50,
  MAX_BANNER_TITLE_LENGTH: 100
};
