import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  LinearProgress,
  alpha,
  useTheme,
  Avatar,
  Stack,
  Divider,
  Tooltip,
  useMediaQuery,
  Skeleton,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  HistoryRounded as HistoryIcon,
  RefreshRounded as RefreshIcon,
  GridViewRounded as GridViewIcon,
  TableRowsRounded as TableRowsIcon,
  CheckCircleRounded as CheckCircleIcon,
  AccessTimeRounded as PendingIcon,
  CancelRounded as CancelIcon,
  CalendarTodayRounded as CalendarIcon,
  ReceiptLongRounded as ReceiptIcon,
  ExtensionRounded as AddonIcon,
  LocalOfferRounded as CouponIcon,
  SearchRounded as SearchIcon,
  ClearRounded as ClearIcon,
  VisibilityRounded as VisibilityIcon,
  AccountBalanceWalletRounded as WalletIcon,
  ArrowDownwardRounded as ArrowDownwardIcon,
  ArrowUpwardRounded as ArrowUpwardIcon,
  FilterListRounded as FilterListIcon,
  CreditCardRounded as CreditCardIcon,
  SwapVertRounded as SortIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import ReceiptModal from "../../components/models/ReceiptModal";
import PaymentDetailsPopup from "../../components/common/PaymentDetailsPopup";
import { toast } from "react-toastify";
import moment from "moment";

// ─── Theme Colors ─────────────────────────────────────────────────────────────
const T = {
  primary: "#102c4a",
  primaryDark: "#0b2138",
  primaryHover: "#1e4f7a",
  primaryPale: "#eef4fa",
  primaryAlpha: (o = 0.1) => `rgba(16, 44, 74, ${o})`,

  emerald: "#16a34a",
  emeraldPale: "#f0fdf4",
  emeraldBorder: "#bbf7d0",

  amber: "#d97706",
  amberPale: "#fffbeb",
  amberBorder: "#fde68a",

  red: "#dc2626",
  redPale: "#fef2f2",
  redBorder: "#fecaca",

  slate: "#64748b",
  slatePale: "#f1f5f9",
  slateBorder: "#e2e8f0",

  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  border: "#e2e8f0",
  borderStrong: "#cbd5e1",
  text: "#0f172a",
  textSub: "#475569",
  textMuted: "#64748b",
};

// ─── Type Tab Config ──────────────────────────────────────────────────────────
const TYPE_TABS = [
  { key: "all", label: "All Transactions" },
  { key: "plan", label: "Plan Subscriptions" },
  { key: "addon", label: "Add-on Packs" },
];

// ─── Status Filter Config ─────────────────────────────────────────────────────
const STATUS_FILTERS = [
  { key: "all", label: "All", color: T.primary },
  { key: "completed", label: "Completed", color: T.emerald },
  { key: "pending", label: "Pending", color: T.amber },
  { key: "cancelled", label: "Cancelled", color: T.red },
  { key: "failed", label: "Failed", color: T.slate },
];

// ─── Type Badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const isAddon = type === "addon";
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1,
        py: 0.25,
        borderRadius: "6px",
        bgcolor: isAddon ? "rgba(99, 102, 241, 0.08)" : T.primaryPale,
        border: `1px solid ${isAddon ? "rgba(99, 102, 241, 0.25)" : T.primaryAlpha(0.25)}`,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: 800,
          color: isAddon ? "#6366f1" : T.primary,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          lineHeight: 1.2,
        }}
      >
        {isAddon ? "Add-on" : "Plan"}
      </Typography>
    </Box>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  let color = T.slate;
  let bg = T.slatePale;
  let border = T.slateBorder;
  let icon = <CancelIcon sx={{ fontSize: 13 }} />;
  let label = "Failed";

  if (status === "completed") {
    color = T.emerald;
    bg = T.emeraldPale;
    border = T.emeraldBorder;
    icon = <CheckCircleIcon sx={{ fontSize: 13 }} />;
    label = "Completed";
  } else if (status === "pending") {
    color = T.amber;
    bg = T.amberPale;
    border = T.amberBorder;
    icon = <PendingIcon sx={{ fontSize: 13 }} />;
    label = "Pending";
  } else if (status === "cancelled") {
    color = T.red;
    bg = T.redPale;
    border = T.redBorder;
    icon = <CancelIcon sx={{ fontSize: 13 }} />;
    label = "Cancelled";
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 1,
        py: 0.25,
        borderRadius: "20px",
        bgcolor: bg,
        border: `1px solid ${border}`,
        color: color,
      }}
    >
      {icon}
      <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "capitalize", lineHeight: 1.2 }}>
        {label}
      </Typography>
    </Box>
  );
};

// ─── Skeletons ────────────────────────────────────────────────────────────────
const TableRowSkeleton = () => (
  <TableRow>
    {[30, 80, 120, 150, 100, 90, 80, 90, 60].map((w, i) => (
      <TableCell key={i} sx={{ py: 1.6 }}>
        <Skeleton
          variant={i === 8 ? "circular" : "rounded"}
          width={w}
          height={i === 8 ? 28 : 20}
          sx={{ borderRadius: "6px" }}
        />
      </TableCell>
    ))}
  </TableRow>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const TransactionHistory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});
  const userData = useSelector((state) => state.user?.userInfo || {});

  const {
    paymentHistory = [],
    historyLoading = false,
  } = useSelector((state) => state.payment || {});

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);

  const [viewMode, setViewMode] = useState("table");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [activeTypeTab, setActiveTypeTab] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedStart, setAppliedStart] = useState("");
  const [appliedEnd, setAppliedEnd] = useState("");

  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Get effective admin ID
  const getEffectiveAdminId = () => {
    const isSubAdmin = Number(authUser?.role_id) === 3;
    if (isSubAdmin) {
      return typeof authUser?.adminId === "object"
        ? authUser?.adminId?._id || authUser?.adminId?.id
        : authUser?.adminId;
    }
    return authUser._id || authUser.id || userData?._id;
  };

  useEffect(() => {
    if (isAuthenticated) {
      const adminId = getEffectiveAdminId();
      if (adminId) {
        dispatch(getPaymentHistory({
          adminId,
          page: 1,
          limit: 10000,
        }));
      }
    }
    const timer = setTimeout(() => setShowFirstRenderLoader(false), 800);
    return () => clearTimeout(timer);
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    setPage(0);
  }, [searchQuery, activeStatus, appliedStart, appliedEnd, activeTypeTab]);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleViewMode = () => setViewMode(viewMode === "card" ? "table" : "card");

  const refreshData = () => {
    if (isAuthenticated) {
      const adminId = getEffectiveAdminId();
      if (adminId) {
        dispatch(getPaymentHistory({
          adminId,
          page: 1,
          limit: 10000,
        }));
        toast.success("Transactions refreshed!");
      }
    }
  };

  const handleSortClose = (value) => {
    if (value) setSortBy(value);
    setSortAnchorEl(null);
  };

  const applyDateFilter = () => {
    if (startDate && endDate && moment(endDate).isBefore(moment(startDate))) {
      toast.error("End date cannot be before start date");
      return;
    }
    setAppliedStart(startDate);
    setAppliedEnd(endDate);
    setPage(0);
    toast.success("Date filter applied");
  };

  const clearDateFilter = () => {
    setStartDate("");
    setEndDate("");
    setAppliedStart("");
    setAppliedEnd("");
    setPage(0);
    toast.info("Date filter cleared");
  };

  const handleViewPaymentDetails = (paymentId) => {
    setSelectedPaymentId(paymentId);
    setPaymentPopupOpen(true);
  };

  const formatDate = (d) => (d ? moment(d).format("DD MMM YYYY") : "—");
  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(amount || 0);

  const getParentPlan = (transaction) => {
    if (transaction.type === "addon" && transaction.parentPaymentId) {
      const parentId =
        typeof transaction.parentPaymentId === "object"
          ? transaction.parentPaymentId._id || transaction.parentPaymentId.id
          : transaction.parentPaymentId;
      return paymentHistory?.find((t) => t._id === parentId) || null;
    }
    return null;
  };

  const getPlanExpiryDate = (transaction) => {
    const parentPlan = getParentPlan(transaction);
    return parentPlan?.expiresAt || transaction.expiresAt;
  };

  // ── 1. Comprehensive Filtering ──────────────────────────────────────────────
  const fullyFilteredTransactions = paymentHistory?.filter((t) => {
    if (activeTypeTab !== "all" && t.type !== activeTypeTab) return false;
    if (activeStatus !== "all" && t.status !== activeStatus) return false;

    if (appliedStart || appliedEnd) {
      const tDate = moment(t.createdAt);
      if (appliedStart && tDate.isBefore(moment(appliedStart).startOf("day"))) return false;
      if (appliedEnd && tDate.isAfter(moment(appliedEnd).endOf("day"))) return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchDesc = t.description?.toLowerCase().includes(query) || false;
      const matchPlan = t.planId?.name?.toLowerCase().includes(query) || false;
      const matchCoupon = t.couponCode?.toLowerCase().includes(query) || false;
      if (!matchDesc && !matchPlan && !matchCoupon) return false;
    }

    return true;
  }) || [];

  // ── 2. Client-side sorting ──────────────────────────────────────────────────
  const fullSortedTransactions = [...fullyFilteredTransactions].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "highest") return (b.amount || 0) - (a.amount || 0);
    if (sortBy === "lowest") return (a.amount || 0) - (b.amount || 0);
    return 0;
  });

  // ── 3. Client-side pagination ───────────────────────────────────────────────
  const sortedTransactions = fullSortedTransactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ── Quick Summary Stats Calculations ────────────────────────────────────────
  const totalCompletedAmount = paymentHistory
    ?.filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + (t.amount || 0), 0) || 0;

  const totalCompletedCount = paymentHistory?.filter((t) => t.status === "completed").length || 0;
  const totalPendingCount = paymentHistory?.filter((t) => t.status === "pending").length || 0;

  // ── Dynamic Badge Counts ────────────────────────────────────────────────────
  const preTypeFiltered = paymentHistory?.filter((t) => {
    if (activeStatus !== "all" && t.status !== activeStatus) return false;
    if (appliedStart || appliedEnd) {
      const tDate = moment(t.createdAt);
      if (appliedStart && tDate.isBefore(moment(appliedStart).startOf("day"))) return false;
      if (appliedEnd && tDate.isAfter(moment(appliedEnd).endOf("day"))) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !t.description?.toLowerCase().includes(q) &&
        !t.planId?.name?.toLowerCase().includes(q) &&
        !t.couponCode?.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  }) || [];

  const typeCounts = {
    all: preTypeFiltered.length,
    plan: preTypeFiltered.filter((t) => t.type === "plan").length,
    addon: preTypeFiltered.filter((t) => t.type === "addon").length,
  };

  const preStatusFiltered = paymentHistory?.filter((t) => {
    if (activeTypeTab !== "all" && t.type !== activeTypeTab) return false;
    if (appliedStart || appliedEnd) {
      const tDate = moment(t.createdAt);
      if (appliedStart && tDate.isBefore(moment(appliedStart).startOf("day"))) return false;
      if (appliedEnd && tDate.isAfter(moment(appliedEnd).endOf("day"))) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !t.description?.toLowerCase().includes(q) &&
        !t.planId?.name?.toLowerCase().includes(q) &&
        !t.couponCode?.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  }) || [];

  const derivedStatusCounts = {
    all: preStatusFiltered.length,
    completed: preStatusFiltered.filter((t) => t.status === "completed").length,
    pending: preStatusFiltered.filter((t) => t.status === "pending").length,
    cancelled: preStatusFiltered.filter((t) => t.status === "cancelled").length,
    failed: preStatusFiltered.filter((t) => t.status === "failed").length,
  };

  // ── Initial Skeleton Loader ─────────────────────────────────────────────────
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: { xs: 2.5, sm: 3.5 } }}>
        <Container maxWidth="xl">
          {/* Header Skeleton */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box>
              <Skeleton variant="text" width={220} height={38} />
              <Skeleton variant="text" width={180} height={20} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: "10px" }} />
              <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: "10px" }} />
              <Skeleton variant="rounded" width={110} height={36} sx={{ borderRadius: "10px" }} />
            </Box>
          </Box>

          {/* Stat Cards Skeleton */}
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Skeleton variant="rounded" height={100} sx={{ borderRadius: "16px" }} />
              </Grid>
            ))}
          </Grid>

          {/* Filter Bar Skeleton */}
          <Skeleton variant="rounded" height={120} sx={{ borderRadius: "16px", mb: 3 }} />

          {/* Table Skeleton */}
          <Skeleton variant="rounded" height={400} sx={{ borderRadius: "18px" }} />
        </Container>
      </Box>
    );
  }

  // ── Main Render ─────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: { xs: 2.5, sm: 3.5 } }}>
      <Container maxWidth="xl">
        {/* ── Page Header ── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.35rem", sm: "1.6rem" },
                color: T.text,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Transaction History
            </Typography>
            <Typography sx={{ fontSize: "0.82rem", color: T.textMuted, mt: 0.3, fontWeight: 500 }}>
              Track and manage all your subscription and add-on billing records
            </Typography>
          </Box>

          {/* Top Header Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={refreshData}
                disabled={historyLoading}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  bgcolor: "#ffffff",
                  border: `1px solid ${T.border}`,
                  color: T.primary,
                  "&:hover": { bgcolor: T.primaryPale, borderColor: T.primaryAlpha(0.3) },
                }}
              >
                <RefreshIcon
                  sx={{
                    animation: historyLoading ? "spin 1s linear infinite" : "none",
                    fontSize: 19,
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title={viewMode === "table" ? "Switch to Card View" : "Switch to Table View"}>
              <IconButton
                onClick={toggleViewMode}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  bgcolor: "#ffffff",
                  border: `1px solid ${T.border}`,
                  color: T.primary,
                  "&:hover": { bgcolor: T.primaryPale, borderColor: T.primaryAlpha(0.3) },
                }}
              >
                {viewMode === "table" ? <GridViewIcon sx={{ fontSize: 19 }} /> : <TableRowsIcon sx={{ fontSize: 19 }} />}
              </IconButton>
            </Tooltip>

            <Button
              variant="outlined"
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
              startIcon={<SortIcon sx={{ fontSize: 16 }} />}
              sx={{
                height: 38,
                borderRadius: "10px",
                borderColor: T.border,
                bgcolor: "#ffffff",
                color: T.textSub,
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "none",
                px: 1.8,
                "&:hover": { borderColor: T.primary, color: T.primary, bgcolor: T.primaryPale },
              }}
            >
              {sortBy === "newest"
                ? "Newest First"
                : sortBy === "oldest"
                ? "Oldest First"
                : sortBy === "highest"
                ? "Highest Amount"
                : "Lowest Amount"}
            </Button>

            <Menu
              anchorEl={sortAnchorEl}
              open={Boolean(sortAnchorEl)}
              onClose={() => handleSortClose()}
              PaperProps={{
                sx: {
                  borderRadius: "12px",
                  mt: 1,
                  minWidth: 150,
                  boxShadow: "0 10px 25px -5px rgba(16, 44, 74, 0.15)",
                },
              }}
            >
              {[
                { key: "newest", label: "Newest First" },
                { key: "oldest", label: "Oldest First" },
                { key: "highest", label: "Highest Amount" },
                { key: "lowest", label: "Lowest Amount" },
              ].map(({ key, label }) => (
                <MenuItem
                  key={key}
                  onClick={() => handleSortClose(key)}
                  selected={sortBy === key}
                  sx={{ fontSize: "0.8rem", fontWeight: 600, py: 1 }}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>

        {/* ── Summary Stats Row ── */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {/* Total Spent */}
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2.2,
                borderRadius: "16px",
                bgcolor: "#ffffff",
                border: `1px solid ${T.border}`,
                boxShadow: "0 2px 10px rgba(16, 44, 74, 0.03)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: T.primaryPale,
                  color: T.primary,
                }}
              >
                <WalletIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.75rem", color: T.textMuted, fontWeight: 600 }}>
                  Total Completed Spent
                </Typography>
                <Typography sx={{ fontSize: "1.35rem", fontWeight: 800, color: T.text, lineHeight: 1.2, mt: 0.2 }}>
                  {formatAmount(totalCompletedAmount)}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Completed Transactions */}
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2.2,
                borderRadius: "16px",
                bgcolor: "#ffffff",
                border: `1px solid ${T.border}`,
                boxShadow: "0 2px 10px rgba(16, 44, 74, 0.03)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: T.emeraldPale,
                  color: T.emerald,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.75rem", color: T.textMuted, fontWeight: 600 }}>
                  Successful Transactions
                </Typography>
                <Typography sx={{ fontSize: "1.35rem", fontWeight: 800, color: T.emerald, lineHeight: 1.2, mt: 0.2 }}>
                  {totalCompletedCount} <span style={{ fontSize: "0.85rem", color: T.textMuted, fontWeight: 500 }}>Paid</span>
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Pending / Uncompleted */}
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={0}
              sx={{
                p: 2.2,
                borderRadius: "16px",
                bgcolor: "#ffffff",
                border: `1px solid ${T.border}`,
                boxShadow: "0 2px 10px rgba(16, 44, 74, 0.03)",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: totalPendingCount > 0 ? T.amberPale : T.slatePale,
                  color: totalPendingCount > 0 ? T.amber : T.slate,
                }}
              >
                <PendingIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.75rem", color: T.textMuted, fontWeight: 600 }}>
                  Pending Verification
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    color: totalPendingCount > 0 ? T.amber : T.slate,
                    lineHeight: 1.2,
                    mt: 0.2,
                  }}
                >
                  {totalPendingCount} <span style={{ fontSize: "0.85rem", color: T.textMuted, fontWeight: 500 }}>Orders</span>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* ── Filter & Search Control Panel ── */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            mb: 3,
            borderRadius: "18px",
            bgcolor: "#ffffff",
            border: `1px solid ${T.border}`,
            boxShadow: "0 2px 12px rgba(16, 44, 74, 0.03)",
          }}
        >
          {/* Top Type Segmented Controls */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 2,
              p: 0.6,
              borderRadius: "12px",
              bgcolor: T.surfaceAlt,
              border: `1px solid ${T.border}`,
            }}
          >
            {TYPE_TABS.map(({ key, label }) => {
              const isSelected = activeTypeTab === key;
              return (
                <Box
                  key={key}
                  onClick={() => setActiveTypeTab(key)}
                  sx={{
                    flex: 1,
                    py: 0.9,
                    px: 1.5,
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    bgcolor: isSelected ? T.primary : "transparent",
                    color: isSelected ? "#ffffff" : T.textSub,
                    "&:hover": {
                      bgcolor: isSelected ? T.primary : T.primaryPale,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 700 }}>
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      px: 0.9,
                      py: 0.2,
                      borderRadius: "10px",
                      bgcolor: isSelected ? "rgba(255,255,255,0.22)" : T.primaryPale,
                      color: isSelected ? "#ffffff" : T.primary,
                      fontSize: "0.7rem",
                      fontWeight: 800,
                    }}
                  >
                    {typeCounts[key] || 0}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Status Filter Pills Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: T.textMuted, mr: 0.5 }}>
              Status:
            </Typography>
            {STATUS_FILTERS.map(({ key, label, color }) => {
              const isSelected = activeStatus === key;
              return (
                <Box
                  key={key}
                  onClick={() => setActiveStatus(key)}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.6,
                    px: 1.4,
                    py: 0.5,
                    borderRadius: "20px",
                    cursor: "pointer",
                    border: "1.5px solid",
                    borderColor: isSelected ? color : T.border,
                    bgcolor: isSelected ? alpha(color, 0.08) : "#ffffff",
                    transition: "all 0.18s ease",
                    "&:hover": {
                      borderColor: color,
                      bgcolor: alpha(color, 0.04),
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: isSelected ? 800 : 600,
                      color: isSelected ? color : T.textSub,
                    }}
                  >
                    {label}
                  </Typography>
                  <Box
                    sx={{
                      px: 0.7,
                      py: 0.1,
                      borderRadius: "10px",
                      bgcolor: isSelected ? alpha(color, 0.2) : T.surfaceAlt,
                      color: isSelected ? color : T.textMuted,
                      fontSize: "0.68rem",
                      fontWeight: 800,
                    }}
                  >
                    {derivedStatusCounts[key] ?? 0}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ my: 2, borderColor: T.border }} />

          {/* Search + Date Pickers Row */}
          <Grid container spacing={1.5} alignItems="center">
            {/* Search Input */}
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by plan name, description, coupon code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 18, color: T.primary }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery("")}>
                        <ClearIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                  sx: {
                    borderRadius: "10px",
                    fontSize: "0.82rem",
                    bgcolor: T.surfaceAlt,
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: T.primary },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: T.primary,
                      borderWidth: "1.5px",
                    },
                  },
                }}
              />
            </Grid>

            {/* From Date */}
            <Grid item xs={6} sm={4} md={2.5}>
              <TextField
                fullWidth
                type="date"
                size="small"
                label="From Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    fontSize: "0.82rem",
                    bgcolor: T.surfaceAlt,
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
                  },
                }}
              />
            </Grid>

            {/* To Date */}
            <Grid item xs={6} sm={4} md={2.5}>
              <TextField
                fullWidth
                type="date"
                size="small"
                label="To Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  sx: {
                    borderRadius: "10px",
                    fontSize: "0.82rem",
                    bgcolor: T.surfaceAlt,
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
                  },
                }}
              />
            </Grid>

            {/* Date Action Buttons */}
            <Grid item xs={12} sm={4} md={2}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={applyDateFilter}
                  disabled={!startDate && !endDate}
                  sx={{
                    height: 38,
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    textTransform: "none",
                    bgcolor: T.primary,
                    "&:hover": { bgcolor: T.primaryHover },
                  }}
                >
                  Apply
                </Button>

                {(appliedStart || appliedEnd) && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={clearDateFilter}
                    sx={{
                      height: 38,
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      textTransform: "none",
                      minWidth: 70,
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* ── Transactions List Area ── */}
        {historyLoading ? (
          <Box sx={{ width: "100%", py: 6, textAlign: "center" }}>
            <LinearProgress
              sx={{
                bgcolor: T.primaryPale,
                borderRadius: 2,
                height: 6,
                "& .MuiLinearProgress-bar": { bgcolor: T.primary },
              }}
            />
            <Typography sx={{ mt: 2, color: T.textMuted, fontSize: "0.85rem", fontWeight: 600 }}>
              Fetching latest transaction logs...
            </Typography>
          </Box>
        ) : sortedTransactions.length > 0 ? (
          <Paper
            elevation={0}
            sx={{
              borderRadius: "18px",
              border: `1px solid ${T.border}`,
              bgcolor: "#ffffff",
              boxShadow: "0 2px 14px rgba(16, 44, 74, 0.04)",
              overflow: "hidden",
            }}
          >
            {viewMode === "table" ? (
              /* ── TABLE VIEW ── */
              <>
                <TableContainer
                  sx={{
                    overflowX: "auto",
                    "&::-webkit-scrollbar": { height: 6 },
                    "&::-webkit-scrollbar-thumb": { bgcolor: T.borderStrong, borderRadius: 3 },
                  }}
                >
                  <Table sx={{ minWidth: 900 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: T.surfaceAlt, borderBottom: `1.5px solid ${T.border}` }}>
                        {["#", "Type", "Plan Name", "Description", "Date & Expiry", "Amount", "Coupon", "Status", "Actions"].map(
                          (h, idx) => (
                            <TableCell
                              key={h}
                              align={idx === 8 ? "right" : "left"}
                              sx={{
                                fontWeight: 800,
                                fontSize: "0.72rem",
                                color: T.textSub,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                py: 1.1,
                                px: 1.5,
                                whiteSpace: "nowrap",
                                ...(h === "Description" ? { width: 140, maxWidth: 140 } : {}),
                              }}
                            >
                              {h}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <AnimatePresence>
                        {sortedTransactions.map((transaction, index) => {
                          const expiryDate = getPlanExpiryDate(transaction);
                          return (
                            <TableRow
                              key={transaction._id || index}
                              hover
                              sx={{
                                transition: "background-color 0.15s ease",
                                "&:hover": { bgcolor: T.primaryPale },
                              }}
                            >
                              {/* # Index */}
                              <TableCell sx={{ fontSize: "0.76rem", color: T.textMuted, fontWeight: 700, px: 1.5, py: 0.9 }}>
                                {page * rowsPerPage + index + 1}
                              </TableCell>

                              {/* Type Badge */}
                              <TableCell sx={{ px: 1.5, py: 0.9 }}>
                                <TypeBadge type={transaction.type} />
                              </TableCell>

                              {/* Plan Name & Duration */}
                              <TableCell sx={{ px: 1.5, py: 0.9 }}>
                                {transaction.planId ? (
                                  <Box>
                                    <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: T.text, lineHeight: 1.25 }}>
                                      {transaction.planId.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.68rem", color: T.textMuted, fontWeight: 500, mt: 0.2 }}>
                                      {transaction.duration || transaction.planId.duration || "One-time"}
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Typography sx={{ fontSize: "0.8rem", color: T.textMuted }}>
                                    {transaction.description?.includes("Add") ? "Add-on Plan" : "Custom Plan"}
                                  </Typography>
                                )}
                              </TableCell>

                              {/* Description */}
                              <TableCell sx={{ px: 1.5, py: 0.9, width: 140, maxWidth: 140 }}>
                                <Tooltip title={transaction.description || ""}>
                                  <Typography
                                    sx={{
                                      fontSize: "0.76rem",
                                      color: T.textSub,
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      display: "block",
                                      maxWidth: 140,
                                    }}
                                  >
                                    {transaction.description || "Subscription Purchase"}
                                  </Typography>
                                </Tooltip>
                              </TableCell>

                              {/* Date & Expiry */}
                              <TableCell sx={{ px: 1.5, py: 0.9, whiteSpace: "nowrap" }}>
                                <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: T.text }}>
                                  {formatDate(transaction.createdAt)}
                                </Typography>
                                {expiryDate && (
                                  <Typography sx={{ fontSize: "0.68rem", color: T.textMuted, mt: 0.2 }}>
                                    Expires: {formatDate(expiryDate)}
                                  </Typography>
                                )}
                              </TableCell>

                              {/* Amount */}
                              <TableCell sx={{ px: 1.5, py: 0.9, whiteSpace: "nowrap" }}>
                                <Typography
                                  sx={{
                                    fontSize: "0.85rem",
                                    fontWeight: 800,
                                    color: transaction.status === "completed" ? T.emeraldDark : T.text,
                                  }}
                                >
                                  {formatAmount(transaction.amount)}
                                </Typography>
                                {transaction.discountAmount > 0 && (
                                  <Typography
                                    sx={{
                                      fontSize: "0.68rem",
                                      color: T.red,
                                      textDecoration: "line-through",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {formatAmount(transaction.originalAmount)}
                                  </Typography>
                                )}
                              </TableCell>

                              {/* Coupon Code */}
                              <TableCell sx={{ px: 1.5, py: 0.9 }}>
                                {transaction.hasCouponApplied && transaction.couponCode ? (
                                  <Tooltip title={`Saved ${formatAmount(transaction.savingsAmount || transaction.discountAmount || 0)}`}>
                                    <Box
                                      sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 0.4,
                                        px: 0.8,
                                        py: 0.2,
                                        borderRadius: "5px",
                                        bgcolor: T.amberPale,
                                        border: `1px solid ${T.amberBorder}`,
                                        color: T.amber,
                                        fontWeight: 800,
                                        fontSize: "0.68rem",
                                      }}
                                    >
                                      <CouponIcon sx={{ fontSize: 12 }} />
                                      <span>{transaction.couponCode}</span>
                                    </Box>
                                  </Tooltip>
                                ) : (
                                  <Typography sx={{ fontSize: "0.75rem", color: T.textMuted }}>—</Typography>
                                )}
                              </TableCell>

                              {/* Status Badge */}
                              <TableCell sx={{ px: 1.5, py: 0.9 }}>
                                <StatusBadge status={transaction.status} />
                              </TableCell>

                              {/* Actions */}
                              <TableCell align="right" sx={{ px: 1.5, py: 0.9, whiteSpace: "nowrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.5 }}>
                                  <Tooltip title="View Details">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleViewPaymentDetails(transaction._id)}
                                      sx={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "7px",
                                        bgcolor: T.primaryPale,
                                        color: T.primary,
                                        "&:hover": { bgcolor: T.primaryAlpha(0.18) },
                                      }}
                                    >
                                      <VisibilityIcon sx={{ fontSize: 15 }} />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="View Receipt">
                                    <IconButton
                                      size="small"
                                      onClick={() => {
                                        setSelectedTransaction(transaction);
                                        setShowReceipt(true);
                                      }}
                                      sx={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "7px",
                                        bgcolor: T.primaryPale,
                                        color: T.primary,
                                        "&:hover": { bgcolor: T.primaryAlpha(0.18) },
                                      }}
                                    >
                                      <ReceiptIcon sx={{ fontSize: 15 }} />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Table Pagination */}
                <TablePagination
                  component="div"
                  count={fullyFilteredTransactions.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{
                    borderTop: `1px solid ${T.border}`,
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: T.textSub,
                    },
                  }}
                />
              </>
            ) : (
              /* ── CARD GRID VIEW ── */
              <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Grid container spacing={2}>
                  {sortedTransactions.map((transaction, index) => {
                    const expiryDate = getPlanExpiryDate(transaction);
                    return (
                      <Grid item xs={12} sm={6} md={4} key={transaction._id || index}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2.2,
                            borderRadius: "16px",
                            border: `1.5px solid ${T.border}`,
                            bgcolor: "#ffffff",
                            transition: "all 0.2s ease",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            "&:hover": {
                              borderColor: T.primary,
                              boxShadow: "0 8px 24px rgba(16, 44, 74, 0.08)",
                              transform: "translateY(-3px)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                            <TypeBadge type={transaction.type} />
                            <StatusBadge status={transaction.status} />
                          </Box>

                          <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: T.text, mb: 0.3 }}>
                            {transaction.planId?.name || (transaction.type === "addon" ? "Add-on Plan" : "Subscription Plan")}
                          </Typography>

                          <Typography sx={{ 
                            fontSize: "0.78rem", 
                            color: T.textMuted, 
                            mb: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}>
                            {transaction.description || "No description provided"}
                          </Typography>

                          <Divider sx={{ mt: "auto", mb: 1.5, borderColor: T.border }} />

                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            <Box>
                              <Typography sx={{ fontSize: "0.7rem", color: T.textMuted, fontWeight: 600 }}>
                                {formatDate(transaction.createdAt)}
                              </Typography>
                              {expiryDate && (
                                <Typography sx={{ fontSize: "0.68rem", color: T.textMuted }}>
                                  Exp: {formatDate(expiryDate)}
                                </Typography>
                              )}
                            </Box>

                            <Box sx={{ textAlign: "right" }}>
                              <Typography sx={{ fontSize: "1.1rem", fontWeight: 900, color: T.text }}>
                                {formatAmount(transaction.amount)}
                              </Typography>
                              {transaction.discountAmount > 0 && (
                                <Typography sx={{ fontSize: "0.72rem", color: T.red, textDecoration: "line-through" }}>
                                  {formatAmount(transaction.originalAmount)}
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                            <Button
                              fullWidth
                              size="small"
                              variant="outlined"
                              startIcon={<VisibilityIcon sx={{ fontSize: 15 }} />}
                              onClick={() => handleViewPaymentDetails(transaction._id)}
                              sx={{
                                borderRadius: "8px",
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                textTransform: "none",
                                borderColor: T.border,
                                color: T.primary,
                                "&:hover": { borderColor: T.primary, bgcolor: T.primaryPale },
                              }}
                            >
                              Details
                            </Button>
                            <Button
                              fullWidth
                              size="small"
                              variant="contained"
                              startIcon={<ReceiptIcon sx={{ fontSize: 15 }} />}
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setShowReceipt(true);
                              }}
                              sx={{
                                borderRadius: "8px",
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                textTransform: "none",
                                bgcolor: T.primary,
                                "&:hover": { bgcolor: T.primaryHover },
                              }}
                            >
                              Receipt
                            </Button>
                          </Box>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Card Pagination */}
                <TablePagination
                  component="div"
                  count={fullyFilteredTransactions.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[6, 12, 24]}
                  sx={{
                    mt: 2,
                    borderTop: `1px solid ${T.border}`,
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: T.textSub,
                    },
                  }}
                />
              </Box>
            )}
          </Paper>
        ) : (
          /* ── Empty State ── */
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: "18px",
              textAlign: "center",
              bgcolor: "#ffffff",
              border: `1px solid ${T.border}`,
              boxShadow: "0 2px 12px rgba(16, 44, 74, 0.03)",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "20px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: T.primaryPale,
                color: T.primary,
                mb: 2,
              }}
            >
              <HistoryIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: T.text, mb: 0.5 }}>
              No Transactions Found
            </Typography>
            <Typography sx={{ fontSize: "0.82rem", color: T.textMuted, maxWidth: 360, mx: "auto", mb: 2 }}>
              {activeTypeTab !== "all" || activeStatus !== "all" || searchQuery || appliedStart || appliedEnd
                ? "Try adjusting your search criteria or clear active filters to view all records."
                : "Your transaction history will automatically populate here once you make plan or add-on purchases."}
            </Typography>

            {(activeTypeTab !== "all" || activeStatus !== "all" || searchQuery || appliedStart || appliedEnd) && (
              <Button
                variant="outlined"
                onClick={() => {
                  setActiveTypeTab("all");
                  setActiveStatus("all");
                  setSearchQuery("");
                  clearDateFilter();
                }}
                sx={{
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  borderColor: T.primary,
                  color: T.primary,
                  px: 2.5,
                  "&:hover": { bgcolor: T.primaryPale, borderColor: T.primary },
                }}
              >
                Reset All Filters
              </Button>
            )}
          </Paper>
        )}
      </Container>

      {/* ── Modals ── */}
      {selectedTransaction && (
        <ReceiptModal
          transaction={selectedTransaction}
          show={showReceipt}
          onHide={() => setShowReceipt(false)}
        />
      )}

      <PaymentDetailsPopup
        open={paymentPopupOpen}
        onClose={() => setPaymentPopupOpen(false)}
        paymentId={selectedPaymentId}
      />

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </Box>
  );
};

export default TransactionHistory;