import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  alpha,
  Avatar,
} from "@mui/material";
import {
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Key as KeyIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { resetPassword } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

const ResetPasswordProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user || {});
  const { user, role_id } = useSelector((state) => state.auth || {});

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
        if (!value) error = "Old password is required";
        break;
      case "newPassword":
        if (!value) {
          error = "New password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value)) {
          error = "Password must contain at least one letter and one number";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
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

        setSuccessMessage("Password reset successfully!");
        toast.success("Password reset successfully!");

        setTimeout(() => {
          // Redirect based on role
          if (role_id === 2) {
            navigate("/profile");
          } else {
            navigate("/profile");
          }
        }, 2000);
      } catch (err) {
        setApiError(err?.message || "Failed to reset password");
      }
    }
  };

  const handleBackToProfile = () => {
    if (role_id === 2) {
      navigate("profile");
    } else {
      navigate("/profile");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        bgcolor: "#f8fafc",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(15, 118, 110, 0.05) 0%, rgba(15, 118, 110, 0.02) 90%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha("#0f766e", 0.1),
                    color: "#0f766e",
                    width: 70,
                    height: 70,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <KeyIcon sx={{ fontSize: 35 }} />
                </Avatar>
                <Typography variant="h4" fontWeight={700} sx={{ color: "#0f766e" }}>
                  Reset Password
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Enter your old password and choose a new one
                </Typography>
              </Box>
            </motion.div>

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  {successMessage}
                </Alert>
              </motion.div>
            )}

            {/* API Error Message */}
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {apiError}
                </Alert>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants}>
                {/* Old Password */}
                <TextField
                  fullWidth
                  type={showPassword.old ? "text" : "password"}
                  label="Old Password"
                  value={form.oldPassword}
                  onChange={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  error={touched.oldPassword && !!errors.oldPassword}
                  helperText={touched.oldPassword && errors.oldPassword}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#0f766e" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility("old")}
                          edge="end"
                        >
                          {showPassword.old ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                {/* New Password */}
                <TextField
                  fullWidth
                  type={showPassword.new ? "text" : "password"}
                  label="New Password"
                  value={form.newPassword}
                  onChange={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  error={touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#0f766e" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility("new")}
                          edge="end"
                        >
                          {showPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                {/* Confirm Password */}
                <TextField
                  fullWidth
                  type={showPassword.confirm ? "text" : "password"}
                  label="Confirm New Password"
                  value={form.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#0f766e" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => toggleVisibility("confirm")}
                          edge="end"
                        >
                          {showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={
                    loading ||
                    !form.oldPassword ||
                    !form.newPassword ||
                    !form.confirmPassword ||
                    Object.values(errors).some((error) => error)
                  }
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: "#0f766e",
                    "&:hover": {
                      bgcolor: "#0a5c55",
                    },
                    "&.Mui-disabled": {
                      bgcolor: alpha("#0f766e", 0.3),
                    },
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={20} sx={{ color: "white" }} />
                      <span>Resetting...</span>
                    </Box>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Back to Profile Link */}
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button
                  variant="text"
                  onClick={handleBackToProfile}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    color: "#0f766e",
                    "&:hover": {
                      bgcolor: alpha("#0f766e", 0.1),
                    },
                  }}
                >
                  Back to Profile
                </Button>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResetPasswordProfile;