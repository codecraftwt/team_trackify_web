import React from "react";
import { Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StatsCards = ({ stats }) => {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              onClick={() => stat.onClick?.(navigate)}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                cursor: stat.onClick ? "pointer" : "default",
                transition: "all 0.3s ease",
                "&:hover": stat.onClick
                  ? {
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      transform: "translateY(-2px)",
                      borderColor: stat.iconColor,
                    }
                  : {},
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {stat.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: stat.bgColor,
                    color: stat.iconColor,
                    width: 48,
                    height: 48,
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;