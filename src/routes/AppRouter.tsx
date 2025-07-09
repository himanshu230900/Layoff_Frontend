import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, UnprotectedRoute } from './index';

// Note: This is a demo component showing how to use the routes
// You'll need to install react-router-dom to use this properly:
// npm install react-router-dom @types/react-router-dom

// Example pages (you'll need to create these)
const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
      <p className="text-gray-600 text-center">Login form would go here</p>
    </div>
  </div>
);

const DashboardPage = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Protected dashboard content would go here</p>
      </div>
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">User profile content would go here</p>
      </div>
    </div>
  </div>
);

const AppRouter: React.FC = () => {
  // Uncomment this when you install react-router-dom
  /*
  return (
    <Router>
      <Routes>
        {/* Unprotected routes - accessible when not authenticated */}
        <Route 
          path="/login" 
          element={
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <UnprotectedRoute>
              <SignupPage />
            </UnprotectedRoute>
          } 
        />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
  */

  // Demo without react-router-dom
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Route Components Demo</h1>
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Protected Route Example</h2>
            <ProtectedRoute>
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-green-800">✅ This content is only visible when authenticated!</p>
              </div>
            </ProtectedRoute>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Unprotected Route Example</h2>
            <UnprotectedRoute>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-blue-800">🔓 This content is only visible when NOT authenticated!</p>
              </div>
            </UnprotectedRoute>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppRouter; 