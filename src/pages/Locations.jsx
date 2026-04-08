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
//   Badge,
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
//   Collections as CollectionsIcon,
//   LocationOn as LocationOnIcon,
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
//   const lat = location?.latitude || location?.lat;
//   const lng = location?.longitude || location?.lng;
//   return (
//     lat !== 0 && lat !== null && lat !== undefined &&
//     lng !== 0 && lng !== null && lng !== undefined &&
//     !isNaN(lat) && !isNaN(lng)
//   );
// };

// const hasValidPhoto = (photo) => {
//   return !!(
//     photo &&
//     photo.url &&
//     photo.url !== null &&
//     photo.url !== "" &&
//     typeof photo.url === "string" &&
//     (photo.url.startsWith("http://") || photo.url.startsWith("https://"))
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

// const fmtDist = (meters) => {
//   if (!meters || meters === 0) return "0 km";
//   if (meters < 1000) return `${Math.round(meters)} m`;
//   return `${Math.floor((meters / 1000) * 10) / 10} km`;
// };

// const fmtDuration = (seconds) => {
//   if (!seconds || seconds === 0) return "0 sec";
//   if (seconds < 60) return `${seconds.toFixed(2)} sec`;
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = (seconds % 60).toFixed(0);
//   if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
//   if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
//   return `${seconds.toFixed(2)} sec`;
// };

// const getSessionStats = (session) => {
//   if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [] };

//   let duration = 0;
//   if (session.duration) duration = session.duration;
//   else if (session.stats?.duration) duration = session.stats.duration;
//   else if (session.totalDuration) duration = session.totalDuration;

//   let distance = 0;
//   if (session.totalDistance) distance = session.totalDistance;
//   else if (session.stats?.totalDistance) distance = session.stats.totalDistance;
//   else if (session.distance) distance = session.distance;

//   const locations = session.locations || session.timeline || [];

//   if ((!duration || duration === 0) && locations.length >= 2) {
//     const firstLoc = locations[0];
//     const lastLoc = locations[locations.length - 1];
//     if (firstLoc?.timestamp && lastLoc?.timestamp) {
//       duration = (new Date(lastLoc.timestamp) - new Date(firstLoc.timestamp)) / 1000;
//     }
//   }

//   if ((!distance || distance === 0) && locations.length >= 2) {
//     distance = calcTotalDistance(locations);
//   }

//   return {
//     distance,
//     duration,
//     startTime: session.startTime || session.stats?.startTime || null,
//     endTime: session.endTime || session.stats?.endTime || null,
//     locations,
//   };
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

// // Start icon with photo thumbnail baked in
// const makeStartWithPhotoIcon = (photoUrl, time, size = 38) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #22c55e, #15803d);border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
//         <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
//         <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center;">
//           <span style="position:absolute;bottom:2px;right:2px;background:#22c55e;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🚀</span>
//         </div>
//       </div>
//       <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #22c55e;z-index:1;font-weight:500;">
//         ${time} 📍 START
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 28],
//     iconAnchor: [size / 2, size + 15],
//   });

// // End icon with photo thumbnail baked in
// const makeEndWithPhotoIcon = (photoUrl, time, size = 38) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #ef4444, #dc2626);border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
//         <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
//         <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;">
//           <span style="position:absolute;bottom:2px;right:2px;background:#ef4444;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🏁</span>
//         </div>
//       </div>
//       <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #ef4444;z-index:1;font-weight:500;">
//         ${time} 🏁 END
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 28],
//     iconAnchor: [size / 2, size + 15],
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
//     selectedDate,
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
//   const [isLoadingSession, setIsLoadingSession] = useState(false);
//   const [sessionStatsMap, setSessionStatsMap] = useState(new Map());

//   // Photo drawer
//   const [photoDrawerOpen, setPhotoDrawerOpen] = useState(false);
//   const [sessionPhotos, setSessionPhotos] = useState([]);

//   // Start and end points based on photos
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const markerRefs = useRef(new Map());
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());

//   // ─── Get start and end points from photos ──────────────────────────────────
//   const getStartEndFromPhotos = useCallback((session) => {
//     if (!session) return { startPoint: null, endPoint: null };

//     const photos = session.photos || [];
//     const validPhotos = photos.filter(p => hasValidPhoto(p) && p.location && hasValidCoordinates(p.location));

//     if (validPhotos.length === 0) {
//       // Fallback to locations if no photos
//       const stats = getSessionStats(session);
//       const locs = getValidLocations(stats.locations);
//       return {
//         startPoint: locs.length > 0 ? locs[0] : null,
//         endPoint: locs.length > 1 ? locs[locs.length - 1] : null,
//       };
//     }

//     // Sort photos by timestamp
//     const sortedPhotos = [...validPhotos].sort((a, b) => 
//       new Date(a.timestamp) - new Date(b.timestamp)
//     );

//     const firstPhoto = sortedPhotos[0];
//     const lastPhoto = sortedPhotos[sortedPhotos.length - 1];

//     // Create location objects from photos
//     const startLocation = {
//       lat: getLat(firstPhoto.location),
//       lng: getLng(firstPhoto.location),
//       timestamp: firstPhoto.timestamp,
//       address: firstPhoto.address,
//       photo: firstPhoto.url,
//     };

//     const endLocation = {
//       lat: getLat(lastPhoto.location),
//       lng: getLng(lastPhoto.location),
//       timestamp: lastPhoto.timestamp,
//       address: lastPhoto.address,
//       photo: lastPhoto.url,
//     };

//     return { startPoint: startLocation, endPoint: endLocation };
//   }, []);

//   // ─── Build a unified "all photos" list from the session ──────────────────
//   const buildSessionPhotos = useCallback((session) => {
//     if (!session) return [];

//     const photos = [];

//     // Get start and end from photos
//     const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);

//     // Add start point photo if exists
//     if (sp && sp.photo) {
//       photos.push({
//         key: "start",
//         url: sp.photo,
//         timestamp: sp.timestamp,
//         address: sp.address,
//         lat: sp.lat,
//         lng: sp.lng,
//         type: "start",
//         hasPhoto: true,
//       });
//     }

//     // Add route photos (exclude first and last)
//     const sessionPhotos = session.photos || [];
//     const validRoutePhotos = sessionPhotos.filter(photo => {
//       if (!hasValidPhoto(photo) || !photo.location) return false;
//       // Skip if this photo is the start or end photo
//       if (sp && Math.abs(getLat(photo.location) - sp.lat) < 0.00001 && 
//           Math.abs(getLng(photo.location) - sp.lng) < 0.00001) return false;
//       if (ep && Math.abs(getLat(photo.location) - ep.lat) < 0.00001 && 
//           Math.abs(getLng(photo.location) - ep.lng) < 0.00001) return false;
//       return true;
//     });

//     validRoutePhotos.forEach((photo, idx) => {
//       photos.push({
//         key: `photo_${idx}`,
//         idx,
//         url: photo.url,
//         timestamp: photo.timestamp,
//         address: photo.address || "Address not available",
//         lat: photo.location?.lat || photo.location?.latitude || null,
//         lng: photo.location?.lng || photo.location?.longitude || null,
//         type: "route",
//         hasPhoto: true,
//       });
//     });

//     // Add end point photo if exists
//     if (ep && ep.photo) {
//       photos.push({
//         key: "end",
//         url: ep.photo,
//         timestamp: ep.timestamp,
//         address: ep.address,
//         lat: ep.lat,
//         lng: ep.lng,
//         type: "end",
//         hasPhoto: true,
//       });
//     }

//     return photos;
//   }, [getStartEndFromPhotos]);

//   // Fetch available dates
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;
//     if (userId && dateToUse) {
//       dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

//   // Init sessions
//   useEffect(() => {
//     if (sessions && sessions.length > 0) {
//       setAllSessions(sessions);
//       const statsMap = new Map();
//       sessions.forEach((session) => {
//         const id = String(session.sessionId || session._id);
//         const stats = getSessionStats(session);
//         statsMap.set(id, stats);
//         sessionDataCache.current.set(id, { ...session, ...stats });
//       });
//       setSessionStatsMap(statsMap);
//     }
//   }, [sessions]);

//   // Update start/end points and photos when session changes
//   useEffect(() => {
//     if (selectedSession) {
//       const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(selectedSession);
//       setStartPoint(sp);
//       setEndPoint(ep);
//       setSessionPhotos(buildSessionPhotos(selectedSession));
//     }
//   }, [selectedSession, getStartEndFromPhotos, buildSessionPhotos]);

//   // Process session data
//   const processSessionData = useCallback(
//     (sessionData) => {
//       if (!sessionData) return;
//       setSelectedSession(sessionData);
//       setIsLoadingSession(false);

//       const stats = getSessionStats(sessionData);
//       const allLocations = stats.locations || [];
//       const validLocations = getValidLocations(allLocations);

//       if (validLocations.length > 0) {
//         setHasLocations(true);
//         setTotalDistance(stats.distance);
//         setTotalDuration(stats.duration);
//         setStartTime(stats.startTime);
//         setEndTime(stats.endTime);
//         if (mapInstance.current) {
//           setTimeout(() => drawMapWithSession(sessionData, showPhotoMarkers), 100);
//         }
//       } else {
//         setHasLocations(false);
//       }
//     },
//     [showPhotoMarkers]
//   );

//   // Handle session click
//   const handleSessionSelect = useCallback(
//     (sessionId) => {
//       const id = String(sessionId);
//       if (selectedSessionId === id && selectedSession) return;

//       setSelectedSessionId(id);
//       setIsLoadingSession(true);

//       if (sessionDataCache.current.has(id)) {
//         const cachedSession = sessionDataCache.current.get(id);
//         if (cachedSession.locations && cachedSession.locations.length > 0) {
//           processSessionData(cachedSession);
//           return;
//         }
//       }

//       const foundSession = allSessions.find((s) => String(s.sessionId || s._id) === id);
//       if (foundSession) {
//         if (foundSession.locations && foundSession.locations.length > 0) {
//           const stats = getSessionStats(foundSession);
//           const sessionWithStats = { ...foundSession, ...stats };
//           sessionDataCache.current.set(id, sessionWithStats);
//           processSessionData(sessionWithStats);
//         } else if (!fetchedSessions.current.has(id)) {
//           const userId = metadata?.userId || metadata?.trackId;
//           if (userId) {
//             fetchedSessions.current.add(id);
//             dispatch(getSessionDetails({ userId, sessionId: id }));
//           } else {
//             setIsLoadingSession(false);
//             setSelectedSession(null);
//             setHasLocations(false);
//           }
//         }
//       } else {
//         setIsLoadingSession(false);
//         setSelectedSession(null);
//         setHasLocations(false);
//       }

//       if (isMobile) setDrawerOpen(false);
//     },
//     [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
//   );

//   // Watch Redux sessionDetails
//   useEffect(() => {
//     if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
//       const id = String(sessionDetails.sessionId);
//       const stats = getSessionStats(sessionDetails);
//       const sessionWithStats = { ...sessionDetails, ...stats };
//       sessionDataCache.current.set(id, sessionWithStats);
//       setSessionStatsMap((prev) => {
//         const newMap = new Map(prev);
//         newMap.set(id, stats);
//         return newMap;
//       });
//       processSessionData(sessionWithStats);
//     }
//   }, [sessionDetails, selectedSessionId, processSessionData]);

//   // Auto-select initial session
//   useEffect(() => {
//     if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
//       const firstId = initialSelectedSessionId
//         ? String(initialSelectedSessionId)
//         : String(allSessions[0].sessionId || allSessions[0]._id);
//       handleSessionSelect(firstId);
//     }
//   }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

//   // ── Map helpers ────────────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;
//     polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
//     markers.current.forEach((m) => mapInstance.current.removeLayer(m));
//     polylines.current = [];
//     markers.current = [];
//     markerRefs.current.clear();
//   };

//   // ── Main draw function ─────────────────────────────────────────────────────
//   const drawMapWithSession = useCallback((session, showPhotos) => {
//     if (!mapInstance.current) return;

//     const stats = getSessionStats(session);
//     const allLocations = stats.locations || [];
//     if (!allLocations.length) return;

//     clearMap();
//     const validLocations = getValidLocations(allLocations);
//     if (validLocations.length === 0) return;

//     // ── Polylines ────────────────────────────────────────────────────────
//     for (let i = 0; i < validLocations.length - 1; i++) {
//       const line = L.polyline(
//         [
//           [getLat(validLocations[i]), getLng(validLocations[i])],
//           [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])],
//         ],
//         {
//           color: validLocations[i].isOnline === true ? "#3553ea" : "#ef4444",
//           weight: 3,
//           opacity: 0.8,
//           lineJoin: "round",
//           lineCap: "round",
//         }
//       ).addTo(mapInstance.current);
//       polylines.current.push(line);
//     }

//     // ── START marker from first photo ─────────────────────────────────────
//     if (startPoint && hasValidCoordinates(startPoint)) {
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;">
//             <span style="font-size:16px">🚀</span><b>START POINT</b>
//           </div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(startPoint)}</div>
//         <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//           <b>📸 Start Photo</b><br/>
//           <img src="${startPoint.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;"
//             onclick="window.open('${startPoint.photo}','_blank')"/>
//         </div>
//       </div>`;

//       const icon = makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 38);

//       const m = L.marker([startPoint.lat, startPoint.lng], {
//         icon,
//         zIndexOffset: 1000,
//       })
//         .bindPopup(popupContent)
//         .addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     } else if (validLocations.length > 0) {
//       // Fallback to first location if no start photo
//       const fallbackStart = validLocations[0];
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;">
//             <span style="font-size:16px">🚀</span><b>START POINT</b>
//           </div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(fallbackStart.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(fallbackStart.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(fallbackStart)}</div>
//       </div>`;

//       const m = L.marker([getLat(fallbackStart), getLng(fallbackStart)], {
//         icon: makeStartIcon("#22c55e", fmtTime(fallbackStart.timestamp), false, 32),
//         zIndexOffset: 1000,
//       })
//         .bindPopup(popupContent)
//         .addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     }

//     // ── END marker from last photo ───────────────────────────────────────
//     if (endPoint && hasValidCoordinates(endPoint)) {
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;">
//             <span style="font-size:16px">🏁</span><b>END POINT</b>
//           </div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(endPoint.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(endPoint.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(endPoint)}</div>
//         <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//           <b>📸 End Photo</b><br/>
//           <img src="${endPoint.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;"
//             onclick="window.open('${endPoint.photo}','_blank')"/>
//         </div>
//       </div>`;

//       const icon = makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 38);

//       const m = L.marker([endPoint.lat, endPoint.lng], {
//         icon,
//         zIndexOffset: 1000,
//       })
//         .bindPopup(popupContent)
//         .addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     } else if (validLocations.length > 1) {
//       // Fallback to last location if no end photo
//       const fallbackEnd = validLocations[validLocations.length - 1];
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;">
//             <span style="font-size:16px">🏁</span><b>END POINT</b>
//           </div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(fallbackEnd.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(fallbackEnd.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(fallbackEnd)}</div>
//       </div>`;

//       const m = L.marker([getLat(fallbackEnd), getLng(fallbackEnd)], {
//         icon: makeEndIcon("#ef4444", fmtTime(fallbackEnd.timestamp), false, 32),
//         zIndexOffset: 1000,
//       })
//         .bindPopup(popupContent)
//         .addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     }

//     // ── Mid-route photo markers ───────────────────────────────────────────
//     if (showPhotos && session.photos && session.photos.length > 0) {
//       session.photos.forEach((photo, idx) => {
//         if (hasValidPhoto(photo) && photo.location && hasValidCoordinates(photo.location)) {
//           const lat = photo.location.lat || photo.location.latitude;
//           const lng = photo.location.lng || photo.location.longitude;

//           // Skip if this photo is the start or end photo
//           const isStartPhoto = startPoint && 
//             Math.abs(startPoint.lat - lat) < 0.00001 && 
//             Math.abs(startPoint.lng - lng) < 0.00001;
//           const isEndPhoto = endPoint && 
//             Math.abs(endPoint.lat - lat) < 0.00001 && 
//             Math.abs(endPoint.lng - lng) < 0.00001;

//           if (isStartPhoto || isEndPhoto) return;

//           const popup = `<div style="min-width:240px;max-width:300px;">
//             <div style="background:#FF9800;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//               <b>📸 ROUTE PHOTO ${idx + 1}</b>
//             </div>
//             <div><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
//             <div><b>Address:</b> ${photo.address || "Address not available"}</div>
//             <div style="margin-top:8px;">
//               <img src="${photo.url}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;"
//                 onclick="window.open('${photo.url}','_blank')"/>
//             </div>
//           </div>`;

//           const m = L.marker([lat, lng], {
//             icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 32),
//             zIndexOffset: 950,
//           })
//             .bindPopup(popup)
//             .addTo(mapInstance.current);
//           markers.current.push(m);
//           markerRefs.current.set(`photo_${idx}`, m);
//         }
//       });
//     }

//     // Fit bounds using all locations
//     if (validLocations.length > 0) {
//       const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
//       mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//     }
//   }, [startPoint, endPoint]);

//   // Initialize Map
//   useEffect(() => {
//     if (!mapRef.current || isMapInitialized) return;
//     const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap",
//       maxZoom: 19,
//     }).addTo(map);
//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     if (selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // Redraw on session or start/end points change
//   useEffect(() => {
//     if (mapInstance.current && selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

//   // Resize
//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) {
//         mapInstance.current.remove();
//         mapInstance.current = null;
//       }
//     };
//   }, []);

//   const getPhotoCount = (session) => {
//     if (!session) return 0;
//     return session.photos?.length || 0;
//   };

//   // ── Fly to photo/location on map when user taps a drawer card ────────────
//   const handlePhotoClick = (photo) => {
//     setPhotoDrawerOpen(false);
//     if (!mapInstance.current) return;

//     const markerKey = photo.key;
//     if (markerRefs.current.has(markerKey)) {
//       const m = markerRefs.current.get(markerKey);
//       mapInstance.current.flyTo(m.getLatLng(), 17, { animate: true, duration: 1 });
//       setTimeout(() => m.openPopup(), 1100);
//       return;
//     }
//     // Fallback by raw coordinates
//     if (photo.lat && photo.lng) {
//       mapInstance.current.flyTo([photo.lat, photo.lng], 17, { animate: true, duration: 1 });
//     }
//   };

//   // ── Photo Gallery Drawer ──────────────────────────────────────────────────
//   const renderPhotoDrawer = () => {
//     const startPhotos = sessionPhotos.filter((p) => p.type === "start");
//     const routePhotos = sessionPhotos.filter((p) => p.type === "route");
//     const endPhotos = sessionPhotos.filter((p) => p.type === "end");

//     const renderPhotoCard = (photo, i) => {
//       const accentColor =
//         photo.type === "start" ? "#22c55e" :
//         photo.type === "end" ? "#ef4444" : "#FF9800";
//       const label =
//         photo.type === "start" ? "Start Point" :
//         photo.type === "end" ? "End Point" :
//         `Route Photo ${(photo.idx ?? i) + 1}`;
//       const emoji =
//         photo.type === "start" ? "🚀" :
//         photo.type === "end" ? "🏁" : "📸";

//       return (
//         <Card
//           key={photo.key || i}
//           elevation={0}
//           onClick={() => handlePhotoClick(photo)}
//           sx={{
//             cursor: "pointer",
//             border: "1px solid",
//             borderColor: alpha(accentColor, 0.3),
//             borderRadius: 2,
//             transition: "all 0.2s",
//             "&:hover": {
//               boxShadow: 3,
//               borderColor: accentColor,
//               transform: "translateY(-1px)",
//             },
//           }}
//         >
//           <CardContent sx={{ p: 1.2, "&:last-child": { pb: 1.2 } }}>
//             <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-start" }}>
//               {/* Thumbnail */}
//               <Box
//                 sx={{
//                   width: 64, height: 64,
//                   borderRadius: 1.5,
//                   overflow: "hidden",
//                   flexShrink: 0,
//                   border: "2px solid",
//                   borderColor: alpha(accentColor, 0.5),
//                   position: "relative",
//                   bgcolor: alpha(accentColor, 0.1),
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <img
//                   src={photo.url}
//                   alt={label}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   onError={(e) => { e.target.style.display = "none"; }}
//                 />
//                 <Box
//                   sx={{
//                     position: "absolute", top: 2, left: 2,
//                     bgcolor: accentColor,
//                     borderRadius: "50%",
//                     width: 16, height: 16,
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     fontSize: "9px",
//                   }}
//                 >
//                   {emoji}
//                 </Box>
//               </Box>

//               {/* Info */}
//               <Box sx={{ flex: 1, minWidth: 0 }}>
//                 <Chip
//                   label={label}
//                   size="small"
//                   sx={{
//                     mb: 0.5, height: 18, fontSize: "0.55rem", fontWeight: 600,
//                     bgcolor: alpha(accentColor, 0.1),
//                     color: accentColor,
//                   }}
//                 />
//                 <Typography variant="caption" sx={{ fontSize: "0.62rem", display: "block", color: "text.primary", fontWeight: 500 }}>
//                   {fmtTime(photo.timestamp)}
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mt: 0.3 }}>
//                   <LocationOnIcon sx={{ fontSize: 10, color: "text.secondary" }} />
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       fontSize: "0.58rem", color: "text.secondary",
//                       overflow: "hidden", textOverflow: "ellipsis",
//                       whiteSpace: "nowrap", maxWidth: 140,
//                     }}
//                   >
//                     {photo.address}
//                   </Typography>
//                 </Box>
//                 <Typography
//                   variant="caption"
//                   sx={{ fontSize: "0.55rem", color: "#2196F3", display: "flex", alignItems: "center", gap: 0.3, mt: 0.5 }}
//                 >
//                   <LocationOnIcon sx={{ fontSize: 10 }} />
//                   Tap to go to location
//                 </Typography>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//       );
//     };

//     return (
//       <Drawer
//         anchor="right"
//         open={photoDrawerOpen}
//         onClose={() => setPhotoDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: { xs: "90%", sm: 360 },
//             borderTopLeftRadius: 16,
//             borderBottomLeftRadius: 16,
//           },
//         }}
//       >
//         <Box
//           sx={{
//             p: 1.5,
//             borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             bgcolor: alpha("#FF9800", 0.05),
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <CollectionsIcon sx={{ color: "#FF9800", fontSize: 20 }} />
//             <Box>
//               <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>
//                 Session Photos
//               </Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                 {sessionPhotos.length} photo{sessionPhotos.length !== 1 ? "s" : ""} • tap to locate on map
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={() => setPhotoDrawerOpen(false)} size="small">
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Box sx={{ overflow: "auto", height: "calc(100% - 64px)", p: 1.5 }}>
//           {sessionPhotos.length === 0 ? (
//             <Box sx={{ textAlign: "center", py: 6 }}>
//               <PhotoIcon sx={{ fontSize: 48, color: alpha("#FF9800", 0.3), mb: 1 }} />
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
//                 No photos in this session
//               </Typography>
//             </Box>
//           ) : (
//             <Stack spacing={1}>
//               {startPhotos.length > 0 && (
//                 <>
//                   <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", px: 0.5 }}>
//                     🚀 START POINT
//                   </Typography>
//                   <Stack spacing={1}>{startPhotos.map((p, i) => renderPhotoCard(p, i))}</Stack>
//                 </>
//               )}

//               {routePhotos.length > 0 && (
//                 <>
//                   <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#FF9800", textTransform: "uppercase", px: 0.5, pt: startPhotos.length > 0 ? 1.5 : 0.5 }}>
//                     📸 ROUTE PHOTOS ({routePhotos.length})
//                   </Typography>
//                   <Stack spacing={1}>{routePhotos.map((p, i) => renderPhotoCard(p, i))}</Stack>
//                 </>
//               )}

//               {endPhotos.length > 0 && (
//                 <>
//                   <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", px: 0.5, pt: 1.5 }}>
//                     🏁 END POINT
//                   </Typography>
//                   <Stack spacing={1}>{endPhotos.map((p, i) => renderPhotoCard(p, i))}</Stack>
//                 </>
//               )}
//             </Stack>
//           )}
//         </Box>
//       </Drawer>
//     );
//   };

//   // ── Session List ──────────────────────────────────────────────────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//       <Box sx={{ p: 1.5 }}>
//         <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.75rem", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
//           <PinDropIcon sx={{ fontSize: 16, color: "#2196F3" }} />
//           Sessions ({allSessions.length})
//           {(selectedDate || metadata?.selectedDate) && (
//             <Chip label={selectedDate || metadata?.selectedDate} size="small" sx={{ ml: "auto", height: 20, fontSize: "0.55rem", bgcolor: alpha("#2196F3", 0.1), color: "#2196F3" }} />
//           )}
//         </Typography>

//         <Stack spacing={1.5}>
//           {allSessions.map((session, index) => {
//             const sessionId = String(session.sessionId || session._id);
//             const isSelected = String(selectedSessionId) === sessionId;
//             const isLoading = isSelected && isLoadingSession;
//             const photoCount = getPhotoCount(session);
//             const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);

//             return (
//               <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                 <Card onClick={() => handleSessionSelect(sessionId)} sx={{
//                   cursor: "pointer",
//                   border: isSelected ? `2px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                   bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//                   transition: "all 0.2s ease",
//                   "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02), transform: "translateY(-2px)", boxShadow: 2 },
//                 }}>
//                   <CardContent sx={{ p: 1.5 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                       <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "white" : "#2196F3", fontSize: "0.75rem", fontWeight: "bold" }}>
//                         {isLoading ? <CircularProgress size={18} /> : index + 1}
//                       </Box>
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>Session #{index + 1}</Typography>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <ScheduleIcon sx={{ fontSize: 10 }} />
//                           {fmtDateTime(session.startTime || session.stats?.startTime)}
//                         </Typography>
//                       </Box>
//                       {photoCount > 0 && (
//                         <Chip icon={<PhotoIcon sx={{ fontSize: 12 }} />} label={photoCount} size="small" sx={{ height: 22, fontSize: "0.6rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }} />
//                       )}
//                     </Box>

//                     <Grid container spacing={1} sx={{ mb: 1 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
//                           <TimerIcon sx={{ fontSize: 14, color: "#FF9800" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Duration</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>{fmtDuration(stats.duration)}</Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
//                           <StraightenIcon sx={{ fontSize: 14, color: "#2196F3" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Distance</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>{fmtDist(stats.distance)}</Typography>
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
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Start</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtTime(stats.startTime)}</Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>End</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtTime(stats.endTime)}</Typography>
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
//           </Box>

//           {selectedSession && sessionPhotos.length > 0 && (
//             <IconButton onClick={() => setPhotoDrawerOpen(true)} size="small" sx={{ mr: 0.5, color: "#FF9800", bgcolor: alpha("#FF9800", 0.1), width: 32, height: 32 }}>
//               <Badge badgeContent={sessionPhotos.length} color="warning" sx={{ "& .MuiBadge-badge": { fontSize: "0.5rem", minWidth: 14, height: 14 } }}>
//                 <CollectionsIcon sx={{ fontSize: 16 }} />
//               </Badge>
//             </IconButton>
//           )}

//           {isMobile && (
//             <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={() => setDrawerOpen(true)} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
//         <Grid container sx={{ height: "calc(100vh - 48px)" }}>
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#f0f0f0" }} />

//             {isLoadingSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {selectedSession && sessionPhotos.length > 0 && (
//               <Fab size="small" onClick={() => setPhotoDrawerOpen(true)} sx={{ position: "absolute", top: 12, right: 12, zIndex: 500, bgcolor: "#FF9800", color: "white", width: 40, height: 40 }}>
//                 <Badge badgeContent={sessionPhotos.length} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "0.5rem", minWidth: 14, height: 14 } }}>
//                   <CollectionsIcon sx={{ fontSize: 18 }} />
//                 </Badge>
//               </Fab>
//             )}

//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: "absolute", top: 12, left: 52, p: { xs: 1, sm: 1.5 }, borderRadius: 2, maxWidth: { xs: 200, sm: 260 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.95)" }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.7rem", sm: "0.75rem" }, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
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
//                     <Typography variant="caption" sx={{ color: "#22c55e" }}>Start: {fmtTime(startTime)}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444" }}>End: {fmtTime(endTime)}</Typography>
//                   </Box>
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
//           <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={() => setDrawerOpen(true)}>
//             <MenuIcon />
//           </Fab>
//           <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { width: "85%", maxWidth: 320, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 } }}>
//             <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600}>Sessions</Typography>
//                 {(selectedDate || metadata?.selectedDate) && (
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>{selectedDate || metadata?.selectedDate}</Typography>
//                 )}
//               </Box>
//               <IconButton onClick={() => setDrawerOpen(false)} size="small"><CloseIcon /></IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 60px)", overflow: "auto" }}>{renderSessionList()}</Box>
//           </Drawer>
//         </>
//       )}

//       {renderPhotoDrawer()}
//     </Box>
//   );
// };

// export default Locations;



// Double Img Problame Resolve 

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
//   Badge,
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
//   Collections as CollectionsIcon,
//   LocationOn as LocationOnIcon,
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
//   const lat = location?.latitude || location?.lat;
//   const lng = location?.longitude || location?.lng;
//   return (
//     lat !== 0 && lat !== null && lat !== undefined &&
//     lng !== 0 && lng !== null && lng !== undefined &&
//     !isNaN(lat) && !isNaN(lng)
//   );
// };

// const hasValidPhoto = (photo) => {
//   return !!(
//     photo &&
//     photo.url &&
//     photo.url !== null &&
//     photo.url !== "" &&
//     typeof photo.url === "string" &&
//     (photo.url.startsWith("http://") || photo.url.startsWith("https://"))
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

// const fmtDist = (meters) => {
//   if (!meters || meters === 0) return "0 km";
//   if (meters < 1000) return `${Math.round(meters)} m`;
//   return `${Math.floor((meters / 1000) * 10) / 10} km`;
// };

// const fmtDuration = (seconds) => {
//   if (!seconds || seconds === 0) return "0 sec";
//   if (seconds < 60) return `${seconds.toFixed(2)} sec`;
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = (seconds % 60).toFixed(0);
//   if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
//   if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
//   return `${seconds.toFixed(2)} sec`;
// };

// const getSessionStats = (session) => {
//   if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [] };

//   let duration = 0;
//   if (session.duration) duration = session.duration;
//   else if (session.stats?.duration) duration = session.stats.duration;
//   else if (session.totalDuration) duration = session.totalDuration;

//   let distance = 0;
//   if (session.totalDistance) distance = session.totalDistance;
//   else if (session.stats?.totalDistance) distance = session.stats.totalDistance;
//   else if (session.distance) distance = session.distance;

//   const locations = session.locations || session.timeline || [];

//   if ((!duration || duration === 0) && locations.length >= 2) {
//     const firstLoc = locations[0];
//     const lastLoc = locations[locations.length - 1];
//     if (firstLoc?.timestamp && lastLoc?.timestamp) {
//       duration = (new Date(lastLoc.timestamp) - new Date(firstLoc.timestamp)) / 1000;
//     }
//   }

//   if ((!distance || distance === 0) && locations.length >= 2) {
//     distance = calcTotalDistance(locations);
//   }

//   return {
//     distance,
//     duration,
//     startTime: session.startTime || session.stats?.startTime || null,
//     endTime: session.endTime || session.stats?.endTime || null,
//     locations,
//   };
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

// const makeStartWithPhotoIcon = (photoUrl, time, size = 38) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #22c55e, #15803d);border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
//         <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
//         <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center;">
//           <span style="position:absolute;bottom:2px;right:2px;background:#22c55e;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🚀</span>
//         </div>
//       </div>
//       <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #22c55e;z-index:1;font-weight:500;">
//         ${time} 📍 START
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 28],
//     iconAnchor: [size / 2, size + 15],
//   });

// const makeEndWithPhotoIcon = (photoUrl, time, size = 38) =>
//   L.divIcon({
//     html: `<div style="position:relative;width:${size}px;height:${size}px;">
//       <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #ef4444, #dc2626);border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
//         <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
//         <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;">
//           <span style="position:absolute;bottom:2px;right:2px;background:#ef4444;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🏁</span>
//         </div>
//       </div>
//       <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #ef4444;z-index:1;font-weight:500;">
//         ${time} 🏁 END
//       </div>
//     </div>`,
//     className: "",
//     iconSize: [size, size + 28],
//     iconAnchor: [size / 2, size + 15],
//   });

// // ─── Helper: check if two lat/lng pairs are the same location ─────────────────
// const isSameLatLng = (lat1, lng1, lat2, lng2) =>
//   Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;

// // ─── Main Component ────────────────────────────────────────────────────────────
// const Locations = () => {
//   const theme = useTheme();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   const {
//     sessions = [],
//     selectedSessionId: initialSelectedSessionId,
//     selectedDate,
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
//   const [hasLocations, setHasLocations] = useState(false);
//   const [showPhotoMarkers, setShowPhotoMarkers] = useState(true);
//   const [isMapInitialized, setIsMapInitialized] = useState(false);
//   const [isLoadingSession, setIsLoadingSession] = useState(false);
//   const [sessionStatsMap, setSessionStatsMap] = useState(new Map());

//   // ── Single activeDrawer: null | "sessions" | "photos" ─────────────────────
//   // Opening one automatically closes the other — no two drawers open at once.
//   const [activeDrawer, setActiveDrawer] = useState(null);

//   const [sessionPhotos, setSessionPhotos] = useState([]);
//   const [startPoint, setStartPoint] = useState(null);
//   const [endPoint, setEndPoint] = useState(null);

//   // ── Refs ───────────────────────────────────────────────────────────────────
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const polylines = useRef([]);
//   const markers = useRef([]);
//   const markerRefs = useRef(new Map());
//   const fetchedSessions = useRef(new Set());
//   const sessionDataCache = useRef(new Map());

//   // ── Drawer open/close helpers ──────────────────────────────────────────────
//   // Setting activeDrawer to "sessions" closes photos and vice versa.
//   const openSessionDrawer  = useCallback(() => setActiveDrawer("sessions"), []);
//   const openPhotoDrawer    = useCallback(() => setActiveDrawer("photos"),   []);
//   const closeActiveDrawer  = useCallback(() => setActiveDrawer(null),       []);

//   const drawerOpen      = activeDrawer === "sessions";
//   const photoDrawerOpen = activeDrawer === "photos";

//   // Shared Paper width/radius for both drawers — same position, same size
//   const drawerPaperSx = {
//     width: { xs: "90%", sm: 360 },
//     borderTopLeftRadius: 16,
//     borderBottomLeftRadius: 16,
//   };

//   // ─── Get start and end points from photos ──────────────────────────────────
//   const getStartEndFromPhotos = useCallback((session) => {
//     if (!session) return { startPoint: null, endPoint: null };

//     const photos = session.photos || [];
//     const validPhotos = photos.filter(
//       (p) => hasValidPhoto(p) && p.location && hasValidCoordinates(p.location)
//     );

//     if (validPhotos.length === 0) {
//       const stats = getSessionStats(session);
//       const locs = getValidLocations(stats.locations);
//       return {
//         startPoint: locs.length > 0 ? locs[0] : null,
//         endPoint: locs.length > 1 ? locs[locs.length - 1] : null,
//       };
//     }

//     const sortedPhotos = [...validPhotos].sort(
//       (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
//     );

//     const firstPhoto = sortedPhotos[0];
//     const lastPhoto  = sortedPhotos[sortedPhotos.length - 1];

//     return {
//       startPoint: {
//         lat: getLat(firstPhoto.location),
//         lng: getLng(firstPhoto.location),
//         timestamp: firstPhoto.timestamp,
//         address: firstPhoto.address,
//         photo: firstPhoto.url,
//       },
//       endPoint: {
//         lat: getLat(lastPhoto.location),
//         lng: getLng(lastPhoto.location),
//         timestamp: lastPhoto.timestamp,
//         address: lastPhoto.address,
//         photo: lastPhoto.url,
//       },
//     };
//   }, []);

//   // ─── Build photo list — FIX: deduplicate by url AND lat/lng ───────────────
//   // A photo is the "start" photo if its url matches sp.photo OR its coords
//   // match sp's coords. Same for end. Route photos are everything else.
//   // We also deduplicate by url so the same image never appears twice.
//   // const buildSessionPhotos = useCallback((session) => {
//   //   if (!session) return [];

//   //   const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
//   //   const result = [];
//   //   const seenUrls = new Set();

//   //   // ── 1. Start photo ──────────────────────────────────────────────────
//   //   if (sp && sp.photo && !seenUrls.has(sp.photo)) {
//   //     seenUrls.add(sp.photo);
//   //     result.push({
//   //       key: "start",
//   //       url: sp.photo,
//   //       timestamp: sp.timestamp,
//   //       address: sp.address,
//   //       lat: sp.lat,
//   //       lng: sp.lng,
//   //       type: "start",
//   //     });
//   //   }

//   //   // ── 2. Route photos — skip start, skip end, skip already-seen urls ──
//   //   const rawPhotos = session.photos || [];
//   //   rawPhotos.forEach((photo, idx) => {
//   //     if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//   //     if (seenUrls.has(photo.url)) return; // duplicate url → skip

//   //     const pLat = getLat(photo.location);
//   //     const pLng = getLng(photo.location);

//   //     // Skip if coords match start point
//   //     if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
//   //     // Skip if coords match end point
//   //     if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;

//   //     seenUrls.add(photo.url);
//   //     result.push({
//   //       key: `photo_${idx}`,
//   //       idx,
//   //       url: photo.url,
//   //       timestamp: photo.timestamp,
//   //       address: photo.address || "Address not available",
//   //       lat: pLat,
//   //       lng: pLng,
//   //       type: "route",
//   //     });
//   //   });

//   //   // ── 3. End photo — only if it's a different location from start ─────
//   //   if (
//   //     ep && ep.photo &&
//   //     !seenUrls.has(ep.photo) &&
//   //     !(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng))
//   //   ) {
//   //     seenUrls.add(ep.photo);
//   //     result.push({
//   //       key: "end",
//   //       url: ep.photo,
//   //       timestamp: ep.timestamp,
//   //       address: ep.address,
//   //       lat: ep.lat,
//   //       lng: ep.lng,
//   //       type: "end",
//   //     });
//   //   }

//   //   return result;
//   // }, [getStartEndFromPhotos]);
// // ─── Build photo list — FIX: deduplicate by url AND lat/lng AND timestamp ───────────────
// // A photo is the "start" photo if its url matches sp.photo OR its coords
// // match sp's coords. Same for end. Route photos are everything else.
// // We also deduplicate by url so the same image never appears twice.
// // Additionally, we deduplicate by lat/lng combination to avoid showing multiple photos at same location
// const buildSessionPhotos = useCallback((session) => {
//   if (!session) return [];

//   const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
//   const result = [];
//   const seenUrls = new Set();
//   const seenLatLng = new Set(); // Track unique lat/lng combinations

//   // Helper to create a key for lat/lng
//   const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

//   // ── 1. Start photo ──────────────────────────────────────────────────
//   if (sp && sp.photo && !seenUrls.has(sp.photo)) {
//     const latLngKey = getLatLngKey(sp.lat, sp.lng);
//     if (!seenLatLng.has(latLngKey)) {
//       seenUrls.add(sp.photo);
//       seenLatLng.add(latLngKey);
//       result.push({
//         key: "start",
//         url: sp.photo,
//         timestamp: sp.timestamp,
//         address: sp.address,
//         lat: sp.lat,
//         lng: sp.lng,
//         type: "start",
//       });
//     }
//   }

//   // ── 2. Route photos — skip start, skip end, skip already-seen urls and lat/lng ──
//   const rawPhotos = session.photos || [];
//   rawPhotos.forEach((photo, idx) => {
//     if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//     if (seenUrls.has(photo.url)) return; // duplicate url → skip

//     const pLat = getLat(photo.location);
//     const pLng = getLng(photo.location);
//     const latLngKey = getLatLngKey(pLat, pLng);

//     // Skip if coords match start point
//     if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
//     // Skip if coords match end point
//     if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;
//     // Skip if we already have a photo at these coordinates
//     if (seenLatLng.has(latLngKey)) return;

//     seenUrls.add(photo.url);
//     seenLatLng.add(latLngKey);
//     result.push({
//       key: `photo_${idx}`,
//       idx,
//       url: photo.url,
//       timestamp: photo.timestamp,
//       address: photo.address || "Address not available",
//       lat: pLat,
//       lng: pLng,
//       type: "route",
//     });
//   });

//   // ── 3. End photo — only if it's a different location from start ─────
//   if (
//     ep && ep.photo &&
//     !seenUrls.has(ep.photo)
//   ) {
//     const latLngKey = getLatLngKey(ep.lat, ep.lng);
//     // Skip if end coordinates are same as start
//     if (!(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng)) && !seenLatLng.has(latLngKey)) {
//       seenUrls.add(ep.photo);
//       seenLatLng.add(latLngKey);
//       result.push({
//         key: "end",
//         url: ep.photo,
//         timestamp: ep.timestamp,
//         address: ep.address,
//         lat: ep.lat,
//         lng: ep.lng,
//         type: "end",
//       });
//     }
//   }

//   return result;
// }, [getStartEndFromPhotos]);
//   // Fetch available dates
//   useEffect(() => {
//     const userId = metadata?.userId || metadata?.trackId;
//     const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;
//     if (userId && dateToUse) {
//       dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
//     }
//   }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

//   // Init sessions
//   useEffect(() => {
//     if (sessions && sessions.length > 0) {
//       setAllSessions(sessions);
//       const statsMap = new Map();
//       sessions.forEach((session) => {
//         const id = String(session.sessionId || session._id);
//         const stats = getSessionStats(session);
//         statsMap.set(id, stats);
//         sessionDataCache.current.set(id, { ...session, ...stats });
//       });
//       setSessionStatsMap(statsMap);
//     }
//   }, [sessions]);

//   // Update start/end points and photo list when selected session changes
//   useEffect(() => {
//     if (selectedSession) {
//       const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(selectedSession);
//       setStartPoint(sp);
//       setEndPoint(ep);
//       setSessionPhotos(buildSessionPhotos(selectedSession));
//     }
//   }, [selectedSession, getStartEndFromPhotos, buildSessionPhotos]);
// // console.log(sessionPhotos);

//   // Process session data
//   const processSessionData = useCallback(
//     (sessionData) => {
//       if (!sessionData) return;
//       setSelectedSession(sessionData);
//       setIsLoadingSession(false);

//       const stats = getSessionStats(sessionData);
//       const allLocations = stats.locations || [];
//       const validLocations = getValidLocations(allLocations);

//       if (validLocations.length > 0) {
//         setHasLocations(true);
//         setTotalDistance(stats.distance);
//         setTotalDuration(stats.duration);
//         setStartTime(stats.startTime);
//         setEndTime(stats.endTime);
//         if (mapInstance.current) {
//           setTimeout(() => drawMapWithSession(sessionData, showPhotoMarkers), 100);
//         }
//       } else {
//         setHasLocations(false);
//       }
//     },
//     [showPhotoMarkers]
//   );

//   // Handle session click
//   const handleSessionSelect = useCallback(
//     (sessionId) => {
//       const id = String(sessionId);
//       if (selectedSessionId === id && selectedSession) return;

//       setSelectedSessionId(id);
//       setIsLoadingSession(true);

//       if (sessionDataCache.current.has(id)) {
//         const cachedSession = sessionDataCache.current.get(id);
//         if (cachedSession.locations && cachedSession.locations.length > 0) {
//           processSessionData(cachedSession);
//           return;
//         }
//       }

//       const foundSession = allSessions.find((s) => String(s.sessionId || s._id) === id);
//       if (foundSession) {
//         if (foundSession.locations && foundSession.locations.length > 0) {
//           const stats = getSessionStats(foundSession);
//           const sessionWithStats = { ...foundSession, ...stats };
//           sessionDataCache.current.set(id, sessionWithStats);
//           processSessionData(sessionWithStats);
//         } else if (!fetchedSessions.current.has(id)) {
//           const userId = metadata?.userId || metadata?.trackId;
//           if (userId) {
//             fetchedSessions.current.add(id);
//             dispatch(getSessionDetails({ userId, sessionId: id }));
//           } else {
//             setIsLoadingSession(false);
//             setSelectedSession(null);
//             setHasLocations(false);
//           }
//         }
//       } else {
//         setIsLoadingSession(false);
//         setSelectedSession(null);
//         setHasLocations(false);
//       }

//       // Drawer stays open — user closes it manually
//       if (isMobile) setActiveDrawer("sessions");
//     },
//     [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
//   );

//   // Watch Redux sessionDetails
//   useEffect(() => {
//     if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
//       const id = String(sessionDetails.sessionId);
//       const stats = getSessionStats(sessionDetails);
//       const sessionWithStats = { ...sessionDetails, ...stats };
//       sessionDataCache.current.set(id, sessionWithStats);
//       setSessionStatsMap((prev) => {
//         const newMap = new Map(prev);
//         newMap.set(id, stats);
//         return newMap;
//       });
//       processSessionData(sessionWithStats);
//     }
//   }, [sessionDetails, selectedSessionId, processSessionData]);

//   // Auto-select initial session
//   useEffect(() => {
//     if (allSessions.length > 0 && !selectedSessionId && !selectedSession) {
//       const firstId = initialSelectedSessionId
//         ? String(initialSelectedSessionId)
//         : String(allSessions[0].sessionId || allSessions[0]._id);
//       handleSessionSelect(firstId);
//     }
//   }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

//   // ── Map helpers ────────────────────────────────────────────────────────────
//   const clearMap = () => {
//     if (!mapInstance.current) return;
//     polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
//     markers.current.forEach((m) => mapInstance.current.removeLayer(m));
//     polylines.current = [];
//     markers.current = [];
//     markerRefs.current.clear();
//   };

//   // ── Main draw function ─────────────────────────────────────────────────────
//   const drawMapWithSession = useCallback((session, showPhotos) => {
//     if (!mapInstance.current) return;

//     const stats = getSessionStats(session);
//     const allLocations = stats.locations || [];
//     if (!allLocations.length) return;

//     clearMap();
//     const validLocations = getValidLocations(allLocations);
//     if (validLocations.length === 0) return;

//     for (let i = 0; i < validLocations.length - 1; i++) {
//       const line = L.polyline(
//         [
//           [getLat(validLocations[i]), getLng(validLocations[i])],
//           [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])],
//         ],
//         {
//           color: validLocations[i].isOnline === true ? "#3553ea" : "#ef4444",
//           weight: 3,
//           opacity: 0.8,
//           lineJoin: "round",
//           lineCap: "round",
//         }
//       ).addTo(mapInstance.current);
//       polylines.current.push(line);
//     }

//     // START marker
//     if (startPoint && hasValidCoordinates(startPoint)) {
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🚀</span><b>START POINT</b></div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(startPoint)}</div>
//         <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//           <b>📸 Start Photo</b><br/>
//           <img src="${startPoint.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${startPoint.photo}','_blank')"/>
//         </div>
//       </div>`;
//       const icon = makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 38);
//       const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     } else if (validLocations.length > 0) {
//       const fb = validLocations[0];
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🚀</span><b>START POINT</b></div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(fb)}</div>
//       </div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 32), zIndexOffset: 1000 })
//         .bindPopup(popupContent).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("start", m);
//     }

//     // END marker
//     if (endPoint && hasValidCoordinates(endPoint)) {
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🏁</span><b>END POINT</b></div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(endPoint.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(endPoint.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(endPoint)}</div>
//         <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
//           <b>📸 End Photo</b><br/>
//           <img src="${endPoint.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${endPoint.photo}','_blank')"/>
//         </div>
//       </div>`;
//       const icon = makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 38);
//       const m = L.marker([endPoint.lat, endPoint.lng], { icon, zIndexOffset: 1000 })
//         .bindPopup(popupContent).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     } else if (validLocations.length > 1) {
//       const fb = validLocations[validLocations.length - 1];
//       const popupContent = `<div style="min-width:240px;max-width:300px;">
//         <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
//           <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🏁</span><b>END POINT</b></div>
//         </div>
//         <div><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
//         <div><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
//         <div><b>Address:</b> ${getAddress(fb)}</div>
//       </div>`;
//       const m = L.marker([getLat(fb), getLng(fb)], { icon: makeEndIcon("#ef4444", fmtTime(fb.timestamp), false, 32), zIndexOffset: 1000 })
//         .bindPopup(popupContent).addTo(mapInstance.current);
//       markers.current.push(m);
//       markerRefs.current.set("end", m);
//     }

//     // Mid-route photo markers (skip start/end coords)
//     if (showPhotos && session.photos && session.photos.length > 0) {
//       session.photos.forEach((photo, idx) => {
//         if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
//         const lat = photo.location.lat || photo.location.latitude;
//         const lng = photo.location.lng || photo.location.longitude;
//         if (startPoint && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
//         if (endPoint   && isSameLatLng(lat, lng, endPoint.lat,   endPoint.lng))   return;

//         const popup = `<div style="min-width:240px;max-width:300px;">
//           <div style="background:#FF9800;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;"><b>📸 ROUTE PHOTO ${idx + 1}</b></div>
//           <div><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
//           <div><b>Address:</b> ${photo.address || "Address not available"}</div>
//           <div style="margin-top:8px;"><img src="${photo.url}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photo.url}','_blank')"/></div>
//         </div>`;
//         const m = L.marker([lat, lng], { icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 32), zIndexOffset: 950 })
//           .bindPopup(popup).addTo(mapInstance.current);
//         markers.current.push(m);
//         markerRefs.current.set(`photo_${idx}`, m);
//       });
//     }

//     if (validLocations.length > 0) {
//       const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
//       mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
//     }
//   }, [startPoint, endPoint]);

//   // Initialize Map
//   useEffect(() => {
//     if (!mapRef.current || isMapInitialized) return;
//     const map = L.map(mapRef.current, { zoomControl: true, center: [16.703, 74.251], zoom: 13 });
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap",
//       maxZoom: 19,
//     }).addTo(map);
//     mapInstance.current = map;
//     setIsMapInitialized(true);
//     if (selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 200);
//     }
//   }, [isMapInitialized, selectedSession, showPhotoMarkers, drawMapWithSession]);

//   // Redraw on session or start/end points change
//   useEffect(() => {
//     if (mapInstance.current && selectedSession) {
//       setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
//     }
//   }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

//   // Resize
//   useEffect(() => {
//     const onResize = () => {
//       if (mapInstance.current) setTimeout(() => mapInstance.current.invalidateSize(), 100);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (mapInstance.current) {
//         mapInstance.current.remove();
//         mapInstance.current = null;
//       }
//     };
//   }, []);

//   const getPhotoCount = (session) => {
//     if (!session) return 0;
//     return session.photos?.length || 0;
//   };

//   // Fly to photo marker, close drawer
//   const handlePhotoClick = (photo) => {
//     closeActiveDrawer();
//     if (!mapInstance.current) return;
//     const markerKey = photo.key;
//     if (markerRefs.current.has(markerKey)) {
//       const m = markerRefs.current.get(markerKey);
//       mapInstance.current.flyTo(m.getLatLng(), 17, { animate: true, duration: 1 });
//       setTimeout(() => m.openPopup(), 1100);
//       return;
//     }
//     if (photo.lat && photo.lng) {
//       mapInstance.current.flyTo([photo.lat, photo.lng], 17, { animate: true, duration: 1 });
//     }
//   };

//   // ── Photo Gallery Drawer ──────────────────────────────────────────────────
//   const renderPhotoDrawer = () => {
//     const startPhotos = sessionPhotos.filter((p) => p.type === "start");
//     const routePhotos = sessionPhotos.filter((p) => p.type === "route");
//     const endPhotos   = sessionPhotos.filter((p) => p.type === "end");

//     const renderPhotoCard = (photo, i) => {
//       const accentColor =
//         photo.type === "start" ? "#22c55e" :
//         photo.type === "end"   ? "#ef4444" : "#FF9800";
//       const label =
//         photo.type === "start" ? "Start Point" :
//         photo.type === "end"   ? "End Point"   :
//         `Route Photo ${(photo.idx ?? i) + 1}`;
//       const emoji =
//         photo.type === "start" ? "🚀" :
//         photo.type === "end"   ? "🏁" : "📸";

//       return (
//         <Card
//           key={photo.key || i}
//           elevation={0}
//           onClick={() => handlePhotoClick(photo)}
//           sx={{
//             cursor: "pointer",
//             border: "1px solid",
//             borderColor: alpha(accentColor, 0.3),
//             borderRadius: 2,
//             transition: "all 0.2s",
//             "&:hover": { boxShadow: 3, borderColor: accentColor, transform: "translateY(-1px)" },
//           }}
//         >
//           <CardContent sx={{ p: 1.2, "&:last-child": { pb: 1.2 } }}>
//             <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-start" }}>
//               <Box sx={{
//                 width: 64, height: 64, borderRadius: 1.5, overflow: "hidden", flexShrink: 0,
//                 border: "2px solid", borderColor: alpha(accentColor, 0.5), position: "relative",
//                 bgcolor: alpha(accentColor, 0.1), display: "flex", alignItems: "center", justifyContent: "center",
//               }}>
//                 <img src={photo.url} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
//                 <Box sx={{ position: "absolute", top: 2, left: 2, bgcolor: accentColor, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px" }}>
//                   {emoji}
//                 </Box>
//               </Box>
//               <Box sx={{ flex: 1, minWidth: 0 }}>
//                 <Chip label={label} size="small" sx={{ mb: 0.5, height: 18, fontSize: "0.55rem", fontWeight: 600, bgcolor: alpha(accentColor, 0.1), color: accentColor }} />
//                 <Typography variant="caption" sx={{ fontSize: "0.62rem", display: "block", color: "text.primary", fontWeight: 500 }}>
//                   {fmtTime(photo.timestamp)}
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mt: 0.3 }}>
//                   <LocationOnIcon sx={{ fontSize: 10, color: "text.secondary" }} />
//                   <Typography variant="caption" sx={{ fontSize: "0.58rem", color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
//                     {photo.address}
//                   </Typography>
//                 </Box>
//                 <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "#2196F3", display: "flex", alignItems: "center", gap: 0.3, mt: 0.5 }}>
//                   <LocationOnIcon sx={{ fontSize: 10 }} />
//                   Tap to go to location
//                 </Typography>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//       );
//     };

//     return (
//       <Drawer
//         anchor="right"
//         open={photoDrawerOpen}
//         onClose={closeActiveDrawer}
//         PaperProps={{ sx: drawerPaperSx }}
//       >
//         <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: alpha("#FF9800", 0.05) }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <CollectionsIcon sx={{ color: "#FF9800", fontSize: 20 }} />
//             <Box>
//               <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.8rem" }}>Session Photos</Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>
//                 {sessionPhotos.length} photo{sessionPhotos.length !== 1 ? "s" : ""} • tap to locate on map
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon /></IconButton>
//         </Box>

//         <Box sx={{ overflow: "auto", height: "calc(100% - 64px)", p: 1.5 }}>
//           {sessionPhotos.length === 0 ? (
//             <Box sx={{ textAlign: "center", py: 6 }}>
//               <PhotoIcon sx={{ fontSize: 48, color: alpha("#FF9800", 0.3), mb: 1 }} />
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>No photos in this session</Typography>
//             </Box>
//           ) : (
//             <Stack spacing={1}>
//               {startPhotos.length > 0 && (
//                 <>
//                   <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", px: 0.5 }}>🚀 START POINT</Typography>
//                   <Stack spacing={1}>{startPhotos.map((p, i) => renderPhotoCard(p, i))}</Stack>
//                 </>
//               )}
//               {routePhotos.length > 0 && (
//                 <>
//                   <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#FF9800", textTransform: "uppercase", px: 0.5, pt: startPhotos.length > 0 ? 1.5 : 0.5 }}>
//                     📸 ROUTE PHOTOS ({routePhotos.length})
//                   </Typography>
//                   <Stack spacing={1}>{routePhotos.map((p, i) => renderPhotoCard(p, i))}</Stack>
//                 </>
//               )}
//               {endPhotos.length > 0 && (
//                 <>
//                   <Typography variant="caption" sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#ef4444", textTransform: "uppercase", px: 0.5, pt: 1.5 }}>🏁 END POINT</Typography>
//                   <Stack spacing={1}>{endPhotos.map((p, i) => renderPhotoCard(p, i))}</Stack>
//                 </>
//               )}
//             </Stack>
//           )}
//         </Box>
//       </Drawer>
//     );
//   };

//   // ── Session List ──────────────────────────────────────────────────────────
//   const renderSessionList = () => (
//     <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
//       <Box sx={{ p: 1.5 }}>
//         <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.75rem", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
//           <PinDropIcon sx={{ fontSize: 16, color: "#2196F3" }} />
//           Sessions ({allSessions.length})
//           {(selectedDate || metadata?.selectedDate) && (
//             <Chip label={selectedDate || metadata?.selectedDate} size="small" sx={{ ml: "auto", height: 20, fontSize: "0.55rem", bgcolor: alpha("#2196F3", 0.1), color: "#2196F3" }} />
//           )}
//         </Typography>

//         <Stack spacing={1.5}>
//           {allSessions.map((session, index) => {
//             const sessionId  = String(session.sessionId || session._id);
//             const isSelected = String(selectedSessionId) === sessionId;
//             const isLoading  = isSelected && isLoadingSession;
//             const photoCount = getPhotoCount(session);
//             const stats      = sessionStatsMap.get(sessionId) || getSessionStats(session);

//             return (
//               <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
//                 <Card onClick={() => handleSessionSelect(sessionId)} sx={{
//                   cursor: "pointer",
//                   border: isSelected ? `2px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
//                   bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
//                   transition: "all 0.2s ease",
//                   "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02), transform: "translateY(-2px)", boxShadow: 2 },
//                 }}>
//                   <CardContent sx={{ p: 1.5 }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//                       <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "white" : "#2196F3", fontSize: "0.75rem", fontWeight: "bold" }}>
//                         {isLoading ? <CircularProgress size={18} /> : index + 1}
//                       </Box>
//                       <Box sx={{ flex: 1 }}>
//                         <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>Session #{index + 1}</Typography>
//                         <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <ScheduleIcon sx={{ fontSize: 10 }} />
//                           {fmtDateTime(session.startTime || session.stats?.startTime)}
//                         </Typography>
//                       </Box>
//                       {photoCount > 0 && (
//                         <Chip icon={<PhotoIcon sx={{ fontSize: 12 }} />} label={photoCount} size="small" sx={{ height: 22, fontSize: "0.6rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }} />
//                       )}
//                     </Box>

//                     <Grid container spacing={1} sx={{ mb: 1 }}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
//                           <TimerIcon sx={{ fontSize: 14, color: "#FF9800" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Duration</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>{fmtDuration(stats.duration)}</Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
//                           <StraightenIcon sx={{ fontSize: 14, color: "#2196F3" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Distance</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>{fmtDist(stats.distance)}</Typography>
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
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Start</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtTime(stats.startTime)}</Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                           <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
//                           <Box>
//                             <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>End</Typography>
//                             <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtTime(stats.endTime)}</Typography>
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
//           </Box>

//           {/* Photos button — opens photo drawer, closes session drawer */}
//           {selectedSession && sessionPhotos.length > 0 && (
//             <IconButton onClick={openPhotoDrawer} size="small" sx={{ mr: 0.5, color: "#FF9800", bgcolor: alpha("#FF9800", 0.1), width: 32, height: 32 }}>
//               <Badge badgeContent={sessionPhotos.length} color="warning" sx={{ "& .MuiBadge-badge": { fontSize: "0.5rem", minWidth: 14, height: 14 } }}>
//                 <CollectionsIcon sx={{ fontSize: 16 }} />
//               </Badge>
//             </IconButton>
//           )}

//           {/* Sessions button on mobile */}
//           {isMobile && (
//             <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
//               {allSessions.length}
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
//         <Grid container sx={{ height: "calc(100vh - 48px)" }}>
//           {/* Map */}
//           <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
//             <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#f0f0f0" }} />

//             {isLoadingSession && (
//               <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
//                 <CircularProgress size={40} sx={{ color: "#2196F3" }} />
//               </Box>
//             )}

//             {selectedSession && sessionPhotos.length > 0 && (
//               <Fab size="small" onClick={openPhotoDrawer} sx={{ position: "absolute", top: 12, right: 12, zIndex: 500, bgcolor: "#FF9800", color: "white", width: 40, height: 40 }}>
//                 <Badge badgeContent={sessionPhotos.length} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "0.5rem", minWidth: 14, height: 14 } }}>
//                   <CollectionsIcon sx={{ fontSize: 18 }} />
//                 </Badge>
//               </Fab>
//             )}

//             {selectedSession && hasLocations && (
//               <Paper sx={{ position: "absolute", top: 12, left: 52, p: { xs: 1, sm: 1.5 }, borderRadius: 2, maxWidth: { xs: 200, sm: 260 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.95)" }}>
//                 <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.7rem", sm: "0.75rem" }, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
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
//                     <Typography variant="caption" sx={{ color: "#22c55e" }}>Start: {fmtTime(startTime)}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                     <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
//                     <Typography variant="caption" sx={{ color: "#ef4444" }}>End: {fmtTime(endTime)}</Typography>
//                   </Box>
//                 </Box>
//               </Paper>
//             )}
//           </Grid>

//           {/* Desktop: session list as right panel */}
//           {!isMobile && (
//             <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}>
//               {renderSessionList()}
//             </Grid>
//           )}
//         </Grid>
//       </Container>

//       {/* Mobile: session list as drawer — same anchor/size as photo drawer */}
//       {isMobile && (
//         <>
//           <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
//             <MenuIcon />
//           </Fab>

//           {/* Session drawer */}
//           <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: drawerPaperSx }}>
//             <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Box>
//                 <Typography variant="subtitle1" fontWeight={600}>Sessions</Typography>
//                 {(selectedDate || metadata?.selectedDate) && (
//                   <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>{selectedDate || metadata?.selectedDate}</Typography>
//                 )}
//               </Box>
//               <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon /></IconButton>
//             </Box>
//             <Box sx={{ height: "calc(100% - 60px)", overflow: "auto" }}>{renderSessionList()}</Box>
//           </Drawer>
//         </>
//       )}

//       {/* Photo drawer — same anchor/size on both mobile and desktop */}
//       {renderPhotoDrawer()}
//     </Box>
//   );
// };

// export default Locations;


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
  Badge,
  Modal,
  Fade,
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
  Collections as CollectionsIcon,
  LocationOn as LocationOnIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
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
  const lat = location?.latitude || location?.lat;
  const lng = location?.longitude || location?.lng;
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
  if (seconds < 60) return `${seconds.toFixed(2)} sec`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = (seconds % 60).toFixed(0);
  if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${seconds.toFixed(2)} sec`;
};

const getSessionStats = (session) => {
  if (!session) return { distance: 0, duration: 0, startTime: null, endTime: null, locations: [] };

  let duration = 0;
  if (session.duration) duration = session.duration;
  else if (session.stats?.duration) duration = session.stats.duration;
  else if (session.totalDuration) duration = session.totalDuration;

  let distance = 0;
  if (session.totalDistance) distance = session.totalDistance;
  else if (session.stats?.totalDistance) distance = session.stats.totalDistance;
  else if (session.distance) distance = session.distance;

  const locations = session.locations || session.timeline || [];

  if ((!duration || duration === 0) && locations.length >= 2) {
    const firstLoc = locations[0];
    const lastLoc = locations[locations.length - 1];
    if (firstLoc?.timestamp && lastLoc?.timestamp) {
      duration = (new Date(lastLoc.timestamp) - new Date(firstLoc.timestamp)) / 1000;
    }
  }

  if ((!distance || distance === 0) && locations.length >= 2) {
    distance = calcTotalDistance(locations);
  }

  return {
    distance,
    duration,
    startTime: session.startTime || session.stats?.startTime || null,
    endTime: session.endTime || session.stats?.endTime || null,
    locations,
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

const makeStartWithPhotoIcon = (photoUrl, time, size = 38) =>
  L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #22c55e, #15803d);border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center;">
          <span style="position:absolute;bottom:2px;right:2px;background:#22c55e;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🚀</span>
        </div>
      </div>
      <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #22c55e;z-index:1;font-weight:500;">
        ${time} 📍 START
      </div>
    </div>`,
    className: "",
    iconSize: [size, size + 28],
    iconAnchor: [size / 2, size + 15],
  });

const makeEndWithPhotoIcon = (photoUrl, time, size = 38) =>
  L.divIcon({
    html: `<div style="position:relative;width:${size}px;height:${size}px;">
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg, #ef4444, #dc2626);border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);z-index:2;overflow:hidden;">
        <img src="${photoUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'"/>
        <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;">
          <span style="position:absolute;bottom:2px;right:2px;background:#ef4444;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:8px;border:1px solid #fff;">🏁</span>
        </div>
      </div>
      <div style="position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.85);color:#fff;padding:2px 6px;border-radius:12px;font-size:8px;white-space:nowrap;border:1px solid #ef4444;z-index:1;font-weight:500;">
        ${time} 🏁 END
      </div>
    </div>`,
    className: "",
    iconSize: [size, size + 28],
    iconAnchor: [size / 2, size + 15],
  });

// ─── Helper: check if two lat/lng pairs are the same location ─────────────────
const isSameLatLng = (lat1, lng1, lat2, lng2) =>
  Math.abs(lat1 - lat2) < 0.00001 && Math.abs(lng1 - lng2) < 0.00001;

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
  const [hasLocations, setHasLocations] = useState(false);
  const [showPhotoMarkers, setShowPhotoMarkers] = useState(true);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [sessionStatsMap, setSessionStatsMap] = useState(new Map());

  // ── Single activeDrawer: null | "sessions" (removed photos drawer) ─────────
  const [activeDrawer, setActiveDrawer] = useState(null);

  const [sessionPhotos, setSessionPhotos] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  // Photo carousel state
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const polylines = useRef([]);
  const markers = useRef([]);
  const markerRefs = useRef(new Map());
  const fetchedSessions = useRef(new Set());
  const sessionDataCache = useRef(new Map());

  // ── Drawer open/close helpers ──────────────────────────────────────────────
  const openSessionDrawer = useCallback(() => setActiveDrawer("sessions"), []);
  const closeActiveDrawer = useCallback(() => setActiveDrawer(null), []);

  const drawerOpen = activeDrawer === "sessions";

  const drawerPaperSx = {
    width: { xs: "90%", sm: 360 },
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  };

  // ─── Get start and end points from photos ──────────────────────────────────
  const getStartEndFromPhotos = useCallback((session) => {
    if (!session) return { startPoint: null, endPoint: null };

    const photos = session.photos || [];
    const validPhotos = photos.filter(
      (p) => hasValidPhoto(p) && p.location && hasValidCoordinates(p.location)
    );

    if (validPhotos.length === 0) {
      const stats = getSessionStats(session);
      const locs = getValidLocations(stats.locations);
      return {
        startPoint: locs.length > 0 ? locs[0] : null,
        endPoint: locs.length > 1 ? locs[locs.length - 1] : null,
      };
    }

    const sortedPhotos = [...validPhotos].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    const firstPhoto = sortedPhotos[0];
    const lastPhoto = sortedPhotos[sortedPhotos.length - 1];

    return {
      startPoint: {
        lat: getLat(firstPhoto.location),
        lng: getLng(firstPhoto.location),
        timestamp: firstPhoto.timestamp,
        address: firstPhoto.address,
        photo: firstPhoto.url,
      },
      endPoint: {
        lat: getLat(lastPhoto.location),
        lng: getLng(lastPhoto.location),
        timestamp: lastPhoto.timestamp,
        address: lastPhoto.address,
        photo: lastPhoto.url,
      },
    };
  }, []);

  // ─── Build photo list with deduplication ───────────────────────────────────
  const buildSessionPhotos = useCallback((session) => {
    if (!session) return [];

    const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(session);
    const result = [];
    const seenUrls = new Set();
    const seenLatLng = new Set();

    const getLatLngKey = (lat, lng) => `${lat.toFixed(6)},${lng.toFixed(6)}`;

    // Start photo
    if (sp && sp.photo && !seenUrls.has(sp.photo)) {
      const latLngKey = getLatLngKey(sp.lat, sp.lng);
      if (!seenLatLng.has(latLngKey)) {
        seenUrls.add(sp.photo);
        seenLatLng.add(latLngKey);
        result.push({
          key: "start",
          url: sp.photo,
          timestamp: sp.timestamp,
          address: sp.address,
          lat: sp.lat,
          lng: sp.lng,
          type: "start",
        });
      }
    }

    // Route photos
    const rawPhotos = session.photos || [];
    rawPhotos.forEach((photo, idx) => {
      if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
      if (seenUrls.has(photo.url)) return;

      const pLat = getLat(photo.location);
      const pLng = getLng(photo.location);
      const latLngKey = getLatLngKey(pLat, pLng);

      if (sp && isSameLatLng(pLat, pLng, sp.lat, sp.lng)) return;
      if (ep && isSameLatLng(pLat, pLng, ep.lat, ep.lng)) return;
      if (seenLatLng.has(latLngKey)) return;

      seenUrls.add(photo.url);
      seenLatLng.add(latLngKey);
      result.push({
        key: `photo_${idx}`,
        idx,
        url: photo.url,
        timestamp: photo.timestamp,
        address: photo.address || "Address not available",
        lat: pLat,
        lng: pLng,
        type: "route",
      });
    });

    // End photo
    if (ep && ep.photo && !seenUrls.has(ep.photo)) {
      const latLngKey = getLatLngKey(ep.lat, ep.lng);
      if (!(sp && isSameLatLng(ep.lat, ep.lng, sp.lat, sp.lng)) && !seenLatLng.has(latLngKey)) {
        seenUrls.add(ep.photo);
        seenLatLng.add(latLngKey);
        result.push({
          key: "end",
          url: ep.photo,
          timestamp: ep.timestamp,
          address: ep.address,
          lat: ep.lat,
          lng: ep.lng,
          type: "end",
        });
      }
    }

    return result;
  }, [getStartEndFromPhotos]);

  // Fetch available dates
  useEffect(() => {
    const userId = metadata?.userId || metadata?.trackId;
    const dateToUse = selectedDate || metadata?.selectedDate || metadata?.formattedDate;
    if (userId && dateToUse) {
      dispatch(getUserAvailableDates({ id: userId, date: dateToUse }));
    }
  }, [dispatch, metadata?.userId, metadata?.trackId, selectedDate, metadata?.selectedDate]);

  // Init sessions
  useEffect(() => {
    if (sessions && sessions.length > 0) {
      setAllSessions(sessions);
      const statsMap = new Map();
      sessions.forEach((session) => {
        const id = String(session.sessionId || session._id);
        const stats = getSessionStats(session);
        statsMap.set(id, stats);
        sessionDataCache.current.set(id, { ...session, ...stats });
      });
      setSessionStatsMap(statsMap);
    }
  }, [sessions]);

  // Update start/end points and photo list when selected session changes
  useEffect(() => {
    if (selectedSession) {
      const { startPoint: sp, endPoint: ep } = getStartEndFromPhotos(selectedSession);
      setStartPoint(sp);
      setEndPoint(ep);
      setSessionPhotos(buildSessionPhotos(selectedSession));
    }
  }, [selectedSession, getStartEndFromPhotos, buildSessionPhotos]);

  // Process session data
  const processSessionData = useCallback(
    (sessionData) => {
      if (!sessionData) return;
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
      if (selectedSessionId === id && selectedSession) return;

      setSelectedSessionId(id);
      setIsLoadingSession(true);

      if (sessionDataCache.current.has(id)) {
        const cachedSession = sessionDataCache.current.get(id);
        if (cachedSession.locations && cachedSession.locations.length > 0) {
          processSessionData(cachedSession);
          return;
        }
      }

      const foundSession = allSessions.find((s) => String(s.sessionId || s._id) === id);
      if (foundSession) {
        if (foundSession.locations && foundSession.locations.length > 0) {
          const stats = getSessionStats(foundSession);
          const sessionWithStats = { ...foundSession, ...stats };
          sessionDataCache.current.set(id, sessionWithStats);
          processSessionData(sessionWithStats);
        } else if (!fetchedSessions.current.has(id)) {
          const userId = metadata?.userId || metadata?.trackId;
          if (userId) {
            fetchedSessions.current.add(id);
            dispatch(getSessionDetails({ userId, sessionId: id }));
          } else {
            setIsLoadingSession(false);
            setSelectedSession(null);
            setHasLocations(false);
          }
        }
      } else {
        setIsLoadingSession(false);
        setSelectedSession(null);
        setHasLocations(false);
      }

      if (isMobile) setActiveDrawer("sessions");
    },
    [allSessions, selectedSessionId, selectedSession, metadata, dispatch, isMobile, processSessionData]
  );

  // Watch Redux sessionDetails
  useEffect(() => {
    if (sessionDetails && String(sessionDetails.sessionId) === String(selectedSessionId)) {
      const id = String(sessionDetails.sessionId);
      const stats = getSessionStats(sessionDetails);
      const sessionWithStats = { ...sessionDetails, ...stats };
      sessionDataCache.current.set(id, sessionWithStats);
      setSessionStatsMap((prev) => {
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
      handleSessionSelect(firstId);
    }
  }, [allSessions, selectedSessionId, selectedSession, initialSelectedSessionId, handleSessionSelect]);

  // ── Map helpers ────────────────────────────────────────────────────────────
  const clearMap = () => {
    if (!mapInstance.current) return;
    polylines.current.forEach((l) => mapInstance.current.removeLayer(l));
    markers.current.forEach((m) => mapInstance.current.removeLayer(m));
    polylines.current = [];
    markers.current = [];
    markerRefs.current.clear();
  };

  // ── Main draw function ─────────────────────────────────────────────────────
  const drawMapWithSession = useCallback((session, showPhotos) => {
    if (!mapInstance.current) return;

    const stats = getSessionStats(session);
    const allLocations = stats.locations || [];
    if (!allLocations.length) return;

    clearMap();
    const validLocations = getValidLocations(allLocations);
    if (validLocations.length === 0) return;

    for (let i = 0; i < validLocations.length - 1; i++) {
      const line = L.polyline(
        [
          [getLat(validLocations[i]), getLng(validLocations[i])],
          [getLat(validLocations[i + 1]), getLng(validLocations[i + 1])],
        ],
        {
          color: validLocations[i].isOnline === true ? "#3553ea" : "#ef4444",
          weight: 3,
          opacity: 0.8,
          lineJoin: "round",
          lineCap: "round",
        }
      ).addTo(mapInstance.current);
      polylines.current.push(line);
    }

    // START marker
    if (startPoint && hasValidCoordinates(startPoint)) {
      const popupContent = `<div style="min-width:240px;max-width:300px;">
        <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🚀</span><b>START POINT</b></div>
        </div>
        <div><b>Time:</b> ${fmtTime(startPoint.timestamp)}</div>
        <div><b>Date:</b> ${fmtDate(startPoint.timestamp)}</div>
        <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
          <b>📸 Start Photo</b><br/>
          <img src="${startPoint.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${startPoint.photo}','_blank')"/>
        </div>
      </div>`;
      const icon = makeStartWithPhotoIcon(startPoint.photo, fmtTime(startPoint.timestamp), 38);
      const m = L.marker([startPoint.lat, startPoint.lng], { icon, zIndexOffset: 1000 })
        .bindPopup(popupContent).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("start", m);
    } else if (validLocations.length > 0) {
      const fb = validLocations[0];
      const popupContent = `<div style="min-width:240px;max-width:300px;">
        <div style="background:#22c55e;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🚀</span><b>START POINT</b></div>
        </div>
        <div><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
        <div><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
      </div>`;
      const m = L.marker([getLat(fb), getLng(fb)], { icon: makeStartIcon("#22c55e", fmtTime(fb.timestamp), false, 32), zIndexOffset: 1000 })
        .bindPopup(popupContent).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("start", m);
    }

    // END marker
    if (endPoint && hasValidCoordinates(endPoint)) {
      const popupContent = `<div style="min-width:240px;max-width:300px;">
        <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🏁</span><b>END POINT</b></div>
        </div>
        <div><b>Time:</b> ${fmtTime(endPoint.timestamp)}</div>
        <div><b>Date:</b> ${fmtDate(endPoint.timestamp)}</div>
        <div style="margin-top:8px;border-top:1px solid #ddd;padding-top:8px;">
          <b>📸 End Photo</b><br/>
          <img src="${endPoint.photo}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;margin-top:5px;" onclick="window.open('${endPoint.photo}','_blank')"/>
        </div>
      </div>`;
      const icon = makeEndWithPhotoIcon(endPoint.photo, fmtTime(endPoint.timestamp), 38);
      const m = L.marker([endPoint.lat, endPoint.lng], { icon, zIndexOffset: 1000 })
        .bindPopup(popupContent).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("end", m);
    } else if (validLocations.length > 1) {
      const fb = validLocations[validLocations.length - 1];
      const popupContent = `<div style="min-width:240px;max-width:300px;">
        <div style="background:#ef4444;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px">🏁</span><b>END POINT</b></div>
        </div>
        <div><b>Time:</b> ${fmtTime(fb.timestamp)}</div>
        <div><b>Date:</b> ${fmtDate(fb.timestamp)}</div>
        <div><b>Address:</b> ${getAddress(fb)}</div>
      </div>`;
      const m = L.marker([getLat(fb), getLng(fb)], { icon: makeEndIcon("#ef4444", fmtTime(fb.timestamp), false, 32), zIndexOffset: 1000 })
        .bindPopup(popupContent).addTo(mapInstance.current);
      markers.current.push(m);
      markerRefs.current.set("end", m);
    }

    // Mid-route photo markers
    if (showPhotos && session.photos && session.photos.length > 0) {
      session.photos.forEach((photo, idx) => {
        if (!hasValidPhoto(photo) || !photo.location || !hasValidCoordinates(photo.location)) return;
        const lat = photo.location.lat || photo.location.latitude;
        const lng = photo.location.lng || photo.location.longitude;
        if (startPoint && isSameLatLng(lat, lng, startPoint.lat, startPoint.lng)) return;
        if (endPoint && isSameLatLng(lat, lng, endPoint.lat, endPoint.lng)) return;

        const popup = `<div style="min-width:240px;max-width:300px;">
          <div style="background:#FF9800;color:white;padding:8px 10px;border-radius:8px;margin-bottom:10px;"><b>📸 ROUTE PHOTO</b></div>
          <div><b>Time:</b> ${fmtTime(photo.timestamp)}</div>
          <div><b>Remark:</b> ${photo.remark || "Remark not available"}</div>
          <div style="margin-top:8px;"><img src="${photo.url}" style="width:100%;max-height:150px;object-fit:cover;border-radius:6px;cursor:pointer;" onclick="window.open('${photo.url}','_blank')"/></div>
        </div>`;
        const m = L.marker([lat, lng], { icon: makePhotoIcon(photo.url, fmtTime(photo.timestamp), 32), zIndexOffset: 950 })
          .bindPopup(popup).addTo(mapInstance.current);
        markers.current.push(m);
        markerRefs.current.set(`photo_${idx}`, m);
      });
    }

    if (validLocations.length > 0) {
      const bounds = L.latLngBounds(validLocations.map((l) => [getLat(l), getLng(l)]));
      mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [startPoint, endPoint]);

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

  // Redraw on session or start/end points change
  useEffect(() => {
    if (mapInstance.current && selectedSession) {
      setTimeout(() => drawMapWithSession(selectedSession, showPhotoMarkers), 100);
    }
  }, [selectedSession, showPhotoMarkers, startPoint, endPoint, drawMapWithSession]);

  // Resize
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
    if (!session) return 0;
    return session.photos?.length || 0;
  };

  // Fly to photo marker and center it on map
  const handlePhotoClick = (photo) => {
    if (!mapInstance.current) return;

    const markerKey = photo.key;
    if (markerRefs.current.has(markerKey)) {
      const m = markerRefs.current.get(markerKey);
      const latLng = m.getLatLng();

      // Center the map on the marker with higher zoom
      mapInstance.current.setView(latLng, 18, {
        animate: true,
        duration: 1.5
      });

      // Open popup after animation completes
      setTimeout(() => m.openPopup(), 1500);
      return;
    }

    if (photo.lat && photo.lng) {
      // Center on coordinates
      mapInstance.current.setView([photo.lat, photo.lng], 18, {
        animate: true,
        duration: 1.5
      });
    }
  };

  // ─── Photo Carousel Component ──────────────────────────────────────────────
  const renderPhotoCarousel = () => {
    if (!selectedSession || sessionPhotos.length === 0) return null;

    const handleOpenModal = (index) => {
      setSelectedPhotoIndex(index);
      setPhotoModalOpen(true);
    };

    return (
      // <Paper
      //   elevation={3}
      //   sx={{
      //     position: "absolute",
      //     bottom: 75,
      //     left: 16,
      //     right: 16,
      //     zIndex: 600,
      //     // bgcolor: "rgba(0,0,0,0.85)",
      //     // backdropFilter: "blur(10px)",
      //     bgcolor: "rgba(0,0,0,0.4)",
      //     backdropFilter: "blur(10px)",
      //     borderRadius: 2,
      //     p: 1,
      //     overflow: "hidden",
      //   }}
      // >
      //   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, px: 1 }}>
      //     <CollectionsIcon sx={{ fontSize: 16, color: "#FF9800" }} />
      //     <Typography variant="caption" sx={{ color: "white", fontWeight: 500 }}>
      //       Session Photos ({sessionPhotos.length})
      //     </Typography>
      //   </Box>

      //   <Box
      //     sx={{
      //       display: "flex",
      //       gap: 1,
      //       overflowX: "auto",
      //       overflowY: "hidden",
      //       pb: 1,
      //       "&::-webkit-scrollbar": {
      //         height: 4,
      //       },
      //       "&::-webkit-scrollbar-track": {
      //         bgcolor: "rgba(255,255,255,0.1)",
      //         borderRadius: 2,
      //       },
      //       "&::-webkit-scrollbar-thumb": {
      //         bgcolor: "rgba(255,255,255,0.3)",
      //         borderRadius: 2,
      //       },
      //     }}
      //   >
      //     {sessionPhotos.map((photo, index) => {
      //       const isStart = photo.type === "start";
      //       const isEnd = photo.type === "end";
      //       const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";

      //       return (
      //         <Box
      //           key={photo.key || index}
      //           onClick={() => handlePhotoClick(photo)}
      //           sx={{
      //             flexShrink: 0,
      //             width: 80,
      //             height: 80,
      //             borderRadius: 1.5,
      //             overflow: "hidden",
      //             cursor: "pointer",
      //             border: `2px solid ${borderColor}`,
      //             position: "relative",
      //             transition: "transform 0.2s",
      //             "&:hover": {
      //               transform: "scale(1.05)",
      //             },
      //           }}
      //         >
      //           <img
      //             src={photo.url}
      //             alt={`Photo ${index + 1}`}
      //             style={{
      //               width: "100%",
      //               height: "100%",
      //               objectFit: "cover",
      //             }}
      //             onError={(e) => {
      //               e.target.style.display = "none";
      //               e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#333;"><PhotoIcon sx={{color:"#666"}}/></div>';
      //             }}
      //           />
      //           <Box
      //             sx={{
      //               position: "absolute",
      //               top: 2,
      //               right: 2,
      //               bgcolor: borderColor,
      //               borderRadius: "50%",
      //               width: 18,
      //               height: 18,
      //               display: "flex",
      //               alignItems: "center",
      //               justifyContent: "center",
      //               fontSize: 10,
      //             }}
      //           >
      //             {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
      //           </Box>
      //           <Typography
      //             variant="caption"
      //             sx={{
      //               position: "absolute",
      //               bottom: 0,
      //               left: 0,
      //               right: 0,
      //               bgcolor: "rgba(0,0,0,0.6)",
      //               color: "white",
      //               fontSize: "8px",
      //               textAlign: "center",
      //               py: 0.25,
      //             }}
      //           >
      //             {fmtTime(photo.timestamp)}
      //           </Typography>
      //         </Box>
      //       );
      //     })}
      //   </Box>
      // </Paper>

      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16,
          zIndex: 600,
          bgcolor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          p: 0.5,
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5, px: 0.5 }}>
          <CollectionsIcon sx={{ fontSize: 12, color: "#FF9800" }} />
          <Typography variant="caption" sx={{ color: "white", fontWeight: 500, fontSize: "10px" }}>
            Session Photos ({sessionPhotos.length})
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 0.75,
            overflowX: "auto",
            overflowY: "hidden",
            pb: 0.5,
            "&::-webkit-scrollbar": {
              height: 3,
            },
            "&::-webkit-scrollbar-track": {
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255,255,255,0.3)",
              borderRadius: 2,
            },
          }}
        >
          {sessionPhotos.map((photo, index) => {
            const isStart = photo.type === "start";
            const isEnd = photo.type === "end";
            const borderColor = isStart ? "#22c55e" : isEnd ? "#ef4444" : "#FF9800";

            return (
              <Box
                key={photo.key || index}
                onClick={() => handlePhotoClick(photo)}
                sx={{
                  flexShrink: 0,
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: `1.5px solid ${borderColor}`,
                  position: "relative",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <img
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#333;"><PhotoIcon sx={{color:"#666"}}/></div>';
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    bgcolor: borderColor,
                    borderRadius: "50%",
                    width: 14,
                    height: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 7,
                  }}
                >
                  {isStart ? "🚀" : isEnd ? "🏁" : "📸"}
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(0,0,0,0.6)",
                    color: "white",
                    fontSize: "7px",
                    textAlign: "center",
                    py: 0.15,
                  }}
                >
                  {fmtTime(photo.timestamp)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Paper>

    );
  };

  // ─── Photo Modal for fullscreen view ──────────────────────────────────────
  const renderPhotoModal = () => {
    if (!photoModalOpen || selectedPhotoIndex === null) return null;

    const currentPhoto = sessionPhotos[selectedPhotoIndex];

    const handleNext = () => {
      setSelectedPhotoIndex((prev) => (prev + 1) % sessionPhotos.length);
    };

    const handlePrev = () => {
      setSelectedPhotoIndex((prev) => (prev - 1 + sessionPhotos.length) % sessionPhotos.length);
    };

    return (
      <Modal
        open={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        closeAfterTransition
        sx={{ zIndex: 1300 }}
      >
        <Fade in={photoModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 800,
              bgcolor: "black",
              borderRadius: 2,
              boxShadow: 24,
              overflow: "hidden",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => setPhotoModalOpen(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseIcon />
              </IconButton>

              <img
                src={currentPhoto?.url}
                alt="Full size"
                style={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />

              <IconButton
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <NavigateNextIcon />
              </IconButton>
            </Box>

            <Box sx={{ p: 2, bgcolor: "black", color: "white" }}>
              <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
                {currentPhoto?.type === "start" ? "🚀 Start Point" : currentPhoto?.type === "end" ? "🏁 End Point" : `📸 Route Photo ${(currentPhoto?.idx ?? selectedPhotoIndex) + 1}`}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                {fmtDateTime(currentPhoto?.timestamp)}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                📍 {currentPhoto?.address || "Address not available"}
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  };

  // ── Session List ──────────────────────────────────────────────────────────
  const renderSessionList = () => (
    <Paper elevation={0} sx={{ height: "100%", overflow: "auto", borderRadius: 0 }}>
      <Box sx={{ p: 1.5 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: "0.75rem", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
          <PinDropIcon sx={{ fontSize: 16, color: "#2196F3" }} />
          Sessions ({allSessions.length})
          {(selectedDate || metadata?.selectedDate) && (
            <Chip label={selectedDate || metadata?.selectedDate} size="small" sx={{ ml: "auto", height: 20, fontSize: "0.55rem", bgcolor: alpha("#2196F3", 0.1), color: "#2196F3" }} />
          )}
        </Typography>

        <Stack spacing={1.5}>
          {allSessions.map((session, index) => {
            const sessionId = String(session.sessionId || session._id);
            const isSelected = String(selectedSessionId) === sessionId;
            const isLoading = isSelected && isLoadingSession;
            const photoCount = getPhotoCount(session);
            const stats = sessionStatsMap.get(sessionId) || getSessionStats(session);

            return (
              <Zoom in key={sessionId} style={{ transitionDelay: `${index * 50}ms` }}>
                <Card onClick={() => handleSessionSelect(sessionId)} sx={{
                  cursor: "pointer",
                  border: isSelected ? `2px solid #2196F3` : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  bgcolor: isSelected ? alpha("#2196F3", 0.05) : "transparent",
                  transition: "all 0.2s ease",
                  "&:hover": { borderColor: "#2196F3", bgcolor: alpha("#2196F3", 0.02), transform: "translateY(-2px)", boxShadow: 2 },
                }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: isSelected ? "#2196F3" : alpha("#2196F3", 0.1), display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "white" : "#2196F3", fontSize: "0.75rem", fontWeight: "bold" }}>
                        {isLoading ? <CircularProgress size={18} /> : index + 1}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>Session #{index + 1}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem", display: "flex", alignItems: "center", gap: 0.5 }}>
                          <ScheduleIcon sx={{ fontSize: 10 }} />
                          {fmtDateTime(session.startTime || session.stats?.startTime)}
                        </Typography>
                      </Box>
                      {photoCount > 0 && (
                        <Chip icon={<PhotoIcon sx={{ fontSize: 12 }} />} label={photoCount} size="small" sx={{ height: 22, fontSize: "0.6rem", bgcolor: alpha("#FF9800", 0.1), color: "#FF9800" }} />
                      )}
                    </Box>

                    <Grid container spacing={1} sx={{ mb: 1 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#FF9800", 0.03), borderRadius: 1 }}>
                          <TimerIcon sx={{ fontSize: 14, color: "#FF9800" }} />
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Duration</Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>{fmtDuration(stats.duration)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, p: 0.5, bgcolor: alpha("#2196F3", 0.03), borderRadius: 1 }}>
                          <StraightenIcon sx={{ fontSize: 14, color: "#2196F3" }} />
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Distance</Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.65rem", display: "block" }}>{fmtDist(stats.distance)}</Typography>
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
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>Start</Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtTime(stats.startTime)}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <FlagIcon sx={{ fontSize: 12, color: "#ef4444" }} />
                          <Box>
                            <Typography variant="caption" sx={{ fontSize: "0.55rem", color: "text.secondary" }}>End</Typography>
                            <Typography variant="caption" fontWeight={500} sx={{ fontSize: "0.6rem", display: "block" }}>{fmtTime(stats.endTime)}</Typography>
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

  // ─── Render ───────────────────────────────────────────────────────────────
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
          </Box>

          {/* Sessions button on mobile */}
          {isMobile && (
            <Button variant="outlined" size="small" startIcon={<MenuIcon />} onClick={openSessionDrawer} sx={{ fontSize: "0.6rem", borderColor: alpha("#2196F3", 0.3), color: "#2196F3", py: 0.5 }}>
              {allSessions.length}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
        <Grid container sx={{ height: "calc(100vh - 48px)" }}>
          {/* Map */}
          <Grid item xs={12} md={8} sx={{ height: "100%", position: "relative" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: 500, backgroundColor: "#f0f0f0" }} />

            {isLoadingSession && (
              <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000 }}>
                <CircularProgress size={40} sx={{ color: "#2196F3" }} />
              </Box>
            )}

            {selectedSession && hasLocations && (
              <Paper sx={{ position: "absolute", top: 12, left: 12, p: { xs: 1, sm: 1.5 }, borderRadius: 2, maxWidth: { xs: 200, sm: 260 }, zIndex: 500, boxShadow: 2, backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.95)" }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: "#2196F3", fontSize: { xs: "0.7rem", sm: "0.75rem" }, mb: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
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
                    <Typography variant="caption" sx={{ color: "#22c55e" }}>Start: {fmtTime(startTime)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <FlagIcon sx={{ fontSize: 10, color: "#ef4444" }} />
                    <Typography variant="caption" sx={{ color: "#ef4444" }}>End: {fmtTime(endTime)}</Typography>
                  </Box>
                </Box>
              </Paper>
            )}

            {/* Photo Carousel at bottom */}
            {renderPhotoCarousel()}
          </Grid>

          {/* Desktop: session list as right panel */}
          {!isMobile && (
            <Grid item md={4} sx={{ height: "100%", borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`, overflow: "auto" }}>
              {renderSessionList()}
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Mobile: session list as drawer */}
      {isMobile && (
        <>
          <Fab color="primary" sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1000, bgcolor: "#2196F3", width: 48, height: 48 }} onClick={openSessionDrawer}>
            <MenuIcon />
          </Fab>

          <Drawer anchor="right" open={drawerOpen} onClose={closeActiveDrawer} PaperProps={{ sx: drawerPaperSx }}>
            <Box sx={{ p: 1.5, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>Sessions</Typography>
                {(selectedDate || metadata?.selectedDate) && (
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.6rem" }}>{selectedDate || metadata?.selectedDate}</Typography>
                )}
              </Box>
              <IconButton onClick={closeActiveDrawer} size="small"><CloseIcon /></IconButton>
            </Box>
            <Box sx={{ height: "calc(100% - 60px)", overflow: "auto" }}>{renderSessionList()}</Box>
          </Drawer>
        </>
      )}

      {/* Photo Modal for fullscreen view */}
      {renderPhotoModal()}
    </Box>
  );
};

export default Locations;