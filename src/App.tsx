import { useEffect } from 'react';
import { ProtectedRoutes, UnProtectedRoutes } from '@/routes';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { LoadingSpinner } from '@/components';
import { setUser } from '@/modules/auth';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector(state => state.auth);

  useEffect(() => {
    // Check for stored authentication on app load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('access_token');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
      }
    }
  }, [dispatch]);

  // Show loading spinner during authentication check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render appropriate routes based on authentication status
  return (
    <main className="min-h-screen bg-gray-50">
      {isAuthenticated && user ? (
        <ProtectedRoutes />
      ) : (
        <UnProtectedRoutes />
      )}
    </main>
  );
}

export default App;

