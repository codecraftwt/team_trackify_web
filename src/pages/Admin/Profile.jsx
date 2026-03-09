////////////////////////////// Change Color Theam/////////////////////////////////////

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
//       navigate("/reset-password-profile");
//     } else {
//       navigate("/reset-password-profile");
//     }
//   };

//   const getRoleIcon = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return <SuperAdminIcon sx={{ color: "#f59e0b", fontSize: isMobile ? 20 : 24 }} />;
//       case 1:
//         return <AdminIcon sx={{ color: "#2563EB", fontSize: isMobile ? 20 : 24 }} />;
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
//         return "#2563EB";
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
//           "radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 90%)",
//         py: { xs: 1, sm: 1.5, md: 2 },
//         px: { xs: 1, sm: 2, md: 0 },
//         display: "flex",
//         alignItems: "center",
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
//               borderColor: alpha("#2563EB", 0.1),
//               boxShadow: `0 10px 30px -10px ${alpha("#2563EB", 0.2)}`,
//               mb: { xs: 1.5, sm: 1, md: 1 },
//               background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//             }}
//           >
//             <Box
//               sx={{
//                 p: { xs: 1.5, sm: 2, md: 2.5 },
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: "center",
//                 gap: { xs: 1.5, sm: 2, md: 2.5 },
//               }}
//             >
//               {/* Avatar Section */}
//               <Box sx={{ position: "relative" }}>
//                 {previewImage ? (
//                   <Avatar
//                     src={previewImage}
//                     sx={{
//                       width: { xs: 70, sm: 80, md: 90 },
//                       height: { xs: 70, sm: 80, md: 90 },
//                       border: "4px solid white",
//                       boxShadow: `0 4px 20px ${alpha("#2563EB", 0.2)}`,
//                     }}
//                   />
//                 ) : (
//                   <Avatar
//                     sx={{
//                       width: { xs: 70, sm: 80, md: 90 },
//                       height: { xs: 70, sm: 80, md: 90 },
//                       bgcolor: alpha("#2563EB", 0.1),
//                       color: "#2563EB",
//                       border: "4px solid white",
//                       boxShadow: `0 4px 20px ${alpha("#2563EB", 0.2)}`,
//                     }}
//                   >
//                     <PersonIcon sx={{ fontSize: { xs: 35, sm: 40, md: 45 } }} />
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
//                         background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                         color: "white",
//                         width: { xs: 24, sm: 28, md: 32 },
//                         height: { xs: 24, sm: 28, md: 32 },
//                         "&:hover": {
//                           background: "linear-gradient(135deg, #1E40AF, #2563EB)",
//                         },
//                       }}
//                     >
//                       <EditIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
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
//                         background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                         color: "white",
//                         width: { xs: 24, sm: 28, md: 32 },
//                         height: { xs: 24, sm: 28, md: 32 },
//                         "&:hover": {
//                           background: "linear-gradient(135deg, #1E40AF, #2563EB)",
//                         },
//                       }}
//                     >
//                       <CameraIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
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
//                   variant={isMobile ? "h6" : "h5"} 
//                   fontWeight={700} 
//                   color="#1e293b" 
//                   gutterBottom
//                   sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
//                 >
//                   {userData?.name || "User Name"}
//                 </Typography>
                
//                 <Box sx={{ 
//                   display: "flex", 
//                   alignItems: "center", 
//                   gap: 1, 
//                   justifyContent: { xs: "center", sm: "flex-start" }, 
//                   mb: { xs: 0.5, sm: 1 },
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
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                       height: { xs: 20, sm: 22, md: 24 },
//                     }}
//                   />
//                 </Box>

//                 {userData?.createdAt && (
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
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
//               borderColor: alpha("#2563EB", 0.1),
//               boxShadow: `0 10px 30px -10px ${alpha("#2563EB", 0.2)}`,
//               background: "#ffffff",
//             }}
//           >
//             <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               <Typography
//                 variant="subtitle2"
//                 fontWeight={600}
//                 sx={{
//                   color: "#2563EB",
//                   textTransform: "uppercase",
//                   letterSpacing: 1,
//                   mb: { xs: 1.5, sm: 2, md: 2.5 },
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                 }}
//               >
//                 Personal Information
//               </Typography>

//               {isEditing ? (
//                 // Edit Mode
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
//                             <PersonIcon sx={{ color: "#2563EB", fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: "#2563EB", fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                             <PhoneIcon sx={{ color: "#2563EB", fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <LocationIcon sx={{ color: "#2563EB", fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                         startIcon={<SaveIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                         onClick={handleSave}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           order: { xs: 1, sm: 1 },
//                           "&:hover": {
//                             background: "linear-gradient(135deg, #1E40AF, #2563EB)",
//                           },
//                         }}
//                       >
//                         {loading ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <CircularProgress size={16} sx={{ color: "white" }} />
//                             <span>Saving...</span>
//                           </Box>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </Button>

//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         startIcon={<CancelIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                         onClick={handleCancel}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           borderColor: "#e2e8f0",
//                           color: "#64748b",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           order: { xs: 2, sm: 2 },
//                           "&:hover": {
//                             borderColor: "#2563EB",
//                             color: "#2563EB",
//                             bgcolor: alpha("#2563EB", 0.1),
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
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
//                           width: { xs: 36, sm: 40, md: 44 },
//                           height: { xs: 36, sm: 40, md: 44 },
//                         }}
//                       >
//                         <EmailIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
//                           Email Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "#1e293b",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.email || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha("#2563EB", 0.1) }} />

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
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
//                           width: { xs: 36, sm: 40, md: 44 },
//                           height: { xs: 36, sm: 40, md: 44 },
//                         }}
//                       >
//                         <PhoneIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
//                           Phone Number
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "#1e293b",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                           wordBreak: 'break-all'
//                         }}>
//                           {userData?.mobile_no || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     <Divider sx={{ borderColor: alpha("#2563EB", 0.1) }} />

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
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
//                           width: { xs: 36, sm: 40, md: 44 },
//                           height: { xs: 36, sm: 40, md: 44 },
//                         }}
//                       >
//                         <LocationIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
//                           Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "#1e293b",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                           wordBreak: 'break-word'
//                         }}>
//                           {userData?.address || "Not provided"}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Stack>

//                   <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 }, borderColor: alpha("#2563EB", 0.1) }} />

//                   {/* Actions */}
//                   <Stack spacing={{ xs: 1, sm: 1.5 }}>
//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       startIcon={<ResetPasswordIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                       onClick={handleResetPassword}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         borderColor: "#2563EB",
//                         color: "#2563EB",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         "&:hover": {
//                           borderColor: "#1E40AF",
//                           bgcolor: alpha("#2563EB", 0.1),
//                         },
//                       }}
//                     >
//                       Reset Password
//                     </Button>

//                     <Button
//                       fullWidth
//                       variant="contained"
//                       startIcon={<LogoutIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                       onClick={() => setShowLogoutModal(true)}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         bgcolor: "#ef4444",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//             <Box sx={{ display: { xs: "block", md: "none" }, mt: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<EditIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 onClick={() => setIsEditing(true)}
//                 size="small"
//                 sx={{
//                   borderColor: "#2563EB",
//                   color: "#2563EB",
//                   borderRadius: { xs: 2, sm: 2.5 },
//                   py: { xs: 0.8, sm: 1 },
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                   "&:hover": {
//                     borderColor: "#1E40AF",
//                     bgcolor: alpha("#2563EB", 0.1),
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














//////////////////////////////    Centralised Color     ///////////////////////////////







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
//       navigate("/reset-password-profile");
//     } else {
//       navigate("/reset-password-profile");
//     }
//   };

//   const getRoleIcon = () => {
//     switch (userData?.role_id || role_id) {
//       case 2:
//         return <SuperAdminIcon sx={{ color: theme.palette.secondary.main, fontSize: isMobile ? 20 : 24 }} />;
//       case 1:
//         return <AdminIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 20 : 24 }} />;
//       default:
//         return <PersonIcon sx={{ color: theme.palette.text.secondary, fontSize: isMobile ? 20 : 24 }} />;
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

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         bgcolor: alpha(theme.palette.primary.main, 0.05),
//         backgroundImage: `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 90%)`,
//         py: { xs: 1, sm: 1.5, md: 2 },
//         px: { xs: 1, sm: 2, md: 0 },
//         display: "flex",
//         alignItems: "center",
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
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
//               mb: { xs: 1.5, sm: 1, md: 1 },
//               background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//             }}
//           >
//             <Box
//               sx={{
//                 p: { xs: 1.5, sm: 2, md: 2.5 },
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: "center",
//                 gap: { xs: 1.5, sm: 2, md: 2.5 },
//               }}
//             >
//               {/* Avatar Section */}
//               <Box sx={{ position: "relative" }}>
//                 {previewImage ? (
//                   <Avatar
//                     src={previewImage}
//                     sx={{
//                       width: { xs: 70, sm: 80, md: 90 },
//                       height: { xs: 70, sm: 80, md: 90 },
//                       border: "4px solid white",
//                       boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
//                     }}
//                   />
//                 ) : (
//                   <Avatar
//                     sx={{
//                       width: { xs: 70, sm: 80, md: 90 },
//                       height: { xs: 70, sm: 80, md: 90 },
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                       border: "4px solid white",
//                       boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
//                     }}
//                   >
//                     <PersonIcon sx={{ fontSize: { xs: 35, sm: 40, md: 45 } }} />
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
//                         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                         color: "white",
//                         width: { xs: 24, sm: 28, md: 32 },
//                         height: { xs: 24, sm: 28, md: 32 },
//                         "&:hover": {
//                           background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                         },
//                       }}
//                     >
//                       <EditIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
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
//                         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                         color: "white",
//                         width: { xs: 24, sm: 28, md: 32 },
//                         height: { xs: 24, sm: 28, md: 32 },
//                         "&:hover": {
//                           background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                         },
//                       }}
//                     >
//                       <CameraIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
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
//                   variant={isMobile ? "h6" : "h5"} 
//                   fontWeight={700} 
//                   color="text.primary" 
//                   gutterBottom
//                   sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}
//                 >
//                   {userData?.name || "User Name"}
//                 </Typography>
                
//                 <Box sx={{ 
//                   display: "flex", 
//                   alignItems: "center", 
//                   gap: 1, 
//                   justifyContent: { xs: "center", sm: "flex-start" }, 
//                   mb: { xs: 0.5, sm: 1 },
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
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                       height: { xs: 20, sm: 22, md: 24 },
//                     }}
//                   />
//                 </Box>

//                 {userData?.createdAt && (
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
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
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
//               background: theme.palette.background.paper,
//             }}
//           >
//             <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               <Typography
//                 variant="subtitle2"
//                 fontWeight={600}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   textTransform: "uppercase",
//                   letterSpacing: 1,
//                   mb: { xs: 1.5, sm: 2, md: 2.5 },
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                 }}
//               >
//                 Personal Information
//               </Typography>

//               {isEditing ? (
//                 // Edit Mode
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
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                         startIcon={<SaveIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                         onClick={handleSave}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           order: { xs: 1, sm: 1 },
//                           "&:hover": {
//                             background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                           },
//                         }}
//                       >
//                         {loading ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <CircularProgress size={16} sx={{ color: "white" }} />
//                             <span>Saving...</span>
//                           </Box>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </Button>

//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         startIcon={<CancelIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                         onClick={handleCancel}
//                         disabled={loading}
//                         size="small"
//                         sx={{
//                           py: { xs: 0.8, sm: 1 },
//                           borderRadius: { xs: 2, sm: 2.5 },
//                           borderColor: alpha(theme.palette.divider, 0.5),
//                           color: "text.secondary",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                           width: { xs: 36, sm: 40, md: 44 },
//                           height: { xs: 36, sm: 40, md: 44 },
//                         }}
//                       >
//                         <EmailIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
//                           Email Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
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
//                           width: { xs: 36, sm: 40, md: 44 },
//                           height: { xs: 36, sm: 40, md: 44 },
//                         }}
//                       >
//                         <PhoneIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
//                           Phone Number
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
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
//                           width: { xs: 36, sm: 40, md: 44 },
//                           height: { xs: 36, sm: 40, md: 44 },
//                         }}
//                       >
//                         <LocationIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//                       </Avatar>
//                       <Box sx={{ flex: 1, width: '100%' }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, letterSpacing: 0.5 }}>
//                           Address
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: "text.primary",
//                           fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
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
//                       startIcon={<ResetPasswordIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                       onClick={handleResetPassword}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         fontWeight: 600,
//                         fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//                       startIcon={<LogoutIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                       onClick={() => setShowLogoutModal(true)}
//                       size="small"
//                       sx={{
//                         py: { xs: 0.8, sm: 1 },
//                         borderRadius: { xs: 2, sm: 2.5 },
//                         bgcolor: "#ef4444",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
//             <Box sx={{ display: { xs: "block", md: "none" }, mt: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 startIcon={<EditIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 onClick={() => setIsEditing(true)}
//                 size="small"
//                 sx={{
//                   borderColor: theme.palette.primary.main,
//                   color: theme.palette.primary.main,
//                   borderRadius: { xs: 2, sm: 2.5 },
//                   py: { xs: 0.8, sm: 1 },
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                   "&:hover": {
//                     borderColor: theme.palette.primary.dark,
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
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

//   // Configuration state (display only - not fetched)
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
//     if (role_id === 2) {
//       navigate("/reset-password-profile");
//     } else {
//       navigate("/reset-password-profile");
//     }
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

//         {/* Tabs */}
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
//               <Tab label="Configuration" />
//             </Tabs>
//           </Box>

//           {/* Personal Information Tab */}
//           <TabPanel value={tabValue} index={0}>
//             <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               {isEditing ? (
//                 // Edit Mode
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
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.email && touched.email}
//                       helperText={touched.email && errors.email}
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
//                         '& .MuiFormHelperText-root': {
//                           fontSize: { xs: '0.55rem', sm: '0.6rem' },
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

//           {/* Configuration Tab */}
//           <TabPanel value={tabValue} index={1}>
//             <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
//               <Typography
//                 variant="subtitle2"
//                 fontWeight={600}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   textTransform: "uppercase",
//                   letterSpacing: 1,
//                   mb: { xs: 1.5, sm: 2, md: 2.5 },
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 }}
//               >
//                 Payment Configuration
//               </Typography>

//               <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="RAZORPAY_KEY_ID"
//                     value={configData.razorpayKeyId}
//                     size="small"
//                     disabled
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <KeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .Mui-disabled': {
//                         WebkitTextFillColor: theme.palette.text.primary,
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       },
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="RAZORPAY_KEY_SECRET"
//                     value={configData.razorpayKeySecret}
//                     size="small"
//                     disabled
//                     type="password"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .Mui-disabled': {
//                         WebkitTextFillColor: theme.palette.text.primary,
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       },
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="RAZORPAY_WEBHOOK_SECRET"
//                     value={configData.razorpayWebhookSecret}
//                     size="small"
//                     disabled
//                     type="password"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .Mui-disabled': {
//                         WebkitTextFillColor: theme.palette.text.primary,
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       },
//                     }}
//                   />
//                 </Grid>
//               </Grid>

//               <Typography
//                 variant="subtitle2"
//                 fontWeight={600}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   textTransform: "uppercase",
//                   letterSpacing: 1,
//                   mb: { xs: 1.5, sm: 2, md: 2.5 },
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 }}
//               >
//                 Gmail Configuration
//               </Typography>

//               <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="GMAIL_USER"
//                     value={configData.gmailUser}
//                     size="small"
//                     disabled
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <MailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .Mui-disabled': {
//                         WebkitTextFillColor: theme.palette.text.primary,
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       },
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="GMAIL_APP_PASS"
//                     value={configData.gmailAppPass}
//                     size="small"
//                     disabled
//                     type="password"
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .Mui-disabled': {
//                         WebkitTextFillColor: theme.palette.text.primary,
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       },
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     label="EMAIL_FROM"
//                     value={configData.emailFrom}
//                     size="small"
//                     disabled
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                       },
//                       '& .Mui-disabled': {
//                         WebkitTextFillColor: theme.palette.text.primary,
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       },
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </TabPanel>
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
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { updateUser, getUserById } from "../../redux/slices/userSlice";
import LogoutModal from "../../components/models/LogoutModal";
import { toast } from "react-toastify";

// TabPanel component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: { xs: 1.5, sm: 2 } }}>{children}</Box>}
    </div>
  );
}

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
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  
  // Form state for personal info
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    avtar: null,
  });

  // Configuration state (editable only for Super Admin)
  const [configData, setConfigData] = useState({
    razorpayKeyId: "",
    razorpayKeySecret: "",
    razorpayWebhookSecret: "",
    gmailUser: "",
    gmailAppPass: "",
    emailFrom: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Debug token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        const decoded = JSON.parse(jsonPayload);
        console.log("🔐 Token Debug:");
        console.log("Token payload:", decoded);
        console.log("Has role_id?", decoded.role_id !== undefined);
        console.log("role_id value:", decoded.role_id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

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
      
      // Initialize config data from user object if available
      setConfigData({
        razorpayKeyId: userData.paymentConfig?.razorpayKeyId || "",
        razorpayKeySecret: userData.paymentConfig?.razorpayKeySecret || "",
        razorpayWebhookSecret: userData.paymentConfig?.razorpayWebhookSecret || "",
        gmailUser: userData.emailConfig?.gmailUser || "",
        gmailAppPass: userData.emailConfig?.gmailAppPass || "",
        emailFrom: userData.emailConfig?.emailFrom || "",
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

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfigData({ ...configData, [name]: value });
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

  const handleSavePersonalInfo = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    const payload = new FormData();
    
    // Personal info
    payload.append("name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("role_id", userData.role_id || role_id);
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
      console.error("Update error:", error);
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveConfig = async () => {
    setIsSavingConfig(true);

    const payload = new FormData();
    
    // IMPORTANT: Send the role_id explicitly
    const currentRoleId = userData?.role_id || role_id;
    console.log("Saving config with role_id:", currentRoleId);
    payload.append("role_id", currentRoleId);
    
    // Send existing user data to prevent overwriting
    payload.append("name", userData.name || "");
    payload.append("email", userData.email || "");
    payload.append("mobile_no", userData.mobile_no || "");
    payload.append("address", userData.address || "");
    payload.append("createdby", userData.createdby || "");
    payload.append("isActive", userData.isActive ? "true" : "false");
    
    // Payment config fields
    if (configData.razorpayKeyId) payload.append("razorpayKeyId", configData.razorpayKeyId);
    if (configData.razorpayKeySecret) payload.append("razorpayKeySecret", configData.razorpayKeySecret);
    if (configData.razorpayWebhookSecret) payload.append("razorpayWebhookSecret", configData.razorpayWebhookSecret);
    
    // Email config fields
    if (configData.gmailUser) payload.append("gmailUser", configData.gmailUser);
    if (configData.gmailAppPass) payload.append("gmailAppPass", configData.gmailAppPass);
    if (configData.emailFrom) payload.append("emailFrom", configData.emailFrom);

    // Log the FormData contents for debugging
    console.log("Sending config update with fields:");
    for (let pair of payload.entries()) {
      if (pair[0].includes('secret') || pair[0].includes('pass')) {
        console.log(pair[0] + ': [HIDDEN]');
      } else {
        console.log(pair[0] + ': ' + pair[1]);
      }
    }

    try {
      const result = await dispatch(
        updateUser({ userId: userData._id, formData: payload })
      ).unwrap();
      
      console.log("Config update result:", result);
      
      // Refresh user data to get updated config
      await dispatch(getUserById(userData._id));
      
      toast.success("Configuration updated successfully!");
      setIsEditingConfig(false);
    } catch (error) {
      console.error("Config update error:", error);
      
      // Check for specific error message
      if (error?.message?.includes("Access denied") || error?.status === 403) {
        toast.error("Permission denied. Please ensure you're logged in as Super Admin.");
      } else {
        toast.error(error?.message || "Failed to update configuration");
      }
    } finally {
      setIsSavingConfig(false);
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

  const handleCancelConfig = () => {
    // Reset config data
    setConfigData({
      razorpayKeyId: userData.paymentConfig?.razorpayKeyId || "",
      razorpayKeySecret: userData.paymentConfig?.razorpayKeySecret || "",
      razorpayWebhookSecret: userData.paymentConfig?.razorpayWebhookSecret || "",
      gmailUser: userData.emailConfig?.gmailUser || "",
      gmailAppPass: userData.emailConfig?.gmailAppPass || "",
      emailFrom: userData.emailConfig?.emailFrom || "",
    });
    setIsEditingConfig(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleResetPassword = () => {
    navigate("/reset-password-profile");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset editing states when switching tabs
    setIsEditing(false);
    setIsEditingConfig(false);
  };

  const getRoleIcon = () => {
    switch (userData?.role_id || role_id) {
      case 2:
        return <SuperAdminIcon sx={{ color: theme.palette.secondary.main, fontSize: isMobile ? 18 : 20 }} />;
      case 1:
        return <AdminIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 18 : 20 }} />;
      default:
        return <PersonIcon sx={{ color: theme.palette.text.secondary, fontSize: isMobile ? 18 : 20 }} />;
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
        return theme.palette.secondary.main;
      case 1:
        return theme.palette.primary.main;
      default:
        return theme.palette.text.secondary;
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

  // Determine if current user is Super Admin (role_id = 2)
  const isSuperAdmin = (userData?.role_id || role_id) === 2;

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: { xs: 2, sm: 2.5 },
        gap: 2
      }}>
        <Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="700"
            gutterBottom
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: {
                xs: '1rem',
                sm: '1.2rem',
                md: '1.4rem',
                lg: '1.6rem',
                xl: '1.8rem'
              },
            }}
          >
            My Profile
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
            Manage your personal information and account settings
          </Typography>
        </Box>
      </Box>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Profile Header Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 2, sm: 2.5 },
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
            mb: { xs: 2, sm: 2.5 },
            background: theme.palette.background.paper,
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
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    border: "3px solid white",
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: { xs: 60, sm: 70, md: 80 },
                    height: { xs: 60, sm: 70, md: 80 },
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    border: "3px solid white",
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  <PersonIcon sx={{ fontSize: { xs: 30, sm: 35, md: 40 } }} />
                </Avatar>
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
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: "white",
                      width: { xs: 22, sm: 24, md: 26 },
                      height: { xs: 22, sm: 24, md: 26 },
                      "&:hover": {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      },
                    }}
                  >
                    <CameraIcon sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }} />
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
                variant={isMobile ? "body1" : "h6"} 
                fontWeight={600} 
                color="text.primary" 
                gutterBottom
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
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
                    fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                    height: { xs: 18, sm: 20, md: 22 },
                  }}
                />
              </Box>

              {userData?.createdAt && (
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' } }}>
                  Member since {new Date(userData.createdAt).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Tabs - Show Configuration tab only for Super Admin */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 2, sm: 2.5 },
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
            overflow: 'hidden',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "fullWidth" : "standard"}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                  minHeight: { xs: 42, sm: 48 },
                  px: { xs: 1, sm: 1.5 },
                },
                '& .Mui-selected': {
                  color: `${theme.palette.primary.main} !important`,
                },
                '& .MuiTabs-indicator': {
                  bgcolor: theme.palette.primary.main,
                },
              }}
            >
              <Tab label="Personal Information" />
              {isSuperAdmin && <Tab label="Configuration" />}
            </Tabs>
          </Box>

          {/* Personal Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
              {isEditing ? (
                // Edit Mode - Email field disabled
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
                            <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: { xs: '0.55rem', sm: '0.6rem' },
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
                      disabled
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .Mui-disabled': {
                          WebkitTextFillColor: theme.palette.text.secondary,
                          bgcolor: alpha(theme.palette.action.disabled, 0.05),
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
                            <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: { xs: '0.55rem', sm: '0.6rem' },
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
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiInputLabel-root': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .MuiInputBase-input': {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        '& .MuiFormHelperText-root': {
                          fontSize: { xs: '0.55rem', sm: '0.6rem' },
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
                        startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
                        onClick={handleSavePersonalInfo}
                        disabled={isSaving}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: 36,
                          order: { xs: 1, sm: 1 },
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                          },
                        }}
                      >
                        {isSaving ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircularProgress size={14} sx={{ color: "white" }} />
                            <span>Saving...</span>
                          </Box>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
                        onClick={handleCancel}
                        disabled={isSaving}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          borderColor: alpha(theme.palette.divider, 0.5),
                          color: "text.secondary",
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: 36,
                          order: { xs: 2, sm: 2 },
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
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
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 32, sm: 36, md: 40 },
                        }}
                      >
                        <EmailIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                      </Avatar>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
                          Email Address
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ 
                          color: "text.primary",
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          wordBreak: 'break-all'
                        }}>
                          {userData?.email || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

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
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 32, sm: 36, md: 40 },
                        }}
                      >
                        <PhoneIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                      </Avatar>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
                          Phone Number
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ 
                          color: "text.primary",
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          wordBreak: 'break-all'
                        }}>
                          {userData?.mobile_no || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

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
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          width: { xs: 32, sm: 36, md: 40 },
                          height: { xs: 32, sm: 36, md: 40 },
                        }}
                      >
                        <LocationIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                      </Avatar>
                      <Box sx={{ flex: 1, width: '100%' }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, letterSpacing: 0.5 }}>
                          Address
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ 
                          color: "text.primary",
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          wordBreak: 'break-word'
                        }}>
                          {userData?.address || "Not provided"}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: { xs: 2, sm: 2.5, md: 3 }, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

                  {/* Actions */}
                  <Stack spacing={{ xs: 1, sm: 1.5 }}>
                    <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                        onClick={() => setIsEditing(true)}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: 36,
                          "&:hover": {
                            borderColor: theme.palette.primary.dark,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        Edit Personal Info
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<ResetPasswordIcon sx={{ fontSize: 14 }} />}
                        onClick={handleResetPassword}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: 36,
                          "&:hover": {
                            borderColor: theme.palette.primary.dark,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        Reset Password
                      </Button>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<LogoutIcon sx={{ fontSize: 14 }} />}
                      onClick={() => setShowLogoutModal(true)}
                      size="small"
                      sx={{
                        py: { xs: 0.8, sm: 1 },
                        borderRadius: { xs: 2, sm: 2.5 },
                        bgcolor: "#ef4444",
                        fontWeight: 600,
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        height: 36,
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
          </TabPanel>

          {/* Configuration Tab - Only rendered for Super Admin */}
          {isSuperAdmin && (
            <TabPanel value={tabValue} index={1}>
              <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                {isEditingConfig ? (
                  // Edit Mode for Configuration
                  <>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        color: theme.palette.primary.main,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        mb: { xs: 1.5, sm: 2, md: 2.5 },
                        fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      }}
                    >
                      Payment Configuration
                    </Typography>

                    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="razorpayKeyId"
                          label="RAZORPAY_KEY_ID"
                          value={configData.razorpayKeyId}
                          onChange={handleConfigChange}
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <KeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="razorpayKeySecret"
                          label="RAZORPAY_KEY_SECRET"
                          value={configData.razorpayKeySecret}
                          onChange={handleConfigChange}
                          size="small"
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="razorpayWebhookSecret"
                          label="RAZORPAY_WEBHOOK_SECRET"
                          value={configData.razorpayWebhookSecret}
                          onChange={handleConfigChange}
                          size="small"
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        color: theme.palette.primary.main,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        mb: { xs: 1.5, sm: 2, md: 2.5 },
                        fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      }}
                    >
                      Gmail Configuration
                    </Typography>

                    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="gmailUser"
                          label="GMAIL_USER"
                          value={configData.gmailUser}
                          onChange={handleConfigChange}
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="gmailAppPass"
                          label="GMAIL_APP_PASS"
                          value={configData.gmailAppPass}
                          onChange={handleConfigChange}
                          size="small"
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="emailFrom"
                          label="EMAIL_FROM"
                          value={configData.emailFrom}
                          onChange={handleConfigChange}
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Note about configuration update */}
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: alpha(theme.palette.info.main, 0.1), borderRadius: 1.5 }}>
                      <Typography variant="caption" color="info.main" sx={{ fontSize: '0.65rem' }}>
                        Note: Configuration changes will affect payment and email services for all admins under this super admin account.
                      </Typography>
                    </Box>

                    {/* Action Buttons for Config */}
                    <Box sx={{ 
                      display: "flex", 
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 1.5 }, 
                      mt: 2.5 
                    }}>
                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SaveIcon sx={{ fontSize: 14 }} />}
                        onClick={handleSaveConfig}
                        disabled={isSavingConfig}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: 36,
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                          },
                        }}
                      >
                        {isSavingConfig ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircularProgress size={14} sx={{ color: "white" }} />
                            <span>Saving...</span>
                          </Box>
                        ) : (
                          "Save Configuration"
                        )}
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
                        onClick={handleCancelConfig}
                        disabled={isSavingConfig}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          borderColor: alpha(theme.palette.divider, 0.5),
                          color: "text.secondary",
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: 36,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </>
                ) : (
                  // View Mode for Configuration
                  <>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        color: theme.palette.primary.main,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        mb: { xs: 1.5, sm: 2, md: 2.5 },
                        fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      }}
                    >
                      Payment Configuration
                    </Typography>

                    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="RAZORPAY_KEY_ID"
                          value={configData.razorpayKeyId}
                          size="small"
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <KeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .Mui-disabled': {
                              WebkitTextFillColor: theme.palette.text.primary,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="RAZORPAY_KEY_SECRET"
                          value={configData.razorpayKeySecret}
                          size="small"
                          disabled
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .Mui-disabled': {
                              WebkitTextFillColor: theme.palette.text.primary,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="RAZORPAY_WEBHOOK_SECRET"
                          value={configData.razorpayWebhookSecret}
                          size="small"
                          disabled
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .Mui-disabled': {
                              WebkitTextFillColor: theme.palette.text.primary,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{
                        color: theme.palette.primary.main,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        mb: { xs: 1.5, sm: 2, md: 2.5 },
                        fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      }}
                    >
                      Gmail Configuration
                    </Typography>

                    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="GMAIL_USER"
                          value={configData.gmailUser}
                          size="small"
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .Mui-disabled': {
                              WebkitTextFillColor: theme.palette.text.primary,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="GMAIL_APP_PASS"
                          value={configData.gmailAppPass}
                          size="small"
                          disabled
                          type="password"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <VpnKeyIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .Mui-disabled': {
                              WebkitTextFillColor: theme.palette.text.primary,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="EMAIL_FROM"
                          value={configData.emailFrom}
                          size="small"
                          disabled
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiInputLabel-root': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .MuiInputBase-input': {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            '& .Mui-disabled': {
                              WebkitTextFillColor: theme.palette.text.primary,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Edit Button for Configuration */}
                    <Box sx={{ mt: 2.5 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<EditIcon sx={{ fontSize: 14 }} />}
                        onClick={() => setIsEditingConfig(true)}
                        size="small"
                        sx={{
                          py: { xs: 0.8, sm: 1 },
                          borderRadius: { xs: 2, sm: 2.5 },
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          height: 36,
                          "&:hover": {
                            borderColor: theme.palette.primary.dark,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          },
                        }}
                      >
                        Edit Configuration
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </TabPanel>
          )}
        </Paper>
      </motion.div>

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