import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Grid,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  filterMonth,
  setFilterMonth,
  resultsCount,
}) => {
  const totalItems = useSelector((state) => state.payment?.totalItems || 0);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    // Function to generate the last 6 months including the current month
    const getLastSixMonths = () => {
      const monthsArray = [];
      const currentDate = new Date();

      // Include current month first
      const currentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      monthsArray.push(currentMonth.toISOString().slice(0, 7)); // "YYYY-MM"

      // Add the last 5 months
      for (let i = 1; i <= 5; i++) {
        const month = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i
        );
        const monthString = month.toISOString().slice(0, 7); // "YYYY-MM"
        monthsArray.push(monthString);
      }

      return monthsArray;
    };

    setMonths(getLastSixMonths());
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
        overflow: "hidden",
        mb: 3,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Input */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name or plan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#0f766e" }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  bgcolor: alpha("#0f766e", 0.05),
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
            />
          </Grid>

          {/* Month Filter */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  bgcolor: alpha("#a855f7", 0.1),
                  color: "#a855f7",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <FilterIcon sx={{ fontSize: 16 }} />
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  displayEmpty
                  sx={{
                    bgcolor: alpha("#a855f7", 0.05),
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                >
                  <MenuItem value="all">All Months</MenuItem>
                  {months.map((month) => {
                    const monthDate = new Date(month + "-01");
                    const monthName = monthDate.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    });
                    return (
                      <MenuItem key={month} value={month}>
                        {monthName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Results Badge */}
          <Grid item xs={12} md={3}>
            <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
              <Chip
                icon={<PeopleIcon sx={{ fontSize: 14 }} />}
                label={`${totalItems || resultsCount} Results`}
                size="medium"
                sx={{
                  bgcolor: "#0f766e",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  px: 1,
                  height: 40,
                  borderRadius: 3,
                  "& .MuiChip-icon": {
                    color: "white",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SearchFilter;