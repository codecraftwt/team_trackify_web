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
//   Card,
//   CardHeader,
//   CardMedia,
//   CardActions,
//   Collapse,
//   Alert,
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
//   Payment as PaymentIcon,
//   Settings as SettingsIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   ContentCopy as ContentCopyIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
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

// // Configuration Card Component
// const ConfigCard = ({ title, icon: Icon, children, color }) => {
//   const theme = useTheme();
  
//   return (
//     <Card
//       elevation={0}
//       sx={{
//         height: '100%',
//         borderRadius: 3,
//         border: '1px solid',
//         borderColor: alpha(color || theme.palette.primary.main, 0.2),
//         background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.02)} 0%, ${alpha('#fff', 0.5)} 100%)`,
//         transition: 'transform 0.2s, box-shadow 0.2s',
//         '&:hover': {
//           transform: 'translateY(-2px)',
//           boxShadow: `0 8px 24px ${alpha(color || theme.palette.primary.main, 0.15)}`,
//         },
//       }}
//     >
//       <CardHeader
//         avatar={
//           <Avatar
//             sx={{
//               bgcolor: alpha(color || theme.palette.primary.main, 0.1),
//               color: color || theme.palette.primary.main,
//               width: 40,
//               height: 40,
//             }}
//           >
//             <Icon sx={{ fontSize: 20 }} />
//           </Avatar>
//         }
//         title={
//           <Typography variant="subtitle1" fontWeight={600} color={color || theme.palette.primary.main}>
//             {title}
//           </Typography>
//         }
//         sx={{ pb: 0 }}
//       />
//       <CardContent sx={{ pt: 1 }}>
//         {children}
//       </CardContent>
//     </Card>
//   );
// };

// // Validation functions for config fields
// const validateRazorpayKeyId = (value) => {
//   if (!value || value.trim() === "") return "Razorpay Key ID is required";
//   if (!value.startsWith("rzp_")) return "Razorpay Key ID must start with 'rzp_'";
//   if (value.length < 10) return "Razorpay Key ID must be at least 10 characters";
//   return "";
// };

// const validateRazorpayKeySecret = (value) => {
//   if (!value || value.trim() === "") return "Razorpay Key Secret is required";
//   if (value.length < 6) return "Razorpay Key Secret must be at least 6 characters";
//   return "";
// };

// const validateRazorpayWebhookSecret = (value) => {
//   if (!value || value.trim() === "") return "Razorpay Webhook Secret is required";
//   if (value.length < 6) return "Razorpay Webhook Secret must be at least 6 characters";
//   return "";
// };

// const validateGmailUser = (value) => {
//   if (!value || value.trim() === "") return "Gmail User is required";
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(value)) return "Please enter a valid email address";
//   return "";
// };

// const validateGmailAppPass = (value) => {
//   if (!value || value.trim() === "") return "Gmail App Password is required";
//   if (value.length < 8) return "App Password must be at least 8 characters";
//   return "";
// };

// const validateEmailFrom = (value) => {
//   if (!value || value.trim() === "") return "Email From is required";
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(value)) return "Please enter a valid email address";
//   return "";
// };

// // Secret Field Component - With proper masking and validation
// const SecretField = ({ 
//   label, 
//   value, 
//   onChange, 
//   onBlur,
//   disabled, 
//   name, 
//   placeholder, 
//   helperText,
//   error,
//   touched,
//   required 
// }) => {
//   const [showSecret, setShowSecret] = useState(false);
//   const theme = useTheme();

//   // Determine what to display
//   const displayValue = value || "";
//   const inputType = showSecret ? "text" : "password";
  
//   // For placeholder when value is empty
//   const inputPlaceholder = placeholder || (disabled ? "••••••••" : "Enter value");

//   return (
//     <TextField
//       fullWidth
//       name={name}
//       label={label}
//       value={displayValue}
//       onChange={onChange}
//       onBlur={onBlur}
//       disabled={disabled}
//       size="small"
//       type={inputType}
//       placeholder={inputPlaceholder}
//       required={required}
//       error={touched && !!error}
//       helperText={touched && error ? error : helperText}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//           </InputAdornment>
//         ),
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton
//               onClick={() => setShowSecret(!showSecret)}
//               edge="end"
//               size="small"
//               sx={{ color: theme.palette.text.secondary }}
//             >
//               {showSecret ? <VisibilityOffIcon sx={{ fontSize: 16 }} /> : <VisibilityIcon sx={{ fontSize: 16 }} />}
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//       sx={{
//         '& .MuiInputLabel-root': {
//           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//         },
//         '& .MuiInputBase-input': {
//           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//         },
//         '& .Mui-disabled': {
//           WebkitTextFillColor: theme.palette.text.primary,
//           bgcolor: alpha(theme.palette.action.disabled, 0.05),
//         },
//         '& .MuiFormHelperText-root': {
//           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//           color: error && touched ? theme.palette.error.main : theme.palette.text.secondary,
//         },
//       }}
//     />
//   );
// };

// // Regular Text Field Component with validation
// const ConfigTextField = ({ 
//   label, 
//   value, 
//   onChange, 
//   onBlur,
//   disabled, 
//   name, 
//   icon: Icon, 
//   placeholder,
//   error,
//   touched,
//   required 
// }) => {
//   const theme = useTheme();

//   return (
//     <TextField
//       fullWidth
//       name={name}
//       label={label}
//       value={value}
//       onChange={onChange}
//       onBlur={onBlur}
//       disabled={disabled}
//       size="small"
//       placeholder={placeholder}
//       required={required}
//       error={touched && !!error}
//       helperText={touched && error ? error : ""}
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <Icon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//           </InputAdornment>
//         ),
//       }}
//       sx={{
//         '& .MuiInputLabel-root': {
//           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//         },
//         '& .MuiInputBase-input': {
//           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//         },
//         '& .Mui-disabled': {
//           WebkitTextFillColor: theme.palette.text.primary,
//           bgcolor: alpha(theme.palette.action.disabled, 0.05),
//         },
//         '& .MuiFormHelperText-root': {
//           fontSize: { xs: '0.55rem', sm: '0.6rem' },
//           color: error && touched ? theme.palette.error.main : theme.palette.text.secondary,
//         },
//       }}
//     />
//   );
// };

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
  
//   // Determine if user is Super Admin (role_id = 2)
//   const isSuperAdmin = (userData?.role_id || role_id) === 2;
  
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

//   // Configuration validation errors
//   const [configErrors, setConfigErrors] = useState({
//     razorpayKeyId: "",
//     razorpayKeySecret: "",
//     razorpayWebhookSecret: "",
//     gmailUser: "",
//     gmailAppPass: "",
//     emailFrom: "",
//   });

//   // Configuration touched fields
//   const [configTouched, setConfigTouched] = useState({
//     razorpayKeyId: false,
//     razorpayKeySecret: false,
//     razorpayWebhookSecret: false,
//     gmailUser: false,
//     gmailAppPass: false,
//     emailFrom: false,
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [imageRemoved, setImageRemoved] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [validationSummary, setValidationSummary] = useState("");

//   // Fetch config on component mount if Super Admin
//   useEffect(() => {
//     if (isSuperAdmin) {
//       dispatch(getConfig());
//     }
//   }, [dispatch, isSuperAdmin]);

//   // Initialize config form when config data is loaded - NOW WITH ACTUAL VALUES
//   useEffect(() => {
//     if (config) {
//       setConfigFormData({
//         razorpayKeyId: config.paymentConfig?.razorpayKeyId || "",
//         razorpayKeySecret: config.paymentConfig?.razorpayKeySecret || "",
//         razorpayWebhookSecret: config.paymentConfig?.razorpayWebhookSecret || "",
//         gmailUser: config.emailConfig?.gmailUser || "",
//         gmailAppPass: config.emailConfig?.gmailAppPass || "",
//         emailFrom: config.emailConfig?.emailFrom || "",
//       });
      
//       // Reset validation when config loads
//       setConfigErrors({
//         razorpayKeyId: "",
//         razorpayKeySecret: "",
//         razorpayWebhookSecret: "",
//         gmailUser: "",
//         gmailAppPass: "",
//         emailFrom: "",
//       });
//       setConfigTouched({
//         razorpayKeyId: false,
//         razorpayKeySecret: false,
//         razorpayWebhookSecret: false,
//         gmailUser: false,
//         gmailAppPass: false,
//         emailFrom: false,
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

//   // Validate a single config field
//   const validateConfigField = (name, value) => {
//     switch (name) {
//       case "razorpayKeyId":
//         return validateRazorpayKeyId(value);
//       case "razorpayKeySecret":
//         return validateRazorpayKeySecret(value);
//       case "razorpayWebhookSecret":
//         return validateRazorpayWebhookSecret(value);
//       case "gmailUser":
//         return validateGmailUser(value);
//       case "gmailAppPass":
//         return validateGmailAppPass(value);
//       case "emailFrom":
//         return validateEmailFrom(value);
//       default:
//         return "";
//     }
//   };

//   // Validate all config fields
//   const validateAllConfigFields = () => {
//     const newErrors = {};
//     let isValid = true;

//     Object.keys(configFormData).forEach((key) => {
//       const error = validateConfigField(key, configFormData[key]);
//       newErrors[key] = error;
//       if (error) isValid = false;
//     });

//     setConfigErrors(newErrors);
//     return isValid;
//   };

//   // Handle config field change
//   const handleConfigChange = (e) => {
//     const { name, value } = e.target;
//     setConfigFormData({ ...configFormData, [name]: value });

//     // Validate on change if field has been touched
//     if (configTouched[name]) {
//       const error = validateConfigField(name, value);
//       setConfigErrors({ ...configErrors, [name]: error });
//     }
//   };

//   // Handle config field blur
//   const handleConfigBlur = (e) => {
//     const { name, value } = e.target;
//     setConfigTouched({ ...configTouched, [name]: true });
//     const error = validateConfigField(name, value);
//     setConfigErrors({ ...configErrors, [name]: error });
//   };

//   // Validation functions for profile
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
//   const handleSaveConfig = async () => {
//     // Validate all fields
//     const isValid = validateAllConfigFields();
    
//     if (!isValid) {
//       // Mark all fields as touched to show errors
//       const allTouched = {};
//       Object.keys(configTouched).forEach(key => {
//         allTouched[key] = true;
//       });
//       setConfigTouched(allTouched);
      
//       // Show validation summary
//       const errorsList = Object.values(configErrors).filter(err => err);
//       setValidationSummary(`Please fix the following errors: ${errorsList.join(', ')}`);
      
//       // Scroll to the top of the configuration section
//       const configSection = document.getElementById('config-section');
//       if (configSection) {
//         configSection.scrollIntoView({ behavior: 'smooth' });
//       }
      
//       toast.error("Please fix validation errors before saving");
//       return;
//     }

//     // Only send fields that have values (don't send empty strings)
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
      
//       // Reset validation states
//       setConfigTouched({
//         razorpayKeyId: false,
//         razorpayKeySecret: false,
//         razorpayWebhookSecret: false,
//         gmailUser: false,
//         gmailAppPass: false,
//         emailFrom: false,
//       });
//       setConfigErrors({
//         razorpayKeyId: "",
//         razorpayKeySecret: "",
//         razorpayWebhookSecret: "",
//         gmailUser: "",
//         gmailAppPass: "",
//         emailFrom: "",
//       });
//       setValidationSummary("");
      
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
//       // Reset validation
//       setConfigErrors({
//         razorpayKeyId: "",
//         razorpayKeySecret: "",
//         razorpayWebhookSecret: "",
//         gmailUser: "",
//         gmailAppPass: "",
//         emailFrom: "",
//       });
//       setConfigTouched({
//         razorpayKeyId: false,
//         razorpayKeySecret: false,
//         razorpayWebhookSecret: false,
//         gmailUser: false,
//         gmailAppPass: false,
//         emailFrom: false,
//       });
//       setValidationSummary("");
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
//         razorpayKeySecret: config.paymentConfig?.razorpayKeySecret || "",
//         razorpayWebhookSecret: config.paymentConfig?.razorpayWebhookSecret || "",
//         gmailUser: config.emailConfig?.gmailUser || "",
//         gmailAppPass: config.emailConfig?.gmailAppPass || "",
//         emailFrom: config.emailConfig?.emailFrom || "",
//       });
//     }
//     // Reset validation
//     setConfigErrors({
//       razorpayKeyId: "",
//       razorpayKeySecret: "",
//       razorpayWebhookSecret: "",
//       gmailUser: "",
//       gmailAppPass: "",
//       emailFrom: "",
//     });
//     setConfigTouched({
//       razorpayKeyId: false,
//       razorpayKeySecret: false,
//       razorpayWebhookSecret: false,
//       gmailUser: false,
//       gmailAppPass: false,
//       emailFrom: false,
//     });
//     setValidationSummary("");
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

//   // Check if any config field has error
//   const hasConfigErrors = Object.values(configErrors).some(error => error);

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

//         {/* Tabs */}
//         <Paper
//           elevation={0}
//           id="config-section"
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
//               {isSuperAdmin && <Tab label="Configuration" />}
//             </Tabs>
            
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
//                       required
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
//                       required
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
//                       required
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
//                 <>
//                   <Stack spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
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

//           {/* Configuration Tab - Side by Side Layout with Validation */}
//           {isSuperAdmin && (
//             <TabPanel value={tabValue} index={1}>
//               <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//                 {configLoading ? (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//                     <CircularProgress size={40} />
//                   </Box>
//                 ) : (
//                   <>
//                     {/* Validation Summary */}
//                     {validationSummary && isConfigEditing && (
//                       <Alert 
//                         severity="error" 
//                         sx={{ 
//                           mb: 3, 
//                           borderRadius: 2,
//                           '& .MuiAlert-icon': {
//                             alignItems: 'center'
//                           }
//                         }}
//                         icon={<ErrorIcon />}
//                       >
//                         <Typography variant="body2" fontWeight={500}>
//                           {validationSummary}
//                         </Typography>
//                       </Alert>
//                     )}

//                     {/* Action Buttons */}
//                     <Box sx={{ 
//                       display: 'flex', 
//                       justifyContent: 'space-between', 
//                       alignItems: 'center',
//                       mb: 3,
//                       flexWrap: 'wrap',
//                       gap: 1
//                     }}>
//                       <Typography variant="h6" fontWeight={600} sx={{ color: theme.palette.primary.main }}>
//                         System Configuration
//                       </Typography>
                      
//                       {!isConfigEditing ? (
//                         <Button
//                           variant="contained"
//                           startIcon={<EditIcon sx={{ fontSize: 16 }} />}
//                           onClick={() => setIsConfigEditing(true)}
//                           size="small"
//                           sx={{
//                             px: 2,
//                             py: 0.8,
//                             borderRadius: 2,
//                             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                             fontSize: '0.75rem',
//                           }}
//                         >
//                           Edit Configuration
//                         </Button>
//                       ) : (
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Button
//                             variant="contained"
//                             color="error"
//                             startIcon={<DeleteIcon sx={{ fontSize: 14 }} />}
//                             onClick={() => setShowDeleteConfirm(true)}
//                             disabled={configDeleteLoading || configUpdateLoading}
//                             size="small"
//                             sx={{
//                               px: 1.5,
//                               py: 0.8,
//                               borderRadius: 2,
//                               bgcolor: "#ef4444",
//                               fontSize: '0.7rem',
//                               "&:hover": {
//                                 bgcolor: "#dc2626",
//                               },
//                             }}
//                           >
//                             Delete
//                           </Button>
//                           <Button
//                             variant="contained"
//                             startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
//                             onClick={handleSaveConfig}
//                             disabled={configUpdateLoading || hasConfigErrors}
//                             size="small"
//                             sx={{
//                               px: 1.5,
//                               py: 0.8,
//                               borderRadius: 2,
//                               background: hasConfigErrors 
//                                 ? alpha(theme.palette.action.disabled, 0.5)
//                                 : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                               fontSize: '0.7rem',
//                               '&:hover': {
//                                 background: hasConfigErrors 
//                                   ? alpha(theme.palette.action.disabled, 0.5)
//                                   : `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                               },
//                             }}
//                           >
//                             {configUpdateLoading ? (
//                               <CircularProgress size={14} sx={{ color: "white" }} />
//                             ) : (
//                               "Save"
//                             )}
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
//                             onClick={handleCancelConfig}
//                             disabled={configUpdateLoading}
//                             size="small"
//                             sx={{
//                               px: 1.5,
//                               py: 0.8,
//                               borderRadius: 2,
//                               borderColor: alpha(theme.palette.divider, 0.5),
//                               color: "text.secondary",
//                               fontSize: '0.7rem',
//                             }}
//                           >
//                             Cancel
//                           </Button>
//                         </Box>
//                       )}
//                     </Box>

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
//                         <Typography variant="body2" sx={{ mb: 1.5, color: theme.palette.error.dark, fontWeight: 500 }}>
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

//                     {/* Side by Side Cards */}
//                     <Grid container spacing={3}>
//                       {/* Razorpay Card */}
//                       <Grid item xs={12} md={6}>
//                         <ConfigCard 
//                           title="Razorpay Configuration" 
//                           icon={PaymentIcon}
//                           color="#6200EE"
//                         >
//                           <Stack spacing={2}>
//                             <ConfigTextField
//                               name="razorpayKeyId"
//                               label="Key ID"
//                               value={configFormData.razorpayKeyId}
//                               onChange={handleConfigChange}
//                               onBlur={handleConfigBlur}
//                               disabled={!isConfigEditing}
//                               icon={KeyIcon}
//                               placeholder="rzp_test_..."
//                               error={configErrors.razorpayKeyId}
//                               touched={configTouched.razorpayKeyId}
//                               required
//                             />
                            
//                             <SecretField
//                               name="razorpayKeySecret"
//                               label="Key Secret"
//                               value={configFormData.razorpayKeySecret}
//                               onChange={handleConfigChange}
//                               onBlur={handleConfigBlur}
//                               disabled={!isConfigEditing}
//                               placeholder="Enter new secret"
//                               helperText={isConfigEditing ? "Minimum 6 characters" : ""}
//                               error={configErrors.razorpayKeySecret}
//                               touched={configTouched.razorpayKeySecret}
//                               required
//                             />
                            
//                             <SecretField
//                               name="razorpayWebhookSecret"
//                               label="Webhook Secret"
//                               value={configFormData.razorpayWebhookSecret}
//                               onChange={handleConfigChange}
//                               onBlur={handleConfigBlur}
//                               disabled={!isConfigEditing}
//                               placeholder="Enter new webhook secret"
//                               helperText={isConfigEditing ? "Minimum 6 characters" : ""}
//                               error={configErrors.razorpayWebhookSecret}
//                               touched={configTouched.razorpayWebhookSecret}
//                               required
//                             />
//                           </Stack>
//                         </ConfigCard>
//                       </Grid>

//                       {/* Gmail Card */}
//                       <Grid item xs={12} md={6}>
//                         <ConfigCard 
//                           title="Gmail Configuration" 
//                           icon={MailIcon}
//                           color="#EA4335"
//                         >
//                           <Stack spacing={2}>
//                             <ConfigTextField
//                               name="gmailUser"
//                               label="Gmail User"
//                               value={configFormData.gmailUser}
//                               onChange={handleConfigChange}
//                               onBlur={handleConfigBlur}
//                               disabled={!isConfigEditing}
//                               icon={EmailIcon}
//                               placeholder="email@gmail.com"
//                               error={configErrors.gmailUser}
//                               touched={configTouched.gmailUser}
//                               required
//                             />
                            
//                             <SecretField
//                               name="gmailAppPass"
//                               label="App Password"
//                               value={configFormData.gmailAppPass}
//                               onChange={handleConfigChange}
//                               onBlur={handleConfigBlur}
//                               disabled={!isConfigEditing}
//                               placeholder="Enter new app password"
//                               helperText={isConfigEditing ? "Minimum 8 characters" : ""}
//                               error={configErrors.gmailAppPass}
//                               touched={configTouched.gmailAppPass}
//                               required
//                             />
                            
//                             <ConfigTextField
//                               name="emailFrom"
//                               label="Email From"
//                               value={configFormData.emailFrom}
//                               onChange={handleConfigChange}
//                               onBlur={handleConfigBlur}
//                               disabled={!isConfigEditing}
//                               icon={MailIcon}
//                               placeholder="noreply@domain.com"
//                               error={configErrors.emailFrom}
//                               touched={configTouched.emailFrom}
//                               required
//                             />
//                           </Stack>
//                         </ConfigCard>
//                       </Grid>
//                     </Grid>

//                     {/* Status Banner */}
//                     {config && !isConfigEditing && !hasConfigErrors && (
//                       <Box
//                         sx={{
//                           mt: 3,
//                           p: 2,
//                           borderRadius: 2,
//                           bgcolor: alpha(theme.palette.success.main, 0.1),
//                           border: '1px solid',
//                           borderColor: alpha(theme.palette.success.main, 0.3),
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 1,
//                         }}
//                       >
//                         <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 16 }} />
//                         <Typography variant="caption" color="text.secondary">
//                           Configuration loaded successfully. Last updated: {config.lastUpdated ? new Date(config.lastUpdated).toLocaleString() : 'N/A'}
//                         </Typography>
//                       </Box>
//                     )}
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
  CardContent,
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
  Card,
  CardHeader,
  Alert,
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
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Lock as LockIcon,
  Webhook as WebhookIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

// ─── TabPanel ────────────────────────────────────────────────────────────────
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// ─── ConfigCard ───────────────────────────────────────────────────────────────
const ConfigCard = ({ title, icon: Icon, children, color }) => {
  const theme = useTheme();
  return (
    <Card elevation={0} sx={{
      height: "100%", borderRadius: 2.5,
      border: "1px solid", borderColor: alpha(color || theme.palette.primary.main, 0.18),
      background: `linear-gradient(145deg, ${alpha(color || theme.palette.primary.main, 0.04)} 0%, ${theme.palette.background.paper} 60%)`,
      boxShadow: `0 4px 20px -6px ${alpha(color || theme.palette.primary.main, 0.15)}`,
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      "&:hover": { transform: "translateY(-3px)", boxShadow: `0 10px 28px -6px ${alpha(color || theme.palette.primary.main, 0.22)}` },
      overflow: "hidden", position: "relative",
    }}>
      <Box sx={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${alpha(color || theme.palette.primary.main, 0.12)}, transparent 70%)`, pointerEvents: "none" }} />
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: alpha(color || theme.palette.primary.main, 0.12), color: color || theme.palette.primary.main, width: 36, height: 36, border: `1.5px solid ${alpha(color || theme.palette.primary.main, 0.2)}` }}><Icon sx={{ fontSize: 17 }} /></Avatar>}
        title={<Typography variant="subtitle1" fontWeight={700} sx={{ color: color || theme.palette.primary.main, fontSize: "0.8rem" }}>{title}</Typography>}
        sx={{ pb: 0.5, pt: 1.5, px: 2, position: "relative", zIndex: 1 }}
      />
      <CardContent sx={{ pt: 1, px: 2, pb: "12px !important", position: "relative", zIndex: 1 }}>
        {children}
      </CardContent>
    </Card>
  );
};

// ─── ConfigViewRow ─────────────────────────────────────────────────────────────
const ConfigViewRow = ({ icon: Icon, label, value, isSecret, color }) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();
  const displayVal = value ? (isSecret && !show ? "•".repeat(Math.min(value.length, 16)) : value) : "—";
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, py: 0.9, px: 1.2, borderRadius: 1.5, bgcolor: alpha(color || theme.palette.primary.main, 0.04), border: "1px solid", borderColor: alpha(color || theme.palette.primary.main, 0.08), mb: 1 }}>
      <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: alpha(color || theme.palette.primary.main, 0.1), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon sx={{ fontSize: 14, color: color || theme.palette.primary.main }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: "0.55rem", fontWeight: 600, color: "text.secondary", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</Typography>
        <Typography sx={{ fontSize: "0.68rem", fontWeight: 500, color: value ? "text.primary" : "text.disabled", wordBreak: "break-all", lineHeight: 1.3, fontFamily: isSecret ? "monospace" : "inherit" }}>
          {displayVal}
        </Typography>
      </Box>
      {isSecret && value && (
        <IconButton size="small" onClick={() => setShow(!show)} sx={{ color: alpha(color || theme.palette.primary.main, 0.6), p: 0.4 }}>
          {show ? <VisibilityOffIcon sx={{ fontSize: 14 }} /> : <VisibilityIcon sx={{ fontSize: 14 }} />}
        </IconButton>
      )}
    </Box>
  );
};

// ─── Validation ───────────────────────────────────────────────────────────────
const validateRazorpayKeyId = (value) => {
  if (!value || value.trim() === "") return "Razorpay Key ID is required";
  if (!value.startsWith("rzp_")) return "Razorpay Key ID must start with 'rzp_'";
  if (value.length < 10) return "Razorpay Key ID must be at least 10 characters";
  return "";
};
const validateRazorpayKeySecret = (value) => {
  if (!value || value.trim() === "") return "Razorpay Key Secret is required";
  if (value.length < 6) return "Razorpay Key Secret must be at least 6 characters";
  return "";
};
const validateRazorpayWebhookSecret = (value) => {
  if (!value || value.trim() === "") return "Razorpay Webhook Secret is required";
  if (value.length < 6) return "Razorpay Webhook Secret must be at least 6 characters";
  return "";
};
const validateGmailUser = (value) => {
  if (!value || value.trim() === "") return "Gmail User is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
  return "";
};
const validateGmailAppPass = (value) => {
  if (!value || value.trim() === "") return "Gmail App Password is required";
  if (value.length < 8) return "App Password must be at least 8 characters";
  return "";
};
const validateEmailFrom = (value) => {
  if (!value || value.trim() === "") return "Email From is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
  return "";
};

// ─── SecretField ──────────────────────────────────────────────────────────────
const SecretField = ({ label, value, onChange, onBlur, disabled, name, placeholder, helperText, error, touched, required }) => {
  const [showSecret, setShowSecret] = useState(false);
  const theme = useTheme();
  return (
    <TextField
      fullWidth name={name} label={label} value={value || ""}
      onChange={onChange} onBlur={onBlur} disabled={disabled}
      size="small" type={showSecret ? "text" : "password"}
      placeholder={placeholder || (disabled ? "••••••••" : "Enter value")}
      required={required} error={touched && !!error}
      helperText={touched && error ? error : helperText}
      InputProps={{
        startAdornment: <InputAdornment position="start"><VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment>,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowSecret(!showSecret)} edge="end" size="small" sx={{ color: theme.palette.text.secondary }}>
              {showSecret ? <VisibilityOffIcon sx={{ fontSize: 15 }} /> : <VisibilityIcon sx={{ fontSize: 15 }} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiInputLabel-root": { fontSize: "0.72rem" },
        "& .MuiInputBase-input": { fontSize: "0.72rem", py: "6px" },
        "& .MuiFormHelperText-root": { fontSize: "0.58rem" },
        "& .MuiOutlinedInput-root": { borderRadius: 1.5, "& fieldset": { borderColor: alpha(theme.palette.primary.main, 0.18) }, "&:hover fieldset": { borderColor: alpha(theme.palette.primary.main, 0.4) } },
      }}
    />
  );
};

// ─── ConfigTextField ──────────────────────────────────────────────────────────
const ConfigTextField = ({ label, value, onChange, onBlur, disabled, name, icon: Icon, placeholder, error, touched, required }) => {
  const theme = useTheme();
  return (
    <TextField
      fullWidth name={name} label={label} value={value}
      onChange={onChange} onBlur={onBlur} disabled={disabled}
      size="small" placeholder={placeholder} required={required}
      error={touched && !!error} helperText={touched && error ? error : ""}
      InputProps={{
        startAdornment: <InputAdornment position="start"><Icon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment>,
      }}
      sx={{
        "& .MuiInputLabel-root": { fontSize: "0.72rem" },
        "& .MuiInputBase-input": { fontSize: "0.72rem", py: "6px" },
        "& .MuiFormHelperText-root": { fontSize: "0.58rem" },
        "& .MuiOutlinedInput-root": { borderRadius: 1.5, "& fieldset": { borderColor: alpha(theme.palette.primary.main, 0.18) }, "&:hover fieldset": { borderColor: alpha(theme.palette.primary.main, 0.4) } },
      }}
    />
  );
};

// ─── InfoRow ──────────────────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value, color, theme }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.2, borderRadius: 2, bgcolor: alpha(color || theme.palette.primary.main, 0.04), border: "1px solid", borderColor: alpha(color || theme.palette.primary.main, 0.1), transition: "all 0.2s ease", "&:hover": { borderColor: alpha(color || theme.palette.primary.main, 0.25), transform: "translateX(3px)", boxShadow: `0 2px 10px -4px ${alpha(color || theme.palette.primary.main, 0.15)}` } }}>
    <Box sx={{ width: 30, height: 30, borderRadius: 1.5, flexShrink: 0, bgcolor: alpha(color || theme.palette.primary.main, 0.1), border: `1px solid ${alpha(color || theme.palette.primary.main, 0.15)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon sx={{ fontSize: 15, color: color || theme.palette.primary.main }} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography sx={{ fontSize: "0.56rem", fontWeight: 600, color: "text.secondary", letterSpacing: "0.06em", textTransform: "uppercase", mb: 0.1 }}>{label}</Typography>
      <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, color: "text.primary", wordBreak: "break-all", lineHeight: 1.35 }}>{value || "Not provided"}</Typography>
    </Box>
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userData = useSelector((state) => state.user?.userInfo || {});
  const { role_id } = useSelector((state) => state.auth || {});
  const { loading, config, configLoading, configUpdateLoading, configDeleteLoading } = useSelector((state) => state.user || {});

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfigEditing, setIsConfigEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isSuperAdmin = (userData?.role_id || role_id) === 2;

  const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", address: "", avtar: null });
  const [configFormData, setConfigFormData] = useState({ razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", gmailUser: "", gmailAppPass: "", emailFrom: "" });

  const emptyConfigErrors = { razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", gmailUser: "", gmailAppPass: "", emailFrom: "" };
  const emptyConfigTouched = { razorpayKeyId: false, razorpayKeySecret: false, razorpayWebhookSecret: false, gmailUser: false, gmailAppPass: false, emailFrom: false };

  const [configErrors, setConfigErrors] = useState(emptyConfigErrors);
  const [configTouched, setConfigTouched] = useState(emptyConfigTouched);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [validationSummary, setValidationSummary] = useState("");

  useEffect(() => { if (isSuperAdmin) dispatch(getConfig()); }, [dispatch, isSuperAdmin]);

  useEffect(() => {
    if (config) {
      setConfigFormData({ razorpayKeyId: config.paymentConfig?.razorpayKeyId || "", razorpayKeySecret: config.paymentConfig?.razorpayKeySecret || "", razorpayWebhookSecret: config.paymentConfig?.razorpayWebhookSecret || "", gmailUser: config.emailConfig?.gmailUser || "", gmailAppPass: config.emailConfig?.gmailAppPass || "", emailFrom: config.emailConfig?.emailFrom || "" });
      setConfigErrors(emptyConfigErrors);
      setConfigTouched(emptyConfigTouched);
    }
  }, [config]);

  useEffect(() => {
    if (userData?._id) {
      setFormData({ fullName: userData.name || "", email: userData.email || "", mobile: userData.mobile_no || "", address: userData.address || "", avtar: null });
      if (userData.avtar) setPreviewImage(userData.avtar);
    }
  }, [userData]);

  const validateConfigField = (name, value) => {
    switch (name) {
      case "razorpayKeyId": return validateRazorpayKeyId(value);
      case "razorpayKeySecret": return validateRazorpayKeySecret(value);
      case "razorpayWebhookSecret": return validateRazorpayWebhookSecret(value);
      case "gmailUser": return validateGmailUser(value);
      case "gmailAppPass": return validateGmailAppPass(value);
      case "emailFrom": return validateEmailFrom(value);
      default: return "";
    }
  };

  const validateAllConfigFields = () => {
    const newErrors = {};
    let isValid = true;
    Object.keys(configFormData).forEach((key) => { const e = validateConfigField(key, configFormData[key]); newErrors[key] = e; if (e) isValid = false; });
    setConfigErrors(newErrors);
    return isValid;
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfigFormData({ ...configFormData, [name]: value });
    if (configTouched[name]) setConfigErrors({ ...configErrors, [name]: validateConfigField(name, value) });
  };

  const handleConfigBlur = (e) => {
    const { name, value } = e.target;
    setConfigTouched({ ...configTouched, [name]: true });
    setConfigErrors({ ...configErrors, [name]: validateConfigField(name, value) });
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName": if (!value?.trim()) error = "Full name is required"; else if (value.length < 3) error = "Name must be at least 3 characters"; break;
      case "email": if (!value?.trim()) error = "Email is required"; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format"; break;
      case "mobile": if (!value?.trim()) error = "Mobile number is required"; else if (!/^\d{10}$/.test(value)) error = "Invalid mobile number (10 digits required)"; break;
      case "address": if (!value?.trim()) error = "Address is required"; break;
      default: break;
    }
    return error;
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
    if (file) {
      if (file.size > 5 * 1024 * 1024) { toast.error("File size should be less than 5MB"); return; }
      setFormData({ ...formData, avtar: file });
      setPreviewImage(URL.createObjectURL(file));
      setImageRemoved(false);
    }
  };

  const validateForm = () => {
    const newErrors = { fullName: validateField("fullName", formData.fullName), email: validateField("email", formData.email), mobile: validateField("mobile", formData.mobile), address: validateField("address", formData.address) };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    const payload = new FormData();
    payload.append("name", formData.fullName); payload.append("email", formData.email); payload.append("mobile_no", formData.mobile); payload.append("address", formData.address); payload.append("role_id", userData.role_id); payload.append("createdby", userData.createdby); payload.append("isActive", userData.isActive);
    if (formData.avtar) payload.append("avtar", formData.avtar);
    if (imageRemoved) payload.append("removeAvtar", "true");
    try {
      await dispatch(updateUser({ userId: userData._id, formData: payload })).unwrap();
      await dispatch(getUserById(userData._id));
      toast.success("Profile updated successfully!");
      setIsEditing(false); setImageRemoved(false);
    } catch (error) { toast.error(error?.message || "Failed to update profile"); }
  };

  const handleCancel = () => {
    setFormData({ fullName: userData.name || "", email: userData.email || "", mobile: userData.mobile_no || "", address: userData.address || "", avtar: null });
    setPreviewImage(userData.avtar || null); setImageRemoved(false); setErrors({}); setTouched({}); setIsEditing(false);
  };

  const handleSaveConfig = async () => {
    const isValid = validateAllConfigFields();
    if (!isValid) {
      const allTouched = {}; Object.keys(configTouched).forEach(k => { allTouched[k] = true; }); setConfigTouched(allTouched);
      const errorsList = Object.values(configErrors).filter(Boolean);
      setValidationSummary(`Please fix the following errors: ${errorsList.join(", ")}`);
      const s = document.getElementById("config-section"); if (s) s.scrollIntoView({ behavior: "smooth" });
      toast.error("Please fix validation errors before saving"); return;
    }
    const configPayload = {};
    if (configFormData.razorpayKeyId) configPayload.razorpayKeyId = configFormData.razorpayKeyId;
    if (configFormData.razorpayKeySecret) configPayload.razorpayKeySecret = configFormData.razorpayKeySecret;
    if (configFormData.razorpayWebhookSecret) configPayload.razorpayWebhookSecret = configFormData.razorpayWebhookSecret;
    if (configFormData.gmailUser) configPayload.gmailUser = configFormData.gmailUser;
    if (configFormData.gmailAppPass) configPayload.gmailAppPass = configFormData.gmailAppPass;
    if (configFormData.emailFrom) configPayload.emailFrom = configFormData.emailFrom;
    if (Object.keys(configPayload).length === 0) { toast.error("Please fill at least one field to update"); return; }
    try {
      await dispatch(createOrUpdateConfig(configPayload)).unwrap();
      await dispatch(getConfig());
      setIsConfigEditing(false); setConfigTouched(emptyConfigTouched); setConfigErrors(emptyConfigErrors); setValidationSummary("");
      toast.success("Configuration updated successfully!");
    } catch (error) { console.error("Config update error:", error); }
  };

  const handleDeleteConfig = async () => {
    try {
      await dispatch(deleteConfig()).unwrap();
      setShowDeleteConfirm(false); setIsConfigEditing(false);
      setConfigFormData({ razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", gmailUser: "", gmailAppPass: "", emailFrom: "" });
      setConfigErrors(emptyConfigErrors); setConfigTouched(emptyConfigTouched); setValidationSummary("");
      toast.success("Configuration deleted successfully!");
    } catch (error) { console.error("Config delete error:", error); }
  };

  const handleCancelConfig = () => {
    if (config) setConfigFormData({ razorpayKeyId: config.paymentConfig?.razorpayKeyId || "", razorpayKeySecret: config.paymentConfig?.razorpayKeySecret || "", razorpayWebhookSecret: config.paymentConfig?.razorpayWebhookSecret || "", gmailUser: config.emailConfig?.gmailUser || "", gmailAppPass: config.emailConfig?.gmailAppPass || "", emailFrom: config.emailConfig?.emailFrom || "" });
    setConfigErrors(emptyConfigErrors); setConfigTouched(emptyConfigTouched); setValidationSummary(""); setIsConfigEditing(false); setShowDeleteConfirm(false);
  };

  const handleRefreshConfig = () => dispatch(getConfig());
  const handleLogout = () => { dispatch(logout()); navigate("/login"); };
  const handleResetPassword = () => navigate("/reset-password-profile");
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const getRoleIcon = () => {
    switch (userData?.role_id || role_id) {
      case 2: return <SuperAdminIcon sx={{ color: theme.palette.secondary.main, fontSize: 18 }} />;
      case 1: return <AdminIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />;
      default: return <PersonIcon sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />;
    }
  };
  const getRoleName = () => { switch (userData?.role_id || role_id) { case 2: return "Super Admin"; case 1: return "Admin"; default: return "User"; } };
  const getRoleColor = () => { switch (userData?.role_id || role_id) { case 2: return theme.palette.secondary.main; case 1: return theme.palette.primary.main; default: return theme.palette.text.secondary; } };

  const containerVariants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, staggerChildren: 0.08 } } };
  const hasConfigErrors = Object.values(configErrors).some(Boolean);

  const sharedFieldSx = {
    "& .MuiInputLabel-root": { fontSize: "0.72rem" },
    "& .MuiInputBase-input": { fontSize: "0.72rem", py: "6px" },
    "& .MuiFormHelperText-root": { fontSize: "0.58rem" },
    "& .MuiOutlinedInput-root": { borderRadius: 1.5, "& fieldset": { borderColor: alpha(theme.palette.primary.main, 0.18) }, "&:hover fieldset": { borderColor: alpha(theme.palette.primary.main, 0.4) } },
  };

  return (
    <>
      <style>{`
        @keyframes avatarGlow {
          0%,100% { box-shadow: 0 0 0 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.1); }
          50% { box-shadow: 0 0 0 5px rgba(0,0,0,0.03), 0 5px 20px rgba(0,0,0,0.14); }
        }
        .profile-avatar { animation: avatarGlow 3.5s ease-in-out infinite; }
      `}</style>

      <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 }, minHeight: "100vh", background: `linear-gradient(155deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${theme.palette.background.default} 40%)` }}>

        {/* ── Header ── */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
          <Box>
            <Typography fontWeight="700" sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: "1rem", sm: "1.2rem", md: "1.35rem" } }}>
              My Profile
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: { xs: "0.62rem", sm: "0.68rem" } }}>
              Manage your personal information and account settings
            </Typography>
          </Box>
          {!isEditing && tabValue === 0 && (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outlined" startIcon={<EditIcon sx={{ fontSize: 14 }} />} onClick={() => setIsEditing(true)} size="small"
                sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main, fontSize: "0.68rem", height: 30, borderRadius: 2, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.07) } }}>
                Edit Profile
              </Button>
            </motion.div>
          )}
        </Box>

        <motion.div initial="hidden" animate="visible" variants={containerVariants}>

          {/* ── Profile Header Card ── */}
       <Paper elevation={0} sx={{ borderRadius: 2.5, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1.5, overflow: "hidden", boxShadow: `0 4px 20px -8px ${alpha(theme.palette.primary.main, 0.12)}` }}>
  {/* banner - removed background and circles */}
  <Box sx={{ height: 0 }} />

  <Box sx={{ 
    px: { xs: 2, sm: 2.5 }, 
    py: { xs: 1.5, sm: 2 },
    display: "flex", 
    flexDirection: { xs: "column", sm: "row" }, 
    alignItems: { xs: "center", sm: "flex-end" }, 
    gap: { xs: 1, sm: 1.5 }
  }}>
    <Box sx={{ position: "relative", flexShrink: 0 }}>
      {previewImage
        ? <Avatar className="profile-avatar" src={previewImage} sx={{ width: { xs: 52, sm: 60, md: 66 }, height: { xs: 52, sm: 60, md: 66 }, border: `3px solid ${theme.palette.background.paper}` }} />
        : <Avatar className="profile-avatar" sx={{ width: { xs: 52, sm: 60, md: 66 }, height: { xs: 52, sm: 60, md: 66 }, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, border: `3px solid ${theme.palette.background.paper}` }}><PersonIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} /></Avatar>
      }
      {isEditing && (
        <Tooltip title="Change Photo">
          <IconButton size="small" component="label" sx={{ position: "absolute", bottom: 0, right: 0, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, color: "white", width: 20, height: 20, "&:hover": { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` } }}>
            <CameraIcon sx={{ fontSize: 11 }} />
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </IconButton>
        </Tooltip>
      )}
    </Box>

    <Box sx={{ 
      textAlign: { xs: "center", sm: "left" }, 
      pb: 0.3,
      flex: 1
    }}>
      <Typography fontWeight={600} color="text.primary" sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" }, lineHeight: 1.2 }}>
        {userData?.name || "User Name"}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, justifyContent: { xs: "center", sm: "flex-start" }, mt: 0.4 }}>
        {getRoleIcon()}
        <Chip label={getRoleName()} size="small" sx={{ bgcolor: alpha(getRoleColor(), 0.1), color: getRoleColor(), fontWeight: 600, fontSize: "0.58rem", height: 18 }} />
      </Box>
      {userData?.createdAt && (
        <Typography color="text.secondary" sx={{ fontSize: "0.58rem", mt: 0.3 }}>
          Member since {new Date(userData.createdAt).toLocaleDateString()}
        </Typography>
      )}
    </Box>
  </Box>
</Paper>

          {/* ── Tabs Card ── */}
          <Paper elevation={0} id="config-section" sx={{ borderRadius: 2.5, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden", boxShadow: `0 4px 20px -8px ${alpha(theme.palette.primary.main, 0.08)}` }}>
            <Box sx={{ borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, display: "flex", justifyContent: "space-between", alignItems: "center", pr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              <Tabs value={tabValue} onChange={handleTabChange} variant={isMobile ? "fullWidth" : "standard"}
                sx={{ flex: 1, "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: { xs: "0.62rem", sm: "0.68rem" }, minHeight: { xs: 38, sm: 42 }, px: { xs: 1, sm: 1.5 } }, "& .Mui-selected": { color: `${theme.palette.primary.main} !important` }, "& .MuiTabs-indicator": { bgcolor: theme.palette.primary.main, height: 2.5, borderRadius: 2 } }}>
                <Tab label="Personal Information" />
                {isSuperAdmin && <Tab label="Configuration" />}
              </Tabs>
              {isSuperAdmin && tabValue === 1 && (
                <Tooltip title="Refresh Configuration">
                  <IconButton size="small" onClick={handleRefreshConfig} disabled={configLoading} sx={{ color: theme.palette.primary.main }}>
                    <RefreshIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {/* ── Tab 0: Personal Information ── */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                {isEditing ? (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <Grid container spacing={1.2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} error={!!errors.fullName && touched.fullName} helperText={touched.fullName && errors.fullName} size="small" required
                          InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment> }} sx={sharedFieldSx} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth name="mobile" label="Mobile Number" value={formData.mobile} onChange={handleChange} onBlur={handleBlur} error={!!errors.mobile && touched.mobile} helperText={touched.mobile && errors.mobile} size="small" required
                          InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment> }} sx={sharedFieldSx} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth name="email" label="Email Address" type="email" value={formData.email} disabled size="small"
                          InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: alpha(theme.palette.primary.main, 0.4), fontSize: 15 }} /></InputAdornment> }}
                          sx={{ ...sharedFieldSx, "& .Mui-disabled": { WebkitTextFillColor: theme.palette.text.secondary, bgcolor: alpha(theme.palette.action.disabled, 0.05) } }} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth name="address" label="Address" value={formData.address} onChange={handleChange} onBlur={handleBlur} error={!!errors.address && touched.address} helperText={touched.address && errors.address} size="small" required multiline rows={2}
                          InputProps={{ startAdornment: <InputAdornment position="start"><LocationIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment> }} sx={sharedFieldSx} />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", mt: 0.5 }}>
                          <Button variant="outlined" startIcon={<CancelIcon sx={{ fontSize: 13 }} />} onClick={handleCancel} disabled={loading} size="small"
                            sx={{ fontSize: "0.68rem", height: 30, borderRadius: 2, borderColor: alpha(theme.palette.divider, 0.5), color: "text.secondary", "&:hover": { borderColor: theme.palette.primary.main, color: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.06) } }}>
                            Cancel
                          </Button>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="contained" startIcon={<SaveIcon sx={{ fontSize: 13 }} />} onClick={handleSave} disabled={loading} size="small"
                              sx={{ fontSize: "0.68rem", height: 30, borderRadius: 2, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`, "&:hover": { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` } }}>
                              {loading ? <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}><CircularProgress size={12} sx={{ color: "white" }} /><span>Saving...</span></Box> : "Save Changes"}
                            </Button>
                          </motion.div>
                        </Box>
                      </Grid>
                    </Grid>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    <Stack spacing={1}>
                      {[
                        { icon: EmailIcon, label: "Email Address", value: userData?.email, color: theme.palette.primary.main },
                        { icon: PhoneIcon, label: "Phone Number", value: userData?.mobile_no, color: "#10b981" },
                        { icon: LocationIcon, label: "Address", value: userData?.address, color: "#f59e0b" },
                      ].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                          <InfoRow {...item} theme={theme} />
                        </motion.div>
                      ))}
                    </Stack>

                    <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.08) }} />

                    <Stack spacing={1}>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button fullWidth variant="outlined" startIcon={<ResetPasswordIcon sx={{ fontSize: 13 }} />} onClick={handleResetPassword} size="small"
                          sx={{ borderRadius: 2, borderColor: theme.palette.primary.main, color: theme.palette.primary.main, fontWeight: 600, fontSize: "0.68rem", height: 32, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.07) } }}>
                          Reset Password
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button fullWidth variant="contained" startIcon={<LogoutIcon sx={{ fontSize: 13 }} />} onClick={() => setShowLogoutModal(true)} size="small"
                          sx={{ borderRadius: 2, bgcolor: "#ef4444", fontWeight: 600, fontSize: "0.68rem", height: 32, boxShadow: `0 4px 12px ${alpha("#ef4444", 0.28)}`, "&:hover": { bgcolor: "#dc2626" } }}>
                          Sign Out
                        </Button>
                      </motion.div>
                    </Stack>
                  </motion.div>
                )}
              </Box>
            </TabPanel>

            {/* ── Tab 1: Configuration ── */}
            {isSuperAdmin && (
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                  {configLoading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}><CircularProgress size={36} /></Box>
                  ) : (
                    <>
                      {validationSummary && isConfigEditing && (
                        <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2, borderRadius: 2, "& .MuiAlert-icon": { alignItems: "center" }, "& .MuiAlert-message": { fontSize: "0.7rem" } }}>
                          {validationSummary}
                        </Alert>
                      )}

                      {/* Action row */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 1 }}>
                        <Typography fontWeight={700} sx={{ color: theme.palette.primary.main, fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 0.7 }}>
                          <SettingsIcon sx={{ fontSize: 16 }} /> System Configuration
                        </Typography>
                        {!isConfigEditing ? (
                          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            <Button variant="contained" startIcon={<EditIcon sx={{ fontSize: 14 }} />} onClick={() => setIsConfigEditing(true)} size="small"
                              sx={{ px: 1.8, py: 0.6, borderRadius: 2, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, fontSize: "0.7rem", boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}` }}>
                              Edit Config
                            </Button>
                          </motion.div>
                        ) : (
                          <Box sx={{ display: "flex", gap: 0.8 }}>
                            <Button variant="contained" startIcon={<DeleteIcon sx={{ fontSize: 13 }} />} onClick={() => setShowDeleteConfirm(true)} disabled={configDeleteLoading || configUpdateLoading} size="small"
                              sx={{ px: 1.2, py: 0.6, borderRadius: 2, bgcolor: "#ef4444", fontSize: "0.65rem", "&:hover": { bgcolor: "#dc2626" } }}>
                              Delete
                            </Button>
                            <Button variant="contained" startIcon={<SaveIcon sx={{ fontSize: 13 }} />} onClick={handleSaveConfig} disabled={configUpdateLoading || hasConfigErrors} size="small"
                              sx={{ px: 1.2, py: 0.6, borderRadius: 2, background: hasConfigErrors ? alpha(theme.palette.action.disabled, 0.5) : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, fontSize: "0.65rem" }}>
                              {configUpdateLoading ? <CircularProgress size={12} sx={{ color: "white" }} /> : "Save"}
                            </Button>
                            <Button variant="outlined" startIcon={<CancelIcon sx={{ fontSize: 13 }} />} onClick={handleCancelConfig} disabled={configUpdateLoading} size="small"
                              sx={{ px: 1.2, py: 0.6, borderRadius: 2, borderColor: alpha(theme.palette.divider, 0.5), color: "text.secondary", fontSize: "0.65rem" }}>
                              Cancel
                            </Button>
                          </Box>
                        )}
                      </Box>

                      {/* Delete confirm */}
                      {showDeleteConfirm && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Paper sx={{ p: 1.5, mb: 2, bgcolor: alpha(theme.palette.error.main, 0.07), border: "1px solid", borderColor: alpha(theme.palette.error.main, 0.25), borderRadius: 2 }}>
                            <Typography sx={{ mb: 1, fontSize: "0.7rem", color: theme.palette.error.dark, fontWeight: 500 }}>
                              ⚠️ Delete entire configuration? This cannot be undone.
                            </Typography>
                            <Box sx={{ display: "flex", gap: 0.8 }}>
                              <Button variant="contained" size="small" onClick={handleDeleteConfig} disabled={configDeleteLoading} sx={{ fontSize: "0.65rem", height: 26, borderRadius: 1.5, bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" } }}>
                                {configDeleteLoading ? <CircularProgress size={11} sx={{ color: "white" }} /> : "Yes, Delete"}
                              </Button>
                              <Button variant="outlined" size="small" onClick={() => setShowDeleteConfirm(false)} sx={{ fontSize: "0.65rem", height: 26, borderRadius: 1.5 }}>Cancel</Button>
                            </Box>
                          </Paper>
                        </motion.div>
                      )}

                      {/* Config cards — VIEW mode: info rows, EDIT mode: inputs */}
                      <Grid container spacing={2}>
                        {/* Razorpay */}
                        <Grid item xs={12} md={6}>
                          <ConfigCard title="Razorpay Configuration" icon={PaymentIcon} color="#6200EE">
                            {isConfigEditing ? (
                              <Stack spacing={1.2}>
                                <ConfigTextField name="razorpayKeyId" label="Key ID" value={configFormData.razorpayKeyId} onChange={handleConfigChange} onBlur={handleConfigBlur} disabled={false} icon={KeyIcon} placeholder="rzp_test_..." error={configErrors.razorpayKeyId} touched={configTouched.razorpayKeyId} required />
                                <SecretField name="razorpayKeySecret" label="Key Secret" value={configFormData.razorpayKeySecret} onChange={handleConfigChange} onBlur={handleConfigBlur} disabled={false} placeholder="Enter new secret" helperText="Minimum 6 characters" error={configErrors.razorpayKeySecret} touched={configTouched.razorpayKeySecret} required />
                                <SecretField name="razorpayWebhookSecret" label="Webhook Secret" value={configFormData.razorpayWebhookSecret} onChange={handleConfigChange} onBlur={handleConfigBlur} disabled={false} placeholder="Enter new webhook secret" helperText="Minimum 6 characters" error={configErrors.razorpayWebhookSecret} touched={configTouched.razorpayWebhookSecret} required />
                              </Stack>
                            ) : (
                              <Box>
                                <ConfigViewRow icon={KeyIcon} label="Key ID" value={configFormData.razorpayKeyId} isSecret={false} color="#6200EE" />
                                <ConfigViewRow icon={LockIcon} label="Key Secret" value={configFormData.razorpayKeySecret} isSecret={true} color="#6200EE" />
                                <ConfigViewRow icon={VpnKeyIcon} label="Webhook Secret" value={configFormData.razorpayWebhookSecret} isSecret={true} color="#6200EE" />
                              </Box>
                            )}
                          </ConfigCard>
                        </Grid>

                        {/* Gmail */}
                        <Grid item xs={12} md={6}>
                          <ConfigCard title="Gmail Configuration" icon={MailIcon} color="#EA4335">
                            {isConfigEditing ? (
                              <Stack spacing={1.2}>
                                <ConfigTextField name="gmailUser" label="Gmail User" value={configFormData.gmailUser} onChange={handleConfigChange} onBlur={handleConfigBlur} disabled={false} icon={EmailIcon} placeholder="email@gmail.com" error={configErrors.gmailUser} touched={configTouched.gmailUser} required />
                                <SecretField name="gmailAppPass" label="App Password" value={configFormData.gmailAppPass} onChange={handleConfigChange} onBlur={handleConfigBlur} disabled={false} placeholder="Enter new app password" helperText="Minimum 8 characters" error={configErrors.gmailAppPass} touched={configTouched.gmailAppPass} required />
                                <ConfigTextField name="emailFrom" label="Email From" value={configFormData.emailFrom} onChange={handleConfigChange} onBlur={handleConfigBlur} disabled={false} icon={MailIcon} placeholder="noreply@domain.com" error={configErrors.emailFrom} touched={configTouched.emailFrom} required />
                              </Stack>
                            ) : (
                              <Box>
                                <ConfigViewRow icon={EmailIcon} label="Gmail User" value={configFormData.gmailUser} isSecret={false} color="#EA4335" />
                                <ConfigViewRow icon={LockIcon} label="App Password" value={configFormData.gmailAppPass} isSecret={true} color="#EA4335" />
                                <ConfigViewRow icon={MailIcon} label="Email From" value={configFormData.emailFrom} isSecret={false} color="#EA4335" />
                              </Box>
                            )}
                          </ConfigCard>
                        </Grid>
                      </Grid>

                      {/* Status banner */}
                      {config && !isConfigEditing && !hasConfigErrors && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                          <Box sx={{ mt: 2, p: 1.2, borderRadius: 2, bgcolor: alpha(theme.palette.success.main, 0.07), border: "1px solid", borderColor: alpha(theme.palette.success.main, 0.2), display: "flex", alignItems: "center", gap: 1 }}>
                            <CheckCircleIcon sx={{ color: theme.palette.success.main, fontSize: 14 }} />
                            <Typography color="text.secondary" sx={{ fontSize: "0.62rem" }}>
                              Configuration loaded. Last updated: {config.lastUpdated ? new Date(config.lastUpdated).toLocaleString() : "N/A"}
                            </Typography>
                          </Box>
                        </motion.div>
                      )}
                    </>
                  )}
                </Box>
              </TabPanel>
            )}
          </Paper>
        </motion.div>

        <LogoutModal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} onConfirm={handleLogout} title="Sign Out" message="Are you sure you want to sign out?" subMessage="You will be redirected to the login page." />
      </Box>
    </>
  );
};

export default Profile;