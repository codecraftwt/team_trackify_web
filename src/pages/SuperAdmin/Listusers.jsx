// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../redux/slices/userSlice";
// import { getPaymentHistory } from "../../redux/slices/paymentSlice";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Avatar,
//   Chip,
//   Tab,
//   Tabs,
//   CircularProgress,
//   alpha,
//   IconButton,
//   Tooltip,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
//   Stack,
//   Divider,
//   TextField,
//   InputAdornment,
//   Button,
//   Menu,
// } from "@mui/material";
// import { Search as SearchIcon, ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from "@mui/icons-material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import {
//   Person as PersonIcon,
//   CheckCircle as ActiveIcon,
//   Cancel as InactiveIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   CalendarToday as CalendarIcon,
//   ArrowBack as ArrowBackIcon,
//   Visibility as VisibilityIcon,
//   History as HistoryIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import moment from "moment";

// // TabPanel component
// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`user-tabpanel-${index}`}
//       aria-labelledby={`user-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: { xs: 1.5, md: 2 } }}>{children}</Box>}
//     </div>
//   );
// }

// // Mobile Card View Component
// const UserCard = ({ user, onCardClick, theme }) => {
//   // Get last tracking date (lastStartTime) or fallback to createdAt
//   const getDisplayDate = () => {
//     return user.lastStartTime || user.createdAt;
//   };

//   const displayDate = getDisplayDate();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Card
//         elevation={0}
//         sx={{
//           borderRadius: 2,
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           mb: 1.5,
//           cursor: "pointer",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
//             borderColor: theme.palette.primary.main,
//           },
//         }}
//         onClick={() => onCardClick(user)}
//       >
//         <CardContent sx={{ p: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//             <Avatar
//               src={user.avtar}
//               sx={{
//                 width: 44,
//                 height: 44,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 border: "2px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.2),
//               }}
//             >
//               {user.name?.charAt(0) || <PersonIcon />}
//             </Avatar>
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ fontSize: "0.9rem" }}>
//                 {user.name}
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
//                 <Chip
//                   icon={user.isActive ? <ActiveIcon sx={{ fontSize: 12 }} /> : <InactiveIcon sx={{ fontSize: 12 }} />}
//                   label={user.isActive ? "Active" : "Inactive"}
//                   size="small"
//                   sx={{
//                     bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
//                     color: user.isActive ? "#22c55e" : "#ef4444",
//                     fontWeight: 600,
//                     fontSize: "0.6rem",
//                     height: 18,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </Box>

//           <Stack spacing={1}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//               <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{user.email}</Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//               <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{user.mobile_no || "—"}</Typography>
//             </Box>

//             <Divider sx={{ my: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                   Last Tracking:
//                 </Typography>
//               </Box>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem", fontWeight: 500 }}>
//                 {displayDate ? moment(displayDate).format('MMM D, YYYY') : 'N/A'}
//               </Typography>
//             </Box>
//           </Stack>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// // Desktop Table View Component
// const UserTable = ({ users, onRowClick, theme, isMobile, isTablet }) => {
//   // Get last tracking date (lastStartTime) or fallback to createdAt
//   const getDisplayDate = (user) => {
//     return user.lastStartTime || user.createdAt;
//   };

//   return (
//     <TableContainer
//       component={Paper}
//       elevation={0}
//       sx={{
//         borderRadius: 2,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         overflowX: "auto",
//         "&::-webkit-scrollbar": { height: "6px" },
//         "&::-webkit-scrollbar-thumb": {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: "3px",
//         },
//       }}
//     >
//       <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//         <TableHead>
//           <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>#</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Profile</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Name</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Email</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Mobile</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Last Tracking Date</TableCell>
//             <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user, index) => {
//             const displayDate = getDisplayDate(user);
//             return (
//               <TableRow
//                 key={user._id}
//                 hover
//                 onClick={() => onRowClick(user)}
//                 sx={{
//                   cursor: "pointer",
//                   "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) },
//                 }}
//               >
//                 <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, py: 1 }}>{index + 1}</TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Avatar
//                     src={user.avtar}
//                     sx={{
//                       width: { xs: 32, sm: 35, md: 38 },
//                       height: { xs: 32, sm: 35, md: 38 },
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     }}
//                   >
//                     {user.name?.charAt(0) || <PersonIcon />}
//                   </Avatar>
//                 </TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}>
//                     {user.name}
//                   </Typography>
//                 </TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
//                     {user.email}
//                   </Typography>
//                 </TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
//                     {user.mobile_no || "—"}
//                   </Typography>
//                 </TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Typography variant="body2" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.secondary" }}>
//                     {displayDate ? moment(displayDate).format('MMM D, YYYY') : 'N/A'}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="center" sx={{ py: 1 }}>
//                   <Tooltip title="View Tracking">
//                     <IconButton
//                       size="small"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onRowClick(user);
//                       }}
//                       sx={{
//                         color: theme.palette.primary.main,
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         width: { xs: 28, sm: 30 },
//                         height: { xs: 28, sm: 30 },
//                         "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                       }}
//                     >
//                       <VisibilityIcon sx={{ fontSize: { xs: 14, sm: 15 } }} />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // Plan History Table Component
// const PlanHistoryTable = ({ payments, onViewPayment, theme, isMobile, isTablet }) => {
//   const getPlanStatus = (payment) => {
//     if (payment.isCancelledByUser === true || payment.status === "cancelled") {
//       return { label: "Cancelled", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
//     }
//     if (payment.status === "failed") {
//       return { label: "Failed", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
//     }
//     if (payment.status === "pending") {
//       return { label: "Pending", color: "#eab308", bg: alpha("#eab308", 0.1) };
//     }
//     if (payment.status === "completed" && payment.isExpired === true) {
//       return { label: "Expired", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
//     }
//     if (payment.status === "completed" && payment.isActive === true && payment.isCancelledByUser === false) {
//       return { label: "Active", color: "#22c55e", bg: alpha("#22c55e", 0.1) };
//     }
//     return { label: "Active", color: "#22c55e", bg: alpha("#22c55e", 0.1) };
//   };

//   const getPaymentStatusDisplay = (payment) => {
//     if (payment.status === "completed") return { label: "Completed", color: "#22c55e", bg: alpha("#22c55e", 0.1) };
//     if (payment.status === "pending") return { label: "Pending", color: "#eab308", bg: alpha("#eab308", 0.1) };
//     if (payment.status === "cancelled") return { label: "Cancelled", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
//     if (payment.status === "failed") return { label: "Failed", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
//     return { label: payment.status || "Unknown", color: "#6b7280", bg: alpha("#6b7280", 0.1) };
//   };

//   const getExpiryDisplay = (payment) => {
//     if (payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed" || payment.status === "pending") {
//       return "—";
//     }
//     if (!payment.expiresAt) return "—";
//     return moment(payment.expiresAt).format("DD MMM YYYY");
//   };

//   const getRemainingDaysDisplay = (payment) => {
//     if (payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed" || payment.status === "pending") {
//       return null;
//     }
//     if (payment.status === "completed" && payment.remainingDays > 0 && !payment.isExpired) {
//       return (
//         <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "success.main", display: "block" }}>
//           {payment.remainingDays} days left
//         </Typography>
//       );
//     }
//     return null;
//   };

//   return (
//     <TableContainer
//       component={Paper}
//       elevation={0}
//       sx={{
//         borderRadius: 2,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         overflowX: "auto",
//         "&::-webkit-scrollbar": { height: "6px" },
//         "&::-webkit-scrollbar-thumb": {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: "3px",
//         },
//       }}
//     >
//       <Table sx={{ minWidth: isTablet ? 1000 : 1100 }}>
//         <TableHead>
//           <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>#</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>User</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Plan</TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Original</TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Discount</TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Paid</TableCell>
//             <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Payment Status</TableCell>
//             <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Plan Status</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Payment Date</TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Expires On</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {payments.map((payment, index) => {
//             const originalAmount = payment.originalAmount || payment.amount;
//             const discountAmount = payment.discountAmount || 0;
//             const paidAmount = payment.amount;
//             const planStatus = getPlanStatus(payment);
//             const paymentStatus = getPaymentStatusDisplay(payment);
//             const expiryDisplay = getExpiryDisplay(payment);
//             const remainingDaysDisplay = getRemainingDaysDisplay(payment);
//             const isWarning = payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed";

//             return (
//               <TableRow
//                 key={payment._id}
//                 hover
//                 sx={{
//                   cursor: "pointer",
//                   bgcolor: isWarning ? alpha("#ef4444", 0.03) : "transparent",
//                   "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) },
//                 }}
//               >
//                 <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, py: 1 }}>{index + 1}</TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
//                       {payment.adminId?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 16 }} />}
//                     </Avatar>
//                     <Box>
//                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}>
//                         {payment.adminId?.name || "Unknown"}
//                       </Typography>
//                       <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
//                         {payment.adminId?.email || ""}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, fontWeight: 500 }}>
//                     {payment.planId?.name || "Add On Plan"}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>
//                     ₹{originalAmount?.toLocaleString("en-IN") || 0}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   {discountAmount > 0 ? (
//                     <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "#22c55e" }}>
//                       -₹{discountAmount.toLocaleString("en-IN")}
//                     </Typography>
//                   ) : (
//                     <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>—</Typography>
//                   )}
//                 </TableCell>
//                 <TableCell align="right" sx={{ py: 1 }}>
//                   <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "success.main" }}>
//                     ₹{paidAmount?.toLocaleString("en-IN") || 0}
//                   </Typography>
//                 </TableCell>
//                 <TableCell align="center" sx={{ py: 1 }}>
//                   <Chip label={paymentStatus.label} size="small" sx={{ bgcolor: paymentStatus.bg, color: paymentStatus.color, fontWeight: 600, fontSize: { xs: "0.6rem", sm: "0.65rem" }, height: { xs: 20, sm: 22 } }} />
//                 </TableCell>
//                 <TableCell align="center" sx={{ py: 1 }}>
//                   <Chip label={planStatus.label} size="small" sx={{ bgcolor: planStatus.bg, color: planStatus.color, fontWeight: 600, fontSize: { xs: "0.6rem", sm: "0.65rem" }, height: { xs: 20, sm: 22 } }} />
//                 </TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.secondary" }}>
//                     {moment(payment.createdAt).format("DD MMM YYYY")}
//                   </Typography>
//                 </TableCell>
//                 <TableCell sx={{ py: 1 }}>
//                   <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.secondary" }}>
//                     {expiryDisplay}
//                   </Typography>
//                   {remainingDaysDisplay}
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // Mobile Plan History Card View
// const PlanHistoryCard = ({ payment, onViewPayment, theme }) => {
//   const originalAmount = payment.originalAmount || payment.amount;
//   const discountAmount = payment.discountAmount || 0;
//   const paidAmount = payment.amount;

//   const getPlanStatus = () => {
//     if (payment.isCancelledByUser === true || payment.status === "cancelled") return { label: "Cancelled", color: "#ef4444" };
//     if (payment.status === "failed") return { label: "Failed", color: "#ef4444" };
//     if (payment.status === "pending") return { label: "Pending", color: "#eab308" };
//     if (payment.status === "completed" && payment.isExpired === true) return { label: "Expired", color: "#ef4444" };
//     if (payment.status === "completed" && payment.isActive === true && payment.isCancelledByUser === false) return { label: "Active", color: "#22c55e" };
//     return { label: "Unknown", color: "#6b7280" };
//   };

//   const getPaymentStatus = () => {
//     if (payment.status === "completed") return { label: "Completed", color: "#22c55e" };
//     if (payment.status === "pending") return { label: "Pending", color: "#eab308" };
//     if (payment.status === "cancelled") return { label: "Cancelled", color: "#ef4444" };
//     if (payment.status === "failed") return { label: "Failed", color: "#ef4444" };
//     return { label: payment.status || "Unknown", color: "#6b7280" };
//   };

//   const getExpiryDisplay = () => {
//     if (payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed" || payment.status === "pending") return "—";
//     if (!payment.expiresAt) return "—";
//     return moment(payment.expiresAt).format("DD MMM YYYY");
//   };

//   const planStatus = getPlanStatus();
//   const paymentStatus = getPaymentStatus();
//   const expiryDisplay = getExpiryDisplay();
//   const isWarning = payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed";

//   return (
//     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
//       <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1.5, cursor: "pointer", transition: "all 0.3s ease", bgcolor: isWarning ? alpha("#ef4444", 0.03) : "transparent", "&:hover": { boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`, borderColor: theme.palette.primary.main } }} >
//         <CardContent sx={{ p: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//             <Avatar sx={{ width: 44, height: 44, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
//               {payment.adminId?.name?.charAt(0) || <PersonIcon />}
//             </Avatar>
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="body1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>{payment.adminId?.name || "Unknown"}</Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>{payment.adminId?.email || ""}</Typography>
//             </Box>
//           </Box>
//           <Stack spacing={1}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Plan:</Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.75rem" }}>{payment.planId?.name || "Add On Plan"}</Typography>
//             </Box>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Original:</Typography>
//               <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>₹{originalAmount?.toLocaleString("en-IN") || 0}</Typography>
//             </Box>
//             {discountAmount > 0 && (
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Discount:</Typography>
//                 <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: "#22c55e" }}>-₹{discountAmount.toLocaleString("en-IN")}</Typography>
//               </Box>
//             )}
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Paid:</Typography>
//               <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: "success.main" }}>₹{paidAmount?.toLocaleString("en-IN") || 0}</Typography>
//             </Box>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Payment Status:</Typography>
//               <Chip label={paymentStatus.label} size="small" sx={{ bgcolor: alpha(paymentStatus.color, 0.1), color: paymentStatus.color, fontWeight: 600, fontSize: "0.6rem", height: 20 }} />
//             </Box>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Plan Status:</Typography>
//               <Chip label={planStatus.label} size="small" sx={{ bgcolor: alpha(planStatus.color, 0.1), color: planStatus.color, fontWeight: 600, fontSize: "0.6rem", height: 20 }} />
//             </Box>
//             <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                 <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 12 }} />
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>{moment(payment.createdAt).format("DD MMM YYYY")}</Typography>
//               </Box>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Expires: {expiryDisplay}</Typography>
//             </Box>
//           </Stack>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// // Empty State Component
// const EmptyState = ({ status, icon: Icon, theme }) => (
//   <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, textAlign: "center", border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//     <Icon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
//     <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: "0.9rem" }}>No {status.toLowerCase()} found</Typography>
//     <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>There are no {status.toLowerCase()} records to display.</Typography>
//   </Paper>
// );

// // ─────────────────────────────────────────────
// //  MAIN COMPONENT
// // ─────────────────────────────────────────────
// const ListUsers = () => {
//   const { adminId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

//   const { usersList = [], loading } = useSelector((state) => state.user || {});
//   const { historyLoading: allPaymentHistoryLoading } = useSelector((state) => state.payment || {});

//   const activeUsers = usersList.filter((u) => u.isActive);
//   const inactiveUsers = usersList.filter((u) => !u.isActive);

//   // Filter state variables
//   const [searchQuery, setSearchQuery] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
//   const [tempStartDate, setTempStartDate] = useState(null);
//   const [tempEndDate, setTempEndDate] = useState(null);
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [tabValue, setTabValue] = useState(0);

//   // Pagination state for Plan History (Backend Pagination)
//   const [allPayments, setAllPayments] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [totalPayments, setTotalPayments] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Filter functions for users (frontend only)
//   const getFilteredUsers = (users) => {
//     let filtered = [...users];
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(user =>
//         user.name?.toLowerCase().includes(query) ||
//         user.email?.toLowerCase().includes(query) ||
//         user.mobile_no?.includes(query)
//       );
//     }
//     if (startDate && endDate) {
//       filtered = filtered.filter(user => {
//         const userDate = new Date(user.lastStartTime || user.createdAt);
//         return userDate >= startDate && userDate <= endDate;
//       });
//     }
//     filtered.sort((a, b) => {
//       const dateA = new Date(a.lastStartTime || a.createdAt);
//       const dateB = new Date(b.lastStartTime || b.createdAt);
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     });
//     return filtered;
//   };

//   const filteredActiveUsers = getFilteredUsers(activeUsers);
//   const filteredInactiveUsers = getFilteredUsers(inactiveUsers);

//   // Reset and fetch payments from page 1
//   const resetAndFetchPayments = async () => {
//     setAllPayments([]);
//     setCurrentPage(1);
//     setHasMore(true);
//     await fetchPayments(1, true);
//   };

//   // Fetch payments from API with backend pagination
//   const fetchPayments = async (page, reset = false) => {
//     if (isLoadingMore) return;
//     if (!hasMore && !reset) return;

//     setIsLoadingMore(true);

//     try {
//       const result = await dispatch(getPaymentHistory({
//         adminId,
//         page,
//         limit: 10,
//         search: searchQuery,
//         startDate: startDate ? startDate.toISOString() : null,
//         endDate: endDate ? endDate.toISOString() : null,
//         sortOrder: sortOrder,
//       })).unwrap();

//       const newPayments = result.data || [];
//       const pagination = result.pagination;

//       setTotalPayments(pagination?.totalItems || 0);
//       setTotalPages(pagination?.totalPages || 0);

//       if (reset) {
//         setAllPayments(newPayments);
//       } else {
//         setAllPayments(prev => [...prev, ...newPayments]);
//       }

//       const currentTotal = reset ? newPayments.length : allPayments.length + newPayments.length;
//       setHasMore(currentTotal < (pagination?.totalItems || 0));
//       setCurrentPage(page);

//     } catch (error) {
//       console.error("Error fetching payments:", error);
//     } finally {
//       setIsLoadingMore(false);
//     }
//   };

//   // Load more payments (called by infinite scroll)
//   const loadMorePayments = () => {
//     if (!hasMore || isLoadingMore) return;
//     if (currentPage >= totalPages) return;
//     fetchPayments(currentPage + 1);
//   };

//   // Infinite scroll ref
//   const observerRef = useRef();
//   const lastPaymentRef = useCallback(node => {
//     if (isLoadingMore) return;
//     if (observerRef.current) observerRef.current.disconnect();
//     observerRef.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
//         loadMorePayments();
//       }
//     }, { threshold: 0.1, rootMargin: '100px' });
//     if (node) observerRef.current.observe(node);
//   }, [isLoadingMore, hasMore]);

//   // Search and Filter Handlers
//   const handleDateFilterClick = (event) => {
//     setTempStartDate(startDate);
//     setTempEndDate(endDate);
//     setDateFilterAnchor(event.currentTarget);
//   };

//   const handleDateFilterClose = () => setDateFilterAnchor(null);

//   const applyDateFilter = () => {
//     setStartDate(tempStartDate);
//     setEndDate(tempEndDate);
//     setDateFilterAnchor(null);
//     if (tabValue === 2) {
//       resetAndFetchPayments();
//     }
//   };

//   const clearDateFilter = () => {
//     setTempStartDate(null);
//     setTempEndDate(null);
//     setStartDate(null);
//     setEndDate(null);
//     setDateFilterAnchor(null);
//     if (tabValue === 2) {
//       resetAndFetchPayments();
//     }
//   };

//   const handleSortChange = () => {
//     const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
//     setSortOrder(newSortOrder);
//     if (tabValue === 2) {
//       resetAndFetchPayments();
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     if (tabValue === 2) {
//       resetAndFetchPayments();
//     }
//   };

//   // Fetch when tab changes to Plan History or filters change
//   useEffect(() => {
//     if (tabValue === 2 && adminId) {
//       resetAndFetchPayments();
//     }
//   }, [tabValue, adminId]);

//   // Initial users fetch
//   useEffect(() => {
//     if (adminId) {
//       dispatch(getAllUsers(adminId));
//     }
//   }, [adminId, dispatch]);

//   const handleTabChange = (_, newValue) => setTabValue(newValue);
//   const handleRowClick = (user) => navigate("/trackingdata", { state: { item: user } });
//   const handleViewPayment = (payment) => navigate("/admin/payment-details", { state: { payment } });
//   const handleBack = () => navigate(-1);

//   const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
//   const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

//   return (
//     <Box sx={{ minHeight: "100vh", background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)` }}>
//       {/* Header */}
//       <Paper elevation={0} sx={{ py: { xs: 1, md: 1.5 }, px: { xs: 1.5, md: 2.5 }, borderRadius: 0, borderBottom: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), bgcolor: "background.paper" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <IconButton onClick={handleBack} size="small" sx={{ color: theme.palette.primary.main, width: 32, height: 32, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
//             <ArrowBackIcon sx={{ fontSize: 18 }} />
//           </IconButton>
//           <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
//             Organization Users
//           </Typography>
//         </Box>
//       </Paper>

//       <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 3 } }}>
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           {/* Search and Filters */}
//           <motion.div variants={itemVariants}>
//             <Paper elevation={0} sx={{ p: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 2.5 }, borderRadius: { xs: 2, sm: 2.5 }, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//               <Grid container spacing={1.5} alignItems="center">
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     fullWidth
//                     placeholder="Search by name, email, or mobile..."
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     size="small"
//                     InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} /></InputAdornment>) }}
//                     sx={{ '& .MuiOutlinedInput-root': { borderRadius: { xs: 2, sm: 2.5 }, bgcolor: alpha(theme.palette.primary.main, 0.05), fontSize: { xs: '0.75rem', sm: '0.8rem' }, height: 40 } }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} md={6}>
//                   <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
//                     <Button variant="outlined" startIcon={<CalendarIcon sx={{ fontSize: 16 }} />} onClick={handleDateFilterClick} size="small" sx={{ borderColor: alpha(theme.palette.divider, 0.5), color: 'text.secondary', fontSize: { xs: '0.7rem', sm: '0.75rem' }, height: 36, '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main } }}>
//                       Date Filter
//                     </Button>
//                     {/* <Button variant="outlined" startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />} onClick={handleSortChange} size="small" sx={{ borderColor: alpha(theme.palette.divider, 0.5), color: 'text.secondary', fontSize: { xs: '0.7rem', sm: '0.75rem' }, height: 36, '&:hover': { borderColor: theme.palette.primary.main, color: theme.palette.primary.main } }}>
//                       {sortOrder === "asc" ? "Oldest First" : "Newest First"}
//                     </Button> */}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Paper>

//             {/* Date Filter Menu */}
//             <Menu anchorEl={dateFilterAnchor} open={Boolean(dateFilterAnchor)} onClose={handleDateFilterClose} PaperProps={{ sx: { p: 2, width: { xs: 280, sm: 320 }, borderRadius: { xs: 2, sm: 3 }, boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) } }}>
//               <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//                   <DatePicker label="Start Date" value={tempStartDate} onChange={setTempStartDate} slotProps={{ textField: { size: "small", fullWidth: true } }} />
//                   <DatePicker label="End Date" value={tempEndDate} onChange={setTempEndDate} slotProps={{ textField: { size: "small", fullWidth: true } }} />
//                   <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1 }}>
//                     <Button size="small" variant="contained" onClick={applyDateFilter} sx={{ fontSize: '0.7rem', textTransform: 'none', bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}>Apply</Button>
//                   </Box>
//                 </Box>
//               </LocalizationProvider>
//             </Menu>
//           </motion.div>

//           {/* Tabs */}
//           <motion.div variants={itemVariants}>
//             <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden" }}>
//               <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1), px: { xs: 1, md: 2 } }}>
//                 <Tabs value={tabValue} onChange={handleTabChange} variant={isMobile ? "fullWidth" : "standard"} sx={{ "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" }, minHeight: { xs: 42, md: 48 }, px: { xs: 1, md: 2 } }, "& .Mui-selected": { color: `${theme.palette.primary.main} !important` }, "& .MuiTabs-indicator": { bgcolor: theme.palette.primary.main } }}>
//                   <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}><ActiveIcon sx={{ color: "#22c55e", fontSize: { xs: 14, md: 16 } }} /><span>{isMobile ? "Active" : "Active Users"}</span><Chip label={filteredActiveUsers.length} size="small" sx={{ bgcolor: alpha("#22c55e", 0.1), color: "#22c55e", fontWeight: 600, fontSize: "0.55rem", height: 16 }} /></Box>} />
//                   <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}><InactiveIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 14, md: 16 } }} /><span>{isMobile ? "Inactive" : "Inactive Users"}</span><Chip label={filteredInactiveUsers.length} size="small" sx={{ bgcolor: alpha(theme.palette.text.secondary, 0.1), color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.55rem", height: 16 }} /></Box>} />
//                   <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}><HistoryIcon sx={{ color: theme.palette.info.main, fontSize: { xs: 14, md: 16 } }} /><span>{isMobile ? "History" : "Plan History"}</span>
//                     {/* <Chip label={totalPayments} size="small" sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main, fontWeight: 600, fontSize: "0.55rem", height: 16 }} /> */}
//                   </Box>} />
//                 </Tabs>
//               </Box>

//               {/* Tab Panels */}
//               {loading && tabValue !== 2 ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, md: 6 } }}><CircularProgress size={28} sx={{ color: theme.palette.primary.main }} /></Box>
//               ) : (
//                 <>
//                   <TabPanel value={tabValue} index={0}>
//                     {filteredActiveUsers.length === 0 ? <EmptyState status="active users" icon={PersonIcon} theme={theme} /> : isMobile ? (<Box sx={{ px: 1 }}>{filteredActiveUsers.map((user) => (<UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />))}</Box>) : (<UserTable users={filteredActiveUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} />)}
//                   </TabPanel>

//                   <TabPanel value={tabValue} index={1}>
//                     {filteredInactiveUsers.length === 0 ? <EmptyState status="inactive users" icon={PersonIcon} theme={theme} /> : isMobile ? (<Box sx={{ px: 1 }}>{filteredInactiveUsers.map((user) => (<UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />))}</Box>) : (<UserTable users={filteredInactiveUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} />)}
//                   </TabPanel>

//                   <TabPanel value={tabValue} index={2}>
//                     {isLoadingMore && allPayments.length === 0 ? (
//                       <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, md: 6 } }}><CircularProgress size={28} sx={{ color: theme.palette.primary.main }} /></Box>
//                     ) : allPayments.length === 0 ? (
//                       <EmptyState status="payment history" icon={HistoryIcon} theme={theme} />
//                     ) : isMobile ? (
//                       <Box sx={{ px: 1 }}>
//                         {allPayments.map((payment, idx) => (
//                           <div key={payment._id}>
//                             <PlanHistoryCard payment={payment} onViewPayment={handleViewPayment} theme={theme} />
//                             {idx === allPayments.length - 1 && hasMore && <div ref={lastPaymentRef} style={{ height: '20px' }} />}
//                           </div>
//                         ))}
//                         {isLoadingMore && <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size={24} sx={{ color: theme.palette.primary.main }} /></Box>}
//                         {!hasMore && allPayments.length > 0 && <Box sx={{ textAlign: 'center', py: 2 }}><Typography variant="caption" color="text.secondary">Showing all {totalPayments} records</Typography></Box>}
//                       </Box>
//                     ) : (
//                       <>
//                         <PlanHistoryTable payments={allPayments} onViewPayment={handleViewPayment} theme={theme} isMobile={isMobile} isTablet={isTablet} />
//                         {hasMore && (<Box ref={lastPaymentRef} sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>{isLoadingMore ? <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} /> : <Typography variant="body2" color="text.secondary">Scroll to load more...</Typography>}</Box>)}
//                         {!hasMore && allPayments.length > 0 && <Box sx={{ textAlign: 'center', py: 2 }}><Typography variant="caption" color="text.secondary">Showing all {totalPayments} records</Typography></Box>}
//                       </>
//                     )}
//                   </TabPanel>
//                 </>
//               )}
//             </Paper>
//           </motion.div>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default ListUsers;









//// With date filter clear
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Tab,
  Tabs,
  CircularProgress,
  alpha,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  Button,
  Menu,
} from "@mui/material";
import {
  Search as SearchIcon,
  Cancel as CancelIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Person as PersonIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import moment from "moment";

// TabPanel component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: { xs: 1.5, md: 2 } }}>{children}</Box>}
    </div>
  );
}

// Mobile Card View Component
const UserCard = ({ user, onCardClick, theme }) => {
  const getDisplayDate = () => {
    return user.lastStartTime || user.createdAt;
  };

  const displayDate = getDisplayDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          mb: 1.5,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
            borderColor: theme.palette.primary.main,
          },
        }}
        onClick={() => onCardClick(user)}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Avatar
              src={user.avtar}
              sx={{
                width: 44,
                height: 44,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: "2px solid",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              }}
            >
              {user.name?.charAt(0) || <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ fontSize: "0.9rem" }}>
                {user.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Chip
                  icon={user.isActive ? <ActiveIcon sx={{ fontSize: 12 }} /> : <InactiveIcon sx={{ fontSize: 12 }} />}
                  label={user.isActive ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
                    color: user.isActive ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    height: 18,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{user.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{user.mobile_no || "—"}</Typography>
            </Box>

            <Divider sx={{ my: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                  Last Tracking:
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem", fontWeight: 500 }}>
                {displayDate ? moment(displayDate).format('MMM D, YYYY') : 'N/A'}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Desktop Table View Component
const UserTable = ({ users, onRowClick, theme, isMobile, isTablet, sortOrder, onSortChange }) => {
  const getDisplayDate = (user) => {
    return user.lastStartTime || user.createdAt;
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: "3px",
        },
      }}
    >
      <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>#</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Profile</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Mobile</TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                color: theme.palette.primary.main,
                cursor: "pointer",
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
              onClick={onSortChange}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                Last Tracking Date
                {sortOrder === "asc" ? (
                  <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                ) : (
                  <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                )}
              </Box>
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => {
            const displayDate = getDisplayDate(user);
            return (
              <TableRow
                key={user._id}
                hover
                onClick={() => onRowClick(user)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                }}
              >
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, py: 1 }}>{index + 1}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Avatar
                    src={user.avtar}
                    sx={{
                      width: { xs: 32, sm: 35, md: 38 },
                      height: { xs: 32, sm: 35, md: 38 },
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }}
                  >
                    {user.name?.charAt(0) || <PersonIcon />}
                  </Avatar>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}>
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
                    {user.mobile_no || "—"}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.secondary" }}>
                    {displayDate ? moment(displayDate).format('MMM D, YYYY') : 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Tooltip title="View Tracking">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(user);
                      }}
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        width: { xs: 28, sm: 30 },
                        height: { xs: 28, sm: 30 },
                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                      }}
                    >
                      <VisibilityIcon sx={{ fontSize: { xs: 14, sm: 15 } }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Plan History Table Component
const PlanHistoryTable = ({ payments, onViewPayment, theme, isMobile, isTablet }) => {
  const getPlanStatus = (payment) => {
    if (payment.isCancelledByUser === true || payment.status === "cancelled") {
      return { label: "Cancelled", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
    }
    if (payment.status === "failed") {
      return { label: "Failed", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
    }
    if (payment.status === "pending") {
      return { label: "Pending", color: "#eab308", bg: alpha("#eab308", 0.1) };
    }
    if (payment.status === "completed" && payment.isExpired === true) {
      return { label: "Expired", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
    }
    if (payment.status === "completed" && payment.isActive === true && payment.isCancelledByUser === false) {
      return { label: "Active", color: "#22c55e", bg: alpha("#22c55e", 0.1) };
    }
    return { label: "Active", color: "#22c55e", bg: alpha("#22c55e", 0.1) };
  };

  const getPaymentStatusDisplay = (payment) => {
    if (payment.status === "completed") return { label: "Completed", color: "#22c55e", bg: alpha("#22c55e", 0.1) };
    if (payment.status === "pending") return { label: "Pending", color: "#eab308", bg: alpha("#eab308", 0.1) };
    if (payment.status === "cancelled") return { label: "Cancelled", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
    if (payment.status === "failed") return { label: "Failed", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
    return { label: payment.status || "Unknown", color: "#6b7280", bg: alpha("#6b7280", 0.1) };
  };

  const getExpiryDisplay = (payment) => {
    if (payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed" || payment.status === "pending") {
      return "—";
    }
    if (!payment.expiresAt) return "—";
    return moment(payment.expiresAt).format("DD MMM YYYY");
  };

  const getRemainingDaysDisplay = (payment) => {
    if (payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed" || payment.status === "pending") {
      return null;
    }
    if (payment.status === "completed" && payment.remainingDays > 0 && !payment.isExpired) {
      return (
        <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "success.main", display: "block" }}>
          {payment.remainingDays} days left
        </Typography>
      );
    }
    return null;
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: "3px",
        },
      }}
    >
      <Table sx={{ minWidth: isTablet ? 1000 : 1100 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>#</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>User</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Plan</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Original</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Discount</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Paid</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Payment Status</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Plan Status</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Payment Date</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: theme.palette.primary.main }}>Expires On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment, index) => {
            const originalAmount = payment.originalAmount || payment.amount;
            const discountAmount = payment.discountAmount || 0;
            const paidAmount = payment.amount;
            const planStatus = getPlanStatus(payment);
            const paymentStatus = getPaymentStatusDisplay(payment);
            const expiryDisplay = getExpiryDisplay(payment);
            const remainingDaysDisplay = getRemainingDaysDisplay(payment);
            const isWarning = payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed";

            return (
              <TableRow
                key={payment._id}
                hover
                sx={{
                  cursor: "pointer",
                  bgcolor: isWarning ? alpha("#ef4444", 0.03) : "transparent",
                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                }}
              >
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, py: 1 }}>{index + 1}</TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                      {payment.adminId?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 16 }} />}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}>
                        {payment.adminId?.name || "Unknown"}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
                        {payment.adminId?.email || ""}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, fontWeight: 500 }}>
                    {payment.planId?.name || "Add On Plan"}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>
                    ₹{originalAmount?.toLocaleString("en-IN") || 0}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  {discountAmount > 0 ? (
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "#22c55e" }}>
                      -₹{discountAmount.toLocaleString("en-IN")}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>—</Typography>
                  )}
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "success.main" }}>
                    ₹{paidAmount?.toLocaleString("en-IN") || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Chip label={paymentStatus.label} size="small" sx={{ bgcolor: paymentStatus.bg, color: paymentStatus.color, fontWeight: 600, fontSize: { xs: "0.6rem", sm: "0.65rem" }, height: { xs: 20, sm: 22 } }} />
                </TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Chip label={planStatus.label} size="small" sx={{ bgcolor: planStatus.bg, color: planStatus.color, fontWeight: 600, fontSize: { xs: "0.6rem", sm: "0.65rem" }, height: { xs: 20, sm: 22 } }} />
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.secondary" }}>
                    {moment(payment.createdAt).format("DD MMM YYYY")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.secondary" }}>
                    {expiryDisplay}
                  </Typography>
                  {remainingDaysDisplay}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Mobile Plan History Card View
const PlanHistoryCard = ({ payment, onViewPayment, theme }) => {
  const originalAmount = payment.originalAmount || payment.amount;
  const discountAmount = payment.discountAmount || 0;
  const paidAmount = payment.amount;

  const getPlanStatus = () => {
    if (payment.isCancelledByUser === true || payment.status === "cancelled") return { label: "Cancelled", color: "#ef4444" };
    if (payment.status === "failed") return { label: "Failed", color: "#ef4444" };
    if (payment.status === "pending") return { label: "Pending", color: "#eab308" };
    if (payment.status === "completed" && payment.isExpired === true) return { label: "Expired", color: "#ef4444" };
    if (payment.status === "completed" && payment.isActive === true && payment.isCancelledByUser === false) return { label: "Active", color: "#22c55e" };
    return { label: "Unknown", color: "#6b7280" };
  };

  const getPaymentStatus = () => {
    if (payment.status === "completed") return { label: "Completed", color: "#22c55e" };
    if (payment.status === "pending") return { label: "Pending", color: "#eab308" };
    if (payment.status === "cancelled") return { label: "Cancelled", color: "#ef4444" };
    if (payment.status === "failed") return { label: "Failed", color: "#ef4444" };
    return { label: payment.status || "Unknown", color: "#6b7280" };
  };

  const getExpiryDisplay = () => {
    if (payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed" || payment.status === "pending") return "—";
    if (!payment.expiresAt) return "—";
    return moment(payment.expiresAt).format("DD MMM YYYY");
  };

  const planStatus = getPlanStatus();
  const paymentStatus = getPaymentStatus();
  const expiryDisplay = getExpiryDisplay();
  const isWarning = payment.isCancelledByUser === true || payment.status === "cancelled" || payment.status === "failed";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1.5, cursor: "pointer", transition: "all 0.3s ease", bgcolor: isWarning ? alpha("#ef4444", 0.03) : "transparent", "&:hover": { boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`, borderColor: theme.palette.primary.main } }} >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Avatar sx={{ width: 44, height: 44, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
              {payment.adminId?.name?.charAt(0) || <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight={600} sx={{ fontSize: "0.9rem" }}>{payment.adminId?.name || "Unknown"}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>{payment.adminId?.email || ""}</Typography>
            </Box>
          </Box>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Plan:</Typography>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.75rem" }}>{payment.planId?.name || "Add On Plan"}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Original:</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>₹{originalAmount?.toLocaleString("en-IN") || 0}</Typography>
            </Box>
            {discountAmount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Discount:</Typography>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: "#22c55e" }}>-₹{discountAmount.toLocaleString("en-IN")}</Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Paid:</Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: "success.main" }}>₹{paidAmount?.toLocaleString("en-IN") || 0}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Payment Status:</Typography>
              <Chip label={paymentStatus.label} size="small" sx={{ bgcolor: alpha(paymentStatus.color, 0.1), color: paymentStatus.color, fontWeight: 600, fontSize: "0.6rem", height: 20 }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Plan Status:</Typography>
              <Chip label={planStatus.label} size="small" sx={{ bgcolor: alpha(planStatus.color, 0.1), color: planStatus.color, fontWeight: 600, fontSize: "0.6rem", height: 20 }} />
            </Box>
            <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 12 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>{moment(payment.createdAt).format("DD MMM YYYY")}</Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>Expires: {expiryDisplay}</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ status, icon: Icon, theme }) => (
  <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2, textAlign: "center", border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
    <Icon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
    <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: "0.9rem" }}>No {status.toLowerCase()} found</Typography>
    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>There are no {status.toLowerCase()} records to display.</Typography>
  </Paper>
);

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const ListUsers = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const { usersList = [], loading } = useSelector((state) => state.user || {});
  const { historyLoading: allPaymentHistoryLoading } = useSelector((state) => state.payment || {});

  const activeUsers = usersList.filter((u) => u.isActive);
  const inactiveUsers = usersList.filter((u) => !u.isActive);

  // Filter state variables
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [tabValue, setTabValue] = useState(0);

  // Pagination state for Plan History (Backend Pagination)
  const [allPayments, setAllPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filter functions for users (frontend only)
  const getFilteredUsers = (users) => {
    let filtered = [...users];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.mobile_no?.includes(query)
      );
    }
    if (startDate && endDate) {
      filtered = filtered.filter(user => {
        const userDate = new Date(user.lastStartTime || user.createdAt);
        return userDate >= startDate && userDate <= endDate;
      });
    }
    filtered.sort((a, b) => {
      const dateA = new Date(a.lastStartTime || a.createdAt);
      const dateB = new Date(b.lastStartTime || b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    return filtered;
  };

  const filteredActiveUsers = getFilteredUsers(activeUsers);
  const filteredInactiveUsers = getFilteredUsers(inactiveUsers);

  // Reset and fetch payments from page 1
  const resetAndFetchPayments = async () => {
    setAllPayments([]);
    setCurrentPage(1);
    setHasMore(true);
    await fetchPayments(1, true);
  };

  // Fetch payments from API with backend pagination
  const fetchPayments = async (page, reset = false) => {
    if (isLoadingMore) return;
    if (!hasMore && !reset) return;

    setIsLoadingMore(true);

    try {
      const result = await dispatch(getPaymentHistory({
        adminId,
        page,
        limit: 10,
        search: searchQuery,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        sortOrder: sortOrder,
      })).unwrap();

      const newPayments = result.data || [];
      const pagination = result.pagination;

      setTotalPayments(pagination?.totalItems || 0);
      setTotalPages(pagination?.totalPages || 0);

      if (reset) {
        setAllPayments(newPayments);
      } else {
        setAllPayments(prev => [...prev, ...newPayments]);
      }

      const currentTotal = reset ? newPayments.length : allPayments.length + newPayments.length;
      setHasMore(currentTotal < (pagination?.totalItems || 0));
      setCurrentPage(page);

    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Load more payments (called by infinite scroll)
  const loadMorePayments = () => {
    if (!hasMore || isLoadingMore) return;
    if (currentPage >= totalPages) return;
    fetchPayments(currentPage + 1);
  };

  // Infinite scroll ref
  const observerRef = useRef();
  const lastPaymentRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
        loadMorePayments();
      }
    }, { threshold: 0.1, rootMargin: '100px' });
    if (node) observerRef.current.observe(node);
  }, [isLoadingMore, hasMore]);

  // Search and Filter Handlers
  const handleDateFilterClick = (event) => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setDateFilterAnchor(event.currentTarget);
  };

  const handleDateFilterClose = () => setDateFilterAnchor(null);

  const applyDateFilter = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setDateFilterAnchor(null);
    if (tabValue === 2) {
      resetAndFetchPayments();
    }
  };

  const clearDateFilter = () => {
    setTempStartDate(null);
    setTempEndDate(null);
    setStartDate(null);
    setEndDate(null);
    setDateFilterAnchor(null);
    if (tabValue === 2) {
      resetAndFetchPayments();
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setStartDate(null);
    setEndDate(null);
    setTempStartDate(null);
    setTempEndDate(null);
    if (tabValue === 2) {
      resetAndFetchPayments();
    }
  };

  const handleSortChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (tabValue === 2) {
      resetAndFetchPayments();
    }
  };

  // Fetch when tab changes to Plan History or filters change
  useEffect(() => {
    if (tabValue === 2 && adminId) {
      resetAndFetchPayments();
    }
  }, [tabValue, adminId]);

  // Initial users fetch
  useEffect(() => {
    if (adminId) {
      dispatch(getAllUsers(adminId));
    }
  }, [adminId, dispatch]);

  const handleTabChange = (_, newValue) => setTabValue(newValue);
  const handleRowClick = (user) => navigate("/trackingdata", { state: { item: user } });
  const handleViewPayment = (payment) => navigate("/admin/payment-details", { state: { payment } });
  const handleBack = () => navigate(-1);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <Box sx={{ minHeight: "100vh", background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)` }}>
      {/* Header */}
      <Paper elevation={0} sx={{ py: { xs: 1, md: 1.5 }, px: { xs: 1.5, md: 2.5 }, borderRadius: 0, borderBottom: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), bgcolor: "background.paper" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton onClick={handleBack} size="small" sx={{ color: theme.palette.primary.main, width: 32, height: 32, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Organization Users
          </Typography>
        </Box>
      </Paper>

      <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 3 } }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.2, sm: 1.5 },
                mb: { xs: 2, sm: 2.5 },
                borderRadius: { xs: 2, sm: 2.5 },
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.1),
              }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                gap: { xs: 1.2, sm: 1.5 },
              }}>
                {/* Search Field - takes all available space */}
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Search by name, email, or mobile..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 18, sm: 20 } }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchQuery && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => setSearchQuery("")}
                            sx={{ p: 0.5 }}
                          >
                            <CancelIcon sx={{ fontSize: 16, color: theme.palette.text.secondary }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: { xs: 2, sm: 2.5 },
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        height: { xs: 42, sm: 46 },
                      },
                    }}
                  />
                </Box>

                {/* Buttons Row */}
                <Box sx={{
                  display: 'flex',
                  gap: 1,
                  flexShrink: 0,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                  alignItems: 'center',
                }}>
                  {(searchQuery || startDate || endDate) && (
                    <Button
                      variant="contained"
                      startIcon={<CancelIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                      onClick={clearAllFilters}
                      size="small"
                      sx={{
                        bgcolor: '#ef4444',
                        '&:hover': { bgcolor: '#dc2626' },
                        fontSize: { xs: '0.62rem', sm: '0.7rem' },
                        height: { xs: 36, sm: 38 },
                        px: { xs: 1.5, sm: 2 },
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    startIcon={<CalendarIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                    onClick={handleDateFilterClick}
                    size="small"
                    sx={{
                      borderColor: alpha(theme.palette.divider, 0.5),
                      color: 'text.secondary',
                      fontSize: { xs: '0.62rem', sm: '0.7rem' },
                      height: { xs: 36, sm: 38 },
                      px: { xs: 1.5, sm: 2 },
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Date Filter
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* Date Filter Menu - Updated with new styling */}
            <Menu
              anchorEl={dateFilterAnchor}
              open={Boolean(dateFilterAnchor)}
              onClose={handleDateFilterClose}
              PaperProps={{
                sx: {
                  p: 1.5,
                  width: { xs: 240, sm: 270 },
                  borderRadius: { xs: 2, sm: 2.5 },
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  minWidth: 180,
                }}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 0.5,
                        lineHeight: 1,
                        display: 'block',
                      }}
                    >
                      Start
                    </Typography>
                    <DatePicker
                      value={tempStartDate}
                      onChange={setTempStartDate}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          placeholder: "DD/MM/YYYY",
                          sx: {
                            '& .MuiInputBase-root': {
                              minHeight: '32px !important',
                              height: '32px !important',
                              fontSize: '0.75rem',
                              borderRadius: '6px',
                            },
                            '& .MuiInputBase-input': {
                              padding: '4px 8px !important',
                              fontSize: '0.75rem',
                            },
                            '& .MuiInputBase-input::placeholder': {
                              fontSize: '0.65rem !important',
                              opacity: 0.5,
                            },
                            '& fieldset': {
                              borderWidth: '1px',
                            }
                          }
                        },
                        inputAdornment: {
                          sx: {
                            '& .MuiSvgIcon-root': {
                              fontSize: '0.9rem',
                            },
                            '& button': {
                              padding: '2px',
                            }
                          }
                        },
                        popper: {
                          sx: {
                            '& .MuiDateCalendar-root': {
                              width: 240,
                              height: 'auto',
                            },
                            '& .MuiPickersCalendarHeader-root': {
                              paddingLeft: '8px',
                              paddingRight: '8px',
                            },
                            '& .MuiDayCalendar-weekDayLabel': {
                              width: 28,
                              height: 28,
                              fontSize: '0.65rem',
                            },
                            '& .MuiPickersDay-root': {
                              width: 28,
                              height: 28,
                              fontSize: '0.7rem',
                            },
                            '& .MuiDayCalendar-slideTransition': {
                              minHeight: 180,
                            },
                          }
                        }
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 0.5,
                        lineHeight: 1,
                        display: 'block',
                      }}
                    >
                      End
                    </Typography>
                    <DatePicker
                      value={tempEndDate}
                      onChange={setTempEndDate}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          placeholder: "DD/MM/YYYY",
                          sx: {
                            '& .MuiInputBase-root': {
                              minHeight: '32px !important',
                              height: '32px !important',
                              fontSize: '0.75rem',
                              borderRadius: '6px',
                            },
                            '& .MuiInputBase-input': {
                              padding: '4px 8px !important',
                              fontSize: '0.75rem',
                            },
                            '& .MuiInputBase-input::placeholder': {
                              fontSize: '0.65rem !important',
                              opacity: 0.5,
                            },
                            '& fieldset': {
                              borderWidth: '1px',
                            }
                          }
                        },
                        inputAdornment: {
                          sx: {
                            '& .MuiSvgIcon-root': {
                              fontSize: '0.9rem',
                            },
                            '& button': {
                              padding: '2px',
                            }
                          }
                        },
                        popper: {
                          sx: {
                            '& .MuiDateCalendar-root': {
                              width: 240,
                              height: 'auto',
                            },
                            '& .MuiPickersCalendarHeader-root': {
                              paddingLeft: '8px',
                              paddingRight: '8px',
                            },
                            '& .MuiDayCalendar-weekDayLabel': {
                              width: 28,
                              height: 28,
                              fontSize: '0.65rem',
                            },
                            '& .MuiPickersDay-root': {
                              width: 28,
                              height: 28,
                              fontSize: '0.7rem',
                            },
                            '& .MuiDayCalendar-slideTransition': {
                              minHeight: 180,
                            },
                          }
                        }
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 0.5 }}>

                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      onClick={applyDateFilter}
                      sx={{
                        fontSize: { xs: '0.78rem', sm: '0.75rem' },
                        fontWeight: 700,
                        py: { xs: 1.5, sm: 1.3 },
                        height: { xs: 42, sm: 40 },
                        lineHeight: 1,
                        textTransform: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                          boxShadow: '0 5px 14px rgba(0,0,0,0.22)',
                          transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.15s ease',
                      }}
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              </LocalizationProvider>
            </Menu>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden" }}>
              <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1), px: { xs: 1, md: 2 } }}>
                <Tabs value={tabValue} onChange={handleTabChange} variant={isMobile ? "fullWidth" : "standard"} sx={{ "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" }, minHeight: { xs: 42, md: 48 }, px: { xs: 1, md: 2 } }, "& .Mui-selected": { color: `${theme.palette.primary.main} !important` }, "& .MuiTabs-indicator": { bgcolor: theme.palette.primary.main } }}>
                  <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}><ActiveIcon sx={{ color: "#22c55e", fontSize: { xs: 14, md: 16 } }} /><span>{isMobile ? "Active" : "Active Users"}</span><Chip label={filteredActiveUsers.length} size="small" sx={{ bgcolor: alpha("#22c55e", 0.1), color: "#22c55e", fontWeight: 600, fontSize: "0.55rem", height: 16 }} /></Box>} />
                  <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}><InactiveIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 14, md: 16 } }} /><span>{isMobile ? "Inactive" : "Inactive Users"}</span><Chip label={filteredInactiveUsers.length} size="small" sx={{ bgcolor: alpha(theme.palette.text.secondary, 0.1), color: theme.palette.text.secondary, fontWeight: 600, fontSize: "0.55rem", height: 16 }} /></Box>} />
                  <Tab label={<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}><HistoryIcon sx={{ color: theme.palette.info.main, fontSize: { xs: 14, md: 16 } }} /><span>{isMobile ? "History" : "Plan History"}</span></Box>} />
                </Tabs>
              </Box>

              {/* Tab Panels */}
              {loading && tabValue !== 2 ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, md: 6 } }}><CircularProgress size={28} sx={{ color: theme.palette.primary.main }} /></Box>
              ) : (
                <>
                  <TabPanel value={tabValue} index={0}>
                    {filteredActiveUsers.length === 0 ? <EmptyState status="active users" icon={PersonIcon} theme={theme} /> : isMobile ? (<Box sx={{ px: 1 }}>{filteredActiveUsers.map((user) => (<UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />))}</Box>) : (<UserTable users={filteredActiveUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} sortOrder={sortOrder} onSortChange={handleSortChange} />)}
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    {filteredInactiveUsers.length === 0 ? <EmptyState status="inactive users" icon={PersonIcon} theme={theme} /> : isMobile ? (<Box sx={{ px: 1 }}>{filteredInactiveUsers.map((user) => (<UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />))}</Box>) : (<UserTable users={filteredInactiveUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} sortOrder={sortOrder} onSortChange={handleSortChange} />)}
                  </TabPanel>

                  <TabPanel value={tabValue} index={2}>
                    {isLoadingMore && allPayments.length === 0 ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, md: 6 } }}><CircularProgress size={28} sx={{ color: theme.palette.primary.main }} /></Box>
                    ) : allPayments.length === 0 ? (
                      <EmptyState status="payment history" icon={HistoryIcon} theme={theme} />
                    ) : isMobile ? (
                      <Box sx={{ px: 1 }}>
                        {allPayments.map((payment, idx) => (
                          <div key={payment._id}>
                            <PlanHistoryCard payment={payment} onViewPayment={handleViewPayment} theme={theme} />
                            {idx === allPayments.length - 1 && hasMore && <div ref={lastPaymentRef} style={{ height: '20px' }} />}
                          </div>
                        ))}
                        {isLoadingMore && <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><CircularProgress size={24} sx={{ color: theme.palette.primary.main }} /></Box>}
                        {!hasMore && allPayments.length > 0 && <Box sx={{ textAlign: 'center', py: 2 }}><Typography variant="caption" color="text.secondary">Showing all {totalPayments} records</Typography></Box>}
                      </Box>
                    ) : (
                      <>
                        <PlanHistoryTable payments={allPayments} onViewPayment={handleViewPayment} theme={theme} isMobile={isMobile} isTablet={isTablet} />
                        {hasMore && (<Box ref={lastPaymentRef} sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>{isLoadingMore ? <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} /> : <Typography variant="body2" color="text.secondary">Scroll to load more...</Typography>}</Box>)}
                        {!hasMore && allPayments.length > 0 && <Box sx={{ textAlign: 'center', py: 2 }}><Typography variant="caption" color="text.secondary">Showing all {totalPayments} records</Typography></Box>}
                      </>
                    )}
                  </TabPanel>
                </>
              )}
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ListUsers;