import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Tab,
  Tabs,
  CircularProgress,
  alpha,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CalendarToday as CalendarIcon,
  ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { formatDateDDMMYYYY } from "../../utils/dateFormat";

// TabPanel component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
}

// Mobile Card View Component
const UserCard = ({ user, onCardClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          mb: 2,
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 10px 30px -10px rgba(15, 118, 110, 0.2)",
            borderColor: "#0f766e",
          },
        }}
        onClick={() => onCardClick(user)}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              src={user.avtar}
              sx={{
                width: 56,
                height: 56,
                bgcolor: alpha("#0f766e", 0.1),
                color: "#0f766e",
                border: "2px solid",
                borderColor: alpha("#0f766e", 0.2),
              }}
            >
              {user.name?.charAt(0) || <PersonIcon />}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600} color="#1e293b">
                {user.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Chip
                  icon={user.isActive ? <ActiveIcon sx={{ fontSize: 14 }} /> : <InactiveIcon sx={{ fontSize: 14 }} />}
                  label={user.isActive ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
                    color: user.isActive ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    height: 20,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Stack spacing={1.5}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: "#64748b", fontSize: 18 }} />
              <Typography variant="body2">{user.email}</Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "#64748b", fontSize: 18 }} />
              <Typography variant="body2">{user.mobile_no || "—"}</Typography>
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HomeIcon sx={{ color: "#64748b", fontSize: 18 }} />
              <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                {user.address || "—"}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarIcon sx={{ color: "#64748b", fontSize: 16 }} />
                <Typography variant="caption" color="text.secondary">
                  Created: {formatDateDDMMYYYY(user.createdAt)}
                </Typography>
              </Box>
              <Tooltip title="View Tracking">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(user);
                  }}
                  sx={{
                    color: "#0f766e",
                    "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
                  }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Desktop Table View Component
const UserTable = ({ users, onRowClick }) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>#</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Profile</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Mobile</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Created</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Updated</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: "0.7rem", md: "0.85rem" } }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={user._id}
              hover
              onClick={() => onRowClick(user)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  bgcolor: alpha("#0f766e", 0.05),
                },
              }}
            >
              <TableCell align="center" sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" } }}>
                {index + 1}
              </TableCell>
              <TableCell>
                <Avatar
                  src={user.avtar}
                  sx={{
                    width: { xs: 32, md: 40 },
                    height: { xs: 32, md: 40 },
                    bgcolor: alpha("#0f766e", 0.1),
                    color: "#0f766e",
                    border: "2px solid",
                    borderColor: alpha("#0f766e", 0.2),
                  }}
                >
                  {user.name?.charAt(0) || <PersonIcon sx={{ fontSize: { xs: 16, md: 20 } }} />}
                </Avatar>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" } }}>
                  {user.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ color: "#64748b", fontSize: { xs: 12, md: 14 } }} />
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" } }}>
                    {user.email}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ color: "#64748b", fontSize: { xs: 12, md: 14 } }} />
                  <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" } }}>
                    {user.mobile_no || "—"}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Chip
                  icon={user.isActive ? <ActiveIcon sx={{ fontSize: { xs: 10, md: 14 } }} /> : <InactiveIcon sx={{ fontSize: { xs: 10, md: 14 } }} />}
                  label={user.isActive ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: user.isActive ? alpha("#22c55e", 0.1) : alpha("#ef4444", 0.1),
                    color: user.isActive ? "#22c55e" : "#ef4444",
                    fontWeight: 600,
                    fontSize: { xs: "0.6rem", md: "0.7rem" },
                    height: { xs: 20, md: 24 },
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" }, maxWidth: 180 }}>
                  {user.address || "—"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" } }}>
                  {formatDateDDMMYYYY(user.createdAt)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontSize: { xs: "0.7rem", md: "0.85rem" } }}>
                  {formatDateDDMMYYYY(user.updatedAt)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="View Tracking">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick(user);
                    }}
                    sx={{
                      color: "#0f766e",
                      "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
                    }}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Empty State Component
const EmptyState = ({ status }) => (
  <Paper
    elevation={0}
    sx={{
      p: { xs: 3, md: 5 },
      borderRadius: 3,
      textAlign: "center",
      border: "1px solid",
      borderColor: alpha("#e2e8f0", 0.5),
    }}
  >
    <PersonIcon sx={{ fontSize: { xs: 36, md: 48 }, color: alpha("#0f766e", 0.3), mb: 2 }} />
    <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
      No {status.toLowerCase()} users found
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
      There are no {status.toLowerCase()} users in this organization.
    </Typography>
  </Paper>
);

const ListUsers = () => {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { usersList = [], loading } = useSelector((state) => state.user || {});
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (adminId) {
      dispatch(getAllUsers(adminId));
    }
  }, [adminId, dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleRowClick = (user) => {
    navigate("/trackingdata", { state: { item: user } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const activeUsers = usersList.filter((user) => user.isActive);
  const inactiveUsers = usersList.filter((user) => !user.isActive);

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
      }}
    >
      {/* Custom Header */}
      <Paper
        elevation={0}
        sx={{
          py: { xs: 1.5, md: 2 },
          px: { xs: 2, md: 3 },
          borderRadius: 0,
          borderBottom: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          bgcolor: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={handleBack}
            sx={{
              color: "#0f766e",
              "&:hover": { bgcolor: alpha("#0f766e", 0.1) },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={600} color="#0f766e" sx={{ fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
            Organization Users
          </Typography>
        </Box>
      </Paper>

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: { xs: 2, md: 4 } }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", md: "0.875rem" } }}>
                Admin ID: {adminId}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}>
                View and manage all users under this organization
              </Typography>
            </Box>
          </motion.div>

          {/* Summary Cards */}
          <motion.div variants={itemVariants} style={{ marginBottom: isMobile ? 16 : 24 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    bgcolor: alpha("#0f766e", 0.05),
                    border: "1px solid",
                    borderColor: alpha("#0f766e", 0.2),
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", md: "0.75rem" } }}>
                    Total
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#1e293b" sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
                    {usersList.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    bgcolor: alpha("#22c55e", 0.05),
                    border: "1px solid",
                    borderColor: alpha("#22c55e", 0.2),
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", md: "0.75rem" } }}>
                    Active
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#22c55e" sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
                    {activeUsers.length}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, md: 2 },
                    borderRadius: 2,
                    bgcolor: alpha("#ef4444", 0.05),
                    border: "1px solid",
                    borderColor: alpha("#ef4444", 0.2),
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", md: "0.75rem" } }}>
                    Inactive
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="#ef4444" sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
                    {inactiveUsers.length}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                overflow: "hidden",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider", px: { xs: 1, md: 3 } }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant={isMobile ? "fullWidth" : "standard"}
                  sx={{
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: { xs: "0.7rem", md: "0.95rem" },
                      minHeight: { xs: 48, md: 64 },
                      px: { xs: 1, md: 3 },
                    },
                    "& .Mui-selected": {
                      color: "#0f766e !important",
                    },
                    "& .MuiTabs-indicator": {
                      bgcolor: "#0f766e",
                    },
                  }}
                >
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
                        <ActiveIcon sx={{ color: "#22c55e", fontSize: { xs: 16, md: 20 } }} />
                        <span>{!isMobile ? "Active Users" : "Active"}</span>
                        <Chip
                          label={activeUsers.length}
                          size="small"
                          sx={{
                            bgcolor: alpha("#22c55e", 0.1),
                            color: "#22c55e",
                            fontWeight: 600,
                            fontSize: { xs: "0.6rem", md: "0.7rem" },
                            height: { xs: 18, md: 20 },
                          }}
                        />
                      </Box>
                    }
                  />
                  <Tab
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
                        <InactiveIcon sx={{ color: "#64748b", fontSize: { xs: 16, md: 20 } }} />
                        <span>{!isMobile ? "Inactive Users" : "Inactive"}</span>
                        <Chip
                          label={inactiveUsers.length}
                          size="small"
                          sx={{
                            bgcolor: alpha("#64748b", 0.1),
                            color: "#64748b",
                            fontWeight: 600,
                            fontSize: { xs: "0.6rem", md: "0.7rem" },
                            height: { xs: 18, md: 20 },
                          }}
                        />
                      </Box>
                    }
                  />
                </Tabs>
              </Box>

              {/* Tab Panels */}
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: { xs: 4, md: 8 } }}>
                  <CircularProgress sx={{ color: "#0f766e" }} />
                </Box>
              ) : (
                <>
                  <TabPanel value={tabValue} index={0}>
                    {activeUsers.length === 0 ? (
                      <EmptyState status="Active" />
                    ) : isMobile ? (
                      <Box sx={{ px: 1 }}>
                        {activeUsers.map((user) => (
                          <UserCard key={user._id} user={user} onCardClick={handleRowClick} />
                        ))}
                      </Box>
                    ) : (
                      <UserTable users={activeUsers} onRowClick={handleRowClick} />
                    )}
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    {inactiveUsers.length === 0 ? (
                      <EmptyState status="Inactive" />
                    ) : isMobile ? (
                      <Box sx={{ px: 1 }}>
                        {inactiveUsers.map((user) => (
                          <UserCard key={user._id} user={user} onCardClick={handleRowClick} />
                        ))}
                      </Box>
                    ) : (
                      <UserTable users={inactiveUsers} onRowClick={handleRowClick} />
                    )}
                  </TabPanel>
                </>
              )}
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ListUsers;