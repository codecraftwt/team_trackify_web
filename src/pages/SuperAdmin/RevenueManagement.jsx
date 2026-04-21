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
// import { useDebounce } from "../../Hooks/useDebounce"; 

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
  
//   // Use debounce hook for search (500ms delay)
//   const debouncedSearchQuery = useDebounce(searchQuery, 500);
  
//   // Date filter states
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [appliedStart, setAppliedStart] = useState(null);
//   const [appliedEnd, setAppliedEnd] = useState(null);
  
//   // Sort states (frontend sorting)
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");
  
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

//   // Handle search change
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//   };

//   // Clear search
//   const handleClearSearch = () => {
//     setSearchQuery("");
//   };

//   // Handle sort change (frontend only)
//   const handleSortChange = (field, order) => {
//     setSortBy(field);
//     setSortOrder(order);
//   };

//   // Reset page when filters change
//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearchQuery, appliedStart, appliedEnd]);

//   // Fetch data without sort params (sort applied on frontend)
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

//     // console.log("Fetching with params:", params);

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

//   // Transform payment data and apply frontend sorting
//   const paymentData = useMemo(() => {
//     let data = allPaymentHistory?.map((payment) => ({
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
    
//     // Apply frontend sorting
//     if (data.length > 0) {
//       data.sort((a, b) => {
//         let aVal, bVal;
        
//         switch (sortBy) {
//           case "date":
//             aVal = new Date(a.date);
//             bVal = new Date(b.date);
//             break;
//           case "amount":
//             aVal = a.amount;
//             bVal = b.amount;
//             break;
//           case "name":
//             aVal = a.name.toLowerCase();
//             bVal = b.name.toLowerCase();
//             break;
//           case "status":
//             aVal = a.status.toLowerCase();
//             bVal = b.status.toLowerCase();
//             break;
//           default:
//             aVal = new Date(a.date);
//             bVal = new Date(b.date);
//         }
        
//         if (sortOrder === "asc") {
//           return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
//         } else {
//           return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
//         }
//       });
//     }
    
//     return data;
//   }, [allPaymentHistory, sortBy, sortOrder]);

//   // Calculate total amount for current page
//   const pageTotalAmount = useMemo(() => {
//     return paymentData?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
//   }, [paymentData]);

//   // Calculate total with add-ons for current page
//   const pageTotalWithAddOns = useMemo(() => {
//     return paymentData?.reduce((sum, payment) => {
//       const addOnsTotal = Array.isArray(payment.addOns) 
//         ? payment.addOns
//             .filter(addOn => addOn.status === "completed")
//             .reduce((s, addOn) => s + (addOn.addOnAmount || 0), 0)
//         : 0;
//       return sum + (payment.amount || 0) + addOnsTotal;
//     }, 0) || 0;
//   }, [paymentData]);

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
//               // Sort props
//               sortBy={sortBy}
//               sortOrder={sortOrder}
//               onSortChange={handleSortChange}
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


import React, { useEffect, useState, useMemo } from "react";
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
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Tooltip,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Extension as AddonIcon,
  Receipt as PlanIcon,
  CheckCircle as CompletedIcon,
  Cancel as CancelledIcon,
  HourglassEmpty as PendingIcon,
  CalendarToday as CalendarIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocalOffer as CouponIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentHistory } from "../../redux/slices/paymentSlice";
import moment from "moment";
import { toast } from "react-toastify";

// ─── Debounce Hook ───────────────────────────────────────────────────────────
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_FILTERS = [
  { key: "all", label: "All", color: "#6366f1" },
  { key: "completed", label: "Completed", color: "#10b981" },
  { key: "pending", label: "Pending", color: "#f59e0b" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
];

const TYPE_TABS = [
  { key: "all", label: "All Transactions", icon: BarChartIcon },
  { key: "plan", label: "Plans", icon: PlanIcon },
  { key: "addon", label: "Add-ons", icon: AddonIcon },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    completed: { color: "#10b981", bg: "#d1fae5", icon: CompletedIcon, label: "Completed" },
    cancelled: { color: "#ef4444", bg: "#fee2e2", icon: CancelledIcon, label: "Cancelled" },
    pending: { color: "#f59e0b", bg: "#fef3c7", icon: PendingIcon, label: "Pending" },
  };
  const c = config[status?.toLowerCase()] || config.pending;
  const Icon = c.icon;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1, py: 0.4, borderRadius: 10, bgcolor: c.bg, width: "fit-content" }}>
      <Icon sx={{ fontSize: 12, color: c.color }} />
      <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: c.color, letterSpacing: 0.3 }}>{c.label}</Typography>
    </Box>
  );
};

// ─── Type Badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const isAddon = type === "addon";
  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: 0.4, px: 0.8, py: 0.3, borderRadius: 1,
      bgcolor: isAddon ? alpha("#8b5cf6", 0.1) : alpha("#3b82f6", 0.1),
      border: "1px solid",
      borderColor: isAddon ? alpha("#8b5cf6", 0.3) : alpha("#3b82f6", 0.3),
    }}>
      {isAddon ? <AddonIcon sx={{ fontSize: 10, color: "#8b5cf6" }} /> : <PlanIcon sx={{ fontSize: 10, color: "#3b82f6" }} />}
      <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: isAddon ? "#8b5cf6" : "#3b82f6", textTransform: "uppercase", letterSpacing: 0.5 }}>
        {isAddon ? "Add-on" : "Plan"}
      </Typography>
    </Box>
  );
};

// ─── Stats Card ───────────────────────────────────────────────────────────────
const StatsCard = ({ icon: Icon, value, label, accent, isMobile }) => (
  <Paper elevation={0} sx={{
    p: { xs: 1.5, sm: 2 }, borderRadius: 3,
    border: "1px solid", borderColor: alpha(accent, 0.15),
    background: `linear-gradient(135deg, ${alpha(accent, 0.06)} 0%, ${alpha(accent, 0.02)} 100%)`,
    height: "100%", position: "relative", overflow: "hidden",
  }}>
    <Box sx={{
      position: "absolute", top: -10, right: -10, width: 60, height: 60,
      borderRadius: "50%", bgcolor: alpha(accent, 0.08),
    }} />
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Box>
        <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, color: "text.secondary", mb: 0.5, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</Typography>
        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, fontWeight: 800, color: accent, lineHeight: 1 }}>{value}</Typography>
      </Box>
      <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(accent, 0.12) }}>
        <Icon sx={{ fontSize: { xs: 18, sm: 20 }, color: accent }} />
      </Box>
    </Box>
  </Paper>
);

// ─── Skeleton for Stats ───────────────────────────────────────────────────────
const StatsCardSkeleton = () => (
  <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider", height: "100%" }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width={80} height={14} sx={{ mb: 0.8 }} />
        <Skeleton variant="text" width={100} height={28} />
      </Box>
      <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2 }} />
    </Box>
  </Paper>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const RevenueManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallMobile = useMediaQuery("(max-width:400px)");

  // UI State
  const [firstLoad, setFirstLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter State
  const [activeTab, setActiveTab] = useState("all"); // all | plan | addon
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");
  const [page, setPage] = useState(1);

  // Sort State
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Redux
  const {
    allPaymentHistory = [],
    allPaymentHistoryLoading = false,
    totalCompletedAmount = 0,
    numberOfPaidUsers = 0,
    averageRevenue = 0,
    totalPages = 1,
    totalPlanCount = 0,
    totalAddOnCount = 0,
    totalPlanAmount = 0,
    totalAddOnAmount = 0,
  } = useSelector((state) => state.payment || {});

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [debouncedSearch, appliedStart, appliedEnd, activeTab, statusFilter]);

  // Fetch
  useEffect(() => {
    const params = { page, limit: 10 };
    if (debouncedSearch) params.search = debouncedSearch;
    if (appliedStart) params.startDate = moment(appliedStart).format("YYYY-MM-DD");
    if (appliedEnd) params.endDate = moment(appliedEnd).format("YYYY-MM-DD");
    dispatch(getAllPaymentHistory(params));

    const t = setTimeout(() => setFirstLoad(false), 800);
    return () => clearTimeout(t);
  }, [dispatch, debouncedSearch, appliedStart, appliedEnd, page]);

  // Transform + filter + sort data
  const allPayments = useMemo(() => {
    return (allPaymentHistory || []).map((p) => ({
      id: p._id,
      type: p.type,
      name: p.adminId?.name || "—",
      email: p.adminId?.email || "",
      mobile: p.adminId?.mobile_no || "",
      date: p.createdAt,
      amount: p.amount,
      originalAmount: p.originalAmount,
      discountAmount: p.discountAmount,
      savingsAmount: p.savingsAmount,
      status: p.status,
      plan: p.planId?.name || "—",
      planDesc: p.planId?.description || "",
      duration: p.duration,
      expiresAt: p.expiresAt,
      remainingDays: p.remainingDays,
      isExpired: p.isExpired,
      hasCouponApplied: p.hasCouponApplied,
      couponCode: p.couponCode,
      paymentMethod: p.paymentMethod,
      isAddOn: p.isAddOn || false,
      maxUsers: p.maxUsers,
      minUsers: p.minUsers,
      isCancelledByUser: p.isCancelledByUser,
      cancellationReason: p.cancellationReason,
    }));
  }, [allPaymentHistory]);

  const filteredPayments = useMemo(() => {
    let data = allPayments;

    // Type filter
    if (activeTab !== "all") data = data.filter((p) => p.type === activeTab);

    // Status filter
    if (statusFilter !== "all") data = data.filter((p) => p.status?.toLowerCase() === statusFilter);

    // Sort
    data = [...data].sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "amount": aVal = a.amount; bVal = b.amount; break;
        case "name": aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase(); break;
        case "status": aVal = a.status; bVal = b.status; break;
        default: aVal = new Date(a.date); bVal = new Date(b.date);
      }
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return data;
  }, [allPayments, activeTab, statusFilter, sortBy, sortOrder]);

  // Counts per type for badge
  const counts = useMemo(() => ({
    all: allPayments.length,
    plan: allPayments.filter((p) => p.type === "plan").length,
    addon: allPayments.filter((p) => p.type === "addon").length,
  }), [allPayments]);

  const statusCounts = useMemo(() => {
    const base = activeTab === "all" ? allPayments : allPayments.filter((p) => p.type === activeTab);
    return {
      all: base.length,
      completed: base.filter((p) => p.status === "completed").length,
      pending: base.filter((p) => p.status === "pending").length,
      cancelled: base.filter((p) => p.status === "cancelled").length,
    };
  }, [allPayments, activeTab]);

  const applyDateFilter = () => {
    if (startDate && endDate && moment(endDate).isBefore(moment(startDate))) {
      toast.error("End date cannot be before start date");
      return;
    }
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    toast.success("Date filter applied");
  };

  const clearDateFilter = () => {
    setStartDate(""); setEndDate(""); setAppliedStart(""); setAppliedEnd("");
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await dispatch(getAllPaymentHistory({ page, limit: 10 }));
    setIsRefreshing(false);
    toast.success("Refreshed");
  };

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortOrder("desc"); }
  };

  // ── Animations ────────────────────────────────────────────────────────────
  const fade = { hidden: { opacity: 0, y: 16 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" } }) };

  // ── First load skeleton ───────────────────────────────────────────────────
  if (firstLoad) {
    return (
      <Box sx={{ minHeight: "100vh", py: 3, px: { xs: 1.5, sm: 3 }, bgcolor: "background.default" }}>
        <Container maxWidth="xl" disableGutters>
          <Skeleton variant="text" width={220} height={36} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width={160} height={20} sx={{ mb: 3 }} />
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[1, 2, 3, 4].map((i) => <Grid item xs={6} md={3} key={i}><StatsCardSkeleton /></Grid>)}
          </Grid>
          <Skeleton variant="rounded" height={52} sx={{ borderRadius: 3, mb: 2 }} />
          <Skeleton variant="rounded" height={48} sx={{ borderRadius: 3, mb: 1.5 }} />
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} variant="rounded" height={64} sx={{ borderRadius: 2, mb: 1 }} />)}
        </Container>
      </Box>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 2, sm: 3 }, px: { xs: 1.5, sm: 3 }, bgcolor: "background.default" }}>
      <Container maxWidth="xl" disableGutters>
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={0}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
            <Box>
              <Typography sx={{
                fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.7rem" }, fontWeight: 900,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Revenue Analytics</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                Track and analyze all payment transactions
              </Typography>
            </Box>
            <IconButton onClick={refreshData} disabled={isRefreshing || allPaymentHistoryLoading} size="small"
              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 36, height: 36 }}>
              <RefreshIcon sx={{ fontSize: 18, animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
            </IconButton>
          </Box>
        </motion.div>

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ mb: 3 }}>
          {[
            { icon: MoneyIcon, value: `₹${totalCompletedAmount?.toLocaleString("en-IN")}`, label: "Total Revenue", accent: theme.palette.primary.main },
            { icon: PeopleIcon, value: numberOfPaidUsers, label: "Paid Users", accent: "#10b981" },
            { icon: PlanIcon, value: `${totalPlanCount} Plans`, label: `₹${totalPlanAmount?.toLocaleString("en-IN")}`, accent: "#3b82f6" },
            { icon: AddonIcon, value: `${totalAddOnCount} Add-ons`, label: `₹${totalAddOnAmount?.toLocaleString("en-IN")}`, accent: "#8b5cf6" },
          ].map((card, i) => (
            <Grid item xs={6} md={3} key={i}>
              <motion.div initial="hidden" animate="visible" variants={fade} custom={i}>
                <StatsCard {...card} isMobile={isMobile} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Type Tabs */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={4}>
          <Paper elevation={0} sx={{ p: 0.8, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 2, display: "flex", gap: 0.5 }}>
            {TYPE_TABS.map(({ key, label, icon: Icon }) => (
              <Box key={key} onClick={() => setActiveTab(key)} sx={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.8,
                py: 1, px: { xs: 0.5, sm: 1.5 }, borderRadius: 2, cursor: "pointer",
                transition: "all 0.2s",
                bgcolor: activeTab === key ? theme.palette.primary.main : "transparent",
                color: activeTab === key ? "#fff" : "text.secondary",
                "&:hover": { bgcolor: activeTab === key ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.06) },
              }}>
                <Icon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                <Typography sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" }, fontWeight: 700, display: { xs: key === "all" ? "block" : "none", sm: "block" } }}>
                  {label}
                </Typography>
                <Box sx={{
                  px: 0.8, py: 0.2, borderRadius: 10,
                  bgcolor: activeTab === key ? alpha("#fff", 0.25) : alpha(theme.palette.primary.main, 0.1),
                  minWidth: 20, textAlign: "center",
                }}>
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: activeTab === key ? "#fff" : theme.palette.primary.main }}>
                    {counts[key]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </motion.div>

        {/* Status Filters + Search */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={5}>
          <Paper elevation={0} sx={{ p: { xs: 1.2, sm: 1.5 }, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 2 }}>
            {/* Status pills */}
            <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1.5 }}>
              {STATUS_FILTERS.map(({ key, label, color }) => (
                <Box key={key} onClick={() => setStatusFilter(key)} sx={{
                  display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.5,
                  borderRadius: 10, cursor: "pointer", border: "1.5px solid",
                  transition: "all 0.18s",
                  borderColor: statusFilter === key ? color : alpha(color, 0.25),
                  bgcolor: statusFilter === key ? alpha(color, 0.12) : "transparent",
                }}>
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: statusFilter === key ? color : "text.secondary" }}>{label}</Typography>
                  <Box sx={{ px: 0.6, py: 0.15, borderRadius: 10, bgcolor: statusFilter === key ? alpha(color, 0.2) : alpha("#000", 0.06) }}>
                    <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: statusFilter === key ? color : "text.secondary" }}>
                      {statusCounts[key]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Search + Date row */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <TextField
                placeholder="Search by name, email, plan…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{
                  flex: 1, minWidth: 180,
                  "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.75rem" },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: "text.secondary" }} /></InputAdornment>,
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery("")}><ClearIcon sx={{ fontSize: 14 }} /></IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
              <TextField type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="small"
                label="From" InputLabelProps={{ shrink: true }}
                sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.75rem" } }} />
              <TextField type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} size="small"
                label="To" InputLabelProps={{ shrink: true }}
                sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.75rem" } }} />
              <Button size="small" variant="contained" onClick={applyDateFilter} disabled={!startDate && !endDate}
                sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>Apply</Button>
              {(appliedStart || appliedEnd) && (
                <Button size="small" variant="outlined" color="error" onClick={clearDateFilter}
                  sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>Clear</Button>
              )}
            </Box>
          </Paper>
        </motion.div>

        {/* Table */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={6}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
            {allPaymentHistoryLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
              </Box>
            ) : filteredPayments.length === 0 ? (
              <Box sx={{ py: 8, textAlign: "center" }}>
                <BarChartIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>No transactions found</Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                      {[
                        { label: "#", width: 40 },
                        { label: "Type", width: 70 },
                        { label: "Admin / User", sortKey: "name" },
                        { label: "Plan", width: 150 },
                        { label: "Amount", sortKey: "amount", align: "right" },
                        { label: "Coupon", width: 90, align: "center" },
                        { label: "Date", sortKey: "date" },
                        { label: "Expires", width: 100 },
                        { label: "Status", sortKey: "status", width: 110 },
                      ].map(({ label, sortKey, align, width }) => (
                        <TableCell key={label}
                          onClick={() => sortKey && handleSort(sortKey)}
                          align={align || "left"}
                          sx={{
                            width, py: 1.2, px: { xs: 1, sm: 1.5 },
                            fontSize: "0.65rem", fontWeight: 800, letterSpacing: 0.5,
                            textTransform: "uppercase", color: "text.secondary",
                            cursor: sortKey ? "pointer" : "default",
                            userSelect: "none",
                            whiteSpace: "nowrap",
                            "&:hover": sortKey ? { color: theme.palette.primary.main } : {},
                          }}>
                          {label}
                          {sortKey && sortBy === sortKey && (
                            <span style={{ marginLeft: 2 }}>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence>
                      {filteredPayments.map((row, idx) => (
                        <motion.tr key={row.id}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          transition={{ delay: idx * 0.03, duration: 0.25 }}
                          style={{ display: "table-row" }}>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 }, fontSize: "0.7rem", color: "text.disabled" }}>
                            {(page - 1) * 10 + idx + 1}
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <TypeBadge type={row.type} />
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Avatar sx={{ width: 26, height: 26, fontSize: "0.6rem", bgcolor: alpha(theme.palette.primary.main, 0.15), color: theme.palette.primary.main, fontWeight: 800 }}>
                                {row.name?.[0]?.toUpperCase() || "?"}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, lineHeight: 1.2 }}>{row.name}</Typography>
                                <Typography sx={{ fontSize: "0.6rem", color: "text.secondary" }}>{row.email}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, lineHeight: 1.3 }}>{row.plan}</Typography>
                            {row.duration && (
                              <Typography sx={{ fontSize: "0.58rem", color: "text.secondary" }}>{row.duration}</Typography>
                            )}
                          </TableCell>
                          <TableCell align="right" sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Box>
                              <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: row.status === "completed" ? "#10b981" : "text.primary" }}>
                                ₹{row.amount?.toLocaleString("en-IN")}
                              </Typography>
                              {row.discountAmount > 0 && (
                                <Typography sx={{ fontSize: "0.58rem", color: "#ef4444", textDecoration: "line-through" }}>
                                  ₹{row.originalAmount?.toLocaleString("en-IN")}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="center" sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            {row.hasCouponApplied ? (
                              <Tooltip title={`${row.couponCode} · Saved ₹${row.savingsAmount}`}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.4 }}>
                                  <CouponIcon sx={{ fontSize: 12, color: "#f59e0b" }} />
                                  <Typography sx={{ fontSize: "0.6rem", color: "#f59e0b", fontWeight: 700 }}>{row.couponCode}</Typography>
                                </Box>
                              </Tooltip>
                            ) : (
                              <Typography sx={{ fontSize: "0.6rem", color: "text.disabled" }}>—</Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>
                              {moment(row.date).format("DD MMM YY")}
                            </Typography>
                            <Typography sx={{ fontSize: "0.58rem", color: "text.secondary" }}>
                              {moment(row.date).format("hh:mm A")}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            {row.expiresAt ? (
                              <Box>
                                <Typography sx={{ fontSize: "0.65rem", fontWeight: 500, color: row.isExpired ? "#ef4444" : "text.primary" }}>
                                  {moment(row.expiresAt).format("DD MMM YY")}
                                </Typography>
                                <Typography sx={{ fontSize: "0.58rem", color: row.isExpired ? "#ef4444" : "#10b981" }}>
                                  {row.isExpired ? "Expired" : `${row.remainingDays}d left`}
                                </Typography>
                              </Box>
                            ) : <Typography sx={{ fontSize: "0.65rem", color: "text.disabled" }}>—</Typography>}
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <StatusBadge status={row.status} />
                            {row.isCancelledByUser && (
                              <Tooltip title={row.cancellationReason || "Cancelled by user"}>
                                <Typography sx={{ fontSize: "0.55rem", color: "text.disabled", mt: 0.3, cursor: "default" }}>
                                  By user
                                </Typography>
                              </Tooltip>
                            )}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Pagination */}
            {!allPaymentHistoryLoading && filteredPayments.length > 0 && (
              <Box sx={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                px: 2, py: 1.5, borderTop: "1px solid", borderColor: "divider",
              }}>
                <Typography sx={{ fontSize: "0.68rem", color: "text.secondary" }}>
                  Showing {filteredPayments.length} of {totalPages * 10} transactions
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <IconButton size="small" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }}>
                    <KeyboardArrowLeft sx={{ fontSize: 16 }} />
                  </IconButton>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pg = page <= 3 ? i + 1 : page + i - 2;
                    if (pg < 1 || pg > totalPages) return null;
                    return (
                      <Box key={pg} onClick={() => setPage(pg)} sx={{
                        width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 1.5, cursor: "pointer", border: "1px solid",
                        borderColor: pg === page ? theme.palette.primary.main : "divider",
                        bgcolor: pg === page ? theme.palette.primary.main : "transparent",
                        color: pg === page ? "#fff" : "text.secondary",
                        fontSize: "0.7rem", fontWeight: pg === page ? 800 : 400,
                        transition: "all 0.15s",
                      }}>{pg}</Box>
                    );
                  })}
                  <IconButton size="small" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }}>
                    <KeyboardArrowRight sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </Box>
  );
};

export default RevenueManagement;