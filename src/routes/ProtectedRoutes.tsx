import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/layouts';

// Import screens from modules
import { DashboardScreen } from '@/modules/dashboard';
import { JobSearchScreen } from '@/modules/job';
import { ApplicationsScreen } from '@/modules/application';

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        {/* Dashboard Routes */}
        <Route index element={<DashboardScreen />} />
        <Route path="dashboard" element={<DashboardScreen />} />
        
        {/* Job Routes */}
        <Route path="jobs" element={<JobSearchScreen />} />
        <Route path="jobs/search" element={<JobSearchScreen />} />
        
        {/* Application Routes */}
        <Route path="applications" element={<ApplicationsScreen />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default ProtectedRoutes; 