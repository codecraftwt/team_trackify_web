import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Button,
  Typography,
  Alert,
  Card,
  Divider,
  Box,
  Paper,
  Snackbar,
  useTheme,
  alpha,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { verifyOTP, clearError, clearMessage, forgotPassword } from '../../redux/slices/authSlice';
import Logo from '../../assets/logo31.png';
import { ToastContainer,toast  } from 'react-toastify';

const VerifyOTP = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // Get auth state from Redux
  const { isLoading, error, success, message, otpVerified } = useSelector((state) => state.auth);

  // Get email from location state
  useEffect(() => {
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      // If no email in state, redirect back to forgot password
      navigate('/forgot-password', { replace: true });
    }
  }, [location, navigate]);

  // Timer for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // Handle OTP verification success
  // useEffect(() => {
  //   if (success && message) {
  //     setOpenSuccessAlert(true);

  //     const timer = setTimeout(() => {
  //       setOpenSuccessAlert(false);
  //       dispatch(clearMessage());

  //       // Navigate to reset password with email and OTP in state
  //       navigate('/reset-password', {
  //         state: {
  //           email: email,
  //           otp: otp.join('')
  //         },
  //         replace: true
  //       });
  //     }, 1500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [success, message, email, otp, dispatch, navigate]);
  // Handle OTP verification success
  useEffect(() => {
    if (success && message) {
      setOpenSuccessAlert(true);

      const timer = setTimeout(() => {
        setOpenSuccessAlert(false);
        dispatch(clearMessage());

        navigate('/reset-password', {
          state: {
            email: email,
            otp: otp.join('')
          },
          replace: true
        });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success, message, email, otp, dispatch, navigate]);
  // Clear messages on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : error?.message || 'Verification failed');
    }
  }, [error]);
  const handleChange = (index, value) => {
    // Allow only numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.split('');
    const newOtp = [...otp];

    pastedOtp.forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });

    setOtp(newOtp);

    // Focus the next empty input or last input
    const lastFilledIndex = Math.min(pastedOtp.length, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleResendOTP = async () => {
    if (canResend && email) {
      dispatch(clearError());
      dispatch(clearMessage());
      toast.info('Resending verification code...');

      const result = await dispatch(forgotPassword(email));
      if (forgotPassword.fulfilled.match(result)) {
        toast.success('New OTP sent to your email');
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
      } else {
        toast.error(result.payload?.message || 'Failed to resend OTP');
      }
    }
  };

  // const handleSubmit = async () => {
  //   const otpString = otp.join('');
  //   if (otpString.length !== 6) {
  //      toast.error('Please enter complete 6-digit OTP');
  //     return;
  //   }

  //   dispatch(clearError());
  //   dispatch(clearMessage());
  //     toast.info('Verifying OTP...');


  //   await dispatch(verifyOTP({
  //     email: email,
  //     otp: otpString
  //   }));
  // };
  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }

    dispatch(clearError());
    dispatch(clearMessage());
    toast.info('Verifying OTP...');

    const result = await dispatch(verifyOTP({
      email: email,
      otp: otpString
    }));

    if (verifyOTP.fulfilled.match(result)) {
      toast.success('OTP verified successfully! Redirecting...');
    } else {
      toast.error(result.payload?.message || 'Invalid OTP. Please try again.');
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
      />
      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={1500}
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
          {message || 'OTP verified! Redirecting...'}
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
          {typeof error === 'string' ? error : error?.message || 'Verification failed'}
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
              Verify OTP
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', sm: '0.8rem' }
              }}
            >
              Enter the 6-digit code sent to
            </Typography>
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                color: theme.palette.primary.main,
                mt: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.85rem' },
                wordBreak: 'break-all',
              }}
            >
              {email}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* OTP Input Boxes */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 1.5,
                    textAlign: 'center',
                    fontSize: { xs: '0.75rem', sm: '0.8rem' }
                  }}
                >
                  Enter 6-digit OTP
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.8, sm: 1 } }}>
                  {otp.map((digit, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        width: { xs: 40, sm: 44 },
                        height: { xs: 48, sm: 52 },
                        border: '2px solid',
                        borderColor: error ? 'error.main' : alpha(theme.palette.primary.main, 0.2),
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        transition: 'border-color 0.2s',
                        '&:focus-within': {
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        disabled={isLoading || openSuccessAlert}
                        style={{
                          width: '100%',
                          height: '100%',
                          textAlign: 'center',
                          fontSize: isMobile ? '1.2rem' : '1.3rem',
                          fontWeight: 600,
                          outline: 'none',
                          border: 'none',
                          color: theme.palette.text.primary,
                          backgroundColor: 'transparent',
                        }}
                      />
                    </Paper>
                  ))}
                </Box>
              </Box>

              {/* Timer and Resend */}
              <Box sx={{ textAlign: 'center' }}>
                {!canResend ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' }
                    }}
                  >
                    Resend OTP in <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 500, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>{timer}s</Box>
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    sx={{
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      },
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      py: 0.5,
                    }}
                  >
                    Resend OTP
                  </Button>
                )}
              </Box>

              {/* Verify Button */}
              <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isLoading || otp.join('').length !== 6 || openSuccessAlert}
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
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={16} sx={{ color: 'white' }} />
                      <span>Verifying...</span>
                    </Box>
                  ) : openSuccessAlert ? 'Verified!' : 'Verify OTP'}
                </Button>
              </motion.div>
            </Box>

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
                Didn't receive the code?{' '}
                <Box
                  component="button"
                  onClick={handleResendOTP}
                  disabled={!canResend || isLoading}
                  sx={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    cursor: canResend && !isLoading ? 'pointer' : 'not-allowed',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    color: canResend && !isLoading ? theme.palette.primary.main : theme.palette.text.disabled,
                    '&:hover': {
                      color: canResend && !isLoading ? theme.palette.primary.dark : theme.palette.text.disabled,
                      textDecoration: canResend && !isLoading ? 'underline' : 'none',
                    },
                  }}
                >
                  Resend
                </Box>
              </Typography>
            </Box>
          </Card>

          <Box sx={{ mt: 2.5, textAlign: 'center' }}>
            <Link
              to="/forgot-password"
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
              Back to Forgot Password
            </Link>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default VerifyOTP;