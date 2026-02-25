import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
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
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = ({ onClose, collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Team Members', icon: <PeopleIcon />, path: '/dashboard/users' },
    { text: 'Live Locations', icon: <LocationOnIcon />, path: '/dashboard/locations' },
    { text: 'Reports & Analytics', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    // TODO: real logout logic (clear tokens, etc.)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
    onClose?.();
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: collapsed ? 72 : 260,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0f766e', // darker teal – more professional
        color: 'white',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
        borderRadius: 0, // No rounded corners
      }}
    >
      {/* Header / Logo */}
      <Box
        sx={{
          p: collapsed ? 2 : 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          minHeight: 64,
          borderRadius: 0, // No rounded corners
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'rgba(255,255,255,0.25)',
            width: 40,
            height: 40,
            fontWeight: 'bold',
          }}
        >
          TT
        </Avatar>

        {!collapsed && (
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              Team Trackify
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Admin
            </Typography>
          </Box>
        )}
      </Box>

      {/* User quick info */}
      {!collapsed && (
        <Box sx={{ px: 2.5, py: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              bgcolor: 'rgba(255,255,255,0.08)',
              p: 1.5,
              borderRadius: 1.5,
            }}
          >
            <Avatar sx={{ bgcolor: '#2dd4bf' }}>A</Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" fontWeight={500} noWrap>
                Admin User
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }} noWrap>
                admin@trackify.in
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Navigation */}
      <List sx={{ flexGrow: 1, pt: 1, px: collapsed ? 1 : 1.5, pb: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Tooltip
              key={item.text}
              title={collapsed ? item.text : ''}
              placement="right"
              arrow
            >
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    minHeight: 48,
                    borderRadius: 1,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    px: collapsed ? 0 : 2.5,
                    py: 1.2,
                    mx: collapsed ? 0.5 : 0,
                    bgcolor: active ? 'rgba(255,255,255,0.18)' : 'transparent',
                    '&:hover': {
                      bgcolor: active ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
                    },
                    position: 'relative',
                    transition: 'all 0.18s ease',
                  }}
                >
                  {/* Active indicator line */}
                  {active && !collapsed && (
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
                      minWidth: collapsed ? 'auto' : 40,
                      color: active ? '#a7f3d0' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: active ? 600 : 400,
                        fontSize: '0.95rem',
                        color: active ? '#d1fae5' : 'white',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2, my: 0 }} />

      {/* Logout */}
      <Box sx={{ p: collapsed ? 1.5 : 2, pb: collapsed ? 1.5 : 1.5 }}>
        <Tooltip title={collapsed ? 'Logout' : ''} placement="right" arrow>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 0 : 2.5,
              py: 1.2,
              mx: collapsed ? 0.5 : 0,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </Box>

      {!collapsed && (
        <Box sx={{ px: 2, pb: 2, pt: 1, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ opacity: 0.6, fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} Team Trackify
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;