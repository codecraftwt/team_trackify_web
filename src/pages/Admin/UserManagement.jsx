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

// // Skeleton Components
// const TableRowSkeleton = ({ isBulkMode, isMobile, isTablet }) => {
//   return (
//     <TableRow>
//       {isBulkMode && (
//         <TableCell padding="checkbox" sx={{ pl: 2 }}>
//           <Skeleton variant="circular" width={20} height={20} />
//         </TableCell>
//       )}
//       <TableCell>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
//           <Skeleton variant="circular" width={40} height={40} />
//           <Skeleton variant="text" width={100} height={20} />
//         </Box>
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={150} height={20} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 3 }} />
//       </TableCell>
//       <TableCell>
//         <Skeleton variant="text" width={80} height={20} />
//       </TableCell>
//       <TableCell align="right">
//         <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
//           <Skeleton variant="circular" width={28} height={28} />
//           <Skeleton variant="circular" width={28} height={28} />
//           <Skeleton variant="circular" width={28} height={28} />
//         </Box>
//       </TableCell>
//     </TableRow>
//   );
// };

// const UserCardSkeleton = ({ isBulkMode, isMobile }) => {
//   return (
//     <Grid item xs={12} sm={6} md={4}>
//       <Card
//         sx={{
//           borderRadius: 3,
//           border: '1px solid',
//           borderColor: alpha('#e2e8f0', 0.5),
//           height: '100%',
//         }}
//       >
//         <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
//           {isBulkMode && (
//             <Box sx={{ mb: 2 }}>
//               <Skeleton variant="circular" width={20} height={20} />
//             </Box>
//           )}

//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
//             <Skeleton variant="circular" width={56} height={56} />
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="60%" height={16} />
//             </Box>
//           </Box>

//           <Stack spacing={1.5} sx={{ mb: 2 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Skeleton variant="text" width={40} height={16} />
//               <Skeleton variant="rounded" width={60} height={20} sx={{ borderRadius: 3 }} />
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Skeleton variant="text" width={40} height={16} />
//               <Skeleton variant="text" width={80} height={16} />
//             </Box>
//           </Stack>

//           <Divider sx={{ my: 2 }} />

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//             <Skeleton variant="circular" width={32} height={32} />
//             <Skeleton variant="circular" width={32} height={32} />
//             <Skeleton variant="circular" width={32} height={32} />
//           </Box>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };

// const TabPanelSkeleton = () => {
//   return (
//     <Box sx={{ py: 3 }}>
//       <Box sx={{ px: { xs: 1, sm: 2 } }}>
//         <Grid container spacing={{ xs: 1.5, sm: 2 }}>
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <Grid item xs={12} sm={6} md={4} key={item}>
//               <Skeleton
//                 variant="rounded"
//                 height={200}
//                 sx={{ borderRadius: 3 }}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
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
//       {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// // User Card Component
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
//           borderRadius: 3,
//           border: '1px solid',
//           borderColor: isSelected ? '#0f766e' : alpha('#e2e8f0', 0.5),
//           boxShadow: isSelected ? '0 8px 20px -8px #0f766e' : '0 2px 10px rgba(0,0,0,0.03)',
//           transition: 'all 0.3s ease',
//           height: '100%',
//           '&:hover': {
//             transform: !isMobile ? 'translateY(-4px)' : 'none',
//             boxShadow: !isMobile ? '0 20px 30px -10px rgba(15, 118, 110, 0.2)' : 'none',
//             borderColor: '#0f766e',
//           },
//         }}
//       >
//         {isBulkMode && (
//           <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1 }}>
//             <Checkbox
//               checked={isSelected}
//               onChange={() => onSelect(user._id)}
//               sx={{
//                 color: '#0f766e',
//                 '&.Mui-checked': {
//                   color: '#0f766e',
//                 },
//               }}
//             />
//           </Box>
//         )}

//         <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
//             <Avatar
//               src={user?.avtar}
//               sx={{
//                 width: { xs: 48, sm: 56 },
//                 height: { xs: 48, sm: 56 },
//                 bgcolor: alpha('#0f766e', 0.1),
//                 color: '#0f766e',
//                 border: '2px solid',
//                 borderColor: alpha('#0f766e', 0.2),
//               }}
//             >
//               {user?.name?.charAt(0) || 'U'}
//             </Avatar>
//             <Box sx={{ flex: 1, minWidth: 0 }}>
//               <Typography variant="h6" fontWeight={600} color="#1e293b" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {user.name}
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                 {user.email}
//               </Typography>
//             </Box>
//           </Box>

//           <Stack spacing={1.5} sx={{ mb: 2 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Typography variant="caption" color="text.secondary">
//                 Status
//               </Typography>
//               <Chip
//                 label={user.isActive ? "Active" : "Inactive"}
//                 size="small"
//                 sx={{
//                   bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha('#64748b', 0.1),
//                   color: user.isActive ? '#22c55e' : '#64748b',
//                   fontWeight: 600,
//                   fontSize: '0.7rem',
//                   height: 20,
//                 }}
//               />
//             </Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Typography variant="caption" color="text.secondary">
//                 Joined
//               </Typography>
//               <Typography variant="caption" fontWeight={500}>
//                 {moment(user.createdAt).format("MMM D, YYYY")}
//               </Typography>
//             </Box>
//           </Stack>

//           <Divider sx={{ my: 2 }} />

//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//             <Tooltip title="View Details">
//               <IconButton
//                 size="small"
//                 onClick={() => onView(user)}
//                 sx={{
//                   color: '#0f766e',
//                   '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
//                 }}
//               >
//                 <VisibilityIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Edit">
//               <IconButton
//                 size="small"
//                 onClick={() => onEdit(user)}
//                 sx={{
//                   color: '#f59e0b',
//                   '&:hover': { bgcolor: alpha('#f59e0b', 0.1) },
//                 }}
//               >
//                 <EditIcon fontSize="small" />
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
//                 }}
//               >
//                 {isDeleting ? <CircularProgress size={16} /> : <DeleteIcon fontSize="small" />}
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }; 

// // Responsive Table Component
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
//   if (loading) {
//     return (
//       <TableContainer sx={{ 
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': {
//           height: '6px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha('#0f766e', 0.3),
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
//         backgroundColor: alpha('#0f766e', 0.3),
//         borderRadius: '3px',
//       },
//     }}>
//       <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
//         <TableHead>
//           <TableRow>
//             {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
//               User
//             </TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
//               Email
//             </TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
//               Status
//             </TableCell>
//             <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
//                 Joined Date
//                 {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//               </Box>
//             </TableCell>
//             <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
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
//                     e.currentTarget.style.backgroundColor = alpha('#0f766e', 0.05);
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
//                       sx={{ color: '#0f766e' }}
//                     />
//                   </TableCell>
//                 )}
//                 <TableCell>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
//                     <Avatar
//                       src={user.avtar}
//                       sx={{
//                         width: { xs: 32, sm: 40 },
//                         height: { xs: 32, sm: 40 },
//                         bgcolor: alpha('#0f766e', 0.1),
//                         color: '#0f766e',
//                       }}
//                     >
//                       {user.name?.charAt(0)}
//                     </Avatar>
//                     <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
//                       {user.name}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' } }}>
//                   {user.email}
//                 </TableCell>
//                 <TableCell>
//                   <Chip
//                     label={user.isActive ? 'Active' : 'Inactive'}
//                     size="small"
//                     sx={{
//                       bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha('#64748b', 0.1),
//                       color: user.isActive ? '#22c55e' : '#64748b',
//                       fontWeight: 600,
//                       fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
//                       height: { xs: 20, sm: 24 },
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' } }}>
//                   {moment(user.createdAt).format('MMM D, YYYY')}
//                 </TableCell>
//                 <TableCell align="right">
//                   <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
//                     <Tooltip title="View">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleView(user)}
//                         sx={{ color: '#0f766e' }}
//                       >
//                         <VisibilityIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Edit">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleEdit(user)}
//                         sx={{ color: '#f59e0b' }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleDeleteClick(user)}
//                         sx={{ color: '#ef4444' }}
//                       >
//                         <DeleteIcon fontSize="small" />
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
//     doc.setTextColor(15, 118, 110);
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
//       headStyles: { fillColor: [15, 118, 110], textColor: 255 },
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

//   return (
//     <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//       {/* Header */}
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: { xs: 'column', sm: 'row' },
//         justifyContent: 'space-between', 
//         alignItems: { xs: 'flex-start', sm: 'center' }, 
//         mb: { xs: 2, sm: 3 },
//         gap: 2
//       }}>
//         <Box>
//           <Typography 
//             variant={isMobile ? "h5" : "h4"}
//             fontWeight="800"
//             color="#0f766e"
//             gutterBottom
//             sx={{
//               background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//             }}
//           >
//             {role_id === 1 ? 'User Management' : 'Organization Management'}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
//             {role_id === 1
//               ? 'Manage your team members and their access'
//               : 'Manage organizations and their users'
//             }
//           </Typography>
//           {userData?.currentPaymentId?.expiresAt && (
//             <Chip
//               label={`Subscription expires: ${moment(userData.currentPaymentId.expiresAt).format('DD-MM-YYYY')} ${
//                 moment(userData.currentPaymentId.expiresAt).isAfter(moment())
//                   ? `(${moment(userData.currentPaymentId.expiresAt).diff(moment(), 'days')} days left)`
//                   : '(Expired)'
//               }`}
//               size="small"
//               sx={{
//                 mt: 1,
//                 bgcolor: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
//                   ? alpha('#f59e0b', 0.1)
//                   : alpha('#ef4444', 0.1),
//                 color: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
//                   ? '#f59e0b'
//                   : '#ef4444',
//                 fontWeight: 500,
//                 fontSize: { xs: '0.6rem', sm: '0.7rem' },
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
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 color: '#0f766e',
//                 '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
//               }}
//             >
//               <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none', fontSize: { xs: 20, sm: 24 } }} />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title={viewMode === 'table' ? 'Card View' : 'Table View'}>
//             <IconButton
//               onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 color: '#0f766e',
//                 '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
//               }}
//             >
//               {viewMode === 'table' ? <GridViewIcon sx={{ fontSize: { xs: 20, sm: 24 } }} /> : <TableRowsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Download PDF">
//             <IconButton
//               onClick={handleDownloadPDF}
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 color: '#0f766e',
//                 '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
//               }}
//             >
//               <DownloadIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
//             </IconButton>
//           </Tooltip>

//           {isBulkMode ? (
//             <>
//               <Button
//                 variant="contained"
//                 color="error"
//                 startIcon={<DeleteIcon />}
//                 onClick={() => setShowDeleteModal(true)}
//                 disabled={selectedUsers.length === 0 || isDeleting}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   bgcolor: '#ef4444',
//                   '&:hover': { bgcolor: '#dc2626' },
//                   fontSize: { xs: '0.7rem', sm: '0.8rem' },
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
//                 size={isMobile ? "small" : "medium"}
//                 sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
//               >
//                 Cancel
//               </Button>
//             </>
//           ) : (
//             <Button
//               variant="outlined"
//               startIcon={<DeleteIcon />}
//               onClick={() => setIsBulkMode(true)}
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 borderColor: '#0f766e',
//                 color: '#0f766e',
//                 fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                 '&:hover': {
//                   borderColor: '#0a5c55',
//                   bgcolor: alpha('#0f766e', 0.1),
//                 },
//               }}
//             >
//               Bulk Delete
//             </Button>
//           )}

//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleAddUserClick}
//             size={isMobile ? "small" : "medium"}
//             sx={{
//               bgcolor: '#0f766e',
//               fontSize: { xs: '0.7rem', sm: '0.8rem' },
//               '&:hover': { bgcolor: '#0a5c55' },
//             }}
//           >
//             {role_id === 1 ? 'Add User' : 'Add Organization'}
//           </Button>
//         </Box>
//       </Box>

//       {/* Search and Filters */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 1.5, sm: 2 },
//           mb: { xs: 2, sm: 3 },
//           borderRadius: { xs: 2, sm: 3 },
//           border: '1px solid',
//           borderColor: alpha('#e2e8f0', 0.5),
//         }}
//       >
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               placeholder={`Search ${role_id === 1 ? 'users' : 'organizations'}...`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size={isMobile ? "small" : "medium"}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: '#0f766e', fontSize: { xs: 18, sm: 20 } }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: { xs: 2, sm: 3 },
//                   bgcolor: alpha('#0f766e', 0.05),
//                   fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                 startIcon={<CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                 onClick={handleDateFilterClick}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: '#e2e8f0',
//                   color: '#64748b',
//                   fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                   '&:hover': {
//                     borderColor: '#0f766e',
//                     color: '#0f766e',
//                   },
//                 }}
//               >
//                 Date Filter
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> : <ArrowDownwardIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                 onClick={handleSort}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   borderColor: '#e2e8f0',
//                   color: '#64748b',
//                   fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                   '&:hover': {
//                     borderColor: '#0f766e',
//                     color: '#0f766e',
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
//           },
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//               Start Date
//             </Typography>
//             <DatePicker
//               value={startDate}
//               onChange={setStartDate}
//               renderInput={(params) => (
//                 <TextField {...params} fullWidth size="small" />
//               )}
//             />
//           </Box>
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//               End Date
//             </Typography>
//             <DatePicker
//               value={endDate}
//               onChange={setEndDate}
//               renderInput={(params) => (
//                 <TextField {...params} fullWidth size="small" />
//               )}
//             />
//           </Box>
//           <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
//             <Button size="small" onClick={clearDateFilter} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//               Clear
//             </Button>
//             <Button size="small" variant="contained" onClick={applyDateFilter} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
//               Apply
//             </Button>
//           </Box>
//         </LocalizationProvider>
//       </Menu>

//       {/* Tabs */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: { xs: 2, sm: 3 },
//           border: '1px solid',
//           borderColor: alpha('#e2e8f0', 0.5),
//           overflow: 'hidden',
//         }}
//       >
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             variant={isMobile ? "fullWidth" : "standard"}
//             sx={{
//               '& .MuiTab-root': {
//                 textTransform: 'none',
//                 fontWeight: 600,
//                 fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.95rem' },
//                 minHeight: { xs: 48, sm: 56, md: 64 },
//                 px: { xs: 1, sm: 2 },
//               },
//               '& .Mui-selected': {
//                 color: '#0f766e !important',
//               },
//               '& .MuiTabs-indicator': {
//                 bgcolor: '#0f766e',
//               },
//             }}
//           >
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
//                   <CheckCircleIcon sx={{ color: '#22c55e', fontSize: { xs: 16, sm: 20 } }} />
//                   <span>Active</span>
//                   {!isLoading && (
//                     <Chip
//                       label={activeUsers.length}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha('#22c55e', 0.1),
//                         color: '#22c55e',
//                         fontWeight: 600,
//                         fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
//                         height: { xs: 16, sm: 20 },
//                       }}
//                     />
//                   )}
//                 </Box>
//               }
//             />
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
//                   <CancelIcon sx={{ color: '#64748b', fontSize: { xs: 16, sm: 20 } }} />
//                   <span>Inactive</span>
//                   {!isLoading && (
//                     <Chip
//                       label={inactiveUsers.length}
//                       size="small"
//                       sx={{
//                         bgcolor: alpha('#64748b', 0.1),
//                         color: '#64748b',
//                         fontWeight: 600,
//                         fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
//                         height: { xs: 16, sm: 20 },
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
//           <Box sx={{ p: { xs: 1, sm: 2 } }}>
//             {!isLoading && isBulkMode && (
//               <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Checkbox
//                   checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
//                   indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
//                   onChange={handleSelectAll}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{ color: '#0f766e' }}
//                 />
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
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
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                   },
//                   '.MuiTablePagination-selectLabel': {
//                     fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                   },
//                 }}
//               />
//             )}
//           </Box>
//         )}

//         {/* Card View */}
//         {viewMode === 'card' && (
//           <Box sx={{ p: { xs: 1, sm: 2 } }}>
//             {!isLoading && isBulkMode && (
//               <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Checkbox
//                   checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
//                   indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
//                   onChange={handleSelectAll}
//                   size={isMobile ? "small" : "medium"}
//                   sx={{ color: '#0f766e' }}
//                 />
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
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
//                   <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                     <Button
//                       variant="outlined"
//                       onClick={() => setPage(page + 1)}
//                       disabled={(page + 1) * rowsPerPage >= currentUsers.length}
//                       size={isMobile ? "small" : "medium"}
//                       sx={{
//                         borderColor: '#0f766e',
//                         color: '#0f766e',
//                         fontSize: { xs: '0.7rem', sm: '0.8rem' },
//                         '&:hover': {
//                           borderColor: '#0a5c55',
//                           bgcolor: alpha('#0f766e', 0.1),
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

//       {/* User Limit Modal */}
//       <Dialog
//         open={showLimitModal}
//         onClose={() => setShowLimitModal(false)}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isSmallMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: { xs: 0, sm: 4 },
//             p: { xs: 1, sm: 2 },
//             m: { xs: 0, sm: 2 },
//           },
//         }}
//       >
//         <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
//           <Box
//             sx={{
//               width: { xs: 60, sm: 80 },
//               height: { xs: 60, sm: 80 },
//               borderRadius: '50%',
//               bgcolor: isExpired ? alpha('#ef4444', 0.1) : alpha('#f59e0b', 0.1),
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               mx: 'auto',
//               mb: 2,
//             }}
//           >
//             <AddIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: isExpired ? '#ef4444' : '#f59e0b' }} />
//           </Box>
//           <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
//             {isExpired ? 'Subscription Expired' : 'User Limit Reached'}
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText textAlign="center" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//             {isExpired
//               ? 'Your subscription has expired. Renew now to continue adding users.'
//               : `You've reached the maximum limit of ${maxUser} users. Upgrade your plan to add more.`}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{ 
//           justifyContent: 'center', 
//           gap: { xs: 1, sm: 2 }, 
//           pb: { xs: 2, sm: 3 },
//           flexDirection: { xs: 'column', sm: 'row' },
//         }}>
//           <Button
//             variant="outlined"
//             onClick={() => setShowLimitModal(false)}
//             fullWidth={isSmallMobile}
//             sx={{
//               borderColor: '#e2e8f0',
//               color: '#64748b',
//               px: { xs: 2, sm: 4 },
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => navigate('/payment-plans')}
//             fullWidth={isSmallMobile}
//             sx={{
//               bgcolor: isExpired ? '#ef4444' : '#f59e0b',
//               '&:hover': {
//                 bgcolor: isExpired ? '#dc2626' : '#d97706',
//               },
//               px: { xs: 2, sm: 4 },
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
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





// With Skelaton
import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
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
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

// Skeleton Components
const TableRowSkeleton = ({ isBulkMode, isMobile, isTablet }) => {
  return (
    <TableRow>
      {isBulkMode && (
        <TableCell padding="checkbox" sx={{ pl: 2 }}>
          <Skeleton variant="circular" width={20} height={20} />
        </TableCell>
      )}
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={100} height={20} />
        </Box>
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={150} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 3 }} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} height={20} />
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="circular" width={28} height={28} />
          <Skeleton variant="circular" width={28} height={28} />
        </Box>
      </TableCell>
    </TableRow>
  );
};

const UserCardSkeleton = ({ isBulkMode, isMobile }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: alpha('#e2e8f0', 0.5),
          height: '100%',
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {isBulkMode && (
            <Box sx={{ mb: 2 }}>
              <Skeleton variant="circular" width={20} height={20} />
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
            <Skeleton variant="circular" width={56} height={56} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="60%" height={16} />
            </Box>
          </Box>

          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width={40} height={16} />
              <Skeleton variant="rounded" width={60} height={20} sx={{ borderRadius: 3 }} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton variant="text" width={40} height={16} />
              <Skeleton variant="text" width={80} height={16} />
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

const TabPanelSkeleton = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ px: { xs: 1, sm: 2 } }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton
                variant="rounded"
                height={200}
                sx={{ borderRadius: 3 }}
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
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: { xs: 2, sm: 3 },
        borderRadius: { xs: 2, sm: 3 },
        border: '1px solid',
        borderColor: alpha('#e2e8f0', 0.5),
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <Skeleton 
            variant="rounded" 
            height={isMobile ? 40 : 56} 
            sx={{ borderRadius: { xs: 2, sm: 3 } }} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            flexWrap: 'wrap'
          }}>
            <Skeleton variant="rounded" width={isMobile ? 100 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" width={isMobile ? 100 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2 }} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Tabs Skeleton
const TabsSkeleton = ({ isMobile }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 2, sm: 3 },
        border: '1px solid',
        borderColor: alpha('#e2e8f0', 0.5),
        overflow: 'hidden',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Skeleton variant="rounded" width={isMobile ? 100 : 150} height={40} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rounded" width={isMobile ? 100 : 150} height={40} sx={{ borderRadius: 2 }} />
        </Box>
      </Box>
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
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
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// User Card Component
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
          borderRadius: 3,
          border: '1px solid',
          borderColor: isSelected ? '#0f766e' : alpha('#e2e8f0', 0.5),
          boxShadow: isSelected ? '0 8px 20px -8px #0f766e' : '0 2px 10px rgba(0,0,0,0.03)',
          transition: 'all 0.3s ease',
          height: '100%',
          '&:hover': {
            transform: !isMobile ? 'translateY(-4px)' : 'none',
            boxShadow: !isMobile ? '0 20px 30px -10px rgba(15, 118, 110, 0.2)' : 'none',
            borderColor: '#0f766e',
          },
        }}
      >
        {isBulkMode && (
          <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1 }}>
            <Checkbox
              checked={isSelected}
              onChange={() => onSelect(user._id)}
              sx={{
                color: '#0f766e',
                '&.Mui-checked': {
                  color: '#0f766e',
                },
              }}
            />
          </Box>
        )}

        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: 2 }}>
            <Avatar
              src={user?.avtar}
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                bgcolor: alpha('#0f766e', 0.1),
                color: '#0f766e',
                border: '2px solid',
                borderColor: alpha('#0f766e', 0.2),
              }}
            >
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h6" fontWeight={600} color="#1e293b" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Status
              </Typography>
              <Chip
                label={user.isActive ? "Active" : "Inactive"}
                size="small"
                sx={{
                  bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha('#64748b', 0.1),
                  color: user.isActive ? '#22c55e' : '#64748b',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 20,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Joined
              </Typography>
              <Typography variant="caption" fontWeight={500}>
                {moment(user.createdAt).format("MMM D, YYYY")}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Tooltip title="View Details">
              <IconButton
                size="small"
                onClick={() => onView(user)}
                sx={{
                  color: '#0f766e',
                  '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(user)}
                sx={{
                  color: '#f59e0b',
                  '&:hover': { bgcolor: alpha('#f59e0b', 0.1) },
                }}
              >
                <EditIcon fontSize="small" />
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
                }}
              >
                {isDeleting ? <CircularProgress size={16} /> : <DeleteIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 

// Responsive Table Component
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
  if (loading) {
    return (
      <TableContainer sx={{ 
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha('#0f766e', 0.3),
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
        backgroundColor: alpha('#0f766e', 0.3),
        borderRadius: '3px',
      },
    }}>
      <Table sx={{ minWidth: isMobile ? 600 : isTablet ? 700 : 800 }}>
        <TableHead>
          <TableRow>
            {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
              User
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
                Joined Date
                {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              </Box>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
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
                    e.currentTarget.style.backgroundColor = alpha('#0f766e', 0.05);
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
                      sx={{ color: '#0f766e' }}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    <Avatar
                      src={user.avtar}
                      sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        bgcolor: alpha('#0f766e', 0.1),
                        color: '#0f766e',
                      }}
                    >
                      {user.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' } }}>
                  {user.email}
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha('#64748b', 0.1),
                      color: user.isActive ? '#22c55e' : '#64748b',
                      fontWeight: 600,
                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
                      height: { xs: 20, sm: 24 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' } }}>
                  {moment(user.createdAt).format('MMM D, YYYY')}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() => handleView(user)}
                        sx={{ color: '#0f766e' }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(user)}
                        sx={{ color: '#f59e0b' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(user)}
                        sx={{ color: '#ef4444' }}
                      >
                        <DeleteIcon fontSize="small" />
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    doc.setTextColor(15, 118, 110);
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
      headStyles: { fillColor: [15, 118, 110], textColor: 255 },
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
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
        {/* Header with title only (no loading) */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          mb: { xs: 2, sm: 3 },
          gap: 2
        }}>
          <Box>
            <Typography 
              variant={isMobile ? "h5" : "h4"}
              fontWeight="800"
              color="#0f766e"
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
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
            <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} />
            <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} />
            <Skeleton variant="circular" width={isMobile ? 36 : 40} height={isMobile ? 36 : 40} />
            <Skeleton variant="rounded" width={isMobile ? 100 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" width={isMobile ? 100 : 120} height={isMobile ? 36 : 40} sx={{ borderRadius: 2 }} />
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
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: { xs: 2, sm: 3 },
        gap: 2
      }}>
        <Box>
          <Typography 
            variant={isMobile ? "h5" : "h4"}
            fontWeight="800"
            color="#0f766e"
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #0f766e, #14b8a6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
            }}
          >
            {role_id === 1 ? 'User Management' : 'Organization Management'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
            {role_id === 1
              ? 'Manage your team members and their access'
              : 'Manage organizations and their users'
            }
          </Typography>
          {userData?.currentPaymentId?.expiresAt && (
            <Chip
              label={`Subscription expires: ${moment(userData.currentPaymentId.expiresAt).format('DD-MM-YYYY')} ${
                moment(userData.currentPaymentId.expiresAt).isAfter(moment())
                  ? `(${moment(userData.currentPaymentId.expiresAt).diff(moment(), 'days')} days left)`
                  : '(Expired)'
              }`}
              size="small"
              sx={{
                mt: 1,
                bgcolor: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
                  ? alpha('#f59e0b', 0.1)
                  : alpha('#ef4444', 0.1),
                color: moment(userData.currentPaymentId.expiresAt).isAfter(moment())
                  ? '#f59e0b'
                  : '#ef4444',
                fontWeight: 500,
                fontSize: { xs: '0.6rem', sm: '0.7rem' },
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
              size={isMobile ? "small" : "medium"}
              sx={{
                color: '#0f766e',
                '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
              }}
            >
              <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none', fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Tooltip>

          <Tooltip title={viewMode === 'table' ? 'Card View' : 'Table View'}>
            <IconButton
              onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
              size={isMobile ? "small" : "medium"}
              sx={{
                color: '#0f766e',
                '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
              }}
            >
              {viewMode === 'table' ? <GridViewIcon sx={{ fontSize: { xs: 20, sm: 24 } }} /> : <TableRowsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Download PDF">
            <IconButton
              onClick={handleDownloadPDF}
              size={isMobile ? "small" : "medium"}
              sx={{
                color: '#0f766e',
                '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
              }}
            >
              <DownloadIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </IconButton>
          </Tooltip>

          {isBulkMode ? (
            <>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setShowDeleteModal(true)}
                disabled={selectedUsers.length === 0 || isDeleting}
                size={isMobile ? "small" : "medium"}
                sx={{
                  bgcolor: '#ef4444',
                  '&:hover': { bgcolor: '#dc2626' },
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
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
                size={isMobile ? "small" : "medium"}
                sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => setIsBulkMode(true)}
              size={isMobile ? "small" : "medium"}
              sx={{
                borderColor: '#0f766e',
                color: '#0f766e',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                '&:hover': {
                  borderColor: '#0a5c55',
                  bgcolor: alpha('#0f766e', 0.1),
                },
              }}
            >
              Bulk Delete
            </Button>
          )}

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddUserClick}
            size={isMobile ? "small" : "medium"}
            sx={{
              bgcolor: '#0f766e',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              '&:hover': { bgcolor: '#0a5c55' },
            }}
          >
            {role_id === 1 ? 'Add User' : 'Add Organization'}
          </Button>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: { xs: 2, sm: 3 },
          borderRadius: { xs: 2, sm: 3 },
          border: '1px solid',
          borderColor: alpha('#e2e8f0', 0.5),
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder={`Search ${role_id === 1 ? 'users' : 'organizations'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#0f766e', fontSize: { xs: 18, sm: 20 } }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: { xs: 2, sm: 3 },
                  bgcolor: alpha('#0f766e', 0.05),
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
                startIcon={<CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                onClick={handleDateFilterClick}
                size={isMobile ? "small" : "medium"}
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  '&:hover': {
                    borderColor: '#0f766e',
                    color: '#0f766e',
                  },
                }}
              >
                Date Filter
              </Button>

              <Button
                variant="outlined"
                startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> : <ArrowDownwardIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                onClick={handleSort}
                size={isMobile ? "small" : "medium"}
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  '&:hover': {
                    borderColor: '#0f766e',
                    color: '#0f766e',
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
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
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
            <Typography variant="subtitle2" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
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
            <Button size="small" onClick={clearDateFilter} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
              Clear
            </Button>
            <Button size="small" variant="contained" onClick={applyDateFilter} sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
              Apply
            </Button>
          </Box>
        </LocalizationProvider>
      </Menu>

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 2, sm: 3 },
          border: '1px solid',
          borderColor: alpha('#e2e8f0', 0.5),
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "fullWidth" : "standard"}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.95rem' },
                minHeight: { xs: 48, sm: 56, md: 64 },
                px: { xs: 1, sm: 2 },
              },
              '& .Mui-selected': {
                color: '#0f766e !important',
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#0f766e',
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <CheckCircleIcon sx={{ color: '#22c55e', fontSize: { xs: 16, sm: 20 } }} />
                  <span>Active</span>
                  {!isLoading && (
                    <Chip
                      label={activeUsers.length}
                      size="small"
                      sx={{
                        bgcolor: alpha('#22c55e', 0.1),
                        color: '#22c55e',
                        fontWeight: 600,
                        fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
                        height: { xs: 16, sm: 20 },
                      }}
                    />
                  )}
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <CancelIcon sx={{ color: '#64748b', fontSize: { xs: 16, sm: 20 } }} />
                  <span>Inactive</span>
                  {!isLoading && (
                    <Chip
                      label={inactiveUsers.length}
                      size="small"
                      sx={{
                        bgcolor: alpha('#64748b', 0.1),
                        color: '#64748b',
                        fontWeight: 600,
                        fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
                        height: { xs: 16, sm: 20 },
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
          <Box sx={{ p: { xs: 1, sm: 2 } }}>
            {!isLoading && isBulkMode && (
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                  onChange={handleSelectAll}
                  size={isMobile ? "small" : "medium"}
                  sx={{ color: '#0f766e' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
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
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  },
                  '.MuiTablePagination-selectLabel': {
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  },
                }}
              />
            )}
          </Box>
        )}

        {/* Card View */}
        {viewMode === 'card' && (
          <Box sx={{ p: { xs: 1, sm: 2 } }}>
            {!isLoading && isBulkMode && (
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
                  onChange={handleSelectAll}
                  size={isMobile ? "small" : "medium"}
                  sx={{ color: '#0f766e' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setPage(page + 1)}
                      disabled={(page + 1) * rowsPerPage >= currentUsers.length}
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        borderColor: '#0f766e',
                        color: '#0f766e',
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        '&:hover': {
                          borderColor: '#0a5c55',
                          bgcolor: alpha('#0f766e', 0.1),
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

      {/* User Limit Modal */}
      <Dialog
        open={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isSmallMobile}
        PaperProps={{
          sx: {
            borderRadius: { xs: 0, sm: 4 },
            p: { xs: 1, sm: 2 },
            m: { xs: 0, sm: 2 },
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Box
            sx={{
              width: { xs: 60, sm: 80 },
              height: { xs: 60, sm: 80 },
              borderRadius: '50%',
              bgcolor: isExpired ? alpha('#ef4444', 0.1) : alpha('#f59e0b', 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <AddIcon sx={{ fontSize: { xs: 30, sm: 40 }, color: isExpired ? '#ef4444' : '#f59e0b' }} />
          </Box>
          <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            {isExpired ? 'Subscription Expired' : 'User Limit Reached'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
            {isExpired
              ? 'Your subscription has expired. Renew now to continue adding users.'
              : `You've reached the maximum limit of ${maxUser} users. Upgrade your plan to add more.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ 
          justifyContent: 'center', 
          gap: { xs: 1, sm: 2 }, 
          pb: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
        }}>
          <Button
            variant="outlined"
            onClick={() => setShowLimitModal(false)}
            fullWidth={isSmallMobile}
            sx={{
              borderColor: '#e2e8f0',
              color: '#64748b',
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/payment-plans')}
            fullWidth={isSmallMobile}
            sx={{
              bgcolor: isExpired ? '#ef4444' : '#f59e0b',
              '&:hover': {
                bgcolor: isExpired ? '#dc2626' : '#d97706',
              },
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
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