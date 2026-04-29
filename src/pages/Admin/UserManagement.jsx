// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Chip,
//   IconButton,
//   Button,
//   TextField,
//   InputAdornment,
//   Tab,
//   Tabs,
//   Avatar,
//   Menu,
//   Tooltip,
//   alpha,
//   Card,
//   CardContent,
//   Stack,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   CircularProgress,
//   Divider,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
//   Alert,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   Download as DownloadIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Visibility as VisibilityIcon,
//   CalendarToday as CalendarIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   GridView as GridViewIcon,
//   TableRows as TableRowsIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Login as LoginIcon,
//   ExitToApp as ExitToAppIcon,
// } from "@mui/icons-material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import moment from "moment";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import {
//   getAllAdmins,
//   deleteUser,
//   getUserById,
//   getUsersUnderAdmin,
//   checkUserSubscription,

// } from "../../redux/slices/userSlice";
// import {
//   impersonateUser,
//   stopImpersonation,
//   getImpersonationStatus,
// } from "../../redux/slices/authSlice";
// import {
//   getPaymentById
// } from "../../redux/slices/paymentSlice";
// import DeleteConfirmModal from "../../components/DeleteConfirmModal";
// import AddUserModal from "./component/AddUser";

// // Impersonation Banner Component
// const ImpersonationBanner = ({ onStopImpersonation, impersonatedUser }) => {
//   const theme = useTheme();

//   if (!impersonatedUser) return null;

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         position: 'fixed',
//         bottom: 20,
//         left: '50%',
//         transform: 'translateX(-50%)',
//         zIndex: 9999,
//         bgcolor: theme.palette.warning.main,
//         color: theme.palette.warning.contrastText,
//         borderRadius: 3,
//         p: 1.5,
//         display: 'flex',
//         alignItems: 'center',
//         gap: 2,
//         boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
//         border: '1px solid',
//         borderColor: alpha(theme.palette.warning.dark, 0.3),
//         maxWidth: { xs: '90%', sm: 'auto' },
//       }}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <LoginIcon sx={{ fontSize: 20 }} />
//         <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//           You are impersonating: <strong>{impersonatedUser.email}</strong>
//         </Typography>
//       </Box>
//       <Button
//         variant="contained"
//         size="small"
//         onClick={onStopImpersonation}
//         startIcon={<ExitToAppIcon />}
//         sx={{
//           bgcolor: theme.palette.warning.dark,
//           '&:hover': { bgcolor: theme.palette.warning.darker },
//           fontSize: { xs: '0.65rem', sm: '0.7rem' },
//           height: 30,
//         }}
//       >
//         Exit Impersonation
//       </Button>
//     </Paper>
//   );
// };

// // Skeleton Components
// const TableRowSkeleton = ({ isBulkMode, isMobile, isTablet, role_id }) => {
//   const theme = useTheme();
//   const isSuperAdmin = role_id === 2;

//   return (
//     <TableRow>
//       {isBulkMode && (
//         <TableCell padding="checkbox" sx={{ pl: 2 }}>
//           <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </TableCell>
//       )}
//       <TableCell>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
//           <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </TableCell>
//       {isSuperAdmin && (
//         <TableCell>
//           <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </TableCell>
//       )}
//       <TableCell>
//         <Skeleton variant="rounded" width={55} height={22} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={70} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </TableCell>
//       <TableCell align="right">
//         <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
//           <Skeleton variant="circular" width={26} height={26} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="circular" width={26} height={26} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           <Skeleton variant="circular" width={26} height={26} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         </Box>
//       </TableCell>
//     </TableRow>
//   );
// };

// const UserCardSkeleton = ({ isBulkMode, isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Grid item xs={12} sm={6} md={4}>
//       <Card
//         sx={{
//           borderRadius: 2.5,
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           height: '100%',
//         }}
//       >
//         <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//           {isBulkMode && (
//             <Box sx={{ mb: 1.5 }}>
//               <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//           )}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 1.5 }}>
//             <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="80%" height={22} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//           </Box>
//           <Stack spacing={1} sx={{ mb: 1.5 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="rounded" width={55} height={18} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//           </Stack>
//           <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//             <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };

// const TabPanelSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ py: 2 }}>
//       <Box sx={{ px: { xs: 1, sm: 1.5 } }}>
//         <Grid container spacing={{ xs: 1.5, sm: 2 }}>
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <Grid item xs={12} sm={6} md={4} key={item}>
//               <Skeleton
//                 variant="rounded"
//                 height={180}
//                 sx={{ borderRadius: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

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
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// const TabsSkeleton = ({ isMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: { xs: 2, sm: 2.5 },
//         border: '1px solid',
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         overflow: 'hidden',
//       }}
//     >
//       <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1), p: 1.5 }}>
//         <Box sx={{ display: 'flex', gap: 1.5 }}>
//           <Skeleton variant="rounded" width={isMobile ? 90 : 130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="rounded" width={isMobile ? 90 : 130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Box>
//       </Box>
//       <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
//         <TabPanelSkeleton />
//       </Box>
//     </Paper>
//   );
// };

// const UserCard = ({
//   user,
//   onView,
//   onEdit,
//   onDelete,
//   onImpersonate,
//   isSelected,
//   onSelect,
//   isBulkMode,
//   role_id,
//   isDeleting,
//   isMobile,
//   isSubscriptionExpired,
// }) => {
//   const theme = useTheme();
//   const isSuperAdmin = role_id === 2;
//   const isLoggedInAdmin = role_id === 1;
//   const isSubAdmin = user.role_id === 3;
//   const showSBBadge = isSubAdmin;
//   const userId = user._id || user.id;
//   const userName = user.name || user.name;
//   const userEmail = user.email;
//   const userMobile = user.mobile_no;
//   const userIsActive = user.isActive;
//   const userCreatedAt = user.createdAt || user.registeredDate || user.createdAt;
//   const userAvatar = user.avtar || user.profileImage;

//   // Handle card click with proper event propagation
//   const handleCardClick = (event) => {
//     // Check if the click target or its parent is an interactive element
//     const target = event.target;
//     const isInteractive = target.closest('button, a, input, [role="button"], .MuiIconButton-root, .MuiButtonBase-root, .MuiCheckbox-root');

//     // Don't trigger view if clicking on action buttons, checkbox, or other interactive elements
//     if (!isInteractive) {
//       onView(user);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.3 }}
//       style={{ height: '100%' }}
//     >
//       <Card
//         sx={{
//           cursor: 'pointer',
//           position: 'relative',
//           borderRadius: 2,
//           border: '1px solid',
//           borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
//           boxShadow: isSelected ? `0 4px 12px -4px ${alpha(theme.palette.primary.main, 0.5)}` : '0 1px 4px rgba(0,0,0,0.03)',
//           transition: 'all 0.2s ease',
//           height: '100%',
//           '&:hover': {
//             transform: !isMobile ? 'translateY(-2px)' : 'none',
//             boxShadow: !isMobile ? `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
//             borderColor: theme.palette.primary.main,
//           },
//         }}
//         onClick={handleCardClick}
//       >
//         {isBulkMode && (
//           <Box sx={{ position: 'absolute', top: 6, left: 6, zIndex: 1 }}>
//             <Checkbox
//               checked={isSelected}
//               onChange={() => onSelect(userId)}
//               onClick={(e) => e.stopPropagation()} // Prevent card click when clicking checkbox
//               size="small"
//               sx={{
//                 color: theme.palette.primary.main,
//                 '&.Mui-checked': {
//                   color: theme.palette.primary.main,
//                 },
//                 padding: '4px',
//               }}
//             />
//           </Box>
//         )}
//         <CardContent sx={{ p: { xs: 1.5, sm: 1.75 } }}>
//           {/* User Info Row - Removed onClick from here since it's now on Card */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.25, sm: 1.5 }, mb: 1.5 }}>
//             <Avatar
//               src={userAvatar}
//               sx={{
//                 width: { xs: 40, sm: 44 },
//                 height: { xs: 40, sm: 44 },
//                 flexShrink: 0,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 border: '1.5px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.2),
//                 fontSize: { xs: '0.9rem', sm: '1rem' },
//               }}
//             >
//               {userName?.charAt(0) || 'U'}
//             </Avatar>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, height: 20, overflow: 'hidden' }}>
//                 <Typography
//                   variant="body2"
//                   fontWeight={600}
//                   color="text.primary"
//                   sx={{
//                     fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     flexShrink: 1,
//                     minWidth: 0,
//                   }}
//                 >
//                   {userName}
//                 </Typography>
//                 {showSBBadge && (
//                   <Chip
//                     label="SB"
//                     size="small"
//                     sx={{
//                       bgcolor: alpha('#22c55e', 0.15),
//                       color: '#22c55e',
//                       fontWeight: 700,
//                       fontSize: '0.6rem',
//                       height: 18,
//                       flexShrink: 0,
//                       '& .MuiChip-label': {
//                         px: 0.75,
//                       },
//                     }}
//                   />
//                 )}
//               </Box>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{
//                   fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                   display: 'block',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   mb: 0.25,
//                 }}
//               >
//                 {userEmail}
//               </Typography>
//               {isSuperAdmin && userMobile && (
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   sx={{
//                     fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                     display: 'block',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {userMobile}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//           {/* Status and Joined Info */}
//           <Box
//             sx={{
//               p: { xs: 1, sm: 1.25 },
//               mb: 1.25,
//             }}
//           >
//             <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.primary.main, 0.08) }} />
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.75 }}>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{
//                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                   fontWeight: 500,
//                   letterSpacing: 0.3,
//                 }}
//               >
//                 Joined
//               </Typography>
//               <Typography
//                 variant="caption"
//                 fontWeight={600}
//                 color="text.primary"
//                 sx={{
//                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                   letterSpacing: 0.2,
//                 }}
//               >
//                 {moment(userCreatedAt).format("MMM D, YYYY")}
//               </Typography>
//             </Box>
//           </Box>
//           {/* Action Buttons */}
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
//             <Tooltip title="View Details">
//               <span>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click
//                     onView(user);
//                   }}
//                   disabled={role_id === 1 && isSubscriptionExpired === true}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                     width: 28,
//                     height: 28,
//                     opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                   }}
//                 >
//                   <VisibilityIcon sx={{ fontSize: 16 }} />
//                 </IconButton>
//               </span>
//             </Tooltip>
//             {/* Impersonate button - only for super admin */}
//             {isSuperAdmin && (
//               <Tooltip title="Login as User">
//                 <span>
//                   <IconButton
//                     size="small"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent card click
//                       onImpersonate(user);
//                     }}
//                     sx={{
//                       color: theme.palette.secondary.main,
//                       '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.1) },
//                       width: 28,
//                       height: 28,
//                     }}
//                   >
//                     <LoginIcon sx={{ fontSize: 16 }} />
//                   </IconButton>
//                 </span>
//               </Tooltip>
//             )}
//             <Tooltip title="Edit">
//               <span>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click
//                     onEdit(user);
//                   }}
//                   disabled={role_id === 1 && isSubscriptionExpired === true}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                     width: 28,
//                     height: 28,
//                     opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                   }}
//                 >
//                   <EditIcon sx={{ fontSize: 16 }} />
//                 </IconButton>
//               </span>
//             </Tooltip>
//             <Tooltip title="Delete">
//               <span>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click
//                     onDelete(user);
//                   }}
//                   disabled={isDeleting || (role_id === 1 && isSubscriptionExpired === true)}
//                   sx={{
//                     color: '#ef4444',
//                     '&:hover': { bgcolor: alpha('#ef4444', 0.1) },
//                     width: 28,
//                     height: 28,
//                     opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                   }}
//                 >
//                   {isDeleting ? <CircularProgress size={12} /> : <DeleteIcon sx={{ fontSize: 16 }} />}
//                 </IconButton>
//               </span>
//             </Tooltip>
//           </Box>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };


// // const ResponsiveTable = ({
// //   users,
// //   isBulkMode,
// //   selectedUsers,
// //   handleSelectUser,
// //   handleSelectAll,
// //   handleView,
// //   handleEdit,
// //   handleDeleteClick,
// //   handleImpersonate,
// //   sortOrder,
// //   onSort,
// //   page,
// //   rowsPerPage,
// //   onPageChange,
// //   onRowsPerPageChange,
// //   totalCount,
// //   isMobile,
// //   isTablet,
// //   loading,
// //   role_id,
// //   isSubscriptionExpired,
// //   isDeleting,
// // }) => {
// //   const theme = useTheme();
// //   const isSuperAdmin = role_id === 2;
// //   const isLoggedInAdmin = role_id === 1;

// //   // Handle row click with proper event propagation
// //   const handleRowClick = (user, event) => {
// //     // Check if the click target or its parent is an interactive element
// //     const target = event.target;
// //     const isInteractive = target.closest('button, a, input, [role="button"], .MuiIconButton-root, .MuiButtonBase-root');

// //     // Don't trigger view if clicking on action buttons, checkbox, or other interactive elements
// //     if (!isInteractive) {
// //       handleView(user);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <TableContainer sx={{
// //         overflowX: 'auto',
// //         '&::-webkit-scrollbar': { height: '6px' },
// //         '&::-webkit-scrollbar-thumb': {
// //           backgroundColor: alpha(theme.palette.primary.main, 0.3),
// //           borderRadius: '3px',
// //         },
// //       }}>
// //         <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
// //           <TableHead>
// //             <TableRow>
// //               {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
// //               <TableCell>Name</TableCell>
// //               <TableCell>Email</TableCell>
// //               {isSuperAdmin && <TableCell>Mobile No</TableCell>}
// //               <TableCell>Joined Date</TableCell>
// //               <TableCell align="right">Actions</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {[1, 2, 3, 4, 5].map((item) => (
// //               <TableRowSkeleton
// //                 key={item}
// //                 isBulkMode={isBulkMode}
// //                 isMobile={isMobile}
// //                 isTablet={isTablet}
// //                 role_id={role_id}
// //               />
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     );
// //   }

// //   return (
// //     <TableContainer sx={{
// //       overflowX: 'auto',
// //       '&::-webkit-scrollbar': { height: '6px' },
// //       '&::-webkit-scrollbar-thumb': {
// //         backgroundColor: alpha(theme.palette.primary.main, 0.3),
// //         borderRadius: '3px',
// //       },
// //     }}>
// //       <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
// //         <TableHead>
// //           <TableRow>
// //             {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
// //             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
// //               Name
// //             </TableCell>
// //             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
// //               Email
// //             </TableCell>
// //             {isSuperAdmin && (
// //               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
// //                 Mobile No
// //               </TableCell>
// //             )}
// //             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
// //                 Joined Date
// //                 {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
// //               </Box>
// //             </TableCell>
// //             <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
// //               Actions
// //             </TableCell>
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           <AnimatePresence>
// //             {(users || []).map((user) => {
// //               const isSubAdmin = user.role_id === 3;
// //               const showSBBadge = isSubAdmin;

// //               return (
// //                 <motion.tr
// //                   key={user._id || user.id}
// //                   initial={{ opacity: 0 }}
// //                   animate={{ opacity: 1 }}
// //                   exit={{ opacity: 0 }}
// //                   transition={{ duration: 0.2 }}
// //                   style={{ cursor: 'pointer' }}
// //                   onClick={(event) => handleRowClick(user, event)}
// //                   onMouseEnter={(e) => {
// //                     if (!isMobile) {
// //                       e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
// //                     }
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     if (!isMobile) {
// //                       e.currentTarget.style.backgroundColor = 'transparent';
// //                     }
// //                   }}
// //                 >
// //                   {isBulkMode && (
// //                     <TableCell padding="checkbox" sx={{ pl: 2 }}>
// //                       <Checkbox
// //                         checked={selectedUsers.includes(user._id || user.id)}
// //                         onChange={() => handleSelectUser(user._id || user.id)}
// //                         size="small"
// //                         sx={{ color: theme.palette.primary.main }}
// //                         onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
// //                       />
// //                     </TableCell>
// //                   )}
// //                   <TableCell>
// //                     <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
// //                       <Avatar
// //                         src={user.avtar || user.profileImage}
// //                         sx={{
// //                           width: { xs: 28, sm: 32 },
// //                           height: { xs: 28, sm: 32 },
// //                           bgcolor: alpha(theme.palette.primary.main, 0.1),
// //                           color: theme.palette.primary.main,
// //                         }}
// //                       >
// //                         {(user.name || user.name)?.charAt(0)}
// //                       </Avatar>
// //                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
// //                         <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.85rem' }, color: 'text.primary' }}>
// //                           {user.name || user.name}
// //                         </Typography>
// //                         {showSBBadge && (
// //                           <Chip
// //                             label="SB"
// //                             size="small"
// //                             sx={{
// //                               bgcolor: alpha('#22c55e', 0.15),
// //                               color: '#22c55e',
// //                               fontWeight: 700,
// //                               fontSize: '0.55rem',
// //                               height: 16,
// //                               '& .MuiChip-label': {
// //                                 px: 0.5,
// //                               },
// //                             }}
// //                           />
// //                         )}
// //                       </Box>
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
// //                     {user.email}
// //                   </TableCell>
// //                   {isSuperAdmin && (
// //                     <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
// //                       {user.mobile_no}
// //                     </TableCell>
// //                   )}
// //                   <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.75rem' }, color: 'text.secondary' }}>
// //                     {moment(user.createdAt || user.registeredDate || user.createdAt).format('MMM D, YYYY')}
// //                   </TableCell>
// //                   <TableCell align="right">
// //                     <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
// //                       <Tooltip title="View">
// //                         <span>
// //                           <IconButton
// //                             size="small"
// //                             onClick={(e) => {
// //                               e.stopPropagation(); // Prevent row click
// //                               handleView(user);
// //                             }}
// //                             disabled={role_id === 1 && isSubscriptionExpired === true}
// //                             sx={{
// //                               color: theme.palette.primary.main,
// //                               width: 26,
// //                               height: 26,
// //                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
// //                             }}
// //                           >
// //                             <VisibilityIcon sx={{ fontSize: 14 }} />
// //                           </IconButton>
// //                         </span>
// //                       </Tooltip>

// //                       {/* Impersonate button - only for super admin */}
// //                       {isSuperAdmin && (
// //                         <Tooltip title="Login as User">
// //                           <IconButton
// //                             size="small"
// //                             onClick={(e) => {
// //                               e.stopPropagation(); // Prevent row click
// //                               handleImpersonate(user);
// //                             }}
// //                             sx={{
// //                               color: theme.palette.secondary.main,
// //                               width: 26,
// //                               height: 26,
// //                               '&:hover': {
// //                                 bgcolor: alpha(theme.palette.secondary.main, 0.1)
// //                               }
// //                             }}
// //                           >
// //                             <LoginIcon sx={{ fontSize: 14 }} />
// //                           </IconButton>
// //                         </Tooltip>
// //                       )}

// //                       <Tooltip title="Edit">
// //                         <span>
// //                           <IconButton
// //                             size="small"
// //                             onClick={(e) => {
// //                               e.stopPropagation(); // Prevent row click
// //                               handleEdit(user);
// //                             }}
// //                             disabled={role_id === 1 && isSubscriptionExpired === true}
// //                             sx={{
// //                               color: theme.palette.primary.main,
// //                               width: 26,
// //                               height: 26,
// //                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
// //                             }}
// //                           >
// //                             <EditIcon sx={{ fontSize: 14 }} />
// //                           </IconButton>
// //                         </span>
// //                       </Tooltip>

// //                       <Tooltip title="Delete">
// //                         <span>
// //                           <IconButton
// //                             size="small"
// //                             onClick={(e) => {
// //                               e.stopPropagation(); // Prevent row click
// //                               handleDeleteClick(user);
// //                             }}
// //                             disabled={isDeleting || (role_id === 1 && isSubscriptionExpired === true)}
// //                             sx={{
// //                               color: '#ef4444',
// //                               width: 26,
// //                               height: 26,
// //                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
// //                             }}
// //                           >
// //                             <DeleteIcon sx={{ fontSize: 14 }} />
// //                           </IconButton>
// //                         </span>
// //                       </Tooltip>
// //                     </Box>
// //                   </TableCell>
// //                 </motion.tr>
// //               );
// //             })}
// //           </AnimatePresence>
// //         </TableBody>
// //       </Table>
// //     </TableContainer>
// //   );
// // };

// const ResponsiveTable = ({
//   users,
//   isBulkMode,
//   selectedUsers,
//   handleSelectUser,
//   handleSelectAll,
//   handleView,
//   handleEdit,
//   handleDeleteClick,
//   handleImpersonate,
//   sortOrder,
//   onSort,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   totalCount,
//   isMobile,
//   isTablet,
//   loading,
//   role_id,
//   isSubscriptionExpired,
//   isDeleting,
// }) => {
//   const theme = useTheme();
//   const isSuperAdmin = role_id === 2;
//   const isLoggedInAdmin = role_id === 1;

//   // Handle row click with proper event propagation
//   const handleRowClick = (user, event) => {
//     // Check if the click target or its parent is an interactive element
//     const target = event.target;
//     const isInteractive = target.closest('button, a, input, [role="button"], .MuiIconButton-root, .MuiButtonBase-root');

//     // Don't trigger view if clicking on action buttons, checkbox, or other interactive elements
//     if (!isInteractive) {
//       handleView(user);
//     }
//   };

//   if (loading) {
//     return (
//       <TableContainer sx={{
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': { height: '6px' },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//           <TableHead>
//             <TableRow>
//               {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               {isSuperAdmin && <TableCell>Mobile No</TableCell>}
//               <TableCell>Joined Date</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {[1, 2, 3, 4, 5].map((item) => (
//               <TableRowSkeleton
//                 key={item}
//                 isBulkMode={isBulkMode}
//                 isMobile={isMobile}
//                 isTablet={isTablet}
//                 role_id={role_id}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }

//   // Check if no users available
//   if (!users || users.length === 0) {
//     return (
//       <TableContainer sx={{
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': { height: '6px' },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//           <TableHead>
//             <TableRow>
//               {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Name
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Email
//               </TableCell>
//               {isSuperAdmin && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                   Mobile No
//                 </TableCell>
//               )}
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
//                   Joined Date
//                   {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
//                 </Box>
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell 
//                 colSpan={isSuperAdmin ? 5 : 4} 
//                 align="center"
//                 sx={{
//                   py: 8,
//                   backgroundColor: alpha(theme.palette.primary.main, 0.02),
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: 2,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: '50%',
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <svg
//                       width="40"
//                       height="40"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
//                         fill={theme.palette.primary.main}
//                         opacity="0.6"
//                       />
//                     </svg>
//                   </Box>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: theme.palette.text.primary,
//                       fontWeight: 500,
//                       fontSize: { xs: '1rem', sm: '1.1rem' },
//                     }}
//                   >
//                     You have 0 users
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       maxWidth: '300px',
//                       textAlign: 'center',
//                     }}
//                   >
//                     No users found. Users will appear here once they are added.
//                   </Typography>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }

//   return (
//     <TableContainer sx={{
//       overflowX: 'auto',
//       '&::-webkit-scrollbar': { height: '6px' },
//       '&::-webkit-scrollbar-thumb': {
//         backgroundColor: alpha(theme.palette.primary.main, 0.3),
//         borderRadius: '3px',
//       },
//     }}>
//       <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//         <TableHead>
//           <TableRow>
//             {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Name
//             </TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Email
//             </TableCell>
//             {isSuperAdmin && (
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Mobile No
//               </TableCell>
//             )}
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
//                 Joined Date
//                 {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
//               </Box>
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Actions
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <AnimatePresence>
//             {(users || []).map((user) => {
//               const isSubAdmin = user.role_id === 3;
//               const showSBBadge = isSubAdmin;

//               return (
//                 <motion.tr
//                   key={user._id || user.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   style={{ cursor: 'pointer' }}
//                   onClick={(event) => handleRowClick(user, event)}
//                   onMouseEnter={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.backgroundColor = 'transparent';
//                     }
//                   }}
//                 >
//                   {isBulkMode && (
//                     <TableCell padding="checkbox" sx={{ pl: 2 }}>
//                       <Checkbox
//                         checked={selectedUsers.includes(user._id || user.id)}
//                         onChange={() => handleSelectUser(user._id || user.id)}
//                         size="small"
//                         sx={{ color: theme.palette.primary.main }}
//                         onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
//                       />
//                     </TableCell>
//                   )}
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
//                       <Avatar
//                         src={user.avtar || user.profileImage}
//                         sx={{
//                           width: { xs: 28, sm: 32 },
//                           height: { xs: 28, sm: 32 },
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                         }}
//                       >
//                         {(user.name || user.name)?.charAt(0)}
//                       </Avatar>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                         <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.85rem' }, color: 'text.primary' }}>
//                           {user.name || user.name}
//                         </Typography>
//                         {showSBBadge && (
//                           <Chip
//                             label="SB"
//                             size="small"
//                             sx={{
//                               bgcolor: alpha('#22c55e', 0.15),
//                               color: '#22c55e',
//                               fontWeight: 700,
//                               fontSize: '0.55rem',
//                               height: 16,
//                               '& .MuiChip-label': {
//                                 px: 0.5,
//                               },
//                             }}
//                           />
//                         )}
//                       </Box>
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
//                     {user.email}
//                   </TableCell>
//                   {isSuperAdmin && (
//                     <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
//                       {user.mobile_no}
//                     </TableCell>
//                   )}
//                   <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.75rem' }, color: 'text.secondary' }}>
//                     {moment(user.createdAt || user.registeredDate || user.createdAt).format('MMM D, YYYY')}
//                   </TableCell>
//                   <TableCell align="right">
//                     <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
//                       <Tooltip title="View">
//                         <span>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleView(user);
//                             }}
//                             disabled={role_id === 1 && isSubscriptionExpired === true}
//                             sx={{
//                               color: theme.palette.primary.main,
//                               width: 26,
//                               height: 26,
//                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                             }}
//                           >
//                             <VisibilityIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </span>
//                       </Tooltip>

//                       {/* Impersonate button - only for super admin */}
//                       {isSuperAdmin && (
//                         <Tooltip title="Login as User">
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleImpersonate(user);
//                             }}
//                             sx={{
//                               color: theme.palette.secondary.main,
//                               width: 26,
//                               height: 26,
//                               '&:hover': {
//                                 bgcolor: alpha(theme.palette.secondary.main, 0.1)
//                               }
//                             }}
//                           >
//                             <LoginIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </Tooltip>
//                       )}

//                       <Tooltip title="Edit">
//                         <span>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleEdit(user);
//                             }}
//                             disabled={role_id === 1 && isSubscriptionExpired === true}
//                             sx={{
//                               color: theme.palette.primary.main,
//                               width: 26,
//                               height: 26,
//                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                             }}
//                           >
//                             <EditIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </span>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <span>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleDeleteClick(user);
//                             }}
//                             disabled={isDeleting || (role_id === 1 && isSubscriptionExpired === true)}
//                             sx={{
//                               color: '#ef4444',
//                               width: 26,
//                               height: 26,
//                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                             }}
//                           >
//                             <DeleteIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </span>
//                       </Tooltip>
//                     </Box>
//                   </TableCell>
//                 </motion.tr>
//               );
//             })}
//           </AnimatePresence>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };
// const UserManagement = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   // Modal state
//   const [addUserModalOpen, setAddUserModalOpen] = useState(false);
//   const [editingUserData, setEditingUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
//   const [dataFetched, setDataFetched] = useState(false);
//   const [fetchError, setFetchError] = useState(null);

//   const [tabValue, setTabValue] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [isBulkMode, setIsBulkMode] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showLimitModal, setShowLimitModal] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Impersonation state
//   const [impersonating, setImpersonating] = useState(false);
//   const [impersonatedUser, setImpersonatedUser] = useState(null);

//   // Get auth state from Redux
//   const auth = useSelector((state) => state.auth);
//   const { isImpersonating, user: authUser } = auth;

//   // Get user state from Redux
//   const userState = useSelector((state) => state.user || {});
//   const userData = userState.userInfo || {};

//   // Function to get user data - ALWAYS check localStorage first (critical for impersonation)
//   const getUserData = useCallback(() => {
//     // First check localStorage directly (this is crucial for impersonation)
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         // console.log('User from localStorage:', parsedUser); // Debug log
//         return parsedUser;
//       } catch (e) {
//         console.error('Error parsing stored user:', e);
//       }
//     }

//     // Fallback to Redux state
//     if (userData?._id) {
//       return userData;
//     }
//     if (auth?.user?._id) {
//       return auth.user;
//     }

//     return null;
//   }, [userData, auth]);

//   // Function to get role_id - always from localStorage first
//   const getRoleId = useCallback(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         return parsedUser?.role_id || 1;
//       } catch (e) {
//         console.error('Error parsing stored user for role:', e);
//       }
//     }
//     return auth?.user?.role_id || userData?.role_id || 1;
//   }, [auth?.user?.role_id, userData?.role_id]);

//   const role_id = getRoleId();

//   // Get users based on role
//   const usersList = useSelector((state) => {
//     if (role_id === 2) {
//       return state.user?.adminList || [];
//     } else {
//       return state.user?.adminUsersList || [];
//     }
//   });

//   const totalUsers = useSelector((state) => {
//     if (role_id === 2) {
//       return state.user?.adminList?.length || 0;
//     } else {
//       return state.user?.adminUsersPagination?.totalUsers || 0;
//     }
//   });




//   const loading = useSelector((state) => state.user?.loading || false);
//   const currentUser = getUserData();

//   // Use organization data from Redux if available (fetched via getUserById(adminId) for sub-admins)
//   const orgData = (Number(role_id) === 3 && userData?._id) ? userData : currentUser;

//   const subscriptionExpiry = orgData?.currentPaymentId?.expiresAt || orgData?.currentPaymentId?.expiryDate;
//   const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());


//   const [maxUser, setMaxUser] = useState(null);
//   const [isLoadingPayment, setIsLoadingPayment] = useState(false);

//   useEffect(() => {
//     const fetchPaymentData = async () => {
//       const user = getUserData();
//       const isSubAdmin = Number(user?.role_id) === 3;

//       // For sub-admins, if userData (from Redux) is populated with the admin's info, use it.
//       // Otherwise, fallback to the current user's paymentId (for primary admins).
//       const targetUser = (isSubAdmin && userData?._id) ? userData : user;
//       const paymentId = targetUser?.currentPaymentId;

//       if (paymentId && typeof paymentId === 'string') {
//         setIsLoadingPayment(true);  
//         try {
//           const result = await dispatch(getPaymentById(paymentId)).unwrap();
//           const maxUserValue = result?.data?.maxUser || result?.maxUser;
//           setMaxUser(maxUserValue);
//         } catch (error) {
//           // console.error("Error fetching payment data:", error);
//           setMaxUser(null);
//         } finally {
//           setIsLoadingPayment(false);
//         }
//       } else {
//         // If paymentId is not a string (maybe it's already an object with maxUser)
//         if (paymentId && typeof paymentId === 'object' && (paymentId.maxUser || paymentId.userLimit)) {
//           setMaxUser(paymentId.maxUser || paymentId.userLimit);
//         } else {
//           setMaxUser(null);
//         }
//       }
//     };

//     fetchPaymentData();
//   }, [dispatch, getUserData, currentUser?._id, userData?._id]);



//   // Read filter from URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const filter = params.get('filter');
//     if (filter === 'active') {
//       setTabValue(0);
//     } else if (filter === 'inactive') {
//       setTabValue(1);
//     }
//   }, [location.search]);

//   // Check impersonation status on mount
//   useEffect(() => {
//     if (isImpersonating) {
//       setImpersonating(true);
//       setImpersonatedUser(authUser);
//     }
//   }, [isImpersonating, authUser]);

//   // First render loader
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Fetch data
//   const fetchAllData = useCallback(async () => {
//     const user = getUserData();
//     const userId = user?._id || user?.id; // Ensure we get the ID

//     // console.log("Fetching data for user:", user);
//     // console.log("User ID:", userId);

//     if (!userId) {
//       // console.log("No user ID available");
//       setIsLoading(false);
//       setFetchError("User data not available");
//       return;
//     }

//     setIsRefreshing(true);
//     setFetchError(null);

//     try {
//       const isSubAdmin = Number(role_id) === 3;
//       const rawAdminId = user?.adminId;
//       const effectiveAdminId = isSubAdmin
//         ? (typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId)
//         : (user?._id || user?.id);

//       if (role_id === 1 || role_id === 3) {
//         await Promise.all([
//           // If sub-admin, fetch the parent admin's info to get plan details
//           dispatch(getUserById(effectiveAdminId)),
//           dispatch(getUsersUnderAdmin({
//             adminId: effectiveAdminId,
//             page: 1,
//             limit: 20,
//             search: ''
//           })),
//         ]);
//       } else if (role_id === 2) {
//         await dispatch(getAllAdmins());
//       }
//       setDataFetched(true);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setFetchError(error?.message || "Failed to load data");
//       toast.error("Failed to load data");
//     } finally {
//       setIsRefreshing(false);
//       setIsLoading(false);
//     }
//   }, [dispatch, role_id, getUserData]);

//   // Initial load
//   useEffect(() => {
//     const initializeData = async () => {
//       const user = getUserData();
//       // console.log("Initializing with user:", user);

//       if (user?._id || user?.id) {
//         await fetchAllData();
//       } else {
//         // console.log("No user found, setting loading to false");
//         setIsLoading(false);
//         setFetchError("Please login to continue");
//       }
//     };

//     initializeData();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // Focus effect
//   useEffect(() => {
//     const handleFocus = () => {
//       const user = getUserData();
//       if (user?._id && !isRefreshing && dataFetched) {
//         fetchAllData();
//       }
//     };

//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [fetchAllData, getUserData, isRefreshing, dataFetched]);


//   // Get subscription data from Redux state
//   const subscriptionData = useSelector((state) => state.user?.subscription?.data);
//   const isSubscriptionExpired = useSelector((state) => state.user?.subscription?.expired);
//   const hasSubscription = useSelector((state) => state.user?.subscription?.hasSubscription);
//   const remainingDays = useSelector((state) => state.user?.subscription?.remainingDays);
//   const planName = useSelector((state) => state.user?.subscription?.planName);
//   const subscriptionLoading = useSelector((state) => state.user?.subscription?.loading);

//   // Log to debug
//   // console.log("Subscription Data from Redux:", subscriptionData);
//   // console.log("Is Expired:", isSubscriptionExpired);
//   // console.log("Has Subscription:", hasSubscription);

//   // In your UserManagement component
//   useEffect(() => {
//     const checkSubscription = async () => {
//       const token = localStorage.getItem('token');
//       const user = JSON.parse(localStorage.getItem('user') || '{}');

//       // console.log("Token exists:", !!token);
//       // console.log("User role:", user?.role_id);

//       if (token) {
//         const isSubAdmin = Number(user?.role_id) === 3;
//         const rawAdminId = user?.adminId;
//         const effectiveAdminId = isSubAdmin
//           ? (typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId)
//           : (user?._id || user?.id);
//         const result = await dispatch(checkUserSubscription(effectiveAdminId));
//       }
//     };

//     checkSubscription();
//   }, [dispatch]);


//   const refreshData = async () => {
//     await fetchAllData();
//   };

//   // Impersonation function
//   const handleImpersonate = async (user) => {
//     try {
//       // Store original token and user before impersonation
//       const originalToken = localStorage.getItem('token');
//       const originalUser = localStorage.getItem('user');

//       if (originalToken) {
//         sessionStorage.setItem('originalToken', originalToken);
//         sessionStorage.setItem('originalUser', originalUser);
//       }

//       const result = await dispatch(impersonateUser(user._id || user.id)).unwrap();

//       if (result.status === 1) {
//         // The impersonateUser thunk should already set localStorage
//         // But let's verify and set if needed
//         if (!localStorage.getItem('user')) {
//           localStorage.setItem('user', JSON.stringify(result.user));
//         }
//         if (!localStorage.getItem('token')) {
//           localStorage.setItem('token', result.token);
//         }

//         setImpersonating(true);
//         setImpersonatedUser(result.user);
//         toast.success(`Now impersonating: ${user.name || user.email}`);

//         // Force a page reload to ensure all components get the new user data
//         window.location.href = '/user';
//       } else {
//         toast.error(result.message || 'Impersonation failed');
//       }
//     } catch (error) {
//       console.error('Impersonation failed:', error);
//       toast.error(error?.message || 'Failed to impersonate user');
//     }
//   };

//   const handleStopImpersonation = async () => {
//     try {
//       const result = await dispatch(stopImpersonation()).unwrap();

//       if (result.status === 1) {
//         // Get the original token and user from sessionStorage
//         const originalToken = sessionStorage.getItem('originalToken');
//         const originalUserStr = sessionStorage.getItem('originalUser');

//         if (originalToken && originalUserStr) {
//           const originalUser = JSON.parse(originalUserStr);

//           // Restore to localStorage
//           localStorage.setItem('token', originalToken);
//           localStorage.setItem('user', originalUserStr);

//           // Clear sessionStorage
//           sessionStorage.removeItem('originalToken');
//           sessionStorage.removeItem('originalUser');

//           setImpersonating(false);
//           setImpersonatedUser(null);
//           toast.success('Returned to admin view');

//           // Force a complete page reload to reset all state
//           window.location.href = originalUser?.role_id === 2
//             ? '/super-admin/dashboard'
//             : '/admin/dashboard';
//         } else {
//           // If no original data, logout and redirect to login
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           window.location.href = '/login';
//         }
//       } else {
//         toast.error(result.message || 'Failed to stop impersonation');
//       }
//     } catch (error) {
//       console.error('Failed to stop impersonation:', error);
//       toast.error(error?.message || 'Failed to return to admin view');
//     }
//   };

//   // Filter users by date range
//   const filterUsersByDateRange = (users) => {
//     if (!startDate && !endDate) return users;
//     return (users || []).filter((user) => {
//       const joinedDate = moment(user.createdAt || user.registeredDate || user.createdAt);
//       if (startDate && endDate) {
//         return joinedDate.isBetween(moment(startDate), moment(endDate), null, "[]");
//       } else if (startDate) {
//         return joinedDate.isSameOrAfter(moment(startDate));
//       } else if (endDate) {
//         return joinedDate.isSameOrBefore(moment(endDate));
//       }
//       return true;
//     });
//   };

//   // Sort users
//   const sortedUsers = [...filterUsersByDateRange(usersList || [])].sort((a, b) => {
//     const dateA = new Date(a.createdAt || a.registeredDate || a.createdAt);
//     const dateB = new Date(b.createdAt || b.registeredDate || b.createdAt);
//     return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//   });

//   // Filter by search
//   const filteredUsers = (sortedUsers || []).filter(
//     (user) =>
//       (user.name || user.name)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (role_id === 2 && user.mobile_no?.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   // console.log("Filtered users ---------->", filteredUsers)
//   // const activeUsers = (filteredUsers || []).filter((user) => user.isActive && user.deleted === "false");
//   //   const inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive && user.deleted === "false") ;


//   // const activeUsers = (filteredUsers || []).filter((user) => user.isActive);
//   // const inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive);

//   let activeUsers = [];
//   let inactiveUsers = [];

//   if (role_id === 2) {
//     // For roleId = 2, filter users where isActive and deleted === "false"
//     activeUsers = (filteredUsers || []).filter((user) => user.isActive && user.deleted === "false");
//     inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive && user.deleted === "false");
//   } else if (role_id === 1) {
//     // For roleId = 1, filter users based on isActive only
//     activeUsers = (filteredUsers || []).filter((user) => user.isActive);
//     inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive);
//   } else {
//     // Default case (if roleId is neither 1 nor 2)
//     // You can either use the roleId=1 logic or roleId=2 logic, or handle as needed
//     activeUsers = (filteredUsers || []).filter((user) => user.isActive);
//     inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive);
//   }
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     setPage(0);
//     const params = new URLSearchParams(location.search);
//     if (newValue === 0) {
//       params.set('filter', 'active');
//     } else if (newValue === 1) {
//       params.set('filter', 'inactive');
//     }
//     navigate(`${location.pathname}?${params.toString()}`, { replace: true });
//   };

//   const handleView = (user) => {
//     if (role_id === 1 || role_id === 3) {
//       navigate("/trackingdata", { state: { item: user } });
//     } else if (role_id === 2) {
//       navigate(`/list-users/${user._id || user.id}`);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditingUserData(user);
//     setAddUserModalOpen(true);
//   };

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = () => {
//     setIsDeleting(true);
//     dispatch(deleteUser(selectedUser?._id || selectedUser?.id))
//       .unwrap()
//       .then(() => {
//         // toast.success("User deleted successfully!");
//         setShowDeleteModal(false);
//         refreshData();
//       })
//       .catch(() => {
//         toast.error("Failed to delete user");
//       })
//       .finally(() => {
//         setIsDeleting(false);
//         setSelectedUser(null);
//       });
//   };

//   const handleBulkDelete = () => {
//     setIsDeleting(true);
//     Promise.all(selectedUsers.map((userId) => dispatch(deleteUser(userId))))
//       .then(() => {
//         toast.success(`${selectedUsers.length} user(s) deleted successfully!`);
//         setSelectedUsers([]);
//         setIsBulkMode(false);
//         setShowDeleteModal(false);
//         refreshData();
//       })
//       .catch(() => {
//         toast.error("Failed to delete some users");
//       })
//       .finally(() => {
//         setIsDeleting(false);
//       });
//   };

//   const handleSelectUser = (userId) => {
//     setSelectedUsers((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
//     );
//   };

//   const handleSelectAll = (event) => {
//     const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
//     if (event.target.checked) {
//       setSelectedUsers((currentUsers || []).map((user) => user._id || user.id));
//     } else {
//       setSelectedUsers([]);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     const doc = new jsPDF();
//     doc.setFontSize(18);
//     doc.setTextColor(theme.palette.primary.main);
//     doc.setFont(undefined, "bold");
//     doc.text("Team Trackify", 105, 15, { align: "center" });
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text("User List Report", 105, 30, { align: "center" });
//     doc.setFontSize(10);
//     doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: "center" });

//     const tableColumn = role_id === 2
//       ? ["Name", "Email", "Mobile No", "Status", "Joined Date"]
//       : ["Name", "Email", "Status", "Joined Date"];

//     const tableRows = (usersList || []).map((user) => {
//       if (role_id === 2) {
//         return [
//           user.name || "N/A",
//           user.email || "N/A",
//           user.mobile_no || "N/A",
//           user.isActive ? "Active" : "Inactive",
//           user.createdAt ? moment(user.createdAt).format("MMM D, YYYY") : "N/A",
//         ];
//       } else {
//         return [
//           user.name || "N/A",
//           user.email || "N/A",
//           user.isActive ? "Active" : "Inactive",
//           user.registeredDate || user.createdAt ? moment(user.registeredDate || user.createdAt).format("MMM D, YYYY") : "N/A",
//         ];
//       }
//     });

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 50,
//       styles: { fontSize: 9, cellPadding: 3 },
//       headStyles: { fillColor: [37, 99, 235], textColor: 255 },
//       alternateRowStyles: { fillColor: [240, 240, 240] },
//     });

//     doc.save(`users-${new Date().toISOString().split("T")[0]}.pdf`);
//   };

//   const handleDateFilterClick = (event) => {
//     setDateFilterAnchor(event.currentTarget);
//   };

//   const handleDateFilterClose = () => {
//     setDateFilterAnchor(null);
//   };

//   const applyDateFilter = () => {
//     handleDateFilterClose();
//     setPage(0);
//   };

//   const clearDateFilter = () => {
//     setStartDate(null);
//     setEndDate(null);
//     handleDateFilterClose();
//     setPage(0);
//   };

//   const handleSort = () => {
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const handleAddUserClick = () => {
//     const user = getUserData();
//     if (!user?._id && !user?.id) {
//       toast.error("User data not available");
//       return;
//     }
//     if (canCreateUser) {
//       setAddUserModalOpen(true);
//     } else {
//       setShowLimitModal(true);
//     }
//   };

//   const canCreateUser = role_id === 2 ||
//     ((role_id === 1 || role_id === 3) && maxUser && totalUsers < maxUser && (!subscriptionExpiry || moment(subscriptionExpiry).isAfter(moment())));

//   const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
//   const paginatedUsers = (currentUsers || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   if (fetchError) {
//     return (
//       <Box sx={{ p: 3 }}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {fetchError}
//         </Alert>
//         <Button variant="contained" onClick={() => window.location.reload()}>
//           Retry
//         </Button>
//       </Box>
//     );
//   }

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
//               {role_id === 1 ? 'User Management' : 'Organization Management'}
//             </Typography>
//           </Box>
//           <Box sx={{
//             display: 'flex',
//             gap: 1,
//             flexWrap: 'wrap',
//             justifyContent: { xs: 'flex-start', sm: 'flex-end' },
//             width: { xs: '100%', sm: 'auto' }
//           }}>
//             <Skeleton variant="circular" width={isMobile ? 34 : 38} height={isMobile ? 34 : 38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="circular" width={isMobile ? 34 : 38} height={isMobile ? 34 : 38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="circular" width={isMobile ? 34 : 38} height={isMobile ? 34 : 38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="rounded" width={isMobile ? 90 : 110} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="rounded" width={isMobile ? 90 : 110} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>
//         </Box>
//         <SearchFilterSkeleton isMobile={isMobile} />
//         <TabsSkeleton isMobile={isMobile} />
//       </Box>
//     );
//   }

//   // Show loading if data not fetched yet
//   if (isLoading || !dataFetched) {
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
//               {/* Loading... */}
//               User Management
//             </Typography>
//           </Box>
//         </Box>
//         <SearchFilterSkeleton isMobile={isMobile} />
//         <TabsSkeleton isMobile={isMobile} />
//       </Box>
//     );
//   }

//   return (

//     <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
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
//             {role_id === 1 ? 'User Management' : 'Organization Management'}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
//             {role_id === 1
//               ? 'Manage your team members and their access'
//               : 'Manage organizations and their users'
//             }
//           </Typography>
//           {currentUser?.currentPaymentId?.expiresAt && (
//             <Chip
//               label={`Subscription expires: ${moment(currentUser.currentPaymentId.expiresAt).format('DD-MM-YYYY')} ${moment(currentUser.currentPaymentId.expiresAt).isAfter(moment())
//                 ? `(${moment(currentUser.currentPaymentId.expiresAt).diff(moment(), 'days')} days left)`
//                 : '(Expired)'
//                 }`}
//               size="small"
//               sx={{
//                 mt: 1,
//                 bgcolor: moment(currentUser.currentPaymentId.expiresAt).isAfter(moment())
//                   ? alpha(theme.palette.secondary.main, 0.1)
//                   : alpha('#ef4444', 0.1),
//                 color: moment(currentUser.currentPaymentId.expiresAt).isAfter(moment())
//                   ? theme.palette.secondary.main
//                   : '#ef4444',
//                 fontWeight: 500,
//                 fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                 height: 20,
//               }}
//             />
//           )}
//         </Box>

//         <Box sx={{
//           display: 'flex',
//           gap: 1,
//           flexWrap: 'wrap',
//           justifyContent: { xs: 'flex-start', sm: 'flex-end' },
//           width: { xs: '100%', sm: 'auto' }
//         }}>
//           <Tooltip title="Refresh">
//             <span>
//               <IconButton
//                 onClick={refreshData}
//                 disabled={isRefreshing}
//                 size={isMobile ? "small" : "small"}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                   width: 34,
//                   height: 34,
//                 }}
//               >
//                 <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none', fontSize: { xs: 18, sm: 20 } }} />
//               </IconButton>
//             </span>
//           </Tooltip>

//           <Tooltip title={viewMode === 'table' ? 'Card View' : 'Table View'}>
//             <IconButton
//               onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
//               size={isMobile ? "small" : "small"}
//               sx={{
//                 color: theme.palette.primary.main,
//                 '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                 width: 34,
//                 height: 34,
//               }}
//             >
//               {viewMode === 'table' ? <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <TableRowsIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Download PDF">
//             <IconButton
//               onClick={handleDownloadPDF}
//               size={isMobile ? "small" : "small"}
//               sx={{
//                 color: theme.palette.primary.main,
//                 '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                 width: 34,
//                 height: 34,
//               }}
//             >
//               <DownloadIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//             </IconButton>
//           </Tooltip>

//           {isBulkMode ? (
//             <>
//               <Button
//                 variant="contained"
//                 color="error"
//                 startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
//                 onClick={() => setShowDeleteModal(true)}
//                 disabled={selectedUsers.length === 0 || isDeleting}
//                 size={isMobile ? "small" : "small"}
//                 sx={{
//                   bgcolor: '#ef4444',
//                   '&:hover': { bgcolor: '#dc2626' },
//                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                   height: 34,
//                 }}
//               >
//                 Delete ({selectedUsers.length})
//               </Button>
//               <Button
//                 variant="outlined"
//                 onClick={() => {
//                   setIsBulkMode(false);
//                   setSelectedUsers([]);
//                 }}
//                 size={isMobile ? "small" : "small"}
//                 sx={{
//                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                   borderColor: theme.palette.primary.main,
//                   color: theme.palette.primary.main,
//                   height: 34,
//                   '&:hover': {
//                     borderColor: theme.palette.primary.dark,
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//             </>
//           ) : (
//             <Button
//               variant="outlined"
//               startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
//               onClick={() => setIsBulkMode(true)}
//               size={isMobile ? "small" : "small"}
//               sx={{
//                 borderColor: theme.palette.primary.main,
//                 color: theme.palette.primary.main,
//                 fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                 height: 34,
//                 '&:hover': {
//                   borderColor: theme.palette.primary.dark,
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 },
//               }}
//             >
//               Bulk Delete
//             </Button>
//           )}

//           {/* <Button
//             variant="contained"
//             startIcon={<AddIcon sx={{ fontSize: 16 }} />}
//             onClick={handleAddUserClick}
//             size={isMobile ? "small" : "small"}
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 34,
//               '&:hover': {
//                 background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//               },
//             }}
//           >
//             {role_id === 1 ? 'Add User' : 'Add Organization'}
//           </Button> */}

//           <Button
//             variant="contained"
//             startIcon={<AddIcon sx={{ fontSize: 16 }} />}
//             onClick={handleAddUserClick}
//             disabled={role_id === 1 && isSubscriptionExpired === true}
//             size={isMobile ? "small" : "small"}
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 34,
//               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//               '&:hover': {
//                 background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//               },
//             }}
//           >
//             {role_id === 2 ? 'Add Organization' : 'Add User'}
//           </Button>
//         </Box>
//       </Box>

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
//         <Grid container spacing={1.5} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               placeholder={`Search ${role_id === 1 ? 'users' : 'organizations'}...`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: { xs: 2, sm: 2.5 },
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                   height: 38,
//                 },
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Box sx={{
//               display: 'flex',
//               gap: 1,
//               justifyContent: { xs: 'flex-start', md: 'flex-end' },
//               flexWrap: 'wrap'
//             }}>
//               <Button
//                 variant="outlined"
//                 startIcon={<CalendarIcon sx={{ fontSize: 16 }} />}
//                 onClick={handleDateFilterClick}
//                 size="small"
//                 sx={{
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   color: 'text.secondary',
//                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                   height: 34,
//                   '&:hover': {
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 Date Filter
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: 16 }} /> : <ArrowDownwardIcon sx={{ fontSize: 16 }} />}
//                 onClick={handleSort}
//                 size="small"
//                 sx={{
//                   borderColor: alpha(theme.palette.divider, 0.5),
//                   color: 'text.secondary',
//                   fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                   height: 34,
//                   '&:hover': {
//                     borderColor: theme.palette.primary.main,
//                     color: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 Joined Date
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Date Filter Menu */}
//       <Menu
//         anchorEl={dateFilterAnchor}
//         open={Boolean(dateFilterAnchor)}
//         onClose={handleDateFilterClose}
//         PaperProps={{
//           sx: {
//             p: 2,
//             width: { xs: 280, sm: 320 },
//             borderRadius: { xs: 2, sm: 3 },
//             boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           },
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 0.5,
//             p: 0.5,
//             minWidth: 200,
//           }}>
//             <Box>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   fontSize: '0.65rem',
//                   fontWeight: 600,
//                   color: theme.palette.primary.main,
//                   mb: 0.2,
//                   lineHeight: 1,
//                   display: 'block',
//                 }}
//               >
//                 Start
//               </Typography>
//               <DatePicker
//                 value={startDate}
//                 onChange={setStartDate}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                     fullWidth: true,
//                     placeholder: "Start",
//                     sx: {
//                       '& .MuiInputBase-root': {
//                         height: 22,
//                         fontSize: '0.7rem',
//                         borderRadius: '4px',
//                       },
//                       '& .MuiInputBase-input': {
//                         padding: '2px 6px !important',
//                       },
//                       '& .MuiInputBase-input::placeholder': {
//                         fontSize: '0.65rem',
//                         opacity: 0.6,
//                       },
//                       '& fieldset': {
//                         borderWidth: '1px',
//                       }
//                     }
//                   },
//                   inputAdornment: {
//                     sx: {
//                       '& .MuiSvgIcon-root': {
//                         fontSize: '0.9rem',
//                       }
//                     }
//                   }
//                 }}
//               />
//             </Box>

//             <Box>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   fontSize: '0.65rem',
//                   fontWeight: 600,
//                   color: theme.palette.primary.main,
//                   mb: 0.2,
//                   lineHeight: 1,
//                   display: 'block',
//                 }}
//               >
//                 End
//               </Typography>
//               <DatePicker
//                 value={endDate}
//                 onChange={setEndDate}
//                 slotProps={{
//                   textField: {
//                     size: "small",
//                     fullWidth: true,
//                     placeholder: "End",
//                     sx: {
//                       '& .MuiInputBase-root': {
//                         height: 22,
//                         fontSize: '0.7rem',
//                         borderRadius: '4px',
//                       },
//                       '& .MuiInputBase-input': {
//                         padding: '2px 6px !important',
//                       },
//                       '& .MuiInputBase-input::placeholder': {
//                         fontSize: '0.65rem',
//                         opacity: 0.6,
//                       },
//                       '& fieldset': {
//                         borderWidth: '1px',
//                       }
//                     }
//                   },
//                   inputAdornment: {
//                     sx: {
//                       '& .MuiSvgIcon-root': {
//                         fontSize: '0.9rem',
//                       }
//                     }
//                   }
//                 }}
//               />
//             </Box>

//             <Box sx={{
//               display: 'flex',
//               gap: 0.8,
//               justifyContent: 'flex-end',
//               mt: 0.5,
//             }}>
//               <Button
//                 size="small"
//                 onClick={clearDateFilter}
//                 sx={{
//                   fontSize: '0.68rem',
//                   fontWeight: 700,
//                   minWidth: 'auto',
//                   px: 1.8,
//                   py: 0.6,
//                   lineHeight: 1,
//                   color: 'text.primary',
//                   textTransform: 'none',
//                   border: '1.5px solid',
//                   borderColor: 'divider',
//                   borderRadius: '8px',
//                   boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
//                   '&:hover': {
//                     bgcolor: 'action.hover',
//                     borderColor: 'text.primary',
//                     boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
//                   }
//                 }}
//               >
//                 Clear
//               </Button>

//               <Button
//                 size="small"
//                 variant="contained"
//                 disableElevation={false}
//                 onClick={applyDateFilter}
//                 sx={{
//                   fontSize: '0.7rem',
//                   fontWeight: 700,
//                   minWidth: 'auto',
//                   px: 2.5,
//                   py: 0.7,
//                   lineHeight: 1,
//                   textTransform: 'none',
//                   borderRadius: '8px',
//                   boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
//                   bgcolor: theme.palette.primary.main,
//                   color: theme.palette.primary.contrastText,
//                   '&:hover': {
//                     bgcolor: theme.palette.primary.dark,
//                     boxShadow: '0 5px 14px rgba(0,0,0,0.22)',
//                     transform: 'translateY(-1px)',
//                   },
//                   transition: 'all 0.15s ease',
//                 }}
//               >
//                 Apply
//               </Button>
//             </Box>
//           </Box>
//         </LocalizationProvider>
//       </Menu>

//       {/* Tabs */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: { xs: 2, sm: 2.5 },
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           overflow: 'hidden',
//         }}
//       >
//         <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             variant={isMobile ? "fullWidth" : "standard"}
//             sx={{
//               '& .MuiTab-root': {
//                 textTransform: 'none',
//                 fontWeight: 600,
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                 minHeight: { xs: 42, sm: 48 },
//                 px: { xs: 1, sm: 1.5 },
//               },
//               '& .Mui-selected': {
//                 color: `${theme.palette.primary.main} !important`,
//               },
//               '& .MuiTabs-indicator': {
//                 bgcolor: theme.palette.primary.main,
//               },
//             }}
//           >
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
//                   <CheckCircleIcon sx={{ color: '#22c55e', fontSize: { xs: 14, sm: 16 } }} />
//                   <span>Active</span>
//                   {!isLoading && (
//                     <Chip
//                       label={activeUsers.length}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha('#22c55e', 0.1),
//                         color: '#22c55e',
//                         fontWeight: 600,
//                         fontSize: { xs: '0.5rem', sm: '0.55rem' },
//                         height: 16,
//                       }}
//                     />
//                   )}
//                 </Box>
//               }
//             />
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
//                   <CancelIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 14, sm: 16 } }} />
//                   <span>Inactive</span>
//                   {!isLoading && (
//                     <Chip
//                       label={inactiveUsers.length}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha(theme.palette.text.secondary, 0.1),
//                         color: theme.palette.text.secondary,
//                         fontWeight: 600,
//                         fontSize: { xs: '0.5rem', sm: '0.55rem' },
//                         height: 16,
//                       }}
//                     />
//                   )}
//                 </Box>
//               }
//             />
//           </Tabs>
//         </Box>

//         {/* Table View */}
//         {viewMode === 'table' && (
//           <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
//             {!isLoading && isBulkMode && (
//               <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Checkbox
//                   checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
//                   indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
//                   onChange={handleSelectAll}
//                   size="small"
//                   sx={{ color: theme.palette.primary.main }}
//                 />
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                   {selectedUsers.length} selected
//                 </Typography>
//               </Box>
//             )}

//             <ResponsiveTable
//               users={paginatedUsers}
//               isBulkMode={isBulkMode}
//               selectedUsers={selectedUsers}
//               handleSelectUser={handleSelectUser}
//               handleSelectAll={handleSelectAll}
//               handleView={handleView}
//               handleEdit={handleEdit}
//               handleDeleteClick={handleDeleteClick}
//               handleImpersonate={handleImpersonate}
//               sortOrder={sortOrder}
//               onSort={handleSort}
//               page={page}
//               rowsPerPage={rowsPerPage}
//               onPageChange={(e, newPage) => setPage(newPage)}
//               onRowsPerPageChange={(e) => {
//                 setRowsPerPage(parseInt(e.target.value, 10));
//                 setPage(0);
//               }}
//               totalCount={currentUsers.length}
//               isMobile={isMobile}
//               isTablet={isTablet}
//               loading={isLoading}
//               role_id={role_id}
//               isSubscriptionExpired={isSubscriptionExpired}
//               isDeleting={isDeleting}
//             />

//             {!isLoading && (
//               <TablePagination
//                 component="div"
//                 count={currentUsers.length}
//                 page={page}
//                 onPageChange={(e, newPage) => setPage(newPage)}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(0);
//                 }}
//                 sx={{
//                   '.MuiTablePagination-select': {
//                     borderRadius: 2,
//                   },
//                   '.MuiTablePagination-displayedRows': {
//                     fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                   },
//                   '.MuiTablePagination-selectLabel': {
//                     fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                   },
//                 }}
//               />
//             )}
//           </Box>
//         )}

//         {/* Card View */}
//         {/* {viewMode === 'card' && (
//           <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
//             {!isLoading && isBulkMode && (
//               <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Checkbox
//                   checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
//                   indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
//                   onChange={handleSelectAll}
//                   size="small"
//                   sx={{ color: theme.palette.primary.main }}
//                 />
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                   {selectedUsers.length} selected
//                 </Typography>
//               </Box>
//             )}

//             {isLoading ? (
//               <Grid container spacing={{ xs: 1.5, sm: 2 }}>
//                 {[1, 2, 3, 4, 5, 6].map((item) => (
//                   <UserCardSkeleton key={item} isBulkMode={isBulkMode} isMobile={isMobile} />
//                 ))}
//               </Grid>
//             ) : (
//               <>
//                 <Grid container spacing={{ xs: 1.5, sm: 2 }}>
//                   <AnimatePresence>
//                     {(paginatedUsers || []).map((user) => (
//                       <Grid
//                         item
//                         xs={12}
//                         sm={6}
//                         md={4}
//                         lg={3}  // Added lg breakpoint for 4 cards (12/3 = 4)
//                         xl={3}  // Optional: keep same for xl or adjust as needed
//                         key={user._id || user.id}
//                       >
//                         <UserCard
//                           user={user}
//                           onView={handleView}
//                           onEdit={handleEdit}
//                           onDelete={handleDeleteClick}
//                           onImpersonate={handleImpersonate}
//                           isSelected={selectedUsers.includes(user._id || user.id)}
//                           onSelect={handleSelectUser}
//                           isBulkMode={isBulkMode}
//                           role_id={role_id}
//                           isDeleting={isDeleting && selectedUsers.includes(user._id || user.id)}
//                           isMobile={isMobile}
//                           isSubscriptionExpired={isSubscriptionExpired}
//                         />
//                       </Grid>
//                     ))}
//                   </AnimatePresence>
//                 </Grid>

//                 {currentUsers.length > rowsPerPage && (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2.5 }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= currentUsers.length}
//                       size="small"
//                       sx={{
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         height: 32,
//                         '&:hover': {
//                           borderColor: theme.palette.primary.dark,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                       }}
//                     >
//                       Load More
//                     </Button>
//                   </Box>
//                 )}
//               </>
//             )}
//           </Box>
//         )} */}
//         {viewMode === 'card' && (
//           <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
//             {!isLoading && isBulkMode && (
//               <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Checkbox
//                   checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
//                   indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
//                   onChange={handleSelectAll}
//                   size="small"
//                   sx={{ color: theme.palette.primary.main }}
//                 />
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                   {selectedUsers.length} selected
//                 </Typography>
//               </Box>
//             )}

//             {isLoading ? (
//               <Grid container spacing={{ xs: 1.5, sm: 2 }}>
//                 {[1, 2, 3, 4, 5, 6].map((item) => (
//                   <UserCardSkeleton key={item} isBulkMode={isBulkMode} isMobile={isMobile} />
//                 ))}
//               </Grid>
//             ) : (
//               <>
//                 <Grid container spacing={{ xs: 1.5, sm: 2 }}>
//                   <AnimatePresence>
//                     {(paginatedUsers || []).map((user) => (
//                       <Grid
//                         item
//                         xs={12}
//                         sm={6}
//                         md={4}
//                         lg={3}
//                         xl={3}
//                         key={user._id || user.id}
//                       >
//                         <UserCard
//                           user={user}
//                           onView={handleView}
//                           onEdit={handleEdit}
//                           onDelete={handleDeleteClick}
//                           onImpersonate={handleImpersonate}
//                           isSelected={selectedUsers.includes(user._id || user.id)}
//                           onSelect={handleSelectUser}
//                           isBulkMode={isBulkMode}
//                           role_id={role_id}
//                           isDeleting={isDeleting && selectedUsers.includes(user._id || user.id)}
//                           isMobile={isMobile}
//                           isSubscriptionExpired={isSubscriptionExpired}
//                         />
//                       </Grid>
//                     ))}
//                   </AnimatePresence>
//                 </Grid>

//                 {/* Pagination Controls for Card View */}
//                 {currentUsers.length > 0 && (
//                   <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: 2,
//                     mt: 3,
//                     flexWrap: 'wrap',
//                   }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page - 1)}
//                       disabled={page === 0}
//                       size="small"
//                       sx={{
//                         borderColor: alpha(theme.palette.primary.main, 0.5),
//                         color: theme.palette.primary.main,
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         height: 34,
//                         px: 2,
//                         '&:hover': {
//                           borderColor: theme.palette.primary.main,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                         '&.Mui-disabled': {
//                           borderColor: alpha(theme.palette.primary.main, 0.2),
//                           color: alpha(theme.palette.primary.main, 0.3),
//                         },
//                       }}
//                       startIcon={<ArrowUpwardIcon sx={{ fontSize: 14, transform: 'rotate(-90deg)' }} />}
//                     >
//                       Previous
//                     </Button>

//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 1,
//                       bgcolor: alpha(theme.palette.primary.main, 0.05),
//                       px: 2,
//                       py: 0.5,
//                       borderRadius: 2,
//                     }}>
//                       <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, fontWeight: 500 }}>
//                         Page {page + 1} of {Math.ceil(currentUsers.length / rowsPerPage)}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                         ({currentUsers.length} total)
//                       </Typography>
//                     </Box>

//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= currentUsers.length}
//                       size="small"
//                       sx={{
//                         borderColor: alpha(theme.palette.primary.main, 0.5),
//                         color: theme.palette.primary.main,
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         height: 34,
//                         px: 2,
//                         '&:hover': {
//                           borderColor: theme.palette.primary.main,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                         '&.Mui-disabled': {
//                           borderColor: alpha(theme.palette.primary.main, 0.2),
//                           color: alpha(theme.palette.primary.main, 0.3),
//                         },
//                       }}
//                       endIcon={<ArrowDownwardIcon sx={{ fontSize: 14, transform: 'rotate(-90deg)' }} />}
//                     >
//                       Next
//                     </Button>
//                   </Box>
//                 )}

//                 {/* Optional: Rows per page selector for card view */}
//                 {currentUsers.length > rowsPerPage && (
//                   <Box sx={{
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                     alignItems: 'center',
//                     mt: 2,
//                     gap: 1,
//                   }}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                       Items per page:
//                     </Typography>
//                     <Select
//                       value={rowsPerPage}
//                       onChange={(e) => {
//                         setRowsPerPage(parseInt(e.target.value, 10));
//                         setPage(0);
//                       }}
//                       size="small"
//                       sx={{
//                         height: 28,
//                         fontSize: '0.7rem',
//                         '& .MuiSelect-select': {
//                           py: 0.3,
//                           px: 1,
//                         },
//                       }}
//                     >
//                       <MenuItem value={8}>8</MenuItem>
//                       <MenuItem value={12}>12</MenuItem>
//                       <MenuItem value={16}>16</MenuItem>
//                       <MenuItem value={24}>24</MenuItem>
//                     </Select>
//                   </Box>
//                 )}
//               </>
//             )}
//           </Box>
//         )}

//         {/* Loading State for Tabs */}
//         {isLoading && viewMode === 'table' && (
//           <TabPanelSkeleton />
//         )}
//       </Paper>

//       {/* Add User Modal */}
//       <AddUserModal
//         open={addUserModalOpen}
//         onClose={(refresh) => {
//           setAddUserModalOpen(false);
//           setEditingUserData(null);
//           if (refresh) {
//             refreshData();
//           }
//         }}
//         editingUser={editingUserData}
//       />

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onHide={() => !isDeleting && setShowDeleteModal(false)}
//         onConfirm={selectedUser ? handleDeleteConfirm : handleBulkDelete}
//         title={selectedUser ? "Confirm Deletion" : "Confirm Bulk Deletion"}
//         message={
//           selectedUser
//             ? `Are you sure you want to delete ${selectedUser.name || selectedUser.name}?`
//             : `Are you sure you want to delete ${selectedUsers.length} users?`
//         }
//         subMessage="This action cannot be undone."
//         loading={isDeleting}
//       />

//       {/* User Limit Modal */}
//       <Dialog
//         open={showLimitModal}
//         onClose={() => setShowLimitModal(false)}
//         maxWidth="xs"
//         fullWidth
//         fullScreen={isSmallMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: { xs: 0, sm: 3 },
//             p: { xs: 1, sm: 1.5 },
//             m: { xs: 0, sm: 2 },
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           },
//         }}
//       >
//         <DialogTitle sx={{ textAlign: 'center', pb: 0.5 }}>
//           <Box
//             sx={{
//               width: { xs: 50, sm: 60 },
//               height: { xs: 50, sm: 60 },
//               borderRadius: '50%',
//               bgcolor: isExpired ? alpha('#ef4444', 0.1) : alpha(theme.palette.secondary.main, 0.1),
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               mx: 'auto',
//               mb: 1.5,
//             }}
//           >
//             <AddIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: isExpired ? '#ef4444' : theme.palette.secondary.main }} />
//           </Box>
//           <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: 'text.primary' }}>
//             {isExpired ? 'Subscription Expired' : 'User Limit Reached'}
//           </Typography>
//         </DialogTitle>
//         <DialogContent sx={{ py: 1 }}>
//           <DialogContentText textAlign="center" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//             {isExpired
//               ? 'Your subscription has expired. Renew now to continue adding users.'
//               : `You've reached the maximum limit of ${maxUser} users. Upgrade your plan to add more.`}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{
//           justifyContent: 'center',
//           gap: { xs: 1, sm: 1.5 },
//           pb: { xs: 2, sm: 2.5 },
//           flexDirection: { xs: 'column', sm: 'row' },
//         }}>
//           <Button
//             variant="outlined"
//             onClick={() => setShowLimitModal(false)}
//             fullWidth={isSmallMobile}
//             size="small"
//             sx={{
//               borderColor: alpha(theme.palette.divider, 0.5),
//               color: 'text.secondary',
//               px: { xs: 2, sm: 3 },
//               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//               height: 32,
//               '&:hover': {
//                 borderColor: theme.palette.primary.main,
//                 color: theme.palette.primary.main,
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => navigate('/admin/payments-plans')}
//             fullWidth={isSmallMobile}
//             size="small"
//             sx={{
//               bgcolor: isExpired ? '#ef4444' : theme.palette.secondary.main,
//               '&:hover': {
//                 bgcolor: isExpired ? '#dc2626' : theme.palette.secondary.dark,
//               },
//               px: { xs: 2, sm: 3 },
//               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//               height: 32,
//             }}
//           >
//             {isExpired ? 'Renew Now' : 'Upgrade Plan'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Impersonation Banner */}
//       {impersonating && (
//         <ImpersonationBanner
//           onStopImpersonation={handleStopImpersonation}
//           impersonatedUser={impersonatedUser}
//         />
//       )}
//     </Box>
//   );
// };

// export default UserManagement;










// Above Code issue is not getting user limit after refresh or logout and login
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Avatar,
  Menu,
  Tooltip,
  alpha,
  Card,
  CardContent,
  Stack,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Divider,
  Skeleton,
  useTheme,
  useMediaQuery,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  GridView as GridViewIcon,
  TableRows as TableRowsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Login as LoginIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  getAllAdmins,
  deleteUser,
  getUserById,
  getUsersUnderAdmin,
  checkUserSubscription,
} from "../../redux/slices/userSlice";
import {
  impersonateUser,
  stopImpersonation,
  getImpersonationStatus,
} from "../../redux/slices/authSlice";
import {
  getPaymentById
} from "../../redux/slices/paymentSlice";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import AddUserModal from "./component/AddUser";

// Impersonation Banner Component
const ImpersonationBanner = ({ onStopImpersonation, impersonatedUser }) => {
  const theme = useTheme();

  if (!impersonatedUser) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        bgcolor: theme.palette.warning.main,
        color: theme.palette.warning.contrastText,
        borderRadius: 3,
        p: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        border: '1px solid',
        borderColor: alpha(theme.palette.warning.dark, 0.3),
        maxWidth: { xs: '90%', sm: 'auto' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LoginIcon sx={{ fontSize: 20 }} />
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
          You are impersonating: <strong>{impersonatedUser.email}</strong>
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="small"
        onClick={onStopImpersonation}
        startIcon={<ExitToAppIcon />}
        sx={{
          bgcolor: theme.palette.warning.dark,
          '&:hover': { bgcolor: theme.palette.warning.darker },
          fontSize: { xs: '0.65rem', sm: '0.7rem' },
          height: 30,
        }}
      >
        Exit Impersonation
      </Button>
    </Paper>
  );
};

// Skeleton Components
const TableRowSkeleton = ({ isBulkMode, isMobile, isTablet, role_id }) => {
  const theme = useTheme();
  const isSuperAdmin = role_id === 2;

  return (
    <TableRow>
      {isBulkMode && (
        <TableCell padding="checkbox" sx={{ pl: 2 }}>
          <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </TableCell>
      )}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
          <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </Box>
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </TableCell>
      {isSuperAdmin && (
        <TableCell>
          <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </TableCell>
      )}
      <TableCell>
        <Skeleton variant="rounded" width={55} height={22} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={70} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
          <Skeleton variant="circular" width={26} height={26} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          <Skeleton variant="circular" width={26} height={26} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          <Skeleton variant="circular" width={26} height={26} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

const UserCardSkeleton = ({ isBulkMode, isMobile }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          borderRadius: 2.5,
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          height: '100%',
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          {isBulkMode && (
            <Box sx={{ mb: 1.5 }}>
              <Skeleton variant="circular" width={18} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 1.5 }}>
            <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={22} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            </Box>
          </Box>
          <Stack spacing={1} sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="rounded" width={55} height={18} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            </Box>
          </Stack>
          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const TabPanelSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ px: { xs: 1, sm: 1.5 } }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton
                variant="rounded"
                height={180}
                sx={{ borderRadius: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

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

const TabsSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 2, sm: 2.5 },
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.1),
        overflow: 'hidden',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1), p: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Skeleton variant="rounded" width={isMobile ? 90 : 130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="rounded" width={isMobile ? 90 : 130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </Box>
      </Box>
      <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
        <TabPanelSkeleton />
      </Box>
    </Paper>
  );
};

// const UserCard = ({
//   user,
//   onView,
//   onEdit,
//   onDelete,
//   onImpersonate,
//   isSelected,
//   onSelect,
//   isBulkMode,
//   role_id,
//   isDeleting,
//   isMobile,
//   isSubscriptionExpired,
// }) => {
//   const theme = useTheme();
//   const isSuperAdmin = role_id === 2;
//   const isLoggedInAdmin = role_id === 1;
//   const isSubAdmin = user.role_id === 3;
//   const showSBBadge = isSubAdmin;
//   const userId = user._id || user.id;
//   const userName = user.name || user.name;
//   const userEmail = user.email;
//   const userMobile = user.mobile_no;
//   const userIsActive = user.isActive;
  
//   // Determine which date to show
//   const getDisplayDate = () => {
//     if (role_id === 2) {
//       // Super Admin sees registered date
//       return user.registeredDate || user.createdAt || user.createdAt;
//     } else {
//       // role_id 1 and 3 see lastStartTime (last check-in), fallback to registeredDate if null
//       return user.lastStartTime || user.registeredDate || user.createdAt || user.createdAt;
//     }
//   };
  
//   const displayDate = getDisplayDate();
//   const dateLabel = role_id === 2 ? "Joined" : "Last Check-in";
  
//   const userCreatedAt = user.createdAt || user.registeredDate || user.createdAt;
//   const userAvatar = user.avtar || user.profileImage;

//   // Handle card click with proper event propagation
//   const handleCardClick = (event) => {
//     // Check if the click target or its parent is an interactive element
//     const target = event.target;
//     const isInteractive = target.closest('button, a, input, [role="button"], .MuiIconButton-root, .MuiButtonBase-root, .MuiCheckbox-root');

//     // Don't trigger view if clicking on action buttons, checkbox, or other interactive elements
//     if (!isInteractive) {
//       onView(user);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.3 }}
//       style={{ height: '100%' }}
//     >
//       <Card
//         sx={{
//           cursor: 'pointer',
//           position: 'relative',
//           borderRadius: 2,
//           border: '1px solid',
//           borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
//           boxShadow: isSelected ? `0 4px 12px -4px ${alpha(theme.palette.primary.main, 0.5)}` : '0 1px 4px rgba(0,0,0,0.03)',
//           transition: 'all 0.2s ease',
//           height: '100%',
//           '&:hover': {
//             transform: !isMobile ? 'translateY(-2px)' : 'none',
//             boxShadow: !isMobile ? `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
//             borderColor: theme.palette.primary.main,
//           },
//         }}
//         onClick={handleCardClick}
//       >
//         {isBulkMode && (
//           <Box sx={{ position: 'absolute', top: 6, left: 6, zIndex: 1 }}>
//             <Checkbox
//               checked={isSelected}
//               onChange={() => onSelect(userId)}
//               onClick={(e) => e.stopPropagation()} // Prevent card click when clicking checkbox
//               size="small"
//               sx={{
//                 color: theme.palette.primary.main,
//                 '&.Mui-checked': {
//                   color: theme.palette.primary.main,
//                 },
//                 padding: '4px',
//               }}
//             />
//           </Box>
//         )}
//         <CardContent sx={{ p: { xs: 1.5, sm: 1.75 } }}>
//           {/* User Info Row - Removed onClick from here since it's now on Card */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.25, sm: 1.5 }, mb: 1.5 }}>
//             <Avatar
//               src={userAvatar}
//               sx={{
//                 width: { xs: 40, sm: 44 },
//                 height: { xs: 40, sm: 44 },
//                 flexShrink: 0,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 border: '1.5px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.2),
//                 fontSize: { xs: '0.9rem', sm: '1rem' },
//               }}
//             >
//               {userName?.charAt(0) || 'U'}
//             </Avatar>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, height: 20, overflow: 'hidden' }}>
//                 <Typography
//                   variant="body2"
//                   fontWeight={600}
//                   color="text.primary"
//                   sx={{
//                     fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     flexShrink: 1,
//                     minWidth: 0,
//                   }}
//                 >
//                   {userName}
//                 </Typography>
//                 {showSBBadge && (
//                   <Chip
//                     label="SB"
//                     size="small"
//                     sx={{
//                       bgcolor: alpha('#22c55e', 0.15),
//                       color: '#22c55e',
//                       fontWeight: 700,
//                       fontSize: '0.6rem',
//                       height: 18,
//                       flexShrink: 0,
//                       '& .MuiChip-label': {
//                         px: 0.75,
//                       },
//                     }}
//                   />
//                 )}
//               </Box>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{
//                   fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                   display: 'block',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   mb: 0.25,
//                 }}
//               >
//                 {userEmail}
//               </Typography>
//               {(isSuperAdmin || role_id === 1 || role_id === 3) && userMobile && (
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   sx={{
//                     fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                     display: 'block',
//                     whiteSpace: 'nowrap',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                   }}
//                 >
//                   {userMobile}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//           {/* Status and Date Info */}
//           <Box
//             sx={{
//               p: { xs: 1, sm: 1.25 },
//               mb: 1.25,
//             }}
//           >
//             <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.primary.main, 0.08) }} />
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.75 }}>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{
//                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                   fontWeight: 500,
//                   letterSpacing: 0.3,
//                 }}
//               >
//                 {dateLabel}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 fontWeight={600}
//                 color="text.primary"
//                 sx={{
//                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                   letterSpacing: 0.2,
//                 }}
//               >
//                 {displayDate ? moment(displayDate).format("MMM D, YYYY") : "N/A"}
//               </Typography>
//             </Box>
//           </Box>
//           {/* Action Buttons */}
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
//             <Tooltip title="View Details">
//               <span>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click
//                     onView(user);
//                   }}
//                   disabled={role_id === 1 && isSubscriptionExpired === true}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                     width: 28,
//                     height: 28,
//                     opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                   }}
//                 >
//                   <VisibilityIcon sx={{ fontSize: 16 }} />
//                 </IconButton>
//               </span>
//             </Tooltip>
//             {/* Impersonate button - only for super admin */}
//             {isSuperAdmin && (
//               <Tooltip title="Login as User">
//                 <span>
//                   <IconButton
//                     size="small"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent card click
//                       onImpersonate(user);
//                     }}
//                     sx={{
//                       color: theme.palette.secondary.main,
//                       '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.1) },
//                       width: 28,
//                       height: 28,
//                     }}
//                   >
//                     <LoginIcon sx={{ fontSize: 16 }} />
//                   </IconButton>
//                 </span>
//               </Tooltip>
//             )}
//             <Tooltip title="Edit">
//               <span>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click
//                     onEdit(user);
//                   }}
//                   disabled={role_id === 1 && isSubscriptionExpired === true}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                     width: 28,
//                     height: 28,
//                     opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                   }}
//                 >
//                   <EditIcon sx={{ fontSize: 16 }} />
//                 </IconButton>
//               </span>
//             </Tooltip>
//             <Tooltip title="Delete">
//               <span>
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent card click
//                     onDelete(user);
//                   }}
//                   disabled={isDeleting || (role_id === 1 && isSubscriptionExpired === true)}
//                   sx={{
//                     color: '#ef4444',
//                     '&:hover': { bgcolor: alpha('#ef4444', 0.1) },
//                     width: 28,
//                     height: 28,
//                     opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                   }}
//                 >
//                   {isDeleting ? <CircularProgress size={12} /> : <DeleteIcon sx={{ fontSize: 16 }} />}
//                 </IconButton>
//               </span>
//             </Tooltip>
//           </Box>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

const UserCard = ({
  user,
  onView,
  onEdit,
  onDelete,
  onImpersonate,
  isSelected,
  onSelect,
  isBulkMode,
  role_id,
  isDeleting,
  isMobile,
  isSubscriptionExpired,
}) => {
  const theme = useTheme();
  const isSuperAdmin = role_id === 2;
  const isLoggedInAdmin = role_id === 1;
  const isSubAdmin = user.role_id === 3;
  const showSBBadge = isSubAdmin;
  const userId = user._id || user.id;
  const userName = user.name || user.name;
  const userEmail = user.email;
  const userMobile = user.mobile_no;
  const userIsActive = user.isActive;
  
  // Determine which date to show - REMOVED registration date fallback
  const getDisplayDate = () => {
    if (role_id === 2) {
      // Super Admin sees registered date
      return user.registeredDate || user.createdAt || null;
    } else {
      // role_id 1 and 3 see lastStartTime (last check-in) ONLY - no fallback to registeredDate
      return user.lastStartTime || null;
    }
  };
  
  const displayDate = getDisplayDate();
  const dateLabel = role_id === 2 ? "Joined" : "Last Check-in";
  
  const userCreatedAt = user.createdAt || user.registeredDate || user.createdAt;
  const userAvatar = user.avtar || user.profileImage;

  // Handle card click with proper event propagation
  const handleCardClick = (event) => {
    // Check if the click target or its parent is an interactive element
    const target = event.target;
    const isInteractive = target.closest('button, a, input, [role="button"], .MuiIconButton-root, .MuiButtonBase-root, .MuiCheckbox-root');

    // Don't trigger view if clicking on action buttons, checkbox, or other interactive elements
    if (!isInteractive) {
      onView(user);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          cursor: 'pointer',
          position: 'relative',
          borderRadius: 2,
          border: '1px solid',
          borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
          boxShadow: isSelected ? `0 4px 12px -4px ${alpha(theme.palette.primary.main, 0.5)}` : '0 1px 4px rgba(0,0,0,0.03)',
          transition: 'all 0.2s ease',
          height: '100%',
          '&:hover': {
            transform: !isMobile ? 'translateY(-2px)' : 'none',
            boxShadow: !isMobile ? `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
            borderColor: theme.palette.primary.main,
          },
        }}
        onClick={handleCardClick}
      >
        {isBulkMode && (
          <Box sx={{ position: 'absolute', top: 6, left: 6, zIndex: 1 }}>
            <Checkbox
              checked={isSelected}
              onChange={() => onSelect(userId)}
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking checkbox
              size="small"
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
                padding: '4px',
              }}
            />
          </Box>
        )}
        <CardContent sx={{ p: { xs: 1.5, sm: 1.75 } }}>
          {/* User Info Row - Removed onClick from here since it's now on Card */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.25, sm: 1.5 }, mb: 1.5 }}>
            <Avatar
              src={userAvatar}
              sx={{
                width: { xs: 40, sm: 44 },
                height: { xs: 40, sm: 44 },
                flexShrink: 0,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: '1.5px solid',
                borderColor: alpha(theme.palette.primary.main, 0.2),
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              {userName?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, height: 20, overflow: 'hidden' }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="text.primary"
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flexShrink: 1,
                    minWidth: 0,
                  }}
                >
                  {userName}
                </Typography>
                {showSBBadge && (
                  <Chip
                    label="SB"
                    size="small"
                    sx={{
                      bgcolor: alpha('#22c55e', 0.15),
                      color: '#22c55e',
                      fontWeight: 700,
                      fontSize: '0.6rem',
                      height: 18,
                      flexShrink: 0,
                      '& .MuiChip-label': {
                        px: 0.75,
                      },
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.6rem', sm: '0.65rem' },
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mb: 0.25,
                }}
              >
                {userEmail}
              </Typography>
              {(isSuperAdmin || role_id === 1 || role_id === 3) && userMobile && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.55rem', sm: '0.6rem' },
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {userMobile}
                </Typography>
              )}
            </Box>
          </Box>
          {/* Status and Date Info */}
          <Box
            sx={{
              p: { xs: 1, sm: 1.25 },
              mb: 1.25,
            }}
          >
            <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.primary.main, 0.08) }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.75 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '0.55rem', sm: '0.6rem' },
                  fontWeight: 500,
                  letterSpacing: 0.3,
                }}
              >
                {dateLabel}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={600}
                color={!displayDate ? "error.main" : "text.primary"}
                sx={{
                  fontSize: { xs: '0.55rem', sm: '0.6rem' },
                  letterSpacing: 0.2,
                }}
              >
                {displayDate ? moment(displayDate).format("MMM D, YYYY") : "---"}
              </Typography>
            </Box>
          </Box>
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title="View Details">
              <span>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onView(user);
                  }}
                  disabled={role_id === 1 && isSubscriptionExpired === true}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                    width: 28,
                    height: 28,
                    opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </span>
            </Tooltip>
            {/* Impersonate button - only for super admin */}
            {isSuperAdmin && (
              <Tooltip title="Login as User">
                <span>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      onImpersonate(user);
                    }}
                    sx={{
                      color: theme.palette.secondary.main,
                      '&:hover': { bgcolor: alpha(theme.palette.secondary.main, 0.1) },
                      width: 28,
                      height: 28,
                    }}
                  >
                    <LoginIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </span>
              </Tooltip>
            )}
            <Tooltip title="Edit">
              <span>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onEdit(user);
                  }}
                  disabled={role_id === 1 && isSubscriptionExpired === true}
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                    width: 28,
                    height: 28,
                    opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
                  }}
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Delete">
              <span>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    onDelete(user);
                  }}
                  disabled={isDeleting || (role_id === 1 && isSubscriptionExpired === true)}
                  sx={{
                    color: '#ef4444',
                    '&:hover': { bgcolor: alpha('#ef4444', 0.1) },
                    width: 28,
                    height: 28,
                    opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
                  }}
                >
                  {isDeleting ? <CircularProgress size={12} /> : <DeleteIcon sx={{ fontSize: 16 }} />}
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// const ResponsiveTable = ({
//   users,
//   isBulkMode,
//   selectedUsers,
//   handleSelectUser,
//   handleSelectAll,
//   handleView,
//   handleEdit,
//   handleDeleteClick,
//   handleImpersonate,
//   sortOrder,
//   onSort,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   totalCount,
//   isMobile,
//   isTablet,
//   loading,
//   role_id,
//   isSubscriptionExpired,
//   isDeleting,
// }) => {
//   const theme = useTheme();
//   const isSuperAdmin = role_id === 2;
//   const isLoggedInAdmin = role_id === 1;

//   // Function to get display date based on role - REMOVED registration date fallback for non-super admins
//   const getDisplayDate = (user) => {
//     if (role_id === 2) {
//       // Super Admin sees registered date
//       return user.registeredDate || user.createdAt || null;
//     } else {
//       // role_id 1 and 3 see only lastStartTime (last check-in) - NO fallback to registeredDate
//       return user.lastStartTime || null;
//     }
//   };

//   const getDateLabel = () => {
//     return role_id === 2 ? "Plan Start" : "Last Check-in";
//   };

//   // Handle row click with proper event propagation
//   const handleRowClick = (user, event) => {
//     // Check if the click target or its parent is an interactive element
//     const target = event.target;
//     const isInteractive = target.closest('button, a, input, [role="button"], .MuiIconButton-root, .MuiButtonBase-root');

//     // Don't trigger view if clicking on action buttons, checkbox, or other interactive elements
//     if (!isInteractive) {
//       handleView(user);
//     }
//   };

//   if (loading) {
//     return (
//       <TableContainer sx={{
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': { height: '6px' },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//           <TableHead>
//             <TableRow>
//               {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               {(isSuperAdmin || role_id === 1 || role_id === 3) && <TableCell>Mobile No</TableCell>}
//               <TableCell>{getDateLabel()}</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {[1, 2, 3, 4, 5].map((item) => (
//               <TableRowSkeleton
//                 key={item}
//                 isBulkMode={isBulkMode}
//                 isMobile={isMobile}
//                 isTablet={isTablet}
//                 role_id={role_id}
//               />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }

//   const getColSpan = () => {
//     let cols = 0;

//     // Checkbox column
//     if (isBulkMode) cols += 2;

//     // Profile & Name column
//     cols += 2;

//     // Email column
//     cols += 2;

//     // Mobile No column
//     if (isSuperAdmin || role_id === 1 || role_id === 3) cols += 1;

//     // Date column
//     cols += 2;

//     // Actions column
//     cols += 2;

//     return cols;
//   };
  
//   // Check if no users available
//   if (!users || users.length === 0) {
//     return (
//       <TableContainer sx={{
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': { height: '6px' },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//           <TableHead>
//             <TableRow>
//               {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Profile &nbsp; &nbsp;  Name
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Email
//               </TableCell>
//               {(isSuperAdmin || role_id === 1 || role_id === 3) && (
//                 <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                   Mobile No
//                 </TableCell>
//               )}
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
//                   {getDateLabel()}
//                   {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
//                 </Box>
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell
//                 colSpan={getColSpan()}
//                 align="center"
//                 sx={{
//                   py: 8,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: 2,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: '50%',
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     <svg
//                       width="40"
//                       height="40"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
//                         fill={theme.palette.primary.main}
//                         opacity="0.6"
//                       />
//                     </svg>
//                   </Box>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: theme.palette.text.primary,
//                       fontWeight: 500,
//                       fontSize: { xs: '1rem', sm: '1.1rem' },
//                     }}
//                   >
//                     You have 0 users
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       fontSize: { xs: '0.75rem', sm: '0.875rem' },
//                       maxWidth: '300px',
//                       textAlign: 'center',
//                     }}
//                   >
//                     No users found. Users will appear here once they are added.
//                   </Typography>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }

//   return (
//     <TableContainer sx={{
//       overflowX: 'auto',
//       '&::-webkit-scrollbar': { height: '6px' },
//       '&::-webkit-scrollbar-thumb': {
//         backgroundColor: alpha(theme.palette.primary.main, 0.3),
//         borderRadius: '3px',
//       },
//     }}>
//       <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//         <TableHead>
//           <TableRow>
//             {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Profile &nbsp; &nbsp;  Name
//             </TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Email
//             </TableCell>
//             {(isSuperAdmin || role_id === 1 || role_id === 3) && (
//               <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//                 Mobile No
//               </TableCell>
//             )}
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
//                 {getDateLabel()}
//                 {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
//               </Box>
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Actions
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <AnimatePresence>
//             {(users || []).map((user) => {
//               const isSubAdmin = user.role_id === 3;
//               const showSBBadge = isSubAdmin;
//               const displayDate = getDisplayDate(user);

//               return (
//                 <motion.tr
//                   key={user._id || user.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   style={{ cursor: 'pointer' }}
//                   onClick={(event) => handleRowClick(user, event)}
//                   onMouseEnter={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isMobile) {
//                       e.currentTarget.style.backgroundColor = 'transparent';
//                     }
//                   }}
//                 >
//                   {isBulkMode && (
//                     <TableCell padding="checkbox" sx={{ pl: 2 }}>
//                       <Checkbox
//                         checked={selectedUsers.includes(user._id || user.id)}
//                         onChange={() => handleSelectUser(user._id || user.id)}
//                         size="small"
//                         sx={{ color: theme.palette.primary.main }}
//                         onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
//                       />
//                     </TableCell>
//                   )}
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
//                       <Avatar
//                         src={user.avtar || user.profileImage}
//                         sx={{
//                           width: { xs: 28, sm: 32 },
//                           height: { xs: 28, sm: 32 },
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                         }}
//                       >
//                         {(user.name || user.name)?.charAt(0)}
//                       </Avatar>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                         <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.85rem' }, color: 'text.primary' }}>
//                           {user.name || user.name}
//                         </Typography>
//                         {showSBBadge && (
//                           <Chip
//                             label="SB"
//                             size="small"
//                             sx={{
//                               bgcolor: alpha('#22c55e', 0.15),
//                               color: '#22c55e',
//                               fontWeight: 700,
//                               fontSize: '0.55rem',
//                               height: 16,
//                               '& .MuiChip-label': {
//                                 px: 0.5,
//                               },
//                             }}
//                           />
//                         )}
//                       </Box>
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
//                     {user.email}
//                   </TableCell>
//                   {(isSuperAdmin || role_id === 1 || role_id === 3) && (
//                     <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
//                       {user.mobile_no}
//                     </TableCell>
//                   )}
//                   <TableCell sx={{ 
//                     fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.75rem' }, 
//                     color: !displayDate ? 'error.main' : 'text.secondary',
//                     fontWeight: !displayDate ? 500 : 400
//                   }}>
//                     {displayDate ? moment(displayDate).format('MMM D, YYYY') : "---"}
//                   </TableCell>
//                   <TableCell align="right">
//                     <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
//                       <Tooltip title="View">
//                         <span>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleView(user);
//                             }}
//                             disabled={role_id === 1 && isSubscriptionExpired === true}
//                             sx={{
//                               color: theme.palette.primary.main,
//                               width: 26,
//                               height: 26,
//                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                             }}
//                           >
//                             <VisibilityIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </span>
//                       </Tooltip>

//                       {/* Impersonate button - only for super admin */}
//                       {isSuperAdmin && (
//                         <Tooltip title="Login as User">
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleImpersonate(user);
//                             }}
//                             sx={{
//                               color: theme.palette.secondary.main,
//                               width: 26,
//                               height: 26,
//                               '&:hover': {
//                                 bgcolor: alpha(theme.palette.secondary.main, 0.1)
//                               }
//                             }}
//                           >
//                             <LoginIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </Tooltip>
//                       )}

//                       <Tooltip title="Edit">
//                         <span>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleEdit(user);
//                             }}
//                             disabled={role_id === 1 && isSubscriptionExpired === true}
//                             sx={{
//                               color: theme.palette.primary.main,
//                               width: 26,
//                               height: 26,
//                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                             }}
//                           >
//                             <EditIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </span>
//                       </Tooltip>

//                       <Tooltip title="Delete">
//                         <span>
//                           <IconButton
//                             size="small"
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent row click
//                               handleDeleteClick(user);
//                             }}
//                             disabled={isDeleting || (role_id === 1 && isSubscriptionExpired === true)}
//                             sx={{
//                               color: '#ef4444',
//                               width: 26,
//                               height: 26,
//                               opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
//                             }}
//                           >
//                             <DeleteIcon sx={{ fontSize: 14 }} />
//                           </IconButton>
//                         </span>
//                       </Tooltip>
//                     </Box>
//                   </TableCell>
//                 </motion.tr>
//               );
//             })}
//           </AnimatePresence>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };


const ResponsiveTable = ({
  users,
  isBulkMode,
  selectedUsers,
  handleSelectUser,
  handleSelectAll,
  handleView,
  handleEdit,
  handleDeleteClick,
  handleImpersonate,
  sortOrder,
  onSort,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
  isMobile,
  isTablet,
  loading,
  role_id,
  isSubscriptionExpired,
  isDeleting,
}) => {
  const theme = useTheme();
  const isSuperAdmin = role_id === 2;
  const isLoggedInAdmin = role_id === 1;

  // Function to get display date based on role
  const getDisplayDate = (user) => {
    if (role_id === 2) {
      // Super Admin sees Plan Start Date
      return user.planStartDate || null;
    } else {
      // role_id 1 and 3 see only lastStartTime (last check-in) - NO fallback to registeredDate
      return user.lastStartTime || null;
    }
  };

  // Function to get Plan Expiry Date for Super Admin
  const getPlanExpiryDate = (user) => {
    if (role_id === 2) {
      return user.planExpiryDate || null;
    }
    return null;
  };

  const getDateLabel = () => {
    return role_id === 2 ? "Plan Start" : "Last Check-in";
  };

  // Handle row click with proper event propagation
  const handleRowClick = (user, event) => {
    // Check if the click target or its parent is an interactive element
    const target = event.target;
    const isInteractive = target.closest('button, a, input, [role="button"], .MuiIconButton-root, .MuiButtonBase-root');

    // Don't trigger view if clicking on action buttons, checkbox, or other interactive elements
    if (!isInteractive) {
      handleView(user);
    }
  };

  if (loading) {
    return (
      <TableContainer sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': { height: '6px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '3px',
        },
      }}>
        <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
          <TableHead>
            <TableRow>
              {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              {(isSuperAdmin || role_id === 1 || role_id === 3) && <TableCell>Mobile No</TableCell>}
              {isSuperAdmin ? (
                <>
                  <TableCell>Plan Start</TableCell>
                  <TableCell>Plan Expiry</TableCell>
                </>
              ) : (
                <TableCell>{getDateLabel()}</TableCell>
              )}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRowSkeleton
                key={item}
                isBulkMode={isBulkMode}
                isMobile={isMobile}
                isTablet={isTablet}
                role_id={role_id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const getColSpan = () => {
    let cols = 0;

    // Checkbox column
    if (isBulkMode) cols += 2;

    // Profile & Name column
    cols += 2;

    // Email column
    cols += 2;

    // Mobile No column
    if (isSuperAdmin || role_id === 1 || role_id === 3) cols += 1;

    // Date columns
    if (isSuperAdmin) {
      cols += 2; // Plan Start + Plan Expiry
    } else {
      cols += 2; // Last Check-in
    }

    // Actions column
    cols += 2;

    return cols;
  };
  
  // Check if no users available
  if (!users || users.length === 0) {
    return (
      <TableContainer sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': { height: '6px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '3px',
        },
      }}>
        <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
          <TableHead>
            <TableRow>
              {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
              <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                Profile &nbsp; &nbsp;  Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                Email
              </TableCell>
              {(isSuperAdmin || role_id === 1 || role_id === 3) && (
                <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                  Mobile No
                </TableCell>
              )}
              {isSuperAdmin ? (
                <>
                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
                      Plan Start
                      {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                    Plan Expiry
                  </TableCell>
                </>
              ) : (
                <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
                    {getDateLabel()}
                    {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
                  </Box>
                </TableCell>
              )}
              <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={getColSpan()}
                align="center"
                sx={{
                  py: 8,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                        fill={theme.palette.primary.main}
                        opacity="0.6"
                      />
                    </svg>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 500,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                    }}
                  >
                    You have 0 users
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      maxWidth: '300px',
                      textAlign: 'center',
                    }}
                  >
                    No users found. Users will appear here once they are added.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer sx={{
      overflowX: 'auto',
      '&::-webkit-scrollbar': { height: '6px' },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: alpha(theme.palette.primary.main, 0.3),
        borderRadius: '3px',
      },
    }}>
      <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
        <TableHead>
          <TableRow>
            {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
              Profile &nbsp; &nbsp;  Name
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
              Email
            </TableCell>
            {(isSuperAdmin || role_id === 1 || role_id === 3) && (
              <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                Mobile No
              </TableCell>
            )}
            {isSuperAdmin ? (
              <>
                <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
                    Plan Start
                    {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                  Plan Expiry
                </TableCell>
              </>
            ) : (
              <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
                  {getDateLabel()}
                  {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
                </Box>
              </TableCell>
            )}
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {(users || []).map((user) => {
              const isSubAdmin = user.role_id === 3;
              const showSBBadge = isSubAdmin;
              const displayDate = getDisplayDate(user);
              const planExpiryDate = getPlanExpiryDate(user);

              return (
                <motion.tr
                  key={user._id || user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ cursor: 'pointer' }}
                  onClick={(event) => handleRowClick(user, event)}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {isBulkMode && (
                    <TableCell padding="checkbox" sx={{ pl: 2 }}>
                      <Checkbox
                        checked={selectedUsers.includes(user._id || user.id)}
                        onChange={() => handleSelectUser(user._id || user.id)}
                        size="small"
                        sx={{ color: theme.palette.primary.main }}
                        onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                      <Avatar
                        src={user.avtar || user.profileImage}
                        sx={{
                          width: { xs: 28, sm: 32 },
                          height: { xs: 28, sm: 32 },
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        {(user.name || user.name)?.charAt(0)}
                      </Avatar>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.85rem' }, color: 'text.primary' }}>
                          {user.name || user.name}
                        </Typography>
                        {showSBBadge && (
                          <Chip
                            label="SB"
                            size="small"
                            sx={{
                              bgcolor: alpha('#22c55e', 0.15),
                              color: '#22c55e',
                              fontWeight: 700,
                              fontSize: '0.55rem',
                              height: 16,
                              '& .MuiChip-label': {
                                px: 0.5,
                              },
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
                    {user.email}
                  </TableCell>
                  {(isSuperAdmin || role_id === 1 || role_id === 3) && (
                    <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
                      {user.mobile_no}
                    </TableCell>
                  )}
                  {isSuperAdmin ? (
                    <>
                      <TableCell sx={{ 
                        fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.75rem' }, 
                        color: !displayDate ? 'error.main' : 'text.secondary',
                        fontWeight: !displayDate ? 500 : 400
                      }}>
                        {displayDate ? moment(displayDate).format('MMM D, YYYY') : "---"}
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.75rem' }, 
                        color: !planExpiryDate ? 'error.main' : 'text.secondary',
                        fontWeight: !planExpiryDate ? 500 : 400
                      }}>
                        {planExpiryDate ? moment(planExpiryDate).format('MMM D, YYYY') : "---"}
                      </TableCell>
                    </>
                  ) : (
                    <TableCell sx={{ 
                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.75rem' }, 
                      color: !displayDate ? 'error.main' : 'text.secondary',
                      fontWeight: !displayDate ? 500 : 400
                    }}>
                      {displayDate ? moment(displayDate).format('MMM D, YYYY') : "---"}
                    </TableCell>
                  )}
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                      <Tooltip title="View">
                        <span>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleView(user);
                            }}
                            disabled={role_id === 1 && isSubscriptionExpired === true}
                            sx={{
                              color: theme.palette.primary.main,
                              width: 26,
                              height: 26,
                              opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </span>
                      </Tooltip>

                      {/* Impersonate button - only for super admin */}
                      {isSuperAdmin && (
                        <Tooltip title="Login as User">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleImpersonate(user);
                            }}
                            sx={{
                              color: theme.palette.secondary.main,
                              width: 26,
                              height: 26,
                              '&:hover': {
                                bgcolor: alpha(theme.palette.secondary.main, 0.1)
                              }
                            }}
                          >
                            <LoginIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                      )}

                      <Tooltip title="Edit">
                        <span>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleEdit(user);
                            }}
                            disabled={role_id === 1 && isSubscriptionExpired === true}
                            sx={{
                              color: theme.palette.primary.main,
                              width: 26,
                              height: 26,
                              opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
                            }}
                          >
                            <EditIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </span>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <span>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click
                              handleDeleteClick(user);
                            }}
                            disabled={isDeleting || (role_id === 1 && isSubscriptionExpired === true)}
                            sx={{
                              color: '#ef4444',
                              width: 26,
                              height: 26,
                              opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const UserManagement = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  // Modal state
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editingUserData, setEditingUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Impersonation state
  const [impersonating, setImpersonating] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState(null);

  // Get auth state from Redux
  const auth = useSelector((state) => state.auth);
  const { isImpersonating, user: authUser } = auth;

  // Get user state from Redux
  const userState = useSelector((state) => state.user || {});
  const userData = userState.userInfo || {};

  // Function to get user data - ALWAYS check localStorage first (critical for impersonation)
  const getUserData = useCallback(() => {
    // First check localStorage directly (this is crucial for impersonation)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // console.log('User from localStorage:', parsedUser); // Debug log
        return parsedUser;
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }

    // Fallback to Redux state
    if (userData?._id) {
      return userData;
    }
    if (auth?.user?._id) {
      return auth.user;
    }

    return null;
  }, [userData, auth]);

  // Function to get role_id - always from localStorage first
  const getRoleId = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser?.role_id || 1;
      } catch (e) {
        console.error('Error parsing stored user for role:', e);
      }
    }
    return auth?.user?.role_id || userData?.role_id || 1;
  }, [auth?.user?.role_id, userData?.role_id]);

  const role_id = getRoleId();

  // Get users based on role
  const usersList = useSelector((state) => {
    if (role_id === 2) {
      return state.user?.adminList || [];
    } else {
      return state.user?.adminUsersList || [];
    }
  });

  const totalUsers = useSelector((state) => {
    if (role_id === 2) {
      return state.user?.adminList?.length || 0;
    } else {
      return state.user?.adminUsersPagination?.totalUsers || 0;
    }
  });




  const loading = useSelector((state) => state.user?.loading || false);
  const currentUser = getUserData();

  // Use organization data from Redux if available (it has the most up-to-date plan info)
  const orgData = userData?._id ? userData : currentUser;

  const subscriptionExpiry = orgData?.currentPaymentId?.expiresAt || orgData?.currentPaymentId?.expiryDate;
  const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());


  const [maxUser, setMaxUser] = useState(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  useEffect(() => {
    const fetchPaymentData = async () => {
      const user = getUserData();

      // Use userData (from Redux) if available, as it contains the freshest data after API fetches.
      // Otherwise, fallback to the current user's local info.
      const targetUser = userData?._id ? userData : user;
      const paymentId = targetUser?.currentPaymentId;

      if (paymentId && typeof paymentId === 'string') {
        setIsLoadingPayment(true);
        try {
          const result = await dispatch(getPaymentById(paymentId)).unwrap();
          const maxUserValue = result?.data?.maxUser || result?.maxUser;
          setMaxUser(maxUserValue);
        } catch (error) {
          // console.error("Error fetching payment data:", error);
          setMaxUser(null);
        } finally {
          setIsLoadingPayment(false);
        }
      } else {
        // If paymentId is not a string (maybe it's already an object with maxUser)
        if (paymentId && typeof paymentId === 'object' && (paymentId.maxUser || paymentId.userLimit)) {
          setMaxUser(paymentId.maxUser || paymentId.userLimit);
        } else {
          setMaxUser(null);
        }
      }
    };

    fetchPaymentData();
  }, [dispatch, getUserData, currentUser?._id, currentUser?.currentPaymentId, userData?._id, userData?.currentPaymentId]);

  // Read filter from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    if (filter === 'active') {
      setTabValue(0);
    } else if (filter === 'inactive') {
      setTabValue(1);
    }
  }, [location.search]);

  // Check impersonation status on mount
  useEffect(() => {
    if (isImpersonating) {
      setImpersonating(true);
      setImpersonatedUser(authUser);
    }
  }, [isImpersonating, authUser]);

  // First render loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch data
  const fetchAllData = useCallback(async () => {
    const user = getUserData();
    const userId = user?._id || user?.id; // Ensure we get the ID

    // console.log("Fetching data for user:", user);
    // console.log("User ID:", userId);

    if (!userId) {
      // console.log("No user ID available");
      setIsLoading(false);
      setFetchError("User data not available");
      return;
    }

    setIsRefreshing(true);
    setFetchError(null);

    try {
      const isSubAdmin = Number(role_id) === 3;
      const rawAdminId = user?.adminId;
      const effectiveAdminId = isSubAdmin
        ? (typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId)
        : (user?._id || user?.id);

      if (role_id === 1 || role_id === 3) {
        await Promise.all([
          // If sub-admin, fetch the parent admin's info to get plan details
          dispatch(getUserById(effectiveAdminId)),
          dispatch(getUsersUnderAdmin({
            adminId: effectiveAdminId,
            page: 1,
            limit: 20,
            search: ''
          })),
        ]);
      } else if (role_id === 2) {
        await dispatch(getAllAdmins());
      }
      setDataFetched(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchError(error?.message || "Failed to load data");
      toast.error("Failed to load data");
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
    }
  }, [dispatch, role_id, getUserData]);

  // Initial load
  useEffect(() => {
    const initializeData = async () => {
      const user = getUserData();
      // console.log("Initializing with user:", user);

      if (user?._id || user?.id) {
        await fetchAllData();
      } else {
        // console.log("No user found, setting loading to false");
        setIsLoading(false);
        setFetchError("Please login to continue");
      }
    };

    initializeData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus effect
  useEffect(() => {
    const handleFocus = () => {
      const user = getUserData();
      if (user?._id && !isRefreshing && dataFetched) {
        fetchAllData();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchAllData, getUserData, isRefreshing, dataFetched]);


  // Get subscription data from Redux state
  const subscriptionData = useSelector((state) => state.user?.subscription?.data);
  const isSubscriptionExpired = useSelector((state) => state.user?.subscription?.expired);
  const hasSubscription = useSelector((state) => state.user?.subscription?.hasSubscription);
  const remainingDays = useSelector((state) => state.user?.subscription?.remainingDays);
  const planName = useSelector((state) => state.user?.subscription?.planName);
  const subscriptionLoading = useSelector((state) => state.user?.subscription?.loading);

  // Log to debug
  // console.log("Subscription Data from Redux:", subscriptionData);
  // console.log("Is Expired:", isSubscriptionExpired);
  // console.log("Has Subscription:", hasSubscription);

  // In your UserManagement component
  useEffect(() => {
    const checkSubscription = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      // console.log("Token exists:", !!token);
      // console.log("User role:", user?.role_id);

      if (token) {
        const isSubAdmin = Number(user?.role_id) === 3;
        const rawAdminId = user?.adminId;
        const effectiveAdminId = isSubAdmin
          ? (typeof rawAdminId === 'object' ? rawAdminId?._id || rawAdminId?.id : rawAdminId)
          : (user?._id || user?.id);
        const result = await dispatch(checkUserSubscription(effectiveAdminId));
      }
    };

    checkSubscription();
  }, [dispatch]);


  const refreshData = async () => {
    await fetchAllData();
  };

  // Impersonation function
  const handleImpersonate = async (user) => {
    try {
      // Store original token and user before impersonation
      const originalToken = localStorage.getItem('token');
      const originalUser = localStorage.getItem('user');

      if (originalToken) {
        sessionStorage.setItem('originalToken', originalToken);
        sessionStorage.setItem('originalUser', originalUser);
      }

      const result = await dispatch(impersonateUser(user._id || user.id)).unwrap();

      if (result.status === 1) {
        // The impersonateUser thunk should already set localStorage
        // But let's verify and set if needed
        if (!localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', result.token);
        }

        setImpersonating(true);
        setImpersonatedUser(result.user);
        toast.success(`Now impersonating: ${user.name || user.email}`);

        // Force a page reload to ensure all components get the new user data
        window.location.href = '/user';
      } else {
        toast.error(result.message || 'Impersonation failed');
      }
    } catch (error) {
      console.error('Impersonation failed:', error);
      toast.error(error?.message || 'Failed to impersonate user');
    }
  };

  const handleStopImpersonation = async () => {
    try {
      const result = await dispatch(stopImpersonation()).unwrap();

      if (result.status === 1) {
        // Get the original token and user from sessionStorage
        const originalToken = sessionStorage.getItem('originalToken');
        const originalUserStr = sessionStorage.getItem('originalUser');

        if (originalToken && originalUserStr) {
          const originalUser = JSON.parse(originalUserStr);

          // Restore to localStorage
          localStorage.setItem('token', originalToken);
          localStorage.setItem('user', originalUserStr);

          // Clear sessionStorage
          sessionStorage.removeItem('originalToken');
          sessionStorage.removeItem('originalUser');

          setImpersonating(false);
          setImpersonatedUser(null);
          toast.success('Returned to admin view');

          // Force a complete page reload to reset all state
          window.location.href = originalUser?.role_id === 2
            ? '/super-admin/dashboard'
            : '/admin/dashboard';
        } else {
          // If no original data, logout and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } else {
        toast.error(result.message || 'Failed to stop impersonation');
      }
    } catch (error) {
      console.error('Failed to stop impersonation:', error);
      toast.error(error?.message || 'Failed to return to admin view');
    }
  };

  // Filter users by date range
  const filterUsersByDateRange = (users) => {
    if (!startDate && !endDate) return users;
    return (users || []).filter((user) => {
      const joinedDate = moment(user.createdAt || user.registeredDate || user.createdAt);
      if (startDate && endDate) {
        return joinedDate.isBetween(moment(startDate), moment(endDate), null, "[]");
      } else if (startDate) {
        return joinedDate.isSameOrAfter(moment(startDate));
      } else if (endDate) {
        return joinedDate.isSameOrBefore(moment(endDate));
      }
      return true;
    });
  };

  // Sort users
  const sortedUsers = [...filterUsersByDateRange(usersList || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.registeredDate || a.createdAt);
    const dateB = new Date(b.createdAt || b.registeredDate || b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Filter by search
  const filteredUsers = (sortedUsers || []).filter(
    (user) =>
      (user.name || user.name)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (role_id === 2 && user.mobile_no?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  let activeUsers = [];
  let inactiveUsers = [];

  if (role_id === 2) {
    // For roleId = 2, filter users where isActive and deleted === "false"
    activeUsers = (filteredUsers || []).filter((user) => user.isActive && user.deleted === "false");
    inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive && user.deleted === "false");
  } else if (role_id === 1) {
    // For roleId = 1, filter users based on isActive only
    activeUsers = (filteredUsers || []).filter((user) => user.isActive);
    inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive);
  } else {
    // Default case (if roleId is neither 1 nor 2)
    // You can either use the roleId=1 logic or roleId=2 logic, or handle as needed
    activeUsers = (filteredUsers || []).filter((user) => user.isActive);
    inactiveUsers = (filteredUsers || []).filter((user) => !user.isActive);
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
    const params = new URLSearchParams(location.search);
    if (newValue === 0) {
      params.set('filter', 'active');
    } else if (newValue === 1) {
      params.set('filter', 'inactive');
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleView = (user) => {
    if (role_id === 1 || role_id === 3) {
      navigate("/trackingdata", { state: { item: user } });
    } else if (role_id === 2) {
      navigate(`/list-users/${user._id || user.id}`);
    }
  };

  const handleEdit = (user) => {
    setEditingUserData(user);
    setAddUserModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    dispatch(deleteUser(selectedUser?._id || selectedUser?.id))
      .unwrap()
      .then(() => {
        // toast.success("User deleted successfully!");
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        // toast.error("Failed to delete user");
      })
      .finally(() => {
        setIsDeleting(false);
        setSelectedUser(null);
      });
  };

  const handleBulkDelete = () => {
    setIsDeleting(true);
    Promise.all(selectedUsers.map((userId) => dispatch(deleteUser(userId))))
      .then(() => {
        // toast.success(`${selectedUsers.length} user(s) deleted successfully!`);
        setSelectedUsers([]);
        setIsBulkMode(false);
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        // toast.error("Failed to delete some users");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = (event) => {
    const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
    if (event.target.checked) {
      setSelectedUsers((currentUsers || []).map((user) => user._id || user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // const handleDownloadPDF = async () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(18);
  //   doc.setTextColor(theme.palette.primary.main);
  //   doc.setFont(undefined, "bold");
  //   doc.text("Team Trackify", 105, 15, { align: "center" });
  //   doc.setFontSize(16);
  //   doc.setTextColor(0, 0, 0);
  //   doc.text("User List Report", 105, 30, { align: "center" });
  //   doc.setFontSize(10);
  //   doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: "center" });

  //   const tableColumn = role_id === 2
  //     ? ["Name", "Email", "Mobile No", "Status", "Joined Date"]
  //     : ["Name", "Email", "Status", "Joined Date"];

  //   const tableRows = (usersList || []).map((user) => {
  //     if (role_id === 2) {
  //       return [
  //         user.name || "N/A",
  //         user.email || "N/A",
  //         user.mobile_no || "N/A",
  //         user.isActive ? "Active" : "Inactive",
  //         user.createdAt ? moment(user.createdAt).format("MMM D, YYYY") : "N/A",
  //       ];
  //     } else {
  //       return [
  //         user.name || "N/A",
  //         user.email || "N/A",
  //         user.isActive ? "Active" : "Inactive",
  //         user.registeredDate || user.createdAt ? moment(user.registeredDate || user.createdAt).format("MMM D, YYYY") : "N/A",
  //       ];
  //     }
  //   });

  //   autoTable(doc, {
  //     head: [tableColumn],
  //     body: tableRows,
  //     startY: 50,
  //     styles: { fontSize: 9, cellPadding: 3 },
  //     headStyles: { fillColor: [37, 99, 235], textColor: 255 },
  //     alternateRowStyles: { fillColor: [240, 240, 240] },
  //   });

  //   doc.save(`users-${new Date().toISOString().split("T")[0]}.pdf`);
  // };
  const handleDownloadPDF = async () => {
    // Get the currently displayed users based on tab (Active/Inactive) and filters
    const currentDisplayUsers = tabValue === 0 ? activeUsers : inactiveUsers;

    // If no users to export, show warning
    if (!currentDisplayUsers || currentDisplayUsers.length === 0) {
      toast.warning("No users to export");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(theme.palette.primary.main);
    doc.setFont(undefined, "bold");
    doc.text("Team Trackify", 105, 15, { align: "center" });
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("User List Report", 105, 30, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: "center" });

    // Add filter information to PDF header
    let yOffset = 45;
    if (searchQuery) {
      doc.setFontSize(8);
      doc.text(`Search Filter: "${searchQuery}"`, 105, yOffset, { align: "center" });
      yOffset += 5;
    }
    if (startDate || endDate) {
      doc.setFontSize(8);
      let dateFilterText = "Date Filter: ";
      if (startDate) dateFilterText += `From ${moment(startDate).format("MMM D, YYYY")} `;
      if (endDate) dateFilterText += `To ${moment(endDate).format("MMM D, YYYY")}`;
      doc.text(dateFilterText, 105, yOffset, { align: "center" });
      yOffset += 5;
    }
    if (tabValue === 0) {
      doc.setFontSize(8);
      doc.text(`Status: Active Users Only`, 105, yOffset, { align: "center" });
      yOffset += 5;
    } else if (tabValue === 1) {
      doc.setFontSize(8);
      doc.text(`Status: Inactive Users Only`, 105, yOffset, { align: "center" });
      yOffset += 5;
    }

    const tableColumn = role_id === 2
      ? ["Name", "Email", "Mobile No", "Status", "Joined Date"]
      : ["Name", "Email", "Status", "Joined Date"];

    // Use currentDisplayUsers instead of usersList
    const tableRows = currentDisplayUsers.map((user) => {
      if (role_id === 2) {
        return [
          user.name || "N/A",
          user.email || "N/A",
          user.mobile_no || "N/A",
          user.isActive ? "Active" : "Inactive",
          user.createdAt ? moment(user.createdAt).format("MMM D, YYYY") : "N/A",
        ];
      } else {
        return [
          user.name || "N/A",
          user.email || "N/A",
          user.isActive ? "Active" : "Inactive",
          user.registeredDate || user.createdAt ? moment(user.registeredDate || user.createdAt).format("MMM D, YYYY") : "N/A",
        ];
      }
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: yOffset + 5,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      // Add footer with record count
      foot: [["", "", ...Array(tableColumn.length - 2).fill(""), `Total: ${tableRows.length} records`]],
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    });

    // Create filename with filter info
    let fileName = `users-${new Date().toISOString().split("T")[0]}`;
    if (searchQuery) fileName += `-search-${searchQuery}`;
    if (startDate || endDate) fileName += `-filtered`;
    fileName += `.pdf`;

    doc.save(fileName);
  };
  const handleDateFilterClick = (event) => {
    setDateFilterAnchor(event.currentTarget);
  };

  const handleDateFilterClose = () => {
    setDateFilterAnchor(null);
  };

  const applyDateFilter = () => {
    handleDateFilterClose();
    setPage(0);
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    handleDateFilterClose();
    setPage(0);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleAddUserClick = () => {
    const user = getUserData();
    if (!user?._id && !user?.id) {
      toast.error("User data not available");
      return;
    }
    if (canCreateUser) {
      setAddUserModalOpen(true);
    } else {
      setShowLimitModal(true);
    }
  };

  // Add this function with your other functions (around line where other handlers are)
  const handleClearAllFilters = () => {
    // Clear search query
    setSearchQuery("");

    // Clear date filters
    setStartDate(null);
    setEndDate(null);

    // Reset to Active tab (tabValue = 0)
    setTabValue(0);

    // Reset page to first page
    setPage(0);

    // Close date filter menu if open
    setDateFilterAnchor(null);

    // Update URL to remove filter params
    navigate(location.pathname, { replace: true });

    // Optional: Show toast notification
    toast.info("All filters cleared");
  };
  const canCreateUser = role_id === 2 ||
    ((role_id === 1 || role_id === 3) && maxUser && totalUsers < maxUser && (!subscriptionExpiry || moment(subscriptionExpiry).isAfter(moment())));

  const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
  const paginatedUsers = (currentUsers || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (fetchError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {fetchError}
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

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
              {role_id === 1 ? 'User Management' : 'Organization Management'}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Skeleton variant="circular" width={isMobile ? 34 : 38} height={isMobile ? 34 : 38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="circular" width={isMobile ? 34 : 38} height={isMobile ? 34 : 38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="circular" width={isMobile ? 34 : 38} height={isMobile ? 34 : 38} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="rounded" width={isMobile ? 90 : 110} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="rounded" width={isMobile ? 90 : 110} height={isMobile ? 34 : 38} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          </Box>
        </Box>
        <SearchFilterSkeleton isMobile={isMobile} />
        <TabsSkeleton isMobile={isMobile} />
      </Box>
    );
  }

  // Show loading if data not fetched yet
  if (isLoading || !dataFetched) {
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
              {/* Loading... */}
              User Management
            </Typography>
          </Box>
        </Box>
        <SearchFilterSkeleton isMobile={isMobile} />
        <TabsSkeleton isMobile={isMobile} />
      </Box>
    );
  }

  return (

    <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
            {role_id === 1 ? 'User Management' : 'Organization Management'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
            {role_id === 1
              ? 'Manage your team members and their access'
              : 'Manage organizations and their users'
            }
          </Typography>
          {currentUser?.currentPaymentId?.expiresAt && (
            <Chip
              label={`Subscription expires: ${moment(currentUser.currentPaymentId.expiresAt).format('DD-MM-YYYY')} ${moment(currentUser.currentPaymentId.expiresAt).isAfter(moment())
                ? `(${moment(currentUser.currentPaymentId.expiresAt).diff(moment(), 'days')} days left)`
                : '(Expired)'
                }`}
              size="small"
              sx={{
                mt: 1,
                bgcolor: moment(currentUser.currentPaymentId.expiresAt).isAfter(moment())
                  ? alpha(theme.palette.secondary.main, 0.1)
                  : alpha('#ef4444', 0.1),
                color: moment(currentUser.currentPaymentId.expiresAt).isAfter(moment())
                  ? theme.palette.secondary.main
                  : '#ef4444',
                fontWeight: 500,
                fontSize: { xs: '0.55rem', sm: '0.6rem' },
                height: 20,
              }}
            />
          )}
        </Box>

        <Box sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: { xs: 'flex-start', sm: 'flex-end' },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <Tooltip title="Refresh">
            <span>
              <IconButton
                onClick={refreshData}
                disabled={isRefreshing}
                size={isMobile ? "small" : "small"}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                  width: 34,
                  height: 34,
                }}
              >
                <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none', fontSize: { xs: 18, sm: 20 } }} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={viewMode === 'table' ? 'Card View' : 'Table View'}>
            <IconButton
              onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
              size={isMobile ? "small" : "small"}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                width: 34,
                height: 34,
              }}
            >
              {viewMode === 'table' ? <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20 } }} /> : <TableRowsIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Download PDF">
            <IconButton
              onClick={handleDownloadPDF}
              size={isMobile ? "small" : "small"}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                width: 34,
                height: 34,
              }}
            >
              <DownloadIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
          </Tooltip>

          {isBulkMode ? (
            <>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                onClick={() => setShowDeleteModal(true)}
                disabled={selectedUsers.length === 0 || isDeleting}
                size={isMobile ? "small" : "small"}
                sx={{
                  bgcolor: '#ef4444',
                  '&:hover': { bgcolor: '#dc2626' },
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  height: 34,
                }}
              >
                Delete ({selectedUsers.length})
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsBulkMode(false);
                  setSelectedUsers([]);
                }}
                size={isMobile ? "small" : "small"}
                sx={{
                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  height: 34,
                  '&:hover': {
                    borderColor: theme.palette.primary.dark,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
              onClick={() => setIsBulkMode(true)}
              size={isMobile ? "small" : "small"}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                height: 34,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              Bulk Delete
            </Button>
          )}

          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            onClick={handleAddUserClick}
            disabled={role_id === 1 && isSubscriptionExpired === true}
            size={isMobile ? "small" : "small"}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              height: 34,
              opacity: role_id === 1 && isSubscriptionExpired === true ? 0.5 : 1,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              },
            }}
          >
            {role_id === 2 ? 'Add Organization' : 'Add User'}
          </Button>
        </Box>
      </Box>

      {/* Search and Filters */}
      {/* <Paper
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
              placeholder={`Search ${role_id === 1 ? 'users' : 'organizations'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Date Filter
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
                Joined Date
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper> */}
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
              placeholder={`Search ${role_id === 1 ? 'users' : 'organizations'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                  </InputAdornment>
                ),
                // Add clear button inside search field
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
                 {/* ADD THIS CLEAR ALL BUTTON */}
              {/* {(searchQuery || startDate || endDate || tabValue !== 0) && ( */}
              {(searchQuery || startDate || endDate ) && (
                <Button
                  variant="contained"
                  startIcon={<CancelIcon sx={{ fontSize: 16 }} />}
                  onClick={handleClearAllFilters}
                  size="small"
                  sx={{
                    bgcolor: '#ef4444',
                    '&:hover': {
                      bgcolor: '#dc2626',
                    },
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                    height: 34,
                    px: 2,
                  }}
                >
                  Clear All Filters
                </Button>
              )}
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
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                Date Filter
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
                Joined Date
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
            p: 2,
            width: { xs: 280, sm: 320 },
            borderRadius: { xs: 2, sm: 3 },
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
            gap: 0.5,
            p: 0.5,
            minWidth: 200,
          }}>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 0.2,
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                Start
              </Typography>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    placeholder: "Start",
                    sx: {
                      '& .MuiInputBase-root': {
                        height: 22,
                        fontSize: '0.7rem',
                        borderRadius: '4px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '2px 6px !important',
                      },
                      '& .MuiInputBase-input::placeholder': {
                        fontSize: '0.65rem',
                        opacity: 0.6,
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
                      }
                    }
                  }
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 0.2,
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                End
              </Typography>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    placeholder: "End",
                    sx: {
                      '& .MuiInputBase-root': {
                        height: 22,
                        fontSize: '0.7rem',
                        borderRadius: '4px',
                      },
                      '& .MuiInputBase-input': {
                        padding: '2px 6px !important',
                      },
                      '& .MuiInputBase-input::placeholder': {
                        fontSize: '0.65rem',
                        opacity: 0.6,
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
                      }
                    }
                  }
                }}
              />
            </Box>

            <Box sx={{
              display: 'flex',
              gap: 0.8,
              justifyContent: 'flex-end',
              mt: 0.5,
            }}>
              <Button
                size="small"
                onClick={clearDateFilter}
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  minWidth: 'auto',
                  px: 1.8,
                  py: 0.6,
                  lineHeight: 1,
                  color: 'text.primary',
                  textTransform: 'none',
                  border: '1.5px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    borderColor: 'text.primary',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  }
                }}
              >
                Clear
              </Button>

              <Button
                size="small"
                variant="contained"
                disableElevation={false}
                onClick={applyDateFilter}
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  minWidth: 'auto',
                  px: 2.5,
                  py: 0.7,
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

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 2, sm: 2.5 },
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                minHeight: { xs: 42, sm: 48 },
                px: { xs: 1, sm: 1.5 },
              },
              '& .Mui-selected': {
                color: `${theme.palette.primary.main} !important`,
              },
              '& .MuiTabs-indicator': {
                bgcolor: theme.palette.primary.main,
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <CheckCircleIcon sx={{ color: '#22c55e', fontSize: { xs: 14, sm: 16 } }} />
                  <span>Active</span>
                  {!isLoading && (
                    <Chip
                      label={activeUsers.length}
                      size="small"
                      sx={{
                        bgcolor: alpha('#22c55e', 0.1),
                        color: '#22c55e',
                        fontWeight: 600,
                        fontSize: { xs: '0.5rem', sm: '0.55rem' },
                        height: 16,
                      }}
                    />
                  )}
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <CancelIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 14, sm: 16 } }} />
                  <span>Inactive</span>
                  {!isLoading && (
                    <Chip
                      label={inactiveUsers.length}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.text.secondary, 0.1),
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                        fontSize: { xs: '0.5rem', sm: '0.55rem' },
                        height: 16,
                      }}
                    />
                  )}
                </Box>
              }
            />
          </Tabs>
        </Box>

        {/* Table View */}
        {viewMode === 'table' && (
          <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
            {!isLoading && isBulkMode && (
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                  onChange={handleSelectAll}
                  size="small"
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                  {selectedUsers.length} selected
                </Typography>
              </Box>
            )}

            <ResponsiveTable
              users={paginatedUsers}
              isBulkMode={isBulkMode}
              selectedUsers={selectedUsers}
              handleSelectUser={handleSelectUser}
              handleSelectAll={handleSelectAll}
              handleView={handleView}
              handleEdit={handleEdit}
              handleDeleteClick={handleDeleteClick}
              handleImpersonate={handleImpersonate}
              sortOrder={sortOrder}
              onSort={handleSort}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(e, newPage) => setPage(newPage)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              totalCount={currentUsers.length}
              isMobile={isMobile}
              isTablet={isTablet}
              loading={isLoading}
              role_id={role_id}
              isSubscriptionExpired={isSubscriptionExpired}
              isDeleting={isDeleting}
            />

            {!isLoading && (
              <TablePagination
                component="div"
                count={currentUsers.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                sx={{
                  '.MuiTablePagination-select': {
                    borderRadius: 2,
                  },
                  '.MuiTablePagination-displayedRows': {
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  },
                  '.MuiTablePagination-selectLabel': {
                    fontSize: { xs: '0.65rem', sm: '0.7rem' },
                  },
                }}
              />
            )}
          </Box>
        )}

        {/* Card View */}
        {/* {viewMode === 'card' && (
          <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
            {!isLoading && isBulkMode && (
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                  onChange={handleSelectAll}
                  size="small"
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                  {selectedUsers.length} selected
                </Typography>
              </Box>
            )}

            {isLoading ? (
              <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <UserCardSkeleton key={item} isBulkMode={isBulkMode} isMobile={isMobile} />
                ))}
              </Grid>
            ) : (
              <>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <AnimatePresence>
                    {(paginatedUsers || []).map((user) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}  // Added lg breakpoint for 4 cards (12/3 = 4)
                        xl={3}  // Optional: keep same for xl or adjust as needed
                        key={user._id || user.id}
                      >
                        <UserCard
                          user={user}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDeleteClick}
                          onImpersonate={handleImpersonate}
                          isSelected={selectedUsers.includes(user._id || user.id)}
                          onSelect={handleSelectUser}
                          isBulkMode={isBulkMode}
                          role_id={role_id}
                          isDeleting={isDeleting && selectedUsers.includes(user._id || user.id)}
                          isMobile={isMobile}
                          isSubscriptionExpired={isSubscriptionExpired}
                        />
                      </Grid>
                    ))}
                  </AnimatePresence>
                </Grid>

                {currentUsers.length > rowsPerPage && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2.5 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setPage(page + 1)}
                      disabled={(page + 1) * rowsPerPage >= currentUsers.length}
                      size="small"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: 32,
                        '&:hover': {
                          borderColor: theme.palette.primary.dark,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      Load More
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        )} */}
        {viewMode === 'card' && (
          <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
            {!isLoading && isBulkMode && (
              <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                  onChange={handleSelectAll}
                  size="small"
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                  {selectedUsers.length} selected
                </Typography>
              </Box>
            )}

            {isLoading ? (
              <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <UserCardSkeleton key={item} isBulkMode={isBulkMode} isMobile={isMobile} />
                ))}
              </Grid>
            ) : (
              <>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                  <AnimatePresence>
                    {(paginatedUsers || []).map((user) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={3}
                        key={user._id || user.id}
                      >
                        <UserCard
                          user={user}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDeleteClick}
                          onImpersonate={handleImpersonate}
                          isSelected={selectedUsers.includes(user._id || user.id)}
                          onSelect={handleSelectUser}
                          isBulkMode={isBulkMode}
                          role_id={role_id}
                          isDeleting={isDeleting && selectedUsers.includes(user._id || user.id)}
                          isMobile={isMobile}
                          isSubscriptionExpired={isSubscriptionExpired}
                        />
                      </Grid>
                    ))}
                  </AnimatePresence>
                </Grid>

                {/* Pagination Controls for Card View */}
                {currentUsers.length > 0 && (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    mt: 3,
                    flexWrap: 'wrap',
                  }}>
                    <Button
                      variant="outlined"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 0}
                      size="small"
                      sx={{
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        color: theme.palette.primary.main,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: 34,
                        px: 2,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        },
                        '&.Mui-disabled': {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                          color: alpha(theme.palette.primary.main, 0.3),
                        },
                      }}
                      startIcon={<ArrowUpwardIcon sx={{ fontSize: 14, transform: 'rotate(-90deg)' }} />}
                    >
                      Previous
                    </Button>

                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                    }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, fontWeight: 500 }}>
                        Page {page + 1} of {Math.ceil(currentUsers.length / rowsPerPage)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                        ({currentUsers.length} total)
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      onClick={() => setPage(page + 1)}
                      disabled={(page + 1) * rowsPerPage >= currentUsers.length}
                      size="small"
                      sx={{
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                        color: theme.palette.primary.main,
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: 34,
                        px: 2,
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        },
                        '&.Mui-disabled': {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                          color: alpha(theme.palette.primary.main, 0.3),
                        },
                      }}
                      endIcon={<ArrowDownwardIcon sx={{ fontSize: 14, transform: 'rotate(-90deg)' }} />}
                    >
                      Next
                    </Button>
                  </Box>
                )}

                {/* Optional: Rows per page selector for card view */}
                {currentUsers.length > rowsPerPage && (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    mt: 2,
                    gap: 1,
                  }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                      Items per page:
                    </Typography>
                    <Select
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                      }}
                      size="small"
                      sx={{
                        height: 28,
                        fontSize: '0.7rem',
                        '& .MuiSelect-select': {
                          py: 0.3,
                          px: 1,
                        },
                      }}
                    >
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={16}>16</MenuItem>
                      <MenuItem value={24}>24</MenuItem>
                    </Select>
                  </Box>
                )}
              </>
            )}
          </Box>
        )}

        {/* Loading State for Tabs */}
        {isLoading && viewMode === 'table' && (
          <TabPanelSkeleton />
        )}
      </Paper>

      {/* Add User Modal */}
      <AddUserModal
        open={addUserModalOpen}
        onClose={(refresh) => {
          setAddUserModalOpen(false);
          setEditingUserData(null);
          if (refresh) {
            refreshData();
          }
        }}
        editingUser={editingUserData}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={selectedUser ? handleDeleteConfirm : handleBulkDelete}
        title={selectedUser ? "Confirm Deletion" : "Confirm Bulk Deletion"}
        message={
          selectedUser
            ? `Are you sure you want to delete ${selectedUser.name || selectedUser.name}?`
            : `Are you sure you want to delete ${selectedUsers.length} users?`
        }
        subMessage="This action cannot be undone."
        loading={isDeleting}
      />

      {/* User Limit Modal */}
      <Dialog
        open={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        maxWidth="xs"
        fullWidth
        fullScreen={isSmallMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 3 },
            p: { xs: 1, sm: 1.5 },
            m: { xs: 0, sm: 2 },
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 0.5 }}>
          <Box
            sx={{
              width: { xs: 50, sm: 60 },
              height: { xs: 50, sm: 60 },
              borderRadius: '50%',
              bgcolor: isExpired ? alpha('#ef4444', 0.1) : alpha(theme.palette.secondary.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1.5,
            }}
          >
            <AddIcon sx={{ fontSize: { xs: 24, sm: 28 }, color: isExpired ? '#ef4444' : theme.palette.secondary.main }} />
          </Box>
          <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, color: 'text.primary' }}>
            {isExpired ? 'Subscription Expired' : 'User Limit Reached'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 1 }}>
          <DialogContentText textAlign="center" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
            {isExpired
              ? 'Your subscription has expired. Renew now to continue adding users.'
              : `You've reached the maximum limit of ${maxUser} users. Upgrade your plan to add more.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          justifyContent: 'center',
          gap: { xs: 1, sm: 1.5 },
          pb: { xs: 2, sm: 2.5 },
          flexDirection: { xs: 'column', sm: 'row' },
        }}>
          <Button
            variant="outlined"
            onClick={() => setShowLimitModal(false)}
            fullWidth={isSmallMobile}
            size="small"
            sx={{
              borderColor: alpha(theme.palette.divider, 0.5),
              color: 'text.secondary',
              px: { xs: 2, sm: 3 },
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              height: 32,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/admin/payments-plans')}
            fullWidth={isSmallMobile}
            size="small"
            sx={{
              bgcolor: isExpired ? '#ef4444' : theme.palette.secondary.main,
              '&:hover': {
                bgcolor: isExpired ? '#dc2626' : theme.palette.secondary.dark,
              },
              px: { xs: 2, sm: 3 },
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              height: 32,
            }}
          >
            {isExpired ? 'Renew Now' : 'Upgrade Plan'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Impersonation Banner */}
      {impersonating && (
        <ImpersonationBanner
          onStopImpersonation={handleStopImpersonation}
          impersonatedUser={impersonatedUser}
        />
      )}
    </Box>
  );
};

export default UserManagement;