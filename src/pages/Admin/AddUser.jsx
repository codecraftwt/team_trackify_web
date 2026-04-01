import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  InputAdornment,
  CircularProgress,
  Alert,
  alpha,
  Chip,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  CameraAlt as CameraIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, updateUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";

const AddUser = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDataa = JSON.parse(localStorage.getItem("user"));
  const role_id = userDataa?.role_id;

  const editingUser = location.state?.user || null;
  const profileEditing = location.state?.profileEditing || false;
  
  const { loading } = useSelector((state) => state.user || {});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    status: "active",
    avtar: null,
    role_id: 0, // Default to Staff
    adminPanelAccess: true, // Default to true
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    avtar: "",
  });

  const [touched, setTouched] = useState({});
  const [imageRemoved, setImageRemoved] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        fullName: editingUser.name || "",
        email: editingUser.email || "",
        mobile: editingUser.mobile_no || "",
        address: editingUser.address || "",
        status: editingUser?.isActive ? "active" : "inactive",
        avtar: null,
        adminPanelAccess: (Number(editingUser.role_id) === 3) || (editingUser.permissions?.includes("admin_panel_access") ?? true),
      });
      setImageRemoved(false);

      if (editingUser.avtar) {
        setPreviewImage(editingUser.avtar);
      }
    }
  }, [editingUser]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value?.trim()) error = "Full name is required";
        else if (value.length < 3) error = "Name must be at least 3 characters";
        break;
      case "email":
        if (!value?.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!editingUser) {
          if (!value?.trim()) error = "Password is required";
          else if (value.length < 6)
            error = "Password must be at least 6 characters";
          else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(value))
            error = "Password must contain at least one letter and one number";
        }
        break;
      case "confirmPassword":
        if (!editingUser) {
          if (!value?.trim()) error = "Please confirm password";
          else if (value !== formData.password) error = "Passwords don't match";
        }
        break;
      case "mobile":
        if (!value?.trim()) error = "Mobile number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Invalid mobile number (10 digits required)";
        break;
      case "address":
        if (!value?.trim()) error = "Address is required";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, avtar: "File size should be less than 5MB" });
        return;
      }
      setErrors({ ...errors, avtar: "" });
      setFormData({ ...formData, avtar: file });
      setPreviewImage(URL.createObjectURL(file));
      setImageRemoved(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, avtar: null });
    setPreviewImage(null);
    setImageRemoved(true);
    setErrors({ ...errors, avtar: "" });
  };

  const getRoleBasedLabel = (label) => {
    if (role_id === 1 || role_id === 3) {
      return label.replace("Admin", "User");
    }
    return label;
  };

  const getRoleBasedName = (name) => {
    if (role_id === 1 || role_id === 3) {
      return name.replace("Organization", "User").replace("Admin", "User");
    }
    return name;
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      mobile: validateField("mobile", formData.mobile),
      address: validateField("address", formData.address),
    };

    if (!editingUser) {
      newErrors.password = validateField("password", formData.password);
      newErrors.confirmPassword = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("name", formData.fullName);
    payload.append("email", formData.email);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("isActive", formData.status === "active");

    // Set role_id based on creator and adminPanelAccess checkbox
    if (!editingUser) {
      if (role_id === 2) {
        payload.append("role_id", 1); // Super Admin creates Admin
      } else if (role_id === 1) {
        // Admin (Role 1) creates based on checkbox
        payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
      } else {
        // Others only create Staff
        payload.append("role_id", 0);
      }
      payload.append("createdby", userDataa?._id);
    } else if (role_id === 1 && (Number(editingUser.role_id) === 0 || Number(editingUser.role_id) === 3)) {
      // During edit, Admin can also toggle between Staff and Sub-admin
      payload.append("role_id", formData.adminPanelAccess ? 3 : 0);
      payload.append("createdby", editingUser.createdby || userDataa?._id);
    } else if (editingUser) {
      payload.append("role_id", editingUser.role_id);
      payload.append("createdby", editingUser.createdby || userDataa?._id);
    }

    if (formData.avtar) {
      payload.append("avtar", formData.avtar);
    }

    if (editingUser && imageRemoved) {
      payload.append("removeAvtar", "true");
    }

    // Set permissions based on checkbox
    const permissions = formData.adminPanelAccess ? ["admin_panel_access"] : [];
    payload.append("permissions", JSON.stringify(permissions));

    try {
      if (editingUser) {
        await dispatch(
          updateUser({ userId: editingUser._id, formData: payload })
        ).unwrap();
        toast.success("User updated successfully!");
      } else {
        payload.append("password", formData.password);
        payload.append("confirmPassword", formData.confirmPassword);
        await dispatch(registerUser(payload)).unwrap();
        toast.success("User created successfully!");
      }

      if (profileEditing) {
        navigate("/admin/profile");
      } else {
        navigate("/user");
      }
    } catch (error) {
      toast.error(error?.message || "Operation failed");
    }
  };

  const handleCancel = () => {
    if (profileEditing) {
      navigate("/admin/profile");
    } else {
      navigate("/user");
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
                bgcolor: "#0f766e",
                py: 3,
                px: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: alpha("#ffffff", 0.2),
                  color: "white",
                  width: 48,
                  height: 48,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={600} color="white">
                  {editingUser
                    ? getRoleBasedLabel("Edit Admin Details")
                    : getRoleBasedLabel("Register New Admin")}
                </Typography>
                <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8) }}>
                  {editingUser
                    ? "Update the information below"
                    : "Fill in the details to create a new account"}
                </Typography>
              </Box>
            </Box>

            {/* Form */}
            <Box sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {/* Full Name */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="fullName"
                      label={editingUser ? "User Name" : "Organization Name"}
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.fullName && touched.fullName}
                      helperText={touched.fullName && errors.fullName}
                      required
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#0f766e", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#0f766e",
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.email && touched.email}
                      helperText={touched.email && errors.email}
                      required
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#0f766e", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#0f766e",
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* Password Fields - Only for new users */}
                  {!editingUser && (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="password"
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.password && touched.password}
                          helperText={touched.password && errors.password}
                          required
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: "#0f766e", fontSize: 20 }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                  size="small"
                                >
                                  {showPassword ? (
                                    <VisibilityOffIcon fontSize="small" />
                                  ) : (
                                    <VisibilityIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#0f766e",
                              },
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.confirmPassword && touched.confirmPassword}
                          helperText={touched.confirmPassword && errors.confirmPassword}
                          required
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon sx={{ color: "#0f766e", fontSize: 20 }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  edge="end"
                                  size="small"
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOffIcon fontSize="small" />
                                  ) : (
                                    <VisibilityIcon fontSize="small" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "#0f766e",
                              },
                            },
                          }}
                        />
                      </Grid>
                    </>
                  )}

                  {/* Mobile Number */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="mobile"
                      label="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.mobile && touched.mobile}
                      helperText={touched.mobile && errors.mobile}
                      required
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: "#0f766e", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#0f766e",
                          },
                        },
                      }}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="address"
                      label="Address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={!!errors.address && touched.address}
                      helperText={touched.address && errors.address}
                      required
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon sx={{ color: "#0f766e", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "#0f766e",
                          },
                        },
                      }}
                    />
                  </Grid>



                  {/* Status - Only if not editing own profile */}
                  {editingUser?._id !== userDataa?._id && (
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ color: "#1e293b", fontWeight: 500, fontSize: "0.9rem" }}>
                          Account Status
                        </FormLabel>
                        <RadioGroup
                          row
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="active"
                            control={<Radio size="small" sx={{ color: "#0f766e" }} />}
                            label={
                              <Chip
                                label="Active"
                                size="small"
                                sx={{
                                  bgcolor: alpha("#22c55e", 0.1),
                                  color: "#22c55e",
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                }}
                              />
                            }
                          />
                          <FormControlLabel
                            value="inactive"
                            control={<Radio size="small" sx={{ color: "#0f766e" }} />}
                            label={
                              <Chip
                                label="Inactive"
                                size="small"
                                sx={{
                                  bgcolor: alpha("#64748b", 0.1),
                                  color: "#64748b",
                                  fontWeight: 600,
                                  fontSize: "0.75rem",
                                }}
                              />
                            }
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  )}

                  {/* Admin Panel Access Checkbox - For Admin (1) creating/editing Staff or Sub-admin */}
                  {role_id === 1 && (Number(editingUser?.role_id) === 0 || Number(editingUser?.role_id) === 3 || !editingUser) && (
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formData.adminPanelAccess}
                            onChange={(e) => setFormData({ ...formData, adminPanelAccess: e.target.checked, role_id: e.target.checked ? 3 : 0 })}
                            sx={{
                              color: "#0f766e",
                              '&.Mui-checked': {
                                color: "#0f766e",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                            Allow Admin Panel Access (Set as Sub-admin)
                          </Typography>
                        }
                      />
                    </Grid>
                  )}

                  {/* Profile Photo */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: "#1e293b", fontWeight: 600, fontSize: "0.9rem" }}>
                      Profile Photo
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CameraIcon />}
                        size="small"
                        sx={{
                          borderColor: "#0f766e",
                          color: "#0f766e",
                          borderRadius: 2,
                          "&:hover": {
                            borderColor: "#0a5c55",
                            bgcolor: alpha("#0f766e", 0.1),
                          },
                        }}
                      >
                        Upload Photo
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </Button>
                      
                      <Typography variant="caption" color="text.secondary">
                        JPG, PNG, GIF up to 5MB
                      </Typography>
                    </Box>

                    {errors.avtar && (
                      <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }} icon={<CloseIcon fontSize="small" />}>
                        {errors.avtar}
                      </Alert>
                    )}

                    {/* Image Preview */}
                    {(previewImage || (editingUser?.avtar && !imageRemoved)) && (
                      <Box
                        sx={{
                          mt: 2,
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <Avatar
                          src={previewImage || editingUser?.avtar}
                          sx={{
                            width: 100,
                            height: 100,
                            border: "3px solid",
                            borderColor: "#0f766e",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={removeImage}
                          sx={{
                            position: "absolute",
                            top: -8,
                            right: -8,
                            bgcolor: "#ef4444",
                            color: "white",
                            width: 24,
                            height: 24,
                            "&:hover": {
                              bgcolor: "#dc2626",
                            },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                  </Grid>

                  {/* Submit Buttons */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          bgcolor: "#0f766e",
                          "&:hover": {
                            bgcolor: "#0a5c55",
                          },
                        }}
                      >
                        {loading ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircularProgress size={20} sx={{ color: "white" }} />
                            <span>Processing...</span>
                          </Box>
                        ) : editingUser ? (
                          getRoleBasedLabel("Update Admin")
                        ) : (
                          getRoleBasedLabel("Register Admin")
                        )}
                      </Button>

                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          borderColor: "#e2e8f0",
                          color: "#64748b",
                          "&:hover": {
                            borderColor: "#0f766e",
                            color: "#0f766e",
                            bgcolor: alpha("#0f766e", 0.1),
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AddUser;