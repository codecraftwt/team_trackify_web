import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/dashboard/users' },
    { text: 'Locations', icon: <LocationOnIcon />, path: '/dashboard/locations' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/dashboard/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/dashboard/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
    onClose?.();
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        color: 'white',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box display="flex" alignItems="center" gap={1.5} mb={1}>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                T
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Team Trackify
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            Admin Panel
          </Typography>
        </motion.div>
      </Box>

      {/* User Profile Section */}
      <Box
        sx={{
          p: 2,
          mx: 2,
          mt: 2,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              admin@trackify.com
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flexGrow: 1, p: 2, pt: 3 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ListItem
                button
                onClick={() => handleNavigation(item.path)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    sx: { fontWeight: isActive ? 600 : 400 },
                  }}
                />
              </ListItem>
            </motion.div>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Team Trackify
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;

