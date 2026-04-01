import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { theme } from './theme';
import ProtectedRoute from './components/common/ProtectedRoute';
import ScrollToTop from './components/common/ScrollToTop';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

// Authentication Pages
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import VerifyOTP from './pages/Authentication/VerifyOTP';
import ResetPassword from './pages/Authentication/ResetPassword.jsx';

// Admin Pages (role_id: 1)
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserManagement from './pages/Admin/UserManagement';
import PaymentsPlan from './pages/Admin/PaymentsPlan';
import Reports from './pages/Admin/Reports';
import AdminProfile from './pages/Admin/Profile';

// Super Admin Pages (role_id: 2)
import SuperAdminDashboard from './pages/SuperAdmin/SuperAdminDashboard';
import OrganizationDetails from './pages/SuperAdmin/OrganizationDetails';
import RevenueAnalytics from './pages/SuperAdmin/RevenueManagement';
import PlanManagement from './pages/SuperAdmin/PlanManagement';
import ContactList from './pages/SuperAdmin/ContactList';
import SuperAdminProfile from './pages/SuperAdmin/ProfileManagement';
import TransactionHistory from './pages/Admin/TransactionHistory';
import AddUser from './pages/Admin/component/AddUser';
import ResetPasswordProfile from './components/common/ResetPasswordProfile.jsx';
import TrackingData from './pages/TrackingData.jsx';
import Locations from './pages/Locations.jsx';
import ListUsers from './pages/SuperAdmin/Listusers.jsx';
import ActiveUserLocations from './pages/Admin/ActiveUserLocations.jsx';
import ExpiringPlansPage from './pages/SuperAdmin/Expiringplanspage.jsx';
import PrivacyPolicy from './components/layout/PrivacyPolicy.jsx';
import CouponManagement from './pages/SuperAdmin/CouponManagement.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 99999 }}
      />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />

            {/* Authentication Routes */}
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute requireAuth={false}>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify-otp"
              element={
                <ProtectedRoute requireAuth={false}>
                  <VerifyOTP />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute requireAuth={false}>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
         

            {/* Protected Routes with Dashboard Layout */}
            <Route element={<ProtectedRoute requireAuth={true} />}>
              <Route element={<DashboardLayout />}>
                {/* Admin Routes (role_id: 1) - Note: these are children of DashboardLayout */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/user" element={<UserManagement />} />
                <Route path="/admin/payments-plans" element={<PaymentsPlan />} />
                <Route path="/admin/transactionhistory" element={<TransactionHistory />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/profile" element={<AdminProfile />} />
                <Route path="/admin/add-User" element={<AddUser />} />
                <Route path="/reset-password-profile" element={<ResetPasswordProfile />} />
                
                <Route path="/trackingdata" element={<TrackingData />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/admin/live-locations" element={<ActiveUserLocations />} />
                


                {/* <Route path="/admin/add-admin" element={<AddUser />} />  */}

                {/* Super Admin Routes (role_id: 2) - Note: these are children of DashboardLayout */}
                <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
                <Route path="/super-admin/organization" element={<OrganizationDetails />} />
                <Route path="/super-admin/revenue" element={<RevenueAnalytics />} />
                <Route path="/super-admin/plans" element={<PlanManagement />} />
                <Route path="/super-admin/contacts" element={<ContactList />} />
                <Route path="/list-users/:adminId" element={<ListUsers />} />
                <Route path="/admin/expiringplanspage" element={<ExpiringPlansPage />} />
                <Route path="/super-admin/couponmanagment" element={<CouponManagement />} />

                {/* <Route path="/super-admin/profile" element={<SuperAdminProfile />} /> */}
              </Route>
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;