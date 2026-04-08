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
      // console.log('OTP sent successfully to:', data.email);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
      }}
    >
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

      <Box sx={{ maxWidth: 400, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              {/* <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
                <Box
                  sx={{
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" color="white" sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
                    T
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontSize: { xs: '1.1rem', sm: '1.2rem' }
                  }}
                >
                  Team Trackify
                </Typography>
              </Box> */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  component="img"
                  src={Logo}
                  alt="Company Logo"
                  sx={{
                    height: { xs: '28px', sm: '32px', md: '36px' },
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: 0.8
                  }}
                />
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.main, fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
                  Team Trackify
                </Typography>
              </Box>
            </Link>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                color: 'text.primary',
                mb: 0.5,
                fontSize: { xs: '1.3rem', sm: '1.5rem' }
              }}
            >
              Reset Your Password
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', sm: '0.8rem' }
              }}
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
          <Card sx={{
            p: { xs: 2, sm: 2.5 },
            boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: { xs: 2, sm: 2.5 },
          }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
                  size="small"
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiFormHelperText-root': {
                      fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />

                <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    fullWidth
                    disabled={isLoading}
                    endIcon={isLoading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <SendIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: 'white',
                      py: { xs: 1, sm: 1.2 },
                      borderRadius: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      },
                      '&.Mui-disabled': {
                        background: alpha(theme.palette.primary.main, 0.5),
                      },
                    }}
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </Button>
                </motion.div>
              </Box>
            </form>

            <Divider sx={{
              my: { xs: 2, sm: 2.5 },
              borderColor: alpha(theme.palette.primary.main, 0.1)
            }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  px: 1,
                  fontSize: { xs: '0.65rem', sm: '0.7rem' }
                }}
              >
                OR
              </Typography>
            </Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }}
              >
                Remember your password?{' '}
                <Link to="/login" style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Card>

          <Box sx={{ mt: 2.5, textAlign: 'center' }}>
            <Link
              to="/"
              style={{
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                transition: 'color 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
              onMouseLeave={(e) => e.currentTarget.style.color = theme.palette.text.secondary}
            >
              <ArrowBackIcon sx={{ fontSize: 14 }} />
              Back to home
            </Link>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ForgotPassword;