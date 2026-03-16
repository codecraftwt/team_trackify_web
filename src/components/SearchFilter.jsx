////////////////////////////// Change Color Theam/////////////////////////////////////
// import React, { useState } from "react";
// import {
//   Paper,
//   Box,
//   TextField,
//   InputAdornment,
//   Button,
//   Menu,
//   MenuItem,
//   Chip,
//   alpha,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   CalendarToday as CalendarIcon,
// } from "@mui/icons-material";
// import moment from "moment";

import { Filter } from "@mui/icons-material"

// const SearchFilter = ({
//   searchQuery,
//   setSearchQuery,
//   filterMonth,
//   setFilterMonth,
//   resultsCount,
//   isMobile,
//   isTablet,
//   isSmallMobile,
// }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const currentYear = moment().year();
//   const months = [
//     { value: "all", label: "All Months" },
//     ...Array.from({ length: 12 }, (_, i) => {
//       const month = (i + 1).toString().padStart(2, "0");
//       return {
//         value: `${currentYear}-${month}`,
//         label: moment(`${currentYear}-${month}`, "YYYY-MM").format("MMMM YYYY"),
//       };
//     }),
//   ];

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSelect = (value) => {
//     setFilterMonth(value);
//     handleClose();
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2 },
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha("#2563EB", 0.1),
//         display: "flex",
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "stretch", sm: "center" },
//         justifyContent: "space-between",
//         gap: { xs: 1.5, sm: 2 },
//       }}
//     >
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "stretch", sm: "center" }, 
//         gap: { xs: 1, sm: 1.5 }, 
//         flex: 1 
//       }}>
//         <TextField
//           fullWidth
//           placeholder={isSmallMobile ? "Search..." : "Search by name, email or plan..."}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           size={isMobile ? "small" : "medium"}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: "#2563EB", fontSize: { xs: 18, sm: 20 } }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: { xs: 1.5, sm: 2 },
//               bgcolor: alpha("#2563EB", 0.05),
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//             },
//           }}
//         />
        
//         <Button
//           variant="outlined"
//           onClick={handleClick}
//           startIcon={<FilterIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//           endIcon={<CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//           size={isMobile ? "small" : "medium"}
//           fullWidth={isMobile}
//           sx={{
//             minWidth: { xs: '100%', sm: 140 },
//             borderColor: alpha("#2563EB", 0.3),
//             color: "#2563EB",
//             fontSize: { xs: '0.75rem', sm: '0.85rem' },
//             "&:hover": {
//               borderColor: "#2563EB",
//               color: "#2563EB",
//               bgcolor: alpha("#2563EB", 0.05),
//             },
//           }}
//         >
//           {filterMonth === "all" ? "All Months" : moment(filterMonth).format("MMM YYYY")}
//         </Button>
        
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           PaperProps={{
//             sx: {
//               maxHeight: 300,
//               borderRadius: { xs: 1.5, sm: 2 },
//               mt: 1,
//               border: "1px solid",
//               borderColor: alpha("#2563EB", 0.1),
//             },
//           }}
//         >
//           {months.map((month) => (
//             <MenuItem
//               key={month.value}
//               onClick={() => handleSelect(month.value)}
//               selected={filterMonth === month.value}
//               sx={{ 
//                 fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 '&:hover': {
//                   bgcolor: alpha("#2563EB", 0.05),
//                 },
//                 '&.Mui-selected': {
//                   bgcolor: alpha("#2563EB", 0.1),
//                   color: "#2563EB",
//                   '&:hover': {
//                     bgcolor: alpha("#2563EB", 0.15),
//                   },
//                 },
//               }}
//             >
//               {month.label}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>

//       <Chip
//         label={`${resultsCount} ${resultsCount === 1 ? 'Result' : 'Results'}`}
//         size="small"
//         sx={{
//           bgcolor: alpha("#2563EB", 0.1),
//           color: "#2563EB",
//           fontWeight: 600,
//           px: { xs: 0.5, sm: 1 },
//           fontSize: { xs: '0.65rem', sm: '0.75rem' },
//           height: { xs: 24, sm: 28 },
//           alignSelf: { xs: 'flex-start', sm: 'center' },
//           border: "1px solid",
//           borderColor: alpha("#2563EB", 0.2),
//         }}
//       />
//     </Paper>
//   );
// };

// export default SearchFilter; 











//////////////////////////////    Centralised Color     ///////////////////////////////


// import React, { useState } from "react";
// import {
//   Paper,
//   Box,
//   TextField,
//   InputAdornment,
//   Button,
//   Menu,
//   MenuItem,
//   Chip,
//   alpha,
//   useTheme,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   CalendarToday as CalendarIcon,
// } from "@mui/icons-material";
// import moment from "moment";

// const SearchFilter = ({
//   searchQuery,
//   setSearchQuery,
//   filterMonth,
//   setFilterMonth,
//   resultsCount,
//   isMobile,
//   isTablet,
//   isSmallMobile,
// }) => {
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const currentYear = moment().year();
//   const months = [
//     { value: "all", label: "All Months" },
//     ...Array.from({ length: 12 }, (_, i) => {
//       const month = (i + 1).toString().padStart(2, "0");
//       return {
//         value: `${currentYear}-${month}`,
//         label: moment(`${currentYear}-${month}`, "YYYY-MM").format("MMMM YYYY"),
//       };
//     }),
//   ];

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSelect = (value) => {
//     setFilterMonth(value);
//     handleClose();
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.5, sm: 2 },
//         borderRadius: { xs: 2, sm: 2.5, md: 3 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         display: "flex",
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "stretch", sm: "center" },
//         justifyContent: "space-between",
//         gap: { xs: 1.5, sm: 2 },
//       }}
//     >
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "stretch", sm: "center" }, 
//         gap: { xs: 1, sm: 1.5 }, 
//         flex: 1 
//       }}>
//         <TextField
//           fullWidth
//           placeholder={isSmallMobile ? "Search..." : "Search by name, email or plan..."}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           size={isMobile ? "small" : "medium"}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: { xs: 18, sm: 20 } }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: { xs: 1.5, sm: 2 },
//               bgcolor: alpha(theme.palette.primary.main, 0.05),
//               fontSize: { xs: '0.8rem', sm: '0.9rem' },
//             },
//           }}
//         />
        
//         <Button
//           variant="outlined"
//           onClick={handleClick}
//           startIcon={<FilterIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//           endIcon={<CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
//           size={isMobile ? "small" : "medium"}
//           fullWidth={isMobile}
//           sx={{
//             minWidth: { xs: '100%', sm: 140 },
//             borderColor: alpha(theme.palette.primary.main, 0.3),
//             color: theme.palette.primary.main,
//             fontSize: { xs: '0.75rem', sm: '0.85rem' },
//             "&:hover": {
//               borderColor: theme.palette.primary.main,
//               color: theme.palette.primary.main,
//               bgcolor: alpha(theme.palette.primary.main, 0.05),
//             },
//           }}
//         >
//           {filterMonth === "all" ? "All Months" : moment(filterMonth).format("MMM YYYY")}
//         </Button>
        
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           PaperProps={{
//             sx: {
//               maxHeight: 300,
//               borderRadius: { xs: 1.5, sm: 2 },
//               mt: 1,
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//             },
//           }}
//         >
//           {months.map((month) => (
//             <MenuItem
//               key={month.value}
//               onClick={() => handleSelect(month.value)}
//               selected={filterMonth === month.value}
//               sx={{ 
//                 fontSize: { xs: '0.8rem', sm: '0.9rem' },
//                 '&:hover': {
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 },
//                 '&.Mui-selected': {
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   '&:hover': {
//                     bgcolor: alpha(theme.palette.primary.main, 0.15),
//                   },
//                 },
//               }}
//             >
//               {month.label}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>

//       <Chip
//         label={`${resultsCount} ${resultsCount === 1 ? 'Result' : 'Results'}`}
//         size="small"
//         sx={{
//           bgcolor: alpha(theme.palette.primary.main, 0.1),
//           color: theme.palette.primary.main,
//           fontWeight: 600,
//           px: { xs: 0.5, sm: 1 },
//           fontSize: { xs: '0.65rem', sm: '0.75rem' },
//           height: { xs: 24, sm: 28 },
//           alignSelf: { xs: 'flex-start', sm: 'center' },
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.2),
//         }}
//       />
//     </Paper>
//   );
// };

// export default SearchFilter;










// import React, { useState } from "react";
// import {
//   Paper,
//   Box,
//   TextField,
//   InputAdornment,
//   Button,
//   Menu,
//   MenuItem,
//   Chip,
//   alpha,
//   useTheme,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   CalendarToday as CalendarIcon,
// } from "@mui/icons-material";
// import moment from "moment";

// const SearchFilter = ({
//   searchQuery,
//   setSearchQuery,
//   filterMonth,
//   setFilterMonth,
//   resultsCount,
//   isMobile,
//   isTablet,
//   isSmallMobile,
// }) => {
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const currentYear = moment().year();
//   const months = [
//     { value: "all", label: "All Months" },
//     ...Array.from({ length: 12 }, (_, i) => {
//       const month = (i + 1).toString().padStart(2, "0");
//       return {
//         value: `${currentYear}-${month}`,
//         label: moment(`${currentYear}-${month}`, "YYYY-MM").format("MMMM YYYY"),
//       };
//     }),
//   ];

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSelect = (value) => {
//     setFilterMonth(value);
//     handleClose();
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: { xs: 1.2, sm: 1.5 },
//         borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//         border: "1px solid",
//         borderColor: alpha(theme.palette.primary.main, 0.1),
//         display: "flex",
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "stretch", sm: "center" },
//         justifyContent: "space-between",
//         gap: { xs: 1.2, sm: 1.5 },
//       }}
//     >
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "stretch", sm: "center" }, 
//         gap: { xs: 1, sm: 1.2 }, 
//         flex: 1 
//       }}>
//         <TextField
//           fullWidth
//           placeholder={isSmallMobile ? "Search..." : "Search by name, email or plan..."}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           size="small"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: 1.5,
//               bgcolor: alpha(theme.palette.primary.main, 0.05),
//               fontSize: { xs: '0.75rem', sm: '0.8rem' },
//               height: 36,
//             },
//             "& .MuiInputLabel-root": {
//               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//             },
//           }}
//         />
        
//         <Button
//           variant="outlined"
//           onClick={handleClick}
//           startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
//           endIcon={<CalendarIcon sx={{ fontSize: 14 }} />}
//           size="small"
//           fullWidth={isMobile}
//           sx={{
//             minWidth: { xs: '100%', sm: 120 },
//             borderColor: alpha(theme.palette.primary.main, 0.3),
//             color: theme.palette.primary.main,
//             fontSize: { xs: '0.7rem', sm: '0.75rem' },
//             height: 36,
//             "&:hover": {
//               borderColor: theme.palette.primary.main,
//               color: theme.palette.primary.main,
//               bgcolor: alpha(theme.palette.primary.main, 0.05),
//             },
//           }}
//         >
//           {filterMonth === "all" ? "Months" : moment(filterMonth).format("MMM YYYY")}
//         </Button>
        
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//           PaperProps={{
//             sx: {
//               maxHeight: 260,
//               borderRadius: 1.5,
//               mt: 1,
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//             },
//           }}
//         >
//           {months.map((month) => (
//             <MenuItem
//               key={month.value}
//               onClick={() => handleSelect(month.value)}
//               selected={filterMonth === month.value}
//               sx={{ 
//                 fontSize: { xs: '0.7rem', sm: '0.75rem' },
//                 py: 0.8,
//                 '&:hover': {
//                   bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 },
//                 '&.Mui-selected': {
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                   color: theme.palette.primary.main,
//                   '&:hover': {
//                     bgcolor: alpha(theme.palette.primary.main, 0.15),
//                   },
//                 },
//               }}
//             >
//               {month.label}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>

//       <Chip
//         label={`${resultsCount}`}
//         size="small"
//         sx={{
//           bgcolor: alpha(theme.palette.primary.main, 0.1),
//           color: theme.palette.primary.main,
//           fontWeight: 600,
//           px: 0.5,
//           fontSize: { xs: '0.6rem', sm: '0.65rem' },
//           height: { xs: 22, sm: 24 },
//           alignSelf: { xs: 'flex-start', sm: 'center' },
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.2),
//         }}
//       />
//     </Paper>
//   );
// };

// export default SearchFilter;




// With Date Filter


import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  Button,
  Chip,
  alpha,
  useTheme,
  Popover,
  Typography,
  IconButton,  // Add this import
  Tooltip,     // Add this import
} from "@mui/material";
import {
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  resultsCount,
  isMobile,
  isTablet,
  isSmallMobile,
  // Date filter props
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApplyDateFilter,
  onClearDateFilter,
  isFilterActive,
  totalAmount,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  const handleClick = (event) => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApply = () => {
    if (onApplyDateFilter) {
      onApplyDateFilter();
    }
    handleClose();
  };

  const handleClear = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    if (onClearDateFilter) {
      onClearDateFilter();
    }
    handleClose();
  };

  const handleLocalStartChange = (date) => {
    setLocalStartDate(date);
    setStartDate(date);
  };

  const handleLocalEndChange = (date) => {
    setLocalEndDate(date);
    setEndDate(date);
  };

  const open = Boolean(anchorEl);

  // Format display text for date filter button
  const getDateButtonText = () => {
    if (isFilterActive) {
      if (startDate && endDate) {
        return `${moment(startDate).format("DD/MM/YY")} - ${moment(endDate).format("DD/MM/YY")}`;
      } else if (startDate) {
        return `From ${moment(startDate).format("DD/MM/YY")}`;
      } else if (endDate) {
        return `Until ${moment(endDate).format("DD/MM/YY")}`;
      }
    }
    return "Date Range";
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery({ target: { value: '' } });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.2, sm: 1.5 },
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 1.2, sm: 1.5 },
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(8px)",
      }}
    >
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" }, 
        gap: { xs: 1, sm: 1.2 }, 
        flex: 1 
      }}>
        {/* Search Input with Clear Button */}
        <Box sx={{ position: 'relative', flex: 2 }}>
          <TextField
            fullWidth
            placeholder={isSmallMobile ? "Search..." : "Search by name, email or plan..."}
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={handleClearSearch}
                    edge="end"
                    sx={{ 
                      padding: '2px',
                      mr: -0.5,
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                    }}
                  >
                    <ClearIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                height: 36,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
                '&.Mui-focused': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              },
            }}
          />
        </Box>
        
        {/* Date Range Button */}
        <Button
          variant={isFilterActive ? "contained" : "outlined"}
          onClick={handleClick}
          startIcon={<DateRangeIcon sx={{ fontSize: 16 }} />}
          size="small"
          fullWidth={isMobile}
          sx={{
            minWidth: { xs: '100%', sm: 140 },
            height: 36,
            ...(isFilterActive ? {
              bgcolor: theme.palette.primary.main,
              color: 'white',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              '&:hover': { bgcolor: theme.palette.primary.dark },
            } : {
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.main,
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              "&:hover": {
                borderColor: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              },
            })
          }}
        >
          {getDateButtonText()}
        </Button>

        {/* Date Range Popover */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              p: 1.5,
              width: 280,
              borderRadius: 2,
              boxShadow: theme.shadows[8],
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1),
              mt: 0.5,
            }
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}>
              {/* Start Date */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  Start Date
                </Typography>
                <DatePicker
                  value={localStartDate}
                  onChange={handleLocalStartChange}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      placeholder: "Select start date",
                      sx: {
                        '& .MuiInputBase-root': {
                          height: 36,
                          fontSize: '0.8rem',
                          borderRadius: 1.5,
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.primary.main, 0.4),
                        },
                      }
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }
                    }
                  }}
                />
              </Box>

              {/* End Date */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 0.5,
                    display: 'block',
                  }}
                >
                  End Date
                </Typography>
                <DatePicker
                  value={localEndDate}
                  onChange={handleLocalEndChange}
                  minDate={localStartDate || undefined}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      placeholder: "Select end date",
                      sx: {
                        '& .MuiInputBase-root': {
                          height: 36,
                          fontSize: '0.8rem',
                          borderRadius: 1.5,
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        '& .MuiInputBase-input': {
                          padding: '8px 12px',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.primary.main, 0.4),
                        },
                      }
                    },
                    popper: {
                      sx: {
                        '& .MuiPaper-root': {
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }
                    }
                  }}
                />
              </Box>

           

              {/* Action Buttons */}
              <Box sx={{
                display: 'flex',
                gap: 1,
                justifyContent: 'flex-end',
                mt: 1,
                pt: 1,
                borderTop: '1px solid',
                borderTopColor: alpha(theme.palette.primary.main, 0.1),
              }}>
                <Button
                  size="small"
                  onClick={handleClear}
                  sx={{
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    px: 1.5,
                    py: 0.3,
                    color: 'text.secondary',
                    textTransform: 'none',
                    '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main },
                  }}
                >
                  Reset
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleApply}
                  disabled={!localStartDate && !localEndDate}
                  sx={{
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    px: 2,
                    py: 0.3,
                    textTransform: 'none',
                    bgcolor: theme.palette.primary.main,
                    '&:hover': { bgcolor: theme.palette.primary.dark },
                    '&.Mui-disabled': {
                      bgcolor: alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </LocalizationProvider>
        </Popover>
      </Box>

      {/* Results Count and Total Amount */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {totalAmount > 0 && (
          <Tooltip title="Total amount for current page" arrow>
            <Chip
              label={`₹${totalAmount.toLocaleString("en-IN")}`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: theme.palette.success.main,
                fontWeight: 600,
                fontSize: { xs: '0.65rem', sm: '0.7rem' },
                height: 28,
                border: "1px solid",
                borderColor: alpha(theme.palette.success.main, 0.2),
                '& .MuiChip-label': {
                  px: 1.2,
                },
              }}
            />
          </Tooltip>
        )}
        <Tooltip title="Number of records on current page" arrow>
          <Chip
            label={`${resultsCount} ${resultsCount === 1 ? 'result' : 'results'}`}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 600,
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              height: 28,
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.2),
              '& .MuiChip-label': {
                px: 1.2,
              },
            }}
          />
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default SearchFilter;