import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography, 
  CircularProgress,
  alpha,
} from "@mui/material";
import { Delete as DeleteIcon, Warning as WarningIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const DeleteConfirmModal = ({
  show,
  onHide,
  onConfirm,
  title = "Delete",
  message,
  subMessage,
  confirmDisabled = false,
  cancelDisabled = false,
  loading = false,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={onHide}
          maxWidth="sm"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 50, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 50, scale: 0.9 },
            transition: { duration: 0.3 },
            sx: {
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              bgcolor: "white", // White background
            },
          }}
        >
          {/* Header with gradient */}
          <DialogTitle
            sx={{
              background: "linear-gradient(135deg, #DC2626, #B91C1C)",
              color: "white",
              py: 2.5,
              px: 3,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.2)",
              }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Confirm {title}
            </Typography>
          </DialogTitle>

          {/* Body - White background */}
          <DialogContent sx={{ p: 4, textAlign: "center", bgcolor: "white" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 20px -5px rgba(220,38,38,0.3)",
                }}
              >
                <DeleteIcon sx={{ fontSize: 36, color: "white" }} />
              </Box>
            </Box>

            <Typography variant="h6" fontWeight={600} sx={{ color: "#1f2937", mb: 1 }}>
              {message || `Are you sure you want to ${title.toLowerCase()} this item?`}
            </Typography>

            {subMessage && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                {subMessage}
              </Typography>
            )}

            {/* Warning message */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: alpha("#ef4444", 0.1),
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#ef4444", 0.2),
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WarningIcon sx={{ color: "#ef4444", fontSize: 20 }} />
              <Typography variant="caption" sx={{ color: "#ef4444", fontWeight: 500 }}>
                This action cannot be undone
              </Typography>
            </Box>
          </DialogContent>

          {/* Footer - White background */}
          <DialogActions
            sx={{
              p: 3,
              pt: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              borderTop: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              bgcolor: "white", // White background
            }}
          >
            <Button
              variant="outlined"
              onClick={onHide}
              disabled={cancelDisabled || loading}
              sx={{
                minWidth: 120,
                py: 1,
                borderRadius: 2,
                borderColor: "#e2e8f0",
                color: "#64748b",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#cbd5e1",
                  bgcolor: "#f8fafc",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={onConfirm}
              disabled={confirmDisabled || loading}
              sx={{
                minWidth: 120,
                py: 1,
                borderRadius: 2,
                background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(135deg, #B91C1C, #991B1B)",
                },
                "&.Mui-disabled": {
                  background: alpha("#DC2626", 0.5),
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: "white" }} />
                  <span>Deleting...</span>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DeleteIcon sx={{ fontSize: 18 }} />
                  <span>Delete</span>
                </Box>
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;