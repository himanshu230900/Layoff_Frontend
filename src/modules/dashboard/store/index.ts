// Export the slice and its actions
export { default as dashboardSlice } from './dashboardSlice';
export {
  setStatistics,
  updateStatistics,
  setGoals,
  updateGoal,
  setJobAlerts,
  addJobAlert,
  removeJobAlert,
  setActivityFeed,
  addActivity,
  setLoading,
  setError,
  clearError,
  fetchStatisticsAsync,
  fetchGoalsAsync,
  updateGoalAsync,
  createGoalAsync,
  deleteGoalAsync,
  fetchJobAlertsAsync,
  createJobAlertAsync,
  deleteJobAlertAsync,
  fetchActivityFeedAsync,
} from './dashboardSlice';

// Export types
export type {
  Statistics,
  Goal,
  JobAlert,
  Activity,
  DashboardState,
} from './dashboardSlice'; 