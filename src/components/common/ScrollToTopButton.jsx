import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, alpha } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTopButton = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50 
                     w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 
                     text-white rounded-full shadow-lg hover:shadow-xl 
                     transition-all duration-300 flex items-center justify-center 
                     focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`;
          }}
          aria-label="Scroll to top"
        >
          <KeyboardArrowUpIcon sx={{ fontSize: { xs: 22, sm: 24, md: 28 } }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;