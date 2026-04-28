// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Badge,
//   Box,
//   alpha,
//   useTheme,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   MenuOpen as MenuOpenIcon,
//   Notifications as NotificationsIcon,
//   Settings as SettingsIcon,
//   Logout as LogoutIcon,
//   Person as PersonIcon,
// } from '@mui/icons-material';
// import { logout } from '../../redux/slices/authSlice';
// import LogoutModal from '../models/LogoutModal';

// const Navbar = ({ sidebarCollapsed, onToggleSidebar, isMobile, mobileOpen }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchor, setNotificationAnchor] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   // Get user from auth slice
//   const { user, role_id } = useSelector((state) => state.auth);
//   // Get user info from user slice (more detailed profile info)
//   const { userInfo } = useSelector((state) => state.user);

//   const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleNotificationOpen = (event) => {
//     setNotificationAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setNotificationAnchor(null);
//   };

//   const handleLogoutClick = () => {
//     handleMenuClose();
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
//     navigate('/login', { replace: true });
//     setShowLogoutModal(false);

//     setTimeout(() => {
//       window.location.reload();
//     }, 100);
//   };

//   const handleProfile = () => {
    
//     navigate('/profile');
//     handleMenuClose();
//   };

//   const handleSettings = () => {
//     const settingsPath = role_id === 2 ? '/super-admin/settings' : '/admin/settings';
//     navigate(settingsPath);
//     handleMenuClose();
//   };

//   const handleDashboard = () => {
//     const dashboardPath = role_id === 2 ? '/super-admin/dashboard' : '/admin/dashboard';
//     navigate(dashboardPath);
//   };

//   // Get the display name - prioritize userInfo from user slice, fallback to auth user
//   const displayName = userInfo?.name || user?.name || 'Admin User';
//   const displayEmail = userInfo?.email || user?.email || 'admin@trackify.in';

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         sx={{
//           bgcolor: 'background.paper',
//           color: 'text.primary',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           borderBottom: '1px solid',
//           borderColor: alpha(theme.palette.divider, 0.1),
//           width: '100%',
//         }}
//       >
//         <Toolbar sx={{
//           justifyContent: 'space-between',
//           minHeight: { xs: 56, sm: 64 },
//           px: { xs: 1, sm: 2 },
//         }}>
//           {/* Left side */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
//             <Tooltip title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
//               <IconButton
//                 onClick={onToggleSidebar}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   color: 'primary.main',
//                   '&:hover': {
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   },
//                 }}
//               >
//                 {isMobile ? (
//                   <MenuIcon fontSize="small" />
//                 ) : (
//                   <MenuIcon />
//                 )}
//               </IconButton>
//             </Tooltip>

//             {/* Welcome Text - Bigger and Better */}
//             {!isMobile && (
//               <Box sx={{
//                 display: { xs: 'none', md: 'flex' },
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 mr: 2,
//               }}>
//                 <Typography
//                   variant="body1"
//                   fontWeight={600}
//                   sx={{
//                     color: 'text.primary',
//                     fontSize: '0.9rem',
//                     lineHeight: 1.3,
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 0.5
//                   }}
//                 >
//                   👋 Welcome back, <span style={{
//                     color: theme.palette.primary.main,
//                     fontWeight: 700,
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     display: 'inline-block'
//                   }}>{displayName}</span>
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: 'text.secondary',
//                     fontSize: '0.7rem',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 0.5,
//                     mt: 0.2
//                   }}
//                 >

//                 </Typography>
//               </Box>
//             )}
//           </Box>

//           {/* Right side */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
      

//             {/* Profile */}
//             <Tooltip title="Profile">
//               <IconButton
//                 onClick={handleProfileMenuOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   ml: { xs: 0.5, sm: 1 },
//                   '&:hover': {
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={userInfo?.avtar || user?.avtar}
//                   sx={{
//                     width: { xs: 30, sm: 35, md: 40 },
//                     height: { xs: 30, sm: 35, md: 40 },
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     color: 'primary.contrastText',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                     fontWeight: 600,
//                     boxShadow: `0 4px 10px -2px ${alpha(theme.palette.primary.main, 0.3)}`,
//                     border: '2px solid',
//                     borderColor: 'background.paper',
//                   }}
//                 >
//                   {(userInfo?.name?.charAt(0) || user?.name?.charAt(0) || 'A')}
//                 </Avatar>
//               </IconButton>
//             </Tooltip>
//           </Box>

//           {/* Profile Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//             PaperProps={{
//               sx: {
//                 mt: 1,
//                 minWidth: { xs: 180, sm: 220 },
//                 borderRadius: 2.5,
//                 boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
//                 border: '1px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.15),
//                 overflow: 'hidden',
//               }
//             }}
//           >
//             {/* Enhanced User Info Header */}
//             <Box sx={{
//               px: 2.5,
//               py: 2,
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               color: 'primary.contrastText',
//             }}>
//               <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem', mb: 0.5 }}>
//                 {displayName}
//               </Typography>
//               <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: '0.7rem', display: 'block' }}>
//                 {displayEmail}
//               </Typography>
//               <Box sx={{
//                 mt: 1,
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 backgroundColor: alpha('#ffffff', 0.2),
//                 borderRadius: 4,
//                 px: 1.2,
//                 py: 0.3,
//               }}>
//                 <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>{roleName}</span>
//               </Box>
//             </Box>

//             <MenuItem onClick={handleProfile} sx={{ py: 1.5, mt: 0.5 }}>
//               <PersonIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'text.primary', fontWeight: 500 }}>
//                 My Profile
//               </Typography>
//             </MenuItem>
            

//             <MenuItem
//               onClick={handleLogoutClick}
//               sx={{
//                 py: 1.5,
//                 color: '#ef4444',
//                 borderTop: '1px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 mt: 0.5,
//                 '&:hover': {
//                   bgcolor: alpha('#ef4444', 0.05),
//                 }
//               }}
//             >
//               <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
//                 Logout
//               </Typography>
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Notifications Menu */}
//       <Menu
//         anchorEl={notificationAnchor}
//         open={Boolean(notificationAnchor)}
//         onClose={handleMenuClose}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//         PaperProps={{
//           sx: {
//             mt: 1,
//             minWidth: { xs: 260, sm: 320 },
//             maxWidth: { xs: 300, sm: 380 },
//             borderRadius: 2.5,
//             boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
//             border: '1px solid',
//             borderColor: alpha(theme.palette.primary.main, 0.15),
//             p: 1,
//           }
//         }}
//       >
//         <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1), mb: 1 }}>
//           <Typography variant="subtitle1" fontWeight="700" sx={{ color: 'primary.main', fontSize: '1rem' }}>
//             Notifications
//             <Badge
//               badgeContent={3}
//               sx={{ ml: 1, '& .MuiBadge-badge': { bgcolor: 'primary.main', color: 'primary.contrastText', fontSize: '0.6rem' } }}
//             />
//           </Typography>
//         </Box>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1.5, py: 1.5, px: 2 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary', mb: 0.3 }}>
//               New user registered
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//               5 minutes ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1.5, py: 1.5, px: 2 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary', mb: 0.3 }}>
//               Payment received
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//               2 hours ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1.5, py: 1.5, px: 2 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary', mb: 0.3 }}>
//               System update completed
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//               1 day ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1), textAlign: 'center' }}>
//           <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>
//             View all notifications
//           </Typography>
//         </Box>
//       </Menu>

//       {/* Logout Modal */}
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

// export default Navbar;















// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Menu,
//   MenuItem,
//   Tooltip,
//   Badge,
//   Box,
//   alpha,
//   useTheme,
//   Chip,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Notifications as NotificationsIcon,
//   Settings as SettingsIcon,
//   Logout as LogoutIcon,
//   Person as PersonIcon,
// } from '@mui/icons-material';
// import { logout } from '../../redux/slices/authSlice';
// import LogoutModal from '../models/LogoutModal';

// const Navbar = ({ sidebarCollapsed, onToggleSidebar, isMobile, mobileOpen }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchor, setNotificationAnchor] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   // Get user from auth slice
//   const { user, role_id } = useSelector((state) => state.auth);
//   // Get user info from user slice (more detailed profile info)
//   const { userInfo } = useSelector((state) => state.user);

//   const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleNotificationOpen = (event) => {
//     setNotificationAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setNotificationAnchor(null);
//   };

//   const handleLogoutClick = () => {
//     handleMenuClose();
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
//     navigate('/login', { replace: true });
//     setShowLogoutModal(false);

//     setTimeout(() => {
//       window.location.reload();
//     }, 100);
//   };

//   const handleProfile = () => {
//     navigate('/profile');
//     handleMenuClose();
//   };

//   const handleConfiguration = () => {
//     // Navigate to profile with state to open config tab
//     navigate('/profile', { 
//       state: { openConfigTab: true } 
//     });
//     handleMenuClose();
//   };

//   const handleSettings = () => {
//     const settingsPath = role_id === 2 ? '/super-admin/settings' : '/admin/settings';
//     navigate(settingsPath);
//     handleMenuClose();
//   };

//   const handleDashboard = () => {
//     const dashboardPath = role_id === 2 ? '/super-admin/dashboard' : '/admin/dashboard';
//     navigate(dashboardPath);
//   };

//   // Get the display name - prioritize userInfo from user slice, fallback to auth user
//   const displayName = userInfo?.name || user?.name || 'Admin User';
//   const displayEmail = userInfo?.email || user?.email || 'admin@trackify.in';

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         sx={{
//           bgcolor: 'background.paper',
//           color: 'text.primary',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           borderBottom: '1px solid',
//           borderColor: alpha(theme.palette.divider, 0.1),
//           width: '100%',
//         }}
//       >
//         <Toolbar sx={{
//           justifyContent: 'space-between',
//           minHeight: { xs: 56, sm: 64 },
//           px: { xs: 1, sm: 2 },
//         }}>
//           {/* Left side */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
//             <Tooltip title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
//               <IconButton
//                 onClick={onToggleSidebar}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   color: 'primary.main',
//                   '&:hover': {
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   },
//                 }}
//               >
//                 {isMobile ? (
//                   <MenuIcon fontSize="small" />
//                 ) : (
//                   <MenuIcon />
//                 )}
//               </IconButton>
//             </Tooltip>

//             {/* Welcome Text - Bigger and Better */}
//             {!isMobile && (
//               <Box sx={{
//                 display: { xs: 'none', md: 'flex' },
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 mr: 2,
//               }}>
//                 <Typography
//                   variant="body1"
//                   fontWeight={600}
//                   sx={{
//                     color: 'text.primary',
//                     fontSize: '0.9rem',
//                     lineHeight: 1.3,
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 0.5
//                   }}
//                 >
//                   👋 Welcome back, <span style={{
//                     color: theme.palette.primary.main,
//                     fontWeight: 700,
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     display: 'inline-block'
//                   }}>{displayName}</span>
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: 'text.secondary',
//                     fontSize: '0.7rem',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 0.5,
//                     mt: 0.2
//                   }}
//                 >

//                 </Typography>
//               </Box>
//             )}
//           </Box>

//           {/* Right side */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
//             {/* Profile */}
//             <Tooltip title="Profile">
//               <IconButton
//                 onClick={handleProfileMenuOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   ml: { xs: 0.5, sm: 1 },
//                   '&:hover': {
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={userInfo?.avtar || user?.avtar}
//                   sx={{
//                     width: { xs: 30, sm: 35, md: 40 },
//                     height: { xs: 30, sm: 35, md: 40 },
//                     background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     color: 'primary.contrastText',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                     fontWeight: 600,
//                     boxShadow: `0 4px 10px -2px ${alpha(theme.palette.primary.main, 0.3)}`,
//                     border: '2px solid',
//                     borderColor: 'background.paper',
//                   }}
//                 >
//                   {(userInfo?.name?.charAt(0) || user?.name?.charAt(0) || 'A')}
//                 </Avatar>
//               </IconButton>
//             </Tooltip>
//           </Box>

//           {/* Profile Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//             PaperProps={{
//               sx: {
//                 mt: 1,
//                 minWidth: { xs: 180, sm: 220 },
//                 borderRadius: 2.5,
//                 boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
//                 border: '1px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.15),
//                 overflow: 'hidden',
//               }
//             }}
//           >
//             {/* Enhanced User Info Header */}
//             <Box sx={{
//               px: 2.5,
//               py: 2,
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               color: 'primary.contrastText',
//             }}>
//               <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem', mb: 0.5 }}>
//                 {displayName}
//               </Typography>
//               <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: '0.7rem', display: 'block' }}>
//                 {displayEmail}
//               </Typography>
//               <Box sx={{
//                 mt: 1,
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 backgroundColor: alpha('#ffffff', 0.2),
//                 borderRadius: 4,
//                 px: 1.2,
//                 py: 0.3,
//               }}>
//                 <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>{roleName}</span>
//               </Box>
//             </Box>

//             {/* My Profile Menu Item */}
//             <MenuItem onClick={handleProfile} sx={{ py: 1.5, mt: 0.5 }}>
//               <PersonIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'text.primary', fontWeight: 500 }}>
//                 My Profile
//               </Typography>
//             </MenuItem>

//             {/* Configuration Menu Item - Only for Super Admin (role_id 2) */}
//             {role_id === 2 && (
//               <MenuItem onClick={handleConfiguration} sx={{ py: 1.5 }}>
//                 <SettingsIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
//                 <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'text.primary', fontWeight: 500 }}>
//                   Configuration
//                 </Typography>
//                 <Chip
//                   label="Admin"
//                   size="small"
//                   sx={{
//                     ml: 'auto',
//                     height: 20,
//                     fontSize: '0.6rem',
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                     color: theme.palette.primary.main,
//                     fontWeight: 600,
//                   }}
//                 />
//               </MenuItem>
//             )}

//             {/* Logout Menu Item */}
//             <MenuItem
//               onClick={handleLogoutClick}
//               sx={{
//                 py: 1.5,
//                 color: '#ef4444',
//                 borderTop: '1px solid',
//                 borderColor: alpha(theme.palette.primary.main, 0.1),
//                 mt: 0.5,
//                 '&:hover': {
//                   bgcolor: alpha('#ef4444', 0.05),
//                 }
//               }}
//             >
//               <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
//                 Logout
//               </Typography>
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Logout Modal */}
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

// export default Navbar;









////////////////Subadmin name if role id 3


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Box,
  alpha,
  useTheme,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';
import LogoutModal from '../models/LogoutModal';

const Navbar = ({ sidebarCollapsed, onToggleSidebar, isMobile, mobileOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Get user from auth slice (SAME AS SIDEBAR)
  const { user, role_id, isImpersonating } = useSelector((state) => state.auth);
  // Get user info from user slice
  const { userInfo } = useSelector((state) => state.user);

  // Get stored user for fallback only
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const storedUser = getStoredUser();
  
  // PRIORITIZE Redux auth user FIRST (like Sidebar), then fallback to storedUser
  const effectiveUser = user || storedUser;
  const effectiveRoleId = user?.role_id || storedUser?.role_id || role_id;
  
  // Determine role name based on role_id
  const getRoleName = () => {
    if (Number(effectiveRoleId) === 3) return 'Sub-admin';
    if (Number(effectiveRoleId) === 2) return 'Super Admin';
    return 'Admin';
  };

  const roleName = getRoleName();
  const isSubAdmin = Number(effectiveRoleId) === 3;
  const isSuperAdmin = Number(effectiveRoleId) === 2;

  // Get display name - prioritize Redux user FIRST (like Sidebar)
  // const displayName = effectiveUser?.name || 'Admin User';
  const displayName = userInfo?.name || effectiveUser?.name || 'Admin User';
  const displayEmail = effectiveUser?.email || 'admin@trackify.in';
  
  // Get avatar URL - prioritize Redux user FIRST
  // const avatarUrl = effectiveUser?.avtar || effectiveUser?.avatar || null;
  const avatarUrl = userInfo?.avtar || effectiveUser?.avtar || effectiveUser?.avatar || null;
  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'A';
    const nameParts = name.split(' ').filter(part => part.length > 0);
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const userInitials = getInitials(displayName);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationAnchor(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    dispatch(logout());
    navigate('/login', { replace: true });
    setShowLogoutModal(false);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleConfiguration = () => {
    navigate('/profile', { 
      state: { openConfigTab: true } 
    });
    handleMenuClose();
  };

  const handleSettings = () => {
    const settingsPath = isSuperAdmin ? '/super-admin/settings' : '/admin/settings';
    navigate(settingsPath);
    handleMenuClose();
  };

  const handleDashboard = () => {
    const dashboardPath = isSuperAdmin ? '/super-admin/dashboard' : '/admin/dashboard';
    navigate(dashboardPath);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.1),
          width: '100%',
        }}
      >
        <Toolbar sx={{
          justifyContent: 'space-between',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 },
        }}>
          {/* Left side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
              <IconButton
                onClick={onToggleSidebar}
                size={isMobile ? "small" : "medium"}
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {isMobile ? (
                  <MenuIcon fontSize="small" />
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            </Tooltip>

            {/* Welcome Text */}
            {!isMobile && (
              <Box sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'flex-start',
                mr: 2,
              }}>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    color: 'text.primary',
                    fontSize: '0.9rem',
                    lineHeight: 1.3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  👋 Welcome back, <span style={{
                    color: isSubAdmin ? theme.palette.secondary.main : theme.palette.primary.main,
                    fontWeight: 700,
                    background: isSubAdmin 
                      ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
                      : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>{displayName}</span>
                  {isSubAdmin && (
                    <Chip
                      label="Sub-admin"
                      size="small"
                      sx={{
                        ml: 1,
                        height: 18,
                        fontSize: '0.55rem',
                        bgcolor: alpha(theme.palette.secondary.main, 0.15),
                        color: theme.palette.secondary.main,
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            <Tooltip title="Profile">
              <IconButton
                onClick={handleProfileMenuOpen}
                size={isMobile ? "small" : "medium"}
                sx={{
                  ml: { xs: 0.5, sm: 1 },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <Avatar
                  src={avatarUrl}
                  alt={displayName}
                  sx={{
                    width: { xs: 30, sm: 35, md: 40 },
                    height: { xs: 30, sm: 35, md: 40 },
                    background: avatarUrl 
                      ? 'transparent'
                      : isSubAdmin
                        ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
                        : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: '#fff',
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                    fontWeight: 600,
                    boxShadow: `0 4px 10px -2px ${alpha(isSubAdmin ? theme.palette.secondary.main : theme.palette.primary.main, 0.3)}`,
                    border: '2px solid',
                    borderColor: 'background.paper',
                  }}
                >
                  {!avatarUrl && userInitials}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: { xs: 180, sm: 220 },
                borderRadius: 2.5,
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                border: '1px solid',
                borderColor: alpha(isSubAdmin ? theme.palette.secondary.main : theme.palette.primary.main, 0.15),
                overflow: 'hidden',
              }
            }}
          >
            {/* User Info Header */}
            <Box sx={{
              px: 2.5,
              py: 2,
              background: isSubAdmin
                ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`
                : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: '#fff',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Avatar
                  src={avatarUrl}
                  alt={displayName}
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: avatarUrl ? 'transparent' : alpha('#ffffff', 0.2),
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    border: '2px solid',
                    borderColor: alpha('#ffffff', 0.3),
                  }}
                >
                  {!avatarUrl && userInitials}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ fontSize: '1rem', mb: 0.5 }}>
                    {displayName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: alpha('#ffffff', 0.9), fontSize: '0.7rem', display: 'block' }}>
                    {displayEmail}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: alpha('#ffffff', 0.2),
                borderRadius: 4,
                px: 1.2,
                py: 0.3,
              }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 500 }}>{roleName}</span>
              </Box>
            </Box>

            {/* My Profile Menu Item */}
            <MenuItem onClick={handleProfile} sx={{ py: 1.5, mt: 0.5 }}>
              <PersonIcon sx={{ mr: 1.5, color: isSubAdmin ? 'secondary.main' : 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'text.primary', fontWeight: 500 }}>
                My Profile
              </Typography>
            </MenuItem>

            {/* Configuration Menu Item - Only for Super Admin */}
            {isSuperAdmin && (
              <MenuItem onClick={handleConfiguration} sx={{ py: 1.5 }}>
                <SettingsIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'text.primary', fontWeight: 500 }}>
                  Configuration
                </Typography>
                <Chip
                  label="Admin"
                  size="small"
                  sx={{
                    ml: 'auto',
                    height: 20,
                    fontSize: '0.6rem',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                />
              </MenuItem>
            )}

            {/* Logout Menu Item */}
            <MenuItem
              onClick={handleLogoutClick}
              sx={{
                py: 1.5,
                color: '#ef4444',
                borderTop: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.1),
                mt: 0.5,
                '&:hover': {
                  bgcolor: alpha('#ef4444', 0.05),
                }
              }}
            >
              <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

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

export default Navbar;