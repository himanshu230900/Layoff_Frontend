// Export all types from this file
export * from './api';
export * from './user';
export * from './common';
export * from './components';

// Store types
export type { RootState, AppDispatch } from '../store';

// Common utility types
export type ID = string | number;
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type APIResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isBookmarked: boolean;
  postedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  status: string;
  appliedAt: string;
  coverLetter?: string;
  resume?: string;
  notes?: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviews: number;
  offers: number;
  rejections: number;
} 