// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../../redux/slices/userSlice";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Avatar,
//   Chip,
//   Tab,
//   Tabs,
//   CircularProgress,
//   alpha,
//   IconButton,
//   Tooltip,
//   useTheme,
//   useMediaQuery,
//   Card,
//   CardContent,
//   Grid,
//   Stack,
//   Divider,
// } from "@mui/material";
// import {
//   Person as PersonIcon,
//   CheckCircle as ActiveIcon,
//   Cancel as InactiveIcon,
//   Email as EmailIcon,
//   Phone as PhoneIcon,
//   Home as HomeIcon,
//   CalendarToday as CalendarIcon,
//   ArrowBack as ArrowBackIcon,
//   Visibility as VisibilityIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { formatDateDDMMYYYY } from "../../utils/dateFormat";

// // TabPanel component
// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`user-tabpanel-${index}`}
//       aria-labelledby={`user-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ py: { xs: 1.5, md: 2 } }}>{children}</Box>}
//     </div>
//   );
// }

// // Mobile Card View Component - Smaller fonts
// const UserCard = ({ user, onCardClick, theme }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Card
//         elevation={0}
//         sx={{
//           borderRadius: 2,
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           mb: 1.5,
//           cursor: "pointer",
//           transition: "all 0.3s ease",
//           "&:hover": {
//             boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
//             borderColor: theme.palette.primary.main,
//           },
//         }}
//         onClick={() => onCardClick(user)}
//       >
//         <CardContent sx={{ p: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
//             <Avatar
//               src={user.avtar}
//               sx={{
//                 width: 44,
//                 height: 44,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 color: theme.palette.primary.main,
//                 border: "2px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.2),
//               }}
//             >
//               {user.name?.charAt(0) || <PersonIcon />}
//             </Avatar>
//             <Box sx={{ flex: 1 }}>
//               <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ fontSize: '0.9rem' }}>
//                 {user.name}
//               </Typography>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
//                 <Chip
//                   icon={user.isActive ? <ActiveIcon sx={{ fontSize: 12 }} /> : <InactiveIcon sx={{ fontSize: 12 }} />}
//                   label={user.isActive ? "Active" : "Inactive"}
//                   size="small"
//                   sx={{
//                     bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
//                     color: user.isActive ? "#22c55e" : "#ef4444",
//                     fontWeight: 600,
//                     fontSize: "0.6rem",
//                     height: 18,
//                   }}
//                 />
//               </Box>
//             </Box>
//           </Box>

//           <Stack spacing={1}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{user.email}</Typography>
//             </Box>
            
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{user.mobile_no || "—"}</Typography>
//             </Box>
            
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <HomeIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//               <Typography variant="body2" sx={{ wordBreak: "break-word", fontSize: '0.75rem' }}>
//                 {user.address || "—"}
//               </Typography>
//             </Box>
            
//             <Divider sx={{ my: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
            
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
//                 <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
//                   {formatDateDDMMYYYY(user.createdAt)}
//                 </Typography>
//               </Box>
//               <Tooltip title="View Tracking">
//                 <IconButton
//                   size="small"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onCardClick(user);
//                   }}
//                   sx={{
//                     color: theme.palette.primary.main,
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     width: 26,
//                     height: 26,
//                     "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//                   }}
//                 >
//                   <VisibilityIcon sx={{ fontSize: 14 }} />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           </Stack>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// // Desktop Table View Component - Smaller fonts with horizontal scroll
// const UserTable = ({ users, onRowClick, theme, isMobile, isTablet }) => {
//   return (
//     <TableContainer
//       component={Paper}
//       elevation={0}
//       sx={{
//         borderRadius: 2,
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         overflowX: "auto",
//         '&::-webkit-scrollbar': {
//           height: '6px',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: alpha(theme.palette.primary.main, 0.3),
//           borderRadius: '3px',
//         },
//       }}
//     >
//    <Table sx={{ minWidth: isTablet ? 1200 : 1300 }}>
//   <TableHead>
//     <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
//       <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>#</TableCell>
//       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Profile</TableCell>
//       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Name</TableCell>
//       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Email</TableCell>
//       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Mobile</TableCell>
//       <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Status</TableCell>
//       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Address</TableCell>
//       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Created</TableCell>
//       <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Updated</TableCell>
//       <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' }, color: theme.palette.primary.main, py: 1.5 }}>Actions</TableCell>
//     </TableRow>
//   </TableHead>
//   <TableBody>
//     {users.map((user, index) => (
//       <TableRow
//         key={user._id}
//         hover
//         onClick={() => onRowClick(user)}
//         sx={{
//           cursor: "pointer",
//           "&:hover": {
//             bgcolor: alpha(theme.palette.primary.main, 0.05),
//           },
//         }}
//       >
//         <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }, py: 1 }}>
//           {index + 1}
//         </TableCell>
//         <TableCell sx={{ py: 1 }}>
//           <Avatar
//             src={user.avtar}
//             sx={{
//               width: { xs: 36, sm: 38, md: 40 },
//               height: { xs: 36, sm: 38, md: 40 },
//               bgcolor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.main,
//               fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//             }}
//           >
//             {user.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
//           </Avatar>
//         </TableCell>
//         <TableCell sx={{ py: 1 }}>
//           <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' }, color: 'text.primary' }}>
//             {user.name}
//           </Typography>
//         </TableCell>
//         <TableCell sx={{ py: 1 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//             <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 14, sm: 15, md: 16 } }} />
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.secondary' }}>
//               {user.email}
//             </Typography>
//           </Box>
//         </TableCell>
//         <TableCell sx={{ py: 1 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//             <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 14, sm: 15, md: 16 } }} />
//             <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, color: 'text.secondary' }}>
//               {user.mobile_no || "—"}
//             </Typography>
//           </Box>
//         </TableCell>
//         <TableCell align="center" sx={{ py: 1 }}>
//           <Chip
//             icon={user.isActive ? <ActiveIcon sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }} /> : <InactiveIcon sx={{ fontSize: { xs: 12, sm: 13, md: 14 } }} />}
//             label={user.isActive ? "Active" : "Inactive"}
//             size="small"
//             sx={{
//               bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
//               color: user.isActive ? "#22c55e" : "#ef4444",
//               fontWeight: 600,
//               fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//               height: { xs: 22, sm: 23, md: 24 },
//             }}
//           />
//         </TableCell>
//         <TableCell sx={{ py: 1 }}>
//           <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, maxWidth: 180, color: 'text.secondary' }}>
//             {user.address || "—"}
//           </Typography>
//         </TableCell>
//         <TableCell sx={{ py: 1 }}>
//           <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.secondary' }}>
//             {formatDateDDMMYYYY(user.createdAt)}
//           </Typography>
//         </TableCell>
//         <TableCell sx={{ py: 1 }}>
//           <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }, color: 'text.secondary' }}>
//             {formatDateDDMMYYYY(user.updatedAt)}
//           </Typography>
//         </TableCell>
//         <TableCell align="center" sx={{ py: 1 }}>
//           <Tooltip title="View Tracking">
//             <IconButton
//               size="small"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onRowClick(user);
//               }}
//               sx={{
//                 color: theme.palette.primary.main,
//                 bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 width: { xs: 28, sm: 29, md: 30 },
//                 height: { xs: 28, sm: 29, md: 30 },
//                 "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//               }}
//             >
//               <VisibilityIcon sx={{ fontSize: { xs: 15, sm: 15.5, md: 16 } }} />
//             </IconButton>
//           </Tooltip>
//         </TableCell>
//       </TableRow>
//     ))}
//   </TableBody>
// </Table>
//     </TableContainer>
//   );
// };

// // Empty State Component
// const EmptyState = ({ status, theme }) => (
//   <Paper
//     elevation={0}
//     sx={{
//       p: { xs: 3, md: 4 },
//       borderRadius: 2,
//       textAlign: "center",
//       border: "1px solid",
//       borderColor: alpha(theme.palette.primary.main, 0.1),
//     }}
//   >
//     <PersonIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
//     <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: '0.9rem' }}>
//       No {status.toLowerCase()} users found
//     </Typography>
//     <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
//       There are no {status.toLowerCase()} users in this organization.
//     </Typography>
//   </Paper>
// );

// const ListUsers = () => {
//   const { adminId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  
//   const { usersList = [], loading } = useSelector((state) => state.user || {});
//   const [tabValue, setTabValue] = useState(0);

//   useEffect(() => {
//     if (adminId) {
//       dispatch(getAllUsers(adminId));
//     }
//   }, [adminId, dispatch]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleRowClick = (user) => {
//     navigate("/trackingdata", { state: { item: user } });
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const activeUsers = usersList.filter((user) => user.isActive);
//   const inactiveUsers = usersList.filter((user) => !user.isActive);

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
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.default, 1)} 100%)`,
//       }}
//     >
//       {/* Custom Header */}
//       <Paper
//         elevation={0}
//         sx={{
//           py: { xs: 1, md: 1.5 },
//           px: { xs: 1.5, md: 2.5 },
//           borderRadius: 0,
//           borderBottom: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           bgcolor: "background.paper",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <IconButton
//             onClick={handleBack}
//             size="small"
//             sx={{
//               color: theme.palette.primary.main,
//               width: 32,
//               height: 32,
//               "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             }}
//           >
//             <ArrowBackIcon sx={{ fontSize: 18 }} />
//           </IconButton>
//           <Typography 
//             variant="h6"
//             fontWeight={600} 
//             sx={{ 
//               fontSize: { xs: "1rem", md: "1.2rem" },
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Organization Users
//           </Typography>
//         </Box>
//       </Paper>

//       <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 3 } }}>
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header Section */}
//           {/* <motion.div variants={itemVariants}>
//             <Box sx={{ mb: { xs: 1.5, md: 3 } }}>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//                 Admin ID: {adminId}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: '0.7rem' }}>
//                 View and manage all users under this organization
//               </Typography>
//             </Box>
//           </motion.div> */}

//           {/* Summary Cards - Smaller */}
//           <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 12 : 20 }}>
//             <Grid container spacing={1}>
//               <Grid item xs={4}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: { xs: 1, md: 1.5 },
//                     borderRadius: 1.5,
//                     bgcolor: alpha(theme.palette.primary.main, 0.05),
//                     border: "1px solid",
//                     borderColor: alpha(theme.palette.primary.main, 0.2),
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                     Total
//                   </Typography>
//                   <Typography variant="body1" fontWeight={700} color={theme.palette.primary.main} sx={{ fontSize: '1rem' }}>
//                     {usersList.length}
//                   </Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={4}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: { xs: 1, md: 1.5 },
//                     borderRadius: 1.5,
//                     bgcolor: alpha("#22c55e", 0.05),
//                     border: "1px solid",
//                     borderColor: alpha("#22c55e", 0.2),
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                     Active
//                   </Typography>
//                   <Typography variant="body1" fontWeight={700} color="#22c55e" sx={{ fontSize: '1rem' }}>
//                     {activeUsers.length}
//                   </Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={4}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     p: { xs: 1, md: 1.5 },
//                     borderRadius: 1.5,
//                     bgcolor: alpha("#ef4444", 0.05),
//                     border: "1px solid",
//                     borderColor: alpha("#ef4444", 0.2),
//                     textAlign: "center",
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
//                     Inactive
//                   </Typography>
//                   <Typography variant="body1" fontWeight={700} color="#ef4444" sx={{ fontSize: '1rem' }}>
//                     {inactiveUsers.length}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </motion.div>

//           {/* Tabs */}
//           <motion.div variants={itemVariants}>
//             <Paper
//               elevation={0}
//               sx={{
//                 borderRadius: 2,
//                 border: "1px solid",
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 overflow: "hidden",
//               }}
//             >
//               <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1), px: { xs: 1, md: 2 } }}>
//                 <Tabs
//                   value={tabValue}
//                   onChange={handleTabChange}
//                   variant={isMobile ? "fullWidth" : "standard"}
//                   sx={{
//                     "& .MuiTab-root": {
//                       textTransform: "none",
//                       fontWeight: 600,
//                       fontSize: { xs: "0.65rem", md: "0.8rem" },
//                       minHeight: { xs: 42, md: 48 },
//                       px: { xs: 1, md: 2 },
//                     },
//                     "& .Mui-selected": {
//                       color: `${theme.palette.primary.main} !important`,
//                     },
//                     "& .MuiTabs-indicator": {
//                       bgcolor: theme.palette.primary.main,
//                     },
//                   }}
//                 >
//                   <Tab
//                     label={
//                       <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
//                         <ActiveIcon sx={{ color: "#22c55e", fontSize: { xs: 14, md: 16 } }} />
//                         <span>{!isMobile ? "Active Users" : "Active"}</span>
//                         <Chip
//                           label={activeUsers.length}
//                           size="small"
//                           sx={{
//                             bgcolor: alpha("#22c55e", 0.1),
//                             color: "#22c55e",
//                             fontWeight: 600,
//                             fontSize: '0.55rem',
//                             height: 16,
//                           }}
//                         />
//                       </Box>
//                     }
//                   />
//                   <Tab
//                     label={
//                       <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
//                         <InactiveIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 14, md: 16 } }} />
//                         <span>{!isMobile ? "Inactive Users" : "Inactive"}</span>
//                         <Chip
//                           label={inactiveUsers.length}
//                           size="small"
//                           sx={{
//                             bgcolor: alpha(theme.palette.text.secondary, 0.1),
//                             color: theme.palette.text.secondary,
//                             fontWeight: 600,
//                             fontSize: '0.55rem',
//                             height: 16,
//                           }}
//                         />
//                       </Box>
//                     }
//                   />
//                 </Tabs>
//               </Box>

//               {/* Tab Panels */}
//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, md: 6 } }}>
//                   <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
//                 </Box>
//               ) : (
//                 <>
//                   <TabPanel value={tabValue} index={0}>
//                     {activeUsers.length === 0 ? (
//                       <EmptyState status="Active" theme={theme} />
//                     ) : isMobile ? (
//                       <Box sx={{ px: 1 }}>
//                         {activeUsers.map((user) => (
//                           <UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />
//                         ))}
//                       </Box>
//                     ) : (
//                       <UserTable users={activeUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} />
//                     )}
//                   </TabPanel>
//                   <TabPanel value={tabValue} index={1}>
//                     {inactiveUsers.length === 0 ? (
//                       <EmptyState status="Inactive" theme={theme} />
//                     ) : isMobile ? (
//                       <Box sx={{ px: 1 }}>
//                         {inactiveUsers.map((user) => (
//                           <UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />
//                         ))}
//                       </Box>
//                     ) : (
//                       <UserTable users={inactiveUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} />
//                     )}
//                   </TabPanel>
//                 </>
//               )}
//             </Paper>
//           </motion.div>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default ListUsers;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { getPaymentHistory } from "../../redux/slices/paymentSlice";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Tab,
  Tabs,
  CircularProgress,
  alpha,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
  History as HistoryIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";
import moment from "moment";

// TabPanel component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: { xs: 1.5, md: 2 } }}>{children}</Box>}
    </div>
  );
}

// Mobile Card View Component
const UserCard = ({ user, onCardClick, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          mb: 1.5,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
            borderColor: theme.palette.primary.main,
          },
        }}
        onClick={() => onCardClick(user)}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Avatar
              src={user.avtar}
              sx={{
                width: 44,
                height: 44,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: "2px solid",
                borderColor: alpha(theme.palette.primary.main, 0.2),
              }}
            >
              {user.name?.charAt(0) || <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ fontSize: "0.9rem" }}>
                {user.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Chip
                  icon={user.isActive ? <ActiveIcon sx={{ fontSize: 12 }} /> : <InactiveIcon sx={{ fontSize: 12 }} />}
                  label={user.isActive ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
                    color: user.isActive ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                    fontSize: "0.6rem",
                    height: 18,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{user.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>{user.mobile_no || "—"}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HomeIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
              <Typography variant="body2" sx={{ wordBreak: "break-word", fontSize: "0.75rem" }}>
                {user.address || "—"}
              </Typography>
            </Box>

            <Divider sx={{ my: 1, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 14 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                  {formatDateDDMMYYYY(user.createdAt)}
                </Typography>
              </Box>
              <Tooltip title="View Tracking">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(user);
                  }}
                  sx={{
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    width: 26,
                    height: 26,
                    "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Desktop Table View Component
const UserTable = ({ users, onRowClick, theme, isMobile, isTablet }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: "3px",
        },
      }}
    >
      <Table sx={{ minWidth: isTablet ? 1200 : 1300 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            {["#", "Profile", "Name", "Email", "Mobile", "Status", "Address", "Created", "Updated", "Actions"].map(
              (col) => (
                <TableCell
                  key={col}
                  align={["#", "Status", "Actions"].includes(col) ? "center" : "left"}
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "0.8rem", sm: "0.85rem", md: "1rem" },
                    color: theme.palette.primary.main,
                    py: 1.5,
                  }}
                >
                  {col}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user._id}
              hover
              onClick={() => onRowClick(user)}
              sx={{
                cursor: "pointer",
                "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) },
              }}
            >
              <TableCell align="center" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" }, py: 1 }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Avatar
                  src={user.avtar}
                  sx={{
                    width: { xs: 36, sm: 38, md: 40 },
                    height: { xs: 36, sm: 38, md: 40 },
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  }}
                >
                  {user.name?.charAt(0) || <PersonIcon />}
                </Avatar>
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" } }}>
                  {user.name}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <EmailIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 14, sm: 15, md: 16 } }} />
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>
                    {user.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <PhoneIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 14, sm: 15, md: 16 } }} />
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>
                    {user.mobile_no || "—"}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ py: 1 }}>
                <Chip
                  icon={user.isActive ? <ActiveIcon sx={{ fontSize: 13 }} /> : <InactiveIcon sx={{ fontSize: 13 }} />}
                  label={user.isActive ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
                    color: user.isActive ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                    fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
                    height: { xs: 22, sm: 23, md: 24 },
                  }}
                />
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, maxWidth: 180, color: "text.secondary" }}>
                  {user.address || "—"}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
                  {formatDateDDMMYYYY(user.createdAt)}
                </Typography>
              </TableCell>
              <TableCell sx={{ py: 1 }}>
                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
                  {formatDateDDMMYYYY(user.updatedAt)}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ py: 1 }}>
                <Tooltip title="View Tracking">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick(user);
                    }}
                    sx={{
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      width: { xs: 28, sm: 29, md: 30 },
                      height: { xs: 28, sm: 29, md: 30 },
                      "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: { xs: 15, sm: 15.5, md: 16 } }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Plan History Table Component
const PlanHistoryTable = ({ payments, onViewPayment, theme, isMobile, isTablet }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        overflowX: "auto",
        "&::-webkit-scrollbar": { height: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.3),
          borderRadius: "3px",
        },
      }}
    >
      <Table sx={{ minWidth: isTablet ? 1200 : 1300 }}>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            {[
              { label: "#", align: "center" },
              { label: "User", align: "left" },
              { label: "Plan", align: "left" },
              { label: "Original Amount", align: "right" },
              { label: "Discount", align: "right" },
              { label: "Paid Amount", align: "right" },
              { label: "Payment Status", align: "center" },
              { label: "Plan Status", align: "center" },
              { label: "Payment Date", align: "left" },
              { label: "Expires On", align: "left" },
              { label: "Actions", align: "center" },
            ].map(({ label, align }) => (
              <TableCell
                key={label}
                align={align}
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.85rem" },
                  color: theme.palette.primary.main,
                  py: 1.5,
                }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment, index) => {
            const originalAmount = payment.originalAmount || payment.amount;
            const discountAmount = payment.discountAmount || 0;
            const paidAmount = payment.amount;
            const isExpired = payment.isExpired || payment.planExpired;

            return (
              <TableRow
                key={payment._id}
                hover
                sx={{
                  cursor: "pointer",
                  bgcolor: isExpired ? alpha("#ef4444", 0.03) : "transparent",
                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                }}
              >
                <TableCell align="center" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, py: 1 }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={payment.adminId?.avtar}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    >
                      {payment.adminId?.name?.charAt(0) || <PersonIcon sx={{ fontSize: 16 }} />}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" } }}>
                        {payment.adminId?.name || "Unknown"}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
                        {payment.adminId?.email || ""}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, fontWeight: 500 }}>
                    {payment.planId?.name || "Add On Plan"}
                  </Typography>
                  {payment.duration && (
                    <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
                      {payment.duration}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>
                    ₹{originalAmount?.toLocaleString("en-IN") || 0}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  {discountAmount > 0 ? (
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "#22c55e" }}>
                      -₹{discountAmount.toLocaleString("en-IN")}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "text.secondary" }}>
                      —
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right" sx={{ py: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }, color: "success.main" }}>
                    ₹{paidAmount?.toLocaleString("en-IN") || 0}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Chip
                    label={
                      payment.status === "completed"
                        ? "Completed"
                        : payment.status === "pending"
                        ? "Pending"
                        : "Failed"
                    }
                    size="small"
                    sx={{
                      bgcolor:
                        payment.status === "completed"
                          ? alpha("#22c55e", 0.1)
                          : payment.status === "pending"
                          ? alpha("#eab308", 0.1)
                          : alpha("#ef4444", 0.1),
                      color:
                        payment.status === "completed"
                          ? "#22c55e"
                          : payment.status === "pending"
                          ? "#eab308"
                          : "#ef4444",
                      fontWeight: 600,
                      fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                      height: { xs: 20, sm: 22, md: 24 },
                    }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Chip
                    label={isExpired ? "Expired" : "Active"}
                    size="small"
                    sx={{
                      bgcolor: isExpired ? alpha("#ef4444", 0.1) : alpha("#22c55e", 0.1),
                      color: isExpired ? "#ef4444" : "#22c55e",
                      fontWeight: 600,
                      fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                      height: { xs: 20, sm: 22, md: 24 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
                    {moment(payment.createdAt).format("DD MMM YYYY")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" }, color: "text.secondary" }}>
                    {payment.expiresAt ? moment(payment.expiresAt).format("DD MMM YYYY") : "—"}
                  </Typography>
                  {payment.remainingDays > 0 && (
                    <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "success.main" }}>
                      {payment.remainingDays} days left
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center" sx={{ py: 1 }}>
                  <Tooltip title="View Payment Details">
                    <IconButton
                      size="small"
                      onClick={() => onViewPayment(payment)}
                      sx={{
                        color: theme.palette.primary.main,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        width: { xs: 28, sm: 29, md: 30 },
                        height: { xs: 28, sm: 29, md: 30 },
                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                      }}
                    >
                      <ReceiptIcon sx={{ fontSize: { xs: 15, sm: 15.5, md: 16 } }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Mobile Plan History Card View
const PlanHistoryCard = ({ payment, onViewPayment, theme }) => {
  const originalAmount = payment.originalAmount || payment.amount;
  const discountAmount = payment.discountAmount || 0;
  const paidAmount = payment.amount;
  const isExpired = payment.isExpired || payment.planExpired;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          mb: 1.5,
          cursor: "pointer",
          transition: "all 0.3s ease",
          bgcolor: isExpired ? alpha("#ef4444", 0.03) : "transparent",
          "&:hover": {
            boxShadow: `0 10px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
            borderColor: theme.palette.primary.main,
          },
        }}
        onClick={() => onViewPayment(payment)}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Avatar
              src={payment.adminId?.avtar}
              sx={{
                width: 44,
                height: 44,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              }}
            >
              {payment.adminId?.name?.charAt(0) || <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ fontSize: "0.9rem" }}>
                {payment.adminId?.name || "Unknown"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                {payment.adminId?.email || ""}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Plan:</Typography>
              <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.75rem" }}>
                {payment.planId?.name || "Add On Plan"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Original:</Typography>
              <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                ₹{originalAmount?.toLocaleString("en-IN") || 0}
              </Typography>
            </Box>

            {discountAmount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Discount:</Typography>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: "#22c55e" }}>
                  -₹{discountAmount.toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Paid:</Typography>
              <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem", color: "success.main" }}>
                ₹{paidAmount?.toLocaleString("en-IN") || 0}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Payment Status:</Typography>
              <Chip
                label={
                  payment.status === "completed"
                    ? "Completed"
                    : payment.status === "pending"
                    ? "Pending"
                    : "Failed"
                }
                size="small"
                sx={{
                  bgcolor:
                    payment.status === "completed"
                      ? alpha("#22c55e", 0.1)
                      : payment.status === "pending"
                      ? alpha("#eab308", 0.1)
                      : alpha("#ef4444", 0.1),
                  color:
                    payment.status === "completed"
                      ? "#22c55e"
                      : payment.status === "pending"
                      ? "#eab308"
                      : "#ef4444",
                  fontWeight: 600,
                  fontSize: "0.6rem",
                  height: 18,
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>Plan Status:</Typography>
              <Chip
                label={isExpired ? "Expired" : "Active"}
                size="small"
                sx={{
                  bgcolor: isExpired ? alpha("#ef4444", 0.1) : alpha("#22c55e", 0.1),
                  color: isExpired ? "#ef4444" : "#22c55e",
                  fontWeight: 600,
                  fontSize: "0.6rem",
                  height: 18,
                }}
              />
            </Box>

            <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.primary.main, 0.1) }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CalendarIcon sx={{ color: theme.palette.primary.main, fontSize: 12 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                  {moment(payment.createdAt).format("DD MMM YYYY")}
                </Typography>
              </Box>
              {payment.expiresAt && (
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>
                  Expires: {moment(payment.expiresAt).format("DD MMM YYYY")}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
              <Tooltip title="View Details">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewPayment(payment);
                  }}
                  sx={{
                    color: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    width: 26,
                    height: 26,
                  }}
                >
                  <ReceiptIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ status, icon: Icon, theme }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 3, md: 4 },
      borderRadius: 2,
      textAlign: "center",
      border: "1px solid",
      borderColor: alpha(theme.palette.primary.main, 0.1),
    }}
  >
    <Icon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.3), mb: 1.5 }} />
    <Typography variant="body1" color="text.secondary" gutterBottom sx={{ fontSize: "0.9rem" }}>
      No {status.toLowerCase()} found
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
      There are no {status.toLowerCase()} records to display.
    </Typography>
  </Paper>
);

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const ListUsers = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const { usersList = [], loading } = useSelector((state) => state.user || {});

  // ✅ FIX: getPaymentHistory thunk stores into paymentHistory + historyLoading (not allPaymentHistory)
  const { paymentHistory = [], historyLoading: allPaymentHistoryLoading } = useSelector(
    (state) => state.payment || {}
  );

  // Alias for use throughout the component
  const allPaymentHistory = Array.isArray(paymentHistory) ? paymentHistory : [];

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (adminId) {
      dispatch(getAllUsers(adminId));
      dispatch(getPaymentHistory({ adminId, page: 1, limit: 100 }));
    }
  }, [adminId, dispatch]);

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  const handleRowClick = (user) => navigate("/trackingdata", { state: { item: user } });

  const handleViewPayment = (payment) =>
    navigate("/admin/payment-details", { state: { payment } });

  const handleBack = () => navigate(-1);

  const activeUsers = usersList.filter((u) => u.isActive);
  const inactiveUsers = usersList.filter((u) => !u.isActive);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
          theme.palette.background.default,
          1
        )} 100%)`,
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          py: { xs: 1, md: 1.5 },
          px: { xs: 1.5, md: 2.5 },
          borderRadius: 0,
          borderBottom: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            onClick={handleBack}
            size="small"
            sx={{
              color: theme.palette.primary.main,
              width: 32,
              height: 32,
              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Organization Users
          </Typography>
        </Box>
      </Paper>

      <Container maxWidth="xl" sx={{ py: { xs: 1.5, md: 3 } }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Summary Cards */}
          <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 12 : 20 }}>
            <Grid container spacing={1}>
              {[
                { label: "Total Users", value: usersList.length, color: theme.palette.primary.main, bg: alpha(theme.palette.primary.main, 0.05), border: alpha(theme.palette.primary.main, 0.2) },
                { label: "Active", value: activeUsers.length, color: "#22c55e", bg: alpha("#22c55e", 0.05), border: alpha("#22c55e", 0.2) },
                { label: "Inactive", value: inactiveUsers.length, color: "#ef4444", bg: alpha("#ef4444", 0.05), border: alpha("#ef4444", 0.2) },
              ].map(({ label, value, color, bg, border }) => (
                <Grid item xs={4} key={label}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1, md: 1.5 },
                      borderRadius: 1.5,
                      bgcolor: bg,
                      border: "1px solid",
                      borderColor: border,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.55rem" }}>
                      {label}
                    </Typography>
                    <Typography variant="body1" fontWeight={700} color={color} sx={{ fontSize: "1rem" }}>
                      {value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.1),
                overflow: "hidden",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1), px: { xs: 1, md: 2 } }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant={isMobile ? "fullWidth" : "standard"}
                  sx={{
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: { xs: "0.65rem", md: "0.8rem" },
                      minHeight: { xs: 42, md: 48 },
                      px: { xs: 1, md: 2 },
                    },
                    "& .Mui-selected": { color: `${theme.palette.primary.main} !important` },
                    "& .MuiTabs-indicator": { bgcolor: theme.palette.primary.main },
                  }}
                >
                  {/* Tab 0 – Active Users */}
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
                        <ActiveIcon sx={{ color: "#22c55e", fontSize: { xs: 14, md: 16 } }} />
                        <span>{isMobile ? "Active" : "Active Users"}</span>
                        <Chip
                          label={activeUsers.length}
                          size="small"
                          sx={{ bgcolor: alpha("#22c55e", 0.1), color: "#22c55e", fontWeight: 600, fontSize: "0.55rem", height: 16 }}
                        />
                      </Box>
                    }
                  />

                  {/* Tab 1 – Inactive Users */}
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
                        <InactiveIcon sx={{ color: theme.palette.text.secondary, fontSize: { xs: 14, md: 16 } }} />
                        <span>{isMobile ? "Inactive" : "Inactive Users"}</span>
                        <Chip
                          label={inactiveUsers.length}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.text.secondary, 0.1),
                            color: theme.palette.text.secondary,
                            fontWeight: 600,
                            fontSize: "0.55rem",
                            height: 16,
                          }}
                        />
                      </Box>
                    }
                  />

                  {/* Tab 2 – Plan History */}
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
                        <HistoryIcon sx={{ color: theme.palette.info.main, fontSize: { xs: 14, md: 16 } }} />
                        <span>{isMobile ? "History" : "Plan History"}</span>
                        <Chip
                          label={allPaymentHistory.length}
                          size="small"
                          sx={{
                            bgcolor: alpha(theme.palette.info.main, 0.1),
                            color: theme.palette.info.main,
                            fontWeight: 600,
                            fontSize: "0.55rem",
                            height: 16,
                          }}
                        />
                      </Box>
                    }
                  />
                </Tabs>
              </Box>

              {/* Tab Panels */}
              {loading && tabValue !== 2 ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, md: 6 } }}>
                  <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
                </Box>
              ) : (
                <>
                  {/* Active Users */}
                  <TabPanel value={tabValue} index={0}>
                    {activeUsers.length === 0 ? (
                      <EmptyState status="active users" icon={PersonIcon} theme={theme} />
                    ) : isMobile ? (
                      <Box sx={{ px: 1 }}>
                        {activeUsers.map((user) => (
                          <UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />
                        ))}
                      </Box>
                    ) : (
                      <UserTable users={activeUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} />
                    )}
                  </TabPanel>

                  {/* Inactive Users */}
                  <TabPanel value={tabValue} index={1}>
                    {inactiveUsers.length === 0 ? (
                      <EmptyState status="inactive users" icon={PersonIcon} theme={theme} />
                    ) : isMobile ? (
                      <Box sx={{ px: 1 }}>
                        {inactiveUsers.map((user) => (
                          <UserCard key={user._id} user={user} onCardClick={handleRowClick} theme={theme} />
                        ))}
                      </Box>
                    ) : (
                      <UserTable users={inactiveUsers} onRowClick={handleRowClick} theme={theme} isMobile={isMobile} isTablet={isTablet} />
                    )}
                  </TabPanel>

                  {/* Plan History */}
                  <TabPanel value={tabValue} index={2}>
                    {allPaymentHistoryLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 3, md: 6 } }}>
                        <CircularProgress size={28} sx={{ color: theme.palette.primary.main }} />
                      </Box>
                    ) : allPaymentHistory.length === 0 ? (
                      <EmptyState status="payment history" icon={HistoryIcon} theme={theme} />
                    ) : isMobile ? (
                      <Box sx={{ px: 1 }}>
                        {allPaymentHistory.map((payment) => (
                          <PlanHistoryCard key={payment._id} payment={payment} onViewPayment={handleViewPayment} theme={theme} />
                        ))}
                      </Box>
                    ) : (
                      <PlanHistoryTable
                        payments={allPaymentHistory}
                        onViewPayment={handleViewPayment}
                        theme={theme}
                        isMobile={isMobile}
                        isTablet={isTablet}
                      />
                    )}
                  </TabPanel>
                </>
              )}
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ListUsers;