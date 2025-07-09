// Export the slice and its actions
export { default as jobSlice } from './jobSlice';
export {
  setFilters,
  clearFilters,
  setCurrentJob,
  setPagination,
  updateJobStatus,
  clearError,
  fetchJobsAsync,
  fetchJobByIdAsync,
  bookmarkJobAsync,
  unbookmarkJobAsync,
} from './jobSlice';

// Export types
export type {
  Job,
  JobFilters,
  JobState,
} from './jobSlice'; 