export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message: string;
  statusCode?: number;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  data?: any;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  success: boolean;
  message: string;
}

export interface ApiEndpoints {
  // Auth endpoints
  auth: {
    login: string;
    logout: string;
    refresh: string;
    profile: string;
  };
  // Job endpoints
  jobs: {
    search: string;
    getById: (id: string) => string;
    bookmark: (id: string) => string;
    unbookmark: (id: string) => string;
  };
  // Application endpoints
  applications: {
    list: string;
    create: string;
    update: (id: string) => string;
    delete: (id: string) => string;
  };
  // Dashboard endpoints
  dashboard: {
    stats: string;
    recentActivity: string;
    analytics: string;
  };
} 