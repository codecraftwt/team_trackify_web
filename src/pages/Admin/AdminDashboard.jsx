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
//   getAdminStats
// } from "../../redux/slices/userSlice";
// import Loader from "../../components/common/Loader";
// import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

// // Stats Card Skeleton - Smaller
// const StatsCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.2, sm: 1.5, md: 1.8 },
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         height: '100%',
//         minHeight: { xs: 80, sm: 85, md: 90, lg: 95 },
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box sx={{ width: '60%' }}>
//           <Skeleton variant="text" width="70%" height={18} />
//           <Skeleton variant="text" width="90%" height={32} />
//         </Box>
//         <Skeleton variant="circular" width={38} height={38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>
//     </Paper>
//   );
// };

// // Current Plan Skeleton - Smaller
// const CurrentPlanSkeleton = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 2.5 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         mb: { xs: 2.5, sm: 3 },
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//       }}
//     >
//       {/* Header Skeleton */}
//       <Box sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: 1.5,
//         pb: 1.5,
//         borderBottom: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1)
//       }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={6} height={6} sx={{ bgcolor: theme.palette.primary.main }} />
//           <Skeleton variant="text" width={90} height={20} />
//         </Box>
//         <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.3) }} />
//       </Box>

//       {/* Description Skeleton */}
//       <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1.5 }} />

//       {/* Stats Grid Skeleton */}
//       <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: 1.5 }}>
//         {[1, 2, 3, 4].map((item) => (
//           <Grid item xs={6} md={3} key={item}>
//             <Box sx={{ p: 0.8 }}>
//               <Skeleton variant="text" width="50%" height={14} />
//               <Skeleton variant="text" width="70%" height={20} />
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//       {/* Dates Skeleton */}
//       <Grid container spacing={2} sx={{ mb: 1.5 }}>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={14} />
//           <Skeleton variant="text" width="60%" height={18} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={14} />
//           <Skeleton variant="text" width="60%" height={18} />
//         </Grid>
//       </Grid>

//       {/* Progress Skeleton */}
//       <Box sx={{ mb: 1.5 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//           <Skeleton variant="text" width={90} height={14} />
//           <Skeleton variant="rounded" width={70} height={18} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//         <Skeleton variant="rounded" width="100%" height={5} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       {/* User Limits Skeleton */}
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={14} />
//           <Skeleton variant="text" width="40%" height={22} />
//         </Grid>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={14} />
//           <Skeleton variant="text" width="40%" height={22} />
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Recent Activities Skeleton - Smaller
// const RecentActivitiesSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 2.5 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Skeleton variant="text" width={130} height={28} />
//         <Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       <Stack spacing={1.5}>
//         {[1, 2, 3, 4].map((item) => (
//           <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="40%" height={18} />
//               <Skeleton variant="text" width="60%" height={14} />
//             </Box>
//             <Skeleton variant="text" width={70} height={14} />
//           </Box>
//         ))}
//       </Stack>
//     </Paper>
//   );
// };

// // Empty Recent Activities Component
// const EmptyRecentActivities = () => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 2.5, sm: 3 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//         textAlign: "center",
//       }}
//     >
//       <Box sx={{ py: 2 }}>
//         <TimelineIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1 }} />
//         <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
//           No recent activities
//         </Typography>
//         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//           User activities will appear here
//         </Typography>
//       </Box>
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
//     if (isSmallMobile) return 28;
//     if (isMobile) return 32;
//     if (isTablet) return 36;
//     return 40;
//   };

//   const getFontSize = () => {
//     if (isSmallMobile) return '1rem';
//     if (isMobile) return '1.1rem';
//     if (isTablet) return '1.2rem';
//     return '1.3rem';
//   };

//   // Show skeletons when loading
//   if (loading) {
//     return (
//       <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2, lg: 2.5 }} sx={{ mb: { xs: 2.5, sm: 3 } }}>
//         {[1, 2, 3, 4].map((_, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatsCardSkeleton />
//           </Grid>
//         ))}
//       </Grid>
//     );
//   }

//   return (
//     <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2, lg: 2.5 }} sx={{ mb: { xs: 2.5, sm: 3 } }}>
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
//                 p: { xs: 1.2, sm: 1.5, md: 1.8 },
//                 borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                 background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                 border: "1px solid",
//                 borderColor: alpha(stat.iconColor, 0.2),
//                 cursor: stat.onClick ? "pointer" : "default",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 position: "relative",
//                 overflow: "hidden",
//                 height: '100%',
//                 minHeight: { xs: 80, sm: 85, md: 90, lg: 95 },
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
//                     transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
//                     boxShadow: !isMobile ? `0 15px 25px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
//                     borderColor: stat.iconColor,
//                     "& .stat-icon": {
//                       transform: !isMobile ? "scale(1.05) rotate(5deg)" : "none",
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
//                       variant="h6"
//                       fontWeight="700"
//                       className="stat-value"
//                       sx={{
//                         mb: 0.25,
//                         color: 'text.primary',
//                         transition: "color 0.3s ease",
//                         fontSize: getFontSize(),
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {stat.count !== undefined ? stat.count : 0}
//                     </Typography>
//                     <Typography
//                       variant="caption"
//                       color="text.secondary"
//                       sx={{
//                         fontWeight: 500,
//                         fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem', lg: '0.7rem' },
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
//                       boxShadow: `0 6px 12px -4px ${alpha(stat.iconColor, 0.2)}`,
//                       '& svg': {
//                         fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' }
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
//                   height: 2.5,
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

//   // Show empty state if no plan data
//   if (!planData) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             mb: { xs: 2.5, sm: 3 },
//             background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//             textAlign: "center",
//           }}
//         >
//           <Box sx={{ py: 2 }}>
//             <Box
//               sx={{
//                 width: { xs: 48, sm: 56 },
//                 height: { xs: 48, sm: 56 },
//                 borderRadius: "50%",
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mx: "auto",
//                 mb: 1.5,
//               }}
//             >
//               <PeopleIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: theme.palette.primary.main }} />
//             </Box>
//             <Typography variant="body1" fontWeight="600" sx={{ fontSize: '0.9rem', color: 'text.primary', mb: 0.5 }}>
//               No Active Plan
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//               You haven't purchased any plan yet
//             </Typography>
//           </Box>
//         </Paper>
//       </motion.div>
//     );
//   }

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
//     if (daysLeft <= 7) return theme.palette.secondary.main;
//     return theme.palette.primary.main;
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
//           p: { xs: 1.5, sm: 2, md: 2.5 },
//           borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//           border: "1px solid",
//           borderColor: alpha(statusColor, 0.2),
//           mb: { xs: 2.5, sm: 3 },
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//           boxShadow: `0 8px 25px -12px ${alpha(statusColor, 0.2)}`,
//         }}
//       >
//         {/* Header */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.2, sm: 1.5 },
//           pb: { xs: 1.2, sm: 1.5 },
//           borderBottom: "2px solid",
//           borderColor: alpha(statusColor, 0.1),
//           gap: { xs: 0.8, sm: 0 }
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
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
//               variant={isMobile ? "body1" : "h6"}
//               fontWeight="600"
//               sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//             >
//               Current Plan
//             </Typography>
//           </Box>
//         </Box>

//         {/* Plan Description */}
//         <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//           <Typography
//             variant={isMobile ? "body1" : "h6"}
//             fontWeight="600"
//             gutterBottom
//             sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, color: 'text.primary' }}
//           >
//             {planData.description || "No Plan Description"}
//           </Typography>
//         </Box>

//         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }} sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%', // ADD THIS
//               display: 'flex', // ADD THIS
//               flexDirection: 'column', // ADD THIS
//               justifyContent: 'center', // ADD THIS
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Duration
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                 {planData.duration || "N/A"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%', // ADD THIS
//               display: 'flex', // ADD THIS
//               flexDirection: 'column', // ADD THIS
//               justifyContent: 'center', // ADD THIS
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Amount
//               </Typography>
//               <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.7rem', color: statusColor }}>
//                 ₹{planData.amount || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%', // ADD THIS
//               display: 'flex', // ADD THIS
//               flexDirection: 'column', // ADD THIS
//               justifyContent: 'center', // ADD THIS
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Currency
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                 {planData.currency || "INR"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%', // ADD THIS
//               display: 'flex', // ADD THIS
//               flexDirection: 'column', // ADD THIS
//               justifyContent: 'center', // ADD THIS
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Status
//               </Typography>
//               <Chip
//                 label={planData.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary, 0.1),
//                   color: planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary,
//                   fontWeight: 600,
//                   fontSize: '0.6rem',
//                   height: 18,
//                   mt: 0.3,
//                   alignSelf: 'flex-start', // ADD THIS
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//         <Divider sx={{ my: { xs: 1.2, sm: 1.5 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

//         {/* Dates */}
//         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }} sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//               Created At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//               {formatDateDDMMYYYY(planData.createdAt)}
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//               Expires At
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
//               <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                 {formatDateDDMMYYYY(planData.expiresAt)}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Progress Section */}
//         {planData.expiresAt && (
//           <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Progress {Math.round(progress)}%
//               </Typography>
//               <Chip
//                 label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(statusColor, 0.1),
//                   color: statusColor,
//                   height: 18,
//                   fontSize: "0.6rem",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: { xs: 4, sm: 5 },
//                 borderRadius: 2,
//                 bgcolor: alpha(statusColor, 0.1),
//                 "& .MuiLinearProgress-bar": {
//                   bgcolor: statusColor,
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* User Limits */}
//         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }}>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Min Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
//                 {planData.minUser || planData.minUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Max Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
//                 {planData.maxUser || planData.maxUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </motion.div>
//   );
// };

// // RecentActivities Component - Smaller
// const RecentActivities = ({ users, loading }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <RecentActivitiesSkeleton />;
//   }

//   if (!users || users.length === 0) {
//     return <EmptyRecentActivities />;
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
//           p: { xs: 1.5, sm: 2, md: 2.5 },
//           borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.5, sm: 2 },
//           gap: 0.8
//         }}>
//           <Typography variant="body1" fontWeight="600" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: theme.palette.primary.main }}>
//             Recent Activities
//           </Typography>
//           {users.length > 4 && (
//             <Chip
//               label={`View All (${users.length})`}
//               size="small"
//               // onClick={() => console.log("View all clicked")}
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 fontWeight: 500,
//                 cursor: "pointer",
//                 fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                 height: { xs: 22, sm: 24 },
//                 "&:hover": {
//                   bgcolor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             />
//           )}
//         </Box>

//         <Stack spacing={1.5}>
//           {displayUsers.map((activity, index) => (
//             <motion.div
//               key={activity._id || index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 1.2, sm: 1.5 },
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   bgcolor: alpha(theme.palette.primary.main, 0.02),
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   textAlign: { xs: 'center', sm: 'left' },
//                   gap: { xs: 0.8, sm: 0 },
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                     transform: !isMobile ? "translateX(4px)" : "none",
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   },
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.2),
//                     color: theme.palette.primary.main,
//                     mr: { xs: 0, sm: 1.5 },
//                     mb: { xs: 0.5, sm: 0 },
//                     width: { xs: 36, sm: 40 },
//                     height: { xs: 36, sm: 40 },
//                     fontSize: '0.8rem',
//                     fontWeight: 600,
//                   }}
//                 >
//                   {activity.name?.charAt(0) || "U"}
//                 </Avatar>
//                 <Box sx={{ flex: 1, width: '100%' }}>
//                   <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
//                     {activity.name || "Unknown User"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//                     {activity.status || "No action"}
//                   </Typography>
//                 </Box>

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

//   // Robustly determine the effective admin ID (parent organization ID)
//   const isSubAdmin = Number(userData.role_id) === 3;
//   const rawAdminId = userData.adminId;
//   const effectiveAdminId = isSubAdmin
//     ? (typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId)
//     : (userData?._id || userData?.id);

//   const lastTrackedUsers = userState.lastTrackedUsers || [];
//   const loading = userState.loading || false;

//   // Consolidated data fetching function
//   const fetchAllData = useCallback(async (isInitialLoad = false) => {
//     if (!effectiveAdminId) {
//       setIsLoading(false);
//       return;
//     }

//     try {
//       if (isInitialLoad) {
//         setIsLoading(true);
//       }

//       const startTime = isInitialLoad ? Date.now() : null;

//       const userResult = await dispatch(getUserById(effectiveAdminId)).unwrap();

//       // console.log("yser data ->", userResult)

//       if (userResult?.user?.currentPaymentId) {
//         const plan = userResult.user.currentPaymentId;
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
//         setPlanData(null);
//       }

//       // const [lastTrackedResult, locationsResult, countsResult, allUsersResult] = await Promise.all([
//       //   dispatch(getLastFiveTrackedUsers(userData._id)),
//       //   // dispatch(getActiveUserLocations()),
//       //   dispatch(getUserCounts()),
//       //   dispatch(getAllUsers(userData._id))
//       // ]);
//       const adminId = effectiveAdminId;
//       if (!adminId) {
//         console.error("Admin ID is missing, cannot fetch locations");
//         return;
//       }

//       const [lastTrackedResult, locationsResult, countsResult, allUsersResult] =
//         await Promise.all([
//           dispatch(getLastFiveTrackedUsers(adminId)),
//           dispatch(getActiveUserLocations(adminId)),
//           dispatch(getUserCounts()),
//           dispatch(getAllUsers(adminId))
//         ]);

//       if (allUsersResult.payload?.users) {
//         const users = allUsersResult.payload.users;
//         const today = new Date().toISOString().split("T")[0];

//         setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
//         setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
//         setTotalActiveUsers(users.filter(u => u.isActive).length);
//         setTotalInActiveUsers(users.filter(u => !u.isActive).length);
//         setTotalUsers(users.length);

//       } else {
//         // Set all counts to 0 if no users
//         setCheckedOutCount(0);
//         setCheckedInCount(0);
//         setTotalActiveUsers(0);
//         setTotalInActiveUsers(0);
//         setTotalUsers(0);
//       }
//         // console.log(users);

//       setLastUpdated(new Date());

//       if (isInitialLoad && startTime) {
//         const fetchDuration = Date.now() - startTime;
//         const minLoadTime = 1000;
//         if (fetchDuration < minLoadTime) {
//           await new Promise(resolve => setTimeout(resolve, minLoadTime - fetchDuration));
//         }
//       }

//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       // Set all counts to 0 on error
//       setCheckedOutCount(0);
//       setCheckedInCount(0);
//       setTotalActiveUsers(0);
//       setTotalInActiveUsers(0);
//       setTotalUsers(0);
//       setPlanData(null);
//     } finally {
//       if (isInitialLoad) {
//         setIsLoading(false);
//       }
//     }

//   }, [dispatch, effectiveAdminId]);

//   // Effects
//   useEffect(() => {
//     if (!hasMounted.current) {
//       hasMounted.current = true;

//       if (userData?._id) {
//         fetchAllData(true);
//       } else {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//           try {
//             const parsedUser = JSON.parse(storedUser);
//             if (parsedUser?._id) {
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
//   }, []);

//   useEffect(() => {
//     if (effectiveAdminId && hasMounted.current) {
//       fetchAllData(true);
//     }
//   }, [effectiveAdminId]);

//   useEffect(() => {
//     const handleFocus = () => {
//       if (userData?._id) {
//         fetchAllData(false);
//       }
//     };
//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [userData?._id, fetchAllData]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchAllData(false);
//     setIsRefreshing(false);
//   };

//   const userStats = [
//     {
//       key: "activeUsers",
//       label: "Active Users",
//       count: totalActiveUsers,
//       icon: <FaUsers size={20} />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
//       onClick: () => navigate("/user?filter=active"),
//     },
//     {
//       key: "inactiveUsers",
//       label: "Inactive Users",
//       count: totalInActiveUsers,
//       icon: <FaUserTimes size={20} />,
//       bgColor: alpha(theme.palette.text.secondary, 0.1),
//       iconColor: theme.palette.text.secondary,
//       onClick: () => navigate("/user?filter=inactive"),
//     },
//     {
//       key: "checkedInUsers",
//       label: "Checked In",
//       count: checkedInCount,
//       icon: <FaUserCheck size={20} />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
//       // onClick: () => checkedInCount > 0 && navigate("/admin/live-locations"),
//       onClick: () => {
//         if (checkedInCount > 0) {
//           navigate("/admin/live-locations", {
//             state: { adminId: effectiveAdminId }
//           });
//         }
//       }
//     },
//     {
//       key: "checkedOutUsers",
//       label: "Checked Out",
//       count: checkedOutCount,
//       icon: <FaUserClock size={20} />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
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
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//         width: "100%",
//         overflowX: "hidden",
//         py: { xs: 1.5, sm: 2, md: 3 },
//         px: { xs: 1, sm: 2, md: 3 },
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
//             bgcolor: alpha(theme.palette.background.paper, 0.8),
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
//               mb: { xs: 2.5, sm: 3 },
//               gap: 1.5
//             }}
//           >
//             <Box>
//               <Typography
//                 variant={isMobile ? "h6" : "h5"}
//                 fontWeight="700"
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
//                 }}
//               >
//                 Admin Dashboard
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
//               }}>
//                 Overview • Last updated {lastUpdated.toLocaleTimeString()}
//                 <IconButton
//                   size="small"
//                   sx={{
//                     ml: 0.8,
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     width: { xs: 22, sm: 24 },
//                     height: { xs: 22, sm: 24 },
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                   }}
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                 >
//                   <RefreshIcon
//                     fontSize="small"
//                     sx={{
//                       color: theme.palette.primary.main,
//                       fontSize: { xs: 12, sm: 14 },
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
//               label={isSubAdmin ? "Sub-admin" : "Admin"}
//               size="small"
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 color: "white",
//                 fontWeight: 600,
//                 px: 1.2,
//                 fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                 height: { xs: 26, sm: 28 },
//                 boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
//               }}
//             />
//           </Box>

//           {/* Stats Cards */}
//           <StatsCards stats={userStats} loading={isLoading} />

//           {/* Current Plan Section */}
//           <CurrentPlan planData={planData} loading={isLoading} />

//           {/* Recent Activities */}
//           <RecentActivities users={lastTrackedUsers} loading={isLoading} />
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;



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
//   Button,
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
//   ShoppingBag as ShoppingBagIcon,
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
//   getAdminStats
// } from "../../redux/slices/userSlice";
// import Loader from "../../components/common/Loader";
// import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

// // Stats Card Skeleton - Smaller
// const StatsCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.2, sm: 1.5, md: 1.8 },
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         height: '100%',
//         minHeight: { xs: 80, sm: 85, md: 90, lg: 95 },
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box sx={{ width: '60%' }}>
//           <Skeleton variant="text" width="70%" height={18} />
//           <Skeleton variant="text" width="90%" height={32} />
//         </Box>
//         <Skeleton variant="circular" width={38} height={38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>
//     </Paper>
//   );
// };

// // Current Plan Skeleton - Smaller
// const CurrentPlanSkeleton = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 2.5 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         mb: { xs: 2.5, sm: 3 },
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//       }}
//     >
//       {/* Header Skeleton */}
//       <Box sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         mb: 1.5,
//         pb: 1.5,
//         borderBottom: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1)
//       }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={6} height={6} sx={{ bgcolor: theme.palette.primary.main }} />
//           <Skeleton variant="text" width={90} height={20} />
//         </Box>
//         <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.3) }} />
//       </Box>

//       {/* Description Skeleton */}
//       <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1.5 }} />

//       {/* Stats Grid Skeleton */}
//       <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: 1.5 }}>
//         {[1, 2, 3, 4].map((item) => (
//           <Grid item xs={6} md={3} key={item}>
//             <Box sx={{ p: 0.8 }}>
//               <Skeleton variant="text" width="50%" height={14} />
//               <Skeleton variant="text" width="70%" height={20} />
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//       {/* Dates Skeleton */}
//       <Grid container spacing={2} sx={{ mb: 1.5 }}>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={14} />
//           <Skeleton variant="text" width="60%" height={18} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Skeleton variant="text" width="40%" height={14} />
//           <Skeleton variant="text" width="60%" height={18} />
//         </Grid>
//       </Grid>

//       {/* Progress Skeleton */}
//       <Box sx={{ mb: 1.5 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
//           <Skeleton variant="text" width={90} height={14} />
//           <Skeleton variant="rounded" width={70} height={18} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//         <Skeleton variant="rounded" width="100%" height={5} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       {/* User Limits Skeleton */}
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={14} />
//           <Skeleton variant="text" width="40%" height={22} />
//         </Grid>
//         <Grid item xs={6}>
//           <Skeleton variant="text" width="50%" height={14} />
//           <Skeleton variant="text" width="40%" height={22} />
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Recent Activities Skeleton - Smaller
// const RecentActivitiesSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 2.5 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//         <Skeleton variant="text" width={130} height={28} />
//         <Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>

//       <Stack spacing={1.5}>
//         {[1, 2, 3, 4].map((item) => (
//           <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="40%" height={18} />
//               <Skeleton variant="text" width="60%" height={14} />
//             </Box>
//             <Skeleton variant="text" width={70} height={14} />
//           </Box>
//         ))}
//       </Stack>
//     </Paper>
//   );
// };

// // Empty Recent Activities Component
// const EmptyRecentActivities = () => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 2.5, sm: 3 },
//         borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//         textAlign: "center",
//       }}
//     >
//       <Box sx={{ py: 2 }}>
//         <TimelineIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1 }} />
//         <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
//           No recent activities
//         </Typography>
//         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//           User activities will appear here
//         </Typography>
//       </Box>
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
//     if (isSmallMobile) return 28;
//     if (isMobile) return 32;
//     if (isTablet) return 36;
//     return 40;
//   };

//   const getFontSize = () => {
//     if (isSmallMobile) return '1rem';
//     if (isMobile) return '1.1rem';
//     if (isTablet) return '1.2rem';
//     return '1.3rem';
//   };

//   // Show skeletons when loading
//   if (loading) {
//     return (
//       <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2, lg: 2.5 }} sx={{ mb: { xs: 2.5, sm: 3 } }}>
//         {[1, 2, 3, 4].map((_, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <StatsCardSkeleton />
//           </Grid>
//         ))}
//       </Grid>
//     );
//   }

//   return (
//     <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2, lg: 2.5 }} sx={{ mb: { xs: 2.5, sm: 3 } }}>
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
//                 p: { xs: 1.2, sm: 1.5, md: 1.8 },
//                 borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                 background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                 border: "1px solid",
//                 borderColor: alpha(stat.iconColor, 0.2),
//                 cursor: stat.onClick ? "pointer" : "default",
//                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                 position: "relative",
//                 overflow: "hidden",
//                 height: '100%',
//                 minHeight: { xs: 80, sm: 85, md: 90, lg: 95 },
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
//                     transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
//                     boxShadow: !isMobile ? `0 15px 25px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
//                     borderColor: stat.iconColor,
//                     "& .stat-icon": {
//                       transform: !isMobile ? "scale(1.05) rotate(5deg)" : "none",
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
//                       variant="h6"
//                       fontWeight="700"
//                       className="stat-value"
//                       sx={{
//                         mb: 0.25,
//                         color: 'text.primary',
//                         transition: "color 0.3s ease",
//                         fontSize: getFontSize(),
//                         lineHeight: 1.2,
//                       }}
//                     >
//                       {stat.count !== undefined ? stat.count : 0}
//                     </Typography>
//                     <Typography
//                       variant="caption"
//                       color="text.secondary"
//                       sx={{
//                         fontWeight: 500,
//                         fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem', lg: '0.7rem' },
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
//                       boxShadow: `0 6px 12px -4px ${alpha(stat.iconColor, 0.2)}`,
//                       '& svg': {
//                         fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' }
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
//                   height: 2.5,
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

// // const CurrentPlan = ({ planData, loading }) => {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// //   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
// //   const isSmallMobile = useMediaQuery('(max-width:480px)');

// //   if (loading) {
// //     return <CurrentPlanSkeleton />;
// //   }

// //   // Show empty state if no plan data
// //   if (!planData) {
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5, delay: 0.2 }}
// //       >
// //         <Paper
// //           elevation={0}
// //           sx={{
// //             p: { xs: 2, sm: 2.5, md: 3 },
// //             borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
// //             border: "1px solid",
// //             borderColor: alpha(theme.palette.primary.main, 0.1),
// //             mb: { xs: 2.5, sm: 3 },
// //             background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
// //             textAlign: "center",
// //           }}
// //         >
// //           <Box sx={{ py: 2 }}>
// //             <Box
// //               sx={{
// //                 width: { xs: 48, sm: 56 },
// //                 height: { xs: 48, sm: 56 },
// //                 borderRadius: "50%",
// //                 bgcolor: alpha(theme.palette.primary.main, 0.1),
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 mx: "auto",
// //                 mb: 1.5,
// //               }}
// //             >
// //               <PeopleIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: theme.palette.primary.main }} />
// //             </Box>
// //             <Typography variant="body1" fontWeight="600" sx={{ fontSize: '0.9rem', color: 'text.primary', mb: 0.5 }}>
// //               No Active Plan
// //             </Typography>
// //             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
// //               You haven't purchased any plan yet
// //             </Typography>
// //           </Box>
// //         </Paper>
// //       </motion.div>
// //     );
// //   }

// //   const daysLeft = planExpiresIn(planData.expiresAt);

// //   const calculateProgress = () => {
// //     if (!planData.createdAt || !planData.expiresAt) return 0;
// //     const created = new Date(planData.createdAt);
// //     const expires = new Date(planData.expiresAt);
// //     const today = new Date();
// //     const totalDuration = expires - created;
// //     const elapsed = today - created;
// //     let progress = (elapsed / totalDuration) * 100;
// //     return Math.min(Math.max(progress, 0), 100);
// //   };

// //   const progress = calculateProgress();

// //   const getStatusColor = () => {
// //     if (daysLeft <= 0) return "#ef4444";
// //     if (daysLeft <= 7) return theme.palette.secondary.main;
// //     return theme.palette.primary.main;
// //   };

// //   const statusColor = getStatusColor();

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5, delay: 0.2 }}
// //     >
// //       <Paper
// //         elevation={0}
// //         sx={{
// //           p: { xs: 1.5, sm: 2, md: 2.5 },
// //           borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
// //           border: "1px solid",
// //           borderColor: alpha(statusColor, 0.2),
// //           mb: { xs: 2.5, sm: 3 },
// //           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
// //           boxShadow: `0 8px 25px -12px ${alpha(statusColor, 0.2)}`,
// //         }}
// //       >
// //         {/* Header */}
// //         <Box sx={{
// //           display: "flex",
// //           flexDirection: { xs: 'column', sm: 'row' },
// //           justifyContent: "space-between",
// //           alignItems: { xs: 'flex-start', sm: 'center' },
// //           mb: { xs: 1.2, sm: 1.5 },
// //           pb: { xs: 1.2, sm: 1.5 },
// //           borderBottom: "2px solid",
// //           borderColor: alpha(statusColor, 0.1),
// //           gap: { xs: 0.8, sm: 0 }
// //         }}>
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
// //             <Box
// //               sx={{
// //                 width: { xs: 6, sm: 8 },
// //                 height: { xs: 6, sm: 8 },
// //                 borderRadius: "50%",
// //                 bgcolor: statusColor,
// //                 animation: daysLeft <= 7 ? "pulse 2s infinite" : "none",
// //                 "@keyframes pulse": {
// //                   "0%": { opacity: 1, transform: "scale(1)" },
// //                   "50%": { opacity: 0.5, transform: "scale(1.2)" },
// //                   "100%": { opacity: 1, transform: "scale(1)" },
// //                 },
// //               }}
// //             />
// //             <Typography
// //               variant={isMobile ? "body1" : "h6"}
// //               fontWeight="600"
// //               sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
// //             >
// //               Current Plan
// //             </Typography>
// //           </Box>
// //         </Box>

// //         {/* Plan Description */}
// //         <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
// //           <Typography
// //             variant={isMobile ? "body1" : "h6"}
// //             fontWeight="600"
// //             gutterBottom
// //             sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, color: 'text.primary' }}
// //           >
// //             {planData.description || "No Plan Description"}
// //           </Typography>
// //         </Box>

// //         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }} sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
// //           <Grid item xs={6} md={3}>
// //             <Box sx={{
// //               bgcolor: alpha(statusColor, 0.03),
// //               p: { xs: 0.8, sm: 1, md: 1.2 },
// //               borderRadius: 1.5,
// //               border: "1px solid",
// //               borderColor: alpha(statusColor, 0.1),
// //               height: '100%',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               justifyContent: 'center',
// //             }}>
// //               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //                 Duration
// //               </Typography>
// //               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
// //                 {planData.duration || "N/A"}
// //               </Typography>
// //             </Box>
// //           </Grid>
// //           <Grid item xs={6} md={3}>
// //             <Box sx={{
// //               bgcolor: alpha(statusColor, 0.03),
// //               p: { xs: 0.8, sm: 1, md: 1.2 },
// //               borderRadius: 1.5,
// //               border: "1px solid",
// //               borderColor: alpha(statusColor, 0.1),
// //               height: '100%',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               justifyContent: 'center',
// //             }}>
// //               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //                 Amount
// //               </Typography>
// //               <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.7rem', color: statusColor }}>
// //                 ₹{planData.amount || "0"}
// //               </Typography>
// //             </Box>
// //           </Grid>
// //           <Grid item xs={6} md={3}>
// //             <Box sx={{
// //               bgcolor: alpha(statusColor, 0.03),
// //               p: { xs: 0.8, sm: 1, md: 1.2 },
// //               borderRadius: 1.5,
// //               border: "1px solid",
// //               borderColor: alpha(statusColor, 0.1),
// //               height: '100%',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               justifyContent: 'center',
// //             }}>
// //               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //                 Currency
// //               </Typography>
// //               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
// //                 {planData.currency || "INR"}
// //               </Typography>
// //             </Box>
// //           </Grid>
// //           <Grid item xs={6} md={3}>
// //             <Box sx={{
// //               bgcolor: alpha(statusColor, 0.03),
// //               p: { xs: 0.8, sm: 1, md: 1.2 },
// //               borderRadius: 1.5,
// //               border: "1px solid",
// //               borderColor: alpha(statusColor, 0.1),
// //               height: '100%',
// //               display: 'flex',
// //               flexDirection: 'column',
// //               justifyContent: 'center',
// //             }}>
// //               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //                 Status
// //               </Typography>
// //               <Chip
// //                 label={planData.isActive ? "Active" : "Inactive"}
// //                 size="small"
// //                 sx={{
// //                   bgcolor: alpha(planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary, 0.1),
// //                   color: planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary,
// //                   fontWeight: 600,
// //                   fontSize: '0.6rem',
// //                   height: 18,
// //                   mt: 0.3,
// //                   alignSelf: 'flex-start',
// //                 }}
// //               />
// //             </Box>
// //           </Grid>
// //         </Grid>
// //         <Divider sx={{ my: { xs: 1.2, sm: 1.5 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

// //         <Box
// //           sx={{
// //             display: 'flex',
// //             flexDirection: 'row',
// //             justifyContent: 'space-between',
// //             alignItems: 'flex-start',
// //             mb: { xs: 1.2, sm: 1.5 },
// //             gap: 2
// //           }}
// //         >
// //           <Box sx={{ flex: 1 }}>
// //             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //               Created At
// //             </Typography>
// //             <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
// //               {formatDateDDMMYYYY(planData.createdAt)}
// //             </Typography>
// //           </Box>
// //           <Box sx={{ flex: 1 }}>
// //             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //               Expires At
// //             </Typography>
// //             <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
// //               {formatDateDDMMYYYY(planData.expiresAt)}
// //             </Typography>
// //           </Box>
// //         </Box>
// //         {/* Progress Section */}
// //         {planData.expiresAt && (
// //           <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
// //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
// //               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //                 Progress {Math.round(progress)}%
// //               </Typography>
// //               <Chip
// //                 label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
// //                 size="small"
// //                 sx={{
// //                   bgcolor: alpha(statusColor, 0.1),
// //                   color: statusColor,
// //                   height: 18,
// //                   fontSize: "0.6rem",
// //                   fontWeight: 600,
// //                 }}
// //               />
// //             </Box>
// //             <LinearProgress
// //               variant="determinate"
// //               value={progress}
// //               sx={{
// //                 height: { xs: 4, sm: 5 },
// //                 borderRadius: 2,
// //                 bgcolor: alpha(statusColor, 0.1),
// //                 "& .MuiLinearProgress-bar": {
// //                   bgcolor: statusColor,
// //                   borderRadius: 2,
// //                 },
// //               }}
// //             />
// //           </Box>
// //         )}

// //         {/* User Limits */}
// //         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }}>
// //           <Grid item xs={6}>
// //             <Box sx={{
// //               bgcolor: alpha(statusColor, 0.05),
// //               p: { xs: 0.8, sm: 1, md: 1.2 },
// //               borderRadius: 1.5,
// //               border: "1px solid",
// //               borderColor: alpha(statusColor, 0.15),
// //             }}>
// //               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //                 Min Users
// //               </Typography>
// //               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
// //                 {planData.minUser || planData.minUsers || "0"}
// //               </Typography>
// //             </Box>
// //           </Grid>
// //           <Grid item xs={6}>
// //             <Box sx={{
// //               bgcolor: alpha(statusColor, 0.05),
// //               p: { xs: 0.8, sm: 1, md: 1.2 },
// //               borderRadius: 1.5,
// //               border: "1px solid",
// //               borderColor: alpha(statusColor, 0.15),
// //             }}>
// //               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
// //                 Max Users
// //               </Typography>
// //               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
// //                 {planData.maxUser || planData.maxUsers || "0"}
// //               </Typography>
// //             </Box>
// //           </Grid>
// //         </Grid>
// //       </Paper>
// //     </motion.div>
// //   );
// // };

// // RecentActivities Component - Smaller

// const CurrentPlan = ({ planData, loading, onPurchasePlan, isSubAdmin }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <CurrentPlanSkeleton />;
//   }

//   // Show empty state with purchase button if no plan data
//   if (!planData) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2.5, sm: 3, md: 4 },
//             borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             mb: { xs: 2.5, sm: 3 },
//             background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//             textAlign: "center",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* Decorative background */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 70%)`,
//               pointerEvents: "none",
//             }}
//           />

//           <Box sx={{ position: "relative", zIndex: 1 }}>
//             <Box
//               sx={{
//                 width: { xs: 60, sm: 80, md: 100 },
//                 height: { xs: 60, sm: 80, md: 100 },
//                 borderRadius: "50%",
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mx: "auto",
//                 mb: 2,
//               }}
//             >
//               <ShoppingBagIcon sx={{ fontSize: { xs: 30, sm: 40, md: 50 }, color: theme.palette.primary.main }} />
//             </Box>

//             <Typography
//               variant={isMobile ? "h6" : "h5"}
//               fontWeight="700"
//               sx={{
//                 fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
//                 color: 'text.primary',
//                 mb: 1,
//               }}
//             >
//               No Active Plan
//             </Typography>

//             {/* <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                 mb: 2.5,
//                 maxWidth: 400,
//                 mx: 'auto',
//               }}
//             >
//               You don't have an active subscription plan. Purchase a plan to start tracking your users and accessing all features.
//             </Typography> */}

//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                 mb: 2.5,
//                 maxWidth: 400,
//                 mx: 'auto',
//               }}
//             >
//               {isSubAdmin
//                 ? "You don't have an active subscription plan. Please contact your admin to purchase a plan."
//                 : "You don't have an active subscription plan. Purchase a plan to start tracking your users and accessing all features."
//               }
//             </Typography>
//             {!isSubAdmin && (
//               <Button
//                 variant="contained"
//                 startIcon={<ShoppingBagIcon />}
//                 onClick={onPurchasePlan}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   borderRadius: 2,
//                   px: { xs: 2.5, sm: 3, md: 4 },
//                   py: { xs: 0.8, sm: 1, md: 1.2 },
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                   fontWeight: 600,
//                   textTransform: 'none',
//                   boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: `0 12px 24px -8px ${alpha(theme.palette.primary.main, 0.4)}`,
//                   },
//                   transition: 'all 0.3s ease',
//                 }}
//               >
//                 Purchase a Plan
//               </Button>
//             )}
//           </Box>
//         </Paper>
//       </motion.div>
//     );
//   }

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
//     if (daysLeft <= 7) return theme.palette.secondary.main;
//     return theme.palette.primary.main;
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
//           p: { xs: 1.5, sm: 2, md: 2.5 },
//           borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//           border: "1px solid",
//           borderColor: alpha(statusColor, 0.2),
//           mb: { xs: 2.5, sm: 3 },
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//           boxShadow: `0 8px 25px -12px ${alpha(statusColor, 0.2)}`,
//         }}
//       >
//         {/* Header with Upgrade Button */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.2, sm: 1.5 },
//           pb: { xs: 1.2, sm: 1.5 },
//           borderBottom: "2px solid",
//           borderColor: alpha(statusColor, 0.1),
//           gap: { xs: 0.8, sm: 0 }
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
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
//               variant={isMobile ? "body1" : "h6"}
//               fontWeight="600"
//               sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//             >
//               Current Plan
//             </Typography>
//           </Box>
//           {!isSubAdmin && (
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={onPurchasePlan}
//               startIcon={<ShoppingBagIcon sx={{ fontSize: 14 }} />}
//               sx={{
//                 borderColor: alpha(statusColor, 0.5),
//                 color: statusColor,
//                 fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                 height: { xs: 26, sm: 28 },
//                 '&:hover': {
//                   borderColor: statusColor,
//                   bgcolor: alpha(statusColor, 0.05),
//                 },
//               }}
//             >
//               Upgrade Plan
//             </Button>
//           )}
//         </Box>

//         {/* Plan Description */}
//         <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//           <Typography
//             variant={isMobile ? "body1" : "h6"}
//             fontWeight="600"
//             gutterBottom
//             sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, color: 'text.primary' }}
//           >
//             {planData.description || "No Plan Description"}
//           </Typography>
//         </Box>

//         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }} sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Duration
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                 {planData.duration || "N/A"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Amount
//               </Typography>
//               <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.7rem', color: statusColor }}>
//                 ₹{planData.amount || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Currency
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                 {planData.currency || "INR"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Status
//               </Typography>
//               <Chip
//                 label={planData.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary, 0.1),
//                   color: planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary,
//                   fontWeight: 600,
//                   fontSize: '0.6rem',
//                   height: 18,
//                   mt: 0.3,
//                   alignSelf: 'flex-start',
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: { xs: 1.2, sm: 1.5 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//             mb: { xs: 1.2, sm: 1.5 },
//             gap: 2
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//               Created At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//               {formatDateDDMMYYYY(planData.createdAt)}
//             </Typography>
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//               Expires At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//               {formatDateDDMMYYYY(planData.expiresAt)}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Progress Section */}
//         {planData.expiresAt && (
//           <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Progress {Math.round(progress)}%
//               </Typography>
//               <Chip
//                 label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(statusColor, 0.1),
//                   color: statusColor,
//                   height: 18,
//                   fontSize: "0.6rem",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: { xs: 4, sm: 5 },
//                 borderRadius: 2,
//                 bgcolor: alpha(statusColor, 0.1),
//                 "& .MuiLinearProgress-bar": {
//                   bgcolor: statusColor,
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* User Limits */}
//         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }}>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Min Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
//                 {planData.minUser || planData.minUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Max Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
//                 {planData.maxUser || planData.maxUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </motion.div>
//   );
// };

// const RecentActivities = ({ users, loading }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <RecentActivitiesSkeleton />;
//   }

//   if (!users || users.length === 0) {
//     return <EmptyRecentActivities />;
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
//           p: { xs: 1.5, sm: 2, md: 2.5 },
//           borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.5, sm: 2 },
//           gap: 0.8
//         }}>
//           <Typography variant="body1" fontWeight="600" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: theme.palette.primary.main }}>
//             Recent Activities
//           </Typography>
//           {users.length > 4 && (
//             <Chip
//               label={`View All (${users.length})`}
//               size="small"
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 fontWeight: 500,
//                 cursor: "pointer",
//                 fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                 height: { xs: 22, sm: 24 },
//                 "&:hover": {
//                   bgcolor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             />
//           )}
//         </Box>

//         <Stack spacing={1.5}>
//           {displayUsers.map((activity, index) => (
//             <motion.div
//               key={activity._id || index}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: { xs: 1.2, sm: 1.5 },
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   bgcolor: alpha(theme.palette.primary.main, 0.02),
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   textAlign: { xs: 'center', sm: 'left' },
//                   gap: { xs: 0.8, sm: 0 },
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                     transform: !isMobile ? "translateX(4px)" : "none",
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   },
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.2),
//                     color: theme.palette.primary.main,
//                     mr: { xs: 0, sm: 1.5 },
//                     mb: { xs: 0.5, sm: 0 },
//                     width: { xs: 36, sm: 40 },
//                     height: { xs: 36, sm: 40 },
//                     fontSize: '0.8rem',
//                     fontWeight: 600,
//                   }}
//                 >
//                   {activity.name?.charAt(0) || "U"}
//                 </Avatar>
//                 <Box sx={{ flex: 1, width: '100%' }}>
//                   <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
//                     {activity.name || "Unknown User"}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//                     {activity.status || "No action"}
//                   </Typography>
//                 </Box>

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
//   const handlePurchasePlan = () => {
//     navigate("/admin/payments-plans");
//   };
//   // // Determine role-based text
//   // const isSubAdmin = Number(userData.role_id) === 3;
//   // const dashboardTitle = isSubAdmin ? "Subadmin Dashboard" : "Admin Dashboard";
//   // const roleBadgeLabel = isSubAdmin ? "Sub-admin" : "Admin";
//   // Determine role-based text - CHECK LOCALSTORAGE DIRECTLY
//   const getStoredUser = () => {
//     try {
//       const stored = localStorage.getItem('user');
//       return stored ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   };

//   const storedUser = getStoredUser();
//   const effectiveRoleId = storedUser?.role_id || userData?.role_id;
//   const isSubAdmin = Number(effectiveRoleId) === 3;
//   const dashboardTitle = isSubAdmin ? "Subadmin Dashboard" : "Admin Dashboard";
//   const roleBadgeLabel = isSubAdmin ? "Sub-admin" : "Admin";

//   // Robustly determine the effective admin ID (parent organization ID)
//   const rawAdminId = userData.adminId;
//   const effectiveAdminId = isSubAdmin
//     ? (typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId)
//     : (userData?._id || userData?.id);

//   const lastTrackedUsers = userState.lastTrackedUsers || [];
//   const loading = userState.loading || false;

//   // Consolidated data fetching function
//   // const fetchAllData = useCallback(async (isInitialLoad = false) => {
//   //   if (!effectiveAdminId) {
//   //     setIsLoading(false);
//   //     return;
//   //   }

//   //   try {
//   //     if (isInitialLoad) {
//   //       setIsLoading(true);
//   //     }

//   //     const startTime = isInitialLoad ? Date.now() : null;

//   //     const userResult = await dispatch(getUserById(effectiveAdminId)).unwrap();

//   //     if (userResult?.user?.currentPaymentId) {
//   //       const plan = userResult.user.currentPaymentId;
//   //       setPlanData({
//   //         description: plan.description,
//   //         duration: plan.duration,
//   //         amount: plan.amount,
//   //         currency: plan.currency,
//   //         isActive: plan.isActive,
//   //         createdAt: plan.createdAt,
//   //         expiresAt: plan.expiresAt,
//   //         minUser: plan.minUser,
//   //         maxUser: plan.maxUser,
//   //       });
//   //     } else {
//   //       setPlanData(null);
//   //     }

//   //     const adminId = effectiveAdminId;
//   //     if (!adminId) {
//   //       console.error("Admin ID is missing, cannot fetch locations");
//   //       return;
//   //     }

//   //     const [lastTrackedResult, locationsResult, countsResult, allUsersResult] =
//   //       await Promise.all([
//   //         dispatch(getLastFiveTrackedUsers(adminId)),
//   //         dispatch(getActiveUserLocations(adminId)),
//   //         dispatch(getUserCounts()),
//   //         dispatch(getAllUsers(adminId))
//   //       ]);

//   //     if (allUsersResult.payload?.users) {
//   //       const users = allUsersResult.payload.users;
//   //       const today = new Date().toISOString().split("T")[0];

//   //       setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
//   //       setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
//   //       setTotalActiveUsers(users.filter(u => u.isActive).length);
//   //       setTotalInActiveUsers(users.filter(u => !u.isActive).length);
//   //       setTotalUsers(users.length);

//   //     } else {
//   //       setCheckedOutCount(0);
//   //       setCheckedInCount(0);
//   //       setTotalActiveUsers(0);
//   //       setTotalInActiveUsers(0);
//   //       setTotalUsers(0);
//   //     }

//   //     setLastUpdated(new Date());

//   //     if (isInitialLoad && startTime) {
//   //       const fetchDuration = Date.now() - startTime;
//   //       const minLoadTime = 1000;
//   //       if (fetchDuration < minLoadTime) {
//   //         await new Promise(resolve => setTimeout(resolve, minLoadTime - fetchDuration));
//   //       }
//   //     }

//   //   } catch (error) {
//   //     console.error("Error fetching dashboard data:", error);
//   //     setCheckedOutCount(0);
//   //     setCheckedInCount(0);
//   //     setTotalActiveUsers(0);
//   //     setTotalInActiveUsers(0);
//   //     setTotalUsers(0);
//   //     setPlanData(null);
//   //   } finally {
//   //     if (isInitialLoad) {
//   //       setIsLoading(false);
//   //     }
//   //   }

//   // }, [dispatch, effectiveAdminId]);
//   const [adminStats, setAdminStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     inactiveUsers: 0,
//     currentlyTracking: 0,
//     todayCheckedOut: 0
//   });

//   // Update the fetchAllData function
//   const fetchAllData = useCallback(async (isInitialLoad = false) => {
//     if (!effectiveAdminId) {
//       setIsLoading(false);
//       return;
//     }

//     try {
//       if (isInitialLoad) {
//         setIsLoading(true);
//       }

//       const startTime = isInitialLoad ? Date.now() : null;

//       const userResult = await dispatch(getUserById(effectiveAdminId)).unwrap();

//       if (userResult?.user?.currentPaymentId) {
//         const plan = userResult.user.currentPaymentId;
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
//         setPlanData(null);
//       }

//       const adminId = effectiveAdminId;
//       if (!adminId) {
//         console.error("Admin ID is missing, cannot fetch locations");
//         return;
//       }

//       const [lastTrackedResult, locationsResult, countsResult, allUsersResult, adminStatsResult] =
//         await Promise.all([
//           dispatch(getLastFiveTrackedUsers(adminId)),
//           dispatch(getActiveUserLocations(adminId)),
//           dispatch(getUserCounts()),
//           dispatch(getAllUsers(adminId)),
//           dispatch(getAdminStats({ adminId }))
//         ]);

//       // Extract admin stats from the result
//       if (adminStatsResult?.payload?.count) {
//         const stats = adminStatsResult.payload.count;
//         setAdminStats({
//           totalUsers: stats.totalUsers || 0,
//           activeUsers: stats.activeUsers || 0,
//           inactiveUsers: stats.inactiveUsers || 0,
//           currentlyTracking: stats.currentlyTracking || 0,
//           todayCheckedOut: stats.todayCheckedOut || 0
//         });

//         // Set the counts from admin stats
//         setTotalActiveUsers(stats.activeUsers || 0);
//         setTotalInActiveUsers(stats.inactiveUsers || 0);
//         setCheckedInCount(stats.currentlyTracking || 0);
//         setCheckedOutCount(stats.todayCheckedOut || 0);
//         setTotalUsers(stats.totalUsers || 0);
//       } else {
//         // Fallback to allUsersResult if adminStats fails
//         if (allUsersResult.payload?.users) {
//           const users = allUsersResult.payload.users;
//           const today = new Date().toISOString().split("T")[0];

//           setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
//           setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
//           setTotalActiveUsers(users.filter(u => u.isActive).length);
//           setTotalInActiveUsers(users.filter(u => !u.isActive).length);
//           setTotalUsers(users.length);
//         } else {
//           setCheckedOutCount(0);
//           setCheckedInCount(0);
//           setTotalActiveUsers(0);
//           setTotalInActiveUsers(0);
//           setTotalUsers(0);
//         }
//       }


//       setLastUpdated(new Date());

//       if (isInitialLoad && startTime) {
//         const fetchDuration = Date.now() - startTime;
//         const minLoadTime = 1000;
//         if (fetchDuration < minLoadTime) {
//           await new Promise(resolve => setTimeout(resolve, minLoadTime - fetchDuration));
//         }
//       }

//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       setCheckedOutCount(0);
//       setCheckedInCount(0);
//       setTotalActiveUsers(0);
//       setTotalInActiveUsers(0);
//       setTotalUsers(0);
//       setPlanData(null);
//     } finally {
//       if (isInitialLoad) {
//         setIsLoading(false);
//       }
//     }

//   }, [dispatch, effectiveAdminId]);
//   // Effects
//   useEffect(() => {
//     if (!hasMounted.current) {
//       hasMounted.current = true;

//       if (userData?._id) {
//         fetchAllData(true);
//       } else {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//           try {
//             const parsedUser = JSON.parse(storedUser);
//             if (parsedUser?._id) {
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
//   }, []);

//   useEffect(() => {
//     if (effectiveAdminId && hasMounted.current) {
//       fetchAllData(true);
//     }
//   }, [effectiveAdminId]);

//   useEffect(() => {
//     const handleFocus = () => {
//       if (userData?._id) {
//         fetchAllData(false);
//       }
//     };
//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [userData?._id, fetchAllData]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchAllData(false);
//     setIsRefreshing(false);
//   };

//   const userStats = [
//     {
//       key: "activeUsers",
//       label: "Active Users",
//       count: totalActiveUsers,  // This now comes from adminStats.activeUsers
//       icon: <FaUsers size={20} />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
//       onClick: () => navigate("/user?filter=active"),
//     },
//     {
//       key: "inactiveUsers",
//       label: "Inactive Users",
//       count: totalInActiveUsers,  // This now comes from adminStats.inactiveUsers
//       icon: <FaUserTimes size={20} />,
//       bgColor: alpha(theme.palette.text.secondary, 0.1),
//       iconColor: theme.palette.text.secondary,
//       onClick: () => navigate("/user?filter=inactive"),
//     },
//     {
//       key: "checkedInUsers",
//       label: "Checked In",
//       count: checkedInCount,  // This now comes from adminStats.currentlyTracking
//       icon: <FaUserCheck size={20} />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
//       onClick: () => {
//         if (checkedInCount > 0) {
//           navigate("/admin/live-locations", {
//             state: { adminId: effectiveAdminId }
//           });
//         }
//       }
//     },
//     {
//       key: "checkedOutUsers",
//       label: "Checked Out",
//       count: checkedOutCount,  // This now comes from adminStats.todayCheckedOut
//       icon: <FaUserClock size={20} />,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//       iconColor: theme.palette.primary.main,
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
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//         width: "100%",
//         overflowX: "hidden",
//         py: { xs: 1.5, sm: 2, md: 3 },
//         px: { xs: 1, sm: 2, md: 3 },
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
//             bgcolor: alpha(theme.palette.background.paper, 0.8),
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
//               mb: { xs: 2.5, sm: 3 },
//               gap: 1.5
//             }}
//           >
//             <Box>
//               <Typography
//                 variant={isMobile ? "h6" : "h5"}
//                 fontWeight="700"
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
//                 }}
//               >
//                 {dashboardTitle}
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
//               }}>
//                 Overview • Last updated {lastUpdated.toLocaleTimeString()}
//                 <IconButton
//                   size="small"
//                   sx={{
//                     ml: 0.8,
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     width: { xs: 22, sm: 24 },
//                     height: { xs: 22, sm: 24 },
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                   }}
//                   onClick={handleRefresh}
//                   disabled={isRefreshing}
//                 >
//                   <RefreshIcon
//                     fontSize="small"
//                     sx={{
//                       color: theme.palette.primary.main,
//                       fontSize: { xs: 12, sm: 14 },
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
//               label={roleBadgeLabel}
//               size="small"
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 color: "white",
//                 fontWeight: 600,
//                 px: 1.2,
//                 fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                 height: { xs: 26, sm: 28 },
//                 boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
//               }}
//             />
//           </Box>

//           {/* Stats Cards */}
//           <StatsCards stats={userStats} loading={isLoading} />

//           {/* Current Plan Section */}
//           <CurrentPlan planData={planData} loading={isLoading} onPurchasePlan={handlePurchasePlan} isSubAdmin={isSubAdmin} />

//           {/* Recent Activities */}
//           <RecentActivities users={lastTrackedUsers} loading={isLoading} />
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AdminDashboard;







////////////// 

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  Button,
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
  ShoppingBag as ShoppingBagIcon,
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
  getAdminStats
} from "../../redux/slices/userSlice";
import Loader from "../../components/common/Loader";
import { formatDateDDMMYYYY, planExpiresIn } from "../../utils/dateFormat";

// Stats Card Skeleton - Smaller
const StatsCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.2, sm: 1.5, md: 1.8 },
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        height: '100%',
        minHeight: { xs: 80, sm: 85, md: 90, lg: 95 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ width: '60%' }}>
          <Skeleton variant="text" width="70%" height={18} />
          <Skeleton variant="text" width="90%" height={32} />
        </Box>
        <Skeleton variant="circular" width={38} height={38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </Box>
    </Paper>
  );
};

// Current Plan Skeleton - Smaller
const CurrentPlanSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2, md: 2.5 },
        borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        mb: { xs: 2.5, sm: 3 },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
      }}
    >
      {/* Header Skeleton */}
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1.5,
        pb: 1.5,
        borderBottom: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1)
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={6} height={6} sx={{ bgcolor: theme.palette.primary.main }} />
          <Skeleton variant="text" width={90} height={20} />
        </Box>
        <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.3) }} />
      </Box>

      {/* Description Skeleton */}
      <Skeleton variant="text" width="60%" height={28} sx={{ mb: 1.5 }} />

      {/* Stats Grid Skeleton */}
      <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: 1.5 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={6} md={3} key={item}>
            <Box sx={{ p: 0.8 }}>
              <Skeleton variant="text" width="50%" height={14} />
              <Skeleton variant="text" width="70%" height={20} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

      {/* Dates Skeleton */}
      <Grid container spacing={2} sx={{ mb: 1.5 }}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" width="40%" height={14} />
          <Skeleton variant="text" width="60%" height={18} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" width="40%" height={14} />
          <Skeleton variant="text" width="60%" height={18} />
        </Grid>
      </Grid>

      {/* Progress Skeleton */}
      <Box sx={{ mb: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Skeleton variant="text" width={90} height={14} />
          <Skeleton variant="rounded" width={70} height={18} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </Box>
        <Skeleton variant="rounded" width="100%" height={5} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </Box>

      {/* User Limits Skeleton */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Skeleton variant="text" width="50%" height={14} />
          <Skeleton variant="text" width="40%" height={22} />
        </Grid>
        <Grid item xs={6}>
          <Skeleton variant="text" width="50%" height={14} />
          <Skeleton variant="text" width="40%" height={22} />
        </Grid>
      </Grid>
    </Paper>
  );
};

// Recent Activities Skeleton - Smaller
const RecentActivitiesSkeleton = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2, md: 2.5 },
        borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Skeleton variant="text" width={130} height={28} />
        <Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </Box>

      <Stack spacing={1.5}>
        {[1, 2, 3, 4].map((item) => (
          <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="40%" height={18} />
              <Skeleton variant="text" width="60%" height={14} />
            </Box>
            <Skeleton variant="text" width={70} height={14} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

// Empty Recent Activities Component
const EmptyRecentActivities = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        textAlign: "center",
      }}
    >
      <Box sx={{ py: 2 }}>
        <TimelineIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1 }} />
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem', mb: 0.5 }}>
          No recent activities
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
          User activities will appear here
        </Typography>
      </Box>
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
    if (isSmallMobile) return 28;
    if (isMobile) return 32;
    if (isTablet) return 36;
    return 40;
  };

  const getFontSize = () => {
    if (isSmallMobile) return '1rem';
    if (isMobile) return '1.1rem';
    if (isTablet) return '1.2rem';
    return '1.3rem';
  };

  // Show skeletons when loading
  if (loading) {
    return (
      <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2, lg: 2.5 }} sx={{ mb: { xs: 2.5, sm: 3 } }}>
        {[1, 2, 3, 4].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2, lg: 2.5 }} sx={{ mb: { xs: 2.5, sm: 3 } }}>
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
                p: { xs: 1.2, sm: 1.5, md: 1.8 },
                borderRadius: { xs: 2, sm: 2.5, md: 3 },
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                border: "1px solid",
                borderColor: alpha(stat.iconColor, 0.2),
                cursor: stat.onClick ? "pointer" : "default",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                height: '100%',
                minHeight: { xs: 80, sm: 85, md: 90, lg: 95 },
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
                    transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
                    boxShadow: !isMobile ? `0 15px 25px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
                    borderColor: stat.iconColor,
                    "& .stat-icon": {
                      transform: !isMobile ? "scale(1.05) rotate(5deg)" : "none",
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
                      variant="h6"
                      fontWeight="700"
                      className="stat-value"
                      sx={{
                        mb: 0.25,
                        color: 'text.primary',
                        transition: "color 0.3s ease",
                        fontSize: getFontSize(),
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.count !== undefined ? stat.count : 0}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem', lg: '0.7rem' },
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
                      boxShadow: `0 6px 12px -4px ${alpha(stat.iconColor, 0.2)}`,
                      '& svg': {
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' }
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

// const CurrentPlan = ({ planData, loading }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   if (loading) {
//     return <CurrentPlanSkeleton />;
//   }

//   // Show empty state if no plan data
//   if (!planData) {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             mb: { xs: 2.5, sm: 3 },
//             background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//             textAlign: "center",
//           }}
//         >
//           <Box sx={{ py: 2 }}>
//             <Box
//               sx={{
//                 width: { xs: 48, sm: 56 },
//                 height: { xs: 48, sm: 56 },
//                 borderRadius: "50%",
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mx: "auto",
//                 mb: 1.5,
//               }}
//             >
//               <PeopleIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: theme.palette.primary.main }} />
//             </Box>
//             <Typography variant="body1" fontWeight="600" sx={{ fontSize: '0.9rem', color: 'text.primary', mb: 0.5 }}>
//               No Active Plan
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//               You haven't purchased any plan yet
//             </Typography>
//           </Box>
//         </Paper>
//       </motion.div>
//     );
//   }

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
//     if (daysLeft <= 7) return theme.palette.secondary.main;
//     return theme.palette.primary.main;
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
//           p: { xs: 1.5, sm: 2, md: 2.5 },
//           borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
//           border: "1px solid",
//           borderColor: alpha(statusColor, 0.2),
//           mb: { xs: 2.5, sm: 3 },
//           background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//           boxShadow: `0 8px 25px -12px ${alpha(statusColor, 0.2)}`,
//         }}
//       >
//         {/* Header */}
//         <Box sx={{
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: "space-between",
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 1.2, sm: 1.5 },
//           pb: { xs: 1.2, sm: 1.5 },
//           borderBottom: "2px solid",
//           borderColor: alpha(statusColor, 0.1),
//           gap: { xs: 0.8, sm: 0 }
//         }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
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
//               variant={isMobile ? "body1" : "h6"}
//               fontWeight="600"
//               sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//             >
//               Current Plan
//             </Typography>
//           </Box>
//         </Box>

//         {/* Plan Description */}
//         <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//           <Typography
//             variant={isMobile ? "body1" : "h6"}
//             fontWeight="600"
//             gutterBottom
//             sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, color: 'text.primary' }}
//           >
//             {planData.description || "No Plan Description"}
//           </Typography>
//         </Box>

//         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }} sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Duration
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                 {planData.duration || "N/A"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Amount
//               </Typography>
//               <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.7rem', color: statusColor }}>
//                 ₹{planData.amount || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Currency
//               </Typography>
//               <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                 {planData.currency || "INR"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6} md={3}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.03),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.1),
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Status
//               </Typography>
//               <Chip
//                 label={planData.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary, 0.1),
//                   color: planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary,
//                   fontWeight: 600,
//                   fontSize: '0.6rem',
//                   height: 18,
//                   mt: 0.3,
//                   alignSelf: 'flex-start',
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//         <Divider sx={{ my: { xs: 1.2, sm: 1.5 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'flex-start',
//             mb: { xs: 1.2, sm: 1.5 },
//             gap: 2
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//               Created At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//               {formatDateDDMMYYYY(planData.createdAt)}
//             </Typography>
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//               Expires At
//             </Typography>
//             <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//               {formatDateDDMMYYYY(planData.expiresAt)}
//             </Typography>
//           </Box>
//         </Box>
//         {/* Progress Section */}
//         {planData.expiresAt && (
//           <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Progress {Math.round(progress)}%
//               </Typography>
//               <Chip
//                 label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(statusColor, 0.1),
//                   color: statusColor,
//                   height: 18,
//                   fontSize: "0.6rem",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <LinearProgress
//               variant="determinate"
//               value={progress}
//               sx={{
//                 height: { xs: 4, sm: 5 },
//                 borderRadius: 2,
//                 bgcolor: alpha(statusColor, 0.1),
//                 "& .MuiLinearProgress-bar": {
//                   bgcolor: statusColor,
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* User Limits */}
//         <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }}>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Min Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
//                 {planData.minUser || planData.minUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{
//               bgcolor: alpha(statusColor, 0.05),
//               p: { xs: 0.8, sm: 1, md: 1.2 },
//               borderRadius: 1.5,
//               border: "1px solid",
//               borderColor: alpha(statusColor, 0.15),
//             }}>
//               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
//                 Max Users
//               </Typography>
//               <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
//                 {planData.maxUser || planData.maxUsers || "0"}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </motion.div>
//   );
// };

// RecentActivities Component - Smaller

const CurrentPlan = ({ planData, loading, onPurchasePlan, isSubAdmin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  if (loading) {
    return <CurrentPlanSkeleton />;
  }

  // Show empty state with purchase button if no plan data
  if (!planData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
            borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
            mb: { xs: 2.5, sm: 3 },
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative background */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 30% 20%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                width: { xs: 60, sm: 80, md: 100 },
                height: { xs: 60, sm: 80, md: 100 },
                borderRadius: "50%",
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <ShoppingBagIcon sx={{ fontSize: { xs: 30, sm: 40, md: 50 }, color: theme.palette.primary.main }} />
            </Box>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              fontWeight="700"
              sx={{
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                color: 'text.primary',
                mb: 1,
              }}
            >
              No Active Plan
            </Typography>

            {/* <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                mb: 2.5,
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              You don't have an active subscription plan. Purchase a plan to start tracking your users and accessing all features.
            </Typography> */}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                mb: 2.5,
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              {isSubAdmin
                ? "You don't have an active subscription plan. Please contact your admin to purchase a plan."
                : "You don't have an active subscription plan. Purchase a plan to start tracking your users and accessing all features."
              }
            </Typography>
            {!isSubAdmin && (
              <Button
                variant="contained"
                startIcon={<ShoppingBagIcon />}
                onClick={onPurchasePlan}
                size={isMobile ? "small" : "medium"}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  borderRadius: 2,
                  px: { xs: 2.5, sm: 3, md: 4 },
                  py: { xs: 0.8, sm: 1, md: 1.2 },
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 24px -8px ${alpha(theme.palette.primary.main, 0.4)}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Purchase a Plan
              </Button>
            )}
          </Box>
        </Paper>
      </motion.div>
    );
  }

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
    if (daysLeft <= 7) return theme.palette.secondary.main;
    return theme.palette.primary.main;
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
          p: { xs: 1.5, sm: 2, md: 2.5 },
          borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
          border: "1px solid",
          borderColor: alpha(statusColor, 0.2),
          mb: { xs: 2.5, sm: 3 },
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          boxShadow: `0 8px 25px -12px ${alpha(statusColor, 0.2)}`,
        }}
      >
        {/* Header with Upgrade Button */}
        <Box sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: "space-between",
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: { xs: 1.2, sm: 1.5 },
          pb: { xs: 1.2, sm: 1.5 },
          borderBottom: "2px solid",
          borderColor: alpha(statusColor, 0.1),
          gap: { xs: 0.8, sm: 0 }
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
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
              variant={isMobile ? "body1" : "h6"}
              fontWeight="600"
              sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
            >
              Current Plan
            </Typography>
          </Box>
          {!isSubAdmin && (
            <Button
              variant="outlined"
              size="small"
              onClick={onPurchasePlan}
              startIcon={<ShoppingBagIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderColor: alpha(statusColor, 0.5),
                color: statusColor,
                fontSize: { xs: '0.6rem', sm: '0.65rem' },
                height: { xs: 26, sm: 28 },
                '&:hover': {
                  borderColor: statusColor,
                  bgcolor: alpha(statusColor, 0.05),
                },
              }}
            >
              Upgrade Plan
            </Button>
          )}
        </Box>

        {/* Plan Description */}
        <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            fontWeight="600"
            gutterBottom
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }, color: 'text.primary' }}
          >
            {planData.description || "No Plan Description"}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }} sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 0.8, sm: 1, md: 1.2 },
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                Duration
              </Typography>
              <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
                {planData.duration || "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 0.8, sm: 1, md: 1.2 },
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                Amount
              </Typography>
              <Typography variant="body2" fontWeight="700" sx={{ fontSize: '0.7rem', color: statusColor }}>
                ₹{planData.amount || "0"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 0.8, sm: 1, md: 1.2 },
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                Currency
              </Typography>
              <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
                {planData.currency || "INR"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.03),
              p: { xs: 0.8, sm: 1, md: 1.2 },
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.1),
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                Status
              </Typography>
              <Chip
                label={planData.isActive ? "Active" : "Inactive"}
                size="small"
                sx={{
                  bgcolor: alpha(planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary, 0.1),
                  color: planData.isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                  fontWeight: 600,
                  fontSize: '0.6rem',
                  height: 18,
                  mt: 0.3,
                  alignSelf: 'flex-start',
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 1.2, sm: 1.5 }, borderStyle: 'dashed', borderColor: alpha(statusColor, 0.2) }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: { xs: 1.2, sm: 1.5 },
            gap: 2
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
              Created At
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
              {formatDateDDMMYYYY(planData.createdAt)}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
              Expires At
            </Typography>
            <Typography variant="body2" fontWeight="500" sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
              {formatDateDDMMYYYY(planData.expiresAt)}
            </Typography>
          </Box>
        </Box>

        {/* Progress Section */}
        {planData.expiresAt && (
          <Box sx={{ mb: { xs: 1.2, sm: 1.5 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                Progress {Math.round(progress)}%
              </Typography>
              <Chip
                label={daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
                size="small"
                sx={{
                  bgcolor: alpha(statusColor, 0.1),
                  color: statusColor,
                  height: 18,
                  fontSize: "0.6rem",
                  fontWeight: 600,
                }}
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: { xs: 4, sm: 5 },
                borderRadius: 2,
                bgcolor: alpha(statusColor, 0.1),
                "& .MuiLinearProgress-bar": {
                  bgcolor: statusColor,
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        )}

        {/* User Limits */}
        <Grid container spacing={{ xs: 1, sm: 1.2, md: 1.5 }}>
          <Grid item xs={6}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.05),
              p: { xs: 0.8, sm: 1, md: 1.2 },
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.15),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                Min Users
              </Typography>
              <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
                {planData.minUser || planData.minUsers || "0"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{
              bgcolor: alpha(statusColor, 0.05),
              p: { xs: 0.8, sm: 1, md: 1.2 },
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: alpha(statusColor, 0.15),
            }}>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.6rem', fontWeight: 500 }}>
                Max Users
              </Typography>
              <Typography variant={isSmallMobile ? "body2" : "body1"} fontWeight="700" sx={{ fontSize: '0.8rem', color: statusColor }}>
                {planData.maxUser || planData.maxUsers || "0"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

const RecentActivities = ({ users, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  if (loading) {
    return <RecentActivitiesSkeleton />;
  }

  if (!users || users.length === 0) {
    return <EmptyRecentActivities />;
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
          p: { xs: 1.5, sm: 2, md: 2.5 },
          borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        }}
      >
        <Box sx={{
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: "space-between",
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: { xs: 1.5, sm: 2 },
          gap: 0.8
        }}>
          <Typography variant="body1" fontWeight="600" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: theme.palette.primary.main }}>
            Recent Activities
          </Typography>
          {users.length > 4 && (
            <Chip
              label={`View All (${users.length})`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 500,
                cursor: "pointer",
                fontSize: { xs: '0.6rem', sm: '0.65rem' },
                height: { xs: 22, sm: 24 },
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            />
          )}
        </Box>

        <Stack spacing={1.5}>
          {displayUsers.map((activity, index) => (
            <motion.div
              key={activity._id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.2, sm: 1.5 },
                  borderRadius: { xs: 1.5, sm: 2 },
                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' },
                  gap: { xs: 0.8, sm: 0 },
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    transform: !isMobile ? "translateX(4px)" : "none",
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    color: theme.palette.primary.main,
                    mr: { xs: 0, sm: 1.5 },
                    mb: { xs: 0.5, sm: 0 },
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    fontSize: '0.8rem',
                    fontWeight: 600,
                  }}
                >
                  {activity.name?.charAt(0) || "U"}
                </Avatar>
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Typography variant="body2" fontWeight="600" sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                    {activity.name || "Unknown User"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                    {activity.status || "No action"}
                  </Typography>
                </Box>

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
  const location = useLocation();
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
  const handlePurchasePlan = () => {
    navigate("/admin/payments-plans");
  };
  // // Determine role-based text
  // const isSubAdmin = Number(userData.role_id) === 3;
  // const dashboardTitle = isSubAdmin ? "Subadmin Dashboard" : "Admin Dashboard";
  // const roleBadgeLabel = isSubAdmin ? "Sub-admin" : "Admin";
  // Determine role-based text - CHECK LOCALSTORAGE DIRECTLY
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const storedUser = getStoredUser();
  const effectiveRoleId = storedUser?.role_id || userData?.role_id;
  const isSubAdmin = Number(effectiveRoleId) === 3;
  const dashboardTitle = isSubAdmin ? "Subadmin Dashboard" : "Admin Dashboard";
  const roleBadgeLabel = isSubAdmin ? "Sub-admin" : "Admin";

  const getAdminIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.adminId || null;
    } catch {
      return null;
    }
  };

  // Robustly determine effective admin ID for all roles, especially sub-admin.
  const rawAdminId = userData?.adminId ?? storedUser?.adminId ?? getAdminIdFromToken();
  const effectiveAdminId = isSubAdmin
    ? (typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId)
    : (userData?._id || userData?.id || storedUser?._id || storedUser?.id);

  const lastTrackedUsers = userState.lastTrackedUsers || [];
  const loading = userState.loading || false;

  // Consolidated data fetching function
  // const fetchAllData = useCallback(async (isInitialLoad = false) => {
  //   if (!effectiveAdminId) {
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     if (isInitialLoad) {
  //       setIsLoading(true);
  //     }

  //     const startTime = isInitialLoad ? Date.now() : null;

  //     const userResult = await dispatch(getUserById(effectiveAdminId)).unwrap();

  //     if (userResult?.user?.currentPaymentId) {
  //       const plan = userResult.user.currentPaymentId;
  //       setPlanData({
  //         description: plan.description,
  //         duration: plan.duration,
  //         amount: plan.amount,
  //         currency: plan.currency,
  //         isActive: plan.isActive,
  //         createdAt: plan.createdAt,
  //         expiresAt: plan.expiresAt,
  //         minUser: plan.minUser,
  //         maxUser: plan.maxUser,
  //       });
  //     } else {
  //       setPlanData(null);
  //     }

  //     const adminId = effectiveAdminId;
  //     if (!adminId) {
  //       console.error("Admin ID is missing, cannot fetch locations");
  //       return;
  //     }

  //     const [lastTrackedResult, locationsResult, countsResult, allUsersResult] =
  //       await Promise.all([
  //         dispatch(getLastFiveTrackedUsers(adminId)),
  //         dispatch(getActiveUserLocations(adminId)),
  //         dispatch(getUserCounts()),
  //         dispatch(getAllUsers(adminId))
  //       ]);

  //     if (allUsersResult.payload?.users) {
  //       const users = allUsersResult.payload.users;
  //       const today = new Date().toISOString().split("T")[0];

  //       setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
  //       setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
  //       setTotalActiveUsers(users.filter(u => u.isActive).length);
  //       setTotalInActiveUsers(users.filter(u => !u.isActive).length);
  //       setTotalUsers(users.length);

  //     } else {
  //       setCheckedOutCount(0);
  //       setCheckedInCount(0);
  //       setTotalActiveUsers(0);
  //       setTotalInActiveUsers(0);
  //       setTotalUsers(0);
  //     }

  //     setLastUpdated(new Date());

  //     if (isInitialLoad && startTime) {
  //       const fetchDuration = Date.now() - startTime;
  //       const minLoadTime = 1000;
  //       if (fetchDuration < minLoadTime) {
  //         await new Promise(resolve => setTimeout(resolve, minLoadTime - fetchDuration));
  //       }
  //     }

  //   } catch (error) {
  //     console.error("Error fetching dashboard data:", error);
  //     setCheckedOutCount(0);
  //     setCheckedInCount(0);
  //     setTotalActiveUsers(0);
  //     setTotalInActiveUsers(0);
  //     setTotalUsers(0);
  //     setPlanData(null);
  //   } finally {
  //     if (isInitialLoad) {
  //       setIsLoading(false);
  //     }
  //   }

  // }, [dispatch, effectiveAdminId]);
  const [adminStats, setAdminStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    currentlyTracking: 0,
    todayCheckedOut: 0
  });

  // Update the fetchAllData function
  const fetchAllData = useCallback(async (isInitialLoad = false) => {
    if (!effectiveAdminId) {
      setIsLoading(false);
      return;
    }

    try {
      if (isInitialLoad) {
        setIsLoading(true);
      }

      const startTime = isInitialLoad ? Date.now() : null;

      const userResult = await dispatch(getUserById(effectiveAdminId)).unwrap();

      if (userResult?.user?.currentPaymentId) {
        const plan = userResult.user.currentPaymentId;
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
        setPlanData(null);
      }

      const adminId = effectiveAdminId;
      if (!adminId) {
        console.error("Admin ID is missing, cannot fetch locations");
        return;
      }

      const [lastTrackedResult, locationsResult, countsResult, allUsersResult, adminStatsResult] =
        await Promise.all([
          dispatch(getLastFiveTrackedUsers(adminId)),
          dispatch(getActiveUserLocations(adminId)),
          dispatch(getUserCounts()),
          dispatch(getAllUsers(adminId)),
          dispatch(getAdminStats({ adminId }))
        ]);

      // Extract admin stats from the result
      if (adminStatsResult?.payload?.count) {
        const stats = adminStatsResult.payload.count;
        setAdminStats({
          totalUsers: stats.totalUsers || 0,
          activeUsers: stats.activeUsers || 0,
          inactiveUsers: stats.inactiveUsers || 0,
          currentlyTracking: stats.currentlyTracking || 0,
          todayCheckedOut: stats.todayCheckedOut || 0
        });

        // Set the counts from admin stats
        setTotalActiveUsers(stats.activeUsers || 0);
        setTotalInActiveUsers(stats.inactiveUsers || 0);
        setCheckedInCount(stats.currentlyTracking || 0);
        setCheckedOutCount(stats.todayCheckedOut || 0);
        setTotalUsers(stats.totalUsers || 0);
      } else {
        // Fallback to allUsersResult if adminStats fails
        if (allUsersResult.payload?.users) {
          const users = allUsersResult.payload.users;
          const today = new Date().toISOString().split("T")[0];

          setCheckedOutCount(users.filter(u => u.status === "0" && u.updatedAt?.split("T")[0] === today).length);
          setCheckedInCount(users.filter(u => u.status === "1" && u.updatedAt?.split("T")[0] === today).length);
          setTotalActiveUsers(users.filter(u => u.isActive).length);
          setTotalInActiveUsers(users.filter(u => !u.isActive).length);
          setTotalUsers(users.length);
        } else {
          setCheckedOutCount(0);
          setCheckedInCount(0);
          setTotalActiveUsers(0);
          setTotalInActiveUsers(0);
          setTotalUsers(0);
        }
      }


      setLastUpdated(new Date());

      if (isInitialLoad && startTime) {
        const fetchDuration = Date.now() - startTime;
        const minLoadTime = 1000;
        if (fetchDuration < minLoadTime) {
          await new Promise(resolve => setTimeout(resolve, minLoadTime - fetchDuration));
        }
      }

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setCheckedOutCount(0);
      setCheckedInCount(0);
      setTotalActiveUsers(0);
      setTotalInActiveUsers(0);
      setTotalUsers(0);
      setPlanData(null);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }

  }, [dispatch, effectiveAdminId]);
  // Effects
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      if (userData?._id) {
        fetchAllData(true);
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser?._id) {
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
  }, []);

  useEffect(() => {
    if (effectiveAdminId && hasMounted.current) {
      fetchAllData(true);
    }
  }, [effectiveAdminId]);

  useEffect(() => {
    const isDashboardRoute = location.pathname === "/admin/dashboard" || location.pathname === "/dashboard";
    if (isDashboardRoute && effectiveAdminId && hasMounted.current) {
      fetchAllData(false);
    }
  }, [location.pathname, effectiveAdminId, fetchAllData]);

  useEffect(() => {
    const handleFocus = () => {
      if (effectiveAdminId) {
        fetchAllData(false);
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [effectiveAdminId, fetchAllData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAllData(false);
    setIsRefreshing(false);
  };

  const userStats = [
    {
      key: "activeUsers",
      label: "Active Users",
      count: totalActiveUsers,  // This now comes from adminStats.activeUsers
      icon: <FaUsers size={20} />,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      iconColor: theme.palette.primary.main,
      onClick: () => navigate("/user?filter=active"),
    },
    {
      key: "inactiveUsers",
      label: "Inactive Users",
      count: totalInActiveUsers,  // This now comes from adminStats.inactiveUsers
      icon: <FaUserTimes size={20} />,
      bgColor: alpha(theme.palette.text.secondary, 0.1),
      iconColor: theme.palette.text.secondary,
      //   onClick: () => navigate("/user?filter=inactive"),
      onClick: () => {
        if (totalInActiveUsers > 0) {
          navigate("/user?filter=inactive");
        }
      },
    },
    {
      key: "checkedInUsers",
      label: "Checked In",
      count: checkedInCount,  // This now comes from adminStats.currentlyTracking
      icon: <FaUserCheck size={20} />,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      iconColor: theme.palette.primary.main,
      onClick: () => {
        if (checkedInCount > 0) {
          navigate("/admin/live-locations", {
            state: { adminId: effectiveAdminId }
          });
        }
      }
    },
    {
      key: "checkedOutUsers",
      label: "Checked Out",
      count: checkedOutCount,  // This now comes from adminStats.todayCheckedOut
      icon: <FaUserClock size={20} />,
      bgColor: alpha(theme.palette.primary.main, 0.1),
      iconColor: theme.palette.primary.main,
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
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        width: "100%",
        overflowX: "hidden",
        py: { xs: 1.5, sm: 2, md: 3 },
        px: { xs: 1, sm: 2, md: 3 },
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
            bgcolor: alpha(theme.palette.background.paper, 0.8),
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
          {/* Header Section */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: { xs: 2.5, sm: 3 },
              gap: 1.5
            }}
          >
            <Box>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                fontWeight="700"
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
                }}
              >
                {dashboardTitle}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
              }}>
                Overview • Last updated {lastUpdated.toLocaleTimeString()}
                <IconButton
                  size="small"
                  sx={{
                    ml: 0.8,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    width: { xs: 22, sm: 24 },
                    height: { xs: 22, sm: 24 },
                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                  }}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshIcon
                    fontSize="small"
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: { xs: 12, sm: 14 },
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
              label={roleBadgeLabel}
              size="small"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: "white",
                fontWeight: 600,
                px: 1.2,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                height: { xs: 26, sm: 28 },
                boxShadow: `0 8px 16px -5px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            />
          </Box>

          {/* Stats Cards */}
          <StatsCards stats={userStats} loading={isLoading} />

          {/* Current Plan Section */}
          <CurrentPlan planData={planData} loading={isLoading} onPurchasePlan={handlePurchasePlan} isSubAdmin={isSubAdmin} />

          {/* Recent Activities */}
          <RecentActivities users={lastTrackedUsers} loading={isLoading} />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;