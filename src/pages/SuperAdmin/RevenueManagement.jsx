import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  alpha,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Skeleton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Tooltip,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Extension as AddonIcon,
  Receipt as PlanIcon,
  CheckCircle as CompletedIcon,
  Cancel as CancelledIcon,
  HourglassEmpty as PendingIcon,
  CalendarToday as CalendarIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocalOffer as CouponIcon,
   CurrencyRupee as CurrencyRupeeIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllPaymentHistory } from "../../redux/slices/paymentSlice";
import PaymentDetailsPopup from "../../components/common/PaymentDetailsPopup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";
import { toast } from "react-toastify";

// ─── Debounce Hook ───────────────────────────────────────────────────────────
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STATUS_FILTERS = [
  { key: "all", label: "All", color: "#6366f1" },
  { key: "completed", label: "Completed", color: "#10b981" },
  { key: "pending", label: "Pending", color: "#f59e0b" },
  { key: "failed", label: "Failed", color: "#dc2626" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
];

const TYPE_TABS = [
  { key: "all", label: "All Transactions", icon: BarChartIcon },
  { key: "plan", label: "Plans", icon: PlanIcon },
  { key: "addon", label: "Add-ons", icon: AddonIcon },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//   const config = {
//     completed: { color: "#10b981", bg: "#d1fae5", icon: CompletedIcon, label: "Completed" },
//     cancelled: { color: "#ef4444", bg: "#fee2e2", icon: CancelledIcon, label: "Cancelled" },
//     pending: { color: "#f59e0b", bg: "#fef3c7", icon: PendingIcon, label: "Pending" },
//   };
//   const c = config[status?.toLowerCase()] || config.pending;
//   const Icon = c.icon;
//   return (
//     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1, py: 0.4, borderRadius: 10, bgcolor: c.bg, width: "fit-content" }}>
//       <Icon sx={{ fontSize: 12, color: c.color }} />
//       <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: c.color, letterSpacing: 0.3 }}>{c.label}</Typography>
//     </Box>
//   );
// };

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    completed: { color: "#10b981", bg: "#d1fae5", icon: CompletedIcon, label: "Completed" },
    cancelled: { color: "#ef4444", bg: "#fee2e2", icon: CancelledIcon, label: "Cancelled" },
    failed: { color: "#dc2626", bg: "#fee2e2", icon: CancelledIcon, label: "Failed" }, // ✅ Add failed status
    pending: { color: "#f59e0b", bg: "#fef3c7", icon: PendingIcon, label: "Pending" },
  };
  const c = config[status?.toLowerCase()] || config.pending;
  const Icon = c.icon;

  // Special handling for failed with different styling
  const isFailed = status?.toLowerCase() === "failed";

  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      px: 1,
      py: 0.4,
      borderRadius: 10,
      bgcolor: c.bg,
      width: "fit-content",
      ...(isFailed && { border: "1px solid", borderColor: alpha("#dc2626", 0.3) }) // Optional: add border for failed
    }}>
      <Icon sx={{ fontSize: 12, color: c.color }} />
      <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: c.color, letterSpacing: 0.3 }}>
        {c.label}
      </Typography>
    </Box>
  );
};

// ─── Type Badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const isAddon = type === "addon";
  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: 0.4, px: 0.8, py: 0.3, borderRadius: 1,
      bgcolor: isAddon ? alpha("#8b5cf6", 0.1) : alpha("#3b82f6", 0.1),
      border: "1px solid",
      borderColor: isAddon ? alpha("#8b5cf6", 0.3) : alpha("#3b82f6", 0.3),
    }}>
      {isAddon ? <AddonIcon sx={{ fontSize: 10, color: "#8b5cf6" }} /> : <PlanIcon sx={{ fontSize: 10, color: "#3b82f6" }} />}
      <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: isAddon ? "#8b5cf6" : "#3b82f6", textTransform: "uppercase", letterSpacing: 0.5 }}>
        {isAddon ? "Add-on" : "Plan"}
      </Typography>
    </Box>
  );
};

// ─── Stats Card ───────────────────────────────────────────────────────────────
const StatsCard = ({ icon: Icon, value, label, accent, isMobile }) => (
  <Paper elevation={0} sx={{
    p: { xs: 1.5, sm: 2 }, borderRadius: 3,
    border: "1px solid", borderColor: alpha(accent, 0.15),
    background: `linear-gradient(135deg, ${alpha(accent, 0.06)} 0%, ${alpha(accent, 0.02)} 100%)`,
    height: "100%", position: "relative", overflow: "hidden",
  }}>
    <Box sx={{
      position: "absolute", top: -10, right: -10, width: 60, height: 60,
      borderRadius: "50%", bgcolor: alpha(accent, 0.08),
    }} />
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Box>
        <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, color: "text.secondary", mb: 0.5, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</Typography>
        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, fontWeight: 800, color: accent, lineHeight: 1 }}>{value}</Typography>
      </Box>
      <Box sx={{ p: 1, borderRadius: 2, bgcolor: alpha(accent, 0.12) }}>
        <Icon sx={{ fontSize: { xs: 18, sm: 20 }, color: accent }} />
      </Box>
    </Box>
  </Paper>
);

// ─── Skeleton for Stats ───────────────────────────────────────────────────────
const StatsCardSkeleton = () => (
  <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider", height: "100%" }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width={80} height={14} sx={{ mb: 0.8 }} />
        <Skeleton variant="text" width={100} height={28} />
      </Box>
      <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2 }} />
    </Box>
  </Paper>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const RevenueManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallMobile = useMediaQuery("(max-width:400px)");

  // UI State
  const [firstLoad, setFirstLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter State
  const [activeTab, setActiveTab] = useState("all"); // all | plan | addon
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");
  const [page, setPage] = useState(1);

  // Sort State
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  // Add this handler function
  const handleViewDetails = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setPopupOpen(true);
  };
  // Redux
  const {
    allPaymentHistory = [],
    allPaymentHistoryLoading = false,
    totalCompletedAmount = 0,
    numberOfPaidUsers = 0,
    averageRevenue = 0,
    totalPages = 1,
    totalPlanCount = 0,
    totalAddOnCount = 0,
    totalPlanAmount = 0,
    totalAddOnAmount = 0,
  } = useSelector((state) => state.payment || {});

  // Reset page on filter change
  useEffect(() => { setPage(1); }, [debouncedSearch, appliedStart, appliedEnd, activeTab, statusFilter]);

  // Fetch
  useEffect(() => {
    const params = { page, limit: 10 };
    if (debouncedSearch) params.search = debouncedSearch;
    if (appliedStart) params.startDate = moment(appliedStart).format("YYYY-MM-DD");
    if (appliedEnd) params.endDate = moment(appliedEnd).format("YYYY-MM-DD");
    dispatch(getAllPaymentHistory(params));

    const t = setTimeout(() => setFirstLoad(false), 800);
    return () => clearTimeout(t);
  }, [dispatch, debouncedSearch, appliedStart, appliedEnd, page]);

  // Transform + filter + sort data
  const allPayments = useMemo(() => {
    return (allPaymentHistory || []).map((p) => ({
      id: p._id,
      type: p.type,
      name: p.adminId?.name || "—",
      email: p.adminId?.email || "",
      mobile: p.adminId?.mobile_no || "",
      date: p.createdAt,
      amount: p.amount,
      originalAmount: p.originalAmount,
      discountAmount: p.discountAmount,
      savingsAmount: p.savingsAmount,
      status: p.status,
      plan: p.planId?.name || "—",
      planDesc: p.planId?.description || "",
      duration: p.duration,
      expiresAt: p.expiresAt,
      remainingDays: p.remainingDays,
      isExpired: p.isExpired,
      hasCouponApplied: p.hasCouponApplied,
      couponCode: p.couponCode,
      paymentMethod: p.paymentMethod,
      isAddOn: p.isAddOn || false,
      maxUsers: p.maxUsers,
      minUsers: p.minUsers,
      isCancelledByUser: p.isCancelledByUser,
      cancellationReason: p.cancellationReason,
    }));
  }, [allPaymentHistory]);

  const filteredPayments = useMemo(() => {
    let data = allPayments;

    // Type filter
    if (activeTab !== "all") data = data.filter((p) => p.type === activeTab);

    // Status filter
    if (statusFilter !== "all") data = data.filter((p) => p.status?.toLowerCase() === statusFilter);

    // Sort
    data = [...data].sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case "amount": aVal = a.amount; bVal = b.amount; break;
        case "name": aVal = a.name.toLowerCase(); bVal = b.name.toLowerCase(); break;
        case "status": aVal = a.status; bVal = b.status; break;
        default: aVal = new Date(a.date); bVal = new Date(b.date);
      }
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return data;
  }, [allPayments, activeTab, statusFilter, sortBy, sortOrder]);

  // Counts per type for badge
  const counts = useMemo(() => ({
    all: allPayments.length,
    plan: allPayments.filter((p) => p.type === "plan").length,
    addon: allPayments.filter((p) => p.type === "addon").length,
  }), [allPayments]);

  const statusCounts = useMemo(() => {
    const base = activeTab === "all" ? allPayments : allPayments.filter((p) => p.type === activeTab);
    return {
      all: base.length,
      completed: base.filter((p) => p.status === "completed").length,
      pending: base.filter((p) => p.status === "pending").length,
      failed: base.filter((p) => p.status === "failed").length,
      cancelled: base.filter((p) => p.status === "cancelled").length,
    };
  }, [allPayments, activeTab]);

  const applyDateFilter = () => {
    if (startDate && endDate && moment(endDate).isBefore(moment(startDate))) {
      toast.error("End date cannot be before start date");
      return;
    }
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    toast.success("Date filter applied");
  };

  const clearDateFilter = () => {
    setStartDate(""); setEndDate(""); setAppliedStart(""); setAppliedEnd("");
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await dispatch(getAllPaymentHistory({ page, limit: 10 }));
    setIsRefreshing(false);
    toast.success("Refreshed");
  };

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortOrder("desc"); }
  };

  // ── Animations ────────────────────────────────────────────────────────────
  const fade = { hidden: { opacity: 0, y: 16 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" } }) };

  // ── First load skeleton ───────────────────────────────────────────────────
  if (firstLoad) {
    return (
      <Box sx={{ minHeight: "100vh", py: 3, px: { xs: 1.5, sm: 3 }, bgcolor: "background.default" }}>
        <Container maxWidth="xl" disableGutters>
          <Skeleton variant="text" width={220} height={36} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width={160} height={20} sx={{ mb: 3 }} />
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[1, 2, 3, 4].map((i) => <Grid item xs={6} md={3} key={i}><StatsCardSkeleton /></Grid>)}
          </Grid>
          <Skeleton variant="rounded" height={52} sx={{ borderRadius: 3, mb: 2 }} />
          <Skeleton variant="rounded" height={48} sx={{ borderRadius: 3, mb: 1.5 }} />
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} variant="rounded" height={64} sx={{ borderRadius: 2, mb: 1 }} />)}
        </Container>
      </Box>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 2, sm: 3 }, px: { xs: 1.5, sm: 3 }, bgcolor: "background.default" }}>
      <Container maxWidth="xl" disableGutters>
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={0}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
            <Box>
              <Typography sx={{
                fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.7rem" }, fontWeight: 900,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Revenue Analytics</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                Track and analyze all payment transactions
              </Typography>
            </Box>
            <IconButton onClick={refreshData} disabled={isRefreshing || allPaymentHistoryLoading} size="small"
              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: 36, height: 36 }}>
              <RefreshIcon sx={{ fontSize: 18, animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
            </IconButton>
          </Box>
        </motion.div>

        {/* Stats Cards */}
        <Grid container spacing={{ xs: 1.5, md: 2 }} sx={{ mb: 3 }}>
          {[
            { icon: CurrencyRupeeIcon, value: `₹${totalCompletedAmount?.toLocaleString("en-IN")}`, label: "Total Revenue", accent: theme.palette.primary.main },
            { icon: PeopleIcon, value: numberOfPaidUsers, label: "Paid Users", accent: "#10b981" },
            { icon: PlanIcon, value: `${totalPlanCount} Plans`, label: `₹${totalPlanAmount?.toLocaleString("en-IN")}`, accent: "#3b82f6" },
            { icon: AddonIcon, value: `${totalAddOnCount} Add-ons`, label: `₹${totalAddOnAmount?.toLocaleString("en-IN")}`, accent: "#8b5cf6" },
          ].map((card, i) => (
            <Grid item xs={6} md={3} key={i}>
              <motion.div initial="hidden" animate="visible" variants={fade} custom={i}>
                <StatsCard {...card} isMobile={isMobile} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Type Tabs */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={4}>
          <Paper elevation={0} sx={{ p: 0.8, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 2, display: "flex", gap: 0.5 }}>
            {TYPE_TABS.map(({ key, label, icon: Icon }) => (
              <Box key={key} onClick={() => setActiveTab(key)} sx={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.8,
                py: 1, px: { xs: 0.5, sm: 1.5 }, borderRadius: 2, cursor: "pointer",
                transition: "all 0.2s",
                bgcolor: activeTab === key ? theme.palette.primary.main : "transparent",
                color: activeTab === key ? "#fff" : "text.secondary",
                "&:hover": { bgcolor: activeTab === key ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.06) },
              }}>
                <Icon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                <Typography sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" }, fontWeight: 700, display: { xs: key === "all" ? "block" : "none", sm: "block" } }}>
                  {label}
                </Typography>
                <Box sx={{
                  px: 0.8, py: 0.2, borderRadius: 10,
                  bgcolor: activeTab === key ? alpha("#fff", 0.25) : alpha(theme.palette.primary.main, 0.1),
                  minWidth: 20, textAlign: "center",
                }}>
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: activeTab === key ? "#fff" : theme.palette.primary.main }}>
                    {counts[key]}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </motion.div>

        {/* Status Filters + Search */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={5}>
          <Paper elevation={0} sx={{ p: { xs: 1.2, sm: 1.5 }, borderRadius: 3, border: "1px solid", borderColor: "divider", mb: 2 }}>
            {/* Status pills */}
            <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1.5 }}>
              {STATUS_FILTERS.map(({ key, label, color }) => (
                <Box key={key} onClick={() => setStatusFilter(key)} sx={{
                  display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.5,
                  borderRadius: 10, cursor: "pointer", border: "1.5px solid",
                  transition: "all 0.18s",
                  borderColor: statusFilter === key ? color : alpha(color, 0.25),
                  bgcolor: statusFilter === key ? alpha(color, 0.12) : "transparent",
                }}>
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: statusFilter === key ? color : "text.secondary" }}>{label}</Typography>
                  <Box sx={{ px: 0.6, py: 0.15, borderRadius: 10, bgcolor: statusFilter === key ? alpha(color, 0.2) : alpha("#000", 0.06) }}>
                    <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: statusFilter === key ? color : "text.secondary" }}>
                      {statusCounts[key]}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Search + Date row */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
              <TextField
                placeholder="Search by name, email, plan…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{
                  flex: 1, minWidth: 180,
                  "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.75rem" },
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: "text.secondary" }} /></InputAdornment>,
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery("")}><ClearIcon sx={{ fontSize: 14 }} /></IconButton>
                    </InputAdornment>
                  ) : null,
                }}
              />
              <TextField type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="small"
                label="From" InputLabelProps={{ shrink: true }}
                sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.75rem" } }} />
              <TextField type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} size="small"
                label="To" InputLabelProps={{ shrink: true }}
                sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.75rem" } }} />
              <Button size="small" variant="contained" onClick={applyDateFilter} disabled={!startDate && !endDate}
                sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>Apply</Button>
              {(appliedStart || appliedEnd) && (
                <Button size="small" variant="outlined" color="error" onClick={clearDateFilter}
                  sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>Clear</Button>
              )}
            </Box>
          </Paper>
        </motion.div>

        {/* Table */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={6}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
            {allPaymentHistoryLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
              </Box>
            ) : filteredPayments.length === 0 ? (
              <Box sx={{ py: 8, textAlign: "center" }}>
                <BarChartIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>No transactions found</Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                      {[
                        { label: "#", width: 40 },
                        { label: "Type", width: 70 },
                        { label: "Admin / User", sortKey: "name" },
                        { label: "Plan", width: 150 },
                        { label: "Amount", sortKey: "amount", align: "right" },
                        { label: "Coupon", width: 90, align: "center" },
                        { label: "Date", sortKey: "date" },
                        { label: "Expires", width: 100 },
                        { label: "Status", sortKey: "status", width: 110 },
                        { label: "Actions", width: 60, align: "center" },
                      ].map(({ label, sortKey, align, width }) => (
                        <TableCell key={label}
                          onClick={() => sortKey && handleSort(sortKey)}
                          align={align || "left"}
                          sx={{
                            width, py: 1.2, px: { xs: 1, sm: 1.5 },
                            fontSize: "0.65rem", fontWeight: 800, letterSpacing: 0.5,
                            textTransform: "uppercase", color: "text.secondary",
                            cursor: sortKey ? "pointer" : "default",
                            userSelect: "none",
                            whiteSpace: "nowrap",
                            "&:hover": sortKey ? { color: theme.palette.primary.main } : {},
                          }}>
                          {label}
                          {sortKey && sortBy === sortKey && (
                            <span style={{ marginLeft: 2 }}>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <AnimatePresence>
                      {filteredPayments.map((row, idx) => (
                        <motion.tr key={row.id}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          transition={{ delay: idx * 0.03, duration: 0.25 }}
                          style={{ display: "table-row" }}>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 }, fontSize: "0.7rem", color: "text.disabled" }}>
                            {(page - 1) * 10 + idx + 1}
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <TypeBadge type={row.type} />
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Avatar sx={{ width: 26, height: 26, fontSize: "0.6rem", bgcolor: alpha(theme.palette.primary.main, 0.15), color: theme.palette.primary.main, fontWeight: 800 }}>
                                {row.name?.[0]?.toUpperCase() || "?"}
                              </Avatar>
                              <Box>
                                <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, lineHeight: 1.2 }}>{row.name}</Typography>
                                <Typography sx={{ fontSize: "0.6rem", color: "text.secondary" }}>{row.email}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, lineHeight: 1.3 }}>{row.plan}</Typography>
                            {row.duration && (
                              <Typography sx={{ fontSize: "0.58rem", color: "text.secondary" }}>{row.duration}</Typography>
                            )}
                          </TableCell>
                          <TableCell align="right" sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Box>
                              <Typography sx={{ fontSize: "0.75rem", fontWeight: 800, color: row.status === "completed" ? "#10b981" : "text.primary" }}>
                                ₹{row.amount?.toLocaleString("en-IN")}
                              </Typography>
                              {row.discountAmount > 0 && (
                                <Typography sx={{ fontSize: "0.58rem", color: "#ef4444", textDecoration: "line-through" }}>
                                  ₹{row.originalAmount?.toLocaleString("en-IN")}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="center" sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            {row.hasCouponApplied ? (
                              <Tooltip title={`${row.couponCode} · Saved ₹${row.savingsAmount}`}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.4 }}>
                                  <CouponIcon sx={{ fontSize: 12, color: "#f59e0b" }} />
                                  <Typography sx={{ fontSize: "0.6rem", color: "#f59e0b", fontWeight: 700 }}>{row.couponCode}</Typography>
                                </Box>
                              </Tooltip>
                            ) : (
                              <Typography sx={{ fontSize: "0.6rem", color: "text.disabled" }}>—</Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Typography sx={{ fontSize: "0.68rem", fontWeight: 500 }}>
                              {moment(row.date).format("DD MMM YY")}
                            </Typography>
                            <Typography sx={{ fontSize: "0.58rem", color: "text.secondary" }}>
                              {moment(row.date).format("hh:mm A")}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            {row.expiresAt ? (
                              <Box>
                                <Typography sx={{ fontSize: "0.65rem", fontWeight: 500, color: row.isExpired ? "#ef4444" : "text.primary" }}>
                                  {moment(row.expiresAt).format("DD MMM YY")}
                                </Typography>
                                <Typography sx={{ fontSize: "0.58rem", color: row.isExpired ? "#ef4444" : "#10b981" }}>
                                  {row.isExpired ? "Expired" : `${row.remainingDays}d left`}
                                </Typography>
                              </Box>
                            ) : <Typography sx={{ fontSize: "0.65rem", color: "text.disabled" }}>—</Typography>}
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <StatusBadge status={row.status} />
                            {row.isCancelledByUser && (
                              <Tooltip title={row.cancellationReason || "Cancelled by user"}>
                                <Typography sx={{ fontSize: "0.55rem", color: "text.disabled", mt: 0.3, cursor: "default" }}>
                                  {row.cancellationReason === "User closed the payment window"
                                    ? "Payment Closed"
                                    : "Plan Cancelled"}
                                </Typography>
                              </Tooltip>
                            )}
                          </TableCell>

                          <TableCell align="center" sx={{ py: 1.2, px: { xs: 1, sm: 1.5 } }}>
                            <Tooltip title="View Details">
                              <IconButton
                                size="small"
                                onClick={() => handleViewDetails(row.id)}
                                sx={{
                                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.15) },
                                }}
                              >
                                <VisibilityIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Pagination */}
            {!allPaymentHistoryLoading && filteredPayments.length > 0 && (
              <Box sx={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                px: 2, py: 1.5, borderTop: "1px solid", borderColor: "divider",
              }}>
                <Typography sx={{ fontSize: "0.68rem", color: "text.secondary" }}>
                  Showing {filteredPayments.length} of {totalPages * 10} transactions
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <IconButton size="small" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }}>
                    <KeyboardArrowLeft sx={{ fontSize: 16 }} />
                  </IconButton>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pg = page <= 3 ? i + 1 : page + i - 2;
                    if (pg < 1 || pg > totalPages) return null;
                    return (
                      <Box key={pg} onClick={() => setPage(pg)} sx={{
                        width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 1.5, cursor: "pointer", border: "1px solid",
                        borderColor: pg === page ? theme.palette.primary.main : "divider",
                        bgcolor: pg === page ? theme.palette.primary.main : "transparent",
                        color: pg === page ? "#fff" : "text.secondary",
                        fontSize: "0.7rem", fontWeight: pg === page ? 800 : 400,
                        transition: "all 0.15s",
                      }}>{pg}</Box>
                    );
                  })}
                  <IconButton size="small" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    sx={{ width: 28, height: 28, border: "1px solid", borderColor: "divider" }}>
                    <KeyboardArrowRight sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>
      {/* Payment Details Popup */}
      <PaymentDetailsPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        paymentId={selectedPaymentId}
      />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </Box>
  );
};

export default RevenueManagement;