
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Alert,
//   Card,
//   Divider,
//   useTheme,
//   alpha,
//   useMediaQuery,
//   CircularProgress,
//   Grid,
//   Stepper,
//   Step,
//   StepLabel,
//   Paper,
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import PersonIcon from '@mui/icons-material/Person';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SendIcon from '@mui/icons-material/Send';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import axios from 'axios';
// import { resendEmailOTP, verifyEmailOTP } from '../../redux/slices/authSlice';
// import Logo from '../../assets/logo31.png'
// const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

// const Register = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // OTP verification states
//   const [activeStep, setActiveStep] = useState(0);
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);
//   const [registeredEmail, setRegisteredEmail] = useState('');
//   const [otpVerifying, setOtpVerifying] = useState(false);
//   const [otpSuccess, setOtpSuccess] = useState(false);
//   const [otpError, setOtpError] = useState('');

//   // Get auth state from Redux
//   const { isLoading: reduxLoading } = useSelector((state) => state.auth || {});

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const steps = ['Registration', 'Email Verification'];

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       fullName: '',
//       email: '',
//       phone: '',
//       address: '',
//       password: '',
//       confirmPassword: '',
//     },
//   });

//   const password = watch('password');

//   // Password strength validation
//   const getPasswordStrength = (password) => {
//     if (!password) return { score: 0, label: '', color: '' };

//     let score = 0;
//     if (password.length >= 8) score += 1;
//     if (/[A-Z]/.test(password)) score += 1;
//     if (/[0-9]/.test(password)) score += 1;
//     if (/[^A-Za-z0-9]/.test(password)) score += 1;

//     const strengthMap = {
//       0: { score: 0, label: 'Weak', color: '#ef4444' },
//       1: { score: 1, label: 'Weak', color: '#ef4444' },
//       2: { score: 2, label: 'Fair', color: '#f59e0b' },
//       3: { score: 3, label: 'Good', color: '#10b981' },
//       4: { score: 4, label: 'Strong', color: '#10b981' },
//     };

//     return strengthMap[score] || strengthMap[0];
//   };

//   const passwordStrength = getPasswordStrength(password);

//   // Timer for resend OTP
//   React.useEffect(() => {
//     let interval;
//     if (activeStep === 1 && timer > 0 && !canResend) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setCanResend(true);
//     }
//     return () => clearInterval(interval);
//   }, [timer, canResend, activeStep]);

//   // Handle registration submission
//   const onSubmit = async (data) => {
//     setError('');
//     setLoading(true);

//     // Basic client-side validation
//     if (data.password !== data.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Prepare registration data according to API format
//       const registrationData = {
//         name: data.fullName,
//         email: data.email,
//         password: data.password,
//         mobile_no: data.phone,
//         address: data.address,
//         role_id: "1", // Default role_id = 1 (Admin)
//         // createdby: "67b123456789012345678901" 
//         createdby: "null"
//       };

//       // Make API call to register
//       const response = await axios.post(`${BASE_URL}/users/register`, registrationData);

//       if (response.data) {
//         setSuccess(true);
//         setRegisteredEmail(data.email);

//         // Move to OTP verification step after successful registration
//         setTimeout(() => {
//           setActiveStep(1);
//           setSuccess(false);
//           setTimer(60);
//           setCanResend(false);
//         }, 1500);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle OTP input change
//   const handleOtpChange = (index, value) => {
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.slice(-1);
//     setOtp(newOtp);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   // Handle OTP key down (backspace)
//   const handleOtpKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const prevInput = document.getElementById(`otp-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   // Handle OTP paste
//   const handleOtpPaste = (e) => {
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
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = async () => {
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       setOtpError('Please enter complete 6-digit OTP');
//       return;
//     }

//     setOtpVerifying(true);
//     setOtpError('');

//     try {
//       const resultAction = await dispatch(verifyEmailOTP({
//         email: registeredEmail,
//         otp: otpString
//       }));

//       if (verifyEmailOTP.fulfilled.match(resultAction)) {
//         setOtpSuccess(true);

//         // Show success and redirect to login
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       } else {
//         setOtpError(resultAction.payload?.message || 'Failed to verify OTP');
//       }
//     } catch (error) {
//       setOtpError('An error occurred during verification');
//     } finally {
//       setOtpVerifying(false);
//     }
//   };

//   // Handle resend OTP
//   const handleResendOtp = async () => {
//     setCanResend(false);
//     setTimer(60);
//     setOtpError('');

//     try {
//       const resultAction = await dispatch(resendEmailOTP({ email: registeredEmail }));

//       if (resendEmailOTP.fulfilled.match(resultAction)) {
//         // OTP resent successfully
//         setOtp(['', '', '', '', '', '']);
//       } else {
//         setOtpError(resultAction.payload?.message || 'Failed to resend OTP');
//         setCanResend(true);
//         setTimer(0);
//       }
//     } catch (error) {
//       setOtpError('An error occurred while resending OTP');
//       setCanResend(true);
//       setTimer(0);
//     }
//   };

//   // Go back to registration step
//   const handleBackToRegistration = () => {
//     setActiveStep(0);
//     setOtp(['', '', '', '', '', '']);
//     setOtpError('');
//     setOtpSuccess(false);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         py: { xs: 2, sm: 3 },
//         px: { xs: 1, sm: 2 },
//       }}
//     >
//       <Box sx={{ maxWidth: 700, width: '100%' }}>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <Link to="/" style={{ textDecoration: 'none' }}>
//               <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 {/* <Box
//                   sx={{
//                     width: { xs: 40, sm: 44 },
//                     height: { xs: 40, sm: 44 },
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     borderRadius: 1.5,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Typography variant="h6" fontWeight="bold" color="white" sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
//                     T
//                   </Typography>
//                 </Box> */}

//                 <Box
//                   component="img"
//                   src={Logo}
//                   alt="Company Logo"
//                   sx={{
//                     height: { xs: '28px', sm: '32px', md: '36px' },
//                     width: 'auto',
//                     objectFit: 'contain',
//                     display: 'block',
//                     borderRadius: 0.8
//                   }}
//                 />
//                 <Typography
//                   variant="h6"
//                   fontWeight="bold"
//                   sx={{
//                     color: theme.palette.primary.main,
//                     fontSize: { xs: '1.1rem', sm: '1.2rem' }
//                   }}
//                 >
//                   Team Trackify
//                 </Typography>
//               </Box>
//             </Link>

//             {/* Stepper */}
//             <Stepper activeStep={activeStep} alternativeLabel={!isSmallMobile} sx={{ mb: 3, mt: 1 }}>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel
//                     StepIconProps={{
//                       sx: {
//                         '& .MuiStepIcon-text': {
//                           fontSize: '0.75rem',
//                         },
//                         '&.Mui-active': {
//                           color: theme.palette.primary.main,
//                         },
//                         '&.Mui-completed': {
//                           color: theme.palette.primary.main,
//                         },
//                       }
//                     }}
//                   >
//                     <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//                       {label}
//                     </Typography>
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>

//             <Typography
//               variant="h5"
//               fontWeight="700"
//               sx={{
//                 color: 'text.primary',
//                 mb: 0.5,
//                 fontSize: { xs: '1.3rem', sm: '1.5rem' }
//               }}
//             >
//               {activeStep === 0 ? 'Create Admin Account' : 'Verify Your Email'}
//             </Typography>
//             <Typography
//               variant="body2"
//               sx={{
//                 color: 'text.secondary',
//                 fontSize: { xs: '0.75rem', sm: '0.8rem' }
//               }}
//             >
//               {activeStep === 0
//                 ? 'Register as an administrator to manage your team'
//                 : `We've sent a verification code to ${registeredEmail}`}
//             </Typography>
//           </Box>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card sx={{
//             p: { xs: 2, sm: 3 },
//             boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             borderRadius: { xs: 2, sm: 2.5 },
//           }}>
//             <AnimatePresence mode="wait">
//               {/* Registration Step */}
//               {activeStep === 0 && (
//                 <motion.div
//                   key="registration"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {/* Success Message */}
//                   {success && (
//                     <Alert
//                       severity="success"
//                       sx={{
//                         mb: 2.5,
//                         border: '1px solid',
//                         borderColor: alpha('#10b981', 0.2),
//                         borderRadius: 1.5,
//                         fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         py: 0.5,
//                       }}
//                     >
//                       Registration successful! Redirecting to verification...
//                     </Alert>
//                   )}

//                   {/* Error Message */}
//                   {error && (
//                     <Alert
//                       severity="error"
//                       sx={{
//                         mb: 2.5,
//                         border: '1px solid',
//                         borderColor: alpha('#ef4444', 0.2),
//                         borderRadius: 1.5,
//                         fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         py: 0.5,
//                       }}
//                     >
//                       {error}
//                     </Alert>
//                   )}

//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     <Grid container spacing={2.5}>
//                       {/* Full Name */}
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Full Name"
//                           {...register('fullName', {
//                             required: 'Full name is required',
//                             minLength: {
//                               value: 2,
//                               message: 'Name must be at least 2 characters',
//                             },
//                             maxLength: {
//                               value: 50,
//                               message: 'Name must not exceed 50 characters',
//                             },
//                             pattern: {
//                               value: /^[A-Za-z\s]+$/,
//                               message: 'Name can only contain letters and spaces',
//                             },
//                           })}
//                           error={!!errors.fullName}
//                           helperText={errors.fullName?.message}
//                           variant="outlined"
//                           size="small"
//                           disabled={loading || success}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiFormHelperText-root': {
//                               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                             },
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 1.5,
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>

//                       {/* Email */}
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Email Address"
//                           type="email"
//                           {...register('email', {
//                             required: 'Email is required',
//                             pattern: {
//                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                               message: 'Invalid email address',
//                             },
//                           })}
//                           error={!!errors.email}
//                           helperText={errors.email?.message}
//                           variant="outlined"
//                           size="small"
//                           disabled={loading || success}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiFormHelperText-root': {
//                               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                             },
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 1.5,
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>

//                       {/* Phone (required) */}
//                       {/* <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Phone Number"
//                           type="tel"
//                           {...register('phone', {
//                             required: 'Phone number is required',
//                             pattern: {
//                               value: /^[0-9]{10}$/,
//                               message: 'Phone number must be 10 digits',
//                             },
//                           })}
//                           error={!!errors.phone}
//                           helperText={errors.phone?.message}
//                           variant="outlined"
//                           size="small"
//                           disabled={loading || success}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiFormHelperText-root': {
//                               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                             },
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 1.5,
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />
//                       </Grid> */}
// <Grid item xs={12} sm={6}>
//   <TextField
//     fullWidth
//     label="Phone Number"
//     type="tel"
//     {...register('phone', {
//       required: 'Phone number is required',
//       pattern: {
//         value: /^[0-9]{10}$/,
//         message: 'Enter exactly 10 digits only',
//       },
//       validate: {
//         noSpaces: (value) => {
//           if (value.includes(' ')) {
//             return 'Spaces are not allowed';
//           }
//           return true;
//         },
//         noSpecialChars: (value) => {
//           if (/[^0-9]/.test(value)) {
//             return 'Only numbers are allowed';
//           }
//           return true;
//         },
//         exactLength: (value) => {
//           if (value.length !== 10) {
//             return 'Phone number must be exactly 10 digits';
//           }
//           return true;
//         }
//       }
//     })}
//     error={!!errors.phone}
//     helperText={errors.phone?.message}
//     variant="outlined"
//     size="small"
//     disabled={loading || success}
//     inputProps={{
//       maxLength: 10,
//       inputMode: 'numeric',
//       pattern: '[0-9]*'
//     }}
//     onChange={(e) => {
//       // Remove any non-digit characters and spaces
//       const cleaned = e.target.value.replace(/[^0-9]/g, '');
//       e.target.value = cleaned;
//       // Update the form value
//       e.target.dispatchEvent(new Event('input', { bubbles: true }));
//     }}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//         </InputAdornment>
//       ),
//     }}
//     sx={{
//       '& .MuiInputLabel-root': {
//         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//       },
//       '& .MuiInputBase-input': {
//         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//       },
//       '& .MuiFormHelperText-root': {
//         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//       },
//       '& .MuiOutlinedInput-root': {
//         borderRadius: 1.5,
//         '&:hover fieldset': {
//           borderColor: theme.palette.primary.main,
//         },
//       },
//     }}
//   />
// </Grid>
//                       {/* Address (required) */}
//                       {/* <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Address"
//                           {...register('address', {
//                             required: 'Address is required',
//                             minLength: {
//                               value: 5,
//                               message: 'Address must be at least 5 characters',
//                             },
//                           })}
//                           error={!!errors.address}
//                           helperText={errors.address?.message}
//                           variant="outlined"
//                           size="small"
//                           multiline
//                           rows={2}
//                           disabled={loading || success}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiFormHelperText-root': {
//                               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                             },
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 1.5,
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />
//                       </Grid> */}
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Address"
//                           {...register('address', {
//                             required: 'Address is required',
//                             minLength: {
//                               value: 5,
//                               message: 'Address must be at least 5 characters',
//                             },
//                           })}
//                           error={!!errors.address}
//                           helperText={errors.address?.message}
//                           variant="outlined"
//                           size="small"
//                           disabled={loading || success}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                               padding: '8.5px 14px', // Match phone number field height
//                             },
//                             '& .MuiFormHelperText-root': {
//                               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                             },
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 1.5,
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>
//                       {/* Password with Strength Indicator */}
//                       <Grid item xs={12} sm={6}>
//                         <Box>
//                           <TextField
//                             fullWidth
//                             label="Password"
//                             type={showPassword ? 'text' : 'password'}
//                             {...register('password', {
//                               required: 'Password is required',
//                               minLength: {
//                                 value: 6,
//                                 message: 'Password must be at least 6 characters',
//                               },
//                               validate: {
//                                 hasUpperCase: (value) =>
//                                   /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
//                                 hasNumber: (value) =>
//                                   /[0-9]/.test(value) || 'Must contain at least one number',
//                                 hasSpecialChar: (value) =>
//                                   /[^A-Za-z0-9]/.test(value) || 'Must contain at least one special character',
//                               },
//                             })}
//                             error={!!errors.password}
//                             helperText={errors.password?.message}
//                             variant="outlined"
//                             size="small"
//                             disabled={loading || success}
//                             InputProps={{
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                                 </InputAdornment>
//                               ),
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     edge="end"
//                                     sx={{ color: theme.palette.primary.main }}
//                                     size="small"
//                                     disabled={loading || success}
//                                   >
//                                     {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                             sx={{
//                               '& .MuiInputLabel-root': {
//                                 fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                               },
//                               '& .MuiInputBase-input': {
//                                 fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                               },
//                               '& .MuiFormHelperText-root': {
//                                 fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                               },
//                               '& .MuiOutlinedInput-root': {
//                                 borderRadius: 1.5,
//                                 '&:hover fieldset': {
//                                   borderColor: theme.palette.primary.main,
//                                 },
//                               },
//                             }}
//                           />

//                           {/* Password Strength Indicator */}
//                           {password && !success && (
//                             <Box sx={{ mt: 1 }}>
//                               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//                                 <Box sx={{
//                                   flex: 1,
//                                   height: 4,
//                                   bgcolor: alpha(theme.palette.divider, 0.2),
//                                   borderRadius: 2,
//                                   display: 'flex',
//                                   gap: 0.5,
//                                 }}>
//                                   {[1, 2, 3, 4].map((level) => (
//                                     <Box
//                                       key={level}
//                                       sx={{
//                                         flex: 1,
//                                         height: '100%',
//                                         borderRadius: 2,
//                                         bgcolor: level <= passwordStrength.score ? passwordStrength.color : 'transparent',
//                                         transition: 'background-color 0.3s ease',
//                                       }}
//                                     />
//                                   ))}
//                                 </Box>
//                                 <Typography
//                                   variant="caption"
//                                   sx={{
//                                     fontSize: '0.65rem',
//                                     color: passwordStrength.color,
//                                     fontWeight: 500,
//                                   }}
//                                 >
//                                   {passwordStrength.label}
//                                 </Typography>
//                               </Box>
//                               <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                 Use at least 6 characters with uppercase, number & special character
//                               </Typography>
//                             </Box>
//                           )}
//                         </Box>
//                       </Grid>

//                       {/* Confirm Password */}
//                       <Grid item xs={12} sm={6}>
//                         <TextField
//                           fullWidth
//                           label="Confirm Password"
//                           type={showPassword ? 'text' : 'password'}
//                           {...register('confirmPassword', {
//                             required: 'Please confirm your password',
//                             validate: (value) => value === password || 'Passwords do not match',
//                           })}
//                           error={!!errors.confirmPassword}
//                           helperText={errors.confirmPassword?.message}
//                           variant="outlined"
//                           size="small"
//                           disabled={loading || success}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                             },
//                             '& .MuiFormHelperText-root': {
//                               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                             },
//                             '& .MuiOutlinedInput-root': {
//                               borderRadius: 1.5,
//                               '&:hover fieldset': {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                           }}
//                         />
//                       </Grid>

//                       {/* Role Info - Display only */}
//                       <Grid item xs={12}>
//                         <Box sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.05),
//                           p: 1.5,
//                           borderRadius: 1.5,
//                           border: '1px solid',
//                           borderColor: alpha(theme.palette.primary.main, 0.1),
//                         }}>
//                           <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                             Account Type
//                           </Typography>
//                           <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem', color: theme.palette.primary.main }}>
//                             Administrator
//                           </Typography>
//                         </Box>
//                       </Grid>

//                       {/* Submit Button */}
//                       <Grid item xs={12}>
//                         <motion.div whileHover={{ scale: loading || success ? 1 : 1.02 }} whileTap={{ scale: loading || success ? 1 : 0.98 }}>
//                           <Button
//                             type="submit"
//                             variant="contained"
//                             size="small"
//                             fullWidth
//                             disabled={loading || success}
//                             endIcon={loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <PersonAddIcon sx={{ fontSize: 16 }} />}
//                             sx={{
//                               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                               color: 'white',
//                               py: { xs: 1, sm: 1.2 },
//                               borderRadius: { xs: 1.5, sm: 2 },
//                               fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                               '&:hover': {
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                               },
//                               '&.Mui-disabled': {
//                                 background: alpha(theme.palette.primary.main, 0.5),
//                               },
//                             }}
//                           >
//                             {loading ? 'Creating account...' : success ? 'Registration successful!' : 'Create Admin Account'}
//                           </Button>
//                         </motion.div>
//                       </Grid>
//                     </Grid>
//                   </form>
//                 </motion.div>
//               )}

//               {/* OTP Verification Step */}
//               {activeStep === 1 && (
//                 <motion.div
//                   key="otp"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {otpSuccess ? (
//                     <Box sx={{ textAlign: 'center', py: 3 }}>
//                       <VerifiedIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
//                       <Typography variant="h6" sx={{ fontSize: '1rem', mb: 1, color: 'text.primary' }}>
//                         Email Verified Successfully!
//                       </Typography>
//                       <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 2 }}>
//                         Redirecting to login page...
//                       </Typography>
//                       <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
//                     </Box>
//                   ) : (
//                     <>
//                       {/* OTP Error Message */}
//                       {otpError && (
//                         <Alert
//                           severity="error"
//                           sx={{
//                             mb: 2.5,
//                             border: '1px solid',
//                             borderColor: alpha('#ef4444', 0.2),
//                             borderRadius: 1.5,
//                             fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           }}
//                           onClose={() => setOtpError('')}
//                         >
//                           {otpError}
//                         </Alert>
//                       )}

//                       <Box sx={{ textAlign: 'center', mb: 3 }}>
//                         <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>
//                           Enter the 6-digit verification code sent to
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.9rem', color: theme.palette.primary.main }}>
//                           {registeredEmail}
//                         </Typography>
//                       </Box>

//                       {/* OTP Input Boxes */}
//                       <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, sm: 1 }, mb: 3 }}>
//                         {otp.map((digit, index) => (
//                           <Paper
//                             key={index}
//                             elevation={0}
//                             sx={{
//                               width: { xs: 40, sm: 48 },
//                               height: { xs: 48, sm: 56 },
//                               border: '1px solid',
//                               borderColor: otpError ? '#ef4444' : alpha(theme.palette.primary.main, 0.2),
//                               borderRadius: 1.5,
//                               overflow: 'hidden',
//                             }}
//                           >
//                             <input
//                               id={`otp-${index}`}
//                               type="text"
//                               maxLength={1}
//                               value={digit}
//                               onChange={(e) => handleOtpChange(index, e.target.value)}
//                               onKeyDown={(e) => handleOtpKeyDown(index, e)}
//                               onPaste={index === 0 ? handleOtpPaste : undefined}
//                               disabled={otpVerifying}
//                               style={{
//                                 width: '100%',
//                                 height: '100%',
//                                 textAlign: 'center',
//                                 fontSize: isMobile ? '1rem' : '1.2rem',
//                                 fontWeight: 600,
//                                 border: 'none',
//                                 outline: 'none',
//                                 backgroundColor: 'transparent',
//                                 color: theme.palette.text.primary,
//                               }}
//                             />
//                           </Paper>
//                         ))}
//                       </Box>

//                       {/* Timer and Resend */}
//                       <Box sx={{ textAlign: 'center', mb: 3 }}>
//                         {!canResend ? (
//                           <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                             Resend code in <span style={{ color: theme.palette.primary.main, fontWeight: 600 }}>{timer}s</span>
//                           </Typography>
//                         ) : (
//                           <Button
//                             variant="text"
//                             size="small"
//                             onClick={handleResendOtp}
//                             disabled={otpVerifying}
//                             sx={{
//                               color: theme.palette.primary.main,
//                               fontSize: '0.7rem',
//                               textTransform: 'none',
//                               '&:hover': {
//                                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//                               },
//                             }}
//                           >
//                             Resend OTP
//                           </Button>
//                         )}
//                       </Box>

//                       {/* Verify Button */}
//                       <Grid container spacing={1}>
//                         <Grid item xs={6}>
//                           <Button
//                             fullWidth
//                             variant="outlined"
//                             size="small"
//                             onClick={handleBackToRegistration}
//                             disabled={otpVerifying}
//                             sx={{
//                               py: { xs: 1, sm: 1.2 },
//                               borderRadius: { xs: 1.5, sm: 2 },
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                               borderColor: alpha(theme.palette.primary.main, 0.3),
//                               color: theme.palette.primary.main,
//                               '&:hover': {
//                                 borderColor: theme.palette.primary.main,
//                                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//                               },
//                             }}
//                           >
//                             Back
//                           </Button>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Button
//                             fullWidth
//                             variant="contained"
//                             size="small"
//                             onClick={handleVerifyOtp}
//                             disabled={otpVerifying || otp.join('').length !== 6}
//                             endIcon={otpVerifying ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <SendIcon sx={{ fontSize: 14 }} />}
//                             sx={{
//                               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                               color: 'white',
//                               py: { xs: 1, sm: 1.2 },
//                               borderRadius: { xs: 1.5, sm: 2 },
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                               '&:hover': {
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                               },
//                               '&.Mui-disabled': {
//                                 background: alpha(theme.palette.primary.main, 0.5),
//                               },
//                             }}
//                           >
//                             {otpVerifying ? 'Verifying...' : 'Verify OTP'}
//                           </Button>
//                         </Grid>
//                       </Grid>
//                     </>
//                   )}
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {activeStep === 0 && (
//               <>
//                 <Divider sx={{
//                   my: { xs: 2, sm: 2.5 },
//                   borderColor: alpha(theme.palette.primary.main, 0.1)
//                 }}>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: 'text.secondary',
//                       px: 1,
//                       fontSize: { xs: '0.65rem', sm: '0.7rem' }
//                     }}
//                   >
//                     OR
//                   </Typography>
//                 </Divider>

//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: 'text.secondary',
//                       fontSize: { xs: '0.7rem', sm: '0.75rem' }
//                     }}
//                   >
//                     Already have an account?{' '}
//                     <Link to="/login" style={{
//                       color: theme.palette.primary.main,
//                       textDecoration: 'none',
//                       fontWeight: 600,
//                     }}>
//                       Sign in
//                     </Link>
//                   </Typography>
//                 </Box>
//               </>
//             )}
//           </Card>

//           <Box sx={{ mt: 2.5, textAlign: 'center' }}>
//             <Link
//               to="/"
//               style={{
//                 color: theme.palette.text.secondary,
//                 textDecoration: 'none',
//                 fontSize: isMobile ? '0.7rem' : '0.75rem',
//                 transition: 'color 0.2s',
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
//               onMouseLeave={(e) => e.currentTarget.style.color = theme.palette.text.secondary}
//             >
//               ← Back to home
//             </Link>
//           </Box>
//         </motion.div>
//       </Box>
//     </Box>
//   );
// };

// export default Register; 


import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TextField, Button, Box, Typography, InputAdornment, IconButton, Alert, Card, Divider,
  useTheme, alpha, useMediaQuery, CircularProgress, Grid, Stepper, Step, StepLabel, Paper,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import VerifiedIcon from '@mui/icons-material/Verified';
import axios from 'axios';
import { resendEmailOTP, verifyEmailOTP } from '../../redux/slices/authSlice';
import Logo from '../../assets/logo31.png';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log("=========================================");
  console.log("📍 REGISTER PAGE LOADED");
  console.log("=========================================");
  console.log("📦 location.state:", location.state);
  console.log("📦 location.state?.selectedPlan:", location.state?.selectedPlan);

  const selectedPlan = location.state?.selectedPlan || (() => {
    const stored = sessionStorage.getItem('selectedPlan');
    console.log("💾 Reading from sessionStorage:", stored);
    return stored ? JSON.parse(stored) : null;
  })();

  console.log("✅ Final selectedPlan in Register:", selectedPlan);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [otpError, setOtpError] = useState('');

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const steps = ['Registration', 'Email Verification'];

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { fullName: '', email: '', phone: '', address: '', password: '', confirmPassword: '' },
  });

  const password = watch('password');

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    const strengthMap = { 0: { score: 0, label: 'Weak', color: '#ef4444' }, 1: { score: 1, label: 'Weak', color: '#ef4444' }, 2: { score: 2, label: 'Fair', color: '#f59e0b' }, 3: { score: 3, label: 'Good', color: '#10b981' }, 4: { score: 4, label: 'Strong', color: '#10b981' } };
    return strengthMap[score] || strengthMap[0];
  };
  const passwordStrength = getPasswordStrength(password);

  useEffect(() => {
    let interval;
    if (activeStep === 1 && timer > 0 && !canResend) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) setCanResend(true);
    return () => clearInterval(interval);
  }, [timer, canResend, activeStep]);

  const onSubmit = async (data) => {
    console.log("=========================================");
    console.log("📝 REGISTRATION FORM SUBMITTED");
    console.log("Form Data:", data);
    console.log("Selected Plan during registration:", selectedPlan);

    setError('');
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      const registrationData = { name: data.fullName, email: data.email, password: data.password, mobile_no: data.phone, address: data.address, role_id: "1", createdby: "null" };
      console.log("🚀 Sending registration API request:", registrationData);
      const response = await axios.post(`${BASE_URL}/users/register`, registrationData);
      console.log("✅ Registration API response:", response.data);
      if (response.data) {
        setSuccess(true);
        setRegisteredEmail(data.email);

        // IMPORTANT: Save selected plan to sessionStorage before moving to OTP step
        if (selectedPlan) {
          console.log("💾 Saving selected plan to sessionStorage during registration:", selectedPlan);
          sessionStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
          sessionStorage.setItem('fromPricing', 'true');
        }

        setTimeout(() => {
          setActiveStep(1);
          setSuccess(false);
          setTimer(60);
          setCanResend(false);
          console.log("➡️ Moving to OTP verification step");
        }, 1500);
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
      setError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
    } finally { setLoading(false); }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const pastedOtp = pastedData.split('');
    const newOtp = [...otp];
    pastedOtp.forEach((value, idx) => { if (idx < 6) newOtp[idx] = value; });
    setOtp(newOtp);
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    console.log("=========================================");
    console.log("🔐 OTP VERIFICATION");
    console.log("OTP Entered:", otpString);
    console.log("Email:", registeredEmail);
    console.log("Selected Plan during OTP:", selectedPlan);

    if (otpString.length !== 6) {
      setOtpError('Please enter complete 6-digit OTP');
      return;
    }
    setOtpVerifying(true);
    setOtpError('');
    try {
      const resultAction = await dispatch(verifyEmailOTP({ email: registeredEmail, otp: otpString }));
      console.log("OTP verification result:", resultAction);

      if (verifyEmailOTP.fulfilled.match(resultAction)) {
        console.log("✅ OTP VERIFIED SUCCESSFULLY!");
        setOtpSuccess(true);

        // IMPORTANT: Ensure selectedPlan is saved before redirect
        const planToPass = selectedPlan || (() => {
          const stored = sessionStorage.getItem('selectedPlan');
          return stored ? JSON.parse(stored) : null;
        })();

        if (planToPass) {
          console.log("💾 Saving selected plan to sessionStorage before redirect:", planToPass);
          sessionStorage.setItem('selectedPlan', JSON.stringify(planToPass));
        }

        console.log("🚀 Redirecting to login page with state:", { selectedPlan: planToPass });
        setTimeout(() => {
          navigate('/login', {
            state: {
              selectedPlan: planToPass,
              fromPricing: true,
              fromRegistration: true,
              message: 'Registration successful! Please login to continue.'
            }
          });
        }, 2000);
      } else {
        console.log("❌ OTP verification failed:", resultAction.payload);
        setOtpError(resultAction.payload?.message || 'Failed to verify OTP');
        setOtpSuccess(false);
      }
    } catch (error) {
      console.error("❌ OTP verification error:", error);
      setOtpError('An error occurred during verification');
      setOtpSuccess(false);
    } finally { setOtpVerifying(false); }
  };

  const handleResendOtp = async () => {
    console.log("=========================================");
    console.log("🔄 Resending OTP for email:", registeredEmail);
    setCanResend(false);
    setTimer(60);
    setOtpError('');
    try {
      const resultAction = await dispatch(resendEmailOTP({ email: registeredEmail }));
      console.log("Resend OTP result:", resultAction);
      if (resendEmailOTP.fulfilled.match(resultAction)) {
        console.log("✅ OTP resent successfully");
        setOtp(['', '', '', '', '', '']);
      } else {
        console.log("❌ Failed to resend OTP:", resultAction.payload);
        setOtpError(resultAction.payload?.message || 'Failed to resend OTP');
        setCanResend(true);
        setTimer(0);
      }
    } catch (error) {
      console.error("❌ Error resending OTP:", error);
      setOtpError('An error occurred while resending OTP');
      setCanResend(true);
      setTimer(0);
    }
  };

  const handleBackToRegistration = () => {
    console.log("⬅️ Going back to registration step");
    setActiveStep(0);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setOtpSuccess(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 50%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 2, sm: 3 }, px: { xs: 1, sm: 2 } }}>
      <Box sx={{ maxWidth: 700, width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box component="img" src={Logo} alt="Company Logo" sx={{ height: { xs: '28px', sm: '32px', md: '36px' }, width: 'auto', objectFit: 'contain', display: 'block', borderRadius: 0.8 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.primary.main, fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>Team Trackify</Typography>
              </Box>
            </Link>
            {selectedPlan && activeStep === 0 && (
              <Alert severity="info" sx={{ mb: 2, borderRadius: 1.5, fontSize: { xs: '0.7rem', sm: '0.75rem' }, bgcolor: alpha(theme.palette.primary.main, 0.05), border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}` }} icon={<PersonAddIcon sx={{ fontSize: 16 }} />}>
                You're registering to purchase <strong>{selectedPlan.name}</strong> plan.{selectedPlan.billingCycle === 'yearly' && ' (Yearly billing)'}<br /><small>Price: ₹{selectedPlan.price} / {selectedPlan.duration}</small>
              </Alert>
            )}
            <Stepper activeStep={activeStep} alternativeLabel={!isSmallMobile} sx={{ mb: 3, mt: 1 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconProps={{ sx: { '& .MuiStepIcon-text': { fontSize: '0.75rem' }, '&.Mui-active': { color: theme.palette.primary.main }, '&.Mui-completed': { color: theme.palette.primary.main } } }}>
                    <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>{label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Typography variant="h5" fontWeight="700" sx={{ color: 'text.primary', mb: 0.5, fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>{activeStep === 0 ? 'Create Admin Account' : 'Verify Your Email'}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>{activeStep === 0 ? 'Register as an administrator to manage your team' : `We've sent a verification code to ${registeredEmail}`}</Typography>
          </Box>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card sx={{ p: { xs: 2, sm: 3 }, boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, borderRadius: { xs: 2, sm: 2.5 } }}>
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div key="registration" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                  {success && <Alert severity="success" sx={{ mb: 2.5, borderRadius: 1.5 }}>Registration successful! Redirecting to verification...</Alert>}
                  {error && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 1.5 }}>{error}</Alert>}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Full Name" {...register('fullName', { required: 'Full name is required' })} error={!!errors.fullName} helperText={errors.fullName?.message} variant="outlined" size="small" disabled={loading || success} InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment> }} />
                      </Grid>
                      {/* <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email Address" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })} error={!!errors.email} helperText={errors.email?.message} variant="outlined" size="small" disabled={loading || success} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment> }} />
                      </Grid> */}<Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            },
                            validate: {
                              noDisposableEmail: (value) => {
                                const disposableDomains = [
                                  // Temporary/Disposable email domains
                                  'yopmail.com', 'yopmail.fr', 'yopmail.net', 'yopmail.org', 'yopmail.co', 'yopmail.co.uk', 'yopmail.de', 'yopmail.io', 'yopmail.me', 'yopmail.us', 'yopmail.biz', 'yopmail.info', 'yopmail.name', 'yopmail.pro', 'yopmail.xyz', 'nodemailer.com', 'nodemailer.org', 'nodemailer.net', 'mailinator.com', 'mailinator.net', 'mailinator.org', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz', 'guerrillamail.de', 'guerrillamail.info', 'guerrillamail.pro', 'guerrillamail.xyz', 'tempmail.com', 'tempmail.net', 'tempmail.org', 'temp-mail.org', 'temp-mail.com', '10minutemail.com', '10minutemail.net', '10minutemail.org', 'throwawaymail.com', 'throwawaymail.net', 'throwawaymail.org', 'dispostable.com', 'dispostable.net', 'dispostable.org', 'fakeinbox.com', 'fakeinbox.net', 'fakeinbox.org', 'getnada.com', 'getnada.net', 'getnada.org', 'mailnator.com', 'mailnator.net', 'mailnator.org', 'spambox.us', 'spambox.com', 'spambox.net', 'trashmail.com', 'trashmail.net', 'trashmail.org', 'trashmail.ws', 'maildrop.cc', 'maildrop.com', 'maildrop.net', 'maildrop.org', 'emailondeck.com', 'emailondeck.net', 'emailondeck.org', 'mailcatch.com', 'mailcatch.net', 'mailcatch.org', 'tempinbox.com', 'tempinbox.net', 'tempinbox.org', 'tempemail.net', 'tempemail.com', 'tempemail.org', 'mytrashmail.com', 'mytrashmail.net', 'mytrashmail.org', 'trash2009.com', 'trash2009.net', 'trash2009.org', 'spambog.com', 'spambog.net', 'spambog.org', 'spamhere.com', 'spamhere.net', 'spamhere.org', 'spamthis.com', 'spamthis.net', 'spamthis.org', 'deadaddress.com', 'deadaddress.net', 'deadaddress.org', 'mailmetrash.com', 'mailmetrash.net', 'mailmetrash.org', 'mailzilla.com', 'mailzilla.net', 'mailzilla.org', 'mintemail.com', 'mintemail.net', 'mintemail.org', 'mt2009.com', 'mt2009.net', 'mt2009.org', 'nada.ltd', 'pookmail.com', 'pookmail.net', 'pookmail.org', 'rcpt.at', 'rcpt.net', 'rcpt.org', 'sogetthis.com', 'sogetthis.net', 'sogetthis.org', 'spamfree24.com', 'spamfree24.net', 'spamfree24.org', 'spamfree24.de', 'spamfree24.eu', 'spamfree24.info', 'spamfree24.pro', 'spamfree24.xyz', 'tempinbox.co.uk', 'tempinbox.co', 'tempinbox.io', 'tempinbox.me', 'tempinbox.us', 'tempinbox.biz', 'tempinbox.info', 'tempinbox.pro', 'tempinbox.xyz', 'xagloo.com', 'xagloo.net', 'xagloo.org', 'xagloo.co', 'xagloo.io', 'xagloo.me', 'xagloo.us', 'xagloo.biz', 'xagloo.info', 'xagloo.pro', 'xagloo.xyz', 'guerrillamail.co', 'guerrillamail.io', 'guerrillamail.me', 'guerrillamail.us', 'guerrillamail.biz', 'guerrillamail.info', 'guerrillamail.pro', 'guerrillamail.xyz', 'mailinator.co', 'mailinator.io', 'mailinator.me', 'mailinator.us', 'mailinator.biz', 'mailinator.info', 'mailinator.pro', 'mailinator.xyz'
                                ];

                                const emailDomain = value?.split('@')[1]?.toLowerCase();

                                if (disposableDomains.includes(emailDomain)) {
                                  return 'Please use a valid email address. Temporary/disposable email addresses are not allowed';
                                }

                                // Also reject if domain contains yopmail or nodemailer (catch variations)
                                if (emailDomain?.includes('yopmail') || emailDomain?.includes('nodemailer')) {
                                  return 'Please use a valid email address. Email addresses from this domain are not allowed';
                                }

                                return true;
                              }
                            }
                          })}
                          error={!!errors.email}
                          helperText={errors.email?.message}
                          variant="outlined"
                          size="small"
                          disabled={loading || success}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment>
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Phone Number" type="tel" {...register('phone', { required: 'Phone number is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter exactly 10 digits only' } })} error={!!errors.phone} helperText={errors.phone?.message} variant="outlined" size="small" disabled={loading || success} inputProps={{ maxLength: 10, inputMode: 'numeric' }} onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment> }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Address" {...register('address', { required: 'Address is required', minLength: { value: 5, message: 'Address must be at least 5 characters' } })} error={!!errors.address} helperText={errors.address?.message} variant="outlined" size="small" disabled={loading || success} InputProps={{ startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment> }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' }, validate: { hasUpperCase: (v) => /[A-Z]/.test(v) || 'Must contain at least one uppercase letter', hasNumber: (v) => /[0-9]/.test(v) || 'Must contain at least one number', hasSpecialChar: (v) => /[^A-Za-z0-9]/.test(v) || 'Must contain at least one special character' } })} error={!!errors.password} helperText={errors.password?.message} variant="outlined" size="small" disabled={loading || success} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">{showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}</IconButton></InputAdornment> }} />
                          {password && !success && <Box sx={{ mt: 1 }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}><Box sx={{ flex: 1, height: 4, bgcolor: alpha(theme.palette.divider, 0.2), borderRadius: 2, display: 'flex', gap: 0.5 }}>{[1, 2, 3, 4].map((level) => (<Box key={level} sx={{ flex: 1, height: '100%', borderRadius: 2, bgcolor: level <= passwordStrength.score ? passwordStrength.color : 'transparent', transition: 'background-color 0.3s ease' }} />))}</Box><Typography variant="caption" sx={{ fontSize: '0.65rem', color: passwordStrength.color, fontWeight: 500 }}>{passwordStrength.label}</Typography></Box><Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>Use at least 6 characters with uppercase, number & special character</Typography></Box>}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Confirm Password" type={showPassword ? 'text' : 'password'} {...register('confirmPassword', { required: 'Please confirm your password', validate: (v) => v === password || 'Passwords do not match' })} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} variant="outlined" size="small" disabled={loading || success} InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment> }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05), p: 1.5, borderRadius: 1.5, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}><Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Account Type</Typography><Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem', color: theme.palette.primary.main }}>Administrator</Typography></Box>
                      </Grid>
                      <Grid item xs={12}>
                        <motion.div whileHover={{ scale: loading || success ? 1 : 1.02 }} whileTap={{ scale: loading || success ? 1 : 0.98 }}>
                          <Button type="submit" variant="contained" size="small" fullWidth disabled={loading || success} endIcon={loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <PersonAddIcon sx={{ fontSize: 16 }} />} sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, color: 'white', py: { xs: 1, sm: 1.2 }, borderRadius: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.8rem', sm: '0.85rem' }, '&:hover': { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` }, '&.Mui-disabled': { background: alpha(theme.palette.primary.main, 0.5) } }}>{loading ? 'Creating account...' : success ? 'Registration successful!' : 'Create Admin Account'}</Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </form>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {otpSuccess ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <VerifiedIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
                      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 1, color: 'text.primary' }}>Email Verified Successfully!</Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 2 }}>{selectedPlan ? 'Redirecting to login to complete your purchase...' : 'Redirecting to login page...'}</Typography>
                      <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
                    </Box>
                  ) : (
                    <>
                      {otpError && <Alert severity="error" sx={{ mb: 2.5, borderRadius: 1.5 }} onClose={() => setOtpError('')}>{otpError}</Alert>}
                      <Box sx={{ textAlign: 'center', mb: 3 }}><Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>Enter the 6-digit verification code sent to</Typography><Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.9rem', color: theme.palette.primary.main }}>{registeredEmail}</Typography></Box>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, sm: 1 }, mb: 3 }}>
                        {otp.map((digit, index) => (<Paper key={index} elevation={0} sx={{ width: { xs: 40, sm: 48 }, height: { xs: 48, sm: 56 }, border: `1px solid ${otpError ? '#ef4444' : alpha(theme.palette.primary.main, 0.2)}`, borderRadius: 1.5, overflow: 'hidden' }}><input id={`otp-${index}`} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(index, e)} onPaste={index === 0 ? handleOtpPaste : undefined} disabled={otpVerifying} style={{ width: '100%', height: '100%', textAlign: 'center', fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 600, border: 'none', outline: 'none', backgroundColor: 'transparent', color: theme.palette.text.primary }} /></Paper>))}
                      </Box>
                      <Box sx={{ textAlign: 'center', mb: 3 }}>{!canResend ? <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Resend code in <span style={{ color: theme.palette.primary.main, fontWeight: 600 }}>{timer}s</span></Typography> : <Button variant="text" size="small" onClick={handleResendOtp} disabled={otpVerifying} sx={{ color: theme.palette.primary.main, fontSize: '0.7rem', textTransform: 'none', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) } }}>Resend OTP</Button>}</Box>
                      <Grid container spacing={1}>
                        <Grid item xs={6}><Button fullWidth variant="outlined" size="small" onClick={handleBackToRegistration} disabled={otpVerifying} sx={{ py: { xs: 1, sm: 1.2 }, borderRadius: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.7rem', sm: '0.75rem' }, borderColor: alpha(theme.palette.primary.main, 0.3), color: theme.palette.primary.main, '&:hover': { borderColor: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.05) } }}>Back</Button></Grid>
                        <Grid item xs={6}><Button fullWidth variant="contained" size="small" onClick={handleVerifyOtp} disabled={otpVerifying || otp.join('').length !== 6} endIcon={otpVerifying ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <SendIcon sx={{ fontSize: 14 }} />} sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, color: 'white', py: { xs: 1, sm: 1.2 }, borderRadius: { xs: 1.5, sm: 2 }, fontSize: { xs: '0.7rem', sm: '0.75rem' }, '&:hover': { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` }, '&.Mui-disabled': { background: alpha(theme.palette.primary.main, 0.5) } }}>{otpVerifying ? 'Verifying...' : 'Verify OTP'}</Button></Grid>
                      </Grid>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {activeStep === 0 && (
              <>
                <Divider sx={{ my: { xs: 2, sm: 2.5 }, borderColor: alpha(theme.palette.primary.main, 0.1) }}><Typography variant="caption" sx={{ color: 'text.secondary', px: 1, fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>OR</Typography></Divider>
                <Box sx={{ textAlign: 'center' }}><Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Already have an account?{' '}<Link to={selectedPlan ? `/login` : "/login"} state={{ selectedPlan: selectedPlan }} style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 600 }}>Sign in</Link></Typography></Box>
              </>
            )}
          </Card>
          <Box sx={{ mt: 2.5, textAlign: 'center' }}><Link to="/" style={{ color: theme.palette.text.secondary, textDecoration: 'none', fontSize: isMobile ? '0.7rem' : '0.75rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main} onMouseLeave={(e) => e.currentTarget.style.color = theme.palette.text.secondary}>← Back to home</Link></Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Register;