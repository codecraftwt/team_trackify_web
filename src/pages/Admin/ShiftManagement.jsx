import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Stack,
  alpha,
  Tooltip,
  Chip,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  useMediaQuery,
  Skeleton,
  Tabs,
  Tab,
  Avatar,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TablePagination,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
  LocalOffer as LocalOfferIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Refresh as RefreshIcon,
  GridView as GridViewIcon,
  ViewList as TableViewIcon,
  WbSunny as WbSunnyIcon,
  NightsStay as NightsStayIcon,
  Science as ScienceIcon,
  Brightness4 as EveningIcon,
  AccessTime as AccessTimeIcon,
  Timer as TimerIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  Layers as LayersIcon,
  PeopleAlt as PeopleAltIcon,
  History as HistoryIcon,
  AssignmentInd as AssignmentIndIcon,
  Download as DownloadIcon,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchShifts, createShift, deleteShift, updateShift, assignShiftToUser } from "../../redux/slices/shiftSlice";
import { getUsersUnderAdmin } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Helper: Determine icon, colors, and badge for shift category
const getShiftDetails = (shiftName = "", startTime = "") => {
  const name = (shiftName || "").toLowerCase();

  let hours = 0;
  if (startTime) {
    const match = startTime.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match) {
      hours = parseInt(match[1], 10);
      const period = match[3] ? match[3].toUpperCase() : null;
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    }
  }

  if (name.includes("morning") || (hours >= 5 && hours < 12 && !name.includes("night") && !name.includes("evening"))) {
    return {
      type: "Morning Shift",
      icon: <WbSunnyIcon sx={{ fontSize: 18 }} />,
      color: "#d97706",
      bgLight: "#fffbeb",
      borderAccent: "#fde68a",
      pillBg: "#fef3c7",
    };
  }
  if (name.includes("evening") || name.includes("afternoon") || (hours >= 12 && hours < 18 && !name.includes("night"))) {
    return {
      type: "Evening Shift",
      icon: <EveningIcon sx={{ fontSize: 18 }} />,
      color: "#2563eb",
      bgLight: "#eff6ff",
      borderAccent: "#bfdbfe",
      pillBg: "#dbeafe",
    };
  }
  if (name.includes("night") || hours >= 18 || hours < 5) {
    return {
      type: "Night Shift",
      icon: <NightsStayIcon sx={{ fontSize: 18 }} />,
      color: "#7c3aed",
      bgLight: "#f5f3ff",
      borderAccent: "#ddd6fe",
      pillBg: "#ede9fe",
    };
  }
  if (name.includes("test") || name.includes("demo")) {
    return {
      type: "Test Shift",
      icon: <ScienceIcon sx={{ fontSize: 18 }} />,
      color: "#059669",
      bgLight: "#ecfdf5",
      borderAccent: "#a7f3d0",
      pillBg: "#d1fae5",
    };
  }

  return {
    type: "General Shift",
    icon: <ScheduleIcon sx={{ fontSize: 18 }} />,
    color: "#102c4a",
    bgLight: "#f8fafc",
    borderAccent: "#cbd5e1",
    pillBg: "#f1f5f9",
  };
};

// Helper: Calculate total shift duration with overnight rollover handling
const calculateTotalHours = (startTime, endTime) => {
  if (!startTime || !endTime) return { text: "0 mins", isOvernight: false, minutes: 0 };

  const parseTime = (timeStr) => {
    let hours = 0;
    let minutes = 0;
    const trimmed = (timeStr || "").trim();
    const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
    if (match) {
      hours = parseInt(match[1], 10);
      minutes = parseInt(match[2], 10);
      const period = match[3] ? match[3].toUpperCase() : null;
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
    }
    return { hours, minutes };
  };

  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const startMinutes = start.hours * 60 + start.minutes;
  let endMinutes = end.hours * 60 + end.minutes;
  let isOvernight = false;

  if (endMinutes < startMinutes) {
    endMinutes += 24 * 60; // Crosses midnight
    isOvernight = true;
  }

  const diff = endMinutes - startMinutes;
  if (diff === 0) return { text: "0 mins", isOvernight, minutes: 0 };

  const diffHours = Math.floor(diff / 60);
  const diffMins = diff % 60;

  let text = "";
  if (diffHours === 0) {
    text = `${diffMins} min${diffMins !== 1 ? "s" : ""}`;
  } else if (diffMins === 0) {
    text = `${diffHours} hr${diffHours !== 1 ? "s" : ""}`;
  } else {
    text = `${diffHours} hr${diffHours !== 1 ? "s" : ""} ${diffMins}m`;
  }

  return { text, isOvernight, minutes: diff };
};

// Helper: Format string or time to 12-hour AM/PM format
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
      return `${hours.toString().padStart(2, "0")}:${minutes} ${period}`;
    }

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  }
  return trimmed;
};

// Helper: Format time value (e.g. "09:00 AM" or "09:00") to "HH:mm" for input[type=time]
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
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  }
  return trimmed;
};

// Preset quick templates
const SHIFT_PRESETS = [
  { name: "General Shift", startTime: "09:30", endTime: "18:30" },
  { name: "Morning Shift", startTime: "08:00", endTime: "16:00" },
  { name: "Evening Shift", startTime: "14:00", endTime: "22:00" },
  { name: "Night Shift", startTime: "22:00", endTime: "06:00" },
];

const ShiftManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab: 0 = "setup", 1 = "roster", 2 = "history"
  const currentTabParam = searchParams.get("tab");
  const initialTab = currentTabParam === "history" ? 2 : currentTabParam === "roster" ? 1 : 0;
  const [activeTab, setActiveTab] = useState(initialTab);

  // Redux state
  const { shifts = [], loading: shiftLoading = false } = useSelector((state) => state.shift || {});
  const { adminUsersList = [], adminUsersLoading = false } = useSelector((state) => state.user || {});

  // Current logged in user info
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const adminId = storedUser?._id || storedUser?.id || storedUser?.adminId;

  // Local States for Tab 0 (Shift Setup)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // 'table' (List View) | 'grid' (Card View)

  // Modal / Form States for Shifts
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [formData, setFormData] = useState({
    shiftName: "",
    shiftStartTime: "09:00",
    shiftEndTime: "18:00",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Confirmation Dialog State
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState({
    open: false,
    shift: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Local States for Tab 1 (Shift Roster)
  const [rosterSearch, setRosterSearch] = useState("");
  const [rosterFilterShift, setRosterFilterShift] = useState("all");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [targetShiftId, setTargetShiftId] = useState("");
  const [singleAssignUser, setSingleAssignUser] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);

  // Local States for Tab 2 (Assignment History)
  const [historySearch, setHistorySearch] = useState("");
  const [historyPage, setHistoryPage] = useState(0);
  const [historyRowsPerPage, setHistoryRowsPerPage] = useState(10);
  const [assignmentHistory, setAssignmentHistory] = useState([]);

  // Smooth border constants matching UserManagement
  const cardBorder = `1px solid ${alpha(theme.palette.primary.main, 0.1)}`;
  const lightBorder = "1px solid #eef2f6";
  const softBorder = "1px solid #f1f5f9";

  // Load Assignment History from localStorage
  const loadHistoryFromStorage = useCallback(() => {
    try {
      const historyKey = `shift_history_${adminId || "default"}`;
      const saved = localStorage.getItem(historyKey);
      if (saved) {
        setAssignmentHistory(JSON.parse(saved));
      } else {
        const initialSeed = [
          {
            id: "hist_1",
            userName: "WalstarCC User",
            userEmail: "team@walstar.com",
            previousShift: "Free Time",
            newShift: "Way To Office (08:30 AM - 08:55 AM)",
            shiftId: "shift_1",
            assignedBy: storedUser?.name || "Admin",
            assignedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
            status: "Active",
          },
          {
            id: "hist_2",
            userName: "Field Officer",
            userEmail: "field@walstar.com",
            previousShift: "Way To Office",
            newShift: "Way To Home (07:30 PM - 08:00 PM)",
            shiftId: "shift_2",
            assignedBy: storedUser?.name || "Admin",
            assignedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
            status: "Completed",
          },
        ];
        setAssignmentHistory(initialSeed);
        localStorage.setItem(historyKey, JSON.stringify(initialSeed));
      }
    } catch (e) {
      console.error("Error loading shift history:", e);
    }
  }, [adminId, storedUser?.name]);

  // Save new assignment to history
  const addAssignmentHistoryEntry = useCallback(
    (entries) => {
      try {
        const historyKey = `shift_history_${adminId || "default"}`;
        const updated = [...entries, ...assignmentHistory];
        setAssignmentHistory(updated);
        localStorage.setItem(historyKey, JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving shift history:", e);
      }
    },
    [adminId, assignmentHistory]
  );

  // Fetch shifts & users on mount
  useEffect(() => {
    dispatch(fetchShifts());
    if (adminId) {
      dispatch(getUsersUnderAdmin({ adminId, page: 1, limit: 100 }));
    }
    loadHistoryFromStorage();
  }, [dispatch, adminId, loadHistoryFromStorage]);

  const handleTabChange = (e, newTab) => {
    setActiveTab(newTab);
    const tabName = newTab === 2 ? "history" : newTab === 1 ? "roster" : "setup";
    setSearchParams({ tab: tabName });
  };

  const handleRefresh = () => {
    dispatch(fetchShifts());
    if (adminId) {
      dispatch(getUsersUnderAdmin({ adminId, page: 1, limit: 100 }));
    }
    loadHistoryFromStorage();
    toast.info("Data refreshed");
  };

  // ============ SHIFT SETUP ACTIONS ============

  const handleOpenCreateDialog = () => {
    setEditingShift(null);
    setFormData({
      shiftName: "",
      shiftStartTime: "09:00",
      shiftEndTime: "18:00",
    });
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (shift) => {
    setEditingShift(shift);
    setFormData({
      shiftName: shift.shiftName || "",
      shiftStartTime: formatTimeForInput(shift.shiftStartTime),
      shiftEndTime: formatTimeForInput(shift.shiftEndTime),
    });
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingShift(null);
    setFormData({
      shiftName: "",
      shiftStartTime: "09:00",
      shiftEndTime: "18:00",
    });
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleApplyPreset = (preset) => {
    setFormData({
      shiftName: preset.name,
      shiftStartTime: preset.startTime,
      shiftEndTime: preset.endTime,
    });
    setFormErrors({});
  };

  const handleSubmitShift = async (e) => {
    if (e) e.preventDefault();

    const errors = {};
    if (!formData.shiftName.trim()) {
      errors.shiftName = "Shift name is required";
    }
    if (!formData.shiftStartTime) {
      errors.shiftStartTime = "Start time is required";
    }
    if (!formData.shiftEndTime) {
      errors.shiftEndTime = "End time is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingShift) {
        await dispatch(
          updateShift({
            id: editingShift._id,
            data: {
              shiftName: formData.shiftName.trim(),
              shiftStartTime: formData.shiftStartTime,
              shiftEndTime: formData.shiftEndTime,
            },
          })
        ).unwrap();
        toast.success("Shift updated successfully!");
        dispatch(fetchShifts());
      } else {
        await dispatch(
          createShift({
            shiftName: formData.shiftName.trim(),
            shiftStartTime: formData.shiftStartTime,
            shiftEndTime: formData.shiftEndTime,
          })
        ).unwrap();
        toast.success("Shift created successfully!");
        dispatch(fetchShifts());
      }
      handleCloseDialog();
    } catch (error) {
      toast.error(error || `Failed to ${editingShift ? "update" : "create"} shift`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmDialog.shift) return;
    setIsDeleting(true);
    try {
      await dispatch(deleteShift(deleteConfirmDialog.shift._id)).unwrap();
      toast.success("Shift deleted successfully!");
      setDeleteConfirmDialog({ open: false, shift: null });
      dispatch(fetchShifts());
    } catch (error) {
      toast.error(error || "Failed to delete shift");
    } finally {
      setIsDeleting(false);
    }
  };

  // ============ SHIFT ROSTER & ASSIGNMENT ACTIONS ============

  const handleOpenAssignModal = (user = null) => {
    if (user) {
      setSingleAssignUser(user);
      const currentShiftId =
        user?.shift && typeof user.shift === "object"
          ? user.shift._id || user.shift.id
          : typeof user?.shift === "string"
          ? user.shift
          : user?.shiftId || "";
      setTargetShiftId(currentShiftId || "null");
      setSelectedUserIds([user._id || user.id]);
    } else {
      setSingleAssignUser(null);
      setTargetShiftId("");
    }
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setSingleAssignUser(null);
    setTargetShiftId("");
  };

  const handleSelectAllUsers = (e) => {
    if (e.target.checked) {
      const allIds = adminUsersList.map((u) => u._id || u.id);
      setSelectedUserIds(allIds);
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleToggleSelectUser = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleExecuteShiftAssignment = async () => {
    if (!targetShiftId) {
      toast.error("Please select a target shift to assign");
      return;
    }
    if (selectedUserIds.length === 0) {
      toast.error("No team members selected");
      return;
    }

    const isFreeTime = targetShiftId === "null";
    const actualShiftId = isFreeTime ? null : targetShiftId;
    const targetShift = isFreeTime ? null : shifts.find((s) => s._id === targetShiftId);
    const targetShiftLabel = isFreeTime
      ? "Free Time"
      : targetShift
      ? `${targetShift.shiftName} (${formatTo12Hour(targetShift.shiftStartTime)} - ${formatTo12Hour(targetShift.shiftEndTime)})`
      : "Assigned Shift";

    setIsAssigning(true);
    const newHistoryEntries = [];

    try {
      for (const userId of selectedUserIds) {
        const userObj = adminUsersList.find((u) => (u._id || u.id) === userId);
        const previousShiftName = userObj?.shift?.shiftName || "Free Time";

        await dispatch(assignShiftToUser({ userId, shiftId: actualShiftId })).unwrap();

        newHistoryEntries.push({
          id: `hist_${Date.now()}_${userId}`,
          userName: userObj?.name || userObj?.userName || "Team Member",
          userEmail: userObj?.email || "—",
          previousShift: previousShiftName,
          newShift: targetShiftLabel,
          shiftId: actualShiftId || "free_time",
          assignedBy: storedUser?.name || "Admin",
          assignedAt: new Date().toISOString(),
          status: "Active",
        });
      }

      addAssignmentHistoryEntry(newHistoryEntries);
      toast.success(
        isFreeTime
          ? `Successfully removed shift for ${selectedUserIds.length} member${selectedUserIds.length > 1 ? "s" : ""} (set to Free Time)!`
          : `Successfully assigned ${selectedUserIds.length} member${selectedUserIds.length > 1 ? "s" : ""} to ${targetShift?.shiftName || "shift"}!`
      );

      if (adminId) {
        dispatch(getUsersUnderAdmin({ adminId, page: 1, limit: 100 }));
      }
      setSelectedUserIds([]);
      handleCloseAssignModal();
    } catch (error) {
      toast.error(error || "Failed to assign shift");
    } finally {
      setIsAssigning(false);
    }
  };

  // Export History as PDF
  const handleExportHistoryPDF = () => {
    if (assignmentHistory.length === 0) {
      toast.info("No assignment history to export");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Shift Assignment History Log", 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

    const tableData = assignmentHistory.map((item, idx) => [
      idx + 1,
      item.userName,
      item.userEmail,
      item.previousShift,
      item.newShift,
      item.assignedBy,
      new Date(item.assignedAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      startY: 34,
      head: [["#", "Employee", "Email", "Previous Shift", "New Shift", "Assigned By", "Date"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [16, 44, 74] },
    });

    doc.save("Shift_Assignment_History.pdf");
    toast.success("History exported as PDF");
  };

  // Export History as CSV
  const handleExportHistoryCSV = () => {
    if (assignmentHistory.length === 0) {
      toast.info("No assignment history to export");
      return;
    }
    const headers = ["Employee Name", "Email", "Previous Shift", "New Assigned Shift", "Assigned By", "Date & Time"];
    const rows = assignmentHistory.map((item) => [
      `"${item.userName}"`,
      `"${item.userEmail}"`,
      `"${item.previousShift}"`,
      `"${item.newShift}"`,
      `"${item.assignedBy}"`,
      `"${new Date(item.assignedAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Shift_Assignment_History_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("History exported as CSV");
  };

  // ============ COMPUTATIONS ============

  const filteredShifts = useMemo(() => {
    return shifts.filter((shift) => {
      const matchesSearch =
        shift.shiftName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shift.shiftStartTime?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shift.shiftEndTime?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === "all") return true;

      const details = getShiftDetails(shift.shiftName, shift.shiftStartTime);
      if (filterType === "morning") return details.type === "Morning Shift";
      if (filterType === "evening") return details.type === "Evening Shift";
      if (filterType === "night") return details.type === "Night Shift";

      return true;
    });
  }, [shifts, searchTerm, filterType]);

  const stats = useMemo(() => {
    const total = shifts.length;
    let totalMinutes = 0;
    let morningCount = 0;
    let eveningCount = 0;
    let nightCount = 0;

    shifts.forEach((s) => {
      const { minutes } = calculateTotalHours(s.shiftStartTime, s.shiftEndTime);
      totalMinutes += minutes;

      const details = getShiftDetails(s.shiftName, s.shiftStartTime);
      if (details.type === "Morning Shift") morningCount++;
      else if (details.type === "Evening Shift") eveningCount++;
      else if (details.type === "Night Shift") nightCount++;
    });

    const avgMinutes = total > 0 ? Math.round(totalMinutes / total) : 0;
    const avgHours = Math.floor(avgMinutes / 60);
    const avgRemMins = avgMinutes % 60;

    let avgDurationStr = "0 mins";
    if (total > 0) {
      if (avgHours === 0) {
        avgDurationStr = `${avgRemMins} mins`;
      } else if (avgRemMins === 0) {
        avgDurationStr = `${avgHours} hrs`;
      } else {
        avgDurationStr = `${avgHours}h ${avgRemMins}m`;
      }
    }

    return {
      total,
      avgDurationStr,
      morningCount,
      eveningCount,
      nightCount,
    };
  }, [shifts]);

  const filteredRosterUsers = useMemo(() => {
    return adminUsersList.filter((user) => {
      const userName = (user.name || user.userName || "").toLowerCase();
      const userEmail = (user.email || "").toLowerCase();
      const query = rosterSearch.toLowerCase().trim();
      const matchesSearch = userName.includes(query) || userEmail.includes(query);

      if (!matchesSearch) return false;

      const userShift =
        user?.shift && typeof user.shift === "object" && (user.shift._id || user.shift.id)
          ? user.shift
          : shifts.find((s) => s._id === user?.shift || s._id === user?.shiftId) || null;

      const userShiftId = userShift ? userShift._id || userShift.id : null;

      if (rosterFilterShift === "all") return true;
      if (rosterFilterShift === "unassigned") return !userShiftId;

      return String(userShiftId) === String(rosterFilterShift);
    });
  }, [adminUsersList, rosterSearch, rosterFilterShift, shifts]);

  const rosterStats = useMemo(() => {
    const total = adminUsersList.length;
    let assigned = 0;
    adminUsersList.forEach((u) => {
      const userShift =
        u?.shift && typeof u.shift === "object" && (u.shift._id || u.shift.id)
          ? u.shift
          : shifts.find((s) => s._id === u?.shift || s._id === u?.shiftId) || null;
      if (userShift) assigned++;
    });
    return {
      total,
      assigned,
      unassigned: total - assigned,
    };
  }, [adminUsersList, shifts]);

  const filteredHistory = useMemo(() => {
    return assignmentHistory.filter((item) => {
      const query = historySearch.toLowerCase();
      return (
        item.userName.toLowerCase().includes(query) ||
        item.userEmail.toLowerCase().includes(query) ||
        item.newShift.toLowerCase().includes(query) ||
        item.previousShift.toLowerCase().includes(query)
      );
    });
  }, [assignmentHistory, historySearch]);

  const livePreview = useMemo(() => {
    const details = getShiftDetails(formData.shiftName, formData.shiftStartTime);
    const duration = calculateTotalHours(formData.shiftStartTime, formData.shiftEndTime);
    return { details, duration };
  }, [formData.shiftName, formData.shiftStartTime, formData.shiftEndTime]);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 2.5 } }}>
      {/* Header — Direct on page like User Management */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: { xs: 2, sm: 2.5 },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight="700"
            gutterBottom
            sx={{
              color: "text.primary",
              fontSize: {
                xs: "1.1rem",
                sm: "1.3rem",
                md: "1.5rem",
              },
            }}
          >
            {activeTab === 0
              ? "Shift Management"
              : activeTab === 1
              ? "Shift Roster & Scheduling"
              : "Shift Assignment History"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
            {activeTab === 0
              ? "Configure, customize, and manage working hours for your teams"
              : activeTab === 1
              ? "View and assign employee shifts across the roster"
              : "Complete audit log of all shift reassignments and changes"}
          </Typography>
        </Box>

        {/* Header Right Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: { xs: "flex-start", sm: "flex-end" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Tooltip title="Refresh">
            <span>
              <IconButton
                onClick={handleRefresh}
                disabled={shiftLoading || adminUsersLoading}
                size="small"
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                  width: 34,
                  height: 34,
                }}
              >
                <RefreshIcon
                  sx={{
                    animation: shiftLoading || adminUsersLoading ? "spin 1s linear infinite" : "none",
                    fontSize: { xs: 18, sm: 20 },
                  }}
                />
              </IconButton>
            </span>
          </Tooltip>

          {activeTab === 0 ? (
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              onClick={handleOpenCreateDialog}
              size="small"
              sx={{
                bgcolor: "primary.main",
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                height: 34,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1.5,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Add Shift
            </Button>
          ) : activeTab === 1 ? (
            <Button
              variant="contained"
              startIcon={<AssignmentIndIcon sx={{ fontSize: 16 }} />}
              onClick={() => handleOpenAssignModal()}
              disabled={selectedUserIds.length === 0}
              size="small"
              sx={{
                bgcolor: "primary.main",
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                height: 34,
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 1.5,
                "&:hover": { bgcolor: "primary.dark" },
              }}
            >
              Bulk Assign ({selectedUserIds.length})
            </Button>
          ) : (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleExportHistoryCSV}
                startIcon={<DownloadIcon sx={{ fontSize: 15 }} />}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontSize: { xs: "0.65rem", sm: "0.72rem" },
                  height: 34,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 1.5,
                  "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.05) },
                }}
              >
                Export CSV
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleExportHistoryPDF}
                startIcon={<DownloadIcon sx={{ fontSize: 15 }} />}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  fontSize: { xs: "0.65rem", sm: "0.72rem" },
                  height: 34,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 1.5,
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                Export PDF
              </Button>
            </Stack>
          )}
        </Box>
      </Box>

      {/* Tabs Switcher — Clean underline tabs like User Management */}
      <Box sx={{ borderBottom: 1, borderColor: alpha(theme.palette.primary.main, 0.1), mb: { xs: 2, sm: 2.5 } }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            minHeight: { xs: 40, sm: 44 },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.75rem", sm: "0.82rem" },
              minHeight: { xs: 40, sm: 44 },
              px: { xs: 1.25, sm: 2 },
              color: "text.secondary",
            },
            "& .Mui-selected": {
              color: `${theme.palette.primary.main} !important`,
            },
            "& .MuiTabs-indicator": {
              bgcolor: theme.palette.primary.main,
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <ScheduleIcon sx={{ fontSize: 16 }} />
                <span>Shift Configuration</span>
                {!shiftLoading && (
                  <Chip
                    label={shifts.length}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      height: 18,
                    }}
                  />
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <PeopleAltIcon sx={{ fontSize: 16 }} />
                <span>Shift Roster</span>
                {!adminUsersLoading && (
                  <Chip
                    label={adminUsersList.length}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      fontSize: "0.6rem",
                      height: 18,
                    }}
                  />
                )}
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <HistoryIcon sx={{ fontSize: 16 }} />
                <span>Assignment History</span>
                <Chip
                  label={assignmentHistory.length}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    fontSize: "0.6rem",
                    height: 18,
                  }}
                />
              </Box>
            }
          />
        </Tabs>
      </Box>

      {/* TAB 0: SHIFT CONFIGURATION */}
      {activeTab === 0 && (
        <Box>
          {/* Stat Overview Cards */}
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: cardBorder,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.4, fontSize: "0.68rem" }}>
                    TOTAL SHIFTS
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, my: 0.25 }}>
                    {shiftLoading ? <Skeleton width={40} /> : stats.total}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CheckCircleIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                      Active in system
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LayersIcon sx={{ fontSize: 20 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: cardBorder,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.4, fontSize: "0.68rem" }}>
                    AVG. SHIFT DURATION
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, my: 0.25 }}>
                    {shiftLoading ? <Skeleton width={60} /> : stats.avgDurationStr}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <TimerIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                      Work hours / shift
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 20 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: cardBorder,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.4, fontSize: "0.68rem" }}>
                    MORNING / DAY
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, my: 0.25 }}>
                    {shiftLoading ? <Skeleton width={35} /> : stats.morningCount}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <WbSunnyIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                      Daytime schedules
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WbSunnyIcon sx={{ fontSize: 20 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: cardBorder,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.4, fontSize: "0.68rem" }}>
                    EVENING / NIGHT
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, my: 0.25 }}>
                    {shiftLoading ? <Skeleton width={35} /> : stats.eveningCount + stats.nightCount}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <NightsStayIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                      Late schedules
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NightsStayIcon sx={{ fontSize: 20 }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Search & Filter Toolbar */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.2, sm: 1.5 },
              mb: { xs: 2, sm: 2.5 },
              borderRadius: { xs: 2, sm: 2.5 },
              border: cardBorder,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <TextField
              size="small"
              placeholder="Search by shift name or timing..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                minWidth: { xs: "100%", md: 320 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f8fafc",
                  fontSize: "0.85rem",
                  height: 38,
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#cbd5e1" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm("")} sx={{ p: 0.5 }}>
                      <ClearIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" justifyContent={{ xs: "space-between", md: "flex-end" }}>
              <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                <Chip
                  label="All Shifts"
                  clickable
                  onClick={() => setFilterType("all")}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 1.5,
                    fontSize: "0.75rem",
                    height: 30,
                    ...(filterType === "all"
                      ? { bgcolor: theme.palette.primary.main, color: "white", border: "1px solid transparent" }
                      : { bgcolor: "#ffffff", color: "text.secondary", border: "1px solid #e2e8f0", "&:hover": { bgcolor: "#f8fafc" } }),
                  }}
                />
                <Chip
                  icon={<WbSunnyIcon sx={{ fontSize: "14px !important", color: filterType === "morning" ? "#d97706 !important" : "inherit" }} />}
                  label="Morning"
                  clickable
                  onClick={() => setFilterType("morning")}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 1.5,
                    fontSize: "0.75rem",
                    height: 30,
                    ...(filterType === "morning"
                      ? { bgcolor: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" }
                      : { bgcolor: "#ffffff", color: "text.secondary", border: "1px solid #e2e8f0", "&:hover": { bgcolor: "#f8fafc" } }),
                  }}
                />
                <Chip
                  icon={<EveningIcon sx={{ fontSize: "14px !important", color: filterType === "evening" ? "#2563eb !important" : "inherit" }} />}
                  label="Evening"
                  clickable
                  onClick={() => setFilterType("evening")}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 1.5,
                    fontSize: "0.75rem",
                    height: 30,
                    ...(filterType === "evening"
                      ? { bgcolor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }
                      : { bgcolor: "#ffffff", color: "text.secondary", border: "1px solid #e2e8f0", "&:hover": { bgcolor: "#f8fafc" } }),
                  }}
                />
                <Chip
                  icon={<NightsStayIcon sx={{ fontSize: "14px !important", color: filterType === "night" ? "#7c3aed !important" : "inherit" }} />}
                  label="Night"
                  clickable
                  onClick={() => setFilterType("night")}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    borderRadius: 1.5,
                    fontSize: "0.75rem",
                    height: 30,
                    ...(filterType === "night"
                      ? { bgcolor: "#f5f3ff", color: "#7c3aed", border: "1px solid #ddd6fe" }
                      : { bgcolor: "#ffffff", color: "text.secondary", border: "1px solid #e2e8f0", "&:hover": { bgcolor: "#f8fafc" } }),
                  }}
                />
              </Stack>

              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" }, mx: 0.5, borderColor: "#e2e8f0" }} />

              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, next) => next && setViewMode(next)}
                size="small"
                sx={{
                  height: 32,
                  bgcolor: "#f8fafc",
                  borderRadius: 1.5,
                  border: "1px solid #e2e8f0",
                  "& .MuiToggleButton-root": {
                    borderRadius: 1.5,
                    px: 1,
                    py: 0.4,
                    border: "none",
                    "&.Mui-selected": {
                      bgcolor: "#ffffff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <ToggleButton value="table" aria-label="table view">
                  <Tooltip title="List View">
                    <TableViewIcon sx={{ fontSize: 16 }} />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="grid" aria-label="grid view">
                  <Tooltip title="Card View">
                    <GridViewIcon sx={{ fontSize: 16 }} />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Paper>

          {/* Shift Cards / Table Content */}
          {shiftLoading && shifts.length === 0 ? (
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Skeleton variant="rounded" height={190} sx={{ borderRadius: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
                </Grid>
              ))}
            </Grid>
          ) : filteredShifts.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: { xs: 2, sm: 2.5 },
                border: "1px dashed #cbd5e1",
                bgcolor: "background.paper",
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  color: theme.palette.primary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 1.5,
                }}
              >
                <ScheduleIcon sx={{ fontSize: 26 }} />
              </Box>
              <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ fontSize: "1.05rem" }} gutterBottom>
                {searchTerm || filterType !== "all" ? "No Matching Shifts Found" : "No Shifts Created Yet"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: "auto", mb: 2.5, fontSize: "0.8rem" }}>
                {searchTerm || filterType !== "all"
                  ? "Try clearing your search keyword or switching filters to see available shifts."
                  : "Create work shifts with flexible start and end times to schedule your team efficiently."}
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpenCreateDialog}
                startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  borderRadius: 2,
                  px: 2.5,
                  py: 0.8,
                  boxShadow: "none",
                }}
              >
                Create First Shift
              </Button>
            </Paper>
          ) : viewMode === "grid" ? (
            <Grid container spacing={2}>
              <AnimatePresence>
                {filteredShifts.map((shift, idx) => {
                  const details = getShiftDetails(shift.shiftName, shift.shiftStartTime);
                  const durationInfo = calculateTotalHours(shift.shiftStartTime, shift.shiftEndTime);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={shift._id || idx}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: idx * 0.02 }}
                      >
                        <Card
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: { xs: 2, sm: 2.5 },
                            border: cardBorder,
                            bgcolor: "background.paper",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.05)",
                              borderColor: theme.palette.primary.main,
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0, flex: 1 }}>
                              <Box
                                sx={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 2,
                                  bgcolor: details.bgLight,
                                  color: details.color,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                {details.icon}
                              </Box>
                              <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={700}
                                  sx={{
                                    color: "text.primary",
                                    fontSize: "0.92rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {shift.shiftName}
                                </Typography>
                                <Chip
                                  label={details.type}
                                  size="small"
                                  sx={{
                                    height: 19,
                                    fontSize: "0.65rem",
                                    fontWeight: 600,
                                    bgcolor: details.pillBg,
                                    color: details.color,
                                    border: `1px solid ${details.borderAccent}`,
                                    mt: 0.2,
                                  }}
                                />
                              </Box>
                            </Box>

                            <Stack direction="row" spacing={0.5} sx={{ ml: 1, flexShrink: 0 }}>
                              <Tooltip title="Edit Shift">
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenEditDialog(shift)}
                                  sx={{
                                    bgcolor: "#f8fafc",
                                    border: "1px solid #e2e8f0",
                                    color: theme.palette.primary.main,
                                    p: 0.6,
                                    borderRadius: 1.5,
                                    "&:hover": {
                                      bgcolor: "#f1f5f9",
                                      borderColor: "#cbd5e1",
                                    },
                                  }}
                                >
                                  <EditIcon sx={{ fontSize: 13 }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Shift">
                                <IconButton
                                  size="small"
                                  onClick={() => setDeleteConfirmDialog({ open: true, shift })}
                                  sx={{
                                    bgcolor: "#fef2f2",
                                    border: "1px solid #fecaca",
                                    color: "#ef4444",
                                    p: 0.6,
                                    borderRadius: 1.5,
                                    "&:hover": {
                                      bgcolor: "#fee2e2",
                                      borderColor: "#fca5a5",
                                    },
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: 13 }} />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Box>

                          <Box
                            sx={{
                              p: 1.25,
                              borderRadius: 2,
                              bgcolor: "#f8fafc",
                              border: softBorder,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: "block", fontSize: "0.65rem" }}>
                                START
                              </Typography>
                              <Typography variant="body2" fontWeight={700} color="text.primary" sx={{ fontSize: "0.85rem" }}>
                                {formatTo12Hour(shift.shiftStartTime)}
                              </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", px: 0.5, color: "#94a3b8" }}>
                              <ArrowForwardIcon sx={{ fontSize: 13 }} />
                            </Box>

                            <Box sx={{ textAlign: "right" }}>
                              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: "block", fontSize: "0.65rem" }}>
                                END {durationInfo.isOvernight && <Typography component="span" variant="caption" color="secondary.main" fontWeight={700} sx={{ fontSize: "0.65rem" }}>(+1D)</Typography>}
                              </Typography>
                              <Typography variant="body2" fontWeight={700} color="text.primary" sx={{ fontSize: "0.85rem" }}>
                                {formatTo12Hour(shift.shiftEndTime)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                              <CalendarIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                                Duration
                              </Typography>
                            </Box>

                            <Chip
                              label={durationInfo.text}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.72rem",
                                height: 22,
                                bgcolor: details.pillBg,
                                color: details.color,
                                border: `1px solid ${details.borderAccent}`,
                                borderRadius: 1.5,
                              }}
                            />
                          </Box>
                        </Card>
                      </motion.div>
                    </Grid>
                  );
                })}
              </AnimatePresence>
            </Grid>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: { xs: 2, sm: 2.5 },
                border: cardBorder,
                overflow: "hidden",
                bgcolor: "background.paper",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>SHIFT NAME</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>CATEGORY</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>START TIME</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>END TIME</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>DURATION</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredShifts.map((shift, idx) => {
                    const details = getShiftDetails(shift.shiftName, shift.shiftStartTime);
                    const durationInfo = calculateTotalHours(shift.shiftStartTime, shift.shiftEndTime);

                    return (
                      <TableRow
                        key={shift._id || idx}
                        hover
                        sx={{
                          "&:hover": {
                            bgcolor: "#f8fafc",
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.8rem", borderColor: "#f1f5f9" }}>{idx + 1}</TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                            <Box
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: 1.5,
                                bgcolor: details.bgLight,
                                color: details.color,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {details.icon}
                            </Box>
                            <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: "0.85rem" }}>
                              {shift.shiftName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Chip
                            label={details.type}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              bgcolor: details.pillBg,
                              color: details.color,
                              border: `1px solid ${details.borderAccent}`,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.82rem", borderColor: "#f1f5f9" }}>
                          {formatTo12Hour(shift.shiftStartTime)}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.82rem", borderColor: "#f1f5f9" }}>
                          {formatTo12Hour(shift.shiftEndTime)}
                          {durationInfo.isOvernight && (
                            <Typography component="span" variant="caption" color="secondary.main" sx={{ ml: 0.5, fontWeight: 700, fontSize: "0.68rem" }}>
                              (+1 Day)
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Chip
                            label={durationInfo.text}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: "0.72rem",
                              height: 20,
                              bgcolor: details.pillBg,
                              color: details.color,
                              border: `1px solid ${details.borderAccent}`,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" sx={{ borderColor: "#f1f5f9" }}>
                          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                            <Tooltip title="Edit Shift">
                              <IconButton
                                size="small"
                                onClick={() => handleOpenEditDialog(shift)}
                                sx={{
                                  bgcolor: "#f8fafc",
                                  border: "1px solid #e2e8f0",
                                  color: theme.palette.primary.main,
                                  p: 0.5,
                                  "&:hover": { bgcolor: "#f1f5f9", borderColor: "#cbd5e1" },
                                }}
                              >
                                <EditIcon sx={{ fontSize: 13 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Shift">
                              <IconButton
                                size="small"
                                onClick={() => setDeleteConfirmDialog({ open: true, shift })}
                                sx={{
                                  bgcolor: "#fef2f2",
                                  border: "1px solid #fecaca",
                                  color: "#ef4444",
                                  p: 0.5,
                                  "&:hover": { bgcolor: "#fee2e2", borderColor: "#fca5a5" },
                                }}
                              >
                                <DeleteIcon sx={{ fontSize: 13 }} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* TAB 1: SHIFT ROSTER & SCHEDULING */}
      {activeTab === 1 && (
        <Box>
          {/* Roster Overview Stats */}
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: cardBorder,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.4, fontSize: "0.68rem" }}>
                    TOTAL TEAM MEMBERS
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, my: 0.25 }}>
                    {adminUsersLoading ? <Skeleton width={40} /> : rosterStats.total}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                    Employees on roster
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleAltIcon sx={{ fontSize: 20 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: cardBorder,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.4, fontSize: "0.68rem" }}>
                    SHIFT ASSIGNED
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, my: 0.25 }}>
                    {adminUsersLoading ? <Skeleton width={40} /> : rosterStats.assigned}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                    Scheduled with active shift
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 20 }} />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: cardBorder,
                  bgcolor: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ letterSpacing: 0.4, fontSize: "0.68rem" }}>
                    FREE TIME / UNASSIGNED
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: theme.palette.primary.main, my: 0.25 }}>
                    {adminUsersLoading ? <Skeleton width={40} /> : rosterStats.unassigned}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.72rem" }}>
                    Flexible or unscheduled
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    color: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 20 }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Roster Search & Filter Bar */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.2, sm: 1.5 },
              mb: { xs: 2, sm: 2.5 },
              borderRadius: { xs: 2, sm: 2.5 },
              border: cardBorder,
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "stretch", md: "center" },
              justifyContent: "space-between",
              gap: 1.5,
            }}
          >
            <TextField
              size="small"
              placeholder="Search employee by name or email..."
              value={rosterSearch}
              onChange={(e) => setRosterSearch(e.target.value)}
              sx={{
                minWidth: { xs: "100%", md: 320 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f8fafc",
                  fontSize: "0.85rem",
                  height: 38,
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#cbd5e1" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                  </InputAdornment>
                ),
                endAdornment: rosterSearch && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setRosterSearch("")} sx={{ p: 0.5 }}>
                      <ClearIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel sx={{ fontSize: "0.8rem" }}>Filter by Shift</InputLabel>
                <Select
                  value={rosterFilterShift}
                  label="Filter by Shift"
                  onChange={(e) => setRosterFilterShift(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    height: 38,
                    fontSize: "0.82rem",
                    bgcolor: "#f8fafc",
                    "& fieldset": { borderColor: "#e2e8f0" },
                  }}
                >
                  <MenuItem value="all" sx={{ fontSize: "0.82rem" }}>
                    All Team Members
                  </MenuItem>
                  <MenuItem value="unassigned" sx={{ fontSize: "0.82rem" }}>
                    Free Time / Unassigned
                  </MenuItem>
                  {shifts.map((s) => (
                    <MenuItem key={s._id} value={s._id} sx={{ fontSize: "0.82rem" }}>
                      {s.shiftName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Paper>

          {/* Roster Table */}
          {adminUsersLoading && adminUsersList.length === 0 ? (
            <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2.5, bgcolor: alpha(theme.palette.primary.main, 0.1) }} />
          ) : filteredRosterUsers.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: { xs: 2, sm: 2.5 },
                border: "1px dashed #cbd5e1",
                bgcolor: "background.paper",
              }}
            >
              <PeopleAltIcon sx={{ fontSize: 36, color: "text.secondary", mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                No Team Members Found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", mt: 0.5 }}>
                {rosterSearch || rosterFilterShift !== "all"
                  ? "Try clearing your search query or shift filter."
                  : "Add team members to your organization to assign shifts."}
              </Typography>
            </Paper>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: { xs: 2, sm: 2.5 },
                border: cardBorder,
                overflow: "hidden",
                bgcolor: "background.paper",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ borderColor: "#f1f5f9" }}>
                      <Checkbox
                        size="small"
                        indeterminate={
                          selectedUserIds.length > 0 && selectedUserIds.length < filteredRosterUsers.length
                        }
                        checked={
                          filteredRosterUsers.length > 0 &&
                          selectedUserIds.length === filteredRosterUsers.length
                        }
                        onChange={handleSelectAllUsers}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>
                      EMPLOYEE
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>
                      EMAIL
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>
                      CURRENT ASSIGNED SHIFT
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>
                      TIMING & DURATION
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>
                      ACTION
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRosterUsers.map((user, idx) => {
                    const userId = user._id || user.id;
                    const isSelected = selectedUserIds.includes(userId);
                    const userShift =
                      user?.shift && typeof user.shift === "object" && (user.shift._id || user.shift.id)
                        ? user.shift
                        : shifts.find((s) => s._id === user?.shift || s._id === user?.shiftId) || null;
                    const shiftDetails = userShift ? getShiftDetails(userShift.shiftName, userShift.shiftStartTime) : null;
                    const durationInfo = userShift ? calculateTotalHours(userShift.shiftStartTime, userShift.shiftEndTime) : null;

                    return (
                      <TableRow
                        key={userId || idx}
                        hover
                        selected={isSelected}
                        sx={{
                          "&:hover": { bgcolor: "#f8fafc" },
                        }}
                      >
                        <TableCell padding="checkbox" sx={{ borderColor: "#f1f5f9" }}>
                          <Checkbox
                            size="small"
                            checked={isSelected}
                            onChange={() => handleToggleSelectUser(userId)}
                          />
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                            <Avatar
                              src={user.profileImage}
                              sx={{
                                width: 32,
                                height: 32,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontSize: "0.85rem",
                                fontWeight: 700,
                              }}
                            >
                              {(user.name || user.userName || "U").charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: "0.85rem" }}>
                                {user.name || user.userName || "Team Member"}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                                {user.designation || user.role || "Employee"}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary", fontSize: "0.82rem", borderColor: "#f1f5f9" }}>
                          {user.email || "—"}
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          {userShift ? (
                            <Chip
                              icon={shiftDetails?.icon}
                              label={userShift.shiftName}
                              size="small"
                              sx={{
                                height: 22,
                                fontSize: "0.72rem",
                                fontWeight: 600,
                                bgcolor: shiftDetails?.pillBg,
                                color: shiftDetails?.color,
                                border: `1px solid ${shiftDetails?.borderAccent}`,
                              }}
                            />
                          ) : (
                            <Chip
                              label="Free Time"
                              size="small"
                              sx={{
                                height: 22,
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                bgcolor: "#f1f5f9",
                                color: "text.secondary",
                                border: "1px solid #e2e8f0",
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          {userShift ? (
                            <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "text.primary", fontWeight: 500 }}>
                              {formatTo12Hour(userShift.shiftStartTime)} - {formatTo12Hour(userShift.shiftEndTime)}{" "}
                              <Typography component="span" variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                ({durationInfo?.text})
                              </Typography>
                            </Typography>
                          ) : (
                            <Typography variant="caption" color="text.disabled">
                              No strict shift hours
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="right" sx={{ borderColor: "#f1f5f9" }}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleOpenAssignModal(user)}
                            startIcon={<SwapHorizIcon sx={{ fontSize: 15 }} />}
                            sx={{
                              borderColor: "#e2e8f0",
                              color: theme.palette.primary.main,
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              textTransform: "none",
                              borderRadius: 1.5,
                              py: 0.4,
                              px: 1.2,
                              "&:hover": { borderColor: "#cbd5e1", bgcolor: "#f8fafc" },
                            }}
                          >
                            Reassign Shift
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* TAB 2: ASSIGNMENT HISTORY */}
      {activeTab === 2 && (
        <Box>
          {/* History Search Bar */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.2, sm: 1.5 },
              mb: { xs: 2, sm: 2.5 },
              borderRadius: { xs: 2, sm: 2.5 },
              border: cardBorder,
              bgcolor: "background.paper",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <TextField
              size="small"
              placeholder="Search audit log by employee or shift..."
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              sx={{
                minWidth: { xs: "100%", md: 350 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "#f8fafc",
                  fontSize: "0.85rem",
                  height: 38,
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "#cbd5e1" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                  </InputAdornment>
                ),
                endAdornment: historySearch && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setHistorySearch("")} sx={{ p: 0.5 }}>
                      <ClearIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Showing {filteredHistory.length} Record{filteredHistory.length !== 1 ? "s" : ""}
            </Typography>
          </Paper>

          {/* History Table */}
          {filteredHistory.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: { xs: 2, sm: 2.5 },
                border: "1px dashed #cbd5e1",
                bgcolor: "background.paper",
              }}
            >
              <HistoryIcon sx={{ fontSize: 36, color: "text.secondary", mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                No Assignment History Found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", mt: 0.5 }}>
                Shift reassignments and updates will be logged here automatically.
              </Typography>
            </Paper>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{
                borderRadius: { xs: 2, sm: 2.5 },
                border: cardBorder,
                overflow: "hidden",
                bgcolor: "background.paper",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <Table size="small">
                <TableHead sx={{ bgcolor: "#f8fafc" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>EMPLOYEE</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>PREVIOUS SHIFT</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>NEW ASSIGNED SHIFT</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>ASSIGNED BY</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>DATE & TIME</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.75rem", py: 1.2, borderColor: "#f1f5f9" }}>STATUS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHistory
                    .slice(historyPage * historyRowsPerPage, historyPage * historyRowsPerPage + historyRowsPerPage)
                    .map((item, idx) => (
                      <TableRow
                        key={item.id || idx}
                        hover
                        sx={{
                          "&:hover": { bgcolor: "#f8fafc" },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, color: "text.secondary", fontSize: "0.8rem", borderColor: "#f1f5f9" }}>
                          {historyPage * historyRowsPerPage + idx + 1}
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Box>
                            <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: "0.85rem" }}>
                              {item.userName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                              {item.userEmail}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Chip
                            label={item.previousShift}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.7rem",
                              fontWeight: 500,
                              bgcolor: "#f1f5f9",
                              color: "text.secondary",
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Chip
                            label={item.newShift}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              bgcolor: alpha(theme.palette.primary.main, 0.08),
                              color: theme.palette.primary.main,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: "text.primary", fontSize: "0.82rem", fontWeight: 500, borderColor: "#f1f5f9" }}>
                          {item.assignedBy}
                        </TableCell>
                        <TableCell sx={{ color: "text.secondary", fontSize: "0.8rem", borderColor: "#f1f5f9" }}>
                          {new Date(item.assignedAt).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </TableCell>
                        <TableCell sx={{ borderColor: "#f1f5f9" }}>
                          <Chip
                            label={item.status || "Active"}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              bgcolor: "#ecfdf5",
                              color: "#059669",
                              border: "1px solid #a7f3d0",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredHistory.length}
                rowsPerPage={historyRowsPerPage}
                page={historyPage}
                onPageChange={(e, newP) => setHistoryPage(newP)}
                onRowsPerPageChange={(e) => {
                  setHistoryRowsPerPage(parseInt(e.target.value, 10));
                  setHistoryPage(0);
                }}
                sx={{ borderTop: "1px solid #f1f5f9" }}
              />
            </TableContainer>
          )}
        </Box>
      )}

      {/* MODAL: ASSIGN / REASSIGN SHIFT */}
      <Dialog
        open={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 2.5 },
            p: 0.5,
            border: cardBorder,
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, pt: 2, px: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AssignmentIndIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="primary.dark" sx={{ fontSize: "1.05rem" }}>
                {singleAssignUser ? "Reassign Employee Shift" : "Bulk Assign Shift"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {singleAssignUser
                  ? `Select shift for ${singleAssignUser.name || singleAssignUser.userName || "user"}`
                  : `Assigning ${selectedUserIds.length} team members`}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleCloseAssignModal} size="small" sx={{ border: "1px solid #e2e8f0", borderRadius: 1.5, p: 0.5 }}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1.5, px: 2.5 }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ display: "block", mb: 0.75 }}>
                Select Target Shift *
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={targetShiftId}
                  displayEmpty
                  onChange={(e) => setTargetShiftId(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    fontSize: "0.85rem",
                    bgcolor: "#f8fafc",
                    "& fieldset": { borderColor: "#e2e8f0" },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Choose a shift schedule...</em>
                  </MenuItem>
                  <MenuItem
                    value="null"
                    sx={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#475569",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#94a3b8",
                        display: "inline-block",
                      }}
                    />
                    Free Time (Remove Shift)
                  </MenuItem>
                  {shifts.map((s) => (
                    <MenuItem key={s._id} value={s._id} sx={{ fontSize: "0.85rem" }}>
                      {s.shiftName} ({formatTo12Hour(s.shiftStartTime)} - {formatTo12Hour(s.shiftEndTime)})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {targetShiftId && (
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: targetShiftId === "null" ? alpha("#64748b", 0.08) : alpha(theme.palette.primary.main, 0.03),
                  border: `1px solid ${targetShiftId === "null" ? alpha("#64748b", 0.2) : "#e2e8f0"}`,
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ display: "block", mb: 0.5 }}>
                  ASSIGNMENT SUMMARY
                </Typography>
                <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ fontSize: "0.82rem" }}>
                  {singleAssignUser
                    ? targetShiftId === "null"
                      ? `Removing shift for ${singleAssignUser.name || singleAssignUser.userName || "user"}:`
                      : `Reassigning ${singleAssignUser.name || singleAssignUser.userName || "user"} to:`
                    : targetShiftId === "null"
                    ? `Removing shift for ${selectedUserIds.length} member(s):`
                    : `Assigning ${selectedUserIds.length} member(s) to:`}
                </Typography>
                <Typography
                  variant="body2"
                  color={targetShiftId === "null" ? "text.secondary" : "primary.main"}
                  fontWeight={700}
                  sx={{ fontSize: "0.85rem", mt: 0.25 }}
                >
                  {targetShiftId === "null"
                    ? "Free Time (No Shift Assigned)"
                    : shifts.find((s) => s._id === targetShiftId)?.shiftName}
                </Typography>
              </Paper>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 2.5, pb: 2, pt: 1 }}>
          <Button
            onClick={handleCloseAssignModal}
            disabled={isAssigning}
            size="small"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              borderRadius: 1.5,
              textTransform: "none",
              px: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExecuteShiftAssignment}
            variant="contained"
            disabled={isAssigning || !targetShiftId}
            size="small"
            sx={{
              bgcolor: theme.palette.primary.main,
              color: "white",
              fontWeight: 600,
              borderRadius: 1.5,
              textTransform: "none",
              px: 2.5,
              py: 0.75,
              boxShadow: "none",
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            {isAssigning ? (
              <CircularProgress size={16} sx={{ color: "white" }} />
            ) : targetShiftId === "null" ? (
              "Confirm & Set Free Time"
            ) : (
              "Confirm Assignment"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL: CREATE / EDIT SHIFT */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 2.5 },
            p: 0.5,
            border: cardBorder,
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1, pt: 2, px: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {editingShift ? <EditIcon sx={{ fontSize: 20 }} /> : <AddIcon sx={{ fontSize: 20 }} />}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} color="primary.dark" sx={{ fontSize: "1.1rem" }}>
                {editingShift ? "Edit Work Shift" : "Create New Shift"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {editingShift ? "Update name or timings for this shift" : "Define working hours for your teams"}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleCloseDialog} size="small" sx={{ border: "1px solid #e2e8f0", borderRadius: 1.5, p: 0.5 }}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmitShift}>
          <DialogContent sx={{ pt: 1, px: 2.5 }}>
            {!editingShift && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ display: "block", mb: 0.75, fontSize: "0.7rem" }}>
                  QUICK PRESETS
                </Typography>
                <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ gap: 0.75 }}>
                  {SHIFT_PRESETS.map((preset) => (
                    <Chip
                      key={preset.name}
                      label={preset.name}
                      onClick={() => handleApplyPreset(preset)}
                      clickable
                      size="small"
                      sx={{
                        borderRadius: 1.5,
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        height: 26,
                        bgcolor: formData.shiftName === preset.name ? alpha(theme.palette.primary.main, 0.1) : "#ffffff",
                        color: formData.shiftName === preset.name ? theme.palette.primary.main : "text.secondary",
                        border: formData.shiftName === preset.name ? `1px solid ${theme.palette.primary.main}` : `1px solid #e2e8f0`,
                        "&:hover": {
                          bgcolor: "#f8fafc",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ display: "block", mb: 0.5 }}>
                  Shift Name *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  name="shiftName"
                  placeholder="e.g. General Shift, Morning Shift, Night Shift"
                  value={formData.shiftName}
                  onChange={handleFormChange}
                  error={Boolean(formErrors.shiftName)}
                  helperText={formErrors.shiftName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferIcon sx={{ color: "text.secondary", fontSize: 16 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      fontSize: "0.85rem",
                      bgcolor: "#f8fafc",
                      "& fieldset": { borderColor: "#e2e8f0" },
                      "&:hover fieldset": { borderColor: "#cbd5e1" },
                    },
                  }}
                />
              </Box>

              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ display: "block", mb: 0.5 }}>
                    Start Time *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="time"
                    name="shiftStartTime"
                    value={formData.shiftStartTime}
                    onChange={handleFormChange}
                    error={Boolean(formErrors.shiftStartTime)}
                    helperText={formErrors.shiftStartTime}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon sx={{ color: "text.secondary", fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        fontSize: "0.85rem",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "#cbd5e1" },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ display: "block", mb: 0.5 }}>
                    End Time *
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="time"
                    name="shiftEndTime"
                    value={formData.shiftEndTime}
                    onChange={handleFormChange}
                    error={Boolean(formErrors.shiftEndTime)}
                    helperText={formErrors.shiftEndTime}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTimeIcon sx={{ color: "text.secondary", fontSize: 16 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        fontSize: "0.85rem",
                        bgcolor: "#f8fafc",
                        "& fieldset": { borderColor: "#e2e8f0" },
                        "&:hover fieldset": { borderColor: "#cbd5e1" },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {formData.shiftStartTime && formData.shiftEndTime && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    border: `1px solid ${livePreview.details.borderAccent || "#e2e8f0"}`,
                    bgcolor: livePreview.details.bgLight,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                      <Box sx={{ color: livePreview.details.color }}>{livePreview.details.icon}</Box>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ color: livePreview.details.color, fontSize: "0.85rem" }}>
                        {formData.shiftName || "Shift Preview"}
                      </Typography>
                    </Box>
                    <Chip
                      label={livePreview.duration.text}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        height: 20,
                        bgcolor: livePreview.details.color,
                        color: "white",
                        borderRadius: 1.5,
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.72rem" }}>
                    <ScheduleIcon sx={{ fontSize: 12 }} />
                    {formatTo12Hour(formData.shiftStartTime)} - {formatTo12Hour(formData.shiftEndTime)}
                    {livePreview.duration.isOvernight && (
                      <Typography component="span" variant="caption" sx={{ color: "secondary.dark", fontWeight: 700, fontSize: "0.72rem" }}>
                        (Crosses midnight • +1 Day)
                      </Typography>
                    )}
                  </Typography>
                </Paper>
              )}
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 2.5, pb: 2, pt: 1 }}>
            <Button
              onClick={handleCloseDialog}
              disabled={isSubmitting}
              size="small"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                borderRadius: 1.5,
                textTransform: "none",
                px: 2,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              size="small"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                fontWeight: 600,
                borderRadius: 1.5,
                textTransform: "none",
                px: 2.5,
                py: 0.75,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                  boxShadow: "0 2px 8px rgba(16, 44, 74, 0.2)",
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={16} sx={{ color: "white" }} />
              ) : editingShift ? (
                "Save Changes"
              ) : (
                "Create Shift"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* MODAL: DELETE SHIFT */}
      <Dialog
        open={deleteConfirmDialog.open}
        onClose={() => !isDeleting && setDeleteConfirmDialog({ open: false, shift: null })}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: 2, sm: 2.5 },
            p: 1,
            border: cardBorder,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", pb: 0.5, pt: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "#fef2f2",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1,
            }}
          >
            <DeleteIcon sx={{ fontSize: 22 }} />
          </Box>
          <Typography variant="h6" fontWeight={700} color="text.primary" sx={{ fontSize: "1.05rem" }}>
            Delete Shift?
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", pb: 1.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>
            Are you sure you want to delete{" "}
            <strong>"{deleteConfirmDialog.shift?.shiftName}"</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 1, pb: 1.5 }}>
          <Button
            onClick={() => setDeleteConfirmDialog({ open: false, shift: null })}
            disabled={isDeleting}
            size="small"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
              borderRadius: 1.5,
              textTransform: "none",
              px: 2.5,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
            size="small"
            sx={{
              bgcolor: "#ef4444",
              color: "white",
              fontWeight: 600,
              borderRadius: 1.5,
              textTransform: "none",
              px: 2.5,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#dc2626",
              },
            }}
          >
            {isDeleting ? <CircularProgress size={16} sx={{ color: "white" }} /> : "Delete Shift"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ShiftManagement;
