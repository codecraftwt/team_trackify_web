// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     getAllCoupons,
//     createCoupon,
//     updateCoupon,
//     deleteCoupon,
//     setFilters,
//     resetFilters,
// } from '../../redux/slices/couponSlice';

// // MUI Components
// import {
//     Box,
//     Paper,
//     Typography,
//     Button,
//     TextField,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TablePagination,
//     IconButton,
//     Chip,
//     InputAdornment,
//     Skeleton,
//     Grid,
//     Card,
//     CardContent,
//     useTheme,
//     alpha,
//     Container,
//     Avatar,
//     useMediaQuery,
//     Fade,
//     CircularProgress,
// } from '@mui/material';

// // MUI Icons
// import {
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Search as SearchIcon,
//     Close as CloseIcon,
//     Refresh as RefreshIcon,
//     Percent as PercentIcon,
//     CurrencyRupee as CurrencyRupeeIcon,
//     LocalOffer as LocalOfferIcon,
// } from '@mui/icons-material';

// // React Icons
// import {
//     FaTag,
//     FaPercent,
//     FaRupeeSign,
//     FaCalendarAlt,
//     FaChartLine,
//     FaCheckCircle,
//     FaExclamationCircle,
//     FaClock,
// } from 'react-icons/fa';

// // Custom Modal Components
// import Modal from '../../components/common/Modal';
// import DeleteConfirmModal from '../../components/DeleteConfirmModal';
// import { motion } from 'framer-motion';

// // Stats Card Skeleton Component
// const StatsCardSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//     const theme = useTheme();

//     const getGridColumns = () => {
//         if (isSmallMobile) return 12;
//         if (isMobile) return 6;
//         if (isTablet) return 4;
//         return 2.4;
//     };

//     return (
//         <Grid item xs={getGridColumns()}>
//             <Paper
//                 elevation={0}
//                 sx={{
//                     p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                     borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                     background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                     border: "1px solid",
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     height: '100%',
//                     minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     position: "relative",
//                     overflow: "hidden",
//                 }}
//             >
//                 <Box sx={{ position: "relative", zIndex: 1 }}>
//                     <Box sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         flexDirection: isSmallMobile ? "column" : "row",
//                         textAlign: isSmallMobile ? "center" : "left",
//                         gap: isSmallMobile ? 0.5 : 0,
//                     }}>
//                         <Box>
//                             <Skeleton
//                                 variant="text"
//                                 width={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60}
//                                 height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26}
//                                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }}
//                             />
//                             <Skeleton
//                                 variant="text"
//                                 width={isSmallMobile ? 60 : isMobile ? 65 : isTablet ? 70 : 75}
//                                 height={isSmallMobile ? 10 : isMobile ? 11 : isTablet ? 12 : 13}
//                                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//                             />
//                         </Box>
//                         <Skeleton
//                             variant="circular"
//                             width={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//                             height={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//                             sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
//                         />
//                     </Box>
//                 </Box>
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         width: "100%",
//                         height: 2.5,
//                         background: alpha(theme.palette.primary.main, 0.1),
//                     }}
//                 />
//             </Paper>
//         </Grid>
//     );
// };

// // Table Skeleton Component
// const TableSkeleton = ({ isSmallMobile, isMobile, isTablet }) => {
//     const theme = useTheme();

//     return (
//         <Paper
//             elevation={0}
//             sx={{
//                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                 border: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}
//         >
//             {/* Header Skeleton */}
//             <Box sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 pb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 borderBottom: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}>
//                 <Box>
//                     <Skeleton variant="text" width={100} height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//                     <Skeleton variant="text" width={140} height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//                 <Skeleton variant="rounded" width={100} height={isSmallMobile ? 28 : isMobile ? 30 : isTablet ? 32 : 36} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>

//             {/* Table Header Skeleton */}
//             <Box sx={{
//                 display: "flex",
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//                 borderRadius: 0.8,
//                 mb: 0.8
//             }}>
//                 <Skeleton variant="text" width={50} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={120} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={60} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={80} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>

//             {/* Table Rows Skeleton */}
//             {[1, 2, 3, 4, 5].map((item, index) => (
//                 <Box key={item} sx={{
//                     display: "flex",
//                     p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//                     borderBottom: index < 4 ? "1px solid" : "none",
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//                 }}>
//                     <Skeleton variant="rounded" width={50} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={120} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={90} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="rounded" width={70} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="rounded" width={70} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="rounded" width={70} height={28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 </Box>
//             ))}
//         </Paper>
//     );
// };

// const CouponManagement = () => {
//     const theme = useTheme();
//     const dispatch = useDispatch();

//     // Responsive breakpoints
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//     const isSmallMobile = useMediaQuery('(max-width:400px)');

//     // New state for first render loading effect (1 second)
//     const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//     const {
//         coupons,
//         loading,
//         stats,
//         pagination,
//         filters,
//         createLoading,
//         updateLoading,
//         deleteLoading
//     } = useSelector((state) => state.coupon);

//     const { user } = useSelector((state) => state.auth);

//     const [showModal, setShowModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [selectedCoupon, setSelectedCoupon] = useState(null);
//     const [formData, setFormData] = useState({
//         description: '',
//         discountType: 'percentage',
//         discountValue: '',
//         minAmount: 0,
//         status: 'active'
//     });
//     const [searchInput, setSearchInput] = useState('');
//     const [formErrors, setFormErrors] = useState({});
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [page, setPage] = useState(0);
//     const [lastUpdated, setLastUpdated] = useState(new Date());

//     // Check if user is superadmin (role_id = 2)
//     const isSuperAdmin = user?.role_id === 2;

//     useEffect(() => {
//         loadCoupons();

//         // Set first render loader to false after 1 second
//         const timer = setTimeout(() => {
//             setShowFirstRenderLoader(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, [dispatch, page, rowsPerPage, filters]);

//     const loadCoupons = () => {
//         const params = {
//             page: page + 1,
//             limit: rowsPerPage,
//             ...filters
//         };
//         Object.keys(params).forEach(key => {
//             if (!params[key] || params[key] === '') delete params[key];
//         });
//         dispatch(getAllCoupons(params));
//     };

//     const refreshData = () => {
//         setLastUpdated(new Date());
//         loadCoupons();
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         setPage(0);
//         dispatch(setFilters({ search: searchInput }));
//     };

//     const handleFilterChange = (key, value) => {
//         setPage(0);
//         dispatch(setFilters({ [key]: value }));
//     };

//     const handleResetFilters = () => {
//         dispatch(resetFilters());
//         setSearchInput('');
//         setPage(0);
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const validateForm = () => {
//         const errors = {};
//         if (!formData.description.trim()) {
//             errors.description = 'Description is required';
//         }
//         if (!formData.discountValue) {
//             errors.discountValue = 'Discount value is required';
//         } else if (formData.discountType === 'percentage' && (formData.discountValue < 1 || formData.discountValue > 100)) {
//             errors.discountValue = 'Percentage must be between 1 and 100';
//         } else if (formData.discountType === 'fixed' && formData.discountValue < 1) {
//             errors.discountValue = 'Fixed discount must be greater than 0';
//         }
//         if (formData.minAmount < 0) {
//             errors.minAmount = 'Minimum amount cannot be negative';
//         }
//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         const couponData = {
//             ...formData,
//             discountValue: Number(formData.discountValue),
//             minAmount: Number(formData.minAmount)
//         };

//         if (selectedCoupon) {
//             await dispatch(updateCoupon({
//                 id: selectedCoupon._id,
//                 data: couponData
//             }));
//         } else {
//             await dispatch(createCoupon(couponData));
//         }

//         setShowModal(false);
//         resetForm();
//         loadCoupons();
//     };

//     const handleDelete = async () => {
//         if (selectedCoupon) {
//             await dispatch(deleteCoupon(selectedCoupon._id));
//             setShowDeleteModal(false);
//             setSelectedCoupon(null);
//             loadCoupons();
//         }
//     };

//     const openCreateModal = () => {
//         setSelectedCoupon(null);
//         resetForm();
//         setShowModal(true);
//     };

//     const openEditModal = (coupon) => {
//         setSelectedCoupon(coupon);
//         setFormData({
//             description: coupon.description || '',
//             discountType: coupon.discountType || 'percentage',
//             discountValue: coupon.discountValue || '',
//             minAmount: coupon.minAmount || 0,
//             status: coupon.status || 'active'
//         });
//         setFormErrors({});
//         setShowModal(true);
//     };

//     const openDeleteModal = (coupon) => {
//         setSelectedCoupon(coupon);
//         setShowDeleteModal(true);
//     };

//     const resetForm = () => {
//         setFormData({
//             description: '',
//             discountType: 'percentage',
//             discountValue: '',
//             minAmount: 0,
//             status: 'active'
//         });
//         setFormErrors({});
//     };

//     const getStatusChip = (status) => {
//         const statusConfig = {
//             active: {
//                 color: 'success',
//                 label: 'Active',
//                 icon: <FaCheckCircle size={isSmallMobile ? 8 : 10} />,
//                 bgColor: alpha("#22C55E", 0.1),
//                 textColor: "#22C55E"
//             },
//             inactive: {
//                 color: 'warning',
//                 label: 'Inactive',
//                 icon: <FaClock size={isSmallMobile ? 8 : 10} />,
//                 bgColor: alpha("#F59E0B", 0.1),
//                 textColor: "#F59E0B"
//             },
//             expired: {
//                 color: 'error',
//                 label: 'Expired',
//                 icon: <FaExclamationCircle size={isSmallMobile ? 8 : 10} />,
//                 bgColor: alpha("#EF4444", 0.1),
//                 textColor: "#EF4444"
//             }
//         };
//         const config = statusConfig[status] || statusConfig.inactive;

//         return (
//             <Chip
//                 icon={config.icon}
//                 label={config.label}
//                 size="small"
//                 sx={{
//                     bgcolor: config.bgColor,
//                     color: config.textColor,
//                     fontWeight: 600,
//                     fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                     height: isSmallMobile ? 18 : isMobile ? 20 : 22,
//                     '& .MuiChip-icon': {
//                         fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                         ml: 0.5,
//                     },
//                 }}
//             />
//         );
//     };

//     const getDiscountTypeChip = (type) => {
//         return type === 'percentage' ? (
//             <Chip
//                 icon={<FaPercent size={isSmallMobile ? 8 : 10} />}
//                 label="Percentage"
//                 size="small"
//                 variant="outlined"
//                 sx={{
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                     color: theme.palette.primary.main,
//                     fontWeight: 500,
//                     fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                     height: isSmallMobile ? 18 : isMobile ? 20 : 22,
//                 }}
//             />
//         ) : (
//             <Chip
//                 icon={<FaRupeeSign size={isSmallMobile ? 8 : 10} />}
//                 label="Fixed"
//                 size="small"
//                 variant="outlined"
//                 sx={{
//                     borderColor: alpha(theme.palette.secondary.main, 0.3),
//                     color: theme.palette.secondary.main,
//                     fontWeight: 500,
//                     fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                     height: isSmallMobile ? 18 : isMobile ? 20 : 22,
//                 }}
//             />
//         );
//     };

//     const formatDate = (dateString) => {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     // Stats Cards Configuration
//     const couponStats = [
//         {
//             label: "Total Coupons",
//             count: stats?.totalCoupons || 0,
//             icon: <FaTag />,
//             bgColor: alpha(theme.palette.primary.main, 0.1),
//             iconColor: theme.palette.primary.main,
//         },
//         {
//             label: "Active",
//             count: stats?.activeCoupons || 0,
//             icon: <FaCheckCircle />,
//             bgColor: alpha("#22C55E", 0.1),
//             iconColor: "#22C55E",
//         },
//         {
//             label: "Inactive",
//             count: stats?.inactiveCoupons || 0,
//             icon: <FaClock />,
//             bgColor: alpha("#F59E0B", 0.1),
//             iconColor: "#F59E0B",
//         },
//         {
//             label: "Total Used",
//             count: stats?.totalUsedCount || 0,
//             icon: <FaCalendarAlt />,
//             bgColor: alpha(theme.palette.info.main, 0.1),
//             iconColor: theme.palette.info.main,
//         },
//         {
//             label: "Active Rate",
//             count: stats?.totalCoupons ? Math.round((stats.activeCoupons / stats.totalCoupons) * 100) : 0,
//             suffix: "%",
//             icon: <FaChartLine />,
//             bgColor: alpha(theme.palette.secondary.main, 0.1),
//             iconColor: theme.palette.secondary.main,
//         },
//     ];

//     // Stats Cards Component
//     const StatsCards = () => {
//         const itemVariants = {
//             hidden: { opacity: 0, y: 20 },
//             visible: {
//                 opacity: 1,
//                 y: 0,
//                 transition: { duration: 0.5 },
//             },
//         };

//         const getGridColumns = () => {
//             if (isSmallMobile) return 12;
//             if (isMobile) return 6;
//             if (isTablet) return 4;
//             return 2.4;
//         };

//         return (
//             <Grid
//                 container
//                 spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
//                 sx={{ mb: isMobile ? 1.5 : 2 }}
//             >
//                 {couponStats.map((stat, index) => (
//                     <Grid item xs={getGridColumns()} key={index}>
//                         <motion.div
//                             variants={itemVariants}
//                             initial="hidden"
//                             animate="visible"
//                             transition={{ delay: index * 0.1 }}
//                         >
//                             <Paper
//                                 elevation={0}
//                                 sx={{
//                                     p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                                     borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                                     background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                                     border: "1px solid",
//                                     borderColor: alpha(stat.iconColor, 0.2),
//                                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                                     position: "relative",
//                                     overflow: "hidden",
//                                     height: '100%',
//                                     minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//                                     display: 'flex',
//                                     flexDirection: 'column',
//                                     justifyContent: 'center',
//                                     "&::before": {
//                                         content: '""',
//                                         position: "absolute",
//                                         top: 0,
//                                         left: 0,
//                                         right: 0,
//                                         height: "100%",
//                                         background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
//                                         zIndex: 0,
//                                     },
//                                     "&:hover": {
//                                         transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
//                                         boxShadow: !isMobile ? `0 12px 20px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
//                                         borderColor: stat.iconColor,
//                                     },
//                                 }}
//                             >
//                                 <Box sx={{ position: "relative", zIndex: 1 }}>
//                                     <Box sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "space-between",
//                                         flexDirection: isSmallMobile ? "column" : "row",
//                                         textAlign: isSmallMobile ? "center" : "left",
//                                         gap: isSmallMobile ? 0.5 : 0,
//                                     }}>
//                                         <Box>
//                                             <Typography
//                                                 variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
//                                                 fontWeight="700"
//                                                 sx={{
//                                                     mb: 0.15,
//                                                     color: 'text.primary',
//                                                     fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.5rem' : isTablet ? '1.7rem' : '1.9rem',
//                                                     lineHeight: 1.2,
//                                                 }}
//                                             >
//                                                 {stat.count}{stat.suffix || ''}
//                                             </Typography>
//                                             <Typography
//                                                 variant="caption"
//                                                 color="text.secondary"
//                                                 sx={{
//                                                     fontWeight: 500,
//                                                     fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//                                                 }}
//                                             >
//                                                 {stat.label}
//                                             </Typography>
//                                         </Box>
//                                         <Avatar
//                                             sx={{
//                                                 bgcolor: alpha(stat.iconColor, 0.1),
//                                                 color: stat.iconColor,
//                                                 width: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                                                 height: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                                                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                                                 boxShadow: `0 4px 8px -3px ${alpha(stat.iconColor, 0.2)}`,
//                                                 '& svg': {
//                                                     fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
//                                                 },
//                                             }}
//                                         >
//                                             {stat.icon}
//                                         </Avatar>
//                                     </Box>
//                                 </Box>
//                                 <Box
//                                     sx={{
//                                         position: "absolute",
//                                         bottom: 0,
//                                         left: 0,
//                                         width: "100%",
//                                         height: 2.5,
//                                         background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
//                                         opacity: 0.8,
//                                     }}
//                                 />
//                             </Paper>
//                         </motion.div>
//                     </Grid>
//                 ))}
//             </Grid>
//         );
//     };

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.5 },
//         },
//     };

//     // If first render loader is active, show skeletons
//     if (showFirstRenderLoader) {
//         return (
//             <Box
//                 sx={{
//                     minHeight: "100vh",
//                     background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//                     width: "100%",
//                     overflowX: "hidden",
//                     position: "relative",
//                     py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//                     px: { xs: 0, sm: 0, md: 0 },
//                 }}
//             >
//                 <Container
//                     maxWidth="xl"
//                     disableGutters={isMobile}
//                     sx={{
//                         px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                     }}
//                 >
//                     {/* Header Section */}
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             mb: 1.5,
//                         }}
//                     >
//                         <Typography
//                             variant={isMobile ? "body1" : "h6"}
//                             fontWeight="600"
//                             color={theme.palette.primary.main}
//                             gutterBottom
//                             sx={{
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                 WebkitBackgroundClip: "text",
//                                 WebkitTextFillColor: "transparent",
//                                 fontSize: {
//                                     xs: '0.9rem',
//                                     sm: '1.1rem',
//                                     md: '1.3rem',
//                                     lg: '1.5rem',
//                                     xl: '1.7rem'
//                                 },
//                             }}
//                         >
//                             Coupon Management
//                         </Typography>
//                         <IconButton size="small" sx={{ width: 28, height: 28 }}>
//                             <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//                         </IconButton>
//                     </Box>

//                     {/* Stats Cards Skeleton */}
//                     <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
//                         <Grid container spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}>
//                             {[1, 2, 3, 4, 5].map((item) => (
//                                 <StatsCardSkeleton
//                                     key={item}
//                                     isSmallMobile={isSmallMobile}
//                                     isMobile={isMobile}
//                                     isTablet={isTablet}
//                                 />
//                             ))}
//                         </Grid>
//                     </Box>

//                     {/* Filters Skeleton */}
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                             mb: isMobile ? 1.5 : 2,
//                             borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                             border: "1px solid",
//                             borderColor: alpha(theme.palette.primary.main, 0.1),
//                         }}
//                     >
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} md={6}>
//                                 <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                             </Grid>
//                         </Grid>
//                     </Paper>

//                     {/* Table Skeleton */}
//                     <TableSkeleton
//                         isSmallMobile={isSmallMobile}
//                         isMobile={isMobile}
//                         isTablet={isTablet}
//                     />
//                 </Container>
//             </Box>
//         );
//     }

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//                 width: "100%",
//                 overflowX: "hidden",
//                 position: "relative",
//                 py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//                 px: { xs: 0, sm: 0, md: 0 },
//             }}
//         >
//             <Container
//                 maxWidth="xl"
//                 disableGutters={isMobile}
//                 sx={{
//                     px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 }}
//             >
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {/* Header Section */}
//                     <motion.div variants={itemVariants}>
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 mb: 1.5,
//                             }}
//                         >
//                             <Typography
//                                 variant={isMobile ? "body1" : "h6"}
//                                 fontWeight="800"
//                                 color={theme.palette.primary.main}
//                                 gutterBottom
//                                 sx={{
//                                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                     WebkitBackgroundClip: "text",
//                                     WebkitTextFillColor: "transparent",
//                                     fontSize: {
//                                         xs: '0.9rem',
//                                         sm: '1.1rem',
//                                         md: '1.3rem',
//                                         lg: '1.5rem',
//                                         xl: '1.7rem'
//                                     },
//                                 }}
//                             >
//                                 Coupon Management
//                             </Typography>
//                             <Box sx={{ display: "flex", gap: 1 }}>
//                                 {isSuperAdmin && (
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         size="small"
//                                         startIcon={<AddIcon />}
//                                         onClick={openCreateModal}
//                                         sx={{
//                                             fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                             py: 0.5,
//                                             px: 1.5,
//                                         }}
//                                     >
//                                         New Coupon
//                                     </Button>
//                                 )}
//                                 <IconButton size="small" onClick={refreshData} sx={{ width: 28, height: 28 }}>
//                                     <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//                                 </IconButton>
//                             </Box>
//                         </Box>
//                     </motion.div>

//                     {/* Stats Overview Section */}
//                     <motion.section
//                         variants={itemVariants}
//                         style={{
//                             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//                         }}
//                     >
//                         <Box sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//                             flexWrap: "wrap",
//                             gap: 1,
//                             px: isSmallMobile ? 0.5 : 0,
//                         }}>
                            
//                         </Box>

//                         <StatsCards />
//                     </motion.section>

//                     {/* Filters Section */}
//                     <motion.div variants={itemVariants}>
//                         <Paper
//                             elevation={0}
//                             sx={{
//                                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                                 mb: isMobile ? 1.5 : 2,
//                                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                                 border: "1px solid",
//                                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                             }}
//                         >
//                             <Grid container spacing={2} alignItems="center">
//                                 <Grid item xs={12} md={6}>
//                                     <form onSubmit={handleSearch}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             placeholder="Search by code or description..."
//                                             value={searchInput}
//                                             onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
//                                             InputProps={{
//                                                 startAdornment: (
//                                                     <InputAdornment position="start">
//                                                         <SearchIcon color="action" sx={{ fontSize: isSmallMobile ? 16 : 18 }} />
//                                                     </InputAdornment>
//                                                 ),
//                                                 endAdornment: searchInput && (
//                                                     <InputAdornment position="end">
//                                                         <IconButton size="small" onClick={() => setSearchInput('')}>
//                                                             <CloseIcon fontSize="small" />
//                                                         </IconButton>
//                                                     </InputAdornment>
//                                                 ),
//                                                 sx: {
//                                                     fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem',
//                                                 }
//                                             }}
//                                         />
//                                     </form>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={3}>
//                                     <FormControl fullWidth size="small">
//                                         <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                                             Status
//                                         </InputLabel>
//                                         <Select
//                                             value={filters?.status || ''}
//                                             label="Status"
//                                             onChange={(e) => handleFilterChange('status', e.target.value)}
//                                             sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
//                                         >
//                                             <MenuItem value="" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>All Status</MenuItem>
//                                             <MenuItem value="active" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Active</MenuItem>
//                                             <MenuItem value="inactive" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Inactive</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={3}>
//                                     <FormControl fullWidth size="small">
//                                         <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                                             Discount Type
//                                         </InputLabel>
//                                         <Select
//                                             value={filters?.discountType || ''}
//                                             label="Discount Type"
//                                             onChange={(e) => handleFilterChange('discountType', e.target.value)}
//                                             sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
//                                         >
//                                             <MenuItem value="" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>All Types</MenuItem>
//                                             <MenuItem value="percentage" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Percentage</MenuItem>
//                                             <MenuItem value="fixed" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Fixed</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>

//                             {(filters?.search || filters?.status || filters?.discountType) && (
//                                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                                     <Button
//                                         variant="outlined"
//                                         color="primary"
//                                         size="small"
//                                         startIcon={<CloseIcon />}
//                                         onClick={handleResetFilters}
//                                         sx={{
//                                             fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                         }}
//                                     >
//                                         Clear Filters
//                                     </Button>
//                                 </Box>
//                             )}
//                         </Paper>
//                     </motion.div>

//                     {/* Coupons Table Section */}
//                     <motion.div variants={itemVariants}>
//                         <Paper
//                             elevation={0}
//                             sx={{
//                                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                                 border: "1px solid",
//                                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                             }}
//                         >
//                             <TableContainer sx={{ maxHeight: 600 }}>
//                                 <Table stickyHeader size={isSmallMobile ? "small" : "medium"}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Code</TableCell>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Description</TableCell>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Discount</TableCell>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Min. Amount</TableCell>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Used</TableCell>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Status</TableCell>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Type</TableCell>
//                                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Created</TableCell>
//                                             {isSuperAdmin && (
//                                                 <TableCell align="right" sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Actions</TableCell>
//                                             )}
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {coupons?.length === 0 ? (
//                                             <TableRow>
//                                                 <TableCell colSpan={isSuperAdmin ? 9 : 8} align="center" sx={{ py: 8 }}>
//                                                     <Typography variant="body1" color="text.secondary" sx={{ fontSize: isSmallMobile ? '0.7rem' : '0.8rem' }}>
//                                                         No coupons found
//                                                     </Typography>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ) : (
//                                             coupons?.map((coupon) => (
//                                                 <TableRow key={coupon._id} hover>
//                                                     <TableCell>
//                                                         <Chip
//                                                             label={coupon.code}
//                                                             color="primary"
//                                                             size="small"
//                                                             variant="outlined"
//                                                             sx={{
//                                                                 fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                                                                 height: isSmallMobile ? 20 : isMobile ? 22 : 24,
//                                                             }}
//                                                         />
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Typography variant="body2" sx={{
//                                                             maxWidth: 200,
//                                                             fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                                         }} noWrap>
//                                                             {coupon.description}
//                                                         </Typography>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Typography variant="body2" fontWeight="medium" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
//                                                             {coupon.discountType === 'percentage' ? (
//                                                                 <>{coupon.discountValue}%</>
//                                                             ) : (
//                                                                 <>₹{coupon.discountValue}</>
//                                                             )}
//                                                         </Typography>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Typography variant="body2" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
//                                                             {coupon.minAmount > 0 ? `₹${coupon.minAmount}` : 'No min'}
//                                                         </Typography>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Typography variant="body2" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
//                                                             {coupon.usedCount || 0}
//                                                         </Typography>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         {getStatusChip(coupon.status)}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         {getDiscountTypeChip(coupon.discountType)}
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Typography variant="body2" color="text.secondary" sx={{ fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem' }}>
//                                                             {formatDate(coupon.createdAt)}
//                                                         </Typography>
//                                                     </TableCell>
//                                                     {isSuperAdmin && (
//                                                         <TableCell align="right">
//                                                             <IconButton
//                                                                 size="small"
//                                                                 onClick={() => openEditModal(coupon)}
//                                                                 sx={{
//                                                                     mr: 0.5,
//                                                                     color: 'primary.main',
//                                                                     padding: isSmallMobile ? 0.5 : 0.8,
//                                                                 }}
//                                                             >
//                                                                 <EditIcon sx={{ fontSize: isSmallMobile ? 14 : 16 }} />
//                                                             </IconButton>
//                                                             <IconButton
//                                                                 size="small"
//                                                                 onClick={() => openDeleteModal(coupon)}
//                                                                 sx={{
//                                                                     color: 'error.main',
//                                                                     padding: isSmallMobile ? 0.5 : 0.8,
//                                                                 }}
//                                                             >
//                                                                 <DeleteIcon sx={{ fontSize: isSmallMobile ? 14 : 16 }} />
//                                                             </IconButton>
//                                                         </TableCell>
//                                                     )}
//                                                 </TableRow>
//                                             ))
//                                         )}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>

//                             {/* Pagination */}
//                             <TablePagination
//                                 rowsPerPageOptions={[5, 10, 25, 50]}
//                                 component="div"
//                                 count={pagination?.totalItems || 0}
//                                 rowsPerPage={rowsPerPage}
//                                 page={page}
//                                 onPageChange={handleChangePage}
//                                 onRowsPerPageChange={handleChangeRowsPerPage}
//                                 sx={{
//                                     '.MuiTablePagination-toolbar': {
//                                         minHeight: isSmallMobile ? 40 : isMobile ? 45 : 50,
//                                     },
//                                     '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
//                                         fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                     },
//                                     '.MuiTablePagination-select': {
//                                         fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                     },
//                                 }}
//                             />
//                         </Paper>
//                     </motion.div>
//                 </motion.div>
//             </Container>

//             {/* Create/Edit Modal - Styled Version */}
//             {/* <Modal
//                 isOpen={showModal}
//                 onClose={() => {
//                     setShowModal(false);
//                     resetForm();
//                 }}
//                 title={selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
//                 size="md"
//             >
//                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={3}
//                                 label="Description"
//                                 placeholder="e.g. Summer Sale 2026 - Get 25% off on all plans"
//                                 value={formData.description}
//                                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                 error={!!formErrors.description}
//                                 helperText={formErrors.description}
//                                 required
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 2,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 3px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.9rem' : '1rem',
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.75rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                             />
//                         </Grid>

//                         <Grid item xs={12} sm={6}>
//                             <FormControl 
//                                 fullWidth 
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 2,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 3px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiSelect-select': {
//                                         fontSize: isMobile ? '0.9rem' : '1rem',
//                                     },
//                                 }}
//                             >
//                                 <InputLabel>Discount Type</InputLabel>
//                                 <Select
//                                     value={formData.discountType}
//                                     label="Discount Type"
//                                     onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
//                                     MenuProps={{
//                                         PaperProps: {
//                                             sx: {
//                                                 borderRadius: 2,
//                                                 boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//                                                 mt: 0.5,
//                                             },
//                                         },
//                                     }}
//                                 >
//                                     <MenuItem value="percentage">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 28,
//                                                     height: 28,
//                                                     borderRadius: 1.5,
//                                                     bgcolor: 'rgba(47, 110, 170, 0.1)',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <PercentIcon sx={{ fontSize: 16, color: 'primary.main' }} />
//                                             </Box>
//                                             <Box>
//                                                 <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>Percentage (%)</Typography>
//                                                 <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                                                     Discount as percentage of total
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </MenuItem>
//                                     <MenuItem value="fixed">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 28,
//                                                     height: 28,
//                                                     borderRadius: 1.5,
//                                                     bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <CurrencyRupeeIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
//                                             </Box>
//                                             <Box>
//                                                 <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>Fixed (₹)</Typography>
//                                                 <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                                                     Fixed amount off on total
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 type="number"
//                                 label="Discount Value"
//                                 placeholder={formData.discountType === 'percentage' ? '25' : '500'}
//                                 value={formData.discountValue}
//                                 onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
//                                 error={!!formErrors.discountValue}
//                                 helperText={formErrors.discountValue}
//                                 inputProps={{
//                                     min: formData.discountType === 'percentage' ? 1 : 0.01,
//                                     max: formData.discountType === 'percentage' ? 100 : null,
//                                     step: formData.discountType === 'percentage' ? 1 : 0.01,
//                                 }}
//                                 required
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 2,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 3px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.9rem' : '1rem',
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.75rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                                 InputProps={{
//                                     endAdornment: formData.discountType === 'percentage' ? (
//                                         <InputAdornment position="end">
//                                             <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>%</Typography>
//                                         </InputAdornment>
//                                     ) : null,
//                                 }}
//                             />
//                         </Grid>

//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 type="number"
//                                 label="Minimum Order Amount"
//                                 placeholder="1000"
//                                 value={formData.minAmount}
//                                 onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
//                                 error={!!formErrors.minAmount}
//                                 helperText={formErrors.minAmount || 'Minimum cart value required to apply this coupon'}
//                                 inputProps={{ min: 0, step: 0.01 }}
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 2,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 3px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.9rem' : '1rem',
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.75rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>₹</Typography>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </Grid>

//                         <Grid item xs={12}>
//                             <FormControl 
//                                 fullWidth 
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 2,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 3px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                 }}
//                             >
//                                 <InputLabel>Status</InputLabel>
//                                 <Select
//                                     value={formData.status}
//                                     label="Status"
//                                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                     renderValue={(selected) => (
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 8,
//                                                     height: 8,
//                                                     borderRadius: '50%',
//                                                     bgcolor: selected === 'active' ? 'success.main' : 'warning.main',
//                                                     boxShadow: `0 0 0 2px ${selected === 'active' 
//                                                         ? 'rgba(34, 197, 94, 0.2)' 
//                                                         : 'rgba(245, 158, 11, 0.2)'}`,
//                                                 }}
//                                             />
//                                             <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem', textTransform: 'capitalize' }}>
//                                                 {selected}
//                                             </Typography>
//                                         </Box>
//                                     )}
//                                     MenuProps={{
//                                         PaperProps: {
//                                             sx: {
//                                                 borderRadius: 2,
//                                                 boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//                                                 mt: 0.5,
//                                             },
//                                         },
//                                     }}
//                                 >
//                                     <MenuItem value="active">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5, width: '100%' }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 8,
//                                                     height: 8,
//                                                     borderRadius: '50%',
//                                                     bgcolor: 'success.main',
//                                                 }}
//                                             />
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>Active</Typography>
//                                                 <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                                                     Coupon is available for users
//                                                 </Typography>
//                                             </Box>
//                                             <Chip
//                                                 label="Live"
//                                                 size="small"
//                                                 sx={{
//                                                     fontSize: '0.65rem',
//                                                     height: 20,
//                                                     bgcolor: 'rgba(34, 197, 94, 0.1)',
//                                                     color: 'success.main',
//                                                     fontWeight: 600,
//                                                 }}
//                                             />
//                                         </Box>
//                                     </MenuItem>
//                                     <MenuItem value="inactive">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5, width: '100%' }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 8,
//                                                     height: 8,
//                                                     borderRadius: '50%',
//                                                     bgcolor: 'warning.main',
//                                                 }}
//                                             />
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.95rem', fontWeight: 500 }}>Inactive</Typography>
//                                                 <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
//                                                     Coupon is hidden from users
//                                                 </Typography>
//                                             </Box>
//                                             <Chip
//                                                 label="Draft"
//                                                 size="small"
//                                                 sx={{
//                                                     fontSize: '0.65rem',
//                                                     height: 20,
//                                                     bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                     color: 'warning.main',
//                                                     fontWeight: 600,
//                                                 }}
//                                             />
//                                         </Box>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {formData.description && formData.discountValue && (
//                             <Grid item xs={12}>
//                                 <Fade in>
//                                     <Box
//                                         sx={{
//                                             mt: 1,
//                                             p: 2,
//                                             borderRadius: 2,
//                                             bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                             border: '1px dashed',
//                                             borderColor: 'primary.main',
//                                             position: 'relative',
//                                             overflow: 'hidden',
//                                         }}
//                                     >
//                                         <Box
//                                             sx={{
//                                                 position: 'absolute',
//                                                 top: -10,
//                                                 right: -10,
//                                                 width: 60,
//                                                 height: 60,
//                                                 borderRadius: '50%',
//                                                 bgcolor: 'rgba(47, 110, 170, 0.05)',
//                                             }}
//                                         />
                                        
//                                         <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, position: 'relative', zIndex: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 36,
//                                                     height: 36,
//                                                     borderRadius: 2,
//                                                     bgcolor: 'primary.main',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <LocalOfferIcon sx={{ fontSize: 20, color: 'white' }} />
//                                             </Box>
                                            
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
//                                                     Coupon Preview
//                                                 </Typography>
//                                                 <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
//                                                     {formData.description.length > 60 
//                                                         ? `${formData.description.substring(0, 60)}...` 
//                                                         : formData.description}
//                                                 </Typography>
                                                
//                                                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                                                     <Chip
//                                                         size="small"
//                                                         label={formData.discountType === 'percentage' 
//                                                             ? `${formData.discountValue}% OFF` 
//                                                             : `₹${formData.discountValue} OFF`}
//                                                         sx={{
//                                                             bgcolor: 'primary.main',
//                                                             color: 'white',
//                                                             fontSize: '0.65rem',
//                                                             height: 22,
//                                                         }}
//                                                     />
//                                                     {formData.minAmount > 0 && (
//                                                         <Chip
//                                                             size="small"
//                                                             label={`Min. ₹${formData.minAmount}`}
//                                                             variant="outlined"
//                                                             sx={{
//                                                                 fontSize: '0.65rem',
//                                                                 height: 22,
//                                                                 borderColor: 'primary.main',
//                                                                 color: 'primary.main',
//                                                             }}
//                                                         />
//                                                     )}
//                                                     <Chip
//                                                         size="small"
//                                                         label={formData.status === 'active' ? 'Active' : 'Inactive'}
//                                                         sx={{
//                                                             bgcolor: formData.status === 'active' 
//                                                                 ? 'rgba(34, 197, 94, 0.1)'
//                                                                 : 'rgba(245, 158, 11, 0.1)',
//                                                             color: formData.status === 'active' 
//                                                                 ? 'success.main'
//                                                                 : 'warning.main',
//                                                             fontSize: '0.65rem',
//                                                             height: 22,
//                                                         }}
//                                                     />
//                                                 </Box>
//                                             </Box>
//                                         </Box>
//                                     </Box>
//                                 </Fade>
//                             </Grid>
//                         )}

//                         <Grid item xs={12}>
//                             <Box sx={{ 
//                                 display: 'flex', 
//                                 justifyContent: 'flex-end', 
//                                 gap: 2, 
//                                 pt: 3,
//                                 mt: 1,
//                                 borderTop: '1px solid',
//                                 borderColor: 'divider',
//                             }}>
//                                 <Button
//                                     variant="outlined"
//                                     onClick={() => {
//                                         setShowModal(false);
//                                         resetForm();
//                                     }}
//                                     size={isMobile ? "small" : "medium"}
//                                     sx={{
//                                         px: 3,
//                                         py: 1,
//                                         borderRadius: 2,
//                                         fontSize: isMobile ? '0.8rem' : '0.9rem',
//                                         fontWeight: 600,
//                                         borderColor: 'rgba(47, 110, 170, 0.3)',
//                                         color: 'text.secondary',
//                                         '&:hover': {
//                                             borderColor: 'primary.main',
//                                             bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                         },
//                                     }}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     disabled={createLoading || updateLoading}
//                                     size={isMobile ? "small" : "medium"}
//                                     sx={{
//                                         px: 4,
//                                         py: 1,
//                                         borderRadius: 2,
//                                         fontSize: isMobile ? '0.8rem' : '0.9rem',
//                                         fontWeight: 600,
//                                         background: 'linear-gradient(135deg, #2f6eaa 0%, #1e4f7a 100%)',
//                                         boxShadow: '0 4px 12px rgba(47, 110, 170, 0.2)',
//                                         '&:hover': {
//                                             background: 'linear-gradient(135deg, #1e4f7a 0%, #2f6eaa 100%)',
//                                             boxShadow: '0 6px 16px rgba(47, 110, 170, 0.3)',
//                                         },
//                                         '&.Mui-disabled': {
//                                             background: 'rgba(47, 110, 170, 0.3)',
//                                         },
//                                     }}
//                                     startIcon={createLoading || updateLoading ? (
//                                         <CircularProgress size={16} sx={{ color: 'white' }} />
//                                     ) : null}
//                                 >
//                                     {createLoading || updateLoading
//                                         ? (selectedCoupon ? 'Updating...' : 'Creating...')
//                                         : (selectedCoupon ? 'Update Coupon' : 'Create Coupon')
//                                     }
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Modal> */}
//             <Modal
//                 isOpen={showModal}
//                 onClose={() => {
//                     setShowModal(false);
//                     resetForm();
//                 }}
//                 title={selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
//                 size="md"
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     sx={{
//                         mt: 0,
//                         width: '100%',
//                     }}
//                 >
//                     <Grid container spacing={1}>
//                         {/* Description */}
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={3}
//                                 label="Description"
//                                 placeholder="e.g. Summer Sale 2026"
//                                 value={formData.description}
//                                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                 error={!!formErrors.description}
//                                 helperText={formErrors.description}
//                                 required
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '70px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.65rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                             />
//                         </Grid>

//                         {/* Discount Type and Value */}
//                         <Grid item xs={12} sm={6}>
//                             <FormControl
//                                 fullWidth
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiSelect-select': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                 }}
//                             >
//                                 <InputLabel sx={{ fontSize: '0.75rem' }}>Discount Type</InputLabel>
//                                 <Select
//                                     value={formData.discountType}
//                                     label="Discount Type"
//                                     onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
//                                     MenuProps={{
//                                         PaperProps: {
//                                             sx: {
//                                                 borderRadius: 1.5,
//                                                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                                 mt: 0.5,
//                                             },
//                                         },
//                                     }}
//                                 >
//                                     <MenuItem value="percentage">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 24,
//                                                     height: 24,
//                                                     borderRadius: 1,
//                                                     bgcolor: 'rgba(47, 110, 170, 0.1)',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <PercentIcon sx={{ fontSize: 14, color: 'primary.main' }} />
//                                             </Box>
//                                             <Box>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Percentage (%)</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Percentage off
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </MenuItem>
//                                     <MenuItem value="fixed">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 24,
//                                                     height: 24,
//                                                     borderRadius: 1,
//                                                     bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <CurrencyRupeeIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
//                                             </Box>
//                                             <Box>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Fixed (₹)</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Fixed amount
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 type="number"
//                                 label="Discount Value"
//                                 placeholder={formData.discountType === 'percentage' ? '25' : '500'}
//                                 value={formData.discountValue}
//                                 onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
//                                 error={!!formErrors.discountValue}
//                                 helperText={formErrors.discountValue}
//                                 inputProps={{
//                                     min: formData.discountType === 'percentage' ? 1 : 0.01,
//                                     max: formData.discountType === 'percentage' ? 100 : null,
//                                     step: formData.discountType === 'percentage' ? 1 : 0.01,
//                                 }}
//                                 required
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.65rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                                 InputProps={{
//                                     endAdornment: formData.discountType === 'percentage' ? (
//                                         <InputAdornment position="end">
//                                             <Typography sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>%</Typography>
//                                         </InputAdornment>
//                                     ) : null,
//                                 }}
//                             />
//                         </Grid>

//                         {/* Minimum Amount */}
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 type="number"
//                                 label="Minimum Order Amount"
//                                 placeholder="1000"
//                                 value={formData.minAmount}
//                                 onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
//                                 error={!!formErrors.minAmount}
//                                 helperText={formErrors.minAmount || 'Minimum required'}
//                                 inputProps={{ min: 0, step: 0.01 }}
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.65rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem' }}>₹</Typography>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </Grid>

//                         {/* Status */}
//                         <Grid item xs={12}>
//                             <FormControl
//                                 fullWidth
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiSelect-select': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                 }}
//                             >
//                                 <InputLabel sx={{ fontSize: '0.75rem' }}>Status</InputLabel>
//                                 <Select
//                                     value={formData.status}
//                                     label="Status"
//                                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                     renderValue={(selected) => (
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 6,
//                                                     height: 6,
//                                                     borderRadius: '50%',
//                                                     bgcolor: selected === 'active' ? 'success.main' : 'warning.main',
//                                                     boxShadow: `0 0 0 1px ${selected === 'active'
//                                                         ? 'rgba(34, 197, 94, 0.2)'
//                                                         : 'rgba(245, 158, 11, 0.2)'}`,
//                                                 }}
//                                             />
//                                             <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.8rem', textTransform: 'capitalize' }}>
//                                                 {selected}
//                                             </Typography>
//                                         </Box>
//                                     )}
//                                     MenuProps={{
//                                         PaperProps: {
//                                             sx: {
//                                                 borderRadius: 1.5,
//                                                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                                 mt: 0.5,
//                                             },
//                                         },
//                                     }}
//                                 >
//                                     <MenuItem value="active">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 6,
//                                                     height: 6,
//                                                     borderRadius: '50%',
//                                                     bgcolor: 'success.main',
//                                                 }}
//                                             />
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Active</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Available
//                                                 </Typography>
//                                             </Box>
//                                             <Chip
//                                                 label="Live"
//                                                 size="small"
//                                                 sx={{
//                                                     fontSize: '0.55rem',
//                                                     height: 18,
//                                                     bgcolor: 'rgba(34, 197, 94, 0.1)',
//                                                     color: 'success.main',
//                                                     fontWeight: 600,
//                                                 }}
//                                             />
//                                         </Box>
//                                     </MenuItem>
//                                     <MenuItem value="inactive">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 6,
//                                                     height: 6,
//                                                     borderRadius: '50%',
//                                                     bgcolor: 'warning.main',
//                                                 }}
//                                             />
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Inactive</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Hidden
//                                                 </Typography>
//                                             </Box>
//                                             <Chip
//                                                 label="Draft"
//                                                 size="small"
//                                                 sx={{
//                                                     fontSize: '0.55rem',
//                                                     height: 18,
//                                                     bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                     color: 'warning.main',
//                                                     fontWeight: 600,
//                                                 }}
//                                             />
//                                         </Box>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {/* Preview Card - Shows coupon summary */}
//                         {formData.description && formData.discountValue && (
//                             <Grid item xs={12}>
//                                 <Fade in>
//                                     <Box
//                                         sx={{
//                                             mt: 0.5,
//                                             p: 1.5,
//                                             borderRadius: 1.5,
//                                             bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                             border: '1px dashed',
//                                             borderColor: 'primary.main',
//                                             position: 'relative',
//                                             overflow: 'hidden',
//                                             minHeight: '70px',
//                                         }}
//                                     >
//                                         {/* Decorative Elements */}
//                                         <Box
//                                             sx={{
//                                                 position: 'absolute',
//                                                 top: -8,
//                                                 right: -8,
//                                                 width: 40,
//                                                 height: 40,
//                                                 borderRadius: '50%',
//                                                 bgcolor: 'rgba(47, 110, 170, 0.05)',
//                                             }}
//                                         />

//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 32,
//                                                     height: 32,
//                                                     borderRadius: 1.5,
//                                                     bgcolor: 'primary.main',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <LocalOfferIcon sx={{ fontSize: 18, color: 'white' }} />
//                                             </Box>

//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.primary', mb: 0.2 }}>
//                                                     Preview
//                                                 </Typography>
//                                                 <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mb: 0.5 }} noWrap>
//                                                     {formData.description.length > 40
//                                                         ? `${formData.description.substring(0, 40)}...`
//                                                         : formData.description}
//                                                 </Typography>

//                                                 <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
//                                                     <Chip
//                                                         size="small"
//                                                         label={formData.discountType === 'percentage'
//                                                             ? `${formData.discountValue}% OFF`
//                                                             : `₹${formData.discountValue} OFF`}
//                                                         sx={{
//                                                             bgcolor: 'primary.main',
//                                                             color: 'white',
//                                                             fontSize: '0.55rem',
//                                                             height: 20,
//                                                         }}
//                                                     />
//                                                     {formData.minAmount > 0 && (
//                                                         <Chip
//                                                             size="small"
//                                                             label={`Min ₹${formData.minAmount}`}
//                                                             variant="outlined"
//                                                             sx={{
//                                                                 fontSize: '0.55rem',
//                                                                 height: 20,
//                                                                 borderColor: 'primary.main',
//                                                                 color: 'primary.main',
//                                                             }}
//                                                         />
//                                                     )}
//                                                 </Box>
//                                             </Box>
//                                         </Box>
//                                     </Box>
//                                 </Fade>
//                             </Grid>
//                         )}

//                         {/* Form Actions */}
//                         <Grid item xs={12}>
//                             <Box sx={{
//                                 display: 'flex',
//                                 justifyContent: 'flex-end',
//                                 gap: 1.5,
//                                 pt: 1.5,
//                                 mt: 0.5,
//                                 borderTop: '1px solid',
//                                 borderColor: 'divider',
//                             }}>
//                                 <Button
//                                     variant="outlined"
//                                     onClick={() => {
//                                         setShowModal(false);
//                                         resetForm();
//                                     }}
//                                     size={isMobile ? "small" : "medium"}
//                                     sx={{
//                                         px: 2.5,
//                                         py: 0.8,
//                                         borderRadius: 1.5,
//                                         fontSize: isMobile ? '0.7rem' : '0.75rem',
//                                         fontWeight: 600,
//                                         borderColor: 'rgba(47, 110, 170, 0.3)',
//                                         color: 'text.secondary',
//                                         '&:hover': {
//                                             borderColor: 'primary.main',
//                                             bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                         },
//                                     }}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     disabled={createLoading || updateLoading}
//                                     size={isMobile ? "small" : "medium"}
//                                     sx={{
//                                         px: 3,
//                                         py: 0.8,
//                                         borderRadius: 1.5,
//                                         fontSize: isMobile ? '0.7rem' : '0.75rem',
//                                         fontWeight: 600,
//                                         background: 'linear-gradient(135deg, #2f6eaa 0%, #1e4f7a 100%)',
//                                         boxShadow: '0 2px 8px rgba(47, 110, 170, 0.15)',
//                                         '&:hover': {
//                                             background: 'linear-gradient(135deg, #1e4f7a 0%, #2f6eaa 100%)',
//                                             boxShadow: '0 4px 12px rgba(47, 110, 170, 0.2)',
//                                         },
//                                         '&.Mui-disabled': {
//                                             background: 'rgba(47, 110, 170, 0.3)',
//                                         },
//                                     }}
//                                     startIcon={createLoading || updateLoading ? (
//                                         <CircularProgress size={14} sx={{ color: 'white' }} />
//                                     ) : null}
//                                 >
//                                     {createLoading || updateLoading
//                                         ? (selectedCoupon ? 'Updating...' : 'Creating...')
//                                         : (selectedCoupon ? 'Update' : 'Create')
//                                     }
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Modal>
//             {/* Delete Confirmation Modal */}
//             <DeleteConfirmModal
//                 show={showDeleteModal}
//                 onHide={() => {
//                     setShowDeleteModal(false);
//                     setSelectedCoupon(null);
//                 }}
//                 onConfirm={handleDelete}
//                 title="Delete Coupon"
//                 message={`Are you sure you want to delete coupon "${selectedCoupon?.code}"?`}
//                 subMessage="This action cannot be undone. The coupon will be permanently removed from the system."
//                 loading={deleteLoading}
//             />

//             {/* CSS for animations */}
//             <style>
//                 {`
//                     @keyframes spin {
//                         0% { transform: rotate(0deg); }
//                         100% { transform: rotate(360deg); }
//                     }
//                 `}
//             </style>
//         </Box>
//     );
// };

// export default CouponManagement;
























// import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     getAllCoupons,
//     createCoupon,
//     updateCoupon,
//     deleteCoupon,
//     setFilters,
//     resetFilters,
// } from '../../redux/slices/couponSlice';

// // MUI Components
// import {
//     Box,
//     Paper,
//     Typography,
//     Button,
//     TextField,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TablePagination,
//     IconButton,
//     Chip,
//     InputAdornment,
//     Skeleton,
//     Grid,
//     Card,
//     CardContent,
//     useTheme,
//     alpha,
//     Container,
//     Avatar,
//     useMediaQuery,
//     Fade,
//     CircularProgress,
// } from '@mui/material';

// // MUI Icons
// import {
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Search as SearchIcon,
//     Close as CloseIcon,
//     Refresh as RefreshIcon,
//     Percent as PercentIcon,
//     CurrencyRupee as CurrencyRupeeIcon,
//     LocalOffer as LocalOfferIcon,
// } from '@mui/icons-material';

// // React Icons
// import {
//     FaTag,
//     FaPercent,
//     FaRupeeSign,
//     FaCalendarAlt,
//     FaChartLine,
//     FaCheckCircle,
//     FaExclamationCircle,
//     FaClock,
// } from 'react-icons/fa';

// // Custom Modal Components
// import Modal from '../../components/common/Modal';
// import DeleteConfirmModal from '../../components/DeleteConfirmModal';
// import { motion } from 'framer-motion';

// // ==================== MEMOIZED COMPONENTS ====================

// // Stats Card Skeleton Component
// const StatsCardSkeleton = memo(({ isSmallMobile, isMobile, isTablet }) => {
//     const theme = useTheme();

//     const getGridColumns = () => {
//         if (isSmallMobile) return 12;
//         if (isMobile) return 6;
//         if (isTablet) return 4;
//         return 2.4;
//     };

//     return (
//         <Grid item xs={getGridColumns()}>
//             <Paper
//                 elevation={0}
//                 sx={{
//                     p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                     borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                     background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                     border: "1px solid",
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     height: '100%',
//                     minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                     position: "relative",
//                     overflow: "hidden",
//                 }}
//             >
//                 <Box sx={{ position: "relative", zIndex: 1 }}>
//                     <Box sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         flexDirection: isSmallMobile ? "column" : "row",
//                         textAlign: isSmallMobile ? "center" : "left",
//                         gap: isSmallMobile ? 0.5 : 0,
//                     }}>
//                         <Box>
//                             <Skeleton
//                                 variant="text"
//                                 width={isSmallMobile ? 45 : isMobile ? 50 : isTablet ? 55 : 60}
//                                 height={isSmallMobile ? 20 : isMobile ? 22 : isTablet ? 24 : 26}
//                                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }}
//                             />
//                             <Skeleton
//                                 variant="text"
//                                 width={isSmallMobile ? 60 : isMobile ? 65 : isTablet ? 70 : 75}
//                                 height={isSmallMobile ? 10 : isMobile ? 11 : isTablet ? 12 : 13}
//                                 sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
//                             />
//                         </Box>
//                         <Skeleton
//                             variant="circular"
//                             width={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//                             height={isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38}
//                             sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }}
//                         />
//                     </Box>
//                 </Box>
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         width: "100%",
//                         height: 2.5,
//                         background: alpha(theme.palette.primary.main, 0.1),
//                     }}
//                 />
//             </Paper>
//         </Grid>
//     );
// });

// // Table Skeleton Component
// const TableSkeleton = memo(({ isSmallMobile, isMobile, isTablet }) => {
//     const theme = useTheme();

//     return (
//         <Paper
//             elevation={0}
//             sx={{
//                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                 border: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}
//         >
//             {/* Header Skeleton */}
//             <Box sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 pb: isSmallMobile ? 0.8 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 borderBottom: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}>
//                 <Box>
//                     <Skeleton variant="text" width={100} height={isSmallMobile ? 16 : isMobile ? 18 : isTablet ? 20 : 22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//                     <Skeleton variant="text" width={140} height={isSmallMobile ? 9 : isMobile ? 10 : isTablet ? 11 : 12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//                 <Skeleton variant="rounded" width={100} height={isSmallMobile ? 28 : isMobile ? 30 : isTablet ? 32 : 36} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>

//             {/* Table Header Skeleton */}
//             <Box sx={{
//                 display: "flex",
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//                 borderRadius: 0.8,
//                 mb: 0.8
//             }}>
//                 <Skeleton variant="text" width={50} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={120} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={90} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={60} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={70} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={80} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>

//             {/* Table Rows Skeleton */}
//             {[1, 2, 3, 4, 5].map((item, index) => (
//                 <Box key={item} sx={{
//                     display: "flex",
//                     p: isSmallMobile ? 0.6 : isMobile ? 0.8 : isTablet ? 1 : 1.2,
//                     borderBottom: index < 4 ? "1px solid" : "none",
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//                 }}>
//                     <Skeleton variant="rounded" width={50} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={120} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={90} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={60} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="rounded" width={70} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="rounded" width={70} height={22} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="text" width={80} height={16} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                     <Skeleton variant="rounded" width={70} height={28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 </Box>
//             ))}
//         </Paper>
//     );
// });

// // Memoized Stats Cards Component
// const StatsCards = memo(({ stats, isSmallMobile, isMobile, isTablet, theme }) => {
//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.5 },
//         },
//     };

//     // Memoize stats to prevent unnecessary recalculations
//     const couponStats = useMemo(() => [
//         {
//             label: "Total Coupons",
//             count: stats?.totalCoupons || 0,
//             icon: <FaTag />,
//             bgColor: alpha(theme.palette.primary.main, 0.1),
//             iconColor: theme.palette.primary.main,
//         },
//         {
//             label: "Active",
//             count: stats?.activeCoupons || 0,
//             icon: <FaCheckCircle />,
//             bgColor: alpha("#22C55E", 0.1),
//             iconColor: "#22C55E",
//         },
//         {
//             label: "Inactive",
//             count: stats?.inactiveCoupons || 0,
//             icon: <FaClock />,
//             bgColor: alpha("#F59E0B", 0.1),
//             iconColor: "#F59E0B",
//         },
//         {
//             label: "Total Used",
//             count: stats?.totalUsedCount || 0,
//             icon: <FaCalendarAlt />,
//             bgColor: alpha(theme.palette.info.main, 0.1),
//             iconColor: theme.palette.info.main,
//         },
//         {
//             label: "Active Rate",
//             count: stats?.totalCoupons ? Math.round((stats.activeCoupons / stats.totalCoupons) * 100) : 0,
//             suffix: "%",
//             icon: <FaChartLine />,
//             bgColor: alpha(theme.palette.secondary.main, 0.1),
//             iconColor: theme.palette.secondary.main,
//         },
//     ], [stats, theme]);

//     const getGridColumns = () => {
//         if (isSmallMobile) return 12;
//         if (isMobile) return 6;
//         if (isTablet) return 4;
//         return 2.4;
//     };

//     return (
//         <Grid
//             container
//             spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}
//             sx={{ mb: isMobile ? 1.5 : 2 }}
//         >
//             {couponStats.map((stat, index) => (
//                 <Grid item xs={getGridColumns()} key={index}>
//                     <motion.div
//                         variants={itemVariants}
//                         initial="hidden"
//                         animate="visible"
//                         transition={{ delay: index * 0.1 }}
//                     >
//                         <Paper
//                             elevation={0}
//                             sx={{
//                                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 1.5 : 2,
//                                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                                 background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
//                                 border: "1px solid",
//                                 borderColor: alpha(stat.iconColor, 0.2),
//                                 transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                                 position: "relative",
//                                 overflow: "hidden",
//                                 height: '100%',
//                                 minHeight: isSmallMobile ? 80 : isMobile ? 85 : isTablet ? 90 : 95,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                                 "&::before": {
//                                     content: '""',
//                                     position: "absolute",
//                                     top: 0,
//                                     left: 0,
//                                     right: 0,
//                                     height: "100%",
//                                     background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
//                                     zIndex: 0,
//                                 },
//                                 "&:hover": {
//                                     transform: !isMobile ? "translateY(-2px) scale(1.01)" : "none",
//                                     boxShadow: !isMobile ? `0 12px 20px -8px ${alpha(stat.iconColor, 0.3)}` : "none",
//                                     borderColor: stat.iconColor,
//                                 },
//                             }}
//                         >
//                             <Box sx={{ position: "relative", zIndex: 1 }}>
//                                 <Box sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "space-between",
//                                     flexDirection: isSmallMobile ? "column" : "row",
//                                     textAlign: isSmallMobile ? "center" : "left",
//                                     gap: isSmallMobile ? 0.5 : 0,
//                                 }}>
//                                     <Box>
//                                         <Typography
//                                             variant={isSmallMobile ? "body1" : isMobile ? "h6" : isTablet ? "h5" : "h5"}
//                                             fontWeight="700"
//                                             sx={{
//                                                 mb: 0.15,
//                                                 color: 'text.primary',
//                                                 fontSize: isSmallMobile ? '1.3rem' : isMobile ? '1.5rem' : isTablet ? '1.7rem' : '1.9rem',
//                                                 lineHeight: 1.2,
//                                             }}
//                                         >
//                                             {stat.count}{stat.suffix || ''}
//                                         </Typography>
//                                         <Typography
//                                             variant="caption"
//                                             color="text.secondary"
//                                             sx={{
//                                                 fontWeight: 500,
//                                                 fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : isTablet ? '0.65rem' : '0.7rem',
//                                             }}
//                                         >
//                                             {stat.label}
//                                         </Typography>
//                                     </Box>
//                                     <Avatar
//                                         sx={{
//                                             bgcolor: alpha(stat.iconColor, 0.1),
//                                             color: stat.iconColor,
//                                             width: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                                             height: isSmallMobile ? 32 : isMobile ? 34 : isTablet ? 36 : 38,
//                                             transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                                             boxShadow: `0 4px 8px -3px ${alpha(stat.iconColor, 0.2)}`,
//                                             '& svg': {
//                                                 fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
//                                             },
//                                         }}
//                                     >
//                                         {stat.icon}
//                                     </Avatar>
//                                 </Box>
//                             </Box>
//                             <Box
//                                 sx={{
//                                     position: "absolute",
//                                     bottom: 0,
//                                     left: 0,
//                                     width: "100%",
//                                     height: 2.5,
//                                     background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
//                                     opacity: 0.8,
//                                 }}
//                             />
//                         </Paper>
//                     </motion.div>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// });

// // Memoized Coupon Table Component
// const CouponTable = memo(({ 
//     coupons, 
//     isSuperAdmin, 
//     isSmallMobile, 
//     isMobile, 
//     isTablet, 
//     theme, 
//     onEdit, 
//     onDelete, 
//     getStatusChip, 
//     getDiscountTypeChip, 
//     formatDate,
//     pagination,
//     page,
//     rowsPerPage,
//     onPageChange,
//     onRowsPerPageChange
// }) => {
//     return (
//         <Paper
//             elevation={0}
//             sx={{
//                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                 border: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}
//         >
//             <TableContainer sx={{ maxHeight: 600 }}>
//                 <Table stickyHeader size={isSmallMobile ? "small" : "medium"}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Code</TableCell>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Description</TableCell>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Discount</TableCell>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Min. Amount</TableCell>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Used</TableCell>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Status</TableCell>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Type</TableCell>
//                             <TableCell sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Created</TableCell>
//                             {isSuperAdmin && (
//                                 <TableCell align="right" sx={{ fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}>Actions</TableCell>
//                             )}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {coupons?.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={isSuperAdmin ? 9 : 8} align="center" sx={{ py: 8 }}>
//                                     <Typography variant="body1" color="text.secondary" sx={{ fontSize: isSmallMobile ? '0.7rem' : '0.8rem' }}>
//                                         No coupons found
//                                     </Typography>
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             coupons?.map((coupon) => (
//                                 <TableRow key={coupon._id} hover>
//                                     <TableCell>
//                                         <Chip
//                                             label={coupon.code}
//                                             color="primary"
//                                             size="small"
//                                             variant="outlined"
//                                             sx={{
//                                                 fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                                                 height: isSmallMobile ? 20 : isMobile ? 22 : 24,
//                                             }}
//                                         />
//                                     </TableCell>
//                                     <TableCell>
//                                         <Typography variant="body2" sx={{
//                                             maxWidth: 200,
//                                             fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                         }} noWrap>
//                                             {coupon.description}
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell>
//                                         <Typography variant="body2" fontWeight="medium" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
//                                             {coupon.discountType === 'percentage' ? (
//                                                 <>{coupon.discountValue}%</>
//                                             ) : (
//                                                 <>₹{coupon.discountValue}</>
//                                             )}
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell>
//                                         <Typography variant="body2" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
//                                             {coupon.minAmount > 0 ? `₹${coupon.minAmount}` : 'No min'}
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell>
//                                         <Typography variant="body2" sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
//                                             {coupon.usedCount || 0}
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell>
//                                         {getStatusChip(coupon.status, isSmallMobile, isMobile)}
//                                     </TableCell>
//                                     <TableCell>
//                                         {getDiscountTypeChip(coupon.discountType, isSmallMobile, isMobile, theme)}
//                                     </TableCell>
//                                     <TableCell>
//                                         <Typography variant="body2" color="text.secondary" sx={{ fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem' }}>
//                                             {formatDate(coupon.createdAt)}
//                                         </Typography>
//                                     </TableCell>
//                                     {isSuperAdmin && (
//                                         <TableCell align="right">
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={() => onEdit(coupon)}
//                                                 sx={{
//                                                     mr: 0.5,
//                                                     color: 'primary.main',
//                                                     padding: isSmallMobile ? 0.5 : 0.8,
//                                                 }}
//                                             >
//                                                 <EditIcon sx={{ fontSize: isSmallMobile ? 14 : 16 }} />
//                                             </IconButton>
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={() => onDelete(coupon)}
//                                                 sx={{
//                                                     color: 'error.main',
//                                                     padding: isSmallMobile ? 0.5 : 0.8,
//                                                 }}
//                                             >
//                                                 <DeleteIcon sx={{ fontSize: isSmallMobile ? 14 : 16 }} />
//                                             </IconButton>
//                                         </TableCell>
//                                     )}
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Pagination */}
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, 50]}
//                 component="div"
//                 count={pagination?.totalItems || 0}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={onPageChange}
//                 onRowsPerPageChange={onRowsPerPageChange}
//                 sx={{
//                     '.MuiTablePagination-toolbar': {
//                         minHeight: isSmallMobile ? 40 : isMobile ? 45 : 50,
//                     },
//                     '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
//                         fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                     },
//                     '.MuiTablePagination-select': {
//                         fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                     },
//                 }}
//             />
//         </Paper>
//     );
// });

// // ==================== MAIN COMPONENT ====================

// const CouponManagement = () => {
//     const theme = useTheme();
//     const dispatch = useDispatch();

//     // Responsive breakpoints
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//     const isSmallMobile = useMediaQuery('(max-width:400px)');

//     // New state for first render loading effect (1 second)
//     const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//     const {
//         coupons,
//         loading,
//         stats,
//         pagination,
//         filters,
//         createLoading,
//         updateLoading,
//         deleteLoading
//     } = useSelector((state) => state.coupon);

//     const { user } = useSelector((state) => state.auth);

//     const [showModal, setShowModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [selectedCoupon, setSelectedCoupon] = useState(null);
//     const [formData, setFormData] = useState({
//         description: '',
//         discountType: 'percentage',
//         discountValue: '',
//         minAmount: 0,
//         status: 'active'
//     });
//     const [searchInput, setSearchInput] = useState('');
//     const [formErrors, setFormErrors] = useState({});
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [page, setPage] = useState(0);
//     const [lastUpdated, setLastUpdated] = useState(new Date());

//     // Check if user is superadmin (role_id = 2)
//     const isSuperAdmin = user?.role_id === 2;

//     useEffect(() => {
//         loadCoupons();

//         // Set first render loader to false after 1 second
//         const timer = setTimeout(() => {
//             setShowFirstRenderLoader(false);
//         }, 1000);

//         return () => clearTimeout(timer);
//     }, [dispatch, page, rowsPerPage, filters]);

//     const loadCoupons = useCallback(() => {
//         const params = {
//             page: page + 1,
//             limit: rowsPerPage,
//             ...filters
//         };
//         Object.keys(params).forEach(key => {
//             if (!params[key] || params[key] === '') delete params[key];
//         });
//         dispatch(getAllCoupons(params));
//     }, [dispatch, page, rowsPerPage, filters]);

//     const refreshData = useCallback(() => {
//         setLastUpdated(new Date());
//         loadCoupons();
//     }, [loadCoupons]);

//     const handleSearch = useCallback((e) => {
//         e.preventDefault();
//         setPage(0);
//         dispatch(setFilters({ search: searchInput }));
//     }, [dispatch, searchInput]);

//     const handleFilterChange = useCallback((key, value) => {
//         setPage(0);
//         dispatch(setFilters({ [key]: value }));
//     }, [dispatch]);

//     const handleResetFilters = useCallback(() => {
//         dispatch(resetFilters());
//         setSearchInput('');
//         setPage(0);
//     }, [dispatch]);

//     const handleChangePage = useCallback((event, newPage) => {
//         setPage(newPage);
//     }, []);

//     const handleChangeRowsPerPage = useCallback((event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     }, []);

//     const validateForm = useCallback(() => {
//         const errors = {};
//         if (!formData.description.trim()) {
//             errors.description = 'Description is required';
//         }
//         if (!formData.discountValue) {
//             errors.discountValue = 'Discount value is required';
//         } else if (formData.discountType === 'percentage' && (formData.discountValue < 1 || formData.discountValue > 100)) {
//             errors.discountValue = 'Percentage must be between 1 and 100';
//         } else if (formData.discountType === 'fixed' && formData.discountValue < 1) {
//             errors.discountValue = 'Fixed discount must be greater than 0';
//         }
//         if (formData.minAmount < 0) {
//             errors.minAmount = 'Minimum amount cannot be negative';
//         }
//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     }, [formData]);

//     const handleSubmit = useCallback(async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         const couponData = {
//             ...formData,
//             discountValue: Number(formData.discountValue),
//             minAmount: Number(formData.minAmount)
//         };

//         if (selectedCoupon) {
//             await dispatch(updateCoupon({
//                 id: selectedCoupon._id,
//                 data: couponData
//             }));
//         } else {
//             await dispatch(createCoupon(couponData));
//         }

//         setShowModal(false);
//         resetForm();
//         loadCoupons();
//     }, [dispatch, formData, selectedCoupon, validateForm, loadCoupons]);

//     const handleDelete = useCallback(async () => {
//         if (selectedCoupon) {
//             await dispatch(deleteCoupon(selectedCoupon._id));
//             setShowDeleteModal(false);
//             setSelectedCoupon(null);
//             loadCoupons();
//         }
//     }, [dispatch, selectedCoupon, loadCoupons]);

//     const openCreateModal = useCallback(() => {
//         setSelectedCoupon(null);
//         resetForm();
//         setShowModal(true);
//     }, []);

//     const openEditModal = useCallback((coupon) => {
//         setSelectedCoupon(coupon);
//         setFormData({
//             description: coupon.description || '',
//             discountType: coupon.discountType || 'percentage',
//             discountValue: coupon.discountValue || '',
//             minAmount: coupon.minAmount || 0,
//             status: coupon.status || 'active'
//         });
//         setFormErrors({});
//         setShowModal(true);
//     }, []);

//     const openDeleteModal = useCallback((coupon) => {
//         setSelectedCoupon(coupon);
//         setShowDeleteModal(true);
//     }, []);

//     const resetForm = useCallback(() => {
//         setFormData({
//             description: '',
//             discountType: 'percentage',
//             discountValue: '',
//             minAmount: 0,
//             status: 'active'
//         });
//         setFormErrors({});
//     }, []);

//     const getStatusChip = useCallback((status) => {
//         const statusConfig = {
//             active: {
//                 color: 'success',
//                 label: 'Active',
//                 icon: <FaCheckCircle size={isSmallMobile ? 8 : 10} />,
//                 bgColor: alpha("#22C55E", 0.1),
//                 textColor: "#22C55E"
//             },
//             inactive: {
//                 color: 'warning',
//                 label: 'Inactive',
//                 icon: <FaClock size={isSmallMobile ? 8 : 10} />,
//                 bgColor: alpha("#F59E0B", 0.1),
//                 textColor: "#F59E0B"
//             },
//             expired: {
//                 color: 'error',
//                 label: 'Expired',
//                 icon: <FaExclamationCircle size={isSmallMobile ? 8 : 10} />,
//                 bgColor: alpha("#EF4444", 0.1),
//                 textColor: "#EF4444"
//             }
//         };
//         const config = statusConfig[status] || statusConfig.inactive;

//         return (
//             <Chip
//                 icon={config.icon}
//                 label={config.label}
//                 size="small"
//                 sx={{
//                     bgcolor: config.bgColor,
//                     color: config.textColor,
//                     fontWeight: 600,
//                     fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                     height: isSmallMobile ? 18 : isMobile ? 20 : 22,
//                     '& .MuiChip-icon': {
//                         fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                         ml: 0.5,
//                     },
//                 }}
//             />
//         );
//     }, [isSmallMobile, isMobile]);

//     const getDiscountTypeChip = useCallback((type) => {
//         return type === 'percentage' ? (
//             <Chip
//                 icon={<FaPercent size={isSmallMobile ? 8 : 10} />}
//                 label="Percentage"
//                 size="small"
//                 variant="outlined"
//                 sx={{
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                     color: theme.palette.primary.main,
//                     fontWeight: 500,
//                     fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                     height: isSmallMobile ? 18 : isMobile ? 20 : 22,
//                 }}
//             />
//         ) : (
//             <Chip
//                 icon={<FaRupeeSign size={isSmallMobile ? 8 : 10} />}
//                 label="Fixed"
//                 size="small"
//                 variant="outlined"
//                 sx={{
//                     borderColor: alpha(theme.palette.secondary.main, 0.3),
//                     color: theme.palette.secondary.main,
//                     fontWeight: 500,
//                     fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
//                     height: isSmallMobile ? 18 : isMobile ? 20 : 22,
//                 }}
//             />
//         );
//     }, [isSmallMobile, isMobile, theme]);

//     const formatDate = useCallback((dateString) => {
//         return new Date(dateString).toLocaleDateString('en-IN', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     }, []);

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1,
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.5 },
//         },
//     };

//     // If first render loader is active, show skeletons
//     if (showFirstRenderLoader) {
//         return (
//             <Box
//                 sx={{
//                     minHeight: "100vh",
//                     background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//                     width: "100%",
//                     overflowX: "hidden",
//                     position: "relative",
//                     py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//                     px: { xs: 0, sm: 0, md: 0 },
//                 }}
//             >
//                 <Container
//                     maxWidth="xl"
//                     disableGutters={isMobile}
//                     sx={{
//                         px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                     }}
//                 >
//                     {/* Header Section */}
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             mb: 1.5,
//                         }}
//                     >
//                         <Typography
//                             variant={isMobile ? "body1" : "h6"}
//                             fontWeight="600"
//                             color={theme.palette.primary.main}
//                             gutterBottom
//                             sx={{
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                 WebkitBackgroundClip: "text",
//                                 WebkitTextFillColor: "transparent",
//                                 fontSize: {
//                                     xs: '0.9rem',
//                                     sm: '1.1rem',
//                                     md: '1.3rem',
//                                     lg: '1.5rem',
//                                     xl: '1.7rem'
//                                 },
//                             }}
//                         >
//                             Coupon Management
//                         </Typography>
//                         <IconButton size="small" sx={{ width: 28, height: 28 }}>
//                             <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//                         </IconButton>
//                     </Box>

//                     {/* Stats Cards Skeleton */}
//                     <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
//                         <Grid container spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}>
//                             {[1, 2, 3, 4, 5].map((item) => (
//                                 <StatsCardSkeleton
//                                     key={item}
//                                     isSmallMobile={isSmallMobile}
//                                     isMobile={isMobile}
//                                     isTablet={isTablet}
//                                 />
//                             ))}
//                         </Grid>
//                     </Box>

//                     {/* Filters Skeleton */}
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                             mb: isMobile ? 1.5 : 2,
//                             borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                             border: "1px solid",
//                             borderColor: alpha(theme.palette.primary.main, 0.1),
//                         }}
//                     >
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} md={6}>
//                                 <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                             </Grid>
//                             <Grid item xs={12} sm={6} md={3}>
//                                 <Skeleton variant="rounded" height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                             </Grid>
//                         </Grid>
//                     </Paper>

//                     {/* Table Skeleton */}
//                     <TableSkeleton
//                         isSmallMobile={isSmallMobile}
//                         isMobile={isMobile}
//                         isTablet={isTablet}
//                     />
//                 </Container>
//             </Box>
//         );
//     }

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//                 width: "100%",
//                 overflowX: "hidden",
//                 position: "relative",
//                 py: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//                 px: { xs: 0, sm: 0, md: 0 },
//             }}
//         >
//             <Container
//                 maxWidth="xl"
//                 disableGutters={isMobile}
//                 sx={{
//                     px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
//                 }}
//             >
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {/* Header Section */}
//                     <motion.div variants={itemVariants}>
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 alignItems: "center",
//                                 mb: 1.5,
//                             }}
//                         >
//                             <Typography
//                                 variant={isMobile ? "body1" : "h6"}
//                                 fontWeight="800"
//                                 color={theme.palette.primary.main}
//                                 gutterBottom
//                                 sx={{
//                                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                     WebkitBackgroundClip: "text",
//                                     WebkitTextFillColor: "transparent",
//                                     fontSize: {
//                                         xs: '0.9rem',
//                                         sm: '1.1rem',
//                                         md: '1.3rem',
//                                         lg: '1.5rem',
//                                         xl: '1.7rem'
//                                     },
//                                 }}
//                             >
//                                 Coupon Management
//                             </Typography>
//                             <Box sx={{ display: "flex", gap: 1 }}>
//                                 {isSuperAdmin && (
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         size="small"
//                                         startIcon={<AddIcon />}
//                                         onClick={openCreateModal}
//                                         sx={{
//                                             fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                             py: 0.5,
//                                             px: 1.5,
//                                         }}
//                                     >
//                                         New Coupon
//                                     </Button>
//                                 )}
//                                 <IconButton size="small" onClick={refreshData} sx={{ width: 28, height: 28 }}>
//                                     <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
//                                 </IconButton>
//                             </Box>
//                         </Box>
//                     </motion.div>

//                     {/* Stats Overview Section */}
//                     <motion.section
//                         variants={itemVariants}
//                         style={{
//                             marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px"
//                         }}
//                     >
//                         <Box sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             mb: isSmallMobile ? 1 : isMobile ? 1.5 : isTablet ? 2 : 2,
//                             flexWrap: "wrap",
//                             gap: 1,
//                             px: isSmallMobile ? 0.5 : 0,
//                         }}>
                            
//                         </Box>

//                         <StatsCards 
//                             stats={stats} 
//                             isSmallMobile={isSmallMobile} 
//                             isMobile={isMobile} 
//                             isTablet={isTablet} 
//                             theme={theme} 
//                         />
//                     </motion.section>

//                     {/* Filters Section */}
//                     <motion.div variants={itemVariants}>
//                         <Paper
//                             elevation={0}
//                             sx={{
//                                 p: isSmallMobile ? 1.2 : isMobile ? 1.5 : isTablet ? 2 : 2.5,
//                                 mb: isMobile ? 1.5 : 2,
//                                 borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//                                 border: "1px solid",
//                                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                             }}
//                         >
//                             <Grid container spacing={2} alignItems="center">
//                                 <Grid item xs={12} md={6}>
//                                     <form onSubmit={handleSearch}>
//                                         <TextField
//                                             fullWidth
//                                             size="small"
//                                             placeholder="Search by code or description..."
//                                             value={searchInput}
//                                             onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
//                                             InputProps={{
//                                                 startAdornment: (
//                                                     <InputAdornment position="start">
//                                                         <SearchIcon color="action" sx={{ fontSize: isSmallMobile ? 16 : 18 }} />
//                                                     </InputAdornment>
//                                                 ),
//                                                 endAdornment: searchInput && (
//                                                     <InputAdornment position="end">
//                                                         <IconButton size="small" onClick={() => setSearchInput('')}>
//                                                             <CloseIcon fontSize="small" />
//                                                         </IconButton>
//                                                     </InputAdornment>
//                                                 ),
//                                                 sx: {
//                                                     fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem',
//                                                 }
//                                             }}
//                                         />
//                                     </form>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={3}>
//                                     <FormControl fullWidth size="small">
//                                         <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                                             Status
//                                         </InputLabel>
//                                         <Select
//                                             value={filters?.status || ''}
//                                             label="Status"
//                                             onChange={(e) => handleFilterChange('status', e.target.value)}
//                                             sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
//                                         >
//                                             <MenuItem value="" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>All Status</MenuItem>
//                                             <MenuItem value="active" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Active</MenuItem>
//                                             <MenuItem value="inactive" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Inactive</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={3}>
//                                     <FormControl fullWidth size="small">
//                                         <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                                             Discount Type
//                                         </InputLabel>
//                                         <Select
//                                             value={filters?.discountType || ''}
//                                             label="Discount Type"
//                                             onChange={(e) => handleFilterChange('discountType', e.target.value)}
//                                             sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
//                                         >
//                                             <MenuItem value="" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>All Types</MenuItem>
//                                             <MenuItem value="percentage" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Percentage</MenuItem>
//                                             <MenuItem value="fixed" sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Fixed</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                             </Grid>

//                             {(filters?.search || filters?.status || filters?.discountType) && (
//                                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                                     <Button
//                                         variant="outlined"
//                                         color="primary"
//                                         size="small"
//                                         startIcon={<CloseIcon />}
//                                         onClick={handleResetFilters}
//                                         sx={{
//                                             fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                                         }}
//                                     >
//                                         Clear Filters
//                                     </Button>
//                                 </Box>
//                             )}
//                         </Paper>
//                     </motion.div>

//                     {/* Coupons Table Section */}
//                     <motion.div variants={itemVariants}>
//                         <CouponTable
//                             coupons={coupons}
//                             isSuperAdmin={isSuperAdmin}
//                             isSmallMobile={isSmallMobile}
//                             isMobile={isMobile}
//                             isTablet={isTablet}
//                             theme={theme}
//                             onEdit={openEditModal}
//                             onDelete={openDeleteModal}
//                             getStatusChip={getStatusChip}
//                             getDiscountTypeChip={getDiscountTypeChip}
//                             formatDate={formatDate}
//                             pagination={pagination}
//                             page={page}
//                             rowsPerPage={rowsPerPage}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </motion.div>
//                 </motion.div>
//             </Container>

//             {/* Create/Edit Modal */}
//             <Modal
//                 isOpen={showModal}
//                 onClose={() => {
//                     setShowModal(false);
//                     resetForm();
//                 }}
//                 title={selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
//                 size="md"
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     sx={{
//                         mt: 0,
//                         width: '100%',
//                     }}
//                 >
//                     <Grid container spacing={1}>
//                         {/* Description */}
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={3}
//                                 label="Description"
//                                 placeholder="e.g. Summer Sale 2026"
//                                 value={formData.description}
//                                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                 error={!!formErrors.description}
//                                 helperText={formErrors.description}
//                                 required
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '70px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.65rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                             />
//                         </Grid>

//                         {/* Discount Type and Value */}
//                         <Grid item xs={12} sm={6}>
//                             <FormControl
//                                 fullWidth
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiSelect-select': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                 }}
//                             >
//                                 <InputLabel sx={{ fontSize: '0.75rem' }}>Discount Type</InputLabel>
//                                 <Select
//                                     value={formData.discountType}
//                                     label="Discount Type"
//                                     onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
//                                     MenuProps={{
//                                         PaperProps: {
//                                             sx: {
//                                                 borderRadius: 1.5,
//                                                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                                 mt: 0.5,
//                                             },
//                                         },
//                                     }}
//                                 >
//                                     <MenuItem value="percentage">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 24,
//                                                     height: 24,
//                                                     borderRadius: 1,
//                                                     bgcolor: 'rgba(47, 110, 170, 0.1)',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <PercentIcon sx={{ fontSize: 14, color: 'primary.main' }} />
//                                             </Box>
//                                             <Box>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Percentage (%)</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Percentage off
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </MenuItem>
//                                     <MenuItem value="fixed">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 24,
//                                                     height: 24,
//                                                     borderRadius: 1,
//                                                     bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <CurrencyRupeeIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
//                                             </Box>
//                                             <Box>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Fixed (₹)</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Fixed amount
//                                                 </Typography>
//                                             </Box>
//                                         </Box>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 fullWidth
//                                 type="number"
//                                 label="Discount Value"
//                                 placeholder={formData.discountType === 'percentage' ? '25' : '500'}
//                                 value={formData.discountValue}
//                                 onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
//                                 error={!!formErrors.discountValue}
//                                 helperText={formErrors.discountValue}
//                                 inputProps={{
//                                     min: formData.discountType === 'percentage' ? 1 : 0.01,
//                                     max: formData.discountType === 'percentage' ? 100 : null,
//                                     step: formData.discountType === 'percentage' ? 1 : 0.01,
//                                 }}
//                                 required
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.65rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                                 InputProps={{
//                                     endAdornment: formData.discountType === 'percentage' ? (
//                                         <InputAdornment position="end">
//                                             <Typography sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>%</Typography>
//                                         </InputAdornment>
//                                     ) : null,
//                                 }}
//                             />
//                         </Grid>

//                         {/* Minimum Amount */}
//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 type="number"
//                                 label="Minimum Order Amount"
//                                 placeholder="1000"
//                                 value={formData.minAmount}
//                                 onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
//                                 error={!!formErrors.minAmount}
//                                 helperText={formErrors.minAmount || 'Minimum required'}
//                                 inputProps={{ min: 0, step: 0.01 }}
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiInputBase-input': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                     '& .MuiFormHelperText-root': {
//                                         fontSize: '0.65rem',
//                                         marginLeft: 0.5,
//                                     },
//                                 }}
//                                 InputProps={{
//                                     startAdornment: (
//                                         <InputAdornment position="start">
//                                             <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem' }}>₹</Typography>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         </Grid>

//                         {/* Status */}
//                         <Grid item xs={12}>
//                             <FormControl
//                                 fullWidth
//                                 size={isMobile ? "small" : "medium"}
//                                 sx={{
//                                     '& .MuiOutlinedInput-root': {
//                                         borderRadius: 1.5,
//                                         backgroundColor: 'rgba(0,0,0,0.02)',
//                                         transition: 'all 0.2s ease',
//                                         minHeight: '40px',
//                                         '&:hover': {
//                                             backgroundColor: 'rgba(0,0,0,0.03)',
//                                         },
//                                         '&.Mui-focused': {
//                                             backgroundColor: 'transparent',
//                                             boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                         },
//                                     },
//                                     '& .MuiInputLabel-root': {
//                                         fontWeight: 500,
//                                         color: 'text.secondary',
//                                         fontSize: '0.75rem',
//                                         '&.Mui-focused': {
//                                             color: 'primary.main',
//                                         },
//                                     },
//                                     '& .MuiSelect-select': {
//                                         fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                         py: 0.8,
//                                     },
//                                 }}
//                             >
//                                 <InputLabel sx={{ fontSize: '0.75rem' }}>Status</InputLabel>
//                                 <Select
//                                     value={formData.status}
//                                     label="Status"
//                                     onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                     renderValue={(selected) => (
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 6,
//                                                     height: 6,
//                                                     borderRadius: '50%',
//                                                     bgcolor: selected === 'active' ? 'success.main' : 'warning.main',
//                                                     boxShadow: `0 0 0 1px ${selected === 'active'
//                                                         ? 'rgba(34, 197, 94, 0.2)'
//                                                         : 'rgba(245, 158, 11, 0.2)'}`,
//                                                 }}
//                                             />
//                                             <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.8rem', textTransform: 'capitalize' }}>
//                                                 {selected}
//                                             </Typography>
//                                         </Box>
//                                     )}
//                                     MenuProps={{
//                                         PaperProps: {
//                                             sx: {
//                                                 borderRadius: 1.5,
//                                                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                                 mt: 0.5,
//                                             },
//                                         },
//                                     }}
//                                 >
//                                     <MenuItem value="active">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 6,
//                                                     height: 6,
//                                                     borderRadius: '50%',
//                                                     bgcolor: 'success.main',
//                                                 }}
//                                             />
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Active</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Available
//                                                 </Typography>
//                                             </Box>
//                                             <Chip
//                                                 label="Live"
//                                                 size="small"
//                                                 sx={{
//                                                     fontSize: '0.55rem',
//                                                     height: 18,
//                                                     bgcolor: 'rgba(34, 197, 94, 0.1)',
//                                                     color: 'success.main',
//                                                     fontWeight: 600,
//                                                 }}
//                                             />
//                                         </Box>
//                                     </MenuItem>
//                                     <MenuItem value="inactive">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 6,
//                                                     height: 6,
//                                                     borderRadius: '50%',
//                                                     bgcolor: 'warning.main',
//                                                 }}
//                                             />
//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Inactive</Typography>
//                                                 <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                     Hidden
//                                                 </Typography>
//                                             </Box>
//                                             <Chip
//                                                 label="Draft"
//                                                 size="small"
//                                                 sx={{
//                                                     fontSize: '0.55rem',
//                                                     height: 18,
//                                                     bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                     color: 'warning.main',
//                                                     fontWeight: 600,
//                                                 }}
//                                             />
//                                         </Box>
//                                     </MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         {/* Preview Card - Shows coupon summary */}
//                         {formData.description && formData.discountValue && (
//                             <Grid item xs={12}>
//                                 <Fade in>
//                                     <Box
//                                         sx={{
//                                             mt: 0.5,
//                                             p: 1.5,
//                                             borderRadius: 1.5,
//                                             bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                             border: '1px dashed',
//                                             borderColor: 'primary.main',
//                                             position: 'relative',
//                                             overflow: 'hidden',
//                                             minHeight: '70px',
//                                         }}
//                                     >
//                                         {/* Decorative Elements */}
//                                         <Box
//                                             sx={{
//                                                 position: 'absolute',
//                                                 top: -8,
//                                                 right: -8,
//                                                 width: 40,
//                                                 height: 40,
//                                                 borderRadius: '50%',
//                                                 bgcolor: 'rgba(47, 110, 170, 0.05)',
//                                             }}
//                                         />

//                                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
//                                             <Box
//                                                 sx={{
//                                                     width: 32,
//                                                     height: 32,
//                                                     borderRadius: 1.5,
//                                                     bgcolor: 'primary.main',
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <LocalOfferIcon sx={{ fontSize: 18, color: 'white' }} />
//                                             </Box>

//                                             <Box sx={{ flex: 1 }}>
//                                                 <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.primary', mb: 0.2 }}>
//                                                     Preview
//                                                 </Typography>
//                                                 <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mb: 0.5 }} noWrap>
//                                                     {formData.description.length > 40
//                                                         ? `${formData.description.substring(0, 40)}...`
//                                                         : formData.description}
//                                                 </Typography>

//                                                 <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
//                                                     <Chip
//                                                         size="small"
//                                                         label={formData.discountType === 'percentage'
//                                                             ? `${formData.discountValue}% OFF`
//                                                             : `₹${formData.discountValue} OFF`}
//                                                         sx={{
//                                                             bgcolor: 'primary.main',
//                                                             color: 'white',
//                                                             fontSize: '0.55rem',
//                                                             height: 20,
//                                                         }}
//                                                     />
//                                                     {formData.minAmount > 0 && (
//                                                         <Chip
//                                                             size="small"
//                                                             label={`Min ₹${formData.minAmount}`}
//                                                             variant="outlined"
//                                                             sx={{
//                                                                 fontSize: '0.55rem',
//                                                                 height: 20,
//                                                                 borderColor: 'primary.main',
//                                                                 color: 'primary.main',
//                                                             }}
//                                                         />
//                                                     )}
//                                                 </Box>
//                                             </Box>
//                                         </Box>
//                                     </Box>
//                                 </Fade>
//                             </Grid>
//                         )}

//                         {/* Form Actions */}
//                         <Grid item xs={12}>
//                             <Box sx={{
//                                 display: 'flex',
//                                 justifyContent: 'flex-end',
//                                 gap: 1.5,
//                                 pt: 1.5,
//                                 mt: 0.5,
//                                 borderTop: '1px solid',
//                                 borderColor: 'divider',
//                             }}>
//                                 <Button
//                                     variant="outlined"
//                                     onClick={() => {
//                                         setShowModal(false);
//                                         resetForm();
//                                     }}
//                                     size={isMobile ? "small" : "medium"}
//                                     sx={{
//                                         px: 2.5,
//                                         py: 0.8,
//                                         borderRadius: 1.5,
//                                         fontSize: isMobile ? '0.7rem' : '0.75rem',
//                                         fontWeight: 600,
//                                         borderColor: 'rgba(47, 110, 170, 0.3)',
//                                         color: 'text.secondary',
//                                         '&:hover': {
//                                             borderColor: 'primary.main',
//                                             bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                         },
//                                     }}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     color="primary"
//                                     disabled={createLoading || updateLoading}
//                                     size={isMobile ? "small" : "medium"}
//                                     sx={{
//                                         px: 3,
//                                         py: 0.8,
//                                         borderRadius: 1.5,
//                                         fontSize: isMobile ? '0.7rem' : '0.75rem',
//                                         fontWeight: 600,
//                                         background: 'linear-gradient(135deg, #2f6eaa 0%, #1e4f7a 100%)',
//                                         boxShadow: '0 2px 8px rgba(47, 110, 170, 0.15)',
//                                         '&:hover': {
//                                             background: 'linear-gradient(135deg, #1e4f7a 0%, #2f6eaa 100%)',
//                                             boxShadow: '0 4px 12px rgba(47, 110, 170, 0.2)',
//                                         },
//                                         '&.Mui-disabled': {
//                                             background: 'rgba(47, 110, 170, 0.3)',
//                                         },
//                                     }}
//                                     startIcon={createLoading || updateLoading ? (
//                                         <CircularProgress size={14} sx={{ color: 'white' }} />
//                                     ) : null}
//                                 >
//                                     {createLoading || updateLoading
//                                         ? (selectedCoupon ? 'Updating...' : 'Creating...')
//                                         : (selectedCoupon ? 'Update' : 'Create')
//                                     }
//                                 </Button>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Modal>
            
//             {/* Delete Confirmation Modal */}
//             <DeleteConfirmModal
//                 show={showDeleteModal}
//                 onHide={() => {
//                     setShowDeleteModal(false);
//                     setSelectedCoupon(null);
//                 }}
//                 onConfirm={handleDelete}
//                 title="Delete Coupon"
//                 message={`Are you sure you want to delete coupon "${selectedCoupon?.code}"?`}
//                 subMessage="This action cannot be undone. The coupon will be permanently removed from the system."
//                 loading={deleteLoading}
//             />

//             {/* CSS for animations */}
//             <style>
//                 {`
//                     @keyframes spin {
//                         0% { transform: rotate(0deg); }
//                         100% { transform: rotate(360deg); }
//                     }
//                 `}
//             </style>
//         </Box>
//     );
// };

// export default CouponManagement;


import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
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
    Fade,
    CircularProgress,
    Modal as MuiModal,
} from '@mui/material';

// MUI Icons
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Close as CloseIcon,
    Refresh as RefreshIcon,
    Percent as PercentIcon,
    CurrencyRupee as CurrencyRupeeIcon,
    LocalOffer as LocalOfferIcon,
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

// ==================== MEMOIZED COMPONENTS ====================

// Stats Card Skeleton Component
const StatsCardSkeleton = memo(({ isSmallMobile, isMobile, isTablet }) => {
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
});

// Table Skeleton Component
const TableSkeleton = memo(({ isSmallMobile, isMobile, isTablet }) => {
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
                <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="rounded" width={70} height={28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
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
});

// Memoized Stats Cards Component
const StatsCards = memo(({ stats, isSmallMobile, isMobile, isTablet, theme }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    // Memoize stats to prevent unnecessary recalculations
    const couponStats = useMemo(() => [
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
    ], [stats, theme]);

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
});

// Memoized Coupon Table Component
const CouponTable = memo(({ 
    coupons, 
    isSuperAdmin, 
    isSmallMobile, 
    isMobile, 
    isTablet, 
    theme, 
    onEdit, 
    onDelete, 
    getStatusChip, 
    getDiscountTypeChip, 
    formatDate,
    pagination,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
}) => {
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
                                        {getStatusChip(coupon.status, isSmallMobile, isMobile)}
                                    </TableCell>
                                    <TableCell>
                                        {getDiscountTypeChip(coupon.discountType, isSmallMobile, isMobile, theme)}
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
                                                onClick={() => onEdit(coupon)}
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
                                                onClick={() => onDelete(coupon)}
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
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
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
    );
});

// ==================== MAIN COMPONENT ====================

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

    const loadCoupons = useCallback(() => {
        const params = {
            page: page + 1,
            limit: rowsPerPage,
            ...filters
        };
        Object.keys(params).forEach(key => {
            if (!params[key] || params[key] === '') delete params[key];
        });
        dispatch(getAllCoupons(params));
    }, [dispatch, page, rowsPerPage, filters]);

    const refreshData = useCallback(() => {
        setLastUpdated(new Date());
        loadCoupons();
    }, [loadCoupons]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        setPage(0);
        dispatch(setFilters({ search: searchInput }));
    }, [dispatch, searchInput]);

    const handleFilterChange = useCallback((key, value) => {
        setPage(0);
        dispatch(setFilters({ [key]: value }));
    }, [dispatch]);

    const handleResetFilters = useCallback(() => {
        dispatch(resetFilters());
        setSearchInput('');
        setPage(0);
    }, [dispatch]);

    const handleChangePage = useCallback((event, newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const validateForm = useCallback(() => {
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
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
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
    }, [dispatch, formData, selectedCoupon, validateForm, loadCoupons]);

    const handleDelete = useCallback(async () => {
        if (selectedCoupon) {
            await dispatch(deleteCoupon(selectedCoupon._id));
            setShowDeleteModal(false);
            setSelectedCoupon(null);
            loadCoupons();
        }
    }, [dispatch, selectedCoupon, loadCoupons]);

    const openCreateModal = useCallback(() => {
        setSelectedCoupon(null);
        resetForm();
        setShowModal(true);
    }, []);

    const openEditModal = useCallback((coupon) => {
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
    }, []);

    const openDeleteModal = useCallback((coupon) => {
        setSelectedCoupon(coupon);
        setShowDeleteModal(true);
    }, []);

    const resetForm = useCallback(() => {
        setFormData({
            description: '',
            discountType: 'percentage',
            discountValue: '',
            minAmount: 0,
            status: 'active'
        });
        setFormErrors({});
    }, []);

    const getStatusChip = useCallback((status) => {
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
    }, [isSmallMobile, isMobile]);

    const getDiscountTypeChip = useCallback((type) => {
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
    }, [isSmallMobile, isMobile, theme]);

    const formatDate = useCallback((dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }, []);

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
                            
                        </Box>

                        <StatsCards 
                            stats={stats} 
                            isSmallMobile={isSmallMobile} 
                            isMobile={isMobile} 
                            isTablet={isTablet} 
                            theme={theme} 
                        />
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
                        <CouponTable
                            coupons={coupons}
                            isSuperAdmin={isSuperAdmin}
                            isSmallMobile={isSmallMobile}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            theme={theme}
                            onEdit={openEditModal}
                            onDelete={openDeleteModal}
                            getStatusChip={getStatusChip}
                            getDiscountTypeChip={getDiscountTypeChip}
                            formatDate={formatDate}
                            pagination={pagination}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </motion.div>
                </motion.div>
            </Container>

            {/* Create/Edit Modal - Centered Exactly */}
            <MuiModal
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                    resetForm();
                }}
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1300,
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(4px)',
                    }
                }}
            >
                <Fade in={showModal}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: { xs: '95%', sm: '550px' },
                            maxHeight: '90vh',
                            overflow: 'auto',
                            margin: '0 auto',
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2.5,
                            boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
                            outline: 'none',
                        }}
                    >
                        {/* Modal Header */}
                        <Box
                            sx={{
                                p: { xs: 1.5, sm: 2 },
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    fontWeight: 600,
                                    color: '#ffffff',
                                }}
                            >
                                {selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                size="small"
                                sx={{
                                    color: '#ffffff',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.1)',
                                    },
                                }}
                            >
                                <CloseIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                            </IconButton>
                        </Box>

                        {/* Modal Content */}
                        <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Grid container spacing={1.5}>
                                    {/* Description */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Description"
                                            placeholder="e.g. Summer Sale 2026"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            error={!!formErrors.description}
                                            helperText={formErrors.description}
                                            required
                                            size={isMobile ? "small" : "medium"}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1.5,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    transition: 'all 0.2s ease',
                                                    minHeight: '70px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0,0,0,0.03)',
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                    color: 'text.secondary',
                                                    fontSize: '0.75rem',
                                                    '&.Mui-focused': {
                                                        color: 'primary.main',
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    fontSize: '0.65rem',
                                                    marginLeft: 0.5,
                                                },
                                            }}
                                        />
                                    </Grid>

                                    {/* Discount Type and Value */}
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            size={isMobile ? "small" : "medium"}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1.5,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    transition: 'all 0.2s ease',
                                                    minHeight: '40px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0,0,0,0.03)',
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                    color: 'text.secondary',
                                                    fontSize: '0.75rem',
                                                    '&.Mui-focused': {
                                                        color: 'primary.main',
                                                    },
                                                },
                                                '& .MuiSelect-select': {
                                                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                    py: 0.8,
                                                },
                                            }}
                                        >
                                            <InputLabel sx={{ fontSize: '0.75rem' }}>Discount Type</InputLabel>
                                            <Select
                                                value={formData.discountType}
                                                label="Discount Type"
                                                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            borderRadius: 1.5,
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                            mt: 0.5,
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="percentage">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
                                                        <Box
                                                            sx={{
                                                                width: 24,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                bgcolor: 'rgba(47, 110, 170, 0.1)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <PercentIcon sx={{ fontSize: 14, color: 'primary.main' }} />
                                                        </Box>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Percentage (%)</Typography>
                                                            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                                                                Percentage off
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="fixed">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
                                                        <Box
                                                            sx={{
                                                                width: 24,
                                                                height: 24,
                                                                borderRadius: 1,
                                                                bgcolor: 'rgba(245, 158, 11, 0.1)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <CurrencyRupeeIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
                                                        </Box>
                                                        <Box>
                                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Fixed (₹)</Typography>
                                                            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                                                                Fixed amount
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Discount Value"
                                            placeholder={formData.discountType === 'percentage' ? '25' : '500'}
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                            error={!!formErrors.discountValue}
                                            helperText={formErrors.discountValue}
                                            inputProps={{
                                                min: formData.discountType === 'percentage' ? 1 : 0.01,
                                                max: formData.discountType === 'percentage' ? 100 : null,
                                                step: formData.discountType === 'percentage' ? 1 : 0.01,
                                            }}
                                            required
                                            size={isMobile ? "small" : "medium"}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1.5,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    transition: 'all 0.2s ease',
                                                    minHeight: '40px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0,0,0,0.03)',
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                    color: 'text.secondary',
                                                    fontSize: '0.75rem',
                                                    '&.Mui-focused': {
                                                        color: 'primary.main',
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                    py: 0.8,
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    fontSize: '0.65rem',
                                                    marginLeft: 0.5,
                                                },
                                            }}
                                            InputProps={{
                                                endAdornment: formData.discountType === 'percentage' ? (
                                                    <InputAdornment position="end">
                                                        <Typography sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>%</Typography>
                                                    </InputAdornment>
                                                ) : null,
                                            }}
                                        />
                                    </Grid>

                                    {/* Minimum Amount */}
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Minimum Order Amount"
                                            placeholder="1000"
                                            value={formData.minAmount}
                                            onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                                            error={!!formErrors.minAmount}
                                            helperText={formErrors.minAmount || 'Minimum required'}
                                            inputProps={{ min: 0, step: 0.01 }}
                                            size={isMobile ? "small" : "medium"}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1.5,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    transition: 'all 0.2s ease',
                                                    minHeight: '40px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0,0,0,0.03)',
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                    color: 'text.secondary',
                                                    fontSize: '0.75rem',
                                                    '&.Mui-focused': {
                                                        color: 'primary.main',
                                                    },
                                                },
                                                '& .MuiInputBase-input': {
                                                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                    py: 0.8,
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    fontSize: '0.65rem',
                                                    marginLeft: 0.5,
                                                },
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem' }}>₹</Typography>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    {/* Status */}
                                    <Grid item xs={12}>
                                        <FormControl
                                            fullWidth
                                            size={isMobile ? "small" : "medium"}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 1.5,
                                                    backgroundColor: 'rgba(0,0,0,0.02)',
                                                    transition: 'all 0.2s ease',
                                                    minHeight: '40px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0,0,0,0.03)',
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'transparent',
                                                        boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                    color: 'text.secondary',
                                                    fontSize: '0.75rem',
                                                    '&.Mui-focused': {
                                                        color: 'primary.main',
                                                    },
                                                },
                                                '& .MuiSelect-select': {
                                                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                    py: 0.8,
                                                },
                                            }}
                                        >
                                            <InputLabel sx={{ fontSize: '0.75rem' }}>Status</InputLabel>
                                            <Select
                                                value={formData.status}
                                                label="Status"
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box
                                                            sx={{
                                                                width: 6,
                                                                height: 6,
                                                                borderRadius: '50%',
                                                                bgcolor: selected === 'active' ? 'success.main' : 'warning.main',
                                                                boxShadow: `0 0 0 1px ${selected === 'active'
                                                                    ? 'rgba(34, 197, 94, 0.2)'
                                                                    : 'rgba(245, 158, 11, 0.2)'}`,
                                                            }}
                                                        />
                                                        <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.8rem', textTransform: 'capitalize' }}>
                                                            {selected}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            borderRadius: 1.5,
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                            mt: 0.5,
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="active">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
                                                        <Box
                                                            sx={{
                                                                width: 6,
                                                                height: 6,
                                                                borderRadius: '50%',
                                                                bgcolor: 'success.main',
                                                            }}
                                                        />
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Active</Typography>
                                                            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                                                                Available
                                                            </Typography>
                                                        </Box>
                                                        <Chip
                                                            label="Live"
                                                            size="small"
                                                            sx={{
                                                                fontSize: '0.55rem',
                                                                height: 18,
                                                                bgcolor: 'rgba(34, 197, 94, 0.1)',
                                                                color: 'success.main',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="inactive">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
                                                        <Box
                                                            sx={{
                                                                width: 6,
                                                                height: 6,
                                                                borderRadius: '50%',
                                                                bgcolor: 'warning.main',
                                                            }}
                                                        />
                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Inactive</Typography>
                                                            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                                                                Hidden
                                                            </Typography>
                                                        </Box>
                                                        <Chip
                                                            label="Draft"
                                                            size="small"
                                                            sx={{
                                                                fontSize: '0.55rem',
                                                                height: 18,
                                                                bgcolor: 'rgba(245, 158, 11, 0.1)',
                                                                color: 'warning.main',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Preview Card - Shows coupon summary */}
                                    {formData.description && formData.discountValue && (
                                        <Grid item xs={12}>
                                            <Fade in>
                                                <Box
                                                    sx={{
                                                        mt: 0.5,
                                                        p: 1.5,
                                                        borderRadius: 1.5,
                                                        bgcolor: 'rgba(47, 110, 170, 0.04)',
                                                        border: '1px dashed',
                                                        borderColor: 'primary.main',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        minHeight: '70px',
                                                    }}
                                                >
                                                    {/* Decorative Elements */}
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: -8,
                                                            right: -8,
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            bgcolor: 'rgba(47, 110, 170, 0.05)',
                                                        }}
                                                    />

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
                                                        <Box
                                                            sx={{
                                                                width: 32,
                                                                height: 32,
                                                                borderRadius: 1.5,
                                                                bgcolor: 'primary.main',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <LocalOfferIcon sx={{ fontSize: 18, color: 'white' }} />
                                                        </Box>

                                                        <Box sx={{ flex: 1 }}>
                                                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.primary', mb: 0.2 }}>
                                                                Preview
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mb: 0.5 }} noWrap>
                                                                {formData.description.length > 40
                                                                    ? `${formData.description.substring(0, 40)}...`
                                                                    : formData.description}
                                                            </Typography>

                                                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                                                <Chip
                                                                    size="small"
                                                                    label={formData.discountType === 'percentage'
                                                                        ? `${formData.discountValue}% OFF`
                                                                        : `₹${formData.discountValue} OFF`}
                                                                    sx={{
                                                                        bgcolor: 'primary.main',
                                                                        color: 'white',
                                                                        fontSize: '0.55rem',
                                                                        height: 20,
                                                                    }}
                                                                />
                                                                {formData.minAmount > 0 && (
                                                                    <Chip
                                                                        size="small"
                                                                        label={`Min ₹${formData.minAmount}`}
                                                                        variant="outlined"
                                                                        sx={{
                                                                            fontSize: '0.55rem',
                                                                            height: 20,
                                                                            borderColor: 'primary.main',
                                                                            color: 'primary.main',
                                                                        }}
                                                                    />
                                                                )}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Fade>
                                        </Grid>
                                    )}
                                </Grid>

                                {/* Form Actions */}
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 1.5,
                                    pt: 2,
                                    mt: 1.5,
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            setShowModal(false);
                                            resetForm();
                                        }}
                                        size={isMobile ? "small" : "medium"}
                                        sx={{
                                            px: 2.5,
                                            py: 0.8,
                                            borderRadius: 1.5,
                                            fontSize: isMobile ? '0.7rem' : '0.75rem',
                                            fontWeight: 600,
                                            borderColor: 'rgba(47, 110, 170, 0.3)',
                                            color: 'text.secondary',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                bgcolor: 'rgba(47, 110, 170, 0.04)',
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={createLoading || updateLoading}
                                        size={isMobile ? "small" : "medium"}
                                        sx={{
                                            px: 3,
                                            py: 0.8,
                                            borderRadius: 1.5,
                                            fontSize: isMobile ? '0.7rem' : '0.75rem',
                                            fontWeight: 600,
                                            background: 'linear-gradient(135deg, #2f6eaa 0%, #1e4f7a 100%)',
                                            boxShadow: '0 2px 8px rgba(47, 110, 170, 0.15)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #1e4f7a 0%, #2f6eaa 100%)',
                                                boxShadow: '0 4px 12px rgba(47, 110, 170, 0.2)',
                                            },
                                            '&.Mui-disabled': {
                                                background: 'rgba(47, 110, 170, 0.3)',
                                            },
                                        }}
                                        startIcon={createLoading || updateLoading ? (
                                            <CircularProgress size={14} sx={{ color: 'white' }} />
                                        ) : null}
                                    >
                                        {createLoading || updateLoading
                                            ? (selectedCoupon ? 'Updating...' : 'Creating...')
                                            : (selectedCoupon ? 'Update' : 'Create')
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </MuiModal>
            
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