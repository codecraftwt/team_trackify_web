import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Button,
  Typography,
  Alert,
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
import AuthLayoutLeft from './AuthLayoutLeft';
import { ToastContainer, toast } from 'react-toastify';

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

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoading, error, success, message } = useSelector((state) => state.auth);

  useEffect(() => {
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    } else {
      navigate('/forgot-password', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  useEffect(() => {
    if (success && message) {
      setOpenSuccessAlert(true);
      const t = setTimeout(() => {
        setOpenSuccessAlert(false);
        dispatch(clearMessage());
        navigate('/reset-password', { state: { email, otp: otp.join('') }, replace: true });
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [success, message, email, otp, dispatch, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
      dispatch(clearMessage());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(typeof error === 'string' ? error : error?.message || 'Verification failed');
    }
  }, [error]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputRefs.current[index - 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const pastedOtp = pastedData.split('');
    const newOtp = [...otp];
    pastedOtp.forEach((value, index) => { if (index < 6) newOtp[index] = value; });
    setOtp(newOtp);
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

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }
    dispatch(clearError());
    dispatch(clearMessage());
    toast.info('Verifying OTP...');
    const result = await dispatch(verifyOTP({ email, otp: otpString }));
    if (verifyOTP.fulfilled.match(result)) {
      toast.success('OTP verified successfully! Redirecting...');
    } else {
      toast.error(result.payload?.message || 'Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="h-screen flex w-full bg-white font-sans overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

      <Snackbar open={openSuccessAlert} autoHideDuration={1500} onClose={() => setOpenSuccessAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ mt: { xs: 7, sm: 8 } }}>
        <Alert severity="success" variant="filled" onClose={() => setOpenSuccessAlert(false)} sx={{ width: '100%', boxShadow: 3, fontSize: { xs: '0.75rem', sm: '0.8rem' }, py: 0.5 }}>
          {message || 'OTP verified! Redirecting...'}
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
                Verify OTP
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: { xs: '0.82rem', sm: '0.88rem' }, lineHeight: 1.6, maxWidth: '85%', mx: 'auto' }}>
                Enter the 6-digit code sent to
              </Typography>
              {email && (
                <Typography variant="body2" fontWeight="600" sx={{ color: theme.palette.primary.main, mt: 0.5, fontSize: '0.85rem', wordBreak: 'break-all' }}>
                  {email}
                </Typography>
              )}
            </Box>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

              {/* OTP Boxes */}
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#1a1a1a', mb: 1, display: 'block', fontSize: '0.9rem', textAlign: 'left' }}>
                  Enter 6-digit OTP
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 1.5 } }}>
                  {otp.map((digit, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        width: { xs: 44, sm: 52 },
                        height: { xs: 52, sm: 60 },
                        border: '1px solid',
                        borderColor: error ? '#ef4444' : '#e5e7eb',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        backgroundColor: '#ffffff',
                        '&:hover': {
                          borderColor: error ? '#ef4444' : '#d1d5db',
                        },
                        '&:focus-within': {
                          borderColor: '#0b163f',
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
                          fontWeight: 500,
                          outline: 'none',
                          border: 'none',
                          color: '#1a1a1a',
                          backgroundColor: 'transparent',
                        }}
                      />
                    </Paper>
                  ))}
                </Box>
              </Box>

              {/* Timer / Resend */}
              <Box sx={{ textAlign: 'center' }}>
                {!canResend ? (
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.8rem' }}>
                    Resend OTP in{' '}
                    <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>{timer}s</Box>
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    sx={{
                      color: theme.palette.primary.main,
                      '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      py: 0.5,
                    }}
                  >
                    Resend OTP
                  </Button>
                )}
              </Box>

              {/* Verify Button */}
              <motion.div whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isLoading || otp.join('').length !== 6 || openSuccessAlert}
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
                  {isLoading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={16} sx={{ color: 'white' }} />
                      <span>Verifying...</span>
                    </Box>
                  ) : openSuccessAlert ? 'Verified!' : 'Verify OTP'}
                </Button>
              </motion.div>
            </Box>

            {/* OR Divider */}
            <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#e5e7eb' } }}>
              <Typography variant="caption" sx={{ color: '#9ca3af', px: 1.5, fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.5px' }}>OR</Typography>
            </Divider>

            {/* Didn't receive code */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.82rem' }}>
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
                    fontSize: '0.82rem',
                    color: canResend && !isLoading ? theme.palette.primary.main : '#9ca3af',
                    '&:hover': { textDecoration: canResend && !isLoading ? 'underline' : 'none' },
                  }}
                >
                  Resend
                </Box>
              </Typography>
            </Box>

            {/* Back link */}
            <Box sx={{ textAlign: 'center' }}>
              <Link
                to="/forgot-password"
                style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.78rem', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.primary.main)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                <ArrowBackIcon sx={{ fontSize: 14 }} />
                Back to Forgot Password
              </Link>
            </Box>
          </motion.div>
        </Box>
      </div>
    </div>
  );
};

export default VerifyOTP;