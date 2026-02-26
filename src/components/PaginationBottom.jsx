import React from "react";
import { Box, Pagination, PaginationItem, Typography, alpha } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@mui/icons-material";

export const PaginationBottom = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
        mb: 2,
        gap: 2,
      }}
    >
      <PaginationItem
        type="previous"
        disabled={currentPage === 1}
        onClick={handlePrevious}
        sx={{
          "&:hover:not(.Mui-disabled)": {
            bgcolor: alpha("#0f766e", 0.1),
          },
        }}
      >
        <ChevronLeftIcon />
      </PaginationItem>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = currentPage === pageNum;
          
          return (
            <PaginationItem
              key={idx}
              page={pageNum}
              selected={isActive}
              onClick={() => onPageChange(pageNum)}
              sx={{
                minWidth: 36,
                height: 36,
                borderRadius: 1,
                fontWeight: isActive ? 600 : 400,
                bgcolor: isActive ? "#0f766e" : "transparent",
                color: isActive ? "white" : "#64748b",
                "&:hover": {
                  bgcolor: isActive ? "#0a5c55" : alpha("#0f766e", 0.1),
                },
              }}
            >
              {pageNum}
            </PaginationItem>
          );
        })}
      </Box>

      <PaginationItem
        type="next"
        disabled={currentPage === totalPages}
        onClick={handleNext}
        sx={{
          "&:hover:not(.Mui-disabled)": {
            bgcolor: alpha("#0f766e", 0.1),
          },
        }}
      >
        <ChevronRightIcon />
      </PaginationItem>
    </Box>
  );
};

export default PaginationBottom;