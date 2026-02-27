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
          <TableCell sx={{ bgcolor: rowBg, py: 2 }}>{globalIndex}</TableCell>
          
          {/* Name */}
          <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
            <Typography variant="body2" fontWeight={500}>
              {contact.name}
            </Typography>
          </TableCell>
          
          {/* Email */}
          <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
            <Typography variant="body2">{contact.email}</Typography>
          </TableCell>
          
          {/* Message */}
          <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 250,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {contact.message}
            </Typography>
          </TableCell>
          
          {/* Status */}
          <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
            <FormControl size="small" sx={{ minWidth: 113 }}>
              <Select
                value={contact.status || "pending"}
                onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                sx={{
                  fontSize: "0.8rem",
                  bgcolor: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha("#e2e8f0", 0.5),
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#0f766e",
                  },
                }}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="contacted">Contacted</MenuItem>
                <MenuItem value="replied">Replied</MenuItem>
              </Select>
            </FormControl>
          </TableCell>
          
          {/* Date */}
          <TableCell sx={{ bgcolor: rowBg, py: 2, minWidth: 120 }}>
            <Typography variant="body2">
              {formatDateDDMMYYYY(contact.createdAt)}
            </Typography>
          </TableCell>
          
          {/* Action */}
          <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
            <Tooltip title="Send Email">
              <IconButton
                component="a"
                href={`mailto:${contact.email}`}
                size="small"
                sx={{
                  color: "#0f766e",
                  "&:hover": {
                    bgcolor: alpha("#0f766e", 0.1),
                  },
                }}
              >
                <EmailIcon fontSize="small" />
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
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="800"
                  color="#0f766e"
                  gutterBottom
                  sx={{
                    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Contact List
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete list of all contacts
                </Typography>
              </Box>
              <IconButton
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
                sx={{
                  bgcolor: alpha("#0f766e", 0.1),
                  color: "#0f766e",
                  "&:hover": {
                    bgcolor: alpha("#0f766e", 0.2),
                  },
                }}
              >
                <RefreshIcon sx={{ animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
              </IconButton>
            </Box>
          </motion.div>

          {/* Table */}
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
              rowRender={rowRender}
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

// TableCell component helper (since it's not imported)
const TableCell = ({ children, sx, ...props }) => (
  <Box
    component="td"
    sx={{
      padding: "16px",
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