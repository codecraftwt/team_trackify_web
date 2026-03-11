// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getAllCoupons,
//   createCoupon,
//   updateCoupon,
//   deleteCoupon,
//   setFilters,
//   resetFilters,
// } from '../../redux/slices/couponSlice';

// // MUI Components
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   IconButton,
//   Chip,
//   InputAdornment,
//   Skeleton,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
//   alpha
// } from '@mui/material';

// // MUI Icons
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   Close as CloseIcon,
//   Refresh as RefreshIcon,
// } from '@mui/icons-material';

// // Custom Modal Components
// import Modal from '../../components/common/Modal';
// import DeleteConfirmModal from '../../components/DeleteConfirmModal'; 

// // Stats Card Skeleton Component
// const StatsCardSkeleton = ({ count = 5 }) => {
//   return (
//     <Grid container spacing={2} sx={{ mb: 4 }}>
//       {[...Array(count)].map((_, i) => (
//         <Grid item xs={12} sm={6} md={2.4} key={i}>
//           <Card>
//             <CardContent>
//               <Skeleton variant="text" width="60%" height={24} />
//               <Skeleton variant="text" width="40%" height={40} />
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// // Table Skeleton Component
// const TableSkeleton = ({ rows = 5, columns = 8 }) => {
//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Header Skeleton */}
//       <Box sx={{ display: 'flex', mb: 2, bgcolor: 'grey.50', p: 2 }}>
//         {[...Array(columns)].map((_, i) => (
//           <Box key={i} sx={{ flex: 1, px: 1 }}>
//             <Skeleton variant="text" width="75%" height={20} />
//           </Box>
//         ))}
//       </Box>

//       {/* Rows Skeleton */}
//       {[...Array(rows)].map((_, rowIndex) => (
//         <Box key={rowIndex} sx={{ display: 'flex', py: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
//           {[...Array(columns)].map((_, colIndex) => (
//             <Box key={colIndex} sx={{ flex: 1, px: 1 }}>
//               {colIndex === 0 ? (
//                 <Skeleton variant="rounded" width={80} height={32} />
//               ) : colIndex === 5 || colIndex === 6 ? (
//                 <Skeleton variant="rounded" width={80} height={24} />
//               ) : (
//                 <Skeleton variant="text" width="80%" height={24} />
//               )}
//             </Box>
//           ))}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// const CouponManagement = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   const {
//     coupons,
//     loading,
//     stats,
//     pagination,
//     filters,
//     createLoading,
//     updateLoading,
//     deleteLoading
//   } = useSelector((state) => state.coupon);

//   const { user } = useSelector((state) => state.auth);

//   const [showModal, setShowModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedCoupon, setSelectedCoupon] = useState(null);
//   const [formData, setFormData] = useState({
//     description: '',
//     discountType: 'percentage',
//     discountValue: '',
//     minAmount: 0,
//     status: 'active'
//   });
//   const [searchInput, setSearchInput] = useState('');
//   const [formErrors, setFormErrors] = useState({});
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);

//   // Check if user is superadmin (role_id = 2)
//   const isSuperAdmin = user?.role_id === 2;

//   useEffect(() => {
//     loadCoupons();
//   }, [dispatch, page, rowsPerPage, filters]);

//   const loadCoupons = () => {
//     const params = {
//       page: page + 1,
//       limit: rowsPerPage,
//       ...filters
//     };
//     // Remove empty filters
//     Object.keys(params).forEach(key => {
//       if (!params[key] || params[key] === '') delete params[key];
//     });
//     dispatch(getAllCoupons(params));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(0);
//     dispatch(setFilters({ search: searchInput }));
//   };

//   const handleFilterChange = (key, value) => {
//     setPage(0);
//     dispatch(setFilters({ [key]: value }));
//   };

//   const handleResetFilters = () => {
//     dispatch(resetFilters());
//     setSearchInput('');
//     setPage(0);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.description.trim()) {
//       errors.description = 'Description is required';
//     }
//     if (!formData.discountValue) {
//       errors.discountValue = 'Discount value is required';
//     } else if (formData.discountType === 'percentage' && (formData.discountValue < 1 || formData.discountValue > 100)) {
//       errors.discountValue = 'Percentage must be between 1 and 100';
//     } else if (formData.discountType === 'fixed' && formData.discountValue < 1) {
//       errors.discountValue = 'Fixed discount must be greater than 0';
//     }
//     if (formData.minAmount < 0) {
//       errors.minAmount = 'Minimum amount cannot be negative';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const couponData = {
//       ...formData,
//       discountValue: Number(formData.discountValue),
//       minAmount: Number(formData.minAmount)
//     };

//     if (selectedCoupon) {
//       await dispatch(updateCoupon({
//         id: selectedCoupon._id,
//         data: couponData
//       }));
//     } else {
//       await dispatch(createCoupon(couponData));
//     }

//     setShowModal(false);
//     resetForm();
//     loadCoupons();
//   };

//   const handleDelete = async () => {
//     if (selectedCoupon) {
//       await dispatch(deleteCoupon(selectedCoupon._id));
//       setShowDeleteModal(false);
//       setSelectedCoupon(null);
//       loadCoupons();
//     }
//   };

//   const openCreateModal = () => {
//     setSelectedCoupon(null);
//     resetForm();
//     setShowModal(true);
//   };

//   const openEditModal = (coupon) => {
//     setSelectedCoupon(coupon);
//     setFormData({
//       description: coupon.description || '',
//       discountType: coupon.discountType || 'percentage',
//       discountValue: coupon.discountValue || '',
//       minAmount: coupon.minAmount || 0,
//       status: coupon.status || 'active'
//     });
//     setFormErrors({});
//     setShowModal(true);
//   };

//   const openDeleteModal = (coupon) => {
//     setSelectedCoupon(coupon);
//     setShowDeleteModal(true);
//   };

//   const resetForm = () => {
//     setFormData({
//       description: '',
//       discountType: 'percentage',
//       discountValue: '',
//       minAmount: 0,
//       status: 'active'
//     });
//     setFormErrors({});
//   };

//   const getStatusChip = (status) => {
//     const statusConfig = {
//       active: { color: 'success', label: 'Active' },
//       inactive: { color: 'warning', label: 'Inactive' },
//       expired: { color: 'error', label: 'Expired' }
//     };
//     const config = statusConfig[status] || statusConfig.inactive;

//     return (
//       <Chip 
//         label={config.label} 
//         color={config.color} 
//         size="small"
//         sx={{ fontWeight: 500 }}
//       />
//     );
//   };

//   const getDiscountTypeChip = (type) => {
//     return type === 'percentage' ? (
//       <Chip 
//         label="Percentage" 
//         color="primary" 
//         size="small"
//         variant="outlined"
//         sx={{ fontWeight: 500 }}
//       />
//     ) : (
//       <Chip 
//         label="Fixed" 
//         color="secondary" 
//         size="small"
//         variant="outlined"
//         sx={{ fontWeight: 500 }}
//       />
//     );
//   };

//   // Format date function
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
//       <Box sx={{ maxWidth: '1400px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//           <Box>
//             <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
//               Coupon Management
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               Create and manage discount coupons for your customers
//             </Typography>
//           </Box>
//           {isSuperAdmin && (
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<AddIcon />}
//               onClick={openCreateModal}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 boxShadow: theme.shadows[2],
//                 '&:hover': {
//                   boxShadow: theme.shadows[4]
//                 }
//               }}
//             >
//               New Coupon
//             </Button>
//           )}
//         </Box>

//         {/* Stats Cards */}
//         {loading ? (
//           <StatsCardSkeleton count={5} />
//         ) : (
//           <Grid container spacing={3} sx={{ mb: 4 }}>
//             <Grid item xs={12} sm={6} md={2.4}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Total Coupons
//                   </Typography>
//                   <Typography variant="h4" component="div" fontWeight="bold">
//                     {stats?.totalCoupons || 0}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={2.4}>
//               <Card sx={{ height: '100%', bgcolor: alpha(theme.palette.success.main, 0.1) }}>
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Active
//                   </Typography>
//                   <Typography variant="h4" component="div" fontWeight="bold" color="success.main">
//                     {stats?.activeCoupons || 0}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={2.4}>
//               <Card sx={{ height: '100%', bgcolor: alpha(theme.palette.warning.main, 0.1) }}>
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Inactive
//                   </Typography>
//                   <Typography variant="h4" component="div" fontWeight="bold" color="warning.main">
//                     {stats?.inactiveCoupons || 0}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={2.4}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Total Used
//                   </Typography>
//                   <Typography variant="h4" component="div" fontWeight="bold">
//                     {stats?.totalUsedCount || 0}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={2.4}>
//               <Card sx={{ height: '100%', bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
//                 <CardContent>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Active Rate
//                   </Typography>
//                   <Typography variant="h4" component="div" fontWeight="bold" color="primary.main">
//                     {stats?.totalCoupons ? Math.round((stats.activeCoupons / stats.totalCoupons) * 100) : 0}%
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         )}

//         {/* Filters */}
//         <Paper sx={{ p: 3, mb: 4 }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <form onSubmit={handleSearch}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   placeholder="Search by code or description..."
//                   value={searchInput}
//                   onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon color="action" />
//                       </InputAdornment>
//                     ),
//                     endAdornment: searchInput && (
//                       <InputAdornment position="end">
//                         <IconButton size="small" onClick={() => setSearchInput('')}>
//                           <CloseIcon fontSize="small" />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }}
//                 />
//               </form>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={filters?.status || ''}
//                   label="Status"
//                   onChange={(e) => handleFilterChange('status', e.target.value)}
//                 >
//                   <MenuItem value="">All Status</MenuItem>
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="inactive">Inactive</MenuItem>
//                   <MenuItem value="expired">Expired</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>Discount Type</InputLabel>
//                 <Select
//                   value={filters?.discountType || ''}
//                   label="Discount Type"
//                   onChange={(e) => handleFilterChange('discountType', e.target.value)}
//                 >
//                   <MenuItem value="">All Types</MenuItem>
//                   <MenuItem value="percentage">Percentage</MenuItem>
//                   <MenuItem value="fixed">Fixed</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           {(filters?.search || filters?.status || filters?.discountType) && (
//             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 size="small"
//                 startIcon={<CloseIcon />}
//                 onClick={handleResetFilters}
//               >
//                 Clear Filters
//               </Button>
//             </Box>
//           )}
//         </Paper>

//         {/* Coupons Table */}
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//           {loading ? (
//             <TableSkeleton rows={5} columns={isSuperAdmin ? 9 : 8} />
//           ) : (
//             <>
//               <TableContainer sx={{ maxHeight: 600 }}>
//                 <Table stickyHeader>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Code</TableCell>
//                       <TableCell>Description</TableCell>
//                       <TableCell>Discount</TableCell>
//                       <TableCell>Min. Amount</TableCell>
//                       <TableCell>Used</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Type</TableCell>
//                       <TableCell>Created</TableCell>
//                       {isSuperAdmin && <TableCell align="right">Actions</TableCell>}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {coupons?.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={isSuperAdmin ? 9 : 8} align="center" sx={{ py: 8 }}>
//                           <Typography variant="body1" color="text.secondary">
//                             No coupons found
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       coupons?.map((coupon) => (
//                         <TableRow key={coupon._id} hover>
//                           <TableCell>
//                             <Chip 
//                               label={coupon.code} 
//                               color="primary" 
//                               size="small"
//                               variant="outlined"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2" sx={{ maxWidth: 200 }} noWrap>
//                               {coupon.description}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2" fontWeight="medium">
//                               {coupon.discountType === 'percentage' ? (
//                                 <>{coupon.discountValue}%</>
//                               ) : (
//                                 <>₹{coupon.discountValue}</>
//                               )}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2">
//                               {coupon.minAmount > 0 ? `₹${coupon.minAmount}` : 'No min'}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2">
//                               {coupon.usedCount || 0}
//                             </Typography>
//                           </TableCell>
//                           <TableCell>
//                             {getStatusChip(coupon.status)}
//                           </TableCell>
//                           <TableCell>
//                             {getDiscountTypeChip(coupon.discountType)}
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2" color="text.secondary">
//                               {formatDate(coupon.createdAt)}
//                             </Typography>
//                           </TableCell>
//                           {isSuperAdmin && (
//                             <TableCell align="right">
//                               <IconButton
//                                 size="small"
//                                 onClick={() => openEditModal(coupon)}
//                                 sx={{ mr: 1, color: 'primary.main' }}
//                               >
//                                 <EditIcon fontSize="small" />
//                               </IconButton>
//                               <IconButton
//                                 size="small"
//                                 onClick={() => openDeleteModal(coupon)}
//                                 sx={{ color: 'error.main' }}
//                               >
//                                 <DeleteIcon fontSize="small" />
//                               </IconButton>
//                             </TableCell>
//                           )}
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>

//               {/* Pagination */}
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, 50]}
//                 component="div"
//                 count={pagination?.totalItems || 0}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </>
//           )}
//         </Paper>
//       </Box>

//       {/* Create/Edit Modal */}
//       <Modal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           resetForm();
//         }}
//         title={selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
//         size="md"
//       >
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <Grid container spacing={2}>
//             {/* Description */}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Description"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 error={!!formErrors.description}
//                 helperText={formErrors.description}
//                 required
//               />
//             </Grid>

//             {/* Discount Type and Value */}
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Discount Type</InputLabel>
//                 <Select
//                   value={formData.discountType}
//                   label="Discount Type"
//                   onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
//                 >
//                   <MenuItem value="percentage">Percentage (%)</MenuItem>
//                   <MenuItem value="fixed">Fixed (₹)</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Discount Value"
//                 value={formData.discountValue}
//                 onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
//                 error={!!formErrors.discountValue}
//                 helperText={formErrors.discountValue}
//                 inputProps={{
//                   min: formData.discountType === 'percentage' ? 1 : 0.01,
//                   max: formData.discountType === 'percentage' ? 100 : null,
//                   step: formData.discountType === 'percentage' ? 1 : 0.01
//                 }}
//                 required
//               />
//             </Grid>

//             {/* Minimum Amount */}
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 type="number"
//                 label="Minimum Order Amount"
//                 value={formData.minAmount}
//                 onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
//                 error={!!formErrors.minAmount}
//                 helperText={formErrors.minAmount}
//                 inputProps={{ min: 0, step: 0.01 }}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//                 }}
//               />
//             </Grid>

//             {/* Status */}
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={formData.status}
//                   label="Status"
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 >
//                   <MenuItem value="active">Active</MenuItem>
//                   <MenuItem value="inactive">Inactive</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Form Actions */}
//             <Grid item xs={12}>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
//                 <Button
//                   variant="outlined"
//                   onClick={() => {
//                     setShowModal(false);
//                     resetForm();
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={createLoading || updateLoading}
//                   startIcon={(createLoading || updateLoading) ? <RefreshIcon sx={{ animation: 'spin 1s linear infinite' }} /> : null}
//                 >
//                   {createLoading || updateLoading 
//                     ? (selectedCoupon ? 'Updating...' : 'Creating...')
//                     : (selectedCoupon ? 'Update Coupon' : 'Create Coupon')
//                   }
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       </Modal>

//       {/* Delete Confirmation Modal - Using the beautiful new component */}
//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onHide={() => {
//           setShowDeleteModal(false);
//           setSelectedCoupon(null);
//         }}
//         onConfirm={handleDelete}
//         title="Delete Coupon"
//         message={`Are you sure you want to delete coupon "${selectedCoupon?.code}"?`}
//         subMessage="This action cannot be undone. The coupon will be permanently removed from the system."
//         loading={deleteLoading}
//       />
//     </Box>
//   );
// };

// export default CouponManagement;







// src/pages/CouponManagement.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    setFilters,
    resetFilters,
} from '../../redux/slices/couponSlice';

// MUI Components
import {
    Box,
    Paper,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Chip,
    InputAdornment,
    Skeleton,
    Grid,
    Card,
    CardContent,
    useTheme,
    alpha,
    Container,
    Avatar,
    useMediaQuery,
} from '@mui/material';

// MUI Icons
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Close as CloseIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

// React Icons
import {
    FaTag,
    FaPercent,
    FaRupeeSign,
    FaCalendarAlt,
    FaChartLine,
    FaCheckCircle,
    FaExclamationCircle,
    FaClock,
} from 'react-icons/fa';

// Custom Modal Components
import Modal from '../../components/common/Modal';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { motion } from 'framer-motion';

// Stats Card Skeleton Component
const StatsCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
    const theme = useTheme();

    const getGridColumns = () => {
        if (isSmallMobile) return 12;
        if (isMobile) return 6;
        if (isTablet) return 4;
        return 2.4;
    };

    return (
        <Grid item xs={getGridColumns()}>
            <Paper
                elevation={0}
                sx={{
                    p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
                    borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                    border: "1px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    height: '100%',
                    minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: isSmallMobile ? "column" : "row",
                        textAlign: isSmallMobile ? "center" : "left",
                        gap: isSmallMobile ? 0.5 : 0,
                    }}>
                        <Box>
                            <Skeleton
                                variant="text"
                                width={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60}
                                height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26}
                                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }}
                            />
                            <Skeleton
                                variant="text"
                                width={isSmallMobile ? 60 : isMobile ? 65 : isTablet ? 70 : 75}
                                height={isSmallMobile ? 10 : isMobile ? 11 : isTablet ? 12 : 13}
                                sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                            />
                        </Box>
                        <Skeleton
                            variant="circular"
                            width={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
                            height={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
                            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: 2.5,
                        background: alpha(theme.palette.primary.main, 0.1),
                    }}
                />
            </Paper>
        </Grid>
    );
};

// Table Skeleton Component
const TableSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
                borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
        >
            {/* Header Skeleton */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
                pb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
                borderBottom: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
            }}>
                <Box>
                    <Skeleton variant="text" width={100} height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
                    <Skeleton variant="text" width={140} height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                </Box>
                <Skeleton variant="rounded" width={100} height={isSmallMobile ? 28 : isMobile ? 30 : isTablet ? 32 : 36} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            </Box>

            {/* Table Header Skeleton */}
            <Box sx={{
                display: "flex",
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
                borderRadius: 0.8,
                mb: 0.8
            }}>
                <Skeleton variant="text" width={50} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={120} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={60} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={80} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>

            {/* Table Rows Skeleton */}
            {[1, 2, 3, 4, 5].map((item, index) => (
                <Box key={item} sx={{
                    display: "flex",
                    p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
                    borderBottom: index < 4 ? "1px solid" : "none",
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
                }}>
                    <Skeleton variant="rounded" width={50} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="text" width={120} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="text" width={90} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="text" width={60} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="rounded" width={70} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="rounded" width={70} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                    <Skeleton variant="rounded" width={70} height={28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
                </Box>
            ))}
        </Paper>
    );
};

const CouponManagement = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // Responsive breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isSmallMobile = useMediaQuery('(max-width:400px)');

    // New state for first render loading effect (1 second)
    const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

    const {
        coupons,
        loading,
        stats,
        pagination,
        filters,
        createLoading,
        updateLoading,
        deleteLoading
    } = useSelector((state) => state.coupon);

    const { user } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        discountType: 'percentage',
        discountValue: '',
        minAmount: 0,
        status: 'active'
    });
    const [searchInput, setSearchInput] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Check if user is superadmin (role_id = 2)
    const isSuperAdmin = user?.role_id === 2;

    useEffect(() => {
        loadCoupons();

        // Set first render loader to false after 1 second
        const timer = setTimeout(() => {
            setShowFirstRenderLoader(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [dispatch, page, rowsPerPage, filters]);

    const loadCoupons = () => {
        const params = {
            page: page + 1,
            limit: rowsPerPage,
            ...filters
        };
        Object.keys(params).forEach(key => {
            if (!params[key] || params[key] === '') delete params[key];
        });
        dispatch(getAllCoupons(params));
    };

    const refreshData = () => {
        setLastUpdated(new Date());
        loadCoupons();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        dispatch(setFilters({ search: searchInput }));
    };

    const handleFilterChange = (key, value) => {
        setPage(0);
        dispatch(setFilters({ [key]: value }));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        setSearchInput('');
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }
        if (!formData.discountValue) {
            errors.discountValue = 'Discount value is required';
        } else if (formData.discountType === 'percentage' && (formData.discountValue < 1 || formData.discountValue > 100)) {
            errors.discountValue = 'Percentage must be between 1 and 100';
        } else if (formData.discountType === 'fixed' && formData.discountValue < 1) {
            errors.discountValue = 'Fixed discount must be greater than 0';
        }
        if (formData.minAmount < 0) {
            errors.minAmount = 'Minimum amount cannot be negative';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const couponData = {
            ...formData,
            discountValue: Number(formData.discountValue),
            minAmount: Number(formData.minAmount)
        };

        if (selectedCoupon) {
            await dispatch(updateCoupon({
                id: selectedCoupon._id,
                data: couponData
            }));
        } else {
            await dispatch(createCoupon(couponData));
        }

        setShowModal(false);
        resetForm();
        loadCoupons();
    };

    const handleDelete = async () => {
        if (selectedCoupon) {
            await dispatch(deleteCoupon(selectedCoupon._id));
            setShowDeleteModal(false);
            setSelectedCoupon(null);
            loadCoupons();
        }
    };

    const openCreateModal = () => {
        setSelectedCoupon(null);
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (coupon) => {
        setSelectedCoupon(coupon);
        setFormData({
            description: coupon.description || '',
            discountType: coupon.discountType || 'percentage',
            discountValue: coupon.discountValue || '',
            minAmount: coupon.minAmount || 0,
            status: coupon.status || 'active'
        });
        setFormErrors({});
        setShowModal(true);
    };

    const openDeleteModal = (coupon) => {
        setSelectedCoupon(coupon);
        setShowDeleteModal(true);
    };

    const resetForm = () => {
        setFormData({
            description: '',
            discountType: 'percentage',
            discountValue: '',
            minAmount: 0,
            status: 'active'
        });
        setFormErrors({});
    };

    const getStatusChip = (status) => {
        const statusConfig = {
            active: {
                color: 'success',
                label: 'Active',
                icon: <FaCheckCircle size={isSmallMobile ? 8 : 10} />,
                bgColor: alpha("#22C55E", 0.1),
                textColor: "#22C55E"
            },
            inactive: {
                color: 'warning',
                label: 'Inactive',
                icon: <FaClock size={isSmallMobile ? 8 : 10} />,
                bgColor: alpha("#F59E0B", 0.1),
                textColor: "#F59E0B"
            },
            expired: {
                color: 'error',
                label: 'Expired',
                icon: <FaExclamationCircle size={isSmallMobile ? 8 : 10} />,
                bgColor: alpha("#EF4444", 0.1),
                textColor: "#EF4444"
            }
        };
        const config = statusConfig[status] || statusConfig.inactive;

        return (
            <Chip
                icon={config.icon}
                label={config.label}
                size="small"
                sx={{
                    bgcolor: config.bgColor,
                    color: config.textColor,
                    fontWeight: 600,
                    fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
                    height: isSmallMobile ? 18 : isMobile ? 20 : 22,
                    '& .MuiChip-icon': {
                        fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
                        ml: 0.5,
                    },
                }}
            />
        );
    };

    const getDiscountTypeChip = (type) => {
        return type === 'percentage' ? (
            <Chip
                icon={<FaPercent size={isSmallMobile ? 8 : 10} />}
                label="Percentage"
                size="small"
                variant="outlined"
                sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
                    height: isSmallMobile ? 18 : isMobile ? 20 : 22,
                }}
            />
        ) : (
            <Chip
                icon={<FaRupeeSign size={isSmallMobile ? 8 : 10} />}
                label="Fixed"
                size="small"
                variant="outlined"
                sx={{
                    borderColor: alpha(theme.palette.secondary.main, 0.3),
                    color: theme.palette.secondary.main,
                    fontWeight: 500,
                    fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
                    height: isSmallMobile ? 18 : isMobile ? 20 : 22,
                }}
            />
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Stats Cards Configuration
    const couponStats = [
        {
            label: "Total Coupons",
            count: stats?.totalCoupons || 0,
            icon: <FaTag />,
            bgColor: alpha(theme.palette.primary.main, 0.1),
            iconColor: theme.palette.primary.main,
        },
        {
            label: "Active",
            count: stats?.activeCoupons || 0,
            icon: <FaCheckCircle />,
            bgColor: alpha("#22C55E", 0.1),
            iconColor: "#22C55E",
        },
        {
            label: "Inactive",
            count: stats?.inactiveCoupons || 0,
            icon: <FaClock />,
            bgColor: alpha("#F59E0B", 0.1),
            iconColor: "#F59E0B",
        },
        {
            label: "Total Used",
            count: stats?.totalUsedCount || 0,
            icon: <FaCalendarAlt />,
            bgColor: alpha(theme.palette.info.main, 0.1),
            iconColor: theme.palette.info.main,
        },
        {
            label: "Active Rate",
            count: stats?.totalCoupons ? Math.round((stats.activeCoupons / stats.totalCoupons) * 100) : 0,
            suffix: "%",
            icon: <FaChartLine />,
            bgColor: alpha(theme.palette.secondary.main, 0.1),
            iconColor: theme.palette.secondary.main,
        },
    ];

    // Stats Cards Component
    const StatsCards = () => {
        const itemVariants = {
            hidden: { opacity: 0, y: 20 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
            },
        };

        const getGridColumns = () => {
            if (isSmallMobile) return 12;
            if (isMobile) return 6;
            if (isTablet) return 4;
            return 2.4;
        };

        return (
            <Grid
                container
                spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
                sx={{ mb: isMobile ? 1.5 : 2 }}
            >
                {couponStats.map((stat, index) => (
                    <Grid item xs={getGridColumns()} key={index}>
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
                                    borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
                                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                                    border: "1px solid",
                                    borderColor: alpha(stat.iconColor, 0.2),
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    position: "relative",
                                    overflow: "hidden",
                                    height: '100%',
                                    minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "100%",
                                        background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
                                        zIndex: 0,
                                    },
                                    "&:hover": {
                                        transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
                                        boxShadow: !isMobile ? `0 12px 20px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
                                        borderColor: stat.iconColor,
                                    },
                                }}
                            >
                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    <Box sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexDirection: isSmallMobile ? "column" : "row",
                                        textAlign: isSmallMobile ? "center" : "left",
                                        gap: isSmallMobile ? 0.5 : 0,
                                    }}>
                                        <Box>
                                            <Typography
                                                variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
                                                fontWeight="700"
                                                sx={{
                                                    mb: 0.15,
                                                    color: 'text.primary',
                                                    fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.5rem' : isTablet ? '1.7rem' : '1.9rem',
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {stat.count}{stat.suffix || ''}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
                                                }}
                                            >
                                                {stat.label}
                                            </Typography>
                                        </Box>
                                        <Avatar
                                            sx={{
                                                bgcolor: alpha(stat.iconColor, 0.1),
                                                color: stat.iconColor,
                                                width: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
                                                height: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
                                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                boxShadow: `0 4px 8px -3px ${alpha(stat.iconColor, 0.2)}`,
                                                '& svg': {
                                                    fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
                                                },
                                            }}
                                        >
                                            {stat.icon}
                                        </Avatar>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "100%",
                                        height: 2.5,
                                        background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
                                        opacity: 0.8,
                                    }}
                                />
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        );
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

    // If first render loader is active, show skeletons
    if (showFirstRenderLoader) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                    width: "100%",
                    overflowX: "hidden",
                    position: "relative",
                    py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
                    px: { xs: 0, sm: 0, md: 0 },
                }}
            >
                <Container
                    maxWidth="xl"
                    disableGutters={isMobile}
                    sx={{
                        px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
                    }}
                >
                    {/* Header Section */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1.5,
                        }}
                    >
                        <Typography
                            variant={isMobile ? "body1" : "h6"}
                            fontWeight="600"
                            color={theme.palette.primary.main}
                            gutterBottom
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: {
                                    xs: '0.9rem',
                                    sm: '1.1rem',
                                    md: '1.3rem',
                                    lg: '1.5rem',
                                    xl: '1.7rem'
                                },
                            }}
                        >
                            Coupon Management
                        </Typography>
                        <IconButton size="small" sx={{ width: 28, height: 28 }}>
                            <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                        </IconButton>
                    </Box>

                    {/* Stats Cards Skeleton */}
                    <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
                        <Grid container spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <StatsCardSkeleton
                                    key={item}
                                    isSmallMobile={isSmallMobile}
                                    isMobile={isMobile}
                                    isTablet={isTablet}
                                />
                            ))}
                        </Grid>
                    </Box>

                    {/* Filters Skeleton */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
                            mb: isMobile ? 1.5 : 2,
                            borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
                            border: "1px solid",
                            borderColor: alpha(theme.palette.primary.main, 0.1),
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Table Skeleton */}
                    <TableSkeleton
                        isSmallMobile={isSmallMobile}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />
                </Container>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                width: "100%",
                overflowX: "hidden",
                position: "relative",
                py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
                px: { xs: 0, sm: 0, md: 0 },
            }}
        >
            <Container
                maxWidth="xl"
                disableGutters={isMobile}
                sx={{
                    px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
                }}
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1.5,
                            }}
                        >
                            <Typography
                                variant={isMobile ? "body1" : "h6"}
                                fontWeight="800"
                                color={theme.palette.primary.main}
                                gutterBottom
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontSize: {
                                        xs: '0.9rem',
                                        sm: '1.1rem',
                                        md: '1.3rem',
                                        lg: '1.5rem',
                                        xl: '1.7rem'
                                    },
                                }}
                            >
                                Coupon Management
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                {isSuperAdmin && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<AddIcon />}
                                        onClick={openCreateModal}
                                        sx={{
                                            fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
                                            py: 0.5,
                                            px: 1.5,
                                        }}
                                    >
                                        New Coupon
                                    </Button>
                                )}
                                <IconButton size="small" onClick={refreshData} sx={{ width: 28, height: 28 }}>
                                    <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </motion.div>

                    {/* Stats Overview Section */}
                    <motion.section
                        variants={itemVariants}
                        style={{
                            marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
                        }}
                    >
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
                            flexWrap: "wrap",
                            gap: 1,
                            px: isSmallMobile ? 0.5 : 0,
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <FaTag style={{
                                    color: theme.palette.primary.main,
                                    fontSize: isSmallMobile ? 12 : isMobile ? 14 : isTablet ? 16 : 18
                                }} />
                                <Typography
                                    variant={isSmallMobile ? "caption" : "body2"}
                                    fontWeight="600"
                                    color="text.primary"
                                    sx={{
                                        fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.8rem' : isTablet ? '0.9rem' : '1rem'
                                    }}
                                >
                                    Coupon Overview
                                </Typography>
                            </Box>

                            <Chip
                                label="Live"
                                size="small"
                                icon={<FaChartLine size={isSmallMobile ? 6 : 8} />}
                                sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 600,
                                    fontSize: isSmallMobile ? '0.5rem' : isMobile ? '0.55rem' : isTablet ? '0.6rem' : '0.7rem',
                                    height: isSmallMobile ? 18 : isMobile ? 20 : isTablet ? 22 : 24,
                                }}
                            />
                        </Box>

                        <StatsCards />
                    </motion.section>

                    {/* Filters Section */}
                    <motion.div variants={itemVariants}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
                                mb: isMobile ? 1.5 : 2,
                                borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
                                border: "1px solid",
                                borderColor: alpha(theme.palette.primary.main, 0.1),
                            }}
                        >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <form onSubmit={handleSearch}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Search by code or description..."
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon color="action" sx={{ fontSize: isSmallMobile ? 16 : 18 }} />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: searchInput && (
                                                    <InputAdornment position="end">
                                                        <IconButton size="small" onClick={() => setSearchInput('')}>
                                                            <CloseIcon fontSize="small" />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem',
                                                }
                                            }}
                                        />
                                    </form>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
                                            Status
                                        </InputLabel>
                                        <Select
                                            value={filters?.status || ''}
                                            label="Status"
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                            sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>All Status</MenuItem>
                                            <MenuItem value="active" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Active</MenuItem>
                                            <MenuItem value="inactive" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Inactive</MenuItem>
                                            <MenuItem value="expired" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Expired</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
                                            Discount Type
                                        </InputLabel>
                                        <Select
                                            value={filters?.discountType || ''}
                                            label="Discount Type"
                                            onChange={(e) => handleFilterChange('discountType', e.target.value)}
                                            sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>All Types</MenuItem>
                                            <MenuItem value="percentage" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Percentage</MenuItem>
                                            <MenuItem value="fixed" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Fixed</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            {(filters?.search || filters?.status || filters?.discountType) && (
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        startIcon={<CloseIcon />}
                                        onClick={handleResetFilters}
                                        sx={{
                                            fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </motion.div>

                    {/* Coupons Table Section */}
                    <motion.div variants={itemVariants}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
                                borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
                                border: "1px solid",
                                borderColor: alpha(theme.palette.primary.main, 0.1),
                            }}
                        >
                            <TableContainer sx={{ maxHeight: 600 }}>
                                <Table stickyHeader size={isSmallMobile ? "small" : "medium"}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Code</TableCell>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Description</TableCell>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Discount</TableCell>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Min. Amount</TableCell>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Used</TableCell>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Status</TableCell>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Type</TableCell>
                                            <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Created</TableCell>
                                            {isSuperAdmin && (
                                                <TableCell align="right" sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Actions</TableCell>
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {coupons?.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={isSuperAdmin ? 9 : 8} align="center" sx={{ py: 8 }}>
                                                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: isSmallMobile ? '0.7rem' : '0.8rem' }}>
                                                        No coupons found
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            coupons?.map((coupon) => (
                                                <TableRow key={coupon._id} hover>
                                                    <TableCell>
                                                        <Chip
                                                            label={coupon.code}
                                                            color="primary"
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{
                                                                fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
                                                                height: isSmallMobile ? 20 : isMobile ? 22 : 24,
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" sx={{
                                                            maxWidth: 200,
                                                            fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
                                                        }} noWrap>
                                                            {coupon.description}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" fontWeight="medium" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
                                                            {coupon.discountType === 'percentage' ? (
                                                                <>{coupon.discountValue}%</>
                                                            ) : (
                                                                <>₹{coupon.discountValue}</>
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
                                                            {coupon.minAmount > 0 ? `₹${coupon.minAmount}` : 'No min'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
                                                            {coupon.usedCount || 0}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {getStatusChip(coupon.status)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {getDiscountTypeChip(coupon.discountType)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem' }}>
                                                            {formatDate(coupon.createdAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    {isSuperAdmin && (
                                                        <TableCell align="right">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => openEditModal(coupon)}
                                                                sx={{
                                                                    mr: 0.5,
                                                                    color: 'primary.main',
                                                                    padding: isSmallMobile ? 0.5 : 0.8,
                                                                }}
                                                            >
                                                                <EditIcon sx={{ fontSize: isSmallMobile ? 14 : 16 }} />
                                                            </IconButton>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => openDeleteModal(coupon)}
                                                                sx={{
                                                                    color: 'error.main',
                                                                    padding: isSmallMobile ? 0.5 : 0.8,
                                                                }}
                                                            >
                                                                <DeleteIcon sx={{ fontSize: isSmallMobile ? 14 : 16 }} />
                                                            </IconButton>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Pagination */}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                component="div"
                                count={pagination?.totalItems || 0}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                sx={{
                                    '.MuiTablePagination-toolbar': {
                                        minHeight: isSmallMobile ? 40 : isMobile ? 45 : 50,
                                    },
                                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                                        fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
                                    },
                                    '.MuiTablePagination-select': {
                                        fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
                                    },
                                }}
                            />
                        </Paper>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    resetForm();
                }}
                title={selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                size="md"
            >
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                error={!!formErrors.description}
                                helperText={formErrors.description}
                                required
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>

                        {/* Discount Type and Value */}
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                                <InputLabel>Discount Type</InputLabel>
                                <Select
                                    value={formData.discountType}
                                    label="Discount Type"
                                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                >
                                    <MenuItem value="percentage">Percentage (%)</MenuItem>
                                    <MenuItem value="fixed">Fixed (₹)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Discount Value"
                                value={formData.discountValue}
                                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                error={!!formErrors.discountValue}
                                helperText={formErrors.discountValue}
                                inputProps={{
                                    min: formData.discountType === 'percentage' ? 1 : 0.01,
                                    max: formData.discountType === 'percentage' ? 100 : null,
                                    step: formData.discountType === 'percentage' ? 1 : 0.01
                                }}
                                required
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>

                        {/* Minimum Amount */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Minimum Order Amount"
                                value={formData.minAmount}
                                onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                                error={!!formErrors.minAmount}
                                helperText={formErrors.minAmount}
                                inputProps={{ min: 0, step: 0.01 }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                }}
                                size={isMobile ? "small" : "medium"}
                            />
                        </Grid>

                        {/* Status */}
                        <Grid item xs={12}>
                            <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={formData.status}
                                    label="Status"
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Form Actions */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    size={isMobile ? "small" : "medium"}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={createLoading || updateLoading}
                                    startIcon={(createLoading || updateLoading) ? <RefreshIcon sx={{ animation: 'spin 1s linear infinite' }} /> : null}
                                    size={isMobile ? "small" : "medium"}
                                >
                                    {createLoading || updateLoading
                                        ? (selectedCoupon ? 'Updating...' : 'Creating...')
                                        : (selectedCoupon ? 'Update Coupon' : 'Create Coupon')
                                    }
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                show={showDeleteModal}
                onHide={() => {
                    setShowDeleteModal(false);
                    setSelectedCoupon(null);
                }}
                onConfirm={handleDelete}
                title="Delete Coupon"
                message={`Are you sure you want to delete coupon "${selectedCoupon?.code}"?`}
                subMessage="This action cannot be undone. The coupon will be permanently removed from the system."
                loading={deleteLoading}
            />

            {/* CSS for animations */}
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

export default CouponManagement;