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







// import React, { useState } from "react";
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
//   CircularProgress,
// } from "@mui/material";
// import { Logout as LogoutIcon } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const LogoutModal = ({ show, onHide, onConfirm, title = "Confirm Logout", message, subMessage }) => {
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     setIsLoggingOut(true);

//     try {
//       // Clear ALL storage first
//       localStorage.clear();      // Clears all localStorage items
//       sessionStorage.clear();    // Clears all sessionStorage items

//       // Clear cookies if any (optional)
//       document.cookie.split(";").forEach((c) => {
//         document.cookie = c
//           .replace(/^ +/, "")
//           .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//       });

//       // Call the parent's onConfirm function (which should dispatch logout action)
//       if (onConfirm) {
//         await onConfirm();
//       }

//       // Force a small delay to ensure cleanup completes
//       await new Promise(resolve => setTimeout(resolve, 100));

//       // Navigate to login with replace to prevent back button issues
//       navigate('/login', { replace: true });

//       // Reload the page to ensure complete cleanup (optional but thorough)
//       window.location.reload();

//     } catch (error) {
//       console.error("Logout error:", error);
//       // Even if there's an error, try to navigate to login
//       navigate('/login', { replace: true });
//     } finally {
//       setIsLoggingOut(false);
//       onHide();
//     }
//   };
//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={!isLoggingOut ? onHide : undefined}
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
//                   <LogoutIcon sx={{ fontSize: 40, }} />
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
//               disabled={isLoggingOut}
//               sx={{
//                 minWidth: 120,
//                 py: 1,
//                 borderRadius: 2,
//                 borderColor: "#e2e8f0",
//                 color: "#64748b",
//                 fontWeight: 600,
//                 transition: "all 0.3s ease",
//                 "&:hover": !isLoggingOut ? {
//                   transform: "scale(1.05)",
//                   borderColor: "#cbd5e1",
//                   bgcolor: "#f8fafc",
//                 } : {},
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleLogout}
//               disabled={isLoggingOut}
//               sx={{
//                 minWidth: 140,
//                 py: 1,
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #DC2626, #B91C1C)",
//                 color: "white",
//                 fontWeight: 600,
//                 boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
//                 transition: "all 0.3s ease",
//                 "&:hover": !isLoggingOut ? {
//                   transform: "scale(1.05)",
//                   background: "linear-gradient(135deg, #B91C1C, #991B1B)",
//                   boxShadow: "0 6px 20px rgba(220,38,38,0.4)",
//                 } : {},
//               }}
//             >
//               {isLoggingOut ? (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CircularProgress size={20} sx={{ color: 'white' }} />
//                   <span>Logging out...</span>
//                 </Box>
//               ) : (
//                 'Log Out'
//               )}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LogoutModal;
























////////////////////////////// Change Color Theam/////////////////////////////////////
// import React, { useState } from "react";
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
//   CircularProgress,
// } from "@mui/material";
// import { Logout as LogoutIcon } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const LogoutModal = ({ show, onHide, onConfirm, title = "Confirm Logout", message, subMessage }) => {
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     setIsLoggingOut(true);

//     try {
//       // Clear ALL storage first
//       localStorage.clear();      // Clears all localStorage items
//       sessionStorage.clear();    // Clears all sessionStorage items

//       // Clear cookies if any (optional)
//       document.cookie.split(";").forEach((c) => {
//         document.cookie = c
//           .replace(/^ +/, "")
//           .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//       });

//       // Call the parent's onConfirm function (which should dispatch logout action)
//       if (onConfirm) {
//         await onConfirm();
//       }

//       // Force a small delay to ensure cleanup completes
//       await new Promise(resolve => setTimeout(resolve, 100));

//       // Navigate to login with replace to prevent back button issues
//       navigate('/login', { replace: true });

//       // Reload the page to ensure complete cleanup (optional but thorough)
//       window.location.reload();

//     } catch (error) {
//       console.error("Logout error:", error);
//       // Even if there's an error, try to navigate to login
//       navigate('/login', { replace: true });
//     } finally {
//       setIsLoggingOut(false);
//       onHide();
//     }
//   };
  
//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={!isLoggingOut ? onHide : undefined}
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
//           {/* Header with gradient - Blue */}
//           <DialogTitle
//             sx={{
//               background: "linear-gradient(135deg, #2563EB, #1E40AF)",
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
//                     bgcolor: alpha("#2563EB", 0.1),
//                     color: "#2563EB",
//                     border: "3px solid",
//                     borderColor: alpha("#2563EB", 0.3),
                    
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
//               borderColor: alpha("#2563EB", 0.1),
//               bgcolor: "white",
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onHide}
//               disabled={isLoggingOut}
//               sx={{
//                 minWidth: 120,
//                 py: 1,
//                 borderRadius: 2,
//                 borderColor: alpha("#2563EB", 0.3),
//                 color: "#2563EB",
//                 fontWeight: 600,
//                 transition: "all 0.3s ease",
//                 "&:hover": !isLoggingOut ? {
//                   transform: "scale(1.05)",
//                   borderColor: "#2563EB",
//                   bgcolor: alpha("#2563EB", 0.05),
//                 } : {},
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleLogout}
//               disabled={isLoggingOut}
//               sx={{
//                 minWidth: 140,
//                 py: 1,
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #DC2626, #B91C1C)",
//                 color: "white",
//                 fontWeight: 600,
//                 boxShadow: "0 4px 15px rgba(220,38,38,0.3)",
//                 transition: "all 0.3s ease",
//                 "&:hover": !isLoggingOut ? {
//                   transform: "scale(1.05)",
//                   background: "linear-gradient(135deg, #B91C1C, #991B1B)",
//                   boxShadow: "0 6px 20px rgba(220,38,38,0.4)",
//                 } : {},
//               }}
//             >
//               {isLoggingOut ? (
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <CircularProgress size={20} sx={{ color: 'white' }} />
//                   <span>Logging out...</span>
//                 </Box>
//               ) : (
//                 'Log Out'
//               )}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LogoutModal;












//////////////////////////////    Centralised Color     ///////////////////////////////

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