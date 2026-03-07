// import { useEffect, useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Box, useMediaQuery, useTheme } from '@mui/material';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';

// const DashboardLayout = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
  
//   const { isAuthenticated, user, role_id } = useSelector((state) => state.auth);

//   // Check if user is authenticated
//   useEffect(() => {
//     if (!isAuthenticated || !user || !role_id) {
//       navigate('/login', { replace: true });
//     }
//   }, [isAuthenticated, user, role_id, navigate]);

//   // Close mobile sidebar when switching to desktop
//   useEffect(() => {
//     if (!isMobile) {
//       setMobileOpen(false);
//     }
//   }, [isMobile]);

//   const handleToggleSidebar = () => {
//     if (isMobile) {
//       // On mobile, toggle the mobile drawer
//       setMobileOpen(!mobileOpen);
//     } else {
//       // On desktop, toggle collapse
//       setSidebarCollapsed(!sidebarCollapsed);
//     }
//   };

//   const handleSidebarClose = () => {
//     setMobileOpen(false);
//   };

//   // Don't render if not authenticated
//   if (!isAuthenticated || !user || !role_id) {
//     return null;
//   }

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       {/* Sidebar - with mobile drawer support */}
//       <Sidebar 
//         collapsed={sidebarCollapsed}
//         mobileOpen={mobileOpen}
//         onClose={handleSidebarClose}
//         isMobile={isMobile}
//       />
      
//       {/* Right Side Container */}
//       <Box 
//         sx={{ 
//           flexGrow: 1,
//           ml: isMobile ? 0 : (sidebarCollapsed ? '72px' : '280px'),
//           width: isMobile ? '100%' : `calc(100% - ${sidebarCollapsed ? 72 : 280}px)`,
//           minHeight: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           transition: 'margin 0.3s ease, width 0.3s ease',
//           bgcolor: '#f5f5f5',
//         }}
//       >
//         {/* Navbar */}
//         <Navbar 
//           sidebarCollapsed={sidebarCollapsed}
//           onToggleSidebar={handleToggleSidebar}
//           isMobile={isMobile}
//           mobileOpen={mobileOpen}
//         />
        
//         {/* Main Content Area */}
//         <Box 
//           component="main" 
//           sx={{ 
//             flexGrow: 1,
//             // p: { xs: 2, sm: 3 },
//             overflow: 'auto',
//           }}
//         >
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;





import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isAuthenticated, user, role_id } = useSelector((state) => state.auth);

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated || !user || !role_id) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, user, role_id, navigate]);

  // Close mobile sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleSidebarClose = () => {
    setMobileOpen(false);
  };

  // Don't render if not authenticated
  if (!isAuthenticated || !user || !role_id) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onClose={handleSidebarClose}
        isMobile={isMobile}
      />

      {/* Right Side Container */}
      <Box
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : (sidebarCollapsed ? '64px' : '220px'), // ← reduced from 72px/280px
          width: isMobile ? '100%' : `calc(100% - ${sidebarCollapsed ? 64 : 220}px)`, // ← reduced from 72/280
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin 0.3s ease, width 0.3s ease',
          bgcolor: '#f5f5f5',
        }}
      >
        {/* Navbar */}
        <Navbar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={handleToggleSidebar}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
        />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;