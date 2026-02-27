import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';

const Sidebar = ({ onClose, collapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role_id } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    onClose?.();
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose?.();
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

  return (
    <Box
      sx={{
        height: '100%',
        width: collapsed ? 72 : 280,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0f766e',
        color: 'white',
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
        borderRadius: 0,
        position: 'fixed',
        left: 0,
        top: 0,
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
              {roleName}
            </Typography>
          </Box>
        )}
      </Box>

      {/* User Info */}
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
            <Avatar
              src={user?.avtar}
              sx={{ bgcolor: '#2dd4bf' }}
            >
              {user?.name?.charAt(0) || 'A'}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" fontWeight={500} noWrap>
                {user?.name || 'Admin User'}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }} noWrap>
                {user?.email || 'admin@trackify.in'}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Menu Items */}
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

      {/* Footer Copyright */}
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