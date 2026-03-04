// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   IconButton,
//   alpha,
//   Paper,
//   CircularProgress,
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
// import StatsCard  from "../../components/StatsCards";
// import SearchFilter from "../../components/SearchFilter";
// import RevenueTable from "../../components/RevenueTable";

// const RevenueManagement = () => {
//   const dispatch = useDispatch();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
//   const [filterMonth, setFilterMonth] = useState("all");
//   const [page, setPage] = useState(1);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const {
//     allPaymentHistory = [],
//     allPaymentHistoryLoading = false,
//     totalCompletedAmount = 0,
//     numberOfPaidUsers = 0,
//     averageRevenue = 0,
//     totalPages = 1,
//   } = useSelector((state) => state.payment || {});

//   // Debounce search input
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery);
//     }, 400);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearchQuery, filterMonth]);

//   // Fetch payment data from backend
//   useEffect(() => {
//     const selectedMonth =
//       filterMonth !== "all"
//         ? {
//             month: filterMonth.split("-")[1],
//             year: filterMonth.split("-")[0],
//           }
//         : {};

//     dispatch(
//       getAllPaymentHistory({
//         search: debouncedSearchQuery,
//         ...selectedMonth,
//         page,
//       })
//     );
//   }, [dispatch, debouncedSearchQuery, filterMonth, page]);

//   const refreshData = async () => {
//     setIsRefreshing(true);
//     const selectedMonth =
//       filterMonth !== "all"
//         ? {
//             month: filterMonth.split("-")[1],
//             year: filterMonth.split("-")[0],
//           }
//         : {};

//     await dispatch(
//       getAllPaymentHistory({
//         search: debouncedSearchQuery,
//         ...selectedMonth,
//         page,
//       })
//     );
//     setIsRefreshing(false);
//     toast.success("Data refreshed successfully");
//   };

//   // Transform API response
//   const paymentData =
//     allPaymentHistory?.map((payment) => ({
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
//     })) || [];

//   const totalRevenue = totalCompletedAmount || 0;
//   const totalUsers = numberOfPaidUsers || 0;
//   const avgRevenue = averageRevenue || 0;

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
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

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         py: 4,
//         px: { xs: 2, md: 4 },
//       }}
//     >
//       <Container maxWidth="xl">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//               <Box>
//                 <Typography
//                   variant="h4"
//                   fontWeight="800"
//                   color="#0f766e"
//                   gutterBottom
//                   sx={{
//                     background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   Revenue Analytics
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Track and analyze all payment transactions
//                 </Typography>
//               </Box>
//               <IconButton
//                 onClick={refreshData}
//                 disabled={isRefreshing || allPaymentHistoryLoading}
//                 sx={{
//                   bgcolor: alpha("#0f766e", 0.1),
//                   color: "#0f766e",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.2),
//                   },
//                 }}
//               >
//                 <RefreshIcon sx={{ animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
//               </IconButton>
//             </Box>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div variants={itemVariants}>
//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={MoneyIcon}
//                   value={`₹${totalRevenue.toLocaleString("en-IN")}`}
//                   label="Total Revenue"
//                   iconBg={alpha("#22c55e", 0.1)}
//                   iconColor="#22c55e"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={PeopleIcon}
//                   value={totalUsers}
//                   label="Paid Users"
//                   iconBg={alpha("#3b82f6", 0.1)}
//                   iconColor="#3b82f6"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={BarChartIcon}
//                   value={`₹${avgRevenue.toFixed(0)}`}
//                   label="Average Revenue"
//                   iconBg={alpha("#a855f7", 0.1)}
//                   iconColor="#a855f7"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={TrendingUpIcon}
//                   value={new Date().getMonth() + 1}
//                   label="Current Month"
//                   iconBg={alpha("#f59e0b", 0.1)}
//                   iconColor="#f59e0b"
//                 />
//               </Grid>
//             </Grid>
//           </motion.div>

//           {/* Search and Filter */}
//           <motion.div variants={itemVariants}>
//             <SearchFilter
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               filterMonth={filterMonth}
//               setFilterMonth={setFilterMonth}
//               resultsCount={paymentData.length}
//             />
//           </motion.div>

//           {/* Table */}
//           <motion.div variants={itemVariants} style={{ marginTop: 24 }}>
//             {allPaymentHistoryLoading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//                 <CircularProgress sx={{ color: "#0f766e" }} />
//               </Box>
//             ) : (
//               <RevenueTable
//                 filteredPayments={paymentData}
//                 totalRevenue={totalRevenue}
//                 searchQuery={searchQuery}
//                 page={page}
//                 handlePageChange={handlePageChange}
//                 totalPages={totalPages}
//               />
//             )}
//           </motion.div>
//         </motion.div>
//       </Container>

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

// export default RevenueManagement;


 

// import React, { useEffect, useState } from "react";
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

// const RevenueManagement = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
//   const [filterMonth, setFilterMonth] = useState("all");
//   const [page, setPage] = useState(1);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const {
//     allPaymentHistory = [],
//     allPaymentHistoryLoading = false,
//     totalCompletedAmount = 0,
//     numberOfPaidUsers = 0,
//     averageRevenue = 0,
//     totalPages = 1,
//   } = useSelector((state) => state.payment || {});

//   // Debounce search input
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       setDebouncedSearchQuery(searchQuery);
//     }, 400);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearchQuery, filterMonth]);

//   // Fetch payment data from backend
//   useEffect(() => {
//     const selectedMonth =
//       filterMonth !== "all"
//         ? {
//           month: filterMonth.split("-")[1],
//           year: filterMonth.split("-")[0],
//         }
//         : {};

//     dispatch(
//       getAllPaymentHistory({
//         search: debouncedSearchQuery,
//         ...selectedMonth,
//         page,
//       })
//     );
//   }, [dispatch, debouncedSearchQuery, filterMonth, page]);

//   const refreshData = async () => {
//     setIsRefreshing(true);
//     const selectedMonth =
//       filterMonth !== "all"
//         ? {
//           month: filterMonth.split("-")[1],
//           year: filterMonth.split("-")[0],
//         }
//         : {};

//     await dispatch(
//       getAllPaymentHistory({
//         search: debouncedSearchQuery,
//         ...selectedMonth,
//         page,
//       })
//     );
//     setIsRefreshing(false);
//     toast.success("Data refreshed successfully");
//   };

//   // Transform API response
//   const paymentData =
//     allPaymentHistory?.map((payment) => ({
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
//     })) || [];

//   const totalRevenue = totalCompletedAmount || 0;
//   const totalUsers = numberOfPaidUsers || 0;
//   const avgRevenue = averageRevenue || 0;

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
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

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         py: { xs: 2, sm: 3, md: 4 },
//         px: { xs: 1, sm: 2, md: 4 },
//       }}
//     >
//       <Container
//         maxWidth="xl"
//         disableGutters={isMobile}
//         sx={{ px: { xs: 0, sm: 0, md: 0 } }}
//       >
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               mb: { xs: 2, sm: 3, md: 4 },
//               gap: 2
//             }}>
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
//                   Revenue Analytics
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
//                   Track and analyze all payment transactions
//                 </Typography>
//               </Box>
//               <IconButton
//                 onClick={refreshData}
//                 disabled={isRefreshing || allPaymentHistoryLoading}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   bgcolor: alpha("#0f766e", 0.1),
//                   color: "#0f766e",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.2),
//                   },
//                 }}
//               >
//                 <RefreshIcon
//                   sx={{
//                     animation: isRefreshing ? "spin 1s linear infinite" : "none",
//                     fontSize: { xs: 20, sm: 24 }
//                   }}
//                 />
//               </IconButton>
//             </Box>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div variants={itemVariants}>
//             <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={MoneyIcon}
//                   value={`₹${totalRevenue.toLocaleString("en-IN")}`}
//                   label="Total Revenue"
//                   iconBg={alpha("#22c55e", 0.1)}
//                   iconColor="#22c55e"
//                   isMobile={isMobile}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={PeopleIcon}
//                   value={totalUsers}
//                   label="Paid Users"
//                   iconBg={alpha("#3b82f6", 0.1)}
//                   iconColor="#3b82f6"
//                   isMobile={isMobile}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={BarChartIcon}
//                   value={`₹${avgRevenue.toFixed(0)}`}
//                   label="Average Revenue"
//                   iconBg={alpha("#a855f7", 0.1)}
//                   iconColor="#a855f7"
//                   isMobile={isMobile}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <StatsCard
//                   icon={TrendingUpIcon}
//                   value={new Date().getMonth() + 1}
//                   label="Current Month"
//                   iconBg={alpha("#f59e0b", 0.1)}
//                   iconColor="#f59e0b"
//                   isMobile={isMobile}
//                 />
//               </Grid>
//             </Grid>
//           </motion.div>

//           {/* Search and Filter */}
//           <motion.div variants={itemVariants}>
//             <SearchFilter
//               searchQuery={searchQuery}
//               setSearchQuery={setSearchQuery}
//               filterMonth={filterMonth}
//               setFilterMonth={setFilterMonth}
//               resultsCount={paymentData.length}
//               isMobile={isMobile}
//               isTablet={isTablet}
//               isSmallMobile={isSmallMobile}
//             />
//           </motion.div>

//           {/* Table */}
//           <motion.div variants={itemVariants} style={{ marginTop: isMobile ? 16 : 24 }}>
//             {allPaymentHistoryLoading ? (
//               <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 4, sm: 6, md: 8 } }}>
//                 <CircularProgress sx={{ color: "#0f766e" }} />
//               </Box>
//             ) : (
//               <RevenueTable
//                 filteredPayments={paymentData}
//                 totalRevenue={totalRevenue}
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

// export default RevenueManagement;












// Skelatom Loader
import React, { useEffect, useState } from "react";
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

// Stats Card Skeleton
const StatsCardSkeleton = ({ isMobile }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 1.8, md: 2 },
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
        height: '100%',
        minHeight: { xs: 90, sm: 95, md: 100 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width={80} height={16} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={100} height={28} />
        </Box>
        <Skeleton variant="circular" width={48} height={48} />
      </Box>
    </Paper>
  );
};

// Search Filter Skeleton
const SearchFilterSkeleton = ({ isMobile, isSmallMobile }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
      }}
    >
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" }, 
        gap: { xs: 1.5, sm: 2 },
        alignItems: "center"
      }}>
        <Skeleton 
          variant="rounded" 
          height={isMobile ? 40 : 56} 
          sx={{ 
            borderRadius: { xs: 1.5, sm: 2 },
            flex: 1,
          }} 
        />
        <Skeleton 
          variant="rounded" 
          width={isSmallMobile ? '100%' : 200} 
          height={isMobile ? 40 : 56} 
          sx={{ 
            borderRadius: { xs: 1.5, sm: 2 },
            minWidth: { xs: '100%', sm: 200 }
          }} 
        />
      </Box>
    </Paper>
  );
};

// Revenue Table Skeleton
const RevenueTableSkeleton = ({ isMobile, isTablet }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        {/* Table Header Skeleton */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mb: 2,
          pb: 2,
          borderBottom: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
        }}>
          <Skeleton variant="text" width={150} height={32} />
          <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: 2 }} />
        </Box>

        {/* Table Rows Skeleton */}
        {[1, 2, 3, 4, 5].map((item) => (
          <Box key={item} sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            py: 1.5,
            borderBottom: item < 5 ? "1px solid" : "none",
            borderColor: alpha("#e2e8f0", 0.5),
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width="40%" height={16} />
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Skeleton variant="text" width={80} height={24} />
              <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3 }} />
            </Box>
          </Box>
        ))}

        {/* Pagination Skeleton */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mt: 3,
          pt: 2,
          borderTop: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
        }}>
          <Skeleton variant="text" width={100} height={24} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2 }} />
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

  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    allPaymentHistory = [],
    allPaymentHistoryLoading = false,
    totalCompletedAmount = 0,
    numberOfPaidUsers = 0,
    averageRevenue = 0,
    totalPages = 1,
  } = useSelector((state) => state.payment || {});

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, filterMonth]);

  // Fetch payment data from backend
  useEffect(() => {
    const selectedMonth =
      filterMonth !== "all"
        ? {
          month: filterMonth.split("-")[1],
          year: filterMonth.split("-")[0],
        }
        : {};

    dispatch(
      getAllPaymentHistory({
        search: debouncedSearchQuery,
        ...selectedMonth,
        page,
      })
    );

    // Set first render loader to false after 1 second
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [dispatch, debouncedSearchQuery, filterMonth, page]);

  const refreshData = async () => {
    setIsRefreshing(true);
    const selectedMonth =
      filterMonth !== "all"
        ? {
          month: filterMonth.split("-")[1],
          year: filterMonth.split("-")[0],
        }
        : {};

    await dispatch(
      getAllPaymentHistory({
        search: debouncedSearchQuery,
        ...selectedMonth,
        page,
      })
    );
    setIsRefreshing(false);
    toast.success("Data refreshed successfully");
  };

  // Transform API response
  const paymentData =
    allPaymentHistory?.map((payment) => ({
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
    })) || [];

  const totalRevenue = totalCompletedAmount || 0;
  const totalUsers = numberOfPaidUsers || 0;
  const avgRevenue = averageRevenue || 0;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
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

  // If first render loader is active, show skeletons for everything except title and refresh button
  if (showFirstRenderLoader) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters={isMobile}
          sx={{ px: { xs: 0, sm: 0, md: 0 } }}
        >
          {/* Header with title and refresh button only */}
          <Box sx={{
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: { xs: 2, sm: 3, md: 4 },
            gap: 2
          }}>
            <Box>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="800"
                color="#0f766e"
                gutterBottom
                sx={{
                  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                }}
              >
                Revenue Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
                Track and analyze all payment transactions
              </Typography>
            </Box>
            <IconButton
              size={isMobile ? "small" : "medium"}
              sx={{
                bgcolor: alpha("#0f766e", 0.1),
                color: "#0f766e",
              }}
            >
              <RefreshIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Box>

          {/* Stats Cards Skeleton */}
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <StatsCardSkeleton isMobile={isMobile} />
              </Grid>
            ))}
          </Grid>

          {/* Search Filter Skeleton */}
          <SearchFilterSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

          {/* Table Skeleton */}
          <Box sx={{ mt: { xs: 2, sm: 3 } }}>
            <RevenueTableSkeleton isMobile={isMobile} isTablet={isTablet} />
          </Box>
        </Container>

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
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters={isMobile}
        sx={{ px: { xs: 0, sm: 0, md: 0 } }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: { xs: 2, sm: 3, md: 4 },
              gap: 2
            }}>
              <Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight="800"
                  color="#0f766e"
                  gutterBottom
                  sx={{
                    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                  }}
                >
                  Revenue Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
                  Track and analyze all payment transactions
                </Typography>
              </Box>
              <IconButton
                onClick={refreshData}
                disabled={isRefreshing || allPaymentHistoryLoading}
                size={isMobile ? "small" : "medium"}
                sx={{
                  bgcolor: alpha("#0f766e", 0.1),
                  color: "#0f766e",
                  "&:hover": {
                    bgcolor: alpha("#0f766e", 0.2),
                  },
                }}
              >
                <RefreshIcon
                  sx={{
                    animation: isRefreshing ? "spin 1s linear infinite" : "none",
                    fontSize: { xs: 20, sm: 24 }
                  }}
                />
              </IconButton>
            </Box>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={MoneyIcon}
                  value={`₹${totalRevenue.toLocaleString("en-IN")}`}
                  label="Total Revenue"
                  iconBg={alpha("#22c55e", 0.1)}
                  iconColor="#22c55e"
                  isMobile={isMobile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={PeopleIcon}
                  value={totalUsers}
                  label="Paid Users"
                  iconBg={alpha("#3b82f6", 0.1)}
                  iconColor="#3b82f6"
                  isMobile={isMobile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={BarChartIcon}
                  value={`₹${avgRevenue.toFixed(0)}`}
                  label="Average Revenue"
                  iconBg={alpha("#a855f7", 0.1)}
                  iconColor="#a855f7"
                  isMobile={isMobile}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatsCard
                  icon={TrendingUpIcon}
                  value={new Date().getMonth() + 1}
                  label="Current Month"
                  iconBg={alpha("#f59e0b", 0.1)}
                  iconColor="#f59e0b"
                  isMobile={isMobile}
                />
              </Grid>
            </Grid>
          </motion.div>

          {/* Search and Filter */}
          <motion.div variants={itemVariants}>
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterMonth={filterMonth}
              setFilterMonth={setFilterMonth}
              resultsCount={paymentData.length}
              isMobile={isMobile}
              isTablet={isTablet}
              isSmallMobile={isSmallMobile}
            />
          </motion.div>

          {/* Table */}
          <motion.div variants={itemVariants} style={{ marginTop: isMobile ? 16 : 24 }}>
            {allPaymentHistoryLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 4, sm: 6, md: 8 } }}>
                <CircularProgress sx={{ color: "#0f766e" }} />
              </Box>
            ) : (
              <RevenueTable
                filteredPayments={paymentData}
                totalRevenue={totalRevenue}
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

export default RevenueManagement;