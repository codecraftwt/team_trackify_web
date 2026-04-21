// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Avatar,
//   IconButton,
//   Grid,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   FormLabel,
//   FormControl,
//   InputAdornment,
//   CircularProgress,
//   Alert,
//   alpha,
//   Chip,
//   useMediaQuery,
//   useTheme,
//   Checkbox,
// } from "@mui/material";
// import {
//   Person as PersonIcon,
//   Email as EmailIcon,
//   Lock as LockIcon,
//   Phone as PhoneIcon,
//   Home as HomeIcon,
//   CameraAlt as CameraIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   Close as CloseIcon,
//   AdminPanelSettings as AdminPanelSettingsIcon,
//   Business as BusinessIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, updateUser, updateUserPermissions } from "../../../redux/slices/userSlice";
// import { toast } from "react-toastify";

// const AddUser = ({ open, onClose, editingUser = null }) => {
//   // console.log("Editing user data ------------------------>", editingUser);
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');
//   const isLandscape = useMediaQuery('(orientation: landscape)');

//   const userDataa = JSON.parse(localStorage.getItem("user"));
//   const role_id = userDataa?.role_id;
//   const currentUserId =
//     userDataa?._id || userDataa?.id || userDataa?.userId || userDataa?.user_id;
//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const loading = useSelector((state) => state.user?.loading || false);

//   // Local loading state to prevent double submission
//   const [submitting, setSubmitting] = useState(false);


//   const isSuperAdmin = Number(role_id) === 2;
//   const isAdmin = Number(role_id) === 1;
//   const isSubAdmin = Number(role_id) === 3;
//   const editingUserId =
//     editingUser?._id ||
//     editingUser?.id ||
//     editingUser?.userId ||
//     editingUser?.user_id;
//   const isEditingSelf =
//     Boolean(currentUserId) &&
//     Boolean(editingUserId) &&
//     String(currentUserId) === String(editingUserId);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//     address: "",
//     status: "active",
//     avtar: null,
//     role_id: 0,
//     adminPanelAccess: true,
//   });

//   const [errors, setErrors] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//     address: "",
//     avtar: "",
//   });

//   const [touched, setTouched] = useState({});
//   const [imageRemoved, setImageRemoved] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);


//   useEffect(() => {
//     if (!open) {
//       setSubmitting(false);
//     }
//   }, [open]);

//   // Get title based on role
//   const getTitle = () => {
//     if (isSuperAdmin) {
//       return editingUser ? "Edit Admin" : "Add New Admin";
//     } else {
//       return editingUser ? "Edit User" : "Add New User";
//     }
//   };

//   // Get name field label based on role
//   const getNameFieldLabel = () => {
//     if (isSuperAdmin) {
//       return editingUser ? "User Name" : "Organization Name";
//     } else {
//       return "User Name";
//     }
//   };

//   // Get name field icon based on role
//   const getNameFieldIcon = () => {
//     if (isSuperAdmin && !editingUser) {
//       return <BusinessIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />;
//     } else {
//       return <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />;
//     }
//   };

//   useEffect(() => {
//     if (editingUser) {
//       setFormData({
//         fullName: editingUser.name || "",
//         email: editingUser.email || "",
//         mobile: editingUser.mobile_no || "",
//         address: editingUser.address || "",
//         status: editingUser?.isActive ? "active" : "inactive",
//         avtar: null,
//         role_id: Number(editingUser.role_id) || 0,
//         adminPanelAccess: editingUser.permissions
//           ? editingUser.permissions.includes("admin_panel")
//           : (Number(editingUser.role_id) === 3),
//       });
//       setImageRemoved(false);
//       if (editingUser.avtar) {
//         setPreviewImage(editingUser.avtar);
//       }
//     } else {
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         mobile: "",
//         address: "",
//         status: "active",
//         avtar: null,
//         role_id: 0,
//         adminPanelAccess: false,
//       });
//       setPreviewImage(null);
//       setErrors({});
//       setTouched({});
//       setImageRemoved(false);
//     }
//   }, [editingUser, open]);

//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "fullName":
//         if (!value?.trim()) {
//           if (isSuperAdmin && !editingUser) {
//             error = "Organization name is required";
//           } else {
//             error = "User name is required";
//           }
//         } else if (value.length < 3) {
//           if (isSuperAdmin && !editingUser) {
//             error = "Organization name must be at least 3 characters";
//           } else {
//             error = "Name must be at least 3 characters";
//           }
//         } else if (value.length > 50) {
//           error = "Name must be less than 50 characters";
//         }
//         break;
//       case "email":
//         if (!value?.trim()) error = "Email is required";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           error = "Invalid email format";
//         else if (value.length > 100) error = "Email must be less than 100 characters";
//         break;
//       case "password":
//         if (!editingUser) {
//           if (!value?.trim()) error = "Password is required";
//           else if (value.length < 6)
//             error = "Password must be at least 6 characters";
//           else if (value.length > 20)
//             error = "Password must be less than 20 characters";
//           else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
//             error = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
//         }
//         break;
//       case "confirmPassword":
//         if (!editingUser) {
//           if (!value?.trim()) error = "Please confirm password";
//           else if (value !== formData.password) error = "Passwords don't match";
//         }
//         break;
//       case "mobile":
//         if (!value?.trim()) error = "Mobile number is required";
//         else if (!/^\d{10}$/.test(value))
//           error = "Invalid mobile number (10 digits required)";
//         break;
//       case "address":
//         if (!value?.trim()) error = "Address is required";
//         else if (value.length < 5) error = "Address must be at least 5 characters";
//         else if (value.length > 200) error = "Address must be less than 200 characters";
//         break;
//       default:
//         break;
//     }

//     return error;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "mobile") {
//       const numericValue = value.replace(/[^0-9]/g, "");
//       if (numericValue.length <= 10) {
//         setFormData({ ...formData, [name]: numericValue });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }

//     if (touched[name]) {
//       const error = validateField(name, name === "mobile" ? value.replace(/[^0-9]/g, "") : value);
//       setErrors({ ...errors, [name]: error });
//     }
//     if (name === "password" && touched.confirmPassword) {
//       const confirmError = validateField("confirmPassword", formData.confirmPassword);
//       setErrors({ ...errors, confirmPassword: confirmError });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({ ...touched, [name]: true });

//     let fieldValue = value;
//     if (name === "mobile") {
//       fieldValue = value.replace(/[^0-9]/g, "");
//     }

//     const error = validateField(name, fieldValue);
//     setErrors({ ...errors, [name]: error });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Check file type
//       const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//       if (!allowedTypes.includes(file.type)) {
//         setErrors({ ...errors, avtar: "Only JPG, PNG, and GIF images are allowed" });
//         return;
//       }

//       // Check file size (5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors({ ...errors, avtar: "File size should be less than 5MB" });
//         return;
//       }

//       setErrors({ ...errors, avtar: "" });
//       setFormData({ ...formData, avtar: file });

//       // Create preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);

//       setImageRemoved(false);
//     }
//   };

//   const removeImage = () => {
//     setFormData({ ...formData, avtar: null });
//     setPreviewImage(null);
//     setImageRemoved(true);
//     setErrors({ ...errors, avtar: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {
//       fullName: validateField("fullName", formData.fullName),
//       email: validateField("email", formData.email),
//       mobile: validateField("mobile", formData.mobile),
//       address: validateField("address", formData.address),
//     };

//     if (!editingUser) {
//       newErrors.password = validateField("password", formData.password);
//       newErrors.confirmPassword = validateField(
//         "confirmPassword",
//         formData.confirmPassword
//       );
//     }

//     setErrors(newErrors);


//     const allTouched = {};
//     Object.keys(newErrors).forEach(key => {
//       allTouched[key] = true;
//     });
//     setTouched(allTouched);

//     return !Object.values(newErrors).some((error) => error);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     if (!validateForm()) return;


//     if (submitting) return;

//     setSubmitting(true);

//     const payload = new FormData();
//     payload.append("name", formData.fullName);
//     payload.append("email", formData.email);

//     // Only send createdby and adminId for NEW users
//     if (!editingUser) {
//       const creatorId = userDataa?._id || userData?._id;
//       payload.append("createdby", creatorId);

//       if (isSubAdmin || isAdmin) {
//         const rootAdminId = isSubAdmin 
//           ? (userDataa?.adminId?._id || (typeof userDataa?.adminId === 'string' ? userDataa.adminId : null))
//           : creatorId;
          
//         if (rootAdminId) {
//           payload.append("adminId", rootAdminId);
//         } else if (isSubAdmin) {
//           console.warn("Sub-admin has no adminId - checking token...");
//           // Fallback to token decoding if needed
//           try {
//             const token = localStorage.getItem('token');
//             if (token) {
//               const base64Payload = token.split('.')[1];
//               const decoded = JSON.parse(atob(base64Payload));
//               if (decoded.adminId) payload.append("adminId", decoded.adminId);
//             }
//           } catch (e) {
//             console.error('Failed to decode token:', e);
//           }
//         }
//       }
//     }

//     payload.append("mobile_no", formData.mobile);
//     payload.append("address", formData.address);
//     payload.append("isActive", formData.status === "active");

//     if (!editingUser) {
//       if (isAdmin) {
//         payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
//       } else if (isSuperAdmin) {
//         payload.append("role_id", 1);
//       } else {
//         payload.append("role_id", 0);
//       }
//     } else if (isAdmin && (Number(editingUser.role_id) === 0 || Number(editingUser.role_id) === 3)) {
//       payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
//     }

//     // Handle avatar
//     if (formData.avtar && formData.avtar instanceof File) {
//       payload.append("avtar", formData.avtar);
//     }

//     if (editingUser && imageRemoved) {
//       payload.append("removeAvtar", "true");
//     }

   
//     const permissions = formData.adminPanelAccess ? ["admin_panel"] : [];
//     payload.append("permissions", JSON.stringify(permissions));
    
//     for (let pair of payload.entries()) {
//     }

//     try {

//       if (editingUser) {
//         const userId = editingUser._id || editingUser.id;
//         if (!userId) {
//           throw new Error("User ID is missing");
//         }

//         let result;
//         if (Number(formData.role_id) === 3 && !formData.avtar && !imageRemoved) {
//           const role_id = Number(formData.role_id);
//           result = await dispatch(
//             updateUserPermissions({ userId, permissions, role_id })
//           ).unwrap();
//         } else {
        
//           result = await dispatch(
//             updateUser({ userId: userId, formData: payload })
//           ).unwrap();
//         }
//         toast.success("User updated successfully!");
//       } else {
//         payload.append("password", formData.password);
//         payload.append("confirmPassword", formData.confirmPassword);
//         await dispatch(registerUser(payload)).unwrap();
//         toast.success("User created successfully!");
//       }
//       onClose(true); 
//     } catch (error) {
//       // Extract message from various possible structures
//       let errorMessage = "Operation failed";
//       if (typeof error === 'string') {
//         errorMessage = error;
//       } else if (error?.message) {
//         errorMessage = error.message;
//       } else if (error?.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error?.data?.message) {
//         errorMessage = error.data.message;
//       } else if (error?.message) {
//         errorMessage = error.message;
//       }
//       toast.error(errorMessage, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       console.error("Final toast error message:", errorMessage);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     if (!submitting) {
//       onClose(false);
//     }
//   };

//   // Determine dialog max width and full screen based on screen size
//   const getDialogProps = () => {
//     if (isSmallMobile) {
//       return {
//         fullScreen: true,
//         maxWidth: false,
//       };
//     } else if (isMobile) {
//       return {
//         fullScreen: isLandscape ? false : true,
//         maxWidth: 'sm',
//       };
//     } else {
//       return {
//         fullScreen: false,
//         maxWidth: 'sm',
//       };
//     }
//   };

//   const isLoading = submitting || loading;

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       {...getDialogProps()}
//       fullWidth
//       disableEscapeKeyDown={isLoading}
//       PaperProps={{
//         sx: {
//           borderRadius: {
//             xs: isSmallMobile ? 0 : 2,
//             sm: 2.5,
//             md: 3
//           },
//           overflow: "hidden",
//           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           m: { xs: 0, sm: 1.5, md: 2 },
//           height: {
//             xs: isSmallMobile ? '100%' : 'auto',
//             sm: 'auto'
//           },
//         },
//       }}
//     >
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
//           >
//             {/* Header */}
//             <Box
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 py: { xs: 1.5, sm: 1.75, md: 2 },
//                 px: { xs: 1.5, sm: 2, md: 2.5 },
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#ffffff", 0.2),
//                     color: "white",
//                     width: { xs: 28, sm: 32, md: 36 },
//                     height: { xs: 28, sm: 32, md: 36 },
//                   }}
//                 >
//                   {isSuperAdmin ? <BusinessIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} /> : <PersonIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
//                 </Avatar>
//                 <Box>
//                   <Typography
//                     variant={isMobile ? "subtitle2" : "subtitle1"}
//                     fontWeight={600}
//                     color="white"
//                     sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem' } }}
//                   >
//                     {getTitle()}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: alpha("#ffffff", 0.8),
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                       display: { xs: isLandscape ? 'none' : 'block', sm: 'block' }
//                     }}
//                   >
//                     {editingUser
//                       ? "Update the information below"
//                       : "Fill in the details to create a new account"}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton
//                 onClick={handleClose}
//                 size="small"
//                 disabled={isLoading}
//                 sx={{
//                   color: "white",
//                   width: 28,
//                   height: 28,
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.1),
//                   },
//                   "&.Mui-disabled": {
//                     opacity: 0.5,
//                   },
//                 }}
//               >
//                 <CloseIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
//               </IconButton>
//             </Box>

//             {/* Form */}
//             <form onSubmit={handleSubmit} style={{
//               overflowY: 'auto',
//               flex: 1,
//               display: 'flex',
//               flexDirection: 'column'
//             }}>
//               <DialogContent sx={{
//                 p: {
//                   xs: isLandscape ? 1.5 : 1.5,
//                   sm: 2,
//                   md: 2.5
//                 },
//                 flex: 1,
//                 overflowY: 'auto',
//               }}>
//                 <Grid container spacing={{ xs: 1.5, sm: 1.5, md: 2 }}>
//                   {/* Full Name */}
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       name="fullName"
//                       label={getNameFieldLabel()}
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.fullName && touched.fullName}
//                       helperText={touched.fullName && errors.fullName}
//                       required
//                       size="small"
//                       disabled={isLoading}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             {getNameFieldIcon()}
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 1.5,
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           "&:hover fieldset": {
//                             borderColor: theme.palette.primary.main,
//                           },
//                         },
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           py: 1.2,
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Email */}
//                   <Grid item xs={12} md={6}>
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
//                       required
//                       disabled={!!editingUser || isLoading}
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 1.5,
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           "&:hover fieldset": {
//                             borderColor: theme.palette.primary.main,
//                           },
//                           "&.Mui-disabled": {
//                             backgroundColor: alpha(theme.palette.action.disabledBackground, 0.3),
//                             "& .MuiOutlinedInput-notchedOutline": {
//                               borderColor: alpha(theme.palette.primary.main, 0.2),
//                             },
//                           },
//                         },
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           "&.Mui-disabled": {
//                             color: alpha(theme.palette.text.secondary, 0.6),
//                           },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           py: 1.2,
//                           "&.Mui-disabled": {
//                             color: alpha(theme.palette.text.primary, 0.7),
//                             WebkitTextFillColor: alpha(theme.palette.text.primary, 0.7),
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Password Fields - Only for new users */}
//                   {!editingUser && (
//                     <>
//                       <Grid item xs={12} md={6}>
//                         <TextField
//                           fullWidth
//                           name="password"
//                           label="Password"
//                           type={showPassword ? "text" : "password"}
//                           value={formData.password}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           error={!!errors.password && touched.password}
//                           helperText={touched.password && errors.password}
//                           required
//                           size="small"
//                           disabled={isLoading}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LockIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
//                               </InputAdornment>
//                             ),
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <IconButton
//                                   onClick={() => setShowPassword(!showPassword)}
//                                   edge="end"
//                                   size="small"
//                                   disabled={isLoading}
//                                 >
//                                   {showPassword ? (
//                                     <VisibilityOffIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
//                                   ) : (
//                                     <VisibilityIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
//                                   )}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 1.5,
//                               fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                               "&:hover fieldset": {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                             "& .MuiInputLabel-root": {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             "& .MuiInputBase-input": {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                               py: 1.2,
//                             },
//                           }}
//                         />
//                       </Grid>

//                       <Grid item xs={12} md={6}>
//                         <TextField
//                           fullWidth
//                           name="confirmPassword"
//                           label="Confirm Password"
//                           type={showConfirmPassword ? "text" : "password"}
//                           value={formData.confirmPassword}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           error={!!errors.confirmPassword && touched.confirmPassword}
//                           helperText={touched.confirmPassword && errors.confirmPassword}
//                           required
//                           size="small"
//                           disabled={isLoading}
//                           InputProps={{
//                             startAdornment: (
//                               <InputAdornment position="start">
//                                 <LockIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
//                               </InputAdornment>
//                             ),
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <IconButton
//                                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                   edge="end"
//                                   size="small"
//                                   disabled={isLoading}
//                                 >
//                                   {showConfirmPassword ? (
//                                     <VisibilityOffIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
//                                   ) : (
//                                     <VisibilityIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
//                                   )}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 1.5,
//                               fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                               "&:hover fieldset": {
//                                 borderColor: theme.palette.primary.main,
//                               },
//                             },
//                             "& .MuiInputLabel-root": {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             },
//                             "& .MuiInputBase-input": {
//                               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                               py: 1.2,
//                             },
//                           }}
//                         />
//                       </Grid>
//                     </>
//                   )}

//                   {/* Mobile Number */}
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       name="mobile"
//                       label="Mobile Number"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.mobile && touched.mobile}
//                       helperText={touched.mobile && errors.mobile}
//                       required
//                       size="small"
//                       disabled={isLoading}
//                       inputProps={{
//                         maxLength: 10,
//                         pattern: "[0-9]*",
//                       }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 1.5,
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           "&:hover fieldset": {
//                             borderColor: theme.palette.primary.main,
//                           },
//                         },
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           py: 1.2,
//                         },
//                       }}
//                     />
//                   </Grid>



//                   {/* Address */}
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       name="address"
//                       label="Address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       error={!!errors.address && touched.address}
//                       helperText={touched.address && errors.address}
//                       required
//                       size="small"
//                       disabled={isLoading}
//                       multiline
//                       rows={isLandscape ? 1 : 2}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <HomeIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 1.5,
//                           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                           "&:hover fieldset": {
//                             borderColor: theme.palette.primary.main,
//                           },
//                         },
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           py: 1.2,
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Account Status */}
//                   {!isEditingSelf && (
//                     <Grid item xs={12} md={6}>
//                       <Box sx={{
//                         height: '100%',
//                         bgcolor: alpha(theme.palette.primary.main, 0.02),
//                         p: 1.5,
//                         borderRadius: 2,
//                         border: '1px solid',
//                         borderColor: alpha(theme.palette.primary.main, 0.05),
//                       }}>
//                         <FormControl component="fieldset" fullWidth>
//                           <FormLabel
//                             component="legend"
//                             sx={{
//                               color: "text.primary",
//                               fontWeight: 500,
//                               mb: 0.5,
//                               fontSize: { xs: '0.70rem', sm: '0.75rem' }
//                             }}
//                           >
//                             Account Status
//                           </FormLabel>
//                           <RadioGroup
//                             row
//                             name="status"
//                             value={formData.status}
//                             onChange={handleChange}
//                             sx={{ flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 } }}
//                           >
//                             <FormControlLabel
//                               value="active"
//                               control={<Radio size="small" sx={{ color: theme.palette.primary.main }} disabled={isLoading} />}
//                               label={
//                                 <Chip
//                                   label="Active"
//                                   size="small"
//                                   sx={{
//                                     bgcolor: alpha("#22c55e", 0.1),
//                                     color: "#22c55e",
//                                     fontWeight: 600,
//                                     fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                                     height: 20,
//                                   }}
//                                 />
//                               }
//                             />
//                             <FormControlLabel
//                               value="inactive"
//                               control={<Radio size="small" sx={{ color: theme.palette.primary.main }} disabled={isLoading} />}
//                               label={
//                                 <Chip
//                                   label="Inactive"
//                                   size="small"
//                                   sx={{
//                                     bgcolor: alpha(theme.palette.text.secondary, 0.1),
//                                     color: theme.palette.text.secondary,
//                                     fontWeight: 600,
//                                     fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                                     height: 20,
//                                   }}
//                                 />
//                               }
//                             />
//                           </RadioGroup>
//                         </FormControl>
//                       </Box>
//                     </Grid>
//                   )}

//                   {/* Admin Panel Access Card */}
//                   {isAdmin && (Number(formData.role_id) === 0 || Number(formData.role_id) === 3) && (
//                     <Grid item xs={12} md={6}>
//                       <Box
//                         onClick={() => !isLoading && setFormData({
//                           ...formData,
//                           adminPanelAccess: !formData.adminPanelAccess,
//                           role_id: !formData.adminPanelAccess ? 3 : 0
//                         })}
//                         sx={{
//                           height: '95%',
//                           display: 'flex',
//                           alignItems: 'center',
//                           cursor: 'pointer',
//                           bgcolor: formData.adminPanelAccess ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.main, 0.02),
//                           px: 2,
//                           py: { xs: 1.2, md: 1 },
//                           borderRadius: 2.5,
//                           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                           border: '2px solid',
//                           borderColor: formData.adminPanelAccess ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.08),
//                           boxShadow: formData.adminPanelAccess ? `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
//                           position: 'relative',

//                         }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
//                           <Avatar
//                             sx={{
//                               width: 32,
//                               height: 32,
//                               bgcolor: formData.adminPanelAccess ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.1),
//                               color: formData.adminPanelAccess ? 'white' : theme.palette.primary.main,
//                               transition: 'all 0.3s ease',
//                             }}
//                           >
//                             <AdminPanelSettingsIcon sx={{ fontSize: 18 }} />
//                           </Avatar>
//                           <Box sx={{ flex: 1 }}>
//                             <Typography sx={{
//                               fontSize: '0.75rem',
//                               fontWeight: 700,
//                               color: formData.adminPanelAccess ? theme.palette.primary.main : 'text.primary',
//                               lineHeight: 1.1,
//                             }}>
//                               Admin Panel Access
//                             </Typography>

//                           </Box>
//                           <Checkbox
//                             checked={formData.adminPanelAccess}
//                             onChange={(e) => setFormData({ ...formData, adminPanelAccess: e.target.checked, role_id: e.target.checked ? 3 : 0 })}
//                             disabled={isLoading}
//                             size="small"
//                             sx={{
//                               p: 0.5,
//                               color: alpha(theme.palette.primary.main, 0.3),
//                               '&.Mui-checked': {
//                                 color: theme.palette.primary.main,
//                               },
//                             }}
//                           />
//                         </Box>
//                       </Box>
//                     </Grid>
//                   )}

//                   {/* Profile Photo */}
//                   <Grid item xs={12}>
//                     <Typography
//                       variant="subtitle2"
//                       gutterBottom
//                       sx={{
//                         color: "text.primary",
//                         fontWeight: 600,
//                         fontSize: { xs: '0.75rem', sm: '0.8rem' }
//                       }}
//                     >
//                       Profile Photo
//                     </Typography>

//                     <Box sx={{
//                       display: "flex",
//                       flexDirection: { xs: 'column', sm: 'row' },
//                       alignItems: { xs: 'flex-start', sm: 'center' },
//                       gap: 1.5,
//                       flexWrap: "wrap",
//                     }}>
//                       <Box sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         alignItems: { xs: 'stretch', sm: 'center' },
//                         gap: 1,
//                         width: { xs: '100%', sm: 'auto' }
//                       }}>
//                         <Button
//                           variant="outlined"
//                           component="label"
//                           startIcon={<CameraIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                           size="small"
//                           disabled={isLoading}
//                           sx={{
//                             borderColor: theme.palette.primary.main,
//                             color: theme.palette.primary.main,
//                             borderRadius: 1.5,
//                             width: { xs: '100%', sm: 'auto' },
//                             py: { xs: 0.5, sm: 0.6 },
//                             fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                             "&:hover": {
//                               borderColor: theme.palette.primary.dark,
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             },
//                           }}
//                         >
//                           Upload Photo
//                           <input
//                             type="file"
//                             hidden
//                             accept="image/jpeg,image/png,image/gif"
//                             onChange={handleImageChange}
//                             disabled={isLoading}
//                           />
//                         </Button>

//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                           sx={{
//                             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                             textAlign: { xs: 'left', sm: 'left' },
//                             display: 'inline-block',
//                             alignSelf: 'center'
//                           }}
//                         >
//                           JPG, PNG, GIF up to 5MB
//                         </Typography>
//                       </Box>

//                       {/* Image Preview */}
//                       {(previewImage || (editingUser?.avtar && !imageRemoved)) && (
//                         <Box
//                           sx={{
//                             position: "relative",
//                             display: "inline-block",
//                             mt: { xs: 1, sm: 0 },
//                             ml: { xs: 0, sm: 1 },
//                           }}
//                         >
//                           <Avatar
//                             src={previewImage || editingUser?.avtar}
//                             sx={{
//                               width: { xs: 50, sm: 60, md: 70 },
//                               height: { xs: 50, sm: 60, md: 70 },
//                               border: "2px solid",
//                               borderColor: theme.palette.primary.main,
//                               boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
//                             }}
//                           />
//                           <IconButton
//                             size="small"
//                             onClick={removeImage}
//                             disabled={isLoading}
//                             sx={{
//                               position: "absolute",
//                               top: -6,
//                               right: -6,
//                               bgcolor: "#ef4444",
//                               color: "white",
//                               width: { xs: 18, sm: 20 },
//                               height: { xs: 18, sm: 20 },
//                               "&:hover": {
//                                 bgcolor: "#dc2626",
//                               },
//                               "&.Mui-disabled": {
//                                 opacity: 0.5,
//                               },
//                             }}
//                           >
//                             <CloseIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
//                           </IconButton>
//                         </Box>
//                       )}
//                     </Box>

//                     {errors.avtar && (
//                       <Alert
//                         severity="error"
//                         sx={{
//                           mt: 1.5,
//                           borderRadius: 1.5,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                           py: 0.5,
//                         }}
//                         icon={<CloseIcon fontSize="small" />}
//                       >
//                         {errors.avtar}
//                       </Alert>
//                     )}
//                   </Grid>
//                 </Grid>
//               </DialogContent>

//               {/* Actions */}
//               <DialogActions sx={{
//                 p: { xs: 1.5, sm: 2, md: 2.5 },
//                 pt: { xs: 1, sm: 1.5, md: 2 },
//                 gap: { xs: 1, sm: 1.5 },
//                 borderTop: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 flexDirection: { xs: 'column', sm: 'row' },
//               }}>
//                 <Button
//                   variant="outlined"
//                   onClick={handleClose}
//                   fullWidth={isMobile}
//                   size="small"
//                   disabled={isLoading}
//                   sx={{
//                     width: { xs: '100%', sm: 'auto' },
//                     minWidth: { sm: 100 },
//                     py: { xs: 0.6, sm: 0.8 },
//                     borderRadius: { xs: 1.5, sm: 2 },
//                     borderColor: alpha(theme.palette.divider, 0.5),
//                     color: "text.secondary",
//                     fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                     order: { xs: 2, sm: 1 },
//                     "&:hover": {
//                       borderColor: theme.palette.primary.main,
//                       color: theme.palette.primary.main,
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={isLoading}
//                   fullWidth={isMobile}
//                   size="small"
//                   sx={{
//                     width: { xs: '100%', sm: 'auto' },
//                     minWidth: { sm: 120 },
//                     py: { xs: 0.6, sm: 0.8 },
//                     borderRadius: { xs: 1.5, sm: 2 },
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                     order: { xs: 1, sm: 2 },
//                     "&:hover": {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                   }}
//                 >
//                   {isLoading ? (
//                     <CircularProgress size={16} sx={{ color: "white" }} />
//                   ) : editingUser ? (
//                     isSuperAdmin ? "Update Admin" : "Update User"
//                   ) : (
//                     isSuperAdmin ? "Save Admin" : "Save User"
//                   )}
//                 </Button>
//               </DialogActions>
//             </form>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Dialog>
//   );
// };

// export default AddUser;



import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  InputAdornment,
  CircularProgress,
  Alert,
  alpha,
  Chip,
  useMediaQuery,
  useTheme,
  Checkbox,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CameraAlt as CameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, updateUser, updateUserPermissions } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";

const AddUser = ({ open, onClose, editingUser = null }) => {
  // console.log("Editing user data ------------------------>", editingUser);
  const dispatch = useDispatch();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const userDataa = JSON.parse(localStorage.getItem("user"));
  const role_id = userDataa?.role_id;
  const currentUserId =
    userDataa?._id || userDataa?.id || userDataa?.userId || userDataa?.user_id;
  const userData = useSelector((state) => state.user?.userInfo || {});
  const loading = useSelector((state) => state.user?.loading || false);

  // Local loading state to prevent double submission
  const [submitting, setSubmitting] = useState(false);


  const isSuperAdmin = Number(role_id) === 2;
  const isAdmin = Number(role_id) === 1;
  const isSubAdmin = Number(role_id) === 3;
  const editingUserId =
    editingUser?._id ||
    editingUser?.id ||
    editingUser?.userId ||
    editingUser?.user_id;
  const isEditingSelf =
    Boolean(currentUserId) &&
    Boolean(editingUserId) &&
    String(currentUserId) === String(editingUserId);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    status: "active",
    avtar: null,
    role_id: 0,
    adminPanelAccess: true,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    avtar: "",
  });

  const [touched, setTouched] = useState({});
  const [imageRemoved, setImageRemoved] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    if (!open) {
      setSubmitting(false);
    }
  }, [open]);

  // Get title based on role
  const getTitle = () => {
    if (isSuperAdmin) {
      return editingUser ? "Edit Admin" : "Add New Admin";
    } else {
      return editingUser ? "Edit User" : "Add New User";
    }
  };

  // Get name field label based on role
  const getNameFieldLabel = () => {
    if (isSuperAdmin) {
      return editingUser ? "User Name" : "Organization Name";
    } else {
      return "User Name";
    }
  };

  // Get name field icon based on role
  const getNameFieldIcon = () => {
    if (isSuperAdmin && !editingUser) {
      return <BusinessIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />;
    } else {
      return <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />;
    }
  };

  useEffect(() => {
    if (editingUser) {
      setFormData({
        fullName: editingUser.name || "",
        email: editingUser.email || "",
        mobile: editingUser.mobile_no || "",
        address: editingUser.address || "",
        status: editingUser?.isActive ? "active" : "inactive",
        avtar: null,
        role_id: Number(editingUser.role_id) || 0,
        adminPanelAccess: editingUser.permissions
          ? editingUser.permissions.includes("admin_panel")
          : (Number(editingUser.role_id) === 3),
      });
      setImageRemoved(false);
      if (editingUser.avtar) {
        setPreviewImage(editingUser.avtar);
      }
    } else {
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        address: "",
        status: "active",
        avtar: null,
        role_id: 0,
        adminPanelAccess: false,
      });
      setPreviewImage(null);
      setErrors({});
      setTouched({});
      setImageRemoved(false);
    }
  }, [editingUser, open]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value?.trim()) {
          if (isSuperAdmin && !editingUser) {
            error = "Organization name is required";
          } else {
            error = "User name is required";
          }
        } else if (value.length < 3) {
          if (isSuperAdmin && !editingUser) {
            error = "Organization name must be at least 3 characters";
          } else {
            error = "Name must be at least 3 characters";
          }
        } else if (value.length > 50) {
          error = "Name must be less than 50 characters";
        }
        break;
      case "email":
        if (!value?.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        else if (value.length > 100) error = "Email must be less than 100 characters";
        break;
      case "password":
        if (!editingUser) {
          if (!value?.trim()) error = "Password is required";
          else if (value.length < 6)
            error = "Password must be at least 6 characters";
          else if (value.length > 20)
            error = "Password must be less than 20 characters";
          else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
            error = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }
        break;
      case "confirmPassword":
        if (!editingUser) {
          if (!value?.trim()) error = "Please confirm password";
          else if (value !== formData.password) error = "Passwords don't match";
        }
        break;
      case "mobile":
        if (!value?.trim()) error = "Mobile number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Invalid mobile number (10 digits required)";
        break;
      case "address":
        if (!value?.trim()) error = "Address is required";
        else if (value.length < 5) error = "Address must be at least 5 characters";
        else if (value.length > 200) error = "Address must be less than 200 characters";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (touched[name]) {
      const error = validateField(name, name === "mobile" ? value.replace(/[^0-9]/g, "") : value);
      setErrors({ ...errors, [name]: error });
    }
    if (name === "password" && touched.confirmPassword) {
      const confirmError = validateField("confirmPassword", formData.confirmPassword);
      setErrors({ ...errors, confirmPassword: confirmError });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    let fieldValue = value;
    if (name === "mobile") {
      fieldValue = value.replace(/[^0-9]/g, "");
    }

    const error = validateField(name, fieldValue);
    setErrors({ ...errors, [name]: error });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, avtar: "Only JPG, PNG, and GIF images are allowed" });
        return;
      }

      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, avtar: "File size should be less than 5MB" });
        return;
      }

      setErrors({ ...errors, avtar: "" });
      setFormData({ ...formData, avtar: file });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      setImageRemoved(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, avtar: null });
    setPreviewImage(null);
    setImageRemoved(true);
    setErrors({ ...errors, avtar: "" });
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      mobile: validateField("mobile", formData.mobile),
      address: validateField("address", formData.address),
    };

    if (!editingUser) {
      newErrors.password = validateField("password", formData.password);
      newErrors.confirmPassword = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
    }

    setErrors(newErrors);


    const allTouched = {};
    Object.keys(newErrors).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return !Object.values(newErrors).some((error) => error);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();


  //   if (!validateForm()) return;


  //   if (submitting) return;

  //   setSubmitting(true);

  //   const payload = new FormData();
  //   payload.append("name", formData.fullName);
  //   payload.append("email", formData.email);

  //   // Only send createdby and adminId for NEW users
  //   if (!editingUser) {
  //     const creatorId = userDataa?._id || userData?._id;
  //     payload.append("createdby", creatorId);

  //     if (isSubAdmin || isAdmin) {
  //       const rootAdminId = isSubAdmin 
  //         ? (userDataa?.adminId?._id || (typeof userDataa?.adminId === 'string' ? userDataa.adminId : null))
  //         : creatorId;
          
  //       if (rootAdminId) {
  //         payload.append("adminId", rootAdminId);
  //       } else if (isSubAdmin) {
  //         console.warn("Sub-admin has no adminId - checking token...");
  //         // Fallback to token decoding if needed
  //         try {
  //           const token = localStorage.getItem('token');
  //           if (token) {
  //             const base64Payload = token.split('.')[1];
  //             const decoded = JSON.parse(atob(base64Payload));
  //             if (decoded.adminId) payload.append("adminId", decoded.adminId);
  //           }
  //         } catch (e) {
  //           console.error('Failed to decode token:', e);
  //         }
  //       }
  //     }
  //   }

  //   payload.append("mobile_no", formData.mobile);
  //   payload.append("address", formData.address);
  //   payload.append("isActive", formData.status === "active");

  //   if (!editingUser) {
  //     if (isAdmin) {
  //       payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
  //     } else if (isSuperAdmin) {
  //       payload.append("role_id", 1);
  //     } else {
  //       payload.append("role_id", 0);
  //     }
  //   } else if (isAdmin && (Number(editingUser.role_id) === 0 || Number(editingUser.role_id) === 3)) {
  //     payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
  //   }

  //   // Handle avatar
  //   if (formData.avtar && formData.avtar instanceof File) {
  //     payload.append("avtar", formData.avtar);
  //   }

  //   if (editingUser && imageRemoved) {
  //     payload.append("removeAvtar", "true");
  //   }

   
  //   const permissions = formData.adminPanelAccess ? ["admin_panel"] : [];
  //   payload.append("permissions", JSON.stringify(permissions));
    
  //   for (let pair of payload.entries()) {
  //   }

  //   try {

  //     if (editingUser) {
  //       const userId = editingUser._id || editingUser.id;
  //       if (!userId) {
  //         throw new Error("User ID is missing");
  //       }

  //       let result;
  //       if (Number(formData.role_id) === 3 && !formData.avtar && !imageRemoved) {
  //         const role_id = Number(formData.role_id);
  //         result = await dispatch(
  //           updateUserPermissions({ userId, permissions, role_id })
  //         ).unwrap();
  //       } else {
        
  //         result = await dispatch(
  //           updateUser({ userId: userId, formData: payload })
  //         ).unwrap();
  //       }
  //       toast.success("User updated successfully!");
  //     } else {
  //       payload.append("password", formData.password);
  //       payload.append("confirmPassword", formData.confirmPassword);
  //       await dispatch(registerUser(payload)).unwrap();
  //       toast.success("User created successfully!");
  //     }
  //     onClose(true); 
  //   } catch (error) {
  //     // Extract message from various possible structures
  //     let errorMessage = "Operation failed";
  //     if (typeof error === 'string') {
  //       errorMessage = error;
  //     } else if (error?.message) {
  //       errorMessage = error.message;
  //     } else if (error?.response?.data?.message) {
  //       errorMessage = error.response.data.message;
  //     } else if (error?.data?.message) {
  //       errorMessage = error.data.message;
  //     } else if (error?.message) {
  //       errorMessage = error.message;
  //     }
  //     toast.error(errorMessage, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //     });

  //     console.error("Final toast error message:", errorMessage);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;
  if (submitting) return;

  setSubmitting(true);

  const payload = new FormData();
  
  // Check if editing user has admin_panel permission (Sub Admin)
  const isEditingSubAdmin = editingUser && editingUser.permissions?.includes("admin_panel");
  
  // For Sub Admin users, only allow specific fields to be updated
  if (isEditingSubAdmin) {
    // Sub Admin can only update these fields
    payload.append("name", formData.fullName);
    payload.append("mobile_no", formData.mobile);
    payload.append("email", formData.email);
    payload.append("address", formData.address);
    payload.append("isActive", formData.status === "active");
    
    // Handle avatar
    if (formData.avtar && formData.avtar instanceof File) {
      payload.append("avtar", formData.avtar);
    }
    if (imageRemoved) {
      payload.append("removeAvtar", "true");
    }
    
    // Do NOT include email, role_id, permissions, etc.
    
  } else {
    // Full update for regular users
    payload.append("name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("isActive", formData.status === "active");

    // Only send createdby and adminId for NEW users
    if (!editingUser) {
      const creatorId = userDataa?._id || userData?._id;
      payload.append("createdby", creatorId);

      if (isSubAdmin || isAdmin) {
        const rootAdminId = isSubAdmin 
          ? (userDataa?.adminId?._id || (typeof userDataa?.adminId === 'string' ? userDataa.adminId : null))
          : creatorId;
          
        if (rootAdminId) {
          payload.append("adminId", rootAdminId);
        } else if (isSubAdmin) {
          console.warn("Sub-admin has no adminId - checking token...");
          try {
            const token = localStorage.getItem('token');
            if (token) {
              const base64Payload = token.split('.')[1];
              const decoded = JSON.parse(atob(base64Payload));
              if (decoded.adminId) payload.append("adminId", decoded.adminId);
            }
          } catch (e) {
            console.error('Failed to decode token:', e);
          }
        }
      }
    }

    if (!editingUser) {
      if (isAdmin) {
        payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
      } else if (isSuperAdmin) {
        payload.append("role_id", 1);
      } else {
        payload.append("role_id", 0);
      }
    } else if (isAdmin && (Number(editingUser.role_id) === 0 || Number(editingUser.role_id) === 3)) {
      payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
    }

    // Handle avatar
    if (formData.avtar && formData.avtar instanceof File) {
      payload.append("avtar", formData.avtar);
    }
    if (editingUser && imageRemoved) {
      payload.append("removeAvtar", "true");
    }

    const permissions = formData.adminPanelAccess ? ["admin_panel"] : [];
    payload.append("permissions", JSON.stringify(permissions));
  }

  for (let pair of payload.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

  try {
    if (editingUser) {
      const userId = editingUser._id || editingUser.id;
      if (!userId) {
        throw new Error("User ID is missing");
      }

      let result;
      
      // For Sub Admin, always use regular update (not permissions update)
      if (isEditingSubAdmin) {
        result = await dispatch(
          updateUser({ userId: userId, formData: payload })
        ).unwrap();
      } else if (Number(formData.role_id) === 3 && !formData.avtar && !imageRemoved) {
        const role_id = Number(formData.role_id);
        result = await dispatch(
          updateUserPermissions({ userId, permissions: ["admin_panel"], role_id })
        ).unwrap();
      } else {
        result = await dispatch(
          updateUser({ userId: userId, formData: payload })
        ).unwrap();
      }
      toast.success("User updated successfully!");
    } else {
      payload.append("password", formData.password);
      payload.append("confirmPassword", formData.confirmPassword);
      await dispatch(registerUser(payload)).unwrap();
      toast.success("User created successfully!");
    }
    onClose(true); 
  } catch (error) {
    let errorMessage = "Operation failed";
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.data?.message) {
      errorMessage = error.data.message;
    }
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.error("Final toast error message:", errorMessage);
  } finally {
    setSubmitting(false);
  }
};
  const handleClose = () => {
    if (!submitting) {
      onClose(false);
    }
  };

  // Determine dialog max width and full screen based on screen size
  const getDialogProps = () => {
    if (isSmallMobile) {
      return {
        fullScreen: true,
        maxWidth: false,
      };
    } else if (isMobile) {
      return {
        fullScreen: isLandscape ? false : true,
        maxWidth: 'sm',
      };
    } else {
      return {
        fullScreen: false,
        maxWidth: 'sm',
      };
    }
  };

  const isLoading = submitting || loading;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      {...getDialogProps()}
      fullWidth
      disableEscapeKeyDown={isLoading}
      PaperProps={{
        sx: {
          borderRadius: {
            xs: isSmallMobile ? 0 : 2,
            sm: 2.5,
            md: 3
          },
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          m: { xs: 0, sm: 1.5, md: 2 },
          height: {
            xs: isSmallMobile ? '100%' : 'auto',
            sm: 'auto'
          },
        },
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <Box
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                py: { xs: 1.5, sm: 1.75, md: 2 },
                px: { xs: 1.5, sm: 2, md: 2.5 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 } }}>
                <Avatar
                  sx={{
                    bgcolor: alpha("#ffffff", 0.2),
                    color: "white",
                    width: { xs: 28, sm: 32, md: 36 },
                    height: { xs: 28, sm: 32, md: 36 },
                  }}
                >
                  {isSuperAdmin ? <BusinessIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} /> : <PersonIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
                </Avatar>
                <Box>
                  <Typography
                    variant={isMobile ? "subtitle2" : "subtitle1"}
                    fontWeight={600}
                    color="white"
                    sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem' } }}
                  >
                    {getTitle()}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha("#ffffff", 0.8),
                      fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                      display: { xs: isLandscape ? 'none' : 'block', sm: 'block' }
                    }}
                  >
                    {editingUser
                      ? "Update the information below"
                      : "Fill in the details to create a new account"}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={handleClose}
                size="small"
                disabled={isLoading}
                sx={{
                  color: "white",
                  width: 28,
                  height: 28,
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.1),
                  },
                  "&.Mui-disabled": {
                    opacity: 0.5,
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
              </IconButton>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <DialogContent sx={{
                p: {
                  xs: isLandscape ? 1.5 : 1.5,
                  sm: 2,
                  md: 2.5
                },
                flex: 1,
                overflowY: 'auto',
              }}>
                <Grid container spacing={{ xs: 1.5, sm: 1.5, md: 2 }}>
                  {/* Full Name */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="fullName"
                      label={getNameFieldLabel()}
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.fullName && touched.fullName}
                      helperText={touched.fullName && errors.fullName}
                      required
                      size="small"
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {getNameFieldIcon()}
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          py: 1.2,
                        },
                      }}
                    />
                  </Grid>

                  {/* Email — always editable, only disabled during loading */}
                  <Grid item xs={12} md={6}>
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
                      required
                      disabled={isLoading}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          py: 1.2,
                        },
                      }}
                    />
                  </Grid>

                  {/* Password Fields - Only for new users */}
                  {!editingUser && (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="password"
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.password && touched.password}
                          helperText={touched.password && errors.password}
                          required
                          size="small"
                          disabled={isLoading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                  size="small"
                                  disabled={isLoading}
                                >
                                  {showPassword ? (
                                    <VisibilityOffIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                                  ) : (
                                    <VisibilityIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1.5,
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                              "&:hover fieldset": {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            "& .MuiInputBase-input": {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              py: 1.2,
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.confirmPassword && touched.confirmPassword}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                          required
                          size="small"
                          disabled={isLoading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  edge="end"
                                  size="small"
                                  disabled={isLoading}
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOffIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                                  ) : (
                                    <VisibilityIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 1.5,
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                              "&:hover fieldset": {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            },
                            "& .MuiInputBase-input": {
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              py: 1.2,
                            },
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  {/* Mobile Number */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="mobile"
                      label="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.mobile && touched.mobile}
                      helperText={touched.mobile && errors.mobile}
                      required
                      size="small"
                      disabled={isLoading}
                      inputProps={{
                        maxLength: 10,
                        pattern: "[0-9]*",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          py: 1.2,
                        },
                      }}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="address"
                      label="Address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.address && touched.address}
                      helperText={touched.address && errors.address}
                      required
                      size="small"
                      disabled={isLoading}
                      multiline
                      rows={isLandscape ? 1 : 2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon sx={{ color: theme.palette.primary.main, fontSize: isMobile ? 16 : 18 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          "&:hover fieldset": {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          py: 1.2,
                        },
                      }}
                    />
                  </Grid>

                  {/* Account Status */}
                  {!isEditingSelf && (
                    <Grid item xs={12} md={6}>
                      <Box sx={{
                        height: '100%',
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        p: 1.5,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: alpha(theme.palette.primary.main, 0.05),
                      }}>
                        <FormControl component="fieldset" fullWidth>
                          <FormLabel
                            component="legend"
                            sx={{
                              color: "text.primary",
                              fontWeight: 500,
                              mb: 0.5,
                              fontSize: { xs: '0.70rem', sm: '0.75rem' }
                            }}
                          >
                            Account Status
                          </FormLabel>
                          <RadioGroup
                            row
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            sx={{ flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 } }}
                          >
                            <FormControlLabel
                              value="active"
                              control={<Radio size="small" sx={{ color: theme.palette.primary.main }} disabled={isLoading} />}
                              label={
                                <Chip
                                  label="Active"
                                  size="small"
                                  sx={{
                                    bgcolor: alpha("#22c55e", 0.1),
                                    color: "#22c55e",
                                    fontWeight: 600,
                                    fontSize: { xs: '0.55rem', sm: '0.6rem' },
                                    height: 20,
                                  }}
                                />
                              }
                            />
                            <FormControlLabel
                              value="inactive"
                              control={<Radio size="small" sx={{ color: theme.palette.primary.main }} disabled={isLoading} />}
                              label={
                                <Chip
                                  label="Inactive"
                                  size="small"
                                  sx={{
                                    bgcolor: alpha(theme.palette.text.secondary, 0.1),
                                    color: theme.palette.text.secondary,
                                    fontWeight: 600,
                                    fontSize: { xs: '0.55rem', sm: '0.6rem' },
                                    height: 20,
                                  }}
                                />
                              }
                            />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Grid>
                  )}

                  {/* Admin Panel Access Card */}
                  {isAdmin && (Number(formData.role_id) === 0 || Number(formData.role_id) === 3) && (
                    <Grid item xs={12} md={6}>
                      <Box
                        onClick={() => !isLoading && setFormData({
                          ...formData,
                          adminPanelAccess: !formData.adminPanelAccess,
                          role_id: !formData.adminPanelAccess ? 3 : 0
                        })}
                        sx={{
                          height: '95%',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          bgcolor: formData.adminPanelAccess ? alpha(theme.palette.primary.main, 0.08) : alpha(theme.palette.primary.main, 0.02),
                          px: 2,
                          py: { xs: 1.2, md: 1 },
                          borderRadius: 2.5,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: '2px solid',
                          borderColor: formData.adminPanelAccess ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.08),
                          boxShadow: formData.adminPanelAccess ? `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
                          position: 'relative',

                        }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: formData.adminPanelAccess ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.1),
                              color: formData.adminPanelAccess ? 'white' : theme.palette.primary.main,
                              transition: 'all 0.3s ease',
                            }}
                          >
                            <AdminPanelSettingsIcon sx={{ fontSize: 18 }} />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: formData.adminPanelAccess ? theme.palette.primary.main : 'text.primary',
                              lineHeight: 1.1,
                            }}>
                              Admin Panel Access
                            </Typography>

                          </Box>
                          <Checkbox
                            checked={formData.adminPanelAccess}
                            onChange={(e) => setFormData({ ...formData, adminPanelAccess: e.target.checked, role_id: e.target.checked ? 3 : 0 })}
                            disabled={isLoading}
                            size="small"
                            sx={{
                              p: 0.5,
                              color: alpha(theme.palette.primary.main, 0.3),
                              '&.Mui-checked': {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  )}

                  {/* Profile Photo */}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        color: "text.primary",
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8rem' }
                      }}
                    >
                      Profile Photo
                    </Typography>

                    <Box sx={{
                      display: "flex",
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 1.5,
                      flexWrap: "wrap",
                    }}>
                      <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'stretch', sm: 'center' },
                        gap: 1,
                        width: { xs: '100%', sm: 'auto' }
                      }}>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<CameraIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                          size="small"
                          disabled={isLoading}
                          sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            borderRadius: 1.5,
                            width: { xs: '100%', sm: 'auto' },
                            py: { xs: 0.5, sm: 0.6 },
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            "&:hover": {
                              borderColor: theme.palette.primary.dark,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                            },
                          }}
                        >
                          Upload Photo
                          <input
                            type="file"
                            hidden
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleImageChange}
                            disabled={isLoading}
                          />
                        </Button>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: '0.6rem', sm: '0.65rem' },
                            textAlign: { xs: 'left', sm: 'left' },
                            display: 'inline-block',
                            alignSelf: 'center'
                          }}
                        >
                          JPG, PNG, GIF up to 5MB
                        </Typography>
                      </Box>

                      {/* Image Preview */}
                      {(previewImage || (editingUser?.avtar && !imageRemoved)) && (
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            mt: { xs: 1, sm: 0 },
                            ml: { xs: 0, sm: 1 },
                          }}
                        >
                          <Avatar
                            src={previewImage || editingUser?.avtar}
                            sx={{
                              width: { xs: 50, sm: 60, md: 70 },
                              height: { xs: 50, sm: 60, md: 70 },
                              border: "2px solid",
                              borderColor: theme.palette.primary.main,
                              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={removeImage}
                            disabled={isLoading}
                            sx={{
                              position: "absolute",
                              top: -6,
                              right: -6,
                              bgcolor: "#ef4444",
                              color: "white",
                              width: { xs: 18, sm: 20 },
                              height: { xs: 18, sm: 20 },
                              "&:hover": {
                                bgcolor: "#dc2626",
                              },
                              "&.Mui-disabled": {
                                opacity: 0.5,
                              },
                            }}
                          >
                            <CloseIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    {errors.avtar && (
                      <Alert
                        severity="error"
                        sx={{
                          mt: 1.5,
                          borderRadius: 1.5,
                          fontSize: { xs: '0.65rem', sm: '0.7rem' },
                          py: 0.5,
                        }}
                        icon={<CloseIcon fontSize="small" />}
                      >
                        {errors.avtar}
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>

              {/* Actions */}
              <DialogActions sx={{
                p: { xs: 1.5, sm: 2, md: 2.5 },
                pt: { xs: 1, sm: 1.5, md: 2 },
                gap: { xs: 1, sm: 1.5 },
                borderTop: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                flexDirection: { xs: 'column', sm: 'row' },
              }}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  fullWidth={isMobile}
                  size="small"
                  disabled={isLoading}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: { sm: 100 },
                    py: { xs: 0.6, sm: 0.8 },
                    borderRadius: { xs: 1.5, sm: 2 },
                    borderColor: alpha(theme.palette.divider, 0.5),
                    color: "text.secondary",
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    order: { xs: 2, sm: 1 },
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  fullWidth={isMobile}
                  size="small"
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    minWidth: { sm: 120 },
                    py: { xs: 0.6, sm: 0.8 },
                    borderRadius: { xs: 1.5, sm: 2 },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    order: { xs: 1, sm: 2 },
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={16} sx={{ color: "white" }} />
                  ) : editingUser ? (
                    isSuperAdmin ? "Update Admin" : "Update User"
                  ) : (
                    isSuperAdmin ? "Save Admin" : "Save User"
                  )}
                </Button>
              </DialogActions>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default AddUser;