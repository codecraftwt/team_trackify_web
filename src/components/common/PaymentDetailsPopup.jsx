import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  Grid,
  Paper,
  Avatar,
  Skeleton,
  Divider,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  CloseRounded as CloseIcon,
  ReceiptLongRounded as ReceiptIcon,
  PersonRounded as PersonIcon,
  CreditCardRounded as CardIcon,
  LocalOfferRounded as CouponIcon,
  CancelRounded as CancelIcon,
  CheckCircleRounded as CheckCircleIcon,
  ErrorOutlineRounded as ErrorIcon,
  AccessTimeRounded as ScheduleIcon,
  EmailRounded as EmailIcon,
  InfoRounded as InfoIcon,
  PrintRounded as PrintIcon,
  ExtensionRounded as AddonIcon,
  HourglassEmptyRounded as PendingIcon,
  CalendarTodayRounded as CalendarIcon,
  ContentCopyRounded as CopyIcon,
  CheckRounded as CheckIcon,
  ShieldRounded as ShieldIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "../../redux/slices/paymentSlice";
import moment from "moment";

// ── Theme Design Tokens ────────────────────────────────────────────────────────
const T = {
  primary: "#102C4A",
  primaryHover: "#0b1e33",
  primaryPale: "rgba(16, 44, 74, 0.06)",
  primaryBorder: "rgba(16, 44, 74, 0.15)",
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
  borderLight: "#edf2f7",
  text: "#0f172a",
  textSub: "#334155",
  textMuted: "#64748b",
};

// ── Status Configuration ───────────────────────────────────────────────────────
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
    Icon: ScheduleIcon,
    label: "Unknown",
  },
};

const getStatusCfg = (status) => {
  if (!status) return statusConfig.default;
  const lowerStatus = status.toLowerCase();
  return statusConfig[lowerStatus] || statusConfig.default;
};

// ── Detail Item Component ──────────────────────────────────────────────────────
const DetailField = ({ label, value, color, copyable, isMonospace }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value || value === "—") return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Box sx={{ mb: 1.2 }}>
      <Typography
        sx={{
          fontSize: "0.68rem",
          fontWeight: 700,
          color: T.textMuted,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          lineHeight: 1.2,
          mb: 0.3,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, flexWrap: "wrap" }}>
        <Typography
          sx={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: color || T.text,
            fontFamily: isMonospace ? "monospace, sans-serif" : "inherit",
            letterSpacing: isMonospace ? "-0.01em" : "normal",
            wordBreak: "break-all",
            lineHeight: 1.35,
          }}
        >
          {value ?? "—"}
        </Typography>
        {copyable && value && value !== "—" && (
          <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                p: 0.3,
                color: copied ? T.emerald : T.textMuted,
                "&:hover": { color: T.primary },
              }}
            >
              {copied ? <CheckIcon sx={{ fontSize: 13 }} /> : <CopyIcon sx={{ fontSize: 13 }} />}
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

// ── Section Card Component ────────────────────────────────────────────────────
const SectionCard = ({ title, Icon, iconColor, children, action }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 1.8, sm: 2 },
      borderRadius: "14px",
      border: `1px solid ${T.border}`,
      bgcolor: "#ffffff",
      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      "&:hover": {
        borderColor: alpha(T.primary, 0.25),
        boxShadow: "0 4px 16px rgba(16, 44, 74, 0.04)",
      },
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.6 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {Icon && (
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: iconColor ? alpha(iconColor, 0.1) : T.primaryPale,
              color: iconColor || T.primary,
            }}
          >
            <Icon sx={{ fontSize: 15 }} />
          </Box>
        )}
        <Typography
          sx={{
            fontSize: "0.74rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: T.textSub,
          }}
        >
          {title}
        </Typography>
      </Box>
      {action}
    </Box>
    {children}
  </Paper>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const PaymentDetailsPopup = ({ open, onClose, paymentId }) => {
  const dispatch = useDispatch();
  const {
    paymentDetailsData,
    paymentDetailsLoading,
    paymentDetailsError,
    paymentHistory = [],
  } = useSelector((state) => state.payment);

  useEffect(() => {
    if (open && paymentId) {
      dispatch(getPaymentDetails(paymentId));
    }
  }, [open, paymentId, dispatch]);

  const d = paymentDetailsData;
  const statusCfg = getStatusCfg(d?.status);
  const StatusIcon = statusCfg.Icon;

  const getParentPlan = (transaction) => {
    if (transaction && transaction.type === "addon" && transaction.parentPaymentId) {
      const parentId =
        typeof transaction.parentPaymentId === "object"
          ? transaction.parentPaymentId._id || transaction.parentPaymentId.id
          : transaction.parentPaymentId;
      return paymentHistory?.find((t) => t._id === parentId) || null;
    }
    return null;
  };

  const getPlanExpiryDate = (transaction) => {
    if (!transaction) return null;
    const parentPlan = getParentPlan(transaction);
    return parentPlan?.expiresAt || transaction.expiresAt;
  };

  const parentPlan = getParentPlan(d);
  const resolvedIsActive = parentPlan ? parentPlan.isActive : d?.isActive;
  const isAddon = d?.type === "addon";

  // ── Print Handler ──
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const statusCfgPrint = getStatusCfg(d?.status);

    const printHTML = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>${isAddon ? "Add-On" : "Payment"} Receipt - ${d?.razorpayOrderId || "Details"}</title>
          <meta charset="utf-8" />
          <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 32px 24px; background: white; color: #0f172a; }
              .print-container { max-width: 720px; margin: 0 auto; }
              .print-header { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0; margin-bottom: 24px; }
              .print-header h1 { font-size: 22px; font-weight: 800; color: #102C4A; margin-bottom: 4px; }
              .print-header p { font-size: 12px; color: #64748b; }
              .status-badge { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; background: ${statusCfgPrint.bg}; color: ${statusCfgPrint.color}; border: 1px solid ${statusCfgPrint.border}; text-transform: uppercase; }
              .amount-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
              .amount-val { font-size: 24px; font-weight: 800; color: #059669; }
              .print-section { margin-bottom: 20px; page-break-inside: avoid; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px; }
              .print-section-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #102C4A; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 14px; }
              .print-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
              .print-col-2 { grid-column: span 2; }
              .print-label { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 2px; }
              .print-value { font-size: 12.5px; font-weight: 600; color: #0f172a; word-break: break-all; }
              .footer { text-align: center; padding-top: 20px; margin-top: 24px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
              @media print { body { padding: 0; } .print-container { max-width: 100%; } }
          </style>
      </head>
      <body>
          <div class="print-container">
              <div class="print-header">
                  <div>
                      <h1>${isAddon ? "Add-On" : "Subscription"} Payment Receipt</h1>
                      <p>Generated on ${moment().format("DD MMM YYYY, hh:mm A")}</p>
                  </div>
                  <div class="status-badge">${d?.status || "PENDING"}</div>
              </div>

              <div class="amount-card">
                  <div>
                      <div class="print-label">Total Amount Paid</div>
                      <div class="amount-val">₹${d?.amount?.toLocaleString("en-IN") || 0}</div>
                  </div>
                  <div style="text-align: right;">
                      <div class="print-label">Order ID</div>
                      <div class="print-value" style="font-family: monospace;">${d?.razorpayOrderId || "—"}</div>
                  </div>
              </div>

              <div class="print-section">
                  <div class="print-section-title">Customer Details</div>
                  <div class="print-grid">
                      <div>
                          <div class="print-label">Name</div>
                          <div class="print-value">${d?.user?.name || "—"}</div>
                      </div>
                      <div>
                          <div class="print-label">Email Address</div>
                          <div class="print-value">${d?.user?.email || "—"}</div>
                      </div>
                  </div>
              </div>

              <div class="print-section">
                  <div class="print-section-title">Plan Information</div>
                  <div class="print-grid">
                      <div>
                          <div class="print-label">${isAddon ? "Add-on Name" : "Plan Name"}</div>
                          <div class="print-value">${d?.planName || "—"}</div>
                      </div>
                      <div>
                          <div class="print-label">Duration</div>
                          <div class="print-value">${d?.duration || "—"}</div>
                      </div>
                      <div>
                          <div class="print-label">Max Users</div>
                          <div class="print-value">${d?.maxUser || "—"}</div>
                      </div>
                      <div>
                          <div class="print-label">Subscription Status</div>
                          <div class="print-value" style="color:${resolvedIsActive ? "#059669" : "#dc2626"}">${resolvedIsActive ? "Active" : "Inactive"}</div>
                      </div>
                      <div>
                          <div class="print-label">Start Date</div>
                          <div class="print-value">${d?.createdAt ? moment(d.createdAt).format("DD MMM YYYY, hh:mm A") : "—"}</div>
                      </div>
                      <div>
                          <div class="print-label">Expiry Date</div>
                          <div class="print-value">${getPlanExpiryDate(d) ? moment(getPlanExpiryDate(d)).format("DD MMM YYYY, hh:mm A") : "—"}</div>
                      </div>
                  </div>
              </div>

              ${
                d?.couponCode
                  ? `
              <div class="print-section">
                  <div class="print-section-title">Coupon Details</div>
                  <div class="print-grid">
                      <div>
                          <div class="print-label">Coupon Code</div>
                          <div class="print-value" style="color:#d97706; font-weight:700;">${d.couponCode}</div>
                      </div>
                      <div>
                          <div class="print-label">Original Amount</div>
                          <div class="print-value">₹${d.originalAmount?.toLocaleString("en-IN") || 0}</div>
                      </div>
                      <div>
                          <div class="print-label">Discount Savings</div>
                          <div class="print-value" style="color:#059669;">- ₹${d.discountAmount?.toLocaleString("en-IN") || 0}</div>
                      </div>
                  </div>
              </div>`
                  : ""
              }

              <div class="footer">This is an automated receipt generated by TeamTrackify.<br>For questions or assistance, contact support.</div>
          </div>
          <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 800); };</script>
      </body>
      </html>
    `;

    printWindow.document.write(printHTML);
    printWindow.document.close();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 12,
        sx: {
          borderRadius: "20px",
          maxHeight: "90vh",
          bgcolor: "#ffffff",
          border: `1px solid ${T.border}`,
          overflow: "hidden",
          mx: { xs: 1.5, sm: 2 },
          width: { xs: "calc(100% - 24px)", sm: "100%" },
        },
      }}
    >
      {/* ── Dialog Header ── */}
      <DialogTitle
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.8,
          bgcolor: "#ffffff",
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 0 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: isAddon ? "rgba(99, 102, 241, 0.1)" : T.primaryPale,
              color: isAddon ? "#6366f1" : T.primary,
              flexShrink: 0,
            }}
          >
            {isAddon ? <AddonIcon sx={{ fontSize: 19 }} /> : <ReceiptIcon sx={{ fontSize: 19 }} />}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography
                sx={{
                  fontSize: { xs: "0.92rem", sm: "1.02rem" },
                  fontWeight: 800,
                  color: T.text,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                {isAddon ? "Add-On Details" : "Payment Details"}
              </Typography>
              {d && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.4,
                    px: 0.9,
                    py: 0.2,
                    borderRadius: "20px",
                    bgcolor: statusCfg.bg,
                    border: `1px solid ${statusCfg.border}`,
                    color: statusCfg.color,
                  }}
                >
                  <StatusIcon sx={{ fontSize: 11 }} />
                  <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase" }}>
                    {statusCfg.label}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, flexShrink: 0 }}>
          {d && !paymentDetailsLoading && (
            <Tooltip title="Print / Download Receipt">
              <IconButton
                onClick={handlePrint}
                size="small"
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  bgcolor: T.surfaceAlt,
                  color: T.textSub,
                  border: `1px solid ${T.border}`,
                  "&:hover": { bgcolor: T.primaryPale, color: T.primary },
                }}
              >
                <PrintIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Close">
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                width: 32,
                height: 32,
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
        </Box>
      </DialogTitle>

      {/* ── Dialog Content ── */}
      <DialogContent
        sx={{
          p: { xs: 2, sm: 2.5 },
          bgcolor: T.bg,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-thumb": { bgcolor: alpha(T.primary, 0.15), borderRadius: 3 },
        }}
      >
        {/* Loading State */}
        {paymentDetailsLoading && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Skeleton variant="rounded" height={70} sx={{ borderRadius: "14px" }} />
            <Skeleton variant="rounded" height={130} sx={{ borderRadius: "14px" }} />
            <Skeleton variant="rounded" height={120} sx={{ borderRadius: "14px" }} />
          </Box>
        )}

        {/* Error State */}
        {!paymentDetailsLoading && paymentDetailsError && (
          <Box
            sx={{
              py: 5,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ErrorIcon sx={{ fontSize: 40, color: T.red }} />
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: T.text }}>
              Failed to load payment details
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: T.textMuted }}>
              Please check your connection and try again.
            </Typography>
          </Box>
        )}

        {/* Loaded Data */}
        {!paymentDetailsLoading && !paymentDetailsError && d && (
          <>
            {/* Amount & Key Meta Highlight Card */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "14px",
                background: `linear-gradient(135deg, #ffffff 0%, ${T.surfaceAlt} 100%)`,
                border: `1.5px solid ${T.border}`,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: T.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Amount Paid
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, mt: 0.2 }}>
                  <Typography
                    sx={{
                      fontSize: "1.45rem",
                      fontWeight: 900,
                      color: d.status === "completed" ? T.emerald : T.text,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    ₹{d.amount?.toLocaleString("en-IN") || 0}
                  </Typography>
                  <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: T.textMuted }}>
                    {d.currency || "INR"}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "flex-start", sm: "flex-end" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: T.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Order Identifier
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    color: T.textSub,
                    mt: 0.2,
                  }}
                >
                  {d.razorpayOrderId || "—"}
                </Typography>
              </Box>
            </Paper>

            {/* 1. User Info Section */}
            <SectionCard title="Customer Account" Icon={PersonIcon}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                <Avatar
                  sx={{
                    width: 42,
                    height: 42,
                    bgcolor: T.primary,
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    boxShadow: `0 2px 8px ${T.primaryAlpha(0.25)}`,
                  }}
                >
                  {d.user?.name?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography sx={{ fontSize: "0.88rem", fontWeight: 800, color: T.text, lineHeight: 1.2 }}>
                    {d.user?.name || "Unknown User"}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mt: 0.4 }}>
                    <EmailIcon sx={{ fontSize: 13, color: T.textMuted, flexShrink: 0 }} />
                    <Typography
                      sx={{
                        fontSize: "0.74rem",
                        color: T.textMuted,
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.user?.email || "—"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </SectionCard>

            {/* 2. Payment Gateway Information */}
            <SectionCard title={isAddon ? "Add-On Payment Info" : "Payment Information"} Icon={CardIcon}>
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <DetailField
                    label="Razorpay Order ID"
                    value={d.razorpayOrderId}
                    copyable
                    isMonospace
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField
                    label="Amount"
                    value={`₹${d.amount?.toLocaleString("en-IN") || 0}`}
                    color={d.status === "completed" ? T.emerald : T.text}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField label="Currency" value={d.currency || "INR"} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField label="Receipt Number" value={d.receipt} copyable isMonospace />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField
                    label="Status"
                    value={d.status?.toUpperCase() || "PENDING"}
                    color={statusCfg.color}
                  />
                </Grid>

                {d.failureReason && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 1.2,
                        borderRadius: "8px",
                        bgcolor: T.redPale,
                        border: `1px solid ${T.redBorder}`,
                      }}
                    >
                      <DetailField label="Failure Reason" value={d.failureReason} color={T.red} />
                    </Box>
                  </Grid>
                )}

                {d.failedAt && (
                  <Grid item xs={12}>
                    <DetailField
                      label="Failed At"
                      value={moment(d.failedAt).format("DD MMM YYYY, hh:mm A")}
                    />
                  </Grid>
                )}
              </Grid>
            </SectionCard>

            {/* 3. Plan / Add-On Details */}
            <SectionCard
              title={isAddon ? "Add-On Specification" : "Plan Specification"}
              Icon={isAddon ? AddonIcon : ReceiptIcon}
              iconColor={isAddon ? "#6366f1" : undefined}
            >
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={6}>
                  <DetailField
                    label={isAddon ? "Add-On Name" : "Plan Name"}
                    value={d.planName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField label="Duration" value={d.duration || "One-time"} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField label="Max Users" value={d.maxUser} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField
                    label="Subscription Status"
                    value={resolvedIsActive ? "Active" : "Inactive"}
                    color={resolvedIsActive ? T.emerald : T.red}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField
                    label="Start Date"
                    value={d.createdAt ? moment(d.createdAt).format("DD MMM YYYY") : null}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DetailField
                    label="Expiry Date"
                    value={
                      getPlanExpiryDate(d)
                        ? moment(getPlanExpiryDate(d)).format("DD MMM YYYY")
                        : null
                    }
                  />
                </Grid>
              </Grid>
            </SectionCard>

            {/* 4. Coupon Section (if applied) */}
            {d.couponCode && (
              <SectionCard title="Coupon Applied" Icon={CouponIcon} iconColor={T.amber}>
                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={4}>
                    <DetailField label="Coupon Code" value={d.couponCode} color={T.amber} copyable />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DetailField
                      label="Original Amount"
                      value={`₹${d.originalAmount?.toLocaleString("en-IN") || 0}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DetailField
                      label="Discount Savings"
                      value={`- ₹${d.discountAmount?.toLocaleString("en-IN") || 0}`}
                      color={T.emerald}
                    />
                  </Grid>
                </Grid>
              </SectionCard>
            )}

            {/* 5. Parent Payment (for Add-ons) */}
            {isAddon && d.parentPaymentId && (
              <SectionCard title="Parent Subscription Link" Icon={ShieldIcon}>
                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
                    <DetailField
                      label="Parent Payment ID"
                      value={
                        typeof d.parentPaymentId === "object"
                          ? d.parentPaymentId._id || d.parentPaymentId.id
                          : d.parentPaymentId
                      }
                      copyable
                      isMonospace
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailField label="Add-On ID" value={d.addOnId} isMonospace />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailField label="Parent Plan" value={d.planName} />
                  </Grid>
                </Grid>
              </SectionCard>
            )}

            {/* 6. Cancellation Details (if cancelled) */}
            {d.isCancelledByUser && (
              <SectionCard title="Cancellation Information" Icon={CancelIcon} iconColor={T.red}>
                <Grid container spacing={1.5}>
                  <Grid item xs={12}>
                    <DetailField
                      label="Cancelled At"
                      value={d.cancelledAt ? moment(d.cancelledAt).format("DD MMM YYYY, hh:mm A") : null}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DetailField label="Cancellation Reason" value={d.cancellationReason} />
                  </Grid>
                </Grid>
              </SectionCard>
            )}

            {/* 7. Timestamps */}
            <SectionCard title="Record Timestamps" Icon={InfoIcon}>
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={6}>
                  <DetailField
                    label="Created At"
                    value={d.createdAt ? moment(d.createdAt).format("DD MMM YYYY, hh:mm A") : "—"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DetailField
                    label="Last Updated"
                    value={d.updatedAt ? moment(d.updatedAt).format("DD MMM YYYY, hh:mm A") : "—"}
                  />
                </Grid>
              </Grid>
            </SectionCard>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDetailsPopup;