// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Button,
//   Menu,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   LinearProgress,
//   alpha,
//   useTheme,
//   Avatar,
//   Stack,
//   Divider,
//   Tooltip,
//   Collapse,
//   Alert,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   History as HistoryIcon,
//   Refresh as RefreshIcon,
//   GridView as GridViewIcon,
//   TableRows as TableRowsIcon,
//   CheckCircle as CheckCircleIcon,
//   AccessTime as PendingIcon,
//   Cancel as CancelIcon,
//   ArrowUpward as IncomeIcon,
//   ArrowDownward as ExpenseIcon,
//   CalendarToday as CalendarIcon,
//   Receipt as ReceiptIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentHistory } from "../../redux/slices/paymentSlice";
// import ReceiptModal from "../../components/models/ReceiptModal";
// import { PaginationBottom } from "../../components/PaginationBottom";
// import { toast } from "react-toastify";

// const TransactionHistory = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
//   const authUser = useSelector((state) => state.auth?.user || {});
//   const userData = useSelector((state) => state.user?.userInfo || {});

//   const {
//     paymentHistory = [],
//     historyLoading = false,
//     historyError = null,
//     currentPage = 1,
//     totalPages = 1,
//     totalItems = 0,
//     paymentStats = {
//       totalPayments: 0,
//       completedCount: 0,
//       pendingCount: 0,
//       totalAmount: 0,
//     },
//   } = useSelector((state) => state.payment || {});

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [expandedAddOns, setExpandedAddOns] = useState({});
//   const [viewMode, setViewMode] = useState("table");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [sortAnchorEl, setSortAnchorEl] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");

//   useEffect(() => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//       }
//     }
//   }, [dispatch, isAuthenticated, authUser, userData, page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const toggleAddOns = (transactionId) => {
//     setExpandedAddOns((prev) => ({
//       ...prev,
//       [transactionId]: !prev[transactionId],
//     }));
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === "card" ? "table" : "card");
//   };

//   const refreshData = () => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//         toast.success("Data refreshed successfully");
//       }
//     }
//   };

//   const handleFilterClick = (event) => {
//     setFilterAnchorEl(event.currentTarget);
//   };

//   const handleFilterClose = (value) => {
//     if (value) {
//       setFilter(value);
//     }
//     setFilterAnchorEl(null);
//   };

//   const handleSortClick = (event) => {
//     setSortAnchorEl(event.currentTarget);
//   };

//   const handleSortClose = (value) => {
//     if (value) {
//       setSortBy(value);
//     }
//     setSortAnchorEl(null);
//   };

//   const filteredTransactions = paymentHistory?.filter((transaction) => {
//     if (filter === "all") return true;
//     return transaction.status === filter;
//   });

//   const sortedTransactions = [...(filteredTransactions || [])].sort((a, b) => {
//     if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
//     if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
//     if (sortBy === "highest") return b.amount - a.amount;
//     if (sortBy === "lowest") return a.amount - b.amount;
//     return 0;
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "pending":
//         return <PendingIcon sx={{ color: "#f59e0b", fontSize: { xs: 14, sm: 16 } }} />;
//       default:
//         return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "#22c55e";
//       case "pending":
//         return "#f59e0b";
//       default:
//         return "#ef4444";
//     }
//   };

//   const statCards = [
//     {
//       label: "Total Transactions",
//       value: paymentStats.totalPayments || 0,
//       icon: <HistoryIcon />,
//       color: "#0f766e",
//     },
//     {
//       label: "Completed",
//       value: paymentStats.completedCount || 0,
//       icon: <CheckCircleIcon />,
//       color: "#22c55e",
//     },
//     {
//       label: "Pending",
//       value: paymentStats.pendingCount || 0,
//       icon: <PendingIcon />,
//       color: "#f59e0b",
//     },
//     {
//       label: "Total Amount",
//       value: formatAmount(paymentStats.totalAmount || 0),
//       icon: <IncomeIcon />,
//       color: "#0f766e",
//     },
//   ];

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
//       {/* Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           py: { xs: 2, sm: 2.5, md: 3 },
//           px: { xs: 2, sm: 2.5, md: 3 },
//           borderBottom: "1px solid",
//           borderColor: alpha("#e2e8f0", 0.5),
//           borderRadius: 0,
//         }}
//       >
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between", 
//             alignItems: { xs: 'flex-start', sm: 'center' }, 
//             flexWrap: "wrap", 
//             gap: 2 
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha("#0f766e", 0.1),
//                   color: "#0f766e",
//                   width: { xs: 40, sm: 45, md: 50 },
//                   height: { xs: 40, sm: 45, md: 50 },
//                 }}
//               >
//                 <HistoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//               </Avatar>
//               <Box>
//                 <Typography 
//                   variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 color="#0f766e"
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//                 >
//                   Transaction History
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                   View all your payment transactions
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ 
//               display: "flex", 
//               gap: 1, 
//               flexWrap: 'wrap',
//               width: { xs: '100%', sm: 'auto' },
//               justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//             }}>
//               <Tooltip title="Refresh">
//                 <IconButton
//                   onClick={refreshData}
//                   disabled={historyLoading}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: "#0f766e",
//                     "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
//                   }}
//                 >
//                   <RefreshIcon sx={{ 
//                     animation: historyLoading ? "spin 1s linear infinite" : "none",
//                     fontSize: { xs: 18, sm: 20, md: 24 }
//                   }} />
//                 </IconButton>
//               </Tooltip>

//               <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
//                 <IconButton
//                   onClick={toggleViewMode}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: "#0f766e",
//                     "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
//                   }}
//                 >
//                   {viewMode === "table" ? 
//                     <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} /> : 
//                     <TableRowsIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
//                   }
//                 </IconButton>
//               </Tooltip>

//               <Button
//                 variant="outlined"
//                 onClick={handleFilterClick}
//                 startIcon={<PendingIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: "#e2e8f0",
//                   color: "#64748b",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: "#0f766e",
//                     color: "#0f766e",
//                   },
//                 }}
//               >
//                 Filter: {filter}
//               </Button>

//               <Menu
//                 anchorEl={filterAnchorEl}
//                 open={Boolean(filterAnchorEl)}
//                 onClose={() => handleFilterClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleFilterClose("all")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>All</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("completed")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Completed</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("pending")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Pending</MenuItem>
//               </Menu>

//               <Button
//                 variant="outlined"
//                 onClick={handleSortClick}
//                 startIcon={<CalendarIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: "#e2e8f0",
//                   color: "#64748b",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: "#0f766e",
//                     color: "#0f766e",
//                   },
//                 }}
//               >
//                 Sort: {sortBy === "newest" ? "Newest" : 
//                        sortBy === "oldest" ? "Oldest" : 
//                        sortBy === "highest" ? "Highest" : "Lowest"}
//               </Button>

//               <Menu
//                 anchorEl={sortAnchorEl}
//                 open={Boolean(sortAnchorEl)}
//                 onClose={() => handleSortClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleSortClose("newest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Newest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("oldest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Oldest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("highest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Highest Amount</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("lowest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Lowest Amount</MenuItem>
//               </Menu>
//             </Box>
//           </Box>
//         </Container>
//       </Paper>

//       {/* Stats Cards */}
//       <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2.5, md: 3 } }}>
//         <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
//           {statCards.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: { xs: 1.5, sm: 1.8, md: 2 },
//                     borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                     border: "1px solid",
//                     borderColor: alpha(stat.color, 0.2),
//                     position: "relative",
//                     overflow: "hidden",
//                     height: '100%',
//                     minHeight: { xs: 90, sm: 95, md: 100 },
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                         {stat.label}
//                       </Typography>
//                       <Typography 
//                         variant="h5" 
//                         fontWeight={700} 
//                         sx={{ 
//                           color: stat.color, 
//                           mt: 1,
//                           fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
//                           wordBreak: 'break-word',
//                         }}
//                       >
//                         {stat.value}
//                       </Typography>
//                     </Box>
//                     <Avatar
//                       sx={{
//                         bgcolor: alpha(stat.color, 0.1),
//                         color: stat.color,
//                         width: { xs: 36, sm: 42, md: 48 },
//                         height: { xs: 36, sm: 42, md: 48 },
//                         '& svg': {
//                           fontSize: { xs: 18, sm: 20, md: 22 }
//                         }
//                       }}
//                     >
//                       {stat.icon}
//                     </Avatar>
//                   </Box>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Transactions List */}
//       <Container maxWidth="xl" sx={{ pb: 4, px: { xs: 1, sm: 2, md: 3 } }}>
//         {historyLoading ? (
//           <Box sx={{ width: "100%", mt: 4 }}>
//             <LinearProgress sx={{ bgcolor: alpha("#0f766e", 0.1), "& .MuiLinearProgress-bar": { bgcolor: "#0f766e" } }} />
//             <Typography textAlign="center" sx={{ mt: 2 }} color="text.secondary" fontSize={{ xs: '0.8rem', sm: '0.9rem', md: '1rem' }}>
//               Loading transactions...
//             </Typography>
//           </Box>
//         ) : sortedTransactions.length > 0 ? (
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer sx={{ 
//                   overflowX: 'auto',
//                   '&::-webkit-scrollbar': {
//                     height: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: alpha('#0f766e', 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isMobile ? 800 : isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Sr. No
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Plan
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Description
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Date
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Amount
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Status
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Payment
//                         </TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Actions
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <AnimatePresence>
//                         {sortedTransactions.map((transaction, index) => (
//                           <motion.tr
//                             key={transaction._id || index}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {page * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               {transaction.planId ? (
//                                 <Box>
//                                   <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                     {transaction.planId.name}
//                                   </Typography>
//                                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                     {transaction.planId.duration}
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Box>
//                                 <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                   {formatDate(transaction.createdAt)}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                   {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Typography
//                                 variant="body2"
//                                 fontWeight={600}
//                                 sx={{ 
//                                   color: transaction.amount > 0 ? "#22c55e" : "#ef4444",
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
//                                 }}
//                               >
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' },
//                                   height: { xs: 20, sm: 22, md: 24 },
//                                   '& .MuiChip-icon': {
//                                     fontSize: { xs: 10, sm: 12, md: 14 }
//                                   }
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </TableCell>
//                             <TableCell align="right">
//                               <Tooltip title="View Receipt">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => {
//                                     setSelectedTransaction(transaction);
//                                     setShowReceipt(true);
//                                   }}
//                                   sx={{ 
//                                     color: "#0f766e",
//                                     width: { xs: 28, sm: 30, md: 32 },
//                                     height: { xs: 28, sm: 30, md: 32 },
//                                   }}
//                                 >
//                                   <ReceiptIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
//                                 </IconButton>
//                               </Tooltip>
//                             </TableCell>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   component="div"
//                   count={totalItems}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   rowsPerPage={rowsPerPage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   rowsPerPageOptions={[5, 10, 25, 50]}
//                   sx={{
//                     borderTop: "1px solid",
//                     borderColor: alpha("#e2e8f0", 0.5),
//                     '.MuiTablePagination-select': {
//                       borderRadius: 2,
//                     },
//                     '.MuiTablePagination-displayedRows': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-selectLabel': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-actions': {
//                       button: {
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                       }
//                     }
//                   }}
//                 />
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//                 <Stack spacing={2}>
//                   <AnimatePresence>
//                     {sortedTransactions.map((transaction, index) => (
//                       <motion.div
//                         key={transaction._id || index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                       >
//                         <Paper
//                           elevation={0}
//                           sx={{
//                             p: { xs: 2, sm: 2.5, md: 3 },
//                             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                             border: "1px solid",
//                             borderColor: alpha("#e2e8f0", 0.5),
//                             cursor: "pointer",
//                             transition: "all 0.2s ease",
//                             "&:hover": {
//                               borderColor: "#0f766e",
//                               boxShadow: "0 8px 20px -8px rgba(15, 118, 110, 0.3)",
//                             },
//                           }}
//                           onClick={() => {
//                             setSelectedTransaction(transaction);
//                             setShowReceipt(true);
//                           }}
//                         >
//                           <Box sx={{ 
//                             display: "flex", 
//                             flexDirection: { xs: 'column', sm: 'row' },
//                             justifyContent: "space-between", 
//                             alignItems: { xs: 'flex-start', sm: 'center' }, 
//                             mb: 2,
//                             gap: 1
//                           }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//                               <Avatar
//                                 sx={{
//                                   bgcolor: transaction.amount > 0 ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
//                                   color: transaction.amount > 0 ? "#22c55e" : "#ef4444",
//                                   width: { xs: 40, sm: 45, md: 48 },
//                                   height: { xs: 40, sm: 45, md: 48 },
//                                 }}
//                               >
//                                 {transaction.amount > 0 ? 
//                                   <IncomeIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} /> : 
//                                   <ExpenseIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                                 }
//                               </Avatar>
//                               <Box sx={{ flex: 1 }}>
//                                 <Typography 
//                                   variant="subtitle1" 
//                                   fontWeight={600} 
//                                   sx={{ 
//                                     fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//                                     wordBreak: 'break-word',
//                                   }}
//                                 >
//                                   {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//                                   <CalendarIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
//                                   {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <Box sx={{ 
//                               textAlign: "right",
//                               width: { xs: '100%', sm: 'auto' },
//                               mt: { xs: 1, sm: 0 }
//                             }}>
//                               <Typography variant="h6" fontWeight={700} sx={{ 
//                                 color: "#0f766e",
//                                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
//                               }}>
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   mt: 0.5,
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                                   height: { xs: 22, sm: 24 },
//                                 }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 2 }} />

//                           <Grid container spacing={2}>
//                             {transaction.planId && (
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                   Plan
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                   {transaction.planId.name} ({transaction.planId.duration})
//                                 </Typography>
//                               </Grid>
//                             )}
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 Payment Method
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </Grid>
//                           </Grid>

//                           {transaction.addOns && transaction.addOns.length > 0 && (
//                             <Box sx={{ mt: 2 }}>
//                               <Button
//                                 size="small"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   toggleAddOns(transaction._id);
//                                 }}
//                                 endIcon={expandedAddOns[transaction._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                                 sx={{ 
//                                   color: "#0f766e",
//                                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//                                 }}
//                               >
//                                 {transaction.addOns.length} Add-on(s)
//                               </Button>
//                               <Collapse in={expandedAddOns[transaction._id]}>
//                                 <Box sx={{ mt: 2, p: 2, bgcolor: alpha("#f8fafc", 0.5), borderRadius: 2 }}>
//                                   {transaction.addOns.map((addOn, idx) => (
//                                     <Box key={idx} sx={{ 
//                                       display: "flex", 
//                                       flexDirection: { xs: 'column', sm: 'row' },
//                                       justifyContent: "space-between", 
//                                       mb: 1,
//                                       gap: { xs: 0.5, sm: 0 }
//                                     }}>
//                                       <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                         Upgrade to {addOn.addOnMaxUser} users
//                                       </Typography>
//                                       <Box sx={{ 
//                                         display: "flex", 
//                                         alignItems: "center", 
//                                         gap: 1,
//                                         justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//                                       }}>
//                                         <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e", fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                           +{formatAmount(addOn.addOnAmount)}
//                                         </Typography>
//                                         <Chip
//                                           label={addOn.status}
//                                           size="small"
//                                           sx={{
//                                             bgcolor: alpha(getStatusColor(addOn.status), 0.1),
//                                             color: getStatusColor(addOn.status),
//                                             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                                             height: { xs: 20, sm: 22 },
//                                           }}
//                                         />
//                                       </Box>
//                                     </Box>
//                                   ))}
//                                 </Box>
//                               </Collapse>
//                             </Box>
//                           )}
//                         </Paper>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </Stack>
//                 {totalItems > rowsPerPage && (
//                   <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= totalItems}
//                       size={isMobile ? "small" : "medium"}
//                       sx={{
//                         borderColor: "#0f766e",
//                         color: "#0f766e",
//                         fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                         "&:hover": {
//                           borderColor: "#0a5c55",
//                           bgcolor: alpha("#0f766e", 0.1),
//                         },
//                       }}
//                     >
//                       Load More
//                     </Button>
//                   </Box>
//                 )}
//               </Box>
//             )}
//           </Paper>
//         ) : (
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 3, sm: 4, md: 5 },
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               textAlign: "center",
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//             }}
//           >
//             <HistoryIcon sx={{ 
//               fontSize: { xs: 36, sm: 42, md: 48 }, 
//               color: alpha("#0f766e", 0.3), 
//               mb: 2 
//             }} />
//             <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
//               No transactions found
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//               Your transaction history will appear here after making payments
//             </Typography>
//           </Paper>
//         )}
//       </Container>

//       {/* Receipt Modal */}
//       {selectedTransaction && (
//         <ReceiptModal
//           transaction={selectedTransaction}
//           show={showReceipt}
//           onHide={() => setShowReceipt(false)}
//         />
//       )}

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

// export default TransactionHistory;






// Skelaton Loader




// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Button,
//   Menu,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   LinearProgress,
//   alpha,
//   useTheme,
//   Avatar,
//   Stack,
//   Divider,
//   Tooltip,
//   Collapse,
//   Alert,
//   useMediaQuery,
//   Skeleton,
// } from "@mui/material";
// import {
//   History as HistoryIcon,
//   Refresh as RefreshIcon,
//   GridView as GridViewIcon,
//   TableRows as TableRowsIcon,
//   CheckCircle as CheckCircleIcon,
//   AccessTime as PendingIcon,
//   Cancel as CancelIcon,
//   ArrowUpward as IncomeIcon,
//   ArrowDownward as ExpenseIcon,
//   CalendarToday as CalendarIcon,
//   Receipt as ReceiptIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentHistory } from "../../redux/slices/paymentSlice";
// import ReceiptModal from "../../components/models/ReceiptModal";
// import { PaginationBottom } from "../../components/PaginationBottom";
// import { toast } from "react-toastify";

// // Stat Card Skeleton Component
// const StatCardSkeleton = () => {
//   return (
//     <Grid item xs={12} sm={6} md={3}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 1.5, sm: 1.8, md: 2 },
//           borderRadius: { xs: 2, sm: 2.5, md: 3 },
//           border: "1px solid",
//           borderColor: alpha("#e2e8f0", 0.5),
//           height: '100%',
//           minHeight: { xs: 90, sm: 95, md: 100 },
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <Box sx={{ flex: 1 }}>
//             <Skeleton variant="text" width={80} height={16} sx={{ mb: 1 }} />
//             <Skeleton variant="text" width={100} height={28} />
//           </Box>
//           <Skeleton variant="circular" width={48} height={48} />
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// // Table Row Skeleton
// const TableRowSkeleton = ({ isMobile }) => {
//   return (
//     <TableRow>
//       <TableCell>
//         <Skeleton variant="text" width={30} height={20} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={100} height={20} />
//         <Skeleton variant="text" width={60} height={16} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={80} height={20} />
//         <Skeleton variant="text" width={60} height={16} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={80} height={24} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3 }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={60} height={20} />
//       </TableCell>
//       <TableCell align="right">
//         <Skeleton variant="circular" width={32} height={32} />
//       </TableCell>
//     </TableRow>
//   );
// };

// // Card View Skeleton
// const CardViewSkeleton = () => {
//   return (
//     <Stack spacing={2}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//           }}
//         >
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between", 
//             alignItems: { xs: 'flex-start', sm: 'center' }, 
//             mb: 2,
//             gap: 1
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Skeleton variant="circular" width={48} height={48} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width={200} height={24} sx={{ mb: 0.5 }} />
//                 <Skeleton variant="text" width={150} height={16} />
//               </Box>
//             </Box>
//             <Box sx={{ 
//               textAlign: "right",
//               width: { xs: '100%', sm: 'auto' },
//               mt: { xs: 1, sm: 0 }
//             }}>
//               <Skeleton variant="text" width={100} height={32} sx={{ mb: 0.5 }} />
//               <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3 }} />
//             </Box>
//           </Box>

//           <Divider sx={{ my: 2 }} />

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={40} height={16} sx={{ mb: 0.5 }} />
//               <Skeleton variant="text" width={120} height={20} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={80} height={16} sx={{ mb: 0.5 }} />
//               <Skeleton variant="text" width={100} height={20} />
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//     </Stack>
//   );
// };

// // Header Buttons Skeleton
// const HeaderButtonsSkeleton = ({ isMobile }) => {
//   return (
//     <Box sx={{ 
//       display: "flex", 
//       gap: 1, 
//       flexWrap: 'wrap',
//       width: { xs: '100%', sm: 'auto' },
//       justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//     }}>
//       <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} />
//       <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} />
//       <Skeleton variant="rounded" width={isMobile ? 90 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2 }} />
//       <Skeleton variant="rounded" width={isMobile ? 90 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2 }} />
//     </Box>
//   );
// };

// const TransactionHistory = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
//   const authUser = useSelector((state) => state.auth?.user || {});
//   const userData = useSelector((state) => state.user?.userInfo || {});

//   const {
//     paymentHistory = [],
//     historyLoading = false,
//     historyError = null,
//     currentPage = 1,
//     totalPages = 1,
//     totalItems = 0,
//     paymentStats = {
//       totalPayments: 0,
//       completedCount: 0,
//       pendingCount: 0,
//       totalAmount: 0,
//     },
//   } = useSelector((state) => state.payment || {});

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [expandedAddOns, setExpandedAddOns] = useState({});
//   const [viewMode, setViewMode] = useState("table");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [sortAnchorEl, setSortAnchorEl] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");

//   useEffect(() => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//       }
//     }

//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch, isAuthenticated, authUser, userData, page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const toggleAddOns = (transactionId) => {
//     setExpandedAddOns((prev) => ({
//       ...prev,
//       [transactionId]: !prev[transactionId],
//     }));
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === "card" ? "table" : "card");
//   };

//   const refreshData = () => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//         toast.success("Data refreshed successfully");
//       }
//     }
//   };

//   const handleFilterClick = (event) => {
//     setFilterAnchorEl(event.currentTarget);
//   };

//   const handleFilterClose = (value) => {
//     if (value) {
//       setFilter(value);
//     }
//     setFilterAnchorEl(null);
//   };

//   const handleSortClick = (event) => {
//     setSortAnchorEl(event.currentTarget);
//   };

//   const handleSortClose = (value) => {
//     if (value) {
//       setSortBy(value);
//     }
//     setSortAnchorEl(null);
//   };

//   const filteredTransactions = paymentHistory?.filter((transaction) => {
//     if (filter === "all") return true;
//     return transaction.status === filter;
//   });

//   const sortedTransactions = [...(filteredTransactions || [])].sort((a, b) => {
//     if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
//     if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
//     if (sortBy === "highest") return b.amount - a.amount;
//     if (sortBy === "lowest") return a.amount - b.amount;
//     return 0;
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "pending":
//         return <PendingIcon sx={{ color: "#f59e0b", fontSize: { xs: 14, sm: 16 } }} />;
//       default:
//         return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "#22c55e";
//       case "pending":
//         return "#f59e0b";
//       default:
//         return "#ef4444";
//     }
//   };

//   const statCards = [
//     {
//       label: "Total Transactions",
//       value: paymentStats.totalPayments || 0,
//       icon: <HistoryIcon />,
//       color: "#0f766e",
//     },
//     {
//       label: "Completed",
//       value: paymentStats.completedCount || 0,
//       icon: <CheckCircleIcon />,
//       color: "#22c55e",
//     },
//     {
//       label: "Pending",
//       value: paymentStats.pendingCount || 0,
//       icon: <PendingIcon />,
//       color: "#f59e0b",
//     },
//     {
//       label: "Total Amount",
//       value: formatAmount(paymentStats.totalAmount || 0),
//       icon: <IncomeIcon />,
//       color: "#0f766e",
//     },
//   ];

//   // If first render loader is active, show skeletons for everything except title and buttons
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
//         {/* Header with title and buttons only (no loading) */}
//         <Paper
//           elevation={0}
//           sx={{
//             py: { xs: 2, sm: 2.5, md: 3 },
//             px: { xs: 2, sm: 2.5, md: 3 },
//             borderBottom: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//             borderRadius: 0,
//           }}
//         >
//           <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//             <Box sx={{ 
//               display: "flex", 
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between", 
//               alignItems: { xs: 'flex-start', sm: 'center' }, 
//               flexWrap: "wrap", 
//               gap: 2 
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#0f766e", 0.1),
//                     color: "#0f766e",
//                     width: { xs: 40, sm: 45, md: 50 },
//                     height: { xs: 40, sm: 45, md: 50 },
//                   }}
//                 >
//                   <HistoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                 </Avatar>
//                 <Box>
//                   <Typography 
//                     variant={isMobile ? "h5" : "h4"}
//                     fontWeight="800"
//                     color="#0f766e"
//                     gutterBottom
//                     sx={{
//                       background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                     }}
//                   >
//                     Transaction History
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                     View all your payment transactions
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Buttons Skeleton */}
//               <HeaderButtonsSkeleton isMobile={isMobile} />
//             </Box>
//           </Container>
//         </Paper>

//         {/* Stats Cards Skeleton */}
//         <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2.5, md: 3 } }}>
//           <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//           </Grid>
//         </Container>

//         {/* Transactions List Skeleton */}
//         <Container maxWidth="xl" sx={{ pb: 4, px: { xs: 1, sm: 2, md: 3 } }}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer>
//                   <Table sx={{ minWidth: isMobile ? 800 : isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//                         <TableCell>Sr. No</TableCell>
//                         <TableCell>Plan</TableCell>
//                         <TableCell>Description</TableCell>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Amount</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Payment</TableCell>
//                         <TableCell align="right">Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} isMobile={isMobile} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha("#e2e8f0", 0.5) }}>
//                   <Skeleton variant="rounded" width="100%" height={52} />
//                 </Box>
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//                 <CardViewSkeleton />
//               </Box>
//             )}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
//       {/* Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           py: { xs: 2, sm: 2.5, md: 3 },
//           px: { xs: 2, sm: 2.5, md: 3 },
//           borderBottom: "1px solid",
//           borderColor: alpha("#e2e8f0", 0.5),
//           borderRadius: 0,
//         }}
//       >
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between", 
//             alignItems: { xs: 'flex-start', sm: 'center' }, 
//             flexWrap: "wrap", 
//             gap: 2 
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha("#0f766e", 0.1),
//                   color: "#0f766e",
//                   width: { xs: 40, sm: 45, md: 50 },
//                   height: { xs: 40, sm: 45, md: 50 },
//                 }}
//               >
//                 <HistoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//               </Avatar>
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
//                   Transaction History
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                   View all your payment transactions
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ 
//               display: "flex", 
//               gap: 1, 
//               flexWrap: 'wrap',
//               width: { xs: '100%', sm: 'auto' },
//               justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//             }}>
//               <Tooltip title="Refresh">
//                 <IconButton
//                   onClick={refreshData}
//                   disabled={historyLoading}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: "#0f766e",
//                     "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
//                   }}
//                 >
//                   <RefreshIcon sx={{ 
//                     animation: historyLoading ? "spin 1s linear infinite" : "none",
//                     fontSize: { xs: 18, sm: 20, md: 24 }
//                   }} />
//                 </IconButton>
//               </Tooltip>

//               <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
//                 <IconButton
//                   onClick={toggleViewMode}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: "#0f766e",
//                     "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
//                   }}
//                 >
//                   {viewMode === "table" ? 
//                     <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} /> : 
//                     <TableRowsIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
//                   }
//                 </IconButton>
//               </Tooltip>

//               <Button
//                 variant="outlined"
//                 onClick={handleFilterClick}
//                 startIcon={<PendingIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: "#e2e8f0",
//                   color: "#64748b",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: "#0f766e",
//                     color: "#0f766e",
//                   },
//                 }}
//               >
//                 Filter: {filter}
//               </Button>

//               <Menu
//                 anchorEl={filterAnchorEl}
//                 open={Boolean(filterAnchorEl)}
//                 onClose={() => handleFilterClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleFilterClose("all")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>All</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("completed")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Completed</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("pending")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Pending</MenuItem>
//               </Menu>

//               <Button
//                 variant="outlined"
//                 onClick={handleSortClick}
//                 startIcon={<CalendarIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: "#e2e8f0",
//                   color: "#64748b",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: "#0f766e",
//                     color: "#0f766e",
//                   },
//                 }}
//               >
//                 Sort: {sortBy === "newest" ? "Newest" : 
//                        sortBy === "oldest" ? "Oldest" : 
//                        sortBy === "highest" ? "Highest" : "Lowest"}
//               </Button>

//               <Menu
//                 anchorEl={sortAnchorEl}
//                 open={Boolean(sortAnchorEl)}
//                 onClose={() => handleSortClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleSortClose("newest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Newest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("oldest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Oldest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("highest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Highest Amount</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("lowest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Lowest Amount</MenuItem>
//               </Menu>
//             </Box>
//           </Box>
//         </Container>
//       </Paper>

//       {/* Stats Cards */}
//       <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2.5, md: 3 } }}>
//         <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
//           {statCards.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: { xs: 1.5, sm: 1.8, md: 2 },
//                     borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                     border: "1px solid",
//                     borderColor: alpha(stat.color, 0.2),
//                     position: "relative",
//                     overflow: "hidden",
//                     height: '100%',
//                     minHeight: { xs: 90, sm: 95, md: 100 },
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                         {stat.label}
//                       </Typography>
//                       <Typography 
//                         variant="h5" 
//                         fontWeight={700} 
//                         sx={{ 
//                           color: stat.color, 
//                           mt: 1,
//                           fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
//                           wordBreak: 'break-word',
//                         }}
//                       >
//                         {stat.value}
//                       </Typography>
//                     </Box>
//                     <Avatar
//                       sx={{
//                         bgcolor: alpha(stat.color, 0.1),
//                         color: stat.color,
//                         width: { xs: 36, sm: 42, md: 48 },
//                         height: { xs: 36, sm: 42, md: 48 },
//                         '& svg': {
//                           fontSize: { xs: 18, sm: 20, md: 22 }
//                         }
//                       }}
//                     >
//                       {stat.icon}
//                     </Avatar>
//                   </Box>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Transactions List */}
//       <Container maxWidth="xl" sx={{ pb: 4, px: { xs: 1, sm: 2, md: 3 } }}>
//         {historyLoading ? (
//           <Box sx={{ width: "100%", mt: 4 }}>
//             <LinearProgress sx={{ bgcolor: alpha("#0f766e", 0.1), "& .MuiLinearProgress-bar": { bgcolor: "#0f766e" } }} />
//             <Typography textAlign="center" sx={{ mt: 2 }} color="text.secondary" fontSize={{ xs: '0.8rem', sm: '0.9rem', md: '1rem' }}>
//               Loading transactions...
//             </Typography>
//           </Box>
//         ) : sortedTransactions.length > 0 ? (
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer sx={{ 
//                   overflowX: 'auto',
//                   '&::-webkit-scrollbar': {
//                     height: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: alpha('#0f766e', 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isMobile ? 800 : isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Sr. No
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Plan
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Description
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Date
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Amount
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Status
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Payment
//                         </TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                           Actions
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <AnimatePresence>
//                         {sortedTransactions.map((transaction, index) => (
//                           <motion.tr
//                             key={transaction._id || index}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {page * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               {transaction.planId ? (
//                                 <Box>
//                                   <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                     {transaction.planId.name}
//                                   </Typography>
//                                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                     {transaction.planId.duration}
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Box>
//                                 <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                   {formatDate(transaction.createdAt)}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                   {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Typography
//                                 variant="body2"
//                                 fontWeight={600}
//                                 sx={{ 
//                                   color: transaction.amount > 0 ? "#22c55e" : "#ef4444",
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
//                                 }}
//                               >
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' },
//                                   height: { xs: 20, sm: 22, md: 24 },
//                                   '& .MuiChip-icon': {
//                                     fontSize: { xs: 10, sm: 12, md: 14 }
//                                   }
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </TableCell>
//                             <TableCell align="right">
//                               <Tooltip title="View Receipt">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => {
//                                     setSelectedTransaction(transaction);
//                                     setShowReceipt(true);
//                                   }}
//                                   sx={{ 
//                                     color: "#0f766e",
//                                     width: { xs: 28, sm: 30, md: 32 },
//                                     height: { xs: 28, sm: 30, md: 32 },
//                                   }}
//                                 >
//                                   <ReceiptIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
//                                 </IconButton>
//                               </Tooltip>
//                             </TableCell>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   component="div"
//                   count={totalItems}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   rowsPerPage={rowsPerPage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   rowsPerPageOptions={[5, 10, 25, 50]}
//                   sx={{
//                     borderTop: "1px solid",
//                     borderColor: alpha("#e2e8f0", 0.5),
//                     '.MuiTablePagination-select': {
//                       borderRadius: 2,
//                     },
//                     '.MuiTablePagination-displayedRows': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-selectLabel': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-actions': {
//                       button: {
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                       }
//                     }
//                   }}
//                 />
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//                 <Stack spacing={2}>
//                   <AnimatePresence>
//                     {sortedTransactions.map((transaction, index) => (
//                       <motion.div
//                         key={transaction._id || index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                       >
//                         <Paper
//                           elevation={0}
//                           sx={{
//                             p: { xs: 2, sm: 2.5, md: 3 },
//                             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                             border: "1px solid",
//                             borderColor: alpha("#e2e8f0", 0.5),
//                             cursor: "pointer",
//                             transition: "all 0.2s ease",
//                             "&:hover": {
//                               borderColor: "#0f766e",
//                               boxShadow: "0 8px 20px -8px rgba(15, 118, 110, 0.3)",
//                             },
//                           }}
//                           onClick={() => {
//                             setSelectedTransaction(transaction);
//                             setShowReceipt(true);
//                           }}
//                         >
//                           <Box sx={{ 
//                             display: "flex", 
//                             flexDirection: { xs: 'column', sm: 'row' },
//                             justifyContent: "space-between", 
//                             alignItems: { xs: 'flex-start', sm: 'center' }, 
//                             mb: 2,
//                             gap: 1
//                           }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//                               <Avatar
//                                 sx={{
//                                   bgcolor: transaction.amount > 0 ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
//                                   color: transaction.amount > 0 ? "#22c55e" : "#ef4444",
//                                   width: { xs: 40, sm: 45, md: 48 },
//                                   height: { xs: 40, sm: 45, md: 48 },
//                                 }}
//                               >
//                                 {transaction.amount > 0 ? 
//                                   <IncomeIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} /> : 
//                                   <ExpenseIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                                 }
//                               </Avatar>
//                               <Box sx={{ flex: 1 }}>
//                                 <Typography 
//                                   variant="subtitle1" 
//                                   fontWeight={600} 
//                                   sx={{ 
//                                     fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//                                     wordBreak: 'break-word',
//                                   }}
//                                 >
//                                   {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//                                   <CalendarIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle' }} />
//                                   {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <Box sx={{ 
//                               textAlign: "right",
//                               width: { xs: '100%', sm: 'auto' },
//                               mt: { xs: 1, sm: 0 }
//                             }}>
//                               <Typography variant="h6" fontWeight={700} sx={{ 
//                                 color: "#0f766e",
//                                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
//                               }}>
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   mt: 0.5,
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                                   height: { xs: 22, sm: 24 },
//                                 }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 2 }} />

//                           <Grid container spacing={2}>
//                             {transaction.planId && (
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                   Plan
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                   {transaction.planId.name} ({transaction.planId.duration})
//                                 </Typography>
//                               </Grid>
//                             )}
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 Payment Method
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </Grid>
//                           </Grid>

//                           {transaction.addOns && transaction.addOns.length > 0 && (
//                             <Box sx={{ mt: 2 }}>
//                               <Button
//                                 size="small"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   toggleAddOns(transaction._id);
//                                 }}
//                                 endIcon={expandedAddOns[transaction._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                                 sx={{ 
//                                   color: "#0f766e",
//                                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//                                 }}
//                               >
//                                 {transaction.addOns.length} Add-on(s)
//                               </Button>
//                               <Collapse in={expandedAddOns[transaction._id]}>
//                                 <Box sx={{ mt: 2, p: 2, bgcolor: alpha("#f8fafc", 0.5), borderRadius: 2 }}>
//                                   {transaction.addOns.map((addOn, idx) => (
//                                     <Box key={idx} sx={{ 
//                                       display: "flex", 
//                                       flexDirection: { xs: 'column', sm: 'row' },
//                                       justifyContent: "space-between", 
//                                       mb: 1,
//                                       gap: { xs: 0.5, sm: 0 }
//                                     }}>
//                                       <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                         Upgrade to {addOn.addOnMaxUser} users
//                                       </Typography>
//                                       <Box sx={{ 
//                                         display: "flex", 
//                                         alignItems: "center", 
//                                         gap: 1,
//                                         justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//                                       }}>
//                                         <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e", fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                           +{formatAmount(addOn.addOnAmount)}
//                                         </Typography>
//                                         <Chip
//                                           label={addOn.status}
//                                           size="small"
//                                           sx={{
//                                             bgcolor: alpha(getStatusColor(addOn.status), 0.1),
//                                             color: getStatusColor(addOn.status),
//                                             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                                             height: { xs: 20, sm: 22 },
//                                           }}
//                                         />
//                                       </Box>
//                                     </Box>
//                                   ))}
//                                 </Box>
//                               </Collapse>
//                             </Box>
//                           )}
//                         </Paper>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </Stack>
//                 {totalItems > rowsPerPage && (
//                   <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= totalItems}
//                       size={isMobile ? "small" : "medium"}
//                       sx={{
//                         borderColor: "#0f766e",
//                         color: "#0f766e",
//                         fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                         "&:hover": {
//                           borderColor: "#0a5c55",
//                           bgcolor: alpha("#0f766e", 0.1),
//                         },
//                       }}
//                     >
//                       Load More
//                     </Button>
//                   </Box>
//                 )}
//               </Box>
//             )}
//           </Paper>
//         ) : (
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 3, sm: 4, md: 5 },
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               textAlign: "center",
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//             }}
//           >
//             <HistoryIcon sx={{ 
//               fontSize: { xs: 36, sm: 42, md: 48 }, 
//               color: alpha("#0f766e", 0.3), 
//               mb: 2 
//             }} />
//             <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
//               No transactions found
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//               Your transaction history will appear here after making payments
//             </Typography>
//           </Paper>
//         )}
//       </Container>

//       {/* Receipt Modal */}
//       {selectedTransaction && (
//         <ReceiptModal
//           transaction={selectedTransaction}
//           show={showReceipt}
//           onHide={() => setShowReceipt(false)}
//         />
//       )}

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

// export default TransactionHistory;






























////////////////////////////// Change Color Theam/////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Button,
//   Menu,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   LinearProgress,
//   alpha,
//   useTheme,
//   Avatar,
//   Stack,
//   Divider,
//   Tooltip,
//   Collapse,
//   Alert,
//   useMediaQuery,
//   Skeleton,
// } from "@mui/material";
// import {
//   History as HistoryIcon,
//   Refresh as RefreshIcon,
//   GridView as GridViewIcon,
//   TableRows as TableRowsIcon,
//   CheckCircle as CheckCircleIcon,
//   AccessTime as PendingIcon,
//   Cancel as CancelIcon,
//   ArrowUpward as IncomeIcon,
//   ArrowDownward as ExpenseIcon,
//   CalendarToday as CalendarIcon,
//   Receipt as ReceiptIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentHistory } from "../../redux/slices/paymentSlice";
// import ReceiptModal from "../../components/models/ReceiptModal";
// import { PaginationBottom } from "../../components/PaginationBottom";
// import { toast } from "react-toastify";

// // Stat Card Skeleton Component
// const StatCardSkeleton = () => {
//   return (
//     <Grid item xs={12} sm={6} md={3}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 1.5, sm: 1.8, md: 2 },
//           borderRadius: { xs: 2, sm: 2.5, md: 3 },
//           border: "1px solid",
//           borderColor: alpha("#2563EB", 0.1),
//           height: '100%',
//           minHeight: { xs: 90, sm: 95, md: 100 },
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <Box sx={{ flex: 1 }}>
//             <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//             <Skeleton variant="text" width={100} height={28} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//           </Box>
//           <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// // Table Row Skeleton
// const TableRowSkeleton = ({ isMobile }) => {
//   return (
//     <TableRow>
//       <TableCell>
//         <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//         <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//         <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={80} height={24} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell align="right">
//         <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//       </TableCell>
//     </TableRow>
//   );
// };

// // Card View Skeleton
// const CardViewSkeleton = () => {
//   return (
//     <Stack spacing={2}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#2563EB", 0.1),
//           }}
//         >
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between", 
//             alignItems: { xs: 'flex-start', sm: 'center' }, 
//             mb: 2,
//             gap: 1
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width={200} height={24} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//                 <Skeleton variant="text" width={150} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//               </Box>
//             </Box>
//             <Box sx={{ 
//               textAlign: "right",
//               width: { xs: '100%', sm: 'auto' },
//               mt: { xs: 1, sm: 0 }
//             }}>
//               <Skeleton variant="text" width={100} height={32} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//               <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//             </Box>
//           </Box>

//           <Divider sx={{ my: 2, borderColor: alpha("#2563EB", 0.1) }} />

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//               <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//               <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//     </Stack>
//   );
// };

// // Header Buttons Skeleton
// const HeaderButtonsSkeleton = ({ isMobile }) => {
//   return (
//     <Box sx={{ 
//       display: "flex", 
//       gap: 1, 
//       flexWrap: 'wrap',
//       width: { xs: '100%', sm: 'auto' },
//       justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//     }}>
//       <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//       <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//       <Skeleton variant="rounded" width={isMobile ? 90 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.1) }} />
//       <Skeleton variant="rounded" width={isMobile ? 90 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.1) }} />
//     </Box>
//   );
// };

// const TransactionHistory = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
//   const authUser = useSelector((state) => state.auth?.user || {});
//   const userData = useSelector((state) => state.user?.userInfo || {});

//   const {
//     paymentHistory = [],
//     historyLoading = false,
//     historyError = null,
//     currentPage = 1,
//     totalPages = 1,
//     totalItems = 0,
//     paymentStats = {
//       totalPayments: 0,
//       completedCount: 0,
//       pendingCount: 0,
//       totalAmount: 0,
//     },
//   } = useSelector((state) => state.payment || {});

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [expandedAddOns, setExpandedAddOns] = useState({});
//   const [viewMode, setViewMode] = useState("table");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [sortAnchorEl, setSortAnchorEl] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");

//   useEffect(() => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//       }
//     }

//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch, isAuthenticated, authUser, userData, page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const toggleAddOns = (transactionId) => {
//     setExpandedAddOns((prev) => ({
//       ...prev,
//       [transactionId]: !prev[transactionId],
//     }));
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === "card" ? "table" : "card");
//   };

//   const refreshData = () => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//         toast.success("Data refreshed successfully");
//       }
//     }
//   };

//   const handleFilterClick = (event) => {
//     setFilterAnchorEl(event.currentTarget);
//   };

//   const handleFilterClose = (value) => {
//     if (value) {
//       setFilter(value);
//     }
//     setFilterAnchorEl(null);
//   };

//   const handleSortClick = (event) => {
//     setSortAnchorEl(event.currentTarget);
//   };

//   const handleSortClose = (value) => {
//     if (value) {
//       setSortBy(value);
//     }
//     setSortAnchorEl(null);
//   };

//   const filteredTransactions = paymentHistory?.filter((transaction) => {
//     if (filter === "all") return true;
//     return transaction.status === filter;
//   });

//   const sortedTransactions = [...(filteredTransactions || [])].sort((a, b) => {
//     if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
//     if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
//     if (sortBy === "highest") return b.amount - a.amount;
//     if (sortBy === "lowest") return a.amount - b.amount;
//     return 0;
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "pending":
//         return <PendingIcon sx={{ color: "#f59e0b", fontSize: { xs: 14, sm: 16 } }} />;
//       default:
//         return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "#22c55e";
//       case "pending":
//         return "#f59e0b";
//       default:
//         return "#ef4444";
//     }
//   };

//   const statCards = [
//     {
//       label: "Total Transactions",
//       value: paymentStats.totalPayments || 0,
//       icon: <HistoryIcon />,
//       color: "#2563EB",
//     },
//     {
//       label: "Completed",
//       value: paymentStats.completedCount || 0,
//       icon: <CheckCircleIcon />,
//       color: "#22c55e",
//     },
//     {
//       label: "Pending",
//       value: paymentStats.pendingCount || 0,
//       icon: <PendingIcon />,
//       color: "#f59e0b",
//     },
//     {
//       label: "Total Amount",
//       value: formatAmount(paymentStats.totalAmount || 0),
//       icon: <IncomeIcon />,
//       color: "#2563EB",
//     },
//   ];

//   // If first render loader is active, show skeletons for everything except title and buttons
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
//         {/* Header with title and buttons only (no loading) */}
//         <Paper
//           elevation={0}
//           sx={{
//             py: { xs: 2, sm: 2.5, md: 3 },
//             px: { xs: 2, sm: 2.5, md: 3 },
//             borderBottom: "1px solid",
//             borderColor: alpha("#2563EB", 0.1),
//             borderRadius: 0,
//           }}
//         >
//           <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//             <Box sx={{ 
//               display: "flex", 
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between", 
//               alignItems: { xs: 'flex-start', sm: 'center' }, 
//               flexWrap: "wrap", 
//               gap: 2 
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha("#2563EB", 0.1),
//                     color: "#2563EB",
//                     width: { xs: 40, sm: 45, md: 50 },
//                     height: { xs: 40, sm: 45, md: 50 },
//                   }}
//                 >
//                   <HistoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                 </Avatar>
//                 <Box>
//                   <Typography 
//                     variant={isMobile ? "h5" : "h4"}
//                     fontWeight="800"
//                     gutterBottom
//                     sx={{
//                       background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                     }}
//                   >
//                     Transaction History
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                     View all your payment transactions
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Buttons Skeleton */}
//               <HeaderButtonsSkeleton isMobile={isMobile} />
//             </Box>
//           </Container>
//         </Paper>

//         {/* Stats Cards Skeleton */}
//         <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2.5, md: 3 } }}>
//           <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//           </Grid>
//         </Container>

//         {/* Transactions List Skeleton */}
//         <Container maxWidth="xl" sx={{ pb: 4, px: { xs: 1, sm: 2, md: 3 } }}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha("#2563EB", 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer>
//                   <Table sx={{ minWidth: isMobile ? 800 : isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Sr. No</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Plan</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Description</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Date</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Amount</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Status</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Payment</TableCell>
//                         <TableCell align="right" sx={{ color: '#2563EB', fontWeight: 600 }}>Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} isMobile={isMobile} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha("#2563EB", 0.1) }}>
//                   <Skeleton variant="rounded" width="100%" height={52} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//                 </Box>
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//                 <CardViewSkeleton />
//               </Box>
//             )}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
//       {/* Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           py: { xs: 2, sm: 2.5, md: 3 },
//           px: { xs: 2, sm: 2.5, md: 3 },
//           borderBottom: "1px solid",
//           borderColor: alpha("#2563EB", 0.1),
//           borderRadius: 0,
//         }}
//       >
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between", 
//             alignItems: { xs: 'flex-start', sm: 'center' }, 
//             flexWrap: "wrap", 
//             gap: 2 
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha("#2563EB", 0.1),
//                   color: "#2563EB",
//                   width: { xs: 40, sm: 45, md: 50 },
//                   height: { xs: 40, sm: 45, md: 50 },
//                 }}
//               >
//                 <HistoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//               </Avatar>
//               <Box>
//                 <Typography 
//                   variant={isMobile ? "h5" : "h4"}
//                   fontWeight="800"
//                   gutterBottom
//                   sx={{
//                     background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                   }}
//                 >
//                   Transaction History
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                   View all your payment transactions
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ 
//               display: "flex", 
//               gap: 1, 
//               flexWrap: 'wrap',
//               width: { xs: '100%', sm: 'auto' },
//               justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//             }}>
//               <Tooltip title="Refresh">
//                 <IconButton
//                   onClick={refreshData}
//                   disabled={historyLoading}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: "#2563EB",
//                     "&:hover": { bgcolor: alpha("#2563EB", 0.1) },
//                   }}
//                 >
//                   <RefreshIcon sx={{ 
//                     animation: historyLoading ? "spin 1s linear infinite" : "none",
//                     fontSize: { xs: 18, sm: 20, md: 24 }
//                   }} />
//                 </IconButton>
//               </Tooltip>

//               <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
//                 <IconButton
//                   onClick={toggleViewMode}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: "#2563EB",
//                     "&:hover": { bgcolor: alpha("#2563EB", 0.1) },
//                   }}
//                 >
//                   {viewMode === "table" ? 
//                     <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} /> : 
//                     <TableRowsIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
//                   }
//                 </IconButton>
//               </Tooltip>

//               <Button
//                 variant="outlined"
//                 onClick={handleFilterClick}
//                 startIcon={<PendingIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: "#e2e8f0",
//                   color: "#64748b",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: "#2563EB",
//                     color: "#2563EB",
//                   },
//                 }}
//               >
//                 Filter: {filter}
//               </Button>

//               <Menu
//                 anchorEl={filterAnchorEl}
//                 open={Boolean(filterAnchorEl)}
//                 onClose={() => handleFilterClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleFilterClose("all")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>All</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("completed")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Completed</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("pending")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Pending</MenuItem>
//               </Menu>

//               <Button
//                 variant="outlined"
//                 onClick={handleSortClick}
//                 startIcon={<CalendarIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: "#e2e8f0",
//                   color: "#64748b",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: "#2563EB",
//                     color: "#2563EB",
//                   },
//                 }}
//               >
//                 Sort: {sortBy === "newest" ? "Newest" : 
//                        sortBy === "oldest" ? "Oldest" : 
//                        sortBy === "highest" ? "Highest" : "Lowest"}
//               </Button>

//               <Menu
//                 anchorEl={sortAnchorEl}
//                 open={Boolean(sortAnchorEl)}
//                 onClose={() => handleSortClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleSortClose("newest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Newest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("oldest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Oldest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("highest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Highest Amount</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("lowest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Lowest Amount</MenuItem>
//               </Menu>
//             </Box>
//           </Box>
//         </Container>
//       </Paper>

//       {/* Stats Cards */}
//       <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2.5, md: 3 } }}>
//         <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
//           {statCards.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: { xs: 1.5, sm: 1.8, md: 2 },
//                     borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                     border: "1px solid",
//                     borderColor: alpha(stat.color, 0.2),
//                     position: "relative",
//                     overflow: "hidden",
//                     height: '100%',
//                     minHeight: { xs: 90, sm: 95, md: 100 },
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                         {stat.label}
//                       </Typography>
//                       <Typography 
//                         variant="h5" 
//                         fontWeight={700} 
//                         sx={{ 
//                           color: stat.color, 
//                           mt: 1,
//                           fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
//                           wordBreak: 'break-word',
//                         }}
//                       >
//                         {stat.value}
//                       </Typography>
//                     </Box>
//                     <Avatar
//                       sx={{
//                         bgcolor: alpha(stat.color, 0.1),
//                         color: stat.color,
//                         width: { xs: 36, sm: 42, md: 48 },
//                         height: { xs: 36, sm: 42, md: 48 },
//                         '& svg': {
//                           fontSize: { xs: 18, sm: 20, md: 22 }
//                         }
//                       }}
//                     >
//                       {stat.icon}
//                     </Avatar>
//                   </Box>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Transactions List */}
//       <Container maxWidth="xl" sx={{ pb: 4, px: { xs: 1, sm: 2, md: 3 } }}>
//         {historyLoading ? (
//           <Box sx={{ width: "100%", mt: 4 }}>
//             <LinearProgress sx={{ bgcolor: alpha("#2563EB", 0.1), "& .MuiLinearProgress-bar": { bgcolor: "#2563EB" } }} />
//             <Typography textAlign="center" sx={{ mt: 2 }} color="text.secondary" fontSize={{ xs: '0.8rem', sm: '0.9rem', md: '1rem' }}>
//               Loading transactions...
//             </Typography>
//           </Box>
//         ) : sortedTransactions.length > 0 ? (
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha("#2563EB", 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer sx={{ 
//                   overflowX: 'auto',
//                   '&::-webkit-scrollbar': {
//                     height: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: alpha('#2563EB', 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isMobile ? 800 : isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Sr. No
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Plan
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Description
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Date
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Amount
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Status
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Payment
//                         </TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>
//                           Actions
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <AnimatePresence>
//                         {sortedTransactions.map((transaction, index) => (
//                           <motion.tr
//                             key={transaction._id || index}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha('#2563EB', 0.02)}
//                             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//                           >
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {page * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               {transaction.planId ? (
//                                 <Box>
//                                   <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: '#1e293b' }}>
//                                     {transaction.planId.name}
//                                   </Typography>
//                                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                     {transaction.planId.duration}
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: '#1e293b' }}>
//                                 {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Box>
//                                 <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: '#1e293b' }}>
//                                   {formatDate(transaction.createdAt)}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                   {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Typography
//                                 variant="body2"
//                                 fontWeight={600}
//                                 sx={{ 
//                                   color: transaction.amount > 0 ? "#2563EB" : "#ef4444",
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
//                                 }}
//                               >
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' },
//                                   height: { xs: 20, sm: 22, md: 24 },
//                                   '& .MuiChip-icon': {
//                                     fontSize: { xs: 10, sm: 12, md: 14 }
//                                   }
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: '#1e293b' }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </TableCell>
//                             <TableCell align="right">
//                               <Tooltip title="View Receipt">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => {
//                                     setSelectedTransaction(transaction);
//                                     setShowReceipt(true);
//                                   }}
//                                   sx={{ 
//                                     color: "#2563EB",
//                                     width: { xs: 28, sm: 30, md: 32 },
//                                     height: { xs: 28, sm: 30, md: 32 },
//                                   }}
//                                 >
//                                   <ReceiptIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
//                                 </IconButton>
//                               </Tooltip>
//                             </TableCell>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   component="div"
//                   count={totalItems}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   rowsPerPage={rowsPerPage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   rowsPerPageOptions={[5, 10, 25, 50]}
//                   sx={{
//                     borderTop: "1px solid",
//                     borderColor: alpha("#2563EB", 0.1),
//                     '.MuiTablePagination-select': {
//                       borderRadius: 2,
//                     },
//                     '.MuiTablePagination-displayedRows': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-selectLabel': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-actions': {
//                       button: {
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                       }
//                     }
//                   }}
//                 />
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//                 <Stack spacing={2}>
//                   <AnimatePresence>
//                     {sortedTransactions.map((transaction, index) => (
//                       <motion.div
//                         key={transaction._id || index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                       >
//                         <Paper
//                           elevation={0}
//                           sx={{
//                             p: { xs: 2, sm: 2.5, md: 3 },
//                             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                             border: "1px solid",
//                             borderColor: alpha("#2563EB", 0.1),
//                             cursor: "pointer",
//                             transition: "all 0.2s ease",
//                             "&:hover": {
//                               borderColor: "#2563EB",
//                               boxShadow: `0 8px 20px -8px ${alpha("#2563EB", 0.3)}`,
//                             },
//                           }}
//                           onClick={() => {
//                             setSelectedTransaction(transaction);
//                             setShowReceipt(true);
//                           }}
//                         >
//                           <Box sx={{ 
//                             display: "flex", 
//                             flexDirection: { xs: 'column', sm: 'row' },
//                             justifyContent: "space-between", 
//                             alignItems: { xs: 'flex-start', sm: 'center' }, 
//                             mb: 2,
//                             gap: 1
//                           }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//                               <Avatar
//                                 sx={{
//                                   bgcolor: transaction.amount > 0 ? alpha("#2563EB", 0.1) : alpha("#ef4444", 0.1),
//                                   color: transaction.amount > 0 ? "#2563EB" : "#ef4444",
//                                   width: { xs: 40, sm: 45, md: 48 },
//                                   height: { xs: 40, sm: 45, md: 48 },
//                                 }}
//                               >
//                                 {transaction.amount > 0 ? 
//                                   <IncomeIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} /> : 
//                                   <ExpenseIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                                 }
//                               </Avatar>
//                               <Box sx={{ flex: 1 }}>
//                                 <Typography 
//                                   variant="subtitle1" 
//                                   fontWeight={600} 
//                                   sx={{ 
//                                     fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//                                     wordBreak: 'break-word',
//                                     color: '#1e293b',
//                                   }}
//                                 >
//                                   {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//                                   <CalendarIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle', color: '#2563EB' }} />
//                                   {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <Box sx={{ 
//                               textAlign: "right",
//                               width: { xs: '100%', sm: 'auto' },
//                               mt: { xs: 1, sm: 0 }
//                             }}>
//                               <Typography variant="h6" fontWeight={700} sx={{ 
//                                 color: "#2563EB",
//                                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
//                               }}>
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   mt: 0.5,
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                                   height: { xs: 22, sm: 24 },
//                                 }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 2, borderColor: alpha("#2563EB", 0.1) }} />

//                           <Grid container spacing={2}>
//                             {transaction.planId && (
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                   Plan
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: '#1e293b' }}>
//                                   {transaction.planId.name} ({transaction.planId.duration})
//                                 </Typography>
//                               </Grid>
//                             )}
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 Payment Method
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: '#1e293b' }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </Grid>
//                           </Grid>

//                           {transaction.addOns && transaction.addOns.length > 0 && (
//                             <Box sx={{ mt: 2 }}>
//                               <Button
//                                 size="small"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   toggleAddOns(transaction._id);
//                                 }}
//                                 endIcon={expandedAddOns[transaction._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                                 sx={{ 
//                                   color: "#2563EB",
//                                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//                                 }}
//                               >
//                                 {transaction.addOns.length} Add-on(s)
//                               </Button>
//                               <Collapse in={expandedAddOns[transaction._id]}>
//                                 <Box sx={{ mt: 2, p: 2, bgcolor: alpha("#2563EB", 0.02), borderRadius: 2, border: '1px solid', borderColor: alpha("#2563EB", 0.1) }}>
//                                   {transaction.addOns.map((addOn, idx) => (
//                                     <Box key={idx} sx={{ 
//                                       display: "flex", 
//                                       flexDirection: { xs: 'column', sm: 'row' },
//                                       justifyContent: "space-between", 
//                                       mb: 1,
//                                       gap: { xs: 0.5, sm: 0 }
//                                     }}>
//                                       <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: '#1e293b' }}>
//                                         Upgrade to {addOn.addOnMaxUser} users
//                                       </Typography>
//                                       <Box sx={{ 
//                                         display: "flex", 
//                                         alignItems: "center", 
//                                         gap: 1,
//                                         justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//                                       }}>
//                                         <Typography variant="body2" fontWeight={600} sx={{ color: "#2563EB", fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                           +{formatAmount(addOn.addOnAmount)}
//                                         </Typography>
//                                         <Chip
//                                           label={addOn.status}
//                                           size="small"
//                                           sx={{
//                                             bgcolor: alpha(getStatusColor(addOn.status), 0.1),
//                                             color: getStatusColor(addOn.status),
//                                             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                                             height: { xs: 20, sm: 22 },
//                                           }}
//                                         />
//                                       </Box>
//                                     </Box>
//                                   ))}
//                                 </Box>
//                               </Collapse>
//                             </Box>
//                           )}
//                         </Paper>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </Stack>
//                 {totalItems > rowsPerPage && (
//                   <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= totalItems}
//                       size={isMobile ? "small" : "medium"}
//                       sx={{
//                         borderColor: "#2563EB",
//                         color: "#2563EB",
//                         fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                         "&:hover": {
//                           borderColor: "#1E40AF",
//                           bgcolor: alpha("#2563EB", 0.1),
//                         },
//                       }}
//                     >
//                       Load More
//                     </Button>
//                   </Box>
//                 )}
//               </Box>
//             )}
//           </Paper>
//         ) : (
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 3, sm: 4, md: 5 },
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               textAlign: "center",
//               border: "1px solid",
//               borderColor: alpha("#2563EB", 0.1),
//             }}
//           >
//             <HistoryIcon sx={{ 
//               fontSize: { xs: 36, sm: 42, md: 48 }, 
//               color: alpha("#2563EB", 0.3), 
//               mb: 2 
//             }} />
//             <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
//               No transactions found
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//               Your transaction history will appear here after making payments
//             </Typography>
//           </Paper>
//         )}
//       </Container>

//       {/* Receipt Modal */}
//       {selectedTransaction && (
//         <ReceiptModal
//           transaction={selectedTransaction}
//           show={showReceipt}
//           onHide={() => setShowReceipt(false)}
//         />
//       )}

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

// export default TransactionHistory;





















//////////////////////////////    Centralised Color     ///////////////////////////////
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   IconButton,
//   Button,
//   Menu,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   LinearProgress,
//   alpha,
//   useTheme,
//   Avatar,
//   Stack,
//   Divider,
//   Tooltip,
//   Collapse,
//   Alert,
//   useMediaQuery,
//   Skeleton,
// } from "@mui/material";
// import {
//   History as HistoryIcon,
//   Refresh as RefreshIcon,
//   GridView as GridViewIcon,
//   TableRows as TableRowsIcon,
//   CheckCircle as CheckCircleIcon,
//   AccessTime as PendingIcon,
//   Cancel as CancelIcon,
//   ArrowUpward as IncomeIcon,
//   ArrowDownward as ExpenseIcon,
//   CalendarToday as CalendarIcon,
//   Receipt as ReceiptIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   Download as DownloadIcon,
//   Print as PrintIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentHistory } from "../../redux/slices/paymentSlice";
// import ReceiptModal from "../../components/models/ReceiptModal";
// import { PaginationBottom } from "../../components/PaginationBottom";
// import { toast } from "react-toastify";

// // Stat Card Skeleton Component
// const StatCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Grid item xs={12} sm={6} md={3}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 1.5, sm: 1.8, md: 2 },
//           borderRadius: { xs: 2, sm: 2.5, md: 3 },
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           height: '100%',
//           minHeight: { xs: 90, sm: 95, md: 100 },
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <Box sx={{ flex: 1 }}>
//             <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="text" width={100} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>
//           <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// // Table Row Skeleton
// const TableRowSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <TableRow>
//       <TableCell>
//         <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={80} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell align="right">
//         <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </TableCell>
//     </TableRow>
//   );
// };

// // Card View Skeleton
// const CardViewSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Stack spacing={2}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between", 
//             alignItems: { xs: 'flex-start', sm: 'center' }, 
//             mb: 2,
//             gap: 1
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width={200} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={150} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>
//             <Box sx={{ 
//               textAlign: "right",
//               width: { xs: '100%', sm: 'auto' },
//               mt: { xs: 1, sm: 0 }
//             }}>
//               <Skeleton variant="text" width={100} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>
//           </Box>

//           <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//     </Stack>
//   );
// };

// // Header Buttons Skeleton
// const HeaderButtonsSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ 
//       display: "flex", 
//       gap: 1, 
//       flexWrap: 'wrap',
//       width: { xs: '100%', sm: 'auto' },
//       justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//     }}>
//       <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       <Skeleton variant="rounded" width={isMobile ? 90 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Skeleton variant="rounded" width={isMobile ? 90 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//     </Box>
//   );
// };

// const TransactionHistory = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
//   const authUser = useSelector((state) => state.auth?.user || {});
//   const userData = useSelector((state) => state.user?.userInfo || {});

//   const {
//     paymentHistory = [],
//     historyLoading = false,
//     historyError = null,
//     currentPage = 1,
//     totalPages = 1,
//     totalItems = 0,
//     paymentStats = {
//       totalPayments: 0,
//       completedCount: 0,
//       pendingCount: 0,
//       totalAmount: 0,
//     },
//   } = useSelector((state) => state.payment || {});

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [expandedAddOns, setExpandedAddOns] = useState({});
//   const [viewMode, setViewMode] = useState("table");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//   const [sortAnchorEl, setSortAnchorEl] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");

//   useEffect(() => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//       }
//     }

//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch, isAuthenticated, authUser, userData, page, rowsPerPage]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const toggleAddOns = (transactionId) => {
//     setExpandedAddOns((prev) => ({
//       ...prev,
//       [transactionId]: !prev[transactionId],
//     }));
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === "card" ? "table" : "card");
//   };

//   const refreshData = () => {
//     if (isAuthenticated) {
//       const adminId = authUser._id || authUser.id || userData?._id;
//       if (adminId) {
//         dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
//         toast.success("Data refreshed successfully");
//       }
//     }
//   };

//   const handleFilterClick = (event) => {
//     setFilterAnchorEl(event.currentTarget);
//   };

//   const handleFilterClose = (value) => {
//     if (value) {
//       setFilter(value);
//     }
//     setFilterAnchorEl(null);
//   };

//   const handleSortClick = (event) => {
//     setSortAnchorEl(event.currentTarget);
//   };

//   const handleSortClose = (value) => {
//     if (value) {
//       setSortBy(value);
//     }
//     setSortAnchorEl(null);
//   };

//   const filteredTransactions = paymentHistory?.filter((transaction) => {
//     if (filter === "all") return true;
//     return transaction.status === filter;
//   });

//   const sortedTransactions = [...(filteredTransactions || [])].sort((a, b) => {
//     if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
//     if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
//     if (sortBy === "highest") return b.amount - a.amount;
//     if (sortBy === "lowest") return a.amount - b.amount;
//     return 0;
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "pending":
//         return <PendingIcon sx={{ color: theme.palette.secondary.main, fontSize: { xs: 14, sm: 16 } }} />;
//       default:
//         return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "#22c55e";
//       case "pending":
//         return theme.palette.secondary.main;
//       default:
//         return "#ef4444";
//     }
//   };

//   const statCards = [
//     {
//       label: "Total Transactions",
//       value: paymentStats.totalPayments || 0,
//       icon: <HistoryIcon />,
//       color: theme.palette.primary.main,
//     },
//     {
//       label: "Completed",
//       value: paymentStats.completedCount || 0,
//       icon: <CheckCircleIcon />,
//       color: "#22c55e",
//     },
//     {
//       label: "Pending",
//       value: paymentStats.pendingCount || 0,
//       icon: <PendingIcon />,
//       color: theme.palette.secondary.main,
//     },
//     {
//       label: "Total Amount",
//       value: formatAmount(paymentStats.totalAmount || 0),
//       icon: <IncomeIcon />,
//       color: theme.palette.primary.main,
//     },
//   ];

//   // If first render loader is active, show skeletons for everything except title and buttons
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//         {/* Header with title and buttons only (no loading) */}
//         <Paper
//           elevation={0}
//           sx={{
//             py: { xs: 2, sm: 2.5, md: 3 },
//             px: { xs: 2, sm: 2.5, md: 3 },
//             borderBottom: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             borderRadius: 0,
//           }}
//         >
//           <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//             <Box sx={{ 
//               display: "flex", 
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between", 
//               alignItems: { xs: 'flex-start', sm: 'center' }, 
//               flexWrap: "wrap", 
//               gap: 2 
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     width: { xs: 40, sm: 45, md: 50 },
//                     height: { xs: 40, sm: 45, md: 50 },
//                   }}
//                 >
//                   <HistoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                 </Avatar>
//                 <Box>
//                   <Typography 
//                     variant={isMobile ? "h5" : "h4"}
//                     fontWeight="800"
//                     gutterBottom
//                     sx={{
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                     }}
//                   >
//                     Transaction History
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                     View all your payment transactions
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Buttons Skeleton */}
//               <HeaderButtonsSkeleton isMobile={isMobile} />
//             </Box>
//           </Container>
//         </Paper>

//         {/* Stats Cards Skeleton */}
//         <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2.5, md: 3 } }}>
//           <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//           </Grid>
//         </Container>

//         {/* Transactions List Skeleton */}
//         <Container maxWidth="xl" sx={{ pb: 4, px: { xs: 1, sm: 2, md: 3 } }}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer>
//                   <Table sx={{ minWidth: isMobile ? 800 : isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Sr. No</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Plan</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Description</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Date</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Amount</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Status</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Payment</TableCell>
//                         <TableCell align="right" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} isMobile={isMobile} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                   <Skeleton variant="rounded" width="100%" height={52} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//                 <CardViewSkeleton />
//               </Box>
//             )}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//       {/* Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           py: { xs: 2, sm: 2.5, md: 3 },
//           px: { xs: 2, sm: 2.5, md: 3 },
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           borderRadius: 0,
//         }}
//       >
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           <Box sx={{ 
//             display: "flex", 
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between", 
//             alignItems: { xs: 'flex-start', sm: 'center' }, 
//             flexWrap: "wrap", 
//             gap: 2 
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   width: { xs: 40, sm: 45, md: 50 },
//                   height: { xs: 40, sm: 45, md: 50 },
//                 }}
//               >
//                 <HistoryIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//               </Avatar>
//               <Box>
//                 <Typography 
//                   variant={isMobile ? "h5" : "h4"}
//                   fontWeight="800"
//                   gutterBottom
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                   }}
//                 >
//                   Transaction History
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                   View all your payment transactions
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ 
//               display: "flex", 
//               gap: 1, 
//               flexWrap: 'wrap',
//               width: { xs: '100%', sm: 'auto' },
//               justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//             }}>
//               <Tooltip title="Refresh">
//                 <IconButton
//                   onClick={refreshData}
//                   disabled={historyLoading}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                   }}
//                 >
//                   <RefreshIcon sx={{ 
//                     animation: historyLoading ? "spin 1s linear infinite" : "none",
//                     fontSize: { xs: 18, sm: 20, md: 24 }
//                   }} />
//                 </IconButton>
//               </Tooltip>

//               <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
//                 <IconButton
//                   onClick={toggleViewMode}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                   }}
//                 >
//                   {viewMode === "table" ? 
//                     <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} /> : 
//                     <TableRowsIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
//                   }
//                 </IconButton>
//               </Tooltip>

//               <Button
//                 variant="outlined"
//                 onClick={handleFilterClick}
//                 startIcon={<PendingIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   color: "text.secondary",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 Filter: {filter}
//               </Button>

//               <Menu
//                 anchorEl={filterAnchorEl}
//                 open={Boolean(filterAnchorEl)}
//                 onClose={() => handleFilterClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleFilterClose("all")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>All</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("completed")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Completed</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("pending")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Pending</MenuItem>
//               </Menu>

//               <Button
//                 variant="outlined"
//                 onClick={handleSortClick}
//                 startIcon={<CalendarIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   color: "text.secondary",
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 Sort: {sortBy === "newest" ? "Newest" : 
//                        sortBy === "oldest" ? "Oldest" : 
//                        sortBy === "highest" ? "Highest" : "Lowest"}
//               </Button>

//               <Menu
//                 anchorEl={sortAnchorEl}
//                 open={Boolean(sortAnchorEl)}
//                 onClose={() => handleSortClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 2, mt: 1, minWidth: { xs: 120, sm: 150 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleSortClose("newest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Newest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("oldest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Oldest First</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("highest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Highest Amount</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("lowest")} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Lowest Amount</MenuItem>
//               </Menu>
//             </Box>
//           </Box>
//         </Container>
//       </Paper>

//       {/* Stats Cards */}
//       <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 2.5, md: 3 } }}>
//         <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
//           {statCards.map((stat, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: { xs: 1.5, sm: 1.8, md: 2 },
//                     borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                     border: "1px solid",
//                     borderColor: alpha(stat.color, 0.2),
//                     position: "relative",
//                     overflow: "hidden",
//                     height: '100%',
//                     minHeight: { xs: 90, sm: 95, md: 100 },
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                         {stat.label}
//                       </Typography>
//                       <Typography 
//                         variant="h5" 
//                         fontWeight={700} 
//                         sx={{ 
//                           color: stat.color, 
//                           mt: 1,
//                           fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
//                           wordBreak: 'break-word',
//                         }}
//                       >
//                         {stat.value}
//                       </Typography>
//                     </Box>
//                     <Avatar
//                       sx={{
//                         bgcolor: alpha(stat.color, 0.1),
//                         color: stat.color,
//                         width: { xs: 36, sm: 42, md: 48 },
//                         height: { xs: 36, sm: 42, md: 48 },
//                         '& svg': {
//                           fontSize: { xs: 18, sm: 20, md: 22 }
//                         }
//                       }}
//                     >
//                       {stat.icon}
//                     </Avatar>
//                   </Box>
//                 </Paper>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>

//       {/* Transactions List */}
//       <Container maxWidth="xl" sx={{ pb: 4, px: { xs: 1, sm: 2, md: 3 } }}>
//         {historyLoading ? (
//           <Box sx={{ width: "100%", mt: 4 }}>
//             <LinearProgress sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main } }} />
//             <Typography textAlign="center" sx={{ mt: 2 }} color="text.secondary" fontSize={{ xs: '0.8rem', sm: '0.9rem', md: '1rem' }}>
//               Loading transactions...
//             </Typography>
//           </Box>
//         ) : sortedTransactions.length > 0 ? (
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer sx={{ 
//                   overflowX: 'auto',
//                   '&::-webkit-scrollbar': {
//                     height: '6px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: alpha(theme.palette.primary.main, 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isMobile ? 800 : isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Sr. No
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Plan
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Description
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Date
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Amount
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Status
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Payment
//                         </TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                           Actions
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <AnimatePresence>
//                         {sortedTransactions.map((transaction, index) => (
//                           <motion.tr
//                             key={transaction._id || index}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2 }}
//                             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.02)}
//                             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//                           >
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {page * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               {transaction.planId ? (
//                                 <Box>
//                                   <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
//                                     {transaction.planId.name}
//                                   </Typography>
//                                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                     {transaction.planId.duration}
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
//                                 {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Box>
//                                 <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
//                                   {formatDate(transaction.createdAt)}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                   {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell>
//                               <Typography
//                                 variant="body2"
//                                 fontWeight={600}
//                                 sx={{ 
//                                   color: transaction.amount > 0 ? theme.palette.primary.main : "#ef4444",
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
//                                 }}
//                               >
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' },
//                                   height: { xs: 20, sm: 22, md: 24 },
//                                   '& .MuiChip-icon': {
//                                     fontSize: { xs: 10, sm: 12, md: 14 }
//                                   }
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </TableCell>
//                             <TableCell align="right">
//                               <Tooltip title="View Receipt">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => {
//                                     setSelectedTransaction(transaction);
//                                     setShowReceipt(true);
//                                   }}
//                                   sx={{ 
//                                     color: theme.palette.primary.main,
//                                     width: { xs: 28, sm: 30, md: 32 },
//                                     height: { xs: 28, sm: 30, md: 32 },
//                                   }}
//                                 >
//                                   <ReceiptIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
//                                 </IconButton>
//                               </Tooltip>
//                             </TableCell>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   component="div"
//                   count={totalItems}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   rowsPerPage={rowsPerPage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                   rowsPerPageOptions={[5, 10, 25, 50]}
//                   sx={{
//                     borderTop: "1px solid",
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     '.MuiTablePagination-select': {
//                       borderRadius: 2,
//                     },
//                     '.MuiTablePagination-displayedRows': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-selectLabel': {
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     },
//                     '.MuiTablePagination-actions': {
//                       button: {
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                       }
//                     }
//                   }}
//                 />
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//                 <Stack spacing={2}>
//                   <AnimatePresence>
//                     {sortedTransactions.map((transaction, index) => (
//                       <motion.div
//                         key={transaction._id || index}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.3, delay: index * 0.05 }}
//                       >
//                         <Paper
//                           elevation={0}
//                           sx={{
//                             p: { xs: 2, sm: 2.5, md: 3 },
//                             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                             border: "1px solid",
//                             borderColor: alpha(theme.palette.primary.main, 0.1),
//                             cursor: "pointer",
//                             transition: "all 0.2s ease",
//                             "&:hover": {
//                               borderColor: theme.palette.primary.main,
//                               boxShadow: `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.3)}`,
//                             },
//                           }}
//                           onClick={() => {
//                             setSelectedTransaction(transaction);
//                             setShowReceipt(true);
//                           }}
//                         >
//                           <Box sx={{ 
//                             display: "flex", 
//                             flexDirection: { xs: 'column', sm: 'row' },
//                             justifyContent: "space-between", 
//                             alignItems: { xs: 'flex-start', sm: 'center' }, 
//                             mb: 2,
//                             gap: 1
//                           }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//                               <Avatar
//                                 sx={{
//                                   bgcolor: transaction.amount > 0 ? alpha(theme.palette.primary.main, 0.1) : alpha("#ef4444", 0.1),
//                                   color: transaction.amount > 0 ? theme.palette.primary.main : "#ef4444",
//                                   width: { xs: 40, sm: 45, md: 48 },
//                                   height: { xs: 40, sm: 45, md: 48 },
//                                 }}
//                               >
//                                 {transaction.amount > 0 ? 
//                                   <IncomeIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} /> : 
//                                   <ExpenseIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//                                 }
//                               </Avatar>
//                               <Box sx={{ flex: 1 }}>
//                                 <Typography 
//                                   variant="subtitle1" 
//                                   fontWeight={600} 
//                                   sx={{ 
//                                     fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//                                     wordBreak: 'break-word',
//                                     color: 'text.primary',
//                                   }}
//                                 >
//                                   {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//                                   <CalendarIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: 'middle', color: theme.palette.primary.main }} />
//                                   {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <Box sx={{ 
//                               textAlign: "right",
//                               width: { xs: '100%', sm: 'auto' },
//                               mt: { xs: 1, sm: 0 }
//                             }}>
//                               <Typography variant="h6" fontWeight={700} sx={{ 
//                                 color: theme.palette.primary.main,
//                                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
//                               }}>
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   mt: 0.5,
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                                   height: { xs: 22, sm: 24 },
//                                 }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                           <Grid container spacing={2}>
//                             {transaction.planId && (
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                   Plan
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
//                                   {transaction.planId.name} ({transaction.planId.duration})
//                                 </Typography>
//                               </Grid>
//                             )}
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                 Payment Method
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </Grid>
//                           </Grid>

//                           {transaction.addOns && transaction.addOns.length > 0 && (
//                             <Box sx={{ mt: 2 }}>
//                               <Button
//                                 size="small"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   toggleAddOns(transaction._id);
//                                 }}
//                                 endIcon={expandedAddOns[transaction._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                                 sx={{ 
//                                   color: theme.palette.primary.main,
//                                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//                                 }}
//                               >
//                                 {transaction.addOns.length} Add-on(s)
//                               </Button>
//                               <Collapse in={expandedAddOns[transaction._id]}>
//                                 <Box sx={{ mt: 2, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.02), borderRadius: 2, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                                   {transaction.addOns.map((addOn, idx) => (
//                                     <Box key={idx} sx={{ 
//                                       display: "flex", 
//                                       flexDirection: { xs: 'column', sm: 'row' },
//                                       justifyContent: "space-between", 
//                                       mb: 1,
//                                       gap: { xs: 0.5, sm: 0 }
//                                     }}>
//                                       <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
//                                         Upgrade to {addOn.addOnMaxUser} users
//                                       </Typography>
//                                       <Box sx={{ 
//                                         display: "flex", 
//                                         alignItems: "center", 
//                                         gap: 1,
//                                         justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//                                       }}>
//                                         <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                                           +{formatAmount(addOn.addOnAmount)}
//                                         </Typography>
//                                         <Chip
//                                           label={addOn.status}
//                                           size="small"
//                                           sx={{
//                                             bgcolor: alpha(getStatusColor(addOn.status), 0.1),
//                                             color: getStatusColor(addOn.status),
//                                             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                                             height: { xs: 20, sm: 22 },
//                                           }}
//                                         />
//                                       </Box>
//                                     </Box>
//                                   ))}
//                                 </Box>
//                               </Collapse>
//                             </Box>
//                           )}
//                         </Paper>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </Stack>
//                 {totalItems > rowsPerPage && (
//                   <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= totalItems}
//                       size={isMobile ? "small" : "medium"}
//                       sx={{
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                         "&:hover": {
//                           borderColor: theme.palette.primary.dark,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                       }}
//                     >
//                       Load More
//                     </Button>
//                   </Box>
//                 )}
//               </Box>
//             )}
//           </Paper>
//         ) : (
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 3, sm: 4, md: 5 },
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               textAlign: "center",
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}
//           >
//             <HistoryIcon sx={{ 
//               fontSize: { xs: 36, sm: 42, md: 48 }, 
//               color: alpha(theme.palette.primary.main, 0.3), 
//               mb: 2 
//             }} />
//             <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
//               No transactions found
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//               Your transaction history will appear here after making payments
//             </Typography>
//           </Paper>
//         )}
//       </Container>

//       {/* Receipt Modal */}
//       {selectedTransaction && (
//         <ReceiptModal
//           transaction={selectedTransaction}
//           show={showReceipt}
//           onHide={() => setShowReceipt(false)}
//         />
//       )}

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

// export default TransactionHistory;


















import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  alpha,
  useTheme,
  Avatar,
  Stack,
  Divider,
  Tooltip,
  Collapse,
  Alert,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import {
  History as HistoryIcon,
  Refresh as RefreshIcon,
  GridView as GridViewIcon,
  TableRows as TableRowsIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as PendingIcon,
  Cancel as CancelIcon,
  ArrowUpward as IncomeIcon,
  ArrowDownward as ExpenseIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import ReceiptModal from "../../components/models/ReceiptModal";
import { PaginationBottom } from "../../components/PaginationBottom";
import { toast } from "react-toastify";

// Stat Card Skeleton - Smaller
const StatCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={3}>
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
            <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="text" width={90} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          </Box>
          <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </Box>
      </Paper>
    </Grid>
  );
};

// Table Row Skeleton - Smaller
const TableRowSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <TableRow>
      <TableCell sx={{ py: 1 }}>
        <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 1 }}>
        <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 1 }}>
        <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 1 }}>
        <Skeleton variant="text" width={70} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 1 }}>
        <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 1 }}>
        <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 1 }}>
        <Skeleton variant="text" width={55} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell align="right" sx={{ py: 1 }}>
        <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </TableCell>
    </TableRow>
  );
};

// Card View Skeleton - Smaller
const CardViewSkeleton = () => {
  const theme = useTheme();
  return (
    <Stack spacing={1.5}>
      {[1, 2, 3].map((item) => (
        <Paper
          key={item}
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2, md: 2.5 },
            borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 1.5,
            gap: 1
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 1.5 } }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width={180} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={130} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </Box>
            <Box sx={{
              textAlign: "right",
              width: { xs: '100%', sm: 'auto' },
              mt: { xs: 0.5, sm: 0 }
            }}>
              <Skeleton variant="text" width={90} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>
          </Box>

          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Stack>
  );
};

// Header Buttons Skeleton - Smaller
const HeaderButtonsSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex",
      gap: 0.8,
      flexWrap: 'wrap',
      width: { xs: '100%', sm: 'auto' },
      justifyContent: { xs: 'flex-start', sm: 'flex-end' }
    }}>
      <Skeleton variant="circular" width={isMobile ? 32 : 36} height={isMobile ? 32 : 36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      <Skeleton variant="circular" width={isMobile ? 32 : 36} height={isMobile ? 32 : 36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      <Skeleton variant="rounded" width={isMobile ? 85 : 100} height={isMobile ? 32 : 36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      <Skeleton variant="rounded" width={isMobile ? 85 : 100} height={isMobile ? 32 : 36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
    </Box>
  );
};

const TransactionHistory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});
  const userData = useSelector((state) => state.user?.userInfo || {});

  const {
    paymentHistory = [],
    historyLoading = false,
    historyError = null,
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    paymentStats = {
      totalPayments: 0,
      completedCount: 0,
      pendingCount: 0,
      totalAmount: 0,
    },
  } = useSelector((state) => state.payment || {});

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [expandedAddOns, setExpandedAddOns] = useState({});
  const [viewMode, setViewMode] = useState("table");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (isAuthenticated) {
      const isSubAdmin = Number(authUser?.role_id) === 3;
      const effectiveAdminId = isSubAdmin ? (typeof authUser?.adminId === 'object' ? authUser?.adminId?._id || authUser?.adminId?.id : authUser?.adminId) : (authUser._id || authUser.id || userData?._id);

      if (effectiveAdminId) {
        dispatch(getPaymentHistory({ adminId: effectiveAdminId, page: page + 1, limit: rowsPerPage }));
      }
    }

    // Set first render loader to false after 1 second
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, isAuthenticated, authUser, userData, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleAddOns = (transactionId) => {
    setExpandedAddOns((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  const refreshData = () => {
    if (isAuthenticated) {
      const adminId = authUser._id || authUser.id || userData?._id;
      if (adminId) {
        dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
        toast.success("Data refreshed successfully");
      }
    }
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (value) => {
    if (value) {
      setFilter(value);
    }
    setFilterAnchorEl(null);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (value) => {
    if (value) {
      setSortBy(value);
    }
    setSortAnchorEl(null);
  };

  const filteredTransactions = paymentHistory?.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.status === filter;
  });

  const sortedTransactions = [...(filteredTransactions || [])].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "highest") return b.amount - a.amount;
    if (sortBy === "lowest") return a.amount - b.amount;
    return 0;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 12, sm: 14 } }} />;
      case "pending":
        return <PendingIcon sx={{ color: theme.palette.secondary.main, fontSize: { xs: 12, sm: 14 } }} />;
      default:
        return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 12, sm: 14 } }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#22c55e";
      case "pending":
        return theme.palette.secondary.main;
      default:
        return "#ef4444";
    }
  };

  const statCards = [
    {
      label: "Total Transactions",
      value: paymentStats.totalPayments || 0,
      icon: <HistoryIcon />,
      color: theme.palette.primary.main,
    },
    {
      label: "Completed",
      value: paymentStats.completedCount || 0,
      icon: <CheckCircleIcon />,
      color: "#22c55e",
    },
    {
      label: "Pending",
      value: paymentStats.pendingCount || 0,
      icon: <PendingIcon />,
      color: theme.palette.secondary.main,
    },
    {
      label: "Total Amount",
      value: formatAmount(paymentStats.totalAmount || 0),
      icon: <IncomeIcon />,
      color: theme.palette.primary.main,
    },
  ];

  // If first render loader is active, show skeletons
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Paper
          elevation={0}
          sx={{
            py: { xs: 1.5, sm: 2, md: 2.5 },
            px: { xs: 1.5, sm: 2, md: 2.5 },
            borderBottom: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: 0,
          }}
        >
          <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
            <Box sx={{
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexWrap: "wrap",
              gap: 1.5
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 1.5 } }}>
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    width: { xs: 36, sm: 40, md: 44 },
                    height: { xs: 36, sm: 40, md: 44 },
                  }}
                >
                  <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
                </Avatar>
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
                    Transaction History
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                    View all your payment transactions
                  </Typography>
                </Box>
              </Box>

              <HeaderButtonsSkeleton isMobile={isMobile} />
            </Box>
          </Container>
        </Paper>

        <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }}>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </Grid>
        </Container>

        <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              overflow: "hidden",
            }}
          >
            {viewMode === "table" ? (
              <>
                <TableContainer>
                  <Table sx={{ minWidth: isMobile ? 700 : isTablet ? 800 : 900 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Sr. No</TableCell>
                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Plan</TableCell>
                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Description</TableCell>
                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Date</TableCell>
                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Amount</TableCell>
                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Status</TableCell>
                        <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Payment</TableCell>
                        <TableCell align="right" sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <TableRowSkeleton key={item} isMobile={isMobile} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ p: 1.5, borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
                  <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                </Box>
              </>
            ) : (
              <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
                <CardViewSkeleton />
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          py: { xs: 1.5, sm: 2, md: 2.5 },
          px: { xs: 1.5, sm: 2, md: 2.5 },
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: 0,
        }}
      >
        <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexWrap: "wrap",
            gap: 1.5
          }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 1.5 } }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: { xs: 36, sm: 40, md: 44 },
                  height: { xs: 36, sm: 40, md: 44 },
                }}
              >
                <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
              </Avatar>
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
                  Transaction History
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                  View all your payment transactions
                </Typography>
              </Box>
            </Box>

            <Box sx={{
              display: "flex",
              gap: 0.8,
              flexWrap: 'wrap',
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'flex-start', sm: 'flex-end' }
            }}>
              <Tooltip title="Refresh">
                <IconButton
                  onClick={refreshData}
                  disabled={historyLoading}
                  size="small"
                  sx={{
                    color: theme.palette.primary.main,
                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                    width: 32,
                    height: 32,
                  }}
                >
                  <RefreshIcon sx={{
                    animation: historyLoading ? "spin 1s linear infinite" : "none",
                    fontSize: 18
                  }} />
                </IconButton>
              </Tooltip>

              <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                <IconButton
                  onClick={toggleViewMode}
                  size="small"
                  sx={{
                    color: theme.palette.primary.main,
                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                    width: 32,
                    height: 32,
                  }}
                >
                  {viewMode === "table" ?
                    <GridViewIcon sx={{ fontSize: 18 }} /> :
                    <TableRowsIcon sx={{ fontSize: 18 }} />
                  }
                </IconButton>
              </Tooltip>

              <Button
                variant="outlined"
                onClick={handleFilterClick}
                startIcon={<PendingIcon sx={{ fontSize: 14 }} />}
                size="small"
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.5),
                  color: "text.secondary",
                  fontSize: { xs: '0.6rem', sm: '0.65rem' },
                  height: 32,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {filter}
              </Button>

              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => handleFilterClose()}
                PaperProps={{
                  sx: { borderRadius: 1.5, mt: 1, minWidth: { xs: 100, sm: 120 } },
                }}
              >
                <MenuItem onClick={() => handleFilterClose("all")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>All</MenuItem>
                <MenuItem onClick={() => handleFilterClose("completed")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Completed</MenuItem>
                <MenuItem onClick={() => handleFilterClose("pending")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Pending</MenuItem>
                <MenuItem onClick={() => handleFilterClose("failed")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Failed</MenuItem>
                <MenuItem onClick={() => handleFilterClose("cancelled")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Cancelled</MenuItem>
              </Menu>

              <Button
                variant="outlined"
                onClick={handleSortClick}
                startIcon={<CalendarIcon sx={{ fontSize: 14 }} />}
                size="small"
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.5),
                  color: "text.secondary",
                  fontSize: { xs: '0.6rem', sm: '0.65rem' },
                  height: 32,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {sortBy === "newest" ? "Newest" :
                  sortBy === "oldest" ? "Oldest" :
                    sortBy === "highest" ? "Highest" : "Lowest"}
              </Button>

              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => handleSortClose()}
                PaperProps={{
                  sx: { borderRadius: 1.5, mt: 1, minWidth: { xs: 100, sm: 120 } },
                }}
              >
                <MenuItem onClick={() => handleSortClose("newest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Newest</MenuItem>
                <MenuItem onClick={() => handleSortClose("oldest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Oldest</MenuItem>
                <MenuItem onClick={() => handleSortClose("highest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Highest</MenuItem>
                <MenuItem onClick={() => handleSortClose("lowest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Lowest</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Stats Cards - Smaller */}
      <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
        <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.2, sm: 1.5, md: 1.8 },
                    borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                    border: "1px solid",
                    borderColor: alpha(stat.color, 0.2),
                    position: "relative",
                    overflow: "hidden",
                    height: '100%',
                    minHeight: { xs: 80, sm: 85, md: 90 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' } }}>
                        {stat.label}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          color: stat.color,
                          mt: 0.5,
                          fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
                          wordBreak: 'break-word',
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: alpha(stat.color, 0.1),
                        color: stat.color,
                        width: { xs: 32, sm: 36, md: 40 },
                        height: { xs: 32, sm: 36, md: 40 },
                        '& svg': {
                          fontSize: { xs: 16, sm: 18, md: 20 }
                        }
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Transactions List */}
      <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
        {historyLoading ? (
          <Box sx={{ width: "100%", mt: 3 }}>
            <LinearProgress sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main } }} />
            <Typography textAlign="center" sx={{ mt: 1.5 }} color="text.secondary" fontSize={{ xs: '0.7rem', sm: '0.75rem' }}>
              Loading transactions...
            </Typography>
          </Box>
        ) : sortedTransactions.length > 0 ? (
          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              overflow: "hidden",
            }}
          >
            {viewMode === "table" ? (
              <>
                {/* <TableContainer sx={{ 
                  overflowX: 'auto',
                  maxHeight: { xs: '450px', sm: '500px', md: '550px' },
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    height: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                    borderRadius: '2px',
                  },
                }}>
                  <Table sx={{ minWidth: isMobile ? 700 : isTablet ? 800 : 900 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          #
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          Plan
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          Amount
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          Payment
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {sortedTransactions.map((transaction, index) => (
                          <motion.tr
                            key={transaction._id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, py: 0.8 }}>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell sx={{ py: 0.8 }}>
                              {transaction.planId ? (
                                <Box>
                                  <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
                                    {transaction.planId.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
                                    {transaction.planId.duration}
                                  </Typography>
                                </Box>
                              ) : "-"}
                            </TableCell>
                            <TableCell sx={{ py: 0.8 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
                                {transaction.description?.substring(0, 30) || `Payment for ${transaction.planId?.name || "Plan"}`}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 0.8 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
                                {formatDate(transaction.createdAt)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.45rem', sm: '0.5rem', md: '0.55rem' } }}>
                                {formatTime(transaction.createdAt)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 0.8 }}>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{ 
                                  color: transaction.amount > 0 ? theme.palette.primary.main : "#ef4444",
                                  fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }
                                }}
                              >
                                {formatAmount(transaction.amount)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 0.8 }}>
                              <Chip
                                icon={getStatusIcon(transaction.status)}
                                label={transaction.status}
                                size="small"
                                sx={{
                                  bgcolor: alpha(getStatusColor(transaction.status), 0.1),
                                  color: getStatusColor(transaction.status),
                                  fontWeight: 600,
                                  fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' },
                                  height: { xs: 18, sm: 20 },
                                  '& .MuiChip-icon': {
                                    fontSize: { xs: 10, sm: 11 }
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 0.8 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.secondary' }}>
                                {transaction.paymentMethod || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ py: 0.8 }}>
                              <Tooltip title="View Receipt">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedTransaction(transaction);
                                    setShowReceipt(true);
                                  }}
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    width: 26,
                                    height: 26,
                                  }}
                                >
                                  <ReceiptIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </TableContainer> */}
                <TableContainer sx={{
                  overflowX: 'auto',
                  maxHeight: { xs: '450px', sm: '500px', md: '550px' },
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    height: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                    borderRadius: '2px',
                  },
                }}>
                  <Table sx={{ minWidth: isMobile ? 700 : isTablet ? 800 : 900 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          #
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          Plan
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          Amount
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          Payment
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {sortedTransactions.map((transaction, index) => (
                          <motion.tr
                            key={transaction._id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, py: 1.2 }}>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              {transaction.planId ? (
                                <Box>
                                  <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
                                    {transaction.planId.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' } }}>
                                    {transaction.planId.duration}
                                  </Typography>
                                </Box>
                              ) : "-"}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.74rem' }, color: 'text.primary' }}>
                                {transaction.description?.substring(0, 30) || `Payment for ${transaction.planId?.name || "Plan"}`}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
                                {formatDate(transaction.createdAt)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
                                {formatTime(transaction.createdAt)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{
                                  color: transaction.amount > 0 ? theme.palette.primary.main : "#ef4444",
                                  fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
                                }}
                              >
                                {formatAmount(transaction.amount)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Chip
                                icon={getStatusIcon(transaction.status)}
                                label={transaction.status}
                                size="small"
                                sx={{
                                  bgcolor: alpha(getStatusColor(transaction.status), 0.1),
                                  color: getStatusColor(transaction.status),
                                  fontWeight: 600,
                                  fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                                  height: { xs: 22, sm: 24 },
                                  '& .MuiChip-icon': {
                                    fontSize: { xs: 12, sm: 13 }
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.secondary' }}>
                                {transaction.paymentMethod || "-"}
                              </Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ py: 1.2 }}>
                              <Tooltip title="View Receipt">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedTransaction(transaction);
                                    setShowReceipt(true);
                                  }}
                                  sx={{
                                    color: theme.palette.primary.main,
                                    width: 30,
                                    height: 30,
                                  }}
                                >
                                  <ReceiptIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={totalItems}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{
                    borderTop: "1px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    '.MuiTablePagination-select': {
                      borderRadius: 1.5,
                      fontSize: { xs: '0.6rem', sm: '0.65rem' },
                    },
                    '.MuiTablePagination-displayedRows': {
                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                    },
                    '.MuiTablePagination-selectLabel': {
                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                    },
                    '.MuiTablePagination-actions': {
                      button: {
                        fontSize: { xs: '0.55rem', sm: '0.6rem' },
                      }
                    }
                  }}
                />
              </>
            ) : (
              <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
                <Stack spacing={1.5}>
                  <AnimatePresence>
                    {sortedTransactions.map((transaction, index) => (
                      <motion.div
                        key={transaction._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: { xs: 1.5, sm: 2 },
                            border: "1px solid",
                            borderColor: alpha(theme.palette.primary.main, 0.1),
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: theme.palette.primary.main,
                              boxShadow: `0 6px 15px -6px ${alpha(theme.palette.primary.main, 0.3)}`,
                            },
                          }}
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowReceipt(true);
                          }}
                        >
                          <Box sx={{
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: "space-between",
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            mb: 1.5,
                            gap: 0.8
                          }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Avatar
                                sx={{
                                  bgcolor: transaction.amount > 0 ? alpha(theme.palette.primary.main, 0.1) : alpha("#ef4444", 0.1),
                                  color: transaction.amount > 0 ? theme.palette.primary.main : "#ef4444",
                                  width: { xs: 36, sm: 40 },
                                  height: { xs: 36, sm: 40 },
                                }}
                              >
                                {transaction.amount > 0 ?
                                  <IncomeIcon sx={{ fontSize: 18 }} /> :
                                  <ExpenseIcon sx={{ fontSize: 18 }} />
                                }
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="body2"
                                  fontWeight={600}
                                  sx={{
                                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                                    wordBreak: 'break-word',
                                    color: 'text.primary',
                                  }}
                                >
                                  {transaction.description?.substring(0, 40) || `Payment for ${transaction.planId?.name || "Plan"}`}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                                  <CalendarIcon sx={{ fontSize: 10, mr: 0.3, verticalAlign: 'middle', color: theme.palette.primary.main }} />
                                  {formatDate(transaction.createdAt)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{
                              textAlign: "right",
                              width: { xs: '100%', sm: 'auto' },
                              mt: { xs: 0.5, sm: 0 }
                            }}>
                              <Typography variant="body1" fontWeight={700} sx={{
                                color: theme.palette.primary.main,
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                              }}>
                                {formatAmount(transaction.amount)}
                              </Typography>
                              <Chip
                                icon={getStatusIcon(transaction.status)}
                                label={transaction.status}
                                size="small"
                                sx={{
                                  mt: 0.3,
                                  bgcolor: alpha(getStatusColor(transaction.status), 0.1),
                                  color: getStatusColor(transaction.status),
                                  fontWeight: 600,
                                  fontSize: { xs: '0.55rem', sm: '0.6rem' },
                                  height: { xs: 20, sm: 22 },
                                }}
                              />
                            </Box>
                          </Box>

                          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

                          <Grid container spacing={1.5}>
                            {transaction.planId && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                                  Plan
                                </Typography>
                                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
                                  {transaction.planId.name} ({transaction.planId.duration})
                                </Typography>
                              </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                                Payment Method
                              </Typography>
                              <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
                                {transaction.paymentMethod || "-"}
                              </Typography>
                            </Grid>
                          </Grid>

                          {transaction.addOns && transaction.addOns.length > 0 && (
                            <Box sx={{ mt: 1.5 }}>
                              <Button
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddOns(transaction._id);
                                }}
                                endIcon={expandedAddOns[transaction._id] ? <ExpandLessIcon sx={{ fontSize: 16 }} /> : <ExpandMoreIcon sx={{ fontSize: 16 }} />}
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontSize: { xs: '0.65rem', sm: '0.7rem' }
                                }}
                              >
                                {transaction.addOns.length} Add-on(s)
                              </Button>
                              <Collapse in={expandedAddOns[transaction._id]}>
                                <Box sx={{ mt: 1.5, p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.02), borderRadius: 1.5, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
                                  {transaction.addOns.map((addOn, idx) => (
                                    <Box key={idx} sx={{
                                      display: "flex",
                                      flexDirection: { xs: 'column', sm: 'row' },
                                      justifyContent: "space-between",
                                      mb: 0.8,
                                      gap: { xs: 0.5, sm: 0 }
                                    }}>
                                      <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
                                        Upgrade to {addOn.addOnMaxUser} users
                                      </Typography>
                                      <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.8,
                                        justifyContent: { xs: 'flex-start', sm: 'flex-end' }
                                      }}>
                                        <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                                          +{formatAmount(addOn.addOnAmount)}
                                        </Typography>
                                        <Chip
                                          label={addOn.status}
                                          size="small"
                                          sx={{
                                            bgcolor: alpha(getStatusColor(addOn.status), 0.1),
                                            color: getStatusColor(addOn.status),
                                            fontSize: { xs: '0.55rem', sm: '0.6rem' },
                                            height: 18,
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Collapse>
                            </Box>
                          )}
                        </Paper>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Stack>
                {totalItems > rowsPerPage && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setPage(page + 1)}
                      disabled={(page + 1) * rowsPerPage >= totalItems}
                      size="small"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: 30,
                        "&:hover": {
                          borderColor: theme.palette.primary.dark,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      Load More
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 3, md: 4 },
              borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
              textAlign: "center",
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <HistoryIcon sx={{
              fontSize: { xs: 32, sm: 36, md: 40 },
              color: alpha(theme.palette.primary.main, 0.3),
              mb: 1.5
            }} />
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              No transactions found
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
              Your transaction history will appear here after making payments
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Receipt Modal */}
      {selectedTransaction && (
        <ReceiptModal
          transaction={selectedTransaction}
          show={showReceipt}
          onHide={() => setShowReceipt(false)}
        />
      )}

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

export default TransactionHistory;