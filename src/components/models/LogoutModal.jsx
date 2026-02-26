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
  Avatar,
  alpha,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const LogoutModal = ({ show, onHide, onConfirm, title = "Confirm Logout", message, subMessage }) => {
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
              bgcolor: "white",
            },
          }}
        >
          {/* Header with gradient */}
          <DialogTitle
            sx={{
              background: "linear-gradient(135deg, #0f766e, #0a5c55)",
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
                backdropFilter: "blur(10px)",
              }}
            >
              <LogoutIcon sx={{ fontSize: 18 }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          </DialogTitle>

          {/* Body */}
          <DialogContent sx={{ p: 4, textAlign: "center", bgcolor: "white" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: alpha("#ef4444", 0.1),
                    color: "#ef4444",
                    border: "3px solid",
                    borderColor: alpha("#ef4444", 0.3),
                  }}
                >
                  <LogoutIcon sx={{ fontSize: 40 }} />
                </Avatar>
              </Box>
            </motion.div>

            <Typography variant="h5" fontWeight={600} sx={{ color: "#1e293b", mb: 1 }}>
              Ready to Sign Out?
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 0, lineHeight: 1.6 }}>
              {message || "You will be logged out of your account and redirected to the login page."}
            </Typography>

            {subMessage && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                {subMessage}
              </Typography>
            )}
          </DialogContent>

          {/* Footer */}
          <DialogActions
            sx={{
              p: 3,
              pt: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              borderTop: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              bgcolor: "white",
            }}
          >
            <Button
              variant="outlined"
              onClick={onHide}
              sx={{
                minWidth: 120,
                py: 1,
                borderRadius: 2,
                borderColor: "#e2e8f0",
                color: "#64748b",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
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
              sx={{
                minWidth: 140,
                py: 1,
                borderRadius: 2,
                background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                color: "white",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "linear-gradient(135deg, #B91C1C, #991B1B)",
                  boxShadow: "0 6px 20px rgba(220,38,38,0.4)",
                },
              }}
            >
              Log Out
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;