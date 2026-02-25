import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({ onMenuClick }) => {
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
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/70' 
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent'}
      `}
    >
      <nav className="container-custom mx-auto px-5 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">
          {/* Logo – slightly larger, better spacing */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="flex items-center gap-2.5 md:gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl md:text-2xl tracking-tight">T</span>
              </div>
              <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                Trackify
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-4 py-2.5 text-sm lg:text-base font-medium transition-all duration-200
                  ${isActive(item.path)
                    ? 'text-primary-700 font-semibold'
                    : 'text-gray-700 hover:text-primary-600 active:text-primary-700'}
                `}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="active-underline"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Login CTA – more prominent */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/login')}
              className={`
                ml-4 lg:ml-6 px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold text-sm lg:text-base
                bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-lg
                active:bg-primary-800 transition-all duration-200
              `}
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
            className="md:hidden p-2.5 -mr-2.5 text-gray-700 hover:text-primary-600 active:text-primary-700 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <CloseIcon fontSize="large" />
              ) : (
                <MenuIcon fontSize="large" />
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
            className="md:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="container-custom px-5 py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center px-5 py-4 rounded-xl text-base font-medium transition-all
                    ${isActive(item.path)
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-gray-800 hover:bg-gray-50 active:bg-gray-100'}
                  `}
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
                className={`
                  mt-4 px-6 py-4 rounded-xl font-semibold text-base
                  bg-primary-600 text-white shadow-md hover:bg-primary-700 active:bg-primary-800
                  transition-all duration-200
                `}
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