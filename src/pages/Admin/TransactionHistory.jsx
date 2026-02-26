import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
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
  Collapse,
  Alert,
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
  ArrowDownward as ExpenseIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import ReceiptModal from "../../components/models/ReceiptModal";
import { PaginationBottom } from "../../components/PaginationBottom";
import { toast } from "react-toastify";

const TransactionHistory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated || false);
  const authUser = useSelector((state) => state.auth?.user || {});
  const userData = useSelector((state) => state.user?.userInfo || {});
  
  const {
    paymentHistory = [],
    historyLoading = false,
    historyError = null,
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    paymentStats = {
      totalPayments: 0,
      completedCount: 0,
      pendingCount: 0,
      totalAmount: 0,
    },
  } = useSelector((state) => state.payment || {});

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [expandedAddOns, setExpandedAddOns] = useState({});
  const [viewMode, setViewMode] = useState("table");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (isAuthenticated) {
      const adminId = authUser._id || authUser.id || userData?._id;
      if (adminId) {
        dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
      }
    }
  }, [dispatch, isAuthenticated, authUser, userData, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleAddOns = (transactionId) => {
    setExpandedAddOns((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "card" ? "table" : "card");
  };

  const refreshData = () => {
    if (isAuthenticated) {
      const adminId = authUser._id || authUser.id || userData?._id;
      if (adminId) {
        dispatch(getPaymentHistory({ adminId, page: page + 1, limit: rowsPerPage }));
        toast.success("Data refreshed successfully");
      }
    }
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (value) => {
    if (value) {
      setFilter(value);
    }
    setFilterAnchorEl(null);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (value) => {
    if (value) {
      setSortBy(value);
    }
    setSortAnchorEl(null);
  };

  const filteredTransactions = paymentHistory?.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.status === filter;
  });

  const sortedTransactions = [...(filteredTransactions || [])].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === "highest") return b.amount - a.amount;
    if (sortBy === "lowest") return a.amount - b.amount;
    return 0;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon sx={{ color: "#22c55e", fontSize: 16 }} />;
      case "pending":
        return <PendingIcon sx={{ color: "#f59e0b", fontSize: 16 }} />;
      default:
        return <CancelIcon sx={{ color: "#ef4444", fontSize: 16 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#22c55e";
      case "pending":
        return "#f59e0b";
      default:
        return "#ef4444";
    }
  };

  const statCards = [
    {
      label: "Total Transactions",
      value: paymentStats.totalPayments || 0,
      icon: <HistoryIcon />,
      color: "#0f766e",
    },
    {
      label: "Completed",
      value: paymentStats.completedCount || 0,
      icon: <CheckCircleIcon />,
      color: "#22c55e",
    },
    {
      label: "Pending",
      value: paymentStats.pendingCount || 0,
      icon: <PendingIcon />,
      color: "#f59e0b",
    },
    {
      label: "Total Amount",
      value: formatAmount(paymentStats.totalAmount || 0),
      icon: <IncomeIcon />,
      color: "#0f766e",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          py: 3,
          px: 3,
          borderBottom: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          borderRadius: 0,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: alpha("#0f766e", 0.1),
                  color: "#0f766e",
                  width: 50,
                  height: 50,
                }}
              >
                <HistoryIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ color: "#0f766e" }}>
                  Transaction History
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View all your payment transactions
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Refresh">
                <IconButton
                  onClick={refreshData}
                  disabled={historyLoading}
                  sx={{
                    color: "#0f766e",
                    "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
                  }}
                >
                  <RefreshIcon sx={{ animation: historyLoading ? "spin 1s linear infinite" : "none" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title={viewMode === "table" ? "Card View" : "Table View"}>
                <IconButton
                  onClick={toggleViewMode}
                  sx={{
                    color: "#0f766e",
                    "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
                  }}
                >
                  {viewMode === "table" ? <GridViewIcon /> : <TableRowsIcon />}
                </IconButton>
              </Tooltip>

              <Button
                variant="outlined"
                onClick={handleFilterClick}
                startIcon={<PendingIcon />}
                sx={{
                  borderColor: "#e2e8f0",
                  color: "#64748b",
                  "&:hover": {
                    borderColor: "#0f766e",
                    color: "#0f766e",
                  },
                }}
              >
                Filter: {filter}
              </Button>

              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => handleFilterClose()}
                PaperProps={{
                  sx: { borderRadius: 2, mt: 1, minWidth: 150 },
                }}
              >
                <MenuItem onClick={() => handleFilterClose("all")}>All</MenuItem>
                <MenuItem onClick={() => handleFilterClose("completed")}>Completed</MenuItem>
                <MenuItem onClick={() => handleFilterClose("pending")}>Pending</MenuItem>
              </Menu>

              <Button
                variant="outlined"
                onClick={handleSortClick}
                startIcon={<CalendarIcon />}
                sx={{
                  borderColor: "#e2e8f0",
                  color: "#64748b",
                  "&:hover": {
                    borderColor: "#0f766e",
                    color: "#0f766e",
                  },
                }}
              >
                Sort: {sortBy}
              </Button>

              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => handleSortClose()}
                PaperProps={{
                  sx: { borderRadius: 2, mt: 1, minWidth: 150 },
                }}
              >
                <MenuItem onClick={() => handleSortClose("newest")}>Newest First</MenuItem>
                <MenuItem onClick={() => handleSortClose("oldest")}>Oldest First</MenuItem>
                <MenuItem onClick={() => handleSortClose("highest")}>Highest Amount</MenuItem>
                <MenuItem onClick={() => handleSortClose("lowest")}>Lowest Amount</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Paper>

      {/* Stats Cards */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: alpha(stat.color, 0.2),
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} sx={{ color: stat.color, mt: 1 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: alpha(stat.color, 0.1),
                        color: stat.color,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Transactions List */}
      <Container maxWidth="xl" sx={{ pb: 4 }}>
        {historyLoading ? (
          <Box sx={{ width: "100%", mt: 4 }}>
            <LinearProgress sx={{ bgcolor: alpha("#0f766e", 0.1), "& .MuiLinearProgress-bar": { bgcolor: "#0f766e" } }} />
            <Typography textAlign="center" sx={{ mt: 2 }} color="text.secondary">
              Loading transactions...
            </Typography>
          </Box>
        ) : sortedTransactions.length > 0 ? (
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              overflow: "hidden",
            }}
          >
            {viewMode === "table" ? (
              <>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
                        <TableCell>Sr. No</TableCell>
                        <TableCell>Plan</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Payment</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {sortedTransactions.map((transaction, index) => (
                          <motion.tr
                            key={transaction._id || index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                            <TableCell>
                              {transaction.planId ? (
                                <Box>
                                  <Typography variant="body2" fontWeight={500}>
                                    {transaction.planId.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {transaction.planId.duration}
                                  </Typography>
                                </Box>
                              ) : "-"}
                            </TableCell>
                            <TableCell>
                              {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2">{formatDate(transaction.createdAt)}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatTime(transaction.createdAt)}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{ color: transaction.amount > 0 ? "#22c55e" : "#ef4444" }}
                              >
                                {formatAmount(transaction.amount)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={getStatusIcon(transaction.status)}
                                label={transaction.status}
                                size="small"
                                sx={{
                                  bgcolor: alpha(getStatusColor(transaction.status), 0.1),
                                  color: getStatusColor(transaction.status),
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                }}
                              />
                            </TableCell>
                            <TableCell>{transaction.paymentMethod || "-"}</TableCell>
                            <TableCell align="right">
                              <Tooltip title="View Receipt">
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedTransaction(transaction);
                                    setShowReceipt(true);
                                  }}
                                  sx={{ color: "#0f766e" }}
                                >
                                  <ReceiptIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={totalItems}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{
                    borderTop: "1px solid",
                    borderColor: alpha("#e2e8f0", 0.5),
                  }}
                />
              </>
            ) : (
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <AnimatePresence>
                    {sortedTransactions.map((transaction, index) => (
                      <motion.div
                        key={transaction._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: alpha("#e2e8f0", 0.5),
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              borderColor: "#0f766e",
                              boxShadow: "0 8px 20px -8px rgba(15, 118, 110, 0.3)",
                            },
                          }}
                          onClick={() => {
                            setSelectedTransaction(transaction);
                            setShowReceipt(true);
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar
                                sx={{
                                  bgcolor: transaction.amount > 0 ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
                                  color: transaction.amount > 0 ? "#22c55e" : "#ef4444",
                                }}
                              >
                                {transaction.amount > 0 ? <IncomeIcon /> : <ExpenseIcon />}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {transaction.description || `Payment for ${transaction.planId?.name || "Plan"}`}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  <CalendarIcon sx={{ fontSize: 12, mr: 0.5 }} />
                                  {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ textAlign: "right" }}>
                              <Typography variant="h6" fontWeight={700} sx={{ color: "#0f766e" }}>
                                {formatAmount(transaction.amount)}
                              </Typography>
                              <Chip
                                icon={getStatusIcon(transaction.status)}
                                label={transaction.status}
                                size="small"
                                sx={{
                                  mt: 0.5,
                                  bgcolor: alpha(getStatusColor(transaction.status), 0.1),
                                  color: getStatusColor(transaction.status),
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                }}
                              />
                            </Box>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          <Grid container spacing={2}>
                            {transaction.planId && (
                              <Grid item xs={12} sm={6}>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Plan
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {transaction.planId.name} ({transaction.planId.duration})
                                </Typography>
                              </Grid>
                            )}
                            <Grid item xs={12} sm={6}>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Payment Method
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {transaction.paymentMethod || "-"}
                              </Typography>
                            </Grid>
                          </Grid>

                          {transaction.addOns && transaction.addOns.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Button
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAddOns(transaction._id);
                                }}
                                endIcon={expandedAddOns[transaction._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                sx={{ color: "#0f766e" }}
                              >
                                {transaction.addOns.length} Add-on(s)
                              </Button>
                              <Collapse in={expandedAddOns[transaction._id]}>
                                <Box sx={{ mt: 2, p: 2, bgcolor: alpha("#f8fafc", 0.5), borderRadius: 2 }}>
                                  {transaction.addOns.map((addOn, idx) => (
                                    <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                      <Typography variant="body2">Upgrade to {addOn.addOnMaxUser} users</Typography>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e" }}>
                                          +{formatAmount(addOn.addOnAmount)}
                                        </Typography>
                                        <Chip
                                          label={addOn.status}
                                          size="small"
                                          sx={{
                                            bgcolor: alpha(getStatusColor(addOn.status), 0.1),
                                            color: getStatusColor(addOn.status),
                                            fontSize: "0.65rem",
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </Collapse>
                            </Box>
                          )}
                        </Paper>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setPage(page + 1)}
                    disabled={(page + 1) * rowsPerPage >= totalItems}
                    sx={{
                      borderColor: "#0f766e",
                      color: "#0f766e",
                      "&:hover": {
                        borderColor: "#0a5c55",
                        bgcolor: alpha("#0f766e", 0.1),
                      },
                    }}
                  >
                    Load More
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 3,
              textAlign: "center",
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
            }}
          >
            <HistoryIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No transactions found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your transaction history will appear here after making payments
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Receipt Modal */}
      {selectedTransaction && (
        <ReceiptModal
          transaction={selectedTransaction}
          show={showReceipt}
          onHide={() => setShowReceipt(false)}
        />
      )}

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

export default TransactionHistory;