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
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
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

// // Stats Card Skeleton Component
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
//           p: isSmallMobile ? 2 : isMobile ? 2.5 : isTablet ? 2.5 : 3,
//           borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           height: '100%',
//           minHeight: isSmallMobile ? 120 : isMobile ? 140 : isTablet ? 150 : 160,
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
//             gap: isSmallMobile ? 1 : 0,
//           }}>
//             <Box>
//               <Skeleton 
//                 variant="text" 
//                 width={isSmallMobile ? 60 : isMobile ? 70 : isTablet ? 80 : 100} 
//                 height={isSmallMobile ? 32 : isMobile ? 36 : isTablet ? 40 : 48} 
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} 
//               />
//               <Skeleton 
//                 variant="text" 
//                 width={isSmallMobile ? 80 : isMobile ? 100 : isTablet ? 120 : 140} 
//                 height={isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18} 
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} 
//               />
//             </Box>
//             <Skeleton 
//               variant="circular" 
//               width={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60} 
//               height={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60} 
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
//             height: 4,
//             background: alpha(theme.palette.primary.main, 0.1),
//           }}
//         />
//       </Paper>
//     </Grid>
//   );
// };

// // Revenue Card Skeleton Component
// const RevenueCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isSmallMobile ? 2 : isMobile ? 2.5 : isTablet ? 2.5 : 3,
//         borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: "white",
//         position: "relative",
//         overflow: "hidden",
//         height: '100%',
//         minHeight: isSmallMobile ? 200 : isMobile ? 220 : isTablet ? 240 : 250,
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
//         mb: (isMobile || isTablet) ? 2 : 4,
//         gap: (isMobile || isTablet) ? 1 : 0,
//       }}>
//         <Box>
//           <Skeleton 
//             variant="text" 
//             width={100} 
//             height={isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18} 
//             sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 1 }} 
//           />
//           <Skeleton 
//             variant="text" 
//             width={isSmallMobile ? 120 : isMobile ? 150 : isTablet ? 180 : 200} 
//             height={isSmallMobile ? 24 : isMobile ? 28 : isTablet ? 32 : 40} 
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }} 
//           />
//         </Box>
//         <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
//           <Skeleton 
//             variant="rounded" 
//             width={80} 
//             height={24} 
//             sx={{ 
//               bgcolor: alpha("#ffffff", 0.2), 
//               borderRadius: 3,
//               mb: 1 
//             }} 
//           />
//           <Skeleton 
//             variant="text" 
//             width={60} 
//             height={isSmallMobile ? 10 : isMobile ? 12 : isTablet ? 14 : 16} 
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }} 
//           />
//         </Box>
//       </Box>

//       {/* Monthly Summary Section Skeleton */}
//       <Grid container spacing={isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 1.5 : 2}>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//               borderRadius: isSmallMobile ? 2 : isMobile ? 2 : isTablet ? 2.5 : 3,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 70 : isMobile ? 80 : isTablet ? 85 : 90,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton 
//                   variant="text" 
//                   width={isSmallMobile ? 60 : isMobile ? 70 : isTablet ? 80 : 100} 
//                   height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 24} 
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }} 
//                 />
//                 <Skeleton 
//                   variant="text" 
//                   width={isSmallMobile ? 40 : isMobile ? 50 : isTablet ? 60 : 70} 
//                   height={isSmallMobile ? 8 : isMobile ? 10 : isTablet ? 12 : 14} 
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }} 
//                 />
//               </Box>
//               <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//               borderRadius: isSmallMobile ? 2 : isMobile ? 2 : isTablet ? 2.5 : 3,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 70 : isMobile ? 80 : isTablet ? 85 : 90,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton 
//                   variant="text" 
//                   width={isSmallMobile ? 60 : isMobile ? 70 : isTablet ? 80 : 100} 
//                   height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 24} 
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }} 
//                 />
//                 <Skeleton 
//                   variant="text" 
//                   width={isSmallMobile ? 40 : isMobile ? 50 : isTablet ? 60 : 70} 
//                   height={isSmallMobile ? 8 : isMobile ? 10 : isTablet ? 12 : 14} 
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }} 
//                 />
//               </Box>
//               <Skeleton variant="circular" width={20} height={20} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Expiring Plans Table Skeleton
// const ExpiringPlansTableSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//         borderRadius: isSmallMobile ? 2 : isMobile ? 3 : isTablet ? 3 : 4,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ 
//         display: "flex", 
//         justifyContent: "space-between", 
//         alignItems: "center", 
//         mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//         pb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//         borderBottom: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}>
//         <Box>
//           <Skeleton variant="text" width={150} height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//           <Skeleton variant="text" width={200} height={isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//         <Skeleton variant="rounded" width={100} height={isSmallMobile ? 28 : isMobile ? 32 : isTablet ? 36 : 40} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       {/* Table Header Skeleton */}
//       <Box sx={{ 
//         display: "flex", 
//         bgcolor: alpha(theme.palette.primary.main, 0.05), 
//         p: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//         borderRadius: 1,
//         mb: 1
//       }}>
//         <Skeleton variant="text" width={60} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={120} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={100} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={80} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </Box>

//       {/* Table Rows Skeleton */}
//       {[1, 2, 3].map((item, index) => (
//         <Box key={item} sx={{ 
//           display: "flex", 
//           p: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//           borderBottom: index < 2 ? "1px solid" : "none",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//         }}>
//           <Skeleton variant="text" width={60} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={120} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={100} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={80} height={20} sx={{ mr: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       ))}
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

//   // Stats Cards Component
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
//         spacing={isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3} 
//         sx={{ mb: isMobile ? 3 : 4 }}
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
//                   p: isSmallMobile ? 2 : isMobile ? 2.5 : isTablet ? 2.5 : 3,
//                   borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//                   background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                   border: "1px solid",
//                   borderColor: alpha(stat.iconColor, 0.2),
//                   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                   position: "relative",
//                   overflow: "hidden",
//                   height: '100%',
//                   minHeight: isSmallMobile ? 120 : isMobile ? 140 : isTablet ? 150 : 160,
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
//                     transform: !isMobile ? "translateY(-4px) scale(1.02)" : "none",
//                     boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}` : "none",
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
//                     gap: isSmallMobile ? 1 : 0,
//                   }}>
//                     <Box>
//                       <Typography
//                         variant={isSmallMobile ? "h5" : isMobile ? "h4" : isTablet ? "h3" : "h3"}
//                         fontWeight="700"
//                         sx={{
//                           mb: 0.5,
//                           color: 'text.primary',
//                           fontSize: isSmallMobile ? '1.8rem' : isMobile ? '2rem' : isTablet ? '2.2rem' : '2.5rem',
//                           lineHeight: 1.2,
//                         }}
//                       >
//                         {stat.count}
//                       </Typography>
//                       <Typography 
//                         variant="body2" 
//                         color="text.secondary" 
//                         sx={{ 
//                           fontWeight: 500,
//                           fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.875rem',
//                         }}
//                       >
//                         {stat.label}
//                       </Typography>
//                     </Box>
//                     <Avatar
//                       sx={{
//                         bgcolor: alpha(stat.iconColor, 0.1),
//                         color: stat.iconColor,
//                         width: isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60,
//                         height: isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60,
//                         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                         boxShadow: `0 10px 20px -5px ${alpha(stat.iconColor, 0.2)}`,
//                         '& svg': {
//                           fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.3rem' : isTablet ? '1.4rem' : '1.5rem',
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
//                     height: 4,
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

//   // Revenue Card Component
//   const RevenueCard = () => {
//     return (
//       <Paper
//         elevation={0}
//         sx={{
//           p: isSmallMobile ? 2 : isMobile ? 2.5 : isTablet ? 2.5 : 3,
//           borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//           height: '100%',
//           minHeight: isSmallMobile ? 200 : isMobile ? 220 : isTablet ? 240 : 250,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             right: 0,
//             width: isSmallMobile ? "120px" : isMobile ? "150px" : isTablet ? "180px" : "200px",
//             height: isSmallMobile ? "120px" : isMobile ? "150px" : isTablet ? "180px" : "200px",
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
//           mb: (isMobile || isTablet) ? 2 : 4,
//           gap: (isMobile || isTablet) ? 1 : 0,
//         }}>
//           <Box>
//             <Typography 
//               variant="subtitle2" 
//               sx={{ 
//                 color: alpha("#ffffff", 0.7), 
//                 mb: 1,
//                 fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.875rem',
//               }}
//             >
//               Total Revenue
//             </Typography>
//             <Typography 
//               variant={isSmallMobile ? "h5" : isMobile ? "h4" : isTablet ? "h3" : "h3"} 
//               fontWeight="700"
//               sx={{ 
//                 fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.8rem' : isTablet ? '2rem' : '2.5rem',
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
//               icon={<FaArrowUp size={isSmallMobile ? 10 : 10} />}
//               sx={{
//                 bgcolor: alpha("#22c55e", 0.2),
//                 color: "#22c55e",
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : isTablet ? '0.75rem' : '0.75rem',
//                 mb: 1,
//                 height: isSmallMobile ? 22 : isMobile ? 24 : isTablet ? 24 : 24,
//               }}
//             />
//             <Typography 
//               variant="caption" 
//               sx={{ 
//                 color: alpha("#ffffff", 0.7), 
//                 display: "block",
//                 fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : isTablet ? '0.7rem' : '0.7rem',
//               }}
//             >
//               This Month
//             </Typography>
//           </Box>
//         </Box>

//         {/* Monthly Summary Section */}
//         <Grid container spacing={isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 1.5 : 2}>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                 borderRadius: isSmallMobile ? 2 : isMobile ? 2 : isTablet ? 2.5 : 3,
//                 background: alpha("#ffffff", 0.08),
//                 backdropFilter: "blur(4px)",
//                 height: '100%',
//                 minHeight: isSmallMobile ? 70 : isMobile ? 80 : isTablet ? 85 : 90,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//                 <Box>
//                   <Typography 
//                     variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"} 
//                     fontWeight="700" 
//                     sx={{ 
//                       mb: 0.5,
//                       fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem',
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
//                       fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//                     }}
//                   >
//                     This Month
//                   </Typography>
//                 </Box>
//                 <FaCalendarAlt size={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 18 : 20} style={{ opacity: 0.5 }} />
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                 borderRadius: isSmallMobile ? 2 : isMobile ? 2 : isTablet ? 2.5 : 3,
//                 background: alpha("#ffffff", 0.08),
//                 backdropFilter: "blur(4px)",
//                 height: '100%',
//                 minHeight: isSmallMobile ? 70 : isMobile ? 80 : isTablet ? 85 : 90,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//                 <Box>
//                   <Typography 
//                     variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"} 
//                     fontWeight="700" 
//                     sx={{ 
//                       mb: 0.5,
//                       fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem',
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
//                       fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//                     }}
//                   >
//                     Last Month
//                   </Typography>
//                 </Box>
//                 <FaCalendarAlt size={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 18 : 20} style={{ opacity: 0.5 }} />
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
//               mb: 2,
//             }}
//           >
//             <Typography 
//               variant={isMobile ? "h5" : "h4"}
//               fontWeight="800"
//               color={theme.palette.primary.main}
//               gutterBottom
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//               }}
//             >
//               Super Admin Dashboard
//             </Typography>
//             <IconButton>
//               <RefreshIcon sx={{ color: theme.palette.primary.main }} />
//             </IconButton>
//           </Box>

//           {/* Tracking Overview Section Skeleton */}
//           <Box sx={{ 
//             marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px" 
//           }}>
//             <Box sx={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3, 
//               flexWrap: "wrap", 
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <FaChartLine style={{ 
//                   color: theme.palette.primary.main, 
//                   fontSize: isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20 
//                 }} />
//                 <Typography 
//                   variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"} 
//                   fontWeight="600" 
//                   color="text.primary"
//                   sx={{ 
//                     fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem' 
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Stats Cards Skeleton */}
//             <Grid 
//               container 
//               spacing={isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3} 
//               sx={{ mb: isMobile ? 3 : 4 }}
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

//           {/* Expiring Plans Section Skeleton */}
//           <Box sx={{ 
//             marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px" 
//           }}>
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
//                 mb: 2,
//               }}
//             >
//               <Typography 
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 color={theme.palette.primary.main}
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 Super Admin Dashboard
//               </Typography>
//               <IconButton onClick={refreshData}>
//                 <RefreshIcon sx={{ color: theme.palette.primary.main }} />
//               </IconButton>
//             </Box>
//           </motion.div>

//           {/* Tracking Overview Section */}
//           <motion.section 
//             variants={itemVariants} 
//             style={{ 
//               marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px" 
//             }}
//           >
//             <Box sx={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center", 
//               mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3, 
//               flexWrap: "wrap", 
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <FaChartLine style={{ 
//                   color: theme.palette.primary.main, 
//                   fontSize: isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20 
//                 }} />
//                 <Typography 
//                   variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"} 
//                   fontWeight="600" 
//                   color="text.primary"
//                   sx={{ 
//                     fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem' 
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>

//               <Chip
//                 label="Live Analytics"
//                 size="small"
//                 icon={<FaChartLine size={isSmallMobile ? 8 : isMobile ? 10 : isTablet ? 12 : 14} />}
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   fontWeight: 600,
//                   fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.85rem',
//                   height: isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 28,
//                 }}
//               />
//             </Box>

//             <StatsCards />
//           </motion.section>

//           {/* Expiring Plans Section */}
//           <motion.section 
//             variants={itemVariants} 
//             style={{ 
//               marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px" 
//             }}
//           >
//             <ExpiringPlansTable data={expiringUsers} />
//           </motion.section>

//           {/* Revenue Overview Section */}
//           <motion.section 
//             variants={itemVariants} 
//             style={{ 
//               marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px" 
//             }}
//           >
//             <Box sx={{ 
//               display: "flex", 
//               alignItems: "center", 
//               gap: 1, 
//               mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <FaRupeeSign style={{ 
//                 color: theme.palette.primary.main, 
//                 fontSize: isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20 
//               }} />
//               <Typography 
//                 variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"} 
//                 fontWeight="600" 
//                 color="text.primary"
//                 sx={{ 
//                   fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem' 
//                 }}
//               >
//                 Revenue Overview
//               </Typography>
//             </Box>

//             <motion.div variants={cardVariants}>
//               <RevenueCard />
//             </motion.div>
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















// Structure chang
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
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
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
//           p: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2 : 2.5,
//           borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           height: '100%',
//           minHeight: isSmallMobile ? 90 : isMobile ? 100 : isTablet ? 110 : 120,
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
//                 width={isSmallMobile ? 50 : isMobile ? 60 : isTablet ? 70 : 80}
//                 height={isSmallMobile ? 24 : isMobile ? 28 : isTablet ? 32 : 36}
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }}
//               />
//               <Skeleton
//                 variant="text"
//                 width={isSmallMobile ? 70 : isMobile ? 80 : isTablet ? 90 : 100}
//                 height={isSmallMobile ? 10 : isMobile ? 12 : isTablet ? 14 : 16}
//                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//               />
//             </Box>
//             <Skeleton
//               variant="circular"
//               width={isSmallMobile ? 36 : isMobile ? 40 : isTablet ? 44 : 48}
//               height={isSmallMobile ? 36 : isMobile ? 40 : isTablet ? 44 : 48}
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
//             height: 3,
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
//         p: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2 : 2.5,
//         borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: "white",
//         position: "relative",
//         overflow: "hidden",
//         height: '100%',
//         minHeight: isSmallMobile ? 140 : isMobile ? 160 : isTablet ? 180 : 200,
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
//         mb: (isMobile || isTablet) ? 1 : 2,
//         gap: (isMobile || isTablet) ? 0.5 : 0,
//       }}>
//         <Box>
//           <Skeleton
//             variant="text"
//             width={80}
//             height={isSmallMobile ? 10 : isMobile ? 12 : isTablet ? 14 : 16}
//             sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }}
//           />
//           <Skeleton
//             variant="text"
//             width={isSmallMobile ? 100 : isMobile ? 120 : isTablet ? 140 : 160}
//             height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 28}
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//           />
//         </Box>
//         <Box sx={{ textAlign: (isMobile || isTablet) ? "left" : "right" }}>
//           <Skeleton
//             variant="rounded"
//             width={60}
//             height={20}
//             sx={{
//               bgcolor: alpha("#ffffff", 0.2),
//               borderRadius: 3,
//               mb: 0.5
//             }}
//           />
//           <Skeleton
//             variant="text"
//             width={50}
//             height={isSmallMobile ? 8 : isMobile ? 10 : isTablet ? 12 : 14}
//             sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//           />
//         </Box>
//       </Box>

//       {/* Monthly Summary Section Skeleton */}
//       <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1 : 1.5}>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.2 : 1.5,
//               borderRadius: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 50 : isMobile ? 55 : isTablet ? 60 : 65,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 40 : isMobile ? 50 : isTablet ? 60 : 70}
//                   height={isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
//                 />
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 30 : isMobile ? 35 : isTablet ? 40 : 45}
//                   height={isSmallMobile ? 8 : isMobile ? 9 : isTablet ? 10 : 12}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//                 />
//               </Box>
//               <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//         <Grid item xs={6}>
//           <Box
//             sx={{
//               p: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.2 : 1.5,
//               borderRadius: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//               background: alpha("#ffffff", 0.08),
//               height: '100%',
//               minHeight: isSmallMobile ? 50 : isMobile ? 55 : isTablet ? 60 : 65,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//               <Box>
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 40 : isMobile ? 50 : isTablet ? 60 : 70}
//                   height={isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.3 }}
//                 />
//                 <Skeleton
//                   variant="text"
//                   width={isSmallMobile ? 30 : isMobile ? 35 : isTablet ? 40 : 45}
//                   height={isSmallMobile ? 8 : isMobile ? 9 : isTablet ? 10 : 12}
//                   sx={{ bgcolor: alpha("#ffffff", 0.2) }}
//                 />
//               </Box>
//               <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Expiring Plans Table Skeleton
// const ExpiringPlansTableSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//   const theme = useTheme();

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//         borderRadius: isSmallMobile ? 2 : isMobile ? 3 : isTablet ? 3 : 4,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       {/* Header */}
//       <Box sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//         pb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//         borderBottom: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}>
//         <Box>
//           <Skeleton variant="text" width={120} height={isSmallMobile ? 18 : isMobile ? 20 : isTablet ? 22 : 24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//           <Skeleton variant="text" width={160} height={isSmallMobile ? 10 : isMobile ? 12 : isTablet ? 14 : 16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//         <Skeleton variant="rounded" width={80} height={isSmallMobile ? 24 : isMobile ? 28 : isTablet ? 32 : 36} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       {/* Table Header Skeleton */}
//       <Box sx={{
//         display: "flex",
//         bgcolor: alpha(theme.palette.primary.main, 0.05),
//         p: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.2 : 1.5,
//         borderRadius: 1,
//         mb: 1
//       }}>
//         <Skeleton variant="text" width={40} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={100} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={90} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </Box>

//       {/* Table Rows Skeleton */}
//       {[1, 2, 3].map((item, index) => (
//         <Box key={item} sx={{
//           display: "flex",
//           p: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.2 : 1.5,
//           borderBottom: index < 2 ? "1px solid" : "none",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//         }}>
//           <Skeleton variant="text" width={40} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={100} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={90} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width={70} height={16} sx={{ mr: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       ))}
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
//         spacing={isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2.5}
//         sx={{ mb: isMobile ? 2 : 3 }}
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
//                   p: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2 : 2.5,
//                   borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//                   background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                   border: "1px solid",
//                   borderColor: alpha(stat.iconColor, 0.2),
//                   transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                   position: "relative",
//                   overflow: "hidden",
//                   height: '100%',
//                   minHeight: isSmallMobile ? 90 : isMobile ? 100 : isTablet ? 110 : 120,
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
//                     transform: !isMobile ? "translateY(-4px) scale(1.02)" : "none",
//                     boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}` : "none",
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
//                         variant={isSmallMobile ? "h6" : isMobile ? "h5" : isTablet ? "h4" : "h4"}
//                         fontWeight="700"
//                         sx={{
//                           mb: 0.25,
//                           color: 'text.primary',
//                           fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.8rem' : isTablet ? '2rem' : '2.2rem',
//                           lineHeight: 1.2,
//                         }}
//                       >
//                         {stat.count}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           fontWeight: 500,
//                           fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : isTablet ? '0.7rem' : '0.75rem',
//                         }}
//                       >
//                         {stat.label}
//                       </Typography>
//                     </Box>
//                     <Avatar
//                       sx={{
//                         bgcolor: alpha(stat.iconColor, 0.1),
//                         color: stat.iconColor,
//                         width: isSmallMobile ? 36 : isMobile ? 40 : isTablet ? 44 : 48,
//                         height: isSmallMobile ? 36 : isMobile ? 40 : isTablet ? 44 : 48,
//                         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                         boxShadow: `0 8px 16px -5px ${alpha(stat.iconColor, 0.2)}`,
//                         '& svg': {
//                           fontSize: isSmallMobile ? '1rem' : isMobile ? '1.1rem' : isTablet ? '1.2rem' : '1.3rem',
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
//                     height: 3,
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
//           p: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2 : 2.5,
//           borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//           height: '100%',
//           minHeight: isSmallMobile ? 140 : isMobile ? 160 : isTablet ? 180 : 200,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             right: 0,
//             width: isSmallMobile ? "100px" : isMobile ? "120px" : isTablet ? "140px" : "160px",
//             height: isSmallMobile ? "100px" : isMobile ? "120px" : isTablet ? "140px" : "160px",
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
//           mb: (isMobile || isTablet) ? 1 : 2,
//           gap: (isMobile || isTablet) ? 0.5 : 0,
//         }}>
//           <Box>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 mb: 0.5,
//                 fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : isTablet ? '0.7rem' : '0.75rem',
//               }}
//             >
//               Total Revenue
//             </Typography>
//             <Typography
//               variant={isSmallMobile ? "h6" : isMobile ? "h5" : isTablet ? "h4" : "h4"}
//               fontWeight="700"
//               sx={{
//                 fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
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
//               icon={<FaArrowUp size={isSmallMobile ? 8 : 10} />}
//               sx={{
//                 bgcolor: alpha("#22c55e", 0.2),
//                 color: "#22c55e",
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//                 mb: 0.5,
//                 height: isSmallMobile ? 18 : isMobile ? 20 : isTablet ? 22 : 22,
//               }}
//             />
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 display: "block",
//                 fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.6rem',
//               }}
//             >
//               This Month
//             </Typography>
//           </Box>
//         </Box>

//         {/* Monthly Summary Section */}
//         <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1 : 1.5}>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.2 : 1.5,
//                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                 background: alpha("#ffffff", 0.08),
//                 backdropFilter: "blur(4px)",
//                 height: '100%',
//                 minHeight: isSmallMobile ? 50 : isMobile ? 55 : isTablet ? 60 : 65,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//                 <Box>
//                   <Typography
//                     variant={isSmallMobile ? "body2" : isMobile ? "body1" : isTablet ? "h6" : "h6"}
//                     fontWeight="600"
//                     sx={{
//                       mb: 0.25,
//                       fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem',
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
//                       fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.6rem',
//                     }}
//                   >
//                     This Month
//                   </Typography>
//                 </Box>
//                 <FaCalendarAlt size={isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 16 : 18} style={{ opacity: 0.5 }} />
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 p: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.2 : 1.5,
//                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                 background: alpha("#ffffff", 0.08),
//                 backdropFilter: "blur(4px)",
//                 height: '100%',
//                 minHeight: isSmallMobile ? 50 : isMobile ? 55 : isTablet ? 60 : 65,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
//                 <Box>
//                   <Typography
//                     variant={isSmallMobile ? "body2" : isMobile ? "body1" : isTablet ? "h6" : "h6"}
//                     fontWeight="600"
//                     sx={{
//                       mb: 0.25,
//                       fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.9rem' : isTablet ? '1rem' : '1.1rem',
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
//                       fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.6rem',
//                     }}
//                   >
//                     Last Month
//                   </Typography>
//                 </Box>
//                 <FaCalendarAlt size={isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 16 : 18} style={{ opacity: 0.5 }} />
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
//               mb: 2,
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
//                   xs: '1rem',      // 16px on mobile
//                   sm: '1.2rem',    // 19px on small tablets
//                   md: '1.4rem',    // 22px on tablets
//                   lg: '1.6rem',    // 26px on desktops
//                   xl: '1.8rem'     // 29px on large screens
//                 },
//               }}
//             >
//               Super Admin Dashboard
//             </Typography>
//             <IconButton>
//               <RefreshIcon sx={{ color: theme.palette.primary.main }} />
//             </IconButton>
//           </Box>

//           {/* Tracking Overview Section Skeleton */}
//           <Box sx={{
//             marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px"
//           }}>
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//               flexWrap: "wrap",
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <FaChartLine style={{
//                   color: theme.palette.primary.main,
//                   fontSize: isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20
//                 }} />
//                 <Typography
//                   variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"}
//                   fontWeight="600"
//                   color="text.primary"
//                   sx={{
//                     fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem'
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Stats Cards Skeleton */}
//             <Grid
//               container
//               spacing={isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2.5}
//               sx={{ mb: isMobile ? 2 : 3 }}
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
//             marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px"
//           }}>
//             <Box sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <FaRupeeSign style={{
//                 color: theme.palette.primary.main,
//                 fontSize: isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20
//               }} />
//               <Typography
//                 variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"}
//                 fontWeight="600"
//                 color="text.primary"
//                 sx={{
//                   fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem'
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
//             marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px"
//           }}>
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
//                 mb: 2,
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
//                     xs: '1rem',      // 16px on mobile
//                     sm: '1.2rem',    // 19px on small tablets
//                     md: '1.4rem',    // 22px on tablets
//                     lg: '1.6rem',    // 26px on desktops
//                     xl: '1.8rem'     // 29px on large screens
//                   },
//                 }}
//               >
//                 Super Admin Dashboard
//               </Typography>
//               <IconButton onClick={refreshData}>
//                 <RefreshIcon sx={{ color: theme.palette.primary.main }} />
//               </IconButton>
//             </Box>
//           </motion.div>

//           {/* Tracking Overview Section */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px"
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//               flexWrap: "wrap",
//               gap: 1,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <FaChartLine style={{
//                   color: theme.palette.primary.main,
//                   fontSize: isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20
//                 }} />
//                 <Typography
//                   variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"}
//                   fontWeight="600"
//                   color="text.primary"
//                   sx={{
//                     fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem'
//                   }}
//                 >
//                   Tracking Overview
//                 </Typography>
//               </Box>

//               <Chip
//                 label="Live Analytics"
//                 size="small"
//                 icon={<FaChartLine size={isSmallMobile ? 8 : isMobile ? 10 : isTablet ? 12 : 14} />}
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   fontWeight: 600,
//                   fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.85rem',
//                   height: isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 28,
//                 }}
//               />
//             </Box>

//             <StatsCards />
//           </motion.section>

//           {/* Revenue Overview Section - Moved up */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px"
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               mb: isSmallMobile ? 1.5 : isMobile ? 2 : isTablet ? 2.5 : 3,
//               px: isSmallMobile ? 0.5 : 0,
//             }}>
//               <FaRupeeSign style={{
//                 color: "#0f766e",
//                 fontSize: isSmallMobile ? 14 : isMobile ? 16 : isTablet ? 18 : 20
//               }} />
//               <Typography
//                 variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h6" : "h5"}
//                 fontWeight="600"
//                 color="#1e293b"
//                 sx={{
//                   fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.5rem'
//                 }}
//               >
//                 Revenue Overview
//               </Typography>
//             </Box>

//             <motion.div variants={cardVariants}>
//               <RevenueCard />
//             </motion.div>
//           </motion.section>

//           {/* Expiring Plans Section */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "20px" : isMobile ? "25px" : isTablet ? "30px" : "40px"
//             }}
//           >
//             <ExpiringPlansTable data={expiringUsers} />
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























///////Working ..........

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
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
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

//           {/* Expiring Plans Section */}
//           <motion.section
//             variants={itemVariants}
//             style={{
//               marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//             }}
//           >
//             <ExpiringPlansTable data={expiringUsers} />
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
  alpha,
  useTheme,
  useMediaQuery,
  Skeleton,
  Button,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
  FaChartLine,
  FaRupeeSign,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";
import { getUserCounts } from "../../redux/slices/userSlice";
import { getUsersWithExpiringPlans } from "../../redux/slices/planSlice";
import { getRevenueSummary } from "../../redux/slices/paymentSlice";
import ExpiringPlansTable from "../../components/ExpiringPlansTable";

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

  // Safe Redux state access
  const userCounts = useSelector((state) => state.user?.userCounts || {});
  const expiringUsers = useSelector((state) => state.plan?.expiringUsers || []);
  const { revenueSummary } = useSelector(
    (state) => state.payment || {}
  );

  useEffect(() => {
    dispatch(getUserCounts());
    dispatch(getUsersWithExpiringPlans());
    dispatch(getRevenueSummary());

    // Set first render loader to false after 1 second
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const refreshData = () => {
    setLastUpdated(new Date());
    dispatch(getUserCounts());
    dispatch(getUsersWithExpiringPlans());
    dispatch(getRevenueSummary());
  };

  // Get only the first 10 users for the dashboard preview
  const recentExpiringUsers = expiringUsers.slice(0, 10);

  // User Stats with responsive icons
  const userStats = [
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
  ];

  // Stats Cards Component - Smaller height
  const StatsCards = () => {
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    };

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
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
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
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Revenue Card Component - Smaller height
  const RevenueCard = () => {
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
        <Grid container spacing={isSmallMobile ? 0.5 : isMobile ? 0.8 : isTablet ? 0.8 : 1}>
          <Grid item xs={6}>
            <Box
              sx={{
                p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
                borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
                background: alpha("#ffffff", 0.08),
                backdropFilter: "blur(4px)",
                height: '100%',
                minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
                <Box>
                  <Typography
                    variant={isSmallMobile ? "caption" : isMobile ? "body2" : isTablet ? "body1" : "body1"}
                    fontWeight="600"
                    sx={{
                      mb: 0.1,
                      fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.9rem',
                    }}
                  >
                    {revenueSummary?.currentMonthRevenue > 0
                      ? `₹${revenueSummary?.currentMonthRevenue.toLocaleString()}`
                      : "₹0"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: isSmallMobile ? '0.45rem' : isMobile ? '0.5rem' : isTablet ? '0.55rem' : '0.55rem',
                    }}
                  >
                    This Month
                  </Typography>
                </Box>
                <FaCalendarAlt size={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15} style={{ opacity: 0.5 }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: isSmallMobile ? 0.8 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
                borderRadius: isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2,
                background: alpha("#ffffff", 0.08),
                backdropFilter: "blur(4px)",
                height: '100%',
                minHeight: isSmallMobile ? 45 : isMobile ? 48 : isTablet ? 50 : 52,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: '100%' }}>
                <Box>
                  <Typography
                    variant={isSmallMobile ? "caption" : isMobile ? "body2" : isTablet ? "body1" : "body1"}
                    fontWeight="600"
                    sx={{
                      mb: 0.1,
                      fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : isTablet ? '0.8rem' : '0.9rem',
                    }}
                  >
                    {revenueSummary?.lastMonthRevenue > 0
                      ? `₹${revenueSummary?.lastMonthRevenue.toLocaleString()}`
                      : "₹0"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      fontSize: isSmallMobile ? '0.45rem' : isMobile ? '0.5rem' : isTablet ? '0.55rem' : '0.55rem',
                    }}
                  >
                    Last Month
                  </Typography>
                </Box>
                <FaCalendarAlt size={isSmallMobile ? 12 : isMobile ? 13 : isTablet ? 14 : 15} style={{ opacity: 0.5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  };

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
              <IconButton size="small" onClick={refreshData} sx={{ width: 28, height: 28 }}>
                <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              </IconButton>
            </Box>
          </motion.div>

          {/* Tracking Overview Section */}
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

              <Chip
                label="Live"
                size="small"
                icon={<FaChartLine size={isSmallMobile ? 6 : 8} />}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.7rem',
                  height: isSmallMobile ? 18 : isMobile ? 20 : isTablet ? 22 : 24,
                }}
              />
            </Box>

            <StatsCards />
          </motion.section>

          {/* Revenue Overview Section - Moved up */}
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

            <motion.div variants={cardVariants}>
              <RevenueCard />
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
                Recent Expiring Plans
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