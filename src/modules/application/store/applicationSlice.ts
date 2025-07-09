import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'under-review' | 'interview' | 'rejected' | 'accepted' | 'withdrawn';
  appliedAt: string;
  lastUpdated: string;
  notes?: string;
  resume?: {
    id: string;
    filename: string;
    url: string;
  };
  coverLetter?: string;
  interviewSchedule?: {
    date: string;
    time: string;
    type: 'phone' | 'video' | 'in-person';
    location?: string;
    interviewerName?: string;
    notes?: string;
  };
  followUpDate?: string;
  salary?: {
    offered: number;
    negotiated: number;
    currency: string;
  };
}

export interface ApplicationFilters {
  status?: Application['status'];
  company?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ApplicationState {
  applications: Application[];
  currentApplication: Application | null;
  filters: ApplicationFilters;
  statistics: {
    total: number;
    applied: number;
    underReview: number;
    interview: number;
    rejected: number;
    accepted: number;
    withdrawn: number;
  };
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}

// Initial state
const initialState: ApplicationState = {
  applications: [],
  currentApplication: null,
  filters: {},
  statistics: {
    total: 0,
    applied: 0,
    underReview: 0,
    interview: 0,
    rejected: 0,
    accepted: 0,
    withdrawn: 0,
  },
  isLoading: false,
  isSubmitting: false,
  error: null,
};

// Async thunks
export const fetchApplicationsAsync = createAsyncThunk(
  'application/fetchApplications',
  async (filters?: ApplicationFilters, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.company) queryParams.append('company', filters.company);
      if (filters?.dateRange?.start) queryParams.append('startDate', filters.dateRange.start);
      if (filters?.dateRange?.end) queryParams.append('endDate', filters.dateRange.end);

      const response = await fetch(`/api/applications?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch applications');
    }
  }
);

export const submitApplicationAsync = createAsyncThunk(
  'application/submitApplication',
  async (applicationData: {
    jobId: string;
    resumeId: string;
    coverLetter?: string;
    notes?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit application');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to submit application');
    }
  }
);

export const updateApplicationStatusAsync = createAsyncThunk(
  'application/updateStatus',
  async (params: { applicationId: string; status: Application['status']; notes?: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/applications/${params.applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: params.status, notes: params.notes }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update application status');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update application status');
    }
  }
);

export const scheduleInterviewAsync = createAsyncThunk(
  'application/scheduleInterview',
  async (params: { applicationId: string; interview: Application['interviewSchedule'] }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/applications/${params.applicationId}/interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.interview),
      });
      
      if (!response.ok) {
        throw new Error('Failed to schedule interview');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to schedule interview');
    }
  }
);

export const withdrawApplicationAsync = createAsyncThunk(
  'application/withdrawApplication',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) {
        throw new Error('Failed to withdraw application');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to withdraw application');
    }
  }
);

// Slice
const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<ApplicationFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentApplication: (state, action: PayloadAction<Application | null>) => {
      state.currentApplication = action.payload;
    },
    updateApplicationNotes: (state, action: PayloadAction<{ applicationId: string; notes: string }>) => {
      const { applicationId, notes } = action.payload;
      const applicationIndex = state.applications.findIndex(app => app.id === applicationId);
      if (applicationIndex !== -1) {
        state.applications[applicationIndex].notes = notes;
      }
      if (state.currentApplication?.id === applicationId) {
        state.currentApplication.notes = notes;
      }
    },
    setFollowUpDate: (state, action: PayloadAction<{ applicationId: string; date: string }>) => {
      const { applicationId, date } = action.payload;
      const applicationIndex = state.applications.findIndex(app => app.id === applicationId);
      if (applicationIndex !== -1) {
        state.applications[applicationIndex].followUpDate = date;
      }
      if (state.currentApplication?.id === applicationId) {
        state.currentApplication.followUpDate = date;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch applications
      .addCase(fetchApplicationsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplicationsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload.applications;
        state.statistics = action.payload.statistics;
        state.error = null;
      })
      .addCase(fetchApplicationsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Submit application
      .addCase(submitApplicationAsync.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitApplicationAsync.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.applications.unshift(action.payload);
        state.statistics.total += 1;
        state.statistics.applied += 1;
        state.error = null;
      })
      .addCase(submitApplicationAsync.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })
      // Update application status
      .addCase(updateApplicationStatusAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateApplicationStatusAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedApplication = action.payload;
        const applicationIndex = state.applications.findIndex(app => app.id === updatedApplication.id);
        if (applicationIndex !== -1) {
          const oldStatus = state.applications[applicationIndex].status;
          state.applications[applicationIndex] = updatedApplication;
          
          // Update statistics
          state.statistics[oldStatus] -= 1;
          state.statistics[updatedApplication.status] += 1;
        }
        if (state.currentApplication?.id === updatedApplication.id) {
          state.currentApplication = updatedApplication;
        }
        state.error = null;
      })
      .addCase(updateApplicationStatusAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Schedule interview
      .addCase(scheduleInterviewAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(scheduleInterviewAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedApplication = action.payload;
        const applicationIndex = state.applications.findIndex(app => app.id === updatedApplication.id);
        if (applicationIndex !== -1) {
          state.applications[applicationIndex] = updatedApplication;
        }
        if (state.currentApplication?.id === updatedApplication.id) {
          state.currentApplication = updatedApplication;
        }
        state.error = null;
      })
      .addCase(scheduleInterviewAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Withdraw application
      .addCase(withdrawApplicationAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(withdrawApplicationAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const withdrawnApplication = action.payload;
        const applicationIndex = state.applications.findIndex(app => app.id === withdrawnApplication.id);
        if (applicationIndex !== -1) {
          const oldStatus = state.applications[applicationIndex].status;
          state.applications[applicationIndex] = withdrawnApplication;
          
          // Update statistics
          state.statistics[oldStatus] -= 1;
          state.statistics.withdrawn += 1;
        }
        if (state.currentApplication?.id === withdrawnApplication.id) {
          state.currentApplication = withdrawnApplication;
        }
        state.error = null;
      })
      .addCase(withdrawApplicationAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setFilters,
  clearFilters,
  setCurrentApplication,
  updateApplicationNotes,
  setFollowUpDate,
  clearError,
} = applicationSlice.actions;

// Export reducer
export default applicationSlice.reducer; 