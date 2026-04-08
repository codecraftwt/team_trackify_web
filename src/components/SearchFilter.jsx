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
  useMediaQuery,
  Drawer,
  Badge,
} from "@mui/material";
import {
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Close as CloseIcon,
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
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onApplyDateFilter,
  onClearDateFilter,
  isFilterActive,
  totalAmount,
  sortBy = "date",
  sortOrder = "desc",
  onSortChange,
  hideResults = false,
}) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isTabletScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localSortOrder, setLocalSortOrder] = useState(sortOrder);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

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
    setMobileFilterOpen(false);
  };

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  const handleClear = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    if (onClearDateFilter) {
      onClearDateFilter();
    }
    handleClose();
    setMobileFilterOpen(false);
  };

  const handleLocalStartChange = (date) => {
    setLocalStartDate(date);
    setStartDate(date);
  };

  const handleLocalEndChange = (date) => {
    setLocalEndDate(date);
    setEndDate(date);
  };

  const handleSortClick = (event) => {
    if (isMobileScreen) {
      setMobileSortOpen(true);
    } else {
      setSortAnchorEl(event.currentTarget);
    }
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
    setMobileSortOpen(false);
  };

  const handleSortChange = (field, order) => {
    setLocalSortBy(field);
    setLocalSortOrder(order);
    if (onSortChange) {
      onSortChange(field, order);
    }
    handleSortClose();
  };

  const open = Boolean(anchorEl);
  const sortOpen = Boolean(sortAnchorEl);

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

  const getSortButtonText = () => {
    const fieldMap = {
      date: "Date",
      amount: "Amount",
      name: "Name",
      status: "Status",
    };
    const orderText = sortOrder === "desc" ? "Newest" : "Oldest";
    return `${fieldMap[sortBy] || "Sort"} (${orderText})`;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const renderSortMenuItems = () => (
    <>
      <MenuItem 
        onClick={() => handleSortChange("date", "desc")}
        selected={sortBy === "date" && sortOrder === "desc"}
        sx={{
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
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
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
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
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
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
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span>Amount (Lowest First)</span>
          <ArrowUpwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
        </Box>
      </MenuItem>
      <MenuItem 
        onClick={() => handleSortChange("name", "asc")}
        selected={sortBy === "name" && sortOrder === "asc"}
        sx={{
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
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
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span>Name (Z-A)</span>
          <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
        </Box>
      </MenuItem>
      <MenuItem 
        onClick={() => handleSortChange("status", "asc")}
        selected={sortBy === "status" && sortOrder === "asc"}
        sx={{
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
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
          fontSize: { xs: '0.875rem', sm: '0.75rem' },
          py: { xs: 1.5, sm: 1 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span>Status (Z-A)</span>
          <ArrowDownwardIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
        </Box>
      </MenuItem>
    </>
  );

  const renderDateFilterContent = () => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 1.5 },
      }}>
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
            maxDate={today}
            value={localStartDate}
            onChange={handleLocalStartChange}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                placeholder: "Select start date",
                sx: {
                  '& .MuiInputBase-root': {
                    height: { xs: 40, sm: 36 },
                    fontSize: { xs: '0.875rem', sm: '0.8rem' },
                    borderRadius: 1.5,
                  },
                }
              },
            }}
          />
        </Box>

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
            maxDate={today}
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
                    height: { xs: 40, sm: 36 },
                    fontSize: { xs: '0.875rem', sm: '0.8rem' },
                    borderRadius: 1.5,
                  },
                }
              },
            }}
          />
        </Box>

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
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );

  // Mobile layout
  if (isMobileScreen) {
    return (
      <>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.1),
            bgcolor: alpha(theme.palette.background.paper, 0.8),
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
            <TextField
              fullWidth
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 18 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClearSearch} edge="end">
                      <ClearIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  fontSize: '0.875rem',
                  height: 44,
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
            <Badge color="primary" variant="dot" invisible={!isFilterActive} sx={{ flex: 1 }}>
              <Button
                variant="outlined"
                onClick={handleSortClick}
                startIcon={<SortIcon />}
                fullWidth
                sx={{ height: 40 }}
              >
                Sort
              </Button>
            </Badge>

            <Badge color="primary" variant="dot" invisible={!isFilterActive} sx={{ flex: 1 }}>
              <Button
                variant={isFilterActive ? "contained" : "outlined"}
                onClick={() => setMobileFilterOpen(true)}
                startIcon={<DateRangeIcon />}
                fullWidth
                sx={{ height: 40 }}
              >
                Date
              </Button>
            </Badge>
          </Box>

          {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {totalAmount > 0 && (
                <Chip
                  label={`₹${totalAmount.toLocaleString("en-IN")}`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    height: 28,
                  }}
                />
              )}
              <Chip
                label={`${resultsCount} ${resultsCount === 1 ? 'result' : 'results'}`}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: '0.65rem',
                  height: 28,
                }}
              />
            </Box>
          </Box> */}
        </Paper>

        <Drawer
          anchor="bottom"
          open={mobileSortOpen}
          onClose={() => setMobileSortOpen(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              maxHeight: '70vh',
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                Sort By
              </Typography>
              <IconButton onClick={() => setMobileSortOpen(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
              {renderSortMenuItems()}
            </Box>
          </Box>
        </Drawer>

        <Drawer
          anchor="bottom"
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                Filter by Date
              </Typography>
              <IconButton onClick={() => setMobileFilterOpen(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            {renderDateFilterContent()}
          </Box>
        </Drawer>
      </>
    );
  }

  // Tablet and Desktop layout with proper wrapping
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.2, sm: 1.5 },
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        bgcolor: alpha(theme.palette.background.paper, 0.8),
      }}
    >
      {/* First Row: Search and Filters */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: "wrap", // Allow wrapping
        alignItems: "center", 
        gap: 1.2,
        mb: { xs: 1.5, sm: 0 }
      }}>
        {/* Search - takes remaining space */}
        <Box sx={{ 
          flex: { xs: "1 1 100%", sm: "2 1 200px" },
          minWidth: { xs: "100%", sm: "200px" }
        }}>
          <TextField
            fullWidth
            placeholder={isTabletScreen ? "Search..." : "Search by name, email or plan..."}
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
                  <IconButton size="small" onClick={handleClearSearch} edge="end">
                    <ClearIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                height: 36,
              },
            }}
          />
        </Box>
        
        {/* Sort Button */}
        <Box sx={{ 
          flex: { xs: "1 1 100%", sm: "0 1 auto" },
          minWidth: { xs: "100%", sm: "auto" }
        }}>
          <Button
            variant="outlined"
            onClick={handleSortClick}
            startIcon={<SortIcon sx={{ fontSize: 16 }} />}
            endIcon={sortOrder === "desc" ? <ArrowDownwardIcon sx={{ fontSize: 14 }} /> : <ArrowUpwardIcon sx={{ fontSize: 14 }} />}
            size="small"
            fullWidth={isTabletScreen}
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              whiteSpace: "nowrap",
              height: 36,
              borderColor: alpha(theme.palette.primary.main, 0.3),
              color: theme.palette.primary.main,
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
              px: { xs: 2, sm: 1.5 }
            }}
          >
            {getSortButtonText()}
          </Button>
        </Box>

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
            }
          }}
        >
          {renderSortMenuItems()}
        </Menu>
        
        {/* Date Range Button */}
        <Box sx={{ 
          flex: { xs: "1 1 100%", sm: "0 1 auto" },
          minWidth: { xs: "100%", sm: "auto" }
        }}>
          <Button
            variant={isFilterActive ? "contained" : "outlined"}
            onClick={handleClick}
            startIcon={<DateRangeIcon sx={{ fontSize: 16 }} />}
            size="small"
            fullWidth={isTabletScreen}
            sx={{
              minWidth: { xs: "100%", sm: "auto" },
              whiteSpace: "nowrap",
              height: 36,
              ...(isFilterActive ? {
                bgcolor: theme.palette.primary.main,
                color: 'white',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              } : {
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }),
              px: { xs: 2, sm: 1.5 }
            }}
          >
            {getDateButtonText()}
          </Button>
        </Box>

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
          {renderDateFilterContent()}
        </Popover>
      </Box>

      {/* Second Row: Results and Total (only visible on tablet when wrapped) */}
      {/* <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        mt: { xs: 1.5, sm: 0 }
      }}>
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
              }}
            />
          </Tooltip>
        </Box>
      </Box> */}
    </Paper>
  );
};

export default SearchFilter;