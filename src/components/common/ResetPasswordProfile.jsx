import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  alpha,
  Container,
  Stack,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  LockRounded as LockIcon,
  VisibilityRounded as VisibilityIcon,
  VisibilityOffRounded as VisibilityOffIcon,
  KeyRounded as KeyIcon,
  ArrowBackRounded as ArrowBackIcon,
  ShieldRounded as ShieldIcon,
  CheckCircleRounded as CheckCircleIcon,
  CancelRounded as CancelIcon,
  SecurityUpdateGoodRounded as SecurityIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { resetPassword } from "../../redux/slices/userSlice";
import { toast, ToastContainer } from "react-toastify";

const ResetPasswordProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user || {});
  const { user } = useSelector((state) => state.auth || {});

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (touched.oldPassword) {
      validateField("oldPassword", form.oldPassword);
    }
  }, [form.oldPassword, touched.oldPassword]);

  useEffect(() => {
    if (touched.newPassword) {
      validateField("newPassword", form.newPassword);
    }
  }, [form.newPassword, touched.newPassword]);

  useEffect(() => {
    if (touched.confirmPassword) {
      validateField("confirmPassword", form.confirmPassword);
    }
  }, [form.confirmPassword, form.newPassword, touched.confirmPassword]);

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "oldPassword":
        if (!value) error = "Current password is required";
        break;
      case "newPassword":
        if (!value) {
          error = "New password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) {
          error = "Must contain at least one letter and one number";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your new password";
        } else if (value !== form.newPassword) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return error;
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  };

  const handleChange = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
    setApiError("");

    if (touched[field]) {
      validateField(field, event.target.value);
    }
  };

  const validateForm = () => {
    const oldError = validateField("oldPassword", form.oldPassword);
    const newError = validateField("newPassword", form.newPassword);
    const confirmError = validateField("confirmPassword", form.confirmPassword);

    return !oldError && !newError && !confirmError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (validateForm()) {
      try {
        setApiError("");
        await dispatch(
          resetPassword({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          })
        ).unwrap();

        setSuccessMessage("Password has been reset successfully!");
        toast.success("Password reset successfully!");

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      } catch (err) {
        setApiError(err?.message || "Failed to reset password. Please check your current password.");
      }
    }
  };

  // Password requirements calculation
  const hasMinLength = form.newPassword.length >= 6;
  const hasLetterAndNumber = /(?=.*[A-Za-z])(?=.*\d)/.test(form.newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword);
  const passwordsMatch = form.confirmPassword && form.confirmPassword === form.newPassword;

  // Strength score
  const calculateStrength = () => {
    if (!form.newPassword) return 0;
    let score = 0;
    if (form.newPassword.length >= 6) score += 35;
    if (/(?=.*[A-Za-z])(?=.*\d)/.test(form.newPassword)) score += 35;
    if (hasSpecialChar || form.newPassword.length >= 10) score += 30;
    return Math.min(score, 100);
  };

  const strength = calculateStrength();
  const getStrengthMeta = () => {
    if (strength === 0) return { label: "", color: "#cbd5e1" };
    if (strength < 40) return { label: "Weak", color: "#ef4444" };
    if (strength < 75) return { label: "Medium", color: "#f59e0b" };
    return { label: "Strong", color: "#10b981" };
  };
  const strengthMeta = getStrengthMeta();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        bgcolor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },
        position: "relative",
      }}
    >
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

      {/* Decorative background glow */}
      <Box
        sx={{
          position: "absolute",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 44, 74, 0.06) 0%, rgba(16, 44, 74, 0) 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth="xs" disableGutters sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Main Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "20px",
              bgcolor: "#ffffff",
              border: "1px solid #e2e8f0",
              boxShadow: "0 12px 36px -8px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03)",
              width: "100%",
            }}
          >
            {/* Top Icon Badge & Title Header */}
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "16px",
                  bgcolor: "#eef4fa",
                  color: "#102c4a",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1.5,
                  boxShadow: "0 4px 14px rgba(16, 44, 74, 0.12)",
                }}
              >
                <KeyIcon sx={{ fontSize: 26 }} />
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#0f172a",
                  fontSize: { xs: "1.35rem", sm: "1.45rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                Reset Password
              </Typography>

              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.84rem",
                  mt: 0.5,
                  lineHeight: 1.4,
                }}
              >
                Enter your current password and choose a new secure one
              </Typography>
            </Box>

            {/* Full-width soft line */}
            <Box
              sx={{
                height: "1.5px",
                my: 2.5,
                mx: { xs: -3, sm: -4 },
                background: "linear-gradient(90deg, rgba(16,44,74,0.12) 0%, rgba(16,44,74,0.25) 50%, rgba(16,44,74,0.12) 100%)",
              }}
            />

            {/* Success Feedback Alert */}
            <AnimatePresence>
              {successMessage && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <Alert
                    severity="success"
                    sx={{
                      mb: 2,
                      borderRadius: "10px",
                      bgcolor: "#f0fdf4",
                      color: "#166534",
                      border: "1px solid #bbf7d0",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                    }}
                  >
                    {successMessage}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Feedback Alert */}
            <AnimatePresence>
              {apiError && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <Alert
                    severity="error"
                    sx={{
                      mb: 2,
                      borderRadius: "10px",
                      bgcolor: "#fef2f2",
                      color: "#991b1b",
                      border: "1px solid #fecaca",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                    }}
                  >
                    {apiError}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset Form */}
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {/* Current / Old Password */}
                <Box>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", mb: 0.6 }}>
                    Current Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword.old ? "text" : "password"}
                    placeholder="Enter your current password"
                    value={form.oldPassword}
                    onChange={handleChange("oldPassword")}
                    onBlur={handleBlur("oldPassword")}
                    error={touched.oldPassword && !form.oldPassword}
                    helperText={touched.oldPassword && !form.oldPassword ? "Current password is required" : ""}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        bgcolor: "#ffffff",
                        fontSize: "0.88rem",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease",
                        "&:hover fieldset": { borderColor: "#102c4a" },
                        "&.Mui-focused fieldset": { borderColor: "#102c4a", borderWidth: "1.5px" },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#102c4a", fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={showPassword.old ? "Hide password" : "Show password"}>
                            <IconButton onClick={() => toggleVisibility("old")} edge="end" size="small" sx={{ color: "#94a3b8" }}>
                              {showPassword.old ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* New Password */}
                <Box>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", mb: 0.6 }}>
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword.new ? "text" : "password"}
                    placeholder="Create new password"
                    value={form.newPassword}
                    onChange={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    error={touched.newPassword && !!errors.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        bgcolor: "#ffffff",
                        fontSize: "0.88rem",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease",
                        "&:hover fieldset": { borderColor: "#102c4a" },
                        "&.Mui-focused fieldset": { borderColor: "#102c4a", borderWidth: "1.5px" },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon sx={{ color: "#102c4a", fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={showPassword.new ? "Hide password" : "Show password"}>
                            <IconButton onClick={() => toggleVisibility("new")} edge="end" size="small" sx={{ color: "#94a3b8" }}>
                              {showPassword.new ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Password Strength Progress Bar */}
                  {form.newPassword && (
                    <Box sx={{ mt: 1, px: 0.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.4 }}>
                        <Typography sx={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600 }}>
                          Strength
                        </Typography>
                        <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: strengthMeta.color }}>
                          {strengthMeta.label}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={strength}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          bgcolor: "#f1f5f9",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: strengthMeta.color,
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Confirm New Password */}
                <Box>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "#334155", mb: 0.6 }}>
                    Confirm New Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        bgcolor: "#ffffff",
                        fontSize: "0.88rem",
                        borderColor: "#e2e8f0",
                        transition: "all 0.2s ease",
                        "&:hover fieldset": { borderColor: "#102c4a" },
                        "&.Mui-focused fieldset": { borderColor: "#102c4a", borderWidth: "1.5px" },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ShieldIcon sx={{ color: "#102c4a", fontSize: 18 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title={showPassword.confirm ? "Hide password" : "Show password"}>
                            <IconButton onClick={() => toggleVisibility("confirm")} edge="end" size="small" sx={{ color: "#94a3b8" }}>
                              {showPassword.confirm ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                {/* Security Requirement Checklist */}
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "10px",
                    bgcolor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#475569", mb: 0.6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Security Requirements
                  </Typography>
                  <Stack spacing={0.5}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      {hasMinLength ? (
                        <CheckCircleIcon sx={{ fontSize: 13, color: "#16a34a" }} />
                      ) : (
                        <Box sx={{ width: 13, height: 13, borderRadius: "50%", border: "1.5px solid #cbd5e1" }} />
                      )}
                      <Typography sx={{ fontSize: "0.74rem", color: hasMinLength ? "#16a34a" : "#64748b", fontWeight: hasMinLength ? 600 : 400 }}>
                        At least 6 characters
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      {hasLetterAndNumber ? (
                        <CheckCircleIcon sx={{ fontSize: 13, color: "#16a34a" }} />
                      ) : (
                        <Box sx={{ width: 13, height: 13, borderRadius: "50%", border: "1.5px solid #cbd5e1" }} />
                      )}
                      <Typography sx={{ fontSize: "0.74rem", color: hasLetterAndNumber ? "#16a34a" : "#64748b", fontWeight: hasLetterAndNumber ? 600 : 400 }}>
                        Contains letters and numbers
                      </Typography>
                    </Box>

                    {form.confirmPassword && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        {passwordsMatch ? (
                          <CheckCircleIcon sx={{ fontSize: 13, color: "#16a34a" }} />
                        ) : (
                          <CancelIcon sx={{ fontSize: 13, color: "#ef4444" }} />
                        )}
                        <Typography sx={{ fontSize: "0.74rem", color: passwordsMatch ? "#16a34a" : "#ef4444", fontWeight: 600 }}>
                          {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Box>

                {/* Submit Action Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={
                    loading ||
                    !form.oldPassword ||
                    !form.newPassword ||
                    !form.confirmPassword ||
                    Object.values(errors).some(Boolean)
                  }
                  sx={{
                    height: 42,
                    mt: 0.8,
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    textTransform: "none",
                    bgcolor: "#102c4a",
                    color: "#ffffff",
                    boxShadow: "0 4px 12px rgba(16, 44, 74, 0.25)",
                    "&:hover": {
                      bgcolor: "#1e4f7a",
                      boxShadow: "0 6px 16px rgba(16, 44, 74, 0.32)",
                    },
                    "&.Mui-disabled": {
                      bgcolor: "#cbd5e1",
                      color: "#94a3b8",
                      boxShadow: "none",
                    },
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={16} sx={{ color: "#ffffff" }} />
                      <span>Updating Password...</span>
                    </Box>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </Stack>
            </form>

            {/* Back to Profile Navigation */}
            <Box sx={{ textAlign: "center", mt: 2.2 }}>
              <Button
                variant="text"
                onClick={() => navigate("/profile")}
                startIcon={<ArrowBackIcon sx={{ fontSize: 15 }} />}
                sx={{
                  color: "#64748b",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 0.6,
                  px: 1.5,
                  "&:hover": {
                    color: "#102c4a",
                    bgcolor: alpha("#102c4a", 0.06),
                  },
                }}
              >
                Back to Profile
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResetPasswordProfile;