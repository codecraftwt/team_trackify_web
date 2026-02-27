import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
  Chip,
  IconButton,
  Collapse,
  Box,
  Typography,
  Avatar,
  Stack,
  alpha,
  Pagination,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Receipt as ReceiptIcon,
  Info as InfoIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import { useSelector } from "react-redux";

// Payment Row Component
const PaymentRow = ({ payment, index }) => {
  const [open, setOpen] = useState(false);

  const getPlanColor = (plan) => {
    if (plan?.toLowerCase().includes("premium")) return "#8b5cf6";
    if (plan?.toLowerCase().includes("enterprise")) return "#0f766e";
    if (plan?.toLowerCase().includes("standard")) return "#f59e0b";
    return "#64748b";
  };

  const formatExpiryDate = (date) => {
    const expiryMoment = moment(date);
    const formattedDate = expiryMoment.format("DD MMM YYYY");
    const relativeTime = expiryMoment.fromNow();
    return `${formattedDate} (${relativeTime})`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const isExpired = payment.expiresAt ? moment(payment.expiresAt).isBefore(moment()) : false;

  return (
    <>
      <MuiTableRow
        sx={{
          bgcolor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
          "& > *": { borderBottom: "unset" },
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor: alpha("#0f766e", 0.02),
          },
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell width="50px" onClick={(e) => e.stopPropagation()}>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ color: "#0f766e" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #0f766e, #0a5c55)",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {payment.name?.charAt(0) || "U"}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600} color="#1e293b">
                {payment.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {payment.email}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Chip
            label={payment.plan}
            size="small"
            sx={{
              bgcolor: alpha(getPlanColor(payment.plan), 0.1),
              color: getPlanColor(payment.plan),
              fontWeight: 600,
              fontSize: "0.75rem",
            }}
          />
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CalendarIcon sx={{ color: "#64748b", fontSize: 14 }} />
            <Typography variant="body2" color="text.secondary">
              {moment(payment.date).format("DD MMM YYYY")}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <ClockIcon sx={{ color: "#64748b", fontSize: 14 }} />
            <Typography
              variant="body2"
              sx={{
                color: isExpired ? "#ef4444" : "#22c55e",
                fontWeight: 500,
              }}
            >
              {payment.expiresAt ? formatExpiryDate(payment.expiresAt) : "N/A"}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body1" fontWeight={700} sx={{ color: "#22c55e" }}>
            {formatCurrency(payment.amount)}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Chip
            label={payment.status}
            size="small"
            sx={{
              bgcolor: payment.status === "completed" 
                ? alpha("#22c55e", 0.1) 
                : alpha("#ef4444", 0.1),
              color: payment.status === "completed" ? "#22c55e" : "#ef4444",
              fontWeight: 600,
              minWidth: 90,
            }}
          />
        </TableCell>
      </MuiTableRow>

      {/* Expandable Details Row */}
      <MuiTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{
              margin: 2,
              p: 3,
              bgcolor: alpha("#f8fafc", 0.8),
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
            }}>
              <Grid container spacing={3}>
                {/* Payment Details */}
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight={600} color="#0f766e" gutterBottom>
                    <ReceiptIcon sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                    Payment Details
                  </Typography>
                  <Stack spacing={1.5} sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InfoIcon sx={{ color: "#64748b", fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                        Payment Method:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {payment.paymentMethod || "Online"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ClockIcon sx={{ color: "#64748b", fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                        Duration:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {payment.duration || "N/A"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarIcon sx={{ color: "#64748b", fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                        Expires At:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {payment.expiresAt ? moment(payment.expiresAt).format("LLL") : "N/A"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ClockIcon sx={{ color: "#64748b", fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 120 }}>
                        Remaining Days:
                      </Typography>
                      <Chip
                        label={payment.remainingDays > 0 ? `${payment.remainingDays} days` : "Expired"}
                        size="small"
                        sx={{
                          bgcolor: payment.remainingDays > 7
                            ? alpha("#22c55e", 0.1)
                            : payment.remainingDays > 0
                              ? alpha("#f59e0b", 0.1)
                              : alpha("#ef4444", 0.1),
                          color: payment.remainingDays > 7
                            ? "#22c55e"
                            : payment.remainingDays > 0
                              ? "#f59e0b"
                              : "#ef4444",
                          fontWeight: 600,
                          height: 24,
                        }}
                      />
                    </Box>
                  </Stack>
                </Grid>

                {/* Add-ons Section */}
                {payment.addOns && payment.addOns.length > 0 && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight={600} color="#0f766e" gutterBottom>
                      <MoneyIcon sx={{ fontSize: 18, mr: 0.5, verticalAlign: "middle" }} />
                      Add-ons
                    </Typography>
                    <Stack spacing={1.5} sx={{ mt: 1 }}>
                      {payment.addOns.map((addon, idx) => (
                        <Card
                          key={idx}
                          variant="outlined"
                          sx={{
                            bgcolor: "white",
                            borderRadius: 2,
                            borderColor: alpha("#e2e8f0", 0.8),
                          }}
                        >
                          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {addon.addOnDescription || `Upgrade to ${addon.addOnMaxUser} users`}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Added on {moment(addon.createdAt).format("DD MMM YYYY")}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e" }}>
                                  +{formatCurrency(addon.addOnAmount)}
                                </Typography>
                                <Chip
                                  label={addon.status}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha(
                                      addon.status === "completed" ? "#22c55e" : "#f59e0b",
                                      0.1
                                    ),
                                    color: addon.status === "completed" ? "#22c55e" : "#f59e0b",
                                    fontWeight: 600,
                                    fontSize: "0.65rem",
                                    height: 20,
                                  }}
                                />
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </MuiTableRow>
    </>
  );
};

// Empty State Component
const EmptyState = ({ searchQuery }) => (
  <Box sx={{ textAlign: "center", py: 8 }}>
    <MoneyIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
    <Typography variant="h6" color="text.secondary" gutterBottom>
      No payment data found
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {searchQuery
        ? "Try adjusting your search criteria"
        : "No transactions available"}
    </Typography>
  </Box>
);

// Main RevenueTable Component
const RevenueTable = ({
  filteredPayments,
  totalRevenue,
  searchQuery,
  page,
  handlePageChange,
}) => {
  const {
    totalPages = 1,
  } = useSelector((state) => state.payment || {});

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          overflow: "hidden",
          mb: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #0f766e, #0a5c55)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={600} color="white" gutterBottom>
              Payment History
            </Typography>
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8) }}>
              Complete breakdown of all payment transactions
            </Typography>
          </Box>
          <Chip
            label={formatCurrency(totalRevenue)}
            size="medium"
            icon={<MoneyIcon sx={{ fontSize: 14 }} />}
            sx={{
              bgcolor: "white",
              color: "#0f766e",
              fontWeight: 700,
              fontSize: "1rem",
              px: 2,
              py: 2.5,
              "& .MuiChip-icon": {
                color: "#0f766e",
              },
            }}
          />
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <MuiTableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
                <TableCell width="50px" />
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Plan</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Payment Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Expires On</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "#1e293b" }}>Amount</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: "#1e293b" }}>Status</TableCell>
              </MuiTableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {filteredPayments.map((payment, index) => (
                  <PaymentRow key={payment.id} payment={payment} index={index} />
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>

        {filteredPayments.length === 0 && <EmptyState searchQuery={searchQuery} />}
      </Paper>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => handlePageChange(value)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#64748b",
              },
              "& .Mui-selected": {
                bgcolor: "#0f766e !important",
                color: "white",
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default RevenueTable;