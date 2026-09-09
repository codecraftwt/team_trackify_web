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
  Check as CheckIcon,
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
  Cancel as CancelIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPlans,
  createCustomPlan,
  getUserCustomPlan,
  updateCustomPlan,
  cancelSubscription,
  getPriceHistory,
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
  updatePaymentStatus,
} from "../../redux/slices/paymentSlice";
import { checkUserSubscription } from "../../redux/slices/userSlice"; // ✅ import this thunk
import Loader from "../../components/common/Loader";
import { RAZORPAY_KEY_ID } from "../../utils/constants";
import { getUserById } from "../../redux/slices/userSlice";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import CouponPopup from "../Admin/component/CouponPopup";

// ─────────────────────────────────────────────────────────────
// Plan Card Skeleton
// ─────────────────────────────────────────────────────────────
const PlanCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={6} lg={4} sx={{ display: "flex" }}>
      <Card
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2.5,
          border: "2px solid",
          borderColor: alpha(theme.palette.divider, 0.6),
          bgcolor: "#ffffff",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
        }}
      >
        <CardContent sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Header Row: Icon Avatar + Title/Subtitle + Duration Chip */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Skeleton
                variant="rounded"
                width={40}
                height={40}
                sx={{ borderRadius: "50%", bgcolor: alpha(theme.palette.primary.main, 0.08) }}
              />
              <Box>
                <Skeleton variant="text" width={110} height={24} sx={{ borderRadius: "4px" }} />
                <Skeleton variant="text" width={65} height={16} sx={{ borderRadius: "4px", mt: 0.3 }} />
              </Box>
            </Box>
            <Skeleton
              variant="rounded"
              width={65}
              height={24}
              sx={{ borderRadius: "12px", bgcolor: alpha(theme.palette.primary.main, 0.08) }}
            />
          </Box>

          {/* Price & Duration */}
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
              <Skeleton variant="rounded" width={110} height={38} sx={{ borderRadius: "6px" }} />
              <Skeleton variant="text" width={48} height={20} />
            </Box>
          </Box>

          {/* Users Allowed Container */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              mb: 2.5,
              p: 1.5,
              bgcolor: "background.default",
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(theme.palette.divider, 0.4),
            }}
          >
            <Skeleton variant="circular" width={18} height={18} sx={{ flexShrink: 0 }} />
            <Skeleton variant="text" width="65%" height={18} />
          </Box>

          <Divider sx={{ mb: 2.5, borderColor: alpha(theme.palette.divider, 0.5) }} />

          {/* Features Section */}
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width={100} height={18} sx={{ mb: 1.5, fontWeight: 700 }} />
            <Stack spacing={1.2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: alpha(theme.palette.success.main, 0.2), flexShrink: 0 }} />
                <Skeleton variant="text" width="85%" height={16} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: alpha(theme.palette.success.main, 0.2), flexShrink: 0 }} />
                <Skeleton variant="text" width="70%" height={16} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: alpha(theme.palette.success.main, 0.2), flexShrink: 0 }} />
                <Skeleton variant="text" width="90%" height={16} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Skeleton variant="circular" width={15} height={15} sx={{ bgcolor: alpha(theme.palette.success.main, 0.2), flexShrink: 0 }} />
                <Skeleton variant="text" width="60%" height={16} />
              </Box>
            </Stack>
          </Box>
        </CardContent>

        {/* Action Button */}
        <CardActions sx={{ p: 3, pt: 0 }}>
          <Skeleton
            variant="rounded"
            width="100%"
            height={42}
            sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.12) }}
          />
        </CardActions>
      </Card>
    </Grid>
  );
};

// ─────────────────────────────────────────────────────────────
// Custom Plan Popup
// ─────────────────────────────────────────────────────────────
const CustomPlanPopup = ({ open, onClose, onSubmit, planData, setPlanData, errors, isCreating, isEditing }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { basePrice, priceHistoryLoading } = useSelector((state) => state.plan || {});
  const durationUnits = ["months", "years"];

  useEffect(() => {
    if (open && !basePrice) dispatch(getPriceHistory());
  }, [open, dispatch, basePrice]);

  useEffect(() => {
    if (open && !isEditing && !planData.minUsers) {
      setPlanData((prev) => ({ ...prev, minUsers: "1" }));
    }
  }, [open, isEditing, planData.minUsers, setPlanData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePricePreview = () => {
    const minUsers = parseInt(planData.minUsers) || 0;
    const maxUsers = parseInt(planData.maxUsers) || 0;
    const durationValue = parseInt(planData.durationValue) || 0;
    const durationUnit = planData.durationUnit;
    if (!minUsers || !maxUsers || !durationValue || !durationUnit) return 0;
    const userCount = maxUsers || minUsers || 1;
    const currentBasePrice = basePrice;
    let totalMonths = 0;
    switch (durationUnit?.toLowerCase()) {
      case "month":
      case "months":
        totalMonths = durationValue;
        break;
      case "year":
      case "years":
        totalMonths = durationValue * 12;
        break;
      default:
        totalMonths = durationValue;
    }
    return Math.round(userCount * currentBasePrice * totalMonths);
  };

  const estimatedPrice = calculatePricePreview();
  const currentBasePrice = basePrice || 100;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}>
      <DialogTitle
        sx={{
          color: "text.primary",
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <BuildIcon />
        <Typography variant="h6" fontWeight={600}>
          {isEditing ? "Edit Custom Plan" : "Create Custom Plan"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form">
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Min Users" name="minUsers" type="number" value={planData.minUsers} onChange={handleChange} error={!!errors.minUsers} helperText={errors.minUsers} required size="small" InputProps={{ inputProps: { min: 1 } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Max Users" name="maxUsers" type="number" value={planData.maxUsers} onChange={handleChange} error={!!errors.maxUsers} helperText={errors.maxUsers} required size="small" InputProps={{ inputProps: { min: 1 } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Duration" name="durationValue" type="number" value={planData.durationValue} onChange={handleChange} error={!!errors.durationValue} helperText={errors.durationValue} required size="small" InputProps={{ inputProps: { min: 1 } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Duration Unit</InputLabel>
                <Select name="durationUnit" value={planData.durationUnit} onChange={handleChange} label="Duration Unit">
                  {durationUnits.map((unit) => (
                    <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {planData.minUsers && planData.maxUsers && planData.durationValue && planData.durationUnit && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: "background.default", borderRadius: 2, border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}` }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>Estimated Price:</Typography>
                  {priceHistoryLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <>
                      <Typography variant="h5" fontWeight={700} color="primary.main">₹{estimatedPrice.toLocaleString()}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Based on {planData.maxUsers} users × ₹{currentBasePrice} (base price) × {planData.durationValue} {planData.durationUnit}
                      </Typography>
                    </>
                  )}
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2, flex: 1, py: 1 }}>Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={isCreating}
          sx={{ flex: 1, py: 1, borderRadius: 2, bgcolor: theme.palette.primary.main }}
        >
          {isCreating ? <CircularProgress size={24} /> : isEditing ? "Update Plan" : "Create Plan"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─────────────────────────────────────────────────────────────
// Payment History Dialog
// ─────────────────────────────────────────────────────────────
const PaymentHistoryDialog = ({ open, onClose, paymentHistory, loading }) => {
  const theme = useTheme();
  const limitedPaymentHistory = paymentHistory?.slice(0, 10) || [];

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth 
      PaperProps={{ 
        sx: { 
          borderRadius: 3.5, 
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)"
        } 
      }}
    >
      <DialogTitle
        sx={{
          color: "text.primary",
          py: 1.75,
          px: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <HistoryIcon sx={{ fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight="700" sx={{ fontSize: "1rem" }}>Payment History</Typography>
        </Box>
        <IconButton 
          size="small" 
          onClick={onClose} 
          sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2.5, maxHeight: 400, overflowY: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 5 }}>
            <CircularProgress size={28} />
          </Box>
        ) : limitedPaymentHistory.length > 0 ? (
          <TableContainer sx={{ border: `1px solid ${alpha(theme.palette.divider, 0.08)}`, borderRadius: 2 }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", py: 1.2, color: theme.palette.text.secondary }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", py: 1.2, color: theme.palette.text.secondary }}>Plan</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", py: 1.2, color: theme.palette.text.secondary }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", py: 1.2, color: theme.palette.text.secondary }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.72rem", py: 1.2, color: theme.palette.text.secondary }}>Coupon</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {limitedPaymentHistory.map((payment) => (
                  <TableRow 
                    key={payment._id}
                    sx={{ 
                      "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.015) },
                      transition: "background-color 0.2s ease" 
                    }}
                  >
                    <TableCell sx={{ fontSize: "0.7rem", py: 1 }}>
                      {moment(payment.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.7rem", py: 1, fontWeight: 500 }}>
                      {payment.planId?.name || "N/A"}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.7rem", py: 1 }}>
                      <Box>
                        <span style={{ fontWeight: 600 }}>₹{payment.amount}</span>
                        {payment.discountAmount > 0 && (
                          <span style={{ color: theme.palette.success.main, marginLeft: 4, fontSize: "0.62rem", fontWeight: 600 }}>
                            (Saved ₹{payment.discountAmount})
                          </span>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 1 }}>
                      <Chip 
                        label={payment.status} 
                        size="small" 
                        variant="soft"
                        sx={{ 
                          fontSize: "0.58rem", 
                          height: 18,
                          fontWeight: 700,
                          textTransform: "capitalize",
                          bgcolor: payment.status === "completed" 
                            ? alpha(theme.palette.success.main, 0.1) 
                            : payment.status === "failed"
                              ? alpha(theme.palette.error.main, 0.1)
                              : alpha(theme.palette.warning.main, 0.1),
                          color: payment.status === "completed"
                            ? theme.palette.success.main
                            : payment.status === "failed"
                              ? theme.palette.error.main
                              : theme.palette.warning.main
                        }} 
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.7rem", py: 1 }}>
                      {payment.couponCode ? (
                        <Chip 
                          label={payment.couponCode} 
                          size="small" 
                          icon={<LocalOfferIcon sx={{ fontSize: 10, color: "inherit !important" }} />} 
                          sx={{ 
                            fontSize: "0.58rem", 
                            height: 18,
                            fontWeight: 600,
                            bgcolor: alpha(theme.palette.primary.main, 0.06),
                            color: theme.palette.primary.main
                          }} 
                        />
                      ) : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <ReceiptIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.2), mb: 1.5 }} />
            <Typography variant="body2" color="text.secondary">No payment history found</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 2.5, py: 1.75, borderTop: `1px solid ${alpha(theme.palette.divider, 0.06)}` }}>
        <Button 
          onClick={onClose} 
          variant="contained" 
          size="small"
          sx={{ 
            borderRadius: 1.5,
            px: 3,
            fontSize: "0.75rem",
            bgcolor: theme.palette.primary.main,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─────────────────────────────────────────────────────────────
// Cancel Subscription Dialog
// ─────────────────────────────────────────────────────────────
const CancelSubscriptionDialog = ({ open, onClose, onConfirm, isCancelling, planName }) => {
  const theme = useTheme();
  const [reason, setReason] = useState("");

  const handleConfirm = () => { onConfirm(reason); setReason(""); };
  const handleClose = () => { setReason(""); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}>
      <DialogTitle
        sx={{
          color: "text.primary",
          py: 2,
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <CancelIcon />
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem" }}>Cancel Subscription</Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: "0.85rem" }}>
          Are you sure you want to cancel <strong>{planName}</strong>? This action cannot be undone.
        </Typography>
        <TextField
          fullWidth
          label="Reason for cancellation (optional)"
          multiline
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          size="small"
          placeholder="Tell us why you're cancelling..."
          sx={{ mt: 1 }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, flex: 1 }} disabled={isCancelling}>Keep Plan</Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={isCancelling}
          startIcon={isCancelling ? <CircularProgress size={14} color="inherit" /> : <CancelIcon sx={{ fontSize: 16 }} />}
          sx={{ borderRadius: 2, flex: 1 }}
        >
          {isCancelling ? "Cancelling..." : "Cancel Plan"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
const PaymentPlans = () => {
  const theme = useTheme();
  const renderPlanDescription = (description) => {
    if (!description) return null;
    const parts = description.split(/\s*-\s+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length <= 1) {
      return (
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.74rem", mb: 1.5, display: "block" }}>
          {description}
        </Typography>
      );
    }
    return (
      <Box sx={{ mb: 1.5, textAlign: "left", width: "100%" }}>
        {parts.map((part, idx) => (
          <Box key={idx} sx={{ display: "flex", alignItems: "flex-start", gap: 0.75, mb: 0.5 }}>
            <CheckIcon sx={{ color: theme.palette.success.main, fontSize: 13, mt: 0.25, flexShrink: 0 }} />
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem", lineHeight: 1.3 }}>
              {part}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { plansList, loading: plansLoading, userCustomPlan, isCancelling, basePrice } = useSelector((state) => state.plan || {});

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

  const userData = useSelector((state) => state.user?.userInfo || {});
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});

  // ✅ subscription data from API (checkUserSubscription)
  const subscriptionInfo = useSelector((state) => state.user?.subscription || {});

  // ✅ Derive expiry status ONLY from the API response
  // subscriptionInfo.expired === true  → no active subscription (all cards disabled)
  // subscriptionInfo.expired === false → active subscription
  const isSubscriptionExpired = subscriptionInfo?.expired !== false; // treat undefined/null as expired too
  const hasActiveSubscription = subscriptionInfo?.hasSubscription === true && !isSubscriptionExpired;
  const subscriptionExpiry = subscriptionInfo?.expiresAt || null;

  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [currentPlanDetails, setCurrentPlanDetails] = useState(null);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [subscriptionCheckLoading, setSubscriptionCheckLoading] = useState(false);

  // Coupon popup states
  const [couponPopupOpen, setCouponPopupOpen] = useState(false);
  const [selectedPlanForCoupon, setSelectedPlanForCoupon] = useState(null);
  const [appliedCouponData, setAppliedCouponData] = useState(null);

  // Custom plan states
  const [customPlanPopupOpen, setCustomPlanPopupOpen] = useState(false);
  const [customPlanData, setCustomPlanData] = useState({ minUsers: "", maxUsers: "", durationValue: "", durationUnit: "months", status: "active" });
  const [customPlanErrors, setCustomPlanErrors] = useState({});
  const [isCreatingCustomPlan, setIsCreatingCustomPlan] = useState(false);
  const [isEditingCustomPlan, setIsEditingCustomPlan] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [fetchingCustomPlan, setFetchingCustomPlan] = useState(false);
  const [basePriceWarningOpen, setBasePriceWarningOpen] = useState(false);
  const [basePriceWarningMessage, setBasePriceWarningMessage] = useState("");

  // Cancel dialog state
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [planToCancel, setPlanToCancel] = useState(null);

  const isCustomPlanPurchased = currentPlanDetails?.planId === userCustomPlan?._id;

  const isSubAdmin = Number(authUser?.role_id) === 3;
  const effectiveAdminId = isSubAdmin
    ? typeof authUser?.adminId === "object"
      ? authUser?.adminId?._id || authUser?.adminId?.id
      : authUser?.adminId
    : authUser?._id || authUser?.id;

  // ─── Fetch plans ───────────────────────────────────────────
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        await dispatch(getAllPlans()).unwrap();
      } catch (error) {
        toast.error("Failed to load plans");
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowFirstRenderLoader(false);
        }, 1000);
      }
    };
    fetchInitialData();
  }, [dispatch]);

  // ─── ✅ Check subscription status via API on mount ──────────
  useEffect(() => {
    const checkSubscription = async () => {
      if (!isAuthenticated) return;
      setSubscriptionCheckLoading(true);
      try {
        // Get adminId from token stored in localStorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const adminId = effectiveAdminId || storedUser?._id || storedUser?.id || null;
        await dispatch(checkUserSubscription(adminId)).unwrap();
      } catch (error) {
        console.error("Subscription check failed:", error);
      } finally {
        setSubscriptionCheckLoading(false);
      }
    };
    checkSubscription();
  }, [dispatch, isAuthenticated, effectiveAdminId]);

  // ─── Fetch user custom plan ────────────────────────────────
  useEffect(() => {
    const fetchUserCustomPlan = async () => {
      if (isAuthenticated) {
        setFetchingCustomPlan(true);
        try {
          await dispatch(getUserCustomPlan()).unwrap();
        } catch (error) {
          // no custom plan
        } finally {
          setFetchingCustomPlan(false);
        }
      }
    };
    fetchUserCustomPlan();
  }, [dispatch, isAuthenticated]);

  // ─── Fetch user data ───────────────────────────────────────
  useEffect(() => {
    if (effectiveAdminId) dispatch(getUserById(effectiveAdminId));
  }, [dispatch, effectiveAdminId]);

  // ─── Fetch payment history ─────────────────────────────────
  useEffect(() => {
    if (isAuthenticated && effectiveAdminId) {
      dispatch(getPaymentHistory({ adminId: effectiveAdminId, page: 1, limit: 10 }));
    }
  }, [dispatch, isAuthenticated, effectiveAdminId]);

  useEffect(() => {
    if (isAuthenticated && authUser?.role === "superadmin") {
      dispatch(getAllPaymentHistory({ page: 1, limit: 10 }));
    }
  }, [dispatch, isAuthenticated, authUser?.role]);

  useEffect(() => {
    if (isAuthenticated && authUser?.role === "superadmin") {
      dispatch(getRevenueSummary());
    }
  }, [dispatch, isAuthenticated, authUser?.role]);

  // ─── Set currentPlanDetails from userData ─────────────────
  useEffect(() => {
    if (userData?.currentPaymentId) {
      setCurrentPlanDetails({
        _id: userData.currentPaymentId._id,
        planId: userData.currentPaymentId.planId,
        maxUser: userData.currentPaymentId.maxUser,
        minUser: userData.currentPaymentId.minUser,
        description: userData.currentPaymentId.description,
        name: userData.currentPaymentId.name,
      });
    } else {
      setCurrentPlanDetails(null);
    }
  }, [userData]);

  // ─── Handle verification success ──────────────────────────
  useEffect(() => {
    if (verificationData?.success) {
      const successMessage = verificationData.data?.couponCode
        ? `Payment successful! You saved ₹${verificationData.data.discountAmount} with coupon!`
        : "Payment successful! Your subscription has been activated.";
      setPaymentSuccess(successMessage);
      toast.success(successMessage);
      if (effectiveAdminId) {
        dispatch(getUserById(effectiveAdminId));
        dispatch(getPaymentHistory({ adminId: effectiveAdminId }));
        // ✅ Re-check subscription after successful payment
        dispatch(checkUserSubscription(effectiveAdminId));
      }
      setTimeout(() => {
        dispatch(clearVerificationData());
        dispatch(setPaymentStatus("idle"));
      }, 5000);
    }
  }, [verificationData, dispatch, effectiveAdminId]);

  useEffect(() => {
    if (addOnVerificationData?.success) {
      const successMessage = addOnVerificationData.data?.addOnDetails?.addOnCouponCode
        ? `Add-on payment successful! You saved ₹${addOnVerificationData.data.addOnDetails.addOnDiscountAmount} with coupon!`
        : "Add-on payment successful! Your plan has been upgraded.";
      setPaymentSuccess(successMessage);
      toast.success(successMessage);
      if (effectiveAdminId) {
        dispatch(getUserById(effectiveAdminId));
        dispatch(getPaymentHistory({ adminId: effectiveAdminId }));
        dispatch(checkUserSubscription(effectiveAdminId));
      }
      setTimeout(() => {
        dispatch(clearVerificationData());
        dispatch(setPaymentStatus("idle"));
      }, 5000);
    }
  }, [addOnVerificationData, dispatch, effectiveAdminId]);

  useEffect(() => {
    if (orderError) {
      toast.error(orderError?.message || "Failed to create order");
      dispatch(setPaymentStatus("failed"));
    }
    if (verificationError) {
      toast.error(verificationError?.message || "Payment verification failed");
      dispatch(setPaymentStatus("failed"));
    }
  }, [orderError, verificationError, dispatch]);

  // ─── Plan filters ──────────────────────────────────────────
  const subscriptionPlans = plansList?.filter((plan) => !plan.name?.includes("Add on Plan") && plan.status === "active" && plan.name !== "Customize Plan") || [];
  const addOnPlans = plansList?.filter((plan) => plan.name?.includes("Add on Plan") && plan.status === "active") || [];

  // ─── Handle pending plan from registration/pricing flow ───
  useEffect(() => {
    if (!loading && subscriptionPlans.length > 0) {
      let pendingPlanData = location.state?.selectedPlan || authUser?.selectedPlan;
      if (!pendingPlanData) {
        const stored = sessionStorage.getItem("selectedPlan");
        if (stored) {
          try { pendingPlanData = JSON.parse(stored); } catch (e) { pendingPlanData = null; }
        }
      }
      if (pendingPlanData) {
        if (pendingPlanData.isCustom || pendingPlanData.id === "custom") {
          setTimeout(() => {
            sessionStorage.removeItem("selectedPlan");
            sessionStorage.removeItem("fromPricing");
            if (location.state?.selectedPlan) {
              navigate(location.pathname, { replace: true, state: {} });
            }
            handleOpenCreateCustomPlan();
            toast.info("Configure your custom plan configuration!", { icon: "⚙️" });
          }, 500);
        } else {
          const matchedPlan = subscriptionPlans.find((p) => p._id === pendingPlanData._id || p.name === pendingPlanData.name);
          if (matchedPlan) {
            setTimeout(() => {
              setSelectedPlanForCoupon(matchedPlan);
              setCouponPopupOpen(true);
              sessionStorage.removeItem("selectedPlan");
              sessionStorage.removeItem("fromPricing");
              if (location.state?.selectedPlan) {
                navigate(location.pathname, { replace: true, state: {} });
              }
              toast.info(`Ready to complete your purchase of the ${matchedPlan.name} plan!`, { icon: "💳" });
            }, 500);
          }
        }
      }
    }
  }, [plansLoading, plansList, userCustomPlan, loading, location, authUser, navigate]);

  // ─── Custom plan handlers ──────────────────────────────────
  const handleCreateCustomPlan = async (e) => {
    e?.preventDefault();
    const errors = {};
    if (!customPlanData.minUsers) errors.minUsers = "Min users is required";
    if (!customPlanData.maxUsers) errors.maxUsers = "Max users is required";
    if (!customPlanData.durationValue) errors.durationValue = "Duration is required";
    if (customPlanData.minUsers && customPlanData.maxUsers && parseInt(customPlanData.minUsers) > parseInt(customPlanData.maxUsers)) {
      errors.maxUsers = "Max users must be greater than min users";
    }
    if (Object.keys(errors).length > 0) { setCustomPlanErrors(errors); return; }
    setCustomPlanErrors({});
    setIsCreatingCustomPlan(true);
    try {
      const payload = {
        minUsers: parseInt(customPlanData.minUsers),
        maxUsers: parseInt(customPlanData.maxUsers),
        durationValue: parseInt(customPlanData.durationValue),
        durationUnit: customPlanData.durationUnit,
        status: customPlanData.status,
      };
      if (isEditingCustomPlan && editingPlanId) {
        await dispatch(updateCustomPlan({ planId: editingPlanId, data: payload })).unwrap();
      } else {
        await dispatch(createCustomPlan(payload)).unwrap();
      }
      setCustomPlanPopupOpen(false);
      resetCustomPlanForm();
      dispatch(getAllPlans());
      await dispatch(getUserCustomPlan()).unwrap();
    } catch (error) {
      if (error?.existingPlanId) {
        toast.error("You already have a custom plan. Only one custom plan per user is allowed.");
      } else {
        toast.error(error?.message || "Failed to process custom plan");
      }
    } finally {
      setIsCreatingCustomPlan(false);
    }
  };

  const handleOpenCreateCustomPlan = async () => {
    try {
      let currentBasePrice = basePrice;
      if (currentBasePrice === null || currentBasePrice === undefined) {
        const priceData = await dispatch(getPriceHistory()).unwrap();
        currentBasePrice = priceData?.currentPrice;
      }
      if (currentBasePrice === null || currentBasePrice === undefined) {
        setBasePriceWarningMessage("Super admin has not created the base plan yet. Please create it first or contact the admin.");
        setBasePriceWarningOpen(true);
        return;
      }
      setEditingPlanId(null);
      setIsEditingCustomPlan(false);
      resetCustomPlanForm();
      setCustomPlanPopupOpen(true);
      setCustomPlanErrors({});
    } catch (error) {
      const apiMessage = error?.message || error?.data?.message || "Super admin has not created the base plan yet. Please create it first or contact the admin.";
      const warningMessage = apiMessage.toLowerCase().includes("no price configuration found")
        ? "Super admin has not created the base plan yet. Please create it first or contact the admin."
        : apiMessage;
      setBasePriceWarningMessage(warningMessage);
      setBasePriceWarningOpen(true);
    }
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
        status: userCustomPlan.status,
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
    setCustomPlanData({ minUsers: "", maxUsers: "", durationValue: "", durationUnit: "months", status: "active" });
  };

  const handlePurchaseCustomPlan = () => {
    if (userCustomPlan) {
      if (hasActiveSubscription) {
        toast.warning("You already have an active subscription. You can only purchase add-on plans.");
        return;
      }
      setSelectedPlanForCoupon(userCustomPlan);
      setCouponPopupOpen(true);
    }
  };

  // ─── Cancel subscription ───────────────────────────────────
  const handleOpenCancelDialog = (plan, planName) => {
    setPlanToCancel({ plan, planName });
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = async (reason) => {
    try {
      await dispatch(cancelSubscription({ cancellationReason: reason })).unwrap();
      toast.success("Subscription cancelled successfully");
      setCancelDialogOpen(false);
      setPlanToCancel(null);
      if (effectiveAdminId) {
        dispatch(getUserById(effectiveAdminId));
        dispatch(getPaymentHistory({ adminId: effectiveAdminId }));
        // ✅ Re-check subscription after cancel
        dispatch(checkUserSubscription(effectiveAdminId));
      }
    } catch (error) {
      toast.error(error?.message || "Failed to cancel subscription");
    }
  };

  // ─── Payment handlers ──────────────────────────────────────
  const handleSubscriptionPayment = async (planId, couponCode = null) => {
    setProcessingPlanId(planId);
    if (hasActiveSubscription) {
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
      const adminId = effectiveAdminId || authUser._id || authUser.id || userData?._id;
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
      const orderResult = await dispatch(createPaymentOrder({ adminId, planId, couponCode }));
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
            await dispatch(verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentId: orderData.paymentId,
            }));
          } catch (verifyError) {
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
        theme: { color: theme.palette.primary.main },
        modal: {
          ondismiss: async function () {
            setProcessingPlanId(null);
            dispatch(setPaymentStatus("idle"));
            try {
              await dispatch(updatePaymentStatus({ razorpayOrderId: orderData.orderId, status: "cancelled", failureReason: "User closed the payment window" })).unwrap();
              toast.info("Payment cancelled");
              if (effectiveAdminId) dispatch(getPaymentHistory({ adminId: effectiveAdminId }));
            } catch (error) {
              console.error("Failed to update payment status:", error);
            }
            dispatch(clearOrderData());
          },
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", async function (response) {
        try {
          await dispatch(updatePaymentStatus({ razorpayOrderId: orderData.orderId, status: "failed", failureReason: response.error?.description || "Payment failed" })).unwrap();
          toast.error(response.error?.description || "Payment failed. Please try again.");
          if (effectiveAdminId) dispatch(getPaymentHistory({ adminId: effectiveAdminId }));
        } catch (error) {
          toast.error("Payment failed. Please try again.");
        } finally {
          setProcessingPlanId(null);
          dispatch(setPaymentStatus("failed"));
          dispatch(clearOrderData());
        }
      });
      rzp.open();
    } catch (error) {
      toast.error("Payment failed: " + error.message);
      setProcessingPlanId(null);
      dispatch(setPaymentStatus("failed"));
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
      const adminId = effectiveAdminId || authUser._id || authUser.id || userData?._id;
      dispatch(clearPaymentState());
      setPaymentSuccess(null);
      const orderResult = await dispatch(createAddOnOrder({ adminId, addOnPlanId, paymentId: currentPlanDetails._id, couponCode }));
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
      let paymentCompleted = false;
      const razorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Team Trackify",
        description: couponCode ? `Payment for Add-on Plan (Saved: ₹${orderData.discountAmount / 100})` : `Payment for Add-on Plan`,
        order_id: orderData.orderId,
        handler: async (response) => {
          paymentCompleted = true;
          try {
            await dispatch(verifyAddOnPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              paymentId: orderData.paymentId,
            }));
          } catch (error) {
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
        theme: { color: theme.palette.primary.main },
        modal: {
          ondismiss: async function () {
            if (!paymentCompleted) {
              setProcessingPlanId(null);
              dispatch(setPaymentStatus("idle"));
              try {
                await dispatch(updatePaymentStatus({ razorpayOrderId: orderData.orderId, status: "cancelled", failureReason: "User closed the payment window" })).unwrap();
                toast.info("Payment cancelled");
                if (effectiveAdminId) dispatch(getPaymentHistory({ adminId: effectiveAdminId }));
              } catch (error) {
                console.error("Failed to update payment status:", error);
              }
              dispatch(clearOrderData());
            }
          },
        },
      };
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.on("payment.failed", async function (response) {
        paymentCompleted = false;
        try {
          await dispatch(updatePaymentStatus({ razorpayOrderId: orderData.orderId, status: "failed", failureReason: response.error?.description || "Payment failed" })).unwrap();
          toast.error(response.error?.description || "Payment failed. Please try again.");
          if (effectiveAdminId) dispatch(getPaymentHistory({ adminId: effectiveAdminId }));
        } catch (error) {
          toast.error("Payment failed. Please try again.");
        } finally {
          setProcessingPlanId(null);
          dispatch(setPaymentStatus("failed"));
          dispatch(clearOrderData());
        }
      });
      razorpayInstance.open();
    } catch (error) {
      toast.error("An error occurred while upgrading your plan.");
      setProcessingPlanId(null);
      dispatch(setPaymentStatus("failed"));
    }
  };

  const handleOpenCouponModal = (plan, isAddOn = false) => {
    const isAddOnPlan = isAddOn || addOnPlans.some(p => p._id === plan._id) || plan?.name?.toLowerCase().includes("add-on") || plan?.name?.toLowerCase().includes("add on");
    setSelectedPlanForCoupon({ ...plan, isAddOn: isAddOnPlan });
    setCouponPopupOpen(true);
  };

  const handleApplyCoupon = (couponData) => {
    const isAddOn = selectedPlanForCoupon?.isAddOn || 
                    addOnPlans.some(p => p._id === selectedPlanForCoupon?._id) || 
                    selectedPlanForCoupon?.name?.toLowerCase().includes("add-on") || 
                    selectedPlanForCoupon?.name?.toLowerCase().includes("add on");

    if (couponData === null) {
      if (isAddOn) {
        handleUpgradePlan(selectedPlanForCoupon._id, null);
      } else {
        handleSubscriptionPayment(selectedPlanForCoupon._id, null);
      }
      setAppliedCouponData(null);
    } else {
      setAppliedCouponData(couponData);
      if (isAddOn) {
        handleUpgradePlan(selectedPlanForCoupon._id, couponData.code);
      } else {
        handleSubscriptionPayment(selectedPlanForCoupon._id, couponData.code);
      }
    }
  };

  // ─────────────────────────────────────────────────────────────
  // ✅ renderPlanCard — uses isSubscriptionExpired from API
  // ─────────────────────────────────────────────────────────────
  const renderPlanCard = (plan, index, isAddOn = false) => {
    const isCurrentPlan = currentPlanDetails?.planId === plan._id;

    // ✅ A plan is truly active only when:
    //    - it matches the user's current plan AND
    //    - subscription is NOT expired (from API)
    const isActivePlan = isCurrentPlan && !isSubscriptionExpired;

    // ✅ If subscription is expired → treat as no active subscription at all
    //    Add-on disabled when: no active subscription OR subscription expired
    //    Other plans disabled when: has ACTIVE subscription (not expired) AND not the current plan
    const isDisabled = isAddOn
      ? !hasActiveSubscription  // add-ons only work with an active (non-expired) subscription
      : hasActiveSubscription && !isCurrentPlan; // other plans disabled only when user has active sub

    const isRecommended = plan.name === "Enterprise Plan" && !isAddOn;
    const hasCouponApplied = appliedCouponData && selectedPlanForCoupon?._id === plan._id;

    return (
      <Grid item xs={12} md={6} lg={4} key={plan._id} sx={{ display: "flex" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Card elevation={0} sx={{
              position: "relative",
              borderRadius: 2.5,
              border: "1px solid",
              borderColor: isRecommended
                ? theme.palette.primary.main
                : isActivePlan
                  ? theme.palette.primary.main
                  : alpha(theme.palette.divider, 0.5),
              boxShadow: "none",
              transition: "all 0.3s ease",
              // ✅ Disabled (greyed out) when subscription expired or plan not applicable
              opacity: isDisabled ? 0.7 : 1,
              cursor: isDisabled ? "not-allowed" : "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&:hover": !isDisabled
                ? {
                    transform: "translateY(-6px)",
                    boxShadow: isRecommended
                      ? `0 25px 40px -15px ${alpha(theme.palette.primary.main, 0.6)}`
                      : `0 15px 30px -8px ${alpha(theme.palette.primary.main, 0.4)}`,
                    borderColor: theme.palette.primary.main,
                  }
                : {},
            }}
          >
            {isRecommended && (
              <Box
                sx={{
                  position: "absolute",
                  top: 18,
                  left: -28,
                  zIndex: 10,
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: "0.6rem",
                  py: 0.4,
                  px: 2.5,
                  transform: "rotate(-45deg)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  textTransform: "capitalize",
                  letterSpacing: "0.3px",
                  width: "110px",
                  textAlign: "center",
                }}
              >
                Recommended
              </Box>
            )}

             <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 40, height: 40 }}>
                    {isAddOn ? <AddIcon sx={{ fontSize: 22 }} /> : <CreditCardIcon sx={{ fontSize: 22 }} />}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.2 }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                      {isAddOn ? "Add-on Plan" : `Plan #${index + 1}`}
                    </Typography>
                  </Box>
                </Box>
                <Chip label={plan.duration} size="small" sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontWeight: 600, fontSize: "0.65rem" }} />
              </Box>

              <Box sx={{ mb: 3, position: "relative" }}>
                {hasCouponApplied && (
                  <Chip
                    label={`Coupon applied: -₹${appliedCouponData.discountAmount}`}
                    size="small"
                    icon={<LocalOfferIcon sx={{ fontSize: 12 }} />}
                    onDelete={() => setAppliedCouponData(null)}
                    sx={{
                      position: "absolute",
                      top: -25,
                      right: 0,
                      bgcolor: alpha("#22c55e", 0.1),
                      color: "#22c55e",
                      fontSize: "0.6rem",
                      height: 22,
                      "& .MuiChip-deleteIcon": { color: "#22c55e", fontSize: 14 },
                    }}
                  />
                )}
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{
                      color: hasCouponApplied ? alpha(theme.palette.primary.main, 0.5) : "text.primary",
                      textDecoration: hasCouponApplied ? "line-through" : "none",
                      fontSize: hasCouponApplied ? "1.5rem" : "2.5rem",
                      lineHeight: 1
                    }}
                  >
                    ₹{plan.price}
                  </Typography>
                  {hasCouponApplied && (
                    <Typography variant="h3" fontWeight={800} sx={{ color: "#22c55e", fontSize: "2.5rem", lineHeight: 1 }}>
                      ₹{appliedCouponData.finalAmount}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    / {plan.duration}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, p: 1.5, bgcolor: "background.default", borderRadius: 2 }}>
                <PeopleIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary">
                  Up to <Box component="span" fontWeight={700} color="text.primary">{plan.maxUsers}</Box> users allowed
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" color="text.primary" fontWeight={700} sx={{ mb: 1.5 }}>
                  What's included:
                </Typography>
                {renderPlanDescription(plan.description)}
              </Box>

              {/* Active / Expired badge */}
              {isActivePlan && (
                <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1.5, textAlign: "center" }}>
                  <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                    ✓ Active Subscription
                  </Typography>
                </Box>
              )}

              {isCurrentPlan && isSubscriptionExpired && (
                <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 1.5, textAlign: "center" }}>
                  <Typography variant="caption" sx={{ color: theme.palette.warning.main, fontWeight: 600 }}>
                    ⚠ Subscription Expired — Please renew
                  </Typography>
                </Box>
              )}
            </CardContent>

            <CardActions sx={{ p: 2.5, pt: 0 }}>
              {isActivePlan ? (
                <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
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
                      color: "white",
                      fontSize: "0.7rem",
                    }}
                  >
                    Active Plan
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleOpenCancelDialog(plan, plan.name)}
                    disabled={isCancelling}
                    startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      py: 1.2,
                      borderRadius: 1.5,
                      borderColor: alpha(theme.palette.error.main, 0.5),
                      color: theme.palette.error.main,
                      fontSize: "0.65rem",
                      minWidth: "auto",
                      px: 1.5,
                      "&:hover": {
                        borderColor: theme.palette.error.main,
                        bgcolor: alpha(theme.palette.error.main, 0.05),
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              ) : isCurrentPlan && isSubscriptionExpired ? (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleOpenCouponModal(plan, false)}
                  disabled={processingPlanId === plan._id}
                  startIcon={processingPlanId === plan._id ? <CircularProgress size={14} color="inherit" /> : <CreditCardIcon sx={{ fontSize: 16 }} />}
                  size="small"
                  sx={{
                    py: 1.2,
                    borderRadius: 1.5,
                    bgcolor: theme.palette.primary.main,
                    fontSize: "0.7rem",
                    "&:hover": { bgcolor: theme.palette.primary.dark },
                  }}
                >
                  Renew Plan
                </Button>
              ) : isAddOn ? (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleOpenCouponModal(plan, true)}
                  disabled={isDisabled || processingPlanId === plan._id}
                  startIcon={processingPlanId === plan._id ? <CircularProgress size={14} color="inherit" /> : <AddIcon sx={{ fontSize: 16 }} />}
                  size="small"
                  sx={{
                    py: 1.2,
                    borderRadius: 1.5,
                    bgcolor: theme.palette.primary.main,
                    fontSize: "0.7rem",
                    "&:hover": { bgcolor: theme.palette.primary.dark },
                    "&.Mui-disabled": { bgcolor: alpha(theme.palette.primary.main, 0.3) },
                  }}
                >
                  {processingPlanId === plan._id ? "Processing..." : "Upgrade"}
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant={isRecommended ? "contained" : "outlined"}
                  onClick={() => handleOpenCouponModal(plan, false)}
                  disabled={isDisabled || processingPlanId === plan._id}
                  startIcon={processingPlanId === plan._id ? <CircularProgress size={14} color="inherit" /> : <CreditCardIcon sx={{ fontSize: 16 }} />}
                  size="small"
                  sx={{
                    py: 1.2,
                    borderRadius: 1.5,
                    bgcolor: isRecommended ? theme.palette.primary.main : "transparent",
                    color: isRecommended ? "white" : theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    fontSize: "0.7rem",
                    "&:hover": {
                      bgcolor: isRecommended ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.05),
                    },
                    "&.Mui-disabled": {
                      bgcolor: isRecommended ? alpha(theme.palette.primary.main, 0.3) : "transparent",
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  {processingPlanId === plan._id ? "Processing..." : "Subscribe"}
                </Button>
              )}
            </CardActions>
          </Card>
        </motion.div>
      </Grid>
    );
  };

  // ─────────────────────────────────────────────────────────────
  // Skeleton loader
  // ─────────────────────────────────────────────────────────────
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 3 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: "text.primary", fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" } }}>
                Payment Plans
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                Choose the perfect plan for your team
              </Typography>
            </Box>
            <Skeleton variant="rounded" width={130} height={36} sx={{ borderRadius: 2 }} />
          </Box>

          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
                <CreditCardIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1.1rem", color: "text.primary" }}>
                Subscription Plans
              </Typography>
            </Box>
            <Grid container spacing={2.5} alignItems="stretch">
              <PlanCardSkeleton />
              <PlanCardSkeleton />
              <PlanCardSkeleton />
            </Grid>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
                <AddIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1.1rem", color: "text.primary" }}>
                Add-on Plans
              </Typography>
            </Box>
            <Grid container spacing={2.5} alignItems="stretch">
              <PlanCardSkeleton />
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }

  // ─────────────────────────────────────────────────────────────
// Main render
  // ─────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 3 }}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" style={{ top: "70px" }} />

      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: "text.primary", fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" } }}>
              Payment Plans
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
              Choose the perfect plan for your team
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={() => setHistoryDialogOpen(true)}
            sx={{ borderRadius: 2, borderColor: alpha(theme.palette.primary.main, 0.3), color: theme.palette.primary.main, fontSize: "0.75rem", py: 1, px: 2 }}
          >
            Payment History
          </Button>
        </Box>

        {/* Revenue Summary for Superadmin */}
        {authUser?.role === "superadmin" && revenueSummary && (
          <Paper sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">Total Revenue</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary.main">₹{revenueSummary.totalRevenue?.toLocaleString()}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">Current Month</Typography>
                  <Typography variant="h6" fontWeight={700} color="success.main">₹{revenueSummary.currentMonthRevenue?.toLocaleString()}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">Total Discounts</Typography>
                  <Typography variant="h6" fontWeight={700} color="warning.main">₹{revenueSummary.totalDiscount?.toLocaleString()}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">Growth</Typography>
                  <Typography variant="h6" fontWeight={700} color={revenueSummary.growthPercentage >= 0 ? "success.main" : "error.main"}>
                    {revenueSummary.growthPercentage}%
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Admin stats */}
        {authUser?.role === "superadmin" && allPaymentHistory && (
          <Paper sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.02) }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">Total Completed Amount</Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">₹{totalCompletedAmount?.toLocaleString()}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">Paid Users</Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">{numberOfPaidUsers}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">Average Revenue</Typography>
                  <Typography variant="h6" fontWeight={700} color="info.main">₹{averageRevenue?.toLocaleString()}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* ✅ Subscription status alert — driven by API response */}
        {/* {subscriptionInfo?.hasSubscription && (
          <Alert
            severity={isSubscriptionExpired ? "warning" : "info"}
            icon={isSubscriptionExpired ? <WarningIcon sx={{ fontSize: 18 }} /> : <InfoIcon sx={{ fontSize: 18 }} />}
            sx={{
              mb: 3,
              borderRadius: 1.5,
              border: "1px solid",
              borderColor: isSubscriptionExpired ? alpha(theme.palette.warning.main, 0.2) : alpha(theme.palette.primary.main, 0.2),
            }}
          >
            <AlertTitle sx={{ fontWeight: 600, fontSize: "0.85rem", color: isSubscriptionExpired ? theme.palette.warning.main : theme.palette.primary.main }}>
              {isSubscriptionExpired ? "Subscription Expired" : "Active Subscription"}
            </AlertTitle>
            <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
              {subscriptionInfo.message}
            </Typography>
          </Alert>
        )} */}

        {paymentSuccess && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Alert severity="success" onClose={() => setPaymentSuccess(null)} sx={{ mb: 2.5, borderRadius: 1.5 }}>
              <AlertTitle sx={{ fontSize: "0.85rem" }}>Payment Successful!</AlertTitle>
              <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>{paymentSuccess}</Typography>
            </Alert>
          </motion.div>
        )}

        {/* Custom Plan Section */}
        {isAuthenticated && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            {userCustomPlan && (
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1.1rem", color: "text.primary" }}>
                Your Custom Plan
              </Typography>
            )}
            {!userCustomPlan && !fetchingCustomPlan && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<BuildIcon />}
                onClick={handleOpenCreateCustomPlan}
                sx={{ fontSize: "0.75rem", py: 0.5, px: 1.5, borderRadius: 2, borderColor: alpha(theme.palette.primary.main, 0.3) }}
              >
                Create Custom Plan
              </Button>
            )}
          </Box>
        )}

        {fetchingCustomPlan && (
          <Box sx={{ mb: 4, p: 3, textAlign: "center" }}>
            <CircularProgress size={30} />
            <Typography sx={{ mt: 1, fontSize: "0.8rem", color: "text.secondary" }}>Loading your custom plan...</Typography>
          </Box>
        )}

        {userCustomPlan && !fetchingCustomPlan && (
          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6} lg={4}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: "100%", height: "100%" }}>
                <Card elevation={0} sx={{
                    position: "relative",
                    borderRadius: 2.5,
                    border: "2px solid",
                    borderColor: isCustomPlanPurchased ? theme.palette.success.main : "#9c27b0",
                    boxShadow: "none", height: "100%", display: "flex", flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 18,
                      right: -30,
                      zIndex: 10,
                      background: isCustomPlanPurchased ? theme.palette.success.main : "#df3a24b1",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.6rem",
                      py: 0.4,
                      px: 2.5,
                      transform: "rotate(45deg)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      textTransform: "capitalize",
                      letterSpacing: "0.3px",
                      width: "110px",
                      textAlign: "center",
                    }}
                  >
                    {isCustomPlanPurchased ? "ACTIVE" : "YOUR PLAN"}
                  </Box>

                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: alpha("#9c27b0", 0.1), color: "#9c27b0", width: 40, height: 40 }}>
                          <BuildIcon sx={{ fontSize: 22 }} />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ lineHeight: 1.2 }}>
                            {userCustomPlan.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                            Custom Plan
                          </Typography>
                        </Box>
                      </Box>
                      <Chip label={userCustomPlan.duration} size="small" sx={{ bgcolor: alpha("#9c27b0", 0.1), color: "#9c27b0", fontWeight: 600, fontSize: "0.65rem" }} />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        <Typography variant="h3" fontWeight={800} sx={{ color: "text.primary", fontSize: "2.5rem", lineHeight: 1 }}>
                          ₹{userCustomPlan.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          / {userCustomPlan.duration}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3, p: 1.5, bgcolor: "background.default", borderRadius: 2 }}>
                      <PeopleIcon sx={{ color: "#9c27b0", fontSize: 18 }} />
                      <Typography variant="body2" color="text.secondary">
                        Custom tailored for <Box component="span" fontWeight={700} color="text.primary">{userCustomPlan.maxUsers}</Box> users
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" color="text.primary" fontWeight={700} sx={{ mb: 1.5 }}>
                        What's included:
                      </Typography>
                      {renderPlanDescription(userCustomPlan.description)}
                    </Box>

                    {/* ✅ Active badge only when not expired */}
                    {isCustomPlanPurchased && !isSubscriptionExpired && (
                      <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.success.main, 0.1), borderRadius: 1.5, textAlign: "center" }}>
                        <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                          ✓ You have an active subscription for this plan
                        </Typography>
                      </Box>
                    )}

                    {/* ✅ Expired badge */}
                    {isCustomPlanPurchased && isSubscriptionExpired && (
                      <Box sx={{ mt: 2, p: 1, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 1.5, textAlign: "center" }}>
                        <Typography variant="caption" sx={{ color: theme.palette.warning.main, fontWeight: 600 }}>
                          ⚠ Subscription Expired — Please renew
                        </Typography>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2.5, pt: 0 }}>
                    {/* ✅ Active and NOT expired */}
                    {isCustomPlanPurchased && !isSubscriptionExpired ? (
                      <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                        <Button fullWidth variant="contained" color="success" disabled startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />} size="small" sx={{ py: 1.2, borderRadius: 1.5, bgcolor: theme.palette.success.main, color: "white", fontSize: "0.7rem" }}>
                          Active Plan
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleOpenCancelDialog(userCustomPlan, userCustomPlan.name)}
                          disabled={isCancelling}
                          startIcon={<CancelIcon sx={{ fontSize: 14 }} />}
                          sx={{ py: 1.2, borderRadius: 1.5, borderColor: alpha(theme.palette.error.main, 0.5), color: theme.palette.error.main, fontSize: "0.65rem", minWidth: "auto", px: 1.5, "&:hover": { borderColor: theme.palette.error.main, bgcolor: alpha(theme.palette.error.main, 0.05) } }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : isCustomPlanPurchased && isSubscriptionExpired ? (
                      // ✅ Expired custom plan → Renew
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handlePurchaseCustomPlan}
                        startIcon={<CreditCardIcon sx={{ fontSize: 16 }} />}
                        size="small"
                        sx={{ py: 1.2, borderRadius: 1.5, bgcolor: "#9c27b0", fontSize: "0.7rem", "&:hover": { bgcolor: "#7b1fa2" } }}
                      >
                        Renew Plan
                      </Button>
                    ) : (
                      // ✅ Not purchased yet → Edit + Subscribe
                      <>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={handleOpenEditCustomPlan}
                          startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                          size="small"
                          sx={{ py: 1.2, borderRadius: 1.5, borderColor: alpha("#9c27b0", 0.3), color: "#9c27b0", fontSize: "0.7rem", mr: 1, "&:hover": { borderColor: "#9c27b0", bgcolor: alpha("#9c27b0", 0.05) } }}
                        >
                          Edit Plan
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handlePurchaseCustomPlan}
                          disabled={hasActiveSubscription}
                          startIcon={<CreditCardIcon sx={{ fontSize: 16 }} />}
                          size="small"
                          sx={{ py: 1.2, borderRadius: 1.5, bgcolor: "#9c27b0", fontSize: "0.7rem", "&:hover": { bgcolor: "#7b1fa2" }, "&.Mui-disabled": { bgcolor: alpha("#9c27b0", 0.3) } }}
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
          {paymentStatus === "processing" && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Alert severity="info" sx={{ mb: 2.5, borderRadius: 1.5 }}>
                <AlertTitle sx={{ fontSize: "0.85rem" }}>Processing Payment</AlertTitle>
                <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>Please wait while we process your payment...</Typography>
              </Alert>
            </motion.div>
          )}
          {orderError && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Alert severity="error" onClose={() => dispatch(clearPaymentState())} sx={{ mb: 2.5, borderRadius: 1.5 }}>
                <AlertTitle sx={{ fontSize: "0.85rem" }}>Payment Error</AlertTitle>
                <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>{orderError?.message || "An error occurred"}</Typography>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subscription Plans */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}>
            <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
              <CreditCardIcon sx={{ fontSize: 18 }} />
            </Avatar>
            <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1.1rem", color: "text.primary" }}>
              Subscription Plans
            </Typography>
          </Box>
          <Grid container spacing={2.5} alignItems="stretch">
            {plansLoading ? (
              <><PlanCardSkeleton /><PlanCardSkeleton /><PlanCardSkeleton /></>
            ) : subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((plan, index) => renderPlanCard(plan, index, false))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2.5 }}>
                  <CreditCardIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
                  <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: "0.9rem" }}>No subscription plans available</Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Add-on Plans */}
        {!plansLoading && addOnPlans.length > 0 && (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 32, height: 32 }}>
                <AddIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1.1rem", color: "text.primary" }}>
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
          onClose={() => { setCouponPopupOpen(false); setSelectedPlanForCoupon(null); }}
          onApplyCoupon={handleApplyCoupon}
          planPrice={selectedPlanForCoupon?.price || 0}
          planName={selectedPlanForCoupon?.name || ""}
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

        {/* Base price warning */}
        <Dialog open={basePriceWarningOpen} onClose={() => setBasePriceWarningOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2.5 } }}>
          <DialogTitle sx={{ bgcolor: alpha(theme.palette.warning.main, 0.12), color: theme.palette.warning.dark, fontSize: "1rem", fontWeight: 600 }}>
            Base Plan Not Found
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Typography className="mt-4" variant="body2" color="text.secondary">{basePriceWarningMessage}</Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button variant="contained" onClick={() => setBasePriceWarningOpen(false)}>OK</Button>
          </DialogActions>
        </Dialog>

        {/* Payment History Dialog */}
        <PaymentHistoryDialog
          open={historyDialogOpen}
          onClose={() => setHistoryDialogOpen(false)}
          paymentHistory={paymentHistory}
          loading={historyLoading}
        />

        {/* Cancel Subscription Dialog */}
        <CancelSubscriptionDialog
          open={cancelDialogOpen}
          onClose={() => { setCancelDialogOpen(false); setPlanToCancel(null); }}
          onConfirm={handleConfirmCancel}
          isCancelling={isCancelling}
          planName={planToCancel?.planName || ""}
        />
      </Container>
    </Box>
  );
};

export default PaymentPlans;