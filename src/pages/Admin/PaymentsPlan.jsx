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

const PaymentPlans = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { plansList, loading } = useSelector((state) => state.plan || {});
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

  useEffect(() => {
    dispatch(getAllPlans());
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
          color: "#0f766e",
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
          color: "#0f766e",
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

    return (
      <Grid item xs={12} md={6} lg={4} key={plan._id}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card
            sx={{
              position: 'relative',
              borderRadius: 3,
              border: '1px solid',
              borderColor: isCurrentPlan ? '#0f766e' : alpha('#e2e8f0', 0.5),
              boxShadow: isCurrentPlan ? '0 10px 30px -10px #0f766e' : '0 4px 6px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease',
              opacity: isDisabled ? 0.7 : 1,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              '&:hover': !isDisabled ? {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px -10px rgba(15, 118, 110, 0.3)',
                borderColor: '#0f766e',
              } : {},
            }}
          >
            {/* Recommended Badge */}
            {plan.name === "Enterprise Plan" && !isAddOn && (
              <Chip
                label="RECOMMENDED"
                size="small"
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: 20,
                  bgcolor: '#22c55e',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  height: 24,
                  zIndex: 1,
                  boxShadow: '0 4px 10px -2px #22c55e',
                }}
              />
            )}

            {/* Header */}
            <CardHeader
              sx={{
                bgcolor: '#0f766e',
                color: 'white',
                py: 2.5,
                px: 3,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              avatar={
                <Avatar sx={{ bgcolor: alpha('#ffffff', 0.2), color: 'white' }}>
                  {isAddOn ? <AddIcon /> : <CreditCardIcon />}
                </Avatar>
              }
              title={
                <Typography variant="h6" fontWeight={600} color="white">
                  {plan.name}
                </Typography>
              }
              subheader={
                <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.8) }}>
                  {isAddOn ? "Add-on Plan" : `Plan #${index + 1}`}
                </Typography>
              }
              action={
                <Chip
                  label={plan.duration}
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    color: '#0f766e',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 24,
                  }}
                />
              }
            />

            <CardContent sx={{ p: 3 }}>
              {/* Description */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {plan.description}
              </Typography>

              {/* Price */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h3" fontWeight={700} sx={{ color: '#0f766e' }}>
                  {plan.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  per {plan.duration}
                </Typography>
              </Box>

              {/* User Limits */}
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Box sx={{ flex: 1, p: 1.5, bgcolor: alpha('#0f766e', 0.05), borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Min Users
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon sx={{ color: '#0f766e', fontSize: 16 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {plan.minUsers}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, p: 1.5, bgcolor: alpha('#0f766e', 0.05), borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Max Users
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon sx={{ color: '#0f766e', fontSize: 16 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {plan.maxUsers}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 0 }}>
              {!isAddOn && hasActiveSubscription ? (
                isCurrentPlan ? (
                  <Button
                    fullWidth
                    variant={isExpired ? "outlined" : "contained"}
                    color={isExpired ? "warning" : "success"}
                    disabled={!isExpired}
                    startIcon={<CheckCircleIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      bgcolor: isExpired ? 'transparent' : '#22c55e',
                      color: isExpired ? '#f59e0b' : 'white',
                      borderColor: isExpired ? '#f59e0b' : 'transparent',
                      '&:hover': isExpired ? {
                        borderColor: '#d97706',
                        bgcolor: alpha('#f59e0b', 0.1),
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
                    startIcon={<CreditCardIcon />}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      borderColor: '#e2e8f0',
                      color: '#94a3b8',
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
                      <CircularProgress size={16} sx={{ color: 'white' }} />
                    ) : isAddOn ? (
                      <ArrowUpIcon />
                    ) : (
                      <CreditCardIcon />
                    )
                  }
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: '#0f766e',
                    '&:hover': {
                      bgcolor: '#0a5c55',
                    },
                    '&.Mui-disabled': {
                      bgcolor: alpha('#0f766e', 0.3),
                    },
                  }}
                >
                  {processingPlanId === plan._id
                    ? 'Processing...'
                    : isAddOn
                    ? 'Upgrade Now'
                    : 'Subscribe Now'}
                </Button>
              )}
            </CardActions>
          </Card>
        </motion.div>
      </Grid>
    );
  };

  const isExpired = subscriptionExpiry && moment(subscriptionExpiry).isBefore(moment());

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: '#0f766e', mb: 1 }}>
            Payment Plans
          </Typography>
          <Typography variant="body2" color="text.secondary">
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
                sx={{ mb: 3, borderRadius: 2 }}
              >
                <AlertTitle>Payment Successful!</AlertTitle>
                {paymentSuccess}
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
                sx={{ mb: 3, borderRadius: 2 }}
              >
                <AlertTitle>Payment Error</AlertTitle>
                {orderError}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Subscription Notice */}
        {(hasActiveSubscription || isExpired) && (
          <Alert
            severity={isExpired ? "warning" : "info"}
            icon={isExpired ? <WarningIcon /> : <InfoIcon />}
            sx={{ mb: 4, borderRadius: 2 }}
          >
            <AlertTitle sx={{ fontWeight: 600 }}>
              {isExpired ? "Subscription Expired" : "Active Subscription"}
            </AlertTitle>
            <Typography variant="body2">
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
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Avatar sx={{ bgcolor: alpha('#0f766e', 0.1), color: '#0f766e', width: 40, height: 40 }}>
              <CreditCardIcon />
            </Avatar>
            <Typography variant="h5" fontWeight={600} color="#1e293b">
              Subscription Plans
            </Typography>
          </Box>

          {loading ? (
            <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
              <Loader message="Loading plans..." />
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {subscriptionPlans.length > 0 ? (
                subscriptionPlans.map((plan, index) => renderPlanCard(plan, index, false))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 3 }}>
                    <CreditCardIcon sx={{ fontSize: 48, color: alpha('#0f766e', 0.3), mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No subscription plans available
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      No subscription plans are currently available.
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          )}
        </Box>

        {/* Add-on Plans Section */}
        {addOnPlans.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Avatar sx={{ bgcolor: alpha('#0f766e', 0.1), color: '#0f766e', width: 40, height: 40 }}>
                <AddIcon />
              </Avatar>
              <Typography variant="h5" fontWeight={600} color="#1e293b">
                Add-on Plans
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {addOnPlans.map((plan, index) => renderPlanCard(plan, index, true))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default PaymentPlans;