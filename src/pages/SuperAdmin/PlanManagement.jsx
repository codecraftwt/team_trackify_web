import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  alpha,
  Avatar,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  createPlan,
  deletePlan,
  getAllPlans,
  updatePlan,
} from "../../redux/slices/planSlice";
import { toast } from "react-toastify";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import PlanModal from "../../components/PlanModal";

const PlanManagement = () => {
  const dispatch = useDispatch();
  const { plansList = [], loading, error } = useSelector((state) => state.plan || {});

  const [showModal, setShowModal] = useState(false);
  const [planData, setPlanData] = useState({
    id: null,
    name: "",
    description: "",
    minUsers: "",
    maxUsers: "",
    price: "",
    duration: "",
    status: "active",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const durationOptions = [
    "monthly",
    "3 months",
    "6 months",
    "9 months",
    "1 year",
  ];
  const planOptions = [
    "Standard Plan",
    "Premium Plan",
    "Enterprise Plan",
    "Custom Plan",
    "Add on Plan",
  ];

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const handleShow = () => {
    setPlanData({
      id: null,
      name: "",
      description: "",
      minUsers: "",
      maxUsers: "",
      price: "",
      duration: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if (planData._id) {
      dispatch(updatePlan({ planId: planData._id, updatedPlan: planData }))
        .unwrap()
        .then(() => {
          toast.success("Plan updated successfully!");
          handleClose();
        })
        .catch(() => {
          toast.error("Failed to update plan");
        });
    } else {
      dispatch(createPlan(planData))
        .unwrap()
        .then(() => {
          toast.success("Plan created successfully!");
          handleClose();
        })
        .catch((error) => {
          const errMsg = error?.message || "Failed to create plan";
          toast.error(errMsg);
        });
    }
  };

  const handleEdit = (plan) => {
    setPlanData({
      _id: plan._id,
      name: plan.name,
      description: plan.description,
      minUsers: plan.minUsers,
      maxUsers: plan.maxUsers,
      price: plan.price,
      duration: plan.duration || "monthly",
      status: plan.status || "active",
    });
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeletePlanId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletePlanId) {
      dispatch(deletePlan(deletePlanId))
        .unwrap()
        .then(() => {
          toast.success("Plan deleted successfully!");
          setShowDeleteModal(false);
        })
        .catch(() => {
          toast.error("Failed to delete plan");
        });
    }
  };

  // Filter plans based on search
  const filteredPlans = plansList.filter(
    (plan) =>
      plan.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPlanIcon = (planName) => {
    if (planName?.includes("Enterprise")) return "👑";
    if (planName?.includes("Premium")) return "🛡️";
    return "👥";
  };

  const getPlanColor = (planName) => {
    if (planName?.includes("Enterprise")) return "#0f766e";
    if (planName?.includes("Premium")) return "#22c55e";
    if (planName?.includes("Standard")) return "#f59e0b";
    return "#64748b";
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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 4 }}>
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
                Plan Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create and manage all subscription plans
              </Typography>
            </Box>
          </motion.div>

          {/* Search Section */}
          <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <TextField
                placeholder="Search plans by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{
                  flex: 1,
                  minWidth: 250,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: alpha("#0f766e", 0.05),
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#0f766e" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleShow}
                sx={{
                  bgcolor: "#0f766e",
                  "&:hover": { bgcolor: "#0a5c55" },
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                }}
              >
                Add Plan
              </Button>
            </Paper>
          </motion.div>

          {/* Plans Table */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: alpha("#e2e8f0", 0.5),
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  p: 3,
                  background: "linear-gradient(135deg, #0f766e, #0a5c55)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600} color="white" gutterBottom>
                    Plans Overview
                  </Typography>
                  <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.8) }}>
                    Complete list of all subscription plans
                  </Typography>
                </Box>
                <Chip
                  label={`${filteredPlans.length} Results`}
                  size="medium"
                  icon={<PeopleIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    bgcolor: "white",
                    color: "#0f766e",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    px: 2,
                    py: 2.5,
                    "& .MuiChip-icon": {
                      color: "#0f766e",
                    },
                  }}
                />
              </Box>

              {/* Table */}
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                  <CircularProgress sx={{ color: "#0f766e" }} />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
                        <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Plan Details</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Users</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Duration</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1e293b" }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600, color: "#1e293b" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <AnimatePresence>
                        {filteredPlans.map((plan, index) => {
                          const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);
                          return (
                            <TableRow
                              key={plan._id}
                              component={motion.tr}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.02 }}
                              sx={{
                                "&:hover": {
                                  bgcolor: alpha("#0f766e", 0.05),
                                },
                              }}
                            >
                              <TableCell sx={{ bgcolor: rowBg, py: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                  <Avatar
                                    sx={{
                                      width: 36,
                                      height: 36,
                                      bgcolor: alpha(getPlanColor(plan.name), 0.1),
                                      color: getPlanColor(plan.name),
                                      fontSize: "1.2rem",
                                    }}
                                  >
                                    {getPlanIcon(plan.name)}
                                  </Avatar>
                                  <Typography variant="body2" fontWeight={600}>
                                    {plan.name}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell sx={{ bgcolor: rowBg }}>
                                <Chip
                                  label={`${plan.minUsers} - ${plan.maxUsers}`}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha("#64748b", 0.1),
                                    color: "#64748b",
                                    fontWeight: 500,
                                  }}
                                />
                              </TableCell>
                              <TableCell sx={{ bgcolor: rowBg }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    maxWidth: 200,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {plan.description}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ bgcolor: rowBg }}>
                                <Typography variant="body2" fontWeight={600} sx={{ color: "#22c55e" }}>
                                  ₹{plan.price}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ bgcolor: rowBg }}>
                                <Chip
                                  label={plan.duration}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha("#64748b", 0.1),
                                    color: "#64748b",
                                    fontWeight: 500,
                                  }}
                                />
                              </TableCell>
                              <TableCell sx={{ bgcolor: rowBg }}>
                                <Chip
                                  label={plan.status}
                                  size="small"
                                  icon={plan.status === "active" ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <CancelIcon sx={{ fontSize: 14 }} />}
                                  sx={{
                                    bgcolor: plan.status === "active"
                                      ? alpha("#22c55e", 0.1)
                                      : alpha("#64748b", 0.1),
                                    color: plan.status === "active" ? "#22c55e" : "#64748b",
                                    fontWeight: 600,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center" sx={{ bgcolor: rowBg }}>
                                <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                                  <Tooltip title="Edit Plan">
                                    <IconButton
                                      size="small"
                                      onClick={() => handleEdit(plan)}
                                      sx={{
                                        color: "#f59e0b",
                                        "&:hover": { bgcolor: alpha("#f59e0b", 0.1) },
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete Plan">
                                    <IconButton
                                      size="small"
                                      onClick={() => confirmDelete(plan._id)}
                                      sx={{
                                        color: "#ef4444",
                                        "&:hover": { bgcolor: alpha("#ef4444", 0.1) },
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </AnimatePresence>

                      {filteredPlans.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
                            <PeopleIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                              No plans found
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {searchQuery
                                ? "Try adjusting your search criteria"
                                : "No plans available"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </motion.div>
        </motion.div>
      </Container>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this plan?"
        subMessage="This action cannot be undone. The plan will be permanently removed."
      />

      {/* Add/Edit Plan Modal */}
      <PlanModal
        show={showModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        planData={planData}
        setPlanData={setPlanData}
        handleChange={handleChange}
        planOptions={planOptions}
        durationOptions={durationOptions}
      />
    </Box>
  );
};

export default PlanManagement;