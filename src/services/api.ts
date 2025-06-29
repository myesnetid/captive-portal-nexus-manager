
import { APP_CONFIG } from '@/config/app';
import type { 
  ApiResponse, 
  LoginRequest, 
  LoginResponse, 
  VoucherLoginRequest, 
  MemberLoginRequest, 
  Voucher, 
  Member,
  SiteSettings,
  BannerSettings
} from '@/types/api';

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = APP_CONFIG.apiUrl;
    this.token = localStorage.getItem('admin_token');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Authentication
  async adminLogin(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.token = response.data.token;
      localStorage.setItem('admin_token', this.token);
    }

    return response;
  }

  async adminLogout(): Promise<void> {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  // Voucher Authentication
  async voucherLogin(request: VoucherLoginRequest): Promise<ApiResponse<any>> {
    return this.request('/auth/voucher/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Member Authentication
  async memberLogin(request: MemberLoginRequest): Promise<ApiResponse<any>> {
    return this.request('/auth/member/login', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  // Voucher Management
  async getVouchers(): Promise<ApiResponse<Voucher[]>> {
    return this.request('/vouchers');
  }

  async createVouchers(type: string, count: number): Promise<ApiResponse<Voucher[]>> {
    return this.request('/vouchers', {
      method: 'POST',
      body: JSON.stringify({ type, count }),
    });
  }

  async deleteVoucher(id: string): Promise<ApiResponse> {
    return this.request(`/vouchers/${id}`, {
      method: 'DELETE',
    });
  }

  // Member Management
  async getMembers(): Promise<ApiResponse<Member[]>> {
    return this.request('/members');
  }

  async createMember(member: Partial<Member>): Promise<ApiResponse<Member>> {
    return this.request('/members', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async updateMember(id: string, updates: Partial<Member>): Promise<ApiResponse<Member>> {
    return this.request(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteMember(id: string): Promise<ApiResponse> {
    return this.request(`/members/${id}`, {
      method: 'DELETE',
    });
  }

  // Settings
  async getSiteSettings(): Promise<ApiResponse<SiteSettings>> {
    return this.request('/settings/site');
  }

  async updateSiteSettings(settings: SiteSettings): Promise<ApiResponse<SiteSettings>> {
    return this.request('/settings/site', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  async getBannerSettings(): Promise<ApiResponse<BannerSettings>> {
    return this.request('/settings/banner');
  }

  async updateBannerSettings(settings: BannerSettings): Promise<ApiResponse<BannerSettings>> {
    return this.request('/settings/banner', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // File Upload
  async uploadBannerImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request('/upload/banner', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData
      } as any,
    });
  }
}

export const apiService = new ApiService();
