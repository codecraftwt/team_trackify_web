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
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { forgotPassword, clearError, clearMessage } from '../../redux/slices/authSlice';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Snackbar at top-right corner */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={2000}
        onClose={() => setOpenSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ marginTop: '80px' }}
      >
        <Alert 
          severity="success" 
          variant="filled"
          onClose={() => setOpenSuccessAlert(false)}
          sx={{ width: '100%', boxShadow: 3 }}
        >
          {message || 'OTP sent successfully! Redirecting to verification...'}
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          className="mb-6"
          onClose={() => dispatch(clearError())}
          sx={{ position: 'fixed', top: '80px', right: '20px', zIndex: 9999 }}
        >
          {typeof error === 'string' ? error : error?.message || 'Failed to send OTP'}
        </Alert>
      )}

      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Team Trackify</span>
          </Link>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Reset Your Password
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Enter your email and we'll send you an OTP to reset your password
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                autoFocus
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />

              <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  endIcon={<SendIcon />}
                  className="bg-primary-600 hover:bg-primary-700 py-3"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </Button>
              </motion.div>
            </form>

            <Divider className="my-6" />

            <div className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign in
                </Link>
              </Typography>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowBackIcon className="mr-2" fontSize="small" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;