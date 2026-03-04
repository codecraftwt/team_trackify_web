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
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, updateUser } from "../../../redux/slices/userSlice";
// import { toast } from "react-toastify";

// const AddUser = ({ open, onClose, editingUser = null }) => {
//   const dispatch = useDispatch();
//   const userDataa = JSON.parse(localStorage.getItem("user"));
//   const role_id = userDataa?.role_id;
//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const loading = useSelector((state) => state.user?.loading || false);

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
//         if (!value?.trim()) error = "Full name is required";
//         else if (value.length < 3) error = "Name must be at least 3 characters";
//         break;
//       case "email":
//         if (!value?.trim()) error = "Email is required";
//         else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//           error = "Invalid email format";
//         break;
//       case "password":
//         if (!editingUser) {
//           if (!value?.trim()) error = "Password is required";
//           else if (value.length < 6)
//             error = "Password must be at least 6 characters";
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

//   const getRoleBasedLabel = (label) => {
//     if (role_id === 1) {
//       return label.replace("Admin", "User");
//     }
//     return label;
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
//       payload.append("role_id", role_id === 2 ? 1 : 0);
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

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 4,
//           overflow: "hidden",
//           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
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
//           >
//             {/* Header */}
//             <Box
//               sx={{
//                 bgcolor: "#0f766e",
//                 py: 2.5,
//                 px: 3,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#ffffff", 0.2),
//                     color: "white",
//                     width: 40,
//                     height: 40,
//                   }}
//                 >
//                   <PersonIcon />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight={600} color="white">
//                     {editingUser
//                       ? getRoleBasedLabel("Edit Admin")
//                       : getRoleBasedLabel("Add New Admin")}
//                   </Typography>
//                   <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.8) }}>
//                     {editingUser
//                       ? "Update the information below"
//                       : "Fill in the details to create a new account"}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton
//                 onClick={handleClose}
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.1),
//                   },
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//               <DialogContent sx={{ p: 3 }}>
//                 <Grid container spacing={2.5}>
//                   {/* Full Name */}
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       name="fullName"
//                       label={editingUser ? "User Name" : "Organization Name"}
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
//                             <PersonIcon sx={{ color: "#0f766e", fontSize: 20 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
//                           },
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
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: "#0f766e", fontSize: 20 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
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
//                                 <LockIcon sx={{ color: "#0f766e", fontSize: 20 }} />
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
//                                     <VisibilityOffIcon fontSize="small" />
//                                   ) : (
//                                     <VisibilityIcon fontSize="small" />
//                                   )}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 2,
//                               "&:hover fieldset": {
//                                 borderColor: "#0f766e",
//                               },
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
//                                 <LockIcon sx={{ color: "#0f766e", fontSize: 20 }} />
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
//                                     <VisibilityOffIcon fontSize="small" />
//                                   ) : (
//                                     <VisibilityIcon fontSize="small" />
//                                   )}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 2,
//                               "&:hover fieldset": {
//                                 borderColor: "#0f766e",
//                               },
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
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PhoneIcon sx={{ color: "#0f766e", fontSize: 20 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
//                           },
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
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <HomeIcon sx={{ color: "#0f766e", fontSize: 20 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Status - Only if not editing own profile */}
//                   {editingUser?._id !== userDataa?._id && (
//                     <Grid item xs={12}>
//                       <FormControl component="fieldset">
//                         <FormLabel component="legend" sx={{ color: "#1e293b", fontWeight: 500, fontSize: "0.9rem" }}>
//                           Account Status
//                         </FormLabel>
//                         <RadioGroup
//                           row
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                         >
//                           <FormControlLabel
//                             value="active"
//                             control={<Radio size="small" sx={{ color: "#0f766e" }} />}
//                             label={
//                               <Chip
//                                 label="Active"
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha("#22c55e", 0.1),
//                                   color: "#22c55e",
//                                   fontWeight: 600,
//                                   fontSize: "0.75rem",
//                                 }}
//                               />
//                             }
//                           />
//                           <FormControlLabel
//                             value="inactive"
//                             control={<Radio size="small" sx={{ color: "#0f766e" }} />}
//                             label={
//                               <Chip
//                                 label="Inactive"
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha("#64748b", 0.1),
//                                   color: "#64748b",
//                                   fontWeight: 600,
//                                   fontSize: "0.75rem",
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
//                     <Typography variant="subtitle2" gutterBottom sx={{ color: "#1e293b", fontWeight: 600, fontSize: "0.9rem" }}>
//                       Profile Photo
//                     </Typography>
                    
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
//                       <Button
//                         variant="outlined"
//                         component="label"
//                         startIcon={<CameraIcon />}
//                         size="small"
//                         sx={{
//                           borderColor: "#0f766e",
//                           color: "#0f766e",
//                           borderRadius: 2,
//                           "&:hover": {
//                             borderColor: "#0a5c55",
//                             bgcolor: alpha("#0f766e", 0.1),
//                           },
//                         }}
//                       >
//                         Upload Photo
//                         <input
//                           type="file"
//                           hidden
//                           accept="image/*"
//                           onChange={handleImageChange}
//                         />
//                       </Button>
                      
//                       <Typography variant="caption" color="text.secondary">
//                         JPG, PNG, GIF up to 5MB
//                       </Typography>
//                     </Box>

//                     {errors.avtar && (
//                       <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }} icon={<CloseIcon fontSize="small" />}>
//                         {errors.avtar}
//                       </Alert>
//                     )}

//                     {/* Image Preview */}
//                     {(previewImage || (editingUser?.avtar && !imageRemoved)) && (
//                       <Box
//                         sx={{
//                           mt: 2,
//                           position: "relative",
//                           display: "inline-block",
//                         }}
//                       >
//                         <Avatar
//                           src={previewImage || editingUser?.avtar}
//                           sx={{
//                             width: 80,
//                             height: 80,
//                             border: "3px solid",
//                             borderColor: "#0f766e",
//                             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//                           }}
//                         />
//                         <IconButton
//                           size="small"
//                           onClick={removeImage}
//                           sx={{
//                             position: "absolute",
//                             top: -8,
//                             right: -8,
//                             bgcolor: "#ef4444",
//                             color: "white",
//                             width: 24,
//                             height: 24,
//                             "&:hover": {
//                               bgcolor: "#dc2626",
//                             },
//                           }}
//                         >
//                           <CloseIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     )}
//                   </Grid>
//                 </Grid>
//               </DialogContent>

//               {/* Actions */}
//               <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
//                 <Button
//                   variant="outlined"
//                   onClick={handleClose}
//                   sx={{
//                     flex: 1,
//                     py: 1,
//                     borderRadius: 2,
//                     borderColor: "#e2e8f0",
//                     color: "#64748b",
//                     "&:hover": {
//                       borderColor: "#0f766e",
//                       color: "#0f766e",
//                       bgcolor: alpha("#0f766e", 0.1),
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading}
//                   sx={{
//                     flex: 1,
//                     py: 1,
//                     borderRadius: 2,
//                     bgcolor: "#0f766e",
//                     "&:hover": {
//                       bgcolor: "#0a5c55",
//                     },
//                   }}
//                 >
//                   {loading ? (
//                     <CircularProgress size={20} sx={{ color: "white" }} />
//                   ) : editingUser ? (
//                     getRoleBasedLabel("Update Admin")
//                   ) : (
//                     getRoleBasedLabel("Register Admin")
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
//       return <BusinessIcon sx={{ color: "#0f766e", fontSize: 20 }} />;
//     } else {
//       return <PersonIcon sx={{ color: "#0f766e", fontSize: 20 }} />;
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

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       maxWidth="sm"  // Changed from "md" to "sm" - only change here
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 4,
//           overflow: "hidden",
//           boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
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
//           >
//             {/* Header */}
//             <Box
//               sx={{
//                 bgcolor: "#0f766e",
//                 py: 2.5,
//                 px: 3,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#ffffff", 0.2),
//                     color: "white",
//                     width: 40,
//                     height: 40,
//                   }}
//                 >
//                   {isSuperAdmin ? <BusinessIcon /> : <PersonIcon />}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight={600} color="white">
//                     {getTitle()}
//                   </Typography>
//                   <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.8) }}>
//                     {editingUser
//                       ? "Update the information below"
//                       : "Fill in the details to create a new account"}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton
//                 onClick={handleClose}
//                 sx={{
//                   color: "white",
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.1),
//                   },
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </Box>

//             {/* Form */}
//             <form onSubmit={handleSubmit}>
//               <DialogContent sx={{ p: 3 }}>
//                 <Grid container spacing={2.5}>
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
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
//                           },
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
//                       size="small"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon sx={{ color: "#0f766e", fontSize: 20 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
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
//                                 <LockIcon sx={{ color: "#0f766e", fontSize: 20 }} />
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
//                                     <VisibilityOffIcon fontSize="small" />
//                                   ) : (
//                                     <VisibilityIcon fontSize="small" />
//                                   )}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 2,
//                               "&:hover fieldset": {
//                                 borderColor: "#0f766e",
//                               },
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
//                                 <LockIcon sx={{ color: "#0f766e", fontSize: 20 }} />
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
//                                     <VisibilityOffIcon fontSize="small" />
//                                   ) : (
//                                     <VisibilityIcon fontSize="small" />
//                                   )}
//                                 </IconButton>
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 2,
//                               "&:hover fieldset": {
//                                 borderColor: "#0f766e",
//                               },
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
//                             <PhoneIcon sx={{ color: "#0f766e", fontSize: 20 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
//                           },
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
//                       rows={1}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <HomeIcon sx={{ color: "#0f766e", fontSize: 20 }} />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                           "&:hover fieldset": {
//                             borderColor: "#0f766e",
//                           },
//                         },
//                       }}
//                     />
//                   </Grid>

//                   {/* Status - Only if not editing own profile */}
//                   {editingUser?._id !== userDataa?._id && (
//                     <Grid item xs={12}>
//                       <FormControl component="fieldset">
//                         <FormLabel component="legend" sx={{ color: "#1e293b", fontWeight: 500, fontSize: "0.9rem" }}>
//                           Account Status
//                         </FormLabel>
//                         <RadioGroup
//                           row
//                           name="status"
//                           value={formData.status}
//                           onChange={handleChange}
//                         >
//                           <FormControlLabel
//                             value="active"
//                             control={<Radio size="small" sx={{ color: "#0f766e" }} />}
//                             label={
//                               <Chip
//                                 label="Active"
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha("#22c55e", 0.1),
//                                   color: "#22c55e",
//                                   fontWeight: 600,
//                                   fontSize: "0.75rem",
//                                 }}
//                               />
//                             }
//                           />
//                           <FormControlLabel
//                             value="inactive"
//                             control={<Radio size="small" sx={{ color: "#0f766e" }} />}
//                             label={
//                               <Chip
//                                 label="Inactive"
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha("#64748b", 0.1),
//                                   color: "#64748b",
//                                   fontWeight: 600,
//                                   fontSize: "0.75rem",
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
//                     <Typography variant="subtitle2" gutterBottom sx={{ color: "#1e293b", fontWeight: 600, fontSize: "0.9rem" }}>
//                       Profile Photo
//                     </Typography>
                    
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
//                       <Button
//                         variant="outlined"
//                         component="label"
//                         startIcon={<CameraIcon />}
//                         size="small"
//                         sx={{
//                           borderColor: "#0f766e",
//                           color: "#0f766e",
//                           borderRadius: 2,
//                           "&:hover": {
//                             borderColor: "#0a5c55",
//                             bgcolor: alpha("#0f766e", 0.1),
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
                      
//                       <Typography variant="caption" color="text.secondary">
//                         JPG, PNG, GIF up to 5MB
//                       </Typography>
//                     </Box>

//                     {errors.avtar && (
//                       <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }} icon={<CloseIcon fontSize="small" />}>
//                         {errors.avtar}
//                       </Alert>
//                     )}

//                     {/* Image Preview */}
//                     {(previewImage || (editingUser?.avtar && !imageRemoved)) && (
//                       <Box
//                         sx={{
//                           mt: 2,
//                           position: "relative",
//                           display: "inline-block",
//                         }}
//                       >
//                         <Avatar
//                           src={previewImage || editingUser?.avtar}
//                           sx={{
//                             width: 80,
//                             height: 80,
//                             border: "3px solid",
//                             borderColor: "#0f766e",
//                             boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//                           }}
//                         />
//                         <IconButton
//                           size="small"
//                           onClick={removeImage}
//                           sx={{
//                             position: "absolute",
//                             top: -8,
//                             right: -8,
//                             bgcolor: "#ef4444",
//                             color: "white",
//                             width: 24,
//                             height: 24,
//                             "&:hover": {
//                               bgcolor: "#dc2626",
//                             },
//                           }}
//                         >
//                           <CloseIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     )}
//                   </Grid>
//                 </Grid>
//               </DialogContent>

//               {/* Actions */}
//               <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
//                 <Button
//                   variant="outlined"
//                   onClick={handleClose}
//                   sx={{
//                     flex: 1,
//                     py: 1,
//                     borderRadius: 2,
//                     borderColor: "#e2e8f0",
//                     color: "#64748b",
//                     "&:hover": {
//                       borderColor: "#0f766e",
//                       color: "#0f766e",
//                       bgcolor: alpha("#0f766e", 0.1),
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   disabled={loading}
//                   sx={{
//                     flex: 1,
//                     py: 1,
//                     borderRadius: 2,
//                     bgcolor: "#0f766e",
//                     "&:hover": {
//                       bgcolor: "#0a5c55",
//                     },
//                   }}
//                 >
//                   {loading ? (
//                     <CircularProgress size={20} sx={{ color: "white" }} />
//                   ) : editingUser ? (
//                     isSuperAdmin ? "Update Admin" : "Update User"
//                   ) : (
//                     isSuperAdmin ? "Register Admin" : "Register User"
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




















////////////////////////////// Change Color Theam/////////////////////////////////////
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
      return <BusinessIcon sx={{ color: "#2563EB", fontSize: isMobile ? 18 : 20 }} />;
    } else {
      return <PersonIcon sx={{ color: "#2563EB", fontSize: isMobile ? 18 : 20 }} />;
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
      if (editingUser) {
        await dispatch(
          updateUser({ userId: editingUser._id, formData: payload })
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
            sm: 3, 
            md: 4 
          },
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          border: "1px solid",
          borderColor: alpha("#2563EB", 0.1),
          m: { xs: 0, sm: 2 },
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
                background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                py: { xs: 1.5, sm: 2, md: 2.5 },
                px: { xs: 2, sm: 2.5, md: 3 },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
                <Avatar
                  sx={{
                    bgcolor: alpha("#ffffff", 0.2),
                    color: "white",
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                  }}
                >
                  {isSuperAdmin ? <BusinessIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} /> : <PersonIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                </Avatar>
                <Box>
                  <Typography 
                    variant={isMobile ? "subtitle1" : "h6"} 
                    fontWeight={600} 
                    color="white"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' } }}
                  >
                    {getTitle()}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: alpha("#ffffff", 0.8),
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
                sx={{
                  color: "white",
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.1),
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
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
                  xs: isLandscape ? 1.5 : 2, 
                  sm: 2.5, 
                  md: 3 
                },
                flex: 1,
              }}>
                <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
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
                      size={isMobile ? "small" : "small"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {getNameFieldIcon()}
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#2563EB",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
                      size={isMobile ? "small" : "small"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#2563EB", fontSize: isMobile ? 18 : 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#2563EB",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
                          size={isMobile ? "small" : "small"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: "#2563EB", fontSize: isMobile ? 18 : 20 }} />
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
                                    <VisibilityOffIcon fontSize="small" sx={{ color: "#2563EB" }} />
                                  ) : (
                                    <VisibilityIcon fontSize="small" sx={{ color: "#2563EB" }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#2563EB",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            },
                            "& .MuiInputBase-input": {
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
                          size={isMobile ? "small" : "small"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: "#2563EB", fontSize: isMobile ? 18 : 20 }} />
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
                                    <VisibilityOffIcon fontSize="small" sx={{ color: "#2563EB" }} />
                                  ) : (
                                    <VisibilityIcon fontSize="small" sx={{ color: "#2563EB" }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#2563EB",
                              },
                            },
                            "& .MuiInputLabel-root": {
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                            },
                            "& .MuiInputBase-input": {
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
                      size={isMobile ? "small" : "small"}
                      inputProps={{
                        maxLength: 10,
                        pattern: "[0-9]*",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: "#2563EB", fontSize: isMobile ? 18 : 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#2563EB",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
                      size={isMobile ? "small" : "small"}
                      multiline
                      rows={isLandscape ? 1 : 2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon sx={{ color: "#2563EB", fontSize: isMobile ? 18 : 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#2563EB",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                        },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
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
                            color: "#1e293b", 
                            fontWeight: 500, 
                            fontSize: { xs: '0.8rem', sm: '0.9rem' } 
                          }}
                        >
                          Account Status
                        </FormLabel>
                        <RadioGroup
                          row
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 0 } }}
                        >
                          <FormControlLabel
                            value="active"
                            control={<Radio size={isMobile ? "small" : "medium"} sx={{ color: "#2563EB" }} />}
                            label={
                              <Chip
                                label="Active"
                                size="small"
                                sx={{
                                  bgcolor: alpha("#22c55e", 0.1),
                                  color: "#22c55e",
                                  fontWeight: 600,
                                  fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                }}
                              />
                            }
                          />
                          <FormControlLabel
                            value="inactive"
                            control={<Radio size={isMobile ? "small" : "medium"} sx={{ color: "#2563EB" }} />}
                            label={
                              <Chip
                                label="Inactive"
                                size="small"
                                sx={{
                                  bgcolor: alpha("#64748b", 0.1),
                                  color: "#64748b",
                                  fontWeight: 600,
                                  fontSize: { xs: '0.65rem', sm: '0.75rem' },
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
                        color: "#1e293b", 
                        fontWeight: 600, 
                        fontSize: { xs: '0.8rem', sm: '0.9rem' } 
                      }}
                    >
                      Profile Photo
                    </Typography>
                    
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 2, 
                      flexWrap: "wrap",
                      flexDirection: { xs: isLandscape ? "row" : "column", sm: "row" },
                    }}>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CameraIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                        size="small"
                        sx={{
                          borderColor: "#2563EB",
                          color: "#2563EB",
                          borderRadius: 2,
                          width: { xs: '100%', sm: 'auto' },
                          py: { xs: 0.8, sm: 1 },
                          fontSize: { xs: '0.75rem', sm: '0.8rem' },
                          "&:hover": {
                            borderColor: "#1E40AF",
                            bgcolor: alpha("#2563EB", 0.1),
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
                        sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}
                      >
                        JPG, PNG, GIF up to 5MB
                      </Typography>
                    </Box>

                    {errors.avtar && (
                      <Alert 
                        severity="error" 
                        sx={{ 
                          mt: 1, 
                          borderRadius: 2,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }} 
                        icon={<CloseIcon fontSize="small" />}
                      >
                        {errors.avtar}
                      </Alert>
                    )}

                    {/* Image Preview */}
                    {(previewImage || (editingUser?.avtar && !imageRemoved)) && (
                      <Box
                        sx={{
                          mt: 2,
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <Avatar
                          src={previewImage || editingUser?.avtar}
                          sx={{
                            width: { xs: 70, sm: 80 },
                            height: { xs: 70, sm: 80 },
                            border: "3px solid",
                            borderColor: "#2563EB",
                            boxShadow: `0 4px 15px ${alpha("#2563EB", 0.2)}`,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={removeImage}
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            bgcolor: "#ef4444",
                            color: "white",
                            width: { xs: 22, sm: 24 },
                            height: { xs: 22, sm: 24 },
                            "&:hover": {
                              bgcolor: "#dc2626",
                            },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>

              {/* Actions */}
              <DialogActions sx={{ 
                p: { xs: 2, sm: 2.5, md: 3 }, 
                pt: { xs: 1, sm: 1.5, md: 2 },
                gap: { xs: 1, sm: 1.5 },
                borderTop: "1px solid",
                borderColor: alpha("#2563EB", 0.1),
              }}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  fullWidth={isMobile}
                  sx={{
                    flex: { xs: '1', sm: 1 },
                    py: { xs: 0.8, sm: 1 },
                    borderRadius: { xs: 2, sm: 2.5 },
                    borderColor: "#e2e8f0",
                    color: "#64748b",
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    "&:hover": {
                      borderColor: "#2563EB",
                      color: "#2563EB",
                      bgcolor: alpha("#2563EB", 0.1),
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
                  sx={{
                    flex: { xs: '1', sm: 1 },
                    py: { xs: 0.8, sm: 1 },
                    borderRadius: { xs: 2, sm: 2.5 },
                    background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    "&:hover": {
                      background: "linear-gradient(135deg, #1E40AF, #2563EB)",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : editingUser ? (
                    isSuperAdmin ? "Update Admin" : "Update User"
                  ) : (
                    isSuperAdmin ? "Register Admin" : "Register User"
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