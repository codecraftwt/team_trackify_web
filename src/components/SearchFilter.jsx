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
  useTheme,
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
  const theme = useTheme();
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
        p: { xs: 1.2, sm: 1.5 },
        borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
        border: "1px solid",
        borderColor: alpha(theme.palette.primary.main, 0.1),
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 1.2, sm: 1.5 },
      }}
    >
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" }, 
        gap: { xs: 1, sm: 1.2 }, 
        flex: 1 
      }}>
        <TextField
          fullWidth
          placeholder={isSmallMobile ? "Search..." : "Search by name, email or plan..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              height: 36,
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
            },
          }}
        />
        
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<FilterIcon sx={{ fontSize: 14 }} />}
          endIcon={<CalendarIcon sx={{ fontSize: 14 }} />}
          size="small"
          fullWidth={isMobile}
          sx={{
            minWidth: { xs: '100%', sm: 120 },
            borderColor: alpha(theme.palette.primary.main, 0.3),
            color: theme.palette.primary.main,
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            height: 36,
            "&:hover": {
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          {filterMonth === "all" ? "Months" : moment(filterMonth).format("MMM YYYY")}
        </Button>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              maxHeight: 260,
              borderRadius: 1.5,
              mt: 1,
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          {months.map((month) => (
            <MenuItem
              key={month.value}
              onClick={() => handleSelect(month.value)}
              selected={filterMonth === month.value}
              sx={{ 
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
                py: 0.8,
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
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
        label={`${resultsCount}`}
        size="small"
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          fontWeight: 600,
          px: 0.5,
          fontSize: { xs: '0.6rem', sm: '0.65rem' },
          height: { xs: 22, sm: 24 },
          alignSelf: { xs: 'flex-start', sm: 'center' },
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.2),
        }}
      />
    </Paper>
  );
};

export default SearchFilter;