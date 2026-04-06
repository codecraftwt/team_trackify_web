
////////////////////////////// Change Color Theam/////////////////////////////////////
// import React from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   alpha,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Pending as PendingIcon,
//   CalendarToday as CalendarIcon,
//   AttachMoney as MoneyIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import moment from "moment";

// const RevenueTable = ({ 
//   filteredPayments, 
//   page, 
//   handlePageChange, 
//   totalPages,
//   isMobile,
//   isTablet,
//   isSmallMobile 
// }) => {
//   const theme = useTheme();
  
//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "pending":
//         return <PendingIcon sx={{ color: "#f59e0b", fontSize: { xs: 14, sm: 16 } }} />;
//       default:
//         return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "#22c55e";
//       case "pending":
//         return "#f59e0b";
//       default:
//         return "#ef4444";
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Mobile Card View
//   const MobileCardView = () => {
//     return (
//       <Box sx={{ p: { xs: 1, sm: 2 } }}>
//         <AnimatePresence>
//           {filteredPayments.map((payment, index) => (
//             <motion.div
//               key={payment.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2, delay: index * 0.02 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 2,
//                   mb: 1.5,
//                   borderRadius: 2,
//                   border: "1px solid",
//                   borderColor: alpha("#2563EB", 0.1),
//                   bgcolor: index % 2 === 0 ? "#fff" : alpha("#f8fafc", 0.5),
//                 }}
//               >
//                 {/* Header */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                   <Avatar
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       bgcolor: alpha("#2563EB", 0.1),
//                       color: "#2563EB",
//                     }}
//                   >
//                     {payment.name?.charAt(0) || "A"}
//                   </Avatar>
//                   <Box sx={{ flex: 1 }}>
//                     <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#1e293b' }}>
//                       {payment.name}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {payment.email}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* Details Grid */}
//                 <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Plan
//                     </Typography>
//                     <Chip
//                       label={payment.plan}
//                       size="small"
//                       sx={{
//                         mt: 0.5,
//                         bgcolor: alpha("#2563EB", 0.1),
//                         color: "#2563EB",
//                         fontWeight: 500,
//                         fontSize: "0.65rem",
//                         height: 22,
//                       }}
//                     />
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Amount
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600} sx={{ color: "#2563EB" }}>
//                       {formatCurrency(payment.amount)}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Date
//                     </Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                       <CalendarIcon sx={{ color: "#2563EB", fontSize: 12 }} />
//                       <Typography variant="caption" sx={{ color: '#1e293b' }}>
//                         {moment(payment.date).format("DD MMM YYYY")}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Status
//                     </Typography>
//                     <Chip
//                       icon={getStatusIcon(payment.status)}
//                       label={payment.status}
//                       size="small"
//                       sx={{
//                         mt: 0.5,
//                         bgcolor: alpha(getStatusColor(payment.status), 0.1),
//                         color: getStatusColor(payment.status),
//                         fontWeight: 600,
//                         fontSize: "0.65rem",
//                         height: 22,
//                       }}
//                     />
//                   </Box>
//                 </Box>

//                 {/* Additional Info */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Method: {payment.paymentMethod || "Online"}
//                   </Typography>
//                   {payment.duration && payment.duration !== "-" && (
//                     <Typography variant="caption" color="text.secondary">
//                       Duration: {payment.duration}
//                     </Typography>
//                   )}
//                 </Box>
//               </Paper>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   // Desktop Table View
//   const TableView = () => {
//     // Determine columns based on screen size
//     const showEmail = !isSmallMobile;
//     const showDuration = !isMobile;
//     const showPaymentMethod = !isMobile;

//     // Minimum table width for scrolling
//     const getMinWidth = () => {
//       if (isSmallMobile) return 600;
//       if (isMobile) return 700;
//       if (isTablet) return 800;
//       return 900;
//     };

//     return (
//       <TableContainer sx={{ 
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': {
//           height: '6px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha('#2563EB', 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: getMinWidth() }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: alpha("#2563EB", 0.05) }}>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                 Admin
//               </TableCell>
//               {showEmail && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                   Email
//                 </TableCell>
//               )}
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                 Plan
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                 Date
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                 Amount
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                 Status
//               </TableCell>
//               {showPaymentMethod && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                   Method
//                 </TableCell>
//               )}
//               {showDuration && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: "#2563EB" }}>
//                   Duration
//                 </TableCell>
//               )}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <AnimatePresence>
//               {filteredPayments.map((payment, index) => (
//                 <motion.tr
//                   key={payment.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2, delay: index * 0.02 }}
//                   style={{
//                     backgroundColor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
//                   }}
//                 >
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                       <Avatar
//                         sx={{
//                           width: { xs: 28, sm: 32, md: 36 },
//                           height: { xs: 28, sm: 32, md: 36 },
//                           bgcolor: alpha("#2563EB", 0.1),
//                           color: "#2563EB",
//                           fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
//                         }}
//                       >
//                         {payment.name?.charAt(0) || "A"}
//                       </Avatar>
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' }, color: '#1e293b' }}>
//                         {payment.name}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   {showEmail && (
//                     <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#1e293b' }}>
//                       {payment.email}
//                     </TableCell>
//                   )}
//                   <TableCell>
//                     <Chip
//                       label={payment.plan}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha("#2563EB", 0.1),
//                         color: "#2563EB",
//                         fontWeight: 500,
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                         height: { xs: 20, sm: 22, md: 24 },
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                       <CalendarIcon sx={{ color: "#2563EB", fontSize: { xs: 10, sm: 12, md: 14 } }} />
//                       <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' }, color: '#1e293b' }}>
//                         {moment(payment.date).format("DD MMM YYYY")}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2" fontWeight={600} sx={{ color: "#2563EB", fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                       {formatCurrency(payment.amount)}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       icon={getStatusIcon(payment.status)}
//                       label={payment.status}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha(getStatusColor(payment.status), 0.1),
//                         color: getStatusColor(payment.status),
//                         fontWeight: 600,
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                         height: { xs: 20, sm: 22, md: 24 },
//                         '& .MuiChip-icon': {
//                           fontSize: { xs: 10, sm: 12, md: 14 }
//                         }
//                       }}
//                     />
//                   </TableCell>
//                   {showPaymentMethod && (
//                     <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' }, color: '#1e293b' }}>
//                       {payment.paymentMethod || "Online"}
//                     </TableCell>
//                   )}
//                   {showDuration && (
//                     <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' }, color: '#1e293b' }}>
//                       {payment.duration || "-"}
//                     </TableCell>
//                   )}
//                 </motion.tr>
//               ))}
//             </AnimatePresence>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha("#2563EB", 0.1),
//         overflow: "hidden",
//       }}
//     >
//       {isMobile ? <MobileCardView /> : <TableView />}

//       {totalPages > 1 && (
//         <Box sx={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           p: { xs: 1.5, sm: 2 },
//           borderTop: "1px solid",
//           borderColor: alpha("#2563EB", 0.1),
//         }}>
//           <TablePagination
//             component="div"
//             count={totalPages * 10}
//             page={page - 1}
//             onPageChange={(e, newPage) => handlePageChange(newPage + 1)}
//             rowsPerPage={10}
//             rowsPerPageOptions={[10]}
//             sx={{
//               '.MuiTablePagination-displayedRows': {
//                 fontSize: { xs: '0.7rem', sm: '0.8rem' },
//               },
//               '.MuiTablePagination-actions': {
//                 button: {
//                   fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                 }
//               }
//             }}
//           />
//         </Box>
//       )}
//     </Paper>
//   );
// };

// export default RevenueTable;










//////////////////////////////    Centralised Color     ///////////////////////////////
// import React from "react";
// import {
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Box,
//   Typography,
//   Avatar,
//   Chip,
//   alpha,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Pending as PendingIcon,
//   CalendarToday as CalendarIcon,
//   AttachMoney as MoneyIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import moment from "moment";

// const RevenueTable = ({ 
//   filteredPayments, 
//   page, 
//   handlePageChange, 
//   totalPages,
//   isMobile,
//   isTablet,
//   isSmallMobile 
// }) => {
//   const theme = useTheme();
  
//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 14, sm: 16 } }} />;
//       case "pending":
//         return <PendingIcon sx={{ color: theme.palette.secondary.main, fontSize: { xs: 14, sm: 16 } }} />;
//       default:
//         return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 14, sm: 16 } }} />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "#22c55e";
//       case "pending":
//         return theme.palette.secondary.main;
//       default:
//         return "#ef4444";
//     }
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Mobile Card View
//   const MobileCardView = () => {
//     return (
//       <Box sx={{ p: { xs: 1, sm: 2 } }}>
//         <AnimatePresence>
//           {filteredPayments.map((payment, index) => (
//             <motion.div
//               key={payment.id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2, delay: index * 0.02 }}
//             >
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 2,
//                   mb: 1.5,
//                   borderRadius: 2,
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   bgcolor: index % 2 === 0 ? theme.palette.background.paper : alpha(theme.palette.primary.main, 0.02),
//                 }}
//               >
//                 {/* Header */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//                   <Avatar
//                     sx={{
//                       width: 40,
//                       height: 40,
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     }}
//                   >
//                     {payment.name?.charAt(0) || "A"}
//                   </Avatar>
//                   <Box sx={{ flex: 1 }}>
//                     <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'text.primary' }}>
//                       {payment.name}
//                     </Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       {payment.email}
//                     </Typography>
//                   </Box>
//                 </Box>

//                 {/* Details Grid */}
//                 <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 1.5 }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Plan
//                     </Typography>
//                     <Chip
//                       label={payment.plan}
//                       size="small"
//                       sx={{
//                         mt: 0.5,
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                         fontWeight: 500,
//                         fontSize: "0.65rem",
//                         height: 22,
//                       }}
//                     />
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Amount
//                     </Typography>
//                     <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main }}>
//                       {formatCurrency(payment.amount)}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Date
//                     </Typography>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                       <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 12 }} />
//                       <Typography variant="caption" sx={{ color: 'text.primary' }}>
//                         {moment(payment.date).format("DD MMM YYYY")}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Status
//                     </Typography>
//                     <Chip
//                       icon={getStatusIcon(payment.status)}
//                       label={payment.status}
//                       size="small"
//                       sx={{
//                         mt: 0.5,
//                         bgcolor: alpha(getStatusColor(payment.status), 0.1),
//                         color: getStatusColor(payment.status),
//                         fontWeight: 600,
//                         fontSize: "0.65rem",
//                         height: 22,
//                       }}
//                     />
//                   </Box>
//                 </Box>

//                 {/* Additional Info */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Method: {payment.paymentMethod || "Online"}
//                   </Typography>
//                   {payment.duration && payment.duration !== "-" && (
//                     <Typography variant="caption" color="text.secondary">
//                       Duration: {payment.duration}
//                     </Typography>
//                   )}
//                 </Box>
//               </Paper>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   // Desktop Table View
//   const TableView = () => {
//     // Determine columns based on screen size
//     const showEmail = !isSmallMobile;
//     const showDuration = !isMobile;
//     const showPaymentMethod = !isMobile;

//     // Minimum table width for scrolling
//     const getMinWidth = () => {
//       if (isSmallMobile) return 600;
//       if (isMobile) return 700;
//       if (isTablet) return 800;
//       return 900;
//     };

//     return (
//       <TableContainer sx={{ 
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': {
//           height: '6px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: getMinWidth() }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                 Admin
//               </TableCell>
//               {showEmail && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                   Email
//                 </TableCell>
//               )}
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                 Plan
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                 Date
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                 Amount
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                 Status
//               </TableCell>
//               {showPaymentMethod && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                   Method
//                 </TableCell>
//               )}
//               {showDuration && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
//                   Duration
//                 </TableCell>
//               )}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <AnimatePresence>
//               {filteredPayments.map((payment, index) => (
//                 <motion.tr
//                   key={payment.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2, delay: index * 0.02 }}
//                   style={{
//                     backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//                   }}
//                 >
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                       <Avatar
//                         sx={{
//                           width: { xs: 28, sm: 32, md: 36 },
//                           height: { xs: 28, sm: 32, md: 36 },
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
//                         }}
//                       >
//                         {payment.name?.charAt(0) || "A"}
//                       </Avatar>
//                       <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' }, color: 'text.primary' }}>
//                         {payment.name}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   {showEmail && (
//                     <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: 'text.secondary' }}>
//                       {payment.email}
//                     </TableCell>
//                   )}
//                   <TableCell>
//                     <Chip
//                       label={payment.plan}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                         fontWeight: 500,
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                         height: { xs: 20, sm: 22, md: 24 },
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                       <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 10, sm: 12, md: 14 } }} />
//                       <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' }, color: 'text.primary' }}>
//                         {moment(payment.date).format("DD MMM YYYY")}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
//                       {formatCurrency(payment.amount)}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       icon={getStatusIcon(payment.status)}
//                       label={payment.status}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha(getStatusColor(payment.status), 0.1),
//                         color: getStatusColor(payment.status),
//                         fontWeight: 600,
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                         height: { xs: 20, sm: 22, md: 24 },
//                         '& .MuiChip-icon': {
//                           fontSize: { xs: 10, sm: 12, md: 14 }
//                         }
//                       }}
//                     />
//                   </TableCell>
//                   {showPaymentMethod && (
//                     <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' }, color: 'text.secondary' }}>
//                       {payment.paymentMethod || "Online"}
//                     </TableCell>
//                   )}
//                   {showDuration && (
//                     <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' }, color: 'text.secondary' }}>
//                       {payment.duration || "-"}
//                     </TableCell>
//                   )}
//                 </motion.tr>
//               ))}
//             </AnimatePresence>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         overflow: "hidden",
//       }}
//     >
//       {isMobile ? <MobileCardView /> : <TableView />}

//       {totalPages > 1 && (
//         <Box sx={{ 
//           display: "flex", 
//           justifyContent: "center", 
//           p: { xs: 1.5, sm: 2 },
//           borderTop: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//         }}>
//           <TablePagination
//             component="div"
//             count={totalPages * 10}
//             page={page - 1}
//             onPageChange={(e, newPage) => handlePageChange(newPage + 1)}
//             rowsPerPage={10}
//             rowsPerPageOptions={[10]}
//             sx={{
//               '.MuiTablePagination-displayedRows': {
//                 fontSize: { xs: '0.7rem', sm: '0.8rem' },
//               },
//               '.MuiTablePagination-actions': {
//                 button: {
//                   fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                 }
//               }
//             }}
//           />
//         </Box>
//       )}
//     </Paper>
//   );
// };

// export default RevenueTable;




import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  Typography,
  Avatar,
  Chip,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

const RevenueTable = ({ 
  filteredPayments, 
  page, 
  handlePageChange, 
  totalPages,
  isMobile,
  isTablet,
  isSmallMobile 
}) => {
  const theme = useTheme();
  
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 12, sm: 14 } }} />;
      case "pending":
        return <PendingIcon sx={{ color: theme.palette.secondary.main, fontSize: { xs: 12, sm: 14 } }} />;
      default:
        return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 12, sm: 14 } }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#22c55e";
      case "pending":
        return theme.palette.secondary.main;
      default:
        return "#ef4444";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Mobile Card View - Smaller
  const MobileCardView = () => {
    return (
      <Box sx={{ p: { xs: 0.75, sm: 1 } }}>
        <AnimatePresence>
          {filteredPayments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  mb: 1,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  bgcolor: index % 2 === 0 ? theme.palette.background.paper : alpha(theme.palette.primary.main, 0.02),
                }}
              >
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontSize: '0.75rem',
                    }}
                  >
                    {payment.name?.charAt(0) || "A"}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.75rem', color: 'text.primary' }}>
                      {payment.name}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                      {payment.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Details Grid */}
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary', display: 'block' }}>
                      Plan
                    </Typography>
                    <Chip
                      label={payment.plan}
                      size="small"
                      sx={{
                        mt: 0.25,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: '0.6rem',
                        height: 18,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary', display: 'block' }}>
                      Amount
                    </Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.65rem', color: theme.palette.primary.main }}>
                      {formatCurrency(payment.amount)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary', display: 'block' }}>
                      Date
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                      <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 10 }} />
                      <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.primary' }}>
                        {moment(payment.date).format("DD MMM")}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary', display: 'block' }}>
                      Status
                    </Typography>
                    <Chip
                      icon={getStatusIcon(payment.status)}
                      label={payment.status}
                      size="small"
                      sx={{
                        mt: 0.25,
                        bgcolor: alpha(getStatusColor(payment.status), 0.1),
                        color: getStatusColor(payment.status),
                        fontWeight: 600,
                        fontSize: '0.55rem',
                        height: 18,
                        '& .MuiChip-icon': { fontSize: 10 }
                      }}
                    />
                  </Box>
                </Box>

                {/* Additional Info */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary' }}>
                    {payment.paymentMethod || "Online"}
                  </Typography>
                  {payment.duration && payment.duration !== "-" && (
                    <Typography variant="caption" sx={{ fontSize: '0.55rem', color: 'text.secondary' }}>
                      {payment.duration}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    );
  };

  // Desktop Table View - Smaller fonts
  const TableView = () => {
    // Determine columns based on screen size
    const showEmail = !isSmallMobile;
    const showDuration = !isMobile;
    const showPaymentMethod = !isMobile;

    // Minimum table width for scrolling
    const getMinWidth = () => {
      if (isSmallMobile) return 550;
      if (isMobile) return 650;
      if (isTablet) return 750;
      return 850;
    };

    return (
      // <TableContainer sx={{ 
      //   overflowX: 'auto',
      //   maxHeight: { xs: '400px', sm: '500px', md: '600px' },
      //   '&::-webkit-scrollbar': {
      //     width: '6px',
      //     height: '6px',
      //   },
      //   '&::-webkit-scrollbar-track': {
      //     backgroundColor: alpha(theme.palette.primary.main, 0.1),
      //     borderRadius: '3px',
      //   },
      //   '&::-webkit-scrollbar-thumb': {
      //     backgroundColor: alpha(theme.palette.primary.main, 0.3),
      //     borderRadius: '3px',
      //     '&:hover': {
      //       backgroundColor: alpha(theme.palette.primary.main, 0.5),
      //     },
      //   },
      //   scrollBehavior: 'smooth',
      // }}>
      //   <Table sx={{ minWidth: getMinWidth() }}>
      //     <TableHead>
      //       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
      //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //           Admin
      //         </TableCell>
      //         {showEmail && (
      //           <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //             Email
      //           </TableCell>
      //         )}
      //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //           Plan
      //         </TableCell>
      //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //           Date
      //         </TableCell>
      //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //           Amount
      //         </TableCell>
      //         <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //           Status
      //         </TableCell>
      //         {showPaymentMethod && (
      //           <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //             Method
      //           </TableCell>
      //         )}
      //         {showDuration && (
      //           <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1 }}>
      //             Duration
      //           </TableCell>
      //         )}
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //       <AnimatePresence>
      //         {filteredPayments.map((payment, index) => (
      //           <motion.tr
      //             key={payment.id}
      //             initial={{ opacity: 0, y: 10 }}
      //             animate={{ opacity: 1, y: 0 }}
      //             exit={{ opacity: 0 }}
      //             transition={{ duration: 0.2, delay: index * 0.02 }}
      //             style={{
      //               backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
      //             }}
      //           >
      //             <TableCell sx={{ py: 0.75 }}>
      //               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      //                 <Avatar
      //                   sx={{
      //                     width: { xs: 24, sm: 26, md: 28 },
      //                     height: { xs: 24, sm: 26, md: 28 },
      //                     bgcolor: alpha(theme.palette.primary.main, 0.1),
      //                     color: theme.palette.primary.main,
      //                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
      //                   }}
      //                 >
      //                   {payment.name?.charAt(0) || "A"}
      //                 </Avatar>
      //                 <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.90rem' }, color: 'text.primary' }}>
      //                   {payment.name}
      //                 </Typography>
      //               </Box>
      //             </TableCell>
      //             {showEmail && (
      //               <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' }, color: 'text.secondary', py: 0.75 }}>
      //                 {payment.email}
      //               </TableCell>
      //             )}
      //             <TableCell sx={{ py: 0.75 }}>
      //               <Chip
      //                 label={payment.plan}
      //                 size="small"
      //                 sx={{
      //                   bgcolor: alpha(theme.palette.primary.main, 0.1),
      //                   color: theme.palette.primary.main,
      //                   fontWeight: 500,
      //                   fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
      //                   height: { xs: 18, sm: 20, md: 22 },
      //                 }}
      //               />
      //             </TableCell>
      //             <TableCell sx={{ py: 0.75 }}>
      //               <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
      //                 <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 10, sm: 11, md: 12 } }} />
      //                 <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
      //                   {moment(payment.date).format("DD MMM YY")}
      //                 </Typography>
      //               </Box>
      //             </TableCell>
      //             <TableCell sx={{ py: 0.75 }}>
      //               <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>
      //                 {formatCurrency(payment.amount)}
      //               </Typography>
      //             </TableCell>
      //             <TableCell sx={{ py: 0.75 }}>
      //               <Chip
      //                 icon={getStatusIcon(payment.status)}
      //                 label={payment.status}
      //                 size="small"
      //                 sx={{
      //                   bgcolor: alpha(getStatusColor(payment.status), 0.1),
      //                   color: getStatusColor(payment.status),
      //                   fontWeight: 600,
      //                   fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
      //                   height: { xs: 18, sm: 20, md: 22 },
      //                   '& .MuiChip-icon': {
      //                     fontSize: { xs: 10, sm: 11, md: 12 }
      //                   }
      //                 }}
      //               />
      //             </TableCell>
      //             {showPaymentMethod && (
      //               <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.70rem' }, color: 'text.secondary', py: 0.75 }}>
      //                 {payment.paymentMethod || "Online"}
      //               </TableCell>
      //             )}
      //             {showDuration && (
      //               <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.70rem' }, color: 'text.secondary', py: 0.75 }}>
      //                 {payment.duration || "-"}
      //               </TableCell>
      //             )}
      //           </motion.tr>
      //         ))}
      //       </AnimatePresence>
      //     </TableBody>
      //   </Table>
      // </TableContainer>
    <TableContainer sx={{ 
  overflowX: 'auto',
  maxHeight: { xs: '400px', sm: '500px', md: '600px' },
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: alpha(theme.palette.primary.main, 0.3),
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
  },
  scrollBehavior: 'smooth',
}}>
  <Table sx={{ minWidth: getMinWidth() }}>
    <TableHead>
      <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
          Admin
        </TableCell>
        {showEmail && (
          <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
            Email
          </TableCell>
        )}
        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
          Plan
        </TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
          Date
        </TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
          Amount
        </TableCell>
        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
          Status
        </TableCell>
        {showPaymentMethod && (
          <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
            Method
          </TableCell>
        )}
        {showDuration && (
          <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.80rem' }, color: theme.palette.primary.main, py: 1.5 }}>
            Duration
          </TableCell>
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      <AnimatePresence>
        {filteredPayments.map((payment, index) => (
          <motion.tr
            key={payment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            style={{
              backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
            }}
          >
            <TableCell sx={{ py: 1.2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                <Avatar
                  sx={{
                    width: { xs: 28, sm: 30, md: 32 },
                    height: { xs: 28, sm: 30, md: 32 },
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                  }}
                >
                  {payment.name?.charAt(0) || "A"}
                </Avatar>
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
                  {payment.name}
                </Typography>
              </Box>
            </TableCell>
            {showEmail && (
              <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.78rem' }, color: 'text.secondary', py: 1.2 }}>
                {payment.email}
              </TableCell>
            )}
            <TableCell sx={{ py: 1.2 }}>
              <Chip
                label={payment.plan}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                  height: { xs: 22, sm: 24, md: 26 },
                }}
              />
            </TableCell>
            <TableCell sx={{ py: 1.2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 12, sm: 13, md: 14 } }} />
                <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.primary' }}>
                  {moment(payment.date).format("DD MMM YY")}
                </Typography>
              </Box>
            </TableCell>
            <TableCell sx={{ py: 1.2 }}>
              <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
                {formatCurrency(payment.amount)}
              </Typography>
            </TableCell>
            <TableCell sx={{ py: 1.2 }}>
              <Chip
                icon={getStatusIcon(payment.status)}
                label={payment.status}
                size="small"
                sx={{
                  bgcolor: alpha(getStatusColor(payment.status), 0.1),
                  color: getStatusColor(payment.status),
                  fontWeight: 600,
                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                  height: { xs: 22, sm: 24, md: 26 },
                  '& .MuiChip-icon': {
                    fontSize: { xs: 12, sm: 13, md: 14 }
                  }
                }}
              />
            </TableCell>
            {showPaymentMethod && (
              <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.secondary', py: 1.2 }}>
                {payment.paymentMethod || "Online"}
              </TableCell>
            )}
            {showDuration && (
              <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.secondary', py: 1.2 }}>
                {payment.duration || "-"}
              </TableCell>
            )}
          </motion.tr>
        ))}
      </AnimatePresence>
    </TableBody>
  </Table>
</TableContainer>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        overflow: "hidden",
      }}
    >
      {isMobile ? <MobileCardView /> : <TableView />}

      {totalPages > 1 && (
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          p: { xs: 1, sm: 1.5 },
          borderTop: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}>
          <TablePagination
            component="div"
            count={totalPages * 10}
            page={page - 1}
            onPageChange={(e, newPage) => handlePageChange(newPage + 1)}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            sx={{
              '.MuiTablePagination-displayedRows': {
                fontSize: { xs: '0.6rem', sm: '0.65rem' },
              },
              '.MuiTablePagination-actions': {
                button: {
                  fontSize: { xs: '0.6rem', sm: '0.65rem' },
                  padding: '4px',
                }
              }
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default RevenueTable;