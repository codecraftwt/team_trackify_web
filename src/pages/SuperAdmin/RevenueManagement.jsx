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
  Tabs,
  Tab,
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
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
  { key: "cancelled", label: "Cancelled" },
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
    completed: { color: "#10b981", bg: alpha("#10b981", 0.1), icon: CompletedIcon, label: "Completed" },
    cancelled: { color: "#ef4444", bg: alpha("#ef4444", 0.1), icon: CancelledIcon, label: "Cancelled" },
    failed: { color: "#dc2626", bg: alpha("#dc2626", 0.1), icon: CancelledIcon, label: "Failed" },
    pending: { color: "#f59e0b", bg: alpha("#f59e0b", 0.1), icon: PendingIcon, label: "Pending" },
  };
  const c = config[status?.toLowerCase()] || config.pending;
  const Icon = c.icon;

  return (
    <Chip
      icon={<Icon sx={{ fontSize: 14 }} />}
      label={c.label}
      size="small"
      sx={{
        bgcolor: c.bg,
        color: c.color,
        fontWeight: 600,
        fontSize: "0.7rem",
        '& .MuiChip-icon': { color: c.color }
      }}
    />
  );
};

// ─── Type Badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const isAddon = type === "addon";
  const label = isAddon ? "Add-on" : "Plan";
  return (
    <Chip
      label={label}
      size="small"
      variant="outlined"
      sx={{
        color: 'text.secondary',
        borderColor: 'divider',
        fontWeight: 600,
        fontSize: "0.65rem",
        textTransform: "uppercase",
        bgcolor: 'background.paper',
        '& .MuiChip-icon': { color: 'text.secondary' }
      }}
    />
  );
};

// ─── Stats Card ───────────────────────────────────────────────────────────────
const StatsCard = ({ icon: Icon, value, label, accent, isMobile }) => (
  <Paper elevation={0} sx={{
    p: { xs: 1.5, sm: 2 }, borderRadius: 2,
    border: "1px solid", borderColor: "divider",
    bgcolor: "background.paper",
    height: "100%", 
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    transition: "box-shadow 0.2s ease-in-out",
    "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box>
        <Typography sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem" }, fontWeight: 700, color: "text.primary", lineHeight: 1.2, mb: 0.15 }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, color: "text.secondary", fontWeight: 500 }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: alpha(accent, 0.1) }}>
        <Icon sx={{ fontSize: 18, color: accent }} />
      </Box>
    </Box>
  </Paper>
);

// ─── Skeleton for Stats ───────────────────────────────────────────────────────
const StatsCardSkeleton = () => (
  <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid", borderColor: "divider", height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Box sx={{ flex: 1 }}>
        <Skeleton variant="text" width={60} height={28} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width={80} height={14} />
      </Box>
      <Skeleton variant="circular" width={32} height={32} />
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
      <Box sx={{ minHeight: "100vh", py: 3, px: { xs: 1.5, sm: 3 }, bgcolor: "#f5f5f5" }}>
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
    <Box sx={{ minHeight: "100vh", py: { xs: 2, sm: 3 }, px: { xs: 1.5, sm: 3 }, bgcolor: "#f5f5f5" }}>
      <Container maxWidth="xl" disableGutters>
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={0}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
            <Box>
              <Typography variant="h5" fontWeight="800" sx={{ mb: 0.5, color: 'text.primary', letterSpacing: '-0.5px' }}>
                Revenue Analytics
              </Typography>
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
            { icon: PeopleIcon, value: numberOfPaidUsers, label: "Paid Users", accent: theme.palette.primary.main },
            { icon: PlanIcon, value: `${totalPlanCount} Plans`, label: `₹${totalPlanAmount?.toLocaleString("en-IN")}`, accent: theme.palette.primary.main },
            { icon: AddonIcon, value: `${totalAddOnCount} Add-ons`, label: `₹${totalAddOnAmount?.toLocaleString("en-IN")}`, accent: theme.palette.primary.main },
          ].map((card, i) => (
            <Grid item xs={6} md={3} key={i}>
              <motion.div initial="hidden" animate="visible" variants={fade} custom={i}>
                <StatsCard {...card} isMobile={isMobile} />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Consolidated Data Section */}
        <motion.div initial="hidden" animate="visible" variants={fade} custom={4}>
          <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", overflow: 'hidden' }}>
            
            {/* 1. Tabs */}
            <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="standard"
                sx={{
                  minHeight: 48,
                  px: 2,
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    minHeight: 48,
                  },
                }}
              >
                {TYPE_TABS.map(({ key, label, icon: Icon }) => (
                  <Tab
                    key={key}
                    value={key}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon sx={{ fontSize: 18 }} />
                        <span>{label}</span>
                        <Chip
                          label={counts[key]}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            bgcolor: activeTab === key ? alpha(theme.palette.primary.main, 0.1) : 'action.hover',
                            color: activeTab === key ? 'primary.main' : 'text.secondary',
                          }}
                        />
                      </Box>
                    }
                  />
                ))}
              </Tabs>
            </Box>

            {/* 2. Filters & Search */}
            <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", bgcolor: "background.paper" }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", md: "center" }, gap: 2 }}>
                
                {/* Status Chips */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {STATUS_FILTERS.map(({ key, label }) => (
                    <Chip
                      key={key}
                      label={`${label} (${statusCounts[key]})`}
                      onClick={() => setStatusFilter(key)}
                      variant={statusFilter === key ? "filled" : "outlined"}
                      color={statusFilter === key ? "primary" : "default"}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        height: 28,
                        borderColor: statusFilter === key ? "transparent" : "divider",
                        bgcolor: statusFilter === key ? 'primary.main' : 'background.default',
                        color: statusFilter === key ? '#fff' : 'text.secondary',
                        '&:hover': {
                          bgcolor: statusFilter === key ? 'primary.dark' : 'action.hover',
                        }
                      }}
                    />
                  ))}
                </Box>

                {/* Search & Date */}
                <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
                  <TextField
                    placeholder="Search…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="small"
                    sx={{
                      width: { xs: "100%", sm: 200 },
                      "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.8rem", bgcolor: "background.default" },
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} /></InputAdornment>,
                      endAdornment: searchQuery ? (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setSearchQuery("")}><ClearIcon sx={{ fontSize: 16 }} /></IconButton>
                        </InputAdornment>
                      ) : null,
                    }}
                  />
                  
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <TextField type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="small"
                      InputProps={{ sx: { borderRadius: 2, fontSize: "0.8rem", bgcolor: "background.default", height: 36 } }}
                      sx={{ width: 130 }} />
                    <Typography sx={{ color: "text.secondary", fontSize: "0.8rem" }}>to</Typography>
                    <TextField type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} size="small"
                      InputProps={{ sx: { borderRadius: 2, fontSize: "0.8rem", bgcolor: "background.default", height: 36 } }}
                      sx={{ width: 130 }} />
                    <Button size="small" variant="contained" onClick={applyDateFilter} disabled={!startDate && !endDate}
                      sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.75rem", px: 2, height: 36, boxShadow: "none" }}>Apply</Button>
                    {(appliedStart || appliedEnd) && (
                      <Button size="small" variant="outlined" color="error" onClick={clearDateFilter}
                        sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.75rem", px: 2, height: 36 }}>Clear</Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 3. Table */}
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              {allPaymentHistoryLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress size={32} sx={{ color: theme.palette.primary.main }} />
                </Box>
              ) : filteredPayments.length === 0 ? (
                <Box sx={{ py: 10, textAlign: "center" }}>
                  <BarChartIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
                  <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>No transactions found</Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table size="medium" sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
                    <TableHead>
                      <TableRow>
                        {[
                          { label: "#", width: 40 },
                          { label: "Type", width: 80 },
                          { label: "User Details", sortKey: "name" },
                          { label: "Plan Info", width: 160 },
                          { label: "Amount", sortKey: "amount", align: "right" },
                          { label: "Coupon", width: 100, align: "center" },
                          { label: "Date", sortKey: "date" },
                          { label: "Status", sortKey: "status", width: 120 },
                          { label: "Actions", width: 70, align: "center" },
                        ].map(({ label, sortKey, align, width }, i) => (
                          <TableCell key={label}
                            onClick={() => sortKey && handleSort(sortKey)}
                            align={align || "left"}
                            sx={{
                              width, py: 1.8, px: 2,
                              fontSize: "0.68rem", fontWeight: 800, letterSpacing: 0.5,
                              textTransform: "uppercase", color: "text.secondary",
                              bgcolor: alpha(theme.palette.primary.main, 0.03),
                              borderBottom: "none",
                              borderTopLeftRadius: i === 0 ? 8 : 0,
                              borderTopRightRadius: i === 8 ? 8 : 0,
                              borderBottomLeftRadius: i === 0 ? 8 : 0,
                              borderBottomRightRadius: i === 8 ? 8 : 0,
                              cursor: sortKey ? "pointer" : "default",
                              userSelect: "none",
                              whiteSpace: "nowrap",
                              "&:hover": sortKey ? { color: theme.palette.primary.main } : {},
                            }}>
                            {label}
                            {sortKey && sortBy === sortKey && (
                              <span style={{ marginLeft: 4 }}>{sortOrder === "asc" ? "↑" : "↓"}</span>
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
                            transition={{ delay: idx * 0.02, duration: 0.2 }}
                            style={{ display: "table-row" }}
                          >
                            <TableCell sx={{ py: 1.5, px: 2, fontSize: "0.75rem", color: "text.disabled", borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015), borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
                              {(page - 1) * 10 + idx + 1}
                            </TableCell>
                            <TableCell sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015) }}>
                              <TypeBadge type={row.type} />
                            </TableCell>
                            <TableCell sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015) }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Avatar sx={{ width: 32, height: 32, fontSize: "0.8rem", bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, fontWeight: 700 }}>
                                  {row.name?.[0]?.toUpperCase() || "?"}
                                </Avatar>
                                <Box>
                                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "text.primary", lineHeight: 1.2, mb: 0.2 }}>{row.name}</Typography>
                                  <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>{row.email}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015) }}>
                              <Typography sx={{ fontSize: "0.8rem", fontWeight: 500, color: "text.primary", mb: 0.2 }}>{row.plan}</Typography>
                              {row.duration && (
                                <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>{row.duration}</Typography>
                              )}
                            </TableCell>
                            <TableCell align="right" sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015) }}>
                              <Box>
                                <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: row.status === "completed" ? "#10b981" : "text.primary" }}>
                                  ₹{row.amount?.toLocaleString("en-IN")}
                                </Typography>
                                {row.discountAmount > 0 && (
                                  <Typography sx={{ fontSize: "0.7rem", color: "text.disabled", textDecoration: "line-through" }}>
                                    ₹{row.originalAmount?.toLocaleString("en-IN")}
                                  </Typography>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015) }}>
                              {row.hasCouponApplied ? (
                                <Tooltip title={`${row.couponCode} · Saved ₹${row.savingsAmount}`}>
                                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1, py: 0.4, borderRadius: 1, bgcolor: alpha("#f59e0b", 0.1) }}>
                                    <CouponIcon sx={{ fontSize: 14, color: "#f59e0b" }} />
                                    <Typography sx={{ fontSize: "0.7rem", color: "#f59e0b", fontWeight: 600 }}>{row.couponCode}</Typography>
                                  </Box>
                                </Tooltip>
                              ) : (
                                <Typography sx={{ fontSize: "0.75rem", color: "text.disabled" }}>—</Typography>
                              )}
                            </TableCell>
                            <TableCell sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015) }}>
                              <Typography sx={{ fontSize: "0.75rem", fontWeight: 500, color: "text.primary", mb: 0.2 }}>
                                {moment(row.date).format("DD MMM YYYY")}
                              </Typography>
                              <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>
                                {moment(row.date).format("hh:mm A")}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015) }}>
                              <StatusBadge status={row.status} />
                              {row.isCancelledByUser && (
                                <Tooltip title={row.cancellationReason || "Cancelled by user"}>
                                  <Typography sx={{ fontSize: "0.6rem", color: "text.secondary", mt: 0.5, display: "block" }}>
                                    {row.cancellationReason === "User closed the payment window"
                                      ? "Payment Closed"
                                      : "Plan Cancelled"}
                                  </Typography>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="center" sx={{ py: 1.5, px: 2, borderBottom: "none", bgcolor: idx % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.015), borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  onClick={() => handleViewDetails(row.id)}
                                  sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.15) },
                                  }}
                                >
                                  <VisibilityIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
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
            </Box>

            {/* Pagination */}
            {!allPaymentHistoryLoading && filteredPayments.length > 0 && (
              <Box sx={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                px: 3, py: 2, borderTop: "1px solid", borderColor: "divider", bgcolor: "background.paper"
              }}>
                <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", fontWeight: 500 }}>
                  Showing {filteredPayments.length} of {totalPages * 10} transactions
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <IconButton size="small" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    sx={{ width: 32, height: 32, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                    <KeyboardArrowLeft sx={{ fontSize: 18 }} />
                  </IconButton>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pg = page <= 3 ? i + 1 : page + i - 2;
                    if (pg < 1 || pg > totalPages) return null;
                    return (
                      <Box key={pg} onClick={() => setPage(pg)} sx={{
                        width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: 1, cursor: "pointer", border: "1px solid",
                        borderColor: pg === page ? theme.palette.primary.main : "divider",
                        bgcolor: pg === page ? theme.palette.primary.main : "transparent",
                        color: pg === page ? "#fff" : "text.secondary",
                        fontSize: "0.75rem", fontWeight: pg === page ? 700 : 500,
                        transition: "all 0.15s",
                        "&:hover": { bgcolor: pg === page ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.05) }
                      }}>{pg}</Box>
                    );
                  })}
                  <IconButton size="small" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                    sx={{ width: 32, height: 32, border: "1px solid", borderColor: "divider", borderRadius: 1 }}>
                    <KeyboardArrowRight sx={{ fontSize: 18 }} />
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