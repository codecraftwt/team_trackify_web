import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  Card,
  Divider,
  Snackbar,
  Box,
  useTheme,
  alpha,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { forgotPassword, clearError, clearMessage } from '../../redux/slices/authSlice';
import Logo from '../../assets/logo31.png';
import { FaFacebookF } from 'react-icons/fa';
import AuthLayoutLeft from './AuthLayoutLeft';


const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // Get auth state from Redux
  const { isLoading, error, success, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  // Reset form and clear messages on component mount
  useEffect(() => {
    reset();
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch, reset]);

  // Handle success and redirect to OTP page with email in state
  useEffect(() => {
    if (success && message && submittedEmail) {
      setOpenSuccessAlert(true);

      // Show success alert for 2 seconds then redirect
      const timer = setTimeout(() => {
        setOpenSuccessAlert(false);
        dispatch(clearMessage());
        console.log('Redirecting to OTP page with email:', submittedEmail);

        // Navigate to OTP page with email in state
        navigate('/verify-otp', {
          state: { email: submittedEmail },
          replace: true
        });
      }, 2000);

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
  }, [success, message, submittedEmail, dispatch, navigate]);

  // Clear messages when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    // Clear previous states
    dispatch(clearError());
    dispatch(clearMessage());

    const result = await dispatch(forgotPassword(data.email));
    if (forgotPassword.fulfilled.match(result)) {
      // Store email in local state for navigation
      setSubmittedEmail(data.email);
      console.log('OTP sent successfully to:', data.email);
    }
  };

  return (
    <div className="h-screen flex w-full bg-white font-sans overflow-hidden">
      {/* Success Snackbar at top-right corner */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={2000}
        onClose={() => setOpenSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: { xs: 7, sm: 8 } }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpenSuccessAlert(false)}
          sx={{
            width: '100%',
            boxShadow: 3,
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            py: 0.5,
          }}
        >
          {message || 'OTP sent successfully! Redirecting to verification...'}
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          onClose={() => dispatch(clearError())}
          sx={{
            position: 'fixed',
            top: { xs: '70px', sm: '80px' },
            right: { xs: '10px', sm: '20px' },
            zIndex: 9999,
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            py: 0.5,
            maxWidth: { xs: '90%', sm: '400px' },
          }}
        >
          {typeof error === 'string' ? error : error?.message || 'Failed to send OTP'}
        </Alert>
      )}

      {/* Left Column (Graphics) */}
      <AuthLayoutLeft />

      {/* Right Column (Form) */}
      <div className="w-1/2 flex flex-col items-center overflow-y-auto h-full bg-white py-8">
        <Box sx={{ maxWidth: 420, width: '100%', px: { xs: 3, sm: 5, lg: 6 }, py: { xs: 4, sm: 5 }, my: 'auto' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                fontWeight="800"
                sx={{ color: '#111827', mb: 1, fontSize: { xs: '1.5rem', sm: '1.75rem' }, letterSpacing: '-0.5px', lineHeight: 1.2 }}
              >
                Reset Your Password
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#6b7280', fontSize: { xs: '0.82rem', sm: '0.88rem' }, lineHeight: 1.6, maxWidth: '85%', mx: 'auto' }}
              >
                Enter your email and we'll send you an OTP to reset your password
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-full mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mb: 1, display: 'block', fontSize: '0.9rem', textAlign: 'left' }}>Email Address</Typography>
                    <TextField
                      fullWidth
                      type="email"
                      autoFocus
                      placeholder="you@example.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      variant="outlined"
                      disabled={isLoading}
                      sx={{
                        '& .MuiInputBase-input': { fontSize: '1rem', fontWeight: 400, color: '#1a1a1a', padding: '14px 16px', '&::placeholder': { color: '#b3b3b3', opacity: 1 } },
                        '& .MuiOutlinedInput-root': { borderRadius: '6px', bgcolor: '#ffffff', transition: 'all 0.2s ease', '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' }, '&:hover fieldset': { borderColor: '#d1d5db' }, '&.Mui-focused fieldset': { borderColor: '#0b163f', borderWidth: '1px' } },
                        '& .MuiFormHelperText-root': { fontSize: '0.75rem', mt: 0.5, mx: 0 }
                      }}
                    />
                  </Box>

                  <motion.div whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      endIcon={isLoading && <CircularProgress size={16} sx={{ color: 'white' }} />}
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
                      {isLoading ? 'Sending...' : 'Send OTP'}
                    </Button>
                  </motion.div>
                </Box>
              </form>

              <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#e5e7eb' } }}>
                <Typography variant="caption" sx={{ color: '#9ca3af', px: 1.5, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.5px' }}>
                  OR
                </Typography>
              </Divider>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.82rem' }}>
                  Remember your password?{' '}
                  <Link to="/login" style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}>
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </div>

            <Box sx={{ mt: 2.5, textAlign: 'center' }}>
              <Link
                to="/"
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '0.78rem',
                  transition: 'color 0.2s',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.primary.main)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <ArrowBackIcon sx={{ fontSize: 14 }} />
                Back to home
              </Link>
            </Box>
          </motion.div>
        </Box>
      </div>
    </div>
  );
};

export default ForgotPassword;