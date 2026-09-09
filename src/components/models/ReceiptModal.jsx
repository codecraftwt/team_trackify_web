import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Paper,
  Stack,
  alpha,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {
  CloseRounded as CloseIcon,
  PrintRounded as PrintIcon,
  ReceiptLongRounded as ReceiptIcon,
  CheckCircleRounded as CheckCircleIcon,
  HourglassEmptyRounded as PendingIcon,
  CancelRounded as CancelIcon,
  ErrorOutlineRounded as ErrorIcon,
  LocalOfferRounded as CouponIcon,
  CreditCardRounded as CardIcon,
  ExtensionRounded as AddonIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

// ── Theme Design Tokens ────────────────────────────────────────────────────────
const T = {
  primary: "#102C4A",
  primaryHover: "#0b1e33",
  primaryPale: "rgba(16, 44, 74, 0.06)",
  primaryAlpha: (o) => `rgba(16, 44, 74, ${o})`,

  emerald: "#059669",
  emeraldDark: "#047857",
  emeraldPale: "rgba(5, 150, 105, 0.08)",
  emeraldBorder: "rgba(5, 150, 105, 0.25)",

  amber: "#d97706",
  amberPale: "rgba(217, 119, 6, 0.08)",
  amberBorder: "rgba(217, 119, 6, 0.25)",

  red: "#dc2626",
  redPale: "rgba(220, 38, 38, 0.08)",
  redBorder: "rgba(220, 38, 38, 0.25)",

  slate: "#64748b",
  slatePale: "rgba(100, 116, 139, 0.08)",
  slateBorder: "rgba(100, 116, 139, 0.2)",

  bg: "#f8fafc",
  surfaceAlt: "#f1f5f9",
  border: "#e2e8f0",
  text: "#0f172a",
  textSub: "#334155",
  textMuted: "#64748b",
};

const statusConfig = {
  completed: {
    color: T.emerald,
    bg: T.emeraldPale,
    border: T.emeraldBorder,
    Icon: CheckCircleIcon,
    label: "Completed",
  },
  failed: {
    color: T.red,
    bg: T.redPale,
    border: T.redBorder,
    Icon: ErrorIcon,
    label: "Failed",
  },
  cancelled: {
    color: T.red,
    bg: T.redPale,
    border: T.redBorder,
    Icon: CancelIcon,
    label: "Cancelled",
  },
  pending: {
    color: T.amber,
    bg: T.amberPale,
    border: T.amberBorder,
    Icon: PendingIcon,
    label: "Pending",
  },
  default: {
    color: T.slate,
    bg: T.slatePale,
    border: T.slateBorder,
    Icon: PendingIcon,
    label: "Unknown",
  },
};

const ReceiptModal = ({ transaction, show, onHide }) => {
  const theme = useTheme();
  const receiptRef = useRef();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { paymentHistory = [] } = useSelector((state) => state.payment || {});

  const getParentPlan = (tObj) => {
    if (tObj && tObj.type === "addon" && tObj.parentPaymentId) {
      const parentId =
        typeof tObj.parentPaymentId === "object"
          ? tObj.parentPaymentId._id || tObj.parentPaymentId.id
          : tObj.parentPaymentId;
      return paymentHistory?.find((t) => t._id === parentId) || null;
    }
    return null;
  };

  const getExpiryDetails = (tObj) => {
    if (!tObj) return {};
    const parentPlan = getParentPlan(tObj);
    return {
      expiryDate: parentPlan?.expiresAt || tObj.expiresAt,
      isExpired: parentPlan ? parentPlan.isExpired : tObj.isExpired,
      remainingDays: parentPlan ? parentPlan.remainingDays : tObj.remainingDays,
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
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
    }).format(amount || 0);
  };

  const getTotalAmount = () => {
    const successfulAddOns =
      transaction?.addOns?.filter((addOn) => addOn.status === "completed") || [];
    const totalAddOnAmount = successfulAddOns.reduce(
      (sum, addOn) => sum + (addOn.addOnAmount || 0),
      0
    );
    return (transaction?.amount || 0) + totalAddOnAmount;
  };

  const statusKey = (transaction?.status || "").toLowerCase();
  const statusCfg = statusConfig[statusKey] || statusConfig.default;
  const StatusIcon = statusCfg.Icon;
  const isAddon = transaction?.type === "addon";

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=850,height=750");
    const total = getTotalAmount();
    const expiryDetails = getExpiryDetails(transaction);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt - ${transaction?.razorpayOrderId || transaction?._id || "Receipt"}</title>
          <meta charset="utf-8" />
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              padding: 40px 30px;
              background: #ffffff;
              color: #0f172a;
              line-height: 1.5;
            }
            .receipt-container {
              max-width: 650px;
              margin: 0 auto;
              border: 1px solid #e2e8f0;
              border-radius: 16px;
              padding: 28px 32px;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 20px;
              margin-bottom: 20px;
            }
            .brand-name {
              font-size: 20px;
              font-weight: 800;
              color: #102C4A;
              letter-spacing: -0.02em;
            }
            .receipt-title {
              font-size: 13px;
              font-weight: 600;
              color: #64748b;
              margin-top: 2px;
            }
            .status-badge {
              display: inline-flex;
              align-items: center;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              background: ${statusCfg.bg};
              color: ${statusCfg.color};
              border: 1px solid ${statusCfg.border};
            }
            .meta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px 20px;
              margin-bottom: 20px;
              padding: 14px 16px;
              background: #f8fafc;
              border-radius: 10px;
            }
            .meta-item { display: flex; flex-direction: column; }
            .meta-label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; }
            .meta-value { font-size: 12.5px; font-weight: 600; color: #0f172a; font-family: monospace; }
            .section-title {
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #102C4A;
              margin-bottom: 10px;
            }
            .line-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 0;
              border-bottom: 1px dashed #e2e8f0;
              font-size: 13px;
            }
            .item-title { font-weight: 700; color: #0f172a; }
            .item-subtitle { font-size: 11.5px; color: #64748b; }
            .item-amount { font-weight: 700; color: #0f172a; text-align: right; }
            .total-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-top: 14px;
              margin-top: 10px;
              border-top: 2px solid #0f172a;
            }
            .total-label { font-size: 14px; font-weight: 800; color: #0f172a; }
            .total-amount { font-size: 20px; font-weight: 900; color: #059669; }
            .footer {
              text-align: center;
              margin-top: 24px;
              padding-top: 16px;
              border-top: 1px solid #e2e8f0;
              font-size: 11px;
              color: #94a3b8;
            }
            @media print {
              body { padding: 0; }
              .receipt-container { border: none; padding: 0; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <div>
                <div class="brand-name">TeamTrackify</div>
                <div class="receipt-title">${isAddon ? "Add-On Payment Receipt" : "Subscription Receipt"}</div>
              </div>
              <div class="status-badge">${statusCfg.label}</div>
            </div>

            <div class="meta-grid">
              <div class="meta-item">
                <span class="meta-label">Receipt / Order ID</span>
                <span class="meta-value">${transaction?.razorpayOrderId || transaction?.receipt || transaction?._id}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Date & Time</span>
                <span class="meta-value" style="font-family: inherit;">${formatDate(transaction?.createdAt)} • ${formatTime(transaction?.createdAt)}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Payment Method</span>
                <span class="meta-value" style="font-family: inherit;">${transaction?.paymentMethod || "Online (Razorpay)"}</span>
              </div>
              <div class="meta-item">
                <span class="meta-label">Expiry Date</span>
                <span class="meta-value" style="font-family: inherit;">${expiryDetails.expiryDate ? formatDate(expiryDetails.expiryDate) : "—"}</span>
              </div>
            </div>

            <div class="section-title">Billing Summary</div>
            <div class="line-item">
              <div>
                <div class="item-title">${transaction.planId?.name || (isAddon ? "Add-on Plan" : "Custom Plan")}</div>
                <div class="item-subtitle">${transaction.description || "Subscription Purchase"}</div>
              </div>
              <div class="item-amount">${formatAmount(transaction.amount)}</div>
            </div>

            ${
              transaction.addOns && transaction.addOns.filter((a) => a.status === "completed").length > 0
                ? transaction.addOns
                    .filter((a) => a.status === "completed")
                    .map(
                      (a) => `
                <div class="line-item">
                  <div>
                    <div class="item-title">Upgrade to ${a.addOnMaxUser} Users</div>
                    <div class="item-subtitle">Add-on Capacity</div>
                  </div>
                  <div class="item-amount" style="color: #059669;">+${formatAmount(a.addOnAmount)}</div>
                </div>`
                    )
                    .join("")
                : ""
            }

            <div class="total-row">
              <div class="total-label">Total Amount Paid</div>
              <div class="total-amount">${formatAmount(total)}</div>
            </div>

            <div class="footer">
              Thank you for your payment! • Generated electronically, no signature required.
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); setTimeout(() => window.close(), 600); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!transaction) return null;

  const expiryDetails = getExpiryDetails(transaction);
  const totalAmount = getTotalAmount();

  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={onHide}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            elevation: 16,
            sx: {
              borderRadius: "20px",
              overflow: "hidden",
              border: `1px solid ${T.border}`,
              bgcolor: "#ffffff",
              m: { xs: 1.5, sm: 2 },
              maxHeight: "92vh",
            },
          }}
        >
          {/* ── Dialog Header ── */}
          <DialogTitle
            sx={{
              bgcolor: "#ffffff",
              borderBottom: `1px solid ${T.border}`,
              py: 1.8,
              px: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: T.primaryPale,
                  color: T.primary,
                }}
              >
                <ReceiptIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.95rem", fontWeight: 800, color: T.text, lineHeight: 1.2 }}>
                  Transaction Receipt
                </Typography>
                <Typography sx={{ fontSize: "0.68rem", color: T.textMuted, fontWeight: 500 }}>
                  Official billing confirmation
                </Typography>
              </Box>
            </Box>

            <Tooltip title="Close">
              <IconButton
                onClick={onHide}
                size="small"
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "8px",
                  bgcolor: T.surfaceAlt,
                  color: T.textSub,
                  border: `1px solid ${T.border}`,
                  "&:hover": { bgcolor: T.redPale, color: T.red, borderColor: T.redBorder },
                }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </DialogTitle>

          {/* ── Dialog Content ── */}
          <DialogContent
            sx={{
              p: { xs: 2, sm: 2.5 },
              bgcolor: T.bg,
              display: "flex",
              flexDirection: "column",
              gap: 1.8,
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: 5 },
              "&::-webkit-scrollbar-thumb": { bgcolor: alpha(T.primary, 0.15), borderRadius: 3 },
            }}
          >
            <Box ref={receiptRef} sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
              {/* Receipt Top Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: "14px",
                  background: `linear-gradient(135deg, #ffffff 0%, ${T.surfaceAlt} 100%)`,
                  border: `1px solid ${T.border}`,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1,
                    py: 0.3,
                    borderRadius: "20px",
                    bgcolor: statusCfg.bg,
                    border: `1px solid ${statusCfg.border}`,
                    color: statusCfg.color,
                    mb: 1,
                  }}
                >
                  <StatusIcon sx={{ fontSize: 12 }} />
                  <Typography sx={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase" }}>
                    {statusCfg.label}
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: "1.5rem", fontWeight: 900, color: T.text, lineHeight: 1.1 }}>
                  {formatAmount(totalAmount)}
                </Typography>
                <Typography sx={{ fontSize: "0.72rem", color: T.textMuted, mt: 0.4, fontWeight: 500 }}>
                  {formatDate(transaction.createdAt)} • {formatTime(transaction.createdAt)}
                </Typography>
              </Paper>

              {/* Meta Details */}
              <Paper
                elevation={0}
                sx={{
                  p: 1.8,
                  borderRadius: "14px",
                  bgcolor: "#ffffff",
                  border: `1px solid ${T.border}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: T.textSub,
                    mb: 1.4,
                  }}
                >
                  Transaction Information
                </Typography>

                <Stack spacing={1.2}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Typography sx={{ fontSize: "0.74rem", color: T.textMuted, fontWeight: 600 }}>
                      Order ID:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        color: T.text,
                        fontFamily: "monospace",
                        wordBreak: "break-all",
                        textAlign: "right",
                        maxWidth: "60%",
                      }}
                    >
                      {transaction.razorpayOrderId || transaction.receipt || transaction._id?.substring(0, 14)}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "0.74rem", color: T.textMuted, fontWeight: 600 }}>
                      Payment Method:
                    </Typography>
                    <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: T.text }}>
                      {transaction.paymentMethod || "Online"}
                    </Typography>
                  </Box>

                  {transaction.planId && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "0.74rem", color: T.textMuted, fontWeight: 600 }}>
                        Plan / Type:
                      </Typography>
                      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: T.text }}>
                        {transaction.planId.name} ({transaction.planId.duration || "Standard"})
                      </Typography>
                    </Box>
                  )}

                  {(transaction.maxUsers || transaction.maxUser) !== undefined && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "0.74rem", color: T.textMuted, fontWeight: 600 }}>
                        User Capacity:
                      </Typography>
                      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: T.text }}>
                        {transaction.maxUsers || transaction.maxUser} Users
                      </Typography>
                    </Box>
                  )}

                  {expiryDetails.expiryDate && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "0.74rem", color: T.textMuted, fontWeight: 600 }}>
                        Expiry Date:
                      </Typography>
                      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: T.text }}>
                        {formatDate(expiryDetails.expiryDate)}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Paper>

              {/* Breakdown Card */}
              <Paper
                elevation={0}
                sx={{
                  p: 1.8,
                  borderRadius: "14px",
                  bgcolor: "#ffffff",
                  border: `1px solid ${T.border}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: T.textSub,
                    mb: 1.4,
                  }}
                >
                  Payment Breakdown
                </Typography>

                <Stack spacing={1}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "0.78rem", color: T.text, fontWeight: 600 }}>
                      {transaction.planId?.name || (isAddon ? "Add-on Purchase" : "Base Subscription")}
                    </Typography>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: T.text }}>
                      {formatAmount(transaction.amount)}
                    </Typography>
                  </Box>

                  {/* Add-ons */}
                  {transaction.addOns &&
                    transaction.addOns
                      .filter((a) => a.status === "completed")
                      .map((addOn, idx) => (
                        <Box
                          key={idx}
                          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                          <Typography sx={{ fontSize: "0.74rem", color: T.textMuted }}>
                            Upgrade to {addOn.addOnMaxUser} users
                          </Typography>
                          <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: T.emerald }}>
                            +{formatAmount(addOn.addOnAmount)}
                          </Typography>
                        </Box>
                      ))}

                  {/* Discount if applied */}
                  {transaction.discountAmount > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontSize: "0.74rem", color: T.amber, fontWeight: 600 }}>
                        Coupon Discount {transaction.couponCode ? `(${transaction.couponCode})` : ""}:
                      </Typography>
                      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: T.emerald }}>
                        - {formatAmount(transaction.discountAmount)}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 0.8, borderColor: T.border }} />

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 0.4 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 800, color: T.text }}>
                      Total Paid:
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", fontWeight: 900, color: T.emeraldDark }}>
                      {formatAmount(totalAmount)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </DialogContent>

          {/* ── Dialog Actions ── */}
          <DialogActions
            sx={{
              p: { xs: 1.8, sm: 2 },
              borderTop: `1px solid ${T.border}`,
              bgcolor: "#ffffff",
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={onHide}
              size="small"
              sx={{
                height: 36,
                px: 2,
                borderRadius: "10px",
                borderColor: T.border,
                color: T.textSub,
                fontWeight: 700,
                fontSize: "0.78rem",
                textTransform: "none",
                "&:hover": { borderColor: T.slate, bgcolor: T.surfaceAlt },
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handlePrint}
              startIcon={<PrintIcon sx={{ fontSize: 16 }} />}
              size="small"
              sx={{
                height: 36,
                px: 2.2,
                borderRadius: "10px",
                bgcolor: T.primary,
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.78rem",
                textTransform: "none",
                boxShadow: `0 4px 12px ${T.primaryAlpha(0.25)}`,
                "&:hover": { bgcolor: T.primaryHover },
              }}
            >
              Print Receipt
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ReceiptModal;
