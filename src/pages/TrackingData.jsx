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
//                 <FaRoute className="me-2" style={{ color: "#0f766e" }} />
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
//                 bg="success"
//                 className="px-3 py-2 rounded-pill"
//                 style={{ fontSize: "14px", whiteSpace: "nowrap", backgroundColor: "#0f766e" }}
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
//                         style={{ color: "#0f766e" }}
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
//                       variant="outline-success"
//                       className="d-flex align-items-center"
//                       onClick={() => setShowCalendar(!showCalendar)}
//                       style={{ 
//                         borderRadius: "8px",
//                         borderColor: "#0f766e",
//                         color: "#0f766e"
//                       }}
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
//                     className="spinner-border text-success mb-3"
//                     role="status"
//                     style={{ color: "#0f766e" }}
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
//                   <FaRoute size={48} className="text-muted mb-3" style={{ color: "#0f766e" }} />
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
//                               <FaRoute size={20} style={{ color: "#0f766e" }} />
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
//                               style={{ color: "#0f766e" }}
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
//                           variant="success"
//                           className="d-flex align-items-center"
//                           onClick={() => handleViewLocations(item?.locations)}
//                           style={{
//                             borderRadius: "8px",
//                             whiteSpace: "nowrap",
//                             backgroundColor: "#0f766e",
//                             borderColor: "#0f766e"
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
      <main className="container-fluid py-3 py-md-4">
        <div className="row justify-content-center g-3 g-md-4">
          <div className="col-12 col-lg-11">
            {/* Header Section */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mb-md-4 gap-3">
              <div className="d-flex align-items-center">
                <FaRoute className="me-2" style={{ color: "#2563EB", fontSize: 'clamp(1rem, 2vw, 1.25rem)' }} />
                <div>
                  <h5 className="fw-bold mb-0" style={{ 
                    color: "#374151",
                    fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                  }}>
                    Tracking Routes
                  </h5>
                  <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)' }}> 
                    {isToday
                      ? "Showing latest tracking data"
                      : `Showing data for ${selectedDate.toLocaleDateString()}`}
                  </small>
                </div>
              </div>
              <Badge
                bg="success"
                className="px-3 py-2 rounded-pill align-self-start align-self-sm-center"
                style={{ 
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', 
                  whiteSpace: "nowrap", 
                  backgroundColor: "#2563EB" 
                }}
              >
                {filteredData?.length || 0} Records
              </Badge>
            </div>

            <div style={{ position: "relative" }}>
              {/* Date Filter Section */}
              <Card
                className="border-0 shadow-sm mb-3 mb-md-4"
                style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
              >
                <Card.Body className="p-3 p-md-4">
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
                    <div className="d-flex align-items-center flex-wrap">
                      <FaCalendarAlt
                        className="me-2"
                        style={{ color: "#2563EB", fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
                      />
                      <span
                        className="fw-semibold"
                        style={{ 
                          color: "#374151",
                          fontSize: 'clamp(0.8rem, 1.5vw, 1rem)'
                        }}
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
                          style={{ 
                            fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)",
                            backgroundColor: "#e6f0ff",
                            color: "#2563EB"
                          }}
                        >
                          Filtered
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline-success"
                      className="d-flex align-items-center w-100 w-sm-auto"
                      onClick={() => setShowCalendar(!showCalendar)}
                      style={{ 
                        borderRadius: "clamp(6px, 1vw, 8px)",
                        borderColor: "#2563EB",
                        color: "#2563EB",
                        fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                        padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                        backgroundColor: "transparent",
                      }}
                    >
                      <FaCalendarAlt className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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
                    backgroundColor: "white",
                    padding: "clamp(8px, 2vw, 12px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    borderRadius: "clamp(8px, 1.5vw, 12px)",
                    marginTop: "8px",
                    width: window.innerWidth < 768 ? '100%' : 'auto',
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
                                backgroundColor: "#2563EB",
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
                  <div className="d-flex justify-content-end mt-2">
                    <Button
                      size="sm"
                      variant="link"
                      onClick={() => setShowCalendar(false)}
                      style={{ color: "#2563EB" }}
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
                className="border-0 shadow-sm text-center py-4 py-md-5"
                style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
              >
                <Card.Body>
                  <div
                    className="spinner-border mb-3"
                    role="status"
                    style={{ color: "#2563EB", width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h6 className="text-muted" style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>Loading tracking data...</h6>
                </Card.Body>
              </Card>
            )}

            {/* Empty State */}
            {!loading && filteredData?.length === 0 && (
              <Card
                className="border-0 shadow-sm text-center py-4 py-md-5"
                style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
              >
                <Card.Body>
                  <FaRoute size={window.innerWidth < 768 ? 36 : 48} className="text-muted mb-3" style={{ color: "#2563EB" }} />
                  <h6 className="text-muted" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>No tracking records found</h6>
                  <p className="text-muted small" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)' }}>
                    No tracking data available for the selected date.
                  </p>
                </Card.Body>
              </Card>
            )}

            {/* Tracking Data Cards */}
            {!loading && filteredData?.length > 0 && (
              <div className="d-flex flex-column gap-2 gap-md-3">
                {filteredData.map((item, index) => (
                  <Card
                    key={item._id || item.id || index}
                    className="border-0 shadow-sm"
                    style={{ borderRadius: "clamp(8px, 1.5vw, 12px)" }}
                  >
                    <Card.Body className="p-3 p-md-4">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                        <div className="flex-grow-1 w-100">
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-3">
                              <FaRoute size={window.innerWidth < 768 ? 16 : 20} style={{ color: "#2563EB" }} />
                            </div>
                            <div>
                              <h6
                                className="fw-semibold mb-1"
                                style={{ 
                                  color: "#1f2937",
                                  fontSize: 'clamp(0.9rem, 1.8vw, 1rem)'
                                }}
                              >
                                Tracking Session #{index + 1}
                              </h6>
                              <small className="text-muted" style={{ fontSize: 'clamp(0.65rem, 1.3vw, 0.75rem)' }}>
                                Route ID: {item.id || item._id}
                              </small>
                            </div>
                          </div>

                          <div className="row g-2 g-md-3">
                            <div className="col-12 col-md-6 mb-2">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-2"
                                  style={{ color: "#22C55E", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
                                />
                                <div>
                                  <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                                    Check In
                                  </small>
                                  <span
                                    className="fw-semibold"
                                    style={{ 
                                      color: "#374151",
                                      fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
                                    }}
                                  >
                                    {formatTime(item?.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-6 mb-2">
                              <div className="d-flex align-items-center">
                                <FaClock
                                  className="me-2"
                                  style={{ color: "#F59E0B", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
                                />
                                <div>
                                  <small className="text-muted d-block" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)' }}>
                                    Check Out
                                  </small>
                                  <span
                                    className="fw-semibold"
                                    style={{ 
                                      color: "#374151",
                                      fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)'
                                    }}
                                  >
                                    {item.end_at
                                      ? formatTime(item.end_at)
                                      : "Not checked out"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center mb-2">
                            <FaMapMarkerAlt
                              className="me-2"
                              style={{ color: "#2563EB", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
                            />
                            <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
                              {item?.locations?.length || 0} locations tracked
                            </small>
                          </div>

                          <div className="d-flex align-items-center">
                            <FaRoute
                              className="me-2"
                              style={{ color: "#2563EB", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
                            />
                            <small className="text-muted" style={{ fontSize: 'clamp(0.7rem, 1.4vw, 0.8rem)' }}>
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
                          className="d-flex align-items-center justify-content-center w-100 w-md-auto"
                          onClick={() => handleViewLocations(item?.locations)}
                          style={{
                            borderRadius: "clamp(6px, 1vw, 8px)",
                            whiteSpace: "nowrap",
                            background: "linear-gradient(135deg, #2563EB, #1E40AF)",
                            borderColor: "#2563EB",
                            fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                            padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                          }}
                        >
                          <FaEye className="me-2" style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)' }} />
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