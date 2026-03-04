// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Box,
//   Container,
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
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getReportsByAdmin } from "../../redux/slices/reportSlice";
// import { formatDateTimeDDMMYYYY } from "../../utils/dateFormat";
// import { useDebounce } from "../../Hooks/useDebounce";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { toast } from "react-toastify";

// const Reports = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const { reports = [], pagination = {}, loading = false } = useSelector((state) => state.report || {});

//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDownloading, setIsDownloading] = useState(false);

//   const debouncedSearchQuery = useDebounce(searchQuery, 500);

//   useEffect(() => {
//     dispatch(
//       getReportsByAdmin({
//         page: currentPage + 1,
//         limit: rowsPerPage,
//         search: debouncedSearchQuery || undefined,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//       })
//     );
//   }, [dispatch, currentPage, rowsPerPage, dateRange, debouncedSearchQuery]);

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleDateChange = (field) => (event) => {
//     setDateRange(prev => ({
//       ...prev,
//       [field]: event.target.value
//     }));
//     setCurrentPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(0);
//   };

//   const handleDownloadPDF = async () => {
//     setIsDownloading(true);

//     try {
//       const doc = new jsPDF();

//       doc.setFontSize(18);
//       doc.setTextColor(15, 118, 110);
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
//             ? new Date(dateRange.fromDate).toLocaleDateString()
//             : "Start"
//           } - ${dateRange.toDate
//             ? new Date(dateRange.toDate).toLocaleDateString()
//             : "End"
//           }`,
//           105,
//           35,
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

//       const data = reports.map((report, index) => [
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
//           fillColor: [15, 118, 110],
//           textColor: 255,
//           fontStyle: "bold",
//         },
//         alternateRowStyles: {
//           fillColor: [240, 240, 240],
//         },
//       });

//       const filename = `user-reports-${new Date().toISOString().split("T")[0]
//         }.pdf`;
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
//         return <CheckInIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "checked out":
//         return <CheckOutIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
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
//         return "#64748b";
//     }
//   };

//   // Mobile Card View Component
//   const MobileCardView = ({ reports, currentPage, rowsPerPage }) => {
//     return (
//       <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//         <AnimatePresence>
//           {reports.map((report, index) => {
//             const globalIndex = currentPage * rowsPerPage + index + 1;

//             return (
//               <motion.div
//                 key={report._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2, delay: index * 0.02 }}
//               >
//                 <Card
//                   sx={{
//                     mb: 2,
//                     borderRadius: 3,
//                     border: "1px solid",
//                     borderColor: alpha("#e2e8f0", 0.5),
//                     bgcolor: index % 2 === 0 ? "#fff" : alpha("#f8fafc", 0.5),
//                   }}
//                 >
//                   <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
//                     {/* Header with Index */}
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                       <Chip
//                         label={`#${globalIndex}`}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha("#0f766e", 0.1),
//                           color: "#0f766e",
//                           fontWeight: 600,
//                           fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                           height: { xs: 20, sm: 22 },
//                         }}
//                       />
//                       {report.tracker?.status && (
//                         <Chip
//                           icon={getStatusIcon(report.tracker.status)}
//                           label={report.tracker.status}
//                           size="small"
//                           sx={{
//                             bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
//                             color: getStatusColor(report.tracker.status),
//                             fontWeight: 600,
//                             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                             height: { xs: 20, sm: 22 },
//                           }}
//                         />
//                       )}
//                     </Box>

//                     {/* User Info */}
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//                       <Avatar
//                         src={report.user?.avtar}
//                         sx={{
//                           width: { xs: 40, sm: 48 },
//                           height: { xs: 40, sm: 48 },
//                           bgcolor: alpha("#0f766e", 0.1),
//                           color: "#0f766e",
//                         }}
//                       >
//                         {report.user?.name?.charAt(0) || <PersonIcon />}
//                       </Avatar>
//                       <Box sx={{ minWidth: 0 }}>
//                         <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
//                           {report.user?.name || "-"}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                           {report.user?.email || "-"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Check In/Out Times */}
//                     <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             Check In
//                           </Typography>
//                           {report.check_in_time ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: "#0f766e", fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                                 {new Date(report.check_in_time).toLocaleTimeString()}
//                               </Typography>
//                             </Box>
//                           ) : "-"}
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             Check Out
//                           </Typography>
//                           {report.check_out_time ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: "#64748b", fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                                 {new Date(report.check_out_time).toLocaleTimeString()}
//                               </Typography>
//                             </Box>
//                           ) : "-"}
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     {/* Distance */}
//                     <Box sx={{
//                       bgcolor: alpha("#f1f5f9", 0.5),
//                       p: 1,
//                       borderRadius: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                     }}>
//                       <DistanceIcon sx={{ color: "#0f766e", fontSize: { xs: 16, sm: 18 } }} />
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                         Distance: {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "N/A"}
//                       </Typography>
//                     </Box>

//                     {/* Date Tooltip */}
//                     <Box sx={{ mt: 1, textAlign: "center" }}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                         {report.check_in_time && formatDateTimeDDMMYYYY(report.check_in_time)}
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   return (
//     <Box sx={{
//       minHeight: "100vh",
//       bgcolor: "#f8fafc",
//       py: { xs: 0, sm: 0, md: 0 },
//       px: { xs: 0, sm: 0, md: 0 },
//     }}>
//       <Container
//         maxWidth="xl"
//         disableGutters={isMobile}
//         sx={{ px: { xs: 0, sm: 0, md: 0 } }}
//       >
//         {/* Header */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             mb: { xs: 2, sm: 2.5, md: 2 },
//             border: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//             display: "flex",
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between",
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             flexWrap: "wrap",
//             gap: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#0f766e", 0.1),
//                 color: "#0f766e",
//                 width: { xs: 40, sm: 44, md: 48 },
//                 height: { xs: 40, sm: 44, md: 48 },
//               }}
//             >
//               <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//             </Avatar>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 color="#0f766e"
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 User Reports
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                 All user check-in/check-out reports
//               </Typography>
//             </Box>
//           </Box>

//           <Button
//             variant="contained"
//             startIcon={isDownloading ? <LinearProgress size={20} sx={{ color: "white" }} /> : <DownloadIcon />}
//             onClick={handleDownloadPDF}
//             disabled={loading || isDownloading}
//             fullWidth={isMobile}
//             size={isMobile ? "small" : "medium"}
//             sx={{
//               bgcolor: "#0f766e",
//               "&:hover": { bgcolor: "#0a5c55" },
//               minWidth: { xs: '100%', sm: 140 },
//               fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//               py: { xs: 1, sm: 1.2 },
//             }}
//           >
//             {isDownloading ? "Downloading..." : "Download PDF"}
//           </Button>
//         </Paper>

//         {/* Search and Filters */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             mb: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//           }}
//         >
//           <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
//             <TextField
//               fullWidth
//               placeholder={isSmallMobile ? "Search..." : "Search reports by user name or email..."}
//               value={searchQuery}
//               onChange={handleSearchChange}
//               size={isMobile ? "small" : "medium"}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   bgcolor: alpha("#0f766e", 0.05),
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//               }}
//             />

//             <Stack
//               direction={{ xs: 'column', sm: 'row' }}
//               spacing={{ xs: 1.5, sm: 2 }}
//               sx={{ minWidth: { sm: 400 } }}
//             >
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="From Date"
//                 value={dateRange.fromDate}
//                 onChange={handleDateChange("fromDate")}
//                 InputLabelProps={{ shrink: true }}
//                 size={isMobile ? "small" : "small"}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: { xs: 1.5, sm: 2 },
//                   },
//                   "& .MuiInputLabel-root": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                   "& .MuiInputBase-input": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="To Date"
//                 value={dateRange.toDate}
//                 onChange={handleDateChange("toDate")}
//                 InputLabelProps={{ shrink: true }}
//                 size={isMobile ? "small" : "small"}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: { xs: 1.5, sm: 2 },
//                   },
//                   "& .MuiInputLabel-root": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                   "& .MuiInputBase-input": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                 }}
//               />
//             </Stack>
//           </Stack>
//         </Paper>

//         {/* Reports Table/Card View */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//             overflow: "hidden",
//           }}
//         >
//           {loading && (
//             <LinearProgress
//               sx={{
//                 bgcolor: alpha("#0f766e", 0.1),
//                 "& .MuiLinearProgress-bar": { bgcolor: "#0f766e" },
//               }}
//             />
//           )}

//           {!loading && reports.length > 0 ? (
//             <>
//               {isMobile ? (
//                 <MobileCardView
//                   reports={reports}
//                   currentPage={currentPage}
//                   rowsPerPage={rowsPerPage}
//                 />
//               ) : (
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
//                   <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>#</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>User Name</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Email</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Check In</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Check Out</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Distance</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <AnimatePresence>
//                         {reports.map((report, index) => (
//                           <motion.tr
//                             key={report._id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2, delay: index * 0.02 }}
//                             style={{
//                               backgroundColor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
//                             }}
//                           >
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {currentPage * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                 <Avatar
//                                   src={report.user?.avtar}
//                                   sx={{
//                                     width: { xs: 24, sm: 28, md: 32 },
//                                     height: { xs: 24, sm: 28, md: 32 },
//                                     bgcolor: alpha("#0f766e", 0.1),
//                                     color: "#0f766e",
//                                   }}
//                                 >
//                                   {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//                                 </Avatar>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                                   {report.user?.name || "-"}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {report.user?.email || "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_in_time ? (
//                                 <Tooltip title={formatDateTimeDDMMYYYY(report.check_in_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={new Date(report.check_in_time).toLocaleTimeString()}
//                                     sx={{
//                                       bgcolor: alpha("#0f766e", 0.1),
//                                       color: "#0f766e",
//                                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                       height: { xs: 20, sm: 22, md: 24 },
//                                     }}
//                                   />
//                                 </Tooltip>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_out_time ? (
//                                 <Tooltip title={formatDateTimeDDMMYYYY(report.check_out_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={new Date(report.check_out_time).toLocaleTimeString()}
//                                     sx={{
//                                       bgcolor: alpha("#64748b", 0.1),
//                                       color: "#64748b",
//                                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                       height: { xs: 20, sm: 22, md: 24 },
//                                     }}
//                                   />
//                                 </Tooltip>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.tracker?.total_distance ? (
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                   <DistanceIcon sx={{ color: "#0f766e", fontSize: { xs: 12, sm: 14, md: 16 } }} />
//                                   <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                     {report.tracker.total_distance.toFixed(2)} km
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.tracker?.status && (
//                                 <Chip
//                                   icon={getStatusIcon(report.tracker.status)}
//                                   label={report.tracker.status}
//                                   size="small"
//                                   sx={{
//                                     bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
//                                     color: getStatusColor(report.tracker.status),
//                                     fontWeight: 600,
//                                     fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                     height: { xs: 20, sm: 22, md: 24 },
//                                   }}
//                                 />
//                               )}
//                             </TableCell>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}

//               <TablePagination
//                 component="div"
//                 count={pagination.totalItems || 0}
//                 page={currentPage}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[5, 10, 25, 50]}
//                 sx={{
//                   borderTop: "1px solid",
//                   borderColor: alpha("#e2e8f0", 0.5),
//                   "& .MuiTablePagination-select": { borderRadius: 2 },
//                   '.MuiTablePagination-displayedRows': {
//                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   },
//                   '.MuiTablePagination-selectLabel': {
//                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   },
//                 }}
//               />
//             </>
//           ) : !loading && (
//             <Box sx={{
//               p: { xs: 3, sm: 4, md: 5 },
//               textAlign: "center"
//             }}>
//               <ReportIcon sx={{
//                 fontSize: { xs: 36, sm: 42, md: 48 },
//                 color: alpha("#0f766e", 0.3),
//                 mb: 2
//               }} />
//               <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
//                 No reports found
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                 Try adjusting your search or date filters
//               </Typography>
//             </Box>
//           )}
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Reports;








//Skelaton Loader



// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Box,
//   Container,
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
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getReportsByAdmin } from "../../redux/slices/reportSlice";
// import { formatDateTimeDDMMYYYY } from "../../utils/dateFormat";
// import { useDebounce } from "../../Hooks/useDebounce";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { toast } from "react-toastify";

// // Search and Filter Skeleton
// const SearchFilterSkeleton = ({ isMobile, isSmallMobile }) => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2 },
//         mb: { xs: 2, sm: 2.5, md: 3 },
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//       }}
//     >
//       <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
//         <Skeleton
//           variant="rounded"
//           height={isMobile ? 40 : 56}
//           sx={{
//             borderRadius: { xs: 1.5, sm: 2 },
//             flex: 1,
//           }}
//         />

//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           spacing={{ xs: 1.5, sm: 2 }}
//           sx={{ minWidth: { sm: 400 } }}
//         >
//           <Skeleton
//             variant="rounded"
//             height={isMobile ? 40 : 56}
//             width="100%"
//             sx={{ borderRadius: { xs: 1.5, sm: 2 } }}
//           />
//           <Skeleton
//             variant="rounded"
//             height={isMobile ? 40 : 56}
//             width="100%"
//             sx={{ borderRadius: { xs: 1.5, sm: 2 } }}
//           />
//         </Stack>
//       </Stack>
//     </Paper>
//   );
// };

// // Table Row Skeleton
// const TableRowSkeleton = () => {
//   return (
//     <TableRow>
//       <TableCell>
//         <Skeleton variant="text" width={30} height={20} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={32} height={32} />
//           <Skeleton variant="text" width={100} height={20} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3 }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3 }} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           <Skeleton variant="circular" width={16} height={16} />
//           <Skeleton variant="text" width={60} height={20} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3 }} />
//       </TableCell>
//     </TableRow>
//   );
// };

// // Mobile Card View Skeleton
// const MobileCardSkeleton = () => {
//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//       {[1, 2, 3].map((item) => (
//         <Card
//           key={item}
//           sx={{
//             mb: 2,
//             borderRadius: 3,
//             border: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//           }}
//         >
//           <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
//             {/* Header with Index */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//               <Skeleton variant="rounded" width={50} height={22} sx={{ borderRadius: 3 }} />
//               <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 3 }} />
//             </Box>

//             {/* User Info */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//               <Skeleton variant="circular" width={48} height={48} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width="80%" height={24} sx={{ mb: 0.5 }} />
//                 <Skeleton variant="text" width="60%" height={16} />
//               </Box>
//             </Box>

//             {/* Check In/Out Times */}
//             <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={40} height={12} sx={{ mb: 0.5 }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} />
//                     <Skeleton variant="text" width={60} height={16} />
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={50} height={12} sx={{ mb: 0.5 }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} />
//                     <Skeleton variant="text" width={60} height={16} />
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>

//             {/* Distance */}
//             <Box sx={{
//               bgcolor: alpha("#f1f5f9", 0.5),
//               p: 1,
//               borderRadius: 2,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}>
//               <Skeleton variant="circular" width={18} height={18} />
//               <Skeleton variant="text" width={120} height={20} />
//             </Box>

//             {/* Date */}
//             <Box sx={{ mt: 1, textAlign: "center" }}>
//               <Skeleton variant="text" width={100} height={14} sx={{ mx: "auto" }} />
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// // Header Button Skeleton
// const HeaderButtonSkeleton = ({ isMobile }) => {
//   return (
//     <Skeleton
//       variant="rounded"
//       width={isMobile ? '100%' : 140}
//       height={isMobile ? 36 : 40}
//       sx={{
//         borderRadius: 2,
//         minWidth: { xs: '100%', sm: 140 },
//       }}
//     />
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
//   const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDownloading, setIsDownloading] = useState(false);

//   const debouncedSearchQuery = useDebounce(searchQuery, 500);

//   useEffect(() => {
//     dispatch(
//       getReportsByAdmin({
//         page: currentPage + 1,
//         limit: rowsPerPage,
//         search: debouncedSearchQuery || undefined,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//       })
//     );

//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [dispatch, currentPage, rowsPerPage, dateRange, debouncedSearchQuery]);

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleDateChange = (field) => (event) => {
//     setDateRange(prev => ({
//       ...prev,
//       [field]: event.target.value
//     }));
//     setCurrentPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(0);
//   };

//   const handleDownloadPDF = async () => {
//     setIsDownloading(true);

//     try {
//       const doc = new jsPDF();

//       doc.setFontSize(18);
//       doc.setTextColor(15, 118, 110);
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
//             ? new Date(dateRange.fromDate).toLocaleDateString()
//             : "Start"
//           } - ${dateRange.toDate
//             ? new Date(dateRange.toDate).toLocaleDateString()
//             : "End"
//           }`,
//           105,
//           35,
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

//       const data = reports.map((report, index) => [
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
//           fillColor: [15, 118, 110],
//           textColor: 255,
//           fontStyle: "bold",
//         },
//         alternateRowStyles: {
//           fillColor: [240, 240, 240],
//         },
//       });

//       const filename = `user-reports-${new Date().toISOString().split("T")[0]
//         }.pdf`;
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
//         return <CheckInIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "checked out":
//         return <CheckOutIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
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
//         return "#64748b";
//     }
//   };

//   // Mobile Card View Component
//   const MobileCardView = ({ reports, currentPage, rowsPerPage }) => {
//     return (
//       <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//         <AnimatePresence>
//           {reports.map((report, index) => {
//             const globalIndex = currentPage * rowsPerPage + index + 1;

//             return (
//               <motion.div
//                 key={report._id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2, delay: index * 0.02 }}
//               >
//                 <Card
//                   sx={{
//                     mb: 2,
//                     borderRadius: 3,
//                     border: "1px solid",
//                     borderColor: alpha("#e2e8f0", 0.5),
//                     bgcolor: index % 2 === 0 ? "#fff" : alpha("#f8fafc", 0.5),
//                   }}
//                 >
//                   <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
//                     {/* Header with Index */}
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                       <Chip
//                         label={`#${globalIndex}`}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha("#0f766e", 0.1),
//                           color: "#0f766e",
//                           fontWeight: 600,
//                           fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                           height: { xs: 20, sm: 22 },
//                         }}
//                       />
//                       {report.tracker?.status && (
//                         <Chip
//                           icon={getStatusIcon(report.tracker.status)}
//                           label={report.tracker.status}
//                           size="small"
//                           sx={{
//                             bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
//                             color: getStatusColor(report.tracker.status),
//                             fontWeight: 600,
//                             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                             height: { xs: 20, sm: 22 },
//                           }}
//                         />
//                       )}
//                     </Box>

//                     {/* User Info */}
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//                       <Avatar
//                         src={report.user?.avtar}
//                         sx={{
//                           width: { xs: 40, sm: 48 },
//                           height: { xs: 40, sm: 48 },
//                           bgcolor: alpha("#0f766e", 0.1),
//                           color: "#0f766e",
//                         }}
//                       >
//                         {report.user?.name?.charAt(0) || <PersonIcon />}
//                       </Avatar>
//                       <Box sx={{ minWidth: 0 }}>
//                         <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
//                           {report.user?.name || "-"}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                           {report.user?.email || "-"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Check In/Out Times */}
//                     <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             Check In
//                           </Typography>
//                           {report.check_in_time ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: "#0f766e", fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                                 {new Date(report.check_in_time).toLocaleTimeString()}
//                               </Typography>
//                             </Box>
//                           ) : "-"}
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             Check Out
//                           </Typography>
//                           {report.check_out_time ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: "#64748b", fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                                 {new Date(report.check_out_time).toLocaleTimeString()}
//                               </Typography>
//                             </Box>
//                           ) : "-"}
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     {/* Distance */}
//                     <Box sx={{
//                       bgcolor: alpha("#f1f5f9", 0.5),
//                       p: 1,
//                       borderRadius: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                     }}>
//                       <DistanceIcon sx={{ color: "#0f766e", fontSize: { xs: 16, sm: 18 } }} />
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
//                         Distance: {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "N/A"}
//                       </Typography>
//                     </Box>

//                     {/* Date Tooltip */}
//                     <Box sx={{ mt: 1, textAlign: "center" }}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                         {report.check_in_time && formatDateTimeDDMMYYYY(report.check_in_time)}
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   // If first render loader is active, show skeletons for everything except title and button
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{
//         minHeight: "100vh",
//         bgcolor: "#f8fafc",
//         py: { xs: 0, sm: 0, md: 0 },
//         px: { xs: 0, sm: 0, md: 0 },
//       }}>
//         <Container
//           maxWidth="xl"
//           disableGutters={isMobile}
//           sx={{ px: { xs: 0, sm: 0, md: 0 } }}
//         >
//           {/* Header with title and button only (no loading for title, button shows skeleton) */}
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 2, sm: 2.5, md: 3 },
//               mb: { xs: 2, sm: 2.5, md: 2 },
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha("#0f766e", 0.1),
//                   color: "#0f766e",
//                   width: { xs: 40, sm: 44, md: 48 },
//                   height: { xs: 40, sm: 44, md: 48 },
//                 }}
//               >
//                 <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//               </Avatar>
//               <Box>
//                 <Typography
//                variant={isMobile ? "h5" : "h4"}
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
//                   User Reports
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                   All user check-in/check-out reports
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Button Skeleton */}
//             <HeaderButtonSkeleton isMobile={isMobile} />
//           </Paper>

//           {/* Search and Filters Skeleton */}
//           <SearchFilterSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

//           {/* Reports Table/Card View Skeleton */}
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               overflow: "hidden",
//             }}
//           >
//             {isMobile ? (
//               <MobileCardSkeleton />
//             ) : (
//               <>
//                 <TableContainer>
//                   <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//                         <TableCell>#</TableCell>
//                         <TableCell>User Name</TableCell>
//                         <TableCell>Email</TableCell>
//                         <TableCell>Check In</TableCell>
//                         <TableCell>Check Out</TableCell>
//                         <TableCell>Distance</TableCell>
//                         <TableCell>Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha("#e2e8f0", 0.5) }}>
//                   <Skeleton variant="rounded" width="100%" height={52} />
//                 </Box>
//               </>
//             )}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{
//       minHeight: "100vh",
//       bgcolor: "#f8fafc",
//       py: { xs: 0, sm: 0, md: 0 },
//       // px: { xs: 0, sm: 0, md: 0 },
//       px: { xs: 0, sm: 0, md: 3 },
//     }}>
//       <Container
//         maxWidth="xl"
//         disableGutters={isMobile}
//         sx={{ px: { xs: 0, sm: 0, md: 0 } }}

//       >
//         {/* Header */}
//         <Paper
//           elevation={0}
//            sx={{
//               p: { xs: 2, sm: 2.5, md: 3 },
//               mb: { xs: 2, sm: 2.5, md: 2 },
//               border: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
//             <Avatar
//            sx={{
//                   bgcolor: alpha("#0f766e", 0.1),
//                   color: "#0f766e",
//                   width: { xs: 40, sm: 44, md: 48 },
//                   height: { xs: 40, sm: 44, md: 48 },
//                 }}
//             >
//               <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
//             </Avatar>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 color="#0f766e"
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 User Reports
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                 All user check-in/check-out reports
//               </Typography>
//             </Box>
//           </Box>

//           <Button
//             variant="contained"
//             startIcon={isDownloading ? <LinearProgress size={20} sx={{ color: "white" }} /> : <DownloadIcon />}
//             onClick={handleDownloadPDF}
//             disabled={loading || isDownloading}
//             fullWidth={isMobile}
//             size={isMobile ? "small" : "medium"}
//             sx={{
//               bgcolor: "#0f766e",
//               "&:hover": { bgcolor: "#0a5c55" },
//               minWidth: { xs: '100%', sm: 140 },
//               fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//               py: { xs: 1, sm: 1.2 },
//             }}
//           >
//             {isDownloading ? "Downloading..." : "Download PDF"}
//           </Button>
//         </Paper>

//         {/* Search and Filters */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             mb: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//           }}
//         >
//           <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
//             <TextField
//               fullWidth
//               placeholder={isSmallMobile ? "Search..." : "Search reports by user name or email..."}
//               value={searchQuery}
//               onChange={handleSearchChange}
//               size={isMobile ? "small" : "medium"}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   bgcolor: alpha("#0f766e", 0.05),
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//               }}
//             />

//             <Stack
//               direction={{ xs: 'column', sm: 'row' }}
//               spacing={{ xs: 1.5, sm: 2 }}
//               sx={{ minWidth: { sm: 400 } }}
//             >
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="From Date"
//                 value={dateRange.fromDate}
//                 onChange={handleDateChange("fromDate")}
//                 InputLabelProps={{ shrink: true }}
//                 size={isMobile ? "small" : "small"}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: { xs: 1.5, sm: 2 },
//                   },
//                   "& .MuiInputLabel-root": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                   "& .MuiInputBase-input": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 type="date"
//                 label="To Date"
//                 value={dateRange.toDate}
//                 onChange={handleDateChange("toDate")}
//                 InputLabelProps={{ shrink: true }}
//                 size={isMobile ? "small" : "small"}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: { xs: 1.5, sm: 2 },
//                   },
//                   "& .MuiInputLabel-root": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                   "& .MuiInputBase-input": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                 }}
//               />
//             </Stack>
//           </Stack>
//         </Paper>

//         {/* Reports Table/Card View */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#e2e8f0", 0.5),
//             overflow: "hidden",
//           }}
//         >
//           {loading && (
//             <LinearProgress
//               sx={{
//                 bgcolor: alpha("#0f766e", 0.1),
//                 "& .MuiLinearProgress-bar": { bgcolor: "#0f766e" },
//               }}
//             />
//           )}

//           {!loading && reports.length > 0 ? (
//             <>
//               {isMobile ? (
//                 <MobileCardView
//                   reports={reports}
//                   currentPage={currentPage}
//                   rowsPerPage={rowsPerPage}
//                 />
//               ) : (
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
//                   <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>#</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>User Name</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Email</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Check In</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Check Out</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Distance</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <AnimatePresence>
//                         {reports.map((report, index) => (
//                           <motion.tr
//                             key={report._id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.2, delay: index * 0.02 }}
//                             style={{
//                               backgroundColor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
//                             }}
//                           >
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {currentPage * rowsPerPage + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                 <Avatar
//                                   src={report.user?.avtar}
//                                   sx={{
//                                     width: { xs: 24, sm: 28, md: 32 },
//                                     height: { xs: 24, sm: 28, md: 32 },
//                                     bgcolor: alpha("#0f766e", 0.1),
//                                     color: "#0f766e",
//                                   }}
//                                 >
//                                   {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//                                 </Avatar>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                                   {report.user?.name || "-"}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {report.user?.email || "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_in_time ? (
//                                 <Tooltip title={formatDateTimeDDMMYYYY(report.check_in_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={new Date(report.check_in_time).toLocaleTimeString()}
//                                     sx={{
//                                       bgcolor: alpha("#0f766e", 0.1),
//                                       color: "#0f766e",
//                                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                       height: { xs: 20, sm: 22, md: 24 },
//                                     }}
//                                   />
//                                 </Tooltip>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_out_time ? (
//                                 <Tooltip title={formatDateTimeDDMMYYYY(report.check_out_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={new Date(report.check_out_time).toLocaleTimeString()}
//                                     sx={{
//                                       bgcolor: alpha("#64748b", 0.1),
//                                       color: "#64748b",
//                                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                       height: { xs: 20, sm: 22, md: 24 },
//                                     }}
//                                   />
//                                 </Tooltip>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.tracker?.total_distance ? (
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                   <DistanceIcon sx={{ color: "#0f766e", fontSize: { xs: 12, sm: 14, md: 16 } }} />
//                                   <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                                     {report.tracker.total_distance.toFixed(2)} km
//                                   </Typography>
//                                 </Box>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.tracker?.status && (
//                                 <Chip
//                                   icon={getStatusIcon(report.tracker.status)}
//                                   label={report.tracker.status}
//                                   size="small"
//                                   sx={{
//                                     bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
//                                     color: getStatusColor(report.tracker.status),
//                                     fontWeight: 600,
//                                     fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                     height: { xs: 20, sm: 22, md: 24 },
//                                   }}
//                                 />
//                               )}
//                             </TableCell>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}

//               <TablePagination
//                 component="div"
//                 count={pagination.totalItems || 0}
//                 page={currentPage}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[5, 10, 25, 50]}
//                 sx={{
//                   borderTop: "1px solid",
//                   borderColor: alpha("#e2e8f0", 0.5),
//                   "& .MuiTablePagination-select": { borderRadius: 2 },
//                   '.MuiTablePagination-displayedRows': {
//                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   },
//                   '.MuiTablePagination-selectLabel': {
//                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   },
//                 }}
//               />
//             </>
//           ) : !loading && (
//             <Box sx={{
//               p: { xs: 3, sm: 4, md: 5 },
//               textAlign: "center"
//             }}>
//               <ReportIcon sx={{
//                 fontSize: { xs: 36, sm: 42, md: 48 },
//                 color: alpha("#0f766e", 0.3),
//                 mb: 2
//               }} />
//               <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
//                 No reports found
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                 Try adjusting your search or date filters
//               </Typography>
//             </Box>
//           )}
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Reports;

















////////////////////////////// Change Color Theam/////////////////////////////////////



import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
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
  Stack,
  Chip,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Skeleton,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Assessment as ReportIcon,
  Event as EventIcon,
  CheckCircle as CheckInIcon,
  Cancel as CheckOutIcon,
  Speed as DistanceIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getReportsByAdmin } from "../../redux/slices/reportSlice";
import { formatDateTimeDDMMYYYY } from "../../utils/dateFormat";
import { useDebounce } from "../../Hooks/useDebounce";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

// Search and Filter Skeleton
const SearchFilterSkeleton = ({ isMobile, isSmallMobile }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: { xs: 2, sm: 2.5, md: 3 },
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: alpha("#2563EB", 0.1),
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
        <Skeleton
          variant="rounded"
          height={isMobile ? 40 : 56}
          sx={{
            borderRadius: { xs: 1.5, sm: 2 },
            flex: 1,
            bgcolor: alpha("#2563EB", 0.1),
          }}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{ minWidth: { sm: 400 } }}
        >
          <Skeleton
            variant="rounded"
            height={isMobile ? 40 : 56}
            width="100%"
            sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha("#2563EB", 0.1) }}
          />
          <Skeleton
            variant="rounded"
            height={isMobile ? 40 : 56}
            width="100%"
            sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha("#2563EB", 0.1) }}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

// Table Row Skeleton
const TableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
          <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
        </Box>
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
          <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
        </Box>
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
      </TableCell>
    </TableRow>
  );
};

// Mobile Card View Skeleton
const MobileCardSkeleton = () => {
  return (
    <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
      {[1, 2, 3].map((item) => (
        <Card
          key={item}
          sx={{
            mb: 2,
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#2563EB", 0.1),
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            {/* Header with Index */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Skeleton variant="rounded" width={50} height={22} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
              <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
            </Box>

            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={24} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
                <Skeleton variant="text" width="60%" height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
              </Box>
            </Box>

            {/* Check In/Out Times */}
            <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                  <Skeleton variant="text" width={40} height={12} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
                    <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                  <Skeleton variant="text" width={50} height={12} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
                    <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Distance */}
            <Box sx={{
              bgcolor: alpha("#f1f5f9", 0.5),
              p: 1,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}>
              <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
              <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
            </Box>

            {/* Date */}
            <Box sx={{ mt: 1, textAlign: "center" }}>
              <Skeleton variant="text" width={100} height={14} sx={{ mx: "auto", bgcolor: alpha("#2563EB", 0.1) }} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Header Button Skeleton
const HeaderButtonSkeleton = ({ isMobile }) => {
  return (
    <Skeleton
      variant="rounded"
      width={isMobile ? '100%' : 140}
      height={isMobile ? 36 : 40}
      sx={{
        borderRadius: 2,
        minWidth: { xs: '100%', sm: 140 },
        bgcolor: alpha("#2563EB", 0.2),
      }}
    />
  );
};

const Reports = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const { reports = [], pagination = {}, loading = false } = useSelector((state) => state.report || {});

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(
      getReportsByAdmin({
        page: currentPage + 1,
        limit: rowsPerPage,
        search: debouncedSearchQuery || undefined,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    );

    // Set first render loader to false after 1 second
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, currentPage, rowsPerPage, dateRange, debouncedSearchQuery]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleDateChange = (field) => (event) => {
    setDateRange(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setCurrentPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setTextColor(37, 99, 235); // #2563EB
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
          `Date range: ${dateRange.fromDate
            ? new Date(dateRange.fromDate).toLocaleDateString()
            : "Start"
          } - ${dateRange.toDate
            ? new Date(dateRange.toDate).toLocaleDateString()
            : "End"
          }`,
          105,
          35,
          { align: "center" }
        );
      }

      const headers = [
        "#",
        "User Name",
        "Email",
        "Check In",
        "Check Out",
        "Distance (km)",
        "Status",
      ];

      const data = reports.map((report, index) => [
        index + 1,
        report.user?.name || "-",
        report.user?.email || "-",
        report.check_in_time
          ? formatDateTimeDDMMYYYY(report.check_in_time)
          : "-",
        report.check_out_time
          ? formatDateTimeDDMMYYYY(report.check_out_time)
          : "-",
        report.tracker?.total_distance
          ? `${report.tracker.total_distance.toFixed(2)}`
          : "-",
        report.tracker?.status || "-",
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
          fillColor: [37, 99, 235], // #2563EB
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      });

      const filename = `user-reports-${new Date().toISOString().split("T")[0]
        }.pdf`;
      doc.save(filename);

      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "checked in":
        return <CheckInIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
      case "checked out":
        return <CheckOutIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "checked in":
        return "#22c55e";
      case "checked out":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  // Mobile Card View Component
  const MobileCardView = ({ reports, currentPage, rowsPerPage }) => {
    return (
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        <AnimatePresence>
          {reports.map((report, index) => {
            const globalIndex = currentPage * rowsPerPage + index + 1;

            return (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
              >
                <Card
                  sx={{
                    mb: 2,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: alpha("#2563EB", 0.1),
                    bgcolor: index % 2 === 0 ? "#fff" : alpha("#f8fafc", 0.5),
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    {/* Header with Index */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Chip
                        label={`#${globalIndex}`}
                        size="small"
                        sx={{
                          bgcolor: alpha("#2563EB", 0.1),
                          color: "#2563EB",
                          fontWeight: 600,
                          fontSize: { xs: '0.6rem', sm: '0.65rem' },
                          height: { xs: 20, sm: 22 },
                        }}
                      />
                      {report.tracker?.status && (
                        <Chip
                          icon={getStatusIcon(report.tracker.status)}
                          label={report.tracker.status}
                          size="small"
                          sx={{
                            bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
                            color: getStatusColor(report.tracker.status),
                            fontWeight: 600,
                            fontSize: { xs: '0.6rem', sm: '0.65rem' },
                            height: { xs: 20, sm: 22 },
                          }}
                        />
                      )}
                    </Box>

                    {/* User Info */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <Avatar
                        src={report.user?.avtar}
                        sx={{
                          width: { xs: 40, sm: 48 },
                          height: { xs: 40, sm: 48 },
                          bgcolor: alpha("#2563EB", 0.1),
                          color: "#2563EB",
                        }}
                      >
                        {report.user?.name?.charAt(0) || <PersonIcon />}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: '#1e293b' }}>
                          {report.user?.name || "-"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                          {report.user?.email || "-"}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Check In/Out Times */}
                    <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
                      <Grid item xs={6}>
                        <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                            Check In
                          </Typography>
                          {report.check_in_time ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <EventIcon sx={{ color: "#2563EB", fontSize: { xs: 12, sm: 14 } }} />
                              <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: '#1e293b' }}>
                                {new Date(report.check_in_time).toLocaleTimeString()}
                              </Typography>
                            </Box>
                          ) : "-"}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                            Check Out
                          </Typography>
                          {report.check_out_time ? (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <EventIcon sx={{ color: "#64748b", fontSize: { xs: 12, sm: 14 } }} />
                              <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: '#1e293b' }}>
                                {new Date(report.check_out_time).toLocaleTimeString()}
                              </Typography>
                            </Box>
                          ) : "-"}
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Distance */}
                    <Box sx={{
                      bgcolor: alpha("#f1f5f9", 0.5),
                      p: 1,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}>
                      <DistanceIcon sx={{ color: "#2563EB", fontSize: { xs: 16, sm: 18 } }} />
                      <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#1e293b' }}>
                        Distance: {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "N/A"}
                      </Typography>
                    </Box>

                    {/* Date Tooltip */}
                    <Box sx={{ mt: 1, textAlign: "center" }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                        {report.check_in_time && formatDateTimeDDMMYYYY(report.check_in_time)}
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

  // If first render loader is active, show skeletons for everything except title and button
  if (showFirstRenderLoader) {
    return (
      <Box sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: { xs: 0, sm: 0, md: 0 },
        px: { xs: 0, sm: 0, md: 0 },
      }}>
        <Container
          maxWidth="xl"
          disableGutters={isMobile}
          sx={{ px: { xs: 0, sm: 0, md: 0 } }}
        >
          {/* Header with title and button only (no loading for title, button shows skeleton) */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              mb: { xs: 2, sm: 2.5, md: 2 },
              border: "1px solid",
              borderColor: alpha("#2563EB", 0.1),
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
              <Avatar
                sx={{
                  bgcolor: alpha("#2563EB", 0.1),
                  color: "#2563EB",
                  width: { xs: 40, sm: 44, md: 48 },
                  height: { xs: 40, sm: 44, md: 48 },
                }}
              >
                <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
              </Avatar>
              <Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight="800"
                  gutterBottom
                  sx={{
                    background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                  }}
                >
                  User Reports
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
                  All user check-in/check-out reports
                </Typography>
              </Box>
            </Box>

            {/* Button Skeleton */}
            <HeaderButtonSkeleton isMobile={isMobile} />
          </Paper>

          {/* Search and Filters Skeleton */}
          <SearchFilterSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

          {/* Reports Table/Card View Skeleton */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              border: "1px solid",
              borderColor: alpha("#2563EB", 0.1),
              overflow: "hidden",
            }}
          >
            {isMobile ? (
              <MobileCardSkeleton />
            ) : (
              <>
                <TableContainer>
                  <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
                        <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>#</TableCell>
                        <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>User Name</TableCell>
                        <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Check In</TableCell>
                        <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Check Out</TableCell>
                        <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Distance</TableCell>
                        <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <TableRowSkeleton key={item} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha("#2563EB", 0.1) }}>
                  <Skeleton variant="rounded" width="100%" height={52} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
                </Box>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f8fafc",
      py: { xs: 0, sm: 0, md: 0 },
      px: { xs: 0, sm: 0, md: 3 },
    }}>
      <Container
        maxWidth="xl"
        disableGutters={isMobile}
        sx={{ px: { xs: 0, sm: 0, md: 0 } }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5, md: 3 },
            mb: { xs: 2, sm: 2.5, md: 2 },
            border: "1px solid",
            borderColor: alpha("#2563EB", 0.1),
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
            <Avatar
              sx={{
                bgcolor: alpha("#2563EB", 0.1),
                color: "#2563EB",
                width: { xs: 40, sm: 44, md: 48 },
                height: { xs: 40, sm: 44, md: 48 },
              }}
            >
              <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
            </Avatar>
            <Box>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="800"
                gutterBottom
                sx={{
                  background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                }}
              >
                User Reports
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
                All user check-in/check-out reports
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={isDownloading ? <LinearProgress size={20} sx={{ color: "white" }} /> : <DownloadIcon />}
            onClick={handleDownloadPDF}
            disabled={loading || isDownloading}
            fullWidth={isMobile}
            size={isMobile ? "small" : "medium"}
            sx={{
              background: "linear-gradient(135deg, #2563EB, #1E40AF)",
              "&:hover": { background: "linear-gradient(135deg, #1E40AF, #2563EB)" },
              minWidth: { xs: '100%', sm: 140 },
              fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
              py: { xs: 1, sm: 1.2 },
            }}
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        </Paper>

        {/* Search and Filters */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2 },
            mb: { xs: 2, sm: 2.5, md: 3 },
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            border: "1px solid",
            borderColor: alpha("#2563EB", 0.1),
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
            <TextField
              fullWidth
              placeholder={isSmallMobile ? "Search..." : "Search reports by user name or email..."}
              value={searchQuery}
              onChange={handleSearchChange}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#2563EB", fontSize: { xs: 18, sm: 20 } }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: { xs: 1.5, sm: 2 },
                  bgcolor: alpha("#2563EB", 0.05),
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                },
              }}
            />

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1.5, sm: 2 }}
              sx={{ minWidth: { sm: 400 } }}
            >
              <TextField
                fullWidth
                type="date"
                label="From Date"
                value={dateRange.fromDate}
                onChange={handleDateChange("fromDate")}
                InputLabelProps={{ shrink: true }}
                size={isMobile ? "small" : "small"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: { xs: 1.5, sm: 2 },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  },
                }}
              />
              <TextField
                fullWidth
                type="date"
                label="To Date"
                value={dateRange.toDate}
                onChange={handleDateChange("toDate")}
                InputLabelProps={{ shrink: true }}
                size={isMobile ? "small" : "small"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: { xs: 1.5, sm: 2 },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  },
                }}
              />
            </Stack>
          </Stack>
        </Paper>

        {/* Reports Table/Card View */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 2, sm: 2.5, md: 3 },
            border: "1px solid",
            borderColor: alpha("#2563EB", 0.1),
            overflow: "hidden",
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                bgcolor: alpha("#2563EB", 0.1),
                "& .MuiLinearProgress-bar": { bgcolor: "#2563EB" },
              }}
            />
          )}

          {!loading && reports.length > 0 ? (
            <>
              {isMobile ? (
                <MobileCardView
                  reports={reports}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                />
              ) : (
                <TableContainer sx={{
                  overflowX: 'auto',
                  '&::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha('#2563EB', 0.3),
                    borderRadius: '3px',
                  },
                }}>
                  <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>#</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>User Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Check In</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Check Out</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Distance</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {reports.map((report, index) => (
                          <motion.tr
                            key={report._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.02 }}
                            style={{
                              backgroundColor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
                            }}
                          >
                            <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
                              {currentPage * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Avatar
                                  src={report.user?.avtar}
                                  sx={{
                                    width: { xs: 24, sm: 28, md: 32 },
                                    height: { xs: 24, sm: 28, md: 32 },
                                    bgcolor: alpha("#2563EB", 0.1),
                                    color: "#2563EB",
                                  }}
                                >
                                  {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                                </Avatar>
                                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#1e293b' }}>
                                  {report.user?.name || "-"}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
                              {report.user?.email || "-"}
                            </TableCell>
                            <TableCell>
                              {report.check_in_time ? (
                                <Tooltip title={formatDateTimeDDMMYYYY(report.check_in_time)}>
                                  <Chip
                                    size="small"
                                    icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
                                    label={new Date(report.check_in_time).toLocaleTimeString()}
                                    sx={{
                                      bgcolor: alpha("#2563EB", 0.1),
                                      color: "#2563EB",
                                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                                      height: { xs: 20, sm: 22, md: 24 },
                                    }}
                                  />
                                </Tooltip>
                              ) : "-"}
                            </TableCell>
                            <TableCell>
                              {report.check_out_time ? (
                                <Tooltip title={formatDateTimeDDMMYYYY(report.check_out_time)}>
                                  <Chip
                                    size="small"
                                    icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
                                    label={new Date(report.check_out_time).toLocaleTimeString()}
                                    sx={{
                                      bgcolor: alpha("#64748b", 0.1),
                                      color: "#64748b",
                                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                                      height: { xs: 20, sm: 22, md: 24 },
                                    }}
                                  />
                                </Tooltip>
                              ) : "-"}
                            </TableCell>
                            <TableCell>
                              {report.tracker?.total_distance ? (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <DistanceIcon sx={{ color: "#2563EB", fontSize: { xs: 12, sm: 14, md: 16 } }} />
                                  <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: '#1e293b' }}>
                                    {report.tracker.total_distance.toFixed(2)} km
                                  </Typography>
                                </Box>
                              ) : "-"}
                            </TableCell>
                            <TableCell>
                              {report.tracker?.status && (
                                <Chip
                                  icon={getStatusIcon(report.tracker.status)}
                                  label={report.tracker.status}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
                                    color: getStatusColor(report.tracker.status),
                                    fontWeight: 600,
                                    fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                                    height: { xs: 20, sm: 22, md: 24 },
                                  }}
                                />
                              )}
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
                count={pagination.totalItems || 0}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                sx={{
                  borderTop: "1px solid",
                  borderColor: alpha("#2563EB", 0.1),
                  "& .MuiTablePagination-select": { borderRadius: 2 },
                  '.MuiTablePagination-displayedRows': {
                    fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                  },
                  '.MuiTablePagination-selectLabel': {
                    fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                  },
                }}
              />
            </>
          ) : !loading && (
            <Box sx={{
              p: { xs: 3, sm: 4, md: 5 },
              textAlign: "center"
            }}>
              <ReportIcon sx={{
                fontSize: { xs: 36, sm: 42, md: 48 },
                color: alpha("#2563EB", 0.3),
                mb: 2
              }} />
              <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }}>
                No reports found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
                Try adjusting your search or date filters
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Reports;



