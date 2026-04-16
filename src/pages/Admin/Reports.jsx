// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   Button,
//   TextField,
//   InputAdornment,
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
//   Tooltip,
//   Stack,
//   Chip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
//   Skeleton,
//   Menu,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Search as SearchIcon,
//   Download as DownloadIcon,
//   Assessment as ReportIcon,
//   Event as EventIcon,
//   CheckCircle as CheckInIcon,
//   Cancel as CheckOutIcon,
//   Speed as DistanceIcon,
//   Person as PersonIcon,
//   CalendarToday as CalendarIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Close as CloseIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getReportsByAdmin } from "../../redux/slices/reportSlice";
// import { formatDateTimeDDMMYYYY, formatDateDDMMYYYY } from "../../utils/dateFormat";
// import { useDebounce } from "../../Hooks/useDebounce";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { toast } from "react-toastify";

// // Search and Filter Skeleton - Matching UserManagement style
// const SearchFilterSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 1.5 },
//         mb: { xs: 2, sm: 2.5 },
//         borderRadius: { xs: 2, sm: 2.5 },
//         border: '1px solid',
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       <Grid container spacing={1.5} alignItems="center">
//         <Grid item xs={12} md={6}>
//           <Skeleton
//             variant="rounded"
//             height={isMobile ? 38 : 48}
//             sx={{ borderRadius: { xs: 2, sm: 2.5 }, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box sx={{
//             display: 'flex',
//             gap: 1,
//             justifyContent: { xs: 'flex-start', md: 'flex-end' },
//             flexWrap: 'wrap'
//           }}>
//             <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Table Row Skeleton - Matching UserManagement style
// const TableRowSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <TableRow>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="rounded" width={100} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="rounded" width={100} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width={55} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//     </TableRow>
//   );
// };

// // Mobile Card View Skeleton - Matching UserManagement style
// const MobileCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//       {[1, 2, 3].map((item) => (
//         <Card
//           key={item}
//           sx={{
//             mb: 1.5,
//             borderRadius: 2.5,
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//             {/* Header with Index */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//               <Skeleton variant="rounded" width={45} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="rounded" width={70} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>

//             {/* User Info */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//               <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>

//             {/* Check In/Out Times */}
//             <Grid container spacing={1} sx={{ mb: 1.5 }}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                   <Skeleton variant="text" width={35} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={12} height={12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                     <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                   <Skeleton variant="text" width={40} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={12} height={12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                     <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>

//             {/* Distance */}
//             <Box sx={{
//               bgcolor: alpha(theme.palette.primary.main, 0.03),
//               p: 0.8,
//               borderRadius: 1.5,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}>
//               <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// // Header Button Skeleton
// const HeaderButtonSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Skeleton
//       variant="rounded"
//       width={isMobile ? '100%' : 120}
//       height={isMobile ? 34 : 36}
//       sx={{
//         borderRadius: 1.5,
//         minWidth: { xs: '100%', sm: 120 },
//         bgcolor: alpha(theme.palette.primary.main, 0.2),
//       }}
//     />
//   );
// };

// // Mobile Card View Component - Matching UserManagement style
// const MobileCardView = ({ reports, currentPage, rowsPerPage }) => {
//   const theme = useTheme();

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "checked in":
//         return <CheckInIcon sx={{ color: "#22c55e", fontSize: 14 }} />;
//       case "checked out":
//         return <CheckOutIcon sx={{ color: "#ef4444", fontSize: 14 }} />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "checked in":
//         return "#22c55e";
//       case "checked out":
//         return "#ef4444";
//       default:
//         return theme.palette.text.secondary;
//     }
//   };

//   const formatDisplayDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//       <AnimatePresence>
//         {reports.map((report, index) => {
//           const globalIndex = currentPage * rowsPerPage + index + 1;

//           return (
//             <motion.div
//               key={report._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//             >
//               <Card
//                 sx={{
//                   mb: 1.5,
//                   borderRadius: 2.5,
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   bgcolor: index % 2 === 0 ? "background.paper" : alpha(theme.palette.primary.main, 0.02),
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
//                     borderColor: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//                   {/* Header with Index */}
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//                     <Chip
//                       label={`#${globalIndex}`}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                         fontWeight: 600,
//                         fontSize: '0.6rem',
//                         height: 20,
//                       }}
//                     />
//                     {report.tracker?.status && (
//                       <Chip
//                         icon={getStatusIcon(report.tracker.status)}
//                         label={report.tracker.status}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
//                           color: getStatusColor(report.tracker.status),
//                           fontWeight: 600,
//                           fontSize: '0.6rem',
//                           height: 20,
//                         }}
//                       />
//                     )}
//                   </Box>

//                   {/* User Info */}
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                     <Avatar
//                       src={report.user?.avtar}
//                       sx={{
//                         width: { xs: 40, sm: 44 },
//                         height: { xs: 40, sm: 44 },
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                         border: '2px solid',
//                         borderColor: alpha(theme.palette.primary.main, 0.2),
//                       }}
//                     >
//                       {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 16 }} />}
//                     </Avatar>
//                     <Box sx={{ minWidth: 0 }}>
//                       <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: '0.85rem', color: 'text.primary' }}>
//                         {report.user?.name || "-"}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '0.65rem' }}>
//                         {report.user?.email || "-"}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Check In/Out Times */}
//                   <Grid container spacing={1} sx={{ mb: 1.5 }}>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 1.5 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                           Check In
//                         </Typography>
//                         {report.check_in_time ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                             <EventIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
//                             <Typography variant="body2" noWrap sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                               {formatDisplayDate(report.check_in_time)}
//                             </Typography>
//                           </Box>
//                         ) : (
//                           <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                         )}
//                       </Box>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 1.5 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                           Check Out
//                         </Typography>
//                         {report.check_out_time ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                             <EventIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
//                             <Typography variant="body2" noWrap sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                               {formatDisplayDate(report.check_out_time)}
//                             </Typography>
//                           </Box>
//                         ) : (
//                           <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                         )}
//                       </Box>
//                     </Grid>
//                   </Grid>

//                   {/* Distance */}
//                   <Box sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.03),
//                     p: 1,
//                     borderRadius: 1.5,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}>
//                     <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                     <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
//                       {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "N/A"}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </AnimatePresence>
//     </Box>
//   );
// };

// const Reports = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   const { reports = [], pagination = {}, loading = false } = useSelector((state) => state.report || {});

//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [sortOrder, setSortOrder] = useState("desc");

//   const debouncedSearchQuery = useDebounce(searchQuery, 500);
//   const today = new Date();
//   today.setHours(23, 59, 59, 999);
  
//   // Get user role and effective adminId
//   const storedUser = localStorage.getItem('user');
//   const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//   const role_id = parsedUser?.role_id;
//   const rawAdminId = parsedUser?.adminId;
//   const resolvedAdminId = typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId;
//   const effectiveAdminId = Number(role_id) === 3 ? resolvedAdminId : (parsedUser?._id || parsedUser?.id);

//   useEffect(() => {
//     dispatch(
//       getReportsByAdmin({
//         page: currentPage + 1,
//         limit: rowsPerPage,
//         search: debouncedSearchQuery || undefined,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//         adminId: effectiveAdminId,
//       })
//     );

//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch, currentPage, rowsPerPage, dateRange, debouncedSearchQuery]);

//   // Memoized sorted reports
//   const sortedReports = useMemo(() => {
//     if (!reports || reports.length === 0) return [];

//     return [...reports].sort((a, b) => {
//       // Use check_in_time for sorting, fallback to createdAt
//       const dateA = new Date(a.check_in_time || a.createdAt || 0);
//       const dateB = new Date(b.check_in_time || b.createdAt || 0);

//       if (sortOrder === 'asc') {
//         return dateA - dateB;
//       } else {
//         return dateB - dateA;
//       }
//     });
//   }, [reports, sortOrder]);

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleDateFilterClick = (event) => {
//     setDateFilterAnchor(event.currentTarget);
//   };

//   const handleDateFilterClose = () => {
//     setDateFilterAnchor(null);
//   };

//   const applyDateFilter = () => {
//     setDateRange({
//       fromDate: startDate ? startDate.toISOString().split('T')[0] : "",
//       toDate: endDate ? endDate.toISOString().split('T')[0] : ""
//     });
//     handleDateFilterClose();
//     setCurrentPage(0);
//   };

//   const clearDateFilter = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setDateRange({ fromDate: "", toDate: "" });
//     handleDateFilterClose();
//     setCurrentPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(0);
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setCurrentPage(0);
//   };

//   const handleSort = () => {
//     setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
//   };

//   const handleClearAllFilters = () => {
//     // Clear search
//     setSearchQuery("");
//     // Clear date filters
//     setStartDate(null);
//     setEndDate(null);
//     setDateRange({ fromDate: "", toDate: "" });
//     // Reset sort to default (desc - latest first)
//     setSortOrder("desc");
//     // Reset to first page
//     setCurrentPage(0);
//     // Close date filter menu if open
//     if (dateFilterAnchor) {
//       handleDateFilterClose();
//     }
//     // Show success toast
//     toast.success("All filters cleared successfully", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   const handleDownloadPDF = async () => {
//     setIsDownloading(true);

//     try {
//       const doc = new jsPDF();

//       doc.setFontSize(18);
//       doc.setTextColor(theme.palette.primary.main);
//       doc.setFont(undefined, "bold");
//       doc.text("Team Trackify", 105, 15, { align: "center" });

//       doc.setFont(undefined, "normal");
//       doc.setTextColor(0, 0, 0);

//       doc.setFontSize(16);
//       doc.text("User Reports", 105, 25, { align: "center" });

//       doc.setFontSize(10);
//       doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 35, {
//         align: "center",
//       });

//       if (dateRange.fromDate || dateRange.toDate) {
//         doc.setFontSize(10);
//         doc.text(
//           `Date range: ${dateRange.fromDate
//             ? formatDateDDMMYYYY(dateRange.fromDate)
//             : "Start"
//           } - ${dateRange.toDate
//             ? formatDateDDMMYYYY(dateRange.toDate)
//             : "End"
//           }`,
//           105,
//           45,
//           { align: "center" }
//         );
//       }

//       const headers = [
//         "#",
//         "User Name",
//         "Email",
//         "Check In",
//         "Check Out",
//         "Distance (km)",
//         "Status",
//       ];

//       const data = sortedReports.map((report, index) => [
//         index + 1,
//         report.user?.name || "-",
//         report.user?.email || "-",
//         report.check_in_time
//           ? formatDateTimeDDMMYYYY(report.check_in_time)
//           : "-",
//         report.check_out_time
//           ? formatDateTimeDDMMYYYY(report.check_out_time)
//           : "-",
//         report.tracker?.total_distance
//           ? `${report.tracker.total_distance.toFixed(2)}`
//           : "-",
//         report.tracker?.status || "-",
//       ]);

//       autoTable(doc, {
//         head: [headers],
//         body: data,
//         startY: dateRange.fromDate || dateRange.toDate ? 55 : 45,
//         styles: {
//           cellPadding: 2,
//           fontSize: 9,
//           valign: "middle",
//           halign: "left",
//         },
//         headStyles: {
//           fillColor: [37, 99, 235],
//           textColor: 255,
//           fontStyle: "bold",
//         },
//         alternateRowStyles: {
//           fillColor: [240, 240, 240],
//         },
//       });

//       const filename = `user-reports-${new Date().toISOString().split("T")[0]}.pdf`;
//       doc.save(filename);

//       toast.success("PDF downloaded successfully");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       toast.error("Failed to download PDF");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "checked in":
//         return <CheckInIcon sx={{ color: "#22c55e", fontSize: 14 }} />;
//       case "checked out":
//         return <CheckOutIcon sx={{ color: "#ef4444", fontSize: 14 }} />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "checked in":
//         return "#22c55e";
//       case "checked out":
//         return "#ef4444";
//       default:
//         return theme.palette.text.secondary;
//     }
//   };

//   const formatDisplayDate = (dateString) => {
//     if (!dateString) return "-";
//     return formatDateDDMMYYYY(dateString);
//   };

//   const formatDisplayDateTime = (dateString) => {
//     if (!dateString) return "-";
//     return formatDateTimeDDMMYYYY(dateString);
//   };

//   const hasActiveFilter = dateRange.fromDate || dateRange.toDate || searchQuery || sortOrder !== 'desc';

//   // If first render loader is active, show skeletons
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//         {/* Header with title */}
//         <Box sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: 'space-between',
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 2, sm: 2.5 },
//           gap: 2
//         }}>
//           <Box>
//             <Typography
//               variant={isMobile ? "h6" : "h5"}
//               fontWeight="700"
//               gutterBottom
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: {
//                   xs: '1rem',
//                   sm: '1.2rem',
//                   md: '1.4rem',
//                   lg: '1.6rem',
//                   xl: '1.8rem'
//                 },
//               }}
//             >
//               User Reports
//             </Typography>
//           </Box>

//           {/* Button skeleton */}
//           <HeaderButtonSkeleton isMobile={isMobile} />
//         </Box>

//         {/* Search and Filters Skeleton */}
//         <SearchFilterSkeleton isMobile={isMobile} />

//         {/* Reports Table/Card View Skeleton */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             overflow: "hidden",
//           }}
//         >
//           {isMobile ? (
//             <MobileCardSkeleton />
//           ) : (
//             <>
//               <TableContainer>
//                 <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>#</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>User</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Email</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Check In</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Check Out</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Distance</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {[1, 2, 3, 4, 5].map((item) => (
//                       <TableRowSkeleton key={item} />
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <Box sx={{ p: 1.5, borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                 <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </>
//           )}
//         </Paper>
//       </Box>
//     );
//   }

//   // Get paginated reports from sorted reports
//   const paginatedReports = sortedReports.slice(
//     currentPage * rowsPerPage,
//     currentPage * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         justifyContent: 'space-between',
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         mb: { xs: 2, sm: 2.5 },
//         gap: 2
//       }}>
//         <Box>
//           <Typography
//             variant={isMobile ? "h6" : "h5"}
//             fontWeight="700"
//             gutterBottom
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: {
//                 xs: '1rem',
//                 sm: '1.2rem',
//                 md: '1.4rem',
//                 lg: '1.6rem',
//                 xl: '1.8rem'
//               },
//             }}
//           >
//             User Reports
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//             View all user check-in/check-out reports and activity
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={isDownloading ? <CircularProgress size={16} sx={{ color: "white" }} /> : <DownloadIcon sx={{ fontSize: 16 }} />}
//           onClick={handleDownloadPDF}
//           disabled={loading || isDownloading}
//           size="small"
//           sx={{
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             fontSize: { xs: '0.65rem', sm: '0.7rem' },
//             height: 34,
//             minWidth: { xs: '100%', sm: 120 },
//             '&:hover': {
//               background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//             },
//           }}
//         >
//           {isDownloading ? "Downloading..." : "Download PDF"}
//         </Button>
//       </Box>

//       {/* Search and Filters */}
//      <Paper
//   elevation={0}
//   sx={{
//     p: { xs: 1.5, sm: 1.5 },
//     mb: { xs: 2, sm: 2.5 },
//     borderRadius: { xs: 2, sm: 2.5 },
//     border: '1px solid',
//     borderColor: alpha(theme.palette.primary.main, 0.1),
//   }}
// >
//   <Box sx={{
//     display: 'flex',
//     alignItems: 'center',
//     gap: 1.5,
//     flexWrap: { xs: 'wrap', md: 'nowrap' }
//   }}>
//     {/* Search Field */}
//     <TextField
//       fullWidth
//       placeholder="Search reports..."
//       value={searchQuery}
//       onChange={handleSearchChange}
//       size="small"
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position="start">
//             <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//           </InputAdornment>
//         ),
//         endAdornment: searchQuery && (
//           <InputAdornment position="end">
//             <IconButton
//               size="small"
//               onClick={handleClearSearch}
//               sx={{ p: 0.5 }}
//             >
//               <CloseIcon sx={{ fontSize: 14 }} />
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//       sx={{
//         flex: 1,
//         minWidth: { xs: '100%', md: 200 },
//         '& .MuiOutlinedInput-root': {
//           borderRadius: { xs: 2, sm: 2.5 },
//           bgcolor: alpha(theme.palette.primary.main, 0.05),
//           fontSize: { xs: '0.75rem', sm: '0.8rem' },
//           height: 38,
//         },
//       }}
//     />

//     {/* Date Filter Button */}
//     <Button
//       variant="outlined"
//       startIcon={<CalendarIcon sx={{ fontSize: 16 }} />}
//       onClick={handleDateFilterClick}
//       size="small"
//       sx={{
//         flexShrink: 0,
//         borderColor: alpha(theme.palette.divider, 0.5),
//         color: 'text.secondary',
//         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//         height: 34,
//         position: 'relative',
//         whiteSpace: 'nowrap',
//         '&:hover': {
//           borderColor: theme.palette.primary.main,
//           color: theme.palette.primary.main,
//         },
//       }}
//     >
//       Date Filter
//       {(dateRange.fromDate || dateRange.toDate) && (
//         <Box
//           sx={{
//             position: 'absolute',
//             top: -2,
//             right: -2,
//             width: 6,
//             height: 6,
//             borderRadius: '50%',
//             bgcolor: '#ef4444',
//             border: '1px solid white',
//           }}
//         />
//       )}
//     </Button>

//     {/* Sort Button */}
//     <Button
//       variant="outlined"
//       startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />}
//       onClick={handleSort}
//       size="small"
//       sx={{
//         flexShrink: 0,
//         borderColor: alpha(theme.palette.divider, 0.5),
//         color: 'text.secondary',
//         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//         height: 34,
//         whiteSpace: 'nowrap',
//         '&:hover': {
//           borderColor: theme.palette.primary.main,
//           color: theme.palette.primary.main,
//         },
//       }}
//     >
//       Date {sortOrder === 'asc' ? '(Oldest)' : '(Latest)'}
//     </Button>

//     {/* Clear All Filters Button - Shows when any filter is active */}
//     {hasActiveFilter && (
//       <Button
//         variant="contained"
//         startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
//         onClick={handleClearAllFilters}
//         size="small"
//         sx={{
//           flexShrink: 0,
//           bgcolor: alpha(theme.palette.error.main, 0.1),
//           color: theme.palette.error.main,
//           fontSize: { xs: '0.65rem', sm: '0.7rem' },
//           height: 34,
//           whiteSpace: 'nowrap',
//           borderColor: alpha(theme.palette.error.main, 0.3),
//           '&:hover': {
//             bgcolor: alpha(theme.palette.error.main, 0.2),
//             borderColor: theme.palette.error.main,
//           },
//         }}
//       >
//         Clear All
//       </Button>
//     )}

//     {/* Results Count */}
//     <Button
//       variant="outlined"
//       size="small"
//       sx={{
//         flexShrink: 0,
//         borderColor: alpha(theme.palette.divider, 0.5),
//         color: 'text.secondary',
//         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//         height: 34,
//         whiteSpace: 'nowrap',
//         '&:hover': {
//           borderColor: theme.palette.primary.main,
//           color: theme.palette.primary.main,
//         },
//       }}
//     >
//       {sortedReports.length} Results
//     </Button>
//   </Box>
// </Paper>

//       {/* Date Filter Menu */}
//       <Menu
//         anchorEl={dateFilterAnchor}
//         open={Boolean(dateFilterAnchor)}
//         onClose={handleDateFilterClose}
//         PaperProps={{
//           sx: {
//             p: 1.5,
//             width: { xs: 240, sm: 260 },
//             borderRadius: { xs: 1.5, sm: 2 },
//             boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           },
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box sx={{ mb: 1.5 }}>
//             <Typography variant="caption" sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, fontWeight: 500, ml: 0.5 }}>
//               Start Date
//             </Typography>
//             <DatePicker
//               maxDate={today}
//               value={startDate}
//               onChange={setStartDate}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   size="small"
//                   placeholder="DD/MM/YYYY"
//                   sx={{
//                     '& .MuiInputBase-input': { fontSize: '0.7rem', py: 1 },
//                     '& .MuiOutlinedInput-root': { height: 36, borderRadius: 1.5 }
//                   }}
//                 />
//               )}
//             />
//           </Box>
//           <Box sx={{ mb: 1.5 }}>
//             <Typography variant="caption" sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, fontWeight: 500, ml: 0.5 }}>
//               End Date
//             </Typography>
//             <DatePicker
//               maxDate={today}
//               value={endDate}
//               onChange={setEndDate}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   size="small"
//                   placeholder="DD/MM/YYYY"
//                   sx={{
//                     '& .MuiInputBase-input': { fontSize: '0.7rem', py: 1 },
//                     '& .MuiOutlinedInput-root': { height: 36, borderRadius: 1.5 }
//                   }}
//                 />
//               )}
//             />
//           </Box>
//           <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//             <Button
//               size="small"
//               onClick={clearDateFilter}
//               sx={{
//                 fontSize: '0.65rem',
//                 color: 'text.secondary',
//                 height: 28,
//                 px: 1,
//                 borderRadius: 1.5,
//                 '&:hover': {
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 },
//               }}
//             >
//               Clear
//             </Button>
//             <Button
//               size="small"
//               variant="contained"
//               onClick={applyDateFilter}
//               sx={{
//                 fontSize: '0.65rem',
//                 bgcolor: theme.palette.primary.main,
//                 height: 28,
//                 px: 1.5,
//                 borderRadius: 1.5,
//                 '&:hover': { bgcolor: theme.palette.primary.dark },
//               }}
//             >
//               Apply
//             </Button>
//           </Box>
//         </LocalizationProvider>
//       </Menu>

//       {/* Reports Table/Card View */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: { xs: 2, sm: 2.5 },
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           overflow: 'hidden',
//         }}
//       >
//         {loading && (
//           <LinearProgress
//             sx={{
//               bgcolor: alpha(theme.palette.primary.main, 0.1),
//               "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main },
//               height: 2,
//             }}
//           />
//         )}

//         {!loading && sortedReports.length > 0 ? (
//           <>
//             {isMobile ? (
//               <MobileCardView
//                 reports={paginatedReports}
//                 currentPage={currentPage}
//                 rowsPerPage={rowsPerPage}
//               />
//             ) : (
//               <TableContainer sx={{
//                 overflowX: 'auto',
//                 maxHeight: { xs: '450px', sm: '500px', md: '550px' },
//                 '&::-webkit-scrollbar': {
//                   height: '6px',
//                   width: '6px',
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: '3px',
//                 },
//               }}>
//                 <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>#</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>User</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Email</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check In</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check Out</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Distance</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <AnimatePresence>
//                       {paginatedReports.map((report, index) => (
//                         <motion.tr
//                           key={report._id}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0 }}
//                           transition={{ duration: 0.2, delay: index * 0.02 }}
//                           style={{
//                             backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//                           }}
//                           onMouseEnter={(e) => {
//                             if (!isMobile) {
//                               e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
//                             }
//                           }}
//                           onMouseLeave={(e) => {
//                             if (!isMobile) {
//                               e.currentTarget.style.backgroundColor = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
//                             }
//                           }}
//                         >
//                           <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, py: 1.2 }}>
//                             {currentPage * rowsPerPage + index + 1}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                               <Avatar
//                                 src={report.user?.avtar}
//                                 sx={{
//                                   width: { xs: 30, sm: 32 },
//                                   height: { xs: 30, sm: 32 },
//                                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                   color: theme.palette.primary.main,
//                                 }}
//                               >
//                                 {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 14 }} />}
//                               </Avatar>
//                               <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
//                                 {report.user?.name || "-"}
//                               </Typography>
//                             </Box>
//                           </TableCell>
//                           <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, py: 1.2, color: 'text.secondary' }}>
//                             {report.user?.email || "-"}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             {report.check_in_time ? (
//                               <Tooltip title={formatDisplayDateTime(report.check_in_time)}>
//                                 <Chip
//                                   size="small"
//                                   icon={<EventIcon sx={{ fontSize: 14 }} />}
//                                   label={formatDisplayDate(report.check_in_time)}
//                                   sx={{
//                                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                     color: theme.palette.primary.main,
//                                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                                     height: 26,
//                                   }}
//                                 />
//                               </Tooltip>
//                             ) : (
//                               <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                             )}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             {report.check_out_time ? (
//                               <Tooltip title={formatDisplayDateTime(report.check_out_time)}>
//                                 <Chip
//                                   size="small"
//                                   icon={<EventIcon sx={{ fontSize: 14 }} />}
//                                   label={formatDisplayDate(report.check_out_time)}
//                                   sx={{
//                                     bgcolor: alpha(theme.palette.text.secondary, 0.1),
//                                     color: theme.palette.text.secondary,
//                                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                                     height: 26,
//                                   }}
//                                 />
//                               </Tooltip>
//                             ) : (
//                               <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                             )}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             {report.tracker?.total_distance ? (
//                               <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                                 <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                                 <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.primary' }}>
//                                   {report.tracker.total_distance.toFixed(2)} km
//                                 </Typography>
//                               </Box>
//                             ) : (
//                               <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                             )}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             {report.tracker?.status && (
//                               <Chip
//                                 icon={getStatusIcon(report.tracker.status)}
//                                 label={report.tracker.status}
//                                 size="small"
//                                 sx={{
//                                   bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
//                                   color: getStatusColor(report.tracker.status),
//                                   fontWeight: 600,
//                                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                                   height: 26,
//                                 }}
//                               />
//                             )}
//                           </TableCell>
//                         </motion.tr>
//                       ))}
//                     </AnimatePresence>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}

//             <TablePagination
//               component="div"
//               count={sortedReports.length}
//               page={currentPage}
//               onPageChange={handleChangePage}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               rowsPerPageOptions={[5, 10, 25, 50]}
//               sx={{
//                 borderTop: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 "& .MuiTablePagination-select": { borderRadius: 1.5, fontSize: '0.65rem' },
//                 '.MuiTablePagination-displayedRows': {
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                 },
//                 '.MuiTablePagination-selectLabel': {
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                 },
//               }}
//             />
//           </>
//         ) : !loading && (
//           <Box sx={{
//             p: { xs: 3, sm: 4, md: 5 },
//             textAlign: "center"
//           }}>
//             <ReportIcon sx={{
//               fontSize: { xs: 40, sm: 48, md: 56 },
//               color: alpha(theme.palette.primary.main, 0.2),
//               mb: 2
//             }} />
//             <Typography variant="body1" color="text.primary" fontWeight={500} gutterBottom sx={{ fontSize: '1rem' }}>
//               No reports found
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//               Try adjusting your search or date filters
//             </Typography>
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Reports;





////  New Api From Tracking session
// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   Button,
//   TextField,
//   InputAdornment,
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
//   Tooltip,
//   Chip,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
//   Skeleton,
//   Menu,
//   CircularProgress,
//   Divider,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Download as DownloadIcon,
//   Assessment as ReportIcon,
//   Event as EventIcon,
//   CheckCircle as CheckInIcon,
//   Cancel as CheckOutIcon,
//   Speed as DistanceIcon,
//   Person as PersonIcon,
//   CalendarToday as CalendarIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Close as CloseIcon,
//   Clear as ClearIcon,
//   Timeline as TimelineIcon,
// } from "@mui/icons-material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserReportsByAdminId, clearReports } from "../../redux/slices/reportSlice";
// import { formatDateTimeDDMMYYYY, formatDateDDMMYYYY, formatDateLocal } from "../../utils/dateFormat";
// import { useDebounce } from "../../Hooks/useDebounce";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { toast } from "react-toastify";

// // Summary Cards Component
// const SummaryCards = ({ summary, loading }) => {
//   const theme = useTheme();

//   const cards = [
//     {
//       title: "Total Distance",
//       value: summary?.totalDistance || 0,
//       unit: "km",
//       icon: <DistanceIcon sx={{ fontSize: 24 }} />,
//       color: theme.palette.primary.main,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//     },
//     {
//       title: "Total Sessions",
//       value: summary?.totalSessions || 0,
//       unit: "",
//       icon: <TimelineIcon sx={{ fontSize: 24 }} />,
//       color: theme.palette.success.main,
//       bgColor: alpha(theme.palette.success.main, 0.1),
//     },
//     {
//       title: "Total Duration",
//       value: summary?.totalDurationFormatted || "0 seconds",
//       unit: "",
//       icon: <EventIcon sx={{ fontSize: 24 }} />,
//       color: theme.palette.warning.main,
//       bgColor: alpha(theme.palette.warning.main, 0.1),
//     },
//   ];

//   return (
//     <Grid container spacing={2} sx={{ mb: 3 }}>
//       {cards.map((card, index) => (
//         <Grid item xs={12} sm={6} md={4} key={index}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               border: "1px solid",
//               borderColor: alpha(card.color, 0.2),
//               background: `linear-gradient(135deg, ${alpha(card.color, 0.05)}, ${alpha(card.color, 0.02)})`,
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-4px)",
//                 boxShadow: `0 8px 20px ${alpha(card.color, 0.15)}`,
//               },
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//               <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.7rem" }}>
//                 {card.title}
//               </Typography>
//               <Box sx={{ bgcolor: card.bgColor, borderRadius: 2, p: 0.5 }}>
//                 {card.icon}
//               </Box>
//             </Box>
//             {loading ? (
//               <Skeleton variant="text" width="80%" height={32} />
//             ) : (
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 sx={{
//                   color: card.color,
//                   fontSize: { xs: "1.25rem", sm: "1.5rem" },
//                 }}
//               >
//                 {typeof card.value === "number" ? card.value.toFixed(2) : card.value} {card.unit}
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// // Search and Filter Skeleton
// const SearchFilterSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 1.5 },
//         mb: { xs: 2, sm: 2.5 },
//         borderRadius: { xs: 2, sm: 2.5 },
//         border: '1px solid',
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       <Grid container spacing={1.5} alignItems="center">
//         <Grid item xs={12} md={6}>
//           <Skeleton
//             variant="rounded"
//             height={isMobile ? 38 : 48}
//             sx={{ borderRadius: { xs: 2, sm: 2.5 }, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box sx={{
//             display: 'flex',
//             gap: 1,
//             justifyContent: { xs: 'flex-start', md: 'flex-end' },
//             flexWrap: 'wrap'
//           }}>
//             <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Table Row Skeleton
// const TableRowSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <TableRow>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="rounded" width={100} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="rounded" width={100} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width={55} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell sx={{ py: 0.8 }}>
//         <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//     </TableRow>
//   );
// };

// // Mobile Card View Skeleton
// const MobileCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//       {[1, 2, 3].map((item) => (
//         <Card
//           key={item}
//           sx={{
//             mb: 1.5,
//             borderRadius: 2.5,
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//               <Skeleton variant="rounded" width={45} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="rounded" width={70} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//               <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>
//             <Grid container spacing={1} sx={{ mb: 1.5 }}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                   <Skeleton variant="text" width={35} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={12} height={12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                     <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                   <Skeleton variant="text" width={40} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={12} height={12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                     <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>
//             <Box sx={{
//               bgcolor: alpha(theme.palette.primary.main, 0.03),
//               p: 0.8,
//               borderRadius: 1.5,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}>
//               <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// // Header Button Skeleton
// const HeaderButtonSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Skeleton
//       variant="rounded"
//       width={isMobile ? '100%' : 120}
//       height={isMobile ? 34 : 36}
//       sx={{
//         borderRadius: 1.5,
//         minWidth: { xs: '100%', sm: 120 },
//         bgcolor: alpha(theme.palette.primary.main, 0.2),
//       }}
//     />
//   );
// };

// // Mobile Card View Component
// const MobileCardView = ({ reports, currentPage, rowsPerPage }) => {
//   const theme = useTheme();

//   const formatDisplayDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//       <AnimatePresence>
//         {reports.map((report, index) => {
//           const globalIndex = currentPage * rowsPerPage + index + 1;

//           return (
//             <motion.div
//               key={report._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//             >
//               <Card
//                 sx={{
//                   mb: 1.5,
//                   borderRadius: 2.5,
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   bgcolor: index % 2 === 0 ? "background.paper" : alpha(theme.palette.primary.main, 0.02),
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-2px)',
//                     boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
//                     borderColor: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//                   {/* Header with Index */}
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
//                     <Chip
//                       label={`#${globalIndex}`}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                         fontWeight: 600,
//                         fontSize: '0.6rem',
//                         height: 20,
//                       }}
//                     />
//                     <Chip
//                       label="Completed"
//                       size="small"
//                       sx={{
//                         bgcolor: alpha(theme.palette.success.main, 0.1),
//                         color: theme.palette.success.main,
//                         fontWeight: 600,
//                         fontSize: '0.6rem',
//                         height: 20,
//                       }}
//                     />
//                   </Box>

//                   {/* User Info */}
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                     <Avatar
//                       src={report.user?.avtar}
//                       sx={{
//                         width: { xs: 40, sm: 44 },
//                         height: { xs: 40, sm: 44 },
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                         border: '2px solid',
//                         borderColor: alpha(theme.palette.primary.main, 0.2),
//                       }}
//                     >
//                       {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 16 }} />}
//                     </Avatar>
//                     <Box sx={{ minWidth: 0 }}>
//                       <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: '0.85rem', color: 'text.primary' }}>
//                         {report.user?.name || "-"}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '0.65rem' }}>
//                         {report.user?.email || "-"}
//                       </Typography>
//                     </Box>
//                   </Box>

//                   {/* Check In/Out Times */}
//                   <Grid container spacing={1} sx={{ mb: 1.5 }}>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 1.5 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                           Check In
//                         </Typography>
//                         {report.check_in_time ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                             <CheckInIcon sx={{ color: "#22c55e", fontSize: 14 }} />
//                             <Typography variant="body2" noWrap sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                               {formatDisplayDate(report.check_in_time)}
//                             </Typography>
//                           </Box>
//                         ) : (
//                           <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                         )}
//                       </Box>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 1.5 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                           Check Out
//                         </Typography>
//                         {report.check_out_time ? (
//                           <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                             <CheckOutIcon sx={{ color: "#ef4444", fontSize: 14 }} />
//                             <Typography variant="body2" noWrap sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
//                               {formatDisplayDate(report.check_out_time)}
//                             </Typography>
//                           </Box>
//                         ) : (
//                           <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                         )}
//                       </Box>
//                     </Grid>
//                   </Grid>

//                   {/* Distance */}
//                   <Box sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.03),
//                     p: 1,
//                     borderRadius: 1.5,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                   }}>
//                     <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                     <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
//                       {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "0 km"}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </AnimatePresence>
//     </Box>
//   );
// };

// const Reports = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
//   const { reports = [], pagination = {}, loading = false, summary = {} } = useSelector((state) => state.report || {});

//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDownloading, setIsDownloading] = useState(false);
//   const [sortOrder, setSortOrder] = useState("desc");

//   const debouncedSearchQuery = useDebounce(searchQuery, 500);
//   const today = new Date();
//   today.setHours(23, 59, 59, 999);

//   // Get user role and effective adminId
//   const storedUser = localStorage.getItem('user');
//   const parsedUser = storedUser ? JSON.parse(storedUser) : null;
//   const role_id = parsedUser?.role_id;
//   const rawAdminId = parsedUser?.adminId;
//   const resolvedAdminId = typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId;
//   const effectiveAdminId = Number(role_id) === 3 ? resolvedAdminId : (parsedUser?._id || parsedUser?.id);

//   // Fetch reports using new API
//   useEffect(() => {
//     if (!effectiveAdminId) return;

//     dispatch(
//       getUserReportsByAdminId({
//         adminId: effectiveAdminId,
//         page: currentPage + 1,
//         limit: rowsPerPage,
//         search: debouncedSearchQuery || undefined,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//       })
//     );

//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch, currentPage, rowsPerPage, dateRange.fromDate, dateRange.toDate, debouncedSearchQuery, effectiveAdminId]);

//   // Memoized sorted reports
//   const sortedReports = useMemo(() => {
//     if (!reports || reports.length === 0) return [];

//     return [...reports].sort((a, b) => {
//       const dateA = new Date(a.check_in_time || a.createdAt || 0);
//       const dateB = new Date(b.check_in_time || b.createdAt || 0);

//       if (sortOrder === 'asc') {
//         return dateA - dateB;
//       } else {
//         return dateB - dateA;
//       }
//     });
//   }, [reports, sortOrder]);

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleDateFilterClick = (event) => {
//     setDateFilterAnchor(event.currentTarget);
//   };

//   const handleDateFilterClose = () => {
//     setDateFilterAnchor(null);
//   };

//   const applyDateFilter = () => {
//     const newDateRange = {
//       fromDate: startDate ? formatDateLocal(startDate) : "",
//       toDate: endDate ? formatDateLocal(endDate) : ""
//     };
//     setDateRange(newDateRange);
//     handleDateFilterClose();
//     setCurrentPage(0);
//   };

//   const clearDateFilter = () => {
//     setStartDate(null);
//     setEndDate(null);
//     setDateRange({ fromDate: "", toDate: "" });
//     handleDateFilterClose();
//     setCurrentPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(0);
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setCurrentPage(0);
//   };

//   const handleSort = () => {
//     setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
//   };

//   const handleClearAllFilters = () => {
//     setSearchQuery("");
//     setStartDate(null);
//     setEndDate(null);
//     setDateRange({ fromDate: "", toDate: "" });
//     setSortOrder("desc");
//     setCurrentPage(0);
//     if (dateFilterAnchor) {
//       handleDateFilterClose();
//     }
//     toast.success("All filters cleared successfully", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   const handleDownloadPDF = async () => {
//     setIsDownloading(true);

//     try {
//       const doc = new jsPDF();

//       doc.setFontSize(18);
//       doc.setTextColor(theme.palette.primary.main);
//       doc.setFont(undefined, "bold");
//       doc.text("Team Trackify", 105, 15, { align: "center" });

//       doc.setFont(undefined, "normal");
//       doc.setTextColor(0, 0, 0);

//       doc.setFontSize(16);
//       doc.text("User Reports", 105, 25, { align: "center" });

//       doc.setFontSize(10);
//       doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 35, {
//         align: "center",
//       });

//       if (dateRange.fromDate || dateRange.toDate) {
//         doc.setFontSize(10);
//         doc.text(
//           `Date range: ${dateRange.fromDate ? formatDateDDMMYYYY(dateRange.fromDate) : "Start"} - ${dateRange.toDate ? formatDateDDMMYYYY(dateRange.toDate) : "End"}`,
//           105,
//           45,
//           { align: "center" }
//         );
//       }

//       const headers = ["#", "User Name", "Email", "Check In", "Check Out", "Distance (km)", "Status"];

//       const data = sortedReports.map((report, index) => [
//         index + 1,
//         report.user?.name || "-",
//         report.user?.email || "-",
//         report.check_in_time ? formatDateTimeDDMMYYYY(report.check_in_time) : "-",
//         report.check_out_time ? formatDateTimeDDMMYYYY(report.check_out_time) : "-",
//         report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)}` : "-",
//         "Completed",
//       ]);

//       autoTable(doc, {
//         head: [headers],
//         body: data,
//         startY: dateRange.fromDate || dateRange.toDate ? 55 : 45,
//         styles: {
//           cellPadding: 2,
//           fontSize: 9,
//           valign: "middle",
//           halign: "left",
//         },
//         headStyles: {
//           fillColor: [37, 99, 235],
//           textColor: 255,
//           fontStyle: "bold",
//         },
//         alternateRowStyles: {
//           fillColor: [240, 240, 240],
//         },
//       });

//       const filename = `user-reports-${new Date().toISOString().split("T")[0]}.pdf`;
//       doc.save(filename);

//       toast.success("PDF downloaded successfully");
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       toast.error("Failed to download PDF");
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   const formatDisplayDate = (dateString) => {
//     if (!dateString) return "-";
//     return formatDateDDMMYYYY(dateString);
//   };

//   const formatDisplayDateTime = (dateString) => {
//     if (!dateString) return "-";
//     return formatDateTimeDDMMYYYY(dateString);
//   };

//   const hasActiveFilter = dateRange.fromDate || dateRange.toDate || searchQuery || sortOrder !== 'desc';

//   // First render loader
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//         <Box sx={{
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           justifyContent: 'space-between',
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           mb: { xs: 2, sm: 2.5 },
//           gap: 2
//         }}>
//           <Box>
//             <Typography
//               variant={isMobile ? "h6" : "h5"}
//               fontWeight="700"
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
//               }}
//             >
//               User Reports
//             </Typography>
//           </Box>
//           <HeaderButtonSkeleton isMobile={isMobile} />
//         </Box>
//         <SearchFilterSkeleton isMobile={isMobile} />
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             overflow: "hidden",
//           }}
//         >
//           {isMobile ? <MobileCardSkeleton /> : (
//             <>
//               <TableContainer>
//                 <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>#</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>User</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Email</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Check In</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Check Out</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Distance</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Status</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {[1, 2, 3, 4, 5].map((item) => (
//                       <TableRowSkeleton key={item} />
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//               <Box sx={{ p: 1.5, borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                 <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </>
//           )}
//         </Paper>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//       {/* Header */}
//       <Box sx={{
//         display: 'flex',
//         flexDirection: { xs: 'column', sm: 'row' },
//         justifyContent: 'space-between',
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         mb: { xs: 2, sm: 2.5 },
//         gap: 2
//       }}>
//         <Box>
//           <Typography
//             variant={isMobile ? "h6" : "h5"}
//             fontWeight="700"
//             gutterBottom
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
//             }}
//           >
//             User Reports
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//             View all user check-in/check-out reports and activity
//           </Typography>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={isDownloading ? <CircularProgress size={16} sx={{ color: "white" }} /> : <DownloadIcon sx={{ fontSize: 16 }} />}
//           onClick={handleDownloadPDF}
//           disabled={loading || isDownloading}
//           size="small"
//           sx={{
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             fontSize: { xs: '0.65rem', sm: '0.7rem' },
//             height: 34,
//             minWidth: { xs: '100%', sm: 120 },
//           }}
//         >
//           {isDownloading ? "Downloading..." : "Download PDF"}
//         </Button>
//       </Box>

//       {/* Summary Cards */}
//       <SummaryCards summary={summary} loading={loading} />

//       {/* Search and Filters */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 1.5, sm: 1.5 },
//           mb: { xs: 2, sm: 2.5 },
//           borderRadius: { xs: 2, sm: 2.5 },
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//         }}
//       >
//         <Box sx={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 1.5,
//           flexWrap: { xs: 'wrap', md: 'nowrap' }
//         }}>
//           <TextField
//             fullWidth
//             placeholder="Search by user name or email..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             size="small"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                 </InputAdornment>
//               ),
//               endAdornment: searchQuery && (
//                 <InputAdornment position="end">
//                   <IconButton size="small" onClick={handleClearSearch} sx={{ p: 0.5 }}>
//                     <CloseIcon sx={{ fontSize: 14 }} />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               flex: 1,
//               minWidth: { xs: '100%', md: 200 },
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: { xs: 2, sm: 2.5 },
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                 height: 38,
//               },
//             }}
//           />

//           <Button
//             variant="outlined"
//             startIcon={<CalendarIcon sx={{ fontSize: 16 }} />}
//             onClick={handleDateFilterClick}
//             size="small"
//             sx={{
//               flexShrink: 0,
//               borderColor: alpha(theme.palette.divider, 0.5),
//               color: 'text.secondary',
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 34,
//               position: 'relative',
//               whiteSpace: 'nowrap',
//             }}
//           >
//             Date Filter
//             {(dateRange.fromDate || dateRange.toDate) && (
//               <Box sx={{
//                 position: 'absolute',
//                 top: -2,
//                 right: -2,
//                 width: 6,
//                 height: 6,
//                 borderRadius: '50%',
//                 bgcolor: '#ef4444',
//                 border: '1px solid white',
//               }} />
//             )}
//           </Button>

//           <Button
//             variant="outlined"
//             startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />}
//             onClick={handleSort}
//             size="small"
//             sx={{
//               flexShrink: 0,
//               borderColor: alpha(theme.palette.divider, 0.5),
//               color: 'text.secondary',
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 34,
//               whiteSpace: 'nowrap',
//             }}
//           >
//             Date {sortOrder === 'asc' ? '(Oldest)' : '(Latest)'}
//           </Button>

//           {hasActiveFilter && (
//             <Button
//               variant="contained"
//               startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
//               onClick={handleClearAllFilters}
//               size="small"
//               sx={{
//                 flexShrink: 0,
//                 bgcolor: alpha(theme.palette.error.main, 0.1),
//                 color: theme.palette.error.main,
//                 fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                 height: 34,
//                 whiteSpace: 'nowrap',
//               }}
//             >
//               Clear All
//             </Button>
//           )}

//           <Button
//             variant="outlined"
//             size="small"
//             sx={{
//               flexShrink: 0,
//               borderColor: alpha(theme.palette.divider, 0.5),
//               color: 'text.secondary',
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 34,
//               whiteSpace: 'nowrap',
//             }}
//           >
//             {pagination?.totalItems || sortedReports.length} Results
//           </Button>
//         </Box>
//       </Paper>

//       {/* Date Filter Menu */}
//       <Menu
//         anchorEl={dateFilterAnchor}
//         open={Boolean(dateFilterAnchor)}
//         onClose={handleDateFilterClose}
//         PaperProps={{
//           sx: {
//             p: 1.5,
//             width: { xs: 240, sm: 260 },
//             borderRadius: { xs: 1.5, sm: 2 },
//             boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           },
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box sx={{ mb: 1.5 }}>
//             <Typography variant="caption" sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, fontWeight: 500, ml: 0.5 }}>
//               Start Date
//             </Typography>
//             <DatePicker
//               maxDate={today}
//               value={startDate}
//               onChange={setStartDate}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   size="small"
//                   placeholder="DD/MM/YYYY"
//                   sx={{
//                     '& .MuiInputBase-input': { fontSize: '0.7rem', py: 1 },
//                     '& .MuiOutlinedInput-root': { height: 36, borderRadius: 1.5 }
//                   }}
//                 />
//               )}
//             />
//           </Box>
//           <Box sx={{ mb: 1.5 }}>
//             <Typography variant="caption" sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, fontWeight: 500, ml: 0.5 }}>
//               End Date
//             </Typography>
//             <DatePicker
//               maxDate={today}
//               value={endDate}
//               onChange={setEndDate}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   size="small"
//                   placeholder="DD/MM/YYYY"
//                   sx={{
//                     '& .MuiInputBase-input': { fontSize: '0.7rem', py: 1 },
//                     '& .MuiOutlinedInput-root': { height: 36, borderRadius: 1.5 }
//                   }}
//                 />
//               )}
//             />
//           </Box>
//           <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//             <Button size="small" onClick={clearDateFilter} sx={{ fontSize: '0.65rem', color: 'text.secondary', height: 28 }}>
//               Clear
//             </Button>
//             <Button size="small" variant="contained" onClick={applyDateFilter} sx={{ fontSize: '0.65rem', bgcolor: theme.palette.primary.main, height: 28 }}>
//               Apply
//             </Button>
//           </Box>
//         </LocalizationProvider>
//       </Menu>

//       {/* Reports Table/Card View */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: { xs: 2, sm: 2.5 },
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           overflow: 'hidden',
//         }}
//       >
//         {loading && <LinearProgress sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main }, height: 2 }} />}

//         {!loading && sortedReports.length > 0 ? (
//           <>
//             {isMobile ? (
//               <MobileCardView reports={sortedReports} currentPage={currentPage} rowsPerPage={rowsPerPage} />
//             ) : (
//               <TableContainer sx={{
//                 overflowX: 'auto',
//                 maxHeight: { xs: '450px', sm: '500px', md: '550px' },
//               }}>
//                 <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>#</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>User</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Email</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check In</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check Out</TableCell>
//                       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Distance</TableCell>
//                       {/* <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Status</TableCell> */}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <AnimatePresence>
//                       {sortedReports.map((report, index) => (
//                         <motion.tr
//                           key={report._id}
//                           initial={{ opacity: 0, y: 10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0 }}
//                           transition={{ duration: 0.2, delay: index * 0.02 }}
//                           style={{
//                             backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//                           }}
//                         >
//                           <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, py: 1.2 }}>
//                             {currentPage * rowsPerPage + index + 1}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                               <Avatar
//                                 src={report.user?.avtar}
//                                 sx={{
//                                   width: { xs: 30, sm: 32 },
//                                   height: { xs: 30, sm: 32 },
//                                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                   color: theme.palette.primary.main,
//                                 }}
//                               >
//                                 {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 14 }} />}
//                               </Avatar>
//                               <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: 'text.primary' }}>
//                                 {report.user?.name || "-"}
//                               </Typography>
//                             </Box>
//                           </TableCell>
//                           <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, py: 1.2, color: 'text.secondary' }}>
//                             {report.user?.email || "-"}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             {report.check_in_time ? (
//                               <Tooltip title={formatDisplayDateTime(report.check_in_time)}>
//                                 <Chip
//                                   size="small"
//                                   icon={<EventIcon sx={{ fontSize: 14 }} />}
//                                   label={formatDisplayDate(report.check_in_time)}
//                                   sx={{
//                                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                     color: theme.palette.primary.main,
//                                     fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                                     height: 26,
//                                   }}
//                                 />
//                               </Tooltip>
//                             ) : (
//                               <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                             )}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             {report.check_out_time ? (
//                               <Tooltip title={formatDisplayDateTime(report.check_out_time)}>
//                                 <Chip
//                                   size="small"
//                                   icon={<EventIcon sx={{ fontSize: 14 }} />}
//                                   label={formatDisplayDate(report.check_out_time)}
//                                   sx={{
//                                     bgcolor: alpha(theme.palette.text.secondary, 0.1),
//                                     color: theme.palette.text.secondary,
//                                     fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                                     height: 26,
//                                   }}
//                                 />
//                               </Tooltip>
//                             ) : (
//                               <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
//                             )}
//                           </TableCell>
//                           <TableCell sx={{ py: 1.2 }}>
//                             {report.tracker?.total_distance ? (
//                               <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                                 <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                                 <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
//                                   {report.tracker.total_distance.toFixed(2)} km
//                                 </Typography>
//                               </Box>
//                             ) : (
//                               <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>0 km</Typography>
//                             )}
//                           </TableCell>
//                           {/* <TableCell sx={{ py: 1.2 }}>
//                             <Chip
//                               label="Completed"
//                               size="small"
//                               sx={{
//                                 bgcolor: alpha(theme.palette.success.main, 0.1),
//                                 color: theme.palette.success.main,
//                                 fontWeight: 600,
//                                 fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                                 height: 26,
//                               }}
//                             />
//                           </TableCell> */}
//                         </motion.tr>
//                       ))}
//                     </AnimatePresence>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             )}

//             <TablePagination
//               component="div"
//               count={pagination?.totalItems || 0}
//               page={currentPage}
//               onPageChange={handleChangePage}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               rowsPerPageOptions={[5, 10, 25, 50]}
//               sx={{
//                 borderTop: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//               }}
//             />
//           </>
//         ) : !loading && (
//           <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, textAlign: "center" }}>
//             <ReportIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 }, color: alpha(theme.palette.primary.main, 0.2), mb: 2 }} />
//             <Typography variant="body1" color="text.primary" fontWeight={500} gutterBottom>
//               No reports found
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               Try adjusting your search or date filters
//             </Typography>
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Reports;




import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  TextField,
  InputAdornment,
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
  Tooltip,
  Chip,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Menu,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  Assessment as ReportIcon,
  Event as EventIcon,
  CheckCircle as CheckInIcon,
  Cancel as CheckOutIcon,
  Speed as DistanceIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Close as CloseIcon,
  Clear as ClearIcon,
  Timeline as TimelineIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getUserReportsByAdminId, clearReports } from "../../redux/slices/reportSlice";
import { formatDateTimeDDMMYYYY, formatDateDDMMYYYY, formatDateLocal } from "../../utils/dateFormat";
import { useDebounce } from "../../Hooks/useDebounce";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

// Summary Cards Component
// const SummaryCards = ({ summary, loading }) => {
//   const theme = useTheme();

//   const cards = [
//     {
//       title: "Total Distance",
//       value: summary?.totalDistance || 0,
//       unit: "km",
//       icon: <DistanceIcon sx={{ fontSize: 24 }} />,
//       color: theme.palette.primary.main,
//       bgColor: alpha(theme.palette.primary.main, 0.1),
//     },
//     {
//       title: "Total Sessions",
//       value: summary?.totalSessions || 0,
//       unit: "",
//       icon: <TimelineIcon sx={{ fontSize: 24 }} />,
//       color: theme.palette.success.main,
//       bgColor: alpha(theme.palette.success.main, 0.1),
//     },
//     {
//       title: "Total Duration",
//       value: summary?.totalDurationFormatted || "0 seconds",
//       unit: "",
//       icon: <EventIcon sx={{ fontSize: 24 }} />,
//       color: theme.palette.warning.main,
//       bgColor: alpha(theme.palette.warning.main, 0.1),
//     },
//   ];

//   return (
//     <Grid container spacing={2} sx={{ mb: 3 }}>
//       {cards.map((card, index) => (
//         <Grid item xs={12} sm={6} md={4} key={index}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               border: "1px solid",
//               borderColor: alpha(card.color, 0.2),
//               background: `linear-gradient(135deg, ${alpha(card.color, 0.05)}, ${alpha(card.color, 0.02)})`,
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-4px)",
//                 boxShadow: `0 8px 20px ${alpha(card.color, 0.15)}`,
//               },
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//               <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500, fontSize: "0.7rem" }}>
//                 {card.title}
//               </Typography>
//               <Box sx={{ bgcolor: card.bgColor, borderRadius: 2, p: 0.5 }}>
//                 {card.icon}
//               </Box>
//             </Box>
//             {loading ? (
//               <Skeleton variant="text" width="80%" height={32} />
//             ) : (
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 sx={{
//                   color: card.color,
//                   fontSize: { xs: "1.25rem", sm: "1.5rem" },
//                 }}
//               >
//                 {typeof card.value === "number" ? card.value.toFixed(2) : card.value} {card.unit}
//               </Typography>
//             )}
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };
const SummaryCards = ({ summary, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const cards = [
    {
      title: "Total Distance",
      value: summary?.totalDistance || 0,
      unit: "km",
      icon: <DistanceIcon sx={{ fontSize: isMobile ? 18 : 24 }} />,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1),
    },
    {
      title: "Total Sessions",
      value: summary?.totalSessions || 0,
      unit: "",
      icon: <TimelineIcon sx={{ fontSize: isMobile ? 18 : 24 }} />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1),
    },
    {
      title: "Total Duration",
      value: summary?.totalDurationFormatted || "0 seconds",
      unit: "",
      icon: <EventIcon sx={{ fontSize: isMobile ? 18 : 24 }} />,
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1),
    },
  ];

  // Helper function to format duration text for different screen sizes
  const formatDurationText = (durationText) => {
    if (!durationText) return "0 seconds";
    
    // For mobile, shorten the text
    if (isMobile) {
      // Replace "hours" with "h", "minutes" with "m", "seconds" with "s"
      let shortened = durationText
        .replace(/hours?/g, 'h')
        .replace(/minutes?/g, 'm')
        .replace(/seconds?/g, 's')
        .replace(/\s+/g, ' ');
      
      // Further shorten if still too long
      if (shortened.length > 20) {
        // Remove spaces between units
        shortened = shortened.replace(/\s/g, '');
      }
      
      return shortened;
    }
    
    // For tablet, slightly shorten
    if (isTablet) {
      return durationText
        .replace(/hours?/g, 'h')
        .replace(/minutes?/g, 'm')
        .replace(/seconds?/g, 's');
    }
    
    return durationText;
  };

  return (
    <Grid 
      container 
      spacing={isMobile ? 1.5 : 2} 
      sx={{ 
        mb: isMobile ? 2 : 3,
        px: { xs: 0, sm: 0 }
      }}
    >
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: isMobile ? 1.5 : 2,
              borderRadius: isMobile ? 2 : 3,
              border: "1px solid",
              borderColor: alpha(card.color, 0.2),
              background: `linear-gradient(135deg, ${alpha(card.color, 0.05)}, ${alpha(card.color, 0.02)})`,
              transition: "all 0.3s ease",
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              "&:hover": {
                transform: isMobile ? "translateY(-2px)" : "translateY(-4px)",
                boxShadow: `0 ${isMobile ? 4 : 8}px ${isMobile ? 12 : 20}px ${alpha(card.color, 0.15)}`,
              },
            }}
          >
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between", 
              mb: isMobile ? 0.75 : 1 
            }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: "text.secondary", 
                  fontWeight: 500, 
                  fontSize: isMobile ? "0.6rem" : "0.7rem",
                  letterSpacing: '0.3px',
                  textTransform: 'uppercase'
                }}
              >
                {card.title}
              </Typography>
              <Box sx={{ 
                bgcolor: card.bgColor, 
                borderRadius: isMobile ? 1.5 : 2, 
                p: isMobile ? 0.4 : 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {card.icon}
              </Box>
            </Box>
            
            {loading ? (
              <Skeleton 
                variant="text" 
                width="80%" 
                height={isMobile ? 28 : 32} 
                sx={{ 
                  bgcolor: alpha(card.color, 0.1),
                  borderRadius: 1
                }} 
              />
            ) : (
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  color: card.color,
                  fontSize: {
                    xs: card.title === "Total Duration" ? "0.85rem" : "1rem",
                    sm: card.title === "Total Duration" ? "0.9rem" : "1.25rem",
                    md: card.title === "Total Duration" ? "1rem" : "1.5rem",
                    lg: card.title === "Total Duration" ? "1.1rem" : "1.75rem"
                  },
                  lineHeight: 1.2,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  gap: 0.5
                }}
              >
                <span>
                  {card.title === "Total Duration" 
                    ? formatDurationText(card.value)
                    : typeof card.value === "number" 
                      ? card.value.toFixed(2) 
                      : card.value
                  }
                </span>
                {card.unit && (
                  <Typography
                    component="span"
                    sx={{
                      fontSize: {
                        xs: "0.65rem",
                        sm: "0.75rem",
                        md: "0.85rem"
                      },
                      fontWeight: 'normal',
                      color: alpha(card.color, 0.7),
                      ml: 0.25
                    }}
                  >
                    {card.unit}
                  </Typography>
                )}
              </Typography>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
// Search and Filter Skeleton
const SearchFilterSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 1.5 },
        mb: { xs: 2, sm: 2.5 },
        borderRadius: { xs: 2, sm: 2.5 },
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
      }}
    >
      <Grid container spacing={1.5} alignItems="center">
        <Grid item xs={12} md={6}>
          <Skeleton
            variant="rounded"
            height={isMobile ? 38 : 48}
            sx={{ borderRadius: { xs: 2, sm: 2.5 }, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{
            display: 'flex',
            gap: 1,
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            flexWrap: 'wrap'
          }}>
            <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="rounded" width={isMobile ? 90 : 100} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Table Row Skeleton
const TableRowSkeleton = () => {
  const theme = useTheme();
  return (
    <TableRow>
      <TableCell sx={{ py: 0.8 }}>
        <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 0.8 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </Box>
      </TableCell>
      <TableCell sx={{ py: 0.8 }}>
        <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 0.8 }}>
        <Skeleton variant="rounded" width={100} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 0.8 }}>
        <Skeleton variant="rounded" width={100} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
      <TableCell sx={{ py: 0.8 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          <Skeleton variant="text" width={55} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </Box>
      </TableCell>
      <TableCell sx={{ py: 0.8 }}>
        <Skeleton variant="rounded" width={70} height={30} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
    </TableRow>
  );
};

// Mobile Card View Skeleton
const MobileCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
      {[1, 2, 3].map((item) => (
        <Card
          key={item}
          sx={{
            mb: 1.5,
            borderRadius: 2.5,
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Skeleton variant="rounded" width={45} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="rounded" width={70} height={30} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </Box>
            <Grid container spacing={1} sx={{ mb: 1.5 }}>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
                  <Skeleton variant="text" width={35} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Skeleton variant="circular" width={12} height={12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
                    <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
                  <Skeleton variant="text" width={40} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Skeleton variant="circular" width={12} height={12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
                    <Skeleton variant="text" width={55} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              p: 0.8,
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}>
              <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Header Button Skeleton
const HeaderButtonSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Skeleton
      variant="rounded"
      width={isMobile ? '100%' : 120}
      height={isMobile ? 34 : 36}
      sx={{
        borderRadius: 1.5,
        minWidth: { xs: '100%', sm: 120 },
        bgcolor: alpha(theme.palette.primary.main, 0.2),
      }}
    />
  );
};

// Mobile Card View Component with View Button
const MobileCardView = ({ reports, currentPage, rowsPerPage, onViewDetails }) => {
  const theme = useTheme();

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
      <AnimatePresence>
        {reports.map((report, index) => {
          const globalIndex = currentPage * rowsPerPage + index + 1;

          return (
            <motion.div
              key={report._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                sx={{
                  mb: 1.5,
                  borderRadius: 2.5,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  bgcolor: index % 2 === 0 ? "background.paper" : alpha(theme.palette.primary.main, 0.02),
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                  {/* Header with Index and View Button */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                    <Chip
                      label={`#${globalIndex}`}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: '0.6rem',
                        height: 20,
                      }}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ViewIcon sx={{ fontSize: 14 }} />}
                      onClick={() => onViewDetails(report)}
                      sx={{
                        fontSize: '0.6rem',
                        py: 0.3,
                        px: 1,
                        minWidth: 'auto',
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        }
                      }}
                    >
                      View
                    </Button>
                  </Box>

                  {/* User Info */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Avatar
                      src={report.user?.avtar}
                      sx={{
                        width: { xs: 40, sm: 44 },
                        height: { xs: 40, sm: 44 },
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        border: '2px solid',
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                      }}
                    >
                      {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 16 }} />}
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="body2" fontWeight={600} noWrap sx={{ fontSize: '0.85rem', color: 'text.primary' }}>
                        {report.user?.name || "-"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: '0.65rem' }}>
                        {report.user?.email || "-"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Check In/Out Times */}
                  <Grid container spacing={1} sx={{ mb: 1.5 }}>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 1.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
                          Check In
                        </Typography>
                        {report.check_in_time ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CheckInIcon sx={{ color: "#22c55e", fontSize: 14 }} />
                            <Typography variant="body2" noWrap sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
                              {formatDisplayDate(report.check_in_time)}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 1.5 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
                          Check Out
                        </Typography>
                        {report.check_out_time ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <CheckOutIcon sx={{ color: "#ef4444", fontSize: 14 }} />
                            <Typography variant="body2" noWrap sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
                              {formatDisplayDate(report.check_out_time)}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Distance */}
                  <Box sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    p: 1,
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}>
                    <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                      {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "0 km"}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Box>
  );
};

const Reports = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
  const { reports = [], pagination = {}, loading = false, summary = {} } = useSelector((state) => state.report || {});

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  // Get user role and effective adminId
  const storedUser = localStorage.getItem('user');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const role_id = parsedUser?.role_id;
  const rawAdminId = parsedUser?.adminId;
  const resolvedAdminId = typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId;
  const effectiveAdminId = Number(role_id) === 3 ? resolvedAdminId : (parsedUser?._id || parsedUser?.id);

  // Handle view details navigation
  const handleViewDetails = (report) => {
    navigate('/report-locations', {
      state: {
        sessionId: report.user?.sessionId,
        userId: report.user?._id,
        userName: report.user?.name,
        userEmail: report.user?.email,
        sessionData: {
          _id: report._id,
          sessionId: report.user?.sessionId,
          startTime: report.check_in_time,
          endTime: report.check_out_time,
          totalDistance: report.totalDistance,
          duration: report.duration,
          remark: report.remark,
          locations: report.locations,
          photos: report.photos
        }
      }
    });
  };

  // Fetch reports using new API
  useEffect(() => {
    if (!effectiveAdminId) return;

    dispatch(
      getUserReportsByAdminId({
        adminId: effectiveAdminId,
        page: currentPage + 1,
        limit: rowsPerPage,
        search: debouncedSearchQuery || undefined,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    );

    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, currentPage, rowsPerPage, dateRange.fromDate, dateRange.toDate, debouncedSearchQuery, effectiveAdminId]);

  // Memoized sorted reports
  const sortedReports = useMemo(() => {
    if (!reports || reports.length === 0) return [];

    return [...reports].sort((a, b) => {
      const dateA = new Date(a.check_in_time || a.createdAt || 0);
      const dateB = new Date(b.check_in_time || b.createdAt || 0);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }, [reports, sortOrder]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleDateFilterClick = (event) => {
    setDateFilterAnchor(event.currentTarget);
  };

  const handleDateFilterClose = () => {
    setDateFilterAnchor(null);
  };

  const applyDateFilter = () => {
    const newDateRange = {
      fromDate: startDate ? formatDateLocal(startDate) : "",
      toDate: endDate ? formatDateLocal(endDate) : ""
    };
    setDateRange(newDateRange);
    handleDateFilterClose();
    setCurrentPage(0);
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setDateRange({ fromDate: "", toDate: "" });
    handleDateFilterClose();
    setCurrentPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };

  const handleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setStartDate(null);
    setEndDate(null);
    setDateRange({ fromDate: "", toDate: "" });
    setSortOrder("desc");
    setCurrentPage(0);
    if (dateFilterAnchor) {
      handleDateFilterClose();
    }
    toast.success("All filters cleared successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setTextColor(theme.palette.primary.main);
      doc.setFont(undefined, "bold");
      doc.text("Team Trackify", 105, 15, { align: "center" });

      doc.setFont(undefined, "normal");
      doc.setTextColor(0, 0, 0);

      doc.setFontSize(16);
      doc.text("User Reports", 105, 25, { align: "center" });

      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 35, {
        align: "center",
      });

      if (dateRange.fromDate || dateRange.toDate) {
        doc.setFontSize(10);
        doc.text(
          `Date range: ${dateRange.fromDate ? formatDateDDMMYYYY(dateRange.fromDate) : "Start"} - ${dateRange.toDate ? formatDateDDMMYYYY(dateRange.toDate) : "End"}`,
          105,
          45,
          { align: "center" }
        );
      }

      const headers = ["#", "User Name", "Email", "Check In", "Check Out", "Distance (km)"];

      const data = sortedReports.map((report, index) => [
        index + 1,
        report.user?.name || "-",
        report.user?.email || "-",
        report.check_in_time ? formatDateTimeDDMMYYYY(report.check_in_time) : "-",
        report.check_out_time ? formatDateTimeDDMMYYYY(report.check_out_time) : "-",
        report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)}` : "-",
      ]);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: dateRange.fromDate || dateRange.toDate ? 55 : 45,
        styles: {
          cellPadding: 2,
          fontSize: 9,
          valign: "middle",
          halign: "left",
        },
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      });

      const filename = `user-reports-${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(filename);

      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "-";
    return formatDateDDMMYYYY(dateString);
  };

  const formatDisplayDateTime = (dateString) => {
    if (!dateString) return "-";
    return formatDateTimeDDMMYYYY(dateString);
  };

  const hasActiveFilter = dateRange.fromDate || dateRange.toDate || searchQuery || sortOrder !== 'desc';

  // First render loader
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: { xs: 2, sm: 2.5 },
          gap: 2
        }}>
          <Box>
            <Typography
             variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
              }}
            >
              User Reports
            </Typography>
          </Box>
          <HeaderButtonSkeleton isMobile={isMobile} />
        </Box>
        <SearchFilterSkeleton isMobile={isMobile} />
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 2, sm: 2.5 },
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
            overflow: "hidden",
          }}
        >
          {isMobile ? <MobileCardSkeleton /> : (
            <>
              <TableContainer>
                <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>User</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Check In</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Check Out</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Distance</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: theme.palette.primary.main }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <TableRowSkeleton key={item} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ p: 1.5, borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
                <Skeleton variant="rounded" width="100%" height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </>
          )}
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        mb: { xs: 2, sm: 2.5 },
        gap: 2
      }}>
        <Box>
          <Typography
          variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
              }}
          >
            User Reports
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
            View all user check-in/check-out reports and activity
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={isDownloading ? <CircularProgress size={16} sx={{ color: "white" }} /> : <DownloadIcon sx={{ fontSize: 16 }} />}
          onClick={handleDownloadPDF}
          disabled={loading || isDownloading}
          size="small"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            fontSize: { xs: '0.65rem', sm: '0.7rem' },
            height: 34,
            minWidth: { xs: '100%', sm: 120 },
          }}
        >
          {isDownloading ? "Downloading..." : "Download PDF"}
        </Button>
      </Box>

      {/* Summary Cards */}
      <SummaryCards summary={summary} loading={loading} />

      {/* Search and Filters */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 1.5 },
          mb: { xs: 2, sm: 2.5 },
          borderRadius: { xs: 2, sm: 2.5 },
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexWrap: { xs: 'wrap', md: 'nowrap' }
        }}>
          <TextField
            fullWidth
            placeholder="Search by user name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearSearch} sx={{ p: 0.5 }}>
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              minWidth: { xs: '100%', md: 200 },
              '& .MuiOutlinedInput-root': {
                borderRadius: { xs: 2, sm: 2.5 },
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                height: 38,
              },
            }}
          />

          <Button
            variant="outlined"
            startIcon={<CalendarIcon sx={{ fontSize: 16 }} />}
            onClick={handleDateFilterClick}
            size="small"
            sx={{
              flexShrink: 0,
              borderColor: alpha(theme.palette.divider, 0.5),
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              height: 34,
              position: 'relative',
              whiteSpace: 'nowrap',
            }}
          >
            Date Filter
            {(dateRange.fromDate || dateRange.toDate) && (
              <Box sx={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: '#ef4444',
                border: '1px solid white',
              }} />
            )}
          </Button>

          <Button
            variant="outlined"
            startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />}
            onClick={handleSort}
            size="small"
            sx={{
              flexShrink: 0,
              borderColor: alpha(theme.palette.divider, 0.5),
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              height: 34,
              whiteSpace: 'nowrap',
            }}
          >
            Date {sortOrder === 'asc' ? '(Oldest)' : '(Latest)'}
          </Button>

          {hasActiveFilter && (
            <Button
              variant="contained"
              startIcon={<ClearIcon sx={{ fontSize: 16 }} />}
              onClick={handleClearAllFilters}
              size="small"
              sx={{
                flexShrink: 0,
                bgcolor: alpha(theme.palette.error.main, 0.1),
                color: theme.palette.error.main,
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                height: 34,
                whiteSpace: 'nowrap',
              }}
            >
              Clear All
            </Button>
          )}

          <Button
            variant="outlined"
            size="small"
            sx={{
              flexShrink: 0,
              borderColor: alpha(theme.palette.divider, 0.5),
              color: 'text.secondary',
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              height: 34,
              whiteSpace: 'nowrap',
            }}
          >
            {pagination?.totalItems || sortedReports.length} Results
          </Button>
        </Box>
      </Paper>

      {/* Date Filter Menu */}
      <Menu
        anchorEl={dateFilterAnchor}
        open={Boolean(dateFilterAnchor)}
        onClose={handleDateFilterClose}
        PaperProps={{
          sx: {
            p: 1.5,
            width: { xs: 240, sm: 260 },
            borderRadius: { xs: 1.5, sm: 2 },
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, fontWeight: 500, ml: 0.5 }}>
              Start Date
            </Typography>
            <DatePicker
              maxDate={today}
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  placeholder="DD/MM/YYYY"
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '0.7rem', py: 1 },
                    '& .MuiOutlinedInput-root': { height: 36, borderRadius: 1.5 }
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ fontSize: '0.6rem', color: theme.palette.primary.main, fontWeight: 500, ml: 0.5 }}>
              End Date
            </Typography>
            <DatePicker
              maxDate={today}
              value={endDate}
              onChange={setEndDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  placeholder="DD/MM/YYYY"
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '0.7rem', py: 1 },
                    '& .MuiOutlinedInput-root': { height: 36, borderRadius: 1.5 }
                  }}
                />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button size="small" onClick={clearDateFilter} sx={{ fontSize: '0.65rem', color: 'text.secondary', height: 28 }}>
              Clear
            </Button>
            <Button size="small" variant="contained" onClick={applyDateFilter} sx={{ fontSize: '0.65rem', bgcolor: theme.palette.primary.main, height: 28 }}>
              Apply
            </Button>
          </Box>
        </LocalizationProvider>
      </Menu>

      {/* Reports Table/Card View */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 2, sm: 2.5 },
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          overflow: 'hidden',
        }}
      >
        {loading && <LinearProgress sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main }, height: 2 }} />}

        {!loading && sortedReports.length > 0 ? (
          <>
            {isMobile ? (
              <MobileCardView reports={sortedReports} currentPage={currentPage} rowsPerPage={rowsPerPage} onViewDetails={handleViewDetails} />
            ) : (
              <TableContainer sx={{
                overflowX: 'auto',
                maxHeight: { xs: '450px', sm: '500px', md: '550px' },
              }}>
                <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>User</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check In</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check Out</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Distance</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: theme.palette.primary.main, py: 1.5 }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence>
                      {sortedReports.map((report, index) => (
                        <motion.tr
                          key={report._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          style={{
                            backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
                          }}
                        >
                          <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, py: 1.2 }}>
                            {currentPage * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Avatar
                                src={report.user?.avtar}
                                sx={{
                                  width: { xs: 30, sm: 32 },
                                  height: { xs: 30, sm: 32 },
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main,
                                }}
                              >
                                {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 14 }} />}
                              </Avatar>
                              <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: 'text.primary' }}>
                                {report.user?.name || "-"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, py: 1.2, color: 'text.secondary' }}>
                            {report.user?.email || "-"}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            {report.check_in_time ? (
                              <Tooltip title={formatDisplayDateTime(report.check_in_time)}>
                                <Chip
                                  size="small"
                                  icon={<EventIcon sx={{ fontSize: 14 }} />}
                                  label={formatDisplayDate(report.check_in_time)}
                                  sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontSize: { xs: '0.6rem', sm: '0.65rem' },
                                    height: 26,
                                  }}
                                />
                              </Tooltip>
                            ) : (
                              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            {report.check_out_time ? (
                              <Tooltip title={formatDisplayDateTime(report.check_out_time)}>
                                <Chip
                                  size="small"
                                  icon={<EventIcon sx={{ fontSize: 14 }} />}
                                  label={formatDisplayDate(report.check_out_time)}
                                  sx={{
                                    bgcolor: alpha(theme.palette.text.secondary, 0.1),
                                    color: theme.palette.text.secondary,
                                    fontSize: { xs: '0.6rem', sm: '0.65rem' },
                                    height: 26,
                                  }}
                                />
                              </Tooltip>
                            ) : (
                              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            {report.tracker?.total_distance ? (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                                <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
                                  {report.tracker.total_distance.toFixed(2)} km
                                </Typography>
                              </Box>
                            ) : (
                              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>0 km</Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<ViewIcon sx={{ fontSize: 14 }} />}
                              onClick={() => handleViewDetails(report)}
                              sx={{
                                fontSize: '0.65rem',
                                py: 0.5,
                                px: 1.5,
                                minWidth: 'auto',
                                borderColor: alpha(theme.palette.primary.main, 0.5),
                                color: theme.palette.primary.main,
                                '&:hover': {
                                  borderColor: theme.palette.primary.main,
                                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                                }
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <TablePagination
              component="div"
              count={pagination?.totalItems || 0}
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
              }}
            />
          </>
        ) : !loading && (
          <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, textAlign: "center" }}>
            <ReportIcon sx={{ fontSize: { xs: 40, sm: 48, md: 56 }, color: alpha(theme.palette.primary.main, 0.2), mb: 2 }} />
            <Typography variant="body1" color="text.primary" fontWeight={500} gutterBottom>
              No reports found
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Try adjusting your search or date filters
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Reports;