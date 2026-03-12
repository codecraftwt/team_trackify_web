// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
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
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import PersonIcon from '@mui/icons-material/Person';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

// const Register = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

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

//   const onSubmit = async (data) => {
//     setError('');
//     setLoading(true);

//     // Basic client-side confirmation (already validated, but double-check)
//     if (data.password !== data.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Prepare registration data according to your API format
//       const registrationData = {
//         name: data.fullName,
//         email: data.email,
//         password: data.password,
//         mobile_no: data.phone,
//         address: data.address,
//         role_id: "1", // Default role_id = 1 (Admin)
//         createdby: "67b123456789012345678901" // You might want to get this from logged-in user or context
//       };

//       // Make API call to register
//       const response = await axios.post(`${BASE_URL}/users/register`, registrationData);

//       if (response.data) {
//         setSuccess(true);
        
//         // Show success message briefly before redirecting
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
//     } finally {
//       setLoading(false);
//     }
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
//       <Box sx={{ maxWidth: 450, width: '100%' }}>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <Link to="/" style={{ textDecoration: 'none' }}>
//               <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 <Box
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
//                 </Box>
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
//             <Typography 
//               variant="h5" 
//               fontWeight="700" 
//               sx={{ 
//                 color: 'text.primary', 
//                 mb: 0.5,
//                 fontSize: { xs: '1.3rem', sm: '1.5rem' }
//               }}
//             >
//               Create Admin Account
//             </Typography>
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: 'text.secondary',
//                 fontSize: { xs: '0.75rem', sm: '0.8rem' }
//               }}
//             >
//               Register as an administrator to manage your team
//             </Typography>
//           </Box>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card sx={{ 
//             p: { xs: 2, sm: 2.5 }, 
//             boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             borderRadius: { xs: 2, sm: 2.5 },
//           }}>
//             {/* Success Message */}
//             {success && (
//               <Alert 
//                 severity="success" 
//                 sx={{ 
//                   mb: 2.5,
//                   border: '1px solid', 
//                   borderColor: alpha('#10b981', 0.2),
//                   borderRadius: 1.5,
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                   py: 0.5,
//                 }}
//               >
//                 Registration successful! Redirecting to login...
//               </Alert>
//             )}

//             {/* Error Message */}
//             {error && (
//               <Alert 
//                 severity="error" 
//                 sx={{ 
//                   mb: 2.5,
//                   border: '1px solid', 
//                   borderColor: alpha('#ef4444', 0.2),
//                   borderRadius: 1.5,
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                   py: 0.5,
//                 }}
//               >
//                 {error}
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
//                 {/* Full Name */}
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   {...register('fullName', {
//                     required: 'Full name is required',
//                     minLength: {
//                       value: 2,
//                       message: 'Name must be at least 2 characters',
//                     },
//                     maxLength: {
//                       value: 50,
//                       message: 'Name must not exceed 50 characters',
//                     },
//                     pattern: {
//                       value: /^[A-Za-z\s]+$/,
//                       message: 'Name can only contain letters and spaces',
//                     },
//                   })}
//                   error={!!errors.fullName}
//                   helperText={errors.fullName?.message}
//                   variant="outlined"
//                   size="small"
//                   disabled={loading || success}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiFormHelperText-root': {
//                       fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />

//                 {/* Email */}
//                 <TextField
//                   fullWidth
//                   label="Email Address"
//                   type="email"
//                   {...register('email', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: 'Invalid email address',
//                     },
//                   })}
//                   error={!!errors.email}
//                   helperText={errors.email?.message}
//                   variant="outlined"
//                   size="small"
//                   disabled={loading || success}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiFormHelperText-root': {
//                       fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />

//                 {/* Phone (required) */}
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   type="tel"
//                   {...register('phone', {
//                     required: 'Phone number is required',
//                     pattern: {
//                       value: /^[0-9]{10}$/,
//                       message: 'Phone number must be 10 digits',
//                     },
//                   })}
//                   error={!!errors.phone}
//                   helperText={errors.phone?.message}
//                   variant="outlined"
//                   size="small"
//                   disabled={loading || success}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiFormHelperText-root': {
//                       fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />

//                 {/* Address (required) */}
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   {...register('address', {
//                     required: 'Address is required',
//                     minLength: {
//                       value: 5,
//                       message: 'Address must be at least 5 characters',
//                     },
//                   })}
//                   error={!!errors.address}
//                   helperText={errors.address?.message}
//                   variant="outlined"
//                   size="small"
//                   multiline
//                   rows={2}
//                   disabled={loading || success}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiFormHelperText-root': {
//                       fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />

//                 {/* Password with Strength Indicator */}
//                 <Box>
//                   <TextField
//                     fullWidth
//                     label="Password"
//                     type={showPassword ? 'text' : 'password'}
//                     {...register('password', {
//                       required: 'Password is required',
//                       minLength: {
//                         value: 6,
//                         message: 'Password must be at least 6 characters',
//                       },
//                       validate: {
//                         hasUpperCase: (value) => 
//                           /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
//                         hasNumber: (value) => 
//                           /[0-9]/.test(value) || 'Must contain at least one number',
//                         hasSpecialChar: (value) => 
//                           /[^A-Za-z0-9]/.test(value) || 'Must contain at least one special character',
//                       },
//                     })}
//                     error={!!errors.password}
//                     helperText={errors.password?.message}
//                     variant="outlined"
//                     size="small"
//                     disabled={loading || success}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                         </InputAdornment>
//                       ),
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             onClick={() => setShowPassword(!showPassword)}
//                             edge="end"
//                             sx={{ color: theme.palette.primary.main }}
//                             size="small"
//                             disabled={loading || success}
//                           >
//                             {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiFormHelperText-root': {
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   />
                  
//                   {/* Password Strength Indicator */}
//                   {password && !success && (
//                     <Box sx={{ mt: 1 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//                         <Box sx={{ 
//                           flex: 1, 
//                           height: 4, 
//                           bgcolor: alpha(theme.palette.divider, 0.2),
//                           borderRadius: 2,
//                           display: 'flex',
//                           gap: 0.5,
//                         }}>
//                           {[1, 2, 3, 4].map((level) => (
//                             <Box
//                               key={level}
//                               sx={{
//                                 flex: 1,
//                                 height: '100%',
//                                 borderRadius: 2,
//                                 bgcolor: level <= passwordStrength.score ? passwordStrength.color : 'transparent',
//                                 transition: 'background-color 0.3s ease',
//                               }}
//                             />
//                           ))}
//                         </Box>
//                         <Typography 
//                           variant="caption" 
//                           sx={{ 
//                             fontSize: '0.65rem',
//                             color: passwordStrength.color,
//                             fontWeight: 500,
//                           }}
//                         >
//                           {passwordStrength.label}
//                         </Typography>
//                       </Box>
//                       <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                         Use at least 6 characters with uppercase, number & special character
//                       </Typography>
//                     </Box>
//                   )}
//                 </Box>

//                 {/* Confirm Password */}
//                 <TextField
//                   fullWidth
//                   label="Confirm Password"
//                   type={showPassword ? 'text' : 'password'}
//                   {...register('confirmPassword', {
//                     required: 'Please confirm your password',
//                     validate: (value) => value === password || 'Passwords do not match',
//                   })}
//                   error={!!errors.confirmPassword}
//                   helperText={errors.confirmPassword?.message}
//                   variant="outlined"
//                   size="small"
//                   disabled={loading || success}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiFormHelperText-root': {
//                       fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />

//                 {/* Role Info - Display only */}
//                 <Box sx={{ 
//                   bgcolor: alpha(theme.palette.primary.main, 0.05), 
//                   p: 1.5, 
//                   borderRadius: 1.5,
//                   border: '1px solid',
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                 }}>
//                   <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                     Account Type
//                   </Typography>
//                   <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem', color: theme.palette.primary.main }}>
//                     Administrator 
//                   </Typography>
//                 </Box>

//                 <motion.div whileHover={{ scale: loading || success ? 1 : 1.02 }} whileTap={{ scale: loading || success ? 1 : 0.98 }}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     size="small"
//                     fullWidth
//                     disabled={loading || success}
//                     endIcon={loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <PersonAddIcon sx={{ fontSize: 16 }} />}
//                     sx={{
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                       color: 'white',
//                       py: { xs: 1, sm: 1.2 },
//                       borderRadius: { xs: 1.5, sm: 2 },
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       '&:hover': {
//                         background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                       },
//                       '&.Mui-disabled': {
//                         background: alpha(theme.palette.primary.main, 0.5),
//                       },
//                     }}
//                   >
//                     {loading ? 'Creating account...' : success ? 'Registration successful!' : 'Create Admin Account'}
//                   </Button>
//                 </motion.div>
//               </Box>
//             </form>

//             <Divider sx={{ 
//               my: { xs: 2, sm: 2.5 }, 
//               borderColor: alpha(theme.palette.primary.main, 0.1) 
//             }}>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: 'text.secondary',
//                   px: 1,
//                   fontSize: { xs: '0.65rem', sm: '0.7rem' }
//                 }}
//               >
//                 OR
//               </Typography>
//             </Divider>

//             <Box sx={{ textAlign: 'center' }}>
//               <Typography 
//                 variant="body2" 
//                 sx={{ 
//                   color: 'text.secondary',
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' }
//                 }}
//               >
//                 Already have an account?{' '}
//                 <Link to="/login" style={{ 
//                   color: theme.palette.primary.main,
//                   textDecoration: 'none',
//                   fontWeight: 600,
//                 }}>
//                   Sign in
//                 </Link>
//               </Typography>
//             </Box>
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





// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
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
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import PersonIcon from '@mui/icons-material/Person';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PhoneIcon from '@mui/icons-material/Phone';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

// const Register = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

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

//   const onSubmit = async (data) => {
//     setError('');
//     setLoading(true);

//     // Basic client-side confirmation (already validated, but double-check)
//     if (data.password !== data.confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       // Prepare registration data according to your API format
//       const registrationData = {
//         name: data.fullName,
//         email: data.email,
//         password: data.password,
//         mobile_no: data.phone,
//         address: data.address,
//         role_id: "1", // Default role_id = 1 (Admin)
//         createdby: "67b123456789012345678901" // You might want to get this from logged-in user or context
//       };

//       // Make API call to register
//       const response = await axios.post(`${BASE_URL}/users/register`, registrationData);

//       if (response.data) {
//         setSuccess(true);
        
//         // Show success message briefly before redirecting
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
//     } finally {
//       setLoading(false);
//     }
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
//                 <Box
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
//                 </Box>
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
//             <Typography 
//               variant="h5" 
//               fontWeight="700" 
//               sx={{ 
//                 color: 'text.primary', 
//                 mb: 0.5,
//                 fontSize: { xs: '1.3rem', sm: '1.5rem' }
//               }}
//             >
//               Create Admin Account
//             </Typography>
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: 'text.secondary',
//                 fontSize: { xs: '0.75rem', sm: '0.8rem' }
//               }}
//             >
//               Register as an administrator to manage your team
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
//             {/* Success Message */}
//             {success && (
//               <Alert 
//                 severity="success" 
//                 sx={{ 
//                   mb: 2.5,
//                   border: '1px solid', 
//                   borderColor: alpha('#10b981', 0.2),
//                   borderRadius: 1.5,
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                   py: 0.5,
//                 }}
//               >
//                 Registration successful! Redirecting to login...
//               </Alert>
//             )}

//             {/* Error Message */}
//             {error && (
//               <Alert 
//                 severity="error" 
//                 sx={{ 
//                   mb: 2.5,
//                   border: '1px solid', 
//                   borderColor: alpha('#ef4444', 0.2),
//                   borderRadius: 1.5,
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                   py: 0.5,
//                 }}
//               >
//                 {error}
//               </Alert>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Grid container spacing={2.5}>
//                 {/* Full Name */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Full Name"
//                     {...register('fullName', {
//                       required: 'Full name is required',
//                       minLength: {
//                         value: 2,
//                         message: 'Name must be at least 2 characters',
//                       },
//                       maxLength: {
//                         value: 50,
//                         message: 'Name must not exceed 50 characters',
//                       },
//                       pattern: {
//                         value: /^[A-Za-z\s]+$/,
//                         message: 'Name can only contain letters and spaces',
//                       },
//                     })}
//                     error={!!errors.fullName}
//                     helperText={errors.fullName?.message}
//                     variant="outlined"
//                     size="small"
//                     disabled={loading || success}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiFormHelperText-root': {
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>

//                 {/* Email */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Email Address"
//                     type="email"
//                     {...register('email', {
//                       required: 'Email is required',
//                       pattern: {
//                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                         message: 'Invalid email address',
//                       },
//                     })}
//                     error={!!errors.email}
//                     helperText={errors.email?.message}
//                     variant="outlined"
//                     size="small"
//                     disabled={loading || success}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiFormHelperText-root': {
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>

//                 {/* Phone (required) */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Phone Number"
//                     type="tel"
//                     {...register('phone', {
//                       required: 'Phone number is required',
//                       pattern: {
//                         value: /^[0-9]{10}$/,
//                         message: 'Phone number must be 10 digits',
//                       },
//                     })}
//                     error={!!errors.phone}
//                     helperText={errors.phone?.message}
//                     variant="outlined"
//                     size="small"
//                     disabled={loading || success}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiFormHelperText-root': {
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>

//                 {/* Address (required) */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Address"
//                     {...register('address', {
//                       required: 'Address is required',
//                       minLength: {
//                         value: 5,
//                         message: 'Address must be at least 5 characters',
//                       },
//                     })}
//                     error={!!errors.address}
//                     helperText={errors.address?.message}
//                     variant="outlined"
//                     size="small"
//                     multiline
//                     rows={2}
//                     disabled={loading || success}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiFormHelperText-root': {
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>

//                 {/* Password with Strength Indicator */}
//                 <Grid item xs={12} sm={6}>
//                   <Box>
//                     <TextField
//                       fullWidth
//                       label="Password"
//                       type={showPassword ? 'text' : 'password'}
//                       {...register('password', {
//                         required: 'Password is required',
//                         minLength: {
//                           value: 6,
//                           message: 'Password must be at least 6 characters',
//                         },
//                         validate: {
//                           hasUpperCase: (value) => 
//                             /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
//                           hasNumber: (value) => 
//                             /[0-9]/.test(value) || 'Must contain at least one number',
//                           hasSpecialChar: (value) => 
//                             /[^A-Za-z0-9]/.test(value) || 'Must contain at least one special character',
//                         },
//                       })}
//                       error={!!errors.password}
//                       helperText={errors.password?.message}
//                       variant="outlined"
//                       size="small"
//                       disabled={loading || success}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                           </InputAdornment>
//                         ),
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={() => setShowPassword(!showPassword)}
//                               edge="end"
//                               sx={{ color: theme.palette.primary.main }}
//                               size="small"
//                               disabled={loading || success}
//                             >
//                               {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                         },
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         },
//                         '& .MuiOutlinedInput-root': {
//                           borderRadius: 1.5,
//                           '&:hover fieldset': {
//                             borderColor: theme.palette.primary.main,
//                           },
//                         },
//                       }}
//                     />
                    
//                     {/* Password Strength Indicator */}
//                     {password && !success && (
//                       <Box sx={{ mt: 1 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
//                           <Box sx={{ 
//                             flex: 1, 
//                             height: 4, 
//                             bgcolor: alpha(theme.palette.divider, 0.2),
//                             borderRadius: 2,
//                             display: 'flex',
//                             gap: 0.5,
//                           }}>
//                             {[1, 2, 3, 4].map((level) => (
//                               <Box
//                                 key={level}
//                                 sx={{
//                                   flex: 1,
//                                   height: '100%',
//                                   borderRadius: 2,
//                                   bgcolor: level <= passwordStrength.score ? passwordStrength.color : 'transparent',
//                                   transition: 'background-color 0.3s ease',
//                                 }}
//                               />
//                             ))}
//                           </Box>
//                           <Typography 
//                             variant="caption" 
//                             sx={{ 
//                               fontSize: '0.65rem',
//                               color: passwordStrength.color,
//                               fontWeight: 500,
//                             }}
//                           >
//                             {passwordStrength.label}
//                           </Typography>
//                         </Box>
//                         <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                           Use at least 6 characters with uppercase, number & special character
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>
//                 </Grid>

//                 {/* Confirm Password */}
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Confirm Password"
//                     type={showPassword ? 'text' : 'password'}
//                     {...register('confirmPassword', {
//                       required: 'Please confirm your password',
//                       validate: (value) => value === password || 'Passwords do not match',
//                     })}
//                     error={!!errors.confirmPassword}
//                     helperText={errors.confirmPassword?.message}
//                     variant="outlined"
//                     size="small"
//                     disabled={loading || success}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiFormHelperText-root': {
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>

//                 {/* Role Info - Display only */}
//                 <Grid item xs={12}>
//                   <Box sx={{ 
//                     bgcolor: alpha(theme.palette.primary.main, 0.05), 
//                     p: 1.5, 
//                     borderRadius: 1.5,
//                     border: '1px solid',
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                   }}>
//                     <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                       Account Type
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem', color: theme.palette.primary.main }}>
//                       Administrator 
//                     </Typography>
//                   </Box>
//                 </Grid>

//                 {/* Submit Button */}
//                 <Grid item xs={12}>
//                   <motion.div whileHover={{ scale: loading || success ? 1 : 1.02 }} whileTap={{ scale: loading || success ? 1 : 0.98 }}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       size="small"
//                       fullWidth
//                       disabled={loading || success}
//                       endIcon={loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <PersonAddIcon sx={{ fontSize: 16 }} />}
//                       sx={{
//                         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                         color: 'white',
//                         py: { xs: 1, sm: 1.2 },
//                         borderRadius: { xs: 1.5, sm: 2 },
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                         '&:hover': {
//                           background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                         },
//                         '&.Mui-disabled': {
//                           background: alpha(theme.palette.primary.main, 0.5),
//                         },
//                       }}
//                     >
//                       {loading ? 'Creating account...' : success ? 'Registration successful!' : 'Create Admin Account'}
//                     </Button>
//                   </motion.div>
//                 </Grid>
//               </Grid>
//             </form>

//             <Divider sx={{ 
//               my: { xs: 2, sm: 2.5 }, 
//               borderColor: alpha(theme.palette.primary.main, 0.1) 
//             }}>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: 'text.secondary',
//                   px: 1,
//                   fontSize: { xs: '0.65rem', sm: '0.7rem' }
//                 }}
//               >
//                 OR
//               </Typography>
//             </Divider>

//             <Box sx={{ textAlign: 'center' }}>
//               <Typography 
//                 variant="body2" 
//                 sx={{ 
//                   color: 'text.secondary',
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' }
//                 }}
//               >
//                 Already have an account?{' '}
//                 <Link to="/login" style={{ 
//                   color: theme.palette.primary.main,
//                   textDecoration: 'none',
//                   fontWeight: 600,
//                 }}>
//                   Sign in
//                 </Link>
//               </Typography>
//             </Box>
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













//////////////Verify
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TextField,
  Button, 
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Card,
  Divider,
  useTheme,
  alpha,
  useMediaQuery,
  CircularProgress,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
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
import Logo from '../../assets/logo31.png'
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // OTP verification states
  const [activeStep, setActiveStep] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Get auth state from Redux
  const { isLoading: reduxLoading } = useSelector((state) => state.auth || {});

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const steps = ['Registration', 'Email Verification'];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  // Password strength validation
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    const strengthMap = {
      0: { score: 0, label: 'Weak', color: '#ef4444' },
      1: { score: 1, label: 'Weak', color: '#ef4444' },
      2: { score: 2, label: 'Fair', color: '#f59e0b' },
      3: { score: 3, label: 'Good', color: '#10b981' },
      4: { score: 4, label: 'Strong', color: '#10b981' },
    };
    
    return strengthMap[score] || strengthMap[0];
  };

  const passwordStrength = getPasswordStrength(password);

  // Timer for resend OTP
  React.useEffect(() => {
    let interval;
    if (activeStep === 1 && timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend, activeStep]);

  // Handle registration submission
  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    // Basic client-side validation
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Prepare registration data according to API format
      const registrationData = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        mobile_no: data.phone,
        address: data.address,
        role_id: "1", // Default role_id = 1 (Admin)
        createdby: "67b123456789012345678901" // You might want to get this from logged-in user or context
      };

      // Make API call to register
      const response = await axios.post(`${BASE_URL}/users/register`, registrationData);

      if (response.data) {
        setSuccess(true);
        setRegisteredEmail(data.email);
        
        // Move to OTP verification step after successful registration
        setTimeout(() => {
          setActiveStep(1);
          setSuccess(false);
          setTimer(60);
          setCanResend(false);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP key down (backspace)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e) => {
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
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setOtpError('Please enter complete 6-digit OTP');
      return;
    }

    setOtpVerifying(true);
    setOtpError('');

    try {
      const resultAction = await dispatch(verifyEmailOTP({ 
        email: registeredEmail, 
        otp: otpString 
      }));

      if (verifyEmailOTP.fulfilled.match(resultAction)) {
        setOtpSuccess(true);
        
        // Show success and redirect to login
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setOtpError(resultAction.payload?.message || 'Failed to verify OTP');
      }
    } catch (error) {
      setOtpError('An error occurred during verification');
    } finally {
      setOtpVerifying(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    setCanResend(false);
    setTimer(60);
    setOtpError('');
    
    try {
      const resultAction = await dispatch(resendEmailOTP({ email: registeredEmail }));
      
      if (resendEmailOTP.fulfilled.match(resultAction)) {
        // OTP resent successfully
        setOtp(['', '', '', '', '', '']);
      } else {
        setOtpError(resultAction.payload?.message || 'Failed to resend OTP');
        setCanResend(true);
        setTimer(0);
      }
    } catch (error) {
      setOtpError('An error occurred while resending OTP');
      setCanResend(true);
      setTimer(0);
    }
  };

  // Go back to registration step
  const handleBackToRegistration = () => {
    setActiveStep(0);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setOtpSuccess(false);
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
      <Box sx={{ maxWidth: 700, width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {/* <Box
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
                </Box> */}

                   <Box
                                  component="img"
                                  src={Logo}
                                  alt="Company Logo"
                                  sx={{
                                    height: { xs: '28px', sm: '32px', md: '36px' },
                                    width: 'auto',
                                    objectFit: 'contain',
                                    display: 'block',
                                    borderRadius:0.8
                                  }}
                                />
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

            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel={!isSmallMobile} sx={{ mb: 3, mt: 1 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        '& .MuiStepIcon-text': {
                          fontSize: '0.75rem',
                        },
                        '&.Mui-active': {
                          color: theme.palette.primary.main,
                        },
                        '&.Mui-completed': {
                          color: theme.palette.primary.main,
                        },
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Typography 
              variant="h5" 
              fontWeight="700" 
              sx={{ 
                color: 'text.primary', 
                mb: 0.5,
                fontSize: { xs: '1.3rem', sm: '1.5rem' }
              }}
            >
              {activeStep === 0 ? 'Create Admin Account' : 'Verify Your Email'}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', sm: '0.8rem' }
              }}
            >
              {activeStep === 0 
                ? 'Register as an administrator to manage your team' 
                : `We've sent a verification code to ${registeredEmail}`}
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card sx={{ 
            p: { xs: 2, sm: 3 }, 
            boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: { xs: 2, sm: 2.5 },
          }}>
            <AnimatePresence mode="wait">
              {/* Registration Step */}
              {activeStep === 0 && (
                <motion.div
                  key="registration"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Success Message */}
                  {success && (
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 2.5,
                        border: '1px solid', 
                        borderColor: alpha('#10b981', 0.2),
                        borderRadius: 1.5,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        py: 0.5,
                      }}
                    >
                      Registration successful! Redirecting to verification...
                    </Alert>
                  )}

                  {/* Error Message */}
                  {error && (
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 2.5,
                        border: '1px solid', 
                        borderColor: alpha('#ef4444', 0.2),
                        borderRadius: 1.5,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        py: 0.5,
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2.5}>
                      {/* Full Name */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          {...register('fullName', {
                            required: 'Full name is required',
                            minLength: {
                              value: 2,
                              message: 'Name must be at least 2 characters',
                            },
                            maxLength: {
                              value: 50,
                              message: 'Name must not exceed 50 characters',
                            },
                            pattern: {
                              value: /^[A-Za-z\s]+$/,
                              message: 'Name can only contain letters and spaces',
                            },
                          })}
                          error={!!errors.fullName}
                          helperText={errors.fullName?.message}
                          variant="outlined"
                          size="small"
                          disabled={loading || success}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
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
                      </Grid>

                      {/* Email */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
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
                          disabled={loading || success}
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
                      </Grid>

                      {/* Phone (required) */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          type="tel"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: 'Phone number must be 10 digits',
                            },
                          })}
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                          variant="outlined"
                          size="small"
                          disabled={loading || success}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
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
                      </Grid>

                      {/* Address (required) */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Address"
                          {...register('address', {
                            required: 'Address is required',
                            minLength: {
                              value: 5,
                              message: 'Address must be at least 5 characters',
                            },
                          })}
                          error={!!errors.address}
                          helperText={errors.address?.message}
                          variant="outlined"
                          size="small"
                          multiline
                          rows={2}
                          disabled={loading || success}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
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
                      </Grid>

                      {/* Password with Strength Indicator */}
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                              required: 'Password is required',
                              minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                              },
                              validate: {
                                hasUpperCase: (value) => 
                                  /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
                                hasNumber: (value) => 
                                  /[0-9]/.test(value) || 'Must contain at least one number',
                                hasSpecialChar: (value) => 
                                  /[^A-Za-z0-9]/.test(value) || 'Must contain at least one special character',
                              },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            variant="outlined"
                            size="small"
                            disabled={loading || success}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    sx={{ color: theme.palette.primary.main }}
                                    size="small"
                                    disabled={loading || success}
                                  >
                                    {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                                  </IconButton>
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
                          
                          {/* Password Strength Indicator */}
                          {password && !success && (
                            <Box sx={{ mt: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Box sx={{ 
                                  flex: 1, 
                                  height: 4, 
                                  bgcolor: alpha(theme.palette.divider, 0.2),
                                  borderRadius: 2,
                                  display: 'flex',
                                  gap: 0.5,
                                }}>
                                  {[1, 2, 3, 4].map((level) => (
                                    <Box
                                      key={level}
                                      sx={{
                                        flex: 1,
                                        height: '100%',
                                        borderRadius: 2,
                                        bgcolor: level <= passwordStrength.score ? passwordStrength.color : 'transparent',
                                        transition: 'background-color 0.3s ease',
                                      }}
                                    />
                                  ))}
                                </Box>
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    fontSize: '0.65rem',
                                    color: passwordStrength.color,
                                    fontWeight: 500,
                                  }}
                                >
                                  {passwordStrength.label}
                                </Typography>
                              </Box>
                              <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                                Use at least 6 characters with uppercase, number & special character
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>

                      {/* Confirm Password */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Confirm Password"
                          type={showPassword ? 'text' : 'password'}
                          {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === password || 'Passwords do not match',
                          })}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword?.message}
                          variant="outlined"
                          size="small"
                          disabled={loading || success}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
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
                      </Grid>

                      {/* Role Info - Display only */}
                      <Grid item xs={12}>
                        <Box sx={{ 
                          bgcolor: alpha(theme.palette.primary.main, 0.05), 
                          p: 1.5, 
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.1),
                        }}>
                          <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                            Account Type
                          </Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem', color: theme.palette.primary.main }}>
                            Administrator 
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Submit Button */}
                      <Grid item xs={12}>
                        <motion.div whileHover={{ scale: loading || success ? 1 : 1.02 }} whileTap={{ scale: loading || success ? 1 : 0.98 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="small"
                            fullWidth
                            disabled={loading || success}
                            endIcon={loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <PersonAddIcon sx={{ fontSize: 16 }} />}
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
                            {loading ? 'Creating account...' : success ? 'Registration successful!' : 'Create Admin Account'}
                          </Button>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </form>
                </motion.div>
              )}

              {/* OTP Verification Step */}
              {activeStep === 1 && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {otpSuccess ? (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <VerifiedIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
                      <Typography variant="h6" sx={{ fontSize: '1rem', mb: 1, color: 'text.primary' }}>
                        Email Verified Successfully!
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 2 }}>
                        Redirecting to login page...
                      </Typography>
                      <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
                    </Box>
                  ) : (
                    <>
                      {/* OTP Error Message */}
                      {otpError && (
                        <Alert 
                          severity="error" 
                          sx={{ 
                            mb: 2.5,
                            border: '1px solid', 
                            borderColor: alpha('#ef4444', 0.2),
                            borderRadius: 1.5,
                            fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          }}
                          onClose={() => setOtpError('')}
                        >
                          {otpError}
                        </Alert>
                      )}

                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>
                          Enter the 6-digit verification code sent to
                        </Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ fontSize: '0.9rem', color: theme.palette.primary.main }}>
                          {registeredEmail}
                        </Typography>
                      </Box>

                      {/* OTP Input Boxes */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, sm: 1 }, mb: 3 }}>
                        {otp.map((digit, index) => (
                          <Paper
                            key={index}
                            elevation={0}
                            sx={{
                              width: { xs: 40, sm: 48 },
                              height: { xs: 48, sm: 56 },
                              border: '1px solid',
                              borderColor: otpError ? '#ef4444' : alpha(theme.palette.primary.main, 0.2),
                              borderRadius: 1.5,
                              overflow: 'hidden',
                            }}
                          >
                            <input
                              id={`otp-${index}`}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpChange(index, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              onPaste={index === 0 ? handleOtpPaste : undefined}
                              disabled={otpVerifying}
                              style={{
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                                fontSize: isMobile ? '1rem' : '1.2rem',
                                fontWeight: 600,
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: theme.palette.text.primary,
                              }}
                            />
                          </Paper>
                        ))}
                      </Box>

                      {/* Timer and Resend */}
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        {!canResend ? (
                          <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                            Resend code in <span style={{ color: theme.palette.primary.main, fontWeight: 600 }}>{timer}s</span>
                          </Typography>
                        ) : (
                          <Button
                            variant="text"
                            size="small"
                            onClick={handleResendOtp}
                            disabled={otpVerifying}
                            sx={{
                              color: theme.palette.primary.main,
                              fontSize: '0.7rem',
                              textTransform: 'none',
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                              },
                            }}
                          >
                            Resend OTP
                          </Button>
                        )}
                      </Box>

                      {/* Verify Button */}
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            onClick={handleBackToRegistration}
                            disabled={otpVerifying}
                            sx={{
                              py: { xs: 1, sm: 1.2 },
                              borderRadius: { xs: 1.5, sm: 2 },
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                              color: theme.palette.primary.main,
                              '&:hover': {
                                borderColor: theme.palette.primary.main,
                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                              },
                            }}
                          >
                            Back
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            onClick={handleVerifyOtp}
                            disabled={otpVerifying || otp.join('').length !== 6}
                            endIcon={otpVerifying ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <SendIcon sx={{ fontSize: 14 }} />}
                            sx={{
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                              color: 'white',
                              py: { xs: 1, sm: 1.2 },
                              borderRadius: { xs: 1.5, sm: 2 },
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                              },
                              '&.Mui-disabled': {
                                background: alpha(theme.palette.primary.main, 0.5),
                              },
                            }}
                          >
                            {otpVerifying ? 'Verifying...' : 'Verify OTP'}
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {activeStep === 0 && (
              <>
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
                    Already have an account?{' '}
                    <Link to="/login" style={{ 
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}>
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </>
            )}
          </Card>

          <Box sx={{ mt: 2.5, textAlign: 'center' }}>
            <Link
              to="/"
              style={{ 
                color: theme.palette.text.secondary,
                textDecoration: 'none',
                fontSize: isMobile ? '0.7rem' : '0.75rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
              onMouseLeave={(e) => e.currentTarget.style.color = theme.palette.text.secondary}
            >
              ← Back to home
            </Link>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Register;