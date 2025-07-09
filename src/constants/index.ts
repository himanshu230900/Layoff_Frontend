// Application constants
export const APP_NAME = 'Layoff Frontend';
export const APP_VERSION = '1.0.0';

// API constants
export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  PROFILE: '/profile',
} as const;

// UI constants
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  THEME: 'theme_preference',
} as const;

// Common regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
} as const; 