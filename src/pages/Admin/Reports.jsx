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
//         borderColor: alpha("#2563EB", 0.1),
//       }}
//     >
//       <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
//         <Skeleton
//           variant="rounded"
//           height={isMobile ? 40 : 56}
//           sx={{
//             borderRadius: { xs: 1.5, sm: 2 },
//             flex: 1,
//             bgcolor: alpha("#2563EB", 0.1),
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
//             sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha("#2563EB", 0.1) }}
//           />
//           <Skeleton
//             variant="rounded"
//             height={isMobile ? 40 : 56}
//             width="100%"
//             sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha("#2563EB", 0.1) }}
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
//         <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//           <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//           <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
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
//             borderColor: alpha("#2563EB", 0.1),
//           }}
//         >
//           <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
//             {/* Header with Index */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//               <Skeleton variant="rounded" width={50} height={22} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//               <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//             </Box>

//             {/* User Info */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//               <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width="80%" height={24} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//                 <Skeleton variant="text" width="60%" height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//               </Box>
//             </Box>

//             {/* Check In/Out Times */}
//             <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={40} height={12} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={50} height={12} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
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
//               <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//               <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//             </Box>

//             {/* Date */}
//             <Box sx={{ mt: 1, textAlign: "center" }}>
//               <Skeleton variant="text" width={100} height={14} sx={{ mx: "auto", bgcolor: alpha("#2563EB", 0.1) }} />
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
//         bgcolor: alpha("#2563EB", 0.2),
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
//       doc.setTextColor(37, 99, 235); // #2563EB
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
//           fillColor: [37, 99, 235], // #2563EB
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
//                     borderColor: alpha("#2563EB", 0.1),
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
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
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
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
//                         }}
//                       >
//                         {report.user?.name?.charAt(0) || <PersonIcon />}
//                       </Avatar>
//                       <Box sx={{ minWidth: 0 }}>
//                         <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: '#1e293b' }}>
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
//                               <EventIcon sx={{ color: "#2563EB", fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: '#1e293b' }}>
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
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: '#1e293b' }}>
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
//                       <DistanceIcon sx={{ color: "#2563EB", fontSize: { xs: 16, sm: 18 } }} />
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#1e293b' }}>
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
//               borderColor: alpha("#2563EB", 0.1),
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
//                   bgcolor: alpha("#2563EB", 0.1),
//                   color: "#2563EB",
//                   width: { xs: 40, sm: 44, md: 48 },
//                   height: { xs: 40, sm: 44, md: 48 },
//                 }}
//               >
//                 <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
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
//               borderColor: alpha("#2563EB", 0.1),
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
//                       <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>#</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>User Name</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Email</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Check In</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Check Out</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Distance</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha("#2563EB", 0.1) }}>
//                   <Skeleton variant="rounded" width="100%" height={52} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
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
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             mb: { xs: 2, sm: 2.5, md: 2 },
//             border: "1px solid",
//             borderColor: alpha("#2563EB", 0.1),
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
//                 bgcolor: alpha("#2563EB", 0.1),
//                 color: "#2563EB",
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
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #2563EB, #1E40AF)",
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
//               background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//               "&:hover": { background: "linear-gradient(135deg, #1E40AF, #2563EB)" },
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
//             borderColor: alpha("#2563EB", 0.1),
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
//                     <SearchIcon sx={{ color: "#2563EB", fontSize: { xs: 18, sm: 20 } }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   bgcolor: alpha("#2563EB", 0.05),
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
//             borderColor: alpha("#2563EB", 0.1),
//             overflow: "hidden",
//           }}
//         >
//           {loading && (
//             <LinearProgress
//               sx={{
//                 bgcolor: alpha("#2563EB", 0.1),
//                 "& .MuiLinearProgress-bar": { bgcolor: "#2563EB" },
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
//                     backgroundColor: alpha('#2563EB', 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>#</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>User Name</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Email</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Check In</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Check Out</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Distance</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Status</TableCell>
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
//                                     bgcolor: alpha("#2563EB", 0.1),
//                                     color: "#2563EB",
//                                   }}
//                                 >
//                                   {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//                                 </Avatar>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#1e293b' }}>
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
//                                       bgcolor: alpha("#2563EB", 0.1),
//                                       color: "#2563EB",
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
//                                   <DistanceIcon sx={{ color: "#2563EB", fontSize: { xs: 12, sm: 14, md: 16 } }} />
//                                   <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: '#1e293b' }}>
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
//                   borderColor: alpha("#2563EB", 0.1),
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
//                 color: alpha("#2563EB", 0.3),
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








///////////////////////////Date Format change

// import React, { useEffect, useState } from "react";
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
//   Menu,
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
//         borderColor: alpha("#2563EB", 0.1),
//       }}
//     >
//       <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
//         <Skeleton
//           variant="rounded"
//           height={isMobile ? 40 : 56}
//           sx={{
//             borderRadius: { xs: 1.5, sm: 2 },
//             flex: 1,
//             bgcolor: alpha("#2563EB", 0.1),
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
//             sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha("#2563EB", 0.1) }}
//           />
//           <Skeleton
//             variant="rounded"
//             height={isMobile ? 40 : 56}
//             width="100%"
//             sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha("#2563EB", 0.1) }}
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
//         <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//           <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//           <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
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
//             borderColor: alpha("#2563EB", 0.1),
//           }}
//         >
//           <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
//             {/* Header with Index */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//               <Skeleton variant="rounded" width={50} height={22} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//               <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.1) }} />
//             </Box>

//             {/* User Info */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//               <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width="80%" height={24} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//                 <Skeleton variant="text" width="60%" height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//               </Box>
//             </Box>

//             {/* Check In/Out Times */}
//             <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={40} height={12} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={50} height={12} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
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
//               <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//               <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//             </Box>

//             {/* Date */}
//             <Box sx={{ mt: 1, textAlign: "center" }}>
//               <Skeleton variant="text" width={100} height={14} sx={{ mx: "auto", bgcolor: alpha("#2563EB", 0.1) }} />
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
//         bgcolor: alpha("#2563EB", 0.2),
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
//   const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
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

//   const handleDownloadPDF = async () => {
//     setIsDownloading(true);

//     try {
//       const doc = new jsPDF();

//       doc.setFontSize(18);
//       doc.setTextColor(37, 99, 235); // #2563EB
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
//           fillColor: [37, 99, 235], // #2563EB
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

//   // Format date for display (using existing functions)
//   const formatDisplayDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   // Format date with time for tooltip
//   const formatDisplayDateTime = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
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
//                     borderColor: alpha("#2563EB", 0.1),
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
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
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
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
//                         }}
//                       >
//                         {report.user?.name?.charAt(0) || <PersonIcon />}
//                       </Avatar>
//                       <Box sx={{ minWidth: 0 }}>
//                         <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: '#1e293b' }}>
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
//                               <EventIcon sx={{ color: "#2563EB", fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: '#1e293b' }}>
//                                 {formatDisplayDate(report.check_in_time)}
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
//                               <EventIcon sx={{ color: "#2563EB", fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: '#1e293b' }}>
//                                 {formatDisplayDate(report.check_out_time)}
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
//                       <DistanceIcon sx={{ color: "#2563EB", fontSize: { xs: 16, sm: 18 } }} />
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: '#1e293b' }}>
//                         Distance: {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "N/A"}
//                       </Typography>
//                     </Box>

//                     {/* Date Tooltip */}
//                     <Box sx={{ mt: 1, textAlign: "center" }}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                         {report.check_in_time && formatDisplayDate(report.check_in_time)}
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
//               borderColor: alpha("#2563EB", 0.1),
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
//                   bgcolor: alpha("#2563EB", 0.1),
//                   color: "#2563EB",
//                   width: { xs: 40, sm: 44, md: 48 },
//                   height: { xs: 40, sm: 44, md: 48 },
//                 }}
//               >
//                 <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
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
//               borderColor: alpha("#2563EB", 0.1),
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
//                       <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>#</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>User Name</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Email</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Check In</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Check Out</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Distance</TableCell>
//                         <TableCell sx={{ color: '#2563EB', fontWeight: 600 }}>Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha("#2563EB", 0.1) }}>
//                   <Skeleton variant="rounded" width="100%" height={52} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//                 </Box>
//               </>
//             )}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   const hasActiveFilter = dateRange.fromDate || dateRange.toDate;

//   return (
//     <Box sx={{
//       minHeight: "100vh",
//       bgcolor: "#f8fafc",
//       py: { xs: 0, sm: 0, md: 0 },
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
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             mb: { xs: 2, sm: 2.5, md: 2 },
//             border: "1px solid",
//             borderColor: alpha("#2563EB", 0.1),
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
//                 bgcolor: alpha("#2563EB", 0.1),
//                 color: "#2563EB",
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
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #2563EB, #1E40AF)",
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
//               background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//               "&:hover": { background: "linear-gradient(135deg, #1E40AF, #2563EB)" },
//               minWidth: { xs: '100%', sm: 140 },
//               fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//               py: { xs: 1, sm: 1.2 },
//             }}
//           >
//             {isDownloading ? "Downloading..." : "Download PDF"}
//           </Button>
//         </Paper>

//         {/* Search and Filters - Updated to match UserManagement style */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             mb: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#2563EB", 0.1),
//           }}
//         >
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 placeholder={isSmallMobile ? "Search..." : "Search reports by user name or email..."}
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 size={isMobile ? "small" : "medium"}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "#2563EB", fontSize: { xs: 18, sm: 20 } }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: { xs: 2, sm: 3 },
//                     bgcolor: alpha('#2563EB', 0.05),
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     '&:hover fieldset': {
//                       borderColor: '#2563EB',
//                     },
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 gap: 1, 
//                 justifyContent: { xs: 'flex-start', md: 'flex-end' },
//                 flexWrap: 'wrap'
//               }}>
//                 {/* Date Filter Button */}
//                 <Button
//                   variant="outlined"
//                   startIcon={<CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                   onClick={handleDateFilterClick}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     borderColor: '#e2e8f0',
//                     color: '#64748b',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     position: 'relative',
//                     '&:hover': {
//                       borderColor: '#2563EB',
//                       color: '#2563EB',
//                       bgcolor: alpha('#2563EB', 0.05),
//                     },
//                   }}
//                 >
//                   Date Filter
//                   {hasActiveFilter && (
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: -4,
//                         right: -4,
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         bgcolor: '#ef4444',
//                         border: '2px solid white',
//                       }}
//                     />
//                   )}
//                 </Button>

//                 {/* Results Count Button */}
//                 <Button
//                   variant="outlined"
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     borderColor: '#e2e8f0',
//                     color: '#64748b',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     '&:hover': {
//                       borderColor: '#2563EB',
//                       color: '#2563EB',
//                       bgcolor: alpha('#2563EB', 0.05),
//                     },
//                   }}
//                 >
//                   {reports.length} {reports.length === 1 ? 'Result' : 'Results'}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Date Filter Menu - Exactly like UserManagement */}
//           <Menu
//             anchorEl={dateFilterAnchor}
//             open={Boolean(dateFilterAnchor)}
//             onClose={handleDateFilterClose}
//             PaperProps={{
//               sx: {
//                 p: 2,
//                 width: { xs: 280, sm: 320 },
//                 borderRadius: { xs: 2, sm: 3 },
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                 border: '1px solid',
//                 borderColor: alpha('#2563EB', 0.1),
//               },
//             }}
//           >
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#2563EB' }}>
//                   Start Date
//                 </Typography>
//                 <DatePicker
//                   value={startDate}
//                   onChange={setStartDate}
//                   renderInput={(params) => (
//                     <TextField {...params} fullWidth size="small" />
//                   )}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#2563EB' }}>
//                   End Date
//                 </Typography>
//                 <DatePicker
//                   value={endDate}
//                   onChange={setEndDate}
//                   renderInput={(params) => (
//                     <TextField {...params} fullWidth size="small" />
//                   )}
//                 />
//               </Box>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//                 <Button 
//                   size="small" 
//                   onClick={clearDateFilter} 
//                   sx={{ 
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' }, 
//                     color: '#64748b',
//                     '&:hover': {
//                       color: '#2563EB',
//                     },
//                   }}
//                 >
//                   Clear
//                 </Button>
//                 <Button 
//                   size="small" 
//                   variant="contained" 
//                   onClick={applyDateFilter} 
//                   sx={{ 
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     bgcolor: '#2563EB',
//                     '&:hover': { bgcolor: '#1E40AF' },
//                   }}
//                 >
//                   Apply
//                 </Button>
//               </Box>
//             </LocalizationProvider>
//           </Menu>
//         </Paper>

//         {/* Reports Table/Card View */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#2563EB", 0.1),
//             overflow: "hidden",
//           }}
//         >
//           {loading && (
//             <LinearProgress
//               sx={{
//                 bgcolor: alpha("#2563EB", 0.1),
//                 "& .MuiLinearProgress-bar": { bgcolor: "#2563EB" },
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
//                     backgroundColor: alpha('#2563EB', 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>#</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>User Name</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Email</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Check In</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Check Out</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Distance</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#2563EB' }}>Status</TableCell>
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
//                                     bgcolor: alpha("#2563EB", 0.1),
//                                     color: "#2563EB",
//                                   }}
//                                 >
//                                   {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//                                 </Avatar>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#1e293b' }}>
//                                   {report.user?.name || "-"}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
//                               {report.user?.email || "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_in_time ? (
//                                 <Tooltip title={formatDisplayDateTime(report.check_in_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={formatDisplayDate(report.check_in_time)}
//                                     sx={{
//                                       bgcolor: alpha("#2563EB", 0.1),
//                                       color: "#2563EB",
//                                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                       height: { xs: 20, sm: 22, md: 24 },
//                                     }}
//                                   />
//                                 </Tooltip>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_out_time ? (
//                                 <Tooltip title={formatDisplayDateTime(report.check_out_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={formatDisplayDate(report.check_out_time)}
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
//                                   <DistanceIcon sx={{ color: "#2563EB", fontSize: { xs: 12, sm: 14, md: 16 } }} />
//                                   <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: '#1e293b' }}>
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
//                   borderColor: alpha("#2563EB", 0.1),
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
//                 color: alpha("#2563EB", 0.3),
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























//////////////////////////////    Centralised Color     ///////////////////////////////


// import React, { useEffect, useState } from "react";
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
//   Menu,
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

// // Search and Filter Skeleton
// const SearchFilterSkeleton = ({ isMobile, isSmallMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2 },
//         mb: { xs: 2, sm: 2.5, md: 3 },
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//       }}
//     >
//       <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 2 }}>
//         <Skeleton
//           variant="rounded"
//           height={isMobile ? 40 : 56}
//           sx={{
//             borderRadius: { xs: 1.5, sm: 2 },
//             flex: 1,
//             bgcolor: alpha(theme.palette.primary.main, 0.1),
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
//             sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//           />
//           <Skeleton
//             variant="rounded"
//             height={isMobile ? 40 : 56}
//             width="100%"
//             sx={{ borderRadius: { xs: 1.5, sm: 2 }, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//           />
//         </Stack>
//       </Stack>
//     </Paper>
//   );
// };

// // Table Row Skeleton
// const TableRowSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <TableRow>
//       <TableCell>
//         <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={120} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//           <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
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
//             mb: 2,
//             borderRadius: 3,
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
//             {/* Header with Index */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//               <Skeleton variant="rounded" width={50} height={22} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>

//             {/* User Info */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
//               <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box sx={{ flex: 1 }}>
//                 <Skeleton variant="text" width="80%" height={24} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width="60%" height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>

//             {/* Check In/Out Times */}
//             <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={40} height={12} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={50} height={12} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   </Box>
//                 </Box>
//               </Grid>
//             </Grid>

//             {/* Distance */}
//             <Box sx={{
//               bgcolor: alpha(theme.palette.primary.main, 0.03),
//               p: 1,
//               borderRadius: 2,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}>
//               <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>

//             {/* Date */}
//             <Box sx={{ mt: 1, textAlign: "center" }}>
//               <Skeleton variant="text" width={100} height={14} sx={{ mx: "auto", bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
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
//       width={isMobile ? '100%' : 140}
//       height={isMobile ? 36 : 40}
//       sx={{
//         borderRadius: 2,
//         minWidth: { xs: '100%', sm: 140 },
//         bgcolor: alpha(theme.palette.primary.main, 0.2),
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
//   const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
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

//   const handleDownloadPDF = async () => {
//     setIsDownloading(true);

//     try {
//       const doc = new jsPDF();

//       doc.setFontSize(18);
//       doc.setTextColor(theme.palette.primary.main); // Using primary color
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
//           fillColor: [37, 99, 235], // Using primary color RGB values
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
//         return theme.palette.text.secondary;
//     }
//   };

//   // Format date for display (using existing functions)
//   const formatDisplayDate = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   // Format date with time for tooltip
//   const formatDisplayDateTime = (dateString) => {
//     if (!dateString) return "-";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   // Mobile Card View Component
//   const MobileCardView = ({ reports, currentPage, rowsPerPage }) => {
//     const theme = useTheme();
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
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     bgcolor: index % 2 === 0 ? "background.paper" : alpha(theme.palette.primary.main, 0.02),
//                   }}
//                 >
//                   <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
//                     {/* Header with Index */}
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                       <Chip
//                         label={`#${globalIndex}`}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
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
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                         }}
//                       >
//                         {report.user?.name?.charAt(0) || <PersonIcon />}
//                       </Avatar>
//                       <Box sx={{ minWidth: 0 }}>
//                         <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: 'text.primary' }}>
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
//                         <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             Check In
//                           </Typography>
//                           {report.check_in_time ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
//                                 {formatDisplayDate(report.check_in_time)}
//                               </Typography>
//                             </Box>
//                           ) : "-"}
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                           <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                             Check Out
//                           </Typography>
//                           {report.check_out_time ? (
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 12, sm: 14 } }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: 'text.primary' }}>
//                                 {formatDisplayDate(report.check_out_time)}
//                               </Typography>
//                             </Box>
//                           ) : "-"}
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     {/* Distance */}
//                     <Box sx={{
//                       bgcolor: alpha(theme.palette.primary.main, 0.03),
//                       p: 1,
//                       borderRadius: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                     }}>
//                       <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 16, sm: 18 } }} />
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: 'text.primary' }}>
//                         Distance: {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "N/A"}
//                       </Typography>
//                     </Box>

//                     {/* Date Tooltip */}
//                     <Box sx={{ mt: 1, textAlign: "center" }}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                         {report.check_in_time && formatDisplayDate(report.check_in_time)}
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
//         bgcolor: alpha(theme.palette.primary.main, 0.05),
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
//               borderColor: alpha(theme.palette.primary.main, 0.1),
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
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   width: { xs: 40, sm: 44, md: 48 },
//                   height: { xs: 40, sm: 44, md: 48 },
//                 }}
//               >
//                 <ReportIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
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
//               borderColor: alpha(theme.palette.primary.main, 0.1),
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
//                       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>#</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>User Name</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Email</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Check In</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Check Out</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Distance</TableCell>
//                         <TableCell sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {[1, 2, 3, 4, 5].map((item) => (
//                         <TableRowSkeleton key={item} />
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                   <Skeleton variant="rounded" width="100%" height={52} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </>
//             )}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   const hasActiveFilter = dateRange.fromDate || dateRange.toDate;

//   return (
//     <Box sx={{
//       minHeight: "100vh",
//       bgcolor: alpha(theme.palette.primary.main, 0.05),
//       py: { xs: 0, sm: 0, md: 0 },
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
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             mb: { xs: 2, sm: 2.5, md: 2 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
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
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
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
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
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
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               "&:hover": { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` },
//               minWidth: { xs: '100%', sm: 140 },
//               fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//               py: { xs: 1, sm: 1.2 },
//             }}
//           >
//             {isDownloading ? "Downloading..." : "Download PDF"}
//           </Button>
//         </Paper>

//         {/* Search and Filters - Updated to match UserManagement style */}
//         <Paper
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             mb: { xs: 2, sm: 2.5, md: 3 },
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 placeholder={isSmallMobile ? "Search..." : "Search reports by user name or email..."}
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 size={isMobile ? "small" : "medium"}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 18, sm: 20 } }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: { xs: 2, sm: 3 },
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     '&:hover fieldset': {
//                       borderColor: theme.palette.primary.main,
//                     },
//                   },
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 gap: 1, 
//                 justifyContent: { xs: 'flex-start', md: 'flex-end' },
//                 flexWrap: 'wrap'
//               }}>
//                 {/* Date Filter Button */}
//                 <Button
//                   variant="outlined"
//                   startIcon={<CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                   onClick={handleDateFilterClick}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     borderColor: alpha(theme.palette.divider, 0.5),
//                     color: 'text.secondary',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     position: 'relative',
//                     '&:hover': {
//                       borderColor: theme.palette.primary.main,
//                       color: theme.palette.primary.main,
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                     },
//                   }}
//                 >
//                   Date Filter
//                   {hasActiveFilter && (
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: -4,
//                         right: -4,
//                         width: 8,
//                         height: 8,
//                         borderRadius: '50%',
//                         bgcolor: '#ef4444',
//                         border: '2px solid white',
//                       }}
//                     />
//                   )}
//                 </Button>

//                 {/* Results Count Button */}
//                 <Button
//                   variant="outlined"
//                   size={isMobile ? "small" : "medium"}
//                   sx={{
//                     borderColor: alpha(theme.palette.divider, 0.5),
//                     color: 'text.secondary',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     '&:hover': {
//                       borderColor: theme.palette.primary.main,
//                       color: theme.palette.primary.main,
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                     },
//                   }}
//                 >
//                   {reports.length} {reports.length === 1 ? 'Result' : 'Results'}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>

//           {/* Date Filter Menu - Exactly like UserManagement */}
//           <Menu
//             anchorEl={dateFilterAnchor}
//             open={Boolean(dateFilterAnchor)}
//             onClose={handleDateFilterClose}
//             PaperProps={{
//               sx: {
//                 p: 2,
//                 width: { xs: 280, sm: 320 },
//                 borderRadius: { xs: 2, sm: 3 },
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                 border: '1px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//               },
//             }}
//           >
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: theme.palette.primary.main }}>
//                   Start Date
//                 </Typography>
//                 <DatePicker
//                   value={startDate}
//                   onChange={setStartDate}
//                   renderInput={(params) => (
//                     <TextField {...params} fullWidth size="small" />
//                   )}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: theme.palette.primary.main }}>
//                   End Date
//                 </Typography>
//                 <DatePicker
//                   value={endDate}
//                   onChange={setEndDate}
//                   renderInput={(params) => (
//                     <TextField {...params} fullWidth size="small" />
//                   )}
//                 />
//               </Box>
//               <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//                 <Button 
//                   size="small" 
//                   onClick={clearDateFilter} 
//                   sx={{ 
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' }, 
//                     color: 'text.secondary',
//                     '&:hover': {
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   Clear
//                 </Button>
//                 <Button 
//                   size="small" 
//                   variant="contained" 
//                   onClick={applyDateFilter} 
//                   sx={{ 
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                     bgcolor: theme.palette.primary.main,
//                     '&:hover': { bgcolor: theme.palette.primary.dark },
//                   }}
//                 >
//                   Apply
//                 </Button>
//               </Box>
//             </LocalizationProvider>
//           </Menu>
//         </Paper>

//         {/* Reports Table/Card View */}
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             overflow: "hidden",
//           }}
//         >
//           {loading && (
//             <LinearProgress
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main },
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
//                     backgroundColor: alpha(theme.palette.primary.main, 0.3),
//                     borderRadius: '3px',
//                   },
//                 }}>
//                   <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>#</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>User Name</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>Email</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>Check In</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>Check Out</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>Distance</TableCell>
//                         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: theme.palette.primary.main }}>Status</TableCell>
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
//                               backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
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
//                                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                     color: theme.palette.primary.main,
//                                   }}
//                                 >
//                                   {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//                                 </Avatar>
//                                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: 'text.primary' }}>
//                                   {report.user?.name || "-"}
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.secondary' }}>
//                               {report.user?.email || "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_in_time ? (
//                                 <Tooltip title={formatDisplayDateTime(report.check_in_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={formatDisplayDate(report.check_in_time)}
//                                     sx={{
//                                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                                       color: theme.palette.primary.main,
//                                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                                       height: { xs: 20, sm: 22, md: 24 },
//                                     }}
//                                   />
//                                 </Tooltip>
//                               ) : "-"}
//                             </TableCell>
//                             <TableCell>
//                               {report.check_out_time ? (
//                                 <Tooltip title={formatDisplayDateTime(report.check_out_time)}>
//                                   <Chip
//                                     size="small"
//                                     icon={<EventIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                                     label={formatDisplayDate(report.check_out_time)}
//                                     sx={{
//                                       bgcolor: alpha(theme.palette.text.secondary, 0.1),
//                                       color: theme.palette.text.secondary,
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
//                                   <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 12, sm: 14, md: 16 } }} />
//                                   <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
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
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
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
//                 color: alpha(theme.palette.primary.main, 0.3),
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



import React, { useEffect, useState, useMemo } from "react";
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
  Stack,
  Chip,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Menu,
  Divider,
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
  CalendarToday as CalendarIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getReportsByAdmin } from "../../redux/slices/reportSlice";
import { formatDateTimeDDMMYYYY, formatDateDDMMYYYY } from "../../utils/dateFormat";
import { useDebounce } from "../../Hooks/useDebounce";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

// Search and Filter Skeleton - Matching UserManagement style
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
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Table Row Skeleton - Matching UserManagement style
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
        <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </TableCell>
    </TableRow>
  );
};

// Mobile Card View Skeleton - Matching UserManagement style
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
            {/* Header with Index */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
              <Skeleton variant="rounded" width={45} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="rounded" width={70} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>

            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={20} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </Box>

            {/* Check In/Out Times */}
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

            {/* Distance */}
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

// Mobile Card View Component - Matching UserManagement style
const MobileCardView = ({ reports, currentPage, rowsPerPage }) => {
  const theme = useTheme();

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "checked in":
        return <CheckInIcon sx={{ color: "#22c55e", fontSize: 14 }} />;
      case "checked out":
        return <CheckOutIcon sx={{ color: "#ef4444", fontSize: 14 }} />;
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
        return theme.palette.text.secondary;
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
                  {/* Header with Index */}
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
                    {report.tracker?.status && (
                      <Chip
                        icon={getStatusIcon(report.tracker.status)}
                        label={report.tracker.status}
                        size="small"
                        sx={{
                          bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
                          color: getStatusColor(report.tracker.status),
                          fontWeight: 600,
                          fontSize: '0.6rem',
                          height: 20,
                        }}
                      />
                    )}
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
                            <EventIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
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
                            <EventIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
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
                      {report.tracker?.total_distance ? `${report.tracker.total_distance.toFixed(2)} km` : "N/A"}
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

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const { reports = [], pagination = {}, loading = false } = useSelector((state) => state.report || {});

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

  // Memoized sorted reports
  const sortedReports = useMemo(() => {
    if (!reports || reports.length === 0) return [];

    return [...reports].sort((a, b) => {
      // Use check_in_time for sorting, fallback to createdAt
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
    setDateRange({
      fromDate: startDate ? startDate.toISOString().split('T')[0] : "",
      toDate: endDate ? endDate.toISOString().split('T')[0] : ""
    });
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

  const handleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
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
          `Date range: ${dateRange.fromDate
            ? formatDateDDMMYYYY(dateRange.fromDate)
            : "Start"
          } - ${dateRange.toDate
            ? formatDateDDMMYYYY(dateRange.toDate)
            : "End"
          }`,
          105,
          45,
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

      const data = sortedReports.map((report, index) => [
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
          fillColor: [37, 99, 235],
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
        return <CheckInIcon sx={{ color: "#22c55e", fontSize: 14 }} />;
      case "checked out":
        return <CheckOutIcon sx={{ color: "#ef4444", fontSize: 14 }} />;
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
        return theme.palette.text.secondary;
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

  const hasActiveFilter = dateRange.fromDate || dateRange.toDate;

  // If first render loader is active, show skeletons
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
        {/* Header with title */}
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
              variant={isMobile ? "h6" : "h5"}
              fontWeight="700"
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem',
                  md: '1.4rem',
                  lg: '1.6rem',
                  xl: '1.8rem'
                },
              }}
            >
              User Reports
            </Typography>
          </Box>

          {/* Button skeleton */}
          <HeaderButtonSkeleton isMobile={isMobile} />
        </Box>

        {/* Search and Filters Skeleton */}
        <SearchFilterSkeleton isMobile={isMobile} />

        {/* Reports Table/Card View Skeleton */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: { xs: 2, sm: 2.5 },
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
            overflow: "hidden",
          }}
        >
          {isMobile ? (
            <MobileCardSkeleton />
          ) : (
            <>
              <TableContainer>
                <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>User</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Check In</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Check Out</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Distance</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Status</TableCell>
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

  // Get paginated reports from sorted reports
  const paginatedReports = sortedReports.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

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
            variant={isMobile ? "h6" : "h5"}
            fontWeight="700"
            gutterBottom
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: {
                xs: '1rem',
                sm: '1.2rem',
                md: '1.4rem',
                lg: '1.6rem',
                xl: '1.8rem'
              },
            }}
          >
            User Reports
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
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
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
            },
          }}
        >
          {isDownloading ? "Downloading..." : "Download PDF"}
        </Button>
      </Box>

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
        <Grid container spacing={1.5} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search reports..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: { xs: 2, sm: 2.5 },
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  height: 38,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              display: 'flex',
              gap: 1,
              justifyContent: { xs: 'flex-start', md: 'flex-end' },
              flexWrap: 'wrap'
            }}>
              <Button
                variant="outlined"
                startIcon={<CalendarIcon sx={{ fontSize: 16 }} />}
                onClick={handleDateFilterClick}
                size="small"
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.5),
                  color: 'text.secondary',
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  height: 34,
                  position: 'relative',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Date Filter
                {hasActiveFilter && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -2,
                      right: -2,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#ef4444',
                      border: '1px solid white',
                    }}
                  />
                )}
              </Button>

              <Button
                variant="outlined"
                startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />}
                onClick={handleSort}
                size="small"
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.5),
                  color: 'text.secondary',
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  height: 34,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Date {sortOrder === 'asc' ? '(Oldest)' : '(Latest)'}
              </Button>

              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.5),
                  color: 'text.secondary',
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  height: 34,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {sortedReports.length} Results
              </Button>
            </Box>
          </Grid>
        </Grid>
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
            <Button
              size="small"
              onClick={clearDateFilter}
              sx={{
                fontSize: '0.65rem',
                color: 'text.secondary',
                height: 28,
                px: 1,
                borderRadius: 1.5,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Clear
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={applyDateFilter}
              sx={{
                fontSize: '0.65rem',
                bgcolor: theme.palette.primary.main,
                height: 28,
                px: 1.5,
                borderRadius: 1.5,
                '&:hover': { bgcolor: theme.palette.primary.dark },
              }}
            >
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
        {loading && (
          <LinearProgress
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main },
              height: 2,
            }}
          />
        )}

        {!loading && sortedReports.length > 0 ? (
          <>
            {isMobile ? (
              <MobileCardView
                reports={paginatedReports}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
              />
            ) : (
              // <TableContainer sx={{
              //   overflowX: 'auto',
              //   maxHeight: { xs: '450px', sm: '500px', md: '550px' },
              //   '&::-webkit-scrollbar': {
              //     height: '6px',
              //     width: '6px',
              //   },
              //   '&::-webkit-scrollbar-thumb': {
              //     backgroundColor: alpha(theme.palette.primary.main, 0.3),
              //     borderRadius: '3px',
              //   },
              // }}>
              //   <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
              //     <TableHead>
              //       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>#</TableCell>
              //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>User</TableCell>
              //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Email</TableCell>
              //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Check In</TableCell>
              //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Check Out</TableCell>
              //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Distance</TableCell>
              //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1 }}>Status</TableCell>
              //       </TableRow>
              //     </TableHead>
              //     <TableBody>
              //       <AnimatePresence>
              //         {paginatedReports.map((report, index) => (
              //           <motion.tr
              //             key={report._id}
              //             initial={{ opacity: 0, y: 10 }}
              //             animate={{ opacity: 1, y: 0 }}
              //             exit={{ opacity: 0 }}
              //             transition={{ duration: 0.2, delay: index * 0.02 }}
              //             style={{
              //               backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
              //             }}
              //             onMouseEnter={(e) => {
              //               if (!isMobile) {
              //                 e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
              //               }
              //             }}
              //             onMouseLeave={(e) => {
              //               if (!isMobile) {
              //                 e.currentTarget.style.backgroundColor = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
              //               }
              //             }}
              //           >
              //             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, py: 0.8 }}>
              //               {currentPage * rowsPerPage + index + 1}
              //             </TableCell>
              //             <TableCell sx={{ py: 0.8 }}>
              //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              //                 <Avatar
              //                   src={report.user?.avtar}
              //                   sx={{
              //                     width: { xs: 26, sm: 28 },
              //                     height: { xs: 26, sm: 28 },
              //                     bgcolor: alpha(theme.palette.primary.main, 0.1),
              //                     color: theme.palette.primary.main,
              //                   }}
              //                 >
              //                   {report.user?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 12 }} />}
              //                 </Avatar>
              //                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.primary' }}>
              //                   {report.user?.name || "-"}
              //                 </Typography>
              //               </Box>
              //             </TableCell>
              //             <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, py: 0.8, color: 'text.secondary' }}>
              //               {report.user?.email || "-"}
              //             </TableCell>
              //             <TableCell sx={{ py: 0.8 }}>
              //               {report.check_in_time ? (
              //                 <Tooltip title={formatDisplayDateTime(report.check_in_time)}>
              //                   <Chip
              //                     size="small"
              //                     icon={<EventIcon sx={{ fontSize: 12 }} />}
              //                     label={formatDisplayDate(report.check_in_time)}
              //                     sx={{
              //                       bgcolor: alpha(theme.palette.primary.main, 0.1),
              //                       color: theme.palette.primary.main,
              //                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
              //                       height: 22,
              //                     }}
              //                   />
              //                 </Tooltip>
              //               ) : (
              //                 <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>-</Typography>
              //               )}
              //             </TableCell>
              //             <TableCell sx={{ py: 0.8 }}>
              //               {report.check_out_time ? (
              //                 <Tooltip title={formatDisplayDateTime(report.check_out_time)}>
              //                   <Chip
              //                     size="small"
              //                     icon={<EventIcon sx={{ fontSize: 12 }} />}
              //                     label={formatDisplayDate(report.check_out_time)}
              //                     sx={{
              //                       bgcolor: alpha(theme.palette.text.secondary, 0.1),
              //                       color: theme.palette.text.secondary,
              //                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
              //                       height: 22,
              //                     }}
              //                   />
              //                 </Tooltip>
              //               ) : (
              //                 <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>-</Typography>
              //               )}
              //             </TableCell>
              //             <TableCell sx={{ py: 0.8 }}>
              //               {report.tracker?.total_distance ? (
              //                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              //                   <DistanceIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
              //                   <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
              //                     {report.tracker.total_distance.toFixed(2)} km
              //                   </Typography>
              //                 </Box>
              //               ) : (
              //                 <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>-</Typography>
              //               )}
              //             </TableCell>
              //             <TableCell sx={{ py: 0.8 }}>
              //               {report.tracker?.status && (
              //                 <Chip
              //                   icon={getStatusIcon(report.tracker.status)}
              //                   label={report.tracker.status}
              //                   size="small"
              //                   sx={{
              //                     bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
              //                     color: getStatusColor(report.tracker.status),
              //                     fontWeight: 600,
              //                     fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
              //                     height: 22,
              //                   }}
              //                 />
              //               )}
              //             </TableCell>
              //           </motion.tr>
              //         ))}
              //       </AnimatePresence>
              //     </TableBody>
              //   </Table>
              // </TableContainer>
              <TableContainer sx={{
                overflowX: 'auto',
                maxHeight: { xs: '450px', sm: '500px', md: '550px' },
                '&::-webkit-scrollbar': {
                  height: '6px',
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.3),
                  borderRadius: '3px',
                },
              }}>
                <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>User</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check In</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Check Out</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Distance</TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, py: 1.5 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence>
                      {paginatedReports.map((report, index) => (
                        <motion.tr
                          key={report._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          style={{
                            backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
                          }}
                          onMouseEnter={(e) => {
                            if (!isMobile) {
                              e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isMobile) {
                              e.currentTarget.style.backgroundColor = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
                            }
                          }}
                        >
                          <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, py: 1.2 }}>
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
                              <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
                                {report.user?.name || "-"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, py: 1.2, color: 'text.secondary' }}>
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
                                    fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
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
                                    fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
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
                                <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.primary' }}>
                                  {report.tracker.total_distance.toFixed(2)} km
                                </Typography>
                              </Box>
                            ) : (
                              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>-</Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            {report.tracker?.status && (
                              <Chip
                                icon={getStatusIcon(report.tracker.status)}
                                label={report.tracker.status}
                                size="small"
                                sx={{
                                  bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
                                  color: getStatusColor(report.tracker.status),
                                  fontWeight: 600,
                                  fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                                  height: 26,
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
              count={sortedReports.length}
              page={currentPage}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
              sx={{
                borderTop: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                "& .MuiTablePagination-select": { borderRadius: 1.5, fontSize: '0.65rem' },
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
              fontSize: { xs: 40, sm: 48, md: 56 },
              color: alpha(theme.palette.primary.main, 0.2),
              mb: 2
            }} />
            <Typography variant="body1" color="text.primary" fontWeight={500} gutterBottom sx={{ fontSize: '1rem' }}>
              No reports found
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Try adjusting your search or date filters
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Reports;