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
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   CheckCircle as CheckCircleIcon,
//   ErrorOutline as ErrorOutlineIcon,
//   SupervisorAccount as SubAdminIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { logout, stopImpersonation } from "../../redux/slices/authSlice";
// import {
//   updateUser,
//   getUserById,
//   getConfig,
//   createOrUpdateConfig,
//   deleteConfig,
// } from "../../redux/slices/userSlice";
// import LogoutModal from "../../components/models/LogoutModal";
// import { toast, ToastContainer } from "react-toastify";
// import { jwtDecode } from "jwt-decode";

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
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const authState = useSelector((state) => state.auth);
//   const { loading, config, configLoading, configUpdateLoading, configDeleteLoading } =
//     useSelector((state) => state.user || {});

//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isConfigEditing, setIsConfigEditing] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showSecretKeys, setShowSecretKeys] = useState({});

//   // Get user from auth slice FIRST (like Sidebar)
//   const { user, role_id, isImpersonating } = useSelector((state) => state.auth);

//   // Get stored user for fallback only
//   const getStoredUser = () => {
//     try {
//       const stored = localStorage.getItem('user');
//       return stored ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   };

//   const storedUser = getStoredUser();

//   // PRIORITIZE Redux auth user FIRST (like Sidebar), then fallback to storedUser or userData
//   const effectiveUser = user || storedUser || userData;
//   const effectiveRoleId = user?.role_id || storedUser?.role_id || userData?.role_id || role_id;

//   const isSuperAdmin = Number(effectiveRoleId) === 2;
//   const isAdmin = Number(effectiveRoleId) === 1;
//   const isSubAdmin = Number(effectiveRoleId) === 3;

//   // Check if impersonating
//   const isImpersonatingActive = isImpersonating || localStorage.getItem('isImpersonating') === 'true';

//   const emptyConfig = { razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", gmailUser: "", gmailAppPass: "", emailFrom: "" };
//   const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", address: "", avtar: null });
//   const [configFormData, setConfigFormData] = useState(emptyConfig);
//   const [configViewData, setConfigViewData] = useState(emptyConfig);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [imageRemoved, setImageRemoved] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [initialDataLoaded, setInitialDataLoaded] = useState(false);
//   const [avatarKey, setAvatarKey] = useState(0);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // FIX: Use ONLY Redux token (authState.token), never localStorage directly.
//   // localStorage can lag behind Redux during role switches / impersonation,
//   // causing jwtDecode to get the old user's ID and fetch the wrong profile.
//   // The `cancelled` flag prevents a slow in-flight request from overwriting
//   // a newer fetch if the token changes while the first is still pending.
//   // ─────────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     let cancelled = false;

//     const fetchUserData = async () => {
//       try {
//         // Only use Redux token — it is always the authoritative, up-to-date value
//         const token = authState?.token;

//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const decoded = jwtDecode(token);
//         const userId = decoded.id;

//         if (!userId) {
//           console.error("No user ID found in token");
//           toast.error("Authentication error. Please login again.");
//           navigate("/login");
//           return;
//         }

//         console.log("Fetching user data for ID:", userId);
//         await dispatch(getUserById(userId)).unwrap();

//         // Guard: if the token changed while this request was in-flight (i.e. the
//         // component re-ran the effect with a new token), don't touch local state.
//         if (!cancelled) {
//           setInitialDataLoaded(true);
//           setAvatarKey((prev) => prev + 1);
//         }
//       } catch (error) {
//         if (!cancelled) {
//           console.error("Error fetching user data:", error);
//           if (error.name === "InvalidTokenError") {
//             toast.error("Session expired. Please login again.");
//             navigate("/login");
//           } else {
//             toast.error("Failed to load profile data");
//           }
//         }
//       }
//     };

//     fetchUserData();

//     // Cleanup: mark any pending fetch from this effect run as stale
//     return () => {
//       cancelled = true;
//     };
//     // Re-run whenever the Redux token changes (covers login, logout, impersonation, role switch)
//   }, [dispatch, navigate, authState?.token]);

//   // Effect to handle navigation state for opening config tab
//   useEffect(() => {
//     if (location.state?.openConfigTab && isSuperAdmin) {
//       setTabValue(1);
//       navigate(location.pathname, { replace: true, state: {} });
//     }
//   }, [location.state, isSuperAdmin, navigate, location.pathname]);

//   const toggleSecretKey = (f) => setShowSecretKeys((p) => ({ ...p, [f]: !p[f] }));

//   useEffect(() => {
//     if (isSuperAdmin) {
//       dispatch(getConfig());
//     }
//   }, [dispatch, isSuperAdmin]);

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

//   // Update form data when effectiveUser or userData changes
//   useEffect(() => {
//     // Use effectiveUser for display data
//     const displayUser = effectiveUser || userData;
    
//     if (displayUser?._id) {
//       setFormData({
//         fullName: displayUser.name || "",
//         email: displayUser.email || "",
//         mobile: displayUser.mobile_no || "",
//         address: displayUser.address || "",
//         avtar: null,
//       });

//       if (displayUser.avtar) {
//         let avatarUrl = displayUser.avtar;
//         if (!avatarUrl.startsWith("http") && !avatarUrl.startsWith("data:")) {
//           const cleanPath = avatarUrl.startsWith("/") ? avatarUrl.slice(1) : avatarUrl;
//           avatarUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/${cleanPath}`;
//         }
//         avatarUrl = `${avatarUrl}${avatarUrl.includes("?") ? "&" : "?"}t=${Date.now()}`;
//         console.log("Setting avatar URL for user:", displayUser._id, avatarUrl);
//         setPreviewImage(avatarUrl);
//       } else {
//         console.log("No avatar for user:", displayUser._id);
//         setPreviewImage(null);
//       }
//     }
//   }, [effectiveUser, userData]);

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
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Max 5MB");
//       return;
//     }
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
//       setAvatarKey((prev) => prev + 1);
//       toast.success("Profile updated!");
//       setIsEditing(false);
//     } catch (error) {
//       if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
//         const allErrors = error.errors.join("\n• ");
//         toast.error(`Validation failed:\n• ${allErrors}`, {
//           autoClose: 5000,
//           style: { whiteSpace: "pre-line" },
//         });
//       } else {
//         toast.error(error?.message || "Update failed");
//       }
//     }
//   };

//   const handleCancel = () => {
//     const displayUser = effectiveUser || userData;
//     setFormData({
//       fullName: displayUser.name || "",
//       email: displayUser.email || "",
//       mobile: displayUser.mobile_no || "",
//       address: displayUser.address || "",
//       avtar: null,
//     });

//     if (displayUser.avtar) {
//       let avatarUrl = displayUser.avtar;
//       if (!avatarUrl.startsWith("http") && !avatarUrl.startsWith("data:")) {
//         const cleanPath = avatarUrl.startsWith("/") ? avatarUrl.slice(1) : avatarUrl;
//         avatarUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/${cleanPath}`;
//       }
//       setPreviewImage(avatarUrl);
//     } else {
//       setPreviewImage(null);
//     }

//     setImageRemoved(false);
//     setErrors({});
//     setTouched({});
//     setIsEditing(false);
//   };

//   const handleConfigChange = (e) => {
//     const { name, value } = e.target;
//     setConfigFormData({ ...configFormData, [name]: value });
//   };

//   const handleSaveConfig = async () => {
//     const payload = {};
//     Object.entries(configFormData).forEach(([k, v]) => { if (v) payload[k] = v; });
//     if (!Object.keys(payload).length) {
//       toast.error("Fill at least one field");
//       return;
//     }
//     try {
//       await dispatch(createOrUpdateConfig(payload)).unwrap();
//       await dispatch(getConfig());
//       setIsConfigEditing(false);
//       setShowSecretKeys({});
//       toast.success("Configuration saved!");
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to save configuration");
//     }
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
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to delete configuration");
//     }
//   };

//   const handleCancelConfig = () => {
//     setConfigFormData({ ...configViewData });
//     setIsConfigEditing(false);
//     setShowDeleteConfirm(false);
//     setShowSecretKeys({});
//   };

//   const getRoleInfo = () => {
//     const id = effectiveRoleId;
//     if (id === 2) return { icon: <SuperAdminIcon />, label: "Super Admin", color: theme.palette.secondary.main };
//     if (id === 1) return { icon: <AdminIcon />, label: "Admin", color: theme.palette.primary.main };
//     if (id === 3) return { icon: <SubAdminIcon />, label: "Sub Admin", color: theme.palette.info.main };
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

//   // Show loading state while fetching initial data
//   if (!initialDataLoaded && !userData?._id) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
//         <CircularProgress sx={{ color: theme.palette.primary.main }} />
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <motion.div variants={stagger} initial="initial" animate="animate">

//         {/* ── Header ── */}
//         <motion.div {...fadeUp(0)}>
//           <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//             <Typography variant="h5" fontWeight={800} sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
//             }}>
//               My Profile
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{
//               display: "flex", alignItems: "center", flexWrap: "wrap",
//               fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
//             }}>
//               Manage your account information and settings
//             </Typography>
//           </Box>
//         </motion.div>

//         {/* ── Main Content Row ── */}
//         <Grid container spacing={{ xs: 1.5, sm: 2 }} alignItems="stretch">

//           {/* ── LEFT: Profile card ── */}
//           <Grid item xs={12} md={4}>
//             <motion.div {...fadeUp(0.06)} style={{ height: "100%" }}>
//               <Paper elevation={0} sx={{
//                 borderRadius: 2.5,
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 overflow: "hidden",
//                 boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
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

//                 {/* Avatar + info */}
//                 <Box sx={{
//                   display: "flex", flexDirection: "column", alignItems: "center",
//                   px: 2.5, pb: 2.5, mt: { xs: -4, sm: -5 }, flex: 1,
//                 }}>
//                   <Badge
//                     overlap="circular"
//                     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                     badgeContent={isEditing && (
//                       <Tooltip title="Change Photo">
//                         <IconButton size="small" component="label" sx={{
//                           bgcolor: theme.palette.primary.main, color: "white",
//                           width: 22, height: 22,
//                           "&:hover": { bgcolor: theme.palette.primary.dark },
//                         }}>
//                           <CameraIcon sx={{ fontSize: 12 }} />
//                           <input type="file" hidden accept="image/*" onChange={handleImageChange} />
//                         </IconButton>
//                       </Tooltip>
//                     )}
//                   >
//                     <Box sx={{
//                       p: "2px", borderRadius: "50%",
//                       background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
//                       boxShadow: `0 4px 14px ${alpha(theme.palette.primary.dark, 0.2)}`,
//                     }}>
//                       {previewImage ? (
//                         <Avatar
//                           key={`avatar-${effectiveUser?._id || userData?._id}-${avatarKey}`}
//                           src={previewImage}
//                           sx={{
//                             width: { xs: 70, sm: 80 }, height: { xs: 70, sm: 80 },
//                             border: `2px solid ${theme.palette.background.paper}`,
//                           }}
//                           imgProps={{
//                             onError: (e) => {
//                               console.error("Avatar failed to load:", previewImage);
//                               e.target.src = "";
//                               setPreviewImage(null);
//                             },
//                           }}
//                         />
//                       ) : (
//                         <Avatar
//                           key={`default-avatar-${effectiveUser?._id || userData?._id}-${avatarKey}`}
//                           sx={{
//                             width: { xs: 70, sm: 80 }, height: { xs: 70, sm: 80 },
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                             border: `2px solid ${theme.palette.background.paper}`,
//                           }}
//                         >
//                           {(effectiveUser?.name || userData?.name)?.charAt(0)?.toUpperCase() || <PersonIcon sx={{ fontSize: { xs: 30, sm: 36 } }} />}
//                         </Avatar>
//                       )}
//                     </Box>
//                   </Badge>

//                   <Typography fontWeight={800} sx={{
//                     mt: 1, textAlign: "center", letterSpacing: -0.3,
//                     fontSize: "0.82rem", lineHeight: 1.2,
//                   }}>
//                     {effectiveUser?.name || userData?.name || "User Name"}
//                   </Typography>

//                   <Chip
//                     icon={React.cloneElement(roleInfo.icon, { sx: { fontSize: "11px !important", color: `${roleInfo.color} !important` } })}
//                     label={roleInfo.label}
//                     size="small"
//                     sx={{
//                       mt: 0.5, height: 20, fontWeight: 700, fontSize: "0.58rem",
//                       bgcolor: alpha(roleInfo.color, 0.1), color: roleInfo.color,
//                       border: `1px solid ${alpha(roleInfo.color, 0.2)}`,
//                       "& .MuiChip-icon": { ml: "4px" },
//                     }}
//                   />

//                   <Divider sx={{ width: "100%", my: 1, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

//                   <Stack spacing={0.8} sx={{ width: "100%", mb: 2 }}>
//                     {[
//                       (effectiveUser?.email || userData?.email) && { icon: <EmailIcon />, val: effectiveUser?.email || userData?.email },
//                       (effectiveUser?.mobile_no || userData?.mobile_no) && { icon: <PhoneIcon />, val: effectiveUser?.mobile_no || userData?.mobile_no },
//                       (effectiveUser?.createdAt || userData?.createdAt) && { icon: <CalendarIcon />, val: `Since ${new Date(effectiveUser?.createdAt || userData?.createdAt).toLocaleDateString()}` },
//                     ].filter(Boolean).map(({ icon, val, mono }, i) => (
//                       <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         {React.cloneElement(icon, { sx: { fontSize: 14, color: "text.secondary" } })}
//                         <Typography variant="caption" color="text.secondary" noWrap sx={{
//                           fontSize: "0.75rem",
//                           fontFamily: mono ? "monospace" : "inherit",
//                           fontWeight: mono ? 500 : 400,
//                         }}>
//                           {val}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Stack>

//                   <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0.7, mt: "auto" }}>
//                     <Button
//                       fullWidth variant="outlined" size="small"
//                       startIcon={<ResetPasswordIcon sx={{ fontSize: 12 }} />}
//                       onClick={() => navigate("/reset-password-profile")}
//                       sx={{
//                         height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.62rem",
//                         borderColor: alpha(theme.palette.primary.main, 0.35),
//                         color: theme.palette.primary.main,
//                       }}
//                     >
//                       Reset Password
//                     </Button>
//                     <Button
//                       fullWidth variant="outlined" size="small"
//                       startIcon={<LogoutIcon sx={{ fontSize: 12 }} />}
//                       onClick={() => setShowLogoutModal(true)}
//                       sx={{
//                         height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.62rem",
//                         color: "#ef4444", borderColor: alpha("#ef4444", 0.35),
//                         "&:hover": { bgcolor: alpha("#ef4444", 0.05) },
//                       }}
//                     >
//                       Log Out
//                     </Button>
//                   </Box>
//                 </Box>
//               </Paper>
//             </motion.div>
//           </Grid>

//           {/* ── RIGHT: Tabs panel ── */}
//           <Grid item xs={12} md={8}>
//             <motion.div {...fadeUp(0.1)} style={{ height: "100%" }}>
//               <Paper elevation={0} sx={{
//                 borderRadius: 2.5,
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 overflow: "hidden",
//                 boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}>
//                 {/* Tab bar */}
//                 <Box sx={{
//                   borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
//                   bgcolor: alpha(theme.palette.primary.main, 0.016),
//                   display: "flex", alignItems: "center", pr: 0.5, flexShrink: 0,
//                 }}>
//                   <Tabs
//                     value={tabValue}
//                     onChange={(_, v) => setTabValue(v)}
//                     variant={isMobile ? "fullWidth" : "standard"}
//                     sx={{
//                       flex: 1, px: { xs: 0, sm: 0.5 }, minHeight: 38,
//                       "& .MuiTab-root": {
//                         textTransform: "none", fontWeight: 600, minHeight: 38,
//                         py: 0.8, fontSize: "0.68rem", color: "text.secondary",
//                       },
//                       "& .Mui-selected": { color: `${theme.palette.primary.main} !important`, fontWeight: 700 },
//                       "& .MuiTabs-indicator": {
//                         height: 2, borderRadius: "2px 2px 0 0",
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
//                 <TabPanel value={tabValue} index={0}>
//                   <Box sx={{ px: { xs: 1.5, sm: 2 } }}>
//                     <AnimatePresence mode="wait">
//                       {isEditing ? (
//                         <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                           <Grid container spacing={1.5}>
//                             <Grid item xs={12}>
//                               <TextField
//                                 fullWidth name="fullName" label="Full Name"
//                                 value={formData.fullName}
//                                 onChange={handleChange} onBlur={handleBlur}
//                                 error={!!errors.fullName && touched.fullName}
//                                 helperText={touched.fullName && errors.fullName}
//                                 size="small" sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   ),
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                               <TextField
//                                 fullWidth name="email" label="Email"
//                                 value={formData.email} disabled size="small" sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   ),
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                               <TextField
//                                 fullWidth name="mobile" label="Mobile Number"
//                                 value={formData.mobile}
//                                 onChange={handleChange} onBlur={handleBlur}
//                                 error={!!errors.mobile && touched.mobile}
//                                 helperText={touched.mobile && errors.mobile}
//                                 size="small" sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   ),
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12}>
//                               <TextField
//                                 fullWidth name="address" label="Address"
//                                 value={formData.address}
//                                 onChange={handleChange} onBlur={handleBlur}
//                                 error={!!errors.address && touched.address}
//                                 helperText={touched.address && errors.address}
//                                 size="small" multiline rows={2} sx={editSx}
//                                 InputProps={{
//                                   startAdornment: (
//                                     <InputAdornment position="start">
//                                       <LocationIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} />
//                                     </InputAdornment>
//                                   ),
//                                 }}
//                               />
//                             </Grid>
//                             <Grid item xs={12}>
//                               <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//                                 <Button
//                                   variant="outlined" onClick={handleCancel} size="small"
//                                   startIcon={<CancelIcon sx={{ fontSize: 13 }} />}
//                                   sx={{
//                                     height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.65rem",
//                                     borderColor: alpha(theme.palette.divider, 0.6), color: "text.secondary",
//                                   }}
//                                 >
//                                   Cancel
//                                 </Button>
//                                 <Button
//                                   variant="contained" onClick={handleSave} disabled={loading} size="small"
//                                   startIcon={loading ? null : <SaveIcon sx={{ fontSize: 13 }} />}
//                                   sx={{
//                                     height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.65rem",
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
//                         <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                           <Stack spacing={1.2} sx={{ mb: 2 }}>
//                             <InfoBlock icon={<PersonIcon />} label="Full Name" value={effectiveUser?.name || userData?.name} />
//                             <Box sx={{ display: "flex", gap: 0.9, flexDirection: { xs: "column", sm: "row" } }}>
//                               <Box sx={{ flex: 1 }}>
//                                 <InfoBlock icon={<EmailIcon />} label="Email Address" value={effectiveUser?.email || userData?.email} />
//                               </Box>
//                               <Box sx={{ flex: 1 }}>
//                                 <InfoBlock icon={<PhoneIcon />} label="Mobile Number" value={effectiveUser?.mobile_no || userData?.mobile_no} />
//                               </Box>
//                             </Box>
//                             <InfoBlock icon={<LocationIcon />} label="Address" value={effectiveUser?.address || userData?.address} />
//                           </Stack>

//                           <Divider sx={{ mb: 2, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

//                           <Button
//                             variant="contained"
//                             startIcon={<EditIcon sx={{ fontSize: 13 }} />}
//                             onClick={() => setIsEditing(true)}
//                             size="small"
//                             sx={{
//                               height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.65rem",
//                               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                               boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
//                               alignSelf: "flex-start",
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
//                   <TabPanel value={tabValue} index={1}>
//                     <Box sx={{ px: { xs: 1.5, sm: 2 } }}>
//                       {configLoading ? (
//                         <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
//                           <CircularProgress size={22} sx={{ color: theme.palette.primary.main }} />
//                         </Box>
//                       ) : (
//                         <>
//                           {/* Status + toolbar row */}
//                           <Box sx={{
//                             display: "flex", alignItems: "center", gap: 1, mb: 1.5,
//                             flexWrap: "wrap", flexShrink: 0,
//                           }}>
//                             <Box sx={{
//                               display: "flex", alignItems: "center", gap: 0.6, flex: 1, minWidth: 150,
//                               px: 1, py: 0.4, borderRadius: 1.5,
//                               bgcolor: alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.06),
//                               border: `1px solid ${alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.14)}`,
//                             }}>
//                               {configuredCount === totalConfig
//                                 ? <CheckCircleIcon sx={{ fontSize: 12, color: "#22c55e" }} />
//                                 : <ErrorOutlineIcon sx={{ fontSize: 12, color: theme.palette.primary.main }} />}
//                               <Typography sx={{
//                                 fontSize: "0.6rem", fontWeight: 700,
//                                 color: configuredCount === totalConfig ? "#16a34a" : theme.palette.primary.main,
//                               }}>
//                                 {configuredCount}/{totalConfig} configured
//                               </Typography>
//                               <Box sx={{
//                                 flex: 1, height: 3, borderRadius: 2,
//                                 bgcolor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden",
//                               }}>
//                                 <Box sx={{
//                                   height: "100%", borderRadius: 2,
//                                   width: `${(configuredCount / totalConfig) * 100}%`,
//                                   background: configuredCount === totalConfig
//                                     ? "linear-gradient(90deg, #22c55e, #16a34a)"
//                                     : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
//                                   transition: "width 0.4s ease",
//                                 }} />
//                               </Box>
//                             </Box>

//                             {!isConfigEditing ? (
//                               <Button
//                                 variant="contained"
//                                 startIcon={<EditIcon sx={{ fontSize: 12 }} />}
//                                 onClick={() => setIsConfigEditing(true)}
//                                 size="small"
//                                 sx={{
//                                   height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.6rem",
//                                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                 }}
//                               >
//                                 Edit
//                               </Button>
//                             ) : (
//                               <Box sx={{ display: "flex", gap: 0.6 }}>
//                                 <Button
//                                   variant="outlined" color="error"
//                                   startIcon={<DeleteIcon sx={{ fontSize: 11 }} />}
//                                   onClick={() => setShowDeleteConfirm(true)}
//                                   disabled={configDeleteLoading || configUpdateLoading}
//                                   size="small"
//                                   sx={{ height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.55rem" }}
//                                 >
//                                   Delete
//                                 </Button>
//                                 <Button
//                                   variant="outlined" onClick={handleCancelConfig}
//                                   disabled={configUpdateLoading} size="small"
//                                   sx={{
//                                     height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.55rem",
//                                     borderColor: alpha(theme.palette.divider, 0.6), color: "text.secondary",
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
//                                     height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.55rem",
//                                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                   }}
//                                 >
//                                   {configUpdateLoading
//                                     ? <CircularProgress size={10} sx={{ color: "white" }} />
//                                     : "Save"}
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
//                                   p: 1.2, mb: 1.5,
//                                   bgcolor: alpha("#ef4444", 0.05),
//                                   border: `1px solid ${alpha("#ef4444", 0.2)}`,
//                                   borderRadius: 1.5,
//                                 }}>
//                                   <Typography variant="caption" sx={{
//                                     display: "block", mb: 0.6,
//                                     color: theme.palette.error.dark, fontSize: "0.6rem",
//                                   }}>
//                                     Delete entire configuration? This cannot be undone.
//                                   </Typography>
//                                   <Box sx={{ display: "flex", gap: 0.7 }}>
//                                     <Button
//                                       variant="contained" size="small"
//                                       onClick={handleDeleteConfig}
//                                       disabled={configDeleteLoading}
//                                       sx={{
//                                         height: 24, borderRadius: 1.2, fontWeight: 700, fontSize: "0.55rem",
//                                         bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" },
//                                       }}
//                                     >
//                                       {configDeleteLoading
//                                         ? <CircularProgress size={10} sx={{ color: "white" }} />
//                                         : "Yes, Delete"}
//                                     </Button>
//                                     <Button
//                                       variant="outlined" size="small"
//                                       onClick={() => setShowDeleteConfirm(false)}
//                                       sx={{ height: 24, borderRadius: 1.2, fontWeight: 700, fontSize: "0.55rem" }}
//                                     >
//                                       Cancel
//                                     </Button>
//                                   </Box>
//                                 </Paper>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>

//                           {/* Two-column config sections */}
//                           <Box sx={{ display: "flex", flexDirection: "row", gap: 2.5, flexWrap: "wrap" }}>
//                             {configSections.map((section) => (
//                               <Box key={section.title} sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}>
//                                 <Card elevation={0} sx={{
//                                   borderRadius: 2.5,
//                                   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                                   overflow: "hidden", height: "100%",
//                                   display: "flex", flexDirection: "column",
//                                 }}>
//                                   <Box sx={{
//                                     px: 2, py: 1.2,
//                                     bgcolor: alpha(theme.palette.primary.main, 0.03),
//                                     borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
//                                     display: "flex", alignItems: "center", gap: 1, flexShrink: 0,
//                                   }}>
//                                     <Box sx={{
//                                       width: 26, height: 26, borderRadius: 1, flexShrink: 0,
//                                       display: "flex", alignItems: "center", justifyContent: "center",
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
//                                             width: 6, height: 6, borderRadius: "50%",
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
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  ErrorOutline as ErrorOutlineIcon,
  SupervisorAccount as SubAdminIcon,
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
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] } },
});
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

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

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userData = useSelector((state) => state.user?.userInfo || {});
  const authState = useSelector((state) => state.auth);
  const { loading, config, configLoading, configUpdateLoading, configDeleteLoading } =
    useSelector((state) => state.user || {});

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfigEditing, setIsConfigEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSecretKeys, setShowSecretKeys] = useState({});

  // Get user from auth slice
  const { user, role_id, isImpersonating } = useSelector((state) => state.auth);

  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };
  const storedUser = getStoredUser();

  // ✅ FIX: During impersonation, use userData IMMEDIATELY (it's already loaded)
  // For normal login, use effectiveUser as fallback
  const isImpersonatingActive = isImpersonating || localStorage.getItem('isImpersonating') === 'true';
  
  // ✅ Prioritize userData during impersonation for instant display
  const effectiveUser = (isImpersonatingActive && userData?._id) 
    ? userData 
    : (user || storedUser || userData);
    
  const effectiveRoleId = effectiveUser?.role_id || user?.role_id || storedUser?.role_id || role_id;

  const isSuperAdmin = Number(effectiveRoleId) === 2;
  const isAdmin = Number(effectiveRoleId) === 1;
  const isSubAdmin = Number(effectiveRoleId) === 3;

  const emptyConfig = {
    razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "",
    gmailUser: "", gmailAppPass: "", emailFrom: ""
  };

  const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", address: "", avtar: null });
  const [configFormData, setConfigFormData] = useState(emptyConfig);
  const [configViewData, setConfigViewData] = useState(emptyConfig);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);

  // ✅ Fetch user data on mount
  useEffect(() => {
    let cancelled = false;

    const fetchUserData = async () => {
      try {
        const token = authState?.token;
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(token);
        let userId = decoded.id;

        // ✅ During impersonation, get the impersonated user's ID from localStorage
        const isImpersonatingMode = localStorage.getItem('isImpersonating') === 'true';
        if (isImpersonatingMode) {
          const storedUserData = localStorage.getItem('user');
          if (storedUserData) {
            try {
              const parsed = JSON.parse(storedUserData);
              if (parsed?._id) {
                userId = parsed._id;
              }
            } catch (e) {
              console.error('Error parsing stored user:', e);
            }
          }
        }

        if (!userId) {
          toast.error("Authentication error. Please login again.");
          navigate("/login");
          return;
        }

        await dispatch(getUserById(userId)).unwrap();

        if (!cancelled) {
          setInitialDataLoaded(true);
          setAvatarKey((prev) => prev + 1);
        }
      } catch (error) {
        if (!cancelled) {
          if (error.name === "InvalidTokenError") {
            toast.error("Session expired. Please login again.");
            navigate("/login");
          } else {
            toast.error("Failed to load profile data");
          }
        }
      }
    };

    fetchUserData();
    return () => { cancelled = true; };
  }, [dispatch, navigate, authState?.token]);

  useEffect(() => {
    if (location.state?.openConfigTab && isSuperAdmin) {
      setTabValue(1);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, isSuperAdmin, navigate, location.pathname]);

  useEffect(() => {
    if (isSuperAdmin) {
      dispatch(getConfig());
    }
  }, [dispatch, isSuperAdmin]);

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

  // ✅ Sync form data with effectiveUser - updates immediately when userData changes
  useEffect(() => {
    if (!effectiveUser?._id) return;

    setFormData({
      fullName: effectiveUser.name || "",
      email: effectiveUser.email || "",
      mobile: effectiveUser.mobile_no || "",
      address: effectiveUser.address || "",
      avtar: null,
    });

    if (effectiveUser.avtar) {
      let avatarUrl = effectiveUser.avtar;
      if (!avatarUrl.startsWith("http") && !avatarUrl.startsWith("data:")) {
        const cleanPath = avatarUrl.startsWith("/") ? avatarUrl.slice(1) : avatarUrl;
        avatarUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/${cleanPath}`;
      }
      avatarUrl = `${avatarUrl}${avatarUrl.includes("?") ? "&" : "?"}t=${Date.now()}`;
      setPreviewImage(avatarUrl);
    } else {
      setPreviewImage(null);
    }
  }, [effectiveUser]);

  const toggleSecretKey = (f) => setShowSecretKeys((p) => ({ ...p, [f]: !p[f] }));

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
    payload.append("role_id", effectiveUser.role_id);
    payload.append("createdby", effectiveUser.createdby);
    payload.append("isActive", effectiveUser.isActive);
    if (formData.avtar) payload.append("avtar", formData.avtar);
    if (imageRemoved) payload.append("removeAvtar", "true");

    try {
      await dispatch(updateUser({ userId: effectiveUser._id, formData: payload })).unwrap();
      await dispatch(getUserById(effectiveUser._id));
      setAvatarKey((prev) => prev + 1);
      toast.success("Profile updated!");
      setIsEditing(false);
      setImageRemoved(false);
    } catch (error) {
      if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        const allErrors = error.errors.join("\n• ");
        toast.error(`Validation failed:\n• ${allErrors}`, { autoClose: 5000, style: { whiteSpace: "pre-line" } });
      } else {
        toast.error(error?.message || "Update failed");
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: effectiveUser.name || "",
      email: effectiveUser.email || "",
      mobile: effectiveUser.mobile_no || "",
      address: effectiveUser.address || "",
      avtar: null,
    });

    if (effectiveUser.avtar) {
      let avatarUrl = effectiveUser.avtar;
      if (!avatarUrl.startsWith("http") && !avatarUrl.startsWith("data:")) {
        const cleanPath = avatarUrl.startsWith("/") ? avatarUrl.slice(1) : avatarUrl;
        avatarUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/${cleanPath}`;
      }
      setPreviewImage(avatarUrl);
    } else {
      setPreviewImage(null);
    }

    setImageRemoved(false);
    setErrors({});
    setTouched({});
    setIsEditing(false);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfigFormData({ ...configFormData, [name]: value });
  };

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
    } catch (e) {
      toast.error("Failed to save configuration");
    }
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
    } catch (e) {
      toast.error("Failed to delete configuration");
    }
  };

  const handleCancelConfig = () => {
    setConfigFormData({ ...configViewData });
    setIsConfigEditing(false);
    setShowDeleteConfirm(false);
    setShowSecretKeys({});
  };

  const getRoleInfo = () => {
    const id = effectiveRoleId;
    if (id === 2) return { icon: <SuperAdminIcon />, label: "Super Admin", color: theme.palette.secondary.main };
    if (id === 1) return { icon: <AdminIcon />, label: "Admin", color: theme.palette.primary.main };
    if (id === 3) return { icon: <SubAdminIcon />, label: "Sub Admin", color: theme.palette.info.main };
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
      title: "Payment", icon: <KeyIcon />,
      fields: [
        { name: "razorpayKeyId", label: "Razorpay Key ID", icon: <KeyIcon />, secret: false },
        { name: "razorpayKeySecret", label: "Key Secret", icon: <VpnKeyIcon />, secret: true },
        { name: "razorpayWebhookSecret", label: "Webhook Secret", icon: <VpnKeyIcon />, secret: true },
      ],
    },
    {
      title: "Gmail", icon: <MailIcon />,
      fields: [
        { name: "gmailUser", label: "Gmail User", icon: <MailIcon />, secret: false },
        { name: "gmailAppPass", label: "App Password", icon: <VpnKeyIcon />, secret: true },
        { name: "emailFrom", label: "Email From", icon: <EmailIcon />, secret: false },
      ],
    },
  ];

  if (!initialDataLoaded && !effectiveUser?._id) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <motion.div variants={stagger} initial="initial" animate="animate">

        <motion.div {...fadeUp(0)}>
          <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
            <Typography variant="h5" fontWeight={800} sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
            }}>
              My Profile
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{
              display: "flex", alignItems: "center", flexWrap: "wrap",
              fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
            }}>
              Manage your account information and settings
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 1.5, sm: 2 }} alignItems="stretch">

          {/* LEFT: Profile card */}
          <Grid item xs={12} md={4}>
            <motion.div {...fadeUp(0.06)} style={{ height: "100%" }}>
              <Paper elevation={0} sx={{
                borderRadius: 2.5,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                overflow: "hidden",
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
                height: "100%", display: "flex", flexDirection: "column",
              }}>
                <Box sx={{
                  height: { xs: 60, sm: 70 },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 65%, #0f2d4a 100%)`,
                  position: "relative", overflow: "hidden", flexShrink: 0,
                }}>
                  {[{ s: 80, t: -25, r: -8 }, { s: 50, t: 8, r: 45 }, { s: 35, t: -10, l: 20 }].map((c, i) => (
                    <Box key={i} sx={{
                      position: "absolute", width: c.s, height: c.s, borderRadius: "50%",
                      border: `1.5px solid ${alpha("#fff", 0.15)}`,
                      bgcolor: alpha("#fff", 0.05), top: c.t, right: c.r, left: c.l,
                    }} />
                  ))}
                </Box>

                <Box sx={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  px: 2.5, pb: 2.5, mt: { xs: -4, sm: -5 }, flex: 1,
                }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={isEditing && (
                      <Tooltip title="Change Photo">
                        <IconButton size="small" component="label" sx={{
                          bgcolor: theme.palette.primary.main, color: "white",
                          width: 22, height: 22,
                          "&:hover": { bgcolor: theme.palette.primary.dark },
                        }}>
                          <CameraIcon sx={{ fontSize: 12 }} />
                          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                        </IconButton>
                      </Tooltip>
                    )}
                  >
                    <Box sx={{
                      p: "2px", borderRadius: "50%",
                      background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                      boxShadow: `0 4px 14px ${alpha(theme.palette.primary.dark, 0.2)}`,
                    }}>
                      {previewImage ? (
                        <Avatar
                          key={`avatar-${effectiveUser?._id}-${avatarKey}`}
                          src={previewImage}
                          sx={{
                            width: { xs: 70, sm: 80 }, height: { xs: 70, sm: 80 },
                            border: `2px solid ${theme.palette.background.paper}`,
                          }}
                          imgProps={{
                            onError: (e) => {
                              console.error("Avatar failed to load");
                              e.target.src = "";
                              setPreviewImage(null);
                            },
                          }}
                        />
                      ) : (
                        <Avatar
                          key={`default-avatar-${effectiveUser?._id}-${avatarKey}`}
                          sx={{
                            width: { xs: 70, sm: 80 }, height: { xs: 70, sm: 80 },
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            border: `2px solid ${theme.palette.background.paper}`,
                          }}
                        >
                          {effectiveUser?.name?.charAt(0)?.toUpperCase() || <PersonIcon sx={{ fontSize: { xs: 30, sm: 36 } }} />}
                        </Avatar>
                      )}
                    </Box>
                  </Badge>

                  <Typography fontWeight={800} sx={{
                    mt: 1, textAlign: "center", letterSpacing: -0.3,
                    fontSize: "0.82rem", lineHeight: 1.2,
                  }}>
                    {effectiveUser?.name || "User Name"}
                  </Typography>

                  <Chip
                    icon={React.cloneElement(roleInfo.icon, { sx: { fontSize: "11px !important", color: `${roleInfo.color} !important` } })}
                    label={roleInfo.label}
                    size="small"
                    sx={{
                      mt: 0.5, height: 20, fontWeight: 700, fontSize: "0.58rem",
                      bgcolor: alpha(roleInfo.color, 0.1), color: roleInfo.color,
                      border: `1px solid ${alpha(roleInfo.color, 0.2)}`,
                      "& .MuiChip-icon": { ml: "4px" },
                    }}
                  />

                  <Divider sx={{ width: "100%", my: 1, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

                  <Stack spacing={0.8} sx={{ width: "100%", mb: 2 }}>
                    {[
                      effectiveUser?.email && { icon: <EmailIcon />, val: effectiveUser.email },
                      effectiveUser?.mobile_no && { icon: <PhoneIcon />, val: effectiveUser.mobile_no },
                      effectiveUser?.createdAt && { icon: <CalendarIcon />, val: `Since ${new Date(effectiveUser.createdAt).toLocaleDateString()}` },
                    ].filter(Boolean).map(({ icon, val }, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {React.cloneElement(icon, { sx: { fontSize: 14, color: "text.secondary" } })}
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: "0.75rem" }}>
                          {val}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0.7, mt: "auto" }}>
                    <Button fullWidth variant="outlined" size="small"
                      startIcon={<ResetPasswordIcon sx={{ fontSize: 12 }} />}
                      onClick={() => navigate("/reset-password-profile")}
                      sx={{
                        height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.62rem",
                        borderColor: alpha(theme.palette.primary.main, 0.35),
                        color: theme.palette.primary.main,
                      }}
                    >
                      Reset Password
                    </Button>
                    <Button fullWidth variant="outlined" size="small"
                      startIcon={<LogoutIcon sx={{ fontSize: 12 }} />}
                      onClick={() => setShowLogoutModal(true)}
                      sx={{
                        height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.62rem",
                        color: "#ef4444", borderColor: alpha("#ef4444", 0.35),
                        "&:hover": { bgcolor: alpha("#ef4444", 0.05) },
                      }}
                    >
                      Log Out
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* RIGHT: Tabs panel */}
          <Grid item xs={12} md={8}>
            <motion.div {...fadeUp(0.1)} style={{ height: "100%" }}>
              <Paper elevation={0} sx={{
                borderRadius: 2.5,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                overflow: "hidden",
                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.dark, 0.07)}`,
                height: "100%", display: "flex", flexDirection: "column",
              }}>
                <Box sx={{
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.016),
                  display: "flex", alignItems: "center", pr: 0.5, flexShrink: 0,
                }}>
                  <Tabs
                    value={tabValue}
                    onChange={(_, v) => setTabValue(v)}
                    variant={isMobile ? "fullWidth" : "standard"}
                    sx={{
                      flex: 1, px: { xs: 0, sm: 0.5 }, minHeight: 38,
                      "& .MuiTab-root": {
                        textTransform: "none", fontWeight: 600, minHeight: 38,
                        py: 0.8, fontSize: "0.68rem", color: "text.secondary",
                      },
                      "& .Mui-selected": { color: `${theme.palette.primary.main} !important`, fontWeight: 700 },
                      "& .MuiTabs-indicator": {
                        height: 2, borderRadius: "2px 2px 0 0",
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      },
                    }}
                  >
                    <Tab label="Personal Information" />
                    {isSuperAdmin && <Tab label="Configuration" />}
                  </Tabs>
                  {isSuperAdmin && tabValue === 1 && (
                    <Tooltip title="Refresh">
                      <IconButton size="small" onClick={() => dispatch(getConfig())} disabled={configLoading}
                        sx={{ color: theme.palette.primary.main, p: 0.5 }}>
                        <RefreshIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>

                {/* Personal Info Tab */}
                <TabPanel value={tabValue} index={0}>
                  <Box sx={{ px: { xs: 1.5, sm: 2 } }}>
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Grid container spacing={1.5}>
                            <Grid item xs={12}>
                              <TextField fullWidth name="fullName" label="Full Name"
                                value={formData.fullName} onChange={handleChange} onBlur={handleBlur}
                                error={!!errors.fullName && touched.fullName}
                                helperText={touched.fullName && errors.fullName}
                                size="small" sx={editSx}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment>) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth name="email" label="Email"
                                value={formData.email} disabled size="small" sx={editSx}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment>) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField fullWidth name="mobile" label="Mobile Number"
                                value={formData.mobile} onChange={handleChange} onBlur={handleBlur}
                                error={!!errors.mobile && touched.mobile}
                                helperText={touched.mobile && errors.mobile}
                                size="small" sx={editSx}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment>) }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField fullWidth name="address" label="Address"
                                value={formData.address} onChange={handleChange} onBlur={handleBlur}
                                error={!!errors.address && touched.address}
                                helperText={touched.address && errors.address}
                                size="small" multiline rows={2} sx={editSx}
                                InputProps={{ startAdornment: (<InputAdornment position="start"><LocationIcon sx={{ color: theme.palette.primary.main, fontSize: 15 }} /></InputAdornment>) }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                                <Button variant="outlined" onClick={handleCancel} size="small"
                                  startIcon={<CancelIcon sx={{ fontSize: 13 }} />}
                                  sx={{ height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.65rem", borderColor: alpha(theme.palette.divider, 0.6), color: "text.secondary" }}>
                                  Cancel
                                </Button>
                                <Button variant="contained" onClick={handleSave} disabled={loading} size="small"
                                  startIcon={loading ? null : <SaveIcon sx={{ fontSize: 13 }} />}
                                  sx={{
                                    height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.65rem",
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
                                  }}>
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
                        <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <Stack spacing={1.2} sx={{ mb: 2 }}>
                            <InfoBlock icon={<PersonIcon />} label="Full Name" value={effectiveUser?.name} />
                            <Box sx={{ display: "flex", gap: 0.9, flexDirection: { xs: "column", sm: "row" } }}>
                              <Box sx={{ flex: 1 }}>
                                <InfoBlock icon={<EmailIcon />} label="Email Address" value={effectiveUser?.email} />
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <InfoBlock icon={<PhoneIcon />} label="Mobile Number" value={effectiveUser?.mobile_no} />
                              </Box>
                            </Box>
                            <InfoBlock icon={<LocationIcon />} label="Address" value={effectiveUser?.address} />
                          </Stack>

                          <Divider sx={{ mb: 2, borderColor: alpha(theme.palette.primary.main, 0.07) }} />

                          <Button variant="contained" startIcon={<EditIcon sx={{ fontSize: 13 }} />}
                            onClick={() => setIsEditing(true)} size="small"
                            sx={{
                              height: 30, borderRadius: 1.5, fontWeight: 700, fontSize: "0.65rem",
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                              boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
                              alignSelf: "flex-start",
                            }}>
                            Edit Profile
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </TabPanel>

                {/* Configuration Tab */}
                {isSuperAdmin && (
                  <TabPanel value={tabValue} index={1}>
                    <Box sx={{ px: { xs: 1.5, sm: 2 } }}>
                      {configLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                          <CircularProgress size={22} sx={{ color: theme.palette.primary.main }} />
                        </Box>
                      ) : (
                        <>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, flexWrap: "wrap", flexShrink: 0 }}>
                            <Box sx={{
                              display: "flex", alignItems: "center", gap: 0.6, flex: 1, minWidth: 150,
                              px: 1, py: 0.4, borderRadius: 1.5,
                              bgcolor: alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.06),
                              border: `1px solid ${alpha(configuredCount === totalConfig ? "#22c55e" : theme.palette.primary.main, 0.14)}`,
                            }}>
                              {configuredCount === totalConfig
                                ? <CheckCircleIcon sx={{ fontSize: 12, color: "#22c55e" }} />
                                : <ErrorOutlineIcon sx={{ fontSize: 12, color: theme.palette.primary.main }} />}
                              <Typography sx={{
                                fontSize: "0.6rem", fontWeight: 700,
                                color: configuredCount === totalConfig ? "#16a34a" : theme.palette.primary.main,
                              }}>
                                {configuredCount}/{totalConfig} configured
                              </Typography>
                              <Box sx={{ flex: 1, height: 3, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden" }}>
                                <Box sx={{
                                  height: "100%", borderRadius: 2,
                                  width: `${(configuredCount / totalConfig) * 100}%`,
                                  background: configuredCount === totalConfig
                                    ? "linear-gradient(90deg, #22c55e, #16a34a)"
                                    : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                  transition: "width 0.4s ease",
                                }} />
                              </Box>
                            </Box>

                            {!isConfigEditing ? (
                              <Button variant="contained" startIcon={<EditIcon sx={{ fontSize: 12 }} />}
                                onClick={() => setIsConfigEditing(true)} size="small"
                                sx={{ height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.6rem", background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})` }}>
                                Edit
                              </Button>
                            ) : (
                              <Box sx={{ display: "flex", gap: 0.6 }}>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon sx={{ fontSize: 11 }} />}
                                  onClick={() => setShowDeleteConfirm(true)} disabled={configDeleteLoading || configUpdateLoading} size="small"
                                  sx={{ height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.55rem" }}>
                                  Delete
                                </Button>
                                <Button variant="outlined" onClick={handleCancelConfig} disabled={configUpdateLoading} size="small"
                                  sx={{ height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.55rem", borderColor: alpha(theme.palette.divider, 0.6), color: "text.secondary" }}>
                                  Cancel
                                </Button>
                                <Button variant="contained" startIcon={<SaveIcon sx={{ fontSize: 11 }} />}
                                  onClick={handleSaveConfig} disabled={configUpdateLoading} size="small"
                                  sx={{ height: 28, borderRadius: 1.5, fontWeight: 700, fontSize: "0.55rem", background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})` }}>
                                  {configUpdateLoading ? <CircularProgress size={10} sx={{ color: "white" }} /> : "Save"}
                                </Button>
                              </Box>
                            )}
                          </Box>

                          <AnimatePresence>
                            {showDeleteConfirm && (
                              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                                <Paper sx={{ p: 1.2, mb: 1.5, bgcolor: alpha("#ef4444", 0.05), border: `1px solid ${alpha("#ef4444", 0.2)}`, borderRadius: 1.5 }}>
                                  <Typography variant="caption" sx={{ display: "block", mb: 0.6, color: theme.palette.error.dark, fontSize: "0.6rem" }}>
                                    Delete entire configuration? This cannot be undone.
                                  </Typography>
                                  <Box sx={{ display: "flex", gap: 0.7 }}>
                                    <Button variant="contained" size="small" onClick={handleDeleteConfig} disabled={configDeleteLoading}
                                      sx={{ height: 24, borderRadius: 1.2, fontWeight: 700, fontSize: "0.55rem", bgcolor: "#ef4444", "&:hover": { bgcolor: "#dc2626" } }}>
                                      {configDeleteLoading ? <CircularProgress size={10} sx={{ color: "white" }} /> : "Yes, Delete"}
                                    </Button>
                                    <Button variant="outlined" size="small" onClick={() => setShowDeleteConfirm(false)}
                                      sx={{ height: 24, borderRadius: 1.2, fontWeight: 700, fontSize: "0.55rem" }}>
                                      Cancel
                                    </Button>
                                  </Box>
                                </Paper>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <Box sx={{ display: "flex", flexDirection: "row", gap: 2.5, flexWrap: "wrap" }}>
                            {configSections.map((section) => (
                              <Box key={section.title} sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 12px)" } }}>
                                <Card elevation={0} sx={{ borderRadius: 2.5, border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                                  <Box sx={{ px: 2, py: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.03), borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`, display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
                                    <Box sx={{ width: 26, height: 26, borderRadius: 1, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.14)}, ${alpha(theme.palette.primary.light, 0.07)})`, color: theme.palette.primary.main }}>
                                      {React.cloneElement(section.icon, { sx: { fontSize: 14 } })}
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, fontSize: "0.75rem" }} color="text.primary">{section.title}</Typography>
                                    <Box sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
                                      {section.fields.map(({ name }) => (
                                        <Tooltip key={name} title={configViewData[name] ? "Configured" : "Not configured"}>
                                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: configViewData[name] ? "#22c55e" : alpha(theme.palette.text.disabled, 0.3) }} />
                                        </Tooltip>
                                      ))}
                                    </Box>
                                  </Box>
                                  <Box sx={{ p: 1.8, flex: 1 }}>
                                    <Stack spacing={1.5}>
                                      {section.fields.map(({ name, label, icon, secret }) => (
                                        <ConfigField key={name} label={label} icon={icon} isSecret={secret}
                                          isEditing={isConfigEditing} fieldName={name}
                                          value={configViewData[name]} editValue={configFormData[name]}
                                          onChange={handleConfigChange} showSecretKeys={showSecretKeys}
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