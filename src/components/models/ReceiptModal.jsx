// import React, { useRef } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Divider, 
//   Paper,
//   Stack,
//   alpha,
// } from "@mui/material";
// import {
//   Close as CloseIcon,
//   Print as PrintIcon,
//   Receipt as ReceiptIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const ReceiptModal = ({ transaction, show, onHide }) => {
//   const receiptRef = useRef();

//   const handlePrint = () => {
//     const printContents = receiptRef.current.innerHTML;
//     const printWindow = window.open("", "", "width=800,height=600");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Receipt</title>
//           <style>
//             body {
//               font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//               padding: 40px;
//               background: #fff;
//               color: #1e293b;
//               line-height: 1.5;
//             }
//             .receipt-container { max-width: 800px; margin: 0 auto; }
//             .text-center { text-align: center; }
//             .fw-bold { font-weight: 700; }
//             .text-muted { color: #64748b; }
//             .border-bottom { border-bottom: 1px solid #e2e8f0; }
//             .border-top { border-top: 1px solid #e2e8f0; }
//             .py-3 { padding-top: 1rem; padding-bottom: 1rem; }
//             .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
//             .mb-2 { margin-bottom: 0.5rem; }
//             .mb-3 { margin-bottom: 1rem; }
//             .mb-4 { margin-bottom: 1.5rem; }
//             .mt-4 { margin-top: 1.5rem; }
//             .d-flex { display: flex; justify-content: space-between; }
//             .fs-5 { font-size: 1.1rem; }
//             .small { font-size: 0.875rem; }
//           </style>
//         </head>
//         <body>
//           <div class="receipt-container">
//             ${printContents}
//           </div>
//           <script>
//             window.onload = function() { window.print(); window.close(); }
//           </script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getTotalAmount = () => {
//     const successfulAddOns =
//       transaction?.addOns?.filter((addOn) => addOn.status === "completed") || [];
//     const totalAddOnAmount = successfulAddOns.reduce(
//       (sum, addOn) => sum + addOn.addOnAmount,
//       0
//     );
//     return (transaction?.amount || 0) + totalAddOnAmount;
//   };

//   if (!transaction) return null;

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onHide}
//           maxWidth="md"
//           fullWidth
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50 },
//             animate: { opacity: 1, y: 0 },
//             exit: { opacity: 0, y: 50 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: 4,
//               overflow: "hidden",
//               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//             },
//           }}
//         >
//           {/* Header */}
//           <DialogTitle
//             sx={{
//               bgcolor: "#0f766e",
//               color: "white",
//               py: 2,
//               px: 3,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <ReceiptIcon />
//               <Typography variant="h6" fontWeight={600}>
//                 Transaction Receipt
//               </Typography>
//             </Box>
//             <IconButton
//               onClick={onHide}
//               sx={{
//                 color: "white",
//                 "&:hover": {
//                   bgcolor: alpha("#ffffff", 0.1),
//                 },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>

//           {/* Content */}
//           <DialogContent sx={{ p: 0 }}>
//             <Box
//               ref={receiptRef}
//               sx={{
//                 p: 4,
//                 bgcolor: "white",
//                 color: "#1e293b",
//               }}
//             >
//               {/* Receipt Header */}
//               <Box sx={{ textAlign: "center", mb: 4 }}>
//                 <Typography variant="h5" fontWeight={700} sx={{ color: "#0f766e", mb: 1 }}>
//                   Payment Receipt
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Transaction ID: {transaction._id}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Date: {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
//                 </Typography>
//               </Box>

//               {/* Transaction Details */}
//               <Box
//                 sx={{
//                   borderTop: "1px solid",
//                   borderBottom: "1px solid",
//                   borderColor: alpha("#e2e8f0", 0.5),
//                   py: 2.5,
//                   mb: 3,
//                 }}
//               >
//                 <Stack spacing={1.5}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body2" color="text.secondary">
//                       Description:
//                     </Typography>
//                     <Typography variant="body2" fontWeight={500}>
//                       {transaction.description ||
//                         `Payment for ${transaction.planId?.name || "Plan"}`}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body2" color="text.secondary">
//                       Status:
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       fontWeight={600}
//                       sx={{
//                         color: transaction.status === "completed" ? "#22c55e" : "#f59e0b",
//                         textTransform: "capitalize",
//                       }}
//                     >
//                       {transaction.status}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body2" color="text.secondary">
//                       Payment Method:
//                     </Typography>
//                     <Typography variant="body2" fontWeight={500} sx={{ textTransform: "capitalize" }}>
//                       {transaction.paymentMethod || "N/A"}
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Box>

//               {/* Plan Details */}
//               {transaction.planId && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="subtitle2" fontWeight={600} sx={{ color: "#0f766e", mb: 1.5 }}>
//                     Plan Details
//                   </Typography>
//                   <Stack spacing={1}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                       <Typography variant="body2" color="text.secondary">
//                         Plan Name:
//                       </Typography>
//                       <Typography variant="body2" fontWeight={500}>
//                         {transaction.planId.name}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                       <Typography variant="body2" color="text.secondary">
//                         Duration:
//                       </Typography>
//                       <Typography variant="body2" fontWeight={500}>
//                         {transaction.planId.duration}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                       <Typography variant="body2" color="text.secondary">
//                         Amount:
//                       </Typography>
//                       <Typography variant="body2" fontWeight={600} sx={{ color: "#0f766e" }}>
//                         {formatAmount(transaction.amount)}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 </Box>
//               )}

//               {/* Add-ons */}
//               {transaction.addOns && transaction.addOns.filter(a => a.status === "completed").length > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="subtitle2" fontWeight={600} sx={{ color: "#0f766e", mb: 1.5 }}>
//                     Add-Ons
//                   </Typography>
//                   <Stack spacing={1}>
//                     {transaction.addOns
//                       .filter((addOn) => addOn.status === "completed")
//                       .map((addOn, idx) => (
//                         <Box key={idx} sx={{ display: "flex", justifyContent: "space-between" }}>
//                           <Typography variant="body2" color="text.secondary">
//                             Upgrade to {addOn.addOnMaxUser} users:
//                           </Typography>
//                           <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e" }}>
//                             +{formatAmount(addOn.addOnAmount)}
//                           </Typography>
//                         </Box>
//                       ))}
//                   </Stack>
//                 </Box>
//               )}

//               {/* Total */}
//               <Box
//                 sx={{
//                   borderTop: "1px solid",
//                   borderColor: alpha("#e2e8f0", 0.5),
//                   pt: 2.5,
//                 }}
//               >
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Typography variant="h6" fontWeight={600}>
//                     Total Amount:
//                   </Typography>
//                   <Typography variant="h5" fontWeight={700} sx={{ color: "#0f766e" }}>
//                     {formatAmount(getTotalAmount())}
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Footer */}
//               <Box
//                 sx={{
//                   textAlign: "center",
//                   mt: 4,
//                   pt: 3,
//                   borderTop: "1px solid",
//                   borderColor: alpha("#e2e8f0", 0.5),
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Thank you for your payment!
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   For any queries, please contact support
//                 </Typography>
//               </Box>
//             </Box>
//           </DialogContent>

//           {/* Actions */}
//           <DialogActions
//             sx={{
//               p: 2.5,
//               borderTop: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//                bgcolor:"#ffffff",
//               gap: 1,
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onHide}
//               startIcon={<CloseIcon />}
//               sx={{
//                 borderColor: "#e2e8f0",
//                 color: "#64748b",
//                 "&:hover": {
//                   borderColor: "#0f766e",
//                   color: "#0f766e",
//                   bgcolor: alpha("#0f766e", 0.1),
//                 },
//               }}
//             >
//               Close
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handlePrint}
//               startIcon={<PrintIcon />}
//               sx={{
//                 bgcolor: "#0f766e",
//                 "&:hover": {
//                   bgcolor: "#0a5c55",
//                 },
//               }}
//             >
//               Print Receipt
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ReceiptModal;
















// import React, { useRef } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Divider,
//   Paper,
//   Stack,
//   alpha,
//   useTheme,
// } from "@mui/material";
// import {
//   Close as CloseIcon,
//   Print as PrintIcon,
//   Receipt as ReceiptIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const ReceiptModal = ({ transaction, show, onHide }) => {
//   const theme = useTheme();
//   const receiptRef = useRef();

//   const handlePrint = () => {
//     const printContents = receiptRef.current.innerHTML;
//     const printWindow = window.open("", "", "width=800,height=600");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Receipt</title>
//           <style>
//             body {
//               font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//               padding: 40px;
//               background: #fff;
//               color: #1e293b;
//               line-height: 1.5;
//             }
//             .receipt-container { max-width: 800px; margin: 0 auto; }
//             .text-center { text-align: center; }
//             .fw-bold { font-weight: 700; }
//             .text-muted { color: #64748b; }
//             .border-bottom { border-bottom: 1px solid #e2e8f0; }
//             .border-top { border-top: 1px solid #e2e8f0; }
//             .py-3 { padding-top: 1rem; padding-bottom: 1rem; }
//             .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
//             .mb-2 { margin-bottom: 0.5rem; }
//             .mb-3 { margin-bottom: 1rem; }
//             .mb-4 { margin-bottom: 1.5rem; }
//             .mt-4 { margin-top: 1.5rem; }
//             .d-flex { display: flex; justify-content: space-between; }
//             .fs-5 { font-size: 1.1rem; }
//             .small { font-size: 0.875rem; }
//           </style>
//         </head>
//         <body>
//           <div class="receipt-container">
//             ${printContents}
//           </div>
//           <script>
//             window.onload = function() { window.print(); window.close(); }
//           </script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatAmount = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   const getTotalAmount = () => {
//     const successfulAddOns =
//       transaction?.addOns?.filter((addOn) => addOn.status === "completed") || [];
//     const totalAddOnAmount = successfulAddOns.reduce(
//       (sum, addOn) => sum + addOn.addOnAmount,
//       0
//     );
//     return (transaction?.amount || 0) + totalAddOnAmount;
//   };

//   if (!transaction) return null;

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onHide}
//           maxWidth="md"
//           fullWidth
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50 },
//             animate: { opacity: 1, y: 0 },
//             exit: { opacity: 0, y: 50 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: 4,
//               overflow: "hidden",
//               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//             },
//           }}
//         >
//           {/* Header */}
//           <DialogTitle
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               color: "white",
//               py: 2,
//               px: 3,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <ReceiptIcon />
//               <Typography variant="h6" fontWeight={600}>
//                 Transaction Receipt
//               </Typography>
//             </Box>
//             <IconButton
//               onClick={onHide}
//               sx={{
//                 color: "white",
//                 "&:hover": {
//                   bgcolor: alpha("#ffffff", 0.1),
//                 },
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>

//           {/* Content */}
//           <DialogContent sx={{ p: 0 }}>
//             <Box
//               ref={receiptRef}
//               sx={{
//                 p: 4,
//                 bgcolor: "background.paper",
//                 color: "text.primary",
//               }}
//             >
//               {/* Receipt Header */}
//               <Box sx={{ textAlign: "center", mb: 4 }}>
//                 <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, mb: 1 }}>
//                   Payment Receipt
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Transaction ID: {transaction._id}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Date: {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
//                 </Typography>
//               </Box>

//               {/* Transaction Details */}
//               <Box
//                 sx={{
//                   borderTop: "1px solid",
//                   borderBottom: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   py: 2.5,
//                   mb: 3,
//                 }}
//               >
//                 <Stack spacing={1.5}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body2" color="text.secondary">
//                       Description:
//                     </Typography>
//                     <Typography variant="body2" fontWeight={500} color="text.primary">
//                       {transaction.description ||
//                         `Payment for ${transaction.planId?.name || "Plan"}`}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body2" color="text.secondary">
//                       Status:
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       fontWeight={600}
//                       sx={{
//                         color: transaction.status === "completed" ? "#22c55e" : theme.palette.secondary.main,
//                         textTransform: "capitalize",
//                       }}
//                     >
//                       {transaction.status}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography variant="body2" color="text.secondary">
//                       Payment Method:
//                     </Typography>
//                     <Typography variant="body2" fontWeight={500} color="text.primary" sx={{ textTransform: "capitalize" }}>
//                       {transaction.paymentMethod || "N/A"}
//                     </Typography>
//                   </Box>
//                 </Stack>
//               </Box>

//               {/* Plan Details */}
//               {transaction.planId && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="subtitle2" fontWeight={600} sx={{ color: theme.palette.primary.main, mb: 1.5 }}>
//                     Plan Details
//                   </Typography>
//                   <Stack spacing={1}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                       <Typography variant="body2" color="text.secondary">
//                         Plan Name:
//                       </Typography>
//                       <Typography variant="body2" fontWeight={500} color="text.primary">
//                         {transaction.planId.name}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                       <Typography variant="body2" color="text.secondary">
//                         Duration:
//                       </Typography>
//                       <Typography variant="body2" fontWeight={500} color="text.primary">
//                         {transaction.planId.duration}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                       <Typography variant="body2" color="text.secondary">
//                         Amount:
//                       </Typography>
//                       <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main }}>
//                         {formatAmount(transaction.amount)}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                 </Box>
//               )}

//               {/* Add-ons */}
//               {transaction.addOns && transaction.addOns.filter(a => a.status === "completed").length > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="subtitle2" fontWeight={600} sx={{ color: theme.palette.primary.main, mb: 1.5 }}>
//                     Add-Ons
//                   </Typography>
//                   <Stack spacing={1}>
//                     {transaction.addOns
//                       .filter((addOn) => addOn.status === "completed")
//                       .map((addOn, idx) => (
//                         <Box key={idx} sx={{ display: "flex", justifyContent: "space-between" }}>
//                           <Typography variant="body2" color="text.secondary">
//                             Upgrade to {addOn.addOnMaxUser} users:
//                           </Typography>
//                           <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e" }}>
//                             +{formatAmount(addOn.addOnAmount)}
//                           </Typography>
//                         </Box>
//                       ))}
//                   </Stack>
//                 </Box>
//               )}

//               {/* Total */}
//               <Box
//                 sx={{
//                   borderTop: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   pt: 2.5,
//                 }}
//               >
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Typography variant="h6" fontWeight={600} color="text.primary">
//                     Total Amount:
//                   </Typography>
//                   <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main }}>
//                     {formatAmount(getTotalAmount())}
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Footer */}
//               <Box
//                 sx={{
//                   textAlign: "center",
//                   mt: 4,
//                   pt: 3,
//                   borderTop: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Thank you for your payment!
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   For any queries, please contact support
//                 </Typography>
//               </Box>
//             </Box>
//           </DialogContent>

//           {/* Actions */}
//           <DialogActions
//             sx={{
//               p: 2.5,
//               borderTop: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               bgcolor: "background.paper",
//               gap: 1,
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onHide}
//               startIcon={<CloseIcon />}
//               sx={{
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//                 color: theme.palette.primary.main,
//                 "&:hover": {
//                   borderColor: theme.palette.primary.main,
//                   color: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 },
//               }}
//             >
//               Close
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handlePrint}
//               startIcon={<PrintIcon />}
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 "&:hover": {
//                   background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                 },
//               }}
//             >
//               Print Receipt
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ReceiptModal;



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
} from "@mui/material";
import {
  Close as CloseIcon,
  Print as PrintIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const ReceiptModal = ({ transaction, show, onHide }) => {
  const theme = useTheme();
  const receiptRef = useRef();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const handlePrint = () => {
    const printContents = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 30px;
              background: #fff;
              color: #1e293b;
              line-height: 1.5;
            }
            .receipt-container { max-width: 700px; margin: 0 auto; }
            .text-center { text-align: center; }
            .fw-bold { font-weight: 700; }
            .text-muted { color: #64748b; }
            .border-bottom { border-bottom: 1px solid #e2e8f0; }
            .border-top { border-top: 1px solid #e2e8f0; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 0.75rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mt-3 { margin-top: 0.75rem; }
            .d-flex { display: flex; justify-content: space-between; }
            .fs-6 { font-size: 0.9rem; }
            .small { font-size: 0.75rem; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            ${printContents}
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

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

  const getTotalAmount = () => {
    const successfulAddOns =
      transaction?.addOns?.filter((addOn) => addOn.status === "completed") || [];
    const totalAddOnAmount = successfulAddOns.reduce(
      (sum, addOn) => sum + addOn.addOnAmount,
      0
    );
    return (transaction?.amount || 0) + totalAddOnAmount;
  };

  if (!transaction) return null;

  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={onHide}
          maxWidth="sm"
          fullWidth
          fullScreen={isSmallMobile}
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
            transition: { duration: 0.3 },
            sx: {
              borderRadius: isSmallMobile ? 0 : { xs: 2, sm: 2.5, md: 3 },
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              m: isSmallMobile ? 0 : { xs: 1, sm: 1.5, md: 2 },
              maxHeight: '90vh',
            },
          }}
        >
          {/* Header - Smaller */}
          <DialogTitle
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "white",
              py: { xs: 1.5, sm: 1.8, md: 2 },
              px: { xs: 2, sm: 2.5, md: 3 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.2 } }}>
              <ReceiptIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 } }} />
              <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight={600} sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                Transaction Receipt
              </Typography>
            </Box>
            <IconButton
              onClick={onHide}
              size="small"
              sx={{
                color: "white",
                width: 28,
                height: 28,
                "&:hover": {
                  bgcolor: alpha("#ffffff", 0.1),
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </DialogTitle>

          {/* Content - Smaller */}
          <DialogContent sx={{ p: 0 }}>
            <Box
              ref={receiptRef}
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                bgcolor: "background.paper",
                color: "text.primary",
              }}
            >
              {/* Receipt Header */}
              <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 2.5, md: 3 } }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: theme.palette.primary.main, mb: 0.5, fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
                  Payment Receipt
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                  ID: {transaction._id.substring(0, 12)}...
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                  {formatDate(transaction.createdAt)} • {formatTime(transaction.createdAt)}
                </Typography>
              </Box>

              {/* Transaction Details */}
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  py: { xs: 1.5, sm: 2 },
                  mb: { xs: 2, sm: 2.5 },
                }}
              >
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                      Description:
                    </Typography>
                    <Typography variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' }, textAlign: 'right', maxWidth: '70%' }}>
                      {transaction.description?.substring(0, 40) ||
                        `Payment for ${transaction.planId?.name || "Plan"}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                      Status:
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight={600}
                      sx={{
                        color: transaction.status === "completed" ? "#22c55e" : theme.palette.secondary.main,
                        textTransform: "capitalize",
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      }}
                    >
                      {transaction.status}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                      Payment Method:
                    </Typography>
                    <Typography variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' }, textTransform: "capitalize" }}>
                      {transaction.paymentMethod || "Online"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Plan Details */}
              {transaction.planId && (
                <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ color: theme.palette.primary.main, mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                    Plan Details
                  </Typography>
                  <Stack spacing={0.8}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                        Plan Name:
                      </Typography>
                      <Typography variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                        {transaction.planId.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                        Duration:
                      </Typography>
                      <Typography variant="caption" fontWeight={500} color="text.primary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                        {transaction.planId.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                        Amount:
                      </Typography>
                      <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                        {formatAmount(transaction.amount)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              )}

              {/* Add-ons */}
              {transaction.addOns && transaction.addOns.filter(a => a.status === "completed").length > 0 && (
                <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ color: theme.palette.primary.main, mb: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                    Add-Ons
                  </Typography>
                  <Stack spacing={0.8}>
                    {transaction.addOns
                      .filter((addOn) => addOn.status === "completed")
                      .map((addOn, idx) => (
                        <Box key={idx} sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                            Upgrade to {addOn.addOnMaxUser} users:
                          </Typography>
                          <Typography variant="caption" fontWeight={600} sx={{ color: "#22c55e", fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                            +{formatAmount(addOn.addOnAmount)}
                          </Typography>
                        </Box>
                      ))}
                  </Stack>
                </Box>
              )}

              {/* Total */}
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  pt: { xs: 1.5, sm: 2 },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Total:
                  </Typography>
                  <Typography variant="body1" fontWeight={700} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {formatAmount(getTotalAmount())}
                  </Typography>
                </Box>
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  textAlign: "center",
                  mt: { xs: 2, sm: 2.5 },
                  pt: { xs: 1.5, sm: 2 },
                  borderTop: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>
                  Thank you for your payment!
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' }, mt: 0.3 }}>
                  For any queries, please contact support
                </Typography>
              </Box>
            </Box>
          </DialogContent>

          {/* Actions - Smaller */}
          <DialogActions
            sx={{
              p: { xs: 1.5, sm: 2, md: 2.5 },
              pt: { xs: 1, sm: 1.5, md: 2 },
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "center",
              gap: { xs: 0.8, sm: 1 },
              borderTop: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              bgcolor: "background.paper",
            }}
          >
            <Button
              variant="outlined"
              onClick={onHide}
              startIcon={<CloseIcon sx={{ fontSize: 16 }} />}
              fullWidth={isMobile}
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: 100 },
                py: { xs: 0.6, sm: 0.7 },
                px: { xs: 1.5, sm: 2 },
                borderRadius: 1.5,
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                order: { xs: 2, sm: 1 },
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handlePrint}
              startIcon={<PrintIcon sx={{ fontSize: 16 }} />}
              fullWidth={isMobile}
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: 100 },
                py: { xs: 0.6, sm: 0.7 },
                px: { xs: 1.5, sm: 2 },
                borderRadius: 1.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                order: { xs: 1, sm: 2 },
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Print
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ReceiptModal;













