import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // User must be logged in
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged-in users shouldn't access public-only pages (like login)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

