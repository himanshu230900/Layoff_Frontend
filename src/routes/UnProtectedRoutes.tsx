import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts';

// Import screens from modules
import { LoginScreen } from '@/modules/auth';

const UnProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {/* Auth Routes */}
        <Route path="login" element={<LoginScreen />} />
        <Route index element={<Navigate to="/login" replace />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default UnProtectedRoutes; 