// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Box,
//   Typography,
//   Avatar,
//   alpha,
// } from "@mui/material";
// import { Logout as LogoutIcon } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const LogoutModal = ({ show, onHide, onConfirm, title = "Confirm Logout", message, subMessage }) => {
//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onHide}
//           maxWidth="sm"
//           fullWidth
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50, scale: 0.9 },
//             animate: { opacity: 1, y: 0, scale: 1 },
//             exit: { opacity: 0, y: 50, scale: 0.9 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: 4,
//               overflow: "hidden",
//               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//               bgcolor: "white",
//             },
//           }}
//         >
//           {/* Header with gradient */}
//           <DialogTitle
//             sx={{
//               background: "linear-gradient(135deg, #0f766e, #0a5c55)",
//               color: "white",
//               py: 2.5,
//               px: 3,
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: 32,
//                 height: 32,
//                 borderRadius: "50%",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 backdropFilter: "blur(10px)",
//               }}
//             >
//               <LogoutIcon sx={{ fontSize: 18 }} />
//             </Box>
//             <Typography variant="h6" fontWeight={600}>
//               {title}
//             </Typography>
//           </DialogTitle>

//           {/* Body */}
//           <DialogContent sx={{ p: 4, textAlign: "center", bgcolor: "white" }}>
//             <motion.div
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   mb: 2,
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     width: 80,
//                     height: 80,
//                     bgcolor: alpha("#ef4444", 0.1),
//                     color: "#ef4444",
//                     border: "3px solid",
//                     borderColor: alpha("#ef4444", 0.3),
//                   }}
//                 >
//                   <LogoutIcon sx={{ fontSize: 40 }} />
//                 </Avatar>
//               </Box>
//             </motion.div>

//             <Typography variant="h5" fontWeight={600} sx={{ color: "#1e293b", mb: 1 }}>
//               Ready to Sign Out?
//             </Typography>

//             <Typography variant="body2" color="text.secondary" sx={{ mb: 0, lineHeight: 1.6 }}>
//               {message || "You will be logged out of your account and redirected to the login page."}
//             </Typography>

//             {subMessage && (
//               <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
//                 {subMessage}
//               </Typography>
//             )}
//           </DialogContent>

//           {/* Footer */}
//           <DialogActions
//             sx={{
//               p: 3,
//               pt: 2,
//               display: "flex",
//               justifyContent: "center",
//               gap: 2,
//               borderTop: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               bgcolor: "white",
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onHide}
//               sx={{
//                 minWidth: 120,
//                 py: 1,
//                 borderRadius: 2,
//                 borderColor: "#e2e8f0",
//                 color: "#64748b",
//                 fontWeight: 600,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   borderColor: "#cbd5e1",
//                   bgcolor: "#f8fafc",
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={onConfirm}
//               sx={{
//                 minWidth: 140,
//                 py: 1,
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #DC2626, #B91C1C)",
//                 color: "white",
//                 fontWeight: 600,
//                 boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   background: "linear-gradient(135deg, #B91C1C, #991B1B)",
//                   boxShadow: "0 6px 20px rgba(220,38,38,0.4)",
//                 },
//               }}
//             >
//               Log Out
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LogoutModal;







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
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ show, onHide, onConfirm, title = "Confirm Logout", message, subMessage }) => {
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
  // const handleLogout = async () => {
  //   setIsLoggingOut(true);

  //   // Log before clearing
  //   console.log('Before clear - localStorage:', {
  //     token: localStorage.getItem('token'),
  //     user: localStorage.getItem('user'),
  //     role_id: localStorage.getItem('role_id')
  //   });

  //   try {
  //     // Clear ALL storage
  //     localStorage.clear();
  //     sessionStorage.clear();

  //     // Log after clearing
  //     console.log('After clear - localStorage:', {
  //       token: localStorage.getItem('token'),
  //       user: localStorage.getItem('user'),
  //       role_id: localStorage.getItem('role_id')
  //     });

  //     // Clear cookies
  //     document.cookie.split(";").forEach((c) => {
  //       document.cookie = c
  //         .replace(/^ +/, "")
  //         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  //     });

  //     if (onConfirm) {
  //       await onConfirm();
  //     }

  //     await new Promise(resolve => setTimeout(resolve, 100));

  //     navigate('/login', { replace: true });
  //     window.location.reload();

  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     navigate('/login', { replace: true });
  //     window.location.reload();
  //   } finally {
  //     setIsLoggingOut(false);
  //     onHide();
  //   }
  // };
  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={!isLoggingOut ? onHide : undefined}
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
              disabled={isLoggingOut}
              sx={{
                minWidth: 120,
                py: 1,
                borderRadius: 2,
                borderColor: "#e2e8f0",
                color: "#64748b",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": !isLoggingOut ? {
                  transform: "scale(1.05)",
                  borderColor: "#cbd5e1",
                  bgcolor: "#f8fafc",
                } : {},
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleLogout}
              disabled={isLoggingOut}
              sx={{
                minWidth: 140,
                py: 1,
                borderRadius: 2,
                background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                color: "white",
                fontWeight: 600,
                boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
                transition: "all 0.3s ease",
                "&:hover": !isLoggingOut ? {
                  transform: "scale(1.05)",
                  background: "linear-gradient(135deg, #B91C1C, #991B1B)",
                  boxShadow: "0 6px 20px rgba(220,38,38,0.4)",
                } : {},
              }}
            >
              {isLoggingOut ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: 'white' }} />
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

