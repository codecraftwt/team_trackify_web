import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Tooltip,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Sidebar from './Sidebar';           // ← your updated Sidebar (with collapsed prop)
import { motion, AnimatePresence } from 'framer-motion';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 72;

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false); // new: desktop collapse

  const effectiveDrawerWidth = desktopCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopCollapsed(!desktopCollapsed);
    }
  };

  const drawerContent = (
    <Sidebar collapsed={desktopCollapsed && !isMobile} onClose={() => setMobileOpen(false)} />
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* AppBar – cleaner, modern look */}
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { md: `calc(100% - ${effectiveDrawerWidth}px)` },
          ml: { md: `${effectiveDrawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(8px)',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
          <IconButton
            color="inherit"
            aria-label={desktopCollapsed ? 'expand sidebar' : 'collapse sidebar'}
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'text.secondary' }}
          >
            {isMobile ? (
              <MenuIcon />
            ) : desktopCollapsed ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {/* Right side actions – modern pattern */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error" variant="dot">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ width: 38, height: 38 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar – permanent on desktop, temporary on mobile */}
      <Box
        component="nav"
        sx={{
          width: { md: effectiveDrawerWidth },
          flexShrink: { md: 0 },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Mobile temporary drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderRight: 'none',
              boxShadow: theme.shadows[16],
              borderRadius: 0, // No rounded corners
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop permanent + collapsible */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: effectiveDrawerWidth,
              boxSizing: 'border-box',
              borderRight: 'none',
              bgcolor: 'background.paper',
              boxShadow: '1px 0 8px rgba(0,0,0,0.06)',
              borderRadius: 0, // No rounded corners
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content – animated page transitions */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - ${effectiveDrawerWidth}px)` },
          mt: { xs: '64px', md: '72px' },
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          bgcolor: 'background.default',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname} // better exit animation per route
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default DashboardLayout;