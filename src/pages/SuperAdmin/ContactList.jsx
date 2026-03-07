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
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Email as EmailIcon,
//   People as PeopleIcon,
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
//   return (
//     <Box sx={{ p: { xs: 1, sm: 2 } }}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             mb: 2,
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha("#2563EB", 0.1),
//           }}
//         >
//           {/* Header with Index and Status */}
//           <Box sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 1.5,
//             flexWrap: "wrap",
//             gap: 1
//           }}>
//             <Skeleton variant="rounded" width={50} height={22} sx={{ borderRadius: 3, bgcolor: alpha("#2563EB", 0.2) }} />
//             <Skeleton variant="rounded" width={90} height={28} sx={{ borderRadius: 1, bgcolor: alpha("#2563EB", 0.2) }} />
//           </Box>

//           {/* Name and Email */}
//           <Box sx={{ mb: 1.5 }}>
//             <Skeleton variant="text" width="60%" height={24} sx={{ bgcolor: alpha("#2563EB", 0.1), mb: 0.5 }} />
//             <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//           </Box>

//           {/* Message */}
//           <Box sx={{ mb: 1.5 }}>
//             <Skeleton variant="text" width={50} height={12} sx={{ mb: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 1,
//                 bgcolor: alpha("#f1f5f9", 0.5),
//                 borderRadius: 1,
//               }}
//             >
//               <Skeleton variant="text" width="100%" height={16} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//               <Skeleton variant="text" width="90%" height={16} sx={{ mt: 0.5, bgcolor: alpha("#2563EB", 0.1) }} />
//             </Paper>
//           </Box>

//           {/* Footer with Date and Action */}
//           <Box sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 1,
//             pt: 1,
//             borderTop: "1px dashed",
//             borderColor: alpha("#2563EB", 0.1),
//           }}>
//             <Skeleton variant="text" width={80} height={12} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//             <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha("#2563EB", 0.2) }} />
//           </Box>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// // Desktop Table View Skeleton
// const DesktopTableSkeleton = ({ isTablet }) => {
//   return (
//     <Box sx={{ width: '100%', overflowX: 'auto' }}>
//       <Box sx={{ minWidth: isTablet ? 900 : 1000 }}>
//         {/* Table Header */}
//         <Box sx={{ 
//           display: 'flex', 
//           bgcolor: alpha("#2563EB", 0.05),
//           borderBottom: "1px solid",
//           borderColor: alpha("#2563EB", 0.1),
//           py: { xs: 1, sm: 1.5, md: 2 },
//           px: { xs: 1, sm: 1.5, md: 2 },
//         }}>
//           <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//           <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//           <Box sx={{ flex: 2 }}><Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//           <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//         </Box>

//         {/* Table Rows */}
//         {[1, 2, 3, 4, 5].map((item, index) => (
//           <Box
//             key={item}
//             sx={{
//               display: 'flex',
//               bgcolor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
//               borderBottom: "1px solid",
//               borderColor: alpha("#2563EB", 0.1),
//               py: { xs: 1, sm: 1.5, md: 2 },
//               px: { xs: 1, sm: 1.5, md: 2 },
//             }}
//           >
//             <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//             <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//             <Box sx={{ flex: 2 }}><Skeleton variant="text" width={200} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 1, bgcolor: alpha("#2563EB", 0.2) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} /></Box>
//             <Box sx={{ flex: 0.5 }}><Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha("#2563EB", 0.2) }} /></Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// // Pagination Skeleton
// const PaginationSkeleton = () => {
//   return (
//     <Box sx={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       p: { xs: 1.5, sm: 2 },
//       borderTop: "1px solid",
//       borderColor: alpha("#2563EB", 0.1),
//     }}>
//       <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       <Box sx={{ display: "flex", gap: 1 }}>
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.2) }} />
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.2) }} />
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.2) }} />
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.2) }} />
//       </Box>
//     </Box>
//   );
// };

// // Date Filter Skeleton
// const DateFilterSkeleton = () => {
//   return (
//     <Box sx={{
//       display: "flex",
//       gap: { xs: 1, sm: 1.5, md: 2 },
//       flexWrap: "wrap",
//       p: { xs: 1.5, sm: 2 },
//       borderBottom: "1px solid",
//       borderColor: alpha("#2563EB", 0.1),
//     }}>
//       <Skeleton variant="rounded" width={150} height={40} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.1) }} />
//       <Skeleton variant="rounded" width={150} height={40} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.1) }} />
//     </Box>
//   );
// };

// // Items Per Page Skeleton
// const ItemsPerPageSkeleton = () => {
//   return (
//     <Box sx={{
//       display: "flex",
//       alignItems: "center",
//       gap: 1,
//       p: { xs: 1.5, sm: 2 },
//       borderTop: "1px solid",
//       borderColor: alpha("#2563EB", 0.1),
//     }}>
//       <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha("#2563EB", 0.1) }} />
//       <Skeleton variant="rounded" width={60} height={36} sx={{ borderRadius: 2, bgcolor: alpha("#2563EB", 0.2) }} />
//     </Box>
//   );
// };

// // Header Stats Skeleton
// const HeaderStatsSkeleton = ({ isMobile }) => {
//   return (
//     <Box
//       sx={{
//         p: { xs: 2, sm: 2.5, md: 3 },
//         background: "linear-gradient(135deg, #2563EB, #1E40AF)",
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

// const ContactList = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

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

//     // Set first render loader to false after 1 second
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

//   const columns = useMemo(
//     () => [
//       { label: "#", key: "index" },
//       { label: "Name", key: "name" },
//       { label: "Email", key: "email" },
//       { label: "Message", key: "message" },
//       { label: "Status", key: "status" },
//       { label: "Date", key: "date" },
//       { label: "Action", key: "action" },
//     ],
//     []
//   );

//   // Mobile Card View Component
//   const MobileCardView = ({ contacts, currentPage, itemsPerPage }) => {
//     return (
//       <Box sx={{ p: { xs: 1, sm: 2 } }}>
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
//                 sx={{
//                   p: { xs: 1.5, sm: 2 },
//                   mb: 2,
//                   borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                   border: "1px solid",
//                   borderColor: alpha("#2563EB", 0.1),
//                   bgcolor: index % 2 === 0 ? "#fff" : alpha("#f8fafc", 0.5),
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     borderColor: "#2563EB",
//                     boxShadow: `0 4px 12px ${alpha("#2563EB", 0.1)}`,
//                   },
//                 }}
//               >
//                 {/* Header with Index and Status */}
//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1.5,
//                   flexWrap: "wrap",
//                   gap: 1
//                 }}>
//                   <Chip
//                     label={`#${globalIndex}`}
//                     size="small"
//                     sx={{
//                       bgcolor: alpha("#2563EB", 0.1),
//                       color: "#2563EB",
//                       fontWeight: 600,
//                       fontSize: { xs: '0.6rem', sm: '0.65rem' },
//                       height: { xs: 20, sm: 22 },
//                     }}
//                   />
//                   <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100 } }}>
//                     <Select
//                       value={contact.status || "pending"}
//                       onChange={(e) => handleStatusChange(contact._id, e.target.value)}
//                       sx={{
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         height: { xs: 24, sm: 28 },
//                         bgcolor: "white",
//                         "& .MuiOutlinedInput-notchedOutline": {
//                           borderColor: alpha("#2563EB", 0.2),
//                         },
//                         "&:hover .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "#2563EB",
//                         },
//                         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                           borderColor: "#2563EB",
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
//                 <Box sx={{ mb: 1.5 }}>
//                   <Typography
//                     variant="subtitle2"
//                     fontWeight={600}
//                     sx={{
//                       fontSize: { xs: '0.85rem', sm: '0.9rem' },
//                       mb: 0.25,
//                       wordBreak: 'break-word',
//                       color: '#1e293b'
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

//                 {/* Message */}
//                 <Box sx={{ mb: 1.5 }}>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{
//                       fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                       display: 'block',
//                       mb: 0.5,
//                       fontWeight: 500
//                     }}
//                   >
//                     Message
//                   </Typography>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 1,
//                       bgcolor: alpha("#f1f5f9", 0.5),
//                       borderRadius: 1,
//                       maxHeight: 100,
//                       overflow: 'auto',
//                       border: "1px solid",
//                       borderColor: alpha("#2563EB", 0.1),
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         wordBreak: 'break-word',
//                         color: '#1e293b'
//                       }}
//                     >
//                       {contact.message}
//                     </Typography>
//                   </Paper>
//                 </Box>

//                 {/* Footer with Date and Action */}
//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: 1,
//                   pt: 1,
//                   borderTop: "1px dashed",
//                   borderColor: alpha("#2563EB", 0.1),
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
//                   <Tooltip title="Send Email">
//                     <IconButton
//                       component="a"
//                       href={`mailto:${contact.email}`}
//                       size="small"
//                       sx={{
//                         color: "#2563EB",
//                         bgcolor: alpha("#2563EB", 0.1),
//                         width: { xs: 28, sm: 32 },
//                         height: { xs: 28, sm: 32 },
//                         "&:hover": {
//                           bgcolor: alpha("#2563EB", 0.2),
//                           transform: "scale(1.1)",
//                         },
//                         transition: "all 0.2s ease",
//                       }}
//                     >
//                       <EmailIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Paper>
//             </motion.div>
//           );
//         })}
//       </Box>
//     );
//   };

//   // Row render for table view
//   const rowRender = useCallback(
//     (contact, index, rowBg) => {
//       const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

//       return (
//         <Box
//           component={motion.tr}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.2, delay: index * 0.02 }}
//           sx={{
//             display: "table-row",
//             "&:hover": {
//               bgcolor: alpha("#2563EB", 0.05),
//             },
//             transition: "background-color 0.2s ease",
//           }}
//         >
//           {/* Index */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: '#1e293b' }}>
//               {globalIndex}
//             </Typography>
//           </TableCell>

//           {/* Name */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography
//               variant="body2"
//               fontWeight={500}
//               sx={{
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                 whiteSpace: 'nowrap',
//                 color: '#1e293b'
//               }}
//             >
//               {contact.name}
//             </Typography>
//           </TableCell>

//           {/* Email */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                 whiteSpace: 'nowrap',
//                 color: '#1e293b'
//               }}
//             >
//               {contact.email}
//             </Typography>
//           </TableCell>

//           {/* Message */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 maxWidth: { xs: 100, sm: 150, md: 200, lg: 250 },
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//                 color: '#1e293b'
//               }}
//             >
//               {contact.message}
//             </Typography>
//           </TableCell>

//           {/* Status */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100, md: 113 } }}>
//               <Select
//                 value={contact.status || "pending"}
//                 onChange={(e) => handleStatusChange(contact._id, e.target.value)}
//                 sx={{
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.8rem' },
//                   height: { xs: 24, sm: 28, md: 32 },
//                   bgcolor: "white",
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: alpha("#2563EB", 0.2),
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#2563EB",
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#2563EB",
//                   },
//                 }}
//               >
//                 <MenuItem value="pending" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Pending</MenuItem>
//                 <MenuItem value="contacted" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Contacted</MenuItem>
//                 <MenuItem value="replied" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Replied</MenuItem>
//               </Select>
//             </FormControl>
//           </TableCell>

//           {/* Date */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 }, minWidth: { xs: 80, sm: 100, md: 120 } }}>
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.8rem' }, color: '#1e293b' }}>
//               {formatDateDDMMYYYY(contact.createdAt)}
//             </Typography>
//           </TableCell>

//           {/* Action */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Tooltip title="Send Email">
//               <IconButton
//                 component="a"
//                 href={`mailto:${contact.email}`}
//                 size="small"
//                 sx={{
//                   color: "#2563EB",
//                   bgcolor: alpha("#2563EB", 0.1),
//                   width: { xs: 24, sm: 28, md: 32 },
//                   height: { xs: 24, sm: 28, md: 32 },
//                   "&:hover": {
//                     bgcolor: alpha("#2563EB", 0.2),
//                     transform: "scale(1.1)",
//                   },
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <EmailIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
//               </IconButton>
//             </Tooltip>
//           </TableCell>
//         </Box>
//       );
//     },
//     [currentPage, itemsPerPage]
//   );

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

//   // If first render loader is active, show skeletons for everything except title and refresh button
//   if (showFirstRenderLoader) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//           py: { xs: 2, sm: 3, md: 4 },
//           px: { xs: 1, sm: 2, md: 4 },
//         }}
//       >
//         <Container
//           maxWidth="xl"
//           disableGutters={isMobile}
//           sx={{ px: { xs: 0, sm: 0, md: 0 } }}
//         >
//           {/* Header with title and refresh button only */}
//           <Box sx={{
//             display: "flex",
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between",
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             mb: { xs: 2, sm: 3, md: 4 },
//             gap: { xs: 1.5, sm: 2 }
//           }}>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 gutterBottom
//                 sx={{
//                   background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 Contact List
//               </Typography>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{
//                   fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
//                 }}
//               >
//                 Complete list of all contacts
//               </Typography>
//             </Box>
//             <IconButton
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 bgcolor: alpha("#2563EB", 0.1),
//                 color: "#2563EB",
//                 width: { xs: 36, sm: 40 },
//                 height: { xs: 36, sm: 40 },
//                 "&:hover": {
//                   bgcolor: alpha("#2563EB", 0.2),
//                 },
//               }}
//             >
//               <RefreshIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
//             </IconButton>
//           </Box>

//           {/* Table/Card View Skeleton */}
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha("#2563EB", 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {/* Header Stats Skeleton */}
//             <HeaderStatsSkeleton isMobile={isMobile} />

//             {/* Date Filter Skeleton */}
//             <DateFilterSkeleton />

//             {/* Content Skeleton - Mobile or Desktop */}
//             {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}

//             {/* Items Per Page Skeleton */}
//             <ItemsPerPageSkeleton />

//             {/* Pagination Skeleton */}
//             <PaginationSkeleton />
//           </Paper>
//         </Container>

//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </Box>
//     );
//   }

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
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               mb: { xs: 2, sm: 3, md: 4 },
//               gap: { xs: 1.5, sm: 2 }
//             }}>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "h5" : "h4"}
//                   fontWeight="800"
//                   gutterBottom
//                   sx={{
//                     background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                   }}
//                 >
//                   Contact List
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
//                   }}
//                 >
//                   Complete list of all contacts
//                 </Typography>
//               </Box>
//               <IconButton
//                 onClick={handleRefresh}
//                 disabled={loading || isRefreshing}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   bgcolor: alpha("#2563EB", 0.1),
//                   color: "#2563EB",
//                   width: { xs: 36, sm: 40 },
//                   height: { xs: 36, sm: 40 },
//                   "&:hover": {
//                     bgcolor: alpha("#2563EB", 0.2),
//                     transform: "rotate(180deg)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <RefreshIcon sx={{
//                   animation: isRefreshing ? "spin 1s linear infinite" : "none",
//                   fontSize: { xs: 18, sm: 20, md: 24 }
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
//               iconColor="#2563EB"
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
//                   />
//                 );
//               } : undefined}
//               showDateFilter={true}
//               onDateChange={handleDateChange}
//               currentDateRange={dateRange}
//               itemsPerPage={itemsPerPage}
//               onItemsPerPageChange={handleItemsPerPageChange}
//               primaryColor="#2563EB"
//             />
//           </motion.div>
//         </motion.div>
//       </Container>

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
// const TableCell = ({ children, sx, ...props }) => (
//   <Box
//     component="td"
//     sx={{
//       padding: { xs: "8px", sm: "12px", md: "16px" },
//       borderBottom: "1px solid",
//       borderColor: alpha("#2563EB", 0.1),
//       ...sx,
//     }}
//     {...props}
//   >
//     {children}
//   </Box>
// );

// export default ContactList;












//////////////////////////////    Centralised Color     //////////////////////////////
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
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Email as EmailIcon,
//   People as PeopleIcon,
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
//     <Box sx={{ p: { xs: 1, sm: 2 } }}>
//       {[1, 2, 3].map((item) => (
//         <Paper
//           key={item}
//           elevation={0}
//           sx={{
//             p: { xs: 1.5, sm: 2 },
//             mb: 2,
//             borderRadius: { xs: 2, sm: 2.5, md: 3 },
//             border: "1px solid",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}
//         >
//           {/* Header with Index and Status */}
//           <Box sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 1.5,
//             flexWrap: "wrap",
//             gap: 1
//           }}>
//             <Skeleton variant="rounded" width={50} height={22} sx={{ borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//             <Skeleton variant="rounded" width={90} height={28} sx={{ borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//           </Box>

//           {/* Name and Email */}
//           <Box sx={{ mb: 1.5 }}>
//             <Skeleton variant="text" width="60%" height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
//             <Skeleton variant="text" width="80%" height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//           </Box>

//           {/* Message */}
//           <Box sx={{ mb: 1.5 }}>
//             <Skeleton variant="text" width={50} height={12} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 1,
//                 bgcolor: alpha(theme.palette.primary.main, 0.03),
//                 borderRadius: 1,
//               }}
//             >
//               <Skeleton variant="text" width="100%" height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//               <Skeleton variant="text" width="90%" height={16} sx={{ mt: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             </Paper>
//           </Box>

//           {/* Footer with Date and Action */}
//           <Box sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mt: 1,
//             pt: 1,
//             borderTop: "1px dashed",
//             borderColor: alpha(theme.palette.primary.main, 0.1),
//           }}>
//             <Skeleton variant="text" width={80} height={12} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//             <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
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
//           py: { xs: 1, sm: 1.5, md: 2 },
//           px: { xs: 1, sm: 1.5, md: 2 },
//         }}>
//           <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 2 }}><Skeleton variant="text" width={120} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//           <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={60} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
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
//               py: { xs: 1, sm: 1.5, md: 2 },
//               px: { xs: 1, sm: 1.5, md: 2 },
//             }}
//           >
//             <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={30} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="text" width={100} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1.5 }}><Skeleton variant="text" width={150} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 2 }}><Skeleton variant="text" width={200} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={100} height={28} sx={{ borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} /></Box>
//             <Box sx={{ flex: 1 }}><Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
//             <Box sx={{ flex: 0.5 }}><Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} /></Box>
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
//       p: { xs: 1.5, sm: 2 },
//       borderTop: "1px solid",
//       borderColor: alpha(theme.palette.primary.main, 0.1),
//     }}>
//       <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Box sx={{ display: "flex", gap: 1 }}>
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//         <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
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
//       gap: { xs: 1, sm: 1.5, md: 2 },
//       flexWrap: "wrap",
//       p: { xs: 1.5, sm: 2 },
//       borderBottom: "1px solid",
//       borderColor: alpha(theme.palette.primary.main, 0.1),
//     }}>
//       <Skeleton variant="rounded" width={150} height={40} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Skeleton variant="rounded" width={150} height={40} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
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
//       gap: 1,
//       p: { xs: 1.5, sm: 2 },
//       borderTop: "1px solid",
//       borderColor: alpha(theme.palette.primary.main, 0.1),
//     }}>
//       <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
//       <Skeleton variant="rounded" width={60} height={36} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
//     </Box>
//   );
// };

// // Header Stats Skeleton
// const HeaderStatsSkeleton = ({ isMobile }) => {
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

// const ContactList = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   // Responsive breakpoints
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isSmallMobile = useMediaQuery('(max-width:480px)');

//   // New state for first render loading effect (1 second)
//   const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

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

//     // Set first render loader to false after 1 second
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

//   const columns = useMemo(
//     () => [
//       { label: "#", key: "index" },
//       { label: "Name", key: "name" },
//       { label: "Email", key: "email" },
//       { label: "Message", key: "message" },
//       { label: "Status", key: "status" },
//       { label: "Date", key: "date" },
//       { label: "Action", key: "action" },
//     ],
//     []
//   );

//   // Mobile Card View Component
//   const MobileCardView = ({ contacts, currentPage, itemsPerPage }) => {
//     return (
//       <Box sx={{ p: { xs: 1, sm: 2 } }}>
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
//                 sx={{
//                   p: { xs: 1.5, sm: 2 },
//                   mb: 2,
//                   borderRadius: { xs: 2, sm: 2.5, md: 3 },
//                   border: "1px solid",
//                   borderColor: alpha(theme.palette.primary.main, 0.1),
//                   bgcolor: index % 2 === 0 ? theme.palette.background.paper : alpha(theme.palette.primary.main, 0.02),
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
//                   },
//                 }}
//               >
//                 {/* Header with Index and Status */}
//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mb: 1.5,
//                   flexWrap: "wrap",
//                   gap: 1
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
//                   <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100 } }}>
//                     <Select
//                       value={contact.status || "pending"}
//                       onChange={(e) => handleStatusChange(contact._id, e.target.value)}
//                       sx={{
//                         fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                         height: { xs: 24, sm: 28 },
//                         bgcolor: theme.palette.background.paper,
//                         "& .MuiOutlinedInput-notchedOutline": {
//                           borderColor: alpha(theme.palette.primary.main, 0.2),
//                         },
//                         "&:hover .MuiOutlinedInput-notchedOutline": {
//                           borderColor: theme.palette.primary.main,
//                         },
//                         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                           borderColor: theme.palette.primary.main,
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
//                 <Box sx={{ mb: 1.5 }}>
//                   <Typography
//                     variant="subtitle2"
//                     fontWeight={600}
//                     sx={{
//                       fontSize: { xs: '0.85rem', sm: '0.9rem' },
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

//                 {/* Message */}
//                 <Box sx={{ mb: 1.5 }}>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{
//                       fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                       display: 'block',
//                       mb: 0.5,
//                       fontWeight: 500
//                     }}
//                   >
//                     Message
//                   </Typography>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       p: 1,
//                       bgcolor: alpha(theme.palette.primary.main, 0.03),
//                       borderRadius: 1,
//                       maxHeight: 100,
//                       overflow: 'auto',
//                       border: "1px solid",
//                       borderColor: alpha(theme.palette.primary.main, 0.1),
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                         wordBreak: 'break-word',
//                         color: 'text.primary'
//                       }}
//                     >
//                       {contact.message}
//                     </Typography>
//                   </Paper>
//                 </Box>

//                 {/* Footer with Date and Action */}
//                 <Box sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: 1,
//                   pt: 1,
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
//                   <Tooltip title="Send Email">
//                     <IconButton
//                       component="a"
//                       href={`mailto:${contact.email}`}
//                       size="small"
//                       sx={{
//                         color: theme.palette.primary.main,
//                         bgcolor: alpha(theme.palette.primary.main, 0.1),
//                         width: { xs: 28, sm: 32 },
//                         height: { xs: 28, sm: 32 },
//                         "&:hover": {
//                           bgcolor: alpha(theme.palette.primary.main, 0.2),
//                           transform: "scale(1.1)",
//                         },
//                         transition: "all 0.2s ease",
//                       }}
//                     >
//                       <EmailIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Paper>
//             </motion.div>
//           );
//         })}
//       </Box>
//     );
//   };

//   // Row render for table view
//   const rowRender = useCallback(
//     (contact, index, rowBg) => {
//       const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

//       return (
//         <Box
//           component={motion.tr}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.2, delay: index * 0.02 }}
//           sx={{
//             display: "table-row",
//             "&:hover": {
//               bgcolor: alpha(theme.palette.primary.main, 0.05),
//             },
//             transition: "background-color 0.2s ease",
//           }}
//         >
//           {/* Index */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' }, color: 'text.primary' }}>
//               {globalIndex}
//             </Typography>
//           </TableCell>

//           {/* Name */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography
//               variant="body2"
//               fontWeight={500}
//               sx={{
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                 whiteSpace: 'nowrap',
//                 color: 'text.primary'
//               }}
//             >
//               {contact.name}
//             </Typography>
//           </TableCell>

//           {/* Email */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                 whiteSpace: 'nowrap',
//                 color: 'text.primary'
//               }}
//             >
//               {contact.email}
//             </Typography>
//           </TableCell>

//           {/* Message */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 maxWidth: { xs: 100, sm: 150, md: 200, lg: 250 },
//                 fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//                 color: 'text.primary'
//               }}
//             >
//               {contact.message}
//             </Typography>
//           </TableCell>

//           {/* Status */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100, md: 113 } }}>
//               <Select
//                 value={contact.status || "pending"}
//                 onChange={(e) => handleStatusChange(contact._id, e.target.value)}
//                 sx={{
//                   fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.8rem' },
//                   height: { xs: 24, sm: 28, md: 32 },
//                   bgcolor: theme.palette.background.paper,
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: alpha(theme.palette.primary.main, 0.2),
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: theme.palette.primary.main,
//                   },
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: theme.palette.primary.main,
//                   },
//                 }}
//               >
//                 <MenuItem value="pending" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Pending</MenuItem>
//                 <MenuItem value="contacted" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Contacted</MenuItem>
//                 <MenuItem value="replied" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Replied</MenuItem>
//               </Select>
//             </FormControl>
//           </TableCell>

//           {/* Date */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 }, minWidth: { xs: 80, sm: 100, md: 120 } }}>
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.8rem' }, color: 'text.primary' }}>
//               {formatDateDDMMYYYY(contact.createdAt)}
//             </Typography>
//           </TableCell>

//           {/* Action */}
//           <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
//             <Tooltip title="Send Email">
//               <IconButton
//                 component="a"
//                 href={`mailto:${contact.email}`}
//                 size="small"
//                 sx={{
//                   color: theme.palette.primary.main,
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   width: { xs: 24, sm: 28, md: 32 },
//                   height: { xs: 24, sm: 28, md: 32 },
//                   "&:hover": {
//                     bgcolor: alpha(theme.palette.primary.main, 0.2),
//                     transform: "scale(1.1)",
//                   },
//                   transition: "all 0.2s ease",
//                 }}
//               >
//                 <EmailIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
//               </IconButton>
//             </Tooltip>
//           </TableCell>
//         </Box>
//       );
//     },
//     [currentPage, itemsPerPage, theme]
//   );

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

//   // If first render loader is active, show skeletons for everything except title and refresh button
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
//           {/* Header with title and refresh button only */}
//           <Box sx={{
//             display: "flex",
//             flexDirection: { xs: 'column', sm: 'row' },
//             justifyContent: "space-between",
//             alignItems: { xs: 'flex-start', sm: 'center' },
//             mb: { xs: 2, sm: 3, md: 4 },
//             gap: { xs: 1.5, sm: 2 }
//           }}>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h5" : "h4"}
//                 fontWeight="800"
//                 gutterBottom
//                 sx={{
//                   background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                 }}
//               >
//                 Contact List
//               </Typography>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{
//                   fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
//                 }}
//               >
//                 Complete list of all contacts
//               </Typography>
//             </Box>
//             <IconButton
//               size={isMobile ? "small" : "medium"}
//               sx={{
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 width: { xs: 36, sm: 40 },
//                 height: { xs: 36, sm: 40 },
//                 "&:hover": {
//                   bgcolor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               <RefreshIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
//             </IconButton>
//           </Box>

//           {/* Table/Card View Skeleton */}
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: { xs: 2, sm: 2.5, md: 3 },
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               overflow: "hidden",
//             }}
//           >
//             {/* Header Stats Skeleton */}
//             <HeaderStatsSkeleton isMobile={isMobile} />

//             {/* Date Filter Skeleton */}
//             <DateFilterSkeleton />

//             {/* Content Skeleton - Mobile or Desktop */}
//             {isMobile ? <MobileCardSkeleton /> : <DesktopTableSkeleton isTablet={isTablet} />}

//             {/* Items Per Page Skeleton */}
//             <ItemsPerPageSkeleton />

//             {/* Pagination Skeleton */}
//             <PaginationSkeleton />
//           </Paper>
//         </Container>

//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
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
//               display: "flex",
//               flexDirection: { xs: 'column', sm: 'row' },
//               justifyContent: "space-between",
//               alignItems: { xs: 'flex-start', sm: 'center' },
//               mb: { xs: 2, sm: 3, md: 4 },
//               gap: { xs: 1.5, sm: 2 }
//             }}>
//               <Box>
//                 <Typography
//                   variant={isMobile ? "h5" : "h4"}
//                   fontWeight="800"
//                   gutterBottom
//                   sx={{
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
//                   }}
//                 >
//                   Contact List
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
//                   }}
//                 >
//                   Complete list of all contacts
//                 </Typography>
//               </Box>
//               <IconButton
//                 onClick={handleRefresh}
//                 disabled={loading || isRefreshing}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   width: { xs: 36, sm: 40 },
//                   height: { xs: 36, sm: 40 },
//                   "&:hover": {
//                     bgcolor: alpha(theme.palette.primary.main, 0.2),
//                     transform: "rotate(180deg)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <RefreshIcon sx={{
//                   animation: isRefreshing ? "spin 1s linear infinite" : "none",
//                   fontSize: { xs: 18, sm: 20, md: 24 }
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
//         padding: { xs: "8px", sm: "12px", md: "16px" },
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
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Email as EmailIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getContacts,
  updateContactStatus,
} from "../../redux/slices/contactSlice";
import PaginatedTable from "../../components/PaginatedTable";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";

// Mobile Card View Skeleton - Smaller
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
          {/* Header with Index and Status */}
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
            flexWrap: "wrap",
            gap: 0.8
          }}>
            <Skeleton variant="rounded" width={45} height={20} sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
            <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          </Box>

          {/* Name and Email */}
          <Box sx={{ mb: 1 }}>
            <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), mb: 0.5 }} />
            <Skeleton variant="text" width="80%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          </Box>

          {/* Message */}
          <Box sx={{ mb: 1 }}>
            <Skeleton variant="text" width={40} height={10} sx={{ mb: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Paper
              elevation={0}
              sx={{
                p: 0.8,
                bgcolor: alpha(theme.palette.primary.main, 0.03),
                borderRadius: 1,
              }}
            >
              <Skeleton variant="text" width="100%" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
              <Skeleton variant="text" width="90%" height={14} sx={{ mt: 0.3, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            </Paper>
          </Box>

          {/* Footer with Date and Action */}
          <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 0.8,
            pt: 0.8,
            borderTop: "1px dashed",
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}>
            <Skeleton variant="text" width={70} height={10} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
            <Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

// Desktop Table View Skeleton - Smaller
const DesktopTableSkeleton = ({ isTablet }) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: isTablet ? 800 : 900 }}>
        {/* Table Header */}
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
          <Box sx={{ flex: 2 }}><Skeleton variant="text" width={100} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
          <Box sx={{ flex: 0.5 }}><Skeleton variant="text" width={50} height={16} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
        </Box>

        {/* Table Rows */}
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
            <Box sx={{ flex: 2 }}><Skeleton variant="text" width={180} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="rounded" width={90} height={24} sx={{ borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.2) }} /></Box>
            <Box sx={{ flex: 1 }}><Skeleton variant="text" width={70} height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }} /></Box>
            <Box sx={{ flex: 0.5 }}><Skeleton variant="circular" width={28} height={28} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2) }} /></Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Pagination Skeleton - Smaller
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

// Date Filter Skeleton - Smaller
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
      <Skeleton variant="rounded" width={130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
      <Skeleton variant="rounded" width={130} height={36} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
    </Box>
  );
};

// Items Per Page Skeleton - Smaller
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
      <Skeleton variant="rounded" width={55} height={32} sx={{ borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.2) }} />
    </Box>
  );
};

// Header Stats Skeleton - Smaller
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

const ContactList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const [showFirstRenderLoader, setShowFirstRenderLoader] = useState(true);

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

  const columns = useMemo(
    () => [
      { label: "#", key: "index" },
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Message", key: "message" },
      { label: "Status", key: "status" },
      { label: "Date", key: "date" },
      { label: "Action", key: "action" },
    ],
    []
  );

  // Mobile Card View Component - Smaller
  const MobileCardView = ({ contacts, currentPage, itemsPerPage }) => {
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
                sx={{
                  p: { xs: 1.2, sm: 1.5 },
                  mb: 1.5,
                  borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                  bgcolor: index % 2 === 0 ? theme.palette.background.paper : alpha(theme.palette.primary.main, 0.02),
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                  },
                }}
              >
                {/* Header with Index and Status */}
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
                      fontSize: '0.55rem',
                      height: 18,
                    }}
                  />
                  <FormControl size="small" sx={{ minWidth: { xs: 80, sm: 90 } }}>
                    <Select
                      value={contact.status || "pending"}
                      onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                      sx={{
                        fontSize: '0.6rem',
                        height: 22,
                        bgcolor: theme.palette.background.paper,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                        },
                      }}
                    >
                      <MenuItem value="pending" sx={{ fontSize: '0.6rem' }}>Pending</MenuItem>
                      <MenuItem value="contacted" sx={{ fontSize: '0.6rem' }}>Contacted</MenuItem>
                      <MenuItem value="replied" sx={{ fontSize: '0.6rem' }}>Replied</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Name and Email */}
                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      fontSize: '0.75rem',
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
                      fontSize: '0.6rem',
                      display: 'block',
                      wordBreak: 'break-all'
                    }}
                  >
                    {contact.email}
                  </Typography>
                </Box>

                {/* Message */}
                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: '0.5rem',
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
                      maxHeight: 80,
                      overflow: 'auto',
                      border: "1px solid",
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.65rem',
                        wordBreak: 'break-word',
                        color: 'text.primary'
                      }}
                    >
                      {contact.message}
                    </Typography>
                  </Paper>
                </Box>

                {/* Footer with Date and Action */}
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
                      fontSize: '0.5rem',
                      fontWeight: 500
                    }}
                  >
                    {formatDateDDMMYYYY(contact.createdAt)}
                  </Typography>
                  <Tooltip title="Send Email">
                    <IconButton
                      component="a"
                      href={`mailto:${contact.email}`}
                      size="small"
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        width: 26,
                        height: 26,
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.2),
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
      </Box>
    );
  };

  // Row render for table view - Smaller fonts
  const rowRender = useCallback(
    (contact, index, rowBg) => {
      const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

      return (
        <Box
          component={motion.tr}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
          sx={{
            display: "table-row",
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
            transition: "background-color 0.2s ease",
          }}
        >
          {/* Index */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 0.8, sm: 1, md: 1.2 } }}>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }, color: 'text.primary' }}>
              {globalIndex}
            </Typography>
          </TableCell>

          {/* Name */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 0.8, sm: 1, md: 1.2 } }}>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{
                fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                whiteSpace: 'nowrap',
                color: 'text.primary'
              }}
            >
              {contact.name}
            </Typography>
          </TableCell>

          {/* Email */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 0.8, sm: 1, md: 1.2 } }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                whiteSpace: 'nowrap',
                color: 'text.primary'
              }}
            >
              {contact.email}
            </Typography>
          </TableCell>

          {/* Message */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 0.8, sm: 1, md: 1.2 } }}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: { xs: 90, sm: 120, md: 150, lg: 200 },
                fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: 'text.primary'
              }}
            >
              {contact.message}
            </Typography>
          </TableCell>

          {/* Status */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 0.8, sm: 1, md: 1.2 } }}>
            <FormControl size="small" sx={{ minWidth: { xs: 80, sm: 90, md: 100 } }}>
              <Select
                value={contact.status || "pending"}
                onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                sx={{
                  fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                  height: { xs: 22, sm: 24, md: 26 },
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <MenuItem value="pending" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>Pending</MenuItem>
                <MenuItem value="contacted" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>Contacted</MenuItem>
                <MenuItem value="replied" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem' } }}>Replied</MenuItem>
              </Select>
            </FormControl>
          </TableCell>

          {/* Date */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 0.8, sm: 1, md: 1.2 }, minWidth: { xs: 70, sm: 90, md: 100 } }}>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }, color: 'text.primary' }}>
              {formatDateDDMMYYYY(contact.createdAt)}
            </Typography>
          </TableCell>

          {/* Action */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 0.8, sm: 1, md: 1.2 } }}>
            <Tooltip title="Send Email">
              <IconButton
                component="a"
                href={`mailto:${contact.email}`}
                size="small"
                sx={{
                  color: theme.palette.primary.main,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  width: 24,
                  height: 24,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <EmailIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Tooltip>
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
        <Container
          maxWidth="xl"
          disableGutters={isMobile}
          sx={{ px: { xs: 0, sm: 0, md: 0 } }}
        >
          {/* Header */}
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
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 32,
                height: 32,
              }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Table/Card View Skeleton */}
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
            <DateFilterSkeleton />
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

          {/* Table/Card View */}
          <motion.div variants={itemVariants}>
            <PaginatedTable
              title="Contact List"
              subtitle="Complete list of all contacts"
              icon={<PeopleIcon />}
              iconColor={theme.palette.primary.main}
              columns={columns}
              data={contacts}
              totalPages={pagination.totalPages || 1}
              totalCount={pagination.totalContacts || 0}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              loading={loading}
              rowRender={!isMobile ? rowRender : undefined}
              mobileCardRender={isMobile ? (contact, index) => {
                return (
                  <MobileCardView
                    contacts={[contact]}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                );
              } : undefined}
              showDateFilter={true}
              onDateChange={handleDateChange}
              currentDateRange={dateRange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
              primaryColor={theme.palette.primary.main}
            />
          </motion.div>
        </motion.div>
      </Container>

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

// TableCell component helper - Smaller
const TableCell = ({ children, sx, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      component="td"
      sx={{
        padding: { xs: "6px", sm: "8px", md: "10px" },
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