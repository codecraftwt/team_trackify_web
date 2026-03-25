// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import logoImage from '../../assets/Team-Trackify-logo.png';

// const Header = ({ onMenuClick }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Add subtle shadow & bg opacity change on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { path: '/about', label: 'About' },
//     { path: '/pricing', label: 'Pricing' },
//     { path: '/contact', label: 'Contact' },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <header
//       className={`
//         fixed top-0 left-0 right-0 z-50 transition-all duration-300
//         ${scrolled
//           ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/70'
//           : 'bg-white/80 backdrop-blur-sm border-b border-transparent'}
//       `}
//     >
//       <nav className="container-custom mx-auto px-5 md:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
//           {/* Logo – slightly larger, better spacing */}
//           <motion.div
//             initial={{ opacity: 0, x: -16 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Link to="/" className="flex items-center gap-2.5 md:gap-3">
//               <img
//                 src={logoImage}
//                 alt="Team Trackify Logo"
//                 className="h-20 md:h-22 lg:h-24 w-auto object-contain"
//               />
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-2 lg:gap-3">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`
//                   relative px-4 py-2.5 text-sm lg:text-base font-medium transition-all duration-200
//                   ${isActive(item.path)
//                     ? 'text-primary-700 font-semibold'
//                     : 'text-gray-700 hover:text-primary-600 active:text-primary-700'}
//                 `}
//               >
//                 {item.label}
//                 {isActive(item.path) && (
//                   <motion.span
//                     layoutId="active-underline"
//                     className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
//                     transition={{ type: 'spring', stiffness: 400, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             ))}

//             {/* Login CTA – more prominent */}
//             <motion.button
//               whileHover={{ scale: 1.04, y: -1 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => navigate('/login')}
//               className={`
//                 ml-4 lg:ml-6 px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold text-sm lg:text-base
//                 bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-lg
//                 active:bg-primary-800 transition-all duration-200
//               `}
//             >
//               Login
//             </motion.button>
//           </div>

//           {/* Mobile Menu Toggle – larger touch target */}
//           <button
//             onClick={() => {
//               setMobileMenuOpen(!mobileMenuOpen);
//               onMenuClick?.();
//             }}
//             className="md:hidden p-2.5 -mr-2.5 text-gray-700 hover:text-primary-600 active:text-primary-700 transition-colors"
//             aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
//           >
//             <motion.div
//               animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {mobileMenuOpen ? (
//                 <CloseIcon fontSize="large" />
//               ) : (
//                 <MenuIcon fontSize="large" />
//               )}
//             </motion.div>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu – full-width slide-down with better spacing */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
//             className="md:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden"
//           >
//             <div className="container-custom px-5 py-6 flex flex-col gap-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className={`
//                     flex items-center px-5 py-4 rounded-xl text-base font-medium transition-all
//                     ${isActive(item.path)
//                       ? 'bg-primary-50 text-primary-700 font-semibold'
//                       : 'text-gray-800 hover:bg-gray-50 active:bg-gray-100'}
//                   `}
//                 >
//                   {item.label}
//                 </Link>
//               ))}

//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => {
//                   navigate('/login');
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`
//                   mt-4 px-6 py-4 rounded-xl font-semibold text-base
//                   bg-primary-600 text-white shadow-md hover:bg-primary-700 active:bg-primary-800
//                   transition-all duration-200
//                 `}
//               >
//                 Login to Dashboard
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;













// import { useState, useEffect } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useTheme, alpha } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import logoImage from '../../assets/Team-Trackify-logo.png';

// const Header = ({ onMenuClick }) => {
//   const theme = useTheme();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Add subtle shadow & bg opacity change on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { path: '/about', label: 'About' },
//     { path: '/pricing', label: 'Pricing' },
//     { path: '/contact', label: 'Contact' },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <header
//       className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
//       style={{
//         backgroundColor: scrolled 
//           ? alpha(theme.palette.background.paper, 0.95)
//           : alpha(theme.palette.background.paper, 0.8),
//         backdropFilter: 'blur(8px)',
//         borderBottom: scrolled
//           ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
//           : '1px solid transparent',
//         boxShadow: scrolled ? `0 4px 6px ${alpha(theme.palette.common.black, 0.05)}` : 'none',
//       }}
//     >
//       <nav className="container-custom mx-auto px-5 md:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
//           {/* Logo – slightly larger, better spacing */}
//           <motion.div
//             initial={{ opacity: 0, x: -16 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <Link to="/" className="flex items-center gap-2.5 md:gap-3">
//               <img
//                 src={logoImage}
//                 alt="Team Trackify Logo"
//                 className="h-20 md:h-22 lg:h-24 w-auto object-contain"
//               />
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-2 lg:gap-3">
//             {navItems.map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className="relative px-4 py-2.5 text-sm lg:text-base font-medium transition-all duration-200"
//                 style={{
//                   color: isActive(item.path) 
//                     ? theme.palette.primary.dark 
//                     : theme.palette.text.secondary,
//                   fontWeight: isActive(item.path) ? 600 : 500,
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isActive(item.path)) {
//                     e.currentTarget.style.color = theme.palette.primary.main;
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isActive(item.path)) {
//                     e.currentTarget.style.color = theme.palette.text.secondary;
//                   }
//                 }}
//               >
//                 {item.label}
//                 {isActive(item.path) && (
//                   <motion.span
//                     layoutId="active-underline"
//                     className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full"
//                     style={{
//                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                     }}
//                     transition={{ type: 'spring', stiffness: 400, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             ))}

//             {/* Login CTA – more prominent */}
//             <motion.button
//               whileHover={{ scale: 1.04, y: -1 }}
//               whileTap={{ scale: 0.97 }}
//               onClick={() => navigate('/login')}
//               className="ml-4 lg:ml-6 px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold text-sm lg:text-base text-white shadow-md transition-all duration-200"
//               style={{
//                 backgroundColor: theme.palette.primary.main,
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.dark}
//               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.main}
//             >
//               Login
//             </motion.button>
//           </div>

//           {/* Mobile Menu Toggle – larger touch target */}
//           <button
//             onClick={() => {
//               setMobileMenuOpen(!mobileMenuOpen);
//               onMenuClick?.();
//             }}
//             className="md:hidden p-2.5 -mr-2.5 transition-colors"
//             style={{ color: theme.palette.text.secondary }}
//             onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
//             onMouseLeave={(e) => e.currentTarget.style.color = theme.palette.text.secondary}
//             aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
//           >
//             <motion.div
//               animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {mobileMenuOpen ? (
//                 <CloseIcon fontSize="large" />
//               ) : (
//                 <MenuIcon fontSize="large" />
//               )}
//             </motion.div>
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu – full-width slide-down with better spacing */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
//             className="md:hidden overflow-hidden"
//             style={{
//               backgroundColor: theme.palette.background.paper,
//               borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//               boxShadow: `0 10px 15px -3px ${alpha(theme.palette.common.black, 0.1)}`,
//             }}
//           >
//             <div className="container-custom px-5 py-6 flex flex-col gap-2">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center px-5 py-4 rounded-xl text-base font-medium transition-all"
//                   style={{
//                     backgroundColor: isActive(item.path) 
//                       ? alpha(theme.palette.primary.main, 0.1)
//                       : 'transparent',
//                     color: isActive(item.path) 
//                       ? theme.palette.primary.dark
//                       : theme.palette.text.primary,
//                   }}
//                   onMouseEnter={(e) => {
//                     if (!isActive(item.path)) {
//                       e.currentTarget.style.backgroundColor = alpha(theme.palette.action.hover, 0.1);
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (!isActive(item.path)) {
//                       e.currentTarget.style.backgroundColor = 'transparent';
//                     }
//                   }}
//                 >
//                   {item.label}
//                 </Link>
//               ))}

//               <motion.button
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => {
//                   navigate('/login');
//                   setMobileMenuOpen(false);
//                 }}
//                 className="mt-4 px-6 py-4 rounded-xl font-semibold text-base text-white shadow-md transition-all duration-200"
//                 style={{
//                   backgroundColor: theme.palette.primary.main,
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.dark}
//                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.main}
//               >
//                 Login to Dashboard
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// };

// export default Header;


import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, alpha } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
// import logoImage from '../../assets/Team-Trackify-logo.png';
import logoImage from '../../assets/logo31.png';

const Header = ({ onMenuClick }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add subtle shadow & bg opacity change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? alpha(theme.palette.background.paper, 0.95)
          : alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(8px)',
        borderBottom: scrolled
          ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
          : '1px solid transparent',
        boxShadow: scrolled ? `0 4px 6px ${alpha(theme.palette.common.black, 0.05)}` : 'none',
      }}
    >
      <nav className="container-custom mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16 lg:h-18">
          {/* Logo – slightly larger, better spacing */}
          {/* <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="flex items-center gap-2 md:gap-2.5">
              <img
                src={logoImage}
                alt="Team Trackify Logo"
                className="h-10 md:h-12 lg:h-14 w-auto max-w-[120px] md:max-w-[140px] object-contain"
                style={{ borderRadius: '4px' }}
              />
            </Link>

          </motion.div> */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="flex items-center gap-2 md:gap-2.5">
              <motion.img
                src={logoImage}
                alt="Team Trackify Logo"
                className="h-8 md:h-10 lg:h-12 w-auto max-w-[100px] md:max-w-[120px] object-contain"
                style={{ borderRadius: '4px' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              <motion.span
                className="text-base md:text-lg lg:text-xl font-bold"
                style={{ color: theme.palette.primary.main }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Team Trackify
              </motion.span>
            </Link>
          </motion.div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive(item.path)
                    ? theme.palette.primary.dark
                    : theme.palette.text.secondary,
                  fontWeight: isActive(item.path) ? 600 : 500,
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = theme.palette.primary.main;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.color = theme.palette.text.secondary;
                  }
                }}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Login CTA – more prominent */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="ml-3 lg:ml-4 px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold text-xs lg:text-sm text-white shadow-md transition-all duration-200"
              style={{
                backgroundColor: theme.palette.primary.main,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.dark}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.main}
            >
              Login
            </motion.button>
          </div>

          {/* Mobile Menu Toggle – larger touch target */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              onMenuClick?.();
            }}
            className="md:hidden p-2 -mr-2 transition-colors"
            style={{ color: theme.palette.text.secondary }}
            onMouseEnter={(e) => e.currentTarget.style.color = theme.palette.primary.main}
            onMouseLeave={(e) => e.currentTarget.style.color = theme.palette.text.secondary}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <CloseIcon sx={{ fontSize: 24 }} />
              ) : (
                <MenuIcon sx={{ fontSize: 24 }} />
              )}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu – full-width slide-down with better spacing */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: theme.palette.background.paper,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              boxShadow: `0 10px 15px -3px ${alpha(theme.palette.common.black, 0.1)}`,
            }}
          >
            <div className="container-custom px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isActive(item.path)
                      ? alpha(theme.palette.primary.main, 0.1)
                      : 'transparent',
                    color: isActive(item.path)
                      ? theme.palette.primary.dark
                      : theme.palette.text.primary,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor = alpha(theme.palette.action.hover, 0.1);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className="mt-3 px-5 py-3 rounded-lg font-semibold text-sm text-white shadow-md transition-all duration-200"
                style={{
                  backgroundColor: theme.palette.primary.main,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.dark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.palette.primary.main}
              >
                Login to Dashboard
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;