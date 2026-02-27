// import React from "react";
// import { Paper, Box, Typography, Avatar, alpha } from "@mui/material";

// const StatsCard = ({ icon: Icon, value, label, iconBg, iconColor }) => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: 2.5,
//         borderRadius: 3,
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           transform: "translateY(-4px)",
//           boxShadow: `0 10px 25px -5px ${alpha(iconColor, 0.3)}`,
//           borderColor: iconColor,
//         },
//       }}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box>
//           <Typography variant="h4" fontWeight="700" sx={{ color: "#1e293b", mb: 0.5 }}>
//             {value}
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//             {label}
//           </Typography>
//         </Box>
//         <Avatar
//           sx={{
//             bgcolor: iconBg,
//             color: iconColor,
//             width: 48,
//             height: 48,
//           }}
//         >
//           <Icon />
//         </Avatar>
//       </Box>
//     </Paper>
//   );
// };

// export default StatsCard;



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

  // Get responsive sizes based on device - MODIFIED for mobile to match tablet
  const getResponsiveValues = () => {
    // Small mobile (<=480px) - NOW MATCHES TABLET
    if (isSmallMobile) {
      return {
        padding: 1.2,        // Increased from 1
        avatarSize: 34,       // Increased from 28
        iconSize: 17,         // Increased from 14
        titleSize: '1.05rem', // Increased from 0.9rem
        labelSize: '0.6rem',  // Increased from 0.55rem
      };
    }
    
    // Mobile (481px - 768px) - NOW MATCHES TABLET
    if (isMobile) {
      return {
        padding: 1.4,         // Increased from 1.2
        avatarSize: 36,        // Increased from 32
        iconSize: 18,          // Increased from 16
        titleSize: '1.1rem',   // Increased from 1rem
        labelSize: '0.65rem',  // Increased from 0.6rem
      };
    }
    
    // Tablet (769px - 1024px)
    if (isTablet) {
      return {
        padding: 1.5,
        avatarSize: 38,        // Slightly increased from 36
        iconSize: 19,
        titleSize: '1.2rem',   // Slightly increased from 1.1rem
        labelSize: '0.7rem',   // Slightly increased from 0.65rem
      };
    }
    
    // Small Laptop (1025px - 1366px)
    if (isSmallLaptop) {
      return {
        padding: 1.8,
        avatarSize: 42,        // Slightly increased from 40
        iconSize: 21,
        titleSize: '1.4rem',   // Slightly increased from 1.3rem
        labelSize: '0.75rem',  // Slightly increased from 0.7rem
      };
    }
    
    // Desktop (>=1367px)
    return {
      padding: 2.2,
      avatarSize: 48,          // Increased from 44
      iconSize: 24,
      titleSize: '1.8rem',     // Increased from 1.5rem
      labelSize: '0.9rem',     // Increased from 0.8rem
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
          border: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          height: '100%',
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={responsive.titleSize} />
            <Skeleton variant="text" width="60%" height={responsive.labelSize} />
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
      transform: "translateY(-3px)",
      boxShadow: `0 12px 28px -8px ${alpha(iconColor, 0.4)}`,
      borderColor: iconColor,
      bgcolor: alpha(iconColor, 0.02),
    },
  } : {};

  // Selected state
  const selectedStyles = isSelected ? {
    borderColor: iconColor,
    borderWidth: '2px',
    boxShadow: `0 8px 20px -8px ${alpha(iconColor, 0.3)}`,
    bgcolor: alpha(iconColor, 0.03),
  } : {};

  // Trend indicator
  const TrendIndicator = () => {
    if (!trend || !trendValue) return null;
    
    const trendColor = trend === 'up' ? '#22c55e' : '#ef4444';
    const TrendIcon = trend === 'up' ? '↑' : '↓';
    
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.3,
          px: 0.8,
          py: 0.3,
          borderRadius: 1.5,
          bgcolor: alpha(trendColor, 0.1),
          color: trendColor,
          fontSize: `calc(${responsive.labelSize})`,
          fontWeight: 600,
          ml: 0.8,
        }}
      >
        <span style={{ fontSize: `calc(${responsive.iconSize} - 4px)` }}>{TrendIcon}</span>
        <span>{trendValue}%</span>
      </Box>
    );
  };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: responsive.padding,
        borderRadius: { xs: 2.5, sm: 3, md: 3.5 },
        border: "2px solid",
        borderColor: isSelected ? iconColor : alpha("#e2e8f0", 0.5),
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        transition: "all 0.25s ease",
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        minHeight: {
          xs: 95,        // Small mobile
          sm: 100,       // Mobile
          md: 105,       // Tablet
          lg: 110,       // Small laptop
          xl: 120,       // Desktop
        },
        display: 'flex',
        alignItems: 'center',
        ...hoverStyles,
        ...selectedStyles,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${iconColor} 0%, ${alpha(iconColor, 0.3)} 100%)`,
          opacity: isSelected ? 1 : 0,
          transition: 'opacity 0.25s ease',
        },
        '&:hover::before': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        width: '100%',
        gap: 1.5,
      }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: 0.5, 
            mb: 0.5 
          }}>
            <Typography
              fontWeight="700"
              sx={{ 
                color: "#1e293b", 
                fontSize: responsive.titleSize,
                lineHeight: 1.2,
                wordBreak: 'break-word',
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
              opacity: 0.8,
              wordBreak: 'break-word',
            }}
          >
            {label}
          </Typography>
        </Box>
        
        <Avatar
          sx={{
            bgcolor: alpha(iconColor, 0.12),
            color: iconColor,
            width: responsive.avatarSize,
            height: responsive.avatarSize,
            transition: 'all 0.25s ease',
            ml: 1,
            flexShrink: 0,
            border: '2px solid',
            borderColor: alpha(iconColor, 0.2),
            '& svg': {
              fontSize: responsive.iconSize,
            },
            ...(onClick && {
              '&:hover': {
                bgcolor: alpha(iconColor, 0.2),
                transform: 'scale(1.08)',
                borderColor: iconColor,
              },
            }),
          }}
        >
          <Icon />
        </Avatar>
      </Box>

      {/* Animated background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle at top right, ${alpha(iconColor, 0.08)}, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
          pointerEvents: 'none',
          opacity: 0.6,
        }}
      />
    </Paper>
  );
};

export default StatsCard;

