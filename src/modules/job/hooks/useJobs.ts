import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { 
  fetchJobsAsync, 
  fetchJobByIdAsync, 
  bookmarkJobAsync, 
  unbookmarkJobAsync,
  setFilters, 
  clearFilters,
  setCurrentJob,
  setPagination,
  updateJobStatus,
  clearError
} from '../store/jobSlice';
import { JobFilters } from '../store/jobSlice';

export const useJobs = () => {
  const dispatch = useAppDispatch();
  const jobState = useAppSelector(state => state.job);

  // Fetch jobs
  const fetchJobs = useCallback(async (params?: { 
    filters?: JobFilters; 
    page?: number; 
    limit?: number; 
  }) => {
    return await dispatch(fetchJobsAsync(params || {}));
  }, [dispatch]);

  // Fetch job by ID
  const fetchJobById = useCallback(async (jobId: string) => {
    return await dispatch(fetchJobByIdAsync(jobId));
  }, [dispatch]);

  // Bookmark job
  const bookmarkJob = useCallback(async (jobId: string) => {
    return await dispatch(bookmarkJobAsync(jobId));
  }, [dispatch]);

  // Remove bookmark
  const removeBookmark = useCallback(async (jobId: string) => {
    return await dispatch(unbookmarkJobAsync(jobId));
  }, [dispatch]);

  // Set search filters
  const setSearchFilters = useCallback((filters: JobFilters) => {
    dispatch(setFilters(filters));
  }, [dispatch]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  // Set current job
  const setCurrentJobData = useCallback((job: typeof jobState.currentJob) => {
    dispatch(setCurrentJob(job));
  }, [dispatch]);

  // Update pagination
  const updatePagination = useCallback((pagination: Partial<typeof jobState.pagination>) => {
    dispatch(setPagination(pagination));
  }, [dispatch]);

  // Update job application status
  const updateJobApplicationStatus = useCallback((jobId: string, status: any) => {
    dispatch(updateJobStatus({ jobId, status }));
  }, [dispatch]);

  // Clear error
  const clearJobError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Search jobs with current filters
  const searchJobs = useCallback(async (additionalFilters?: JobFilters) => {
    const filters = additionalFilters || jobState.filters;
    return await fetchJobs({ filters, page: 1 });
  }, [fetchJobs, jobState.filters]);

  // Load more jobs (pagination)
  const loadMoreJobs = useCallback(async () => {
    const nextPage = jobState.pagination.page + 1;
    return await fetchJobs({ 
      filters: jobState.filters, 
      page: nextPage,
      limit: jobState.pagination.limit
    });
  }, [fetchJobs, jobState.filters, jobState.pagination]);

  // Refresh jobs
  const refreshJobs = useCallback(async () => {
    return await fetchJobs({ 
      filters: jobState.filters, 
      page: 1,
      limit: jobState.pagination.limit
    });
  }, [fetchJobs, jobState.filters, jobState.pagination.limit]);

  return {
    // State
    ...jobState,
    
    // Actions
    fetchJobs,
    fetchJobById,
    bookmarkJob,
    removeBookmark,
    setFilters: setSearchFilters,
    clearFilters: clearAllFilters,
    setCurrentJob: setCurrentJobData,
    updatePagination,
    updateJobStatus: updateJobApplicationStatus,
    clearError: clearJobError,
    
    // Computed actions
    searchJobs,
    loadMoreJobs,
    refreshJobs,
    
    // Computed values
    hasJobs: jobState.jobs.length > 0,
    hasMore: jobState.pagination.page < jobState.pagination.totalPages,
    isEmpty: jobState.jobs.length === 0 && !jobState.isLoading,
    hasError: !!jobState.error,
    hasFilters: Object.keys(jobState.filters).length > 0,
    bookmarkedJobIds: jobState.bookmarkedJobs.map(job => job.id),
  };
}; 