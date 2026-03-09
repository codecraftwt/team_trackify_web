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
// import LogoutModal from '../models/LogoutModal'; // Import the modal

// const Navbar = ({ sidebarCollapsed, onToggleSidebar, isMobile, mobileOpen }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchor, setNotificationAnchor] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false); // State for modal

//   const { user, role_id } = useSelector((state) => state.auth);
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

//   // This function now opens the modal instead of logging out directly
//   const handleLogoutClick = () => {
//     handleMenuClose(); // Close the menu first
//     setShowLogoutModal(true); // Show the logout modal
//   };

//   // This function handles the actual logout after confirmation
//   const handleConfirmLogout = () => {
//     // Clear all storage
//     localStorage.clear();
//     sessionStorage.clear();

//     // Clear cookies
//     document.cookie.split(";").forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, "")
//         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//     });

//     // Dispatch Redux logout action
//     dispatch(logout());

//     // Navigate to login
//     navigate('/login', { replace: true });

//     // Close modal
//     setShowLogoutModal(false);

//     // Reload page to clear any cached state
//     setTimeout(() => {
//       window.location.reload();
//     }, 100);
//   };

//   const handleProfile = () => {
//     const profilePath = role_id === 2 ? '/super-admin/profile' : '/admin/profile';
//     navigate(profilePath);
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

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         sx={{
//           bgcolor: 'white',
//           color: '#1e293b',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           borderBottom: '1px solid #e2e8f0',
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
//                   color: '#0f766e',
//                   '&:hover': {
//                     bgcolor: alpha('#0f766e', 0.1),
//                   },
//                 }}
//               >
//                 {isMobile ? (
//                   <MenuIcon fontSize="small" />
//                 ) : (
//                   // sidebarCollapsed ? <MenuOpenIcon /> : <MenuIcon />
//                   <MenuIcon />
//                 )}
//               </IconButton>
//             </Tooltip>

//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               sx={{
//                 fontWeight: 600,
//                 color: '#0f766e',
//                 display: { xs: 'none', sm: 'block' },
//                 cursor: 'pointer',
//                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
//               }}
//               onClick={handleDashboard}
//             >
//               Team Trackify
//             </Typography>

//             {!isMobile && (
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: '#64748b',
//                   display: { xs: 'none', md: 'block' },
//                   ml: 2,
//                   px: 1.5,
//                   py: 0.5,
//                   bgcolor: alpha('#0f766e', 0.1),
//                   borderRadius: 2,
//                   fontSize: { xs: '0.7rem', md: '0.8rem' },
//                 }}
//               >
//                 {roleName}
//               </Typography>
//             )}
//           </Box>

//           {/* Right side */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
//             {/* Notifications */}
//             <Tooltip title="Notifications">
//               <IconButton
//                 onClick={handleNotificationOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   color: '#64748b',
//                   '&:hover': {
//                     color: '#0f766e',
//                     bgcolor: alpha('#0f766e', 0.1),
//                   },
//                 }}
//               >
//                 <Badge badgeContent={3} color="error">
//                   <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
//                 </Badge>
//               </IconButton>
//             </Tooltip>

//             {/* Profile */}
//             <Tooltip title="Profile">
//               <IconButton
//                 onClick={handleProfileMenuOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   ml: { xs: 0.5, sm: 1 },
//                   '&:hover': {
//                     bgcolor: alpha('#0f766e', 0.1),
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={user?.avtar}
//                   sx={{
//                     width: { xs: 30, sm: 35, md: 40 },
//                     height: { xs: 30, sm: 35, md: 40 },
//                     bgcolor: '#0f766e',
//                     color: 'white',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                     fontWeight: 600,
//                   }}
//                 >
//                   {user?.name?.charAt(0) || 'A'}
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
//                 minWidth: { xs: 160, sm: 200 },
//                 borderRadius: 2,
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                 border: '1px solid #e2e8f0',
//               }
//             }}
//           >
//             <MenuItem onClick={handleProfile} sx={{ py: { xs: 1, sm: 1.5 } }}>
//               <PersonIcon sx={{ mr: 1.5, color: '#0f766e', fontSize: { xs: 18, sm: 20 } }} />
//               <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//                 My Profile
//               </Typography>
//             </MenuItem>
//             <MenuItem onClick={handleSettings} sx={{ py: { xs: 1, sm: 1.5 } }}>
//               <SettingsIcon sx={{ mr: 1.5, color: '#0f766e', fontSize: { xs: 18, sm: 20 } }} />
//               <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//                 Settings
//               </Typography>
//             </MenuItem>

//             {/* Logout Menu Item - Now opens modal */}
//             <MenuItem 
//               onClick={handleLogoutClick} 
//               sx={{ 
//                 py: { xs: 1, sm: 1.5 }, 
//                 color: '#ef4444',
//                 borderTop: '1px solid',
//                 borderColor: '#e2e8f0',
//                 mt: 1,
//               }}
//             >
//               <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: { xs: 18, sm: 20 } }} />
//               <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
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
// import LogoutModal from '../models/LogoutModal'; // Import the modal

// const Navbar = ({ sidebarCollapsed, onToggleSidebar, isMobile, mobileOpen }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchor, setNotificationAnchor] = useState(null);
//   const [showLogoutModal, setShowLogoutModal] = useState(false); // State for modal

//   const { user, role_id } = useSelector((state) => state.auth);
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

//   // This function now opens the modal instead of logging out directly
//   const handleLogoutClick = () => {
//     handleMenuClose(); // Close the menu first
//     setShowLogoutModal(true); // Show the logout modal
//   };

//   // This function handles the actual logout after confirmation
//   const handleConfirmLogout = () => {
//     // Clear all storage
//     localStorage.clear();
//     sessionStorage.clear();

//     // Clear cookies
//     document.cookie.split(";").forEach((c) => {
//       document.cookie = c
//         .replace(/^ +/, "")
//         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//     });

//     // Dispatch Redux logout action
//     dispatch(logout());

//     // Navigate to login
//     navigate('/login', { replace: true });

//     // Close modal
//     setShowLogoutModal(false);

//     // Reload page to clear any cached state
//     setTimeout(() => {
//       window.location.reload();
//     }, 100);
//   };

//   const handleProfile = () => {
//     const profilePath = role_id === 2 ? '/super-admin/profile' : '/admin/profile';
//     navigate(profilePath);
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

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         sx={{
//           bgcolor: 'white',
//           color: '#1e293b',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           borderBottom: '1px solid #e2e8f0',
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
//                   color: '#2563EB',
//                   '&:hover': {
//                     bgcolor: alpha('#2563EB', 0.1),
//                   },
//                 }}
//               >
//                 {isMobile ? (
//                   <MenuIcon fontSize="small" />
//                 ) : (
//                   // sidebarCollapsed ? <MenuOpenIcon /> : <MenuIcon />
//                   <MenuIcon />
//                 )}
//               </IconButton>
//             </Tooltip>

//             <Typography
//               variant={isMobile ? "subtitle1" : "h6"}
//               sx={{
//                 fontWeight: 600,
//                 background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 display: { xs: 'none', sm: 'block' },
//                 cursor: 'pointer',
//                 fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
//               }}
//               onClick={handleDashboard}
//             >
//               Team Trackify
//             </Typography>

//             {!isMobile && (
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: '#2563EB',
//                   display: { xs: 'none', md: 'block' },
//                   ml: 2,
//                   px: 1.5,
//                   py: 0.5,
//                   bgcolor: alpha('#2563EB', 0.1),
//                   borderRadius: 2,
//                   fontSize: { xs: '0.7rem', md: '0.8rem' },
//                   fontWeight: 500,
//                 }}
//               >
//                 {roleName}
//               </Typography>
//             )}
//           </Box>

//           {/* Right side */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
//             {/* Notifications */}
//             <Tooltip title="Notifications">
//               <IconButton
//                 onClick={handleNotificationOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   color: '#64748b',
//                   '&:hover': {
//                     color: '#2563EB',
//                     bgcolor: alpha('#2563EB', 0.1),
//                   },
//                 }}
//               >
//                 <Badge 
//                   badgeContent={3} 
//                   sx={{
//                     '& .MuiBadge-badge': {
//                       bgcolor: '#2563EB',
//                       color: 'white',
//                       fontSize: '0.6rem',
//                       fontWeight: 600,
//                     }
//                   }}
//                 >
//                   <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
//                 </Badge>
//               </IconButton>
//             </Tooltip>

//             {/* Profile */}
//             <Tooltip title="Profile">
//               <IconButton
//                 onClick={handleProfileMenuOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   ml: { xs: 0.5, sm: 1 },
//                   '&:hover': {
//                     bgcolor: alpha('#2563EB', 0.1),
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={user?.avtar}
//                   sx={{
//                     width: { xs: 30, sm: 35, md: 40 },
//                     height: { xs: 30, sm: 35, md: 40 },
//                     background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//                     color: 'white',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                     fontWeight: 600,
//                     boxShadow: `0 4px 10px -2px ${alpha('#2563EB', 0.3)}`,
//                   }}
//                 >
//                   {user?.name?.charAt(0) || 'A'}
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
//                 minWidth: { xs: 160, sm: 200 },
//                 borderRadius: 2,
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//                 border: '1px solid #e2e8f0',
//               }
//             }}
//           >
//             <MenuItem onClick={handleProfile} sx={{ py: { xs: 1, sm: 1.5 } }}>
//               <PersonIcon sx={{ mr: 1.5, color: '#2563EB', fontSize: { xs: 18, sm: 20 } }} />
//               <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#1e293b' }}>
//                 My Profile
//               </Typography>
//             </MenuItem>
//             <MenuItem onClick={handleSettings} sx={{ py: { xs: 1, sm: 1.5 } }}>
//               <SettingsIcon sx={{ mr: 1.5, color: '#2563EB', fontSize: { xs: 18, sm: 20 } }} />
//               <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#1e293b' }}>
//                 Settings
//               </Typography>
//             </MenuItem>

//             {/* Logout Menu Item - Now opens modal */}
//             <MenuItem 
//               onClick={handleLogoutClick} 
//               sx={{ 
//                 py: { xs: 1, sm: 1.5 }, 
//                 color: '#ef4444',
//                 borderTop: '1px solid',
//                 borderColor: alpha('#2563EB', 0.1),
//                 mt: 1,
//                 '&:hover': {
//                   bgcolor: alpha('#ef4444', 0.05),
//                 }
//               }}
//             >
//               <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: { xs: 18, sm: 20 } }} />
//               <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
//                 Logout
//               </Typography>
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       {/* Notifications Menu - You can implement this later */}
//       <Menu
//         anchorEl={notificationAnchor}
//         open={Boolean(notificationAnchor)}
//         onClose={handleMenuClose}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//         PaperProps={{
//           sx: {
//             mt: 1,
//             minWidth: { xs: 240, sm: 300 },
//             maxWidth: { xs: 280, sm: 350 },
//             borderRadius: 2,
//             boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//             border: '1px solid #e2e8f0',
//             p: 1,
//           }
//         }}
//       >
//         <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: alpha('#2563EB', 0.1), mb: 1 }}>
//           <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#2563EB' }}>
//             Notifications
//           </Typography>
//         </Box>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1, py: 1.5 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//               New user registered
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               5 minutes ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1, py: 1.5 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//               Payment received
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               2 hours ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1, py: 1.5 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
//               System update completed
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               1 day ago
//             </Typography>
//           </Box>
//         </MenuItem>
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















//Welcome msg
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
//     const profilePath = role_id === 2 ? '/super-admin/profile' : '/admin/profile';
//     navigate(profilePath);
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
//           bgcolor: 'white',
//           color: '#1e293b',
//           boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//           borderBottom: '1px solid #e2e8f0',
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
//                   color: '#2563EB',
//                   '&:hover': {
//                     bgcolor: alpha('#2563EB', 0.1),
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
//                     color: '#1e293b',
//                     fontSize: '0.9rem',
//                     lineHeight: 1.3,
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 0.5
//                   }}
//                 >
//                   👋 Welcome back, <span style={{
//                     color: '#2563EB',
//                     fontWeight: 700,
//                     background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//                     WebkitBackgroundClip: 'text',
//                     display: 'flex-row',

//                     WebkitTextFillColor: 'transparent',
//                     display: 'inline-block'
//                   }}>{displayName}</span>
//                 </Typography>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     color: '#64748b',
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
//             {/* Notifications */}
//             <Tooltip title="Notifications">
//               <IconButton
//                 onClick={handleNotificationOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   color: '#64748b',
//                   '&:hover': {
//                     color: '#2563EB',
//                     bgcolor: alpha('#2563EB', 0.1),
//                   },
//                 }}
//               >
//                 <Badge
//                   badgeContent={3}
//                   sx={{
//                     '& .MuiBadge-badge': {
//                       bgcolor: '#2563EB',
//                       color: 'white',
//                       fontSize: '0.6rem',
//                       fontWeight: 600,
//                     }
//                   }}
//                 >
//                   <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
//                 </Badge>
//               </IconButton>
//             </Tooltip>

//             {/* Profile */}
//             <Tooltip title="Profile">
//               <IconButton
//                 onClick={handleProfileMenuOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   ml: { xs: 0.5, sm: 1 },
//                   '&:hover': {
//                     bgcolor: alpha('#2563EB', 0.1),
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={userInfo?.avtar || user?.avtar}
//                   sx={{
//                     width: { xs: 30, sm: 35, md: 40 },
//                     height: { xs: 30, sm: 35, md: 40 },
//                     background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//                     color: 'white',
//                     fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
//                     fontWeight: 600,
//                     boxShadow: `0 4px 10px -2px ${alpha('#2563EB', 0.3)}`,
//                     border: '2px solid white',
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
//                 borderColor: alpha('#2563EB', 0.15),
//                 overflow: 'hidden',
//               }
//             }}
//           >
//             {/* Enhanced User Info Header */}
//             <Box sx={{
//               px: 2.5,
//               py: 2,
//               background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
//               color: 'white',
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
//               <PersonIcon sx={{ mr: 1.5, color: '#2563EB', fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 500 }}>
//                 My Profile
//               </Typography>
//             </MenuItem>
//             <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
//               <SettingsIcon sx={{ mr: 1.5, color: '#2563EB', fontSize: 20 }} />
//               <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 500 }}>
//                 Settings
//               </Typography>
//             </MenuItem>

//             <MenuItem
//               onClick={handleLogoutClick}
//               sx={{
//                 py: 1.5,
//                 color: '#ef4444',
//                 borderTop: '1px solid',
//                 borderColor: alpha('#2563EB', 0.1),
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
//             borderColor: alpha('#2563EB', 0.15),
//             p: 1,
//           }
//         }}
//       >
//         <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: alpha('#2563EB', 0.1), mb: 1 }}>
//           <Typography variant="subtitle1" fontWeight="700" sx={{ color: '#2563EB', fontSize: '1rem' }}>
//             Notifications
//             <Badge
//               badgeContent={3}
//               sx={{ ml: 1, '& .MuiBadge-badge': { bgcolor: '#2563EB', color: 'white', fontSize: '0.6rem' } }}
//             />
//           </Typography>
//         </Box>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1.5, py: 1.5, px: 2 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b', mb: 0.3 }}>
//               New user registered
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//               5 minutes ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1.5, py: 1.5, px: 2 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b', mb: 0.3 }}>
//               Payment received
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//               2 hours ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1.5, py: 1.5, px: 2 }}>
//           <Box>
//             <Typography variant="body2" fontWeight="600" sx={{ color: '#1e293b', mb: 0.3 }}>
//               System update completed
//             </Typography>
//             <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
//               1 day ago
//             </Typography>
//           </Box>
//         </MenuItem>
//         <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid', borderColor: alpha('#2563EB', 0.1), textAlign: 'center' }}>
//           <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>
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




















//////////////////////////////    Centralised Color     ///////////////////////////////
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
//     const profilePath = '/profile';
//     navigate(profilePath);
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
//             {/* Notifications */}
//             {/* <Tooltip title="Notifications">
//               <IconButton
//                 onClick={handleNotificationOpen}
//                 size={isMobile ? "small" : "medium"}
//                 sx={{
//                   color: 'text.secondary',
//                   '&:hover': {
//                     color: 'primary.main',
//                     bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   },
//                 }}
//               >
//                 <Badge
//                   badgeContent={3}
//                   sx={{
//                     '& .MuiBadge-badge': {
//                       bgcolor: 'primary.main',
//                       color: 'primary.contrastText',
//                       fontSize: '0.6rem',
//                       fontWeight: 600,
//                     }
//                   }}
//                 >
//                   <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
//                 </Badge>
//               </IconButton>
//             </Tooltip> */}

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
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Tune as TuneIcon,
  Payment as PaymentIcon,
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

  const { user, role_id } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);

  const isSuperAdmin = role_id === 2;
  const roleName = isSuperAdmin ? 'Super Admin' : 'Admin';

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationOpen = (event) => setNotificationAnchor(event.currentTarget);
  const handleMenuClose = () => { setAnchorEl(null); setNotificationAnchor(null); };

  const handleLogoutClick = () => { handleMenuClose(); setShowLogoutModal(true); };

  const handleConfirmLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    dispatch(logout());
    navigate('/login', { replace: true });
    setShowLogoutModal(false);
    setTimeout(() => { window.location.reload(); }, 100);
  };

  const handleProfile = () => {
    navigate('/profile', { state: { tab: 0 } });
    handleMenuClose();
  };

  const handleConfiguration = () => {
    navigate('/profile', { state: { tab: 1 } });
    handleMenuClose();
  };

  const handleDashboard = () => {
    navigate(isSuperAdmin ? '/super-admin/dashboard' : '/admin/dashboard');
  };

  const displayName = userInfo?.name || user?.name || 'Admin User';
  const displayEmail = userInfo?.email || user?.email || 'admin@trackify.in';

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: `0 2px 10px ${alpha(theme.palette.common.black, 0.05)}`,
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.primary.main, 0.1),
          width: '100%',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
          {/* Left side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
              <IconButton onClick={onToggleSidebar} size={isMobile ? "small" : "medium"}
                sx={{ 
                  color: theme.palette.primary.main, 
                  '&:hover': { 
                    bgcolor: alpha(theme.palette.primary.main, 0.1) 
                  } 
                }}>
                <MenuIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Tooltip>

            {!isMobile && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-start', mr: 2 }}>
                <Typography variant="body1" fontWeight={600}
                  sx={{ color: 'text.primary', fontSize: '0.9rem', lineHeight: 1.3, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  👋 Welcome back,{' '}
                  <span style={{
                    color: theme.palette.primary.main, 
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent', 
                    display: 'inline-block'
                  }}>{displayName}</span>
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleProfileMenuOpen} size={isMobile ? "small" : "medium"}
                sx={{ 
                  ml: { xs: 0.5, sm: 1 }, 
                  '&:hover': { 
                    bgcolor: alpha(theme.palette.primary.main, 0.1) 
                  } 
                }}>
                <Avatar
                  src={userInfo?.avtar || user?.avtar}
                  sx={{
                    width: { xs: 30, sm: 35, md: 40 }, 
                    height: { xs: 30, sm: 35, md: 40 },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: theme.palette.primary.contrastText, 
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                    fontWeight: 600, 
                    boxShadow: `0 4px 10px -2px ${alpha(theme.palette.primary.main, 0.3)}`,
                    border: '2px solid',
                    borderColor: theme.palette.background.paper,
                  }}
                >
                  {(userInfo?.name?.charAt(0) || user?.name?.charAt(0) || 'A')}
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
                minWidth: { xs: 200, sm: 230 }, 
                borderRadius: 2.5,
                boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.15)}`, 
                border: '1px solid',
                borderColor: alpha(theme.palette.primary.main, 0.15), 
                overflow: 'hidden',
              }
            }}
          >
            {/* User Info Header */}
            <Box sx={{
              px: 2.5, 
              py: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: theme.palette.primary.contrastText,
            }}>
              <Typography fontWeight={700} sx={{ fontSize: '0.95rem', mb: 0.4 }}>{displayName}</Typography>
              <Typography sx={{ color: alpha('#fff', 0.85), fontSize: '0.68rem', display: 'block' }}>{displayEmail}</Typography>
              <Box sx={{ 
                mt: 0.8, 
                display: 'inline-flex', 
                alignItems: 'center', 
                backgroundColor: alpha('#fff', 0.2), 
                borderRadius: 4, 
                px: 1.2, 
                py: 0.3 
              }}>
                <span style={{ fontSize: '0.62rem', fontWeight: 600 }}>{roleName}</span>
              </Box>
            </Box>

            {/* My Profile */}
            <MenuItem onClick={handleProfile} 
              sx={{ 
                py: 1.2, 
                mt: 0.5, 
                mx: 0.5, 
                borderRadius: 1.5, 
                '&:hover': { 
                  bgcolor: alpha(theme.palette.primary.main, 0.06) 
                } 
              }}>
              <PersonIcon sx={{ 
                mr: 1.5, 
                color: theme.palette.primary.main, 
                fontSize: 19 
              }} />
              <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.primary', fontWeight: 500 }}>
                My Profile
              </Typography>
            </MenuItem>

            {/* Configuration — superadmin only */}
            {isSuperAdmin && (
              <MenuItem onClick={handleConfiguration}
                sx={{ 
                  py: 1.2, 
                  mx: 0.5, 
                  borderRadius: 1.5, 
                  '&:hover': { 
                    bgcolor: alpha(theme.palette.primary.main, 0.06) 
                  } 
                }}>
                <Box sx={{
                  width: 28, 
                  height: 28, 
                  borderRadius: 1, 
                  mr: 1.5, 
                  flexShrink: 0,
                  bgcolor: alpha(theme.palette.primary.main, 0.1), 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                }}>
                  <PaymentIcon sx={{ 
                    fontSize: 15, 
                    color: theme.palette.primary.main 
                  }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', color: 'text.primary', fontWeight: 500, lineHeight: 1.2 }}>
                    Configuration
                  </Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', lineHeight: 1 }}>
                    Razorpay & Gmail setup
                  </Typography>
                </Box>
              </MenuItem>
            )}

            <Divider sx={{ 
              mx: 1, 
              borderColor: alpha(theme.palette.primary.main, 0.08) 
            }} />

            {/* Logout */}
            <MenuItem onClick={handleLogoutClick}
              sx={{ 
                py: 1.2, 
                mb: 0.5, 
                mx: 0.5, 
                borderRadius: 1.5, 
                color: theme.palette.error.main, 
                '&:hover': { 
                  bgcolor: alpha(theme.palette.error.main, 0.05) 
                } 
              }}>
              <LogoutIcon sx={{ 
                mr: 1.5, 
                color: theme.palette.error.main, 
                fontSize: 19 
              }} />
              <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor} 
        open={Boolean(notificationAnchor)} 
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{ 
          sx: { 
            mt: 1, 
            minWidth: { xs: 260, sm: 320 }, 
            maxWidth: { xs: 300, sm: 380 }, 
            borderRadius: 2.5, 
            boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.15)}`, 
            border: '1px solid', 
            borderColor: alpha(theme.palette.primary.main, 0.15), 
            p: 1 
          } 
        }}
      >
        <Box sx={{ 
          p: 1.5, 
          borderBottom: '1px solid', 
          borderColor: alpha(theme.palette.primary.main, 0.1), 
          mb: 1 
        }}>
          <Typography variant="subtitle1" fontWeight="700" sx={{ color: theme.palette.primary.main, fontSize: '1rem' }}>
            Notifications <Badge 
              badgeContent={3} 
              sx={{ 
                ml: 1, 
                '& .MuiBadge-badge': { 
                  bgcolor: theme.palette.primary.main, 
                  color: theme.palette.primary.contrastText, 
                  fontSize: '0.6rem' 
                } 
              }} 
            />
          </Typography>
        </Box>
        {["New user registered • 5 minutes ago", "Payment received • 2 hours ago", "System update completed • 1 day ago"].map((text, i) => (
          <MenuItem key={i} onClick={handleMenuClose} sx={{ borderRadius: 1.5, py: 1.5, px: 2 }}>
            <Box>
              <Typography variant="body2" fontWeight="600" sx={{ color: 'text.primary', mb: 0.3 }}>{text.split(' • ')[0]}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>{text.split(' • ')[1]}</Typography>
            </Box>
          </MenuItem>
        ))}
        <Box sx={{ 
          mt: 1, 
          pt: 1, 
          borderTop: '1px solid', 
          borderColor: alpha(theme.palette.primary.main, 0.1), 
          textAlign: 'center' 
        }}>
          <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 600, cursor: 'pointer' }}>
            View all notifications
          </Typography>
        </Box>
      </Menu>

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