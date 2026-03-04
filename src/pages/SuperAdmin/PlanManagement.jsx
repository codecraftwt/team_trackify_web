// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Chip,
//   IconButton,
//   Button,
//   TextField,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   alpha,
//   Avatar,
//   Tooltip,
//   Card,
//   CardContent,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   People as PeopleIcon,
//   AttachMoney as MoneyIcon,
//   Schedule as ScheduleIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Warning as WarningIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPlan,
//   deletePlan,
//   getAllPlans,
//   updatePlan,
// } from "../../redux/slices/planSlice";
// import { toast } from "react-toastify";
// import DeleteConfirmModal from "../../components/DeleteConfirmModal";
// import PlanModal from "../../components/PlanModal";

// const PlanManagement = () => {
//   const dispatch = useDispatch();
//   const { plansList = [], loading, error } = useSelector((state) => state.plan || {});

//   const [showModal, setShowModal] = useState(false);
//   const [planData, setPlanData] = useState({
//     id: null,
//     name: "",
//     description: "",
//     minUsers: "",
//     maxUsers: "",
//     price: "",
//     duration: "",
//     status: "active",
//   });
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletePlanId, setDeletePlanId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const durationOptions = [
//     "monthly",
//     "3 months",
//     "6 months",
//     "9 months",
//     "1 year",
//   ];
//   const planOptions = [
//     "Standard Plan",
//     "Premium Plan",
//     "Enterprise Plan",
//     "Custom Plan",
//     "Add on Plan",
//   ];

//   useEffect(() => {
//     dispatch(getAllPlans());
//   }, [dispatch]);

//   const handleShow = () => {
//     setPlanData({
//       id: null,
//       name: "",
//       description: "",
//       minUsers: "",
//       maxUsers: "",
//       price: "",
//       duration: "",
//       status: "active",
//     });
//     setShowModal(true);
//   };

//   const handleClose = () => setShowModal(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPlanData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (planData._id) {
//       dispatch(updatePlan({ planId: planData._id, updatedPlan: planData }))
//         .unwrap()
//         .then(() => {
//           toast.success("Plan updated successfully!");
//           handleClose();
//         })
//         .catch(() => {
//           toast.error("Failed to update plan");
//         });
//     } else {
//       dispatch(createPlan(planData))
//         .unwrap()
//         .then(() => {
//           toast.success("Plan created successfully!");
//           handleClose();
//         })
//         .catch((error) => {
//           const errMsg = error?.message || "Failed to create plan";
//           toast.error(errMsg);
//         });
//     }
//   };

//   const handleEdit = (plan) => {
//     setPlanData({
//       _id: plan._id,
//       name: plan.name,
//       description: plan.description,
//       minUsers: plan.minUsers,
//       maxUsers: plan.maxUsers,
//       price: plan.price,
//       duration: plan.duration || "monthly",
//       status: plan.status || "active",
//     });
//     setShowModal(true);
//   };

//   const confirmDelete = (id) => {
//     setDeletePlanId(id);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = () => {
//     if (deletePlanId) {
//       dispatch(deletePlan(deletePlanId))
//         .unwrap()
//         .then(() => {
//           toast.success("Plan deleted successfully!");
//           setShowDeleteModal(false);
//         })
//         .catch(() => {
//           toast.error("Failed to delete plan");
//         });
//     }
//   };

//   // Filter plans based on search
//   const filteredPlans = plansList.filter(
//     (plan) =>
//       plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getPlanIcon = (planName) => {
//     if (planName?.includes("Enterprise")) return "👑";
//     if (planName?.includes("Premium")) return "🛡️";
//     return "👥";
//   };

//   const getPlanColor = (planName) => {
//     if (planName?.includes("Enterprise")) return "#0f766e";
//     if (planName?.includes("Premium")) return "#22c55e";
//     if (planName?.includes("Standard")) return "#f59e0b";
//     return "#64748b";
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         py: 4,
//         px: { xs: 2, md: 4 },
//       }}
//     >
//       <Container maxWidth="xl">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{ mb: 4 }}>
//               <Typography
//                 variant="h4"
//                 fontWeight="800"
//                 color="#0f766e"
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 Plan Management
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Create and manage all subscription plans
//               </Typography>
//             </Box>
//           </motion.div>

//           {/* Search Section */}
//           <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2.5,
//                 borderRadius: 3,
//                 border: "1px solid",
//                 borderColor: alpha("#e2e8f0", 0.5),
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <TextField
//                 placeholder="Search plans by name or description..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 size="small"
//                 sx={{
//                   flex: 1,
//                   minWidth: 250,
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                     bgcolor: alpha("#0f766e", 0.05),
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "#0f766e" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={handleShow}
//                 sx={{
//                   bgcolor: "#0f766e",
//                   "&:hover": { bgcolor: "#0a5c55" },
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                 }}
//               >
//                 Add Plan
//               </Button>
//             </Paper>
//           </motion.div>

//           {/* Plans Table */}
//           <motion.div variants={itemVariants}>
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: 1,
//                 border: "1px solid",
//                 borderColor: alpha("#e2e8f0", 0.5),
//                 overflow: "hidden",
//               }}
//             >
//               {/* Header */}
//               <Box
//                 sx={{
//                   p: 3,
//                   background: "linear-gradient(135deg, #0f766e, #0a5c55)",
//                   color: "white",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexWrap: "wrap",
//                   gap: 2,
//                 }}
//               >
//                 <Box>
//                   <Typography variant="h6" fontWeight={600} color="white" gutterBottom>
//                     Plans Overview
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8) }}>
//                     Complete list of all subscription plans
//                   </Typography>
//                 </Box>
//                 <Chip
//                   label={`${filteredPlans.length} Results`}
//                   size="medium"
//                   icon={<PeopleIcon sx={{ fontSize: 14 }} />}
//                   sx={{
//                     bgcolor: "white",
//                     color: "#0f766e",
//                     fontWeight: 600,
//                     fontSize: "0.9rem",
//                     px: 2,
//                     py: 2.5,
//                     "& .MuiChip-icon": {
//                       color: "#0f766e",
//                     },
//                   }}
//                 />
//               </Box>

//               {/* Table */}
//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//                   <CircularProgress sx={{ color: "#0f766e" }} />
//                 </Box>
//               ) : (
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//                         <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Plan Details</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Users</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Description</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Price</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Duration</TableCell>
//                         <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Status</TableCell>
//                         <TableCell align="center" sx={{ fontWeight: 600, color: "#1e293b" }}>Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <AnimatePresence>
//                         {filteredPlans.map((plan, index) => {
//                           const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);
//                           return (
//                             <TableRow
//                               key={plan._id}
//                               component={motion.tr}
//                               initial={{ opacity: 0, y: 10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               exit={{ opacity: 0 }}
//                               transition={{ duration: 0.3, delay: index * 0.02 }}
//                               sx={{
//                                 "&:hover": {
//                                   bgcolor: alpha("#0f766e", 0.05),
//                                 },
//                               }}
//                             >
//                               <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                                   <Avatar
//                                     sx={{
//                                       width: 36,
//                                       height: 36,
//                                       bgcolor: alpha(getPlanColor(plan.name), 0.1),
//                                       color: getPlanColor(plan.name),
//                                       fontSize: "1.2rem",
//                                     }}
//                                   >
//                                     {getPlanIcon(plan.name)}
//                                   </Avatar>
//                                   <Typography variant="body2" fontWeight={600}>
//                                     {plan.name}
//                                   </Typography>
//                                 </Box>
//                               </TableCell>
//                               <TableCell sx={{ bgcolor: rowBg }}>
//                                 <Chip
//                                   label={`${plan.minUsers} - ${plan.maxUsers}`}
//                                   size="small"
//                                   sx={{
//                                     bgcolor: alpha("#64748b", 0.1),
//                                     color: "#64748b",
//                                     fontWeight: 500,
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell sx={{ bgcolor: rowBg }}>
//                                 <Typography
//                                   variant="body2"
//                                   color="text.secondary"
//                                   sx={{
//                                     maxWidth: 200,
//                                     overflow: "hidden",
//                                     textOverflow: "ellipsis",
//                                     whiteSpace: "nowrap",
//                                   }}
//                                 >
//                                   {plan.description}
//                                 </Typography>
//                               </TableCell>
//                               <TableCell sx={{ bgcolor: rowBg }}>
//                                 <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e" }}>
//                                   ₹{plan.price}
//                                 </Typography>
//                               </TableCell>
//                               <TableCell sx={{ bgcolor: rowBg }}>
//                                 <Chip
//                                   label={plan.duration}
//                                   size="small"
//                                   sx={{
//                                     bgcolor: alpha("#64748b", 0.1),
//                                     color: "#64748b",
//                                     fontWeight: 500,
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell sx={{ bgcolor: rowBg }}>
//                                 <Chip
//                                   label={plan.status}
//                                   size="small"
//                                   icon={plan.status === "active" ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <CancelIcon sx={{ fontSize: 14 }} />}
//                                   sx={{
//                                     bgcolor: plan.status === "active"
//                                       ? alpha("#22c55e", 0.1)
//                                       : alpha("#64748b", 0.1),
//                                     color: plan.status === "active" ? "#22c55e" : "#64748b",
//                                     fontWeight: 600,
//                                   }}
//                                 />
//                               </TableCell>
//                               <TableCell align="center" sx={{ bgcolor: rowBg }}>
//                                 <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
//                                   <Tooltip title="Edit Plan">
//                                     <IconButton
//                                       size="small"
//                                       onClick={() => handleEdit(plan)}
//                                       sx={{
//                                         color: "#f59e0b",
//                                         "&:hover": { bgcolor: alpha("#f59e0b", 0.1) },
//                                       }}
//                                     >
//                                       <EditIcon fontSize="small" />
//                                     </IconButton>
//                                   </Tooltip>
//                                   <Tooltip title="Delete Plan">
//                                     <IconButton
//                                       size="small"
//                                       onClick={() => confirmDelete(plan._id)}
//                                       sx={{
//                                         color: "#ef4444",
//                                         "&:hover": { bgcolor: alpha("#ef4444", 0.1) },
//                                       }}
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Tooltip>
//                                 </Box>
//                               </TableCell>
//                             </TableRow>
//                           );
//                         })}
//                       </AnimatePresence>

//                       {filteredPlans.length === 0 && (
//                         <TableRow>
//                           <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
//                             <PeopleIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
//                             <Typography variant="h6" color="text.secondary" gutterBottom>
//                               No plans found
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {searchQuery
//                                 ? "Try adjusting your search criteria"
//                                 : "No plans available"}
//                             </Typography>
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </Paper>
//           </motion.div>
//         </motion.div>
//       </Container>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onHide={() => setShowDeleteModal(false)}
//         onConfirm={handleConfirmDelete}
//         title="Delete Plan"
//         message="Are you sure you want to delete this plan?"
//         subMessage="This action cannot be undone. The plan will be permanently removed."
//       />

//       {/* Add/Edit Plan Modal */}
//       <PlanModal
//         show={showModal}
//         onClose={handleClose}
//         onSubmit={handleSubmit}
//         planData={planData}
//         setPlanData={setPlanData}
//         handleChange={handleChange}
//         planOptions={planOptions}
//         durationOptions={durationOptions}
//       />
//     </Box>
//   );
// };

// export default PlanManagement;





// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Chip,
//   IconButton,
//   Button,
//   TextField,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   alpha,
//   Avatar,
//   Tooltip,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   People as PeopleIcon,
//   AttachMoney as MoneyIcon,
//   Schedule as ScheduleIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Warning as WarningIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPlan,
//   deletePlan,
//   getAllPlans,
//   updatePlan,
// } from "../../redux/slices/planSlice";
// import { toast } from "react-toastify";
// import DeleteConfirmModal from "../../components/DeleteConfirmModal";
// import PlanModal from "../../components/PlanModal";

// const PlanManagement = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const { plansList = [], loading, error } = useSelector((state) => state.plan || {});

//   const [showModal, setShowModal] = useState(false);
//   const [planData, setPlanData] = useState({
//     id: null,
//     name: "",
//     description: "",
//     minUsers: "",
//     maxUsers: "",
//     price: "",
//     duration: "",
//     status: "active",
//   });
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deletePlanId, setDeletePlanId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const durationOptions = [
//     "monthly",
//     "3 months",
//     "6 months",
//     "9 months",
//     "1 year",
//   ];
//   const planOptions = [
//     "Standard Plan",
//     "Premium Plan",
//     "Enterprise Plan",
//     "Custom Plan",
//     "Add on Plan",
//   ];

//   useEffect(() => {
//     dispatch(getAllPlans());
//   }, [dispatch]);

//   const handleShow = () => {
//     setPlanData({
//       id: null,
//       name: "",
//       description: "",
//       minUsers: "",
//       maxUsers: "",
//       price: "",
//       duration: "",
//       status: "active",
//     });
//     setShowModal(true);
//   };

//   const handleClose = () => setShowModal(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPlanData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (planData._id) {
//       dispatch(updatePlan({ planId: planData._id, updatedPlan: planData }))
//         .unwrap()
//         .then(() => {
//           toast.success("Plan updated successfully!");
//           handleClose();
//         })
//         .catch(() => {
//           toast.error("Failed to update plan");
//         });
//     } else {
//       dispatch(createPlan(planData))
//         .unwrap()
//         .then(() => {
//           toast.success("Plan created successfully!");
//           handleClose();
//         })
//         .catch((error) => {
//           const errMsg = error?.message || "Failed to create plan";
//           toast.error(errMsg);
//         });
//     }
//   };

//   const handleEdit = (plan) => {
//     setPlanData({
//       _id: plan._id,
//       name: plan.name,
//       description: plan.description,
//       minUsers: plan.minUsers,
//       maxUsers: plan.maxUsers,
//       price: plan.price,
//       duration: plan.duration || "monthly",
//       status: plan.status || "active",
//     });
//     setShowModal(true);
//   };

//   const confirmDelete = (id) => {
//     setDeletePlanId(id);
//     setShowDeleteModal(true);
//   };

//   const handleConfirmDelete = () => {
//     if (deletePlanId) {
//       dispatch(deletePlan(deletePlanId))
//         .unwrap()
//         .then(() => {
//           toast.success("Plan deleted successfully!");
//           setShowDeleteModal(false);
//         })
//         .catch(() => {
//           toast.error("Failed to delete plan");
//         });
//     }
//   };

//   // Filter plans based on search
//   const filteredPlans = plansList.filter(
//     (plan) =>
//       plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getPlanIcon = (planName) => {
//     if (planName?.includes("Enterprise")) return "👑";
//     if (planName?.includes("Premium")) return "🛡️";
//     return "👥";
//   };

//   const getPlanColor = (planName) => {
//     if (planName?.includes("Enterprise")) return "#0f766e";
//     if (planName?.includes("Premium")) return "#22c55e";
//     if (planName?.includes("Standard")) return "#f59e0b";
//     return "#64748b";
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   // Mobile Card View Component
//   const MobileCardView = () => {
//     return (
//       <Box sx={{ p: 2 }}>
//         <AnimatePresence>
//           {filteredPlans.map((plan, index) => (
//             <motion.div
//               key={plan._id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.05 }}
//             >
//               <Card
//                 sx={{
//                   mb: 2,
//                   borderRadius: 3,
//                   border: "1px solid",
//                   borderColor: alpha("#e2e8f0", 0.5),
//                   overflow: "hidden",
//                 }}
//               >
//                 {/* Card Header */}
//                 <Box
//                   sx={{
//                     p: 2,
//                     bgcolor: alpha(getPlanColor(plan.name), 0.05),
//                     borderBottom: "1px solid",
//                     borderColor: alpha("#e2e8f0", 0.5),
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <Avatar
//                       sx={{
//                         width: 40,
//                         height: 40,
//                         bgcolor: alpha(getPlanColor(plan.name), 0.1),
//                         color: getPlanColor(plan.name),
//                         fontSize: "1.2rem",
//                       }}
//                     >
//                       {getPlanIcon(plan.name)}
//                     </Avatar>
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight={600}>
//                         {plan.name}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {plan.duration}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Chip
//                     label={plan.status}
//                     size="small"
//                     icon={plan.status === "active" ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <CancelIcon sx={{ fontSize: 14 }} />}
//                     sx={{
//                       bgcolor: plan.status === "active"
//                         ? alpha("#22c55e", 0.1)
//                         : alpha("#64748b", 0.1),
//                       color: plan.status === "active" ? "#22c55e" : "#64748b",
//                       fontWeight: 600,
//                       fontSize: "0.7rem",
//                       height: 24,
//                     }}
//                   />
//                 </Box>

//                 {/* Card Content */}
//                 <CardContent sx={{ p: 2 }}>
//                   <Grid container spacing={1.5}>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                           Users Range
//                         </Typography>
//                         <Chip
//                           label={`${plan.minUsers} - ${plan.maxUsers}`}
//                           size="small"
//                           sx={{
//                             mt: 0.5,
//                             bgcolor: alpha("#64748b", 0.1),
//                             color: "#64748b",
//                             fontWeight: 500,
//                             fontSize: "0.65rem",
//                             height: 22,
//                           }}
//                         />
//                       </Box>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                           Price
//                         </Typography>
//                         <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e", fontSize: "0.9rem" }}>
//                           ₹{plan.price}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                           Description
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
//                           {plan.description}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   </Grid>

//                   {/* Actions */}
//                   <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
//                     <Tooltip title="Edit Plan">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleEdit(plan)}
//                         sx={{
//                           color: "#f59e0b",
//                           bgcolor: alpha("#f59e0b", 0.1),
//                           "&:hover": { bgcolor: alpha("#f59e0b", 0.2) },
//                         }}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete Plan">
//                       <IconButton
//                         size="small"
//                         onClick={() => confirmDelete(plan._id)}
//                         sx={{
//                           color: "#ef4444",
//                           bgcolor: alpha("#ef4444", 0.1),
//                           "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
//                         }}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   // Desktop Table View
//   const DesktopTableView = () => {
//     return (
//       <TableContainer sx={{
//         overflowX: 'auto',
//         '&::-webkit-scrollbar': {
//           height: '6px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha('#0f766e', 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Plan Details
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Users
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Description
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Price
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Duration
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Status
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <AnimatePresence>
//               {filteredPlans.map((plan, index) => {
//                 const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);
//                 return (
//                   <TableRow
//                     key={plan._id}
//                     component={motion.tr}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.02 }}
//                     sx={{
//                       "&:hover": {
//                         bgcolor: alpha("#0f766e", 0.05),
//                       },
//                     }}
//                   >
//                     <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                         <Avatar
//                           sx={{
//                             width: { xs: 28, sm: 32, md: 36 },
//                             height: { xs: 28, sm: 32, md: 36 },
//                             bgcolor: alpha(getPlanColor(plan.name), 0.1),
//                             color: getPlanColor(plan.name),
//                             fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
//                           }}
//                         >
//                           {getPlanIcon(plan.name)}
//                         </Avatar>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
//                           {plan.name}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg }}>
//                       <Chip
//                         label={`${plan.minUsers} - ${plan.maxUsers}`}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha("#64748b", 0.1),
//                           color: "#64748b",
//                           fontWeight: 500,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           height: { xs: 20, sm: 22, md: 24 },
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg }}>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           maxWidth: { xs: 120, sm: 150, md: 200 },
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {plan.description}
//                       </Typography>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg }}>
//                       <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e", fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' } }}>
//                         ₹{plan.price}
//                       </Typography>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg }}>
//                       <Chip
//                         label={plan.duration}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha("#64748b", 0.1),
//                           color: "#64748b",
//                           fontWeight: 500,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           height: { xs: 20, sm: 22, md: 24 },
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg }}>
//                       <Chip
//                         label={plan.status}
//                         size="small"
//                         icon={plan.status === "active" ? <CheckCircleIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} /> : <CancelIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
//                         sx={{
//                           bgcolor: plan.status === "active"
//                             ? alpha("#22c55e", 0.1)
//                             : alpha("#64748b", 0.1),
//                           color: plan.status === "active" ? "#22c55e" : "#64748b",
//                           fontWeight: 600,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           height: { xs: 20, sm: 22, md: 24 },
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center" sx={{ bgcolor: rowBg }}>
//                       <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
//                         <Tooltip title="Edit Plan">
//                           <IconButton
//                             size="small"
//                             onClick={() => handleEdit(plan)}
//                             sx={{
//                               color: "#f59e0b",
//                               bgcolor: alpha("#f59e0b", 0.1),
//                               "&:hover": { bgcolor: alpha("#f59e0b", 0.2) },
//                               width: { xs: 28, sm: 32 },
//                               height: { xs: 28, sm: 32 },
//                             }}
//                           >
//                             <EditIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Plan">
//                           <IconButton
//                             size="small"
//                             onClick={() => confirmDelete(plan._id)}
//                             sx={{
//                               color: "#ef4444",
//                               bgcolor: alpha("#ef4444", 0.1),
//                               "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
//                               width: { xs: 28, sm: 32 },
//                               height: { xs: 28, sm: 32 },
//                             }}
//                           >
//                             <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </AnimatePresence>
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         py: { xs: 2, sm: 3, md: 4 },
//         px: { xs: 1, sm: 2, md: 4 },
//       }}
//     >
//       <Container
//         maxWidth="xl"
//         disableGutters={isMobile}
//         sx={{ px: { xs: 0, sm: 0, md: 0 } }}
//       >
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{
//               mb: { xs: 2, sm: 3, md: 4 },
//               display: 'flex',
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: 'space-between',
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               gap: 2
//             }}>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "h5" : "h4"}
//                   fontWeight="800"
//                   color="#0f766e"
//                   gutterBottom
//                   sx={{
//                     background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                   }}
//                 >
//                   Plan Management
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
//                   Create and manage all subscription plans
//                 </Typography>
//               </Box>
//             </Box>
//           </motion.div>

//           {/* Search Section */}
//           <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 16 : 24 }}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 1.5, sm: 2, md: 2.5 },
//                 borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                 border: "1px solid",
//                 borderColor: alpha("#e2e8f0", 0.5),
//                 display: "flex",
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: { xs: 1.5, sm: 2 },
//               }}
//             >
//               <TextField
//                 placeholder={isSmallMobile ? "Search plans..." : "Search plans by name or description..."}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 size="small"
//                 fullWidth={isMobile}
//                 sx={{
//                   flex: 1,
//                   minWidth: { xs: '100%', sm: 250 },
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: { xs: 1.5, sm: 2 },
//                     bgcolor: alpha("#0f766e", 0.05),
//                   },
//                   "& .MuiInputBase-input": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//                 onClick={handleShow}
//                 fullWidth={isMobile}
//                 size={isMobile ? "medium" : "medium"}
//                 sx={{
//                   bgcolor: "#0f766e",
//                   "&:hover": { bgcolor: "#0a5c55" },
//                   borderRadius: { xs: 1.5, sm: 2 },
//                   px: { xs: 2, sm: 3 },
//                   py: { xs: 0.8, sm: 1 },
//                   fontSize: { xs: '0.8rem', sm: '0.7rem' },
//                   minWidth: { xs: '100%', sm: 120 },
//                 }}
//               >
//                 Add Plan
//               </Button>
//             </Paper>
//           </motion.div>

//           {/* Plans Table/Card View */}
//           <motion.div variants={itemVariants}>
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 1.5, sm: 2, md: 3 },
//                 border: "1px solid",
//                 borderColor: alpha("#e2e8f0", 0.5),
//                 overflow: "hidden",
//               }}
//             >
//               {/* Header */}
//               <Box
//                 sx={{
//                   p: { xs: 2, sm: 2.5, md: 3 },
//                   background: "linear-gradient(135deg, #0f766e, #0a5c55)",
//                   color: "white",
//                   display: "flex",
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   alignItems: { xs: 'flex-start', sm: 'center' },
//                   justifyContent: "space-between",
//                   gap: { xs: 1.5, sm: 2 },
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     variant={isMobile ? "subtitle1" : "h6"}
//                     fontWeight={600}
//                     color="white"
//                     gutterBottom
//                     sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
//                   >
//                     Plans Overview
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: alpha("#ffffff", 0.8),
//                       fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
//                     }}
//                   >
//                     Complete list of all subscription plans
//                   </Typography>
//                 </Box>
//                 <Chip
//                   label={`${filteredPlans.length} ${filteredPlans.length === 1 ? 'Result' : 'Results'}`}
//                   size={isMobile ? "small" : "medium"}
//                   icon={<PeopleIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
//                   sx={{
//                     bgcolor: "white",
//                     color: "#0f766e",
//                     fontWeight: 600,
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                     px: { xs: 1, sm: 2 },
//                     py: { xs: 1, sm: 2.5 },
//                     height: { xs: 28, sm: 32, md: 36 },
//                     "& .MuiChip-icon": {
//                       color: "#0f766e",
//                       fontSize: { xs: 12, sm: 14 },
//                     },
//                   }}
//                 />
//               </Box>

//               {/* Table/Card Content */}
//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 4, sm: 6, md: 8 } }}>
//                   <CircularProgress sx={{ color: "#0f766e" }} />
//                 </Box>
//               ) : (
//                 <>
//                   {filteredPlans.length === 0 ? (
//                     <Box sx={{ textAlign: "center", py: { xs: 4, sm: 6, md: 8 } }}>
//                       <PeopleIcon sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, color: alpha("#0f766e", 0.3), mb: 2 }} />
//                       <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
//                         No plans found
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
//                         {searchQuery
//                           ? "Try adjusting your search criteria"
//                           : "No plans available"}
//                       </Typography>
//                     </Box>
//                   ) : (
//                     isMobile ? <MobileCardView /> : <DesktopTableView />
//                   )}
//                 </>
//               )}
//             </Paper>
//           </motion.div>
//         </motion.div>
//       </Container>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onHide={() => setShowDeleteModal(false)}
//         onConfirm={handleConfirmDelete}
//         title="Delete Plan"
//         message="Are you sure you want to delete this plan?"
//         subMessage="This action cannot be undone. The plan will be permanently removed."
//       />

//       {/* Add/Edit Plan Modal */}
//       <PlanModal
//         show={showModal}
//         onClose={handleClose}
//         onSubmit={handleSubmit}
//         planData={planData}
//         setPlanData={setPlanData}
//         handleChange={handleChange}
//         planOptions={planOptions}
//         durationOptions={durationOptions}
//       />
//     </Box>
//   );
// };

// export default PlanManagement;








//Skalaton Loader

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  alpha,
  Avatar,
  Tooltip,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlan,
  deletePlan,
  getAllPlans,
  updatePlan,
} from "../../redux/slices/planSlice";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import PlanModal from "../../components/PlanModal";

// Search Section Skeleton
const SearchSectionSkeleton = ({ isMobile, isSmallMobile }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2, md: 2.5 },
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
        display: "flex",
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Skeleton 
        variant="rounded" 
        height={40} 
        sx={{ 
          borderRadius: { xs: 1.5, sm: 2 },
          flex: 1,
          width: { xs: '100%', sm: 'auto' },
          minWidth: { xs: '100%', sm: 250 },
        }} 
      />
      <Skeleton 
        variant="rounded" 
        width={isSmallMobile ? '100%' : 120} 
        height={40} 
        sx={{ 
          borderRadius: { xs: 1.5, sm: 2 },
          minWidth: { xs: '100%', sm: 120 }
        }} 
      />
    </Paper>
  );
};

// Mobile Card View Skeleton
const MobileCardSkeleton = () => {
  return (
    <Box sx={{ p: 2 }}>
      {[1, 2, 3].map((item) => (
        <Card
          key={item}
          sx={{
            mb: 2,
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#e2e8f0", 0.5),
            overflow: "hidden",
          }}
        >
          {/* Card Header Skeleton */}
          <Box
            sx={{
              p: 2,
              bgcolor: alpha("#f1f5f9", 0.5),
              borderBottom: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box>
                <Skeleton variant="text" width={120} height={24} sx={{ mb: 0.5 }} />
                <Skeleton variant="text" width={80} height={16} />
              </Box>
            </Box>
            <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 3 }} />
          </Box>

          {/* Card Content Skeleton */}
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                  <Skeleton variant="text" width={60} height={12} sx={{ mb: 0.5 }} />
                  <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 3 }} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                  <Skeleton variant="text" width={40} height={12} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width={60} height={24} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                  <Skeleton variant="text" width={60} height={12} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width="100%" height={16} />
                </Box>
              </Grid>
            </Grid>

            {/* Actions Skeleton */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Desktop Table View Skeleton
const DesktopTableSkeleton = ({ isTablet }) => {
  return (
    <TableContainer sx={{
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        height: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: alpha('#0f766e', 0.3),
        borderRadius: '3px',
      },
    }}>
      <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TableRow key={item} sx={{ bgcolor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5) }}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Skeleton variant="circular" width={36} height={36} />
                  <Skeleton variant="text" width={100} height={20} />
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3 }} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={60} height={20} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: 3 }} />
              </TableCell>
              <TableCell>
                <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: 3 }} />
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Skeleton variant="circular" width={32} height={32} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Header Stats Skeleton
const HeaderStatsSkeleton = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5, md: 3 },
        background: "linear-gradient(135deg, #0f766e, #0a5c55)",
        color: "white",
        display: "flex",
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: "space-between",
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Box>
        <Skeleton variant="text" width={150} height={24} sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 1 }} />
        <Skeleton variant="text" width={200} height={16} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
      </Box>
      <Skeleton 
        variant="rounded" 
        width={100} 
        height={36} 
        sx={{ 
          bgcolor: alpha("#ffffff", 0.2),
          borderRadius: 3,
        }} 
      />
    </Box>
  );
};

const PlanManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // New state for first render loading effect (1 second)
  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

  const { plansList = [], loading, error } = useSelector((state) => state.plan || {});

  const [showModal, setShowModal] = useState(false);
  const [planData, setPlanData] = useState({
    id: null,
    name: "",
    description: "",
    minUsers: "",
    maxUsers: "",
    price: "",
    duration: "",
    status: "active",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const durationOptions = [
    "monthly",
    "3 months",
    "6 months",
    "9 months",
    "1 year",
  ];
  const planOptions = [
    "Standard Plan",
    "Premium Plan",
    "Enterprise Plan",
    "Custom Plan",
    "Add on Plan",
  ];

  useEffect(() => {
    dispatch(getAllPlans());
    
    // Set first render loader to false after 1 second
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleShow = () => {
    setPlanData({
      id: null,
      name: "",
      description: "",
      minUsers: "",
      maxUsers: "",
      price: "",
      duration: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (planData._id) {
      dispatch(updatePlan({ planId: planData._id, updatedPlan: planData }))
        .unwrap()
        .then(() => {
          toast.success("Plan updated successfully!");
          handleClose();
        })
        .catch(() => {
          toast.error("Failed to update plan");
        });
    } else {
      dispatch(createPlan(planData))
        .unwrap()
        .then(() => {
          toast.success("Plan created successfully!");
          handleClose();
        })
        .catch((error) => {
          const errMsg = error?.message || "Failed to create plan";
          toast.error(errMsg);
        });
    }
  };

  const handleEdit = (plan) => {
    setPlanData({
      _id: plan._id,
      name: plan.name,
      description: plan.description,
      minUsers: plan.minUsers,
      maxUsers: plan.maxUsers,
      price: plan.price,
      duration: plan.duration || "monthly",
      status: plan.status || "active",
    });
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeletePlanId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletePlanId) {
      dispatch(deletePlan(deletePlanId))
        .unwrap()
        .then(() => {
          toast.success("Plan deleted successfully!");
          setShowDeleteModal(false);
        })
        .catch(() => {
          toast.error("Failed to delete plan");
        });
    }
  };

  // Filter plans based on search
  const filteredPlans = plansList.filter(
    (plan) =>
      plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPlanIcon = (planName) => {
    if (planName?.includes("Enterprise")) return "👑";
    if (planName?.includes("Premium")) return "🛡️";
    return "👥";
  };

  const getPlanColor = (planName) => {
    if (planName?.includes("Enterprise")) return "#0f766e";
    if (planName?.includes("Premium")) return "#22c55e";
    if (planName?.includes("Standard")) return "#f59e0b";
    return "#64748b";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Mobile Card View Component
  const MobileCardView = () => {
    return (
      <Box sx={{ p: 2 }}>
        <AnimatePresence>
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: alpha("#e2e8f0", 0.5),
                  overflow: "hidden",
                }}
              >
                {/* Card Header */}
                <Box
                  sx={{
                    p: 2,
                    bgcolor: alpha(getPlanColor(plan.name), 0.05),
                    borderBottom: "1px solid",
                    borderColor: alpha("#e2e8f0", 0.5),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: alpha(getPlanColor(plan.name), 0.1),
                        color: getPlanColor(plan.name),
                        fontSize: "1.2rem",
                      }}
                    >
                      {getPlanIcon(plan.name)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {plan.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {plan.duration}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={plan.status}
                    size="small"
                    icon={plan.status === "active" ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <CancelIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      bgcolor: plan.status === "active"
                        ? alpha("#22c55e", 0.1)
                        : alpha("#64748b", 0.1),
                      color: plan.status === "active" ? "#22c55e" : "#64748b",
                      fontWeight: 600,
                      fontSize: "0.7rem",
                      height: 24,
                    }}
                  />
                </Box>

                {/* Card Content */}
                <CardContent sx={{ p: 2 }}>
                  <Grid container spacing={1.5}>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                          Users Range
                        </Typography>
                        <Chip
                          label={`${plan.minUsers} - ${plan.maxUsers}`}
                          size="small"
                          sx={{
                            mt: 0.5,
                            bgcolor: alpha("#64748b", 0.1),
                            color: "#64748b",
                            fontWeight: 500,
                            fontSize: "0.65rem",
                            height: 22,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                          Price
                        </Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e", fontSize: "0.9rem" }}>
                          ₹{plan.price}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ bgcolor: alpha("#f1f5f9", 0.5), p: 1, borderRadius: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                          {plan.description}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Actions */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
                    <Tooltip title="Edit Plan">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(plan)}
                        sx={{
                          color: "#f59e0b",
                          bgcolor: alpha("#f59e0b", 0.1),
                          "&:hover": { bgcolor: alpha("#f59e0b", 0.2) },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Plan">
                      <IconButton
                        size="small"
                        onClick={() => confirmDelete(plan._id)}
                        sx={{
                          color: "#ef4444",
                          bgcolor: alpha("#ef4444", 0.1),
                          "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    );
  };

  // Desktop Table View
  const DesktopTableView = () => {
    return (
      <TableContainer sx={{
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha('#0f766e', 0.3),
          borderRadius: '3px',
        },
      }}>
        <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
              <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
                Plan Details
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
                Users
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
                Duration
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: "#1e293b", fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {filteredPlans.map((plan, index) => {
                const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);
                return (
                  <TableRow
                    key={plan._id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    sx={{
                      "&:hover": {
                        bgcolor: alpha("#0f766e", 0.05),
                      },
                    }}
                  >
                    <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: { xs: 28, sm: 32, md: 36 },
                            height: { xs: 28, sm: 32, md: 36 },
                            bgcolor: alpha(getPlanColor(plan.name), 0.1),
                            color: getPlanColor(plan.name),
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                          }}
                        >
                          {getPlanIcon(plan.name)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' } }}>
                          {plan.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg }}>
                      <Chip
                        label={`${plan.minUsers} - ${plan.maxUsers}`}
                        size="small"
                        sx={{
                          bgcolor: alpha("#64748b", 0.1),
                          color: "#64748b",
                          fontWeight: 500,
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          height: { xs: 20, sm: 22, md: 24 },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: { xs: 120, sm: 150, md: 200 },
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {plan.description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e", fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' } }}>
                        ₹{plan.price}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg }}>
                      <Chip
                        label={plan.duration}
                        size="small"
                        sx={{
                          bgcolor: alpha("#64748b", 0.1),
                          color: "#64748b",
                          fontWeight: 500,
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          height: { xs: 20, sm: 22, md: 24 },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg }}>
                      <Chip
                        label={plan.status}
                        size="small"
                        icon={plan.status === "active" ? <CheckCircleIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} /> : <CancelIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />}
                        sx={{
                          bgcolor: plan.status === "active"
                            ? alpha("#22c55e", 0.1)
                            : alpha("#64748b", 0.1),
                          color: plan.status === "active" ? "#22c55e" : "#64748b",
                          fontWeight: 600,
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          height: { xs: 20, sm: 22, md: 24 },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: rowBg }}>
                      <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                        <Tooltip title="Edit Plan">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(plan)}
                            sx={{
                              color: "#f59e0b",
                              bgcolor: alpha("#f59e0b", 0.1),
                              "&:hover": { bgcolor: alpha("#f59e0b", 0.2) },
                              width: { xs: 28, sm: 32 },
                              height: { xs: 28, sm: 32 },
                            }}
                          >
                            <EditIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Plan">
                          <IconButton
                            size="small"
                            onClick={() => confirmDelete(plan._id)}
                            sx={{
                              color: "#ef4444",
                              bgcolor: alpha("#ef4444", 0.1),
                              "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
                              width: { xs: 28, sm: 32 },
                              height: { xs: 28, sm: 32 },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // If first render loader is active, show skeletons for everything except title and add plan button
  if (showFirstRenderLoader) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters={isMobile}
          sx={{ px: { xs: 0, sm: 0, md: 0 } }}
        >
          {/* Header with title and add plan button only */}
          <Box sx={{
            mb: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2
          }}>
            <Box>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                fontWeight="800"
                color="#0f766e"
                gutterBottom
                sx={{
                  background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                }}
              >
                Plan Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
                Create and manage all subscription plans
              </Typography>
            </Box>
          </Box>

          {/* Search Section Skeleton */}
          <SearchSectionSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

          {/* Plans Table/Card View Skeleton */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 1.5, sm: 2, md: 3 },
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              overflow: "hidden",
              mt: { xs: 2, sm: 2.5, md: 3 },
            }}
          >
            {/* Header Stats Skeleton */}
            <HeaderStatsSkeleton />

            {/* Table/Card Content Skeleton */}
            {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters={isMobile}
        sx={{ px: { xs: 0, sm: 0, md: 0 } }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{
              mb: { xs: 2, sm: 3, md: 4 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2
            }}>
              <Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight="800"
                  color="#0f766e"
                  gutterBottom
                  sx={{
                    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                  }}
                >
                  Plan Management
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
                  Create and manage all subscription plans
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Search Section */}
          <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 16 : 24 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2, md: 2.5 },
                borderRadius: { xs: 2, sm: 2.5, md: 3 },
                border: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                display: "flex",
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: "center",
                justifyContent: "space-between",
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <TextField
                placeholder={isSmallMobile ? "Search plans..." : "Search plans by name or description..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                fullWidth={isMobile}
                sx={{
                  flex: 1,
                  minWidth: { xs: '100%', sm: 250 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: { xs: 1.5, sm: 2 },
                    bgcolor: alpha("#0f766e", 0.05),
                  },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                onClick={handleShow}
                fullWidth={isMobile}
                size={isMobile ? "medium" : "medium"}
                sx={{
                  bgcolor: "#0f766e",
                  "&:hover": { bgcolor: "#0a5c55" },
                  borderRadius: { xs: 1.5, sm: 2 },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 0.8, sm: 1 },
                  fontSize: { xs: '0.8rem', sm: '0.7rem' },
                  minWidth: { xs: '100%', sm: 120 },
                }}
              >
                Add Plan
              </Button>
            </Paper>
          </motion.div>

          {/* Plans Table/Card View */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: { xs: 1.5, sm: 2, md: 3 },
                border: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  background: "linear-gradient(135deg, #0f766e, #0a5c55)",
                  color: "white",
                  display: "flex",
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: "space-between",
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                <Box>
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    fontWeight={600}
                    color="white"
                    gutterBottom
                    sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}
                  >
                    Plans Overview
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha("#ffffff", 0.8),
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
                    }}
                  >
                    Complete list of all subscription plans
                  </Typography>
                </Box>
                <Chip
                  label={`${filteredPlans.length} ${filteredPlans.length === 1 ? 'Result' : 'Results'}`}
                  size={isMobile ? "small" : "medium"}
                  icon={<PeopleIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                  sx={{
                    bgcolor: "white",
                    color: "#0f766e",
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                    px: { xs: 1, sm: 2 },
                    py: { xs: 1, sm: 2.5 },
                    height: { xs: 28, sm: 32, md: 36 },
                    "& .MuiChip-icon": {
                      color: "#0f766e",
                      fontSize: { xs: 12, sm: 14 },
                    },
                  }}
                />
              </Box>

              {/* Table/Card Content */}
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 4, sm: 6, md: 8 } }}>
                  <CircularProgress sx={{ color: "#0f766e" }} />
                </Box>
              ) : (
                <>
                  {filteredPlans.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: { xs: 4, sm: 6, md: 8 } }}>
                      <PeopleIcon sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, color: alpha("#0f766e", 0.3), mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' } }}>
                        No plans found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
                        {searchQuery
                          ? "Try adjusting your search criteria"
                          : "No plans available"}
                      </Typography>
                    </Box>
                  ) : (
                    isMobile ? <MobileCardView /> : <DesktopTableView />
                  )}
                </>
              )}
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this plan?"
        subMessage="This action cannot be undone. The plan will be permanently removed."
      />

      {/* Add/Edit Plan Modal */}
      <PlanModal
        show={showModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        planData={planData}
        setPlanData={setPlanData}
        handleChange={handleChange}
        planOptions={planOptions}
        durationOptions={durationOptions}
      />
    </Box>
  );
};

export default PlanManagement;