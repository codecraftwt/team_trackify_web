import React from 'react';
import { Box, Typography } from '@mui/material';

const Loader = ({ 
  message = "Loading...", 
  fullScreen = false,
  size = 40 
}) => {
  
  // Convert size to pixels for the border width
  const borderSize = Math.max(4, Math.floor(size / 10));
  
  const loaderContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {/* Custom rounded spinner */}
      <Box
        sx={{
          width: size,
          height: size,
          border: `${borderSize}px solid #e2e8f0`,
          borderTopColor: '#0f766e',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />
      
      {message && (
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b',
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(3px)',
          zIndex: 9999,
        }}
      >
        {loaderContent}
      </Box>
    );
  }

  return loaderContent;
};

// Inline loader with rounded style
export const InlineLoader = ({ size = 24, color = '#0f766e' }) => {
  const borderSize = Math.max(2, Math.floor(size / 12));
  
  return (
    <Box
      sx={{
        width: size,
        height: size,
        border: `${borderSize}px solid #e2e8f0`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    />
  );
};

// Super simple rounded spinner
export const RoundedSpinner = ({ size = 30, color = '#0f766e' }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        border: `3px solid #e2e8f0`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    />
  );
};

export default Loader;