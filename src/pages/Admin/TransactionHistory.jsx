// // Without Addon
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

// // Stat Card Skeleton - Smaller
// const StatCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Grid item xs={12} sm={6} md={3}>
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 1.2, sm: 1.5, md: 1.8 },
//           borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           height: '100%',
//           minHeight: { xs: 80, sm: 85, md: 90 },
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <Box sx={{ flex: 1 }}>
//             <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="text" width={90} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>
//           <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// // Table Row Skeleton - Smaller
// const TableRowSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <TableRow>
//       <TableCell sx={{ py: 1 }}>
//         <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 1 }}>
//         <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 1 }}>
//         <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 1 }}>
//         <Skeleton variant="text" width={70} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 1 }}>
//         <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 1 }}>
//         <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 1 }}>
//         <Skeleton variant="text" width={55} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell align="right" sx={{ py: 1 }}>
//         <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </TableCell>
//     </TableRow>
//   );
// };

// // Card View Skeleton - Smaller
// const CardViewSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Stack spacing={1.5}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2, md: 2.5 },
//             borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           <Box sx={{
//             display: "flex",
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between",
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             mb: 1.5,
//             gap: 1
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 1.5 } }}>
//               <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width={180} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={130} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>
//             <Box sx={{
//               textAlign: "right",
//               width: { xs: '100%', sm: 'auto' },
//               mt: { xs: 0.5, sm: 0 }
//             }}>
//               <Skeleton variant="text" width={90} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>
//           </Box>

//           <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//           <Grid container spacing={1.5}>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//     </Stack>
//   );
// };

// // Header Buttons Skeleton - Smaller
// const HeaderButtonsSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Box sx={{
//       display: "flex",
//       gap: 0.8,
//       flexWrap: 'wrap',
//       width: { xs: '100%', sm: 'auto' },
//       justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//     }}>
//       <Skeleton variant="circular" width={isMobile ? 32 : 36} height={isMobile ? 32 : 36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       <Skeleton variant="circular" width={isMobile ? 32 : 36} height={isMobile ? 32 : 36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       <Skeleton variant="rounded" width={isMobile ? 85 : 100} height={isMobile ? 32 : 36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Skeleton variant="rounded" width={isMobile ? 85 : 100} height={isMobile ? 32 : 36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
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
//       const isSubAdmin = Number(authUser?.role_id) === 3;
//       const effectiveAdminId = isSubAdmin ? (typeof authUser?.adminId === 'object' ? authUser?.adminId?._id || authUser?.adminId?.id : authUser?.adminId) : (authUser._id || authUser.id || userData?._id);

//       if (effectiveAdminId) {
//         dispatch(getPaymentHistory({ adminId: effectiveAdminId, page: page + 1, limit: rowsPerPage }));
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
//         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 12, sm: 14 } }} />;
//       case "pending":
//         return <PendingIcon sx={{ color: theme.palette.secondary.main, fontSize: { xs: 12, sm: 14 } }} />;
//       default:
//         return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 12, sm: 14 } }} />;
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

//   // If first render loader is active, show skeletons
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//         <Paper
//           elevation={0}
//           sx={{
//             py: { xs: 1.5, sm: 2, md: 2.5 },
//             px: { xs: 1.5, sm: 2, md: 2.5 },
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
//               gap: 1.5
//             }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 1.5 } }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     width: { xs: 36, sm: 40, md: 44 },
//                     height: { xs: 36, sm: 40, md: 44 },
//                   }}
//                 >
//                   <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//                 </Avatar>
//                 <Box>
//                   <Typography
//                     variant={isMobile ? "h6" : "h5"}
//                     fontWeight="700"
//                     gutterBottom
//                     sx={{
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                       fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
//                     }}
//                   >
//                     Transaction History
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                     View all your payment transactions
//                   </Typography>
//                 </Box>
//               </Box>

//               <HeaderButtonsSkeleton isMobile={isMobile} />
//             </Box>
//           </Container>
//         </Paper>

//         <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
//           <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }}>
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//             <StatCardSkeleton />
//           </Grid>
//         </Container>

//         <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 <TableContainer>
//                   <Table sx={{ minWidth: isMobile ? 700 : isTablet ? 800 : 900 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Sr. No</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Plan</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Description</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Date</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Amount</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Status</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Payment</TableCell>
//                         <TableCell align="right" sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: '0.7rem', py: 1 }}>Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} isMobile={isMobile} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 1.5, borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                   <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
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
//           py: { xs: 1.5, sm: 2, md: 2.5 },
//           px: { xs: 1.5, sm: 2, md: 2.5 },
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
//             gap: 1.5
//           }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 1.5 } }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   width: { xs: 36, sm: 40, md: 44 },
//                   height: { xs: 36, sm: 40, md: 44 },
//                 }}
//               >
//                 <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
//               </Avatar>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "h6" : "h5"}
//                   fontWeight="700"
//                   gutterBottom
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
//                   }}
//                 >
//                   Transaction History
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                   View all your payment transactions
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{
//               display: "flex",
//               gap: 0.8,
//               flexWrap: 'wrap',
//               width: { xs: '100%', sm: 'auto' },
//               justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//             }}>
//               <Tooltip title="Refresh">
//                 <IconButton
//                   onClick={refreshData}
//                   disabled={historyLoading}
//                   size="small"
//                   sx={{
//                     color: theme.palette.primary.main,
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                     width: 32,
//                     height: 32,
//                   }}
//                 >
//                   <RefreshIcon sx={{
//                     animation: historyLoading ? "spin 1s linear infinite" : "none",
//                     fontSize: 18
//                   }} />
//                 </IconButton>
//               </Tooltip>

//               <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
//                 <IconButton
//                   onClick={toggleViewMode}
//                   size="small"
//                   sx={{
//                     color: theme.palette.primary.main,
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                     width: 32,
//                     height: 32,
//                   }}
//                 >
//                   {viewMode === "table" ?
//                     <GridViewIcon sx={{ fontSize: 18 }} /> :
//                     <TableRowsIcon sx={{ fontSize: 18 }} />
//                   }
//                 </IconButton>
//               </Tooltip>

//               <Button
//                 variant="outlined"
//                 onClick={handleFilterClick}
//                 startIcon={<PendingIcon sx={{ fontSize: 14 }} />}
//                 size="small"
//                 sx={{
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   color: "text.secondary",
//                   fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                   height: 32,
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 {filter}
//               </Button>

//               <Menu
//                 anchorEl={filterAnchorEl}
//                 open={Boolean(filterAnchorEl)}
//                 onClose={() => handleFilterClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 1.5, mt: 1, minWidth: { xs: 100, sm: 120 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleFilterClose("all")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>All</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("completed")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Completed</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("pending")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Pending</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("failed")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Failed</MenuItem>
//                 <MenuItem onClick={() => handleFilterClose("cancelled")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Cancelled</MenuItem>
//               </Menu>

//               <Button
//                 variant="outlined"
//                 onClick={handleSortClick}
//                 startIcon={<CalendarIcon sx={{ fontSize: 14 }} />}
//                 size="small"
//                 sx={{
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   color: "text.secondary",
//                   fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                   height: 32,
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 {sortBy === "newest" ? "Newest" :
//                   sortBy === "oldest" ? "Oldest" :
//                     sortBy === "highest" ? "Highest" : "Lowest"}
//               </Button>

//               <Menu
//                 anchorEl={sortAnchorEl}
//                 open={Boolean(sortAnchorEl)}
//                 onClose={() => handleSortClose()}
//                 PaperProps={{
//                   sx: { borderRadius: 1.5, mt: 1, minWidth: { xs: 100, sm: 120 } },
//                 }}
//               >
//                 <MenuItem onClick={() => handleSortClose("newest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Newest</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("oldest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Oldest</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("highest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Highest</MenuItem>
//                 <MenuItem onClick={() => handleSortClose("lowest")} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Lowest</MenuItem>
//               </Menu>
//             </Box>
//           </Box>
//         </Container>
//       </Paper>

//       {/* Stats Cards - Smaller */}
//       <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
//         <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }}>
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
//                     p: { xs: 1.2, sm: 1.5, md: 1.8 },
//                     borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//                     border: "1px solid",
//                     borderColor: alpha(stat.color, 0.2),
//                     position: "relative",
//                     overflow: "hidden",
//                     height: '100%',
//                     minHeight: { xs: 80, sm: 85, md: 90 },
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                     <Box>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' } }}>
//                         {stat.label}
//                       </Typography>
//                       <Typography
//                         variant="h6"
//                         fontWeight={700}
//                         sx={{
//                           color: stat.color,
//                           mt: 0.5,
//                           fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
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
//                         width: { xs: 32, sm: 36, md: 40 },
//                         height: { xs: 32, sm: 36, md: 40 },
//                         '& svg': {
//                           fontSize: { xs: 16, sm: 18, md: 20 }
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
//       <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
//         {historyLoading ? (
//           <Box sx={{ width: "100%", mt: 3 }}>
//             <LinearProgress sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main } }} />
//             <Typography textAlign="center" sx={{ mt: 1.5 }} color="text.secondary" fontSize={{ xs: '0.7rem', sm: '0.75rem' }}>
//               Loading transactions...
//             </Typography>
//           </Box>
//         ) : sortedTransactions.length > 0 ? (
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {viewMode === "table" ? (
//               <>
//                 {/* <TableContainer sx={{ 
//                   overflowX: 'auto',
//                   maxHeight: { xs: '450px', sm: '500px', md: '550px' },
//                   '&::-webkit-scrollbar': {
//                     width: '4px',
//                     height: '4px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: alpha(theme.palette.primary.main, 0.3),
//                     borderRadius: '2px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isMobile ? 700 : isTablet ? 800 : 900 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
//                           #
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
//                           Plan
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
//                           Description
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
//                           Date
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
//                           Amount
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
//                           Status
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
//                           Payment
//                         </TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1 }}>
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
//                             <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, py: 0.8 }}>
//                               {page * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell sx={{ py: 0.8 }}>
//                               {transaction.planId ? (
//                                 <Box>
//                                   <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
//                                     {transaction.planId.name}
//                                   </Typography>
//                                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                     {transaction.planId.duration}
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell sx={{ py: 0.8 }}>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
//                                 {transaction.description?.substring(0, 30) || `Payment for ${transaction.planId?.name || "Plan"}`}
//                               </Typography>
//                             </TableCell>
//                             <TableCell sx={{ py: 0.8 }}>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
//                                 {formatDate(transaction.createdAt)}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.45rem', sm: '0.5rem', md: '0.55rem' } }}>
//                                 {formatTime(transaction.createdAt)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell sx={{ py: 0.8 }}>
//                               <Typography
//                                 variant="body2"
//                                 fontWeight={600}
//                                 sx={{ 
//                                   color: transaction.amount > 0 ? theme.palette.primary.main : "#ef4444",
//                                   fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }
//                                 }}
//                               >
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell sx={{ py: 0.8 }}>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' },
//                                   height: { xs: 18, sm: 20 },
//                                   '& .MuiChip-icon': {
//                                     fontSize: { xs: 10, sm: 11 }
//                                   }
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell sx={{ py: 0.8 }}>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.secondary' }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </TableCell>
//                             <TableCell align="right" sx={{ py: 0.8 }}>
//                               <Tooltip title="View Receipt">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => {
//                                     setSelectedTransaction(transaction);
//                                     setShowReceipt(true);
//                                   }}
//                                   sx={{ 
//                                     color: theme.palette.primary.main,
//                                     width: 26,
//                                     height: 26,
//                                   }}
//                                 >
//                                   <ReceiptIcon sx={{ fontSize: 14 }} />
//                                 </IconButton>
//                               </Tooltip>
//                             </TableCell>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </TableBody>
//                   </Table>
//                 </TableContainer> */}
//                 <TableContainer sx={{
//                   overflowX: 'auto',
//                   maxHeight: { xs: '450px', sm: '500px', md: '550px' },
//                   '&::-webkit-scrollbar': {
//                     width: '4px',
//                     height: '4px',
//                   },
//                   '&::-webkit-scrollbar-thumb': {
//                     backgroundColor: alpha(theme.palette.primary.main, 0.3),
//                     borderRadius: '2px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isMobile ? 700 : isTablet ? 800 : 900 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
//                           #
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
//                           Plan
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
//                           Description
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
//                           Date
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
//                           Amount
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
//                           Status
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
//                           Payment
//                         </TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: theme.palette.primary.main, py: 1.5 }}>
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
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, py: 1.2 }}>
//                               {page * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell sx={{ py: 1.2 }}>
//                               {transaction.planId ? (
//                                 <Box>
//                                   <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
//                                     {transaction.planId.name}
//                                   </Typography>
//                                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' } }}>
//                                     {transaction.planId.duration}
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell sx={{ py: 1.2 }}>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.74rem' }, color: 'text.primary' }}>
//                                 {transaction.description?.substring(0, 30) || `Payment for ${transaction.planId?.name || "Plan"}`}
//                               </Typography>
//                             </TableCell>
//                             <TableCell sx={{ py: 1.2 }}>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
//                                 {formatDate(transaction.createdAt)}
//                               </Typography>
//                               <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem', md: '0.6rem' } }}>
//                                 {formatTime(transaction.createdAt)}
//                               </Typography>
//                             </TableCell>
//                             <TableCell sx={{ py: 1.2 }}>
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
//                             <TableCell sx={{ py: 1.2 }}>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                   height: { xs: 22, sm: 24 },
//                                   '& .MuiChip-icon': {
//                                     fontSize: { xs: 12, sm: 13 }
//                                   }
//                                 }}
//                               />
//                             </TableCell>
//                             <TableCell sx={{ py: 1.2 }}>
//                               <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.secondary' }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </TableCell>
//                             <TableCell align="right" sx={{ py: 1.2 }}>
//                               <Tooltip title="View Receipt">
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => {
//                                     setSelectedTransaction(transaction);
//                                     setShowReceipt(true);
//                                   }}
//                                   sx={{
//                                     color: theme.palette.primary.main,
//                                     width: 30,
//                                     height: 30,
//                                   }}
//                                 >
//                                   <ReceiptIcon sx={{ fontSize: 16 }} />
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
//                       borderRadius: 1.5,
//                       fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                     },
//                     '.MuiTablePagination-displayedRows': {
//                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                     },
//                     '.MuiTablePagination-selectLabel': {
//                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                     },
//                     '.MuiTablePagination-actions': {
//                       button: {
//                         fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                       }
//                     }
//                   }}
//                 />
//               </>
//             ) : (
//               <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
//                 <Stack spacing={1.5}>
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
//                             p: { xs: 1.5, sm: 2 },
//                             borderRadius: { xs: 1.5, sm: 2 },
//                             border: "1px solid",
//                             borderColor: alpha(theme.palette.primary.main, 0.1),
//                             cursor: "pointer",
//                             transition: "all 0.2s ease",
//                             "&:hover": {
//                               borderColor: theme.palette.primary.main,
//                               boxShadow: `0 6px 15px -6px ${alpha(theme.palette.primary.main, 0.3)}`,
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
//                             mb: 1.5,
//                             gap: 0.8
//                           }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                               <Avatar
//                                 sx={{
//                                   bgcolor: transaction.amount > 0 ? alpha(theme.palette.primary.main, 0.1) : alpha("#ef4444", 0.1),
//                                   color: transaction.amount > 0 ? theme.palette.primary.main : "#ef4444",
//                                   width: { xs: 36, sm: 40 },
//                                   height: { xs: 36, sm: 40 },
//                                 }}
//                               >
//                                 {transaction.amount > 0 ?
//                                   <IncomeIcon sx={{ fontSize: 18 }} /> :
//                                   <ExpenseIcon sx={{ fontSize: 18 }} />
//                                 }
//                               </Avatar>
//                               <Box sx={{ flex: 1 }}>
//                                 <Typography
//                                   variant="body2"
//                                   fontWeight={600}
//                                   sx={{
//                                     fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                                     wordBreak: 'break-word',
//                                     color: 'text.primary',
//                                   }}
//                                 >
//                                   {transaction.description?.substring(0, 40) || `Payment for ${transaction.planId?.name || "Plan"}`}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                                   <CalendarIcon sx={{ fontSize: 10, mr: 0.3, verticalAlign: 'middle', color: theme.palette.primary.main }} />
//                                   {formatDate(transaction.createdAt)}
//                                 </Typography>
//                               </Box>
//                             </Box>
//                             <Box sx={{
//                               textAlign: "right",
//                               width: { xs: '100%', sm: 'auto' },
//                               mt: { xs: 0.5, sm: 0 }
//                             }}>
//                               <Typography variant="body1" fontWeight={700} sx={{
//                                 color: theme.palette.primary.main,
//                                 fontSize: { xs: '0.9rem', sm: '1rem' }
//                               }}>
//                                 {formatAmount(transaction.amount)}
//                               </Typography>
//                               <Chip
//                                 icon={getStatusIcon(transaction.status)}
//                                 label={transaction.status}
//                                 size="small"
//                                 sx={{
//                                   mt: 0.3,
//                                   bgcolor: alpha(getStatusColor(transaction.status), 0.1),
//                                   color: getStatusColor(transaction.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                                   height: { xs: 20, sm: 22 },
//                                 }}
//                               />
//                             </Box>
//                           </Box>

//                           <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//                           <Grid container spacing={1.5}>
//                             {transaction.planId && (
//                               <Grid item xs={12} sm={6}>
//                                 <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                                   Plan
//                                 </Typography>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
//                                   {transaction.planId.name} ({transaction.planId.duration})
//                                 </Typography>
//                               </Grid>
//                             )}
//                             <Grid item xs={12} sm={6}>
//                               <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                                 Payment Method
//                               </Typography>
//                               <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
//                                 {transaction.paymentMethod || "-"}
//                               </Typography>
//                             </Grid>
//                           </Grid>

//                           {transaction.addOns && transaction.addOns.length > 0 && (
//                             <Box sx={{ mt: 1.5 }}>
//                               <Button
//                                 size="small"
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   toggleAddOns(transaction._id);
//                                 }}
//                                 endIcon={expandedAddOns[transaction._id] ? <ExpandLessIcon sx={{ fontSize: 16 }} /> : <ExpandMoreIcon sx={{ fontSize: 16 }} />}
//                                 sx={{
//                                   color: theme.palette.primary.main,
//                                   fontSize: { xs: '0.65rem', sm: '0.7rem' }
//                                 }}
//                               >
//                                 {transaction.addOns.length} Add-on(s)
//                               </Button>
//                               <Collapse in={expandedAddOns[transaction._id]}>
//                                 <Box sx={{ mt: 1.5, p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.02), borderRadius: 1.5, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                                   {transaction.addOns.map((addOn, idx) => (
//                                     <Box key={idx} sx={{
//                                       display: "flex",
//                                       flexDirection: { xs: 'column', sm: 'row' },
//                                       justifyContent: "space-between",
//                                       mb: 0.8,
//                                       gap: { xs: 0.5, sm: 0 }
//                                     }}>
//                                       <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
//                                         Upgrade to {addOn.addOnMaxUser} users
//                                       </Typography>
//                                       <Box sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: 0.8,
//                                         justifyContent: { xs: 'flex-start', sm: 'flex-end' }
//                                       }}>
//                                         <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                                           +{formatAmount(addOn.addOnAmount)}
//                                         </Typography>
//                                         <Chip
//                                           label={addOn.status}
//                                           size="small"
//                                           sx={{
//                                             bgcolor: alpha(getStatusColor(addOn.status), 0.1),
//                                             color: getStatusColor(addOn.status),
//                                             fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                                             height: 18,
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
//                   <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= totalItems}
//                       size="small"
//                       sx={{
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         height: 30,
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
//               p: { xs: 2.5, sm: 3, md: 4 },
//               borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//               textAlign: "center",
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}
//           >
//             <HistoryIcon sx={{
//               fontSize: { xs: 32, sm: 36, md: 40 },
//               color: alpha(theme.palette.primary.main, 0.3),
//               mb: 1.5
//             }} />
//             <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
//               No transactions found
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
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








// Add on History
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
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
  useMediaQuery,
  Skeleton,
  TextField,
  InputAdornment,
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
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  Extension as AddonIcon,
  LocalOffer as CouponIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import ReceiptModal from "../../components/models/ReceiptModal";
import { toast } from "react-toastify";
import moment from "moment";

// ─── Type Tab Config ──────────────────────────────────────────────────────────
const TYPE_TABS = [
  { key: "all", label: "All" },
  { key: "plan", label: "Plans" },
  { key: "addon", label: "Add-ons" },
];

// ─── Status Filter Config ─────────────────────────────────────────────────────
const STATUS_FILTERS = [
  { key: "all", label: "All", color: "#6366f1" },
  { key: "completed", label: "Completed", color: "#22c55e" },
  { key: "pending", label: "Pending", color: "#f59e0b" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
  { key: "failed", label: "Failed", color: "#9ca3af" },
];

// ─── Stat Card Skeleton ───────────────────────────────────────────────────────
// const StatCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Grid item xs={12} sm={6} md={4}>
//       <Paper elevation={0} sx={{
//         p: { xs: 1.2, sm: 1.5, md: 1.8 },
//         borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//         border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1),
//         height: "100%", minHeight: { xs: 80, sm: 85, md: 90 },
//         display: "flex", flexDirection: "column", justifyContent: "center",
//       }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//           <Box sx={{ flex: 1 }}>
//             <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="text" width={90} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>
//           <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// ─── Table Row Skeleton ───────────────────────────────────────────────────────
const TableRowSkeleton = () => {
  const theme = useTheme();
  return (
    <TableRow>
      {[25, 90, 130, 70, 70, 70, 70, 28].map((w, i) => (
        <TableCell key={i} sx={{ py: 1 }}>
          <Skeleton variant={i === 7 ? "circular" : "text"} width={w} height={i === 7 ? 28 : 18}
            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </TableCell>
      ))}
    </TableRow>
  );
};

// ─── Card View Skeleton ───────────────────────────────────────────────────────
const CardViewSkeleton = () => {
  const theme = useTheme();
  return (
    <Stack spacing={1.5}>
      {[1, 2, 3].map((item) => (
        <Paper key={item} elevation={0} sx={{
          p: { xs: 1.5, sm: 2, md: 2.5 }, borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
          border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1),
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Box>
                <Skeleton variant="text" width={180} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={130} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Skeleton variant="text" width={90} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>
          </Box>
          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
          <Grid container spacing={1.5}>
            {[1, 2].map((g) => (
              <Grid item xs={12} sm={6} key={g}>
                <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Stack>
  );
};

// ─── Header Buttons Skeleton ──────────────────────────────────────────────────
const HeaderButtonsSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant={i <= 2 ? "circular" : "rounded"} 
          width={i <= 2 ? (isMobile ? 32 : 36) : (isMobile ? 85 : 100)} 
          height={isMobile ? 32 : 36}
          sx={{ borderRadius: i > 2 ? 1.5 : "50%", bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      ))}
    </Box>
  );
};

// ─── Type Badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const isAddon = type === "addon";
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", gap: 0.4,
      px: 0.8, py: 0.3, borderRadius: 1,
      bgcolor: isAddon ? alpha("#8b5cf6", 0.1) : alpha("#3b82f6", 0.1),
      border: "1px solid", borderColor: isAddon ? alpha("#8b5cf6", 0.3) : alpha("#3b82f6", 0.3),
    }}>
      {isAddon ? <AddonIcon sx={{ fontSize: 10, color: "#8b5cf6" }} /> : <ReceiptIcon sx={{ fontSize: 10, color: "#3b82f6" }} />}
      <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: isAddon ? "#8b5cf6" : "#3b82f6", textTransform: "uppercase", letterSpacing: 0.4 }}>
        {isAddon ? "Add-on" : "Plan"}
      </Typography>
    </Box>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const TransactionHistory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});
  const userData = useSelector((state) => state.user?.userInfo || {});

  const {
    paymentHistory = [],
    historyLoading = false,
    totalItems = 0,
    totalPages = 1,
    paymentStats = { totalPayments: 0, completedCount: 0, pendingCount: 0, totalAmount: 0 },
    totalPlanAmount = 0,
    totalAddOnAmount = 0,
    statusCounts = {},
  } = useSelector((state) => state.payment || {});

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [activeTypeTab, setActiveTypeTab] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Get effective admin ID
  const getEffectiveAdminId = () => {
    const isSubAdmin = Number(authUser?.role_id) === 3;
    if (isSubAdmin) {
      return typeof authUser?.adminId === "object" 
        ? authUser?.adminId?._id || authUser?.adminId?.id 
        : authUser?.adminId;
    }
    return authUser._id || authUser.id || userData?._id;
  };

  // Fetch data with server-side pagination
  useEffect(() => {
    if (isAuthenticated) {
      const adminId = getEffectiveAdminId();
      if (adminId) {
        dispatch(getPaymentHistory({ 
          adminId, 
          page: page + 1,
          limit: rowsPerPage,
          search: searchQuery || undefined,
          startDate: appliedStart || undefined,
          endDate: appliedEnd || undefined,
          status: activeStatus !== "all" ? activeStatus : undefined
        }));
      }
    }
    const timer = setTimeout(() => setShowFirstRenderLoader(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch, isAuthenticated, page, rowsPerPage, searchQuery, activeStatus, appliedStart, appliedEnd]);

  // Reset page when filters change
  useEffect(() => { 
    setPage(0); 
  }, [searchQuery, activeStatus, appliedStart, appliedEnd, activeTypeTab]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleViewMode = () => setViewMode(viewMode === "card" ? "table" : "card");

  const refreshData = () => {
    if (isAuthenticated) {
      const adminId = getEffectiveAdminId();
      if (adminId) {
        dispatch(getPaymentHistory({ 
          adminId, 
          page: page + 1, 
          limit: rowsPerPage,
          search: searchQuery || undefined,
          startDate: appliedStart || undefined,
          endDate: appliedEnd || undefined,
          status: activeStatus !== "all" ? activeStatus : undefined
        }));
        toast.success("Data refreshed successfully");
      }
    }
  };

  const handleSortClose = (value) => { 
    if (value) setSortBy(value); 
    setSortAnchorEl(null); 
  };

  const applyDateFilter = () => {
    if (startDate && endDate && moment(endDate).isBefore(moment(startDate))) {
      toast.error("End date cannot be before start date");
      return;
    }
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    setPage(0);
    toast.success("Date filter applied");
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
    setAppliedStart("");
    setAppliedEnd("");
    setPage(0);
    toast.info("Date filter cleared");
  };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const formatTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const formatAmount = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(amount);

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 12, sm: 14 } }} />;
    if (status === "pending") return <PendingIcon sx={{ color: theme.palette.secondary.main, fontSize: { xs: 12, sm: 14 } }} />;
    return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 12, sm: 14 } }} />;
  };

  const getStatusColor = (status) => {
    if (status === "completed") return "#22c55e";
    if (status === "pending") return theme.palette.secondary.main;
    return "#ef4444";
  };

  // Filter by type (client-side only for type tab, since server doesn't have type filter)
  const displayedTransactions = activeTypeTab === "all" 
    ? paymentHistory 
    : paymentHistory.filter(t => t.type === activeTypeTab);

  // Client-side sorting
  const sortedTransactions = [...displayedTransactions].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "highest") return b.amount - a.amount;
    if (sortBy === "lowest") return a.amount - b.amount;
    return 0;
  });

  // Counts for badges
  const typeCounts = {
    all: paymentHistory.length,
    plan: paymentHistory.filter((t) => t.type === "plan").length,
    addon: paymentHistory.filter((t) => t.type === "addon").length,
  };

  // Stats cards - ONLY 3 CARDS
  // const statCards = [
  //   { label: "Total Transactions", value: statusCounts?.all || totalItems || paymentStats.totalPayments || 0, icon: <HistoryIcon />, color: theme.palette.primary.main },
  //   { label: "Plan Revenue", value: formatAmount(totalPlanAmount || 0), icon: <ReceiptIcon />, color: "#3b82f6" },
  //   { label: "Add-on Revenue", value: formatAmount(totalAddOnAmount || 0), icon: <AddonIcon />, color: "#8b5cf6" },
  // ];

  // ── First render skeleton ─────────────────────────────────────────────────
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Paper elevation={0} sx={{ py: { xs: 1.5, sm: 2, md: 2.5 }, px: { xs: 1.5, sm: 2, md: 2.5 }, borderBottom: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), borderRadius: 0 }}>
          <Container maxWidth="xl" disableGutters={isMobile}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: { xs: 36, sm: 40, md: 44 }, height: { xs: 36, sm: 40, md: 44 } }}>
                  <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
                </Avatar>
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"} fontWeight="700" gutterBottom sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" } }}>
                    Transaction History
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" } }}>View all your payment transactions</Typography>
                </Box>
              </Box>
              <HeaderButtonsSkeleton isMobile={isMobile} />
            </Box>
          </Container>
        </Paper>
        {/* <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }}>
            <StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton />
          </Grid>
        </Container> */}
        <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
          <Skeleton variant="rounded" height={52} sx={{ borderRadius: 3, mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.08) }} />
          <Skeleton variant="rounded" height={48} sx={{ borderRadius: 3, mb: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.08) }} />
          <Paper elevation={0} sx={{ borderRadius: { xs: 1.5, sm: 2, md: 2.5 }, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden" }}>
            <TableContainer>
              <Table sx={{ minWidth: isMobile ? 700 : 900 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    {["#", "Type", "Plan", "Description", "Date", "Amount", "Status", "Actions"].map((h) => (
                      <TableCell key={h} sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: "0.7rem", py: 1 }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>{[1, 2, 3, 4, 5].map((i) => <TableRowSkeleton key={i} />)}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
      {/* Header */}
      <Paper elevation={0} sx={{ py: { xs: 1.5, sm: 2, md: 2.5 }, px: { xs: 1.5, sm: 2, md: 2.5 }, borderBottom: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), borderRadius: 0 }}>
        <Container maxWidth="xl" disableGutters={isMobile}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, flexWrap: "wrap", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: { xs: 36, sm: 40, md: 44 }, height: { xs: 36, sm: 40, md: 44 } }}>
                <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
              </Avatar>
              <Box>
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight="700" gutterBottom
                  sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" } }}>
                  Transaction History
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" } }}>
                  View all your payment transactions
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
              <Tooltip title="Refresh">
                <IconButton onClick={refreshData} disabled={historyLoading} size="small"
                  sx={{ color: theme.palette.primary.main, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }, width: 32, height: 32 }}>
                  <RefreshIcon sx={{ animation: historyLoading ? "spin 1s linear infinite" : "none", fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                <IconButton onClick={toggleViewMode} size="small"
                  sx={{ color: theme.palette.primary.main, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }, width: 32, height: 32 }}>
                  {viewMode === "table" ? <GridViewIcon sx={{ fontSize: 18 }} /> : <TableRowsIcon sx={{ fontSize: 18 }} />}
                </IconButton>
              </Tooltip>
              <Button variant="outlined" onClick={(e) => setSortAnchorEl(e.currentTarget)}
                startIcon={<CalendarIcon sx={{ fontSize: 14 }} />} size="small"
                sx={{ borderColor: alpha(theme.palette.divider, 0.5), color: "text.secondary", fontSize: { xs: "0.6rem", sm: "0.65rem" }, height: 32,
                  "&:hover": { borderColor: theme.palette.primary.main, color: theme.palette.primary.main } }}>
                {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : sortBy === "highest" ? "Highest" : "Lowest"}
              </Button>
              <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={() => handleSortClose()}
                PaperProps={{ sx: { borderRadius: 1.5, mt: 1, minWidth: 120 } }}>
                {["newest", "oldest", "highest", "lowest"].map((s) => (
                  <MenuItem key={s} onClick={() => handleSortClose(s)} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, textTransform: "capitalize" }}>{s}</MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Stats Cards - ONLY 3 CARDS */}
      {/* <Container maxWidth="xl" sx={{ py: { xs: 1.5, sm: 2, md: 2.5 } }}>
        <Grid container spacing={{ xs: 1.2, sm: 1.5, md: 2 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                <Paper elevation={0} sx={{
                  p: { xs: 1.2, sm: 1.5, md: 1.8 }, borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                  border: "1px solid", borderColor: alpha(stat.color, 0.2), position: "relative", overflow: "hidden",
                  height: "100%", minHeight: { xs: 80, sm: 85, md: 90 }, display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h6" fontWeight={700} sx={{ color: stat.color, mt: 0.5, fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem", lg: "1.1rem" }, wordBreak: "break-word" }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: alpha(stat.color, 0.1), color: stat.color, width: { xs: 32, sm: 36, md: 40 }, height: { xs: 32, sm: 36, md: 40 }, "& svg": { fontSize: { xs: 16, sm: 18, md: 20 } } }}>
                      {stat.icon}
                    </Avatar>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container> */}

      {/* Type Tabs + Status Filters + Search */}
      <Container maxWidth="xl" sx={{ mt:2,pb: 1.5, px: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Type Tabs */}
        <Paper elevation={0} sx={{ p: 0.7, borderRadius: 2.5, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1.2, display: "flex", gap: 0.5 }}>
          {TYPE_TABS.map(({ key, label }) => (
            <Box key={key} onClick={() => setActiveTypeTab(key)} sx={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.8,
              py: 0.8, px: { xs: 0.5, sm: 1.5 }, borderRadius: 1.8, cursor: "pointer", transition: "all 0.2s",
              bgcolor: activeTypeTab === key ? theme.palette.primary.main : "transparent",
              color: activeTypeTab === key ? "#fff" : "text.secondary",
              "&:hover": { bgcolor: activeTypeTab === key ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.06) },
            }}>
              <Typography sx={{ fontSize: { xs: "0.65rem", sm: "0.72rem" }, fontWeight: 700 }}>{label}</Typography>
              <Box sx={{ px: 0.7, py: 0.15, borderRadius: 10, bgcolor: activeTypeTab === key ? alpha("#fff", 0.25) : alpha(theme.palette.primary.main, 0.1), minWidth: 18, textAlign: "center" }}>
                <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: activeTypeTab === key ? "#fff" : theme.palette.primary.main }}>
                  {typeCounts[key]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Status Pills + Search + Date Range */}
        <Paper elevation={0} sx={{ p: { xs: 1.2, sm: 1.5 }, borderRadius: 2.5, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1.5 }}>
          {/* Status pills */}
          <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1.2 }}>
            {STATUS_FILTERS.map(({ key, label, color }) => (
              <Box key={key} onClick={() => setActiveStatus(key)} sx={{
                display: "flex", alignItems: "center", gap: 0.5, px: 1.1, py: 0.45,
                borderRadius: 10, cursor: "pointer", border: "1.5px solid", transition: "all 0.18s",
                borderColor: activeStatus === key ? color : alpha(color, 0.25),
                bgcolor: activeStatus === key ? alpha(color, 0.1) : "transparent",
              }}>
                <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, fontWeight: 700, color: activeStatus === key ? color : "text.secondary" }}>{label}</Typography>
                <Box sx={{ px: 0.6, py: 0.15, borderRadius: 10, bgcolor: activeStatus === key ? alpha(color, 0.2) : alpha("#000", 0.06) }}>
                  <Typography sx={{ fontSize: "0.56rem", fontWeight: 800, color: activeStatus === key ? color : "text.secondary" }}>
                    {statusCounts[key] ?? 0}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          
          {/* Search and Date Range */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <TextField
              placeholder="Search by plan, description, coupon…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: 180, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.72rem" } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 15, color: "text.secondary" }} /></InputAdornment>,
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery("")}><ClearIcon sx={{ fontSize: 13 }} /></IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              size="small"
              label="From"
              InputLabelProps={{ shrink: true }}
              sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.72rem" } }}
            />
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              size="small"
              label="To"
              InputLabelProps={{ shrink: true }}
              sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.72rem" } }}
            />
            <Button size="small" variant="contained" onClick={applyDateFilter} disabled={!startDate && !endDate}
              sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>
              Apply
            </Button>
            {(appliedStart || appliedEnd) && (
              <Button size="small" variant="outlined" color="error" onClick={clearDateFilter}
                sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>
                Clear
              </Button>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Transactions List */}
      <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
        {historyLoading ? (
          <Box sx={{ width: "100%", mt: 3 }}>
            <LinearProgress sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main } }} />
            <Typography textAlign="center" sx={{ mt: 1.5 }} color="text.secondary" fontSize={{ xs: "0.7rem", sm: "0.75rem" }}>Loading transactions...</Typography>
          </Box>
        ) : sortedTransactions.length > 0 ? (
          <Paper elevation={0} sx={{ borderRadius: { xs: 1.5, sm: 2, md: 2.5 }, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden" }}>
            {viewMode === "table" ? (
              <>
                <TableContainer sx={{
                  overflowX: "auto", maxHeight: { xs: "450px", sm: "500px", md: "550px" },
                  "&::-webkit-scrollbar": { width: "4px", height: "4px" },
                  "&::-webkit-scrollbar-thumb": { backgroundColor: alpha(theme.palette.primary.main, 0.3), borderRadius: "2px" },
                }}>
                  <Table sx={{ minWidth: isMobile ? 750 : isTablet ? 850 : 950 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        {["#", "Type", "Plan", "Description", "Date", "Amount", "Coupon", "Status", "Actions"].map((h) => (
                          <TableCell key={h} sx={{ fontWeight: 600, fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: theme.palette.primary.main, py: 1.5, whiteSpace: "nowrap" }}>{h}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {sortedTransactions.map((transaction, index) => (
                          <motion.tr key={transaction._id || index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                            <TableCell sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, py: 1.2, color: "text.disabled" }}>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <TypeBadge type={transaction.type} />
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              {transaction.planId ? (
                                <Box>
                                  <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.primary" }}>
                                    {transaction.planId.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } }}>
                                    {transaction.duration || transaction.planId.duration}
                                  </Typography>
                                </Box>
                              ) : "—"}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.primary", maxWidth: 160 }}>
                                {transaction.description?.substring(0, 35) || `Payment for ${transaction.planId?.name || "Plan"}`}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.primary" }}>
                                {formatDate(transaction.createdAt)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                {formatTime(transaction.createdAt)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" fontWeight={600} sx={{ color: transaction.status === "completed" ? "#22c55e" : theme.palette.primary.main, fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}>
                                {formatAmount(transaction.amount)}
                              </Typography>
                              {transaction.discountAmount > 0 && (
                                <Typography sx={{ fontSize: "0.55rem", color: "#ef4444", textDecoration: "line-through" }}>
                                  {formatAmount(transaction.originalAmount)}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              {transaction.hasCouponApplied && transaction.couponCode ? (
                                <Tooltip title={`Saved ${formatAmount(transaction.savingsAmount || 0)}`}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                                    <CouponIcon sx={{ fontSize: 11, color: "#f59e0b" }} />
                                    <Typography sx={{ fontSize: "0.58rem", color: "#f59e0b", fontWeight: 700 }}>{transaction.couponCode}</Typography>
                                  </Box>
                                </Tooltip>
                              ) : (
                                <Typography sx={{ fontSize: "0.6rem", color: "text.disabled" }}>—</Typography>
                              )}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Chip icon={getStatusIcon(transaction.status)} label={transaction.status} size="small"
                                sx={{ bgcolor: alpha(getStatusColor(transaction.status), 0.1), color: getStatusColor(transaction.status), fontWeight: 600,
                                  fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" }, height: { xs: 22, sm: 24 },
                                  "& .MuiChip-icon": { fontSize: { xs: 12, sm: 13 } } }} />
                            </TableCell>
                            <TableCell align="right" sx={{ py: 1.2 }}>
                              <Tooltip title="View Receipt">
                                <IconButton size="small" onClick={() => { setSelectedTransaction(transaction); setShowReceipt(true); }}
                                  sx={{ color: theme.palette.primary.main, width: 30, height: 30 }}>
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
                  count={totalItems}  // Use server total count
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{
                    borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1),
                    ".MuiTablePagination-select": { borderRadius: 1.5, fontSize: { xs: "0.6rem", sm: "0.65rem" } },
                    ".MuiTablePagination-displayedRows": { fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } },
                    ".MuiTablePagination-selectLabel": { fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } },
                  }} 
                />
              </>
            ) : (
              /* Card View */
              <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
                <Stack spacing={1.5}>
                  <AnimatePresence>
                    {sortedTransactions.map((transaction, index) => (
                      <motion.div key={transaction._id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                        <Paper elevation={0} sx={{
                          p: { xs: 1.5, sm: 2 }, borderRadius: { xs: 1.5, sm: 2 }, border: "1px solid",
                          borderColor: alpha(theme.palette.primary.main, 0.1), cursor: "pointer", transition: "all 0.2s ease",
                          "&:hover": { borderColor: theme.palette.primary.main, boxShadow: `0 6px 15px -6px ${alpha(theme.palette.primary.main, 0.3)}` },
                        }} onClick={() => { setSelectedTransaction(transaction); setShowReceipt(true); }}>
                          {/* Card content same as before */}
                          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, mb: 1.5, gap: 0.8 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Avatar sx={{
                                bgcolor: transaction.type === "addon" ? alpha("#8b5cf6", 0.1) : alpha(theme.palette.primary.main, 0.1),
                                color: transaction.type === "addon" ? "#8b5cf6" : theme.palette.primary.main,
                                width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 },
                              }}>
                                {transaction.type === "addon" ? <AddonIcon sx={{ fontSize: 18 }} /> : <IncomeIcon sx={{ fontSize: 18 }} />}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.3 }}>
                                  <TypeBadge type={transaction.type} />
                                </Box>
                                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" }, wordBreak: "break-word", color: "text.primary" }}>
                                  {transaction.description?.substring(0, 40) || `Payment for ${transaction.planId?.name || "Plan"}`}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" } }}>
                                  <CalendarIcon sx={{ fontSize: 10, mr: 0.3, verticalAlign: "middle", color: theme.palette.primary.main }} />
                                  {formatDate(transaction.createdAt)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ textAlign: "right", width: { xs: "100%", sm: "auto" }, mt: { xs: 0.5, sm: 0 } }}>
                              <Typography variant="body1" fontWeight={700} sx={{ color: transaction.status === "completed" ? "#22c55e" : theme.palette.primary.main, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                                {formatAmount(transaction.amount)}
                              </Typography>
                              {transaction.discountAmount > 0 && (
                                <Typography sx={{ fontSize: "0.58rem", color: "#ef4444", textDecoration: "line-through" }}>
                                  {formatAmount(transaction.originalAmount)}
                                </Typography>
                              )}
                              <Chip icon={getStatusIcon(transaction.status)} label={transaction.status} size="small"
                                sx={{ mt: 0.3, bgcolor: alpha(getStatusColor(transaction.status), 0.1), color: getStatusColor(transaction.status), fontWeight: 600, fontSize: { xs: "0.55rem", sm: "0.6rem" }, height: { xs: 20, sm: 22 } }} />
                            </Box>
                          </Box>
                          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
                          <Grid container spacing={1.5}>
                            {transaction.planId && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>Plan</Typography>
                                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.primary" }}>
                                  {transaction.planId.name} {(transaction.duration || transaction.planId.duration) ? `(${transaction.duration || transaction.planId.duration})` : ""}
                                </Typography>
                              </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>Payment Method</Typography>
                              <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.primary" }}>
                                {transaction.paymentMethod || "—"}
                              </Typography>
                            </Grid>
                            {transaction.hasCouponApplied && transaction.couponCode && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>Coupon Applied</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <CouponIcon sx={{ fontSize: 12, color: "#f59e0b" }} />
                                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "#f59e0b" }}>
                                    {transaction.couponCode} · Saved {formatAmount(transaction.savingsAmount || 0)}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                            {transaction.expiresAt && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>
                                  {transaction.isExpired ? "Expired" : `Expires · ${transaction.remainingDays}d left`}
                                </Typography>
                                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: transaction.isExpired ? "#ef4444" : "text.primary" }}>
                                  {formatDate(transaction.expiresAt)}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Paper>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Stack>
              </Box>
            )}
          </Paper>
        ) : (
          <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3, md: 4 }, borderRadius: { xs: 1.5, sm: 2, md: 2.5 }, textAlign: "center", border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
            <HistoryIcon sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>No transactions found</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" } }}>
              {activeTypeTab !== "all" || activeStatus !== "all" || searchQuery
                ? "Try adjusting your filters"
                : "Your transaction history will appear here after making payments"}
            </Typography>
          </Paper>
        )}
      </Container>

      {selectedTransaction && (
        <ReceiptModal transaction={selectedTransaction} show={showReceipt} onHide={() => setShowReceipt(false)} />
      )}

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </Box>
  );
};

export default TransactionHistory;