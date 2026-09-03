import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Snackbar,
  Box,
  alpha,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resetPassword, clearError, clearMessage } from '../../redux/slices/authSlice';
import AuthLayoutLeft from './AuthLayoutLeft';
import { ToastContainer, toast } from 'react-toastify';

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoading, error, success, message } = useSelector((state) => state.auth);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password', '');

  useEffect(() => {
    const stateEmail = location.state?.email;
    const stateOtp = location.state?.otp;
    if (stateEmail && stateOtp) {
      setEmail(stateEmail);
      setOtp(stateOtp);
    } else {
      navigate('/forgot-password', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (success && message) {
      toast.success(message || 'Password reset successful! Redirecting to login...');
      setOpenSuccessAlert(true);
      const timer = setTimeout(() => {
        setOpenSuccessAlert(false);
        dispatch(clearMessage());
        navigate('/login', { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, message, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(clearError());
    dispatch(clearMessage());
    toast.info('Resetting password...');
    const result = await dispatch(resetPassword({ email, otp, newPassword: data.password }));
    if (resetPassword.fulfilled.match(result)) {
      toast.success('Password reset successful! Redirecting to login...');
    } else {
      toast.error(result.payload?.message || 'Password reset failed. Please try again.');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : error?.message || 'Password reset failed');
    }
  }, [error]);



  return (
    <div className="h-screen flex w-full bg-white font-sans overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

      <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ mt: { xs: 7, sm: 8 } }}>
        <Alert severity="success" variant="filled" onClose={() => { setOpenSuccessAlert(false); dispatch(clearMessage()); }} sx={{ width: '100%', boxShadow: 3, fontSize: { xs: '0.75rem', sm: '0.8rem' }, py: 0.5 }}>
          {message || 'Password reset successful! Redirecting to login...'}
        </Alert>
      </Snackbar>

      {/* Left Column */}
      <AuthLayoutLeft />

      {/* Right Column (Form) */}
      <div className="w-1/2 flex flex-col items-center overflow-y-auto h-full bg-white py-8">
        <Box sx={{ maxWidth: 420, width: '100%', px: { xs: 3, sm: 5, lg: 6 }, py: { xs: 4, sm: 5 }, my: 'auto' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" fontWeight="800" sx={{ color: '#111827', mb: 1, fontSize: { xs: '1.5rem', sm: '1.75rem' }, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                Reset Password
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.82rem', sm: '0.88rem' }, lineHeight: 1.6, maxWidth: '85%', mx: 'auto' }}>
                Enter your new password below
              </Typography>
              {email && (
                <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 500, mt: 0.5, fontSize: '0.8rem', wordBreak: 'break-all' }}>
                  For: {email}
                </Typography>
              )}
            </Box>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>


                {/* New Password */}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mb: 1, display: 'block', fontSize: '0.9rem', textAlign: 'left' }}>New Password</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                      pattern: { value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/, message: 'Must contain at least one letter and one number' },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={isLoading || openSuccessAlert}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" disabled={isLoading || openSuccessAlert} size="small" sx={{ color: '#9ca3af', '&:hover': { color: theme.palette.primary.main }, mr: -0.5 }}>
                          {showPassword ? <VisibilityOffIcon sx={{ fontSize: 19 }} /> : <VisibilityIcon sx={{ fontSize: 19 }} />}
                        </IconButton>
                      </InputAdornment>,
                    }}
                    sx={{
                      '& .MuiInputBase-input': { fontSize: '1rem', fontWeight: 400, color: '#1a1a1a', padding: '14px 16px', '&::placeholder': { color: '#b3b3b3', opacity: 1 } },
                      '& .MuiOutlinedInput-root': { borderRadius: '6px', bgcolor: '#ffffff', transition: 'all 0.2s ease', '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' }, '&:hover fieldset': { borderColor: '#d1d5db' }, '&.Mui-focused fieldset': { borderColor: '#0b163f', borderWidth: '1px' } },
                      '& .MuiFormHelperText-root': { fontSize: '0.75rem', mt: 0.5, mx: 0 }
                    }}
                  />
                </Box>

                {/* Confirm Password */}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mb: 1, display: 'block', fontSize: '0.9rem', textAlign: 'left' }}>Confirm New Password</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="••••••••"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match',
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    disabled={isLoading || openSuccessAlert}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" disabled={isLoading || openSuccessAlert} size="small" sx={{ color: '#9ca3af', '&:hover': { color: theme.palette.primary.main }, mr: -0.5 }}>
                          {showConfirmPassword ? <VisibilityOffIcon sx={{ fontSize: 19 }} /> : <VisibilityIcon sx={{ fontSize: 19 }} />}
                        </IconButton>
                      </InputAdornment>,
                    }}
                    sx={{
                      '& .MuiInputBase-input': { fontSize: '1rem', fontWeight: 400, color: '#1a1a1a', padding: '14px 16px', '&::placeholder': { color: '#b3b3b3', opacity: 1 } },
                      '& .MuiOutlinedInput-root': { borderRadius: '6px', bgcolor: '#ffffff', transition: 'all 0.2s ease', '& fieldset': { borderColor: '#e5e7eb', borderWidth: '1px' }, '&:hover fieldset': { borderColor: '#d1d5db' }, '&.Mui-focused fieldset': { borderColor: '#0b163f', borderWidth: '1px' } },
                      '& .MuiFormHelperText-root': { fontSize: '0.75rem', mt: 0.5, mx: 0 }
                    }}
                  />
                </Box>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: (isLoading || openSuccessAlert) ? 1 : 1.015 }} whileTap={{ scale: (isLoading || openSuccessAlert) ? 1 : 0.985 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading || openSuccessAlert}
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
                      '&.Mui-disabled': { background: alpha(theme.palette.primary.main, 0.45), color: '#ffffff' },
                    }}
                  >
                    {isLoading ? 'Resetting...' : openSuccessAlert ? 'Password Reset!' : 'Reset Password'}
                  </Button>
                </motion.div>
              </Box>
            </form>

            {/* OR Divider */}
            <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#e5e7eb' } }}>
              <Typography variant="caption" sx={{ color: '#9ca3af', px: 1.5, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.5px' }}>OR</Typography>
            </Divider>

            {/* Sign in link */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.82rem' }}>
                Remember your password?{' '}
                <Link to="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 600 }}>
                  Sign in
                </Link>
              </Typography>
            </Box>

            {/* Back to OTP */}
            <Box sx={{ textAlign: 'center' }}>
              <Link
                to="/verify-otp"
                state={{ email }}
                style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.78rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.primary.main)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <ArrowBackIcon sx={{ fontSize: 14 }} />
                Back to OTP Verification
              </Link>
            </Box>
          </motion.div>
        </Box>
      </div>
    </div>
  );
};

export default ResetPassword;