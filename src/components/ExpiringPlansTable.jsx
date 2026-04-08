// import React from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Chip,
//   Avatar,
//   alpha,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   People as PeopleIcon,
//   Warning as WarningIcon,
//   Event as EventIcon,
//   AttachMoney as MoneyIcon,
//   Phone as PhoneIcon,
// } from "@mui/icons-material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const ExpiringPlansTable = ({ data = [] }) => {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   const formatPhoneNumber = (phone) => {
//     if (!phone || phone === "N/A") return "N/A";
    
//     const phoneStr = String(phone).replace(/\D/g, '');
    
//     if (phoneStr.length === 10) {
//       return `${phoneStr.slice(0, 3)}-${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
//     } else if (phoneStr.length > 10) {
//       return `+${phoneStr}`;
//     }
//     return phone;
//   };

//   const getRemainingDaysColor = (days) => {
//     if (days <= 0) return "#ef4444";
//     if (days <= 7) return theme.palette.secondary.main;
//     return "#22c55e";
//   };

//   const getStatusText = (days) => {
//     if (days <= 0) return "Expired";
//     if (days <= 3) return "Critical";
//     if (days <= 7) return "Warning";
//     return "Active";
//   };
  
//   const SingleLineView = () => {
//     return (
//       <Box sx={{ p: { xs: 0.75, sm: 1, md: 1.5 } }}>
//         <AnimatePresence>
//           {data.length > 0 ? (
//             data.map((user, index) => {
//               const remainingDays = user.remainingDays || 0;
//               const statusColor = getRemainingDaysColor(remainingDays);

//               return (
//                 <motion.div
//                   key={`${user.userId || user._id}-${index}`}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2, delay: index * 0.03 }}
//                 >
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       flexWrap: 'wrap',
//                       gap: { xs: 0.75, sm: 1, md: 1.5 },
//                       p: { xs: 0.75, sm: 1 },
//                       mb: 0.75,
//                       borderRadius: 1.5,
//                       bgcolor: index % 2 === 0 ? 'transparent' : alpha(theme.palette.primary.main, 0.02),
//                       border: '1px solid',
//                       borderColor: alpha(theme.palette.divider, 0.2),
//                       cursor: 'pointer',
//                       '&:hover': {
//                         bgcolor: alpha(theme.palette.primary.main, 0.02),
//                         borderColor: alpha(theme.palette.primary.main, 0.15),
//                       },
//                     }}
//                     onClick={() => navigate('/super-admin/plans')}
//                   >
//                     {/* User Info */}
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 1.5,
//                       minWidth: { xs: '100%', sm: '180px', md: '220px' }
//                     }}>
//                       <Avatar
//                         src={user.userAvatar}
//                         sx={{
//                           width: { xs: 24, sm: 28, md: 32 },
//                           height: { xs: 24, sm: 28, md: 32 },
//                           bgcolor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
//                         }}
//                       >
//                         {user.userName?.charAt(0) || "U"}
//                       </Avatar>
//                       <Box sx={{ minWidth: 0 }}>
//                         <Typography
//                           variant="body2"
//                           fontWeight={600}
//                           color="text.primary"
//                           sx={{
//                             fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
//                             whiteSpace: 'nowrap',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis',
//                           }}
//                         >
//                           {user.userName || "N/A"}
//                         </Typography>
//                         {!isMobile && (
//                           <Typography
//                             variant="caption"
//                             color="text.secondary"
//                             sx={{
//                               fontSize: { xs: '0.55rem', sm: '0.6rem' },
//                               display: 'block',
//                               whiteSpace: 'nowrap',
//                               overflow: 'hidden',
//                               textOverflow: 'ellipsis',
//                               maxWidth: '140px'
//                             }}
//                           >
//                             {user.userEmail || "N/A"}
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>

//                     {/* Mobile Number - Using userMobileNo from backend */}
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 0.5,
//                       minWidth: { xs: '100%', sm: '100px', md: '120px' }
//                     }}>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
//                       >
//                         Phone:
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
//                         <PhoneIcon sx={{
//                           color: theme.palette.primary.main,
//                           fontSize: { xs: 8, sm: 10, md: 12 }
//                         }} />
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                             whiteSpace: 'nowrap',
//                           }}
//                         >
//                           {formatPhoneNumber(user.userMobileNo)}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Plan Info */}
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 0.5,
//                       minWidth: { xs: '100%', sm: '100px', md: '120px' }
//                     }}>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
//                       >
//                         Plan:
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         fontWeight={500}
//                         sx={{
//                           fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
//                           whiteSpace: 'nowrap',
//                           overflow: 'hidden',
//                           textOverflow: 'ellipsis',
//                         }}
//                       >
//                         {user.planName || "N/A"}
//                       </Typography>
//                     </Box>

//                     {/* Price */}
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 0.5,
//                       minWidth: { xs: '100%', sm: '70px', md: '80px' }
//                     }}>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
//                       >
//                         Price:
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
//                         <MoneyIcon sx={{
//                           color: theme.palette.primary.main,
//                           fontSize: { xs: 8, sm: 10, md: 12 }
//                         }} />
//                         <Typography
//                           variant="body2"
//                           fontWeight={500}
//                           sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}
//                         >
//                           ₹{user.planPrice || "0"}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Expires */}
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 0.5,
//                       minWidth: { xs: '100%', sm: '90px', md: '100px' }
//                     }}>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
//                       >
//                         Expires:
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
//                         <EventIcon sx={{
//                           color: theme.palette.text.secondary,
//                           fontSize: { xs: 8, sm: 9, md: 10 }
//                         }} />
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                             whiteSpace: 'nowrap',
//                           }}
//                         >
//                           {formatDate(user.expiresAt)}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Status Badge */}
//                     <Box sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 0.5,
//                       ml: { xs: 0, sm: 'auto' },
//                       minWidth: { xs: '100%', sm: '70px', md: '80px' }
//                     }}>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
//                       >
//                         Status:
//                       </Typography>
//                       <Chip
//                         label={remainingDays > 0 ? `${remainingDays}d` : "Expired"}
//                         size="small"
//                         icon={remainingDays <= 0 ? <WarningIcon /> : undefined}
//                         sx={{
//                           bgcolor: alpha(statusColor, 0.1),
//                           color: statusColor,
//                           fontWeight: 600,
//                           fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                           height: { xs: 18, sm: 20, md: 22 },
//                           '& .MuiChip-icon': {
//                             fontSize: { xs: 8, sm: 10 },
//                           },
//                           minWidth: { xs: 50, sm: 55, md: 60 },
//                         }}
//                       />
//                     </Box>
//                   </Box>
//                 </motion.div>
//               );
//             })
//           ) : (
//             <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4, md: 5 } }}>
//               <PeopleIcon sx={{
//                 fontSize: { xs: 36, sm: 40, md: 44 },
//                 color: alpha(theme.palette.primary.main, 0.3),
//                 mb: 1.5
//               }} />
//               <Typography
//                 variant="body1"
//                 color="text.secondary"
//                 gutterBottom
//                 sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
//               >
//                 No users with expiring plans
//               </Typography>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
//               >
//                 All plans are up to date
//               </Typography>
//             </Box>
//           )}
//         </AnimatePresence>
//       </Box>
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Paper
//         elevation={0}
//         sx={{
//           borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
//           overflow: "hidden",
//           border: "1px solid",
//           borderColor: alpha(theme.palette.primary.main, 0.1),
//           boxShadow: `0 5px 15px -8px ${alpha(theme.palette.primary.main, 0.1)}`,
//           bgcolor: theme.palette.background.paper,
//         }}
//       >
//         <Box
//           sx={{
//             p: { xs: 1.5, sm: 1.75, md: 2 },
//             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//             color: "white",
//           }}
//         >
//           <Box sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 0.75
//           }}>
//             <Box>
//               <Typography
//                 variant="subtitle1"
//                 fontWeight={600}
//                 color="white"
//                 sx={{
//                   fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
//                   mb: 0.25
//                 }}
//               >
//                 Users with Expiring Plans
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   color: alpha("#ffffff", 0.8),
//                   fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }
//                 }}
//               >
//                 {`${data.length} ${data.length === 1 ? 'user' : 'users'} found`}
//               </Typography>
//             </Box>

//             <Chip
//               label={`${data.length}`}
//               size="small"
//               icon={<PeopleIcon sx={{ fontSize: { xs: 8, sm: 10, md: 12 } }} />}
//               sx={{
//                 bgcolor: alpha("#ffffff", 0.2),
//                 color: "white",
//                 fontWeight: 600,
//                 fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
//                 height: { xs: 20, sm: 22, md: 24 },
//                 "& .MuiChip-icon": {
//                   color: "white",
//                   fontSize: { xs: 8, sm: 10, md: 12 },
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         <SingleLineView />
//       </Paper>
//     </motion.div>
//   );
// };

// export default ExpiringPlansTable;


import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Avatar,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  People as PeopleIcon,
  Warning as WarningIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ExpiringPlansTable = ({ data = [] }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Filter data to show only plans expiring within 30 days from now
  const filteredData = data.filter(user => {
    const expiresAt = user.expiresAt;
    if (!expiresAt) return false;
    
    const now = moment();
    const expiryDate = moment(expiresAt);
    const daysUntilExpiry = expiryDate.diff(now, 'days');
    
    // Show only if days until expiry is between 1 and 30 days (not expired, not today)
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  });

  // Sort filtered data by remaining days (ascending - closest expiry first)
  const sortedData = [...filteredData].sort((a, b) => {
    const daysA = moment(a.expiresAt).diff(moment(), 'days');
    const daysB = moment(b.expiresAt).diff(moment(), 'days');
    return daysA - daysB;
  });

  // Show only first 5 results
  const limitedData = sortedData.slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPhoneNumber = (phone) => {
    if (!phone || phone === "N/A") return "N/A";
    
    const phoneStr = String(phone).replace(/\D/g, '');
    
    if (phoneStr.length === 10) {
      return `${phoneStr.slice(0, 3)}-${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
    } else if (phoneStr.length > 10) {
      return `+${phoneStr}`;
    }
    return phone;
  };

  const getRemainingDaysColor = (days) => {
    if (days <= 0) return "#ef4444";
    if (days <= 7) return theme.palette.secondary.main;
    return "#22c55e";
  };

  const getStatusText = (days) => {
    if (days <= 0) return "Expired";
    if (days <= 3) return "Critical";
    if (days <= 7) return "Warning";
    return "Active";
  };
  
  const SingleLineView = () => {
    return (
      <Box sx={{ p: { xs: 0.75, sm: 1, md: 1.5 } }}>
        <AnimatePresence>
          {limitedData.length > 0 ? (
            limitedData.map((user, index) => {
              const remainingDays = moment(user.expiresAt).diff(moment(), 'days');
              const statusColor = getRemainingDaysColor(remainingDays);

              return (
                <motion.div
                  key={`${user.userId || user._id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: { xs: 0.75, sm: 1, md: 1.5 },
                      p: { xs: 0.75, sm: 1 },
                      mb: 0.75,
                      borderRadius: 1.5,
                      bgcolor: index % 2 === 0 ? 'transparent' : alpha(theme.palette.primary.main, 0.02),
                      border: '1px solid',
                      borderColor: alpha(theme.palette.divider, 0.2),
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                        borderColor: alpha(theme.palette.primary.main, 0.15),
                      },
                    }}
                    onClick={() => navigate('/super-admin/plans')}
                  >
                    {/* User Info */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      minWidth: { xs: '100%', sm: '180px', md: '220px' }
                    }}>
                      <Avatar
                        src={user.userAvatar}
                        sx={{
                          width: { xs: 24, sm: 28, md: 32 },
                          height: { xs: 24, sm: 28, md: 32 },
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.8rem' },
                        }}
                      >
                        {user.userName?.charAt(0) || "U"}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="text.primary"
                          sx={{
                            fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {user.userName || "N/A"}
                        </Typography>
                        {!isMobile && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              fontSize: { xs: '0.55rem', sm: '0.6rem' },
                              display: 'block',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '140px'
                            }}
                          >
                            {user.userEmail || "N/A"}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Mobile Number */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: { xs: '100%', sm: '100px', md: '120px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
                      >
                        Phone:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                        <PhoneIcon sx={{
                          color: theme.palette.primary.main,
                          fontSize: { xs: 8, sm: 10, md: 12 }
                        }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formatPhoneNumber(user.userMobileNo)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Plan Info */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: { xs: '100%', sm: '100px', md: '120px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
                      >
                        Plan:
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {user.planName || "N/A"}
                      </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: { xs: '100%', sm: '70px', md: '80px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
                      >
                        Price:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
                        <MoneyIcon sx={{
                          color: theme.palette.primary.main,
                          fontSize: { xs: 8, sm: 10, md: 12 }
                        }} />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' } }}
                        >
                          ₹{user.planPrice || "0"}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Expires */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: { xs: '100%', sm: '90px', md: '100px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
                      >
                        Expires:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
                        <EventIcon sx={{
                          color: theme.palette.text.secondary,
                          fontSize: { xs: 8, sm: 9, md: 10 }
                        }} />
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {formatDate(user.expiresAt)}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Status Badge */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      ml: { xs: 0, sm: 'auto' },
                      minWidth: { xs: '100%', sm: '70px', md: '80px' }
                    }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: { xs: 'inline', sm: 'none' }, mr: 0.5 }}
                      >
                        Status:
                      </Typography>
                      <Chip
                        label={`${remainingDays}d`}
                        size="small"
                        icon={remainingDays <= 7 ? <WarningIcon /> : undefined}
                        sx={{
                          bgcolor: alpha(statusColor, 0.1),
                          color: statusColor,
                          fontWeight: 600,
                          fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                          height: { xs: 18, sm: 20, md: 22 },
                          '& .MuiChip-icon': {
                            fontSize: { xs: 8, sm: 10 },
                          },
                          minWidth: { xs: 50, sm: 55, md: 60 },
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              );
            })
          ) : (
            <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4, md: 5 } }}>
              <PeopleIcon sx={{
                fontSize: { xs: 36, sm: 40, md: 44 },
                color: alpha(theme.palette.primary.main, 0.3),
                mb: 1.5
              }} />
              <Typography
                variant="body1"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}
              >
                No users with expiring plans
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
              >
                No plans expiring within the next 30 days
              </Typography>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
          overflow: "hidden",
          border: "1px solid",
          borderColor: alpha(theme.palette.primary.main, 0.1),
          boxShadow: `0 5px 15px -8px ${alpha(theme.palette.primary.main, 0.1)}`,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 1.75, md: 2 },
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: "white",
          }}
        >
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 0.75
          }}>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="white"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                  mb: 0.25
                }}
              >
                Users with Expiring Plans (Next 30 Days)
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha("#ffffff", 0.8),
                  fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' }
                }}
              >
                {`${limitedData.length} ${limitedData.length === 1 ? 'user' : 'users'} with plans expiring in next 30 days`}
              </Typography>
            </Box>

            <Chip
              label={`${limitedData.length}`}
              size="small"
              icon={<PeopleIcon sx={{ fontSize: { xs: 8, sm: 10, md: 12 } }} />}
              sx={{
                bgcolor: alpha("#ffffff", 0.2),
                color: "white",
                fontWeight: 600,
                fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.65rem' },
                height: { xs: 20, sm: 22, md: 24 },
                "& .MuiChip-icon": {
                  color: "white",
                  fontSize: { xs: 8, sm: 10, md: 12 },
                },
              }}
            />
          </Box>
        </Box>

        <SingleLineView />
      </Paper>
    </motion.div>
  );
};

export default ExpiringPlansTable;