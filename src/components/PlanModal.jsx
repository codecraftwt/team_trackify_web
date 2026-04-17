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
//   MenuItem,
//   Grid,
//   alpha,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   CircularProgress,
//   Alert,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import { Add as AddIcon, Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

// const PlanModal = ({
//   show,
//   onClose,
//   planData,
//   setPlanData,
//   planOptions = [],
//   durationOptions = [],
//   onSuccess,
// }) => {
//   const theme = useTheme();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isCustomPlan, setIsCustomPlan] = useState(false);
//   const [customPlanName, setCustomPlanName] = useState("");
//   const [localPlanData, setLocalPlanData] = useState({ ...planData });

//   const isEditMode = !!planData?._id;

//   // Sync localPlanData when planData changes from parent
//   useEffect(() => {
//     if (show) {
//       setLocalPlanData({ ...planData });
//       if (!isEditMode) {
//         setIsCustomPlan(false);
//         setCustomPlanName("");
//       }
//     }
//   }, [planData, show, isEditMode]);

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');
//   const isLandscape = useMediaQuery('(orientation: landscape)');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLocalPlanData({ ...localPlanData, [name]: value });
//     if (error) setError("");
    
//     // Only show custom plan input in create mode
//     if (!isEditMode && name === "name") {
//       setIsCustomPlan(value === "Custom Plan");
//       if (value !== "Custom Plan") {
//         setCustomPlanName("");
//       }
//     }
//   };

//   const handleCustomPlanNameChange = (e) => {
//     const value = e.target.value;
//     setCustomPlanName(value);
//     setLocalPlanData({ ...localPlanData, name: value });
//   };

//   const validateForm = () => {
//     if (!localPlanData.name) {
//       setError("Plan type is required");
//       return false;
//     }
//     if (!localPlanData.duration) {
//       setError("Duration is required");
//       return false;
//     }
//     if (!localPlanData.description) {
//       setError("Description is required");
//       return false;
//     }
//     if (!localPlanData.minUsers && localPlanData.minUsers !== 0) {
//       setError("Minimum users is required");
//       return false;
//     }
//     if (!localPlanData.maxUsers && localPlanData.maxUsers !== 0) {
//       setError("Maximum users is required");
//       return false;
//     }
//     if (parseInt(localPlanData.minUsers) > parseInt(localPlanData.maxUsers)) {
//       setError("Maximum users must be greater than minimum users");
//       return false;
//     }
//     if (!localPlanData.price && localPlanData.price !== 0) {
//       setError("Price is required");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem("token");
      
//       const payload = {
//         name: localPlanData.name,
//         duration: localPlanData.duration,
//         description: localPlanData.description,
//         minUsers: parseInt(localPlanData.minUsers),
//         maxUsers: parseInt(localPlanData.maxUsers),
//         price: parseFloat(localPlanData.price),
//              status: localPlanData.status || "active",
//       };

//       let response;
      
//       if (isEditMode) {
//         // Update existing plan
//         response = await axios.patch(
//           `${BASE_URL}/plans/update/${planData._id}`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         toast.success(response.data?.message || "Plan updated successfully!");
//       } else {
//         // Create new plan
//         response = await axios.post(
//           `${BASE_URL}/plans/create`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         toast.success(response.data?.message || "Plan created successfully!");
//       }

//       // Reset form
//       const resetData = {
//         name: "",
//         duration: "",
//         description: "",
//         minUsers: "",
//         maxUsers: "",
//         price: "",
//         status: "active",
//       };
//       setLocalPlanData(resetData);
//       setPlanData(resetData);
//       setCustomPlanName("");
//       setIsCustomPlan(false);
      
//       // Call onSuccess callback to refresh data in parent
//       if (onSuccess) {
//         await onSuccess();
//       }
      
//       // Close modal after everything is done
//       onClose(true);
      
//     } catch (err) {
//       console.error("Error saving plan:", err);
//       const errorMessage = err.response?.data?.message || "Failed to save plan";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     // Reset form and close modal without saving
//     const resetData = {
//       name: "",
//       duration: "",
//       description: "",
//       minUsers: "",
//       maxUsers: "",
//       price: "",
//       status: "active",
//     };
//     setLocalPlanData(resetData);
//     setPlanData(resetData);
//     setCustomPlanName("");
//     setIsCustomPlan(false);
//     setError("");
//     onClose(false);
//   };

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={handleCancel}
//           maxWidth="sm"
//           fullWidth
//           fullScreen={isSmallMobile}
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 20, scale: 0.95 },
//             animate: { opacity: 1, y: 0, scale: 1 },
//             exit: { opacity: 0, y: 20, scale: 0.95 },
//             transition: { duration: 0.2 },
//             sx: {
//               borderRadius: isSmallMobile ? 0 : { xs: 2, sm: 2.5 },
//               overflow: "hidden",
//               boxShadow: isSmallMobile ? "none" : `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
//               bgcolor: "background.paper",
//               border: '1px solid',
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               m: isSmallMobile ? 0 : { xs: 1, sm: 1.5 },
//               height: isSmallMobile ? '100%' : 'auto',
//               maxHeight: isSmallMobile ? '100%' : '80vh',
//               minHeight: 'auto',
//               display: 'flex',
//               flexDirection: 'column',
//               position: 'relative',
//             },
//           }}
//         >
//           {/* Header with Close Button */}
//           <DialogTitle
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               color: "white",
//               py: { xs: 1.5, sm: 2 },
//               px: { xs: 2, sm: 2.5 },
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               gap: { xs: 1, sm: 1.5 },
//               flexShrink: 0,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <Avatar
//                 sx={{
//                   bgcolor: alpha("#ffffff", 0.2),
//                   color: "white",
//                   width: { xs: 32, sm: 36 },
//                   height: { xs: 32, sm: 36 },
//                 }}
//               >
//                 {isEditMode ? <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//               </Avatar>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "subtitle1" : "h6"}
//                   fontWeight={600}
//                   color="white"
//                   sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//                 >
//                   {isEditMode ? "Edit Plan" : "Add New Plan"}
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: alpha("#ffffff", 0.8),
//                     fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                     display: { xs: 'none', sm: 'block' }
//                   }}
//                 >
//                   {isEditMode ? "Update plan details" : "Fill in the details to create a new plan"}
//                 </Typography>
//               </Box>
//             </Box>
//             <IconButton
//               onClick={handleCancel}
//               size="small"
//               sx={{ color: "white", '&:hover': { bgcolor: alpha("#ffffff", 0.1) } }}
//             >
//               <CloseIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//             </IconButton>
//           </DialogTitle>

//           {/* Body */}
//           <DialogContent sx={{
//             p: { xs: 2, sm: 2.5 },
//             pt: { xs: 2.5, sm: 3 },
//             bgcolor: "background.paper",
//             overflowY: 'auto',
//             flexGrow: 1,
//           }}>
//             {error && (
//               <Alert 
//                 severity="error" 
//                 sx={{ 
//                   mb: 2.5,
//                   borderRadius: 1.5,
//                   fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                 }}
//                 onClose={() => setError("")}
//               >
//                 {error}
//               </Alert>
//             )}

//             <Grid container spacing={2.5}>
//               {/* Plan Type */}
//               <Grid item xs={12} md={6} mt={1.5}>
//                 <TextField
//                   select
//                   fullWidth
//                   name="name"
//                   label="Plan Type"
//                   value={!isEditMode && isCustomPlan ? "Custom Plan" : (localPlanData.name || "")}
//                   onChange={handleChange}
//                   required
//                   size="small"
//                   disabled={loading}
//                   sx={{
//                     mt: 1,
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="">Select Plan Type</MenuItem>
//                   {planOptions.map((option, index) => (
//                     <MenuItem key={index} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                   {/* Only show custom plan option in create mode */}
//                   {!isEditMode && (
//                     <MenuItem value="Custom Plan" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
//                       + Create Custom Plan
//                     </MenuItem>
//                   )}
//                 </TextField>
//               </Grid>

//               {/* Custom Plan Name Input - Only show in create mode when custom plan is selected */}
//               {!isEditMode && isCustomPlan && (
//                 <Grid item xs={12} md={6} mt={1.5}>
//                   <TextField
//                     fullWidth
//                     name="customPlanName"
//                     label="Custom Plan Name"
//                     value={customPlanName}
//                     onChange={handleCustomPlanNameChange}
//                     placeholder="Enter custom plan name"
//                     size="small"
//                     required
//                     disabled={loading}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <AddIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       mt: 1,
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   />
//                 </Grid>
//               )}

//               {/* Duration */}
//               <Grid item xs={12} md={6} mt={1.5}>
//                 <TextField
//                   select
//                   fullWidth
//                   name="duration"
//                   label="Duration"
//                   value={localPlanData.duration || ""}
//                   onChange={handleChange}
//                   required
//                   size="small"
//                   disabled={loading}
//                   sx={{
//                     mt: 1,
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 >
//                   <MenuItem value="">Select Duration</MenuItem>
//                   {durationOptions.map((option, index) => (
//                     <MenuItem key={index} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Description */}
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   name="description"
//                   label="Description"
//                   value={localPlanData.description || ""}
//                   onChange={handleChange}
//                   placeholder="Enter plan description"
//                   multiline
//                   rows={2}
//                   size="small"
//                   disabled={loading}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />
//               </Grid>

//               {/* Min Users */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   name="minUsers"
//                   label="Minimum Users"
//                   value={localPlanData.minUsers || ""}
//                   onChange={handleChange}
//                   placeholder="Minimum users"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   disabled={loading}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />
//               </Grid>

//               {/* Max Users */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   name="maxUsers"
//                   label="Maximum Users"
//                   value={localPlanData.maxUsers || ""}
//                   onChange={handleChange}
//                   placeholder="Maximum users"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   disabled={loading}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />
//               </Grid>

//               {/* Price */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   name="price"
//                   label="Price (₹)"
//                   value={localPlanData.price || ""}
//                   onChange={handleChange}
//                   placeholder="Enter price"
//                   InputProps={{ inputProps: { min: 0, step: 0.01 } }}
//                   size="small"
//                   disabled={loading}
//                   sx={{
//                     '& .MuiInputLabel-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiInputBase-input': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                     },
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 1.5,
//                       '&:hover fieldset': {
//                         borderColor: theme.palette.primary.main,
//                       },
//                     },
//                   }}
//                 />
//               </Grid>

//               {/* Status - Only for editing */}
//               {isEditMode && (
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     select
//                     fullWidth
//                     name="status"
//                     label="Status"
//                     value={localPlanData.status || "active"}
//                     onChange={handleChange}
//                     size="small"
//                     disabled={loading}
//                     sx={{
//                       '& .MuiInputLabel-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiInputBase-input': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       },
//                       '& .MuiOutlinedInput-root': {
//                         borderRadius: 1.5,
//                         '&:hover fieldset': {
//                           borderColor: theme.palette.primary.main,
//                         },
//                       },
//                     }}
//                   >
//                     <MenuItem value="active">Active</MenuItem>
//                     <MenuItem value="inactive">Inactive</MenuItem>
//                   </TextField>
//                 </Grid>
//               )}
//             </Grid>

//             {/* Custom Plan Info Message */}
//             {!isEditMode && isCustomPlan && customPlanName && (
//               <Box sx={{ mt: 2, p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//                   Creating custom plan: <strong>{customPlanName}</strong>
//                 </Typography>
//               </Box>
//             )}
//           </DialogContent>

//           {/* Footer */}
//           <DialogActions
//             sx={{
//               p: { xs: 2, sm: 2.5 },
//               pt: { xs: 1.5, sm: 2 },
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "center",
//               gap: { xs: 1, sm: 1.5 },
//               borderTop: "1px solid",
//               borderColor: alpha(theme.palette.divider, 0.5),
//               bgcolor: "background.paper",
//               flexShrink: 0,
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={handleCancel}
//               fullWidth={isMobile}
//               size="small"
//               disabled={loading}
//               sx={{
//                 minWidth: { xs: '100%', sm: 100 },
//                 py: { xs: 0.8, sm: 0.9 },
//                 px: { xs: 1.5, sm: 2 },
//                 borderRadius: 1.5,
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//                 color: "text.secondary",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                 bgcolor: "background.paper",
//                 order: { xs: 2, sm: 1 },
//                 transition: 'all 0.3s ease',
//                 "&:hover": {
//                   borderColor: theme.palette.primary.main,
//                   color: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   transform: 'translateY(-2px)',
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               fullWidth={isMobile}
//               size="small"
//               disabled={loading || (!isEditMode && isCustomPlan && !customPlanName)}
//               startIcon={loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : null}
//               sx={{
//                 minWidth: { xs: '100%', sm: 100 },
//                 py: { xs: 0.8, sm: 0.9 },
//                 px: { xs: 1.5, sm: 2 },
//                 borderRadius: 1.5,
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                 order: { xs: 1, sm: 2 },
//                 transition: 'all 0.3s ease',
//                 boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
//                 "&:hover": {
//                   background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                   transform: 'translateY(-2px)',
//                   boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
//                 },
//               }}
//             >
//               {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update" : "Create")}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PlanModal;




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
  MenuItem,
  Grid,
  alpha,
  Avatar,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Close as CloseIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000/api";

const PlanModal = ({
  show,
  onClose,
  planData,
  setPlanData,
  planOptions = [],
  durationOptions = [],
  onSuccess,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCustomPlan, setIsCustomPlan] = useState(false);
  const [customPlanName, setCustomPlanName] = useState("");
  const [localPlanData, setLocalPlanData] = useState({ ...planData });

  const isEditMode = !!planData?._id;

  // Sync localPlanData when planData changes from parent
  useEffect(() => {
    if (show) {
      setLocalPlanData({ ...planData });
      if (!isEditMode) {
        setIsCustomPlan(false);
        setCustomPlanName("");
      }
    }
  }, [planData, show, isEditMode]);

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPlanData({ ...localPlanData, [name]: value });
    if (error) setError("");
    
    // Only show custom plan input in create mode
    if (!isEditMode && name === "name") {
      setIsCustomPlan(value === "Custom Plan");
      if (value !== "Custom Plan") {
        setCustomPlanName("");
      }
    }
  };

  const handleCustomPlanNameChange = (e) => {
    const value = e.target.value;
    setCustomPlanName(value);
    setLocalPlanData({ ...localPlanData, name: value });
  };

  const validateForm = () => {
    if (!localPlanData.name) {
      setError("Plan type is required");
      return false;
    }
    if (!localPlanData.duration) {
      setError("Duration is required");
      return false;
    }
    if (!localPlanData.description) {
      setError("Description is required");
      return false;
    }
    if (!localPlanData.maxUsers && localPlanData.maxUsers !== 0) {
      setError("Maximum users is required");
      return false;
    }
    if (!localPlanData.price && localPlanData.price !== 0) {
      setError("Price is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      
      const payload = {
        name: localPlanData.name,
        duration: localPlanData.duration,
        description: localPlanData.description,
        maxUsers: parseInt(localPlanData.maxUsers),
        price: parseFloat(localPlanData.price),
        status: localPlanData.status || "active",
      };

      let response;
      
      if (isEditMode) {
        // Update existing plan
        response = await axios.patch(
          `${BASE_URL}/plans/update/${planData._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data?.message || "Plan updated successfully!");
      } else {
        // Create new plan
        response = await axios.post(
          `${BASE_URL}/plans/create`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(response.data?.message || "Plan created successfully!");
      }

      // Reset form
      const resetData = {
        name: "",
        duration: "",
        description: "",
        maxUsers: "",
        price: "",
        status: "active",
      };
      setLocalPlanData(resetData);
      setPlanData(resetData);
      setCustomPlanName("");
      setIsCustomPlan(false);
      
      // Call onSuccess callback to refresh data in parent
      if (onSuccess) {
        await onSuccess();
      }
      
      // Close modal after everything is done
      onClose(true);
      
    } catch (err) {
      console.error("Error saving plan:", err);
      const errorMessage = err.response?.data?.message || "Failed to save plan";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form and close modal without saving
    const resetData = {
      name: "",
      duration: "",
      description: "",
      maxUsers: "",
      price: "",
      status: "active",
    };
    setLocalPlanData(resetData);
    setPlanData(resetData);
    setCustomPlanName("");
    setIsCustomPlan(false);
    setError("");
    onClose(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={handleCancel}
          maxWidth="sm"
          fullWidth
          fullScreen={isSmallMobile}
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 20, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 20, scale: 0.95 },
            transition: { duration: 0.2 },
            sx: {
              borderRadius: isSmallMobile ? 0 : { xs: 2, sm: 2.5 },
              overflow: "hidden",
              boxShadow: isSmallMobile ? "none" : `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
              bgcolor: "background.paper",
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1),
              m: isSmallMobile ? 0 : { xs: 1, sm: 1.5 },
              height: isSmallMobile ? '100%' : 'auto',
              maxHeight: isSmallMobile ? '100%' : '80vh',
              minHeight: 'auto',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            },
          }}
        >
          {/* Header with Close Button */}
          <DialogTitle
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "white",
              py: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 1, sm: 1.5 },
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: alpha("#ffffff", 0.2),
                  color: "white",
                  width: { xs: 32, sm: 36 },
                  height: { xs: 32, sm: 36 },
                }}
              >
                {isEditMode ? <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
              </Avatar>
              <Box>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  fontWeight={600}
                  color="white"
                  sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                >
                  {isEditMode ? "Edit Plan" : "Add New Plan"}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha("#ffffff", 0.8),
                    fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  {isEditMode ? "Update plan details" : "Fill in the details to create a new plan"}
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={handleCancel}
              size="small"
              sx={{ color: "white", '&:hover': { bgcolor: alpha("#ffffff", 0.1) } }}
            >
              <CloseIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
          </DialogTitle>

          {/* Body */}
          <DialogContent 
          
          sx={{
            p: { xs: 2, sm: 2.5 },
            pt: { xs: 2.5, sm: 3 },
            bgcolor: "background.paper",
            overflowY: 'auto',
            flexGrow: 1,
          }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2.5,
                  borderRadius: 1.5,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            )}

            <Grid container spacing={2.5}>
              {/* Plan Type */}
              <Grid item xs={12} md={6}>
                <TextField
                className="mt-2"
                  select
                  fullWidth
                  name="name"
                  label="Plan Type"
                  value={!isEditMode && isCustomPlan ? "Custom Plan" : (localPlanData.name || "")}
                  onChange={handleChange}
                  required
                  size="small"
                  disabled={loading}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  <MenuItem value="">Select Plan Type</MenuItem>
                  {planOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                  {/* Only show custom plan option in create mode */}
                  {!isEditMode && (
                    <MenuItem value="Custom Plan" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                      + Create Custom Plan
                    </MenuItem>
                  )}
                </TextField>
              </Grid>

              {/* Custom Plan Name Input - Only show in create mode when custom plan is selected */}
              {!isEditMode && isCustomPlan && (
                <Grid item xs={12} md={6}>
                  <TextField
                  className="mt-2"
                    fullWidth
                    name="customPlanName"
                    label="Custom Plan Name"
                    value={customPlanName}
                    onChange={handleCustomPlanNameChange}
                    placeholder="Enter custom plan name"
                    size="small"
                    required
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Grid>
              )}

              {/* Duration */}
              <Grid item xs={12} md={6}>
                <TextField
                className="mt-2"
                  select
                  fullWidth
                  name="duration"
                  label="Duration"
                  value={localPlanData.duration || ""}
                  onChange={handleChange}
                  required
                  size="small"
                  disabled={loading}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  <MenuItem value="">Select Duration</MenuItem>
                  {durationOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={localPlanData.description || ""}
                  onChange={handleChange}
                  placeholder="Enter plan description"
                  multiline
                  rows={2}
                  size="small"
                  disabled={loading}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>

              {/* Max Users */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="maxUsers"
                  label="Maximum Users"
                  value={localPlanData.maxUsers || ""}
                  onChange={handleChange}
                  placeholder="Maximum users"
                  InputProps={{ inputProps: { min: 1 } }}
                  size="small"
                  disabled={loading}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>

              {/* Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="price"
                  label="Price (₹)"
                  value={localPlanData.price || ""}
                  onChange={handleChange}
                  placeholder="Enter price"
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                  size="small"
                  disabled={loading}
                  sx={{
                    '& .MuiInputLabel-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiInputBase-input': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1.5,
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
              </Grid>

              {/* Status - Only for editing */}
              {isEditMode && (
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    name="status"
                    label="Status"
                    value={localPlanData.status || "active"}
                    onChange={handleChange}
                    size="small"
                    disabled={loading}
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 1.5,
                        '&:hover fieldset': {
                          borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
              )}
            </Grid>

            {/* Custom Plan Info Message */}
            {!isEditMode && isCustomPlan && customPlanName && (
              <Box sx={{ mt: 2, p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                  Creating custom plan: <strong>{customPlanName}</strong>
                </Typography>
              </Box>
            )}
          </DialogContent>

          {/* Footer */}
          <DialogActions
            sx={{
              p: { xs: 2, sm: 2.5 },
              pt: { xs: 1.5, sm: 2 },
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "center",
              gap: { xs: 1, sm: 1.5 },
              borderTop: "1px solid",
              borderColor: alpha(theme.palette.divider, 0.5),
              bgcolor: "background.paper",
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              fullWidth={isMobile}
              size="small"
              disabled={loading}
              sx={{
                minWidth: { xs: '100%', sm: 100 },
                py: { xs: 0.8, sm: 0.9 },
                px: { xs: 1.5, sm: 2 },
                borderRadius: 1.5,
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: "text.secondary",
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                bgcolor: "background.paper",
                order: { xs: 2, sm: 1 },
                transition: 'all 0.3s ease',
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth={isMobile}
              size="small"
              disabled={loading || (!isEditMode && isCustomPlan && !customPlanName)}
              startIcon={loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : null}
              sx={{
                minWidth: { xs: '100%', sm: 100 },
                py: { xs: 0.8, sm: 0.9 },
                px: { xs: 1.5, sm: 2 },
                borderRadius: 1.5,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                color: "white",
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                order: { xs: 1, sm: 2 },
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
              }}
            >
              {loading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update" : "Create")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PlanModal;