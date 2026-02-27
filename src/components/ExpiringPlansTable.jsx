// import React from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Chip,
//   Avatar,
//   alpha,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
// } from "@mui/material";
// import {
//   People as PeopleIcon,
//   Warning as WarningIcon,
//   Event as EventIcon,
//   AttachMoney as MoneyIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const ExpiringPlansTable = ({ data = [] }) => {
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
//   const isSmallMobile = useMediaQuery('(max-width:400px)'); // Extra small devices

//   // Format date function
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   // Get remaining days badge color
//   const getRemainingDaysColor = (days) => {
//     if (days <= 0) return "#ef4444";
//     if (days <= 7) return "#f59e0b";
//     return "#22c55e";
//   };

//   // Get status text
//   const getStatusText = (days) => {
//     if (days <= 0) return "Expired";
//     if (days <= 3) return "Critical";
//     if (days <= 7) return "Warning";
//     return "Active";
//   };

//   // Mobile Card View
//   const MobileCardView = () => {
//     return (
//       <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//         <AnimatePresence>
//           {data.length > 0 ? (
//             data.map((user, index) => {
//               const remainingDays = user.remainingDays || 0;
//               const statusColor = getRemainingDaysColor(remainingDays);
//               const statusText = getStatusText(remainingDays);

//               return (
//                 <motion.div
//                   key={user.userId || index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <Card
//                     sx={{
//                       mb: 2,
//                       borderRadius: 3,
//                       border: "1px solid",
//                       borderColor: alpha(statusColor, 0.2),
//                       boxShadow: `0 4px 12px ${alpha(statusColor, 0.1)}`,
//                       overflow: "hidden",
//                     }}
//                   >
//                     {/* Card Header */}
//                     <Box
//                       sx={{
//                         p: 2,
//                         bgcolor: alpha(statusColor, 0.05),
//                         borderBottom: "1px solid",
//                         borderColor: alpha(statusColor, 0.1),
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                         <Avatar
//                           src={user.userAvatar}
//                           sx={{
//                             width: 40,
//                             height: 40,
//                             bgcolor: alpha("#0f766e", 0.1),
//                             color: "#0f766e",
//                             fontSize: "0.9rem",
//                           }}
//                         >
//                           {user.userName?.charAt(0) || "U"}
//                         </Avatar>
//                         <Box>
//                           <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
//                             {user.userName || "N/A"}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {user.userEmail || "N/A"}
//                           </Typography>
//                         </Box>
//                       </Box>
//                       <Chip
//                         label={statusText}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(statusColor, 0.1),
//                           color: statusColor,
//                           fontWeight: 600,
//                           fontSize: "0.65rem",
//                           height: 22,
//                         }}
//                       />
//                     </Box>

//                     {/* Card Content */}
//                     <CardContent sx={{ p: 2 }}>
//                       <Grid container spacing={1.5}>
//                         {/* Plan Name */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Plan Name
//                             </Typography>
//                             <Typography variant="body2" fontWeight={500} noWrap>
//                               {user.planName || "N/A"}
//                             </Typography>
//                           </Box>
//                         </Grid>

//                         {/* Price */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Price
//                             </Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <MoneyIcon sx={{ color: "#0f766e", fontSize: 14 }} />
//                               <Typography variant="body2" fontWeight={500}>
//                                 {user.planPrice || "0"}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </Grid>

//                         {/* Expires At */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Expires At
//                             </Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: "#64748b", fontSize: 12 }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: "0.75rem" }}>
//                                 {formatDate(user.expiresAt)}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </Grid>

//                         {/* Remaining Days */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Remaining
//                             </Typography>
//                             <Chip
//                               label={remainingDays > 0 ? `${remainingDays} Days` : "Expired"}
//                               size="small"
//                               sx={{
//                                 mt: 0.5,
//                                 bgcolor: alpha(statusColor, 0.1),
//                                 color: statusColor,
//                                 fontWeight: 600,
//                                 fontSize: "0.65rem",
//                                 height: 22,
//                                 width: "100%",
//                               }}
//                             />
//                           </Box>
//                         </Grid>

//                         {/* Description - Full Width */}
//                         {user.planDescription && user.planDescription !== "N/A" && (
//                           <Grid item xs={12}>
//                             <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                                 Description
//                               </Typography>
//                               <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
//                                 {user.planDescription}
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         )}
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })
//           ) : (
//             <Box sx={{ textAlign: "center", py: 8 }}>
//               <PeopleIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
//               <Typography variant="h6" color="text.secondary" gutterBottom>
//                 No users with expiring plans
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 All plans are up to date
//               </Typography>
//             </Box>
//           )}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   // Desktop/Tablet Table View
//   const TableView = () => {
//     // Determine which columns to show based on device
//     const showDescription = !isTablet && !isMobile;
//     const showEmail = !isSmallMobile;

//     return (
//       <TableContainer sx={{ maxHeight: { sm: 500, md: 600 } }}>
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 User
//               </TableCell>
//               {showEmail && (
//                 <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                   Email
//                 </TableCell>
//               )}
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Plan
//               </TableCell>
//               {showDescription && (
//                 <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                   Description
//                 </TableCell>
//               )}
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Price
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Expires
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Status
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <AnimatePresence>
//               {data.length > 0 ? (
//                 data.map((user, index) => {
//                   const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);
//                   const remainingDays = user.remainingDays || 0;

//                   return (
//                     <TableRow
//                       key={user.userId || index}
//                       component={motion.tr}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                       sx={{
//                         "&:hover": {
//                           bgcolor: alpha("#0f766e", 0.05),
//                         },
//                       }}
//                     >
//                       <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                           <Avatar
//                             src={user.userAvatar}
//                             sx={{
//                               width: { xs: 28, sm: 32 },
//                               height: { xs: 28, sm: 32 },
//                               bgcolor: alpha("#0f766e", 0.1),
//                               color: "#0f766e",
//                               fontSize: { xs: '0.7rem', sm: '0.85rem' },
//                             }}
//                           >
//                             {user.userName?.charAt(0) || "U"}
//                           </Avatar>
//                           <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
//                             {user.userName || "N/A"}
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       {showEmail && (
//                         <TableCell sx={{ bgcolor: rowBg, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//                           {user.userEmail || "N/A"}
//                         </TableCell>
//                       )}

//                       <TableCell sx={{ bgcolor: rowBg, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//                         {user.planName || "N/A"}
//                       </TableCell>

//                       {showDescription && (
//                         <TableCell sx={{ bgcolor: rowBg, fontSize: { xs: '0.7rem', sm: '0.8rem' }, maxWidth: 200 }}>
//                           <Typography noWrap variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//                             {user.planDescription || "N/A"}
//                           </Typography>
//                         </TableCell>
//                       )}

//                       <TableCell sx={{ bgcolor: rowBg }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <MoneyIcon sx={{ color: "#0f766e", fontSize: { xs: 12, sm: 14, md: 16 } }} />
//                           <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//                             {user.planPrice || "0"}
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       <TableCell sx={{ bgcolor: rowBg }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <EventIcon sx={{ color: "#64748b", fontSize: { xs: 10, sm: 12, md: 14 } }} />
//                           <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' } }}>
//                             {formatDate(user.expiresAt)}
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       <TableCell sx={{ bgcolor: rowBg }}>
//                         <Chip
//                           label={remainingDays > 0 ? `${remainingDays}d` : "Expired"}
//                           size="small"
//                           icon={remainingDays <= 0 ? <WarningIcon sx={{ fontSize: { xs: 10, sm: 12 } }} /> : undefined}
//                           sx={{
//                             bgcolor: alpha(getRemainingDaysColor(remainingDays), 0.1),
//                             color: getRemainingDaysColor(remainingDays),
//                             fontWeight: 600,
//                             fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' },
//                             height: { xs: 20, sm: 24 },
//                             "& .MuiChip-icon": {
//                               fontSize: { xs: 10, sm: 12 },
//                               color: getRemainingDaysColor(remainingDays),
//                             },
//                           }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={showDescription ? 7 : (showEmail ? 6 : 5)} align="center" sx={{ py: 8 }}>
//                     <Box sx={{ textAlign: "center" }}>
//                       <PeopleIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
//                       <Typography variant="h6" color="text.secondary" gutterBottom>
//                         No users with expiring plans
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         All plans are up to date
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </AnimatePresence>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: { xs: 1, sm: 2, md: 2 },
//           overflow: "hidden",
//           border: "1px solid",
//           borderColor: alpha("#e2e8f0", 0.5),
//           boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 2, sm: 2.5, md: 3 },
//             background: "linear-gradient(135deg, #0f766e, #0a5c55)",
//             color: "white",
//           }}
//         >
//           <Box sx={{ 
//             display: "flex", 
//             alignItems: "center", 
//             justifyContent: "space-between", 
//             flexWrap: "wrap", 
//             gap: { xs: 1, sm: 2 } 
//           }}>
//             <Box>
//               <Typography 
//                 variant={isMobile ? "subtitle1" : "h6"} 
//                 fontWeight={600} 
//                 color="white" 
//                 gutterBottom
//                 sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
//               >
//                 Users with Expiring Plans
//               </Typography>
//               <Typography 
//                 variant="body2" 
//                 sx={{ 
//                   color: alpha("#ffffff", 0.8),
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
//                 }}
//               >
//                 {isMobile ? `${data.length} results` : "Complete list of users whose plans are expiring soon"}
//               </Typography>
//             </Box>

//             <Chip
//               label={isMobile ? `${data.length}` : `${data.length} Results`}
//               size="small"
//               icon={<PeopleIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
//                 height: { xs: 24, sm: 28, md: 32 },
//                 "& .MuiChip-icon": {
//                   color: "white",
//                   fontSize: { xs: 12, sm: 14 },
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         {/* Conditional rendering based on device */}
//         {isMobile ? <MobileCardView /> : <TableView />}
//       </Paper>
//     </motion.div>
//   );
// };

// export default ExpiringPlansTable;





// import React from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Chip,
//   Avatar,
//   alpha,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
// } from "@mui/material";
// import {
//   People as PeopleIcon,
//   Warning as WarningIcon,
//   Event as EventIcon,
//   AttachMoney as MoneyIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const ExpiringPlansTable = ({ data = [] }) => {
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
//   const isSmallMobile = useMediaQuery('(max-width:400px)'); // Extra small devices

//   // Format date function
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   // Get remaining days badge color
//   const getRemainingDaysColor = (days) => {
//     if (days <= 0) return "#ef4444";
//     if (days <= 7) return "#f59e0b";
//     return "#22c55e";
//   };

//   // Get status text
//   const getStatusText = (days) => {
//     if (days <= 0) return "Expired";
//     if (days <= 3) return "Critical";
//     if (days <= 7) return "Warning";
//     return "Active";
//   };

//   // Mobile Card View
//   const MobileCardView = () => {
//     return (
//       <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
//         <AnimatePresence>
//           {data.length > 0 ? (
//             data.map((user, index) => {
//               const remainingDays = user.remainingDays || 0;
//               const statusColor = getRemainingDaysColor(remainingDays);
//               const statusText = getStatusText(remainingDays);

//               return (
//                 <motion.div
//                   key={user.userId || index}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.05 }}
//                 >
//                   <Card
//                     sx={{
//                       mb: 2,
//                       borderRadius: 3,
//                       border: "1px solid",
//                       borderColor: alpha(statusColor, 0.2),
//                       boxShadow: `0 4px 12px ${alpha(statusColor, 0.1)}`,
//                       overflow: "hidden",
//                     }}
//                   >
//                     {/* Card Header */}
//                     <Box
//                       sx={{
//                         p: 2,
//                         bgcolor: alpha(statusColor, 0.05),
//                         borderBottom: "1px solid",
//                         borderColor: alpha(statusColor, 0.1),
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                         <Avatar
//                           src={user.userAvatar}
//                           sx={{
//                             width: 40,
//                             height: 40,
//                             bgcolor: alpha("#0f766e", 0.1),
//                             color: "#0f766e",
//                             fontSize: "0.9rem",
//                           }}
//                         >
//                           {user.userName?.charAt(0) || "U"}
//                         </Avatar>
//                         <Box>
//                           <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
//                             {user.userName || "N/A"}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {user.userEmail || "N/A"}
//                           </Typography>
//                         </Box>
//                       </Box>
//                       <Chip
//                         label={statusText}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(statusColor, 0.1),
//                           color: statusColor,
//                           fontWeight: 600,
//                           fontSize: "0.65rem",
//                           height: 22,
//                         }}
//                       />
//                     </Box>

//                     {/* Card Content */}
//                     <CardContent sx={{ p: 2 }}>
//                       <Grid container spacing={1.5}>
//                         {/* Plan Name */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Plan Name
//                             </Typography>
//                             <Typography variant="body2" fontWeight={500} noWrap>
//                               {user.planName || "N/A"}
//                             </Typography>
//                           </Box>
//                         </Grid>

//                         {/* Price */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Price
//                             </Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <MoneyIcon sx={{ color: "#0f766e", fontSize: 14 }} />
//                               <Typography variant="body2" fontWeight={500}>
//                                 {user.planPrice || "0"}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </Grid>

//                         {/* Expires At */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Expires At
//                             </Typography>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                               <EventIcon sx={{ color: "#64748b", fontSize: 12 }} />
//                               <Typography variant="body2" noWrap sx={{ fontSize: "0.75rem" }}>
//                                 {formatDate(user.expiresAt)}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </Grid>

//                         {/* Remaining Days */}
//                         <Grid item xs={6}>
//                           <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                             <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                               Remaining
//                             </Typography>
//                             <Chip
//                               label={remainingDays > 0 ? `${remainingDays} Days` : "Expired"}
//                               size="small"
//                               sx={{
//                                 mt: 0.5,
//                                 bgcolor: alpha(statusColor, 0.1),
//                                 color: statusColor,
//                                 fontWeight: 600,
//                                 fontSize: "0.65rem",
//                                 height: 22,
//                                 width: "100%",
//                               }}
//                             />
//                           </Box>
//                         </Grid>

//                         {/* Description - Full Width */}
//                         {user.planDescription && user.planDescription !== "N/A" && (
//                           <Grid item xs={12}>
//                             <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                                 Description
//                               </Typography>
//                               <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
//                                 {user.planDescription}
//                               </Typography>
//                             </Box>
//                           </Grid>
//                         )}
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })
//           ) : (
//             <Box sx={{ textAlign: "center", py: 8 }}>
//               <PeopleIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
//               <Typography variant="h6" color="text.secondary" gutterBottom>
//                 No users with expiring plans
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 All plans are up to date
//               </Typography>
//             </Box>
//           )}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   // Desktop/Tablet Table View - FULLY RESPONSIVE
//   const TableView = () => {
//     // Responsive column visibility based on screen size
//     const showDescription = !isTablet && !isMobile; // Hide on tablet and mobile
//     const showEmail = !isSmallMobile && !isMobile; // Hide on small mobile and mobile
//     const showPlanName = true; // Always show
//     const showPrice = true; // Always show
//     const showExpires = true; // Always show
//     const showStatus = true; // Always show

//     // Get column count for colspan
//     const getColumnCount = () => {
//       let count = 2; // User + Plan (always show)
//       if (showEmail) count++;
//       if (showDescription) count++;
//       if (showPrice) count++;
//       if (showExpires) count++;
//       if (showStatus) count++;
//       return count;
//     };

//     return (
//       <TableContainer sx={{ 
//         maxHeight: { xs: 400, sm: 500, md: 600 },
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': {
//           height: '6px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table stickyHeader sx={{ minWidth: isSmallMobile ? 500 : isMobile ? 600 : isTablet ? 700 : 800 }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//               <TableCell sx={{ 
//                 fontWeight: 600, 
//                 color: "#1e293b", 
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
//                 whiteSpace: 'nowrap',
//                 py: { xs: 1, sm: 1.5 }
//               }}>
//                 User
//               </TableCell>

//               {showEmail && (
//                 <TableCell sx={{ 
//                   fontWeight: 600, 
//                   color: "#1e293b", 
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
//                   whiteSpace: 'nowrap',
//                   py: { xs: 1, sm: 1.5 }
//                 }}>
//                   Email
//                 </TableCell>
//               )}

//               <TableCell sx={{ 
//                 fontWeight: 600, 
//                 color: "#1e293b", 
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
//                 whiteSpace: 'nowrap',
//                 py: { xs: 1, sm: 1.5 }
//               }}>
//                 Plan
//               </TableCell>

//               {showDescription && (
//                 <TableCell sx={{ 
//                   fontWeight: 600, 
//                   color: "#1e293b", 
//                   fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
//                   whiteSpace: 'nowrap',
//                   py: { xs: 1, sm: 1.5 }
//                 }}>
//                   Description
//                 </TableCell>
//               )}

//               <TableCell sx={{ 
//                 fontWeight: 600, 
//                 color: "#1e293b", 
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
//                 whiteSpace: 'nowrap',
//                 py: { xs: 1, sm: 1.5 }
//               }}>
//                 Price
//               </TableCell>

//               <TableCell sx={{ 
//                 fontWeight: 600, 
//                 color: "#1e293b", 
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
//                 whiteSpace: 'nowrap',
//                 py: { xs: 1, sm: 1.5 }
//               }}>
//                 Expires
//               </TableCell>

//               <TableCell sx={{ 
//                 fontWeight: 600, 
//                 color: "#1e293b", 
//                 fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem', lg: '0.9rem' },
//                 whiteSpace: 'nowrap',
//                 py: { xs: 1, sm: 1.5 }
//               }}>
//                 Status
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <AnimatePresence>
//               {data.length > 0 ? (
//                 data.map((user, index) => {
//                   const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);
//                   const remainingDays = user.remainingDays || 0;

//                   return (
//                     <TableRow
//                       key={user.userId || index}
//                       component={motion.tr}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                       sx={{
//                         "&:hover": {
//                           bgcolor: alpha("#0f766e", 0.05),
//                         },
//                       }}
//                     >
//                       {/* User Cell */}
//                       <TableCell sx={{ 
//                         bgcolor: rowBg, 
//                         py: { xs: 1, sm: 1.5, md: 2 },
//                         px: { xs: 1, sm: 1.5, md: 2 }
//                       }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1, md: 1.5 } }}>
//                           <Avatar
//                             src={user.userAvatar}
//                             sx={{
//                               width: { xs: 24, sm: 28, md: 32 },
//                               height: { xs: 24, sm: 28, md: 32 },
//                               bgcolor: alpha("#0f766e", 0.1),
//                               color: "#0f766e",
//                               fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
//                             }}
//                           >
//                             {user.userName?.charAt(0) || "U"}
//                           </Avatar>
//                           <Typography 
//                             variant="body2" 
//                             fontWeight={500} 
//                             sx={{ 
//                               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem', lg: '0.85rem' },
//                               whiteSpace: 'nowrap',
//                             }}
//                           >
//                             {user.userName || "N/A"}
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       {/* Email Cell */}
//                       {showEmail && (
//                         <TableCell sx={{ 
//                           bgcolor: rowBg, 
//                           fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem', lg: '0.8rem' },
//                           py: { xs: 1, sm: 1.5, md: 2 },
//                           px: { xs: 1, sm: 1.5, md: 2 },
//                           whiteSpace: 'nowrap',
//                         }}>
//                           {user.userEmail || "N/A"}
//                         </TableCell>
//                       )}

//                       {/* Plan Cell */}
//                       <TableCell sx={{ 
//                         bgcolor: rowBg, 
//                         fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem', lg: '0.8rem' },
//                         py: { xs: 1, sm: 1.5, md: 2 },
//                         px: { xs: 1, sm: 1.5, md: 2 },
//                         whiteSpace: 'nowrap',
//                       }}>
//                         {user.planName || "N/A"}
//                       </TableCell>

//                       {/* Description Cell */}
//                       {showDescription && (
//                         <TableCell sx={{ 
//                           bgcolor: rowBg, 
//                           fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem', lg: '0.8rem' },
//                           py: { xs: 1, sm: 1.5, md: 2 },
//                           px: { xs: 1, sm: 1.5, md: 2 },
//                           maxWidth: 200,
//                         }}>
//                           <Typography 
//                             noWrap 
//                             variant="body2" 
//                             sx={{ 
//                               fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem', lg: '0.8rem' },
//                             }}
//                           >
//                             {user.planDescription || "N/A"}
//                           </Typography>
//                         </TableCell>
//                       )}

//                       {/* Price Cell */}
//                       <TableCell sx={{ 
//                         bgcolor: rowBg,
//                         py: { xs: 1, sm: 1.5, md: 2 },
//                         px: { xs: 1, sm: 1.5, md: 2 }
//                       }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <MoneyIcon sx={{ 
//                             color: "#0f766e", 
//                             fontSize: { xs: 10, sm: 12, md: 14, lg: 16 } 
//                           }} />
//                           <Typography 
//                             variant="body2" 
//                             fontWeight={500} 
//                             sx={{ 
//                               fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem', lg: '0.8rem' },
//                               whiteSpace: 'nowrap',
//                             }}
//                           >
//                             {user.planPrice || "0"}
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       {/* Expires Cell */}
//                       <TableCell sx={{ 
//                         bgcolor: rowBg,
//                         py: { xs: 1, sm: 1.5, md: 2 },
//                         px: { xs: 1, sm: 1.5, md: 2 }
//                       }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <EventIcon sx={{ 
//                             color: "#64748b", 
//                             fontSize: { xs: 8, sm: 10, md: 12, lg: 14 } 
//                           }} />
//                           <Typography 
//                             variant="body2" 
//                             sx={{ 
//                               fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem', lg: '0.75rem' },
//                               whiteSpace: 'nowrap',
//                             }}
//                           >
//                             {formatDate(user.expiresAt)}
//                           </Typography>
//                         </Box>
//                       </TableCell>

//                       {/* Status Cell */}
//                       <TableCell sx={{ 
//                         bgcolor: rowBg,
//                         py: { xs: 1, sm: 1.5, md: 2 },
//                         px: { xs: 1, sm: 1.5, md: 2 }
//                       }}>
//                         <Chip
//                           label={remainingDays > 0 ? `${remainingDays}d` : "Expired"}
//                           size="small"
//                           icon={remainingDays <= 0 ? <WarningIcon /> : undefined}
//                           sx={{
//                             bgcolor: alpha(getRemainingDaysColor(remainingDays), 0.1),
//                             color: getRemainingDaysColor(remainingDays),
//                             fontWeight: 600,
//                             fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem', lg: '0.7rem' },
//                             height: { xs: 18, sm: 20, md: 22, lg: 24 },
//                             '& .MuiChip-icon': {
//                               fontSize: { xs: 8, sm: 10, md: 12 },
//                             },
//                             minWidth: { xs: 50, sm: 60, md: 70 },
//                           }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={getColumnCount()} align="center" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
//                     <Box sx={{ textAlign: "center" }}>
//                       <PeopleIcon sx={{ 
//                         fontSize: { xs: 32, sm: 40, md: 48 }, 
//                         color: alpha("#0f766e", 0.3), 
//                         mb: 2 
//                       }} />
//                       <Typography variant="h6" color="text.secondary" gutterBottom
//                         sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//                         No users with expiring plans
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary"
//                         sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' } }}>
//                         All plans are up to date
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </AnimatePresence>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: { xs: 1, sm: 2, md: 2 },
//           overflow: "hidden",
//           border: "1px solid",
//           borderColor: alpha("#e2e8f0", 0.5),
//           boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
//           bgcolor: theme.palette.background.paper,
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
//             background: "linear-gradient(135deg, #0f766e, #0a5c55)",
//             color: "white",
//           }}
//         >
//           <Box sx={{ 
//             display: "flex", 
//             alignItems: "center", 
//             justifyContent: "space-between", 
//             flexWrap: "wrap", 
//             gap: { xs: 0.5, sm: 1, md: 2 } 
//           }}>
//             <Box>
//               <Typography 
//                 variant={isMobile ? "body1" : "h6"} 
//                 fontWeight={600} 
//                 color="white" 
//                 gutterBottom
//                 sx={{ 
//                   fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.25rem' },
//                   mb: { xs: 0.25, sm: 0.5 }
//                 }}
//               >
//                 Users with Expiring Plans
//               </Typography>
//               <Typography 
//                 variant="body2" 
//                 sx={{ 
//                   color: alpha("#ffffff", 0.8),
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.875rem' }
//                 }}
//               >
//                 {isMobile ? `${data.length} results` : "Complete list of users whose plans are expiring soon"}
//               </Typography>
//             </Box>

//             <Chip
//               label={isMobile ? `${data.length}` : `${data.length} Results`}
//               size="small"
//               icon={<PeopleIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem', lg: '0.85rem' },
//                 height: { xs: 20, sm: 22, md: 24, lg: 32 },
//                 "& .MuiChip-icon": {
//                   color: "white",
//                   fontSize: { xs: 10, sm: 12, md: 14 },
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         {/* Conditional rendering based on device */}
//         {isMobile ? <MobileCardView /> : <TableView />}
//       </Paper>
//     </motion.div>
//   );
// };

// export default ExpiringPlansTable;






import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Avatar,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  People as PeopleIcon,
  Warning as WarningIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ExpiringPlansTable = ({ data = [] }) => {
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get remaining days badge color
  const getRemainingDaysColor = (days) => {
    if (days <= 0) return "#ef4444";
    if (days <= 7) return "#f59e0b";
    return "#22c55e";
  };

  // Get status text
  const getStatusText = (days) => {
    if (days <= 0) return "Expired";
    if (days <= 3) return "Critical";
    if (days <= 7) return "Warning";
    return "Active";
  };

  const navigate = useNavigate();
  // Single line view for all devices
  const SingleLineView = () => {
    return (
      <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
        <AnimatePresence>
          {data.length > 0 ? (
            data.map((user, index) => {
              const remainingDays = user.remainingDays || 0;
              const statusColor = getRemainingDaysColor(remainingDays);
              const statusText = getStatusText(remainingDays);

              return (
                <motion.div
                  key={user.userId || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: { xs: 1, sm: 1.5, md: 2 },
                      p: { xs: 1, sm: 1.5 },
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: index % 2 === 0 ? 'transparent' : alpha('#f8fafc', 0.3),
                      border: '1px solid',
                      borderColor: alpha('#e2e8f0', 0.3),
                      '&:hover': {
                        bgcolor: alpha('#0f766e', 0.02),
                        borderColor: alpha('#0f766e', 0.2),
                      },
                    }}
                  >
                    {/* User Info - Always visible */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      minWidth: { xs: '100%', sm: '200px', md: '250px' }
                      
                    }}
                      onClick={() => navigate('/super-admin/plans')}>
                      <Avatar
                        src={user.userAvatar}
                        sx={{
                          width: { xs: 28, sm: 32, md: 36 },
                          height: { xs: 28, sm: 32, md: 36 },
                          bgcolor: alpha("#0f766e", 0.1),
                          color: "#0f766e",
                          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                        }}
                      >
                        {user.userName?.charAt(0) || "U"}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="#1e293b"
                          sx={{
                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {user.userName || "N/A"}
                        </Typography>
                        {!isMobile && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              fontSize: { xs: '0.6rem', sm: '0.65rem' },
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '150px'
                            }}
                          >
                            {user.userEmail || "N/A"}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Plan Info */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: { xs: '100%', sm: '120px', md: '150px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 1 }}
                      >
                        Plan:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {user.planName || "N/A"}
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: { xs: '100%', sm: '80px', md: '100px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 1 }}
                      >
                        Price:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                        <MoneyIcon sx={{
                          color: "#0f766e",
                          fontSize: { xs: 10, sm: 12, md: 14 }
                        }} />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}
                        >
                          {user.planPrice || "0"}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Expires */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: { xs: '100%', sm: '100px', md: '120px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 1 }}
                      >
                        Expires:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                        <EventIcon sx={{
                          color: "#64748b",
                          fontSize: { xs: 8, sm: 10, md: 12 }
                        }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' },
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formatDate(user.expiresAt)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Status Badge */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      ml: { xs: 0, sm: 'auto' },
                      minWidth: { xs: '100%', sm: '80px', md: '100px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 1 }}
                      >
                        Status:
                      </Typography>
                      <Chip
                        label={remainingDays > 0 ? `${remainingDays}d` : "Expired"}
                        size="small"
                        icon={remainingDays <= 0 ? <WarningIcon /> : undefined}
                        sx={{
                          bgcolor: alpha(statusColor, 0.1),
                          color: statusColor,
                          fontWeight: 600,
                          fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                          height: { xs: 20, sm: 22, md: 24 },
                          '& .MuiChip-icon': {
                            fontSize: { xs: 10, sm: 12 },
                          },
                          minWidth: { xs: 60, sm: 65, md: 70 },
                        }}
                      />
                    </Box>
                  </Box>


                </motion.div>
              );
            })
          ) : (
            <Box sx={{ textAlign: "center", py: { xs: 4, sm: 5, md: 6 } }}>
              <PeopleIcon sx={{
                fontSize: { xs: 40, sm: 44, md: 48 },
                color: alpha("#0f766e", 0.3),
                mb: 2
              }} />
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
              >
                No users with expiring plans
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}
              >
                All plans are up to date
              </Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          overflow: "hidden",
          border: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
          bgcolor: theme.palette.background.paper,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: { xs: 1.5, sm: 2, md: 2.5 },
            background: "linear-gradient(135deg, #0f766e, #0a5c55)",
            color: "white",
          }}
        >
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1
          }}>
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                color="white"
                sx={{
                  fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
                  mb: 0.25
                }}
              >
                Users with Expiring Plans
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#ffffff", 0.8),
                  fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
                }}
              >
                {`${data.length} ${data.length === 1 ? 'user' : 'users'} found`}
              </Typography>
            </Box>

            <Chip
              label={`${data.length} ${data.length === 1 ? 'Result' : 'Results'}`}
              size="small"
              icon={<PeopleIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                fontWeight: 600,
                fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                height: { xs: 22, sm: 24, md: 28 },
                "& .MuiChip-icon": {
                  color: "white",
                  fontSize: { xs: 10, sm: 12, md: 14 },
                },
              }}
            />
          </Box>
        </Box>

        {/* Single Line View for all devices */}
        <SingleLineView />
      </Paper>
    </motion.div>
  );
};

export default ExpiringPlansTable;