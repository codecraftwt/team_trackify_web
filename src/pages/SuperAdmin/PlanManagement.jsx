
// Simple List view 

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
//   Menu,
//   MenuItem,
//   TableSortLabel,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   People as PeopleIcon,
//   Sort as SortIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { FaCrown, FaShieldAlt, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPlan,
//   deletePlan,
//   getAllPlans,
//   updatePlan,
// } from "../../redux/slices/planSlice";
// import { toast, ToastContainer } from "react-toastify";
// import DeleteConfirmModal from "../../components/DeleteConfirmModal";
// import PlanModal from "../../components/PlanModal";

// // Mobile Card View Skeleton
// const MobileCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ p: 1.5 }}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: 1.5,
//             mb: 1.5,
//             borderRadius: 2,
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
//             <Skeleton variant="rounded" width={100} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="rounded" width={60} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>
//           <Skeleton variant="text" width="80%" height={16} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// // Desktop Table View Skeleton
// const DesktopTableSkeleton = ({ isTablet }) => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ width: '100%', overflowX: 'auto' }}>
//       <Box sx={{ minWidth: isTablet ? 800 : 900 }}>
//         <Box sx={{ 
//           display: 'flex', 
//           bgcolor: alpha(theme.palette.primary.main, 0.05),
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           py: 1.5,
//           px: 1.5,
//         }}>
//           <Box sx={{ flex: 2 }}><Skeleton variant="text" width={100} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 3 }}><Skeleton variant="text" width={150} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//         </Box>
//         {[1, 2, 3, 4, 5].map((item) => (
//           <Box key={item} sx={{ display: 'flex', py: 1.5, px: 1.5, borderBottom: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
//             <Box sx={{ flex: 2 }}><Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={70} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 3 }}><Skeleton variant="text" width={200} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="text" width={50} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={80} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={70} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={80} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// // Header Stats Skeleton
// const HeaderStatsSkeleton = ({ isMobile }) => {
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
//         width={90} 
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
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Sorting states
//   const [sortField, setSortField] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [sortAnchorEl, setSortAnchorEl] = useState(null);

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
//     "Add on Plan",
//   ];

//   // Fetch plans on component mount
//   useEffect(() => {
//     fetchPlans();

//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Function to fetch plans
//   const fetchPlans = async () => {
//     setIsRefreshing(true);
//     try {
//       await dispatch(getAllPlans()).unwrap();
//     } catch (error) {
//       console.error("Failed to fetch plans:", error);
//       toast.error("Failed to fetch plans");
//     } finally {
//       setIsRefreshing(false);
//     }
//   };

//   // Sort menu handlers
//   const handleSortClick = (event) => {
//     setSortAnchorEl(event.currentTarget);
//   };

//   const handleSortClose = () => {
//     setSortAnchorEl(null);
//   };

//   const handleSortChange = (field, order) => {
//     setSortField(field);
//     setSortOrder(order);
//     handleSortClose();
//   };

//   const getSortButtonText = () => {
//     const fieldMap = {
//       name: "Name",
//       price: "Price",
//       users: "Users Range",
//       duration: "Duration",
//       status: "Status",
//       createdAt: "Created Date",
//     };
//     const orderText = sortOrder === "asc" ? "↑ Asc" : "↓ Desc";
//     return `${fieldMap[sortField] || "Sort"} ${orderText}`;
//   };

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

//   const handleClose = (shouldRefresh = false) => {
//     setShowModal(false);
//     if (shouldRefresh) {
//       fetchPlans(); // Refresh the plan list
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (planData._id) {
//         await dispatch(updatePlan({ planId: planData._id, updatedPlan: planData })).unwrap();
//         toast.success("Plan updated successfully!");
//       } else {
//         await dispatch(createPlan(planData)).unwrap();
//         toast.success("Plan created successfully!");
//       }

//       // Refresh the plan list
//       await fetchPlans();

//       // Close modal after successful operation
//       handleClose(true);

//     } catch (error) {
//       const errMsg = error?.message || (planData._id ? "Failed to update plan" : "Failed to create plan");
//       toast.error(errMsg);
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

//   const handleConfirmDelete = async () => {
//     if (deletePlanId) {
//       try {
//         await dispatch(deletePlan(deletePlanId)).unwrap();
//         // toast.success("Plan deleted successfully!");
//         setShowDeleteModal(false);
//         fetchPlans(); // Refresh after delete
//       } catch (error) {
//         toast.error("Failed to delete plan");
//       }
//     }
//   };

//   // Filter and sort plans
//   const filteredAndSortedPlans = [...plansList]
//     .filter(
//       (plan) =>
//         plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       let aVal, bVal;

//       switch (sortField) {
//         case "name":
//           aVal = a.name?.toLowerCase() || "";
//           bVal = b.name?.toLowerCase() || "";
//           break;
//         case "price":
//           aVal = a.price || 0;
//           bVal = b.price || 0;
//           break;
//         case "users":
//           aVal = a.minUsers || 0;
//           bVal = b.minUsers || 0;
//           break;
//         case "duration":
//           const durationOrder = {
//             "monthly": 1,
//             "3 months": 2,
//             "6 months": 3,
//             "9 months": 4,
//             "1 year": 5,
//             "yearly": 5
//           };
//           aVal = durationOrder[a.duration] || 999;
//           bVal = durationOrder[b.duration] || 999;
//           break;
//         case "status":
//           const statusOrder = {
//             "active": 1,
//             "inactive": 2,
//             "pending": 3
//           };
//           aVal = statusOrder[a.status] || 999;
//           bVal = statusOrder[b.status] || 999;
//           break;
//         case "createdAt":
//           aVal = new Date(a.createdAt).getTime();
//           bVal = new Date(b.createdAt).getTime();
//           break;
//         default:
//           aVal = a.name?.toLowerCase() || "";
//           bVal = b.name?.toLowerCase() || "";
//       }

//       if (sortOrder === "asc") {
//         return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
//       } else {
//         return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
//       }
//     });

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

//   // Mobile Card View Component
//   const MobileCardView = () => {
//     return (
//       <Box sx={{ p: 1.5 }}>
//         <AnimatePresence>
//           {filteredAndSortedPlans.map((plan, index) => (
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

//   // Desktop Table View with Sortable Headers
//   const DesktopTableView = () => {
//     return (
//       <TableContainer sx={{
//         overflowX: 'auto',
//         maxHeight: { xs: '450px', sm: '550px', md: '650px' },
//         '&::-webkit-scrollbar': {
//           width: '6px',
//           height: '6px',
//         },
//         '&::-webkit-scrollbar-track': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.1),
//           borderRadius: '3px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//           '&:hover': {
//             backgroundColor: alpha(theme.palette.primary.main, 0.5),
//           },
//         },
//         scrollBehavior: 'smooth',
//       }}>
//         <Table sx={{ minWidth: isTablet ? 800 : 900 }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//                 <TableSortLabel
//                   active={sortField === "name"}
//                   direction={sortField === "name" ? (sortOrder === "asc" ? "asc" : "desc") : "asc"}
//                   onClick={() => {
//                     if (sortField === "name") {
//                       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//                     } else {
//                       setSortField("name");
//                       setSortOrder("asc");
//                     }
//                   }}
//                 >
//                   Plan Details
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//                 <TableSortLabel
//                   active={sortField === "users"}
//                   direction={sortField === "users" ? (sortOrder === "asc" ? "asc" : "desc") : "asc"}
//                   onClick={() => {
//                     if (sortField === "users") {
//                       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//                     } else {
//                       setSortField("users");
//                       setSortOrder("asc");
//                     }
//                   }}
//                 >
//                   Users
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//                 Description
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//                 <TableSortLabel
//                   active={sortField === "price"}
//                   direction={sortField === "price" ? (sortOrder === "asc" ? "asc" : "desc") : "asc"}
//                   onClick={() => {
//                     if (sortField === "price") {
//                       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//                     } else {
//                       setSortField("price");
//                       setSortOrder("asc");
//                     }
//                   }}
//                 >
//                   Price
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//                 <TableSortLabel
//                   active={sortField === "duration"}
//                   direction={sortField === "duration" ? (sortOrder === "asc" ? "asc" : "desc") : "asc"}
//                   onClick={() => {
//                     if (sortField === "duration") {
//                       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//                     } else {
//                       setSortField("duration");
//                       setSortOrder("asc");
//                     }
//                   }}
//                 >
//                   Duration
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//                 <TableSortLabel
//                   active={sortField === "status"}
//                   direction={sortField === "status" ? (sortOrder === "asc" ? "asc" : "desc") : "asc"}
//                   onClick={() => {
//                     if (sortField === "status") {
//                       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//                     } else {
//                       setSortField("status");
//                       setSortOrder("asc");
//                     }
//                   }}
//                 >
//                   Status
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem' }, py: 1.5 }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <AnimatePresence>
//               {filteredAndSortedPlans.map((plan, index) => {
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
//                     <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
//                         <Avatar
//                           sx={{
//                             width: { xs: 28, sm: 30, md: 32 },
//                             height: { xs: 28, sm: 30, md: 32 },
//                             bgcolor: alpha(getPlanColor(plan.name), 0.1),
//                             color: getPlanColor(plan.name),
//                             fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
//                           }}
//                         >
//                           {getPlanIcon(plan.name)}
//                         </Avatar>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }, color: 'text.primary' }}>
//                           {plan.name}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                       <Chip
//                         label={`${plan.minUsers} - ${plan.maxUsers}`}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontWeight: 500,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           height: { xs: 22, sm: 24, md: 26 },
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                       <Typography
//                         color="text.secondary"
//                         sx={{
//                           maxWidth: { xs: 120, sm: 150, md: 200 },
//                           fontSize: { xs: '0.65rem', sm: '0.77rem', md: '0.8rem' },
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         {plan.description}
//                       </Typography>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                       <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
//                         ₹{plan.price}
//                       </Typography>
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                       <Chip
//                         label={plan.duration}
//                         size="small"
//                         sx={{
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontWeight: 500,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           height: { xs: 22, sm: 24, md: 26 },
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ bgcolor: rowBg, py: 1.5 }}>
//                       <Chip
//                         label={plan.status}
//                         size="small"
//                         icon={plan.status === "active" ? <FaCheckCircle size={14} /> : <FaTimesCircle size={14} />}
//                         sx={{
//                           bgcolor: plan.status === "active"
//                             ? alpha("#22c55e", 0.1)
//                             : alpha(theme.palette.text.secondary, 0.1),
//                           color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
//                           fontWeight: 600,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                           height: { xs: 22, sm: 24, md: 26 },
//                           gap: 0.5,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell align="center" sx={{ bgcolor: rowBg, py: 1.5 }}>
//                       <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center" }}>
//                         <Tooltip title="Edit Plan">
//                           <IconButton
//                             size="small"
//                             onClick={() => handleEdit(plan)}
//                             sx={{
//                               color: theme.palette.primary.main,
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                               width: 30,
//                               height: 30,
//                               "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                             }}
//                           >
//                             <EditIcon sx={{ fontSize: 16 }} />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete Plan">
//                           <IconButton
//                             size="small"
//                             onClick={() => confirmDelete(plan._id)}
//                             sx={{
//                               color: "#ef4444",
//                               bgcolor: alpha("#ef4444", 0.1),
//                               width: 30,
//                               height: 30,
//                               "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
//                             }}
//                           >
//                             <DeleteIcon sx={{ fontSize: 16 }} />
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

//   // First render loader
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
//         <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
//           <Box sx={{
//             display: "flex",
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between",
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             mb: { xs: 1.5, sm: 2, md: 3 },
//             gap: 1.5
//           }}>
//             <Box>
//               <Skeleton variant="text" width={180} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="text" width={250} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mt: 0.5 }} />
//             </Box>
//           </Box>

//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 1.2, sm: 1.5, md: 2 },
//               borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               mb: { xs: 1.5, sm: 2, md: 3 },
//             }}
//           >
//             <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
//               <Skeleton variant="rounded" height={36} sx={{ flex: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="rounded" width={130} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="rounded" width={100} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Box>
//           </Paper>

//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//             }}
//           >
//             <HeaderStatsSkeleton isMobile={isMobile} />
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
//       <ToastContainer 
//             position="top-right"
//             autoClose={3000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//             style={{ zIndex: 9999 }}
//         />

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
//                   fontWeight="800"
//                   color={theme.palette.primary.main}
//                   gutterBottom
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
//                   }}
//                 >
//                   Plan Management
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
//                   Create and manage all subscription plans
//                 </Typography>
//               </Box>
//               {isRefreshing && <CircularProgress size={20} sx={{ color: theme.palette.primary.main }} />}
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
//                 flexWrap: "wrap",
//               }}
//             >
//               {/* Search Input */}
//               <TextField
//                 placeholder={isSmallMobile ? "Search plans..." : "Search plans by name or description..."}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 size="small"
//                 fullWidth={isMobile}
//                 sx={{
//                   flex: 2,
//                   minWidth: { xs: '100%', sm: 250 },
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
//                   endAdornment: searchQuery && (
//                     <InputAdornment position="end">
//                       <IconButton
//                         size="small"
//                         onClick={() => setSearchQuery("")}
//                         edge="end"
//                         sx={{ p: 0.5 }}
//                       >
//                         <ClearIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               {/* Sort Button */}
//               <Button
//                 variant="outlined"
//                 onClick={handleSortClick}
//                 startIcon={<SortIcon sx={{ fontSize: 16 }} />}
//                 endIcon={sortOrder === "asc" ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
//                 size="small"
//                 fullWidth={isMobile}
//                 sx={{
//                   minWidth: { xs: '100%', sm: 150 },
//                   height: 36,
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   color: theme.palette.primary.main,
//                   fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//               >
//                 {getSortButtonText()}
//               </Button>

//               {/* Sort Menu */}
//               <Menu
//                 anchorEl={sortAnchorEl}
//                 open={Boolean(sortAnchorEl)}
//                 onClose={handleSortClose}
//                 PaperProps={{
//                   sx: {
//                     mt: 0.5,
//                     borderRadius: 2,
//                     minWidth: 200,
//                     boxShadow: theme.shadows[4],
//                     border: '1px solid',
//                     borderColor: alpha(theme.palette.primary.main, 0.1),
//                     overflow: 'hidden',
//                   }
//                 }}
//               >
//                 <MenuItem 
//                   onClick={() => handleSortChange("name", "asc")}
//                   selected={sortField === "name" && sortOrder === "asc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Name (A-Z)</span>
//                     <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("name", "desc")}
//                   selected={sortField === "name" && sortOrder === "desc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Name (Z-A)</span>
//                     <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("price", "asc")}
//                   selected={sortField === "price" && sortOrder === "asc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Price (Lowest First)</span>
//                     <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("price", "desc")}
//                   selected={sortField === "price" && sortOrder === "desc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Price (Highest First)</span>
//                     <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("users", "asc")}
//                   selected={sortField === "users" && sortOrder === "asc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Users (Smallest First)</span>
//                     <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("users", "desc")}
//                   selected={sortField === "users" && sortOrder === "desc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Users (Largest First)</span>
//                     <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("duration", "asc")}
//                   selected={sortField === "duration" && sortOrder === "asc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Duration (Shortest First)</span>
//                     <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("duration", "desc")}
//                   selected={sortField === "duration" && sortOrder === "desc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Duration (Longest First)</span>
//                     <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("status", "asc")}
//                   selected={sortField === "status" && sortOrder === "asc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Status (Active First)</span>
//                     <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("status", "desc")}
//                   selected={sortField === "status" && sortOrder === "desc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Status (Inactive First)</span>
//                     <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("createdAt", "desc")}
//                   selected={sortField === "createdAt" && sortOrder === "desc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Created Date (Newest First)</span>
//                     <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleSortChange("createdAt", "asc")}
//                   selected={sortField === "createdAt" && sortOrder === "asc"}
//                   sx={{
//                     fontSize: '0.75rem',
//                     py: 1,
//                     '&.Mui-selected': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//                     <span>Created Date (Oldest First)</span>
//                     <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
//                   </Box>
//                 </MenuItem>
//               </Menu>

//               {/* Add Plan Button */}
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon sx={{ fontSize: 14 }} />}
//                 onClick={handleShow}
//                 fullWidth={isMobile}
//                 size="small"
//                 disabled={isRefreshing}
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
//                     Sorted by {getSortButtonText()} • {filteredAndSortedPlans.length} plans found
//                   </Typography>
//                 </Box>
//                 <Chip
//                   label={filteredAndSortedPlans.length}
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

//               {loading || isRefreshing ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, sm: 4, md: 6 } }}>
//                   <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
//                 </Box>
//               ) : (
//                 <>
//                   {filteredAndSortedPlans.length === 0 ? (
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
//         planData={planData}
//         setPlanData={setPlanData}
//         planOptions={planOptions}
//         durationOptions={durationOptions}
//         onSuccess={fetchPlans}
//       />
//     </Box>
//   );
// };

// export default PlanManagement;


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
  Menu,
  MenuItem,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Clear as ClearIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
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
import { toast, ToastContainer } from "react-toastify";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import PlanModal from "../../components/PlanModal";
import moment from "moment";
import BasePriceDialog from "../../pages/SuperAdmin/BasePriceDialog";

// Mobile Card View Skeleton
const MobileCardSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
      {[1, 2, 3].map((item) => (
        <Paper
          key={item}
          elevation={0}
          sx={{
            p: { xs: 1, sm: 1.5 },
            mb: { xs: 1, sm: 1.5 },
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Skeleton variant="rounded" width={100} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="rounded" width={60} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          </Box>
          <Skeleton variant="text" width="80%" height={16} sx={{ mb: 1, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          <Skeleton variant="text" width="60%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
        </Paper>
      ))}
    </Box>
  );
};

// Desktop Table View Skeleton
const DesktopTableSkeleton = ({ isTablet }) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: isTablet ? 800 : 900 }}>
        <Box sx={{
          display: 'flex',
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          py: { xs: 1, sm: 1.5 },
          px: { xs: 1, sm: 1.5 },
        }}>
          <Box sx={{ flex: 2 }}><Skeleton variant="text" width={100} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 3 }}><Skeleton variant="text" width={150} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={60} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
        </Box>
        {[1, 2, 3, 4, 5].map((item) => (
          <Box key={item} sx={{ display: 'flex', py: { xs: 1, sm: 1.5 }, px: { xs: 1, sm: 1.5 }, borderBottom: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
            <Box sx={{ flex: 2 }}><Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={70} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 3 }}><Skeleton variant="text" width={200} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="text" width={50} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={80} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={70} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={80} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Header Stats Skeleton
const HeaderStatsSkeleton = ({ isMobile }) => {
  const theme = useTheme();
  return (
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
        <Skeleton variant="text" width={130} height={22} sx={{ bgcolor: alpha("#ffffff", 0.2), mb: 0.5 }} />
        <Skeleton variant="text" width={180} height={14} sx={{ bgcolor: alpha("#ffffff", 0.2) }} />
      </Box>
      <Skeleton
        variant="rounded"
        width={90}
        height={32}
        sx={{
          bgcolor: alpha("#ffffff", 0.2),
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

const PlanManagement = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
  const [viewMode, setViewMode] = useState('list');

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

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortAnchorEl, setSortAnchorEl] = useState(null);

  // ── Custom Plan Base Price state ──────────────────────────────────────────
  const [basePriceDialogOpen, setBasePriceDialogOpen] = useState(false);
  const [basePriceData, setBasePriceData] = useState(null);
  const [basePriceLoading, setBasePriceLoading] = useState(false);
  const [newBasePrice, setNewBasePrice] = useState('');
  const [basePriceSaving, setBasePriceSaving] = useState(false);
  const [basePriceError, setBasePriceError] = useState('');
  // ─────────────────────────────────────────────────────────────────────────

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

  useEffect(() => {
    fetchPlans();
    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

  // ── Base Price helpers ────────────────────────────────────────────────────
  const fetchBasePriceHistory = async () => {
    setBasePriceLoading(true);
    setBasePriceError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/plans/base-price/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) {
        setBasePriceData(data);
        setNewBasePrice(data.currentPrice?.toString() || '');
      } else {
        setBasePriceError(data.message || 'Failed to fetch price history');
      }
    } catch (err) {
      setBasePriceError('Failed to fetch price history');
    } finally {
      setBasePriceLoading(false);
    }
  };

  const handleOpenBasePriceDialog = () => {
    setBasePriceDialogOpen(true);
    fetchBasePriceHistory();
  };

  // const handleSaveBasePrice = async () => {
  //   const price = parseFloat(newBasePrice);
  //   if (!price || price <= 0) {
  //     toast.error('Please enter a valid price');
  //     return;
  //   }
  //   setBasePriceSaving(true);
  //   try {
  //     const token = localStorage.getItem('token');
  //     const isFirstTime = !basePriceData?.currentPrice;
  //     const url = `${import.meta.env.VITE_BASE_URL}/plans/base-price`;
  //     const method = isFirstTime ? 'POST' : 'PUT';
  //     const response = await fetch(url, {
  //       method,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ basePricePerUserPerMonth: price }),
  //     });
  //     const data = await response.json();
  //     if (data.success !== false) {
  //       toast.success('Base price updated successfully!');
  //       fetchBasePriceHistory();
  //     } else {
  //       toast.error(data.message || 'Failed to update price');
  //     }
  //   } catch (err) {
  //     toast.error('Failed to update price');
  //   } finally {
  //     setBasePriceSaving(false);
  //   }
  // };
  // ─────────────────────────────────────────────────────────────────────────
  const handleSaveBasePrice = async (price) => {
    try {
      const token = localStorage.getItem('token');
      const isFirstTime = !basePriceData?.currentPrice;
      const url = `${import.meta.env.VITE_BASE_URL}/plans/base-price`;
      const method = isFirstTime ? 'POST' : 'PUT';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ basePricePerUserPerMonth: price }),
      });
      const data = await response.json();
      if (data.success !== false) {
        toast.success('Base price updated successfully!');
        await fetchBasePriceHistory();
        setBasePriceDialogOpen(false);
      } else {
        toast.error(data.message || 'Failed to update price');
      }
    } catch (err) {
      toast.error('Failed to update price');
    }
  };
  const handleSortClick = (event) => setSortAnchorEl(event.currentTarget);
  const handleSortClose = () => setSortAnchorEl(null);
  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    handleSortClose();
  };

  const getSortButtonText = () => {
    const fieldMap = {
      name: "Name",
      price: "Price",
      users: "Users Range",
      duration: "Duration",
      status: "Status",
      createdAt: "Created Date",
    };
    const orderText = sortOrder === "asc" ? "↑ Asc" : "↓ Desc";
    return `${fieldMap[sortField] || "Sort"} ${orderText}`;
  };

  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) setViewMode(newMode);
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
    if (shouldRefresh) fetchPlans();
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
      await fetchPlans();
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
        setShowDeleteModal(false);
        fetchPlans();
      } catch (error) {
        toast.error("Failed to delete plan");
      }
    }
  };

  const filteredAndSortedPlans = [...plansList]
    .filter(
      (plan) =>
        plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let aVal, bVal;
      switch (sortField) {
        case "name":
          aVal = a.name?.toLowerCase() || "";
          bVal = b.name?.toLowerCase() || "";
          break;
        case "price":
          aVal = a.price || 0;
          bVal = b.price || 0;
          break;
        case "users":
          aVal = a.minUsers || 0;
          bVal = b.minUsers || 0;
          break;
        case "duration":
          const durationOrder = { "monthly": 1, "3 months": 2, "6 months": 3, "9 months": 4, "1 year": 5, "yearly": 5 };
          aVal = durationOrder[a.duration] || 999;
          bVal = durationOrder[b.duration] || 999;
          break;
        case "status":
          const statusOrder = { "active": 1, "inactive": 2, "pending": 3 };
          aVal = statusOrder[a.status] || 999;
          bVal = statusOrder[b.status] || 999;
          break;
        case "createdAt":
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        default:
          aVal = a.name?.toLowerCase() || "";
          bVal = b.name?.toLowerCase() || "";
      }
      if (sortOrder === "asc") return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      else return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
    });

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // ── Card Grid View ────────────────────────────────────────────────────────
  const CardGridView = () => (
    <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
      <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
        <AnimatePresence>
          {filteredAndSortedPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={plan._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: { xs: 1.5, sm: 2 },
                    border: "1px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      bgcolor: alpha(getPlanColor(plan.name), 0.05),
                      borderBottom: "1px solid",
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, minWidth: 0, flex: 1 }}>
                      <Avatar
                        sx={{
                          width: { xs: 36, sm: 40 },
                          height: { xs: 36, sm: 40 },
                          bgcolor: alpha(getPlanColor(plan.name), 0.1),
                          color: getPlanColor(plan.name),
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          flexShrink: 0,
                        }}
                      >
                        {getPlanIcon(plan.name)}
                      </Avatar>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {plan.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                          {plan.duration}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={plan.status}
                      size="small"
                      icon={plan.status === "active" ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
                      sx={{
                        bgcolor: plan.status === "active" ? alpha("#22c55e", 0.1) : alpha(theme.palette.text.secondary, 0.1),
                        color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
                        fontWeight: 600,
                        fontSize: { xs: '0.6rem', sm: '0.65rem' },
                        height: { xs: 22, sm: 24 },
                        flexShrink: 0,
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
                    <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' }, fontWeight: 500, display: 'block', mb: 0.5 }}>
                        DESCRIPTION
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                          color: 'text.primary',
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {plan.description}
                      </Typography>
                    </Box>

                    <Grid container spacing={{ xs: 1, sm: 1.5 }}>
                      <Grid item xs={6}>
                        <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: { xs: 0.8, sm: 1 }, borderRadius: 1.5 }}>
                          <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, color: 'text.secondary', display: 'block', mb: 0.25 }}>
                            Users Range
                          </Typography>
                          <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: theme.palette.primary.main, wordBreak: 'break-word' }}>
                            {plan.minUsers} - {plan.maxUsers}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: { xs: 0.8, sm: 1 }, borderRadius: 1.5 }}>
                          <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, color: 'text.secondary', display: 'block', mb: 0.25 }}>
                            Price
                          </Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }, color: theme.palette.primary.main }}>
                            ₹{plan.price}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box sx={{ p: { xs: 1.5, sm: 2 }, pt: 0, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Tooltip title="Edit Plan">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(plan)}
                        sx={{
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          width: { xs: 28, sm: 32 },
                          height: { xs: 28, sm: 32 },
                          "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                        }}
                      >
                        <EditIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Plan">
                      <IconButton
                        size="small"
                        onClick={() => confirmDelete(plan._id)}
                        sx={{
                          color: "#ef4444",
                          bgcolor: alpha("#ef4444", 0.1),
                          width: { xs: 28, sm: 32 },
                          height: { xs: 28, sm: 32 },
                          "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Box>
  );

  // ── Mobile Card View ──────────────────────────────────────────────────────
  const MobileCardView = () => (
    <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
      <AnimatePresence>
        {filteredAndSortedPlans.map((plan, index) => (
          <motion.div
            key={plan._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              sx={{
                mb: { xs: 1, sm: 1.5 },
                borderRadius: { xs: 1.5, sm: 2 },
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  bgcolor: alpha(getPlanColor(plan.name), 0.05),
                  borderBottom: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1 }, minWidth: 0, flex: 1 }}>
                  <Avatar
                    sx={{
                      width: { xs: 28, sm: 32 },
                      height: { xs: 28, sm: 32 },
                      bgcolor: alpha(getPlanColor(plan.name), 0.1),
                      color: getPlanColor(plan.name),
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      flexShrink: 0,
                    }}
                  >
                    {getPlanIcon(plan.name)}
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: '0.8rem', sm: '0.85rem' },
                        color: 'text.primary',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {plan.name}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' }, color: 'text.secondary' }}>
                      {plan.duration}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={plan.status}
                  size="small"
                  icon={plan.status === "active" ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                  sx={{
                    bgcolor: plan.status === "active" ? alpha("#22c55e", 0.1) : alpha(theme.palette.text.secondary, 0.1),
                    color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
                    fontWeight: 600,
                    fontSize: { xs: '0.55rem', sm: '0.6rem' },
                    height: { xs: 20, sm: 22 },
                    flexShrink: 0,
                  }}
                />
              </Box>

              <CardContent sx={{ p: { xs: 1, sm: 1.5 } }}>
                <Grid container spacing={{ xs: 0.75, sm: 1 }}>
                  <Grid item xs={6}>
                    <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: { xs: 0.6, sm: 0.8 }, borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' }, color: 'text.secondary', display: 'block', mb: 0.25 }}>
                        Users Range
                      </Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, color: theme.palette.primary.main }}>
                        {plan.minUsers} - {plan.maxUsers}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: { xs: 0.6, sm: 0.8 }, borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' }, color: 'text.secondary', display: 'block', mb: 0.25 }}>
                        Price
                      </Typography>
                      <Typography variant="body2" fontWeight={700} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' }, color: theme.palette.primary.main }}>
                        ₹{plan.price}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03), p: { xs: 0.6, sm: 0.8 }, borderRadius: 1.5 }}>
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' }, color: 'text.secondary', display: 'block', mb: 0.25 }}>
                        Description
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.6rem', sm: '0.65rem' },
                          color: 'text.primary',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {plan.description}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5, mt: { xs: 1, sm: 1.5 } }}>
                  <Tooltip title="Edit Plan">
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(plan)}
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        width: { xs: 26, sm: 28 },
                        height: { xs: 26, sm: 28 },
                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                      }}
                    >
                      <EditIcon sx={{ fontSize: { xs: 13, sm: 14 } }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Plan">
                    <IconButton
                      size="small"
                      onClick={() => confirmDelete(plan._id)}
                      sx={{
                        color: "#ef4444",
                        bgcolor: alpha("#ef4444", 0.1),
                        width: { xs: 26, sm: 28 },
                        height: { xs: 26, sm: 28 },
                        "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: { xs: 13, sm: 14 } }} />
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

  // ── Desktop Table View ────────────────────────────────────────────────────
  const DesktopTableView = () => (
    <TableContainer
      sx={{
        overflowX: 'auto',
        maxHeight: { xs: '400px', sm: '500px', md: '600px', lg: '650px' },
        '&::-webkit-scrollbar': { width: '6px', height: '6px' },
        '&::-webkit-scrollbar-track': { backgroundColor: alpha(theme.palette.primary.main, 0.1), borderRadius: '3px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '3px',
          '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.5) },
        },
        scrollBehavior: 'smooth',
      }}
    >
      <Table sx={{ minWidth: { xs: 700, sm: 800, md: 900 } }}>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            {[
              { label: 'Plan Details', field: 'name' },
              { label: 'Users', field: 'users' },
              { label: 'Description', field: null },
              { label: 'Price', field: 'price' },
              { label: 'Duration', field: 'duration' },
              { label: 'Status', field: 'status' },
            ].map(({ label, field }) => (
              <TableCell
                key={label}
                sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, py: { xs: 1, sm: 1.5 } }}
              >
                {field ? (
                  <TableSortLabel
                    active={sortField === field}
                    direction={sortField === field ? (sortOrder === "asc" ? "asc" : "desc") : "asc"}
                    onClick={() => {
                      if (sortField === field) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      else { setSortField(field); setSortOrder("asc"); }
                    }}
                  >
                    {label}
                  </TableSortLabel>
                ) : label}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, py: { xs: 1, sm: 1.5 } }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {filteredAndSortedPlans.map((plan, index) => {
              const rowBg = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02);
              return (
                <TableRow
                  key={plan._id}
                  component={motion.tr}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  sx={{ "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) } }}
                >
                  <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.8, sm: 1.2 } }}>
                      <Avatar
                        sx={{
                          width: { xs: 24, sm: 28, md: 32 },
                          height: { xs: 24, sm: 28, md: 32 },
                          bgcolor: alpha(getPlanColor(plan.name), 0.1),
                          color: getPlanColor(plan.name),
                          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                          flexShrink: 0,
                        }}
                      >
                        {getPlanIcon(plan.name)}
                      </Avatar>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{
                          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.85rem' },
                          color: 'text.primary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {plan.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5 } }}>
                    <Chip
                      label={`${plan.minUsers} - ${plan.maxUsers}`}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                        height: { xs: 20, sm: 22, md: 24 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5 } }}>
                    <Typography
                      color="text.secondary"
                      sx={{
                        maxWidth: { xs: 100, sm: 130, md: 180, lg: 220 },
                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {plan.description}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5 } }}>
                    <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.primary.main, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}>
                      ₹{plan.price}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5 } }}>
                    <Chip
                      label={plan.duration}
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                        height: { xs: 20, sm: 22, md: 24 },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5 } }}>
                    <Chip
                      label={plan.status}
                      size="small"
                      icon={plan.status === "active" ? <FaCheckCircle size={12} /> : <FaTimesCircle size={12} />}
                      sx={{
                        bgcolor: plan.status === "active" ? alpha("#22c55e", 0.1) : alpha(theme.palette.text.secondary, 0.1),
                        color: plan.status === "active" ? "#22c55e" : theme.palette.text.secondary,
                        fontWeight: 600,
                        fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                        height: { xs: 20, sm: 22, md: 24 },
                        gap: 0.5,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5 } }}>
                    <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 0.8 }, justifyContent: "center" }}>
                      <Tooltip title="Edit Plan">
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(plan)}
                          sx={{
                            color: theme.palette.primary.main,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            width: { xs: 26, sm: 28, md: 30 },
                            height: { xs: 26, sm: 28, md: 30 },
                            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                          }}
                        >
                          <EditIcon sx={{ fontSize: { xs: 14, sm: 15, md: 16 } }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Plan">
                        <IconButton
                          size="small"
                          onClick={() => confirmDelete(plan._id)}
                          sx={{
                            color: "#ef4444",
                            bgcolor: alpha("#ef4444", 0.1),
                            width: { xs: 26, sm: 28, md: 30 },
                            height: { xs: 26, sm: 28, md: 30 },
                            "&:hover": { bgcolor: alpha("#ef4444", 0.2) },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: { xs: 14, sm: 15, md: 16 } }} />
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

  // ── First render loader ───────────────────────────────────────────────────
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
        <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
          <Box sx={{
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: { xs: 1.5, sm: 2, md: 3 },
            gap: 1.5,
          }}>
            <Box>
              <Skeleton variant="text" width={180} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="text" width={250} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mt: 0.5 }} />
            </Box>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.2, sm: 1.5, md: 2 },
              borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              mb: { xs: 1.5, sm: 2, md: 3 },
            }}
          >
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Skeleton variant="rounded" height={36} sx={{ flex: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="rounded" width={130} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="rounded" width={100} height={36} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              overflow: "hidden",
            }}
          >
            <HeaderStatsSkeleton isMobile={isMobile} />
            {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}
          </Paper>
        </Container>
      </Box>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        py: { xs: 1.5, sm: 2, md: 3 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />

      <Container maxWidth="xl" disableGutters={isMobile} sx={{ px: { xs: 0, sm: 0, md: 0 } }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* ── Page heading ── */}
          <motion.div variants={itemVariants}>
            <Box sx={{
              mb: { xs: 1.5, sm: 2, md: 3 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1.5,
            }}>
              <Box>
                <Typography
                  variant={isMobile ? "body1" : "h6"}
                  fontWeight="800"
                  color={theme.palette.primary.main}
                  gutterBottom
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.3rem', lg: '1.5rem', xl: '1.7rem' },
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

          {/* ── Toolbar ── */}
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
                flexWrap: "wrap",
              }}
            >
              {/* Search */}
              <TextField
                placeholder={isSmallMobile ? "Search plans..." : "Search plans by name or description..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                fullWidth={isMobile}
                sx={{
                  flex: 2,
                  minWidth: { xs: '100%', sm: 250 },
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
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery("")} edge="end" sx={{ p: 0.5 }}>
                        <ClearIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* View mode toggle (desktop only) */}
              {!isMobile && (
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={handleViewModeChange}
                  size="small"
                  sx={{
                    height: 36,
                    '& .MuiToggleButton-root': {
                      px: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      color: theme.palette.text.secondary,
                      '&.Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                      },
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                    },
                  }}
                >
                  <ToggleButton value="list">
                    <ViewListIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    List
                  </ToggleButton>
                  <ToggleButton value="card">
                    <ViewModuleIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    Card
                  </ToggleButton>
                </ToggleButtonGroup>
              )}

              {/* Sort button */}
              <Button
                variant="outlined"
                onClick={handleSortClick}
                startIcon={<SortIcon sx={{ fontSize: 16 }} />}
                endIcon={sortOrder === "asc" ? <ArrowUpwardIcon sx={{ fontSize: 14 }} /> : <ArrowDownwardIcon sx={{ fontSize: 14 }} />}
                size="small"
                fullWidth={isMobile}
                sx={{
                  minWidth: { xs: '100%', sm: 150 },
                  height: 36,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: theme.palette.primary.main,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  "&:hover": { borderColor: theme.palette.primary.main, bgcolor: alpha(theme.palette.primary.main, 0.05) },
                }}
              >
                {getSortButtonText()}
              </Button>

              {/* Sort menu */}
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
                PaperProps={{
                  sx: {
                    mt: 0.5,
                    borderRadius: 2,
                    minWidth: 200,
                    boxShadow: theme.shadows[4],
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    overflow: 'hidden',
                  },
                }}
              >
                {[
                  { label: "Name (A-Z)", field: "name", order: "asc" },
                  { label: "Name (Z-A)", field: "name", order: "desc" },
                  { label: "Price (Lowest First)", field: "price", order: "asc" },
                  { label: "Price (Highest First)", field: "price", order: "desc" },
                  { label: "Users (Smallest First)", field: "users", order: "asc" },
                  { label: "Users (Largest First)", field: "users", order: "desc" },
                  { label: "Duration (Shortest First)", field: "duration", order: "asc" },
                  { label: "Duration (Longest First)", field: "duration", order: "desc" },
                  { label: "Status (Active First)", field: "status", order: "asc" },
                  { label: "Status (Inactive First)", field: "status", order: "desc" },
                  { label: "Created Date (Newest First)", field: "createdAt", order: "desc" },
                  { label: "Created Date (Oldest First)", field: "createdAt", order: "asc" },
                ].map(({ label, field, order }) => (
                  <MenuItem
                    key={label}
                    onClick={() => handleSortChange(field, order)}
                    selected={sortField === field && sortOrder === order}
                    sx={{ fontSize: '0.75rem', py: 1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span>{label}</span>
                      {order === 'asc'
                        ? <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
                        : <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />}
                    </Box>
                  </MenuItem>
                ))}
              </Menu>

              {/* ── Custom Plan Price button ── */}
              <Button
                variant="outlined"
                size="small"
                onClick={handleOpenBasePriceDialog}
                fullWidth={isMobile}
                sx={{
                  minWidth: { xs: '100%', sm: 'auto' },
                  height: 36,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: theme.palette.primary.main,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  whiteSpace: 'nowrap',
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Custom Plan Price
              </Button>

              {/* Add Plan button */}
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

          {/* ── Plans table / card grid ── */}
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
                    sx={{ fontSize: { xs: '0.85rem', sm: '1rem', md: '1.1rem' } }}
                  >
                    Plans Overview
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: alpha("#ffffff", 0.8), fontSize: { xs: '0.55rem', sm: '0.65rem' } }}
                  >
                    {!isMobile && (viewMode === 'list' ? 'List view' : 'Card view')} • Sorted by {getSortButtonText()} • {filteredAndSortedPlans.length} plans found
                  </Typography>
                </Box>
                <Chip
                  label={filteredAndSortedPlans.length}
                  size="small"
                  icon={<PeopleIcon sx={{ fontSize: 12 }} />}
                  sx={{
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: { xs: '0.6rem', sm: '0.65rem' },
                    height: { xs: 24, sm: 28 },
                    "& .MuiChip-icon": { color: theme.palette.primary.main, fontSize: 12 },
                  }}
                />
              </Box>

              {loading || isRefreshing ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, sm: 4, md: 6 } }}>
                  <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
                </Box>
              ) : (
                <>
                  {filteredAndSortedPlans.length === 0 ? (
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
                    <>
                      {isMobile ? (
                        <MobileCardView />
                      ) : (
                        viewMode === 'list' ? <DesktopTableView /> : <CardGridView />
                      )}
                    </>
                  )}
                </>
              )}
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      {/* ── Existing modals ── */}
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
        onSuccess={fetchPlans}
      />

      {/* ── Custom Plan Base Price Dialog ── */}
      <BasePriceDialog
        open={basePriceDialogOpen}
        onClose={() => setBasePriceDialogOpen(false)}
        basePriceData={basePriceData}
        onSave={handleSaveBasePrice}
        loading={basePriceLoading}
      />
    </Box>
  );
};

export default PlanManagement;