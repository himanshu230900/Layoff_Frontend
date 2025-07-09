import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { 
  loginAsync, 
  logoutAsync, 
  logout, 
  clearError,
  updateUser,
  setToken,
  setRefreshToken
} from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth);

  // Login function
  const login = useCallback(async (credentials: { email: string; password: string }) => {
    return await dispatch(loginAsync(credentials));
  }, [dispatch]);

  // Logout function
  const handleLogout = useCallback(async () => {
    if (authState.token) {
      await dispatch(logoutAsync());
    } else {
      dispatch(logout());
    }
  }, [dispatch, authState.token]);

  // Clear error function
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Update user function
  const updateUserInfo = useCallback((userData: Partial<typeof authState.user>) => {
    dispatch(updateUser(userData));
  }, [dispatch]);

  // Set token function
  const setAuthToken = useCallback((token: string) => {
    dispatch(setToken(token));
  }, [dispatch]);

  // Set refresh token function
  const setAuthRefreshToken = useCallback((refreshToken: string) => {
    dispatch(setRefreshToken(refreshToken));
  }, [dispatch]);

  return {
    // State
    ...authState,
    
    // Actions
    login,
    logout: handleLogout,
    clearError: clearAuthError,
    updateUser: updateUserInfo,
    setToken: setAuthToken,
    setRefreshToken: setAuthRefreshToken,
    
    // Computed values
    isLoggedIn: authState.isAuthenticated,
    hasError: !!authState.error,
  };
}; 