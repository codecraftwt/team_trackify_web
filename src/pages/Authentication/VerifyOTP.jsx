// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import {
//   Button,
//   Typography,
//   Alert,
//   Card, 
//   Divider,
//   Box,
//   Paper,
//   Snackbar,
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { verifyOTP, clearError, clearMessage, forgotPassword } from '../../redux/slices/authSlice';

// const VerifyOTP = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
//   const [email, setEmail] = useState('');
//   const inputRefs = useRef([]);

//   // Get auth state from Redux
//   const { isLoading, error, success, message } = useSelector((state) => state.auth);

//   // Get email from location state
//   useEffect(() => {
//     const stateEmail = location.state?.email;
//     if (stateEmail) {
//       setEmail(stateEmail);
//     } else {
//       // If no email in state, redirect back to forgot password
//       navigate('/forgot-password', { replace: true });
//     }
//   }, [location, navigate]);

//   // Timer for resend OTP
//   useEffect(() => {
//     let interval;
//     if (timer > 0 && !canResend) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [timer, canResend]);

//   // Handle OTP verification success
//   useEffect(() => {
//     if (success && message) {
//       setOpenSuccessAlert(true);
      
//       const timer = setTimeout(() => {
//         setOpenSuccessAlert(false);
//         dispatch(clearMessage());
        
//         // Navigate to reset password with email and OTP in state
//         navigate('/reset-password', { 
//           state: { 
//             email: email,
//             otp: otp.join('')
//           },
//           replace: true 
//         });
//       }, 1500);
      
//       return () => clearTimeout(timer);
//     }
//   }, [success, message, email, otp, dispatch, navigate]);

//   // Clear messages on unmount
//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//       dispatch(clearMessage());
//     };
//   }, [dispatch]);

//   const handleChange = (index, value) => {
//     // Allow only numbers
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     // Move to previous input on backspace if current field is empty
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
//     if (!/^\d+$/.test(pastedData)) return;

//     const pastedOtp = pastedData.split('');
//     const newOtp = [...otp];
    
//     pastedOtp.forEach((value, index) => {
//       if (index < 6) {
//         newOtp[index] = value;
//       }
//     });
    
//     setOtp(newOtp);
    
//     // Focus the next empty input or last input
//     const lastFilledIndex = Math.min(pastedOtp.length, 5);
//     inputRefs.current[lastFilledIndex].focus();
//   };

//   const handleResendOTP = async () => {
//     if (canResend && email) {
//       dispatch(clearError());
//       dispatch(clearMessage());
      
//       const result = await dispatch(forgotPassword(email));
//       if (forgotPassword.fulfilled.match(result)) {
//         setTimer(60);
//         setCanResend(false);
//         setOtp(['', '', '', '', '', '']);
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       return;
//     }

//     dispatch(clearError());
//     dispatch(clearMessage());

//     await dispatch(verifyOTP({
//       email: email,
//       otp: otpString
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       {/* Success Snackbar */}
//       <Snackbar
//         open={openSuccessAlert}
//         autoHideDuration={1500}
//         onClose={() => setOpenSuccessAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         style={{ marginTop: '80px' }}
//       >
//         <Alert 
//           severity="success" 
//           variant="filled"
//           onClose={() => setOpenSuccessAlert(false)}
//           sx={{ width: '100%', boxShadow: 3 }}
//         >
//           {message || 'OTP verified! Redirecting...'}
//         </Alert>
//       </Snackbar>

//       {/* Error Alert */}
//       {error && (
//         <Alert 
//           severity="error" 
//           className="mb-6"
//           onClose={() => dispatch(clearError())}
//           sx={{ position: 'fixed', top: '80px', right: '20px', zIndex: 9999 }}
//         >
//           {typeof error === 'string' ? error : error?.message || 'Verification failed'}
//         </Alert>
//       )}

//       <div className="max-w-md w-full">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-8"
//         >
//           <Link to="/" className="inline-flex items-center space-x-2 mb-6">
//             <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-2xl">T</span>
//             </div>
//             <span className="text-2xl font-bold text-gray-900">Team Trackify</span>
//           </Link>
//           <Typography variant="h4" className="font-bold text-gray-900 mb-2">
//             Verify OTP
//           </Typography>
//           <Typography variant="body1" className="text-gray-600">
//             Enter the 6-digit code sent to
//           </Typography>
//           <Typography variant="body1" className="font-medium text-primary-600 mt-1">
//             {email}
//           </Typography>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card className="p-8 shadow-xl">
//             <div className="space-y-8">
//               {/* OTP Input Boxes */}
//               <div>
//                 <Typography variant="body2" className="text-gray-600 mb-3 text-center">
//                   Enter 6-digit OTP
//                 </Typography>
//                 <Box className="flex justify-center gap-2">
//                   {otp.map((digit, index) => (
//                     <Paper
//                       key={index}
//                       elevation={0}
//                       className="w-12 h-14"
//                       sx={{
//                         border: '1px solid',
//                         borderColor: error ? 'error.main' : 'grey.300',
//                         borderRadius: 1,
//                         overflow: 'hidden',
//                       }}
//                     >
//                       <input
//                         ref={(el) => (inputRefs.current[index] = el)}
//                         type="text"
//                         maxLength={1}
//                         value={digit}
//                         onChange={(e) => handleChange(index, e.target.value)}
//                         onKeyDown={(e) => handleKeyDown(index, e)}
//                         onPaste={index === 0 ? handlePaste : undefined}
//                         disabled={isLoading || openSuccessAlert}
//                         className="w-full h-full text-center text-xl font-semibold outline-none border-0 focus:ring-2 focus:ring-primary-500"
//                         style={{
//                           color: '#1f2937',
//                           backgroundColor: 'transparent',
//                         }}
//                       />
//                     </Paper>
//                   ))}
//                 </Box>
//               </div>

//               {/* Timer and Resend */}
//               <div className="text-center">
//                 {!canResend ? (
//                   <Typography variant="body2" className="text-gray-600">
//                     Resend OTP in <span className="font-medium text-primary-600">{timer}s</span>
//                   </Typography>
//                 ) : (
//                   <Button
//                     variant="text"
//                     color="primary"
//                     onClick={handleResendOTP}
//                     disabled={isLoading}
//                     className="normal-case"
//                   >
//                     Resend OTP
//                   </Button>
//                 )}
//               </div>

//               {/* Verify Button */}
//               <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   fullWidth
//                   onClick={handleSubmit}
//                   disabled={isLoading || otp.join('').length !== 6 || openSuccessAlert}
//                   className="bg-primary-600 hover:bg-primary-700 py-3"
//                 >
//                   {isLoading ? 'Verifying...' : openSuccessAlert ? 'Verified!' : 'Verify OTP'}
//                 </Button>
//               </motion.div>
//             </div>

//             <Divider className="my-6" />

//             <div className="text-center">
//               <Typography variant="body2" className="text-gray-600">
//                 Didn't receive the code?{' '}
//                 <button
//                   onClick={handleResendOTP}
//                   disabled={!canResend || isLoading}
//                   className={`font-medium ${
//                     canResend && !isLoading
//                       ? 'text-primary-600 hover:text-primary-700'
//                       : 'text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   Resend
//                 </button>
//               </Typography>
//             </div>
//           </Card>

//           <div className="mt-6 text-center">
//             <Link
//               to="/forgot-password"
//               className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
//             >
//               <ArrowBackIcon className="mr-2" fontSize="small" />
//               Back to Forgot Password
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOTP;
























//////////////////////////Color//////////////////////////////
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { verifyOTP, clearError, clearMessage, forgotPassword } from '../../redux/slices/authSlice';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [email, setEmail] = useState('');
  const inputRefs = useRef([]);

  // Get auth state from Redux
  const { isLoading, error, success, message } = useSelector((state) => state.auth);

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
  useEffect(() => {
    if (success && message) {
      setOpenSuccessAlert(true);
      
      const timer = setTimeout(() => {
        setOpenSuccessAlert(false);
        dispatch(clearMessage());
        
        // Navigate to reset password with email and OTP in state
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
      
      const result = await dispatch(forgotPassword(email));
      if (forgotPassword.fulfilled.match(result)) {
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
      }
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      return;
    }

    dispatch(clearError());
    dispatch(clearMessage());

    await dispatch(verifyOTP({
      email: email,
      otp: otpString
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={1500}
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
            top: '80px', 
            right: '20px', 
            zIndex: 9999,
            border: '1px solid',
            borderColor: 'rgba(37, 99, 235, 0.1)',
          }}
        >
          {typeof error === 'string' ? error : error?.message || 'Verification failed'}
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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Team Trackify</span>
          </Link>
          <Typography variant="h4" className="font-bold text-gray-900 mb-2">
            Verify OTP
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Enter the 6-digit code sent to
          </Typography>
          <Typography variant="body1" className="font-medium text-blue-600 mt-1">
            {email}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-8 shadow-xl" sx={{ border: '1px solid', borderColor: 'rgba(37, 99, 235, 0.1)' }}>
            <div className="space-y-8">
              {/* OTP Input Boxes */}
              <div>
                <Typography variant="body2" className="text-gray-600 mb-3 text-center">
                  Enter 6-digit OTP
                </Typography>
                <Box className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      className="w-12 h-14"
                      sx={{
                        border: '1px solid',
                        borderColor: error ? 'error.main' : 'rgba(37, 99, 235, 0.2)',
                        borderRadius: 1,
                        overflow: 'hidden',
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
                        className="w-full h-full text-center text-xl font-semibold outline-none border-0 focus:ring-2 focus:ring-blue-500"
                        style={{
                          color: '#1f2937',
                          backgroundColor: 'transparent',
                        }}
                      />
                    </Paper>
                  ))}
                </Box>
              </div>

              {/* Timer and Resend */}
              <div className="text-center">
                {!canResend ? (
                  <Typography variant="body2" className="text-gray-600">
                    Resend OTP in <span className="font-medium text-blue-600">{timer}s</span>
                  </Typography>
                ) : (
                  <Button
                    variant="text"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    sx={{ 
                      color: '#2563EB',
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 0.05)',
                      },
                      textTransform: 'none',
                    }}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>

              {/* Verify Button */}
              <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isLoading || otp.join('').length !== 6 || openSuccessAlert}
                  sx={{
                    background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
                    color: 'white',
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1E40AF, #2563EB)',
                    },
                    '&.Mui-disabled': {
                      background: 'rgba(37, 99, 235, 0.5)',
                    },
                  }}
                >
                  {isLoading ? 'Verifying...' : openSuccessAlert ? 'Verified!' : 'Verify OTP'}
                </Button>
              </motion.div>
            </div>

            <Divider className="my-6" sx={{ borderColor: 'rgba(37, 99, 235, 0.1)' }} />

            <div className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Didn't receive the code?{' '}
                <button
                  onClick={handleResendOTP}
                  disabled={!canResend || isLoading}
                  className={`font-medium ${
                    canResend && !isLoading
                      ? 'text-blue-600 hover:text-blue-700'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Resend
                </button>
              </Typography>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowBackIcon className="mr-2" fontSize="small" />
              Back to Forgot Password
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOTP;