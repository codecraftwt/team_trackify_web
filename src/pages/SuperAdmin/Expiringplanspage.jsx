// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Chip,
//   Avatar,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Button,
//   alpha,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   ArrowBack as ArrowBackIcon,
//   Refresh as RefreshIcon,
//   Warning as WarningIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import moment from "moment";
// import { getUsersWithExpiringPlans } from "../../redux/slices/planSlice";

// const ExpiringPlansPage = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isSmallMobile = useMediaQuery("(max-width:400px)");

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(25);
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState([]);

//   // Get data from Redux store or use local state
//   const expiringUsers = useSelector((state) => state.plan?.expiringUsers || []);

//   // Transform API data to match component expectations
//   const transformUserData = (apiUser) => {
//     return {
//       _id: apiUser.userId,
//       name: apiUser.userName || "",
//       email: apiUser.userEmail || "",
//       avtar: "", // API doesn't provide avatar
//       mobile_no: apiUser.userMobileNo || "",
//       currentPaymentId: {
//         planId: apiUser.planId || "",
//         planName: apiUser.planName || "",
//         description: apiUser.planDescription || "",
//         amount: apiUser.planPrice || 0,
//         maxUser: apiUser.planName?.includes("Premium") ? 20 : 10, // Infer from plan name
//         minUser: apiUser.planName?.includes("Premium") ? 1 : 1,
//         expiresAt: apiUser.expiresAt || "",
//       },
//       remainingDays: apiUser.remainingDays || 0,
//     };
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const result = await dispatch(getUsersWithExpiringPlans(365)); // Fetch users expiring in next year
//         if (result.payload && result.payload.data) {
//           // Transform the data from the API response
//           const transformedUsers = result.payload.data.map(user => transformUserData(user));
//           setUsers(transformedUsers);
//         }
//       } catch (error) {
//         console.error("Error fetching expiring users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [dispatch]);

//   const getDaysLeft = (expiresAt) => {
//     if (!expiresAt) return 0;
//     return moment(expiresAt).diff(moment(), "days");
//   };

//   const getStatusChip = (expiresAt) => {
//     const days = getDaysLeft(expiresAt);
//     if (days < 0) return { label: "Expired", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
//     if (days <= 3) return { label: `${days}d left`, color: "#f97316", bg: alpha("#f97316", 0.1) };
//     if (days <= 7) return { label: `${days}d left`, color: "#eab308", bg: alpha("#eab308", 0.1) };
//     if (days <= 15) return { label: `${days}d left`, color: "#3b82f6", bg: alpha("#3b82f6", 0.1) };
//     if (days <= 30) return { label: `${days}d left`, color: "#22c55e", bg: alpha("#22c55e", 0.1) };
//     return { label: `${days}d left`, color: "#6b7280", bg: alpha("#6b7280", 0.1) };
//   };

//   // Filter users based on search
//   const filtered = users.filter((user) => {
//     if (!user) return false;
//     const searchLower = search.toLowerCase();
//     return (
//       user?.name?.toLowerCase().includes(searchLower) ||
//       user?.email?.toLowerCase().includes(searchLower) ||
//       user?.currentPaymentId?.planName?.toLowerCase().includes(searchLower) ||
//       user?.mobile_no?.toLowerCase().includes(searchLower)
//     );
//   });

//   // Sort by expiry date (closest first - including expired ones)
//   const sortedUsers = [...filtered].sort((a, b) => {
//     const dateA = new Date(a?.currentPaymentId?.expiresAt || 0);
//     const dateB = new Date(b?.currentPaymentId?.expiresAt || 0);
//     return dateA - dateB;
//   });

//   const paginated = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const columns = ["#", "User", "Email", "Phone", "Plan", "Price", "Expires", "Days Left", "Status"];

//   // Calculate stats
//   const totalUsers = users.length;
//   const expiredCount = users.filter(u => getDaysLeft(u?.currentPaymentId?.expiresAt) < 0).length;
//   const expiringSoonCount = users.filter(u => {
//     const days = getDaysLeft(u?.currentPaymentId?.expiresAt);
//     return days >= 0 && days <= 7;
//   }).length;

//   // Format phone number
//   const formatPhone = (phone) => {
//     if (!phone) return "—";
//     const phoneStr = String(phone).replace(/\D/g, '');
//     if (phoneStr.length === 10) {
//       return `${phoneStr.slice(0, 3)}-${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
//     }
//     return phone;
//   };

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (!amount) return "—";
//     return `₹${amount.toLocaleString()}`;
//   };

//   return (
//     <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>

//       {/* Header */}
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <IconButton
//             size="small"
//             onClick={() => navigate(-1)}
//             sx={{
//               bgcolor: alpha(theme.palette.primary.main, 0.1),
//               color: theme.palette.primary.main,
//               width: 30,
//               height: 30,
//               "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
//             }}
//           >
//             <ArrowBackIcon sx={{ fontSize: 16 }} />
//           </IconButton>
//           <Box>
//             <Typography
//               fontWeight={700}
//               sx={{
//                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" },
//               }}
//             >
//               Expiring Plans
//             </Typography>
//             <Typography sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
//               All users with expiring or expired plans
//             </Typography>
//           </Box>
//         </Box>

//         <IconButton
//           size="small"
//           onClick={async () => {
//             setLoading(true);
//             try {
//               const result = await dispatch(getUsersWithExpiringPlans(365));
//               if (result.payload && result.payload.data) {
//                 const transformedUsers = result.payload.data.map(user => transformUserData(user));
//                 setUsers(transformedUsers);
//               }
//             } catch (error) {
//               console.error("Error refreshing data:", error);
//             } finally {
//               setLoading(false);
//             }
//           }}
//           sx={{
//             color: theme.palette.primary.main,
//             width: 30,
//             height: 30,
//             "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//           }}
//         >
//           <RefreshIcon sx={{ fontSize: 16 }} />
//         </IconButton>
//       </Box>

//       {/* Search + Stats */}
//       <Box sx={{ display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
//         <TextField
//           placeholder="Search name, email, phone or plan..."
//           value={search}
//           onChange={(e) => { setSearch(e.target.value); setPage(0); }}
//           size="small"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             flex: 1,
//             minWidth: 180,
//             "& .MuiOutlinedInput-root": {
//               height: 34,
//               fontSize: "0.7rem",
//               borderRadius: 2,
//               bgcolor: alpha(theme.palette.primary.main, 0.04),
//               '&:hover fieldset': {
//                 borderColor: theme.palette.primary.main,
//               },
//             },
//           }}
//         />

//         {/* Summary chips */}
//         {[
//           { label: "Total", count: totalUsers, color: theme.palette.primary.main },
//           { label: "Expired", count: expiredCount, color: "#ef4444" },
//           { label: "≤7 days", count: expiringSoonCount, color: "#eab308" },
//         ].map((s) => (
//           <Chip
//             key={s.label}
//             label={`${s.label}: ${s.count}`}
//             size="small"
//             sx={{
//               bgcolor: alpha(s.color, 0.1),
//               color: s.color,
//               fontWeight: 600,
//               fontSize: "0.58rem",
//               height: 22,
//               border: `1px solid ${alpha(s.color, 0.2)}`,
//             }}
//           />
//         ))}
//       </Box>

//       {/* Table */}
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: 2.5,
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           overflow: "hidden",
//         }}
//       >
//         {/* Table header bar */}
//         <Box
//           sx={{
//             px: 1.5,
//             py: 0.8,
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             display: "flex",
//             alignItems: "center",
//             gap: 0.8,
//           }}
//         >
//           <WarningIcon sx={{ fontSize: "0.8rem", color: "#fbbf24" }} />
//           <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "white" }}>
//             {filtered.length} user{filtered.length !== 1 ? "s" : ""} found
//           </Typography>
//         </Box>

//         <TableContainer sx={{
//           overflowX: "auto",
//           "&::-webkit-scrollbar": { height: "4px" },
//           "&::-webkit-scrollbar-thumb": { backgroundColor: alpha(theme.palette.primary.main, 0.3), borderRadius: "2px" },
//         }}>
//           <Table sx={{ minWidth: isSmallMobile ? 700 : isMobile ? 800 : 900 }}>
//             <TableHead>
//               <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col}
//                     sx={{
//                       fontSize: "0.62rem",
//                       fontWeight: 700,
//                       color: theme.palette.primary.main,
//                       py: 1,
//                       px: 1.2,
//                       whiteSpace: "nowrap",
//                       borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                     }}
//                   >
//                     {col}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from({ length: 8 }).map((_, i) => (
//                   <TableRow key={i}>
//                     {columns.map((col) => (
//                       <TableCell key={col} sx={{ py: 0.8, px: 1.2 }}>
//                         <Skeleton variant="text" height={14} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }} />
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : paginated.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
//                     <Typography color="text.secondary" sx={{ fontSize: "0.75rem" }}>
//                       No users found
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 paginated.map((user, index) => {
//                   const status = getStatusChip(user?.currentPaymentId?.expiresAt);
//                   const days = getDaysLeft(user?.currentPaymentId?.expiresAt);

//                   return (
//                     <motion.tr
//                       key={user._id || index}
//                       initial={{ opacity: 0, y: 6 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.03 }}
//                       style={{
//                         backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
//                       }}
//                       onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05); }}
//                       onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02); }}
//                     >
//                       <TableCell sx={{ fontSize: "0.58rem", py: 0.8, px: 1.2, color: "text.secondary" }}>
//                         {page * rowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ py: 0.8, px: 1.2 }}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
//                           <Avatar
//                             sx={{
//                               width: 26,
//                               height: 26,
//                               fontSize: "0.6rem",
//                               bgcolor: alpha(theme.palette.primary.main, 0.1),
//                               color: theme.palette.primary.main,
//                             }}
//                           >
//                             {user?.name?.charAt(0) || "U"}
//                           </Avatar>
//                           <Typography sx={{ fontSize: "0.62rem", fontWeight: 600, whiteSpace: "nowrap" }}>
//                             {user?.name || "—"}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.58rem", py: 0.8, px: 1.2, color: "text.secondary", whiteSpace: "nowrap" }}>
//                         {user?.email || "—"}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.58rem", py: 0.8, px: 1.2, color: "text.secondary", whiteSpace: "nowrap" }}>
//                         {formatPhone(user?.mobile_no)}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.58rem", py: 0.8, px: 1.2, whiteSpace: "nowrap", fontWeight: 500 }}>
//                         {user?.currentPaymentId?.planName || "—"}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.58rem", py: 0.8, px: 1.2, color: "success.main", fontWeight: 600 }}>
//                         {formatCurrency(user?.currentPaymentId?.amount)}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.58rem", py: 0.8, px: 1.2, whiteSpace: "nowrap", color: "text.secondary" }}>
//                         {user?.currentPaymentId?.expiresAt
//                           ? moment(user.currentPaymentId.expiresAt).format("DD MMM YYYY")
//                           : "—"}
//                       </TableCell>
//                       <TableCell sx={{ fontSize: "0.58rem", py: 0.8, px: 1.2, color: days < 0 ? "#ef4444" : "text.primary", fontWeight: 600 }}>
//                         {days < 0 ? `${Math.abs(days)}d ago` : `${days}d`}
//                       </TableCell>
//                       <TableCell sx={{ py: 0.8, px: 1.2 }}>
//                         <Chip
//                           label={status.label}
//                           size="small"
//                           sx={{
//                             bgcolor: status.bg,
//                             color: status.color,
//                             fontWeight: 600,
//                             fontSize: "0.5rem",
//                             height: 16,
//                             border: `1px solid ${alpha(status.color, 0.3)}`,
//                           }}
//                         />
//                       </TableCell>
//                     </motion.tr>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Pagination */}
//         <TablePagination
//           component="div"
//           count={filtered.length}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           rowsPerPageOptions={[10, 25, 50, 100]}
//           sx={{
//             borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
//               fontSize: "0.62rem",
//             },
//             "& .MuiTablePagination-select": { fontSize: "0.62rem" },
//           }}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default ExpiringPlansPage;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  alpha,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import moment from "moment";
import { getUsersWithExpiringPlans } from "../../redux/slices/planSlice";

const ExpiringPlansPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallMobile = useMediaQuery("(max-width:400px)");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // Get data from Redux store or use local state
  const expiringUsers = useSelector((state) => state.plan?.expiringUsers || []);

  // Transform API data to match component expectations
  const transformUserData = (apiUser) => {
    return {
      _id: apiUser.userId,
      name: apiUser.userName || "",
      email: apiUser.userEmail || "",
      avtar: "", // API doesn't provide avatar
      mobile_no: apiUser.userMobileNo || "",
      currentPaymentId: {
        planId: apiUser.planId || "",
        planName: apiUser.planName || "",
        description: apiUser.planDescription || "",
        amount: apiUser.planPrice || 0,
        maxUser: apiUser.planName?.includes("Premium") ? 20 : 10, // Infer from plan name
        minUser: apiUser.planName?.includes("Premium") ? 1 : 1,
        expiresAt: apiUser.expiresAt || "",
      },
      remainingDays: apiUser.remainingDays || 0,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await dispatch(getUsersWithExpiringPlans(365)); // Fetch users expiring in next year
        if (result.payload && result.payload.data) {
          // Transform the data from the API response
          const transformedUsers = result.payload.data.map(user => transformUserData(user));
          setUsers(transformedUsers);
        }
      } catch (error) {
        console.error("Error fetching expiring users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const getDaysLeft = (expiresAt) => {
    if (!expiresAt) return 0;
    return moment(expiresAt).diff(moment(), "days");
  };

  const getStatusChip = (expiresAt) => {
    const days = getDaysLeft(expiresAt);
    if (days < 0) return { label: "Expired", color: "#ef4444", bg: alpha("#ef4444", 0.1) };
    if (days <= 3) return { label: `${days}d left`, color: "#f97316", bg: alpha("#f97316", 0.1) };
    if (days <= 7) return { label: `${days}d left`, color: "#eab308", bg: alpha("#eab308", 0.1) };
    if (days <= 15) return { label: `${days}d left`, color: "#3b82f6", bg: alpha("#3b82f6", 0.1) };
    if (days <= 30) return { label: `${days}d left`, color: "#22c55e", bg: alpha("#22c55e", 0.1) };
    return { label: `${days}d left`, color: "#6b7280", bg: alpha("#6b7280", 0.1) };
  };

  // Filter users based on search
  const filtered = users.filter((user) => {
    if (!user) return false;
    const searchLower = search.toLowerCase();
    return (
      user?.name?.toLowerCase().includes(searchLower) ||
      user?.email?.toLowerCase().includes(searchLower) ||
      user?.currentPaymentId?.planName?.toLowerCase().includes(searchLower) ||
      user?.mobile_no?.toLowerCase().includes(searchLower)
    );
  });

  // Sort by expiry date (closest first - including expired ones)
  const sortedUsers = [...filtered].sort((a, b) => {
    const dateA = new Date(a?.currentPaymentId?.expiresAt || 0);
    const dateB = new Date(b?.currentPaymentId?.expiresAt || 0);
    return dateA - dateB;
  });

  const paginated = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const columns = ["#", "User", "Email", "Phone", "Plan", "Price", "Expires", "Days Left", "Status"];

  // Calculate stats
  const totalUsers = users.length;
  const expiredCount = users.filter(u => getDaysLeft(u?.currentPaymentId?.expiresAt) < 0).length;
  const expiringSoonCount = users.filter(u => {
    const days = getDaysLeft(u?.currentPaymentId?.expiresAt);
    return days >= 0 && days <= 7;
  }).length;

  // Format phone number
  const formatPhone = (phone) => {
    if (!phone) return "—";
    const phoneStr = String(phone).replace(/\D/g, '');
    if (phoneStr.length === 10) {
      return `${phoneStr.slice(0, 3)}-${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
    }
    return phone;
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return "—";
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            size="medium"
            onClick={() => navigate(-1)}
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              width: 36,
              height: 36,
              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Box>
            <Typography
              fontWeight={700}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              }}
            >
              Expiring Plans
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "text.secondary", mt: 0.25 }}>
              All users with expiring or expired plans
            </Typography>
          </Box>
        </Box>

        <IconButton
          size="medium"
          onClick={async () => {
            setLoading(true);
            try {
              const result = await dispatch(getUsersWithExpiringPlans(365));
              if (result.payload && result.payload.data) {
                const transformedUsers = result.payload.data.map(user => transformUserData(user));
                setUsers(transformedUsers);
              }
            } catch (error) {
              console.error("Error refreshing data:", error);
            } finally {
              setLoading(false);
            }
          }}
          sx={{
            color: theme.palette.primary.main,
            width: 36,
            height: 36,
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
          }}
        >
          <RefreshIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Search + Stats */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          placeholder="Search name, email, phone or plan..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            minWidth: 220,
            "& .MuiOutlinedInput-root": {
              height: 40,
              fontSize: "0.85rem",
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />

        {/* Summary chips */}
        {[
          { label: "Total", count: totalUsers, color: theme.palette.primary.main },
          { label: "Expired", count: expiredCount, color: "#ef4444" },
          { label: "≤7 days", count: expiringSoonCount, color: "#eab308" },
        ].map((s) => (
          <Chip
            key={s.label}
            label={`${s.label}: ${s.count}`}
            size="small"
            sx={{
              bgcolor: alpha(s.color, 0.1),
              color: s.color,
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 28,
              px: 0.5,
              border: `1px solid ${alpha(s.color, 0.2)}`,
            }}
          />
        ))}
      </Box>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2.5,
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          overflow: "hidden",
        }}
      >
        {/* Table header bar */}
        <Box
          sx={{
            px: 2,
            py: 1,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <WarningIcon sx={{ fontSize: "1rem", color: "#fbbf24" }} />
          <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "white" }}>
            {filtered.length} user{filtered.length !== 1 ? "s" : ""} found
          </Typography>
        </Box>

        <TableContainer sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": { height: "6px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: alpha(theme.palette.primary.main, 0.3), borderRadius: "3px" },
        }}>
          <Table sx={{ minWidth: isSmallMobile ? 800 : isMobile ? 900 : 1000 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      py: 1.5,
                      px: 1.5,
                      whiteSpace: "nowrap",
                      borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col} sx={{ py: 1.2, px: 1.5 }}>
                        <Skeleton variant="text" height={18} sx={{ bgcolor: alpha(theme.palette.primary.main, 0.08) }} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((user, index) => {
                  const status = getStatusChip(user?.currentPaymentId?.expiresAt);
                  const days = getDaysLeft(user?.currentPaymentId?.expiresAt);

                  return (
                    <motion.tr
                      key={user._id || index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      style={{
                        backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02),
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = alpha(theme.palette.primary.main, 0.05); }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = index % 2 === 0 ? "transparent" : alpha(theme.palette.primary.main, 0.02); }}
                    >
                      <TableCell sx={{ fontSize: "0.7rem", py: 1.2, px: 1.5, color: "text.secondary" }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ py: 1.2, px: 1.5 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              fontSize: "0.75rem",
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                            }}
                          >
                            {user?.name?.charAt(0) || "U"}
                          </Avatar>
                          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                            {user?.name || "—"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.7rem", py: 1.2, px: 1.5, color: "text.secondary", whiteSpace: "nowrap" }}>
                        {user?.email || "—"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.7rem", py: 1.2, px: 1.5, color: "text.secondary", whiteSpace: "nowrap" }}>
                        {formatPhone(user?.mobile_no)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.7rem", py: 1.2, px: 1.5, whiteSpace: "nowrap", fontWeight: 500 }}>
                        {user?.currentPaymentId?.planName || "—"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.7rem", py: 1.2, px: 1.5, color: "success.main", fontWeight: 600 }}>
                        {formatCurrency(user?.currentPaymentId?.amount)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.7rem", py: 1.2, px: 1.5, whiteSpace: "nowrap", color: "text.secondary" }}>
                        {user?.currentPaymentId?.expiresAt
                          ? moment(user.currentPaymentId.expiresAt).format("DD MMM YYYY")
                          : "—"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.7rem", py: 1.2, px: 1.5, color: days < 0 ? "#ef4444" : "text.primary", fontWeight: 600 }}>
                        {days < 0 ? `${Math.abs(days)}d ago` : `${days}d`}
                      </TableCell>
                      <TableCell sx={{ py: 1.2, px: 1.5 }}>
                        <Chip
                          label={status.label}
                          size="small"
                          sx={{
                            bgcolor: status.bg,
                            color: status.color,
                            fontWeight: 600,
                            fontSize: "0.6rem",
                            height: 22,
                            border: `1px solid ${alpha(status.color, 0.3)}`,
                          }}
                        />
                      </TableCell>
                    </motion.tr>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: "0.75rem",
            },
            "& .MuiTablePagination-select": { fontSize: "0.75rem" },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ExpiringPlansPage;