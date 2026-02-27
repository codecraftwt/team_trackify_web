// import React from "react";
// import { Grid, Paper, Typography, Box, Avatar } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const StatsCards = ({ stats }) => {
//   const navigate = useNavigate();

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <Grid container spacing={2} sx={{ mb: 4 }}>
//       {stats.map((stat, index) => (
//         <Grid item xs={12} sm={6} md={3} key={stat.key || index}>
//           <motion.div variants={itemVariants}>
//             <Paper
//               elevation={0}
//               onClick={() => stat.onClick?.(navigate)}
//               sx={{
//                 p: 2,
//                 borderRadius: 2,
//                 border: "1px solid #e0e0e0",
//                 cursor: stat.onClick ? "pointer" : "default",
//                 transition: "all 0.3s ease",
//                 "&:hover": stat.onClick
//                   ? {
//                       boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                       transform: "translateY(-2px)",
//                       borderColor: stat.iconColor,
//                     }
//                   : {},
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <Box>
//                   <Typography variant="h4" fontWeight="bold" gutterBottom>
//                     {stat.count}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {stat.label}
//                   </Typography>
//                 </Box>
//                 <Avatar
//                   sx={{
//                     bgcolor: stat.bgColor,
//                     color: stat.iconColor,
//                     width: 48,
//                     height: 48,
//                   }}
//                 >
//                   {stat.icon}
//                 </Avatar>
//               </Box>
//             </Paper>
//           </motion.div>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default StatsCards;


import React from "react";
import { Paper, Box, Typography, Avatar, alpha } from "@mui/material";

const StatsCard = ({ icon: Icon, value, label, iconBg, iconColor }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: "1px solid",
        borderColor: alpha("#e2e8f0", 0.5),
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 10px 25px -5px ${alpha(iconColor, 0.3)}`,
          borderColor: iconColor,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4" fontWeight="700" sx={{ color: "#1e293b", mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>
        </Box>
        <Avatar
          sx={{
            bgcolor: iconBg,
            color: iconColor,
            width: 48,
            height: 48,
          }}
        >
          <Icon />
        </Avatar>
      </Box>
    </Paper>
  );
};

export default StatsCard;