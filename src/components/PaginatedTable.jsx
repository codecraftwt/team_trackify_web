import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  LinearProgress,
  Box,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  Avatar,
  Stack,
} from "@mui/material";
import {
  FilterList as FilterIcon,
  PictureAsPdf as PdfIcon,
  Clear as ClearIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const PaginatedTable = ({
  title = "Data List",
  subtitle = "Complete list of items",
  icon = null,
  columns = [],
  data = [],
  totalPages = 1,
  totalCount = 0,
  currentPage = 1,
  onPageChange = () => {},
  loading = false,
  rowRender = null,
  showDateFilter = false,
  onDateChange,
  currentDateRange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  showExportPdf = false,
  onExportPdf,
  customActions = null,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(currentPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateRange, setDateRange] = useState(
    currentDateRange || { fromDate: "", toDate: "" }
  );

  useEffect(() => {
    setPage(currentPage - 1);
  }, [currentPage]);

  useEffect(() => {
    setRowsPerPage(itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    setDateRange(currentDateRange || { fromDate: "", toDate: "" });
  }, [currentDateRange]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    onItemsPerPageChange(newRowsPerPage);
    onPageChange(1);
  };

  const handleApplyFilter = () => {
    setShowDateModal(false);
    onDateChange(dateRange);
  };

  const handleClearFilter = () => {
    const clearedRange = { fromDate: "", toDate: "" };
    setDateRange(clearedRange);
    onDateChange(clearedRange);
    setShowDateModal(false);
  };

  const hasActiveFilter = currentDateRange?.fromDate || currentDateRange?.toDate;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
        overflow: "hidden",
        position: "relative",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {icon && (
            <Avatar
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
          )}
          <Box>
            <Typography variant="h6" fontWeight={600} color="white">
              {title}
            </Typography>
            <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.8) }}>
              {subtitle}
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1}>
          {showDateFilter && (
            <Tooltip title="Date Filter">
              <Button
                variant="contained"
                size="small"
                startIcon={<FilterIcon />}
                onClick={() => setShowDateModal(true)}
                sx={{
                  bgcolor: "white",
                  color: "#0f766e",
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.9),
                  },
                  position: "relative",
                }}
              >
                Date Filter
                {hasActiveFilter && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: "#ef4444",
                      border: "2px solid white",
                    }}
                  />
                )}
              </Button>
            </Tooltip>
          )}

          {showExportPdf && (
            <Tooltip title="Export PDF">
              <Button
                variant="contained"
                size="small"
                startIcon={<PdfIcon />}
                onClick={onExportPdf}
                sx={{
                  bgcolor: "white",
                  color: "#0f766e",
                  "&:hover": {
                    bgcolor: alpha("#ffffff", 0.9),
                  },
                }}
              >
                Export PDF
              </Button>
            </Tooltip>
          )}

          {customActions}

          <Chip
            label={`${totalCount || data.length} Results`}
            size="small"
            sx={{
              bgcolor: alpha("#ffffff", 0.2),
              color: "white",
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 28,
            }}
          />
        </Stack>
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <LinearProgress
          sx={{
            bgcolor: alpha("#0f766e", 0.1),
            "& .MuiLinearProgress-bar": {
              bgcolor: "#0f766e",
            },
          }}
        />
      )}

      {/* Table */}
      <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  sx={{
                    bgcolor: alpha("#0f766e", 0.05),
                    fontWeight: 600,
                    color: "#1e293b",
                    fontSize: "0.85rem",
                    py: 2,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">Loading data...</Typography>
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                data.map((item, index) => {
                  const rowBg = index % 2 === 0 ? "transparent" : alpha("#f8fafc", 0.5);

                  if (rowRender) {
                    return rowRender(item, index, rowBg);
                  }

                  return (
                    <TableRow
                      key={index}
                      component={motion.tr}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      sx={{
                        "&:hover": {
                          bgcolor: alpha("#0f766e", 0.05),
                        },
                      }}
                    >
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          sx={{
                            bgcolor: rowBg,
                            py: 2,
                            fontSize: "0.85rem",
                          }}
                        >
                          {item[col.key] || "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                    <Typography color="text.secondary">No data found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalCount || data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        sx={{
          borderTop: "1px solid",
          borderColor: alpha("#e2e8f0", 0.5),
          "& .MuiTablePagination-select": {
            borderRadius: 2,
          },
        }}
      />

      {/* Date Filter Modal */}
      <Dialog
        open={showDateModal}
        onClose={() => setShowDateModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" fontWeight={600} color="#1e293b">
            Filter by Date Range
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              type="date"
              label="From Date"
              value={dateRange.fromDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, fromDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              size="small"
            />
            <TextField
              fullWidth
              type="date"
              label="To Date"
              value={dateRange.toDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, toDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              size="small"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleClearFilter}
            startIcon={<ClearIcon />}
            sx={{ color: "#64748b" }}
          >
            Clear
          </Button>
          <Button
            onClick={handleApplyFilter}
            variant="contained"
            startIcon={<CheckIcon />}
            sx={{
              bgcolor: "#0f766e",
              "&:hover": { bgcolor: "#0a5c55" },
            }}
          >
            Apply Filter
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PaginatedTable;