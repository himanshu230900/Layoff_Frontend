export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
} as const;

export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  APPLIED: 'applied',
  UNDER_REVIEW: 'under_review',
  INTERVIEW_SCHEDULED: 'interview_scheduled',
  REJECTED: 'rejected',
  OFFER_RECEIVED: 'offer_received',
  WITHDRAWN: 'withdrawn',
} as const;

export const JOB_TYPES = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  FREELANCE: 'freelance',
  INTERNSHIP: 'internship',
} as const; 