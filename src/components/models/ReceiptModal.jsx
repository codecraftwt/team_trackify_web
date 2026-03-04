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
















////////////////////////////// Change Color Theam/////////////////////////////////////




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
} from "@mui/material";
import {
  Close as CloseIcon,
  Print as PrintIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const ReceiptModal = ({ transaction, show, onHide }) => {
  const receiptRef = useRef();

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
              padding: 40px;
              background: #fff;
              color: #1e293b;
              line-height: 1.5;
            }
            .receipt-container { max-width: 800px; margin: 0 auto; }
            .text-center { text-align: center; }
            .fw-bold { font-weight: 700; }
            .text-muted { color: #64748b; }
            .border-bottom { border-bottom: 1px solid #e2e8f0; }
            .border-top { border-top: 1px solid #e2e8f0; }
            .py-3 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-3 { margin-bottom: 1rem; }
            .mb-4 { margin-bottom: 1.5rem; }
            .mt-4 { margin-top: 1.5rem; }
            .d-flex { display: flex; justify-content: space-between; }
            .fs-5 { font-size: 1.1rem; }
            .small { font-size: 0.875rem; }
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
          maxWidth="md"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
            transition: { duration: 0.3 },
            sx: {
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            },
          }}
        >
          {/* Header */}
          <DialogTitle
            sx={{
              background: "linear-gradient(135deg, #2563EB, #1E40AF)",
              color: "white",
              py: 2,
              px: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <ReceiptIcon />
              <Typography variant="h6" fontWeight={600}>
                Transaction Receipt
              </Typography>
            </Box>
            <IconButton
              onClick={onHide}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: alpha("#ffffff", 0.1),
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          {/* Content */}
          <DialogContent sx={{ p: 0 }}>
            <Box
              ref={receiptRef}
              sx={{
                p: 4,
                bgcolor: "white",
                color: "#1e293b",
              }}
            >
              {/* Receipt Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: "#2563EB", mb: 1 }}>
                  Payment Receipt
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transaction ID: {transaction._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
                </Typography>
              </Box>

              {/* Transaction Details */}
              <Box
                sx={{
                  borderTop: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: alpha("#2563EB", 0.1),
                  py: 2.5,
                  mb: 3,
                }}
              >
                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      Description:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {transaction.description ||
                        `Payment for ${transaction.planId?.name || "Plan"}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      Status:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        color: transaction.status === "completed" ? "#22c55e" : "#f59e0b",
                        textTransform: "capitalize",
                      }}
                    >
                      {transaction.status}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" color="text.secondary">
                      Payment Method:
                    </Typography>
                    <Typography variant="body2" fontWeight={500} sx={{ textTransform: "capitalize" }}>
                      {transaction.paymentMethod || "N/A"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Plan Details */}
              {transaction.planId && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ color: "#2563EB", mb: 1.5 }}>
                    Plan Details
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Plan Name:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {transaction.planId.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Duration:
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {transaction.planId.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2" color="text.secondary">
                        Amount:
                      </Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ color: "#2563EB" }}>
                        {formatAmount(transaction.amount)}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              )}

              {/* Add-ons */}
              {transaction.addOns && transaction.addOns.filter(a => a.status === "completed").length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ color: "#2563EB", mb: 1.5 }}>
                    Add-Ons
                  </Typography>
                  <Stack spacing={1}>
                    {transaction.addOns
                      .filter((addOn) => addOn.status === "completed")
                      .map((addOn, idx) => (
                        <Box key={idx} sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="body2" color="text.secondary">
                            Upgrade to {addOn.addOnMaxUser} users:
                          </Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e" }}>
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
                  borderColor: alpha("#2563EB", 0.1),
                  pt: 2.5,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6" fontWeight={600}>
                    Total Amount:
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: "#2563EB" }}>
                    {formatAmount(getTotalAmount())}
                  </Typography>
                </Box>
              </Box>

              {/* Footer */}
              <Box
                sx={{
                  textAlign: "center",
                  mt: 4,
                  pt: 3,
                  borderTop: "1px solid",
                  borderColor: alpha("#2563EB", 0.1),
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Thank you for your payment!
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  For any queries, please contact support
                </Typography>
              </Box>
            </Box>
          </DialogContent>

          {/* Actions */}
          <DialogActions
            sx={{
              p: 2.5,
              borderTop: "1px solid",
              borderColor: alpha("#2563EB", 0.1),
              bgcolor: "#ffffff",
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              onClick={onHide}
              startIcon={<CloseIcon />}
              sx={{
                borderColor: alpha("#2563EB", 0.3),
                color: "#2563EB",
                "&:hover": {
                  borderColor: "#2563EB",
                  color: "#2563EB",
                  bgcolor: alpha("#2563EB", 0.1),
                },
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={handlePrint}
              startIcon={<PrintIcon />}
              sx={{
                background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1E40AF, #2563EB)",
                },
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