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
//     Modal as MuiModal,
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
//                 <Skeleton variant="text" width={80} height={14} sx={{ mr: 1.2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="rounded" width={70} height={28} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
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

//             {/* Create/Edit Modal - Centered Exactly */}
//             <MuiModal
//                 open={showModal}
//                 onClose={() => {
//                     setShowModal(false);
//                     resetForm();
//                 }}
//                 closeAfterTransition
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     zIndex: 1300,
//                 }}
//                 BackdropProps={{
//                     sx: {
//                         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                         backdropFilter: 'blur(4px)',
//                     }
//                 }}
//             >
//                 <Fade in={showModal}>
//                     <Box
//                         sx={{
//                             position: 'relative',
//                             width: '100%',
//                             maxWidth: { xs: '95%', sm: '550px' },
//                             maxHeight: '90vh',
//                             overflow: 'auto',
//                             margin: '0 auto',
//                             backgroundColor: theme.palette.background.paper,
//                             borderRadius: 2.5,
//                             boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
//                             outline: 'none',
//                         }}
//                     >
//                         {/* Modal Header */}
//                         <Box
//                             sx={{
//                                 p: { xs: 1.5, sm: 2 },
//                                 borderBottom: '1px solid',
//                                 borderColor: 'divider',
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'space-between',
//                                 position: 'sticky',
//                                 top: 0,
//                                 zIndex: 1,
//                             }}
//                         >
//                             <Typography
//                                 variant="h6"
//                                 sx={{
//                                     fontSize: { xs: '1rem', sm: '1.1rem' },
//                                     fontWeight: 600,
//                                     color: '#ffffff',
//                                 }}
//                             >
//                                 {selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
//                             </Typography>
//                             <IconButton
//                                 onClick={() => {
//                                     setShowModal(false);
//                                     resetForm();
//                                 }}
//                                 size="small"
//                                 sx={{
//                                     color: '#ffffff',
//                                     '&:hover': {
//                                         bgcolor: 'rgba(255,255,255,0.1)',
//                                     },
//                                 }}
//                             >
//                                 <CloseIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//                             </IconButton>
//                         </Box>

//                         {/* Modal Content */}
//                         <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
//                             <Box
//                                 component="form"
//                                 onSubmit={handleSubmit}
//                                 sx={{
//                                     width: '100%',
//                                 }}
//                             >
//                                 <Grid container spacing={1.5}>
//                                     {/* Description */}
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             multiline
//                                             rows={3}
//                                             label="Description"
//                                             placeholder="e.g. Summer Sale 2026"
//                                             value={formData.description}
//                                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                             error={!!formErrors.description}
//                                             helperText={formErrors.description}
//                                             required
//                                             size={isMobile ? "small" : "medium"}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: 1.5,
//                                                     backgroundColor: 'rgba(0,0,0,0.02)',
//                                                     transition: 'all 0.2s ease',
//                                                     minHeight: '70px',
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(0,0,0,0.03)',
//                                                     },
//                                                     '&.Mui-focused': {
//                                                         backgroundColor: 'transparent',
//                                                         boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                                     },
//                                                 },
//                                                 '& .MuiInputLabel-root': {
//                                                     fontWeight: 500,
//                                                     color: 'text.secondary',
//                                                     fontSize: '0.75rem',
//                                                     '&.Mui-focused': {
//                                                         color: 'primary.main',
//                                                     },
//                                                 },
//                                                 '& .MuiInputBase-input': {
//                                                     fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                                 },
//                                                 '& .MuiFormHelperText-root': {
//                                                     fontSize: '0.65rem',
//                                                     marginLeft: 0.5,
//                                                 },
//                                             }}
//                                         />
//                                     </Grid>

//                                     {/* Discount Type and Value */}
//                                     <Grid item xs={12} sm={6}>
//                                         <FormControl
//                                             fullWidth
//                                             size={isMobile ? "small" : "medium"}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: 1.5,
//                                                     backgroundColor: 'rgba(0,0,0,0.02)',
//                                                     transition: 'all 0.2s ease',
//                                                     minHeight: '40px',
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(0,0,0,0.03)',
//                                                     },
//                                                     '&.Mui-focused': {
//                                                         backgroundColor: 'transparent',
//                                                         boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                                     },
//                                                 },
//                                                 '& .MuiInputLabel-root': {
//                                                     fontWeight: 500,
//                                                     color: 'text.secondary',
//                                                     fontSize: '0.75rem',
//                                                     '&.Mui-focused': {
//                                                         color: 'primary.main',
//                                                     },
//                                                 },
//                                                 '& .MuiSelect-select': {
//                                                     fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                                     py: 0.8,
//                                                 },
//                                             }}
//                                         >
//                                             <InputLabel sx={{ fontSize: '0.75rem' }}>Discount Type</InputLabel>
//                                             <Select
//                                                 value={formData.discountType}
//                                                 label="Discount Type"
//                                                 onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
//                                                 MenuProps={{
//                                                     PaperProps: {
//                                                         sx: {
//                                                             borderRadius: 1.5,
//                                                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                                             mt: 0.5,
//                                                         },
//                                                     },
//                                                 }}
//                                             >
//                                                 <MenuItem value="percentage">
//                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
//                                                         <Box
//                                                             sx={{
//                                                                 width: 24,
//                                                                 height: 24,
//                                                                 borderRadius: 1,
//                                                                 bgcolor: 'rgba(47, 110, 170, 0.1)',
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                             }}
//                                                         >
//                                                             <PercentIcon sx={{ fontSize: 14, color: 'primary.main' }} />
//                                                         </Box>
//                                                         <Box>
//                                                             <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Percentage (%)</Typography>
//                                                             <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                                 Percentage off
//                                                             </Typography>
//                                                         </Box>
//                                                     </Box>
//                                                 </MenuItem>
//                                                 <MenuItem value="fixed">
//                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4 }}>
//                                                         <Box
//                                                             sx={{
//                                                                 width: 24,
//                                                                 height: 24,
//                                                                 borderRadius: 1,
//                                                                 bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                             }}
//                                                         >
//                                                             <CurrencyRupeeIcon sx={{ fontSize: 14, color: 'secondary.main' }} />
//                                                         </Box>
//                                                         <Box>
//                                                             <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Fixed (₹)</Typography>
//                                                             <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                                 Fixed amount
//                                                             </Typography>
//                                                         </Box>
//                                                     </Box>
//                                                 </MenuItem>
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>

//                                     <Grid item xs={12} sm={6}>
//                                         <TextField
//                                             fullWidth
//                                             type="number"
//                                             label="Discount Value"
//                                             placeholder={formData.discountType === 'percentage' ? '25' : '500'}
//                                             value={formData.discountValue}
//                                             onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
//                                             error={!!formErrors.discountValue}
//                                             helperText={formErrors.discountValue}
//                                             inputProps={{
//                                                 min: formData.discountType === 'percentage' ? 1 : 0.01,
//                                                 max: formData.discountType === 'percentage' ? 100 : null,
//                                                 step: formData.discountType === 'percentage' ? 1 : 0.01,
//                                             }}
//                                             required
//                                             size={isMobile ? "small" : "medium"}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: 1.5,
//                                                     backgroundColor: 'rgba(0,0,0,0.02)',
//                                                     transition: 'all 0.2s ease',
//                                                     minHeight: '40px',
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(0,0,0,0.03)',
//                                                     },
//                                                     '&.Mui-focused': {
//                                                         backgroundColor: 'transparent',
//                                                         boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                                     },
//                                                 },
//                                                 '& .MuiInputLabel-root': {
//                                                     fontWeight: 500,
//                                                     color: 'text.secondary',
//                                                     fontSize: '0.75rem',
//                                                     '&.Mui-focused': {
//                                                         color: 'primary.main',
//                                                     },
//                                                 },
//                                                 '& .MuiInputBase-input': {
//                                                     fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                                     py: 0.8,
//                                                 },
//                                                 '& .MuiFormHelperText-root': {
//                                                     fontSize: '0.65rem',
//                                                     marginLeft: 0.5,
//                                                 },
//                                             }}
//                                             InputProps={{
//                                                 endAdornment: formData.discountType === 'percentage' ? (
//                                                     <InputAdornment position="end">
//                                                         <Typography sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>%</Typography>
//                                                     </InputAdornment>
//                                                 ) : null,
//                                             }}
//                                         />
//                                     </Grid>

//                                     {/* Minimum Amount */}
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             fullWidth
//                                             type="number"
//                                             label="Minimum Order Amount"
//                                             placeholder="1000"
//                                             value={formData.minAmount}
//                                             onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
//                                             error={!!formErrors.minAmount}
//                                             helperText={formErrors.minAmount || 'Minimum required'}
//                                             inputProps={{ min: 0, step: 0.01 }}
//                                             size={isMobile ? "small" : "medium"}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: 1.5,
//                                                     backgroundColor: 'rgba(0,0,0,0.02)',
//                                                     transition: 'all 0.2s ease',
//                                                     minHeight: '40px',
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(0,0,0,0.03)',
//                                                     },
//                                                     '&.Mui-focused': {
//                                                         backgroundColor: 'transparent',
//                                                         boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                                     },
//                                                 },
//                                                 '& .MuiInputLabel-root': {
//                                                     fontWeight: 500,
//                                                     color: 'text.secondary',
//                                                     fontSize: '0.75rem',
//                                                     '&.Mui-focused': {
//                                                         color: 'primary.main',
//                                                     },
//                                                 },
//                                                 '& .MuiInputBase-input': {
//                                                     fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                                     py: 0.8,
//                                                 },
//                                                 '& .MuiFormHelperText-root': {
//                                                     fontSize: '0.65rem',
//                                                     marginLeft: 0.5,
//                                                 },
//                                             }}
//                                             InputProps={{
//                                                 startAdornment: (
//                                                     <InputAdornment position="start">
//                                                         <Typography sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem' }}>₹</Typography>
//                                                     </InputAdornment>
//                                                 ),
//                                             }}
//                                         />
//                                     </Grid>

//                                     {/* Status */}
//                                     <Grid item xs={12}>
//                                         <FormControl
//                                             fullWidth
//                                             size={isMobile ? "small" : "medium"}
//                                             sx={{
//                                                 '& .MuiOutlinedInput-root': {
//                                                     borderRadius: 1.5,
//                                                     backgroundColor: 'rgba(0,0,0,0.02)',
//                                                     transition: 'all 0.2s ease',
//                                                     minHeight: '40px',
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(0,0,0,0.03)',
//                                                     },
//                                                     '&.Mui-focused': {
//                                                         backgroundColor: 'transparent',
//                                                         boxShadow: '0 0 0 2px rgba(47, 110, 170, 0.1)',
//                                                     },
//                                                 },
//                                                 '& .MuiInputLabel-root': {
//                                                     fontWeight: 500,
//                                                     color: 'text.secondary',
//                                                     fontSize: '0.75rem',
//                                                     '&.Mui-focused': {
//                                                         color: 'primary.main',
//                                                     },
//                                                 },
//                                                 '& .MuiSelect-select': {
//                                                     fontSize: isMobile ? '0.75rem' : '0.8rem',
//                                                     py: 0.8,
//                                                 },
//                                             }}
//                                         >
//                                             <InputLabel sx={{ fontSize: '0.75rem' }}>Status</InputLabel>
//                                             <Select
//                                                 value={formData.status}
//                                                 label="Status"
//                                                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                                                 renderValue={(selected) => (
//                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                                         <Box
//                                                             sx={{
//                                                                 width: 6,
//                                                                 height: 6,
//                                                                 borderRadius: '50%',
//                                                                 bgcolor: selected === 'active' ? 'success.main' : 'warning.main',
//                                                                 boxShadow: `0 0 0 1px ${selected === 'active'
//                                                                     ? 'rgba(34, 197, 94, 0.2)'
//                                                                     : 'rgba(245, 158, 11, 0.2)'}`,
//                                                             }}
//                                                         />
//                                                         <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.8rem', textTransform: 'capitalize' }}>
//                                                             {selected}
//                                                         </Typography>
//                                                     </Box>
//                                                 )}
//                                                 MenuProps={{
//                                                     PaperProps: {
//                                                         sx: {
//                                                             borderRadius: 1.5,
//                                                             boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                                                             mt: 0.5,
//                                                         },
//                                                     },
//                                                 }}
//                                             >
//                                                 <MenuItem value="active">
//                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
//                                                         <Box
//                                                             sx={{
//                                                                 width: 6,
//                                                                 height: 6,
//                                                                 borderRadius: '50%',
//                                                                 bgcolor: 'success.main',
//                                                             }}
//                                                         />
//                                                         <Box sx={{ flex: 1 }}>
//                                                             <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Active</Typography>
//                                                             <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                                 Available
//                                                             </Typography>
//                                                         </Box>
//                                                         <Chip
//                                                             label="Live"
//                                                             size="small"
//                                                             sx={{
//                                                                 fontSize: '0.55rem',
//                                                                 height: 18,
//                                                                 bgcolor: 'rgba(34, 197, 94, 0.1)',
//                                                                 color: 'success.main',
//                                                                 fontWeight: 600,
//                                                             }}
//                                                         />
//                                                     </Box>
//                                                 </MenuItem>
//                                                 <MenuItem value="inactive">
//                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.4, width: '100%' }}>
//                                                         <Box
//                                                             sx={{
//                                                                 width: 6,
//                                                                 height: 6,
//                                                                 borderRadius: '50%',
//                                                                 bgcolor: 'warning.main',
//                                                             }}
//                                                         />
//                                                         <Box sx={{ flex: 1 }}>
//                                                             <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>Inactive</Typography>
//                                                             <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                                                                 Hidden
//                                                             </Typography>
//                                                         </Box>
//                                                         <Chip
//                                                             label="Draft"
//                                                             size="small"
//                                                             sx={{
//                                                                 fontSize: '0.55rem',
//                                                                 height: 18,
//                                                                 bgcolor: 'rgba(245, 158, 11, 0.1)',
//                                                                 color: 'warning.main',
//                                                                 fontWeight: 600,
//                                                             }}
//                                                         />
//                                                     </Box>
//                                                 </MenuItem>
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>

//                                     {/* Preview Card - Shows coupon summary */}
//                                     {formData.description && formData.discountValue && (
//                                         <Grid item xs={12}>
//                                             <Fade in>
//                                                 <Box
//                                                     sx={{
//                                                         mt: 0.5,
//                                                         p: 1.5,
//                                                         borderRadius: 1.5,
//                                                         bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                                         border: '1px dashed',
//                                                         borderColor: 'primary.main',
//                                                         position: 'relative',
//                                                         overflow: 'hidden',
//                                                         minHeight: '70px',
//                                                     }}
//                                                 >
//                                                     {/* Decorative Elements */}
//                                                     <Box
//                                                         sx={{
//                                                             position: 'absolute',
//                                                             top: -8,
//                                                             right: -8,
//                                                             width: 40,
//                                                             height: 40,
//                                                             borderRadius: '50%',
//                                                             bgcolor: 'rgba(47, 110, 170, 0.05)',
//                                                         }}
//                                                     />

//                                                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 1 }}>
//                                                         <Box
//                                                             sx={{
//                                                                 width: 32,
//                                                                 height: 32,
//                                                                 borderRadius: 1.5,
//                                                                 bgcolor: 'primary.main',
//                                                                 display: 'flex',
//                                                                 alignItems: 'center',
//                                                                 justifyContent: 'center',
//                                                             }}
//                                                         >
//                                                             <LocalOfferIcon sx={{ fontSize: 18, color: 'white' }} />
//                                                         </Box>

//                                                         <Box sx={{ flex: 1 }}>
//                                                             <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.primary', mb: 0.2 }}>
//                                                                 Preview
//                                                             </Typography>
//                                                             <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mb: 0.5 }} noWrap>
//                                                                 {formData.description.length > 40
//                                                                     ? `${formData.description.substring(0, 40)}...`
//                                                                     : formData.description}
//                                                             </Typography>

//                                                             <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
//                                                                 <Chip
//                                                                     size="small"
//                                                                     label={formData.discountType === 'percentage'
//                                                                         ? `${formData.discountValue}% OFF`
//                                                                         : `₹${formData.discountValue} OFF`}
//                                                                     sx={{
//                                                                         bgcolor: 'primary.main',
//                                                                         color: 'white',
//                                                                         fontSize: '0.55rem',
//                                                                         height: 20,
//                                                                     }}
//                                                                 />
//                                                                 {formData.minAmount > 0 && (
//                                                                     <Chip
//                                                                         size="small"
//                                                                         label={`Min ₹${formData.minAmount}`}
//                                                                         variant="outlined"
//                                                                         sx={{
//                                                                             fontSize: '0.55rem',
//                                                                             height: 20,
//                                                                             borderColor: 'primary.main',
//                                                                             color: 'primary.main',
//                                                                         }}
//                                                                     />
//                                                                 )}
//                                                             </Box>
//                                                         </Box>
//                                                     </Box>
//                                                 </Box>
//                                             </Fade>
//                                         </Grid>
//                                     )}
//                                 </Grid>

//                                 {/* Form Actions */}
//                                 <Box sx={{
//                                     display: 'flex',
//                                     justifyContent: 'flex-end',
//                                     gap: 1.5,
//                                     pt: 2,
//                                     mt: 1.5,
//                                     borderTop: '1px solid',
//                                     borderColor: 'divider',
//                                 }}>
//                                     <Button
//                                         variant="outlined"
//                                         onClick={() => {
//                                             setShowModal(false);
//                                             resetForm();
//                                         }}
//                                         size={isMobile ? "small" : "medium"}
//                                         sx={{
//                                             px: 2.5,
//                                             py: 0.8,
//                                             borderRadius: 1.5,
//                                             fontSize: isMobile ? '0.7rem' : '0.75rem',
//                                             fontWeight: 600,
//                                             borderColor: 'rgba(47, 110, 170, 0.3)',
//                                             color: 'text.secondary',
//                                             '&:hover': {
//                                                 borderColor: 'primary.main',
//                                                 bgcolor: 'rgba(47, 110, 170, 0.04)',
//                                             },
//                                         }}
//                                     >
//                                         Cancel
//                                     </Button>
//                                     <Button
//                                         type="submit"
//                                         variant="contained"
//                                         color="primary"
//                                         disabled={createLoading || updateLoading}
//                                         size={isMobile ? "small" : "medium"}
//                                         sx={{
//                                             px: 3,
//                                             py: 0.8,
//                                             borderRadius: 1.5,
//                                             fontSize: isMobile ? '0.7rem' : '0.75rem',
//                                             fontWeight: 600,
//                                             background: 'linear-gradient(135deg, #2f6eaa 0%, #1e4f7a 100%)',
//                                             boxShadow: '0 2px 8px rgba(47, 110, 170, 0.15)',
//                                             '&:hover': {
//                                                 background: 'linear-gradient(135deg, #1e4f7a 0%, #2f6eaa 100%)',
//                                                 boxShadow: '0 4px 12px rgba(47, 110, 170, 0.2)',
//                                             },
//                                             '&.Mui-disabled': {
//                                                 background: 'rgba(47, 110, 170, 0.3)',
//                                             },
//                                         }}
//                                         startIcon={createLoading || updateLoading ? (
//                                             <CircularProgress size={14} sx={{ color: 'white' }} />
//                                         ) : null}
//                                     >
//                                         {createLoading || updateLoading
//                                             ? (selectedCoupon ? 'Updating...' : 'Creating...')
//                                             : (selectedCoupon ? 'Update' : 'Create')
//                                         }
//                                     </Button>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </Box>
//                 </Fade>
//             </MuiModal>

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









/////////New Fields Add
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
    Grid,
    IconButton,
    Chip,
    InputAdornment,
    Skeleton,
    useTheme,
    alpha,
    Container,
    Avatar,
    useMediaQuery,
    Fade,
    CircularProgress,
    Modal as MuiModal,
    Tooltip,
    Card,
    CardContent,
    CardActions,
    Divider,
    TablePagination,
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
    DateRange as DateRangeIcon,
    People as PeopleIcon,
    ContentCopy as ContentCopyIcon,
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
    FaInfinity,
} from 'react-icons/fa';

import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

// Helper function to format date
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

// Helper to check if coupon is expiring soon
const isExpiringSoon = (endDate) => {
    if (!endDate) return false;
    const now = new Date();
    const end = new Date(endDate);
    const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7 && daysLeft > 0;
};

// Helper to check if coupon is valid
const isValidDate = (startDate, endDate) => {
    if (!startDate && !endDate) return true;
    if (!startDate || !endDate) return true;
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return now >= start && now <= end;
};

// ==================== MEMOIZED COMPONENTS ====================

// Stats Card Skeleton Component
const StatsCardSkeleton = memo(({ isSmallMobile, isMobile, isTablet }) => {
    const theme = useTheme();

    const getGridColumns = () => {
        if (isSmallMobile) return 12;
        if (isMobile) return 6;
        if (isTablet) return 4;
        return 2;
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

// Coupon Card Skeleton
const CouponCardSkeleton = memo(({ isSmallMobile, isMobile }) => {
    const theme = useTheme();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{
                borderRadius: 2.5,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
            }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Skeleton variant="rounded" width={80} height={28} sx={{ borderRadius: 1.5 }} />
                        <Skeleton variant="circular" width={32} height={32} />
                    </Box>
                    <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="70%" height={16} sx={{ mb: 1.5 }} />
                    <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                        <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 1 }} />
                        <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 1 }} />
                    </Box>
                    <Skeleton variant="rounded" width="100%" height={60} sx={{ borderRadius: 1.5 }} />
                </CardContent>
                <CardActions sx={{ pt: 0, pb: 1.5, px: 2 }}>
                    <Skeleton variant="rounded" width={100} height={32} sx={{ borderRadius: 1.5 }} />
                    <Box sx={{ flex: 1 }} />
                    <Skeleton variant="circular" width={32} height={32} />
                    <Skeleton variant="circular" width={32} height={32} />
                </CardActions>
            </Card>
        </Grid>
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
            label: "Expired",
            count: stats?.expiredCoupons || 0,
            icon: <FaExclamationCircle />,
            bgColor: alpha("#EF4444", 0.1),
            iconColor: "#EF4444",
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
        return 2;
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

// Coupon Card Component
const CouponCard = memo(({ coupon, onEdit, onDelete, isSuperAdmin, theme, onCopyCode, copiedCode }) => {
    const isUnlimited = coupon.maxUsageCount === null || coupon.maxUsageCount === undefined;
    const remainingUses = !isUnlimited ? (coupon.maxUsageCount - (coupon.usedCount || 0)) : null;
    const isValid = isValidDate(coupon.startDate, coupon.endDate);
    const expiringSoon = isExpiringSoon(coupon.endDate);
    const usagePercentage = !isUnlimited ? (coupon.usedCount / coupon.maxUsageCount) * 100 : 0;
    const [isHovered, setIsHovered] = useState(false);

    const getStatusColor = () => {
        if (coupon.status === 'active') return { bg: '#22C55E', color: '#22C55E' };
        if (coupon.status === 'expired') return { bg: '#EF4444', color: '#EF4444' };
        return { bg: '#F59E0B', color: '#F59E0B' };
    };

    const statusColor = getStatusColor();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
            >
                <Card
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    sx={{
                        borderRadius: 2.5,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        '&:hover': {
                            boxShadow: `0 12px 28px -8px ${alpha(theme.palette.primary.main, 0.2)}`,
                            borderColor: alpha(statusColor.color, 0.3),
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 3,
                            background: `linear-gradient(90deg, ${statusColor.color}, ${alpha(statusColor.color, 0.5)})`,
                            transition: 'all 0.3s ease',
                        },
                    }}
                >
                    <CardContent sx={{ p: 2 }}>
                        {/* Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        bgcolor: statusColor.color,
                                        animation: coupon.status === 'active' ? 'pulse 2s infinite' : 'none',
                                        '@keyframes pulse': {
                                            '0%': { transform: 'scale(0.95)', opacity: 0.7 },
                                            '70%': { transform: 'scale(1.2)', opacity: 1 },
                                            '100%': { transform: 'scale(0.95)', opacity: 0.7 },
                                        },
                                    }}
                                />
                                <Chip
                                    label={coupon.status.toUpperCase()}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: '0.55rem',
                                        fontWeight: 600,
                                        bgcolor: alpha(statusColor.color, 0.1),
                                        color: statusColor.color,
                                    }}
                                />
                                {expiringSoon && coupon.status === 'active' && (
                                    <Chip
                                        label="Expiring Soon"
                                        size="small"
                                        sx={{
                                            height: 20,
                                            fontSize: '0.5rem',
                                            fontWeight: 600,
                                            bgcolor: alpha('#F59E0B', 0.1),
                                            color: '#F59E0B',
                                        }}
                                    />
                                )}
                            </Box>
                            <Tooltip title={coupon.discountType === 'percentage' ? 'Percentage Discount' : 'Fixed Discount'}>
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: coupon.discountType === 'percentage'
                                            ? alpha(theme.palette.primary.main, 0.1)
                                            : alpha(theme.palette.secondary.main, 0.1),
                                        color: coupon.discountType === 'percentage'
                                            ? theme.palette.primary.main
                                            : theme.palette.secondary.main,
                                    }}
                                >
                                    {coupon.discountType === 'percentage' ? (
                                        <PercentIcon sx={{ fontSize: 16 }} />
                                    ) : (
                                        <CurrencyRupeeIcon sx={{ fontSize: 16 }} />
                                    )}
                                </Avatar>
                            </Tooltip>
                        </Box>

                        {/* Code */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip
                                label={coupon.code}
                                sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
                                    height: 28,
                                    fontFamily: 'monospace',
                                    letterSpacing: 0.5,
                                }}
                            />
                            <Tooltip title="Copy code">
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCopyCode(coupon.code);
                                    }}
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        color: copiedCode === coupon.code ? '#22C55E' : theme.palette.text.secondary,
                                    }}
                                >
                                    <ContentCopyIcon sx={{ fontSize: 14 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {/* Description */}
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '0.7rem',
                                color: theme.palette.text.secondary,
                                mb: 1.5,
                                lineHeight: 1.4,
                                minHeight: 40,
                            }}
                        >
                            {coupon.description}
                        </Typography>

                        {/* Discount and Min Amount */}
                        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                            <Chip
                                size="small"
                                icon={coupon.discountType === 'percentage' ?
                                    <PercentIcon sx={{ fontSize: 12 }} /> :
                                    <CurrencyRupeeIcon sx={{ fontSize: 12 }} />
                                }
                                label={coupon.discountType === 'percentage' ?
                                    `${coupon.discountValue}% OFF` :
                                    `₹${coupon.discountValue} OFF`
                                }
                                sx={{
                                    bgcolor: coupon.discountType === 'percentage'
                                        ? alpha(theme.palette.primary.main, 0.1)
                                        : alpha(theme.palette.secondary.main, 0.1),
                                    color: coupon.discountType === 'percentage'
                                        ? theme.palette.primary.main
                                        : theme.palette.secondary.main,
                                    fontSize: '0.6rem',
                                    height: 24,
                                }}
                            />
                            {coupon.minAmount > 0 && (
                                <Chip
                                    size="small"
                                    icon={<CurrencyRupeeIcon sx={{ fontSize: 12 }} />}
                                    label={`Min ₹${coupon.minAmount}`}
                                    variant="outlined"
                                    sx={{ fontSize: '0.6rem', height: 24 }}
                                />
                            )}
                        </Box>

                        {/* Usage Progress */}
                        <Box sx={{ mb: 1.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="caption" sx={{ fontSize: '0.55rem', fontWeight: 500 }}>
                                    {coupon.usedCount || 0} / {isUnlimited ? '∞' : coupon.maxUsageCount} uses
                                </Typography>
                                {!isUnlimited && (
                                    <Typography variant="caption" sx={{ fontSize: '0.5rem', color: remainingUses <= 5 ? '#EF4444' : theme.palette.text.secondary }}>
                                        {remainingUses} left
                                    </Typography>
                                )}
                            </Box>
                            {!isUnlimited ? (
                                <Box sx={{
                                    height: 3,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    borderRadius: 1.5,
                                    overflow: 'hidden',
                                }}>
                                    <Box
                                        sx={{
                                            width: `${usagePercentage}%`,
                                            height: '100%',
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                            borderRadius: 1.5,
                                            transition: 'width 0.3s ease',
                                        }}
                                    />
                                </Box>
                            ) : (
                                <Box sx={{
                                    height: 3,
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    borderRadius: 1.5,
                                    background: `repeating-linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.3)}, ${alpha(theme.palette.primary.main, 0.3)} 5px, ${alpha(theme.palette.primary.main, 0.1)} 5px, ${alpha(theme.palette.primary.main, 0.1)} 10px)`,
                                }} />
                            )}
                        </Box>

                        {/* Date Range - Optional */}
                        <Box
                            sx={{
                                p: 1,
                                borderRadius: 1.5,
                                bgcolor: alpha(theme.palette.primary.main, 0.04),
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <DateRangeIcon sx={{ fontSize: 12, color: theme.palette.text.secondary }} />
                                <Typography variant="caption" sx={{ fontSize: '0.55rem', fontWeight: 500 }}>
                                    Valid Period
                                </Typography>
                            </Box>
                            {coupon.startDate && coupon.endDate ? (
                                <Typography variant="body2" sx={{ fontSize: '0.6rem', color: theme.palette.text.primary }}>
                                    {formatDate(coupon.startDate)} → {formatDate(coupon.endDate)}
                                </Typography>
                            ) : (
                                <Typography variant="body2" sx={{ fontSize: '0.6rem', color: theme.palette.text.disabled, fontStyle: 'italic' }}>
                                    No date restriction
                                </Typography>
                            )}
                        </Box>
                    </CardContent>

                    <Divider sx={{ mx: 2 }} />

                    <CardActions sx={{ px: 2, py: 1.5, justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FaCalendarAlt size={10} color={theme.palette.text.secondary} />
                            <Typography variant="caption" sx={{ fontSize: '0.5rem', color: theme.palette.text.secondary }}>
                                Created: {formatDate(coupon.createdAt)}
                            </Typography>
                        </Box>
                        {isSuperAdmin && (
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                                <Tooltip title="Edit Coupon">
                                    <IconButton
                                        size="small"
                                        onClick={() => onEdit(coupon)}
                                        sx={{
                                            color: theme.palette.primary.main,
                                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                                        }}
                                    >
                                        <EditIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Coupon">
                                    <IconButton
                                        size="small"
                                        onClick={() => onDelete(coupon)}
                                        sx={{
                                            color: theme.palette.error.main,
                                            '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) },
                                        }}
                                    >
                                        <DeleteIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        )}
                    </CardActions>
                </Card>
            </motion.div>
        </Grid>
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

    const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
    const [copiedCode, setCopiedCode] = useState(null);

    const {
        coupons,
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
        maxUsageCount: null,
        startDate: '',
        endDate: '',
        status: 'active'
    });
    const [searchInput, setSearchInput] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [page, setPage] = useState(0);

    const isSuperAdmin = user?.role_id === 2;

    useEffect(() => {
        loadCoupons();

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

    const handleCopyCode = useCallback((code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
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

        if (formData.maxUsageCount !== null && formData.maxUsageCount !== '' && formData.maxUsageCount < 1) {
            errors.maxUsageCount = 'Usage limit must be at least 1 or leave empty for unlimited';
        }

        // Date validation - only validate if both dates are provided
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);

            if (start >= end) {
                errors.endDate = 'End date must be after start date';
            }
        }

        // If only one date is provided, show error
        if ((formData.startDate && !formData.endDate) || (!formData.startDate && formData.endDate)) {
            errors.endDate = 'Both start and end dates are required together';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Format dates only if they are provided
        let startDateISO = null;
        let endDateISO = null;

        if (formData.startDate && formData.endDate) {
            const formatStartDate = (date) => {
                const d = new Date(date);
                d.setUTCHours(0, 0, 0, 0);
                return d.toISOString();
            };

            const formatEndDate = (date) => {
                const d = new Date(date);
                d.setUTCHours(23, 59, 59, 999);
                return d.toISOString();
            };

            startDateISO = formatStartDate(formData.startDate);
            endDateISO = formatEndDate(formData.endDate);
        }

        const couponData = {
            description: formData.description,
            discountType: formData.discountType,
            discountValue: Number(formData.discountValue),
            minAmount: Number(formData.minAmount),
            maxUsageCount: formData.maxUsageCount === '' || formData.maxUsageCount === null ? null : Number(formData.maxUsageCount),
            status: formData.status
        };

        // Only add dates if they are provided
        if (startDateISO && endDateISO) {
            couponData.startDate = startDateISO;
            couponData.endDate = endDateISO;
        } else {
            couponData.startDate = null;
            couponData.endDate = null;
        }

        // console.log('Sending coupon data:', couponData);

        try {
            if (selectedCoupon) {
                await dispatch(updateCoupon({
                    id: selectedCoupon._id,
                    data: couponData
                })).unwrap();
            } else {
                await dispatch(createCoupon(couponData)).unwrap();
            }

            setShowModal(false);
            resetForm();
            loadCoupons();
        } catch (error) {
            console.error('Error saving coupon:', error);
        }
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
        setFormData({
            description: '',
            discountType: 'percentage',
            discountValue: '',
            minAmount: 0,
            maxUsageCount: null,
            startDate: '',
            endDate: '',
            status: 'active'
        });
        setFormErrors({});
        setShowModal(true);
    }, []);

    const openEditModal = useCallback((coupon) => {
        setSelectedCoupon(coupon);

        // Format date for input (YYYY-MM-DD)
        const formatDateForInput = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        setFormData({
            description: coupon.description || '',
            discountType: coupon.discountType || 'percentage',
            discountValue: coupon.discountValue || '',
            minAmount: coupon.minAmount || 0,
            maxUsageCount: coupon.maxUsageCount === null ? '' : coupon.maxUsageCount,
            startDate: formatDateForInput(coupon.startDate),
            endDate: formatDateForInput(coupon.endDate),
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
            maxUsageCount: null,
            startDate: '',
            endDate: '',
            status: 'active'
        });
        setFormErrors({});
    }, []);

    const getStatusChip = useCallback((status, isSmallMobile, isMobile) => {
        const statusConfig = {
            active: {
                label: 'Active',
                icon: <FaCheckCircle size={isSmallMobile ? 8 : 10} />,
                bgColor: alpha("#22C55E", 0.1),
                textColor: "#22C55E"
            },
            inactive: {
                label: 'Inactive',
                icon: <FaClock size={isSmallMobile ? 8 : 10} />,
                bgColor: alpha("#F59E0B", 0.1),
                textColor: "#F59E0B"
            },
            expired: {
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
    }, []);

    const getDiscountTypeChip = useCallback((type, isSmallMobile, isMobile, theme) => {
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
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                        <Typography
                            variant={isMobile ? "body1" : "h6"}
                            fontWeight="600"
                            color={theme.palette.primary.main}
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
                            }}
                        >
                            Coupon Management
                        </Typography>
                        <IconButton size="small" sx={{ width: 28, height: 28 }}>
                            <RefreshIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
                        <Grid container spacing={isSmallMobile ? 1 : isMobile ? 1 : isTablet ? 1.5 : 2}>
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <StatsCardSkeleton
                                    key={item}
                                    isSmallMobile={isSmallMobile}
                                    isMobile={isMobile}
                                    isTablet={isTablet}
                                />
                            ))}
                        </Grid>
                    </Box>

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

                    <Grid container spacing={2}>
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <CouponCardSkeleton key={item} isSmallMobile={isSmallMobile} isMobile={isMobile} />
                        ))}
                    </Grid>
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
            style={{ zIndex: 9999 }}
        />
        
            <Container
                maxWidth="xl"
                disableGutters={isMobile}
                sx={{
                    px: isSmallMobile ? 0.5 : isMobile ? 1 : isTablet ? 1.5 : 2,
                }}
            >
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                            <Typography
                                variant={isMobile ? "body1" : "h6"}
                                fontWeight="800"
                                color={theme.palette.primary.main}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
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

                    <motion.section variants={itemVariants} style={{ marginBottom: isSmallMobile ? "15px" : isMobile ? "20px" : isTablet ? "25px" : "30px" }}>
                        <StatsCards
                            stats={stats}
                            isSmallMobile={isSmallMobile}
                            isMobile={isMobile}
                            isTablet={isTablet}
                            theme={theme}
                        />
                    </motion.section>

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
                                                sx: { fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem' }
                                            }}
                                        />
                                    </form>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Status</InputLabel>
                                        <Select
                                            value={filters?.status || ''}
                                            label="Status"
                                            onChange={(e) => handleFilterChange('status', e.target.value)}
                                            sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
                                        >
                                            <MenuItem value="">All Status</MenuItem>
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="inactive">Inactive</MenuItem>
                                            <MenuItem value="expired">Expired</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>Discount Type</InputLabel>
                                        <Select
                                            value={filters?.discountType || ''}
                                            label="Discount Type"
                                            onChange={(e) => handleFilterChange('discountType', e.target.value)}
                                            sx={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}
                                        >
                                            <MenuItem value="">All Types</MenuItem>
                                            <MenuItem value="percentage">Percentage</MenuItem>
                                            <MenuItem value="fixed">Fixed</MenuItem>
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
                                        sx={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}
                                    >
                                        Clear Filters
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </motion.div>

                    {/* Coupons Grid - Card View */}
                    <motion.div variants={itemVariants}>
                        {coupons?.length === 0 ? (
                            <Box sx={{
                                textAlign: 'center',
                                py: 8,
                                px: 2,
                                borderRadius: 3,
                                bgcolor: alpha(theme.palette.primary.main, 0.02),
                                border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}>
                                <LocalOfferIcon sx={{ fontSize: 60, color: theme.palette.text.disabled, mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No coupons found
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    {isSuperAdmin ? 'Create your first coupon to get started!' : 'No coupons available at the moment.'}
                                </Typography>
                                {isSuperAdmin && (
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={openCreateModal}
                                    >
                                        Create New Coupon
                                    </Button>
                                )}
                            </Box>
                        ) : (
                            <Grid container spacing={2}>
                                {coupons?.map((coupon) => (
                                    <CouponCard
                                        key={coupon._id}
                                        coupon={coupon}
                                        onEdit={openEditModal}
                                        onDelete={openDeleteModal}
                                        isSuperAdmin={isSuperAdmin}
                                        theme={theme}
                                        onCopyCode={handleCopyCode}
                                        copiedCode={copiedCode}
                                    />
                                ))}
                            </Grid>
                        )}

                        {/* Pagination */}
                        {pagination?.totalItems > rowsPerPage && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <TablePagination
                                    rowsPerPageOptions={[8, 12, 24, 48]}
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
                                    }}
                                />
                            </Box>
                        )}
                    </motion.div>
                </motion.div>
            </Container>

            {/* Create/Edit Modal */}
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
                            maxWidth: { xs: '95%', sm: '650px' },
                            maxHeight: '90vh',
                            overflow: 'auto',
                            margin: '0 auto',
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 2.5,
                            boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
                            outline: 'none',
                        }}
                    >
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
                            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, fontWeight: 600, color: '#ffffff' }}>
                                {selectedCoupon ? 'Edit Coupon' : 'Create New Coupon'}
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                size="small"
                                sx={{ color: '#ffffff', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                            >
                                <CloseIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                            </IconButton>
                        </Box>

                        <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={2}
                                            label="Description"
                                            placeholder="e.g. Summer Sale 2026 - Get 20% off on all purchases"
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
                                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.03)' },
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                                            <InputLabel>Discount Type</InputLabel>
                                            <Select
                                                value={formData.discountType}
                                                label="Discount Type"
                                                onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                                            >
                                                <MenuItem value="percentage">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <PercentIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                        <Typography>Percentage (%)</Typography>
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="fixed">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <CurrencyRupeeIcon sx={{ fontSize: 16, color: 'secondary.main' }} />
                                                        <Typography>Fixed (₹)</Typography>
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="Discount Value"
                                            placeholder={formData.discountType === 'percentage' ? '25' : '500'}
                                            value={formData.discountValue}
                                            onChange={(e) => {
                                                let value = e.target.value;

                                                // For percentage: only accept integers, no decimals, 1-99 range
                                                if (formData.discountType === 'percentage') {
                                                    // Remove any non-digit characters
                                                    value = value.replace(/[^\d]/g, '');

                                                    if (value !== '') {
                                                        let numValue = parseInt(value, 10);
                                                        if (numValue > 99) {
                                                            value = '99';
                                                        } else if (numValue < 1 && value !== '') {
                                                            value = '1';
                                                        } else {
                                                            value = numValue.toString();
                                                        }
                                                    }
                                                } else {
                                                    // For fixed amount: allow numbers only (no +, -, or special characters)
                                                    value = value.replace(/[^\d.]/g, '');
                                                    // Prevent multiple decimals
                                                    const decimalCount = (value.match(/\./g) || []).length;
                                                    if (decimalCount > 1) {
                                                        return;
                                                    }
                                                    // Limit to 2 decimal places
                                                    if (value.includes('.') && value.split('.')[1]?.length > 2) {
                                                        value = parseFloat(value).toFixed(2);
                                                    }
                                                }

                                                setFormData({ ...formData, discountValue: value });
                                            }}
                                            onBlur={() => {
                                                // Ensure percentage value is within range on blur
                                                if (formData.discountType === 'percentage' && formData.discountValue !== '') {
                                                    let numValue = parseInt(formData.discountValue, 10);
                                                    if (isNaN(numValue)) {
                                                        setFormData({ ...formData, discountValue: '' });
                                                    } else if (numValue < 1) {
                                                        setFormData({ ...formData, discountValue: '1' });
                                                    } else if (numValue > 99) {
                                                        setFormData({ ...formData, discountValue: '99' });
                                                    }
                                                }
                                            }}
                                            error={!!formErrors.discountValue}
                                            helperText={formErrors.discountValue}
                                            inputProps={{
                                                inputMode: formData.discountType === 'percentage' ? 'numeric' : 'decimal',
                                            }}
                                            required
                                            size={isMobile ? "small" : "medium"}
                                            InputProps={{
                                                endAdornment: formData.discountType === 'percentage' ? (
                                                    <InputAdornment position="end">%</InputAdornment>
                                                ) : null,
                                            }}
                                            onKeyDown={(e) => {
                                                // Prevent decimal key for percentage
                                                if (formData.discountType === 'percentage' && (e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E')) {
                                                    e.preventDefault();
                                                }
                                                // Prevent '+' and '-' for both types
                                                if (e.key === '+' || e.key === '-') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="Minimum Order Amount"
                                            placeholder="1000"
                                            value={formData.minAmount}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                // Accept only numbers (remove +, -, and any other non-digit characters)
                                                value = value.replace(/[^\d]/g, '');
                                                setFormData({ ...formData, minAmount: value });
                                            }}
                                            error={!!formErrors.minAmount}
                                            helperText={formErrors.minAmount}
                                            inputProps={{
                                                inputMode: 'numeric'
                                            }}
                                            size={isMobile ? "small" : "medium"}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            onKeyDown={(e) => {
                                                // Prevent '+', '-', '.', 'e', 'E' and other special characters
                                                if (e.key === '+' || e.key === '-' || e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="Usage Limit"
                                            placeholder="Leave empty for unlimited"
                                            value={formData.maxUsageCount === null ? '' : formData.maxUsageCount}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                // Accept only numbers (remove +, -, and any other non-digit characters)
                                                value = value.replace(/[^\d]/g, '');

                                                // Ensure it's a positive integer
                                                if (value !== '') {
                                                    let numValue = parseInt(value, 10);
                                                    if (!isNaN(numValue) && numValue >= 1) {
                                                        value = numValue.toString();
                                                    } else {
                                                        return;
                                                    }
                                                }

                                                setFormData({
                                                    ...formData,
                                                    maxUsageCount: value === '' ? null : Number(value)
                                                });
                                            }}
                                            error={!!formErrors.maxUsageCount}
                                            helperText={formErrors.maxUsageCount || 'Maximum number of times this coupon can be used'}
                                            inputProps={{
                                                inputMode: 'numeric'
                                            }}
                                            size={isMobile ? "small" : "medium"}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onKeyDown={(e) => {
                                                // Prevent '+', '-', '.', 'e', 'E' and other special characters
                                                if (e.key === '+' || e.key === '-' || e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E') {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Start Date (Optional)"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            error={!!formErrors.startDate}
                                            helperText={formErrors.startDate}
                                            size={isMobile ? "small" : "medium"}
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DateRangeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="End Date (Optional)"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            error={!!formErrors.endDate}
                                            helperText={formErrors.endDate}
                                            size={isMobile ? "small" : "medium"}
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DateRangeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                                            <InputLabel>Status</InputLabel>
                                            <Select
                                                value={formData.status}
                                                label="Status"
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            >
                                                <MenuItem value="active">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22C55E' }} />
                                                        <Typography>Active</Typography>
                                                    </Box>
                                                </MenuItem>
                                                <MenuItem value="inactive">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                                                        <Typography>Inactive</Typography>
                                                    </Box>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {formData.description && formData.discountValue && (
                                        <Grid item xs={12}>
                                            <Fade in>
                                                <Box
                                                    sx={{
                                                        mt: 1,
                                                        p: 1.5,
                                                        borderRadius: 1.5,
                                                        bgcolor: 'rgba(47, 110, 170, 0.04)',
                                                        border: '1px dashed',
                                                        borderColor: 'primary.main',
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'primary.main', mb: 1 }}>
                                                        Preview
                                                    </Typography>

                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                                        <Chip
                                                            size="small"
                                                            label={formData.discountType === 'percentage'
                                                                ? `${formData.discountValue}% OFF`
                                                                : `₹${formData.discountValue} OFF`}
                                                            sx={{
                                                                bgcolor: 'primary.main',
                                                                color: 'white',
                                                                fontSize: '0.6rem',
                                                                height: 24,
                                                            }}
                                                        />
                                                        {formData.minAmount > 0 && (
                                                            <Chip
                                                                size="small"
                                                                label={`Min ₹${formData.minAmount}`}
                                                                variant="outlined"
                                                                sx={{ fontSize: '0.6rem', height: 24 }}
                                                            />
                                                        )}
                                                        <Chip
                                                            size="small"
                                                            label={formData.maxUsageCount ? `${formData.maxUsageCount} uses` : 'Unlimited uses'}
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.6rem', height: 24 }}
                                                        />
                                                    </Box>

                                                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, mb: 0.5 }}>
                                                        {formData.description}
                                                    </Typography>

                                                    {formData.startDate && formData.endDate ? (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <DateRangeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                                            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                                                                Valid: {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
                                                            </Typography>
                                                        </Box>
                                                    ) : (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <DateRangeIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                                                            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', fontStyle: 'italic' }}>
                                                                No date restrictions
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Fade>
                                        </Grid>
                                    )}
                                </Grid>

                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: 1.5,
                                    pt: 2,
                                    mt: 2,
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
                                        sx={{ px: 2.5, py: 0.8, borderRadius: 1.5, fontSize: isMobile ? '0.7rem' : '0.75rem', fontWeight: 600 }}
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
        </Box>
    );
};

export default CouponManagement;