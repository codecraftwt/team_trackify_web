// // src/components/common/ProtectedRoute.jsx
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ children, requireAuth = true }) => {
//   const { isAuthenticated, user, role_id } = useSelector((state) => state.auth);
  
//   console.log('ProtectedRoute - Auth State:', { isAuthenticated, user, role_id });

//   // Check if user is authenticated
//   if (requireAuth && !isAuthenticated) {
//     console.log('Not authenticated, redirecting to login');
//     return <Navigate to="/login" replace />;
//   }

//   if (!requireAuth && isAuthenticated) {
//     // If route is for non-authenticated users and user is authenticated
//     if (role_id === 2) {
//       return <Navigate to="/super-admin/dashboard" replace />;
//     } else if (role_id === 1) {
//       return <Navigate to="/admin/dashboard" replace />;
//     }
//   }

//   return children || <Outlet />;
// };

// export default ProtectedRoute;


import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, user, role_id } = useSelector((state) => state.auth);

  // ✅ FIX 1: Also check localStorage token as fallback
  // Redux state is null on first render even if token exists in localStorage
  const token = localStorage.getItem('token');
  const localUser = JSON.parse(localStorage.getItem('user') || 'null');

  // Use Redux state if available, otherwise fall back to localStorage
  const isAuth = isAuthenticated || !!token;
  
  // ✅ FIX 2: role_id from API is a STRING "1" or "2" — use Number() to compare
  const rawRoleId = role_id ?? localUser?.role_id;
  const roleIdNum = Number(rawRoleId);

  // Not authenticated → redirect to login
  if (requireAuth && !isAuth) {
    // console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Already authenticated → redirect away from guest-only routes (login, register)
  if (!requireAuth && isAuth) {
    if (roleIdNum === 2) {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else if (roleIdNum === 1) {
      // ✅ FIX 3: Check if there's a pending plan — if so, go to payments-plans
      const pendingPlan = sessionStorage.getItem('selectedPlan');
      if (pendingPlan) {
        return <Navigate to="/admin/payments-plans" replace />;
      }
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children || <Outlet />;
};

export default ProtectedRoute;