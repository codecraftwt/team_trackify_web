// import React, { useEffect } from "react";
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     IconButton,
//     Box,
//     Typography,
//     Chip,
//     Grid,
//     Paper,
//     Avatar,
//     Skeleton,
//     Divider,
// } from "@mui/material";
// import { alpha } from "@mui/material/styles";
// import {
//     Close as CloseIcon,
//     Receipt as ReceiptIcon,
//     Person as PersonIcon,
//     CreditCard as CardIcon,
//     CalendarToday as CalendarIcon,
//     AttachMoney as MoneyIcon,
//     LocalOffer as CouponIcon,
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Error as ErrorIcon,
//     Schedule as ScheduleIcon,
//     Email as EmailIcon,
//     Info as InfoIcon,
// } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentDetails } from "../../redux/slices/paymentSlice";
// import moment from "moment";

// // ── Status chip ──────────────────────────────────────────────
// const statusConfig = {
//     completed: { color: "#10b981", bg: alpha("#10b981", 0.1), Icon: CheckCircleIcon },
//     failed:    { color: "#dc2626", bg: alpha("#dc2626", 0.1), Icon: ErrorIcon },
//     cancelled: { color: "#ef4444", bg: alpha("#ef4444", 0.1), Icon: CancelIcon },
//     default:   { color: "#f59e0b", bg: alpha("#f59e0b", 0.1), Icon: ScheduleIcon },
// };

// const getStatusCfg = (status) =>
//     statusConfig[status?.toLowerCase()] || statusConfig.default;

// // ── Compact row ──────────────────────────────────────────────
// const Row = ({ label, value, color }) => (
//     <Box sx={{ mb: 1 }}>
//         <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.4, lineHeight: 1 }}>
//             {label}
//         </Typography>
//         <Typography sx={{ fontSize: "0.78rem", fontWeight: 500, color: color || "text.primary", wordBreak: "break-all", lineHeight: 1.4, mt: 0.2 }}>
//             {value ?? "—"}
//         </Typography>
//     </Box>
// );

// // ── Section card ─────────────────────────────────────────────
// const Section = ({ title, Icon, children }) => (
//     <Paper
//         elevation={0}
//         sx={{
//             p: 1.5,
//             borderRadius: 2,
//             border: "1px solid",
//             borderColor: "divider",
//             bgcolor: "background.default",
//         }}
//     >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.2 }}>
//             {Icon && <Icon sx={{ fontSize: 13, color: "primary.main" }} />}
//             <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.6, color: "text.secondary" }}>
//                 {title}
//             </Typography>
//         </Box>
//         {children}
//     </Paper>
// );

// // ── Main component ───────────────────────────────────────────
// const PaymentDetailsPopup = ({ open, onClose, paymentId }) => {
//     const dispatch = useDispatch();
//     const { paymentDetailsData, paymentDetailsLoading, paymentDetailsError } =
//         useSelector((state) => state.payment);

//     useEffect(() => {
//         if (open && paymentId) dispatch(getPaymentDetails(paymentId));
//     }, [open, paymentId, dispatch]);

//     const d = paymentDetailsData;
//     const statusCfg = getStatusCfg(d?.status);

//     return (
//         <Dialog
//             open={open}
//             onClose={onClose}
//             // ✅ Compact: "sm" max-width instead of "md"
//             maxWidth="sm"
//             fullWidth
//             PaperProps={{
//                 sx: {
//                     borderRadius: 2.5,
//                     maxHeight: "88vh",
//                     // ✅ Responsive: on xs screens stretch to near-full width
//                     mx: { xs: 1, sm: 2 },
//                     width: { xs: "calc(100% - 16px)", sm: "100%" },
//                 },
//             }}
//         >
//             {/* ── Header ── */}
//             <DialogTitle
//                 sx={{
//                     p: "10px 14px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     borderBottom: "1px solid",
//                     borderColor: "divider",
//                     minHeight: 0,
//                 }}
//             >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <ReceiptIcon sx={{ color: "primary.main", fontSize: 18 }} />
//                     <Typography sx={{ fontSize: "0.85rem", fontWeight: 800 }}>
//                         Payment Details
//                     </Typography>
//                     {d && (
//                         <Chip
//                             label={d.status?.toUpperCase()}
//                             size="small"
//                             sx={{
//                                 fontSize: "0.55rem",
//                                 fontWeight: 700,
//                                 height: 18,
//                                 bgcolor: statusCfg.bg,
//                                 color: statusCfg.color,
//                                 "& .MuiChip-label": { px: 0.8 },
//                             }}
//                         />
//                     )}
//                 </Box>
//                 <IconButton onClick={onClose} size="small" sx={{ p: 0.4 }}>
//                     <CloseIcon sx={{ fontSize: 16 }} />
//                 </IconButton>
//             </DialogTitle>

//             {/* ── Content ── */}
//             <DialogContent
//                 sx={{
//                     p: { xs: 1.2, sm: 1.5 },
//                     overflowY: "auto",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 1.2,
//                 }}
//             >
//                 {/* Loading */}
//                 {paymentDetailsLoading && (
//                     <>
//                         <Skeleton variant="rounded" height={70} sx={{ borderRadius: 2 }} />
//                         <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
//                         <Skeleton variant="rounded" height={100} sx={{ borderRadius: 2 }} />
//                     </>
//                 )}

//                 {/* Error */}
//                 {!paymentDetailsLoading && paymentDetailsError && (
//                     <Box sx={{ textAlign: "center", py: 4 }}>
//                         <ErrorIcon sx={{ fontSize: 36, color: "error.main", mb: 1 }} />
//                         <Typography color="error" sx={{ fontSize: "0.8rem" }}>
//                             Failed to load payment details
//                         </Typography>
//                     </Box>
//                 )}

//                 {/* Data */}
//                 {!paymentDetailsLoading && !paymentDetailsError && d && (
//                     <>
//                         {/* ── User ── */}
//                         <Section title="User" Icon={PersonIcon} >
//                             <Box  sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                                 <Avatar
//                                     sx={{
//                                         width: 36,
//                                         height: 36,
//                                         fontSize: "0.85rem",
//                                         fontWeight: 800,
//                                         bgcolor: alpha("#6366f1", 0.15),
//                                         color: "#6366f1",
//                                         flexShrink: 0,
//                                     }}
//                                 >
//                                     {d.user?.name?.[0]?.toUpperCase() || "?"}
//                                 </Avatar>
//                                 <Box sx={{ minWidth: 0 }}>
//                                     <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.2 }}>
//                                         {d.user?.name}
//                                     </Typography>
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
//                                         <EmailIcon sx={{ fontSize: 11, color: "text.secondary", flexShrink: 0 }} />
//                                         <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                             {d.user?.email}
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </Section>

//                         {/* ── Payment ── */}
//                         <Section title="Payment" Icon={CardIcon}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs={12}>
//                                     <Row label="Razorpay Order ID" value={d.razorpayOrderId} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Amount" value={`₹${d.amount?.toLocaleString("en-IN")}`} color="#10b981" />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Currency" value={d.currency || "INR"} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Box sx={{ mb: 1 }}>
//                                         <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.4, lineHeight: 1 }}>
//                                             Status
//                                         </Typography>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
//                                             <statusCfg.Icon sx={{ fontSize: 13, color: statusCfg.color }} />
//                                             <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: statusCfg.color }}>
//                                                 {d.status?.toUpperCase()}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Receipt" value={d.receipt} />
//                                 </Grid>

//                                 {d.failureReason && (
//                                     <Grid item xs={12}>
//                                         <Row label="Failure Reason" value={d.failureReason} color="#dc2626" />
//                                     </Grid>
//                                 )}
//                                 {d.failedAt && (
//                                     <Grid item xs={12}>
//                                         <Row label="Failed At" value={moment(d.failedAt).format("DD MMM YYYY, hh:mm A")} />
//                                     </Grid>
//                                 )}
//                             </Grid>
//                         </Section>

//                         {/* ── Plan ── */}
//                         <Section title="Plan" Icon={ReceiptIcon}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs={12}>
//                                     <Row label="Plan Name" value={d.planName} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Duration" value={d.duration} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Max Users" value={d.maxUser} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row
//                                         label="Subscription"
//                                         value={d.isActive ? "Active" : "Inactive"}
//                                         color={d.isActive ? "#10b981" : "#ef4444"}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row
//                                         label="Expires At"
//                                         value={d.expiresAt ? moment(d.expiresAt).format("DD MMM YYYY") : null}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </Section>

//                         {/* ── Coupon (conditional) ── */}
//                         {d.couponCode && (
//                             <Section title="Coupon" Icon={CouponIcon}>
//                                 <Grid container spacing={1}>
//                                     <Grid item xs={6}>
//                                         <Row label="Coupon Code" value={d.couponCode} color="#f59e0b" />
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <Row label="Original Amount" value={`₹${d.originalAmount?.toLocaleString("en-IN")}`} />
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <Row label="Discount" value={`- ₹${d.discountAmount?.toLocaleString("en-IN")}`} color="#10b981" />
//                                     </Grid>
//                                 </Grid>
//                             </Section>
//                         )}

//                         {/* ── Cancellation (conditional) ── */}
//                         {d.isCancelledByUser && (
//                             <Section title="Cancellation" Icon={CancelIcon}>
//                                 <Grid container spacing={1}>
//                                     <Grid item xs={6}>
//                                         <Row
//                                             label="Cancelled At"
//                                             value={d.cancelledAt ? moment(d.cancelledAt).format("DD MMM YYYY, hh:mm A") : null}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <Row label="Reason" value={d.cancellationReason} />
//                                     </Grid>
//                                 </Grid>
//                             </Section>
//                         )}

//                         {/* ── Metadata ── */}
//                         <Section title="Metadata" Icon={InfoIcon}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs={6}>
//                                     <Row label="Created" value={moment(d.createdAt).format("DD MMM YYYY, hh:mm A")} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Updated" value={moment(d.updatedAt).format("DD MMM YYYY, hh:mm A")} />
//                                 </Grid>
//                             </Grid>
//                         </Section>
//                     </>
//                 )}
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default PaymentDetailsPopup;











// import React, { useEffect } from "react";
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     IconButton,
//     Box,
//     Typography,
//     Chip,
//     Grid,
//     Paper,
//     Avatar,
//     Skeleton,
// } from "@mui/material";
// import { alpha } from "@mui/material/styles";
// import {
//     Close as CloseIcon,
//     Receipt as ReceiptIcon,
//     Person as PersonIcon,
//     CreditCard as CardIcon,
//     LocalOffer as CouponIcon,
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Error as ErrorIcon,
//     Schedule as ScheduleIcon,
//     Email as EmailIcon,
//     Info as InfoIcon,
//     Print as PrintIcon,
// } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { getPaymentDetails } from "../../redux/slices/paymentSlice";
// import moment from "moment";

// // ── Status chip ──────────────────────────────────────────────
// const statusConfig = {
//     completed: { color: "#10b981", bg: alpha("#10b981", 0.1), Icon: CheckCircleIcon, label: "Completed" },
//     failed:    { color: "#dc2626", bg: alpha("#dc2626", 0.1), Icon: ErrorIcon, label: "Failed" },
//     cancelled: { color: "#ef4444", bg: alpha("#ef4444", 0.1), Icon: CancelIcon, label: "Cancelled" },
//     default:   { color: "#f59e0b", bg: alpha("#f59e0b", 0.1), Icon: ScheduleIcon, label: "Pending" },
// };

// const getStatusCfg = (status) =>
//     statusConfig[status?.toLowerCase()] || statusConfig.default;

// // ── Compact row ──
// const Row = ({ label, value, color }) => (
//     <Box sx={{ mb: 1 }}>
//         <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.4, lineHeight: 1 }}>
//             {label}
//         </Typography>
//         <Typography sx={{ fontSize: "0.78rem", fontWeight: 500, color: color || "text.primary", wordBreak: "break-all", lineHeight: 1.4, mt: 0.2 }}>
//             {value ?? "—"}
//         </Typography>
//     </Box>
// );

// // ── Section card ──
// const Section = ({ title, Icon, children }) => (
//     <Paper
//         elevation={0}
//         sx={{
//             p: 1.5,
//             borderRadius: 2,
//             border: "1px solid",
//             borderColor: "divider",
//             bgcolor: "background.default",
//         }}
//     >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.2 }}>
//             {Icon && <Icon sx={{ fontSize: 13, color: "primary.main" }} />}
//             <Typography sx={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.6, color: "text.secondary" }}>
//                 {title}
//             </Typography>
//         </Box>
//         {children}
//     </Paper>
// );

// // ── Main component ──
// const PaymentDetailsPopup = ({ open, onClose, paymentId }) => {
//     const dispatch = useDispatch();
//     const { paymentDetailsData, paymentDetailsLoading, paymentDetailsError } =
//         useSelector((state) => state.payment);

//     useEffect(() => {
//         if (open && paymentId) dispatch(getPaymentDetails(paymentId));
//     }, [open, paymentId, dispatch]);

//     const d = paymentDetailsData;
//     const statusCfg = getStatusCfg(d?.status);

//     // ── Print Handler - Prints ALL information shown in popup ──
//     const handlePrint = () => {
//         const printWindow = window.open('', '_blank');
        
//         const statusCfgPrint = getStatusCfg(d?.status);
        
//         const printHTML = `
//             <!DOCTYPE html>
//             <html>
//             <head>
//                 <title>Payment Receipt - ${d?.razorpayOrderId || 'Payment Details'}</title>
//                 <meta charset="utf-8" />
//                 <style>
//                     * {
//                         margin: 0;
//                         padding: 0;
//                         box-sizing: border-box;
//                     }
//                     body {
//                         font-family: 'Segoe UI', Arial, sans-serif;
//                         padding: 30px 20px;
//                         background: white;
//                         color: #1e293b;
//                     }
//                     .print-container {
//                         max-width: 800px;
//                         margin: 0 auto;
//                         background: white;
//                     }
//                     .print-header {
//                         text-align: center;
//                         padding: 20px 0 25px;
//                         border-bottom: 3px solid #6366f1;
//                         margin-bottom: 25px;
//                     }
//                     .print-header h1 {
//                         font-size: 28px;
//                         margin-bottom: 8px;
//                         color: #6366f1;
//                     }
//                     .print-header p {
//                         font-size: 12px;
//                         color: #64748b;
//                         margin-top: 5px;
//                     }
//                     .print-section {
//                         margin-bottom: 25px;
//                         page-break-inside: avoid;
//                         border: 1px solid #e2e8f0;
//                         border-radius: 12px;
//                         padding: 16px;
//                     }
//                     .print-section-title {
//                         font-size: 14px;
//                         font-weight: 800;
//                         text-transform: uppercase;
//                         letter-spacing: 1px;
//                         color: #6366f1;
//                         border-bottom: 2px solid #e2e8f0;
//                         padding-bottom: 8px;
//                         margin-bottom: 16px;
//                         display: flex;
//                         align-items: center;
//                         gap: 8px;
//                     }
//                     .print-grid {
//                         display: flex;
//                         gap: 20px;
//                         flex-wrap: wrap;
//                     }
//                     .print-grid-item {
//                         flex: 1;
//                         min-width: 200px;
//                     }
//                     .print-row {
//                         margin-bottom: 14px;
//                         display: flex;
//                         align-items: flex-start;
//                     }
//                     .print-label {
//                         font-size: 11px;
//                         font-weight: 700;
//                         color: #64748b;
//                         text-transform: uppercase;
//                         letter-spacing: 0.5px;
//                         width: 130px;
//                         flex-shrink: 0;
//                     }
//                     .print-value {
//                         font-size: 13px;
//                         font-weight: 500;
//                         color: #1e293b;
//                         flex: 1;
//                         word-break: break-word;
//                     }
//                     .user-info {
//                         display: flex;
//                         align-items: center;
//                         gap: 16px;
//                         padding: 12px;
//                         background: #f8fafc;
//                         border-radius: 12px;
//                         margin-bottom: 5px;
//                     }
//                     .user-avatar {
//                         width: 52px;
//                         height: 52px;
//                         border-radius: 50%;
//                         background: linear-gradient(135deg, #6366f1, #818cf8);
//                         color: white;
//                         display: flex;
//                         align-items: center;
//                         justify-content: center;
//                         font-size: 22px;
//                         font-weight: 700;
//                     }
//                     .user-details {
//                         flex: 1;
//                     }
//                     .user-name {
//                         font-size: 16px;
//                         font-weight: 800;
//                         color: #1e293b;
//                         margin-bottom: 4px;
//                     }
//                     .user-email {
//                         font-size: 12px;
//                         color: #64748b;
//                     }
//                     .status-badge {
//                         display: inline-flex;
//                         align-items: center;
//                         gap: 6px;
//                         padding: 4px 12px;
//                         border-radius: 20px;
//                         font-size: 11px;
//                         font-weight: 800;
//                         background: ${statusCfgPrint.bg};
//                         color: ${statusCfgPrint.color};
//                     }
//                     .amount-large {
//                         font-size: 20px;
//                         font-weight: 800;
//                         color: #10b981;
//                     }
//                     .discount {
//                         color: #ef4444;
//                         text-decoration: line-through;
//                         font-size: 12px;
//                     }
//                     .footer {
//                         text-align: center;
//                         padding-top: 20px;
//                         margin-top: 20px;
//                         border-top: 1px solid #e2e8f0;
//                         font-size: 10px;
//                         color: #94a3b8;
//                     }
//                     hr {
//                         margin: 15px 0;
//                         border: none;
//                         border-top: 1px solid #e2e8f0;
//                     }
//                     @media print {
//                         body {
//                             padding: 0;
//                         }
//                         .print-container {
//                             max-width: 100%;
//                         }
//                         .print-section {
//                             break-inside: avoid;
//                         }
//                     }
//                 </style>
//             </head>
//             <body>
//                 <div class="print-container">
//                     <!-- Header -->
//                     <div class="print-header">
//                         <h1>💰 Payment Receipt</h1>
//                         <p>Transaction ID: ${d?.razorpayOrderId || 'N/A'}</p>
//                         <p>Generated on: ${moment().format("DD MMM YYYY, hh:mm A")}</p>
//                     </div>

//                     <!-- User Information -->
//                     <div class="print-section">
//                         <div class="print-section-title">
//                             👤 USER INFORMATION
//                         </div>
//                         <div class="user-info">
//                             <div class="user-avatar">${d?.user?.name?.[0]?.toUpperCase() || 'U'}</div>
//                             <div class="user-details">
//                                 <div class="user-name">${d?.user?.name || 'Unknown User'}</div>
//                                 <div class="user-email">📧 ${d?.user?.email || '—'}</div>
//                             </div>
//                         </div>
//                     </div>

//                     <!-- Payment Information -->
//                     <div class="print-section">
//                         <div class="print-section-title">
//                             💳 PAYMENT INFORMATION
//                         </div>
//                         <div class="print-grid">
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Razorpay Order ID</div>
//                                     <div class="print-value">${d?.razorpayOrderId || '—'}</div>
//                                 </div>
//                                 <div class="print-row">
//                                     <div class="print-label">Amount</div>
//                                     <div class="print-value amount-large">₹${d?.amount?.toLocaleString("en-IN") || 0}</div>
//                                 </div>
//                                 <div class="print-row">
//                                     <div class="print-label">Currency</div>
//                                     <div class="print-value">${d?.currency || 'INR'}</div>
//                                 </div>
//                             </div>
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Status</div>
//                                     <div class="print-value">
//                                         <span class="status-badge">
//                                             ${statusCfgPrint.Icon ? '●' : ''} ${d?.status?.toUpperCase() || 'PENDING'}
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div class="print-row">
//                                     <div class="print-label">Receipt No.</div>
//                                     <div class="print-value">${d?.receipt || '—'}</div>
//                                 </div>
//                             </div>
//                         </div>
//                         ${d?.failureReason ? `
//                         <hr>
//                         <div class="print-row">
//                             <div class="print-label">Failure Reason</div>
//                             <div class="print-value" style="color:#dc2626;">${d.failureReason}</div>
//                         </div>
//                         ` : ''}
//                         ${d?.failedAt ? `
//                         <div class="print-row">
//                             <div class="print-label">Failed At</div>
//                             <div class="print-value">${moment(d.failedAt).format("DD MMM YYYY, hh:mm A")}</div>
//                         </div>
//                         ` : ''}
//                     </div>

//                     <!-- Plan Information -->
//                     <div class="print-section">
//                         <div class="print-section-title">
//                             📋 PLAN INFORMATION
//                         </div>
//                         <div class="print-grid">
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Plan Name</div>
//                                     <div class="print-value">${d?.planName || '—'}</div>
//                                 </div>
//                                 <div class="print-row">
//                                     <div class="print-label">Duration</div>
//                                     <div class="print-value">${d?.duration || '—'}</div>
//                                 </div>
//                             </div>
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Max Users</div>
//                                     <div class="print-value">${d?.maxUser || '—'}</div>
//                                 </div>
//                                 <div class="print-row">
//                                     <div class="print-label">Subscription Status</div>
//                                     <div class="print-value" style="color:${d?.isActive ? '#10b981' : '#ef4444'}">${d?.isActive ? 'Active' : 'Inactive'}</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="print-row">
//                             <div class="print-label">Expires At</div>
//                             <div class="print-value">${d?.expiresAt ? moment(d.expiresAt).format("DD MMM YYYY, hh:mm A") : '—'}</div>
//                         </div>
//                     </div>

//                     ${d?.couponCode ? `
//                     <!-- Coupon Information -->
//                     <div class="print-section">
//                         <div class="print-section-title">
//                             🏷️ COUPON DETAILS
//                         </div>
//                         <div class="print-grid">
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Coupon Code</div>
//                                     <div class="print-value" style="color:#f59e0b; font-weight:700;">${d.couponCode}</div>
//                                 </div>
//                             </div>
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Original Amount</div>
//                                     <div class="print-value">₹${d.originalAmount?.toLocaleString("en-IN") || 0}</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div class="print-row">
//                             <div class="print-label">Discount Applied</div>
//                             <div class="print-value" style="color:#10b981;">- ₹${d.discountAmount?.toLocaleString("en-IN") || 0}</div>
//                         </div>
//                     </div>
//                     ` : ''}

//                     ${d?.isCancelledByUser ? `
//                     <!-- Cancellation Information -->
//                     <div class="print-section">
//                         <div class="print-section-title">
//                             ❌ CANCELLATION DETAILS
//                         </div>
//                         <div class="print-row">
//                             <div class="print-label">Cancelled At</div>
//                             <div class="print-value">${d.cancelledAt ? moment(d.cancelledAt).format("DD MMM YYYY, hh:mm A") : '—'}</div>
//                         </div>
//                         <div class="print-row">
//                             <div class="print-label">Cancelled By</div>
//                             <div class="print-value">${d.cancelledBy || 'User'}</div>
//                         </div>
//                         <div class="print-row">
//                             <div class="print-label">Reason</div>
//                             <div class="print-value">${d.cancellationReason || '—'}</div>
//                         </div>
//                     </div>
//                     ` : ''}

//                     <!-- Metadata / Timestamps -->
//                     <div class="print-section">
//                         <div class="print-section-title">
//                             ⏱️ TIMESTAMP INFORMATION
//                         </div>
//                         <div class="print-grid">
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Created At</div>
//                                     <div class="print-value">${moment(d?.createdAt).format("DD MMM YYYY, hh:mm A")}</div>
//                                 </div>
//                             </div>
//                             <div class="print-grid-item">
//                                 <div class="print-row">
//                                     <div class="print-label">Last Updated</div>
//                                     <div class="print-value">${moment(d?.updatedAt).format("DD MMM YYYY, hh:mm A")}</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <!-- Footer -->
//                     <div class="footer">
//                         This is a system generated receipt. No signature required.<br>
//                         For any queries, please contact support.
//                     </div>
//                 </div>
//                 <script>
//                     window.onload = () => {
//                         window.print();
//                         setTimeout(() => window.close(), 800);
//                     };
//                 <\/script>
//             </body>
//             </html>
//         `;
        
//         printWindow.document.write(printHTML);
//         printWindow.document.close();
//     };

//     return (
//         <Dialog
//             open={open}
//             onClose={onClose}
//             maxWidth="sm"
//             fullWidth
//             PaperProps={{
//                 sx: {
//                     borderRadius: 2.5,
//                     maxHeight: "88vh",
//                     mx: { xs: 1, sm: 2 },
//                     width: { xs: "calc(100% - 16px)", sm: "100%" },
//                 },
//             }}
//         >
//             {/* Header with Print Button */}
//             <DialogTitle
//                 sx={{
//                     p: "10px 14px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     borderBottom: "1px solid",
//                     borderColor: "divider",
//                     minHeight: 0,
//                 }}
//             >
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <ReceiptIcon sx={{ color: "primary.main", fontSize: 18 }} />
//                     <Typography sx={{ fontSize: "0.85rem", fontWeight: 800 }}>
//                         Payment Details
//                     </Typography>
//                     {d && (
//                         <Chip
//                             label={d.status?.toUpperCase()}
//                             size="small"
//                             sx={{
//                                 fontSize: "0.55rem",
//                                 fontWeight: 700,
//                                 height: 18,
//                                 bgcolor: statusCfg.bg,
//                                 color: statusCfg.color,
//                                 "& .MuiChip-label": { px: 0.8 },
//                             }}
//                         />
//                     )}
//                 </Box>
//                 <Box sx={{ display: "flex", gap: 0.5 }}>
//                     {/* Print Button - shows only when data is loaded */}
//                     {d && !paymentDetailsLoading && (
//                         <IconButton onClick={handlePrint} size="small" sx={{ p: 0.4 }} title="Print / Download Receipt">
//                             <PrintIcon sx={{ fontSize: 18 }} />
//                         </IconButton>
//                     )}
//                     <IconButton onClick={onClose} size="small" sx={{ p: 0.4 }}>
//                         <CloseIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                 </Box>
//             </DialogTitle>

//             {/* Content */}
//             <DialogContent
//                 sx={{
//                     p: { xs: 1.2, sm: 1.5 },
//                     overflowY: "auto",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: 1.2,
//                 }}
//             >
//                 {/* Loading */}
//                 {paymentDetailsLoading && (
//                     <>
//                         <Skeleton variant="rounded" height={70} sx={{ borderRadius: 2 }} />
//                         <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
//                         <Skeleton variant="rounded" height={100} sx={{ borderRadius: 2 }} />
//                     </>
//                 )}

//                 {/* Error */}
//                 {!paymentDetailsLoading && paymentDetailsError && (
//                     <Box sx={{ textAlign: "center", py: 4 }}>
//                         <ErrorIcon sx={{ fontSize: 36, color: "error.main", mb: 1 }} />
//                         <Typography color="error" sx={{ fontSize: "0.8rem" }}>
//                             Failed to load payment details
//                         </Typography>
//                     </Box>
//                 )}

//                 {/* Data - ALL information shown here will be printed */}
//                 {!paymentDetailsLoading && !paymentDetailsError && d && (
//                     <>
//                         {/* User Information */}
//                         <Section title="User" Icon={PersonIcon}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                                 <Avatar
//                                     sx={{
//                                         width: 36,
//                                         height: 36,
//                                         fontSize: "0.85rem",
//                                         fontWeight: 800,
//                                         bgcolor: alpha("#6366f1", 0.15),
//                                         color: "#6366f1",
//                                         flexShrink: 0,
//                                     }}
//                                 >
//                                     {d.user?.name?.[0]?.toUpperCase() || "?"}
//                                 </Avatar>
//                                 <Box sx={{ minWidth: 0 }}>
//                                     <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.2 }}>
//                                         {d.user?.name}
//                                     </Typography>
//                                     <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
//                                         <EmailIcon sx={{ fontSize: 11, color: "text.secondary", flexShrink: 0 }} />
//                                         <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                                             {d.user?.email}
//                                         </Typography>
//                                     </Box>
//                                 </Box>
//                             </Box>
//                         </Section>

//                         {/* Payment Information */}
//                         <Section title="Payment" Icon={CardIcon}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs={12}>
//                                     <Row label="Razorpay Order ID" value={d.razorpayOrderId} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Amount" value={`₹${d.amount?.toLocaleString("en-IN")}`} color="#10b981" />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Currency" value={d.currency || "INR"} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Box sx={{ mb: 1 }}>
//                                         <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: 0.4, lineHeight: 1 }}>
//                                             Status
//                                         </Typography>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3 }}>
//                                             <statusCfg.Icon sx={{ fontSize: 13, color: statusCfg.color }} />
//                                             <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: statusCfg.color }}>
//                                                 {d.status?.toUpperCase()}
//                                             </Typography>
//                                         </Box>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Receipt" value={d.receipt} />
//                                 </Grid>

//                                 {d.failureReason && (
//                                     <Grid item xs={12}>
//                                         <Row label="Failure Reason" value={d.failureReason} color="#dc2626" />
//                                     </Grid>
//                                 )}
//                                 {d.failedAt && (
//                                     <Grid item xs={12}>
//                                         <Row label="Failed At" value={moment(d.failedAt).format("DD MMM YYYY, hh:mm A")} />
//                                     </Grid>
//                                 )}
//                             </Grid>
//                         </Section>

//                         {/* Plan Information */}
//                         <Section title="Plan" Icon={ReceiptIcon}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs={12}>
//                                     <Row label="Plan Name" value={d.planName} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Duration" value={d.duration} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Max Users" value={d.maxUser} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row
//                                         label="Subscription"
//                                         value={d.isActive ? "Active" : "Inactive"}
//                                         color={d.isActive ? "#10b981" : "#ef4444"}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row
//                                         label="Expires At"
//                                         value={d.expiresAt ? moment(d.expiresAt).format("DD MMM YYYY") : null}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </Section>

//                         {/* Coupon Information */}
//                         {d.couponCode && (
//                             <Section title="Coupon" Icon={CouponIcon}>
//                                 <Grid container spacing={1}>
//                                     <Grid item xs={6}>
//                                         <Row label="Coupon Code" value={d.couponCode} color="#f59e0b" />
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <Row label="Original Amount" value={`₹${d.originalAmount?.toLocaleString("en-IN")}`} />
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <Row label="Discount" value={`- ₹${d.discountAmount?.toLocaleString("en-IN")}`} color="#10b981" />
//                                     </Grid>
//                                 </Grid>
//                             </Section>
//                         )}

//                         {/* Cancellation Information */}
//                         {d.isCancelledByUser && (
//                             <Section title="Cancellation" Icon={CancelIcon}>
//                                 <Grid container spacing={1}>
//                                     <Grid item xs={6}>
//                                         <Row
//                                             label="Cancelled At"
//                                             value={d.cancelledAt ? moment(d.cancelledAt).format("DD MMM YYYY, hh:mm A") : null}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <Row
//                                             label="Cancelled By"
//                                             value={d.cancelledBy || "User"}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <Row label="Reason" value={d.cancellationReason} />
//                                     </Grid>
//                                 </Grid>
//                             </Section>
//                         )}

//                         {/* Metadata / Timestamps */}
//                         <Section title="Timestamps" Icon={InfoIcon}>
//                             <Grid container spacing={1}>
//                                 <Grid item xs={6}>
//                                     <Row label="Created At" value={moment(d.createdAt).format("DD MMM YYYY, hh:mm A")} />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <Row label="Updated At" value={moment(d.updatedAt).format("DD MMM YYYY, hh:mm A")} />
//                                 </Grid>
//                             </Grid>
//                         </Section>
//                     </>
//                 )}
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default PaymentDetailsPopup;


















import React, { useEffect } from "react";
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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
    Close as CloseIcon,
    Receipt as ReceiptIcon,
    Person as PersonIcon,
    CreditCard as CardIcon,
    LocalOffer as CouponIcon,
    Cancel as CancelIcon,
    CheckCircle as CheckCircleIcon,
    Error as ErrorIcon,
    Schedule as ScheduleIcon,
    Email as EmailIcon,
    Info as InfoIcon,
    Print as PrintIcon,
    Extension as AddonIcon,
    ShoppingBag as PlanIcon,
    HourglassEmpty as PendingIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "../../redux/slices/paymentSlice";
import moment from "moment";

// ── Status chip configuration ──
const statusConfig = {
    completed: { color: "#10b981", bg: alpha("#10b981", 0.1), Icon: CheckCircleIcon, label: "Completed" },
    failed:    { color: "#dc2626", bg: alpha("#dc2626", 0.1), Icon: ErrorIcon, label: "Failed" },
    cancelled: { color: "#ef4444", bg: alpha("#ef4444", 0.1), Icon: CancelIcon, label: "Cancelled" },
    pending:   { color: "#f59e0b", bg: alpha("#f59e0b", 0.1), Icon: PendingIcon, label: "Pending" },
    default:   { color: "#9ca3af", bg: alpha("#9ca3af", 0.1), Icon: ScheduleIcon, label: "Unknown" },
};

const getStatusCfg = (status) => {
    if (!status) return statusConfig.default;
    const lowerStatus = status.toLowerCase();
    return statusConfig[lowerStatus] || statusConfig.default;
};

// ── Compact row ──
const Row = ({ label, value, color }) => (
    <div className="mb-2">
        <p className="text-[0.6rem] font-bold text-gray-500 uppercase tracking-wide leading-3">
            {label}
        </p>
        <p className={`text-[0.78rem] font-medium ${color ? `text-${color}` : 'text-gray-900'} break-all leading-4 mt-0.5`}>
            {value ?? "—"}
        </p>
    </div>
);

// ── Section card ──
const Section = ({ title, Icon, children }) => (
    <div className="p-3 rounded-lg border border-gray-200 bg-gray-50/30">
        <div className="flex items-center gap-2 mb-3">
            {Icon && <Icon className="text-[13px] text-indigo-600" />}
            <p className="text-[0.62rem] font-extrabold uppercase tracking-wide text-gray-500">
                {title}
            </p>
        </div>
        {children}
    </div>
);

// ── Main component ──
const PaymentDetailsPopup = ({ open, onClose, paymentId }) => {
    const dispatch = useDispatch();
    const { paymentDetailsData, paymentDetailsLoading, paymentDetailsError } =
        useSelector((state) => state.payment);

    useEffect(() => {
        if (open && paymentId) dispatch(getPaymentDetails(paymentId));
    }, [open, paymentId, dispatch]);

    const d = paymentDetailsData;
    const statusCfg = getStatusCfg(d?.status);
    const isAddon = d?.type === "addon";

    // ── Print Handler ──
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const statusCfgPrint = getStatusCfg(d?.status);
        
        const printHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${isAddon ? 'Add-On' : 'Payment'} Receipt - ${d?.razorpayOrderId || 'Details'}</title>
                <meta charset="utf-8" />
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px 20px; background: white; color: #1e293b; }
                    .print-container { max-width: 800px; margin: 0 auto; background: white; }
                    .print-header { text-align: center; padding: 20px 0 25px; border-bottom: 3px solid #6366f1; margin-bottom: 25px; }
                    .print-header h1 { font-size: 28px; margin-bottom: 8px; color: #6366f1; }
                    .print-header p { font-size: 12px; color: #64748b; margin-top: 5px; }
                    .print-section { margin-bottom: 25px; page-break-inside: avoid; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
                    .print-section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
                    .print-grid { display: flex; gap: 20px; flex-wrap: wrap; }
                    .print-grid-item { flex: 1; min-width: 200px; }
                    .print-row { margin-bottom: 14px; display: flex; align-items: flex-start; }
                    .print-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; width: 130px; flex-shrink: 0; }
                    .print-value { font-size: 13px; font-weight: 500; color: #1e293b; flex: 1; word-break: break-word; }
                    .user-info { display: flex; align-items: center; gap: 16px; padding: 12px; background: #f8fafc; border-radius: 12px; margin-bottom: 5px; }
                    .user-avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #818cf8); color: white; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; }
                    .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; background: ${statusCfgPrint.bg}; color: ${statusCfgPrint.color}; }
                    .amount-large { font-size: 20px; font-weight: 800; color: #10b981; }
                    .footer { text-align: center; padding-top: 20px; margin-top: 20px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; }
                    @media print { body { padding: 0; } .print-container { max-width: 100%; } .print-section { break-inside: avoid; } }
                </style>
            </head>
            <body>
                <div class="print-container">
                    <div class="print-header">
                        <h1>${isAddon ? '📦 Add-On Receipt' : '💰 Payment Receipt'}</h1>
                        <p>Transaction ID: ${d?.razorpayOrderId || 'N/A'}</p>
                        <p>Generated on: ${moment().format("DD MMM YYYY, hh:mm A")}</p>
                    </div>

                    <div class="print-section">
                        <div class="print-section-title">👤 USER INFORMATION</div>
                        <div class="user-info">
                            <div class="user-avatar">${d?.user?.name?.[0]?.toUpperCase() || 'U'}</div>
                            <div class="user-details">
                                <div class="user-name" style="font-size:16px; font-weight:800;">${d?.user?.name || 'Unknown User'}</div>
                                <div class="user-email" style="font-size:12px; color:#64748b;">📧 ${d?.user?.email || '—'}</div>
                            </div>
                        </div>
                    </div>

                    <div class="print-section">
                        <div class="print-section-title">💳 ${isAddon ? 'ADD-ON' : 'PAYMENT'} INFORMATION</div>
                        <div class="print-grid">
                            <div class="print-grid-item">
                                <div class="print-row"><div class="print-label">Razorpay Order ID</div><div class="print-value">${d?.razorpayOrderId || '—'}</div></div>
                              <div class="print-row"><div class="print-label">Amount</div><div class="print-value">₹${d?.amount?.toLocaleString("en-IN") || 0}</div></div>
                                <div class="print-row"><div class="print-label">Currency</div><div class="print-value">${d?.currency || 'INR'}</div></div>
                            </div>
                            <div class="print-grid-item">
                                <div class="print-row"><div class="print-label">Status</div><div class="print-value"><span class="status-badge">${d?.status?.toUpperCase() || 'PENDING'}</span></div></div>
                                <div class="print-row"><div class="print-label">Receipt No.</div><div class="print-value">${d?.receipt || '—'}</div></div>
                            </div>
                        </div>
                        ${d?.failureReason ? `<div class="print-row"><div class="print-label">Failure Reason</div><div class="print-value" style="color:#dc2626;">${d.failureReason}</div></div>` : ''}
                    </div>

                    <div class="print-section">
                        <div class="print-section-title">📋 ${isAddon ? 'ADD-ON' : 'PLAN'} INFORMATION</div>
                        <div class="print-grid">
                            <div class="print-grid-item">
                                <div class="print-row"><div class="print-label">${isAddon ? 'Add-On Name' : 'Plan Name'}</div><div class="print-value">${d?.planName || '—'}</div></div>
                                <div class="print-row"><div class="print-label">Duration</div><div class="print-value">${d?.duration || '—'}</div></div>
                            </div>
                            <div class="print-grid-item">
                                <div class="print-row"><div class="print-label">Max Users</div><div class="print-value">${d?.maxUser || '—'}</div></div>
                                <div class="print-row"><div class="print-label">Status</div><div class="print-value" style="color:${d?.isActive ? '#10b981' : '#ef4444'}">${d?.isActive ? 'Active' : 'Inactive'}</div></div>
                            </div>
                        </div>
                        <div class="print-row"><div class="print-label">Expires At</div><div class="print-value">${d?.expiresAt ? moment(d.expiresAt).format("DD MMM YYYY, hh:mm A") : '—'}</div></div>
                    </div>

                    ${d?.couponCode ? `
                    <div class="print-section">
                        <div class="print-section-title">🏷️ COUPON DETAILS</div>
                        <div class="print-grid">
                            <div class="print-grid-item"><div class="print-row"><div class="print-label">Coupon Code</div><div class="print-value" style="color:#f59e0b; font-weight:700;">${d.couponCode}</div></div></div>
                            <div class="print-grid-item"><div class="print-row"><div class="print-label">Original Amount</div><div class="print-value">₹${d.originalAmount?.toLocaleString("en-IN") || 0}</div></div></div>
                        </div>
                        <div class="print-row"><div class="print-label">Discount Applied</div><div class="print-value" style="color:#10b981;">- ₹${d.discountAmount?.toLocaleString("en-IN") || 0}</div></div>
                    </div>
                    ` : ''}

                    ${isAddon && d?.parentPaymentId ? `
                    <div class="print-section">
                        <div class="print-section-title">🔗 PARENT PAYMENT</div>
                        <div class="print-row"><div class="print-label">Parent Payment ID</div><div class="print-value">${d.parentPaymentId}</div></div>
                        <div class="print-row"><div class="print-label">Add-On ID</div><div class="print-value">${d.addOnId || '—'}</div></div>
                    </div>
                    ` : ''}

                    ${d?.isCancelledByUser ? `
                    <div class="print-section">
                        <div class="print-section-title">❌ CANCELLATION DETAILS</div>
                        <div class="print-row"><div class="print-label">Cancelled At</div><div class="print-value">${d.cancelledAt ? moment(d.cancelledAt).format("DD MMM YYYY, hh:mm A") : '—'}</div></div>
                        <div class="print-row"><div class="print-label">Reason</div><div class="print-value">${d.cancellationReason || '—'}</div></div>
                    </div>
                    ` : ''}

                    <div class="print-section">
                        <div class="print-section-title">⏱️ TIMESTAMP INFORMATION</div>
                        <div class="print-grid">
                            <div class="print-grid-item"><div class="print-row"><div class="print-label">Created At</div><div class="print-value">${moment(d?.createdAt).format("DD MMM YYYY, hh:mm A")}</div></div></div>
                            <div class="print-grid-item"><div class="print-row"><div class="print-label">Last Updated</div><div class="print-value">${moment(d?.updatedAt).format("DD MMM YYYY, hh:mm A")}</div></div></div>
                        </div>
                    </div>

                    <div class="footer">This is a system generated receipt. No signature required.<br>For any queries, please contact support.</div>
                </div>
                <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 800); };<\/script>
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
                sx: {
                    borderRadius: 2.5,
                    maxHeight: "88vh",
                    mx: { xs: 1, sm: 2 },
                    width: { xs: "calc(100% - 16px)", sm: "100%" },
                },
            }}
        >
            {/* Header */}
            <DialogTitle className="px-3 py-2.5 flex justify-between items-center border-b border-gray-200 min-h-0">
                <div className="flex items-center gap-2">
                    {isAddon ? (
                        <AddonIcon className="text-indigo-600 text-[18px]" />
                    ) : (
                        <ReceiptIcon className="text-indigo-600 text-[18px]" />
                    )}
                    <p className="text-[0.85rem] font-extrabold">
                        {isAddon ? "Add-On Details" : "Payment Details"}
                    </p>
                    {d && (
                        <Chip
                            label={d.status?.toUpperCase() || "PENDING"}
                            size="small"
                            className="h-[18px] text-[0.55rem] font-bold"
                            sx={{
                                bgcolor: statusCfg.bg,
                                color: statusCfg.color,
                                "& .MuiChip-label": { px: 0.8 },
                            }}
                        />
                    )}
                </div>
                <div className="flex gap-1">
                    {d && !paymentDetailsLoading && (
                        <IconButton onClick={handlePrint} size="small" className="p-1" title="Print / Download Receipt">
                            <PrintIcon className="text-[18px]" />
                        </IconButton>
                    )}
                    <IconButton onClick={onClose} size="small" className="p-1">
                        <CloseIcon className="text-[16px]" />
                    </IconButton>
                </div>
            </DialogTitle>

            {/* Content */}
            <DialogContent className="p-3 overflow-y-auto flex flex-col gap-3">
                {/* Loading */}
                {paymentDetailsLoading && (
                    <div className="space-y-3">
                        <Skeleton variant="rounded" height={70} className="rounded-lg" />
                        <Skeleton variant="rounded" height={120} className="rounded-lg" />
                        <Skeleton variant="rounded" height={100} className="rounded-lg" />
                    </div>
                )}

                {/* Error */}
                {!paymentDetailsLoading && paymentDetailsError && (
                    <div className="text-center py-6">
                        <ErrorIcon className="text-[36px] text-red-500 mb-2" />
                        <p className="text-red-500 text-[0.8rem]">Failed to load payment details</p>
                    </div>
                )}

                {/* Data */}
                {!paymentDetailsLoading && !paymentDetailsError && d && (
                    <div className="space-y-3">
                        {/* User Information */}
                        <Section title="User" Icon={PersonIcon}>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-9 h-9 text-[0.85rem] font-extrabold bg-indigo-100 text-indigo-600 flex-shrink-0">
                                    {d.user?.name?.[0]?.toUpperCase() || "?"}
                                </Avatar>
                                <div className="min-w-0">
                                    <p className="text-[0.82rem] font-bold leading-tight">{d.user?.name}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <EmailIcon className="text-[11px] text-gray-500 flex-shrink-0" />
                                        <p className="text-[0.68rem] text-gray-500 truncate">{d.user?.email}</p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Payment / Add-On Information */}
                        <Section title={isAddon ? "Add-On Information" : "Payment Information"} Icon={CardIcon}>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="col-span-2">
                                    <Row label="Razorpay Order ID" value={d.razorpayOrderId} />
                                </div>
                                <Row label="Amount" value={`₹${d.amount?.toLocaleString("en-IN")}`} color="green-600" />
                                <Row label="Currency" value={d.currency || "INR"} />
                                <div>
                                    <p className="text-[0.6rem] font-bold text-gray-500 uppercase tracking-wide">Status</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        {React.createElement(statusCfg.Icon, { className: "text-[13px]", style: { color: statusCfg.color } })}
                                        <p className="text-[0.78rem] font-semibold" style={{ color: statusCfg.color }}>
                                            {d.status?.toUpperCase() || "PENDING"}
                                        </p>
                                    </div>
                                </div>
                                <Row label="Receipt" value={d.receipt} />
                                {d.failureReason && (
                                    <div className="col-span-2">
                                        <Row label="Failure Reason" value={d.failureReason} color="red-600" />
                                    </div>
                                )}
                                {d.failedAt && (
                                    <div className="col-span-2">
                                        <Row label="Failed At" value={moment(d.failedAt).format("DD MMM YYYY, hh:mm A")} />
                                    </div>
                                )}
                            </div>
                        </Section>

                        {/* Plan / Add-On Details */}
                        <Section title={isAddon ? "Add-On Details" : "Plan Details"} Icon={isAddon ? AddonIcon : ReceiptIcon}>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="col-span-2">
                                    <Row label={isAddon ? "Add-On Name" : "Plan Name"} value={d.planName} />
                                </div>
                                <Row label="Duration" value={d.duration} />
                                <Row label="Max Users" value={d.maxUser} />
                                <Row label="Subscription" value={d.isActive ? "Active" : "Inactive"} color={d.isActive ? "green-600" : "red-600"} />
                                <Row label="Expires At" value={d.expiresAt ? moment(d.expiresAt).format("DD MMM YYYY") : null} />
                            </div>
                        </Section>

                        {/* Coupon Information */}
                        {d.couponCode && (
                            <Section title="Coupon" Icon={CouponIcon}>
                                <div className="grid grid-cols-2 gap-1">
                                    <Row label="Coupon Code" value={d.couponCode} color="amber-600" />
                                    <Row label="Original Amount" value={`₹${d.originalAmount?.toLocaleString("en-IN")}`} />
                                    <Row label="Discount" value={`- ₹${d.discountAmount?.toLocaleString("en-IN")}`} color="green-600" />
                                </div>
                            </Section>
                        )}

                        {/* Parent Payment Info (for Add-ons) */}
                        {isAddon && d.parentPaymentId && (
                            <Section title="Parent Payment" Icon={ReceiptIcon}>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="col-span-2">
                                        <Row label="Parent Payment ID" value={d.parentPaymentId} />
                                    </div>
                                    <Row label="Add-On ID" value={d.addOnId} />
                                    <Row label="Parent Plan" value={d.planName} />
                                </div>
                            </Section>
                        )}

                        {/* Cancellation Information */}
                        {d.isCancelledByUser && (
                            <Section title="Cancellation" Icon={CancelIcon}>
                                <div className="grid grid-cols-2 gap-1">
                                    <Row label="Cancelled At" value={d.cancelledAt ? moment(d.cancelledAt).format("DD MMM YYYY, hh:mm A") : null} />
                                    <div className="col-span-2">
                                        <Row label="Reason" value={d.cancellationReason} />
                                    </div>
                                </div>
                            </Section>
                        )}

                        {/* Timestamps */}
                        <Section title="Timestamps" Icon={InfoIcon}>
                            <div className="grid grid-cols-2 gap-1">
                                <Row label="Created At" value={moment(d.createdAt).format("DD MMM YYYY, hh:mm A")} />
                                <Row label="Updated At" value={moment(d.updatedAt).format("DD MMM YYYY, hh:mm A")} />
                            </div>
                        </Section>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PaymentDetailsPopup;