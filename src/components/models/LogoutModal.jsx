import React, { useState } from "react";
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
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ show, onHide, onConfirm, title = "Confirm Logout", message, subMessage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Clear ALL storage first
      localStorage.clear();      // Clears all localStorage items
      sessionStorage.clear();    // Clears all sessionStorage items

      // Clear cookies if any (optional)
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Call the parent's onConfirm function (which should dispatch logout action)
      if (onConfirm) {
        await onConfirm();
      }

      // Force a small delay to ensure cleanup completes
      await new Promise(resolve => setTimeout(resolve, 100));

      // Navigate to login with replace to prevent back button issues
      navigate('/login', { replace: true });

      // Reload the page to ensure complete cleanup (optional but thorough)
      window.location.reload();

    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, try to navigate to login
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
      onHide();
    }
  };
  
  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={!isLoggingOut ? onHide : undefined}
          maxWidth="xs"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 20, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 20, scale: 0.95 },
            transition: { duration: 0.2 },
            sx: {
              borderRadius: { xs: 2, sm: 2.5 },
              overflow: "hidden",
              boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
              bgcolor: "background.paper",
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1),
              m: { xs: 1, sm: 2 },
            },
          }}
        >
          {/* Header with gradient */}
          <DialogTitle
          className="mb-4"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "white",
              py: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <LogoutIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
            </Box>
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"} 
              fontWeight={600} 
              color="white"
              sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
            >
              {title}
            </Typography>
          </DialogTitle>

          {/* Body */}
          <DialogContent sx={{ 
            p: { xs: 2, sm: 2.5, md: 3 }, 
            textAlign: "center", 
            bgcolor: "background.paper" 
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 1.5,
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 60, sm: 70 },
                    height: { xs: 60, sm: 70 },
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    border: "2px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  }}
                >
                  <LogoutIcon sx={{ fontSize: { xs: 30, sm: 35 } }} />
                </Avatar>
              </Box>
            </motion.div>

            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              fontWeight={600} 
              sx={{ 
                color: "text.primary", 
                mb: 0.5,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
              }}
            >
              Ready to Sign Out?
            </Typography>

            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 0, 
                lineHeight: 1.5,
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }
              }}
            >
              {message || "You will be logged out of your account and redirected to the login page."}
            </Typography>

            {subMessage && (
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ 
                  display: "block", 
                  mt: 1.5,
                  fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
                }}
              >
                {subMessage}
              </Typography>
            )}
          </DialogContent>

          {/* Footer */}
          <DialogActions
            sx={{
              p: { xs: 2, sm: 2.5 },
              pt: { xs: 1, sm: 1.5 },
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "center",
              gap: { xs: 1, sm: 1.5 },
              borderTop: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              bgcolor: "background.paper",
            }}
          >
            <Button
              fullWidth={isMobile}
              variant="outlined"
              onClick={onHide}
              disabled={isLoggingOut}
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: 100 },
                py: { xs: 0.8, sm: 1 },
                borderRadius: { xs: 2, sm: 2.5 },
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                height: { xs: 34, sm: 36 },
                transition: "all 0.3s ease",
                "&:hover": !isLoggingOut ? {
                  transform: "translateY(-2px)",
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                } : {},
              }}
            >
              Cancel
            </Button>

            <Button
              fullWidth={isMobile}
              variant="contained"
              onClick={handleLogout}
              disabled={isLoggingOut}
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: 120 },
                py: { xs: 0.8, sm: 1 },
                borderRadius: { xs: 2, sm: 2.5 },
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "white",
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                height: { xs: 34, sm: 36 },
                boxShadow: `0 4px 10px ${alpha('#ef4444', 0.3)}`,
                transition: "all 0.3s ease",
                "&:hover": !isLoggingOut ? {
                  transform: "translateY(-2px)",
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  boxShadow: `0 6px 15px ${alpha('#ef4444', 0.4)}`,
                } : {},
              }}
            >
              {isLoggingOut ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CircularProgress size={16} sx={{ color: 'white' }} />
                  <span>Logging out...</span>
                </Box>
              ) : (
                'Log Out'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;