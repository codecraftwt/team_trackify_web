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
//   Business as BusinessIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, updateUser } from "../../../redux/slices/userSlice";
// import { toast } from "react-toastify";

// const AddUser = ({ open, onClose, editingUser = null }) => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');
//   const isLandscape = useMediaQuery('(orientation: landscape)');

//   const userDataa = JSON.parse(localStorage.getItem("user"));
//   const role_id = userDataa?.role_id;
//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const loading = useSelector((state) => state.user?.loading || false);

//   // Determine if current user is Super Admin (role_id = 2)
//   const isSuperAdmin = role_id === 2;
//   const isAdmin = role_id === 1;

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//     address: "",
//     status: "active",
//     avtar: null,
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
//       });
//       setImageRemoved(false);

//       if (editingUser.avtar) {
//         setPreviewImage(editingUser.avtar);
//       }
//     } else {
//       // Reset form when opening for new user
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         mobile: "",
//         address: "",
//         status: "active",
//         avtar: null,
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

//     // Restrict mobile to only numbers
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

//     // Clear confirm password error when password changes
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
//       setPreviewImage(URL.createObjectURL(file));
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

//     // Mark all fields as touched
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

//     const payload = new FormData();
//     payload.append("name", formData.fullName);
//     payload.append("email", formData.email);
//     payload.append("createdby", userData._id || userDataa?._id);
//     payload.append("mobile_no", formData.mobile);
//     payload.append("address", formData.address);
//     payload.append("isActive", formData.status === "active");

//     if (editingUser) {
//       payload.append("role_id", editingUser.role_id);
//     } else {
//       // For Super Admin (role_id 2) creating Admin (role_id 1)
//       // For Admin (role_id 1) creating User (role_id 0)
//       payload.append("role_id", isSuperAdmin ? 1 : 0);
//     }

//     if (formData.avtar) {
//       payload.append("avtar", formData.avtar);
//     }

//     if (editingUser && imageRemoved) {
//       payload.append("removeAvtar", "true");
//     }

//     try {
//       if (editingUser) {
//         await dispatch(
//           updateUser({ userId: editingUser._id, formData: payload })
//         ).unwrap();
//         toast.success("User updated successfully!");
//       } else {
//         payload.append("password", formData.password);
//         payload.append("confirmPassword", formData.confirmPassword);
//         await dispatch(registerUser(payload)).unwrap();
//         toast.success("User created successfully!");
//       }
//       onClose(true); // Pass true to indicate success and refresh data
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error(error?.message || "Operation failed");
//     }
//   };

//   const handleClose = () => {
//     onClose();
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

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       {...getDialogProps()}
//       fullWidth
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
//                 sx={{
//                   color: "white",
//                   width: 28,
//                   height: 28,
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.1),
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
//               }}>
//                 <Grid container spacing={{ xs: 1.5, sm: 1.5, md: 2 }}>
//                   {/* Full Name - Dynamic label based on role */}
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
//                       disabled={!!editingUser} // This makes it disabled when editing
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
//                           // Style for disabled state
//                           "&.Mui-disabled": {
//                             backgroundColor: alpha(theme.palette.action.disabledBackground, 0.3),
//                             "& .MuiOutlinedInput-notchedOutline": {
//                               borderColor: alpha(theme.palette.primary.main, 0.2),
//                             },
//                           },
//                         },
//                         "& .MuiInputLabel-root": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           // Style for disabled label
//                           "&.Mui-disabled": {
//                             color: alpha(theme.palette.text.secondary, 0.6),
//                           },
//                         },
//                         "& .MuiInputBase-input": {
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           py: 1.2,
//                           // Style for disabled input
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

//                   {/* Status - Only if not editing own profile */}
//                   {editingUser?._id !== userDataa?._id && (
//                     <Grid item xs={12}>
//                       <FormControl component="fieldset">
//                         <FormLabel
//                           component="legend"
//                           sx={{
//                             color: "text.primary",
//                             fontWeight: 500,
//                             fontSize: { xs: '0.7rem', sm: '0.75rem' }
//                           }}
//                         >
//                           Account Status
//                         </FormLabel>
//                         <RadioGroup
//                           row
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                           sx={{ flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 } }}
//                         >
//                           <FormControlLabel
//                             value="active"
//                             control={<Radio size="small" sx={{ color: theme.palette.primary.main }} />}
//                             label={
//                               <Chip
//                                 label="Active"
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha("#22c55e", 0.1),
//                                   color: "#22c55e",
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                                   height: 20,
//                                 }}
//                               />
//                             }
//                           />
//                           <FormControlLabel
//                             value="inactive"
//                             control={<Radio size="small" sx={{ color: theme.palette.primary.main }} />}
//                             label={
//                               <Chip
//                                 label="Inactive"
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(theme.palette.text.secondary, 0.1),
//                                   color: theme.palette.text.secondary,
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                                   height: 20,
//                                 }}
//                               />
//                             }
//                           />
//                         </RadioGroup>
//                       </FormControl>
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
//                       alignItems: "center",
//                       gap: 1.5,
//                       flexWrap: "wrap",
//                       flexDirection: { xs: isLandscape ? "row" : "column", sm: "row" },
//                     }}>
//                       <Button
//                         variant="outlined"
//                         component="label"
//                         startIcon={<CameraIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                         size="small"
//                         sx={{
//                           borderColor: theme.palette.primary.main,
//                           color: theme.palette.primary.main,
//                           borderRadius: 1.5,
//                           width: { xs: '100%', sm: 'auto' },
//                           py: { xs: 0.5, sm: 0.6 },
//                           fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                           "&:hover": {
//                             borderColor: theme.palette.primary.dark,
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           },
//                         }}
//                       >
//                         Upload Photo
//                         <input
//                           type="file"
//                           hidden
//                           accept="image/jpeg,image/png,image/gif"
//                           onChange={handleImageChange}
//                         />
//                       </Button>

//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}
//                       >
//                         JPG, PNG, GIF up to 5MB
//                       </Typography>
//                     </Box>

//                     {errors.avtar && (
//                       <Alert
//                         severity="error"
//                         sx={{
//                           mt: 1,
//                           borderRadius: 1.5,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                           py: 0.5,
//                         }}
//                         icon={<CloseIcon fontSize="small" />}
//                       >
//                         {errors.avtar}
//                       </Alert>
//                     )}

//                     {/* Image Preview */}
//                     {(previewImage || (editingUser?.avtar && !imageRemoved)) && (
//                       <Box
//                         sx={{
//                           mt: 1.5,
//                           position: "relative",
//                           display: "inline-block",
//                         }}
//                       >
//                         <Avatar
//                           src={previewImage || editingUser?.avtar}
//                           sx={{
//                             width: { xs: 60, sm: 70, md: 80 },
//                             height: { xs: 60, sm: 70, md: 80 },
//                             border: "2px solid",
//                             borderColor: theme.palette.primary.main,
//                             boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
//                           }}
//                         />
//                         <IconButton
//                           size="small"
//                           onClick={removeImage}
//                           sx={{
//                             position: "absolute",
//                             top: -6,
//                             right: -6,
//                             bgcolor: "#ef4444",
//                             color: "white",
//                             width: { xs: 18, sm: 20 },
//                             height: { xs: 18, sm: 20 },
//                             "&:hover": {
//                               bgcolor: "#dc2626",
//                             },
//                           }}
//                         >
//                           <CloseIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
//                         </IconButton>
//                       </Box>
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
//               }}>
//                 <Button
//                   variant="outlined"
//                   onClick={handleClose}
//                   fullWidth={isMobile}
//                   size="small"
//                   sx={{
//                     flex: { xs: '1', sm: 1 },
//                     py: { xs: 0.6, sm: 0.8 },
//                     borderRadius: { xs: 1.5, sm: 2 },
//                     borderColor: alpha(theme.palette.divider, 0.5),
//                     color: "text.secondary",
//                     fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
//                   disabled={loading}
//                   fullWidth={isMobile}
//                   size="small"
//                   sx={{
//                     flex: { xs: '1', sm: 1 },
//                     py: { xs: 0.6, sm: 0.8 },
//                     borderRadius: { xs: 1.5, sm: 2 },
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                     "&:hover": {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                   }}
//                 >
//                   {loading ? (
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









// All wokr but Just Loading

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
  Business as BusinessIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, updateUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";

const AddUser = ({ open, onClose, editingUser = null }) => {
  console.log("Editing user data ------------------------>", editingUser)
  const dispatch = useDispatch();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const userDataa = JSON.parse(localStorage.getItem("user"));
  const role_id = userDataa?.role_id;
  const userData = useSelector((state) => state.user?.userInfo || {});
  const loading = useSelector((state) => state.user?.loading || false);

  // Determine if current user is Super Admin (role_id = 2)
  const isSuperAdmin = role_id === 2;
  const isAdmin = role_id === 1;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    status: "active",
    avtar: null,
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
      });
      setImageRemoved(false);
console.log(editingUser,"#############################");

      if (editingUser.avtar) {
        setPreviewImage(editingUser.avtar);
      }
    } else {
      // Reset form when opening for new user
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        address: "",
        status: "active",
        avtar: null,
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

    // Restrict mobile to only numbers
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

    // Clear confirm password error when password changes
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
      setPreviewImage(URL.createObjectURL(file));
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

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(newErrors).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit called ..........................")

    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("createdby", userData._id || userDataa?._id);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("isActive", formData.status === "active");

    if (editingUser) {
      payload.append("role_id", editingUser.role_id);
    } else {
      // For Super Admin (role_id 2) creating Admin (role_id 1)
      // For Admin (role_id 1) creating User (role_id 0)
      payload.append("role_id", isSuperAdmin ? 1 : 0);
    }

    if (formData.avtar) {
      payload.append("avtar", formData.avtar);
    }

    if (editingUser && imageRemoved) {
      payload.append("removeAvtar", "true");
    }

    try {
      console.log("inside the try... ")
      if (editingUser) {
        console.log("calling the updare user API.......................")
        await dispatch(
          updateUser({ userId: editingUser.id, formData: payload })
        ).unwrap();
        toast.success("User updated successfully!");
      } else {
        payload.append("password", formData.password);
        payload.append("confirmPassword", formData.confirmPassword);
        await dispatch(registerUser(payload)).unwrap();
        toast.success("User created successfully!");
      }
      onClose(true); // Pass true to indicate success and refresh data
    } catch (error) {
      console.log("gettign rerror -------->", error)
      console.error("Submission error:", error);
      toast.error(error?.message || "Operation failed");
    }
  };

  const handleClose = () => {
    onClose();
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      {...getDialogProps()}
      fullWidth
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
                sx={{
                  color: "white",
                  width: 28,
                  height: 28,
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.1),
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
                  {/* Full Name - Dynamic label based on role */}
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

                  {/* Email */}
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
                      disabled={!!editingUser} // This makes it disabled when editing
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
                          // Style for disabled state
                          "&.Mui-disabled": {
                            backgroundColor: alpha(theme.palette.action.disabledBackground, 0.3),
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: alpha(theme.palette.primary.main, 0.2),
                            },
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          // Style for disabled label
                          "&.Mui-disabled": {
                            color: alpha(theme.palette.text.secondary, 0.6),
                          },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.7rem', sm: '0.75rem' },
                          py: 1.2,
                          // Style for disabled input
                          "&.Mui-disabled": {
                            color: alpha(theme.palette.text.primary, 0.7),
                            WebkitTextFillColor: alpha(theme.palette.text.primary, 0.7),
                          },
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

                  {/* Status - Only if not editing own profile */}
                  {editingUser?._id !== userDataa?._id && (
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel
                          component="legend"
                          sx={{
                            color: "text.primary",
                            fontWeight: 500,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' }
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
                            control={<Radio size="small" sx={{ color: theme.palette.primary.main }} />}
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
                            control={<Radio size="small" sx={{ color: theme.palette.primary.main }} />}
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
                  disabled={loading}
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
                  {loading ? (
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



