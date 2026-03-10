////////////////////////////// Change Color Theam/////////////////////////////////////
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
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPlans } from "../../redux/slices/planSlice";
// import {
//   createPaymentOrder,
//   verifyPayment,
//   getPaymentHistory,
//   clearPaymentState,
//   clearOrderData,
//   createAddOnOrder,
//   verifyAddOnPayment,
// } from "../../redux/slices/paymentSlice";
// import Loader from "../../components/common/Loader";
// import { RAZORPAY_KEY_ID } from "../../utils/constants";
// import { getUserById } from "../../redux/slices/userSlice";
// import moment from "moment";
// import { toast } from "react-toastify";

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
//           borderRadius: 3,
//           border: '1px solid',
//           borderColor: alpha('#2563EB', 0.1),
//         }}
//       >
//         {/* Header Skeleton */}
//         <Box
//           sx={{
//             background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//             py: 2.5,
//             px: 3,
//             borderTopLeftRadius: 12,
//             borderTopRightRadius: 12,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//             <Box>
//               <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//               <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//             </Box>
//           </Box>
//           <Skeleton variant="rounded" width={60} height={24} sx={{ bgcolor: alpha('#ffffff', 0.2), borderRadius: 3 }} />
//         </Box>

//         <CardContent sx={{ p: 3, flexGrow: 1 }}>
//           {/* Description Skeleton */}
//           <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1, bgcolor: alpha('#2563EB', 0.1) }} />
//           <Skeleton variant="text" width="60%" height={20} sx={{ mb: 3, bgcolor: alpha('#2563EB', 0.1) }} />

//           {/* Price Skeleton */}
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <Skeleton variant="text" width={100} height={48} sx={{ mx: 'auto', mb: 1, bgcolor: alpha('#2563EB', 0.2) }} />
//             <Skeleton variant="text" width={80} height={16} sx={{ mx: 'auto', bgcolor: alpha('#2563EB', 0.1) }} />
//           </Box>

//           {/* User Limits Skeleton */}
//           <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1, bgcolor: alpha('#2563EB', 0.1) }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha('#2563EB', 0.2) }} />
//                 <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha('#2563EB', 0.2) }} />
//               </Box>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1, bgcolor: alpha('#2563EB', 0.1) }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha('#2563EB', 0.2) }} />
//                 <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha('#2563EB', 0.2) }} />
//               </Box>
//             </Box>
//           </Stack>
//         </CardContent>

//         <CardActions sx={{ p: 3, pt: 0 }}>
//           <Skeleton variant="rounded" width="100%" height={48} sx={{ borderRadius: 2, bgcolor: alpha('#2563EB', 0.1) }} />
//         </CardActions>
//       </Card>
//     </Grid>
//   );
// };

// // Header Alert Skeleton
// const HeaderAlertSkeleton = () => {
//   return (
//     <Alert
//       severity="info"
//       sx={{ mb: 4, borderRadius: 2, border: '1px solid', borderColor: alpha('#2563EB', 0.1) }}
//     >
//       <AlertTitle sx={{ fontWeight: 600 }}>
//         <Skeleton variant="text" width={200} height={24} sx={{ bgcolor: alpha('#2563EB', 0.1) }} />
//       </AlertTitle>
//       <Typography variant="body2">
//         <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: alpha('#2563EB', 0.1) }} />
//         <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: alpha('#2563EB', 0.1) }} />
//       </Typography>
//     </Alert>
//   );
// };

// // Section Header Skeleton
// const SectionHeaderSkeleton = () => {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//       <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha('#2563EB', 0.2) }} />
//       <Skeleton variant="text" width={200} height={32} sx={{ bgcolor: alpha('#2563EB', 0.2) }} />
//     </Box>
//   );
// };

// const PaymentPlans = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { plansList, loading: plansLoading } = useSelector((state) => state.plan || {});
//   const {
//     orderLoading,
//     orderError,
//     orderData,
//     paymentStatus,
//   } = useSelector((state) => state.payment || {});
//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
//   const authUser = useSelector((state) => state.auth?.user || {});

//   const [paymentSuccess, setPaymentSuccess] = useState(null);
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
//   const [currentPlanDetails, setCurrentPlanDetails] = useState(null);
//   const [processingPlanId, setProcessingPlanId] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       setLoading(true);
//       try {
//         await dispatch(getAllPlans()).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       } finally {
//         // Show skeleton for 1 second minimum for better UX
//         setTimeout(() => {
//           setLoading(false);
//           setShowFirstRenderLoader(false);
//         }, 1000);
//       }
//     };
//     fetchPlans();
//   }, [dispatch]);

//   useEffect(() => {
//     if (userData?._id) {
//       dispatch(getUserById(userData._id));
//     }
//   }, [dispatch, userData?._id]);

//   // Check if user has active subscription and set current plan details
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

//   // Separate plans into subscriptions and add-ons
//   const subscriptionPlans = plansList?.filter(
//     (plan) => !plan.name?.includes("Add on Plan") && plan.status === "active"
//   ) || [];

//   const addOnPlans = plansList?.filter(
//     (plan) => plan.name?.includes("Add on Plan") && plan.status === "active"
//   ) || [];

//   const handleSubscriptionPayment = async (planId) => {
//     setProcessingPlanId(planId);

//     if (hasActiveSubscription && subscriptionExpiry && moment(subscriptionExpiry).isAfter(moment())) {
//       toast.warning("You already have an active subscription. You can only purchase add-on plans.");
//       return;
//     }

//     try {
//       dispatch(clearPaymentState());
//       setPaymentSuccess(null);

//       if (!isAuthenticated || !authUser) {
//         toast.error("User not authenticated. Please login again.");
//         return;
//       }

//       const adminId = authUser._id || authUser.id || userData?._id;

//       if (!adminId) {
//         toast.error("User ID not found. Please login again.");
//         return;
//       }

//       if (!window.Razorpay) {
//         toast.error("Payment gateway not loaded. Please refresh the page and try again.");
//         return;
//       }

//       const orderResult = await dispatch(
//         createPaymentOrder({ adminId, planId })
//       );

//       if (createPaymentOrder.rejected.match(orderResult)) {
//         toast.error(orderResult.error?.message || "Failed to create order");
//         return;
//       }

//       const orderData = orderResult.payload?.data;

//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Team Trackify",
//         description: `Payment for ${orderData.receipt || "Subscription"}`,
//         order_id: orderData.orderId,
//         handler: async function (response) {
//           try {
//             const verifyResult = await dispatch(
//               verifyPayment({
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//                 paymentId: orderData.paymentId,
//               })
//             );

//             if (verifyPayment.fulfilled.match(verifyResult)) {
//               setPaymentSuccess("Payment successful! Your subscription has been activated.");
//               toast.success("Payment successful! Your subscription has been activated.");
//               dispatch(clearOrderData());
//               dispatch(getUserById(adminId));
//               await dispatch(getPaymentHistory({ adminId }));
//             } else {
//               toast.error("Payment verification failed. Please contact support.");
//             }
//           } catch (verifyError) {
//             console.error("Payment verification error:", verifyError);
//             toast.error("Payment verification failed. Please contact support.");
//           }
//         },
//         prefill: {
//           name: authUser.name || userData?.name || "",
//           email: authUser.email || userData?.email || "",
//           contact: authUser.phone || userData?.phone || "",
//         },
//         theme: {
//           color: "#2563EB",
//         },
//         modal: {
//           ondismiss: function () {
//             dispatch(clearOrderData());
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Payment failed: " + error.message);
//     } finally {
//       setProcessingPlanId(null);
//     }
//   };

//   const handleUpgradePlan = async (addOnPlanId) => {
//     setProcessingPlanId(addOnPlanId);
//     try {
//       if (!authUser) {
//         toast.error("User not authenticated. Please login.");
//         return;
//       }

//       if (!hasActiveSubscription || !currentPlanDetails) {
//         toast.warning("You need an active subscription to purchase add-on plans.");
//         return;
//       }

//       const adminId = authUser._id || authUser.id || userData?._id;
//       const paymentId = currentPlanDetails._id;

//       dispatch(clearPaymentState());
//       setPaymentSuccess(null);

//       const orderResult = await dispatch(
//         createAddOnOrder({ adminId, addOnPlanId, paymentId })
//       );

//       if (createAddOnOrder.rejected.match(orderResult)) {
//         toast.error("Failed to create order");
//         return;
//       }

//       const orderData = orderResult.payload?.data;

//       const razorpayOptions = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         order_id: orderData.orderId,
//         name: "Team Trackify",
//         description: `Payment for Add-on Plan`,
//         handler: async (response) => {
//           const verifyResult = await dispatch(
//             verifyAddOnPayment({
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//               paymentId: orderData.paymentId,
//             })
//           );

//           if (verifyAddOnPayment.fulfilled.match(verifyResult)) {
//             setPaymentSuccess("Payment successful! Your plan has been upgraded.");
//             toast.success("Payment successful! Your plan has been upgraded.");
//             dispatch(clearOrderData());
//             dispatch(getUserById(adminId));
//             await dispatch(getPaymentHistory({ adminId }));
//           } else {
//             toast.error("Payment verification failed");
//           }
//         },
//         prefill: {
//           name: authUser.name || userData?.name || "",
//           email: authUser.email || userData?.email || "",
//           contact: authUser.phone || userData?.phone || "",
//         },
//         theme: {
//           color: "#2563EB",
//         },
//         modal: {
//           ondismiss: function () {
//             dispatch(clearOrderData());
//           },
//         },
//       };

//       const razorpayInstance = new window.Razorpay(razorpayOptions);
//       razorpayInstance.open();
//     } catch (error) {
//       console.error("Error in upgrading plan:", error);
//       toast.error("An error occurred while upgrading your plan.");
//     } finally {
//       setProcessingPlanId(null);
//     }
//   };

//   const renderPlanCard = (plan, index, isAddOn = false) => {
//     const isCurrentPlan = currentPlanDetails?.planId === plan._id;
//     const isDisabled = !isAddOn && hasActiveSubscription && !isCurrentPlan;
//     const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());
//     const isRecommended = plan.name === "Enterprise Plan" && !isAddOn;

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
//               borderRadius: 3,
//               border: '1px solid',
//               borderColor: isRecommended ? '#2563EB' : (isCurrentPlan ? '#2563EB' : alpha('#e2e8f0', 0.5)),
//               boxShadow: isRecommended
//                 ? `0 10px 30px -10px ${alpha('#2563EB', 0.5)}`
//                 : isCurrentPlan
//                   ? `0 10px 30px -10px ${alpha('#2563EB', 0.5)}`
//                   : '0 4px 6px rgba(0,0,0,0.03)',
//               transition: 'all 0.3s ease',
//               opacity: isDisabled ? 0.7 : 1,
//               cursor: isDisabled ? 'not-allowed' : 'pointer',
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               '&:hover': !isDisabled ? {
//                 transform: 'translateY(-8px)',
//                 boxShadow: isRecommended
//                   ? `0 30px 50px -20px ${alpha('#2563EB', 0.6)}`
//                   : `0 20px 40px -10px ${alpha('#2563EB', 0.4)}`,
//                 borderColor: '#2563EB',
//               } : {},
//             }}
//           >
//             {/* Recommended Label - Exactly like the image */}
//             {isRecommended && (
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 20,
//                   left: -30,
//                   zIndex: 10,
//                   background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//                   color: 'white',
//                   fontWeight: 600,
//                   fontSize: '0.65rem',
//                   py: 0.5,
//                   px: 3,
//                   transform: 'rotate(-45deg)',
//                   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                   textTransform: 'capitalize',
//                   letterSpacing: '0.3px',
//                   width: '120px',
//                   textAlign: 'center',
//                 }}
//               >
//                 Recommended
//               </Box>
//             )}

//             {/* Header */}
//             <CardHeader
//               sx={{
//                 background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//                 color: 'white',
//                 py: 2.5,
//                 px: 3,
//                 borderTopLeftRadius: 12,
//                 borderTopRightRadius: 12,
//               }}
//               avatar={
//                 <Avatar sx={{
//                   bgcolor: alpha('#ffffff', 0.2),
//                   color: 'white',
//                 }}>
//                   {isAddOn ? <AddIcon /> : <CreditCardIcon />}
//                 </Avatar>
//               }
//               title={
//                 <Typography variant="h6" fontWeight={600} color="white">
//                   {plan.name}
//                 </Typography>
//               }
//               subheader={
//                 <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9) }}>
//                   {isAddOn ? "Add-on Plan" : `Plan #${index + 1}`}
//                 </Typography>
//               }
//               action={
//                 <Chip
//                   label={plan.duration}
//                   size="small"
//                   sx={{
//                     bgcolor: 'white',
//                     color: '#2563EB',
//                     fontWeight: 600,
//                     fontSize: '0.7rem',
//                     height: 24,
//                   }}
//                 />
//               }
//             />

//             <CardContent sx={{ p: 3, flexGrow: 1 }}>
//               {/* Description */}
//               <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                 {plan.description}
//               </Typography>

//               {/* Price */}
//               <Box sx={{ textAlign: 'center', mb: 3 }}>
//                 <Typography
//                   variant="h3"
//                   fontWeight={700}
//                   sx={{
//                     color: '#2563EB',
//                   }}
//                 >
//                   {plan.price}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   per {plan.duration}
//                 </Typography>
//               </Box>

//               {/* User Limits */}
//               <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
//                 <Box sx={{
//                   flex: 1,
//                   p: 1.5,
//                   bgcolor: alpha('#2563EB', 0.05),
//                   borderRadius: 2,
//                 }}>
//                   <Typography variant="caption" color="text.secondary" display="block">
//                     Min Users
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <PeopleIcon sx={{ color: '#2563EB', fontSize: 16 }} />
//                     <Typography variant="body2" fontWeight={600} sx={{ color: '#1e293b' }}>
//                       {plan.minUsers}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Box sx={{
//                   flex: 1,
//                   p: 1.5,
//                   bgcolor: alpha('#2563EB', 0.05),
//                   borderRadius: 2,
//                 }}>
//                   <Typography variant="caption" color="text.secondary" display="block">
//                     Max Users
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <PeopleIcon sx={{ color: '#2563EB', fontSize: 16 }} />
//                     <Typography variant="body2" fontWeight={600} sx={{ color: '#1e293b' }}>
//                       {plan.maxUsers}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Stack>
//             </CardContent>

//             <CardActions sx={{ p: 3, pt: 0 }}>
//               {!isAddOn && hasActiveSubscription ? (
//                 isCurrentPlan ? (
//                   <Button
//                     fullWidth
//                     variant={isExpired ? "outlined" : "contained"}
//                     color={isExpired ? "warning" : "success"}
//                     disabled={!isExpired}
//                     startIcon={<CheckCircleIcon />}
//                     sx={{
//                       py: 1.5,
//                       borderRadius: 2,
//                       bgcolor: isExpired ? 'transparent' : '#22c55e',
//                       color: isExpired ? '#f59e0b' : 'white',
//                       borderColor: isExpired ? '#f59e0b' : 'transparent',
//                       '&:hover': isExpired ? {
//                         borderColor: '#d97706',
//                         bgcolor: alpha('#f59e0b', 0.1),
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
//                     startIcon={<CreditCardIcon />}
//                     sx={{
//                       py: 1.5,
//                       borderRadius: 2,
//                       borderColor: '#e2e8f0',
//                       color: '#94a3b8',
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
//                     isAddOn ? handleUpgradePlan(plan._id) : handleSubscriptionPayment(plan._id);
//                   }}
//                   disabled={orderLoading || processingPlanId === plan._id || isDisabled}
//                   startIcon={
//                     processingPlanId === plan._id ? (
//                       <CircularProgress size={16} sx={{ color: 'white' }} />
//                     ) : isAddOn ? (
//                       <ArrowUpIcon />
//                     ) : (
//                       <CreditCardIcon />
//                     )
//                   }
//                   sx={{
//                     py: 1.5,
//                     borderRadius: 2,
//                     background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//                     '&:hover': {
//                       background: 'linear-gradient(135deg, #1E40AF, #2563EB)',
//                     },
//                     '&.Mui-disabled': {
//                       background: alpha('#2563EB', 0.3),
//                     },
//                   }}
//                 >
//                   Subscribe Now
//                 </Button>
//               )}
//             </CardActions>
//           </Card>
//         </motion.div>
//       </Grid>
//     );
//   };

//   const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

//   // If first render loader is active, show skeletons for everything except title
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 4 }}>
//         <Container maxWidth="xl">
//           {/* Header - Title only (no loading) */}
//           <Box sx={{ mb: 4 }}>
//             <Typography
//               variant="h5"
//               fontWeight={800}
//               gutterBottom
//               sx={{
//                 background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//               }}
//             >
//               Payment Plans
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Choose the perfect plan for your team
//             </Typography>
//           </Box>

//           {/* Header Alert Skeleton */}
//           <HeaderAlertSkeleton />

//           {/* Subscription Plans Section Skeleton */}
//           <Box sx={{ mb: 6 }}>
//             <SectionHeaderSkeleton />
//             <Grid container spacing={3} alignItems="stretch">
//               <PlanCardSkeleton />
//               <PlanCardSkeleton />
//               <PlanCardSkeleton />
//             </Grid>
//           </Box>

//           {/* Add-on Plans Section Skeleton */}
//           <Box>
//             <SectionHeaderSkeleton />
//             <Grid container spacing={3} alignItems="stretch">
//               <PlanCardSkeleton />
//             </Grid>
//           </Box>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 4 }}>
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box sx={{ mb: 4 }}>
//           <Typography
//             variant="h5"
//             fontWeight={800}
//             gutterBottom
//             sx={{
//               background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//             }}
//           >
//             Payment Plans
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Choose the perfect plan for your team
//           </Typography>
//         </Box>

//         {/* Payment Status Alerts */}
//         <AnimatePresence>
//           {paymentSuccess && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <Alert
//                 severity="success"
//                 onClose={() => setPaymentSuccess(null)}
//                 sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: alpha('#2563EB', 0.1) }}
//               >
//                 <AlertTitle sx={{ color: '#2563EB' }}>Payment Successful!</AlertTitle>
//                 {paymentSuccess}
//               </Alert>
//             </motion.div>
//           )}

//           {orderError && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <Alert
//                 severity="error"
//                 onClose={() => dispatch(clearPaymentState())}
//                 sx={{ mb: 3, borderRadius: 2 }}
//               >
//                 <AlertTitle>Payment Error</AlertTitle>
//                 {orderError}
//               </Alert>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Active Subscription Notice */}
//         {(hasActiveSubscription || isExpired) && (
//           <Alert
//             severity={isExpired ? "warning" : "info"}
//             icon={isExpired ? <WarningIcon /> : <InfoIcon />}
//             sx={{ 
//               mb: 4, 
//               borderRadius: 2,
//               border: '1px solid',
//               borderColor: isExpired ? alpha('#f59e0b', 0.2) : alpha('#2563EB', 0.2),
//             }}
//           >
//             <AlertTitle sx={{ fontWeight: 600, color: isExpired ? '#f59e0b' : '#2563EB' }}>
//               {isExpired ? "Subscription Expired" : "Active Subscription"}
//             </AlertTitle>
//             <Typography variant="body2">
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

//         {/* Subscription Plans Section */}
//         <Box sx={{ mb: 6 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//             <Avatar sx={{ bgcolor: alpha('#2563EB', 0.1), color: '#2563EB', width: 40, height: 40 }}>
//               <CreditCardIcon />
//             </Avatar>
//             <Typography variant="h5" fontWeight={600} sx={{ color: '#1e293b' }}>
//               Subscription Plans
//             </Typography>
//           </Box>

//           <Grid container spacing={3} alignItems="stretch">
//             {loading ? (
//               // Show 3 skeleton cards while loading
//               <>
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//               </>
//             ) : subscriptionPlans.length > 0 ? (
//               subscriptionPlans.map((plan, index) => renderPlanCard(plan, index, false))
//             ) : (
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid', borderColor: alpha('#2563EB', 0.1) }}>
//                   <CreditCardIcon sx={{ fontSize: 48, color: alpha('#2563EB', 0.3), mb: 2 }} />
//                   <Typography variant="h6" color="text.secondary" gutterBottom>
//                     No subscription plans available
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     No subscription plans are currently available.
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </Box>

//         {/* Add-on Plans Section */}
//         {!loading && addOnPlans.length > 0 && (
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//               <Avatar sx={{ bgcolor: alpha('#2563EB', 0.1), color: '#2563EB', width: 40, height: 40 }}>
//                 <AddIcon />
//               </Avatar>
//               <Typography variant="h5" fontWeight={600} sx={{ color: '#1e293b' }}>
//                 Add-on Plans
//               </Typography>
//             </Box>

//             <Grid container spacing={3} alignItems="stretch">
//               {addOnPlans.map((plan, index) => renderPlanCard(plan, index, true))}
//             </Grid>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default PaymentPlans;
























//////////////////////////////    Centralised Color     ///////////////////////////////
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
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllPlans } from "../../redux/slices/planSlice";
// import {
//   createPaymentOrder,
//   verifyPayment,
//   getPaymentHistory,
//   clearPaymentState,
//   clearOrderData,
//   createAddOnOrder,
//   verifyAddOnPayment,
// } from "../../redux/slices/paymentSlice";
// import Loader from "../../components/common/Loader";
// import { RAZORPAY_KEY_ID } from "../../utils/constants";
// import { getUserById } from "../../redux/slices/userSlice";
// import moment from "moment";
// import { toast } from "react-toastify";

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
//           borderRadius: 3,
//           border: '1px solid',
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//         }}
//       >
//         {/* Header Skeleton */}
//         <Box
//           sx={{
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             py: 2.5,
//             px: 3,
//             borderTopLeftRadius: 12,
//             borderTopRightRadius: 12,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//             <Box>
//               <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//               <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha('#ffffff', 0.2) }} />
//             </Box>
//           </Box>
//           <Skeleton variant="rounded" width={60} height={24} sx={{ bgcolor: alpha('#ffffff', 0.2), borderRadius: 3 }} />
//         </Box>

//         <CardContent sx={{ p: 3, flexGrow: 1 }}>
//           {/* Description Skeleton */}
//           <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width="60%" height={20} sx={{ mb: 3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />

//           {/* Price Skeleton */}
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <Skeleton variant="text" width={100} height={48} sx={{ mx: 'auto', mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="text" width={80} height={16} sx={{ mx: 'auto', bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>

//           {/* User Limits Skeleton */}
//           <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </Box>
//             </Box>
//             <Box sx={{ flex: 1 }}>
//               <Skeleton variant="text" width="60%" height={16} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 <Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </Box>
//             </Box>
//           </Stack>
//         </CardContent>

//         <CardActions sx={{ p: 3, pt: 0 }}>
//           <Skeleton variant="rounded" width="100%" height={48} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </CardActions>
//       </Card>
//     </Grid>
//   );
// };

// // Header Alert Skeleton
// const HeaderAlertSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Alert
//       severity="info"
//       sx={{ mb: 4, borderRadius: 2, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}
//     >
//       <AlertTitle sx={{ fontWeight: 600 }}>
//         <Skeleton variant="text" width={200} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </AlertTitle>
//       <Typography variant="body2">
//         <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       </Typography>
//     </Alert>
//   );
// };

// // Section Header Skeleton
// const SectionHeaderSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//       <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       <Skeleton variant="text" width={200} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//     </Box>
//   );
// };

// const PaymentPlans = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { plansList, loading: plansLoading } = useSelector((state) => state.plan || {});
//   const {
//     orderLoading,
//     orderError,
//     orderData,
//     paymentStatus,
//   } = useSelector((state) => state.payment || {});
//   const userData = useSelector((state) => state.user?.userInfo || {});
//   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
//   const authUser = useSelector((state) => state.auth?.user || {});

//   const [paymentSuccess, setPaymentSuccess] = useState(null);
//   const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
//   const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
//   const [currentPlanDetails, setCurrentPlanDetails] = useState(null);
//   const [processingPlanId, setProcessingPlanId] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       setLoading(true);
//       try {
//         await dispatch(getAllPlans()).unwrap();
//       } catch (error) {
//         console.error('Failed to fetch plans:', error);
//       } finally {
//         // Show skeleton for 1 second minimum for better UX
//         setTimeout(() => {
//           setLoading(false);
//           setShowFirstRenderLoader(false);
//         }, 1000);
//       }
//     };
//     fetchPlans();
//   }, [dispatch]);

//   useEffect(() => {
//     if (userData?._id) {
//       dispatch(getUserById(userData._id));
//     }
//   }, [dispatch, userData?._id]);

//   // Check if user has active subscription and set current plan details
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

//   // Separate plans into subscriptions and add-ons
//   const subscriptionPlans = plansList?.filter(
//     (plan) => !plan.name?.includes("Add on Plan") && plan.status === "active"
//   ) || [];

//   const addOnPlans = plansList?.filter(
//     (plan) => plan.name?.includes("Add on Plan") && plan.status === "active"
//   ) || [];

//   const handleSubscriptionPayment = async (planId) => {
//     setProcessingPlanId(planId);

//     if (hasActiveSubscription && subscriptionExpiry && moment(subscriptionExpiry).isAfter(moment())) {
//       toast.warning("You already have an active subscription. You can only purchase add-on plans.");
//       return;
//     }

//     try {
//       dispatch(clearPaymentState());
//       setPaymentSuccess(null);

//       if (!isAuthenticated || !authUser) {
//         toast.error("User not authenticated. Please login again.");
//         return;
//       }

//       const adminId = authUser._id || authUser.id || userData?._id;

//       if (!adminId) {
//         toast.error("User ID not found. Please login again.");
//         return;
//       }

//       if (!window.Razorpay) {
//         toast.error("Payment gateway not loaded. Please refresh the page and try again.");
//         return;
//       }

//       const orderResult = await dispatch(
//         createPaymentOrder({ adminId, planId })
//       );

//       if (createPaymentOrder.rejected.match(orderResult)) {
//         toast.error(orderResult.error?.message || "Failed to create order");
//         return;
//       }

//       const orderData = orderResult.payload?.data;

//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Team Trackify",
//         description: `Payment for ${orderData.receipt || "Subscription"}`,
//         order_id: orderData.orderId,
//         handler: async function (response) {
//           try {
//             const verifyResult = await dispatch(
//               verifyPayment({
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//                 paymentId: orderData.paymentId,
//               })
//             );

//             if (verifyPayment.fulfilled.match(verifyResult)) {
//               setPaymentSuccess("Payment successful! Your subscription has been activated.");
//               toast.success("Payment successful! Your subscription has been activated.");
//               dispatch(clearOrderData());
//               dispatch(getUserById(adminId));
//               await dispatch(getPaymentHistory({ adminId }));
//             } else {
//               toast.error("Payment verification failed. Please contact support.");
//             }
//           } catch (verifyError) {
//             console.error("Payment verification error:", verifyError);
//             toast.error("Payment verification failed. Please contact support.");
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
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error("Payment failed: " + error.message);
//     } finally {
//       setProcessingPlanId(null);
//     }
//   };

//   const handleUpgradePlan = async (addOnPlanId) => {
//     setProcessingPlanId(addOnPlanId);
//     try {
//       if (!authUser) {
//         toast.error("User not authenticated. Please login.");
//         return;
//       }

//       if (!hasActiveSubscription || !currentPlanDetails) {
//         toast.warning("You need an active subscription to purchase add-on plans.");
//         return;
//       }

//       const adminId = authUser._id || authUser.id || userData?._id;
//       const paymentId = currentPlanDetails._id;

//       dispatch(clearPaymentState());
//       setPaymentSuccess(null);

//       const orderResult = await dispatch(
//         createAddOnOrder({ adminId, addOnPlanId, paymentId })
//       );

//       if (createAddOnOrder.rejected.match(orderResult)) {
//         toast.error("Failed to create order");
//         return;
//       }

//       const orderData = orderResult.payload?.data;

//       const razorpayOptions = {
//         key: RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         order_id: orderData.orderId,
//         name: "Team Trackify",
//         description: `Payment for Add-on Plan`,
//         handler: async (response) => {
//           const verifyResult = await dispatch(
//             verifyAddOnPayment({
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//               paymentId: orderData.paymentId,
//             })
//           );

//           if (verifyAddOnPayment.fulfilled.match(verifyResult)) {
//             setPaymentSuccess("Payment successful! Your plan has been upgraded.");
//             toast.success("Payment successful! Your plan has been upgraded.");
//             dispatch(clearOrderData());
//             dispatch(getUserById(adminId));
//             await dispatch(getPaymentHistory({ adminId }));
//           } else {
//             toast.error("Payment verification failed");
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
//           },
//         },
//       };

//       const razorpayInstance = new window.Razorpay(razorpayOptions);
//       razorpayInstance.open();
//     } catch (error) {
//       console.error("Error in upgrading plan:", error);
//       toast.error("An error occurred while upgrading your plan.");
//     } finally {
//       setProcessingPlanId(null);
//     }
//   };

//   const renderPlanCard = (plan, index, isAddOn = false) => {
//     const isCurrentPlan = currentPlanDetails?.planId === plan._id;
//     const isDisabled = !isAddOn && hasActiveSubscription && !isCurrentPlan;
//     const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());
//     const isRecommended = plan.name === "Enterprise Plan" && !isAddOn;

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
//               borderRadius: 3,
//               border: '1px solid',
//               borderColor: isRecommended ? theme.palette.primary.main : (isCurrentPlan ? theme.palette.primary.main : alpha(theme.palette.divider, 0.5)),
//               boxShadow: isRecommended
//                 ? `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.5)}`
//                 : isCurrentPlan
//                   ? `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.5)}`
//                   : '0 4px 6px rgba(0,0,0,0.03)',
//               transition: 'all 0.3s ease',
//               opacity: isDisabled ? 0.7 : 1,
//               cursor: isDisabled ? 'not-allowed' : 'pointer',
//               height: '100%',
//               display: 'flex',
//               flexDirection: 'column',
//               '&:hover': !isDisabled ? {
//                 transform: 'translateY(-8px)',
//                 boxShadow: isRecommended
//                   ? `0 30px 50px -20px ${alpha(theme.palette.primary.main, 0.6)}`
//                   : `0 20px 40px -10px ${alpha(theme.palette.primary.main, 0.4)}`,
//                 borderColor: theme.palette.primary.main,
//               } : {},
//             }}
//           >
//             {/* Recommended Label - Exactly like the image */}
//             {isRecommended && (
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 20,
//                   left: -30,
//                   zIndex: 10,
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   color: 'white',
//                   fontWeight: 600,
//                   fontSize: '0.65rem',
//                   py: 0.5,
//                   px: 3,
//                   transform: 'rotate(-45deg)',
//                   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                   textTransform: 'capitalize',
//                   letterSpacing: '0.3px',
//                   width: '120px',
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
//                 py: 2.5,
//                 px: 3,
//                 borderTopLeftRadius: 12,
//                 borderTopRightRadius: 12,
//               }}
//               avatar={
//                 <Avatar sx={{
//                   bgcolor: alpha('#ffffff', 0.2),
//                   color: 'white',
//                 }}>
//                   {isAddOn ? <AddIcon /> : <CreditCardIcon />}
//                 </Avatar>
//               }
//               title={
//                 <Typography variant="h6" fontWeight={600} color="white">
//                   {plan.name}
//                 </Typography>
//               }
//               subheader={
//                 <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9) }}>
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
//                     fontSize: '0.7rem',
//                     height: 24,
//                   }}
//                 />
//               }
//             />

//             <CardContent sx={{ p: 3, flexGrow: 1 }}>
//               {/* Description */}
//               <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                 {plan.description}
//               </Typography>

//               {/* Price */}
//               <Box sx={{ textAlign: 'center', mb: 3 }}>
//                 <Typography
//                   variant="h3"
//                   fontWeight={700}
//                   sx={{
//                     color: theme.palette.primary.main,
//                   }}
//                 >
//                   {plan.price}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   per {plan.duration}
//                 </Typography>
//               </Box>

//               {/* User Limits */}
//               <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
//                 <Box sx={{
//                   flex: 1,
//                   p: 1.5,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   borderRadius: 2,
//                 }}>
//                   <Typography variant="caption" color="text.secondary" display="block">
//                     Min Users
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                     <Typography variant="body2" fontWeight={600} sx={{ color: 'text.primary' }}>
//                       {plan.minUsers}
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Box sx={{
//                   flex: 1,
//                   p: 1.5,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   borderRadius: 2,
//                 }}>
//                   <Typography variant="caption" color="text.secondary" display="block">
//                     Max Users
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                     <Typography variant="body2" fontWeight={600} sx={{ color: 'text.primary' }}>
//                       {plan.maxUsers}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Stack>
//             </CardContent>

//             <CardActions sx={{ p: 3, pt: 0 }}>
//               {!isAddOn && hasActiveSubscription ? (
//                 isCurrentPlan ? (
//                   <Button
//                     fullWidth
//                     variant={isExpired ? "outlined" : "contained"}
//                     color={isExpired ? "warning" : "success"}
//                     disabled={!isExpired}
//                     startIcon={<CheckCircleIcon />}
//                     sx={{
//                       py: 1.5,
//                       borderRadius: 2,
//                       bgcolor: isExpired ? 'transparent' : '#22c55e',
//                       color: isExpired ? theme.palette.secondary.main : 'white',
//                       borderColor: isExpired ? theme.palette.secondary.main : 'transparent',
//                       '&:hover': isExpired ? {
//                         borderColor: theme.palette.secondary.dark,
//                         bgcolor: alpha(theme.palette.secondary.main, 0.1),
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
//                     startIcon={<CreditCardIcon />}
//                     sx={{
//                       py: 1.5,
//                       borderRadius: 2,
//                       borderColor: alpha(theme.palette.divider, 0.5),
//                       color: 'text.disabled',
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
//                     isAddOn ? handleUpgradePlan(plan._id) : handleSubscriptionPayment(plan._id);
//                   }}
//                   disabled={orderLoading || processingPlanId === plan._id || isDisabled}
//                   startIcon={
//                     processingPlanId === plan._id ? (
//                       <CircularProgress size={16} sx={{ color: 'white' }} />
//                     ) : isAddOn ? (
//                       <ArrowUpIcon />
//                     ) : (
//                       <CreditCardIcon />
//                     )
//                   }
//                   sx={{
//                     py: 1.5,
//                     borderRadius: 2,
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     '&:hover': {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                     '&.Mui-disabled': {
//                       background: alpha(theme.palette.primary.main, 0.3),
//                     },
//                   }}
//                 >
//                   Subscribe Now
//                 </Button>
//               )}
//             </CardActions>
//           </Card>
//         </motion.div>
//       </Grid>
//     );
//   };

//   const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

//   // If first render loader is active, show skeletons for everything except title
//   if (showFirstRenderLoader) {
//     return (
//       <Box sx={{ minHeight: '100vh', bgcolor: alpha(theme.palette.primary.main, 0.05), py: 4 }}>
//         <Container maxWidth="xl">
//           {/* Header - Title only (no loading) */}
//           <Box sx={{ mb: 4 }}>
//             <Typography
//               variant="h5"
//               fontWeight={800}
//               gutterBottom
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//               }}
//             >
//               Payment Plans
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Choose the perfect plan for your team
//             </Typography>
//           </Box>

//           {/* Header Alert Skeleton */}
//           <HeaderAlertSkeleton />

//           {/* Subscription Plans Section Skeleton */}
//           <Box sx={{ mb: 6 }}>
//             <SectionHeaderSkeleton />
//             <Grid container spacing={3} alignItems="stretch">
//               <PlanCardSkeleton />
//               <PlanCardSkeleton />
//               <PlanCardSkeleton />
//             </Grid>
//           </Box>

//           {/* Add-on Plans Section Skeleton */}
//           <Box>
//             <SectionHeaderSkeleton />
//             <Grid container spacing={3} alignItems="stretch">
//               <PlanCardSkeleton />
//             </Grid>
//           </Box>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ minHeight: '100vh', bgcolor: alpha(theme.palette.primary.main, 0.05), py: 4 }}>
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box sx={{ mb: 4 }}>
//           <Typography
//             variant="h5"
//             fontWeight={800}
//             gutterBottom
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//             }}
//           >
//             Payment Plans
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Choose the perfect plan for your team
//           </Typography>
//         </Box>

//         {/* Payment Status Alerts */}
//         <AnimatePresence>
//           {paymentSuccess && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <Alert
//                 severity="success"
//                 onClose={() => setPaymentSuccess(null)}
//                 sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}
//               >
//                 <AlertTitle sx={{ color: theme.palette.primary.main }}>Payment Successful!</AlertTitle>
//                 {paymentSuccess}
//               </Alert>
//             </motion.div>
//           )}

//           {orderError && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//             >
//               <Alert
//                 severity="error"
//                 onClose={() => dispatch(clearPaymentState())}
//                 sx={{ mb: 3, borderRadius: 2 }}
//               >
//                 <AlertTitle>Payment Error</AlertTitle>
//                 {orderError}
//               </Alert>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Active Subscription Notice */}
//         {(hasActiveSubscription || isExpired) && (
//           <Alert
//             severity={isExpired ? "warning" : "info"}
//             icon={isExpired ? <WarningIcon /> : <InfoIcon />}
//             sx={{ 
//               mb: 4, 
//               borderRadius: 2,
//               border: '1px solid',
//               borderColor: isExpired ? alpha(theme.palette.secondary.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
//             }}
//           >
//             <AlertTitle sx={{ fontWeight: 600, color: isExpired ? theme.palette.secondary.main : theme.palette.primary.main }}>
//               {isExpired ? "Subscription Expired" : "Active Subscription"}
//             </AlertTitle>
//             <Typography variant="body2">
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

//         {/* Subscription Plans Section */}
//         <Box sx={{ mb: 6 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//             <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 40, height: 40 }}>
//               <CreditCardIcon />
//             </Avatar>
//             <Typography variant="h5" fontWeight={600} sx={{ color: 'text.primary' }}>
//               Subscription Plans
//             </Typography>
//           </Box>

//           <Grid container spacing={3} alignItems="stretch">
//             {loading ? (
//               // Show 3 skeleton cards while loading
//               <>
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//                 <PlanCardSkeleton />
//               </>
//             ) : subscriptionPlans.length > 0 ? (
//               subscriptionPlans.map((plan, index) => renderPlanCard(plan, index, false))
//             ) : (
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//                   <CreditCardIcon sx={{ fontSize: 48, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
//                   <Typography variant="h6" color="text.secondary" gutterBottom>
//                     No subscription plans available
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     No subscription plans are currently available.
//                   </Typography>
//                 </Paper>
//               </Grid>
//             )}
//           </Grid>
//         </Box>

//         {/* Add-on Plans Section */}
//         {!loading && addOnPlans.length > 0 && (
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
//               <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 40, height: 40 }}>
//                 <AddIcon />
//               </Avatar>
//               <Typography variant="h5" fontWeight={600} sx={{ color: 'text.primary' }}>
//                 Add-on Plans
//               </Typography>
//             </Box>

//             <Grid container spacing={3} alignItems="stretch">
//               {addOnPlans.map((plan, index) => renderPlanCard(plan, index, true))}
//             </Grid>
//           </Box>
//         )}
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
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../redux/slices/planSlice";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentHistory,
  clearPaymentState,
  clearOrderData,
  createAddOnOrder,
  verifyAddOnPayment,
} from "../../redux/slices/paymentSlice";
import Loader from "../../components/common/Loader";
import { RAZORPAY_KEY_ID } from "../../utils/constants";
import { getUserById } from "../../redux/slices/userSlice";
import moment from "moment";
import { toast } from "react-toastify";

// Plan Card Skeleton Component - Smaller
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
        {/* Header Skeleton */}
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
          {/* Description Skeleton */}
          <Skeleton variant="text" width="90%" height={18} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width="60%" height={18} sx={{ mb: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />

          {/* Price Skeleton */}
          <Box sx={{ textAlign: 'center', mb: 2.5 }}>
            <Skeleton variant="text" width={90} height={40} sx={{ mx: 'auto', mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Skeleton variant="text" width={70} height={14} sx={{ mx: 'auto', bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          </Box>

          {/* User Limits Skeleton */}
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

// Header Alert Skeleton - Smaller
const HeaderAlertSkeleton = () => {
  const theme = useTheme();
  return (
    <Alert
      severity="info"
      sx={{ mb: 3, borderRadius: 1.5, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}
    >
      <AlertTitle sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
        <Skeleton variant="text" width={180} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </AlertTitle>
      <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
        <Skeleton variant="text" width="80%" height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        <Skeleton variant="text" width="60%" height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      </Typography>
    </Alert>
  );
};

// Section Header Skeleton - Smaller
const SectionHeaderSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
      <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      <Skeleton variant="text" width={180} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
    </Box>
  );
};

const PaymentPlans = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { plansList, loading: plansLoading } = useSelector((state) => state.plan || {});
  const {
    orderLoading,
    orderError,
    orderData,
    paymentStatus,
  } = useSelector((state) => state.payment || {});
  const userData = useSelector((state) => state.user?.userInfo || {});
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});

  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(null);
  const [currentPlanDetails, setCurrentPlanDetails] = useState(null);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        await dispatch(getAllPlans()).unwrap();
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      } finally {
        // Show skeleton for 1 second minimum for better UX
        setTimeout(() => {
          setLoading(false);
          setShowFirstRenderLoader(false);
        }, 1000);
      }
    };
    fetchPlans();
  }, [dispatch]);

  useEffect(() => {
    if (userData?._id) {
      dispatch(getUserById(userData._id));
    }
  }, [dispatch, userData?._id]);

  // Check if user has active subscription and set current plan details
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

  // Separate plans into subscriptions and add-ons
  const subscriptionPlans = plansList?.filter(
    (plan) => !plan.name?.includes("Add on Plan") && plan.status === "active"
  ) || [];

  const addOnPlans = plansList?.filter(
    (plan) => plan.name?.includes("Add on Plan") && plan.status === "active"
  ) || [];

  const handleSubscriptionPayment = async (planId) => {
    setProcessingPlanId(planId);

    if (hasActiveSubscription && subscriptionExpiry && moment(subscriptionExpiry).isAfter(moment())) {
      toast.warning("You already have an active subscription. You can only purchase add-on plans.");
      return;
    }

    try {
      dispatch(clearPaymentState());
      setPaymentSuccess(null);

      if (!isAuthenticated || !authUser) {
        toast.error("User not authenticated. Please login again.");
        return;
      }

      const adminId = authUser._id || authUser.id || userData?._id;

      if (!adminId) {
        toast.error("User ID not found. Please login again.");
        return;
      }

      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded. Please refresh the page and try again.");
        return;
      }

      const orderResult = await dispatch(
        createPaymentOrder({ adminId, planId })
      );

      if (createPaymentOrder.rejected.match(orderResult)) {
        toast.error(orderResult.error?.message || "Failed to create order");
        return;
      }

      const orderData = orderResult.payload?.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Team Trackify",
        description: `Payment for ${orderData.receipt || "Subscription"}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            const verifyResult = await dispatch(
              verifyPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                paymentId: orderData.paymentId,
              })
            );

            if (verifyPayment.fulfilled.match(verifyResult)) {
              setPaymentSuccess("Payment successful! Your subscription has been activated.");
              toast.success("Payment successful! Your subscription has been activated.");
              dispatch(clearOrderData());
              dispatch(getUserById(adminId));
              await dispatch(getPaymentHistory({ adminId }));
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (verifyError) {
            console.error("Payment verification error:", verifyError);
            toast.error("Payment verification failed. Please contact support.");
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
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed: " + error.message);
    } finally {
      setProcessingPlanId(null);
    }
  };

  const handleUpgradePlan = async (addOnPlanId) => {
    setProcessingPlanId(addOnPlanId);
    try {
      if (!authUser) {
        toast.error("User not authenticated. Please login.");
        return;
      }

      if (!hasActiveSubscription || !currentPlanDetails) {
        toast.warning("You need an active subscription to purchase add-on plans.");
        return;
      }

      const adminId = authUser._id || authUser.id || userData?._id;
      const paymentId = currentPlanDetails._id;

      dispatch(clearPaymentState());
      setPaymentSuccess(null);

      const orderResult = await dispatch(
        createAddOnOrder({ adminId, addOnPlanId, paymentId })
      );

      if (createAddOnOrder.rejected.match(orderResult)) {
        toast.error("Failed to create order");
        return;
      }

      const orderData = orderResult.payload?.data;

      const razorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: "Team Trackify",
        description: `Payment for Add-on Plan`,
        handler: async (response) => {
          const verifyResult = await dispatch(
            verifyAddOnPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentId: orderData.paymentId,
            })
          );

          if (verifyAddOnPayment.fulfilled.match(verifyResult)) {
            setPaymentSuccess("Payment successful! Your plan has been upgraded.");
            toast.success("Payment successful! Your plan has been upgraded.");
            dispatch(clearOrderData());
            dispatch(getUserById(adminId));
            await dispatch(getPaymentHistory({ adminId }));
          } else {
            toast.error("Payment verification failed");
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
          },
        },
      };

      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error in upgrading plan:", error);
      toast.error("An error occurred while upgrading your plan.");
    } finally {
      setProcessingPlanId(null);
    }
  };

  const renderPlanCard = (plan, index, isAddOn = false) => {
    const isCurrentPlan = currentPlanDetails?.planId === plan._id;
    const isDisabled = !isAddOn && hasActiveSubscription && !isCurrentPlan;
    const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());
    const isRecommended = plan.name === "Enterprise Plan" && !isAddOn;

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

              {/* Price */}
              <Box sx={{ textAlign: 'center', mb: 2.5 }}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: '1.5rem',
                  }}
                >
                  {plan.price}
                </Typography>
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
                }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.64rem' }}>
                    Min Users
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
                      {plan.minUsers}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{
                  flex: 1,
                  p: 1.2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 1.5,
                }}>
                  <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: '0.64rem' }}>
                    Max Users
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.7rem', color: 'text.primary' }}>
                      {plan.maxUsers}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
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
                      color: isExpired ? theme.palette.secondary.main : 'white',
                      borderColor: isExpired ? theme.palette.secondary.main : 'transparent',
                      fontSize: '0.7rem',
                      '&:hover': isExpired ? {
                        borderColor: theme.palette.secondary.dark,
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
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
                    isAddOn ? handleUpgradePlan(plan._id) : handleSubscriptionPayment(plan._id);
                  }}
                  disabled={orderLoading || processingPlanId === plan._id || isDisabled}
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
                  Subscribe Now
                </Button>
              )}
            </CardActions>
          </Card>
        </motion.div>
      </Grid>
    );
  };

  const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

  // If first render loader is active, show skeletons for everything except title
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: alpha(theme.palette.primary.main, 0.05), py: 3 }}>
        <Container maxWidth="xl">
          {/* Header - Title only */}
          <Box sx={{ mb: 3 }}>
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

          {/* Header Alert Skeleton */}
          <HeaderAlertSkeleton />

          {/* Subscription Plans Section Skeleton */}
          <Box sx={{ mb: 5 }}>
            <SectionHeaderSkeleton />
            <Grid container spacing={2.5} alignItems="stretch">
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </Grid>
          </Box>

          {/* Add-on Plans Section Skeleton */}
          <Box>
            <SectionHeaderSkeleton />
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
        {/* Header */}
        <Box sx={{ mb: 3 }}>
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

        {/* Payment Status Alerts */}
        <AnimatePresence>
          {paymentSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Alert
                severity="success"
                onClose={() => setPaymentSuccess(null)}
                sx={{ mb: 2.5, borderRadius: 1.5, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}
              >
                <AlertTitle sx={{ color: theme.palette.primary.main, fontSize: '0.85rem' }}>Payment Successful!</AlertTitle>
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{paymentSuccess}</Typography>
              </Alert>
            </motion.div>
          )}

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
                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>{orderError}</Typography>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Subscription Notice */}
        {(hasActiveSubscription || isExpired) && (
          <Alert
            severity={isExpired ? "warning" : "info"}
            icon={isExpired ? <WarningIcon sx={{ fontSize: 18 }} /> : <InfoIcon sx={{ fontSize: 18 }} />}
            sx={{ 
              mb: 3, 
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: isExpired ? alpha(theme.palette.secondary.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
            }}
          >
            <AlertTitle sx={{ fontWeight: 600, fontSize: '0.85rem', color: isExpired ? theme.palette.secondary.main : theme.palette.primary.main }}>
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
            {loading ? (
              <>
                <PlanCardSkeleton />
                <PlanCardSkeleton />
                <PlanCardSkeleton />
              </>
            ) : subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => renderPlanCard(plan, index, false))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2.5, border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
                  <CreditCardIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: '0.9rem' }}>
                    No subscription plans available
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    No subscription plans are currently available.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Add-on Plans Section */}
        {!loading && addOnPlans.length > 0 && (
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
      </Container>
    </Box>
  );
};

export default PaymentPlans;


















