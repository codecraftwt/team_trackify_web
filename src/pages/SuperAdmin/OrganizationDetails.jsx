// // import React from 'react'

// // function OrganizationDetails() {
// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }

// // export default OrganizationDetails
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Avatar,
//   Chip,
//   IconButton,
//   Button,
//   TextField,
//   InputAdornment,
//   Tab,
//   Tabs,
//   Badge,
//   Menu,
//   MenuItem,
//   Tooltip,
//   alpha,
//   Card,
//   CardContent,
//   Grid,
//   Stack,
//   FormControlLabel,
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
//   FilterList as FilterIcon,
//   Sort as SortIcon,
//   CalendarToday as CalendarIcon,
//   Close as CloseIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   People as PeopleIcon,
//   Person as PersonIcon,
//   GridView as GridViewIcon,
//   TableRows as TableRowsIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Business as BusinessIcon,
//   AdminPanelSettings as AdminIcon,
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
//   deleteUser,
// } from "../../redux/slices/userSlice";
// import DeleteConfirmModal from "../../components/DeleteConfirmModal";
// import Loader from "../../components/common/Loader";

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

// // Admin Card Component
// const AdminCard = ({
//   user,
//   onView,
//   onEdit,
//   onDelete,
//   isSelected,
//   onSelect,
//   isBulkMode,
//   isDeleting
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
//           '&:hover': {
//             transform: 'translateY(-4px)',
//             boxShadow: '0 20px 30px -10px rgba(15, 118, 110, 0.2)',
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
        
//         <CardContent sx={{ p: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//             <Avatar
//               src={user?.avtar}
//               sx={{
//                 width: 56,
//                 height: 56,
//                 bgcolor: alpha('#0f766e', 0.1),
//                 color: '#0f766e',
//                 border: '2px solid',
//                 borderColor: alpha('#0f766e', 0.2),
//               }}
//             >
//               {user?.name?.charAt(0) || 'A'}
//             </Avatar>
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="h6" fontWeight={600} color="#1e293b">
//                 {user.name}
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
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
//                 Role
//               </Typography>
//               <Chip
//                 label={user.role_id === 1 ? "Admin" : "User"}
//                 size="small"
//                 sx={{
//                   bgcolor: user.role_id === 1 ? alpha('#0f766e', 0.1) : alpha('#64748b', 0.1),
//                   color: user.role_id === 1 ? '#0f766e' : '#64748b',
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

// // Main Component
// const OrganizationDetails = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [tabValue, setTabValue] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState("table");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [isBulkMode, setIsBulkMode] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Get admin list from Redux
//   const adminList = useSelector((state) => state.user?.adminList || []);
//   const loading = useSelector((state) => state.user?.loading || false);

//   useEffect(() => {
//     refreshData();
//   }, [dispatch]);

//   const refreshData = async () => {
//     setIsRefreshing(true);
//     try {
//       await dispatch(getAllAdmins());
//     } finally {
//       setIsRefreshing(false);
//     }
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
//   const sortedUsers = [...filterUsersByDateRange(adminList)].sort((a, b) => {
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
//   };

//   const handleView = (user) => {
//     navigate(`/super-admin/admin-details/${user._id}`);
//   };

//   const handleEdit = (user) => {
//     navigate("/add-admin", { state: { user } });
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
//         toast.success("Admin deleted successfully!");
//         setShowDeleteModal(false);
//         refreshData();
//       })
//       .catch(() => {
//         toast.error("Failed to delete admin");
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
//         toast.success(`${selectedUsers.length} admin(s) deleted successfully!`);
//         setSelectedUsers([]);
//         setIsBulkMode(false);
//         setShowDeleteModal(false);
//         refreshData();
//       })
//       .catch(() => {
//         toast.error("Failed to delete some admins");
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
//     doc.text("Admins Report", 105, 30, { align: "center" });

//     doc.setFontSize(10);
//     doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: "center" });

//     const tableColumn = ["Name", "Email", "Status", "Role", "Joined Date"];
//     const tableRows = adminList.map((user) => [
//       user.name,
//       user.email,
//       user.isActive ? "Active" : "Inactive",
//       user.role_id === 1 ? "Admin" : "User",
//       moment(user.createdAt).format("MMM D, YYYY"),
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 50,
//       styles: { fontSize: 9, cellPadding: 3 },
//       headStyles: { fillColor: [15, 118, 110], textColor: 255 },
//       alternateRowStyles: { fillColor: [240, 240, 240] },
//     });

//     doc.save(`admins-${new Date().toISOString().split("T")[0]}.pdf`);
//   };

//   const handleDateFilterClick = (event) => {
//     setDateFilterAnchor(event.currentTarget);
//   };

//   const handleDateFilterClose = () => {
//     setDateFilterAnchor(null);
//   };

//   const applyDateFilter = () => {
//     handleDateFilterClose();
//   };

//   const clearDateFilter = () => {
//     setStartDate(null);
//     setEndDate(null);
//     handleDateFilterClose();
//   };

//   const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
//   const paginatedUsers = currentUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   if (loading && !isRefreshing && adminList.length === 0) {
//     return <Loader message="Loading admins..." fullScreen />;
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       {/* Header */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, flexWrap: 'wrap', gap: 2 }}>
//         <Box>
//           <Typography variant="h4" fontWeight="700" sx={{ color: '#0f766e', mb: 1 }}>
//             Admin Management
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Manage all administrators and their access
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           <Tooltip title="Refresh">
//             <IconButton
//               onClick={refreshData}
//               disabled={isRefreshing}
//               sx={{
//                 color: '#0f766e',
//                 '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
//               }}
//             >
//               <RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title={viewMode === 'table' ? 'Card View' : 'Table View'}>
//             <IconButton
//               onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
//               sx={{
//                 color: '#0f766e',
//                 '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
//               }}
//             >
//               {viewMode === 'table' ? <GridViewIcon /> : <TableRowsIcon />}
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Download PDF">
//             <IconButton
//               onClick={handleDownloadPDF}
//               sx={{
//                 color: '#0f766e',
//                 '&:hover': { bgcolor: alpha('#0f766e', 0.1) },
//               }}
//             >
//               <DownloadIcon />
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
//                 sx={{
//                   bgcolor: '#ef4444',
//                   '&:hover': { bgcolor: '#dc2626' },
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
//               >
//                 Cancel
//               </Button>
//             </>
//           ) : (
//             <Button
//               variant="outlined"
//               startIcon={<DeleteIcon />}
//               onClick={() => setIsBulkMode(true)}
//               sx={{
//                 borderColor: '#0f766e',
//                 color: '#0f766e',
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
//             onClick={() => navigate("/add-admin")}
//             sx={{
//               bgcolor: '#0f766e',
//               '&:hover': { bgcolor: '#0a5c55' },
//             }}
//           >
//             Add Admin
//           </Button>
//         </Box>
//       </Box>

//       {/* Search and Filters */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: 2,
//           mb: 3,
//           borderRadius: 3,
//           border: '1px solid',
//           borderColor: alpha('#e2e8f0', 0.5),
//         }}
//       >
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               placeholder="Search admins by name or email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: '#0f766e' }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 3,
//                   bgcolor: alpha('#0f766e', 0.05),
//                 },
//               }}
//             />
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
//               <Button
//                 variant="outlined"
//                 startIcon={<CalendarIcon />}
//                 onClick={handleDateFilterClick}
//                 sx={{
//                   borderColor: '#e2e8f0',
//                   color: '#64748b',
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
//                 startIcon={sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
//                 onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
//                 sx={{
//                   borderColor: '#e2e8f0',
//                   color: '#64748b',
//                   '&:hover': {
//                     borderColor: '#0f766e',
//                     color: '#0f766e',
//                   },
//                 }}
//               >
//                 Joined Date {sortOrder === 'asc' ? '↑' : '↓'}
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
//             width: 320,
//             borderRadius: 3,
//             boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//           },
//         }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle2" gutterBottom>
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
//             <Typography variant="subtitle2" gutterBottom>
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
//             <Button size="small" onClick={clearDateFilter}>
//               Clear
//             </Button>
//             <Button size="small" variant="contained" onClick={applyDateFilter}>
//               Apply
//             </Button>
//           </Box>
//         </LocalizationProvider>
//       </Menu>

//       {/* Tabs */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: 3,
//           border: '1px solid',
//           borderColor: alpha('#e2e8f0', 0.5),
//           overflow: 'hidden',
//         }}
//       >
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             sx={{
//               '& .MuiTab-root': {
//                 textTransform: 'none',
//                 fontWeight: 600,
//                 fontSize: '0.95rem',
//                 minHeight: 64,
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
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CheckCircleIcon sx={{ color: '#22c55e' }} />
//                   <span>Active Admins</span>
//                   <Chip
//                     label={activeUsers.length}
//                     size="small"
//                     sx={{
//                       bgcolor: alpha('#22c55e', 0.1),
//                       color: '#22c55e',
//                       fontWeight: 600,
//                     }}
//                   />
//                 </Box>
//               }
//             />
//             <Tab
//               label={
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CancelIcon sx={{ color: '#64748b' }} />
//                   <span>Inactive Admins</span>
//                   <Chip
//                     label={inactiveUsers.length}
//                     size="small"
//                     sx={{
//                       bgcolor: alpha('#64748b', 0.1),
//                       color: '#64748b',
//                       fontWeight: 600,
//                     }}
//                   />
//                 </Box>
//               }
//             />
//           </Tabs>
//         </Box>

//         {/* Table View */}
//         {viewMode === 'table' && (
//           <Box sx={{ p: 2 }}>
//             {isBulkMode && (
//               <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Checkbox
//                   checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
//                   indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
//                   onChange={handleSelectAll}
//                   sx={{ color: '#0f766e' }}
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {selectedUsers.length} selected
//                 </Typography>
//               </Box>
//             )}

//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: alpha('#0f766e', 0.05) }}>
//                     {isBulkMode && <TableCell padding="checkbox"></TableCell>}
//                     <TableCell>Admin</TableCell>
//                     <TableCell>Email</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Role</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                         Joined Date
//                         {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
//                       </Box>
//                     </TableCell>
//                     <TableCell align="right">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <AnimatePresence>
//                     {paginatedUsers.map((user, index) => (
//                       <motion.tr
//                         key={user._id}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         style={{
//                           backgroundColor: index % 2 === 0 ? 'transparent' : alpha('#f8fafc', 0.5),
//                         }}
//                       >
//                         {isBulkMode && (
//                           <TableCell padding="checkbox">
//                             <Checkbox
//                               checked={selectedUsers.includes(user._id)}
//                               onChange={() => handleSelectUser(user._id)}
//                               sx={{ color: '#0f766e' }}
//                             />
//                           </TableCell>
//                         )}
//                         <TableCell>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Avatar
//                               src={user.avtar}
//                               sx={{
//                                 width: 40,
//                                 height: 40,
//                                 bgcolor: alpha('#0f766e', 0.1),
//                                 color: '#0f766e',
//                               }}
//                             >
//                               {user.name?.charAt(0)}
//                             </Avatar>
//                             <Typography variant="body2" fontWeight={500}>
//                               {user.name}
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                         <TableCell>{user.email}</TableCell>
//                         <TableCell>
//                           <Chip
//                             label={user.isActive ? 'Active' : 'Inactive'}
//                             size="small"
//                             sx={{
//                               bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha('#64748b', 0.1),
//                               color: user.isActive ? '#22c55e' : '#64748b',
//                               fontWeight: 600,
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Chip
//                             label={user.role_id === 1 ? 'Admin' : 'User'}
//                             size="small"
//                             icon={user.role_id === 1 ? <AdminIcon sx={{ fontSize: 14 }} /> : <PersonIcon sx={{ fontSize: 14 }} />}
//                             sx={{
//                               bgcolor: user.role_id === 1 ? alpha('#0f766e', 0.1) : alpha('#64748b', 0.1),
//                               color: user.role_id === 1 ? '#0f766e' : '#64748b',
//                               fontWeight: 600,
//                             }}
//                           />
//                         </TableCell>
//                         <TableCell>{moment(user.createdAt).format('MMM D, YYYY')}</TableCell>
//                         <TableCell align="right">
//                           <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
//                             <Tooltip title="View">
//                               <IconButton
//                                 size="small"
//                                 onClick={() => handleView(user)}
//                                 sx={{ color: '#0f766e' }}
//                               >
//                                 <VisibilityIcon fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Edit">
//                               <IconButton
//                                 size="small"
//                                 onClick={() => handleEdit(user)}
//                                 sx={{ color: '#f59e0b' }}
//                               >
//                                 <EditIcon fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete">
//                               <IconButton
//                                 size="small"
//                                 onClick={() => handleDeleteClick(user)}
//                                 sx={{ color: '#ef4444' }}
//                               >
//                                 <DeleteIcon fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                           </Box>
//                         </TableCell>
//                       </motion.tr>
//                     ))}
//                   </AnimatePresence>
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <TablePagination
//               component="div"
//               count={currentUsers.length}
//               page={page}
//               onPageChange={(e, newPage) => setPage(newPage)}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={(e) => {
//                 setRowsPerPage(parseInt(e.target.value, 10));
//                 setPage(0);
//               }}
//               rowsPerPageOptions={[5, 10, 25, 50]}
//               sx={{
//                 '.MuiTablePagination-select': {
//                   borderRadius: 2,
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* Card View */}
//         {viewMode === 'card' && (
//           <Box sx={{ p: 2 }}>
//             {isBulkMode && (
//               <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Checkbox
//                   checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
//                   indeterminate={selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length}
//                   onChange={handleSelectAll}
//                   sx={{ color: '#0f766e' }}
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   {selectedUsers.length} selected
//                 </Typography>
//               </Box>
//             )}

//             <Grid container spacing={2}>
//               <AnimatePresence>
//                 {paginatedUsers.map((user) => (
//                   <Grid item xs={12} sm={6} md={4} key={user._id}>
//                     <AdminCard
//                       user={user}
//                       onView={handleView}
//                       onEdit={handleEdit}
//                       onDelete={handleDeleteClick}
//                       isSelected={selectedUsers.includes(user._id)}
//                       onSelect={handleSelectUser}
//                       isBulkMode={isBulkMode}
//                       isDeleting={isDeleting && selectedUsers.includes(user._id)}
//                     />
//                   </Grid>
//                 ))}
//               </AnimatePresence>
//             </Grid>

//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//               <Button
//                 variant="outlined"
//                 onClick={() => setPage(page + 1)}
//                 disabled={(page + 1) * rowsPerPage >= currentUsers.length}
//                 sx={{
//                   borderColor: '#0f766e',
//                   color: '#0f766e',
//                   '&:hover': {
//                     borderColor: '#0a5c55',
//                     bgcolor: alpha('#0f766e', 0.1),
//                   },
//                 }}
//               >
//                 Load More
//               </Button>
//             </Box>
//           </Box>
//         )}
//       </Paper>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onHide={() => !isDeleting && setShowDeleteModal(false)}
//         onConfirm={selectedUser ? handleDeleteConfirm : handleBulkDelete}
//         title={selectedUser ? "Confirm Deletion" : "Confirm Bulk Deletion"}
//         message={
//           selectedUser
//             ? `Are you sure you want to delete ${selectedUser.name}?`
//             : `Are you sure you want to delete ${selectedUsers.length} admins?`
//         }
//         subMessage="This action cannot be undone."
//         loading={isDeleting}
//       />

//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default OrganizationDetails;


import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "../../components/Navbar";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
  FaPlus,
  FaCog,
  FaChartLine,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaRupeeSign,
  FaEye,
  FaEdit,
  FaTrash,
  FaBusinessTime,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { BiSearch, BiFilter, BiSortUp, BiSortDown } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";
import {
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  InputGroup,
  Table,
  Spinner,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAdmins,
  deleteUser,
} from "../../redux/slices/userSlice";
import { getAllPlans } from "../../redux/slices/planSlice";
import { toast } from "react-toastify";
import moment from "moment";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const OrganizationDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");

  const adminList = useSelector((state) => state.user?.adminList || []);
  const plansList = useSelector((state) => state.plan?.plansList || []);
  const loading = useSelector((state) => state.user?.loading || false);

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  const refreshData = async () => {
    setIsRefreshing(true);
    await Promise.all([
      dispatch(getAllAdmins()),
      dispatch(getAllPlans()),
    ]);
    setIsRefreshing(false);
  };

  const handleDeleteClick = (org) => {
    setSelectedOrg(org);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedOrg) return;
    
    setIsDeleting(true);
    dispatch(deleteUser(selectedOrg._id))
      .unwrap()
      .then(() => {
        toast.success("Organization deleted successfully!");
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        toast.error("Failed to delete organization");
      })
      .finally(() => {
        setIsDeleting(false);
        setSelectedOrg(null);
      });
  };

  const handleViewDetails = (org) => {
    navigate(`/super-admin/organization/${org._id}`, { state: { org } });
  };

  const handleEdit = (org) => {
    navigate("/add-admin", { state: { user: org } });
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter and sort organizations
  const filteredOrgs = adminList.filter((org) => {
    const matchesSearch = 
      org.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.mobile_no?.includes(searchQuery);
    
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" && org.isActive) ||
      (filterStatus === "inactive" && !org.isActive);
    
    const planName = org.currentPaymentId?.planId?.name || "No Plan";
    const matchesPlan = filterPlan === "all" || planName === filterPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const sortedOrgs = [...filteredOrgs].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const activeOrgs = sortedOrgs.filter((org) => org.isActive);
  const inactiveOrgs = sortedOrgs.filter((org) => !org.isActive);

  const getPlanBadgeColor = (planName) => {
    if (planName.includes("Enterprise")) return "primary";
    if (planName.includes("Premium")) return "success";
    if (planName.includes("Standard")) return "warning";
    return "secondary";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  // Stats data
  const stats = [
    {
      label: "Total Organizations",
      value: adminList.length,
      icon: <FaBusinessTime size={24} />,
      bgColor: "rgba(59, 130, 246, 0.1)",
      iconColor: "#3B82F6",
    },
    {
      label: "Active Organizations",
      value: activeOrgs.length,
      icon: <FaUserCheck size={24} />,
      bgColor: "rgba(34, 197, 94, 0.1)",
      iconColor: "#22C55E",
    },
    {
      label: "Inactive Organizations",
      value: inactiveOrgs.length,
      icon: <FaUserTimes size={24} />,
      bgColor: "rgba(239, 68, 68, 0.1)",
      iconColor: "#EF4444",
    },
    {
      label: "Total Users",
      value: adminList.reduce((acc, org) => acc + (org.userCount || 0), 0),
      icon: <FaUsers size={24} />,
      bgColor: "rgba(168, 85, 247, 0.1)",
      iconColor: "#A855F7",
    },
  ];

  // Unique plans for filter
  const uniquePlans = ["all", ...new Set(adminList.map(org => 
    org.currentPaymentId?.planId?.name || "No Plan"
  ))];

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      {/* <Navbar pageTitle="Organization Details" /> */}
      <motion.main
        className="container-fluid py-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="mb-4">
              <Row className="g-3">
                {stats.map((stat, index) => (
                  <Col key={index} xs={12} sm={6} lg={3}>
                    <motion.div
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className="border-0 shadow-sm h-100"
                        style={{
                          borderRadius: "12px",
                          overflow: "hidden",
                          backgroundColor: "#fff",
                        }}
                      >
                        <Card.Body className="p-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p
                                className="text-muted mb-1 small"
                                style={{ fontWeight: 500 }}
                              >
                                {stat.label}
                              </p>
                              <h3
                                className="fw-bold mb-0"
                                style={{
                                  color: "#111827",
                                  fontSize: "1.75rem",
                                }}
                              >
                                {stat.value}
                              </h3>
                            </div>
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                backgroundColor: stat.bgColor,
                              }}
                            >
                              <span style={{ color: stat.iconColor }}>
                                {stat.icon}
                              </span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div variants={itemVariants} className="mb-4">
              <Card
                className="border-0 shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body className="p-4">
                  <Row className="align-items-center g-3">
                    <Col md={5}>
                      <InputGroup>
                        <InputGroup.Text
                          className="border-0"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3B82F6",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                          }}
                        >
                          <BiSearch size={16} />
                        </InputGroup.Text>
                        <Form.Control
                          placeholder="Search by name, email or phone..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border-0"
                          style={{
                            background: "rgba(59, 130, 246, 0.05)",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px",
                          }}
                        />
                      </InputGroup>
                    </Col>

                    <Col md={3}>
                      <InputGroup>
                        <InputGroup.Text
                          className="border-0"
                          style={{
                            background: "rgba(168, 85, 247, 0.1)",
                            color: "#A855F7",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                          }}
                        >
                          <BiFilter size={16} />
                        </InputGroup.Text>
                        <Form.Select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="border-0"
                          style={{
                            background: "rgba(168, 85, 247, 0.05)",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px",
                          }}
                        >
                          <option value="all">All Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col md={2}>
                      <InputGroup>
                        <InputGroup.Text
                          className="border-0"
                          style={{
                            background: "rgba(34, 197, 94, 0.1)",
                            color: "#22C55E",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                          }}
                        >
                          <FaUsers size={16} />
                        </InputGroup.Text>
                        <Form.Select
                          value={filterPlan}
                          onChange={(e) => setFilterPlan(e.target.value)}
                          className="border-0"
                          style={{
                            background: "rgba(34, 197, 94, 0.05)",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px",
                          }}
                        >
                          <option value="all">All Plans</option>
                          {uniquePlans.slice(1).map((plan, idx) => (
                            <option key={idx} value={plan}>
                              {plan}
                            </option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col md={2} className="text-end">
                      <Button
                        variant="light"
                        className="d-flex align-items-center gap-2"
                        onClick={refreshData}
                        disabled={isRefreshing}
                        style={{
                          background: "rgba(59, 130, 246, 0.1)",
                          color: "#3B82F6",
                          border: "none",
                        }}
                      >
                        <FiRefreshCw className={isRefreshing ? "spin" : ""} />
                        <span>Refresh</span>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>

            {/* Organizations Table */}
            <motion.div variants={itemVariants}>
              <Card
                className="border-0 shadow-sm"
                style={{ borderRadius: "12px", overflow: "hidden" }}
              >
                <Card.Header
                  className="border-0 p-4"
                  style={{
                    background: "linear-gradient(135deg, #0f766e, #0a5c55)",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="text-white fw-bold mb-1">
                        Organizations List
                      </h5>
                      <p className="text-white-50 mb-0 small">
                        Complete list of all registered organizations
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="light"
                        size="sm"
                        onClick={handleSort}
                        className="d-flex align-items-center gap-2"
                      >
                        {sortOrder === "asc" ? <BiSortUp /> : <BiSortDown />}
                        <span>Joined Date</span>
                      </Button>
                      <Badge
                        bg="light"
                        className="text-primary px-3 py-2 rounded-pill"
                        style={{ fontSize: "14px" }}
                      >
                        <FaUsers className="me-2" />
                        {sortedOrgs.length} Results
                      </Badge>
                    </div>
                  </div>
                </Card.Header>

                <Card.Body className="p-0">
                  {loading || isRefreshing ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" variant="primary" />
                      <p className="mt-3 text-muted">
                        Loading organizations...
                      </p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <Table className="mb-0" style={{ fontSize: "0.85rem" }}>
                        <thead>
                          <tr style={{ background: "rgba(15, 118, 110, 0.05)" }}>
                            <th className="border-0 p-3">Organization</th>
                            <th className="border-0 p-3">Contact</th>
                            <th className="border-0 p-3">Plan</th>
                            <th className="border-0 p-3">Status</th>
                            <th className="border-0 p-3">Users</th>
                            <th className="border-0 p-3">Joined Date</th>
                            <th className="border-0 p-3 text-end">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedOrgs.length > 0 ? (
                            sortedOrgs.map((org, index) => {
                              const rowBg = index % 2 === 0 ? "#f1f3f4" : "#fff";
                              const planName = org.currentPaymentId?.planId?.name || "No Plan";
                              
                              return (
                                <motion.tr
                                  key={org._id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  style={{
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    Array.from(e.currentTarget.children).forEach(
                                      (td) => {
                                        td.style.background = "rgba(15, 118, 110, 0.1)";
                                      }
                                    );
                                  }}
                                  onMouseLeave={(e) => {
                                    Array.from(e.currentTarget.children).forEach(
                                      (td) => {
                                        td.style.background = rowBg;
                                      }
                                    );
                                  }}
                                >
                                  <td
                                    className="border-0 p-3"
                                    style={{ background: rowBg }}
                                  >
                                    <div className="d-flex align-items-center">
                                      <div
                                        className="d-flex align-items-center justify-content-center me-3"
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                          background: "linear-gradient(135deg, #0f766e, #0a5c55)",
                                          color: "white",
                                          fontSize: "14px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {org.name?.charAt(0)}
                                      </div>
                                      <div>
                                        <div
                                          className="fw-semibold"
                                          style={{ color: "#1f2937" }}
                                        >
                                          {org.name}
                                        </div>
                                        <div className="text-muted small">
                                          ID: {org._id.slice(-8)}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td
                                    className="border-0 p-3"
                                    style={{ background: rowBg }}
                                  >
                                    <div className="d-flex align-items-center mb-1">
                                      <FaEnvelope
                                        size={12}
                                        className="me-2 text-muted"
                                      />
                                      <small>{org.email}</small>
                                    </div>
                                    {org.mobile_no && (
                                      <div className="d-flex align-items-center">
                                        <FaPhone
                                          size={12}
                                          className="me-2 text-muted"
                                        />
                                        <small>{org.mobile_no}</small>
                                      </div>
                                    )}
                                  </td>
                                  <td
                                    className="border-0 p-3"
                                    style={{ background: rowBg }}
                                  >
                                    <Badge
                                      bg={getPlanBadgeColor(planName)}
                                      className="rounded-pill px-3 py-2"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {planName}
                                    </Badge>
                                  </td>
                                  <td
                                    className="border-0 p-3"
                                    style={{ background: rowBg }}
                                  >
                                    <Badge
                                      bg={org.isActive ? "success" : "danger"}
                                      className="rounded-pill px-3 py-2"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {org.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                  </td>
                                  <td
                                    className="border-0 p-3"
                                    style={{ background: rowBg }}
                                  >
                                    <div className="d-flex align-items-center">
                                      <FaUsers
                                        size={14}
                                        className="me-2 text-primary"
                                      />
                                      <span className="fw-semibold">
                                        {org.userCount || 0}
                                      </span>
                                    </div>
                                  </td>
                                  <td
                                    className="border-0 p-3"
                                    style={{ background: rowBg }}
                                  >
                                    <div className="d-flex align-items-center">
                                      <FaCalendarAlt
                                        size={12}
                                        className="me-2 text-muted"
                                      />
                                      <small>
                                        {moment(org.createdAt).format("DD MMM YYYY")}
                                      </small>
                                    </div>
                                  </td>
                                  <td
                                    className="border-0 p-3 text-end"
                                    style={{ background: rowBg }}
                                  >
                                    <Button
                                      variant="link"
                                      className="p-0 me-2"
                                      onClick={() => handleViewDetails(org)}
                                      style={{ color: "#0f766e" }}
                                    >
                                      <FaEye size={16} />
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="p-0 me-2"
                                      onClick={() => handleEdit(org)}
                                      style={{ color: "#f59e0b" }}
                                    >
                                      <FaEdit size={16} />
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="p-0"
                                      onClick={() => handleDeleteClick(org)}
                                      style={{ color: "#ef4444" }}
                                    >
                                      <FaTrash size={16} />
                                    </Button>
                                  </td>
                                </motion.tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={7} className="text-center py-5">
                                <FaBusinessTime
                                  size={48}
                                  className="text-muted mb-3"
                                />
                                <h6 className="text-muted">
                                  No organizations found
                                </h6>
                                <p className="text-muted small">
                                  {searchQuery || filterStatus !== "all" || filterPlan !== "all"
                                    ? "Try adjusting your filters"
                                    : "No organizations have been added yet"}
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Organization"
        message={`Are you sure you want to delete ${selectedOrg?.name}?`}
        subMessage="This organization will be hidden and access will be blocked, but not permanently deleted."
        loading={isDeleting}
      />

      <style jsx>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OrganizationDetails;