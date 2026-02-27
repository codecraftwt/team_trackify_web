// import React, { useEffect, useState } from "react";
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

// // StatsCards Component
// const StatsCards = ({ stats }) => {
//   const navigate = useNavigate();

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <Grid container spacing={3} sx={{ mb: 4 }}>
//       {stats.map((stat, index) => (
//         <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
//           <motion.div variants={itemVariants}>
//             <Paper
//               elevation={0}
//               onClick={() => stat.onClick?.(navigate)}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 border: "1px solid #e0e0e0",
//                 cursor: stat.onClick ? "pointer" : "default",
//                 transition: "all 0.3s ease",
//                 position: "relative",
//                 overflow: "hidden",
//                 "&:hover": stat.onClick
//                   ? {
//                       boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                       transform: "translateY(-2px)",
//                       borderColor: stat.iconColor,
//                       "& .stat-icon": {
//                         transform: "scale(1.1)",
//                       },
//                     }
//                   : {},
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <Box>
//                   <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, color: '#0f766e' }}>
//                     {stat.count}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {stat.label}
//                   </Typography>
//                 </Box>
//                 <Avatar
//                   className="stat-icon"
//                   sx={{
//                     bgcolor: stat.bgColor,
//                     color: stat.iconColor,
//                     width: 56,
//                     height: 56,
//                     transition: "transform 0.3s ease",
//                   }}
//                 >
//                   {stat.icon}
//                 </Avatar>
//               </Box>
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 0,
//                   left: 0,
//                   width: "100%",
//                   height: 4,
//                   bgcolor: stat.iconColor,
//                   opacity: 0.5,
//                 }}
//               />
//             </Paper>
//           </motion.div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// // CurrentPlan Component - Will fetch from API
// const CurrentPlan = ({ planData }) => {
//   if (!planData) return null;

//   return (
//    <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5, delay: 0.2 }}
// >
//   <Paper
//     elevation={0}
//     sx={{
//       p: 2.5,
//       borderRadius: 2,
//       border: "1px solid #e0e0e0",
//       mb: 3,
//       background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
//     }}
//   >
//     {/* Header with better spacing */}
//     <Box sx={{ 
//       display: "flex", 
//       justifyContent: "space-between", 
//       alignItems: "center", 
//       mb: 1.5,
//       pb: 1,
//       borderBottom: "1px dashed #e0e0e0"
//     }}>
//       <Typography variant="subtitle1" fontWeight="600" color="#0f766e" sx={{ letterSpacing: 0.5 }}>
//         Current Plan
//       </Typography>
//       <Chip
//         label={planData.status || "Active"}
//         size="small"
//         sx={{
//           bgcolor: "#22c55e",
//           color: "white",
//           fontWeight: 600,
//           fontSize: "0.7rem",
//           height: 20,
//         }}
//       />
//     </Box>

//     {/* Plan Name and Description - More compact */}
//     <Box sx={{ mb: 1.5 }}>
//       <Typography variant="body1" fontWeight="600" color="#1e293b" sx={{ fontSize: '1rem' }}>
//         {planData.name || "No Plan"}
//       </Typography>
//       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//         {planData.description || "No description"}
//       </Typography>
//     </Box>

//     {/* Stats Grid - Reduced spacing */}
//     <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//       <Grid item xs={6} md={3}>
//         <Box sx={{ bgcolor: "#f8fafc", p: 1, borderRadius: 1 }}>
//           <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//             Duration
//           </Typography>
//           <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
//             {planData.duration || "N/A"}
//           </Typography>
//         </Box>
//       </Grid>
//       <Grid item xs={6} md={3}>
//         <Box sx={{ bgcolor: "#f8fafc", p: 1, borderRadius: 1 }}>
//           <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//             Amount
//           </Typography>
//           <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem', color: "#0f766e" }}>
//             {planData.amount || "N/A"}
//           </Typography>
//         </Box>
//       </Grid>
//       <Grid item xs={6} md={3}>
//         <Box sx={{ bgcolor: "#f8fafc", p: 1, borderRadius: 1 }}>
//           <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//             Currency
//           </Typography>
//           <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
//             {planData.currency || "INR"}
//           </Typography>
//         </Box>
//       </Grid>
//       <Grid item xs={6} md={3}>
//         <Box sx={{ bgcolor: "#f8fafc", p: 1, borderRadius: 1 }}>
//           <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//             Status
//           </Typography>
//           <Chip
//             label={planData.status || "Active"}
//             size="small"
//             sx={{
//               bgcolor: "#22c55e20",
//               color: "#22c55e",
//               fontWeight: 600,
//               fontSize: "0.65rem",
//               height: 18,
//               mt: 0.5,
//             }}
//           />
//         </Box>
//       </Grid>
//     </Grid>

//     <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />

//     {/* Dates - Compact */}
//     <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//       <Grid item xs={6}>
//         <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//           Created At
//         </Typography>
//         <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.8rem' }}>
//           {planData.createdAt ? new Date(planData.createdAt).toLocaleDateString() : "N/A"}
//         </Typography>
//       </Grid>
//       <Grid item xs={6}>
//         <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//           Expires At
//         </Typography>
//         <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.8rem' }}>
//           {planData.expiresAt ? new Date(planData.expiresAt).toLocaleDateString() : "N/A"}
//         </Typography>
//       </Grid>
//     </Grid>

//     {/* Progress Section - Only if daysLeft exists */}
//     {planData.daysLeft && (
//       <Box sx={{ mb: 1.5 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//           <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//             Days Left
//           </Typography>
//           <Typography variant="caption" fontWeight="bold" color="#0f766e" sx={{ fontSize: '0.7rem' }}>
//             {planData.daysLeft} days
//           </Typography>
//         </Box>
//         <LinearProgress
//           variant="determinate"
//           value={planData.progress || 0}
//           sx={{
//             height: 4,
//             borderRadius: 2,
//             bgcolor: "#e0e0e0",
//             "& .MuiLinearProgress-bar": {
//               bgcolor: "#0f766e",
//               borderRadius: 2,
//             },
//           }}
//         />
//       </Box>
//     )}

//     {/* User Limits - Compact */}
//     <Grid container spacing={1.5}>
//       <Grid item xs={6}>
//         <Box sx={{ bgcolor: "#f1f5f9", p: 1, borderRadius: 1 }}>
//           <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//             Min Users
//           </Typography>
//           <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.9rem', color: "#0f766e" }}>
//             {planData.minUsers || "0"}
//           </Typography>
//         </Box>
//       </Grid>
//       <Grid item xs={6}>
//         <Box sx={{ bgcolor: "#f1f5f9", p: 1, borderRadius: 1 }}>
//           <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem' }}>
//             Max Users
//           </Typography>
//           <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.9rem', color: "#0f766e" }}>
//             {planData.maxUsers || "0"}
//           </Typography>
//         </Box>
//       </Grid>
//     </Grid>
//   </Paper>
// </motion.div>
//   );
// };

// // RecentActivities Component - Uses API data
// const RecentActivities = ({ users }) => {
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
//             p: 3,
//             borderRadius: 3,
//             border: "1px solid #e0e0e0",
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//             <Typography variant="h6" fontWeight="600" color="#0f766e">
//               Recent Activities
//             </Typography>
//             <Typography 
//               variant="body2" 
//               color="primary" 
//               sx={{ cursor: "pointer", fontWeight: 500 }}
//             >
//               View All
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="body1" color="text.secondary" gutterBottom>
//               No recent activity
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Users will appear here when they check in or out
//             </Typography>
//           </Box>
//         </Paper>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           border: "1px solid #e0e0e0",
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Typography variant="h6" fontWeight="600" color="#0f766e">
//             Recent Activities
//           </Typography>
//           <Typography 
//             variant="body2" 
//             color="primary" 
//             sx={{ cursor: "pointer", fontWeight: 500 }}
//           >
//             View All
//           </Typography>
//         </Box>

//         <Stack spacing={2}>
//           {users.map((activity, index) => (
//             <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
//               <Avatar 
//                 sx={{ 
//                   bgcolor: "#0f766e", 
//                   mr: 2, 
//                   width: 40, 
//                   height: 40 
//                 }}
//               >
//                 {activity.name?.charAt(0) || "U"}
//               </Avatar>
//               <Box sx={{ flex: 1 }}>
//                 <Typography variant="subtitle2" fontWeight="600">
//                   {activity.name || "Unknown User"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {activity.action || "No action"} • {activity.location || "Unknown location"}
//                 </Typography>
//               </Box>
//               <Typography variant="caption" color="text.secondary">
//                 {activity.time || "N/A"}
//               </Typography>
//             </Box>
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

//   const [checkedInCount, setCheckedInCount] = useState(0);
//   const [checkedOutCount, setCheckedOutCount] = useState(0);
//   const [totalActiveUsers, setTotalActiveUsers] = useState(0);
//   const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [planData, setPlanData] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Safe Redux state access
//   const userState = useSelector((state) => state.user || {});
//   const userData = userState.userInfo || {};
//   const lastTrackedUsers = userState.lastTrackedUsers || [];
//   const loading = userState.loading || false;
//   const lastTrackedUsersLoading = userState.lastTrackedUsersLoading || false;
//   const userCounts = userState.userCounts || {};

//   useEffect(() => {
//     if (userData?._id) {
//       dispatch(getUserById(userData._id));
//       dispatch(getLastFiveTrackedUsers(userData._id));
//       dispatch(getActiveUserLocations());
//       dispatch(getUserCounts());
//     }
//   }, [dispatch, userData?._id]);

//   useEffect(() => {
//     if (userData?._id) {
//       dispatch(getAllUsers(userData._id)).then((response) => {
//         const users = response.payload?.users || [];

//         const today = new Date().toISOString().split("T")[0];

//         const checkedOutUsers = users.filter(
//           (user) => user.status === "0" && user.updatedAt?.split("T")[0] === today
//         );
//         const checkedInUsers = users.filter(
//           (user) => user.status === "1" && user.updatedAt?.split("T")[0] === today
//         );

//         setCheckedOutCount(checkedOutUsers.length);
//         setCheckedInCount(checkedInUsers.length);

//         const activeUsers = users.filter((user) => user.isActive === true);
//         const inactiveUsers = users.filter((user) => user.isActive === false);

//         setTotalActiveUsers(activeUsers.length);
//         setTotalInActiveUsers(inactiveUsers.length);
//         setTotalUsers(users.length);
//       });
//     }
//   }, [dispatch, userData?._id]);

//   // Fetch plan data
//   useEffect(() => {
//     if (userData?.currentPaymentId) {
//       // Replace with actual API call to fetch plan details
//       // For now using mock structure but will be replaced with API data
//       const fetchPlanData = async () => {
//         try {
//           // const response = await api.get(`/plans/${userData.currentPaymentId}`);
//           // setPlanData(response.data);
          
//           // Placeholder - replace with actual API call
//           setPlanData({
//             name: "Enterprise Plan",
//             description: "Full access to all features",
//             duration: "Yearly",
//             amount: "₹24000",
//             currency: "INR",
//             status: "Active",
//             createdAt: "2026-01-15",
//             expiresAt: "2027-01-15",
//             daysLeft: 320,
//             minUsers: 10,
//             maxUsers: 100,
//             progress: 12,
//           });
//         } catch (error) {
//           console.error("Failed to fetch plan data:", error);
//         }
//       };
//       fetchPlanData();
//     }
//   }, [userData?.currentPaymentId]);

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     setLastUpdated(new Date());
    
//     // Refresh all data
//     Promise.all([
//       dispatch(getAllUsers(userData._id)),
//       dispatch(getLastFiveTrackedUsers(userData._id)),
//       dispatch(getActiveUserLocations()),
//       dispatch(getUserCounts()),
//     ]).finally(() => {
//       setIsRefreshing(false);
//     });
//   };

//   // Calculate percentage changes from userCounts
//   const percentageCards = [
//     { label: 'Team Growth', value: userCounts.teamGrowth || '+0%', trend: 'up', color: '#4caf50' },
//     { label: 'Live Locations', value: userCounts.locationGrowth || '+0%', trend: 'up', color: '#4caf50' },
//     { label: 'Coverage', value: userCounts.coverage || '+0%', trend: 'up', color: '#4caf50' },
//     { label: 'Response Time', value: userCounts.responseTime || '0%', trend: 'down', color: '#f44336' },
//   ];

//   // Main metric cards from API data
//   const metricCards = [
//     { 
//       value: totalUsers || userCounts.totalUsers || 0, 
//       label: 'Total Team Members', 
//       icon: <PeopleIcon />, 
//       color: '#2196f3' 
//     },
//     { 
//       value: userCounts.liveLocations || 0, 
//       label: 'Live Locations', 
//       icon: <LocationIcon />, 
//       color: '#ff9800' 
//     },
//     { 
//       value: userCounts.totalDistance ? `${userCounts.totalDistance} km` : '0 km', 
//       label: 'Total Distance', 
//       icon: <TimelineIcon />, 
//       color: '#9c27b0' 
//     },
//     { 
//       value: userCounts.avgResponseTime ? `${userCounts.avgResponseTime} min` : '0 min', 
//       label: 'Avg Response Time', 
//       icon: <TimelineIcon />, 
//       color: '#f44336' 
//     },
//   ];

//   const userStats = [
//     {
//       key: "activeUsers",
//       label: "Active Users",
//       count: totalActiveUsers,
//       icon: <FaUsers size={24} />,
//       bgColor: "rgba(59, 130, 246, 0.1)",
//       iconColor: "#3B82F6",
//       onClick: () => navigate("/user?filter=active"),
//     },
//     {
//       key: "inactiveUsers",
//       label: "Inactive Users",
//       count: totalInActiveUsers,
//       icon: <FaUserTimes size={24} />,
//       bgColor: "rgba(107, 114, 128, 0.1)",
//       iconColor: "#6B7280",
//       onClick: () => navigate("/user?filter=inactive"),
//     },
//     {
//       key: "checkedInUsers",
//       label: "Checked In",
//       count: checkedInCount,
//       icon: <FaUserCheck size={24} />,
//       bgColor: "rgba(34, 197, 94, 0.1)",
//       iconColor: "#22C55E",
//       onClick: () => navigate("/admin/live-locations"),
//     },
//     {
//       key: "checkedOutUsers",
//       label: "Checked Out",
//       count: checkedOutCount,
//       icon: <FaUserClock size={24} />,
//       bgColor: "rgba(245, 158, 11, 0.1)",
//       iconColor: "#F59E0B",
//       onClick: () => navigate("/admin/reports"),
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
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

//   // Show main loading state
//   if (loading && !userData._id) {
//     return (
//       <Loader 
//         message="Loading Dashboard..." 
//         subMessage="Fetching your team data and tracking information"
//         fullScreen={true}
//         size="large"
//       />
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "#f8fafc",
//         width: "100%",
//         overflowX: "hidden",
//         position: "relative",
//       }}
//     >
//       {/* Show refresh loader overlay when refreshing */}
//       {isRefreshing && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             bgcolor: "rgba(255, 255, 255, 0.7)",
//             backdropFilter: "blur(3px)",
//             zIndex: 999,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Loader 
//             message="Refreshing data..." 
//             subMessage="Please wait while we update your dashboard"
//             size="medium"
//           />
//         </Box>
//       )}

//       {/* Show loading overlay for recent activities */}
//       {lastTrackedUsersLoading && (
//         <Box
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             right: 20,
//             zIndex: 1000,
//             bgcolor: "white",
//             borderRadius: 2,
//             boxShadow: 3,
//             p: 1,
//           }}
//         >
//           <Loader 
//             message="Updating activities..." 
//             size="small"
//           />
//         </Box>
//       )}

//       <Box
//         component={motion.main}
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         sx={{ py: 4, px: { xs: 2, md: 4 } }}
//       >
//         <Container maxWidth="xl">
//           {/* Header Section */}
//           <Box
//             component={motion.div}
//             variants={itemVariants}
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 4,
//             }}
//           >
//             <Box>
//               <Typography variant="h4" fontWeight="bold" color="#0f766e" gutterBottom>
//                 Admin Dashboard
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Overview • Last updated {lastUpdated.toLocaleTimeString()}
//                 <IconButton 
//                   size="small" 
//                   sx={{ ml: 1 }} 
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                 >
//                   <RefreshIcon 
//                     fontSize="small" 
//                     sx={{ 
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
//               size="small"
//               sx={{
//                 bgcolor: "#0f766e",
//                 color: "white",
//                 fontWeight: 500,
//               }}
//             />
//           </Box>

//           {/* Percentage Change Cards - From API */}
//           <Grid container spacing={2} sx={{ mb: 3 }}>
//             {percentageCards.map((card, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <motion.div variants={itemVariants}>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       border: "1px solid #e0e0e0",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                         transform: "translateY(-2px)",
//                       },
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                       <Typography variant="body2" color="text.secondary">
//                         {card.label}
//                       </Typography>
//                       {card.trend === "up" ? (
//                         <TrendingUp sx={{ color: card.color }} />
//                       ) : (
//                         <TrendingDown sx={{ color: card.color }} />
//                       )}
//                     </Box>
//                     <Typography variant="h5" fontWeight="bold" sx={{ color: card.color, mt: 1 }}>
//                       {card.value}
//                     </Typography>
//                   </Paper>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Stats Cards */}
//           <StatsCards stats={userStats} />

//           {/* Main Metric Cards - From API */}
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {metricCards.map((card, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <motion.div variants={itemVariants}>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 2,
//                       borderRadius: 2,
//                       border: "1px solid #e0e0e0",
//                       transition: "all 0.3s ease",
//                       "&:hover": {
//                         boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                         transform: "translateY(-2px)",
//                       },
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: card.color,
//                           width: 40,
//                           height: 40,
//                           mr: 2,
//                         }}
//                       >
//                         {card.icon}
//                       </Avatar>
//                       <Typography variant="body2" color="text.secondary">
//                         {card.label}
//                       </Typography>
//                     </Box>
//                     <Typography variant="h4" fontWeight="bold" sx={{ color: '#0f766e' }}>
//                       {card.value}
//                     </Typography>
//                   </Paper>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Current Plan Section - From API */}
//           {planData && <CurrentPlan planData={planData} />}

//           {/* Recent Activities - From API */}
//           <RecentActivities users={lastTrackedUsers} />
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
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

// StatsCards Component with enhanced styling
const StatsCards = ({ stats }) => {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              onClick={() => stat.onClick?.(navigate)}
              sx={{
                p: 3,
                borderRadius: 4,
                background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                border: "1px solid",
                borderColor: alpha(stat.iconColor, 0.2),
                cursor: stat.onClick ? "pointer" : "default",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
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
                      transform: "translateY(-4px) scale(1.02)",
                      boxShadow: `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}`,
                      borderColor: stat.iconColor,
                      "& .stat-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                      "& .stat-value": {
                        color: stat.iconColor,
                      },
                    }
                  : {},
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box>
                    <Typography 
                      variant="h3" 
                      fontWeight="700" 
                      className="stat-value"
                      sx={{ 
                        mb: 0.5, 
                        color: '#1e293b',
                        transition: "color 0.3s ease",
                        fontSize: { xs: '2rem', md: '2.5rem' }
                      }}
                    >
                      {stat.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Avatar
                    className="stat-icon"
                    sx={{
                      bgcolor: alpha(stat.iconColor, 0.1),
                      color: stat.iconColor,
                      width: 60,
                      height: 60,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: `0 10px 20px -5px ${alpha(stat.iconColor, 0.2)}`,
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
                  height: 4,
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

// CurrentPlan Component with enhanced styling
const CurrentPlan = ({ planData }) => {
  if (!planData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: alpha("#0f766e", 0.2),
          mb: 4,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: `0 10px 30px -15px ${alpha("#0f766e", 0.2)}`,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle, ${alpha("#0f766e", 0.05)} 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 2,
          pb: 2,
          borderBottom: "2px solid",
          borderColor: alpha("#0f766e", 0.1),
          position: "relative",
          zIndex: 1,
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box 
              sx={{ 
                width: 8, 
              height: 8, 
              borderRadius: "50%", 
              bgcolor: "#22c55e",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { opacity: 1, transform: "scale(1)" },
                "50%": { opacity: 0.5, transform: "scale(1.2)" },
                "100%": { opacity: 1, transform: "scale(1)" },
              },
            }} 
          />
          <Typography variant="h6" fontWeight="700" color="#0f766e" sx={{ letterSpacing: 0.5 }}>
            Current Plan
          </Typography>
        </Box>
        <Chip
          label={planData.status || "Active"}
          size="small"
          sx={{
            bgcolor: "#22c55e",
            color: "white",
            fontWeight: 600,
            fontSize: "0.75rem",
            height: 24,
            px: 1,
            boxShadow: "0 4px 10px -2px #22c55e80",
          }}
        />
      </Box>

      {/* Plan Name and Description */}
      <Box sx={{ mb: 2, position: "relative", zIndex: 1 }}>
        <Typography variant="h5" fontWeight="700" color="#1e293b" gutterBottom>
          {planData.name || "No Plan"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
          {planData.description || "No description"}
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6} md={3}>
          <Box sx={{ 
            bgcolor: alpha("#0f766e", 0.03), 
            p: 1.5, 
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.1),
          }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Duration
            </Typography>
            <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.9rem', color: '#1e293b' }}>
              {planData.duration || "N/A"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ 
            bgcolor: alpha("#0f766e", 0.03), 
            p: 1.5, 
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.1),
          }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Amount
            </Typography>
            <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.9rem', color: "#0f766e" }}>
              {planData.amount || "N/A"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ 
            bgcolor: alpha("#0f766e", 0.03), 
            p: 1.5, 
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.1),
          }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Currency
            </Typography>
            <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.9rem', color: '#1e293b' }}>
              {planData.currency || "INR"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3}>
          <Box sx={{ 
            bgcolor: alpha("#0f766e", 0.03), 
            p: 1.5, 
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.1),
          }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Status
            </Typography>
            <Chip
              label={planData.status || "Active"}
              size="small"
              sx={{
                bgcolor: alpha("#22c55e", 0.1),
                color: "#22c55e",
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 20,
                mt: 0.5,
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, borderStyle: 'dashed', borderColor: alpha("#0f766e", 0.2) }} />

      {/* Dates */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
            Created At
          </Typography>
          <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.9rem', color: '#1e293b' }}>
            {planData.createdAt ? new Date(planData.createdAt).toLocaleDateString() : "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
            Expires At
          </Typography>
          <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.9rem', color: '#1e293b' }}>
            {planData.expiresAt ? new Date(planData.expiresAt).toLocaleDateString() : "N/A"}
          </Typography>
        </Grid>
      </Grid>

      {/* Progress Section */}
      {planData.daysLeft && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
              Days Left
            </Typography>
            <Typography variant="caption" fontWeight="700" color="#0f766e" sx={{ fontSize: '0.75rem' }}>
              {planData.daysLeft} days
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={planData.progress || 0}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: alpha("#0f766e", 0.1),
              "& .MuiLinearProgress-bar": {
                bgcolor: "#0f766e",
                borderRadius: 3,
                backgroundImage: `linear-gradient(90deg, #0f766e, ${alpha("#0f766e", 0.5)})`,
              },
            }}
          />
        </Box>
      )}

      {/* User Limits */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ 
            bgcolor: alpha("#0f766e", 0.05), 
            p: 1.5, 
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.15),
          }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Min Users
            </Typography>
            <Typography variant="h6" fontWeight="700" sx={{ color: "#0f766e" }}>
              {planData.minUsers || "0"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ 
            bgcolor: alpha("#0f766e", 0.05), 
            p: 1.5, 
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.15),
          }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Max Users
            </Typography>
            <Typography variant="h6" fontWeight="700" sx={{ color: "#0f766e" }}>
              {planData.maxUsers || "0"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  </motion.div>
  );
};

// RecentActivities Component with enhanced styling
// const RecentActivities = ({ users }) => {
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
//             p: 4,
//             borderRadius: 4,
//             border: "1px solid",
//             borderColor: alpha("#0f766e", 0.1),
//             background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//             textAlign: "center",
//           }}
//         >
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="h6" fontWeight="600" color="#0f766e" gutterBottom>
//               Recent Activities
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               No recent activity
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
//               Users will appear here when they check in or out
//             </Typography>
//           </Box>
//         </Paper>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.3 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           borderRadius: 4,
//           border: "1px solid",
//           borderColor: alpha("#0f766e", 0.1),
//           background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//           <Typography variant="h6" fontWeight="600" color="#0f766e">
//             Recent Activities
//           </Typography>
//           <Chip
//             label="View All"
//             size="small"
//             onClick={() => console.log("View all clicked")}
//             sx={{
//               bgcolor: alpha("#0f766e", 0.1),
//               color: "#0f766e",
//               fontWeight: 500,
//               cursor: "pointer",
//               "&:hover": {
//                 bgcolor: alpha("#0f766e", 0.2),
//               },
//             }}
//           />
//         </Box>

//         <Stack spacing={2}>
//           {users.map((activity, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 2,
//                   borderRadius: 3,
//                   bgcolor: alpha("#0f766e", 0.02),
//                   border: "1px solid",
//                   borderColor: alpha("#0f766e", 0.1),
//                   display: "flex",
//                   alignItems: "center",
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.05),
//                     transform: "translateX(4px)",
//                     borderColor: alpha("#0f766e", 0.3),
//                   },
//                 }}
//               >
//                 <Avatar 
//                   sx={{ 
//                     bgcolor: alpha("#0f766e", 0.2),
//                     color: "#0f766e",
//                     mr: 2, 
//                     width: 48, 
//                     height: 48,
//                     fontWeight: 600,
//                   }}
//                 >
//                   {activity.name?.charAt(0) || "U"}
//                 </Avatar>
//                 <Box sx={{ flex: 1 }}>
//                   <Typography variant="subtitle2" fontWeight="600" color="#1e293b">
//                     {activity.name || "Unknown User"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {activity.action || "No action"} • {activity.location || "Unknown location"}
//                   </Typography>
//                 </Box>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
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


const RecentActivities = ({ users }) => {
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
            p: 4,
            borderRadius: 4,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.1),
            background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
            textAlign: "center",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight="600" color="#0f766e" gutterBottom>
              Recent Activities
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No recent activity
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              Users will appear here when they check in or out
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    );
  }

  // Show only first 4 users (you can change this number)
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
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: alpha("#0f766e", 0.1),
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" fontWeight="600" color="#0f766e">
            Recent Activities
          </Typography>
          {users.length > 4 && (
            <Chip
              label={`View All (${users.length})`}
              size="small"
              onClick={() => console.log("View all clicked")}
              sx={{
                bgcolor: alpha("#0f766e", 0.1),
                color: "#0f766e",
                fontWeight: 500,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: alpha("#0f766e", 0.2),
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
                  p: 2,
                  borderRadius: 3,
                  bgcolor: alpha("#0f766e", 0.02),
                  border: "1px solid",
                  borderColor: alpha("#0f766e", 0.1),
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: alpha("#0f766e", 0.05),
                    transform: "translateX(4px)",
                    borderColor: alpha("#0f766e", 0.3),
                  },
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: alpha("#0f766e", 0.2),
                    color: "#0f766e",
                    mr: 2, 
                    width: 48, 
                    height: 48,
                    fontWeight: 600,
                  }}
                >
                  {activity.name?.charAt(0) || "U"}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight="600" color="#1e293b">
                    {activity.name || "Unknown User"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.action || "No action"} • {activity.location || "Unknown location"}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {activity.time || "N/A"}
                </Typography>
              </Paper>
            </motion.div>
          ))}
        </Stack>
        
        {/* Optional: Show message if there are more users */}
        {users.length > 4 && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              +{users.length - 4} more activities. Click "View All" to see them.
            </Typography>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};
// Main AdminDashboard Component
const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkedInCount, setCheckedInCount] = useState(0);
  const [checkedOutCount, setCheckedOutCount] = useState(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [totalInActiveUsers, setTotalInActiveUsers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [planData, setPlanData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Safe Redux state access
  const userState = useSelector((state) => state.user || {});
  const userData = userState.userInfo || {};
  const lastTrackedUsers = userState.lastTrackedUsers || [];
  const loading = userState.loading || false;
  const lastTrackedUsersLoading = userState.lastTrackedUsersLoading || false;
  const userCounts = userState.userCounts || {};

  
  useEffect(() => {
    if (userData?._id) {
      dispatch(getUserById(userData._id));
      dispatch(getLastFiveTrackedUsers(userData._id));
      dispatch(getActiveUserLocations());
      dispatch(getUserCounts());
    }
  }, [dispatch, userData?._id]);

  useEffect(() => {
    if (userData?._id) {
      dispatch(getAllUsers(userData._id)).then((response) => {
        const users = response.payload?.users || [];

        const today = new Date().toISOString().split("T")[0];

        const checkedOutUsers = users.filter(
          (user) => user.status === "0" && user.updatedAt?.split("T")[0] === today
        );
        const checkedInUsers = users.filter(
          (user) => user.status === "1" && user.updatedAt?.split("T")[0] === today
        );

        setCheckedOutCount(checkedOutUsers.length);
        setCheckedInCount(checkedInUsers.length);

        const activeUsers = users.filter((user) => user.isActive === true);
        const inactiveUsers = users.filter((user) => user.isActive === false);

        setTotalActiveUsers(activeUsers.length);
        setTotalInActiveUsers(inactiveUsers.length);
        setTotalUsers(users.length);
      });
    }
  }, [dispatch, userData?._id]);

  // Fetch plan data
  useEffect(() => {
    if (userData?.currentPaymentId) {
      const fetchPlanData = async () => {
        try {
          // Replace with actual API call
          setPlanData({
            name: "Enterprise Plan",
            description: "Full access to all features",
            duration: "Yearly",
            amount: "₹24000",
            currency: "INR",
            status: "Active",
            createdAt: "2026-01-15",
            expiresAt: "2027-01-15",
            daysLeft: 320,
            minUsers: 10,
            maxUsers: 100,
            progress: 12,
          });
        } catch (error) {
          console.error("Failed to fetch plan data:", error);
        }
      };
      fetchPlanData();
    }
  }, [userData?.currentPaymentId]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    
    Promise.all([
      dispatch(getAllUsers(userData._id)),
      dispatch(getLastFiveTrackedUsers(userData._id)),
      dispatch(getActiveUserLocations()),
      dispatch(getUserCounts()),
    ]).finally(() => {
      setIsRefreshing(false);
    });
  };

  const percentageCards = [
    { label: 'Team Growth', value: userCounts.teamGrowth || '+0%', trend: 'up', color: '#4caf50' },
    { label: 'Live Locations', value: userCounts.locationGrowth || '+0%', trend: 'up', color: '#4caf50' },
    { label: 'Coverage', value: userCounts.coverage || '+0%', trend: 'up', color: '#4caf50' },
    { label: 'Response Time', value: userCounts.responseTime || '0%', trend: 'down', color: '#f44336' },
  ];

  const metricCards = [
    { 
      value: totalUsers || userCounts.totalUsers || 0, 
      label: 'Total Team Members', 
      icon: <PeopleIcon />, 
      color: '#2196f3' 
    },
    { 
      value: userCounts.liveLocations || 0, 
      label: 'Live Locations', 
      icon: <LocationIcon />, 
      color: '#ff9800' 
    },
    { 
      value: userCounts.totalDistance ? `${userCounts.totalDistance} km` : '0 km', 
      label: 'Total Distance', 
      icon: <TimelineIcon />, 
      color: '#9c27b0' 
    },
    { 
      value: userCounts.avgResponseTime ? `${userCounts.avgResponseTime} min` : '0 min', 
      label: 'Avg Response Time', 
      icon: <TimelineIcon />, 
      color: '#f44336' 
    },
  ];

  const userStats = [
    {
      key: "activeUsers",
      label: "Active Users",
      count: totalActiveUsers,
      icon: <FaUsers size={24} />,
      bgColor: alpha("#3B82F6", 0.1),
      iconColor: "#3B82F6",
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
      bgColor: alpha("#22C55E", 0.1),
      iconColor: "#22C55E",
      onClick: () => navigate("/admin/live-locations"),
    },
    {
      key: "checkedOutUsers",
      label: "Checked Out",
      count: checkedOutCount,
      icon: <FaUserClock size={24} />,
      bgColor: alpha("#F59E0B", 0.1),
      iconColor: "#F59E0B",
      onClick: () => navigate("/admin/reports"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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

  if (loading && !userData._id) {
    return (
      <Loader 
        message="Loading Dashboard..." 
        subMessage="Fetching your team data and tracking information"
        fullScreen={true}
        size="large"
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        width: "100%",
        overflowX: "hidden",
        position: "relative",
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
            size="medium"
          />
        </Box>
      )}

      {lastTrackedUsersLoading && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            bgcolor: "white",
            borderRadius: 3,
            boxShadow: 4,
            p: 1.5,
            border: "1px solid",
            borderColor: alpha("#0f766e", 0.1),
          }}
        >
          <Loader 
            message="Updating activities..." 
            size="small"
          />
        </Box>
      )}

      <Box
        component={motion.main}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{ py: 4, px: { xs: 2, md: 4 } }}
      >
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box>
              <Typography 
                variant="h4" 
                fontWeight="800" 
                color="#0f766e" 
                gutterBottom
                sx={{
                  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Admin Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                Overview • Last updated {lastUpdated.toLocaleTimeString()}
                <IconButton 
                  size="small" 
                  sx={{ 
                    ml: 1,
                    bgcolor: alpha("#0f766e", 0.1),
                    "&:hover": {
                      bgcolor: alpha("#0f766e", 0.2),
                    },
                  }} 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshIcon 
                    fontSize="small" 
                    sx={{ 
                      color: "#0f766e",
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
              size="medium"
              sx={{
                bgcolor: "#0f766e",
                color: "white",
                fontWeight: 600,
                px: 2,
                py: 2.5,
                fontSize: "0.9rem",
                boxShadow: `0 10px 20px -5px ${alpha("#0f766e", 0.3)}`,
              }}
            />
          </Box>

          {/* Percentage Change Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {percentageCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                      border: "1px solid",
                      borderColor: alpha(card.color, 0.2),
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 15px 25px -10px ${alpha(card.color, 0.3)}`,
                        borderColor: card.color,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {card.label}
                      </Typography>
                      {card.trend === "up" ? (
                        <TrendingUp sx={{ color: card.color }} />
                      ) : (
                        <TrendingDown sx={{ color: card.color }} />
                      )}
                    </Box>
                    <Typography variant="h5" fontWeight="700" sx={{ color: card.color, mt: 1 }}>
                      {card.value}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Stats Cards */}
          <StatsCards stats={userStats} />

          {/* Main Metric Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {metricCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                      border: "1px solid",
                      borderColor: alpha(card.color, 0.2),
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 15px 25px -10px ${alpha(card.color, 0.3)}`,
                        borderColor: card.color,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(card.color, 0.1),
                          color: card.color,
                          width: 40,
                          height: 40,
                          mr: 2,
                        }}
                      >
                        {card.icon}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {card.label}
                      </Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="700" sx={{ color: '#1e293b' }}>
                      {card.value}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Current Plan Section */}
          {planData && <CurrentPlan planData={planData} />}

          {/* Recent Activities */}
          <RecentActivities users={lastTrackedUsers} />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;