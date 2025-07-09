// Export the slice and its actions
export { default as authSlice } from './authSlice';
export {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  updateUser,
  setToken,
  setRefreshToken,
  setUser,
  loginAsync,
  logoutAsync,
} from './authSlice';

// Export types
export type {
  User,
  AuthState,
} from './authSlice'; 