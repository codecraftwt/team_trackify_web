import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Chip,
  Divider,
  Stack,
  alpha,
  IconButton,
  Tooltip,
  TextField,
  Grid,
  InputAdornment,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Tab,
  Tabs,
  Container,
  Card,
  Badge,
} from "@mui/material";
import {
  EditRounded as EditIcon,
  EmailRounded as EmailIcon,
  PhoneRounded as PhoneIcon,
  LocationOnRounded as LocationIcon,
  LogoutRounded as LogoutIcon,
  LockResetRounded as ResetPasswordIcon,
  PersonRounded as PersonIcon,
  AdminPanelSettingsRounded as AdminIcon,
  VerifiedUserRounded as SuperAdminIcon,
  CameraAltRounded as CameraIcon,
  SaveRounded as SaveIcon,
  CancelRounded as CancelIcon,
  KeyRounded as KeyIcon,
  MailRounded as MailIcon,
  VpnKeyRounded as VpnKeyIcon,
  RefreshRounded as RefreshIcon,
  DeleteRounded as DeleteIcon,
  CalendarTodayRounded as CalendarIcon,
  VisibilityRounded as VisibilityIcon,
  VisibilityOffRounded as VisibilityOffIcon,
  CheckCircleRounded as CheckCircleIcon,
  ErrorOutlineRounded as ErrorOutlineIcon,
  SupervisorAccountRounded as SubAdminIcon,
  ShieldRounded as ShieldIcon,
  LockRounded as LockIcon,
  AccountBalanceRounded as OrganizationIcon,
  RadioButtonCheckedRounded as StatusIcon,
  ChevronRightRounded as ChevronRightIcon,
  ContentCopyRounded as CopyIcon,
  PaymentRounded as PaymentIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout, logoutUser } from "../../redux/slices/authSlice";
import {
  updateUser,
  getUserById,
  getConfig,
  createOrUpdateConfig,
  deleteConfig,
} from "../../redux/slices/userSlice";
import LogoutModal from "../../components/models/LogoutModal";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

// ── animations ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] } },
});
const stagger = { animate: { transition: { staggerChildren: 0.05 } } };

// ── ConfigField Component (for SuperAdmin tab) ────────────────────────────────
const ConfigField = ({ label, value, icon, isSecret, isEditing, fieldName, editValue, onChange, showSecretKeys, onToggleSecret }) => {
  const isVisible = showSecretKeys[fieldName];
  const [localValue, setLocalValue] = useState(editValue || "");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLocalValue(editValue || "");
  }, [editValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(e);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange({ target: { name: fieldName, value: "" } });
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDisplayValue = () => {
    if (!value) return "Not configured";
    if (isSecret && !isVisible) {
      return "••••••••••••••••••••••••";
    }
    return value;
  };

  const isEmpty = !value;
  const hasValue = Boolean(value);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.6 }}>
        <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155" }}>
          {label}
        </Typography>
        {isSecret && (
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 600, color: "#64748b", bgcolor: "#f1f5f9", px: 0.8, py: 0.2, borderRadius: "6px" }}>
            Secret Key
          </Typography>
        )}
      </Box>

      {isEditing ? (
        <TextField
          fullWidth
          name={fieldName}
          type={isSecret && !isVisible ? "password" : "text"}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={localValue}
          onChange={handleChange}
          size="small"
          helperText={isSecret ? "Leave empty to keep current saved secret" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: "#ffffff",
              fontSize: "0.86rem",
              borderColor: "#e2e8f0",
              transition: "all 0.2s ease",
              "&:hover fieldset": { borderColor: "#102c4a" },
              "&.Mui-focused fieldset": { borderColor: "#102c4a", borderWidth: "1.5px" },
            },
            "& .MuiFormHelperText-root": { fontSize: "0.7rem", mt: 0.4, color: "#64748b" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box sx={{ color: "#102c4a", display: "flex", alignItems: "center" }}>
                  {React.cloneElement(icon, { sx: { fontSize: 18 } })}
                </Box>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {localValue && (
                  <IconButton onClick={handleClear} edge="end" size="small" sx={{ color: "#94a3b8", mr: isSecret ? 0.5 : 0 }}>
                    <CancelIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
                {isSecret && (
                  <Tooltip title={isVisible ? "Hide secret" : "Show secret"}>
                    <IconButton onClick={() => onToggleSecret(fieldName)} edge="end" size="small" sx={{ color: "#94a3b8" }}>
                      {isVisible ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </Tooltip>
                )}
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: "9px 12px",
            borderRadius: "10px",
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "#f1f5f9",
              borderColor: "#cbd5e1",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, minWidth: 0, flex: 1, pr: 1 }}>
            <Box sx={{ color: hasValue ? "#102c4a" : "#94a3b8", display: "flex", alignItems: "center", flexShrink: 0 }}>
              {React.cloneElement(icon, { sx: { fontSize: 18 } })}
            </Box>
            <Typography
              sx={{
                fontSize: "0.85rem",
                color: hasValue ? "#0f172a" : "#94a3b8",
                fontFamily: isSecret && !isVisible && hasValue ? "monospace" : "inherit",
                fontWeight: hasValue ? 500 : 400,
                fontStyle: hasValue ? "normal" : "italic",
                letterSpacing: isSecret && !isVisible && hasValue ? "0.12em" : "normal",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {getDisplayValue()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, flexShrink: 0 }}>
            {isSecret && hasValue && (
              <Tooltip title={isVisible ? "Hide value" : "Reveal value"}>
                <IconButton onClick={() => onToggleSecret(fieldName)} size="small" sx={{ color: "#64748b", p: 0.5, "&:hover": { color: "#102c4a" } }}>
                  {isVisible ? <VisibilityOffIcon sx={{ fontSize: 17 }} /> : <VisibilityIcon sx={{ fontSize: 17 }} />}
                </IconButton>
              </Tooltip>
            )}
            {hasValue && (
              <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                <IconButton onClick={() => handleCopy(value)} size="small" sx={{ color: copied ? "#16a34a" : "#64748b", p: 0.5, "&:hover": { color: "#102c4a" } }}>
                  <CopyIcon sx={{ fontSize: 17 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

// ── Main Profile Component ───────────────────────────────────────────────────
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const userData = useSelector((state) => state.user?.userInfo || {});
  const authState = useSelector((state) => state.auth);
  const { loading, config, configLoading, configUpdateLoading, configDeleteLoading } =
    useSelector((state) => state.user || {});

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfigEditing, setIsConfigEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSecretKeys, setShowSecretKeys] = useState({});

  const { user, role_id } = useSelector((state) => state.auth);

  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const storedUser = getStoredUser();
  const effectiveUser = userData || user || storedUser;
  const effectiveRoleId = userData?.role_id || user?.role_id || storedUser?.role_id || role_id;

  const isSuperAdmin = Number(effectiveRoleId) === 2;
  const isAdmin = Number(effectiveRoleId) === 1;
  const isSubAdmin = Number(effectiveRoleId) === 3;

  const emptyConfig = {
    razorpayKeyId: "",
    razorpayKeySecret: "",
    razorpayWebhookSecret: "",
    gmailUser: "",
    gmailAppPass: "",
    emailFrom: "",
  };

  const [formData, setFormData] = useState({ fullName: "", email: "", mobile: "", address: "", avtar: null });
  const [configFormData, setConfigFormData] = useState(emptyConfig);
  const [configViewData, setConfigViewData] = useState(emptyConfig);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [avatarKey, setAvatarKey] = useState(0);

  const handleConfirmLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      console.error("Logout API failed:", err);
    }
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    let cancelled = false;

    const fetchUserData = async () => {
      try {
        const token = authState?.token;
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        if (!userId) {
          console.error("No user ID found in token");
          toast.error("Authentication error. Please login again.");
          navigate("/login");
          return;
        }

        await dispatch(getUserById(userId)).unwrap();

        if (!cancelled) {
          setInitialDataLoaded(true);
          setAvatarKey((prev) => prev + 1);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching user data:", error);
          if (error.name === "InvalidTokenError") {
            toast.error("Session expired. Please login again.");
            navigate("/login");
          } else {
            toast.error("Failed to load profile data");
          }
        }
      }
    };

    fetchUserData();

    return () => {
      cancelled = true;
    };
  }, [dispatch, navigate, authState?.token]);

  useEffect(() => {
    if (location.state?.openConfigTab && isSuperAdmin) {
      setTabValue(1);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, isSuperAdmin, navigate, location.pathname]);

  const toggleSecretKey = (f) => setShowSecretKeys((p) => ({ ...p, [f]: !p[f] }));

  useEffect(() => {
    if (isSuperAdmin) {
      dispatch(getConfig());
    }
  }, [dispatch, isSuperAdmin]);

  useEffect(() => {
    if (config) {
      const populated = {
        razorpayKeyId: config.paymentConfig?.razorpayKeyId || "",
        razorpayKeySecret: config.paymentConfig?.razorpayKeySecret || "",
        razorpayWebhookSecret: config.paymentConfig?.razorpayWebhookSecret || "",
        gmailUser: config.emailConfig?.gmailUser || "",
        gmailAppPass: config.emailConfig?.gmailAppPass || "",
        emailFrom: config.emailConfig?.emailFrom || "",
      };
      setConfigViewData(populated);
      setConfigFormData({ ...populated });
    }
  }, [config]);

  useEffect(() => {
    const displayUser = effectiveUser || userData;

    if (displayUser?._id) {
      setFormData({
        fullName: displayUser.name || "",
        email: displayUser.email || "",
        mobile: displayUser.mobile_no || "",
        address: displayUser.address || "",
        avtar: null,
      });

      if (displayUser.avtar) {
        let avatarUrl = displayUser.avtar;
        if (!avatarUrl.startsWith("http") && !avatarUrl.startsWith("data:")) {
          const cleanPath = avatarUrl.startsWith("/") ? avatarUrl.slice(1) : avatarUrl;
          avatarUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/${cleanPath}`;
        }
        avatarUrl = `${avatarUrl}${avatarUrl.includes("?") ? "&" : "?"}t=${Date.now()}`;
        setPreviewImage(avatarUrl);
      } else {
        setPreviewImage(null);
      }
    }
  }, [effectiveUser, userData]);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName": return !value?.trim() ? "Required" : value.length < 3 ? "Min 3 chars" : "";
      case "email": return !value?.trim() ? "Required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email" : "";
      case "mobile": return !value?.trim() ? "Required" : !/^\d{10}$/.test(value) ? "10 digits" : "";
      case "address": return !value?.trim() ? "Required" : "";
      default: return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Max 5MB");
      return;
    }
    setFormData({ ...formData, avtar: file });
    setPreviewImage(URL.createObjectURL(file));
    setImageRemoved(false);
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      mobile: validateField("mobile", formData.mobile),
      address: validateField("address", formData.address),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("role_id", userData.role_id);
    payload.append("createdby", userData.createdby);
    payload.append("isActive", userData.isActive);
    if (formData.avtar) payload.append("avtar", formData.avtar);
    if (imageRemoved) payload.append("removeAvtar", "true");

    try {
      await dispatch(updateUser({ userId: userData._id, formData: payload })).unwrap();
      const refreshed = await dispatch(getUserById(userData._id)).unwrap();

      if (refreshed?.user) {
        dispatch({ type: "user/setUserInfo", payload: refreshed.user });
      }

      setAvatarKey((prev) => prev + 1);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (error) {
      if (error?.errors && Array.isArray(error.errors) && error.errors.length > 0) {
        const allErrors = error.errors.join("\n• ");
        toast.error(`Validation failed:\n• ${allErrors}`, {
          autoClose: 5000,
          style: { whiteSpace: "pre-line" },
        });
      } else {
        toast.error(error?.message || "Update failed");
      }
    }
  };

  const handleCancel = () => {
    const displayUser = effectiveUser || userData;
    setFormData({
      fullName: displayUser.name || "",
      email: displayUser.email || "",
      mobile: displayUser.mobile_no || "",
      address: displayUser.address || "",
      avtar: null,
    });

    if (displayUser.avtar) {
      let avatarUrl = displayUser.avtar;
      if (!avatarUrl.startsWith("http") && !avatarUrl.startsWith("data:")) {
        const cleanPath = avatarUrl.startsWith("/") ? avatarUrl.slice(1) : avatarUrl;
        avatarUrl = `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/${cleanPath}`;
      }
      setPreviewImage(avatarUrl);
    } else {
      setPreviewImage(null);
    }

    setImageRemoved(false);
    setErrors({});
    setTouched({});
    setIsEditing(false);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfigFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveConfig = async () => {
    const payload = {};
    Object.entries(configFormData).forEach(([k, v]) => {
      payload[k] = v || "";
    });

    try {
      await dispatch(createOrUpdateConfig(payload)).unwrap();
      await dispatch(getConfig());
      setIsConfigEditing(false);
      setShowSecretKeys({});
      toast.success("Configuration saved!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save configuration");
    }
  };

  const handleDeleteConfig = async () => {
    try {
      await dispatch(deleteConfig()).unwrap();
      setShowDeleteConfirm(false);
      setIsConfigEditing(false);
      setConfigFormData(emptyConfig);
      setConfigViewData(emptyConfig);
      setShowSecretKeys({});
      toast.success("Configuration deleted!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete configuration");
    }
  };

  const handleCancelConfig = () => {
    setConfigFormData({ ...configViewData });
    setIsConfigEditing(false);
    setShowDeleteConfirm(false);
    setShowSecretKeys({});
  };

  const getRoleInfo = () => {
    const id = effectiveRoleId;
    if (id === 2) return { icon: <SuperAdminIcon />, label: "Super Administrator" };
    if (id === 1) return { icon: <ShieldIcon />, label: "Administrator" };
    if (id === 3) return { icon: <SubAdminIcon />, label: "Sub Administrator" };
    return { icon: <PersonIcon />, label: "User" };
  };

  const roleInfo = getRoleInfo();

  const formatMemberSince = (dateStr) => {
    if (!dateStr) return "Apr 2026";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Apr 2026";
      return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return "Apr 2026";
    }
  };

  const configuredCount = Object.values(configViewData).filter(Boolean).length;
  const totalConfig = Object.keys(configViewData).length;

  const configSections = [
    {
      title: "Payment Gateway",
      subtitle: "Razorpay API credentials & webhook keys",
      icon: <PaymentIcon />,
      fields: [
        { name: "razorpayKeyId", label: "Razorpay Key ID", icon: <KeyIcon />, secret: false },
        { name: "razorpayKeySecret", label: "Razorpay Key Secret", icon: <VpnKeyIcon />, secret: true },
        { name: "razorpayWebhookSecret", label: "Webhook Secret", icon: <ShieldIcon />, secret: true },
      ],
    },
    {
      title: "Email Service",
      subtitle: "Gmail SMTP & platform outgoing mail settings",
      icon: <MailIcon />,
      fields: [
        { name: "gmailUser", label: "Gmail Account User", icon: <MailIcon />, secret: false },
        { name: "gmailAppPass", label: "Gmail App Password", icon: <VpnKeyIcon />, secret: true },
        { name: "emailFrom", label: "Sender 'From' Header", icon: <EmailIcon />, secret: false },
      ],
    },
  ];

  if (!initialDataLoaded && !userData?._id) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress sx={{ color: "#102c4a" }} />
      </Box>
    );
  }

  const memberSinceText = formatMemberSince(effectiveUser?.createdAt || userData?.createdAt);
  const organizationName = effectiveUser?.organization || effectiveUser?.companyName || effectiveUser?.name || userData?.name || "WalstarCC";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        width: "100%",
        overflowX: "hidden",
        position: "relative",
        py: { xs: 2, sm: 3, md: 3.5 },
        px: { xs: 1.5, sm: 2.5, md: 3.5 },
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <motion.div variants={stagger} initial="initial" animate="animate">
          {/* ── Page Header ── */}
          <motion.div {...fadeUp(0)}>
            <Box sx={{ mb: { xs: 2.5, sm: 3 }, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: "#0f172a",
                    fontSize: { xs: "1.35rem", sm: "1.65rem", md: "1.85rem" },
                    letterSpacing: "-0.02em",
                  }}
                >
                  My Profile
                </Typography>
                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                    mt: 0.3,
                  }}
                >
                  Manage your account information and settings
                </Typography>
              </Box>

              {/* Tabs toggle (Profile Overview | Security | Configuration) */}
              <Box
                sx={{
                  bgcolor: "#ffffff",
                  p: 0.5,
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={(_, v) => setTabValue(v)}
                  sx={{
                    minHeight: 36,
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      minHeight: 36,
                      py: 0.5,
                      px: 2,
                      borderRadius: "10px",
                      fontSize: "0.82rem",
                      color: "#64748b",
                      transition: "all 0.2s",
                    },
                    "& .Mui-selected": {
                      color: "#ffffff !important",
                      bgcolor: "#102c4a",
                    },
                    "& .MuiTabs-indicator": { display: "none" },
                  }}
                >
                  <Tab label="Profile Overview" />
                  <Tab label="Security" />
                  {isSuperAdmin && <Tab label="Configuration" />}
                </Tabs>
              </Box>
            </Box>
          </motion.div>

          {/* ── Tab 0: Profile View ── */}
          {tabValue === 0 && (
            <Box>
              {/* Top Row: Equal Height Profile & Personal Information Cards */}
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} alignItems="stretch">
                {/* ── TOP ROW - LEFT: Profile Info Card ── */}
                <Grid item xs={12} md={4.5} lg={4} sx={{ display: "flex" }}>
                  <motion.div {...fadeUp(0.05)} style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: "22px",
                        bgcolor: "#ffffff",
                        border: "1px solid #edf2f7",
                        boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        minHeight: { xs: "auto", md: 380, lg: 410 },
                        p: { xs: 3, sm: 3.5, md: 4 },
                      }}
                    >
                      {/* Top Header: Avatar on Left, Name & Role on Right */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2.2,
                          mb: 0.5,
                        }}
                      >
                        {/* Avatar with Metallic Gold Dual-Ring Border */}
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                          badgeContent={
                            isEditing && (
                              <Tooltip title="Change Photo">
                                <IconButton
                                  size="small"
                                  component="label"
                                  sx={{
                                    bgcolor: "#102c4a",
                                    color: "white",
                                    width: 26,
                                    height: 26,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                    "&:hover": { bgcolor: "#1e4f7a" },
                                  }}
                                >
                                  <CameraIcon sx={{ fontSize: 14 }} />
                                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </IconButton>
                              </Tooltip>
                            )
                          }
                        >
                          <Box
                            sx={{
                              p: "2.8px",
                              borderRadius: "50%",
                              background: "linear-gradient(135deg, #e6ca65 0%, #caa038 50%, #9e7518 100%)",
                              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                              flexShrink: 0,
                            }}
                          >
                            <Box
                              sx={{
                                p: "2px",
                                borderRadius: "50%",
                                bgcolor: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {previewImage ? (
                                <Avatar
                                  key={`avatar-${effectiveUser?._id || userData?._id}-${avatarKey}`}
                                  src={previewImage}
                                  sx={{
                                    width: 76,
                                    height: 76,
                                    bgcolor: "#ffffff",
                                  }}
                                  imgProps={{
                                    onError: () => {
                                      setPreviewImage(null);
                                    },
                                  }}
                                />
                              ) : (
                                <Avatar
                                  key={`default-avatar-${effectiveUser?._id || userData?._id}-${avatarKey}`}
                                  sx={{
                                    width: 76,
                                    height: 76,
                                    bgcolor: "#eef4fa",
                                    color: "#102c4a",
                                    fontWeight: 800,
                                    fontSize: "1.6rem",
                                  }}
                                >
                                  {(effectiveUser?.name || userData?.name)?.charAt(0)?.toUpperCase() || (
                                    <PersonIcon sx={{ fontSize: 38 }} />
                                  )}
                                </Avatar>
                              )}
                            </Box>
                          </Box>
                        </Badge>

                        {/* Name & Role on the Right Side */}
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: { xs: "1.15rem", sm: "1.25rem" },
                              color: "#0f172a",
                              letterSpacing: "-0.01em",
                              lineHeight: 1.25,
                              wordBreak: "break-word",
                            }}
                          >
                            {effectiveUser?.name || userData?.name || "User Name"}
                          </Typography>

                          {/* Role Pill Badge */}
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.6,
                              mt: 0.9,
                              px: 1.5,
                              py: 0.4,
                              borderRadius: "20px",
                              bgcolor: "#eef4fa",
                              color: "#102c4a",
                              fontWeight: 700,
                              fontSize: "0.78rem",
                            }}
                          >
                            <ShieldIcon sx={{ fontSize: 14, color: "#102c4a" }} />
                            <span>{roleInfo.label}</span>
                          </Box>
                        </Box>
                      </Box>

                      {/* Full-Width Soft Line Divider */}
                      <Box
                        sx={{
                          height: "1.5px",
                          my: 2,
                          mx: { xs: -3, sm: -3.5, md: -4 },
                          background: "linear-gradient(90deg, rgba(16,44,74,0.12) 0%, rgba(16,44,74,0.25) 50%, rgba(16,44,74,0.12) 100%)",
                        }}
                      />

                      {/* Quick Info Rows Distributed Evenly */}
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          width: "100%",
                          py: 0.5,
                        }}
                      >
                        {/* Email */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                          <Box
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              bgcolor: "#eef4fa",
                              color: "#102c4a",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <EmailIcon sx={{ fontSize: 20 }} />
                          </Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography sx={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, lineHeight: 1.1 }}>
                              Email Address
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.88rem",
                                color: "#0f172a",
                                fontWeight: 700,
                                mt: 0.3,
                                wordBreak: "break-all",
                              }}
                            >
                              {effectiveUser?.email || userData?.email || "Not provided"}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Mobile */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                          <Box
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              bgcolor: "#eef4fa",
                              color: "#102c4a",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <PhoneIcon sx={{ fontSize: 20 }} />
                          </Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography sx={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, lineHeight: 1.1 }}>
                              Mobile Number
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.88rem",
                                color: "#0f172a",
                                fontWeight: 700,
                                mt: 0.3,
                              }}
                            >
                              {effectiveUser?.mobile_no || userData?.mobile_no || "Not provided"}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Member Since */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                          <Box
                            sx={{
                              width: 42,
                              height: 42,
                              borderRadius: "50%",
                              bgcolor: "#eef4fa",
                              color: "#102c4a",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <CalendarIcon sx={{ fontSize: 20 }} />
                          </Box>
                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography sx={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, lineHeight: 1.1 }}>
                              Member Since
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "0.88rem",
                                color: "#0f172a",
                                fontWeight: 700,
                                mt: 0.3,
                              }}
                            >
                              {memberSinceText}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>

                {/* ── TOP ROW - RIGHT: Personal Information Card ── */}
                <Grid item xs={12} md={7.5} lg={8} sx={{ display: "flex" }}>
                  <motion.div {...fadeUp(0.1)} style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: "22px",
                        bgcolor: "#ffffff",
                        border: "1px solid #edf2f7",
                        boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
                        p: { xs: 3, sm: 3.5, md: 4 },
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                        minHeight: { xs: "auto", md: 380, lg: 410 },
                      }}
                    >
                      {/* Card Header */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 0.5,
                          flexWrap: "wrap",
                          gap: 1.5,
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                          <ShieldIcon sx={{ fontSize: 24, color: "#102c4a" }} />
                          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.2rem" }, color: "#0f172a" }}>
                            Personal Information
                          </Typography>
                        </Box>

                        {!isEditing && (
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                            onClick={() => setIsEditing(true)}
                            sx={{
                              height: 38,
                              borderRadius: "10px",
                              fontWeight: 700,
                              fontSize: "0.82rem",
                              textTransform: "none",
                              color: "#102c4a",
                              borderColor: "#cbd5e1",
                              px: 2.2,
                              "&:hover": {
                                borderColor: "#102c4a",
                                bgcolor: alpha("#102c4a", 0.05),
                              },
                            }}
                          >
                            Edit Profile
                          </Button>
                        )}
                      </Box>

                      {/* Full-Width Soft Line Divider */}
                      <Box
                        sx={{
                          height: "1.5px",
                          my: 2,
                          mx: { xs: -3, sm: -3.5, md: -4 },
                          background: "linear-gradient(90deg, rgba(16,44,74,0.12) 0%, rgba(16,44,74,0.25) 50%, rgba(16,44,74,0.12) 100%)",
                        }}
                      />

                      {/* Content: View Mode vs Edit Mode */}
                      <AnimatePresence mode="wait">
                        {isEditing ? (
                          <motion.div
                            key="edit-form"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
                          >
                            <Grid container spacing={2.5}>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="fullName"
                                  label="Full Name"
                                  value={formData.fullName}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={!!errors.fullName && touched.fullName}
                                  helperText={touched.fullName && errors.fullName}
                                  size="small"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                      "&.Mui-focused fieldset": { borderColor: "#102c4a" },
                                    },
                                  }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PersonIcon sx={{ color: "#102c4a", fontSize: 18 }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="email"
                                  label="Email Address"
                                  value={formData.email}
                                  disabled
                                  size="small"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                    },
                                  }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <EmailIcon sx={{ color: "#102c4a", fontSize: 18 }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="mobile"
                                  label="Mobile Number"
                                  value={formData.mobile}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={!!errors.mobile && touched.mobile}
                                  helperText={touched.mobile && errors.mobile}
                                  size="small"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                      "&.Mui-focused fieldset": { borderColor: "#102c4a" },
                                    },
                                  }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PhoneIcon sx={{ color: "#102c4a", fontSize: 18 }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                <TextField
                                  fullWidth
                                  name="address"
                                  label="Address"
                                  value={formData.address}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={!!errors.address && touched.address}
                                  helperText={touched.address && errors.address}
                                  size="small"
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "12px",
                                      "&.Mui-focused fieldset": { borderColor: "#102c4a" },
                                    },
                                  }}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LocationIcon sx={{ color: "#102c4a", fontSize: 18 }} />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <Box sx={{ display: "flex", gap: 1.2, justifyContent: "flex-end", mt: 1.5 }}>
                                  <Button
                                    variant="outlined"
                                    onClick={handleCancel}
                                    sx={{
                                      height: 38,
                                      borderRadius: "10px",
                                      fontWeight: 700,
                                      fontSize: "0.82rem",
                                      borderColor: "#e2e8f0",
                                      color: "#64748b",
                                      textTransform: "none",
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={handleSave}
                                    disabled={loading}
                                    sx={{
                                      height: 38,
                                      borderRadius: "10px",
                                      fontWeight: 700,
                                      fontSize: "0.82rem",
                                      textTransform: "none",
                                      bgcolor: "#102c4a",
                                      "&:hover": { bgcolor: "#1e4f7a" },
                                    }}
                                  >
                                    {loading ? "Saving..." : "Save Changes"}
                                  </Button>
                                </Box>
                              </Grid>
                            </Grid>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="view-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ flex: 1, display: "flex", flexDirection: "column" }}
                          >
                            {/* 4 Items in One Column distributed evenly */}
                            <Box
                              sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-evenly",
                                width: "100%",
                                py: 0.5,
                              }}
                            >
                              {/* Full Name */}
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                                <Box
                                  sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    bgcolor: "#eef4fa",
                                    color: "#102c4a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <PersonIcon sx={{ fontSize: 20 }} />
                                </Box>
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                  <Typography sx={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, lineHeight: 1.1 }}>
                                    Full Name
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.88rem",
                                      color: "#0f172a",
                                      fontWeight: 700,
                                      mt: 0.3,
                                    }}
                                  >
                                    {effectiveUser?.name || userData?.name || "Not provided"}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Email Address */}
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                                <Box
                                  sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    bgcolor: "#eef4fa",
                                    color: "#102c4a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <EmailIcon sx={{ fontSize: 20 }} />
                                </Box>
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                  <Typography sx={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, lineHeight: 1.1 }}>
                                    Email Address
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.88rem",
                                      color: "#0f172a",
                                      fontWeight: 700,
                                      mt: 0.3,
                                      wordBreak: "break-all",
                                    }}
                                  >
                                    {effectiveUser?.email || userData?.email || "Not provided"}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Mobile Number */}
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                                <Box
                                  sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    bgcolor: "#eef4fa",
                                    color: "#102c4a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <PhoneIcon sx={{ fontSize: 20 }} />
                                </Box>
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                  <Typography sx={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, lineHeight: 1.1 }}>
                                    Mobile Number
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.88rem",
                                      color: "#0f172a",
                                      fontWeight: 700,
                                      mt: 0.3,
                                    }}
                                  >
                                    {effectiveUser?.mobile_no || userData?.mobile_no || "Not provided"}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Address */}
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.6 }}>
                                <Box
                                  sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    bgcolor: "#eef4fa",
                                    color: "#102c4a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <LocationIcon sx={{ fontSize: 20 }} />
                                </Box>
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                  <Typography sx={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 500, lineHeight: 1.1 }}>
                                    Address
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.88rem",
                                      color: "#0f172a",
                                      fontWeight: 700,
                                      mt: 0.3,
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    {effectiveUser?.address || userData?.address || "Not provided"}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Paper>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* ── Tab 1: Security View ── */}
          {tabValue === 1 && (
            <motion.div {...fadeUp(0.05)}>
              <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                {/* Password & Credentials Card */}
                <Grid item xs={12} md={6} lg={5}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: "20px",
                      bgcolor: "#ffffff",
                      border: "1px solid #edf2f7",
                      boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                      p: { xs: 2.5, sm: 3.5 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1 }}>
                        <ShieldIcon sx={{ fontSize: 22, color: "#102c4a" }} />
                        <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#0f172a" }}>
                          Security & Credentials
                        </Typography>
                      </Box>
                      <Typography sx={{ color: "#64748b", fontSize: "0.83rem", mb: 3 }}>
                        Update your account password and authentication credentials.
                      </Typography>

                      <Stack spacing={1.5} sx={{ width: "100%" }}>
                        {/* Reset Password Button */}
                        <Button
                          fullWidth
                          onClick={() => navigate("/reset-password-profile")}
                          sx={{
                            height: 44,
                            borderRadius: "12px",
                            fontWeight: 700,
                            fontSize: "0.84rem",
                            textTransform: "none",
                            bgcolor: "#102c4a",
                            color: "#ffffff",
                            px: 2.2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxShadow: "0 3px 10px rgba(16, 44, 74, 0.2)",
                            "&:hover": {
                              bgcolor: "#1e4f7a",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <KeyIcon sx={{ fontSize: 18 }} />
                            <span>Reset Password</span>
                          </Box>
                          <ChevronRightIcon sx={{ fontSize: 18 }} />
                        </Button>

                        {/* Change Password Action */}
                        <Button
                          fullWidth
                          onClick={() => navigate("/reset-password-profile")}
                          sx={{
                            height: 44,
                            borderRadius: "12px",
                            fontWeight: 700,
                            fontSize: "0.84rem",
                            textTransform: "none",
                            bgcolor: "#ffffff",
                            color: "#ef4444",
                            border: "1px solid #fecaca",
                            px: 2.2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            "&:hover": {
                              bgcolor: "#fff5f5",
                              borderColor: "#f87171",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <ShieldIcon sx={{ fontSize: 18 }} />
                            <span>Change Password</span>
                          </Box>
                          <ChevronRightIcon sx={{ fontSize: 18 }} />
                        </Button>
                      </Stack>
                    </Box>
                  </Paper>
                </Grid>

                {/* Account Protection Info Card */}
                <Grid item xs={12} md={6} lg={7}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: "20px",
                      bgcolor: "#ffffff",
                      border: "1px solid #edf2f7",
                      boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                      p: { xs: 2.5, sm: 3.5 },
                      height: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1 }}>
                      <LockIcon sx={{ fontSize: 22, color: "#102c4a" }} />
                      <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: "#0f172a" }}>
                        Account Protection
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "#64748b", fontSize: "0.83rem", mb: 2.5 }}>
                      Security recommendations and current protection status for your account.
                    </Typography>

                    <Stack spacing={2}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "14px",
                          bgcolor: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <CheckCircleIcon sx={{ fontSize: 22, color: "#16a34a" }} />
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#166534" }}>
                            Account Status: Active & Protected
                          </Typography>
                          <Typography sx={{ fontSize: "0.78rem", color: "#15803d", mt: 0.2 }}>
                            Your session is secured using token-based authentication.
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          p: 2,
                          borderRadius: "14px",
                          bgcolor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Typography sx={{ fontWeight: 700, fontSize: "0.82rem", color: "#334155", mb: 0.6 }}>
                          Password Best Practices
                        </Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "#64748b", lineHeight: 1.6 }}>
                          • Use a strong password with letters, numbers, and special symbols.<br />
                          • Avoid reusing passwords across different systems.<br />
                          • Regularly update your password to maintain high security.
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
          )}

          {/* ── Tab 2: System Configuration (For Super Admin) ── */}
          {tabValue === 2 && isSuperAdmin && (
            <motion.div {...fadeUp(0.05)}>
              {configLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 10 }}>
                  <CircularProgress size={32} sx={{ color: "#102c4a" }} />
                </Box>
              ) : (
                <Box>
                  {/* Top Bar with Status & Actions */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      mb: 3,
                      borderRadius: "18px",
                      bgcolor: "#ffffff",
                      border: "1px solid #edf2f7",
                      boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          px: 1.8,
                          py: 0.7,
                          borderRadius: "12px",
                          bgcolor: configuredCount === totalConfig ? "#f0fdf4" : "#eef4fa",
                          border: `1px solid ${configuredCount === totalConfig ? "#bbf7d0" : "#cbd5e1"}`,
                        }}
                      >
                        {configuredCount === totalConfig ? (
                          <CheckCircleIcon sx={{ fontSize: 18, color: "#16a34a" }} />
                        ) : (
                          <ErrorOutlineIcon sx={{ fontSize: 18, color: "#102c4a" }} />
                        )}
                        <Typography
                          sx={{
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: configuredCount === totalConfig ? "#16a34a" : "#102c4a",
                          }}
                        >
                          {configuredCount}/{totalConfig} Keys Configured
                        </Typography>
                      </Box>
                      <Typography sx={{ color: "#64748b", fontSize: "0.82rem", display: { xs: "none", sm: "block" } }}>
                        All keys are encrypted and secured on the server.
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Tooltip title="Refresh Configuration">
                        <IconButton
                          size="small"
                          onClick={() => dispatch(getConfig())}
                          disabled={configLoading}
                          sx={{
                            color: "#102c4a",
                            p: 0.9,
                            bgcolor: "#eef4fa",
                            borderRadius: "10px",
                            "&:hover": { bgcolor: alpha("#102c4a", 0.12) },
                          }}
                        >
                          <RefreshIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>

                      {!isConfigEditing ? (
                        <Button
                          variant="contained"
                          startIcon={<EditIcon sx={{ fontSize: 16 }} />}
                          onClick={() => setIsConfigEditing(true)}
                          sx={{
                            height: 38,
                            borderRadius: "10px",
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            bgcolor: "#102c4a",
                            textTransform: "none",
                            px: 2,
                            boxShadow: "0 2px 8px rgba(16, 44, 74, 0.2)",
                            "&:hover": { bgcolor: "#1e4f7a" },
                          }}
                        >
                          Edit Configuration
                        </Button>
                      ) : (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon sx={{ fontSize: 16 }} />}
                            onClick={() => setShowDeleteConfirm(true)}
                            disabled={configDeleteLoading || configUpdateLoading}
                            sx={{ height: 38, borderRadius: "10px", fontWeight: 700, fontSize: "0.8rem", textTransform: "none" }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={handleCancelConfig}
                            disabled={configUpdateLoading}
                            sx={{
                              height: 38,
                              borderRadius: "10px",
                              fontWeight: 700,
                              fontSize: "0.8rem",
                              borderColor: "#e2e8f0",
                              color: "#64748b",
                              textTransform: "none",
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
                            onClick={handleSaveConfig}
                            disabled={configUpdateLoading}
                            sx={{
                              height: 38,
                              borderRadius: "10px",
                              fontWeight: 700,
                              fontSize: "0.8rem",
                              bgcolor: "#102c4a",
                              textTransform: "none",
                              "&:hover": { bgcolor: "#1e4f7a" },
                            }}
                          >
                            {configUpdateLoading ? "Saving..." : "Save Config"}
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Paper>

                  {/* Delete Confirmation Alert */}
                  <AnimatePresence>
                    {showDeleteConfirm && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                        <Paper
                          sx={{
                            p: 2,
                            mb: 3,
                            bgcolor: "#fef2f2",
                            border: "1px solid #fecaca",
                            borderRadius: "14px",
                          }}
                        >
                          <Typography sx={{ display: "block", mb: 1.2, color: "#991b1b", fontSize: "0.85rem", fontWeight: 600 }}>
                            Delete entire configuration? This will remove all payment and email keys.
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleDeleteConfig}
                              disabled={configDeleteLoading}
                              sx={{
                                borderRadius: "8px",
                                fontWeight: 700,
                                fontSize: "0.78rem",
                                bgcolor: "#ef4444",
                                textTransform: "none",
                                "&:hover": { bgcolor: "#dc2626" },
                              }}
                            >
                              {configDeleteLoading ? "Deleting..." : "Yes, Delete"}
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => setShowDeleteConfirm(false)}
                              sx={{ borderRadius: "8px", fontWeight: 700, fontSize: "0.78rem", textTransform: "none" }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Paper>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Configuration Cards Grid */}
                  <Grid container spacing={{ xs: 2.5, md: 3 }} alignItems="stretch">
                    {configSections.map((section) => {
                      const sectionConfiguredCount = section.fields.filter(f => configViewData[f.name]).length;
                      const isAllConfigured = sectionConfiguredCount === section.fields.length;

                      return (
                        <Grid item xs={12} md={6} key={section.title} sx={{ display: "flex" }}>
                          <Paper
                            elevation={0}
                            sx={{
                              width: "100%",
                              borderRadius: "20px",
                              bgcolor: "#ffffff",
                              border: "1px solid #edf2f7",
                              boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                              p: { xs: 2.5, sm: 3.5 },
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {/* Card Header */}
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Box
                                  sx={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: "14px",
                                    bgcolor: "#eef4fa",
                                    color: "#102c4a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 4px 12px rgba(16, 44, 74, 0.12)",
                                  }}
                                >
                                  {React.cloneElement(section.icon, { sx: { fontSize: 22 } })}
                                </Box>
                                <Box>
                                  <Typography sx={{ fontWeight: 800, fontSize: "1.05rem", color: "#0f172a" }}>
                                    {section.title}
                                  </Typography>
                                  <Typography sx={{ color: "#64748b", fontSize: "0.78rem" }}>
                                    {section.subtitle}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Section Status Badge */}
                              <Box
                                sx={{
                                  px: 1.2,
                                  py: 0.4,
                                  borderRadius: "8px",
                                  bgcolor: isAllConfigured ? "#f0fdf4" : "#fff7ed",
                                  border: `1px solid ${isAllConfigured ? "#bbf7d0" : "#fed7aa"}`,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.6,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",
                                    bgcolor: isAllConfigured ? "#16a34a" : "#f97316",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: "0.74rem",
                                    fontWeight: 700,
                                    color: isAllConfigured ? "#16a34a" : "#ea580c",
                                  }}
                                >
                                  {sectionConfiguredCount}/{section.fields.length} Active
                                </Typography>
                              </Box>
                            </Box>

                            {/* Full-width soft divider */}
                            <Box
                              sx={{
                                height: "1.5px",
                                my: 2.5,
                                mx: { xs: -2.5, sm: -3.5 },
                                background: "linear-gradient(90deg, rgba(16,44,74,0.12) 0%, rgba(16,44,74,0.25) 50%, rgba(16,44,74,0.12) 100%)",
                              }}
                            />

                            {/* Form Fields Stack */}
                            <Stack spacing={2} sx={{ flex: 1, justifyContent: "space-evenly" }}>
                              {section.fields.map(({ name, label, icon, secret }) => (
                                <ConfigField
                                  key={name}
                                  label={label}
                                  icon={icon}
                                  isSecret={secret}
                                  isEditing={isConfigEditing}
                                  fieldName={name}
                                  value={configViewData[name]}
                                  editValue={configFormData[name]}
                                  onChange={handleConfigChange}
                                  showSecretKeys={showSecretKeys}
                                  onToggleSecret={toggleSecretKey}
                                />
                              ))}
                            </Stack>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Sign Out Modal */}
        <LogoutModal
          show={showLogoutModal}
          onHide={() => setShowLogoutModal(false)}
          onConfirm={handleConfirmLogout}
          title="Sign Out"
          message="Are you sure you want to sign out?"
          subMessage="You will be redirected to the login page."
        />
      </Container>
    </Box>
  );
};

export default Profile;