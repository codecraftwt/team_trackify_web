import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  alpha,
  useTheme,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Logout as LogoutIcon,
  LockReset as ResetPasswordIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  VerifiedUser as SuperAdminIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import LogoutModal from "../../components/models/LogoutModal";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user?.userInfo || {});
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleEditClick = () => {
    navigate("/add-admin", { 
      state: { 
        user: userData, 
        profileEditing: true 
      } 
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getRoleIcon = () => {
    switch (userData?.role_id) {
      case 2:
        return <SuperAdminIcon sx={{ color: "#f59e0b" }} />;
      case 1:
        return <AdminIcon sx={{ color: "#0f766e" }} />;
      default:
        return <PersonIcon sx={{ color: "#64748b" }} />;
    }
  };

  const getRoleName = () => {
    switch (userData?.role_id) {
      case 2:
        return "Super Admin";
      case 1:
        return "Admin";
      default:
        return "User";
    }
  };

  const getRoleColor = () => {
    switch (userData?.role_id) {
      case 2:
        return "#f59e0b";
      case 1:
        return "#0f766e";
      default:
        return "#64748b";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        backgroundImage: "radial-gradient(circle at 10% 20%, rgba(15, 118, 110, 0.05) 0%, rgba(15, 118, 110, 0.02) 90%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header Card */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
              mb: 3,
            }}
          >
            <Box
              sx={{
                p: 4,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 3,
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              }}
            >
              {/* Avatar Section */}
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={userData?.avtar}
                  sx={{
                    width: 120,
                    height: 120,
                    border: "4px solid white",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    bgcolor: alpha("#0f766e", 0.1),
                  }}
                >
                  {userData?.name?.charAt(0) || "U"}
                </Avatar>
                <Tooltip title="Edit Profile">
                  <IconButton
                    size="small"
                    onClick={handleEditClick}
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "#0f766e",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#0a5c55",
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* User Info */}
              <Box sx={{ textAlign: { xs: "center", md: "left" }, flex: 1 }}>
                <Typography variant="h4" fontWeight={700} color="#1e293b" gutterBottom>
                  {userData?.name || "User Name"}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center", md: "flex-start" }, mb: 2 }}>
                  {getRoleIcon()}
                  <Chip
                    label={getRoleName()}
                    size="small"
                    sx={{
                      bgcolor: alpha(getRoleColor(), 0.1),
                      color: getRoleColor(),
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Member since {new Date(userData?.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              {/* Edit Button (Mobile) */}
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEditClick}
                  sx={{
                    borderColor: "#0f766e",
                    color: "#0f766e",
                    borderRadius: 3,
                    "&:hover": {
                      borderColor: "#0a5c55",
                      bgcolor: alpha("#0f766e", 0.1),
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Profile Details Card */}
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
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="#0f766e"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  mb: 3,
                  fontSize: "0.85rem",
                }}
              >
                Personal Information
              </Typography>

              <Stack spacing={3}>
                {/* Email */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#0f766e", 0.1),
                      color: "#0f766e",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <EmailIcon />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {userData?.email || "Not provided"}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: alpha("#e2e8f0", 0.5) }} />

                {/* Phone */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#0f766e", 0.1),
                      color: "#0f766e",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <PhoneIcon />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {userData?.mobile_no || "Not provided"}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: alpha("#e2e8f0", 0.5) }} />

                {/* Address */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#0f766e", 0.1),
                      color: "#0f766e",
                      width: 48,
                      height: 48,
                    }}
                  >
                    <LocationIcon />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {userData?.address || "Not provided"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Divider sx={{ my: 4, borderColor: alpha("#e2e8f0", 0.5) }} />

              {/* Actions */}
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ResetPasswordIcon />}
                  onClick={() => navigate("/reset-password")}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: "#0f766e",
                    color: "#0f766e",
                    fontWeight: 600,
                    "&:hover": {
                      borderColor: "#0a5c55",
                      bgcolor: alpha("#0f766e", 0.1),
                    },
                  }}
                >
                  Reset Password
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  onClick={() => setShowLogoutModal(true)}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    bgcolor: "#ef4444",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#dc2626",
                    },
                  }}
                >
                  Sign Out
                </Button>
              </Stack>
            </CardContent>
          </Paper>
        </motion.div>
      </Container>

      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        subMessage="You will be redirected to the login page."
      />
    </Box>
  );
};

export default Profile;