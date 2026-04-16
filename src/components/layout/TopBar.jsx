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
  alpha,
  Box,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';

const TopBar = ({ onMenuClick, showMenuButton = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role_id } = useSelector((state) => state.auth);

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

  const roleName = role_id === 2 ? 'Super Admin' : 'Admin';

  return (
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
        {/* Left side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {showMenuButton && (
            <Tooltip title="Open menu">
              <IconButton 
                onClick={onMenuClick}
                sx={{
                  color: '#0f766e',
                  '&:hover': {
                    bgcolor: alpha('#0f766e', 0.1),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
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

        {/* Right side */}
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
  );
};

export default TopBar;