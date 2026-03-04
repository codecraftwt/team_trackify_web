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
//   columns = [],
//   data = [],
//   totalPages = 1,
//   totalCount = 0,
//   currentPage = 1,
//   onPageChange = () => {},
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
//         borderColor: alpha("#e2e8f0", 0.5),
//         overflow: "hidden",
//         position: "relative",
//         width: '100%',
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: { xs: 1.5, sm: 2, md: 3 },
//           background: "linear-gradient(135deg, #0f766e, #0a5c55)",
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
//                   color: "#0f766e",
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
//                   color: "#0f766e",
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
//             bgcolor: alpha("#0f766e", 0.1),
//             "& .MuiLinearProgress-bar": {
//               bgcolor: "#0f766e",
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
//             backgroundColor: alpha('#0f766e', 0.3),
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
//                       bgcolor: alpha("#0f766e", 0.05),
//                       fontWeight: 600,
//                       color: "#1e293b",
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
//                             bgcolor: alpha("#0f766e", 0.05),
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
//           borderColor: alpha("#e2e8f0", 0.5),
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
//           },
//         }}
//       >
//         <DialogTitle sx={{ 
//           pb: 1,
//           px: { xs: 2, sm: 3 },
//           pt: { xs: 2, sm: 2.5, md: 3 },
//         }}>
//           <Typography variant="h6" fontWeight={600} color="#1e293b" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//             Filter by Date Range
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
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
//               }}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{ 
//           p: { xs: 2, sm: 3 }, 
//           pt: 1,
//           flexDirection: { xs: 'column', sm: 'row' },
//           gap: { xs: 1, sm: 0 },
//         }}>
//           <Button
//             onClick={handleClearFilter}
//             startIcon={<ClearIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//             fullWidth={isSmallMobile}
//             sx={{ 
//               color: "#64748b",
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//               order: { xs: 2, sm: 1 }
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
//               bgcolor: "#0f766e",
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//               order: { xs: 1, sm: 2 },
//               "&:hover": { bgcolor: "#0a5c55" },
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








////////////////////////////// Change Color Theam/////////////////////////////////////


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
  TableFooter,
  LinearProgress,
  Box,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  Avatar,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  PictureAsPdf as PdfIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
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
  onPageChange = () => { },
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

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateRange, setDateRange] = useState(
    currentDateRange || { fromDate: "", toDate: "" }
  );

  useEffect(() => {
    setPage(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    setRowsPerPage(itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    setDateRange(currentDateRange || { fromDate: "", toDate: "" });
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

  const handleApplyFilter = () => {
    setShowDateModal(false);
    onDateChange(dateRange);
  };

  const handleClearFilter = () => {
    const clearedRange = { fromDate: "", toDate: "" };
    setDateRange(clearedRange);
    onDateChange(clearedRange);
    setShowDateModal(false);
  };

  const hasActiveFilter = currentDateRange?.fromDate || currentDateRange?.toDate;

  // Calculate minimum table width for scrolling
  const getTableMinWidth = () => {
    if (isSmallMobile) return 500;
    if (isMobile) return 600;
    if (isTablet) return 700;
    return 800;
  };

  // Get responsive font sizes
  const getResponsiveFontSize = (baseSize) => {
    if (isSmallMobile) return `calc(${baseSize} * 0.7)`;
    if (isMobile) return `calc(${baseSize} * 0.8)`;
    if (isTablet) return `calc(${baseSize} * 0.9)`;
    return baseSize;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: alpha(primaryColor, 0.1),
        overflow: "hidden",
        position: "relative",
        width: '100%',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 1.5, sm: 2, md: 3 },
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"})`,
          color: "white",
          display: "flex",
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 2 },
          width: { xs: '100%', sm: 'auto' }
        }}>
          {icon && (
            <Avatar
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                width: { xs: 32, sm: 40, md: 48 },
                height: { xs: 32, sm: 40, md: 48 },
                '& svg': {
                  fontSize: { xs: 16, sm: 20, md: 24 }
                }
              }}
            >
              {icon}
            </Avatar>
          )}
          <Box>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              fontWeight={600}
              color="white"
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha("#ffffff", 0.8),
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                display: { xs: 'none', sm: 'block' }
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            alignItems: { xs: 'stretch', sm: 'center' }
          }}
        >
          {showDateFilter && (
            <Tooltip title="Date Filter">
              <Button
                variant="contained"
                size={isMobile ? "small" : "small"}
                startIcon={<FilterIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                onClick={() => setShowDateModal(true)}
                fullWidth={isMobile}
                sx={{
                  bgcolor: "white",
                  color: primaryColor,
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                  py: { xs: 0.5, sm: 0.75 },
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.9),
                  },
                  position: "relative",
                }}
              >
                Date Filter
                {hasActiveFilter && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: "#ef4444",
                      border: "2px solid white",
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
                size={isMobile ? "small" : "small"}
                startIcon={<PdfIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                onClick={onExportPdf}
                fullWidth={isMobile}
                sx={{
                  bgcolor: "white",
                  color: primaryColor,
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                  py: { xs: 0.5, sm: 0.75 },
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.9),
                  },
                }}
              >
                Export PDF
              </Button>
            </Tooltip>
          )}

          {customActions}

          <Chip
            label={`${totalCount || data.length} ${(totalCount || data.length) === 1 ? 'Result' : 'Results'}`}
            size={isMobile ? "small" : "small"}
            sx={{
              bgcolor: alpha("#ffffff", 0.2),
              color: "white",
              fontWeight: 600,
              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
              height: { xs: 24, sm: 28 },
              alignSelf: 'center',
            }}
          />
        </Stack>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <LinearProgress
          sx={{
            bgcolor: alpha(primaryColor, 0.1),
            "& .MuiLinearProgress-bar": {
              bgcolor: primaryColor,
            },
          }}
        />
      )}

      {/* Mobile Card View */}
      {isMobile && mobileCardRender ? (
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          {data.map((item, index) => mobileCardRender(item, index))}
        </Box>
      ) : (
        /* Desktop/Tablet Table View */
        <TableContainer sx={{
          maxHeight: { xs: "calc(100vh - 350px)", sm: "calc(100vh - 300px)" },
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(primaryColor, 0.3),
            borderRadius: '3px',
          },
        }}>
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
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.85rem' },
                      py: { xs: 1, sm: 1.5, md: 2 },
                      whiteSpace: 'nowrap',
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
                    <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
                      <Typography color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
                        Loading data...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : data.length > 0 ? (
                  data.map((item, index) => {
                    const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);

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
                        sx={{
                          "&:hover": {
                            bgcolor: alpha(primaryColor, 0.05),
                          },
                        }}
                      >
                        {columns.map((col) => (
                          <TableCell
                            key={col.key}
                            sx={{
                              bgcolor: rowBg,
                              py: { xs: 1, sm: 1.5, md: 2 },
                              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem', lg: '0.85rem' },
                              whiteSpace: 'nowrap',
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
                    <TableCell colSpan={columns.length} align="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
                      <Typography color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' } }}>
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
            borderRadius: 2,
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
          },
          "& .MuiTablePagination-actions": {
            button: {
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
            }
          },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: { xs: 1, sm: 0 },
          p: { xs: 1, sm: 1.5, md: 2 },
        }}
      />

      {/* Date Filter Modal - Responsive */}
      <Dialog
        open={showDateModal}
        onClose={() => setShowDateModal(false)}
        maxWidth="xs"
        fullWidth
        fullScreen={isSmallMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: isSmallMobile ? 0 : 2, sm: 2.5, md: 3 },
            m: { xs: isSmallMobile ? 0 : 2, sm: 3 },
            border: "1px solid",
            borderColor: alpha(primaryColor, 0.1),
          },
        }}
      >
        <DialogTitle sx={{
          pb: 1,
          px: { xs: 2, sm: 3 },
          pt: { xs: 2, sm: 2.5, md: 3 },
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"})`,
          color: "white",
        }}>
          <Typography variant="h6" fontWeight={600} color="white" sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
            Filter by Date Range
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              value={dateRange.fromDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, fromDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              size={isSmallMobile ? "small" : "small"}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                },
                "& .MuiInputBase-input": {
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: primaryColor,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primaryColor,
                  },
                },
              }}
            />
            <TextField
              fullWidth
              type="date"
              label="To Date"
              value={dateRange.toDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, toDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              size={isSmallMobile ? "small" : "small"}
              sx={{
                "& .MuiInputLabel-root": {
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                },
                "& .MuiInputBase-input": {
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: primaryColor,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: primaryColor,
                  },
                },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{
          p: { xs: 2, sm: 3 },
          pt: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 },
          borderTop: "1px solid",
          borderColor: alpha(primaryColor, 0.1),
        }}>
          <Button
            onClick={handleClearFilter}
            startIcon={<ClearIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            fullWidth={isSmallMobile}
            sx={{
              color: "#64748b",
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              order: { xs: 2, sm: 1 },
              "&:hover": {
                color: primaryColor,
              },
            }}
          >
            Clear
          </Button>
          <Button
            onClick={handleApplyFilter}
            variant="contained"
            startIcon={<CheckIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            fullWidth={isSmallMobile}
            sx={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"})`,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              order: { xs: 1, sm: 2 },
              "&:hover": {
                background: `linear-gradient(135deg, ${primaryColor === "#2563EB" ? "#1E40AF" : "#0a5c55"}, ${primaryColor})`,
              },
            }}
          >
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PaginatedTable;