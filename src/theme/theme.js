// import { createTheme } from '@mui/material/styles';

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#14b8a6',
//       light: '#2dd4bf',
//       dark: '#0d9488',
//       contrastText: '#ffffff',
//     }, 
//     secondary: {
//       main: '#f59e0b',
//       light: '#fbbf24',
//       dark: '#d97706',
//       contrastText: '#ffffff',
//     },
//     background: {
//       default: '#f8fafc',
//       paper: '#ffffff',
//     },
//     text: {
//       primary: '#1f2937',
//       secondary: '#6b7280',
//     },
//   },
//   typography: {
//     fontFamily: 'Inter, system-ui, sans-serif',
//     h1: {
//       fontSize: '3rem',
//       fontWeight: 700,
//       lineHeight: 1.2,
//       '@media (max-width:768px)': {
//         fontSize: '2rem',
//       },
//     },
//     h2: {
//       fontSize: '2.25rem',
//       fontWeight: 600,
//       lineHeight: 1.3,
//       '@media (max-width:768px)': {
//         fontSize: '1.75rem',
//       },
//     },
//     h3: {
//       fontSize: '1.5rem',
//       fontWeight: 600,
//       lineHeight: 1.4,
//     },
//     h4: {
//       fontSize: '1.25rem',
//       fontWeight: 600,
//     },
//     body1: {
//       fontSize: '1rem',
//       lineHeight: 1.6,
//     },
//     button: {
//       textTransform: 'none',
//       fontWeight: 600,
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: '8px',
//           fontWeight: 600,
//           padding: '10px 24px',
//           boxShadow: 'none',
//           '&:hover': {
//             boxShadow: '0 4px 12px rgba(20, 184, 166, 0.15)',
//           },
//         },
//         contained: {
//           '&:hover': {
//             boxShadow: '0 6px 20px rgba(20, 184, 166, 0.23)',
//           },
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: '12px',
//           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//           border: '1px solid #e5e7eb',
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             borderRadius: '8px',
//           },
//         },
//       },
//     },
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           borderRadius: '0 12px 12px 0',
//         },
//       },
//     },
//   },
// });















////////////////////////Blue Theamimport { createTheme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2f6eaa',
      light: '#3088c7',
      dark: '#1e4f7a',
      contrastText: '#ffffff',
    }, 
    secondary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:768px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(47, 110, 170, 0.15)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 20px rgba(47, 110, 170, 0.23)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 12px 12px 0',
        },
      },
    },
  },
});