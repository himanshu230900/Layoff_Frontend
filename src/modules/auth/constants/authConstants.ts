// API Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password',
  CHANGE_PASSWORD: '/api/auth/change-password',
  VERIFY_EMAIL: '/api/auth/verify-email',
  CURRENT_USER: '/api/auth/me',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  SESSION_EXPIRY: 'session_expiry',
  REMEMBER_ME: 'remember_me',
  LAST_LOGIN: 'last_login',
} as const;

// Auth Status
export const AUTH_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
} as const;

// User Roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

// Auth Error Messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  ACCOUNT_LOCKED: 'Account is temporarily locked',
  EMAIL_NOT_VERIFIED: 'Please verify your email address',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to access this resource',
  FORBIDDEN: 'Access denied',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_EXISTS: 'Email address is already in use',
  WEAK_PASSWORD: 'Password is too weak',
  INVALID_TOKEN: 'Invalid or expired token',
} as const;

// Auth Success Messages
export const AUTH_SUCCESS = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGOUT_SUCCESS: 'Successfully logged out',
  REGISTRATION_SUCCESS: 'Account created successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_VERIFIED: 'Email verified successfully',
  RESET_EMAIL_SENT: 'Password reset email sent',
  PASSWORD_RESET: 'Password reset successfully',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Please enter a valid email address',
    MAX_LENGTH: 254,
  },
  PASSWORD: {
    REQUIRED: 'Password is required',
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    WEAK: 'Password must contain at least 8 characters with uppercase, lowercase, and number',
    MISMATCH: 'Passwords do not match',
  },
  NAME: {
    REQUIRED: 'Name is required',
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    INVALID: 'Name can only contain letters and spaces',
  },
} as const;

// Session Configuration
export const SESSION_CONFIG = {
  DEFAULT_EXPIRY: 30, // minutes
  EXTENDED_EXPIRY: 24 * 60, // 24 hours
  REFRESH_THRESHOLD: 5, // minutes before expiry to refresh
  MAX_IDLE_TIME: 60, // minutes
} as const;

// Auth Form Types
export const AUTH_FORM_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
  CHANGE_PASSWORD: 'change-password',
} as const;

// Auth Events
export const AUTH_EVENTS = {
  LOGIN_START: 'auth/login/start',
  LOGIN_SUCCESS: 'auth/login/success',
  LOGIN_FAILURE: 'auth/login/failure',
  LOGOUT: 'auth/logout',
  TOKEN_REFRESH: 'auth/token/refresh',
  SESSION_EXPIRED: 'auth/session/expired',
  UNAUTHORIZED: 'auth/unauthorized',
} as const;

// Password Strength Levels
export const PASSWORD_STRENGTH = {
  WEAK: 'weak',
  MEDIUM: 'medium',
  STRONG: 'strong',
} as const;

// Social Login Providers
export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
} as const;

// Auth Theme Colors
export const AUTH_COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6',
} as const;

// Auth Component Sizes
export const AUTH_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
} as const;

// Auth Modal Types
export const AUTH_MODAL_TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  CONFIRM_LOGOUT: 'confirm-logout',
  SESSION_EXPIRED: 'session-expired',
} as const;

// Auth Routes
export const AUTH_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;

// Auth Loading States
export const AUTH_LOADING_STATES = {
  LOGIN: 'login',
  REGISTER: 'register',
  LOGOUT: 'logout',
  REFRESH: 'refresh',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
} as const; 