// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
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
//   Today as TodayIcon,
//   EventAvailable as EventAvailableIcon,
//   DateRange as DateRangeIcon,
//   ArrowForward as ArrowForwardIcon,
// } from "@mui/icons-material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import moment from "moment";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import {
//   getAllAdmins,
//   getAllUsers,
//   deleteUser,
//   getUserById,
// } from "../../redux/slices/userSlice";
// import DeleteConfirmModal from "../../components/DeleteConfirmModal";
// import AddUserModal from "./component/AddUser";

// // Skeleton Components (keep as is, but they'll inherit smaller fonts from theme)
// const TableRowSkeleton = ({ isBulkMode, isMobile, isTablet }) => {
//   const theme = useTheme();
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
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// // Tabs Skeleton
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
//       {value === index && <Box sx={{ py: 2.5 }}>{children}</Box>}
//     </div>
//   );
// }

// // User Card Component - Smaller fonts
// const UserCard = ({
//   user,
//   onView,
//   onEdit,
//   onDelete,
//   isSelected,
//   onSelect,
//   isBulkMode,
//   role_id,
//   isDeleting,
//   isMobile
// }) => {
//   const theme = useTheme();
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Card
//         sx={{
//           position: 'relative',
//           borderRadius: 2.5,
//           border: '1px solid',
//           borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
//           boxShadow: isSelected ? `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.5)}` : '0 2px 10px rgba(0,0,0,0.03)',
//           transition: 'all 0.3s ease',
//           height: '100%',
//           '&:hover': {
//             transform: !isMobile ? 'translateY(-4px)' : 'none',
//             boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
//             borderColor: theme.palette.primary.main,
//           },
//         }}
//       >
//         {isBulkMode && (
//           <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
//             <Checkbox
//               checked={isSelected}
//               onChange={() => onSelect(user._id)}
//               size="small"
//               sx={{
//                 color: theme.palette.primary.main,
//                 '&.Mui-checked': {
//                   color: theme.palette.primary.main,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 1.5 }}>
//             <Avatar
//               src={user?.avtar}
//               sx={{
//                 width: { xs: 44, sm: 48 },
//                 height: { xs: 44, sm: 48 },
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 border: '2px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.2),
//               }}
//             >
//               {user?.name?.charAt(0) || 'U'}
//             </Avatar>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {user.name}
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' }, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {user.email}
//               </Typography>
//             </Box>
//           </Box>

//           <Stack spacing={1} sx={{ mb: 1.5 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                 Status
//               </Typography>
//               <Chip
//                 label={user.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha(theme.palette.text.secondary, 0.1),
//                   color: user.isActive ? '#22c55e' : theme.palette.text.secondary,
//                   fontWeight: 600,
//                   fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                   height: 18,
//                 }}
//               />
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                 Joined
//               </Typography>
//               <Typography variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
//                 {moment(user.createdAt).format("MMM D, YYYY")}
//               </Typography>
//             </Box>
//           </Stack>

//           <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
//             <Tooltip title="View Details">
//               <IconButton
//                 size="small"
//                 onClick={() => onView(user)}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                   width: 28,
//                   height: 28,
//                 }}
//               >
//                 <VisibilityIcon sx={{ fontSize: 16 }} />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Edit">
//               <IconButton
//                 size="small"
//                 onClick={() => onEdit(user)}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                   width: 28,
//                   height: 28,
//                 }}
//               >
//                 <EditIcon sx={{ fontSize: 16 }} />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Delete">
//               <IconButton
//                 size="small"
//                 onClick={() => onDelete(user)}
//                 disabled={isDeleting}
//                 sx={{
//                   color: '#ef4444',
//                   '&:hover': { bgcolor: alpha('#ef4444', 0.1) },
//                   width: 28,
//                   height: 28,
//                 }}
//               >
//                 {isDeleting ? <CircularProgress size={14} /> : <DeleteIcon sx={{ fontSize: 16 }} />}
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// // Responsive Table Component - Smaller fonts
// const ResponsiveTable = ({
//   users,
//   isBulkMode,
//   selectedUsers,
//   handleSelectUser,
//   handleSelectAll,
//   handleView,
//   handleEdit,
//   handleDeleteClick,
//   sortOrder,
//   onSort,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   totalCount,
//   isMobile,
//   isTablet,
//   loading
// }) => {
//   const theme = useTheme();

//   if (loading) {
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
//         <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//           <TableHead>
//             <TableRow>
//               {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//               <TableCell>User</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Joined Date</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {[1, 2, 3, 4, 5].map((item) => (
//               <TableRowSkeleton key={item} isBulkMode={isBulkMode} isMobile={isMobile} isTablet={isTablet} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }

//   return (
//     <TableContainer sx={{
//       overflowX: 'auto',
//       '&::-webkit-scrollbar': {
//         height: '6px',
//       },
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
//               User
//             </TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Email
//             </TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
//               Status
//             </TableCell>
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
//             {users.map((user) => (
//               <motion.tr
//                 key={user._id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 style={{ cursor: 'pointer' }}
//                 onMouseEnter={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05);
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isMobile) {
//                     e.currentTarget.style.backgroundColor = 'transparent';
//                   }
//                 }}
//               >
//                 {isBulkMode && (
//                   <TableCell padding="checkbox" sx={{ pl: 2 }}>
//                     <Checkbox
//                       checked={selectedUsers.includes(user._id)}
//                       onChange={() => handleSelectUser(user._id)}
//                       size="small"
//                       sx={{ color: theme.palette.primary.main }}
//                     />
//                   </TableCell>
//                 )}
//                 <TableCell>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
//                     <Avatar
//                       src={user.avtar}
//                       sx={{
//                         width: { xs: 28, sm: 32 },
//                         height: { xs: 28, sm: 32 },
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         color: theme.palette.primary.main,
//                       }}
//                     >
//                       {user.name?.charAt(0)}
//                     </Avatar>
//                     <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.primary' }}>
//                       {user.name}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.secondary' }}>
//                   {user.email}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={user.isActive ? 'Active' : 'Inactive'}
//                     size="small"
//                     sx={{
//                       bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha(theme.palette.text.secondary, 0.1),
//                       color: user.isActive ? '#22c55e' : theme.palette.text.secondary,
//                       fontWeight: 600,
//                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                       height: { xs: 18, sm: 20 },
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.secondary' }}>
//                   {moment(user.createdAt).format('MMM D, YYYY')}
//                 </TableCell>
//                 <TableCell align="right">
//                   <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
//                     <Tooltip title="View">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleView(user)}
//                         sx={{ color: theme.palette.primary.main, width: 26, height: 26 }}
//                       >
//                         <VisibilityIcon sx={{ fontSize: 14 }} />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Edit">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleEdit(user)}
//                         sx={{ color: theme.palette.primary.main, width: 26, height: 26 }}
//                       >
//                         <EditIcon sx={{ fontSize: 14 }} />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleDeleteClick(user)}
//                         sx={{ color: '#ef4444', width: 26, height: 26 }}
//                       >
//                         <DeleteIcon sx={{ fontSize: 14 }} />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </TableCell>
//               </motion.tr>
//             ))}
//           </AnimatePresence>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // Main Component
// const UserManagement = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Add modal state
//   const [addUserModalOpen, setAddUserModalOpen] = useState(false);
//   const [editingUserData, setEditingUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

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

//   const userState = useSelector((state) => state.user || {});
//   const userData = userState.userInfo || {};
//   const role_id = userData?.role_id;
//   const usersList = useSelector((state) =>
//     role_id === 1 ? state.user?.usersList || [] : state.user?.adminList || []
//   );
//   const loading = useSelector((state) => state.user?.loading || false);
//   const totalUsers = useSelector((state) => state.user?.totalUsers || 0);
//   const maxUser = userData?.currentPaymentId?.maxUser;
//   const subscriptionExpiry = userData?.currentPaymentId?.expiresAt;
//   const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

//   // Effect for first render loading (1 second)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Function to get user data from multiple sources
//   const getUserData = useCallback(() => {
//     // First check Redux state
//     if (userData?._id) {
//       return userData;
//     }

//     // Then check localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         return parsedUser;
//       } catch (e) {
//         console.error('Error parsing stored user:', e);
//       }
//     }

//     return null;
//   }, [userData]);

//   const canCreateUser = role_id === 2 ||
//     (maxUser && totalUsers < maxUser && (!subscriptionExpiry || moment(subscriptionExpiry).isAfter(moment())));

//   // Consolidated data fetching function
//   const fetchAllData = useCallback(async () => {
//     const user = getUserData();

//     if (!user?._id) {
//       console.log("No user data available");
//       setIsLoading(false);
//       return;
//     }

//     setIsRefreshing(true);
//     try {
//       if (role_id === 1) {
//         await Promise.all([
//           dispatch(getUserById(user._id)),
//           dispatch(getAllUsers(user._id)),
//         ]);
//       } else if (role_id === 2) {
//         await dispatch(getAllAdmins());
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
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

//       if (user?._id) {
//         // If we have user data but Redux state is empty, update Redux
//         if (!userData?._id) {
//           dispatch({ type: 'user/setUserInfo', payload: user });
//         }
//         await fetchAllData();
//       } else {
//         setIsLoading(false);
//       }
//     };

//     initializeData();
//   }, []); // Empty dependency array - run only once on mount

//   // Focus effect
//   useEffect(() => {
//     const handleFocus = () => {
//       const user = getUserData();
//       if (user?._id) {
//         fetchAllData();
//       }
//     };

//     window.addEventListener('focus', handleFocus);
//     return () => window.removeEventListener('focus', handleFocus);
//   }, [fetchAllData, getUserData]);

//   const refreshData = async () => {
//     await fetchAllData();
//   };

//   // Filter users by date range
//   const filterUsersByDateRange = (users) => {
//     if (!startDate && !endDate) return users;
//     return users.filter((user) => {
//       const joinedDate = moment(user.createdAt);
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
//   const sortedUsers = [...filterUsersByDateRange(usersList)].sort((a, b) => {
//     const dateA = new Date(a.createdAt);
//     const dateB = new Date(b.createdAt);
//     return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//   });

//   // Filter by search
//   const filteredUsers = sortedUsers.filter(
//     (user) =>
//       user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const activeUsers = filteredUsers.filter((user) => user.isActive);
//   const inactiveUsers = filteredUsers.filter((user) => !user.isActive);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     setPage(0);
//   };

//   const handleView = (user) => {
//     if (role_id === 1) {
//       navigate("/trackingdata", { state: { item: user } });
//     } else if (role_id === 2) {
//       navigate(`/list-users/${user._id}`);
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
//     dispatch(deleteUser(selectedUser?._id))
//       .unwrap()
//       .then(() => {
//         toast.success("User deleted successfully!");
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
//       setSelectedUsers(currentUsers.map((user) => user._id));
//     } else {
//       setSelectedUsers([]);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.setTextColor(theme.palette.primary.main); // #2563EB
//     doc.setFont(undefined, "bold");
//     doc.text("Team Trackify", 105, 15, { align: "center" });

//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.text("User List Report", 105, 30, { align: "center" });

//     doc.setFontSize(10);
//     doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: "center" });

//     const tableColumn = ["Name", "Email", "Status", "Joined Date"];
//     const tableRows = usersList.map((user) => [
//       user.name || "N/A",
//       user.email || "N/A",
//       user.isActive ? "Active" : "Inactive",
//       user.createdAt ? moment(user.createdAt).format("MMM D, YYYY") : "N/A",
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 50,
//       styles: { fontSize: 9, cellPadding: 3 },
//       headStyles: { fillColor: [37, 99, 235], textColor: 255 }, // Using primary color
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
//     if (!user?._id) {
//       toast.error("User data not available");
//       return;
//     }

//     if (canCreateUser) {
//       setAddUserModalOpen(true);
//     } else {
//       setShowLimitModal(true);
//     }
//   };

//   const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
//   const paginatedUsers = currentUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   // If first render loader is active, show skeletons for everything except title
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
//         {/* Header with title only (no loading) */}
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
//                   xs: '1rem',      // 16px on mobile
//                   sm: '1.2rem',    // 19px on small tablets
//                   md: '1.4rem',    // 22px on tablets
//                   lg: '1.6rem',    // 26px on desktops
//                   xl: '1.8rem'     // 29px on large screens
//                 },
//               }}



//             >
//               {role_id === 1 ? 'User Management' : 'Organization Management'}
//             </Typography>
//           </Box>

//           {/* Action buttons skeleton */}
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

//         {/* Search and Filters Skeleton */}
//         <SearchFilterSkeleton isMobile={isMobile} />

//         {/* Tabs and Table/Card Skeleton */}
//         <TabsSkeleton isMobile={isMobile} />
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
//               fontSize: {
//                 xs: '1rem',      // 16px on mobile
//                 sm: '1.2rem',    // 19px on small tablets
//                 md: '1.4rem',    // 22px on tablets
//                 lg: '1.6rem',    // 26px on desktops
//                 xl: '1.8rem'     // 29px on large screens
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
//           {userData?.currentPaymentId?.expiresAt && (
//             <Chip
//               label={`Subscription expires: ${moment(userData.currentPaymentId.expiresAt).format('DD-MM-YYYY')} ${moment(userData.currentPaymentId.expiresAt).isAfter(moment())
//                 ? `(${moment(userData.currentPaymentId.expiresAt).diff(moment(), 'days')} days left)`
//                 : '(Expired)'
//                 }`}
//               size="small"
//               sx={{
//                 mt: 1,
//                 bgcolor: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
//                   ? alpha(theme.palette.secondary.main, 0.1)
//                   : alpha('#ef4444', 0.1),
//                 color: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
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
//             <IconButton
//               onClick={refreshData}
//               disabled={isRefreshing}
//               size={isMobile ? "small" : "small"}
//               sx={{
//                 color: theme.palette.primary.main,
//                 '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//                 width: 34,
//                 height: 34,
//               }}
//             >
//               <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none', fontSize: { xs: 18, sm: 20 } }} />
//             </IconButton>
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

//           <Button
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
//           </Button>
//         </Box>
//       </Box>

//       {/* Search and Filters - Smaller */}
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


//       <Menu
//         anchorEl={dateFilterAnchor}
//         open={Boolean(dateFilterAnchor)}
//         onClose={handleDateFilterClose}
//         PaperProps={{
//           sx: {
//             p: 0.5,
//             width: { xs: 180, sm: 200 },
//             borderRadius: { xs: 1.5, sm: 2 },
//             boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           },
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box sx={{ mb: 0.5 }}>
//             <Typography
//               variant="caption"
//               sx={{
//                 fontSize: { xs: '0.5rem', sm: '0.55rem' },
//                 color: theme.palette.primary.main,
//                 fontWeight: 500,
//                 display: 'block',
//                 mb: 0.1,
//                 ml: 0.5
//               }}
//             >
//               Start
//             </Typography>
//             <DatePicker
//               value={startDate}
//               onChange={setStartDate}
//               componentsProps={{
//                 actionBar: {
//                   sx: {
//                     '& .MuiButton-root': {
//                       fontSize: '0.7rem',
//                       minHeight: 28,
//                     }
//                   }
//                 },
//                 popper: {
//                   sx: {
//                     '& .MuiPickersDay-root': {
//                       fontSize: '0.7rem',
//                       width: 28,
//                       height: 28,
//                     },
//                     '& .MuiPickersCalendarHeader-root': {
//                       minHeight: 36,
//                     },
//                     '& .MuiPickersCalendarHeader-label': {
//                       fontSize: '0.75rem',
//                     },
//                     '& .MuiDayCalendar-weekDayLabel': {
//                       fontSize: '0.65rem',
//                       width: 28,
//                     },
//                     '& .MuiPickersArrowSwitcher-button': {
//                       width: 28,
//                       height: 28,
//                     }
//                   }
//                 }
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   size="small"
//                   placeholder="DD/MM/YY"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '0.6rem',
//                       py: 0.1,
//                       px: 0.5
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       height: 22,
//                       borderRadius: 1.5
//                     },
//                     '& .MuiOutlinedInput-notchedOutline': {
//                       borderWidth: 0.5
//                     }
//                   }}
//                 />
//               )}
//             />
//           </Box>
//           <Box sx={{ mb: 0.5 }}>
//             <Typography
//               variant="caption"
//               sx={{
//                 fontSize: { xs: '0.5rem', sm: '0.55rem' },
//                 color: theme.palette.primary.main,
//                 fontWeight: 500,
//                 display: 'block',
//                 mb: 0.1,
//                 ml: 0.5
//               }}
//             >
//               End
//             </Typography>
//             <DatePicker
//               value={endDate}
//               onChange={setEndDate}
//               componentsProps={{
//                 actionBar: {
//                   sx: {
//                     '& .MuiButton-root': {
//                       fontSize: '0.7rem',
//                       minHeight: 28,
//                     }
//                   }
//                 },
//                 popper: {
//                   sx: {
//                     '& .MuiPickersDay-root': {
//                       fontSize: '0.7rem',
//                       width: 28,
//                       height: 28,
//                     },
//                     '& .MuiPickersCalendarHeader-root': {
//                       minHeight: 36,
//                     },
//                     '& .MuiPickersCalendarHeader-label': {
//                       fontSize: '0.75rem',
//                     },
//                     '& .MuiDayCalendar-weekDayLabel': {
//                       fontSize: '0.65rem',
//                       width: 28,
//                     },
//                     '& .MuiPickersArrowSwitcher-button': {
//                       width: 28,
//                       height: 28,
//                     }
//                   }
//                 }
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   size="small"
//                   placeholder="DD/MM/YY"
//                   sx={{
//                     '& .MuiInputBase-input': {
//                       fontSize: '0.6rem',
//                       py: 0.1,
//                       px: 0.5
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       height: 22,
//                       borderRadius: 1.5
//                     },
//                     '& .MuiOutlinedInput-notchedOutline': {
//                       borderWidth: 0.5
//                     }
//                   }}
//                 />
//               )}
//             />
//           </Box>
//           <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end', mt: 0.5 }}>
//             <Button
//               size="small"
//               onClick={clearDateFilter}
//               sx={{
//                 fontSize: { xs: '0.5rem', sm: '0.55rem' },
//                 color: 'text.secondary',
//                 height: 20,
//                 minWidth: 36,
//                 px: 0.5,
//                 borderRadius: 1.5
//               }}
//             >
//               Clear
//             </Button>
//             <Button
//               size="small"
//               variant="contained"
//               onClick={applyDateFilter}
//               sx={{
//                 fontSize: { xs: '0.5rem', sm: '0.55rem' },
//                 bgcolor: theme.palette.primary.main,
//                 height: 20,
//                 minWidth: 36,
//                 px: 0.5,
//                 borderRadius: 1.5,
//                 '&:hover': { bgcolor: theme.palette.primary.dark },
//               }}
//             >
//               Apply
//             </Button>
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
//                     {paginatedUsers.map((user) => (
//                       <Grid item xs={12} sm={6} md={4} key={user._id}>
//                         <UserCard
//                           user={user}
//                           onView={handleView}
//                           onEdit={handleEdit}
//                           onDelete={handleDeleteClick}
//                           isSelected={selectedUsers.includes(user._id)}
//                           onSelect={handleSelectUser}
//                           isBulkMode={isBulkMode}
//                           role_id={role_id}
//                           isDeleting={isDeleting && selectedUsers.includes(user._id)}
//                           isMobile={isMobile}
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
//             ? `Are you sure you want to delete ${selectedUser.name}?`
//             : `Are you sure you want to delete ${selectedUsers.length} users?`
//         }
//         subMessage="This action cannot be undone."
//         loading={isDeleting}
//       />

//       {/* User Limit Modal - Smaller */}
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
//     </Box>
//   );
// };

// export default UserManagement;








import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  Today as TodayIcon,
  EventAvailable as EventAvailableIcon,
  DateRange as DateRangeIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  getAllAdmins,
  getAllUsers,
  deleteUser,
  getUserById,
} from "../../redux/slices/userSlice";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import AddUserModal from "./component/AddUser";

// Skeleton Components (keep as is, but they'll inherit smaller fonts from theme)
const TableRowSkeleton = ({ isBulkMode, isMobile, isTablet }) => {
  const theme = useTheme();
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
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Tabs Skeleton
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
      {value === index && <Box sx={{ py: 2.5 }}>{children}</Box>}
    </div>
  );
}

// User Card Component - Smaller fonts
const UserCard = ({
  user,
  onView,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
  isBulkMode,
  role_id,
  isDeleting,
  isMobile
}) => {
  const theme = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          position: 'relative',
          borderRadius: 2.5,
          border: '1px solid',
          borderColor: isSelected ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5),
          boxShadow: isSelected ? `0 8px 20px -8px ${alpha(theme.palette.primary.main, 0.5)}` : '0 2px 10px rgba(0,0,0,0.03)',
          transition: 'all 0.3s ease',
          height: '100%',
          '&:hover': {
            transform: !isMobile ? 'translateY(-4px)' : 'none',
            boxShadow: !isMobile ? `0 20px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        {isBulkMode && (
          <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
            <Checkbox
              checked={isSelected}
              onChange={() => onSelect(user._id)}
              size="small"
              sx={{
                color: theme.palette.primary.main,
                '&.Mui-checked': {
                  color: theme.palette.primary.main,
                },
              }}
            />
          </Box>
        )}

        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 1.5 }}>
            <Avatar
              src={user?.avtar}
              sx={{
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: '2px solid',
                borderColor: alpha(theme.palette.primary.main, 0.2),
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' }, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={1} sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                Status
              </Typography>
              <Chip
                label={user.isActive ? "Active" : "Inactive"}
                size="small"
                sx={{
                  bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha(theme.palette.text.secondary, 0.1),
                  color: user.isActive ? '#22c55e' : theme.palette.text.secondary,
                  fontWeight: 600,
                  fontSize: { xs: '0.55rem', sm: '0.6rem' },
                  height: 18,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                Joined
              </Typography>
              <Typography variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                {moment(user.createdAt).format("MMM D, YYYY")}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title="View Details">
              <IconButton
                size="small"
                onClick={() => onView(user)}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                  width: 28,
                  height: 28,
                }}
              >
                <VisibilityIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(user)}
                sx={{
                  color: theme.palette.primary.main,
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                  width: 28,
                  height: 28,
                }}
              >
                <EditIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => onDelete(user)}
                disabled={isDeleting}
                sx={{
                  color: '#ef4444',
                  '&:hover': { bgcolor: alpha('#ef4444', 0.1) },
                  width: 28,
                  height: 28,
                }}
              >
                {isDeleting ? <CircularProgress size={14} /> : <DeleteIcon sx={{ fontSize: 16 }} />}
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Responsive Table Component - Smaller fonts
const ResponsiveTable = ({
  users,
  isBulkMode,
  selectedUsers,
  handleSelectUser,
  handleSelectAll,
  handleView,
  handleEdit,
  handleDeleteClick,
  sortOrder,
  onSort,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalCount,
  isMobile,
  isTablet,
  loading
}) => {
  const theme = useTheme();

  if (loading) {
    return (
      <TableContainer sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '3px',
        },
      }}>
        <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
          <TableHead>
            <TableRow>
              {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRowSkeleton key={item} isBulkMode={isBulkMode} isMobile={isMobile} isTablet={isTablet} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <TableContainer sx={{
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        height: '6px',
      },
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
              User
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
                Joined Date
                {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.primary.main, fontSize: 14 }} />}
              </Box>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {users.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ cursor: 'pointer' }}
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
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
                    <Avatar
                      src={user.avtar}
                      sx={{
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    >
                      {user.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.85rem' }, color: 'text.primary' }}>
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell fontWeight={500}  sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.80rem' }, color: 'text.secondary' }}>
                  {user.email}
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha(theme.palette.text.secondary, 0.1),
                      color: user.isActive ? '#22c55e' : theme.palette.text.secondary,
                      fontWeight: 600,
                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.70rem' },
                      height: { xs: 18, sm: 20 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.75rem' }, color: 'text.secondary' }}>
                  {moment(user.createdAt).format('MMM D, YYYY')}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() => handleView(user)}
                        sx={{ color: theme.palette.primary.main, width: 26, height: 26 }}
                      >
                        <VisibilityIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(user)}
                        sx={{ color: theme.palette.primary.main, width: 26, height: 26 }}
                      >
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(user)}
                        sx={{ color: '#ef4444', width: 26, height: 26 }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Main Component
const UserManagement = () => {
  const theme = useTheme();
  const location = useLocation(); // Add useLocation for URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  // Add modal state
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [editingUserData, setEditingUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

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

  // Read filter from URL query params on component mount and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get('filter');
    
    if (filter === 'active') {
      setTabValue(0); // Active tab
    } else if (filter === 'inactive') {
      setTabValue(1); // Inactive tab
    }
  }, [location.search]); // Re-run when URL changes

  const userState = useSelector((state) => state.user || {});
  const userData = userState.userInfo || {};
  const role_id = userData?.role_id;
  const usersList = useSelector((state) =>
    role_id === 1 ? state.user?.usersList || [] : state.user?.adminList || []
  );
  const loading = useSelector((state) => state.user?.loading || false);
  const totalUsers = useSelector((state) => state.user?.totalUsers || 0);
  const maxUser = userData?.currentPaymentId?.maxUser;
  const subscriptionExpiry = userData?.currentPaymentId?.expiresAt;
  const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

  // Effect for first render loading (1 second)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Function to get user data from multiple sources
  const getUserData = useCallback(() => {
    // First check Redux state
    if (userData?._id) {
      return userData;
    }

    // Then check localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser;
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }

    return null;
  }, [userData]);

  const canCreateUser = role_id === 2 ||
    (maxUser && totalUsers < maxUser && (!subscriptionExpiry || moment(subscriptionExpiry).isAfter(moment())));

  // Consolidated data fetching function
  const fetchAllData = useCallback(async () => {
    const user = getUserData();

    if (!user?._id) {
      console.log("No user data available");
      setIsLoading(false);
      return;
    }

    setIsRefreshing(true);
    try {
      if (role_id === 1) {
        await Promise.all([
          dispatch(getUserById(user._id)),
          dispatch(getAllUsers(user._id)),
        ]);
      } else if (role_id === 2) {
        await dispatch(getAllAdmins());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

      if (user?._id) {
        // If we have user data but Redux state is empty, update Redux
        if (!userData?._id) {
          dispatch({ type: 'user/setUserInfo', payload: user });
        }
        await fetchAllData();
      } else {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []); // Empty dependency array - run only once on mount

  // Focus effect
  useEffect(() => {
    const handleFocus = () => {
      const user = getUserData();
      if (user?._id) {
        fetchAllData();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchAllData, getUserData]);

  const refreshData = async () => {
    await fetchAllData();
  };

  // Filter users by date range
  const filterUsersByDateRange = (users) => {
    if (!startDate && !endDate) return users;
    return users.filter((user) => {
      const joinedDate = moment(user.createdAt);
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
  const sortedUsers = [...filterUsersByDateRange(usersList)].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Filter by search
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeUsers = filteredUsers.filter((user) => user.isActive);
  const inactiveUsers = filteredUsers.filter((user) => !user.isActive);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);
    
    // Update URL with filter parameter when tab changes
    const params = new URLSearchParams(location.search);
    if (newValue === 0) {
      params.set('filter', 'active');
    } else if (newValue === 1) {
      params.set('filter', 'inactive');
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleView = (user) => {
    if (role_id === 1) {
      navigate("/trackingdata", { state: { item: user } });
    } else if (role_id === 2) {
      navigate(`/list-users/${user._id}`);
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
    dispatch(deleteUser(selectedUser?._id))
      .unwrap()
      .then(() => {
        toast.success("User deleted successfully!");
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        toast.error("Failed to delete user");
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
        toast.success(`${selectedUsers.length} user(s) deleted successfully!`);
        setSelectedUsers([]);
        setIsBulkMode(false);
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        toast.error("Failed to delete some users");
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
      setSelectedUsers(currentUsers.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(theme.palette.primary.main); // #2563EB
    doc.setFont(undefined, "bold");
    doc.text("Team Trackify", 105, 15, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("User List Report", 105, 30, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: "center" });

    const tableColumn = ["Name", "Email", "Status", "Joined Date"];
    const tableRows = usersList.map((user) => [
      user.name || "N/A",
      user.email || "N/A",
      user.isActive ? "Active" : "Inactive",
      user.createdAt ? moment(user.createdAt).format("MMM D, YYYY") : "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 }, // Using primary color
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save(`users-${new Date().toISOString().split("T")[0]}.pdf`);
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
    if (!user?._id) {
      toast.error("User data not available");
      return;
    }

    if (canCreateUser) {
      setAddUserModalOpen(true);
    } else {
      setShowLimitModal(true);
    }
  };

  const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
  const paginatedUsers = currentUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // If first render loader is active, show skeletons for everything except title
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
        {/* Header with title only (no loading) */}
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
                  xs: '1rem',      // 16px on mobile
                  sm: '1.2rem',    // 19px on small tablets
                  md: '1.4rem',    // 22px on tablets
                  lg: '1.6rem',    // 26px on desktops
                  xl: '1.8rem'     // 29px on large screens
                },
              }}
            >
              {role_id === 1 ? 'User Management' : 'Organization Management'}
            </Typography>
          </Box>

          {/* Action buttons skeleton */}
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

        {/* Search and Filters Skeleton */}
        <SearchFilterSkeleton isMobile={isMobile} />

        {/* Tabs and Table/Card Skeleton */}
        <TabsSkeleton isMobile={isMobile} />
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
            variant={isMobile ? "h6" : "h5"}
            fontWeight="700"
            gutterBottom
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: {
                xs: '1rem',      // 16px on mobile
                sm: '1.2rem',    // 19px on small tablets
                md: '1.4rem',    // 22px on tablets
                lg: '1.6rem',    // 26px on desktops
                xl: '1.8rem'     // 29px on large screens
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
          {userData?.currentPaymentId?.expiresAt && (
            <Chip
              label={`Subscription expires: ${moment(userData.currentPaymentId.expiresAt).format('DD-MM-YYYY')} ${moment(userData.currentPaymentId.expiresAt).isAfter(moment())
                ? `(${moment(userData.currentPaymentId.expiresAt).diff(moment(), 'days')} days left)`
                : '(Expired)'
                }`}
              size="small"
              sx={{
                mt: 1,
                bgcolor: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
                  ? alpha(theme.palette.secondary.main, 0.1)
                  : alpha('#ef4444', 0.1),
                color: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
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
            size={isMobile ? "small" : "small"}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              height: 34,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              },
            }}
          >
            {role_id === 1 ? 'Add User' : 'Add Organization'}
          </Button>
        </Box>
      </Box>

      {/* Search and Filters - Smaller */}
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
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: theme.palette.primary.main }}>
              Start Date
            </Typography>
            <DatePicker
              value={startDate}
              onChange={setStartDate}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="small" />
              )}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: theme.palette.primary.main }}>
              End Date
            </Typography>
            <DatePicker
              value={endDate}
              onChange={setEndDate}
              renderInput={(params) => (
                <TextField {...params} fullWidth size="small" />
              )}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button size="small" onClick={clearDateFilter} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' }, color: '#64748b' }}>
              Clear
            </Button>
            <Button 
              size="small" 
              variant="contained" 
              onClick={applyDateFilter} 
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                bgcolor: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.primary.dark },
              }}
            >
              Apply
            </Button>
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
                    {paginatedUsers.map((user) => (
                      <Grid item xs={12} sm={6} md={4} key={user._id}>
                        <UserCard
                          user={user}
                          onView={handleView}
                          onEdit={handleEdit}
                          onDelete={handleDeleteClick}
                          isSelected={selectedUsers.includes(user._id)}
                          onSelect={handleSelectUser}
                          isBulkMode={isBulkMode}
                          role_id={role_id}
                          isDeleting={isDeleting && selectedUsers.includes(user._id)}
                          isMobile={isMobile}
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
            ? `Are you sure you want to delete ${selectedUser.name}?`
            : `Are you sure you want to delete ${selectedUsers.length} users?`
        }
        subMessage="This action cannot be undone."
        loading={isDeleting}
      />

      {/* User Limit Modal - Smaller */}
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
    </Box>
  );
};

export default UserManagement;