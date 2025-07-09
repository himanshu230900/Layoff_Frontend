import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Types
export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviewsScheduled: number;
  offers: number;
  rejections: number;
  responseRate: number;
  avgResponseTime: number; // in days
  applicationTrends: {
    period: string;
    count: number;
  }[];
}

export interface RecentActivity {
  id: string;
  type: 'application' | 'interview' | 'response' | 'offer' | 'rejection';
  title: string;
  company: string;
  date: string;
  description: string;
  status?: string;
}

export interface UpcomingEvent {
  id: string;
  type: 'interview' | 'follow-up' | 'deadline' | 'networking';
  title: string;
  company?: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface JobAlert {
  id: string;
  query: string;
  location?: string;
  type?: string;
  salary?: {
    min: number;
    max: number;
  };
  isActive: boolean;
  createdAt: string;
  lastChecked: string;
  newJobsCount: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: RecentActivity[];
  upcomingEvents: UpcomingEvent[];
  jobAlerts: JobAlert[];
  quickActions: {
    id: string;
    title: string;
    description: string;
    icon: string;
    action: string;
    count?: number;
  }[];
  goals: {
    id: string;
    title: string;
    target: number;
    current: number;
    period: 'daily' | 'weekly' | 'monthly';
    type: 'applications' | 'interviews' | 'networking' | 'skill-building';
  }[];
}

export interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastUpdated?: string;
  selectedPeriod: 'week' | 'month' | 'quarter' | 'year';
}

// Initial state
const initialState: DashboardState = {
  data: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
  selectedPeriod: 'month',
};

// Async thunks
export const fetchDashboardDataAsync = createAsyncThunk(
  'dashboard/fetchData',
  async (period: 'week' | 'month' | 'quarter' | 'year' = 'month', { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/dashboard?period=${period}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch dashboard data');
    }
  }
);

export const refreshDashboardAsync = createAsyncThunk(
  'dashboard/refresh',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { dashboard: DashboardState };
      const period = state.dashboard.selectedPeriod;
      
      const response = await fetch(`/api/dashboard?period=${period}&refresh=true`);
      
      if (!response.ok) {
        throw new Error('Failed to refresh dashboard data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh dashboard data');
    }
  }
);

export const createJobAlertAsync = createAsyncThunk(
  'dashboard/createJobAlert',
  async (alertData: Omit<JobAlert, 'id' | 'createdAt' | 'lastChecked' | 'newJobsCount'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/job-alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create job alert');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create job alert');
    }
  }
);

export const updateJobAlertAsync = createAsyncThunk(
  'dashboard/updateJobAlert',
  async (params: { alertId: string; updates: Partial<JobAlert> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/job-alerts/${params.alertId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update job alert');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update job alert');
    }
  }
);

export const deleteJobAlertAsync = createAsyncThunk(
  'dashboard/deleteJobAlert',
  async (alertId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/job-alerts/${alertId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete job alert');
      }
      
      return { alertId };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete job alert');
    }
  }
);

export const createGoalAsync = createAsyncThunk(
  'dashboard/createGoal',
  async (goalData: Omit<DashboardData['goals'][0], 'id' | 'current'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create goal');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create goal');
    }
  }
);

export const updateGoalAsync = createAsyncThunk(
  'dashboard/updateGoal',
  async (params: { goalId: string; updates: Partial<DashboardData['goals'][0]> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/goals/${params.goalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update goal');
    }
  }
);

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<'week' | 'month' | 'quarter' | 'year'>) => {
      state.selectedPeriod = action.payload;
    },
    markEventAsCompleted: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.upcomingEvents = state.data.upcomingEvents.filter(event => event.id !== action.payload);
      }
    },
    dismissActivity: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.recentActivity = state.data.recentActivity.filter(activity => activity.id !== action.payload);
      }
    },
    updateGoalProgress: (state, action: PayloadAction<{ goalId: string; progress: number }>) => {
      if (state.data) {
        const { goalId, progress } = action.payload;
        const goalIndex = state.data.goals.findIndex(goal => goal.id === goalId);
        if (goalIndex !== -1) {
          state.data.goals[goalIndex].current = progress;
        }
      }
    },
    clearNewJobsCount: (state, action: PayloadAction<string>) => {
      if (state.data) {
        const alertIndex = state.data.jobAlerts.findIndex(alert => alert.id === action.payload);
        if (alertIndex !== -1) {
          state.data.jobAlerts[alertIndex].newJobsCount = 0;
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dashboard data
      .addCase(fetchDashboardDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchDashboardDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Refresh dashboard
      .addCase(refreshDashboardAsync.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshDashboardAsync.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.data = action.payload;
        state.lastUpdated = new Date().toISOString();
        state.error = null;
      })
      .addCase(refreshDashboardAsync.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
      })
      // Create job alert
      .addCase(createJobAlertAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createJobAlertAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.data) {
          state.data.jobAlerts.push(action.payload);
        }
        state.error = null;
      })
      .addCase(createJobAlertAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update job alert
      .addCase(updateJobAlertAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateJobAlertAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.data) {
          const alertIndex = state.data.jobAlerts.findIndex(alert => alert.id === action.payload.id);
          if (alertIndex !== -1) {
            state.data.jobAlerts[alertIndex] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateJobAlertAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete job alert
      .addCase(deleteJobAlertAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteJobAlertAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.data) {
          state.data.jobAlerts = state.data.jobAlerts.filter(alert => alert.id !== action.payload.alertId);
        }
        state.error = null;
      })
      .addCase(deleteJobAlertAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create goal
      .addCase(createGoalAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGoalAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.data) {
          state.data.goals.push(action.payload);
        }
        state.error = null;
      })
      .addCase(createGoalAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update goal
      .addCase(updateGoalAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGoalAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.data) {
          const goalIndex = state.data.goals.findIndex(goal => goal.id === action.payload.id);
          if (goalIndex !== -1) {
            state.data.goals[goalIndex] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateGoalAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setPeriod,
  markEventAsCompleted,
  dismissActivity,
  updateGoalProgress,
  clearNewJobsCount,
  clearError,
} = dashboardSlice.actions;

// Export reducer
export default dashboardSlice.reducer; 