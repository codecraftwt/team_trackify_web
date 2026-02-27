// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   IconButton,
//   Tooltip,
//   Chip,
//   MenuItem,
//   Select,
//   FormControl,
//   alpha,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Email as EmailIcon,
//   People as PeopleIcon,
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getContacts,
//   updateContactStatus,
// } from "../../redux/slices/contactSlice";
// import PaginatedTable from "../../components/PaginatedTable";
// import { formatDateDDMMYYYY } from "../../utils/dateFormat";

// const ContactList = () => {
//   const dispatch = useDispatch();
//   const { contacts = [], pagination = {}, loading = false } = useSelector(
//     (state) => state.contact || {}
//   );
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   useEffect(() => {
//     dispatch(
//       getContacts({
//         page: currentPage,
//         limit: itemsPerPage,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//       })
//     );
//   }, [dispatch, currentPage, itemsPerPage, dateRange]);

//   const handleDateChange = (newDateRange) => {
//     setCurrentPage(1);
//     setDateRange(newDateRange);
//   };

//   const handleItemsPerPageChange = (newItemsPerPage) => {
//     setCurrentPage(1);
//     setItemsPerPage(newItemsPerPage);
//   };

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     dispatch(
//       getContacts({
//         page: currentPage,
//         limit: itemsPerPage,
//         fromDate: dateRange.fromDate,
//         toDate: dateRange.toDate,
//       })
//     ).finally(() => {
//       setIsRefreshing(false);
//     });
//   };

//   const handleStatusChange = (contactId, newStatus) => {
//     dispatch(updateContactStatus({ id: contactId, status: newStatus }));
//   };

//   const columns = useMemo(
//     () => [
//       { label: "#", key: "index" },
//       { label: "Name", key: "name" },
//       { label: "Email", key: "email" },
//       { label: "Message", key: "message" },
//       { label: "Status", key: "status" },
//       { label: "Date", key: "date" },
//       { label: "Action", key: "action" },
//     ],
//     []
//   );

//   const rowRender = useCallback(
//     (contact, index, rowBg) => {
//       const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

//       return (
//         <Box
//           component={motion.tr}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.2, delay: index * 0.02 }}
//           sx={{
//             display: "table-row",
//             "&:hover": {
//               bgcolor: alpha("#0f766e", 0.05),
//             },
//           }}
//         >
//           {/* Index */}
//           <TableCell sx={{ bgcolor: rowBg, py: 2 }}>{globalIndex}</TableCell>
          
//           {/* Name */}
//           <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//             <Typography variant="body2" fontWeight={500}>
//               {contact.name}
//             </Typography>
//           </TableCell>
          
//           {/* Email */}
//           <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//             <Typography variant="body2">{contact.email}</Typography>
//           </TableCell>
          
//           {/* Message */}
//           <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//             <Typography
//               variant="body2"
//               sx={{
//                 maxWidth: 250,
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {contact.message}
//             </Typography>
//           </TableCell>
          
//           {/* Status */}
//           <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//             <FormControl size="small" sx={{ minWidth: 113 }}>
//               <Select
//                 value={contact.status || "pending"}
//                 onChange={(e) => handleStatusChange(contact._id, e.target.value)}
//                 sx={{
//                   fontSize: "0.8rem",
//                   bgcolor: "white",
//                   "& .MuiOutlinedInput-notchedOutline": {
//                     borderColor: alpha("#e2e8f0", 0.5),
//                   },
//                   "&:hover .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "#0f766e",
//                   },
//                 }}
//               >
//                 <MenuItem value="pending">Pending</MenuItem>
//                 <MenuItem value="contacted">Contacted</MenuItem>
//                 <MenuItem value="replied">Replied</MenuItem>
//               </Select>
//             </FormControl>
//           </TableCell>
          
//           {/* Date */}
//           <TableCell sx={{ bgcolor: rowBg, py: 2, minWidth: 120 }}>
//             <Typography variant="body2">
//               {formatDateDDMMYYYY(contact.createdAt)}
//             </Typography>
//           </TableCell>
          
//           {/* Action */}
//           <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
//             <Tooltip title="Send Email">
//               <IconButton
//                 component="a"
//                 href={`mailto:${contact.email}`}
//                 size="small"
//                 sx={{
//                   color: "#0f766e",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.1),
//                   },
//                 }}
//               >
//                 <EmailIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </TableCell>
//         </Box>
//       );
//     },
//     [currentPage, itemsPerPage]
//   );

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
//         py: 4,
//         px: { xs: 2, md: 4 },
//       }}
//     >
//       <Container maxWidth="xl">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Header */}
//           <motion.div variants={itemVariants}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//               <Box>
//                 <Typography
//                   variant="h4"
//                   fontWeight="800"
//                   color="#0f766e"
//                   gutterBottom
//                   sx={{
//                     background: "linear-gradient(135deg, #0f766e, #14b8a6)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                   }}
//                 >
//                   Contact List
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Complete list of all contacts
//                 </Typography>
//               </Box>
//               <IconButton
//                 onClick={handleRefresh}
//                 disabled={loading || isRefreshing}
//                 sx={{
//                   bgcolor: alpha("#0f766e", 0.1),
//                   color: "#0f766e",
//                   "&:hover": {
//                     bgcolor: alpha("#0f766e", 0.2),
//                   },
//                 }}
//               >
//                 <RefreshIcon sx={{ animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
//               </IconButton>
//             </Box>
//           </motion.div>

//           {/* Table */}
//           <motion.div variants={itemVariants}>
//             <PaginatedTable
//               title="Contact List"
//               subtitle="Complete list of all contacts"
//               icon={<PeopleIcon />}
//               columns={columns}
//               data={contacts}
//               totalPages={pagination.totalPages || 1}
//               totalCount={pagination.totalContacts || 0}
//               currentPage={currentPage}
//               onPageChange={setCurrentPage}
//               loading={loading}
//               rowRender={rowRender}
//               showDateFilter={true}
//               onDateChange={handleDateChange}
//               currentDateRange={dateRange}
//               itemsPerPage={itemsPerPage}
//               onItemsPerPageChange={handleItemsPerPageChange}
//             />
//           </motion.div>
//         </motion.div>
//       </Container>

//       <style>
//         {`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// // TableCell component helper (since it's not imported)
// const TableCell = ({ children, sx, ...props }) => (
//   <Box
//     component="td"
//     sx={{
//       padding: "16px",
//       borderBottom: "1px solid",
//       borderColor: alpha("#e2e8f0", 0.5),
//       ...sx,
//     }}
//     {...props}
//   >
//     {children}
//   </Box>
// );

// export default ContactList;






import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  MenuItem,
  Select,
  FormControl,
  alpha,
  Paper,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Email as EmailIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getContacts,
  updateContactStatus,
} from "../../redux/slices/contactSlice";
import PaginatedTable from "../../components/PaginatedTable";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";

const ContactList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  const { contacts = [], pagination = {}, loading = false } = useSelector(
    (state) => state.contact || {}
  );
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(
      getContacts({
        page: currentPage,
        limit: itemsPerPage,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    );
  }, [dispatch, currentPage, itemsPerPage, dateRange]);

  const handleDateChange = (newDateRange) => {
    setCurrentPage(1);
    setDateRange(newDateRange);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setCurrentPage(1);
    setItemsPerPage(newItemsPerPage);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      getContacts({
        page: currentPage,
        limit: itemsPerPage,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    ).finally(() => {
      setIsRefreshing(false);
    });
  };

  const handleStatusChange = (contactId, newStatus) => {
    dispatch(updateContactStatus({ id: contactId, status: newStatus }));
  };

  const columns = useMemo(
    () => [
      { label: "#", key: "index" },
      { label: "Name", key: "name" },
      { label: "Email", key: "email" },
      { label: "Message", key: "message" },
      { label: "Status", key: "status" },
      { label: "Date", key: "date" },
      { label: "Action", key: "action" },
    ],
    []
  );

  // Mobile Card View Component
  const MobileCardView = ({ contacts, currentPage, itemsPerPage }) => {
    return (
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        {contacts.map((contact, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
          
          return (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  mb: 2,
                  borderRadius: { xs: 2, sm: 2.5, md: 3 },
                  border: "1px solid",
                  borderColor: alpha("#e2e8f0", 0.5),
                  bgcolor: index % 2 === 0 ? "#fff" : alpha("#f8fafc", 0.5),
                }}
              >
                {/* Header with Index and Status */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  mb: 1.5,
                  flexWrap: "wrap",
                  gap: 1
                }}>
                  <Chip
                    label={`#${globalIndex}`}
                    size="small"
                    sx={{
                      bgcolor: alpha("#0f766e", 0.1),
                      color: "#0f766e",
                      fontWeight: 600,
                      fontSize: { xs: '0.6rem', sm: '0.65rem' },
                      height: { xs: 20, sm: 22 },
                    }}
                  />
                  <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100 } }}>
                    <Select
                      value={contact.status || "pending"}
                      onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                      sx={{
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        height: { xs: 24, sm: 28 },
                        bgcolor: "white",
                      }}
                    >
                      <MenuItem value="pending" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Pending</MenuItem>
                      <MenuItem value="contacted" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Contacted</MenuItem>
                      <MenuItem value="replied" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>Replied</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Name and Email */}
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    variant="subtitle2" 
                    fontWeight={600} 
                    sx={{ 
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      mb: 0.25,
                      wordBreak: 'break-word'
                    }}
                  >
                    {contact.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: { xs: '0.65rem', sm: '0.7rem' },
                      display: 'block',
                      wordBreak: 'break-all'
                    }}
                  >
                    {contact.email}
                  </Typography>
                </Box>

                {/* Message */}
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: { xs: '0.55rem', sm: '0.6rem' }, 
                      display: 'block', 
                      mb: 0.5,
                      fontWeight: 500
                    }}
                  >
                    Message
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      bgcolor: alpha("#f1f5f9", 0.5),
                      borderRadius: 1,
                      maxHeight: 100,
                      overflow: 'auto',
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        wordBreak: 'break-word'
                      }}
                    >
                      {contact.message}
                    </Typography>
                  </Paper>
                </Box>

                {/* Footer with Date and Action */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  mt: 1,
                  pt: 1,
                  borderTop: "1px dashed",
                  borderColor: alpha("#e2e8f0", 0.5),
                }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: { xs: '0.55rem', sm: '0.6rem' },
                      fontWeight: 500
                    }}
                  >
                    {formatDateDDMMYYYY(contact.createdAt)}
                  </Typography>
                  <Tooltip title="Send Email">
                    <IconButton
                      component="a"
                      href={`mailto:${contact.email}`}
                      size="small"
                      sx={{
                        color: "#0f766e",
                        bgcolor: alpha("#0f766e", 0.1),
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        "&:hover": {
                          bgcolor: alpha("#0f766e", 0.2),
                        },
                      }}
                    >
                      <EmailIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
      </Box>
    );
  };

  // Row render for table view
  const rowRender = useCallback(
    (contact, index, rowBg) => {
      const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

      return (
        <Box
          component={motion.tr}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
          sx={{
            display: "table-row",
            "&:hover": {
              bgcolor: alpha("#0f766e", 0.05),
            },
          }}
        >
          {/* Index */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' } }}>
              {globalIndex}
            </Typography>
          </TableCell>
          
          {/* Name */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
            <Typography 
              variant="body2" 
              fontWeight={500} 
              sx={{ 
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                whiteSpace: 'nowrap'
              }}
            >
              {contact.name}
            </Typography>
          </TableCell>
          
          {/* Email */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                whiteSpace: 'nowrap'
              }}
            >
              {contact.email}
            </Typography>
          </TableCell>
          
          {/* Message */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: { xs: 100, sm: 150, md: 200, lg: 250 },
                fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {contact.message}
            </Typography>
          </TableCell>
          
          {/* Status */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
            <FormControl size="small" sx={{ minWidth: { xs: 90, sm: 100, md: 113 } }}>
              <Select
                value={contact.status || "pending"}
                onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                sx={{
                  fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.8rem' },
                  height: { xs: 24, sm: 28, md: 32 },
                  bgcolor: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha("#e2e8f0", 0.5),
                  },
                }}
              >
                <MenuItem value="pending" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Pending</MenuItem>
                <MenuItem value="contacted" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Contacted</MenuItem>
                <MenuItem value="replied" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}>Replied</MenuItem>
              </Select>
            </FormControl>
          </TableCell>
          
          {/* Date */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 }, minWidth: { xs: 80, sm: 100, md: 120 } }}>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.8rem' } }}>
              {formatDateDDMMYYYY(contact.createdAt)}
            </Typography>
          </TableCell>
          
          {/* Action */}
          <TableCell sx={{ bgcolor: rowBg, py: { xs: 1, sm: 1.5, md: 2 } }}>
            <Tooltip title="Send Email">
              <IconButton
                component="a"
                href={`mailto:${contact.email}`}
                size="small"
                sx={{
                  color: "#0f766e",
                  bgcolor: alpha("#0f766e", 0.1),
                  width: { xs: 24, sm: 28, md: 32 },
                  height: { xs: 24, sm: 28, md: 32 },
                  "&:hover": {
                    bgcolor: alpha("#0f766e", 0.2),
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
              </IconButton>
            </Tooltip>
          </TableCell>
        </Box>
      );
    },
    [currentPage, itemsPerPage]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 4 },
      }}
    >
      <Container 
        maxWidth="xl" 
        disableGutters={isMobile}
        sx={{ px: { xs: 1, sm: 2, md: 3 } }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: "space-between", 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              mb: { xs: 2, sm: 3, md: 4 },
              gap: { xs: 1.5, sm: 2 }
            }}>
              <Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  fontWeight="800"
                  color="#0f766e"
                  gutterBottom
                  sx={{
                    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                  }}
                >
                  Contact List
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' }
                  }}
                >
                  Complete list of all contacts
                </Typography>
              </Box>
              <IconButton
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
                size={isMobile ? "small" : "medium"}
                sx={{
                  bgcolor: alpha("#0f766e", 0.1),
                  color: "#0f766e",
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  "&:hover": {
                    bgcolor: alpha("#0f766e", 0.2),
                  },
                }}
              >
                <RefreshIcon sx={{ 
                  animation: isRefreshing ? "spin 1s linear infinite" : "none",
                  fontSize: { xs: 18, sm: 20, md: 24 }
                }} />
              </IconButton>
            </Box>
          </motion.div>

          {/* Table/Card View */}
          <motion.div variants={itemVariants}>
            <PaginatedTable
              title="Contact List"
              subtitle="Complete list of all contacts"
              icon={<PeopleIcon />}
              columns={columns}
              data={contacts}
              totalPages={pagination.totalPages || 1}
              totalCount={pagination.totalContacts || 0}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              loading={loading}
              rowRender={!isMobile ? rowRender : undefined}
              mobileCardRender={isMobile ? (contact, index) => {
                return (
                  <MobileCardView 
                    contacts={[contact]} 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage}
                  />
                );
              } : undefined}
              showDateFilter={true}
              onDateChange={handleDateChange}
              currentDateRange={dateRange}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </motion.div>
        </motion.div>
      </Container>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

// TableCell component helper
const TableCell = ({ children, sx, ...props }) => (
  <Box
    component="td"
    sx={{
      padding: { xs: "8px", sm: "12px", md: "16px" },
      borderBottom: "1px solid",
      borderColor: alpha("#e2e8f0", 0.5),
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

export default ContactList;

