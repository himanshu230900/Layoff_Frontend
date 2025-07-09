// Export the slice and its actions
export { default as applicationSlice } from './applicationSlice';
export {
  setApplications,
  addApplication,
  updateApplication,
  removeApplication,
  updateApplicationStatus,
  setFilters,
  clearFilters,
  setCurrentApplication,
  clearError,
  fetchApplicationsAsync,
  fetchApplicationByIdAsync,
  submitApplicationAsync,
  updateApplicationStatusAsync,
  deleteApplicationAsync,
} from './applicationSlice';

// Export types
export type {
  Application,
  ApplicationFilters,
  ApplicationState,
} from './applicationSlice'; 