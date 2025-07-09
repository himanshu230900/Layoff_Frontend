import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError } from './types';

class HttpService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(url: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url, { params });
      return {
        data: response.data,
        success: true,
        message: 'Request successful',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data);
      return {
        data: response.data,
        success: true,
        message: 'Request successful',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<T>(url, data);
      return {
        data: response.data,
        success: true,
        message: 'Request successful',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.patch<T>(url, data);
      return {
        data: response.data,
        success: true,
        message: 'Request successful',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T = any>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<T>(url);
      return {
        data: response.data,
        success: true,
        message: 'Request successful',
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || 'Request failed',
        statusCode: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Network error - please check your connection',
        statusCode: 0,
      };
    } else {
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        statusCode: 0,
      };
    }
  }
}

export default new HttpService(); 