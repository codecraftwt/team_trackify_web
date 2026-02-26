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
  Card,
  Divider,
  Snackbar,
  Box,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { resetPassword, clearError, clearMessage } from '../../redux/slices/authSlice';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  // Get auth state from Redux
  const { isLoading, error, success, message } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password', '');

  // Get email and OTP from location state
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

  // Handle success alert
  useEffect(() => {
    if (success && message) {
      setOpenSuccessAlert(true);
      const timer = setTimeout(() => {
        setOpenSuccessAlert(false);
        dispatch(clearMessage());
        navigate('/login', { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, message, dispatch, navigate]);

  // Clear messages on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    dispatch(clearError());
    dispatch(clearMessage());

    await dispatch(resetPassword({
      email: email,
      otp: otp,
      newPassword: data.password
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        px: 2,
      }}
    >
      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setOpenSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => {
            setOpenSuccessAlert(false);
            dispatch(clearMessage());
          }}
          sx={{ width: '100%', boxShadow: 3 }}
        >
          {message || 'Password reset successful! Redirecting to login...'}
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      {error && !success && (
        <Alert
          severity="error"
          onClose={() => dispatch(clearError())}
          sx={{ position: 'fixed', top: '100px', right: '20px', zIndex: 9999 }}
        >
          {typeof error === 'string' ? error : error?.message || 'Password reset failed'}
        </Alert>
      )}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
          {/* Logo and Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #0f766e, #0a5c55)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" color="white">
                    T
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold" color="#0f766e">
                  Team Trackify
                </Typography>
              </Box>
            </Link>
            <Typography variant="h5" fontWeight="700" color="#1e293b" gutterBottom>
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your new password below
            </Typography>
            <Typography variant="body2" sx={{ color: '#0f766e', fontWeight: 500, mt: 1 }}>
              For: {email}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* New Password */}
              <TextField
                fullWidth
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
                    message: 'Password must contain at least one letter and one number',
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading || openSuccessAlert}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#0f766e' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={isLoading || openSuccessAlert}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password */}
              <TextField
                fullWidth
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                disabled={isLoading || openSuccessAlert}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#0f766e' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        disabled={isLoading || openSuccessAlert}
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit Button */}
              <motion.div whileHover={{ scale: (isLoading || openSuccessAlert) ? 1 : 1.02 }} whileTap={{ scale: (isLoading || openSuccessAlert) ? 1 : 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading || openSuccessAlert}
                  endIcon={<SaveIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: '#0f766e',
                    '&:hover': { bgcolor: '#0a5c55' },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(15, 118, 110, 0.3)',
                    },
                  }}
                >
                  {isLoading ? 'Resetting...' : openSuccessAlert ? 'Password Reset!' : 'Reset Password'}
                </Button>
              </motion.div>
            </Box>
          </form>

          <Divider sx={{ my: 3 }} />

          {/* Links */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <Link
                to="/login"
                style={{
                  color: '#0f766e',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link
              to="/verify-otp"
              state={{ email: email }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              <ArrowBackIcon fontSize="small" />
              Back to OTP Verification
            </Link>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ResetPassword;