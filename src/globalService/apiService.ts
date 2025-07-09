import { ApiEndpoints } from './types';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
  }

  // API endpoints configuration
  endpoints: ApiEndpoints = {
    auth: {
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      profile: '/auth/profile',
    },
    jobs: {
      search: '/jobs/search',
      getById: (id: string) => `/jobs/${id}`,
      bookmark: (id: string) => `/jobs/${id}/bookmark`,
      unbookmark: (id: string) => `/jobs/${id}/unbookmark`,
    },
    applications: {
      list: '/applications',
      create: '/applications',
      update: (id: string) => `/applications/${id}`,
      delete: (id: string) => `/applications/${id}`,
    },
    dashboard: {
      stats: '/dashboard/stats',
      recentActivity: '/dashboard/activity',
      analytics: '/dashboard/analytics',
    },
  };

  // Helper methods for common operations
  getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  // Environment-specific configurations
  getConfig() {
    return {
      baseUrl: this.baseUrl,
      environment: import.meta.env.MODE,
      apiVersion: 'v1',
    };
  }
}

export default new ApiService(); 