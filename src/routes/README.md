# Routes

This folder contains route protection components for managing authenticated and non-authenticated user access.

## Components

### ProtectedRoute
Protects routes that require authentication. Shows the content only when user is authenticated.

**Props:**
- `children`: React nodes to render when authenticated
- `fallback`: Optional custom component to show when not authenticated

**Usage:**
```tsx
import { ProtectedRoute } from './routes';

<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>

// With custom fallback
<ProtectedRoute fallback={<CustomLoginPrompt />}>
  <ProfilePage />
</ProtectedRoute>
```

### UnprotectedRoute
For routes that should only be accessible when NOT authenticated (like login/signup pages).

**Props:**
- `children`: React nodes to render when not authenticated
- `redirectTo`: Optional redirect path when authenticated (defaults to '/dashboard')

**Usage:**
```tsx
import { UnprotectedRoute } from './routes';

<UnprotectedRoute>
  <LoginPage />
</UnprotectedRoute>

// With custom redirect
<UnprotectedRoute redirectTo="/home">
  <SignupPage />
</UnprotectedRoute>
```

## Setup with React Router

To use these components with React Router, first install the dependency:

```bash
npm install react-router-dom @types/react-router-dom
```

Then set up your routing in `App.tsx`:

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, UnprotectedRoute } from './routes';
import { LoginPage, DashboardPage, ProfilePage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        {/* Unprotected routes */}
        <Route 
          path="/login" 
          element={
            <UnprotectedRoute>
              <LoginPage />
            </UnprotectedRoute>
          } 
        />
        
        {/* Protected routes */}
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
        
        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## Authentication State

These components use the Redux auth state from `store/slices/authSlice.ts`:

- `isAuthenticated`: Boolean indicating if user is logged in
- `isLoading`: Boolean for loading states
- `user`: User object when authenticated
- `token`: Authentication token

## Features

- **Loading States**: Shows spinner while checking authentication
- **Automatic Redirects**: Redirects users based on authentication status
- **Custom Fallbacks**: Support for custom unauthorized/login components
- **TypeScript Support**: Fully typed with proper interfaces
- **Responsive Design**: Uses Tailwind CSS for responsive layouts

## Next Steps

1. Install React Router if you want to use proper routing
2. Create your page components in the `pages` directory
3. Replace the button redirects with proper React Router navigation
4. Add more route protection logic if needed (e.g., role-based access) 