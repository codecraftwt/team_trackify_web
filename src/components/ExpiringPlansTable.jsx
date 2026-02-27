import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Avatar,
  alpha,
  useTheme,
} from "@mui/material";
import {
  People as PeopleIcon,
  Warning as WarningIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const ExpiringPlansTable = ({ data = [] }) => {
  const theme = useTheme();

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Get remaining days badge color
  const getRemainingDaysColor = (days) => {
    if (days <= 0) return "#ef4444";
    if (days <= 7) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #0f766e, #0a5c55)",
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={600} color="white" gutterBottom>
                Users with Expiring Plans
              </Typography>
              <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8) }}>
                Complete list of users whose plans are expiring soon
              </Typography>
            </Box>
            
            <Chip
              label={`${data.length} Results`}
              size="small"
              icon={<PeopleIcon sx={{ fontSize: 14 }} />}
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                fontWeight: 600,
                fontSize: "0.85rem",
                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
            />
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Plan Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Expires At</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Remaining Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {data.length > 0 ? (
                  data.map((user, index) => {
                    const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);
                    const remainingDays = user.remainingDays || 0;

                    return (
                      <TableRow
                        key={user.userId || index}
                        component={motion.tr}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        sx={{
                          "&:hover": {
                            bgcolor: alpha("#0f766e", 0.05),
                          },
                        }}
                      >
                        <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar
                              src={user.userAvatar}
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: alpha("#0f766e", 0.1),
                                color: "#0f766e",
                                fontSize: "0.85rem",
                              }}
                            >
                              {user.userName?.charAt(0) || "U"}
                            </Avatar>
                            <Typography variant="body2" fontWeight={500}>
                              {user.userName || "N/A"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ bgcolor: rowBg }}>{user.userEmail || "N/A"}</TableCell>
                        <TableCell sx={{ bgcolor: rowBg }}>{user.planName || "N/A"}</TableCell>
                        <TableCell sx={{ bgcolor: rowBg }}>{user.planDescription || "N/A"}</TableCell>
                        <TableCell sx={{ bgcolor: rowBg }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <MoneyIcon sx={{ color: "#0f766e", fontSize: 16 }} />
                            <Typography variant="body2" fontWeight={500}>
                              {user.planPrice || "0"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ bgcolor: rowBg }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <EventIcon sx={{ color: "#64748b", fontSize: 14 }} />
                            <Typography variant="body2">
                              {formatDate(user.expiresAt)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ bgcolor: rowBg }}>
                          <Chip
                            label={remainingDays > 0 ? `${remainingDays} Days` : "Expired"}
                            size="small"
                            icon={remainingDays <= 0 ? <WarningIcon sx={{ fontSize: 14 }} /> : undefined}
                            sx={{
                              bgcolor: alpha(getRemainingDaysColor(remainingDays), 0.1),
                              color: getRemainingDaysColor(remainingDays),
                              fontWeight: 600,
                              fontSize: "0.75rem",
                              "& .MuiChip-icon": {
                                color: getRemainingDaysColor(remainingDays),
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                      <Box sx={{ textAlign: "center" }}>
                        <PeopleIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          No users with expiring plans
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          All plans are up to date
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </motion.div>
  );
};

export default ExpiringPlansTable;