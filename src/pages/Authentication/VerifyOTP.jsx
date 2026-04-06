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
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
//           onClose={() => dispatch(clearError())}
//           sx={{ 
//             position: 'fixed', 
//             top: '80px', 
//             right: '20px', 
//             zIndex: 9999,
//             border: '1px solid',
//             borderColor: 'rgba(37, 99, 235, 0.1)',
//           }}
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
//             <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
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
//           <Typography variant="body1" className="font-medium text-blue-600 mt-1">
//             {email}
//           </Typography>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card className="p-8 shadow-xl" sx={{ border: '1px solid', borderColor: 'rgba(37, 99, 235, 0.1)' }}>
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
//                         borderColor: error ? 'error.main' : 'rgba(37, 99, 235, 0.2)',
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
//                         className="w-full h-full text-center text-xl font-semibold outline-none border-0 focus:ring-2 focus:ring-blue-500"
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
//                     Resend OTP in <span className="font-medium text-blue-600">{timer}s</span>
//                   </Typography>
//                 ) : (
//                   <Button
//                     variant="text"
//                     onClick={handleResendOTP}
//                     disabled={isLoading}
//                     sx={{ 
//                       color: '#2563EB',
//                       '&:hover': {
//                         backgroundColor: 'rgba(37, 99, 235, 0.05)',
//                       },
//                       textTransform: 'none',
//                     }}
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
//                   sx={{
//                     background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//                     color: 'white',
//                     py: 1.5,
//                     '&:hover': {
//                       background: 'linear-gradient(135deg, #1E40AF, #2563EB)',
//                     },
//                     '&.Mui-disabled': {
//                       background: 'rgba(37, 99, 235, 0.5)',
//                     },
//                   }}
//                 >
//                   {isLoading ? 'Verifying...' : openSuccessAlert ? 'Verified!' : 'Verify OTP'}
//                 </Button>
//               </motion.div>
//             </div>

//             <Divider className="my-6" sx={{ borderColor: 'rgba(37, 99, 235, 0.1)' }} />

//             <div className="text-center">
//               <Typography variant="body2" className="text-gray-600">
//                 Didn't receive the code?{' '}
//                 <button
//                   onClick={handleResendOTP}
//                   disabled={!canResend || isLoading}
//                   className={`font-medium ${
//                     canResend && !isLoading
//                       ? 'text-blue-600 hover:text-blue-700'
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
//               className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
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








//////////////////////////////    Centralised Color     ///////////////////////////////
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
//   useTheme,
//   alpha,
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { verifyOTP, clearError, clearMessage, forgotPassword } from '../../redux/slices/authSlice';

// const VerifyOTP = () => {
//   const theme = useTheme();
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
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         py: 3,
//         px: 2,
//       }}
//     >
//       {/* Success Snackbar */}
//       <Snackbar
//         open={openSuccessAlert}
//         autoHideDuration={1500}
//         onClose={() => setOpenSuccessAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{ mt: 8 }}
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
//           onClose={() => dispatch(clearError())}
//           sx={{ 
//             position: 'fixed', 
//             top: '80px', 
//             right: '20px', 
//             zIndex: 9999,
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           {typeof error === 'string' ? error : error?.message || 'Verification failed'}
//         </Alert>
//       )}

//       <Box sx={{ maxWidth: 450, width: '100%' }}>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Box sx={{ textAlign: 'center', mb: 4 }}>
//             <Link to="/" style={{ textDecoration: 'none' }}>
//               <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 <Box
//                   sx={{
//                     width: 48,
//                     height: 48,
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     borderRadius: 2,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Typography variant="h5" fontWeight="bold" color="white">
//                     T
//                   </Typography>
//                 </Box>
//                 <Typography variant="h5" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
//                   Team Trackify
//                 </Typography>
//               </Box>
//             </Link>
//             <Typography variant="h4" fontWeight="700" sx={{ color: 'text.primary', mb: 1 }}>
//               Verify OTP
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//               Enter the 6-digit code sent to
//             </Typography>
//             <Typography variant="body1" fontWeight="500" sx={{ color: theme.palette.primary.main, mt: 1 }}>
//               {email}
//             </Typography>
//           </Box>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card sx={{ 
//             p: 3, 
//             boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//               {/* OTP Input Boxes */}
//               <Box>
//                 <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}>
//                   Enter 6-digit OTP
//                 </Typography>
//                 <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
//                   {otp.map((digit, index) => (
//                     <Paper
//                       key={index}
//                       elevation={0}
//                       sx={{
//                         width: 48,
//                         height: 56,
//                         border: '2px solid',
//                         borderColor: error ? 'error.main' : alpha(theme.palette.primary.main, 0.2),
//                         borderRadius: 2,
//                         overflow: 'hidden',
//                         transition: 'border-color 0.2s',
//                         '&:focus-within': {
//                           borderColor: theme.palette.primary.main,
//                         },
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
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                           textAlign: 'center',
//                           fontSize: '1.5rem',
//                           fontWeight: 600,
//                           outline: 'none',
//                           border: 'none',
//                           color: theme.palette.text.primary,
//                           backgroundColor: 'transparent',
//                         }}
//                       />
//                     </Paper>
//                   ))}
//                 </Box>
//               </Box>

//               {/* Timer and Resend */}
//               <Box sx={{ textAlign: 'center' }}>
//                 {!canResend ? (
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     Resend OTP in <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>{timer}s</Box>
//                   </Typography>
//                 ) : (
//                   <Button
//                     variant="text"
//                     onClick={handleResendOTP}
//                     disabled={isLoading}
//                     sx={{ 
//                       color: theme.palette.primary.main,
//                       '&:hover': {
//                         backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                       },
//                       textTransform: 'none',
//                       fontWeight: 500,
//                     }}
//                   >
//                     Resend OTP
//                   </Button>
//                 )}
//               </Box>

//               {/* Verify Button */}
//               <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   fullWidth
//                   onClick={handleSubmit}
//                   disabled={isLoading || otp.join('').length !== 6 || openSuccessAlert}
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     color: 'white',
//                     py: 1.5,
//                     '&:hover': {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                     '&.Mui-disabled': {
//                       background: alpha(theme.palette.primary.main, 0.5),
//                     },
//                   }}
//                 >
//                   {isLoading ? 'Verifying...' : openSuccessAlert ? 'Verified!' : 'Verify OTP'}
//                 </Button>
//               </motion.div>
//             </Box>

//             <Divider sx={{ 
//               my: 3, 
//               borderColor: alpha(theme.palette.primary.main, 0.1) 
//             }} />

//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                 Didn't receive the code?{' '}
//                 <Box
//                   component="button"
//                   onClick={handleResendOTP}
//                   disabled={!canResend || isLoading}
//                   sx={{
//                     background: 'none',
//                     border: 'none',
//                     padding: 0,
//                     font: 'inherit',
//                     cursor: canResend && !isLoading ? 'pointer' : 'not-allowed',
//                     fontWeight: 500,
//                     color: canResend && !isLoading ? theme.palette.primary.main : theme.palette.text.disabled,
//                     '&:hover': {
//                       color: canResend && !isLoading ? theme.palette.primary.dark : theme.palette.text.disabled,
//                       textDecoration: canResend && !isLoading ? 'underline' : 'none',
//                     },
//                   }}
//                 >
//                   Resend
//                 </Box>
//               </Typography>
//             </Box>
//           </Card>

//           <Box sx={{ mt: 3, textAlign: 'center' }}>
//             <Link
//               to="/forgot-password"
//               style={{ 
//                 color: theme.palette.text.secondary,
//                 textDecoration: 'none',
//                 fontSize: '0.875rem',
//                 transition: 'color 0.2s',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '4px',
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
//               onMouseLeave={(e) => e.currentTarget.style.color = theme.palette.text.secondary}
//             >
//               <ArrowBackIcon sx={{ fontSize: 16 }} />
//               Back to Forgot Password
//             </Link>
//           </Box>
//         </motion.div>
//       </Box>
//     </Box>
//   );
// };

// export default VerifyOTP;





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
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
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