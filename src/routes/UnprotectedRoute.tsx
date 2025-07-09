import React from 'react';
import { useAppSelector } from '../store/hooks';

interface UnprotectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authenticated, show redirect message (in a real app, this would redirect)
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Already Logged In
          </h2>
          <p className="text-gray-600 mb-6">
            You are already authenticated. Redirecting to dashboard...
          </p>
          <button 
            onClick={() => window.location.href = redirectTo} 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // If not authenticated, render children (login/signup forms)
  return <>{children}</>;
};

export default UnprotectedRoute; 