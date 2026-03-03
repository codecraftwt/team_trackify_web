// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Box,
//   Typography,
//   Avatar,
//   Tooltip,
//   IconButton,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   Payment as PaymentIcon,
//   Assessment as AssessmentIcon,
//   Person as PersonIcon,
//   Business as BusinessIcon,
//   AttachMoney as MoneyIcon,
//   PriceChange as PlanIcon,
//   Contacts as ContactIcon,
//   Logout as LogoutIcon,
//   Receipt as ReceiptIcon,           
//   Description as ReportIcon,       
//   ManageAccounts as ProfileIcon,
//   ChevronLeft as ChevronLeftIcon,
// } from '@mui/icons-material';
// import { logout } from '../../redux/slices/authSlice';

// const Sidebar = ({ collapsed = false, mobileOpen = false, onClose, isMobile = false }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, role_id } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//     onClose?.();
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     if (isMobile) {
//       onClose?.();
//     }
//   };

//   // Admin Menu Items
//   const adminMenuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
//     { text: 'User Management', icon: <PeopleIcon />, path: '/user' },
//     { text: 'Payment Plans', icon: <PaymentIcon  />, path: '/admin/payments-plans' },
//     { text: 'Transaction History', icon: <ReportIcon  />, path: '/admin/transactionhistory' },
//     { text: 'Reports', icon: <ReceiptIcon  />, path: '/admin/reports' },
//     { text: 'Profile Manager', icon: <ProfileIcon  />, path: '/profile' },
//   ];

//   // Super Admin Menu Items
//   const superAdminMenuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin/dashboard' },
//     { text: 'Organization Details', icon: <BusinessIcon />, path: '/user' },
//     // { text: 'Organization Details', icon: <BusinessIcon />, path: '/super-admin/organization' },
//     { text: 'Revenue Analytics', icon: <MoneyIcon />, path: '/super-admin/revenue' },
//     { text: 'Plan Management', icon: <PlanIcon />, path: '/super-admin/plans' },
//     { text: 'Contact List', icon: <ContactIcon />, path: '/super-admin/contacts' },
//     { text: 'Profile Manager', icon: <PersonIcon />, path: '/profile' },
//   ];

//   // Get menu items based on role
//   const menuItems = role_id === 2 ? superAdminMenuItems : adminMenuItems;
//   const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

//   const isActive = (path) => location.pathname === path;

//   const sidebarContent = (
//     <Box
//       sx={{
//         height: '100%',
//         width: isMobile ? 280 : (collapsed ? 72 : 280),
//         display: 'flex',
//         flexDirection: 'column',
//         bgcolor: '#0f766e',
//         color: 'white',
//         transition: 'width 0.3s ease',
//         overflowX: 'hidden',
//         boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
//         borderRadius: 0,
//       }}
//     >
//       {/* Header / Logo */}
//       <Box
//         sx={{
//           p: isMobile ? 2 : (collapsed ? 2 : 2.5),
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: isMobile ? 'space-between' : (collapsed ? 'center' : 'flex-start'),
//           gap: 1.5,
//           borderBottom: '1px solid rgba(255,255,255,0.08)',
//           minHeight: 64,

//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//           <Avatar
//             sx={{
//               bgcolor: 'rgba(255,255,255,0.25)',
//               width: isMobile ? 35 : 40,
//               height: isMobile ? 35 : 40,
//               fontWeight: 'bold',
//               fontSize: isMobile ? '0.9rem' : '1rem',
//             }}
//           >
//             TT
//           </Avatar>

//           {(!collapsed || isMobile) && (
//             <Box >
//               <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
//                 Team Trackify
//               </Typography>
//               <Typography variant="caption" sx={{ opacity: 0.7, fontSize: isMobile ? '0.65rem' : '0.7rem' }}>
//                 {roleName}
//               </Typography>
//             </Box>
//           )}
//         </Box>

//         {/* Close button for mobile */}
//         {isMobile && (
//           <IconButton onClick={onClose} sx={{ color: 'white' }}>
//             <ChevronLeftIcon />
//           </IconButton>
//         )}
//       </Box>

//       {/* User Info - Always show on desktop, show on mobile when not collapsed */}
//       {(!collapsed || isMobile) && (
//         <Box sx={{ px: isMobile ? 2 : 2.5, py: isMobile ? 1.5 : 2 }}>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: isMobile ? 1.5 : 2,
//               bgcolor: 'rgba(255,255,255,0.08)',
//               p: isMobile ? 1 : 1.5,
//               borderRadius: 1.5,
//             }}
//           >
//             <Avatar
//               src={user?.avtar}
//               sx={{ 
//                 bgcolor: '#2dd4bf',
//                 width: isMobile ? 32 : 40,
//                 height: isMobile ? 32 : 40,
//                 fontSize: isMobile ? '0.8rem' : '0.9rem',
//               }}
//             >
//               {user?.name?.charAt(0) || 'A'}
//             </Avatar>
//             <Box sx={{ minWidth: 0 }}>
//               <Typography variant="body2" fontWeight={500} noWrap sx={{ fontSize: isMobile ? '0.8rem' : '0.85rem' }}>
//                 {user?.name || 'Admin User'}
//               </Typography>
//               <Typography variant="caption" sx={{ opacity: 0.75 }} noWrap>
//                 {user?.email || 'admin@trackify.in'}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* Menu Items */}
//       <List sx={{ flexGrow: 1, pt: 1, px: isMobile ? 1 : (collapsed ? 1 : 1.5), pb: 1 }}>
//         {menuItems.map((item) => {
//           const active = isActive(item.path);

//           return (
//             <Tooltip
//               key={item.text}
//               title={collapsed && !isMobile ? item.text : ''}
//               placement="right"
//               arrow
//             >
//               <ListItem disablePadding sx={{ mb: 0.5 }}>
//                 <ListItemButton
//                   onClick={() => handleNavigation(item.path)}
//                   sx={{
//                     minHeight: isMobile ? 44 : 48,
//                     borderRadius: 1,
//                     justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
//                     px: (collapsed && !isMobile) ? 0 : (isMobile ? 1.5 : 2.5),
//                     py: isMobile ? 1 : 1.2,
//                     mx: (collapsed && !isMobile) ? 0.5 : 0,
//                     bgcolor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
//                     '&:hover': {
//                       bgcolor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
//                     },
//                     position: 'relative',
//                     transition: 'all 0.18s ease',
//                   }}
//                 >
//                   {/* Active indicator line */}
//                   {active && !collapsed && !isMobile && (
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         left: 0,
//                         top: '50%',
//                         transform: 'translateY(-50%)',
//                         width: 4,
//                         height: '60%',
//                         bgcolor: '#5eead4',
//                         borderRadius: '0 4px 4px 0',
//                       }}
//                     />
//                   )}

//                   <ListItemIcon
//                     sx={{
//                       minWidth: (collapsed && !isMobile) ? 'auto' : (isMobile ? 32 : 40),
//                       color: active ? '#a7f3d0' : 'inherit',
//                       '& svg': {
//                         fontSize: isMobile ? '1.2rem' : '1.3rem',
//                       },
//                     }}
//                   >
//                     {item.icon}
//                   </ListItemIcon>

//                   {(!collapsed || isMobile) && (
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{
//                         fontWeight: active ? 600 : 400,
//                         fontSize: isMobile ? '0.8rem' : '0.95rem',
//                         color: active ? '#d1fae5' : 'white',
//                       }}
//                     />
//                   )}
//                 </ListItemButton>
//               </ListItem>
//             </Tooltip>
//           );
//         })}
//       </List>

//       <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: isMobile ? 1.5 : 2, my: 0 }} />

//       {/* Logout */}
//       <Box sx={{ 
//         p: (collapsed && !isMobile) ? 1.5 : (isMobile ? 1.5 : 2), 
//         pb: (collapsed && !isMobile) ? 1.5 : (isMobile ? 1.5 : 1.5) 
//       }}>
//         <Tooltip title={collapsed && !isMobile ? 'Logout' : ''} placement="right" arrow>
//           <ListItemButton
//             onClick={handleLogout}
//             sx={{
//               borderRadius: 1,
//               justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
//               px: (collapsed && !isMobile) ? 0 : (isMobile ? 1.5 : 2.5),
//               py: isMobile ? 1 : 1.2,
//               mx: (collapsed && !isMobile) ? 0.5 : 0,
//               '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
//             }}
//           >
//             <ListItemIcon sx={{ 
//               minWidth: (collapsed && !isMobile) ? 'auto' : (isMobile ? 32 : 40),
//               '& svg': { fontSize: isMobile ? '1.2rem' : '1.3rem' },
//             }}>
//               <LogoutIcon />
//             </ListItemIcon>
//             {(!collapsed || isMobile) && <ListItemText primary="Logout" />}
//           </ListItemButton>
//         </Tooltip>
//       </Box>

//       {/* Footer Copyright */}
//       {/* {!collapsed && !isMobile && (
//         <Box sx={{ px: 2, pb: 2, pt: 1, textAlign: 'center' }}>
//           <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.75rem' }}>
//             © {new Date().getFullYear()} Team Trackify
//           </Typography>
//         </Box>
//       )} */}
//     </Box>
//   );

//   // IMPORTANT FIX: Always render the sidebar content directly on desktop
//   // Only use Drawer for mobile
//   if (isMobile) {
//     return (
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={onClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': {
//             width: 280,
//             boxSizing: 'border-box',
//             bgcolor: 'transparent',
//           },
//         }}
//       >
//         {sidebarContent}
//       </Drawer>
//     );
//   }

//   // On desktop, render the sidebar directly (not inside a Drawer)
//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         left: 0,
//         top: 0,
//         height: '100vh',
//         zIndex: 1200,
//       }}
//     >
//       {sidebarContent}
//     </Box>
//   );
// };

// export default Sidebar;








// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Box,
//   Typography,
//   Avatar,
//   Tooltip,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   People as PeopleIcon,
//   Payment as PaymentIcon,
//   Assessment as AssessmentIcon,
//   Person as PersonIcon,
//   Business as BusinessIcon,
//   AttachMoney as MoneyIcon,
//   PriceChange as PlanIcon,
//   Contacts as ContactIcon,
//   Logout as LogoutIcon,
//   Receipt as ReceiptIcon,           
//   Description as ReportIcon,       
//   ManageAccounts as ProfileIcon,
//   ChevronLeft as ChevronLeftIcon,
// } from '@mui/icons-material';
// import { logout } from '../../redux/slices/authSlice';

// const Sidebar = ({ collapsed = false, mobileOpen = false, onClose, isMobile = false }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
  
//   // Responsive breakpoints for mobile width
//   const isSmallMobile = useMediaQuery('(max-width:480px)');
//   const isMediumMobile = useMediaQuery('(min-width:481px) and (max-width:600px)');
  
//   const { user, role_id } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//     onClose?.();
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     if (isMobile) {
//       onClose?.();
//     }
//   };

//   // Admin Menu Items
//   const adminMenuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
//     { text: 'User Management', icon: <PeopleIcon />, path: '/user' },
//     { text: 'Payment Plans', icon: <PaymentIcon  />, path: '/admin/payments-plans' },
//     { text: 'Transaction History', icon: <ReportIcon  />, path: '/admin/transactionhistory' },
//     { text: 'Reports', icon: <ReceiptIcon  />, path: '/admin/reports' },
//     { text: 'Profile Manager', icon: <ProfileIcon  />, path: '/profile' },
//   ];

//   // Super Admin Menu Items
//   const superAdminMenuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin/dashboard' },
//     { text: 'Organization Details', icon: <BusinessIcon />, path: '/user' },
//     { text: 'Revenue Analytics', icon: <MoneyIcon />, path: '/super-admin/revenue' },
//     { text: 'Plan Management', icon: <PlanIcon />, path: '/super-admin/plans' },
//     { text: 'Contact List', icon: <ContactIcon />, path: '/super-admin/contacts' },
//     { text: 'Profile Manager', icon: <PersonIcon />, path: '/profile' },
//   ];

//   // Get menu items based on role
//   const menuItems = role_id === 2 ? superAdminMenuItems : adminMenuItems;
//   const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

//   const isActive = (path) => location.pathname === path;

//   // Determine mobile drawer width
//   const getMobileWidth = () => {
//     if (isSmallMobile) return 240; 
//     if (isMediumMobile) return 260;
//     return 280; 
//   };

//   const sidebarContent = (
//     <Box
//       sx={{
//         height: '100%',
//         width: isMobile ? getMobileWidth() : (collapsed ? 72 : 280),
//         display: 'flex',
//         flexDirection: 'column',
//         bgcolor: '#0f766e',
//         color: 'white',
//         transition: 'width 0.3s ease',
//         overflowX: 'hidden',
//         boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
//         borderRadius: 0,
//       }}
//     >
//       {/* Header / Logo */}
//       <Box
//         sx={{
//           p: isMobile ? 1.5 : (collapsed ? 1.5 : 2.5),
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: isMobile ? 'space-between' : (collapsed ? 'center' : 'flex-start'),
//           gap: 1.5,
//           borderBottom: '1px solid rgba(255,255,255,0.08)',
//           minHeight: isMobile ? 56 : (collapsed ? 56 : 64),
//         }}
//       >
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: 1.5,
//           justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
//           width: collapsed && !isMobile ? '100%' : 'auto',
//         }}>
//           <Avatar
//             sx={{
//               bgcolor: 'rgba(255,255,255,0.25)',
//               width: isMobile ? 30 : (collapsed ? 32 : 40),
//               height: isMobile ? 30 : (collapsed ? 32 : 40),
//               fontWeight: 'bold',
//               fontSize: isMobile ? '0.8rem' : (collapsed ? '0.9rem' : '1rem'),
//             }}
//           >
//             TT
//           </Avatar>

//           {/* Hide text when collapsed on desktop, but show on mobile */}
//           {(!collapsed || isMobile) && (
//             <Box>
//               <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ 
//                 fontSize: isMobile ? '0.8rem' : (collapsed ? '0.9rem' : '1rem'),
//                 lineHeight: 1.2,
//               }}>
//                 Team Trackify
//               </Typography>
//               <Typography variant="caption" sx={{ 
//                 opacity: 0.7, 
//                 fontSize: isMobile ? '0.55rem' : (collapsed ? '0.6rem' : '0.7rem'),
//                 display: 'block',
//               }}>
//                 {roleName}
//               </Typography>
//             </Box>
//           )}
//         </Box>

//         {/* Close button for mobile */}
//         {isMobile && (
//           <IconButton onClick={onClose} sx={{ color: 'white', p: 0.5 }}>
//             <ChevronLeftIcon sx={{ fontSize: 20 }} />
//           </IconButton>
//         )}
//       </Box>

//       {/* User Info - Hide when collapsed on desktop */}
//       {(!collapsed || isMobile) && (
//         <Box sx={{ px: isMobile ? 1.5 : 2.5, py: isMobile ? 1 : 2 }}>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: isMobile ? 1 : 2,
//               bgcolor: 'rgba(255,255,255,0.08)',
//               p: isMobile ? 0.8 : 1.5,
//               borderRadius: 1.5,
//             }}
//           >
//             <Avatar
//               src={user?.avtar}
//               sx={{ 
//                 bgcolor: '#2dd4bf',
//                 width: isMobile ? 28 : 40,
//                 height: isMobile ? 28 : 40,
//                 fontSize: isMobile ? '0.7rem' : '0.9rem',
//               }}
//             >
//               {user?.name?.charAt(0) || 'A'}
//             </Avatar>
//             <Box sx={{ minWidth: 0 }}>
//               <Typography variant="body2" fontWeight={500} noWrap sx={{ 
//                 fontSize: isMobile ? '0.7rem' : '0.85rem',
//                 lineHeight: 1.2,
//               }}>
//                 {user?.name || 'Admin User'}
//               </Typography>
//               <Typography variant="caption" sx={{ 
//                 opacity: 0.75,
//                 fontSize: isMobile ? '0.55rem' : '0.65rem',
//                 display: 'block',
//                 whiteSpace: 'nowrap',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 maxWidth: isMobile ? 140 : 180,
//               }}>
//                 {user?.email || 'admin@trackify.in'}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* Menu Items - Increased vertical gap when collapsed */}
//       <List sx={{ 
//         flexGrow: 1, 
//         pt: 1, 
//         px: isMobile ? 0.5 : (collapsed ? 0 : 1.5), 
//         pb: 1 
//       }}>
//         {menuItems.map((item) => {
//           const active = isActive(item.path);

//           return (
//             <Tooltip
//               key={item.text}
//               title={collapsed && !isMobile ? item.text : ''}
//               placement="right"
//               arrow
//             >
//               <ListItem disablePadding sx={{ 
//                 mb: collapsed && !isMobile ? 2 : 0.3, // Increased vertical gap when collapsed
//               }}>
//                 <ListItemButton
//                   onClick={() => handleNavigation(item.path)}
//                   sx={{
//                     minHeight: isMobile ? 36 : (collapsed ? 44 : 48), // Increased height when collapsed
//                     borderRadius: 1,
//                     justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
//                     px: (collapsed && !isMobile) ? 0 : (isMobile ? 1 : 2.5),
//                     py: isMobile ? 0.6 : (collapsed ? 1 : 1.2), // Increased vertical padding when collapsed
//                     mx: (collapsed && !isMobile) ? 0 : 0,
//                     bgcolor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
//                     '&:hover': {
//                       bgcolor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
//                     },
//                     position: 'relative',
//                     transition: 'all 0.18s ease',
//                   }}
//                 >
//                   {/* Active indicator line - only show when not collapsed */}
//                   {active && !collapsed && !isMobile && (
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         left: 0,
//                         top: '50%',
//                         transform: 'translateY(-50%)',
//                         width: 4,
//                         height: '60%',
//                         bgcolor: '#5eead4',
//                         borderRadius: '0 4px 4px 0',
//                       }}
//                     />
//                   )}

//                   <ListItemIcon
//                     sx={{
//                       minWidth: (collapsed && !isMobile) ? 'auto' : (isMobile ? 28 : 40),
//                       color: active ? '#a7f3d0' : 'inherit',
//                       '& svg': {
//                         fontSize: isMobile ? '1rem' : (collapsed ? '1.3rem' : '1.3rem'), // Slightly larger icons when collapsed
//                       },
//                       display: 'flex',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     {item.icon}
//                   </ListItemIcon>

//                   {/* Hide text when collapsed on desktop */}
//                   {(!collapsed || isMobile) && (
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{
//                         fontWeight: active ? 600 : 400,
//                         fontSize: isMobile ? '0.7rem' : (collapsed ? '0.8rem' : '0.95rem'),
//                         color: active ? '#d1fae5' : 'white',
//                       }}
//                       sx={{
//                         ml: isMobile ? 0.5 : 1,
//                       }}
//                     />
//                   )}
//                 </ListItemButton>
//               </ListItem>
//             </Tooltip>
//           );
//         })}
//       </List>

//       <Divider sx={{ 
//         borderColor: 'rgba(255,255,255,0.08)', 
//         mx: isMobile ? 1 : (collapsed ? 1 : 2), 
//         my: collapsed && !isMobile ? 1.5 : 0, // Increased margin when collapsed
//       }} />

//       {/* Logout */}
//       <Box sx={{ 
//         p: (collapsed && !isMobile) ? 1.5 : (isMobile ? 1 : 2), 
//         pb: (collapsed && !isMobile) ? 1.5 : (isMobile ? 1 : 1.5),
//         display: 'flex',
//         justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
//         mt: collapsed && !isMobile ? 0.5 : 0, // Extra top margin when collapsed
//       }}>
//         <Tooltip title={collapsed && !isMobile ? 'Logout' : ''} placement="right" arrow>
//           <ListItemButton
//             onClick={handleLogout}
//             sx={{
//               borderRadius: 1,
//               justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
//               px: (collapsed && !isMobile) ? 0 : (isMobile ? 1 : 2.5),
//               py: isMobile ? 0.6 : (collapsed ? 1 : 1.2), // Increased vertical padding when collapsed
//               mx: (collapsed && !isMobile) ? 'auto' : 0,
//               width: collapsed && !isMobile ? 'auto' : '100%',
//               display: 'flex',
//               alignItems: 'center',
//               '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
//             }}
//           >
//             <ListItemIcon sx={{ 
//               minWidth: (collapsed && !isMobile) ? 'auto' : (isMobile ? 28 : 40),
//               '& svg': { 
//                 fontSize: isMobile ? '1rem' : (collapsed ? '1.3rem' : '1.3rem'), 
//               },
//               display: 'flex',
//               justifyContent: 'center',
//             }}>
//               <LogoutIcon />
//             </ListItemIcon>
            
//             {/* Hide text when collapsed on desktop */}
//             {(!collapsed || isMobile) && (
//               <ListItemText 
//                 primary="Logout"
//                 primaryTypographyProps={{
//                   fontSize: isMobile ? '0.7rem' : (collapsed ? '0.8rem' : '0.95rem'),
//                 }}
//               />
//             )}
//           </ListItemButton>
//         </Tooltip>
//       </Box>
//     </Box>
//   );

//   // For mobile devices
//   if (isMobile) {
//     return (
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={onClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           display: { xs: 'block', sm: 'none' },
//           '& .MuiDrawer-paper': {
//             width: getMobileWidth(),
//             boxSizing: 'border-box',
//             bgcolor: 'transparent',
//           },
//         }}
//       >
//         {sidebarContent}
//       </Drawer>
//     );
//   }

//   // On desktop
//   return (
//     <Box
//       sx={{
//         position: 'fixed',
//         left: 0,
//         top: 0,
//         height: '100vh',
//         zIndex: 1200,
//       }}
//     >
//       {sidebarContent}
//     </Box>
//   );
// };

// export default Sidebar;


//  add logout model



import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'; // Add this import
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Payment as PaymentIcon,
  Assessment as AssessmentIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  PriceChange as PlanIcon,
  Contacts as ContactIcon,
  Logout as LogoutIcon,
  Receipt as ReceiptIcon,           
  Description as ReportIcon,       
  ManageAccounts as ProfileIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';
import LogoutModal from '../models/LogoutModal'; // Add this import

const Sidebar = ({ collapsed = false, mobileOpen = false, onClose, isMobile = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Add state for logout modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Responsive breakpoints for mobile width
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const isMediumMobile = useMediaQuery('(min-width:481px) and (max-width:600px)');
  
  const { user, role_id } = useSelector((state) => state.auth);

  // Replace handleLogout with these two functions
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Dispatch Redux logout action
    dispatch(logout());
    
    // Close sidebar if on mobile
    if (isMobile) {
      onClose?.();
    }
    
    // Navigate to login
    navigate('/login', { replace: true });
    
    // Close modal
    setShowLogoutModal(false);
    
    // Reload page to clear any cached state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onClose?.();
    }
  };

  // Admin Menu Items
  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/user' },
    { text: 'Payment Plans', icon: <PaymentIcon  />, path: '/admin/payments-plans' },
    { text: 'Transaction History', icon: <ReportIcon  />, path: '/admin/transactionhistory' },
    { text: 'Reports', icon: <ReceiptIcon  />, path: '/admin/reports' },
    { text: 'Profile Manager', icon: <ProfileIcon  />, path: '/profile' },
  ];

  // Super Admin Menu Items
  const superAdminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin/dashboard' },
    { text: 'Organization Details', icon: <BusinessIcon />, path: '/user' },
    { text: 'Revenue Analytics', icon: <MoneyIcon />, path: '/super-admin/revenue' },
    { text: 'Plan Management', icon: <PlanIcon />, path: '/super-admin/plans' },
    { text: 'Contact List', icon: <ContactIcon />, path: '/super-admin/contacts' },
    { text: 'Profile Manager', icon: <PersonIcon />, path: '/profile' },
  ];

  // Get menu items based on role
  const menuItems = role_id === 2 ? superAdminMenuItems : adminMenuItems;
  const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

  const isActive = (path) => location.pathname === path;

  // Determine mobile drawer width
  const getMobileWidth = () => {
    if (isSmallMobile) return 240; 
    if (isMediumMobile) return 260;
    return 280; 
  };

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        width: isMobile ? getMobileWidth() : (collapsed ? 72 : 280),
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0f766e',
        color: 'white',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
        borderRadius: 0,
      }}
    >
      {/* Header / Logo */}
      <Box
        sx={{
          p: isMobile ? 1.5 : (collapsed ? 1.5 : 2.5),
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : (collapsed ? 'center' : 'flex-start'),
          gap: 1.5,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          minHeight: isMobile ? 56 : (collapsed ? 56 : 64),
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
          width: collapsed && !isMobile ? '100%' : 'auto',
        }}>
          <Avatar
            sx={{
              bgcolor: 'rgba(255,255,255,0.25)',
              width: isMobile ? 30 : (collapsed ? 32 : 40),
              height: isMobile ? 30 : (collapsed ? 32 : 40),
              fontWeight: 'bold',
              fontSize: isMobile ? '0.8rem' : (collapsed ? '0.9rem' : '1rem'),
            }}
          >
            TT
          </Avatar>

          {/* Hide text when collapsed on desktop, but show on mobile */}
          {(!collapsed || isMobile) && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ 
                fontSize: isMobile ? '0.8rem' : (collapsed ? '0.9rem' : '1rem'),
                lineHeight: 1.2,
              }}>
                Team Trackify
              </Typography>
              <Typography variant="caption" sx={{ 
                opacity: 0.7, 
                fontSize: isMobile ? '0.55rem' : (collapsed ? '0.6rem' : '0.7rem'),
                display: 'block',
              }}>
                {roleName}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Close button for mobile */}
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: 'white', p: 0.5 }}>
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      {/* User Info - Hide when collapsed on desktop */}
      {(!collapsed || isMobile) && (
        <Box sx={{ px: isMobile ? 1.5 : 2.5, py: isMobile ? 1 : 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 1 : 2,
              bgcolor: 'rgba(255,255,255,0.08)',
              p: isMobile ? 0.8 : 1.5,
              borderRadius: 1.5,
            }}
          >
            <Avatar
              src={user?.avtar}
              sx={{ 
                bgcolor: '#2dd4bf',
                width: isMobile ? 28 : 40,
                height: isMobile ? 28 : 40,
                fontSize: isMobile ? '0.7rem' : '0.9rem',
              }}
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" fontWeight={500} noWrap sx={{ 
                fontSize: isMobile ? '0.7rem' : '0.85rem',
                lineHeight: 1.2,
              }}>
                {user?.name || 'Admin User'}
              </Typography>
              <Typography variant="caption" sx={{ 
                opacity: 0.75,
                fontSize: isMobile ? '0.55rem' : '0.65rem',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: isMobile ? 140 : 180,
              }}>
                {user?.email || 'admin@trackify.in'}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Menu Items - Increased vertical gap when collapsed */}
      <List sx={{ 
        flexGrow: 1, 
        pt: 1, 
        px: isMobile ? 0.5 : (collapsed ? 0 : 1.5), 
        pb: 1 
      }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Tooltip
              key={item.text}
              title={collapsed && !isMobile ? item.text : ''}
              placement="right"
              arrow
            >
              <ListItem disablePadding sx={{ 
                mb: collapsed && !isMobile ? 2 : 0.3, // Increased vertical gap when collapsed
              }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    minHeight: isMobile ? 36 : (collapsed ? 44 : 48), // Increased height when collapsed
                    borderRadius: 1,
                    justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
                    px: (collapsed && !isMobile) ? 0 : (isMobile ? 1 : 2.5),
                    py: isMobile ? 0.6 : (collapsed ? 1 : 1.2), // Increased vertical padding when collapsed
                    mx: (collapsed && !isMobile) ? 0 : 0,
                    bgcolor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                    '&:hover': {
                      bgcolor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
                    },
                    position: 'relative',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {/* Active indicator line - only show when not collapsed */}
                  {active && !collapsed && !isMobile && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 4,
                        height: '60%',
                        bgcolor: '#5eead4',
                        borderRadius: '0 4px 4px 0',
                      }}
                    />
                  )}

                  <ListItemIcon
                    sx={{
                      minWidth: (collapsed && !isMobile) ? 'auto' : (isMobile ? 28 : 40),
                      color: active ? '#a7f3d0' : 'inherit',
                      '& svg': {
                        fontSize: isMobile ? '1rem' : (collapsed ? '1.3rem' : '1.3rem'), // Slightly larger icons when collapsed
                      },
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {/* Hide text when collapsed on desktop */}
                  {(!collapsed || isMobile) && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: active ? 600 : 400,
                        fontSize: isMobile ? '0.7rem' : (collapsed ? '0.8rem' : '0.95rem'),
                        color: active ? '#d1fae5' : 'white',
                      }}
                      sx={{
                        ml: isMobile ? 0.5 : 1,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ 
        borderColor: 'rgba(255,255,255,0.08)', 
        mx: isMobile ? 1 : (collapsed ? 1 : 2), 
        my: collapsed && !isMobile ? 1.5 : 0, // Increased margin when collapsed
      }} />

      {/* Logout Button - Updated to use handleLogoutClick */}
      <Box sx={{ 
        p: (collapsed && !isMobile) ? 1.5 : (isMobile ? 1 : 2), 
        pb: (collapsed && !isMobile) ? 1.5 : (isMobile ? 1 : 1.5),
        display: 'flex',
        justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
        mt: collapsed && !isMobile ? 0.5 : 0, // Extra top margin when collapsed
      }}>
        <Tooltip title={collapsed && !isMobile ? 'Logout' : ''} placement="right" arrow>
          <ListItemButton
            onClick={handleLogoutClick} // Changed from handleLogout to handleLogoutClick
            sx={{
              borderRadius: 1,
              justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
              px: (collapsed && !isMobile) ? 0 : (isMobile ? 1 : 2.5),
              py: isMobile ? 0.6 : (collapsed ? 1 : 1.2), // Increased vertical padding when collapsed
              mx: (collapsed && !isMobile) ? 'auto' : 0,
              width: collapsed && !isMobile ? 'auto' : '100%',
              display: 'flex',
              alignItems: 'center',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: (collapsed && !isMobile) ? 'auto' : (isMobile ? 28 : 40),
              '& svg': { 
                fontSize: isMobile ? '1rem' : (collapsed ? '1.3rem' : '1.3rem'), 
              },
              display: 'flex',
              justifyContent: 'center',
            }}>
              <LogoutIcon />
            </ListItemIcon>
            
            {/* Hide text when collapsed on desktop */}
            {(!collapsed || isMobile) && (
              <ListItemText 
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: isMobile ? '0.7rem' : (collapsed ? '0.8rem' : '0.95rem'),
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  // For mobile devices
  if (isMobile) {
    return (
      <>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              width: getMobileWidth(),
              boxSizing: 'border-box',
              bgcolor: 'transparent',
            },
          }}
        >
          {sidebarContent}
        </Drawer>
        
        {/* Logout Modal */}
        <LogoutModal
          show={showLogoutModal}
          onHide={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
          title="Sign Out"
          message="Are you sure you want to sign out?"
          subMessage="You will be redirected to the login page."
        />
      </>
    );
  }

  // On desktop
  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          zIndex: 1200,
        }}
      >
        {sidebarContent}
      </Box>
      
      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        subMessage="You will be redirected to the login page."
      />
    </>
  );
};

export default Sidebar;