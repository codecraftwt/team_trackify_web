///////////////////////////// Change Color Theam/////////////////////////////////////


// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableFooter,
//   LinearProgress,
//   Box,
//   Typography,
//   Chip,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Tooltip,
//   alpha,
//   useTheme,
//   Avatar,
//   Stack,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   FilterList as FilterIcon,
//   PictureAsPdf as PdfIcon,
//   Clear as ClearIcon,
//   Check as CheckIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const PaginatedTable = ({
//   title = "Data List",
//   subtitle = "Complete list of items",
//   icon = null,
//   iconColor = "#2563EB",
//   columns = [],
//   data = [],
//   totalPages = 1,
//   totalCount = 0,
//   currentPage = 1,
//   onPageChange = () => { },
//   loading = false,
//   rowRender = null,
//   mobileCardRender = null,
//   showDateFilter = false,
//   onDateChange,
//   currentDateRange,
//   itemsPerPage = 10,
//   onItemsPerPageChange,
//   showExportPdf = false,
//   onExportPdf,
//   customActions = null,
//   primaryColor = "#2563EB",
// }) => {
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const [page, setPage] = useState(currentPage - 1);
//   const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
//   const [showDateModal, setShowDateModal] = useState(false);
//   const [dateRange, setDateRange] = useState(
//     currentDateRange || { fromDate: "", toDate: "" }
//   );

//   useEffect(() => {
//     setPage(currentPage - 1);
//   }, [currentPage]);

//   useEffect(() => {
//     setRowsPerPage(itemsPerPage);
//   }, [itemsPerPage]);

//   useEffect(() => {
//     setDateRange(currentDateRange || { fromDate: "", toDate: "" });
//   }, [currentDateRange]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     onPageChange(newPage + 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = parseInt(event.target.value, 10);
//     setRowsPerPage(newRowsPerPage);
//     setPage(0);
//     onItemsPerPageChange(newRowsPerPage);
//     onPageChange(1);
//   };

//   const handleApplyFilter = () => {
//     setShowDateModal(false);
//     onDateChange(dateRange);
//   };

//   const handleClearFilter = () => {
//     const clearedRange = { fromDate: "", toDate: "" };
//     setDateRange(clearedRange);
//     onDateChange(clearedRange);
//     setShowDateModal(false);
//   };

//   const hasActiveFilter = currentDateRange?.fromDate || currentDateRange?.toDate;

//   // Calculate minimum table width for scrolling
//   const getTableMinWidth = () => {
//     if (isSmallMobile) return 500;
//     if (isMobile) return 600;
//     if (isTablet) return 700;
//     return 800;
//   };

//   // Get responsive font sizes
//   const getResponsiveFontSize = (baseSize) => {
//     if (isSmallMobile) return `calc(${baseSize} * 0.7)`;
//     if (isMobile) return `calc(${baseSize} * 0.8)`;
//     if (isTablet) return `calc(${baseSize} * 0.9)`;
//     return baseSize;
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha(primaryColor, 0.1),
//         overflow: "hidden",
//         position: "relative",
//         width: '100%',
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: { xs: 1.5, sm: 2, md: 3 },
//           background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"})`,
//           color: "white",
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: { xs: 1.5, sm: 2 },
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: { xs: 1, sm: 2 },
//           width: { xs: '100%', sm: 'auto' }
//         }}>
//           {icon && (
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: { xs: 32, sm: 40, md: 48 },
//                 height: { xs: 32, sm: 40, md: 48 },
//                 '& svg': {
//                   fontSize: { xs: 16, sm: 20, md: 24 }
//                 }
//               }}
//             >
//               {icon}
//             </Avatar>
//           )}
//           <Box>
//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               fontWeight={600}
//               color="white"
//               sx={{
//                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
//               }}
//             >
//               {title}
//             </Typography>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.8),
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 display: { xs: 'none', sm: 'block' }
//               }}
//             >
//               {subtitle}
//             </Typography>
//           </Box>
//         </Box>

//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           spacing={1}
//           sx={{
//             width: { xs: '100%', sm: 'auto' },
//             alignItems: { xs: 'stretch', sm: 'center' }
//           }}
//         >
//           {showDateFilter && (
//             <Tooltip title="Date Filter">
//               <Button
//                 variant="contained"
//                 size={isMobile ? "small" : "small"}
//                 startIcon={<FilterIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 onClick={() => setShowDateModal(true)}
//                 fullWidth={isMobile}
//                 sx={{
//                   bgcolor: "white",
//                   color: primaryColor,
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                   py: { xs: 0.5, sm: 0.75 },
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.9),
//                   },
//                   position: "relative",
//                 }}
//               >
//                 Date Filter
//                 {hasActiveFilter && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: -4,
//                       right: -4,
//                       width: 8,
//                       height: 8,
//                       borderRadius: "50%",
//                       bgcolor: "#ef4444",
//                       border: "2px solid white",
//                     }}
//                   />
//                 )}
//               </Button>
//             </Tooltip>
//           )}

//           {showExportPdf && (
//             <Tooltip title="Export PDF">
//               <Button
//                 variant="contained"
//                 size={isMobile ? "small" : "small"}
//                 startIcon={<PdfIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 onClick={onExportPdf}
//                 fullWidth={isMobile}
//                 sx={{
//                   bgcolor: "white",
//                   color: primaryColor,
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                   py: { xs: 0.5, sm: 0.75 },
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.9),
//                   },
//                 }}
//               >
//                 Export PDF
//               </Button>
//             </Tooltip>
//           )}

//           {customActions}

//           <Chip
//             label={`${totalCount || data.length} ${(totalCount || data.length) === 1 ? 'Result' : 'Results'}`}
//             size={isMobile ? "small" : "small"}
//             sx={{
//               bgcolor: alpha("#ffffff", 0.2),
//               color: "white",
//               fontWeight: 600,
//               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//               height: { xs: 24, sm: 28 },
//               alignSelf: 'center',
//             }}
//           />
//         </Stack>
//       </Box>

//       {/* Loading Indicator */}
//       {loading && (
//         <LinearProgress
//           sx={{
//             bgcolor: alpha(primaryColor, 0.1),
//             "& .MuiLinearProgress-bar": {
//               bgcolor: primaryColor,
//             },
//           }}
//         />
//       )}

//       {/* Mobile Card View */}
//       {isMobile && mobileCardRender ? (
//         <Box sx={{ p: { xs: 1, sm: 2 } }}>
//           {data.map((item, index) => mobileCardRender(item, index))}
//         </Box>
//       ) : (
//         /* Desktop/Tablet Table View */
//         <TableContainer sx={{
//           maxHeight: { xs: "calc(100vh - 350px)", sm: "calc(100vh - 300px)" },
//           overflowX: 'auto',
//           '&::-webkit-scrollbar': {
//             height: '6px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: alpha(primaryColor, 0.3),
//             borderRadius: '3px',
//           },
//         }}>
//           <Table stickyHeader sx={{ minWidth: getTableMinWidth() }}>
//             <TableHead>
//               <TableRow>
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     sx={{
//                       bgcolor: alpha(primaryColor, 0.05),
//                       fontWeight: 600,
//                       color: primaryColor,
//                       fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.85rem' },
//                       py: { xs: 1, sm: 1.5, md: 2 },
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {col.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <AnimatePresence>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
//                       <Typography color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
//                         Loading data...
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : data.length > 0 ? (
//                   data.map((item, index) => {
//                     const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);

//                     if (rowRender) {
//                       return rowRender(item, index, rowBg);
//                     }

//                     return (
//                       <TableRow
//                         key={index}
//                         component={motion.tr}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2, delay: index * 0.02 }}
//                         sx={{
//                           "&:hover": {
//                             bgcolor: alpha(primaryColor, 0.05),
//                           },
//                         }}
//                       >
//                         {columns.map((col) => (
//                           <TableCell
//                             key={col.key}
//                             sx={{
//                               bgcolor: rowBg,
//                               py: { xs: 1, sm: 1.5, md: 2 },
//                               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.85rem' },
//                               whiteSpace: 'nowrap',
//                             }}
//                           >
//                             {item[col.key] || "-"}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     );
//                   })
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
//                       <Typography color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
//                         No data found
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </AnimatePresence>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Pagination */}
//       <TablePagination
//         component="div"
//         count={totalCount || data.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25, 50, 100]}
//         sx={{
//           borderTop: "1px solid",
//           borderColor: alpha(primaryColor, 0.1),
//           "& .MuiTablePagination-select": {
//             borderRadius: 2,
//           },
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//             fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//           },
//           "& .MuiTablePagination-actions": {
//             button: {
//               fontSize: { xs: '0.7rem', sm: '0.8rem' },
//             }
//           },
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: 'center',
//           gap: { xs: 1, sm: 0 },
//           p: { xs: 1, sm: 1.5, md: 2 },
//         }}
//       />

//       {/* Date Filter Modal - Responsive */}
//       <Dialog
//         open={showDateModal}
//         onClose={() => setShowDateModal(false)}
//         maxWidth="xs"
//         fullWidth
//         fullScreen={isSmallMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: { xs: isSmallMobile ? 0 : 2, sm: 2.5, md: 3 },
//             m: { xs: isSmallMobile ? 0 : 2, sm: 3 },
//             border: "1px solid",
//             borderColor: alpha(primaryColor, 0.1),
//           },
//         }}
//       >
//         <DialogTitle sx={{
//           pb: 1,
//           px: { xs: 2, sm: 3 },
//           pt: { xs: 2, sm: 2.5, md: 3 },
//           background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"})`,
//           color: "white",
//         }}>
//           <Typography variant="h6" fontWeight={600} color="white" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//             Filter by Date Range
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
//           <Stack spacing={2} sx={{ mt: 1 }}>
//             <TextField
//               fullWidth
//               type="date"
//               label="From Date"
//               value={dateRange.fromDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, fromDate: e.target.value })
//               }
//               InputLabelProps={{ shrink: true }}
//               size={isSmallMobile ? "small" : "small"}
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiInputBase-input": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "&:hover fieldset": {
//                     borderColor: primaryColor,
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: primaryColor,
//                   },
//                 },
//               }}
//             />
//             <TextField
//               fullWidth
//               type="date"
//               label="To Date"
//               value={dateRange.toDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, toDate: e.target.value })
//               }
//               InputLabelProps={{ shrink: true }}
//               size={isSmallMobile ? "small" : "small"}
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiInputBase-input": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "&:hover fieldset": {
//                     borderColor: primaryColor,
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: primaryColor,
//                   },
//                 },
//               }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{
//           p: { xs: 2, sm: 3 },
//           pt: 1,
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1, sm: 0 },
//           borderTop: "1px solid",
//           borderColor: alpha(primaryColor, 0.1),
//         }}>
//           <Button
//             onClick={handleClearFilter}
//             startIcon={<ClearIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//             fullWidth={isSmallMobile}
//             sx={{
//               color: "#64748b",
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//               order: { xs: 2, sm: 1 },
//               "&:hover": {
//                 color: primaryColor,
//               },
//             }}
//           >
//             Clear
//           </Button>
//           <Button
//             onClick={handleApplyFilter}
//             variant="contained"
//             startIcon={<CheckIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//             fullWidth={isSmallMobile}
//             sx={{
//               background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"})`,
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//               order: { xs: 1, sm: 2 },
//               "&:hover": {
//                 background: `linear-gradient(135deg, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"}, ${primaryColor})`,
//               },
//             }}
//           >
//             Apply Filter
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default PaginatedTable;









//////////////////////////////    Centralised Color     ///////////////////////////////
// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableFooter,
//   LinearProgress,
//   Box,
//   Typography,
//   Chip,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Tooltip,
//   alpha,
//   useTheme,
//   Avatar,
//   Stack,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   FilterList as FilterIcon,
//   PictureAsPdf as PdfIcon,
//   Clear as ClearIcon,
//   Check as CheckIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const PaginatedTable = ({
//   title = "Data List",
//   subtitle = "Complete list of items",
//   icon = null,
//   iconColor = "#2563EB",
//   columns = [],
//   data = [],
//   totalPages = 1,
//   totalCount = 0,
//   currentPage = 1,
//   onPageChange = () => { },
//   loading = false,
//   rowRender = null,
//   mobileCardRender = null,
//   showDateFilter = false,
//   onDateChange,
//   currentDateRange,
//   itemsPerPage = 10,
//   onItemsPerPageChange,
//   showExportPdf = false,
//   onExportPdf,
//   customActions = null,
//   primaryColor = "#2563EB",
// }) => {
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const [page, setPage] = useState(currentPage - 1);
//   const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
//   const [showDateModal, setShowDateModal] = useState(false);
//   const [dateRange, setDateRange] = useState(
//     currentDateRange || { fromDate: "", toDate: "" }
//   );

//   useEffect(() => {
//     setPage(currentPage - 1);
//   }, [currentPage]);

//   useEffect(() => {
//     setRowsPerPage(itemsPerPage);
//   }, [itemsPerPage]);

//   useEffect(() => {
//     setDateRange(currentDateRange || { fromDate: "", toDate: "" });
//   }, [currentDateRange]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     onPageChange(newPage + 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = parseInt(event.target.value, 10);
//     setRowsPerPage(newRowsPerPage);
//     setPage(0);
//     onItemsPerPageChange(newRowsPerPage);
//     onPageChange(1);
//   };

//   const handleApplyFilter = () => {
//     setShowDateModal(false);
//     onDateChange(dateRange);
//   };

//   const handleClearFilter = () => {
//     const clearedRange = { fromDate: "", toDate: "" };
//     setDateRange(clearedRange);
//     onDateChange(clearedRange);
//     setShowDateModal(false);
//   };

//   const hasActiveFilter = currentDateRange?.fromDate || currentDateRange?.toDate;

//   // Calculate minimum table width for scrolling
//   const getTableMinWidth = () => {
//     if (isSmallMobile) return 500;
//     if (isMobile) return 600;
//     if (isTablet) return 700;
//     return 800;
//   };

//   // Get responsive font sizes
//   const getResponsiveFontSize = (baseSize) => {
//     if (isSmallMobile) return `calc(${baseSize} * 0.7)`;
//     if (isMobile) return `calc(${baseSize} * 0.8)`;
//     if (isTablet) return `calc(${baseSize} * 0.9)`;
//     return baseSize;
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha(primaryColor, 0.1),
//         overflow: "hidden",
//         position: "relative",
//         width: '100%',
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: { xs: 1.5, sm: 2, md: 3 },
//           background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"})`,
//           color: "white",
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: { xs: 1.5, sm: 2 },
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: { xs: 1, sm: 2 },
//           width: { xs: '100%', sm: 'auto' }
//         }}>
//           {icon && (
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: { xs: 32, sm: 40, md: 48 },
//                 height: { xs: 32, sm: 40, md: 48 },
//                 '& svg': {
//                   fontSize: { xs: 16, sm: 20, md: 24 }
//                 }
//               }}
//             >
//               {icon}
//             </Avatar>
//           )}
//           <Box>
//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               fontWeight={600}
//               color="white"
//               sx={{
//                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
//               }}
//             >
//               {title}
//             </Typography>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.8),
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 display: { xs: 'none', sm: 'block' }
//               }}
//             >
//               {subtitle}
//             </Typography>
//           </Box>
//         </Box>

//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           spacing={1}
//           sx={{
//             width: { xs: '100%', sm: 'auto' },
//             alignItems: { xs: 'stretch', sm: 'center' }
//           }}
//         >
//           {showDateFilter && (
//             <Tooltip title="Date Filter">
//               <Button
//                 variant="contained"
//                 size={isMobile ? "small" : "small"}
//                 startIcon={<FilterIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 onClick={() => setShowDateModal(true)}
//                 fullWidth={isMobile}
//                 sx={{
//                   bgcolor: "white",
//                   color: primaryColor,
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                   py: { xs: 0.5, sm: 0.75 },
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.9),
//                   },
//                   position: "relative",
//                 }}
//               >
//                 Date Filter
//                 {hasActiveFilter && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: -4,
//                       right: -4,
//                       width: 8,
//                       height: 8,
//                       borderRadius: "50%",
//                       bgcolor: "#ef4444",
//                       border: "2px solid white",
//                     }}
//                   />
//                 )}
//               </Button>
//             </Tooltip>
//           )}

//           {showExportPdf && (
//             <Tooltip title="Export PDF">
//               <Button
//                 variant="contained"
//                 size={isMobile ? "small" : "small"}
//                 startIcon={<PdfIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
//                 onClick={onExportPdf}
//                 fullWidth={isMobile}
//                 sx={{
//                   bgcolor: "white",
//                   color: primaryColor,
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//                   py: { xs: 0.5, sm: 0.75 },
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.9),
//                   },
//                 }}
//               >
//                 Export PDF
//               </Button>
//             </Tooltip>
//           )}

//           {customActions}

//           <Chip
//             label={`${totalCount || data.length} ${(totalCount || data.length) === 1 ? 'Result' : 'Results'}`}
//             size={isMobile ? "small" : "small"}
//             sx={{
//               bgcolor: alpha("#ffffff", 0.2),
//               color: "white",
//               fontWeight: 600,
//               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//               height: { xs: 24, sm: 28 },
//               alignSelf: 'center',
//             }}
//           />
//         </Stack>
//       </Box>

//       {/* Loading Indicator */}
//       {loading && (
//         <LinearProgress
//           sx={{
//             bgcolor: alpha(primaryColor, 0.1),
//             "& .MuiLinearProgress-bar": {
//               bgcolor: primaryColor,
//             },
//           }}
//         />
//       )}

//       {/* Mobile Card View */}
//       {isMobile && mobileCardRender ? (
//         <Box sx={{ p: { xs: 1, sm: 2 } }}>
//           {data.map((item, index) => mobileCardRender(item, index))}
//         </Box>
//       ) : (
//         /* Desktop/Tablet Table View */
//         <TableContainer sx={{
//           maxHeight: { xs: "calc(100vh - 350px)", sm: "calc(100vh - 300px)" },
//           overflowX: 'auto',
//           '&::-webkit-scrollbar': {
//             height: '6px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: alpha(primaryColor, 0.3),
//             borderRadius: '3px',
//           },
//         }}>
//           <Table stickyHeader sx={{ minWidth: getTableMinWidth() }}>
//             <TableHead>
//               <TableRow>
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     sx={{
//                       bgcolor: alpha(primaryColor, 0.05),
//                       fontWeight: 600,
//                       color: primaryColor,
//                       fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.85rem' },
//                       py: { xs: 1, sm: 1.5, md: 2 },
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {col.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <AnimatePresence>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
//                       <Typography color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
//                         Loading data...
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : data.length > 0 ? (
//                   data.map((item, index) => {
//                     const rowBg = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);

//                     if (rowRender) {
//                       return rowRender(item, index, rowBg);
//                     }

//                     return (
//                       <TableRow
//                         key={index}
//                         component={motion.tr}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2, delay: index * 0.02 }}
//                         sx={{
//                           "&:hover": {
//                             bgcolor: alpha(primaryColor, 0.05),
//                           },
//                         }}
//                       >
//                         {columns.map((col) => (
//                           <TableCell
//                             key={col.key}
//                             sx={{
//                               bgcolor: rowBg,
//                               py: { xs: 1, sm: 1.5, md: 2 },
//                               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.85rem' },
//                               whiteSpace: 'nowrap',
//                               color: 'text.primary',
//                             }}
//                           >
//                             {item[col.key] || "-"}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     );
//                   })
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
//                       <Typography color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
//                         No data found
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </AnimatePresence>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Pagination */}
//       <TablePagination
//         component="div"
//         count={totalCount || data.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25, 50, 100]}
//         sx={{
//           borderTop: "1px solid",
//           borderColor: alpha(primaryColor, 0.1),
//           "& .MuiTablePagination-select": {
//             borderRadius: 2,
//           },
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//             fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//           },
//           "& .MuiTablePagination-actions": {
//             button: {
//               fontSize: { xs: '0.7rem', sm: '0.8rem' },
//             }
//           },
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: 'center',
//           gap: { xs: 1, sm: 0 },
//           p: { xs: 1, sm: 1.5, md: 2 },
//         }}
//       />

//       {/* Date Filter Modal - Responsive */}
//       <Dialog
//         open={showDateModal}
//         onClose={() => setShowDateModal(false)}
//         maxWidth="xs"
//         fullWidth
//         fullScreen={isSmallMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: { xs: isSmallMobile ? 0 : 2, sm: 2.5, md: 3 },
//             m: { xs: isSmallMobile ? 0 : 2, sm: 3 },
//             border: "1px solid",
//             borderColor: alpha(primaryColor, 0.1),
//           },
//         }}
//       >
//         <DialogTitle sx={{
//           pb: 1,
//           px: { xs: 2, sm: 3 },
//           pt: { xs: 2, sm: 2.5, md: 3 },
//           background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"})`,
//           color: "white",
//         }}>
//           <Typography variant="h6" fontWeight={600} color="white" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//             Filter by Date Range
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
//           <Stack spacing={2} sx={{ mt: 1 }}>
//             <TextField
//               fullWidth
//               type="date"
//               label="From Date"
//               value={dateRange.fromDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, fromDate: e.target.value })
//               }
//               InputLabelProps={{ shrink: true }}
//               size={isSmallMobile ? "small" : "small"}
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiInputBase-input": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "&:hover fieldset": {
//                     borderColor: primaryColor,
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: primaryColor,
//                   },
//                 },
//               }}
//             />
//             <TextField
//               fullWidth
//               type="date"
//               label="To Date"
//               value={dateRange.toDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, toDate: e.target.value })
//               }
//               InputLabelProps={{ shrink: true }}
//               size={isSmallMobile ? "small" : "small"}
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiInputBase-input": {
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "&:hover fieldset": {
//                     borderColor: primaryColor,
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: primaryColor,
//                   },
//                 },
//               }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{
//           p: { xs: 2, sm: 3 },
//           pt: 1,
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1, sm: 0 },
//           borderTop: "1px solid",
//           borderColor: alpha(primaryColor, 0.1),
//         }}>
//           <Button
//             onClick={handleClearFilter}
//             startIcon={<ClearIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//             fullWidth={isSmallMobile}
//             sx={{
//               color: "text.secondary",
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//               order: { xs: 2, sm: 1 },
//               "&:hover": {
//                 color: primaryColor,
//               },
//             }}
//           >
//             Clear
//           </Button>
//           <Button
//             onClick={handleApplyFilter}
//             variant="contained"
//             startIcon={<CheckIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//             fullWidth={isSmallMobile}
//             sx={{
//               background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"})`,
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//               order: { xs: 1, sm: 2 },
//               "&:hover": {
//                 background: `linear-gradient(135deg, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"}, ${primaryColor})`,
//               },
//             }}
//           >
//             Apply Filter
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default PaginatedTable;






////////////////Working........................

// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TableFooter,
//   LinearProgress,
//   Box,
//   Typography,
//   Chip,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Tooltip,
//   alpha,
//   useTheme,
//   Avatar,
//   Stack,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   FilterList as FilterIcon,
//   PictureAsPdf as PdfIcon,
//   Clear as ClearIcon,
//   Check as CheckIcon,
//   Close as CloseIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const PaginatedTable = ({
//   title = "Data List",
//   subtitle = "Complete list of items",
//   icon = null,
//   iconColor = "#2563EB",
//   columns = [],
//   data = [],
//   totalPages = 1,
//   totalCount = 0,
//   currentPage = 1,
//   onPageChange = () => { },
//   loading = false,
//   rowRender = null,
//   mobileCardRender = null,
//   showDateFilter = false,
//   onDateChange,
//   currentDateRange,
//   itemsPerPage = 10,
//   onItemsPerPageChange,
//   showExportPdf = false,
//   onExportPdf,
//   customActions = null,
//   primaryColor = "#2563EB",
// }) => {
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const [page, setPage] = useState(currentPage - 1);
//   const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
//   const [showDateModal, setShowDateModal] = useState(false);
//   const [dateRange, setDateRange] = useState(
//     currentDateRange || { fromDate: "", toDate: "" }
//   );

//   useEffect(() => {
//     setPage(currentPage - 1);
//   }, [currentPage]);

//   useEffect(() => {
//     setRowsPerPage(itemsPerPage);
//   }, [itemsPerPage]);

//   useEffect(() => {
//     setDateRange(currentDateRange || { fromDate: "", toDate: "" });
//   }, [currentDateRange]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     onPageChange(newPage + 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = parseInt(event.target.value, 10);
//     setRowsPerPage(newRowsPerPage);
//     setPage(0);
//     onItemsPerPageChange(newRowsPerPage);
//     onPageChange(1);
//   };

//   const handleApplyFilter = () => {
//     setShowDateModal(false);
//     onDateChange(dateRange);
//   };

//   const handleClearFilter = () => {
//     const clearedRange = { fromDate: "", toDate: "" };
//     setDateRange(clearedRange);
//     onDateChange(clearedRange);
//     setShowDateModal(false);
//   };

//   const hasActiveFilter = currentDateRange?.fromDate || currentDateRange?.toDate;

//   // Calculate minimum table width for scrolling
//   const getTableMinWidth = () => {
//     if (isSmallMobile) return 450;
//     if (isMobile) return 550;
//     if (isTablet) return 650;
//     return 750;
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//         border: "1px solid",
//         borderColor: alpha(primaryColor, 0.1),
//         overflow: "hidden",
//         position: "relative",
//         width: '100%',
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: { xs: 1.2, sm: 1.5, md: 2 },
//           background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"})`,
//           color: "white",
//           display: "flex",
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: { xs: 'flex-start', sm: 'center' },
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: { xs: 1.2, sm: 1.5 },
//         }}
//       >
//         <Box sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: { xs: 1, sm: 1.5 },
//           width: { xs: '100%', sm: 'auto' }
//         }}>
//           {icon && (
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: { xs: 28, sm: 32, md: 36 },
//                 height: { xs: 28, sm: 32, md: 36 },
//                 '& svg': {
//                   fontSize: { xs: 14, sm: 16, md: 18 }
//                 }
//               }}
//             >
//               {icon}
//             </Avatar>
//           )}
//           <Box>
//             <Typography
//               variant={isMobile ? "body2" : "subtitle1"}
//               fontWeight={600}
//               color="white"
//               sx={{
//                 fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1.1rem' }
//               }}
//             >
//               {title}
//             </Typography>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: alpha("#ffffff", 0.8),
//                 fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                 display: { xs: 'none', sm: 'block' }
//               }}
//             >
//               {subtitle}
//             </Typography>
//           </Box>
//         </Box>

//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           spacing={0.8}
//           sx={{
//             width: { xs: '100%', sm: 'auto' },
//             alignItems: { xs: 'stretch', sm: 'center' }
//           }}
//         >
//           {showDateFilter && (
//             <Tooltip title="Date Filter">
//               <Button
//                 variant="contained"
//                 size="small"
//                 startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
//                 onClick={() => setShowDateModal(true)}
//                 fullWidth={isMobile}
//                 sx={{
//                   bgcolor: "white",
//                   color: primaryColor,
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                   py: { xs: 0.4, sm: 0.5 },
//                   px: { xs: 1, sm: 1.2 },
//                   height: 30,
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.9),
//                   },
//                   position: "relative",
//                 }}
//               >
//                 Date
//                 {hasActiveFilter && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: -2,
//                       right: -2,
//                       width: 6,
//                       height: 6,
//                       borderRadius: "50%",
//                       bgcolor: "#ef4444",
//                       border: "1px solid white",
//                     }}
//                   />
//                 )}
//               </Button>
//             </Tooltip>
//           )}

//           {showExportPdf && (
//             <Tooltip title="Export PDF">
//               <Button
//                 variant="contained"
//                 size="small"
//                 startIcon={<PdfIcon sx={{ fontSize: 14 }} />}
//                 onClick={onExportPdf}
//                 fullWidth={isMobile}
//                 sx={{
//                   bgcolor: "white",
//                   color: primaryColor,
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                   py: { xs: 0.4, sm: 0.5 },
//                   px: { xs: 1, sm: 1.2 },
//                   height: 30,
//                   "&:hover": {
//                     bgcolor: alpha("#ffffff", 0.9),
//                   },
//                 }}
//               >
//                 PDF
//               </Button>
//             </Tooltip>
//           )}

//           {customActions}

//           <Chip
//             label={`${totalCount || data.length}`}
//             size="small"
//             sx={{
//               bgcolor: alpha("#ffffff", 0.2),
//               color: "white",
//               fontWeight: 600,
//               fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//               height: { xs: 22, sm: 24 },
//               alignSelf: 'center',
//             }}
//           />
//         </Stack>
//       </Box>

//       {/* Loading Indicator */}
//       {loading && (
//         <LinearProgress
//           sx={{
//             bgcolor: alpha(primaryColor, 0.1),
//             "& .MuiLinearProgress-bar": {
//               bgcolor: primaryColor,
//             },
//             height: 2,
//           }}
//         />
//       )}

//       {/* Mobile Card View */}
//       {isMobile && mobileCardRender ? (
//         <Box sx={{ p: { xs: 0.75, sm: 1 } }}>
//           {data.map((item, index) => mobileCardRender(item, index))}
//         </Box>
//       ) : (
//         /* Desktop/Tablet Table View */
//         <TableContainer sx={{
//           maxHeight: { xs: "calc(100vh - 300px)", sm: "calc(100vh - 250px)" },
//           overflowX: 'auto',
//           '&::-webkit-scrollbar': {
//             height: '4px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: alpha(primaryColor, 0.3),
//             borderRadius: '2px',
//           },
//         }}>
//           <Table stickyHeader sx={{ minWidth: getTableMinWidth() }}>
//             <TableHead>
//               <TableRow>
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.key}
//                     sx={{
//                       bgcolor: alpha(primaryColor, 0.05),
//                       fontWeight: 600,
//                       color: primaryColor,
//                       fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' },
//                       py: { xs: 0.8, sm: 1, md: 1.2 },
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {col.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <AnimatePresence>
//                 {loading ? (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
//                       <Typography color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                         Loading data...
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 ) : data.length > 0 ? (
//                   data.map((item, index) => {
//                     const rowBg = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);

//                     if (rowRender) {
//                       return rowRender(item, index, rowBg);
//                     }

//                     return (
//                       <TableRow
//                         key={index}
//                         component={motion.tr}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2, delay: index * 0.02 }}
//                         sx={{
//                           "&:hover": {
//                             bgcolor: alpha(primaryColor, 0.05),
//                           },
//                         }}
//                       >
//                         {columns.map((col) => (
//                           <TableCell
//                             key={col.key}
//                             sx={{
//                               bgcolor: rowBg,
//                               py: { xs: 0.8, sm: 1, md: 1.2 },
//                               fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' },
//                               whiteSpace: 'nowrap',
//                               color: 'text.primary',
//                             }}
//                           >
//                             {item[col.key] || "-"}
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     );
//                   })
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
//                       <Typography color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                         No data found
//                       </Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </AnimatePresence>
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Pagination */}
//       <TablePagination
//         component="div"
//         count={totalCount || data.length}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25, 50, 100]}
//         sx={{
//           borderTop: "1px solid",
//           borderColor: alpha(primaryColor, 0.1),
//           "& .MuiTablePagination-select": {
//             borderRadius: 1.5,
//             fontSize: { xs: '0.6rem', sm: '0.65rem' },
//           },
//           "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//             fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//           },
//           "& .MuiTablePagination-actions": {
//             button: {
//               fontSize: { xs: '0.6rem', sm: '0.65rem' },
//               padding: '4px',
//             }
//           },
//           display: 'flex',
//           flexDirection: { xs: 'column', sm: 'row' },
//           alignItems: 'center',
//           gap: { xs: 0.8, sm: 0 },
//           p: { xs: 1, sm: 1.2, md: 1.5 },
//         }}
//       />

//       {/* Date Filter Modal - Smaller */}
//       <Dialog
//         open={showDateModal}
//         onClose={() => setShowDateModal(false)}
//         maxWidth="xs"
//         fullWidth
//         fullScreen={isSmallMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: { xs: isSmallMobile ? 0 : 1.5, sm: 2, md: 2.5 },
//             m: { xs: isSmallMobile ? 0 : 1, sm: 2 },
//             border: "1px solid",
//             borderColor: alpha(primaryColor, 0.1),
//           },
//         }}
//       >
//         <DialogTitle sx={{
//           pb: 0.5,
//           px: { xs: 1.5, sm: 2.5 },
//           pt: { xs: 1.5, sm: 2, md: 2.5 },
//           background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"})`,
//           color: "white",
//         }}>
//           <Typography variant="h6" fontWeight={600} color="white" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
//             Filter by Date
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ px: { xs: 1.5, sm: 2.5 }, py: 2 }}>
//           <Stack spacing={1.5} sx={{ mt: 0.5 }}>
//             <TextField
//             className="mt-4"
//               fullWidth
//               type="date"
//               label="From"
//               value={dateRange.fromDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, fromDate: e.target.value })
//               }
//               InputLabelProps={{ shrink: true }}
//               size="small"
//               sx={{
//                 mt:2,
//                 "& .MuiInputLabel-root": {
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                 },
//                 "& .MuiInputBase-input": {
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                   py: 1,
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   height: 36,
//                   "&:hover fieldset": {
//                     borderColor: primaryColor,
//                   },
//                 },
//               }}
//             />
//             <TextField
//               fullWidth
//               type="date"
//               label="To"
//               value={dateRange.toDate}
//               onChange={(e) =>
//                 setDateRange({ ...dateRange, toDate: e.target.value })
//               }
//               InputLabelProps={{ shrink: true }}
//               size="small"
//               sx={{
//                 "& .MuiInputLabel-root": {
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                 },
//                 "& .MuiInputBase-input": {
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                   py: 1,
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   height: 36,
//                   "&:hover fieldset": {
//                     borderColor: primaryColor,
//                   },
//                 },
//               }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{
//           p: { xs: 1.5, sm: 2.5 },
//           pt: 0.5,
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 0.8, sm: 0 },
//           borderTop: "1px solid",
//           borderColor: alpha(primaryColor, 0.1),
//         }}>
//           <Button
//             onClick={handleClearFilter}
//             startIcon={<ClearIcon sx={{ fontSize: 14 }} />}
//             fullWidth={isSmallMobile}
//             size="small"
//             sx={{
//               color: "text.secondary",
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               order: { xs: 2, sm: 1 },
//               height: 30,
//               "&:hover": {
//                 color: primaryColor,
//               },
//             }}
//           >
//             Clear
//           </Button>
//           <Button
//             onClick={handleApplyFilter}
//             variant="contained"
//             startIcon={<CheckIcon sx={{ fontSize: 14 }} />}
//             fullWidth={isSmallMobile}
//             size="small"
//             sx={{
//               background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"})`,
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               order: { xs: 1, sm: 2 },
//               height: 30,
//               "&:hover": {
//                 background: `linear-gradient(135deg, ${primaryColor === "#2563EB" ? theme.palette.primary.dark : "#0a5c55"}, ${primaryColor})`,
//               },
//             }}
//           >
//             Apply
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Paper>
//   );
// };

// export default PaginatedTable;







import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  Tooltip,
  alpha,
  useTheme,
  Avatar,
  Stack,
  useMediaQuery,
  Menu,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  PictureAsPdf as PdfIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion, AnimatePresence } from "framer-motion";

const PaginatedTable = ({
  title = "Data List",
  subtitle = "Complete list of items",
  icon = null,
  iconColor = "#2563EB",
  columns = [],
  data = [],
  totalPages = 1,
  totalCount = 0,
  currentPage = 1,
  onPageChange = () => {},
  loading = false,
  rowRender = null,
  mobileCardRender = null,
  showDateFilter = false,
  onDateChange,
  currentDateRange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  showExportPdf = false,
  onExportPdf,
  customActions = null,
  primaryColor = "#2563EB",
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isSmallMobile = useMediaQuery("(max-width:480px)");

  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  // Menu anchor for date filter (same as UserManagement)
  const [dateFilterAnchor, setDateFilterAnchor] = useState(null);

  // Use Date objects like UserManagement (startDate / endDate)
  const [startDate, setStartDate] = useState(
    currentDateRange?.fromDate ? new Date(currentDateRange.fromDate) : null
  );
  const [endDate, setEndDate] = useState(
    currentDateRange?.toDate ? new Date(currentDateRange.toDate) : null
  );

  useEffect(() => {
    setPage(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    setRowsPerPage(itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    setStartDate(
      currentDateRange?.fromDate ? new Date(currentDateRange.fromDate) : null
    );
    setEndDate(
      currentDateRange?.toDate ? new Date(currentDateRange.toDate) : null
    );
  }, [currentDateRange]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    onItemsPerPageChange(newRowsPerPage);
    onPageChange(1);
  };

  const handleDateFilterClick = (event) => {
    setDateFilterAnchor(event.currentTarget);
  };

  const handleDateFilterClose = () => {
    setDateFilterAnchor(null);
  };

  const applyDateFilter = () => {
    if (onDateChange) {
      onDateChange({
        fromDate: startDate ? startDate.toISOString().split("T")[0] : "",
        toDate: endDate ? endDate.toISOString().split("T")[0] : "",
      });
    }
    handleDateFilterClose();
    setPage(0);
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    if (onDateChange) {
      onDateChange({ fromDate: "", toDate: "" });
    }
    handleDateFilterClose();
    setPage(0);
  };

  const hasActiveFilter = currentDateRange?.fromDate || currentDateRange?.toDate;

  const getTableMinWidth = () => {
    if (isSmallMobile) return 450;
    if (isMobile) return 550;
    if (isTablet) return 650;
    return 750;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(primaryColor, 0.1),
        overflow: "hidden",
        position: "relative",
        width: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 1.2, sm: 1.5, md: 2 },
          background: `linear-gradient(135deg, ${primaryColor}, ${
            primaryColor === "#2563EB"
              ? theme.palette.primary.dark
              : "#0a5c55"
          })`,
          color: "white",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: { xs: 1.2, sm: 1.5 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1, sm: 1.5 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {icon && (
            <Avatar
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                width: { xs: 28, sm: 32, md: 36 },
                height: { xs: 28, sm: 32, md: 36 },
                "& svg": { fontSize: { xs: 14, sm: 16, md: 18 } },
              }}
            >
              {icon}
            </Avatar>
          )}
          <Box>
            <Typography
              variant={isMobile ? "body2" : "subtitle1"}
              fontWeight={600}
              color="white"
              sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.1rem" } }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha("#ffffff", 0.8),
                fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                display: { xs: "none", sm: "block" },
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={0.8}
          sx={{
            width: { xs: "100%", sm: "auto" },
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          {/* Date Filter Button — same style as UserManagement */}
          {showDateFilter && (
            <Tooltip title="Date Filter">
              <Button
                variant="contained"
                size="small"
                startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
                onClick={handleDateFilterClick}
                fullWidth={isMobile}
                sx={{
                  bgcolor: "white",
                  color: primaryColor,
                  fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                  py: { xs: 0.4, sm: 0.5 },
                  px: { xs: 1, sm: 1.2 },
                  height: 30,
                  position: "relative",
                  "&:hover": { bgcolor: alpha("#ffffff", 0.9) },
                }}
              >
                Date Filter
                {hasActiveFilter && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -2,
                      right: -2,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#ef4444",
                      border: "1px solid white",
                    }}
                  />
                )}
              </Button>
            </Tooltip>
          )}

          {showExportPdf && (
            <Tooltip title="Export PDF">
              <Button
                variant="contained"
                size="small"
                startIcon={<PdfIcon sx={{ fontSize: 14 }} />}
                onClick={onExportPdf}
                fullWidth={isMobile}
                sx={{
                  bgcolor: "white",
                  color: primaryColor,
                  fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                  py: { xs: 0.4, sm: 0.5 },
                  px: { xs: 1, sm: 1.2 },
                  height: 30,
                  "&:hover": { bgcolor: alpha("#ffffff", 0.9) },
                }}
              >
                PDF
              </Button>
            </Tooltip>
          )}

          {customActions}

          <Chip
            label={`${totalCount || data.length}`}
            size="small"
            sx={{
              bgcolor: alpha("#ffffff", 0.2),
              color: "white",
              fontWeight: 600,
              fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
              height: { xs: 22, sm: 24 },
              alignSelf: "center",
            }}
          />
        </Stack>
      </Box>

      {/* ── Date Filter Menu (matches UserManagement exactly) ── */}
      <Menu
        anchorEl={dateFilterAnchor}
        open={Boolean(dateFilterAnchor)}
        onClose={handleDateFilterClose}
        PaperProps={{
          sx: {
            p: 0.5,
            width: { xs: 180, sm: 200 },
            borderRadius: { xs: 1.5, sm: 2 },
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
            border: "1px solid",
            borderColor: alpha(primaryColor, 0.1),
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* Start Date */}
          <Box sx={{ mb: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: { xs: "0.5rem", sm: "0.55rem" },
                color: primaryColor,
                fontWeight: 500,
                display: "block",
                mb: 0.1,
                ml: 0.5,
              }}
            >
              Start
            </Typography>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              componentsProps={{
                actionBar: {
                  sx: {
                    "& .MuiButton-root": { fontSize: "0.7rem", minHeight: 28 },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiPickersDay-root": {
                      fontSize: "0.7rem",
                      width: 28,
                      height: 28,
                    },
                    "& .MuiPickersCalendarHeader-root": { minHeight: 36 },
                    "& .MuiPickersCalendarHeader-label": { fontSize: "0.75rem" },
                    "& .MuiDayCalendar-weekDayLabel": {
                      fontSize: "0.65rem",
                      width: 28,
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      width: 28,
                      height: 28,
                    },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  placeholder="DD/MM/YY"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "0.6rem",
                      py: 0.1,
                      px: 0.5,
                    },
                    "& .MuiOutlinedInput-root": {
                      height: 22,
                      borderRadius: 1.5,
                    },
                    "& .MuiOutlinedInput-notchedOutline": { borderWidth: 0.5 },
                  }}
                />
              )}
            />
          </Box>

          {/* End Date */}
          <Box sx={{ mb: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: { xs: "0.5rem", sm: "0.55rem" },
                color: primaryColor,
                fontWeight: 500,
                display: "block",
                mb: 0.1,
                ml: 0.5,
              }}
            >
              End
            </Typography>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              componentsProps={{
                actionBar: {
                  sx: {
                    "& .MuiButton-root": { fontSize: "0.7rem", minHeight: 28 },
                  },
                },
                popper: {
                  sx: {
                    "& .MuiPickersDay-root": {
                      fontSize: "0.7rem",
                      width: 28,
                      height: 28,
                    },
                    "& .MuiPickersCalendarHeader-root": { minHeight: 36 },
                    "& .MuiPickersCalendarHeader-label": { fontSize: "0.75rem" },
                    "& .MuiDayCalendar-weekDayLabel": {
                      fontSize: "0.65rem",
                      width: 28,
                    },
                    "& .MuiPickersArrowSwitcher-button": {
                      width: 28,
                      height: 28,
                    },
                  },
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  placeholder="DD/MM/YY"
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "0.6rem",
                      py: 0.1,
                      px: 0.5,
                    },
                    "& .MuiOutlinedInput-root": {
                      height: 22,
                      borderRadius: 1.5,
                    },
                    "& .MuiOutlinedInput-notchedOutline": { borderWidth: 0.5 },
                  }}
                />
              )}
            />
          </Box>

          {/* Clear / Apply buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              justifyContent: "flex-end",
              mt: 0.5,
            }}
          >
            <Button
              size="small"
              onClick={clearDateFilter}
              sx={{
                fontSize: { xs: "0.5rem", sm: "0.55rem" },
                color: "text.secondary",
                height: 20,
                minWidth: 36,
                px: 0.5,
                borderRadius: 1.5,
              }}
            >
              Clear
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={applyDateFilter}
              sx={{
                fontSize: { xs: "0.5rem", sm: "0.55rem" },
                bgcolor: primaryColor,
                height: 20,
                minWidth: 36,
                px: 0.5,
                borderRadius: 1.5,
                "&:hover": {
                  bgcolor:
                    primaryColor === "#2563EB"
                      ? theme.palette.primary.dark
                      : "#0a5c55",
                },
              }}
            >
              Apply
            </Button>
          </Box>
        </LocalizationProvider>
      </Menu>

      {/* Loading Indicator */}
      {loading && (
        <LinearProgress
          sx={{
            bgcolor: alpha(primaryColor, 0.1),
            "& .MuiLinearProgress-bar": { bgcolor: primaryColor },
            height: 2,
          }}
        />
      )}

      {/* Mobile Card View */}
      {isMobile && mobileCardRender ? (
        <Box sx={{ p: { xs: 0.75, sm: 1 } }}>
          {data.map((item, index) => mobileCardRender(item, index))}
        </Box>
      ) : (
        <TableContainer
          sx={{
            maxHeight: {
              xs: "calc(100vh - 300px)",
              sm: "calc(100vh - 250px)",
            },
            overflowX: "auto",
            "&::-webkit-scrollbar": { height: "4px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: alpha(primaryColor, 0.3),
              borderRadius: "2px",
            },
          }}
        >
          <Table stickyHeader sx={{ minWidth: getTableMinWidth() }}>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      bgcolor: alpha(primaryColor, 0.05),
                      fontWeight: 600,
                      color: primaryColor,
                      fontSize: {
                        xs: "0.6rem",
                        sm: "0.65rem",
                        md: "0.7rem",
                        lg: "0.75rem",
                      },
                      py: { xs: 0.8, sm: 1, md: 1.2 },
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ py: { xs: 3, sm: 4, md: 5 } }}
                    >
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            sm: "0.75rem",
                            md: "0.8rem",
                          },
                        }}
                      >
                        Loading data...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : data.length > 0 ? (
                  data.map((item, index) => {
                    const rowBg =
                      index % 2 === 0
                        ? "transparent"
                        : alpha(theme.palette.primary.main, 0.02);

                    if (rowRender) {
                      return rowRender(item, index, rowBg);
                    }

                    return (
                      <TableRow
                        key={index}
                        component={motion.tr}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        sx={{ "&:hover": { bgcolor: alpha(primaryColor, 0.05) } }}
                      >
                        {columns.map((col) => (
                          <TableCell
                            key={col.key}
                            sx={{
                              bgcolor: rowBg,
                              py: { xs: 0.8, sm: 1, md: 1.2 },
                              fontSize: {
                                xs: "0.6rem",
                                sm: "0.65rem",
                                md: "0.7rem",
                                lg: "0.75rem",
                              },
                              whiteSpace: "nowrap",
                              color: "text.primary",
                            }}
                          >
                            {item[col.key] || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      align="center"
                      sx={{ py: { xs: 3, sm: 4, md: 5 } }}
                    >
                      <Typography
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            sm: "0.75rem",
                            md: "0.8rem",
                          },
                        }}
                      >
                        No data found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalCount || data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        sx={{
          borderTop: "1px solid",
          borderColor: alpha(primaryColor, 0.1),
          "& .MuiTablePagination-select": {
            borderRadius: 1.5,
            fontSize: { xs: "0.6rem", sm: "0.65rem" },
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            { fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } },
          "& .MuiTablePagination-actions": {
            button: { fontSize: { xs: "0.6rem", sm: "0.65rem" }, padding: "4px" },
          },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: { xs: 0.8, sm: 0 },
          p: { xs: 1, sm: 1.2, md: 1.5 },
        }}
      />
    </Paper>
  );
};

export default PaginatedTable;