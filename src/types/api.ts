
// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

// Voucher Types
export interface Voucher {
  id: string;
  code: string;
  type: string;
  duration: number;
  price: number;
  status: 'active' | 'used' | 'expired';
  createdAt: string;
  usedAt?: string;
  userId?: string;
}

export interface VoucherLoginRequest {
  code: string;
  macAddress?: string;
  ipAddress?: string;
}

// Member Types
export interface Member {
  id: string;
  username: string;
  email: string;
  package: string;
  status: 'active' | 'suspended' | 'expired';
  expiryDate: string;
  createdAt: string;
}

export interface MemberLoginRequest {
  username: string;
  password: string;
  macAddress?: string;
  ipAddress?: string;
}

// Settings Types
export interface SiteSettings {
  siteName: string;
  siteTitle: string;
  pageTitle: string;
  description: string;
  welcomeMessage: string;
  contactPhone: string;
  contactAddress: string;
  adminEmail: string;
}

export interface BannerSettings {
  banners: Array<{
    id: string;
    type: 'text' | 'image';
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    bgColor?: string;
    isActive: boolean;
  }>;
  autoSlide: boolean;
  slideInterval: number;
}
