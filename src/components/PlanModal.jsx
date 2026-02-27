// import React from "react";
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
// } from "@mui/material";
// import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";

// const PlanModal = ({
//   show,
//   onClose,
//   onSubmit,
//   planData,
//   handleChange,
//   planOptions = [],
//   durationOptions = [],
// }) => {
//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onClose}
//           maxWidth="md"
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
//               bgcolor: "white", // White background for the main dialog
//             },
//           }}
//         >
//           {/* Header - Kept gradient as it's a header */}
//           <DialogTitle
//             sx={{
//               background: "linear-gradient(135deg, #0f766e, #0a5c55)",
//               color: "white",
//               py: 3,
//               px: 4,
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: 40,
//                 height: 40,
//               }}
//             >
//               {planData._id ? <EditIcon /> : <AddIcon />}
//             </Avatar>
//             <Box>
//               <Typography variant="h6" fontWeight={600} color="white">
//                 {planData._id ? "Edit Plan" : "Add New Plan"}
//               </Typography>
//               <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.8) }}>
//                 {planData._id ? "Update plan details below" : "Fill in the details to create a new plan"}
//               </Typography>
//             </Box>
//           </DialogTitle>

//           {/* Body - White background */}
//           <DialogContent sx={{ p: 4, bgcolor: "white" }}>
//             <Grid container spacing={3}>
//               {/* Plan Type */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   name="name"
//                   label="Plan Type"
//                   value={planData.name || ""}
//                   onChange={handleChange}
//                   required
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                     },
//                   }}
//                 >
//                   <MenuItem value="">Select Plan Type</MenuItem>
//                   {planOptions.map((option, index) => (
//                     <MenuItem key={index} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Duration */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   name="duration"
//                   label="Duration"
//                   value={planData.duration || ""}
//                   onChange={handleChange}
//                   required
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
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
//                   value={planData.description || ""}
//                   onChange={handleChange}
//                   placeholder="Enter plan description"
//                   multiline
//                   rows={2}
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
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
//                   value={planData.minUsers || ""}
//                   onChange={handleChange}
//                   placeholder="Enter minimum number of users"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
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
//                   value={planData.maxUsers || ""}
//                   onChange={handleChange}
//                   placeholder="Enter maximum number of users"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
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
//                   value={planData.price || ""}
//                   onChange={handleChange}
//                   placeholder="Enter plan price"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                     },
//                   }}
//                 />
//               </Grid>

//               {/* Status - Only for editing */}
//               {planData._id && (
//                 <Grid item xs={12} md={6}>
//                   <TextField
//                     select
//                     fullWidth
//                     name="status"
//                     label="Status"
//                     value={planData.status || "active"}
//                     onChange={handleChange}
//                     size="small"
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         bgcolor: "#ffffff",
//                       },
//                     }}
//                   >
//                     <MenuItem value="active">Active</MenuItem>
//                     <MenuItem value="inactive">Inactive</MenuItem>
//                   </TextField>
//                 </Grid>
//               )}
//             </Grid>
//           </DialogContent>

//           {/* Footer - White background */}
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
//               onClick={onClose}
//               sx={{
//                 minWidth: 120,
//                 py: 1,
//                 borderRadius: 2,
//                 borderColor: "#e2e8f0",
//                 color: "#64748b",
//                 fontWeight: 600,
//                 bgcolor: "white",
//                 "&:hover": {
//                   borderColor: "#cbd5e1",
//                   bgcolor: "#f8fafc",
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={onSubmit}
//               sx={{
//                 minWidth: 120,
//                 py: 1,
//                 borderRadius: 2,
//                 bgcolor: "#0f766e",
//                 color: "white",
//                 fontWeight: 600,
//                 "&:hover": {
//                   bgcolor: "#0a5c55",
//                 },
//               }}
//             >
//               {planData._id ? "Update Plan" : "Create Plan"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PlanModal;










import React from "react";
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
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const PlanModal = ({
  show,
  onClose,
  onSubmit,
  planData,
  handleChange,
  planOptions = [],
  durationOptions = [],
}) => {
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');

  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={onClose}
          maxWidth="md"
          fullWidth
          fullScreen={isSmallMobile}
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 50, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 50, scale: 0.9 },
            transition: { duration: 0.3 },
            sx: {
              borderRadius: isSmallMobile ? 0 : { xs: 3, sm: 3.5, md: 4 },
              overflow: "hidden",
              boxShadow: isSmallMobile ? "none" : "0 25px 50px -12px rgba(0,0,0,0.25)",
              bgcolor: "white",
              m: isSmallMobile ? 0 : { xs: 2, sm: 3, md: 4 },
              height: isSmallMobile ? '100%' : 'auto',
              maxHeight: isSmallMobile ? '100%' : '90vh',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {/* Header - Responsive */}
          <DialogTitle
            sx={{
              background: "linear-gradient(135deg, #0f766e, #0a5c55)",
              color: "white",
              py: { xs: 2, sm: 2.5, md: 3 },
              px: { xs: 2, sm: 3, md: 4 },
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.2, md: 1.5 },
              flexShrink: 0,
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                width: { xs: 32, sm: 36, md: 40 },
                height: { xs: 32, sm: 36, md: 40 },
              }}
            >
              {planData._id ? <EditIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
            </Avatar>
            <Box>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                fontWeight={600} 
                color="white"
                sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
              >
                {planData._id ? "Edit Plan" : "Add New Plan"}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: alpha("#ffffff", 0.8),
                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                {planData._id ? "Update plan details below" : "Fill in the details to create a new plan"}
              </Typography>
            </Box>
          </DialogTitle>

          {/* Body - Responsive with scroll */}
          <DialogContent sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            bgcolor: "white",
            overflowY: 'auto',
            flexGrow: 1,
          }}>
            <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
              {/* Plan Type */}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  name="name"
                  label="Plan Type"
                  value={planData.name || ""}
                  onChange={handleChange}
                  required
                  size={isSmallMobile ? "small" : "small"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: { xs: 1.5, sm: 2 },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    "& .MuiSelect-select": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                  }}
                >
                  <MenuItem value="">Select Plan Type</MenuItem>
                  {planOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Duration */}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  name="duration"
                  label="Duration"
                  value={planData.duration || ""}
                  onChange={handleChange}
                  required
                  size={isSmallMobile ? "small" : "small"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: { xs: 1.5, sm: 2 },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    "& .MuiSelect-select": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
                  value={planData.description || ""}
                  onChange={handleChange}
                  placeholder="Enter plan description"
                  multiline
                  rows={isSmallMobile ? 2 : isMobile ? 2 : 2}
                  size={isSmallMobile ? "small" : "small"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: { xs: 1.5, sm: 2 },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                  }}
                />
              </Grid>

              {/* Min Users */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="minUsers"
                  label="Minimum Users"
                  value={planData.minUsers || ""}
                  onChange={handleChange}
                  placeholder={isSmallMobile ? "Min users" : "Enter minimum number of users"}
                  InputProps={{ inputProps: { min: 0 } }}
                  size={isSmallMobile ? "small" : "small"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: { xs: 1.5, sm: 2 },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
                  value={planData.maxUsers || ""}
                  onChange={handleChange}
                  placeholder={isSmallMobile ? "Max users" : "Enter maximum number of users"}
                  InputProps={{ inputProps: { min: 0 } }}
                  size={isSmallMobile ? "small" : "small"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: { xs: 1.5, sm: 2 },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
                  value={planData.price || ""}
                  onChange={handleChange}
                  placeholder={isSmallMobile ? "Price" : "Enter plan price"}
                  InputProps={{ inputProps: { min: 0 } }}
                  size={isSmallMobile ? "small" : "small"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                      borderRadius: { xs: 1.5, sm: 2 },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                  }}
                />
              </Grid>

              {/* Status - Only for editing */}
              {planData._id && (
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    name="status"
                    label="Status"
                    value={planData.status || "active"}
                    onChange={handleChange}
                    size={isSmallMobile ? "small" : "small"}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#ffffff",
                        borderRadius: { xs: 1.5, sm: 2 },
                      },
                      "& .MuiInputLabel-root": {
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      },
                      "& .MuiSelect-select": {
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      },
                    }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
              )}
            </Grid>
          </DialogContent>

          {/* Footer - Responsive */}
          <DialogActions
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              pt: { xs: 1.5, sm: 1.5, md: 2 },
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "center",
              gap: { xs: 1, sm: 1.5, md: 2 },
              borderTop: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              bgcolor: "white",
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              fullWidth={isMobile}
              sx={{
                minWidth: { xs: '100%', sm: 100, md: 120 },
                py: { xs: 0.8, sm: 0.9, md: 1 },
                px: { xs: 2, sm: 3 },
                borderRadius: { xs: 1.5, sm: 2 },
                borderColor: "#e2e8f0",
                color: "#64748b",
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                bgcolor: "white",
                order: { xs: 2, sm: 1 },
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
              onClick={onSubmit}
              fullWidth={isMobile}
              sx={{
                minWidth: { xs: '100%', sm: 100, md: 120 },
                py: { xs: 0.8, sm: 0.9, md: 1 },
                px: { xs: 2, sm: 3 },
                borderRadius: { xs: 1.5, sm: 2 },
                bgcolor: "#0f766e",
                color: "white",
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                order: { xs: 1, sm: 2 },
                "&:hover": {
                  bgcolor: "#0a5c55",
                },
              }}
            >
              {planData._id ? "Update Plan" : "Create Plan"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PlanModal;