import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Container,
  alpha,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaUserShield,
  FaChartLine,
  FaRupeeSign,
  FaCalendarAlt,
  FaArrowUp,
} from "react-icons/fa";
import { getUserCounts } from "../../redux/slices/userSlice";
import { getUsersWithExpiringPlans } from "../../redux/slices/planSlice";
import { getRevenueSummary } from "../../redux/slices/paymentSlice";
import ExpiringPlansTable from "../../components/ExpiringPlansTable";
import Loader from "../../components/common/Loader";

const SuperAdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Safe Redux state access
  const userCounts = useSelector((state) => state.user?.userCounts || {});
  const expiringUsers = useSelector((state) => state.plan?.expiringUsers || []);
  const { revenueSummary } = useSelector(
    (state) => state.payment || {}
  );

  const loading = useSelector((state) => state.user?.loading || false);

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  const refreshData = async () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());

    await Promise.all([
      dispatch(getUserCounts()),
      dispatch(getUsersWithExpiringPlans()),
      dispatch(getRevenueSummary()),
    ]);

    setIsRefreshing(false);
  };

  // ✅ Fixed: Added count property to each stat
  const userStats = [
    {
      key: "activeAdmins",
      label: "Active Admins",
      count: userCounts?.activeAdmins || 0,
      icon: <FaUserShield size={24} />,
      bgColor: alpha("#3B82F6", 0.1),
      iconColor: "#3B82F6",
    },
    {
      key: "inactiveAdmins",
      label: "Inactive Admins",
      count: userCounts?.inactiveAdmins || 0,
      icon: <FaUserTimes size={24} />,
      bgColor: alpha("#6B7280", 0.1),
      iconColor: "#6B7280",
    },
    {
      key: "allActiveUsers",
      label: "All Active Users",
      count: userCounts?.allActiveUsers || 0,
      icon: <FaUserCheck size={24} />,
      bgColor: alpha("#22C55E", 0.1),
      iconColor: "#22C55E",
    },
    {
      key: "allInactiveUsers",
      label: "All Inactive Users",
      count: userCounts?.allInactiveUsers || 0,
      icon: <FaUsers size={24} />,
      bgColor: alpha("#F59E0B", 0.1),
      iconColor: "#F59E0B",
    },
  ];

  // Stats Cards Component
  const StatsCards = () => {
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    };

    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {userStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                  border: "1px solid",
                  borderColor: alpha(stat.iconColor, 0.2),
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background: `linear-gradient(135deg, ${alpha(stat.iconColor, 0.05)} 0%, transparent 100%)`,
                    zIndex: 0,
                  },
                  "&:hover": {
                    transform: "translateY(-4px) scale(1.02)",
                    boxShadow: `0 20px 30px -10px ${alpha(stat.iconColor, 0.3)}`,
                    borderColor: stat.iconColor,
                  },
                }}
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                      <Typography
                        variant="h3"
                        fontWeight="700"
                        sx={{
                          mb: 0.5,
                          color: '#1e293b',
                          fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                      >
                        {stat.count}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: alpha(stat.iconColor, 0.1),
                        color: stat.iconColor,
                        width: 60,
                        height: 60,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: `0 10px 20px -5px ${alpha(stat.iconColor, 0.2)}`,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 4,
                    background: `linear-gradient(90deg, ${stat.iconColor} 0%, ${alpha(stat.iconColor, 0.3)} 100%)`,
                    opacity: 0.8,
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Revenue Card Component
  const RevenueCard = () => {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          background: "linear-gradient(135deg, #334155, #1e293b)",
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle, ${alpha("#0f766e", 0.2)} 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          },
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: alpha("#ffffff", 0.7), mb: 1 }}>
              Total Revenue
            </Typography>
            <Typography variant="h3" fontWeight="700">
              {revenueSummary?.totalRevenue > 0
                ? `₹${revenueSummary?.totalRevenue.toLocaleString()}`
                : "₹0"}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Chip
              label={`+${revenueSummary?.growthPercentage > 0
                ? revenueSummary?.growthPercentage.toLocaleString()
                : "0"}%`}
              size="small"
              icon={<FaArrowUp size={10} />}
              sx={{
                bgcolor: alpha("#22c55e", 0.2),
                color: "#22c55e",
                fontWeight: 600,
                fontSize: "0.75rem",
                mb: 1,
              }}
            />
            <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.7), display: "block" }}>
              This Month
            </Typography>
          </Box>
        </Box>

        {/* Monthly Summary Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: alpha("#ffffff", 0.08),
                backdropFilter: "blur(4px)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h5" fontWeight="700" sx={{ mb: 0.5 }}>
                    {revenueSummary?.currentMonthRevenue > 0
                      ? `₹${revenueSummary?.currentMonthRevenue.toLocaleString()}`
                      : "₹0"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.7) }}>
                    This Month
                  </Typography>
                </Box>
                <FaCalendarAlt size={20} style={{ opacity: 0.5 }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: alpha("#ffffff", 0.08),
                backdropFilter: "blur(4px)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h5" fontWeight="700" sx={{ mb: 0.5 }}>
                    {revenueSummary?.lastMonthRevenue > 0
                      ? `₹${revenueSummary?.lastMonthRevenue.toLocaleString()}`
                      : "₹0"}
                  </Typography>
                  <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.7) }}>
                    Last Month
                  </Typography>
                </Box>
                <FaCalendarAlt size={20} style={{ opacity: 0.5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  };

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  // Show main loading state
  if (loading && !isRefreshing && Object.keys(userCounts).length === 0) {
    return (
      <Loader
        message="Loading Dashboard..."
        subMessage="Fetching your dashboard data"
        fullScreen={true}
        size="large"
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        width: "100%",
        overflowX: "hidden",
        position: "relative",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Show refresh loader overlay when refreshing */}
      {isRefreshing && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader
            message="Refreshing data..."
            subMessage="Please wait while we update your dashboard"
            size="medium"
          />
        </Box>
      )}

      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
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
                  Super Admin Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                  Overview • Last updated {lastUpdated.toLocaleTimeString()}
                  <IconButton
                    size="small"
                    sx={{
                      ml: 1,
                      bgcolor: alpha("#0f766e", 0.1),
                      "&:hover": {
                        bgcolor: alpha("#0f766e", 0.2),
                      },
                    }}
                    onClick={refreshData}
                    disabled={isRefreshing}
                  >
                    <RefreshIcon
                      fontSize="small"
                      sx={{
                        color: "#0f766e",
                        animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                      }}
                    />
                  </IconButton>
                </Typography>
              </Box>
              <Chip
                label="Super Admin"
                size="medium"
                sx={{
                  bgcolor: "#0f766e",
                  color: "white",
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                  fontSize: "0.9rem",
                  boxShadow: `0 10px 20px -5px ${alpha("#0f766e", 0.3)}`,
                }}
              />
            </Box>
          </motion.div>

          {/* Tracking Overview Section */}
          <motion.section variants={itemVariants} style={{ marginBottom: "40px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FaChartLine style={{ color: "#0f766e", fontSize: 20 }} />
                <Typography variant="h5" fontWeight="600" color="#1e293b">
                  Tracking Overview
                </Typography>
              </Box>

              <Chip
                label="Live Analytics"
                size="small"
                icon={<FaChartLine size={14} />}
                sx={{
                  bgcolor: alpha("#22c55e", 0.1),
                  color: "#22c55e",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  px: 1,
                }}
              />
            </Box>

            {/* This renders the 4 stats cards */}
            <StatsCards />
          </motion.section>

          {/* Expiring Plans Section */}
          <motion.section variants={itemVariants} style={{ marginBottom: "40px" }}>
            <ExpiringPlansTable data={expiringUsers} />
          </motion.section>

          {/* Revenue Overview Section */}
          <motion.section variants={itemVariants} style={{ marginBottom: "40px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <FaRupeeSign style={{ color: "#0f766e", fontSize: 20 }} />
              <Typography variant="h5" fontWeight="600" color="#1e293b">
                Revenue Overview
              </Typography>
            </Box>

            <motion.div variants={cardVariants}>
              <RevenueCard />
            </motion.div>
          </motion.section>
        </motion.div>
      </Container>

      {/* CSS for animations */}
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

export default SuperAdminDashboard;