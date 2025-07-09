import { configureStore } from '@reduxjs/toolkit';

// Import all module slices
import authSlice from '../modules/auth/store/authSlice';
import jobSlice from '../modules/job/store/jobSlice';
import applicationSlice from '../modules/application/store/applicationSlice';
import dashboardSlice from '../modules/dashboard/store/dashboardSlice';

// Configure the global store with all module slices
export const store = configureStore({
  reducer: {
    // Authentication module
    auth: authSlice,
    
    // Job management module
    job: jobSlice,
    
    // Application tracking module
    application: applicationSlice,
    
    // Dashboard analytics module
    dashboard: dashboardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          // Add any other actions that might contain non-serializable values
        ],
        ignoredPaths: [
          // Add any state paths that might contain non-serializable values
        ],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export individual module actions for easy access
export { default as authActions } from '../modules/auth/store/authSlice';
export { default as jobActions } from '../modules/job/store/jobSlice';
export { default as applicationActions } from '../modules/application/store/applicationSlice';
export { default as dashboardActions } from '../modules/dashboard/store/dashboardSlice';

// Export async thunks for easy access
export {
  loginAsync,
  logoutAsync,
} from '../modules/auth/store/authSlice';

export {
  fetchJobsAsync,
  fetchJobByIdAsync,
  bookmarkJobAsync,
  unbookmarkJobAsync,
} from '../modules/job/store/jobSlice';

export {
  fetchApplicationsAsync,
  submitApplicationAsync,
  updateApplicationStatusAsync,
  scheduleInterviewAsync,
  withdrawApplicationAsync,
} from '../modules/application/store/applicationSlice';

export {
  fetchDashboardDataAsync,
  refreshDashboardAsync,
  createJobAlertAsync,
  updateJobAlertAsync,
  deleteJobAlertAsync,
  createGoalAsync,
  updateGoalAsync,
} from '../modules/dashboard/store/dashboardSlice';

// Export module types for use in components
export type {
  User,
  AuthState,
} from '../modules/auth/store/authSlice';

export type {
  Job,
  JobFilters,
  JobState,
} from '../modules/job/store/jobSlice';

export type {
  Application,
  ApplicationFilters,
  ApplicationState,
} from '../modules/application/store/applicationSlice';

export type {
  DashboardStats,
  RecentActivity,
  UpcomingEvent,
  JobAlert,
  DashboardData,
  DashboardState,
} from '../modules/dashboard/store/dashboardSlice';

// Helper function to get the current state
export const getState = () => store.getState();

// Helper function to dispatch actions
export const dispatch = store.dispatch;

// Export the store as default
export default store; 