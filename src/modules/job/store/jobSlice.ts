import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits?: string[];
  remote: boolean;
  experienceLevel: 'entry' | 'mid' | 'senior';
  postedAt: string;
  applicationDeadline?: string;
  companyLogo?: string;
  isBookmarked?: boolean;
  applicationStatus?: 'not-applied' | 'applied' | 'interview' | 'rejected' | 'accepted';
}

export interface JobFilters {
  search?: string;
  location?: string;
  type?: Job['type'];
  experienceLevel?: Job['experienceLevel'];
  remote?: boolean;
  salaryRange?: {
    min: number;
    max: number;
  };
}

export interface JobState {
  jobs: Job[];
  bookmarkedJobs: Job[];
  currentJob: Job | null;
  filters: JobFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  isBookmarking: boolean;
  error: string | null;
}

// Initial state
const initialState: JobState = {
  jobs: [],
  bookmarkedJobs: [],
  currentJob: null,
  filters: {},
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  isBookmarking: false,
  error: null,
};

// Async thunks
export const fetchJobsAsync = createAsyncThunk(
  'job/fetchJobs',
  async (params: { filters?: JobFilters; page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.filters?.search) queryParams.append('search', params.filters.search);
      if (params.filters?.location) queryParams.append('location', params.filters.location);
      if (params.filters?.type) queryParams.append('type', params.filters.type);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await fetch(`/api/jobs?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch jobs');
    }
  }
);

export const fetchJobByIdAsync = createAsyncThunk(
  'job/fetchJobById',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch job');
    }
  }
);

export const bookmarkJobAsync = createAsyncThunk(
  'job/bookmarkJob',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/bookmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to bookmark job');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to bookmark job');
    }
  }
);

export const unbookmarkJobAsync = createAsyncThunk(
  'job/unbookmarkJob',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}/bookmark`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to unbookmark job');
      }
      
      return { jobId };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to unbookmark job');
    }
  }
);

// Slice
const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<JobFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentJob: (state, action: PayloadAction<Job | null>) => {
      state.currentJob = action.payload;
    },
    setPagination: (state, action: PayloadAction<Partial<JobState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    updateJobStatus: (state, action: PayloadAction<{ jobId: string; status: Job['applicationStatus'] }>) => {
      const { jobId, status } = action.payload;
      const jobIndex = state.jobs.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        state.jobs[jobIndex].applicationStatus = status;
      }
      if (state.currentJob?.id === jobId) {
        state.currentJob.applicationStatus = status;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload.jobs;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
        state.error = null;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch job by ID
      .addCase(fetchJobByIdAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobByIdAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentJob = action.payload;
        state.error = null;
      })
      .addCase(fetchJobByIdAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Bookmark job
      .addCase(bookmarkJobAsync.pending, (state) => {
        state.isBookmarking = true;
      })
      .addCase(bookmarkJobAsync.fulfilled, (state, action) => {
        state.isBookmarking = false;
        const job = action.payload;
        state.bookmarkedJobs.push(job);
        
        // Update job in jobs array
        const jobIndex = state.jobs.findIndex(j => j.id === job.id);
        if (jobIndex !== -1) {
          state.jobs[jobIndex].isBookmarked = true;
        }
      })
      .addCase(bookmarkJobAsync.rejected, (state, action) => {
        state.isBookmarking = false;
        state.error = action.payload as string;
      })
      // Unbookmark job
      .addCase(unbookmarkJobAsync.pending, (state) => {
        state.isBookmarking = true;
      })
      .addCase(unbookmarkJobAsync.fulfilled, (state, action) => {
        state.isBookmarking = false;
        const { jobId } = action.payload;
        state.bookmarkedJobs = state.bookmarkedJobs.filter(job => job.id !== jobId);
        
        // Update job in jobs array
        const jobIndex = state.jobs.findIndex(j => j.id === jobId);
        if (jobIndex !== -1) {
          state.jobs[jobIndex].isBookmarked = false;
        }
      })
      .addCase(unbookmarkJobAsync.rejected, (state, action) => {
        state.isBookmarking = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setFilters,
  clearFilters,
  setCurrentJob,
  setPagination,
  updateJobStatus,
  clearError,
} = jobSlice.actions;

// Export reducer
export default jobSlice.reducer; 