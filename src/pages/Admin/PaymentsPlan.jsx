// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardHeader,
//   CardContent,
//   CardActions,
//   Button,
//   Chip,
//   Alert,
//   AlertTitle,
//   Paper,
//   Divider,
//   CircularProgress,
//   Skeleton,
//   alpha,
//   useTheme,
//   Stack,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   IconButton,
//   Tooltip,
//   LinearProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Pagination,
// } from "@mui/material";
// import {
//   CreditCard as CreditCardIcon,
//   People as PeopleIcon,
//   Add as AddIcon,
//   CheckCircle as CheckCircleIcon,
//   ArrowUpward as ArrowUpIcon,
//   Info as InfoIcon,
//   Warning as WarningIcon,
//   Star as StarIcon,
//   EmojiEvents as EmojiEventsIcon,
//   LocalOffer as LocalOfferIcon,
//   Build as BuildIcon,
//   Refresh as RefreshIcon,
//   Edit as EditIcon,
//   History as HistoryIcon,
//   Receipt as ReceiptIcon,
//   TrendingUp as TrendingUpIcon,
//   Savings as SavingsIcon,
//   CalendarToday as CalendarIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllPlans,
//   createCustomPlan,
//   getUserCustomPlan,
//   updateCustomPlan,
// } from "../../redux/slices/planSlice";
// import {
//   createPaymentOrder,
//   verifyPayment,
//   getPaymentHistory,
//   getAllPaymentHistory,
//   getRevenueSummary,
//   getPaymentById,
//   createAddOnOrder,
//   verifyAddOnPayment,
//   clearPaymentState,
//   clearOrderData,
//   clearVerificationData,
//   setPaymentStatus,
// } from "../../redux/slices/paymentSlice";
// import Loader from "../../components/common/Loader";
// import { RAZORPAY_KEY_ID } from "../../utils/constants";
// import { getUserById } from "../../redux/slices/userSlice";
// import moment from "moment";
// import { toast } from "react-toastify";
// import CouponPopup from "../Admin/component/CouponPopup";

// // Plan Card Skeleton Component
// const PlanCardSkeleton = () => {
//   const theme = useTheme();

//   return (
//     <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
//       <Card
//         sx={{
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           borderRadius: 2.5,
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//         }}
//       >
//         <Box
//           sx={{
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             py: 2,
//             px: 2.5,
//             borderTopLeftRadius: 10,
//             borderTopRightRadius: 10,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//             <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//             <Box>
//               <Skeleton variant="text" width={100} height={22} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//               <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//             </Box>
//           </Box>
//           <Skeleton variant="rounded" width={55} height={22} sx={{ bgcolor: alpha('#ffffff', 0.2), borderRadius: 2 }} />
//         </Box>

//         <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
//           <Skeleton variant="text" width="90%" height={18} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width="60%" height={18} sx={{ mb: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />

//           <Box sx={{ textAlign: 'center', mb: 2.5 }}>
//             <Skeleton variant="text" width={90} height={40} sx={{ mx: 'auto', mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="text" width={70} height={14} sx={{ mx: 'auto', bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>

//           <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="60%" height={14} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </Box>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="60%" height={14} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </Box>
//             </Box>
//           </Stack>
//         </CardContent>

//         <CardActions sx={{ p: 2.5, pt: 0 }}>
//           <Skeleton variant="rounded" width="100%" height={42} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </CardActions>
//       </Card>
//     </Grid>
//   );
// };

// // Custom Plan Popup Component
// const CustomPlanPopup = ({ open, onClose, onSubmit, planData, setPlanData, errors, isCreating, isEditing }) => {
//   const theme = useTheme();

//   const durationUnits = ['days', 'weeks', 'months', 'years'];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPlanData(prev => ({ ...prev, [name]: value }));
//   };

//   // Calculate price preview
//   const calculatePricePreview = () => {
//     const BASE_PRICE_PER_USER_PER_MONTH = 100;
//     const minUsers = parseInt(planData.minUsers) || 0;
//     const maxUsers = parseInt(planData.maxUsers) || 0;
//     const durationValue = parseInt(planData.durationValue) || 0;
//     const durationUnit = planData.durationUnit;

//     if (!minUsers || !maxUsers || !durationValue) return 0;

//     const userCount = maxUsers || minUsers || 1;

//     let totalMonths = 0;
//     switch (durationUnit?.toLowerCase()) {
//       case 'day':
//       case 'days':
//         totalMonths = durationValue / 30;
//         break;
//       case 'week':
//       case 'weeks':
//         totalMonths = durationValue / 4;
//         break;
//       case 'month':
//       case 'months':
//         totalMonths = durationValue;
//         break;
//       case 'year':
//       case 'years':
//         totalMonths = durationValue * 12;
//         break;
//       default:
//         totalMonths = durationValue;
//     }

//     return Math.round(userCount * BASE_PRICE_PER_USER_PER_MONTH * totalMonths);
//   };

//   const estimatedPrice = calculatePricePreview();

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           overflow: 'hidden',
//         }
//       }}
//     >
//       <DialogTitle sx={{
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: 'white',
//         py: 2,
//         px: 3,
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1.5,
//       }}>
//         <BuildIcon />
//         <Typography variant="h6" fontWeight={600}>
//           {isEditing ? 'Edit Custom Plan' : 'Create Custom Plan'}
//         </Typography>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3 }}>
//         <Box component="form">
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             {/* Min Users */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Min Users"
//                 name="minUsers"
//                 type="number"
//                 value={planData.minUsers}
//                 onChange={handleChange}
//                 error={!!errors.minUsers}
//                 helperText={errors.minUsers}
//                 required
//                 size="small"
//                 InputProps={{ inputProps: { min: 1 } }}
//               />
//             </Grid>

//             {/* Max Users */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Max Users"
//                 name="maxUsers"
//                 type="number"
//                 value={planData.maxUsers}
//                 onChange={handleChange}
//                 error={!!errors.maxUsers}
//                 helperText={errors.maxUsers}
//                 required
//                 size="small"
//                 InputProps={{ inputProps: { min: 1 } }}
//               />
//             </Grid>

//             {/* Duration Value */}
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Duration"
//                 name="durationValue"
//                 type="number"
//                 value={planData.durationValue}
//                 onChange={handleChange}
//                 error={!!errors.durationValue}
//                 helperText={errors.durationValue}
//                 required
//                 size="small"
//                 InputProps={{ inputProps: { min: 1 } }}
//               />
//             </Grid>

//             {/* Duration Unit */}
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>Duration Unit</InputLabel>
//                 <Select
//                   name="durationUnit"
//                   value={planData.durationUnit}
//                   onChange={handleChange}
//                   label="Duration Unit"
//                 >
//                   {durationUnits.map(unit => (
//                     <MenuItem key={unit} value={unit}>{unit}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             {/* Price Preview */}
//             {planData.minUsers && planData.maxUsers && planData.durationValue && planData.durationUnit && (
//               <Grid item xs={12}>
//                 <Paper sx={{
//                   p: 2,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   borderRadius: 2,
//                   border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
//                 }}>
//                   <Typography variant="body2" color="text.secondary" gutterBottom>
//                     Estimated Price:
//                   </Typography>
//                   <Typography variant="h5" fontWeight={700} color="primary.main">
//                     ₹{estimatedPrice.toLocaleString()}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Based on {planData.maxUsers} users × ₹100 × {planData.durationValue} {planData.durationUnit}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           sx={{
//             borderRadius: 2,
//             flex: 1,
//             py: 1,
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={onSubmit}
//           variant="contained"
//           disabled={isCreating}
//           sx={{
//             flex: 1,
//             py: 1,
//             borderRadius: 2,
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//           }}
//         >
//           {isCreating ? <CircularProgress size={24} /> : (isEditing ? 'Update Plan' : 'Create Plan')}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Payment History Dialog
// const PaymentHistoryDialog = ({ open, onClose, paymentHistory, loading }) => {
//   const theme = useTheme();

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           overflow: 'hidden',
//         }
//       }}
//     >
//       <DialogTitle sx={{
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: 'white',
//         py: 2,
//         px: 3,
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1.5,
//       }}>
//         <HistoryIcon />
//         <Typography variant="h6" fontWeight={600}>
//           Payment History
//         </Typography>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3 }}>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : paymentHistory && paymentHistory.length > 0 ? (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Plan</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Coupon</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paymentHistory.map((payment) => (
//                   <TableRow key={payment._id}>
//                     <TableCell>{moment(payment.createdAt).format('DD/MM/YYYY')}</TableCell>
//                     <TableCell>{payment.planId?.name || 'N/A'}</TableCell>
//                     <TableCell>
//                       <Typography fontWeight={600}>
//                         ₹{payment.amount}
//                         {payment.discountAmount > 0 && (
//                           <Typography component="span" color="success.main" sx={{ ml: 1, fontSize: '0.7rem' }}>
//                             (Saved ₹{payment.discountAmount})
//                           </Typography>
//                         )}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={payment.status}
//                         size="small"
//                         color={payment.status === 'completed' ? 'success' : 'warning'}
//                         sx={{ fontSize: '0.6rem', height: 20 }}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {payment.couponCode ? (
//                         <Chip
//                           label={payment.couponCode}
//                           size="small"
//                           icon={<LocalOfferIcon sx={{ fontSize: 12 }} />}
//                           sx={{ fontSize: '0.6rem', height: 20 }}
//                         />
//                       ) : '-'}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: 'center', py: 4 }}>
//             <ReceiptIcon sx={{ fontSize: 48, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
//             <Typography color="text.secondary">No payment history found</Typography>
//           </Box>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 3, pt: 0 }}>
//         <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2 }}>
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const PaymentPlans = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Selectors from plan slice
//   const { plansList, loading: plansLoading, userCustomPlan } = useSelector((state) => state.plan || {});

//   // Selectors from payment slice
//   const {
//     orderLoading,
//     orderError,
//     orderData,
//     verificationLoading,
//     verificationError,
//     verificationData,
//     historyLoading,
//     paymentHistory,
//     paymentStats,
//     revenueSummary,
//     revenueLoading,
//     paymentDetails,
//     paymentDetailsLoading,
//     addOnOrderLoading,
//     addOnOrderData,
//     addOnVerificationLoading,
//     addOnVerificationData,
//     paymentStatus,
//     allPaymentHistory,
//     allPaymentHistoryLoading,
//     totalCompletedAmount,
//     numberOfPaidUsers,
//     averageRevenue,
//     currentPage,
//     totalPages,
//     totalItems,
//   } = useSelector((state) => state.payment || {});

//   // Auth selectors
//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
//   const authUser = useSelector((state) => state.auth?.user || {});

//   // Local states
//   const [paymentSuccess, setPaymentSuccess] = useState(null);
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
//   const [currentPlanDetails, setCurrentPlanDetails] = useState(null);
//   const [processingPlanId, setProcessingPlanId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
//   const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

//   // Coupon popup states
//   const [couponPopupOpen, setCouponPopupOpen] = useState(false);
//   const [selectedPlanForCoupon, setSelectedPlanForCoupon] = useState(null);
//   const [appliedCouponData, setAppliedCouponData] = useState(null);

//   // Custom plan states
//   const [customPlanPopupOpen, setCustomPlanPopupOpen] = useState(false);
//   const [customPlanData, setCustomPlanData] = useState({
//     minUsers: '',
//     maxUsers: '',
//     durationValue: '',
//     durationUnit: 'months',
//     status: 'active'
//   });
//   const [customPlanErrors, setCustomPlanErrors] = useState({});
//   const [isCreatingCustomPlan, setIsCreatingCustomPlan] = useState(false);
//   const [isEditingCustomPlan, setIsEditingCustomPlan] = useState(false);
//   const [editingPlanId, setEditingPlanId] = useState(null);
//   const [fetchingCustomPlan, setFetchingCustomPlan] = useState(false);

//   // Check if current plan is the custom plan
//   const isCustomPlanPurchased = currentPlanDetails?.planId === userCustomPlan?._id;

//   // Initial data fetch
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         await dispatch(getAllPlans()).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//         toast.error('Failed to load plans');
//       } finally {
//         setTimeout(() => {
//           setLoading(false);
//           setShowFirstRenderLoader(false);
//         }, 1000);
//       }
//     };
//     fetchInitialData();
//   }, [dispatch]);

//   // Fetch user's custom plan
//   useEffect(() => {
//     const fetchUserCustomPlan = async () => {
//       if (isAuthenticated) {
//         setFetchingCustomPlan(true);
//         try {
//           await dispatch(getUserCustomPlan()).unwrap();
//         } catch (error) {
//           console.log('No custom plan found for user');
//         } finally {
//           setFetchingCustomPlan(false);
//         }
//       }
//     };

//     fetchUserCustomPlan();
//   }, [dispatch, isAuthenticated]);

//   // Fetch user details when authenticated
//   useEffect(() => {
//     if (userData?._id) {
//       dispatch(getUserById(userData._id));
//     }
//   }, [dispatch, userData?._id]);

//   // Fetch payment history for current user
//   useEffect(() => {
//     if (isAuthenticated && authUser?._id) {
//       dispatch(getPaymentHistory({ adminId: authUser._id, page: 1, limit: 10 }));
//     }
//   }, [dispatch, isAuthenticated, authUser?._id]);

//   // Fetch all payment history for super admin
//   useEffect(() => {
//     if (isAuthenticated && authUser?.role === 'superadmin') {
//       dispatch(getAllPaymentHistory({ page: 1, limit: 10 }));
//     }
//   }, [dispatch, isAuthenticated, authUser?.role]);

//   // Fetch revenue summary (for admin dashboard)
//   useEffect(() => {
//     if (isAuthenticated && authUser?.role === 'superadmin') {
//       dispatch(getRevenueSummary());
//     }
//   }, [dispatch, isAuthenticated, authUser?.role]);

//   // Check subscription status
//   useEffect(() => {
//     if (userData?.currentPaymentId) {
//       const isExpired = moment(userData.currentPaymentId.expiresAt).isBefore(moment());
//       setHasActiveSubscription(!isExpired);
//       if (userData.currentPaymentId.expiresAt) {
//         setSubscriptionExpiry(userData.currentPaymentId.expiresAt);
//       }
//       setCurrentPlanDetails({
//         _id: userData.currentPaymentId._id,
//         planId: userData.currentPaymentId.planId,
//         maxUser: userData.currentPaymentId.maxUser,
//         minUser: userData.currentPaymentId.minUser,
//         description: userData.currentPaymentId.description,
//         name: userData.currentPaymentId.name,
//       });
//     } else {
//       setHasActiveSubscription(false);
//       setSubscriptionExpiry(null);
//       setCurrentPlanDetails(null);
//     }
//   }, [userData]);

//   // Handle payment verification success
//   useEffect(() => {
//     if (verificationData?.success) {
//       const successMessage = verificationData.data?.couponCode
//         ? `Payment successful! You saved ₹${verificationData.data.discountAmount} with coupon!`
//         : "Payment successful! Your subscription has been activated.";

//       setPaymentSuccess(successMessage);
//       toast.success(successMessage);

//       // Refresh user data and payment history
//       if (authUser?._id) {
//         dispatch(getUserById(authUser._id));
//         dispatch(getPaymentHistory({ adminId: authUser._id }));
//       }

//       // Clear verification data after 5 seconds
//       setTimeout(() => {
//         dispatch(clearVerificationData());
//         dispatch(setPaymentStatus('idle'));
//       }, 5000);
//     }
//   }, [verificationData, dispatch, authUser?._id]);

//   // Handle add-on verification success
//   useEffect(() => {
//     if (addOnVerificationData?.success) {
//       const successMessage = addOnVerificationData.data?.addOnDetails?.addOnCouponCode
//         ? `Add-on payment successful! You saved ₹${addOnVerificationData.data.addOnDetails.addOnDiscountAmount} with coupon!`
//         : "Add-on payment successful! Your plan has been upgraded.";

//       setPaymentSuccess(successMessage);
//       toast.success(successMessage);

//       // Refresh user data and payment history
//       if (authUser?._id) {
//         dispatch(getUserById(authUser._id));
//         dispatch(getPaymentHistory({ adminId: authUser._id }));
//       }

//       // Clear verification data after 5 seconds
//       setTimeout(() => {
//         dispatch(clearVerificationData());
//         dispatch(setPaymentStatus('idle'));
//       }, 5000);
//     }
//   }, [addOnVerificationData, dispatch, authUser?._id]);

//   // Handle errors
//   useEffect(() => {
//     if (orderError) {
//       toast.error(orderError?.message || 'Failed to create order');
//       dispatch(setPaymentStatus('failed'));
//     }
//     if (verificationError) {
//       toast.error(verificationError?.message || 'Payment verification failed');
//       dispatch(setPaymentStatus('failed'));
//     }
//   }, [orderError, verificationError, dispatch]);

//   // Separate plans into subscriptions and add-ons
//   const subscriptionPlans = plansList?.filter(
//     (plan) => !plan.name?.includes("Add on Plan") && plan.status === "active" && plan.name !== "Customize Plan"
//   ) || [];

//   const addOnPlans = plansList?.filter(
//     (plan) => plan.name?.includes("Add on Plan") && plan.status === "active"
//   ) || [];

//   // Custom Plan handlers
//   const handleCreateCustomPlan = async (e) => {
//     e?.preventDefault();

//     // Validation
//     const errors = {};
//     if (!customPlanData.minUsers) errors.minUsers = 'Min users is required';
//     if (!customPlanData.maxUsers) errors.maxUsers = 'Max users is required';
//     if (!customPlanData.durationValue) errors.durationValue = 'Duration is required';

//     if (customPlanData.minUsers && customPlanData.maxUsers &&
//       parseInt(customPlanData.minUsers) > parseInt(customPlanData.maxUsers)) {
//       errors.maxUsers = 'Max users must be greater than min users';
//     }

//     if (Object.keys(errors).length > 0) {
//       setCustomPlanErrors(errors);
//       return;
//     }

//     setCustomPlanErrors({});
//     setIsCreatingCustomPlan(true);

//     try {
//       const payload = {
//         minUsers: parseInt(customPlanData.minUsers),
//         maxUsers: parseInt(customPlanData.maxUsers),
//         durationValue: parseInt(customPlanData.durationValue),
//         durationUnit: customPlanData.durationUnit,
//         status: customPlanData.status
//       };

//       if (isEditingCustomPlan && editingPlanId) {
//         const result = await dispatch(updateCustomPlan({
//           planId: editingPlanId,
//           data: payload
//         })).unwrap();
//         toast.success(result.message || 'Custom plan updated successfully!');
//       } else {
//         const result = await dispatch(createCustomPlan(payload)).unwrap();
//         toast.success(result.message || 'Custom plan created successfully!');
//       }

//       setCustomPlanPopupOpen(false);
//       resetCustomPlanForm();
//       dispatch(getAllPlans());
//       await dispatch(getUserCustomPlan()).unwrap();
//     } catch (error) {
//       if (error?.existingPlanId) {
//         toast.error("You already have a custom plan. Only one custom plan per user is allowed.");
//       } else {
//         toast.error(error?.message || 'Failed to process custom plan');
//       }
//     } finally {
//       setIsCreatingCustomPlan(false);
//     }
//   };

//   const handleOpenCreateCustomPlan = () => {
//     setEditingPlanId(null);
//     setIsEditingCustomPlan(false);
//     resetCustomPlanForm();
//     setCustomPlanPopupOpen(true);
//     setCustomPlanErrors({});
//   };

//   const handleOpenEditCustomPlan = () => {
//     if (userCustomPlan) {
//       setEditingPlanId(userCustomPlan._id);
//       setIsEditingCustomPlan(true);
//       setCustomPlanData({
//         minUsers: userCustomPlan.minUsers.toString(),
//         maxUsers: userCustomPlan.maxUsers.toString(),
//         durationValue: userCustomPlan.durationValue.toString(),
//         durationUnit: userCustomPlan.durationUnit,
//         status: userCustomPlan.status
//       });
//       setCustomPlanPopupOpen(true);
//       setCustomPlanErrors({});
//     }
//   };

//   const handleCloseCustomPlanPopup = () => {
//     setCustomPlanPopupOpen(false);
//     resetCustomPlanForm();
//     setCustomPlanErrors({});
//   };

//   const resetCustomPlanForm = () => {
//     setCustomPlanData({
//       minUsers: '',
//       maxUsers: '',
//       durationValue: '',
//       durationUnit: 'months',
//       status: 'active'
//     });
//   };

//   const handlePurchaseCustomPlan = () => {
//     if (userCustomPlan) {
//       if (hasActiveSubscription && subscriptionExpiry && moment(subscriptionExpiry).isAfter(moment())) {
//         toast.warning("You already have an active subscription. You can only purchase add-on plans.");
//         return;
//       }

//       setSelectedPlanForCoupon(userCustomPlan);
//       setCouponPopupOpen(true);
//     }
//   };

//   // Payment handlers
//   const handleSubscriptionPayment = async (planId, couponCode = null) => {
//     setProcessingPlanId(planId);

//     if (hasActiveSubscription && subscriptionExpiry && moment(subscriptionExpiry).isAfter(moment())) {
//       toast.warning("You already have an active subscription. You can only purchase add-on plans.");
//       setProcessingPlanId(null);
//       return;
//     }

//     try {
//       dispatch(clearPaymentState());
//       setPaymentSuccess(null);

//       if (!isAuthenticated || !authUser) {
//         toast.error("User not authenticated. Please login again.");
//         setProcessingPlanId(null);
//         return;
//       }

//       const adminId = authUser._id || authUser.id || userData?._id;

//       if (!adminId) {
//         toast.error("User ID not found. Please login again.");
//         setProcessingPlanId(null);
//         return;
//       }

//       if (!window.Razorpay) {
//         toast.error("Payment gateway not loaded. Please refresh the page and try again.");
//         setProcessingPlanId(null);
//         return;
//       }

//       const orderResult = await dispatch(
//         createPaymentOrder({ adminId, planId, couponCode })
//       );

//       if (createPaymentOrder.rejected.match(orderResult)) {
//         toast.error(orderResult.payload?.message || "Failed to create order");
//         setProcessingPlanId(null);
//         return;
//       }

//       const orderData = orderResult.payload?.data;

//       if (!couponCode) {
//         toast.info(`Proceeding with amount: ₹${orderData.originalAmount || selectedPlanForCoupon?.price || 0}`);
//       } else if (orderData.discountApplied) {
//         toast.success(`Coupon applied! You saved ₹${orderData.discountAmount}`);
//       }

//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Team Trackify",
//         description: couponCode
//           ? `Payment for ${selectedPlanForCoupon?.name || "Subscription"} (Saved: ₹${orderData.discountAmount})`
//           : `Payment for ${selectedPlanForCoupon?.name || "Subscription"}`,
//         order_id: orderData.orderId,
//         handler: async function (response) {
//           try {
//             await dispatch(
//               verifyPayment({
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//                 paymentId: orderData.paymentId,
//               })
//             );
//           } catch (verifyError) {
//             console.error("Payment verification error:", verifyError);
//             toast.error("Payment verification failed. Please contact support.");
//           } finally {
//             setProcessingPlanId(null);
//           }
//         },
//         prefill: {
//           name: authUser.name || userData?.name || "",
//           email: authUser.email || userData?.email || "",
//           contact: authUser.phone || userData?.phone || "",
//         },
//         theme: {
//           color: theme.palette.primary.main,
//         },
//         modal: {
//           ondismiss: function () {
//             dispatch(clearOrderData());
//             setProcessingPlanId(null);
//             dispatch(setPaymentStatus('idle'));
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Payment failed: " + error.message);
//       setProcessingPlanId(null);
//       dispatch(setPaymentStatus('failed'));
//     }
//   };

//   const handleUpgradePlan = async (addOnPlanId, couponCode = null) => {
//     setProcessingPlanId(addOnPlanId);

//     try {
//       if (!authUser) {
//         toast.error("User not authenticated. Please login.");
//         setProcessingPlanId(null);
//         return;
//       }

//       if (!hasActiveSubscription || !currentPlanDetails) {
//         toast.warning("You need an active subscription to purchase add-on plans.");
//         setProcessingPlanId(null);
//         return;
//       }

//       const adminId = authUser._id || authUser.id || userData?._id;

//       dispatch(clearPaymentState());
//       setPaymentSuccess(null);

//       // ✅ FIXED: Include paymentId from currentPlanDetails
//       const orderResult = await dispatch(
//         createAddOnOrder({
//           adminId,
//           addOnPlanId,
//           paymentId: currentPlanDetails._id, // 👈 Add this!
//           couponCode
//         })
//       );

//       if (createAddOnOrder.rejected.match(orderResult)) {
//         toast.error(orderResult.payload?.message || "Failed to create order");
//         setProcessingPlanId(null);
//         return;
//       }

//       const orderData = orderResult.payload?.data;

//       if (!couponCode) {
//         toast.info(`Proceeding with amount: ₹${orderData.originalAmount / 100 || selectedPlanForCoupon?.price || 0}`);
//       } else if (orderData.discountApplied) {
//         toast.success(`Coupon applied! You saved ₹${orderData.discountAmount / 100}`);
//       }

//       const razorpayOptions = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Team Trackify",
//         description: couponCode
//           ? `Payment for Add-on Plan (Saved: ₹${orderData.discountAmount / 100})`
//           : `Payment for Add-on Plan`,
//         order_id: orderData.orderId,
//         handler: async (response) => {
//           try {
//             await dispatch(
//               verifyAddOnPayment({
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//                 paymentId: orderData.paymentId,
//               })
//             );
//           } catch (error) {
//             console.error("Add-on verification error:", error);
//             toast.error("Payment verification failed");
//           } finally {
//             setProcessingPlanId(null);
//           }
//         },
//         prefill: {
//           name: authUser.name || userData?.name || "",
//           email: authUser.email || userData?.email || "",
//           contact: authUser.phone || userData?.phone || "",
//         },
//         theme: {
//           color: theme.palette.primary.main,
//         },
//         modal: {
//           ondismiss: function () {
//             dispatch(clearOrderData());
//             setProcessingPlanId(null);
//             dispatch(setPaymentStatus('idle'));
//           },
//         },
//       };

//       const razorpayInstance = new window.Razorpay(razorpayOptions);
//       razorpayInstance.open();
//     } catch (error) {
//       console.error("Error in upgrading plan:", error);
//       toast.error("An error occurred while upgrading your plan.");
//       setProcessingPlanId(null);
//       dispatch(setPaymentStatus('failed'));
//     }
//   };
//   const handleApplyCoupon = (couponData) => {
//     if (couponData === null) {
//       if (selectedPlanForCoupon?.name?.includes("Add on Plan")) {
//         handleUpgradePlan(selectedPlanForCoupon._id, null);
//       } else {
//         handleSubscriptionPayment(selectedPlanForCoupon._id, null);
//       }
//       setAppliedCouponData(null);
//     } else {
//       setAppliedCouponData(couponData);
//       if (selectedPlanForCoupon?.name?.includes("Add on Plan")) {
//         handleUpgradePlan(selectedPlanForCoupon._id, couponData.code);
//       } else {
//         handleSubscriptionPayment(selectedPlanForCoupon._id, couponData.code);
//       }
//     }
//   };

//   const renderPlanCard = (plan, index, isAddOn = false) => {
//     const isCurrentPlan = currentPlanDetails?.planId === plan._id;
//     const isDisabled = !isAddOn && hasActiveSubscription && !isCurrentPlan;
//     const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());
//     const isRecommended = plan.name === "Enterprise Plan" && !isAddOn;
//     const hasCouponApplied = appliedCouponData && selectedPlanForCoupon?._id === plan._id;

//     return (
//       <Grid item xs={12} md={6} lg={4} key={plan._id} sx={{ display: 'flex' }}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Card
//             sx={{
//               position: 'relative',
//               borderRadius: 2.5,
//               border: '1px solid',
//               borderColor: isRecommended ? theme.palette.primary.main : (isCurrentPlan ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5)),
//               boxShadow: isRecommended
//                 ? `0 8px 25px -8px ${alpha(theme.palette.primary.main, 0.5)}`
//                 : isCurrentPlan
//                   ? `0 8px 25px -8px ${alpha(theme.palette.primary.main, 0.5)}`
//                   : '0 2px 8px rgba(0,0,0,0.03)',
//               transition: 'all 0.3s ease',
//               opacity: isDisabled ? 0.7 : 1,
//               cursor: isDisabled ? 'not-allowed' : 'pointer',
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               '&:hover': !isDisabled ? {
//                 transform: 'translateY(-6px)',
//                 boxShadow: isRecommended
//                   ? `0 25px 40px -15px ${alpha(theme.palette.primary.main, 0.6)}`
//                   : `0 15px 30px -8px ${alpha(theme.palette.primary.main, 0.4)}`,
//                 borderColor: theme.palette.primary.main,
//               } : {},
//             }}
//           >
//             {/* Recommended Label */}
//             {isRecommended && (
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 18,
//                   left: -28,
//                   zIndex: 10,
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   color: 'white',
//                   fontWeight: 600,
//                   fontSize: '0.6rem',
//                   py: 0.4,
//                   px: 2.5,
//                   transform: 'rotate(-45deg)',
//                   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                   textTransform: 'capitalize',
//                   letterSpacing: '0.3px',
//                   width: '110px',
//                   textAlign: 'center',
//                 }}
//               >
//                 Recommended
//               </Box>
//             )}

//             {/* Header */}
//             <CardHeader
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 color: 'white',
//                 py: 2,
//                 px: 2.5,
//                 borderTopLeftRadius: 10,
//                 borderTopRightRadius: 10,
//               }}
//               avatar={
//                 <Avatar sx={{
//                   bgcolor: alpha('#ffffff', 0.2),
//                   color: 'white',
//                   width: 32,
//                   height: 32,
//                 }}>
//                   {isAddOn ? <AddIcon sx={{ fontSize: 18 }} /> : <CreditCardIcon sx={{ fontSize: 18 }} />}
//                 </Avatar>
//               }
//               title={
//                 <Typography variant="body1" fontWeight={600} color="white" sx={{ fontSize: '1rem' }}>
//                   {plan.name}
//                 </Typography>
//               }
//               subheader={
//                 <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: '0.6rem' }}>
//                   {isAddOn ? "Add-on Plan" : `Plan #${index + 1}`}
//                 </Typography>
//               }
//               action={
//                 <Chip
//                   label={plan.duration}
//                   size="small"
//                   sx={{
//                     bgcolor: 'white',
//                     color: theme.palette.primary.main,
//                     fontWeight: 600,
//                     fontSize: '0.6rem',
//                     height: 22,
//                   }}
//                 />
//               }
//             />

//             <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
//               {/* Description */}
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.74rem', mb: 1.5, display: 'block' }}>
//                 {plan.description}
//               </Typography>

//               {/* Price with Coupon Applied */}
//               <Box sx={{ textAlign: 'center', mb: 2.5, position: 'relative' }}>
//                 {hasCouponApplied && (
//                   <Chip
//                     label={`Coupon applied: -₹${appliedCouponData.discountAmount}`}
//                     size="small"
//                     icon={<LocalOfferIcon sx={{ fontSize: 12 }} />}
//                     onDelete={() => setAppliedCouponData(null)}
//                     sx={{
//                       position: 'absolute',
//                       top: -15,
//                       right: 0,
//                       bgcolor: alpha('#22c55e', 0.1),
//                       color: '#22c55e',
//                       fontSize: '0.55rem',
//                       height: 20,
//                       '& .MuiChip-deleteIcon': {
//                         color: '#22c55e',
//                         fontSize: 14,
//                       },
//                     }}
//                   />
//                 )}
//                 <Typography
//                   variant="h5"
//                   fontWeight={700}
//                   sx={{
//                     color: hasCouponApplied
//                       ? alpha(theme.palette.primary.main, 0.5)
//                       : theme.palette.primary.main,
//                     textDecoration: hasCouponApplied ? 'line-through' : 'none',
//                     fontSize: hasCouponApplied ? '1.2rem' : '1.5rem',
//                   }}
//                 >
//                   ₹{plan.price}
//                 </Typography>
//                 {hasCouponApplied && (
//                   <Typography
//                     variant="h5"
//                     fontWeight={700}
//                     sx={{
//                       color: '#22c55e',
//                       fontSize: '1.5rem',
//                       lineHeight: 1,
//                     }}
//                   >
//                     ₹{appliedCouponData.finalAmount}
//                   </Typography>
//                 )}
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>
//                   per {plan.duration}
//                 </Typography>
//               </Box>

//               {/* User Limits */}
//               <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
           
//                 <Box sx={{
//                   flex: 1,
//                   p: 1.2,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   borderRadius: 1.5,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   textAlign: 'center',
//                 }}>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{
//                       fontSize: '0.64rem',
//                       textAlign: 'center',
//                       width: '100%',
//                       display: 'block'
//                     }}
//                   >
//                     Max Users
//                   </Typography>
//                   <Box sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     gap: 0.5,
//                     width: '100%'
//                   }}>
//                     <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
//                     <Typography
//                       variant="body2"
//                       fontWeight={600}
//                       sx={{
//                         fontSize: '0.7rem',
//                         color: 'text.primary',
//                         textAlign: 'center'
//                       }}
//                     >
//                       {plan.maxUsers}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Stack>

//               {/* Payment Stats for completed plans */}
//               {paymentStats && isCurrentPlan && (
//                 <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1.5 }}>
//                   <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600, display: 'block', textAlign: 'center' }}>
//                     ✓ Active Plan
//                   </Typography>
//                 </Box>
//               )}
//             </CardContent>

//             <CardActions sx={{ p: 2.5, pt: 0 }}>
//               {!isAddOn && hasActiveSubscription ? (
//                 isCurrentPlan ? (
//                   <Button
//                     fullWidth
//                     variant={isExpired ? "outlined" : "contained"}
//                     color={isExpired ? "warning" : "success"}
//                     disabled={!isExpired}
//                     startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
//                     size="small"
//                     sx={{
//                       py: 1.2,
//                       borderRadius: 1.5,
//                       bgcolor: isExpired ? 'transparent' : '#22c55e',
//                       color: isExpired ? theme.palette.warning.main : 'white',
//                       borderColor: isExpired ? theme.palette.warning.main : 'transparent',
//                       fontSize: '0.7rem',
//                       '&:hover': isExpired ? {
//                         borderColor: theme.palette.warning.dark,
//                         bgcolor: alpha(theme.palette.warning.main, 0.1),
//                       } : {
//                         bgcolor: '#16a34a',
//                       },
//                     }}
//                   >
//                     {isExpired ? 'Expired - Renew Now' : 'Active Plan'}
//                   </Button>
//                 ) : (
//                   <Button
//                     fullWidth
//                     variant="outlined"
//                     disabled
//                     startIcon={<CreditCardIcon sx={{ fontSize: 16 }} />}
//                     size="small"
//                     sx={{
//                       py: 1.2,
//                       borderRadius: 1.5,
//                       borderColor: alpha(theme.palette.divider, 0.5),
//                       color: 'text.disabled',
//                       fontSize: '0.7rem',
//                     }}
//                   >
//                     Subscribe Now
//                   </Button>
//                 )
//               ) : (
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={() => {
//                     setSelectedPlanForCoupon(plan);
//                     setCouponPopupOpen(true);
//                   }}
//                   disabled={orderLoading || addOnOrderLoading || processingPlanId === plan._id || isDisabled}
//                   startIcon={
//                     processingPlanId === plan._id ? (
//                       <CircularProgress size={14} sx={{ color: 'white' }} />
//                     ) : isAddOn ? (
//                       <ArrowUpIcon sx={{ fontSize: 16 }} />
//                     ) : (
//                       <CreditCardIcon sx={{ fontSize: 16 }} />
//                     )
//                   }
//                   size="small"
//                   sx={{
//                     py: 1.2,
//                     borderRadius: 1.5,
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     fontSize: '0.7rem',
//                     '&:hover': {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                     '&.Mui-disabled': {
//                       background: alpha(theme.palette.primary.main, 0.3),
//                     },
//                   }}
//                 >
//                   {isAddOn ? 'Upgrade Now' : 'Subscribe Now'}
//                 </Button>
//               )}
//             </CardActions>
//           </Card>
//         </motion.div>
//       </Grid>
//     );
//   };

//   const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

//   // If first render loader is active, show skeletons
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ minHeight: '100vh', bgcolor: alpha(theme.palette.primary.main, 0.05), py: 3 }}>
//         <Container maxWidth="xl">
//           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box>
//               <Typography
//                 variant="h5"
//                 fontWeight={700}
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
//                 }}
//               >
//                 Payment Plans
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//                 Choose the perfect plan for your team
//               </Typography>
//             </Box>

//             {/* History Button Skeleton */}
//             <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: 2 }} />
//           </Box>

//           {/* Subscription Plans Section Skeleton */}
//           <Box sx={{ mb: 5 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
//               <Skeleton variant="circular" width={32} height={32} />
//               <Skeleton variant="text" width={180} height={28} />
//             </Box>
//             <Grid container spacing={2.5} alignItems="stretch">
//               <PlanCardSkeleton />
//               <PlanCardSkeleton />
//               <PlanCardSkeleton />
//             </Grid>
//           </Box>

//           {/* Add-on Plans Section Skeleton */}
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
//               <Skeleton variant="circular" width={32} height={32} />
//               <Skeleton variant="text" width={180} height={28} />
//             </Box>
//             <Grid container spacing={2.5} alignItems="stretch">
//               <PlanCardSkeleton />
//             </Grid>
//           </Box>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: alpha(theme.palette.primary.main, 0.05), py: 3 }}>
//       <Container maxWidth="xl">
//         {/* Header with History Button */}
//         <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box>
//             <Typography
//               variant="h5"
//               fontWeight={700}
//               gutterBottom
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
//               }}
//             >
//               Payment Plans
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//               Choose the perfect plan for your team
//             </Typography>
//           </Box>

//           {/* Payment History Button */}
//           <Button
//             variant="outlined"
//             startIcon={<HistoryIcon />}
//             onClick={() => setHistoryDialogOpen(true)}
//             sx={{
//               borderRadius: 2,
//               borderColor: alpha(theme.palette.primary.main, 0.3),
//               color: theme.palette.primary.main,
//               fontSize: '0.75rem',
//               py: 1,
//               px: 2,
//             }}
//           >
//             Payment History
//           </Button>
//         </Box>

//         {/* Revenue Summary for Admin */}
//         {authUser?.role === 'superadmin' && revenueSummary && (
//           <Paper sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
//                   <Typography variant="h6" fontWeight={700} color="primary.main">
//                     ₹{revenueSummary.totalRevenue?.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">Current Month</Typography>
//                   <Typography variant="h6" fontWeight={700} color="success.main">
//                     ₹{revenueSummary.currentMonthRevenue?.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">Total Discounts</Typography>
//                   <Typography variant="h6" fontWeight={700} color="warning.main">
//                     ₹{revenueSummary.totalDiscount?.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">Growth</Typography>
//                   <Typography variant="h6" fontWeight={700} color={revenueSummary.growthPercentage >= 0 ? 'success.main' : 'error.main'}>
//                     {revenueSummary.growthPercentage}%
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         )}

//         {/* Admin Summary Stats */}
//         {authUser?.role === 'superadmin' && allPaymentHistory && (
//           <Paper sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.02) }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">Total Completed Amount</Typography>
//                   <Typography variant="h6" fontWeight={700} color="info.main">
//                     ₹{totalCompletedAmount?.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">Paid Users</Typography>
//                   <Typography variant="h6" fontWeight={700} color="info.main">
//                     {numberOfPaidUsers}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Box sx={{ textAlign: 'center' }}>
//                   <Typography variant="caption" color="text.secondary">Average Revenue</Typography>
//                   <Typography variant="h6" fontWeight={700} color="info.main">
//                     ₹{averageRevenue?.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         )}

//         {(hasActiveSubscription || isExpired) && (
//           <Alert
//             severity={isExpired ? "warning" : "info"}
//             icon={isExpired ? <WarningIcon sx={{ fontSize: 18 }} /> : <InfoIcon sx={{ fontSize: 18 }} />}
//             sx={{
//               mb: 3,
//               borderRadius: 1.5,
//               border: '1px solid',
//               borderColor: isExpired ? alpha(theme.palette.warning.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
//             }}
//           >
//             <AlertTitle sx={{ fontWeight: 600, fontSize: '0.85rem', color: isExpired ? theme.palette.warning.main : theme.palette.primary.main }}>
//               {isExpired ? "Subscription Expired" : "Active Subscription"}
//             </AlertTitle>
//             <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
//               {isExpired ? (
//                 <>
//                   Your subscription expired on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.
//                   <br />
//                   To continue using the service, please purchase one of the subscription plans below.
//                 </>
//               ) : (
//                 <>
//                   You currently have an active subscription plan.
//                   {subscriptionExpiry && (
//                     <> It will expire on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.</>
//                   )}
//                   <br />
//                   You can purchase add-on plans to increase your user limit.
//                 </>
//               )}
//             </Typography>
//           </Alert>
//         )}






//         {paymentSuccess && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//           >
//             <Alert
//               severity="success"
//               onClose={() => setPaymentSuccess(null)}
//               sx={{ mb: 2.5, borderRadius: 1.5 }}
//             >
//               <AlertTitle sx={{ fontSize: '0.85rem' }}>Payment Successful!</AlertTitle>
//               <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{paymentSuccess}</Typography>
//             </Alert>
//           </motion.div>
//         )}

//         {/* Custom Plan Section */}
//         {isAuthenticated && (
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
//               Your Custom Plan
//             </Typography>

//             {!userCustomPlan && !fetchingCustomPlan && (
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 size="small"
//                 startIcon={<BuildIcon />}
//                 onClick={handleOpenCreateCustomPlan}
//                 sx={{
//                   fontSize: '0.75rem',
//                   py: 0.5,
//                   px: 1.5,
//                   borderRadius: 2,
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                 }}
//               >
//                 Create Custom Plan
//               </Button>
//             )}
//           </Box>
//         )}

//         {/* Custom Plan Card */}
//         {fetchingCustomPlan && (
//           <Box sx={{ mb: 4, p: 3, textAlign: 'center' }}>
//             <CircularProgress size={30} />
//             <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'text.secondary' }}>
//               Loading your custom plan...
//             </Typography>
//           </Box>
//         )}

//         {userCustomPlan && !fetchingCustomPlan && (
//           <Grid container spacing={2.5} sx={{ mb: 4 }}>
//             <Grid item xs={12} md={6} lg={4}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 style={{ width: '100%', height: '100%' }}
//               >
//                 <Card
//                   sx={{
//                     position: 'relative',
//                     borderRadius: 2.5,
//                     border: '2px solid',
//                     borderColor: isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0',
//                     boxShadow: `0 8px 25px -8px ${alpha(isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0', 0.5)}`,
//                     transition: 'all 0.3s ease',
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     '&:hover': {
//                       transform: 'translateY(-6px)',
//                       boxShadow: `0 25px 40px -15px ${alpha(isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0', 0.6)}`,
//                       borderColor: isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0',
//                     },
//                   }}
//                 >
//                   {/* Status Badge */}
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: 18,
//                       right: -30,
//                       zIndex: 10,
//                       background: isCustomPlanPurchased ? theme.palette.success.main : '#df3a24b1',
//                       color: 'white',
//                       fontWeight: 600,
//                       fontSize: '0.6rem',
//                       py: 0.4,
//                       px: 2.5,
//                       transform: 'rotate(45deg)',
//                       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                       textTransform: 'capitalize',
//                       letterSpacing: '0.3px',
//                       width: '110px',
//                       textAlign: 'center',
//                     }}
//                   >
//                     {isCustomPlanPurchased ? 'ACTIVE' : 'YOUR PLAN'}
//                   </Box>

//                   {/* Header */}
//                   <CardHeader
//                     sx={{
//                       background: `linear-gradient(135deg, ${isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0'}, ${isCustomPlanPurchased ? theme.palette.success.dark : '#7b1fa2'})`,
//                       color: 'white',
//                       py: 2,
//                       px: 2.5,
//                       borderTopLeftRadius: 10,
//                       borderTopRightRadius: 10,
//                     }}
//                     avatar={
//                       <Avatar sx={{
//                         bgcolor: alpha('#ffffff', 0.2),
//                         color: 'white',
//                         width: 32,
//                         height: 32,
//                       }}>
//                         <BuildIcon sx={{ fontSize: 18 }} />
//                       </Avatar>
//                     }
//                     title={
//                       <Typography variant="body1" fontWeight={600} color="white" sx={{ fontSize: '1rem' }}>
//                         {userCustomPlan.name}
//                       </Typography>
//                     }
//                     subheader={
//                       <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: '0.6rem' }}>
//                         Custom Plan
//                       </Typography>
//                     }
//                     action={
//                       <Chip
//                         label={userCustomPlan.duration}
//                         size="small"
//                         sx={{
//                           bgcolor: 'white',
//                           color: isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0',
//                           fontWeight: 600,
//                           fontSize: '0.6rem',
//                           height: 22,
//                         }}
//                       />
//                     }
//                   />

//                   <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.74rem', mb: 1.5, display: 'block' }}>
//                       {userCustomPlan.description}
//                     </Typography>

//                     <Box sx={{ textAlign: 'center', mb: 2.5 }}>
//                       <Typography
//                         variant="h5"
//                         fontWeight={700}
//                         sx={{
//                           color: '#9c27b0',
//                           fontSize: '1.5rem',
//                         }}
//                       >
//                         ₹{userCustomPlan.price}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>
//                         per {userCustomPlan.duration}
//                       </Typography>
//                     </Box>

//                     <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
                      
//                       <Box sx={{
//                         flex: 1,
//                         p: 1.2,
//                         bgcolor: alpha('#9c27b0', 0.05),
//                         borderRadius: 1.5,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',     // Center horizontally
//                         justifyContent: 'center', // Center vertically
//                         textAlign: 'center',      // Center text
//                       }}>
//                         <Typography variant="caption" color="text.secondary" sx={{
//                           fontSize: '0.64rem',
//                           textAlign: 'center',
//                           width: '100%'
//                         }}>
//                           Max Users
//                         </Typography>
//                         <Box sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center', // Center the icon and text
//                           gap: 0.5,
//                           width: '100%'
//                         }}>
//                           <PeopleIcon sx={{ color: '#9c27b0', fontSize: 14 }} />
//                           <Typography variant="body2" fontWeight={600} sx={{
//                             fontSize: '0.7rem',
//                             color: 'text.primary',
//                             textAlign: 'center'
//                           }}>
//                             {userCustomPlan.maxUsers}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Stack>

//                     {isCustomPlanPurchased && (
//                       <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1.5, textAlign: 'center' }}>
//                         <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
//                           ✓ You have an active subscription for this plan
//                         </Typography>
//                       </Box>
//                     )}
//                   </CardContent>

//                   <CardActions sx={{ p: 2.5, pt: 0 }}>
//                     {isCustomPlanPurchased ? (
//                       <Button
//                         fullWidth
//                         variant="contained"
//                         color="success"
//                         disabled
//                         startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
//                         size="small"
//                         sx={{
//                           py: 1.2,
//                           borderRadius: 1.5,
//                           bgcolor: theme.palette.success.main,
//                           color: 'white',
//                           fontSize: '0.7rem',
//                         }}
//                       >
//                         Active Plan
//                       </Button>
//                     ) : (
//                       <>
//                         <Button
//                           fullWidth
//                           variant="outlined"
//                           onClick={handleOpenEditCustomPlan}
//                           startIcon={<EditIcon sx={{ fontSize: 16 }} />}
//                           size="small"
//                           disabled={isCustomPlanPurchased}
//                           sx={{
//                             py: 1.2,
//                             borderRadius: 1.5,
//                             borderColor: alpha('#9c27b0', 0.3),
//                             color: '#9c27b0',
//                             fontSize: '0.7rem',
//                             mr: 1,
//                             '&:hover': {
//                               borderColor: '#9c27b0',
//                               bgcolor: alpha('#9c27b0', 0.05),
//                             },
//                           }}
//                         >
//                           Edit Plan
//                         </Button>
//                         <Button
//                           fullWidth
//                           variant="contained"
//                           onClick={handlePurchaseCustomPlan}
//                           disabled={hasActiveSubscription && moment(subscriptionExpiry).isAfter(moment())}
//                           startIcon={<CreditCardIcon sx={{ fontSize: 16 }} />}
//                           size="small"
//                           sx={{
//                             py: 1.2,
//                             borderRadius: 1.5,
//                             background: `linear-gradient(135deg, #9c27b0, #7b1fa2)`,
//                             fontSize: '0.7rem',
//                             '&:hover': {
//                               background: `linear-gradient(135deg, #7b1fa2, #9c27b0)`,
//                             },
//                             '&.Mui-disabled': {
//                               background: alpha('#9c27b0', 0.3),
//                             },
//                           }}
//                         >
//                           Subscribe
//                         </Button>
//                       </>
//                     )}
//                   </CardActions>
//                 </Card>
//               </motion.div>
//             </Grid>
//           </Grid>
//         )}

//         {/* Payment Status Alerts */}
//         <AnimatePresence>
//           {paymentStatus === 'processing' && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <Alert
//                 severity="info"
//                 sx={{ mb: 2.5, borderRadius: 1.5 }}
//               >
//                 <AlertTitle sx={{ fontSize: '0.85rem' }}>Processing Payment</AlertTitle>
//                 <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
//                   Please wait while we process your payment...
//                 </Typography>
//               </Alert>
//             </motion.div>
//           )}

//           {/* {paymentSuccess && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <Alert
//                 severity="success"
//                 onClose={() => setPaymentSuccess(null)}
//                 sx={{ mb: 2.5, borderRadius: 1.5 }}
//               >
//                 <AlertTitle sx={{ fontSize: '0.85rem' }}>Payment Successful!</AlertTitle>
//                 <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{paymentSuccess}</Typography>
//               </Alert>
//             </motion.div>
//           )} */}

//           {orderError && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <Alert
//                 severity="error"
//                 onClose={() => dispatch(clearPaymentState())}
//                 sx={{ mb: 2.5, borderRadius: 1.5 }}
//               >
//                 <AlertTitle sx={{ fontSize: '0.85rem' }}>Payment Error</AlertTitle>
//                 <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{orderError?.message || 'An error occurred'}</Typography>
//               </Alert>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Active Subscription Notice */}
//         {/* {(hasActiveSubscription || isExpired) && (
//           <Alert
//             severity={isExpired ? "warning" : "info"}
//             icon={isExpired ? <WarningIcon sx={{ fontSize: 18 }} /> : <InfoIcon sx={{ fontSize: 18 }} />}
//             sx={{
//               mb: 3,
//               borderRadius: 1.5,
//               border: '1px solid',
//               borderColor: isExpired ? alpha(theme.palette.warning.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
//             }}
//           >
//             <AlertTitle sx={{ fontWeight: 600, fontSize: '0.85rem', color: isExpired ? theme.palette.warning.main : theme.palette.primary.main }}>
//               {isExpired ? "Subscription Expired" : "Active Subscription"}
//             </AlertTitle>
//             <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
//               {isExpired ? (
//                 <>
//                   Your subscription expired on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.
//                   <br />
//                   To continue using the service, please purchase one of the subscription plans below.
//                 </>
//               ) : (
//                 <>
//                   You currently have an active subscription plan.
//                   {subscriptionExpiry && (
//                     <> It will expire on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.</>
//                   )}
//                   <br />
//                   You can purchase add-on plans to increase your user limit.
//                 </>
//               )}
//             </Typography>
//           </Alert>
//         )} */}

//         {/* Subscription Plans Section */}
//         <Box sx={{ mb: 5 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
//             <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
//               <CreditCardIcon sx={{ fontSize: 18 }} />
//             </Avatar>
//             <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
//               Subscription Plans
//             </Typography>
//           </Box>

//           <Grid container spacing={2.5} alignItems="stretch">
//             {plansLoading ? (
//               <>
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//               </>
//             ) : subscriptionPlans.length > 0 ? (
//               subscriptionPlans.map((plan, index) => renderPlanCard(plan, index, false))
//             ) : (
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2.5 }}>
//                   <CreditCardIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
//                   <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: '0.9rem' }}>
//                     No subscription plans available
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </Box>

//         {/* Add-on Plans Section */}
//         {!plansLoading && addOnPlans.length > 0 && (
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
//               <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
//                 <AddIcon sx={{ fontSize: 18 }} />
//               </Avatar>
//               <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
//                 Add-on Plans
//               </Typography>
//             </Box>

//             <Grid container spacing={2.5} alignItems="stretch">
//               {addOnPlans.map((plan, index) => renderPlanCard(plan, index, true))}
//             </Grid>
//           </Box>
//         )}

//         {/* Coupon Popup */}
//         <CouponPopup
//           open={couponPopupOpen}
//           onClose={() => {
//             setCouponPopupOpen(false);
//             setSelectedPlanForCoupon(null);
//           }}
//           onApplyCoupon={handleApplyCoupon}
//           planPrice={selectedPlanForCoupon?.price || 0}
//           planName={selectedPlanForCoupon?.name || ''}
//         />

//         {/* Custom Plan Popup */}
//         <CustomPlanPopup
//           open={customPlanPopupOpen}
//           onClose={handleCloseCustomPlanPopup}
//           onSubmit={handleCreateCustomPlan}
//           planData={customPlanData}
//           setPlanData={setCustomPlanData}
//           errors={customPlanErrors}
//           isCreating={isCreatingCustomPlan}
//           isEditing={isEditingCustomPlan}
//         />

//         {/* Payment History Dialog */}
//         <PaymentHistoryDialog
//           open={historyDialogOpen}
//           onClose={() => setHistoryDialogOpen(false)}
//           paymentHistory={paymentHistory}
//           loading={historyLoading}
//         />
//       </Container>
//     </Box>
//   );
// };

// export default PaymentPlans;





import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Chip,
  Alert,
  AlertTitle,
  Paper,
  Divider,
  CircularProgress,
  Skeleton,
  alpha,
  useTheme,
  Stack,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
} from "@mui/material";
import {
  CreditCard as CreditCardIcon,
  People as PeopleIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  ArrowUpward as ArrowUpIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon,
  LocalOffer as LocalOfferIcon,
  Build as BuildIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  History as HistoryIcon,
  Receipt as ReceiptIcon,
  TrendingUp as TrendingUpIcon,
  Savings as SavingsIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPlans,
  createCustomPlan,
  getUserCustomPlan,
  updateCustomPlan,
} from "../../redux/slices/planSlice";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  getAllPaymentHistory,
  getRevenueSummary,
  getPaymentById,
  createAddOnOrder,
  verifyAddOnPayment,
  clearPaymentState,
  clearOrderData,
  clearVerificationData,
  setPaymentStatus,
} from "../../redux/slices/paymentSlice";
import Loader from "../../components/common/Loader";
import { RAZORPAY_KEY_ID } from "../../utils/constants";
import { getUserById } from "../../redux/slices/userSlice";
import moment from "moment";
import { toast } from "react-toastify";
import CouponPopup from "../Admin/component/CouponPopup";

// Plan Card Skeleton Component
const PlanCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
      <Card
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2.5,
          border: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            py: 2,
            px: 2.5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
            <Box>
              <Skeleton variant="text" width={100} height={22} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
              <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
            </Box>
          </Box>
          <Skeleton variant="rounded" width={55} height={22} sx={{ bgcolor: alpha('#ffffff', 0.2), borderRadius: 2 }} />
        </Box>

        <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
          <Skeleton variant="text" width="90%" height={18} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width="60%" height={18} sx={{ mb: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />

          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Skeleton variant="text" width={90} height={40} sx={{ mx: 'auto', mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Skeleton variant="text" width={70} height={14} sx={{ mx: 'auto', bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={14} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
                <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={14} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
                <Skeleton variant="text" width={25} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              </Box>
            </Box>
          </Stack>
        </CardContent>

        <CardActions sx={{ p: 2.5, pt: 0 }}>
          <Skeleton variant="rounded" width="100%" height={42} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </CardActions>
      </Card>
    </Grid>
  );
};

// Custom Plan Popup Component
const CustomPlanPopup = ({ open, onClose, onSubmit, planData, setPlanData, errors, isCreating, isEditing }) => {
  const theme = useTheme();

  const durationUnits = ['days', 'weeks', 'months', 'years'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate price preview
  const calculatePricePreview = () => {
    const BASE_PRICE_PER_USER_PER_MONTH = 100;
    const minUsers = parseInt(planData.minUsers) || 0;
    const maxUsers = parseInt(planData.maxUsers) || 0;
    const durationValue = parseInt(planData.durationValue) || 0;
    const durationUnit = planData.durationUnit;

    if (!minUsers || !maxUsers || !durationValue) return 0;

    const userCount = maxUsers || minUsers || 1;

    let totalMonths = 0;
    switch (durationUnit?.toLowerCase()) {
      case 'day':
      case 'days':
        totalMonths = durationValue / 30;
        break;
      case 'week':
      case 'weeks':
        totalMonths = durationValue / 4;
        break;
      case 'month':
      case 'months':
        totalMonths = durationValue;
        break;
      case 'year':
      case 'years':
        totalMonths = durationValue * 12;
        break;
      default:
        totalMonths = durationValue;
    }

    return Math.round(userCount * BASE_PRICE_PER_USER_PER_MONTH * totalMonths);
  };

  const estimatedPrice = calculatePricePreview();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: 'white',
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}>
        <BuildIcon />
        <Typography variant="h6" fontWeight={600}>
          {isEditing ? 'Edit Custom Plan' : 'Create Custom Plan'}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form">
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Min Users */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Min Users"
                name="minUsers"
                type="number"
                value={planData.minUsers}
                onChange={handleChange}
                error={!!errors.minUsers}
                helperText={errors.minUsers}
                required
                size="small"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            {/* Max Users */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Users"
                name="maxUsers"
                type="number"
                value={planData.maxUsers}
                onChange={handleChange}
                error={!!errors.maxUsers}
                helperText={errors.maxUsers}
                required
                size="small"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            {/* Duration Value */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration"
                name="durationValue"
                type="number"
                value={planData.durationValue}
                onChange={handleChange}
                error={!!errors.durationValue}
                helperText={errors.durationValue}
                required
                size="small"
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>

            {/* Duration Unit */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Duration Unit</InputLabel>
                <Select
                  name="durationUnit"
                  value={planData.durationUnit}
                  onChange={handleChange}
                  label="Duration Unit"
                >
                  {durationUnits.map(unit => (
                    <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price Preview */}
            {planData.minUsers && planData.maxUsers && planData.durationValue && planData.durationUnit && (
              <Grid item xs={12}>
                <Paper sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Estimated Price:
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="primary.main">
                    ₹{estimatedPrice.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Based on {planData.maxUsers} users × ₹100 × {planData.durationValue} {planData.durationUnit}
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            flex: 1,
            py: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={isCreating}
          sx={{
            flex: 1,
            py: 1,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          }}
        >
          {isCreating ? <CircularProgress size={24} /> : (isEditing ? 'Update Plan' : 'Create Plan')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Payment History Dialog
// const PaymentHistoryDialog = ({ open, onClose, paymentHistory, loading }) => {
//   const theme = useTheme();

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 3,
//           overflow: 'hidden',
//         }
//       }}
//     >
//       <DialogTitle sx={{
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: 'white',
//         py: 2,
//         px: 3,
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1.5,
//       }}>
//         <HistoryIcon />
//         <Typography variant="h6" fontWeight={600}>
//           Payment History
//         </Typography>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3 }}>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : paymentHistory && paymentHistory.length > 0 ? (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Plan</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Coupon</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paymentHistory.map((payment) => (
//                   <TableRow key={payment._id}>
//                     <TableCell>{moment(payment.createdAt).format('DD/MM/YYYY')}</TableCell>
//                     <TableCell>{payment.planId?.name || 'N/A'}</TableCell>
//                     <TableCell>
//                       <Typography fontWeight={600}>
//                         ₹{payment.amount}
//                         {payment.discountAmount > 0 && (
//                           <Typography component="span" color="success.main" sx={{ ml: 1, fontSize: '0.7rem' }}>
//                             (Saved ₹{payment.discountAmount})
//                           </Typography>
//                         )}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={payment.status}
//                         size="small"
//                         color={payment.status === 'completed' ? 'success' : 'warning'}
//                         sx={{ fontSize: '0.6rem', height: 20 }}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {payment.couponCode ? (
//                         <Chip
//                           label={payment.couponCode}
//                           size="small"
//                           icon={<LocalOfferIcon sx={{ fontSize: 12 }} />}
//                           sx={{ fontSize: '0.6rem', height: 20 }}
//                         />
//                       ) : '-'}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: 'center', py: 4 }}>
//             <ReceiptIcon sx={{ fontSize: 48, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
//             <Typography color="text.secondary">No payment history found</Typography>
//           </Box>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 3, pt: 0 }}>
//         <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2 }}>
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
const PaymentHistoryDialog = ({ open, onClose, paymentHistory, loading }) => {
  const theme = useTheme();
  
  // Limit to show only last 2 payments
  const limitedPaymentHistory = paymentHistory?.slice(0, 10) || [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: 'white',
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <HistoryIcon />
          <Typography variant="h6" fontWeight={600}>
            Payment History
          </Typography>
        </Box>
        {paymentHistory?.length > 2 && (
          <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.8), fontSize: '0.7rem' }}>
            Showing last 10 of {paymentHistory.length} payments
          </Typography>
        )}
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : limitedPaymentHistory.length > 0 ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Coupon</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {limitedPaymentHistory.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>{moment(payment.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{payment.planId?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>
                        ₹{payment.amount}
                        {payment.discountAmount > 0 && (
                          <Typography component="span" color="success.main" sx={{ ml: 1, fontSize: '0.7rem' }}>
                            (Saved ₹{payment.discountAmount})
                          </Typography>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        size="small"
                        color={payment.status === 'completed' ? 'success' : 'warning'}
                        sx={{ fontSize: '0.6rem', height: 20 }}
                      />
                    </TableCell>
                    <TableCell>
                      {payment.couponCode ? (
                        <Chip
                          label={payment.couponCode}
                          size="small"
                          icon={<LocalOfferIcon sx={{ fontSize: 12 }} />}
                          sx={{ fontSize: '0.6rem', height: 20 }}
                        />
                      ) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <ReceiptIcon sx={{ fontSize: 48, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
            <Typography color="text.secondary">No payment history found</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: 2 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const PaymentPlans = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Selectors from plan slice
  const { plansList, loading: plansLoading, userCustomPlan } = useSelector((state) => state.plan || {});

  // Selectors from payment slice
  const {
    orderLoading,
    orderError,
    orderData,
    verificationLoading,
    verificationError,
    verificationData,
    historyLoading,
    paymentHistory,
    paymentStats,
    revenueSummary,
    revenueLoading,
    paymentDetails,
    paymentDetailsLoading,
    addOnOrderLoading,
    addOnOrderData,
    addOnVerificationLoading,
    addOnVerificationData,
    paymentStatus,
    allPaymentHistory,
    allPaymentHistoryLoading,
    totalCompletedAmount,
    numberOfPaidUsers,
    averageRevenue,
    currentPage,
    totalPages,
    totalItems,
  } = useSelector((state) => state.payment || {});

  // Auth selectors
  const userData = useSelector((state) => state.user?.userInfo || {});
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});

  // Local states
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
  const [currentPlanDetails, setCurrentPlanDetails] = useState(null);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  // Coupon popup states
  const [couponPopupOpen, setCouponPopupOpen] = useState(false);
  const [selectedPlanForCoupon, setSelectedPlanForCoupon] = useState(null);
  const [appliedCouponData, setAppliedCouponData] = useState(null);

  // Custom plan states
  const [customPlanPopupOpen, setCustomPlanPopupOpen] = useState(false);
  const [customPlanData, setCustomPlanData] = useState({
    minUsers: '',
    maxUsers: '',
    durationValue: '',
    durationUnit: 'months',
    status: 'active'
  });
  const [customPlanErrors, setCustomPlanErrors] = useState({});
  const [isCreatingCustomPlan, setIsCreatingCustomPlan] = useState(false);
  const [isEditingCustomPlan, setIsEditingCustomPlan] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [fetchingCustomPlan, setFetchingCustomPlan] = useState(false);

  // Check if current plan is the custom plan
  const isCustomPlanPurchased = currentPlanDetails?.planId === userCustomPlan?._id;

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await dispatch(getAllPlans()).unwrap();
      } catch (error) {
        console.error('Failed to fetch plans:', error);
        toast.error('Failed to load plans');
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowFirstRenderLoader(false);
        }, 1000);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  // Fetch user's custom plan
  useEffect(() => {
    const fetchUserCustomPlan = async () => {
      if (isAuthenticated) {
        setFetchingCustomPlan(true);
        try {
          await dispatch(getUserCustomPlan()).unwrap();
        } catch (error) {
          // console.log('No custom plan found for user');
        } finally {
          setFetchingCustomPlan(false);
        }
      }
    };

    fetchUserCustomPlan();
  }, [dispatch, isAuthenticated]);

  // Fetch user details when authenticated
  useEffect(() => {
    if (userData?._id) {
      dispatch(getUserById(userData._id));
    }
  }, [dispatch, userData?._id]);

  // Fetch payment history for current user
  useEffect(() => {
    if (isAuthenticated && authUser?._id) {
      dispatch(getPaymentHistory({ adminId: authUser._id, page: 1, limit: 10 }));
    }
  }, [dispatch, isAuthenticated, authUser?._id]);

  // Fetch all payment history for super admin
  useEffect(() => {
    if (isAuthenticated && authUser?.role === 'superadmin') {
      dispatch(getAllPaymentHistory({ page: 1, limit: 10 }));
    }
  }, [dispatch, isAuthenticated, authUser?.role]);

  // Fetch revenue summary (for admin dashboard)
  useEffect(() => {
    if (isAuthenticated && authUser?.role === 'superadmin') {
      dispatch(getRevenueSummary());
    }
  }, [dispatch, isAuthenticated, authUser?.role]);

  // Check subscription status
  useEffect(() => {
    if (userData?.currentPaymentId) {
      const isExpired = moment(userData.currentPaymentId.expiresAt).isBefore(moment());
      setHasActiveSubscription(!isExpired);
      if (userData.currentPaymentId.expiresAt) {
        setSubscriptionExpiry(userData.currentPaymentId.expiresAt);
      }
      setCurrentPlanDetails({
        _id: userData.currentPaymentId._id,
        planId: userData.currentPaymentId.planId,
        maxUser: userData.currentPaymentId.maxUser,
        minUser: userData.currentPaymentId.minUser,
        description: userData.currentPaymentId.description,
        name: userData.currentPaymentId.name,
      });
    } else {
      setHasActiveSubscription(false);
      setSubscriptionExpiry(null);
      setCurrentPlanDetails(null);
    }
  }, [userData]);

  // Handle payment verification success
  useEffect(() => {
    if (verificationData?.success) {
      const successMessage = verificationData.data?.couponCode
        ? `Payment successful! You saved ₹${verificationData.data.discountAmount} with coupon!`
        : "Payment successful! Your subscription has been activated.";

      setPaymentSuccess(successMessage);
      toast.success(successMessage);

      // Refresh user data and payment history
      if (authUser?._id) {
        dispatch(getUserById(authUser._id));
        dispatch(getPaymentHistory({ adminId: authUser._id }));
      }

      // Clear verification data IMMEDIATELY to prevent repeat toast on navigation
      dispatch(clearVerificationData());
      dispatch(setPaymentStatus('idle'));
    }
  }, [verificationData, dispatch, authUser?._id]);

  // Handle add-on verification success
  useEffect(() => {
    if (addOnVerificationData?.success) {
      const successMessage = addOnVerificationData.data?.addOnDetails?.addOnCouponCode
        ? `Add-on payment successful! You saved ₹${addOnVerificationData.data.addOnDetails.addOnDiscountAmount} with coupon!`
        : "Add-on payment successful! Your plan has been upgraded.";

      setPaymentSuccess(successMessage);
      toast.success(successMessage);

      // Refresh user data and payment history
      if (authUser?._id) {
        dispatch(getUserById(authUser._id));
        dispatch(getPaymentHistory({ adminId: authUser._id }));
      }

      // Clear verification data IMMEDIATELY to prevent repeat toast on navigation
      dispatch(clearVerificationData());
      dispatch(setPaymentStatus('idle'));
    }
  }, [addOnVerificationData, dispatch, authUser?._id]);

  // Handle errors
  useEffect(() => {
    if (orderError) {
      toast.error(orderError?.message || 'Failed to create order');
      dispatch(setPaymentStatus('failed'));
    }
    if (verificationError) {
      toast.error(verificationError?.message || 'Payment verification failed');
      dispatch(setPaymentStatus('failed'));
    }
  }, [orderError, verificationError, dispatch]);

  // Separate plans into subscriptions and add-ons
  const subscriptionPlans = plansList?.filter(
    (plan) => !plan.name?.includes("Add on Plan") && plan.status === "active" && plan.name !== "Customize Plan"
  ) || [];

  const addOnPlans = plansList?.filter(
    (plan) => plan.name?.includes("Add on Plan") && plan.status === "active"
  ) || [];

  // Custom Plan handlers
  const handleCreateCustomPlan = async (e) => {
    e?.preventDefault();

    // Validation
    const errors = {};
    if (!customPlanData.minUsers) errors.minUsers = 'Min users is required';
    if (!customPlanData.maxUsers) errors.maxUsers = 'Max users is required';
    if (!customPlanData.durationValue) errors.durationValue = 'Duration is required';

    if (customPlanData.minUsers && customPlanData.maxUsers &&
      parseInt(customPlanData.minUsers) > parseInt(customPlanData.maxUsers)) {
      errors.maxUsers = 'Max users must be greater than min users';
    }

    if (Object.keys(errors).length > 0) {
      setCustomPlanErrors(errors);
      return;
    }

    setCustomPlanErrors({});
    setIsCreatingCustomPlan(true);

    try {
      const payload = {
        minUsers: parseInt(customPlanData.minUsers),
        maxUsers: parseInt(customPlanData.maxUsers),
        durationValue: parseInt(customPlanData.durationValue),
        durationUnit: customPlanData.durationUnit,
        status: customPlanData.status
      };

      if (isEditingCustomPlan && editingPlanId) {
        const result = await dispatch(updateCustomPlan({
          planId: editingPlanId,
          data: payload
        })).unwrap();
        toast.success(result.message || 'Custom plan updated successfully!');
      } else {
        const result = await dispatch(createCustomPlan(payload)).unwrap();
        toast.success(result.message || 'Custom plan created successfully!');
      }

      setCustomPlanPopupOpen(false);
      resetCustomPlanForm();
      dispatch(getAllPlans());
      await dispatch(getUserCustomPlan()).unwrap();
    } catch (error) {
      if (error?.existingPlanId) {
        toast.error("You already have a custom plan. Only one custom plan per user is allowed.");
      } else {
        toast.error(error?.message || 'Failed to process custom plan');
      }
    } finally {
      setIsCreatingCustomPlan(false);
    }
  };

  const handleOpenCreateCustomPlan = () => {
    setEditingPlanId(null);
    setIsEditingCustomPlan(false);
    resetCustomPlanForm();
    setCustomPlanPopupOpen(true);
    setCustomPlanErrors({});
  };

  const handleOpenEditCustomPlan = () => {
    if (userCustomPlan) {
      setEditingPlanId(userCustomPlan._id);
      setIsEditingCustomPlan(true);
      setCustomPlanData({
        minUsers: userCustomPlan.minUsers.toString(),
        maxUsers: userCustomPlan.maxUsers.toString(),
        durationValue: userCustomPlan.durationValue.toString(),
        durationUnit: userCustomPlan.durationUnit,
        status: userCustomPlan.status
      });
      setCustomPlanPopupOpen(true);
      setCustomPlanErrors({});
    }
  };

  const handleCloseCustomPlanPopup = () => {
    setCustomPlanPopupOpen(false);
    resetCustomPlanForm();
    setCustomPlanErrors({});
  };

  const resetCustomPlanForm = () => {
    setCustomPlanData({
      minUsers: '',
      maxUsers: '',
      durationValue: '',
      durationUnit: 'months',
      status: 'active'
    });
  };

  const handlePurchaseCustomPlan = () => {
    if (userCustomPlan) {
      if (hasActiveSubscription && subscriptionExpiry && moment(subscriptionExpiry).isAfter(moment())) {
        toast.warning("You already have an active subscription. You can only purchase add-on plans.");
        return;
      }

      setSelectedPlanForCoupon(userCustomPlan);
      setCouponPopupOpen(true);
    }
  };

  // Payment handlers
  const handleSubscriptionPayment = async (planId, couponCode = null) => {
    setProcessingPlanId(planId);

    if (hasActiveSubscription && subscriptionExpiry && moment(subscriptionExpiry).isAfter(moment())) {
      toast.warning("You already have an active subscription. You can only purchase add-on plans.");
      setProcessingPlanId(null);
      return;
    }

    try {
      dispatch(clearPaymentState());
      setPaymentSuccess(null);

      if (!isAuthenticated || !authUser) {
        toast.error("User not authenticated. Please login again.");
        setProcessingPlanId(null);
        return;
      }

      const adminId = authUser._id || authUser.id || userData?._id;

      if (!adminId) {
        toast.error("User ID not found. Please login again.");
        setProcessingPlanId(null);
        return;
      }

      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded. Please refresh the page and try again.");
        setProcessingPlanId(null);
        return;
      }

      const orderResult = await dispatch(
        createPaymentOrder({ adminId, planId, couponCode })
      );

      if (createPaymentOrder.rejected.match(orderResult)) {
        toast.error(orderResult.payload?.message || "Failed to create order");
        setProcessingPlanId(null);
        return;
      }

      const orderData = orderResult.payload?.data;

      if (!couponCode) {
        toast.info(`Proceeding with amount: ₹${orderData.originalAmount || selectedPlanForCoupon?.price || 0}`);
      } else if (orderData.discountApplied) {
        toast.success(`Coupon applied! You saved ₹${orderData.discountAmount}`);
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Team Trackify",
        description: couponCode
          ? `Payment for ${selectedPlanForCoupon?.name || "Subscription"} (Saved: ₹${orderData.discountAmount})`
          : `Payment for ${selectedPlanForCoupon?.name || "Subscription"}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            await dispatch(
              verifyPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                paymentId: orderData.paymentId,
              })
            );
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setProcessingPlanId(null);
          }
        },
        prefill: {
          name: authUser.name || userData?.name || "",
          email: authUser.email || userData?.email || "",
          contact: authUser.phone || userData?.phone || "",
        },
        theme: {
          color: theme.palette.primary.main,
        },
        modal: {
          ondismiss: function () {
            dispatch(clearOrderData());
            setProcessingPlanId(null);
            dispatch(setPaymentStatus('idle'));
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed: " + error.message);
      setProcessingPlanId(null);
      dispatch(setPaymentStatus('failed'));
    }
  };

  const handleUpgradePlan = async (addOnPlanId, couponCode = null) => {
    setProcessingPlanId(addOnPlanId);

    try {
      if (!authUser) {
        toast.error("User not authenticated. Please login.");
        setProcessingPlanId(null);
        return;
      }

      if (!hasActiveSubscription || !currentPlanDetails) {
        toast.warning("You need an active subscription to purchase add-on plans.");
        setProcessingPlanId(null);
        return;
      }

      const adminId = authUser._id || authUser.id || userData?._id;

      dispatch(clearPaymentState());
      setPaymentSuccess(null);

      // ✅ FIXED: Include paymentId from currentPlanDetails
      const orderResult = await dispatch(
        createAddOnOrder({
          adminId,
          addOnPlanId,
          paymentId: currentPlanDetails._id, // 👈 Add this!
          couponCode
        })
      );

      if (createAddOnOrder.rejected.match(orderResult)) {
        toast.error(orderResult.payload?.message || "Failed to create order");
        setProcessingPlanId(null);
        return;
      }

      const orderData = orderResult.payload?.data;

      if (!couponCode) {
        toast.info(`Proceeding with amount: ₹${orderData.originalAmount / 100 || selectedPlanForCoupon?.price || 0}`);
      } else if (orderData.discountApplied) {
        toast.success(`Coupon applied! You saved ₹${orderData.discountAmount / 100}`);
      }

      const razorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Team Trackify",
        description: couponCode
          ? `Payment for Add-on Plan (Saved: ₹${orderData.discountAmount / 100})`
          : `Payment for Add-on Plan`,
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            await dispatch(
              verifyAddOnPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                paymentId: orderData.paymentId,
              })
            );
          } catch (error) {
            console.error("Add-on verification error:", error);
            toast.error("Payment verification failed");
          } finally {
            setProcessingPlanId(null);
          }
        },
        prefill: {
          name: authUser.name || userData?.name || "",
          email: authUser.email || userData?.email || "",
          contact: authUser.phone || userData?.phone || "",
        },
        theme: {
          color: theme.palette.primary.main,
        },
        modal: {
          ondismiss: function () {
            dispatch(clearOrderData());
            setProcessingPlanId(null);
            dispatch(setPaymentStatus('idle'));
          },
        },
      };

      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in upgrading plan:", error);
      toast.error("An error occurred while upgrading your plan.");
      setProcessingPlanId(null);
      dispatch(setPaymentStatus('failed'));
    }
  };
  const handleApplyCoupon = (couponData) => {
    if (couponData === null) {
      if (selectedPlanForCoupon?.name?.includes("Add on Plan")) {
        handleUpgradePlan(selectedPlanForCoupon._id, null);
      } else {
        handleSubscriptionPayment(selectedPlanForCoupon._id, null);
      }
      setAppliedCouponData(null);
    } else {
      setAppliedCouponData(couponData);
      if (selectedPlanForCoupon?.name?.includes("Add on Plan")) {
        handleUpgradePlan(selectedPlanForCoupon._id, couponData.code);
      } else {
        handleSubscriptionPayment(selectedPlanForCoupon._id, couponData.code);
      }
    }
  };

 const renderPlanCard = (plan, index, isAddOn = false) => {
  const isCurrentPlan = currentPlanDetails?.planId === plan._id;
  // Modified logic: disable add-ons if no active subscription or subscription expired
  const isDisabled = isAddOn 
    ? (!hasActiveSubscription || subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment()))
    : (!isAddOn && hasActiveSubscription && !isCurrentPlan);
  const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());
  const isRecommended = plan.name === "Enterprise Plan" && !isAddOn;
  const hasCouponApplied = appliedCouponData && selectedPlanForCoupon?._id === plan._id;

    return (
      <Grid item xs={12} md={6} lg={4} key={plan._id} sx={{ display: 'flex' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Card
            sx={{
              position: 'relative',
              borderRadius: 2.5,
              border: '1px solid',
              borderColor: isRecommended ? theme.palette.primary.main : (isCurrentPlan ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5)),
              boxShadow: isRecommended
                ? `0 8px 25px -8px ${alpha(theme.palette.primary.main, 0.5)}`
                : isCurrentPlan
                  ? `0 8px 25px -8px ${alpha(theme.palette.primary.main, 0.5)}`
                  : '0 2px 8px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease',
              opacity: isDisabled ? 0.7 : 1,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': !isDisabled ? {
                transform: 'translateY(-6px)',
                boxShadow: isRecommended
                  ? `0 25px 40px -15px ${alpha(theme.palette.primary.main, 0.6)}`
                  : `0 15px 30px -8px ${alpha(theme.palette.primary.main, 0.4)}`,
                borderColor: theme.palette.primary.main,
              } : {},
            }}
          >
            {/* Recommended Label */}
            {isRecommended && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 18,
                  left: -28,
                  zIndex: 10,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.6rem',
                  py: 0.4,
                  px: 2.5,
                  transform: 'rotate(-45deg)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  textTransform: 'capitalize',
                  letterSpacing: '0.3px',
                  width: '110px',
                  textAlign: 'center',
                }}
              >
                Recommended
              </Box>
            )}

            {/* Header */}
            <CardHeader
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: 'white',
                py: 2,
                px: 2.5,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              avatar={
                <Avatar sx={{
                  bgcolor: alpha('#ffffff', 0.2),
                  color: 'white',
                  width: 32,
                  height: 32,
                }}>
                  {isAddOn ? <AddIcon sx={{ fontSize: 18 }} /> : <CreditCardIcon sx={{ fontSize: 18 }} />}
                </Avatar>
              }
              title={
                <Typography variant="body1" fontWeight={600} color="white" sx={{ fontSize: '1rem' }}>
                  {plan.name}
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: '0.6rem' }}>
                  {isAddOn ? "Add-on Plan" : `Plan #${index + 1}`}
                </Typography>
              }
              action={
                <Chip
                  label={plan.duration}
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: '0.6rem',
                    height: 22,
                  }}
                />
              }
            />

            <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
              {/* Description */}
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.74rem', mb: 1.5, display: 'block' }}>
                {plan.description}
              </Typography>

              {/* Price with Coupon Applied */}
              <Box sx={{ textAlign: 'center', mb: 2.5, position: 'relative' }}>
                {hasCouponApplied && (
                  <Chip
                    label={`Coupon applied: -₹${appliedCouponData.discountAmount}`}
                    size="small"
                    icon={<LocalOfferIcon sx={{ fontSize: 12 }} />}
                    onDelete={() => setAppliedCouponData(null)}
                    sx={{
                      position: 'absolute',
                      top: -15,
                      right: 0,
                      bgcolor: alpha('#22c55e', 0.1),
                      color: '#22c55e',
                      fontSize: '0.55rem',
                      height: 20,
                      '& .MuiChip-deleteIcon': {
                        color: '#22c55e',
                        fontSize: 14,
                      },
                    }}
                  />
                )}
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    color: hasCouponApplied
                      ? alpha(theme.palette.primary.main, 0.5)
                      : theme.palette.primary.main,
                    textDecoration: hasCouponApplied ? 'line-through' : 'none',
                    fontSize: hasCouponApplied ? '1.2rem' : '1.5rem',
                  }}
                >
                  ₹{plan.price}
                </Typography>
                {hasCouponApplied && (
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      color: '#22c55e',
                      fontSize: '1.5rem',
                      lineHeight: 1,
                    }}
                  >
                    ₹{appliedCouponData.finalAmount}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>
                  per {plan.duration}
                </Typography>
              </Box>

              {/* User Limits */}
              <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
           
                <Box sx={{
                  flex: 1,
                  p: 1.2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.64rem',
                      textAlign: 'center',
                      width: '100%',
                      display: 'block'
                    }}
                  >
                    Max Users
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                    width: '100%'
                  }}>
                    <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        fontSize: '0.7rem',
                        color: 'text.primary',
                        textAlign: 'center'
                      }}
                    >
                      {plan.maxUsers}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* Payment Stats for completed plans */}
              {paymentStats && isCurrentPlan && (
                <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1.5 }}>
                  <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600, display: 'block', textAlign: 'center' }}>
                    ✓ Active Plan
                  </Typography>
                </Box>
              )}
            </CardContent>

            <CardActions sx={{ p: 2.5, pt: 0 }}>
              {!isAddOn && hasActiveSubscription ? (
                isCurrentPlan ? (
                  <Button
                    fullWidth
                    variant={isExpired ? "outlined" : "contained"}
                    color={isExpired ? "warning" : "success"}
                    disabled={!isExpired}
                    startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                    size="small"
                    sx={{
                      py: 1.2,
                      borderRadius: 1.5,
                      bgcolor: isExpired ? 'transparent' : '#22c55e',
                      color: isExpired ? theme.palette.warning.main : 'white',
                      borderColor: isExpired ? theme.palette.warning.main : 'transparent',
                      fontSize: '0.7rem',
                      '&:hover': isExpired ? {
                        borderColor: theme.palette.warning.dark,
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                      } : {
                        bgcolor: '#16a34a',
                      },
                    }}
                  >
                    {isExpired ? 'Expired - Renew Now' : 'Active Plan'}
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="outlined"
                    disabled
                    startIcon={<CreditCardIcon sx={{ fontSize: 16 }} />}
                    size="small"
                    sx={{
                      py: 1.2,
                      borderRadius: 1.5,
                      borderColor: alpha(theme.palette.divider, 0.5),
                      color: 'text.disabled',
                      fontSize: '0.7rem',
                    }}
                  >
                    Subscribe Now
                  </Button>
                )
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setSelectedPlanForCoupon(plan);
                    setCouponPopupOpen(true);
                  }}
                  disabled={orderLoading || addOnOrderLoading || processingPlanId === plan._id || isDisabled}
                  startIcon={
                    processingPlanId === plan._id ? (
                      <CircularProgress size={14} sx={{ color: 'white' }} />
                    ) : isAddOn ? (
                      <ArrowUpIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <CreditCardIcon sx={{ fontSize: 16 }} />
                    )
                  }
                  size="small"
                  sx={{
                    py: 1.2,
                    borderRadius: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    fontSize: '0.7rem',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    },
                    '&.Mui-disabled': {
                      background: alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  {isAddOn ? 'Upgrade Now' : 'Subscribe Now'}
                </Button>
              )}
            </CardActions>
          </Card>
        </motion.div>
      </Grid>
    );
  };

  const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

  // If first render loader is active, show skeletons
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: alpha(theme.palette.primary.main, 0.05), py: 3 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
                }}
              >
                Payment Plans
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                Choose the perfect plan for your team
              </Typography>
            </Box>

            {/* History Button Skeleton */}
            <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: 2 }} />
          </Box>

          {/* Subscription Plans Section Skeleton */}
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={180} height={28} />
            </Box>
            <Grid container spacing={2.5} alignItems="stretch">
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </Grid>
          </Box>

          {/* Add-on Plans Section Skeleton */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={180} height={28} />
            </Box>
            <Grid container spacing={2.5} alignItems="stretch">
              <PlanCardSkeleton />
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: alpha(theme.palette.primary.main, 0.05), py: 3 }}>
      <Container maxWidth="xl">
        {/* Header with History Button */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' }
              }}
            >
              Payment Plans
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Choose the perfect plan for your team
            </Typography>
          </Box>

          {/* Payment History Button */}
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={() => setHistoryDialogOpen(true)}
            sx={{
              borderRadius: 2,
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.main,
              fontSize: '0.75rem',
              py: 1,
              px: 2,
            }}
          >
            Payment History
          </Button>
        </Box>

        {/* Revenue Summary for Admin */}
        {authUser?.role === 'superadmin' && revenueSummary && (
          <Paper sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.main">
                    ₹{revenueSummary.totalRevenue?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Current Month</Typography>
                  <Typography variant="h6" fontWeight={700} color="success.main">
                    ₹{revenueSummary.currentMonthRevenue?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Total Discounts</Typography>
                  <Typography variant="h6" fontWeight={700} color="warning.main">
                    ₹{revenueSummary.totalDiscount?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Growth</Typography>
                  <Typography variant="h6" fontWeight={700} color={revenueSummary.growthPercentage >= 0 ? 'success.main' : 'error.main'}>
                    {revenueSummary.growthPercentage}%
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Admin Summary Stats */}
        {authUser?.role === 'superadmin' && allPaymentHistory && (
          <Paper sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.02) }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Total Completed Amount</Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">
                    ₹{totalCompletedAmount?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Paid Users</Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">
                    {numberOfPaidUsers}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Average Revenue</Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">
                    ₹{averageRevenue?.toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {(hasActiveSubscription || isExpired) && (
          <Alert
            severity={isExpired ? "warning" : "info"}
            icon={isExpired ? <WarningIcon sx={{ fontSize: 18 }} /> : <InfoIcon sx={{ fontSize: 18 }} />}
            sx={{
              mb: 3,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: isExpired ? alpha(theme.palette.warning.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
            }}
          >
            <AlertTitle sx={{ fontWeight: 600, fontSize: '0.85rem', color: isExpired ? theme.palette.warning.main : theme.palette.primary.main }}>
              {isExpired ? "Subscription Expired" : "Active Subscription"}
            </AlertTitle>
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              {isExpired ? (
                <>
                  Your subscription expired on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.
                  <br />
                  To continue using the service, please purchase one of the subscription plans below.
                </>
              ) : (
                <>
                  You currently have an active subscription plan.
                  {subscriptionExpiry && (
                    <> It will expire on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.</>
                  )}
                  <br />
                  You can purchase add-on plans to increase your user limit.
                </>
              )}
            </Typography>
          </Alert>
        )}






        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert
              severity="success"
              onClose={() => setPaymentSuccess(null)}
              sx={{ mb: 2.5, borderRadius: 1.5 }}
            >
              <AlertTitle sx={{ fontSize: '0.85rem' }}>Payment Successful!</AlertTitle>
              <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{paymentSuccess}</Typography>
            </Alert>
          </motion.div>
        )}

        {/* Custom Plan Section */}
        {isAuthenticated && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
              Your Custom Plan
            </Typography>

            {!userCustomPlan && !fetchingCustomPlan && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<BuildIcon />}
                onClick={handleOpenCreateCustomPlan}
                sx={{
                  fontSize: '0.75rem',
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 2,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                }}
              >
                Create Custom Plan
              </Button>
            )}
          </Box>
        )}

        {/* Custom Plan Card */}
        {fetchingCustomPlan && (
          <Box sx={{ mb: 4, p: 3, textAlign: 'center' }}>
            <CircularProgress size={30} />
            <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'text.secondary' }}>
              Loading your custom plan...
            </Typography>
          </Box>
        )}

        {userCustomPlan && !fetchingCustomPlan && (
          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100%' }}
              >
                <Card
                  sx={{
                    position: 'relative',
                    borderRadius: 2.5,
                    border: '2px solid',
                    borderColor: isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0',
                    boxShadow: `0 8px 25px -8px ${alpha(isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0', 0.5)}`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 25px 40px -15px ${alpha(isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0', 0.6)}`,
                      borderColor: isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0',
                    },
                  }}
                >
                  {/* Status Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 18,
                      right: -30,
                      zIndex: 10,
                      background: isCustomPlanPurchased ? theme.palette.success.main : '#df3a24b1',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.6rem',
                      py: 0.4,
                      px: 2.5,
                      transform: 'rotate(45deg)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      textTransform: 'capitalize',
                      letterSpacing: '0.3px',
                      width: '110px',
                      textAlign: 'center',
                    }}
                  >
                    {isCustomPlanPurchased ? 'ACTIVE' : 'YOUR PLAN'}
                  </Box>

                  {/* Header */}
                  <CardHeader
                    sx={{
                      background: `linear-gradient(135deg, ${isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0'}, ${isCustomPlanPurchased ? theme.palette.success.dark : '#7b1fa2'})`,
                      color: 'white',
                      py: 2,
                      px: 2.5,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                    avatar={
                      <Avatar sx={{
                        bgcolor: alpha('#ffffff', 0.2),
                        color: 'white',
                        width: 32,
                        height: 32,
                      }}>
                        <BuildIcon sx={{ fontSize: 18 }} />
                      </Avatar>
                    }
                    title={
                      <Typography variant="body1" fontWeight={600} color="white" sx={{ fontSize: '1rem' }}>
                        {userCustomPlan.name}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: '0.6rem' }}>
                        Custom Plan
                      </Typography>
                    }
                    action={
                      <Chip
                        label={userCustomPlan.duration}
                        size="small"
                        sx={{
                          bgcolor: 'white',
                          color: isCustomPlanPurchased ? theme.palette.success.main : '#9c27b0',
                          fontWeight: 600,
                          fontSize: '0.6rem',
                          height: 22,
                        }}
                      />
                    }
                  />

                  <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.74rem', mb: 1.5, display: 'block' }}>
                      {userCustomPlan.description}
                    </Typography>

                    <Box sx={{ textAlign: 'center', mb: 2.5 }}>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                          color: '#9c27b0',
                          fontSize: '1.5rem',
                        }}
                      >
                        ₹{userCustomPlan.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.66rem' }}>
                        per {userCustomPlan.duration}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
                      
                      <Box sx={{
                        flex: 1,
                        p: 1.2,
                        bgcolor: alpha('#9c27b0', 0.05),
                        borderRadius: 1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',     // Center horizontally
                        justifyContent: 'center', // Center vertically
                        textAlign: 'center',      // Center text
                      }}>
                        <Typography variant="caption" color="text.secondary" sx={{
                          fontSize: '0.64rem',
                          textAlign: 'center',
                          width: '100%'
                        }}>
                          Max Users
                        </Typography>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center', // Center the icon and text
                          gap: 0.5,
                          width: '100%'
                        }}>
                          <PeopleIcon sx={{ color: '#9c27b0', fontSize: 14 }} />
                          <Typography variant="body2" fontWeight={600} sx={{
                            fontSize: '0.7rem',
                            color: 'text.primary',
                            textAlign: 'center'
                          }}>
                            {userCustomPlan.maxUsers}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>

                    {isCustomPlanPurchased && (
                      <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1.5, textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                          ✓ You have an active subscription for this plan
                        </Typography>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2.5, pt: 0 }}>
                    {isCustomPlanPurchased ? (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        disabled
                        startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                        size="small"
                        sx={{
                          py: 1.2,
                          borderRadius: 1.5,
                          bgcolor: theme.palette.success.main,
                          color: 'white',
                          fontSize: '0.7rem',
                        }}
                      >
                        Active Plan
                      </Button>
                    ) : (
                      <>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={handleOpenEditCustomPlan}
                          startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                          size="small"
                          disabled={isCustomPlanPurchased}
                          sx={{
                            py: 1.2,
                            borderRadius: 1.5,
                            borderColor: alpha('#9c27b0', 0.3),
                            color: '#9c27b0',
                            fontSize: '0.7rem',
                            mr: 1,
                            '&:hover': {
                              borderColor: '#9c27b0',
                              bgcolor: alpha('#9c27b0', 0.05),
                            },
                          }}
                        >
                          Edit Plan
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handlePurchaseCustomPlan}
                          disabled={hasActiveSubscription && moment(subscriptionExpiry).isAfter(moment())}
                          startIcon={<CreditCardIcon sx={{ fontSize: 16 }} />}
                          size="small"
                          sx={{
                            py: 1.2,
                            borderRadius: 1.5,
                            background: `linear-gradient(135deg, #9c27b0, #7b1fa2)`,
                            fontSize: '0.7rem',
                            '&:hover': {
                              background: `linear-gradient(135deg, #7b1fa2, #9c27b0)`,
                            },
                            '&.Mui-disabled': {
                              background: alpha('#9c27b0', 0.3),
                            },
                          }}
                        >
                          Subscribe
                        </Button>
                      </>
                    )}
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        )}

        {/* Payment Status Alerts */}
        <AnimatePresence>
          {paymentStatus === 'processing' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert
                severity="info"
                sx={{ mb: 2.5, borderRadius: 1.5 }}
              >
                <AlertTitle sx={{ fontSize: '0.85rem' }}>Processing Payment</AlertTitle>
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                  Please wait while we process your payment...
                </Typography>
              </Alert>
            </motion.div>
          )}

          {/* {paymentSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert
                severity="success"
                onClose={() => setPaymentSuccess(null)}
                sx={{ mb: 2.5, borderRadius: 1.5 }}
              >
                <AlertTitle sx={{ fontSize: '0.85rem' }}>Payment Successful!</AlertTitle>
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{paymentSuccess}</Typography>
              </Alert>
            </motion.div>
          )} */}

          {orderError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert
                severity="error"
                onClose={() => dispatch(clearPaymentState())}
                sx={{ mb: 2.5, borderRadius: 1.5 }}
              >
                <AlertTitle sx={{ fontSize: '0.85rem' }}>Payment Error</AlertTitle>
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{orderError?.message || 'An error occurred'}</Typography>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Subscription Notice */}
        {/* {(hasActiveSubscription || isExpired) && (
          <Alert
            severity={isExpired ? "warning" : "info"}
            icon={isExpired ? <WarningIcon sx={{ fontSize: 18 }} /> : <InfoIcon sx={{ fontSize: 18 }} />}
            sx={{
              mb: 3,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: isExpired ? alpha(theme.palette.warning.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
            }}
          >
            <AlertTitle sx={{ fontWeight: 600, fontSize: '0.85rem', color: isExpired ? theme.palette.warning.main : theme.palette.primary.main }}>
              {isExpired ? "Subscription Expired" : "Active Subscription"}
            </AlertTitle>
            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
              {isExpired ? (
                <>
                  Your subscription expired on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.
                  <br />
                  To continue using the service, please purchase one of the subscription plans below.
                </>
              ) : (
                <>
                  You currently have an active subscription plan.
                  {subscriptionExpiry && (
                    <> It will expire on {moment(subscriptionExpiry).format("MMMM Do YYYY")}.</>
                  )}
                  <br />
                  You can purchase add-on plans to increase your user limit.
                </>
              )}
            </Typography>
          </Alert>
        )} */}

        {/* Subscription Plans Section */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
              <CreditCardIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
              Subscription Plans
            </Typography>
          </Box>

          <Grid container spacing={2.5} alignItems="stretch">
            {plansLoading ? (
              <>
                <PlanCardSkeleton />
                <PlanCardSkeleton />
                <PlanCardSkeleton />
              </>
            ) : subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => renderPlanCard(plan, index, false))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2.5 }}>
                  <CreditCardIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: '0.9rem' }}>
                    No subscription plans available
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Add-on Plans Section */}
        {!plansLoading && addOnPlans.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
                <AddIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem', color: 'text.primary' }}>
                Add-on Plans
              </Typography>
            </Box>

            <Grid container spacing={2.5} alignItems="stretch">
              {addOnPlans.map((plan, index) => renderPlanCard(plan, index, true))}
            </Grid>
          </Box>
        )}

        {/* Coupon Popup */}
        <CouponPopup
          open={couponPopupOpen}
          onClose={() => {
            setCouponPopupOpen(false);
            setSelectedPlanForCoupon(null);
          }}
          onApplyCoupon={handleApplyCoupon}
          planPrice={selectedPlanForCoupon?.price || 0}
          planName={selectedPlanForCoupon?.name || ''}
        />

        {/* Custom Plan Popup */}
        <CustomPlanPopup
          open={customPlanPopupOpen}
          onClose={handleCloseCustomPlanPopup}
          onSubmit={handleCreateCustomPlan}
          planData={customPlanData}
          setPlanData={setCustomPlanData}
          errors={customPlanErrors}
          isCreating={isCreatingCustomPlan}
          isEditing={isEditingCustomPlan}
        />

        {/* Payment History Dialog */}
        <PaymentHistoryDialog
          open={historyDialogOpen}
          onClose={() => setHistoryDialogOpen(false)}
          paymentHistory={paymentHistory}
          loading={historyLoading}
        />
      </Container>
    </Box>
  );
};

export default PaymentPlans;