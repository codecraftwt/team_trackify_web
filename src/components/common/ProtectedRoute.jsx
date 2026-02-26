// src/components/common/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, user, role_id } = useSelector((state) => state.auth);
  
  console.log('ProtectedRoute - Auth State:', { isAuthenticated, user, role_id });

  // Check if user is authenticated
  if (requireAuth && !isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // If route is for non-authenticated users and user is authenticated
    if (role_id === 2) {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else if (role_id === 1) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children || <Outlet />;
};

export default ProtectedRoute;