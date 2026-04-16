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
//   alpha,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
//   Button,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Visibility as VisibilityIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaUserCheck,
//   FaUserTimes,
//   FaUserShield,
//   FaChartLine,
//   FaRupeeSign,
//   FaCalendarAlt,
//   FaArrowUp,
// } from "react-icons/fa";
// import { getUserCounts } from "../../redux/slices/userSlice";
// import { getUsersWithExpiringPlans } from "../../redux/slices/planSlice";
// import { getRevenueSummary } from "../../redux/slices/paymentSlice";
// import ExpiringPlansTable from "../../components/ExpiringPlansTable";

// // Stats Card Skeleton Component - Smaller height
// const StatsCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   // Get grid columns based on screen size
//   const getGridColumns = () => {
//     if (isSmallMobile) return 12;
//     if (isMobile) return 12;
//     if (isTablet) return 6;
//     return 3;
//   };

//   return (
//     <Grid item xs={getGridColumns()}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//           borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           height: '100%',
//           minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ position: "relative", zIndex: 1 }}>
//           <Box sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexDirection: isSmallMobile ? "column" : "row",
//             textAlign: isSmallMobile ? "center" : "left",
//             gap: isSmallMobile ? 0.5 : 0,
//           }}>
//             <Box>
//               <Skeleton
//                 variant="text"
//                 width={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60}
//                 height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26}
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }}
//               />
//               <Skeleton
//                 variant="text"
//                 width={isSmallMobile ? 60 : isMobile ? 65 : isTablet ? 70 : 75}
//                 height={isSmallMobile ? 10 : isMobile ? 11 : isTablet ? 12 : 13}
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//               />
//             </Box>
//             <Skeleton
//               variant="circular"
//               width={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//               height={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//               sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
//             />
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             width: "100%",
//             height: 2.5,
//             background: alpha(theme.palette.primary.main, 0.1),
//           }}
//         />
//       </Paper>
//     </Grid>
//   );
// };

// // Revenue Card Skeleton Component - Smaller height
// const RevenueCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//         borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: "white",
//         position: "relative",
//         overflow: "hidden",
//         height: '100%',
//         minHeight: isSmallMobile ? 120 : isMobile ? 130 : isTablet ? 140 : 150,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}
//     >
//       {/* Header Section Skeleton */}
//       <Box sx={{
//         display: "flex",
//         flexDirection: (isMobile || isTablet) ? "column" : "row",
//         justifyContent: "space-between",
//         alignItems: (isMobile || isTablet) ? "flex-start" : "center",
//         mb: (isMobile || isTablet) ? 0.8 : 1.5,
//         gap: (isMobile || isTablet) ? 0.5 : 0,
//       }}>
//         <Box>
//           <Skeleton
//             variant="text"
//             width={70}
//             height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12}
//             sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }}
//           />
//           <Skeleton
//             variant="text"
//             width={isSmallMobile ? 90 : isMobile ? 100 : isTablet ? 110 : 120}
//             height={isSmallMobile ? 18 : isMobile ? 19 : isTablet ? 20 : 22}
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//           />
//         </Box>
//         <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
//           <Skeleton
//             variant="rounded"
//             width={50}
//             height={18}
//             sx={{
//               bgcolor: alpha("#ffffff", 0.2),
//               borderRadius: 2,
//               mb: 0.5
//             }}
//           />
//           <Skeleton
//             variant="text"
//             width={45}
//             height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//           />
//         </Box>
//       </Box>

//       {/* Monthly Summary Section Skeleton */}
//       <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1}>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//               borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 35 : isMobile ? 40 : isTablet ? 45 : 50}
//                   height={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
//                 />
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 25 : isMobile ? 28 : isTablet ? 30 : 32}
//                   height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//                 />
//               </Box>
//               <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//               borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 35 : isMobile ? 40 : isTablet ? 45 : 50}
//                   height={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
//                 />
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 25 : isMobile ? 28 : isTablet ? 30 : 32}
//                   height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//                 />
//               </Box>
//               <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Expiring Plans Table Skeleton - Smaller
// const ExpiringPlansTableSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//         borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       {/* Header */}
//       <Box sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//         pb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//         borderBottom: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}>
//         <Box>
//           <Skeleton variant="text" width={100} height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//           <Skeleton variant="text" width={140} height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//         <Skeleton variant="rounded" width={70} height={isSmallMobile ? 22 : isMobile ? 24 : isTablet ? 26 : 28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       {/* Table Header Skeleton */}
//       <Box sx={{
//         display: "flex",
//         bgcolor: alpha(theme.palette.primary.main, 0.05),
//         p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//         borderRadius: 0.8,
//         mb: 0.8
//       }}>
//         <Skeleton variant="text" width={35} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={60} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </Box>

//       {/* Table Rows Skeleton */}
//       {[1, 2, 3].map((item, index) => (
//         <Box key={item} sx={{
//           display: "flex",
//           p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//           borderBottom: index < 2 ? "1px solid" : "none",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//         }}>
//           <Skeleton variant="text" width={35} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={60} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="rounded" width={60} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       ))}
//     </Paper>
//   );
// };

// // Popular Plans Chart Component
// const PopularPlansChart = ({ data, isMobile }) => {
//   const theme = useTheme();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return (
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           height: 300,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: alpha(theme.palette.background.paper, 0.5),
//           border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
//         }}
//       >
//         <Typography color="text.secondary">No purchase data available</Typography>
//       </Paper>
//     );
//   }

//   // Predefined colors for the bars
//   const COLORS = [
//     theme.palette.primary.main,
//     "#22C55E", // Success Green
//     "#F59E0B", // Amber/Orange
//     "#8B5CF6", // Purple
//     "#EC4899", // Pink
//     "#3B82F6", // Blue
//   ];

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 3 },
//         borderRadius: 3,
//         bgcolor: theme.palette.background.paper,
//         border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//         height: isMobile ? 300 : 350,
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Typography
//         variant="subtitle2"
//         fontWeight="700"
//         sx={{ mb: 2, px: 1, color: "text.primary", fontSize: "0.85rem" }}
//       >
//         Plan Popularity (by Purchase Count)
//       </Typography>
//       <Box sx={{ flexGrow: 1, width: "100%", height: "100%", minHeight: 200 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             layout="vertical"
//             margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
//             barSize={isMobile ? 20 : 25}
//           >
//             <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={alpha(theme.palette.divider, 0.5)} />
//             <XAxis type="number" hide />
//             <YAxis
//               dataKey="planName"
//               type="category"
//               axisLine={false}
//               tickLine={false}
//               width={isMobile ? 70 : 100}
//               tick={{ fontSize: isMobile ? 9 : 11, fontWeight: 600, fill: theme.palette.text.secondary }}
//             />
//             <Tooltip
//               cursor={{ fill: alpha(theme.palette.primary.main, 0.05) }}
//               contentStyle={{
//                 borderRadius: "12px",
//                 border: "none",
//                 boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
//                 backgroundColor: theme.palette.background.paper,
//                 fontSize: "12px",
//               }}
//               formatter={(value) => [`${value} Purchases`, "Count"]}
//             />
//             <Bar
//               dataKey="purchaseCount"
//               radius={[0, 10, 10, 0]}
//               animationDuration={1500}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>
//     </Paper>
//   );
// };

// const SuperAdminDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useTheme();
 
//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   const [lastUpdated, setLastUpdated] = useState(new Date());

//   // Safe Redux state access
//   const userCounts = useSelector((state) => state.user?.userCounts || {});
//   const expiringUsers = useSelector((state) => state.plan?.expiringUsers || []);
//   const { revenueSummary } = useSelector(
//     (state) => state.payment || {}
//   );

//   useEffect(() => {
//     dispatch(getUserCounts());
//     dispatch(getUsersWithExpiringPlans());
//     dispatch(getRevenueSummary());

//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch]);

//   const refreshData = () => {
//     setLastUpdated(new Date());
//     dispatch(getUserCounts());
//     dispatch(getUsersWithExpiringPlans());
//     dispatch(getRevenueSummary());
//   };

//   // Get only the first 10 users for the dashboard preview
//   const recentExpiringUsers = expiringUsers.slice(0, 10);

//   // User Stats with responsive icons
//   const userStats = [
//     {
//       key: "activeAdmins",
//       label: "Active Admins",
//       count: userCounts?.activeAdmins || 0,
//       icon: <FaUserShield />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
//     },
//     {
//       key: "inactiveAdmins",
//       label: "Inactive Admins",
//       count: userCounts?.inactiveAdmins || 0,
//       icon: <FaUserTimes />,
//       bgColor: alpha(theme.palette.text.secondary, 0.1),
//       iconColor: theme.palette.text.secondary,
//     },
//     {
//       key: "allActiveUsers",
//       label: "All Active Users",
//       count: userCounts?.allActiveUsers || 0,
//       icon: <FaUserCheck />,
//       bgColor: alpha("#22C55E", 0.1),
//       iconColor: "#22C55E",
//     },
//     {
//       key: "allInactiveUsers",
//       label: "All Inactive Users",
//       count: userCounts?.allInactiveUsers || 0,
//       icon: <FaUsers />,
//       bgColor: alpha(theme.palette.secondary.main, 0.1),
//       iconColor: theme.palette.secondary.main,
//     },
//   ];

//   // Stats Cards Component - Smaller height
//   const StatsCards = () => {
//     const itemVariants = {
//       hidden: { opacity: 0, y: 20 },
//       visible: {
//         opacity: 1,
//         y: 0,
//         transition: { duration: 0.5 },
//       },
//     };

//     // Get grid columns based on screen size
//     const getGridColumns = () => {
//       if (isSmallMobile) return 12;
//       if (isMobile) return 12;
//       if (isTablet) return 6;
//       return 3;
//     };

//     return (
//       <Grid
//         container
//         spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
//         sx={{ mb: isMobile ? 1.5 : 2 }}
//       >
//         {userStats.map((stat, index) => (
//           <Grid item xs={getGridColumns()} key={stat.key || index}>
//             <motion.div
//               variants={itemVariants}
//               initial="hidden"
//               animate="visible"
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                   borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                   background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                   border: "1px solid",
//                   borderColor: alpha(stat.iconColor, 0.2),
//                   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                   position: "relative",
//                   overflow: "hidden",
//                   height: '100%',
//                   minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   "&::before": {
//                     content: '""',
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: "100%",
//                     background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
//                     zIndex: 0,
//                   },
//                   "&:hover": {
//                     transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
//                     boxShadow: !isMobile ? `0 12px 20px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
//                     borderColor: stat.iconColor,
//                   },
//                 }}
//               >
//                 <Box sx={{ position: "relative", zIndex: 1 }}>
//                   <Box sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     flexDirection: isSmallMobile ? "column" : "row",
//                     textAlign: isSmallMobile ? "center" : "left",
//                     gap: isSmallMobile ? 0.5 : 0,
//                   }}>
//                     <Box>
//                       <Typography
//                         variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
//                         fontWeight="700"
//                         sx={{
//                           mb: 0.15,
//                           color: 'text.primary',
//                           fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.5rem' : isTablet ? '1.7rem' : '1.9rem',
//                           lineHeight: 1.2,
//                         }}
//                       >
//                         {stat.count}
//                       </Typography>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{
//                           fontWeight: 500,
//                           fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//                         }}
//                       >
//                         {stat.label}
//                       </Typography>
//                     </Box>
//                     <Avatar
//                       sx={{
//                         bgcolor: alpha(stat.iconColor, 0.1),
//                         color: stat.iconColor,
//                         width: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                         height: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                         boxShadow: `0 4px 8px -3px ${alpha(stat.iconColor, 0.2)}`,
//                         '& svg': {
//                           fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
//                         },
//                       }}
//                     >
//                       {stat.icon}
//                     </Avatar>
//                   </Box>
//                 </Box>
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     width: "100%",
//                     height: 2.5,
//                     background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
//                     opacity: 0.8,
//                   }}
//                 />
//               </Paper>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   };

//   // Revenue Card Component - Smaller height
//   const RevenueCard = () => {
//     return (
//       <Paper
//         elevation={0}
//         sx={{
//           p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//           borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//           height: '100%',
//           minHeight: isSmallMobile ? 120 : isMobile ? 130 : isTablet ? 140 : 150,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             right: 0,
//             width: isSmallMobile ? "80px" : isMobile ? "90px" : isTablet ? "100px" : "110px",
//             height: isSmallMobile ? "80px" : isMobile ? "90px" : isTablet ? "100px" : "110px",
//             background: `radial-gradient(circle, ${alpha("#ffffff", 0.2)} 0%, transparent 70%)`,
//             borderRadius: "50%",
//             transform: "translate(50%, -50%)",
//           },
//         }}
//       >
//         {/* Header Section */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: (isMobile || isTablet) ? "column" : "row",
//           justifyContent: "space-between",
//           alignItems: (isMobile || isTablet) ? "flex-start" : "center",
//           mb: (isMobile || isTablet) ? 0.8 : 1.5,
//           gap: (isMobile || isTablet) ? 0.5 : 0,
//         }}>
//           <Box>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 mb: 0.5,
//                 fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//               }}
//             >
//               Total Revenue
//             </Typography>
//             <Typography
//               variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
//               fontWeight="700"
//               sx={{
//                 fontSize: isSmallMobile ? '1rem' : isMobile ? '1.2rem' : isTablet ? '1.4rem' : '1.6rem',
//                 lineHeight: 1.2,
//               }}
//             >
//               {revenueSummary?.totalRevenue > 0
//                 ? `₹${revenueSummary?.totalRevenue.toLocaleString()}`
//                 : "₹0"}
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
//             <Chip
//               label={`+${revenueSummary?.growthPercentage > 0
//                 ? revenueSummary?.growthPercentage.toLocaleString()
//                 : "0"}%`}
//               size="small"
//               icon={<FaArrowUp size={isSmallMobile ? 6 : 8} />}
//               sx={{
//                 bgcolor: alpha("#22c55e", 0.2),
//                 color: "#22c55e",
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.65rem',
//                 mb: 0.5,
//                 height: isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 20,
//               }}
//             />
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 display: "block",
//                 fontSize: isSmallMobile ? '0.45rem' : isMobile ? '0.5rem' : isTablet ? '0.55rem' : '0.55rem',
//               }}
//             >
//               This Month
//             </Typography>
//           </Box>
//         </Box>

//         {/* Monthly Summary Section */}
//         <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1}>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//                 borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 background: alpha("#ffffff", 0.08),
//                 backdropFilter: "blur(4px)",
//                 height: '100%',
//                 minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//                 <Box>
//                   <Typography
//                     variant={isSmallMobile ? "caption" : isMobile ? "body2" : isTablet ? "body1" : "body1"}
//                     fontWeight="600"
//                     sx={{
//                       mb: 0.1,
//                       fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.9rem',
//                     }}
//                   >
//                     {revenueSummary?.currentMonthRevenue > 0
//                       ? `₹${revenueSummary?.currentMonthRevenue.toLocaleString()}`
//                       : "₹0"}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       fontSize: isSmallMobile ? '0.45rem' : isMobile ? '0.5rem' : isTablet ? '0.55rem' : '0.55rem',
//                     }}
//                   >
//                     This Month
//                   </Typography>
//                 </Box>
//                 <FaCalendarAlt size={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15} style={{ opacity: 0.5 }} />
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//                 borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 background: alpha("#ffffff", 0.08),
//                 backdropFilter: "blur(4px)",
//                 height: '100%',
//                 minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//                 <Box>
//                   <Typography
//                     variant={isSmallMobile ? "caption" : isMobile ? "body2" : isTablet ? "body1" : "body1"}
//                     fontWeight="600"
//                     sx={{
//                       mb: 0.1,
//                       fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.9rem',
//                     }}
//                   >
//                     {revenueSummary?.lastMonthRevenue > 0
//                       ? `₹${revenueSummary?.lastMonthRevenue.toLocaleString()}`
//                       : "₹0"}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       fontSize: isSmallMobile ? '0.45rem' : isMobile ? '0.5rem' : isTablet ? '0.55rem' : '0.55rem',
//                     }}
//                   >
//                     Last Month
//                   </Typography>
//                 </Box>
//                 <FaCalendarAlt size={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15} style={{ opacity: 0.5 }} />
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     );
//   };

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

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5 },
//     },
//   };

//   // If first render loader is active, show skeletons for everything except title and refresh button
//   if (showFirstRenderLoader) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//           width: "100%",
//           overflowX: "hidden",
//           position: "relative",
//           py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//           px: { xs: 0, sm: 0, md: 0 },
//         }}
//       >
//         <Container
//           maxWidth="xl"
//           disableGutters={isMobile}
//           sx={{
//             px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//           }}
//         >
//           {/* Header Section with Title and Refresh Button */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 1.5,
//             }}
//           >
//             <Typography
//               variant={isMobile ? "body1" : "h6"}
//               fontWeight="600"
//               color={theme.palette.primary.main}
//               gutterBottom
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: {
//                   xs: '0.9rem',      // 14px on mobile
//                   sm: '1.1rem',       // 18px on small tablets
//                   md: '1.3rem',       // 21px on tablets
//                   lg: '1.5rem',       // 24px on desktops
//                   xl: '1.7rem'        // 27px on large screens
//                 },
//               }}
//             >
//               Super Admin Dashboard
//             </Typography>
//             <IconButton size="small" sx={{ width: 28, height: 28 }}>
//               <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//             </IconButton>
//           </Box>

//           {/* Tracking Overview Section Skeleton */}
//           <Box sx={{
//             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//           }}>
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               flexWrap: "wrap",
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <FaChartLine style={{
//                   color: theme.palette.primary.main,
//                   fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//                 }} />
//                 <Typography
//                   variant={isSmallMobile ? "caption" : "body2"}
//                   fontWeight="600"
//                   color="text.primary"
//                   sx={{
//                     fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Stats Cards Skeleton */}
//             <Grid
//               container
//               spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
//               sx={{ mb: isMobile ? 1.5 : 2 }}
//             >
//               {[1, 2, 3, 4].map((item) => (
//                 <StatsCardSkeleton
//                   key={item}
//                   isSmallMobile={isSmallMobile}
//                   isMobile={isMobile}
//                   isTablet={isTablet}
//                 />
//               ))}
//             </Grid>
//           </Box>

//           {/* Revenue Overview Section Skeleton - Moved up */}
//           <Box sx={{
//             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//           }}>
//             <Box sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.5,
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <FaRupeeSign style={{
//                 color: theme.palette.primary.main,
//                 fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//               }} />
//               <Typography
//                 variant={isSmallMobile ? "caption" : "body2"}
//                 fontWeight="600"
//                 color="text.primary"
//                 sx={{
//                   fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                 }}
//               >
//                 Revenue Overview
//               </Typography>
//             </Box>

//             <RevenueCardSkeleton
//               isSmallMobile={isSmallMobile}
//               isMobile={isMobile}
//               isTablet={isTablet}
//             />
//           </Box>

//           {/* Expiring Plans Section Skeleton */}
//           <Box sx={{
//             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//           }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//               <Typography variant="body2" fontWeight="600">Recent Expiring Plans</Typography>
//               <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 2 }} />
//             </Box>
//             <ExpiringPlansTableSkeleton
//               isSmallMobile={isSmallMobile}
//               isMobile={isMobile}
//               isTablet={isTablet}
//             />
//           </Box>

//         </Container>

//         {/* CSS for animations */}
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//         width: "100%",
//         overflowX: "hidden",
//         position: "relative",
//         py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//         px: { xs: 0, sm: 0, md: 0 },
//       }}
//     >
//       <Container
//         maxWidth="xl"
//         disableGutters={isMobile}
//         sx={{
//           px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//         }}
//       >
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header Section */}
//           <motion.div variants={itemVariants}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 1.5,
//               }}
//             >
//               <Typography
//                 variant={isMobile ? "body1" : "h6"}
//                 fontWeight="800"
//                 color={theme.palette.primary.main}
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: {
//                     xs: '0.9rem',      // 14px on mobile
//                     sm: '1.1rem',       // 18px on small tablets
//                     md: '1.3rem',       // 21px on tablets
//                     lg: '1.5rem',       // 24px on desktops
//                     xl: '1.7rem'        // 27px on large screens
//                   },
//                 }}
//               >
//                 Super Admin Dashboard
//               </Typography>
//               <IconButton size="small" onClick={refreshData} sx={{ width: 28, height: 28 }}>
//                 <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//               </IconButton>
//             </Box>
//           </motion.div>

//           {/* Tracking Overview Section */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               flexWrap: "wrap",
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <FaChartLine style={{
//                   color: theme.palette.primary.main,
//                   fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//                 }} />
//                 <Typography
//                   variant={isSmallMobile ? "caption" : "body2"}
//                   fontWeight="600"
//                   color="text.primary"
//                   sx={{
//                     fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>

//               <Chip
//                 label="Live"
//                 size="small"
//                 icon={<FaChartLine size={isSmallMobile ? 6 : 8} />}
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   fontWeight: 600,
//                   fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.7rem',
//                   height: isSmallMobile ? 18 : isMobile ? 20 : isTablet ? 22 : 24,
//                 }}
//               />
//             </Box>

//             <StatsCards />
//           </motion.section>

//           {/* Revenue Overview Section - Moved up */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.5,
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <FaRupeeSign style={{
//                 color: theme.palette.primary.main,
//                 fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//               }} />
//               <Typography
//                 variant={isSmallMobile ? "caption" : "body2"}
//                 fontWeight="600"
//                 color="text.primary"
//                 sx={{
//                   fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                 }}
//               >
//                 Revenue Overview
//               </Typography>
//             </Box>

//             <motion.div variants={cardVariants}>
//               <RevenueCard />
//             </motion.div>
//           </motion.section>

//           {/* Expiring Plans Section - Only showing 10 recent users with View All button */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
//                 Recent Expiring Plans
//               </Typography>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => navigate('/admin/expiringplanspage')}
//                 endIcon={<VisibilityIcon />}
//                 sx={{
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   color: theme.palette.primary.main,
//                   fontSize: '0.65rem',
//                   py: 0.3,
//                   px: 1,
//                   '&:hover': {
//                     borderColor: theme.palette.primary.main,
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//               >
//                 View All ({expiringUsers.length})
//               </Button>
//             </Box>
//             <ExpiringPlansTable data={recentExpiringUsers} />
//           </motion.section>
//         </motion.div>
//       </Container>

//       {/* CSS for animations */}
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default SuperAdminDashboard;


<<<<<<< HEAD



// import React, { useEffect, useState, useMemo, memo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
//   Legend,
// } from "recharts";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton,
//   Container,
//   alpha,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
//   Button,
//   TextField,
//   Stack,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Visibility as VisibilityIcon,
//   FilterAlt as FilterAltIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import {
//   FaUsers,
//   FaUserCheck,
//   FaUserTimes,
//   FaUserShield,
//   FaChartLine,
//   FaRupeeSign,
//   FaArrowDown,
//   FaCalendarAlt,
//   FaArrowUp,
// } from "react-icons/fa";
// import { getUserCounts } from "../../redux/slices/userSlice";
// import { getUsersWithExpiringPlans, getPopularPlans } from "../../redux/slices/planSlice";
// import { getRevenueSummary } from "../../redux/slices/paymentSlice";
// import ExpiringPlansTable from "../../components/ExpiringPlansTable";
// // import SearchFilter from "../../components/SearchFilter";
// import moment from "moment";

// // Stats Card Skeleton Component - Smaller height
// const StatsCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   // Get grid columns based on screen size
//   const getGridColumns = () => {
//     if (isSmallMobile) return 12;
//     if (isMobile) return 12;
//     if (isTablet) return 6;
//     return 3;
//   };

//   return (
//     <Grid item xs={getGridColumns()}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//           borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           height: '100%',
//           minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ position: "relative", zIndex: 1 }}>
//           <Box sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexDirection: isSmallMobile ? "column" : "row",
//             textAlign: isSmallMobile ? "center" : "left",
//             gap: isSmallMobile ? 0.5 : 0,
//           }}>
//             <Box>
//               <Skeleton
//                 variant="text"
//                 width={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60}
//                 height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26}
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }}
//               />
//               <Skeleton
//                 variant="text"
//                 width={isSmallMobile ? 60 : isMobile ? 65 : isTablet ? 70 : 75}
//                 height={isSmallMobile ? 10 : isMobile ? 11 : isTablet ? 12 : 13}
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//               />
//             </Box>
//             <Skeleton
//               variant="circular"
//               width={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//               height={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//               sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
//             />
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             position: "absolute",
//             bottom: 0,
//             left: 0,
//             width: "100%",
//             height: 2.5,
//             background: alpha(theme.palette.primary.main, 0.1),
//           }}
//         />
//       </Paper>
//     </Grid>
//   );
// };

// // Revenue Card Skeleton Component - Smaller height
// const RevenueCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//         borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: "white",
//         position: "relative",
//         overflow: "hidden",
//         height: '100%',
//         minHeight: isSmallMobile ? 120 : isMobile ? 130 : isTablet ? 140 : 150,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}
//     >
//       {/* Header Section Skeleton */}
//       <Box sx={{
//         display: "flex",
//         flexDirection: (isMobile || isTablet) ? "column" : "row",
//         justifyContent: "space-between",
//         alignItems: (isMobile || isTablet) ? "flex-start" : "center",
//         mb: (isMobile || isTablet) ? 0.8 : 1.5,
//         gap: (isMobile || isTablet) ? 0.5 : 0,
//       }}>
//         <Box>
//           <Skeleton
//             variant="text"
//             width={70}
//             height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12}
//             sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }}
//           />
//           <Skeleton
//             variant="text"
//             width={isSmallMobile ? 90 : isMobile ? 100 : isTablet ? 110 : 120}
//             height={isSmallMobile ? 18 : isMobile ? 19 : isTablet ? 20 : 22}
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//           />
//         </Box>
//         <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
//           <Skeleton
//             variant="rounded"
//             width={50}
//             height={18}
//             sx={{
//               bgcolor: alpha("#ffffff", 0.2),
//               borderRadius: 2,
//               mb: 0.5
//             }}
//           />
//           <Skeleton
//             variant="text"
//             width={45}
//             height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//           />
//         </Box>
//       </Box>

//       {/* Monthly Summary Section Skeleton */}
//       <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1}>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//               borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 35 : isMobile ? 40 : isTablet ? 45 : 50}
//                   height={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
//                 />
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 25 : isMobile ? 28 : isTablet ? 30 : 32}
//                   height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//                 />
//               </Box>
//               <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//               borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 35 : isMobile ? 40 : isTablet ? 45 : 50}
//                   height={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
//                 />
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 25 : isMobile ? 28 : isTablet ? 30 : 32}
//                   height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//                 />
//               </Box>
//               <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Expiring Plans Table Skeleton - Smaller
// const ExpiringPlansTableSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//         borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       {/* Header */}
//       <Box sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//         pb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//         borderBottom: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}>
//         <Box>
//           <Skeleton variant="text" width={100} height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//           <Skeleton variant="text" width={140} height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//         <Skeleton variant="rounded" width={70} height={isSmallMobile ? 22 : isMobile ? 24 : isTablet ? 26 : 28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       {/* Table Header Skeleton */}
//       <Box sx={{
//         display: "flex",
//         bgcolor: alpha(theme.palette.primary.main, 0.05),
//         p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//         borderRadius: 0.8,
//         mb: 0.8
//       }}>
//         <Skeleton variant="text" width={35} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={60} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </Box>

//       {/* Table Rows Skeleton */}
//       {[1, 2, 3].map((item, index) => (
//         <Box key={item} sx={{
//           display: "flex",
//           p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//           borderBottom: index < 2 ? "1px solid" : "none",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//         }}>
//           <Skeleton variant="text" width={35} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={60} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="rounded" width={60} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       ))}
//     </Paper>
//   );
// };

// // Popular Plans Chart Component
// const PopularPlansChart = ({ data, isMobile }) => {
//   const theme = useTheme();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return (
//       <Paper
//         elevation={0}
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           height: 300,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           bgcolor: alpha(theme.palette.background.paper, 0.5),
//           border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
//         }}
//       >
//         <Typography color="text.secondary">No purchase data available</Typography>
//       </Paper>
//     );
//   }

//   // Predefined colors for the bars
//   const COLORS = [
//     theme.palette.primary.main,
//     "#22C55E", // Success Green
//     "#F59E0B", // Amber/Orange
//     "#8B5CF6", // Purple
//     "#EC4899", // Pink
//     "#3B82F6", // Blue
//   ];

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 3 },
//         borderRadius: 3,
//         bgcolor: theme.palette.background.paper,
//         border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//         height: isMobile ? 300 : 350,
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <Typography
//         variant="subtitle2"
//         fontWeight="700"
//         sx={{ mb: 2, px: 1, color: "text.primary", fontSize: "0.85rem" }}
//       >
//         Plan Popularity (by Purchase Count)
//       </Typography>
//       <Box sx={{ flexGrow: 1, width: "100%", height: "100%", minHeight: 200 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             layout="vertical"
//             margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
//             barSize={isMobile ? 20 : 25}
//           >
//             <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={alpha(theme.palette.divider, 0.5)} />
//             <XAxis type="number" hide />
//             <YAxis
//               dataKey="planName"
//               type="category"
//               axisLine={false}
//               tickLine={false}
//               width={isMobile ? 70 : 100}
//               tick={{ fontSize: isMobile ? 9 : 11, fontWeight: 600, fill: theme.palette.text.secondary }}
//             />
//             <Tooltip
//               cursor={{ fill: alpha(theme.palette.primary.main, 0.05) }}
//               contentStyle={{
//                 borderRadius: "12px",
//                 border: "none",
//                 boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
//                 backgroundColor: theme.palette.background.paper,
//                 fontSize: "12px",
//               }}
//               formatter={(value) => [`${value} Purchases`, "Count"]}
//             />
//             <Bar
//               dataKey="purchaseCount"
//               radius={[0, 10, 10, 0]}
//               animationDuration={1500}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </Box>
//     </Paper>
//   );
// };

// const SuperAdminDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
//   // Sorting states
//   const [sortBy, setBy] = useState("date");
//   const [sortOrder, setOrder] = useState("desc");

//   // Debouncing effect for search
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery);
//     }, 400);

//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // Safe Redux state access
//   const userCounts = useSelector((state) => state.user?.userCounts || {});
//   const expiringUsers = useSelector((state) => state.plan?.expiringUsers || []);
//   const popularPlans = useSelector((state) => state.plan?.popularPlans || []);
//   const { revenueSummary } = useSelector(
//     (state) => state.payment || {}
//   );

//   // Initial Load (One-time)
//   useEffect(() => {
//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Sync data fetching when filters change
//   useEffect(() => {
//     const commonParams = { 
//       startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "", 
//       endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
//       sortBy,
//       sortOrder
//     };

//     // Global Stats (No Search Filter)
//     dispatch(getUserCounts(commonParams));
//     dispatch(getRevenueSummary(commonParams));
//     dispatch(getPopularPlans(commonParams));

//     // Expiring Plans List (Include Search Filter)
//     const expiringParams = { ...commonParams, search: debouncedSearchQuery };
//     dispatch(getUsersWithExpiringPlans(expiringParams));
//   }, [dispatch, startDate, endDate, debouncedSearchQuery, sortBy, sortOrder]);

//   const refreshData = () => {
//     setLastUpdated(new Date());
//     const commonParams = { 
//       startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "", 
//       endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
//       sortBy,
//       sortOrder
//     };
    
//     dispatch(getUserCounts(commonParams));
//     dispatch(getRevenueSummary(commonParams));
//     dispatch(getPopularPlans(commonParams));
    
//     const expiringParams = { ...commonParams, search: debouncedSearchQuery };
//     dispatch(getUsersWithExpiringPlans(expiringParams));
//   };

//   const clearFilters = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setSearchQuery("");
//   };

//   const handleSortChange = (field, order) => {
//     setBy(field);
//     setOrder(order);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter expiring users by search query (Frontend Fallback)
//   const filteredExpiringUsers = useMemo(() => {
//     if (!debouncedSearchQuery) return expiringUsers;
//     const lowerQuery = debouncedSearchQuery.toLowerCase();
//     return expiringUsers.filter(user => 
//       user.userName?.toLowerCase().includes(lowerQuery) || 
//       user.userEmail?.toLowerCase().includes(lowerQuery) ||
//       user.planName?.toLowerCase().includes(lowerQuery) ||
//       user.userMobileNo?.toString().includes(lowerQuery)
//     );
//   }, [expiringUsers, debouncedSearchQuery]);

//   // Get only the first 10 users for the dashboard preview
//   const recentExpiringUsers = filteredExpiringUsers.slice(0, 10);

//   // User Stats with memoization to maintain stable references
//   const userStats = useMemo(() => [
//     {
//       key: "activeAdmins",
//       label: "Active Admins",
//       count: userCounts?.activeAdmins || 0,
//       icon: <FaUserShield />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
//     },
//     {
//       key: "inactiveAdmins",
//       label: "Inactive Admins",
//       count: userCounts?.inactiveAdmins || 0,
//       icon: <FaUserTimes />,
//       bgColor: alpha(theme.palette.text.secondary, 0.1),
//       iconColor: theme.palette.text.secondary,
//     },
//     {
//       key: "allActiveUsers",
//       label: "All Active Users",
//       count: userCounts?.allActiveUsers || 0,
//       icon: <FaUserCheck />,
//       bgColor: alpha("#22C55E", 0.1),
//       iconColor: "#22C55E",
//     },
//     {
//       key: "allInactiveUsers",
//       label: "All Inactive Users",
//       count: userCounts?.allInactiveUsers || 0,
//       icon: <FaUsers />,
//       bgColor: alpha(theme.palette.secondary.main, 0.1),
//       iconColor: theme.palette.secondary.main,
//     },
//   ], [userCounts, theme]);

//   // Animation variants moved outside to maintain stable references
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

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5 },
//     },
//   };

//   // Stats Cards Component - Memoized to prevent redundant renders
//   const StatsCards = memo(({ userStats, isSmallMobile, isMobile, isTablet }) => {
//     const theme = useTheme();

//     // Get grid columns based on screen size
//     const getGridColumns = () => {
//       if (isSmallMobile) return 12;
//       if (isMobile) return 12;
//       if (isTablet) return 6;
//       return 3;
//     };

//     return (
//       <Grid
//         container
//         spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
//         sx={{ mb: isMobile ? 1.5 : 2 }}
//       >
//         {userStats.map((stat, index) => (
//           <Grid item xs={getGridColumns()} key={stat.key || index}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                 background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                 border: "1px solid",
//                 borderColor: alpha(stat.iconColor, 0.2),
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 position: "relative",
//                 overflow: "hidden",
//                 height: '100%',
//                 minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
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
//                 "&:hover": {
//                   transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
//                   boxShadow: !isMobile ? `0 12px 20px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
//                   borderColor: stat.iconColor,
//                 },
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
//                       variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
//                       fontWeight="700"
//                       sx={{
//                         mb: 0.15,
//                         color: 'text.primary',
//                         fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.5rem' : isTablet ? '1.7rem' : '1.9rem',
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {stat.count}
//                     </Typography>
//                     <Typography
//                       variant="caption"
//                       color="text.secondary"
//                       sx={{
//                         fontWeight: 500,
//                         fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//                       }}
//                     >
//                       {stat.label}
//                     </Typography>
//                   </Box>
//                   <Avatar
//                     sx={{
//                       bgcolor: alpha(stat.iconColor, 0.1),
//                       color: stat.iconColor,
//                       width: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                       height: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                       transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                       boxShadow: `0 4px 8px -3px ${alpha(stat.iconColor, 0.2)}`,
//                       '& svg': {
//                         fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
//                       },
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
//                   height: 2.5,
//                   background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
//                   opacity: 0.8,
//                 }}
//               />
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     );
//   });

//   // Revenue Card Component - Memoized to prevent redundant renders
//   const RevenueCard = memo(({ revenueSummary, isSmallMobile, isMobile, isTablet }) => {
//     const theme = useTheme();
//     return (
//       <Paper
//         elevation={0}
//         sx={{
//           p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//           borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//           height: '100%',
//           minHeight: isSmallMobile ? 120 : isMobile ? 130 : isTablet ? 140 : 150,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             right: 0,
//             width: isSmallMobile ? "80px" : isMobile ? "90px" : isTablet ? "100px" : "110px",
//             height: isSmallMobile ? "80px" : isMobile ? "90px" : isTablet ? "100px" : "110px",
//             background: `radial-gradient(circle, ${alpha("#ffffff", 0.2)} 0%, transparent 70%)`,
//             borderRadius: "50%",
//             transform: "translate(50%, -50%)",
//           },
//         }}
//       >
//         {/* Header Section */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: (isMobile || isTablet) ? "column" : "row",
//           justifyContent: "space-between",
//           alignItems: (isMobile || isTablet) ? "flex-start" : "center",
//           mb: (isMobile || isTablet) ? 0.8 : 1.5,
//           gap: (isMobile || isTablet) ? 0.5 : 0,
//         }}>
//           <Box>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 mb: 0.5,
//                 fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//               }}
//             >
//               Total Revenue
//             </Typography>
//             <Typography
//               variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
//               fontWeight="700"
//               sx={{
//                 fontSize: isSmallMobile ? '1rem' : isMobile ? '1.2rem' : isTablet ? '1.4rem' : '1.6rem',
//                 lineHeight: 1.2,
//               }}
//             >
//               {revenueSummary?.totalRevenue > 0
//                 ? `₹${revenueSummary?.totalRevenue.toLocaleString()}`
//                 : "₹0"}
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
//             <Chip
//               label={`+${revenueSummary?.growthPercentage > 0
//                 ? revenueSummary?.growthPercentage.toLocaleString()
//                 : "0"}%`}
//               size="small"
//               icon={<FaArrowUp size={isSmallMobile ? 6 : 8} />}
//               sx={{
//                 bgcolor: alpha("#22c55e", 0.2),
//                 color: "#22c55e",
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.65rem',
//                 mb: 0.5,
//                 height: isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 20,
//               }}
//             />
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 display: "block",
//                 fontSize: isSmallMobile ? '0.45rem' : isMobile ? '0.5rem' : isTablet ? '0.55rem' : '0.55rem',
//               }}
//             >
//               This Month
//             </Typography>
//           </Box>
//         </Box>

//         {/* Monthly Summary Section */}
//         <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1} sx={{ mb: 1 }}>
//           <Grid item xs={6}>
         
//           </Grid>
//           <Grid item xs={6}>
       
//           </Grid>
//         </Grid>

//         <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1}>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 0.6 : isMobile ? 0.6 : isTablet ? 0.8 : 1,
//                 borderRadius: isSmallMobile ? 0.8 : 1,
//                 background: alpha("#ffffff", 0.05),
//                 border: `1px solid ${alpha("#22c55e", 0.2)}`,
//               }}
//             >
//               <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.6), fontSize: '0.55rem', display: 'block' }}>Monthly Revenue</Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
//                 ₹{revenueSummary?.lastMonthRevenue?.toLocaleString() || 0}
//               </Typography>
           
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 0.6 : isMobile ? 0.6 : isTablet ? 0.8 : 1,
//                 borderRadius: isSmallMobile ? 0.8 : 1,
//                 background: alpha("#ffffff", 0.05),
//                 border: `1px solid ${alpha("#F59E0B", 0.2)}`,
//               }}
//             >
//               <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.6), fontSize: '0.55rem', display: 'block' }}>Monthly Discount</Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
//                 ₹{revenueSummary?.lastMonthDiscount?.toLocaleString() || 0}
//               </Typography>
            
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     );
//   });


//   // If first render loader is active, show skeletons for everything except title and refresh button
//   if (showFirstRenderLoader) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//           width: "100%",
//           overflowX: "hidden",
//           position: "relative",
//           py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//           px: { xs: 0, sm: 0, md: 0 },
//         }}
//       >
//         <Container
//           maxWidth="xl"
//           disableGutters={isMobile}
//           sx={{
//             px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//           }}
//         >
//           {/* Header Section with Title and Refresh Button */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 1.5,
//             }}
//           >
//             <Typography
//               variant={isMobile ? "body1" : "h6"}
//               fontWeight="600"
//               color={theme.palette.primary.main}
//               gutterBottom
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: {
//                   xs: '0.9rem',      // 14px on mobile
//                   sm: '1.1rem',       // 18px on small tablets
//                   md: '1.3rem',       // 21px on tablets
//                   lg: '1.5rem',       // 24px on desktops
//                   xl: '1.7rem'        // 27px on large screens
//                 },
//               }}
//             >
//               Super Admin Dashboard
//             </Typography>
//             <IconButton size="small" sx={{ width: 28, height: 28 }}>
//               <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//             </IconButton>
//           </Box>

//           {/* Tracking Overview Section Skeleton */}
//           <Box sx={{
//             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//           }}>
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               flexWrap: "wrap",
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <FaChartLine style={{
//                   color: theme.palette.primary.main,
//                   fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//                 }} />
//                 <Typography
//                   variant={isSmallMobile ? "caption" : "body2"}
//                   fontWeight="600"
//                   color="text.primary"
//                   sx={{
//                     fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Stats Cards Skeleton */}
//             <Grid
//               container
//               spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
//               sx={{ mb: isMobile ? 1.5 : 2 }}
//             >
//               {[1, 2, 3, 4].map((item) => (
//                 <StatsCardSkeleton
//                   key={item}
//                   isSmallMobile={isSmallMobile}
//                   isMobile={isMobile}
//                   isTablet={isTablet}
//                 />
//               ))}
//             </Grid>
//           </Box>

//           {/* Revenue Overview Section Skeleton - Moved up */}
//           <Box sx={{
//             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//           }}>
//             <Box sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.5,
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <FaRupeeSign style={{
//                 color: theme.palette.primary.main,
//                 fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//               }} />
//               <Typography
//                 variant={isSmallMobile ? "caption" : "body2"}
//                 fontWeight="600"
//                 color="text.primary"
//                 sx={{
//                   fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                 }}
//               >
//                 Revenue Overview
//               </Typography>
//             </Box>

//             <RevenueCardSkeleton
//               isSmallMobile={isSmallMobile}
//               isMobile={isMobile}
//               isTablet={isTablet}
//             />
//           </Box>

//           {/* Expiring Plans Section Skeleton */}
//           <Box sx={{
//             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//           }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//               <Typography variant="body2" fontWeight="600">Recent Expiring Plans</Typography>
//               <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 2 }} />
//             </Box>
//             <ExpiringPlansTableSkeleton
//               isSmallMobile={isSmallMobile}
//               isMobile={isMobile}
//               isTablet={isTablet}
//             />
//           </Box>

//         </Container>

//         {/* CSS for animations */}
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//         width: "100%",
//         overflowX: "hidden",
//         position: "relative",
//         py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//         px: { xs: 0, sm: 0, md: 0 },
//       }}
//     >
//       <Container
//         maxWidth="xl"
//         disableGutters={isMobile}
//         sx={{
//           px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//         }}
//       >
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header Section */}
//           <motion.div variants={itemVariants}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 1.5,
//               }}
//             >
//               <Typography
//                 variant={isMobile ? "body1" : "h6"}
//                 fontWeight="800"
//                 color={theme.palette.primary.main}
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: {
//                     xs: '0.9rem',      // 14px on mobile
//                     sm: '1.1rem',       // 18px on small tablets
//                     md: '1.3rem',       // 21px on tablets
//                     lg: '1.5rem',       // 24px on desktops
//                     xl: '1.7rem'        // 27px on large screens
//                   },
//                 }}
//               >
//                 Super Admin Dashboard
//               </Typography>
 
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <IconButton size="small" onClick={refreshData} sx={{ width: 34, height: 34, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
//                   <RefreshIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
//                 </IconButton>
//               </Box>
//             </Box>

//             {/* Global Search and Filter Bar */}
//             {/* <Box sx={{ mb: 2.5 }}>
//               <SearchFilter
//                 searchQuery={searchQuery}
//                 setSearchQuery={handleSearchChange}
//                 resultsCount={filteredExpiringUsers.length}
//                 isMobile={isMobile}
//                 isTablet={isTablet}
//                 isSmallMobile={isSmallMobile}
//                 startDate={startDate}
//                 setStartDate={setStartDate}
//                 endDate={endDate}
//                 setEndDate={setEndDate}
//                 onApplyDateFilter={() => {}} // Controlled via useEffect
//                 onClearDateFilter={clearFilters}
//                 isFilterActive={Boolean(startDate || endDate)}
//                 sortBy={sortBy}
//                 sortOrder={sortOrder}
//                 onSortChange={handleSortChange}
//                 hideResults={true}
//               />
//             </Box> */}
//           </motion.div>

//           {/* Tracking Overview Section - Animation Removed */}
//           <Box
//             component="section"
//             sx={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               flexWrap: "wrap",
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <FaChartLine style={{
//                   color: theme.palette.primary.main,
//                   fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//                 }} />
//                 <Typography
//                   variant={isSmallMobile ? "caption" : "body2"}
//                   fontWeight="600"
//                   color="text.primary"
//                   sx={{
//                     fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>

//               <Chip
//                 label="Live"
//                 size="small"
//                 icon={<FaChartLine size={isSmallMobile ? 6 : 8} />}
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   fontWeight: 600,
//                   fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.7rem',
//                   height: isSmallMobile ? 18 : isMobile ? 20 : isTablet ? 22 : 24,
//                 }}
//               />
//             </Box>

//             <StatsCards
//               userStats={userStats}
//               isSmallMobile={isSmallMobile}
//               isMobile={isMobile}
//               isTablet={isTablet}
//             />
//           </Box>

//           {/* Revenue Overview Section - Moved up */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               px: isSmallMobile ? 0.5 : 0,
//               flexWrap: "wrap",
//               gap: 1
//             }}>
//               <Box sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 0.5,
//               }}>
//                 <FaRupeeSign style={{
//                   color: theme.palette.primary.main,
//                   fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//                 }} />
//                 <Typography
//                   variant={isSmallMobile ? "caption" : "body2"}
//                   fontWeight="600"
//                   color="text.primary"
//                   sx={{
//                     fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                   }}
//                 >
//                   Revenue Overview
//                 </Typography>
//               </Box>
//             </Box>

//             <motion.div variants={cardVariants}>
//               <RevenueCard
//                 revenueSummary={revenueSummary}
//                 isSmallMobile={isSmallMobile}
//                 isMobile={isMobile}
//                 isTablet={isTablet}
//               />
//             </motion.div>
//           </motion.section>

//           {/* Popular Plans Section - NEW */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 0.5,
//               mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <FaChartLine style={{
//                 color: theme.palette.primary.main,
//                 fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
//               }} />
//               <Typography
//                 variant={isSmallMobile ? "caption" : "body2"}
//                 fontWeight="600"
//                 color="text.primary"
//                 sx={{
//                   fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
//                 }}
//               >
//                 Popular Plans Overview
//               </Typography>
//             </Box>

//             <motion.div variants={cardVariants}>
//               <PopularPlansChart data={popularPlans} isMobile={isMobile} />
//             </motion.div>
//           </motion.section>

//           {/* Expiring Plans Section - Only showing 10 recent users with View All button */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
//                 Recent Expiring Plans (Last 7 Days)
//               </Typography>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={() => navigate('/admin/expiringplanspage')}
//                 endIcon={<VisibilityIcon />}
//                 sx={{
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   color: theme.palette.primary.main,
//                   fontSize: '0.65rem',
//                   py: 0.3,
//                   px: 1,
//                   '&:hover': {
//                     borderColor: theme.palette.primary.main,
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//               >
//                 View All ({expiringUsers.length})
//               </Button>
//             </Box>
//             <ExpiringPlansTable data={recentExpiringUsers} />
//           </motion.section>
//         </motion.div>
//       </Container>

//       {/* CSS for animations */}
//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default SuperAdminDashboard;

=======
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
import React, { useEffect, useState, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Container,
  alpha,
  useTheme,
  useMediaQuery,
  Skeleton,
  Button,
  TextField,
  Stack,
<<<<<<< HEAD
  Popover,
  FormControl,
  InputLabel,
  OutlinedInput,
=======
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  FilterAlt as FilterAltIcon,
  Clear as ClearIcon,
<<<<<<< HEAD
  CalendarToday as CalendarIcon,
=======
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
  FaChartLine,
  FaRupeeSign,
  FaArrowDown,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";
import { getUserCounts } from "../../redux/slices/userSlice";
import { getUsersWithExpiringPlans, getPopularPlans } from "../../redux/slices/planSlice";
import { getRevenueSummary } from "../../redux/slices/paymentSlice";
import ExpiringPlansTable from "../../components/ExpiringPlansTable";
<<<<<<< HEAD
// import SearchFilter from "../../components/SearchFilter";
=======
import SearchFilter from "../../components/SearchFilter";
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
import moment from "moment";

// Stats Card Skeleton Component - Smaller height
const StatsCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
  const theme = useTheme();

  // Get grid columns based on screen size
  const getGridColumns = () => {
    if (isSmallMobile) return 12;
    if (isMobile) return 12;
    if (isTablet) return 6;
    return 3;
  };

  return (
    <Grid item xs={getGridColumns()}>
      <Paper
        elevation={0}
        sx={{
          p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
          borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          height: '100%',
          minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: "relative",
          overflow: "hidden",
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
              <Skeleton
                variant="text"
                width={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60}
                height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26}
                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }}
              />
              <Skeleton
                variant="text"
                width={isSmallMobile ? 60 : isMobile ? 65 : isTablet ? 70 : 75}
                height={isSmallMobile ? 10 : isMobile ? 11 : isTablet ? 12 : 13}
                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              />
            </Box>
            <Skeleton
              variant="circular"
              width={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
              height={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 2.5,
            background: alpha(theme.palette.primary.main, 0.1),
          }}
        />
      </Paper>
    </Grid>
  );
};

// Revenue Card Skeleton Component - Smaller height
const RevenueCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
        borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: "white",
        position: "relative",
        overflow: "hidden",
        height: '100%',
        minHeight: isSmallMobile ? 120 : isMobile ? 130 : isTablet ? 140 : 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header Section Skeleton */}
      <Box sx={{
        display: "flex",
        flexDirection: (isMobile || isTablet) ? "column" : "row",
        justifyContent: "space-between",
        alignItems: (isMobile || isTablet) ? "flex-start" : "center",
        mb: (isMobile || isTablet) ? 0.8 : 1.5,
        gap: (isMobile || isTablet) ? 0.5 : 0,
      }}>
        <Box>
          <Skeleton
            variant="text"
            width={70}
            height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12}
            sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }}
          />
          <Skeleton
            variant="text"
            width={isSmallMobile ? 90 : isMobile ? 100 : isTablet ? 110 : 120}
            height={isSmallMobile ? 18 : isMobile ? 19 : isTablet ? 20 : 22}
            sx={{ bgcolor: alpha("#ffffff", 0.2) }}
          />
        </Box>
        <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
          <Skeleton
            variant="rounded"
            width={50}
            height={18}
            sx={{
              bgcolor: alpha("#ffffff", 0.2),
              borderRadius: 2,
              mb: 0.5
            }}
          />
          <Skeleton
            variant="text"
            width={45}
            height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
            sx={{ bgcolor: alpha("#ffffff", 0.2) }}
          />
        </Box>
      </Box>

      {/* Monthly Summary Section Skeleton */}
      <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1}>
        <Grid item xs={6}>
          <Box
            sx={{
              p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
              borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
              background: alpha("#ffffff", 0.08),
              height: '100%',
              minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
              <Box>
                <Skeleton
                  variant="text"
                  width={isSmallMobile ? 35 : isMobile ? 40 : isTablet ? 45 : 50}
                  height={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15}
                  sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
                />
                <Skeleton
                  variant="text"
                  width={isSmallMobile ? 25 : isMobile ? 28 : isTablet ? 30 : 32}
                  height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
                  sx={{ bgcolor: alpha("#ffffff", 0.2) }}
                />
              </Box>
              <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
              borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
              background: alpha("#ffffff", 0.08),
              height: '100%',
              minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
              <Box>
                <Skeleton
                  variant="text"
                  width={isSmallMobile ? 35 : isMobile ? 40 : isTablet ? 45 : 50}
                  height={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15}
                  sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
                />
                <Skeleton
                  variant="text"
                  width={isSmallMobile ? 25 : isMobile ? 28 : isTablet ? 30 : 32}
                  height={isSmallMobile ? 7 : isMobile ? 8 : isTablet ? 9 : 10}
                  sx={{ bgcolor: alpha("#ffffff", 0.2) }}
                />
              </Box>
              <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Expiring Plans Table Skeleton - Smaller
const ExpiringPlansTableSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
        borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
      }}
    >
      {/* Header */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
        pb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
        borderBottom: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
      }}>
        <Box>
          <Skeleton variant="text" width={100} height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
          <Skeleton variant="text" width={140} height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </Box>
        <Skeleton variant="rounded" width={70} height={isSmallMobile ? 22 : isMobile ? 24 : isTablet ? 26 : 28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </Box>

      {/* Table Header Skeleton */}
      <Box sx={{
        display: "flex",
        bgcolor: alpha(theme.palette.primary.main, 0.05),
        p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
        borderRadius: 0.8,
        mb: 0.8
      }}>
        <Skeleton variant="text" width={35} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width={60} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </Box>

      {/* Table Rows Skeleton */}
      {[1, 2, 3].map((item, index) => (
        <Box key={item} sx={{
          display: "flex",
          p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
          borderBottom: index < 2 ? "1px solid" : "none",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
        }}>
          <Skeleton variant="text" width={35} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width={60} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="rounded" width={60} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </Box>
      ))}
    </Paper>
  );
};

// Popular Plans Chart Component
const PopularPlansChart = ({ data, isMobile }) => {
  const theme = useTheme();

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <Typography color="text.secondary">No purchase data available</Typography>
      </Paper>
    );
  }

  // Predefined colors for the bars
  const COLORS = [
    theme.palette.primary.main,
    "#22C55E", // Success Green
    "#F59E0B", // Amber/Orange
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#3B82F6", // Blue
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2, md: 3 },
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        height: isMobile ? 300 : 350,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="subtitle2"
        fontWeight="700"
        sx={{ mb: 2, px: 1, color: "text.primary", fontSize: "0.85rem" }}
      >
        Plan Popularity (by Purchase Count)
      </Typography>
      <Box sx={{ flexGrow: 1, width: "100%", height: "100%", minHeight: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            barSize={isMobile ? 20 : 25}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke={alpha(theme.palette.divider, 0.5)} />
            <XAxis type="number" hide />
            <YAxis
              dataKey="planName"
              type="category"
              axisLine={false}
              tickLine={false}
              width={isMobile ? 70 : 100}
              tick={{ fontSize: isMobile ? 9 : 11, fontWeight: 600, fill: theme.palette.text.secondary }}
            />
            <Tooltip
              cursor={{ fill: alpha(theme.palette.primary.main, 0.05) }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                backgroundColor: theme.palette.background.paper,
                fontSize: "12px",
              }}
              formatter={(value) => [`${value} Purchases`, "Count"]}
            />
            <Bar
              dataKey="purchaseCount"
              radius={[0, 10, 10, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
<<<<<<< HEAD
  // Date filter popover state
  const [dateFilterAnchorEl, setDateFilterAnchorEl] = useState(null);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  
=======
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
  // Sorting states
  const [sortBy, setBy] = useState("date");
  const [sortOrder, setOrder] = useState("desc");

  // Debouncing effect for search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Safe Redux state access
  const userCounts = useSelector((state) => state.user?.userCounts || {});
  const expiringUsers = useSelector((state) => state.plan?.expiringUsers || []);
  const popularPlans = useSelector((state) => state.plan?.popularPlans || []);
  const { revenueSummary } = useSelector(
    (state) => state.payment || {}
  );

  // Initial Load (One-time)
  useEffect(() => {
    // Set first render loader to false after 1 second
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Sync data fetching when filters change
  useEffect(() => {
    const commonParams = { 
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "", 
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
      sortBy,
      sortOrder
    };

    // Global Stats (No Search Filter)
    dispatch(getUserCounts(commonParams));
    dispatch(getRevenueSummary(commonParams));
    dispatch(getPopularPlans(commonParams));

    // Expiring Plans List (Include Search Filter)
    const expiringParams = { ...commonParams, search: debouncedSearchQuery };
    dispatch(getUsersWithExpiringPlans(expiringParams));
  }, [dispatch, startDate, endDate, debouncedSearchQuery, sortBy, sortOrder]);

  const refreshData = () => {
    setLastUpdated(new Date());
    const commonParams = { 
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "", 
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
      sortBy,
      sortOrder
    };
    
    dispatch(getUserCounts(commonParams));
    dispatch(getRevenueSummary(commonParams));
    dispatch(getPopularPlans(commonParams));
    
    const expiringParams = { ...commonParams, search: debouncedSearchQuery };
    dispatch(getUsersWithExpiringPlans(expiringParams));
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
  };

  const handleSortChange = (field, order) => {
    setBy(field);
    setOrder(order);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

<<<<<<< HEAD
  // Date filter handlers
  const handleDateFilterClick = (event) => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setDateFilterAnchorEl(event.currentTarget);
  };

  const handleDateFilterClose = () => {
    setDateFilterAnchorEl(null);
  };

  // Get max date (today) for restricting future dates
  const getMaxDate = () => {
    return moment().format("YYYY-MM-DD");
  };

  // Handle start date change with validation
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value ? moment(e.target.value).toDate() : null;
    
    // If selected date is in the future, don't allow it
    if (selectedDate && moment(selectedDate).isAfter(moment(), 'day')) {
      return;
    }
    
    setTempStartDate(selectedDate);
    
    // If end date exists and is before start date, clear end date
    if (tempEndDate && selectedDate && moment(tempEndDate).isBefore(selectedDate, 'day')) {
      setTempEndDate(null);
    }
  };

  // Handle end date change with validation
  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value ? moment(e.target.value).toDate() : null;
    
    // If selected date is in the future, don't allow it
    if (selectedDate && moment(selectedDate).isAfter(moment(), 'day')) {
      return;
    }
    
    // If start date exists and selected date is before start date, don't allow
    if (tempStartDate && selectedDate && moment(selectedDate).isBefore(tempStartDate, 'day')) {
      return;
    }
    
    setTempEndDate(selectedDate);
  };

  const handleApplyDateFilter = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    handleDateFilterClose();
  };

  const handleClearDateFilter = () => {
    setTempStartDate(null);
    setTempEndDate(null);
    setStartDate(null);
    setEndDate(null);
    handleDateFilterClose();
  };

  // Get date range display text
  const getDateRangeText = () => {
    if (startDate && endDate) {
      return `${moment(startDate).format("DD MMM YYYY")} - ${moment(endDate).format("DD MMM YYYY")}`;
    }
    if (startDate) {
      return `From ${moment(startDate).format("DD MMM YYYY")}`;
    }
    if (endDate) {
      return `Until ${moment(endDate).format("DD MMM YYYY")}`;
    }
    return "Select Date Range";
  };

=======
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
  // Filter expiring users by search query (Frontend Fallback)
  const filteredExpiringUsers = useMemo(() => {
    if (!debouncedSearchQuery) return expiringUsers;
    const lowerQuery = debouncedSearchQuery.toLowerCase();
    return expiringUsers.filter(user => 
      user.userName?.toLowerCase().includes(lowerQuery) || 
      user.userEmail?.toLowerCase().includes(lowerQuery) ||
      user.planName?.toLowerCase().includes(lowerQuery) ||
      user.userMobileNo?.toString().includes(lowerQuery)
    );
  }, [expiringUsers, debouncedSearchQuery]);

  // Get only the first 10 users for the dashboard preview
  const recentExpiringUsers = filteredExpiringUsers.slice(0, 10);

  // User Stats with memoization to maintain stable references
  const userStats = useMemo(() => [
    {
      key: "activeAdmins",
      label: "Active Admins",
      count: userCounts?.activeAdmins || 0,
      icon: <FaUserShield />,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      iconColor: theme.palette.primary.main,
    },
    {
      key: "inactiveAdmins",
      label: "Inactive Admins",
      count: userCounts?.inactiveAdmins || 0,
      icon: <FaUserTimes />,
      bgColor: alpha(theme.palette.text.secondary, 0.1),
      iconColor: theme.palette.text.secondary,
    },
    {
      key: "allActiveUsers",
      label: "All Active Users",
      count: userCounts?.allActiveUsers || 0,
      icon: <FaUserCheck />,
      bgColor: alpha("#22C55E", 0.1),
      iconColor: "#22C55E",
    },
    {
      key: "allInactiveUsers",
      label: "All Inactive Users",
      count: userCounts?.allInactiveUsers || 0,
      icon: <FaUsers />,
      bgColor: alpha(theme.palette.secondary.main, 0.1),
      iconColor: theme.palette.secondary.main,
    },
  ], [userCounts, theme]);

  // Animation variants moved outside to maintain stable references
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  // Stats Cards Component - Memoized to prevent redundant renders
  const StatsCards = memo(({ userStats, isSmallMobile, isMobile, isTablet }) => {
    const theme = useTheme();

    // Get grid columns based on screen size
    const getGridColumns = () => {
      if (isSmallMobile) return 12;
      if (isMobile) return 12;
      if (isTablet) return 6;
      return 3;
    };

    return (
      <Grid
        container
        spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
        sx={{ mb: isMobile ? 1.5 : 2 }}
      >
        {userStats.map((stat, index) => (
          <Grid item xs={getGridColumns()} key={stat.key || index}>
            <Paper
              elevation={0}
              sx={{
                p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
                borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                border: "1px solid",
                borderColor: alpha(stat.iconColor, 0.2),
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                height: '100%',
                minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
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
                "&:hover": {
                  transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
                  boxShadow: !isMobile ? `0 12px 20px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
                  borderColor: stat.iconColor,
                },
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
                      variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
                      fontWeight="700"
                      sx={{
                        mb: 0.15,
                        color: 'text.primary',
                        fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.5rem' : isTablet ? '1.7rem' : '1.9rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.count}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: alpha(stat.iconColor, 0.1),
                      color: stat.iconColor,
                      width: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
                      height: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: `0 4px 8px -3px ${alpha(stat.iconColor, 0.2)}`,
                      '& svg': {
                        fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
                      },
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
                  height: 2.5,
                  background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
                  opacity: 0.8,
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  });

  // Revenue Card Component - Memoized to prevent redundant renders
  const RevenueCard = memo(({ revenueSummary, isSmallMobile, isMobile, isTablet }) => {
    const theme = useTheme();
    return (
      <Paper
        elevation={0}
        sx={{
          p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
          borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "white",
          position: "relative",
          overflow: "hidden",
          height: '100%',
          minHeight: isSmallMobile ? 120 : isMobile ? 130 : isTablet ? 140 : 150,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: isSmallMobile ? "80px" : isMobile ? "90px" : isTablet ? "100px" : "110px",
            height: isSmallMobile ? "80px" : isMobile ? "90px" : isTablet ? "100px" : "110px",
            background: `radial-gradient(circle, ${alpha("#ffffff", 0.2)} 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          },
        }}
      >
        {/* Header Section */}
        <Box sx={{
          display: "flex",
          flexDirection: (isMobile || isTablet) ? "column" : "row",
          justifyContent: "space-between",
          alignItems: (isMobile || isTablet) ? "flex-start" : "center",
          mb: (isMobile || isTablet) ? 0.8 : 1.5,
          gap: (isMobile || isTablet) ? 0.5 : 0,
        }}>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: alpha("#ffffff", 0.7),
                mb: 0.5,
                fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
              }}
            >
              Total Revenue
            </Typography>
            <Typography
              variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
              fontWeight="700"
              sx={{
                fontSize: isSmallMobile ? '1rem' : isMobile ? '1.2rem' : isTablet ? '1.4rem' : '1.6rem',
                lineHeight: 1.2,
              }}
            >
              {revenueSummary?.totalRevenue > 0
                ? `₹${revenueSummary?.totalRevenue.toLocaleString()}`
                : "₹0"}
            </Typography>
          </Box>
          <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
            <Chip
              label={`+${revenueSummary?.growthPercentage > 0
                ? revenueSummary?.growthPercentage.toLocaleString()
                : "0"}%`}
              size="small"
              icon={<FaArrowUp size={isSmallMobile ? 6 : 8} />}
              sx={{
                bgcolor: alpha("#22c55e", 0.2),
                color: "#22c55e",
                fontWeight: 600,
                fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.65rem',
                mb: 0.5,
                height: isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 20,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: alpha("#ffffff", 0.7),
                display: "block",
                fontSize: isSmallMobile ? '0.45rem' : isMobile ? '0.5rem' : isTablet ? '0.55rem' : '0.55rem',
              }}
            >
              This Month
            </Typography>
          </Box>
        </Box>

        {/* Monthly Summary Section */}
        <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1} sx={{ mb: 1 }}>
          <Grid item xs={6}>
         
          </Grid>
          <Grid item xs={6}>
       
          </Grid>
        </Grid>

        <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1}>
          <Grid item xs={6}>
            <Box
              sx={{
                p: isSmallMobile ? 0.6 : isMobile ? 0.6 : isTablet ? 0.8 : 1,
                borderRadius: isSmallMobile ? 0.8 : 1,
                background: alpha("#ffffff", 0.05),
                border: `1px solid ${alpha("#22c55e", 0.2)}`,
              }}
            >
              <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.6), fontSize: '0.55rem', display: 'block' }}>Monthly Revenue</Typography>
              <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                ₹{revenueSummary?.lastMonthRevenue?.toLocaleString() || 0}
              </Typography>
<<<<<<< HEAD
=======
           
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: isSmallMobile ? 0.6 : isMobile ? 0.6 : isTablet ? 0.8 : 1,
                borderRadius: isSmallMobile ? 0.8 : 1,
                background: alpha("#ffffff", 0.05),
                border: `1px solid ${alpha("#F59E0B", 0.2)}`,
              }}
            >
              <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.6), fontSize: '0.55rem', display: 'block' }}>Monthly Discount</Typography>
              <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.75rem' }}>
                ₹{revenueSummary?.lastMonthDiscount?.toLocaleString() || 0}
              </Typography>
<<<<<<< HEAD
=======
            
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  });
<<<<<<< HEAD
=======

>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5

  // If first render loader is active, show skeletons for everything except title and refresh button
  if (showFirstRenderLoader) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          width: "100%",
          overflowX: "hidden",
          position: "relative",
          py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
          px: { xs: 0, sm: 0, md: 0 },
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters={isMobile}
          sx={{
            px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
          }}
        >
          {/* Header Section with Title and Refresh Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1.5,
            }}
          >
            <Typography
              variant={isMobile ? "body1" : "h6"}
              fontWeight="600"
              color={theme.palette.primary.main}
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: {
                  xs: '0.9rem',      // 14px on mobile
                  sm: '1.1rem',       // 18px on small tablets
                  md: '1.3rem',       // 21px on tablets
                  lg: '1.5rem',       // 24px on desktops
                  xl: '1.7rem'        // 27px on large screens
                },
              }}
            >
              Super Admin Dashboard
            </Typography>
            <IconButton size="small" sx={{ width: 28, height: 28 }}>
              <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
            </IconButton>
          </Box>

          {/* Tracking Overview Section Skeleton */}
          <Box sx={{
            marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
          }}>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
              flexWrap: "wrap",
              gap: 1,
              px: isSmallMobile ? 0.5 : 0,
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FaChartLine style={{
                  color: theme.palette.primary.main,
                  fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
                }} />
                <Typography
                  variant={isSmallMobile ? "caption" : "body2"}
                  fontWeight="600"
                  color="text.primary"
                  sx={{
                    fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
                  }}
                >
                  Tracking Overview
                </Typography>
              </Box>
            </Box>

            {/* Stats Cards Skeleton */}
            <Grid
              container
              spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
              sx={{ mb: isMobile ? 1.5 : 2 }}
            >
              {[1, 2, 3, 4].map((item) => (
                <StatsCardSkeleton
                  key={item}
                  isSmallMobile={isSmallMobile}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              ))}
            </Grid>
          </Box>

          {/* Revenue Overview Section Skeleton - Moved up */}
          <Box sx={{
            marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
          }}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
              px: isSmallMobile ? 0.5 : 0,
            }}>
              <FaRupeeSign style={{
                color: theme.palette.primary.main,
                fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
              }} />
              <Typography
                variant={isSmallMobile ? "caption" : "body2"}
                fontWeight="600"
                color="text.primary"
                sx={{
                  fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
                }}
              >
                Revenue Overview
              </Typography>
            </Box>

            <RevenueCardSkeleton
              isSmallMobile={isSmallMobile}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </Box>

          {/* Expiring Plans Section Skeleton */}
          <Box sx={{
            marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" fontWeight="600">Recent Expiring Plans</Typography>
              <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 2 }} />
            </Box>
            <ExpiringPlansTableSkeleton
              isSmallMobile={isSmallMobile}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </Box>

        </Container>

        {/* CSS for animations */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        width: "100%",
        overflowX: "hidden",
        position: "relative",
        py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
        px: { xs: 0, sm: 0, md: 0 },
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters={isMobile}
        sx={{
          px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                variant={isMobile ? "body1" : "h6"}
                fontWeight="800"
                color={theme.palette.primary.main}
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: {
                    xs: '0.9rem',      // 14px on mobile
                    sm: '1.1rem',       // 18px on small tablets
                    md: '1.3rem',       // 21px on tablets
                    lg: '1.5rem',       // 24px on desktops
                    xl: '1.7rem'        // 27px on large screens
                  },
                }}
              >
                Super Admin Dashboard
              </Typography>
 
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={refreshData} sx={{ width: 34, height: 34, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                  <RefreshIcon sx={{ fontSize: 20, color: theme.palette.primary.main }} />
                </IconButton>
              </Box>
<<<<<<< HEAD
            </Box>
          </motion.div>

          {/* Tracking Overview Section - With Date Filter Button */}
=======
            </Box>

            {/* Global Search and Filter Bar */}
            <Box sx={{ mb: 2.5 }}>
              <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
                resultsCount={filteredExpiringUsers.length}
                isMobile={isMobile}
                isTablet={isTablet}
                isSmallMobile={isSmallMobile}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                onApplyDateFilter={() => {}} // Controlled via useEffect
                onClearDateFilter={clearFilters}
                isFilterActive={Boolean(startDate || endDate)}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                hideResults={true}
              />
            </Box>
          </motion.div>

          {/* Tracking Overview Section - Animation Removed */}
>>>>>>> a95cb86f62d5335f948b57082f04b14af551a3a5
          <Box
            component="section"
            sx={{
              marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
            }}
          >
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
              flexWrap: "wrap",
              gap: 1,
              px: isSmallMobile ? 0.5 : 0,
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FaChartLine style={{
                  color: theme.palette.primary.main,
                  fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
                }} />
                <Typography
                  variant={isSmallMobile ? "caption" : "body2"}
                  fontWeight="600"
                  color="text.primary"
                  sx={{
                    fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
                  }}
                >
                  Tracking Overview
                </Typography>
              </Box>

              {/* Date Filter Button - Replacing Live Chip */}
              <Button
                variant="outlined"
                size="small"
                onClick={handleDateFilterClick}
                startIcon={<CalendarIcon />}
                endIcon={startDate || endDate ? <ClearIcon onClick={(e) => { e.stopPropagation(); handleClearDateFilter(); }} sx={{ fontSize: 14 }} /> : null}
                sx={{
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: theme.palette.primary.main,
                  fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
                  py: 0.5,
                  px: 1.5,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                {getDateRangeText()}
              </Button>
            </Box>

            <StatsCards
              userStats={userStats}
              isSmallMobile={isSmallMobile}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </Box>

          {/* Revenue Overview Section - Moved up */}
          <motion.section
            variants={itemVariants}
            style={{
              marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
            }}
          >
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
              px: isSmallMobile ? 0.5 : 0,
              flexWrap: "wrap",
              gap: 1
            }}>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}>
                <FaRupeeSign style={{
                  color: theme.palette.primary.main,
                  fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
                }} />
                <Typography
                  variant={isSmallMobile ? "caption" : "body2"}
                  fontWeight="600"
                  color="text.primary"
                  sx={{
                    fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
                  }}
                >
                  Revenue Overview
                </Typography>
              </Box>
            </Box>

            <motion.div variants={cardVariants}>
              <RevenueCard
                revenueSummary={revenueSummary}
                isSmallMobile={isSmallMobile}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            </motion.div>
          </motion.section>

          {/* Popular Plans Section - NEW */}
          <motion.section
            variants={itemVariants}
            style={{
              marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
            }}
          >
            <Box sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
              px: isSmallMobile ? 0.5 : 0,
            }}>
              <FaChartLine style={{
                color: theme.palette.primary.main,
                fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
              }} />
              <Typography
                variant={isSmallMobile ? "caption" : "body2"}
                fontWeight="600"
                color="text.primary"
                sx={{
                  fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
                }}
              >
                Popular Plans Overview
              </Typography>
            </Box>

            <motion.div variants={cardVariants}>
              <PopularPlansChart data={popularPlans} isMobile={isMobile} />
            </motion.div>
          </motion.section>

          {/* Expiring Plans Section - Only showing 10 recent users with View All button */}
          <motion.section
            variants={itemVariants}
            style={{
              marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.8rem' }}>
                Recent Expiring Plans (Last 7 Days)
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate('/admin/expiringplanspage')}
                endIcon={<VisibilityIcon />}
                sx={{
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: theme.palette.primary.main,
                  fontSize: '0.65rem',
                  py: 0.3,
                  px: 1,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                View All ({expiringUsers.length})
              </Button>
            </Box>
            <ExpiringPlansTable data={recentExpiringUsers} />
          </motion.section>
        </motion.div>
      </Container>

      {/* Date Filter Popover with Future Date Restrictions */}
      <Popover
        open={Boolean(dateFilterAnchorEl)}
        anchorEl={dateFilterAnchorEl}
        onClose={handleDateFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: { xs: '90%', sm: 320 },
            maxWidth: '90%',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 2 }}>
          Filter by Date Range
        </Typography>
        
        <Stack spacing={2}>
          <TextField
            label="Start Date"
            type="date"
            value={tempStartDate ? moment(tempStartDate).format("YYYY-MM-DD") : ""}
            onChange={handleStartDateChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: getMaxDate() // Restrict future dates
            }}
            size="small"
            fullWidth
            helperText={tempStartDate && moment(tempStartDate).isAfter(moment(), 'day') ? "Cannot select future date" : ""}
            error={tempStartDate && moment(tempStartDate).isAfter(moment(), 'day')}
          />
          
          <TextField
            label="End Date"
            type="date"
            value={tempEndDate ? moment(tempEndDate).format("YYYY-MM-DD") : ""}
            onChange={handleEndDateChange}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              max: getMaxDate(), // Restrict future dates
              min: tempStartDate ? moment(tempStartDate).format("YYYY-MM-DD") : ""
            }}
            size="small"
            fullWidth
            helperText={
              (tempEndDate && moment(tempEndDate).isAfter(moment(), 'day')) 
                ? "Cannot select future date" 
                : (tempStartDate && tempEndDate && moment(tempEndDate).isBefore(tempStartDate, 'day'))
                ? "End date cannot be before start date"
                : ""
            }
            error={
              (tempEndDate && moment(tempEndDate).isAfter(moment(), 'day')) ||
              (tempStartDate && tempEndDate && moment(tempEndDate).isBefore(tempStartDate, 'day'))
            }
          />
          
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1 }}>
            <Button
              size="small"
              onClick={handleClearDateFilter}
              sx={{ textTransform: 'none' }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleApplyDateFilter}
              sx={{ textTransform: 'none' }}
              disabled={
                (tempStartDate && moment(tempStartDate).isAfter(moment(), 'day')) ||
                (tempEndDate && moment(tempEndDate).isAfter(moment(), 'day')) ||
                (tempStartDate && tempEndDate && moment(tempEndDate).isBefore(tempStartDate, 'day'))
              }
            >
              Apply
            </Button>
          </Box>
        </Stack>
      </Popover>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default SuperAdminDashboard;