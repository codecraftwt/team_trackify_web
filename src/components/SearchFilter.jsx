// import React, { useState } from "react";
// import {
//   Paper,
//   Box,
//   TextField,
//   InputAdornment,
//   Button,
//   Chip,
//   alpha,
//   useTheme,
//   Popover,
//   Typography,
//   IconButton,  // Add this import
//   Tooltip,     // Add this import
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   DateRange as DateRangeIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import moment from "moment";

// const SearchFilter = ({
//   searchQuery,
//   setSearchQuery,
//   resultsCount,
//   isMobile,
//   isTablet,
//   isSmallMobile,
//   // Date filter props
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
//   onApplyDateFilter,
//   onClearDateFilter,
//   isFilterActive,
//   totalAmount,
// }) => {
//   const theme = useTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [localStartDate, setLocalStartDate] = useState(startDate);
//   const [localEndDate, setLocalEndDate] = useState(endDate);

//   const handleClick = (event) => {
//     setLocalStartDate(startDate);
//     setLocalEndDate(endDate);
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleApply = () => {
//     if (onApplyDateFilter) {
//       onApplyDateFilter();
//     }
//     handleClose();
//   };

//   const handleClear = () => {
//     setLocalStartDate(null);
//     setLocalEndDate(null);
//     if (onClearDateFilter) {
//       onClearDateFilter();
//     }
//     handleClose();
//   };

//   const handleLocalStartChange = (date) => {
//     setLocalStartDate(date);
//     setStartDate(date);
//   };

//   const handleLocalEndChange = (date) => {
//     setLocalEndDate(date);
//     setEndDate(date);
//   };

//   const open = Boolean(anchorEl);

//   // Format display text for date filter button
//   const getDateButtonText = () => {
//     if (isFilterActive) {
//       if (startDate && endDate) {
//         return `${moment(startDate).format("DD/MM/YY")} - ${moment(endDate).format("DD/MM/YY")}`;
//       } else if (startDate) {
//         return `From ${moment(startDate).format("DD/MM/YY")}`;
//       } else if (endDate) {
//         return `Until ${moment(endDate).format("DD/MM/YY")}`;
//       }
//     }
//     return "Date Range";
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e);
//   };

//   // Clear search
//   const handleClearSearch = () => {
//     setSearchQuery({ target: { value: '' } });
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
//         bgcolor: alpha(theme.palette.background.paper, 0.8),
//         backdropFilter: "blur(8px)",
//       }}
//     >
//       <Box sx={{ 
//         display: "flex", 
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "stretch", sm: "center" }, 
//         gap: { xs: 1, sm: 1.2 }, 
//         flex: 1 
//       }}>
//         {/* Search Input with Clear Button */}
//         <Box sx={{ position: 'relative', flex: 2 }}>
//           <TextField
//             fullWidth
//             placeholder={isSmallMobile ? "Search..." : "Search by name, email or plan..."}
//             value={searchQuery}
//             onChange={handleSearchChange}
//             size="small"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
//                 </InputAdornment>
//               ),
//               endAdornment: searchQuery && (
//                 <InputAdornment position="end">
//                   <IconButton
//                     size="small"
//                     onClick={handleClearSearch}
//                     edge="end"
//                     sx={{ 
//                       padding: '2px',
//                       mr: -0.5,
//                       '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
//                     }}
//                   >
//                     <ClearIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 1.5,
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//                 fontSize: { xs: '0.75rem', sm: '0.8rem' },
//                 height: 36,
//                 transition: 'all 0.2s ease',
//                 '&:hover': {
//                   bgcolor: alpha(theme.palette.primary.main, 0.08),
//                 },
//                 '&.Mui-focused': {
//                   bgcolor: alpha(theme.palette.primary.main, 0.1),
//                 },
//               },
//             }}
//           />
//         </Box>
        
//         {/* Date Range Button */}
//         <Button
//           variant={isFilterActive ? "contained" : "outlined"}
//           onClick={handleClick}
//           startIcon={<DateRangeIcon sx={{ fontSize: 16 }} />}
//           size="small"
//           fullWidth={isMobile}
//           sx={{
//             minWidth: { xs: '100%', sm: 140 },
//             height: 36,
//             ...(isFilterActive ? {
//               bgcolor: theme.palette.primary.main,
//               color: 'white',
//               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//               '&:hover': { bgcolor: theme.palette.primary.dark },
//             } : {
//               borderColor: alpha(theme.palette.primary.main, 0.3),
//               color: theme.palette.primary.main,
//               fontSize: { xs: '0.7rem', sm: '0.75rem' },
//               "&:hover": {
//                 borderColor: theme.palette.primary.main,
//                 bgcolor: alpha(theme.palette.primary.main, 0.05),
//               },
//             })
//           }}
//         >
//           {getDateButtonText()}
//         </Button>

//         {/* Date Range Popover */}
//         <Popover
//           open={open}
//           anchorEl={anchorEl}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'right',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           PaperProps={{
//             sx: {
//               p: 1.5,
//               width: 280,
//               borderRadius: 2,
//               boxShadow: theme.shadows[8],
//               border: '1px solid',
//               borderColor: alpha(theme.palette.primary.main, 0.1),
//               mt: 0.5,
//             }
//           }}
//         >
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 1.5,
//             }}>
//               {/* Start Date */}
//               <Box>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     fontSize: '0.7rem',
//                     fontWeight: 600,
//                     color: theme.palette.primary.main,
//                     mb: 0.5,
//                     display: 'block',
//                   }}
//                 >
//                   Start Date
//                 </Typography>
//                 <DatePicker
//                   value={localStartDate}
//                   onChange={handleLocalStartChange}
//                   slotProps={{
//                     textField: {
//                       size: "small",
//                       fullWidth: true,
//                       placeholder: "Select start date",
//                       sx: {
//                         '& .MuiInputBase-root': {
//                           height: 36,
//                           fontSize: '0.8rem',
//                           borderRadius: 1.5,
//                           bgcolor: alpha(theme.palette.primary.main, 0.02),
//                         },
//                         '& .MuiInputBase-input': {
//                           padding: '8px 12px',
//                         },
//                         '& .MuiOutlinedInput-notchedOutline': {
//                           borderColor: alpha(theme.palette.primary.main, 0.2),
//                         },
//                         '&:hover .MuiOutlinedInput-notchedOutline': {
//                           borderColor: alpha(theme.palette.primary.main, 0.4),
//                         },
//                       }
//                     },
//                     popper: {
//                       sx: {
//                         '& .MuiPaper-root': {
//                           borderRadius: 1.5,
//                           border: '1px solid',
//                           borderColor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                       }
//                     }
//                   }}
//                 />
//               </Box>

//               {/* End Date */}
//               <Box>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     fontSize: '0.7rem',
//                     fontWeight: 600,
//                     color: theme.palette.primary.main,
//                     mb: 0.5,
//                     display: 'block',
//                   }}
//                 >
//                   End Date
//                 </Typography>
//                 <DatePicker
//                   value={localEndDate}
//                   onChange={handleLocalEndChange}
//                   minDate={localStartDate || undefined}
//                   slotProps={{
//                     textField: {
//                       size: "small",
//                       fullWidth: true,
//                       placeholder: "Select end date",
//                       sx: {
//                         '& .MuiInputBase-root': {
//                           height: 36,
//                           fontSize: '0.8rem',
//                           borderRadius: 1.5,
//                           bgcolor: alpha(theme.palette.primary.main, 0.02),
//                         },
//                         '& .MuiInputBase-input': {
//                           padding: '8px 12px',
//                         },
//                         '& .MuiOutlinedInput-notchedOutline': {
//                           borderColor: alpha(theme.palette.primary.main, 0.2),
//                         },
//                         '&:hover .MuiOutlinedInput-notchedOutline': {
//                           borderColor: alpha(theme.palette.primary.main, 0.4),
//                         },
//                       }
//                     },
//                     popper: {
//                       sx: {
//                         '& .MuiPaper-root': {
//                           borderRadius: 1.5,
//                           border: '1px solid',
//                           borderColor: alpha(theme.palette.primary.main, 0.1),
//                         },
//                       }
//                     }
//                   }}
//                 />
//               </Box>

           

//               {/* Action Buttons */}
//               <Box sx={{
//                 display: 'flex',
//                 gap: 1,
//                 justifyContent: 'flex-end',
//                 mt: 1,
//                 pt: 1,
//                 borderTop: '1px solid',
//                 borderTopColor: alpha(theme.palette.primary.main, 0.1),
//               }}>
//                 <Button
//                   size="small"
//                   onClick={handleClear}
//                   sx={{
//                     fontSize: '0.7rem',
//                     minWidth: 'auto',
//                     px: 1.5,
//                     py: 0.3,
//                     color: 'text.secondary',
//                     textTransform: 'none',
//                     '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main },
//                   }}
//                 >
//                   Reset
//                 </Button>
//                 <Button
//                   size="small"
//                   variant="contained"
//                   onClick={handleApply}
//                   disabled={!localStartDate && !localEndDate}
//                   sx={{
//                     fontSize: '0.7rem',
//                     minWidth: 'auto',
//                     px: 2,
//                     py: 0.3,
//                     textTransform: 'none',
//                     bgcolor: theme.palette.primary.main,
//                     '&:hover': { bgcolor: theme.palette.primary.dark },
//                     '&.Mui-disabled': {
//                       bgcolor: alpha(theme.palette.primary.main, 0.3),
//                     },
//                   }}
//                 >
//                   Apply
//                 </Button>
//               </Box>
//             </Box>
//           </LocalizationProvider>
//         </Popover>
//       </Box>

//       {/* Results Count and Total Amount */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         {totalAmount > 0 && (
//           <Tooltip title="Total amount for current page" arrow>
//             <Chip
//               label={`₹${totalAmount.toLocaleString("en-IN")}`}
//               size="small"
//               sx={{
//                 bgcolor: alpha(theme.palette.success.main, 0.1),
//                 color: theme.palette.success.main,
//                 fontWeight: 600,
//                 fontSize: { xs: '0.65rem', sm: '0.7rem' },
//                 height: 28,
//                 border: "1px solid",
//                 borderColor: alpha(theme.palette.success.main, 0.2),
//                 '& .MuiChip-label': {
//                   px: 1.2,
//                 },
//               }}
//             />
//           </Tooltip>
//         )}
//         <Tooltip title="Number of records on current page" arrow>
//           <Chip
//             label={`${resultsCount} ${resultsCount === 1 ? 'result' : 'results'}`}
//             size="small"
//             sx={{
//               bgcolor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.main,
//               fontWeight: 600,
//               fontSize: { xs: '0.65rem', sm: '0.7rem' },
//               height: 28,
//               border: "1px solid",
//               borderColor: alpha(theme.palette.primary.main, 0.2),
//               '& .MuiChip-label': {
//                 px: 1.2,
//               },
//             }}
//           />
//         </Tooltip>
//       </Box>
//     </Paper>
//   );
// };

// export default SearchFilter;

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
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
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
  // Sort props
  sortBy = "date", // default sort by date
  sortOrder = "desc", // default descending (newest first)
  onSortChange,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder);

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

  // Sort menu handlers
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (field, order) => {
    setLocalSortBy(field);
    setLocalSortOrder(order);
    if (onSortChange) {
      onSortChange(field, order);
    }
    handleSortClose();
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setLocalSortOrder(newOrder);
    if (onSortChange) {
      onSortChange(sortBy, newOrder);
    }
  };

  const open = Boolean(anchorEl);
  const sortOpen = Boolean(sortAnchorEl);

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

  // Get sort button text
  const getSortButtonText = () => {
    const fieldMap = {
      date: "Date",
      amount: "Amount",
      name: "Name",
      status: "Status",
    };
    const orderText = sortOrder === "desc" ? "Newest / Highest" : "Oldest / Lowest";
    return `${fieldMap[sortBy] || "Sort"} (${orderText})`;
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
        
        {/* Sort Button */}
        <Button
          variant="outlined"
          onClick={handleSortClick}
          startIcon={<SortIcon sx={{ fontSize: 16 }} />}
          endIcon={sortOrder === "desc" ? <ArrowDownwardIcon sx={{ fontSize: 14 }} /> : <ArrowUpwardIcon sx={{ fontSize: 14 }} />}
          size="small"
          fullWidth={isMobile}
          sx={{
            minWidth: { xs: '100%', sm: 150 },
            height: 36,
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            "&:hover": {
              borderColor: theme.palette.primary.main,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          {getSortButtonText()}
        </Button>

        {/* Sort Menu */}
        <Menu
          anchorEl={sortAnchorEl}
          open={sortOpen}
          onClose={handleSortClose}
          PaperProps={{
            sx: {
              mt: 0.5,
              borderRadius: 2,
              minWidth: 180,
              boxShadow: theme.shadows[4],
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1),
              overflow: 'hidden',
            }
          }}
        >
          <MenuItem 
            onClick={() => handleSortChange("date", "desc")}
            selected={sortBy === "date" && sortOrder === "desc"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Date (Newest First)</span>
              <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortChange("date", "asc")}
            selected={sortBy === "date" && sortOrder === "asc"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Date (Oldest First)</span>
              <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortChange("amount", "desc")}
            selected={sortBy === "amount" && sortOrder === "desc"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Amount (Highest First)</span>
              <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortChange("amount", "asc")}
            selected={sortBy === "amount" && sortOrder === "asc"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Amount (Lowest First)</span>
              <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortChange("name", "asc")}
            selected={sortBy === "name"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Name (A-Z)</span>
              <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortChange("name", "desc")}
            selected={sortBy === "name" && sortOrder === "desc"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Name (Z-A)</span>
              <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortChange("status", "asc")}
            selected={sortBy === "status"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Status (A-Z)</span>
              <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
          <MenuItem 
            onClick={() => handleSortChange("status", "desc")}
            selected={sortBy === "status" && sortOrder === "desc"}
            sx={{
              fontSize: '0.75rem',
              py: 1,
              '&.Mui-selected': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <span>Status (Z-A)</span>
              <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
            </Box>
          </MenuItem>
        </Menu>
        
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