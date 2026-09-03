import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  TextField,
  Grid,
  CircularProgress,
  useTheme,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Stack,
  alpha,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  WbSunny as WbSunnyIcon,
  NightsStay as NightsStayIcon,
  Science as ScienceIcon,
  Add as AddIcon,
  LocalOffer as LocalOfferIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts, createShift, deleteShift, updateShift } from "../../../redux/slices/shiftSlice";
import { toast } from "react-toastify";

// ── Helper ────────────────────────────────────────────────────────────────────
const getShiftTheme = (shiftName, index = 0) => {
  const name = (shiftName || "").toLowerCase();
  if (name.includes("morning")) {
    return { color: "#2563eb", icon: <WbSunnyIcon sx={{ fontSize: 20 }} /> }; // Blue
  }
  if (name.includes("night")) {
    return { color: "#9333ea", icon: <NightsStayIcon sx={{ fontSize: 20 }} /> }; // Purple
  }
  if (name.includes("test")) {
    return { color: "#16a34a", icon: <ScienceIcon sx={{ fontSize: 20 }} /> }; // Green
  }
  
  // Default/Fallback colors based on index
  const colors = ["#ea580c", "#dc2626", "#0891b2", "#c026d3"];
  return { color: colors[index % colors.length], icon: <ScheduleIcon sx={{ fontSize: 20 }} /> };
};

const calculateTotalHours = (startTime, endTime) => {
  if (!startTime || !endTime) return "";
  
  const parseTime = (timeStr) => {
    let hours = 0;
    let minutes = 0;
    const matchAMPM = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (matchAMPM) {
      hours = parseInt(matchAMPM[1], 10);
      minutes = parseInt(matchAMPM[2], 10);
      const period = matchAMPM[3] ? matchAMPM[3].toUpperCase() : null;
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    }
    return { hours, minutes };
  };

  const start = parseTime(startTime);
  const end = parseTime(endTime);
  
  let startMinutes = start.hours * 60 + start.minutes;
  let endMinutes = end.hours * 60 + end.minutes;
  
  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // Shift goes past midnight
  }
  
  const diff = endMinutes - startMinutes;
  if (diff === 0) return "0 hr";
  
  const diffHours = Math.floor(diff / 60);
  const diffMins = diff % 60;
  
  if (diffMins === 0) return `${diffHours} hr`;
  if (diffHours === 0) return `${diffMins} min`;
  return `${diffHours} hr ${diffMins} min`;
};

const formatTo12Hour = (timeStr) => {
  if (!timeStr) return "";
  const trimmed = timeStr.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = match[3] ? match[3].toUpperCase() : null;
    
    if (period) {
      if (hours === 0) hours = 12;
      return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
    }
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  }
  return trimmed;
};

const ShiftsPopup = ({ open, onClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { shifts, loading: shiftLoading } = useSelector((state) => state.shift || {});
  
  const [shiftData, setShiftData] = useState({ shiftName: "", shiftStartTime: "", shiftEndTime: "" });
  const [isAddingShift, setIsAddingShift] = useState(false);
  const [editingShiftId, setEditingShiftId] = useState(null);

  useEffect(() => {
    if (open) {
      dispatch(fetchShifts());
    }
  }, [dispatch, open]);

  const handleShiftChange = (e) => {
    const { name, value } = e.target;
    setShiftData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateShift = async () => {
    if (!shiftData.shiftName || !shiftData.shiftStartTime || !shiftData.shiftEndTime) {
      toast.error("Please fill all shift fields");
      return;
    }
    try {
      if (editingShiftId) {
        await dispatch(updateShift({ id: editingShiftId, data: shiftData })).unwrap();
        toast.success("Shift updated successfully!");
        setEditingShiftId(null);
        dispatch(fetchShifts());
      } else {
        await dispatch(createShift(shiftData)).unwrap();
        toast.success("Shift created successfully!");
      }
      setShiftData({ shiftName: "", shiftStartTime: "", shiftEndTime: "" });
      setIsAddingShift(false);
    } catch (error) {
      toast.error(error || `Failed to ${editingShiftId ? 'update' : 'create'} shift`);
    }
  };

  const handleDeleteShift = async (id) => {
    try {
      await dispatch(deleteShift(id)).unwrap();
      toast.success("Shift deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete shift");
    }
  };

  const formatTimeForInput = (timeStr) => {
    if (!timeStr) return "";
    const trimmed = timeStr.trim();
    if (/^\d{2}:\d{2}$/.test(trimmed)) return trimmed;
    const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = match[2];
      const period = match[3] ? match[3].toUpperCase() : null;
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    return trimmed;
  };



  const handleEditInlineClick = (shift) => {
    setEditingShiftId(shift._id);
    setShiftData({
      shiftName: shift.shiftName,
      shiftStartTime: formatTimeForInput(shift.shiftStartTime),
      shiftEndTime: formatTimeForInput(shift.shiftEndTime),
    });
    setIsAddingShift(true);
  };



  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{
            width: 48, height: 48, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main
          }}>
            <CalendarIcon sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700} color="primary.dark">
              Manage Shifts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create and manage your work shifts
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={onClose} size="small" sx={{ border: `1px solid ${alpha(theme.palette.divider, 0.5)}`, borderRadius: 1.5 }}>
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ pt: 1, px: 3 }}>
        <Box sx={{ px: { xs: 0, sm: 1 }, pb: 2 }}>
            <Paper elevation={0} sx={{ p: isAddingShift ? 2 : 1.5, mb: 3, border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`, borderRadius: 2, bgcolor: isAddingShift ? alpha(theme.palette.primary.main, 0.02) : 'transparent', transition: 'all 0.3s ease' }}>
              {!isAddingShift ? (
                <Box onClick={() => { setIsAddingShift(true); setEditingShiftId(null); setShiftData({ shiftName: "", shiftStartTime: "", shiftEndTime: "" }); }} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', color: theme.palette.primary.main }}>
                  <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', borderRadius: '50%', p: 0.2, display: 'flex' }}>
                    <AddIcon sx={{ fontSize: 16 }} />
                  </Box>
                  <Typography variant="body2" fontWeight={600}>
                    Add New Shift
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box onClick={() => { setIsAddingShift(false); setEditingShiftId(null); setShiftData({ shiftName: "", shiftStartTime: "", shiftEndTime: "" }); }} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', color: theme.palette.primary.main, mb: 2 }}>
                    <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', borderRadius: '50%', p: 0.2, display: 'flex' }}>
                      <AddIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {editingShiftId ? "Edit Shift" : "Add New Shift"}
                    </Typography>
                  </Box>
                  <Grid container spacing={2} columns={24} alignItems="flex-end">
                    <Grid item xs={24} sm={7}>
                      <TextField fullWidth size="small" placeholder="Shift Name" name="shiftName" value={shiftData.shiftName} onChange={handleShiftChange} 
                        sx={{ bgcolor: 'background.paper', borderRadius: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        InputProps={{
                          startAdornment: <LocalOfferIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
                        }}
                      />
                    </Grid>
                    <Grid item xs={24} sm={6}>
                      <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Start Time</Typography>
                      <TextField fullWidth size="small" name="shiftStartTime" type="time" value={shiftData.shiftStartTime} onChange={handleShiftChange} 
                        sx={{ bgcolor: 'background.paper', borderRadius: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid item xs={24} sm={6}>
                      <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>End Time</Typography>
                      <TextField fullWidth size="small" name="shiftEndTime" type="time" value={shiftData.shiftEndTime} onChange={handleShiftChange} 
                        sx={{ bgcolor: 'background.paper', borderRadius: 1, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                      />
                    </Grid>
                    <Grid item xs={24} sm={5}>
                      <Button fullWidth variant="contained" onClick={handleCreateShift} disabled={shiftLoading} size="small" sx={{ height: 40, borderRadius: 1.5, fontWeight: 600, textTransform: 'none', boxShadow: 'none', whiteSpace: 'nowrap', minWidth: 'max-content' }}>
                        {shiftLoading ? <CircularProgress size={16} sx={{ color: "white" }} /> : <>{!editingShiftId && <AddIcon sx={{ fontSize: 16, mr: 0.5 }} />} {editingShiftId ? "Save Changes" : "Add Shift"}</>}
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Paper>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ScheduleIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: "text.primary" }}>
                Existing Shifts
              </Typography>
            </Box>
            
            {shiftLoading && shifts?.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                <CircularProgress size={22} sx={{ color: theme.palette.primary.main }} />
              </Box>
            ) : shifts?.length > 0 ? (
              <Grid container spacing={2}>
                {shifts.map((shift, index) => {
                  const shiftTheme = getShiftTheme(shift.shiftName, index);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={shift._id}>
                      <Card elevation={0} sx={{ 
                        p: 1.5, 
                        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`, 
                        borderLeft: `4px solid ${shiftTheme.color}`,
                        borderRadius: 2, 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: 1.5,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                      }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
                            <Box sx={{ bgcolor: alpha(shiftTheme.color, 0.1), color: shiftTheme.color, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {shiftTheme.icon}
                            </Box>
                            <Typography variant="body2" fontWeight={700} color="primary.dark" noWrap sx={{ flex: 1, minWidth: 0, pr: 1 }}>{shift.shiftName}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexShrink: 0, gap: 0.5 }}>
                            <IconButton size="small" onClick={() => handleEditInlineClick(shift)} sx={{ p: 0.5, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main, '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) } }}>
                              <EditIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDeleteShift(shift._id)} sx={{ p: 0.5, bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main, '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.2) } }}>
                              <DeleteIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ borderTop: `1px dashed ${alpha(theme.palette.divider, 0.8)}` }} />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CalendarIcon sx={{ fontSize: 14, color: "text.secondary", flexShrink: 0 }} />
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {formatTo12Hour(shift.shiftStartTime)} - {formatTo12Hour(shift.shiftEndTime)}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }} />
                          <Typography variant="caption" sx={{ fontWeight: 600, color: shiftTheme.color, bgcolor: alpha(shiftTheme.color, 0.1), px: 1, py: 0.3, borderRadius: 1.5 }}>
                            {calculateTotalHours(shift.shiftStartTime, shift.shiftEndTime)}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
                No shifts found. Create one above.
              </Typography>
            )}
          </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftsPopup;
