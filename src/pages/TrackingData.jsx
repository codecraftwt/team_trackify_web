// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Container,
// //   Paper,
// //   Typography,
// //   Card,
// //   CardContent,
// //   Chip,
// //   Button,
// //   IconButton,
// //   Grid,
// //   Stack,
// //   Badge,
// //   CircularProgress,
// //   alpha,
// //   Avatar,
// //   Divider,
// // } from "@mui/material";
// // import {
// //   Route as RouteIcon,
// //   CalendarToday as CalendarIcon,
// //   AccessTime as ClockIcon,
// //   LocationOn as LocationIcon,
// //   Visibility as VisibilityIcon,
// //   ArrowBack as ArrowBackIcon,
// //   CheckCircle as CheckInIcon,
// //   Cancel as CheckOutIcon,
// //   Timeline as TimelineIcon,
// // } from "@mui/icons-material";
// // import { motion } from "framer-motion";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   getUserTrack,
// //   getUserTrackedDates,
// // } from "../redux/slices/userSlice";
// // import { formatDateLocal } from "../utils/dateFormat";
// // import Calendar from "react-calendar";
// // import "react-calendar/dist/Calendar.css";

// // const TrackingData = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const trackData = location.state?.item;
// //   const data = useSelector((state) => state.user?.userTrackInfo || []);
// //   const trackedDates = useSelector((state) => state.user?.trackedDates || []);
// //   const loading = useSelector((state) => state.user?.loading || false);

// //   const [showCalendar, setShowCalendar] = useState(false);
// //   const [selectedDate, setSelectedDate] = useState(new Date());

// //   // Check if user is coming back from `/locations`
// //   const isReturningFromLocations =
// //     sessionStorage.getItem("returningFromLocations") === "true";

// //   // Function to get stored date
// //   useEffect(() => {
// //     const storedDate = localStorage.getItem("selectedDate");
// //     if (isReturningFromLocations && storedDate) {
// //       setSelectedDate(new Date(storedDate));
// //     } else {
// //       setSelectedDate(new Date());
// //     }
// //     sessionStorage.removeItem("returningFromLocations");
// //   }, [isReturningFromLocations]);

// //   // Format date for API call (DD-MM-YYYY)
// //   const formattedDate =
// //     selectedDate.getDate().toString().padStart(2, "0") +
// //     "-" +
// //     (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
// //     "-" +
// //     selectedDate.getFullYear();

// //   // Fetch tracking data when selectedDate changes
// //   useEffect(() => {
// //     if (selectedDate && trackData?._id) {
// //       dispatch(getUserTrack({ id: trackData._id, date: formattedDate }));
// //     }
// //   }, [selectedDate, dispatch, trackData?._id, formattedDate]);

// //   useEffect(() => {
// //     if (trackData?._id) {
// //       dispatch(getUserTrackedDates(trackData._id));
// //     }
// //   }, [dispatch, trackData?._id]);

// //   // Save selected date to localStorage
// //   const handleDateChange = (date) => {
// //     setSelectedDate(date);
// //     localStorage.setItem("selectedDate", date.toString());
// //     setShowCalendar(false);
// //   };

// //   // Clear filter and show latest data
// //   const clearFilter = () => {
// //     const today = new Date();
// //     setSelectedDate(today);
// //     localStorage.removeItem("selectedDate");
// //     setShowCalendar(false);
// //   };

// //   // Check if current date is today
// //   const isToday = selectedDate.toDateString() === new Date().toDateString();

// //   // Handle navigation to locations page
// //   const handleViewLocations = (locations) => {
// //     sessionStorage.setItem("returningFromLocations", "true");
// //     navigate(`/locations`, { state: { locations } });
// //   };

// //   // Filter data based on selected date
// //   const filteredData = data?.filter((item) => {
// //     return (
// //       new Date(item.createdAt).toDateString() === selectedDate.toDateString()
// //     );
// //   });

// //   const formatTime = (timestamp) => {
// //     return new Date(timestamp).toLocaleTimeString("en-US", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: true,
// //     });
// //   };

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.5 },
// //     },
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: "100vh",
// //         background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
// //         py: 4,
// //         px: { xs: 2, md: 4 },
// //       }}
// //     >
// //       <Container maxWidth="xl">
// //         <motion.div
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //         >
// //           {/* Header */}
// //           <motion.div variants={itemVariants}>
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
// //               <IconButton
// //                 onClick={() => navigate(-1)}
// //                 sx={{
// //                   bgcolor: alpha("#0f766e", 0.1),
// //                   color: "#0f766e",
// //                   "&:hover": {
// //                     bgcolor: alpha("#0f766e", 0.2),
// //                   },
// //                 }}
// //               >
// //                 <ArrowBackIcon />
// //               </IconButton>
// //               <Box>
// //                 <Typography
// //                   variant="h4"
// //                   fontWeight="800"
// //                   color="#0f766e"
// //                   gutterBottom
// //                   sx={{
// //                     background: "linear-gradient(135deg, #0f766e, #14b8a6)",
// //                     WebkitBackgroundClip: "text",
// //                     WebkitTextFillColor: "transparent",
// //                   }}
// //                 >
// //                   Tracking Routes
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   {trackData?.name || "User"} - View all tracking history
// //                 </Typography>
// //               </Box>
// //             </Box>
// //           </motion.div>

// //           {/* Date Filter Section */}
// //           <motion.div variants={itemVariants} style={{ marginBottom: 24, position: "relative" }}>
// //             <Paper
// //               elevation={0}
// //               sx={{
// //                 p: 3,
// //                 borderRadius: 3,
// //                 border: "1px solid",
// //                 borderColor: alpha("#e2e8f0", 0.5),
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 flexWrap: "wrap",
// //                 gap: 2,
// //               }}
// //             >
// //               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //                 <CalendarIcon sx={{ color: "#0f766e" }} />
// //                 <Box>
// //                   <Typography variant="body1" fontWeight={500} color="#1e293b">
// //                     {selectedDate.toLocaleDateString("en-US", {
// //                       weekday: "long",
// //                       year: "numeric",
// //                       month: "long",
// //                       day: "numeric",
// //                     })}
// //                   </Typography>
// //                   {!isToday && (
// //                     <Chip
// //                       label="Filtered"
// //                       size="small"
// //                       sx={{
// //                         mt: 0.5,
// //                         bgcolor: alpha("#f59e0b", 0.1),
// //                         color: "#f59e0b",
// //                         fontSize: "0.65rem",
// //                         height: 20,
// //                       }}
// //                     />
// //                   )}
// //                 </Box>
// //               </Box>

// //               <Box sx={{ display: "flex", gap: 2 }}>
// //                 {!isToday && (
// //                   <Button
// //                     variant="outlined"
// //                     onClick={clearFilter}
// //                     sx={{
// //                       borderColor: "#e2e8f0",
// //                       color: "#64748b",
// //                       "&:hover": {
// //                         borderColor: "#0f766e",
// //                         color: "#0f766e",
// //                       },
// //                     }}
// //                   >
// //                     Clear Filter
// //                   </Button>
// //                 )}
// //                 <Button
// //                   variant="contained"
// //                   startIcon={<CalendarIcon />}
// //                   onClick={() => setShowCalendar(!showCalendar)}
// //                   sx={{
// //                     bgcolor: "#0f766e",
// //                     "&:hover": { bgcolor: "#0a5c55" },
// //                   }}
// //                 >
// //                   Change Date
// //                 </Button>
// //               </Box>
// //             </Paper>

// //             {/* Calendar Popup */}
// //             {showCalendar && (
// //               <Paper
// //                 elevation={3}
// //                 sx={{
// //                   position: "absolute",
// //                   top: "100%",
// //                   right: 0,
// //                   zIndex: 1000,
// //                   p: 2,
// //                   mt: 1,
// //                   borderRadius: 2,
// //                   bgcolor: "white",
// //                   boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
// //                 }}
// //               >
// //                 <Calendar
// //                   onChange={handleDateChange}
// //                   value={selectedDate}
// //                   maxDate={new Date()}
// //                   tileClassName="text-dark"
// //                   next2Label={null}
// //                   prev2Label={null}
// //                   tileContent={({ date, view }) => {
// //                     if (view === "month") {
// //                       const dateStr = formatDateLocal(date);
// //                       if (trackedDates.includes(dateStr)) {
// //                         return (
// //                           <Box
// //                             sx={{
// //                               height: 6,
// //                               width: 6,
// //                               borderRadius: "50%",
// //                               bgcolor: "#0f766e",
// //                               margin: "0 auto",
// //                               mt: 0.5,
// //                             }}
// //                           />
// //                         );
// //                       }
// //                     }
// //                     return null;
// //                   }}
// //                 />
// //               </Paper>
// //             )}
// //           </motion.div>

// //           {/* Results Badge */}
// //           <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
// //             <Chip
// //               label={`${filteredData?.length || 0} Records Found`}
// //               icon={<RouteIcon />}
// //               sx={{
// //                 bgcolor: alpha("#0f766e", 0.1),
// //                 color: "#0f766e",
// //                 fontWeight: 600,
// //                 fontSize: "0.9rem",
// //                 px: 2,
// //                 py: 2.5,
// //               }}
// //             />
// //           </motion.div>

// //           {/* Loading State */}
// //           {loading && (
// //             <motion.div variants={itemVariants}>
// //               <Paper
// //                 elevation={0}
// //                 sx={{
// //                   p: 5,
// //                   borderRadius: 3,
// //                   textAlign: "center",
// //                   border: "1px solid",
// //                   borderColor: alpha("#e2e8f0", 0.5),
// //                 }}
// //               >
// //                 <CircularProgress sx={{ color: "#0f766e", mb: 2 }} />
// //                 <Typography color="text.secondary">
// //                   Loading tracking data...
// //                 </Typography>
// //               </Paper>
// //             </motion.div>
// //           )}

// //           {/* Empty State */}
// //           {!loading && filteredData?.length === 0 && (
// //             <motion.div variants={itemVariants}>
// //               <Paper
// //                 elevation={0}
// //                 sx={{
// //                   p: 5,
// //                   borderRadius: 3,
// //                   textAlign: "center",
// //                   border: "1px solid",
// //                   borderColor: alpha("#e2e8f0", 0.5),
// //                 }}
// //               >
// //                 <RouteIcon sx={{ fontSize: 48, color: alpha("#0f766e", 0.3), mb: 2 }} />
// //                 <Typography variant="h6" color="text.secondary" gutterBottom>
// //                   No tracking records found
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                   No tracking data available for the selected date.
// //                 </Typography>
// //               </Paper>
// //             </motion.div>
// //           )}

// //           {/* Tracking Data Cards */}
// //           {!loading && filteredData?.length > 0 && (
// //             <Stack spacing={2}>
// //               {filteredData.map((data, index) => (
// //                 <motion.div
// //                   key={data._id || index}
// //                   variants={itemVariants}
// //                   custom={index}
// //                 >
// //                   <Card
// //                     elevation={0}
// //                     sx={{
// //                       borderRadius: 3,
// //                       border: "1px solid",
// //                       borderColor: alpha("#e2e8f0", 0.5),
// //                       transition: "all 0.3s ease",
// //                       "&:hover": {
// //                         boxShadow: "0 10px 30px -10px rgba(15, 118, 110, 0.2)",
// //                         borderColor: "#0f766e",
// //                       },
// //                     }}
// //                   >
// //                     <CardContent sx={{ p: 3 }}>
// //                       <Grid container spacing={2}>
// //                         {/* Left Section */}
// //                         <Grid item xs={12} md={8}>
// //                           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
// //                             <Avatar
// //                               sx={{
// //                                 bgcolor: alpha("#0f766e", 0.1),
// //                                 color: "#0f766e",
// //                                 width: 48,
// //                                 height: 48,
// //                               }}
// //                             >
// //                               <RouteIcon />
// //                             </Avatar>
// //                             <Box>
// //                               <Typography variant="subtitle1" fontWeight={600} color="#1e293b">
// //                                 Tracking Session #{index + 1}
// //                               </Typography>
// //                               <Typography variant="caption" color="text.secondary">
// //                                 Route ID: {data.id}
// //                               </Typography>
// //                             </Box>
// //                           </Box>

// //                           <Grid container spacing={2}>
// //                             {/* Check In */}
// //                             <Grid item xs={12} sm={6}>
// //                               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                                 <Avatar
// //                                   sx={{
// //                                     bgcolor: alpha("#22c55e", 0.1),
// //                                     color: "#22c55e",
// //                                     width: 36,
// //                                     height: 36,
// //                                   }}
// //                                 >
// //                                   <CheckInIcon sx={{ fontSize: 18 }} />
// //                                 </Avatar>
// //                                 <Box>
// //                                   <Typography variant="caption" color="text.secondary">
// //                                     Check In
// //                                   </Typography>
// //                                   <Typography variant="body2" fontWeight={500}>
// //                                     {formatTime(data?.createdAt)}
// //                                   </Typography>
// //                                 </Box>
// //                               </Box>
// //                             </Grid>

// //                             {/* Check Out */}
// //                             <Grid item xs={12} sm={6}>
// //                               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                                 <Avatar
// //                                   sx={{
// //                                     bgcolor: alpha("#f59e0b", 0.1),
// //                                     color: "#f59e0b",
// //                                     width: 36,
// //                                     height: 36,
// //                                   }}
// //                                 >
// //                                   <CheckOutIcon sx={{ fontSize: 18 }} />
// //                                 </Avatar>
// //                                 <Box>
// //                                   <Typography variant="caption" color="text.secondary">
// //                                     Check Out
// //                                   </Typography>
// //                                   <Typography variant="body2" fontWeight={500}>
// //                                     {data.end_at ? formatTime(data.end_at) : "Not checked out"}
// //                                   </Typography>
// //                                 </Box>
// //                               </Box>
// //                             </Grid>

// //                             {/* Locations Count */}
// //                             <Grid item xs={12} sm={6}>
// //                               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                                 <Avatar
// //                                   sx={{
// //                                     bgcolor: alpha("#0f766e", 0.1),
// //                                     color: "#0f766e",
// //                                     width: 36,
// //                                     height: 36,
// //                                   }}
// //                                 >
// //                                   <LocationIcon sx={{ fontSize: 18 }} />
// //                                 </Avatar>
// //                                 <Box>
// //                                   <Typography variant="caption" color="text.secondary">
// //                                     Locations Tracked
// //                                   </Typography>
// //                                   <Typography variant="body2" fontWeight={500}>
// //                                     {data?.locations?.length || 0} locations
// //                                   </Typography>
// //                                 </Box>
// //                               </Box>
// //                             </Grid>

// //                             {/* Distance */}
// //                             <Grid item xs={12} sm={6}>
// //                               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
// //                                 <Avatar
// //                                   sx={{
// //                                     bgcolor: alpha("#10b981", 0.1),
// //                                     color: "#10b981",
// //                                     width: 36,
// //                                     height: 36,
// //                                   }}
// //                                 >
// //                                   <TimelineIcon sx={{ fontSize: 18 }} />
// //                                 </Avatar>
// //                                 <Box>
// //                                   <Typography variant="caption" color="text.secondary">
// //                                     Distance Travelled
// //                                   </Typography>
// //                                   <Typography variant="body2" fontWeight={500}>
// //                                     {data.total_distance?.toFixed(2)} km
// //                                   </Typography>
// //                                 </Box>
// //                               </Box>
// //                             </Grid>
// //                           </Grid>
// //                         </Grid>

// //                         {/* Right Section - Actions */}
// //                         <Grid
// //                           item
// //                           xs={12}
// //                           md={4}
// //                           sx={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             justifyContent: { xs: "flex-start", md: "flex-end" },
// //                           }}
// //                         >
// //                           <Button
// //                             variant="contained"
// //                             startIcon={<VisibilityIcon />}
// //                             onClick={() => handleViewLocations(data?.locations)}
// //                             sx={{
// //                               bgcolor: "#0f766e",
// //                               "&:hover": { bgcolor: "#0a5c55" },
// //                               px: 3,
// //                               py: 1,
// //                             }}
// //                           >
// //                             View Route
// //                           </Button>
// //                         </Grid>
// //                       </Grid>
// //                     </CardContent>
// //                   </Card>
// //                 </motion.div>
// //               ))}
// //             </Stack>
// //           )}
// //         </motion.div>
// //       </Container>

// //       <style>
// //         {`
// //           .react-calendar {
// //             border: none !important;
// //             font-family: inherit !important;
// //             width: 350px !important;
// //             max-width: 100% !important;
// //             background: white !important;
// //           }
// //           .react-calendar__tile {
// //             padding: 0.75em 0.5em !important;
// //           }
// //           .react-calendar__tile--active {
// //             background: #0f766e !important;
// //             color: white !important;
// //           }
// //           .react-calendar__tile--now {
// //             background: #f0fdf4 !important;
// //           }
// //         `}
// //       </style>
// //     </Box>
// //   );
// // };

// // export default TrackingData;

// import React, { useState, useEffect } from "react";
// // import Navbar from "../../components/Navbar";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import {
//   FaCalendarAlt,
//   FaEye,
//   FaRoute,
//   FaClock,
//   FaMapMarkerAlt,
//   FaArrowRight,
// } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUserTrack,
//   getUserTrackedDates,
// } from "../redux/slices/userSlice";
// import { Card, Badge, Button } from "react-bootstrap";
// import { formatDateLocal } from "../utils/dateFormat";

// const TrackingData = () => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.UserData.userTrackInfo);
//   const trackedDates = useSelector((state) => state.UserData.trackedDates);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);

//   console.log("data from the user of tracking data", trackedDates);

//   // Check if user is coming back from `/locations`
//   const isReturningFromLocations =
//     sessionStorage.getItem("returningFromLocations") === "true";

//   // Function to get stored date, reset only if coming from a different page
//   const getStoredDate = () => {
//     const storedDate = localStorage.getItem("selectedDate");
//     if (isReturningFromLocations && storedDate) {
//       return new Date(storedDate); // Keep the same date if returning from /locations
//     }
//     return new Date(); // Reset to today if coming from another page
//   };

//   const [selectedDate, setSelectedDate] = useState(getStoredDate());

//   // Reset flag after component mounts
//   useEffect(() => {
//     sessionStorage.removeItem("returningFromLocations");
//   }, []);

//   // Format date for API call (DD-MM-YYYY)
//   const formattedDate =
//     selectedDate.getDate().toString().padStart(2, "0") +
//     "-" +
//     (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
//     "-" +
//     selectedDate.getFullYear();

//   // Fetch tracking data when selectedDate changes
//   useEffect(() => {
//     if (selectedDate) {
//       setLoading(true);
//       dispatch(
//         getUserTrack({ id: trackData?._id, date: formattedDate })
//       ).finally(() => setLoading(false));
//     }
//   }, [selectedDate, dispatch, trackData?._id, formattedDate]);

//   useEffect(() => {
//     dispatch(getUserTrackedDates(trackData?._id));
//   }, [dispatch, trackData?._id]);

//   // Save selected date to localStorage when user changes it
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     localStorage.setItem("selectedDate", date);
//     setShowCalendar(false);
//     setShowCalendar(false); // Close calendar after selection
//   };

//   // Clear filter and show latest data
//   const clearFilter = () => {
//     const today = new Date();
//     setSelectedDate(today);
//     localStorage.removeItem("selectedDate"); // Remove stored date
//     setShowCalendar(false);
//   };

//   // Check if current date is today
//   const isToday = selectedDate.toDateString() === new Date().toDateString();

//   // Handle navigation to locations page
//   const handleViewLocations = (locations) => {
//     sessionStorage.setItem("returningFromLocations", "true"); // Set flag before navigating
//     navigate(`/locations`, { state: { locations } });
//   };

//   // Filter data based on selected date
//   const filteredData = data?.filter((item) => {
//     return (
//       new Date(item.createdAt).toDateString() === selectedDate.toDateString()
//     );
//   });

//   const formatTime = (timestamp) => {
//     return new Date(timestamp).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   return (
//     <div className="min-vh-100" style={{ background: "#f8fafc" }}>
//       {/* <Navbar pageTitle="Tracking Routes" showBackButton={true} /> */}
//       <main className="container-fluid py-4">
//         <div className="row justify-content-center">
//           <div className="col-lg-11">
//             {/* Header Section */}
//             <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//               <div className="d-flex align-items-center mb-2 mb-sm-0">
//                 <FaRoute className="me-2" style={{ color: "#3B82F6" }} />
//                 <div>
//                   <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
//                     Tracking Routes
//                   </h5>
//                   <small className="text-muted"> 
//                     {isToday
//                       ? "Showing latest tracking data"
//                       : `Showing data for ${selectedDate.toLocaleDateString()}`}
//                   </small>
//                 </div>
//               </div>
//               <Badge
//                 bg="primary"
//                 className="px-3 py-2 rounded-pill"
//                 style={{ fontSize: "14px", whiteSpace: "nowrap" }}
//               >
//                 {filteredData?.length || 0} Records
//               </Badge>
//             </div>

//             <div style={{ position: "relative" }}>
//               {/* Date Filter Section */}
//               <Card
//                 className="border-0 shadow-sm mb-4"
//                 style={{ borderRadius: "12px" }}
//               >
//                 <Card.Body className="p-4">
//                   <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//                     <div className="d-flex align-items-center">
//                       <FaCalendarAlt
//                         className="me-2"
//                         style={{ color: "#3B82F6" }}
//                       />
//                       <span
//                         className="fw-semibold"
//                         style={{ color: "#374151" }}
//                       >
//                         {selectedDate.toLocaleDateString("en-US", {
//                           weekday: "long",
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </span>
//                       {!isToday && (
//                         <Badge
//                           bg="warning"
//                           className="ms-2 px-2 py-1"
//                           style={{ fontSize: "10px" }}
//                         >
//                           Filtered
//                         </Badge>
//                       )}
//                     </div>

//                     <Button
//                       variant="outline-primary"
//                       className="d-flex align-items-center"
//                       onClick={() => setShowCalendar(!showCalendar)}
//                       style={{ borderRadius: "8px" }}
//                     >
//                       <FaCalendarAlt className="me-2" />
//                       Change Date
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>

//               {showCalendar && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "100%", // right below the card
//                     right: 0,
//                     zIndex: 1000,
//                     backgroundColor: "white",
//                     padding: "12px",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     borderRadius: "12px",
//                     marginTop: "8px", // optional spacing from card
//                   }}
//                 >
//                   <Calendar
//                     onChange={handleDateChange}
//                     value={selectedDate}
//                     maxDate={new Date()}
//                     tileClassName="text-dark"
//                     next2Label={null}
//                     prev2Label={null}
//                     tileContent={({ date, view }) => {
//                       if (view === "month") {
//                         const dateStr = formatDateLocal(date);
//                         if (trackedDates.includes(dateStr)) {
//                           return (
//                             <div
//                               style={{
//                                 height: 6,
//                                 width: 6,
//                                 borderRadius: "50%",
//                                 backgroundColor: "#0047b3",
//                                 margin: "0 auto",
//                                 marginTop: 2,
//                               }}
//                             />
//                           );
//                         }
//                       }
//                       return null;
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <Card
//                 className="border-0 shadow-sm text-center py-5"
//                 style={{ borderRadius: "12px" }}
//               >
//                 <Card.Body>
//                   <div
//                     className="spinner-border text-primary mb-3"
//                     role="status"
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <h6 className="text-muted">Loading tracking data...</h6>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && filteredData?.length === 0 && (
//               <Card
//                 className="border-0 shadow-sm text-center py-5"
//                 style={{ borderRadius: "12px" }}
//               >
//                 <Card.Body>
//                   <FaRoute size={48} className="text-muted mb-3" />
//                   <h6 className="text-muted">No tracking records found</h6>
//                   <p className="text-muted small">
//                     No tracking data available for the selected date.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Tracking Data Cards */}
//             {!loading && filteredData?.length > 0 && (
//               <div className="d-flex flex-column gap-3">
//                 {filteredData.map((data, index) => (
//                   <Card
//                     key={`${data._id || data.id || "track"}-${index}-${
//                       data.createdAt
//                     }`}
//                     className="border-0 shadow-sm"
//                     style={{ borderRadius: "12px" }}
//                   >
//                     <Card.Body className="p-4">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div className="flex-grow-1">
//                           <div className="d-flex align-items-center mb-3">
//                             <div className="me-3">
//                               <FaRoute size={20} style={{ color: "#3B82F6" }} />
//                             </div>
//                             <div>
//                               <h6
//                                 className="fw-semibold mb-1"
//                                 style={{ color: "#1f2937" }}
//                               >
//                                 Tracking Session #{index + 1}
//                               </h6>
//                               <small className="text-muted">
//                                 Route ID: {data.id}
//                               </small>
//                             </div>
//                           </div>

//                           <div className="row">
//                             <div className="col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#22C55E" }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Check In
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ color: "#374151" }}
//                                   >
//                                     {formatTime(data?.createdAt)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#F59E0B" }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Check Out
//                                   </small>

//                                   <span
//                                     className="fw-semibold"
//                                     style={{ color: "#374151" }}
//                                   >
//                                     {data.end_at
//                                       ? formatTime(data.end_at)
//                                       : "Not checked out"}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="d-flex align-items-center">
//                             <FaMapMarkerAlt
//                               className="me-2"
//                               style={{ color: "#3B82F6" }}
//                             />
//                             <small className="text-muted">
//                               {data?.locations?.length || 0} locations tracked
//                             </small>
//                           </div>

//                           <div className="d-flex align-items-center mt-2">
//                             <FaRoute
//                               className="me-2"
//                               style={{ color: "#10B981" }}
//                             />
//                             <small className="text-muted">
//                               Distance Travelled:{" "}
//                               <span
//                                 className="fw-semibold"
//                                 style={{ color: "#374151" }}
//                               >
//                                 {data.total_distance.toFixed(2)} km
//                               </span>
//                             </small>
//                           </div>
//                         </div>

//                         <Button
//                           variant="primary"
//                           className="d-flex align-items-center"
//                           onClick={() => handleViewLocations(data?.locations)}
//                           style={{
//                             borderRadius: "8px",
//                             whiteSpace: "nowrap",
//                           }}
//                         >
//                           <FaEye className="me-2" />
//                           View Route
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TrackingData;



// import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import {
//   FaCalendarAlt,
//   FaEye,
//   FaRoute,
//   FaClock,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUserTrack,
//   getUserTrackedDates,
// } from "../redux/slices/userSlice";
// import { Card, Badge, Button } from "react-bootstrap";
// import { formatDateLocal } from "../utils/dateFormat";

// const TrackingData = () => {
//   const dispatch = useDispatch();
//   // Fix: Use correct state path - 'user' not 'UserData'
//   const data = useSelector((state) => state.user?.userTrackInfo || []);
//   const trackedDates = useSelector((state) => state.user?.trackedDates || []);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);

//   console.log("Data from API:", data);
//   console.log("Tracked Dates:", trackedDates);

//   // Check if user is coming back from `/locations`
//   const isReturningFromLocations =
//     sessionStorage.getItem("returningFromLocations") === "true";

//   // Function to get stored date, reset only if coming from a different page
//   const getStoredDate = () => {
//     const storedDate = localStorage.getItem("selectedDate");
//     if (isReturningFromLocations && storedDate) {
//       return new Date(storedDate);
//     }
//     return new Date();
//   };

//   const [selectedDate, setSelectedDate] = useState(getStoredDate());

//   // Reset flag after component mounts
//   useEffect(() => {
//     sessionStorage.removeItem("returningFromLocations");
//   }, []);

//   // Format date for API call (DD-MM-YYYY)
//   const formattedDate =
//     selectedDate.getDate().toString().padStart(2, "0") +
//     "-" +
//     (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
//     "-" +
//     selectedDate.getFullYear();

//   // Fetch tracking data when selectedDate changes
//   useEffect(() => {
//     if (selectedDate && trackData?._id) {
//       setLoading(true);
//       dispatch(
//         getUserTrack({ id: trackData._id, date: formattedDate })
//       ).finally(() => setLoading(false));
//     }
//   }, [selectedDate, dispatch, trackData?._id, formattedDate]);

//   // Fetch tracked dates for calendar
//   useEffect(() => {
//     if (trackData?._id) {
//       dispatch(getUserTrackedDates(trackData._id));
//     }
//   }, [dispatch, trackData?._id]);

//   // Filter data whenever data or selectedDate changes
//   useEffect(() => {
//     if (data && data.length > 0) {
//       const filtered = data.filter((item) => {
//         return (
//           new Date(item.createdAt).toDateString() === selectedDate.toDateString()
//         );
//       });
//       console.log("Filtered results:", filtered);
//       setFilteredData(filtered);
//     } else {
//       setFilteredData([]);
//     }
//   }, [data, selectedDate]);

//   // Save selected date to localStorage
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     localStorage.setItem("selectedDate", date);
//     setShowCalendar(false);
//   };

//   // Clear filter and show latest data
//   const clearFilter = () => {
//     const today = new Date();
//     setSelectedDate(today);
//     localStorage.removeItem("selectedDate");
//     setShowCalendar(false);
//   };

//   // Check if current date is today
//   const isToday = selectedDate.toDateString() === new Date().toDateString();

//   // Handle navigation to locations page
//   const handleViewLocations = (locations) => {
//     sessionStorage.setItem("returningFromLocations", "true");
//     navigate(`/locations`, { state: { locations } });
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "N/A";
//     return new Date(timestamp).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   return (
//     <div className="min-vh-100" style={{ background: "#f8fafc" }}>
//       <main className="container-fluid py-4">
//         <div className="row justify-content-center">
//           <div className="col-lg-11">
//             {/* Header Section */}
//             <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//               <div className="d-flex align-items-center mb-2 mb-sm-0">
//                 <FaRoute className="me-2" style={{ color: "#3B82F6" }} />
//                 <div>
//                   <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
//                     Tracking Routes
//                   </h5>
//                   <small className="text-muted"> 
//                     {isToday
//                       ? "Showing latest tracking data"
//                       : `Showing data for ${selectedDate.toLocaleDateString()}`}
//                   </small>
//                 </div>
//               </div>
//               <Badge
//                 bg="primary"
//                 className="px-3 py-2 rounded-pill"
//                 style={{ fontSize: "14px", whiteSpace: "nowrap" }}
//               >
//                 {filteredData?.length || 0} Records
//               </Badge>
//             </div>

//             <div style={{ position: "relative" }}>
//               {/* Date Filter Section */}
//               <Card
//                 className="border-0 shadow-sm mb-4"
//                 style={{ borderRadius: "12px" }}
//               >
//                 <Card.Body className="p-4">
//                   <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//                     <div className="d-flex align-items-center">
//                       <FaCalendarAlt
//                         className="me-2"
//                         style={{ color: "#3B82F6" }}
//                       />
//                       <span
//                         className="fw-semibold"
//                         style={{ color: "#374151" }}
//                       >
//                         {selectedDate.toLocaleDateString("en-US", {
//                           weekday: "long",
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </span>
//                       {!isToday && (
//                         <Badge
//                           bg="warning"
//                           className="ms-2 px-2 py-1"
//                           style={{ fontSize: "10px" }}
//                         >
//                           Filtered
//                         </Badge>
//                       )}
//                     </div>

//                     <Button
//                       variant="outline-primary"
//                       className="d-flex align-items-center"
//                       onClick={() => setShowCalendar(!showCalendar)}
//                       style={{ borderRadius: "8px" }}
//                     >
//                       <FaCalendarAlt className="me-2" />
//                       Change Date
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>

//               {showCalendar && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "100%",
//                     right: 0,
//                     zIndex: 1000,
//                     backgroundColor: "white",
//                     padding: "12px",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     borderRadius: "12px",
//                     marginTop: "8px",
//                   }}
//                 >
//                   <Calendar
//                     onChange={handleDateChange}
//                     value={selectedDate}
//                     maxDate={new Date()}
//                     tileClassName="text-dark"
//                     next2Label={null}
//                     prev2Label={null}
//                     tileContent={({ date, view }) => {
//                       if (view === "month") {
//                         const dateStr = formatDateLocal(date);
//                         if (trackedDates.includes(dateStr)) {
//                           return (
//                             <div
//                               style={{
//                                 height: 6,
//                                 width: 6,
//                                 borderRadius: "50%",
//                                 backgroundColor: "#0047b3",
//                                 margin: "0 auto",
//                                 marginTop: 2,
//                               }}
//                             />
//                           );
//                         }
//                       }
//                       return null;
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <Card
//                 className="border-0 shadow-sm text-center py-5"
//                 style={{ borderRadius: "12px" }}
//               >
//                 <Card.Body>
//                   <div
//                     className="spinner-border text-primary mb-3"
//                     role="status"
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <h6 className="text-muted">Loading tracking data...</h6>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && filteredData?.length === 0 && (
//               <Card
//                 className="border-0 shadow-sm text-center py-5"
//                 style={{ borderRadius: "12px" }}
//               >
//                 <Card.Body>
//                   <FaRoute size={48} className="text-muted mb-3" />
//                   <h6 className="text-muted">No tracking records found</h6>
//                   <p className="text-muted small">
//                     No tracking data available for the selected date.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Tracking Data Cards */}
//             {!loading && filteredData?.length > 0 && (
//               <div className="d-flex flex-column gap-3">
//                 {filteredData.map((item, index) => (
//                   <Card
//                     key={item._id || item.id || index}
//                     className="border-0 shadow-sm"
//                     style={{ borderRadius: "12px" }}
//                   >
//                     <Card.Body className="p-4">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div className="flex-grow-1">
//                           <div className="d-flex align-items-center mb-3">
//                             <div className="me-3">
//                               <FaRoute size={20} style={{ color: "#3B82F6" }} />
//                             </div>
//                             <div>
//                               <h6
//                                 className="fw-semibold mb-1"
//                                 style={{ color: "#1f2937" }}
//                               >
//                                 Tracking Session #{index + 1}
//                               </h6>
//                               <small className="text-muted">
//                                 Route ID: {item.id || item._id}
//                               </small>
//                             </div>
//                           </div>

//                           <div className="row">
//                             <div className="col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#22C55E" }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Check In
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ color: "#374151" }}
//                                   >
//                                     {formatTime(item?.createdAt)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#F59E0B" }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block">
//                                     Check Out
//                                   </small>

//                                   <span
//                                     className="fw-semibold"
//                                     style={{ color: "#374151" }}
//                                   >
//                                     {item.end_at
//                                       ? formatTime(item.end_at)
//                                       : "Not checked out"}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="d-flex align-items-center">
//                             <FaMapMarkerAlt
//                               className="me-2"
//                               style={{ color: "#3B82F6" }}
//                             />
//                             <small className="text-muted">
//                               {item?.locations?.length || 0} locations tracked
//                             </small>
//                           </div>

//                           <div className="d-flex align-items-center mt-2">
//                             <FaRoute
//                               className="me-2"
//                               style={{ color: "#10B981" }}
//                             />
//                             <small className="text-muted">
//                               Distance Travelled:{" "}
//                               <span
//                                 className="fw-semibold"
//                                 style={{ color: "#374151" }}
//                               >
//                                 {item.total_distance?.toFixed(2) || 0} km
//                               </span>
//                             </small>
//                           </div>
//                         </div>

//                         <Button
//                           variant="primary"
//                           className="d-flex align-items-center"
//                           onClick={() => handleViewLocations(item?.locations)}
//                           style={{
//                             borderRadius: "8px",
//                             whiteSpace: "nowrap",
//                           }}
//                         >
//                           <FaEye className="me-2" />
//                           View Route
//                         </Button>
//                       </div>
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TrackingData;



import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  FaCalendarAlt,
  FaEye,
  FaRoute,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserTrack,
  getUserTrackedDates,
} from "../redux/slices/userSlice";
import { Card, Badge, Button } from "react-bootstrap";
import { formatDateLocal } from "../utils/dateFormat";

const TrackingData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user?.userTrackInfo || []);
  const trackedDates = useSelector((state) => state.user?.trackedDates || []);
  const location = useLocation();
  const navigate = useNavigate();
  const trackData = location.state?.item;
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  console.log("Data from API:", data);
  console.log("Tracked Dates:", trackedDates);

  // Check if user is coming back from `/locations`
  const isReturningFromLocations =
    sessionStorage.getItem("returningFromLocations") === "true";

  // Function to get stored date, reset only if coming from a different page
  const getStoredDate = () => {
    const storedDate = localStorage.getItem("selectedDate");
    if (isReturningFromLocations && storedDate) {
      return new Date(storedDate);
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getStoredDate());

  // Reset flag after component mounts
  useEffect(() => {
    sessionStorage.removeItem("returningFromLocations");
  }, []);

  // Format date for API call (DD-MM-YYYY)
  const formattedDate =
    selectedDate.getDate().toString().padStart(2, "0") +
    "-" +
    (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    selectedDate.getFullYear();

  // Fetch tracking data when selectedDate changes
  useEffect(() => {
    if (selectedDate && trackData?._id) {
      setLoading(true);
      dispatch(
        getUserTrack({ id: trackData._id, date: formattedDate })
      ).finally(() => setLoading(false));
    }
  }, [selectedDate, dispatch, trackData?._id, formattedDate]);

  // Fetch tracked dates for calendar
  useEffect(() => {
    if (trackData?._id) {
      dispatch(getUserTrackedDates(trackData._id));
    }
  }, [dispatch, trackData?._id]);

  // Filter data whenever data or selectedDate changes
  useEffect(() => {
    if (data && data.length > 0) {
      const filtered = data.filter((item) => {
        return (
          new Date(item.createdAt).toDateString() === selectedDate.toDateString()
        );
      });
      console.log("Filtered results:", filtered);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, selectedDate]);

  // Save selected date to localStorage
  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date);
    setShowCalendar(false);
  };

  // Clear filter and show latest data
  const clearFilter = () => {
    const today = new Date();
    setSelectedDate(today);
    localStorage.removeItem("selectedDate");
    setShowCalendar(false);
  };

  // Check if current date is today
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  // Handle navigation to locations page
  const handleViewLocations = (locations) => {
    sessionStorage.setItem("returningFromLocations", "true");
    navigate(`/locations`, { state: { locations } });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc" }}>
      <main className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div className="d-flex align-items-center mb-2 mb-sm-0">
                <FaRoute className="me-2" style={{ color: "#0f766e" }} />
                <div>
                  <h5 className="fw-bold mb-0" style={{ color: "#374151" }}>
                    Tracking Routes
                  </h5>
                  <small className="text-muted"> 
                    {isToday
                      ? "Showing latest tracking data"
                      : `Showing data for ${selectedDate.toLocaleDateString()}`}
                  </small>
                </div>
              </div>
              <Badge
                bg="success"
                className="px-3 py-2 rounded-pill"
                style={{ fontSize: "14px", whiteSpace: "nowrap", backgroundColor: "#0f766e" }}
              >
                {filteredData?.length || 0} Records
              </Badge>
            </div>

            <div style={{ position: "relative" }}>
              {/* Date Filter Section */}
              <Card
                className="border-0 shadow-sm mb-4"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt
                        className="me-2"
                        style={{ color: "#0f766e" }}
                      />
                      <span
                        className="fw-semibold"
                        style={{ color: "#374151" }}
                      >
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {!isToday && (
                        <Badge
                          bg="warning"
                          className="ms-2 px-2 py-1"
                          style={{ fontSize: "10px" }}
                        >
                          Filtered
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline-success"
                      className="d-flex align-items-center"
                      onClick={() => setShowCalendar(!showCalendar)}
                      style={{ 
                        borderRadius: "8px",
                        borderColor: "#0f766e",
                        color: "#0f766e"
                      }}
                    >
                      <FaCalendarAlt className="me-2" />
                      Change Date
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {showCalendar && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 1000,
                    backgroundColor: "white",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    marginTop: "8px",
                  }}
                >
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    maxDate={new Date()}
                    tileClassName="text-dark"
                    next2Label={null}
                    prev2Label={null}
                    tileContent={({ date, view }) => {
                      if (view === "month") {
                        const dateStr = formatDateLocal(date);
                        if (trackedDates.includes(dateStr)) {
                          return (
                            <div
                              style={{
                                height: 6,
                                width: 6,
                                borderRadius: "50%",
                                backgroundColor: "#0f766e",
                                margin: "0 auto",
                                marginTop: 2,
                              }}
                            />
                          );
                        }
                      }
                      return null;
                    }}
                  />
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <Card
                className="border-0 shadow-sm text-center py-5"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body>
                  <div
                    className="spinner-border text-success mb-3"
                    role="status"
                    style={{ color: "#0f766e" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h6 className="text-muted">Loading tracking data...</h6>
                </Card.Body>
              </Card>
            )}

            {/* Empty State */}
            {!loading && filteredData?.length === 0 && (
              <Card
                className="border-0 shadow-sm text-center py-5"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body>
                  <FaRoute size={48} className="text-muted mb-3" style={{ color: "#0f766e" }} />
                  <h6 className="text-muted">No tracking records found</h6>
                  <p className="text-muted small">
                    No tracking data available for the selected date.
                  </p>
                </Card.Body>
              </Card>
            )}

            {/* Tracking Data Cards */}
            {!loading && filteredData?.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {filteredData.map((item, index) => (
                  <Card
                    key={item._id || item.id || index}
                    className="border-0 shadow-sm"
                    style={{ borderRadius: "12px" }}
                  >
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3">
                              <FaRoute size={20} style={{ color: "#0f766e" }} />
                            </div>
                            <div>
                              <h6
                                className="fw-semibold mb-1"
                                style={{ color: "#1f2937" }}
                              >
                                Tracking Session #{index + 1}
                              </h6>
                              <small className="text-muted">
                                Route ID: {item.id || item._id}
                              </small>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6 mb-2">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-2"
                                  style={{ color: "#22C55E" }}
                                />
                                <div>
                                  <small className="text-muted d-block">
                                    Check In
                                  </small>
                                  <span
                                    className="fw-semibold"
                                    style={{ color: "#374151" }}
                                  >
                                    {formatTime(item?.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6 mb-2">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-2"
                                  style={{ color: "#F59E0B" }}
                                />
                                <div>
                                  <small className="text-muted d-block">
                                    Check Out
                                  </small>

                                  <span
                                    className="fw-semibold"
                                    style={{ color: "#374151" }}
                                  >
                                    {item.end_at
                                      ? formatTime(item.end_at)
                                      : "Not checked out"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center">
                            <FaMapMarkerAlt
                              className="me-2"
                              style={{ color: "#0f766e" }}
                            />
                            <small className="text-muted">
                              {item?.locations?.length || 0} locations tracked
                            </small>
                          </div>

                          <div className="d-flex align-items-center mt-2">
                            <FaRoute
                              className="me-2"
                              style={{ color: "#10B981" }}
                            />
                            <small className="text-muted">
                              Distance Travelled:{" "}
                              <span
                                className="fw-semibold"
                                style={{ color: "#374151" }}
                              >
                                {item.total_distance?.toFixed(2) || 0} km
                              </span>
                            </small>
                          </div>
                        </div>

                        <Button
                          variant="success"
                          className="d-flex align-items-center"
                          onClick={() => handleViewLocations(item?.locations)}
                          style={{
                            borderRadius: "8px",
                            whiteSpace: "nowrap",
                            backgroundColor: "#0f766e",
                            borderColor: "#0f766e"
                          }}
                        >
                          <FaEye className="me-2" />
                          View Route
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingData;