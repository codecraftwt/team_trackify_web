
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
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
//   alpha,
//   Paper,
//   Button,
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
//   Redeem as RedeemIcon,
//   Login as LoginIcon,
//   ExitToApp as ExitToAppIcon,
// } from '@mui/icons-material';
// import { logout, stopImpersonation } from '../../redux/slices/authSlice';
// import LogoutModal from '../models/LogoutModal';
// import logo from '../../../src/assets/logo31.png';

// // Impersonation Banner Component inside Sidebar
// const ImpersonationBanner = ({ onStopImpersonation, impersonatedUser, collapsed, isMobile }) => {
//   const theme = useTheme();

//   if (!impersonatedUser) return null;

//   // Different styling based on collapsed state
//   if (collapsed && !isMobile) {
//     return (
//       <Tooltip
//         title={`Impersonating: ${impersonatedUser.email}`}
//         placement="right"
//         arrow
//       >
//         <Box
//           sx={{
//             mx: 1,
//             mb: 1,
//             p: 1,
//             bgcolor: alpha(theme.palette.warning.main, 0.2),
//             border: '1px solid',
//             borderColor: alpha(theme.palette.warning.main, 0.3),
//             borderRadius: 2,
//             display: 'flex',
//             justifyContent: 'center',
//             cursor: 'pointer',
//             '&:hover': {
//               bgcolor: alpha(theme.palette.warning.main, 0.3),
//             },
//           }}
//           onClick={onStopImpersonation}
//         >
//           <ExitToAppIcon sx={{ color: theme.palette.warning.main, fontSize: 20 }} />
//         </Box>
//       </Tooltip>
//     );
//   }

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         mx: isMobile ? 1 : 1.5,
//         mb: 1.5,
//         p: isMobile ? 1 : 1.2,
//         bgcolor: alpha(theme.palette.warning.main, 0.15),
//         color: theme.palette.warning.contrastText,
//         borderRadius: 2,
//         border: '1px solid',
//         borderColor: alpha(theme.palette.warning.main, 0.3),
//       }}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//         <LoginIcon sx={{ fontSize: 16, color: theme.palette.warning.main }} />
//         <Typography
//           variant="caption"
//           sx={{
//             fontWeight: 600,
//             fontSize: isMobile ? '0.65rem' : '0.7rem',
//             color: theme.palette.warning.main,
//             flex: 1,
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap',
//           }}
//         >
//           Impersonating: {impersonatedUser.email}
//         </Typography>
//       </Box>
//       <Button
//         fullWidth
//         variant="contained"
//         size="small"
//         onClick={onStopImpersonation}
//         startIcon={<ExitToAppIcon sx={{ fontSize: 14 }} />}
//         sx={{
//           bgcolor: theme.palette.warning.main,
//           color: theme.palette.warning.contrastText,
//           fontSize: isMobile ? '0.6rem' : '0.65rem',
//           py: 0.5,
//           minHeight: 28,
//           '&:hover': {
//             bgcolor: theme.palette.warning.dark,
//           },
//         }}
//       >
//         Exit Impersonation
//       </Button>
//     </Paper>
//   );
// };

// const Sidebar = ({ collapsed = false, mobileOpen = false, onClose, isMobile = false }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();

//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [impersonating, setImpersonating] = useState(false);
//   const [impersonatedUser, setImpersonatedUser] = useState(null);

//   const isSmallMobile = useMediaQuery('(max-width:480px)');
//   const isMediumMobile = useMediaQuery('(min-width:481px) and (max-width:600px)');

//   const { user, role_id, isImpersonating } = useSelector((state) => state.auth);

//   // Check impersonation status on mount and when auth state changes
//   useEffect(() => {
//     // Check if we're in impersonation mode
//     const isImpersonatingFromStorage = localStorage.getItem('isImpersonating') === 'true';
//     const storedUser = localStorage.getItem('user');

//     if (isImpersonating || isImpersonatingFromStorage) {
//       setImpersonating(true);

//       if (storedUser) {
//         try {
//           setImpersonatedUser(JSON.parse(storedUser));
//         } catch (e) {
//           console.error('Error parsing stored user:', e);
//           setImpersonatedUser(user);
//         }
//       } else {
//         setImpersonatedUser(user);
//       }
//     } else {
//       setImpersonating(false);
//       setImpersonatedUser(null);
//     }
//   }, [isImpersonating, user]);

//   const handleLogoutClick = () => {
//     setShowLogoutModal(true);
//   };

//   const handleConfirmLogout = () => {
//     localStorage.clear();
//     sessionStorage.clear();

//     document.cookie.split(";").forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, "")
//         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//     });

//     dispatch(logout());

//     if (isMobile) {
//       onClose?.();
//     }

//     navigate('/login', { replace: true });
//     setShowLogoutModal(false);

//     setTimeout(() => {
//       window.location.reload();
//     }, 100);
//   };

//   const handleStopImpersonation = async () => {
//     try {
//       const result = await dispatch(stopImpersonation()).unwrap();

//       if (result.status === 1) {
//         // Get the original token and user from sessionStorage
//         const originalToken = sessionStorage.getItem('originalToken');
//         const originalUserStr = sessionStorage.getItem('originalUser');

//         if (originalToken && originalUserStr) {
//           const originalUser = JSON.parse(originalUserStr);

//           // Restore to localStorage
//           localStorage.setItem('token', originalToken);
//           localStorage.setItem('user', originalUserStr);
//           localStorage.removeItem('isImpersonating');

//           // Clear sessionStorage
//           sessionStorage.removeItem('originalToken');
//           sessionStorage.removeItem('originalUser');

//           setImpersonating(false);
//           setImpersonatedUser(null);

//           // Force a complete page reload to reset all state
//           window.location.href = originalUser?.role_id === 2 
//             ? '/super-admin/dashboard' 
//             : '/admin/dashboard';
//         } else {
//           // If no original data, logout and redirect to login
//           localStorage.clear();
//           sessionStorage.clear();
//           window.location.href = '/login';
//         }
//       }
//     } catch (error) {
//       console.error('Failed to stop impersonation:', error);
//     }
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
//     { text: 'Payment Plans', icon: <PaymentIcon />, path: '/admin/payments-plans' },
//     { text: 'Transaction History', icon: <ReportIcon />, path: '/admin/transactionhistory' },
//     { text: 'Reports', icon: <ReceiptIcon />, path: '/admin/reports' },
//     { text: 'Profile Manager', icon: <ProfileIcon />, path: '/profile' },
//   ];

//   // Super Admin Menu Items
//   const superAdminMenuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin/dashboard' },
//     { text: 'Organization Details', icon: <BusinessIcon />, path: '/user' },
//     { text: 'Revenue Analytics', icon: <MoneyIcon />, path: '/super-admin/revenue' },
//     { text: 'Coupon Management', icon: <RedeemIcon  />, path: '/super-admin/couponmanagment' },
//     { text: 'Plan Management', icon: <PlanIcon />, path: '/super-admin/plans' },
//     { text: 'Contact List', icon: <ContactIcon />, path: '/super-admin/contacts' },
//     { text: 'Profile Manager', icon: <PersonIcon />, path: '/profile' },
//   ];

//   const filteredAdminMenuItems = Number(role_id) === 3 
//     ? adminMenuItems.filter(item => item.text !== 'Payment Plans' && item.text !== 'Transaction History')
//     : adminMenuItems;

//   const menuItems = Number(role_id) === 2 ? superAdminMenuItems : filteredAdminMenuItems;
//   const roleName = Number(role_id) === 2 ? 'Super Admin' : (Number(role_id) === 3 ? 'Sub Admin' : 'Admin');

//   const isActive = (path) => location.pathname === path;

//   const getMobileWidth = () => {
//     if (isSmallMobile) return 240;
//     if (isMediumMobile) return 260;
//     return 280;
//   };

//   const sidebarContent = (
//     <Box
//       sx={{
//         height: '100%',
//         width: isMobile ? getMobileWidth() : (collapsed ? 72 : 240),
//         display: 'flex',
//         flexDirection: 'column',
//         background: 'linear-gradient(135deg, #2f6eaa, #1e4f7a)',
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
//           p: isMobile ? 1.5 : (collapsed ? 1.2 : 2),
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: isMobile ? 'space-between' : (collapsed ? 'center' : 'flex-start'),
//           gap: 1,
//           borderBottom: '1px solid rgba(255,255,255,0.08)',
//           minHeight: isMobile ? 52 : (collapsed ? 52 : 56),
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1.2,
//             justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
//             width: collapsed && !isMobile ? '100%' : 'auto',
//           }}
//         >
//           <Avatar
//             src={logo}
//             sx={{
//               bgcolor: 'primary.main',
//               width: isMobile ? 30 : (collapsed ? 30 : 32),
//               height: isMobile ? 30 : (collapsed ? 30 : 32),
//               fontWeight: 'bold',
//               fontSize: isMobile ? '0.8rem' : (collapsed ? '0.9rem' : '0.95rem'),
//               border: '2px solid rgba(255,255,255,0.5)',
//               boxShadow: '0 0 0 1px rgba(255,255,255,0.2)',
//             }}
//           />

//           {(!collapsed || isMobile) && (
//             <Box>
//               <Typography
//                 variant="subtitle2"
//                 fontWeight="bold"
//                 noWrap
//                 sx={{
//                   fontSize: isMobile ? '0.95rem' : '0.9rem',
//                   lineHeight: 1.2,
//                 }}
//               >
//                 Team Trackify
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   opacity: 0.7,
//                   fontSize: isMobile ? '0.6rem' : '0.65rem',
//                   display: 'block',
//                 }}
//               >
//                 {roleName}
//               </Typography>
//             </Box>
//           )}
//         </Box>

//         {isMobile && (
//           <IconButton onClick={onClose} sx={{ color: 'white', p: 0.5 }}>
//             <ChevronLeftIcon sx={{ fontSize: 20 }} />
//           </IconButton>
//         )}
//       </Box>


//       {/* User Info - Hide during impersonation to save space */}
//       {(!impersonating || !collapsed || isMobile) && (!collapsed || isMobile) && (
//         <Box sx={{ px: isMobile ? 1.5 : 2, py: isMobile ? 1 : 1.5 }}>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: isMobile ? 1.2 : 1.5,
//               bgcolor: 'rgba(255,255,255,0.08)',
//               p: isMobile ? 1 : 1.2,
//               borderRadius: 1.5,
//             }}
//           >
//             <Avatar
//               src={user?.avtar}
//               sx={{
//                 bgcolor: 'secondary.main',
//                 width: isMobile ? 28 : 32,
//                 height: isMobile ? 28 : 32,
//                 fontSize: isMobile ? '0.7rem' : '0.8rem',
//               }}
//             >
//               {user?.name?.charAt(0) || 'A'}
//             </Avatar>
//             <Box sx={{ minWidth: 0 }}>
//               <Typography
//                 variant="caption"
//                 fontWeight={500}
//                 noWrap
//                 sx={{
//                   fontSize: isMobile ? '0.7rem' : '0.75rem',
//                   lineHeight: 1.2,
//                 }}
//               >
//                 {impersonating ? impersonatedUser?.name || 'Impersonated User' : (user?.name || 'Admin User')}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   opacity: 0.75,
//                   fontSize: isMobile ? '0.6rem' : '0.65rem',
//                   display: 'block',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis',
//                   maxWidth: isMobile ? 130 : 150,
//                 }}
//               >
//                 {impersonating ? impersonatedUser?.email || 'user@example.com' : (user?.email || 'admin@trackify.in')}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {/* Menu Items */}
//       <List
//         sx={{
//           flexGrow: 1,
//           pt: 0.5,
//           px: isMobile ? 0.8 : (collapsed ? 0.5 : 1.5),
//           pb: 0.5,
//         }}
//       >
//         {menuItems.map((item) => {
//           const active = isActive(item.path);

//           return (
//             <Tooltip
//               key={item.text}
//               title={collapsed && !isMobile ? item.text : ''}
//               placement="right"
//               arrow
//               componentsProps={{
//                 tooltip: {
//                   sx: {
//                     fontSize: '0.75rem',
//                     bgcolor: alpha(theme.palette.primary.main, 0.9),
//                   },
//                 },
//               }}
//             >
//               <ListItem
//                 disablePadding
//                 sx={{
//                   mb: collapsed && !isMobile ? 1.5 : 0.3,
//                 }}
//               >
//                 <ListItemButton
//                   onClick={() => handleNavigation(item.path)}
//                   sx={{
//                     minHeight: isMobile ? 36 : (collapsed ? 40 : 42),
//                     borderRadius: 1,
//                     justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
//                     px: collapsed && !isMobile ? 0 : (isMobile ? 1.2 : 2),
//                     py: isMobile ? 0.6 : 0.8,
//                     bgcolor: active ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
//                     '&:hover': {
//                       bgcolor: active
//                         ? 'rgba(245, 158, 11, 0.35)'
//                         : 'rgba(245, 158, 11, 0.15)',
//                     },
//                     position: 'relative',
//                     transition: 'all 0.18s ease',
//                   }}
//                 >
//                   {active && !collapsed && !isMobile && (
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         left: 0,
//                         top: '50%',
//                         transform: 'translateY(-50%)',
//                         width: 4,
//                         height: '65%',
//                         bgcolor: 'secondary.main',
//                         borderRadius: '0 4px 4px 0',
//                       }}
//                     />
//                   )}

//                   <ListItemIcon
//                     sx={{
//                       minWidth: collapsed && !isMobile ? 'auto' : (isMobile ? 28 : 32),
//                       color: active ? 'secondary.main' : 'inherit',
//                       '& svg': {
//                         fontSize: isMobile ? '1rem' : '1.1rem',
//                       },
//                       display: 'flex',
//                       justifyContent: 'center',
//                     }}
//                   >
//                     {item.icon}
//                   </ListItemIcon>

//                   {(!collapsed || isMobile) && (
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{
//                         fontWeight: active ? 600 : 400,
//                         fontSize: isMobile ? '0.7rem' : '0.8rem',
//                         color: active ? 'secondary.main' : 'white',
//                       }}
//                       sx={{ ml: isMobile ? 0.5 : 0.8 }}
//                     />
//                   )}
//                 </ListItemButton>
//               </ListItem>
//             </Tooltip>
//           );
//         })}
//       </List>

//       <Divider
//         sx={{
//           borderColor: 'rgba(255,255,255,0.08)',
//           mx: isMobile ? 1 : (collapsed ? 1 : 1.5),
//           my: collapsed && !isMobile ? 1.5 : 0,
//         }}
//       />



//       {/* Impersonation Banner - Show when impersonating */}
//       {impersonating && (
//         <ImpersonationBanner
//           onStopImpersonation={handleStopImpersonation}
//           impersonatedUser={impersonatedUser}
//           collapsed={collapsed}
//           isMobile={isMobile}
//         />
//       )}
//       {/* Logout Button */}
//       <Box
//         sx={{
//           p: collapsed && !isMobile ? 1.2 : (isMobile ? 1 : 1.5),
//           pb: collapsed && !isMobile ? 1.2 : (isMobile ? 1 : 1.5),
//           display: 'flex',
//           justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
//           mt: collapsed && !isMobile ? 0.2 : 0,
//         }}
//       >
//         <Tooltip
//           title={collapsed && !isMobile ? 'Logout' : ''}
//           placement="right"
//           arrow
//           componentsProps={{
//             tooltip: {
//               sx: {
//                 fontSize: '0.75rem',
//                 bgcolor: alpha(theme.palette.primary.main, 0.9),
//               },
//             },
//           }}
//         >
//           <ListItemButton
//             onClick={handleLogoutClick}
//             sx={{
//               borderRadius: 1,
//               justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
//               px: collapsed && !isMobile ? 0 : (isMobile ? 1.2 : 2),
//               py: isMobile ? 0.6 : 0.8,
//               mx: collapsed && !isMobile ? 'auto' : 0,
//               width: collapsed && !isMobile ? 'auto' : '100%',
//               display: 'flex',
//               alignItems: 'center',
//               '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.25)' },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: collapsed && !isMobile ? 'auto' : (isMobile ? 28 : 32),
//                 '& svg': {
//                   fontSize: isMobile ? '1rem' : '1.1rem',
//                 },
//                 display: 'flex',
//                 justifyContent: 'center',
//                 color: 'secondary.main',
//               }}
//             >
//               <LogoutIcon />
//             </ListItemIcon>

//             {(!collapsed || isMobile) && (
//               <ListItemText
//                 primary="Logout"
//                 primaryTypographyProps={{
//                   fontSize: isMobile ? '0.7rem' : '0.8rem',
//                   color: 'secondary.main',
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
//       <>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={onClose}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': {
//               width: getMobileWidth(),
//               boxSizing: 'border-box',
//               bgcolor: 'transparent',
//             },
//           }}
//         >
//           {sidebarContent}
//         </Drawer>

//         <LogoutModal
//           show={showLogoutModal}
//           onHide={() => setShowLogoutModal(false)}
//           onConfirm={handleConfirmLogout}
//           title="Sign Out"
//           message="Are you sure you want to sign out?"
//           subMessage="You will be redirected to the login page."
//         />
//       </>
//     );
//   }

//   // On desktop
//   return (
//     <>
//       <Box
//         sx={{
//           position: 'fixed',
//           left: 0,
//           top: 0,
//           height: '100vh',
//           zIndex: 1200,
//         }}
//       >
//         {sidebarContent}
//       </Box>

//       <LogoutModal
//         show={showLogoutModal}
//         onHide={() => setShowLogoutModal(false)}
//         onConfirm={handleConfirmLogout}
//         title="Sign Out"
//         message="Are you sure you want to sign out?"
//         subMessage="You will be redirected to the login page."
//       />
//     </>
//   );
// };

// export default Sidebar;


import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, Box, Typography, Avatar, Tooltip, IconButton,
  useMediaQuery, useTheme, alpha, Paper, Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon, People as PeopleIcon, Payment as PaymentIcon,
  Person as PersonIcon, Business as BusinessIcon, AttachMoney as MoneyIcon,
  PriceChange as PlanIcon, Contacts as ContactIcon, Logout as LogoutIcon,
  Receipt as ReceiptIcon, Description as ReportIcon, ManageAccounts as ProfileIcon,
  ChevronLeft as ChevronLeftIcon, Redeem as RedeemIcon,
  Login as LoginIcon, ExitToApp as ExitToAppIcon,
} from '@mui/icons-material';
import { logout, stopImpersonation } from '../../redux/slices/authSlice';
import LogoutModal from '../models/LogoutModal';
import logo from '../../../src/assets/logo31.png';

const ImpersonationBanner = ({ onStopImpersonation, impersonatedUser, collapsed, isMobile }) => {
  const theme = useTheme();
  if (!impersonatedUser) return null;

  if (collapsed && !isMobile) {
    return (
      <Tooltip title={`Impersonating: ${impersonatedUser.email}`} placement="right" arrow>
        <Box
          sx={{
            mx: 1, mb: 1, p: 1,
            bgcolor: alpha(theme.palette.warning.main, 0.2),
            border: '1px solid', borderColor: alpha(theme.palette.warning.main, 0.3),
            borderRadius: 2, display: 'flex', justifyContent: 'center', cursor: 'pointer',
            '&:hover': { bgcolor: alpha(theme.palette.warning.main, 0.3) },
          }}
          onClick={onStopImpersonation}
        >
          <ExitToAppIcon sx={{ color: theme.palette.warning.main, fontSize: 20 }} />
        </Box>
      </Tooltip>
    );
  }

  return (
    <Paper elevation={0} sx={{
      mx: isMobile ? 1 : 1.5, mb: 1.5, p: isMobile ? 1 : 1.2,
      bgcolor: alpha(theme.palette.warning.main, 0.15),
      color: theme.palette.warning.contrastText,
      borderRadius: 2, border: '1px solid',
      borderColor: alpha(theme.palette.warning.main, 0.3),
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <LoginIcon sx={{ fontSize: 16, color: theme.palette.warning.main }} />
        <Typography variant="caption" sx={{
          fontWeight: 600, fontSize: isMobile ? '0.65rem' : '0.7rem',
          color: theme.palette.warning.main, flex: 1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          Impersonating: {impersonatedUser.email}
        </Typography>
      </Box>
      <Button fullWidth variant="contained" size="small" onClick={onStopImpersonation}
        startIcon={<ExitToAppIcon sx={{ fontSize: 14 }} />}
        sx={{
          bgcolor: theme.palette.warning.main, color: theme.palette.warning.contrastText,
          fontSize: isMobile ? '0.6rem' : '0.65rem', py: 0.5, minHeight: 28,
          '&:hover': { bgcolor: theme.palette.warning.dark },
        }}>
        Exit Impersonation
      </Button>
    </Paper>
  );
};

const Sidebar = ({ collapsed = false, mobileOpen = false, onClose, isMobile = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [impersonating, setImpersonating] = useState(false);
  const [impersonatedUser, setImpersonatedUser] = useState(null);

  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const isMediumMobile = useMediaQuery('(min-width:481px) and (max-width:600px)');

  // ── OLD CODE APPROACH: Redux auth user FIRST ──
  const { user, role_id, isImpersonating: isImpersonatingAuth } = useSelector((state) => state.auth);
  const userSliceData = useSelector((state) => state.user?.userInfo || {});

  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  };
  const storedUser = getStoredUser();

  // Redux auth user FIRST (preserves impersonation)
  const effectiveUser = user || storedUser || userSliceData;

  // For role/menu permissions, always use authSlice role_id
  const effectiveRoleId = role_id;

  // For display (name, email, avatar), sync avatar from userSlice if same user
  const displayUser = {
    ...effectiveUser,
    avtar: (userSliceData?._id === effectiveUser?._id && userSliceData?.avtar)
      ? userSliceData.avtar
      : effectiveUser?.avtar,
  };

  const isSuperAdmin = Number(effectiveRoleId) === 2;
  const isSubAdmin = Number(effectiveRoleId) === 3;

  useEffect(() => {
    const isImpersonatingFromStorage = localStorage.getItem('isImpersonating') === 'true';
    const storedUserStr = localStorage.getItem('user');
    const parsedStoredUser = storedUserStr ? JSON.parse(storedUserStr) : null;

    if (isImpersonatingAuth || isImpersonatingFromStorage) {
      setImpersonating(true);
      setImpersonatedUser(parsedStoredUser || displayUser);
    } else {
      setImpersonating(false);
      setImpersonatedUser(null);
    }
  }, [isImpersonatingAuth, user]);

  const handleLogoutClick = () => setShowLogoutModal(true);

  const handleConfirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    dispatch(logout());
    if (isMobile) onClose?.();
    navigate('/login', { replace: true });
    setShowLogoutModal(false);
    setTimeout(() => window.location.reload(), 100);
  };

  const handleStopImpersonation = async () => {
    try {
      const result = await dispatch(stopImpersonation()).unwrap();
      if (result.status === 1) {
        const originalToken = sessionStorage.getItem('originalToken');
        const originalUserStr = sessionStorage.getItem('originalUser');
        if (originalToken && originalUserStr) {
          const originalUser = JSON.parse(originalUserStr);
          localStorage.setItem('token', originalToken);
          localStorage.setItem('user', originalUserStr);
          localStorage.removeItem('isImpersonating');
          sessionStorage.removeItem('originalToken');
          sessionStorage.removeItem('originalUser');
          setImpersonating(false);
          setImpersonatedUser(null);
          window.location.href = originalUser?.role_id === 2 ? '/super-admin/dashboard' : '/admin/dashboard';
        } else {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/login';
        }
      }
    } catch (error) {
      console.error('Failed to stop impersonation:', error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose?.();
  };

  const adminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/user' },
    { text: 'Payment Plans', icon: <PaymentIcon />, path: '/admin/payments-plans' },
    { text: 'Transaction History', icon: <ReportIcon />, path: '/admin/transactionhistory' },
    { text: 'Reports', icon: <ReceiptIcon />, path: '/admin/reports' },
    { text: 'Profile Manager', icon: <ProfileIcon />, path: '/profile' },
  ];

  const superAdminMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/super-admin/dashboard' },
    { text: 'Organization Details', icon: <BusinessIcon />, path: '/user' },
    { text: 'Revenue Analytics', icon: <MoneyIcon />, path: '/super-admin/revenue' },
    { text: 'Coupon Management', icon: <RedeemIcon />, path: '/super-admin/couponmanagment' },
    { text: 'Plan Management', icon: <PlanIcon />, path: '/super-admin/plans' },
    { text: 'Contact List', icon: <ContactIcon />, path: '/super-admin/contacts' },
    { text: 'Profile Manager', icon: <PersonIcon />, path: '/profile' },
  ];

  const filteredAdminMenuItems = Number(effectiveRoleId) === 3
    ? adminMenuItems.filter(item => item.text !== 'Payment Plans' && item.text !== 'Transaction History')
    : adminMenuItems;

  const menuItems = Number(effectiveRoleId) === 2 ? superAdminMenuItems : filteredAdminMenuItems;
  const roleName = Number(effectiveRoleId) === 2 ? 'Super Admin' : (Number(effectiveRoleId) === 3 ? 'Sub Admin' : 'Admin');

  const isActive = (path) => location.pathname === path;

  const getMobileWidth = () => {
    if (isSmallMobile) return 240;
    if (isMediumMobile) return 260;
    return 280;
  };

  const sidebarContent = (
    <Box sx={{
      height: '100%',
      width: isMobile ? getMobileWidth() : (collapsed ? 72 : 240),
      display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(135deg, #2f6eaa, #1e4f7a)',
      color: 'white', transition: 'width 0.3s ease',
      overflowX: 'hidden', boxShadow: '2px 0 12px rgba(0,0,0,0.15)', borderRadius: 0,
    }}>
      {/* Header / Logo */}
      <Box sx={{
        p: isMobile ? 1.5 : (collapsed ? 1.2 : 2),
        display: 'flex', alignItems: 'center',
        justifyContent: isMobile ? 'space-between' : (collapsed ? 'center' : 'flex-start'),
        gap: 1, borderBottom: '1px solid rgba(255,255,255,0.08)',
        minHeight: isMobile ? 52 : (collapsed ? 52 : 56),
      }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1.2,
          justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
          width: collapsed && !isMobile ? '100%' : 'auto',
        }}>
          <Avatar src={logo} sx={{
            bgcolor: 'primary.main',
            width: isMobile ? 30 : (collapsed ? 30 : 32),
            height: isMobile ? 30 : (collapsed ? 30 : 32),
            fontWeight: 'bold',
            fontSize: isMobile ? '0.8rem' : (collapsed ? '0.9rem' : '0.95rem'),
            border: '2px solid rgba(255,255,255,0.5)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.2)',
          }} />
          {(!collapsed || isMobile) && (
            <Box>
              <Typography variant="subtitle2" fontWeight="bold" noWrap
                sx={{ fontSize: isMobile ? '0.95rem' : '0.9rem', lineHeight: 1.2 }}>
                Team Trackify
              </Typography>
              <Typography variant="caption"
                sx={{ opacity: 0.7, fontSize: isMobile ? '0.6rem' : '0.65rem', display: 'block' }}>
                {roleName}
              </Typography>
            </Box>
          )}
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} sx={{ color: 'white', p: 0.5 }}>
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
      </Box>

      {/* User Info */}
      {(!impersonating || !collapsed || isMobile) && (!collapsed || isMobile) && (
        <Box sx={{ px: isMobile ? 1.5 : 2, py: isMobile ? 1 : 1.5 }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: isMobile ? 1.2 : 1.5,
            bgcolor: 'rgba(255,255,255,0.08)', p: isMobile ? 1 : 1.2, borderRadius: 1.5,
          }}>
            <Avatar src={displayUser?.avtar}
              sx={{ bgcolor: 'secondary.main', width: isMobile ? 28 : 32, height: isMobile ? 28 : 32, fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
              {displayUser?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" fontWeight={500} noWrap
                sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem', lineHeight: 1.2 }}>
                {impersonating ? impersonatedUser?.name || 'Impersonated User' : (displayUser?.name || 'Admin User')}
              </Typography>
              <Typography variant="caption" sx={{
                opacity: 0.75, fontSize: isMobile ? '0.6rem' : '0.65rem', display: 'block',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                maxWidth: isMobile ? 130 : 150,
              }}>
                {impersonating ? impersonatedUser?.email || 'user@example.com' : (displayUser?.email || 'admin@trackify.in')}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, pt: 0.5, px: isMobile ? 0.8 : (collapsed ? 0.5 : 1.5), pb: 0.5 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Tooltip key={item.text} title={collapsed && !isMobile ? item.text : ''} placement="right" arrow
              componentsProps={{ tooltip: { sx: { fontSize: '0.75rem', bgcolor: alpha(theme.palette.primary.main, 0.9) } } }}>
              <ListItem disablePadding sx={{ mb: collapsed && !isMobile ? 1.5 : 0.3 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    minHeight: isMobile ? 36 : (collapsed ? 40 : 42),
                    borderRadius: 1,
                    justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                    px: collapsed && !isMobile ? 0 : (isMobile ? 1.2 : 2),
                    py: isMobile ? 0.6 : 0.8,
                    bgcolor: active ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                    '&:hover': { bgcolor: active ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.15)' },
                    position: 'relative', transition: 'all 0.18s ease',
                  }}>
                  {active && !collapsed && !isMobile && (
                    <Box sx={{
                      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                      width: 4, height: '65%', bgcolor: 'secondary.main', borderRadius: '0 4px 4px 0',
                    }} />
                  )}
                  <ListItemIcon sx={{
                    minWidth: collapsed && !isMobile ? 'auto' : (isMobile ? 28 : 32),
                    color: active ? 'secondary.main' : 'inherit',
                    '& svg': { fontSize: isMobile ? '1rem' : '1.1rem' },
                    display: 'flex', justifyContent: 'center',
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  {(!collapsed || isMobile) && (
                    <ListItemText primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: active ? 600 : 400,
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        color: active ? 'secondary.main' : 'white',
                      }}
                      sx={{ ml: isMobile ? 0.5 : 0.8 }}
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
        mx: isMobile ? 1 : (collapsed ? 1 : 1.5),
        my: collapsed && !isMobile ? 1.5 : 0,
      }} />

      {/* Impersonation Banner */}
      {impersonating && (
        <ImpersonationBanner
          onStopImpersonation={handleStopImpersonation}
          impersonatedUser={impersonatedUser}
          collapsed={collapsed}
          isMobile={isMobile}
        />
      )}

      {/* Logout Button */}
      <Box sx={{
        p: collapsed && !isMobile ? 1.2 : (isMobile ? 1 : 1.5),
        pb: collapsed && !isMobile ? 1.2 : (isMobile ? 1 : 1.5),
        display: 'flex', justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
        mt: collapsed && !isMobile ? 0.2 : 0,
      }}>
        <Tooltip title={collapsed && !isMobile ? 'Logout' : ''} placement="right" arrow
          componentsProps={{ tooltip: { sx: { fontSize: '0.75rem', bgcolor: alpha(theme.palette.primary.main, 0.9) } } }}>
          <ListItemButton
            onClick={handleLogoutClick}
            sx={{
              borderRadius: 1,
              justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
              px: collapsed && !isMobile ? 0 : (isMobile ? 1.2 : 2),
              py: isMobile ? 0.6 : 0.8,
              mx: collapsed && !isMobile ? 'auto' : 0,
              width: collapsed && !isMobile ? 'auto' : '100%',
              display: 'flex', alignItems: 'center',
              '&:hover': { bgcolor: 'rgba(245, 158, 11, 0.25)' },
            }}>
            <ListItemIcon sx={{
              minWidth: collapsed && !isMobile ? 'auto' : (isMobile ? 28 : 32),
              '& svg': { fontSize: isMobile ? '1rem' : '1.1rem' },
              display: 'flex', justifyContent: 'center', color: 'secondary.main',
            }}>
              <LogoutIcon />
            </ListItemIcon>
            {(!collapsed || isMobile) && (
              <ListItemText primary="Logout"
                primaryTypographyProps={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: 'secondary.main' }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <Drawer variant="temporary" open={mobileOpen} onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: getMobileWidth(), boxSizing: 'border-box', bgcolor: 'transparent' } }}>
          {sidebarContent}
        </Drawer>
        <LogoutModal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout}
          title="Sign Out" message="Are you sure you want to sign out?" subMessage="You will be redirected to the login page." />
      </>
    );
  }

  return (
    <>
      <Box sx={{ position: 'fixed', left: 0, top: 0, height: '100vh', zIndex: 1200 }}>
        {sidebarContent}
      </Box>
      <LogoutModal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} onConfirm={handleConfirmLogout}
        title="Sign Out" message="Are you sure you want to sign out?" subMessage="You will be redirected to the login page." />
    </>
  );
};

export default Sidebar;