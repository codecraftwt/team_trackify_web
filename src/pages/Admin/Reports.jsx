import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
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
  TablePagination,
  LinearProgress,
  alpha,
  useTheme,
  Avatar,
  Tooltip,
  Stack,
  Chip,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Assessment as ReportIcon,
  Event as EventIcon,
  CheckCircle as CheckInIcon,
  Cancel as CheckOutIcon,
  Speed as DistanceIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getReportsByAdmin } from "../../redux/slices/reportSlice";
import { formatDateTimeDDMMYYYY } from "../../utils/dateFormat";
import { useDebounce } from "../../Hooks/useDebounce";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

const Reports = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { reports = [], pagination = {}, loading = false } = useSelector((state) => state.report || {});

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(
      getReportsByAdmin({
        page: currentPage + 1,
        limit: rowsPerPage,
        search: debouncedSearchQuery || undefined,
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate,
      })
    );
  }, [dispatch, currentPage, rowsPerPage, dateRange, debouncedSearchQuery]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleDateChange = (field) => (event) => {
    setDateRange(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    setCurrentPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setTextColor(15, 118, 110);
      doc.setFont(undefined, "bold");
      doc.text("Team Trackify", 105, 15, { align: "center" });

      doc.setFont(undefined, "normal");
      doc.setTextColor(0, 0, 0);

      doc.setFontSize(16);
      doc.text("User Reports", 105, 25, { align: "center" });

      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 35, {
        align: "center",
      });

      if (dateRange.fromDate || dateRange.toDate) {
        doc.setFontSize(10);
        doc.text(
          `Date range: ${
            dateRange.fromDate
              ? new Date(dateRange.fromDate).toLocaleDateString()
              : "Start"
          } - ${
            dateRange.toDate
              ? new Date(dateRange.toDate).toLocaleDateString()
              : "End"
          }`,
          105,
          35,
          { align: "center" }
        );
      }

      const headers = [
        "#",
        "User Name",
        "Email",
        "Check In",
        "Check Out",
        "Distance (km)",
        "Status",
      ];

      const data = reports.map((report, index) => [
        index + 1,
        report.user?.name || "-",
        report.user?.email || "-",
        report.check_in_time
          ? formatDateTimeDDMMYYYY(report.check_in_time)
          : "-",
        report.check_out_time
          ? formatDateTimeDDMMYYYY(report.check_out_time)
          : "-",
        report.tracker?.total_distance
          ? `${report.tracker.total_distance.toFixed(2)}`
          : "-",
        report.tracker?.status || "-",
      ]);

      autoTable(doc, {
        head: [headers],
        body: data,
        startY: dateRange.fromDate || dateRange.toDate ? 55 : 45,
        styles: {
          cellPadding: 2,
          fontSize: 9,
          valign: "middle",
          halign: "left",
        },
        headStyles: {
          fillColor: [15, 118, 110],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240],
        },
      });

      const filename = `user-reports-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      doc.save(filename);
      
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "checked in":
        return <CheckInIcon sx={{ color: "#22c55e", fontSize: 16 }} />;
      case "checked out":
        return <CheckOutIcon sx={{ color: "#ef4444", fontSize: 16 }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "checked in":
        return "#22c55e";
      case "checked out":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#e2e8f0", 0.5),
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: alpha("#0f766e", 0.1),
                color: "#0f766e",
                width: 48,
                height: 48,
              }}
            >
              <ReportIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: "#0f766e" }}>
                User Reports
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All user check-in/check-out reports
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={isDownloading ? <LinearProgress size={20} sx={{ color: "white" }} /> : <DownloadIcon />}
            onClick={handleDownloadPDF}
            disabled={loading || isDownloading}
            sx={{
              bgcolor: "#0f766e",
              "&:hover": { bgcolor: "#0a5c55" },
              minWidth: 140,
            }}
          >
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
        </Paper>

        {/* Search and Filters */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#e2e8f0", 0.5),
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search reports by user name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#0f766e" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: alpha("#0f766e", 0.05),
                },
              }}
            />
            
            <Stack direction="row" spacing={2} sx={{ minWidth: { md: 400 } }}>
              <TextField
                fullWidth
                type="date"
                label="From Date"
                value={dateRange.fromDate}
                onChange={handleDateChange("fromDate")}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                fullWidth
                type="date"
                label="To Date"
                value={dateRange.toDate}
                onChange={handleDateChange("toDate")}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Stack>
          </Stack>
        </Paper>

        {/* Reports Table */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: alpha("#e2e8f0", 0.5),
            overflow: "hidden",
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                bgcolor: alpha("#0f766e", 0.1),
                "& .MuiLinearProgress-bar": { bgcolor: "#0f766e" },
              }}
            />
          )}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: alpha("#0f766e", 0.05) }}>
                  <TableCell>#</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Distance</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <AnimatePresence>
                  {reports.map((report, index) => (
                    <motion.tr
                      key={report._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      style={{
                        backgroundColor: index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5),
                      }}
                    >
                      <TableCell>{currentPage * rowsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar
                            src={report.user?.avtar}
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: alpha("#0f766e", 0.1),
                              color: "#0f766e",
                            }}
                          >
                            {report.user?.name?.charAt(0) || <PersonIcon fontSize="small" />}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {report.user?.name || "-"}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{report.user?.email || "-"}</TableCell>
                      <TableCell>
                        {report.check_in_time ? (
                          <Tooltip title={formatDateTimeDDMMYYYY(report.check_in_time)}>
                            <Chip
                              size="small"
                              icon={<EventIcon sx={{ fontSize: 14 }} />}
                              label={new Date(report.check_in_time).toLocaleTimeString()}
                              sx={{
                                bgcolor: alpha("#0f766e", 0.1),
                                color: "#0f766e",
                                fontSize: "0.7rem",
                              }}
                            />
                          </Tooltip>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        {report.check_out_time ? (
                          <Tooltip title={formatDateTimeDDMMYYYY(report.check_out_time)}>
                            <Chip
                              size="small"
                              icon={<EventIcon sx={{ fontSize: 14 }} />}
                              label={new Date(report.check_out_time).toLocaleTimeString()}
                              sx={{
                                bgcolor: alpha("#64748b", 0.1),
                                color: "#64748b",
                                fontSize: "0.7rem",
                              }}
                            />
                          </Tooltip>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        {report.tracker?.total_distance ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <DistanceIcon sx={{ color: "#0f766e", fontSize: 16 }} />
                            <Typography variant="body2">
                              {report.tracker.total_distance.toFixed(2)} km
                            </Typography>
                          </Box>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        {report.tracker?.status && (
                          <Chip
                            icon={getStatusIcon(report.tracker.status)}
                            label={report.tracker.status}
                            size="small"
                            sx={{
                              bgcolor: alpha(getStatusColor(report.tracker.status), 0.1),
                              color: getStatusColor(report.tracker.status),
                              fontWeight: 600,
                              fontSize: "0.7rem",
                            }}
                          />
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={pagination.totalItems || 0}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            sx={{
              borderTop: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
              "& .MuiTablePagination-select": { borderRadius: 2 },
            }}
          />
        </Paper>

        {/* Empty State */}
        {!loading && reports.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              mt: 3,
              borderRadius: 3,
              textAlign: "center",
              border: "1px solid",
              borderColor: alpha("#e2e8f0", 0.5),
            }}
          >
            <ReportIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No reports found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or date filters
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Reports;