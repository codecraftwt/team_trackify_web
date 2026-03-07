
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
//   useMediaQuery,
//   useTheme,
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
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onClose}
//           maxWidth="md"
//           fullWidth
//           fullScreen={isSmallMobile}
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50, scale: 0.9 },
//             animate: { opacity: 1, y: 0, scale: 1 },
//             exit: { opacity: 0, y: 50, scale: 0.9 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: isSmallMobile ? 0 : { xs: 3, sm: 3.5, md: 4 },
//               overflow: "hidden",
//               boxShadow: isSmallMobile ? "none" : "0 25px 50px -12px rgba(0,0,0,0.25)",
//               bgcolor: "white",
//               m: isSmallMobile ? 0 : { xs: 2, sm: 3, md: 4 },
//               height: isSmallMobile ? '100%' : 'auto',
//               maxHeight: isSmallMobile ? '100%' : '90vh',
//               display: 'flex',
//               flexDirection: 'column',
//             },
//           }}
//         >
//           {/* Header - Responsive */}
//           <DialogTitle
//             sx={{
//               background: "linear-gradient(135deg, #0f766e, #0a5c55)",
//               color: "white",
//               py: { xs: 2, sm: 2.5, md: 3 },
//               px: { xs: 2, sm: 3, md: 4 },
//               display: "flex",
//               alignItems: "center",
//               gap: { xs: 1, sm: 1.2, md: 1.5 },
//               flexShrink: 0,
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: { xs: 32, sm: 36, md: 40 },
//                 height: { xs: 32, sm: 36, md: 40 },
//               }}
//             >
//               {planData._id ? <EditIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
//             </Avatar>
//             <Box>
//               <Typography 
//                 variant={isMobile ? "subtitle1" : "h6"} 
//                 fontWeight={600} 
//                 color="white"
//                 sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
//               >
//                 {planData._id ? "Edit Plan" : "Add New Plan"}
//               </Typography>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: alpha("#ffffff", 0.8),
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                   display: { xs: 'none', sm: 'block' }
//                 }}
//               >
//                 {planData._id ? "Update plan details below" : "Fill in the details to create a new plan"}
//               </Typography>
//             </Box>
//           </DialogTitle>

//           {/* Body - Responsive with scroll */}
//           <DialogContent sx={{ 
//             p: { xs: 2, sm: 3, md: 4 }, 
//             bgcolor: "white",
//             overflowY: 'auto',
//             flexGrow: 1,
//           }}>
//             <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
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
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiSelect-select": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiSelect-select": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   rows={isSmallMobile ? 2 : isMobile ? 2 : 2}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   placeholder={isSmallMobile ? "Min users" : "Enter minimum number of users"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   placeholder={isSmallMobile ? "Max users" : "Enter maximum number of users"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   placeholder={isSmallMobile ? "Price" : "Enter plan price"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "#ffffff",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                     size={isSmallMobile ? "small" : "small"}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         bgcolor: "#ffffff",
//                         borderRadius: { xs: 1.5, sm: 2 },
//                       },
//                       "& .MuiInputLabel-root": {
//                         fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                       },
//                       "& .MuiSelect-select": {
//                         fontSize: { xs: '0.8rem', sm: '0.9rem' },
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

//           {/* Footer - Responsive */}
//           <DialogActions
//             sx={{
//               p: { xs: 2, sm: 2.5, md: 3 },
//               pt: { xs: 1.5, sm: 1.5, md: 2 },
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "center",
//               gap: { xs: 1, sm: 1.5, md: 2 },
//               borderTop: "1px solid",
//               borderColor: alpha("#e2e8f0", 0.5),
//               bgcolor: "white",
//               flexShrink: 0,
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onClose}
//               fullWidth={isMobile}
//               sx={{
//                 minWidth: { xs: '100%', sm: 100, md: 120 },
//                 py: { xs: 0.8, sm: 0.9, md: 1 },
//                 px: { xs: 2, sm: 3 },
//                 borderRadius: { xs: 1.5, sm: 2 },
//                 borderColor: "#e2e8f0",
//                 color: "#64748b",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                 bgcolor: "white",
//                 order: { xs: 2, sm: 1 },
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
//               fullWidth={isMobile}
//               sx={{
//                 minWidth: { xs: '100%', sm: 100, md: 120 },
//                 py: { xs: 0.8, sm: 0.9, md: 1 },
//                 px: { xs: 2, sm: 3 },
//                 borderRadius: { xs: 1.5, sm: 2 },
//                 bgcolor: "#0f766e",
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                 order: { xs: 1, sm: 2 },
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
























//////////////////////////////    Centralised Color     ///////////////////////////////





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
//   useMediaQuery,
//   useTheme,
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
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onClose}
//           maxWidth="md"
//           fullWidth
//           fullScreen={isSmallMobile}
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50, scale: 0.9 },
//             animate: { opacity: 1, y: 0, scale: 1 },
//             exit: { opacity: 0, y: 50, scale: 0.9 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: isSmallMobile ? 0 : { xs: 3, sm: 3.5, md: 4 },
//               overflow: "hidden",
//               boxShadow: isSmallMobile ? "none" : "0 25px 50px -12px rgba(0,0,0,0.25)",
//               bgcolor: "background.paper",
//               m: isSmallMobile ? 0 : { xs: 2, sm: 3, md: 4 },
//               height: isSmallMobile ? '100%' : 'auto',
//               maxHeight: isSmallMobile ? '100%' : '90vh',
//               display: 'flex',
//               flexDirection: 'column',
//             },
//           }}
//         >
//           {/* Header - Responsive */}
//           <DialogTitle
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               color: "white",
//               py: { xs: 2, sm: 2.5, md: 3 },
//               px: { xs: 2, sm: 3, md: 4 },
//               display: "flex",
//               alignItems: "center",
//               gap: { xs: 1, sm: 1.2, md: 1.5 },
//               flexShrink: 0,
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: { xs: 32, sm: 36, md: 40 },
//                 height: { xs: 32, sm: 36, md: 40 },
//               }}
//             >
//               {planData._id ? <EditIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
//             </Avatar>
//             <Box>
//               <Typography 
//                 variant={isMobile ? "subtitle1" : "h6"} 
//                 fontWeight={600} 
//                 color="white"
//                 sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
//               >
//                 {planData._id ? "Edit Plan" : "Add New Plan"}
//               </Typography>
//               <Typography 
//                 variant="caption" 
//                 sx={{ 
//                   color: alpha("#ffffff", 0.8),
//                   fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                   display: { xs: 'none', sm: 'block' }
//                 }}
//               >
//                 {planData._id ? "Update plan details below" : "Fill in the details to create a new plan"}
//               </Typography>
//             </Box>
//           </DialogTitle>

//           {/* Body - Responsive with scroll */}
//           <DialogContent sx={{ 
//             p: { xs: 2, sm: 3, md: 4 }, 
//             bgcolor: "background.paper",
//             overflowY: 'auto',
//             flexGrow: 1,
//           }}>
//             <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
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
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiSelect-select": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiSelect-select": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   rows={isSmallMobile ? 2 : isMobile ? 2 : 2}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   placeholder={isSmallMobile ? "Min users" : "Enter minimum number of users"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   placeholder={isSmallMobile ? "Max users" : "Enter maximum number of users"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                   placeholder={isSmallMobile ? "Price" : "Enter plan price"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size={isSmallMobile ? "small" : "small"}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: { xs: 1.5, sm: 2 },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
//                     size={isSmallMobile ? "small" : "small"}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         bgcolor: "background.paper",
//                         borderRadius: { xs: 1.5, sm: 2 },
//                       },
//                       "& .MuiInputLabel-root": {
//                         fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                       },
//                       "& .MuiSelect-select": {
//                         fontSize: { xs: '0.8rem', sm: '0.9rem' },
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

//           {/* Footer - Responsive */}
//           <DialogActions
//             sx={{
//               p: { xs: 2, sm: 2.5, md: 3 },
//               pt: { xs: 1.5, sm: 1.5, md: 2 },
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "center",
//               gap: { xs: 1, sm: 1.5, md: 2 },
//               borderTop: "1px solid",
//               borderColor: alpha(theme.palette.divider, 0.5),
//               bgcolor: "background.paper",
//               flexShrink: 0,
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onClose}
//               fullWidth={isMobile}
//               sx={{
//                 minWidth: { xs: '100%', sm: 100, md: 120 },
//                 py: { xs: 0.8, sm: 0.9, md: 1 },
//                 px: { xs: 2, sm: 3 },
//                 borderRadius: { xs: 1.5, sm: 2 },
//                 borderColor: alpha(theme.palette.divider, 0.5),
//                 color: "text.secondary",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                 bgcolor: "background.paper",
//                 order: { xs: 2, sm: 1 },
//                 "&:hover": {
//                   borderColor: theme.palette.primary.main,
//                   color: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={onSubmit}
//               fullWidth={isMobile}
//               sx={{
//                 minWidth: { xs: '100%', sm: 100, md: 120 },
//                 py: { xs: 0.8, sm: 0.9, md: 1 },
//                 px: { xs: 2, sm: 3 },
//                 borderRadius: { xs: 1.5, sm: 2 },
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
//                 order: { xs: 1, sm: 2 },
//                 "&:hover": {
//                   background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
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
//   useMediaQuery,
//   useTheme,
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
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');
//   const isLandscape = useMediaQuery('(orientation: landscape)');

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onClose}
//           maxWidth="sm" // Changed from "md" to "sm" for reduced width
//           fullWidth
//           fullScreen={isSmallMobile}
//           PaperComponent={motion.div}
//           PaperProps={{
//             initial: { opacity: 0, y: 50, scale: 0.9 },
//             animate: { opacity: 1, y: 0, scale: 1 },
//             exit: { opacity: 0, y: 50, scale: 0.9 },
//             transition: { duration: 0.3 },
//             sx: {
//               borderRadius: isSmallMobile ? 0 : { xs: 2, sm: 2.5, md: 3 },
//               overflow: "hidden",
//               boxShadow: isSmallMobile ? "none" : "0 25px 50px -12px rgba(0,0,0,0.25)",
//               bgcolor: "background.paper",
//               m: isSmallMobile ? 0 : { xs: 1, sm: 1.5, md: 2 },
//               height: isSmallMobile ? '100%' : 'auto',
//               maxHeight: isSmallMobile ? '100%' : '85vh', // Reduced max height
//               minHeight: '500px', // Minimum height for better spacing
//               display: 'flex',
//               flexDirection: 'column',
//               position: 'relative',
//               top: { xs: isLandscape ? 0 : 0, sm: 0 },
//             },
//           }}
//         >
//           {/* Header - Smaller */}
//           <DialogTitle
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               color: "white",
//               py: { xs: 1.5, sm: 2, md: 2.5 },
//               px: { xs: 1.5, sm: 2.5, md: 3 },
//               display: "flex",
//               alignItems: "center",
//               gap: { xs: 0.8, sm: 1, md: 1.2 },
//               flexShrink: 0,
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: { xs: 28, sm: 32, md: 36 },
//                 height: { xs: 28, sm: 32, md: 36 },
//               }}
//             >
//               {planData._id ? <EditIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} /> : <AddIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />}
//             </Avatar>
//             <Box>
//               <Typography
//                 variant={isMobile ? "body1" : "h6"}
//                 fontWeight={600}
//                 color="white"
//                 sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//               >
//                 {planData._id ? "Edit Plan" : "Add New Plan"}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: alpha("#ffffff", 0.8),
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   display: { xs: 'none', sm: 'block' }
//                 }}
//               >
//                 {planData._id ? "Update plan details" : "Fill in the details to create a new plan"}
//               </Typography>
//             </Box>
//           </DialogTitle>

//           {/* Body - Fixed label visibility with vertical gaps */}
//           <DialogContent sx={{
//             p: {
//               xs: isLandscape ? 1 : 1.5,
//               sm: 2,
//               md: 2.5
//             },
//             pt: {
//               xs: isLandscape ? 1.5 : 2,
//               sm: 2.5,
//               md: 3
//             },
//             bgcolor: "background.paper",
//             overflowY: 'auto',
//             flexGrow: 1,
//           }}>
//             <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}> {/* Increased vertical gap */}
//               {/* Plan Type - Fixed height and label visibility */}
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
//                       bgcolor: "background.paper",
//                       borderRadius: 1.5,
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       height: 48, // Increased height
//                       '& fieldset': {
//                         borderWidth: 1,
//                       },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       transform: 'translate(14px, 14px) scale(1)', // Adjusted position for larger height
//                       '&.Mui-focused, &.MuiFormLabel-filled': {
//                         transform: 'translate(14px, -6px) scale(0.75)',
//                       },
//                     },
//                     "& .MuiInputLabel-shrink": {
//                       transform: 'translate(14px, -6px) scale(0.75)',
//                     },
//                     "& .MuiSelect-select": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       py: 1.5, // Increased vertical padding
//                     },
//                     "& .MuiMenuItem-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
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

//               {/* Duration - Fixed height and label visibility */}
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
//                       bgcolor: "background.paper",
//                       borderRadius: 1.5,
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       height: 48, // Increased height
//                       '& fieldset': {
//                         borderWidth: 1,
//                       },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       transform: 'translate(14px, 14px) scale(1)', // Adjusted position for larger height
//                       '&.Mui-focused, &.MuiFormLabel-filled': {
//                         transform: 'translate(14px, -6px) scale(0.75)',
//                       },
//                     },
//                     "& .MuiInputLabel-shrink": {
//                       transform: 'translate(14px, -6px) scale(0.75)',
//                     },
//                     "& .MuiSelect-select": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       py: 1.5, // Increased vertical padding
//                     },
//                     "& .MuiMenuItem-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
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
//                   rows={isSmallMobile ? 3 : 3} // Increased rows
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: 1.5,
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       '& fieldset': {
//                         borderWidth: 1,
//                       },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       transform: 'translate(14px, 14px) scale(1)',
//                       '&.Mui-focused, &.MuiFormLabel-filled': {
//                         transform: 'translate(14px, -6px) scale(0.75)',
//                       },
//                     },
//                     "& .MuiInputLabel-shrink": {
//                       transform: 'translate(14px, -6px) scale(0.75)',
//                     },
//                     "& .MuiInputBase-inputMultiline": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       py: 1.5,
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
//                   placeholder={isSmallMobile ? "Min users" : "Minimum users"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: 1.5,
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       height: 48,
//                       '& fieldset': {
//                         borderWidth: 1,
//                       },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       transform: 'translate(14px, 14px) scale(1)',
//                       '&.Mui-focused, &.MuiFormLabel-filled': {
//                         transform: 'translate(14px, -6px) scale(0.75)',
//                       },
//                     },
//                     "& .MuiInputLabel-shrink": {
//                       transform: 'translate(14px, -6px) scale(0.75)',
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       py: 1.5,
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
//                   placeholder={isSmallMobile ? "Max users" : "Maximum users"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: 1.5,
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       height: 48,
//                       '& fieldset': {
//                         borderWidth: 1,
//                       },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       transform: 'translate(14px, 14px) scale(1)',
//                       '&.Mui-focused, &.MuiFormLabel-filled': {
//                         transform: 'translate(14px, -6px) scale(0.75)',
//                       },
//                     },
//                     "& .MuiInputLabel-shrink": {
//                       transform: 'translate(14px, -6px) scale(0.75)',
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       py: 1.5,
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
//                   placeholder={isSmallMobile ? "Price" : "Enter price"}
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       bgcolor: "background.paper",
//                       borderRadius: 1.5,
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       height: 48,
//                       '& fieldset': {
//                         borderWidth: 1,
//                       },
//                     },
//                     "& .MuiInputLabel-root": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       transform: 'translate(14px, 14px) scale(1)',
//                       '&.Mui-focused, &.MuiFormLabel-filled': {
//                         transform: 'translate(14px, -6px) scale(0.75)',
//                       },
//                     },
//                     "& .MuiInputLabel-shrink": {
//                       transform: 'translate(14px, -6px) scale(0.75)',
//                     },
//                     "& .MuiInputBase-input": {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                       py: 1.5,
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
//                         bgcolor: "background.paper",
//                         borderRadius: 1.5,
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                         height: 48,
//                         '& fieldset': {
//                           borderWidth: 1,
//                         },
//                       },
//                       "& .MuiInputLabel-root": {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                         transform: 'translate(14px, 14px) scale(1)',
//                         '&.Mui-focused, &.MuiFormLabel-filled': {
//                           transform: 'translate(14px, -6px) scale(0.75)',
//                         },
//                       },
//                       "& .MuiInputLabel-shrink": {
//                         transform: 'translate(14px, -6px) scale(0.75)',
//                       },
//                       "& .MuiSelect-select": {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                         py: 1.5,
//                       },
//                       "& .MuiMenuItem-root": {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
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

//           {/* Footer */}
//           <DialogActions
//             sx={{
//               p: { 
//                 xs: isLandscape ? 1 : 1.5, 
//                 sm: 2, 
//                 md: 2.5 
//               },
//               pt: { 
//                 xs: isLandscape ? 0.8 : 1, 
//                 sm: 1.5, 
//                 md: 2 
//               },
//               pb: { 
//                 xs: isLandscape ? 1 : 1.5, 
//                 sm: 2, 
//                 md: 2.5 
//               },
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "center",
//               gap: { xs: 0.8, sm: 1.2, md: 1.5 },
//               borderTop: "1px solid",
//               borderColor: alpha(theme.palette.divider, 0.5),
//               bgcolor: "background.paper",
//               flexShrink: 0,
//             }}
//           >
//             <Button
//               variant="outlined"
//               onClick={onClose}
//               fullWidth={isMobile}
//               size="small"
//               sx={{
//                 minWidth: { xs: '100%', sm: 90, md: 100 },
//                 py: { xs: 0.7, sm: 0.8, md: 0.9 },
//                 px: { xs: 1.5, sm: 2 },
//                 borderRadius: 1.5,
//                 borderColor: alpha(theme.palette.divider, 0.5),
//                 color: "text.secondary",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                 bgcolor: "background.paper",
//                 order: { xs: 2, sm: 1 },
//                 "&:hover": {
//                   borderColor: theme.palette.primary.main,
//                   color: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 },
//               }}
//             >
//               Cancel
//             </Button>

//             <Button
//               variant="contained"
//               onClick={onSubmit}
//               fullWidth={isMobile}
//               size="small"
//               sx={{
//                 minWidth: { xs: '100%', sm: 90, md: 100 },
//                 py: { xs: 0.7, sm: 0.8, md: 0.9 },
//                 px: { xs: 1.5, sm: 2 },
//                 borderRadius: 1.5,
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                 order: { xs: 1, sm: 2 },
//                 "&:hover": {
//                   background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
//                 },
//               }}
//             >
//               {planData._id ? "Update" : "Create"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PlanModal;







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
//   useMediaQuery,
//   useTheme,
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
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:400px)');
//   const isLandscape = useMediaQuery('(orientation: landscape)');

//   return (
//     <AnimatePresence>
//       {show && (
//         <Dialog
//           open={show}
//           onClose={onClose}
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
//           {/* Header - UserManagement style */}
//           <DialogTitle
//             sx={{
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               color: "white",
//               py: { xs: 1.5, sm: 2 },
//               px: { xs: 2, sm: 2.5 },
//               display: "flex",
//               alignItems: "center",
//               gap: { xs: 1, sm: 1.5 },
//               flexShrink: 0,
//             }}
//           >
//             <Avatar
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 width: { xs: 32, sm: 36 },
//                 height: { xs: 32, sm: 36 },
//               }}
//             >
//               {planData._id ? <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//             </Avatar>
//             <Box>
//               <Typography
//                 variant={isMobile ? "subtitle1" : "h6"}
//                 fontWeight={600}
//                 color="white"
//                 sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//               >
//                 {planData._id ? "Edit Plan" : "Add New Plan"}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: alpha("#ffffff", 0.8),
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                   display: { xs: 'none', sm: 'block' }
//                 }}
//               >
//                 {planData._id ? "Update plan details" : "Fill in the details to create a new plan"}
//               </Typography>
//             </Box>
//           </DialogTitle>

//           {/* Body - UserManagement style with proper spacing */}
//           <DialogContent className="mt-2" sx={{
//             p: { xs: 2, sm: 2.5 },
//             pt: { xs: 2.5, sm: 3 },
//             bgcolor: "background.paper",
//             overflowY: 'auto',
//             flexGrow: 1,
//           }}>
//             <Grid container spacing={2.5}>
//               {/* Plan Type */}
//               <Grid item xs={12} md={6} >
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
//                     '& .MuiMenuItem-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
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
//                     '& .MuiMenuItem-root': {
//                       fontSize: { xs: '0.8rem', sm: '0.85rem' },
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
//                   value={planData.minUsers || ""}
//                   onChange={handleChange}
//                   placeholder="Minimum users"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
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
//                   value={planData.maxUsers || ""}
//                   onChange={handleChange}
//                   placeholder="Maximum users"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
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
//                   value={planData.price || ""}
//                   onChange={handleChange}
//                   placeholder="Enter price"
//                   InputProps={{ inputProps: { min: 0 } }}
//                   size="small"
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
//                       '& .MuiMenuItem-root': {
//                         fontSize: { xs: '0.8rem', sm: '0.85rem' },
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

//           {/* Footer - UserManagement style */}
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
//               onClick={onClose}
//               fullWidth={isMobile}
//               size="small"
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
//               onClick={onSubmit}
//               fullWidth={isMobile}
//               size="small"
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
//               {planData._id ? "Update" : "Create"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PlanModal;



import React, { useState } from "react";
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
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
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

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:400px)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
    if (error) setError("");
  };

  const validateForm = () => {
    if (!planData.name) {
      setError("Plan type is required");
      return false;
    }
    if (!planData.duration) {
      setError("Duration is required");
      return false;
    }
    if (!planData.description) {
      setError("Description is required");
      return false;
    }
    if (!planData.minUsers && planData.minUsers !== 0) {
      setError("Minimum users is required");
      return false;
    }
    if (!planData.maxUsers && planData.maxUsers !== 0) {
      setError("Maximum users is required");
      return false;
    }
    if (parseInt(planData.minUsers) > parseInt(planData.maxUsers)) {
      setError("Maximum users must be greater than minimum users");
      return false;
    }
    if (!planData.price && planData.price !== 0) {
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
        name: planData.name,
        duration: planData.duration,
        description: planData.description,
        minUsers: parseInt(planData.minUsers),
        maxUsers: parseInt(planData.maxUsers),
        price: parseFloat(planData.price),
      };

      let response;
      
      if (planData._id) {
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

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(response.data);
      }

      // Reset form and close modal
      setPlanData({
        name: "",
        duration: "",
        description: "",
        minUsers: "",
        maxUsers: "",
        price: "",
        status: "active",
      });
      onClose(true); // Pass true to indicate success
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
    setPlanData({
      name: "",
      duration: "",
      description: "",
      minUsers: "",
      maxUsers: "",
      price: "",
      status: "active",
    });
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
          {/* Header - UserManagement style */}
          <DialogTitle
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "white",
              py: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 2.5 },
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5 },
              flexShrink: 0,
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
              }}
            >
              {planData._id ? <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} /> : <AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
            </Avatar>
            <Box>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                fontWeight={600}
                color="white"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
              >
                {planData._id ? "Edit Plan" : "Add New Plan"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha("#ffffff", 0.8),
                  fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                {planData._id ? "Update plan details" : "Fill in the details to create a new plan"}
              </Typography>
            </Box>
          </DialogTitle>

          {/* Body - UserManagement style with proper spacing */}
          <DialogContent className="mt-2" sx={{
            p: { xs: 2, sm: 2.5 },
            pt: { xs: 2.5, sm: 3 },
            bgcolor: "background.paper",
            overflowY: 'auto',
            flexGrow: 1,
          }}>
            {/* Error Alert */}
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
                  select
                  fullWidth
                  name="name"
                  label="Plan Type"
                  value={planData.name || ""}
                  onChange={handleChange}
                  required
                  size="small"
                  disabled={loading}
                  sx={{
                     mt: 1,
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
                    '& .MuiMenuItem-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
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
                  size="small"
                  disabled={loading}
                  sx={{
                       mt: 1,
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
                    '& .MuiMenuItem-root': {
                      fontSize: { xs: '0.8rem', sm: '0.85rem' },
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

              {/* Min Users */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="minUsers"
                  label="Minimum Users"
                  value={planData.minUsers || ""}
                  onChange={handleChange}
                  placeholder="Minimum users"
                  InputProps={{ inputProps: { min: 0 } }}
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
                  value={planData.maxUsers || ""}
                  onChange={handleChange}
                  placeholder="Maximum users"
                  InputProps={{ inputProps: { min: 0 } }}
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
                  value={planData.price || ""}
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
              {planData._id && (
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    name="status"
                    label="Status"
                    value={planData.status || "active"}
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
                      '& .MuiMenuItem-root': {
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
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

          {/* Footer - UserManagement style */}
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
              disabled={loading}
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
              {loading ? (planData._id ? "Updating..." : "Creating...") : (planData._id ? "Update" : "Create")}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PlanModal;