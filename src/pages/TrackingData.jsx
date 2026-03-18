
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
//   FaArrowLeft,
// } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUserSessionsByDate,
//   getUserAvailableDates,
// } from "../redux/slices/userSlice";
// import { Card, Badge, Button } from "react-bootstrap";
// import { formatDateLocal } from "../utils/dateFormat";
// import { useTheme, alpha } from "@mui/material";
// import { IconButton } from "@mui/material";
// import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

// const TrackingData = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   // Get the sessions data
//   const sessionsData = useSelector((state) => state.user?.userSessionsList || []);
//   const sessionsSummary = useSelector((state) => state.user?.userSessionsSummary);
//   const sessionsLoading = useSelector((state) => state.user?.userSessionsLoading || false);
//   const sessionsError = useSelector((state) => state.user?.userSessionsError);

//   // Get available dates data
//   const availableDates = useSelector((state) => state.user?.userAvailableDates || []);
//   const availableDatesLoading = useSelector((state) => state.user?.userAvailableDatesLoading || false);

//   const trackedDates = useSelector((state) => state.user?.trackedDates || []);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);

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

//   // Format date for backend (YYYY-MM-DD)
//   const backendFormattedDate = 
//     selectedDate.getFullYear() + "-" +
//     (selectedDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
//     selectedDate.getDate().toString().padStart(2, "0");

//   // Format date for comparison (YYYY-MM-DD)
//   const formatDateForComparison = (date) => {
//     return date.getFullYear() + "-" +
//       (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
//       date.getDate().toString().padStart(2, "0");
//   };

//   // Fetch available dates when component mounts or user changes
//   useEffect(() => {
//     if (trackData?._id) {
//       dispatch(getUserAvailableDates({ id: trackData._id }));
//     }
//   }, [dispatch, trackData?._id]);

//   // Fetch sessions when selectedDate changes
//   useEffect(() => {
//     if (selectedDate && trackData?._id) {
//       setLoading(true);
//       console.log("Fetching sessions for:", { 
//         userId: trackData._id, 
//         date: backendFormattedDate 
//       });

//       dispatch(
//         getUserSessionsByDate({ 
//           userId: trackData._id, 
//           date: backendFormattedDate,
//           limit: 50
//         })
//       ).finally(() => setLoading(false));
//     }
//   }, [selectedDate, dispatch, trackData?._id, backendFormattedDate]);

//   // Save selected date to localStorage
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     localStorage.setItem("selectedDate", date);
//     setShowCalendar(false);
//   };

//   // Check if current date is today
//   const isToday = selectedDate.toDateString() === new Date().toDateString();

//   // Check if a date has tracking data
//   const isDateAvailable = (date) => {
//     const dateStr = formatDateForComparison(date);
//     return availableDates.includes(dateStr);
//   };

//   // Handle navigation to locations page
//   const handleViewLocations = () => {
//     // Prepare all sessions data for the selected date with enhanced information
//     const sessionsData = sessions.map((session, sessionIndex) => ({
//       ...session,
//       sessionNumber: sessionIndex + 1,
//       checkIn: session.startTime,
//       checkOut: session.endTime,
//       totalDistance: session.totalDistance || 0,
//       locations: [], // Locations will be fetched in the locations page
//     }));

//     // Create summary for the selected date
//     const dateSummary = {
//       date: selectedDate,
//       formattedDate: selectedDate.toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//       totalSessions: sessions.length,
//       totalLocations: sessionsSummary?.totalLocations || 0,
//       totalDistance: sessionsSummary?.totalDistance || 0,
//       sessions: sessions.map((session, index) => ({
//         id: session.sessionId,
//         number: index + 1,
//         startTime: session.startTime,
//         endTime: session.endTime,
//         locationCount: session.locationCount || 0,
//         distance: session.totalDistance || 0,
//       })),
//     };

//     sessionStorage.setItem("returningFromLocations", "true");
//     navigate(`/locations`, { 
//       state: { 
//         sessions: sessionsData,
//         summary: dateSummary,
//         metadata: {
//           selectedDate: selectedDate,
//           formattedDate: backendFormattedDate,
//           trackId: trackData?._id,
//           totalSessions: sessions.length,
//           totalLocations: sessionsSummary?.totalLocations || 0,
//         }
//       } 
//     });
//   };

//   // Handle navigation to locations page for a specific session
//   const handleViewSessionLocations = (session) => {
//     // Prepare single session data
//     const sessionData = [{
//       ...session,
//       sessionNumber: sessions.findIndex(s => s.sessionId === session.sessionId) + 1,
//       checkIn: session.startTime,
//       checkOut: session.endTime,
//       totalDistance: session.totalDistance || 0,
//       locations: [], // Locations will be fetched in the locations page
//     }];

//     // Create summary for this session
//     const sessionSummary = {
//       date: selectedDate,
//       formattedDate: selectedDate.toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//       totalSessions: 1,
//       totalLocations: session.locationCount || 0,
//       totalDistance: session.totalDistance || 0,
//       sessions: [{
//         id: session.sessionId,
//         number: sessions.findIndex(s => s.sessionId === session.sessionId) + 1,
//         startTime: session.startTime,
//         endTime: session.endTime,
//         locationCount: session.locationCount || 0,
//         distance: session.totalDistance || 0,
//       }],
//     };

//     sessionStorage.setItem("returningFromLocations", "true");
//     navigate(`/locations`, { 
//       state: { 
//         sessions: sessionData,
//         summary: sessionSummary,
//         metadata: {
//           selectedDate: selectedDate,
//           formattedDate: backendFormattedDate,
//           trackId: trackData?._id,
//           totalSessions: 1,
//           totalLocations: session.locationCount || 0,
//         }
//       } 
//     });
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const formatTime = (timestamp) => {
//     if (!timestamp) return "N/A";
//     return new Date(timestamp).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Use sessionsData instead of filteredData
//   const sessions = sessionsData || [];

//   // Show error if any
//   if (sessionsError) {
//     console.error("Sessions error:", sessionsError);
//   }

//   return (
//     <div className="min-vh-100" style={{ background: alpha(theme.palette.background.default, 1) }}>
//       {/* Custom Header with Back Button */}
//       <div
//         style={{
//           backgroundColor: theme.palette.background.paper,
//           borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//           padding: "8px 16px",
//           position: "sticky",
//           top: 0,
//           zIndex: 10,
//         }}
//       >
//         <div className="d-flex align-items-center" style={{ gap: "12px" }}>
//           <IconButton
//             onClick={handleBack}
//             size="small"
//             sx={{
//               color: theme.palette.primary.main,
//               width: 32,
//               height: 32,
//               "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
//             }}
//           >
//             <ArrowBackIcon sx={{ fontSize: 18 }} />
//           </IconButton>
//           <h5
//             style={{
//               margin: 0,
//               fontSize: "1rem",
//               fontWeight: 600,
//               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Tracking Routes - {trackData?.name || trackData?.userName || 'User'}
//           </h5>
//         </div>
//       </div>

//       <main className="container-fluid py-2 py-md-3">
//         <div className="row justify-content-center g-2 g-md-3">
//           <div className="col-12 col-lg-11">
//             {/* Header Section with Date Info */}
//             <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 mb-md-3 gap-2">
//               <div className="d-flex align-items-center">
//                 <FaRoute className="me-2" style={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
//                 <div>
//                   <h6 className="fw-bold mb-0" style={{
//                     color: theme.palette.text.primary,
//                     fontSize: '0.9rem'
//                   }}>
//                     {isToday ? "Today's Tracking" : "Tracking History"}
//                   </h6>
//                   <small style={{ fontSize: '0.65rem', color: theme.palette.text.secondary }}>
//                     {formatDate(selectedDate)}
//                   </small>
//                 </div>
//               </div>
//               <Badge
//                 bg="success"
//                 className="px-2 py-1 rounded-pill"
//                 style={{
//                   fontSize: '0.65rem',
//                   whiteSpace: "nowrap",
//                   backgroundColor: theme.palette.primary.main,
//                   fontWeight: 500,
//                 }}
//               >
//                 {sessions?.length || 0} Sessions • {
//                   sessionsSummary?.totalLocations || sessions.reduce((sum, s) => sum + (s.locationCount || 0), 0)
//                 } Locations
//               </Badge>
//             </div>

//             {/* Date Selector Card */}
//             <div style={{ position: "relative" }}>
//               <Card
//                 className="border-0 shadow-sm mb-2 mb-md-3"
//                 style={{ borderRadius: "8px" }}
//               >
//                 <Card.Body style={{ padding: '6px 12px' }}>
//                   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
//                     <div className="d-flex align-items-center flex-wrap" style={{ gap: "6px" }}>
//                       <FaCalendarAlt
//                         className="me-1"
//                         style={{ color: theme.palette.primary.main, fontSize: '0.8rem' }}
//                       />
//                       <span
//                         className="fw-semibold"
//                         style={{
//                           color: theme.palette.text.primary,
//                           fontSize: '0.75rem',
//                         }}
//                       >
//                         {formatDate(selectedDate)}
//                       </span>
//                       {!isToday && (
//                         <Badge
//                           bg="warning"
//                           className="px-2 py-0"
//                           style={{
//                             fontSize: "0.6rem",
//                             backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                             color: theme.palette.primary.main,
//                             border: "none",
//                           }}
//                         >
//                           Filtered
//                         </Badge>
//                       )}
//                     </div>

//                     <Button
//                       variant="outline-success"
//                       className="d-flex align-items-center"
//                       onClick={() => setShowCalendar(!showCalendar)}
//                       style={{
//                         borderRadius: "6px",
//                         borderColor: alpha(theme.palette.primary.main, 0.3),
//                         color: theme.palette.primary.main,
//                         fontSize: '0.7rem',
//                         padding: '0.15rem 0.6rem',
//                         backgroundColor: "transparent",
//                         height: '24px',
//                       }}
//                     >
//                       <FaCalendarAlt className="me-1" style={{ fontSize: '0.6rem' }} />
//                       Change Date
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>

//               {/* Calendar Popup with Available Dates Highlighting */}
//               {showCalendar && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "100%",
//                     right: 0,
//                     left: window.innerWidth < 768 ? 0 : 'auto',
//                     zIndex: 1000,
//                     backgroundColor: theme.palette.background.paper,
//                     padding: "6px 6px 2px 6px",
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
//                     borderRadius: "8px",
//                     marginTop: "4px",
//                     width: window.innerWidth < 768 ? '100%' : '260px',
//                     border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                   }}
//                 >
//                   <style>{`
//                     .compact-calendar .react-calendar__tile {
//                       padding: 8px 4px !important;
//                       line-height: 1.2 !important;
//                       font-size: 0.7rem !important;
//                       position: relative;
//                     }
//                     .compact-calendar .react-calendar__navigation button {
//                       min-width: 28px !important;
//                       height: 28px !important;
//                       font-size: 0.72rem !important;
//                       padding: 0 !important;
//                     }
//                     .compact-calendar .react-calendar__navigation {
//                       height: 28px !important;
//                       margin-bottom: 4px !important;
//                     }
//                     .compact-calendar .react-calendar__month-view__weekdays {
//                       font-size: 0.62rem !important;
//                     }
//                     .compact-calendar .react-calendar__month-view__weekdays__weekday {
//                       padding: 2px !important;
//                     }
//                     .available-date {
//                       background-color: ${alpha(theme.palette.primary.main, 0.1)} !important;
//                       border-radius: 50% !important;
//                       font-weight: bold !important;
//                     }
//                     .available-date:hover {
//                       background-color: ${alpha(theme.palette.primary.main, 0.2)} !important;
//                     }
//                     .available-dot {
//                       position: absolute;
//                       bottom: 2px;
//                       left: 50%;
//                       transform: translateX(-50%);
//                       width: 4px;
//                       height: 4px;
//                       border-radius: 50%;
//                       background-color: ${theme.palette.primary.main};
//                     }
//                   `}</style>

//                   <Calendar
//                     onChange={handleDateChange}
//                     value={selectedDate}
//                     maxDate={new Date()}
//                     next2Label={null}
//                     prev2Label={null}
//                     className="compact-calendar"
//                     tileClassName={({ date, view }) => {
//                       if (view === "month") {
//                         if (isDateAvailable(date)) {
//                           return "available-date";
//                         }
//                       }
//                       return null;
//                     }}
//                     tileContent={({ date, view }) => {
//                       if (view === "month") {
//                         const dateStr = formatDateLocal(date);

//                         // Show dot for available dates
//                         if (isDateAvailable(date)) {
//                           return (
//                             <div className="available-dot" />
//                           );
//                         }

//                         // Show different dot for tracked dates (if different from available)
//                         if (trackedDates.includes(dateStr)) {
//                           return (
//                             <div
//                               style={{
//                                 height: 4,
//                                 width: 4,
//                                 borderRadius: "50%",
//                                 backgroundColor: theme.palette.secondary?.main || "#22C55E",
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
//                   <div className="d-flex justify-content-between align-items-center mt-1 px-2">
//                     <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
//                       <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.palette.primary.main, marginRight: 4 }}></span>
//                       Has tracking data
//                     </small>
//                     <Button
//                       size="sm"
//                       variant="link"
//                       onClick={() => setShowCalendar(false)}
//                       style={{
//                         color: theme.palette.primary.main,
//                         fontSize: '0.65rem',
//                         padding: '1px 8px',
//                       }}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Loading State */}
//             {(loading || sessionsLoading || availableDatesLoading) && (
//               <Card
//                 className="border-0 shadow-sm text-center py-3"
//                 style={{ borderRadius: "8px" }}
//               >
//                 <Card.Body>
//                   <div
//                     className="spinner-border mb-2"
//                     role="status"
//                     style={{ color: theme.palette.primary.main, width: '2rem', height: '2rem' }}
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <h6 className="text-muted" style={{ fontSize: '0.8rem' }}>Loading tracking data...</h6>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length === 0 && (
//               <Card
//                 className="border-0 shadow-sm text-center py-3"
//                 style={{ borderRadius: "8px" }}
//               >
//                 <Card.Body>
//                   <FaRoute size={32} className="text-muted mb-2" style={{ color: alpha(theme.palette.primary.main, 0.3) }} />
//                   <h6 className="text-muted" style={{ fontSize: '0.9rem' }}>No tracking records found</h6>
//                   <p className="text-muted small" style={{ fontSize: '0.7rem' }}>
//                     No tracking data available for {formatDate(selectedDate)}.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Tracking Data Cards */}
//             {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length > 0 && (
//               <>
//                 {/* View All Sessions Button */}
//                 <Card
//                   className="border-0 shadow-sm mb-3"
//                   style={{ 
//                     borderRadius: "8px",
//                     background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.1)})`,
//                   }}
//                 >
//                   <Card.Body className="p-2">
//                     <div className="d-flex align-items-center justify-content-between">
//                       <div>
//                         <h6 className="fw-bold mb-0" style={{ fontSize: '0.8rem', color: theme.palette.text.primary }}>
//                           All Sessions for {formatDate(selectedDate)}
//                         </h6>
//                         <small style={{ fontSize: '0.65rem', color: theme.palette.text.secondary }}>
//                           {sessions.length} sessions • {
//                             sessionsSummary?.totalLocations || sessions.reduce((sum, s) => sum + (s.locationCount || 0), 0)
//                           } total locations
//                         </small>
//                       </div>
//                       <Button
//                         variant="success"
//                         className="d-flex align-items-center"
//                         onClick={handleViewLocations}
//                         style={{
//                           borderRadius: "20px",
//                           background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                           borderColor: theme.palette.primary.main,
//                           fontSize: '0.7rem',
//                           padding: '0.25rem 1rem',
//                           border: 'none',
//                         }}
//                       >
//                         <FaEye className="me-1" style={{ fontSize: '0.6rem' }} />
//                         View All Sessions
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>

//                 {/* Individual Session Cards */}
//                 <div
//                   className="d-flex flex-nowrap gap-2 pb-2"
//                   style={{
//                     overflowX: 'auto',
//                     WebkitOverflowScrolling: 'touch',
//                     scrollbarWidth: 'thin',
//                     scrollbarColor: `${alpha(theme.palette.primary.main, 0.3)} ${alpha(theme.palette.primary.main, 0.1)}`,
//                   }}
//                 >
//                   <style>
//                     {`
//                       div::-webkit-scrollbar {
//                         height: 4px;
//                       }
//                       div::-webkit-scrollbar-track {
//                         background: ${alpha(theme.palette.primary.main, 0.1)};
//                         border-radius: 4px;
//                       }
//                       div::-webkit-scrollbar-thumb {
//                         background: ${alpha(theme.palette.primary.main, 0.3)};
//                         border-radius: 4px;
//                       }
//                       div::-webkit-scrollbar-thumb:hover {
//                         background: ${alpha(theme.palette.primary.main, 0.5)};
//                       }
//                     `}
//                   </style>
//                   {sessions.map((item, index) => (
//                     <Card
//                       key={item.sessionId || index}
//                       className="border-0 shadow-sm"
//                       style={{
//                         minWidth: '280px',
//                         maxWidth: '300px',
//                         borderRadius: "8px",
//                         flexShrink: 0,
//                       }}
//                     >
//                       <Card.Body className="p-2">
//                         <div className="d-flex flex-column">
//                           <div className="d-flex align-items-center mb-2">
//                             <div className="me-2">
//                               <FaRoute size={14} style={{ color: theme.palette.primary.main }} />
//                             </div>
//                             <div>
//                               <h6
//                                 className="fw-semibold mb-0"
//                                 style={{
//                                   color: theme.palette.text.primary,
//                                   fontSize: '0.75rem'
//                                 }}
//                               >
//                                 Session #{index + 1}
//                               </h6>
//                               <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
//                                 {formatTime(item?.startTime)}
//                               </small>
//                             </div>
//                           </div>

//                           <div className="row g-1 mb-1">
//                             <div className="col-6">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-1"
//                                   style={{ color: "#22C55E", fontSize: '0.7rem' }}
//                                 />
//                                 <div>
//                                   <small style={{ fontSize: '0.55rem', color: theme.palette.text.secondary, display: 'block' }}>
//                                     Check In
//                                   </small>
//                                   <span style={{ fontSize: '0.65rem', color: theme.palette.text.primary }}>
//                                     {formatTime(item?.startTime)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="col-6">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-1"
//                                   style={{ color: "#F59E0B", fontSize: '0.7rem' }}
//                                 />
//                                 <div>
//                                   <small style={{ fontSize: '0.55rem', color: theme.palette.text.secondary, display: 'block' }}>
//                                     Check Out
//                                   </small>
//                                   <span style={{ fontSize: '0.65rem', color: theme.palette.text.primary }}>
//                                     {item.endTime ? formatTime(item.endTime) : "—"}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="d-flex align-items-center mb-1">
//                             <FaMapMarkerAlt
//                               className="me-1"
//                               style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}
//                             />
//                             <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
//                               {item?.locationCount || 0} locations
//                               {item.hasPhotos && ` • 📸`}
//                             </small>
//                           </div>

//                           <div className="d-flex align-items-center mb-2">
//                             <FaRoute
//                               className="me-1"
//                               style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}
//                             />
//                             <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
//                               Distance:{" "}
//                               <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
//                                 {item.totalDistance?.toFixed(2) || 0} km
//                               </span>
//                             </small>
//                           </div>

//                           <Button
//                             variant="success"
//                             className="d-flex align-items-center justify-content-center w-100"
//                             onClick={() => handleViewSessionLocations(item)}
//                             style={{
//                               borderRadius: "4px",
//                               whiteSpace: "nowrap",
//                               background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                               borderColor: theme.palette.primary.main,
//                               fontSize: '0.65rem',
//                               padding: '0.25rem 0.5rem',
//                               border: 'none',
//                             }}
//                           >
//                             <FaEye className="me-1" style={{ fontSize: '0.6rem' }} />
//                             View Session
//                           </Button>
//                         </div>
//                       </Card.Body>
//                     </Card>
//                   ))}
//                 </div>
//               </>
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
  FaArrowLeft,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSessionsByDate,
  getUserAvailableDates,
} from "../redux/slices/userSlice";
import { Card, Badge, Button } from "react-bootstrap";
import { formatDateLocal } from "../utils/dateFormat";
import { useTheme, alpha } from "@mui/material";
import { IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const TrackingData = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // Get the sessions data from the correct state path
  const sessionsData = useSelector((state) => state.user?.userSessionsList || []);
  const sessionsSummary = useSelector((state) => state.user?.userSessionsSummary);
  const sessionsLoading = useSelector((state) => state.user?.userSessionsLoading || false);
  const sessionsError = useSelector((state) => state.user?.userSessionsError);

  // Get available dates data
  const availableDates = useSelector((state) => state.user?.userAvailableDates || []);
  const availableDatesLoading = useSelector((state) => state.user?.userAvailableDatesLoading || false);


  // console.log("Available dates --->", availableDates)
  const location = useLocation();
  const navigate = useNavigate();
  const trackData = location.state?.item;
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user is coming back from `/locations`

  // console.log("Track data --->", trackData)
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

  // Format date for backend (YYYY-MM-DD)
  const backendFormattedDate =
    selectedDate.getFullYear() + "-" +
    (selectedDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
    selectedDate.getDate().toString().padStart(2, "0");

  // Format date for comparison (YYYY-MM-DD)
  const formatDateForComparison = (date) => {
    return date.getFullYear() + "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
      date.getDate().toString().padStart(2, "0");
  };

  // Fetch available dates when component mounts or user changes
  useEffect(() => {
    if (trackData?.id || trackData?._id) {
      dispatch(getUserAvailableDates({ id: trackData.id || trackData?._id }));
    }
  }, [dispatch, trackData?.id || trackData?._id]);

  // Fetch sessions when selectedDate changes
  useEffect(() => {
    if (selectedDate && trackData?.id || trackData?._id) {
      setLoading(true);
      // console.log("Fetching sessions for:", {
      //   userId: trackData.id || trackData?._id,
      //   date: backendFormattedDate
      // });

      dispatch(
        getUserSessionsByDate({
          userId: trackData.id || trackData?._id,
          date: backendFormattedDate,
          limit: 50
        })
      ).finally(() => setLoading(false));
    }
  }, [selectedDate, dispatch, trackData?.id || trackData?._id, backendFormattedDate]);

  // Save selected date to localStorage
  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date);
    setShowCalendar(false);
  };

  // Check if current date is today
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  // Check if a date has tracking data
  const isDateAvailable = (date) => {
    const dateStr = formatDateForComparison(date);
    return availableDates.includes(dateStr);
  };

  // Handle navigation to locations page for a SINGLE SESSION
  // const handleViewSingleSession = (session) => {
  //   if (!session) return;

  //   console.log("Navigating to locations with session:", session);

  //   // Pass the session metadata and userId to fetch full details in Locations component
  //   sessionStorage.setItem("returningFromLocations", "true");
  //   navigate(`/locations`, {
  //     state: {
  //       session: {
  //         ...session,
  //         userId: trackData?._id, // Add userId for fetching details
  //       },
  //       summary: {
  //         date: selectedDate,
  //         formattedDate: selectedDate.toLocaleDateString("en-US", {
  //           weekday: "long",
  //           year: "numeric",
  //           month: "long",
  //           day: "numeric",
  //         }),
  //         totalSessions: 1,
  //         totalLocations: session.locationCount || 0,
  //         totalDistance: session.totalDistance || 0,
  //       },
  //       metadata: {
  //         selectedDate: selectedDate,
  //         formattedDate: backendFormattedDate,
  //         trackId: trackData?._id,
  //       }
  //     }
  //   });
  // };
// Handle navigation to locations page for a SINGLE SESSION
const handleViewSingleSession = (session) => {
  if (!session) return;

  console.log("Navigating to locations with session:", session);

  // Get the session ID (use sessionId if available, fallback to _id)
  const sessionId = session.sessionId || session._id;
  
  console.log("Selected Session ID:", sessionId);
  console.log("All sessions:", sessionsData);

  // Pass all sessions + selected session ID
  sessionStorage.setItem("returningFromLocations", "true");
  navigate(`/locations`, {
    state: {
      sessions: sessionsData.map(s => ({  // Send ALL sessions with userId
        ...s,
        userId: trackData?._id,
      })),
      selectedSessionId: sessionId, // Send the selected session ID separately
      summary: {
        date: selectedDate,
        formattedDate: selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        totalSessions: sessionsData.length,
        totalLocations: sessionsData.reduce((sum, s) => sum + (s.locationCount || 0), 0),
        totalDistance: sessionsData.reduce((sum, s) => sum + (s.totalDistance || 0), 0),
      },
      metadata: {
        selectedDate: selectedDate,
        formattedDate: backendFormattedDate,
        trackId: trackData?._id,
        userId: trackData?.id,
        selectedSessionId: sessionId, // Also in metadata
      }
    }
  });
};
  // Handle navigation to locations page for ALL SESSIONS
  const handleViewLocations = () => {
    if (!sessionsData || sessionsData.length === 0) return;

    // Pass all sessions metadata and userId
    const sessionsToSend = sessionsData.map(session => ({
      ...session,
      userId: trackData?._id,
    }));

    sessionStorage.setItem("returningFromLocations", "true");
    navigate(`/locations`, {
      state: {
        sessions: sessionsToSend,
        summary: {
          date: selectedDate,
          formattedDate: selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          totalSessions: sessionsData.length,
          totalLocations: sessionsSummary?.totalLocations || sessionsData.reduce((sum, s) => sum + (s.locationCount || 0), 0),
          totalDistance: sessionsSummary?.totalDistance || 0,
        },
        metadata: {
          selectedDate: selectedDate,
          formattedDate: backendFormattedDate,
          trackId: trackData?._id,
        }
      }
    });
  };
  const handleBack = () => {
    navigate(-1);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Use sessionsData
  const sessions = sessionsData || [];

  // Show error if any
  if (sessionsError) {
    console.error("Sessions error:", sessionsError);
  }

  return (
    <div className="min-vh-100" style={{ background: alpha(theme.palette.background.default, 1) }}>
      {/* Custom Header with Back Button */}
      <div
        style={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          padding: "8px 16px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div className="d-flex align-items-center" style={{ gap: "12px" }}>
          <IconButton
            onClick={handleBack}
            size="small"
            sx={{
              color: theme.palette.primary.main,
              width: 32,
              height: 32,
              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <h5
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Tracking Routes - {trackData?.name || trackData?.userName || 'User'}
          </h5>
        </div>
      </div>

      <main className="container-fluid py-2 py-md-3">
        <div className="row justify-content-center g-2 g-md-3">
          <div className="col-12 col-lg-11">
            {/* Header Section with Date Info */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 mb-md-3 gap-2">
              <div className="d-flex align-items-center">
                <FaRoute className="me-2" style={{ color: theme.palette.primary.main, fontSize: '1rem' }} />
                <div>
                  <h6 className="fw-bold mb-0" style={{
                    color: theme.palette.text.primary,
                    fontSize: '0.9rem'
                  }}>
                    {isToday ? "Today's Tracking" : "Tracking History"}
                  </h6>
                  <small style={{ fontSize: '0.65rem', color: theme.palette.text.secondary }}>
                    {formatDate(selectedDate)}
                  </small>
                </div>
              </div>
              <Badge
                bg="success"
                className="px-2 py-1 rounded-pill"
                style={{
                  fontSize: '0.65rem',
                  whiteSpace: "nowrap",
                  backgroundColor: theme.palette.primary.main,
                  fontWeight: 500,
                }}
              >
                {sessions?.length || 0} Sessions • {
                  sessionsSummary?.totalLocations || sessions.reduce((sum, s) => sum + (s.locationCount || 0), 0)
                } Locations
              </Badge>
            </div>

            {/* Date Selector Card */}
            <div style={{ position: "relative" }}>
              <Card
                className="border-0 shadow-sm mb-2 mb-md-3"
                style={{ borderRadius: "8px" }}
              >
                <Card.Body style={{ padding: '6px 12px' }}>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div className="d-flex align-items-center flex-wrap" style={{ gap: "6px" }}>
                      <FaCalendarAlt
                        className="me-1"
                        style={{ color: theme.palette.primary.main, fontSize: '0.8rem' }}
                      />
                      <span
                        className="fw-semibold"
                        style={{
                          color: theme.palette.text.primary,
                          fontSize: '0.75rem',
                        }}
                      >
                        {formatDate(selectedDate)}
                      </span>
                      {!isToday && (
                        <Badge
                          bg="warning"
                          className="px-2 py-0"
                          style={{
                            fontSize: "0.6rem",
                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            border: "none",
                          }}
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
                        borderRadius: "6px",
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                        color: theme.palette.primary.main,
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.6rem',
                        backgroundColor: "transparent",
                        height: '24px',
                      }}
                    >
                      <FaCalendarAlt className="me-1" style={{ fontSize: '0.6rem' }} />
                      Change Date
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Calendar Popup with Available Dates Highlighting */}
              {showCalendar && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    left: window.innerWidth < 768 ? 0 : 'auto',
                    zIndex: 1000,
                    backgroundColor: theme.palette.background.paper,
                    padding: "6px 6px 2px 6px",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
                    borderRadius: "8px",
                    marginTop: "4px",
                    width: window.innerWidth < 768 ? '100%' : '260px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <style>{`
                    .compact-calendar .react-calendar__tile {
                      padding: 8px 4px !important;
                      line-height: 1.2 !important;
                      font-size: 0.7rem !important;
                      position: relative;
                    }
                    .compact-calendar .react-calendar__navigation button {
                      min-width: 28px !important;
                      height: 28px !important;
                      font-size: 0.72rem !important;
                      padding: 0 !important;
                    }
                    .compact-calendar .react-calendar__navigation {
                      height: 28px !important;
                      margin-bottom: 4px !important;
                    }
                    .compact-calendar .react-calendar__month-view__weekdays {
                      font-size: 0.62rem !important;
                    }
                    .compact-calendar .react-calendar__month-view__weekdays__weekday {
                      padding: 2px !important;
                    }
                    .available-date {
                      background-color: ${alpha(theme.palette.primary.main, 0.1)} !important;
                      border-radius: 50% !important;
                      font-weight: bold !important;
                    }
                    .available-date:hover {
                      background-color: ${alpha(theme.palette.primary.main, 0.2)} !important;
                    }
                    .available-dot {
                      position: absolute;
                      bottom: 2px;
                      left: 50%;
                      transform: translateX(-50%);
                      width: 4px;
                      height: 4px;
                      border-radius: 50%;
                      background-color: ${theme.palette.primary.main};
                    }
                  `}</style>

                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    maxDate={new Date()}
                    next2Label={null}
                    prev2Label={null}
                    className="compact-calendar"
                    tileClassName={({ date, view }) => {
                      if (view === "month") {
                        if (isDateAvailable(date)) {
                          return "available-date";
                        }
                      }
                      return null;
                    }}
                    tileContent={({ date, view }) => {
                      if (view === "month") {
                        if (isDateAvailable(date)) {
                          return (
                            <div className="available-dot" />
                          );
                        }
                      }
                      return null;
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-1 px-2">
                    <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
                      <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: theme.palette.primary.main, marginRight: 4 }}></span>
                      Has tracking data
                    </small>
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => setShowCalendar(false)}
                      style={{
                        color: theme.palette.primary.main,
                        fontSize: '0.65rem',
                        padding: '1px 8px',
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Loading State */}
            {(loading || sessionsLoading || availableDatesLoading) && (
              <Card
                className="border-0 shadow-sm text-center py-3"
                style={{ borderRadius: "8px" }}
              >
                <Card.Body>
                  <div
                    className="spinner-border mb-2"
                    role="status"
                    style={{ color: theme.palette.primary.main, width: '2rem', height: '2rem' }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h6 className="text-muted" style={{ fontSize: '0.8rem' }}>Loading tracking data...</h6>
                </Card.Body>
              </Card>
            )}

            {/* Empty State */}
            {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length === 0 && (
              <Card
                className="border-0 shadow-sm text-center py-3"
                style={{ borderRadius: "8px" }}
              >
                <Card.Body>
                  <FaRoute size={32} className="text-muted mb-2" style={{ color: alpha(theme.palette.primary.main, 0.3) }} />
                  <h6 className="text-muted" style={{ fontSize: '0.9rem' }}>No tracking records found</h6>
                  <p className="text-muted small" style={{ fontSize: '0.7rem' }}>
                    No tracking data available for {formatDate(selectedDate)}.
                  </p>
                </Card.Body>
              </Card>
            )}

            {/* Tracking Data Cards */}
            {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length > 0 && (
              <>
                {/* View All Sessions Button */}
                {/* <Card
                  className="border-0 shadow-sm mb-3"
                  style={{
                    borderRadius: "8px",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.main, 0.1)})`,
                  }}
                >
                  <Card.Body className="p-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="fw-bold mb-0" style={{ fontSize: '0.8rem', color: theme.palette.text.primary }}>
                          All Sessions for {formatDate(selectedDate)}
                        </h6>
                        <small style={{ fontSize: '0.65rem', color: theme.palette.text.secondary }}>
                          {sessions.length} sessions • {
                            sessionsSummary?.totalLocations || sessions.reduce((sum, s) => sum + (s.locationCount || 0), 0)
                          } total locations
                        </small>
                      </div>
                      <Button
                        variant="success"
                        className="d-flex align-items-center"
                        onClick={handleViewLocations}
                        style={{
                          borderRadius: "20px",
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          borderColor: theme.palette.primary.main,
                          fontSize: '0.7rem',
                          padding: '0.25rem 1rem',
                          border: 'none',
                        }}
                      >
                        <FaEye className="me-1" style={{ fontSize: '0.6rem' }} />
                        View All Sessions
                      </Button>
                    </div>
                  </Card.Body>
                </Card> */}

                {/* Individual Session Cards */}
                <div
                  className="d-flex flex-nowrap gap-2 pb-2"
                  style={{
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${alpha(theme.palette.primary.main, 0.3)} ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <style>
                    {`
                      div::-webkit-scrollbar {
                        height: 4px;
                      }
                      div::-webkit-scrollbar-track {
                        background: ${alpha(theme.palette.primary.main, 0.1)};
                        border-radius: 4px;
                      }
                      div::-webkit-scrollbar-thumb {
                        background: ${alpha(theme.palette.primary.main, 0.3)};
                        border-radius: 4px;
                      }
                      div::-webkit-scrollbar-thumb:hover {
                        background: ${alpha(theme.palette.primary.main, 0.5)};
                      }
                    `}
                  </style>
                  {sessions.map((item, index) => (
                    <Card
                      key={item.sessionId || index}
                      className="border-0 shadow-sm"
                      style={{
                        minWidth: '280px',
                        maxWidth: '300px',
                        borderRadius: "8px",
                        flexShrink: 0,
                      }}
                    >
                      <Card.Body className="p-2">
                        <div className="d-flex flex-column">
                          <div className="d-flex align-items-center mb-2">
                            <div className="me-2">
                              <FaRoute size={14} style={{ color: theme.palette.primary.main }} />
                            </div>
                            <div>
                              <h6
                                className="fw-semibold mb-0"
                                style={{
                                  color: theme.palette.text.primary,
                                  fontSize: '0.75rem'
                                }}
                              >
                                Session #{index + 1}
                              </h6>
                              <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
                                {formatTime(item?.startTime)}
                              </small>
                            </div>
                          </div>

                          <div className="row g-1 mb-1">
                            <div className="col-6">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-1"
                                  style={{ color: "#22C55E", fontSize: '0.7rem' }}
                                />
                                <div>
                                  <small style={{ fontSize: '0.55rem', color: theme.palette.text.secondary, display: 'block' }}>
                                    Check In
                                  </small>
                                  <span style={{ fontSize: '0.65rem', color: theme.palette.text.primary }}>
                                    {formatTime(item?.startTime)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-6">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-1"
                                  style={{ color: "#F59E0B", fontSize: '0.7rem' }}
                                />
                                <div>
                                  <small style={{ fontSize: '0.55rem', color: theme.palette.text.secondary, display: 'block' }}>
                                    Check Out
                                  </small>
                                  <span style={{ fontSize: '0.65rem', color: theme.palette.text.primary }}>
                                    {item.endTime ? formatTime(item.endTime) : "—"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center mb-1">
                            <FaMapMarkerAlt
                              className="me-1"
                              style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}
                            />
                            <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
                              {item?.locationCount || 0} locations
                            </small>
                          </div>

                          <div className="d-flex align-items-center mb-2">
                            <FaRoute
                              className="me-1"
                              style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}
                            />
                            <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
                              Distance:{" "}
                              <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                {item.totalDistance?.toFixed(2) || 0} km
                              </span>
                            </small>
                          </div>

                          <Button
                            variant="success"
                            className="d-flex align-items-center justify-content-center w-100"
                            onClick={() => handleViewSingleSession(item)}
                            style={{
                              borderRadius: "4px",
                              whiteSpace: "nowrap",
                              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                              borderColor: theme.palette.primary.main,
                              fontSize: '0.65rem',
                              padding: '0.25rem 0.5rem',
                              border: 'none',
                            }}
                          >
                            <FaEye className="me-1" style={{ fontSize: '0.6rem' }} />
                            View Session
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingData;







