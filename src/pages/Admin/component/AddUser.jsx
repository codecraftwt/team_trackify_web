import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
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
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, updateUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";

const AddUser = ({ open, onClose, editingUser = null }) => {
  const dispatch = useDispatch();
  const userDataa = JSON.parse(localStorage.getItem("user"));
  const role_id = userDataa?.role_id;
  const userData = useSelector((state) => state.user?.userInfo || {});
  const loading = useSelector((state) => state.user?.loading || false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    status: "active",
    avtar: null,
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
      });
      setImageRemoved(false);

      if (editingUser.avtar) {
        setPreviewImage(editingUser.avtar);
      }
    } else {
      // Reset form when opening for new user
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        address: "",
        status: "active",
        avtar: null,
      });
      setPreviewImage(null);
      setErrors({});
      setTouched({});
      setImageRemoved(false);
    }
  }, [editingUser, open]);

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
    if (role_id === 1) {
      return label.replace("Admin", "User");
    }
    return label;
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
    payload.append("createdby", userData._id || userDataa?._id);
    payload.append("mobile_no", formData.mobile);
    payload.append("address", formData.address);
    payload.append("isActive", formData.status === "active");

    if (editingUser) {
      payload.append("role_id", editingUser.role_id);
    } else {
      payload.append("role_id", role_id === 2 ? 1 : 0);
    }

    if (formData.avtar) {
      payload.append("avtar", formData.avtar);
    }

    if (editingUser && imageRemoved) {
      payload.append("removeAvtar", "true");
    }

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
      onClose(true); // Pass true to indicate success and refresh data
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.message || "Operation failed");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        },
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <Box
              sx={{
                bgcolor: "#0f766e",
                py: 2.5,
                px: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: alpha("#ffffff", 0.2),
                    color: "white",
                    width: 40,
                    height: 40,
                  }}
                >
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600} color="white">
                    {editingUser
                      ? getRoleBasedLabel("Edit Admin")
                      : getRoleBasedLabel("Add New Admin")}
                  </Typography>
                  <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.8) }}>
                    {editingUser
                      ? "Update the information below"
                      : "Fill in the details to create a new account"}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={handleClose}
                sx={{
                  color: "white",
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.1),
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={2.5}>
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
                            width: 80,
                            height: 80,
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
                </Grid>
              </DialogContent>

              {/* Actions */}
              <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  sx={{
                    flex: 1,
                    py: 1,
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
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    flex: 1,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: "#0f766e",
                    "&:hover": {
                      bgcolor: "#0a5c55",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : editingUser ? (
                    getRoleBasedLabel("Update Admin")
                  ) : (
                    getRoleBasedLabel("Register Admin")
                  )}
                </Button>
              </DialogActions>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default AddUser;