// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   IconButton,
//   alpha,
//   Paper,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   AttachMoney as MoneyIcon,
//   People as PeopleIcon,
//   BarChart as BarChartIcon,
//   TrendingUp as TrendingUpIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPaymentHistory } from "../../redux/slices/paymentSlice";
// import moment from "moment";
// import { toast } from "react-toastify";
// import StatsCard from "../../components/StatsCards";
// import SearchFilter from "../../components/SearchFilter";
// import RevenueTable from "../../components/RevenueTable";
// import { debounce } from "lodash";

// // Stats Card Skeleton
// const StatsCardSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.2, sm: 1.5, md: 1.8 },
//         borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         height: '100%',
//         minHeight: { xs: 80, sm: 85, md: 90 },
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//         <Box sx={{ flex: 1 }}>
//           <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.8 }} />
//           <Skeleton variant="text" width={90} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//         <Skeleton variant="circular" width={42} height={42} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>
//     </Paper>
//   );
// };

// // Search Filter Skeleton
// const SearchFilterSkeleton = ({ isMobile, isSmallMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.2, sm: 1.5 },
//         borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       <Box sx={{
//         display: "flex",
//         flexDirection: { xs: "column", sm: "row" },
//         gap: { xs: 1.2, sm: 1.5 },
//         alignItems: "center"
//       }}>
//         <Skeleton
//           variant="rounded"
//           height={isMobile ? 38 : 48}
//           sx={{
//             borderRadius: { xs: 1.5, sm: 2 },
//             flex: 1,
//             bgcolor: alpha(theme.palette.primary.main, 0.1)
//           }}
//         />
//         <Skeleton
//           variant="rounded"
//           width={isSmallMobile ? '100%' : 180}
//           height={isMobile ? 38 : 48}
//           sx={{
//             borderRadius: { xs: 1.5, sm: 2 },
//             minWidth: { xs: '100%', sm: 180 },
//             bgcolor: alpha(theme.palette.primary.main, 0.1)
//           }}
//         />
//       </Box>
//     </Paper>
//   );
// };

// // Revenue Table Skeleton
// const RevenueTableSkeleton = ({ isMobile, isTablet }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         overflow: "hidden",
//       }}
//     >
//       <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
//         <Box sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 1.5,
//           pb: 1.5,
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//         }}>
//           <Skeleton variant="text" width={130} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="rounded" width={90} height={32} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>

//         {[1, 2, 3, 4, 5].map((item) => (
//           <Box key={item} sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             py: 1.2,
//             borderBottom: item < 5 ? "1px solid" : "none",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
//               <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width="60%" height={18} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width="40%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//           </Box>
//         ))}

//         <Box sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mt: 2.5,
//           pt: 1.5,
//           borderTop: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//         }}>
//           <Skeleton variant="text" width={90} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Box sx={{ display: "flex", gap: 0.8 }}>
//             <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// const RevenueManagement = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   // States
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
//   // Date filter states
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [appliedStart, setAppliedStart] = useState(null);
//   const [appliedEnd, setAppliedEnd] = useState(null);
  
//   const [page, setPage] = useState(1);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Redux state
//   const {
//     allPaymentHistory = [],
//     allPaymentHistoryLoading = false,
//     totalCompletedAmount = 0,
//     numberOfPaidUsers = 0,
//     averageRevenue = 0,
//     totalPages = 1,
//   } = useSelector((state) => state.payment || {});

//   // Debounced search (400ms delay for performance)
//   const debouncedSetSearch = useCallback(
//     debounce((value) => {
//       setDebouncedSearchQuery(value);
//     }, 400),
//     []
//   );

//   // Handle search change
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     debouncedSetSearch(value);
//   };

//   // Reset page when filters change
//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearchQuery, appliedStart, appliedEnd]);

//   // Calculate total amount for current page
//   const pageTotalAmount = useMemo(() => {
//     return allPaymentHistory?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
//   }, [allPaymentHistory]);

//   // Calculate total with add-ons for current page
//   const pageTotalWithAddOns = useMemo(() => {
//     return allPaymentHistory?.reduce((sum, payment) => {
//       const addOnsTotal = Array.isArray(payment.addOns) 
//         ? payment.addOns
//             .filter(addOn => addOn.status === "completed")
//             .reduce((s, addOn) => s + (addOn.addOnAmount || 0), 0)
//         : 0;
//       return sum + (payment.amount || 0) + addOnsTotal;
//     }, 0) || 0;
//   }, [allPaymentHistory]);

//   // Fetch data with filters
//   useEffect(() => {
//     const params = {
//       page,
//       limit: 10,
//     };
    
//     if (debouncedSearchQuery) {
//       params.search = debouncedSearchQuery;
//     }
    
//     if (appliedStart) {
//       params.startDate = moment(appliedStart).format("YYYY-MM-DD");
//     }
//     if (appliedEnd) {
//       params.endDate = moment(appliedEnd).format("YYYY-MM-DD");
//     }

//     console.log("Fetching with params:", params);

//     dispatch(getAllPaymentHistory(params));

//     // Hide first loader after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch, debouncedSearchQuery, appliedStart, appliedEnd, page]);

//   // Refresh data
//   const refreshData = async () => {
//     setIsRefreshing(true);
    
//     const params = {
//       page,
//       limit: 10,
//     };
    
//     if (debouncedSearchQuery) {
//       params.search = debouncedSearchQuery;
//     }
    
//     if (appliedStart) {
//       params.startDate = moment(appliedStart).format("YYYY-MM-DD");
//     }
//     if (appliedEnd) {
//       params.endDate = moment(appliedEnd).format("YYYY-MM-DD");
//     }

//     await dispatch(getAllPaymentHistory(params));
//     setIsRefreshing(false);
//     toast.success("Data refreshed successfully");
//   };

//   // Apply date filter
//   const applyDateFilter = () => {
//     if (startDate && endDate && moment(endDate).isBefore(moment(startDate))) {
//       toast.error("End date cannot be before start date");
//       return;
//     }
    
//     setAppliedStart(startDate);
//     setAppliedEnd(endDate);
    
//     const startStr = startDate ? moment(startDate).format("DD/MM/YYYY") : "any";
//     const endStr = endDate ? moment(endDate).format("DD/MM/YYYY") : "any";
//     toast.success(`Date range applied: ${startStr} to ${endStr}`);
//   };

//   // Clear date filter
//   const clearDateFilter = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setAppliedStart(null);
//     setAppliedEnd(null);
//     toast.info("Date filter cleared");
//   };

//   const isFilterActive = appliedStart || appliedEnd;

//   // Transform payment data
//   const paymentData = useMemo(() => {
//     return allPaymentHistory?.map((payment) => ({
//       id: payment._id,
//       name: payment.adminId?.name || "Unknown",
//       email: payment.adminId?.email || "",
//       date: payment.createdAt,
//       amount: payment.amount,
//       status: payment.status,
//       plan: payment.planId?.name || "Unknown Plan",
//       paymentMethod: payment.paymentMethod,
//       duration: payment.duration,
//       addOns: payment.addOns,
//       expiresAt: payment.expiresAt,
//       remainingDays: payment.remainingDays,
//       hasCouponApplied: payment.hasCouponApplied,
//       savingsAmount: payment.savingsAmount,
//       totalWithAddOns: payment.totalWithAddOns,
//     })) || [];
//   }, [allPaymentHistory]);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   // Animation variants
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

//   // First render loader
//   if (showFirstRenderLoader) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//           py: { xs: 1.5, sm: 2, md: 3 },
//           px: { xs: 1, sm: 2, md: 3 },
//         }}
//       >
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           {/* Header */}
//           <Box sx={{
//             display: "flex",
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between",
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             mb: { xs: 1.5, sm: 2, md: 3 },
//             gap: 1.5
//           }}>
//             <Box>
//               <Typography
//                 variant={isMobile ? "body1" : "h6"}
//                 fontWeight="600"
//                 color={theme.palette.primary.main}
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
//                 }}
//               >
//                 Revenue Analytics
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                 Track and analyze all payment transactions
//               </Typography>
//             </Box>
//             <IconButton
//               size="small"
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 width: 32,
//                 height: 32,
//               }}
//             >
//               <RefreshIcon sx={{ fontSize: 18 }} />
//             </IconButton>
//           </Box>

//           {/* Stats Cards Skeleton */}
//           <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
//             {[1, 2, 3, 4].map((item) => (
//               <Grid item xs={12} sm={6} md={3} key={item}>
//                 <StatsCardSkeleton isMobile={isMobile} />
//               </Grid>
//             ))}
//           </Grid>

//           {/* Search Filter Skeleton */}
//           <SearchFilterSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

//           {/* Table Skeleton */}
//           <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
//             <RevenueTableSkeleton isMobile={isMobile} isTablet={isTablet} />
//           </Box>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//         py: { xs: 1.5, sm: 2, md: 3 },
//         px: { xs: 1, sm: 2, md: 3 },
//       }}
//     >
//       <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               mb: { xs: 1.5, sm: 2, md: 3 },
//               gap: 1.5
//             }}>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "body1" : "h6"}
//                   fontWeight="800"
//                   color={theme.palette.primary.main}
//                   gutterBottom
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
//                   }}
//                 >
//                   Revenue Analytics
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                   Track and analyze all payment transactions
//                 </Typography>
//               </Box>
//               <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//                 {/* Page Total Display */}
//                 {paymentData.length > 0 && (
//                   <>
//                     <Box
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         px: 1.5,
//                         py: 0.5,
//                         borderRadius: 2,
//                         bgcolor: alpha(theme.palette.info.main, 0.1),
//                         border: '1px solid',
//                         borderColor: alpha(theme.palette.info.main, 0.2),
//                       }}
//                     >
//                       <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', mr: 0.5 }}>
//                         Page:
//                       </Typography>
//                       <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'info.main' }}>
//                         ₹{pageTotalAmount.toLocaleString("en-IN")}
//                       </Typography>
//                     </Box>
//                     {pageTotalWithAddOns > pageTotalAmount && (
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           px: 1.5,
//                           py: 0.5,
//                           borderRadius: 2,
//                           bgcolor: alpha(theme.palette.success.main, 0.1),
//                           border: '1px solid',
//                           borderColor: alpha(theme.palette.success.main, 0.2),
//                         }}
//                       >
//                         <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', mr: 0.5 }}>
//                           +Add-ons:
//                         </Typography>
//                         <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'success.main' }}>
//                           ₹{(pageTotalWithAddOns - pageTotalAmount).toLocaleString("en-IN")}
//                         </Typography>
//                       </Box>
//                     )}
//                   </>
//                 )}
//                 <IconButton
//                   onClick={refreshData}
//                   disabled={isRefreshing || allPaymentHistoryLoading}
//                   size="small"
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     width: 32,
//                     height: 32,
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                   }}
//                 >
//                   <RefreshIcon
//                     sx={{
//                       animation: isRefreshing ? "spin 1s linear infinite" : "none",
//                       fontSize: 18
//                     }}
//                   />
//                 </IconButton>
//               </Box>
//             </Box>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div variants={itemVariants}>
//             <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={MoneyIcon}
//                   value={`₹${totalCompletedAmount.toLocaleString("en-IN")}`}
//                   label="Total Revenue"
//                   iconBg={alpha(theme.palette.primary.main, 0.1)}
//                   iconColor={theme.palette.primary.main}
//                   isMobile={isMobile}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={PeopleIcon}
//                   value={numberOfPaidUsers}
//                   label="Paid Users"
//                   iconBg={alpha(theme.palette.primary.main, 0.1)}
//                   iconColor={theme.palette.primary.main}
//                   isMobile={isMobile}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={BarChartIcon}
//                   value={`₹${averageRevenue.toFixed(0)}`}
//                   label="Average Revenue"
//                   iconBg={alpha(theme.palette.primary.main, 0.1)}
//                   iconColor={theme.palette.primary.main}
//                   isMobile={isMobile}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={TrendingUpIcon}
//                   value={moment().format("MMMM")}
//                   label="Current Month"
//                   iconBg={alpha(theme.palette.primary.main, 0.1)}
//                   iconColor={theme.palette.primary.main}
//                   isMobile={isMobile}
//                 />
//               </Grid>
//             </Grid>
//           </motion.div>

//           {/* Search and Filter */}
//           <motion.div variants={itemVariants}>
//             <SearchFilter
//               searchQuery={searchQuery}
//               setSearchQuery={handleSearchChange}
//               resultsCount={paymentData.length}
//               isMobile={isMobile}
//               isTablet={isTablet}
//               isSmallMobile={isSmallMobile}
//               // Date filter props
//               startDate={startDate}
//               setStartDate={setStartDate}
//               endDate={endDate}
//               setEndDate={setEndDate}
//               onApplyDateFilter={applyDateFilter}
//               onClearDateFilter={clearDateFilter}
//               isFilterActive={isFilterActive}
//               totalAmount={pageTotalAmount}
//             />
//           </motion.div>

//           {/* Table */}
//           <motion.div variants={itemVariants} style={{ marginTop: isMobile ? 12 : 20 }}>
//             {allPaymentHistoryLoading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, sm: 4, md: 6 } }}>
//                 <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
//               </Box>
//             ) : (
//               <RevenueTable
//                 filteredPayments={paymentData}
//                 totalRevenue={totalCompletedAmount}
//                 searchQuery={searchQuery}
//                 page={page}
//                 handlePageChange={handlePageChange}
//                 totalPages={totalPages}
//                 isMobile={isMobile}
//                 isTablet={isTablet}
//                 isSmallMobile={isSmallMobile}
//               />
//             )}
//           </motion.div>
//         </motion.div>
//       </Container>

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default RevenueManagement;

















import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  alpha,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentHistory } from "../../redux/slices/paymentSlice";
import moment from "moment";
import { toast } from "react-toastify";
import StatsCard from "../../components/StatsCards";
import SearchFilter from "../../components/SearchFilter";
import RevenueTable from "../../components/RevenueTable";
import { debounce } from "lodash";

// Stats Card Skeleton
const StatsCardSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.2, sm: 1.5, md: 1.8 },
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        height: '100%',
        minHeight: { xs: 80, sm: 85, md: 90 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.8 }} />
          <Skeleton variant="text" width={90} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </Box>
        <Skeleton variant="circular" width={42} height={42} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </Box>
    </Paper>
  );
};

// Search Filter Skeleton
const SearchFilterSkeleton = ({ isMobile, isSmallMobile }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.2, sm: 1.5 },
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1.2, sm: 1.5 },
        alignItems: "center"
      }}>
        <Skeleton
          variant="rounded"
          height={isMobile ? 38 : 48}
          sx={{
            borderRadius: { xs: 1.5, sm: 2 },
            flex: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.1)
          }}
        />
        <Skeleton
          variant="rounded"
          width={isSmallMobile ? '100%' : 180}
          height={isMobile ? 38 : 48}
          sx={{
            borderRadius: { xs: 1.5, sm: 2 },
            minWidth: { xs: '100%', sm: 180 },
            bgcolor: alpha(theme.palette.primary.main, 0.1)
          }}
        />
      </Box>
    </Paper>
  );
};

// Revenue Table Skeleton
const RevenueTableSkeleton = ({ isMobile, isTablet }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          pb: 1.5,
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}>
          <Skeleton variant="text" width={130} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="rounded" width={90} height={32} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </Box>

        {[1, 2, 3, 4, 5].map((item) => (
          <Box key={item} sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1.2,
            borderBottom: item < 5 ? "1px solid" : "none",
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
              <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={18} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width="40%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            </Box>
          </Box>
        ))}

        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2.5,
          pt: 1.5,
          borderTop: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}>
          <Skeleton variant="text" width={90} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

const RevenueManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  // States
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
  // Date filter states
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [appliedStart, setAppliedStart] = useState(null);
  const [appliedEnd, setAppliedEnd] = useState(null);
  
  // Sort states (frontend sorting)
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Redux state
  const {
    allPaymentHistory = [],
    allPaymentHistoryLoading = false,
    totalCompletedAmount = 0,
    numberOfPaidUsers = 0,
    averageRevenue = 0,
    totalPages = 1,
  } = useSelector((state) => state.payment || {});

  // Debounced search (400ms delay for performance)
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchQuery(value);
    }, 400),
    []
  );

  // Handle search change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSetSearch(value);
  };

  // Handle sort change (frontend only)
  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, appliedStart, appliedEnd]);

  // Fetch data without sort params (sort applied on frontend)
  useEffect(() => {
    const params = {
      page,
      limit: 10,
    };
    
    if (debouncedSearchQuery) {
      params.search = debouncedSearchQuery;
    }
    
    if (appliedStart) {
      params.startDate = moment(appliedStart).format("YYYY-MM-DD");
    }
    if (appliedEnd) {
      params.endDate = moment(appliedEnd).format("YYYY-MM-DD");
    }

    console.log("Fetching with params:", params);

    dispatch(getAllPaymentHistory(params));

    // Hide first loader after 1 second
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, debouncedSearchQuery, appliedStart, appliedEnd, page]);

  // Refresh data
  const refreshData = async () => {
    setIsRefreshing(true);
    
    const params = {
      page,
      limit: 10,
    };
    
    if (debouncedSearchQuery) {
      params.search = debouncedSearchQuery;
    }
    
    if (appliedStart) {
      params.startDate = moment(appliedStart).format("YYYY-MM-DD");
    }
    if (appliedEnd) {
      params.endDate = moment(appliedEnd).format("YYYY-MM-DD");
    }

    await dispatch(getAllPaymentHistory(params));
    setIsRefreshing(false);
    toast.success("Data refreshed successfully");
  };

  // Apply date filter
  const applyDateFilter = () => {
    if (startDate && endDate && moment(endDate).isBefore(moment(startDate))) {
      toast.error("End date cannot be before start date");
      return;
    }
    
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    
    const startStr = startDate ? moment(startDate).format("DD/MM/YYYY") : "any";
    const endStr = endDate ? moment(endDate).format("DD/MM/YYYY") : "any";
    toast.success(`Date range applied: ${startStr} to ${endStr}`);
  };

  // Clear date filter
  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setAppliedStart(null);
    setAppliedEnd(null);
    toast.info("Date filter cleared");
  };

  const isFilterActive = appliedStart || appliedEnd;

  // Transform payment data and apply frontend sorting
  const paymentData = useMemo(() => {
    let data = allPaymentHistory?.map((payment) => ({
      id: payment._id,
      name: payment.adminId?.name || "Unknown",
      email: payment.adminId?.email || "",
      date: payment.createdAt,
      amount: payment.amount,
      status: payment.status,
      plan: payment.planId?.name || "Unknown Plan",
      paymentMethod: payment.paymentMethod,
      duration: payment.duration,
      addOns: payment.addOns,
      expiresAt: payment.expiresAt,
      remainingDays: payment.remainingDays,
      hasCouponApplied: payment.hasCouponApplied,
      savingsAmount: payment.savingsAmount,
      totalWithAddOns: payment.totalWithAddOns,
    })) || [];
    
    // Apply frontend sorting
    if (data.length > 0) {
      data.sort((a, b) => {
        let aVal, bVal;
        
        switch (sortBy) {
          case "date":
            aVal = new Date(a.date);
            bVal = new Date(b.date);
            break;
          case "amount":
            aVal = a.amount;
            bVal = b.amount;
            break;
          case "name":
            aVal = a.name.toLowerCase();
            bVal = b.name.toLowerCase();
            break;
          case "status":
            aVal = a.status.toLowerCase();
            bVal = b.status.toLowerCase();
            break;
          default:
            aVal = new Date(a.date);
            bVal = new Date(b.date);
        }
        
        if (sortOrder === "asc") {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }
    
    return data;
  }, [allPaymentHistory, sortBy, sortOrder]);

  // Calculate total amount for current page
  const pageTotalAmount = useMemo(() => {
    return paymentData?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
  }, [paymentData]);

  // Calculate total with add-ons for current page
  const pageTotalWithAddOns = useMemo(() => {
    return paymentData?.reduce((sum, payment) => {
      const addOnsTotal = Array.isArray(payment.addOns) 
        ? payment.addOns
            .filter(addOn => addOn.status === "completed")
            .reduce((s, addOn) => s + (addOn.addOnAmount || 0), 0)
        : 0;
      return sum + (payment.amount || 0) + addOnsTotal;
    }, 0) || 0;
  }, [paymentData]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Animation variants
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

  // First render loader
  if (showFirstRenderLoader) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          py: { xs: 1.5, sm: 2, md: 3 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
          {/* Header */}
          <Box sx={{
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: { xs: 1.5, sm: 2, md: 3 },
            gap: 1.5
          }}>
            <Box>
              <Typography
                variant={isMobile ? "body1" : "h6"}
                fontWeight="600"
                color={theme.palette.primary.main}
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
                }}
              >
                Revenue Analytics
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
                Track and analyze all payment transactions
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 32,
                height: 32,
              }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Stats Cards Skeleton */}
          <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <StatsCardSkeleton isMobile={isMobile} />
              </Grid>
            ))}
          </Grid>

          {/* Search Filter Skeleton */}
          <SearchFilterSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

          {/* Table Skeleton */}
          <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
            <RevenueTableSkeleton isMobile={isMobile} isTablet={isTablet} />
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        py: { xs: 1.5, sm: 2, md: 3 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: { xs: 1.5, sm: 2, md: 3 },
              gap: 1.5
            }}>
              <Box>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  fontWeight="800"
                  color={theme.palette.primary.main}
                  gutterBottom
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
                  }}
                >
                  Revenue Analytics
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
                  Track and analyze all payment transactions
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {/* Page Total Display */}
                {paymentData.length > 0 && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        border: '1px solid',
                        borderColor: alpha(theme.palette.info.main, 0.2),
                      }}
                    >
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', mr: 0.5 }}>
                        Page:
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'info.main' }}>
                        ₹{pageTotalAmount.toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                    {pageTotalWithAddOns > pageTotalAmount && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.success.main, 0.1),
                          border: '1px solid',
                          borderColor: alpha(theme.palette.success.main, 0.2),
                        }}
                      >
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', mr: 0.5 }}>
                          +Add-ons:
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'success.main' }}>
                          ₹{(pageTotalWithAddOns - pageTotalAmount).toLocaleString("en-IN")}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
                <IconButton
                  onClick={refreshData}
                  disabled={isRefreshing || allPaymentHistoryLoading}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    width: 32,
                    height: 32,
                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                  }}
                >
                  <RefreshIcon
                    sx={{
                      animation: isRefreshing ? "spin 1s linear infinite" : "none",
                      fontSize: 18
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }} sx={{ mb: { xs: 1.5, sm: 2, md: 3 } }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={MoneyIcon}
                  value={`₹${totalCompletedAmount.toLocaleString("en-IN")}`}
                  label="Total Revenue"
                  iconBg={alpha(theme.palette.primary.main, 0.1)}
                  iconColor={theme.palette.primary.main}
                  isMobile={isMobile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={PeopleIcon}
                  value={numberOfPaidUsers}
                  label="Paid Users"
                  iconBg={alpha(theme.palette.primary.main, 0.1)}
                  iconColor={theme.palette.primary.main}
                  isMobile={isMobile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={BarChartIcon}
                  value={`₹${averageRevenue.toFixed(0)}`}
                  label="Average Revenue"
                  iconBg={alpha(theme.palette.primary.main, 0.1)}
                  iconColor={theme.palette.primary.main}
                  isMobile={isMobile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={TrendingUpIcon}
                  value={moment().format("MMMM")}
                  label="Current Month"
                  iconBg={alpha(theme.palette.primary.main, 0.1)}
                  iconColor={theme.palette.primary.main}
                  isMobile={isMobile}
                />
              </Grid>
            </Grid>
          </motion.div>

          {/* Search and Filter */}
          <motion.div variants={itemVariants}>
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={handleSearchChange}
              resultsCount={paymentData.length}
              isMobile={isMobile}
              isTablet={isTablet}
              isSmallMobile={isSmallMobile}
              // Date filter props
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              onApplyDateFilter={applyDateFilter}
              onClearDateFilter={clearDateFilter}
              isFilterActive={isFilterActive}
              totalAmount={pageTotalAmount}
              // Sort props
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </motion.div>

          {/* Table */}
          <motion.div variants={itemVariants} style={{ marginTop: isMobile ? 12 : 20 }}>
            {allPaymentHistoryLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, sm: 4, md: 6 } }}>
                <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
              </Box>
            ) : (
              <RevenueTable
                filteredPayments={paymentData}
                totalRevenue={totalCompletedAmount}
                searchQuery={searchQuery}
                page={page}
                handlePageChange={handlePageChange}
                totalPages={totalPages}
                isMobile={isMobile}
                isTablet={isTablet}
                isSmallMobile={isSmallMobile}
              />
            )}
          </motion.div>
        </motion.div>
      </Container>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default RevenueManagement;