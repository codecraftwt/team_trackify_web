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
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  alpha,
  Card,
  CardContent,
  Grid,
  Stack,
  FormControlLabel,
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
  FilterList as FilterIcon,
  Sort as SortIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  People as PeopleIcon,
  Person as PersonIcon,
  GridView as GridViewIcon,
  TableRows as TableRowsIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Business as BusinessIcon,
  AdminPanelSettings as AdminIcon,
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
  deleteUser,
} from "../../redux/slices/userSlice";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import Loader from "../../components/common/Loader";

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

// Admin Card Component - Responsive
const AdminCard = ({
  user,
  onView,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
  isBulkMode,
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
              size={isMobile ? "small" : "medium"}
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
              {user?.name?.charAt(0) || 'A'}
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
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
                Status
              </Typography>
              <Chip
                label={user.isActive ? "Active" : "Inactive"}
                size="small"
                sx={{
                  bgcolor: user.isActive ? alpha('#22c55e', 0.1) : alpha('#64748b', 0.1),
                  color: user.isActive ? '#22c55e' : '#64748b',
                  fontWeight: 600,
                  fontSize: { xs: '0.6rem', sm: '0.7rem' },
                  height: { xs: 18, sm: 20 },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
                Role
              </Typography>
              <Chip
                label={user.role_id === 1 ? "Admin" : "User"}
                size="small"
                sx={{
                  bgcolor: user.role_id === 1 ? alpha('#0f766e', 0.1) : alpha('#64748b', 0.1),
                  color: user.role_id === 1 ? '#0f766e' : '#64748b',
                  fontWeight: 600,
                  fontSize: { xs: '0.6rem', sm: '0.7rem' },
                  height: { xs: 18, sm: 20 },
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
                Joined
              </Typography>
              <Typography variant="caption" fontWeight={500} sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
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
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                }}
              >
                <VisibilityIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={() => onEdit(user)}
                sx={{
                  color: '#f59e0b',
                  '&:hover': { bgcolor: alpha('#f59e0b', 0.1) },
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                }}
              >
                <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
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
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                }}
              >
                {isDeleting ? <CircularProgress size={16} /> : <DeleteIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
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
  isTablet
}) => {
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
          <TableRow sx={{ bgcolor: alpha('#0f766e', 0.05) }}>
            {isBulkMode && <TableCell padding="checkbox" sx={{ pl: 2 }}></TableCell>}
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
              Admin
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
              Role
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={onSort}>
                Joined Date
                {sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
              </Box>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
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
                      size={isMobile ? "small" : "medium"}
                      sx={{ color: '#0f766e' }}
                    />
                  </TableCell>
                )}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    <Avatar
                      src={user.avtar}
                      sx={{
                        width: { xs: 28, sm: 32, md: 40 },
                        height: { xs: 28, sm: 32, md: 40 },
                        bgcolor: alpha('#0f766e', 0.1),
                        color: '#0f766e',
                      }}
                    >
                      {user.name?.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
                      {user.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.75rem' } }}>
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
                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                      height: { xs: 18, sm: 20, md: 24 },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.role_id === 1 ? 'Admin' : 'User'}
                    size="small"
                    icon={user.role_id === 1 ? <AdminIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} /> : <PersonIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
                    sx={{
                      bgcolor: user.role_id === 1 ? alpha('#0f766e', 0.1) : alpha('#64748b', 0.1),
                      color: user.role_id === 1 ? '#0f766e' : '#64748b',
                      fontWeight: 600,
                      fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                      height: { xs: 18, sm: 20, md: 24 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' } }}>
                  {moment(user.createdAt).format('MMM D, YYYY')}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() => handleView(user)}
                        sx={{ 
                          color: '#0f766e',
                          width: { xs: 24, sm: 28, md: 32 },
                          height: { xs: 24, sm: 28, md: 32 },
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(user)}
                        sx={{ 
                          color: '#f59e0b',
                          width: { xs: 24, sm: 28, md: 32 },
                          height: { xs: 24, sm: 28, md: 32 },
                        }}
                      >
                        <EditIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(user)}
                        sx={{ 
                          color: '#ef4444',
                          width: { xs: 24, sm: 28, md: 32 },
                          height: { xs: 24, sm: 28, md: 32 },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
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
const OrganizationDetails = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateFilterAnchor, setDateFilterAnchor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Get admin list from Redux
  const adminList = useSelector((state) => state.user?.adminList || []);
  const loading = useSelector((state) => state.user?.loading || false);

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(getAllAdmins());
    } finally {
      setIsRefreshing(false);
    }
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
  const sortedUsers = [...filterUsersByDateRange(adminList)].sort((a, b) => {
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
    navigate(`/super-admin/admin-details/${user._id}`);
  };

  const handleEdit = (user) => {
    navigate("/add-admin", { state: { user } });
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
        toast.success("Admin deleted successfully!");
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        toast.error("Failed to delete admin");
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
        toast.success(`${selectedUsers.length} admin(s) deleted successfully!`);
        setSelectedUsers([]);
        setIsBulkMode(false);
        setShowDeleteModal(false);
        refreshData();
      })
      .catch(() => {
        toast.error("Failed to delete some admins");
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
    doc.text("Admins Report", 105, 30, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 40, { align: "center" });

    const tableColumn = ["Name", "Email", "Status", "Role", "Joined Date"];
    const tableRows = adminList.map((user) => [
      user.name,
      user.email,
      user.isActive ? "Active" : "Inactive",
      user.role_id === 1 ? "Admin" : "User",
      moment(user.createdAt).format("MMM D, YYYY"),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [15, 118, 110], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save(`admins-${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const handleDateFilterClick = (event) => {
    setDateFilterAnchor(event.currentTarget);
  };

  const handleDateFilterClose = () => {
    setDateFilterAnchor(null);
  };

  const applyDateFilter = () => {
    handleDateFilterClose();
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    handleDateFilterClose();
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const currentUsers = tabValue === 0 ? activeUsers : inactiveUsers;
  const paginatedUsers = currentUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading && !isRefreshing && adminList.length === 0) {
    return <Loader message="Loading admins..." fullScreen size={isMobile ? "medium" : "large"} />;
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
            variant="h4" 
            fontWeight="700" 
            sx={{ 
              color: '#0f766e', 
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
            }}
          >
            Admin Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
            Manage all administrators and their access
          </Typography>
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
              <RefreshIcon sx={{ 
                animation: isRefreshing ? 'spin 1s linear infinite' : 'none', 
                fontSize: { xs: 18, sm: 20, md: 24 } 
              }} />
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
              {viewMode === 'table' ? <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} /> : <TableRowsIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />}
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
              <DownloadIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
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
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
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
                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
              onClick={() => setIsBulkMode(true)}
              size={isMobile ? "small" : "medium"}
              sx={{
                borderColor: '#0f766e',
                color: '#0f766e',
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
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
            startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            onClick={() => navigate("/add-admin")}
            size={isMobile ? "small" : "medium"}
            sx={{
              bgcolor: '#0f766e',
              fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
              '&:hover': { bgcolor: '#0a5c55' },
            }}
          >
            Add Admin
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
              placeholder={isSmallMobile ? "Search..." : "Search admins by name or email..."}
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
                fullWidth={isSmallMobile}
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
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
                fullWidth={isSmallMobile}
                sx={{
                  borderColor: '#e2e8f0',
                  color: '#64748b',
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
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
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                  <CancelIcon sx={{ color: '#64748b', fontSize: { xs: 16, sm: 20 } }} />
                  <span>Inactive</span>
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
                </Box>
              }
            />
          </Tabs>
        </Box>

        {/* Table View */}
        {viewMode === 'table' && (
          <Box sx={{ p: { xs: 1, sm: 2 } }}>
            {isBulkMode && (
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
            />

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
              rowsPerPageOptions={[5, 10, 25, 50]}
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
          </Box>
        )}

        {/* Card View */}
        {viewMode === 'card' && (
          <Box sx={{ p: { xs: 1, sm: 2 } }}>
            {isBulkMode && (
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

            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              <AnimatePresence>
                {paginatedUsers.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user._id}>
                    <AdminCard
                      user={user}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      isSelected={selectedUsers.includes(user._id)}
                      onSelect={handleSelectUser}
                      isBulkMode={isBulkMode}
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
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => !isDeleting && setShowDeleteModal(false)}
        onConfirm={selectedUser ? handleDeleteConfirm : handleBulkDelete}
        title={selectedUser ? "Confirm Deletion" : "Confirm Bulk Deletion"}
        message={
          selectedUser
            ? `Are you sure you want to delete ${selectedUser.name}?`
            : `Are you sure you want to delete ${selectedUsers.length} admins?`
        }
        subMessage="This action cannot be undone."
        loading={isDeleting}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default OrganizationDetails;