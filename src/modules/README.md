# Modules

This directory contains the modular Redux store structure for the LayoffApp frontend. Each module encapsulates related functionality with its own slice, actions, and types.

## 🏗️ Architecture

```
src/modules/
├── auth/           # Authentication & user management
├── job/            # Job search & bookmarking
├── application/    # Job application tracking
├── dashboard/      # Dashboard analytics & data
└── index.ts        # Main export file
```

## 📦 Modules Overview

### 🔐 Auth Module (`/auth`)
Handles user authentication, login/logout, and user session management.

**Key Features:**
- Login/Logout with async API calls
- User state management
- Token handling (access & refresh)
- Authentication status tracking

**Usage:**
```tsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginAsync, logout } from '../modules/auth';

const LoginComponent = () => {
  const { isAuthenticated, isLoading, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = async (credentials) => {
    await dispatch(loginAsync(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };
};
```

### 💼 Job Module (`/job`)
Manages job listings, search, filtering, and bookmarking.

**Key Features:**
- Job search with filters
- Pagination support
- Job bookmarking
- Job details management
- Search history

**Usage:**
```tsx
import { fetchJobsAsync, setFilters, bookmarkJobAsync } from '../modules/job';

const JobSearchComponent = () => {
  const { jobs, isLoading, filters } = useAppSelector(state => state.job);
  const dispatch = useAppDispatch();

  const handleSearch = (filters) => {
    dispatch(setFilters(filters));
    dispatch(fetchJobsAsync({ filters }));
  };

  const handleBookmark = (jobId) => {
    dispatch(bookmarkJobAsync(jobId));
  };
};
```

### 📋 Application Module (`/application`)
Tracks job applications, their statuses, and related activities.

**Key Features:**
- Application submission
- Status tracking (applied, interview, rejected, etc.)
- Interview scheduling
- Application statistics
- Follow-up reminders

**Usage:**
```tsx
import { submitApplicationAsync, updateApplicationStatusAsync } from '../modules/application';

const ApplicationComponent = () => {
  const { applications, statistics } = useAppSelector(state => state.application);
  const dispatch = useAppDispatch();

  const handleSubmit = (applicationData) => {
    dispatch(submitApplicationAsync(applicationData));
  };

  const handleStatusUpdate = (applicationId, status) => {
    dispatch(updateApplicationStatusAsync({ applicationId, status }));
  };
};
```

### 📊 Dashboard Module (`/dashboard`)
Provides analytics, statistics, and dashboard-related data.

**Key Features:**
- Application statistics
- Recent activity tracking
- Upcoming events
- Job alerts
- Goal tracking

**Usage:**
```tsx
import { fetchDashboardDataAsync, createJobAlertAsync } from '../modules/dashboard';

const DashboardComponent = () => {
  const { data, isLoading } = useAppSelector(state => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDashboardDataAsync());
  }, [dispatch]);

  const handleCreateAlert = (alertData) => {
    dispatch(createJobAlertAsync(alertData));
  };
};
```

## 🚀 Usage Patterns

### 1. Basic Module Usage
```tsx
// Import specific actions
import { loginAsync } from '../modules/auth';
import { fetchJobsAsync } from '../modules/job';

// Use with dispatch
dispatch(loginAsync(credentials));
dispatch(fetchJobsAsync({ filters }));
```

### 2. Module Namespace Usage
```tsx
// Import entire module
import { Auth, Job } from '../modules';

// Use with namespaced actions
dispatch(Auth.loginAsync(credentials));
dispatch(Job.fetchJobsAsync({ filters }));
```

### 3. Type Usage
```tsx
// Import types
import type { User, Job, Application } from '../modules';

// Use in components
const user: User = useAppSelector(state => state.auth.user);
const jobs: Job[] = useAppSelector(state => state.job.jobs);
```

## 🔄 Store Integration

The global store automatically combines all module slices:

```tsx
// store/index.ts
export const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
    application: applicationSlice,
    dashboard: dashboardSlice,
  },
});
```

## 📝 Best Practices

### 1. Module Isolation
- Each module should be self-contained
- Avoid direct dependencies between modules
- Use the store as the communication layer

### 2. Naming Conventions
- Use descriptive action names: `fetchJobsAsync` vs `fetch`
- Prefix async actions with `Async`
- Use consistent naming across modules

### 3. Error Handling
- Always handle loading and error states
- Use consistent error message formats
- Implement proper error boundaries

### 4. Performance
- Use selectors for derived state
- Implement proper memoization
- Avoid unnecessary re-renders

## 🧪 Testing

Each module should have comprehensive tests:

```tsx
// auth/authSlice.test.ts
describe('Auth Slice', () => {
  it('should handle login success', () => {
    const user = { id: '1', email: 'test@example.com' };
    const action = loginSuccess({ user, token: 'token' });
    const state = authSlice.reducer(initialState, action);
    
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(user);
  });
});
```

## 🚀 Getting Started

1. **Import the hooks:**
```tsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
```

2. **Use in components:**
```tsx
const dispatch = useAppDispatch();
const state = useAppSelector(state => state.moduleName);
```

3. **Dispatch actions:**
```tsx
dispatch(actionName(payload));
```

4. **Handle async actions:**
```tsx
const handleAsync = async () => {
  const result = await dispatch(asyncAction(payload));
  if (result.meta.requestStatus === 'fulfilled') {
    // Success
  }
};
```

This modular structure provides a scalable, maintainable way to manage application state while keeping related functionality organized and easy to test. 