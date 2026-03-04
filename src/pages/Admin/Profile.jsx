// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
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
//   Alert,
//   useTheme,
//   useMediaQuery,
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
//   Close as CloseIcon,
//   Save as SaveIcon,
//   Cancel as CancelIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../redux/slices/authSlice";
// import { updateUser, getUserById } from "../../redux/slices/userSlice";
// import LogoutModal from "../../components/models/LogoutModal";
// import { toast } from "react-toastify";

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
  
//   // Form state
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     avtar: null,
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
//     if (role_id === 2) {
//       navigate("/reset-password-ptofile");
//     } else {
//       navigate("/reset-password-ptofile");
//     }
//   };

//   const getRoleIcon = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return <SuperAdminIcon sx={{ color: "#f59e0b", fontSize: isMobile ? 20 : 24 }} />;
//       case 1:
//         return <AdminIcon sx={{ color: "#0f766e", fontSize: isMobile ? 20 : 24 }} />;
//       default:
//         return <PersonIcon sx={{ color: "#64748b", fontSize: isMobile ? 20 : 24 }} />;
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
//         return "#f59e0b";
//       case 1:
//         return "#0f766e";
//       default:
//         return "#64748b";
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

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: "#f8fafc",
//         backgroundImage:
//           "radial-gradient(circle at 10% 20%, rgba(15, 118, 110, 0.05) 0%, rgba(15, 118, 110, 0.02) 90%)",
//         py: { xs: 2, sm: 3, md: 4 },
//         px: { xs: 1, sm: 2, md: 0 },
//       }}
//     >
//       <Container 
//         maxWidth="md" 
//         disableGutters={isMobile}
//         sx={{ px: { xs: 2, sm: 3, md: 0 } }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* Profile Header Card */}
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 3, sm: 3.5, md: 4 },
//               overflow: "hidden",
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
//               mb: { xs: 2, sm: 2.5, md: 3 },
//               background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//             }}
//           >
//             <Box
//               sx={{
//                 p: { xs: 2, sm: 3, md: 4 },
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: "center",
//                 gap: { xs: 2, sm: 2.5, md: 3 },
//               }}
//             >
//               {/* Avatar Section */}
//               <Box sx={{ position: "relative" }}>
//                 {previewImage ? (
//                   <Avatar
//                     src={previewImage}
//                     sx={{
//                       width: { xs: 80, sm: 100, md: 120 },
//                       height: { xs: 80, sm: 100, md: 120 },
//                       border: "4px solid white",
//                       boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                     }}
//                   />
//                 ) : (
//                   <Avatar
//                     sx={{
//                       width: { xs: 80, sm: 100, md: 120 },
//                       height: { xs: 80, sm: 100, md: 120 },
//                       bgcolor: alpha("#0f766e", 0.1),
//                       color: "#0f766e",
//                       border: "4px solid white",
//                       boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                     }}
//                   >
//                     <PersonIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 } }} />
//                   </Avatar>
//                 )}
                
//                 {!isEditing && (
//                   <Tooltip title="Edit Profile">
//                     <IconButton
//                       size="small"
//                       onClick={() => setIsEditing(true)}
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         right: 0,
//                         bgcolor: "#0f766e",
//                         color: "white",
//                         width: { xs: 28, sm: 32, md: 36 },
//                         height: { xs: 28, sm: 32, md: 36 },
//                         "&:hover": {
//                           bgcolor: "#0a5c55",
//                         },
//                       }}
//                     >
//                       <EditIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
//                     </IconButton>
//                   </Tooltip>
//                 )}

//                 {isEditing && (
//                   <Tooltip title="Change Photo">
//                     <IconButton
//                       size="small"
//                       component="label"
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         right: 0,
//                         bgcolor: "#0f766e",
//                         color: "white",
//                         width: { xs: 28, sm: 32, md: 36 },
//                         height: { xs: 28, sm: 32, md: 36 },
//                         "&:hover": {
//                           bgcolor: "#0a5c55",
//                         },
//                       }}
//                     >
//                       <CameraIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
//                       <input
//                         type="file"
//                         hidden
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                     </IconButton>
//                   </Tooltip>
//                 )}
//               </Box>

//               {/* User Info */}
//               <Box sx={{ 
//                 textAlign: { xs: "center", sm: "left" }, 
//                 flex: 1,
//                 width: { xs: '100%', sm: 'auto' }
//               }}>
//                 <Typography 
//                   variant={isMobile ? "h5" : "h4"} 
//                   fontWeight={700} 
//                   color="#1e293b" 
//                   gutterBottom
//                   sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}
//                 >
//                   {userData?.name || "User Name"}
//                 </Typography>
                
//                 <Box sx={{ 
//                   display: "flex", 
//                   alignItems: "center", 
//                   gap: 1, 
//                   justifyContent: { xs: "center", sm: "flex-start" }, 
//                   mb: { xs: 1, sm: 2 },
//                   flexWrap: 'wrap',
//                 }}>
//                   {getRoleIcon()}
//                   <Chip
//                     label={getRoleName()}
//                     size="small"
//                     sx={{
//                       bgcolor: alpha(getRoleColor(), 0.1),
//                       color: getRoleColor(),
//                       fontWeight: 600,
//                       fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                       height: { xs: 22, sm: 24, md: 26 },
//                     }}
//                   />
//                 </Box>

//                 {userData?.createdAt && (
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' } }}>
//                     Member since {new Date(userData.createdAt).toLocaleDateString()}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Paper>

//           {/* Profile Details Card */}
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 3, sm: 3.5, md: 4 },
//               overflow: "hidden",
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
//               background: "#ffffff",
//             }}
//           >
//             <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//               <Typography
//                 variant="subtitle1"
//                 fontWeight={600}
//                 color="#0f766e"
//                 sx={{
//                   textTransform: "uppercase",
//                   letterSpacing: 1,
//                   mb: { xs: 2, sm: 2.5, md: 3 },
//                   fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                 }}
//               >
//                 Personal Information
//               </Typography>

//               {isEditing ? (
//                 // Edit Mode
//                 <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
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
//                       size={isSmallMobile ? "small" : "small"}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PersonIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.email && touched.email}
//                       helperText={touched.email && errors.email}
//                       size={isSmallMobile ? "small" : "small"}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                       size={isSmallMobile ? "small" : "small"}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PhoneIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                       size={isSmallMobile ? "small" : "small"}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <LocationIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Action Buttons */}
//                   <Grid item xs={12}>
//                     <Box sx={{ 
//                       display: "flex", 
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       gap: { xs: 1.5, sm: 2 }, 
//                       mt: { xs: 1, sm: 2 } 
//                     }}>
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         startIcon={<SaveIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                         onClick={handleSave}
//                         disabled={loading}
//                         sx={{
//                           py: { xs: 1, sm: 1.2, md: 1.5 },
//                           borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                           bgcolor: "#0f766e",
//                           fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                           order: { xs: 1, sm: 1 },
//                           "&:hover": {
//                             bgcolor: "#0a5c55",
//                           },
//                         }}
//                       >
//                         {loading ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <CircularProgress size={20} sx={{ color: "white" }} />
//                             <span>Saving...</span>
//                           </Box>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </Button>

//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         startIcon={<CancelIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                         onClick={handleCancel}
//                         disabled={loading}
//                         sx={{
//                           py: { xs: 1, sm: 1.2, md: 1.5 },
//                           borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                           borderColor: "#e2e8f0",
//                           color: "#64748b",
//                           fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                           order: { xs: 2, sm: 2 },
//                           "&:hover": {
//                             borderColor: "#0f766e",
//                             color: "#0f766e",
//                             bgcolor: alpha("#0f766e", 0.1),
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
//                   <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
//                     {/* Email */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1.5, sm: 2 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha("#0f766e", 0.1),
//                           color: "#0f766e",
//                           width: { xs: 40, sm: 44, md: 48 },
//                           height: { xs: 40, sm: 44, md: 48 },
//                         }}
//                       >
//                         <EmailIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, letterSpacing: 0.5 }}>
//                           Email Address
//                         </Typography>
//                         <Typography variant="body1" fontWeight={500} sx={{ 
//                           color: "#1e293b",
//                           fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.email || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha("#e2e8f0", 0.5) }} />

//                     {/* Phone */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1.5, sm: 2 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha("#0f766e", 0.1),
//                           color: "#0f766e",
//                           width: { xs: 40, sm: 44, md: 48 },
//                           height: { xs: 40, sm: 44, md: 48 },
//                         }}
//                       >
//                         <PhoneIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, letterSpacing: 0.5 }}>
//                           Phone Number
//                         </Typography>
//                         <Typography variant="body1" fontWeight={500} sx={{ 
//                           color: "#1e293b",
//                           fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.mobile_no || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha("#e2e8f0", 0.5) }} />

//                     {/* Address */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       gap: { xs: 1.5, sm: 2 },
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       textAlign: { xs: 'center', sm: 'left' }
//                     }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: alpha("#0f766e", 0.1),
//                           color: "#0f766e",
//                           width: { xs: 40, sm: 44, md: 48 },
//                           height: { xs: 40, sm: 44, md: 48 },
//                         }}
//                       >
//                         <LocationIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, letterSpacing: 0.5 }}>
//                           Address
//                         </Typography>
//                         <Typography variant="body1" fontWeight={500} sx={{ 
//                           color: "#1e293b",
//                           fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                           wordBreak: 'break-word'
//                         }}>
//                           {userData?.address || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Stack>

//                   <Divider sx={{ my: { xs: 3, sm: 3.5, md: 4 }, borderColor: alpha("#e2e8f0", 0.5) }} />

//                   {/* Actions */}
//                   <Stack spacing={{ xs: 1.5, sm: 2 }}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<ResetPasswordIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                       onClick={handleResetPassword}
//                       sx={{
//                         py: { xs: 1, sm: 1.2, md: 1.5 },
//                         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                         borderColor: "#0f766e",
//                         color: "#0f766e",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                         "&:hover": {
//                           borderColor: "#0a5c55",
//                           bgcolor: alpha("#0f766e", 0.1),
//                         },
//                       }}
//                     >
//                       Reset Password
//                     </Button>

//                     <Button
//                       fullWidth
//                       variant="contained"
//                       startIcon={<LogoutIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                       onClick={() => setShowLogoutModal(true)}
//                       sx={{
//                         py: { xs: 1, sm: 1.2, md: 1.5 },
//                         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                         bgcolor: "#ef4444",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
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
//           </Paper>

//           {/* Edit Button (Mobile) - Only show in view mode */}
//           {!isEditing && (
//             <Box sx={{ display: { xs: "block", md: "none" }, mt: { xs: 2, sm: 2.5, md: 3 } }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                 onClick={() => setIsEditing(true)}
//                 sx={{
//                   borderColor: "#0f766e",
//                   color: "#0f766e",
//                   borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                   py: { xs: 1, sm: 1.2, md: 1.5 },
//                   fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                   "&:hover": {
//                     borderColor: "#0a5c55",
//                     bgcolor: alpha("#0f766e", 0.1),
//                   },
//                 }}
//               >
//                 Edit Profile
//               </Button>
//             </Box>
//           )}
//         </motion.div>
//       </Container>

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
  Container,
  Paper,
  Typography,
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
  Alert,
  useTheme,
  useMediaQuery,
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
  Close as CloseIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { updateUser, getUserById } from "../../redux/slices/userSlice";
import LogoutModal from "../../components/models/LogoutModal";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const userData = useSelector((state) => state.user?.userInfo || {});
  const { role_id } = useSelector((state) => state.auth || {});
  const { loading } = useSelector((state) => state.user || {});
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    avtar: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Initialize form with user data
  useEffect(() => {
    if (userData?._id) {
      setFormData({
        fullName: userData.name || "",
        email: userData.email || "",
        mobile: userData.mobile_no || "",
        address: userData.address || "",
        avtar: null,
      });
      
      if (userData.avtar) {
        setPreviewImage(userData.avtar);
      }
    }
  }, [userData]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value?.trim()) error = "Full name is required";
        else if (value.length < 3) error = "Name must be at least 3 characters";
        break;
      case "email":
        if (!value?.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "mobile":
        if (!value?.trim()) error = "Mobile number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Invalid mobile number (10 digits required)";
        break;
      case "address":
        if (!value?.trim()) error = "Address is required";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      setFormData({ ...formData, avtar: file });
      setPreviewImage(URL.createObjectURL(file));
      setImageRemoved(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, avtar: null });
    setPreviewImage(null);
    setImageRemoved(true);
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      mobile: validateField("mobile", formData.mobile),
      address: validateField("address", formData.address),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
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

    if (formData.avtar) {
      payload.append("avtar", formData.avtar);
    }

    if (imageRemoved) {
      payload.append("removeAvtar", "true");
    }

    try {
      await dispatch(
        updateUser({ userId: userData._id, formData: payload })
      ).unwrap();
      
      // Refresh user data
      await dispatch(getUserById(userData._id));
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setImageRemoved(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    setFormData({
      fullName: userData.name || "",
      email: userData.email || "",
      mobile: userData.mobile_no || "",
      address: userData.address || "",
      avtar: null,
    });
    setPreviewImage(userData.avtar || null);
    setImageRemoved(false);
    setErrors({});
    setTouched({});
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleResetPassword = () => {
    if (role_id === 2) {
      navigate("/reset-password-ptofile");
    } else {
      navigate("/reset-password-ptofile");
    }
  };

  const getRoleIcon = () => {
    switch (userData?.role_id || role_id) {
      case 2:
        return <SuperAdminIcon sx={{ color: "#f59e0b", fontSize: isMobile ? 20 : 24 }} />;
      case 1:
        return <AdminIcon sx={{ color: "#0f766e", fontSize: isMobile ? 20 : 24 }} />;
      default:
        return <PersonIcon sx={{ color: "#64748b", fontSize: isMobile ? 20 : 24 }} />;
    }
  };

  const getRoleName = () => {
    switch (userData?.role_id || role_id) {
      case 2:
        return "Super Admin";
      case 1:
        return "Admin";
      default:
        return "User";
    }
  };

  const getRoleColor = () => {
    switch (userData?.role_id || role_id) {
      case 2:
        return "#f59e0b";
      case 1:
        return "#0f766e";
      default:
        return "#64748b";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(15, 118, 110, 0.05) 0%, rgba(15, 118, 110, 0.02) 90%)",
        py: { xs: 1, sm: 1.5, md: 2 },
        px: { xs: 1, sm: 2, md: 0 },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container 
        maxWidth="md" 
        disableGutters={isMobile}
        sx={{ px: { xs: 2, sm: 3, md: 0 } }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 3, sm: 3.5, md: 4 },
              overflow: "hidden",
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              mb: { xs: 1.5, sm: 1, md: 1 },
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            }}
          >
            <Box
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5 },
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: { xs: 1.5, sm: 2, md: 2.5 },
              }}
            >
              {/* Avatar Section */}
              <Box sx={{ position: "relative" }}>
                {previewImage ? (
                  <Avatar
                    src={previewImage}
                    sx={{
                      width: { xs: 70, sm: 80, md: 90 },
                      height: { xs: 70, sm: 80, md: 90 },
                      border: "4px solid white",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: { xs: 70, sm: 80, md: 90 },
                      height: { xs: 70, sm: 80, md: 90 },
                      bgcolor: alpha("#0f766e", 0.1),
                      color: "#0f766e",
                      border: "4px solid white",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <PersonIcon sx={{ fontSize: { xs: 35, sm: 40, md: 45 } }} />
                  </Avatar>
                )}
                
                {!isEditing && (
                  <Tooltip title="Edit Profile">
                    <IconButton
                      size="small"
                      onClick={() => setIsEditing(true)}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "#0f766e",
                        color: "white",
                        width: { xs: 24, sm: 28, md: 32 },
                        height: { xs: 24, sm: 28, md: 32 },
                        "&:hover": {
                          bgcolor: "#0a5c55",
                        },
                      }}
                    >
                      <EditIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
                    </IconButton>
                  </Tooltip>
                )}

                {isEditing && (
                  <Tooltip title="Change Photo">
                    <IconButton
                      size="small"
                      component="label"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "#0f766e",
                        color: "white",
                        width: { xs: 24, sm: 28, md: 32 },
                        height: { xs: 24, sm: 28, md: 32 },
                        "&:hover": {
                          bgcolor: "#0a5c55",
                        },
                      }}
                    >
                      <CameraIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              {/* User Info */}
              <Box sx={{ 
                textAlign: { xs: "center", sm: "left" }, 
                flex: 1,
                width: { xs: '100%', sm: 'auto' }
              }}>
                <Typography 
                  variant={isMobile ? "h6" : "h5"} 
                  fontWeight={700} 
                  color="#1e293b" 
                  gutterBottom
                  sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
                >
                  {userData?.name || "User Name"}
                </Typography>
                
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 1, 
                  justifyContent: { xs: "center", sm: "flex-start" }, 
                  mb: { xs: 0.5, sm: 1 },
                  flexWrap: 'wrap',
                }}>
                  {getRoleIcon()}
                  <Chip
                    label={getRoleName()}
                    size="small"
                    sx={{
                      bgcolor: alpha(getRoleColor(), 0.1),
                      color: getRoleColor(),
                      fontWeight: 600,
                      fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                      height: { xs: 20, sm: 22, md: 24 },
                    }}
                  />
                </Box>

                {userData?.createdAt && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
                    Member since {new Date(userData.createdAt).toLocaleDateString()}
                  </Typography>
                )}
              </Box>
            </Box>
          </Paper>

          {/* Profile Details Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 3, sm: 3.5, md: 4 },
              overflow: "hidden",
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              background: "#ffffff",
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="#0f766e"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  mb: { xs: 1.5, sm: 2, md: 2.5 },
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                }}
              >
                Personal Information
              </Typography>

              {isEditing ? (
                // Edit Mode
                <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#0f766e", fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.email && touched.email}
                      helperText={touched.email && errors.email}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#0f766e", fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: "#0f766e", fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationIcon sx={{ color: "#0f766e", fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                      }}
                    />
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ 
                      display: "flex", 
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 1.5 }, 
                      mt: { xs: 0.5, sm: 1 } 
                    }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SaveIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                        onClick={handleSave}
                        disabled={loading}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          bgcolor: "#0f766e",
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          order: { xs: 1, sm: 1 },
                          "&:hover": {
                            bgcolor: "#0a5c55",
                          },
                        }}
                      >
                        {loading ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircularProgress size={16} sx={{ color: "white" }} />
                            <span>Saving...</span>
                          </Box>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CancelIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                        onClick={handleCancel}
                        disabled={loading}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          borderColor: "#e2e8f0",
                          color: "#64748b",
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          order: { xs: 2, sm: 2 },
                          "&:hover": {
                            borderColor: "#0f766e",
                            color: "#0f766e",
                            bgcolor: alpha("#0f766e", 0.1),
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                // View Mode
                <>
                  <Stack spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
                    {/* Email */}
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: { xs: 1, sm: 1.5 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha("#0f766e", 0.1),
                          color: "#0f766e",
                          width: { xs: 36, sm: 40, md: 44 },
                          height: { xs: 36, sm: 40, md: 44 },
                        }}
                      >
                        <EmailIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
                      </Avatar>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
                          Email Address
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ 
                          color: "#1e293b",
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                          wordBreak: 'break-all'
                        }}>
                          {userData?.email || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: alpha("#e2e8f0", 0.5) }} />

                    {/* Phone */}
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: { xs: 1, sm: 1.5 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha("#0f766e", 0.1),
                          color: "#0f766e",
                          width: { xs: 36, sm: 40, md: 44 },
                          height: { xs: 36, sm: 40, md: 44 },
                        }}
                      >
                        <PhoneIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
                      </Avatar>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
                          Phone Number
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ 
                          color: "#1e293b",
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                          wordBreak: 'break-all'
                        }}>
                          {userData?.mobile_no || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: alpha("#e2e8f0", 0.5) }} />

                    {/* Address */}
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: { xs: 1, sm: 1.5 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha("#0f766e", 0.1),
                          color: "#0f766e",
                          width: { xs: 36, sm: 40, md: 44 },
                          height: { xs: 36, sm: 40, md: 44 },
                        }}
                      >
                        <LocationIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
                      </Avatar>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
                          Address
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ 
                          color: "#1e293b",
                          fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                          wordBreak: 'break-word'
                        }}>
                          {userData?.address || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 }, borderColor: alpha("#e2e8f0", 0.5) }} />

                  {/* Actions */}
                  <Stack spacing={{ xs: 1, sm: 1.5 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<ResetPasswordIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                      onClick={handleResetPassword}
                      size="small"
                      sx={{
                        py: { xs: 0.8, sm: 1 },
                        borderRadius: { xs: 2, sm: 2.5 },
                        borderColor: "#0f766e",
                        color: "#0f766e",
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        "&:hover": {
                          borderColor: "#0a5c55",
                          bgcolor: alpha("#0f766e", 0.1),
                        },
                      }}
                    >
                      Reset Password
                    </Button>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<LogoutIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                      onClick={() => setShowLogoutModal(true)}
                      size="small"
                      sx={{
                        py: { xs: 0.8, sm: 1 },
                        borderRadius: { xs: 2, sm: 2.5 },
                        bgcolor: "#ef4444",
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        "&:hover": {
                          bgcolor: "#dc2626",
                        },
                      }}
                    >
                      Sign Out
                    </Button>
                  </Stack>
                </>
              )}
            </CardContent>
          </Paper>

          {/* Edit Button (Mobile) - Only show in view mode */}
          {!isEditing && (
            <Box sx={{ display: { xs: "block", md: "none" }, mt: { xs: 1.5, sm: 2, md: 2.5 } }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<EditIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                onClick={() => setIsEditing(true)}
                size="small"
                sx={{
                  borderColor: "#0f766e",
                  color: "#0f766e",
                  borderRadius: { xs: 2, sm: 2.5 },
                  py: { xs: 0.8, sm: 1 },
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  "&:hover": {
                    borderColor: "#0a5c55",
                    bgcolor: alpha("#0f766e", 0.1),
                  },
                }}
              >
                Edit Profile
              </Button>
            </Box>
          )}
        </motion.div>
      </Container>

      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        subMessage="You will be redirected to the login page."
      />
    </Box>
  );
};

export default Profile;




