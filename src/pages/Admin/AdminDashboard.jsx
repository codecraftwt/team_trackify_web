// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton,
//   Container,
//   Divider,
//   LinearProgress,
//   Stack,
//   alpha,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   TrendingUp,
//   TrendingDown,
//   People as PeopleIcon,
//   LocationOn as LocationIcon,
//   Timeline as TimelineIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaUserCheck,
//   FaUserTimes,
//   FaUserClock,
// } from "react-icons/fa";
// import {
//   getAllUsers,
//   getUserById,
//   getLastFiveTrackedUsers,
//   getActiveUserLocations,
//   getUserCounts,
// } from "../../redux/slices/userSlice";
// import Loader from "../../components/common/Loader";
// import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

// const StatsCards = ({ stats }) => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   const getAvatarSize = () => {
//     if (isSmallMobile) return 32;
//     if (isMobile) return 36;
//     if (isTablet) return 40;
//     return 44;
//   };

//   const getFontSize = () => {
//     if (isSmallMobile) return '1.2rem';
//     if (isMobile) return '1.3rem';
//     if (isTablet) return '1.4rem';
//     return '1.6rem';
//   };

//   return (
//     <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
//       {stats.map((stat, index) => (
//         <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
//           <motion.div variants={itemVariants}>
//             <Paper
//               elevation={0}
//               onClick={() => stat.onClick?.(navigate)}
//               sx={{
//                 p: { xs: 1.5, sm: 1.8, md: 2 },
//                 borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//                 background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//                 border: "1px solid",
//                 borderColor: alpha(stat.iconColor, 0.2),
//                 cursor: stat.onClick ? "pointer" : "default",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 position: "relative",
//                 overflow: "hidden",
//                 height: '100%',
//                 minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 backdropFilter: "blur(10px)",
//                 "&::before": {
//                   content: '""',
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: "100%",
//                   background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
//                   zIndex: 0,
//                 },
//                 "&:hover": stat.onClick
//                   ? {
//                     transform: !isMobile ? "translateY(-4px) scale(1.02)" : "none",
//                     boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}` : "none",
//                     borderColor: stat.iconColor,
//                     "& .stat-icon": {
//                       transform: !isMobile ? "scale(1.1) rotate(5deg)" : "none",
//                     },
//                     "& .stat-value": {
//                       color: stat.iconColor,
//                     },
//                   }
//                   : {},
//               }}
//             >
//               <Box sx={{ position: "relative", zIndex: 1 }}>
//                 <Box sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexDirection: isSmallMobile ? "column" : "row",
//                   textAlign: isSmallMobile ? "center" : "left",
//                   gap: isSmallMobile ? 0.5 : 0,
//                 }}>
//                   <Box>
//                     <Typography
//                       variant="h4"
//                       fontWeight="700"
//                       className="stat-value"
//                       sx={{
//                         mb: 0.25,
//                         color: '#1e293b',
//                         transition: "color 0.3s ease",
//                         fontSize: getFontSize(),
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {stat.count}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         fontWeight: 500,
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' },
//                         whiteSpace: 'nowrap',
//                       }}
//                     >
//                       {stat.label}
//                     </Typography>
//                   </Box>
//                   <Avatar
//                     className="stat-icon"
//                     sx={{
//                       bgcolor: alpha(stat.iconColor, 0.1),
//                       color: stat.iconColor,
//                       width: getAvatarSize(),
//                       height: getAvatarSize(),
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       boxShadow: `0 8px 16px -5px ${alpha(stat.iconColor, 0.2)}`,
//                       '& svg': {
//                         fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' }
//                       }
//                     }}
//                   >
//                     {stat.icon}
//                   </Avatar>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   width: "100%",
//                   height: 3,
//                   background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
//                   opacity: 0.8,
//                 }}
//               />
//             </Paper>
//           </motion.div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// // CurrentPlan Component
// const CurrentPlan = ({ planData }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (!planData) return null;

//   const daysLeft = planExpiresIn(planData.expiresAt);

//   const calculateProgress = () => {
//     if (!planData.createdAt || !planData.expiresAt) return 0;
//     const created = new Date(planData.createdAt);
//     const expires = new Date(planData.expiresAt);
//     const today = new Date();
//     const totalDuration = expires - created;
//     const elapsed = today - created;
//     let progress = (elapsed / totalDuration) * 100;
//     return Math.min(Math.max(progress, 0), 100);
//   };

//   const progress = calculateProgress();

//   const getStatusColor = () => {
//     if (daysLeft <= 0) return "#ef4444";
//     if (daysLeft <= 7) return "#f59e0b";
//     return "#0f766e";
//   };

//   const statusColor = getStatusColor();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 2, sm: 2.5, md: 3 },
//           borderRadius: { xs: 3, sm: 3.5, md: 4 },
//           border: "1px solid",
//           borderColor: alpha(statusColor, 0.2),
//           mb: { xs: 3, sm: 4 },
//           background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//           boxShadow: `0 10px 30px -15px ${alpha(statusColor, 0.2)}`,
//         }}
//       >
//         {/* Header */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.5, sm: 2 },
//           pb: { xs: 1.5, sm: 2 },
//           borderBottom: "2px solid",
//           borderColor: alpha(statusColor, 0.1),
//           gap: { xs: 1, sm: 0 }
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Box
//               sx={{
//                 width: { xs: 6, sm: 8 },
//                 height: { xs: 6, sm: 8 },
//                 borderRadius: "50%",
//                 bgcolor: statusColor,
//                 animation: daysLeft <= 7 ? "pulse 2s infinite" : "none",
//                 "@keyframes pulse": {
//                   "0%": { opacity: 1, transform: "scale(1)" },
//                   "50%": { opacity: 0.5, transform: "scale(1.2)" },
//                   "100%": { opacity: 1, transform: "scale(1)" },
//                 },
//               }}
//             />
//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               fontWeight="700"
//               color="#0f766e"
//             >
//               Current Plan
//             </Typography>
//           </Box>
//           <Chip
//             label={daysLeft <= 0 ? "Expired" : daysLeft <= 7 ? "Expiring Soon" : "Active"}
//             size={isSmallMobile ? "small" : "small"}
//             sx={{
//               bgcolor: statusColor,
//               color: "white",
//               fontWeight: 600,
//               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//               height: { xs: 20, sm: 22, md: 24 },
//               px: 1,
//               boxShadow: `0 4px 10px -2px ${alpha(statusColor, 0.5)}`,
//             }}
//           />
//         </Box>

//         {/* Plan Description */}
//         <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Typography
//             variant={isMobile ? "h6" : "h5"}
//             fontWeight="700"
//             color="#1e293b"
//             gutterBottom
//             sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
//           >
//             {planData.description || "No Plan"}
//           </Typography>
//         </Box>

//         {/* Stats Grid */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Duration
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
//                 {planData.duration || "N/A"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Amount
//               </Typography>
//               <Typography variant="body2" fontWeight="700" sx={{ color: statusColor }}>
//                 ₹{planData.amount || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Currency
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
//                 {planData.currency || "INR"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Status
//               </Typography>
//               <Chip
//                 label={planData.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(planData.isActive ? "#0f766e" : "#6B7280", 0.1),
//                   color: planData.isActive ? "#0f766e" : "#6B7280",
//                   fontWeight: 600,
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   height: { xs: 18, sm: 20 },
//                   mt: 0.5,
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: { xs: 1.5, sm: 2 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

//         {/* Dates */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//               Created At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//               {formatDateDDMMYYYY(planData.createdAt)}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//               Expires At
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
//               <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//                 {formatDateDDMMYYYY(planData.expiresAt)}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Progress Section */}
//         {planData.expiresAt && (
//           <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
//                 Progress {Math.round(progress)}%
//               </Typography>
//               <Chip
//                 label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(statusColor, 0.1),
//                   color: statusColor,
//                   height: 20,
//                   fontSize: "0.65rem",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: { xs: 4, sm: 5, md: 6 },
//                 borderRadius: 3,
//                 bgcolor: alpha(statusColor, 0.1),
//                 "& .MuiLinearProgress-bar": {
//                   bgcolor: statusColor,
//                   borderRadius: 3,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* User Limits */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Min Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
//                 {planData.minUser || planData.minUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Max Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
//                 {planData.maxUser || planData.maxUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </motion.div>
//   );
// };

// // RecentActivities Component
// const RecentActivities = ({ users }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (!users || users.length === 0) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 3, sm: 4 },
//             borderRadius: { xs: 3, sm: 4 },
//             border: "1px solid",
//             borderColor: alpha("#0f766e", 0.1),
//             background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//             textAlign: "center",
//           }}
//         />
//       </motion.div>
//     );
//   }

//   const displayUsers = users.slice(0, 4);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 2, sm: 2.5, md: 3 },
//           borderRadius: { xs: 3, sm: 3.5, md: 4 },
//           border: "1px solid",
//           borderColor: alpha("#0f766e", 0.1),
//           background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 2, sm: 3 },
//           gap: 1
//         }}>
//           <Typography variant="h6" fontWeight="600" color="#0f766e">
//             Recent Activities
//           </Typography>
//           {users.length > 4 && (
//             <Chip
//               label={`View All (${users.length})`}
//               size={isSmallMobile ? "small" : "small"}
//               onClick={() => console.log("View all clicked")}
//               sx={{
//                 bgcolor: alpha("#0f766e", 0.1),
//                 color: "#0f766e",
//                 fontWeight: 500,
//                 cursor: "pointer",
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 height: { xs: 24, sm: 28 },
//                 "&:hover": {
//                   bgcolor: alpha("#0f766e", 0.2),
//                 },
//               }}
//             />
//           )}
//         </Box>

//         <Stack spacing={2}>
//           {displayUsers.map((activity, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 1.5, sm: 2 },
//                   borderRadius: { xs: 2, sm: 3 },
//                   bgcolor: alpha("#0f766e", 0.02),
//                   border: "1px solid",
//                   borderColor: alpha("#0f766e", 0.1),
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   textAlign: { xs: 'center', sm: 'left' },
//                   gap: { xs: 1, sm: 0 },
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.05),
//                     transform: !isMobile ? "translateX(4px)" : "none",
//                     borderColor: alpha("#0f766e", 0.3),
//                   },
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#0f766e", 0.2),
//                     color: "#0f766e",
//                     mr: { xs: 0, sm: 2 },
//                     mb: { xs: 0.5, sm: 0 },
//                     width: { xs: 40, sm: 48 },
//                     height: { xs: 40, sm: 48 },
//                     fontWeight: 600,
//                   }}
//                 >
//                   {activity.name?.charAt(0) || "U"}
//                 </Avatar>
//                 <Box sx={{ flex: 1, width: '100%' }}>
//                   <Typography variant="subtitle2" fontWeight="600" color="#1e293b">
//                     {activity.name || "Unknown User"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {activity.action || "No action"} • {activity.location || "Unknown location"}
//                   </Typography>
//                 </Box>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mt: { xs: 0.5, sm: 0 } }}>
//                   {activity.time || "N/A"}
//                 </Typography>
//               </Paper>
//             </motion.div>
//           ))}
//         </Stack>
//       </Paper>
//     </motion.div>
//   );
// };

// // Main AdminDashboard Component
//   const AdminDashboard = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const theme = useTheme();

//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const isSmallMobile = useMediaQuery('(max-width:480px)');

//     const [checkedInCount, setCheckedInCount] = useState(0);
//     const [checkedOutCount, setCheckedOutCount] = useState(0);
//     const [totalActiveUsers, setTotalActiveUsers] = useState(0);
//     const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [planData, setPlanData] = useState(null);
//     const [lastUpdated, setLastUpdated] = useState(new Date());
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     const userState = useSelector((state) => state.user || {});
//     const userData = userState.userInfo || {};
//     const lastTrackedUsers = userState.lastTrackedUsers || [];
//     const loading = userState.loading || false;

//     // Consolidated data fetching function
//     const fetchAllData = useCallback(async () => {
//       if (!userData?._id) {
//         console.log("No user ID available");
//         setIsLoading(false);
//         return;
//       }
      
//       try {
//         setIsLoading(true);
//         console.log("Fetching data for user:", userData._id);
        
//         // Fetch user data first
//         const userResult = await dispatch(getUserById(userData._id)).unwrap();
//         console.log("User API Result:", userResult);
        
//         // Extract plan data from the correct path
//         if (userResult?.user?.currentPaymentId?.addOns?.length > 0) {
//           const plan = userResult.user.currentPaymentId;
//           console.log("Plan data found:", plan);
          
//           setPlanData({
//             description: plan.description,
//             duration: plan.duration,
//             amount: plan.amount,
//             currency: plan.currency,
//             isActive: plan.isActive,
//             createdAt: plan.createdAt,
//             expiresAt: plan.expiresAt,
//             minUser: plan.minUser,
//             maxUser: plan.maxUser,
//           });
//         } else {
//           console.log("No plan data found in user result");
//           setPlanData(null);
//         }

//         // Fetch all other data in parallel
//         const [lastTrackedResult, locationsResult, countsResult, allUsersResult] = await Promise.all([
//           dispatch(getLastFiveTrackedUsers(userData._id)),
//           dispatch(getActiveUserLocations()),
//           dispatch(getUserCounts()),
//           dispatch(getAllUsers(userData._id))
//         ]);

//         // Process users data
//         if (allUsersResult.payload?.users) {
//           const users = allUsersResult.payload.users;
//           const today = new Date().toISOString().split("T")[0];

//           setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
//           setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
//           setTotalActiveUsers(users.filter(u => u.isActive).length);
//           setTotalInActiveUsers(users.filter(u => !u.isActive).length);
//           setTotalUsers(users.length);
//         }

//         setLastUpdated(new Date());
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, [dispatch, userData?._id]);

//     // Initial load - runs when component mounts or userData._id changes
//     useEffect(() => {
//       console.log("useEffect triggered, userData:", userData);
      
//       if (userData?._id) {
//         fetchAllData();
//       } else {
//         // Check localStorage for user data
//         const storedUser = localStorage.getItem('user');
//         console.log("Stored user from localStorage:", storedUser);
        
//         if (storedUser) {
//           try {
//             const parsedUser = JSON.parse(storedUser);
//             console.log("Parsed user:", parsedUser);
            
//             if (parsedUser?._id) {
//               // Dispatch to update Redux state
//               dispatch({ type: 'user/setUserInfo', payload: parsedUser });
//             } else {
//               setIsLoading(false);
//             }
//           } catch (e) {
//             console.error('Error parsing stored user:', e);
//             setIsLoading(false);
//           }
//         } else {
//           setIsLoading(false);
//         }
//       }
//     }, [userData?._id, dispatch, fetchAllData]);

//     // Focus effect
//     useEffect(() => {
//       const handleFocus = () => {
//         if (userData?._id) {
//           fetchAllData();
//         }
//       };

//       window.addEventListener('focus', handleFocus);
//       return () => window.removeEventListener('focus', handleFocus);
//     }, [userData?._id, fetchAllData]);

//     const handleRefresh = async () => {
//       setIsRefreshing(true);
//       await fetchAllData();
//       setIsRefreshing(false);
//     };

//     const userStats = [
//       {
//         key: "activeUsers",
//         label: "Active Users",
//         count: totalActiveUsers,
//         icon: <FaUsers size={24} />,
//         bgColor: alpha("#3B82F6", 0.1),
//         iconColor: "#3B82F6",
//         onClick: () => navigate("/user?filter=active"),
//       },
//       {
//         key: "inactiveUsers",
//         label: "Inactive Users",
//         count: totalInActiveUsers,
//         icon: <FaUserTimes size={24} />,
//         bgColor: alpha("#6B7280", 0.1),
//         iconColor: "#6B7280",
//         onClick: () => navigate("/user?filter=inactive"),
//       },
//       {
//         key: "checkedInUsers",
//         label: "Checked In",
//         count: checkedInCount,
//         icon: <FaUserCheck size={24} />,
//         bgColor: alpha("#22C55E", 0.1),
//         iconColor: "#22C55E",
//         onClick: () => checkedInCount > 0 && navigate("/admin/live-locations"),
//       },
//       {
//         key: "checkedOutUsers",
//         label: "Checked Out",
//         count: checkedOutCount,
//         icon: <FaUserClock size={24} />,
//         bgColor: alpha("#F59E0B", 0.1),
//         iconColor: "#F59E0B",
//         onClick: () => navigate("/admin/reports"),
//       },
//     ];

//     const containerVariants = {
//       hidden: { opacity: 0 },
//       visible: {
//         opacity: 1,
//         transition: { staggerChildren: 0.1 },
//       },
//     };

//     const itemVariants = {
//       hidden: { opacity: 0, y: 20 },
//       visible: {
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.5 },
//       },
//     };

//     // if (isLoading) {
//     //   return (
//     //     <Loader
//     //       message="Loading Dashboard..."
//     //       subMessage="Fetching your team data and tracking information"
//     //       fullScreen={true}
//     //       size={isMobile ? "medium" : "large"}
//     //     />
//     //   );
//     // }

//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//           width: "100%",
//           overflowX: "hidden",
//           py: { xs: 2, sm: 3, md: 4 },
//           px: { xs: 1, sm: 2, md: 4 },
//         }}
//       >
//         {isRefreshing && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               bgcolor: "rgba(255, 255, 255, 0.8)",
//               backdropFilter: "blur(5px)",
//               zIndex: 999,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Loader
//               message="Refreshing data..."
//               subMessage="Please wait while we update your dashboard"
//               size={isMobile ? "small" : "medium"}
//             />
//           </Box>
//         )}

//         <Box
//           component={motion.main}
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           sx={{ width: '100%' }}
//         >
//           <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//             {/* Header Section */}
//             <Box
//               component={motion.div}
//               variants={itemVariants}
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 justifyContent: "space-between",
//                 alignItems: { xs: 'flex-start', sm: 'center' },
//                 mb: { xs: 3, sm: 4 },
//                 gap: 2
//               }}
//             >
//               <Box>
//                 <Typography
//                   variant={isMobile ? "h5" : "h4"}
//                   fontWeight="800"
//                   color="#0f766e"
//                   gutterBottom
//                   sx={{
//                     background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                   }}
//                 >
//                   Admin Dashboard
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   flexWrap: "wrap",
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//                 }}>
//                   Overview • Last updated {lastUpdated.toLocaleTimeString()}
//                   <IconButton
//                     size="small"
//                     sx={{
//                       ml: 1,
//                       bgcolor: alpha("#0f766e", 0.1),
//                       width: { xs: 24, sm: 28 },
//                       height: { xs: 24, sm: 28 },
//                       "&:hover": { bgcolor: alpha("#0f766e", 0.2) },
//                     }}
//                     onClick={handleRefresh}
//                     disabled={isRefreshing}
//                   >
//                     <RefreshIcon
//                       fontSize="small"
//                       sx={{
//                         color: "#0f766e",
//                         fontSize: { xs: 14, sm: 16 },
//                         animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
//                         '@keyframes spin': {
//                           '0%': { transform: 'rotate(0deg)' },
//                           '100%': { transform: 'rotate(360deg)' },
//                         },
//                       }}
//                     />
//                   </IconButton>
//                 </Typography>
//               </Box>
//               <Chip
//                 label="Admin"
//                 size={isSmallMobile ? "small" : "medium"}
//                 sx={{
//                   bgcolor: "#0f766e",
//                   color: "white",
//                   fontWeight: 600,
//                   px: { xs: 1.5, sm: 2 },
//                   py: { xs: 1.5, sm: 2.5 },
//                   fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
//                   height: { xs: 28, sm: 32, md: 36 },
//                   boxShadow: `0 10px 20px -5px ${alpha("#0f766e", 0.3)}`,
//                 }}
//               />
//             </Box>

//             {/* Stats Cards */}
//             <StatsCards stats={userStats} />

//             {/* Current Plan Section */}
//             {planData && <CurrentPlan planData={planData} />}

//             {/* Recent Activities */}
//             <RecentActivities users={lastTrackedUsers} />
//           </Container>
//         </Box>
//       </Box>
//     );
//   };

//   export default AdminDashboard;
 

















// With scalaten Loader
// import React, { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton,
//   Container,
//   Divider,
//   LinearProgress,
//   Stack,
//   alpha,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   TrendingUp,
//   TrendingDown,
//   People as PeopleIcon,
//   LocationOn as LocationIcon,
//   Timeline as TimelineIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaUserCheck,
//   FaUserTimes,
//   FaUserClock,
// } from "react-icons/fa";
// import {
//   getAllUsers,
//   getUserById,
//   getLastFiveTrackedUsers,
//   getActiveUserLocations,
//   getUserCounts,
// } from "../../redux/slices/userSlice";
// import Loader from "../../components/common/Loader";
// import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

// // Stats Card Skeleton
// const StatsCardSkeleton = () => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 1.8, md: 2 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         height: '100%',
//         minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box sx={{ width: '60%' }}>
//           <Skeleton variant="text" width="70%" height={20} />
//           <Skeleton variant="text" width="90%" height={40} />
//         </Box>
//         <Skeleton variant="circular" width={44} height={44} />
//       </Box>
//     </Paper>
//   );
// };

// // Current Plan Skeleton
// const CurrentPlanSkeleton = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 2, sm: 2.5, md: 3 },
//         borderRadius: { xs: 3, sm: 3.5, md: 4 },
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         mb: { xs: 3, sm: 4 },
//         background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//       }}
//     >
//       {/* Header Skeleton */}
//       <Box sx={{ 
//         display: "flex", 
//         justifyContent: "space-between", 
//         alignItems: "center", 
//         mb: 2, 
//         pb: 2, 
//         borderBottom: "1px solid", 
//         borderColor: alpha("#e2e8f0", 0.5) 
//       }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={8} height={8} />
//           <Skeleton variant="text" width={100} height={24} />
//         </Box>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3 }} />
//       </Box>

//       {/* Description Skeleton */}
//       <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />

//       {/* Stats Grid Skeleton */}
//       <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: 2 }}>
//         {[1, 2, 3, 4].map((item) => (
//           <Grid item xs={6} md={3} key={item}>
//             <Box sx={{ p: 1 }}>
//               <Skeleton variant="text" width="50%" height={16} />
//               <Skeleton variant="text" width="70%" height={24} />
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       <Divider sx={{ my: 2 }} />

//       {/* Dates Skeleton */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={16} />
//           <Skeleton variant="text" width="60%" height={20} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={16} />
//           <Skeleton variant="text" width="60%" height={20} />
//         </Grid>
//       </Grid>

//       {/* Progress Skeleton */}
//       <Box sx={{ mb: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//           <Skeleton variant="text" width={100} height={16} />
//           <Skeleton variant="rounded" width={80} height={20} sx={{ borderRadius: 3 }} />
//         </Box>
//         <Skeleton variant="rounded" width="100%" height={6} sx={{ borderRadius: 3 }} />
//       </Box>

//       {/* User Limits Skeleton */}
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={16} />
//           <Skeleton variant="text" width="40%" height={28} />
//         </Grid>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={16} />
//           <Skeleton variant="text" width="40%" height={28} />
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Recent Activities Skeleton
// const RecentActivitiesSkeleton = () => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 2, sm: 2.5, md: 3 },
//         borderRadius: { xs: 3, sm: 3.5, md: 4 },
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Skeleton variant="text" width={150} height={32} />
//         <Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 3 }} />
//       </Box>

//       <Stack spacing={2}>
//         {[1, 2, 3, 4].map((item) => (
//           <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Skeleton variant="circular" width={48} height={48} />
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="40%" height={20} />
//               <Skeleton variant="text" width="60%" height={16} />
//             </Box>
//             <Skeleton variant="text" width={80} height={16} />
//           </Box>
//         ))}
//       </Stack>
//     </Paper>
//   );
// };

// // const StatsCards = ({ stats }) => {
// //   const navigate = useNavigate();
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// //   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
// //   const isSmallMobile = useMediaQuery('(max-width:480px)');

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.5 },
// //     },
// //   };

// //   const getAvatarSize = () => {
// //     if (isSmallMobile) return 32;
// //     if (isMobile) return 36;
// //     if (isTablet) return 40;
// //     return 44;
// //   };

// //   const getFontSize = () => {
// //     if (isSmallMobile) return '1.2rem';
// //     if (isMobile) return '1.3rem';
// //     if (isTablet) return '1.4rem';
// //     return '1.6rem';
// //   };

// //   return (
// //     <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
// //       {stats.map((stat, index) => (
// //         <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
// //           <motion.div variants={itemVariants}>
// //             <Paper
// //               elevation={0}
// //               onClick={() => stat.onClick?.(navigate)}
// //               sx={{
// //                 p: { xs: 1.5, sm: 1.8, md: 2 },
// //                 borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
// //                 background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
// //                 border: "1px solid",
// //                 borderColor: alpha(stat.iconColor, 0.2),
// //                 cursor: stat.onClick ? "pointer" : "default",
// //                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
// //                 position: "relative",
// //                 overflow: "hidden",
// //                 height: '100%',
// //                 minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 justifyContent: 'center',
// //                 backdropFilter: "blur(10px)",
// //                 "&::before": {
// //                   content: '""',
// //                   position: "absolute",
// //                   top: 0,
// //                   left: 0,
// //                   right: 0,
// //                   height: "100%",
// //                   background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
// //                   zIndex: 0,
// //                 },
// //                 "&:hover": stat.onClick
// //                   ? {
// //                     transform: !isMobile ? "translateY(-4px) scale(1.02)" : "none",
// //                     boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}` : "none",
// //                     borderColor: stat.iconColor,
// //                     "& .stat-icon": {
// //                       transform: !isMobile ? "scale(1.1) rotate(5deg)" : "none",
// //                     },
// //                     "& .stat-value": {
// //                       color: stat.iconColor,
// //                     },
// //                   }
// //                   : {},
// //               }}
// //             >
// //               <Box sx={{ position: "relative", zIndex: 1 }}>
// //                 <Box sx={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "space-between",
// //                   flexDirection: isSmallMobile ? "column" : "row",
// //                   textAlign: isSmallMobile ? "center" : "left",
// //                   gap: isSmallMobile ? 0.5 : 0,
// //                 }}>
// //                   <Box>
// //                     <Typography
// //                       variant="h4"
// //                       fontWeight="700"
// //                       className="stat-value"
// //                       sx={{
// //                         mb: 0.25,
// //                         color: '#1e293b',
// //                         transition: "color 0.3s ease",
// //                         fontSize: getFontSize(),
// //                         lineHeight: 1.2,
// //                       }}
// //                     >
// //                       {stat.count}
// //                     </Typography>
// //                     <Typography
// //                       variant="body2"
// //                       color="text.secondary"
// //                       sx={{
// //                         fontWeight: 500,
// //                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' },
// //                         whiteSpace: 'nowrap',
// //                       }}
// //                     >
// //                       {stat.label}
// //                     </Typography>
// //                   </Box>
// //                   <Avatar
// //                     className="stat-icon"
// //                     sx={{
// //                       bgcolor: alpha(stat.iconColor, 0.1),
// //                       color: stat.iconColor,
// //                       width: getAvatarSize(),
// //                       height: getAvatarSize(),
// //                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
// //                       boxShadow: `0 8px 16px -5px ${alpha(stat.iconColor, 0.2)}`,
// //                       '& svg': {
// //                         fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' }
// //                       }
// //                     }}
// //                   >
// //                     {stat.icon}
// //                   </Avatar>
// //                 </Box>
// //               </Box>
// //               <Box
// //                 sx={{
// //                   position: "absolute",
// //                   bottom: 0,
// //                   left: 0,
// //                   width: "100%",
// //                   height: 3,
// //                   background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
// //                   opacity: 0.8,
// //                 }}
// //               />
// //             </Paper>
// //           </motion.div>
// //         </Grid>
// //       ))}
// //     </Grid>
// //   );
// // };


// // CurrentPlan Component

// const StatsCards = ({ stats, loading }) => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const getAvatarSize = () => {
//     if (isSmallMobile) return 32;
//     if (isMobile) return 36;
//     if (isTablet) return 40;
//     return 44;
//   };

//   const getFontSize = () => {
//     if (isSmallMobile) return '1.2rem';
//     if (isMobile) return '1.3rem';
//     if (isTablet) return '1.4rem';
//     return '1.6rem';
//   };

//   // ✅ SIMPLIFIED SKELETON - NO MOTION CONFLICT
//   if (loading) {
//     return (
//       <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
//         {[1, 2, 3, 4].map((_, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatsCardSkeleton />
//           </Grid>
//         ))}
//       </Grid>
//     );
//   }

//   // ✅ YOUR ORIGINAL CODE - PERFECTLY PRESERVED
//   return (
//     <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
//       {stats.map((stat, index) => (
//         <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <Paper
//               elevation={0}
//               onClick={() => stat.onClick?.(navigate)}
//               sx={{
//                 p: { xs: 1.5, sm: 1.8, md: 2 },
//                 borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//                 background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//                 border: "1px solid",
//                 borderColor: alpha(stat.iconColor, 0.2),
//                 cursor: stat.onClick ? "pointer" : "default",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 position: "relative",
//                 overflow: "hidden",
//                 height: '100%',
//                 minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 backdropFilter: "blur(10px)",
//                 "&::before": {
//                   content: '""',
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: "100%",
//                   background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
//                   zIndex: 0,
//                 },
//                 "&:hover": stat.onClick
//                   ? {
//                       transform: !isMobile ? "translateY(-4px) scale(1.02)" : "none",
//                       boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}` : "none",
//                       borderColor: stat.iconColor,
//                       "& .stat-icon": {
//                         transform: !isMobile ? "scale(1.1) rotate(5deg)" : "none",
//                       },
//                       "& .stat-value": {
//                         color: stat.iconColor,
//                       },
//                     }
//                   : {},
//               }}
//             >
//               <Box sx={{ position: "relative", zIndex: 1 }}>
//                 <Box sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexDirection: isSmallMobile ? "column" : "row",
//                   textAlign: isSmallMobile ? "center" : "left",
//                   gap: isSmallMobile ? 0.5 : 0,
//                 }}>
//                   <Box>
//                     <Typography
//                       variant="h4"
//                       fontWeight="700"
//                       className="stat-value"
//                       sx={{
//                         mb: 0.25,
//                         color: '#1e293b',
//                         transition: "color 0.3s ease",
//                         fontSize: getFontSize(),
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {stat.count}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         fontWeight: 500,
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' },
//                         whiteSpace: 'nowrap',
//                       }}
//                     >
//                       {stat.label}
//                     </Typography>
//                   </Box>
//                   <Avatar
//                     className="stat-icon"
//                     sx={{
//                       bgcolor: alpha(stat.iconColor, 0.1),
//                       color: stat.iconColor,
//                       width: getAvatarSize(),
//                       height: getAvatarSize(),
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       boxShadow: `0 8px 16px -5px ${alpha(stat.iconColor, 0.2)}`,
//                       '& svg': {
//                         fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' }
//                       }
//                     }}
//                   >
//                     {stat.icon}
//                   </Avatar>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   width: "100%",
//                   height: 3,
//                   background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
//                   opacity: 0.8,
//                 }}
//               />
//             </Paper>
//           </motion.div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };


// const CurrentPlan = ({ planData, loading }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <CurrentPlanSkeleton />;
//   }

//   if (!planData) return null;

//   const daysLeft = planExpiresIn(planData.expiresAt);

//   const calculateProgress = () => {
//     if (!planData.createdAt || !planData.expiresAt) return 0;
//     const created = new Date(planData.createdAt);
//     const expires = new Date(planData.expiresAt);
//     const today = new Date();
//     const totalDuration = expires - created;
//     const elapsed = today - created;
//     let progress = (elapsed / totalDuration) * 100;
//     return Math.min(Math.max(progress, 0), 100);
//   };

//   const progress = calculateProgress();

//   const getStatusColor = () => {
//     if (daysLeft <= 0) return "#ef4444";
//     if (daysLeft <= 7) return "#f59e0b";
//     return "#0f766e";
//   };

//   const statusColor = getStatusColor();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 2, sm: 2.5, md: 3 },
//           borderRadius: { xs: 3, sm: 3.5, md: 4 },
//           border: "1px solid",
//           borderColor: alpha(statusColor, 0.2),
//           mb: { xs: 3, sm: 4 },
//           background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//           boxShadow: `0 10px 30px -15px ${alpha(statusColor, 0.2)}`,
//         }}
//       >
//         {/* Header */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.5, sm: 2 },
//           pb: { xs: 1.5, sm: 2 },
//           borderBottom: "2px solid",
//           borderColor: alpha(statusColor, 0.1),
//           gap: { xs: 1, sm: 0 }
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Box
//               sx={{
//                 width: { xs: 6, sm: 8 },
//                 height: { xs: 6, sm: 8 },
//                 borderRadius: "50%",
//                 bgcolor: statusColor,
//                 animation: daysLeft <= 7 ? "pulse 2s infinite" : "none",
//                 "@keyframes pulse": {
//                   "0%": { opacity: 1, transform: "scale(1)" },
//                   "50%": { opacity: 0.5, transform: "scale(1.2)" },
//                   "100%": { opacity: 1, transform: "scale(1)" },
//                 },
//               }}
//             />
//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               fontWeight="700"
//               color="#0f766e"
//             >
//               Current Plan
//             </Typography>
//           </Box>
//           <Chip
//             label={daysLeft <= 0 ? "Expired" : daysLeft <= 7 ? "Expiring Soon" : "Active"}
//             size={isSmallMobile ? "small" : "small"}
//             sx={{
//               bgcolor: statusColor,
//               color: "white",
//               fontWeight: 600,
//               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//               height: { xs: 20, sm: 22, md: 24 },
//               px: 1,
//               boxShadow: `0 4px 10px -2px ${alpha(statusColor, 0.5)}`,
//             }}
//           />
//         </Box>

//         {/* Plan Description */}
//         <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Typography
//             variant={isMobile ? "h6" : "h5"}
//             fontWeight="700"
//             color="#1e293b"
//             gutterBottom
//             sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
//           >
//             {planData.description || "No Plan"}
//           </Typography>
//         </Box>

//         {/* Stats Grid */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Duration
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
//                 {planData.duration || "N/A"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Amount
//               </Typography>
//               <Typography variant="body2" fontWeight="700" sx={{ color: statusColor }}>
//                 ₹{planData.amount || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Currency
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
//                 {planData.currency || "INR"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Status
//               </Typography>
//               <Chip
//                 label={planData.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(planData.isActive ? "#0f766e" : "#6B7280", 0.1),
//                   color: planData.isActive ? "#0f766e" : "#6B7280",
//                   fontWeight: 600,
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   height: { xs: 18, sm: 20 },
//                   mt: 0.5,
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: { xs: 1.5, sm: 2 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

//         {/* Dates */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//               Created At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//               {formatDateDDMMYYYY(planData.createdAt)}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//               Expires At
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
//               <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//                 {formatDateDDMMYYYY(planData.expiresAt)}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Progress Section */}
//         {planData.expiresAt && (
//           <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
//                 Progress {Math.round(progress)}%
//               </Typography>
//               <Chip
//                 label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(statusColor, 0.1),
//                   color: statusColor,
//                   height: 20,
//                   fontSize: "0.65rem",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: { xs: 4, sm: 5, md: 6 },
//                 borderRadius: 3,
//                 bgcolor: alpha(statusColor, 0.1),
//                 "& .MuiLinearProgress-bar": {
//                   bgcolor: statusColor,
//                   borderRadius: 3,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* User Limits */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Min Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
//                 {planData.minUser || planData.minUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Max Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
//                 {planData.maxUser || planData.maxUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </motion.div>
//   );
// };

// // RecentActivities Component
// const RecentActivities = ({ users, loading }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <RecentActivitiesSkeleton />;
//   }

//   if (!users || users.length === 0) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 3, sm: 4 },
//             borderRadius: { xs: 3, sm: 4 },
//             border: "1px solid",
//             borderColor: alpha("#0f766e", 0.1),
//             background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//             textAlign: "center",
//           }}
//         />
//       </motion.div>
//     );
//   }

//   const displayUsers = users.slice(0, 4);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 2, sm: 2.5, md: 3 },
//           borderRadius: { xs: 3, sm: 3.5, md: 4 },
//           border: "1px solid",
//           borderColor: alpha("#0f766e", 0.1),
//           background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 2, sm: 3 },
//           gap: 1
//         }}>
//           <Typography variant="h6" fontWeight="600" color="#0f766e">
//             Recent Activities
//           </Typography>
//           {users.length > 4 && (
//             <Chip
//               label={`View All (${users.length})`}
//               size={isSmallMobile ? "small" : "small"}
//               onClick={() => console.log("View all clicked")}
//               sx={{
//                 bgcolor: alpha("#0f766e", 0.1),
//                 color: "#0f766e",
//                 fontWeight: 500,
//                 cursor: "pointer",
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 height: { xs: 24, sm: 28 },
//                 "&:hover": {
//                   bgcolor: alpha("#0f766e", 0.2),
//                 },
//               }}
//             />
//           )}
//         </Box>

//         <Stack spacing={2}>
//           {displayUsers.map((activity, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 1.5, sm: 2 },
//                   borderRadius: { xs: 2, sm: 3 },
//                   bgcolor: alpha("#0f766e", 0.02),
//                   border: "1px solid",
//                   borderColor: alpha("#0f766e", 0.1),
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   textAlign: { xs: 'center', sm: 'left' },
//                   gap: { xs: 1, sm: 0 },
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.05),
//                     transform: !isMobile ? "translateX(4px)" : "none",
//                     borderColor: alpha("#0f766e", 0.3),
//                   },
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#0f766e", 0.2),
//                     color: "#0f766e",
//                     mr: { xs: 0, sm: 2 },
//                     mb: { xs: 0.5, sm: 0 },
//                     width: { xs: 40, sm: 48 },
//                     height: { xs: 40, sm: 48 },
//                     fontWeight: 600,
//                   }}
//                 >
//                   {activity.name?.charAt(0) || "U"}
//                 </Avatar>
//                 <Box sx={{ flex: 1, width: '100%' }}>
//                   <Typography variant="subtitle2" fontWeight="600" color="#1e293b">
//                     {activity.name || "Unknown User"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {activity.action || "No action"} • {activity.location || "Unknown location"}
//                   </Typography>
//                 </Box>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mt: { xs: 0.5, sm: 0 } }}>
//                   {activity.time || "N/A"}
//                 </Typography>
//               </Paper>
//             </motion.div>
//           ))}
//         </Stack>
//       </Paper>
//     </motion.div>
//   );
// };

// // Main AdminDashboard Component
// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const [checkedInCount, setCheckedInCount] = useState(0);
//   const [checkedOutCount, setCheckedOutCount] = useState(0);
//   const [totalActiveUsers, setTotalActiveUsers] = useState(0);
//   const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [planData, setPlanData] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const userState = useSelector((state) => state.user || {});
//   const userData = userState.userInfo || {};
//   const lastTrackedUsers = userState.lastTrackedUsers || [];
//   const loading = userState.loading || false;

//   // Consolidated data fetching function
//   const fetchAllData = useCallback(async () => {
//     if (!userData?._id) {
//       console.log("No user ID available");
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       setIsLoading(true);
//       console.log("Fetching data for user:", userData._id);
      
//       // Fetch user data first
//       const userResult = await dispatch(getUserById(userData._id)).unwrap();
//       console.log("User API Result:", userResult);
      
//       // Extract plan data from the correct path
//       if (userResult?.user?.currentPaymentId?.addOns?.length > 0) {
//         const plan = userResult.user.currentPaymentId;
//         console.log("Plan data found:", plan);
        
//         setPlanData({
//           description: plan.description,
//           duration: plan.duration,
//           amount: plan.amount,
//           currency: plan.currency,
//           isActive: plan.isActive,
//           createdAt: plan.createdAt,
//           expiresAt: plan.expiresAt,
//           minUser: plan.minUser,
//           maxUser: plan.maxUser,
//         });
//       } else {
//         console.log("No plan data found in user result");
//         setPlanData(null);
//       }

//       // Fetch all other data in parallel
//       const [lastTrackedResult, locationsResult, countsResult, allUsersResult] = await Promise.all([
//         dispatch(getLastFiveTrackedUsers(userData._id)),
//         dispatch(getActiveUserLocations()),
//         dispatch(getUserCounts()),
//         dispatch(getAllUsers(userData._id))
//       ]);

//       // Process users data
//       if (allUsersResult.payload?.users) {
//         const users = allUsersResult.payload.users;
//         const today = new Date().toISOString().split("T")[0];

//         setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
//         setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
//         setTotalActiveUsers(users.filter(u => u.isActive).length);
//         setTotalInActiveUsers(users.filter(u => !u.isActive).length);
//         setTotalUsers(users.length);
//       }

//       setLastUpdated(new Date());
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [dispatch, userData?._id]);

//   // Initial load - runs when component mounts or userData._id changes
//   useEffect(() => {
//     console.log("useEffect triggered, userData:", userData);
    
//     if (userData?._id) {
//       fetchAllData();
//     } else {
//       // Check localStorage for user data
//       const storedUser = localStorage.getItem('user');
//       console.log("Stored user from localStorage:", storedUser);
      
//       if (storedUser) {
//         try {
//           const parsedUser = JSON.parse(storedUser);
//           console.log("Parsed user:", parsedUser);
          
//           if (parsedUser?._id) {
//             // Dispatch to update Redux state
//             dispatch({ type: 'user/setUserInfo', payload: parsedUser });
//           } else {
//             setIsLoading(false);
//           }
//         } catch (e) {
//           console.error('Error parsing stored user:', e);
//           setIsLoading(false);
//         }
//       } else {
//         setIsLoading(false);
//       }
//     }
//   }, [userData?._id, dispatch, fetchAllData]);

//   // Focus effect
//   useEffect(() => {
//     const handleFocus = () => {
//       if (userData?._id) {
//         fetchAllData();
//       }
//     };

//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [userData?._id, fetchAllData]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchAllData();
//     setIsRefreshing(false);
//   };

//   const userStats = [
//     {
//       key: "activeUsers",
//       label: "Active Users",
//       count: totalActiveUsers,
//       icon: <FaUsers size={24} />,
//       bgColor: alpha("#3B82F6", 0.1),
//       iconColor: "#3B82F6",
//       onClick: () => navigate("/user?filter=active"),
//     },
//     {
//       key: "inactiveUsers",
//       label: "Inactive Users",
//       count: totalInActiveUsers,
//       icon: <FaUserTimes size={24} />,
//       bgColor: alpha("#6B7280", 0.1),
//       iconColor: "#6B7280",
//       onClick: () => navigate("/user?filter=inactive"),
//     },
//     {
//       key: "checkedInUsers",
//       label: "Checked In",
//       count: checkedInCount,
//       icon: <FaUserCheck size={24} />,
//       bgColor: alpha("#22C55E", 0.1),
//       iconColor: "#22C55E",
//       onClick: () => checkedInCount > 0 && navigate("/admin/live-locations"),
//     },
//     {
//       key: "checkedOutUsers",
//       label: "Checked Out",
//       count: checkedOutCount,
//       icon: <FaUserClock size={24} />,
//       bgColor: alpha("#F59E0B", 0.1),
//       iconColor: "#F59E0B",
//       onClick: () => navigate("/admin/reports"),
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
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
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         width: "100%",
//         overflowX: "hidden",
//         py: { xs: 2, sm: 3, md: 4 },
//         px: { xs: 1, sm: 2, md: 4 },
//       }}
//     >
//       {isRefreshing && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             bgcolor: "rgba(255, 255, 255, 0.8)",
//             backdropFilter: "blur(5px)",
//             zIndex: 999,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Loader
//             message="Refreshing data..."
//             subMessage="Please wait while we update your dashboard"
//             size={isMobile ? "small" : "medium"}
//           />
//         </Box>
//       )}

//       <Box
//         component={motion.main}
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         sx={{ width: '100%' }}
//       >
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           {/* Header Section */}
//           <Box
//             component={motion.div}
//             variants={itemVariants}
//             sx={{
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               mb: { xs: 3, sm: 4 },
//               gap: 2
//             }}
//           >
//             <Box>
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 color="#0f766e"
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 Admin Dashboard
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//               }}>
//                 Overview • Last updated {lastUpdated.toLocaleTimeString()}
//                 <IconButton
//                   size="small"
//                   sx={{
//                     ml: 1,
//                     bgcolor: alpha("#0f766e", 0.1),
//                     width: { xs: 24, sm: 28 },
//                     height: { xs: 24, sm: 28 },
//                     "&:hover": { bgcolor: alpha("#0f766e", 0.2) },
//                   }}
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                 >
//                   <RefreshIcon
//                     fontSize="small"
//                     sx={{
//                       color: "#0f766e",
//                       fontSize: { xs: 14, sm: 16 },
//                       animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
//                       '@keyframes spin': {
//                         '0%': { transform: 'rotate(0deg)' },
//                         '100%': { transform: 'rotate(360deg)' },
//                       },
//                     }}
//                   />
//                 </IconButton>
//               </Typography>
//             </Box>
//             <Chip
//               label="Admin"
//               size={isSmallMobile ? "small" : "medium"}
//               sx={{
//                 bgcolor: "#0f766e",
//                 color: "white",
//                 fontWeight: 600,
//                 px: { xs: 1.5, sm: 2 },
//                 py: { xs: 1.5, sm: 2.5 },
//                 fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
//                 height: { xs: 28, sm: 32, md: 36 },
//                 boxShadow: `0 10px 20px -5px ${alpha("#0f766e", 0.3)}`,
//               }}
//             />
//           </Box>

//           {/* Stats Cards with skeleton loader */}
//           <StatsCards stats={userStats} loading={isLoading} />

//           {/* Current Plan Section with skeleton loader */}
//           <CurrentPlan planData={planData} loading={isLoading} />

//           {/* Recent Activities with skeleton loader */}
//           <RecentActivities users={lastTrackedUsers} loading={isLoading} />
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;







// with new Skelaton Loader


// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton,
//   Container,
//   Divider,
//   LinearProgress,
//   Stack,
//   alpha,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   TrendingUp,
//   TrendingDown,
//   People as PeopleIcon,
//   LocationOn as LocationIcon,
//   Timeline as TimelineIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaUserCheck,
//   FaUserTimes,
//   FaUserClock,
// } from "react-icons/fa";
// import {
//   getAllUsers,
//   getUserById,
//   getLastFiveTrackedUsers,
//   getActiveUserLocations,
//   getUserCounts,
// } from "../../redux/slices/userSlice";
// import Loader from "../../components/common/Loader";
// import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

// // Stats Card Skeleton
// const StatsCardSkeleton = () => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 1.8, md: 2 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         height: '100%',
//         minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box sx={{ width: '60%' }}>
//           <Skeleton variant="text" width="70%" height={20} />
//           <Skeleton variant="text" width="90%" height={40} />
//         </Box>
//         <Skeleton variant="circular" width={44} height={44} />
//       </Box>
//     </Paper>
//   );
// };

// // Current Plan Skeleton
// const CurrentPlanSkeleton = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 2, sm: 2.5, md: 3 },
//         borderRadius: { xs: 3, sm: 3.5, md: 4 },
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         mb: { xs: 3, sm: 4 },
//         background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//       }}
//     >
//       {/* Header Skeleton */}
//       <Box sx={{ 
//         display: "flex", 
//         justifyContent: "space-between", 
//         alignItems: "center", 
//         mb: 2, 
//         pb: 2, 
//         borderBottom: "1px solid", 
//         borderColor: alpha("#e2e8f0", 0.5) 
//       }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={8} height={8} />
//           <Skeleton variant="text" width={100} height={24} />
//         </Box>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3 }} />
//       </Box>

//       {/* Description Skeleton */}
//       <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />

//       {/* Stats Grid Skeleton */}
//       <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: 2 }}>
//         {[1, 2, 3, 4].map((item) => (
//           <Grid item xs={6} md={3} key={item}>
//             <Box sx={{ p: 1 }}>
//               <Skeleton variant="text" width="50%" height={16} />
//               <Skeleton variant="text" width="70%" height={24} />
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       <Divider sx={{ my: 2 }} />

//       {/* Dates Skeleton */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={16} />
//           <Skeleton variant="text" width="60%" height={20} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={16} />
//           <Skeleton variant="text" width="60%" height={20} />
//         </Grid>
//       </Grid>

//       {/* Progress Skeleton */}
//       <Box sx={{ mb: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//           <Skeleton variant="text" width={100} height={16} />
//           <Skeleton variant="rounded" width={80} height={20} sx={{ borderRadius: 3 }} />
//         </Box>
//         <Skeleton variant="rounded" width="100%" height={6} sx={{ borderRadius: 3 }} />
//       </Box>

//       {/* User Limits Skeleton */}
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={16} />
//           <Skeleton variant="text" width="40%" height={28} />
//         </Grid>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={16} />
//           <Skeleton variant="text" width="40%" height={28} />
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Recent Activities Skeleton
// const RecentActivitiesSkeleton = () => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 2, sm: 2.5, md: 3 },
//         borderRadius: { xs: 3, sm: 3.5, md: 4 },
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Skeleton variant="text" width={150} height={32} />
//         <Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 3 }} />
//       </Box>

//       <Stack spacing={2}>
//         {[1, 2, 3, 4].map((item) => (
//           <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Skeleton variant="circular" width={48} height={48} />
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="40%" height={20} />
//               <Skeleton variant="text" width="60%" height={16} />
//             </Box>
//             <Skeleton variant="text" width={80} height={16} />
//           </Box>
//         ))}
//       </Stack>
//     </Paper>
//   );
// };

// const StatsCards = ({ stats, loading }) => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const getAvatarSize = () => {
//     if (isSmallMobile) return 32;
//     if (isMobile) return 36;
//     if (isTablet) return 40;
//     return 44;
//   };

//   const getFontSize = () => {
//     if (isSmallMobile) return '1.2rem';
//     if (isMobile) return '1.3rem';
//     if (isTablet) return '1.4rem';
//     return '1.6rem';
//   };

//   // Show skeletons when loading
//   if (loading) {
//     return (
//       <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
//         {[1, 2, 3, 4].map((_, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatsCardSkeleton />
//           </Grid>
//         ))}
//       </Grid>
//     );
//   }

//   return (
//     <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
//       {stats.map((stat, index) => (
//         <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <Paper
//               elevation={0}
//               onClick={() => stat.onClick?.(navigate)}
//               sx={{
//                 p: { xs: 1.5, sm: 1.8, md: 2 },
//                 borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//                 background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//                 border: "1px solid",
//                 borderColor: alpha(stat.iconColor, 0.2),
//                 cursor: stat.onClick ? "pointer" : "default",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 position: "relative",
//                 overflow: "hidden",
//                 height: '100%',
//                 minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 backdropFilter: "blur(10px)",
//                 "&::before": {
//                   content: '""',
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   height: "100%",
//                   background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
//                   zIndex: 0,
//                 },
//                 "&:hover": stat.onClick
//                   ? {
//                       transform: !isMobile ? "translateY(-4px) scale(1.02)" : "none",
//                       boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}` : "none",
//                       borderColor: stat.iconColor,
//                       "& .stat-icon": {
//                         transform: !isMobile ? "scale(1.1) rotate(5deg)" : "none",
//                       },
//                       "& .stat-value": {
//                         color: stat.iconColor,
//                       },
//                     }
//                   : {},
//               }}
//             >
//               <Box sx={{ position: "relative", zIndex: 1 }}>
//                 <Box sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexDirection: isSmallMobile ? "column" : "row",
//                   textAlign: isSmallMobile ? "center" : "left",
//                   gap: isSmallMobile ? 0.5 : 0,
//                 }}>
//                   <Box>
//                     <Typography
//                       variant="h4"
//                       fontWeight="700"
//                       className="stat-value"
//                       sx={{
//                         mb: 0.25,
//                         color: '#1e293b',
//                         transition: "color 0.3s ease",
//                         fontSize: getFontSize(),
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {stat.count}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         fontWeight: 500,
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' },
//                         whiteSpace: 'nowrap',
//                       }}
//                     >
//                       {stat.label}
//                     </Typography>
//                   </Box>
//                   <Avatar
//                     className="stat-icon"
//                     sx={{
//                       bgcolor: alpha(stat.iconColor, 0.1),
//                       color: stat.iconColor,
//                       width: getAvatarSize(),
//                       height: getAvatarSize(),
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       boxShadow: `0 8px 16px -5px ${alpha(stat.iconColor, 0.2)}`,
//                       '& svg': {
//                         fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' }
//                       }
//                     }}
//                   >
//                     {stat.icon}
//                   </Avatar>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   width: "100%",
//                   height: 3,
//                   background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
//                   opacity: 0.8,
//                 }}
//               />
//             </Paper>
//           </motion.div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// const CurrentPlan = ({ planData, loading }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <CurrentPlanSkeleton />;
//   }

//   if (!planData) return null;

//   const daysLeft = planExpiresIn(planData.expiresAt);

//   const calculateProgress = () => {
//     if (!planData.createdAt || !planData.expiresAt) return 0;
//     const created = new Date(planData.createdAt);
//     const expires = new Date(planData.expiresAt);
//     const today = new Date();
//     const totalDuration = expires - created;
//     const elapsed = today - created;
//     let progress = (elapsed / totalDuration) * 100;
//     return Math.min(Math.max(progress, 0), 100);
//   };

//   const progress = calculateProgress();

//   const getStatusColor = () => {
//     if (daysLeft <= 0) return "#ef4444";
//     if (daysLeft <= 7) return "#f59e0b";
//     return "#0f766e";
//   };

//   const statusColor = getStatusColor();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 2, sm: 2.5, md: 3 },
//           borderRadius: { xs: 3, sm: 3.5, md: 4 },
//           border: "1px solid",
//           borderColor: alpha(statusColor, 0.2),
//           mb: { xs: 3, sm: 4 },
//           background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//           boxShadow: `0 10px 30px -15px ${alpha(statusColor, 0.2)}`,
//         }}
//       >
//         {/* Header */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.5, sm: 2 },
//           pb: { xs: 1.5, sm: 2 },
//           borderBottom: "2px solid",
//           borderColor: alpha(statusColor, 0.1),
//           gap: { xs: 1, sm: 0 }
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Box
//               sx={{
//                 width: { xs: 6, sm: 8 },
//                 height: { xs: 6, sm: 8 },
//                 borderRadius: "50%",
//                 bgcolor: statusColor,
//                 animation: daysLeft <= 7 ? "pulse 2s infinite" : "none",
//                 "@keyframes pulse": {
//                   "0%": { opacity: 1, transform: "scale(1)" },
//                   "50%": { opacity: 0.5, transform: "scale(1.2)" },
//                   "100%": { opacity: 1, transform: "scale(1)" },
//                 },
//               }}
//             />
//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               fontWeight="700"
//               color="#0f766e"
//             >
//               Current Plan
//             </Typography>
//           </Box>
//           <Chip
//             label={daysLeft <= 0 ? "Expired" : daysLeft <= 7 ? "Expiring Soon" : "Active"}
//             size={isSmallMobile ? "small" : "small"}
//             sx={{
//               bgcolor: statusColor,
//               color: "white",
//               fontWeight: 600,
//               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//               height: { xs: 20, sm: 22, md: 24 },
//               px: 1,
//               boxShadow: `0 4px 10px -2px ${alpha(statusColor, 0.5)}`,
//             }}
//           />
//         </Box>

//         {/* Plan Description */}
//         <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Typography
//             variant={isMobile ? "h6" : "h5"}
//             fontWeight="700"
//             color="#1e293b"
//             gutterBottom
//             sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
//           >
//             {planData.description || "No Plan"}
//           </Typography>
//         </Box>

//         {/* Stats Grid */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Duration
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
//                 {planData.duration || "N/A"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Amount
//               </Typography>
//               <Typography variant="body2" fontWeight="700" sx={{ color: statusColor }}>
//                 ₹{planData.amount || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Currency
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
//                 {planData.currency || "INR"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Status
//               </Typography>
//               <Chip
//                 label={planData.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(planData.isActive ? "#0f766e" : "#6B7280", 0.1),
//                   color: planData.isActive ? "#0f766e" : "#6B7280",
//                   fontWeight: 600,
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   height: { xs: 18, sm: 20 },
//                   mt: 0.5,
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: { xs: 1.5, sm: 2 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

//         {/* Dates */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//               Created At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//               {formatDateDDMMYYYY(planData.createdAt)}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//               Expires At
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
//               <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//                 {formatDateDDMMYYYY(planData.expiresAt)}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Progress Section */}
//         {planData.expiresAt && (
//           <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
//                 Progress {Math.round(progress)}%
//               </Typography>
//               <Chip
//                 label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(statusColor, 0.1),
//                   color: statusColor,
//                   height: 20,
//                   fontSize: "0.65rem",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: { xs: 4, sm: 5, md: 6 },
//                 borderRadius: 3,
//                 bgcolor: alpha(statusColor, 0.1),
//                 "& .MuiLinearProgress-bar": {
//                   bgcolor: statusColor,
//                   borderRadius: 3,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* User Limits */}
//         <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Min Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
//                 {planData.minUser || planData.minUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 1, sm: 1.2, md: 1.5 },
//               borderRadius: 2,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
//                 Max Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
//                 {planData.maxUser || planData.maxUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </motion.div>
//   );
// };

// // RecentActivities Component
// const RecentActivities = ({ users, loading }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <RecentActivitiesSkeleton />;
//   }

//   if (!users || users.length === 0) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 3, sm: 4 },
//             borderRadius: { xs: 3, sm: 4 },
//             border: "1px solid",
//             borderColor: alpha("#0f766e", 0.1),
//             background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//             textAlign: "center",
//           }}
//         />
//       </motion.div>
//     );
//   }

//   const displayUsers = users.slice(0, 4);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 2, sm: 2.5, md: 3 },
//           borderRadius: { xs: 3, sm: 3.5, md: 4 },
//           border: "1px solid",
//           borderColor: alpha("#0f766e", 0.1),
//           background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 2, sm: 3 },
//           gap: 1
//         }}>
//           <Typography variant="h6" fontWeight="600" color="#0f766e">
//             Recent Activities
//           </Typography>
//           {users.length > 4 && (
//             <Chip
//               label={`View All (${users.length})`}
//               size={isSmallMobile ? "small" : "small"}
//               onClick={() => console.log("View all clicked")}
//               sx={{
//                 bgcolor: alpha("#0f766e", 0.1),
//                 color: "#0f766e",
//                 fontWeight: 500,
//                 cursor: "pointer",
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 height: { xs: 24, sm: 28 },
//                 "&:hover": {
//                   bgcolor: alpha("#0f766e", 0.2),
//                 },
//               }}
//             />
//           )}
//         </Box>

//         <Stack spacing={2}>
//           {displayUsers.map((activity, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 1.5, sm: 2 },
//                   borderRadius: { xs: 2, sm: 3 },
//                   bgcolor: alpha("#0f766e", 0.02),
//                   border: "1px solid",
//                   borderColor: alpha("#0f766e", 0.1),
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   textAlign: { xs: 'center', sm: 'left' },
//                   gap: { xs: 1, sm: 0 },
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.05),
//                     transform: !isMobile ? "translateX(4px)" : "none",
//                     borderColor: alpha("#0f766e", 0.3),
//                   },
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#0f766e", 0.2),
//                     color: "#0f766e",
//                     mr: { xs: 0, sm: 2 },
//                     mb: { xs: 0.5, sm: 0 },
//                     width: { xs: 40, sm: 48 },
//                     height: { xs: 40, sm: 48 },
//                     fontWeight: 600,
//                   }}
//                 >
//                   {activity.name?.charAt(0) || "U"}
//                 </Avatar>
//                 <Box sx={{ flex: 1, width: '100%' }}>
//                   <Typography variant="subtitle2" fontWeight="600" color="#1e293b">
//                     {activity.name || "Unknown User"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {activity.action || "No action"} • {activity.location || "Unknown location"}
//                   </Typography>
//                 </Box>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mt: { xs: 0.5, sm: 0 } }}>
//                   {activity.time || "N/A"}
//                 </Typography>
//               </Paper>
//             </motion.div>
//           ))}
//         </Stack>
//       </Paper>
//     </motion.div>
//   );
// };

// // Main AdminDashboard Component
// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const hasMounted = useRef(false);

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const [checkedInCount, setCheckedInCount] = useState(0);
//   const [checkedOutCount, setCheckedOutCount] = useState(0);
//   const [totalActiveUsers, setTotalActiveUsers] = useState(0);
//   const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [planData, setPlanData] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const userState = useSelector((state) => state.user || {});
//   const userData = userState.userInfo || {};
//   const lastTrackedUsers = userState.lastTrackedUsers || [];
//   const loading = userState.loading || false;

//   // Consolidated data fetching function
//   const fetchAllData = useCallback(async (isInitialLoad = false) => {
//     if (!userData?._id) {
//       console.log("No user ID available");
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       // Only set loading to true on initial load
//       if (isInitialLoad) {
//         setIsLoading(true);
//       }
      
//       console.log("Fetching data for user:", userData._id);
      
//       // Store the start time only on initial load
//       const startTime = isInitialLoad ? Date.now() : null;
      
//       // Fetch user data first
//       const userResult = await dispatch(getUserById(userData._id)).unwrap();
//       console.log("User API Result:", userResult);
      
//       // Extract plan data from the correct path
//       if (userResult?.user?.currentPaymentId?.addOns?.length > 0) {
//         const plan = userResult.user.currentPaymentId;
//         console.log("Plan data found:", plan);
        
//         setPlanData({
//           description: plan.description,
//           duration: plan.duration,
//           amount: plan.amount,
//           currency: plan.currency,
//           isActive: plan.isActive,
//           createdAt: plan.createdAt,
//           expiresAt: plan.expiresAt,
//           minUser: plan.minUser,
//           maxUser: plan.maxUser,
//         });
//       } else {
//         console.log("No plan data found in user result");
//         setPlanData(null);
//       }

//       // Fetch all other data in parallel
//       const [lastTrackedResult, locationsResult, countsResult, allUsersResult] = await Promise.all([
//         dispatch(getLastFiveTrackedUsers(userData._id)),
//         dispatch(getActiveUserLocations()),
//         dispatch(getUserCounts()),
//         dispatch(getAllUsers(userData._id))
//       ]);

//       // Process users data
//       if (allUsersResult.payload?.users) {
//         const users = allUsersResult.payload.users;
//         const today = new Date().toISOString().split("T")[0];

//         setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
//         setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
//         setTotalActiveUsers(users.filter(u => u.isActive).length);
//         setTotalInActiveUsers(users.filter(u => !u.isActive).length);
//         setTotalUsers(users.length);
//       }

//       setLastUpdated(new Date());
      
//       // Only apply the 1-second minimum delay on initial load
//       if (isInitialLoad && startTime) {
//         const fetchDuration = Date.now() - startTime;
//         const minLoadTime = 1000; // 1 second minimum
        
//         // If fetch took less than 1 second, wait the remaining time
//         if (fetchDuration < minLoadTime) {
//           await new Promise(resolve => setTimeout(resolve, minLoadTime - fetchDuration));
//         }
//       }
      
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       if (isInitialLoad) {
//         setIsLoading(false);
//       }
//     }
//   }, [dispatch, userData?._id]);

//   // Initial load - runs only once when component mounts
//   useEffect(() => {
//     if (!hasMounted.current) {
//       hasMounted.current = true;
      
//       if (userData?._id) {
//         fetchAllData(true); // Pass true for initial load
//       } else {
//         // Check localStorage for user data
//         const storedUser = localStorage.getItem('user');
//         console.log("Stored user from localStorage:", storedUser);
        
//         if (storedUser) {
//           try {
//             const parsedUser = JSON.parse(storedUser);
//             console.log("Parsed user:", parsedUser);
            
//             if (parsedUser?._id) {
//               // Dispatch to update Redux state
//               dispatch({ type: 'user/setUserInfo', payload: parsedUser });
//             } else {
//               setIsLoading(false);
//             }
//           } catch (e) {
//             console.error('Error parsing stored user:', e);
//             setIsLoading(false);
//           }
//         } else {
//           setIsLoading(false);
//         }
//       }
//     }
//   }, []); // Empty dependency array - truly runs only once

//   // This effect runs when userData._id is populated from localStorage
//   useEffect(() => {
//     if (userData?._id && hasMounted.current) {
//       fetchAllData(true); // Pass true for initial load
//     }
//   }, [userData?._id]);

//   // Focus effect - but without loading state
//   useEffect(() => {
//     const handleFocus = () => {
//       if (userData?._id) {
//         fetchAllData(false); // Pass false for refresh (no loading state)
//       }
//     };

//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [userData?._id, fetchAllData]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchAllData(false); // Pass false for refresh (no loading state)
//     setIsRefreshing(false);
//   };

//   const userStats = [
//     {
//       key: "activeUsers",
//       label: "Active Users",
//       count: totalActiveUsers,
//       icon: <FaUsers size={24} />,
//       bgColor: alpha("#3B82F6", 0.1),
//       iconColor: "#3B82F6",
//       onClick: () => navigate("/user?filter=active"),
//     },
//     {
//       key: "inactiveUsers",
//       label: "Inactive Users",
//       count: totalInActiveUsers,
//       icon: <FaUserTimes size={24} />,
//       bgColor: alpha("#6B7280", 0.1),
//       iconColor: "#6B7280",
//       onClick: () => navigate("/user?filter=inactive"),
//     },
//     {
//       key: "checkedInUsers",
//       label: "Checked In",
//       count: checkedInCount,
//       icon: <FaUserCheck size={24} />,
//       bgColor: alpha("#22C55E", 0.1),
//       iconColor: "#22C55E",
//       onClick: () => checkedInCount > 0 && navigate("/admin/live-locations"),
//     },
//     {
//       key: "checkedOutUsers",
//       label: "Checked Out",
//       count: checkedOutCount,
//       icon: <FaUserClock size={24} />,
//       bgColor: alpha("#F59E0B", 0.1),
//       iconColor: "#F59E0B",
//       onClick: () => navigate("/admin/reports"),
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
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
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         width: "100%",
//         overflowX: "hidden",
//         py: { xs: 2, sm: 3, md: 4 },
//         px: { xs: 1, sm: 2, md: 4 },
//       }}
//     >
//       {isRefreshing && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             bgcolor: "rgba(255, 255, 255, 0.8)",
//             backdropFilter: "blur(5px)",
//             zIndex: 999,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Loader
//             message="Refreshing data..."
//             subMessage="Please wait while we update your dashboard"
//             size={isMobile ? "small" : "medium"}
//           />
//         </Box>
//       )}

//       <Box
//         component={motion.main}
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         sx={{ width: '100%' }}
//       >
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           {/* Header Section - Always visible */}
//           <Box
//             component={motion.div}
//             variants={itemVariants}
//             sx={{
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               mb: { xs: 3, sm: 4 },
//               gap: 2
//             }}
//           >
//             <Box>
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 color="#0f766e"
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 Admin Dashboard
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//               }}>
//                 Overview • Last updated {lastUpdated.toLocaleTimeString()}
//                 <IconButton
//                   size="small"
//                   sx={{
//                     ml: 1,
//                     bgcolor: alpha("#0f766e", 0.1),
//                     width: { xs: 24, sm: 28 },
//                     height: { xs: 24, sm: 28 },
//                     "&:hover": { bgcolor: alpha("#0f766e", 0.2) },
//                   }}
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                 >
//                   <RefreshIcon
//                     fontSize="small"
//                     sx={{
//                       color: "#0f766e",
//                       fontSize: { xs: 14, sm: 16 },
//                       animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
//                       '@keyframes spin': {
//                         '0%': { transform: 'rotate(0deg)' },
//                         '100%': { transform: 'rotate(360deg)' },
//                       },
//                     }}
//                   />
//                 </IconButton>
//               </Typography>
//             </Box>
//             <Chip
//               label="Admin"
//               size={isSmallMobile ? "small" : "medium"}
//               sx={{
//                 bgcolor: "#0f766e",
//                 color: "white",
//                 fontWeight: 600,
//                 px: { xs: 1.5, sm: 2 },
//                 py: { xs: 1.5, sm: 2.5 },
//                 fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
//                 height: { xs: 28, sm: 32, md: 36 },
//                 boxShadow: `0 10px 20px -5px ${alpha("#0f766e", 0.3)}`,
//               }}
//             />
//           </Box>

//           {/* Stats Cards with skeleton loader - only shows on initial load */}
//           <StatsCards stats={userStats} loading={isLoading} />

//           {/* Current Plan Section with skeleton loader - only shows on initial load */}
//           <CurrentPlan planData={planData} loading={isLoading} />

//           {/* Recent Activities with skeleton loader - only shows on initial load */}
//           <RecentActivities users={lastTrackedUsers} loading={isLoading} />
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;









////////////////////////////// Change Color Theam/////////////////////////////////////

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Container,
  Divider,
  LinearProgress,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  TrendingUp,
  TrendingDown,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
} from "react-icons/fa";
import {
  getAllUsers,
  getUserById,
  getLastFiveTrackedUsers,
  getActiveUserLocations,
  getUserCounts,
} from "../../redux/slices/userSlice";
import Loader from "../../components/common/Loader";
import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

// Stats Card Skeleton
const StatsCardSkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 1.8, md: 2 },
        borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        border: "1px solid",
        borderColor: alpha("#2563EB", 0.1),
        height: '100%',
        minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ width: '60%' }}>
          <Skeleton variant="text" width="70%" height={20} />
          <Skeleton variant="text" width="90%" height={40} />
        </Box>
        <Skeleton variant="circular" width={44} height={44} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
      </Box>
    </Paper>
  );
};

// Current Plan Skeleton
const CurrentPlanSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: { xs: 3, sm: 3.5, md: 4 },
        border: "1px solid",
        borderColor: alpha("#2563EB", 0.1),
        mb: { xs: 3, sm: 4 },
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      {/* Header Skeleton */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 2, 
        pb: 2, 
        borderBottom: "1px solid", 
        borderColor: alpha("#2563EB", 0.1) 
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={8} height={8} sx={{ bgcolor: "#2563EB" }} />
          <Skeleton variant="text" width={100} height={24} />
        </Box>
        <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.3) }} />
      </Box>

      {/* Description Skeleton */}
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />

      {/* Stats Grid Skeleton */}
      <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: 2 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={6} md={3} key={item}>
            <Box sx={{ p: 1 }}>
              <Skeleton variant="text" width="50%" height={16} />
              <Skeleton variant="text" width="70%" height={24} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2, borderColor: alpha("#2563EB", 0.1) }} />

      {/* Dates Skeleton */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="60%" height={20} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="60%" height={20} />
        </Grid>
      </Grid>

      {/* Progress Skeleton */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="rounded" width={80} height={20} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.2) }} />
        </Box>
        <Skeleton variant="rounded" width="100%" height={6} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.2) }} />
      </Box>

      {/* User Limits Skeleton */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Skeleton variant="text" width="50%" height={16} />
          <Skeleton variant="text" width="40%" height={28} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" width="50%" height={16} />
          <Skeleton variant="text" width="40%" height={28} />
        </Grid>
      </Grid>
    </Paper>
  );
};

// Recent Activities Skeleton
const RecentActivitiesSkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: { xs: 3, sm: 3.5, md: 4 },
        border: "1px solid",
        borderColor: alpha("#2563EB", 0.1),
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Skeleton variant="text" width={150} height={32} />
        <Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.2) }} />
      </Box>

      <Stack spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="60%" height={16} />
            </Box>
            <Skeleton variant="text" width={80} height={16} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

const StatsCards = ({ stats, loading }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const getAvatarSize = () => {
    if (isSmallMobile) return 32;
    if (isMobile) return 36;
    if (isTablet) return 40;
    return 44;
  };

  const getFontSize = () => {
    if (isSmallMobile) return '1.2rem';
    if (isMobile) return '1.3rem';
    if (isTablet) return '1.4rem';
    return '1.6rem';
  };

  // Show skeletons when loading
  if (loading) {
    return (
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        {[1, 2, 3, 4].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5, lg: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Paper
              elevation={0}
              onClick={() => stat.onClick?.(navigate)}
              sx={{
                p: { xs: 1.5, sm: 1.8, md: 2 },
                borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                border: "1px solid",
                borderColor: alpha(stat.iconColor, 0.2),
                cursor: stat.onClick ? "pointer" : "default",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                height: '100%',
                minHeight: { xs: 90, sm: 95, md: 100, lg: 105 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backdropFilter: "blur(10px)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "100%",
                  background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
                  zIndex: 0,
                },
                "&:hover": stat.onClick
                  ? {
                      transform: !isMobile ? "translateY(-4px) scale(1.02)" : "none",
                      boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}` : "none",
                      borderColor: stat.iconColor,
                      "& .stat-icon": {
                        transform: !isMobile ? "scale(1.1) rotate(5deg)" : "none",
                      },
                      "& .stat-value": {
                        color: stat.iconColor,
                      },
                    }
                  : {},
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: isSmallMobile ? "column" : "row",
                  textAlign: isSmallMobile ? "center" : "left",
                  gap: isSmallMobile ? 0.5 : 0,
                }}>
                  <Box>
                    <Typography
                      variant="h4"
                      fontWeight="700"
                      className="stat-value"
                      sx={{
                        mb: 0.25,
                        color: '#1e293b',
                        transition: "color 0.3s ease",
                        fontSize: getFontSize(),
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.count}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' },
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                  <Avatar
                    className="stat-icon"
                    sx={{
                      bgcolor: alpha(stat.iconColor, 0.1),
                      color: stat.iconColor,
                      width: getAvatarSize(),
                      height: getAvatarSize(),
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: `0 8px 16px -5px ${alpha(stat.iconColor, 0.2)}`,
                      '& svg': {
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' }
                      }
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 3,
                  background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
                  opacity: 0.8,
                }}
              />
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

const CurrentPlan = ({ planData, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  if (loading) {
    return <CurrentPlanSkeleton />;
  }

  if (!planData) return null;

  const daysLeft = planExpiresIn(planData.expiresAt);

  const calculateProgress = () => {
    if (!planData.createdAt || !planData.expiresAt) return 0;
    const created = new Date(planData.createdAt);
    const expires = new Date(planData.expiresAt);
    const today = new Date();
    const totalDuration = expires - created;
    const elapsed = today - created;
    let progress = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const progress = calculateProgress();

  const getStatusColor = () => {
    if (daysLeft <= 0) return "#ef4444";
    if (daysLeft <= 7) return "#f59e0b";
    return "#2563EB";
  };

  const statusColor = getStatusColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: { xs: 3, sm: 3.5, md: 4 },
          border: "1px solid",
          borderColor: alpha(statusColor, 0.2),
          mb: { xs: 3, sm: 4 },
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: `0 10px 30px -15px ${alpha(statusColor, 0.2)}`,
        }}
      >
        {/* Header */}
        <Box sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: "space-between",
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: { xs: 1.5, sm: 2 },
          pb: { xs: 1.5, sm: 2 },
          borderBottom: "2px solid",
          borderColor: alpha(statusColor, 0.1),
          gap: { xs: 1, sm: 0 }
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: { xs: 6, sm: 8 },
                height: { xs: 6, sm: 8 },
                borderRadius: "50%",
                bgcolor: statusColor,
                animation: daysLeft <= 7 ? "pulse 2s infinite" : "none",
                "@keyframes pulse": {
                  "0%": { opacity: 1, transform: "scale(1)" },
                  "50%": { opacity: 0.5, transform: "scale(1.2)" },
                  "100%": { opacity: 1, transform: "scale(1)" },
                },
              }}
            />
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight="700"
              sx={{ color: "#2563EB" }}
            >
              Current Plan
            </Typography>
          </Box>
          <Chip
            label={daysLeft <= 0 ? "Expired" : daysLeft <= 7 ? "Expiring Soon" : "Active"}
            size={isSmallMobile ? "small" : "small"}
            sx={{
              bgcolor: statusColor,
              color: "white",
              fontWeight: 600,
              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
              height: { xs: 20, sm: 22, md: 24 },
              px: 1,
              boxShadow: `0 4px 10px -2px ${alpha(statusColor, 0.5)}`,
            }}
          />
        </Box>

        {/* Plan Description */}
        <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="700"
            sx={{ color: '#1e293b' }}
            gutterBottom
            sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
          >
            {planData.description || "No Plan"}
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 1, sm: 1.2, md: 1.5 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
                Duration
              </Typography>
              <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
                {planData.duration || "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 1, sm: 1.2, md: 1.5 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
                Amount
              </Typography>
              <Typography variant="body2" fontWeight="700" sx={{ color: statusColor }}>
                ₹{planData.amount || "0"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 1, sm: 1.2, md: 1.5 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
                Currency
              </Typography>
              <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b' }}>
                {planData.currency || "INR"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 1, sm: 1.2, md: 1.5 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
                Status
              </Typography>
              <Chip
                label={planData.isActive ? "Active" : "Inactive"}
                size="small"
                sx={{
                  bgcolor: alpha(planData.isActive ? "#2563EB" : "#6B7280", 0.1),
                  color: planData.isActive ? "#2563EB" : "#6B7280",
                  fontWeight: 600,
                  fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                  height: { xs: 18, sm: 20 },
                  mt: 0.5,
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 1.5, sm: 2 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

        {/* Dates */}
        <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
              Created At
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
              {formatDateDDMMYYYY(planData.createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
              Expires At
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
                {formatDateDDMMYYYY(planData.expiresAt)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Progress Section */}
        {planData.expiresAt && (
          <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                Progress {Math.round(progress)}%
              </Typography>
              <Chip
                label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
                size="small"
                sx={{
                  bgcolor: alpha(statusColor, 0.1),
                  color: statusColor,
                  height: 20,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                }}
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: { xs: 4, sm: 5, md: 6 },
                borderRadius: 3,
                bgcolor: alpha(statusColor, 0.1),
                "& .MuiLinearProgress-bar": {
                  bgcolor: statusColor,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}

        {/* User Limits */}
        <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
          <Grid item xs={6}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.05),
              p: { xs: 1, sm: 1.2, md: 1.5 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.15),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
                Min Users
              </Typography>
              <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
                {planData.minUser || planData.minUsers || "0"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.05),
              p: { xs: 1, sm: 1.2, md: 1.5 },
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.15),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontWeight: 500 }}>
                Max Users
              </Typography>
              <Typography variant={isSmallMobile ? "body1" : "h6"} fontWeight="700" sx={{ color: statusColor }}>
                {planData.maxUser || planData.maxUsers || "0"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

// RecentActivities Component
const RecentActivities = ({ users, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  if (loading) {
    return <RecentActivitiesSkeleton />;
  }

  if (!users || users.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: { xs: 3, sm: 4 },
            border: "1px solid",
            borderColor: alpha("#2563EB", 0.1),
            background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
            textAlign: "center",
          }}
        />
      </motion.div>
    );
  }

  const displayUsers = users.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: { xs: 3, sm: 3.5, md: 4 },
          border: "1px solid",
          borderColor: alpha("#2563EB", 0.1),
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: "space-between",
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: { xs: 2, sm: 3 },
          gap: 1
        }}>
          <Typography variant="h6" fontWeight="600" sx={{ color: "#2563EB" }}>
            Recent Activities
          </Typography>
          {users.length > 4 && (
            <Chip
              label={`View All (${users.length})`}
              size={isSmallMobile ? "small" : "small"}
              onClick={() => console.log("View all clicked")}
              sx={{
                bgcolor: alpha("#2563EB", 0.1),
                color: "#2563EB",
                fontWeight: 500,
                cursor: "pointer",
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                height: { xs: 24, sm: 28 },
                "&:hover": {
                  bgcolor: alpha("#2563EB", 0.2),
                },
              }}
            />
          )}
        </Box>

        <Stack spacing={2}>
          {displayUsers.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: { xs: 2, sm: 3 },
                  bgcolor: alpha("#2563EB", 0.02),
                  border: "1px solid",
                  borderColor: alpha("#2563EB", 0.1),
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' },
                  gap: { xs: 1, sm: 0 },
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: alpha("#2563EB", 0.05),
                    transform: !isMobile ? "translateX(4px)" : "none",
                    borderColor: alpha("#2563EB", 0.3),
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha("#2563EB", 0.2),
                    color: "#2563EB",
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 0.5, sm: 0 },
                    width: { xs: 40, sm: 48 },
                    height: { xs: 40, sm: 48 },
                    fontWeight: 600,
                  }}
                >
                  {activity.name?.charAt(0) || "U"}
                </Avatar>
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#1e293b' }}>
                    {activity.name || "Unknown User"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.action || "No action"} • {activity.location || "Unknown location"}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, mt: { xs: 0.5, sm: 0 } }}>
                  {activity.time || "N/A"}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Stack>
      </Paper>
    </motion.div>
  );
};

// Main AdminDashboard Component
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const hasMounted = useRef(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [planData, setPlanData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userState = useSelector((state) => state.user || {});
  const userData = userState.userInfo || {};
  const lastTrackedUsers = userState.lastTrackedUsers || [];
  const loading = userState.loading || false;

  // Consolidated data fetching function
  const fetchAllData = useCallback(async (isInitialLoad = false) => {
    if (!userData?._id) {
      console.log("No user ID available");
      setIsLoading(false);
      return;
    }
    
    try {
      // Only set loading to true on initial load
      if (isInitialLoad) {
        setIsLoading(true);
      }
      
      console.log("Fetching data for user:", userData._id);
      
      // Store the start time only on initial load
      const startTime = isInitialLoad ? Date.now() : null;
      
      // Fetch user data first
      const userResult = await dispatch(getUserById(userData._id)).unwrap();
      console.log("User API Result:", userResult);
      
      // Extract plan data from the correct path
      if (userResult?.user?.currentPaymentId?.addOns?.length > 0) {
        const plan = userResult.user.currentPaymentId;
        console.log("Plan data found:", plan);
        
        setPlanData({
          description: plan.description,
          duration: plan.duration,
          amount: plan.amount,
          currency: plan.currency,
          isActive: plan.isActive,
          createdAt: plan.createdAt,
          expiresAt: plan.expiresAt,
          minUser: plan.minUser,
          maxUser: plan.maxUser,
        });
      } else {
        console.log("No plan data found in user result");
        setPlanData(null);
      }

      // Fetch all other data in parallel
      const [lastTrackedResult, locationsResult, countsResult, allUsersResult] = await Promise.all([
        dispatch(getLastFiveTrackedUsers(userData._id)),
        dispatch(getActiveUserLocations()),
        dispatch(getUserCounts()),
        dispatch(getAllUsers(userData._id))
      ]);

      // Process users data
      if (allUsersResult.payload?.users) {
        const users = allUsersResult.payload.users;
        const today = new Date().toISOString().split("T")[0];

        setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
        setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
        setTotalActiveUsers(users.filter(u => u.isActive).length);
        setTotalInActiveUsers(users.filter(u => !u.isActive).length);
        setTotalUsers(users.length);
      }

      setLastUpdated(new Date());
      
      // Only apply the 1-second minimum delay on initial load
      if (isInitialLoad && startTime) {
        const fetchDuration = Date.now() - startTime;
        const minLoadTime = 1000; // 1 second minimum
        
        // If fetch took less than 1 second, wait the remaining time
        if (fetchDuration < minLoadTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadTime - fetchDuration));
        }
      }
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }
  }, [dispatch, userData?._id]);

  // Initial load - runs only once when component mounts
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      
      if (userData?._id) {
        fetchAllData(true); // Pass true for initial load
      } else {
        // Check localStorage for user data
        const storedUser = localStorage.getItem('user');
        console.log("Stored user from localStorage:", storedUser);
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            console.log("Parsed user:", parsedUser);
            
            if (parsedUser?._id) {
              // Dispatch to update Redux state
              dispatch({ type: 'user/setUserInfo', payload: parsedUser });
            } else {
              setIsLoading(false);
            }
          } catch (e) {
            console.error('Error parsing stored user:', e);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      }
    }
  }, []); // Empty dependency array - truly runs only once

  // This effect runs when userData._id is populated from localStorage
  useEffect(() => {
    if (userData?._id && hasMounted.current) {
      fetchAllData(true); // Pass true for initial load
    }
  }, [userData?._id]);

  // Focus effect - but without loading state
  useEffect(() => {
    const handleFocus = () => {
      if (userData?._id) {
        fetchAllData(false); // Pass false for refresh (no loading state)
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [userData?._id, fetchAllData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAllData(false); // Pass false for refresh (no loading state)
    setIsRefreshing(false);
  };

  const userStats = [
    {
      key: "activeUsers",
      label: "Active Users",
      count: totalActiveUsers,
      icon: <FaUsers size={24} />,
      bgColor: alpha("#2563EB", 0.1),
      iconColor: "#2563EB",
      onClick: () => navigate("/user?filter=active"),
    },
    {
      key: "inactiveUsers",
      label: "Inactive Users",
      count: totalInActiveUsers,
      icon: <FaUserTimes size={24} />,
      bgColor: alpha("#6B7280", 0.1),
      iconColor: "#6B7280",
      onClick: () => navigate("/user?filter=inactive"),
    },
    {
      key: "checkedInUsers",
      label: "Checked In",
      count: checkedInCount,
      icon: <FaUserCheck size={24} />,
      bgColor: alpha("#2563EB", 0.1),
      iconColor: "#2563EB",
      onClick: () => checkedInCount > 0 && navigate("/admin/live-locations"),
    },
    {
      key: "checkedOutUsers",
      label: "Checked Out",
      count: checkedOutCount,
      icon: <FaUserClock size={24} />,
      bgColor: alpha("#2563EB", 0.1),
      iconColor: "#2563EB",
      onClick: () => navigate("/admin/reports"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        width: "100%",
        overflowX: "hidden",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      {isRefreshing && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader
            message="Refreshing data..."
            subMessage="Please wait while we update your dashboard"
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      )}

      <Box
        component={motion.main}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{ width: '100%' }}
      >
        <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
          {/* Header Section - Always visible */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: { xs: 3, sm: 4 },
              gap: 2
            }}
          >
            <Box>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="800"
                gutterBottom
                sx={{
                  background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                }}
              >
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
              }}>
                Overview • Last updated {lastUpdated.toLocaleTimeString()}
                <IconButton
                  size="small"
                  sx={{
                    ml: 1,
                    bgcolor: alpha("#2563EB", 0.1),
                    width: { xs: 24, sm: 28 },
                    height: { xs: 24, sm: 28 },
                    "&:hover": { bgcolor: alpha("#2563EB", 0.2) },
                  }}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshIcon
                    fontSize="small"
                    sx={{
                      color: "#2563EB",
                      fontSize: { xs: 14, sm: 16 },
                      animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }}
                  />
                </IconButton>
              </Typography>
            </Box>
            <Chip
              label="Admin"
              size={isSmallMobile ? "small" : "medium"}
              sx={{
                background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                color: "white",
                fontWeight: 600,
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2.5 },
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' },
                height: { xs: 28, sm: 32, md: 36 },
                boxShadow: `0 10px 20px -5px ${alpha("#2563EB", 0.3)}`,
              }}
            />
          </Box>

          {/* Stats Cards with skeleton loader - only shows on initial load */}
          <StatsCards stats={userStats} loading={isLoading} />

          {/* Current Plan Section with skeleton loader - only shows on initial load */}
          <CurrentPlan planData={planData} loading={isLoading} />

          {/* Recent Activities with skeleton loader - only shows on initial load */}
          <RecentActivities users={lastTrackedUsers} loading={isLoading} />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;