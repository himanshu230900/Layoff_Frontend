// Export all services from this file
export * from './api';
export * from './auth';
export * from './user';

// Base API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Common HTTP client configuration
export const httpClient = {
  get: async (url: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`);
    return response.json();
  },
  post: async (url: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  // Add more HTTP methods as needed
}; 