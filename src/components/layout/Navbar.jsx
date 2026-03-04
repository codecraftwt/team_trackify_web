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

// const Navbar = ({ sidebarCollapsed, onToggleSidebar }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [notificationAnchor, setNotificationAnchor] = useState(null);

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

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//     handleMenuClose(); 
//   };

//   const handleProfile = () => {
//     // const profilePath = role_id === 2 ? '/super-admin/profile' : '/admin/profile';
//     // navigate(profilePath);
//     navigate('/profile');
//     handleMenuClose();
//   };

//   // const handleSettings = () => {
//   //   const settingsPath = role_id === 2 ? '/super-admin/settings' : '/admin/settings';
//   //   navigate(settingsPath);
//   //   handleMenuClose();
//   // };

//   const handleDashboard = () => {
//     const dashboardPath = role_id === 2 ? '/super-admin/dashboard' : '/admin/dashboard';
//     navigate(dashboardPath);
//   };

//   return (
//     <AppBar
//       position="sticky" // Changed from 'fixed' to 'sticky'
//       sx={{
//         bgcolor: 'white',
//         color: '#1e293b',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//         borderBottom: '1px solid #e2e8f0',
//         width: '100%', // Takes full width of its container (the right section)
//       }}
//     >
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         {/* Left side - Menu toggle and title */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Tooltip title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
//             <IconButton
//               onClick={onToggleSidebar}
//               sx={{
//                 color: '#0f766e',
//                 '&:hover': {
//                   bgcolor: alpha('#0f766e', 0.1),
//                 },
//               }}
//             >
//               {/* {sidebarCollapsed ? <MenuOpenIcon /> : <MenuIcon />} */}
//               <MenuIcon />
//             </IconButton>
//           </Tooltip>
          
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 600,
//               color: '#0f766e',
//               display: { xs: 'none', sm: 'block' },
//               cursor: 'pointer',
//             }}
//             onClick={handleDashboard}
//           >
//             Team Trackify
//           </Typography>
          
//           <Typography
//             variant="body2"
//             sx={{
//               color: '#64748b',
//               display: { xs: 'none', md: 'block' },
//               ml: 2,
//               px: 1.5,
//               py: 0.5,
//               bgcolor: alpha('#0f766e', 0.1),
//               borderRadius: 2,
//             }}
//           >
//             {roleName}
//           </Typography>
//         </Box>

//         {/* Right side - Notifications and Profile */}
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           {/* Notifications */}
//           <Tooltip title="Notifications">
//             <IconButton
//               onClick={handleNotificationOpen}
//               sx={{
//                 color: '#64748b',
//                 '&:hover': {
//                   color: '#0f766e',
//                   bgcolor: alpha('#0f766e', 0.1),
//                 },
//               }}
//             >
//               <Badge badgeContent={3} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Tooltip>

//           {/* Profile */}
//           <Tooltip title="Profile">
//             <IconButton
//               onClick={handleProfileMenuOpen}
//               sx={{
//                 ml: 1,
//                 '&:hover': {
//                   bgcolor: alpha('#0f766e', 0.1),
//                 },
//               }}
//             >
//               <Avatar
//                 src={user?.avtar}
//                 sx={{
//                   width: 35,
//                   height: 35,
//                   bgcolor: '#0f766e',
//                   color: 'white',
//                   fontSize: '0.9rem',
//                   fontWeight: 600,
//                 }}
//               >
//                 {user?.name?.charAt(0) || 'A'}
//               </Avatar>
//             </IconButton>
//           </Tooltip>
//         </Box>

//         {/* Profile Menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           onClick={handleMenuClose}
//           transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//           anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//           PaperProps={{
//             sx: {
//               mt: 1,
//               minWidth: 200,
//               borderRadius: 2,
//               boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//               border: '1px solid #e2e8f0',
//             }
//           }}
//         >
//           <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
//             <PersonIcon sx={{ mr: 1.5, color: '#0f766e', fontSize: 20 }} />
//             <Typography variant="body2">My Profile</Typography>
//           </MenuItem>
//           {/* <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
//             <SettingsIcon sx={{ mr: 1.5, color: '#0f766e', fontSize: 20 }} />
//             <Typography variant="body2">Settings</Typography>
//           </MenuItem> */}
//           <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#ef4444' }}>
//             <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: 20 }} />
//             <Typography variant="body2">Logout</Typography>
//           </MenuItem>
//         </Menu>

//         {/* Notifications Menu */}
//         <Menu
//           anchorEl={notificationAnchor}
//           open={Boolean(notificationAnchor)}
//           onClose={handleMenuClose}
//           transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//           anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//           PaperProps={{
//             sx: {
//               mt: 1,
//               width: 320,
//               maxHeight: 400,
//               borderRadius: 2,
//               boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//               border: '1px solid #e2e8f0',
//             }
//           }}
//         >
//           <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0' }}>
//             <Typography variant="subtitle2" fontWeight={600}>Notifications</Typography>
//           </Box>
//           {[1, 2, 3].map((item) => (
//             <MenuItem key={item} sx={{ py: 1.5, px: 2, borderBottom: '1px solid #f1f5f9' }}>
//               <Box>
//                 <Typography variant="body2" fontWeight={500}>New activity detected</Typography>
//                 <Typography variant="caption" color="text.secondary">2 minutes ago</Typography>
//               </Box>
//             </MenuItem>
//           ))}
//           <Box sx={{ p: 1, textAlign: 'center' }}>
//             <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
//               View all notifications
//             </Typography>
//           </Box>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;




// Logout Function Change









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
} from '@mui/material';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';
import LogoutModal from '../models/LogoutModal'; // Import the modal

const Navbar = ({ sidebarCollapsed, onToggleSidebar, isMobile, mobileOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State for modal

  const { user, role_id } = useSelector((state) => state.auth);
  const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

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

  // This function now opens the modal instead of logging out directly
  const handleLogoutClick = () => {
    handleMenuClose(); // Close the menu first
    setShowLogoutModal(true); // Show the logout modal
  };

  // This function handles the actual logout after confirmation
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
    
    // Navigate to login
    navigate('/login', { replace: true });
    
    // Close modal
    setShowLogoutModal(false);
    
    // Reload page to clear any cached state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleProfile = () => {
    const profilePath = role_id === 2 ? '/super-admin/profile' : '/admin/profile';
    navigate(profilePath);
    handleMenuClose();
  };

  const handleSettings = () => {
    const settingsPath = role_id === 2 ? '/super-admin/settings' : '/admin/settings';
    navigate(settingsPath);
    handleMenuClose();
  };

  const handleDashboard = () => {
    const dashboardPath = role_id === 2 ? '/super-admin/dashboard' : '/admin/dashboard';
    navigate(dashboardPath);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'white',
          color: '#1e293b',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          borderBottom: '1px solid #e2e8f0',
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
                  color: '#2563EB',
                  '&:hover': {
                    bgcolor: alpha('#2563EB', 0.1),
                  },
                }}
              >
                {isMobile ? (
                  <MenuIcon fontSize="small" />
                ) : (
                  // sidebarCollapsed ? <MenuOpenIcon /> : <MenuIcon />
                  <MenuIcon />
                )}
              </IconButton>
            </Tooltip>
            
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{
                fontWeight: 600,
                background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: { xs: 'none', sm: 'block' },
                cursor: 'pointer',
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              }}
              onClick={handleDashboard}
            >
              Team Trackify
            </Typography>
            
            {!isMobile && (
              <Typography
                variant="body2"
                sx={{
                  color: '#2563EB',
                  display: { xs: 'none', md: 'block' },
                  ml: 2,
                  px: 1.5,
                  py: 0.5,
                  bgcolor: alpha('#2563EB', 0.1),
                  borderRadius: 2,
                  fontSize: { xs: '0.7rem', md: '0.8rem' },
                  fontWeight: 500,
                }}
              >
                {roleName}
              </Typography>
            )}
          </Box>

          {/* Right side */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                onClick={handleNotificationOpen}
                size={isMobile ? "small" : "medium"}
                sx={{
                  color: '#64748b',
                  '&:hover': {
                    color: '#2563EB',
                    bgcolor: alpha('#2563EB', 0.1),
                  },
                }}
              >
                <Badge 
                  badgeContent={3} 
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: '#2563EB',
                      color: 'white',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                    }
                  }}
                >
                  <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title="Profile">
              <IconButton
                onClick={handleProfileMenuOpen}
                size={isMobile ? "small" : "medium"}
                sx={{
                  ml: { xs: 0.5, sm: 1 },
                  '&:hover': {
                    bgcolor: alpha('#2563EB', 0.1),
                  },
                }}
              >
                <Avatar
                  src={user?.avtar}
                  sx={{
                    width: { xs: 30, sm: 35, md: 40 },
                    height: { xs: 30, sm: 35, md: 40 },
                    background: 'linear-gradient(135deg, #2563EB, #1E40AF)',
                    color: 'white',
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                    fontWeight: 600,
                    boxShadow: `0 4px 10px -2px ${alpha('#2563EB', 0.3)}`,
                  }}
                >
                  {user?.name?.charAt(0) || 'A'}
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
                minWidth: { xs: 160, sm: 200 },
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
              }
            }}
          >
            <MenuItem onClick={handleProfile} sx={{ py: { xs: 1, sm: 1.5 } }}>
              <PersonIcon sx={{ mr: 1.5, color: '#2563EB', fontSize: { xs: 18, sm: 20 } }} />
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#1e293b' }}>
                My Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleSettings} sx={{ py: { xs: 1, sm: 1.5 } }}>
              <SettingsIcon sx={{ mr: 1.5, color: '#2563EB', fontSize: { xs: 18, sm: 20 } }} />
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: '#1e293b' }}>
                Settings
              </Typography>
            </MenuItem>
            
            {/* Logout Menu Item - Now opens modal */}
            <MenuItem 
              onClick={handleLogoutClick} 
              sx={{ 
                py: { xs: 1, sm: 1.5 }, 
                color: '#ef4444',
                borderTop: '1px solid',
                borderColor: alpha('#2563EB', 0.1),
                mt: 1,
                '&:hover': {
                  bgcolor: alpha('#ef4444', 0.05),
                }
              }}
            >
              <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: { xs: 18, sm: 20 } }} />
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu - You can implement this later */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: { xs: 240, sm: 300 },
            maxWidth: { xs: 280, sm: 350 },
            borderRadius: 2,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            p: 1,
          }
        }}
      >
        <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: alpha('#2563EB', 0.1), mb: 1 }}>
          <Typography variant="subtitle2" fontWeight="600" sx={{ color: '#2563EB' }}>
            Notifications
          </Typography>
        </Box>
        <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1, py: 1.5 }}>
          <Box>
            <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
              New user registered
            </Typography>
            <Typography variant="caption" color="text.secondary">
              5 minutes ago
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1, py: 1.5 }}>
          <Box>
            <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
              Payment received
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2 hours ago
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ borderRadius: 1, py: 1.5 }}>
          <Box>
            <Typography variant="body2" fontWeight="500" sx={{ color: '#1e293b' }}>
              System update completed
            </Typography>
            <Typography variant="caption" color="text.secondary">
              1 day ago
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

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