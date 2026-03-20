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
//   Skeleton,
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

// // Search Section Skeleton
// const SearchSectionSkeleton = ({ isMobile, isSmallMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 2.5 },
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         display: "flex",
//         flexDirection: { xs: 'column', sm: 'row' },
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: { xs: 1.5, sm: 2 },
//       }}
//     >
//       <Skeleton 
//         variant="rounded" 
//         height={40} 
//         sx={{ 
//           borderRadius: { xs: 1.5, sm: 2 },
//           flex: 1,
//           width: { xs: '100%', sm: 'auto' },
//           minWidth: { xs: '100%', sm: 250 },
//           bgcolor: alpha(theme.palette.primary.main, 0.1)
//         }} 
//       />
//       <Skeleton 
//         variant="rounded" 
//         width={isSmallMobile ? '100%' : 120} 
//         height={40} 
//         sx={{ 
//           borderRadius: { xs: 1.5, sm: 2 },
//           minWidth: { xs: '100%', sm: 120 },
//           bgcolor: alpha(theme.palette.primary.main, 0.2)
//         }} 
//       />
//     </Paper>
//   );
// };

// // Mobile Card View Skeleton
// const MobileCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ p: 2 }}>
//       {[1, 2, 3].map((item) => (
//         <Card
//           key={item}
//           sx={{
//             mb: 2,
//             borderRadius: 3,
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             overflow: "hidden",
//           }}
//         >
//           {/* Card Header Skeleton */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: alpha(theme.palette.primary.main, 0.03),
//               borderBottom: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//               <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box>
//                 <Skeleton variant="text" width={120} height={24} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>
//             <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>

//           {/* Card Content Skeleton */}
//           <CardContent sx={{ p: 2 }}>
//             <Grid container spacing={1.5}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={60} height={12} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Skeleton variant="rounded" width={80} height={22} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={40} height={12} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Skeleton variant="text" width={60} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                   <Skeleton variant="text" width={60} height={12} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Skeleton variant="text" width="100%" height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </Grid>
//             </Grid>

//             {/* Actions Skeleton */}
//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
//               <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// // Desktop Table View Skeleton
// const DesktopTableSkeleton = ({ isTablet }) => {
//   const theme = useTheme();
//   return (
//     <TableContainer sx={{
//       overflowX: 'auto',
//       '&::-webkit-scrollbar': {
//         height: '6px',
//       },
//       '&::-webkit-scrollbar-thumb': {
//         backgroundColor: alpha(theme.palette.primary.main, 0.3),
//         borderRadius: '3px',
//       },
//     }}>
//       <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//         <TableHead>
//           <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//             <TableCell></TableCell>
//             <TableCell></TableCell>
//             <TableCell></TableCell>
//             <TableCell></TableCell>
//             <TableCell></TableCell>
//             <TableCell></TableCell>
//             <TableCell align="center"></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {[1, 2, 3, 4, 5].map((item, index) => (
//             <TableRow key={item} sx={{ bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02) }}>
//               <TableCell>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                   <Skeleton variant="circular" width={36} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                   <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </TableCell>
//               <TableCell>
//                 <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </TableCell>
//               <TableCell>
//                 <Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </TableCell>
//               <TableCell>
//                 <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </TableCell>
//               <TableCell>
//                 <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </TableCell>
//               <TableCell>
//                 <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </TableCell>
//               <TableCell align="center">
//                 <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
//                   <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                   <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // Header Stats Skeleton
// const HeaderStatsSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box
//       sx={{
//         p: { xs: 2, sm: 2.5, md: 3 },
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: "white",
//         display: "flex",
//         flexDirection: { xs: 'column', sm: 'row' },
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         justifyContent: "space-between",
//         gap: { xs: 1.5, sm: 2 },
//       }}
//     >
//       <Box>
//         <Skeleton variant="text" width={150} height={24} sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 1 }} />
//         <Skeleton variant="text" width={200} height={16} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//       </Box>
//       <Skeleton 
//         variant="rounded" 
//         width={100} 
//         height={36} 
//         sx={{ 
//           bgcolor: alpha("#ffffff", 0.2),
//           borderRadius: 3,
//         }} 
//       />
//     </Box>
//   );
// };

// const PlanManagement = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

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

//     // Set first render loader to false after 1 second
//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
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
//     if (planName?.includes("Enterprise")) return theme.palette.primary.main;
//     if (planName?.includes("Premium")) return "#22c55e";
//     if (planName?.includes("Standard")) return theme.palette.secondary.main;
//     return theme.palette.text.secondary;
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
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   overflow: "hidden",
//                 }}
//               >
//                 {/* Card Header */}
//                 <Box
//                   sx={{
//                     p: 2,
//                     bgcolor: alpha(getPlanColor(plan.name), 0.05),
//                     borderBottom: "1px solid",
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
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
//                       <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'text.primary' }}>
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
//                         : alpha(theme.palette.text.secondary, 0.1),
//                       color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
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
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                           Users Range
//                         </Typography>
//                         <Chip
//                           label={`${plan.minUsers} - ${plan.maxUsers}`}
//                           size="small"
//                           sx={{
//                             mt: 0.5,
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                             fontWeight: 500,
//                             fontSize: "0.65rem",
//                             height: 22,
//                           }}
//                         />
//                       </Box>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                           Price
//                         </Typography>
//                         <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: "0.9rem" }}>
//                           ₹{plan.price}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 1, borderRadius: 2 }}>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                           Description
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontSize: "0.75rem", color: 'text.primary' }}>
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
//                           color: theme.palette.primary.main,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
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
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}>
//         <Table sx={{ minWidth: isTablet ? 900 : 1000 }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Plan Details
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Users
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Description
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Price
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Duration
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Status
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { sm: '0.8rem', md: '0.9rem' } }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <AnimatePresence>
//               {filteredPlans.map((plan, index) => {
//                 const rowBg = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
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
//                         bgcolor: alpha(theme.palette.primary.main, 0.05),
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
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem' }, color: 'text.primary' }}>
//                           {plan.name}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg }}>
//                       <Chip
//                         label={`${plan.minUsers} - ${plan.maxUsers}`}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
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
//                       <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' } }}>
//                         ₹{plan.price}
//                       </Typography>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg }}>
//                       <Chip
//                         label={plan.duration}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
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
//                             : alpha(theme.palette.text.secondary, 0.1),
//                           color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
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
//                               color: theme.palette.primary.main,
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                               "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
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

//   // If first render loader is active, show skeletons for everything except title and add plan button
//   if (showFirstRenderLoader) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//           py: { xs: 2, sm: 3, md: 4 },
//           px: { xs: 1, sm: 2, md: 4 },
//         }}
//       >
//         <Container
//           maxWidth="xl"
//           disableGutters={isMobile}
//           sx={{ px: { xs: 0, sm: 0, md: 0 } }}
//         >
//           {/* Header with title and add plan button only */}
//           <Box sx={{
//             mb: { xs: 2, sm: 3, md: 4 },
//             display: 'flex',
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: 'space-between',
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             gap: 2
//           }}>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 color={theme.palette.primary.main}
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 Plan Management
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' } }}>
//                 Create and manage all subscription plans
//               </Typography>
//             </Box>
//           </Box>

//           {/* Search Section Skeleton */}
//           <SearchSectionSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

//           {/* Plans Table/Card View Skeleton */}
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 1.5, sm: 2, md: 3 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//               mt: { xs: 2, sm: 2.5, md: 3 },
//             }}
//           >
//             {/* Header Stats Skeleton */}
//             <HeaderStatsSkeleton />

//             {/* Table/Card Content Skeleton */}
//             {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
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
//                   color={theme.palette.primary.main}
//                   gutterBottom
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
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
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
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
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                   "& .MuiInputBase-input": {
//                     fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 18, sm: 20 } }} />
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
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   "&:hover": { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` },
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
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 overflow: "hidden",
//               }}
//             >
//               {/* Header */}
//               <Box
//                 sx={{
//                   p: { xs: 2, sm: 2.5, md: 3 },
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
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
//                     color: theme.palette.primary.main,
//                     fontWeight: 600,
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                     px: { xs: 1, sm: 2 },
//                     py: { xs: 1, sm: 2.5 },
//                     height: { xs: 28, sm: 32, md: 36 },
//                     "& .MuiChip-icon": {
//                       color: theme.palette.primary.main,
//                       fontSize: { xs: 12, sm: 14 },
//                     },
//                   }}
//                 />
//               </Box>

//               {/* Table/Card Content */}
//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 4, sm: 6, md: 8 } }}>
//                   <CircularProgress sx={{ color: theme.palette.primary.main }} />
//                 </Box>
//               ) : (
//                 <>
//                   {filteredPlans.length === 0 ? (
//                     <Box sx={{ textAlign: "center", py: { xs: 4, sm: 6, md: 8 } }}>
//                       <PeopleIcon sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, color: alpha(theme.palette.primary.main, 0.3), mb: 2 }} />
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
//   Skeleton,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   People as PeopleIcon,
// } from "@mui/icons-material";
// import { FaCrown, FaShieldAlt, FaUsers, FaClock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";
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

// // Search Section Skeleton - Smaller
// const SearchSectionSkeleton = ({ isMobile, isSmallMobile }) => {
//   const theme = useTheme();
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.2, sm: 1.5, md: 2 },
//         borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         display: "flex",
//         flexDirection: { xs: 'column', sm: 'row' },
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: { xs: 1.2, sm: 1.5 },
//       }}
//     >
//       <Skeleton 
//         variant="rounded" 
//         height={36} 
//         sx={{ 
//           borderRadius: { xs: 1.5, sm: 2 },
//           flex: 1,
//           width: { xs: '100%', sm: 'auto' },
//           minWidth: { xs: '100%', sm: 220 },
//           bgcolor: alpha(theme.palette.primary.main, 0.1)
//         }} 
//       />
//       <Skeleton 
//         variant="rounded" 
//         width={isSmallMobile ? '100%' : 100} 
//         height={36} 
//         sx={{ 
//           borderRadius: { xs: 1.5, sm: 2 },
//           minWidth: { xs: '100%', sm: 100 },
//           bgcolor: alpha(theme.palette.primary.main, 0.2)
//         }} 
//       />
//     </Paper>
//   );
// };

// // Mobile Card View Skeleton - Smaller
// const MobileCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ p: 1.5 }}>
//       {[1, 2, 3].map((item) => (
//         <Card
//           key={item}
//           sx={{
//             mb: 1.5,
//             borderRadius: 2,
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//             overflow: "hidden",
//           }}
//         >
//           <Box
//             sx={{
//               p: 1.5,
//               bgcolor: alpha(theme.palette.primary.main, 0.03),
//               borderBottom: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Box>
//                 <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 <Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </Box>
//             </Box>
//             <Skeleton variant="rounded" width={50} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>

//           <CardContent sx={{ p: 1.5 }}>
//             <Grid container spacing={1}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                   <Skeleton variant="text" width={50} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Skeleton variant="rounded" width={70} height={18} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                   <Skeleton variant="text" width={35} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Skeleton variant="text" width={50} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                   <Skeleton variant="text" width={50} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                   <Skeleton variant="text" width="100%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </Grid>
//             </Grid>

//             <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.8, mt: 1.5 }}>
//               <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// // Desktop Table View Skeleton - Smaller
// const DesktopTableSkeleton = ({ isTablet }) => {
//   const theme = useTheme();
//   return (
//     <TableContainer sx={{
//       overflowX: 'auto',
//       '&::-webkit-scrollbar': {
//         height: '6px',
//       },
//       '&::-webkit-scrollbar-thumb': {
//         backgroundColor: alpha(theme.palette.primary.main, 0.3),
//         borderRadius: '3px',
//       },
//     }}>
//       <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//         <TableHead>
//           <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//             <TableCell sx={{ py: 1 }}></TableCell>
//             <TableCell sx={{ py: 1 }}></TableCell>
//             <TableCell sx={{ py: 1 }}></TableCell>
//             <TableCell sx={{ py: 1 }}></TableCell>
//             <TableCell sx={{ py: 1 }}></TableCell>
//             <TableCell sx={{ py: 1 }}></TableCell>
//             <TableCell align="center" sx={{ py: 1 }}></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {[1, 2, 3, 4, 5].map((item, index) => (
//             <TableRow key={item} sx={{ bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02) }}>
//               <TableCell sx={{ py: 1 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Skeleton variant="circular" width={30} height={30} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                   <Skeleton variant="text" width={90} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ py: 1 }}>
//                 <Skeleton variant="rounded" width={70} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </TableCell>
//               <TableCell sx={{ py: 1 }}>
//                 <Skeleton variant="text" width={130} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </TableCell>
//               <TableCell sx={{ py: 1 }}>
//                 <Skeleton variant="text" width={50} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               </TableCell>
//               <TableCell sx={{ py: 1 }}>
//                 <Skeleton variant="rounded" width={60} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </TableCell>
//               <TableCell sx={{ py: 1 }}>
//                 <Skeleton variant="rounded" width={60} height={22} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               </TableCell>
//               <TableCell align="center" sx={{ py: 1 }}>
//                 <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
//                   <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                   <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// // Header Stats Skeleton - Smaller
// const HeaderStatsSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box
//       sx={{
//         p: { xs: 1.5, sm: 2, md: 2.5 },
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: "white",
//         display: "flex",
//         flexDirection: { xs: 'column', sm: 'row' },
//         alignItems: { xs: 'flex-start', sm: 'center' },
//         justifyContent: "space-between",
//         gap: { xs: 1, sm: 1.5 },
//       }}
//     >
//       <Box>
//         <Skeleton variant="text" width={130} height={22} sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }} />
//         <Skeleton variant="text" width={180} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
//       </Box>
//       <Skeleton 
//         variant="rounded" 
//         width={80} 
//         height={32} 
//         sx={{ 
//           bgcolor: alpha("#ffffff", 0.2),
//           borderRadius: 2,
//         }} 
//       />
//     </Box>
//   );
// };

// const PlanManagement = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

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

//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
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

//   const filteredPlans = plansList.filter(
//     (plan) =>
//       plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getPlanIcon = (planName) => {
//     if (planName?.includes("Enterprise")) return <FaCrown />;
//     if (planName?.includes("Premium")) return <FaShieldAlt />;
//     return <FaUsers />;
//   };

//   const getPlanColor = (planName) => {
//     if (planName?.includes("Enterprise")) return theme.palette.primary.main;
//     if (planName?.includes("Premium")) return "#22c55e";
//     if (planName?.includes("Standard")) return theme.palette.secondary.main;
//     return theme.palette.text.secondary;
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

//   // Mobile Card View Component - Smaller
//   const MobileCardView = () => {
//     return (
//       <Box sx={{ p: 1.5 }}>
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
//                   mb: 1.5,
//                   borderRadius: 2,
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   overflow: "hidden",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     p: 1.5,
//                     bgcolor: alpha(getPlanColor(plan.name), 0.05),
//                     borderBottom: "1px solid",
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Avatar
//                       sx={{
//                         width: 32,
//                         height: 32,
//                         bgcolor: alpha(getPlanColor(plan.name), 0.1),
//                         color: getPlanColor(plan.name),
//                         fontSize: "1rem",
//                       }}
//                     >
//                       {getPlanIcon(plan.name)}
//                     </Avatar>
//                     <Box>
//                       <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.85rem', color: 'text.primary' }}>
//                         {plan.name}
//                       </Typography>
//                       <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
//                         {plan.duration}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Chip
//                     label={plan.status}
//                     size="small"
//                     icon={plan.status === "active" ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
//                     sx={{
//                       bgcolor: plan.status === "active"
//                         ? alpha("#22c55e", 0.1)
//                         : alpha(theme.palette.text.secondary, 0.1),
//                       color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
//                       fontWeight: 600,
//                       fontSize: "0.6rem",
//                       height: 20,
//                     }}
//                   />
//                 </Box>

//                 <CardContent sx={{ p: 1.5 }}>
//                   <Grid container spacing={1}>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                         <Typography variant="caption" sx={{ fontSize: "0.55rem", color: 'text.secondary', display: 'block' }}>
//                           Users Range
//                         </Typography>
//                         <Chip
//                           label={`${plan.minUsers} - ${plan.maxUsers}`}
//                           size="small"
//                           sx={{
//                             mt: 0.25,
//                             bgcolor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                             fontWeight: 500,
//                             fontSize: "0.6rem",
//                             height: 18,
//                           }}
//                         />
//                       </Box>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                         <Typography variant="caption" sx={{ fontSize: "0.55rem", color: 'text.secondary', display: 'block' }}>
//                           Price
//                         </Typography>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: theme.palette.primary.main }}>
//                           ₹{plan.price}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
//                         <Typography variant="caption" sx={{ fontSize: "0.55rem", color: 'text.secondary', display: 'block' }}>
//                           Description
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontSize: "0.65rem", color: 'text.primary' }}>
//                           {plan.description}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   </Grid>

//                   <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 1.5 }}>
//                     <Tooltip title="Edit Plan">
//                       <IconButton
//                         size="small"
//                         onClick={() => handleEdit(plan)}
//                         sx={{
//                           color: theme.palette.primary.main,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           width: 28,
//                           height: 28,
//                           "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                         }}
//                       >
//                         <EditIcon sx={{ fontSize: 14 }} />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete Plan">
//                       <IconButton
//                         size="small"
//                         onClick={() => confirmDelete(plan._id)}
//                         sx={{
//                           color: "#ef4444",
//                           bgcolor: alpha("#ef4444", 0.1),
//                           width: 28,
//                           height: 28,
//                           "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
//                         }}
//                       >
//                         <DeleteIcon sx={{ fontSize: 14 }} />
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

//   // Desktop Table View - Smaller fonts
//   const DesktopTableView = () => {
//     return (
//       // <TableContainer sx={{
//       //   overflowX: 'auto',
//       //   maxHeight: { xs: '450px', sm: '550px', md: '650px' },
//       //   '&::-webkit-scrollbar': {
//       //     width: '6px',
//       //     height: '6px',
//       //   },
//       //   '&::-webkit-scrollbar-track': {
//       //     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//       //     borderRadius: '3px',
//       //   },
//       //   '&::-webkit-scrollbar-thumb': {
//       //     backgroundColor: alpha(theme.palette.primary.main, 0.3),
//       //     borderRadius: '3px',
//       //     '&:hover': {
//       //       backgroundColor: alpha(theme.palette.primary.main, 0.5),
//       //     },
//       //   },
//       //   scrollBehavior: 'smooth',
//       // }}>
//       //   <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//       //     <TableHead>
//       //       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//       //         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1 }}>
//       //           Plan Details
//       //         </TableCell>
//       //         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1 }}>
//       //           Users
//       //         </TableCell>
//       //         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1 }}>
//       //           Description
//       //         </TableCell>
//       //         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1 }}>
//       //           Price
//       //         </TableCell>
//       //         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1 }}>
//       //           Duration
//       //         </TableCell>
//       //         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1 }}>
//       //           Status
//       //         </TableCell>
//       //         <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1 }}>
//       //           Actions
//       //         </TableCell>
//       //       </TableRow>
//       //     </TableHead>
//       //     <TableBody>
//       //       <AnimatePresence>
//       //         {filteredPlans.map((plan, index) => {
//       //           const rowBg = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
//       //           return (
//       //             <TableRow
//       //               key={plan._id}
//       //               component={motion.tr}
//       //               initial={{ opacity: 0, y: 10 }}
//       //               animate={{ opacity: 1, y: 0 }}
//       //               exit={{ opacity: 0 }}
//       //               transition={{ duration: 0.3, delay: index * 0.02 }}
//       //               sx={{
//       //                 "&:hover": {
//       //                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//       //                 },
//       //               }}
//       //             >
//       //               <TableCell sx={{ bgcolor: rowBg, py: 1 }}>
//       //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       //                   <Avatar
//       //                     sx={{
//       //                       width: { xs: 24, sm: 26, md: 28 },
//       //                       height: { xs: 24, sm: 26, md: 28 },
//       //                       bgcolor: alpha(getPlanColor(plan.name), 0.1),
//       //                       color: getPlanColor(plan.name),
//       //                       fontSize: { xs: '0.7rem', sm: '0.75rem' },
//       //                     }}
//       //                   >
//       //                     {getPlanIcon(plan.name)}
//       //                   </Avatar>
//       //                   <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' }, color: 'text.primary' }}>
//       //                     {plan.name}
//       //                   </Typography>
//       //                 </Box>
//       //               </TableCell>
//       //               <TableCell sx={{ bgcolor: rowBg, py: 1 }}>
//       //                 <Chip
//       //                   label={`${plan.minUsers} - ${plan.maxUsers}`}
//       //                   size="small"
//       //                   sx={{
//       //                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//       //                     color: theme.palette.primary.main,
//       //                     fontWeight: 500,
//       //                     fontSize: { xs: '0.6rem', sm: '0.65rem' },
//       //                     height: { xs: 18, sm: 20 },
//       //                   }}
//       //                 />
//       //               </TableCell>
//       //               <TableCell sx={{ bgcolor: rowBg, py: 1 }}>
//       //                 <Typography
//       //                   // variant="body2"
//       //                   color="text.secondary"
//       //                   sx={{
//       //                     maxWidth: { xs: 100, sm: 130, md: 180 },
//       //                     fontSize: { xs: '0.6rem', sm: '0.77rem' },
//       //                     overflow: "hidden",
//       //                     textOverflow: "ellipsis",
//       //                     whiteSpace: "nowrap",
//       //                   }}
//       //                 >
//       //                   {plan.description}
//       //                 </Typography>
//       //               </TableCell>
//       //               <TableCell sx={{ bgcolor: rowBg, py: 1 }}>
//       //                 <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//       //                   ₹{plan.price}
//       //                 </Typography>
//       //               </TableCell>
//       //               <TableCell sx={{ bgcolor: rowBg, py: 1 }}>
//       //                 <Chip
//       //                   label={plan.duration}
//       //                   size="small"
//       //                   sx={{
//       //                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//       //                     color: theme.palette.primary.main,
//       //                     fontWeight: 500,
//       //                     fontSize: { xs: '0.6rem', sm: '0.65rem' },
//       //                     height: { xs: 18, sm: 20 },
//       //                   }}
//       //                 />
//       //               </TableCell>
//       //               <TableCell sx={{ bgcolor: rowBg, py: 1 }}>
//       //                 <Chip
//       //                   label={plan.status}
//       //                   size="small"
//       //                   icon={plan.status === "active" ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
//       //                   sx={{
//       //                     bgcolor: plan.status === "active"
//       //                       ? alpha("#22c55e", 0.1)
//       //                       : alpha(theme.palette.text.secondary, 0.1),
//       //                     color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
//       //                     fontWeight: 600,
//       //                     fontSize: { xs: '0.6rem', sm: '0.65rem' },
//       //                     height: { xs: 18, sm: 20 },
//       //                     gap: 0.5,
//       //                   }}
//       //                 />
//       //               </TableCell>
//       //               <TableCell align="center" sx={{ bgcolor: rowBg, py: 1 }}>
//       //                 <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
//       //                   <Tooltip title="Edit Plan">
//       //                     <IconButton
//       //                       size="small"
//       //                       onClick={() => handleEdit(plan)}
//       //                       sx={{
//       //                         color: theme.palette.primary.main,
//       //                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//       //                         width: 26,
//       //                         height: 26,
//       //                         "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//       //                       }}
//       //                     >
//       //                       <EditIcon sx={{ fontSize: 14 }} />
//       //                     </IconButton>
//       //                   </Tooltip>
//       //                   <Tooltip title="Delete Plan">
//       //                     <IconButton
//       //                       size="small"
//       //                       onClick={() => confirmDelete(plan._id)}
//       //                       sx={{
//       //                         color: "#ef4444",
//       //                         bgcolor: alpha("#ef4444", 0.1),
//       //                         width: 26,
//       //                         height: 26,
//       //                         "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
//       //                       }}
//       //                     >
//       //                       <DeleteIcon sx={{ fontSize: 14 }} />
//       //                     </IconButton>
//       //                   </Tooltip>
//       //                 </Box>
//       //               </TableCell>
//       //             </TableRow>
//       //           );
//       //         })}
//       //       </AnimatePresence>
//       //     </TableBody>
//       //   </Table>
//       // </TableContainer>
//     <TableContainer sx={{
//   overflowX: 'auto',
//   maxHeight: { xs: '450px', sm: '550px', md: '650px' },
//   '&::-webkit-scrollbar': {
//     width: '6px',
//     height: '6px',
//   },
//   '&::-webkit-scrollbar-track': {
//     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//     borderRadius: '3px',
//   },
//   '&::-webkit-scrollbar-thumb': {
//     backgroundColor: alpha(theme.palette.primary.main, 0.3),
//     borderRadius: '3px',
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.primary.main, 0.5),
//     },
//   },
//   scrollBehavior: 'smooth',
// }}>
//   <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//     <TableHead>
//       <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//           Plan Details
//         </TableCell>
//         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//           Users
//         </TableCell>
//         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//           Description
//         </TableCell>
//         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//           Price
//         </TableCell>
//         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//           Duration
//         </TableCell>
//         <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//           Status
//         </TableCell>
//         <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//           Actions
//         </TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       <AnimatePresence>
//         {filteredPlans.map((plan, index) => {
//           const rowBg = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
//           return (
//             <TableRow
//               key={plan._id}
//               component={motion.tr}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.02 }}
//               sx={{
//                 "&:hover": {
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 },
//               }}
//             >
//               <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                   <Avatar
//                     sx={{
//                       width: { xs: 28, sm: 30, md: 32 },
//                       height: { xs: 28, sm: 30, md: 32 },
//                       bgcolor: alpha(getPlanColor(plan.name), 0.1),
//                       color: getPlanColor(plan.name),
//                       fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                     }}
//                   >
//                     {getPlanIcon(plan.name)}
//                   </Avatar>
//                   <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }, color: 'text.primary' }}>
//                     {plan.name}
//                   </Typography>
//                 </Box>
//               </TableCell>
//               <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                 <Chip
//                   label={`${plan.minUsers} - ${plan.maxUsers}`}
//                   size="small"
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     fontWeight: 500,
//                     fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                     height: { xs: 22, sm: 24, md: 26 },
//                   }}
//                 />
//               </TableCell>
//               <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                 <Typography
//                   color="text.secondary"
//                   sx={{
//                     maxWidth: { xs: 120, sm: 150, md: 200 },
//                     fontSize: { xs: '0.65rem', sm: '0.77rem', md: '0.8rem' },
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   {plan.description}
//                 </Typography>
//               </TableCell>
//               <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                   ₹{plan.price}
//                 </Typography>
//               </TableCell>
//               <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                 <Chip
//                   label={plan.duration}
//                   size="small"
//                   sx={{
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     fontWeight: 500,
//                     fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                     height: { xs: 22, sm: 24, md: 26 },
//                   }}
//                 />
//               </TableCell>
//               <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                 <Chip
//                   label={plan.status}
//                   size="small"
//                   icon={plan.status === "active" ? <FaCheckCircle size={14} /> : <FaTimesCircle size={14} />}
//                   sx={{
//                     bgcolor: plan.status === "active"
//                       ? alpha("#22c55e", 0.1)
//                       : alpha(theme.palette.text.secondary, 0.1),
//                     color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
//                     fontWeight: 600,
//                     fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                     height: { xs: 22, sm: 24, md: 26 },
//                     gap: 0.5,
//                   }}
//                 />
//               </TableCell>
//               <TableCell align="center" sx={{ bgcolor: rowBg, py: 1.5 }}>
//                 <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center" }}>
//                   <Tooltip title="Edit Plan">
//                     <IconButton
//                       size="small"
//                       onClick={() => handleEdit(plan)}
//                       sx={{
//                         color: theme.palette.primary.main,
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         width: 30,
//                         height: 30,
//                         "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                       }}
//                     >
//                       <EditIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete Plan">
//                     <IconButton
//                       size="small"
//                       onClick={() => confirmDelete(plan._id)}
//                       sx={{
//                         color: "#ef4444",
//                         bgcolor: alpha("#ef4444", 0.1),
//                         width: 30,
//                         height: 30,
//                         "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
//                       }}
//                     >
//                       <DeleteIcon sx={{ fontSize: 16 }} />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           );
//         })}
//       </AnimatePresence>
//     </TableBody>
//   </Table>
// </TableContainer>
//     );
//   };

//   if (showFirstRenderLoader) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//           py: { xs: 1.5, sm: 2, md: 3 },
//           px: { xs: 1, sm: 2, md: 3 },
//         }}
//       >
//         <Container
//           maxWidth="xl"
//           disableGutters={isMobile}
//           sx={{ px: { xs: 0, sm: 0, md: 0 } }}
//         >
//           <Box sx={{
//             mb: { xs: 1.5, sm: 2, md: 3 },
//             display: 'flex',
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: 'space-between',
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             gap: 1.5
//           }}>
//             <Box>
//               <Typography
//                 variant={isMobile ? "body1" : "h6"}
//                 fontWeight="600"
//                 color={theme.palette.primary.main}
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }
//                 }}
//               >
//                 Plan Management
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                 Create and manage all subscription plans
//               </Typography>
//             </Box>
//           </Box>

//           <SearchSectionSkeleton isMobile={isMobile} isSmallMobile={isSmallMobile} />

//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//               mt: { xs: 1.5, sm: 2, md: 2.5 },
//             }}
//           >
//             <HeaderStatsSkeleton />
//             {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}
//           </Paper>
//         </Container>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
//         py: { xs: 1.5, sm: 2, md: 3 },
//         px: { xs: 1, sm: 2, md: 3 },
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
//           <motion.div variants={itemVariants}>
//             <Box sx={{
//               mb: { xs: 1.5, sm: 2, md: 3 },
//               display: 'flex',
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: 'space-between',
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               gap: 1.5
//             }}>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "body1" : "h6"}
//                   fontWeight="600"
//                   color={theme.palette.primary.main}
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }
//                   }}
//                 >
//                   Plan Management
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                   Create and manage all subscription plans
//                 </Typography>
//               </Box>
//             </Box>
//           </motion.div>

//           <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 12 : 20 }}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: { xs: 1.2, sm: 1.5, md: 2 },
//                 borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//                 border: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 display: "flex",
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 gap: { xs: 1.2, sm: 1.5 },
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
//                   minWidth: { xs: '100%', sm: 220 },
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 1.5,
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                     fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                     height: 36,
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon sx={{ fontSize: 14 }} />}
//                 onClick={handleShow}
//                 fullWidth={isMobile}
//                 size="small"
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   "&:hover": { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` },
//                   borderRadius: 1.5,
//                   px: { xs: 2, sm: 2.5 },
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                   minWidth: { xs: '100%', sm: 100 },
//                   height: 36,
//                 }}
//               >
//                 Add Plan
//               </Button>
//             </Paper>
//           </motion.div>

//           <motion.div variants={itemVariants}>
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//                 border: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 overflow: "hidden",
//               }}
//             >
//               <Box
//                 sx={{
//                   p: { xs: 1.5, sm: 2, md: 2.5 },
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   color: "white",
//                   display: "flex",
//                   flexDirection: { xs: 'column', sm: 'row' },
//                   alignItems: { xs: 'flex-start', sm: 'center' },
//                   justifyContent: "space-between",
//                   gap: { xs: 1, sm: 1.5 },
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     variant={isMobile ? "subtitle2" : "subtitle1"}
//                     fontWeight={600}
//                     color="white"
//                     sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//                   >
//                     Plans Overview
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       color: alpha("#ffffff", 0.8),
//                       fontSize: { xs: '0.6rem', sm: '0.65rem' }
//                     }}
//                   >
//                     Complete list of all subscription plans
//                   </Typography>
//                 </Box>
//                 <Chip
//                   label={`${filteredPlans.length}`}
//                   size="small"
//                   icon={<PeopleIcon sx={{ fontSize: 12 }} />}
//                   sx={{
//                     bgcolor: "white",
//                     color: theme.palette.primary.main,
//                     fontWeight: 600,
//                     fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                     height: { xs: 24, sm: 28 },
//                     "& .MuiChip-icon": {
//                       color: theme.palette.primary.main,
//                       fontSize: 12,
//                     },
//                   }}
//                 />
//               </Box>

//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, sm: 4, md: 6 } }}>
//                   <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
//                 </Box>
//               ) : (
//                 <>
//                   {filteredPlans.length === 0 ? (
//                     <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4, md: 5 } }}>
//                       <PeopleIcon sx={{ fontSize: { xs: 32, sm: 36 }, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
//                       <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
//                         No plans found
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
//                         {searchQuery ? "Try adjusting your search criteria" : "No plans available"}
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

//       <DeleteConfirmModal
//         show={showDeleteModal}
//         onHide={() => setShowDeleteModal(false)}
//         onConfirm={handleConfirmDelete}
//         title="Delete Plan"
//         message="Are you sure you want to delete this plan?"
//         subMessage="This action cannot be undone. The plan will be permanently removed."
//       />

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












////////// Update refresh and Plan Add on multpl creating 



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
} from "@mui/icons-material";
import { FaCrown, FaShieldAlt, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
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

// ... (keep all your skeleton components as they are)

const PlanManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

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
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    "Add on Plan",
  ];

  // Fetch plans on component mount
  useEffect(() => {
    fetchPlans();

    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Function to fetch plans
  const fetchPlans = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(getAllPlans()).unwrap();
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      toast.error("Failed to fetch plans");
    } finally {
      setIsRefreshing(false);
    }
  };

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

  const handleClose = (shouldRefresh = false) => {
    setShowModal(false);
    if (shouldRefresh) {
      fetchPlans(); // Refresh the plan list
    }
  };

  const handleSubmit = async () => {
    try {
      if (planData._id) {
        await dispatch(updatePlan({ planId: planData._id, updatedPlan: planData })).unwrap();
        toast.success("Plan updated successfully!");
      } else {
        await dispatch(createPlan(planData)).unwrap();
        toast.success("Plan created successfully!");
      }

      // Refresh the plan list
      await fetchPlans();

      // Close modal after successful operation
      handleClose(true);

    } catch (error) {
      const errMsg = error?.message || (planData._id ? "Failed to update plan" : "Failed to create plan");
      toast.error(errMsg);
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

  const handleConfirmDelete = async () => {
    if (deletePlanId) {
      try {
        await dispatch(deletePlan(deletePlanId)).unwrap();
        toast.success("Plan deleted successfully!");
        setShowDeleteModal(false);
        fetchPlans(); // Refresh after delete
      } catch (error) {
        toast.error("Failed to delete plan");
      }
    }
  };

  const filteredPlans = plansList.filter(
    (plan) =>
      plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPlanIcon = (planName) => {
    if (planName?.includes("Enterprise")) return <FaCrown />;
    if (planName?.includes("Premium")) return <FaShieldAlt />;
    return <FaUsers />;
  };

  const getPlanColor = (planName) => {
    if (planName?.includes("Enterprise")) return theme.palette.primary.main;
    if (planName?.includes("Premium")) return "#22c55e";
    if (planName?.includes("Standard")) return theme.palette.secondary.main;
    return theme.palette.text.secondary;
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
      <Box sx={{ p: 1.5 }}>
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
                  mb: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: alpha(getPlanColor(plan.name), 0.05),
                    borderBottom: "1px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(getPlanColor(plan.name), 0.1),
                        color: getPlanColor(plan.name),
                        fontSize: "1rem",
                      }}
                    >
                      {getPlanIcon(plan.name)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.85rem', color: 'text.primary' }}>
                        {plan.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                        {plan.duration}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={plan.status}
                    size="small"
                    icon={plan.status === "active" ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
                    sx={{
                      bgcolor: plan.status === "active"
                        ? alpha("#22c55e", 0.1)
                        : alpha(theme.palette.text.secondary, 0.1),
                      color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
                      fontWeight: 600,
                      fontSize: "0.6rem",
                      height: 20,
                    }}
                  />
                </Box>

                <CardContent sx={{ p: 1.5 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
                        <Typography variant="caption" sx={{ fontSize: "0.55rem", color: 'text.secondary', display: 'block' }}>
                          Users Range
                        </Typography>
                        <Chip
                          label={`${plan.minUsers} - ${plan.maxUsers}`}
                          size="small"
                          sx={{
                            mt: 0.25,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                            fontSize: "0.6rem",
                            height: 18,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
                        <Typography variant="caption" sx={{ fontSize: "0.55rem", color: 'text.secondary', display: 'block' }}>
                          Price
                        </Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: theme.palette.primary.main }}>
                          ₹{plan.price}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: 0.8, borderRadius: 1.5 }}>
                        <Typography variant="caption" sx={{ fontSize: "0.55rem", color: 'text.secondary', display: 'block' }}>
                          Description
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: "0.65rem", color: 'text.primary' }}>
                          {plan.description}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: 1.5 }}>
                    <Tooltip title="Edit Plan">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(plan)}
                        sx={{
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          width: 28,
                          height: 28,
                          "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Plan">
                      <IconButton
                        size="small"
                        onClick={() => confirmDelete(plan._id)}
                        sx={{
                          color: "#ef4444",
                          bgcolor: alpha("#ef4444", 0.1),
                          width: 28,
                          height: 28,
                          "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
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

  // Desktop Table View (keep your existing DesktopTableView code)
  const DesktopTableView = () => {
    return (
      <TableContainer sx={{
        overflowX: 'auto',
        maxHeight: { xs: '450px', sm: '550px', md: '650px' },
        '&::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.5),
          },
        },
        scrollBehavior: 'smooth',
      }}>
        <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
                Plan Details
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
                Users
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
                Duration
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {filteredPlans.map((plan, index) => {
                const rowBg = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
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
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                        <Avatar
                          sx={{
                            width: { xs: 28, sm: 30, md: 32 },
                            height: { xs: 28, sm: 30, md: 32 },
                            bgcolor: alpha(getPlanColor(plan.name), 0.1),
                            color: getPlanColor(plan.name),
                            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                          }}
                        >
                          {getPlanIcon(plan.name)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }, color: 'text.primary' }}>
                          {plan.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
                      <Chip
                        label={`${plan.minUsers} - ${plan.maxUsers}`}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          height: { xs: 22, sm: 24, md: 26 },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
                      <Typography
                        color="text.secondary"
                        sx={{
                          maxWidth: { xs: 120, sm: 150, md: 200 },
                          fontSize: { xs: '0.65rem', sm: '0.77rem', md: '0.8rem' },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {plan.description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
                        ₹{plan.price}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
                      <Chip
                        label={plan.duration}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          height: { xs: 22, sm: 24, md: 26 },
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
                      <Chip
                        label={plan.status}
                        size="small"
                        icon={plan.status === "active" ? <FaCheckCircle size={14} /> : <FaTimesCircle size={14} />}
                        sx={{
                          bgcolor: plan.status === "active"
                            ? alpha("#22c55e", 0.1)
                            : alpha(theme.palette.text.secondary, 0.1),
                          color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
                          fontWeight: 600,
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                          height: { xs: 22, sm: 24, md: 26 },
                          gap: 0.5,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ bgcolor: rowBg, py: 1.5 }}>
                      <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center" }}>
                        <Tooltip title="Edit Plan">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(plan)}
                            sx={{
                              color: theme.palette.primary.main,
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              width: 30,
                              height: 30,
                              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                            }}
                          >
                            <EditIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Plan">
                          <IconButton
                            size="small"
                            onClick={() => confirmDelete(plan._id)}
                            sx={{
                              color: "#ef4444",
                              bgcolor: alpha("#ef4444", 0.1),
                              width: 30,
                              height: 30,
                              "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
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

  if (showFirstRenderLoader) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          py: { xs: 1.5, sm: 2, md: 3 },
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Container
          maxWidth="xl"
          disableGutters={isMobile}
          sx={{ px: { xs: 0, sm: 0, md: 0 } }}
        >
          {/* ... your skeleton loader JSX ... */}
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        py: { xs: 1.5, sm: 2, md: 3 },
        px: { xs: 1, sm: 2, md: 3 },
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
          <motion.div variants={itemVariants}>
            <Box sx={{
              mb: { xs: 1.5, sm: 2, md: 3 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1.5
            }}>
              <Box>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  fontWeight="600"
                  color={theme.palette.primary.main}
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }
                  }}
                >
                  Plan Management
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                  Create and manage all subscription plans
                </Typography>
              </Box>
              {isRefreshing && <CircularProgress size={20} sx={{ color: theme.palette.primary.main }} />}
            </Box>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 12 : 20 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.2, sm: 1.5, md: 2 },
                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: "center",
                justifyContent: "space-between",
                gap: { xs: 1.2, sm: 1.5 },
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
                  minWidth: { xs: '100%', sm: 220 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    height: 36,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                onClick={handleShow}
                fullWidth={isMobile}
                size="small"
                disabled={isRefreshing}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  "&:hover": { background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})` },
                  borderRadius: 1.5,
                  px: { xs: 2, sm: 2.5 },
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  minWidth: { xs: '100%', sm: 100 },
                  height: 36,
                }}
              >
                Add Plan
              </Button>
            </Paper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: "white",
                  display: "flex",
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: "space-between",
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
                <Box>
                  <Typography
                    variant={isMobile ? "subtitle2" : "subtitle1"}
                    fontWeight={600}
                    color="white"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
                  >
                    Plans Overview
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha("#ffffff", 0.8),
                      fontSize: { xs: '0.6rem', sm: '0.65rem' }
                    }}
                  >
                    Complete list of all subscription plans
                  </Typography>
                </Box>
                <Chip
                  label={filteredPlans.length}
                  size="small"
                  icon={<PeopleIcon sx={{ fontSize: 12 }} />}
                  sx={{
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', sm: '0.65rem' },
                    height: { xs: 24, sm: 28 },
                    "& .MuiChip-icon": {
                      color: theme.palette.primary.main,
                      fontSize: 12,
                    },
                  }}
                />
              </Box>

              {loading || isRefreshing ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, sm: 4, md: 6 } }}>
                  <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
                </Box>
              ) : (
                <>
                  {filteredPlans.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4, md: 5 } }}>
                      <PeopleIcon sx={{ fontSize: { xs: 32, sm: 36 }, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
                      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                        No plans found
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                        {searchQuery ? "Try adjusting your search criteria" : "No plans available"}
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

      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this plan?"
        subMessage="This action cannot be undone. The plan will be permanently removed."
      />

      <PlanModal
        show={showModal}
        onClose={handleClose}
        planData={planData}
        setPlanData={setPlanData}
        planOptions={planOptions}
        durationOptions={durationOptions}
        onSuccess={fetchPlans} // Pass the refresh function
      />
    </Box>
  );
};

export default PlanManagement;
