import React from "react";
import { Box, Pagination, PaginationItem, Typography, alpha, useTheme } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "@mui/icons-material";

export const PaginationBottom = ({ currentPage, totalPages, onPageChange }) => {
  const theme = useTheme();
  
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
        mt: 2,
        mb: 1.5,
        gap: 1.5,
      }}
    >
      <PaginationItem
        type="previous"
        disabled={currentPage === 1}
        onClick={handlePrevious}
        sx={{
          minWidth: 32,
          height: 32,
          borderRadius: 1.5,
          "&:hover:not(.Mui-disabled)": {
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          },
        }}
      >
        <ChevronLeftIcon sx={{ fontSize: 18 }} />
      </PaginationItem>

      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
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
                minWidth: 28,
                height: 28,
                borderRadius: 1.5,
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.75rem',
                bgcolor: isActive ? theme.palette.primary.main : "transparent",
                color: isActive ? "primary.contrastText" : "text.secondary",
                "&:hover": {
                  bgcolor: isActive ? theme.palette.primary.dark : alpha(theme.palette.primary.main, 0.1),
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
          minWidth: 32,
          height: 32,
          borderRadius: 1.5,
          "&:hover:not(.Mui-disabled)": {
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          },
        }}
      >
        <ChevronRightIcon sx={{ fontSize: 18 }} />
      </PaginationItem>
    </Box>
  );
};

export default PaginationBottom;