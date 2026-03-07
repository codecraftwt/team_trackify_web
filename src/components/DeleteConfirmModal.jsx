////////////////////////////// Change Color Theam/////////////////////////////////////

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
//   CircularProgress,
//   alpha,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { Delete as DeleteIcon, Warning as WarningIcon } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const DeleteConfirmModal = ({
//   show,
//   onHide,
//   onConfirm,
//   title = "Delete",
//   message,
//   subMessage,
//   confirmDisabled = false,
//   cancelDisabled = false,
//   loading = false,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onHide}
//           maxWidth="sm"
//           fullWidth
//           fullScreen={isSmallMobile ? false : false}
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50, scale: 0.9 },
//             animate: { opacity: 1, y: 0, scale: 1 },
//             exit: { opacity: 0, y: 50, scale: 0.9 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//               overflow: "hidden",
//               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//               bgcolor: "white",
//               m: isSmallMobile ? 1 : isMobile ? 2 : 0,
//               width: isSmallMobile ? '95%' : isMobile ? '90%' : '100%',
//             },
//           }}
//         >
//           {/* Header with gradient - Red for delete */}
//           <DialogTitle
//             sx={{
//               background: "linear-gradient(135deg, #DC2626, #B91C1C)",
//               color: "white",
//               py: isSmallMobile ? 1.5 : isMobile ? 2 : 2.5,
//               px: isSmallMobile ? 2 : isMobile ? 2.5 : 3,
//               display: "flex",
//               alignItems: "center",
//               gap: isSmallMobile ? 1 : 1.5,
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: isSmallMobile ? 24 : isMobile ? 28 : 32,
//                 height: isSmallMobile ? 24 : isMobile ? 28 : 32,
//                 borderRadius: "50%",
//                 bgcolor: "rgba(255,255,255,0.2)",
//               }}
//             >
//               <DeleteIcon sx={{ fontSize: isSmallMobile ? 14 : isMobile ? 16 : 18 }} />
//             </Box>
//             <Typography
//               variant={isSmallMobile ? "body1" : isMobile ? "h6" : "h6"}
//               fontWeight={600}
//               sx={{ fontSize: isSmallMobile ? '0.95rem' : isMobile ? '1.1rem' : '1.25rem' }}
//             >
//                {title}
//             </Typography>
//           </DialogTitle>

//           {/* Body - White background with light opacity */}
//           <DialogContent sx={{
//             p: isSmallMobile ? 2 : isMobile ? 3 : 4,
//             textAlign: "center",
//             bgcolor: "white",
//           }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 mb: isSmallMobile ? 1.5 : isMobile ? 2 : 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   width: isSmallMobile ? 60 : isMobile ? 70 : 80,
//                   height: isSmallMobile ? 60 : isMobile ? 70 : 80,
//                   borderRadius: "50%",
//                   background: "linear-gradient(135deg, #DC2626, #B91C1C)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   boxShadow: "0 10px 20px -5px rgba(220,38,38,0.3)",
//                    mt:1
//                 }}
//               >
//                 <DeleteIcon sx={{
//                   fontSize: isSmallMobile ? 28 : isMobile ? 32 : 36,
//                   color: "white"
//                 }} />
//               </Box>
//             </Box>

//             <Typography
//               variant={isSmallMobile ? "body1" : isMobile ? "h6" : "h6"}
//               fontWeight={600}
//               sx={{
//                 color: "#1f2937",
//                 mb: 1,
//                 fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.1rem',
//                 px: isSmallMobile ? 0 : 1,
//               }}
//             >
//               {message || `Are you sure you want to ${title.toLowerCase()} this item?`}
//             </Typography>

//             {subMessage && (
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{
//                   mb: 0,
//                   fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem',
//                   px: isSmallMobile ? 0 : 1,
//                 }}
//               >
//                 {subMessage}
//               </Typography>
//             )}

//             {/* Warning message with light opacity */}
//             <Box
//               sx={{
//                 mt: isSmallMobile ? 2 : isMobile ? 2.5 : 3,
//                 p: isSmallMobile ? 1.5 : isMobile ? 1.5 : 2,
//                 bgcolor: alpha("#ef4444", 0.08), // Lighter opacity
//                 borderRadius: 2,
//                 border: "1px solid",
//                 borderColor: alpha("#ef4444", 0.15),
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 1,
//                 flexWrap: "wrap",
//               }}
//             >
//               <WarningIcon sx={{
//                 color: alpha("#ef4444", 0.8),
//                 fontSize: isSmallMobile ? 16 : isMobile ? 18 : 20
//               }} />
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: alpha("#ef4444", 0.9),
//                   fontWeight: 500,
//                   fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                 }}
//               >
//                 This action cannot be undone
//               </Typography>
//             </Box>
//           </DialogContent>

//           {/* Footer - White background with responsive buttons */}
//           <DialogActions
//             sx={{
//               p: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//               pt: isSmallMobile ? 1 : isMobile ? 1.5 : 2,
//               display: "flex",
//               flexDirection: isSmallMobile ? "column" : "row",
//               justifyContent: "center",
//               gap: isSmallMobile ? 1 : 2,
//               borderTop: "1px solid",
//               borderColor: alpha("#2563EB", 0.1),
//               bgcolor: "white",
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onHide}
//               disabled={cancelDisabled || loading}
//               fullWidth={isSmallMobile}
//               sx={{
//                 minWidth: isSmallMobile ? '100%' : (isMobile ? 100 : 120),
//                 py: isSmallMobile ? 1 : isMobile ? 1 : 1,
//                 px: isSmallMobile ? 2 : isMobile ? 2 : 3,
//                 borderRadius: 2,
//                 borderColor: alpha("#2563EB", 0.3),
//                 color: "#2563EB",
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem',
//                 "&:hover": {
//                   borderColor: "#2563EB",
//                   bgcolor: alpha("#2563EB", 0.05),
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={onConfirm}
//               disabled={confirmDisabled || loading}
//               fullWidth={isSmallMobile}
//               sx={{
//                 minWidth: isSmallMobile ? '100%' : (isMobile ? 100 : 120),
//                 py: isSmallMobile ? 1 : isMobile ? 1 : 1,
//                 px: isSmallMobile ? 2 : isMobile ? 2 : 3,
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #DC2626, #B91C1C)",
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem',
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #B91C1C, #991B1B)",
//                 },
//                 "&.Mui-disabled": {
//                   background: alpha("#DC2626", 0.5),
//                 },
//               }}
//             >
//               {loading ? (
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
//                   <CircularProgress size={isSmallMobile ? 16 : isMobile ? 18 : 20} sx={{ color: "white" }} />
//                   <span style={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                     {isSmallMobile ? 'Del...' : 'Deleting...'}
//                   </span>
//                 </Box>
//               ) : (
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
//                   <DeleteIcon sx={{ fontSize: isSmallMobile ? 14 : isMobile ? 16 : 18 }} />
//                   <span style={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                     {isSmallMobile ? 'Del' : 'Delete'}
//                   </span>
//                 </Box>
//               )}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DeleteConfirmModal;



//////////////////////////////    Centralised Color     ///////////////////////////////

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
//   CircularProgress,
//   alpha,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { Delete as DeleteIcon, Warning as WarningIcon } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const DeleteConfirmModal = ({
//   show,
//   onHide,
//   onConfirm,
//   title = "Delete",
//   message,
//   subMessage,
//   confirmDisabled = false,
//   cancelDisabled = false,
//   loading = false,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onHide}
//           maxWidth="sm"
//           fullWidth
//           fullScreen={isSmallMobile ? false : false}
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50, scale: 0.9 },
//             animate: { opacity: 1, y: 0, scale: 1 },
//             exit: { opacity: 0, y: 50, scale: 0.9 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: isSmallMobile ? 2 : isMobile ? 3 : 4,
//               overflow: "hidden",
//               boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
//               bgcolor: "background.paper",
//               m: isSmallMobile ? 1 : isMobile ? 2 : 0,
//               width: isSmallMobile ? '95%' : isMobile ? '90%' : '100%',
//             },
//           }}
//         >
//           {/* Header with gradient - Red for delete */}
//           <DialogTitle
//             sx={{
//               background: "linear-gradient(135deg, #DC2626, #B91C1C)", // Keeping red for delete (semantic color)
//               color: "white",
//               py: isSmallMobile ? 1.5 : isMobile ? 2 : 2.5,
//               px: isSmallMobile ? 2 : isMobile ? 2.5 : 3,
//               display: "flex",
//               alignItems: "center",
//               gap: isSmallMobile ? 1 : 1.5,
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: isSmallMobile ? 24 : isMobile ? 28 : 32,
//                 height: isSmallMobile ? 24 : isMobile ? 28 : 32,
//                 borderRadius: "50%",
//                 bgcolor: "rgba(255,255,255,0.2)",
//               }}
//             >
//               <DeleteIcon sx={{ fontSize: isSmallMobile ? 14 : isMobile ? 16 : 18 }} />
//             </Box>
//             <Typography
//               variant={isSmallMobile ? "body1" : isMobile ? "h6" : "h6"}
//               fontWeight={600}
//               sx={{ fontSize: isSmallMobile ? '0.95rem' : isMobile ? '1.1rem' : '1.25rem' }}
//             >
//                {title}
//             </Typography>
//           </DialogTitle>

//           {/* Body - White background with light opacity */}
//           <DialogContent sx={{
//             p: isSmallMobile ? 2 : isMobile ? 3 : 4,
//             textAlign: "center",
//             bgcolor: "background.paper",
//           }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 mb: isSmallMobile ? 1.5 : isMobile ? 2 : 2,
//               }}
//             >
//               <Box
//                 sx={{
//                   width: isSmallMobile ? 60 : isMobile ? 70 : 80,
//                   height: isSmallMobile ? 60 : isMobile ? 70 : 80,
//                   borderRadius: "50%",
//                   background: "linear-gradient(135deg, #DC2626, #B91C1C)", // Keeping red gradient
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   boxShadow: "0 10px 20px -5px rgba(220,38,38,0.3)",
//                    mt:1
//                 }}
//               >
//                 <DeleteIcon sx={{
//                   fontSize: isSmallMobile ? 28 : isMobile ? 32 : 36,
//                   color: "white"
//                 }} />
//               </Box>
//             </Box>

//             <Typography
//               variant={isSmallMobile ? "body1" : isMobile ? "h6" : "h6"}
//               fontWeight={600}
//               sx={{
//                 color: "text.primary",
//                 mb: 1,
//                 fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.1rem',
//                 px: isSmallMobile ? 0 : 1,
//               }}
//             >
//               {message || `Are you sure you want to ${title.toLowerCase()} this item?`}
//             </Typography>

//             {subMessage && (
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{
//                   mb: 0,
//                   fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem',
//                   px: isSmallMobile ? 0 : 1,
//                 }}
//               >
//                 {subMessage}
//               </Typography>
//             )}

//             {/* Warning message with light opacity */}
//             <Box
//               sx={{
//                 mt: isSmallMobile ? 2 : isMobile ? 2.5 : 3,
//                 p: isSmallMobile ? 1.5 : isMobile ? 1.5 : 2,
//                 bgcolor: alpha("#ef4444", 0.08), // Keeping warning color
//                 borderRadius: 2,
//                 border: "1px solid",
//                 borderColor: alpha("#ef4444", 0.15),
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 1,
//                 flexWrap: "wrap",
//               }}
//             >
//               <WarningIcon sx={{
//                 color: alpha("#ef4444", 0.8),
//                 fontSize: isSmallMobile ? 16 : isMobile ? 18 : 20
//               }} />
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: alpha("#ef4444", 0.9),
//                   fontWeight: 500,
//                   fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
//                 }}
//               >
//                 This action cannot be undone
//               </Typography>
//             </Box>
//           </DialogContent>

//           {/* Footer - White background with responsive buttons */}
//           <DialogActions
//             sx={{
//               p: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
//               pt: isSmallMobile ? 1 : isMobile ? 1.5 : 2,
//               display: "flex",
//               flexDirection: isSmallMobile ? "column" : "row",
//               justifyContent: "center",
//               gap: isSmallMobile ? 1 : 2,
//               borderTop: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               bgcolor: "background.paper",
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onHide}
//               disabled={cancelDisabled || loading}
//               fullWidth={isSmallMobile}
//               sx={{
//                 minWidth: isSmallMobile ? '100%' : (isMobile ? 100 : 120),
//                 py: isSmallMobile ? 1 : isMobile ? 1 : 1,
//                 px: isSmallMobile ? 2 : isMobile ? 2 : 3,
//                 borderRadius: 2,
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//                 color: theme.palette.primary.main,
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem',
//                 "&:hover": {
//                   borderColor: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={onConfirm}
//               disabled={confirmDisabled || loading}
//               fullWidth={isSmallMobile}
//               sx={{
//                 minWidth: isSmallMobile ? '100%' : (isMobile ? 100 : 120),
//                 py: isSmallMobile ? 1 : isMobile ? 1 : 1,
//                 px: isSmallMobile ? 2 : isMobile ? 2 : 3,
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #DC2626, #B91C1C)", // Keeping red gradient
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: isSmallMobile ? '0.75rem' : isMobile ? '0.8rem' : '0.85rem',
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #B91C1C, #991B1B)",
//                 },
//                 "&.Mui-disabled": {
//                   background: alpha("#DC2626", 0.5),
//                 },
//               }}
//             >
//               {loading ? (
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
//                   <CircularProgress size={isSmallMobile ? 16 : isMobile ? 18 : 20} sx={{ color: "white" }} />
//                   <span style={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                     {isSmallMobile ? 'Del...' : 'Deleting...'}
//                   </span>
//                 </Box>
//               ) : (
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}>
//                   <DeleteIcon sx={{ fontSize: isSmallMobile ? 14 : isMobile ? 16 : 18 }} />
//                   <span style={{ fontSize: isSmallMobile ? '0.7rem' : isMobile ? '0.75rem' : '0.8rem' }}>
//                     {isSmallMobile ? 'Del' : 'Delete'}
//                   </span>
//                 </Box>
//               )}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default DeleteConfirmModal;








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
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={onHide}
          maxWidth="xs"
          fullWidth
          fullScreen={isSmallMobile ? false : false}
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 50, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 50, scale: 0.9 },
            transition: { duration: 0.3 },
            sx: {
              borderRadius: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              bgcolor: "background.paper",
              m: isSmallMobile ? 1 : isMobile ? 1.5 : 0,
              width: isSmallMobile ? '95%' : isMobile ? '90%' : '100%',
            },
          }}
        >
          {/* Header with gradient - Red for delete */}
          <DialogTitle
            sx={{
              background: "linear-gradient(135deg, #DC2626, #B91C1C)",
              color: "white",
              py: isSmallMobile ? 1.2 : isMobile ? 1.5 : 2,
              px: isSmallMobile ? 1.5 : isMobile ? 2 : 2.5,
              display: "flex",
              alignItems: "center",
              gap: isSmallMobile ? 0.8 : 1.2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: isSmallMobile ? 22 : isMobile ? 24 : 28,
                height: isSmallMobile ? 22 : isMobile ? 24 : 28,
                borderRadius: "50%",
                bgcolor: "rgba(255,255,255,0.2)",
              }}
            >
              <DeleteIcon sx={{ fontSize: isSmallMobile ? 12 : isMobile ? 14 : 16 }} />
            </Box>
            <Typography
              variant={isSmallMobile ? "body2" : isMobile ? "subtitle1" : "subtitle1"}
              fontWeight={600}
              sx={{ fontSize: isSmallMobile ? '0.85rem' : isMobile ? '0.95rem' : '1.1rem' }}
            >
               {title}
            </Typography>
          </DialogTitle>

          {/* Body - White background with light opacity */}
          <DialogContent sx={{
            p: isSmallMobile ? 1.5 : isMobile ? 2 : 3,
            textAlign: "center",
            bgcolor: "background.paper",
          }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: isSmallMobile ? 1.2 : isMobile ? 1.5 : 1.8,
              }}
            >
              <Box
                sx={{
                  width: isSmallMobile ? 50 : isMobile ? 55 : 65,
                  height: isSmallMobile ? 50 : isMobile ? 55 : 65,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 16px -4px rgba(220,38,38,0.3)",
                  mt: 0.5
                }}
              >
                <DeleteIcon sx={{
                  fontSize: isSmallMobile ? 24 : isMobile ? 26 : 30,
                  color: "white"
                }} />
              </Box>
            </Box>

            <Typography
              variant={isSmallMobile ? "body2" : isMobile ? "body1" : "body1"}
              fontWeight={600}
              sx={{
                color: "text.primary",
                mb: 0.5,
                fontSize: isSmallMobile ? '0.8rem' : isMobile ? '0.9rem' : '1rem',
                px: isSmallMobile ? 0 : 1,
              }}
            >
              {message || `Are you sure you want to ${title.toLowerCase()} this item?`}
            </Typography>

            {subMessage && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  mb: 0,
                  fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem',
                  px: isSmallMobile ? 0 : 1,
                }}
              >
                {subMessage}
              </Typography>
            )}

            {/* Warning message with light opacity */}
            <Box
              sx={{
                mt: isSmallMobile ? 1.5 : isMobile ? 2 : 2.5,
                p: isSmallMobile ? 1.2 : isMobile ? 1.2 : 1.5,
                bgcolor: alpha("#ef4444", 0.08),
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: alpha("#ef4444", 0.15),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.8,
                flexWrap: "wrap",
              }}
            >
              <WarningIcon sx={{
                color: alpha("#ef4444", 0.8),
                fontSize: isSmallMobile ? 14 : isMobile ? 16 : 18
              }} />
              <Typography
                variant="caption"
                sx={{
                  color: alpha("#ef4444", 0.9),
                  fontWeight: 500,
                  fontSize: isSmallMobile ? '0.55rem' : isMobile ? '0.6rem' : '0.65rem',
                }}
              >
                This action cannot be undone
              </Typography>
            </Box>
          </DialogContent>

          {/* Footer - White background with responsive buttons */}
          <DialogActions
            sx={{
              p: isSmallMobile ? 1.2 : isMobile ? 1.5 : 2.5,
              pt: isSmallMobile ? 0.8 : isMobile ? 1 : 1.5,
              display: "flex",
              flexDirection: isSmallMobile ? "column" : "row",
              justifyContent: "center",
              gap: isSmallMobile ? 0.8 : 1.5,
              borderTop: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              bgcolor: "background.paper",
            }}
          >
            <Button
              variant="outlined"
              onClick={onHide}
              disabled={cancelDisabled || loading}
              fullWidth={isSmallMobile}
              size="small"
              sx={{
                minWidth: isSmallMobile ? '100%' : (isMobile ? 90 : 100),
                py: isSmallMobile ? 0.6 : isMobile ? 0.7 : 0.8,
                px: isSmallMobile ? 1.5 : isMobile ? 1.5 : 2,
                borderRadius: 1.5,
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem',
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={onConfirm}
              disabled={confirmDisabled || loading}
              fullWidth={isSmallMobile}
              size="small"
              sx={{
                minWidth: isSmallMobile ? '100%' : (isMobile ? 90 : 100),
                py: isSmallMobile ? 0.6 : isMobile ? 0.7 : 0.8,
                px: isSmallMobile ? 1.5 : isMobile ? 1.5 : 2,
                borderRadius: 1.5,
                background: "linear-gradient(135deg, #DC2626, #B91C1C)",
                color: "white",
                fontWeight: 600,
                fontSize: isSmallMobile ? '0.65rem' : isMobile ? '0.7rem' : '0.75rem',
                "&:hover": {
                  background: "linear-gradient(135deg, #B91C1C, #991B1B)",
                },
                "&.Mui-disabled": {
                  background: alpha("#DC2626", 0.5),
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center" }}>
                  <CircularProgress size={isSmallMobile ? 14 : isMobile ? 16 : 18} sx={{ color: "white" }} />
                  <span style={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
                    {isSmallMobile ? 'Del...' : 'Deleting...'}
                  </span>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "center" }}>
                  <DeleteIcon sx={{ fontSize: isSmallMobile ? 12 : isMobile ? 14 : 16 }} />
                  <span style={{ fontSize: isSmallMobile ? '0.6rem' : isMobile ? '0.65rem' : '0.7rem' }}>
                    {isSmallMobile ? 'Del' : 'Delete'}
                  </span>
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