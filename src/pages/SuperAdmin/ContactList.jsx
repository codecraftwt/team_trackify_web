// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   IconButton,
//   Tooltip,
//   Chip,
//   MenuItem,
//   Select,
//   FormControl,
//   alpha,
//   Paper,
//   useTheme,
//   useMediaQuery,
//   Avatar,
//   Skeleton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Divider,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Email as EmailIcon,
//   People as PeopleIcon,
//   Close as CloseIcon,
//   Visibility as VisibilityIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getContacts,
//   updateContactStatus,
// } from "../../redux/slices/contactSlice";
// import PaginatedTable from "../../components/PaginatedTable";
// import { formatDateDDMMYYYY } from "../../utils/dateFormat";

// // Mobile Card View Skeleton
// const MobileCardSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{ p: { xs: 0.75, sm: 1 } }}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: { xs: 1.2, sm: 1.5 },
//             mb: 1.5,
//             borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           {/* Header with Index and Status */}
//           <Box sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 1,
//             flexWrap: "wrap",
//             gap: 0.8
//           }}>
//             <Skeleton variant="rounded" width={45} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>

//           {/* Name and Email */}
//           <Box sx={{ mb: 1 }}>
//             <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//             <Skeleton variant="text" width="80%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>

//           {/* Message */}
//           <Box sx={{ mb: 1 }}>
//             <Skeleton variant="text" width={40} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 0.8,
//                 bgcolor: alpha(theme.palette.primary.main, 0.03),
//                 borderRadius: 1,
//               }}
//             >
//               <Skeleton variant="text" width="100%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="text" width="90%" height={14} sx={{ mt: 0.3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Paper>
//           </Box>

//           {/* Footer with Date and Action */}
//           <Box sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 0.8,
//             pt: 0.8,
//             borderTop: "1px dashed",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}>
//             <Skeleton variant="text" width={70} height={10} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Box sx={{ display: "flex", gap: 0.5 }}>
//               <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box>
//           </Box>
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
//       <Box sx={{ minWidth: isTablet ? 900 : 1000 }}>
//         {/* Table Header */}
//         <Box sx={{ 
//           display: 'flex', 
//           bgcolor: alpha(theme.palette.primary.main, 0.05),
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           py: { xs: 0.8, sm: 1, md: 1.2 },
//           px: { xs: 1, sm: 1.2, md: 1.5 },
//         }}>
//           <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={25} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={90} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 3 }}><Skeleton variant="text" width={150} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 0.8 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//         </Box>

//         {/* Table Rows */}
//         {[1, 2, 3, 4, 5].map((item, index) => (
//           <Box
//             key={item}
//             sx={{
//               display: 'flex',
//               bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//               borderBottom: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               py: { xs: 0.8, sm: 1, md: 1.2 },
//               px: { xs: 1, sm: 1.2, md: 1.5 },
//             }}
//           >
//             <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={25} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="text" width={90} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={130} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 3 }}><Skeleton variant="text" width={200} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 0.8 }}><Box sx={{ display: "flex", gap: 0.5 }}>
//               <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//               <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             </Box></Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// // Pagination Skeleton
// const PaginationSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       p: { xs: 1.2, sm: 1.5 },
//       borderTop: "1px solid",
//       borderColor: alpha(theme.palette.primary.main, 0.1),
//     }}>
//       <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Box sx={{ display: "flex", gap: 0.8 }}>
//         <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//       </Box>
//     </Box>
//   );
// };

// // Date Filter Skeleton
// const DateFilterSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{
//       display: "flex",
//       gap: { xs: 0.8, sm: 1.2, md: 1.5 },
//       flexWrap: "wrap",
//       p: { xs: 1.2, sm: 1.5 },
//       borderBottom: "1px solid",
//       borderColor: alpha(theme.palette.primary.main, 0.1),
//     }}>
//       <Skeleton variant="rounded" width={130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Skeleton variant="rounded" width={130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//     </Box>
//   );
// };

// // Items Per Page Skeleton
// const ItemsPerPageSkeleton = () => {
//   const theme = useTheme();
//   return (
//     <Box sx={{
//       display: "flex",
//       alignItems: "center",
//       gap: 0.8,
//       p: { xs: 1.2, sm: 1.5 },
//       borderTop: "1px solid",
//       borderColor: alpha(theme.palette.primary.main, 0.1),
//     }}>
//       <Skeleton variant="text" width={70} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Skeleton variant="rounded" width={55} height={32} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
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

// // Contact Detail Modal Component
// const ContactDetailModal = ({ open, onClose, contact }) => {
//   const theme = useTheme();
  
//   if (!contact) return null;

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: { xs: 2, sm: 3 },
//           overflow: "hidden",
//         },
//       }}
//     >
//       <DialogTitle sx={{
//         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//         color: "white",
//         py: { xs: 1.5, sm: 2 },
//         px: { xs: 2, sm: 3 },
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//       }}>
//         <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
//           Contact Details
//         </Typography>
//         <IconButton onClick={onClose} sx={{ color: "white" }}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
//         <Box sx={{ mb: 2 }}>
//           <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
//             Name
//           </Typography>
//           <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
//             {contact.name}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 2 }}>
//           <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
//             Email
//           </Typography>
//           <Typography variant="body1" sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' }, wordBreak: 'break-all' }}>
//             {contact.email}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 2 }}>
//           <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
//             Status
//           </Typography>
//           {/* <Box sx={{ mt: 0.5 }}>
//             <FormControl size="small" sx={{ minWidth: 120 }}>
//               <Select
//                 value={contact.status || "pending"}
//                 onChange={(e) => {
//                   // Handle status change
//                   const action = { type: 'UPDATE_CONTACT_STATUS', id: contact._id, status: e.target.value };
//                   // You'll need to dispatch this action
//                 }}
//                 sx={{
//                   fontSize: { xs: '0.8rem', sm: '0.85rem' },
//                   height: { xs: 32, sm: 36 },
//                 }}
//               >
//                 <MenuItem value="pending" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>Pending</MenuItem>
//                 <MenuItem value="contacted" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>Contacted</MenuItem>
//                 <MenuItem value="replied" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>Replied</MenuItem>
//               </Select>
//             </FormControl>
//           </Box> */}
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         <Box sx={{ mb: 2 }}>
//           <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500, display: 'block', mb: 1 }}>
//             Message
//           </Typography>
//           <Paper
//             elevation={0}
//             sx={{
//               p: { xs: 1.5, sm: 2 },
//               bgcolor: alpha(theme.palette.primary.main, 0.03),
//               borderRadius: 2,
//               maxHeight: 250,
//               overflow: 'auto',
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//             }}
//           >
//             <Typography
//               variant="body1"
//               sx={{
//                 fontSize: { xs: '0.85rem', sm: '0.95rem' },
//                 lineHeight: 1.6,
//                 whiteSpace: 'pre-wrap',
//                 wordBreak: 'break-word',
//               }}
//             >
//               {contact.message}
//             </Typography>
//           </Paper>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
//           <Box>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
//               Created At
//             </Typography>
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
//               {formatDateDDMMYYYY(contact.createdAt)}
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
//               Last Updated
//             </Typography>
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
//               {formatDateDDMMYYYY(contact.updatedAt)}
//             </Typography>
//           </Box>
//         </Box>
//       </DialogContent>

//       <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
//         <Button
//           variant="contained"
//           startIcon={<EmailIcon />}
//           component="a"
//           href={`mailto:${contact.email}`}
//           fullWidth
//           sx={{
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             py: { xs: 0.8, sm: 1 },
//             fontSize: { xs: '0.8rem', sm: '0.9rem' },
//           }}
//         >
//           Send Email
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const ContactList = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   const { contacts = [], pagination = {}, loading = false } = useSelector(
//     (state) => state.contact || {}
//   );

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     dispatch(
//       getContacts({
//         page: currentPage,
//         limit: itemsPerPage,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//       })
//     );

//     const timer = setTimeout(() => {
//       setShowFirstRenderLoader(false);
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, [dispatch, currentPage, itemsPerPage, dateRange]);

//   const handleDateChange = (newDateRange) => {
//     setCurrentPage(1);
//     setDateRange(newDateRange);
//   };

//   const handleItemsPerPageChange = (newItemsPerPage) => {
//     setCurrentPage(1);
//     setItemsPerPage(newItemsPerPage);
//   };

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     dispatch(
//       getContacts({
//         page: currentPage,
//         limit: itemsPerPage,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//       })
//     ).finally(() => {
//       setIsRefreshing(false);
//     });
//   };

//   const handleStatusChange = (contactId, newStatus) => {
//     dispatch(updateContactStatus({ id: contactId, status: newStatus }));
//   };

//   const handleRowClick = (contact) => {
//     setSelectedContact(contact);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedContact(null);
//   };

//   const columns = useMemo(
//     () => [
//       { label: "#", key: "index" },
//       { label: "Name", key: "name" },
//       { label: "Email", key: "email" },
//       { label: "Message", key: "message" },
//       { label: "Status", key: "status" },
//       { label: "Date", key: "date" },
//       { label: "Actions", key: "actions" },
//     ],
//     []
//   );

//   // Mobile Card View Component
//   const MobileCardView = ({ contacts, currentPage, itemsPerPage, onCardClick }) => {
//     return (
//       <Box sx={{ p: { xs: 0.75, sm: 1 } }}>
//         {contacts.map((contact, index) => {
//           const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

//           return (
//             <motion.div
//               key={contact._id}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.2, delay: index * 0.02 }}
//             >
//               <Paper
//                 elevation={0}
//                 onClick={() => onCardClick(contact)}
//                 sx={{
//                   p: { xs: 1.2, sm: 1.5 },
//                   mb: 1.5,
//                   borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   bgcolor: index % 2 === 0 ? theme.palette.background.paper : alpha(theme.palette.primary.main, 0.02),
//                   transition: "all 0.2s ease",
//                   cursor: "pointer",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 {/* Header with Index and Status */}
//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1,
//                   flexWrap: "wrap",
//                   gap: 0.8
//                 }}>
//                   <Chip
//                     label={`#${globalIndex}`}
//                     size="small"
//                     sx={{
//                       bgcolor: alpha(theme.palette.primary.main, 0.1),
//                       color: theme.palette.primary.main,
//                       fontWeight: 600,
//                       fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                       height: { xs: 20, sm: 22 },
//                     }}
//                   />
//                   <FormControl size="small" sx={{ minWidth: { xs: 85, sm: 95 } }}>
//                     <Select
//                       value={contact.status || "pending"}
//                       onChange={(e) => {
//                         e.stopPropagation();
//                         handleStatusChange(contact._id, e.target.value);
//                       }}
//                       onClick={(e) => e.stopPropagation()}
//                       sx={{
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         height: { xs: 24, sm: 26 },
//                         bgcolor: theme.palette.background.paper,
//                         "& .MuiOutlinedInput-notchedOutline": {
//                           borderColor: alpha(theme.palette.primary.main, 0.2),
//                         },
//                       }}
//                     >
//                       <MenuItem value="pending" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Pending</MenuItem>
//                       <MenuItem value="contacted" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Contacted</MenuItem>
//                       <MenuItem value="replied" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Replied</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 {/* Name and Email */}
//                 <Box sx={{ mb: 1 }}>
//                   <Typography
//                     variant="body2"
//                     fontWeight={600}
//                     sx={{
//                       fontSize: { xs: '0.85rem', sm: '0.95rem' },
//                       mb: 0.25,
//                       wordBreak: 'break-word',
//                       color: 'text.primary'
//                     }}
//                   >
//                     {contact.name}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{
//                       fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                       display: 'block',
//                       wordBreak: 'break-all'
//                     }}
//                   >
//                     {contact.email}
//                   </Typography>
//                 </Box>

//                 {/* Message Preview */}
//                 <Box sx={{ mb: 1 }}>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{
//                       fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                       display: 'block',
//                       mb: 0.3,
//                       fontWeight: 500
//                     }}
//                   >
//                     Message
//                   </Typography>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 0.8,
//                       bgcolor: alpha(theme.palette.primary.main, 0.03),
//                       borderRadius: 1,
//                       border: "1px solid",
//                       borderColor: alpha(theme.palette.primary.main, 0.1),
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         wordBreak: 'break-word',
//                         color: 'text.primary',
//                         display: '-webkit-box',
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: 'vertical',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                       }}
//                     >
//                       {contact.message}
//                     </Typography>
//                   </Paper>
//                 </Box>

//                 {/* Footer with Date and Actions */}
//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: 0.8,
//                   pt: 0.8,
//                   borderTop: "1px dashed",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                 }}>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{
//                       fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                       fontWeight: 500
//                     }}
//                   >
//                     {formatDateDDMMYYYY(contact.createdAt)}
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 0.5 }}>
//                     <Tooltip title="View Details">
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onCardClick(contact);
//                         }}
//                         sx={{
//                           color: theme.palette.primary.main,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           width: { xs: 28, sm: 30 },
//                           height: { xs: 28, sm: 30 },
//                           "&:hover": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.2),
//                             transform: "scale(1.1)",
//                           },
//                           transition: "all 0.2s ease",
//                         }}
//                       >
//                         <VisibilityIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Send Email">
//                       <IconButton
//                         component="a"
//                         href={`mailto:${contact.email}`}
//                         size="small"
//                         onClick={(e) => e.stopPropagation()}
//                         sx={{
//                           color: theme.palette.primary.main,
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           width: { xs: 28, sm: 30 },
//                           height: { xs: 28, sm: 30 },
//                           "&:hover": {
//                             bgcolor: alpha(theme.palette.primary.main, 0.2),
//                             transform: "scale(1.1)",
//                           },
//                           transition: "all 0.2s ease",
//                         }}
//                       >
//                         <EmailIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
//                 </Box>
//               </Paper>
//             </motion.div>
//           );
//         })}
//       </Box>
//     );
//   };

// // Row render for table view - with 10 character truncation
// const rowRender = useCallback(
//   (contact, index, rowBg) => {
//     const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

//     // Helper function to truncate text to 10 characters
//     const truncateText = (text, maxLength = 10) => {
//       if (!text) return "—";
//       return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
//     };

//     return (
//       <Box
//         component={motion.tr}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.2, delay: index * 0.02 }}
//         onClick={() => handleRowClick(contact)}
//         sx={{
//           display: "table-row",
//           cursor: "pointer",
//           "&:hover": {
//             bgcolor: alpha(theme.palette.primary.main, 0.05),
//           },
//           transition: "background-color 0.2s ease",
//         }}
//       >
//         {/* Index */}
//         <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
//           <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
//             {globalIndex}
//           </Typography>
//         </TableCell>

//         {/* Name - truncated to 10 chars */}
//         <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
//           <Typography
//             variant="body2"
//             fontWeight={500}
//             sx={{
//               fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//               color: 'text.primary',
//             }}
//           >
//             {truncateText(contact.name, 10)}
//           </Typography>
//         </TableCell>

//         {/* Email - truncated to 10 chars */}
//         <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
//           <Typography
//             variant="body2"
//             sx={{
//               fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//               color: 'text.primary',
//             }}
//           >
//             {truncateText(contact.email, 10)}
//           </Typography>
//         </TableCell>

//         {/* Message - truncated to 10 chars */}
//         <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
//           <Typography
//             variant="body2"
//             sx={{
//               maxWidth: { xs: 200, sm: 250, md: 300, lg: 350 },
//               fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
//               color: 'text.primary',
//             }}
//           >
//             {truncateText(contact.message, 10)}
//           </Typography>
//         </TableCell>

//         {/* Status */}
//         <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
//           <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100, md: 110 } }}>
//             <Select
//               value={contact.status || "pending"}
//               onChange={(e) => {
//                 e.stopPropagation();
//                 handleStatusChange(contact._id, e.target.value);
//               }}
//               onClick={(e) => e.stopPropagation()}
//               sx={{
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                 height: { xs: 28, sm: 30, md: 32 },
//                 bgcolor: theme.palette.background.paper,
//               }}
//             >
//               <MenuItem value="pending" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Pending</MenuItem>
//               <MenuItem value="contacted" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Contacted</MenuItem>
//               <MenuItem value="replied" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Replied</MenuItem>
//             </Select>
//           </FormControl>
//         </TableCell>

//         {/* Date */}
//         <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 }, minWidth: { xs: 85, sm: 100, md: 110 } }}>
//           <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.primary' }}>
//             {formatDateDDMMYYYY(contact.createdAt)}
//           </Typography>
//         </TableCell>

//         {/* Actions */}
//         <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
//           <Box sx={{ display: "flex", gap: 0.5 }}>
//             <Tooltip title="View Details">
//               <IconButton
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRowClick(contact);
//                 }}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   width: { xs: 28, sm: 30 },
//                   height: { xs: 28, sm: 30 },
//                   "&:hover": {
//                     bgcolor: alpha(theme.palette.primary.main, 0.2),
//                     transform: "scale(1.1)",
//                   },
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <VisibilityIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Send Email">
//               <IconButton
//                 component="a"
//                 href={`mailto:${contact.email}`}
//                 size="small"
//                 onClick={(e) => e.stopPropagation()}
//                 sx={{
//                   color: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   width: { xs: 28, sm: 30 },
//                   height: { xs: 28, sm: 30 },
//                   "&:hover": {
//                     bgcolor: alpha(theme.palette.primary.main, 0.2),
//                     transform: "scale(1.1)",
//                   },
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <EmailIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </TableCell>
//       </Box>
//     );
//   },
//   [currentPage, itemsPerPage, theme]
// );

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
//           {/* Header */}
//           <Box sx={{
//             display: "flex",
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between",
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             mb: { xs: 1.5, sm: 2, md: 3 },
//             gap: { xs: 1, sm: 1.5 }
//           }}>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h6" : "h5"}
//                 fontWeight="700"
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
//                 }}
//               >
//                 Contact List
//               </Typography>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}
//               >
//                 Complete list of all contacts
//               </Typography>
//             </Box>
//             <IconButton
//               size="small"
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 width: 32,
//                 height: 32,
//               }}
//             >
//               <RefreshIcon sx={{ fontSize: 18 }} />
//             </IconButton>
//           </Box>

//           {/* Table/Card View Skeleton */}
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
//             <DateFilterSkeleton />
//             {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}
//             <ItemsPerPageSkeleton />
//             <PaginationSkeleton />
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
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               mb: { xs: 1.5, sm: 2, md: 3 },
//               gap: { xs: 1, sm: 1.5 }
//             }}>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "h6" : "h5"}
//                   fontWeight="700"
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
//                   }}
//                 >
//                   Contact List
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}
//                 >
//                   Complete list of all contacts
//                 </Typography>
//               </Box>
//               <IconButton
//                 onClick={handleRefresh}
//                 disabled={loading || isRefreshing}
//                 size="small"
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   width: 32,
//                   height: 32,
//                   "&:hover": {
//                     bgcolor: alpha(theme.palette.primary.main, 0.2),
//                     transform: "rotate(180deg)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <RefreshIcon sx={{
//                   animation: isRefreshing ? "spin 1s linear infinite" : "none",
//                   fontSize: 18
//                 }} />
//               </IconButton>
//             </Box>
//           </motion.div>

//           {/* Table/Card View */}
//           <motion.div variants={itemVariants}>
//             <PaginatedTable
//               title="Contact List"
//               subtitle="Complete list of all contacts"
//               icon={<PeopleIcon />}
//               iconColor={theme.palette.primary.main}
//               columns={columns}
//               data={contacts}
//               totalPages={pagination.totalPages || 1}
//               totalCount={pagination.totalContacts || 0}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//               loading={loading}
//               rowRender={!isMobile ? rowRender : undefined}
//               mobileCardRender={isMobile ? (contact, index) => {
//                 return (
//                   <MobileCardView
//                     contacts={[contact]}
//                     currentPage={currentPage}
//                     itemsPerPage={itemsPerPage}
//                     onCardClick={handleRowClick}
//                   />
//                 );
//               } : undefined}
//               showDateFilter={true}
//               onDateChange={handleDateChange}
//               currentDateRange={dateRange}
//               itemsPerPage={itemsPerPage}
//               onItemsPerPageChange={handleItemsPerPageChange}
//               primaryColor={theme.palette.primary.main}
//             />
//           </motion.div>
//         </motion.div>
//       </Container>

//       {/* Contact Detail Modal */}
//       <ContactDetailModal
//         open={modalOpen}
//         onClose={handleCloseModal}
//         contact={selectedContact}
//       />

//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// // TableCell component helper
// const TableCell = ({ children, sx, ...props }) => {
//   const theme = useTheme();
//   return (
//     <Box
//       component="td"
//       sx={{
//         padding: { xs: "8px", sm: "10px", md: "12px" },
//         borderBottom: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         ...sx,
//       }}
//       {...props}
//     >
//       {children}
//     </Box>
//   );
// };

// export default ContactList;


import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  MenuItem,
  Select,
  FormControl,
  alpha,
  Paper,
  useTheme,
  useMediaQuery,
  Avatar,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Popover,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Email as EmailIcon,
  People as PeopleIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getContacts,
  updateContactStatus,
} from "../../redux/slices/contactSlice";
import PaginatedTable from "../../components/PaginatedTable";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

// Mobile Card View Skeleton
const MobileCardSkeleton = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ p: { xs: 0.75, sm: 1 } }}>
      {[1, 2, 3].map((item) => (
        <Paper
          key={item}
          elevation={0}
          sx={{
            p: { xs: 1.2, sm: 1.5 },
            mb: 1.5,
            borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
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
      <Box sx={{ minWidth: isTablet ? 900 : 1000 }}>
        <Box sx={{ 
          display: 'flex', 
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          py: { xs: 0.8, sm: 1, md: 1.2 },
          px: { xs: 1, sm: 1.2, md: 1.5 },
        }}>
          <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={25} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={90} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 3 }}><Skeleton variant="text" width={150} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 0.8 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
        </Box>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <Box
            key={item}
            sx={{
              display: 'flex',
              bgcolor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
              borderBottom: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
              py: { xs: 0.8, sm: 1, md: 1.2 },
              px: { xs: 1, sm: 1.2, md: 1.5 },
            }}
          >
            <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={25} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="text" width={90} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={130} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 3 }}><Skeleton variant="text" width={200} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 0.8 }}><Box sx={{ display: "flex", gap: 0.5 }}>
              <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
              <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            </Box></Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Pagination Skeleton
const PaginationSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: { xs: 1.2, sm: 1.5 },
      borderTop: "1px solid",
      borderColor: alpha(theme.palette.primary.main, 0.1),
    }}>
      <Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      <Box sx={{ display: "flex", gap: 0.8 }}>
        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
        <Skeleton variant="rounded" width={28} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
      </Box>
    </Box>
  );
};

// Date Filter Skeleton
const DateFilterSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex",
      gap: { xs: 0.8, sm: 1.2, md: 1.5 },
      flexWrap: "wrap",
      p: { xs: 1.2, sm: 1.5 },
      borderBottom: "1px solid",
      borderColor: alpha(theme.palette.primary.main, 0.1),
    }}>
      <Skeleton variant="rounded" width={130} height={32} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      <Skeleton variant="rounded" width={130} height={32} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
    </Box>
  );
};

// Items Per Page Skeleton
const ItemsPerPageSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.8,
      p: { xs: 1.2, sm: 1.5 },
      borderTop: "1px solid",
      borderColor: alpha(theme.palette.primary.main, 0.1),
    }}>
      <Skeleton variant="text" width={70} height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      <Skeleton variant="rounded" width={55} height={28} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
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
        height={28} 
        sx={{ 
          bgcolor: alpha("#ffffff", 0.2),
          borderRadius: 2,
        }} 
      />
    </Box>
  );
};

// Contact Detail Modal Component
const ContactDetailModal = ({ open, onClose, contact }) => {
  const theme = useTheme();
  
  if (!contact) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 2, sm: 3 },
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: "white",
        py: { xs: 1.5, sm: 2 },
        px: { xs: 2, sm: 3 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Typography variant="h6" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
          Contact Details
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
            Name
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            {contact.name}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
            Email
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' }, wordBreak: 'break-all' }}>
            {contact.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', fontWeight: 500, display: 'block', mb: 1 }}>
            Message
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, sm: 2 },
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              borderRadius: 2,
              maxHeight: 250,
              overflow: 'auto',
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {contact.message}
            </Typography>
          </Paper>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Created At
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
              {formatDateDDMMYYYY(contact.createdAt)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', fontWeight: 500 }}>
              Last Updated
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
              {formatDateDDMMYYYY(contact.updatedAt)}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
        <Button
          variant="contained"
          startIcon={<EmailIcon />}
          component="a"
          href={`mailto:${contact.email}`}
          fullWidth
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            py: { xs: 0.8, sm: 1 },
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
          }}
        >
          Send Email
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Date Filter Component with reduced height
const DateFilter = ({ dateRange, onDateChange, isMobile }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [localFromDate, setLocalFromDate] = useState(dateRange.fromDate || null);
  const [localToDate, setLocalToDate] = useState(dateRange.toDate || null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    onDateChange({
      fromDate: localFromDate ? moment(localFromDate).format("YYYY-MM-DD") : "",
      toDate: localToDate ? moment(localToDate).format("YYYY-MM-DD") : "",
    });
    handleClose();
  };

  const handleClear = () => {
    setLocalFromDate(null);
    setLocalToDate(null);
    onDateChange({ fromDate: "", toDate: "" });
    handleClose();
  };

  const getButtonText = () => {
    if (dateRange.fromDate && dateRange.toDate) {
      return `${moment(dateRange.fromDate).format("DD/MM/YY")} - ${moment(dateRange.toDate).format("DD/MM/YY")}`;
    } else if (dateRange.fromDate) {
      return `From ${moment(dateRange.fromDate).format("DD/MM/YY")}`;
    } else if (dateRange.toDate) {
      return `Until ${moment(dateRange.toDate).format("DD/MM/YY")}`;
    }
    return "Date Range";
  };

  const isActive = dateRange.fromDate || dateRange.toDate;
const today = new Date();
today.setHours(23, 59, 59, 999);
  return (
    <>
      <Button
        variant={isActive ? "contained" : "outlined"}
        onClick={handleClick}
        startIcon={<CalendarIcon sx={{ fontSize: 14 }} />}
        size="small"
        sx={{
          height: { xs: 32, sm: 34 },
          minWidth: { xs: 'auto', sm: 130 },
          px: { xs: 1.2, sm: 1.5 },
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          borderColor: alpha(theme.palette.primary.main, 0.3),
          color: isActive ? 'white' : theme.palette.primary.main,
          bgcolor: isActive ? theme.palette.primary.main : 'transparent',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            bgcolor: isActive ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.05),
          },
        }}
      >
        {getButtonText()}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            p: 1.5,
            mt: 0.5,
            borderRadius: 2,
            width: 280,
            boxShadow: theme.shadows[4],
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: '0.75rem' }}>
              Select Date Range
            </Typography>
            
            <DatePicker
            maxDate={today}
              label="Start Date"
              value={localFromDate}
              onChange={setLocalFromDate}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  sx: {
                    '& .MuiInputBase-root': {
                      height: { xs: 32, sm: 34 },
                      fontSize: '0.75rem',
                    },
                    '& .MuiInputBase-input': {
                      py: { xs: 0.5, sm: 0.6 },
                      px: 1,
                    },
                  }
                }
              }}
            />
            
            <DatePicker
            maxDate={today}
              label="End Date"
              value={localToDate}
              onChange={setLocalToDate}
              minDate={localFromDate || undefined}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  sx: {
                    '& .MuiInputBase-root': {
                      height: { xs: 32, sm: 34 },
                      fontSize: '0.75rem',
                    },
                    '& .MuiInputBase-input': {
                      py: { xs: 0.5, sm: 0.6 },
                      px: 1,
                    },
                  }
                }
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 0.5 }}>
              <Button
                size="small"
                onClick={handleClear}
                sx={{
                  fontSize: '0.7rem',
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.5,
                }}
              >
                Clear
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleApply}
                disabled={!localFromDate && !localToDate}
                sx={{
                  fontSize: '0.7rem',
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 1.5,
                  py: 0.5,
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </LocalizationProvider>
      </Popover>
    </>
  );
};

const ContactList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { contacts = [], pagination = {}, loading = false } = useSelector(
    (state) => state.contact || {}
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(
      getContacts({
        page: currentPage,
        limit: itemsPerPage,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    );

    const timer = setTimeout(() => {
      setShowFirstRenderLoader(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [dispatch, currentPage, itemsPerPage, dateRange]);

  const handleDateChange = (newDateRange) => {
    setCurrentPage(1);
    setDateRange(newDateRange);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setCurrentPage(1);
    setItemsPerPage(newItemsPerPage);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      getContacts({
        page: currentPage,
        limit: itemsPerPage,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    ).finally(() => {
      setIsRefreshing(false);
    });
  };

  const handleStatusChange = (contactId, newStatus) => {
    dispatch(updateContactStatus({ id: contactId, status: newStatus }));
  };

  const handleRowClick = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedContact(null);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = useMemo(
    () => [
      { label: "#", key: "index" },
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Message", key: "message" },
      { label: "Status", key: "status" },
      { label: "Date", key: "date" },
      { label: "Actions", key: "actions" },
    ],
    []
  );

  // Mobile Card View Component
  const MobileCardView = ({ contacts, currentPage, itemsPerPage, onCardClick }) => {
    return (
      <Box sx={{ p: { xs: 0.75, sm: 1 } }}>
        {contacts.map((contact, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

          return (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <Paper
                elevation={0}
                onClick={() => onCardClick(contact)}
                sx={{
                  p: { xs: 1.2, sm: 1.5 },
                  mb: 1.5,
                  borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  bgcolor: index % 2 === 0 ? theme.palette.background.paper : alpha(theme.palette.primary.main, 0.02),
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  flexWrap: "wrap",
                  gap: 0.8
                }}>
                  <Chip
                    label={`#${globalIndex}`}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      height: { xs: 20, sm: 22 },
                    }}
                  />
                  <FormControl size="small" sx={{ minWidth: { xs: 85, sm: 95 } }}>
                    <Select
                      value={contact.status || "pending"}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(contact._id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: { xs: 24, sm: 26 },
                        bgcolor: theme.palette.background.paper,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                        },
                      }}
                    >
                      <MenuItem value="pending" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Pending</MenuItem>
                      <MenuItem value="contacted" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Contacted</MenuItem>
                      <MenuItem value="replied" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Replied</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.95rem' },
                      mb: 0.25,
                      wordBreak: 'break-word',
                      color: 'text.primary'
                    }}
                  >
                    {contact.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.65rem', sm: '0.7rem' },
                      display: 'block',
                      wordBreak: 'break-all'
                    }}
                  >
                    {contact.email}
                  </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.55rem', sm: '0.6rem' },
                      display: 'block',
                      mb: 0.3,
                      fontWeight: 500
                    }}
                  >
                    Message
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 0.8,
                      bgcolor: alpha(theme.palette.primary.main, 0.03),
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        wordBreak: 'break-word',
                        color: 'text.primary',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {contact.message}
                    </Typography>
                  </Paper>
                </Box>

                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 0.8,
                  pt: 0.8,
                  borderTop: "1px dashed",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.55rem', sm: '0.6rem' },
                      fontWeight: 500
                    }}
                  >
                    {formatDateDDMMYYYY(contact.createdAt)}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCardClick(contact);
                        }}
                        sx={{
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          width: { xs: 28, sm: 30 },
                          height: { xs: 28, sm: 30 },
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Email">
                      <IconButton
                        component="a"
                        href={`mailto:${contact.email}`}
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          color: theme.palette.primary.main,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          width: { xs: 28, sm: 30 },
                          height: { xs: 28, sm: 30 },
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <EmailIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
      </Box>
    );
  };

  // Row render for table view
  const rowRender = useCallback(
    (contact, index, rowBg) => {
      const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

      const truncateText = (text, maxLength = 15) => {
        if (!text) return "—";
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
      };

      return (
        <Box
          component={motion.tr}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
          onClick={() => handleRowClick(contact)}
          sx={{
            display: "table-row",
            cursor: "pointer",
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
            transition: "background-color 0.2s ease",
          }}
        >
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.primary' }}>
              {globalIndex}
            </Typography>
          </TableCell>

          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                color: 'text.primary',
              }}
            >
              {truncateText(contact.name, 15)}
            </Typography>
          </TableCell>

          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                color: 'text.primary',
              }}
            >
              {truncateText(contact.email, 20)}
            </Typography>
          </TableCell>

          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
            <Tooltip title={contact.message} arrow>
              <Typography
                variant="body2"
                sx={{
                  maxWidth: { xs: 200, sm: 250, md: 300 },
                  fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
                  color: 'text.primary',
                }}
              >
                {truncateText(contact.message, 25)}
              </Typography>
            </Tooltip>
          </TableCell>

          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
            <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100, md: 110 } }}>
              <Select
                value={contact.status || "pending"}
                onChange={(e) => {
                  e.stopPropagation();
                  handleStatusChange(contact._id, e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                  height: { xs: 28, sm: 30, md: 32 },
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <MenuItem value="pending" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Pending</MenuItem>
                <MenuItem value="contacted" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Contacted</MenuItem>
                <MenuItem value="replied" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Replied</MenuItem>
              </Select>
            </FormControl>
          </TableCell>

          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 }, minWidth: { xs: 85, sm: 100, md: 110 } }}>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.primary' }}>
              {formatDateDDMMYYYY(contact.createdAt)}
            </Typography>
          </TableCell>

          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.2, md: 1.5 } }}>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="View Details">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(contact);
                  }}
                  sx={{
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    width: { xs: 28, sm: 30 },
                    height: { xs: 28, sm: 30 },
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Send Email">
                <IconButton
                  component="a"
                  href={`mailto:${contact.email}`}
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    width: { xs: 28, sm: 30 },
                    height: { xs: 28, sm: 30 },
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <EmailIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
        </Box>
      );
    },
    [currentPage, itemsPerPage, theme]
  );

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
            gap: 1.5
          }}>
            <Box>
              <Skeleton variant="text" width={180} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="text" width={250} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mt: 0.5 }} />
            </Box>
            <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          </Box>

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
            <Box sx={{ p: { xs: 1.2, sm: 1.5 }, borderBottom: "1px solid", borderColor: alpha(theme.palette.primary.main, 0.1) }}>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Skeleton variant="rounded" width={200} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), flex: 1 }} />
                <Skeleton variant="rounded" width={130} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              </Box>
            </Box>
            {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}
            <ItemsPerPageSkeleton />
            <PaginationSkeleton />
          </Paper>
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
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between",
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: { xs: 1.5, sm: 2, md: 3 },
              gap: { xs: 1, sm: 1.5 }
            }}>
              <Box>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  fontWeight="700"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }
                  }}
                >
                  Contact List
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}
                >
                  Complete list of all contacts
                </Typography>
              </Box>
              <IconButton
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 32,
                  height: 32,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    transform: "rotate(180deg)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <RefreshIcon sx={{
                  animation: isRefreshing ? "spin 1s linear infinite" : "none",
                  fontSize: 18
                }} />
              </IconButton>
            </Box>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.2, sm: 1.5 },
                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                mb: { xs: 1.5, sm: 2, md: 3 },
                display: "flex",
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: "center",
                gap: { xs: 1.2, sm: 1.5 },
              }}
            >
              <TextField
                placeholder={isSmallMobile ? "Search..." : "Search by name or email..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                fullWidth={isMobile}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                    fontSize: { xs: '0.75rem', sm: '0.8rem' },
                    height: { xs: 32, sm: 34 },
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
              <DateFilter 
                dateRange={dateRange}
                onDateChange={handleDateChange}
                isMobile={isMobile}
              />
            </Paper>
          </motion.div>

          {/* Table/Card View */}
          <motion.div variants={itemVariants}>
            <PaginatedTable
              title="Contact List"
              subtitle="Complete list of all contacts"
              icon={<PeopleIcon />}
              iconColor={theme.palette.primary.main}
              columns={columns}
              data={filteredContacts}
              totalPages={pagination.totalPages || 1}
              totalCount={pagination.totalContacts || 0}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              loading={loading}
              rowRender={!isMobile ? rowRender : undefined}
              mobileCardRender={isMobile ? (contact) => {
                return (
                  <MobileCardView
                    contacts={[contact]}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onCardClick={handleRowClick}
                  />
                );
              } : undefined}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              primaryColor={theme.palette.primary.main}
            />
          </motion.div>
        </motion.div>
      </Container>

      {/* Contact Detail Modal */}
      <ContactDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        contact={selectedContact}
      />

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

// TableCell component helper
const TableCell = ({ children, sx, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      component="td"
      sx={{
        padding: { xs: "8px", sm: "10px", md: "12px" },
        borderBottom: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ContactList;