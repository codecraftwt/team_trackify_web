// import React, { useState, useEffect } from "react";
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
//   getUserSessionsByDate,
//   getUserAvailableDates,
// } from "../redux/slices/userSlice";
// import { Card, Badge, Button } from "react-bootstrap";
// import { useTheme, alpha } from "@mui/material";
// import { IconButton } from "@mui/material";
// import { ArrowBack as ArrowBackIcon, Timer as TimerIcon } from "@mui/icons-material";

// const TrackingData = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

//   const sessionsData = useSelector((state) => state.user?.userSessionsList || []);
//   const sessionsSummary = useSelector((state) => state.user?.userSessionsSummary);
//   const sessionsLoading = useSelector((state) => state.user?.userSessionsLoading || false);
//   const sessionsError = useSelector((state) => state.user?.userSessionsError);

//   const availableDates = useSelector((state) => state.user?.userAvailableDates || []);
//   const availableDatesLoading = useSelector((state) => state.user?.userAvailableDatesLoading || false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const isReturningFromLocations =
//     sessionStorage.getItem("returningFromLocations") === "true";

//   const getStoredDate = () => {
//     const storedDate = localStorage.getItem("selectedDate");
//     if (isReturningFromLocations && storedDate) {
//       return new Date(storedDate);
//     }
//     return new Date();
//   };

//   const [selectedDate, setSelectedDate] = useState(getStoredDate());

//   useEffect(() => {
//     sessionStorage.removeItem("returningFromLocations");
//   }, []);

//   // Format date for backend (YYYY-MM-DD)
//   const backendFormattedDate =
//     selectedDate.getFullYear() + "-" +
//     (selectedDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
//     selectedDate.getDate().toString().padStart(2, "0");

//   const formatDateForComparison = (date) => {
//     return date.getFullYear() + "-" +
//       (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
//       date.getDate().toString().padStart(2, "0");
//   };

//   // Fetch available dates
//   useEffect(() => {
//     if (trackData?.id || trackData?._id) {
//       dispatch(getUserAvailableDates({ id: trackData.id || trackData?._id }));
//     }
//   }, [dispatch, trackData?.id, trackData?._id]);

//   // Fetch sessions when selectedDate changes
//   useEffect(() => {
//     if (selectedDate && (trackData?.id || trackData?._id)) {
//       setLoading(true);
//       dispatch(
//         getUserSessionsByDate({
//           userId: trackData.id || trackData?._id,
//           date: backendFormattedDate,
//           limit: 50,
//         })
//       ).finally(() => setLoading(false));
//     }
//   }, [selectedDate, dispatch, trackData?.id, trackData?._id, backendFormattedDate]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     localStorage.setItem("selectedDate", date.toISOString());
//     setShowCalendar(false);
//   };

//   const isToday = selectedDate.toDateString() === new Date().toDateString();

//   const isDateAvailable = (date) => {
//     const dateStr = formatDateForComparison(date);
//     return availableDates.includes(dateStr);
//   };

//   // ✅ Send ALL sessions for the selected date to Locations
//   const handleViewAllLocations = () => {
//     if (!sessionsData || sessionsData.length === 0) return;

//     // Format sessions data for Locations
//     const formattedSessions = sessionsData.map((session) => ({
//       _id: session._id,
//       sessionId: session.sessionId,
//       startTime: session.startTime,
//       endTime: session.endTime,
//       totalDistance: session.totalDistance,
//       isActive: session.isActive,
//       totalUploadedPhotos: session.totalUploadedPhotos,
//       // Calculate duration from start and end time
//       duration: session.startTime && session.endTime
//         ? (new Date(session.endTime) - new Date(session.startTime)) / 1000
//         : 0,
//       // Basic info without full locations (will be fetched when clicked)
//       hasFullData: false
//     }));

//     sessionStorage.setItem("returningFromLocations", "true");
//     navigate(`/locations`, {
//       state: {
//         sessions: formattedSessions,
//         selectedDate: backendFormattedDate,
//         summary: {
//           date: selectedDate,
//           formattedDate: selectedDate.toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           totalSessions: sessionsData.length,
//           totalLocations:
//             sessionsSummary?.totalLocations ||
//             sessionsData.reduce((sum, s) => sum + (s.locationCount || 0), 0),
//           totalDistance: sessionsSummary?.totalDistance || 0,
//         },
//         metadata: {
//           selectedDate: backendFormattedDate,
//           formattedDate: backendFormattedDate,
//           trackId: trackData?._id,
//           userId: trackData?.id || trackData?._id,
//         },
//       },
//     });
//   };

//   // ✅ View single session (same as view all, but with selected session ID)
//   const handleViewSingleSession = (clickedSession) => {
//     if (!sessionsData || sessionsData.length === 0) return;

//     const formattedSessions = sessionsData.map((session) => ({
//       _id: session._id,
//       sessionId: session.sessionId,
//       startTime: session.startTime,
//       endTime: session.endTime,
//       totalDistance: session.totalDistance,
//       isActive: session.isActive,
//       totalUploadedPhotos: session.totalUploadedPhotos,
//       remark: session.remark,
//       duration: session.startTime && session.endTime
//         ? (new Date(session.endTime) - new Date(session.startTime)) / 1000
//         : 0,
//       hasFullData: false
//     }));

//     sessionStorage.setItem("returningFromLocations", "true");
//     navigate(`/locations`, {
//       state: {
//         sessions: formattedSessions,
//         selectedSessionId: clickedSession.sessionId,
//         selectedDate: backendFormattedDate,
//         summary: {
//           date: selectedDate,
//           formattedDate: selectedDate.toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           totalSessions: sessionsData.length,
//           totalLocations:
//             sessionsSummary?.totalLocations ||
//             sessionsData.reduce((sum, s) => sum + (s.locationCount || 0), 0),
//           totalDistance: sessionsSummary?.totalDistance || 0,
//         },
//         metadata: {
//           selectedDate: backendFormattedDate,
//           formattedDate: backendFormattedDate,
//           trackId: trackData?._id,
//           userId: trackData?.id || trackData?._id,
//           selectedSessionId: clickedSession.sessionId,
//         },
//       },
//     });
//   };

//   const handleBack = () => navigate(-1);

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

//   const formatDuration = (seconds) => {
//     if (!seconds || seconds === 0) return "0m 0s";
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = Math.floor(seconds % 60);
//     if (hours > 0) return `${hours}h ${minutes}m`;
//     if (minutes > 0) return `${minutes}m ${secs}s`;
//     return `${secs}s`;
//   };

//   const sessions = sessionsData || [];

//   return (
//     <div className="min-vh-100" style={{ background: alpha(theme.palette.background.default, 1) }}>
//       {/* Header */}
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
//             Tracking Routes - {trackData?.name || trackData?.userName || "User"}
//           </h5>
//         </div>
//       </div>

//       <main className="container py-2 py-md-3">
//         <div className="row justify-content-center">
//           <div className="col-12">
//             {/* Header Section */}
//             <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 mb-md-3 gap-2">
//               <div className="d-flex align-items-center">
//                 <FaRoute className="me-2" style={{ color: theme.palette.primary.main, fontSize: "1rem" }} />
//                 <div>
//                   <h6 className="fw-bold mb-0" style={{ color: theme.palette.text.primary, fontSize: "0.9rem" }}>
//                     {isToday ? "Today's Tracking" : "Tracking History"}
//                   </h6>
//                   <small style={{ fontSize: "0.65rem", color: theme.palette.text.secondary }}>
//                     {formatDate(selectedDate)}
//                   </small>
//                 </div>
//               </div>
//               <Badge
//                 bg="success"
//                 className="px-2 py-1 rounded-pill"
//                 style={{
//                   fontSize: "0.65rem",
//                   whiteSpace: "nowrap",
//                   backgroundColor: theme.palette.primary.main,
//                   fontWeight: 500,
//                 }}
//               >
//                 Total Sessions: {sessions?.length || 0}
//               </Badge>
//             </div>

//             {/* Date Selector Card */}
//             <div style={{ position: "relative" }}>
//               <Card className="border-0 shadow-sm mb-2 mb-md-3" style={{ borderRadius: "8px" }}>
//                 <Card.Body style={{ padding: "6px 12px" }}>
//                   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
//                     <div className="d-flex align-items-center flex-wrap" style={{ gap: "6px" }}>
//                       <FaCalendarAlt
//                         className="me-1"
//                         style={{ color: theme.palette.primary.main, fontSize: "0.8rem" }}
//                       />
//                       <span
//                         className="fw-semibold"
//                         style={{ color: theme.palette.text.primary, fontSize: "0.75rem" }}
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
//                         fontSize: "0.7rem",
//                         padding: "0.15rem 0.6rem",
//                         backgroundColor: "transparent",
//                         height: "24px",
//                       }}
//                     >
//                       <FaCalendarAlt className="me-1" style={{ fontSize: "0.6rem" }} />
//                       Change Date
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>

//               {/* Calendar Popup */}
//               {showCalendar && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "100%",
//                     right: 0,
//                     left: window.innerWidth < 768 ? 0 : "auto",
//                     zIndex: 1000,
//                     backgroundColor: theme.palette.background.paper,
//                     padding: "6px 6px 2px 6px",
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
//                     borderRadius: "8px",
//                     marginTop: "4px",
//                     width: window.innerWidth < 768 ? "100%" : "260px",
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
//                       if (view === "month" && isDateAvailable(date)) return "available-date";
//                       return null;
//                     }}
//                     tileContent={({ date, view }) => {
//                       if (view === "month" && isDateAvailable(date)) {
//                         return <div className="available-dot" />;
//                       }
//                       return null;
//                     }}
//                   />
//                   <div className="d-flex justify-content-between align-items-center mt-1 px-2">
//                     <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
//                       <span
//                         style={{
//                           display: "inline-block",
//                           width: 8,
//                           height: 8,
//                           borderRadius: "50%",
//                           backgroundColor: theme.palette.primary.main,
//                           marginRight: 4,
//                         }}
//                       ></span>
//                       Has tracking data
//                     </small>
//                     <Button
//                       size="sm"
//                       variant="link"
//                       onClick={() => setShowCalendar(false)}
//                       style={{ color: theme.palette.primary.main, fontSize: "0.65rem", padding: "1px 8px" }}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Loading State */}
//             {(loading || sessionsLoading || availableDatesLoading) && (
//               <Card className="border-0 shadow-sm text-center py-3" style={{ borderRadius: "8px" }}>
//                 <Card.Body>
//                   <div
//                     className="spinner-border mb-2"
//                     role="status"
//                     style={{ color: theme.palette.primary.main, width: "2rem", height: "2rem" }}
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <h6 className="text-muted" style={{ fontSize: "0.8rem" }}>
//                     Loading tracking data...
//                   </h6>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length === 0 && (
//               <Card className="border-0 shadow-sm text-center py-3" style={{ borderRadius: "8px" }}>
//                 <Card.Body>
//                   <FaRoute
//                     size={32}
//                     className="text-muted mb-2"
//                     style={{ color: alpha(theme.palette.primary.main, 0.3) }}
//                   />
//                   <h6 className="text-muted" style={{ fontSize: "0.9rem" }}>
//                     No tracking records found
//                   </h6>
//                   <p className="text-muted small" style={{ fontSize: "0.7rem" }}>
//                     No tracking data available for {formatDate(selectedDate)}.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Session Cards - Responsive Grid Layout */}
//             {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length > 0 && (
//               <>


//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(1, 1fr)",
//                     gap: "1rem",
//                     justifyContent: "center",
//                     alignItems: "start",
//                   }}
//                   className="sessions-responsive-grid"
//                 >
//                   <style>
//                     {`
//                       @media (min-width: 768px) {
//                         .sessions-responsive-grid {
//                           grid-template-columns: repeat(2, 1fr) !important;
//                         }
//                       }

//                       @media (min-width: 1024px) {
//                         .sessions-responsive-grid {
//                           grid-template-columns: repeat(3, 1fr) !important;
//                         }
//                       }

//                       @media (min-width: 1440px) {
//                         .sessions-responsive-grid {
//                           grid-template-columns: repeat(4, 1fr) !important;
//                         }
//                       }
//                     `}
//                   </style>

//                   {sessions.slice().reverse().map((item, index) => {
//                     // Calculate duration from start and end time
//                     const duration = item.startTime && item.endTime
//                       ? (new Date(item.endTime) - new Date(item.startTime)) / 1000
//                       : 0;

//                     return (
//                       <Card
//                         key={item.sessionId || index}
//                         className="border-0 shadow-sm"
//                         style={{ borderRadius: "8px", width: "100%" }}
//                       >
//                         <Card.Body className="p-2">
//                           <div className="d-flex flex-column">
//                             <div className="d-flex align-items-center mb-2">
//                               <div
//                                 className="me-2 d-flex align-items-center justify-content-center"
//                                 style={{
//                                   minWidth: "24px",
//                                   height: "24px",
//                                   borderRadius: "50%",
//                                   backgroundColor: alpha(theme.palette.primary.main, 0.12),
//                                   color: theme.palette.primary.main,
//                                   fontSize: "0.7rem",
//                                   fontWeight: 700,
//                                 }}
//                               >
//                                 {index + 1}
//                               </div>
//                               <div className="me-2">
//                                 <FaRoute size={14} style={{ color: theme.palette.primary.main }} />
//                               </div>
//                               <div>
//                                 <h6
//                                   className="fw-semibold mb-0"
//                                   style={{ color: theme.palette.text.primary, fontSize: "0.75rem" }}
//                                 >
//                                   {/* Session #{index + 1} */}
//                                   {item.remark || "Session"}
//                                 </h6>
//                                 {/* <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
//                                   {formatTime(item?.startTime)}
//                                 </small> */}
//                               </div>
//                             </div>

//                             <div className="row g-1 mb-1">
//                               <div className="col-6">
//                                 <div className="d-flex align-items-center">
//                                   <FaClock className="me-1" style={{ color: "#22C55E", fontSize: "0.7rem" }} />
//                                   <div>
//                                     <small style={{ fontSize: "0.55rem", color: theme.palette.text.secondary, display: "block" }}>
//                                       Check In
//                                     </small>
//                                     <span style={{ fontSize: "0.65rem", color: theme.palette.text.primary }}>
//                                       {formatTime(item?.startTime)}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-6">
//                                 <div className="d-flex align-items-center">
//                                   <FaClock className="me-1" style={{ color: "#F59E0B", fontSize: "0.7rem" }} />
//                                   <div>
//                                     <small style={{ fontSize: "0.55rem", color: theme.palette.text.secondary, display: "block" }}>
//                                       Check Out
//                                     </small>
//                                     <span style={{ fontSize: "0.65rem", color: theme.palette.text.primary }}>
//                                       {item.endTime ? formatTime(item.endTime) : "Active"}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="d-flex align-items-center mb-1">
//                               <FaMapMarkerAlt
//                                 className="me-1"
//                                 style={{ color: theme.palette.primary.main, fontSize: "0.7rem" }}
//                               />
//                               <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
//                                 {item?.totalUploadedPhotos || 0} photos
//                               </small>
//                             </div>

//                             <div className="d-flex align-items-center mb-1">
//                               <FaRoute
//                                 className="me-1"
//                                 style={{ color: theme.palette.primary.main, fontSize: "0.7rem" }}
//                               />
//                               <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
//                                 Travelled Distance:{" "}
//                                 <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
//                                   {item.totalDistance
//                                     ? Math.floor((item.totalDistance / 1000) * 10) / 10
//                                     : 0}{" "}
//                                   km
//                                 </span>
//                               </small>
//                             </div>

//                             <div className="d-flex align-items-center mb-2">
//                               <TimerIcon sx={{ fontSize: 12, color: "#FF9800", marginRight: "4px" }} />
//                               <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
//                                 Duration:{" "}
//                                 <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
//                                   {formatDuration(duration)}
//                                 </span>
//                               </small>
//                             </div>

//                             <Button
//                               variant="success"
//                               className="d-flex align-items-center justify-content-center w-100"
//                               onClick={() => handleViewSingleSession(item)}
//                               style={{
//                                 borderRadius: "4px",
//                                 whiteSpace: "nowrap",
//                                 background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                                 borderColor: theme.palette.primary.main,
//                                 fontSize: "0.65rem",
//                                 padding: "0.25rem 0.5rem",
//                                 border: "none",
//                               }}
//                             >
//                               <FaEye className="me-1" style={{ fontSize: "0.6rem" }} />
//                               View Session
//                             </Button>
//                           </div>
//                         </Card.Body>
//                       </Card>
//                     );
//                   })}
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
  getUserSessionsByDate,
  getUserAvailableDates,
} from "../redux/slices/userSlice";
import { Card, Badge, Button } from "react-bootstrap";
import { useTheme, alpha } from "@mui/material";
import { IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon, Timer as TimerIcon, FiberManualRecord as LiveIcon } from "@mui/icons-material";

const TrackingData = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const sessionsData = useSelector((state) => state.user?.userSessionsList || []);
  const sessionsSummary = useSelector((state) => state.user?.userSessionsSummary);
  const sessionsLoading = useSelector((state) => state.user?.userSessionsLoading || false);
  const sessionsError = useSelector((state) => state.user?.userSessionsError);

  const availableDates = useSelector((state) => state.user?.userAvailableDates || []);
  const availableDatesLoading = useSelector((state) => state.user?.userAvailableDatesLoading || false);

  const location = useLocation();
  const navigate = useNavigate();
  const trackData = location.state?.item;
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const isReturningFromLocations =
    sessionStorage.getItem("returningFromLocations") === "true";

  const getStoredDate = () => {
    const storedDate = localStorage.getItem("selectedDate");
    if (isReturningFromLocations && storedDate) {
      return new Date(storedDate);
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getStoredDate());

  useEffect(() => {
    sessionStorage.removeItem("returningFromLocations");
  }, []);

  // Format date for backend (YYYY-MM-DD)
  const backendFormattedDate =
    selectedDate.getFullYear() + "-" +
    (selectedDate.getMonth() + 1).toString().padStart(2, "0") + "-" +
    selectedDate.getDate().toString().padStart(2, "0");

  const formatDateForComparison = (date) => {
    return date.getFullYear() + "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") + "-" +
      date.getDate().toString().padStart(2, "0");
  };

  // Fetch available dates
  useEffect(() => {
    if (trackData?.id || trackData?._id) {
      dispatch(getUserAvailableDates({ id: trackData.id || trackData?._id }));
    }
  }, [dispatch, trackData?.id, trackData?._id]);

  // Fetch sessions when selectedDate changes
  useEffect(() => {
    if (selectedDate && (trackData?.id || trackData?._id)) {
      setLoading(true);
      dispatch(
        getUserSessionsByDate({
          userId: trackData.id || trackData?._id,
          date: backendFormattedDate,
          limit: 50,
        })
      ).finally(() => setLoading(false));
    }
  }, [selectedDate, dispatch, trackData?.id, trackData?._id, backendFormattedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
    setShowCalendar(false);
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const isDateAvailable = (date) => {
    const dateStr = formatDateForComparison(date);
    return availableDates.includes(dateStr);
  };

  // Send ALL sessions for the selected date to Locations
  const handleViewAllLocations = () => {
    if (!sessionsData || sessionsData.length === 0) return;

    const formattedSessions = sessionsData.map((session) => ({
      _id: session._id,
      sessionId: session.sessionId,
      startTime: session.startTime,
      endTime: session.endTime,
      totalDistance: session.totalDistance,
      isActive: session.isActive,
      totalUploadedPhotos: session.totalUploadedPhotos,
      duration: session.startTime && session.endTime
        ? (new Date(session.endTime) - new Date(session.startTime)) / 1000
        : 0,
      hasFullData: false
    }));

    sessionStorage.setItem("returningFromLocations", "true");
    navigate(`/locations`, {
      state: {
        sessions: formattedSessions,
        selectedDate: backendFormattedDate,
        summary: {
          date: selectedDate,
          formattedDate: selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          totalSessions: sessionsData.length,
          totalLocations:
            sessionsSummary?.totalLocations ||
            sessionsData.reduce((sum, s) => sum + (s.locationCount || 0), 0),
          totalDistance: sessionsSummary?.totalDistance || 0,
        },
        metadata: {
          selectedDate: backendFormattedDate,
          formattedDate: backendFormattedDate,
          trackId: trackData?._id,
          userId: trackData?.id || trackData?._id,
        },
      },
    });
  };

  // View single session
  const handleViewSingleSession = (clickedSession) => {
    if (!sessionsData || sessionsData.length === 0) return;

    const formattedSessions = sessionsData.map((session) => ({
      _id: session._id,
      sessionId: session.sessionId,
      startTime: session.startTime,
      endTime: session.endTime,
      totalDistance: session.totalDistance,
      isActive: session.isActive,
      totalUploadedPhotos: session.totalUploadedPhotos,
      remark: session.remark,
      duration: session.startTime && session.endTime
        ? (new Date(session.endTime) - new Date(session.startTime)) / 1000
        : 0,
      hasFullData: false
    }));

    sessionStorage.setItem("returningFromLocations", "true");
    navigate(`/locations`, {
      state: {
        sessions: formattedSessions,
        selectedSessionId: clickedSession.sessionId,
        selectedDate: backendFormattedDate,
        summary: {
          date: selectedDate,
          formattedDate: selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          totalSessions: sessionsData.length,
          totalLocations:
            sessionsSummary?.totalLocations ||
            sessionsData.reduce((sum, s) => sum + (s.locationCount || 0), 0),
          totalDistance: sessionsSummary?.totalDistance || 0,
        },
        metadata: {
          selectedDate: backendFormattedDate,
          formattedDate: backendFormattedDate,
          trackId: trackData?._id,
          userId: trackData?.id || trackData?._id,
          selectedSessionId: clickedSession.sessionId,
        },
      },
    });
  };

  const handleBack = () => navigate(-1);

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

  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return "0m 0s";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const sessions = sessionsData || [];

  // Blinking animation for live dot
  const blinkKeyframes = `
    @keyframes blink {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(0.8); }
      100% { opacity: 1; transform: scale(1); }
    }
  `;

  return (
    <div className="min-vh-100" style={{ background: alpha(theme.palette.background.default, 1) }}>
      <style>{blinkKeyframes}</style>
      {/* Header */}
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
            Tracking Routes - {trackData?.name || trackData?.userName || "User"}
          </h5>
        </div>
      </div>

      <main className="container py-2 py-md-3">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* Header Section */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 mb-md-3 gap-2">
              <div className="d-flex align-items-center">
                <FaRoute className="me-2" style={{ color: theme.palette.primary.main, fontSize: "1rem" }} />
                <div>
                  <h6 className="fw-bold mb-0" style={{ color: theme.palette.text.primary, fontSize: "0.9rem" }}>
                    {isToday ? "Today's Tracking" : "Tracking History"}
                  </h6>
                  <small style={{ fontSize: "0.65rem", color: theme.palette.text.secondary }}>
                    {formatDate(selectedDate)}
                  </small>
                </div>
              </div>
              <Badge
                className="px-2 py-1 rounded-pill"
                style={{
                  fontSize: "0.65rem",
                  whiteSpace: "nowrap",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                Total Sessions: {sessions?.length || 0}
              </Badge>
            </div>

            {/* Date Selector Card */}
            <div style={{ position: "relative" }}>
              <Card className="border-0 shadow-sm mb-2 mb-md-3" style={{ borderRadius: "8px" }}>
                <Card.Body style={{ padding: "6px 12px" }}>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
                    <div className="d-flex align-items-center flex-wrap" style={{ gap: "6px" }}>
                      <FaCalendarAlt
                        className="me-1"
                        style={{ color: theme.palette.primary.main, fontSize: "0.8rem" }}
                      />
                      <span
                        className="fw-semibold"
                        style={{ color: theme.palette.text.primary, fontSize: "0.75rem" }}
                      >
                        {formatDate(selectedDate)}
                      </span>
                      {!isToday && (
                        <Badge
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
                        fontSize: "0.7rem",
                        padding: "0.15rem 0.6rem",
                        backgroundColor: "transparent",
                        height: "24px",
                      }}
                    >
                      <FaCalendarAlt className="me-1" style={{ fontSize: "0.6rem" }} />
                      Change Date
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Calendar Popup */}
              {showCalendar && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    left: window.innerWidth < 768 ? 0 : "auto",
                    zIndex: 1000,
                    backgroundColor: theme.palette.background.paper,
                    padding: "6px 6px 2px 6px",
                    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
                    borderRadius: "8px",
                    marginTop: "4px",
                    width: window.innerWidth < 768 ? "100%" : "260px",
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
                      if (view === "month" && isDateAvailable(date)) return "available-date";
                      return null;
                    }}
                    tileContent={({ date, view }) => {
                      if (view === "month" && isDateAvailable(date)) {
                        return <div className="available-dot" />;
                      }
                      return null;
                    }}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-1 px-2">
                    <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.main,
                          marginRight: 4,
                        }}
                      ></span>
                      Has tracking data
                    </small>
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => setShowCalendar(false)}
                      style={{ color: theme.palette.primary.main, fontSize: "0.65rem", padding: "1px 8px" }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Loading State */}
            {(loading || sessionsLoading || availableDatesLoading) && (
              <Card className="border-0 shadow-sm text-center py-3" style={{ borderRadius: "8px" }}>
                <Card.Body>
                  <div
                    className="spinner-border mb-2"
                    role="status"
                    style={{ color: theme.palette.primary.main, width: "2rem", height: "2rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h6 className="text-muted" style={{ fontSize: "0.8rem" }}>
                    Loading tracking data...
                  </h6>
                </Card.Body>
              </Card>
            )}

            {/* Empty State */}
            {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length === 0 && (
              <Card className="border-0 shadow-sm text-center py-3" style={{ borderRadius: "8px" }}>
                <Card.Body>
                  <FaRoute
                    size={32}
                    className="text-muted mb-2"
                    style={{ color: alpha(theme.palette.primary.main, 0.3) }}
                  />
                  <h6 className="text-muted" style={{ fontSize: "0.9rem" }}>
                    No tracking records found
                  </h6>
                  <p className="text-muted small" style={{ fontSize: "0.7rem" }}>
                    No tracking data available for {formatDate(selectedDate)}.
                  </p>
                </Card.Body>
              </Card>
            )}

            {/* Session Cards - Responsive Grid Layout */}
            {!loading && !sessionsLoading && !availableDatesLoading && sessions?.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                  gap: "1rem",
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
                className="sessions-responsive-grid"
              >
                <style>
                  {`
                    @media (min-width: 768px) {
                      .sessions-responsive-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                      }
                    }
                    
                    @media (min-width: 1024px) {
                      .sessions-responsive-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                      }
                    }
                    
                    @media (min-width: 1440px) {
                      .sessions-responsive-grid {
                        grid-template-columns: repeat(4, 1fr) !important;
                      }
                    }
                  `}
                </style>

                {sessions.slice().reverse().map((item, index) => {
                  const duration = item.startTime && item.endTime
                    ? (new Date(item.endTime) - new Date(item.startTime)) / 1000
                    : 0;

                  const isActive = item.isActive === true;

                  return (
                    <Card
                      key={item.sessionId || index}
                      className="border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "8px",
                        width: "100%",
                        height: "100%",
                        border: isActive ? `1px solid ${alpha(theme.palette.success.main, 0.5)}` : "none",
                        boxShadow: isActive ? `0 4px 12px ${alpha(theme.palette.success.main, 0.15)}` : "0 1px 4px rgba(0,0,0,0.03)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Card.Body className="p-2" style={{ height: "100%" }}>
                        <div className="d-flex flex-column h-100">
                          <div className="d-flex align-items-center mb-2">
                            <div
                              className="me-2 d-flex align-items-center justify-content-center"
                              style={{
                                minWidth: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: isActive ? alpha(theme.palette.success.main, 0.15) : alpha(theme.palette.primary.main, 0.12),
                                color: isActive ? theme.palette.success.main : theme.palette.primary.main,
                                fontSize: "0.7rem",
                                fontWeight: 700,
                              }}
                            >
                              {index + 1}
                            </div>
                            <div className="me-2">
                              <FaRoute size={14} style={{ color: isActive ? theme.palette.success.main : theme.palette.primary.main }} />
                            </div>
                            <div>
                              <h6
                                className="fw-semibold mb-0"
                                style={{ color: theme.palette.text.primary, fontSize: "0.75rem" }}
                              >
                                {item.remark || "Session"}
                              </h6>
                            </div>
                          </div>

                          <div className="row g-1 mb-1">
                            <div className="col-6">
                              <div className="d-flex align-items-center">
                                <FaClock className="me-1" style={{ color: "#22C55E", fontSize: "0.7rem" }} />
                                <div>
                                  <small style={{ fontSize: "0.55rem", color: theme.palette.text.secondary, display: "block" }}>
                                    Check In
                                  </small>
                                  <span style={{ fontSize: "0.65rem", color: theme.palette.text.primary }}>
                                    {formatTime(item?.startTime)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {!isActive && (
                              <div className="col-6">
                                <div className="d-flex align-items-center">
                                  <FaClock className="me-1" style={{ color: "#EF4444", fontSize: "0.7rem" }} />
                                  <div>
                                    <small style={{ fontSize: "0.55rem", color: theme.palette.text.secondary, display: "block" }}>
                                      Check Out
                                    </small>
                                    <span style={{ fontSize: "0.65rem", color: theme.palette.text.primary }}>
                                      {item.endTime ? formatTime(item.endTime) : "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                            {isActive && (
                              <div className="col-6">
                                <div className="d-flex align-items-center">
                                  <LiveIcon sx={{ color: "#2196f3", fontSize: "0.7rem", marginRight: "4px", animation: "blink 1.2s ease-in-out infinite" }} />
                                  <div>
                                    <small style={{ fontSize: "0.55rem", color: theme.palette.text.secondary, display: "block" }}>
                                      Status
                                    </small>
                                    <span style={{ fontSize: "0.65rem", color: theme.palette.info.main, fontWeight: 500 }}>
                                      Live Tracking
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="d-flex align-items-center mb-1">
                            <FaMapMarkerAlt
                              className="me-1"
                              style={{ color: theme.palette.primary.main, fontSize: "0.7rem" }}
                            />
                            <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
                              {item?.totalUploadedPhotos || 0} photos
                            </small>
                          </div>

                          <div className="d-flex align-items-center mb-1">
                            <FaRoute
                              className="me-1"
                              style={{ color: theme.palette.primary.main, fontSize: "0.7rem" }}
                            />
                            <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
                              Travelled Distance:{" "}
                              <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                {item.totalDistance
                                  ? Math.floor((item.totalDistance / 1000) * 10) / 10
                                  : 0}{" "}
                                km
                              </span>
                            </small>
                          </div>

                          {!isActive && (
                            <div className="d-flex align-items-center mb-2">
                              <TimerIcon sx={{ fontSize: 12, color: "#FF9800", marginRight: "4px" }} />
                              <small style={{ fontSize: "0.6rem", color: theme.palette.text.secondary }}>
                                Duration:{" "}
                                <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                  {formatDuration(duration)}
                                </span>
                              </small>
                            </div>
                          )}

                          <div className="mt-auto">
                            <Button
                              className="d-flex align-items-center justify-content-center w-100"
                              onClick={() => handleViewSingleSession(item)}
                              style={{
                                borderRadius: "4px",
                                whiteSpace: "nowrap",
                                background: isActive
                                  ? `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`
                                  : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                borderColor: isActive ? theme.palette.success.main : theme.palette.primary.main,
                                fontSize: "0.65rem",
                                padding: "0.25rem 0.5rem",
                                border: "none",
                                color: "#fff",
                              }}
                            >
                              <FaEye className="me-1" style={{ fontSize: "0.6rem" }} />
                              View Session
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrackingData;