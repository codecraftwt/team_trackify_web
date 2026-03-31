// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   Button,
//   Chip,
//   Divider,
//   Stack,
//   alpha,
//   CardContent,
//   IconButton,
//   Tooltip,
//   TextField,
//   Grid,
//   InputAdornment,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Tab,
//   Tabs,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   LocationOn as LocationIcon,
//   Logout as LogoutIcon,
//   LockReset as ResetPasswordIcon,
//   Person as PersonIcon,
//   AdminPanelSettings as AdminIcon,
//   VerifiedUser as SuperAdminIcon,
//   CameraAlt as CameraIcon,
//   Save as SaveIcon,
//   Cancel as CancelIcon,
//   Key as KeyIcon,
//   Mail as MailIcon,
//   VpnKey as VpnKeyIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/slices/authSlice";
// import { updateUser, getUserById } from "../../redux/slices/userSlice";
// import LogoutModal from "../../components/models/LogoutModal";
// import { toast } from "react-toastify";

// // TabPanel component
// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`profile-tabpanel-${index}`}
//       aria-labelledby={`profile-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: { xs: 1.5, sm: 2 } }}>{children}</Box>}
//     </div>
//   );
// }

// const Profile = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const { role_id } = useSelector((state) => state.auth || {});
//   const { loading } = useSelector((state) => state.user || {});

//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [tabValue, setTabValue] = useState(0);

//   // Form state
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     avtar: null,
//   });

//   // Configuration state (display only - not fetched) - Only for Super Admin
//   const [configData] = useState({
//     razorpayKeyId: "rzp_test_xxxxxxxxxxxx",
//     razorpayKeySecret: "xxxxxxxxxxxxxxxx",
//     razorpayWebhookSecret: "whsec_xxxxxxxxxxxx",
//     gmailUser: "your-email@gmail.com",
//     gmailAppPass: "xxxx xxxx xxxx xxxx",
//     emailFrom: "noreply@yourdomain.com",
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [imageRemoved, setImageRemoved] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Initialize form with user data
//   useEffect(() => {
//     if (userData?._id) {
//       setFormData({
//         fullName: userData.name || "",
//         email: userData.email || "",
//         mobile: userData.mobile_no || "",
//         address: userData.address || "",
//         avtar: null,
//       });

//       if (userData.avtar) {
//         setPreviewImage(userData.avtar);
//       }
//     }
//   }, [userData]);

//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "fullName":
//         if (!value?.trim()) error = "Full name is required";
//         else if (value.length < 3) error = "Name must be at least 3 characters";
//         break;
//       case "email":
//         if (!value?.trim()) error = "Email is required";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           error = "Invalid email format";
//         break;
//       case "mobile":
//         if (!value?.trim()) error = "Mobile number is required";
//         else if (!/^\d{10}$/.test(value))
//           error = "Invalid mobile number (10 digits required)";
//         break;
//       case "address":
//         if (!value?.trim()) error = "Address is required";
//         break;
//       default:
//         break;
//     }

//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (touched[name]) {
//       const error = validateField(name, value);
//       setErrors({ ...errors, [name]: error });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });
//     const error = validateField(name, value);
//     setErrors({ ...errors, [name]: error });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("File size should be less than 5MB");
//         return;
//       }
//       setFormData({ ...formData, avtar: file });
//       setPreviewImage(URL.createObjectURL(file));
//       setImageRemoved(false);
//     }
//   };

//   const removeImage = () => {
//     setFormData({ ...formData, avtar: null });
//     setPreviewImage(null);
//     setImageRemoved(true);
//   };

//   const validateForm = () => {
//     const newErrors = {
//       fullName: validateField("fullName", formData.fullName),
//       email: validateField("email", formData.email),
//       mobile: validateField("mobile", formData.mobile),
//       address: validateField("address", formData.address),
//     };

//     setErrors(newErrors);
//     return !Object.values(newErrors).some((error) => error);
//   };

//   const handleSave = async () => {
//     if (!validateForm()) return;

//     const payload = new FormData();
//     payload.append("name", formData.fullName);
//     payload.append("email", formData.email);
//     payload.append("mobile_no", formData.mobile);
//     payload.append("address", formData.address);
//     payload.append("role_id", userData.role_id);
//     payload.append("createdby", userData.createdby);
//     payload.append("isActive", userData.isActive);

//     if (formData.avtar) {
//       payload.append("avtar", formData.avtar);
//     }

//     if (imageRemoved) {
//       payload.append("removeAvtar", "true");
//     }

//     try {
//       await dispatch(
//         updateUser({ userId: userData._id, formData: payload })
//       ).unwrap();

//       // Refresh user data
//       await dispatch(getUserById(userData._id));

//       toast.success("Profile updated successfully!");
//       setIsEditing(false);
//       setImageRemoved(false);
//     } catch (error) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   };

//   const handleCancel = () => {
//     // Reset form to original user data
//     setFormData({
//       fullName: userData.name || "",
//       email: userData.email || "",
//       mobile: userData.mobile_no || "",
//       address: userData.address || "",
//       avtar: null,
//     });
//     setPreviewImage(userData.avtar || null);
//     setImageRemoved(false);
//     setErrors({});
//     setTouched({});
//     setIsEditing(false);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const handleResetPassword = () => {
//     navigate("/reset-password-profile");
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const getRoleIcon = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return <SuperAdminIcon sx={{ color: theme.palette.secondary.main, fontSize: isMobile ? 18 : 20 }} />;
//       case 1:
//         return <AdminIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 18 : 20 }} />;
//       default:
//         return <PersonIcon sx={{ color: theme.palette.text.secondary, fontSize: isMobile ? 18 : 20 }} />;
//     }
//   };

//   const getRoleName = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return "Super Admin";
//       case 1:
//         return "Admin";
//       default:
//         return "User";
//     }
//   };

//   const getRoleColor = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return theme.palette.secondary.main;
//       case 1:
//         return theme.palette.primary.main;
//       default:
//         return theme.palette.text.secondary;
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   // Determine if user is Super Admin (role_id = 2)
//   const isSuperAdmin = (userData?.role_id || role_id) === 2;

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         justifyContent: 'space-between',
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         mb: { xs: 2, sm: 2.5 },
//         gap: 2
//       }}>
//         <Box>
//           <Typography
//             variant={isMobile ? "h6" : "h5"}
//             fontWeight="700"
//             gutterBottom
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: {
//                 xs: '1rem',
//                 sm: '1.2rem',
//                 md: '1.4rem',
//                 lg: '1.6rem',
//                 xl: '1.8rem'
//               },
//             }}
//           >
//             My Profile
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//             Manage your personal information and account settings
//           </Typography>
//         </Box>

//         {!isEditing && (
//           <Button
//             variant="outlined"
//             startIcon={<EditIcon sx={{ fontSize: 16 }} />}
//             onClick={() => setIsEditing(true)}
//             size="small"
//             sx={{
//               borderColor: theme.palette.primary.main,
//               color: theme.palette.primary.main,
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 34,
//               '&:hover': {
//                 borderColor: theme.palette.primary.dark,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//               },
//             }}
//           >
//             Edit Profile
//           </Button>
//         )}
//       </Box>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Profile Header Card */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5 },
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             mb: { xs: 2, sm: 2.5 },
//             background: theme.palette.background.paper,
//           }}
//         >
//           <Box
//             sx={{
//               p: { xs: 1.5, sm: 2, md: 2.5 },
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               alignItems: "center",
//               gap: { xs: 1.5, sm: 2, md: 2.5 },
//             }}
//           >
//             {/* Avatar Section */}
//             <Box sx={{ position: "relative" }}>
//               {previewImage ? (
//                 <Avatar
//                   src={previewImage}
//                   sx={{
//                     width: { xs: 60, sm: 70, md: 80 },
//                     height: { xs: 60, sm: 70, md: 80 },
//                     border: "3px solid white",
//                     boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
//                   }}
//                 />
//               ) : (
//                 <Avatar
//                   sx={{
//                     width: { xs: 60, sm: 70, md: 80 },
//                     height: { xs: 60, sm: 70, md: 80 },
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     border: "3px solid white",
//                     boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
//                   }}
//                 >
//                   <PersonIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 } }} />
//                 </Avatar>
//               )}

//               {isEditing && (
//                 <Tooltip title="Change Photo">
//                   <IconButton
//                     size="small"
//                     component="label"
//                     sx={{
//                       position: "absolute",
//                       bottom: 0,
//                       right: 0,
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                       color: "white",
//                       width: { xs: 22, sm: 24, md: 26 },
//                       height: { xs: 22, sm: 24, md: 26 },
//                       "&:hover": {
//                         background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                       },
//                     }}
//                   >
//                     <CameraIcon sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }} />
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </IconButton>
//                 </Tooltip>
//               )}
//             </Box>

//             {/* User Info */}
//             <Box sx={{ 
//               textAlign: { xs: "center", sm: "left" }, 
//               flex: 1,
//               width: { xs: '100%', sm: 'auto' }
//             }}>
//               <Typography 
//                 variant={isMobile ? "body1" : "h6"} 
//                 fontWeight={600} 
//                 color="text.primary" 
//                 gutterBottom
//                 sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//               >
//                 {userData?.name || "User Name"}
//               </Typography>

//               <Box sx={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 gap: 1, 
//                 justifyContent: { xs: "center", sm: "flex-start" }, 
//                 mb: { xs: 0.5, sm: 1 },
//                 flexWrap: 'wrap',
//               }}>
//                 {getRoleIcon()}
//                 <Chip
//                   label={getRoleName()}
//                   size="small"
//                   sx={{
//                     bgcolor: alpha(getRoleColor(), 0.1),
//                     color: getRoleColor(),
//                     fontWeight: 600,
//                     fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                     height: { xs: 18, sm: 20, md: 22 },
//                   }}
//                 />
//               </Box>

//               {userData?.createdAt && (
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' } }}>
//                   Member since {new Date(userData.createdAt).toLocaleDateString()}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Paper>

//         {/* Tabs - Only show Configuration tab for Super Admin */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5 },
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             overflow: 'hidden',
//           }}
//         >
//           <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//             <Tabs
//               value={tabValue}
//               onChange={handleTabChange}
//               variant={isMobile ? "fullWidth" : "standard"}
//               sx={{
//                 '& .MuiTab-root': {
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   minHeight: { xs: 42, sm: 48 },
//                   px: { xs: 1, sm: 1.5 },
//                 },
//                 '& .Mui-selected': {
//                   color: `${theme.palette.primary.main} !important`,
//                 },
//                 '& .MuiTabs-indicator': {
//                   bgcolor: theme.palette.primary.main,
//                 },
//               }}
//             >
//               <Tab label="Personal Information" />
//               {/* Only show Configuration tab for Super Admin */}
//               {isSuperAdmin && <Tab label="Configuration" />}
//             </Tabs>
//           </Box>

//           {/* Personal Information Tab */}
//           <TabPanel value={tabValue} index={0}>
//             <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               {isEditing ? (
//                 // Edit Mode - Email field disabled
//                 <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="fullName"
//                       label="Full Name"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.fullName && touched.fullName}
//                       helperText={touched.fullName && errors.fullName}
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="email"
//                       label="Email Address"
//                       type="email"
//                       value={formData.email}
//                       disabled
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.secondary,
//                           bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="mobile"
//                       label="Mobile Number"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.mobile && touched.mobile}
//                       helperText={touched.mobile && errors.mobile}
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="address"
//                       label="Address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.address && touched.address}
//                       helperText={touched.address && errors.address}
//                       size="small"
//                       multiline
//                       rows={2}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Action Buttons */}
//                   <Grid item xs={12}>
//                     <Box sx={{ 
//                       display: "flex", 
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       gap: { xs: 1, sm: 1.5 }, 
//                       mt: { xs: 0.5, sm: 1 } 
//                     }}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
//                         onClick={handleSave}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           height: 36,
//                           order: { xs: 1, sm: 1 },
//                           "&:hover": {
//                             background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                           },
//                         }}
//                       >
//                         {loading ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <CircularProgress size={14} sx={{ color: "white" }} />
//                             <span>Saving...</span>
//                           </Box>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </Button>

//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
//                         onClick={handleCancel}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           borderColor: alpha(theme.palette.divider, 0.5),
//                           color: "text.secondary",
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           height: 36,
//                           order: { xs: 2, sm: 2 },
//                           "&:hover": {
//                             borderColor: theme.palette.primary.main,
//                             color: theme.palette.primary.main,
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           },
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               ) : (
//                 // View Mode
//                 <>
//                   <Stack spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
//                     {/* Email */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1, sm: 1.5 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           width: { xs: 32, sm: 36, md: 40 },
//                           height: { xs: 32, sm: 36, md: 40 },
//                         }}
//                       >
//                         <EmailIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
//                           Email Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.email || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                     {/* Phone */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1, sm: 1.5 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           width: { xs: 32, sm: 36, md: 40 },
//                           height: { xs: 32, sm: 36, md: 40 },
//                         }}
//                       >
//                         <PhoneIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
//                           Phone Number
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.mobile_no || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                     {/* Address */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1, sm: 1.5 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           width: { xs: 32, sm: 36, md: 40 },
//                           height: { xs: 32, sm: 36, md: 40 },
//                         }}
//                       >
//                         <LocationIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
//                           Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           wordBreak: 'break-word'
//                         }}>
//                           {userData?.address || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Stack>

//                   <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 }, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                   {/* Actions */}
//                   <Stack spacing={{ xs: 1, sm: 1.5 }}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<ResetPasswordIcon sx={{ fontSize: 14 }} />}
//                       onClick={handleResetPassword}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         fontWeight: 600,
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         height: 36,
//                         "&:hover": {
//                           borderColor: theme.palette.primary.dark,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                       }}
//                     >
//                       Reset Password
//                     </Button>

//                     <Button
//                       fullWidth
//                       variant="contained"
//                       startIcon={<LogoutIcon sx={{ fontSize: 14 }} />}
//                       onClick={() => setShowLogoutModal(true)}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         bgcolor: "#ef4444",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         height: 36,
//                         "&:hover": {
//                           bgcolor: "#dc2626",
//                         },
//                       }}
//                     >
//                       Sign Out
//                     </Button>
//                   </Stack>
//                 </>
//               )}
//             </CardContent>
//           </TabPanel>

//           {/* Configuration Tab - Only rendered for Super Admin */}
//           {isSuperAdmin && (
//             <TabPanel value={tabValue} index={1}>
//               <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//                 <Typography
//                   variant="subtitle2"
//                   fontWeight={600}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     textTransform: "uppercase",
//                     letterSpacing: 1,
//                     mb: { xs: 1.5, sm: 2, md: 2.5 },
//                     fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                   }}
//                 >
//                   Payment Configuration
//                 </Typography>

//                 <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="RAZORPAY_KEY_ID"
//                       value={configData.razorpayKeyId}
//                       size="small"
//                       disabled
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <KeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.primary,
//                           bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="RAZORPAY_KEY_SECRET"
//                       value={configData.razorpayKeySecret}
//                       size="small"
//                       disabled
//                       type="password"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.primary,
//                           bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="RAZORPAY_WEBHOOK_SECRET"
//                       value={configData.razorpayWebhookSecret}
//                       size="small"
//                       disabled
//                       type="password"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.primary,
//                           bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>
//                 </Grid>

//                 <Typography
//                   variant="subtitle2"
//                   fontWeight={600}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     textTransform: "uppercase",
//                     letterSpacing: 1,
//                     mb: { xs: 1.5, sm: 2, md: 2.5 },
//                     fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                   }}
//                 >
//                   Gmail Configuration
//                 </Typography>

//                 <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="GMAIL_USER"
//                       value={configData.gmailUser}
//                       size="small"
//                       disabled
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <MailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.primary,
//                           bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="GMAIL_APP_PASS"
//                       value={configData.gmailAppPass}
//                       size="small"
//                       disabled
//                       type="password"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.primary,
//                           bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       label="EMAIL_FROM"
//                       value={configData.emailFrom}
//                       size="small"
//                       disabled
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.primary,
//                           bgcolor: alpha(theme.palette.primary.main, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </TabPanel>
//           )}
//         </Paper>
//       </motion.div>

//       {/* Logout Modal */}
//       <LogoutModal
//         show={showLogoutModal}
//         onHide={() => setShowLogoutModal(false)}
//         onConfirm={handleLogout}
//         title="Sign Out"
//         message="Are you sure you want to sign out?"
//         subMessage="You will be redirected to the login page."
//       />
//     </Box>
//   );
// };

// export default Profile;



























// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   Button,
//   Chip,
//   Divider,
//   Stack,
//   alpha,
//   CardContent,
//   IconButton,
//   Tooltip,
//   TextField,
//   Grid,
//   InputAdornment,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Tab,
//   Tabs,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   LocationOn as LocationIcon,
//   Logout as LogoutIcon,
//   LockReset as ResetPasswordIcon,
//   Person as PersonIcon,
//   AdminPanelSettings as AdminIcon,
//   VerifiedUser as SuperAdminIcon,
//   CameraAlt as CameraIcon,
//   Save as SaveIcon,
//   Cancel as CancelIcon,
//   Key as KeyIcon,
//   Mail as MailIcon,
//   VpnKey as VpnKeyIcon,
//   Refresh as RefreshIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/slices/authSlice";
// import { 
//   updateUser, 
//   getUserById,
//   getConfig,
//   createOrUpdateConfig,
//   deleteConfig 
// } from "../../redux/slices/userSlice";
// import LogoutModal from "../../components/models/LogoutModal";
// import { toast } from "react-toastify";

// // TabPanel component
// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`profile-tabpanel-${index}`}
//       aria-labelledby={`profile-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: { xs: 1.5, sm: 2 } }}>{children}</Box>}
//     </div>
//   );
// }

// const Profile = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Redux state
//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const { role_id } = useSelector((state) => state.auth || {});
//   const { 
//     loading,
//     config,
//     configLoading,
//     configUpdateLoading,
//     configDeleteLoading 
//   } = useSelector((state) => state.user || {});

//   // Local state
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isConfigEditing, setIsConfigEditing] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//    const isSuperAdmin = (userData?.role_id || role_id) === 2;
//   // Profile form state
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     avtar: null,
//   });

//   // Configuration form state
//   const [configFormData, setConfigFormData] = useState({
//     razorpayKeyId: "",
//     razorpayKeySecret: "",
//     razorpayWebhookSecret: "",
//     gmailUser: "",
//     gmailAppPass: "",
//     emailFrom: "",
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [imageRemoved, setImageRemoved] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Fetch config on component mount if Super Admin
//   useEffect(() => {
//     if (isSuperAdmin) {
//       dispatch(getConfig());
//     }
//   }, [dispatch, isSuperAdmin]);

//   // Initialize config form when config data is loaded
//   useEffect(() => {
//     if (config) {
//       setConfigFormData({
//         razorpayKeyId: config.paymentConfig?.razorpayKeyId || "",
//         razorpayKeySecret: "", // Don't populate secret from backend for security
//         razorpayWebhookSecret: "", // Don't populate webhook secret
//         gmailUser: config.emailConfig?.gmailUser || "",
//         gmailAppPass: "", // Don't populate app password
//         emailFrom: config.emailConfig?.emailFrom || "",
//       });
//     }
//   }, [config]);

//   // Initialize form with user data
//   useEffect(() => {
//     if (userData?._id) {
//       setFormData({
//         fullName: userData.name || "",
//         email: userData.email || "",
//         mobile: userData.mobile_no || "",
//         address: userData.address || "",
//         avtar: null,
//       });

//       if (userData.avtar) {
//         setPreviewImage(userData.avtar);
//       }
//     }
//   }, [userData]);

//   // Validation functions
//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "fullName":
//         if (!value?.trim()) error = "Full name is required";
//         else if (value.length < 3) error = "Name must be at least 3 characters";
//         break;
//       case "email":
//         if (!value?.trim()) error = "Email is required";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           error = "Invalid email format";
//         break;
//       case "mobile":
//         if (!value?.trim()) error = "Mobile number is required";
//         else if (!/^\d{10}$/.test(value))
//           error = "Invalid mobile number (10 digits required)";
//         break;
//       case "address":
//         if (!value?.trim()) error = "Address is required";
//         break;
//       default:
//         break;
//     }

//     return error;
//   };

//   // Profile form handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (touched[name]) {
//       const error = validateField(name, value);
//       setErrors({ ...errors, [name]: error });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });
//     const error = validateField(name, value);
//     setErrors({ ...errors, [name]: error });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("File size should be less than 5MB");
//         return;
//       }
//       setFormData({ ...formData, avtar: file });
//       setPreviewImage(URL.createObjectURL(file));
//       setImageRemoved(false);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {
//       fullName: validateField("fullName", formData.fullName),
//       email: validateField("email", formData.email),
//       mobile: validateField("mobile", formData.mobile),
//       address: validateField("address", formData.address),
//     };

//     setErrors(newErrors);
//     return !Object.values(newErrors).some((error) => error);
//   };

//   const handleSave = async () => {
//     if (!validateForm()) return;

//     const payload = new FormData();
//     payload.append("name", formData.fullName);
//     payload.append("email", formData.email);
//     payload.append("mobile_no", formData.mobile);
//     payload.append("address", formData.address);
//     payload.append("role_id", userData.role_id);
//     payload.append("createdby", userData.createdby);
//     payload.append("isActive", userData.isActive);

//     if (formData.avtar) {
//       payload.append("avtar", formData.avtar);
//     }

//     if (imageRemoved) {
//       payload.append("removeAvtar", "true");
//     }

//     try {
//       await dispatch(
//         updateUser({ userId: userData._id, formData: payload })
//       ).unwrap();

//       // Refresh user data
//       await dispatch(getUserById(userData._id));

//       toast.success("Profile updated successfully!");
//       setIsEditing(false);
//       setImageRemoved(false);
//     } catch (error) {
//       toast.error(error?.message || "Failed to update profile");
//     }
//   };

//   const handleCancel = () => {
//     // Reset form to original user data
//     setFormData({
//       fullName: userData.name || "",
//       email: userData.email || "",
//       mobile: userData.mobile_no || "",
//       address: userData.address || "",
//       avtar: null,
//     });
//     setPreviewImage(userData.avtar || null);
//     setImageRemoved(false);
//     setErrors({});
//     setTouched({});
//     setIsEditing(false);
//   };

//   // Configuration form handlers
//   const handleConfigChange = (e) => {
//     const { name, value } = e.target;
//     setConfigFormData({ ...configFormData, [name]: value });
//   };

//   const handleSaveConfig = async () => {
//     // Only send fields that have values
//     const configPayload = {};

//     if (configFormData.razorpayKeyId) configPayload.razorpayKeyId = configFormData.razorpayKeyId;
//     if (configFormData.razorpayKeySecret) configPayload.razorpayKeySecret = configFormData.razorpayKeySecret;
//     if (configFormData.razorpayWebhookSecret) configPayload.razorpayWebhookSecret = configFormData.razorpayWebhookSecret;
//     if (configFormData.gmailUser) configPayload.gmailUser = configFormData.gmailUser;
//     if (configFormData.gmailAppPass) configPayload.gmailAppPass = configFormData.gmailAppPass;
//     if (configFormData.emailFrom) configPayload.emailFrom = configFormData.emailFrom;

//     // Check if at least one field has a value
//     if (Object.keys(configPayload).length === 0) {
//       toast.error("Please fill at least one field to update");
//       return;
//     }

//     try {
//       await dispatch(createOrUpdateConfig(configPayload)).unwrap();
//       await dispatch(getConfig()); // Refresh config data
//       setIsConfigEditing(false);
//       toast.success("Configuration updated successfully!");
//     } catch (error) {
//       console.error("Config update error:", error);
//     }
//   };

//   const handleDeleteConfig = async () => {
//     try {
//       await dispatch(deleteConfig()).unwrap();
//       setShowDeleteConfirm(false);
//       setIsConfigEditing(false);
//       // Reset form
//       setConfigFormData({
//         razorpayKeyId: "",
//         razorpayKeySecret: "",
//         razorpayWebhookSecret: "",
//         gmailUser: "",
//         gmailAppPass: "",
//         emailFrom: "",
//       });
//       toast.success("Configuration deleted successfully!");
//     } catch (error) {
//       console.error("Config delete error:", error);
//     }
//   };

//   const handleCancelConfig = () => {
//     // Reset to original config data
//     if (config) {
//       setConfigFormData({
//         razorpayKeyId: config.paymentConfig?.razorpayKeyId || "",
//         razorpayKeySecret: "",
//         razorpayWebhookSecret: "",
//         gmailUser: config.emailConfig?.gmailUser || "",
//         gmailAppPass: "",
//         emailFrom: config.emailConfig?.emailFrom || "",
//       });
//     }
//     setIsConfigEditing(false);
//     setShowDeleteConfirm(false);
//   };

//   const handleRefreshConfig = () => {
//     dispatch(getConfig());
//   };

//   // Other handlers
//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const handleResetPassword = () => {
//     navigate("/reset-password-profile");
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   // Role helpers
//   const getRoleIcon = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return <SuperAdminIcon sx={{ color: theme.palette.secondary.main, fontSize: isMobile ? 18 : 20 }} />;
//       case 1:
//         return <AdminIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 18 : 20 }} />;
//       default:
//         return <PersonIcon sx={{ color: theme.palette.text.secondary, fontSize: isMobile ? 18 : 20 }} />;
//     }
//   };

//   const getRoleName = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return "Super Admin";
//       case 1:
//         return "Admin";
//       default:
//         return "User";
//     }
//   };

//   const getRoleColor = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return theme.palette.secondary.main;
//       case 1:
//         return theme.palette.primary.main;
//       default:
//         return theme.palette.text.secondary;
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   // Determine if user is Super Admin (role_id = 2)
//   // const isSuperAdmin = (userData?.role_id || role_id) === 2;

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         justifyContent: 'space-between',
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         mb: { xs: 2, sm: 2.5 },
//         gap: 2
//       }}>
//         <Box>
//           <Typography
//             variant={isMobile ? "h6" : "h5"}
//             fontWeight="700"
//             gutterBottom
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: {
//                 xs: '1rem',
//                 sm: '1.2rem',
//                 md: '1.4rem',
//                 lg: '1.6rem',
//                 xl: '1.8rem'
//               },
//             }}
//           >
//             My Profile
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//             Manage your personal information and account settings
//           </Typography>
//         </Box>

//         {!isEditing && tabValue === 0 && (
//           <Button
//             variant="outlined"
//             startIcon={<EditIcon sx={{ fontSize: 16 }} />}
//             onClick={() => setIsEditing(true)}
//             size="small"
//             sx={{
//               borderColor: theme.palette.primary.main,
//               color: theme.palette.primary.main,
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 34,
//               '&:hover': {
//                 borderColor: theme.palette.primary.dark,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//               },
//             }}
//           >
//             Edit Profile
//           </Button>
//         )}
//       </Box>

//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Profile Header Card */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5 },
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             mb: { xs: 2, sm: 2.5 },
//             background: theme.palette.background.paper,
//           }}
//         >
//           <Box
//             sx={{
//               p: { xs: 1.5, sm: 2, md: 2.5 },
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               alignItems: "center",
//               gap: { xs: 1.5, sm: 2, md: 2.5 },
//             }}
//           >
//             {/* Avatar Section */}
//             <Box sx={{ position: "relative" }}>
//               {previewImage ? (
//                 <Avatar
//                   src={previewImage}
//                   sx={{
//                     width: { xs: 60, sm: 70, md: 80 },
//                     height: { xs: 60, sm: 70, md: 80 },
//                     border: "3px solid white",
//                     boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
//                   }}
//                 />
//               ) : (
//                 <Avatar
//                   sx={{
//                     width: { xs: 60, sm: 70, md: 80 },
//                     height: { xs: 60, sm: 70, md: 80 },
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     border: "3px solid white",
//                     boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
//                   }}
//                 >
//                   <PersonIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 } }} />
//                 </Avatar>
//               )}

//               {isEditing && (
//                 <Tooltip title="Change Photo">
//                   <IconButton
//                     size="small"
//                     component="label"
//                     sx={{
//                       position: "absolute",
//                       bottom: 0,
//                       right: 0,
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                       color: "white",
//                       width: { xs: 22, sm: 24, md: 26 },
//                       height: { xs: 22, sm: 24, md: 26 },
//                       "&:hover": {
//                         background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                       },
//                     }}
//                   >
//                     <CameraIcon sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }} />
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*"
//                       onChange={handleImageChange}
//                     />
//                   </IconButton>
//                 </Tooltip>
//               )}
//             </Box>

//             {/* User Info */}
//             <Box sx={{ 
//               textAlign: { xs: "center", sm: "left" }, 
//               flex: 1,
//               width: { xs: '100%', sm: 'auto' }
//             }}>
//               <Typography 
//                 variant={isMobile ? "body1" : "h6"} 
//                 fontWeight={600} 
//                 color="text.primary" 
//                 gutterBottom
//                 sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//               >
//                 {userData?.name || "User Name"}
//               </Typography>

//               <Box sx={{ 
//                 display: "flex", 
//                 alignItems: "center", 
//                 gap: 1, 
//                 justifyContent: { xs: "center", sm: "flex-start" }, 
//                 mb: { xs: 0.5, sm: 1 },
//                 flexWrap: 'wrap',
//               }}>
//                 {getRoleIcon()}
//                 <Chip
//                   label={getRoleName()}
//                   size="small"
//                   sx={{
//                     bgcolor: alpha(getRoleColor(), 0.1),
//                     color: getRoleColor(),
//                     fontWeight: 600,
//                     fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                     height: { xs: 18, sm: 20, md: 22 },
//                   }}
//                 />
//               </Box>

//               {userData?.createdAt && (
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' } }}>
//                   Member since {new Date(userData.createdAt).toLocaleDateString()}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </Paper>

//         {/* Tabs - Only show Configuration tab for Super Admin */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5 },
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             overflow: 'hidden',
//           }}
//         >
//           <Box sx={{ 
//             borderBottom: 1, 
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             pr: 2
//           }}>
//             <Tabs
//               value={tabValue}
//               onChange={handleTabChange}
//               variant={isMobile ? "fullWidth" : "standard"}
//               sx={{
//                 flex: 1,
//                 '& .MuiTab-root': {
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   minHeight: { xs: 42, sm: 48 },
//                   px: { xs: 1, sm: 1.5 },
//                 },
//                 '& .Mui-selected': {
//                   color: `${theme.palette.primary.main} !important`,
//                 },
//                 '& .MuiTabs-indicator': {
//                   bgcolor: theme.palette.primary.main,
//                 },
//               }}
//             >
//               <Tab label="Personal Information" />
//               {/* Only show Configuration tab for Super Admin */}
//               {isSuperAdmin && <Tab label="Configuration" />}
//             </Tabs>

//             {/* Refresh button for config tab */}
//             {isSuperAdmin && tabValue === 1 && (
//               <Tooltip title="Refresh Configuration">
//                 <IconButton 
//                   size="small" 
//                   onClick={handleRefreshConfig}
//                   disabled={configLoading}
//                   sx={{ color: theme.palette.primary.main }}
//                 >
//                   <RefreshIcon sx={{ fontSize: 18 }} />
//                 </IconButton>
//               </Tooltip>
//             )}
//           </Box>

//           {/* Personal Information Tab */}
//           <TabPanel value={tabValue} index={0}>
//             <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               {isEditing ? (
//                 // Edit Mode - Email field disabled
//                 <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="fullName"
//                       label="Full Name"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.fullName && touched.fullName}
//                       helperText={touched.fullName && errors.fullName}
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="email"
//                       label="Email Address"
//                       type="email"
//                       value={formData.email}
//                       disabled
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .Mui-disabled': {
//                           WebkitTextFillColor: theme.palette.text.secondary,
//                           bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="mobile"
//                       label="Mobile Number"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.mobile && touched.mobile}
//                       helperText={touched.mobile && errors.mobile}
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       fullWidth
//                       name="address"
//                       label="Address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.address && touched.address}
//                       helperText={touched.address && errors.address}
//                       size="small"
//                       multiline
//                       rows={2}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         '& .MuiInputLabel-root': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiInputBase-input': {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Action Buttons */}
//                   <Grid item xs={12}>
//                     <Box sx={{ 
//                       display: "flex", 
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       gap: { xs: 1, sm: 1.5 }, 
//                       mt: { xs: 0.5, sm: 1 } 
//                     }}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
//                         onClick={handleSave}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           height: 36,
//                           order: { xs: 1, sm: 1 },
//                           "&:hover": {
//                             background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                           },
//                         }}
//                       >
//                         {loading ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <CircularProgress size={14} sx={{ color: "white" }} />
//                             <span>Saving...</span>
//                           </Box>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </Button>

//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
//                         onClick={handleCancel}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           borderColor: alpha(theme.palette.divider, 0.5),
//                           color: "text.secondary",
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           height: 36,
//                           order: { xs: 2, sm: 2 },
//                           "&:hover": {
//                             borderColor: theme.palette.primary.main,
//                             color: theme.palette.primary.main,
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           },
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               ) : (
//                 // View Mode
//                 <>
//                   <Stack spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
//                     {/* Email */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1, sm: 1.5 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           width: { xs: 32, sm: 36, md: 40 },
//                           height: { xs: 32, sm: 36, md: 40 },
//                         }}
//                       >
//                         <EmailIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
//                           Email Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.email || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                     {/* Phone */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1, sm: 1.5 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           width: { xs: 32, sm: 36, md: 40 },
//                           height: { xs: 32, sm: 36, md: 40 },
//                         }}
//                       >
//                         <PhoneIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
//                           Phone Number
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.mobile_no || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                     {/* Address */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1, sm: 1.5 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           width: { xs: 32, sm: 36, md: 40 },
//                           height: { xs: 32, sm: 36, md: 40 },
//                         }}
//                       >
//                         <LocationIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
//                           Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           wordBreak: 'break-word'
//                         }}>
//                           {userData?.address || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Stack>

//                   <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 }, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                   {/* Actions */}
//                   <Stack spacing={{ xs: 1, sm: 1.5 }}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<ResetPasswordIcon sx={{ fontSize: 14 }} />}
//                       onClick={handleResetPassword}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         fontWeight: 600,
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         height: 36,
//                         "&:hover": {
//                           borderColor: theme.palette.primary.dark,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                       }}
//                     >
//                       Reset Password
//                     </Button>

//                     <Button
//                       fullWidth
//                       variant="contained"
//                       startIcon={<LogoutIcon sx={{ fontSize: 14 }} />}
//                       onClick={() => setShowLogoutModal(true)}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         bgcolor: "#ef4444",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         height: 36,
//                         "&:hover": {
//                           bgcolor: "#dc2626",
//                         },
//                       }}
//                     >
//                       Sign Out
//                     </Button>
//                   </Stack>
//                 </>
//               )}
//             </CardContent>
//           </TabPanel>

//           {/* Configuration Tab - Only rendered for Super Admin */}
//           {isSuperAdmin && (
//             <TabPanel value={tabValue} index={1}>
//               <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//                 {configLoading ? (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                     <CircularProgress size={30} />
//                   </Box>
//                 ) : (
//                   <>
//                     {/* Edit/Save buttons for config */}
//                     {!isConfigEditing ? (
//                       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 1 }}>
//                         <Button
//                           variant="contained"
//                           startIcon={<EditIcon sx={{ fontSize: 14 }} />}
//                           onClick={() => setIsConfigEditing(true)}
//                           size="small"
//                           sx={{
//                             py: 0.8,
//                             borderRadius: 2,
//                             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                             fontSize: '0.7rem',
//                             height: 34,
//                           }}
//                         >
//                           Edit Configuration
//                         </Button>
//                       </Box>
//                     ) : (
//                       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 1 }}>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
//                           onClick={() => setShowDeleteConfirm(true)}
//                           disabled={configDeleteLoading || configUpdateLoading}
//                           size="small"
//                           sx={{
//                             py: 0.8,
//                             borderRadius: 2,
//                             bgcolor: "#ef4444",
//                             fontSize: '0.7rem',
//                             height: 34,
//                             mr: 'auto',
//                             "&:hover": {
//                               bgcolor: "#dc2626",
//                             },
//                           }}
//                         >
//                           Delete Config
//                         </Button>
//                         <Button
//                           variant="contained"
//                           startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
//                           onClick={handleSaveConfig}
//                           disabled={configUpdateLoading}
//                           size="small"
//                           sx={{
//                             py: 0.8,
//                             borderRadius: 2,
//                             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                             fontSize: '0.7rem',
//                             height: 34,
//                           }}
//                         >
//                           {configUpdateLoading ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                               <CircularProgress size={14} sx={{ color: "white" }} />
//                               <span>Saving...</span>
//                             </Box>
//                           ) : (
//                             "Save Changes"
//                           )}
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
//                           onClick={handleCancelConfig}
//                           disabled={configUpdateLoading}
//                           size="small"
//                           sx={{
//                             py: 0.8,
//                             borderRadius: 2,
//                             borderColor: alpha(theme.palette.divider, 0.5),
//                             color: "text.secondary",
//                             fontSize: '0.7rem',
//                             height: 34,
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </Box>
//                     )}

//                     {/* Delete Confirmation */}
//                     {showDeleteConfirm && (
//                       <Paper
//                         sx={{
//                           p: 2,
//                           mb: 3,
//                           bgcolor: alpha(theme.palette.error.main, 0.1),
//                           border: '1px solid',
//                           borderColor: alpha(theme.palette.error.main, 0.3),
//                           borderRadius: 2,
//                         }}
//                       >
//                         <Typography variant="body2" sx={{ mb: 1.5, color: theme.palette.error.dark }}>
//                           Are you sure you want to delete the entire configuration? This action cannot be undone.
//                         </Typography>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Button
//                             variant="contained"
//                             color="error"
//                             size="small"
//                             onClick={handleDeleteConfig}
//                             disabled={configDeleteLoading}
//                             sx={{ fontSize: '0.7rem', height: 30 }}
//                           >
//                             {configDeleteLoading ? (
//                               <CircularProgress size={12} sx={{ color: "white" }} />
//                             ) : (
//                               "Yes, Delete"
//                             )}
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             onClick={() => setShowDeleteConfirm(false)}
//                             sx={{ fontSize: '0.7rem', height: 30 }}
//                           >
//                             Cancel
//                           </Button>
//                         </Box>
//                       </Paper>
//                     )}

//                     <Typography
//                       variant="subtitle2"
//                       fontWeight={600}
//                       sx={{
//                         color: theme.palette.primary.main,
//                         textTransform: "uppercase",
//                         letterSpacing: 1,
//                         mb: { xs: 1.5, sm: 2, md: 2.5 },
//                         fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                       }}
//                     >
//                       Payment Configuration
//                     </Typography>

//                     <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           name="razorpayKeyId"
//                           label="RAZORPAY_KEY_ID"
//                           value={configFormData.razorpayKeyId}
//                           onChange={handleConfigChange}
//                           disabled={!isConfigEditing}
//                           size="small"
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <KeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .Mui-disabled': {
//                               WebkitTextFillColor: theme.palette.text.primary,
//                               bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                             },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           name="razorpayKeySecret"
//                           label="RAZORPAY_KEY_SECRET"
//                           value={configFormData.razorpayKeySecret}
//                           onChange={handleConfigChange}
//                           disabled={!isConfigEditing}
//                           size="small"
//                           type={isConfigEditing ? "text" : "password"}
//                           placeholder={isConfigEditing ? "Enter new secret" : "********"}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           helperText={isConfigEditing ? "Leave empty to keep current value" : ""}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .Mui-disabled': {
//                               WebkitTextFillColor: theme.palette.text.primary,
//                               bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                             },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           name="razorpayWebhookSecret"
//                           label="RAZORPAY_WEBHOOK_SECRET"
//                           value={configFormData.razorpayWebhookSecret}
//                           onChange={handleConfigChange}
//                           disabled={!isConfigEditing}
//                           size="small"
//                           type={isConfigEditing ? "text" : "password"}
//                           placeholder={isConfigEditing ? "Enter new webhook secret" : "********"}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           helperText={isConfigEditing ? "Leave empty to keep current value" : ""}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .Mui-disabled': {
//                               WebkitTextFillColor: theme.palette.text.primary,
//                               bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                             },
//                           }}
//                         />
//                       </Grid>
//                     </Grid>

//                     <Typography
//                       variant="subtitle2"
//                       fontWeight={600}
//                       sx={{
//                         color: theme.palette.primary.main,
//                         textTransform: "uppercase",
//                         letterSpacing: 1,
//                         mb: { xs: 1.5, sm: 2, md: 2.5 },
//                         fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                       }}
//                     >
//                       Gmail Configuration
//                     </Typography>

//                     <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           name="gmailUser"
//                           label="GMAIL_USER"
//                           value={configFormData.gmailUser}
//                           onChange={handleConfigChange}
//                           disabled={!isConfigEditing}
//                           size="small"
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <MailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .Mui-disabled': {
//                               WebkitTextFillColor: theme.palette.text.primary,
//                               bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                             },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           name="gmailAppPass"
//                           label="GMAIL_APP_PASS"
//                           value={configFormData.gmailAppPass}
//                           onChange={handleConfigChange}
//                           disabled={!isConfigEditing}
//                           size="small"
//                           type={isConfigEditing ? "text" : "password"}
//                           placeholder={isConfigEditing ? "Enter new app password" : "********"}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           helperText={isConfigEditing ? "Leave empty to keep current value" : ""}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .Mui-disabled': {
//                               WebkitTextFillColor: theme.palette.text.primary,
//                               bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                             },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12}>
//                         <TextField
//                           fullWidth
//                           name="emailFrom"
//                           label="EMAIL_FROM"
//                           value={configFormData.emailFrom}
//                           onChange={handleConfigChange}
//                           disabled={!isConfigEditing}
//                           size="small"
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             '& .MuiInputLabel-root': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .MuiInputBase-input': {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             '& .Mui-disabled': {
//                               WebkitTextFillColor: theme.palette.text.primary,
//                               bgcolor: alpha(theme.palette.action.disabled, 0.05),
//                             },
//                           }}
//                         />
//                       </Grid>
//                     </Grid>
//                   </>
//                 )}
//               </CardContent>
//             </TabPanel>
//           )}
//         </Paper>
//       </motion.div>

//       {/* Logout Modal */}
//       <LogoutModal
//         show={showLogoutModal}
//         onHide={() => setShowLogoutModal(false)}
//         onConfirm={handleLogout}
//         title="Sign Out"
//         message="Are you sure you want to sign out?"
//         subMessage="You will be redirected to the login page."
//       />
//     </Box>
//   );
// };

// export default Profile;





// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Avatar,
//   Button,
//   Chip,
//   Divider,
//   Stack,
//   alpha,
//   IconButton,
//   Tooltip,
//   TextField,
//   Grid,
//   InputAdornment,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Tab,
//   Tabs,
//   Container,
//   Card,
//   Badge,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   LocationOn as LocationIcon,
//   Logout as LogoutIcon,
//   LockReset as ResetPasswordIcon,
//   Person as PersonIcon,
//   AdminPanelSettings as AdminIcon,
//   VerifiedUser as SuperAdminIcon,
//   CameraAlt as CameraIcon,
//   Save as SaveIcon,
//   Cancel as CancelIcon,
//   Key as KeyIcon,
//   Mail as MailIcon,
//   VpnKey as VpnKeyIcon,
//   Refresh as RefreshIcon,
//   Delete as DeleteIcon,
//   CalendarToday as CalendarIcon,
//   Fingerprint as FingerprintIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   CheckCircle as CheckCircleIcon,
//   ErrorOutline as ErrorOutlineIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/slices/authSlice";
// import {
//   updateUser,
//   getUserById,
//   getConfig,
//   createOrUpdateConfig,
//   deleteConfig,
// } from "../../redux/slices/userSlice";
// import LogoutModal from "../../components/models/LogoutModal";
// import { toast } from "react-toastify";

// // ── animations ────────────────────────────────────────────────────────────────
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 18 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] } },
// });
// const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

// // ── TabPanel ──────────────────────────────────────────────────────────────────
// function TabPanel({ children, value, index }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       <AnimatePresence mode="wait">
//         {value === index && (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } }}
//             exit={{ opacity: 0, y: -4, transition: { duration: 0.16 } }}
//           >
//             <Box sx={{ py: { xs: 1.5, sm: 2 } }}>{children}</Box>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ── InfoBlock ─────────────────────────────────────────────────────────────────
// const InfoBlock = ({ icon, label, value }) => {
//   const theme = useTheme();
//   return (
//     <Box sx={{
//       display: "flex", alignItems: "center", gap: 1.2,
//       px: 1.2, py: 0.9,
//       borderRadius: 1.5,
//       border: `1px solid ${alpha(theme.palette.primary.main, 0.07)}`,
//       bgcolor: alpha(theme.palette.primary.main, 0.018),
//       transition: "all 0.18s ease",
//       "&:hover": {
//         bgcolor: alpha(theme.palette.primary.main, 0.045),
//         borderColor: alpha(theme.palette.primary.main, 0.18),
//         transform: "translateX(3px)",
//       },
//     }}>
//       <Box sx={{
//         width: 28, height: 28, borderRadius: 1.2, flexShrink: 0,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.13)}, ${alpha(theme.palette.primary.light, 0.06)})`,
//         color: theme.palette.primary.main,
//       }}>
//         {React.cloneElement(icon, { sx: { fontSize: 14 } })}
//       </Box>
//       <Box sx={{ minWidth: 0, flex: 1 }}>
//         <Typography variant="overline" color="text.secondary"
//           sx={{ display: "block", lineHeight: 1.1, letterSpacing: 0.5, fontSize: "0.58rem" }}>
//           {label}
//         </Typography>
//         <Typography variant="body2" fontWeight={600} color="text.primary"
//           sx={{ wordBreak: "break-all", lineHeight: 1.3, fontSize: "0.72rem" }}>
//           {value || "Not provided"}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// // ── ConfigField ───────────────────────────────────────────────────────────────
// const ConfigField = ({ label, value, icon, isSecret, isEditing, fieldName, editValue, onChange, showSecretKeys, onToggleSecret }) => {
//   const theme = useTheme();
//   const isVisible = showSecretKeys[fieldName];
//   const displayValue = isEditing ? editValue : (value || "");
//   const isEmpty = !value && !isEditing;
//   const hasValue = Boolean(value);

//   return (
//     <TextField fullWidth name={fieldName} label={label}
//       value={isEmpty ? "Not configured" : (isSecret && !isVisible ? "•".repeat(Math.min(displayValue.length || 8, 14)) : displayValue)}
//       onChange={isEditing ? onChange : undefined}
//       disabled={!isEditing} size="small"
//       helperText={isEditing && isSecret ? "Leave empty to keep current" : ""}
//       sx={{
//         "& .MuiInputLabel-root": { fontSize: "0.68rem" },
//         "& .MuiInputBase-input": {
//           fontSize: "0.7rem", py: "5px",
//           fontFamily: isSecret && !isVisible && hasValue ? "monospace" : "inherit",
//           letterSpacing: isSecret && !isVisible && hasValue ? "0.14em" : "normal",
//         },
//         "& .MuiFormHelperText-root": { fontSize: "0.58rem", mt: 0.2 },
//         "& .MuiOutlinedInput-root": {
//           borderRadius: 1.2,
//           bgcolor: !isEditing ? alpha(theme.palette.primary.main, 0.015) : "transparent",
//           "&:hover .MuiOutlinedInput-notchedOutline": {
//             borderColor: isEditing ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.22),
//           },
//           "&.Mui-focused": { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}` },
//         },
//         "& .Mui-disabled": {
//           WebkitTextFillColor: isEmpty
//             ? `${theme.palette.text.disabled} !important`
//             : `${theme.palette.text.primary} !important`,
//         },
//       }}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             {React.cloneElement(icon, { sx: { color: isEmpty ? theme.palette.text.disabled : theme.palette.primary.main, fontSize: 14 } })}
//           </InputAdornment>
//         ),
//         endAdornment: isSecret && hasValue && (
//           <InputAdornment position="end">
//             <IconButton onClick={() => onToggleSecret(fieldName)} edge="end" size="small"
//               sx={{ color: theme.palette.primary.main, opacity: 0.6, p: 0.3, "&:hover": { opacity: 1 } }}>
//               {isVisible ? <VisibilityOffIcon sx={{ fontSize: 14 }} /> : <VisibilityIcon sx={{ fontSize: 14 }} />}
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//     />
//   );
// };

// // ── Main ──────────────────────────────────────────────────────────────────────
// const Profile = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const { role_id } = useSelector((state) => state.auth || {});
//   const { loading, config, configLoading, configUpdateLoading, configDeleteLoading } =
//     useSelector((state) => state.user || {});

//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isConfigEditing, setIsConfigEditing] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showSecretKeys, setShowSecretKeys] = useState({});
//   const isSuperAdmin = (userData?.role_id || role_id) === 2;

//   const emptyConfig = { razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", gmailUser: "", gmailAppPass: "", emailFrom: "" };
//   const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", address: "", avtar: null });
//   const [configFormData, setConfigFormData] = useState(emptyConfig);
//   const [configViewData, setConfigViewData] = useState(emptyConfig);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [imageRemoved, setImageRemoved] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const toggleSecretKey = (f) => setShowSecretKeys((p) => ({ ...p, [f]: !p[f] }));

//   useEffect(() => { if (isSuperAdmin) dispatch(getConfig()); }, [dispatch, isSuperAdmin]);

//   useEffect(() => {
//     if (config) {
//       const populated = {
//         razorpayKeyId: config.paymentConfig?.razorpayKeyId || "",
//         razorpayKeySecret: config.paymentConfig?.razorpayKeySecret || "",
//         razorpayWebhookSecret: config.paymentConfig?.razorpayWebhookSecret || "",
//         gmailUser: config.emailConfig?.gmailUser || "",
//         gmailAppPass: config.emailConfig?.gmailAppPass || "",
//         emailFrom: config.emailConfig?.emailFrom || "",
//       };
//       setConfigViewData(populated);
//       setConfigFormData({ ...populated });
//     }
//   }, [config]);

//   useEffect(() => {
//     if (userData?._id) {
//       setFormData({ fullName: userData.name || "", email: userData.email || "", mobile: userData.mobile_no || "", address: userData.address || "", avtar: null });
//       if (userData.avtar) setPreviewImage(userData.avtar);
//     }
//   }, [userData]);

//   const validateField = (name, value) => {
//     switch (name) {
//       case "fullName": return !value?.trim() ? "Required" : value.length < 3 ? "Min 3 chars" : "";
//       case "email": return !value?.trim() ? "Required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email" : "";
//       case "mobile": return !value?.trim() ? "Required" : !/^\d{10}$/.test(value) ? "10 digits" : "";
//       case "address": return !value?.trim() ? "Required" : "";
//       default: return "";
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (touched[name]) setErrors({ ...errors, [name]: validateField(name, value) });
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });
//     setErrors({ ...errors, [name]: validateField(name, value) });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) { toast.error("Max 5MB"); return; }
//     setFormData({ ...formData, avtar: file });
//     setPreviewImage(URL.createObjectURL(file));
//     setImageRemoved(false);
//   };

//   const validateForm = () => {
//     const newErrors = {
//       fullName: validateField("fullName", formData.fullName),
//       email: validateField("email", formData.email),
//       mobile: validateField("mobile", formData.mobile),
//       address: validateField("address", formData.address),
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(Boolean);
//   };

//   const handleSave = async () => {
//     if (!validateForm()) return;
//     const payload = new FormData();
//     payload.append("name", formData.fullName);
//     payload.append("email", formData.email);
//     payload.append("mobile_no", formData.mobile);
//     payload.append("address", formData.address);
//     payload.append("role_id", userData.role_id);
//     payload.append("createdby", userData.createdby);
//     payload.append("isActive", userData.isActive);
//     if (formData.avtar) payload.append("avtar", formData.avtar);
//     if (imageRemoved) payload.append("removeAvtar", "true");
//     try {
//       await dispatch(updateUser({ userId: userData._id, formData: payload })).unwrap();
//       await dispatch(getUserById(userData._id));
//       toast.success("Profile updated!");
//       setIsEditing(false);
//     } catch (error) { toast.error(error?.message || "Update failed"); }
//   };

//   const handleCancel = () => {
//     setFormData({ fullName: userData.name || "", email: userData.email || "", mobile: userData.mobile_no || "", address: userData.address || "", avtar: null });
//     setPreviewImage(userData.avtar || null);
//     setImageRemoved(false);
//     setErrors({});
//     setTouched({});
//     setIsEditing(false);
//   };

//   const handleConfigChange = (e) => { const { name, value } = e.target; setConfigFormData({ ...configFormData, [name]: value }); };

//   const handleSaveConfig = async () => {
//     const payload = {};
//     Object.entries(configFormData).forEach(([k, v]) => { if (v) payload[k] = v; });
//     if (!Object.keys(payload).length) { toast.error("Fill at least one field"); return; }
//     try {
//       await dispatch(createOrUpdateConfig(payload)).unwrap();
//       await dispatch(getConfig());
//       setIsConfigEditing(false);
//       setShowSecretKeys({});
//       toast.success("Configuration saved!");
//     } catch (e) { console.error(e); }
//   };

//   const handleDeleteConfig = async () => {
//     try {
//       await dispatch(deleteConfig()).unwrap();
//       setShowDeleteConfirm(false);
//       setIsConfigEditing(false);
//       setConfigFormData(emptyConfig);
//       setConfigViewData(emptyConfig);
//       setShowSecretKeys({});
//       toast.success("Configuration deleted!");
//     } catch (e) { console.error(e); }
//   };

//   const handleCancelConfig = () => {
//     setConfigFormData({ ...configViewData });
//     setIsConfigEditing(false);
//     setShowDeleteConfirm(false);
//     setShowSecretKeys({});
//   };

//   const getRoleInfo = () => {
//     const id = userData?.role_id || role_id;
//     if (id === 2) return { icon: <SuperAdminIcon />, label: "Super Admin", color: theme.palette.secondary.main };
//     if (id === 1) return { icon: <AdminIcon />, label: "Admin", color: theme.palette.primary.main };
//     return { icon: <PersonIcon />, label: "User", color: theme.palette.text.secondary };
//   };
//   const roleInfo = getRoleInfo();

//   const editSx = {
//     "& .MuiInputLabel-root": { fontSize: "0.68rem" },
//     "& .MuiInputBase-input": { fontSize: "0.7rem", py: "5px" },
//     "& .MuiFormHelperText-root": { fontSize: "0.58rem", mt: 0.2 },
//     "& .MuiOutlinedInput-root": {
//       borderRadius: 1.2,
//       "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
//       "&.Mui-focused": { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}` },
//     },
//     "& .Mui-disabled": { WebkitTextFillColor: `${theme.palette.text.secondary} !important` },
//   };

//   const configuredCount = Object.values(configViewData).filter(Boolean).length;
//   const totalConfig = Object.keys(configViewData).length;

//   const configSections = [
//     {
//       title: "Payment",
//       icon: <KeyIcon />,
//       fields: [
//         { name: "razorpayKeyId", label: "Razorpay Key ID", icon: <KeyIcon />, secret: false },
//         { name: "razorpayKeySecret", label: "Key Secret", icon: <VpnKeyIcon />, secret: true },
//         { name: "razorpayWebhookSecret", label: "Webhook Secret", icon: <VpnKeyIcon />, secret: true },
//       ],
//     },
//     {
//       title: "Gmail",
//       icon: <MailIcon />,
//       fields: [
//         { name: "gmailUser", label: "Gmail User", icon: <MailIcon />, secret: false },
//         { name: "gmailAppPass", label: "App Password", icon: <VpnKeyIcon />, secret: true },
//         { name: "emailFrom", label: "Email From", icon: <EmailIcon />, secret: false },
//       ],
//     },
//   ];

//   return (
//     <Container maxWidth="lg" sx={{
//       py: { xs: 1.5, sm: 2, md: 2.5 },
//     }}>
//       <motion.div variants={stagger} initial="initial" animate="animate">

//         {/* ── Header ── */}
//         <motion.div {...fadeUp(0)}>
//           <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//             <Typography variant="h5" fontWeight={800} sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
//                 }}>
//               My Profile
//             </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             flexWrap: "wrap",
//                             fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
//                           }}>
//               Manage your account information and settings
//             </Typography>
//           </Box>
//         </motion.div>

//         {/* ── Main Content Row ── */}
//         <Grid container spacing={{ xs: 1.5, sm: 2 }} alignItems="stretch">

//           {/* ── LEFT: Profile card ── */}
//           <Grid item xs={12} md={4}>
//             <motion.div {...fadeUp(0.06)} style={{ height: '100%' }}>
//               <Paper elevation={0} sx={{
//                 borderRadius: 2.5,
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 overflow: "hidden",
//                 boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}>
//                 {/* Banner */}
//                 <Box sx={{
//                   height: { xs: 60, sm: 70 },
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 65%, #0f2d4a 100%)`,
//                   position: "relative",
//                   overflow: "hidden",
//                   flexShrink: 0,
//                 }}>
//                   {[{ s: 80, t: -25, r: -8 }, { s: 50, t: 8, r: 45 }, { s: 35, t: -10, l: 20 }].map((c, i) => (
//                     <Box key={i} sx={{
//                       position: "absolute", width: c.s, height: c.s, borderRadius: "50%",
//                       border: `1.5px solid ${alpha("#fff", 0.15)}`,
//                       bgcolor: alpha("#fff", 0.05),
//                       top: c.t, right: c.r, left: c.l,
//                     }} />
//                   ))}
//                 </Box>

//                 {/* Avatar + info - This will expand to fill available space */}
//                 <Box sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   px: 2.5,
//                   pb: 2.5,
//                   mt: { xs: -4, sm: -5 },
//                   flex: 1,  // Takes remaining height
//                 }}>
//                   <Badge
//                     overlap="circular"
//                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                     badgeContent={isEditing && (
//                       <Tooltip title="Change Photo">
//                         <IconButton size="small" component="label" sx={{
//                           bgcolor: theme.palette.primary.main,
//                           color: "white",
//                           width: 22,
//                           height: 22,
//                           "&:hover": { bgcolor: theme.palette.primary.dark },
//                         }}>
//                           <CameraIcon sx={{ fontSize: 12 }} />
//                           <input type="file" hidden accept="image/*" onChange={handleImageChange} />
//                         </IconButton>
//                       </Tooltip>
//                     )}
//                   >
//                     <Box sx={{
//                       p: "2px",
//                       borderRadius: "50%",
//                       background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
//                       boxShadow: `0 4px 14px ${alpha(theme.palette.primary.dark, 0.2)}`,
//                     }}>
//                       {previewImage ? (
//                         <Avatar
//                           src={previewImage}
//                           sx={{
//                             width: { xs: 70, sm: 80 },
//                             height: { xs: 70, sm: 80 },
//                             border: `2px solid ${theme.palette.background.paper}`
//                           }}
//                         />
//                       ) : (
//                         <Avatar sx={{
//                           width: { xs: 70, sm: 80 },
//                           height: { xs: 70, sm: 80 },
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           border: `2px solid ${theme.palette.background.paper}`,
//                         }}>
//                           <PersonIcon sx={{ fontSize: { xs: 30, sm: 36 } }} />
//                         </Avatar>
//                       )}
//                     </Box>
//                   </Badge>

//                   <Typography
//                     fontWeight={800}
//                     sx={{
//                       mt: 1,
//                       textAlign: "center",
//                       letterSpacing: -0.3,
//                       fontSize: "0.82rem",
//                       lineHeight: 1.2
//                     }}
//                   >
//                     {userData?.name || "User Name"}
//                   </Typography>

//                   <Chip
//                     icon={React.cloneElement(roleInfo.icon, { sx: { fontSize: "11px !important", color: `${roleInfo.color} !important` } })}
//                     label={roleInfo.label}
//                     size="small"
//                     sx={{
//                       mt: 0.5,
//                       height: 20,
//                       fontWeight: 700,
//                       fontSize: "0.58rem",
//                       bgcolor: alpha(roleInfo.color, 0.1),
//                       color: roleInfo.color,
//                       border: `1px solid ${alpha(roleInfo.color, 0.2)}`,
//                       "& .MuiChip-icon": { ml: "4px" },
//                     }}
//                   />

//                   <Divider sx={{ width: "100%", my: 1, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

//                   <Stack spacing={0.8} sx={{ width: "100%", mb: 2 }}>
//                     {[
//                       userData?.email && { icon: <EmailIcon />, val: userData.email },
//                       userData?.mobile_no && { icon: <PhoneIcon />, val: userData.mobile_no },
//                       userData?.createdAt && { icon: <CalendarIcon />, val: `Since ${new Date(userData.createdAt).toLocaleDateString()}` },
//                       // userData?._id && { icon: <FingerprintIcon />, val: userData._id.slice(-10), mono: true },
//                     ].filter(Boolean).map(({ icon, val, mono }, i) => (
//                       <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         {React.cloneElement(icon, { sx: { fontSize: 14, color: "text.secondary" } })}
//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                           noWrap
//                           sx={{
//                             fontSize: "0.75rem", // Increased from 0.58rem
//                             fontFamily: mono ? "monospace" : "inherit",
//                             fontWeight: mono ? 500 : 400,
//                           }}
//                         >
//                           {val}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Stack>

//                   {/* Action buttons - Will stick to bottom */}
//                   <Box sx={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 0.7,
//                     mt: 'auto',  // Pushes to bottom
//                   }}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       size="small"
//                       startIcon={<ResetPasswordIcon sx={{ fontSize: 12 }} />}
//                       onClick={() => navigate("/reset-password-profile")}
//                       sx={{
//                         height: 30,
//                         borderRadius: 1.5,
//                         fontWeight: 700,
//                         fontSize: "0.62rem",
//                         borderColor: alpha(theme.palette.primary.main, 0.35),
//                         color: theme.palette.primary.main
//                       }}
//                     >
//                       Reset Password
//                     </Button>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       size="small"
//                       startIcon={<LogoutIcon sx={{ fontSize: 12 }} />}
//                       onClick={() => setShowLogoutModal(true)}
//                       sx={{
//                         height: 30,
//                         borderRadius: 1.5,
//                         fontWeight: 700,
//                         fontSize: "0.62rem",
//                         color: "#ef4444",
//                         borderColor: alpha("#ef4444", 0.35),
//                         "&:hover": { bgcolor: alpha("#ef4444", 0.05) }
//                       }}
//                     >
//                       Sign Out
//                     </Button>
//                   </Box>
//                 </Box>
//               </Paper>
//             </motion.div>
//           </Grid>

//           {/* ── RIGHT: Tabs panel ── */}
//           <Grid item xs={12} md={8}>
//             <motion.div {...fadeUp(0.1)} style={{ height: '100%' }}>
//               <Paper elevation={0} sx={{
//                 borderRadius: 2.5,
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 overflow: "hidden",
//                 boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}>
//                 {/* Tab bar - Fixed height */}
//                 <Box sx={{
//                   borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
//                   bgcolor: alpha(theme.palette.primary.main, 0.016),
//                   display: "flex",
//                   alignItems: "center",
//                   pr: 0.5,
//                   flexShrink: 0,
//                 }}>
//                   <Tabs
//                     value={tabValue}
//                     onChange={(_, v) => setTabValue(v)}
//                     variant={isMobile ? "fullWidth" : "standard"}
//                     sx={{
//                       flex: 1,
//                       px: { xs: 0, sm: 0.5 },
//                       minHeight: 38,
//                       "& .MuiTab-root": {
//                         textTransform: "none",
//                         fontWeight: 600,
//                         minHeight: 38,
//                         py: 0.8,
//                         fontSize: "0.68rem",
//                         color: "text.secondary",
//                       },
//                       "& .Mui-selected": {
//                         color: `${theme.palette.primary.main} !important`,
//                         fontWeight: 700
//                       },
//                       "& .MuiTabs-indicator": {
//                         height: 2,
//                         borderRadius: "2px 2px 0 0",
//                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
//                       },
//                     }}
//                   >
//                     <Tab label="Personal Information" />
//                     {isSuperAdmin && <Tab label="Configuration" />}
//                   </Tabs>
//                   {isSuperAdmin && tabValue === 1 && (
//                     <Tooltip title="Refresh">
//                       <IconButton
//                         size="small"
//                         onClick={() => dispatch(getConfig())}
//                         disabled={configLoading}
//                         sx={{ color: theme.palette.primary.main, p: 0.5 }}
//                       >
//                         <RefreshIcon sx={{ fontSize: 14 }} />
//                       </IconButton>
//                     </Tooltip>
//                   )}
//                 </Box>

//                 {/* ── Personal Info ── */}
//                 <TabPanel value={tabValue} index={0} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                   <Box sx={{
//                     px: { xs: 1.5, sm: 2 },
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                   }}>
//                     <AnimatePresence mode="wait">
//                       {isEditing ? (
//                         <motion.div
//                           key="edit"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           exit={{ opacity: 0 }}
//                           style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//                         >
//                           <Grid container spacing={1.5} sx={{ flex: 1 }}>
//                             <Grid item xs={12}>
//                               <TextField
//                                 fullWidth
//                                 name="fullName"
//                                 label="Full Name"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 error={!!errors.fullName && touched.fullName}
//                                 helperText={touched.fullName && errors.fullName}
//                                 size="small"
//                                 sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   )
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                               <TextField
//                                 fullWidth
//                                 name="email"
//                                 label="Email"
//                                 value={formData.email}
//                                 disabled
//                                 size="small"
//                                 sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   )
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                               <TextField
//                                 fullWidth
//                                 name="mobile"
//                                 label="Mobile Number"
//                                 value={formData.mobile}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 error={!!errors.mobile && touched.mobile}
//                                 helperText={touched.mobile && errors.mobile}
//                                 size="small"
//                                 sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   )
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12}>
//                               <TextField
//                                 fullWidth
//                                 name="address"
//                                 label="Address"
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 error={!!errors.address && touched.address}
//                                 helperText={touched.address && errors.address}
//                                 size="small"
//                                 multiline
//                                 rows={2}
//                                 sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   )
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12} sx={{ mt: 'auto' }}>
//                               <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//                                 <Button
//                                   variant="outlined"
//                                   onClick={handleCancel}
//                                   size="small"
//                                   startIcon={<CancelIcon sx={{ fontSize: 13 }} />}
//                                   sx={{
//                                     height: 30,
//                                     borderRadius: 1.5,
//                                     fontWeight: 700,
//                                     fontSize: "0.65rem",
//                                     borderColor: alpha(theme.palette.divider, 0.6),
//                                     color: "text.secondary"
//                                   }}
//                                 >
//                                   Cancel
//                                 </Button>
//                                 <Button
//                                   variant="contained"
//                                   onClick={handleSave}
//                                   disabled={loading}
//                                   size="small"
//                                   startIcon={loading ? null : <SaveIcon sx={{ fontSize: 13 }} />}
//                                   sx={{
//                                     height: 30,
//                                     borderRadius: 1.5,
//                                     fontWeight: 700,
//                                     fontSize: "0.65rem",
//                                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                     boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
//                                   }}
//                                 >
//                                   {loading ? (
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
//                                       <CircularProgress size={11} sx={{ color: "white" }} />
//                                       <span>Saving...</span>
//                                     </Box>
//                                   ) : "Save Changes"}
//                                 </Button>
//                               </Box>
//                             </Grid>
//                           </Grid>
//                         </motion.div>
//                       ) : (
//                         <motion.div
//                           key="view"
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           exit={{ opacity: 0 }}
//                           style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//                         >
//                           <Stack spacing={1.2} sx={{ mb: 2, flex: 1 }}>
//                             <InfoBlock icon={<PersonIcon />} label="Full Name" value={userData?.name} />
//                             <Box sx={{ display: "flex", gap: 0.9, flexDirection: { xs: "column", sm: "row" } }}>
//                               <Box sx={{ flex: 1 }}>
//                                 <InfoBlock icon={<EmailIcon />} label="Email Address" value={userData?.email} />
//                               </Box>
//                               <Box sx={{ flex: 1 }}>
//                                 <InfoBlock icon={<PhoneIcon />} label="Mobile Number" value={userData?.mobile_no} />
//                               </Box>
//                             </Box>
//                             <InfoBlock icon={<LocationIcon />} label="Address" value={userData?.address} />
//                           </Stack>

//                           <Divider sx={{ mb: 2, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

//                           <Button
//                             variant="contained"
//                             startIcon={<EditIcon sx={{ fontSize: 13 }} />}
//                             onClick={() => setIsEditing(true)}
//                             size="small"
//                             sx={{
//                               height: 30,
//                               borderRadius: 1.5,
//                               fontWeight: 700,
//                               fontSize: "0.65rem",
//                               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                               boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
//                               alignSelf: 'flex-start',
//                             }}
//                           >
//                             Edit Profile
//                           </Button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </Box>
//                 </TabPanel>

//                 {/* ── Configuration ── */}
//                 {isSuperAdmin && (
//                   <TabPanel value={tabValue} index={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
//                     <Box sx={{
//                       px: { xs: 1.5, sm: 2 },
//                       height: '100%',
//                       display: 'flex',
//                       flexDirection: 'column',
//                     }}>
//                       {configLoading ? (
//                         <Box sx={{ display: "flex", justifyContent: "center", py: 3, flex: 1, alignItems: 'center' }}>
//                           <CircularProgress size={22} sx={{ color: theme.palette.primary.main }} />
//                         </Box>
//                       ) : (
//                         <>
//                           {/* Status + toolbar row */}
//                           <Box sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 1,
//                             mb: 1.5,
//                             flexWrap: "wrap",
//                             flexShrink: 0,
//                           }}>
//                             {/* Progress pill */}
//                             <Box sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 0.6,
//                               flex: 1,
//                               minWidth: 150,
//                               px: 1,
//                               py: 0.4,
//                               borderRadius: 1.5,
//                               bgcolor: alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.06),
//                               border: `1px solid ${alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.14)}`,
//                             }}>
//                               {configuredCount === totalConfig
//                                 ? <CheckCircleIcon sx={{ fontSize: 12, color: "#22c55e" }} />
//                                 : <ErrorOutlineIcon sx={{ fontSize: 12, color: theme.palette.primary.main }} />}
//                               <Typography sx={{
//                                 fontSize: "0.6rem",
//                                 fontWeight: 700,
//                                 color: configuredCount === totalConfig ? "#16a34a" : theme.palette.primary.main
//                               }}>
//                                 {configuredCount}/{totalConfig} configured
//                               </Typography>
//                               <Box sx={{
//                                 flex: 1,
//                                 height: 3,
//                                 borderRadius: 2,
//                                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                 overflow: "hidden"
//                               }}>
//                                 <Box sx={{
//                                   height: "100%",
//                                   borderRadius: 2,
//                                   width: `${(configuredCount / totalConfig) * 100}%`,
//                                   background: configuredCount === totalConfig
//                                     ? "linear-gradient(90deg, #22c55e, #16a34a)"
//                                     : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
//                                   transition: "width 0.4s ease",
//                                 }} />
//                               </Box>
//                             </Box>

//                             {/* Buttons */}
//                             {!isConfigEditing ? (
//                               <Button
//                                 variant="contained"
//                                 startIcon={<EditIcon sx={{ fontSize: 12 }} />}
//                                 onClick={() => setIsConfigEditing(true)}
//                                 size="small"
//                                 sx={{
//                                   height: 28,
//                                   borderRadius: 1.5,
//                                   fontWeight: 700,
//                                   fontSize: "0.6rem",
//                                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                 }}
//                               >
//                                 Edit
//                               </Button>
//                             ) : (
//                               <Box sx={{ display: "flex", gap: 0.6 }}>
//                                 <Button
//                                   variant="outlined"
//                                   color="error"
//                                   startIcon={<DeleteIcon sx={{ fontSize: 11 }} />}
//                                   onClick={() => setShowDeleteConfirm(true)}
//                                   disabled={configDeleteLoading || configUpdateLoading}
//                                   size="small"
//                                   sx={{
//                                     height: 28,
//                                     borderRadius: 1.5,
//                                     fontWeight: 700,
//                                     fontSize: "0.55rem"
//                                   }}
//                                 >
//                                   Delete
//                                 </Button>
//                                 <Button
//                                   variant="outlined"
//                                   onClick={handleCancelConfig}
//                                   disabled={configUpdateLoading}
//                                   size="small"
//                                   sx={{
//                                     height: 28,
//                                     borderRadius: 1.5,
//                                     fontWeight: 700,
//                                     fontSize: "0.55rem",
//                                     borderColor: alpha(theme.palette.divider, 0.6),
//                                     color: "text.secondary"
//                                   }}
//                                 >
//                                   Cancel
//                                 </Button>
//                                 <Button
//                                   variant="contained"
//                                   startIcon={<SaveIcon sx={{ fontSize: 11 }} />}
//                                   onClick={handleSaveConfig}
//                                   disabled={configUpdateLoading}
//                                   size="small"
//                                   sx={{
//                                     height: 28,
//                                     borderRadius: 1.5,
//                                     fontWeight: 700,
//                                     fontSize: "0.55rem",
//                                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                   }}
//                                 >
//                                   {configUpdateLoading ? <CircularProgress size={10} sx={{ color: "white" }} /> : "Save"}
//                                 </Button>
//                               </Box>
//                             )}
//                           </Box>

//                           {/* Delete confirm */}
//                           <AnimatePresence>
//                             {showDeleteConfirm && (
//                               <motion.div
//                                 initial={{ opacity: 0, y: -5 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -5 }}
//                               >
//                                 <Paper sx={{
//                                   p: 1.2,
//                                   mb: 1.5,
//                                   bgcolor: alpha("#ef4444", 0.05),
//                                   border: `1px solid ${alpha("#ef4444", 0.2)}`,
//                                   borderRadius: 1.5
//                                 }}>
//                                   <Typography
//                                     variant="caption"
//                                     sx={{
//                                       display: "block",
//                                       mb: 0.6,
//                                       color: theme.palette.error.dark,
//                                       fontSize: "0.6rem"
//                                     }}
//                                   >
//                                     Delete entire configuration? This cannot be undone.
//                                   </Typography>
//                                   <Box sx={{ display: "flex", gap: 0.7 }}>
//                                     <Button
//                                       variant="contained"
//                                       size="small"
//                                       onClick={handleDeleteConfig}
//                                       disabled={configDeleteLoading}
//                                       sx={{
//                                         height: 24,
//                                         borderRadius: 1.2,
//                                         fontWeight: 700,
//                                         fontSize: "0.55rem",
//                                         bgcolor: "#ef4444",
//                                         "&:hover": { bgcolor: "#dc2626" }
//                                       }}
//                                     >
//                                       {configDeleteLoading ? <CircularProgress size={10} sx={{ color: "white" }} /> : "Yes, Delete"}
//                                     </Button>
//                                     <Button
//                                       variant="outlined"
//                                       size="small"
//                                       onClick={() => setShowDeleteConfirm(false)}
//                                       sx={{
//                                         height: 24,
//                                         borderRadius: 1.2,
//                                         fontWeight: 700,
//                                         fontSize: "0.55rem"
//                                       }}
//                                     >
//                                       Cancel
//                                     </Button>
//                                   </Box>
//                                 </Paper>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>

//                           {/* Two-column config sections - This will scroll if needed */}
//                           <Box sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             gap: 2.5,
//                             flexWrap: "wrap",
//                             overflow: 'auto',
//                             flex: 1,
//                             pb: 1,
//                           }}>
//                             {configSections.map((section) => (
//                               <Box key={section.title} sx={{
//                                 flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" }
//                               }}>
//                                 <Card elevation={0} sx={{
//                                   borderRadius: 2.5,
//                                   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                                   overflow: "hidden",
//                                   height: "100%",
//                                   display: 'flex',
//                                   flexDirection: 'column',
//                                 }}>
//                                   <Box sx={{
//                                     px: 2,
//                                     py: 1.2,
//                                     bgcolor: alpha(theme.palette.primary.main, 0.03),
//                                     borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 1,
//                                     flexShrink: 0,
//                                   }}>
//                                     <Box sx={{
//                                       width: 26,
//                                       height: 26,
//                                       borderRadius: 1,
//                                       flexShrink: 0,
//                                       display: "flex",
//                                       alignItems: "center",
//                                       justifyContent: "center",
//                                       background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.14)}, ${alpha(theme.palette.primary.light, 0.07)})`,
//                                       color: theme.palette.primary.main,
//                                     }}>
//                                       {React.cloneElement(section.icon, { sx: { fontSize: 14 } })}
//                                     </Box>
//                                     <Typography sx={{ fontWeight: 700, fontSize: "0.75rem" }} color="text.primary">
//                                       {section.title}
//                                     </Typography>
//                                     <Box sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
//                                       {section.fields.map(({ name }) => (
//                                         <Tooltip key={name} title={configViewData[name] ? "Configured" : "Not configured"}>
//                                           <Box sx={{
//                                             width: 6,
//                                             height: 6,
//                                             borderRadius: "50%",
//                                             bgcolor: configViewData[name] ? "#22c55e" : alpha(theme.palette.text.disabled, 0.3),
//                                           }} />
//                                         </Tooltip>
//                                       ))}
//                                     </Box>
//                                   </Box>
//                                   <Box sx={{ p: 1.8, flex: 1 }}>
//                                     <Stack spacing={1.5}>
//                                       {section.fields.map(({ name, label, icon, secret }) => (
//                                         <ConfigField
//                                           key={name}
//                                           label={label}
//                                           icon={icon}
//                                           isSecret={secret}
//                                           isEditing={isConfigEditing}
//                                           fieldName={name}
//                                           value={configViewData[name]}
//                                           editValue={configFormData[name]}
//                                           onChange={handleConfigChange}
//                                           showSecretKeys={showSecretKeys}
//                                           onToggleSecret={toggleSecretKey}
//                                         />
//                                       ))}
//                                     </Stack>
//                                   </Box>
//                                 </Card>
//                               </Box>
//                             ))}
//                           </Box>
//                         </>
//                       )}
//                     </Box>
//                   </TabPanel>
//                 )}
//               </Paper>
//             </motion.div>
//           </Grid>
//         </Grid>

//       </motion.div>

//       <LogoutModal
//         show={showLogoutModal}
//         onHide={() => setShowLogoutModal(false)}
//         onConfirm={() => { dispatch(logout()); navigate("/login"); }}
//         title="Sign Out"
//         message="Are you sure you want to sign out?"
//         subMessage="You will be redirected to the login page."
//       />
//     </Container>
//   );
// };

// export default Profile;


















import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  alpha,
  IconButton,
  Tooltip,
  TextField,
  Grid,
  InputAdornment,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Tab,
  Tabs,
  Container,
  Card,
  Badge,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Logout as LogoutIcon,
  LockReset as ResetPasswordIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  VerifiedUser as SuperAdminIcon,
  CameraAlt as CameraIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Key as KeyIcon,
  Mail as MailIcon,
  VpnKey as VpnKeyIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  Fingerprint as FingerprintIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import {
  updateUser,
  getUserById,
  getConfig,
  createOrUpdateConfig,
  deleteConfig,
} from "../../redux/slices/userSlice";
import LogoutModal from "../../components/models/LogoutModal";
import { toast } from "react-toastify";

// ── animations ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] } },
});
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

// ── TabPanel ──────────────────────────────────────────────────────────────────
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      <AnimatePresence mode="wait">
        {value === index && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.16 } }}
          >
            <Box sx={{ py: { xs: 1.5, sm: 2 } }}>{children}</Box>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── InfoBlock ─────────────────────────────────────────────────────────────────
const InfoBlock = ({ icon, label, value }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: 1.2,
      px: 1.2, py: 0.9,
      borderRadius: 1.5,
      border: `1px solid ${alpha(theme.palette.primary.main, 0.07)}`,
      bgcolor: alpha(theme.palette.primary.main, 0.018),
      transition: "all 0.18s ease",
      "&:hover": {
        bgcolor: alpha(theme.palette.primary.main, 0.045),
        borderColor: alpha(theme.palette.primary.main, 0.18),
        transform: "translateX(3px)",
      },
    }}>
      <Box sx={{
        width: 28, height: 28, borderRadius: 1.2, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.13)}, ${alpha(theme.palette.primary.light, 0.06)})`,
        color: theme.palette.primary.main,
      }}>
        {React.cloneElement(icon, { sx: { fontSize: 14 } })}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="overline" color="text.secondary"
          sx={{ display: "block", lineHeight: 1.1, letterSpacing: 0.5, fontSize: "0.58rem" }}>
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600} color="text.primary"
          sx={{ wordBreak: "break-all", lineHeight: 1.3, fontSize: "0.72rem" }}>
          {value || "Not provided"}
        </Typography>
      </Box>
    </Box>
  );
};

// ── ConfigField ───────────────────────────────────────────────────────────────
const ConfigField = ({ label, value, icon, isSecret, isEditing, fieldName, editValue, onChange, showSecretKeys, onToggleSecret }) => {
  const theme = useTheme();
  const isVisible = showSecretKeys[fieldName];
  const displayValue = isEditing ? editValue : (value || "");
  const isEmpty = !value && !isEditing;
  const hasValue = Boolean(value);

  return (
    <TextField fullWidth name={fieldName} label={label}
      value={isEmpty ? "Not configured" : (isSecret && !isVisible ? "•".repeat(Math.min(displayValue.length || 8, 14)) : displayValue)}
      onChange={isEditing ? onChange : undefined}
      disabled={!isEditing} size="small"
      helperText={isEditing && isSecret ? "Leave empty to keep current" : ""}
      sx={{
        "& .MuiInputLabel-root": { fontSize: "0.68rem" },
        "& .MuiInputBase-input": {
          fontSize: "0.7rem", py: "5px",
          fontFamily: isSecret && !isVisible && hasValue ? "monospace" : "inherit",
          letterSpacing: isSecret && !isVisible && hasValue ? "0.14em" : "normal",
        },
        "& .MuiFormHelperText-root": { fontSize: "0.58rem", mt: 0.2 },
        "& .MuiOutlinedInput-root": {
          borderRadius: 1.2,
          bgcolor: !isEditing ? alpha(theme.palette.primary.main, 0.015) : "transparent",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: isEditing ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.22),
          },
          "&.Mui-focused": { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}` },
        },
        "& .Mui-disabled": {
          WebkitTextFillColor: isEmpty
            ? `${theme.palette.text.disabled} !important`
            : `${theme.palette.text.primary} !important`,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {React.cloneElement(icon, { sx: { color: isEmpty ? theme.palette.text.disabled : theme.palette.primary.main, fontSize: 14 } })}
          </InputAdornment>
        ),
        endAdornment: isSecret && hasValue && (
          <InputAdornment position="end">
            <IconButton onClick={() => onToggleSecret(fieldName)} edge="end" size="small"
              sx={{ color: theme.palette.primary.main, opacity: 0.6, p: 0.3, "&:hover": { opacity: 1 } }}>
              {isVisible ? <VisibilityOffIcon sx={{ fontSize: 14 }} /> : <VisibilityIcon sx={{ fontSize: 14 }} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userData = useSelector((state) => state.user?.userInfo || {});
  const { role_id } = useSelector((state) => state.auth || {});
  const { loading, config, configLoading, configUpdateLoading, configDeleteLoading } =
    useSelector((state) => state.user || {});

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfigEditing, setIsConfigEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSecretKeys, setShowSecretKeys] = useState({});
  const isSuperAdmin = (userData?.role_id || role_id) === 2;

  const emptyConfig = { razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", gmailUser: "", gmailAppPass: "", emailFrom: "" };
  const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", address: "", avtar: null });
  const [configFormData, setConfigFormData] = useState(emptyConfig);
  const [configViewData, setConfigViewData] = useState(emptyConfig);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Effect to handle navigation state for opening config tab
  useEffect(() => {
    // Check if we should open the config tab from navigation state
    if (location.state?.openConfigTab && isSuperAdmin) {
      setTabValue(1);
      // Clear the state to prevent reopening on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, isSuperAdmin, navigate, location.pathname]);

  const toggleSecretKey = (f) => setShowSecretKeys((p) => ({ ...p, [f]: !p[f] }));

  useEffect(() => { if (isSuperAdmin) dispatch(getConfig()); }, [dispatch, isSuperAdmin]);

  useEffect(() => {
    if (config) {
      const populated = {
        razorpayKeyId: config.paymentConfig?.razorpayKeyId || "",
        razorpayKeySecret: config.paymentConfig?.razorpayKeySecret || "",
        razorpayWebhookSecret: config.paymentConfig?.razorpayWebhookSecret || "",
        gmailUser: config.emailConfig?.gmailUser || "",
        gmailAppPass: config.emailConfig?.gmailAppPass || "",
        emailFrom: config.emailConfig?.emailFrom || "",
      };
      setConfigViewData(populated);
      setConfigFormData({ ...populated });
    }
  }, [config]);

  useEffect(() => {
    if (userData?._id) {
      setFormData({ fullName: userData.name || "", email: userData.email || "", mobile: userData.mobile_no || "", address: userData.address || "", avtar: null });
      if (userData.avtar) setPreviewImage(userData.avtar);
    }
  }, [userData]);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName": return !value?.trim() ? "Required" : value.length < 3 ? "Min 3 chars" : "";
      case "email": return !value?.trim() ? "Required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email" : "";
      case "mobile": return !value?.trim() ? "Required" : !/^\d{10}$/.test(value) ? "10 digits" : "";
      case "address": return !value?.trim() ? "Required" : "";
      default: return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5MB"); return; }
    setFormData({ ...formData, avtar: file });
    setPreviewImage(URL.createObjectURL(file));
    setImageRemoved(false);
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      mobile: validateField("mobile", formData.mobile),
      address: validateField("address", formData.address),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    const payload = new FormData();
    payload.append("name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("role_id", userData.role_id);
    payload.append("createdby", userData.createdby);
    payload.append("isActive", userData.isActive);
    if (formData.avtar) payload.append("avtar", formData.avtar);
    if (imageRemoved) payload.append("removeAvtar", "true");
    try {
      await dispatch(updateUser({ userId: userData._id, formData: payload })).unwrap();
      await dispatch(getUserById(userData._id));
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (error) { toast.error(error?.message || "Update failed"); }
  };

  const handleCancel = () => {
    setFormData({ fullName: userData.name || "", email: userData.email || "", mobile: userData.mobile_no || "", address: userData.address || "", avtar: null });
    setPreviewImage(userData.avtar || null);
    setImageRemoved(false);
    setErrors({});
    setTouched({});
    setIsEditing(false);
  };

  const handleConfigChange = (e) => { const { name, value } = e.target; setConfigFormData({ ...configFormData, [name]: value }); };

  const handleSaveConfig = async () => {
    const payload = {};
    Object.entries(configFormData).forEach(([k, v]) => { if (v) payload[k] = v; });
    if (!Object.keys(payload).length) { toast.error("Fill at least one field"); return; }
    try {
      await dispatch(createOrUpdateConfig(payload)).unwrap();
      await dispatch(getConfig());
      setIsConfigEditing(false);
      setShowSecretKeys({});
      toast.success("Configuration saved!");
    } catch (e) { console.error(e); }
  };

  const handleDeleteConfig = async () => {
    try {
      await dispatch(deleteConfig()).unwrap();
      setShowDeleteConfirm(false);
      setIsConfigEditing(false);
      setConfigFormData(emptyConfig);
      setConfigViewData(emptyConfig);
      setShowSecretKeys({});
      toast.success("Configuration deleted!");
    } catch (e) { console.error(e); }
  };

  const handleCancelConfig = () => {
    setConfigFormData({ ...configViewData });
    setIsConfigEditing(false);
    setShowDeleteConfirm(false);
    setShowSecretKeys({});
  };

  const getRoleInfo = () => {
    const id = userData?.role_id || role_id;
    if (id === 2) return { icon: <SuperAdminIcon />, label: "Super Admin", color: theme.palette.secondary.main };
    if (id === 1) return { icon: <AdminIcon />, label: "Admin", color: theme.palette.primary.main };
    return { icon: <PersonIcon />, label: "User", color: theme.palette.text.secondary };
  };
  const roleInfo = getRoleInfo();

  const editSx = {
    "& .MuiInputLabel-root": { fontSize: "0.68rem" },
    "& .MuiInputBase-input": { fontSize: "0.7rem", py: "5px" },
    "& .MuiFormHelperText-root": { fontSize: "0.58rem", mt: 0.2 },
    "& .MuiOutlinedInput-root": {
      borderRadius: 1.2,
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.palette.primary.main },
      "&.Mui-focused": { boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}` },
    },
    "& .Mui-disabled": { WebkitTextFillColor: `${theme.palette.text.secondary} !important` },
  };

  const configuredCount = Object.values(configViewData).filter(Boolean).length;
  const totalConfig = Object.keys(configViewData).length;

  const configSections = [
    {
      title: "Payment",
      icon: <KeyIcon />,
      fields: [
        { name: "razorpayKeyId", label: "Razorpay Key ID", icon: <KeyIcon />, secret: false },
        { name: "razorpayKeySecret", label: "Key Secret", icon: <VpnKeyIcon />, secret: true },
        { name: "razorpayWebhookSecret", label: "Webhook Secret", icon: <VpnKeyIcon />, secret: true },
      ],
    },
    {
      title: "Gmail",
      icon: <MailIcon />,
      fields: [
        { name: "gmailUser", label: "Gmail User", icon: <MailIcon />, secret: false },
        { name: "gmailAppPass", label: "App Password", icon: <VpnKeyIcon />, secret: true },
        { name: "emailFrom", label: "Email From", icon: <EmailIcon />, secret: false },
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{
      py: { xs: 1.5, sm: 2, md: 2.5 },
    }}>
      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* ── Header ── */}
        <motion.div {...fadeUp(0)}>
          <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
            <Typography variant="h5" fontWeight={800} sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
                }}>
              My Profile
            </Typography>
              <Typography variant="caption" color="text.secondary" sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
                          }}>
              Manage your account information and settings
            </Typography>
          </Box>
        </motion.div>

        {/* ── Main Content Row ── */}
        <Grid container spacing={{ xs: 1.5, sm: 2 }} alignItems="stretch">

          {/* ── LEFT: Profile card ── */}
          <Grid item xs={12} md={4}>
            <motion.div {...fadeUp(0.06)} style={{ height: '100%' }}>
              <Paper elevation={0} sx={{
                borderRadius: 2.5,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                overflow: "hidden",
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Banner */}
                <Box sx={{
                  height: { xs: 60, sm: 70 },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 65%, #0f2d4a 100%)`,
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: 0,
                }}>
                  {[{ s: 80, t: -25, r: -8 }, { s: 50, t: 8, r: 45 }, { s: 35, t: -10, l: 20 }].map((c, i) => (
                    <Box key={i} sx={{
                      position: "absolute", width: c.s, height: c.s, borderRadius: "50%",
                      border: `1.5px solid ${alpha("#fff", 0.15)}`,
                      bgcolor: alpha("#fff", 0.05),
                      top: c.t, right: c.r, left: c.l,
                    }} />
                  ))}
                </Box>

                {/* Avatar + info - This will expand to fill available space */}
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  px: 2.5,
                  pb: 2.5,
                  mt: { xs: -4, sm: -5 },
                  flex: 1,  // Takes remaining height
                }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={isEditing && (
                      <Tooltip title="Change Photo">
                        <IconButton size="small" component="label" sx={{
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                          width: 22,
                          height: 22,
                          "&:hover": { bgcolor: theme.palette.primary.dark },
                        }}>
                          <CameraIcon sx={{ fontSize: 12 }} />
                          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                        </IconButton>
                      </Tooltip>
                    )}
                  >
                    <Box sx={{
                      p: "2px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.dark, 0.2)}`,
                    }}>
                      {previewImage ? (
                        <Avatar
                          src={previewImage}
                          sx={{
                            width: { xs: 70, sm: 80 },
                            height: { xs: 70, sm: 80 },
                            border: `2px solid ${theme.palette.background.paper}`
                          }}
                        />
                      ) : (
                        <Avatar sx={{
                          width: { xs: 70, sm: 80 },
                          height: { xs: 70, sm: 80 },
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          border: `2px solid ${theme.palette.background.paper}`,
                        }}>
                          <PersonIcon sx={{ fontSize: { xs: 30, sm: 36 } }} />
                        </Avatar>
                      )}
                    </Box>
                  </Badge>

                  <Typography
                    fontWeight={800}
                    sx={{
                      mt: 1,
                      textAlign: "center",
                      letterSpacing: -0.3,
                      fontSize: "0.82rem",
                      lineHeight: 1.2
                    }}
                  >
                    {userData?.name || "User Name"}
                  </Typography>

                  <Chip
                    icon={React.cloneElement(roleInfo.icon, { sx: { fontSize: "11px !important", color: `${roleInfo.color} !important` } })}
                    label={roleInfo.label}
                    size="small"
                    sx={{
                      mt: 0.5,
                      height: 20,
                      fontWeight: 700,
                      fontSize: "0.58rem",
                      bgcolor: alpha(roleInfo.color, 0.1),
                      color: roleInfo.color,
                      border: `1px solid ${alpha(roleInfo.color, 0.2)}`,
                      "& .MuiChip-icon": { ml: "4px" },
                    }}
                  />

                  <Divider sx={{ width: "100%", my: 1, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

                  <Stack spacing={0.8} sx={{ width: "100%", mb: 2 }}>
                    {[
                      userData?.email && { icon: <EmailIcon />, val: userData.email },
                      userData?.mobile_no && { icon: <PhoneIcon />, val: userData.mobile_no },
                      userData?.createdAt && { icon: <CalendarIcon />, val: `Since ${new Date(userData.createdAt).toLocaleDateString()}` },
                      // userData?._id && { icon: <FingerprintIcon />, val: userData._id.slice(-10), mono: true },
                    ].filter(Boolean).map(({ icon, val, mono }, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {React.cloneElement(icon, { sx: { fontSize: 14, color: "text.secondary" } })}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                          sx={{
                            fontSize: "0.75rem", // Increased from 0.58rem
                            fontFamily: mono ? "monospace" : "inherit",
                            fontWeight: mono ? 500 : 400,
                          }}
                        >
                          {val}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  {/* Action buttons - Will stick to bottom */}
                  <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.7,
                    mt: 'auto',  // Pushes to bottom
                  }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<ResetPasswordIcon sx={{ fontSize: 12 }} />}
                      onClick={() => navigate("/reset-password-profile")}
                      sx={{
                        height: 30,
                        borderRadius: 1.5,
                        fontWeight: 700,
                        fontSize: "0.62rem",
                        borderColor: alpha(theme.palette.primary.main, 0.35),
                        color: theme.palette.primary.main
                      }}
                    >
                      Reset Password
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      startIcon={<LogoutIcon sx={{ fontSize: 12 }} />}
                      onClick={() => setShowLogoutModal(true)}
                      sx={{
                        height: 30,
                        borderRadius: 1.5,
                        fontWeight: 700,
                        fontSize: "0.62rem",
                        color: "#ef4444",
                        borderColor: alpha("#ef4444", 0.35),
                        "&:hover": { bgcolor: alpha("#ef4444", 0.05) }
                      }}
                    >
                      Log Out
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* ── RIGHT: Tabs panel ── */}
          <Grid item xs={12} md={8}>
            <motion.div {...fadeUp(0.1)} style={{ height: '100%' }}>
              <Paper elevation={0} sx={{
                borderRadius: 2.5,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                overflow: "hidden",
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Tab bar - Fixed height */}
                <Box sx={{
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.016),
                  display: "flex",
                  alignItems: "center",
                  pr: 0.5,
                  flexShrink: 0,
                }}>
                  <Tabs
                    value={tabValue}
                    onChange={(_, v) => setTabValue(v)}
                    variant={isMobile ? "fullWidth" : "standard"}
                    sx={{
                      flex: 1,
                      px: { xs: 0, sm: 0.5 },
                      minHeight: 38,
                      "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 600,
                        minHeight: 38,
                        py: 0.8,
                        fontSize: "0.68rem",
                        color: "text.secondary",
                      },
                      "& .Mui-selected": {
                        color: `${theme.palette.primary.main} !important`,
                        fontWeight: 700
                      },
                      "& .MuiTabs-indicator": {
                        height: 2,
                        borderRadius: "2px 2px 0 0",
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      },
                    }}
                  >
                    <Tab label="Personal Information" />
                    {isSuperAdmin && <Tab label="Configuration" />}
                  </Tabs>
                  {isSuperAdmin && tabValue === 1 && (
                    <Tooltip title="Refresh">
                      <IconButton
                        size="small"
                        onClick={() => dispatch(getConfig())}
                        disabled={configLoading}
                        sx={{ color: theme.palette.primary.main, p: 0.5 }}
                      >
                        <RefreshIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>

                {/* ── Personal Info ── */}
                <TabPanel value={tabValue} index={0}>
                  <Box sx={{
                    px: { xs: 1.5, sm: 2 },
                  }}>
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Grid container spacing={1.5}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name="fullName"
                                label="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.fullName && touched.fullName}
                                helperText={touched.fullName && errors.fullName}
                                size="small"
                                sx={editSx}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                value={formData.email}
                                disabled
                                size="small"
                                sx={editSx}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                name="mobile"
                                label="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.mobile && touched.mobile}
                                helperText={touched.mobile && errors.mobile}
                                size="small"
                                sx={editSx}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name="address"
                                label="Address"
                                value={formData.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={!!errors.address && touched.address}
                                helperText={touched.address && errors.address}
                                size="small"
                                multiline
                                rows={2}
                                sx={editSx}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                <Button
                                  variant="outlined"
                                  onClick={handleCancel}
                                  size="small"
                                  startIcon={<CancelIcon sx={{ fontSize: 13 }} />}
                                  sx={{
                                    height: 30,
                                    borderRadius: 1.5,
                                    fontWeight: 700,
                                    fontSize: "0.65rem",
                                    borderColor: alpha(theme.palette.divider, 0.6),
                                    color: "text.secondary"
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={handleSave}
                                  disabled={loading}
                                  size="small"
                                  startIcon={loading ? null : <SaveIcon sx={{ fontSize: 13 }} />}
                                  sx={{
                                    height: 30,
                                    borderRadius: 1.5,
                                    fontWeight: 700,
                                    fontSize: "0.65rem",
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
                                  }}
                                >
                                  {loading ? (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                      <CircularProgress size={11} sx={{ color: "white" }} />
                                      <span>Saving...</span>
                                    </Box>
                                  ) : "Save Changes"}
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="view"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Stack spacing={1.2} sx={{ mb: 2 }}>
                            <InfoBlock icon={<PersonIcon />} label="Full Name" value={userData?.name} />
                            <Box sx={{ display: "flex", gap: 0.9, flexDirection: { xs: "column", sm: "row" } }}>
                              <Box sx={{ flex: 1 }}>
                                <InfoBlock icon={<EmailIcon />} label="Email Address" value={userData?.email} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <InfoBlock icon={<PhoneIcon />} label="Mobile Number" value={userData?.mobile_no} />
                              </Box>
                            </Box>
                            <InfoBlock icon={<LocationIcon />} label="Address" value={userData?.address} />
                          </Stack>

                          <Divider sx={{ mb: 2, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

                          <Button
                            variant="contained"
                            startIcon={<EditIcon sx={{ fontSize: 13 }} />}
                            onClick={() => setIsEditing(true)}
                            size="small"
                            sx={{
                              height: 30,
                              borderRadius: 1.5,
                              fontWeight: 700,
                              fontSize: "0.65rem",
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                              boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
                              alignSelf: 'flex-start',
                            }}
                          >
                            Edit Profile
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </TabPanel>

                {/* ── Configuration ── */}
                {isSuperAdmin && (
                  <TabPanel value={tabValue} index={1}>
                    <Box sx={{
                      px: { xs: 1.5, sm: 2 },
                    }}>
                      {configLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                          <CircularProgress size={22} sx={{ color: theme.palette.primary.main }} />
                        </Box>
                      ) : (
                        <>
                          {/* Status + toolbar row */}
                          <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                            flexWrap: "wrap",
                            flexShrink: 0,
                          }}>
                            {/* Progress pill */}
                            <Box sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.6,
                              flex: 1,
                              minWidth: 150,
                              px: 1,
                              py: 0.4,
                              borderRadius: 1.5,
                              bgcolor: alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.06),
                              border: `1px solid ${alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.14)}`,
                            }}>
                              {configuredCount === totalConfig
                                ? <CheckCircleIcon sx={{ fontSize: 12, color: "#22c55e" }} />
                                : <ErrorOutlineIcon sx={{ fontSize: 12, color: theme.palette.primary.main }} />}
                              <Typography sx={{
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                color: configuredCount === totalConfig ? "#16a34a" : theme.palette.primary.main
                              }}>
                                {configuredCount}/{totalConfig} configured
                              </Typography>
                              <Box sx={{
                                flex: 1,
                                height: 3,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                overflow: "hidden"
                              }}>
                                <Box sx={{
                                  height: "100%",
                                  borderRadius: 2,
                                  width: `${(configuredCount / totalConfig) * 100}%`,
                                  background: configuredCount === totalConfig
                                    ? "linear-gradient(90deg, #22c55e, #16a34a)"
                                    : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                  transition: "width 0.4s ease",
                                }} />
                              </Box>
                            </Box>

                            {/* Buttons */}
                            {!isConfigEditing ? (
                              <Button
                                variant="contained"
                                startIcon={<EditIcon sx={{ fontSize: 12 }} />}
                                onClick={() => setIsConfigEditing(true)}
                                size="small"
                                sx={{
                                  height: 28,
                                  borderRadius: 1.5,
                                  fontWeight: 700,
                                  fontSize: "0.6rem",
                                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                }}
                              >
                                Edit
                              </Button>
                            ) : (
                              <Box sx={{ display: "flex", gap: 0.6 }}>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  startIcon={<DeleteIcon sx={{ fontSize: 11 }} />}
                                  onClick={() => setShowDeleteConfirm(true)}
                                  disabled={configDeleteLoading || configUpdateLoading}
                                  size="small"
                                  sx={{
                                    height: 28,
                                    borderRadius: 1.5,
                                    fontWeight: 700,
                                    fontSize: "0.55rem"
                                  }}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={handleCancelConfig}
                                  disabled={configUpdateLoading}
                                  size="small"
                                  sx={{
                                    height: 28,
                                    borderRadius: 1.5,
                                    fontWeight: 700,
                                    fontSize: "0.55rem",
                                    borderColor: alpha(theme.palette.divider, 0.6),
                                    color: "text.secondary"
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  startIcon={<SaveIcon sx={{ fontSize: 11 }} />}
                                  onClick={handleSaveConfig}
                                  disabled={configUpdateLoading}
                                  size="small"
                                  sx={{
                                    height: 28,
                                    borderRadius: 1.5,
                                    fontWeight: 700,
                                    fontSize: "0.55rem",
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                  }}
                                >
                                  {configUpdateLoading ? <CircularProgress size={10} sx={{ color: "white" }} /> : "Save"}
                                </Button>
                              </Box>
                            )}
                          </Box>

                          {/* Delete confirm */}
                          <AnimatePresence>
                            {showDeleteConfirm && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                              >
                                <Paper sx={{
                                  p: 1.2,
                                  mb: 1.5,
                                  bgcolor: alpha("#ef4444", 0.05),
                                  border: `1px solid ${alpha("#ef4444", 0.2)}`,
                                  borderRadius: 1.5
                                }}>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      display: "block",
                                      mb: 0.6,
                                      color: theme.palette.error.dark,
                                      fontSize: "0.6rem"
                                    }}
                                  >
                                    Delete entire configuration? This cannot be undone.
                                  </Typography>
                                  <Box sx={{ display: "flex", gap: 0.7 }}>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      onClick={handleDeleteConfig}
                                      disabled={configDeleteLoading}
                                      sx={{
                                        height: 24,
                                        borderRadius: 1.2,
                                        fontWeight: 700,
                                        fontSize: "0.55rem",
                                        bgcolor: "#ef4444",
                                        "&:hover": { bgcolor: "#dc2626" }
                                      }}
                                    >
                                      {configDeleteLoading ? <CircularProgress size={10} sx={{ color: "white" }} /> : "Yes, Delete"}
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() => setShowDeleteConfirm(false)}
                                      sx={{
                                        height: 24,
                                        borderRadius: 1.2,
                                        fontWeight: 700,
                                        fontSize: "0.55rem"
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </Box>
                                </Paper>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Two-column config sections */}
                          <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2.5,
                            flexWrap: "wrap",
                          }}>
                            {configSections.map((section) => (
                              <Box key={section.title} sx={{
                                flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" }
                              }}>
                                <Card elevation={0} sx={{
                                  borderRadius: 2.5,
                                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                  overflow: "hidden",
                                  height: "100%",
                                  display: 'flex',
                                  flexDirection: 'column',
                                }}>
                                  <Box sx={{
                                    px: 2,
                                    py: 1.2,
                                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    flexShrink: 0,
                                  }}>
                                    <Box sx={{
                                      width: 26,
                                      height: 26,
                                      borderRadius: 1,
                                      flexShrink: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.14)}, ${alpha(theme.palette.primary.light, 0.07)})`,
                                      color: theme.palette.primary.main,
                                    }}>
                                      {React.cloneElement(section.icon, { sx: { fontSize: 14 } })}
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: "0.75rem" }} color="text.primary">
                                      {section.title}
                                    </Typography>
                                    <Box sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
                                      {section.fields.map(({ name }) => (
                                        <Tooltip key={name} title={configViewData[name] ? "Configured" : "Not configured"}>
                                          <Box sx={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            bgcolor: configViewData[name] ? "#22c55e" : alpha(theme.palette.text.disabled, 0.3),
                                          }} />
                                        </Tooltip>
                                      ))}
                                    </Box>
                                  </Box>
                                  <Box sx={{ p: 1.8, flex: 1 }}>
                                    <Stack spacing={1.5}>
                                      {section.fields.map(({ name, label, icon, secret }) => (
                                        <ConfigField
                                          key={name}
                                          label={label}
                                          icon={icon}
                                          isSecret={secret}
                                          isEditing={isConfigEditing}
                                          fieldName={name}
                                          value={configViewData[name]}
                                          editValue={configFormData[name]}
                                          onChange={handleConfigChange}
                                          showSecretKeys={showSecretKeys}
                                          onToggleSecret={toggleSecretKey}
                                        />
                                      ))}
                                    </Stack>
                                  </Box>
                                </Card>
                              </Box>
                            ))}
                          </Box>
                        </>
                      )}
                    </Box>
                  </TabPanel>
                )}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

      </motion.div>

      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onConfirm={() => { dispatch(logout()); navigate("/login"); }}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        subMessage="You will be redirected to the login page."
      />
    </Container>
  );
};

export default Profile; 