import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Card,
  Divider,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { toast, ToastContainer } from 'react-toastify';
import { loginUser, clearError, clearMessage, logout } from '../../redux/slices/authSlice';
import Logo from '../../assets/logo31.png';
import { FaFacebookF } from 'react-icons/fa';
import AuthLayoutLeft from './AuthLayoutLeft';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const hasRedirected = useRef(false);

  const returnUrl = searchParams.get('returnUrl');

  const [pendingPlan] = useState(() => {
    if (location.state?.selectedPlan) {
      return location.state.selectedPlan;
    }
    const stored = sessionStorage.getItem('selectedPlan');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [fromPricing] = useState(() => {
    if (location.state?.fromPricing !== undefined) {
      return location.state.fromPricing;
    }
    const stored = sessionStorage.getItem('fromPricing');
    return stored === 'true';
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoading, error, isAuthenticated, message, user, role_id, success } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Persist plan to sessionStorage on mount
  useEffect(() => {
    if (pendingPlan) {
      sessionStorage.setItem('selectedPlan', JSON.stringify(pendingPlan));
      sessionStorage.setItem('fromPricing', String(fromPricing));
    }
  }, [pendingPlan, fromPricing]);

  // Reset form on mount
  useEffect(() => {
    reset();
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch, reset]);

  useEffect(() => {
    // Use a locally computed roleId consistently
    const effectiveRole = role_id ?? user?.role_id;
    const roleIdNum = (effectiveRole !== null && effectiveRole !== undefined) ? Number(effectiveRole) : null;

    // ⛔ Check for auth status
    if (!isAuthenticated && !localStorage.getItem('token')) {
      return;
    }

    // Double check if we have a valid role
    if (roleIdNum === null || !user) {
      return;
    }

    // Block role 0 and 3 users
    if (roleIdNum === 0 || roleIdNum === 3) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
      toast.error('Access denied: Users with this role are not allowed to log in.');
      return;
    }

    if (hasRedirected.current) {
      return;
    }

    // Determine redirect path
    let currentPlan = pendingPlan;
    if (!currentPlan) {
      const stored = sessionStorage.getItem('selectedPlan');
      if (stored) {
        try { currentPlan = JSON.parse(stored); } catch (e) { currentPlan = null; }
      }
    }

    let redirectPath = null;
    if (returnUrl) {
      redirectPath = returnUrl;
    } else if (roleIdNum === 2) {
      redirectPath = '/super-admin/dashboard';
    } else if (roleIdNum === 1 || roleIdNum === 3 || roleIdNum === 0) {
      if (roleIdNum === 1 && currentPlan) {
        redirectPath = '/admin/payments-plans';
      } else {
        redirectPath = '/admin/dashboard';
      }
    }

    if (!redirectPath) {
      console.warn("⚠️ No redirect path for role:", roleIdNum);
      return;
    }

    hasRedirected.current = true;

    // 🔔 ONLY SHOW TOAST IF WE JUST LOGGED IN (not on auto-redirect)
    const wasJustLoggedIn = success === true;

    if (wasJustLoggedIn) {
      toast.success(message || 'Login successful!');
      setTimeout(() => {
        dispatch(clearMessage());
        navigate(redirectPath, { replace: true });
      }, 1500);
    } else {
      // 💨 SILENT REDIRECT for already-authenticated users
      navigate(redirectPath, { replace: true });
    }

  }, [isAuthenticated, user, role_id, success, navigate, dispatch, pendingPlan, message, returnUrl]);

  // Error alert handler
  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : error?.message || 'Login failed');
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      const inputStyles = {
        '& .MuiInputBase-root': {
          backgroundColor: '#f3f4f6',
          borderRadius: '12px',
          border: '1px solid transparent',
          transition: 'all 0.3s ease',
          paddingRight: '12px',
          '&.Mui-focused': {
            backgroundColor: '#ffffff',
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
          },
          '&:hover': {
            backgroundColor: '#e5e7eb',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiInputBase-input': {
          padding: '16px 14px',
          fontSize: '0.95rem',
          fontWeight: 500,
          color: '#1f2937',
          '&::placeholder': {
            color: '#9ca3af',
            opacity: 1,
          },
        },
      };

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    dispatch(clearError());
    dispatch(clearMessage());
    hasRedirected.current = false;
    await dispatch(loginUser(data));
  };

  return (
    <div className="h-screen flex w-full bg-white font-sans overflow-hidden">
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
        theme="light"
      />
      {/* Plan info banner */}
      {pendingPlan && !isAuthenticated && fromPricing && (
        <Alert
          severity="info"
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 9999,
            borderRadius: 2,
            fontSize: '0.75rem',
            maxWidth: 300,
            boxShadow: 3
          }}
        >
          <strong>Complete your purchase!</strong><br />
          You're about to purchase <strong>{pendingPlan.name}</strong> plan.<br />
          <small>Price: ₹{pendingPlan.price} / {pendingPlan.duration}</small>
        </Alert>
      )}

      {/* Left Column (Graphics) */}
      <AuthLayoutLeft />

      {/* Right Column (Form) */}
      <div className="w-1/2 flex flex-col items-center overflow-y-auto h-full bg-white py-8">
        <Box sx={{ maxWidth: 420, width: '100%', px: { xs: 3, sm: 5, lg: 6 }, py: { xs: 4, sm: 5 }, my: 'auto' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>


              <Typography
                variant="h4"
                fontWeight="800"
                sx={{ color: '#111827', mb: 1, fontSize: { xs: '1.5rem', sm: '1.75rem' }, letterSpacing: '-0.5px', lineHeight: 1.2 }}
              >
                Log in to Team Trackify.
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#6b7280', fontSize: { xs: '0.82rem', sm: '0.88rem' }, lineHeight: 1.6, maxWidth: '85%', mx: 'auto' }}
              >
                Welcome back! Login with your data that you entered during registration.
              </Typography>
            </Box>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

                {/* Email */}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mb: 1, display: 'block', fontSize: '0.9rem', textAlign: 'left' }}>Email Address</Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="you@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant="outlined"
                    disabled={isLoading}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: '#1a1a1a',
                        padding: '14px 16px',
                        '&::placeholder': {
                          color: '#b3b3b3',
                          opacity: 1,
                        }
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        bgcolor: '#ffffff',
                        transition: 'all 0.2s ease',
                        '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' },
                        '&:hover fieldset': { borderColor: '#d1d5db' },
                        '&.Mui-focused fieldset': { borderColor: '#0b163f', borderWidth: '1px' },
                      },
                      '& .MuiFormHelperText-root': { fontSize: '0.75rem', mt: 0.5, mx: 0 },
                    }}
                  />
                </Box>

                {/* Password */}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mb: 1, display: 'block', fontSize: '0.9rem', textAlign: 'left' }}>Password</Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 4, message: 'Password must be at least 4 characters' },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    variant="outlined"
                    disabled={isLoading}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            disabled={isLoading}
                            sx={{ color: '#9ca3af', '&:hover': { color: theme.palette.primary.main }, mr: -0.5 }}
                            size="small"
                          >
                            {showPassword ? <VisibilityOffIcon sx={{ fontSize: 19 }} /> : <VisibilityIcon sx={{ fontSize: 19 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '1rem',
                        fontWeight: 400,
                        color: '#1a1a1a',
                        padding: '14px 16px',
                        '&::placeholder': {
                          color: '#b3b3b3',
                          opacity: 1,
                        }
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '6px',
                        bgcolor: '#ffffff',
                        transition: 'all 0.2s ease',
                        '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' },
                        '&:hover fieldset': { borderColor: '#d1d5db' },
                        '&.Mui-focused fieldset': { borderColor: '#0b163f', borderWidth: '1px' },
                      },
                      '& .MuiFormHelperText-root': { fontSize: '0.75rem', mt: 0.5, mx: 0 },
                    }}
                  />
                </Box>

                {/* Forgot Password */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
                  <Link
                    to="/forgot-password"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                {/* Sign In Button */}
                <motion.div whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: '#ffffff',
                      py: 1.4,
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      letterSpacing: '0.3px',
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                      textTransform: 'none',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
                      },
                      '&.Mui-disabled': {
                        background: alpha(theme.palette.primary.main, 0.45),
                        color: '#ffffff',
                      },
                    }}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </motion.div>
              </Box>
            </form>

            {/* OR Divider */}
            <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#e5e7eb' } }}>
              <Typography variant="caption" sx={{ color: '#9ca3af', px: 1.5, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.5px' }}>
                OR
              </Typography>
            </Divider>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.82rem' }}>
                Don't have an account?{' '}
                <Link
                  to={returnUrl ? `/register?returnUrl=${encodeURIComponent(returnUrl)}` : '/register'}
                  state={{ selectedPlan: pendingPlan, fromPricing: fromPricing }}
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {/* <PersonAddIcon sx={{ fontSize: 14 }} /> */}
                  Sign up now
                </Link>
              </Typography>
            </Box>

            {/* Back to Home */}
            <Box sx={{ textAlign: 'center' }}>
              <Link
                to="/"
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.primary.main)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                ← Back to home
              </Link>
            </Box>
          </motion.div>
        </Box>
      </div>
    </div>
  );
};

export default Login;