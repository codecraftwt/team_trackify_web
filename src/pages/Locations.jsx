// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   IconButton,
//   Chip,
//   alpha,
//   AppBar,
//   Toolbar,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
//   Drawer,
//   Fab,
//   Button,
//   Stack,
//   CircularProgress,
//   Tooltip,
//   Zoom,
//   Divider,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   Close as CloseIcon,
//   Menu as MenuIcon,
//   Photo as PhotoIcon,
//   Info as InfoIcon,
//   Refresh as RefreshIcon,
//   Timer as TimerIcon,
//   Straighten as StraightenIcon,
//   Flag as FlagIcon,
//   Start as StartIcon,
//   PinDrop as PinDropIcon,
//   Schedule as ScheduleIcon,
// } from "@mui/icons-material";
// import { getSessionDetails } from "../redux/slices/userSlice";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // ─── Pure Helpers ────────────────────────────────────────────────────────────
// const calcDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371e3;
//   const φ1 = (lat1 * Math.PI) / 180;
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(Δφ / 2) ** 2 +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// };

// // Check if location has valid coordinates (not 0,0)
// const hasValidCoordinates = (location) => {
//   const lat = location.latitude || location.lat;
//   const lng = location.longitude || location.lng;
//   return (lat !== 0 && lat !== null && lat !== undefined) &&
//     (lng !== 0 && lng !== null && lng !== undefined) &&
//     !isNaN(lat) && !isNaN(lng);
// };

// // Check if location has a valid photo
// const hasValidPhoto = (location) => {
//   return !!(location.photo &&
//     location.photo !== null &&
//     location.photo !== "" &&
//     location.photo !== "null" &&
//     location.photo !== "undefined" &&
//     typeof location.photo === 'string' &&
//     (location.photo.startsWith('http://') || location.photo.startsWith('https://')));
// };

// // Get coordinates from location
// const getLat = (location) => location?.latitude || location?.lat || 0;
// const getLng = (location) => location?.longitude || location?.lng || 0;

// // Get address from location
// const getAddress = (location) => {
//   if (location?.address && location.address !== "Unknown Address" && location.address !== "N/A") {
//     return location.address;
//   }
//   return "Address not available";
// };

// // Filter and sort valid locations
// const getValidLocations = (locations) => {
//   if (!locations || locations.length === 0) return [];
//   const validLocations = locations.filter(loc => hasValidCoordinates(loc));
//   return validLocations.sort((a, b) => {
//     const timeA = a.timestamp || a.time || a.createdAt;
//     const timeB = b.timestamp || b.time || b.createdAt;
//     return new Date(timeA) - new Date(timeB);
//   });
// };

// // Calculate total distance
// const calcTotalDistance = (locations) => {
//   const validLocations = getValidLocations(locations);
//   if (!validLocations || validLocations.length < 2) return 0;
//   let total = 0;
//   for (let i = 1; i < validLocations.length; i++) {
//     total += calcDistance(
//       getLat(validLocations[i - 1]), getLng(validLocations[i - 1]),
//       getLat(validLocations[i]), getLng(validLocations[i])
//     );
//   }
//   return total;
// };

// const fmtTime = (ts) => {
//   if (!ts) return "Active";
//   const date = new Date(ts);
//   return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
// };

// const fmtDate = (ts) => {
//   if (!ts) return "";
//   const date = new Date(ts);
//   return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
// };

// const fmtDateTime = (ts) => {
//   if (!ts) return "N/A";
//   const date = new Date(ts);
//   return date.toLocaleString("en-US", {
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true
//   });
// };

// const fmtDist = (meters) => {
//   if (!meters || meters === 0) return "0 km";
//   if (meters < 1000) return `${Math.round(meters)} m`;
//   return `${(meters / 1000).toFixed(2)} km`;
// };

// const fmtDuration = (seconds) => {
//   if (!seconds || seconds === 0) return "0 sec";
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;

//   if (hours > 0) {
//     return `${hours}h ${minutes}m`;
//   } else if (minutes > 0) {
//     return `${minutes}m ${secs}s`;
//   }
//   return `${secs}s`;
// };

// // ─── Marker factories ────────────────────────────────────────────────────────
// const makeStartIcon = (color, time, hasPhoto = false, size = 32) => {
//   return L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 2.8}px;line-height:1">🚀</span>
//         <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">START</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
//         ${time}${hasPhoto ? " 📸" : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });
// };

// const makeEndIcon = (color, time, hasPhoto = false, size = 32) => {
//   return L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 2.8}px;line-height:1">🏁</span>
//         <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">END</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
//         ${time}${hasPhoto ? " 📸" : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });
// };

// const makePhotoIcon = (photoUrl, time, size = 32) => {
//   return L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #FF9800, #F57C00);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);overflow:hidden;">
//         <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:16px\\'>📸</span>'"/>
//         <span style="position:absolute;bottom:0;right:0;background:#FF9800;border-radius:50%;width:12px;height:12px;display:flex;align-items:center;justify-content:center;font-size:7px;border:1px solid #fff;">📸</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid #FF9800;">
//         ${time}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });
// };

// // ─── Main Component ───────────────────────────────────────────────────────────
// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const {
//     sessions = [],
//     selectedSessionId: initialSelectedSessionId,
//     summary = {},
//     metadata = {},
//   } = location.state || {};

//   // Get session details from Redux
//   const sessionDetails = useSelector((state) => state.user?.sessionDetails);
//   const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);

//   // ── State ──────────────────────────────────────────────────────────────────
//   const [allSessions, setAllSessions] = useState([]);
//   const [selectedSessionId, setSelectedSessionId] = useState(null);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [totalDistance, setTotalDistance] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [hasLocations, setHasLocations] = useState(false);
//   const [showPhotoMarkers, setShowPhotoMarkers] = useState(true);
//   const [isMapInitialized, setIsMapInitialized] = useState(false);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map()); // Cache for session data

//   // ── Init sessions from props ───────────────────────────────────────────────
//   useEffect(() => {
//     if (sessions && sessions.length > 0) {
//       setAllSessions(sessions);
//       // Cache sessions that already have location data
//       sessions.forEach(session => {
//         if (session.locations && session.locations.length > 0) {
//           const sessionId = String(session.sessionId || session._id);
//           sessionDataCache.current.set(sessionId, session);
//           console.log("Cached session:", sessionId, "with locations:", session.locations.length);
//         }
//       });
//     }
//   }, [sessions]);

//   // ── Process session data ───────────────────────────────────────────────────
//   const processSessionData = useCallback((sessionData) => {
//     if (!sessionData) return;

//     console.log("Processing session data:", sessionData.sessionId, "Locations:", sessionData.locations?.length);

//     setSelectedSession(sessionData);

//     const allLocations = sessionData.locations || [];
//     const validLocations = getValidLocations(allLocations);

//     if (validLocations.length > 0) {
//       setHasLocations(true);
//       const dist = calcTotalDistance(allLocations);
//       const duration = sessionData.stats?.duration || 0;

//       const firstLoc = allLocations[0];
//       const lastLoc = allLocations[allLocations.length - 1];
//       const startTimeValue = firstLoc?.timestamp || sessionData.startTime;
//       const endTimeValue = lastLoc?.timestamp || sessionData.endTime;

//       setStartTime(startTimeValue);
//       setEndTime(endTimeValue);
//       setTotalDistance(dist);
//       setTotalDuration(duration);

//       // Draw on map if map is ready
//       if (mapInstance.current) {
//         console.log("Drawing session immediately");
//         setTimeout(() => {
//           drawMapWithSession(sessionData, showPhotoMarkers);
//         }, 100);
//       }
//     } else {
//       console.log("No valid locations found");
//       setHasLocations(false);
//     }
//   }, [showPhotoMarkers]);

//   // ── Handle session click - FIXED: Check cache first ───────────────────────
//   const handleSessionSelect = useCallback(
//     (sessionId) => {
//       const id = String(sessionId);

//       console.log("=== Session Click ===");
//       console.log("Selected ID:", id);
//       console.log("Current selected ID:", selectedSessionId);

//       // Always update the selected session ID
//       setSelectedSessionId(id);

//       // Check cache first
//       if (sessionDataCache.current.has(id)) {
//         const cachedSession = sessionDataCache.current.get(id);
//         console.log("Using cached session data:", id, "Locations:", cachedSession.locations?.length);
//         processSessionData(cachedSession);
//         return;
//       }

//       // Find session in allSessions
//       const foundSession = allSessions.find(
//         (s) => String(s.sessionId || s._id) === id
//       );

//       if (foundSession?.locations && foundSession.locations.length > 0) {
//         // Session already has location data
//         console.log("Session has location data, using directly");
//         sessionDataCache.current.set(id, foundSession);
//         processSessionData(foundSession);
//       } else if (foundSession && !fetchedSessions.current.has(id)) {
//         // Need to fetch session details
//         const userId = metadata?.userId || foundSession?.userId;

//         if (userId) {
//           console.log("Fetching session details for:", id);
//           fetchedSessions.current.add(id);
//           dispatch(getSessionDetails({ userId, sessionId: id }));
//         } else {
//           console.log("No userId found for session:", id);
//           setSelectedSession(null);
//           setHasLocations(false);
//         }
//       } else if (foundSession && fetchedSessions.current.has(id)) {
//         // Already fetched, wait for Redux
//         console.log("Session already fetching, waiting for Redux data...");
//         setSelectedSession(null);
//         setHasLocations(false);
//       } else {
//         console.log("Session not found in allSessions");
//         setSelectedSession(null);
//         setHasLocations(false);
//       }

//       if (isMobile) setDrawerOpen(false);
//     },
//     [selectedSessionId, allSessions, metadata?.userId, dispatch, isMobile, processSessionData]
//   );

//   // ── Watch for sessionDetails from Redux ───────────────────────────────────
//   useEffect(() => {
//     if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
//       console.log("Received session details from Redux");
//       // Cache the fetched data
//       const sessionId = String(sessionDetails.sessionId);
//       sessionDataCache.current.set(sessionId, sessionDetails);
//       processSessionData(sessionDetails);
//     }
//   }, [sessionDetails, selectedSessionId, processSessionData]);

//   // ── Auto-select first session on initial load ─────────────────────────────
//   useEffect(() => {
//     if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
//       let firstSessionId;
//       if (initialSelectedSessionId) {
//         firstSessionId = String(initialSelectedSessionId);
//         console.log("Using initial selected session ID:", firstSessionId);
//       } else {
//         firstSessionId = String(allSessions[0].sessionId || allSessions[0]._id);
//         console.log("Auto-selecting first session:", firstSessionId);
//       }
//       handleSessionSelect(firstSessionId);
//     }
//   }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

//   // ── Map: clear helpers ─────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;

//     polylines.current.forEach((l) => {
//       if (mapInstance.current) mapInstance.current.removeLayer(l);
//     });
//     markers.current.forEach((m) => {
//       if (mapInstance.current) mapInstance.current.removeLayer(m);
//     });

//     polylines.current = [];
//     markers.current = [];
//   };

//   // ── Map: draw session ──────────────────────────────────────────────────────
//   const drawMapWithSession = useCallback((session, showPhotos) => {
//     if (!mapInstance.current) {
//       console.log("Map not initialized");
//       return;
//     }

//     if (!session?.locations || session.locations.length === 0) {
//       console.log("No locations to draw");
//       return;
//     }

//     console.log("Drawing session on map:", session.sessionId, "Locations:", session.locations.length);
//     clearMap();

//     const allLocations = session.locations || [];
//     const validLocations = getValidLocations(allLocations);

//     if (validLocations.length === 0) {
//       console.log("No valid locations to draw");
//       return;
//     }

//     console.log("Valid locations:", validLocations.length);

//     // Draw polyline segments
//     for (let i = 0; i < validLocations.length - 1; i++) {
//       const currentLoc = validLocations[i];
//       const nextLoc = validLocations[i + 1];

//       const startPoint = [getLat(currentLoc), getLng(currentLoc)];
//       const endPoint = [getLat(nextLoc), getLng(nextLoc)];

//       const isOnline = currentLoc.isOnline === true;
//       const lineColor = isOnline ? "#3553ea" : "#ef4444";

//       const segmentLine = L.polyline([startPoint, endPoint], {
//         color: lineColor,
//         weight: 3,
//         opacity: 0.8,
//         lineJoin: 'round',
//         lineCap: 'round'
//       }).addTo(mapInstance.current);

//       polylines.current.push(segmentLine);
//     }

//     // Get start and end points
//     const startLocation = validLocations[0];
//     const endLocation = validLocations[validLocations.length - 1];

//     // Check for start and end points with photos in ALL locations
//     const allStartPoints = allLocations.filter(loc => loc.markerType === "start" || loc.id === 1);
//     const allEndPoints = allLocations.filter(loc => loc.markerType === "end");

//     console.log("Start points found:", allStartPoints.length);
//     console.log("End points found:", allEndPoints.length);

//     // START marker
//     let startPointToUse = startLocation;
//     let startHasPhoto = false;
//     let startPhoto = null;

//     if (allStartPoints.length > 0 && hasValidPhoto(allStartPoints[0])) {
//       startPointToUse = allStartPoints[0];
//       startHasPhoto = true;
//       startPhoto = allStartPoints[0].photo;
//       console.log("Using start point with photo");
//     } else if (startLocation && hasValidPhoto(startLocation)) {
//       startHasPhoto = true;
//       startPhoto = startLocation.photo;
//     }

//     if (startPointToUse) {
//       let markerLat = getLat(startPointToUse);
//       let markerLng = getLng(startPointToUse);

//       // If start point has 0,0 coordinates, use first valid location
//       if ((markerLat === 0 && markerLng === 0) && validLocations.length > 0) {
//         markerLat = getLat(validLocations[0]);
//         markerLng = getLng(validLocations[0]);
//         console.log("Start point had 0,0, using first valid location");
//       }

//       if (hasValidCoordinates({ latitude: markerLat, longitude: markerLng })) {
//         const startAddress = getAddress(startPointToUse);
//         const startIsOnline = startPointToUse.isOnline === true;
//         let popupContent = `
//           <div style="min-width: 240px; max-width: 300px;">
//             <div style="background: #22c55e; color: white; padding: 8px 10px; border-radius: 8px; margin-bottom: 10px;">
//               <div style="display: flex; align-items: center; gap: 6px;">
//                 <span style="font-size: 16px;">🚀</span>
//                 <b>START POINT</b>
//                 ${startIsOnline ? '<span style="margin-left: auto;">🟢 Online</span>' : '<span style="margin-left: auto;">🔴 Offline</span>'}
//               </div>
//             </div>
//             <div><b>Time:</b> ${fmtTime(startPointToUse.timestamp)}</div>
//             <div><b>Date:</b> ${fmtDate(startPointToUse.timestamp)}</div>
//             <div><b>Address:</b> ${startAddress}</div>
//         `;

//         if (startHasPhoto && startPhoto) {
//           popupContent += `
//             <div style="margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px;">
//               <b>📸 Photo</b><br/>
//               <img src="${startPhoto}" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 6px; cursor: pointer; margin-top: 5px;" onclick="window.open('${startPhoto}', '_blank')"/>
//             </div>
//           `;
//         }
//         popupContent += `</div>`;

//         const startM = L.marker(
//           [markerLat, markerLng],
//           { icon: makeStartIcon("#22c55e", fmtTime(startPointToUse.timestamp), startHasPhoto, 32), zIndexOffset: 1000 }
//         ).bindPopup(popupContent).addTo(mapInstance.current);
//         markers.current.push(startM);
//         console.log("Start marker added at:", markerLat, markerLng);
//       }
//     }

//     // END marker
//     let endPointToUse = endLocation;
//     let endHasPhoto = false;
//     let endPhoto = null;

//     if (allEndPoints.length > 0 && hasValidPhoto(allEndPoints[0])) {
//       endPointToUse = allEndPoints[0];
//       endHasPhoto = true;
//       endPhoto = allEndPoints[0].photo;
//       console.log("Using end point with photo");
//     } else if (endLocation && hasValidPhoto(endLocation)) {
//       endHasPhoto = true;
//       endPhoto = endLocation.photo;
//     }

//     if (endPointToUse) {
//       let markerLat = getLat(endPointToUse);
//       let markerLng = getLng(endPointToUse);

//       // If end point has 0,0 coordinates, use last valid location
//       if ((markerLat === 0 && markerLng === 0) && validLocations.length > 0) {
//         markerLat = getLat(validLocations[validLocations.length - 1]);
//         markerLng = getLng(validLocations[validLocations.length - 1]);
//         console.log("End point had 0,0, using last valid location");
//       }

//       if (hasValidCoordinates({ latitude: markerLat, longitude: markerLng })) {
//         const endAddress = getAddress(endPointToUse);
//         const endIsOnline = endPointToUse.isOnline === true;
//         let popupContent = `
//           <div style="min-width: 240px; max-width: 300px;">
//             <div style="background: #ef4444; color: white; padding: 8px 10px; border-radius: 8px; margin-bottom: 10px;">
//               <div style="display: flex; align-items: center; gap: 6px;">
//                 <span style="font-size: 16px;">🏁</span>
//                 <b>END POINT</b>
//                 ${endIsOnline ? '<span style="margin-left: auto;">🟢 Online</span>' : '<span style="margin-left: auto;">🔴 Offline</span>'}
//               </div>
//             </div>
//             <div><b>Time:</b> ${fmtTime(endPointToUse.timestamp)}</div>
//             <div><b>Date:</b> ${fmtDate(endPointToUse.timestamp)}</div>
//             <div><b>Address:</b> ${endAddress}</div>
//         `;

//         if (endHasPhoto && endPhoto) {
//           popupContent += `
//             <div style="margin-top: 8px; border-top: 1px solid #ddd; padding-top: 8px;">
//               <b>📸 Photo</b><br/>
//               <img src="${endPhoto}" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 6px; cursor: pointer; margin-top: 5px;" onclick="window.open('${endPhoto}', '_blank')"/>
//             </div>
//           `;
//         }
//         popupContent += `</div>`;

//         const endM = L.marker(
//           [markerLat, markerLng],
//           { icon: makeEndIcon("#ef4444", fmtTime(endPointToUse.timestamp), endHasPhoto, 32), zIndexOffset: 1000 }
//         ).bindPopup(popupContent).addTo(mapInstance.current);
//         markers.current.push(endM);
//         console.log("End marker added at:", markerLat, markerLng);
//       }
//     }

//     // Additional photo markers
//     if (showPhotos) {
//       const photoLocations = allLocations.filter(loc => {
//         const hasPhoto = hasValidPhoto(loc);
//         const isStart = loc.markerType === "start" || loc.id === 1;
//         const isEnd = loc.markerType === "end";
//         return hasPhoto && !isStart && !isEnd;
//       });

//       console.log("Additional photo locations:", photoLocations.length);

//       const firstValidLocation = validLocations.find(l => hasValidCoordinates(l));
//       const defaultPosition = firstValidLocation
//         ? { lat: getLat(firstValidLocation), lng: getLng(firstValidLocation) }
//         : { lat: 16.703, lng: 74.251 };

//       photoLocations.forEach((photoLoc, idx) => {
//         let markerLat = getLat(photoLoc);
//         let markerLng = getLng(photoLoc);

//         if (!hasValidCoordinates(photoLoc) || (markerLat === 0 && markerLng === 0)) {
//           markerLat = defaultPosition.lat;
//           markerLng = defaultPosition.lng;
//         }

//         const popupContent = `
//           <div style="min-width: 240px; max-width: 300px;">
//             <div style="background: #FF9800; color: white; padding: 8px 10px; border-radius: 8px; margin-bottom: 10px;">
//               <b>📸 PHOTO ${idx + 1}</b>
//             </div>
//             <div><b>Time:</b> ${fmtTime(photoLoc.timestamp)}</div>
//             <div><b>Date:</b> ${fmtDate(photoLoc.timestamp)}</div>
//             <div><b>Address:</b> ${getAddress(photoLoc)}</div>
//             <div style="margin-top: 8px;">
//               <img src="${photoLoc.photo}" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 6px; cursor: pointer;" onclick="window.open('${photoLoc.photo}', '_blank')"/>
//             </div>
//           </div>
//         `;

//         const photoMarker = L.marker([markerLat, markerLng], {
//           icon: makePhotoIcon(photoLoc.photo, fmtTime(photoLoc.timestamp), 32),
//           zIndexOffset: 950
//         }).bindPopup(popupContent).addTo(mapInstance.current);
//         markers.current.push(photoMarker);
//       });
//     }

//     // Fit bounds
//     if (validLocations.length > 0) {
//       const bounds = L.latLngBounds(validLocations.map(l => [getLat(l), getLng(l)]));
//       mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//       console.log("Map bounds set");
//     }
//   }, []);

//   // ── Initialize Map once ─────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!mapRef.current || isMapInitialized) return;

//     const map = L.map(mapRef.current, {
//       zoomControl: true,
//       center: [16.703, 74.251],
//       zoom: 13
//     });

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: '&copy; OpenStreetMap',
//       maxZoom: 19,
//     }).addTo(map);

//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     console.log("Map initialized");

//     // Draw if we already have a selected session
//     if (selectedSession && selectedSession.locations) {
//       setTimeout(() => {
//         drawMapWithSession(selectedSession, showPhotoMarkers);
//       }, 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // ── Draw session when selectedSession changes ────────────────────────────
//   useEffect(() => {
//     if (mapInstance.current && selectedSession?.locations && selectedSession.locations.length > 0) {
//       console.log("Redrawing session on map due to selectedSession change");
//       setTimeout(() => {
//         drawMapWithSession(selectedSession, showPhotoMarkers);
//       }, 100);
//     }
//   }, [selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // ── Window resize ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) {
//         setTimeout(() => mapInstance.current.invalidateSize(), 100);
//       }
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // ── Cleanup ────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) {
//         mapInstance.current.remove();
//         mapInstance.current = null;
//       }
//     };
//   }, []);

//   // Count total photo points
//   const getPhotoCount = (session) => {
//     if (!session?.locations) return 0;
//     return session.locations.filter(loc => hasValidPhoto(loc)).length;
//   };

//   // ─── Session List Component ─────────────────────────────────────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//       <Box sx={{ p: 1.5 }}>
//         <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.75rem", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
//           <PinDropIcon sx={{ fontSize: 16, color: "#2196F3" }} />
//           Sessions ({allSessions.length})
//         </Typography>
//         <Stack spacing={1.5}>
//           {allSessions.map((session, index) => {
//             const sessionId = String(session.sessionId || session._id);
//             const isSelected = String(selectedSessionId) === sessionId;
//             const isLoading = isSelected && sessionDetailsLoading && !selectedSession;
//             const photoCount = getPhotoCount(session);
//             const sessionDist = session.totalDistance || session.stats?.totalDistance || 0;
//             const sessionDur = session.stats?.duration || session.duration || 0;
//             const sessionStartTime = session.locations?.[0]?.timestamp || session.startTime;
//             const sessionEndTime = session.locations?.[session.locations.length - 1]?.timestamp || session.endTime;
//  console.log("sessionDur",totalDuration);
 
//             return (
//               <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                 <Card
//                   onClick={() => handleSessionSelect(sessionId)}
//                   sx={{
//                     cursor: "pointer",
//                     border: isSelected ? `2px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                     bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//                     transition: "all 0.2s ease",
//                     "&:hover": {
//                       borderColor: "#2196F3",
//                       bgcolor: alpha("#2196F3", 0.02),
//                       transform: "translateY(-2px)",
//                       boxShadow: 2
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 1.5 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                       <Box sx={{
//                         width: 32, height: 32, borderRadius: "50%",
//                         bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1),
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         color: isSelected ? "white" : "#2196F3", fontSize: "0.75rem", fontWeight: "bold",
//                       }}>
//                         {isLoading ? <CircularProgress size={18} /> : index + 1}
//                       </Box>
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
//                           Session #{index + 1}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <ScheduleIcon sx={{ fontSize: 10 }} />
//                           {fmtDateTime(session.startTime)}
//                         </Typography>
//                       </Box>
//                       {photoCount > 0 && (
//                         <Chip icon={<PhotoIcon sx={{ fontSize: 12 }} />} label={photoCount} size="small"
//                           sx={{ height: 22, fontSize: "0.6rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }} />
//                       )}
//                     </Box>

//                     <Grid container spacing={1} sx={{ mb: 1 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
//                           <TimerIcon sx={{ fontSize: 14, color: "#FF9800" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Duration</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem" }}>{fmtDuration(totalDuration)}</Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
//                           <StraightenIcon sx={{ fontSize: 14, color: "#2196F3" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Distance</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem" }}>{fmtDist(totalDistance)}</Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     <Divider sx={{ my: 1 }} />
//                     <Grid container spacing={1}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <StartIcon sx={{ fontSize: 12, color: "#22c55e" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Start </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem" }}>{fmtTime(sessionStartTime)} </Typography>
//                             {/* <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>{fmtDate(sessionStartTime)}</Typography> */}
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>End </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem" }}>{fmtTime(sessionEndTime)} </Typography>
//                             {/* <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>{fmtDate(sessionEndTime)}</Typography> */}
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Zoom>
//             );
//           })}
//         </Stack>
//       </Box>
//     </Paper>
//   );

//   // ─── Render ──────────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
//       <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
//           <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3" }}>
//             <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//           </IconButton>
//           <Typography sx={{ ml: 1, fontSize: { xs: "0.75rem", sm: "0.85rem" }, color: "#2196F3", fontWeight: 600, flex: 1 }}>
//             {summary.formattedDate || "Route Tracking"}
//           </Typography>

//           {/* <IconButton onClick={() => window.location.reload()} sx={{ color: "#2196F3", mr: 0.5 }} size="small">
//             <RefreshIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />
//           </IconButton> */}

//           {!isMobile && selectedSession && (
//             <Chip label={`${getPhotoCount(selectedSession)} Photos`} size="small"
//               icon={<PhotoIcon sx={{ fontSize: 14 }} />}
//               sx={{ height: 24, bgcolor: alpha("#FF9800", 0.1), color: "#FF9800", fontSize: "0.65rem" }} />
//           )}
//           {isMobile && (
//             <Button variant="outlined" size="small" startIcon={<MenuIcon />}
//               onClick={() => setDrawerOpen(true)}
//               sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5, minWidth: 'auto' }}>
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
//         <Grid container sx={{ height: "calc(100vh - 48px)" }}>
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#f0f0f0" }} />

//             {sessionDetailsLoading && selectedSessionId && !selectedSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {selectedSession && hasLocations && (
//               <Paper sx={{
//                 position: "absolute", top: 12, left: 52, p: { xs: 1, sm: 1.5 }, borderRadius: 2,
//                 maxWidth: { xs: 240, sm: 280 }, zIndex: 500,  boxShadow: 2,
//                 backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.95)"
//               }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.7rem", sm: "0.75rem" }, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
//                   <PinDropIcon sx={{ fontSize: 14 }} />
//                   Session #{allSessions.findIndex(s => String(s.sessionId || s._id) === String(selectedSessionId)) + 1}
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//                     <Typography variant="caption">{fmtDuration(totalDuration)}</Typography>
//                   </Box>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//                     <Typography variant="caption">{fmtDist(totalDistance)}</Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ my: 0.5 }} />
//                 <Box sx={{ mt: 0.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                     <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//                     <Typography variant="caption" sx={{ color: "#22c55e" }}>Start: {fmtTime(startTime)}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444" }}>End: {fmtTime(endTime)}</Typography>
//                   </Box>
//                   {/* 
//                   <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem" }}>{fmtTime(sessionEndTime)} </Typography>
//                             <Typography variant="caption" sx={{ fontSize: "0.5rem", color: "text.secondary" }}>{fmtDate(sessionEndTime)}</Typography> */}
//                 </Box>
//               </Paper>
//             )}
//           </Grid>

//           {!isMobile && (
//             <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}>
//               {renderSessionList()}
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {isMobile && (
//         <>
//           <Fab color="primary" sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }}
//             onClick={() => setDrawerOpen(true)}><MenuIcon /></Fab>
//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
//             PaperProps={{ sx: { width: "85%", maxWidth: 320, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 } }}>
//             <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="subtitle1" fontWeight={600}>Sessions</Typography>
//               <IconButton onClick={() => setDrawerOpen(false)} size="small"><CloseIcon /></IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 60px)", overflow: "auto" }}>{renderSessionList()}</Box>
//           </Drawer>
//         </>
//       )}
//     </Box>
//   );
// };

// export default Locations;


// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   IconButton,
//   Chip,
//   alpha,
//   AppBar,
//   Toolbar,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
//   Drawer,
//   Fab,
//   Button,
//   Stack,
//   CircularProgress,
//   Zoom,
//   Divider,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   Close as CloseIcon,
//   Menu as MenuIcon,
//   Photo as PhotoIcon,
//   Timer as TimerIcon,
//   Straighten as StraightenIcon,
//   Flag as FlagIcon,
//   Start as StartIcon,
//   PinDrop as PinDropIcon,
//   Schedule as ScheduleIcon,
// } from "@mui/icons-material";
// import { getSessionDetails, getUserAvailableDates } from "../redux/slices/userSlice";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // ─── Pure Helpers ─────────────────────────────────────────────────────────────
// const calcDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371e3;
//   const φ1 = (lat1 * Math.PI) / 180;
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(Δφ / 2) ** 2 +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// };

// const hasValidCoordinates = (location) => {
//   const lat = location.latitude || location.lat;
//   const lng = location.longitude || location.lng;
//   return (
//     lat !== 0 && lat !== null && lat !== undefined &&
//     lng !== 0 && lng !== null && lng !== undefined &&
//     !isNaN(lat) && !isNaN(lng)
//   );
// };

// const hasValidPhoto = (location) => {
//   return !!(
//     location.photo &&
//     location.photo !== null &&
//     location.photo !== "" &&
//     location.photo !== "null" &&
//     location.photo !== "undefined" &&
//     typeof location.photo === "string" &&
//     (location.photo.startsWith("http://") || location.photo.startsWith("https://"))
//   );
// };

// const getLat = (location) => location?.latitude || location?.lat || 0;
// const getLng = (location) => location?.longitude || location?.lng || 0;

// const getAddress = (location) => {
//   if (location?.address && location.address !== "Unknown Address" && location.address !== "N/A") {
//     return location.address;
//   }
//   return "Address not available";
// };

// const getValidLocations = (locations) => {
//   if (!locations || locations.length === 0) return [];
//   const valid = locations.filter((loc) => hasValidCoordinates(loc));
//   return valid.sort((a, b) => {
//     const tA = a.timestamp || a.time || a.createdAt;
//     const tB = b.timestamp || b.time || b.createdAt;
//     return new Date(tA) - new Date(tB);
//   });
// };

// const calcTotalDistance = (locations) => {
//   const valid = getValidLocations(locations);
//   if (valid.length < 2) return 0;
//   let total = 0;
//   for (let i = 1; i < valid.length; i++) {
//     total += calcDistance(
//       getLat(valid[i - 1]), getLng(valid[i - 1]),
//       getLat(valid[i]), getLng(valid[i])
//     );
//   }
//   return total;
// };

// const fmtTime = (ts) => {
//   if (!ts) return "Active";
//   return new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
// };

// const fmtDate = (ts) => {
//   if (!ts) return "";
//   return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
// };

// const fmtDateTime = (ts) => {
//   if (!ts) return "N/A";
//   return new Date(ts).toLocaleString("en-US", {
//     month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
//   });
// };

// // ✅ Matches TrackingData.jsx formula exactly
// const fmtDist = (meters) => {
//   if (!meters || meters === 0) return "0 km";
//   if (meters < 1000) return `${Math.round(meters)} m`;
//   return `${Math.floor((meters / 1000) * 10) / 10} km`;
// };

// const fmtDuration = (seconds) => {
//   if (!seconds || seconds === 0) return "0 sec";
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;
//   if (hours > 0) return `${hours}h ${minutes}m`;
//   if (minutes > 0) return `${minutes}m ${secs}s`;
//   return `${secs}s`;
// };

// // ─── Marker factories ──────────────────────────────────────────────────────────
// const makeStartIcon = (color, time, hasPhoto = false, size = 32) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 2.8}px;line-height:1">🚀</span>
//         <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">START</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
//         ${time}${hasPhoto ? " 📸" : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });

// const makeEndIcon = (color, time, hasPhoto = false, size = 32) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 2.8}px;line-height:1">🏁</span>
//         <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">END</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
//         ${time}${hasPhoto ? " 📸" : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });

// const makePhotoIcon = (photoUrl, time, size = 32) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#FF9800,#F57C00);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);overflow:hidden;">
//         <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\\'font-size:16px\\'>📸</span>'"/>
//         <span style="position:absolute;bottom:0;right:0;background:#FF9800;border-radius:50%;width:12px;height:12px;display:flex;align-items:center;justify-content:center;font-size:7px;border:1px solid #fff;">📸</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid #FF9800;">
//         ${time}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });

// // ─── Main Component ────────────────────────────────────────────────────────────
// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const {
//     sessions = [],
//     selectedSessionId: initialSelectedSessionId,
//     selectedDate,   // ✅ Received from TrackingData (YYYY-MM-DD string)
//     summary = {},
//     metadata = {},
//   } = location.state || {};

//   const sessionDetails = useSelector((state) => state.user?.sessionDetails);
//   const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);

//   // ── State ──────────────────────────────────────────────────────────────────
//   const [allSessions, setAllSessions] = useState([]);
//   const [selectedSessionId, setSelectedSessionId] = useState(null);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [totalDistance, setTotalDistance] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [hasLocations, setHasLocations] = useState(false);
//   const [showPhotoMarkers, setShowPhotoMarkers] = useState(true);
//   const [isMapInitialized, setIsMapInitialized] = useState(false);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());

//   // ✅ Fetch available dates using the date passed from TrackingData
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;

//     if (userId && dateToUse) {
//       console.log("Fetching available dates for userId:", userId, "date:", dateToUse);
//       dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

//   // ── Init sessions from props ───────────────────────────────────────────────
//   useEffect(() => {
//     if (sessions && sessions.length > 0) {
//       setAllSessions(sessions);
//       sessions.forEach((session) => {
//         if (session.locations && session.locations.length > 0) {
//           const id = String(session.sessionId || session._id);
//           sessionDataCache.current.set(id, session);
//         }
//       });
//     }
//   }, [sessions]);

//   // ── Process session data ───────────────────────────────────────────────────
//   const processSessionData = useCallback(
//     (sessionData) => {
//       if (!sessionData) return;

//       setSelectedSession(sessionData);

//       const allLocations = sessionData.locations || [];
//       const validLocations = getValidLocations(allLocations);

//       if (validLocations.length > 0) {
//         setHasLocations(true);
//         const dist = calcTotalDistance(allLocations);
//         const duration = sessionData.stats?.duration || 0;

//         const firstLoc = allLocations[0];
//         const lastLoc = allLocations[allLocations.length - 1];

//         setStartTime(firstLoc?.timestamp || sessionData.startTime);
//         setEndTime(lastLoc?.timestamp || sessionData.endTime);
//         setTotalDistance(dist);
//         setTotalDuration(duration);

//         if (mapInstance.current) {
//           setTimeout(() => drawMapWithSession(sessionData, showPhotoMarkers), 100);
//         }
//       } else {
//         setHasLocations(false);
//       }
//     },
//     [showPhotoMarkers]
//   );

//   // ── Handle session click ───────────────────────────────────────────────────
//   const handleSessionSelect = useCallback(
//     (sessionId) => {
//       const id = String(sessionId);
//       setSelectedSessionId(id);

//       if (sessionDataCache.current.has(id)) {
//         processSessionData(sessionDataCache.current.get(id));
//         return;
//       }

//       const foundSession = allSessions.find((s) => String(s.sessionId || s._id) === id);

//       if (foundSession?.locations && foundSession.locations.length > 0) {
//         sessionDataCache.current.set(id, foundSession);
//         processSessionData(foundSession);
//       } else if (foundSession && !fetchedSessions.current.has(id)) {
//         const userId = metadata?.userId || metadata?.trackId || foundSession?.userId;
//         if (userId) {
//           fetchedSessions.current.add(id);
//           dispatch(getSessionDetails({ userId, sessionId: id }));
//         } else {
//           setSelectedSession(null);
//           setHasLocations(false);
//         }
//       } else {
//         setSelectedSession(null);
//         setHasLocations(false);
//       }

//       if (isMobile) setDrawerOpen(false);
//     },
//     [selectedSessionId, allSessions, metadata, dispatch, isMobile, processSessionData]
//   );

//   // ── Watch Redux sessionDetails ─────────────────────────────────────────────
//   useEffect(() => {
//     if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
//       const id = String(sessionDetails.sessionId);
//       sessionDataCache.current.set(id, sessionDetails);
//       processSessionData(sessionDetails);
//     }
//   }, [sessionDetails, selectedSessionId, processSessionData]);

//   // ── Auto-select first/initial session ─────────────────────────────────────
//   useEffect(() => {
//     if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
//       const firstId = initialSelectedSessionId
//         ? String(initialSelectedSessionId)
//         : String(allSessions[0].sessionId || allSessions[0]._id);
//       handleSessionSelect(firstId);
//     }
//   }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

//   // ── Map clear ─────────────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;
//     polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
//     markers.current.forEach((m) => mapInstance.current.removeLayer(m));
//     polylines.current = [];
//     markers.current = [];
//   };

//   // ── Map draw ──────────────────────────────────────────────────────────────
//   const drawMapWithSession = useCallback((session, showPhotos) => {
//     if (!mapInstance.current || !session?.locations?.length) return;

//     clearMap();

//     const allLocations = session.locations || [];
//     const validLocations = getValidLocations(allLocations);
//     if (validLocations.length === 0) return;

//     // Polyline segments
//     for (let i = 0; i < validLocations.length - 1; i++) {
//       const line = L.polyline(
//         [[getLat(validLocations[i]), getLng(validLocations[i])],
//          [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])]],
//         {
//           color: validLocations[i].isOnline === true ? "#3553ea" : "#ef4444",
//           weight: 3, opacity: 0.8, lineJoin: "round", lineCap: "round",
//         }
//       ).addTo(mapInstance.current);
//       polylines.current.push(line);
//     }

//     const startLocation = validLocations[0];
//     const endLocation = validLocations[validLocations.length - 1];
//     const allStartPoints = allLocations.filter((l) => l.markerType === "start" || l.id === 1);
//     const allEndPoints = allLocations.filter((l) => l.markerType === "end");

//     // START marker
//     let startPointToUse = startLocation;
//     let startHasPhoto = false;
//     let startPhoto = null;

//     if (allStartPoints.length > 0 && hasValidPhoto(allStartPoints[0])) {
//       startPointToUse = allStartPoints[0];
//       startHasPhoto = true;
//       startPhoto = allStartPoints[0].photo;
//     } else if (startLocation && hasValidPhoto(startLocation)) {
//       startHasPhoto = true;
//       startPhoto = startLocation.photo;
//     }

//     if (startPointToUse) {
//       let lat = getLat(startPointToUse);
//       let lng = getLng(startPointToUse);
//       if ((lat === 0 && lng === 0) && validLocations.length > 0) {
//         lat = getLat(validLocations[0]);
//         lng = getLng(validLocations[0]);
//       }
//       if (hasValidCoordinates({ latitude: lat, longitude: lng })) {
//         let popup = `<div style="min-width:240px;max-width:300px;">
//           <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//             <div style="display:flex;align-items:center;gap:6px;">
//               <span style="font-size:16px">🚀</span><b>START POINT</b>
//               ${startPointToUse.isOnline === true ? '<span style="margin-left:auto">🟢 Online</span>' : '<span style="margin-left:auto">🔴 Offline</span>'}
//             </div>
//           </div>
//           <div><b>Time:</b> ${fmtTime(startPointToUse.timestamp)}</div>
//           <div><b>Date:</b> ${fmtDate(startPointToUse.timestamp)}</div>
//           <div><b>Address:</b> ${getAddress(startPointToUse)}</div>`;
//         if (startHasPhoto && startPhoto) {
//           popup += `<div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//             <b>📸 Photo</b><br/>
//             <img src="${startPhoto}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${startPhoto}','_blank')"/>
//           </div>`;
//         }
//         popup += `</div>`;
//         const m = L.marker([lat, lng], {
//           icon: makeStartIcon("#22c55e", fmtTime(startPointToUse.timestamp), startHasPhoto, 32),
//           zIndexOffset: 1000,
//         }).bindPopup(popup).addTo(mapInstance.current);
//         markers.current.push(m);
//       }
//     }

//     // END marker
//     let endPointToUse = endLocation;
//     let endHasPhoto = false;
//     let endPhoto = null;

//     if (allEndPoints.length > 0 && hasValidPhoto(allEndPoints[0])) {
//       endPointToUse = allEndPoints[0];
//       endHasPhoto = true;
//       endPhoto = allEndPoints[0].photo;
//     } else if (endLocation && hasValidPhoto(endLocation)) {
//       endHasPhoto = true;
//       endPhoto = endLocation.photo;
//     }

//     if (endPointToUse) {
//       let lat = getLat(endPointToUse);
//       let lng = getLng(endPointToUse);
//       if ((lat === 0 && lng === 0) && validLocations.length > 0) {
//         lat = getLat(validLocations[validLocations.length - 1]);
//         lng = getLng(validLocations[validLocations.length - 1]);
//       }
//       if (hasValidCoordinates({ latitude: lat, longitude: lng })) {
//         let popup = `<div style="min-width:240px;max-width:300px;">
//           <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//             <div style="display:flex;align-items:center;gap:6px;">
//               <span style="font-size:16px">🏁</span><b>END POINT</b>
//               ${endPointToUse.isOnline === true ? '<span style="margin-left:auto">🟢 Online</span>' : '<span style="margin-left:auto">🔴 Offline</span>'}
//             </div>
//           </div>
//           <div><b>Time:</b> ${fmtTime(endPointToUse.timestamp)}</div>
//           <div><b>Date:</b> ${fmtDate(endPointToUse.timestamp)}</div>
//           <div><b>Address:</b> ${getAddress(endPointToUse)}</div>`;
//         if (endHasPhoto && endPhoto) {
//           popup += `<div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//             <b>📸 Photo</b><br/>
//             <img src="${endPhoto}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${endPhoto}','_blank')"/>
//           </div>`;
//         }
//         popup += `</div>`;
//         const m = L.marker([lat, lng], {
//           icon: makeEndIcon("#ef4444", fmtTime(endPointToUse.timestamp), endHasPhoto, 32),
//           zIndexOffset: 1000,
//         }).bindPopup(popup).addTo(mapInstance.current);
//         markers.current.push(m);
//       }
//     }

//     // Photo markers
//     if (showPhotos) {
//       const photoLocs = allLocations.filter(
//         (loc) => hasValidPhoto(loc) && loc.markerType !== "start" && loc.id !== 1 && loc.markerType !== "end"
//       );
//       const firstValid = validLocations.find((l) => hasValidCoordinates(l));
//       const defaultPos = firstValid
//         ? { lat: getLat(firstValid), lng: getLng(firstValid) }
//         : { lat: 16.703, lng: 74.251 };

//       photoLocs.forEach((photoLoc, idx) => {
//         let lat = getLat(photoLoc);
//         let lng = getLng(photoLoc);
//         if (!hasValidCoordinates(photoLoc) || (lat === 0 && lng === 0)) {
//           lat = defaultPos.lat;
//           lng = defaultPos.lng;
//         }
//         const popup = `<div style="min-width:240px;max-width:300px;">
//           <div style="background:#FF9800;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//             <b>📸 PHOTO ${idx + 1}</b>
//           </div>
//           <div><b>Time:</b> ${fmtTime(photoLoc.timestamp)}</div>
//           <div><b>Date:</b> ${fmtDate(photoLoc.timestamp)}</div>
//           <div><b>Address:</b> ${getAddress(photoLoc)}</div>
//           <div style="margin-top:8px;">
//             <img src="${photoLoc.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photoLoc.photo}','_blank')"/>
//           </div>
//         </div>`;
//         const m = L.marker([lat, lng], {
//           icon: makePhotoIcon(photoLoc.photo, fmtTime(photoLoc.timestamp), 32),
//           zIndexOffset: 950,
//         }).bindPopup(popup).addTo(mapInstance.current);
//         markers.current.push(m);
//       });
//     }

//     // Fit bounds
//     if (validLocations.length > 0) {
//       const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
//       mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//     }
//   }, []);

//   // ── Initialize Map ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!mapRef.current || isMapInitialized) return;
//     const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap",
//       maxZoom: 19,
//     }).addTo(map);
//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     if (selectedSession?.locations) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // ── Redraw on session change ───────────────────────────────────────────────
//   useEffect(() => {
//     if (mapInstance.current && selectedSession?.locations?.length > 0) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // ── Resize ────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // ── Cleanup ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) {
//         mapInstance.current.remove();
//         mapInstance.current = null;
//       }
//     };
//   }, []);

//   const getPhotoCount = (session) => {
//     if (!session?.locations) return 0;
//     return session.locations.filter((loc) => hasValidPhoto(loc)).length;
//   };

//   // ─── Session List ──────────────────────────────────────────────────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//       <Box sx={{ p: 1.5 }}>
//         <Typography
//           variant="subtitle2"
//           fontWeight={600}
//           sx={{ fontSize: "0.75rem", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}
//         >
//           <PinDropIcon sx={{ fontSize: 16, color: "#2196F3" }} />
//           Sessions ({allSessions.length})
//           {/* ✅ Show the selected date in the sidebar header */}
//           {(selectedDate || metadata?.selectedDate) && (
//             <Chip
//               label={selectedDate || metadata?.selectedDate}
//               size="small"
//               sx={{
//                 ml: "auto",
//                 height: 20,
//                 fontSize: "0.55rem",
//                 bgcolor: alpha("#2196F3", 0.1),
//                 color: "#2196F3",
//               }}
//             />
//           )}
//         </Typography>

//         <Stack spacing={1.5}>
//           {allSessions.map((session, index) => {
//             const sessionId = String(session.sessionId || session._id);
//             const isSelected = String(selectedSessionId) === sessionId;
//             const isLoading = isSelected && sessionDetailsLoading && !selectedSession;
//             const photoCount = getPhotoCount(session);
//             const sessionStartTime = session.locations?.[0]?.timestamp || session.startTime;
//             const sessionEndTime =
//               session.locations?.[session.locations.length - 1]?.timestamp || session.endTime;

//             return (
//               <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                 <Card
//                   onClick={() => handleSessionSelect(sessionId)}
//                   sx={{
//                     cursor: "pointer",
//                     border: isSelected ? `2px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                     bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//                     transition: "all 0.2s ease",
//                     "&:hover": {
//                       borderColor: "#2196F3",
//                       bgcolor: alpha("#2196F3", 0.02),
//                       transform: "translateY(-2px)",
//                       boxShadow: 2,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 1.5 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                       <Box
//                         sx={{
//                           width: 32, height: 32, borderRadius: "50%",
//                           bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1),
//                           display: "flex", alignItems: "center", justifyContent: "center",
//                           color: isSelected ? "white" : "#2196F3",
//                           fontSize: "0.75rem", fontWeight: "bold",
//                         }}
//                       >
//                         {isLoading ? <CircularProgress size={18} /> : index + 1}
//                       </Box>
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
//                           Session #{index + 1}
//                         </Typography>
//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                           sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5 }}
//                         >
//                           <ScheduleIcon sx={{ fontSize: 10 }} />
//                           {fmtDateTime(session.startTime)}
//                         </Typography>
//                       </Box>
//                       {photoCount > 0 && (
//                         <Chip
//                           icon={<PhotoIcon sx={{ fontSize: 12 }} />}
//                           label={photoCount}
//                           size="small"
//                           sx={{ height: 22, fontSize: "0.6rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }}
//                         />
//                       )}
//                     </Box>

//                     <Grid container spacing={1} sx={{ mb: 1 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
//                           <TimerIcon sx={{ fontSize: 14, color: "#FF9800" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               Duration
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>
//                               {/* ✅ Use per-session duration from session data, not shared totalDuration */}
//                               {fmtDuration(
//                                 isSelected
//                                   ? totalDuration
//                                   : session.stats?.duration || session.duration || 0
//                               )}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
//                           <StraightenIcon sx={{ fontSize: 14, color: "#2196F3" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               Distance
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>
//                               {/* ✅ Use per-session distance from session data, not shared totalDistance */}
//                               {isSelected
//                                 ? fmtDist(totalDistance)
//                                 : fmtDist(session.totalDistance || session.stats?.totalDistance || 0)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     <Divider sx={{ my: 1 }} />

//                     <Grid container spacing={1}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <StartIcon sx={{ fontSize: 12, color: "#22c55e" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               Start
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>
//                               {fmtTime(sessionStartTime)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               End
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>
//                               {fmtTime(sessionEndTime)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Zoom>
//             );
//           })}
//         </Stack>
//       </Box>
//     </Paper>
//   );

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
//       <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
//           <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3" }}>
//             <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//           </IconButton>
//           <Box sx={{ flex: 1, ml: 1 }}>
//             <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, color: "#2196F3", fontWeight: 600 }}>
//               {summary.formattedDate || "Route Tracking"}
//             </Typography>
//             {/* ✅ Show selected date in AppBar */}
//             {(selectedDate || metadata?.selectedDate) && (
//               <Typography sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
//                 Date: {selectedDate || metadata?.selectedDate}
//               </Typography>
//             )}
//           </Box>

//           {!isMobile && selectedSession && (
//             <Chip
//               label={`${getPhotoCount(selectedSession)} Photos`}
//               size="small"
//               icon={<PhotoIcon sx={{ fontSize: 14 }} />}
//               sx={{ height: 24, bgcolor: alpha("#FF9800", 0.1), color: "#FF9800", fontSize: "0.65rem" }}
//             />
//           )}
//           {isMobile && (
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<MenuIcon />}
//               onClick={() => setDrawerOpen(true)}
//               sx={{
//                 fontSize: "0.6rem",
//                 borderColor: alpha("#2196F3", 0.3),
//                 color: "#2196F3",
//                 py: 0.5,
//                 minWidth: "auto",
//               }}
//             >
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
//         <Grid container sx={{ height: "calc(100vh - 48px)" }}>
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div
//               ref={mapRef}
//               style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#f0f0f0" }}
//             />

//             {sessionDetailsLoading && selectedSessionId && !selectedSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {selectedSession && hasLocations && (
//               <Paper
//                 sx={{
//                   position: "absolute", top: 12, left: 52,
//                   p: { xs: 1, sm: 1.5 }, borderRadius: 2,
//                   maxWidth: { xs: 240, sm: 280 }, zIndex: 500, boxShadow: 2,
//                   backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.95)",
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={600}
//                   sx={{ color: "#2196F3", fontSize: { xs: "0.7rem", sm: "0.75rem" }, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
//                 >
//                   <PinDropIcon sx={{ fontSize: 14 }} />
//                   Session #{allSessions.findIndex((s) => String(s.sessionId || s._id) === String(selectedSessionId)) + 1}
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//                     <Typography variant="caption">{fmtDuration(totalDuration)}</Typography>
//                   </Box>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//                     <Typography variant="caption">{fmtDist(totalDistance)}</Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ my: 0.5 }} />
//                 <Box sx={{ mt: 0.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                     <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//                     <Typography variant="caption" sx={{ color: "#22c55e" }}>
//                       Start: {fmtTime(startTime)}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444" }}>
//                       End: {fmtTime(endTime)}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}
//           </Grid>

//           {!isMobile && (
//             <Grid
//               item md={4}
//               sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}
//             >
//               {renderSessionList()}
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {isMobile && (
//         <>
//           <Fab
//             color="primary"
//             sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }}
//             onClick={() => setDrawerOpen(true)}
//           >
//             <MenuIcon />
//           </Fab>
//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ sx: { width: "85%", maxWidth: 320, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 } }}
//           >
//             <Box
//               sx={{
//                 p: 1.5,
//                 borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                 display: "flex", justifyContent: "space-between", alignItems: "center",
//               }}
//             >
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600}>Sessions</Typography>
//                 {/* ✅ Show date in drawer header too */}
//                 {(selectedDate || metadata?.selectedDate) && (
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                     {selectedDate || metadata?.selectedDate}
//                   </Typography>
//                 )}
//               </Box>
//               <IconButton onClick={() => setDrawerOpen(false)} size="small">
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 60px)", overflow: "auto" }}>
//               {renderSessionList()}
//             </Box>
//           </Drawer>
//         </>
//       )}
//     </Box>
//   );
// };

// export default Locations;

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   IconButton,
//   Chip,
//   alpha,
//   AppBar,
//   Toolbar,
//   Grid,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
//   Drawer,
//   Fab,
//   Button,
//   Stack,
//   CircularProgress,
//   Zoom,
//   Divider,
// } from "@mui/material";
// import {
//   ArrowBack as ArrowBackIcon,
//   Close as CloseIcon,
//   Menu as MenuIcon,
//   Photo as PhotoIcon,
//   Timer as TimerIcon,
//   Straighten as StraightenIcon,
//   Flag as FlagIcon,
//   Start as StartIcon,
//   PinDrop as PinDropIcon,
//   Schedule as ScheduleIcon,
// } from "@mui/icons-material";
// import { getSessionDetails, getUserAvailableDates } from "../redux/slices/userSlice";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Fix Leaflet icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// // ─── Pure Helpers ─────────────────────────────────────────────────────────────
// const calcDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371e3;
//   const φ1 = (lat1 * Math.PI) / 180;
//   const φ2 = (lat2 * Math.PI) / 180;
//   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//   const Δλ = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(Δφ / 2) ** 2 +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// };

// const hasValidCoordinates = (location) => {
//   const lat = location.latitude || location.lat;
//   const lng = location.longitude || location.lng;
//   return (
//     lat !== 0 && lat !== null && lat !== undefined &&
//     lng !== 0 && lng !== null && lng !== undefined &&
//     !isNaN(lat) && !isNaN(lng)
//   );
// };

// const hasValidPhoto = (location) => {
//   return !!(
//     location.photo &&
//     location.photo !== null &&
//     location.photo !== "" &&
//     location.photo !== "null" &&
//     location.photo !== "undefined" &&
//     typeof location.photo === "string" &&
//     (location.photo.startsWith("http://") || location.photo.startsWith("https://"))
//   );
// };

// const getLat = (location) => location?.latitude || location?.lat || 0;
// const getLng = (location) => location?.longitude || location?.lng || 0;

// const getAddress = (location) => {
//   if (location?.address && location.address !== "Unknown Address" && location.address !== "N/A") {
//     return location.address;
//   }
//   return "Address not available";
// };

// const getValidLocations = (locations) => {
//   if (!locations || locations.length === 0) return [];
//   const valid = locations.filter((loc) => hasValidCoordinates(loc));
//   return valid.sort((a, b) => {
//     const tA = a.timestamp || a.time || a.createdAt;
//     const tB = b.timestamp || b.time || b.createdAt;
//     return new Date(tA) - new Date(tB);
//   });
// };

// const calcTotalDistance = (locations) => {
//   const valid = getValidLocations(locations);
//   if (valid.length < 2) return 0;
//   let total = 0;
//   for (let i = 1; i < valid.length; i++) {
//     total += calcDistance(
//       getLat(valid[i - 1]), getLng(valid[i - 1]),
//       getLat(valid[i]), getLng(valid[i])
//     );
//   }
//   return total;
// };

// const fmtTime = (ts) => {
//   if (!ts) return "Active";
//   return new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
// };

// const fmtDate = (ts) => {
//   if (!ts) return "";
//   return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
// };

// const fmtDateTime = (ts) => {
//   if (!ts) return "N/A";
//   return new Date(ts).toLocaleString("en-US", {
//     month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
//   });
// };

// // ✅ Matches TrackingData.jsx formula exactly
// const fmtDist = (meters) => {
//   if (!meters || meters === 0) return "0 km";
//   if (meters < 1000) return `${Math.round(meters)} m`;
//   return `${Math.floor((meters / 1000) * 10) / 10} km`;
// };

// const fmtDuration = (seconds) => {
//   if (!seconds || seconds === 0) return "0 sec";
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const secs = seconds % 60;
//   if (hours > 0) return `${hours}h ${minutes}m`;
//   if (minutes > 0) return `${minutes}m ${secs}s`;
//   return `${secs}s`;
// };

// // ─── Marker factories ──────────────────────────────────────────────────────────
// const makeStartIcon = (color, time, hasPhoto = false, size = 32) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 2.8}px;line-height:1">🚀</span>
//         <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">START</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
//         ${time}${hasPhoto ? " 📸" : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });

// const makeEndIcon = (color, time, hasPhoto = false, size = 32) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
//         <span style="font-size:${size / 2.8}px;line-height:1">🏁</span>
//         <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">END</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
//         ${time}${hasPhoto ? " 📸" : ""}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });

// const makePhotoIcon = (photoUrl, time, size = 32) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#FF9800,#F57C00);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);overflow:hidden;">
//         <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\\'font-size:16px\\'>📸</span>'"/>
//         <span style="position:absolute;bottom:0;right:0;background:#FF9800;border-radius:50%;width:12px;height:12px;display:flex;align-items:center;justify-content:center;font-size:7px;border:1px solid #fff;">📸</span>
//       </div>
//       <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid #FF9800;">
//         ${time}
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 20],
//     iconAnchor: [size / 2, size + 10],
//   });

// // ─── Main Component ────────────────────────────────────────────────────────────
// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const {
//     sessions = [],
//     selectedSessionId: initialSelectedSessionId,
//     selectedDate,   // ✅ Received from TrackingData (YYYY-MM-DD string)
//     summary = {},
//     metadata = {},
//   } = location.state || {};

//   const sessionDetails = useSelector((state) => state.user?.sessionDetails);
//   const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);

//   // ── State ──────────────────────────────────────────────────────────────────
//   const [allSessions, setAllSessions] = useState([]);
//   const [selectedSessionId, setSelectedSessionId] = useState(null);
//   const [selectedSession, setSelectedSession] = useState(null);
//   const [totalDistance, setTotalDistance] = useState(0);
//   const [totalDuration, setTotalDuration] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [hasLocations, setHasLocations] = useState(false);
//   const [showPhotoMarkers, setShowPhotoMarkers] = useState(true);
//   const [isMapInitialized, setIsMapInitialized] = useState(false);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());

//   // ✅ Fetch available dates using the date passed from TrackingData
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;

//     if (userId && dateToUse) {
//       // console.log("Fetching available dates for userId:", userId, "date:", dateToUse);
//       dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

//   // ── Init sessions from props ───────────────────────────────────────────────
//   useEffect(() => {
//     if (sessions && sessions.length > 0) {
//       setAllSessions(sessions);
//       sessions.forEach((session) => {
//         if (session.locations && session.locations.length > 0) {
//           const id = String(session.sessionId || session._id);
//           sessionDataCache.current.set(id, session);
//         }
//       });
//     }
//   }, [sessions]);

//   // ── Process session data ───────────────────────────────────────────────────
//   const processSessionData = useCallback(
//     (sessionData) => {
//       if (!sessionData) return;

//       setSelectedSession(sessionData);
//   console.log("Session Data",sessionData);

//       const allLocations = sessionData.locations || [];
//       const validLocations = getValidLocations(allLocations);

//       if (validLocations.length > 0) {
//         setHasLocations(true);
//         const dist = calcTotalDistance(allLocations);
//         const duration = sessionData.stats?.duration || 0;

//         const firstLoc = allLocations[0];
//         const lastLoc = allLocations[allLocations.length - 1];

//         setStartTime(firstLoc?.timestamp || sessionData.startTime);
//         setEndTime(lastLoc?.timestamp || sessionData.endTime);
//         setTotalDistance(dist);
//         setTotalDuration(duration);

//         if (mapInstance.current) {
//           setTimeout(() => drawMapWithSession(sessionData, showPhotoMarkers), 100);
//         }
//       } else {
//         setHasLocations(false);
//       }
//     },
//     [showPhotoMarkers]
//   );

  
//   // ── Handle session click ───────────────────────────────────────────────────
//   const handleSessionSelect = useCallback(
//     (sessionId) => {
//       const id = String(sessionId);
//       setSelectedSessionId(id);

//       if (sessionDataCache.current.has(id)) {
//         processSessionData(sessionDataCache.current.get(id));
//         return;
//       }

//       const foundSession = allSessions.find((s) => String(s.sessionId || s._id) === id);

//       if (foundSession?.locations && foundSession.locations.length > 0) {
//         sessionDataCache.current.set(id, foundSession);
//         processSessionData(foundSession);
//       } else if (foundSession && !fetchedSessions.current.has(id)) {
//         const userId = metadata?.userId || metadata?.trackId || foundSession?.userId;
//         if (userId) {
//           fetchedSessions.current.add(id);
//           dispatch(getSessionDetails({ userId, sessionId: id }));
//         } else {
//           setSelectedSession(null);
//           setHasLocations(false);
//         }
//       } else {
//         setSelectedSession(null);
//         setHasLocations(false);
//       }

//       if (isMobile) setDrawerOpen(false);
//     },
//     [selectedSessionId, allSessions, metadata, dispatch, isMobile, processSessionData]
//   );

//   // ── Watch Redux sessionDetails ─────────────────────────────────────────────
//   useEffect(() => {
//     if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
//       const id = String(sessionDetails.sessionId);
//       sessionDataCache.current.set(id, sessionDetails);
//       processSessionData(sessionDetails);
//     }
//   }, [sessionDetails, selectedSessionId, processSessionData]);

//   // ── Auto-select first/initial session ─────────────────────────────────────
//   useEffect(() => {
//     if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
//       const firstId = initialSelectedSessionId
//         ? String(initialSelectedSessionId)
//         : String(allSessions[0].sessionId || allSessions[0]._id);
//       handleSessionSelect(firstId);
//     }
//   }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

//   // ── Map clear ─────────────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;
//     polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
//     markers.current.forEach((m) => mapInstance.current.removeLayer(m));
//     polylines.current = [];
//     markers.current = [];
//   };

//   // ── Map draw ──────────────────────────────────────────────────────────────
//   const drawMapWithSession = useCallback((session, showPhotos) => {
//     if (!mapInstance.current || !session?.locations?.length) return;

//     clearMap();

//     const allLocations = session.locations || [];
//     const validLocations = getValidLocations(allLocations);
//     if (validLocations.length === 0) return;

//     // Polyline segments
//     for (let i = 0; i < validLocations.length - 1; i++) {
//       const line = L.polyline(
//         [[getLat(validLocations[i]), getLng(validLocations[i])],
//          [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])]],
//         {
//           color: validLocations[i].isOnline === true ? "#3553ea" : "#ef4444",
//           weight: 3, opacity: 0.8, lineJoin: "round", lineCap: "round",
//         }
//       ).addTo(mapInstance.current);
//       polylines.current.push(line);
//     }

//     const startLocation = validLocations[0];
//     const endLocation = validLocations[validLocations.length - 1];
//     const allStartPoints = allLocations.filter((l) => l.markerType === "start" || l.id === 1);
//     const allEndPoints = allLocations.filter((l) => l.markerType === "end");

//     // START marker
//     let startPointToUse = startLocation;
//     let startHasPhoto = false;
//     let startPhoto = null;

//     if (allStartPoints.length > 0 && hasValidPhoto(allStartPoints[0])) {
//       startPointToUse = allStartPoints[0];
//       startHasPhoto = true;
//       startPhoto = allStartPoints[0].photo;
//     } else if (startLocation && hasValidPhoto(startLocation)) {
//       startHasPhoto = true;
//       startPhoto = startLocation.photo;
//     }

//     if (startPointToUse) {
//       let lat = getLat(startPointToUse);
//       let lng = getLng(startPointToUse);
//       if ((lat === 0 && lng === 0) && validLocations.length > 0) {
//         lat = getLat(validLocations[0]);
//         lng = getLng(validLocations[0]);
//       }
//       if (hasValidCoordinates({ latitude: lat, longitude: lng })) {
//         let popup = `<div style="min-width:240px;max-width:300px;">
//           <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//             <div style="display:flex;align-items:center;gap:6px;">
//               <span style="font-size:16px">🚀</span><b>START POINT</b>
//               ${startPointToUse.isOnline === true ? '<span style="margin-left:auto">🟢 Online</span>' : '<span style="margin-left:auto">🔴 Offline</span>'}
//             </div>
//           </div>
//           <div><b>Time:</b> ${fmtTime(startPointToUse.timestamp)}</div>
//           <div><b>Date:</b> ${fmtDate(startPointToUse.timestamp)}</div>
//           <div><b>Address:</b> ${getAddress(startPointToUse)}</div>`;
//         if (startHasPhoto && startPhoto) {
//           popup += `<div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//             <b>📸 Photo</b><br/>
//             <img src="${startPhoto}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${startPhoto}','_blank')"/>
//           </div>`;
//         }
//         popup += `</div>`;
//         const m = L.marker([lat, lng], {
//           icon: makeStartIcon("#22c55e", fmtTime(startPointToUse.timestamp), startHasPhoto, 32),
//           zIndexOffset: 1000,
//         }).bindPopup(popup).addTo(mapInstance.current);
//         markers.current.push(m);
//       }
//     }

//     // END marker
//     let endPointToUse = endLocation;
//     let endHasPhoto = false;
//     let endPhoto = null;

//     if (allEndPoints.length > 0 && hasValidPhoto(allEndPoints[0])) {
//       endPointToUse = allEndPoints[0];
//       endHasPhoto = true;
//       endPhoto = allEndPoints[0].photo;
//     } else if (endLocation && hasValidPhoto(endLocation)) {
//       endHasPhoto = true;
//       endPhoto = endLocation.photo;
//     }

//     if (endPointToUse) {
//       let lat = getLat(endPointToUse);
//       let lng = getLng(endPointToUse);
//       if ((lat === 0 && lng === 0) && validLocations.length > 0) {
//         lat = getLat(validLocations[validLocations.length - 1]);
//         lng = getLng(validLocations[validLocations.length - 1]);
//       }
//       if (hasValidCoordinates({ latitude: lat, longitude: lng })) {
//         let popup = `<div style="min-width:240px;max-width:300px;">
//           <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//             <div style="display:flex;align-items:center;gap:6px;">
//               <span style="font-size:16px">🏁</span><b>END POINT</b>
//               ${endPointToUse.isOnline === true ? '<span style="margin-left:auto">🟢 Online</span>' : '<span style="margin-left:auto">🔴 Offline</span>'}
//             </div>
//           </div>
//           <div><b>Time:</b> ${fmtTime(endPointToUse.timestamp)}</div>
//           <div><b>Date:</b> ${fmtDate(endPointToUse.timestamp)}</div>
//           <div><b>Address:</b> ${getAddress(endPointToUse)}</div>`;
//         if (endHasPhoto && endPhoto) {
//           popup += `<div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//             <b>📸 Photo</b><br/>
//             <img src="${endPhoto}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${endPhoto}','_blank')"/>
//           </div>`;
//         }
//         popup += `</div>`;
//         const m = L.marker([lat, lng], {
//           icon: makeEndIcon("#ef4444", fmtTime(endPointToUse.timestamp), endHasPhoto, 32),
//           zIndexOffset: 1000,
//         }).bindPopup(popup).addTo(mapInstance.current);
//         markers.current.push(m);
//       }
//     }

//     // Photo markers
//     if (showPhotos) {
//       const photoLocs = allLocations.filter(
//         (loc) => hasValidPhoto(loc) && loc.markerType !== "start" && loc.id !== 1 && loc.markerType !== "end"
//       );
//       const firstValid = validLocations.find((l) => hasValidCoordinates(l));
//       const defaultPos = firstValid
//         ? { lat: getLat(firstValid), lng: getLng(firstValid) }
//         : { lat: 16.703, lng: 74.251 };

//       photoLocs.forEach((photoLoc, idx) => {
//         let lat = getLat(photoLoc);
//         let lng = getLng(photoLoc);
//         if (!hasValidCoordinates(photoLoc) || (lat === 0 && lng === 0)) {
//           lat = defaultPos.lat;
//           lng = defaultPos.lng;
//         }
//         const popup = `<div style="min-width:240px;max-width:300px;">
//           <div style="background:#FF9800;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//             <b>📸 PHOTO ${idx + 1}</b>
//           </div>
//           <div><b>Time:</b> ${fmtTime(photoLoc.timestamp)}</div>
//           <div><b>Date:</b> ${fmtDate(photoLoc.timestamp)}</div>
//           <div><b>Address:</b> ${getAddress(photoLoc)}</div>
//           <div style="margin-top:8px;">
//             <img src="${photoLoc.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photoLoc.photo}','_blank')"/>
//           </div>
//         </div>`;
//         const m = L.marker([lat, lng], {
//           icon: makePhotoIcon(photoLoc.photo, fmtTime(photoLoc.timestamp), 32),
//           zIndexOffset: 950,
//         }).bindPopup(popup).addTo(mapInstance.current);
//         markers.current.push(m);
//       });
//     }

//     // Fit bounds
//     if (validLocations.length > 0) {
//       const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
//       mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//     }
//   }, []);

//   // ── Initialize Map ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (!mapRef.current || isMapInitialized) return;
//     const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap",
//       maxZoom: 19,
//     }).addTo(map);
//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     if (selectedSession?.locations) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // ── Redraw on session change ───────────────────────────────────────────────
//   useEffect(() => {
//     if (mapInstance.current && selectedSession?.locations?.length > 0) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // ── Resize ────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // ── Cleanup ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) {
//         mapInstance.current.remove();
//         mapInstance.current = null;
//       }
//     };
//   }, []);

//   const getPhotoCount = (session) => {
//     if (!session?.locations) return 0;
//     return session.locations.filter((loc) => hasValidPhoto(loc)).length;
//   };

//   // ─── Session List ──────────────────────────────────────────────────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//       <Box sx={{ p: 1.5 }}>
//         <Typography
//           variant="subtitle2"
//           fontWeight={600}
//           sx={{ fontSize: "0.75rem", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}
//         >
//           <PinDropIcon sx={{ fontSize: 16, color: "#2196F3" }} />
//           Sessions ({allSessions.length})
//           {/* ✅ Show the selected date in the sidebar header */}
//           {(selectedDate || metadata?.selectedDate) && (
//             <Chip
//               label={selectedDate || metadata?.selectedDate}
//               size="small"
//               sx={{
//                 ml: "auto",
//                 height: 20,
//                 fontSize: "0.55rem",
//                 bgcolor: alpha("#2196F3", 0.1),
//                 color: "#2196F3",
//               }}
//             />
//           )}
//         </Typography>

//         <Stack spacing={1.5}>
//           {allSessions.map((session, index) => {
//             const sessionId = String(session.sessionId || session._id);
//             const isSelected = String(selectedSessionId) === sessionId;
//             const isLoading = isSelected && sessionDetailsLoading && !selectedSession;
//             const photoCount = getPhotoCount(session);
//             const sessionStartTime = session.locations?.[0]?.timestamp || session.startTime;
//             const sessionEndTime =
//               session.locations?.[session.locations.length - 1]?.timestamp || session.endTime;

//             return (
//               <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                 <Card
//                   onClick={() => handleSessionSelect(sessionId)}
//                   sx={{
//                     cursor: "pointer",
//                     border: isSelected ? `2px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                     bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//                     transition: "all 0.2s ease",
//                     "&:hover": {
//                       borderColor: "#2196F3",
//                       bgcolor: alpha("#2196F3", 0.02),
//                       transform: "translateY(-2px)",
//                       boxShadow: 2,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 1.5 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                       <Box
//                         sx={{
//                           width: 32, height: 32, borderRadius: "50%",
//                           bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1),
//                           display: "flex", alignItems: "center", justifyContent: "center",
//                           color: isSelected ? "white" : "#2196F3",
//                           fontSize: "0.75rem", fontWeight: "bold",
//                         }}
//                       >
//                         {isLoading ? <CircularProgress size={18} /> : index + 1}
//                       </Box>
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
//                           Session #{index + 1}
//                         </Typography>
//                         <Typography
//                           variant="caption"
//                           color="text.secondary"
//                           sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5 }}
//                         >
//                           <ScheduleIcon sx={{ fontSize: 10 }} />
//                           {fmtDateTime(session.startTime)}
//                         </Typography>
//                       </Box>
//                       {photoCount > 0 && (
//                         <Chip
//                           icon={<PhotoIcon sx={{ fontSize: 12 }} />}
//                           label={photoCount}
//                           size="small"
//                           sx={{ height: 22, fontSize: "0.6rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }}
//                         />
//                       )}
//                     </Box>

//                     <Grid container spacing={1} sx={{ mb: 1 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
//                           <TimerIcon sx={{ fontSize: 14, color: "#FF9800" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               Duration
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>
//                               {fmtDuration(
//                                 isSelected
//                                   ? totalDuration
//                                   : session.stats?.duration || session.duration || 0
//                               )}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
//                           <StraightenIcon sx={{ fontSize: 14, color: "#2196F3" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               Distance
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>
//                               {isSelected
//                                 ? fmtDist(totalDistance)
//                                 : fmtDist(session.totalDistance || session.stats?.totalDistance || 0)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>

//                     <Divider sx={{ my: 1 }} />

//                     <Grid container spacing={1}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <StartIcon sx={{ fontSize: 12, color: "#22c55e" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               Start
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>
//                               {fmtTime(sessionStartTime)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
//                               End
//                             </Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>
//                               {fmtTime(sessionEndTime)}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Zoom>
//             );
//           })}
//         </Stack>
//       </Box>
//     </Paper>
//   );

//   // ─── Render ───────────────────────────────────────────────────────────────
//   return (
//     <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
//       <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
//         <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
//           <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3" }}>
//             <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
//           </IconButton>
//           <Box sx={{ flex: 1, ml: 1 }}>
//             <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, color: "#2196F3", fontWeight: 600 }}>
//               {summary.formattedDate || "Route Tracking"}
//             </Typography>
//             {/* ✅ Show selected date in AppBar */}
//             {(selectedDate || metadata?.selectedDate) && (
//               <Typography sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
//                 Date: {selectedDate || metadata?.selectedDate}
//               </Typography>
//             )}
//           </Box>

//           {!isMobile && selectedSession && (
//             <Chip
//               label={`${getPhotoCount(selectedSession)} Photos`}
//               size="small"
//               icon={<PhotoIcon sx={{ fontSize: 14 }} />}
//               sx={{ height: 24, bgcolor: alpha("#FF9800", 0.1), color: "#FF9800", fontSize: "0.65rem" }}
//             />
//           )}
//           {isMobile && (
//             <Button
//               variant="outlined"
//               size="small"
//               startIcon={<MenuIcon />}
//               onClick={() => setDrawerOpen(true)}
//               sx={{
//                 fontSize: "0.6rem",
//                 borderColor: alpha("#2196F3", 0.3),
//                 color: "#2196F3",
//                 py: 0.5,
//                 minWidth: "auto",
//               }}
//             >
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
//         <Grid container sx={{ height: "calc(100vh - 48px)" }}>
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div
//               ref={mapRef}
//               style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#f0f0f0" }}
//             />

//             {sessionDetailsLoading && selectedSessionId && !selectedSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {selectedSession && hasLocations && (
//               <Paper
//                 sx={{
//                   position: "absolute", top: 12, left: 52,
//                   p: { xs: 1, sm: 1.5 }, borderRadius: 2,
//                   maxWidth: { xs: 240, sm: 280 }, zIndex: 500, boxShadow: 2,
//                   backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.95)",
//                 }}
//               >
//                 <Typography
//                   variant="body2"
//                   fontWeight={600}
//                   sx={{ color: "#2196F3", fontSize: { xs: "0.7rem", sm: "0.75rem" }, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
//                 >
//                   <PinDropIcon sx={{ fontSize: 14 }} />
//                   Session #{allSessions.findIndex((s) => String(s.sessionId || s._id) === String(selectedSessionId)) + 1}
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
//                     <Typography variant="caption">{fmtDuration(totalDuration)}</Typography>
//                   </Box>
//                   <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
//                     <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
//                     <Typography variant="caption">{fmtDist(totalDistance)}</Typography>
//                   </Box>
//                 </Box>

//                 <Divider sx={{ my: 0.5 }} />
//                 <Box sx={{ mt: 0.5 }}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
//                     <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
//                     <Typography variant="caption" sx={{ color: "#22c55e" }}>
//                       Start: {fmtTime(startTime)}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444" }}>
//                       End: {fmtTime(endTime)}
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}
//           </Grid>

//           {!isMobile && (
//             <Grid
//               item md={4}
//               sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}
//             >
//               {renderSessionList()}
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {isMobile && (
//         <>
//           <Fab
//             color="primary"
//             sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }}
//             onClick={() => setDrawerOpen(true)}
//           >
//             <MenuIcon />
//           </Fab>
//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//             PaperProps={{ sx: { width: "85%", maxWidth: 320, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 } }}
//           >
//             <Box
//               sx={{
//                 p: 1.5,
//                 borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                 display: "flex", justifyContent: "space-between", alignItems: "center",
//               }}
//             >
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600}>Sessions</Typography>
//                 {/* ✅ Show date in drawer header too */}
//                 {(selectedDate || metadata?.selectedDate) && (
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                     {selectedDate || metadata?.selectedDate}
//                   </Typography>
//                 )}
//               </Box>
//               <IconButton onClick={() => setDrawerOpen(false)} size="small">
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 60px)", overflow: "auto" }}>
//               {renderSessionList()}
//             </Box>
//           </Drawer>
//         </>
//       )}
//     </Box>
//   );
// };

// export default Locations;




































////Deeepseeek


import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  Chip,
  alpha,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Drawer,
  Fab,
  Button,
  Stack,
  CircularProgress,
  Zoom,
  Divider,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  Photo as PhotoIcon,
  Timer as TimerIcon,
  Straighten as StraightenIcon,
  Flag as FlagIcon,
  Start as StartIcon,
  PinDrop as PinDropIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { getSessionDetails, getUserAvailableDates } from "../redux/slices/userSlice";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ─── Pure Helpers ─────────────────────────────────────────────────────────────
const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const hasValidCoordinates = (location) => {
  const lat = location.latitude || location.lat;
  const lng = location.longitude || location.lng;
  return (
    lat !== 0 && lat !== null && lat !== undefined &&
    lng !== 0 && lng !== null && lng !== undefined &&
    !isNaN(lat) && !isNaN(lng)
  );
};

const hasValidPhoto = (photo) => {
  return !!(
    photo &&
    photo.url &&
    photo.url !== null &&
    photo.url !== "" &&
    typeof photo.url === "string" &&
    (photo.url.startsWith("http://") || photo.url.startsWith("https://"))
  );
};

const getLat = (location) => location?.latitude || location?.lat || 0;
const getLng = (location) => location?.longitude || location?.lng || 0;

const getAddress = (location) => {
  if (location?.address && location.address !== "Unknown Address" && location.address !== "N/A") {
    return location.address;
  }
  return "Address not available";
};

const getValidLocations = (locations) => {
  if (!locations || locations.length === 0) return [];
  const valid = locations.filter((loc) => hasValidCoordinates(loc));
  return valid.sort((a, b) => {
    const tA = a.timestamp || a.time || a.createdAt;
    const tB = b.timestamp || b.time || b.createdAt;
    return new Date(tA) - new Date(tB);
  });
};

const calcTotalDistance = (locations) => {
  const valid = getValidLocations(locations);
  if (valid.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < valid.length; i++) {
    total += calcDistance(
      getLat(valid[i - 1]), getLng(valid[i - 1]),
      getLat(valid[i]), getLng(valid[i])
    );
  }
  return total;
};

const fmtTime = (ts) => {
  if (!ts) return "Active";
  return new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
};

const fmtDate = (ts) => {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const fmtDateTime = (ts) => {
  if (!ts) return "N/A";
  return new Date(ts).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: true,
  });
};

const fmtDist = (meters) => {
  if (!meters || meters === 0) return "0 km";
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${Math.floor((meters / 1000) * 10) / 10} km`;
};

const fmtDuration = (seconds) => {
  if (!seconds || seconds === 0) return "0 sec";
  
  // If seconds is less than 60, show seconds with 2 decimal places
  if (seconds < 60) {
    return `${seconds.toFixed(2)} sec`;
  }
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds.toFixed(2)} sec`;
};

// Helper to get session stats from various data structures
const getSessionStats = (session) => {
  if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [] };
  
  // Try multiple possible locations for duration data
  let duration = 0;
  if (session.duration) {
    duration = session.duration;
  } else if (session.stats?.duration) {
    duration = session.stats.duration;
  } else if (session.totalDuration) {
    duration = session.totalDuration;
  }
  
  // Try multiple possible locations for distance data
  let distance = 0;
  if (session.totalDistance) {
    distance = session.totalDistance;
  } else if (session.stats?.totalDistance) {
    distance = session.stats.totalDistance;
  } else if (session.distance) {
    distance = session.distance;
  }
  
  // If still no duration and we have locations, calculate from timestamps
  const locations = session.locations || session.timeline || [];
  if ((!duration || duration === 0) && locations.length >= 2) {
    const firstLoc = locations[0];
    const lastLoc = locations[locations.length - 1];
    if (firstLoc?.timestamp && lastLoc?.timestamp) {
      duration = (new Date(lastLoc.timestamp) - new Date(firstLoc.timestamp)) / 1000;
    }
  }
  
  // If still no distance and we have locations, calculate from coordinates
  if ((!distance || distance === 0) && locations.length >= 2) {
    distance = calcTotalDistance(locations);
  }
  
  return {
    distance: distance,
    duration: duration,
    startTime: session.startTime || session.stats?.startTime || null,
    endTime: session.endTime || session.stats?.endTime || null,
    locations: locations
  };
};

// ─── Marker factories ──────────────────────────────────────────────────────────
const makeStartIcon = (color, time, hasPhoto = false, size = 32) =>
  L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
        <span style="font-size:${size / 2.8}px;line-height:1">🚀</span>
        <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">START</span>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
        ${time}${hasPhoto ? " 📸" : ""}
      </div>
    </div>`,
    className: "",
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size + 10],
  });

const makeEndIcon = (color, time, hasPhoto = false, size = 32) =>
  L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:${color};border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;font-weight:bold;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);z-index:2;">
        <span style="font-size:${size / 2.8}px;line-height:1">🏁</span>
        <span style="font-size:${size / 8}px;line-height:1;margin-top:1px">END</span>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid ${color};z-index:1">
        ${time}${hasPhoto ? " 📸" : ""}
      </div>
    </div>`,
    className: "",
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size + 10],
  });

const makePhotoIcon = (photoUrl, time, size = 32) =>
  L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,#FF9800,#F57C00);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3);overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.innerHTML='<span style=\\'font-size:16px\\'>📸</span>'"/>
        <span style="position:absolute;bottom:0;right:0;background:#FF9800;border-radius:50%;width:12px;height:12px;display:flex;align-items:center;justify-content:center;font-size:7px;border:1px solid #fff;">📸</span>
      </div>
      <div style="position:absolute;bottom:-16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:1px 4px;border-radius:8px;font-size:7px;white-space:nowrap;border:1px solid #FF9800;">
        ${time}
      </div>
    </div>`,
    className: "",
    iconSize: [size, size + 20],
    iconAnchor: [size / 2, size + 10],
  });

// ─── Main Component ────────────────────────────────────────────────────────────
const Locations = () => {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    sessions = [],
    selectedSessionId: initialSelectedSessionId,
    selectedDate,
    summary = {},
    metadata = {},
  } = location.state || {};

  const sessionDetails = useSelector((state) => state.user?.sessionDetails);
  const sessionDetailsLoading = useSelector((state) => state.user?.sessionDetailsLoading);

  // ── State ──────────────────────────────────────────────────────────────────
  const [allSessions, setAllSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasLocations, setHasLocations] = useState(false);
  const [showPhotoMarkers, setShowPhotoMarkers] = useState(true);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  // Store processed stats for all sessions
  const [sessionStatsMap, setSessionStatsMap] = useState(new Map());


  // ── Refs ───────────────────────────────────────────────────────────────────
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polylines = useRef([]);
  const markers = useRef([]);
  const fetchedSessions = useRef(new Set());
  const sessionDataCache = useRef(new Map());

  // Fetch available dates
  useEffect(() => {
    const userId = metadata?.userId || metadata?.trackId;
    const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;

    if (userId && dateToUse) {
      dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
    }
  }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

  // Init sessions from props and calculate stats for all
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      setAllSessions(sessions);
      const statsMap = new Map();
      
      sessions.forEach((session) => {
        const id = String(session.sessionId || session._id);
        const stats = getSessionStats(session);
        
        // console.log(`Session ${id} - Duration:`, stats.duration, "Distance:", stats.distance);
        
        statsMap.set(id, stats);
        sessionDataCache.current.set(id, {
          ...session,
          ...stats
        });
      });
      
      setSessionStatsMap(statsMap);
    }
  }, [sessions]);

  // Process session data for selected session
  const processSessionData = useCallback(
    (sessionData) => {
      if (!sessionData) return;

      console.log("Processing selected session:", sessionData.sessionId);
      
      setSelectedSession(sessionData);
      setIsLoadingSession(false);

      const stats = getSessionStats(sessionData);
      const allLocations = stats.locations || [];
      const validLocations = getValidLocations(allLocations);

      if (validLocations.length > 0) {
        setHasLocations(true);
        setTotalDistance(stats.distance);
        setTotalDuration(stats.duration);
        setStartTime(stats.startTime);
        setEndTime(stats.endTime);

        if (mapInstance.current) {
          setTimeout(() => drawMapWithSession(sessionData, showPhotoMarkers), 100);
        }
      } else {
        setHasLocations(false);
      }
    },
    [showPhotoMarkers]
  );

  // Handle session click
  const handleSessionSelect = useCallback(
    (sessionId) => {
      const id = String(sessionId);
      
      if (selectedSessionId === id && selectedSession) {
        console.log("Session already selected:", id);
        return;
      }
      
      console.log("Selecting session:", id);
      setSelectedSessionId(id);
      setIsLoadingSession(true);
      
      // Check cache first
      if (sessionDataCache.current.has(id)) {
        const cachedSession = sessionDataCache.current.get(id);
        if (cachedSession.locations && cachedSession.locations.length > 0) {
          console.log("Using cached session data");
          processSessionData(cachedSession);
          return;
        }
      }

      // Find in allSessions
      const foundSession = allSessions.find((s) => String(s.sessionId || s._id) === id);
      
      if (foundSession) {
        if (foundSession.locations && foundSession.locations.length > 0) {
          console.log("Session has locations, using directly");
          const stats = getSessionStats(foundSession);
          const sessionWithStats = {
            ...foundSession,
            ...stats
          };
          sessionDataCache.current.set(id, sessionWithStats);
          processSessionData(sessionWithStats);
        } 
        else if (!fetchedSessions.current.has(id)) {
          const userId = metadata?.userId || metadata?.trackId;
          if (userId) {
            console.log("Fetching full session details from API:", id);
            fetchedSessions.current.add(id);
            dispatch(getSessionDetails({ userId, sessionId: id }));
          } else {
            console.error("No userId available");
            setIsLoadingSession(false);
            setSelectedSession(null);
            setHasLocations(false);
          }
        } else {
          console.log("Session already being fetched");
        }
      } else {
        console.log("Session not found in allSessions");
        setIsLoadingSession(false);
        setSelectedSession(null);
        setHasLocations(false);
      }

      if (isMobile) setDrawerOpen(false);
    },
    [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
  );
console.log(allSessions);

  // Watch Redux sessionDetails
  useEffect(() => {
    if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
      console.log("Received session details from Redux API");
      const id = String(sessionDetails.sessionId);
      const stats = getSessionStats(sessionDetails);
      const sessionWithStats = {
        ...sessionDetails,
        ...stats
      };
      sessionDataCache.current.set(id, sessionWithStats);
      // Update the stats map with fetched data
      setSessionStatsMap(prev => {
        const newMap = new Map(prev);
        newMap.set(id, stats);
        return newMap;
      });
      processSessionData(sessionWithStats);
    }
  }, [sessionDetails, selectedSessionId, processSessionData]);

  // Auto-select initial session
  useEffect(() => {
    if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
      const firstId = initialSelectedSessionId
        ? String(initialSelectedSessionId)
        : String(allSessions[0].sessionId || allSessions[0]._id);
      console.log("Auto-selecting initial session:", firstId);
      handleSessionSelect(firstId);
    }
  }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

  // Map clear
  const clearMap = () => {
    if (!mapInstance.current) return;
    polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
    markers.current.forEach((m) => mapInstance.current.removeLayer(m));
    polylines.current = [];
    markers.current = [];
  };

  // Map draw
  const drawMapWithSession = useCallback((session, showPhotos) => {
    if (!mapInstance.current) return;
    
    const stats = getSessionStats(session);
    const allLocations = stats.locations || [];
    
    if (!allLocations.length) return;

    clearMap();

    const validLocations = getValidLocations(allLocations);
    if (validLocations.length === 0) return;

    // Draw polylines
    for (let i = 0; i < validLocations.length - 1; i++) {
      const line = L.polyline(
        [[getLat(validLocations[i]), getLng(validLocations[i])],
         [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])]],
        {
          color: validLocations[i].isOnline === true ? "#3553ea" : "#ef4444",
          weight: 3, opacity: 0.8, lineJoin: "round", lineCap: "round",
        }
      ).addTo(mapInstance.current);
      polylines.current.push(line);
    }

    const startLocation = validLocations[0];
    const endLocation = validLocations[validLocations.length - 1];
    
    // Start marker
    if (startLocation && hasValidCoordinates(startLocation)) {
      const hasPhoto = hasValidPhoto(startLocation);
      const popup = `<div style="min-width:240px;max-width:300px;">
        <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:16px">🚀</span><b>START POINT</b>
          </div>
        </div>
        <div><b>Time:</b> ${fmtTime(startLocation.timestamp)}</div>
        <div><b>Date:</b> ${fmtDate(startLocation.timestamp)}</div>
        <div><b>Address:</b> ${getAddress(startLocation)}</div>
      </div>`;
      
      const m = L.marker([getLat(startLocation), getLng(startLocation)], {
        icon: makeStartIcon("#22c55e", fmtTime(startLocation.timestamp), hasPhoto, 32),
        zIndexOffset: 1000,
      }).bindPopup(popup).addTo(mapInstance.current);
      markers.current.push(m);
    }

    // End marker
    if (endLocation && hasValidCoordinates(endLocation)) {
      const hasPhoto = hasValidPhoto(endLocation);
      const popup = `<div style="min-width:240px;max-width:300px;">
        <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:16px">🏁</span><b>END POINT</b>
          </div>
        </div>
        <div><b>Time:</b> ${fmtTime(endLocation.timestamp)}</div>
        <div><b>Date:</b> ${fmtDate(endLocation.timestamp)}</div>
        <div><b>Address:</b> ${getAddress(endLocation)}</div>
      </div>`;
      
      const m = L.marker([getLat(endLocation), getLng(endLocation)], {
        icon: makeEndIcon("#ef4444", fmtTime(endLocation.timestamp), hasPhoto, 32),
        zIndexOffset: 1000,
      }).bindPopup(popup).addTo(mapInstance.current);
      markers.current.push(m);
    }

    // Photo markers from photos array
    if (showPhotos && session.photos && session.photos.length > 0) {
      session.photos.forEach((photo, idx) => {
        if (photo.location && hasValidCoordinates(photo.location)) {
          const popup = `<div style="min-width:240px;max-width:300px;">
            <div style="background:#FF9800;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
              <b>📸 PHOTO ${idx + 1}</b>
            </div>
            <div><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
            <div><b>Address:</b> ${photo.address || "Address not available"}</div>
            <div style="margin-top:8px;">
              <img src="${photo.url}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photo.url}','_blank')"/>
            </div>
          </div>`;
          
          const m = L.marker([photo.location.lat, photo.location.lng], {
            icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 32),
            zIndexOffset: 950,
          }).bindPopup(popup).addTo(mapInstance.current);
          markers.current.push(m);
        }
      });
    }

    // Fit bounds
    if (validLocations.length > 0) {
      const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
      mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || isMapInitialized) return;
    const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);
    mapInstance.current = map;
    setIsMapInitialized(true);
    if (selectedSession) {
      setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
    }
  }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

  // Redraw on session change
  useEffect(() => {
    if (mapInstance.current && selectedSession) {
      setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
    }
  }, [selectedSession, showPhotoMarkers, drawMapWithSession]);

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const getPhotoCount = (session) => {
    return session?.photos?.length || 0;
  };

  // Session List - ALWAYS shows duration for all sessions
  const renderSessionList = () => (
    <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
      <Box sx={{ p: 1.5 }}>
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ fontSize: "0.75rem", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}
        >
          <PinDropIcon sx={{ fontSize: 16, color: "#2196F3" }} />
          Sessions ({allSessions.length})
          {(selectedDate || metadata?.selectedDate) && (
            <Chip
              label={selectedDate || metadata?.selectedDate}
              size="small"
              sx={{
                ml: "auto",
                height: 20,
                fontSize: "0.55rem",
                bgcolor: alpha("#2196F3", 0.1),
                color: "#2196F3",
              }}
            />
          )}
        </Typography>

        <Stack spacing={1.5}>
          {allSessions.map((session, index) => {
            const sessionId = String(session.sessionId || session._id);
            const isSelected = String(selectedSessionId) === sessionId;
            const isLoading = isSelected && isLoadingSession;
            const photoCount = getPhotoCount(session);
            
            // Get stats from the stored map for ALL sessions
            const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);
            const displayDuration = stats.duration;
            const displayDistance = stats.distance;
            const displayStartTime = stats.startTime;
            const displayEndTime = stats.endTime;

            return (
              <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
                <Card
                  onClick={() => handleSessionSelect(sessionId)}
                  sx={{
                    cursor: "pointer",
                    border: isSelected ? `2px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "#2196F3",
                      bgcolor: alpha("#2196F3", 0.02),
                      transform: "translateY(-2px)",
                      boxShadow: 2,
                    },
                  }}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Box
                        sx={{
                          width: 32, height: 32, borderRadius: "50%",
                          bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1),
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: isSelected ? "white" : "#2196F3",
                          fontSize: "0.75rem", fontWeight: "bold",
                        }}
                      >
                        {isLoading ? <CircularProgress size={18} /> : index + 1}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
                          Session #{index + 1}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5 }}
                        >
                          <ScheduleIcon sx={{ fontSize: 10 }} />
                          {fmtDateTime(session.startTime || session.stats?.startTime)}
                        </Typography>
                      </Box>
                      {photoCount > 0 && (
                        <Chip
                          icon={<PhotoIcon sx={{ fontSize: 12 }} />}
                          label={photoCount}
                          size="small"
                          sx={{ height: 22, fontSize: "0.6rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }}
                        />
                      )}
                    </Box>

                    <Grid container spacing={1} sx={{ mb: 1 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
                          <TimerIcon sx={{ fontSize: 14, color: "#FF9800" }} />
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
                              Duration
                            </Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>
                              {fmtDuration(displayDuration)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
                          <StraightenIcon sx={{ fontSize: 14, color: "#2196F3" }} />
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
                              Distance
                            </Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>
                              {fmtDist(displayDistance)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 1 }} />

                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <StartIcon sx={{ fontSize: 12, color: "#22c55e" }} />
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
                              Start
                            </Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>
                              {fmtTime(displayStartTime)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>
                              End
                            </Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>
                              {fmtTime(displayEndTime)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Zoom>
            );
          })}
        </Stack>
      </Box>
    </Paper>
  );

  // Render
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
      <AppBar position="static" sx={{ bgcolor: "background.paper", boxShadow: "0 1px 5px rgba(0,0,0,0.05)" }}>
        <Toolbar sx={{ minHeight: { xs: 48, sm: 56 }, px: { xs: 1, sm: 2 } }}>
          <IconButton onClick={() => window.history.back()} sx={{ color: "#2196F3" }}>
            <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
          </IconButton>
          <Box sx={{ flex: 1, ml: 1 }}>
            <Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, color: "#2196F3", fontWeight: 600 }}>
              {summary.formattedDate || "Route Tracking"}
            </Typography>
            {(selectedDate || metadata?.selectedDate) && (
              <Typography sx={{ fontSize: "0.6rem", color: "text.secondary" }}>
                Date: {selectedDate || metadata?.selectedDate}
              </Typography>
            )}
          </Box>

          {!isMobile && selectedSession && (
            <Chip
              label={`${getPhotoCount(selectedSession)} Photos`}
              size="small"
              icon={<PhotoIcon sx={{ fontSize: 14 }} />}
              sx={{ height: 24, bgcolor: alpha("#FF9800", 0.1), color: "#FF9800", fontSize: "0.65rem" }}
            />
          )}
          {isMobile && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<MenuIcon />}
              onClick={() => setDrawerOpen(true)}
              sx={{
                fontSize: "0.6rem",
                borderColor: alpha("#2196F3", 0.3),
                color: "#2196F3",
                py: 0.5,
                minWidth: "auto",
              }}
            >
              {allSessions.length}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
        <Grid container sx={{ height: "calc(100vh - 48px)" }}>
          <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
            <div
              ref={mapRef}
              style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#f0f0f0" }}
            />

            {isLoadingSession && (
              <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
                <CircularProgress size={40} sx={{ color: "#2196F3" }} />
              </Box>
            )}

            {selectedSession && hasLocations && (
              <Paper
                sx={{
                  position: "absolute", top: 12, left: 52,
                  p: { xs: 1, sm: 1.5 }, borderRadius: 2,
                  maxWidth: { xs: 240, sm: 280 }, zIndex: 500, boxShadow: 2,
                  backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.95)",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#2196F3", fontSize: { xs: "0.7rem", sm: "0.75rem" }, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <PinDropIcon sx={{ fontSize: 14 }} />
                  Session #{allSessions.findIndex((s) => String(s.sessionId || s._id) === String(selectedSessionId)) + 1}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#FF9800", 0.05), p: 0.5, borderRadius: 1 }}>
                    <TimerIcon sx={{ fontSize: 12, color: "#FF9800" }} />
                    <Typography variant="caption">{fmtDuration(totalDuration)}</Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: alpha("#2196F3", 0.05), p: 0.5, borderRadius: 1 }}>
                    <StraightenIcon sx={{ fontSize: 12, color: "#2196F3" }} />
                    <Typography variant="caption">{fmtDist(totalDistance)}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 0.5 }} />
                <Box sx={{ mt: 0.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                    <StartIcon sx={{ fontSize: 10, color: "#22c55e" }} />
                    <Typography variant="caption" sx={{ color: "#22c55e" }}>
                      Start: {fmtTime(startTime)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
                    <Typography variant="caption" sx={{ color: "#ef4444" }}>
                      End: {fmtTime(endTime)}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            )}
          </Grid>

          {!isMobile && (
            <Grid
              item md={4}
              sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}
            >
              {renderSessionList()}
            </Grid>
          )}
        </Grid>
      </Container>

      {isMobile && (
        <>
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </Fab>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{ sx: { width: "85%", maxWidth: 320, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 } }}
          >
            <Box
              sx={{
                p: 1.5,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Sessions</Typography>
                {(selectedDate || metadata?.selectedDate) && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
                    {selectedDate || metadata?.selectedDate}
                  </Typography>
                )}
              </Box>
              <IconButton onClick={() => setDrawerOpen(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ height: "calc(100% - 60px)", overflow: "auto" }}>
              {renderSessionList()}
            </Box>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default Locations;