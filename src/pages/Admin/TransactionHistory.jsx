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
  History as HistoryIcon,
  Refresh as RefreshIcon,
  GridView as GridViewIcon,
  TableRows as TableRowsIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as PendingIcon,
  Cancel as CancelIcon,
  ArrowUpward as IncomeIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  Extension as AddonIcon,
  LocalOffer as CouponIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import ReceiptModal from "../../components/models/ReceiptModal";
import { toast } from "react-toastify";
import moment from "moment";
import PaymentDetailsPopup from "../../components/common/PaymentDetailsPopup";
import VisibilityIcon from "@mui/icons-material/Visibility";

// ─── Type Tab Config ──────────────────────────────────────────────────────────
const TYPE_TABS = [
  { key: "all", label: "All" },
  { key: "plan", label: "Plans" },
  { key: "addon", label: "Add-ons" },
];

// ─── Status Filter Config ─────────────────────────────────────────────────────
const STATUS_FILTERS = [
  { key: "all", label: "All", color: "#6366f1" },
  { key: "completed", label: "Completed", color: "#22c55e" },
  { key: "pending", label: "Pending", color: "#f59e0b" },
  { key: "cancelled", label: "Cancelled", color: "#ef4444" },
  { key: "failed", label: "Failed", color: "#9ca3af" },
];


// ─── Table Row Skeleton ───────────────────────────────────────────────────────
const TableRowSkeleton = () => {
  const theme = useTheme();
  return (
    <TableRow>
      {[25, 90, 130, 70, 70, 70, 70, 28].map((w, i) => (
        <TableCell key={i} sx={{ py: 1 }}>
          <Skeleton variant={i === 7 ? "circular" : "text"} width={w} height={i === 7 ? 28 : 18}
            sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </TableCell>
      ))}
    </TableRow>
  );
};

// ─── Card View Skeleton ───────────────────────────────────────────────────────
const CardViewSkeleton = () => {
  const theme = useTheme();
  return (
    <Stack spacing={1.5}>
      {[1, 2, 3].map((item) => (
        <Paper key={item} elevation={0} sx={{
          p: { xs: 1.5, sm: 2, md: 2.5 }, borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
          border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1),
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Box>
                <Skeleton variant="text" width={180} height={22} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={130} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Skeleton variant="text" width={90} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>
          </Box>
          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
          <Grid container spacing={1.5}>
            {[1, 2].map((g) => (
              <Grid item xs={12} sm={6} key={g}>
                <Skeleton variant="text" width={35} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                <Skeleton variant="text" width={100} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}
    </Stack>
  );
};

// ─── Header Buttons Skeleton ──────────────────────────────────────────────────
const HeaderButtonsSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant={i <= 2 ? "circular" : "rounded"}
          width={i <= 2 ? (isMobile ? 32 : 36) : (isMobile ? 85 : 100)}
          height={isMobile ? 32 : 36}
          sx={{ borderRadius: i > 2 ? 1.5 : "50%", bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      ))}
    </Box>
  );
};

// ─── Type Badge ───────────────────────────────────────────────────────────────
const TypeBadge = ({ type }) => {
  const isAddon = type === "addon";
  return (
    <Box sx={{
      display: "inline-flex", alignItems: "center", gap: 0.4,
      px: 0.8, py: 0.3, borderRadius: 1,
      bgcolor: isAddon ? alpha("#8b5cf6", 0.1) : alpha("#3b82f6", 0.1),
      border: "1px solid", borderColor: isAddon ? alpha("#8b5cf6", 0.3) : alpha("#3b82f6", 0.3),
    }}>
      {isAddon ? <AddonIcon sx={{ fontSize: 10, color: "#8b5cf6" }} /> : <ReceiptIcon sx={{ fontSize: 10, color: "#3b82f6" }} />}
      <Typography sx={{ fontSize: "0.58rem", fontWeight: 700, color: isAddon ? "#8b5cf6" : "#3b82f6", textTransform: "uppercase", letterSpacing: 0.4 }}>
        {isAddon ? "Add-on" : "Plan"}
      </Typography>
    </Box>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const TransactionHistory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});
  const userData = useSelector((state) => state.user?.userInfo || {});

  // Add these state declarations with your other useState hooks
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);

  // Add this handler function
  const handleViewPaymentDetails = (paymentId) => {
    console.log("Opening payment details for ID:", paymentId);
    setSelectedPaymentId(paymentId);
    setPaymentPopupOpen(true);
  };
  const {
    paymentHistory = [],
    historyLoading = false,
    totalItems = 0,
    totalPages = 1,
    paymentStats = { totalPayments: 0, completedCount: 0, pendingCount: 0, totalAmount: 0 },
    totalPlanAmount = 0,
    totalAddOnAmount = 0,
    statusCounts = {},
  } = useSelector((state) => state.payment || {});

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
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

  // Fetch data with full set for robust client filtering
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
    const timer = setTimeout(() => setShowFirstRenderLoader(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch, isAuthenticated]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [searchQuery, activeStatus, appliedStart, appliedEnd, activeTypeTab]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
        toast.success("Data refreshed successfully");
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

  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  const formatTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  const formatAmount = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(amount);

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: { xs: 12, sm: 14 } }} />;
    if (status === "pending") return <PendingIcon sx={{ color: theme.palette.secondary.main, fontSize: { xs: 12, sm: 14 } }} />;
    return <CancelIcon sx={{ color: "#ef4444", fontSize: { xs: 12, sm: 14 } }} />;
  };

  const getStatusColor = (status) => {
    if (status === "completed") return "#22c55e";
    if (status === "pending") return theme.palette.secondary.main;
    return "#ef4444";
  };

  // 1. Comprehensive Client-Side Filtering
  const fullyFilteredTransactions = paymentHistory?.filter((t) => {
    // Type filter
    if (activeTypeTab !== "all" && t.type !== activeTypeTab) return false;

    // Status filter
    if (activeStatus !== "all" && t.status !== activeStatus) return false;

    // Date filter
    if (appliedStart || appliedEnd) {
      const tDate = moment(t.createdAt);
      if (appliedStart && tDate.isBefore(moment(appliedStart).startOf('day'))) return false;
      if (appliedEnd && tDate.isAfter(moment(appliedEnd).endOf('day'))) return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchDesc = t.description?.toLowerCase().includes(query) || false;
      const matchPlan = t.planId?.name?.toLowerCase().includes(query) || false;
      const matchCoupon = t.couponCode?.toLowerCase().includes(query) || false;
      if (!matchDesc && !matchPlan && !matchCoupon) return false;
    }

    return true;
  }) || [];

  // 2. Client-side sorting
  const fullSortedTransactions = [...fullyFilteredTransactions].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "highest") return b.amount - a.amount;
    if (sortBy === "lowest") return a.amount - b.amount;
    return 0;
  });

  // 3. Client-side pagination
  const sortedTransactions = fullSortedTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // ── Badge counts ────────────────────────────────────────────────────────────
  // Build a "pre-type" filtered set (status + date + search only) so that the
  // type-tab badges reflect the other active filters, not the raw total.
  const preTypFiltered = paymentHistory?.filter((t) => {
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
    all: preTypFiltered.length,
    plan: preTypFiltered.filter((t) => t.type === "plan").length,
    addon: preTypFiltered.filter((t) => t.type === "addon").length,
  };

  // Build a "pre-status" filtered set (type + date + search only) so the
  // status-pill badges reflect the other active filters.
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

  // ── First render skeleton ─────────────────────────────────────────────────
  if (showFirstRenderLoader) {
    return (
      <Box sx={{ minHeight: "100vh" }}>
        <Paper elevation={0} sx={{
          py: { xs: 1.5, sm: 2, md: 2.5 },
          px: { xs: 1.5, sm: 2, md: 2.5 },
          borderRadius: 0,
          bgcolor: "transparent",
          boxShadow: "none"
        }}>
          <Container maxWidth="xl" disableGutters={isMobile}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: { xs: 36, sm: 40, md: 44 }, height: { xs: 36, sm: 40, md: 44 } }}>
                  <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
                </Avatar>
                <Box>
                  <Typography variant={isMobile ? "h6" : "h5"} fontWeight="700" gutterBottom sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" } }}>
                    Transaction History
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" } }}>View all your payment transactions</Typography>
                </Box>
              </Box>
              <HeaderButtonsSkeleton isMobile={isMobile} />
            </Box>
          </Container>
        </Paper>

        <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
          {/* Search/Filter Skeleton - No border, no background */}
          <Skeleton
            variant="rounded"
            height={52}
            sx={{
              borderRadius: 3,
              mb: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05)
            }}
          />

          {/* Filter chips skeleton - No border, no background */}
          <Skeleton
            variant="rounded"
            height={48}
            sx={{
              borderRadius: 3,
              mb: 1.5,
              bgcolor: alpha(theme.palette.primary.main, 0.05)
            }}
          />

          {/* Table Paper - No border, transparent */}
          <Paper elevation={0} sx={{
            borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
            overflow: "hidden",
            bgcolor: "transparent",
            boxShadow: "none"
          }}>
            <TableContainer>
              <Table sx={{ minWidth: isMobile ? 700 : 900 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: "transparent" }}>
                    {["#", "Type", "Plan", "Description", "Date", "Amount", "Status", "Actions"].map((h) => (
                      <TableCell key={h} sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        py: 1,
                        bgcolor: "transparent",
                        borderBottom: "none" // Remove border from header cells
                      }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => <TableRowSkeleton key={i} />)}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
      {/* Header */}
      <Paper elevation={0} sx={{ py: { xs: 0.8, sm: 1, md: 1.2 }, px: { xs: 1.5, sm: 2, md: 2.5 }, borderRadius: 0, bgcolor: "transparent" }}>
        <Container maxWidth="xl" disableGutters={isMobile}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, flexWrap: "wrap", gap: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, width: { xs: 36, sm: 40, md: 44 }, height: { xs: 36, sm: 40, md: 44 } }}>
                <HistoryIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
              </Avatar>
              <Box>
                <Typography variant={isMobile ? "h6" : "h5"} fontWeight="700" gutterBottom
                  sx={{ marginTop: 2, background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" } }}>
                  Transaction History
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" } }}>
                  View all your payment transactions
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
              <Tooltip title="Refresh">
                <IconButton onClick={refreshData} disabled={historyLoading} size="small"
                  sx={{ color: theme.palette.primary.main, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }, width: 32, height: 32 }}>
                  <RefreshIcon sx={{ animation: historyLoading ? "spin 1s linear infinite" : "none", fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                <IconButton onClick={toggleViewMode} size="small"
                  sx={{ color: theme.palette.primary.main, "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }, width: 32, height: 32 }}>
                  {viewMode === "table" ? <GridViewIcon sx={{ fontSize: 18 }} /> : <TableRowsIcon sx={{ fontSize: 18 }} />}
                </IconButton>
              </Tooltip>
              <Button variant="outlined" onClick={(e) => setSortAnchorEl(e.currentTarget)}
                startIcon={<CalendarIcon sx={{ fontSize: 14 }} />} size="small"
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.5), color: "text.secondary", fontSize: { xs: "0.6rem", sm: "0.65rem" }, height: 32,
                  "&:hover": { borderColor: theme.palette.primary.main, color: theme.palette.primary.main }
                }}>
                {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : sortBy === "highest" ? "Highest" : "Lowest"}
              </Button>
              <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={() => handleSortClose()}
                PaperProps={{ sx: { borderRadius: 1.5, mt: 1, minWidth: 120 } }}>
                {["newest", "oldest", "highest", "lowest"].map((s) => (
                  <MenuItem key={s} onClick={() => handleSortClose(s)} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, textTransform: "capitalize" }}>{s}</MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Stats Cards - ONLY 3 CARDS */}
      {/* Type Tabs + Status Filters + Search */}
      <Container maxWidth="xl" sx={{ mt: 2, pb: 1.5, px: { xs: 1, sm: 1.5, md: 2 } }}>
        {/* Type Tabs */}
        <Paper elevation={0} sx={{ p: 0.7, borderRadius: 2.5, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1.2, display: "flex", gap: 0.5 }}>
          {TYPE_TABS.map(({ key, label }) => (
            <Box key={key} onClick={() => setActiveTypeTab(key)} sx={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.8,
              py: 0.8, px: { xs: 0.5, sm: 1.5 }, borderRadius: 1.8, cursor: "pointer", transition: "all 0.2s",
              bgcolor: activeTypeTab === key ? theme.palette.primary.main : "transparent",
              color: activeTypeTab === key ? "#fff" : "text.secondary",
              "&:hover": { bgcolor: activeTypeTab === key ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.06) },
            }}>
              <Typography sx={{ fontSize: { xs: "0.65rem", sm: "0.72rem" }, fontWeight: 700 }}>{label}</Typography>
              <Box sx={{ px: 0.7, py: 0.15, borderRadius: 10, bgcolor: activeTypeTab === key ? alpha("#fff", 0.25) : alpha(theme.palette.primary.main, 0.1), minWidth: 18, textAlign: "center" }}>
                <Typography sx={{ fontSize: "0.58rem", fontWeight: 800, color: activeTypeTab === key ? "#fff" : theme.palette.primary.main }}>
                  {typeCounts[key]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Status Pills + Search + Date Range */}
        <Paper elevation={0} sx={{ p: { xs: 1.2, sm: 1.5 }, borderRadius: 2.5, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1.5 }}>
          {/* Status pills */}
          <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap", mb: 1.2 }}>
            {STATUS_FILTERS.map(({ key, label, color }) => (
              <Box key={key} onClick={() => setActiveStatus(key)} sx={{
                display: "flex", alignItems: "center", gap: 0.5, px: 1.1, py: 0.45,
                borderRadius: 10, cursor: "pointer", border: "1.5px solid", transition: "all 0.18s",
                borderColor: activeStatus === key ? color : alpha(color, 0.25),
                bgcolor: activeStatus === key ? alpha(color, 0.1) : "transparent",
              }}>
                <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, fontWeight: 700, color: activeStatus === key ? color : "text.secondary" }}>{label}</Typography>
                <Box sx={{ px: 0.6, py: 0.15, borderRadius: 10, bgcolor: activeStatus === key ? alpha(color, 0.2) : alpha("#000", 0.06) }}>
                  <Typography sx={{ fontSize: "0.56rem", fontWeight: 800, color: activeStatus === key ? color : "text.secondary" }}>
                    {derivedStatusCounts[key] ?? 0}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Search and Date Range */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <TextField
              placeholder="Search by plan, description, coupon…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ flex: 1, minWidth: 180, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.72rem" } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 15, color: "text.secondary" }} /></InputAdornment>,
                endAdornment: searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery("")}><ClearIcon sx={{ fontSize: 13 }} /></IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              size="small"
              label="From"
              InputLabelProps={{ shrink: true }}
              sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.72rem" } }}
            />
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              size="small"
              label="To"
              InputLabelProps={{ shrink: true }}
              sx={{ width: { xs: "100%", sm: 150 }, "& .MuiOutlinedInput-root": { borderRadius: 2, fontSize: "0.72rem" } }}
            />
            <Button size="small" variant="contained" onClick={applyDateFilter} disabled={!startDate && !endDate}
              sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>
              Apply
            </Button>
            {(appliedStart || appliedEnd) && (
              <Button size="small" variant="outlined" color="error" onClick={clearDateFilter}
                sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", px: 1.5, height: 36 }}>
                Clear
              </Button>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Transactions List */}
      <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 1, sm: 1.5, md: 2 } }}>
        {historyLoading ? (
          <Box sx={{ width: "100%", mt: 3 }}>
            <LinearProgress sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), "& .MuiLinearProgress-bar": { bgcolor: theme.palette.primary.main } }} />
            <Typography textAlign="center" sx={{ mt: 1.5 }} color="text.secondary" fontSize={{ xs: "0.7rem", sm: "0.75rem" }}>Loading transactions...</Typography>
          </Box>
        ) : sortedTransactions.length > 0 ? (
          <Paper elevation={0} sx={{ borderRadius: { xs: 1.5, sm: 2, md: 2.5 }, border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1), overflow: "hidden" }}>
            {viewMode === "table" ? (
              <>
                <TableContainer sx={{
                  overflowX: "auto", maxHeight: { xs: "450px", sm: "500px", md: "550px" },
                  "&::-webkit-scrollbar": { width: "4px", height: "4px" },
                  "&::-webkit-scrollbar-thumb": { backgroundColor: alpha(theme.palette.primary.main, 0.3), borderRadius: "2px" },
                }}>
                  <Table sx={{ minWidth: isMobile ? 750 : isTablet ? 850 : 950 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        {["#", "Type", "Plan", "Description", "Date", "Amount", "Coupon", "Status", "Actions"].map((h) => (
                          <TableCell key={h} sx={{ fontWeight: 600, fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: theme.palette.primary.main, py: 1.5, whiteSpace: "nowrap" }}>{h}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {sortedTransactions.map((transaction, index) => (
                          <motion.tr key={transaction._id || index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                            <TableCell sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, py: 1.2, color: "text.disabled" }}>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <TypeBadge type={transaction.type} />
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              {transaction.planId ? (
                                <Box>
                                  <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.primary" }}>
                                    {transaction.planId.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } }}>
                                    {transaction.duration || transaction.planId.duration}
                                  </Typography>
                                </Box>
                              ) : "—"}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.primary", maxWidth: 160 }}>
                                {transaction.description?.substring(0, 35) || `Payment for ${transaction.planId?.name || "Plan"}`}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" }, color: "text.primary" }}>
                                {formatDate(transaction.createdAt)}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                {formatTime(transaction.createdAt)}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Typography variant="body2" fontWeight={600} sx={{ color: transaction.status === "completed" ? "#22c55e" : theme.palette.primary.main, fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" } }}>
                                {formatAmount(transaction.amount)}
                              </Typography>
                              {transaction.discountAmount > 0 && (
                                <Typography sx={{ fontSize: "0.55rem", color: "#ef4444", textDecoration: "line-through" }}>
                                  {formatAmount(transaction.originalAmount)}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              {transaction.hasCouponApplied && transaction.couponCode ? (
                                <Tooltip title={`Saved ${formatAmount(transaction.savingsAmount || 0)}`}>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                                    <CouponIcon sx={{ fontSize: 11, color: "#f59e0b" }} />
                                    <Typography sx={{ fontSize: "0.58rem", color: "#f59e0b", fontWeight: 700 }}>{transaction.couponCode}</Typography>
                                  </Box>
                                </Tooltip>
                              ) : (
                                <Typography sx={{ fontSize: "0.6rem", color: "text.disabled" }}>—</Typography>
                              )}
                            </TableCell>
                            <TableCell sx={{ py: 1.2 }}>
                              <Chip icon={getStatusIcon(transaction.status)} label={transaction.status} size="small"
                                sx={{
                                  bgcolor: alpha(getStatusColor(transaction.status), 0.1), color: getStatusColor(transaction.status), fontWeight: 600,
                                  fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" }, height: { xs: 22, sm: 24 },
                                  "& .MuiChip-icon": { fontSize: { xs: 12, sm: 13 } }
                                }} />
                            </TableCell>
                            <TableCell align="right" sx={{ py: 1.2 }}>
                              <Tooltip title="View Details">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewPaymentDetails(transaction._id);
                                  }}
                                  sx={{
                                    color: theme.palette.primary.main,
                                    width: 30,
                                    height: 30,
                                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                                  }}
                                >
                                  <VisibilityIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View Receipt">
                                <IconButton size="small" onClick={() => { setSelectedTransaction(transaction); setShowReceipt(true); }}
                                  sx={{ color: theme.palette.primary.main, width: 30, height: 30 }}>
                                  <ReceiptIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Pagination for table view */}
                <TablePagination
                  component="div"
                  count={fullyFilteredTransactions.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{
                    borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1),
                    ".MuiTablePagination-select": { borderRadius: 1.5, fontSize: { xs: "0.6rem", sm: "0.65rem" } },
                    ".MuiTablePagination-displayedRows": { fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } },
                    ".MuiTablePagination-selectLabel": { fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } },
                  }}
                />
              </>
            ) : (
              <Box sx={{ p: { xs: 1.2, sm: 1.5 } }}>
                <Stack spacing={1.5}>
                  <AnimatePresence>
                    {sortedTransactions.map((transaction, index) => (
                      <motion.div key={transaction._id || index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                        <Paper elevation={0} sx={{
                          p: { xs: 1.5, sm: 2 }, borderRadius: { xs: 1.5, sm: 2 }, border: "1px solid",
                          borderColor: alpha(theme.palette.primary.main, 0.1), transition: "all 0.2s ease",
                          "&:hover": { borderColor: theme.palette.primary.main, boxShadow: `0 6px 15px -6px ${alpha(theme.palette.primary.main, 0.3)}` },
                        }}>
                          {/* Card content */}
                          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, mb: 1.5, gap: 0.8 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                              <Avatar sx={{
                                bgcolor: transaction.type === "addon" ? alpha("#8b5cf6", 0.1) : alpha(theme.palette.primary.main, 0.1),
                                color: transaction.type === "addon" ? "#8b5cf6" : theme.palette.primary.main,
                                width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 },
                              }}>
                                {transaction.type === "addon" ? <AddonIcon sx={{ fontSize: 18 }} /> : <IncomeIcon sx={{ fontSize: 18 }} />}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.3, flexWrap: "wrap" }}>
                                  <TypeBadge type={transaction.type} />
                                </Box>
                                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" }, wordBreak: "break-word", color: "text.primary" }}>
                                  {transaction.description?.substring(0, 40) || `Payment for ${transaction.planId?.name || "Plan"}`}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" } }}>
                                  <CalendarIcon sx={{ fontSize: 10, mr: 0.3, verticalAlign: "middle", color: theme.palette.primary.main }} />
                                  {formatDate(transaction.createdAt)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ textAlign: "right", width: { xs: "100%", sm: "auto" }, mt: { xs: 0.5, sm: 0 } }}>
                              <Typography variant="body1" fontWeight={700} sx={{ color: transaction.status === "completed" ? "#22c55e" : theme.palette.primary.main, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                                {formatAmount(transaction.amount)}
                              </Typography>
                              {transaction.discountAmount > 0 && (
                                <Typography sx={{ fontSize: "0.58rem", color: "#ef4444", textDecoration: "line-through" }}>
                                  {formatAmount(transaction.originalAmount)}
                                </Typography>
                              )}
                              <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end", mt: 0.5, alignItems: "center" }}>
                                <Chip icon={getStatusIcon(transaction.status)} label={transaction.status} size="small"
                                  sx={{ bgcolor: alpha(getStatusColor(transaction.status), 0.1), color: getStatusColor(transaction.status), fontWeight: 600, fontSize: { xs: "0.55rem", sm: "0.6rem" }, height: { xs: 20, sm: 22 } }} />

                                {/* Action Buttons Container */}
                                <Box sx={{ display: "flex", gap: 0.3, ml: 0.5 }}>
                                  {/* Eye Icon - View Details */}
                                  <Tooltip title="View Details">
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleViewPaymentDetails(transaction._id);
                                      }}
                                      sx={{
                                        color: theme.palette.primary.main,
                                        width: 26,
                                        height: 26,
                                        p: 0,
                                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                                      }}
                                    >
                                      <VisibilityIcon sx={{ fontSize: 15 }} />
                                    </IconButton>
                                  </Tooltip>

                                  {/* Receipt Icon - View Receipt */}
                                  <Tooltip title="View Receipt">
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTransaction(transaction);
                                        setShowReceipt(true);
                                      }}
                                      sx={{
                                        color: theme.palette.primary.main,
                                        width: 26,
                                        height: 26,
                                        p: 0,
                                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                                      }}
                                    >
                                      <ReceiptIcon sx={{ fontSize: 15 }} />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
                          <Grid container spacing={1.5}>
                            {transaction.planId && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>Plan</Typography>
                                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.primary" }}>
                                  {transaction.planId.name} {(transaction.duration || transaction.planId.duration) ? `(${transaction.duration || transaction.planId.duration})` : ""}
                                </Typography>
                              </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                              <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>Payment Method</Typography>
                              <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "text.primary" }}>
                                {transaction.paymentMethod || "—"}
                              </Typography>
                            </Grid>
                            {transaction.hasCouponApplied && transaction.couponCode && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>Coupon Applied</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <CouponIcon sx={{ fontSize: 12, color: "#f59e0b" }} />
                                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: "#f59e0b" }}>
                                    {transaction.couponCode} · Saved {formatAmount(transaction.savingsAmount || 0)}
                                  </Typography>
                                </Box>
                              </Grid>
                            )}
                            {transaction.expiresAt && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: "0.55rem", sm: "0.6rem" } }}>
                                  {transaction.isExpired ? "Expired" : `Expires · ${transaction.remainingDays}d left`}
                                </Typography>
                                <Typography variant="body2" fontWeight={500} sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, color: transaction.isExpired ? "#ef4444" : "text.primary" }}>
                                  {formatDate(transaction.expiresAt)}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Paper>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Stack>
                {/* Pagination for card view */}
                <TablePagination
                  component="div"
                  count={fullyFilteredTransactions.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{
                    borderTop: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1),
                    ".MuiTablePagination-select": { borderRadius: 1.5, fontSize: { xs: "0.6rem", sm: "0.65rem" } },
                    ".MuiTablePagination-displayedRows": { fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } },
                    ".MuiTablePagination-selectLabel": { fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" } },
                  }}
                />
              </Box>

            )}


          </Paper>
        ) : (
          <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3, md: 4 }, borderRadius: { xs: 1.5, sm: 2, md: 2.5 }, textAlign: "center", border: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
            <HistoryIcon sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
            <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>No transactions found</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" } }}>
              {activeTypeTab !== "all" || activeStatus !== "all" || searchQuery
                ? "Try adjusting your filters"
                : "Your transaction history will appear here after making payments"}
            </Typography>
          </Paper>
        )}
      </Container>

      {selectedTransaction && (
        <ReceiptModal transaction={selectedTransaction} show={showReceipt} onHide={() => setShowReceipt(false)} />
      )}
      {/* Payment Details Popup */}
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