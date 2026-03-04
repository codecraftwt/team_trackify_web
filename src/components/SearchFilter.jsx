// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Box,
//   TextField,
//   InputAdornment,
//   FormControl,
//   Select,
//   MenuItem,
//   Chip,
//   Grid,
//   alpha,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   People as PeopleIcon,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";

// const SearchFilter = ({
//   searchQuery,
//   setSearchQuery,
//   filterMonth,
//   setFilterMonth,
//   resultsCount,
// }) => {
//   const totalItems = useSelector((state) => state.payment?.totalItems || 0);
//   const [months, setMonths] = useState([]);

//   useEffect(() => {
//     // Function to generate the last 6 months including the current month
//     const getLastSixMonths = () => {
//       const monthsArray = [];
//       const currentDate = new Date();

//       // Include current month first
//       const currentMonth = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth()
//       );
//       monthsArray.push(currentMonth.toISOString().slice(0, 7)); // "YYYY-MM"

//       // Add the last 5 months
//       for (let i = 1; i <= 5; i++) {
//         const month = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth() - i
//         );
//         const monthString = month.toISOString().slice(0, 7); // "YYYY-MM"
//         monthsArray.push(monthString);
//       }

//       return monthsArray;
//     };

//     setMonths(getLastSixMonths());
//   }, []);

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         borderRadius: 3,
//         border: "1px solid",
//         borderColor: alpha("#e2e8f0", 0.5),
//         overflow: "hidden",
//         mb: 3,
//       }}
//     >
//       <Box sx={{ p: 3 }}>
//         <Grid container spacing={2} alignItems="center">
//           {/* Search Input */}
//           <Grid item xs={12} md={6}>
//             <TextField
//               fullWidth
//               placeholder="Search by name or plan..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               variant="outlined"
//               size="small"
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon sx={{ color: "#0f766e" }} />
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   borderRadius: 2,
//                   bgcolor: alpha("#0f766e", 0.05),
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     border: "none",
//                   },
//                 },
//               }}
//             />
//           </Grid>

//           {/* Month Filter */}
//           <Grid item xs={12} md={3}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   width: 40,
//                   height: 40,
//                   bgcolor: alpha("#a855f7", 0.1),
//                   color: "#a855f7",
//                   borderTopLeftRadius: 8,
//                   borderBottomLeftRadius: 8,
//                 }}
//               >
//                 <FilterIcon sx={{ fontSize: 16 }} />
//               </Box>
//               <FormControl fullWidth size="small">
//                 <Select
//                   value={filterMonth}
//                   onChange={(e) => setFilterMonth(e.target.value)}
//                   displayEmpty
//                   sx={{
//                     bgcolor: alpha("#a855f7", 0.05),
//                     borderTopLeftRadius: 0,
//                     borderBottomLeftRadius: 0,
//                     borderTopRightRadius: 8,
//                     borderBottomRightRadius: 8,
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       border: "none",
//                     },
//                   }}
//                 >
//                   <MenuItem value="all">All Months</MenuItem>
//                   {months.map((month) => {
//                     const monthDate = new Date(month + "-01");
//                     const monthName = monthDate.toLocaleString("default", {
//                       month: "long",
//                       year: "numeric",
//                     });
//                     return (
//                       <MenuItem key={month} value={month}>
//                         {monthName}
//                       </MenuItem>
//                     );
//                   })}
//                 </Select>
//               </FormControl>
//             </Box>
//           </Grid>

//           {/* Results Badge */}
//           <Grid item xs={12} md={3}>
//             <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
//               <Chip
//                 icon={<PeopleIcon sx={{ fontSize: 14 }} />}
//                 label={`${totalItems || resultsCount} Results`}
//                 size="medium"
//                 sx={{
//                   bgcolor: "#0f766e",
//                   color: "white",
//                   fontWeight: 600,
//                   fontSize: "0.9rem",
//                   px: 1,
//                   height: 40,
//                   borderRadius: 3,
//                   "& .MuiChip-icon": {
//                     color: "white",
//                   },
//                 }}
//               />
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
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
//         borderColor: alpha("#e2e8f0", 0.5),
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
//                 <SearchIcon sx={{ color: "#0f766e", fontSize: { xs: 18, sm: 20 } }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               borderRadius: { xs: 1.5, sm: 2 },
//               bgcolor: alpha("#0f766e", 0.05),
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
//             borderColor: "#e2e8f0",
//             color: "#64748b",
//             fontSize: { xs: '0.75rem', sm: '0.85rem' },
//             "&:hover": {
//               borderColor: "#0f766e",
//               color: "#0f766e",
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
//             },
//           }}
//         >
//           {months.map((month) => (
//             <MenuItem
//               key={month.value}
//               onClick={() => handleSelect(month.value)}
//               selected={filterMonth === month.value}
//               sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
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
//           bgcolor: alpha("#0f766e", 0.1),
//           color: "#0f766e",
//           fontWeight: 600,
//           px: { xs: 0.5, sm: 1 },
//           fontSize: { xs: '0.65rem', sm: '0.75rem' },
//           height: { xs: 24, sm: 28 },
//           alignSelf: { xs: 'flex-start', sm: 'center' },
//         }}
//       />
//     </Paper>
//   );
// };

// export default SearchFilter;










////////////////////////////// Change Color Theam/////////////////////////////////////
import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Chip,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  filterMonth,
  setFilterMonth,
  resultsCount,
  isMobile,
  isTablet,
  isSmallMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentYear = moment().year();
  const months = [
    { value: "all", label: "All Months" },
    ...Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, "0");
      return {
        value: `${currentYear}-${month}`,
        label: moment(`${currentYear}-${month}`, "YYYY-MM").format("MMMM YYYY"),
      };
    }),
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value) => {
    setFilterMonth(value);
    handleClose();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: { xs: 2, sm: 2.5, md: 3 },
        border: "1px solid",
        borderColor: alpha("#2563EB", 0.1),
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" }, 
        gap: { xs: 1, sm: 1.5 }, 
        flex: 1 
      }}>
        <TextField
          fullWidth
          placeholder={isSmallMobile ? "Search..." : "Search by name, email or plan..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size={isMobile ? "small" : "medium"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#2563EB", fontSize: { xs: 18, sm: 20 } }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: { xs: 1.5, sm: 2 },
              bgcolor: alpha("#2563EB", 0.05),
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
            },
          }}
        />
        
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<FilterIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
          endIcon={<CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />}
          size={isMobile ? "small" : "medium"}
          fullWidth={isMobile}
          sx={{
            minWidth: { xs: '100%', sm: 140 },
            borderColor: alpha("#2563EB", 0.3),
            color: "#2563EB",
            fontSize: { xs: '0.75rem', sm: '0.85rem' },
            "&:hover": {
              borderColor: "#2563EB",
              color: "#2563EB",
              bgcolor: alpha("#2563EB", 0.05),
            },
          }}
        >
          {filterMonth === "all" ? "All Months" : moment(filterMonth).format("MMM YYYY")}
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              maxHeight: 300,
              borderRadius: { xs: 1.5, sm: 2 },
              mt: 1,
              border: "1px solid",
              borderColor: alpha("#2563EB", 0.1),
            },
          }}
        >
          {months.map((month) => (
            <MenuItem
              key={month.value}
              onClick={() => handleSelect(month.value)}
              selected={filterMonth === month.value}
              sx={{ 
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                '&:hover': {
                  bgcolor: alpha("#2563EB", 0.05),
                },
                '&.Mui-selected': {
                  bgcolor: alpha("#2563EB", 0.1),
                  color: "#2563EB",
                  '&:hover': {
                    bgcolor: alpha("#2563EB", 0.15),
                  },
                },
              }}
            >
              {month.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Chip
        label={`${resultsCount} ${resultsCount === 1 ? 'Result' : 'Results'}`}
        size="small"
        sx={{
          bgcolor: alpha("#2563EB", 0.1),
          color: "#2563EB",
          fontWeight: 600,
          px: { xs: 0.5, sm: 1 },
          fontSize: { xs: '0.65rem', sm: '0.75rem' },
          height: { xs: 24, sm: 28 },
          alignSelf: { xs: 'flex-start', sm: 'center' },
          border: "1px solid",
          borderColor: alpha("#2563EB", 0.2),
        }}
      />
    </Paper>
  );
};

export default SearchFilter;