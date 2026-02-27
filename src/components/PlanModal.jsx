import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  alpha,
  Avatar,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const PlanModal = ({
  show,
  onClose,
  onSubmit,
  planData,
  handleChange,
  planOptions = [],
  durationOptions = [],
}) => {
  return (
    <AnimatePresence>
      {show && (
        <Dialog
          open={show}
          onClose={onClose}
          maxWidth="md"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, y: 50, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 50, scale: 0.9 },
            transition: { duration: 0.3 },
            sx: {
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
              bgcolor: "white", // White background for the main dialog
            },
          }}
        >
          {/* Header - Kept gradient as it's a header */}
          <DialogTitle
            sx={{
              background: "linear-gradient(135deg, #0f766e, #0a5c55)",
              color: "white",
              py: 3,
              px: 4,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                width: 40,
                height: 40,
              }}
            >
              {planData._id ? <EditIcon /> : <AddIcon />}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} color="white">
                {planData._id ? "Edit Plan" : "Add New Plan"}
              </Typography>
              <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.8) }}>
                {planData._id ? "Update plan details below" : "Fill in the details to create a new plan"}
              </Typography>
            </Box>
          </DialogTitle>

          {/* Body - White background */}
          <DialogContent sx={{ p: 4, bgcolor: "white" }}>
            <Grid container spacing={3}>
              {/* Plan Type */}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  name="name"
                  label="Plan Type"
                  value={planData.name || ""}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                    },
                  }}
                >
                  <MenuItem value="">Select Plan Type</MenuItem>
                  {planOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Duration */}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  name="duration"
                  label="Duration"
                  value={planData.duration || ""}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                    },
                  }}
                >
                  <MenuItem value="">Select Duration</MenuItem>
                  {durationOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={planData.description || ""}
                  onChange={handleChange}
                  placeholder="Enter plan description"
                  multiline
                  rows={2}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                    },
                  }}
                />
              </Grid>

              {/* Min Users */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="minUsers"
                  label="Minimum Users"
                  value={planData.minUsers || ""}
                  onChange={handleChange}
                  placeholder="Enter minimum number of users"
                  InputProps={{ inputProps: { min: 0 } }}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                    },
                  }}
                />
              </Grid>

              {/* Max Users */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="maxUsers"
                  label="Maximum Users"
                  value={planData.maxUsers || ""}
                  onChange={handleChange}
                  placeholder="Enter maximum number of users"
                  InputProps={{ inputProps: { min: 0 } }}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                    },
                  }}
                />
              </Grid>

              {/* Price */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  name="price"
                  label="Price (₹)"
                  value={planData.price || ""}
                  onChange={handleChange}
                  placeholder="Enter plan price"
                  InputProps={{ inputProps: { min: 0 } }}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#ffffff",
                    },
                  }}
                />
              </Grid>

              {/* Status - Only for editing */}
              {planData._id && (
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    name="status"
                    label="Status"
                    value={planData.status || "active"}
                    onChange={handleChange}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#ffffff",
                      },
                    }}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                </Grid>
              )}
            </Grid>
          </DialogContent>

          {/* Footer - White background */}
          <DialogActions
            sx={{
              p: 3,
              pt: 2,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              borderTop: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              bgcolor: "white",
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                minWidth: 120,
                py: 1,
                borderRadius: 2,
                borderColor: "#e2e8f0",
                color: "#64748b",
                fontWeight: 600,
                bgcolor: "white",
                "&:hover": {
                  borderColor: "#cbd5e1",
                  bgcolor: "#f8fafc",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={onSubmit}
              sx={{
                minWidth: 120,
                py: 1,
                borderRadius: 2,
                bgcolor: "#0f766e",
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "#0a5c55",
                },
              }}
            >
              {planData._id ? "Update Plan" : "Create Plan"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default PlanModal;