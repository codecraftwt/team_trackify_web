import React from "react";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  alpha,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

const StatsCard = ({ 
  icon: Icon, 
  value, 
  label, 
  iconBg, 
  iconColor, 
  isLoading = false,
  trend = null, // 'up' or 'down'
  trendValue = null,
  onClick = null,
  isSelected = false,
}) => {
  const theme = useTheme();
  
  // More granular breakpoints for different devices
  const isSmallMobile = useMediaQuery('(max-width:480px)');
  const isMobile = useMediaQuery('(min-width:481px) and (max-width:768px)');
  const isTablet = useMediaQuery('(min-width:769px) and (max-width:1024px)');
  const isSmallLaptop = useMediaQuery('(min-width:1025px) and (max-width:1366px)');
  const isDesktop = useMediaQuery('(min-width:1367px)');

  // Get responsive sizes based on device
  const getResponsiveValues = () => {
    if (isSmallMobile) {
      return {
        padding: 1,
        avatarSize: 32,
        iconSize: 16,
        titleSize: '0.9rem',
        labelSize: '0.55rem',
      };
    }
    
    if (isMobile) {
      return {
        padding: 1.2,
        avatarSize: 36,
        iconSize: 18,
        titleSize: '1rem',
        labelSize: '0.6rem',
      };
    }
    
    if (isTablet) {
      return {
        padding: 1.5,
        avatarSize: 40,
        iconSize: 20,
        titleSize: '1.1rem',
        labelSize: '0.65rem',
      };
    }
    
    if (isSmallLaptop) {
      return {
        padding: 1.6,
        avatarSize: 42,
        iconSize: 22,
        titleSize: '1.15rem',
        labelSize: '0.7rem',
      };
    }
    
    // Desktop
    return {
      padding: 1.8,
      avatarSize: 44,
      iconSize: 24,
      titleSize: '1.2rem',
      labelSize: '0.75rem',
    };
  };

  const responsive = getResponsiveValues();

  // Loading state
  if (isLoading) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: responsive.padding,
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          height: '100%',
          minHeight: { xs: 80, sm: 90, md: 100, lg: 110, xl: 120 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={responsive.titleSize} />
            <Skeleton variant="text" width="60%" height={responsive.labelSize} sx={{ mt: 0.5 }} />
          </Box>
          <Skeleton variant="circular" width={responsive.avatarSize} height={responsive.avatarSize} />
        </Box>
      </Paper>
    );
  }

  // Hover and click states
  const hoverStyles = onClick ? {
    cursor: 'pointer',
    '&:hover': {
      transform: "translateY(-4px) scale(1.01)",
      boxShadow: `0 12px 28px -8px ${alpha(iconColor, 0.3)}`,
      borderColor: iconColor,
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(iconColor, 0.05)} 100%)`,
    },
  } : {};

  // Selected state
  const selectedStyles = isSelected ? {
    borderColor: iconColor,
    borderWidth: '2px',
    boxShadow: `0 8px 20px -6px ${alpha(iconColor, 0.25)}`,
    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(iconColor, 0.08)} 100%)`,
  } : {};

  // Trend indicator
  const TrendIndicator = () => {
    if (!trend || !trendValue) return null;
    
    const trendColor = trend === 'up' ? '#22c55e' : '#ef4444';
    const TrendIcon = trend === 'up' ? '↑' : '↓';
    
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.3,
            px: 0.6,
            py: 0.2,
            borderRadius: 1.5,
            bgcolor: alpha(trendColor, 0.1),
            color: trendColor,
            fontSize: `calc(${responsive.labelSize} - 0.05rem)`,
            fontWeight: 600,
            ml: 0.5,
          }}
        >
          <span style={{ fontSize: `calc(${responsive.iconSize} - 6px)`, fontWeight: 'bold' }}>{TrendIcon}</span>
          <span>{trendValue}%</span>
        </Box>
      </motion.div>
    );
  };

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={0}
        onClick={onClick}
        sx={{
          p: responsive.padding,
          borderRadius: { xs: 2, sm: 2.5, md: 3 },
          border: "1px solid",
          borderColor: isSelected ? iconColor : alpha(theme.palette.divider, 0.5),
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: {
            xs: 85,
            sm: 95,
            md: 105,
            lg: 115,
            xl: 125,
          },
          display: 'flex',
          alignItems: 'center',
          backdropFilter: "blur(10px)",
          ...hoverStyles,
          ...selectedStyles,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${iconColor} 0%, ${alpha(iconColor, 0.4)} 50%, transparent 100%)`,
            opacity: isSelected ? 1 : 0.6,
            transition: 'all 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '120px',
            height: '120px',
            background: `radial-gradient(circle, ${alpha(iconColor, 0.06)} 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          width: '100%',
          gap: 1.2,
          position: 'relative',
          zIndex: 1,
        }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'baseline', 
              flexWrap: 'wrap', 
              gap: 0.3, 
              mb: 0.5 
            }}>
              <Typography
                fontWeight="800"
                sx={{ 
                  background: isSelected 
                    ? `linear-gradient(135deg, ${iconColor}, ${alpha(iconColor, 0.7)})`
                    : 'none',
                  WebkitBackgroundClip: isSelected ? 'text' : 'none',
                  WebkitTextFillColor: isSelected ? 'transparent' : 'text.primary',
                  color: isSelected ? 'transparent' : 'text.primary',
                  fontSize: responsive.titleSize,
                  lineHeight: 1.2,
                  wordBreak: 'break-word',
                  letterSpacing: '-0.02em',
                }}
              >
                {value}
              </Typography>
              <TrendIndicator />
            </Box>
            <Typography 
              color="text.secondary" 
              sx={{ 
                fontWeight: 500,
                fontSize: responsive.labelSize,
                lineHeight: 1.3,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                wordBreak: 'break-word',
              }}
            >
              {label}
            </Typography>
          </Box>
          
          <motion.div
            whileHover={onClick ? { rotate: 5, scale: 1.05 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Avatar
              sx={{
                bgcolor: alpha(iconColor, 0.12),
                color: iconColor,
                width: responsive.avatarSize,
                height: responsive.avatarSize,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                flexShrink: 0,
                border: '2px solid',
                borderColor: alpha(iconColor, 0.2),
                boxShadow: `0 4px 12px ${alpha(iconColor, 0.15)}`,
                '& svg': {
                  fontSize: responsive.iconSize,
                },
                ...(onClick && {
                  '&:hover': {
                    bgcolor: alpha(iconColor, 0.2),
                    borderColor: iconColor,
                    boxShadow: `0 6px 16px ${alpha(iconColor, 0.25)}`,
                  },
                }),
              }}
            >
              <Icon />
            </Avatar>
          </motion.div>
        </Box>

        {/* Decorative floating icon */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -10,
            right: -10,
            width: 60,
            height: 60,
            opacity: 0.06,
            transform: 'rotate(15deg)',
            pointerEvents: 'none',
            '& svg': {
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Icon />
        </Box>

        {/* Animated pulse effect for selected state */}
        {isSelected && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              background: `radial-gradient(circle, ${alpha(iconColor, 0.1)} 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { opacity: 0.3, transform: 'translate(-50%, -50%) scale(0.8)' },
                '50%': { opacity: 0.1, transform: 'translate(-50%, -50%) scale(1.2)' },
                '100%': { opacity: 0.3, transform: 'translate(-50%, -50%) scale(0.8)' },
              },
            }}
          />
        )}
      </Paper>
    </motion.div>
  );
};

export default StatsCard;






