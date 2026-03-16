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
//   const data = useSelector((state) => state.user?.userTrackInfo || []);
//   const trackedDates = useSelector((state) => state.user?.trackedDates || []);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);

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
//       <main className="container-fluid py-3 py-md-4">
//         <div className="row justify-content-center g-3 g-md-4">
//           <div className="col-12 col-lg-11">
//             {/* Header Section */}
//             <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mb-md-4 gap-3">
//               <div className="d-flex align-items-center">
//                 <FaRoute className="me-2" style={{ color: "#0f766e", fontSize: 'clamp(1rem, 2vw, 1.25rem)' }} />
//                 <div>
//                   <h5 className="fw-bold mb-0" style={{ 
//                     color: "#374151",
//                     fontSize: 'clamp(1rem, 2vw, 1.25rem)'
//                   }}>
//                     Tracking Routes
//                   </h5>
//                   <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}> 
//                     {isToday
//                       ? "Showing latest tracking data"
//                       : `Showing data for ${selectedDate.toLocaleDateString()}`}
//                   </small>
//                 </div>
//               </div>
//               <Badge
//                 bg="success"
//                 className="px-3 py-2 rounded-pill align-self-start align-self-sm-center"
//                 style={{ 
//                   fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', 
//                   whiteSpace: "nowrap", 
//                   backgroundColor: "#0f766e" 
//                 }}
//               >
//                 {filteredData?.length || 0} Records
//               </Badge>
//             </div>

//             <div style={{ position: "relative" }}>
//               {/* Date Filter Section */}
//               <Card
//                 className="border-0 shadow-sm mb-3 mb-md-4"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body className="p-3 p-md-4">
//                   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
//                     <div className="d-flex align-items-center flex-wrap">
//                       <FaCalendarAlt
//                         className="me-2"
//                         style={{ color: "#0f766e", fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
//                       />
//                       <span
//                         className="fw-semibold"
//                         style={{ 
//                           color: "#374151",
//                           fontSize: 'clamp(0.8rem, 1.5vw, 1rem)'
//                         }}
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
//                           style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)" }}
//                         >
//                           Filtered
//                         </Badge>
//                       )}
//                     </div>

//                     <Button
//                       variant="outline-success"
//                       className="d-flex align-items-center w-100 w-sm-auto"
//                       onClick={() => setShowCalendar(!showCalendar)}
//                       style={{ 
//                         borderRadius: "clamp(6px, 1vw, 8px)",
//                         borderColor: "#0f766e",
//                         color: "#0f766e",
//                         fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
//                         padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
//                       }}
//                     >
//                       <FaCalendarAlt className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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
//                     left: window.innerWidth < 768 ? 0 : 'auto',
//                     zIndex: 1000,
//                     backgroundColor: "white",
//                     padding: "clamp(8px, 2vw, 12px)",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     borderRadius: "clamp(8px, 1.5vw, 12px)",
//                     marginTop: "8px",
//                     width: window.innerWidth < 768 ? '100%' : 'auto',
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
//                                 backgroundColor: "#0f766e",
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
//                   <div className="d-flex justify-content-end mt-2">
//                     <Button
//                       size="sm"
//                       variant="link"
//                       onClick={() => setShowCalendar(false)}
//                       style={{ color: "#0f766e" }}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <Card
//                 className="border-0 shadow-sm text-center py-4 py-md-5"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body>
//                   <div
//                     className="spinner-border text-success mb-3"
//                     role="status"
//                     style={{ color: "#0f766e", width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }}
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <h6 className="text-muted" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>Loading tracking data...</h6>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && filteredData?.length === 0 && (
//               <Card
//                 className="border-0 shadow-sm text-center py-4 py-md-5"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body>
//                   <FaRoute size={window.innerWidth < 768 ? 36 : 48} className="text-muted mb-3" style={{ color: "#0f766e" }} />
//                   <h6 className="text-muted" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>No tracking records found</h6>
//                   <p className="text-muted small" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)' }}>
//                     No tracking data available for the selected date.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Tracking Data Cards */}
//             {!loading && filteredData?.length > 0 && (
//               <div className="d-flex flex-column gap-2 gap-md-3">
//                 {filteredData.map((item, index) => (
//                   <Card
//                     key={item._id || item.id || index}
//                     className="border-0 shadow-sm"
//                     style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//                   >
//                     <Card.Body className="p-3 p-md-4">
//                       <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
//                         <div className="flex-grow-1 w-100">
//                           <div className="d-flex align-items-center mb-3">
//                             <div className="me-3">
//                               <FaRoute size={window.innerWidth < 768 ? 16 : 20} style={{ color: "#0f766e" }} />
//                             </div>
//                             <div>
//                               <h6
//                                 className="fw-semibold mb-1"
//                                 style={{ 
//                                   color: "#1f2937",
//                                   fontSize: 'clamp(0.9rem, 1.8vw, 1rem)'
//                                 }}
//                               >
//                                 Tracking Session #{index + 1}
//                               </h6>
//                               <small className="text-muted" style={{ fontSize: 'clamp(0.65rem, 1.3vw, 0.75rem)' }}>
//                                 Route ID: {item.id || item._id}
//                               </small>
//                             </div>
//                           </div>

//                           <div className="row g-2 g-md-3">
//                             <div className="col-12 col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#22C55E", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
//                                     Check In
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ 
//                                       color: "#374151",
//                                       fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
//                                     }}
//                                   >
//                                     {formatTime(item?.createdAt)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="col-12 col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#F59E0B", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
//                                     Check Out
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ 
//                                       color: "#374151",
//                                       fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
//                                     }}
//                                   >
//                                     {item.end_at
//                                       ? formatTime(item.end_at)
//                                       : "Not checked out"}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="d-flex align-items-center mb-2">
//                             <FaMapMarkerAlt
//                               className="me-2"
//                               style={{ color: "#0f766e", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                             />
//                             <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
//                               {item?.locations?.length || 0} locations tracked
//                             </small>
//                           </div>

//                           <div className="d-flex align-items-center">
//                             <FaRoute
//                               className="me-2"
//                               style={{ color: "#10B981", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                             />
//                             <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
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
//                           variant="success"
//                           className="d-flex align-items-center justify-content-center w-100 w-md-auto"
//                           onClick={() => handleViewLocations(item?.locations)}
//                           style={{
//                             borderRadius: "clamp(6px, 1vw, 8px)",
//                             whiteSpace: "nowrap",
//                             backgroundColor: "#b1e8e3",
//                             borderColor: "#0f766e",
//                             fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
//                             padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
//                           }}
//                         >
//                           <FaEye className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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




















// color and loader


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
//   const data = useSelector((state) => state.user?.userTrackInfo || []);
//   const trackedDates = useSelector((state) => state.user?.trackedDates || []);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);

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
//       <main className="container-fluid py-3 py-md-4">
//         <div className="row justify-content-center g-3 g-md-4">
//           <div className="col-12 col-lg-11">
//             {/* Header Section */}
//             <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mb-md-4 gap-3">
//               <div className="d-flex align-items-center">
//                 <FaRoute className="me-2" style={{ color: "#2563EB", fontSize: 'clamp(1rem, 2vw, 1.25rem)' }} />
//                 <div>
//                   <h5 className="fw-bold mb-0" style={{ 
//                     color: "#374151",
//                     fontSize: 'clamp(1rem, 2vw, 1.25rem)'
//                   }}>
//                     Tracking Routes
//                   </h5>
//                   <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}> 
//                     {isToday
//                       ? "Showing latest tracking data"
//                       : `Showing data for ${selectedDate.toLocaleDateString()}`}
//                   </small>
//                 </div>
//               </div>
//               <Badge
//                 bg="success"
//                 className="px-3 py-2 rounded-pill align-self-start align-self-sm-center"
//                 style={{ 
//                   fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', 
//                   whiteSpace: "nowrap", 
//                   backgroundColor: "#2563EB" 
//                 }}
//               >
//                 {filteredData?.length || 0} Records
//               </Badge>
//             </div>

//             <div style={{ position: "relative" }}>
//               {/* Date Filter Section */}
//               <Card
//                 className="border-0 shadow-sm mb-3 mb-md-4"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body className="p-3 p-md-4">
//                   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
//                     <div className="d-flex align-items-center flex-wrap">
//                       <FaCalendarAlt
//                         className="me-2"
//                         style={{ color: "#2563EB", fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
//                       />
//                       <span
//                         className="fw-semibold"
//                         style={{ 
//                           color: "#374151",
//                           fontSize: 'clamp(0.8rem, 1.5vw, 1rem)'
//                         }}
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
//                           style={{ 
//                             fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)",
//                             backgroundColor: "#e6f0ff",
//                             color: "#2563EB"
//                           }}
//                         >
//                           Filtered
//                         </Badge>
//                       )}
//                     </div>

//                     <Button
//                       variant="outline-success"
//                       className="d-flex align-items-center w-100 w-sm-auto"
//                       onClick={() => setShowCalendar(!showCalendar)}
//                       style={{ 
//                         borderRadius: "clamp(6px, 1vw, 8px)",
//                         borderColor: "#2563EB",
//                         color: "#2563EB",
//                         fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
//                         padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
//                         backgroundColor: "transparent",
//                       }}
//                     >
//                       <FaCalendarAlt className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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
//                     left: window.innerWidth < 768 ? 0 : 'auto',
//                     zIndex: 1000,
//                     backgroundColor: "white",
//                     padding: "clamp(8px, 2vw, 12px)",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     borderRadius: "clamp(8px, 1.5vw, 12px)",
//                     marginTop: "8px",
//                     width: window.innerWidth < 768 ? '100%' : 'auto',
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
//                                 backgroundColor: "#2563EB",
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
//                   <div className="d-flex justify-content-end mt-2">
//                     <Button
//                       size="sm"
//                       variant="link"
//                       onClick={() => setShowCalendar(false)}
//                       style={{ color: "#2563EB" }}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <Card
//                 className="border-0 shadow-sm text-center py-4 py-md-5"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body>
//                   <div
//                     className="spinner-border mb-3"
//                     role="status"
//                     style={{ color: "#2563EB", width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }}
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <h6 className="text-muted" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>Loading tracking data...</h6>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && filteredData?.length === 0 && (
//               <Card
//                 className="border-0 shadow-sm text-center py-4 py-md-5"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body>
//                   <FaRoute size={window.innerWidth < 768 ? 36 : 48} className="text-muted mb-3" style={{ color: "#2563EB" }} />
//                   <h6 className="text-muted" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>No tracking records found</h6>
//                   <p className="text-muted small" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)' }}>
//                     No tracking data available for the selected date.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Tracking Data Cards */}
//             {!loading && filteredData?.length > 0 && (
//               <div className="d-flex flex-column gap-2 gap-md-3">
//                 {filteredData.map((item, index) => (
//                   <Card
//                     key={item._id || item.id || index}
//                     className="border-0 shadow-sm"
//                     style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//                   >
//                     <Card.Body className="p-3 p-md-4">
//                       <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
//                         <div className="flex-grow-1 w-100">
//                           <div className="d-flex align-items-center mb-3">
//                             <div className="me-3">
//                               <FaRoute size={window.innerWidth < 768 ? 16 : 20} style={{ color: "#2563EB" }} />
//                             </div>
//                             <div>
//                               <h6
//                                 className="fw-semibold mb-1"
//                                 style={{ 
//                                   color: "#1f2937",
//                                   fontSize: 'clamp(0.9rem, 1.8vw, 1rem)'
//                                 }}
//                               >
//                                 Tracking Session #{index + 1}
//                               </h6>
//                               <small className="text-muted" style={{ fontSize: 'clamp(0.65rem, 1.3vw, 0.75rem)' }}>
//                                 Route ID: {item.id || item._id}
//                               </small>
//                             </div>
//                           </div>

//                           <div className="row g-2 g-md-3">
//                             <div className="col-12 col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#22C55E", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
//                                     Check In
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ 
//                                       color: "#374151",
//                                       fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
//                                     }}
//                                   >
//                                     {formatTime(item?.createdAt)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="col-12 col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#F59E0B", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
//                                     Check Out
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ 
//                                       color: "#374151",
//                                       fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
//                                     }}
//                                   >
//                                     {item.end_at
//                                       ? formatTime(item.end_at)
//                                       : "Not checked out"}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="d-flex align-items-center mb-2">
//                             <FaMapMarkerAlt
//                               className="me-2"
//                               style={{ color: "#2563EB", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                             />
//                             <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
//                               {item?.locations?.length || 0} locations tracked
//                             </small>
//                           </div>

//                           <div className="d-flex align-items-center">
//                             <FaRoute
//                               className="me-2"
//                               style={{ color: "#2563EB", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                             />
//                             <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
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
//                           variant="success"
//                           className="d-flex align-items-center justify-content-center w-100 w-md-auto"
//                           onClick={() => handleViewLocations(item?.locations)}
//                           style={{
//                             borderRadius: "clamp(6px, 1vw, 8px)",
//                             whiteSpace: "nowrap",
//                             background: "linear-gradient(135deg, #2563EB, #1E40AF)",
//                             borderColor: "#2563EB",
//                             fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
//                             padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
//                           }}
//                         >
//                           <FaEye className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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

















//////////////////////////////    Centralised Color     ///////////////////////////////
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
// import { useTheme } from "@mui/material";

// const TrackingData = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.user?.userTrackInfo || []);
//   const trackedDates = useSelector((state) => state.user?.trackedDates || []);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);

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
//       <main className="container-fluid py-3 py-md-4">
//         <div className="row justify-content-center g-3 g-md-4">
//           <div className="col-12 col-lg-11">
//             {/* Header Section */}
//             <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mb-md-4 gap-3">
//               <div className="d-flex align-items-center">
//                 <FaRoute className="me-2" style={{ color: theme.palette.primary.main, fontSize: 'clamp(1rem, 2vw, 1.25rem)' }} />
//                 <div>
//                   <h5 className="fw-bold mb-0" style={{ 
//                     color: "text.primary",
//                     fontSize: 'clamp(1rem, 2vw, 1.25rem)'
//                   }}>
//                     Tracking Routes
//                   </h5>
//                   <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}> 
//                     {isToday
//                       ? "Showing latest tracking data"
//                       : `Showing data for ${selectedDate.toLocaleDateString()}`}
//                   </small>
//                 </div>
//               </div>
//               <Badge
//                 bg="success"
//                 className="px-3 py-2 rounded-pill align-self-start align-self-sm-center"
//                 style={{ 
//                   fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', 
//                   whiteSpace: "nowrap", 
//                   backgroundColor: theme.palette.primary.main 
//                 }}
//               >
//                 {filteredData?.length || 0} Records
//               </Badge>
//             </div>

//             <div style={{ position: "relative" }}>
//               {/* Date Filter Section */}
//               <Card
//                 className="border-0 shadow-sm mb-3 mb-md-4"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body className="p-3 p-md-4">
//                   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
//                     <div className="d-flex align-items-center flex-wrap">
//                       <FaCalendarAlt
//                         className="me-2"
//                         style={{ color: theme.palette.primary.main, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
//                       />
//                       <span
//                         className="fw-semibold"
//                         style={{ 
//                           color: "text.primary",
//                           fontSize: 'clamp(0.8rem, 1.5vw, 1rem)'
//                         }}
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
//                           style={{ 
//                             fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)",
//                             backgroundColor: "#e6f0ff",
//                             color: theme.palette.primary.main
//                           }}
//                         >
//                           Filtered
//                         </Badge>
//                       )}
//                     </div>

//                     <Button
//                       variant="outline-success"
//                       className="d-flex align-items-center w-100 w-sm-auto"
//                       onClick={() => setShowCalendar(!showCalendar)}
//                       style={{ 
//                         borderRadius: "clamp(6px, 1vw, 8px)",
//                         borderColor: theme.palette.primary.main,
//                         color: theme.palette.primary.main,
//                         fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
//                         padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
//                         backgroundColor: "transparent",
//                       }}
//                     >
//                       <FaCalendarAlt className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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
//                     left: window.innerWidth < 768 ? 0 : 'auto',
//                     zIndex: 1000,
//                     backgroundColor: "white",
//                     padding: "clamp(8px, 2vw, 12px)",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     borderRadius: "clamp(8px, 1.5vw, 12px)",
//                     marginTop: "8px",
//                     width: window.innerWidth < 768 ? '100%' : 'auto',
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
//                                 backgroundColor: theme.palette.primary.main,
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
//                   <div className="d-flex justify-content-end mt-2">
//                     <Button
//                       size="sm"
//                       variant="link"
//                       onClick={() => setShowCalendar(false)}
//                       style={{ color: theme.palette.primary.main }}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <Card
//                 className="border-0 shadow-sm text-center py-4 py-md-5"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body>
//                   <div
//                     className="spinner-border mb-3"
//                     role="status"
//                     style={{ color: theme.palette.primary.main, width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }}
//                   >
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                   <h6 className="text-muted" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>Loading tracking data...</h6>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Empty State */}
//             {!loading && filteredData?.length === 0 && (
//               <Card
//                 className="border-0 shadow-sm text-center py-4 py-md-5"
//                 style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//               >
//                 <Card.Body>
//                   <FaRoute size={window.innerWidth < 768 ? 36 : 48} className="text-muted mb-3" style={{ color: theme.palette.primary.main }} />
//                   <h6 className="text-muted" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>No tracking records found</h6>
//                   <p className="text-muted small" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)' }}>
//                     No tracking data available for the selected date.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Tracking Data Cards */}
//             {!loading && filteredData?.length > 0 && (
//               <div className="d-flex flex-column gap-2 gap-md-3">
//                 {filteredData.map((item, index) => (
//                   <Card
//                     key={item._id || item.id || index}
//                     className="border-0 shadow-sm"
//                     style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
//                   >
//                     <Card.Body className="p-3 p-md-4">
//                       <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
//                         <div className="flex-grow-1 w-100">
//                           <div className="d-flex align-items-center mb-3">
//                             <div className="me-3">
//                               <FaRoute size={window.innerWidth < 768 ? 16 : 20} style={{ color: theme.palette.primary.main }} />
//                             </div>
//                             <div>
//                               <h6
//                                 className="fw-semibold mb-1"
//                                 style={{ 
//                                   color: "text.primary",
//                                   fontSize: 'clamp(0.9rem, 1.8vw, 1rem)'
//                                 }}
//                               >
//                                 Tracking Session #{index + 1}
//                               </h6>
//                               <small className="text-muted" style={{ fontSize: 'clamp(0.65rem, 1.3vw, 0.75rem)' }}>
//                                 Route ID: {item.id || item._id}
//                               </small>
//                             </div>
//                           </div>

//                           <div className="row g-2 g-md-3">
//                             <div className="col-12 col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#22C55E", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
//                                     Check In
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ 
//                                       color: "text.primary",
//                                       fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
//                                     }}
//                                   >
//                                     {formatTime(item?.createdAt)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="col-12 col-md-6 mb-2">
//                               <div className="d-flex align-items-center">
//                                 <FaClock
//                                   className="me-2"
//                                   style={{ color: "#F59E0B", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                                 />
//                                 <div>
//                                   <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
//                                     Check Out
//                                   </small>
//                                   <span
//                                     className="fw-semibold"
//                                     style={{ 
//                                       color: "text.primary",
//                                       fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
//                                     }}
//                                   >
//                                     {item.end_at
//                                       ? formatTime(item.end_at)
//                                       : "Not checked out"}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="d-flex align-items-center mb-2">
//                             <FaMapMarkerAlt
//                               className="me-2"
//                               style={{ color: theme.palette.primary.main, fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                             />
//                             <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
//                               {item?.locations?.length || 0} locations tracked
//                             </small>
//                           </div>

//                           <div className="d-flex align-items-center">
//                             <FaRoute
//                               className="me-2"
//                               style={{ color: theme.palette.primary.main, fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
//                             />
//                             <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
//                               Distance Travelled:{" "}
//                               <span
//                                 className="fw-semibold"
//                                 style={{ color: "text.primary" }}
//                               >
//                                 {item.total_distance?.toFixed(2) || 0} km
//                               </span>
//                             </small>
//                           </div>
//                         </div>

//                         <Button
//                           variant="success"
//                           className="d-flex align-items-center justify-content-center w-100 w-md-auto"
//                           onClick={() => handleViewLocations(item?.locations)}
//                           style={{
//                             borderRadius: "clamp(6px, 1vw, 8px)",
//                             whiteSpace: "nowrap",
//                             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                             borderColor: theme.palette.primary.main,
//                             fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
//                             padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
//                           }}
//                         >
//                           <FaEye className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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
//   FaArrowLeft,
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
// import { useTheme, alpha } from "@mui/material";
// import { IconButton } from "@mui/material";
// import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

// const TrackingData = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.user?.userTrackInfo || []);
//   const trackedDates = useSelector((state) => state.user?.trackedDates || []);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const trackData = location.state?.item;
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);

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
//             Tracking Routes
//           </h5>
//         </div>
//       </div>

//       <main className="container-fluid py-2 py-md-3">
//         <div className="row justify-content-center g-2 g-md-3">
//           <div className="col-12 col-lg-11">
//             {/* Header Section - Compact */}
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
//                     {isToday
//                       ? "Latest data"
//                       : selectedDate.toLocaleDateString()}
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
//                 {filteredData?.length || 0} Records
//               </Badge>
//             </div>


//             {/* <div style={{ position: "relative", }}>
//               <Card
//                 className="border-0 shadow-sm mb-2 mb-md-3"
//                 style={{ borderRadius: "8px" }}
//               >
//                 <Card.Body className="p-2 p-md-3">
//                   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 ">
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
//                         {selectedDate.toLocaleDateString("en-US", {
//                           weekday: "short",
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })}
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
//                         padding: '0.25rem 0.75rem',
//                         backgroundColor: "transparent",
//                         height: '28px',
//                       }}
//                     >
//                       <FaCalendarAlt className="me-1" style={{ fontSize: '0.6rem' }} />
//                       Change
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
//                     left: window.innerWidth < 768 ? 0 : 'auto',
//                     zIndex: 1000,
//                     backgroundColor: theme.palette.background.paper,
//                     padding: "8px",
//                     boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.15)}`,
//                     borderRadius: "8px",
//                     marginTop: "4px",
//                     width: window.innerWidth < 768 ? '100%' : '280px',
//                     border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
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
//                                 height: 4,
//                                 width: 4,
//                                 borderRadius: "50%",
//                                 backgroundColor: theme.palette.primary.main,
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
//                   <div className="d-flex justify-content-end mt-1">
//                     <Button
//                       size="sm"
//                       variant="link"
//                       onClick={() => setShowCalendar(false)}
//                       style={{ 
//                         color: theme.palette.primary.main,
//                         fontSize: '0.65rem',
//                         padding: '2px 8px',
//                       }}
//                     >
//                       Close
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div> */}
//             <div style={{ position: "relative" }}>
//               <Card
//                 className="border-0 shadow-sm mb-2 mb-md-3"
//                 style={{ borderRadius: "8px" }}
//               >
//                 <Card.Body style={{ padding: '6px 12px' }}> {/* ← reduced height */}
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
//                         {selectedDate.toLocaleDateString("en-US", {
//                           weekday: "short",
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })}
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
//                       Change
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
//         .compact-calendar .react-calendar__tile {
//           padding: 8px 4px !important;
//           line-height: 1.2 !important;
//           font-size: 0.7rem !important;
//         }
//         .compact-calendar .react-calendar__navigation button {
//           min-width: 28px !important;
//           height: 28px !important;
//           font-size: 0.72rem !important;
//           padding: 0 !important;
//         }
//         .compact-calendar .react-calendar__navigation {
//           height: 28px !important;
//           margin-bottom: 4px !important;
//         }
//         .compact-calendar .react-calendar__month-view__weekdays {
//           font-size: 0.62rem !important;
//         }
//         .compact-calendar .react-calendar__month-view__weekdays__weekday {
//           padding: 2px !important;
//         }
//       `}</style>

//                   <Calendar
//                     onChange={handleDateChange}
//                     value={selectedDate}
//                     maxDate={new Date()}
//                     tileClassName="text-dark"
//                     next2Label={null}
//                     prev2Label={null}
//                     className="compact-calendar"
//                     tileContent={({ date, view }) => {
//                       if (view === "month") {
//                         const dateStr = formatDateLocal(date);
//                         if (trackedDates.includes(dateStr)) {
//                           return (
//                             <div
//                               style={{
//                                 height: 4,
//                                 width: 4,
//                                 borderRadius: "50%",
//                                 backgroundColor: theme.palette.primary.main,
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
//                   <div className="d-flex justify-content-end" style={{ marginTop: '2px' }}>
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
//             {/* Loading State - Compact */}
//             {loading && (
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

//             {/* Empty State - Compact */}
//             {!loading && filteredData?.length === 0 && (
//               <Card
//                 className="border-0 shadow-sm text-center py-3"
//                 style={{ borderRadius: "8px" }}
//               >
//                 <Card.Body>
//                   <FaRoute size={32} className="text-muted mb-2" style={{ color: alpha(theme.palette.primary.main, 0.3) }} />
//                   <h6 className="text-muted" style={{ fontSize: '0.9rem' }}>No tracking records found</h6>
//                   <p className="text-muted small" style={{ fontSize: '0.7rem' }}>
//                     No tracking data available for the selected date.
//                   </p>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Tracking Data Cards - With Horizontal Scroller */}
//             {!loading && filteredData?.length > 0 && (
//               <div
//                 className="d-flex flex-nowrap gap-2 pb-2"
//                 style={{
//                   overflowX: 'auto',
//                   WebkitOverflowScrolling: 'touch',
//                   scrollbarWidth: 'thin',
//                   scrollbarColor: `${alpha(theme.palette.primary.main, 0.3)} ${alpha(theme.palette.primary.main, 0.1)}`,
//                 }}
//               >
//                 <style>
//                   {`
//                     div::-webkit-scrollbar {
//                       height: 4px;
//                     }
//                     div::-webkit-scrollbar-track {
//                       background: ${alpha(theme.palette.primary.main, 0.1)};
//                       border-radius: 4px;
//                     }
//                     div::-webkit-scrollbar-thumb {
//                       background: ${alpha(theme.palette.primary.main, 0.3)};
//                       border-radius: 4px;
//                     }
//                     div::-webkit-scrollbar-thumb:hover {
//                       background: ${alpha(theme.palette.primary.main, 0.5)};
//                     }
//                   `}
//                 </style>
//                 {filteredData.map((item, index) => (
//                   <Card
//                     key={item._id || item.id || index}
//                     className="border-0 shadow-sm"
//                     style={{
//                       minWidth: '280px',
//                       maxWidth: '300px',
//                       borderRadius: "8px",
//                       flexShrink: 0,
//                     }}
//                   >
//                     <Card.Body className="p-2">
//                       <div className="d-flex flex-column">
//                         <div className="d-flex align-items-center mb-2">
//                           <div className="me-2">
//                             <FaRoute size={14} style={{ color: theme.palette.primary.main }} />
//                           </div>
//                           <div>
//                             <h6
//                               className="fw-semibold mb-0"
//                               style={{
//                                 color: theme.palette.text.primary,
//                                 fontSize: '0.75rem'
//                               }}
//                             >
//                               Session #{index + 1}
//                             </h6>
//                             <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
//                               ID: {(item.id || item._id)?.substring(0, 6)}...
//                             </small>
//                           </div>
//                         </div>

//                         <div className="row g-1 mb-1">
//                           <div className="col-6">
//                             <div className="d-flex align-items-center">
//                               <FaClock
//                                 className="me-1"
//                                 style={{ color: "#22C55E", fontSize: '0.7rem' }}
//                               />
//                               <div>
//                                 <small style={{ fontSize: '0.55rem', color: theme.palette.text.secondary, display: 'block' }}>
//                                   Check In
//                                 </small>
//                                 <span style={{ fontSize: '0.65rem', color: theme.palette.text.primary }}>
//                                   {formatTime(item?.createdAt)}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="col-6">
//                             <div className="d-flex align-items-center">
//                               <FaClock
//                                 className="me-1"
//                                 style={{ color: "#F59E0B", fontSize: '0.7rem' }}
//                               />
//                               <div>
//                                 <small style={{ fontSize: '0.55rem', color: theme.palette.text.secondary, display: 'block' }}>
//                                   Check Out
//                                 </small>
//                                 <span style={{ fontSize: '0.65rem', color: theme.palette.text.primary }}>
//                                   {item.end_at ? formatTime(item.end_at) : "—"}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="d-flex align-items-center mb-1">
//                           <FaMapMarkerAlt
//                             className="me-1"
//                             style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}
//                           />
//                           <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
//                             {item?.locations?.length || 0} locations
//                           </small>
//                         </div>

//                         <div className="d-flex align-items-center mb-2">
//                           <FaRoute
//                             className="me-1"
//                             style={{ color: theme.palette.primary.main, fontSize: '0.7rem' }}
//                           />
//                           <small style={{ fontSize: '0.6rem', color: theme.palette.text.secondary }}>
//                             Distance:{" "}
//                             <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
//                               {item.total_distance?.toFixed(2) || 0} km
//                             </span>
//                           </small>
//                         </div>

//                         <Button
//                           variant="success"
//                           className="d-flex align-items-center justify-content-center w-100"
//                           onClick={() => handleViewLocations(item?.locations)}
//                           style={{
//                             borderRadius: "4px",
//                             whiteSpace: "nowrap",
//                             background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                             borderColor: theme.palette.primary.main,
//                             fontSize: '0.65rem',
//                             padding: '0.25rem 0.5rem',
//                             border: 'none',
//                           }}
//                         >
//                           <FaEye className="me-1" style={{ fontSize: '0.6rem' }} />
//                           View
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






// With List
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
  getUserTrack,
  getUserTrackedDates,
} from "../redux/slices/userSlice";
import { Card, Badge, Button } from "react-bootstrap";
import { formatDateLocal } from "../utils/dateFormat";
import { useTheme, alpha } from "@mui/material";
import { IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const TrackingData = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user?.userTrackInfo || []);
  const trackedDates = useSelector((state) => state.user?.trackedDates || []);
  const location = useLocation();
  const navigate = useNavigate();
  const trackData = location.state?.item;
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

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

  // Check if current date is today
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  // Handle navigation to locations page - SENDS ALL SESSIONS FOR SELECTED DATE
  const handleViewLocations = () => {
    // Prepare all sessions data for the selected date with enhanced information
    const sessionsData = filteredData.map((session, sessionIndex) => ({
      ...session,
      sessionNumber: sessionIndex + 1,
      checkIn: session.createdAt,
      checkOut: session.end_at,
      totalDistance: session.total_distance || 0,
      locations: session.locations?.map((loc, locIndex) => ({
        ...loc,
        sessionId: session._id,
        sessionNumber: sessionIndex + 1,
        locationNumber: locIndex + 1,
        totalLocationsInSession: session.locations?.length || 0,
        isFirstInSession: locIndex === 0,
        isLastInSession: locIndex === (session.locations?.length || 0) - 1,
        hasImage: !!loc.location_image,
        imageUrl: loc.location_image || null,
      })) || [],
    }));

    // Create summary for the selected date
    const dateSummary = {
      date: selectedDate,
      formattedDate: selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      totalSessions: filteredData.length,
      totalLocations: filteredData.reduce((sum, s) => sum + (s.locations?.length || 0), 0),
      totalDistance: filteredData.reduce((sum, session) => sum + (session.total_distance || 0), 0),
      sessions: filteredData.map((session, index) => ({
        id: session._id,
        number: index + 1,
        startTime: session.createdAt,
        endTime: session.end_at,
        locationCount: session.locations?.length || 0,
        imageCount: session.locations?.filter(l => l.location_image).length || 0,
        distance: session.total_distance || 0,
        checkIn: session.createdAt,
        checkOut: session.end_at,
      })),
    };

    sessionStorage.setItem("returningFromLocations", "true");
    navigate(`/locations`, { 
      state: { 
        // Send ALL sessions for the selected date
        sessions: sessionsData,
        // Send summary data
        summary: dateSummary,
        // Send metadata
        metadata: {
          selectedDate: selectedDate,
          formattedDate: formattedDate,
          trackId: trackData?._id,
          totalSessions: filteredData.length,
          totalLocations: filteredData.reduce((sum, s) => sum + (s.locations?.length || 0), 0),
        }
      } 
    });
  };

  // Handle navigation to locations page for a specific session
  const handleViewSessionLocations = (session) => {
    // Prepare single session data
    const sessionData = [{
      ...session,
      sessionNumber: filteredData.findIndex(s => s._id === session._id) + 1,
      checkIn: session.createdAt,
      checkOut: session.end_at,
      totalDistance: session.total_distance || 0,
      locations: session.locations?.map((loc, locIndex) => ({
        ...loc,
        sessionId: session._id,
        sessionNumber: filteredData.findIndex(s => s._id === session._id) + 1,
        locationNumber: locIndex + 1,
        totalLocationsInSession: session.locations?.length || 0,
        isFirstInSession: locIndex === 0,
        isLastInSession: locIndex === (session.locations?.length || 0) - 1,
        hasImage: !!loc.location_image,
        imageUrl: loc.location_image || null,
      })) || [],
    }];

    // Create summary for this session
    const sessionSummary = {
      date: selectedDate,
      formattedDate: selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      totalSessions: 1,
      totalLocations: session.locations?.length || 0,
      totalDistance: session.total_distance || 0,
      sessions: [{
        id: session._id,
        number: filteredData.findIndex(s => s._id === session._id) + 1,
        startTime: session.createdAt,
        endTime: session.end_at,
        locationCount: session.locations?.length || 0,
        imageCount: session.locations?.filter(l => l.location_image).length || 0,
        distance: session.total_distance || 0,
        checkIn: session.createdAt,
        checkOut: session.end_at,
      }],
    };

    sessionStorage.setItem("returningFromLocations", "true");
    navigate(`/locations`, { 
      state: { 
        sessions: sessionData,
        summary: sessionSummary,
        metadata: {
          selectedDate: selectedDate,
          formattedDate: formattedDate,
          trackId: trackData?._id,
          totalSessions: 1,
          totalLocations: session.locations?.length || 0,
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
            Tracking Routes
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
                {filteredData?.length || 0} Sessions • {
                  filteredData.reduce((sum, s) => sum + (s.locations?.length || 0), 0)
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

              {/* Calendar Popup */}
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
                  `}</style>

                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    maxDate={new Date()}
                    tileClassName="text-dark"
                    next2Label={null}
                    prev2Label={null}
                    className="compact-calendar"
                    tileContent={({ date, view }) => {
                      if (view === "month") {
                        const dateStr = formatDateLocal(date);
                        if (trackedDates.includes(dateStr)) {
                          return (
                            <div
                              style={{
                                height: 4,
                                width: 4,
                                borderRadius: "50%",
                                backgroundColor: theme.palette.primary.main,
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
                  <div className="d-flex justify-content-end" style={{ marginTop: '2px' }}>
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
            {loading && (
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
            {!loading && filteredData?.length === 0 && (
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
            {!loading && filteredData?.length > 0 && (
              <>
                {/* View All Sessions Button */}
                <Card
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
                          {filteredData.length} sessions • {
                            filteredData.reduce((sum, s) => sum + (s.locations?.length || 0), 0)
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
                </Card>

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
                  {filteredData.map((item, index) => (
                    <Card
                      key={item._id || item.id || index}
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
                                {formatTime(item?.createdAt)}
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
                                    {formatTime(item?.createdAt)}
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
                                    {item.end_at ? formatTime(item.end_at) : "—"}
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
                              {item?.locations?.length || 0} locations
                              {item.locations?.filter(l => l.location_image).length > 0 && 
                                ` • ${item.locations.filter(l => l.location_image).length} 📸`
                              }
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
                                {item.total_distance?.toFixed(2) || 0} km
                              </span>
                            </small>
                          </div>

                          <Button
                            variant="success"
                            className="d-flex align-items-center justify-content-center w-100"
                            onClick={() => handleViewSessionLocations(item)}
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