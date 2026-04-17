// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   alpha,
//   CircularProgress,
// } from "@mui/material";
// import moment from "moment";
// import { useTheme } from "@mui/material/styles";

// const BasePriceDialog = ({ open, onClose, basePriceData, onSave, loading }) => {
//   const theme = useTheme();
//   const [newBasePrice, setNewBasePrice] = useState("");
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (open && basePriceData) {
//       setNewBasePrice(basePriceData.currentPrice?.toString() || "");
//     }
//   }, [open, basePriceData]);

//   const handleSave = async () => {
//     const price = parseFloat(newBasePrice);
//     if (!price || price <= 0) {
//       return;
//     }
//     setSaving(true);
//     await onSave(price);
//     setSaving(false);
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xs"
//       fullWidth
//       PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
//     >
//       <DialogTitle
//         sx={{
//           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//           color: "white",
//           py: 2,
//           px: 3,
//           display: "flex",
//           alignItems: "center",
//           gap: 1.5,
//         }}
//       >
//         <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem", color: "white" }}>
//           Custom Plan Price
//         </Typography>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3 }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
//             <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
//           </Box>
//         ) : basePriceData ? (
//           <>
//             {/* Metric cards */}
//             <Grid container className="mt-2" spacing={1.5} sx={{ mb: 2.5 }}>
//               <Grid item xs={6}>
//                 <Box
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.07),
//                     borderRadius: 2,
//                     p: 1.5,
//                     border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem", display: "block", mb: 0.5 }}>
//                     Current price / user / month
//                   </Typography>
//                   <Typography variant="h5" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: "1.5rem", lineHeight: 1 }}>
//                     ₹{basePriceData.currentPrice ?? "—"}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.03),
//                     borderRadius: 2,
//                     p: 1.5,
//                     border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem", display: "block", mb: 0.5 }}>
//                     Previous price
//                   </Typography>
//                   <Typography variant="h5" fontWeight={600} color="text.secondary" sx={{ fontSize: "1.5rem", lineHeight: 1 }}>
//                     ₹{basePriceData.previousPrice ?? "—"}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>

//             {/* Metadata rows */}
//             <Box sx={{ mb: 2.5 }}>
//               {[
//                 {
//                   label: "Created at",
//                   value: basePriceData.createdAt
//                     ? moment(basePriceData.createdAt).format("DD MMM YYYY, HH:mm")
//                     : "—",
//                 },
//                 {
//                   label: "Last updated",
//                   value: basePriceData.updatedAt
//                     ? moment(basePriceData.updatedAt).format("DD MMM YYYY, HH:mm")
//                     : "—",
//                 },
//               ].map(({ label, value }) => (
//                 <Box
//                   key={label}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     py: 0.9,
//                     borderBottom: `0.5px solid ${alpha(theme.palette.divider, 0.5)}`,
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
//                     {label}
//                   </Typography>
//                   <Typography variant="caption" sx={{ fontSize: "0.72rem", fontWeight: 500 }}>
//                     {value}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>

//             {/* Edit section */}
//             <Box>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", display: "block", mb: 1 }}>
//                 Update base price per user per month (₹)
//               </Typography>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <TextField
//                   size="small"
//                   type="number"
//                   value={newBasePrice}
//                   onChange={(e) => setNewBasePrice(e.target.value)}
//                   placeholder="Enter new price"
//                   fullWidth
//                   InputProps={{ inputProps: { min: 1 } }}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 1.5,
//                       fontSize: "0.85rem",
//                     },
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={handleSave}
//                   disabled={saving}
//                   sx={{
//                     borderRadius: 1.5,
//                     px: 2.5,
//                     fontSize: "0.75rem",
//                     whiteSpace: "nowrap",
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     "&:hover": {
//                       background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                     },
//                     "&.Mui-disabled": { background: alpha(theme.palette.primary.main, 0.3) },
//                   }}
//                 >
//                   {saving ? <CircularProgress size={16} sx={{ color: "white" }} /> : "Update"}
//                 </Button>
//               </Box>
//             </Box>
//           </>
//         ) : null}
//       </DialogContent>

//       <DialogActions sx={{ px: 3, pb: 2.5, pt: 0 }}>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           sx={{
//             borderRadius: 1.5,
//             fontSize: "0.75rem",
//             borderColor: alpha(theme.palette.primary.main, 0.3),
//             color: theme.palette.primary.main,
//             "&:hover": { borderColor: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.05) },
//           }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BasePriceDialog;


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  alpha,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import { useTheme } from "@mui/material/styles";

const BasePriceDialog = ({ open, onClose, basePriceData, onSave, loading }) => {
  const theme = useTheme();
  const [newBasePrice, setNewBasePrice] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && basePriceData) {
      const currentPrice = basePriceData.currentPrice;
      if (currentPrice && currentPrice > 0) {
        setNewBasePrice(currentPrice.toString());
      } else {
        setNewBasePrice("");
      }
    } else if (open && !basePriceData) {
      setNewBasePrice("");
    }
  }, [open, basePriceData]);

  const handleSave = async () => {
    const price = parseFloat(newBasePrice);
    if (!price || price <= 0) {
      return;
    }
    setSaving(true);
    await onSave(price);
    setSaving(false);
  };

  // Helper function to check if price value exists and is valid
  const hasValidPrice = (price) => {
    return price !== null && price !== undefined && price !== 0 && price !== "";
  };

  // Check if price data is available
  const hasPriceData = basePriceData && hasValidPrice(basePriceData.currentPrice);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: "white",
          py: 2,
          px: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem", color: "white" }}>
          {hasPriceData ? "Update Base Price" : "Set Base Price"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
          </Box>
        ) : (
          <>
            {/* Show current price info only if price exists */}
            {hasPriceData && (
              <Box
              className="mt-4"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.07),
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                }}
              >
                <Typography  variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem", display: "block", mb: 0.5 }}>
                  Current Price (per user/month)
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: theme.palette.primary.main, fontSize: "1.8rem" }}>
                  ₹{basePriceData.currentPrice}
                </Typography>
                
                {basePriceData.previousPrice && hasValidPrice(basePriceData.previousPrice) && (
                  <Box sx={{ mt: 1, pt: 1, borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}` }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem", display: "block" }}>
                      Previous Price: <span style={{ textDecoration: "line-through" }}>₹{basePriceData.previousPrice}</span>
                    </Typography>
                  </Box>
                )}

                {basePriceData.updatedAt && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem", display: "block", mt: 1 }}>
                    Last updated: {moment(basePriceData.updatedAt).format("DD MMM YYYY, HH:mm")}
                  </Typography>
                )}
              </Box>
            )}

            {/* Message when no price exists */}
            {!hasPriceData && (
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.info.main, 0.08),
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" sx={{ fontSize: "0.8rem", color: theme.palette.info.main }}>
                  No price set yet. Please set the base price below.
                </Typography>
              </Box>
            )}

            {/* Input section */}
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem", display: "block", mb: 1.5, fontWeight: 500 }}>
                {hasPriceData ? "Enter new price (₹ per user/month)" : "Enter base price (₹ per user/month)"}
              </Typography>
              
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <TextField
                  size="small"
                  type="number"
                  value={newBasePrice}
                  onChange={(e) => setNewBasePrice(e.target.value)}
                  placeholder="Enter price amount"
                  fullWidth
                  autoFocus={!hasPriceData}
                  InputProps={{
                    inputProps: { min: 1, step: 1 },
                    startAdornment: (
                      <Typography sx={{ mr: 0.5, color: theme.palette.text.secondary }}>₹</Typography>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1.5,
                      fontSize: "0.9rem",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={saving || !newBasePrice || parseFloat(newBasePrice) <= 0}
                  sx={{
                    borderRadius: 1.5,
                    px: 3,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    minWidth: "100px",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    },
                    "&.Mui-disabled": { background: alpha(theme.palette.primary.main, 0.3) },
                  }}
                >
                  {saving ? <CircularProgress size={20} sx={{ color: "white" }} /> : (hasPriceData ? "Update" : "Save")}
                </Button>
              </Box>
              
              <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "text.secondary", display: "block", mt: 1.5 }}>
                * Price is per user per month
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 1.5,
            fontSize: "0.75rem",
            px: 2,
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            "&:hover": { 
              borderColor: theme.palette.primary.main, 
              bgcolor: alpha(theme.palette.primary.main, 0.05) 
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BasePriceDialog;