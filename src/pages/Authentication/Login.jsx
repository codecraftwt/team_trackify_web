// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
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
//   Snackbar,
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import LoginIcon from '@mui/icons-material/Login';
// import { loginUser, clearError, clearMessage } from '../../redux/slices/authSlice';

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
//   const [openErrorAlert, setOpenErrorAlert] = useState(false);

//   // Get auth state from Redux
//   const { isLoading, error, isAuthenticated, success, message, user, role_id } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // Reset form on component mount
//   useEffect(() => {
//     reset();
//     dispatch(clearError());
//     dispatch(clearMessage());
//   }, [dispatch, reset]);

//   // Redirect based on role after successful login
//   useEffect(() => {
//     if (isAuthenticated && user && role_id) {
//       // Show success message
//       setOpenSuccessAlert(true);

//       // Determine redirect path based on role_id
//       let redirectPath = '/';
//       if (role_id === 2) {
//         redirectPath = '/super-admin/dashboard';
//       } else if (role_id === 1) {
//         redirectPath = '/admin/dashboard';
//       }

//       // Redirect after a short delay
//       const timer = setTimeout(() => {
//         setOpenSuccessAlert(false);
//         dispatch(clearMessage());
//         navigate(redirectPath, { replace: true });
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [isAuthenticated, user, role_id, dispatch, navigate]);

//   // Handle error alert
//   useEffect(() => {
//     if (error) {
//       setOpenErrorAlert(true);
//       const timer = setTimeout(() => {
//         setOpenErrorAlert(false);
//         dispatch(clearError());
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, dispatch]);

//   // Clear error when component unmounts
//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//       dispatch(clearMessage());
//     };
//   }, [dispatch]);

//   const onSubmit = async (data) => {
//     // Clear previous states
//     dispatch(clearError());
//     dispatch(clearMessage());
//     setOpenSuccessAlert(false);
//     setOpenErrorAlert(false);

//     await dispatch(loginUser(data));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       {/* Success Snackbar at top-right corner */}
//       <Snackbar
//         open={openSuccessAlert}
//         autoHideDuration={3000}
//         onClose={() => setOpenSuccessAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         style={{ marginTop: '80px' }}
//       >
//         <Alert 
//           severity="success" 
//           variant="filled"
//           onClose={() => {
//             setOpenSuccessAlert(false);
//             dispatch(clearMessage());
//           }}
//           sx={{ width: '100%', boxShadow: 3 }}
//         >
//           {message || 'Login successful! Redirecting...'}
//         </Alert>
//       </Snackbar>

//       {/* Error Snackbar at top-right corner */}
//       <Snackbar
//         open={openErrorAlert}
//         autoHideDuration={5000}
//         onClose={() => setOpenErrorAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         style={{ marginTop: '80px' }}
//       >
//         <Alert 
//           severity="error" 
//           variant="filled"
//           onClose={() => {
//             setOpenErrorAlert(false);
//             dispatch(clearError());
//           }}
//           sx={{ width: '100%', boxShadow: 3 }}
//         >
//           {typeof error === 'string' ? error : error?.message || 'Login failed'}
//         </Alert>
//       </Snackbar>

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
//             Welcome Back
//           </Typography>
//           <Typography variant="body1" className="text-gray-600">
//             Sign in to your account to continue
//           </Typography>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <Card className="p-8 shadow-xl" sx={{ border: '1px solid', borderColor: 'rgba(37, 99, 235, 0.1)' }}>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 type="email"
//                 {...register('email', {
//                   required: 'Email is required',
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: 'Invalid email address',
//                   },
//                 })}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//                 variant="outlined"
//                 disabled={isLoading}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon sx={{ color: '#2563EB' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': {
//                       borderColor: '#2563EB',
//                     },
//                   },
//                 }}
//               />

//               <TextField
//                 fullWidth
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: {
//                     value: 4,
//                     message: 'Password must be at least 6 characters',
//                   },
//                 })}
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//                 variant="outlined"
//                 disabled={isLoading}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockIcon sx={{ color: '#2563EB' }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                         disabled={isLoading}
//                       >
//                         {showPassword ? (
//                           <VisibilityOffIcon sx={{ color: '#2563EB' }} />
//                         ) : (
//                           <VisibilityIcon sx={{ color: '#2563EB' }} />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     '&:hover fieldset': {
//                       borderColor: '#2563EB',
//                     },
//                   },
//                 }}
//               />

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     disabled={isLoading}
//                   />
//                   <label
//                     htmlFor="remember-me"
//                     className="ml-2 block text-sm text-gray-700"
//                   >
//                     Remember me
//                   </label>
//                 </div>

//                 <Link
//                   to="/forgot-password"
//                   className="text-sm text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   fullWidth
//                   disabled={isLoading}
//                   endIcon={<LoginIcon />}
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
//                   {isLoading ? 'Signing in...' : 'Sign In'}
//                 </Button>
//               </motion.div>
//             </form>

//             <Divider className="my-6" sx={{ borderColor: 'rgba(37, 99, 235, 0.1)' }} />

//             {/* <div className="text-center">
//               <Typography variant="body2" className="text-gray-600">
//                 Don't have an account?{' '}
//                 <Link
//                   to="/register"
//                   className="text-blue-600 hover:text-blue-700 font-medium"
//                 >
//                   Sign up
//                 </Link>
//               </Typography>
//             </div> */}
//           </Card>

//           <div className="mt-6 text-center">
//             <Link
//               to="/"
//               className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
//             >
//               ← Back to home
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;












//////////////////////////////    Centralised Color     ///////////////////////////////

// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
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
//   Snackbar,
//   useTheme,
//   alpha,
// } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';
// import LoginIcon from '@mui/icons-material/Login';
// import { loginUser, clearError, clearMessage } from '../../redux/slices/authSlice';

// const Login = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
//   const [openErrorAlert, setOpenErrorAlert] = useState(false);

//   // Get auth state from Redux
//   const { isLoading, error, isAuthenticated, success, message, user, role_id } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // Reset form on component mount
//   useEffect(() => {
//     reset();
//     dispatch(clearError());
//     dispatch(clearMessage());
//   }, [dispatch, reset]);

//   // Redirect based on role after successful login
//   useEffect(() => {
//     if (isAuthenticated && user && role_id) {
//       // Show success message
//       setOpenSuccessAlert(true);

//       // Determine redirect path based on role_id
//       let redirectPath = '/';
//       if (role_id === 2) {
//         redirectPath = '/super-admin/dashboard';
//       } else if (role_id === 1) {
//         redirectPath = '/admin/dashboard';
//       }

//       // Redirect after a short delay
//       const timer = setTimeout(() => {
//         setOpenSuccessAlert(false);
//         dispatch(clearMessage());
//         navigate(redirectPath, { replace: true });
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [isAuthenticated, user, role_id, dispatch, navigate]);

//   // Handle error alert
//   useEffect(() => {
//     if (error) {
//       setOpenErrorAlert(true);
//       const timer = setTimeout(() => {
//         setOpenErrorAlert(false);
//         dispatch(clearError());
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, dispatch]);

//   // Clear error when component unmounts
//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//       dispatch(clearMessage());
//     };
//   }, [dispatch]);

//   const onSubmit = async (data) => {
//     // Clear previous states
//     dispatch(clearError());
//     dispatch(clearMessage());
//     setOpenSuccessAlert(false);
//     setOpenErrorAlert(false);

//     await dispatch(loginUser(data));
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
//       {/* Success Snackbar at top-right corner */}
//       <Snackbar
//         open={openSuccessAlert}
//         autoHideDuration={3000}
//         onClose={() => setOpenSuccessAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{ mt: 8 }}
//       >
//         <Alert 
//           severity="success" 
//           variant="filled"
//           onClose={() => {
//             setOpenSuccessAlert(false);
//             dispatch(clearMessage());
//           }}
//           sx={{ width: '100%', boxShadow: 3 }}
//         >
//           {message || 'Login successful! Redirecting...'}
//         </Alert>
//       </Snackbar>

//       {/* Error Snackbar at top-right corner */}
//       <Snackbar
//         open={openErrorAlert}
//         autoHideDuration={5000}
//         onClose={() => setOpenErrorAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         sx={{ mt: 8 }}
//       >
//         <Alert 
//           severity="error" 
//           variant="filled"
//           onClose={() => {
//             setOpenErrorAlert(false);
//             dispatch(clearError());
//           }}
//           sx={{ width: '100%', boxShadow: 3 }}
//         >
//           {typeof error === 'string' ? error : error?.message || 'Login failed'}
//         </Alert>
//       </Snackbar>

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
//               Welcome Back
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//               Sign in to your account to continue
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
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
//                   disabled={isLoading}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <EmailIcon sx={{ color: theme.palette.primary.main }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />

//                 <TextField
//                   fullWidth
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                   {...register('password', {
//                     required: 'Password is required',
//                     minLength: {
//                       value: 4,
//                       message: 'Password must be at least 6 characters',
//                     },
//                   })}
//                   error={!!errors.password}
//                   helperText={errors.password?.message}
//                   variant="outlined"
//                   disabled={isLoading}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockIcon sx={{ color: theme.palette.primary.main }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                           disabled={isLoading}
//                           sx={{ color: theme.palette.primary.main }}
//                         >
//                           {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />

//                 <Box sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center', 
//                   justifyContent: 'space-between',
//                   flexWrap: 'wrap',
//                   gap: 1
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <input
//                       id="remember-me"
//                       name="remember-me"
//                       type="checkbox"
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                       disabled={isLoading}
//                       style={{ 
//                         accentColor: theme.palette.primary.main,
//                         marginRight: '8px'
//                       }}
//                     />
//                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                       Remember me
//                     </Typography>
//                   </Box>

//                   <Link
//                     to="/forgot-password"
//                     style={{ 
//                       color: theme.palette.primary.main,
//                       textDecoration: 'none',
//                       fontSize: '0.875rem',
//                       fontWeight: 500,
//                     }}
//                   >
//                     Forgot password?
//                   </Link>
//                 </Box>

//                 <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     size="large"
//                     fullWidth
//                     disabled={isLoading}
//                     endIcon={<LoginIcon />}
//                     sx={{
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                       color: 'white',
//                       py: 1.5,
//                       '&:hover': {
//                         background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                       },
//                       '&.Mui-disabled': {
//                         background: alpha(theme.palette.primary.main, 0.5),
//                       },
//                     }}
//                   >
//                     {isLoading ? 'Signing in...' : 'Sign In'}
//                   </Button>
//                 </motion.div>
//               </Box>
//             </form>

//             <Divider sx={{ 
//               my: 3, 
//               borderColor: alpha(theme.palette.primary.main, 0.1) 
//             }} />

//             {/* Commented out sign up link */}
//           </Card>

//           <Box sx={{ mt: 3, textAlign: 'center' }}>
//             <Link
//               to="/"
//               style={{ 
//                 color: theme.palette.text.secondary,
//                 textDecoration: 'none',
//                 fontSize: '0.875rem',
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

// export default Login;












import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
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
  Snackbar,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { loginUser, clearError, clearMessage } from '../../redux/slices/authSlice';
import Logo from '../../assets/logo31.png'

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // Get auth state from Redux
  const { isLoading, error, isAuthenticated, success, message, user, role_id } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Reset form on component mount
  useEffect(() => {
    reset();
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch, reset]);

  // Redirect based on role after successful login
  useEffect(() => {
    if (isAuthenticated && user && role_id) {
      // Show success message
      setOpenSuccessAlert(true);

      // Determine redirect path based on role_id
      let redirectPath = '/';
      if (role_id === 2) {
        redirectPath = '/super-admin/dashboard';
      } else if (role_id === 1) {
        redirectPath = '/admin/dashboard';
      }

      // Redirect after a short delay
      const timer = setTimeout(() => {
        setOpenSuccessAlert(false);
        dispatch(clearMessage());
        navigate(redirectPath, { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, role_id, dispatch, navigate]);

  // Handle error alert
  useEffect(() => {
    if (error) {
      setOpenErrorAlert(true);
      const timer = setTimeout(() => {
        setOpenErrorAlert(false);
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  // Clear error when component unmounts
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
    setOpenSuccessAlert(false);
    setOpenErrorAlert(false);

    await dispatch(loginUser(data));
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
        autoHideDuration={3000}
        onClose={() => setOpenSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: { xs: 7, sm: 8 } }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => {
            setOpenSuccessAlert(false);
            dispatch(clearMessage());
          }}
          sx={{
            width: '100%',
            boxShadow: 3,
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            py: 0.5,
          }}
        >
          {message || 'Login successful! Redirecting...'}
        </Alert>
      </Snackbar>

      {/* Error Snackbar at top-right corner */}
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={5000}
        onClose={() => setOpenErrorAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: { xs: 7, sm: 8 } }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => {
            setOpenErrorAlert(false);
            dispatch(clearError());
          }}
          sx={{
            width: '100%',
            boxShadow: 3,
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            py: 0.5,
          }}
        >
          {typeof error === 'string' ? error : error?.message || 'Login failed'}
        </Alert>
      </Snackbar>

      <Box sx={{ maxWidth: 400, width: '100%' }}>
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
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                color: 'text.primary',
                mb: 0.5,
                fontSize: { xs: '1.3rem', sm: '1.5rem' }
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.75rem', sm: '0.8rem' }
              }}
            >
              Sign in to your account to continue
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
                  size="small"
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

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 4,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  variant="outlined"
                  disabled={isLoading}
                  size="small"
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
                          disabled={isLoading}
                          sx={{ color: theme.palette.primary.main }}
                          size="small"
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

                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isLoading}
                      style={{
                        accentColor: theme.palette.primary.main,
                        marginRight: '6px',
                        width: '14px',
                        height: '14px',
                      }}
                    />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      Remember me
                    </Typography>
                  </Box>

                  <Link
                    to="/forgot-password"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontSize: isMobile ? '0.7rem' : '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    Forgot password?
                  </Link>
                </Box>

                <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    fullWidth
                    disabled={isLoading}
                    endIcon={<LoginIcon sx={{ fontSize: 16 }} />}
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
                    {isLoading ? 'Signing in...' : 'Sign In'}
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

            {/* Register Link */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }}
              >
                Don't have an account?{' '}
                <Link
                  to="/register"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 14 }} />
                  Sign up now
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

export default Login;