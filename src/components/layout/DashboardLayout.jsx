// import { useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Box } from '@mui/material';
// import Sidebar from './Sidebar';

// const DashboardLayout = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, user, role_id } = useSelector((state) => state.auth);

//   // Check if user is authenticated
//   useEffect(() => {
//     if (!isAuthenticated || !user || !role_id) {
//       navigate('/login', { replace: true });
//     }
//   }, [isAuthenticated, user, role_id, navigate]);

//   // Don't render if not authenticated
//   if (!isAuthenticated || !user || !role_id) {
//     return null;
//   }

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       {/* Sidebar - fixed width */}
//       <Sidebar />
      
//       {/* Main Content - with left margin to account for sidebar */}
//       <Box 
//         component="main" 
//         sx={{ 
//           flexGrow: 1,
//           ml: '280px', // Add left margin equal to sidebar width
//           width: '100%',
//           minHeight: '100vh',
//           bgcolor: '#f5f5f5',
//           p: 3
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;

import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Avatar, 
  Menu, 
  MenuItem,
  Tooltip,
  Badge,
  alpha
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
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role_id, isAuthenticated } = useSelector((state) => state.auth);

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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleMenuClose();
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: '#1e293b',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left side - Menu toggle and title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
              <IconButton 
                onClick={toggleSidebar}
                sx={{
                  color: '#0f766e',
                  '&:hover': {
                    bgcolor: alpha('#0f766e', 0.1),
                  },
                }}
              >
                {sidebarCollapsed ? <MenuOpenIcon /> : <MenuIcon />}
              </IconButton>
            </Tooltip>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                color: '#0f766e',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Team Trackify
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b',
                display: { xs: 'none', md: 'block' },
                ml: 2,
                px: 1.5,
                py: 0.5,
                bgcolor: alpha('#0f766e', 0.1),
                borderRadius: 2,
              }}
            >
              {roleName}
            </Typography>
          </Box>

          {/* Right side - Notifications and Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton 
                onClick={handleNotificationOpen}
                sx={{
                  color: '#64748b',
                  '&:hover': {
                    color: '#0f766e',
                    bgcolor: alpha('#0f766e', 0.1),
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title="Profile">
              <IconButton
                onClick={handleProfileMenuOpen}
                sx={{
                  ml: 1,
                  '&:hover': {
                    bgcolor: alpha('#0f766e', 0.1),
                  },
                }}
              >
                <Avatar 
                  src={user?.avtar}
                  sx={{ 
                    width: 35, 
                    height: 35,
                    bgcolor: '#0f766e',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 600,
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
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
              }
            }}
          >
            <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
              <PersonIcon sx={{ mr: 1.5, color: '#0f766e', fontSize: 20 }} />
              <Typography variant="body2">My Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
              <SettingsIcon sx={{ mr: 1.5, color: '#0f766e', fontSize: 20 }} />
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#ef4444' }}>
              <LogoutIcon sx={{ mr: 1.5, color: '#ef4444', fontSize: 20 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>

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
                width: 320,
                maxHeight: 400,
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
              }
            }}
          >
            <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" fontWeight={600}>Notifications</Typography>
            </Box>
            {[1, 2, 3].map((item) => (
              <MenuItem key={item} sx={{ py: 1.5, px: 2, borderBottom: '1px solid #f1f5f9' }}>
                <Box>
                  <Typography variant="body2" fontWeight={500}>New activity detected</Typography>
                  <Typography variant="caption" color="text.secondary">2 minutes ago</Typography>
                </Box>
              </MenuItem>
            ))}
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
                View all notifications
              </Typography>
            </Box>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
      />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: '64px',
          ml: sidebarCollapsed ? '72px' : '280px',
          width: sidebarCollapsed ? 'calc(100% - 72px)' : 'calc(100% - 280px)',
          minHeight: 'calc(100vh - 64px)',
          bgcolor: '#f8fafc',
          transition: 'all 0.3s ease',
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;