// // import React, { useEffect, useState } from "react";
// // import {
// //   Box,
// //   Container,
// //   Grid,
// //   Paper,
// //   Typography,
// //   Avatar,
// //   Chip,
// //   IconButton,
// //   Button,
// //   TextField,
// //   InputAdornment,
// //   Menu,
// //   MenuItem,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   CircularProgress,
// //   alpha,
// //   useTheme,
// //   Stack,
// //   Tooltip,
// //   Card,
// //   CardContent,
// // } from "@mui/material";
// // import {
// //   Refresh as RefreshIcon,
// //   Search as SearchIcon,
// //   Download as DownloadIcon,
// //   FilterList as FilterIcon,
// //   CheckCircle as CheckCircleIcon,
// //   Cancel as CancelIcon,
// //   Pending as PendingIcon,
// //   Receipt as ReceiptIcon,
// //   CalendarToday as CalendarIcon,
// //   AttachMoney as MoneyIcon,
// //   TrendingUp as TrendingUpIcon,
// //   People as PeopleIcon,
// //   BarChart as BarChartIcon,
// // } from "@mui/icons-material";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllPaymentHistory } from "../../redux/slices/paymentSlice";
// // import moment from "moment";
// // import { toast } from "react-toastify";
// // import Loader from "../../components/common/Loader";

// // // Stats Card Component
// // const StatsCard = ({ icon: Icon, value, label, bgColor, iconColor }) => {
// //   return (
// //     <Paper
// //       elevation={0}
// //       sx={{
// //         p: 2.5,
// //         borderRadius: 3,
// //         border: "1px solid",
// //         borderColor: alpha("#e2e8f0", 0.5),
// //         background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
// //         transition: "all 0.3s ease",
// //         "&:hover": {
// //           transform: "translateY(-4px)",
// //           boxShadow: `0 10px 25px -5px ${alpha(iconColor, 0.3)}`,
// //           borderColor: iconColor,
// //         },
// //       }}
// //     >
// //       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
// //         <Box>
// //           <Typography variant="h4" fontWeight="700" sx={{ color: "#1e293b", mb: 0.5 }}>
// //             {value}
// //           </Typography>
// //           <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
// //             {label}
// //           </Typography>
// //         </Box>
// //         <Avatar
// //           sx={{
// //             bgcolor: bgColor,
// //             color: iconColor,
// //             width: 48,
// //             height: 48,
// //           }}
// //         >
// //           <Icon size={24} />
// //         </Avatar>
// //       </Box>
// //     </Paper>
// //   );
// // };

// // // Search and Filter Component
// // const SearchFilter = ({ searchQuery, setSearchQuery, filterMonth, setFilterMonth, resultsCount }) => {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const currentYear = moment().year();
// //   const months = [
// //     { value: "all", label: "All Months" },
// //     ...Array.from({ length: 12 }, (_, i) => {
// //       const month = (i + 1).toString().padStart(2, "0");
// //       return {
// //         value: `${currentYear}-${month}`,
// //         label: moment(`${currentYear}-${month}`, "YYYY-MM").format("MMMM YYYY"),
// //       };
// //     }),
// //   ];

// //   const handleClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = () => {
// //     setAnchorEl(null);
// //   };

// //   const handleSelect = (value) => {
// //     setFilterMonth(value);
// //     handleClose();
// //   };

// //   return (
// //     <Paper
// //       elevation={0}
// //       sx={{
// //         p: 2,
// //         borderRadius: 3,
// //         border: "1px solid",
// //         borderColor: alpha("#e2e8f0", 0.5),
// //         display: "flex",
// //         flexDirection: { xs: "column", sm: "row" },
// //         alignItems: "center",
// //         justifyContent: "space-between",
// //         gap: 2,
// //       }}
// //     >
// //       <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
// //         <TextField
// //           fullWidth
// //           placeholder="Search by name, email or plan..."
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           size="small"
// //           InputProps={{
// //             startAdornment: (
// //               <InputAdornment position="start">
// //                 <SearchIcon sx={{ color: "#0f766e", fontSize: 20 }} />
// //               </InputAdornment>
// //             ),
// //           }}
// //           sx={{
// //             "& .MuiOutlinedInput-root": {
// //               borderRadius: 2,
// //               bgcolor: alpha("#0f766e", 0.05),
// //             },
// //           }}
// //         />
        
// //         <Button
// //           variant="outlined"
// //           onClick={handleClick}
// //           startIcon={<FilterIcon />}
// //           endIcon={<CalendarIcon />}
// //           sx={{
// //             minWidth: 140,
// //             borderColor: "#e2e8f0",
// //             color: "#64748b",
// //             "&:hover": {
// //               borderColor: "#0f766e",
// //               color: "#0f766e",
// //             },
// //           }}
// //         >
// //           {filterMonth === "all" ? "All Months" : moment(filterMonth).format("MMM YYYY")}
// //         </Button>
        
// //         <Menu
// //           anchorEl={anchorEl}
// //           open={Boolean(anchorEl)}
// //           onClose={handleClose}
// //           PaperProps={{
// //             sx: {
// //               maxHeight: 300,
// //               borderRadius: 2,
// //               mt: 1,
// //             },
// //           }}
// //         >
// //           {months.map((month) => (
// //             <MenuItem
// //               key={month.value}
// //               onClick={() => handleSelect(month.value)}
// //               selected={filterMonth === month.value}
// //             >
// //               {month.label}
// //             </MenuItem>
// //           ))}
// //         </Menu>
// //       </Box>

// //       <Chip
// //         label={`${resultsCount} Results`}
// //         size="small"
// //         sx={{
// //           bgcolor: alpha("#0f766e", 0.1),
// //           color: "#0f766e",
// //           fontWeight: 600,
// //           px: 1,
// //         }}
// //       />
// //     </Paper>
// //   );
// // };

// // // Revenue Table Component
// // const RevenueTable = ({ filteredPayments, page, handlePageChange, totalPages, loading }) => {
// //   const getStatusIcon = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "completed":
// //         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: 16 }} />;
// //       case "pending":
// //         return <PendingIcon sx={{ color: "#f59e0b", fontSize: 16 }} />;
// //       default:
// //         return <CancelIcon sx={{ color: "#ef4444", fontSize: 16 }} />;
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case "completed":
// //         return "#22c55e";
// //       case "pending":
// //         return "#f59e0b";
// //       default:
// //         return "#ef4444";
// //     }
// //   };

// //   const formatCurrency = (amount) => {
// //     return new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //       minimumFractionDigits: 0,
// //     }).format(amount);
// //   };

// //   return (
// //     <Paper
// //       elevation={0}
// //       sx={{
// //         borderRadius: 3,
// //         border: "1px solid",
// //         borderColor: alpha("#e2e8f0", 0.5),
// //         overflow: "hidden",
// //       }}
// //     >
// //       <TableContainer>
// //         <Table>
// //           <TableHead>
// //             <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
// //               <TableCell sx={{ fontWeight: 600 }}>Admin</TableCell>
// //               <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
// //               <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
// //               <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
// //               <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
// //               <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
// //               <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
// //               <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {loading ? (
// //               <TableRow>
// //                 <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
// //                   <CircularProgress sx={{ color: "#0f766e" }} />
// //                 </TableCell>
// //               </TableRow>
// //             ) : filteredPayments.length === 0 ? (
// //               <TableRow>
// //                 <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
// //                   <MoneyIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
// //                   <Typography variant="h6" color="text.secondary" gutterBottom>
// //                     No revenue data found
// //                   </Typography>
// //                   <Typography variant="body2" color="text.secondary">
// //                     Try adjusting your search or filter
// //                   </Typography>
// //                 </TableCell>
// //               </TableRow>
// //             ) : (
// //               <AnimatePresence>
// //                 {filteredPayments.map((payment, index) => (
// //                   <motion.tr
// //                     key={payment.id}
// //                     initial={{ opacity: 0, y: 10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0 }}
// //                     transition={{ duration: 0.2, delay: index * 0.02 }}
// //                     style={{
// //                       backgroundColor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
// //                     }}
// //                   >
// //                     <TableCell>
// //                       <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                         <Avatar
// //                           sx={{
// //                             width: 36,
// //                             height: 36,
// //                             bgcolor: alpha("#0f766e", 0.1),
// //                             color: "#0f766e",
// //                             fontSize: "0.85rem",
// //                           }}
// //                         >
// //                           {payment.name?.charAt(0) || "A"}
// //                         </Avatar>
// //                         <Typography variant="body2" fontWeight={500}>
// //                           {payment.name}
// //                         </Typography>
// //                       </Box>
// //                     </TableCell>
// //                     <TableCell>{payment.email}</TableCell>
// //                     <TableCell>
// //                       <Chip
// //                         label={payment.plan}
// //                         size="small"
// //                         sx={{
// //                           bgcolor: alpha("#0f766e", 0.1),
// //                           color: "#0f766e",
// //                           fontWeight: 500,
// //                         }}
// //                       />
// //                     </TableCell>
// //                     <TableCell>
// //                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
// //                         <CalendarIcon sx={{ color: "#64748b", fontSize: 14 }} />
// //                         <Typography variant="body2">
// //                           {moment(payment.date).format("DD MMM YYYY")}
// //                         </Typography>
// //                       </Box>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Typography variant="body2" fontWeight={600} sx={{ color: "#0f766e" }}>
// //                         {formatCurrency(payment.amount)}
// //                       </Typography>
// //                     </TableCell>
// //                     <TableCell>
// //                       <Chip
// //                         icon={getStatusIcon(payment.status)}
// //                         label={payment.status}
// //                         size="small"
// //                         sx={{
// //                           bgcolor: alpha(getStatusColor(payment.status), 0.1),
// //                           color: getStatusColor(payment.status),
// //                           fontWeight: 600,
// //                         }}
// //                       />
// //                     </TableCell>
// //                     <TableCell>{payment.paymentMethod || "Online"}</TableCell>
// //                     <TableCell>{payment.duration || "-"}</TableCell>
// //                   </motion.tr>
// //                 ))}
// //               </AnimatePresence>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {totalPages > 1 && (
// //         <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
// //           <TablePagination
// //             component="div"
// //             count={totalPages * 10}
// //             page={page - 1}
// //             onPageChange={(e, newPage) => handlePageChange(newPage + 1)}
// //             rowsPerPage={10}
// //             rowsPerPageOptions={[10]}
// //           />
// //         </Box>
// //       )}
// //     </Paper>
// //   );
// // };

// // const RevenueManagement = () => {
// //   const dispatch = useDispatch();
// //   const theme = useTheme();

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
// //   const [filterMonth, setFilterMonth] = useState("all");
// //   const [page, setPage] = useState(1);
// //   const [isRefreshing, setIsRefreshing] = useState(false);

// //   const {
// //     allPaymentHistory = [],
// //     allPaymentHistoryLoading = false,
// //     totalCompletedAmount = 0,
// //     numberOfPaidUsers = 0,
// //     averageRevenue = 0,
// //     totalPages = 1,
// //   } = useSelector((state) => state.payment || {});

// //   // Debounce search input
// //   useEffect(() => {
// //     const delayDebounce = setTimeout(() => {
// //       setDebouncedSearchQuery(searchQuery);
// //     }, 400);

// //     return () => clearTimeout(delayDebounce);
// //   }, [searchQuery]);

// //   useEffect(() => {
// //     setPage(1);
// //   }, [debouncedSearchQuery, filterMonth]);

// //   // Fetch payment data from backend
// //   useEffect(() => {
// //     const selectedMonth =
// //       filterMonth !== "all"
// //         ? {
// //             month: filterMonth.split("-")[1],
// //             year: filterMonth.split("-")[0],
// //           }
// //         : {};

// //     dispatch(
// //       getAllPaymentHistory({
// //         search: debouncedSearchQuery,
// //         ...selectedMonth,
// //         page,
// //       })
// //     );
// //   }, [dispatch, debouncedSearchQuery, filterMonth, page]);

// //   const refreshData = async () => {
// //     setIsRefreshing(true);
// //     const selectedMonth =
// //       filterMonth !== "all"
// //         ? {
// //             month: filterMonth.split("-")[1],
// //             year: filterMonth.split("-")[0],
// //           }
// //         : {};

// //     await dispatch(
// //       getAllPaymentHistory({
// //         search: debouncedSearchQuery,
// //         ...selectedMonth,
// //         page,
// //       })
// //     );
// //     setIsRefreshing(false);
// //     toast.success("Data refreshed successfully");
// //   };

// //   // Transform API response
// //   const paymentData =
// //     allPaymentHistory?.map((payment) => ({
// //       id: payment._id,
// //       name: payment.adminId?.name || "Unknown",
// //       email: payment.adminId?.email || "",
// //       date: payment.createdAt,
// //       amount: payment.amount,
// //       status: payment.status,
// //       plan: payment.planId?.name || "Unknown Plan",
// //       paymentMethod: payment.paymentMethod,
// //       duration: payment.duration,
// //       addOns: payment.addOns,
// //       expiresAt: payment.expiresAt,
// //       remainingDays: payment.remainingDays,
// //     })) || [];

// //   const totalRevenue = totalCompletedAmount || 0;
// //   const totalUsers = numberOfPaidUsers || 0;
// //   const avgRevenue = averageRevenue || 0;

// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 1 && newPage <= totalPages) {
// //       setPage(newPage);
// //     }
// //   };

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.5 },
// //     },
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
// //         py: 4,
// //         px: { xs: 2, md: 4 },
// //       }}
// //     >
// //       <Container maxWidth="xl">
// //         <motion.div
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //         >
// //           {/* Header */}
// //           <motion.div variants={itemVariants}>
// //             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
// //               <Box>
// //                 <Typography
// //                   variant="h4"
// //                   fontWeight="800"
// //                   color="#0f766e"
// //                   gutterBottom
// //                   sx={{
// //                     background: "linear-gradient(135deg, #0f766e, #14b8a6)",
// //                     WebkitBackgroundClip: "text",
// //                     WebkitTextFillColor: "transparent",
// //                   }}
// //                 >
// //                   Revenue Analytics
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   Track and analyze all payment transactions
// //                 </Typography>
// //               </Box>
// //               <IconButton
// //                 onClick={refreshData}
// //                 disabled={isRefreshing || allPaymentHistoryLoading}
// //                 sx={{
// //                   bgcolor: alpha("#0f766e", 0.1),
// //                   color: "#0f766e",
// //                   "&:hover": {
// //                     bgcolor: alpha("#0f766e", 0.2),
// //                   },
// //                 }}
// //               >
// //                 <RefreshIcon sx={{ animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
// //               </IconButton>
// //             </Box>
// //           </motion.div>

// //           {/* Stats Cards */}
// //           <motion.div variants={itemVariants}>
// //             <Grid container spacing={3} sx={{ mb: 4 }}>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <StatsCard
// //                   icon={MoneyIcon}
// //                   value={`₹${totalRevenue.toLocaleString("en-IN")}`}
// //                   label="Total Revenue"
// //                   bgColor={alpha("#22c55e", 0.1)}
// //                   iconColor="#22c55e"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <StatsCard
// //                   icon={PeopleIcon}
// //                   value={totalUsers}
// //                   label="Paid Users"
// //                   bgColor={alpha("#3b82f6", 0.1)}
// //                   iconColor="#3b82f6"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <StatsCard
// //                   icon={BarChartIcon}
// //                   value={`₹${avgRevenue.toFixed(0)}`}
// //                   label="Average Revenue"
// //                   bgColor={alpha("#a855f7", 0.1)}
// //                   iconColor="#a855f7"
// //                 />
// //               </Grid>
// //               <Grid item xs={12} sm={6} md={3}>
// //                 <StatsCard
// //                   icon={TrendingUpIcon}
// //                   value={new Date().getMonth() + 1}
// //                   label="Current Month"
// //                   bgColor={alpha("#f59e0b", 0.1)}
// //                   iconColor="#f59e0b"
// //                 />
// //               </Grid>
// //             </Grid>
// //           </motion.div>

// //           {/* Search and Filter */}
// //           <motion.div variants={itemVariants}>
// //             <SearchFilter
// //               searchQuery={searchQuery}
// //               setSearchQuery={setSearchQuery}
// //               filterMonth={filterMonth}
// //               setFilterMonth={setFilterMonth}
// //               resultsCount={paymentData.length}
// //             />
// //           </motion.div>

// //           {/* Table */}
// //           <motion.div variants={itemVariants} style={{ marginTop: 24 }}>
// //             <RevenueTable
// //               filteredPayments={paymentData}
// //               page={page}
// //               handlePageChange={handlePageChange}
// //               totalPages={totalPages}
// //               loading={allPaymentHistoryLoading}
// //             />
// //           </motion.div>
// //         </motion.div>
// //       </Container>

// //       <style>
// //         {`
// //           @keyframes spin {
// //             0% { transform: rotate(0deg); }
// //             100% { transform: rotate(360deg); }
// //           }
// //         `}
// //       </style>
// //     </Box>
// //   );
// // };

// // export default RevenueManagement;

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

const RevenueManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

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
        sx={{ px: { xs: 1, sm: 2, md: 3 } }}
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